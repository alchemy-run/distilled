# spec-mirror-proxmox

The structure of the Proxmox VE API schema, read by the
[`@distilled.cloud/proxmox`](https://github.com/alchemy-run/distilled) generator.

Proxmox publishes its API schema in the API viewer's `apidoc.js`, shipped in the
[`pve-docs`](https://git.proxmox.com/?p=pve-docs.git) Debian package. The fetch script pins
`pve-docs` 9.2.4 and verifies it against Proxmox's signed package repository. It then extracts
the schema without running any JavaScript.

`pve-docs` licenses its `*.js` files under AGPL-3.0-or-later and its documentation under
GFDL-1.3. This mirror holds only the structure of that schema: paths, methods, operation names,
parameter names, types, formats, enums, defaults, constraints and flags. It holds no Proxmox
documentation text. Descriptions, type texts, titles, permission texts and defaults written as
prose are dropped before anything is written.

- `specs/api-structure.json`: the structural schema (678 operations)
- `specs/provenance.json`: the package, URLs, release key fingerprint and checksums

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-proxmox.git
```

## Updating specs

Requires `gpgv`, `ar` and `tar`. From `.meta/`:

```sh
pnpm install
pnpm run fetch-specs
```

---

This repository is managed by the `distilled-submodules` Alchemy stack in
[alchemy-run/distilled](https://github.com/alchemy-run/distilled) (`stacks/distilled-submodules`).
Its scaffolding is generated. Edit it there, not here.
