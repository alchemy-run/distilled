# @distilled.cloud/temporal

Effect-native SDK for [temporal](https://www.npmjs.com/package/@distilled.cloud/temporal).

## Installation

```bash
npm install @distilled.cloud/temporal effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Temporal from "@distilled.cloud/temporal";

const program = Effect.gen(function* () {
  const result = yield* Temporal.listNamespaces({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Temporal.CredentialsFromEnv,
  Temporal.TemporalProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `TEMPORAL_API_KEY`. Optional: `TEMPORAL_API_BASE_URL`. Sent as `Authorization: Bearer`.
