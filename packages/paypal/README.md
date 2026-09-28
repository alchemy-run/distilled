# @distilled.cloud/paypal

Effect-native SDK for [paypal](https://www.npmjs.com/package/@distilled.cloud/paypal).

## Installation

```bash
npm install @distilled.cloud/paypal effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Paypal from "@distilled.cloud/paypal";

const program = Effect.gen(function* () {
  const result = yield* Paypal.checkoutOrdersV2.ordersCreate({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Paypal.CredentialsFromEnv,
  Paypal.PaypalProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `PAYPAL_ACCESS_TOKEN`. Optional: `PAYPAL_API_BASE_URL`. Sent as `Authorization: Bearer`.
