# spec-mirror-namespacelabs

A git mirror of Namespace's public protobuf API, the Buf Schema Registry
module [buf.build/namespace/cloud](https://buf.build/namespace/cloud),
reduced to exactly the files the
[`@distilled.cloud/namespacelabs`](https://github.com/alchemy-run/distilled)
generator reads:

- `specs/proto/namespace/**/*.proto` — the module's own files: every
  `namespace.cloud.*`, `namespace.experimental.*` and `namespace.private.*`
  service plus the `namespace.stdlib` messages they share.

The module's one dependency, `buf.build/namespace/bazel` (Bazel's own proto2
build-event protos), is not mirrored: `buf export --exclude-imports` drops it,
and the only file that imports it (`integrations/bazel/v1beta/invocation_report.proto`)
defines no service.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-namespacelabs.git
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
