# @distilled.cloud/auth0

Effect-native SDK for [auth0](https://www.npmjs.com/package/@distilled.cloud/auth0).

## Installation

```bash
npm install @distilled.cloud/auth0 effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Auth0 from "@distilled.cloud/auth0";

const program = Effect.gen(function* () {
  const result = yield* Auth0.getActions({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Auth0.CredentialsFromEnv,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Early Access operations

Auth0 marks some operations Early Access (`x-release-lifecycle: "EA"`), for
example feature flags, experiments, action modules and agents. They import
from `unstable/auth0`; the package root exports the generally available ones:

```ts
import * as Auth0Unstable from "@distilled.cloud/auth0/unstable/auth0";

const flags = yield* Auth0Unstable.getFeatureFlags({});
```

## Auth

Required: `AUTH0_DOMAIN`, `AUTH0_MANAGEMENT_TOKEN`. Optional: `AUTH0_API_BASE_URL`. Sent as `Authorization: Bearer`.
