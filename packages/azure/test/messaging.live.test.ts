import { createHash } from "node:crypto";
import * as ResponseValidation from "@distilled.cloud/core/response-validation";
import * as NodeFileSystem from "@effect/platform-node/NodeFileSystem";
/**
 * Live check of the hand-authored messaging models (manual-specs/) against
 * the testing subscription; never part of a normal run. AZURE_DISTILLED_LIVE=1
 * reads the service principal from the alchemy-testing profile
 * (`values.{tenantId,clientId,clientSecret,subscriptionId,location}`), then:
 *
 *   1. creates resource group `distilled-dp-messaging`, a Standard Service Bus
 *      namespace with queue `jobs`, and a Standard Event Hubs namespace with
 *      hub `events` (2 partitions), through the ARM modules
 *   2. assigns the principal Azure Service Bus Data Owner on the queue and
 *      Azure Event Hubs Data Sender on the hub
 *   3. Service Bus with an Entra token: send → peek-lock → renew → complete,
 *      the settled lock is MessageLockLost, batch send → receive-and-delete,
 *      a missing queue is MessagingEntityNotFound
 *   4. Event Hubs with an Entra token: send batch (no key, one key), send,
 *      send to a partition; mixed batch keys are BatchPartitionKeyMismatch,
 *      an unknown partition is InvalidPartition
 *   5. deletes the role assignments and the group, and waits until it is gone
 *
 * ~10 min (namespaces ~2 min each, role propagation up to ~5 min, group
 * deletion a few minutes); cost is cents (two Standard namespaces for minutes).
 */
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Redacted from "effect/Redacted";
import * as Schedule from "effect/Schedule";
import { describe, expect, test } from "vitest";
import { ARM_SCOPE, Credentials, fromClientSecret } from "../src/credentials.ts";
import * as authorization from "../src/services/authorization.ts";
import * as eventhub from "../src/services/eventhub.ts";
import * as eventhubs from "../src/services/eventhubs-messaging.ts";
import * as resources from "../src/services/resources.ts";
import * as servicebus from "../src/services/servicebus-messaging.ts";
import * as servicebusArm from "../src/services/servicebus.ts";

const RESOURCE_GROUP = "distilled-dp-messaging";
const ROLES = {
  serviceBusDataOwner: "090c5cfd-751d-490a-894a-3ce6f1109419", // Azure Service Bus Data Owner
  eventHubsDataSender: "2b629674-e913-4c01-ae53-ef4638d8f975", // Azure Event Hubs Data Sender
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
      while: (e) => e._tag === "MessagingUnauthorized",
      schedule: Schedule.spaced("15 seconds"),
      times: 24,
    }),
  );

