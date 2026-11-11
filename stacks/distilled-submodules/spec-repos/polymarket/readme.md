# spec-mirror-polymarket

A git mirror of Polymarket's REST [OpenAPI documents](https://docs.polymarket.com/llms.txt), reduced to exactly the files the
[`@distilled.cloud/polymarket`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/gamma.yaml` — https://docs.polymarket.com/api-spec/gamma-openapi.yaml
- `specs/clob.yaml` — https://docs.polymarket.com/api-spec/clob-openapi.yaml
- `specs/data.json` — https://data-api.polymarket.com/v2/openapi.json
- `specs/relayer.yaml` — https://docs.polymarket.com/api-spec/relayer-openapi.yaml
- `specs/bridge.yaml` — https://docs.polymarket.com/api-spec/bridge-openapi.yaml
- `specs/combos-rfq.yaml` — https://docs.polymarket.com/api-spec/combos-rfq-openapi.yaml
- `specs/perps.json` — https://docs.polymarket.com/api-spec/perps-openapi.json

The AsyncAPI (WebSocket) documents are not mirrored.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-polymarket.git
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
