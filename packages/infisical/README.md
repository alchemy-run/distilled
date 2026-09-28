# @distilled.cloud/infisical

Effect-native SDK for [infisical](https://www.npmjs.com/package/@distilled.cloud/infisical).

## Installation

```bash
npm install @distilled.cloud/infisical effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Infisical from "@distilled.cloud/infisical";

const program = Effect.gen(function* () {
  const result = yield* Infisical.listOrganizationAuditLogs({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Infisical.CredentialsFromEnv,
  Infisical.InfisicalProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `INFISICAL_TOKEN`. Optional: `INFISICAL_API_BASE_URL`. Sent as `Authorization: Bearer`.
