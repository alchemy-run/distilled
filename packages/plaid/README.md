# @distilled.cloud/plaid

Effect-native SDK for [plaid](https://www.npmjs.com/package/@distilled.cloud/plaid).

## Installation

```bash
npm install @distilled.cloud/plaid effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Plaid from "@distilled.cloud/plaid";

const program = Effect.gen(function* () {
  const result = yield* Plaid.institutionsGet({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Plaid.CredentialsFromEnv,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Beta endpoints

Plaid serves its beta endpoints under `/beta/` (transaction rules, issues,
partner customers and others). Those operations import from `unstable/`:

```ts
import * as PlaidUnstable from "@distilled.cloud/plaid/unstable/plaid";

const rules = yield* PlaidUnstable.listTransactionsRules({ client_user_id: "user-1" });
```

## Auth

Required: `PLAID_CLIENT_ID`, `PLAID_ENV`, `PLAID_SECRET`, `PLAID_VERSION`. Optional: `PLAID_API_BASE_URL`.
