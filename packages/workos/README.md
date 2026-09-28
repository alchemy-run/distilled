# @distilled.cloud/workos

Effect-native SDK for [workos](https://www.npmjs.com/package/@distilled.cloud/workos).

## Installation

```bash
npm install @distilled.cloud/workos effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Workos from "@distilled.cloud/workos";

const program = Effect.gen(function* () {
  const result = yield* Workos.ListOrganizationsController({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Workos.CredentialsFromEnv,
  Workos.WorkosProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `WORKOS_API_KEY`. Optional: `WORKOS_API_URL`. Sent as `Authorization: Bearer`.
