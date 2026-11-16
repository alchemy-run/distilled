# @distilled.cloud/huggingface

Effect-native SDK for [huggingface](https://www.npmjs.com/package/@distilled.cloud/huggingface).

## Installation

```bash
npm install @distilled.cloud/huggingface effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Huggingface from "@distilled.cloud/huggingface";
import * as Repos from "@distilled.cloud/huggingface/repos";

const program = Effect.gen(function* () {
  const result = yield* Repos.createRepository({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Huggingface.CredentialsFromEnv,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `HF_TOKEN`. Optional: `HF_API_URL`. Sent as `Authorization: Bearer`.
