# spec-mirror-anthropic

A git mirror of the [Claude Platform (Anthropic)](https://platform.claude.com/docs/en/api/overview) API's OpenAPI spec, reduced to exactly the file the
[`@distilled.cloud/anthropic`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/openapi.json` — `scripts/mock-spec.json.gz` on the `main` branch of
  [anthropics/anthropic-sdk-typescript](https://github.com/anthropics/anthropic-sdk-typescript), gunzipped. It is the
  OpenAPI document Anthropic's official SDKs are generated from.

Nothing else from `anthropics/anthropic-sdk-typescript` is mirrored, so this repository stays small
enough to use as a git submodule — the upstream repository is never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-anthropic.git
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
