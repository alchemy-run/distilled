# @distilled.cloud/okta

Effect-native SDK for [okta](https://www.npmjs.com/package/@distilled.cloud/okta).

## Installation

```bash
npm install @distilled.cloud/okta effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Okta from "@distilled.cloud/okta";

const program = Effect.gen(function* () {
  const result = yield* Okta.listUsers({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Okta.CredentialsFromEnv,
  Okta.OktaProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `OKTA_API_TOKEN`, `OKTA_AUTH_SCHEME`. Optional: `OKTA_ORG_URL`. Sent as `Authorization: Bearer`.
