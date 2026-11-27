# spec-mirror-unkey

A git mirror of Unkey's [OpenAPI spec](https://api.unkey.com/openapi.yaml), reduced to exactly the file the
[`@distilled.cloud/unkey`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/openapi.json` — `https://api.unkey.com/openapi.yaml`, parsed to JSON
- `specs/docs/` — vendor API-reference markdown snapshot

Nothing else is mirrored, so this repository stays small enough to use as a
git submodule.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-unkey.git
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
