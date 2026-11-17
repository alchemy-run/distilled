# spec-mirror-exa

A git mirror of [Exa](https://exa.ai)'s first-party [OpenAPI specs](https://exa.ai/docs/admin/openapi-spec),
reduced to exactly the files the [`@distilled.cloud/exa`](https://github.com/alchemy-run/distilled)
generator reads:

- `specs/exa-spec.json` — the public API (https://exa.ai/docs/exa-spec.json)
- `specs/team-management-spec.yaml` — the Team Management API (https://exa.ai/docs/team-management-spec.yaml), verbatim

The separate `websets-spec.yaml` is not mirrored: the public document already
contains every Websets operation.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-exa.git
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
