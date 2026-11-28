# @distilled.cloud/okta

Effect-native SDK for [okta](https://www.npmjs.com/package/@distilled.cloud/okta).

## Installation

```bash
npm install @distilled.cloud/okta effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Okta from "@distilled.cloud/okta";

const program = Effect.gen(function* () {
  const result = yield* Okta.listUsers({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Okta.CredentialsFromEnv,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Early Access operations

Okta marks a few operations Early Access (`x-okta-lifecycle.lifecycle: "EA"`):
disaster recovery, device OS accounts and user classification. They import
from `unstable/okta`; the package root exports the generally available ones:

```ts
import * as OktaUnstable from "@distilled.cloud/okta/unstable/okta";

const status = yield* OktaUnstable.getDRStatus({});
```

## Auth

Required: `OKTA_API_TOKEN`, `OKTA_AUTH_SCHEME`. Optional: `OKTA_ORG_URL`. Sent as `Authorization: Bearer`.
