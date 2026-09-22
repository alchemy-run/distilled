# @distilled.cloud/onepassword

Effect-native SDK for [onepassword](https://www.npmjs.com/package/@distilled.cloud/onepassword).

## Installation

```bash
npm install @distilled.cloud/onepassword effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Onepassword from "@distilled.cloud/onepassword";

const program = Effect.gen(function* () {
  const result = yield* Onepassword.getVaults({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Onepassword.CredentialsFromEnv,
  Onepassword.OnepasswordProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `OP_CONNECT_HOST`, `OP_CONNECT_TOKEN`. Optional: `OP_CONNECT_API_BASE_URL`. Sent as `Authorization: Bearer`.
