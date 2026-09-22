# @distilled.cloud/apache-superset

Effect-native SDK for [apache-superset](https://www.npmjs.com/package/@distilled.cloud/apache-superset).

## Installation

```bash
npm install @distilled.cloud/apache-superset effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as ApacheSuperset from "@distilled.cloud/apache-superset";

const program = Effect.gen(function* () {
  const result = yield* ApacheSuperset.getApiV1Dashboard({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  ApacheSuperset.CredentialsFromEnv,
  ApacheSuperset.ApacheSupersetProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `SUPERSET_ACCESS_TOKEN`. Optional: `SUPERSET_URL`. Sent as `Authorization: Bearer`.
