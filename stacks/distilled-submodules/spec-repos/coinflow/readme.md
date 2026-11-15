# spec-mirror-coinflow

A git mirror of Coinflow's [OpenAPI spec](https://docs.coinflow.cash/openapi.json). The spec is fetched and committed as a JSON file so the repo serves as a versioned snapshot.

- `specs/openapi.json` — the OpenAPI 3.1 document behind https://docs.coinflow.cash/api-reference

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-coinflow.git
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
