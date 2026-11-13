# spec-mirror-clerk

A git mirror of Clerk's [Backend and Platform API OpenAPI specs](https://github.com/clerk/openapi-specs), reduced to the descriptions needed by the
[`@distilled.cloud/clerk`](https://github.com/alchemy-run/distilled) SDK:

- `specs/openapi.json` — `bapi/2026-05-12.yml` (the Backend API snapshot currently used by the SDK)
- `specs/platform.json` — `platform/beta.yml` (the Platform API, currently in private beta)

Each fetch resolves upstream `main` to one commit, then downloads both files at
that revision from raw.githubusercontent.com and writes deterministic JSON. A
single mirror commit therefore captures both descriptions without changing the
Backend API's selected dated version.

Nothing else from `clerk/openapi-specs` is mirrored, so this repository stays small
enough to use as a git submodule — the upstream repository is never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-clerk.git
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
