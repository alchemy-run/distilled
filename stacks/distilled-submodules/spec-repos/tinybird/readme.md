# spec-mirror-tinybird

A mirror of the [Tinybird API reference](https://www.tinybird.co/docs/api-reference), reduced to the files the
[`@distilled.cloud/tinybird`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/api-reference/**/index.md` — the Markdown twin of every API reference page listed in [`/docs/llms.txt`](https://www.tinybird.co/docs/llms.txt)
- `specs/_manifest.json` — every page URL, its file, and whether its reference was rendered from HTML

Tinybird publishes no machine-readable description of its REST API, so the
documentation is the spec. Each page has a Markdown twin at `/docs/md/<path>`.

One upstream quirk the fetch script handles: the twins of the older,
Sphinx-generated pages hold only an `{% api_reference api="…" /%}` placeholder
where the operations belong. The page HTML carries them as Sphinx `dl.http`
definitions, one `<div class="body" role="main">` per placeholder, so the script
renders that HTML into the same `## METHOD /path` + `{% table %}` Markdown the
newer pages use and splices it in place of the placeholder.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-tinybird.git
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
