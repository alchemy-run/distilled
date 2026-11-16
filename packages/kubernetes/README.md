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
import * as Core from "@distilled.cloud/kubernetes/core";

const program = Effect.gen(function* () {
  const result = yield* Core.listCoreV1NamespacedPod({ namespace: "default" });
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Kubernetes.CredentialsFromEnv,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Patching

Every `patch*` operation takes its patch type as `contentType`. For a merge
patch, a strategic merge patch or a server-side apply, set the resource
fields directly, as for `create*` and `replace*`. Every nested field is
optional, and `null` removes a field:

```ts
import * as Apps from "@distilled.cloud/kubernetes/apps";
import * as Core from "@distilled.cloud/kubernetes/core";

// Merge patch
yield* Apps.patchAppsV1NamespacedStatefulSet({
  namespace: "default",
  name: "web",
  contentType: "application/merge-patch+json",
  spec: { replicas: 3 },
  metadata: { labels: { canary: null } },
});

// Server-side apply: the fields you own, with a field manager
yield* Core.patchCoreV1Namespace({
  name: "web",
  contentType: "application/apply-patch+yaml",
  fieldManager: "my-controller",
  force: true,
  apiVersion: "v1",
  kind: "Namespace",
  metadata: { name: "web" },
});
```

A JSON patch is an array of operations, so it goes in `patch`:

```ts
import * as Apps from "@distilled.cloud/kubernetes/apps";

yield* Apps.patchAppsV1NamespacedStatefulSet({
  namespace: "default",
  name: "web",
  contentType: "application/json-patch+json",
  patch: [{ op: "replace", path: "/spec/replicas", value: 3 }],
});
```

`application/strategic-merge-patch+json` works for built-in resources only.

## Auth

Required: `KUBERNETES_TOKEN`. Optional: `KUBERNETES_API_URL`. Sent as `Authorization: Bearer`.
