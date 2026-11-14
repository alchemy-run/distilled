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

## Buckets over S3

`Management.layerS3({ bucketId })` points `@distilled.cloud/s3` at a Prisma
bucket. It creates a bucket key with the Prisma credentials when the layer is
built, signs S3 calls with it, and deletes the key when the layer's scope
closes. The bucket's S3 name is the `S3BucketName` service.

```ts
import * as S3 from "@distilled.cloud/s3";
import * as Management from "@distilled.cloud/prisma/management";

const keys = Effect.gen(function* () {
  const Bucket = yield* Management.S3BucketName;
  const { Contents } = yield* S3.listObjectsV2({ Bucket });
  return Contents?.map((object) => object.Key);
}).pipe(Effect.provide(Management.layerS3({ bucketId })));
```

Pass `role: "read"` for a read-only key.
