# spec-mirror-whatsapp

A git mirror of Meta's WhatsApp Business Platform [OpenAPI spec](https://github.com/facebook/openapi), reduced to exactly the file the
[`@distilled.cloud/whatsapp`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/openapi.yaml` — the newest `business-messaging-api_v<version>.yaml`
  in the repository root, under a stable name
- `specs/_manifest.json` — upstream commit and the file it came from

Nothing else from `facebook/openapi` is mirrored, so this repository stays small
enough to use as a git submodule. The fetch makes a blobless, depth-1 clone
of `facebook/openapi` and downloads only that one file.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-whatsapp.git
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
