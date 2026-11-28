# @distilled.cloud/datadog

Effect-native SDK for [datadog](https://www.npmjs.com/package/@distilled.cloud/datadog).

## Installation

```bash
npm install @distilled.cloud/datadog effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Datadog from "@distilled.cloud/datadog";
import * as V1 from "@distilled.cloud/datadog/v1";

const program = Effect.gen(function* () {
  const result = yield* V1.listDashboards({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Datadog.CredentialsFromEnv,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Preview operations

Datadog marks some v2 operations `x-unstable` (preview or beta). They import
from `unstable/v2`; the rest of v2 stays on the stable path:

```ts
import * as V2 from "@distilled.cloud/datadog/v2";
import * as V2Unstable from "@distilled.cloud/datadog/unstable/v2";
```

## Auth

Required: `DD_API_KEY`, `DD_APP_KEY`, `DD_SITE`. Optional: `DD_API_BASE_URL`.
