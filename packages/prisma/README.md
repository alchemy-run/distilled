# @distilled.cloud/prisma

Effect-native SDK for [prisma](https://www.npmjs.com/package/@distilled.cloud/prisma).

## Installation

```bash
npm install @distilled.cloud/prisma effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
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
