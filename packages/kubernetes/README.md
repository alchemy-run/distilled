# @distilled.cloud/kubernetes

Effect-native SDK for [kubernetes](https://www.npmjs.com/package/@distilled.cloud/kubernetes).

## Installation

```bash
npm install @distilled.cloud/kubernetes effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
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

## Auth

Required: `KUBERNETES_TOKEN`. Optional: `KUBERNETES_API_URL`. Sent as `Authorization: Bearer`.
