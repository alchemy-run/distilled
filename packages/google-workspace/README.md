# @distilled.cloud/google-workspace

Effect-native SDK for [google-workspace](https://www.npmjs.com/package/@distilled.cloud/google-workspace).

## Installation

```bash
npm install @distilled.cloud/google-workspace effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as GoogleWorkspace from "@distilled.cloud/google-workspace";

const program = Effect.gen(function* () {
  const result = yield* GoogleWorkspace.admin_reports_v1.listActivities({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  GoogleWorkspace.CredentialsFromEnv,
  GoogleWorkspace.GoogleWorkspaceProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `GOOGLE_ACCESS_TOKEN`, `GOOGLE_PROJECT_ID`.
