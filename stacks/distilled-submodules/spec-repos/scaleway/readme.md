# spec-mirror-scaleway

A git mirror of Scaleway's [OpenAPI specifications](https://www.scaleway.com/en/developers/api/).
The developer portal publishes one OpenAPI 3.1 document per API version
(`/en/developers/api/<route>/<version>/schema.yml`); every one of them is
fetched, converted from YAML to JSON and committed so the repo serves as a
versioned snapshot. `specs/_manifest.json` maps each file to its proto
service (`scaleway.instance.v1.Api`) and its download URL.

APIs the portal publishes no document for (Billing v2, Dedibox billing/RPN/IPv6, Search, Dataviz, Edge Services'
VPC endpoints) are derived from the generated client in
[scaleway-sdk-js](https://github.com/scaleway/scaleway-sdk-js) and marked
`"source": "scaleway-sdk-js"` in the manifest; a derived document gives way
to the portal's as soon as one is published.

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-scaleway.git
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
