# spec-mirror-technitium

The structure of the Technitium DNS Server HTTP API, read by the
[`@distilled.cloud/technitium`](https://github.com/alchemy-run/distilled) generator.

Technitium publishes no machine-readable description of its API. The fetch script reads two files
of the [DnsServer](https://github.com/TechnitiumSoftware/DnsServer) repository at a pinned release:
`APIDOCS.md`, which documents every call, its parameters and an example response, and the
server's route table and request handlers, which show how each parameter is parsed.

Both are licensed under GPL-3.0. This mirror holds only the structure of the API: paths,
permission names, parameter and member names, types, enum values and the section headings that
become operation names. It holds no Technitium documentation text and no example values.

- `specs/api-structure.json`: the API structure (139 documented calls)
- `specs/provenance.json`: the release, the commit, every file's SHA-256 and the checksum of the
  structure

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-technitium.git
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
