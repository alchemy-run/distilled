# @distilled.cloud/supabase

Effect-native SDK for [supabase](https://www.npmjs.com/package/@distilled.cloud/supabase).

## Installation

```bash
npm install @distilled.cloud/supabase effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Supabase from "@distilled.cloud/supabase";

const program = Effect.gen(function* () {
  const result = yield* Supabase.v1AcceptInviteExternalJitAccess({});
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Supabase.CredentialsFromEnv,
  Supabase.SupabaseProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Optional: `SUPABASE_ACCESS_TOKEN`. Sent as `Authorization: Bearer`.
