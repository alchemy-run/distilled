import { readFileSync } from "node:fs";
import * as path from "node:path";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Result from "effect/Result";
import { describe, expect, test } from "vitest";
import { fromToken } from "../src/credentials.ts";
import * as Kubernetes from "../src/index.ts";
import * as Retry from "../src/retry.ts";

/** Run `effect` against a fake API server that answers `reply`. */
const call = async <A, E, R>(effect: Effect.Effect<A, E, R>, reply: unknown, status = 200) => {
  let request: HttpClientRequest.HttpClientRequest | undefined;
  const client = HttpClient.make((req) =>
    Effect.sync(() => {
      request = req;
      return HttpClientResponse.fromWeb(req, new Response(JSON.stringify(reply), { status }));
    }),
  );
  const result = await Effect.runPromise(
    effect.pipe(
      Effect.result,
      Retry.none,
      Effect.provide(
        Layer.mergeAll(
          Layer.succeed(HttpClient.HttpClient, client),
          fromToken({ token: Redacted.make("t"), apiBaseUrl: "https://k8s.test" }),
        ),
      ),
    ) as Effect.Effect<Result.Result<A, E>>,
  );
  const web = Result.getOrThrow(HttpClientRequest.toWebResult(request!));
  return { result, web, body: await web.text() };
};

const snapshot = {
  apiVersion: "snapshot.storage.k8s.io/v1",
  kind: "VolumeSnapshot",
  metadata: { name: "data-snap", namespace: "default" },
  spec: {
    volumeSnapshotClassName: "csi-snapclass",
    source: { persistentVolumeClaimName: "data" },
  },
};

describe("snapshot.storage.k8s.io/v1 (a CRD group)", () => {
  test("creates a VolumeSnapshot", async () => {
    const { result, web, body } = await call(
      Kubernetes.snapshot_storage.createSnapshotStorageV1NamespacedVolumeSnapshot({
        namespace: "default",
        ...snapshot,
      }),
      snapshot,
    );
    expect(web.method).toBe("POST");
    expect(web.url).toBe(
      "https://k8s.test/apis/snapshot.storage.k8s.io/v1/namespaces/default/volumesnapshots",
    );
    expect(JSON.parse(body)).toEqual(snapshot);
    expect(Result.getOrThrow(result).spec.source.persistentVolumeClaimName).toBe("data");
  });

  test("lists cluster-scoped VolumeSnapshotClasses", async () => {
    const { result, web } = await call(
      Kubernetes.snapshot_storage.listSnapshotStorageV1VolumeSnapshotClass({ limit: 10 }),
      {
        apiVersion: "snapshot.storage.k8s.io/v1",
        kind: "VolumeSnapshotClassList",
        metadata: {},
        items: [
          {
            metadata: { name: "csi-snapclass" },
            driver: "hostpath.csi.k8s.io",
            deletionPolicy: "Delete",
          },
        ],
      },
    );
    expect(web.url).toBe(
      "https://k8s.test/apis/snapshot.storage.k8s.io/v1/volumesnapshotclasses?limit=10",
    );
    expect(Result.getOrThrow(result).items[0]?.driver).toBe("hostpath.csi.k8s.io");
  });

  test("reads a missing VolumeSnapshot as NotFound", async () => {
    const { result } = await call(
      Kubernetes.snapshot_storage.readSnapshotStorageV1NamespacedVolumeSnapshot({
        namespace: "default",
        name: "gone",
      }),
      {
        kind: "Status",
        apiVersion: "v1",
        status: "Failure",
        message: 'volumesnapshots.snapshot.storage.k8s.io "gone" not found',
        reason: "NotFound",
        code: 404,
      },
      404,
    );
    expect(Result.isFailure(result) && result.failure._tag).toBe("NotFound");
  });

  test("declares the same typed errors as a built-in resource of the same scope", () => {
    const errors = (module: string) => {
      const source = readFileSync(
        path.join(import.meta.dirname, `../src/services/${module}.ts`),
        "utf8",
      );
      return Object.fromEntries(
        [
          ...source.matchAll(
            /export const (\w+): API\.OperationMethod<[\s\S]*?errors: \[([^\]]*)\]/g,
          ),
        ].map((m) => [m[1]!, m[2]!]),
      );
    };
    const builtIn = { ...errors("batch"), ...errors("core") };
    const custom = Object.entries(errors("snapshot_storage"));
    expect(custom.length).toBeGreaterThan(0);
    for (const [name, union] of custom) {
      // VolumeSnapshotContent and VolumeSnapshotClass are cluster-scoped
      // like a PersistentVolume; VolumeSnapshot is namespaced like a Job.
      const template = name
        .replace(/SnapshotStorageV1(\w*)VolumeSnapshot(Content|Class)/, "CoreV1$1PersistentVolume")
        .replace(/SnapshotStorageV1(\w*)VolumeSnapshot/, "BatchV1$1Job");
      expect([name, union]).toEqual([name, builtIn[template]]);
    }
  });
});
