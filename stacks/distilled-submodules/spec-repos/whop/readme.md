# spec-mirror-whop

A git mirror of everything `packages/whop` reads out of `specs/`.

## The OpenAPI documents

| surface | document | reference |
| --- | --- | --- |
| versioned | [`api-v1-native.json`](https://docs.whop.com/openapi/api-v1-native.json) | <https://docs.whop.com/api-reference/beta/overview> |
| legacy | [`api-v1-stable.json`](https://docs.whop.com/openapi/api-v1-stable.json) | <https://docs.whop.com/developer/api/getting-started> |

Whop documents one HTTP API through two reference sites, each with its own
document, and neither is a superset of the other — so both are mirrored and the
generator merges them, versioned winning every route both describe.

Both documents are stamped with the same `info.x-api-version-date`, which is
what the generated SDK pins every request to. The fetch script fails if that
ever stops being true, since a merged client can send only one pin.

## The docs pages

`docs/**/*.md` is the Markdown twin of every page on `docs.whop.com` — what the
"Copy as Markdown" button gives you, which is just the page URL with `.md`
appended. The page list is the **union** of `/llms.txt` and `/sitemap.xml`,
because neither is complete: llms.txt misses several webhook-event pages and
the sitemap misses a handful of api-reference operations, so taking one alone
silently loses documentation. `docs/_manifest.json` records which index listed
each page.

Every `/api-reference/**` page inlines the *whole* OpenAPI document into a
fence — 58 KB per page, ~37 MB across the reference, all of it a duplicate of
the two documents above. Each fence is replaced with a one-line pointer at the
file it came from; the page's own prose is kept verbatim, and guide pages,
which carry no such fence, are saved byte-for-byte. That is the difference
between a 15 MB mirror and a 45 MB one.

Pages that upstream stops listing are deleted, so the mirror does not
accumulate dead documentation. A run that loses more than 5% of the crawl skips
the prune and says so — a docs host having a bad day must not be able to empty
the corpus.

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-whop.git
```

## Updating specs

From `.meta/`:

```sh
bun install
bun run fetch-specs
```

---

This repository is managed by the `distilled-submodules` Alchemy stack in
[alchemy-run/distilled](https://github.com/alchemy-run/distilled) (`stacks/distilled-submodules`).
Its scaffolding is generated — edit it there, not here.
