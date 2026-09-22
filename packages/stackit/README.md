# @distilled.cloud/stackit

Effect-native SDK for [stackit](https://www.npmjs.com/package/@distilled.cloud/stackit).

## Installation

```bash
npm install @distilled.cloud/stackit effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Stackit from "@distilled.cloud/stackit";

const program = Effect.gen(function* () {
  const result = yield* Stackit.dns.listZones({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Stackit.CredentialsFromEnv,
  Stackit.StackitProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `STACKIT_REGION`, `STACKIT_SERVICE_ACCOUNT_KEY_PATH`, `STACKIT_SERVICE_ACCOUNT_TOKEN`. Optional: `STACKIT_API_BASE_URL`. Sent as `Authorization: Bearer`.
