# @distilled.cloud/whop

Effect-native SDK for [whop](https://www.npmjs.com/package/@distilled.cloud/whop).

## Installation

```bash
npm install @distilled.cloud/whop effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Whop from "@distilled.cloud/whop";

const program = Effect.gen(function* () {
  const result = yield* Whop.plans.createPlan({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Whop.CredentialsFromEnv,
  Whop.WhopProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `WHOP_API_KEY`, `WHOP_API_VERSION_DATE`. Optional: `WHOP_API_BASE_URL`. Sent as `Authorization: Bearer`.
