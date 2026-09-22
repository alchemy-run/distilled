# @distilled.cloud/gusto

Effect-native SDK for [gusto](https://www.npmjs.com/package/@distilled.cloud/gusto).

## Installation

```bash
npm install @distilled.cloud/gusto effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Gusto from "@distilled.cloud/gusto";

const program = Effect.gen(function* () {
  const result = yield* Gusto.getV1Companies({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Gusto.CredentialsFromEnv,
  Gusto.GustoProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `GUSTO_ACCESS_TOKEN`, `GUSTO_API_KEY`, `GUSTO_API_TOKEN`, `GUSTO_API_VERSION`. Optional: `GUSTO_API_BASE_URL`. Sent as `Authorization: Bearer`.
