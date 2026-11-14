# @distilled.cloud/inngest

Effect-native SDK for [inngest](https://www.npmjs.com/package/@distilled.cloud/inngest).

## Installation

```bash
npm install @distilled.cloud/inngest effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Inngest from "@distilled.cloud/inngest";

const program = Effect.gen(function* () {
  const result = yield* Inngest.v2FetchAccount({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Inngest.CredentialsFromEnv,
  Inngest.InngestProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `INNGEST_API_KEY`. Optional: `INNGEST_API_BASE_URL`. Sent as `Authorization: Bearer`.

## Environments

Name an environment (for example a branch environment) to send it as `X-Inngest-Env`. Set it for every call in a scope with the `Environment` layer, or for one call with `xInngestEnv`. The call's value wins.

```ts
// Every call in the scope:
program.pipe(Effect.provide(Inngest.Environment.of("my-branch")));
// One call:
Inngest.getV2App({ appId: "my-app", xInngestEnv: "my-branch" });
```
