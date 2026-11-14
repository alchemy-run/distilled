# spec-mirror-rivet

A git mirror of the [Rivet](https://github.com/rivet-dev/rivet) engine's OpenAPI spec, reduced to exactly the file the
[`@distilled.cloud/rivet`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/openapi.json` — `engine/artifacts/openapi.json` at the `v3.0.0-preview.4` tag

Nothing else from `rivet-dev/rivet` is mirrored, so this repository stays small
enough to use as a git submodule — the upstream repository is never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-rivet.git
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
