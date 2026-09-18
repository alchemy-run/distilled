# spec-mirror-github

A git mirror of GitHub's [REST API description](https://github.com/github/rest-api-description), reduced to exactly the file the
[`@distilled.cloud/github`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/api.github.com.json` — `descriptions/api.github.com/api.github.com.json`

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
bun install
bun run fetch-specs
```

---

This repository is managed by the `distilled-submodules` Alchemy stack in
[alchemy-run/distilled](https://github.com/alchemy-run/distilled) (`stacks/distilled-submodules`).
Its scaffolding is generated — edit it there, not here.
