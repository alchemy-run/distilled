import { createHash } from "node:crypto";
import * as ResponseValidation from "@distilled.cloud/core/response-validation";
import * as NodeFileSystem from "@effect/platform-node/NodeFileSystem";
/**
 * Live Storage data-plane check against the testing subscription; never part
 * of a normal run. AZURE_DISTILLED_LIVE=1 reads the service principal from
 * the alchemy-testing profile (`values.{tenantId,clientId,clientSecret,
 * subscriptionId,location}`), then:
 *
 *   1. creates resource group `distilled-dp-storage` and a StorageV2 account
 *      (hierarchical namespace on, for Data Lake) through the ARM modules
 *   2. assigns the principal Storage Blob Data Contributor, Storage Queue Data
 *      Contributor and Storage File Data Privileged Contributor on the account
 *   3. drives every Storage data plane with an Entra token, in strict
 *      response validation: blob, queue, file, Data Lake
 *   4. deletes the role assignments and the resource group, and waits until
 *      the group is gone
 *
 * ~15 min (role propagation up to ~5 min, group deletion several minutes);
 * cost is cents (one LRS account for minutes).
 */
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Redacted from "effect/Redacted";
import * as Schedule from "effect/Schedule";
import { describe, expect, test } from "vitest";
import { ARM_SCOPE, Credentials, fromClientSecret } from "../src/credentials.ts";
import * as authorization from "../src/services/authorization.ts";
import * as resources from "../src/services/resources.ts";
import * as blob from "../src/services/storage-blob.ts";
import * as datalake from "../src/services/storage-datalake.ts";
import * as file from "../src/services/storage-file.ts";
import * as queue from "../src/services/storage-queue.ts";
import * as storage from "../src/services/storage.ts";

const RESOURCE_GROUP = "distilled-dp-storage";
const ROLES = {
  blob: "ba92f5b4-2d11-453d-a403-e96b0029c9fe", // Storage Blob Data Contributor
  queue: "974c5e8b-45b9-4653-ba55-5f855dd0fb88", // Storage Queue Data Contributor
  file: "69566ab7-960f-475b-8e7c-b3118f30c6bd", // Storage File Data Privileged Contributor
} as const;

/** A deterministic GUID (role assignment names must be GUIDs). */
const guidOf = (seed: string) =>
  Effect.sync(() => {
    const h = createHash("sha256").update(seed).digest("hex");
    return `${h.slice(0, 8)}-${h.slice(8, 12)}-4${h.slice(13, 16)}-8${h.slice(17, 20)}-${h.slice(20, 32)}`;
  });

/** Strict response validation: the decoded value must match the output schema. */
const strict = <A, E, R>(effect: Effect.Effect<A, E, R>) =>
  effect.pipe(Effect.provide(ResponseValidation.strict));

/** Role assignments take minutes to reach the data plane; retry only that. */
const untilAuthorized = <A, E extends { readonly _tag: string }, R>(
  effect: Effect.Effect<A, E, R>,
) =>
  effect.pipe(
    Effect.retry({
      while: (e) => e._tag === "SchemaRegistryStorageAccessDenied",
      schedule: Schedule.spaced("15 seconds"),
      times: 24,
    }),
  );

const bytes = (s: string) => new TextEncoder().encode(s);
const textOf = (b: Uint8Array) => new TextDecoder().decode(b);

