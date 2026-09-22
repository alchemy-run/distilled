# @distilled.cloud/surrealdb

Effect-native SDK for [surrealdb](https://www.npmjs.com/package/@distilled.cloud/surrealdb).

## Installation

```bash
npm install @distilled.cloud/surrealdb effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Surrealdb from "@distilled.cloud/surrealdb";

const program = Effect.gen(function* () {
  const result = yield* Surrealdb.getVersion({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Surrealdb.CredentialsFromEnv,
  Surrealdb.SurrealdbProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `SURREALDB_API_KEY`. Optional: `SURREALDB_API_BASE_URL`. Sent as `Authorization: Bearer`.
