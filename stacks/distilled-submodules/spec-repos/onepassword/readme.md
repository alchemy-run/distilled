# spec-mirror-onepassword

A git mirror of 1Password's published OpenAPI specs, reduced to exactly the files the
[`@distilled.cloud/onepassword`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/openapi.json` — Connect server API ([`1Password/connect` `docs/openapi/spec.yaml`](https://github.com/1Password/connect/blob/main/docs/openapi/spec.yaml))
- `specs/events.json` — Events API ([`events_api.yaml`](https://www.1password.dev/openapi/events_api.yaml))
- `specs/users.json` — Users API ([`users_api.yaml`](https://www.1password.dev/openapi/users_api.yaml))
- `specs/oauth.json` — OAuth API used by the Users API ([`oauth_api.yaml`](https://www.1password.dev/openapi/oauth_api.yaml))
- `specs/partnership.json` — Partnership API ([`partnership_api.yaml`](https://www.1password.dev/openapi/partnership_api.yaml))
- `specs/docs/` — vendor API docs snapshotted at fetch time

Each upstream YAML document is parsed and written as JSON.
Nothing else from `1Password/connect` or 1password.dev is mirrored, so this repository stays small
enough to use as a git submodule — the upstream repository is never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-onepassword.git
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
