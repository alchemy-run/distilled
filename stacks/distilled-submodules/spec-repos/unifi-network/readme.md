# spec-mirror-unifi-network

A git mirror of Ubiquiti's [UniFi Network API OpenAPI spec](https://developer.ui.com/network/v11.0.97/openapi.json). The spec is fetched and committed as a JSON file so the repo serves as a versioned snapshot. The release is pinned in `fetch-specs.ts`.

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-unifi-network.git
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
