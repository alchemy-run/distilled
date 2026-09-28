# @distilled.cloud/adyen

Effect-native SDK for [adyen](https://www.npmjs.com/package/@distilled.cloud/adyen).

## Installation

```bash
npm install @distilled.cloud/adyen effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Adyen from "@distilled.cloud/adyen";

const program = Effect.gen(function* () {
  const result = yield* Adyen.postPaymentMethods({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Adyen.CredentialsFromEnv,
  Adyen.AdyenProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `ADYEN_API_KEY`. Optional: `ADYEN_API_BASE_URL`.
