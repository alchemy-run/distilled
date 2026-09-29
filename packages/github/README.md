# @distilled.cloud/github

Effect-native GitHub REST SDK, generated from GitHub's official OpenAPI
description.

## Spec source

The generator reads a single file:

```
specs/rest-api-description/descriptions/api.github.com/api.github.com.json
```

That file is ~13 MB. The repository it lives in,
[github/rest-api-description](https://github.com/github/rest-api-description),
is **~6.7 GB checked out** — it ships every GitHub Enterprise Server version
back to 2.18, each in both dereferenced and non-dereferenced form, in both
JSON and YAML. Almost none of that is working tree we want: the git objects
are only tens of MB, so the cost is entirely in materialised files.

The submodule is therefore **sparse-checked-out to the one file we consume**.

### Fetching it

```bash
pnpm specs:fetch
```

Run this from `packages/github`. It initialises the submodule, narrows it to
the single description file, and leaves ~13 MB on disk.

### The footgun

Sparse-checkout config lives in **local git config**, not in the repository,
so it does not travel with a clone. Two consequences:

- A fresh **`pnpm specs:sync` at the repo root** — which does a plain
  `git submodule update --init --recursive` across every package — expands
  this submodule to the full 6.7 GB. It is not wrong, just very expensive.
- `specs:fetch` itself checks out *before* it narrows, so it also passes
  through the full tree once on a cold clone.

To populate it from cold without ever materialising 6.7 GB, configure sparse
checkout **before** anything is checked out:

```bash
SHA=$(git ls-tree HEAD packages/github/specs/rest-api-description | awk '{print $3}')
P=packages/github/specs/rest-api-description
rm -rf "$P" && mkdir -p "$P"
git -C "$P" init -q
git -C "$P" remote add origin https://github.com/github/rest-api-description.git
git -C "$P" sparse-checkout set --no-cone descriptions/api.github.com/api.github.com.json
git -C "$P" fetch --depth=1 origin "$SHA"
git -C "$P" checkout -q FETCH_HEAD
git submodule absorbgitdirs "$P"
```

The real fix is to mirror the one file we consume into
`alchemy-run/distilled-spec-github`, the pattern `neon` / `gcp` / `supabase`
already use, which removes the sharp edge entirely. Tracked in
[`todo.md`](../../todo.md).


## Usage

## Installation

```bash
npm install @distilled.cloud/github effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Github from "@distilled.cloud/github";

const program = Effect.gen(function* () {
  const result = yield* Github.repos.get({ owner: "acme", repo: "api" });
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Github.CredentialsFromEnv,
  Github.GithubProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Required: `GH_TOKEN`, `GITHUB_TOKEN`. Optional: `GITHUB_API_URL`, `GITHUB_USER_AGENT`. Sent as `Authorization: Bearer`.

## GraphQL

`@distilled.cloud/github/GraphQL` exposes GitHub's GraphQL API as lazy Query
lenses, for what the REST description does not cover — enterprise policy
settings, an enterprise's SAML identity provider, and every other
GraphQL-only field or mutation. It authenticates with the same `Credentials`
as the REST services. Combinators live in `@distilled.cloud/core/query`.

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import { Query } from "@distilled.cloud/core/query";
import { CredentialsFromEnv } from "@distilled.cloud/github";
import { GitHubGraphQL, GraphQLLive } from "@distilled.cloud/github/GraphQL";

const policies = Query.fn((slug: string) => {
  const enterprise = GitHubGraphQL.enterprise({ slug });
  return {
    id: enterprise.id,
    membersCanCreateRepositories:
      enterprise.ownerInfo.membersCanCreateRepositoriesSetting,
  };
});

policies("acme").pipe(
  Effect.provide(
    Layer.mergeAll(GraphQLLive, CredentialsFromEnv, FetchHttpClient.layer),
  ),
  Effect.runPromise,
);
```

Mutations run in their own `Query.fn`. Every root carries the graph-wide
errors declared in [`patches/graphql/`](patches/graphql/00-errors.json):
`GitHubNotFound`, `GitHubForbidden`, `GitHubInsufficientScopes`,
`GitHubRateLimited` (retried) and `GitHubValidationError`.

The schema is `specs/schema.docs.graphql` in the mirror — the SDL GitHub
publishes for its docs, which needs no token to fetch. Regenerate with:

```bash
bun scripts/convert-graphql.ts
bun scripts/generate-graphql.ts
pnpm exec oxfmt src/graphql.ts
```

Never edit `src/graphql.ts` by hand; patch the model in `patches/graphql/`.
