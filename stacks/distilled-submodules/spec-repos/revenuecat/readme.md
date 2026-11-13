# spec-mirror-revenuecat

A git mirror of the RevenueCat REST API v2 [OpenAPI spec](https://www.revenuecat.com/docs/redocusaurus/openapi-v2-beta.yaml), reduced to exactly the file the
[`@distilled.cloud/revenuecat`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/openapi.yaml` — `openapi-v2-beta.yaml`, mirrored verbatim

`openapi-v2-beta.yaml` is the one document RevenueCat publishes with every v2
operation; `openapi-v2.yaml` has an empty `paths` and the per-resource files
each hold a slice.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-revenuecat.git
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
