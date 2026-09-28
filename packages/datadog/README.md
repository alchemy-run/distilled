# @distilled.cloud/datadog

Effect-native SDK for [datadog](https://www.npmjs.com/package/@distilled.cloud/datadog).

## Installation

```bash
npm install @distilled.cloud/datadog effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Datadog from "@distilled.cloud/datadog";

const program = Effect.gen(function* () {
  const result = yield* Datadog.v1.listDashboards({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Datadog.CredentialsFromEnv,
  Datadog.DatadogProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `DD_API_KEY`, `DD_APP_KEY`, `DD_SITE`. Optional: `DD_API_BASE_URL`.
