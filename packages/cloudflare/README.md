# @distilled.cloud/cloudflare

Effect-native SDK for [cloudflare](https://www.npmjs.com/package/@distilled.cloud/cloudflare).

## Installation

```bash
npm install @distilled.cloud/cloudflare effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Cloudflare from "@distilled.cloud/cloudflare";

const program = Effect.gen(function* () {
  const result = yield* Cloudflare.workers.getScript({
    account_id: "account",
    script_name: "api",
  });
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Cloudflare.CredentialsFromEnv,
  Cloudflare.CloudflareProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `CLOUDFLARE_API_KEY`, `CLOUDFLARE_EMAIL`. Sent as `Authorization: Bearer`.
