# spec-mirror-dokploy

A git mirror of Dokploy's [OpenAPI spec](https://github.com/Dokploy/sdk/blob/main/openapi.json). Dokploy's CI generates the document from its tRPC routers and commits it to the official [Dokploy/sdk](https://github.com/Dokploy/sdk) repository; this mirror snapshots that file as JSON so the repo serves as a versioned snapshot.

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-dokploy.git
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
