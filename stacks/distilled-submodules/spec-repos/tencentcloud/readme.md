# spec-mirror-tencentcloud

A git mirror of the Tencent Cloud API 3.0 models that Tencent ships inside its
own CLI, [TencentCloud/tencentcloud-cli](https://github.com/TencentCloud/tencentcloud-cli)
(Apache-2.0), reduced to exactly what the
[`@distilled.cloud/tencentcloud`](https://github.com/alchemy-run/distilled)
generator reads:

- `specs/<product>/v<YYYYMMDD>/api.json` — one model per product: its
  actions, and the input and output objects with each member's type,
  required flag and nullability. Only the version the CLI calls by default
  (the first entry of `SERVICE_VERSIONS` in `tccli/services/__init__.py`) is
  kept.
- `specs/_manifest.json` — `[{ product, version, file }]` for every product.

The models are pulled with a blobless, sparse, depth-1 clone: the working tree
is narrowed to the default `api.json` files before any checkout happens, so
the Python sources, the examples and the history are never transferred.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-tencentcloud.git
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
