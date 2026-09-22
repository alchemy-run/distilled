# @distilled.cloud/unkey

Effect-native SDK for [unkey](https://www.npmjs.com/package/@distilled.cloud/unkey).

## Installation

```bash
npm install @distilled.cloud/unkey effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Unkey from "@distilled.cloud/unkey";

const program = Effect.gen(function* () {
  const result = yield* Unkey.apisListKeys({ apiId: "api_123" });
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Unkey.CredentialsFromEnv,
  Unkey.UnkeyProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `UNKEY_ROOT_KEY`. Optional: `UNKEY_API_BASE_URL`. Sent as `Authorization: Bearer`.
