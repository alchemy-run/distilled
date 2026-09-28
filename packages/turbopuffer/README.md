# @distilled.cloud/turbopuffer

Effect-native SDK for [turbopuffer](https://www.npmjs.com/package/@distilled.cloud/turbopuffer).

## Installation

```bash
npm install @distilled.cloud/turbopuffer effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Turbopuffer from "@distilled.cloud/turbopuffer";

const program = Effect.gen(function* () {
  const result = yield* Turbopuffer.getV1Namespaces({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Turbopuffer.CredentialsFromEnv,
  Turbopuffer.TurbopufferProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `TURBOPUFFER_API_KEY`. Optional: `TURBOPUFFER_API_BASE_URL`.
