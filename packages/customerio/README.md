# @distilled.cloud/customerio

Effect-native SDK for [customerio](https://www.npmjs.com/package/@distilled.cloud/customerio).

## Installation

```bash
npm install @distilled.cloud/customerio effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Customerio from "@distilled.cloud/customerio";

const program = Effect.gen(function* () {
  const result = yield* Customerio.listCampaigns({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Customerio.CredentialsFromEnv,
  Customerio.CustomerioProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `CUSTOMERIO_API_KEY`. Optional: `CUSTOMERIO_API_BASE_URL`. Sent as `Authorization: Bearer`.
