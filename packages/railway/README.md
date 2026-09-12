# Railway GraphQL for Effect

Use `@distilled.cloud/railway/graphql` to select exactly the fields your program
needs. The client generates GraphQL documents and variables from typed
`where`/`select` objects and returns Effects with selection-dependent errors.
The package root retains the older fixed-selection RPC API for compatibility.

```ts
import * as Effect from "effect/Effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import { CredentialsFromEnv } from "@distilled.cloud/railway";
import * as Railway from "@distilled.cloud/railway/graphql";

const program = Railway.project(
  { id: "your-project-id" },
  { id: true, name: true },
);

await Effect.runPromise(program.pipe(
  Effect.provide(CredentialsFromEnv),
  Effect.provide(FetchHttpClient.layer),
));
```

Credentials accept `RAILWAY_API_TOKEN`, `RAILWAY_TOKEN`, or
`RAILWAY_PROJECT_TOKEN`. Account tokens and project tokens use their respective
Railway authentication headers. Arguments travel as GraphQL variables.

## Nested fields and reusable selections

Every nested object field supports a projection; fields with arguments accept
`where` and `select`. Recursive relationships have no generator-imposed depth
limit. Result types contain only selected fields and preserve GraphQL nullability.

```ts
const serviceIdentity = {
  id: true,
  name: true,
} as const satisfies Railway.Selection<"Service">;

type ServiceIdentity = Railway.Result<"Service!", typeof serviceIdentity>;

const project = Railway.project({ id: "your-project-id" }, {
  id: true,
  services: {
    where: { first: 20 },
    select: {
      edges: { node: serviceIdentity },
      pageInfo: { endCursor: true, hasNextPage: true },
    },
  },
});
```

Connection operations expose `.items(args, nodeSelection)` and
`.pages(args, connectionSelection)` as Effect Streams. They follow Relay
cursors and fail on non-advancing cursors:

```ts
const projects = Railway.projects.items(
  { workspaceId: "your-workspace-id", first: 20 },
  { id: true, name: true },
);
```

## Compose roots into one request

`query` combines independent root fields. `__alias` allows repeated calls to
the same field with different arguments. Execution is still an ordinary Effect,
so dependent requests can be sequenced with `Effect.gen`.

```ts
const both = Railway.query({
  __alias: {
    production: {
      project: {
        where: { id: "production-id" },
        select: { id: true, name: true },
      },
    },
    staging: {
      project: {
        where: { id: "staging-id" },
        select: { id: true, name: true },
      },
    },
  },
});
```

For unions and interfaces, select `__typename` and put concrete-type selections
under `__on: { ConcreteType: { ... } }`. GraphQL fragments are compiled from
those selections and results form a discriminated union.

## Tagged errors and partial responses

GraphQL may return several errors in one response. Strict query and mutation
execution fails with `GraphQLFailure<E>`, whose nonempty `errors` array contains
tagged issues. Each issue retains its message, response path, code, locations,
and available trace metadata. The error union is derived from selected fields
plus provider-wide errors and `UnknownGraphQLError`.

Use `catchTags` to recover only when **every** issue has an allowed tag. Mixed
failures remain failures; a not-found does not swallow a simultaneous denial.

```ts
import * as GraphQL from "@distilled.cloud/core/graphql";

const maybeProject = Railway.project(
  { id: "your-project-id" },
  { id: true, name: true },
).pipe(
  GraphQL.catchTags("RailwayNotFound", () => Effect.succeed(undefined)),
);
```

To inspect multiple issues directly, catch `GraphQLFailure` with Effect's
`catchTag` and inspect `failure.errors`. Tags inside the aggregate are not
caught by `Effect.catchTag("RailwayNotFound", ...)` on the outer Effect.

Report mode preserves partial data and all typed GraphQL issues in a successful
Effect result. Transport, invalid-request, and decoding failures still use the
Effect error channel:

```ts
const inspected = Effect.gen(function* () {
  const report = yield* Railway.report.query({
    project: {
      where: { id: "your-project-id" },
      select: { id: true, description: true },
    },
  });
  return { availableData: report.data, issues: report.errors };
});
```

GraphQL null propagation may erase an ancestor or all data. Report data is
therefore partial and may be `null` or absent. Recovery cannot reconstruct
values the server omitted.

## Mutations and retry behavior

Named mutations use the same argument/projection API. Scalar mutations require
only arguments:

```ts
const created = Railway.projectCreate(
  { input: { name: "example" } },
  { id: true, name: true },
);
const removed = Railway.projectDelete({ id: "your-project-id" });
```

The native client retries queries at most five times for transport failures and
errors marked retryable in the patched model, with bounded exponential delays.
It never automatically retries mutations. The partial-response API returns
execution errors directly without retrying.
An error while resolving a mutation's return fields can follow a successful
side effect. Reconcile observed state before deciding whether a mutation can
safely be retried. Batching roots into one document is explicit; separate
Effects are not automatically combined.

## Extend error contracts through patches

GraphQL introspection does not declare what each resolver can throw. Railway's
extra error contracts live in [`patches/graphql`](patches/graphql/README.md).
RFC 6902 patches attach tagged definitions and wire matchers to coordinates
such as `Query.project` or `Mutation.tcpProxyDelete`. One patched graph generates
both TypeScript error unions and runtime classifiers. Unrecognized failures
retain an unknown tag so the next observed response can improve the contract.

```sh
bun scripts/convert-graphql.ts
bun scripts/generate-graphql.ts
pnpm exec oxfmt src/graphql.ts .generated-graphql/railway.json
```

Conversion reads the mirrored introspection schema and fails on stale patch
pointers. Generation reads the committed `.generated-graphql/railway.json`;
it does not need a mirror checkout. Never edit `src/graphql.ts` directly.
