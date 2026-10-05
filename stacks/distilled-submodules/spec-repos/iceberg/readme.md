# spec-mirror-iceberg

A git mirror of the Apache Iceberg [REST Catalog OpenAPI spec](https://github.com/apache/iceberg/tree/main/open-api), reduced to exactly the file the
[`@distilled.cloud/iceberg`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/rest-catalog-open-api.yaml` — `open-api/rest-catalog-open-api.yaml`

Nothing else from `apache/iceberg` is mirrored, so this repository stays small
enough to use as a git submodule — the upstream repository is never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-iceberg.git
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
