# spec-mirror-coinbase

A git mirror of the Coinbase Developer Platform [OpenAPI spec](https://github.com/coinbase/cdp-sdk), reduced to exactly the file the
[`@distilled.cloud/coinbase`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/openapi.yaml` — `openapi.yaml`

Nothing else from `coinbase/cdp-sdk` is mirrored, so this repository stays small
enough to use as a git submodule — the upstream repository is never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-coinbase.git
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
