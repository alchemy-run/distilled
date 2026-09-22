# @distilled.cloud/remote

Effect-native SDK for [remote](https://www.npmjs.com/package/@distilled.cloud/remote).

## Installation

```bash
npm install @distilled.cloud/remote effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Remote from "@distilled.cloud/remote";

const program = Effect.gen(function* () {
  const result = yield* Remote.getV1Countries({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Remote.CredentialsFromEnv,
  Remote.RemoteProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `REMOTE_ACCESS_TOKEN`, `REMOTE_API_KEY`. Optional: `REMOTE_API_BASE_URL`. Sent as `Authorization: Bearer`.
