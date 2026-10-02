# @distilled.cloud/linear

Effect-native Linear SDK, generated from the introspection schema of
`https://api.linear.app/graphql`. Every query and mutation root is exposed as
a lazy Query lens; combinators live in `@distilled.cloud/core/query`.

## Installation

```bash
npm install @distilled.cloud/linear @distilled.cloud/core effect
```

## Quick start

```ts
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import { Query } from "@distilled.cloud/core/query";
import {
  CredentialsFromEnv,
  GraphQLLive,
  Linear,
} from "@distilled.cloud/linear";

const listTeams = Query.fn(() =>
  Linear.teams({ first: 50 }).pipe(
    Query.map((team) => ({ id: team.id, key: team.key })),
  ),
);

const createLabel = Query.fn((teamId: string, name: string) => {
  const payload = Linear.issueLabelCreate({ input: { teamId, name } });
  return { id: payload.issueLabel.id, name: payload.issueLabel.name };
});

const program = Effect.gen(function* () {
  const [team] = yield* listTeams();
  return yield* createLabel(team!.id, "needs-triage");
});

const Live = GraphQLLive.pipe(
  Layer.provideMerge(FetchHttpClient.layer),
  Layer.provideMerge(CredentialsFromEnv),
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

- `LINEAR_API_KEY` — a personal API key, sent as `Authorization: <key>`.
- `LINEAR_ACCESS_TOKEN` — an OAuth access token, sent as
  `Authorization: Bearer <token>`.
- `LINEAR_API_URL` (optional) — the host, default `https://api.linear.app`.

`CredentialsFromToken({ token, tokenKind: "apiKey" | "oauth" })` takes an
explicit token instead.

## How selection works

`Linear.team({ id })` does not fetch. Reading `team.key` records that field.
`Query.fn` walks the plan you return, posts **one** document, then fills in
the values. A plan that ends on an object instead of its fields is a
`GqlError` defect, so select the fields you need: `payload.issueLabel.id`,
not `payload.issueLabel`. Queries and mutations cannot share a plan.

Roots keep Linear's field names. Where a mutation shares its name with a
query, the mutation gets a `Mutation` suffix: `Linear.projectUpdate` reads a
project update post, `Linear.projectUpdateMutation` edits a project (likewise
`initiativeUpdateMutation`).

Every create and update returns a payload (`success`, `lastSyncId`, and the
entity); deletes return `DeletePayload` (`success`, `entityId`). Workflow
states have no delete, only `workflowStateArchive`; teams have
`teamDelete`, which archives the team and schedules its data for deletion.

## Pagination

Connections read as lists of nodes. `Query.items` and `Query.pages` follow
`pageInfo.endCursor` until `hasNextPage` is false, one request per page:

```ts
import * as Stream from "effect/Stream";

const labels = Query.items(
  Linear.issueLabels({ first: 100, filter: { team: { null: true } } }).pipe(
    Query.map((label) => ({ id: label.id, name: label.name })),
  ),
);
```

Linear defaults a page to 50 items and rejects any single query above
10,000 complexity points, where each connection multiplies its children by
its page size. Pass `first` on nested connections.

## Errors

Every root can fail with the global errors declared in
[`patches/graphql/`](patches/graphql/README.md):

| Tag | Linear `extensions.code` |
| --- | --- |
| `LinearAuthenticationError` | `AUTHENTICATION_ERROR` |
| `LinearRateLimited` | `RATELIMITED` (retryable) |
| `LinearValidationError` | `GRAPHQL_VALIDATION_FAILED` |
| `LinearInvalidInput` | `INVALID_INPUT`, `INPUT_ERROR` |
| `LinearNotFound` | `INPUT_ERROR` with `Entity not found` |

```ts
const deleteLabel = Query.fn((id: string) =>
  Linear.issueLabelDelete({ id }).pipe(Query.map((p) => p.success)),
);

const idempotent = (id: string) =>
  deleteLabel(id).pipe(
    Effect.catchTag("LinearNotFound", () => Effect.succeed(true)),
  );
```

An error no matcher recognizes is `UnknownGraphQLError`; a response whose
errors carry different tags fails with `GraphQLFailure`, and failures that
never produce a GraphQL body are `GraphQLTransportError`. Queries retry
retryable errors up to 5 times; mutations never retry.

## Known gaps

- `Query.organizationInviteDetails` returns a union and has no usable
  selection.
- Arguments on non-connection object and scalar fields are not sent, so
  `Team.membership(userId:)` cannot be selected.
- Union and interface members are not selectable beyond the interface's own
  fields (no inline fragments).
- Error codes not yet observed (forbidden, feature not accessible, usage
  limit exceeded, lock timeout, internal error) arrive as
  `UnknownGraphQLError`; their `code` and `extensions` are on the error.
- `LinearRateLimited` queries retry about 6 seconds, far shorter than
  Linear's hourly window, and `retryAfter` stays unset because Linear sends
  `X-RateLimit-*-Reset` instead of `Retry-After`.

## Generate

```sh
pnpm specs:local linear                 # until spec-mirror-linear exists
DISTILLED_SPECS_LOCAL=1 pnpm generate linear
```

Conversion reads the mirrored introspection schema. Generation reads
`.generated-graphql/linear.json`. Never edit `src/graphql.ts` by hand.
