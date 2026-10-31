# @distilled.cloud/kubernetes

Effect-native SDK for [kubernetes](https://www.npmjs.com/package/@distilled.cloud/kubernetes).

## Installation

```bash
npm install @distilled.cloud/kubernetes effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Kubernetes from "@distilled.cloud/kubernetes";

const program = Effect.gen(function* () {
  const result = yield* Kubernetes.core.listCoreV1NamespacedPod({ namespace: "default" });
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Kubernetes.CredentialsFromEnv,
  Kubernetes.KubernetesProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Custom resources

The SDK also has typed clients for these CustomResourceDefinitions. They work
on a cluster that has the CRDs installed:

| Module | API group | Kinds |
| --- | --- | --- |
| `snapshot_storage` | `snapshot.storage.k8s.io/v1` | `VolumeSnapshot`, `VolumeSnapshotContent`, `VolumeSnapshotClass` |

```ts
yield* Kubernetes.snapshot_storage.createSnapshotStorageV1NamespacedVolumeSnapshot({
  namespace: "default",
  apiVersion: "snapshot.storage.k8s.io/v1",
  kind: "VolumeSnapshot",
  metadata: { name: "data-snap" },
  spec: {
    volumeSnapshotClassName: "csi-snapclass",
    source: { persistentVolumeClaimName: "data" },
  },
});
```

On a cluster that does not serve the API group, every call fails with
`NotFound`, as for a missing object. Check the group first (for example with
`Kubernetes.core.getAPIVersions`) if you must tell the two apart.

To add a CRD, mirror its manifest in
`stacks/distilled-submodules/spec-repos/kubernetes/fetch-specs.ts`, list it in
`CRDS` in `scripts/convert.ts`, and regenerate.

## Auth

Required: `KUBERNETES_TOKEN`. Optional: `KUBERNETES_API_URL`. Sent as `Authorization: Bearer`.
