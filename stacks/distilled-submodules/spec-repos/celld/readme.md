# spec-mirror-celld

Smithy models of the [celld](https://github.com/denoland/celld) node and
operator APIs, read by the
[`@distilled.cloud/celld`](https://github.com/alchemy-run/distilled) generator:

- `specs/node.json` — node administration (`/state`, `/reload`, `/evict/{scope}`, …)
- `specs/runtime.json` — reserved-class operator API on `POST /runtime/{scope}` (D1, KV, Queues)

celld publishes no API description, so the models are written by hand from its
source; each one's metadata pins the release, revision and source files. Edit them
in alchemy-run/distilled at `stacks/distilled-submodules/spec-repos/celld/models/`;
the stack deploys them to `.meta/models/` and `.meta/fetch-specs.ts` copies them here.

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-celld.git
```

## Updating specs

From `.meta/`:

```sh
pnpm install
pnpm run fetch-specs
```