const program = (location: string) =>
  Effect.gen(function* () {
    const creds = yield* Credentials;
    const config = yield* creds;
    const subscriptionId = config.subscriptionId!;

    // The principal's object id, from the `oid` claim of its ARM token.
    const armToken = yield* config.token(ARM_SCOPE);
    const principalId = yield* Effect.sync(
      () =>
        (
          JSON.parse(
            Buffer.from(Redacted.value(armToken).split(".")[1]!, "base64url").toString(),
          ) as { oid: string }
        ).oid,
    );
    const accountName = `dpst${subscriptionId.replace(/-/g, "").slice(0, 12)}`;

    yield* resources.ResourceGroupsCreateOrUpdate({
      subscriptionId,
      resourceGroupName: RESOURCE_GROUP,
      location,
    });
    yield* storage.CreateStorageAccount({
      subscriptionId,
      resourceGroupName: RESOURCE_GROUP,
      accountName,
      location,
      kind: "StorageV2",
      sku: { name: "Standard_LRS" },
      properties: { isHnsEnabled: true, allowBlobPublicAccess: false, minimumTlsVersion: "TLS1_2" },
    });
    const account = yield* storage
      .GetStorageAccountProperties({
        subscriptionId,
        resourceGroupName: RESOURCE_GROUP,
        accountName,
      })
      .pipe(
        Effect.repeat({
          schedule: Schedule.spaced("5 seconds"),
          until: (a) => a.properties?.provisioningState === "Succeeded",
          times: 36,
        }),
      );
    const scope = account.id!;

    const assignments: string[] = [];
    for (const role of Object.values(ROLES)) {
      const name = yield* guidOf(`${scope}|${role}|${principalId}`);
      assignments.push(name);
      yield* authorization
        .CreateRoleAssignment({
          scope,
          roleAssignmentName: name,
          properties: {
            roleDefinitionId: `/subscriptions/${subscriptionId}/providers/Microsoft.Authorization/roleDefinitions/${role}`,
            principalId,
            principalType: "ServicePrincipal",
          },
        })
        .pipe(
          Effect.catchTag("RoleAssignmentExists", () => Effect.void),
          // A brand-new principal can lag in the directory.
          Effect.retry({
            while: (e) => e._tag === "PrincipalNotFound",
            schedule: Schedule.spaced("5 seconds"),
            times: 6,
          }),
        );
    }

    const BLOB = `https://${accountName}.blob.core.windows.net`;
    const QUEUE = `https://${accountName}.queue.core.windows.net`;
    const FILE = `https://${accountName}.file.core.windows.net`;
    const DFS = `https://${accountName}.dfs.core.windows.net`;

    // ---- blob: upload → download → list → properties → delete ----
    yield* untilAuthorized(
      strict(blob.CreateContainer({ url: BLOB, containerName: "assets" })).pipe(
        Effect.catchTag("ContainerAlreadyExists", () => Effect.succeed({})),
      ),
    );
    const uploaded = yield* untilAuthorized(
      strict(
        blob.UploadBlockBlob({
          url: BLOB,
          containerName: "assets",
          blob: "dir/hello.txt",
          body: bytes("hello from distilled"),
          xMsBlobContentType: "text/plain",
          metadata: { owner: "distilled" },
        }),
      ),
    );
    const downloaded = yield* strict(
      blob.DownloadBlob({ url: BLOB, containerName: "assets", blob: "dir/hello.txt" }),
    );
    const listed = yield* strict(
      blob.ListContainerBlobFlatSegment({
        url: BLOB,
        containerName: "assets",
        include: ["metadata"],
      }),
    );
    const props = yield* strict(
      blob.GetBlobProperties({ url: BLOB, containerName: "assets", blob: "dir/hello.txt" }),
    );
    yield* strict(blob.DeleteBlob({ url: BLOB, containerName: "assets", blob: "dir/hello.txt" }));
    const afterDelete = yield* blob
      .GetBlobProperties({ url: BLOB, containerName: "assets", blob: "dir/hello.txt" })
      .pipe(Effect.flip);

    // ---- queue: create → enqueue → dequeue → delete message ----
    yield* untilAuthorized(strict(queue.CreateQueue({ url: QUEUE, queueName: "jobs" })));
    const enqueued = yield* strict(
      queue.MessagesEnqueue({ url: QUEUE, queueName: "jobs", MessageText: "job <1> & more" }),
    );
    const dequeued = yield* strict(queue.MessagesDequeue({ url: QUEUE, queueName: "jobs" }));
    yield* strict(
      queue.DeleteMessageId({
        url: QUEUE,
        queueName: "jobs",
        messageid: dequeued[0]!.MessageId,
        popreceipt: dequeued[0]!.PopReceipt,
      }),
    );
    const drained = yield* strict(queue.MessagesDequeue({ url: QUEUE, queueName: "jobs" }));

    // ---- file: share (ARM) → directory → file → upload range → download ----
    yield* storage.CreateFileShare({
      subscriptionId,
      resourceGroupName: RESOURCE_GROUP,
      accountName,
      shareName: "data",
    });
    yield* untilAuthorized(
      strict(
        file.CreateDirectory({
          url: FILE,
          shareName: "data",
          directory: "logs",
          xMsFileRequestIntent: "backup",
        }),
      ).pipe(Effect.catchTag("StorageResourceAlreadyExists", () => Effect.succeed({}))),
    );
    yield* strict(
      file.CreateFile({
        url: FILE,
        shareName: "data",
        fileName: "logs/a.txt",
        xMsContentLength: 5,
        xMsFileRequestIntent: "backup",
      }),
    );
    yield* strict(
      file.UploadFileRange({
        url: FILE,
        shareName: "data",
        fileName: "logs/a.txt",
        xMsRange: "bytes=0-4",
        xMsWrite: "update",
        xMsFileRequestIntent: "backup",
        body: bytes("hello"),
      }),
    );
    const fileDownload = yield* strict(
      file.DownloadFile({
        url: FILE,
        shareName: "data",
        fileName: "logs/a.txt",
        xMsFileRequestIntent: "backup",
      }),
    );

    // ---- Data Lake: filesystem → path create → append → flush → read ----
    yield* strict(datalake.CreateFileSystem({ url: DFS, filesystem: "lake" })).pipe(
      Effect.catchTag("FilesystemAlreadyExists", () => Effect.succeed({})),
    );
    yield* strict(
      datalake.CreatePath({ url: DFS, filesystem: "lake", path: "raw.csv", resource: "file" }),
    );
    const csv = bytes("a,b\n1,2\n");
    yield* strict(
      datalake.PathAppendData({
        url: DFS,
        filesystem: "lake",
        path: "raw.csv",
        position: 0,
        body: csv,
      }),
    );
    yield* strict(
      datalake.FlushPathData({
        url: DFS,
        filesystem: "lake",
        path: "raw.csv",
        position: csv.length,
      }),
    );
    const lakeRead = yield* strict(
      datalake.ReadPath({ url: DFS, filesystem: "lake", path: "raw.csv" }),
    );

    return {
      uploaded,
      downloaded,
      listed,
      props,
      afterDelete,
      enqueued,
      dequeued,
      drained,
      fileDownload,
      lakeRead,
      scope,
      assignments,
      subscriptionId,
    };
  });

