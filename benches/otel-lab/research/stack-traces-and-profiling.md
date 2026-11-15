# D. Stack traces, error ergonomics, and profiling of distilled internals

Research report for `distilled` (Effect v4 typed cloud SDKs). Date: 2026-10-24.
Scope: stack-trace mechanics in V8 (the JavaScript engine in Node, Chrome, Bun's JSC excluded), what good SDK errors carry, cheap call-site capture, profiling and debug modes, and secret redaction.

All "measured here" numbers come from microbenchmarks I ran on this machine. Scripts and raw output are in `/tmp/otel-research/bench/`.

- Machine: Intel Core Ultra X7 358H, Linux, Node v24.19.0, Effect 4.0.5 (the version installed in this worktree).
- Stack depth in the benchmarks: about 30 frames unless stated. Each number is the mean of 50k–5M iterations after warm-up. Treat them as ±15%.

---

## 0. Answer first

1. **The user's call site is lost after the first async hop, and V8 cannot recover it inside Effect.** V8's async stack traces only rebuild `await` frames on native promises. Effect's fiber run loop resumes from a scheduler callback, so the raw `.stack` of a typed error shows only `FiberImpl.runLoop` frames. I reproduced this (section 1.4).
2. **Effect already has the fix: a lazily formatted `new Error()` captured at call time, rendered by `Cause.pretty`.** `Effect.fn` adds `at S3.getObject (user-file.ts:21:36)` to the pretty cause. It costs about **1.5 µs per call** (measured here).
3. **The cheapest exact call-site capture is `Error.captureStackTrace(holder, operationFn)` with `Error.stackTraceLimit = 1`: about 0.9 µs.** The current prototype in this worktree (`captureCallSite`, limit 6, regex filter) costs about 1.8 µs to capture and about 4.2 µs if `.stack` is read.
4. **Typed errors should be built with `Error.stackTraceLimit = 0`.** Their own stack points into core internals and is noise. Zeroing saves about 2.6 µs and about half the retained bytes per error (Zod 4.5 measured 1073 B → 714 B).
5. **Error fields to add**: service, operation, region, endpoint host, HTTP status, provider error code, all request IDs, attempt count, total retry delay, a short per-attempt history, duration, trace/span IDs, doc/help links when the spec has them. AWS (`$metadata`), Stripe (`requestId`, `doc_url`, `request_log_url`), and Google (`ErrorInfo` + `Help`) all converge on this set.
6. **Debug output: three sinks from one event stream.** A pretty stderr waterfall, a Chrome Trace Event JSON file (opens in ui.perfetto.dev, no collector), and OTLP (OpenTelemetry Protocol) through Effect's tracer. Optionally a `node:diagnostics_channel` TracingChannel for APM vendors. It costs about 5 ns per event with no subscriber (measured here).
7. **Redaction defaults must be extended.** Effect 4.0.5 redacts URL query keys `AWSAccessKeyId`, `Signature`, `sig`, `X-Goog-Signature`. It misses three of the five keys that OpenTelemetry semantic conventions redact by default: `X-Amz-Signature`, `X-Amz-Credential`, `X-Amz-Security-Token`. Header redaction misses `x-amz-security-token`.

```mermaid
flowchart LR
  U[user calls S3.getObject] -->|sync: captureStackTrace limit 1, ~0.9 µs| CS[call-site holder, unformatted]
  U --> OP[operation Effect]
  OP --> ENC[encode] --> SIG[sign] --> HTTP[HTTP] --> DEC[decode]
  DEC -->|2xx| OK[value]
  DEC -->|error status| ERR[typed error, built with stackTraceLimit 0]
  ERR -->|attach| META[$metadata: ids, attempts, status, region]
  CS -->|read only on failure or debug| PRETTY[Cause.pretty: at user-file:line]
  ERR --> PRETTY
```

The diagram leaves out retries and pagination; they wrap the encode→decode path and add to `attempts` and the attempt history.

---

## 1. JS/V8 stack-trace mechanics relevant to a library

### 1.1 Capture is eager, formatting is lazy

- V8 collects a structured trace when an `Error` is created. It formats the string only on the first read of `.stack`. ([V8 stack trace API](https://v8.dev/docs/stack-trace-api))
- The default limit is 10 frames, chosen as "usually enough … but not so many that it has a noticeable negative performance impact". `Error.stackTraceLimit = 0` disables collection. The limit is read only from `Error`, not from subclasses. ([V8](https://v8.dev/docs/stack-trace-api), [Zod PR #6450](https://github.com/colinhacks/zod/pull/6450))
- The V8 doc says traces from `Error.captureStackTrace` are "immediately collected, formatted". My measurement disagrees for Node 24: reading `.stack` after `captureStackTrace` adds about 440 ns (929 → 1368 ns). So formatting is lazy there too. UNCLEAR which V8 version changed this; the doc text is old.
- Formatting cost was cut by V8 in 2021: method-name inference used to walk the whole prototype chain. About 90% of DevTools time went to symbolization in one report. ([Chrome blog, "10x faster stack traces"](https://developer.chrome.com/blog/faster-stack-traces))
- `Error.prepareStackTrace(error, callSites)` replaces the formatter and receives `CallSite` objects (`getFileName`, `getLineNumber`, `getFunctionName`, `isAsync`, …). It runs only when `.stack` is read. Assigning it does not reduce collection cost. ([V8](https://v8.dev/docs/stack-trace-api), [Zod PR #6450](https://github.com/colinhacks/zod/pull/6450))

### 1.2 Measured costs (measured here, Node 24.19)

| Operation | Cost |
|---|---|
| Plain object `{a, b}` (baseline) | 30 ns |
| `new Error()`, limit 10 | 2.88 µs |
| `new Error()`, limit 3 | 1.20 µs |
| `new Error()`, limit 2 | 1.06 µs |
| `new Error()`, limit 0 | 0.29 µs |
| Save / set limit 2 / `new Error()` / restore (the `Effect.fn` pattern) | 0.92 µs |
| `new Error()` limit 10 **+ read `.stack`** | 6.73 µs |
| `new Error()` limit 2 + read `.stack` | 2.07 µs |
| `Error.captureStackTrace(obj, fn)`, limit 10 | 3.11 µs |
| `class X extends Error` + `Object.assign` (TaggedError-like) | 3.15 µs |
| `util.getCallSites(3)` / `(10)` | 2.56 / 6.29 µs |
| Structured capture via `prepareStackTrace`, limit 3 | 1.82 µs |
| **`captureStackTrace(holder, opFn)`, limit 1** | **0.93 µs** (0.87 µs net of the call chain) |

Cost versus frames captured (measured here). Rule of thumb: about **0.45 µs fixed plus about 0.2 µs per captured frame**. Stack depth beyond the limit matters little.

| limit | depth 10 | depth 30 | depth 100 |
|---|---|---|---|
| 1 | 0.68 µs | 0.64 µs | 0.89 µs |
| 3 | 1.08 µs | 1.11 µs | 1.29 µs |
| 6 | 1.72 µs | 1.77 µs | 1.89 µs |
| 10 | 2.55 µs | 2.59 µs | 2.79 µs |

Public numbers agree in order of magnitude:

- RafaelGSS nodejs-bench-operations, Node 24.9 on 4 vCPU: `new Error` 355,748 ops/s, about 2.8 µs. ([RESULTS-v24](https://github.com/RafaelGSS/nodejs-bench-operations/blob/main/RESULTS-v24.md))
- Zod 4.5 zeroed the limit around `ZodError` construction. Failing `safeParse` went from 250k to 569k ops/s (2.28×), failing `parse` 1.40×. Retained bytes per error went from 1073 B to 714 B (1442 B → 708 B at depth 40). ([Zod PR #6450](https://github.com/colinhacks/zod/pull/6450))
- Safety rules from that PR (and Node core [#24747](https://github.com/nodejs/node/pull/24747) / [#38215](https://github.com/nodejs/node/pull/38215)): restore in `finally`; latch the trick off if the assignment throws (SES `lockdown()`, `--frozen-intrinsics`); skip it where `Error.captureStackTrace` is missing (Safari 11.1–17.1). Effect has the same guard in `effect/src/internal/stackTraceLimit.ts` (internal, not exported).

### 1.3 Async stack traces

- `--async-stack-traces` is on by default since V8 7.3. It adds `at async foo (…)` frames for `await`, `Promise.all`, and `Promise.any` only. The engine finds the caller by following the suspended async function, so there is no runtime cost. ([V8 stack trace API](https://v8.dev/docs/stack-trace-api), [V8 "Faster async functions and promises"](https://v8.dev/blog/fast-async))
- It does not work for `.then()` chains, because the resume point is not the suspend point. ([V8 blog](https://v8.dev/blog/fast-async))
- AWS SDK v3 users hit exactly this: a `PermanentRedirect` error showed only `@smithy/*` middleware frames and no application frame. AWS closed the issue as "not planned" and pointed at V8. ([aws-sdk-js-v3 #5988](https://github.com/aws/aws-sdk-js-v3/issues/5988))

### 1.4 Why it breaks across Effect fibers (reproduced here)

Effect's run loop does not `await`. When an async step completes, a callback calls `FiberImpl.evaluate` → `runLoop`, which runs the next continuation. V8 has no suspended async function to walk, so no user frame exists. Script: `/tmp/otel-research/bench/effect-stack-demo.mjs`.

Raw `.stack` of a `Data.TaggedError` failed after `setTimeout`, with and without `Effect.fn`:

```text
NoSuchBucket: The specified bucket does not exist
    at file:///tmp/.../effect-stack-demo.mjs:12:17          <- where core built the error
    at ContImpl.andThenCont [as ~effect/Effect/successCont] (.../effect/dist/internal/effect.js:1055:10)
    at ~effect/Effect/evaluate (.../effect/dist/internal/core.js:342:30)
    at FiberImpl.runLoop (.../internal/effect.js:453:97)
    at FiberImpl.evaluate (.../internal/effect.js:402:23)
    at AsyncResource.runInAsyncScope (node:async_hooks:227:14)
```

`Cause.pretty` with `Effect.fn("S3.getObject")`:

```text
NoSuchBucket: The specified bucket does not exist
    at file:///tmp/.../effect-stack-demo.mjs:12:17
    at S3.getObject (file:///tmp/.../effect-stack-demo.mjs:21:36)              <- user call site
    at S3.getObject (definition) (file:///tmp/.../effect-stack-demo.mjs:17:28)
```

How Effect does it (read from `effect@4.0.5/src`):

- `Effect.fn` captures one `Error` at definition and one per call, each with the limit set to 2. It stores a lazy `stack()` thunk in the `CurrentStackFrame` service (`internal/effect.ts`, `fn` / `makeFn`).
- `Effect.withSpan` does the same with limit 3 unless `captureStackTrace: false` (`internal/tracer.ts`, `addSpanStackTrace`). Both skip capture when `Error.stackTraceLimit === 0`.
- `Cause.pretty` cuts the error's own stack at the first `Generator.next` or `~effect/` frame. Then it appends up to 10 `CurrentStackFrame` entries (`cleanErrorStack`, `currentStackTrace`).
- Measured here (`effect-bench.mjs`):

| Effect construct (+ `runSync`) | Cost |
|---|---|
| `Effect.fnUntraced(gen)` | 0.22 µs |
| `Effect.fn(gen)` (stack frame, no span) | 1.61 µs |
| `Effect.fn("op")(gen)` (span + stack) | 2.69 µs |
| same with `Error.stackTraceLimit = 0` | 1.17 µs |
| `Effect.withSpan("op")` default | 2.73 µs |
| `Effect.withSpan("op", { captureStackTrace: false })` | 1.16 µs |

So call-site capture is about 1.5 µs of each traced span or `Effect.fn` call.

### 1.5 Source maps

- `node --enable-source-maps`, `process.setSourceMapsEnabled(true)`, or `module.setSourceMapsSupport()` remap `.stack` to the original TypeScript files. Node docs warn: "enabling source maps can introduce latency to your application when `Error.stack` is accessed". ([Node CLI docs](https://nodejs.org/api/cli.html#--enable-source-maps))
- The cost is paid on `.stack` read, not on capture. One report measured median latency of 1620 ms with native source maps versus 1 ms without, at 80 req/s with `new Error().stack` per request on a 4 MB bundle. Caching cut it to about 28 ms. ([nodejs/node #41541](https://github.com/nodejs/node/issues/41541))
- Node maintainers suggest uploading source maps to the error tracker instead of remapping in production (same issue).
- `util.getCallSites(n, { sourceMap })` (Node 22.9+, stability 1.1) returns structured frames and ignores `prepareStackTrace`. It is not cheaper: 2.56 µs for 3 frames (measured here). ([Node util docs](https://nodejs.org/api/util.html))
- Consequence for distilled: read the call-site `.stack` only on failure or in debug mode. Then the source-map cost never hits the success path.

### 1.6 `cause` chains and `AggregateError`

- `new Error(msg, { cause })` is standard. Node's `util.inspect` (used by `console.log` and uncaught errors) prints causes nested and indented. Output measured here:

```text
Error: S3.GetObject failed
    at file:///tmp/.../callsite-bench.mjs:37:13
  [cause]: Error: HTTP request failed
      at file:///tmp/.../callsite-bench.mjs:36:13
    [cause]: Error: socket hang up
        at file:///tmp/.../callsite-bench.mjs:35:14
```

- `AggregateError` prints an `[errors]: [...]` list with each stack. That is a natural fit for "all N retry attempts failed".
- Effect's `causePrettyError` copies `original.cause` recursively into the pretty error. So a typed error with a `cause` (for example the underlying `HttpClientError`) keeps the chain.
- Libraries that use the cause/extend pattern: Octokit passes `{ cause }` to `super` ([request-error.js](https://github.com/octokit/request-error.js/blob/main/src/index.ts)). Kysely appends `new Error().stack` to the driver error's `stack` instead of wrapping, to keep `instanceof` ([stack-trace-utils.ts](https://jsr.io/@kysely/kysely/0.29.6/src/util/stack-trace-utils.ts)). Drizzle wraps in `DrizzleQueryError` with `.cause`, but its own stack starts inside Drizzle (search summary only, not verified in source: UNCLEAR).

---

## 2. How SDKs make errors actionable

### 2.1 What each SDK carries

| SDK | Fields | Notes |
|---|---|---|
| AWS SDK v3 `ServiceException` | `name`, `message`, `$fault` (`client`/`server`), `$retryable`, `$response`, `$metadata` | `$metadata` = `httpStatusCode`, `requestId`, `extendedRequestId` (S3 `x-amz-id-2`), `cfId` (CloudFront), `attempts`, `totalRetryDelay` (ms). The `$` prefix avoids clashes with modeled members such as `RequestId`. ([ResponseMetadata](https://github.com/smithy-lang/smithy-typescript/blob/main/packages/types/src/response.ts); `ServiceException` read from installed `@smithy/core` 3.36.0) |
| Stripe | `type`, `code`, `decline_code`, `param`, `doc_url`, `request_log_url` (dashboard link), `message`, `user_message`, `statusCode`, `requestId`, `headers`, `raw` | Class per category (`StripeCardError`, `StripeRateLimitError`, …) picked by status and `type`. ([API errors](https://docs.stripe.com/api/errors), [stripe-node Error.ts](https://github.com/stripe/stripe-node/blob/master/src/Error.ts)) |
| Google (AIP-193) | `google.rpc.Status{code,message,details}`; `ErrorInfo{reason, domain, metadata}` required in every error; `LocalizedMessage`; `Help{links[{description,url}]}` | `reason` is UPPER_SNAKE_CASE, ≤ 63 chars. Every dynamic value in the message MUST also appear in `metadata`, so code never parses messages. ([AIP-193](https://google.aip.dev/193)) |
| Azure `RestError` | `code`, `statusCode`, `details`, `request`, `response` | `request` and `response` are **non-enumerable**, so logging the error does not dump them. ([RestError](https://learn.microsoft.com/en-us/javascript/api/@azure/core-rest-pipeline/resterror?view=azure-node-latest)) |
| Octokit `RequestError` | `name: "HttpError"`, `status` (0 for network/abort), `request`, `response`, `cause` | Copies `request` and redacts it: `authorization` keeps the scheme ("token [REDACTED]"); `client_secret=` and `access_token=` in the URL become `[REDACTED]`. ([request-error.js](https://github.com/octokit/request-error.js/blob/main/src/index.ts)) |
| Prisma | Error codes (`P2002`, …) with a docs reference, plus a call-site message | `Invalid \`prisma.user.findMany()\` invocation in /path/file.ts:123:45` followed by a source snippet with an arrow on the line. See 3.3. |
| Rust miette / color-eyre | `code`, `help`, `url`, labeled source spans; eyre "sections" (Note, Warning, Suggestion) and a `SpanTrace` from active tracing spans | Search summary only. JS has no widely used miette equivalent; `@vmz/diagnostic` is a small one. ([miette README](https://github.com/zkat/miette), [color-eyre](https://github.com/eyre-rs/color-eyre)) |

### 2.2 What a cloud SDK error should carry

Convergent set. The "Source" column says who already does it.

| Field | Why | Source |
|---|---|---|
| `_tag` / class, `message` | match and show | all |
| `service`, `operation` (`S3`, `GetObject`) | the line that failed, in API terms | OTel `rpc.service`/`rpc.method`; AWS logger `clientName`/`commandName` |
| `region`, endpoint host | wrong-region and endpoint bugs | AWS `PermanentRedirect` body includes `Endpoint` |
| HTTP status | category | all |
| provider code (raw string) + category + retryable | handle by code; retry policy | AWS `$fault`/`$retryable`; Google `reason`+`domain`; Stripe `type`/`code` |
| request IDs (all of them) | support tickets | AWS `requestId`, `extendedRequestId`, `cfId`; Stripe `requestId` |
| `attempts`, `totalRetryDelayMs` | "did retry run?" | AWS `$metadata` |
| short attempt history (status, error tag, delay, duration; last ≤ 5) | see throttling versus 5xx versus network | OTel `http.request.resend_count` per attempt span |
| total `durationMs` | timeouts | — |
| `traceId` / `spanId` of the operation span | jump to the trace | — |
| doc/help URL when the spec has one | next step | Stripe `doc_url`, `request_log_url`; Google `Help.links` |
| call site (lazy) | the user's line | Prisma; Effect `Cause.pretty` |
| `cause` | the transport error under it | Octokit, Node |

Leave out raw request/response bodies. If kept for advanced use, make them non-enumerable (Azure) and a redacted copy (Octokit).

---

## 3. Capturing the user's call site cheaply

### 3.1 Effect

See 1.4. A lazy `new Error()` with limit 2 or 3 at call time, a thunk that splits `.stack` and picks one line on demand, cached. About 0.9–1.1 µs capture and about 1.5 µs end-to-end per traced call.

### 3.2 OpenTelemetry

- Stable semantic-convention attributes: `code.function.name`, `code.file.path`, `code.line.number`, `code.column.number`, `code.stacktrace`. The deprecated names are `code.function`, `code.filepath`, `code.lineno`, `code.namespace`. `code.stacktrace` uses the same format as `exception.stacktrace`. ([OTel code attributes](https://opentelemetry.io/docs/specs/semconv/registry/attributes/code/))
- The OTel JavaScript SDK does not capture these for spans by default (UNCLEAR: no source found that says it does).
- The Java contrib `StackTraceSpanProcessor` adds `code.stacktrace` **at span end, only for spans longer than 5 ms** (configurable). Reason given: "Capturing the stack trace is an expensive operation and does not provide any value on short-lived spans." ([span-stacktrace README](https://github.com/open-telemetry/opentelemetry-java-contrib/tree/main/span-stacktrace)). That trick does not transfer to JS: at span end the user frame is already gone.

### 3.3 Prisma

`EnabledCallSite` creates `new Error()` per query and keeps it unformatted. `getLocation()` runs only when an error is rendered. It parses `.stack` with `stacktrace-parser` and picks the first frame that is not `@prisma`, not the bundled runtime, not `internal/`, not a constructor, and not a proxy. `errorFormat: 'minimal'` and edge builds get a `DisabledCallSite`. ([CallSite.ts @ 6.19.0](https://github.com/prisma/prisma/blob/6.19.0/packages/client/src/runtime/utils/CallSite.ts)). This is the same lazy pattern, at the default limit of 10, so about 2.9 µs per query by the table in 1.2.

### 3.4 Sentry, Datadog, Kysely, Drizzle

- Sentry Node does not raise `Error.stackTraceLimit`. It parses at most 50 frames and decided against setting the limit to 50 because of memory and payload size. `attachStacktrace` makes a synthetic `Error` per captured message. (Search summary; [Sentry options](https://docs.sentry.io/platforms/javascript/configuration/options/))
- Kysely appends a fresh `new Error().stack` to driver errors in the catch block (`extendStackTrace`). That frame is inside Kysely's driver wrapper, after the async hop, so it often still lacks the user frame (Kysely issue #1495, search summary).
- Drizzle: see 1.6 (UNCLEAR).
- Datadog: no per-call call-site capture found; it links profiles to spans instead (section 4).

### 3.5 Options compared (measured here)

| Approach | Capture | Read (on failure) | Exact frame? |
|---|---|---|---|
| Prototype in this worktree: `captureCallSite()` limit 6 + regex skip of distilled frames | 1.77 µs | +2.4 µs (split + regex) | yes, if fewer than 6 distilled frames sit above the user |
| `Effect.withSpan` default (limit 3, fixed line index) | ~1.1 µs | small | only if the frame offset is fixed |
| **`Error.captureStackTrace(holder, operationFn)`, limit 1** | **0.93 µs** | +0.44 µs | **yes: V8 drops `operationFn` and everything above it** |
| `util.getCallSites(3)` | 2.56 µs | 0 | yes after filtering |
| Prisma (limit 10, parse on read) | ~2.9 µs | parse | yes after filtering |

`captureStackTrace(holder, fn)` output from the test: `at userCode (file:///tmp/otel-research/bench/cst1.mjs:20:30)`, which is the user line.

Constraint: `operationFn` must be the exact function the user called, and it must still be on the stack when the capture runs. That means a synchronous capture inside the generated operation call, before any `Effect.gen`/`suspend`.

---

## 4. Profiling library internals

### 4.1 OpenTelemetry Profiles signal

- Public **Alpha** since March 2026. The OTLP Profiles protocol is still marked Development (`v1development`); breaking changes are possible. Collector support exists from v0.148.0. An eBPF whole-system profiler (donated by Elastic) is an official component. In-process language SDK APIs are not available yet. (Search summary. The blog page [opentelemetry.io/blog/2026/profiles-alpha](https://opentelemetry.io/blog/2026/profiles-alpha/) returned a Netlify error twice, so the date is UNCLEAR.)
- Samples link to spans through a `Link` message (`trace_id` 16 bytes, `span_id` 8 bytes). The `code.*` attributes MUST NOT be used on profiles; frames live in the `Location`/`Line`/`Function` messages ([OTel code attributes](https://opentelemetry.io/docs/specs/semconv/registry/attributes/code/)).
- Conclusion: not a distilled dependency in 2026. A user who runs a profiler gets distilled frames for free.

### 4.2 Linking profiles to spans in Node today

- Datadog `dd-trace-js` wall profiler (`@datadog/pprof`) labels each sample with `span id`, `local root span id`, and `trace endpoint`. That powers "code hotspots". AsyncContextFrame (Node 23+) improves accuracy across async boundaries. (Search summary; [Datadog docs](https://docs.datadoghq.com/profiler/connect_traces_and_profiles/))
- Grafana Pyroscope "span profiles" use `span_id` labels and a `pyroscope.profile.id` span attribute. The official `@pyroscope/nodejs` SDK has `wrapWithLabels` but no automatic OTel linking. (Search summary; [Grafana docs](https://grafana.com/docs/pyroscope/latest/configure-client/trace-span-profiles/))
- Both rely on AsyncLocalStorage-style context, which does not follow Effect fibers. UNCLEAR how well they attribute samples to Effect spans.

### 4.3 Node built-ins

| Tool | What it gives | Cost / limit |
|---|---|---|
| `node --cpu-prof` | `.cpuprofile` for Chrome DevTools / Perfetto / speedscope | Default sampling interval is 1000 µs (`--cpu-prof-interval`). It cannot see one 2 µs phase; it shows aggregates over many calls. ([Node CLI](https://nodejs.org/api/cli.html#--cpu-prof)) |
| `process.hrtime.bigint()` | ns monotonic time | 28 ns/call (measured here); Effect's clock uses it (`monotonicNowNanos` in `internal/effect.ts`) |
| `performance.now()` | ms float | 26 ns/call (measured here) |
| `performance.mark()` (+ periodic `clearMarks`) | named marks for `PerformanceObserver` / DevTools | 63 ns/call (measured here); allocates entries |
| `diagnostics_channel` `channel.hasSubscribers` / `publish`, 0 subscribers | event hook for APMs | 3.2 / 3.3 ns (measured here). Node's own benchmark: 758M ops/s on v20, 1.67B ops/s on v22 with 0 subscribers; about 140M ops/s with 1 subscriber; about 30M ops/s with 10. ([state-of-nodejs-performance-2024 CSV](https://raw.githubusercontent.com/RafaelGSS/state-of-nodejs-performance-2024/main/nodejs-internal-benchmark/compare-dc-20-22.csv)) |
| `tracingChannel.traceSync`, 0 subscribers | `start`/`end`/`asyncStart`/`asyncEnd`/`error` | 8.8 ns vs 3.5 ns direct call (measured here), so about 5 ns overhead |
| `tracingChannel.traceSync`, 1 no-op subscriber on all 5 | — | 33.5 ns (measured here) |

TracingChannel details ([Node docs](https://nodejs.org/api/diagnostics_channel.html)):

- It became Stable in Node v26.8.0.
- Events are published only if subscribers existed when the trace started.
- `tracePromise` needs a promise or thenable. Effect is neither, so distilled would call `start.publish`/`end.publish`/`error.publish` itself behind a `hasSubscribers` check.
- Naming convention: `tracing:module.class.method:start`, for example `tracing:distilled.operation:start`.

### 4.4 Chrome Trace Event format as a cheap debug output

- A JSON array of events with `pid`, `tid`, `ts` (µs), `ph` (phase), `name`, `cat`, `args`.
- Perfetto shows `B`/`E` and `X` (complete, with `dur`) as slices, `I` instants, `C` counters, `M` metadata (thread names), and `s`/`t`/`f` flow arrows.
- `X` events on one `tid` MUST nest. Overlapping non-nested events go to an overflow track; the fix is async events with an `id`.
- ([Perfetto: other formats](https://perfetto.dev/docs/getting-started/other-formats), [Trace Event Format spec](https://docs.google.com/document/d/1CvAClvFfyA5R-PhYUmn5OOQtYMH4h6I0nSsKchNAySU/preview))
- For distilled: concurrent operations overlap, so use one `tid` per fiber or async events keyed by span ID.

### 4.5 Effect's own span timing

- Spans read `process.hrtime.bigint()` at start and end.
- A span costs about 1.16 µs without stack capture (measured here). That is fine for one span per operation. It is too heavy to time 1–3 µs internal phases precisely: the probe is as big as the thing measured.
- For phase timing in debug mode, an `hrtime` pair (about 56 ns) into an accumulator is 20× cheaper than a span.

---

## 5. Debug-mode UX in other tools

| Tool | Switch | What it prints | Structure | Secrets |
|---|---|---|---|---|
| Terraform | `TF_LOG=TRACE\|DEBUG\|INFO\|WARN\|ERROR\|JSON`, `TF_LOG_CORE`, `TF_LOG_PROVIDER`, `TF_LOG_PATH` | graph walk, provider RPC, provider HTTP | text on stderr; `JSON` = TRACE as JSON, "not a stable interface" | `sensitive` values redacted in plan output; TRACE logs can still leak, per the docs. Provider `tflog` can mask by key or regex. (Search summary; [Terraform debugging](https://developer.hashicorp.com/terraform/internals/debugging)) |
| kubectl | `-v=N` | 6: resources requested; 7: request headers; 8: request contents; 9: contents untruncated | text | not documented on the page ([kubectl quick reference](https://kubernetes.io/docs/reference/kubectl/quick-reference/)) |
| curl | `-v`, `--trace-time`, `--trace-ascii` | `>` request headers, `<` response headers, `*` info, µs wall-clock prefix | text | **`-v` prints `Authorization: Bearer …` and the full query string in clear** (verified here, curl 8.21.0) |
| AWS CLI / botocore | `--debug` | "Making request for OperationModel(...) with params", signed `AWSPreparedRequest` headers, CanonicalRequest, StringToSign, Signature | `time - thread - logger - LEVEL - msg` | does **not** redact `Authorization`, `X-Amz-Security-Token`, or the signature (search summary, botocore source) |
| AWS SDK v3 | `logger` option | `clientName`, `commandName`, `input`, `output`, `metadata` | object | Smithy `@sensitive` members become `***SensitiveInformation***` (constant read from installed `@smithy/core`) |
| Prisma | `log: [{emit:'event', level:'query'}]` + `$on('query')`; `DEBUG=prisma*` | query, params, `duration` (ms), `timestamp`, `target` | events or stdout; `debug`-package namespaces | params are printed (search summary; [Prisma logging](https://www.prisma.io/docs/orm/prisma-client/observability-and-logging/logging)) |
| Next.js / Turbopack | `NEXT_TURBOPACK_TRACING=1` (levels `overview`, `next`, `turbopack`, `turbo-tasks`), `--internal-trace` | span tree with CPU time and memory | binary `.next-profiles/trace-turbopack.bin` viewed at trace.nextjs.org; older `.next/trace` JSON events with `trace-to-tree.mjs` | n/a (search summary; [Next.js tracing.md](https://github.com/vercel/next.js/blob/canary/contributing/turbopack/tracing.md)) |
| Bun | `fetch(url, {verbose: true\|"curl"})`, `BUN_CONFIG_VERBOSE_FETCH=1\|curl` | `[fetch] >` request, `[fetch] <` response headers; `curl` mode also prints a copy-pasteable `curl` command | text | prints headers as sent, including `Authorization` ([Bun fetch docs](https://bun.com/docs/runtime/networking/fetch)) |
| Node | `NODE_DEBUG=fetch,undici` | connect, send, receive lines with full URL | `FETCH <pid>: …` | headers are not printed; **the full URL including `X-Amz-Signature=` is** (verified here) |

Patterns worth copying:

- **Levels are cumulative**, and the step from "metadata" to "headers" to "bodies" is explicit (kubectl 6/7/8/9).
- **One prefix per direction** (`>` / `<`), with time on every line (curl `--trace-time`).
- **A replayable command** (Bun `curl` mode), with secrets replaced.
- **Separate core from provider noise** (Terraform `TF_LOG_CORE` / `TF_LOG_PROVIDER`).
- **A machine format next to the human one** (Terraform `JSON`, Next.js trace file).
- **Do not copy** the default "print everything" of curl, botocore, and Bun.

---

## 6. Redaction

### 6.1 OpenTelemetry rules ([url attributes](https://opentelemetry.io/docs/specs/semconv/registry/attributes/url/), [HTTP spans](https://opentelemetry.io/docs/specs/semconv/http/http-spans/))

- `url.full` MUST NOT contain URL credentials. Write `https://REDACTED:REDACTED@host/`.
- "Query string values for the following keys SHOULD be redacted by default and replaced by the value `REDACTED`": **`X-Amz-Signature`, `X-Amz-Credential`, `X-Amz-Security-Token`, `sig`, `X-Goog-Signature`**. The rule is marked Development; the list "is subject to change".
- Key matching SHOULD be **case-sensitive**. Keep the key: `?color=blue&sig=REDACTED`.
- An override goes in declarative config `sensitive_query_parameters` under `.instrumentation/development.general.sanitization.url`. It is a full replacement of the defaults, not an addition.
- `url.path` and `url.query`: "Sensitive content … SHOULD be scrubbed when instrumentations can identify it."
- `http.request.header.<key>` / `http.response.header.<key>` are **Opt-In**. Instrumentations "SHOULD require an explicit configuration of which headers are to be captured".
- Client 4xx SHOULD set span status `Error`; 5xx SHOULD. `error.type` = status code string or a low-cardinality error ID. A caller abort SHOULD NOT be an error.
- Retries: one CLIENT span per attempt, with `http.request.resend_count` = 1, 2, …

### 6.2 What Effect 4.0.5 does (read from source)

- Header capture on HTTP client spans is opt-in: `TracerHeaderFilter` defaults to `constFalse`. When captured, `Headers.CurrentRedactedNames` defaults to `authorization`, `cookie`, `set-cookie`, `x-api-key` and prints `<redacted>`. Matching is case-insensitive.
- `UrlParams.CurrentRedactedNames` defaults to **`AWSAccessKeyId`, `Signature`, `sig`, `X-Goog-Signature`**. Effect applies it to `url.full` and `url.query`, and it also redacts userinfo. Matching is case-insensitive, which differs from OTel.
- Gap: the OTel defaults `X-Amz-Signature`, `X-Amz-Credential`, `X-Amz-Security-Token` are missing. A presigned S3 or SigV4-query URL keeps its signature in `url.full`.
- Workspace memory notes that an earlier Effect 4.0.0 recorded all headers. That leaked `x-amz-security-token` into span attributes (issue #546), and distilled's "Built Request" debug log printed bodies with secrets (issue #823). Both show the risk sits in distilled's own logging as much as in Effect.

---

## 7. Recommendations for distilled

### 7.1 Error fields

Put request-level facts in one `$metadata`-style field so they cannot collide with modeled members. AWS uses `$` for the same reason; AWS shapes already have `RequestId`, `Code`, `Endpoint` members. Proposed shape:

```ts
interface DistilledMeta {
  service: string            // "S3"
  operation: string          // "GetObject"
  region?: string
  host: string               // endpoint host only, never a full URL
  httpStatus?: number
  code?: string              // raw provider code, e.g. "NoSuchBucket", Google ErrorInfo.reason
  category: "throttling" | "server" | "network" | "client" | "auth" | ...
  retryable: boolean
  requestId?: string         // x-amz-request-id, cf-ray, request-id (Stripe), ...
  extendedRequestId?: string // x-amz-id-2
  cfId?: string              // x-amz-cf-id
  attempts: number
  totalRetryDelayMs: number
  history?: ReadonlyArray<{ status?: number; tag: string; delayMs: number; durationMs: number }> // last 5
  durationMs: number
  traceId?: string; spanId?: string
  docUrl?: string            // Stripe doc_url, Google Help.links[0].url, when the spec gives it
}
```

- Make it a non-enumerable property, or symbol-keyed with a string alias. Then it does not change `Schema.TaggedError` equality or encoding. Render it in `toString` / `Cause.pretty` as one line: `S3.GetObject 404 NoSuchBucket requestId=… attempts=1 region=us-east-1`.
- Keep the transport error as `cause` (Node and Effect both print it).
- When all retries fail, keep the last error as the thrown error and the attempt history in `$metadata.history`. An `AggregateError` with N full errors is heavier, and the user matches on one tag.
- **Build typed errors with `Error.stackTraceLimit = 0`** in the single core decoder site: save, zero, construct, restore in `finally`, latch off if the write throws (Zod and Node pattern). Effect's internal helper is not exported, so copy its 20 lines.
  - Saves about 2.6 µs and about 360 B per error.
  - The internal frames it drops are the noise from 1.4.
  - `Cause.pretty` still shows the header plus the call-site frame.
  - Do **not** zero for defects or `ParseError`s from distilled's own bugs; there the internal frames are the useful part.

### 7.2 Call-site capture

1. In the generated operation function (or the one core function it calls synchronously), capture with `Error.captureStackTrace(holder, operationFn)` at limit 1. That is about 0.9 µs, versus about 1.8 µs for the current limit-6 prototype, and needs no regex filter: V8 cuts every frame from `operationFn` up. Keep the regex fallback only for entry points where the user-facing function reference is not available.
2. Keep it lazy: store the holder and format on read only (failure or debug). Feed it to Effect through `withParentSpan(..., { captureStackTrace: thunk })`, as the prototype does, so `Cause.pretty` prints `at S3.getObject (user.ts:12:5)`.
3. Respect `Error.stackTraceLimit === 0` (Effect's rule) and `DISTILLED_TELEMETRY=off` as the opt-outs. With both, the success path pays 0 µs.
4. Emit `code.file.path`, `code.line.number`, `code.column.number`, `code.function.name` on the operation span only at debug level. Reading `.stack` costs about 0.44 µs plus source-map remapping, so do not do it for every successful call at `operation` level.
5. Budget check at the default level: one capture (about 0.9 µs) plus one operation span (about 1.2 µs) is about 2.1 µs. That fits "a few µs". Phases add nothing unless debug is on.

### 7.3 Debug output formats

One internal event model: operation start/end, phase start/end (`resolveCredentials`, `encode`, `sign`, `send`, `readBody`, `decode`, `retry.backoff`, `paginate.page`), and attempt results. Record it with `hrtime` pairs, not one span per phase, so debug mode does not distort 1–3 µs phases. Three sinks:

| Sink | Switch (suggested) | Format | Audience |
|---|---|---|---|
| Pretty waterfall on stderr | `DISTILLED_DEBUG=1` (ops + phase timings), `=2` (+ redacted request line and headers), `=3` (+ redacted, truncated bodies) | kubectl-style cumulative levels; curl-style `>`/`<` prefixes with times | a human at a terminal |
| Chrome Trace Event JSON | `DISTILLED_TRACE_FILE=./distilled-trace.json` | `X` events (`ts`, `dur` in µs), one `tid` per fiber or async `b`/`e` events keyed by span ID, `M` events naming threads; `args` = the `$metadata` fields | opens in ui.perfetto.dev or chrome://tracing with no collector |
| OTLP | Effect tracer layer + `Telemetry.debug` | operation CLIENT span (`rpc.*`, `cloud.region`, `aws.request.id`, `error.type`); one HTTP span per attempt with `http.request.resend_count`; phases as Debug-level INTERNAL spans | production tracing backends |
| (optional) diagnostics_channel | always on, publish only when `hasSubscribers` | `tracing:distilled.operation:start/end/error` | APM vendors; about 5 ns per event when unused (Node-only; UNCLEAR on Workers) |

Example waterfall (illustrative layout, not real output):

```text
[distilled] S3.GetObject  us-east-1  404 NoSuchBucket  41.8 ms  attempts=1  at src/sync.ts:12:5
  ├ credentials   0.004 ms (cached)
  ├ encode        0.006 ms
  ├ sign          0.021 ms
  ├ send          41.2  ms  > GET https://b.s3.amazonaws.com/k?X-Amz-Signature=REDACTED
  ├ readBody      0.31  ms  < 404  x-amz-request-id=7Q…  243 B
  └ decode        0.05  ms  → NoSuchBucket
```

For hot-path work on distilled itself, document `node --cpu-prof --cpu-prof-interval 100` plus Perfetto or speedscope. Do not add an OTel Profiles dependency while the signal is Alpha.

### 7.4 Redaction rules

1. **URL query**: redact values (keep keys) for the OTel five (`X-Amz-Signature`, `X-Amz-Credential`, `X-Amz-Security-Token`, `sig`, `X-Goog-Signature`), Effect's `AWSAccessKeyId` and `Signature`, plus `X-Goog-Credential`, `access_token`, `client_secret`, `token`, `key` (Google API key).
   - Apply this to `url.full` and `url.query` in spans, the waterfall, trace files, and error `$metadata` (store host only there).
   - Distilled should provide `UrlParams.CurrentRedactedNames` with this extended list in its default layer, because Effect 4.0.5 misses three OTel keys.
2. **URL userinfo**: `REDACTED:REDACTED` (OTel rule; Effect does it).
3. **Headers**: opt-in allowlist for spans (OTel; Effect's default filter already records none). In debug level 2+, always mask:
   - `authorization`: keep the scheme and credential scope. For SigV4: `AWS4-HMAC-SHA256 Credential=AKIA…/20261024/us-east-1/s3/aws4_request, SignedHeaders=…, Signature=REDACTED`. For bearer tokens: `Bearer REDACTED` (Octokit keeps the scheme too).
   - `proxy-authorization`, `cookie`, `set-cookie`, `x-api-key`, `x-amz-security-token`, `x-goog-api-key`, `x-auth-key` and `x-auth-email` (Cloudflare legacy auth), plus any header whose name matches `/token|secret|password|api[-_]?key/i`.
4. **Never print signing internals**: no CanonicalRequest, StringToSign, or Signature (botocore does; do not copy).
5. **Bodies**: never in spans. In debug level 3, mask members with the Smithy `@sensitive` trait or `Redacted` schema type as `***SensitiveInformation***` (AWS v3 convention) before truncating. Fix the core `wrapSensitive` gap for record/map values noted in workspace memory, otherwise map-typed secrets (for example Doppler `listSecrets`) print in clear.
6. **Presigned URLs returned to the user** (S3 presign, GCS signed URLs): treat them as secrets in every log and span; apply rule 1.
7. **Errors**: no raw request object. If one is attached, it is a redacted copy and non-enumerable (Octokit + Azure).

Left out: Python, Go, and Java SDK debug modes; browser-specific behavior; Bun's JSC (JavaScriptCore) stack API. All costs above are V8/Node only.

---

## Sources

Fetched and read:

1. V8 stack trace API — https://v8.dev/docs/stack-trace-api
2. V8 blog, Faster async functions and promises (zero-cost async stack traces) — https://v8.dev/blog/fast-async
3. Chrome blog, How we sped up Chrome DevTools stack traces by 10x — https://developer.chrome.com/blog/faster-stack-traces
4. RafaelGSS nodejs-bench-operations, Node 24 results — https://github.com/RafaelGSS/nodejs-bench-operations/blob/main/RESULTS-v24.md
5. Zod PR #6450, skip eager stack capture — https://github.com/colinhacks/zod/pull/6450
6. nodejs/node #41541, `--enable-source-maps` slow — https://github.com/nodejs/node/issues/41541
7. Node CLI docs (`--enable-source-maps`, `--cpu-prof`) — https://nodejs.org/api/cli.html
8. Node util docs (`util.getCallSites`) — https://nodejs.org/api/util.html
9. Node diagnostics_channel docs — https://nodejs.org/api/diagnostics_channel.html
10. State of Node.js performance 2024, diagnostics_channel benchmark CSV — https://raw.githubusercontent.com/RafaelGSS/state-of-nodejs-performance-2024/main/nodejs-internal-benchmark/compare-dc-20-22.csv
11. OTel semconv, code attributes — https://opentelemetry.io/docs/specs/semconv/registry/attributes/code/
12. OTel semconv, URL attributes — https://opentelemetry.io/docs/specs/semconv/registry/attributes/url/
13. OTel semconv, HTTP spans — https://opentelemetry.io/docs/specs/semconv/http/http-spans/
14. OTel Java contrib span-stacktrace — https://github.com/open-telemetry/opentelemetry-java-contrib/tree/main/span-stacktrace
15. Smithy TypeScript `ResponseMetadata` — https://github.com/smithy-lang/smithy-typescript/blob/main/packages/types/src/response.ts
16. aws-sdk-js-v3 #5988, application stack trace not shown — https://github.com/aws/aws-sdk-js-v3/issues/5988
17. Stripe API errors — https://docs.stripe.com/api/errors
18. stripe-node `Error.ts` — https://github.com/stripe/stripe-node/blob/master/src/Error.ts
19. Google AIP-193 Errors — https://google.aip.dev/193
20. Azure `RestError` — https://learn.microsoft.com/en-us/javascript/api/@azure/core-rest-pipeline/resterror?view=azure-node-latest
21. Octokit request-error — https://github.com/octokit/request-error.js/blob/main/src/index.ts
22. Prisma `CallSite.ts` (tag 6.19.0, via GitHub API) — https://github.com/prisma/prisma/blob/6.19.0/packages/client/src/runtime/utils/CallSite.ts
23. Kysely `stack-trace-utils.ts` — https://jsr.io/@kysely/kysely/0.29.6/src/util/stack-trace-utils.ts
24. kubectl quick reference (verbosity table) — https://kubernetes.io/docs/reference/kubectl/quick-reference/
25. Bun fetch docs (verbose) — https://bun.com/docs/runtime/networking/fetch
26. Perfetto, external trace formats (Chrome JSON) — https://perfetto.dev/docs/getting-started/other-formats

Read from installed packages in this worktree:

27. Effect 4.0.5 source: `internal/effect.ts` (`fn`, `makeFn`, `causePrettyError`, `cleanErrorStack`, `monotonicNowNanos`), `internal/tracer.ts`, `internal/stackTraceLimit.ts`, `http/HttpClient.ts`, `http/Headers.ts`, `http/UrlParams.ts`, `http/internal/tracing.ts`
28. `@smithy/core` 3.36.0: `ServiceException`, `SENSITIVE_STRING`
29. distilled worktree prototype: `packages/core/src/telemetry.ts` (`captureCallSite`, `operationSpan`), `packages/core/src/debug.ts`

Search summaries only (not opened; treat details as UNCLEAR):

30. OpenTelemetry Profiles Alpha announcement — https://opentelemetry.io/blog/2026/profiles-alpha/ (page errored)
31. Terraform debugging — https://developer.hashicorp.com/terraform/internals/debugging
32. botocore debug logging and redaction — https://github.com/boto/botocore/issues/2626
33. Prisma logging — https://www.prisma.io/docs/orm/prisma-client/observability-and-logging/logging
34. Next.js Turbopack tracing — https://github.com/vercel/next.js/blob/canary/contributing/turbopack/tracing.md
35. Datadog connect traces and profiles — https://docs.datadoghq.com/profiler/connect_traces_and_profiles/
36. Grafana Pyroscope span profiles — https://grafana.com/docs/pyroscope/latest/configure-client/trace-span-profiles/
37. Sentry JS options / stack limit — https://docs.sentry.io/platforms/javascript/configuration/options/
38. miette — https://github.com/zkat/miette ; color-eyre — https://github.com/eyre-rs/color-eyre
39. Drizzle `DrizzleQueryError`, Kysely #1495 (search only)

Local verification (scripts in `/tmp/otel-research/bench/`): `stack-bench.mjs`, `effect-bench.mjs`, `callsite-bench.mjs`, `limit6.mjs`, `cst1.mjs`, `effect-stack-demo.mjs`, plus `curl -v` and `NODE_DEBUG=fetch` checks against a local HTTP server.
