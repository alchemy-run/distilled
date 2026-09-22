# @distilled.cloud/chronosphere

Effect-native SDK for [chronosphere](https://www.npmjs.com/package/@distilled.cloud/chronosphere).

## Installation

```bash
npm install @distilled.cloud/chronosphere effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Chronosphere from "@distilled.cloud/chronosphere";

const program = Effect.gen(function* () {
  const result = yield* Chronosphere.listCollections({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Chronosphere.CredentialsFromEnv,
  Chronosphere.ChronosphereProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `CHRONOSPHERE_ACTOR`, `CHRONOSPHERE_API_TOKEN`, `CHRONOSPHERE_DOMAIN`. Optional: `CHRONOSPHERE_API_BASE_URL`. Sent as `Authorization: Bearer`.
