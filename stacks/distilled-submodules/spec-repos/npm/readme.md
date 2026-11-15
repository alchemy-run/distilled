# spec-mirror-npm

A git mirror of the npm registry's [OpenAPI documents](https://github.com/npm/api-documentation/tree/main/api), reduced to exactly the files the
[`@distilled.cloud/npm`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/api/merge-config.yaml` — `api/merge-config.yaml`, the list of documents npm's build merges
- `specs/api/base.yaml` — `api/base.yaml` (info, servers, security schemes)
- `specs/api/registry.npmjs.com/*.yaml` — one document per API area
- `specs/api/shared-components.yaml` — `api/shared-components.yaml`, referenced by the area documents

Files keep their repository paths, so each `$ref` resolves as it does upstream. Nothing else from
`npm/api-documentation` is mirrored, so this repository stays small enough to use as a git
submodule — the upstream repository is never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-npm.git
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
