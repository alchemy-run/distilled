# @distilled.cloud/neon

Effect-native SDK for [neon](https://www.npmjs.com/package/@distilled.cloud/neon).

## Installation

```bash
npm install @distilled.cloud/neon effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Neon from "@distilled.cloud/neon";

const program = Effect.gen(function* () {
  const result = yield* Neon.listProjects({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Neon.CredentialsFromEnv,
  Neon.NeonProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `NEON_API_KEY`. Optional: `NEON_API_BASE_URL`.
