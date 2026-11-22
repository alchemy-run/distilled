# spec-mirror-sproutboat

A git mirror of the [Sproutboat](https://sproutboat.com) Cloud API's
[OpenAPI spec](https://sproutboat.com/docs/openapi.yaml), reduced to exactly the file the
[`@distilled.cloud/sproutboat`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/openapi.yaml` — https://sproutboat.com/docs/openapi.yaml

Sproutboat publishes the spec as a single file on its documentation site, with no git
repository behind it, so the mirror snapshots that file.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-sproutboat.git
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
