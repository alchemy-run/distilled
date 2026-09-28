# @distilled.cloud/launchdarkly

Effect-native SDK for [launchdarkly](https://www.npmjs.com/package/@distilled.cloud/launchdarkly).

## Installation

```bash
npm install @distilled.cloud/launchdarkly effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as LaunchDarkly from "@distilled.cloud/launchdarkly";

const program = Effect.gen(function* () {
  const result = yield* LaunchDarkly.getProjects({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  LaunchDarkly.CredentialsFromEnv,
  LaunchDarkly.LaunchDarklyProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `LAUNCHDARKLY_ACCESS_TOKEN`, `LAUNCHDARKLY_API_KEY`, `LAUNCHDARKLY_API_VERSION`. Optional: `LAUNCHDARKLY_API_BASE_URL`. Sent as `Authorization: Bearer`.
