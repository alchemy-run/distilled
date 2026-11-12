# spec-mirror-e2b

A git mirror of [E2B](https://github.com/e2b-dev/E2B)'s API descriptions, reduced to exactly the files the
[`@distilled.cloud/e2b`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/openapi.yml` — `spec/openapi.yml` (control plane)
- `specs/openapi-volumecontent.yml` — `spec/openapi-volumecontent.yml` (volume files)
- `specs/envd.yaml` — `spec/envd/envd.yaml` (in-sandbox daemon, HTTP)
- `specs/process.proto` — `spec/envd/process/process.proto` (in-sandbox daemon, Connect)
- `specs/filesystem.proto` — `spec/envd/filesystem/filesystem.proto` (in-sandbox daemon, Connect)

Nothing else from `e2b-dev/E2B` is mirrored, so this repository stays small
enough to use as a git submodule — the upstream repository is never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-e2b.git
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
