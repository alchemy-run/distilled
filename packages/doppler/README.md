# @distilled.cloud/doppler

Effect-native SDK for [doppler](https://www.npmjs.com/package/@distilled.cloud/doppler).

## Installation

```bash
npm install @distilled.cloud/doppler effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Doppler from "@distilled.cloud/doppler";

const program = Effect.gen(function* () {
  const result = yield* Doppler.projectsList({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Doppler.CredentialsFromEnv,
  Doppler.DopplerProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `DOPPLER_API_KEY`, `DOPPLER_TOKEN`. Optional: `DOPPLER_API_BASE_URL`. Sent as `Authorization: Bearer`.
