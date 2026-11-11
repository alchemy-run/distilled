# @distilled.cloud/boat-dev

Effect-native SDK for [boat-dev](https://www.npmjs.com/package/@distilled.cloud/boat-dev).

## Installation

```bash
npm install @distilled.cloud/boat-dev effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Boat from "@distilled.cloud/boat-dev";

const program = Effect.gen(function* () {
  const result = yield* Boat.listSandboxes({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Boat.CredentialsFromEnv,
  Boat.BoatProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `BOAT_API_KEY`. Optional: `BOAT_API_BASE`, `BOAT_API_BASE_URL`,
`BOAT_ORG`.

`BOAT_ORG` (or `org` in `Boat.fromApiKey`) sets a default organization. The
SDK sends it as the `X-Boat-Org` header on every request. Without it, Boat
bills the account's active wallet. A per-call `xBoatOrg` or `org` overrides
the default. `/environments` routes ignore the header, so pass `org` on those
calls.
