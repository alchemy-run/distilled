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
- upload converted specs on release to our own infra (R2), not GitHub
  - once #933 stops committing `packages/*/.generated-specs/`, the few people
    who read the converted models need another place to get them
  - the release fetches the spec mirrors, runs each package's `convert`, and
    uploads the result to R2 keyed by version; a small script downloads one
    package's models into `packages/<pkg>/.generated-specs/`
  - not GitHub Actions artifacts or a mirror repo; `pnpm convert <pkg>` stays
    the local fallback
- rethink github webhooks
  - #936 generates `@distilled.cloud/github/webhooks`: one type per payload
    in the spec's `x-webhooks` plus a `WebhookEvents` map. It is types only,
    about 1.8 MB of generated source, and it grew the github tarball 25%.
  - it has no signature check (HMAC-SHA256 of `X-Hub-Signature-256`), no
    runtime payload schemas and no event-name constants; draft #583 has all
    three
  - decide the shape: a separate subpath or package, runtime decoding or
    types only, and whether other providers' webhooks follow the same pattern
- go over the gRPC client
  - core/src: protocol-grpc.ts, protobuf.ts, grpc-transport.ts and the two
    transports (grpc-transport-node-http2.ts, grpc-transport-cloudflare-sockets.ts);
    modal is the only SDK on it
  - webpack breaks the Workers transport: `import(SOCKETS_MODULE)` becomes an
    empty context that always rejects ("Cannot find module"), so every call
    fails with a transport error. esbuild, rolldown, Vite and wrangler keep
    the import. benches/bundlers marks the webpack case `it.fails`; a
    `/* webpackIgnore: true */` comment on the import is the likely fix
  - protobuf.ts throws its encode/decode errors (43 throws) and
    protocol-grpc.ts catches them; decide if that stays or becomes typed
- retry policies (#932) — plan agreed 2026-11-12, PR stack in progress
  - precedence: a `Retry` policy the user provides > the Smithy trait
    `distilled.retry#policy` (defined in packages/dev; numbers only:
    attempts, base delays, cap, long-poll; on a service or an operation,
    the operation wins) > the default. Converters and `patches/` write the
    trait. A spec value that is a generic template (73% of GCP's
    `*_grpc_service_config.json` retry policies) does not count.
  - what retries: only errors marked retryable — Smithy `@retryable`
    (`throttling: true` for throttling), a patch, or core's own explicit
    marks for never-sent network errors and its 429/503 classes. No
    inference from a status code: codegen stops making 5xx/408/504 retry
    triggers. No idempotency or HTTP-method rule.
  - default: 3 attempts, full jitter `random(0,1) × min(20s, base × 2^n)`,
    base 50 ms transient and 1 s throttling (AWS Retry Behavior 2.1).
  - budget (AWS token bucket): 500 tokens, a transient retry costs 14, a
    throttling retry 5, a first-try success adds 1, a successful retry is
    refunded. Starts at 5–10 retries' worth instead of full, so many small
    Lambdas cannot add up to 3× load. The bucket lives in the policy value;
    each SDK's default keeps a module-level map (a global), keyed by
    service+region for AWS and by host elsewhere, no cap. Long-poll
    operations still back off when the budget is empty.
  - server hints, every SDK: read `x-amz-retry-after` and
    `x-distilled-retry-after` (integer ms, anything else ignored; take the
    larger) and wait `clamp(hint, t, t + 5s)` with no extra jitter, as the
    AWS Java, Python and Rust SDKs do (not the JS SDK). When either is
    present, ignore `Retry-After`. Otherwise `Retry-After` is a minimum
    (RFC 9110); over the cap, return the error without retrying early.
    A hint never makes an error retryable.
  - stack:
    1. core: default backoff, budget, hint handling, explicit-mark-only
       classification
    2. codegen: `distilled.retry#policy` trait + per-operation override;
       DynamoDB patch (25 ms, 4 attempts)
    3. aws: header parsing at the response, modeled `retryAfterSeconds`
       stays on the error but no longer drives timing, long-poll back-off
    4. gcp: converter reads googleapis service configs, skips templates
    5. alchemy: its own deploy-time policy, merged before 1 is released
       (throttling patience drops from ~22 s to ~1.5 s)
