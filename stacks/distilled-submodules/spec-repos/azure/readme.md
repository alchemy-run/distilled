# spec-mirror-azure

A git mirror of the slice of
[Azure/azure-rest-api-specs](https://github.com/Azure/azure-rest-api-specs) the
[`@distilled.cloud/azure`](https://github.com/alchemy-run/distilled) generator
reads — roughly **780 documents / 56 MB**, out of an upstream repository of
338,000+ files and tens of gigabytes checked out.

What is kept:

- `specs/specification/<service>/resource-manager/<Microsoft.Provider>/[<sub>/]stable/<latest>/*.json`
  — the swagger documents of the LATEST stable api-version of every ARM
  resource provider
- every document those `$ref`, transitively — `common-types`, siblings, other
  providers — so the mirror is self-contained and the converter's off-disk ref
  resolution works against it

What is dropped: preview api-versions, data-plane specs, superseded stable
versions, and `x-ms-examples` payloads (~16,000 files / 40 MB that no step of
the pipeline reads).

The upstream layout is preserved under `specs/specification/` so relative
`$ref`s resolve unchanged.

### How it stays small

`fetch-specs.ts` clones blobless and **without a checkout**, lists the tree to
decide which paths to keep — no blob is downloaded to make that decision — then
narrows the sparse checkout to exactly those paths. Fetching content is the
last step, not the first, so the multi-gigabyte working tree never exists.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-azure.git
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
