# @distilled.cloud/mongodb-atlas

Effect-native SDK for [mongodb-atlas](https://www.npmjs.com/package/@distilled.cloud/mongodb-atlas).

## Installation

```bash
npm install @distilled.cloud/mongodb-atlas effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as MongodbAtlas from "@distilled.cloud/mongodb-atlas";

const program = Effect.gen(function* () {
  const result = yield* MongodbAtlas.atlas.listGroups({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  MongodbAtlas.CredentialsFromEnv,
  MongodbAtlas.MongodbAtlasProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `MONGODB_ATLAS_CLIENT_ID`, `MONGODB_ATLAS_CLIENT_SECRET`. Optional: `MONGODB_ATLAS_API_BASE_URL`. Sent as `Authorization: Bearer`.
