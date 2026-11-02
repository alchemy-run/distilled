# @distilled.cloud/prisma

Effect-native SDK for [prisma](https://www.npmjs.com/package/@distilled.cloud/prisma).

## Installation

```bash
npm install @distilled.cloud/prisma effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Prisma from "@distilled.cloud/prisma";

const program = Effect.gen(function* () {
  const result = yield* Prisma.getBranch({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Prisma.CredentialsFromEnv,
  Prisma.PrismaProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `PRISMA_API_TOKEN`, `PRISMA_POSTGRES_API_TOKEN`. Sent as `Authorization: Bearer`.

## Bucket objects

`@distilled.cloud/prisma/BucketObjects` reads and writes the objects in a Prisma bucket, with the endpoint and key pair of a bucket key. It covers only the requests Prisma supports for buckets: `getObject`, `headObject`, `putObject`, `deleteObject`, `listObjectsV2`, and presigned `GET` and `PUT` URLs.

```ts
import * as BucketObjects from "@distilled.cloud/prisma/BucketObjects";
import * as Effect from "effect/Effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Redacted from "effect/Redacted";

const bucket = BucketObjects.make({
  endpoint: "https://t3.storage.dev",
  bucket: "my-bucket",
  credentials: { accessKeyId, secretAccessKey: Redacted.make(secretAccessKey) },
});

const program = Effect.gen(function* () {
  yield* bucket.putObject("hello.txt", "Hello", { contentType: "text/plain" });
  return yield* bucket.presignGetObject("hello.txt", { expiresIn: 60 });
});

program.pipe(Effect.provide(FetchHttpClient.layer), Effect.runPromise);
```
