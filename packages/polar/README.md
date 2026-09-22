# @distilled.cloud/polar

Effect-native SDK for [polar](https://www.npmjs.com/package/@distilled.cloud/polar).

## Installation

```bash
npm install @distilled.cloud/polar effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Polar from "@distilled.cloud/polar";

const program = Effect.gen(function* () {
  const result = yield* Polar.organizationsList({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Polar.CredentialsFromEnv,
  Polar.PolarProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `POLAR_API_KEY`. Optional: `POLAR_API_BASE_URL`.
