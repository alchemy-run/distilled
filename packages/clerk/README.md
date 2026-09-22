# @distilled.cloud/clerk

Effect-native SDK for [clerk](https://www.npmjs.com/package/@distilled.cloud/clerk).

## Installation

```bash
npm install @distilled.cloud/clerk effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Clerk from "@distilled.cloud/clerk";

const program = Effect.gen(function* () {
  const result = yield* Clerk.getUserList({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Clerk.CredentialsFromEnv,
  Clerk.ClerkProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `CLERK_API_VERSION`, `CLERK_SECRET_KEY`. Optional: `CLERK_API_BASE_URL`. Sent as `Authorization: Bearer`.
