# @distilled.cloud/coinflow

Effect-native SDK for the [Coinflow](https://coinflow.cash) payments API (checkout, payouts,
credits), generated from Coinflow's [OpenAPI description](https://docs.coinflow.cash/openapi.json).

## Installation

```bash
npm install @distilled.cloud/coinflow effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Coinflow from "@distilled.cloud/coinflow";

const program = Effect.gen(function* () {
  const user = { authWallet: "0x1111111111111111111111111111111111111111", authBlockchain: "base" };

  const { withdrawer } = yield* Coinflow.withdraw.getWithdrawer(user);
  const quote = yield* Coinflow.withdraw.getQuote({
    ...user,
    merchantId: "my-merchant",
    token: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    amount: 25,
  });
  return { bankAccounts: withdrawer.bankAccounts.length, quote: quote.quote };
}).pipe(
  // 451: the user must finish KYC first; send them to the link.
  Effect.catchTag("VerificationRequired", (error) =>
    Effect.succeed({ verificationLink: error.body?.verificationLink }),
  ),
);

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Coinflow.CredentialsFromEnv,
  Coinflow.CoinflowProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

`COINFLOW_API_KEY` (the merchant API key) is sent as the raw `Authorization` header.
`COINFLOW_ENV` picks the environment: `sandbox` (`https://api-sandbox.coinflow.cash/api`, the
default) or `production` (`https://api.coinflow.cash/api`). `COINFLOW_API_BASE_URL` overrides the
URL. In code, use `Coinflow.credentials({ apiKey: Redacted.make(key), environment: "production" })`.

The end user a call acts for is part of each operation's input, following the security scheme
the spec gives that operation:

| Input members | Header | Scheme |
| --- | --- | --- |
| `authWallet`, `authBlockchain` | `x-coinflow-auth-wallet`, `x-coinflow-auth-blockchain` | `wallet` |
| `authUserId` | `x-coinflow-auth-user-id` | `userId` |
| `authSessionKey` | `x-coinflow-auth-session-key` | `sessionKey` |
| `embedSession` | `x-coinflow-embed-session` | `embedSession` |

Session keys (`authentication.getSessionKey`) and embed session tokens come back as `Redacted`.

## Errors

Each status an operation declares is a typed error carrying `message` and the parsed `body`:
`VerificationRequired` (451, `body.verificationLink`), `PreconditionFailed` (412),
`PaymentRequired` (402), `CustomerBlocked` (423), `PreconditionRequired` (428), `Gone` (410),
`ExpectationFailed` (417), `UpgradeRequired` (426), plus `BadRequest`, `Forbidden`, `NotFound`,
`Conflict` and `UnprocessableEntity`. Other failures surface as core's shared status classes or
`UnknownCoinflowError`.
