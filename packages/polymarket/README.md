# @distilled.cloud/polymarket

Effect-native Polymarket SDK, generated from Polymarket's REST OpenAPI documents
listed at https://docs.polymarket.com/llms.txt.

One module per API, each on its own host:

| Module      | API                              | Host                                    |
| ----------- | -------------------------------- | --------------------------------------- |
| `gamma`     | Markets, events, tags, search    | `https://gamma-api.polymarket.com`      |
| `clob`      | Order book, prices, orders       | `https://clob.polymarket.com`           |
| `data`      | Positions, activity, holders     | `https://data-api.polymarket.com`       |
| `relayer`   | Gasless transactions             | `https://relayer-v2.polymarket.com`     |
| `bridge`    | Deposits and withdrawals         | `https://bridge.polymarket.com`         |
| `combosRfq` | Combinatorial RFQ                | `https://combos-rfq-api.polymarket.com` |
| `perps`     | Perpetuals                       | `https://api.perpetuals.polymarket.com` |

## Installation

```bash
npm install @distilled.cloud/polymarket effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Polymarket from "@distilled.cloud/polymarket";

const program = Effect.gen(function* () {
  // Gamma: the open market with the most 24-hour volume.
  const [market] = yield* Polymarket.gamma.listMarkets({
    limit: 1,
    closed: false,
    order: "volume24hr",
    ascending: false,
  });
  if (market?.conditionId == null) return yield* Effect.fail("no open market");

  // CLOB: the order book of its first outcome token.
  const [tokenId] = JSON.parse(market.clobTokenIds ?? "[]") as string[];
  const book = yield* Polymarket.clob.getBook({ token_id: tokenId! });

  // Data: its largest holders.
  const holders = yield* Polymarket.data.getHolders({
    condition: market.conditionId,
    limit: 3,
  });

  return { question: market.question, bids: book.bids, asks: book.asks, holders };
});

const Live = Layer.mergeAll(FetchHttpClient.layer, Polymarket.CredentialsFromEnv);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

Each operation carries its API's protocol, so there is no protocol layer to
provide.

## Auth

Public reads (all of Gamma, Data and Bridge, and most CLOB, Relayer and
Perps reads) need no credentials. `CredentialsFromEnv` reads these optional
groups; a group that is partly set fails with `ConfigError`:

| Group   | Variables                                                    | Sent as                                                                         |
| ------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| CLOB L2 | `CLOB_API_KEY`, `CLOB_SECRET`, `CLOB_PASS_PHRASE`, `POLY_ADDRESS` | `POLY_API_KEY`, `POLY_PASSPHRASE`, `POLY_ADDRESS`, `POLY_TIMESTAMP`, `POLY_SIGNATURE` on CLOB and Combos RFQ |
| Relayer | `RELAYER_API_KEY`, `RELAYER_API_KEY_ADDRESS`                 | the same headers                                                                |
| Perps   | `POLYMARKET_PROXY`, `POLYMARKET_SECRET`                      | `POLYMARKET-PROXY`, `POLYMARKET-SECRET`                                         |

`CLOB_API_URL` overrides the CLOB host. `Polymarket.credentials({ clob,
relayer, perps, baseUrls })` sets the same values from code; every secret is
a `Redacted<string>`.

`POLY_SIGNATURE` is HMAC-SHA256 over `timestamp + METHOD + path + body` with
the base64 API secret, as URL-safe base64 (`Polymarket.signL2`).

Not covered:

- L1 auth (an EIP-712 wallet signature). `clob.createApiKey`,
  `clob.deriveApiKey` and `perps.createProxy` need one, and so do the order
  payloads for `clob.createOrder`. Create the L2 credentials with
  Polymarket's own client, then pass them here.
- Relayer Builder API key auth (`POLY_BUILDER_*`).
- The WebSocket (AsyncAPI) APIs.
