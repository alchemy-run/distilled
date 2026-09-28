# @distilled.cloud/fly-io

Effect-native SDK for [fly-io](https://www.npmjs.com/package/@distilled.cloud/fly-io).

## Installation

```bash
npm install @distilled.cloud/fly-io effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Fly from "@distilled.cloud/fly-io";

const program = Effect.gen(function* () {
  const result = yield* Fly.machines.listApps({ org_slug: "personal" });
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Fly.CredentialsFromEnv,
  Fly.FlyIoProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `FLY_API_TOKEN`, `FLY_IO_API_KEY`, `SPRITES_TOKEN`. Optional: `FLY_API_HOSTNAME`. Sent as `Authorization: Bearer`.
