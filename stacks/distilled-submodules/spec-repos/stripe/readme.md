# spec-mirror-stripe

A git mirror of Stripe's [OpenAPI spec](https://github.com/stripe/openapi), reduced to exactly the file the
[`@distilled.cloud/stripe`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/openapi.spec3.sdk.json` — `latest/openapi.spec3.sdk.json`

Nothing else from `stripe/openapi` is mirrored, so this repository stays small
enough to use as a git submodule — the upstream repository is never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-stripe.git
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
