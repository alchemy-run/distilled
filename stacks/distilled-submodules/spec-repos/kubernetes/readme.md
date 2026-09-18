# spec-mirror-kubernetes

A git mirror of the Kubernetes [OpenAPI spec](https://github.com/kubernetes/kubernetes/blob/master/api/openapi-spec/swagger.json), reduced to exactly the file the
[`@distilled.cloud/kubernetes`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/swagger.json` — `api/openapi-spec/swagger.json`

Nothing else from `kubernetes/kubernetes` is mirrored, so this repository stays small
enough to use as a git submodule — the upstream repository is never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-kubernetes.git
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
