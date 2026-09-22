# @distilled.cloud/planetscale

Effect-native SDK for [planetscale](https://www.npmjs.com/package/@distilled.cloud/planetscale).

## Installation

```bash
npm install @distilled.cloud/planetscale effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as PlanetScale from "@distilled.cloud/planetscale";

const program = Effect.gen(function* () {
  const result = yield* PlanetScale.listDatabases({ organization: "acme" });
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  PlanetScale.CredentialsFromEnv,
  PlanetScale.PlanetScaleProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `PLANETSCALE_API_TOKEN`, `PLANETSCALE_API_TOKEN_ID`, `PLANETSCALE_ORGANIZATION`. Sent as `Authorization: Bearer`.
