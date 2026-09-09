# @distilled.cloud/bench-runtime

Runtime speed benchmarks for the Distilled SDKs: how much CPU a call costs
inside the SDK, with the network taken out. Measurements, not pass/fail
tests. No credentials, no live API calls.

```sh
pnpm bench:runtime                       # quick profile, ~30 s
pnpm bench:runtime -- --full             # mitata's default budget, several minutes
pnpm bench:runtime -- --filter aws/s3    # regex over provider/service/op/stage
pnpm bench:runtime -- --json > out.json  # machine-readable results
pnpm bench:runtime:record                # refresh results/latest.json (committed)
pnpm --filter @distilled.cloud/bench-runtime bench
```

Runner is Bun; the timer is [mitata](https://github.com/evanwashere/mitata)'s
`measure()` (warm-up, batched sampling, p50/p99 from the sample set). The
quick profile caps each case at ~120 ms of CPU and 8+ samples; `--full`
uses mitata's own defaults (~640 ms/case).

## What is measured

Every case is `provider/service/op/stage`. Stages:

| stage         | AWS                                                                 | Cloudflare                                                          |
| ------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `encode`      | `Schema.encodeUnknownSync(InputSchema)(input)`                      | same                                                                |
| `decode`      | `Schema.decodeUnknownSync(OutputSchema)(parsed)` on parsed data     | same, on camelCased data — **not on the hot path** (see below)      |
| `wire-decode` | `makeResponseParser(op)` on a string body: XML/JSON parse + protocol deserialize + schema decode | `JSON.parse` + the protocol's per-member key mapping (`mapKeys`) — mirrors `protocol.ts` |
| `build`       | `makeRequestBuilder(op)(input)`: protocol serializer + middleware, no endpoint resolution or signing | `core/protocol-http buildRequest` with the same args the protocol passes |
| `call`        | the generated operation through `AwsProtocol` and a mocked `HttpClient`: endpoint rules, SigV4, retry wrapper, deserialize, decode | the generated operation through `CloudflareProtocol` and a mocked `HttpClient`: credentials, envelope unwrap, key mapping, retry wrapper |
| `call-error`  | canned non-2xx body → typed error class                             | canned `{ success: false }` envelope → typed error class            |

The mock transport is `HttpClient.make(() => Effect.succeed(HttpClientResponse.fromWeb(request, new Response(body))))`.
Every `call` still constructs a real `Response` per iteration, so the
`baseline/mock-http/roundtrip` row (execute + read body as text) is the part
of a `call` number that is *not* Distilled; subtract it to estimate the
SDK's share.

Coverage:

- **AWS** (one service per wire protocol): S3 rest-xml (`ListBuckets`,
  `HeadObject`), DynamoDB aws-json (`GetItem`, `PutItem`), Lambda rest-json
  (`GetFunction`, `Invoke`), STS aws-query (`GetCallerIdentity`).
- **Cloudflare** (alchemy-hot services, one list + one write each):
  workers, kv, d1, r2, zones.

Inputs are deep imports (`@distilled.cloud/aws/s3`,
`@distilled.cloud/cloudflare/kv`, …), not the package barrels.

## Reading the numbers

Quick-profile results on one dev box (bun 1.3.13, Linux x64) — expect
±30 % run to run; the p99 column is noisy at the quick budget.

| case                                   | ops/sec | p50     | note                                                    |
| -------------------------------------- | ------: | ------: | ------------------------------------------------------- |
| baseline/mock-http/roundtrip/call      |   ~80k  |  ~10 µs | mock execute + body text; subtract from `call` rows     |
| aws/sts/GetCallerIdentity/encode       |   ~40M  |   25 ns | empty struct                                            |
| aws/sts/GetCallerIdentity/build        |  ~300k  |    3 µs | aws-query form body                                     |
| aws/sts/GetCallerIdentity/wire-decode  |   ~65k  |   15 µs | fast-xml-parser + Result unwrap                         |
| aws/sts/GetCallerIdentity/call         |   ~2k   | ~400 µs | dominated by SigV4 (see below)                          |
| aws/dynamodb/PutItem/build             |   ~60k  |   16 µs | 7-attribute AttributeValue union serialize              |
| aws/s3/ListBuckets/wire-decode         |   ~6k   | ~140 µs | 20-bucket XML                                           |
| cloudflare/kv/createNamespace/build    |  ~600k  |  1.6 µs | trait-driven request                                    |
| cloudflare/kv/createNamespace/call     |   ~35k  |   26 µs | full op, mocked                                         |
| cloudflare/workers/listScripts/call    |   ~2k   | ~400 µs | 20 scripts × ~25 fields through `mapKeys`               |

### Where the time goes (findings)

- **AWS `call` ≈ 300–600 µs, of which SigV4 is most.** `aws4fetch`'s
  `AwsV4Signer.sign()` costs ~75–95 µs p50 on its own here, and the AWS
  protocol constructs a new signer per request with a fresh `cache` map, so
  the four HMAC rounds that derive the signing key are redone every call.
  Passing a shared `cache: Map` to `AwsV4Signer` halves `sign()` (~35–40 µs
  in a side probe). The rest is the `Stream.toReadableStreamEffect` →
  `Response.text()` body path in `decode` (~50 µs p50 on a tiny body vs
  ~9 µs for `response.text` directly) and Effect fiber/promise hops.
  Effect's HTTP tracer span adds ~20–30 % on top; `Effect.withTracerEnabled(false)`
  removes it.
- **Cloudflare `call` ≈ 25–60 µs for single objects; lists scale with
  `mapKeys`.** Key mapping costs ~15 µs per Workers script (~7 µs without
  the key dictionary). Two hot spots in `core/protocol-http`:
  `mapKeysByDictionary` rebuilds the reverse dictionary with
  `Object.fromEntries(Object.entries(dict).flatMap(...))` on *every* call
  (per nested object), and `mapKeys` does a linear
  `Object.entries(dict).find(...)` for each key the schema does not declare.
  Memoising the reverse map per dictionary would remove most of it.
- **Cloudflare `decode` is not on the hot path.** The Cloudflare protocol
  returns after key mapping and never runs the output schema decoder
  (responses are not validated). AWS *does* run `Schema.decodeUnknownEffect`
  on every success response (leniently — mismatches fall back to the raw
  value), which is why AWS `wire-decode` > `decode` + parse.
- Schema `encode` of inputs is cheap everywhere (tens of ns to ~1 µs)
  except DynamoDB `PutItem` (~11–15 µs) where the `AttributeValue` union is
  resolved per attribute.

## Committed results: `results/latest.json`

`pnpm bench:runtime:record` runs the quick profile and rewrites
`results/latest.json`. The distilled.cloud website reads that file at build
time (`website/scripts/build.ts`) to render its benchmark page; if the file
is absent the site builds without the section. Refreshing it is manual —
rerun the script on a change that should move the numbers and commit the
file alongside.

```jsonc
{
  "schema": 1,
  "generatedAt": "2026-09-09T18:00:00.000Z",  // ISO 8601
  "commit": "9b3f5da1d",                       // short sha the run was on
  "machine": { "runtime": "bun 1.3.13", "cpu": "…", "os": "linux … x64", "host": "…" },
  "profile": "quick",                          // or "full"
  "results": [
    { "name": "aws/sts/GetCallerIdentity/call", "provider": "aws", "service": "sts",
      "op": "GetCallerIdentity", "stage": "call", "note": "aws-query + SigV4, XML result",
      "opsPerSec": 1500.2, "p50": 516700, "p99": 3134000, "samples": 128 }
  ]
}
```

`p50` / `p99` are nanoseconds. Cases that errored are omitted. `--record`
refuses to combine with `--filter` so the file is always the whole table.

**These numbers are not portable.** They come from one machine and one
run; expect ±30 % between boxes and runs, and the p99 column is noisy at
the quick budget. `machine` and `generatedAt` are recorded so a reader can
tell which box and when. Compare runs on the same host only.

## Layout

```
run.ts              CLI: arg parsing, progress, table/JSON output, --record
results/latest.json committed snapshot (see above)
src/harness.ts      mock HttpClient, mitata wrapper, Case/Result types, table
src/record.ts       results/latest.json shape + writer
src/baseline.ts     runtime/mock overhead rows
src/aws.ts          AWS fixtures + cases
src/cloudflare.ts   Cloudflare fixtures + cases
```

Adding a case: push a `Case` (`provider/service/op/stage`, `note`, `fn`)
onto the list in the provider module. Keep fixtures canned and in-memory;
nothing here may open a socket.

`pnpm --filter @distilled.cloud/bench-runtime typecheck` checks the suite
against the SDK sources (path-mapped in `tsconfig.json`) so it does not
need a prior `tsc -b`.
