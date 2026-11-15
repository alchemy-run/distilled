# spec-mirror-starburst-galaxy

A git mirror of Starburst Galaxy's public OpenAPI specs: [v1](https://galaxy.starburst.io/public/openapi/v1/json) and [v2](https://galaxy.starburst.io/public/openapi/v2/json). The specs are fetched and committed as JSON files so the repo serves as a versioned snapshot.

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-starburst-galaxy.git
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
