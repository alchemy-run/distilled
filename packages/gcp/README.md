# @distilled.cloud/gcp

Effect-native GCP SDK generated from [Google API Discovery Documents](https://developers.google.com/discovery/v1/getting_started) with exhaustive error typing. Covers Cloud Storage, Compute Engine, Cloud Run, and more.

## Installation

```bash
npm install @distilled.cloud/gcp effect
```

## Quick Start

```typescript
import { Effect, Layer } from "effect";
import * as Stream from "effect/Stream";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Storage from "@distilled.cloud/gcp/storage-v1";
import { CredentialsFromEnv } from "@distilled.cloud/gcp";

const program = Effect.gen(function* () {
  const buckets = yield* Storage.listBuckets
    .items({ project: "my-project" })
    .pipe(Stream.take(10), Stream.runCollect);
});

const GCPLive = Layer.mergeAll(FetchHttpClient.layer, CredentialsFromEnv);

program.pipe(Effect.provide(GCPLive), Effect.runPromise);
```

## Configuration

Set the following environment variables:

```bash
GOOGLE_ACCESS_TOKEN=your-access-token
GOOGLE_PROJECT_ID=my-project  # optional, used by operations that require a project
```

Generate an access token using the `gcloud` CLI:

```bash
gcloud auth print-access-token
```

For service accounts, use workload identity or a service account key to obtain an OAuth2 access token. Access tokens are short-lived (typically 1 hour) — refresh as needed.

## Error Handling

```typescript
Storage.getBuckets({ bucket: "missing-bucket" }).pipe(
  Effect.catchTags({
    NotFound: () => Effect.succeed(null),
    UnknownGCPError: (e) => Effect.fail(new Error(`Unknown: ${e.message}`)),
  }),
);
```

## License

MIT
