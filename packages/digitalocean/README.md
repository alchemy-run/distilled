# @distilled.cloud/digitalocean

Effect-native SDK for [digitalocean](https://www.npmjs.com/package/@distilled.cloud/digitalocean).

## Installation

```bash
npm install @distilled.cloud/digitalocean effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as DigitalOcean from "@distilled.cloud/digitalocean";

const program = Effect.gen(function* () {
  const result = yield* DigitalOcean.accountGet({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  DigitalOcean.CredentialsFromEnv,
  DigitalOcean.DigitalOceanProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `DIGITALOCEAN_ACCESS_TOKEN`, `DIGITALOCEAN_API_KEY`. Optional: `DIGITALOCEAN_API_BASE_URL`. Sent as `Authorization: Bearer`.
