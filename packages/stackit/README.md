# @distilled.cloud/stackit

Effect-native SDK for [stackit](https://www.npmjs.com/package/@distilled.cloud/stackit).

## Installation

```bash
npm install @distilled.cloud/stackit effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Stackit from "@distilled.cloud/stackit";
import * as Dns from "@distilled.cloud/stackit/dns";

const program = Effect.gen(function* () {
  const result = yield* Dns.listZones({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Stackit.CredentialsFromEnv,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Modules

One module per STACKIT product, at that product's latest published version.
Products whose version is alpha or beta (the document's `info.version`, such
as `1alpha` or `1beta.0.0`) are under `unstable/`:

```ts
import * as Dns from "@distilled.cloud/stackit/dns";
import * as Git from "@distilled.cloud/stackit/unstable/git";
```

## Auth

Required: `STACKIT_REGION`, `STACKIT_SERVICE_ACCOUNT_KEY_PATH`, `STACKIT_SERVICE_ACCOUNT_TOKEN`. Optional: `STACKIT_API_BASE_URL`. Sent as `Authorization: Bearer`.
