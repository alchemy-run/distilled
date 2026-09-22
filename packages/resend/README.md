# @distilled.cloud/resend

Effect-native SDK for [resend](https://www.npmjs.com/package/@distilled.cloud/resend).

## Installation

```bash
npm install @distilled.cloud/resend effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Resend from "@distilled.cloud/resend";

const program = Effect.gen(function* () {
  const result = yield* Resend.getEmails({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Resend.CredentialsFromEnv,
  Resend.ResendProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `RESEND_API_KEY`. Optional: `RESEND_API_BASE_URL`.
