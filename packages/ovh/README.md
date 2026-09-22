# @distilled.cloud/ovh

Effect-native SDK for [ovh](https://www.npmjs.com/package/@distilled.cloud/ovh).

## Installation

```bash
npm install @distilled.cloud/ovh effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Ovh from "@distilled.cloud/ovh";

const program = Effect.gen(function* () {
  const result = yield* Ovh.vps.getVps({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Ovh.CredentialsFromEnv,
  Ovh.OvhProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `OVH_ACCESS_TOKEN`. Optional: `OVH_API_BASE_URL`, `OVH_ENDPOINT`. Sent as `Authorization: Bearer`.
