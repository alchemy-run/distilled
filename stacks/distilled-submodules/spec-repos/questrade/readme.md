# spec-mirror-questrade

A git mirror of the [Questrade API documentation](https://www.questrade.com/api/documentation/getting-started).
Questrade publishes no OpenAPI document or other machine-readable description, so the mirror
transcribes every documentation page into JSON — headings, paragraphs, tables (with their
"Nested property, level N." depth) and code samples, in page order — for the
[`@distilled.cloud/questrade`](https://github.com/alchemy-run/distilled) generator to read.

- `specs/_manifest.json` — every page in sidebar order, with its sidebar group and label
- `specs/rest-operations/<group>/<page>.json` — one file per REST operation page, plus the enumerations
- `specs/<page>.json` — authorization, error handling, rate limiting, streaming and the other guides

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-questrade.git
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
