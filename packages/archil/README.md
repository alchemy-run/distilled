# @distilled.cloud/archil

Effect-native SDK for [archil](https://www.npmjs.com/package/@distilled.cloud/archil).

## Installation

```bash
npm install @distilled.cloud/archil effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Archil from "@distilled.cloud/archil";

const program = Effect.gen(function* () {
  const result = yield* Archil.listDisks({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Archil.CredentialsFromEnv,
  Archil.ArchilProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `ARCHIL_API_KEY`. Optional: `ARCHIL_API_BASE_URL`. Sent as `Authorization: Bearer`.
