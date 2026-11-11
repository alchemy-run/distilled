# spec-mirror-zerossl

A git mirror of the ZeroSSL API reference, reduced to exactly the files the
[`@distilled.cloud/zerossl`](https://github.com/alchemy-run/distilled) generator reads.
ZeroSSL publishes no OpenAPI document; its reference is Markdown in
[zerossl/documentation](https://github.com/zerossl/documentation):

- `specs/api/*.md` — `docs/api`, the REST API, one page per endpoint
- `specs/acme/*.md` — `docs/acme`, ACME helpers (EAB credentials)
- `specs/_manifest.json` — upstream commit and page list

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-zerossl.git
```

## Updating specs

From `.meta/`:

```sh
pnpm install
pnpm run fetch-specs
```
