# @distilled.cloud/coinbase

Effect-native Coinbase Developer Platform SDK generated from the [CDP SDK](https://github.com/coinbase/cdp-sdk) specification. Manage EVM and Solana wallets, sign transactions, swap tokens, request faucets, manage policies, and more with exhaustive error typing.

## Installation

```bash
npm install @distilled.cloud/coinbase effect
```

## Quick Start

```typescript
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import { listEvmAccounts } from "@distilled.cloud/coinbase/Operations";
import { CredentialsFromEnv } from "@distilled.cloud/coinbase";

const program = Effect.gen(function* () {
  const accounts = yield* listEvmAccounts({});
  return accounts;
});

const CoinbaseLive = Layer.mergeAll(FetchHttpClient.layer, CredentialsFromEnv);

program.pipe(Effect.provide(CoinbaseLive), Effect.runPromise);
```

## Configuration

Set the following environment variables:

```bash
CDP_API_KEY_ID=your-api-key-id        # UUID or organizations/.../apiKeys/... format
CDP_API_KEY_SECRET=your-api-key-secret # ES256 PEM or Ed25519 base64 private key
CDP_WALLET_SECRET=your-wallet-secret   # optional, for sensitive wallet operations
```

Create an API key in the [Coinbase Developer Platform](https://portal.cdp.coinbase.com/) under **API Keys**. The SDK automatically signs each request with a short-lived JWT (120s) using your private key. Both **ES256** (ECDSA P-256 PEM) and **Ed25519** (base64) key formats are supported.

`CDP_WALLET_SECRET` is only required for operations that modify wallet accounts (create, import, delete). If omitted, those operations will fail.

## Error Handling

Coinbase returns structured errors with an `errorType` field. All 40+ error types are mapped to typed error classes:

```typescript
import { createEvmAccount } from "@distilled.cloud/coinbase/Operations";

createEvmAccount({ name: "my-wallet" }).pipe(
  Effect.catchTags({
    AlreadyExists: () => Effect.succeed(null),
    PolicyViolation: (e) => Effect.fail(new Error(`Policy: ${e.errorMessage}`)),
    InsufficientBalance: (e) => Effect.fail(new Error(`Balance: ${e.errorMessage}`)),
    UnknownCoinbaseError: (e) => Effect.fail(new Error(`Unknown: ${e.message}`)),
  }),
);
```

## Services

Key operation areas include:

- **EVM Accounts** -- create, list, import, export, sign, send transactions
- **Solana Accounts** -- create, list, import, export, sign, send transactions
- **Smart Accounts** -- ERC-4337 user operations and EIP-7702 delegation
- **Token Balances** -- EVM, Solana, and cross-chain balance queries
- **Swaps** -- get prices and create swap quotes
- **Faucets** -- request testnet tokens (EVM and Solana)
- **Policies** -- create, update, delete access policies
- **Webhooks** -- subscribe to on-chain events
- **End Users** -- manage end-user accounts and MFA
- **Onramp** -- create fiat-to-crypto orders and sessions

## License

MIT
