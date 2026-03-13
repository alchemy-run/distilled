# @distilled.cloud/supabase

Effect-native Supabase Management API SDK generated from the [Supabase OpenAPI specification](https://supabase.com/docs/reference/api). Manage projects, databases, branches, functions, secrets, auth, storage, and more with exhaustive error typing.

## Installation

```bash
npm install @distilled.cloud/supabase effect
```

## Quick Start

```typescript
import { Effect, Layer } from "effect";
import * as Stream from "effect/Stream";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import { v1ListAllProjects } from "@distilled.cloud/supabase/Operations";
import { CredentialsFromEnv } from "@distilled.cloud/supabase";

const program = Effect.gen(function* () {
  const projects = yield* v1ListAllProjects({});
  return projects;
});

const SupabaseLive = Layer.mergeAll(FetchHttpClient.layer, CredentialsFromEnv);

program.pipe(Effect.provide(SupabaseLive), Effect.runPromise);
```

## Configuration

Set the following environment variable:

```bash
SUPABASE_ACCESS_TOKEN=sbp_...
```

Generate an access token in the [Supabase dashboard](https://supabase.com/dashboard/account/tokens) under **Account > Access Tokens**.

## Error Handling

```typescript
import { v1GetProject } from "@distilled.cloud/supabase/Operations";

v1GetProject({ ref: "missing-project" }).pipe(
  Effect.catchTags({
    NotFound: () => Effect.succeed(null),
    UnknownSupabaseError: (e) => Effect.fail(new Error(`Unknown: ${e.message}`)),
  }),
);
```

## Services

Key operation areas include:

- **Projects** -- list, create, get, update, delete, pause, restore, upgrade, usage, health
- **Branches** -- list, create, get, delete, push, merge, reset, restore, diff, config
- **Organizations** -- list, create, get, members
- **Functions** -- list, get, deploy, update, delete, stats
- **Secrets** -- list, bulk create, bulk delete
- **Database** -- run queries, generate TypeScript types, migration history, apply/rollback migrations
- **Auth** -- config, OAuth, token exchange
- **Network** -- restrictions, bans, IP addresses, SSL enforcement
- **Custom Hostname** -- activate, verify DNS, manage vanity subdomains
- **Postgres** -- config, PgBouncer, upgrade eligibility
- **Storage & Pooler** -- storage and connection pooler configuration
- **Addons & Replicas** -- manage addons, read replicas
- **Disk** -- get, modify, autoscale config, utilization
- **Backups** -- list, restore PITR, create restore points
- **API Keys** -- list, create, get, update, delete, signing keys
- **SSO Providers** -- CRUD for single sign-on providers
- **JIT Access** -- just-in-time database access management

## License

MIT
