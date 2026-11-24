# spec-mirror-jira

A git mirror of Atlassian's [Jira Cloud platform REST API v3 OpenAPI spec](https://dac-static.atlassian.com/cloud/jira/platform/swagger-v3.v3.json), the document behind [developer.atlassian.com/cloud/jira/platform/rest/v3](https://developer.atlassian.com/cloud/jira/platform/rest/v3/). The spec is fetched and committed as a JSON file so the repo serves as a versioned snapshot.

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-jira.git
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
