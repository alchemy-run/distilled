# @distilled.cloud/squarespace

Effect-native SDK for [squarespace](https://www.npmjs.com/package/@distilled.cloud/squarespace).

## Installation

```bash
npm install @distilled.cloud/squarespace effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Squarespace from "@distilled.cloud/squarespace";

const program = Effect.gen(function* () {
  const result = yield* Squarespace.getProducts({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Squarespace.CredentialsFromEnv,
  Squarespace.SquarespaceProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `SQUARESPACE_API_KEY`. Optional: `SQUARESPACE_API_BASE_URL`, `SQUARESPACE_USER_AGENT`. Sent as `Authorization: Bearer`.
