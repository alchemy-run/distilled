# @distilled.cloud/xata

Effect-native SDK for [xata](https://www.npmjs.com/package/@distilled.cloud/xata).

## Installation

```bash
npm install @distilled.cloud/xata effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Xata from "@distilled.cloud/xata";

const program = Effect.gen(function* () {
  const result = yield* Xata.getOrganizationsList({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Xata.CredentialsFromEnv,
  Xata.XataProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `XATA_API_KEY`. Optional: `XATA_API_BASE_URL`. Sent as `Authorization: Bearer`.
