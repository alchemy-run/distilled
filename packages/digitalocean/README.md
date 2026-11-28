# @distilled.cloud/digitalocean

Effect-native SDK for [digitalocean](https://www.npmjs.com/package/@distilled.cloud/digitalocean).

## Installation

```bash
npm install @distilled.cloud/digitalocean effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as DigitalOcean from "@distilled.cloud/digitalocean";

const program = Effect.gen(function* () {
  const result = yield* DigitalOcean.getAccount({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  DigitalOcean.CredentialsFromEnv,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Public Preview APIs

DigitalOcean labels some API groups `[Public Preview]` in its OpenAPI tags:
MicroVMs, VPC Subnets, VPC Routes and Harness Runtime Workspaces. Their
operations are not on the package root; they import from `unstable/`:

```ts
import * as DigitalOceanUnstable from "@distilled.cloud/digitalocean/unstable/digitalocean";

const subnets = yield* DigitalOceanUnstable.listVpcSubnets({ vpc_uuid });
```

## Auth

Required: one of `DIGITALOCEAN_TOKEN`, `DIGITALOCEAN_ACCESS_TOKEN` or `DIGITALOCEAN_API_KEY` (first set wins). Optional: `DIGITALOCEAN_API_BASE_URL`. Sent as `Authorization: Bearer`.
