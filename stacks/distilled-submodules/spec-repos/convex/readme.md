# spec-mirror-convex

A git mirror of Convex's [OpenAPI specs](https://github.com/convex/convex-backend/tree/main/npm-packages/%40convex-dev/platform), reduced to exactly the files the
[`@distilled.cloud/convex`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/management-openapi.json` — the Management API
- `specs/deployment-openapi.json` — the Deployment API
- `specs/public-deployment-openapi.json` — the public HTTP API

Nothing else from `convex/convex-backend` is mirrored, so this repository stays small
enough to use as a git submodule — the upstream repository is never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-convex.git
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
