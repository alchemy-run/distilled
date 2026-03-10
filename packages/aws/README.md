# @distilled.cloud/aws

Effect-native AWS SDK generated from [Smithy](https://smithy.io) models with full protocol support. Covers S3, Lambda, DynamoDB, SQS, IAM, EC2, and 200+ services with exhaustive error typing.

## Installation

```bash
npm install @distilled.cloud/aws effect
```

## Quick Start

```typescript
import { Effect } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as S3 from "@distilled.cloud/aws/s3";
import { Credentials, Region } from "@distilled.cloud/aws";

const program = Effect.gen(function* () {
  yield* S3.putObject({
    Bucket: "my-bucket",
    Key: "hello.txt",
    Body: "Hello, World!",
  });

  const result = yield* S3.getObject({
    Bucket: "my-bucket",
    Key: "hello.txt",
  });

  return result.ContentType;
});

program.pipe(
  Effect.provide(FetchHttpClient.layer),
  Effect.provideService(Region, "us-east-1"),
  Effect.provide(Credentials.fromChain()),
  Effect.runPromise,
);
```

## Error Handling

All operations return typed errors for pattern matching:

```typescript
S3.getObject({ Bucket: "my-bucket", Key: "missing.txt" }).pipe(
  Effect.catchTags({
    NoSuchKey: () => Effect.succeed(null),
    AccessDenied: (e) => Effect.fail(new Error(`Access denied: ${e.message}`)),
  }),
);
```

## Protocols

Supports all AWS protocols: REST-XML (S3), REST-JSON (Lambda), AWS JSON 1.0/1.1 (DynamoDB, KMS), AWS Query (IAM, STS), and EC2 Query.

## License

MIT
