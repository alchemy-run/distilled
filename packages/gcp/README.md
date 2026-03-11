# @distilled.cloud/gcp

Effect-native GCP SDK generated from [Google API Discovery Documents](https://developers.google.com/discovery/v1/getting_started) with exhaustive error typing. Covers Cloud Storage, Compute Engine, Cloud Run, and more.

## Installation

```bash
npm install @distilled.cloud/gcp effect
```

## Quick Start

```typescript
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Storage from "@distilled.cloud/gcp/storage";
import { Auth } from "@distilled.cloud/gcp";

const program = Storage.listBuckets({ project: "my-project" });

const GCPLive = Layer.mergeAll(FetchHttpClient.layer, Auth.fromADC());

program.pipe(Effect.provide(GCPLive), Effect.runPromise);
```

## Authentication

```typescript
import { Auth } from "@distilled.cloud/gcp";

// Application Default Credentials (recommended for development)
Auth.fromADC()

// Service account JSON key file
Auth.fromServiceAccountFile("./service-account.json")

// Environment variable (GOOGLE_ACCESS_TOKEN)
Auth.fromEnv()
```

## Error Handling

```typescript
Storage.getBucket({ bucket: "missing-bucket" }).pipe(
  Effect.catchTags({
    NotFound: () => Effect.succeed(null),
    UnknownGCPError: (e) => Effect.fail(new Error(`Unknown: ${e.message}`)),
  }),
);
```

## License

MIT
