# Distilled website

Landing page for [distilled.cloud](https://distilled.cloud), deployed as an
Alchemy stack. Same stage topology as alchemy's website: production,
staging, a `preview-base` parent, and opt-in PR versions.

The site is static HTML. `scripts/build.ts` copies `public/` to `dist/` and
injects the published `@distilled.cloud/*` package catalogue from
`packages/*/package.json`, grouped by the `GROUPS` table in that script (an
unlisted package lands in "More"). There is no Starlight docs portal.

`/shame` (`public/shame.html`) ranks providers by spec patches per 100 SDK
operations, computed at build time by `scripts/patch-stats.ts` from
`packages/*/patches` and `packages/*/src/services`. `data/alchemy-providers.json`
lists the packages Alchemy imports on `main`; only those count as "in
production". The honour roll is zero-patch *and* in production, unused
zero-patch packages are listed separately as unproven, and the homepage award
goes to the least-patched in-production package. Refresh the list when
Alchemy adopts a new provider (the command is in the file).

`/bench` (`public/bench.html`) renders the runtime and bundle benchmarks.
`scripts/bench-data.ts` reads `benches/runtime/results/latest.json` and
`benches/bundle/results/latest.json` (written by `pnpm bench:runtime:record`
and `pnpm --filter @distilled.cloud/bench-bundle record`). If a file is
missing, that section is omitted. The homepage "Small, fast" card pulls
four headline numbers from the same files.

Package cards show a brand mark from `data/brand-icons.json` (Simple Icons,
CC0, plus official AWS/Azure/GCP marks), emitted once as an SVG sprite;
packages without an entry get a monogram. Add a `{ viewBox, d }` entry
keyed by `packages/<dir>` to give a new provider a mark.

`public/og.png` is rendered from `assets/og.html` by `bun scripts/og.ts`,
which needs a local Chromium (Playwright's cache or `CHROMIUM=…`). It is
committed so the site build never needs a browser. Display type is
Fraunces (OFL, variable), self-hosted from `public/fonts/`.

## Stages

| stage | worker | domain |
| --- | --- | --- |
| `prod` | `distilled-website-prod` | `https://distilled.cloud` |
| `main` | `distilled-website-main` | `https://main.distilled.cloud` |
| `preview-base` | `distilled-website-preview` | workers.dev (parent for PR versions) |
| `pr-N` | version of `preview-base`, alias `pr-N` | workers.dev alias |

`prod` is the only indexable origin. `src/worker.ts` serves
`X-Robots-Tag: noindex` (and a no-sitemap `robots.txt`) on every other host.

Non-`pr-*` stages use `RemovalPolicy.retain`. PR stages are destroyed on
close or when the `deploy-website` label is removed.

## CI

[`.github/workflows/website.yml`](../.github/workflows/website.yml):

- Push to `main` → stage `main`, then refresh `preview-base`.
- `chore(release):` commit (from `release.yml`) or dispatch with `prod` →
  stage `prod`.
- Internal PR with the `deploy-website` label → stage `pr-{n}` plus a
  GitHub comment with the preview URL (`BUILD_SHA` is the PR head SHA).
- Close / unlabel → destroy **only** `pr-*`.

Credentials are the repo's existing `WEBSITE_CLOUDFLARE_API_TOKEN`,
`WEBSITE_CLOUDFLARE_ACCOUNT_ID`, and `WEBSITE_CLOUDFLARE_ZONE_ID`, passed
through as `CLOUDFLARE_*`. Do not use `STACKS_CLOUDFLARE_*` (state-store
only) and do not overwrite the generic `CLOUDFLARE_*` secrets.

PR comments post as the same GitHub App as `release.yml`
(`ALCHEMY_VERSION_BOT_ID` / `ALCHEMY_VERSION_BOT_PRIVATE_KEY`).

## Local

```sh
pnpm install
pnpm --filter "./website" run build     # writes dist/
pnpm --filter "./website" run preview   # static server on :4173, no Cloudflare
pnpm --filter "./website" run typecheck
cd website && pnpm exec alchemy         # CLI; stack typechecks via tsc
```

`pnpm --filter "./website" run dev` is `alchemy dev` and needs a Cloudflare
profile. Prefer `preview` when you only want the HTML.

To deploy by hand (optional; CI owns prod/main):

```sh
cd website
pnpm exec alchemy deploy --stage main --yes
```

Do not deploy `prod` from a laptop unless you mean to replace
https://distilled.cloud.
