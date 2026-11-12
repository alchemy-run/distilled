# spec-mirror-gcp

A git mirror of Google's [API Discovery Service](https://developers.google.com/discovery). All versions of all APIs are fetched and committed as JSON files so the repo serves as a versioned snapshot of the full discovery catalog.

It also keeps, under `specs/googleapis/`, the retry policies Google's client libraries use, which discovery documents do not carry: every `*_grpc_service_config.json` from [googleapis/googleapis](https://github.com/googleapis/googleapis), verbatim, and `http-rules.json`, the `google.api.http` bindings of each gRPC method (read from the `.proto` files next to each config) and `hosts.json`, each gRPC service's `google.api.default_host`, so a method name can be matched to a discovery method of the same API.

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-gcp.git
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
