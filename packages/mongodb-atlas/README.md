# @distilled.cloud/mongodb-atlas

Effect-native SDK for [mongodb-atlas](https://www.npmjs.com/package/@distilled.cloud/mongodb-atlas).

## Installation

```bash
npm install @distilled.cloud/mongodb-atlas effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as MongodbAtlas from "@distilled.cloud/mongodb-atlas";

const program = Effect.gen(function* () {
  const result = yield* MongodbAtlas.atlas.listGroups({});
  return result;
});

// The credentials exchange the client id and secret for a token through the HttpClient.
const Live = MongodbAtlas.CredentialsFromEnv.pipe(Layer.provideMerge(FetchHttpClient.layer));

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `MONGODB_ATLAS_CLIENT_ID`, `MONGODB_ATLAS_CLIENT_SECRET`. Optional: `MONGODB_ATLAS_API_BASE_URL`. They are exchanged for an OAuth access token through the `HttpClient` the layer is built with, and the token is sent as `Authorization: Bearer`.
