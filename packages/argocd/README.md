# @distilled.cloud/argocd

Effect-native SDK for [argocd](https://www.npmjs.com/package/@distilled.cloud/argocd).

## Installation

```bash
npm install @distilled.cloud/argocd effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Argocd from "@distilled.cloud/argocd";

const program = Effect.gen(function* () {
  const result = yield* Argocd.applicationServiceList({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Argocd.CredentialsFromEnv,
  Argocd.ArgocdProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `ARGOCD_SERVER`, `ARGOCD_TOKEN`. Sent as `Authorization: Bearer`.
