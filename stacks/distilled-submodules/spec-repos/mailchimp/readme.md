# spec-mirror-mailchimp

A git mirror of Mailchimp's [API specs](https://github.com/mailchimp/mailchimp-client-lib-codegen), reduced to exactly the files the
[`@distilled.cloud/mailchimp`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/marketing.json` — `spec/marketing.json`, the Marketing API (Swagger 2.0)
- `specs/transactional.json` — `spec/transactional.json`, the Transactional API (Swagger 2.0)
- `specs/transactional.openapi.json` — `spec/transactional.openapi.json`, the same API as OpenAPI 3.1, read for its per-route error responses

Nothing else from `mailchimp/mailchimp-client-lib-codegen` is mirrored, so this
repository stays small enough to use as a git submodule — the upstream
repository is never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-mailchimp.git
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
