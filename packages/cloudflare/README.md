# @distilled.cloud/cloudflare

Effect-native Cloudflare SDK generated from the [Cloudflare TypeScript SDK](https://github.com/cloudflare/cloudflare-typescript) source. Covers Workers, R2, KV, D1, Queues, DNS, and more with exhaustive error typing.

## Installation

```bash
npm install @distilled.cloud/cloudflare effect
```

## Quick Start

```typescript
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as R2 from "@distilled.cloud/cloudflare/r2";
import { Auth } from "@distilled.cloud/cloudflare";

const program = R2.listBuckets({ account_id: "your-account-id" });

const CloudflareLive = Layer.mergeAll(FetchHttpClient.layer, Auth.fromEnv());

program.pipe(Effect.provide(CloudflareLive), Effect.runPromise);
```

## Error Handling

```typescript
R2.getBucket({ account_id: "...", bucket_name: "missing" }).pipe(
  Effect.catchTags({
    NoSuchBucket: () => Effect.succeed({ found: false }),
    UnknownCloudflareError: (e) => Effect.fail(new Error(`Unknown: ${e.message}`)),
  }),
);
```

## Services

```typescript
import * as R2 from "@distilled.cloud/cloudflare/r2";
import * as Workers from "@distilled.cloud/cloudflare/workers";
import * as KV from "@distilled.cloud/cloudflare/kv";
import * as Queues from "@distilled.cloud/cloudflare/queues";
import * as DNS from "@distilled.cloud/cloudflare/dns";
```

## License

MIT
