# spec-mirror-stackit

A git mirror of STACKIT's [OpenAPI specifications](https://github.com/stackitcloud/stackit-api-specifications).
The documents are the same source [docs.api.stackit.cloud](https://docs.api.stackit.cloud/)
renders. Each product's latest version is fetched and committed as JSON so
the repo serves as a versioned snapshot.

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-stackit.git
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
