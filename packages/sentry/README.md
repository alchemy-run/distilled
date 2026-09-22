# @distilled.cloud/sentry

Effect-native SDK for [sentry](https://www.npmjs.com/package/@distilled.cloud/sentry).

## Installation

```bash
npm install @distilled.cloud/sentry effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Sentry from "@distilled.cloud/sentry";

const program = Effect.gen(function* () {
  const result = yield* Sentry.listOrganizations({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Sentry.CredentialsFromEnv,
  Sentry.SentryProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `SENTRY_API_KEY`, `SENTRY_AUTH_TOKEN`. Optional: `SENTRY_API_BASE_URL`, `SENTRY_URL`. Sent as `Authorization: Bearer`.
