# spec-mirror-linear

A git mirror of Linear's GraphQL API schema. The endpoint is introspected and the result committed as a JSON file so the repo serves as a versioned snapshot, with an SDL (`.graphql`) sibling file.

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Spec source(s)

- https://api.linear.app/graphql (graphql)

## Authentication

None. Linear serves introspection to unauthenticated requests.

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-linear.git
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
