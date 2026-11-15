# @distilled.cloud/questrade

Effect-native [Questrade](https://www.questrade.com) SDK, generated from the
[Questrade API documentation](https://www.questrade.com/api/documentation/getting-started).

Questrade publishes no OpenAPI document. The spec mirror
(`distilled-mirror/spec-mirror-questrade`) transcribes every documentation
page into JSON, and `scripts/docs-to-openapi.ts` reads the property tables and
sample requests and responses into an OpenAPI document. Where the
documentation contradicts itself, a patch in `patches/` holds the fix and its
evidence.

## Installation

```bash
npm install @distilled.cloud/questrade effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Questrade from "@distilled.cloud/questrade";

const program = Effect.gen(function* () {
  const { accounts = [] } = yield* Questrade.listAccounts({});
  const account = accounts[0]?.number;
  if (account === undefined) return;

  const balances = yield* Questrade.getBalances({ id: account });
  const { positions = [] } = yield* Questrade.listPositions({ id: account });
  const { symbols = [] } = yield* Questrade.searchSymbols({ prefix: "SHOP" });
  const symbolId = symbols[0]?.symbolId;
  const quote =
    symbolId === undefined ? undefined : yield* Questrade.getQuote({ id: symbolId });

  return { balances: balances.combinedBalances, positions, quote: quote?.quotes?.[0] };
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Questrade.CredentialsFromEnv,
  Questrade.QuestradeProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise).then(console.log);
```

## Auth

Questrade uses OAuth 2.0. For a personal app, generate a refresh token in the
API Centre (**API centre → Personal apps → New manual authorization**) and set:

| Variable | Meaning |
| --- | --- |
| `QUESTRADE_REFRESH_TOKEN` | Refresh token from the API Centre. Redeemed on first use. |
| `QUESTRADE_LOGIN_URL` | Optional. Default `https://login.questrade.com`; `https://practicelogin.questrade.com` for a practice account. |
| `QUESTRADE_ACCESS_TOKEN` + `QUESTRADE_API_SERVER` | Optional. Use a token you already hold; no refresh. |

The SDK redeems the refresh token at `GET /oauth2/token`, sends the access
token as `Authorization: Bearer`, and calls the `api_server` the redemption
names. The access token lives 30 minutes; the SDK redeems again shortly before
it expires.

A refresh token works **once**: each redemption returns the next one. To keep
a program able to start again, store the new token with `fromRefreshToken`:

```ts
import * as Redacted from "effect/Redacted";

const Credentials = Questrade.fromRefreshToken({
  refreshToken: Redacted.make(savedRefreshToken),
  onRefresh: (tokens) => saveRefreshToken(Redacted.value(tokens.refreshToken)),
});
```

## Operations

| Area | Operations |
| --- | --- |
| Account | `getTime`, `listAccounts`, `getBalances`, `listPositions`, `listOrders`, `getOrder`, `listExecutions`, `listActivities` |
| Market data | `listMarkets`, `getSymbol`, `listSymbols`, `searchSymbols`, `getOptionChain`, `getQuote`, `listQuotes`, `getOptionQuotes`, `getStrategyQuotes`, `listCandles` |
| Orders (partner apps, `trade` scope) | `placeOrder`, `getOrderImpact`, `cancelOrder`, `placeBracketOrder`, `getBracketOrderImpact`, `placeStrategyOrder`, `getStrategyOrderImpact` |

Placing orders needs the `trade` scope, which Questrade grants to partner
developers only. Streaming (`GET /v1/notifications`, `?stream=true` quotes over
WebSocket) is not covered.
