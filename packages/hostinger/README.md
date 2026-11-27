# @distilled.cloud/hostinger

Effect-native SDK for [hostinger](https://www.npmjs.com/package/@distilled.cloud/hostinger).

## Installation

```bash
npm install @distilled.cloud/hostinger effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Hostinger from "@distilled.cloud/hostinger";

const program = Effect.gen(function* () {
  const result = yield* Hostinger.domainsGetDomainListV1({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Hostinger.CredentialsFromEnv,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Experimental operations

The VPS Docker Manager operations, which the spec marks `x-scalar-stability: experimental`, are not
in the root export. Import them from `unstable/`:

```ts
import * as HostingerExperimental from "@distilled.cloud/hostinger/unstable/hostinger";

const projects = yield* HostingerExperimental.vPSGetProjectListV1({ virtualMachineId: 1 });
```

## Auth

Required: `HOSTINGER_API_KEY`. Optional: `HOSTINGER_API_BASE_URL`. Sent as `Authorization: Bearer`.
