# @distilled.cloud/posthog

Effect-native SDK for [posthog](https://www.npmjs.com/package/@distilled.cloud/posthog).

## Installation

```bash
npm install @distilled.cloud/posthog effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as PostHog from "@distilled.cloud/posthog";

const program = Effect.gen(function* () {
  const result = yield* PostHog.account_relationship_definitions.listAccountRelationshipDefinitions({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  PostHog.CredentialsFromEnv,
  PostHog.PosthogProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `POSTHOG_API_KEY`, `POSTHOG_HOST`. Sent as `Authorization: Bearer`.
