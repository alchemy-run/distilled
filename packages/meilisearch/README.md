# @distilled.cloud/meilisearch

Effect-native SDK for [meilisearch](https://www.npmjs.com/package/@distilled.cloud/meilisearch).

## Installation

```bash
npm install @distilled.cloud/meilisearch effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Meilisearch from "@distilled.cloud/meilisearch";

const program = Effect.gen(function* () {
  const result = yield* Meilisearch.listIndexes({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Meilisearch.CredentialsFromEnv,
  Meilisearch.MeilisearchProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `MEILISEARCH_API_KEY`. Optional: `MEILISEARCH_API_BASE_URL`.
