# @distilled.cloud/hetzner

Effect-native SDK for [hetzner](https://www.npmjs.com/package/@distilled.cloud/hetzner).

## Installation

```bash
npm install @distilled.cloud/hetzner effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Hetzner from "@distilled.cloud/hetzner";

const program = Effect.gen(function* () {
  const result = yield* Hetzner.servers.listServers({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Hetzner.CredentialsFromEnv,
  Hetzner.HetznerProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `HCLOUD_TOKEN`. Optional: `HCLOUD_ENDPOINT`. Sent as `Authorization: Bearer`.
