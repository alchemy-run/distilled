# spec-mirror-modal

A git mirror of Modal's public gRPC protobufs from
[modal-labs/modal-client](https://github.com/modal-labs/modal-client), reduced
to exactly the files the [`@distilled.cloud/modal`](https://github.com/alchemy-run/distilled)
generator reads:

- `specs/api.proto` — `modal_proto/api.proto` (`service ModalClient`)
- `specs/task_command_router.proto` — `modal_proto/task_command_router.proto`
  (`service TaskCommandRouter`)

Nothing else from `modal-client` is mirrored, so this repository stays small
enough to use as a git submodule — the upstream repository is never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-modal.git
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
