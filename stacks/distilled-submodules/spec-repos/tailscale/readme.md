# spec-mirror-tailscale

A git mirror of Tailscale's API spec. The spec is fetched and committed as a JSON file so the repo serves as a versioned snapshot.

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Spec source(s)

- https://api.tailscale.com/api/v2?outputOpenApiSchema=true

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-tailscale.git
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
