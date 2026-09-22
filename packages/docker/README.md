# @distilled.cloud/docker

Effect-native SDK for [docker](https://www.npmjs.com/package/@distilled.cloud/docker).

## Installation

```bash
npm install @distilled.cloud/docker effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Docker from "@distilled.cloud/docker";

const program = Effect.gen(function* () {
  const result = yield* Docker.containerList({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Docker.CredentialsFromEnv,
  Docker.DockerProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `DOCKER_API_KEY`. Optional: `DOCKER_API_BASE_URL`. Sent as `Authorization: Bearer`.
