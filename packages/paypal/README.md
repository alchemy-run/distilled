# @distilled.cloud/paypal

Effect-native SDK for [paypal](https://www.npmjs.com/package/@distilled.cloud/paypal).

## Installation

```bash
npm install @distilled.cloud/paypal effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Paypal from "@distilled.cloud/paypal";
import * as CheckoutOrdersV2 from "@distilled.cloud/paypal/checkout_orders_v2";

const program = Effect.gen(function* () {
  const result = yield* CheckoutOrdersV2.ordersCreate({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Paypal.CredentialsFromEnv,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `PAYPAL_ACCESS_TOKEN`. Optional: `PAYPAL_API_BASE_URL`. Sent as `Authorization: Bearer`.
