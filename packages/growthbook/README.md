# @distilled.cloud/growthbook

Effect-native SDK for [growthbook](https://www.npmjs.com/package/@distilled.cloud/growthbook).

## Installation

```bash
npm install @distilled.cloud/growthbook effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as GrowthBook from "@distilled.cloud/growthbook";

const program = Effect.gen(function* () {
  const result = yield* GrowthBook.listFeaturesV2({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  GrowthBook.CredentialsFromEnv,
  GrowthBook.GrowthBookProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `GROWTHBOOK_API_KEY`. Optional: `GROWTHBOOK_API_BASE_URL`. Sent as `Authorization: Bearer`.
