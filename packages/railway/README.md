# Railway GraphQL for Effect

`@distilled.cloud/railway` exposes Railway's GraphQL API as lazy Query
lenses. Combinators live in `@distilled.cloud/core/query`.

```ts
import * as Effect from "effect/Effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import { Query } from "@distilled.cloud/core/query";
import {
  CredentialsFromEnv,
  GraphQLLive,
  Railway,
} from "@distilled.cloud/railway";

const load = Query.fn(() => {
  const me = Railway.me();
  return {
    email: me.email,
    workspaces: me.workspaces.pipe(Query.map((w) => w.name)),
  };
});

await Effect.runPromise(
  load().pipe(
    Effect.provide(GraphQLLive),
    Effect.provide(CredentialsFromEnv),
    Effect.provide(FetchHttpClient.layer),
  ),
);
```

Credentials accept `RAILWAY_API_TOKEN`, `RAILWAY_TOKEN`, or
`RAILWAY_PROJECT_TOKEN`. Account tokens and project tokens use their
respective Railway headers.

## How selection works

`Railway.me()` does not fetch. Reading `me.email` records that field.
`Query.fn` walks the plan you return, posts **one** document, then fills
in the values.

```ts
const project = Query.fn(() => {
  const p = Railway.project({ id: "your-project-id" });
  return {
    id: p.id,
    name: p.name,
    services: p.services({ first: 20 }).pipe(
      Query.map((edge) => edge.node.name),
    ),
  };
});
```

Two roots in one plan are one POST:

```ts
const both = Query.fn(() => {
  const production = Railway.project({ id: "production-id" });
  const staging = Railway.project({ id: "staging-id" });
  return {
    production: { id: production.id, name: production.name },
    staging: { id: staging.id, name: staging.name },
  };
});
```

Queries and mutations cannot share a plan. Run a mutation in its own
`Query.fn`:

```ts
const created = Query.fn(() => {
  const project = Railway.projectCreate({
    input: { name: "example" },
  });
  return { id: project.id, name: project.name };
});
```

## Generate

```sh
bun scripts/convert.ts
bun scripts/generate.ts
pnpm exec oxfmt src/graphql.ts
```

Conversion reads the mirrored introspection schema. Generation reads
`.generated-graphql/railway.json`. Never edit `src/graphql.ts` by hand.
