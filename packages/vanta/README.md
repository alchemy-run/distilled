# @distilled.cloud/vanta

Effect-native SDK for [vanta](https://www.npmjs.com/package/@distilled.cloud/vanta).

## Installation

```bash
npm install @distilled.cloud/vanta effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Vanta from "@distilled.cloud/vanta";
import * as ManageVanta from "@distilled.cloud/vanta/manage_vanta";

const program = Effect.gen(function* () {
  const result = yield* ManageVanta.listComplianceFrameworks({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Vanta.CredentialsFromEnv,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `VANTA_ACCESS_TOKEN`. Optional: `VANTA_API_BASE_URL`. Sent as `Authorization: Bearer`.
