# @distilled.cloud/coinbase

Effect-native SDK for [coinbase](https://www.npmjs.com/package/@distilled.cloud/coinbase).

## Installation

```bash
npm install @distilled.cloud/coinbase effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Coinbase from "@distilled.cloud/coinbase";

const program = Effect.gen(function* () {
  const result = yield* Coinbase.listBalances({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Coinbase.CredentialsFromEnv,
  Coinbase.CoinbaseProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `CDP_API_KEY_ID`, `CDP_API_KEY_NAME`, `CDP_API_KEY_SECRET`, `CDP_WALLET_SECRET`.
