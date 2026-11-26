# spec-mirror-unifi

A git mirror of Ubiquiti's UniFi [OpenAPI specs](https://developer.ui.com): Network, Protect, InnerSpace, Mobility, Site Manager and Carrier Fabric. Each is fetched from `https://developer.ui.com/<api>/v<version>/openapi.json` and committed as `specs/<api>.json` so the repo serves as a versioned snapshot. The release of each API is pinned in `fetch-specs.ts`.

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-unifi.git
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
