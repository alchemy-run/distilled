# @distilled.cloud/daytona

Effect-native SDK for [daytona](https://www.npmjs.com/package/@distilled.cloud/daytona).

## Installation

```bash
npm install @distilled.cloud/daytona effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Daytona from "@distilled.cloud/daytona";

const program = Effect.gen(function* () {
  const result = yield* Daytona.sandbox.createSandbox({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Daytona.CredentialsFromEnv,
  Daytona.DaytonaProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `DAYTONA_API_KEY`, `DAYTONA_ORGANIZATION_ID`, `DAYTONA_SANDBOX_ID`. Optional: `DAYTONA_ANALYTICS_URL`, `DAYTONA_API_URL`, `DAYTONA_TOOLBOX_URL`. Sent as `Authorization: Bearer`.
