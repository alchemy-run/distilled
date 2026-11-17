# spec-mirror-entire

A git mirror of the [Entire](https://entire.com) OpenAPI specs: the Core control-plane API
(`https://us.console.entire.io/api/v1/openapi.json`) and the cell data-plane API
(`https://aws-us-east-2.api.entire.io/api/v1/openapi.json`). The specs are fetched and committed as
JSON files so the repo serves as a versioned snapshot.

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-entire.git
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
