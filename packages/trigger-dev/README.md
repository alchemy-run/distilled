# @distilled.cloud/trigger-dev

Effect-native SDK for [trigger-dev](https://www.npmjs.com/package/@distilled.cloud/trigger-dev).

## Installation

```bash
npm install @distilled.cloud/trigger-dev effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as TriggerDev from "@distilled.cloud/trigger-dev";

const program = Effect.gen(function* () {
  const result = yield* TriggerDev.listSchedulesV1({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  TriggerDev.CredentialsFromEnv,
  TriggerDev.TriggerDevProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `TRIGGER_DEV_API_KEY`, `TRIGGER_SECRET_KEY`. Optional: `TRIGGER_DEV_API_BASE_URL`.
