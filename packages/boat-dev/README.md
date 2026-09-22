# @distilled.cloud/boat-dev

Effect-native SDK for [boat-dev](https://www.npmjs.com/package/@distilled.cloud/boat-dev).

## Installation

```bash
npm install @distilled.cloud/boat-dev effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
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

Required: `BOAT_API_KEY`. Optional: `BOAT_API_BASE`, `BOAT_API_BASE_URL`.
