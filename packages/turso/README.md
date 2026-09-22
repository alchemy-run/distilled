# @distilled.cloud/turso

Effect-native SDK for [turso](https://www.npmjs.com/package/@distilled.cloud/turso).

## Installation

```bash
npm install @distilled.cloud/turso effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Turso from "@distilled.cloud/turso";

const program = Effect.gen(function* () {
  const result = yield* Turso.listAPITokens({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Turso.CredentialsFromEnv,
  Turso.TursoProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `TURSO_API_KEY`. Sent as `Authorization: Bearer`.
