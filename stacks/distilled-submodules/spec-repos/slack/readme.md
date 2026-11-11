# spec-mirror-slack

A git mirror of the Slack Web API reference, as the JSON twins
[docs.slack.dev](https://docs.slack.dev/reference/methods) serves for its
reference pages, reduced to exactly the files the
[`@distilled.cloud/slack`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/methods.json` — the method index
- `specs/methods/<name>.json` — one file per method (without `examples`)
- `specs/scopes.json`, `specs/types.json`, `specs/objects.json` — site-level lists
- `specs/_manifest.json` — every page URL → file

Slack publishes no OpenAPI document; `slackapi/slack-api-specs` froze in 2020.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-slack.git
```

## Updating specs

From `.meta/`:

```sh
pnpm install
pnpm run fetch-specs
```
