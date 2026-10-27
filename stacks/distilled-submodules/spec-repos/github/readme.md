# spec-mirror-github

A git mirror of GitHub's API descriptions, reduced to exactly the files the
[`@distilled.cloud/github`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/api.github.com.json` — `descriptions/api.github.com/api.github.com.json` from the [REST API description](https://github.com/github/rest-api-description)
- `specs/graphql.json` — the [public GraphQL schema](https://docs.github.com/public/fpt/schema.docs.graphql), as introspection JSON

Nothing else from `github/rest-api-description` is mirrored, so this repository stays small
enough to use as a git submodule — the upstream repository is never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-github.git
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
