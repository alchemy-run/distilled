# spec-mirror-axiom

A git mirror of the three Axiom REST API specs published in [axiomhq/docs](https://github.com/axiomhq/docs), reduced to exactly the files the
[`@distilled.cloud/axiom`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/restapi/versions/v2.json` — `content/docs/(api-reference)/restapi/versions/v2.json`
- `specs/restapi/versions/v1-edge-ingest.json` — `content/docs/(api-reference)/restapi/versions/v1-edge-ingest.json`
- `specs/restapi/versions/v1-edge-query.json` — `content/docs/(api-reference)/restapi/versions/v1-edge-query.json`

Nothing else from `axiomhq/docs` is mirrored, so this repository stays small
enough to use as a git submodule — the upstream repository is never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-axiom.git
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
