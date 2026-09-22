# @distilled.cloud/modrinth

Effect-native SDK for [modrinth](https://www.npmjs.com/package/@distilled.cloud/modrinth).

## Installation

```bash
npm install @distilled.cloud/modrinth effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Modrinth from "@distilled.cloud/modrinth";

const program = Effect.gen(function* () {
  const result = yield* Modrinth.searchProjects({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Modrinth.CredentialsFromEnv,
  Modrinth.ModrinthProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `MODRINTH_API_KEY`. Optional: `MODRINTH_API_BASE_URL`, `MODRINTH_USER_AGENT`. Sent as `Authorization: Bearer`.
