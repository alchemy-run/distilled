# spec-mirror-daytona

A git mirror of Daytona's published API descriptions:

- [Platform OpenAPI](https://www.daytona.io/docs/openapi.json) → `specs/openapi.json`
- [Toolbox OpenAPI](https://www.daytona.io/docs/toolbox-openapi.json) → `specs/toolbox-openapi.json`
- [Analytics OpenAPI](https://www.daytona.io/docs/analytics-openapi.json) → `specs/analytics-openapi.json`

The specs are fetched and committed as deterministic JSON so the repo serves
as a versioned snapshot. Nothing else from the docs site is mirrored.

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-daytona.git
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
