# spec-mirror-openai

A git mirror of OpenAI's [OpenAPI description](https://github.com/openai/openai-openapi), reduced to exactly the file the
[`@distilled.cloud/openai`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/openapi.json` — `openapi.json` (OpenAI API, including the Admin API)

Nothing else from `openai/openai-openapi` is mirrored, so this repository stays small
enough to use as a git submodule — the upstream repository is never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-openai.git
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
