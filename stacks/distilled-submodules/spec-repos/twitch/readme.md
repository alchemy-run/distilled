# spec-mirror-twitch

A mirror of the [Twitch API reference](https://dev.twitch.tv/docs/api/reference/), reduced to the files the
[`@distilled.cloud/twitch`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/api/reference.md` — the Markdown twin of the reference index, which links every resource page
- `specs/api/reference/<resource>.md` — the Markdown twin of every resource page
- `specs/_manifest.json` — every page URL and its file

Twitch publishes no machine-readable description of the Helix API, so the
documentation is the spec. Every docs page has a Markdown twin at
`<page>.md`, and each resource page describes its operations in one fixed
shape (`### Endpoint`, `### Query Parameters`, `### Request Body`,
`### Response Body`, `### Response Codes`).

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-twitch.git
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
