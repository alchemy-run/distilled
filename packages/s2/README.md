# @distilled.cloud/s2

Effect-native SDK for [s2](https://www.npmjs.com/package/@distilled.cloud/s2).

## Installation

```bash
npm install @distilled.cloud/s2 effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as S2 from "@distilled.cloud/s2";

const program = Effect.gen(function* () {
  const result = yield* S2.streams.listStreams({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  S2.CredentialsFromEnv,
  S2.S2Protocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `S2_ACCESS_TOKEN`, `S2_BASIN`. Optional: `S2_ACCOUNT_ENDPOINT`, `S2_BASIN_ENDPOINT`. Sent as `Authorization: Bearer`.
