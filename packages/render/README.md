# @distilled.cloud/render

Effect-native SDK for [render](https://www.npmjs.com/package/@distilled.cloud/render).

## Installation

```bash
npm install @distilled.cloud/render effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Render from "@distilled.cloud/render";

const program = Effect.gen(function* () {
  const result = yield* Render.listServices({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Render.CredentialsFromEnv,
  Render.RenderProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `RENDER_API_KEY`. Optional: `RENDER_API_BASE_URL`. Sent as `Authorization: Bearer`.
