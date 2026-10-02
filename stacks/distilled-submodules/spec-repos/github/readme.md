# spec-mirror-github

A git mirror of GitHub's [REST API description](https://github.com/github/rest-api-description) and
[GraphQL schema](https://github.com/github/docs/tree/main/src/graphql/data/fpt), reduced to exactly the
files the [`@distilled.cloud/github`](https://github.com/alchemy-run/distilled) generators read:

- `specs/api.github.com.json` — `github/rest-api-description:descriptions/api.github.com/api.github.com.json`
- `specs/schema.docs.graphql` — `github/docs:src/graphql/data/fpt/schema.docs.graphql`

Nothing else from either repository is mirrored, so this repository stays small enough to use as a
git submodule — the upstream repositories are never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-github.git
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
