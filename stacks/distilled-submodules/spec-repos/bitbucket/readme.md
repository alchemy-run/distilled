# spec-mirror-bitbucket

A git mirror of Atlassian's [Bitbucket Cloud REST API OpenAPI spec](https://dac-static.atlassian.com/cloud/bitbucket/swagger.v3.json), the document behind [developer.atlassian.com/cloud/bitbucket/rest](https://developer.atlassian.com/cloud/bitbucket/rest/). The spec is fetched and committed as a JSON file so the repo serves as a versioned snapshot.

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-bitbucket.git
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
