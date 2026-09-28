# @distilled.cloud/vercel

Effect-native SDK for [vercel](https://www.npmjs.com/package/@distilled.cloud/vercel).

## Installation

```bash
npm install @distilled.cloud/vercel effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Vercel from "@distilled.cloud/vercel";

const program = Effect.gen(function* () {
  const result = yield* Vercel.dns.getDomainsRecord({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Vercel.CredentialsFromEnv,
  Vercel.VercelProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `VERCEL_TOKEN`. Optional: `VERCEL_API_URL`. Sent as `Authorization: Bearer`.
