# @distilled.cloud/mercury

Effect-native SDK for [mercury](https://www.npmjs.com/package/@distilled.cloud/mercury).

## Installation

```bash
npm install @distilled.cloud/mercury effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Mercury from "@distilled.cloud/mercury";

const program = Effect.gen(function* () {
  const result = yield* Mercury.getAccounts({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Mercury.CredentialsFromEnv,
  Mercury.MercuryProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `MERCURY_API_KEY`. Optional: `MERCURY_API_BASE_URL`.
