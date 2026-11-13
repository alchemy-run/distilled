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

## Patching

Every `patch*` operation takes the patch as `body` and its patch type as
`contentType`:

```ts
// Merge patch
yield* Kubernetes.apps.patchAppsV1NamespacedStatefulSet({
  namespace: "default",
  name: "web",
  contentType: "application/merge-patch+json",
  body: { spec: { replicas: 3 } },
});

// JSON patch
yield* Kubernetes.apps.patchAppsV1NamespacedStatefulSet({
  namespace: "default",
  name: "web",
  contentType: "application/json-patch+json",
  body: [{ op: "replace", path: "/spec/replicas", value: 3 }],
});

// Server-side apply: the full object you own, with a field manager
yield* Kubernetes.core.patchCoreV1Namespace({
  name: "web",
  contentType: "application/apply-patch+yaml",
  fieldManager: "my-controller",
  force: true,
  body: { apiVersion: "v1", kind: "Namespace", metadata: { name: "web" } },
});
```

`application/strategic-merge-patch+json` works for built-in resources only.

## Auth

Required: `KUBERNETES_TOKEN`. Optional: `KUBERNETES_API_URL`. Sent as `Authorization: Bearer`.
