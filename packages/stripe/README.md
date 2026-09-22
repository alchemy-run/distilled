# @distilled.cloud/stripe

Effect-native SDK for [stripe](https://www.npmjs.com/package/@distilled.cloud/stripe).

## Installation

```bash
npm install @distilled.cloud/stripe effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Stripe from "@distilled.cloud/stripe";

const program = Effect.gen(function* () {
  const result = yield* Stripe.CreateCustomer({
    email: "ops@example.com",
  });
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Stripe.CredentialsFromEnv,
  Stripe.StripeProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `STRIPE_API_KEY`.
