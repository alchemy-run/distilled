# spec-mirror-netbird

A git mirror of [NetBird](https://github.com/netbirdio/netbird)'s management API spec, reduced to exactly the file the
[`@distilled.cloud/netbird`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/openapi.yml` — `shared/management/http/api/openapi.yml` at the `v0.82.0` tag (BSD-3-Clause)

Nothing else from `netbirdio/netbird` is mirrored, so this repository stays small
enough to use as a git submodule — the upstream repository is never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-netbird.git
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
