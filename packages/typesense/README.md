# @distilled.cloud/typesense

Effect-native SDK for [typesense](https://www.npmjs.com/package/@distilled.cloud/typesense).

## Installation

```bash
npm install @distilled.cloud/typesense effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Typesense from "@distilled.cloud/typesense";

const program = Effect.gen(function* () {
  const result = yield* Typesense.listDocument({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Typesense.CredentialsFromEnv,
  Typesense.TypesenseProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `TYPESENSE_API_KEY`. Optional: `TYPESENSE_API_URL`.
