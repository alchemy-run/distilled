# @distilled.cloud/auth0

Effect-native SDK for [auth0](https://www.npmjs.com/package/@distilled.cloud/auth0).

## Installation

```bash
npm install @distilled.cloud/auth0 effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Auth0 from "@distilled.cloud/auth0";

const program = Effect.gen(function* () {
  const result = yield* Auth0.getActions({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Auth0.CredentialsFromEnv,
  Auth0.Auth0Protocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `AUTH0_DOMAIN`, `AUTH0_MANAGEMENT_TOKEN`. Optional: `AUTH0_API_BASE_URL`. Sent as `Authorization: Bearer`.
