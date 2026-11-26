# @distilled.cloud/opencode

Effect-native SDK for [opencode](https://www.npmjs.com/package/@distilled.cloud/opencode).

## Installation

```bash
npm install @distilled.cloud/opencode effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Opencode from "@distilled.cloud/opencode";

const program = Effect.gen(function* () {
  const result = yield* Opencode.globalHealth({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Opencode.CredentialsFromEnv,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Experimental routes

OpenCode serves its experimental routes under `/api/experimental/`. Those
operations import from `unstable/`:

```ts
import * as OpencodeUnstable from "@distilled.cloud/opencode/unstable/opencode";

const schedules = yield* OpencodeUnstable.listExperimentalSchedule({ sessionID });
```

## Auth

Required: `OPENCODE_SERVER_PASSWORD`, `OPENCODE_SERVER_USERNAME`. Optional: `OPENCODE_API_BASE_URL`. Sent as `Authorization: Bearer`.
