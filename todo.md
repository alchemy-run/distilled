- strict distilled (runtime check for inputs and output)
- benchmarking
  - runtime perf
  - bundle time
  - bundle size
- new website
  - name and shame apis based on how many patches
- logging/otel/debug mode
- unlisted properties
- readme.md
- license.md
- extract cf docs mirror into its own submodule
- fix runaway spec-submodule size — DONE (stacks/distilled-submodules)
  - the general problem: `specs:sync` at the repo root was a recursive
    `submodule update --init` over every package, so it materialised each
    upstream in full — github/rest-api-description at ~6.7 GB checked out for
    one 13 MB file, kubernetes/kubernetes ~1.5 GB for one, and
    Azure/azure-rest-api-specs (338k paths for ~780 documents).
  - `stacks/distilled-submodules` manages one `distilled-mirror/spec-mirror-<pkg>`
    repository per spec-consuming package, and an Alchemy Action commits the
    exact file set into each — a per-upstream `fetch-specs.ts` plus a daily
    refresh workflow.
  - all 24 unblocked packages now submodule their mirror instead of the
    upstream; `specs:sync` is 406 MB of working tree, shallow and
    non-recursive. `pnpm specs:check` fails if a package drops back off its
    mirror or loses `shallow = true`.
  - contributors who cannot create a mirror develop against
    `pnpm specs:local <pkg>` + `DISTILLED_SPECS_LOCAL=1`; see
    `.agents/skills/distilled-sdk`.
- cloudflare spec source is broken upstream
  - developers.cloudflare.com migrated to Astro/Starlight and now serves the
    full HTML page at every `<page>/index.md` URL — including the ones its own
    /api/llms.txt still advertises as markdown. So
    `packages/cloudflare/scripts/download-api-docs.ts` no longer downloads
    markdown: a crawl today yields 7.2 GB of HTML instead of ~16 MB of
    markdown, and `packages/cloudflare/specs` is a stale snapshot.
  - `spec-mirror-cloudflare` is therefore managed but unscaffolded.
  - likely fix: move the generator off the docs crawl and onto
    cloudflare/api-schemas, which publishes a real 24 MB openapi.json. That is
    a generator change (spec-to-smithy.ts parses markdown today), not a mirror
    change.
- requested sdks (name — source of the request)
  - xata — distilled#354
  - sentry — alchemy#1003 (review comment r3709110628)
  - spacetimedb — alchemy#1044 (review comment r3710539021)
  - docker — distilled#170
  - meilisearch — distilled#377
  - polar — distilled#373, distilled#236
  - clerk — distilled#317
  - resend — distilled#346
  - turbopuffer — distilled#357
  - better-auth — distilled#372
  - unkey — distilled#323
  - hostinger — distilled#338
  - discord — distilled#276
  - modrinth — distilled#287