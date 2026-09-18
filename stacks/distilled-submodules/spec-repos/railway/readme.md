# spec-mirror-railway

A git mirror of Railway's API spec. The spec is fetched (or, for GraphQL, introspected) and committed as a JSON file so the repo serves as a versioned snapshot. GraphQL sources also produce an SDL (`.graphql`) sibling file.

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Spec source(s)

- https://backboard.railway.com/graphql/v2 (graphql)

## Authentication

If introspection requires a token, set the `SPEC_API_TOKEN` repo secret. The fetcher sends it as `Authorization: Bearer <token>`. If unset, requests go out unauthenticated.

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-railway.git
```

## Updating specs

From `.meta/`:

```sh
bun install
bun run fetch-specs
```

---

This repository is managed by the `distilled-submodules` Alchemy stack in
[alchemy-run/distilled](https://github.com/alchemy-run/distilled) (`stacks/distilled-submodules`).
Its scaffolding is generated — edit it there, not here.
