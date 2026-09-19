# Distilled website

Landing page for [distilled.cloud](https://distilled.cloud), deployed as an
Alchemy stack. Same stage topology as alchemy's website: production,
staging, a `preview-base` parent, and opt-in PR versions.

## Stack

[SolidStart 2](https://docs.solidjs.com/solid-start) on Vite 8 with
[Tailwind v4](https://tailwindcss.com), prerendered to plain HTML by Nitro's
`static` preset. **There is no server.** `pnpm build` writes `dist/` with
`index.html`, `bench.html`, `shame.html`, hashed assets under `_build/`, and
the brand-mark sprite `icons.svg`; the Cloudflare Worker in `worker.ts` only
fronts the asset bucket to set headers on mirrors. Client-side JS is there
for the interactive bits (theme toggle, hero sample morph, package filter,
bench stage tabs) and the pages are complete without it.

```
build/          build-time data: reads the repo, feeds the pages
  site-data.ts    collectSiteData(): everything below, sliced per page
  packages.ts     packages/*/package.json → catalogue, groups, search hints
  patch-stats.ts  packages/*/patches → fixes per 100 operations
  bench-data.ts   benches/*/results/latest.json
  alchemy-usage.ts  which packages Alchemy depends on (fetched from GitHub)
  plugin.ts       Vite plugin: `site:home` / `site:shame` / `site:bench`
                  virtual modules + emits /icons.svg
  data/           brand-icons.json, alchemy-providers.json (fallback)
src/
  app.tsx, app.css        router shell; theme tokens + Tailwind theme
  entry-server.tsx        the <html> document (build-time only)
  routes/                 index.tsx, bench.tsx, shame.tsx
  components/layout/      Header, Footer, ThemeToggle, Seo
  components/home/        Hero, CodeSamples, InstallLine, Capabilities,
                          Problem, HowItWorks, Catalog, samples.ts
  components/shame/       Offenders, HonourList
  components/bench/       BundleSection, RuntimeSection
  components/ui/          Section, Stats, Code, BrandMark, Icons
  lib/                    format, highlight, morph, dom, theme, site
worker.ts       Cloudflare Worker: noindex + social-card host on mirrors
alchemy.run.ts  the stack
```

## Data refreshed on every build

Nothing on the site is hand-entered. `build/site-data.ts` runs once per
`vite build` and the pages import the result, so every deploy reflects the
checkout it was built from:

- **Package catalogue** — every non-private `@distilled.cloud/*` in
  `packages/*/package.json`, grouped by the `GROUPS` table in
  `build/packages.ts` (an unlisted package lands in "More"). Add a
  `{ viewBox, inner }` entry to `build/data/brand-icons.json` keyed by
  `packages/<dir>` to give a new provider a mark; otherwise it gets a
  monogram.
- **Patch statistics** (`/shame`, the homepage facts) — fixes per 100 SDK
  operations, computed by `build/patch-stats.ts` from `packages/*/patches`
  and `packages/*/src/services`.
- **Benchmarks** (`/bench`, the homepage "import one operation" card) —
  `benches/runtime/results/latest.json` and
  `benches/bundle/results/latest.json`, written by
  `pnpm bench:runtime:record` and `pnpm --filter @distilled.cloud/bench-bundle record`.
  A missing file omits that section.
- **Used in Alchemy** — the `@distilled.cloud/*` dependencies of
  `alchemy-run/alchemy@main`'s `packages/alchemy/package.json`, fetched from
  GitHub at build time (10 s timeout). Only those count as "in production":
  the honour roll is zero-patch *and* used, and unused zero-patch packages
  are listed separately as unproven. If the fetch fails (or
  `DISTILLED_SITE_OFFLINE=1` is set) the build falls back to
  `build/data/alchemy-providers.json` and `/shame` says so; refresh that
  file occasionally with the command in it.

`alchemy.run.ts` lists these inputs in `memo.include`, so a change to any of
them rebuilds and redeploys.

`public/og.png` is rendered from `assets/og.html` by `bun scripts/og.ts`,
which needs a local Chromium (Playwright's cache or `CHROMIUM=…`). It is
committed so the site build never needs a browser. Display type is Fraunces
(OFL) from `@fontsource-variable/fraunces`, imported by `src/app.css` and
hashed into `_build/` like any other asset; the CSS pins the WONK axis off so
`l`/`f` keep their plain forms at display sizes.

## Stages

| stage | worker | domain |
| --- | --- | --- |
| `prod` | `distilled-website-prod` | `https://distilled.cloud` |
| `main` | `distilled-website-main` | `https://main.distilled.cloud` |
| `preview-base` | `distilled-website-preview` | workers.dev (parent for PR versions) |
| `pr-N` | version of `preview-base`, alias `pr-N` | workers.dev alias |

`prod` is the only indexable origin. `worker.ts` serves
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

A deploy only runs when the push or PR touches something the site renders:
`website/**`, `packages/*/package.json`, `packages/*/patches/**`,
`packages/*/src/services/**`, `benches/*/results/latest.json` or the root
manifests. That list mirrors `memo.include` in `alchemy.run.ts`, because
those are the files the build reads for its numbers.

Every PR also gets a `Website (typecheck & static build)` job in
[`ci.yml`](../.github/workflows/ci.yml), which runs `tsc` and a full
`vite build`. PRs that carry `deploy-website` skip the build step there —
`website.yml` runs the same build to produce the preview.

Credentials are the repo's existing `WEBSITE_CLOUDFLARE_API_TOKEN`,
`WEBSITE_CLOUDFLARE_ACCOUNT_ID`, and `WEBSITE_CLOUDFLARE_ZONE_ID`, passed
through as `CLOUDFLARE_*`. Do not use `STACKS_CLOUDFLARE_*` (state-store
only) and do not overwrite the generic `CLOUDFLARE_*` secrets.

PR comments post as the same GitHub App as `release.yml`
(`ALCHEMY_VERSION_BOT_ID` / `ALCHEMY_VERSION_BOT_PRIVATE_KEY`).

## Local

```sh
pnpm install
pnpm --filter "./website" run build      # writes dist/
pnpm --filter "./website" run preview    # serves the built dist/ on :3000
pnpm --filter "./website" run dev:site   # Vite dev server with HMR on :3000
pnpm --filter "./website" run typecheck
cd website && pnpm exec alchemy          # CLI; stack typechecks via tsc
```

`pnpm --filter "./website" run dev` is `alchemy dev` (which runs `dev:site`)
and needs a Cloudflare profile. Prefer `dev:site` when you only want the
pages. In dev the data is collected on first request and re-collected on
the next reload after any file change, so a `pnpm generate` shows up
without restarting.

To deploy by hand (optional; CI owns prod/main):

```sh
cd website
pnpm exec alchemy deploy --stage main --yes
```

Do not deploy `prod` from a laptop unless you mean to replace
https://distilled.cloud.
