# distilled

**Effect-native SDKs for cloud providers**

Tagged errors. Retry policies. Streaming pagination.

```typescript
import * as S3 from "distilled-aws/s3"

const bucket = yield* S3.getBucket({
  Bucket: "my-bucket"
}).pipe(
  Effect.catchTag("NoSuchBucket", () =>
    Effect.void
  )
)
```

See:
- [distilled-aws](./distilled-aws/README.md)
- [distilled-cloudflare](./distilled-cloudflare/README.md)

## The Problem

Cloud APIs are notoriously under-documented. Every cloud provider ships incomplete specs. Errors are discovered at runtime, not compile time.

| Problem | Description |
|---------|-------------|
| **Missing Error Codes** | APIs return cryptic error codes that aren't in the documentation. You only discover them in production. |
| **Incomplete Specs** | OpenAPI and Smithy specs are missing properties, wrong types, or outdated. The docs lie. |
| **Runtime Surprises** | Errors you can't catch because they're not in the types. Your "exhaustive" switch statement isn't. |
| **Bundle Bloat** | Import one function, bundle hundreds. Class-based SDKs can't tree-shake. |

## SDKs

Effect-native clients for major cloud providers, with tagged errors and tree-shakeable imports.

### [distilled-aws](./distilled-aws)

Complete AWS SDK with typed errors for S3, Lambda, DynamoDB, SQS, and 200+ services. Every API includes documented and undocumented error codes.

```bash
npm install distilled-aws effect @effect/platform
```

```typescript
import * as S3 from "distilled-aws/s3"
import * as Lambda from "distilled-aws/lambda"
import * as DynamoDB from "distilled-aws/dynamodb"

// All operations return Effect<A, TypedErrors, R>
const result = yield* S3.getObject({
  Bucket: "my-bucket",
  Key: "data.json"
}).pipe(
  Effect.catchTag("NoSuchKey", () => Effect.succeed(null))
)
```

[Read the full documentation →](./distilled-aws/README.md)

### [distilled-cloudflare](./distilled-cloudflare)

Cloudflare API client for Workers, R2, KV, D1, Queues, and more. Patched OpenAPI spec with complete error coverage.

```bash
npm install distilled-cloudflare effect @effect/platform
```

```typescript
import * as R2 from "distilled-cloudflare/r2"
import * as Workers from "distilled-cloudflare/workers"
import * as Queues from "distilled-cloudflare/queues"

// Typed error handling
yield* R2.getBucket({
  accountId: "...",
  bucketName: "my-bucket"
}).pipe(
  Effect.catchTag("NoSuchBucket", () => createBucket())
)
```

[Read the full documentation →](./distilled-cloudflare/README.md)

## Why distilled?

### Tagged Errors

Every API operation has properly typed, discriminated error unions. No more guessing what went wrong.

```typescript
const bucket = yield* S3.getBucket({
  Bucket: "my-bucket"
}).pipe(
  Effect.catchTag("NoSuchBucket", () =>
    Effect.succeed(null)
  ),
  Effect.catchTag("AccessDenied", () =>
    Effect.fail(new AuthError())
  )
)
```

- Specs patched to include undocumented errors
- Exhaustive error handling with catchTag
- IDE autocomplete for all error tags

### Retry Policies

Declarative, composable retry logic with type-safe schedules. Handle transient failures without callback hell.

```typescript
const result = yield* S3.getObject({
  Bucket: "my-bucket",
  Key: "data.json"
}).pipe(
  Effect.retry({
    while: (e) => e._tag === "SlowDown",
    schedule: Schedule.exponential("100 millis")
  }),
  Effect.timeout("5 seconds")
)
```

- Exponential backoff, jitter, and more
- Retry only on specific error tags
- Compose schedules for complex policies

### Streaming Pagination

Paginated APIs return Effect Streams. No manual token juggling—just iterate.

```typescript
// Stream all pages
yield* S3.listObjectsV2
  .pages({ Bucket: "my-bucket" })
  .pipe(Stream.runForEach(Console.log))

// Or stream individual items
yield* DynamoDB.scan
  .items({ TableName: "users" })
  .pipe(Stream.runCollect)
```

- `.pages()` streams full response objects
- `.items()` streams individual items
- Lazy evaluation—fetch only what you need

### Streaming I/O

Upload and download with Effect Streams. Process data as it flows without buffering entire payloads.

```typescript
// Upload a stream
yield* S3.putObject({
  Bucket: "my-bucket",
  Key: "large-file.bin",
  Body: Stream.fromIterable(chunks),
})

// Download as a stream
const { Body } = yield* S3.getObject({ ... })
const text = yield* Body.pipe(
  Stream.decodeText(),
  Stream.mkString
)
```

- `Stream<Uint8Array>` for uploads and downloads
- Composable with all Stream operators
- Backpressure handled automatically

### Tree-Shakeable

No monolithic client classes. Import only what you need—your bundle stays lean.

```typescript
// Only bundles getBucket and createBucket
import * as S3 from "distilled-aws/s3"

// NOT this:
// import { S3Client } from "@aws-sdk/client-s3"
// new S3Client() bundles ALL 100+ operations
```

- Module-scoped functions, not class methods
- Config via Effect Layers, not constructors
- Perfect for serverless and edge runtimes

## The Mission

Type-safe, tagged error specs aren't just good for developers—they're essential for AI code generation.

distilled SDKs are built to power [alchemy.run](https://alchemy.run)—next-generation Infrastructure-as-Code in native TypeScript. When AI generates infrastructure code, it needs to know every possible error and how to handle it.

Proper error tags mean sound, reliable tooling. No more hallucinated error handling. No more runtime surprises.

**AI-Ready Specs:**
- Exhaustive error unions
- Typed request/response schemas
- Patched and verified specs
- Reliable code generation

## Contributing

The TDD workflow for discovering missing errors:

1. Write a test that triggers an error
2. Run the test and observe `UnknownError` / `UnknownCloudflareError`
3. Add the error to the spec/patch file
4. Regenerate the SDK
5. Import the typed error class and handle it

See the individual package READMEs for detailed contribution guidelines:

- [distilled-aws/README.md](./distilled-aws/README.md)
- [distilled-cloudflare/README.md](./distilled-cloudflare/README.md)

## License

MIT
