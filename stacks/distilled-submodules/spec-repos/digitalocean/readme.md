# spec-mirror-digitalocean

A git mirror of DigitalOcean's [public OpenAPI spec](https://api-engineering.nyc3.digitaloceanspaces.com/spec-ci/DigitalOcean-public.v2.yaml). The spec is fetched and committed as a JSON file so the repo serves as a versioned snapshot.

See [DigitalOcean API reference](https://docs.digitalocean.com/reference/api/digitalocean/) and [digitalocean/openapi](https://github.com/digitalocean/openapi).

It also mirrors the [Apache OpenWhisk API spec](https://github.com/apache/openwhisk/blob/master/core/controller/src/main/resources/apiv1swagger.json) as `specs/openwhisk.json`. DigitalOcean Functions run on OpenWhisk, and each Functions namespace serves this API at its own `api_host`.

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-digitalocean.git
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
