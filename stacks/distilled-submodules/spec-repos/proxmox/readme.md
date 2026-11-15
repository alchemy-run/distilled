# spec-mirror-proxmox

The structure of the Proxmox VE API schema, read by the
[`@distilled.cloud/proxmox`](https://github.com/alchemy-run/distilled) generator.

Proxmox publishes its API schema in the
[API viewer](https://pve.proxmox.com/pve-docs/api-viewer/)'s
[`apidoc.js`](https://pve.proxmox.com/pve-docs/api-viewer/apidoc.js), which documents the
current release. The fetch script extracts the schema without running any JavaScript.

This mirror holds only the structure of that schema: paths, methods, operation names,
parameter names, types, formats, enums, defaults, constraints and flags. It holds no Proxmox
documentation text. Descriptions, type texts, titles, permission texts and defaults written as
prose are dropped before anything is written.

- `specs/api-structure.json`: the structural schema

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-proxmox.git
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
Its scaffolding is generated. Edit it there, not here.