const textOf = (b: Uint8Array | undefined) =>
  b === undefined ? undefined : new TextDecoder().decode(b);

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
    const suffix = subscriptionId.replace(/-/g, "").slice(0, 12);
    const sbName = `dpsb${suffix}`;
    const ehName = `dpeh${suffix}`;
    const where = { subscriptionId, resourceGroupName: RESOURCE_GROUP };

    yield* resources.ResourceGroupsCreateOrUpdate({ ...where, location });
    yield* servicebusArm.NamespacesCreateOrUpdate({
      ...where,
      namespaceName: sbName,
      location,
      sku: { name: "Standard", tier: "Standard" },
    });
    yield* eventhub.NamespacesCreateOrUpdate({
      ...where,
      namespaceName: ehName,
      location,
      sku: { name: "Standard", tier: "Standard", capacity: 1 },
    });
    const provisioned = { schedule: Schedule.spaced("10 seconds"), times: 36 } as const;
    const sbNamespace = yield* servicebusArm.GetNamespace({ ...where, namespaceName: sbName }).pipe(
      Effect.repeat({
        ...provisioned,
        until: (n) => n.properties?.provisioningState === "Succeeded",
      }),
    );
    const ehNamespace = yield* eventhub.GetNamespace({ ...where, namespaceName: ehName }).pipe(
      Effect.repeat({
        ...provisioned,
        until: (n) => n.properties?.provisioningState === "Succeeded",
      }),
    );
    yield* servicebusArm.QueuesCreateOrUpdate({
      ...where,
      namespaceName: sbName,
      queueName: "jobs",
      properties: {},
    });
    yield* eventhub.EventHubsCreateOrUpdate({
      ...where,
      namespaceName: ehName,
      eventHubName: "events",
      properties: { partitionCount: 2 },
    });

    const grants = [
      { scope: `${sbNamespace.id}/queues/jobs`, role: ROLES.serviceBusDataOwner },
      { scope: `${ehNamespace.id}/eventhubs/events`, role: ROLES.eventHubsDataSender },
    ];
    const assignments: Array<{ scope: string; name: string }> = [];
    for (const { scope, role } of grants) {
      const name = yield* guidOf(`${scope}|${role}|${principalId}`);
      assignments.push({ scope, name });
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
          Effect.retry({
            while: (e) => e._tag === "PrincipalNotFound",
            schedule: Schedule.spaced("5 seconds"),
            times: 6,
          }),
        );
    }

    // Leftovers of an earlier interrupted run would be received first.
    const sb = { namespaceName: sbName, queueName: "jobs" } as const;
    yield* untilAuthorized(
      strict(servicebus.ReceiveAndDeleteMessage({ ...sb, timeout: 1 })).pipe(
        Effect.repeat({ until: (m) => m.body === undefined, times: 10 }),
      ),
    );

    // ---- Service Bus: send → peek-lock → renew → complete ----
    yield* strict(
      servicebus.SendMessage({
        namespaceName: sbName,
        entityPath: "jobs",
        body: "hello from distilled",
        contentType: "text/plain",
        brokerProperties: { label: "M1", messageId: "distilled-1" },
        customProperties: { Priority: "High" },
      }),
    );
    const locked = yield* strict(servicebus.PeekLockMessage({ ...sb, timeout: 10 }));
    const lock = {
      ...sb,
      messageId: String(locked.brokerProperties!.sequenceNumber!),
      lockToken: locked.brokerProperties!.lockToken!,
    };
    yield* strict(servicebus.RenewMessageLock(lock));
    yield* strict(servicebus.CompleteMessage(lock));
    const settledAgain = yield* servicebus.CompleteMessage(lock).pipe(Effect.flip);

    // ---- Service Bus: batch send → receive-and-delete ----
    yield* strict(
      servicebus.SendMessageBatch({
        namespaceName: sbName,
        entityPath: "jobs",
        messages: [
          { body: "batch-1", brokerProperties: { label: "B1" } },
          { body: "batch-2", userProperties: { Customer: "ABC" } },
        ],
      }),
    );
    const first = yield* strict(servicebus.ReceiveAndDeleteMessage({ ...sb, timeout: 10 }));
    const second = yield* strict(servicebus.ReceiveAndDeleteMessage({ ...sb, timeout: 10 }));
    const drained = yield* strict(servicebus.ReceiveAndDeleteMessage({ ...sb, timeout: 1 }));
    const missingQueue = yield* servicebus
      .SendMessage({ namespaceName: sbName, entityPath: "no-such-queue", body: "x" })
      .pipe(Effect.flip);

    // ---- Event Hubs: send batch, send, send to a partition ----
    const eh = { namespaceName: ehName, eventHubName: "events" } as const;
    yield* untilAuthorized(
      strict(
        eventhubs.SendEventBatch({
          ...eh,
          events: [
            { body: "event-1", userProperties: { Alert: "Strong Wind" } },
            { body: "event-2", userProperties: { Count: 2 } },
          ],
        }),
      ),
    );
    yield* strict(
      eventhubs.SendEventBatch({
        ...eh,
        events: [
          { body: "event-3", brokerProperties: { partitionKey: "device-7" } },
          { body: "event-4", brokerProperties: { partitionKey: "device-7" } },
        ],
      }),
    );
    const mixedKeys = yield* eventhubs
      .SendEventBatch({
        ...eh,
        events: [
          { body: "event-5" },
          { body: "event-6", brokerProperties: { partitionKey: "device-7" } },
        ],
      })
      .pipe(Effect.flip);
    yield* strict(
      eventhubs.SendEvent({
        ...eh,
        body: '{"DeviceId":"dev-01","Temperature":"37.0"}',
        brokerProperties: { partitionKey: "dev-01" },
      }),
    );
    yield* strict(
      eventhubs.SendPartitionEvent({ ...eh, partitionId: "1", body: "to partition 1" }),
    );
    const badPartition = yield* eventhubs
      .SendPartitionEvent({ ...eh, partitionId: "9", body: "x" })
      .pipe(Effect.flip);
    const hub = yield* eventhub.GetEventHub({
      ...where,
      namespaceName: ehName,
      eventHubName: "events",
    });

    return {
      locked,
      settledAgain,
      first,
      second,
      drained,
      missingQueue,
      mixedKeys,
      badPartition,
      hub,
      assignments,
      subscriptionId,
    };
  });

