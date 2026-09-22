# @distilled.cloud/intercom

Effect-native SDK for [intercom](https://www.npmjs.com/package/@distilled.cloud/intercom).

## Installation

```bash
npm install @distilled.cloud/intercom effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Intercom from "@distilled.cloud/intercom";

const program = Effect.gen(function* () {
  const result = yield* Intercom.listAdmins({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Intercom.CredentialsFromEnv,
  Intercom.IntercomProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `INTERCOM_ACCESS_TOKEN`, `INTERCOM_API_KEY`, `INTERCOM_API_VERSION`. Optional: `INTERCOM_API_BASE_URL`. Sent as `Authorization: Bearer`.
