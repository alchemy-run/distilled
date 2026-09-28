# @distilled.cloud/metabase

Effect-native SDK for [metabase](https://www.npmjs.com/package/@distilled.cloud/metabase).

## Installation

```bash
npm install @distilled.cloud/metabase effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Metabase from "@distilled.cloud/metabase";

const program = Effect.gen(function* () {
  const result = yield* Metabase.getApiCard({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Metabase.CredentialsFromEnv,
  Metabase.MetabaseProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Optional: `METABASE_API_BASE_URL`, `METABASE_API_KEY`.