/** Delete the role assignments and the group, then wait until the group is gone. */
const teardown = (
  subscriptionId: string,
  assignments: ReadonlyArray<{ readonly scope: string; readonly name: string }>,
) =>
  Effect.gen(function* () {
    for (const { scope, name } of assignments) {
      yield* authorization
        .DeleteRoleAssignment({ scope, roleAssignmentName: name })
        .pipe(Effect.catchTag("RoleAssignmentNotFound", () => Effect.void));
    }
    yield* resources
      .DeleteResourceGroup({ subscriptionId, resourceGroupName: RESOURCE_GROUP })
      .pipe(Effect.catchTag("ResourceGroupNotFound", () => Effect.void));
    return yield* resources
      .GetResourceGroup({ subscriptionId, resourceGroupName: RESOURCE_GROUP })
      .pipe(Effect.flip, Effect.retry({ schedule: Schedule.spaced("15 seconds"), times: 48 }));
  });

describe.skipIf(!process.env.AZURE_DISTILLED_LIVE)("live messaging data planes", () => {
  test("Service Bus send/peek-lock/complete and Event Hubs send batch with an Entra token", async () => {
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
            Effect.tapError(() => teardown(values.subscriptionId!, []).pipe(Effect.ignore)),
          );
          const gone = yield* teardown(result.subscriptionId, result.assignments);
          return { result, gone };
        }).pipe(Effect.provide(live));
      }).pipe(Effect.provide(FetchHttpClient.layer), Effect.provide(NodeFileSystem.layer)),
    );
    const { result: r, gone } = outcome;

    expect(textOf(r.locked.body)).toBe("hello from distilled");
    expect(r.locked.contentType).toBe("text/plain");
    expect(r.locked.brokerProperties?.label).toBe("M1");
    expect(r.locked.brokerProperties?.messageId).toBe("distilled-1");
    expect(r.locked.brokerProperties?.deliveryCount).toBe(1);
    expect(r.locked.headers?.priority).toBe('"High"');
    expect(r.locked.location).toContain(
      `/jobs/messages/${r.locked.brokerProperties?.sequenceNumber}/`,
    );
    expect(r.settledAgain._tag).toBe("MessageLockLost");

    expect(textOf(r.first.body)).toBe("batch-1");
    expect(r.first.brokerProperties?.label).toBe("B1");
    expect(textOf(r.second.body)).toBe("batch-2");
    expect(r.second.headers?.customer).toBe('"ABC"');
    expect(r.drained.body).toBeUndefined();
    expect(r.missingQueue._tag).toBe("MessagingEntityNotFound");

    expect(r.mixedKeys._tag).toBe("BatchPartitionKeyMismatch");
    expect(r.badPartition._tag).toBe("InvalidPartition");
    expect(r.hub.properties?.partitionIds).toEqual(["0", "1"]);

    expect(gone._tag).toBe("ResourceGroupNotFound");
  }, 1_500_000);
});
