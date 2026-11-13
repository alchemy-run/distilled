# spec-mirror-boxd

A git mirror of boxd's public gRPC protobuf from
[boxd-sh/sdk](https://github.com/boxd-sh/sdk), reduced to exactly the file
the [`@distilled.cloud/boxd`](https://github.com/alchemy-run/distilled)
generator reads:

- `specs/api.proto` — `proto/api.proto` (`service BoxdApi`), the definition
  boxd's official Python and TypeScript SDKs are generated from

Nothing else from `boxd-sh/sdk` is mirrored, so this repository stays small
enough to use as a git submodule — the upstream repository is never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-boxd.git
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
