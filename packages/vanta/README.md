# @distilled.cloud/vanta

Effect-native SDK for [vanta](https://www.npmjs.com/package/@distilled.cloud/vanta).

## Installation

```bash
npm install @distilled.cloud/vanta effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Vanta from "@distilled.cloud/vanta";

const program = Effect.gen(function* () {
  const result = yield* Vanta.manageVanta.listComplianceFrameworks({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Vanta.CredentialsFromEnv,
  Vanta.VantaProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `VANTA_ACCESS_TOKEN`. Optional: `VANTA_API_BASE_URL`. Sent as `Authorization: Bearer`.
