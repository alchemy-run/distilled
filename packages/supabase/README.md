# @distilled.cloud/supabase

Effect-native SDK for [supabase](https://www.npmjs.com/package/@distilled.cloud/supabase).

## Installation

```bash
npm install @distilled.cloud/supabase effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Supabase from "@distilled.cloud/supabase";

const program = Effect.gen(function* () {
  const result = yield* Supabase.v1AcceptInviteExternalJitAccess({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Supabase.CredentialsFromEnv,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Beta, alpha and experimental operations

Supabase marks some operations `x-scalar-stability: experimental` or badges them Beta or Alpha in its spec: SQL queries, custom hostnames, vanity subdomains, network bans and restrictions, Postgres upgrades, read replicas and the OAuth token endpoints, among others. They are not on the package root. Import them from `unstable/supabase`:

```ts
import * as SupabaseUnstable from "@distilled.cloud/supabase/unstable/supabase";

const rows = SupabaseUnstable.v1RunAQuery({ ref: "your-project-ref", query: "select 1" });
```

## Auth

Optional: `SUPABASE_ACCESS_TOKEN`. Sent as `Authorization: Bearer`.
