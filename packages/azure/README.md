# @distilled.cloud/azure

Effect-native SDK for [azure](https://www.npmjs.com/package/@distilled.cloud/azure).

## Installation

```bash
npm install @distilled.cloud/azure effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Azure from "@distilled.cloud/azure";

const program = Effect.gen(function* () {
  const result = yield* Azure.resources.ResourceGroupsList({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Azure.CredentialsFromEnv,
  Azure.AzureProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `AZURE_BEARER_TOKEN`, `AZURE_SUBSCRIPTION_ID`, `AZURE_TENANT_ID`. Optional: `AZURE_API_BASE_URL`. Sent as `Authorization: Bearer`.
