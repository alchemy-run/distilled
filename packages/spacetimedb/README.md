# @distilled.cloud/spacetimedb

Effect-native SDK for [spacetimedb](https://www.npmjs.com/package/@distilled.cloud/spacetimedb).

## Installation

```bash
npm install @distilled.cloud/spacetimedb effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as SpacetimeDB from "@distilled.cloud/spacetimedb";

const program = Effect.gen(function* () {
  const result = yield* SpacetimeDB.getDatabase({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  SpacetimeDB.CredentialsFromEnv,
  SpacetimeDB.SpacetimeDBProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `SPACETIMEDB_HOST`, `SPACETIMEDB_TOKEN`, `SPACETIME_HOST`, `SPACETIME_TOKEN`. Optional: `SPACETIMEDB_API_BASE_URL`. Sent as `Authorization: Bearer`.
