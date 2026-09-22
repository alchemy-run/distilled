# @distilled.cloud/porkbun

Effect-native SDK for [porkbun](https://www.npmjs.com/package/@distilled.cloud/porkbun).

## Installation

```bash
npm install @distilled.cloud/porkbun effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Porkbun from "@distilled.cloud/porkbun";

const program = Effect.gen(function* () {
  const result = yield* Porkbun.listDomains({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Porkbun.CredentialsFromEnv,
  Porkbun.PorkbunProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `PORKBUN_API_KEY`, `PORKBUN_SECRET_API_KEY`. Optional: `PORKBUN_API_BASE_URL`.
