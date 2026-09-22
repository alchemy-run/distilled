# @distilled.cloud/gcp

Effect-native GCP SDK, generated from Google's Discovery documents. Import a
service module by name and version — the root package is credentials, protocol,
and retry only.

## Installation

```bash
npm install @distilled.cloud/gcp effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Storage from "@distilled.cloud/gcp/storage_v1";
import { CredentialsFromEnv, GcpProtocol } from "@distilled.cloud/gcp";

const program = Effect.gen(function* () {
  const result = yield* Storage.listBuckets({ project: "acme" });
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  CredentialsFromEnv,
  GcpProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `GOOGLE_ACCESS_TOKEN`. Optional: `GOOGLE_PROJECT_ID`.
