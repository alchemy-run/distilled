# @distilled.cloud/coinbase

Effect-native SDK for [coinbase](https://www.npmjs.com/package/@distilled.cloud/coinbase).

## Installation

```bash
npm install @distilled.cloud/coinbase effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Coinbase from "@distilled.cloud/coinbase";
import * as Cdp from "@distilled.cloud/coinbase/cdp";

const program = Effect.gen(function* () {
  const result = yield* Cdp.listEvmAccounts({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Coinbase.CredentialsFromEnv,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Beta APIs

Coinbase tiers some API groups `beta` (`x-slo-tier` on the tag): Accounts,
Customers, Transfers, Mandates, x402 Facilitator and others. Their operations
import from `unstable/`:

```ts
import * as CdpUnstable from "@distilled.cloud/coinbase/unstable/cdp";

const balances = yield* CdpUnstable.listBalances({ accountId });
```

## Auth

Required: `CDP_API_KEY_ID`, `CDP_API_KEY_NAME`, `CDP_API_KEY_SECRET`, `CDP_WALLET_SECRET`.