/** Delete the role assignments and the group, then wait until the group is gone. */
const teardown = (subscriptionId: string, scope: string | undefined, assignments: string[]) =>
  Effect.gen(function* () {
    for (const name of scope === undefined ? [] : assignments) {
      yield* authorization
        .DeleteRoleAssignment({ scope: scope!, roleAssignmentName: name })
        .pipe(Effect.catchTag("RoleAssignmentNotFound", () => Effect.void));
    }
    yield* resources
      .DeleteResourceGroup({ subscriptionId, resourceGroupName: RESOURCE_GROUP })
      .pipe(Effect.catchTag("ResourceGroupNotFound", () => Effect.void));
    return yield* resources
      .GetResourceGroup({ subscriptionId, resourceGroupName: RESOURCE_GROUP })
      .pipe(Effect.flip, Effect.retry({ schedule: Schedule.spaced("15 seconds"), times: 48 }));
  });

describe.skipIf(!process.env.AZURE_DISTILLED_LIVE)("live storage data planes", () => {
  test("blob, queue, file and Data Lake round-trip with an Entra token", async () => {
    const outcome = await Effect.runPromise(
      Effect.gen(function* () {
        const fs = yield* FileSystem.FileSystem;
        const home = yield* Effect.sync(() => process.env.HOME ?? "");
        const text = yield* fs.readFileString(
          `${home}/.alchemy/profiles/alchemy-testing/azure.json`,
        );
        const { values } = JSON.parse(text) as { values: Record<string, string> };
        const live = fromClientSecret({
          tenantId: values.tenantId!,
          clientId: values.clientId!,
          clientSecret: Redacted.make(values.clientSecret!),
          subscriptionId: values.subscriptionId!,
        });
        return yield* Effect.gen(function* () {
          const result = yield* program(values.location ?? "eastus").pipe(
            // Best-effort cleanup when the round trip fails part-way.
            Effect.tapError(() =>
              teardown(values.subscriptionId!, undefined, []).pipe(Effect.ignore),
            ),
          );
          const gone = yield* teardown(result.subscriptionId, result.scope, result.assignments);
          return { result, gone };
        }).pipe(Effect.provide(live));
      }).pipe(Effect.provide(FetchHttpClient.layer), Effect.provide(NodeFileSystem.layer)),
    );
    const { result: r, gone } = outcome;

    expect(r.uploaded.eTag).toMatch(/^"0x/);
    expect(textOf(r.downloaded.body)).toBe("hello from distilled");
    expect(r.downloaded.contentLength).toBe(20);
    expect(r.downloaded.metadata).toEqual({ owner: "distilled" });
    expect(r.downloaded.contentType).toBe("text/plain");
    const names = r.listed.Segment.BlobItems.map((b) => b.Name.content);
    expect(names).toContain("dir/hello.txt");
    const item = r.listed.Segment.BlobItems.find((b) => b.Name.content === "dir/hello.txt")!;
    expect(item.Properties.Content_Length).toBe(20);
    expect(item.Metadata).toEqual({ owner: "distilled" });
    expect(r.props.contentLength).toBe(20);
    expect(r.props.xMsBlobType).toBe("BlockBlob");
    expect(r.props.xMsServerEncrypted).toBe(true);
    expect(r.afterDelete._tag).toBe("BlobNotFound");

    expect(r.enqueued).toHaveLength(1);
    expect(r.dequeued).toHaveLength(1);
    expect(r.dequeued[0]!.MessageText).toBe("job <1> & more");
    expect(r.dequeued[0]!.MessageId).toBe(r.enqueued[0]!.MessageId);
    expect(r.drained).toEqual([]);

    expect(textOf(r.fileDownload.body)).toBe("hello");
    expect(r.fileDownload.contentLength).toBe(5);

    expect(textOf(r.lakeRead.body)).toBe("a,b\n1,2\n");

    expect(gone._tag).toBe("ResourceGroupNotFound");
  }, 1_500_000);
});
