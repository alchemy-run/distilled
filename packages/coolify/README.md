# @distilled.cloud/coolify

Effect-native SDK for [coolify](https://www.npmjs.com/package/@distilled.cloud/coolify).

## Installation

```bash
npm install @distilled.cloud/coolify effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Coolify from "@distilled.cloud/coolify";

const program = Effect.gen(function* () {
  const result = yield* Coolify.listApplications({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Coolify.CredentialsFromEnv,
  Coolify.CoolifyProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `COOLIFY_TOKEN`. Optional: `COOLIFY_API_BASE_URL`. Sent as `Authorization: Bearer`.
