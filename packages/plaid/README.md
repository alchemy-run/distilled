# @distilled.cloud/plaid

Effect-native SDK for [plaid](https://www.npmjs.com/package/@distilled.cloud/plaid).

## Installation

```bash
npm install @distilled.cloud/plaid effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Plaid from "@distilled.cloud/plaid";

const program = Effect.gen(function* () {
  const result = yield* Plaid.institutionsGet({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Plaid.CredentialsFromEnv,
  Plaid.PlaidProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `PLAID_CLIENT_ID`, `PLAID_ENV`, `PLAID_SECRET`, `PLAID_VERSION`. Optional: `PLAID_API_BASE_URL`.
