# @distilled.cloud/redis-cloud

Effect-native SDK for [redis-cloud](https://www.npmjs.com/package/@distilled.cloud/redis-cloud).

## Installation

```bash
npm install @distilled.cloud/redis-cloud effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as RedisCloud from "@distilled.cloud/redis-cloud";

const program = Effect.gen(function* () {
  const result = yield* RedisCloud.getCurrentAccount({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  RedisCloud.CredentialsFromEnv,
  RedisCloud.RedisCloudProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `REDIS_CLOUD_API_KEY`, `REDIS_CLOUD_API_SECRET_KEY`, `REDIS_CLOUD_AUTH_TOKEN`. Optional: `REDIS_CLOUD_API_BASE_URL`.
