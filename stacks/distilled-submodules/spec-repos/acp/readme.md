# spec-mirror-acp

A git mirror of the [Agent Client Protocol](https://agentclientprotocol.com)
JSON Schema. ACP publishes `schema.json` + `meta.json` (and their
`*.unstable.json` variants) as assets of the `schema-v1.*` GitHub releases of
[agentclientprotocol/agent-client-protocol](https://github.com/agentclientprotocol/agent-client-protocol);
this mirror snapshots the assets of the latest stable `schema-v1.*` release.
The `schema-v2.*` releases are alpha and are not mirrored.

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-acp.git
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
