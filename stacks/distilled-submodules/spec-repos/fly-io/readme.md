# spec-mirror-fly-io

A git mirror of Fly.io's API descriptions, fetched and committed as JSON so the repo serves as a versioned snapshot.

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Spec source(s)

- `specs/openapi.json`: Machines API, https://docs.fly.io/api/machines/openapi.json
- `specs/sprites.json`: Sprites API, https://api.sprites.dev/openapi.json
- `specs/graphql.json`: Fly GraphQL API introspection, https://api.fly.io/graphql
- `specs/mpg.json`: Managed Postgres (internal `postgresv2` endpoints), hand-written in alchemy-run/distilled at `stacks/distilled-submodules/spec-repos/fly-io/models/`

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-fly-io.git
```

## Updating specs

From `.meta/`:

```sh
pnpm install
pnpm run fetch-specs
```

---

This repository is managed by the `distilled-submodules` Alchemy stack in
[alchemy-run/distilled](https://github.com/alchemy-run/distilled) (`stacks/distilled-submodules`).
Its scaffolding is generated — edit it there, not here.
