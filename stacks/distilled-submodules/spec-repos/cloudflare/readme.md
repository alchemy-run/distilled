# spec-mirror-cloudflare

A mirror of the [Cloudflare API documentation](https://developers.cloudflare.com/api/), reduced to the files the
[`@distilled.cloud/cloudflare`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/api/resources/**/index.md` — the Markdown twin of every page in the API sidebar
- `specs/_manifest.json` — every page URL, the pages rendered from HTML, the ones missing upstream and the ones only present here

Cloudflare publishes no machine-readable description of this surface that the
generator can consume, so the documentation is the spec. Each page has a
Markdown twin at `<page>/index.md`, and the entire navigation tree is
server-rendered into the single index page — one fetch of the index yields
every page URL.

Two upstream quirks the fetch script handles:

- The Markdown endpoint truncates the largest pages mid-stream, ending the
  response with `<details>` elements left unclosed. The HTML for those pages is
  served complete, so the script renders the HTML into the same Markdown.
- Some pages the sidebar links 404. Those are reported and any previously
  fetched copy is kept, as are pages the sidebar no longer lists: a page
  disappearing from the docs is not evidence that its API is gone.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-cloudflare.git
```

## Updating specs

From `.meta/`:

```sh
bun install
bun run fetch-specs
```

`--concurrency N` changes how many pages are fetched at once (default 12) and
`--limit N` fetches only the first N pages, for a smoke test.

---

This repository is managed by the `distilled-submodules` Alchemy stack in
[alchemy-run/distilled](https://github.com/alchemy-run/distilled) (`stacks/distilled-submodules`).
Its scaffolding is generated — edit it there, not here.
