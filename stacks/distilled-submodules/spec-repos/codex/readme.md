# spec-mirror-codex

A git mirror of the [OpenAI Codex](https://github.com/openai/codex) app-server protocol
(JSON-RPC over stdio, `codex app-server`), reduced to exactly the JSON Schema files the
[`@distilled.cloud/codex`](https://github.com/alchemy-run/distilled) generator reads, from
`codex-rs/app-server-protocol/schema/json/`:

- `specs/ClientRequest.json`, `specs/ClientNotification.json`, `specs/ServerRequest.json`,
  `specs/ServerNotification.json` — the per-direction method unions (with every params type)
- `specs/*Response.json`, `specs/v1/*Response.json`, `specs/v2/*Response.json` — the request
  result types
- `specs/_upstream.json` — the upstream commit the files were taken from (the last commit
  that touched the schema directory)

Nothing else from `openai/codex` is mirrored, so this repository stays small enough to use
as a git submodule — the upstream repository is never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-codex.git
```

## Updating specs

From `.meta/`:

```sh
pnpm install
pnpm run fetch-specs
```

Set `GITHUB_TOKEN` to lift the GitHub API's unauthenticated rate limit.

---

This repository is managed by the `distilled-submodules` Alchemy stack in
[alchemy-run/distilled](https://github.com/alchemy-run/distilled) (`stacks/distilled-submodules`).
Its scaffolding is generated — edit it there, not here.
