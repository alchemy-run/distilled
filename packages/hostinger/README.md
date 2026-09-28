# @distilled.cloud/hostinger

Effect-native SDK for [hostinger](https://www.npmjs.com/package/@distilled.cloud/hostinger).

## Installation

```bash
npm install @distilled.cloud/hostinger effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Hostinger from "@distilled.cloud/hostinger";

const program = Effect.gen(function* () {
  const result = yield* Hostinger.domainsGetDomainListV1({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Hostinger.CredentialsFromEnv,
  Hostinger.HostingerProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `HOSTINGER_API_KEY`. Optional: `HOSTINGER_API_BASE_URL`. Sent as `Authorization: Bearer`.
