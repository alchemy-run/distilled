# spec-mirror-temporal-cloud

A git mirror of Temporal's first-party [Cloud Ops API OpenAPI spec](https://saas-api.tmprl.cloud/spec.json), reduced to exactly the file the
[`@distilled.cloud/temporal-cloud`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/openapi.json` — the served spec, rewritten as deterministic JSON

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-temporal-cloud.git
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
