# spec-mirror-acme

A git mirror of [RFC 8555](https://www.rfc-editor.org/rfc/rfc8555), the
Automatic Certificate Management Environment (ACME), as the plain-text RFC the
[`@distilled.cloud/acme`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/rfc8555.txt` — https://www.rfc-editor.org/rfc/rfc8555.txt

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-acme.git
```

## Updating specs

From `.meta/`:

```sh
pnpm install
pnpm run fetch-specs
```
