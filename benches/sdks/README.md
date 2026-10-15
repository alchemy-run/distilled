# benches/sdks — every SDK, one program each

Measures what distilled itself costs, per SDK package, with no network:
the HTTP transport is an in-memory canned response and `globalThis.fetch`
throws. Live API speed and correctness are out of scope.

```sh
pnpm bench:sdks                                   # all suites, all SDKs (~5 min)
node benches/sdks/run.ts --only aws,resend        # some SDKs
node benches/sdks/run.ts --suites size,bundle     # some suites
node benches/sdks/run.ts --history ~/bench/runs   # also copy the run there
node benches/sdks/run.ts --rediscover             # re-pick non-pinned targets
```

Other flags: `--jobs N` (size/bundle/typecheck parallelism),
`--runtime-jobs N` (latency probes in parallel, default 4), `--budget ms`
(sampling time per latency series, default 1500), `--note text`, `--build`
(force `tsc -b`). `lib/` is built automatically when missing.

Output: `.out/latest.json` (gitignored). The file carries its own metric
catalogue (`metrics`), baselines, environment and git info, so a dashboard
can read runs without knowing this code.

## The programs

Every suite measures the same small programs: **one credentials layer +
one operation**, once for **every protocol the SDK uses**. A protocol is
each distinct `protocol:` layer in the generated operations (Cloudflare's
plain and paginated layers, Doppler's public layer, Fly.io's Machines /
API / Sprites / GraphQL layers) and, for AWS, each wire family the single
`AwsProtocol` layer dispatches on (`restXml`, `restJson1`, `awsJson1_0`,
`awsJson1_1`, `awsQuery`, `ec2Query`). 87 SDKs give 97 programs today.

`targets.json` (committed) holds them as `pkg → protocol → target`, each
with import aliases and two expressions:

```json
"resend": {
  "ResendProtocol": {
    "protocol": "ResendProtocol",
    "primary": true,
    "imports": { "Credentials": "pkg:credentials", "Op": "pkg:services/resend" },
    "auth": "Credentials.CredentialsFromEnv",
    "call": "Op.listLogs({})",
    "env": { "RESEND_API_KEY": "bench-secret" },
    "response": { "status": 200, "headers": { … }, "body": "{}" }
  }
}
```

One target per SDK is `primary`; its results are also the SDK-level
results (`sdks.<pkg>.bundle`, `.runtime`, `.typecheck`), so the SDK's
history stays comparable when protocols are added. Every program's
results are under `sdks.<pkg>.programs.<protocol>`.

A missing target is picked automatically (`src/discover.ts`): operations
of that protocol in `src/services/*.ts` are ranked (fewest required
inputs, `list`/`get` verbs, GET), required members get placeholder
values, and the best candidates are trial-run against canned responses
until one succeeds. `OVERRIDES` in `src/targets.ts` pins the big
multi-service SDKs (S3 listBuckets, Workers listScripts, Storage
listBuckets, Azure resources) and SDKs whose credentials need more than
dummy env vars; `PROTOCOL_OVERRIDES` pins one well-known call per AWS wire
family (Lambda, DynamoDB, KMS, STS, EC2). Delete an entry from
`targets.json` to re-pick it; keep picks stable so runs stay comparable.
The run file's `bench.targets` fingerprint changes whenever the programs
change.

## Suites

| suite       | what                                                                                                          |
| ----------- | ------------------------------------------------------------------------------------------------------------- |
| `size`      | `npm pack --dry-run --offline`: tarball, unpacked, files, split into src / JS / .d.ts / maps; generated LOC; operation count; install footprint with core + effect |
| `bundle`    | rolldown with Alchemy's settings (`../bundle/src/options.ts`): min, gzip, brotli, modules, effect / core / SDK share. Baselines `effect-minimal` and `effect-http` (the same authed GET hand-written with Effect); overhead = SDK − `effect-http` |
| `runtime`   | fresh `node --expose-gc` per SDK importing `lib/*.js`: import time, retained heap, first call, warm p50/p99, added latency (call − bare `HttpClient` roundtrip on the same transport), strict-mode call, GCs per 1k calls, heap growth while warming and leak per 1k calls once warm, peak RSS; then the package root import in a second process |
| `imports`   | every service module (`lib/services/*.js`) imported alone in a fresh `node --expose-gc` with effect loaded: import time and retained heap per provider/service pair (`services.<name>`); then every service of a provider in one process: import time, retained heap and live objects for the whole provider (`provider`) |
| `typecheck` | `tsc --noEmit` of the uncast program against `lib/*.d.ts` (`skipLibCheck`): wall, peak RSS, types; any type error is reported |

Every metric, with its description and unit, is listed in `src/metrics.ts`.

Object counts (`runtime.importObjects`, `runtime.firstCallObjects`,
`barrel.objects`, `provider.objects`) are live JS objects from
`v8.queryObjects(Object)` after gc: plain objects, arrays, functions and
class instances. Strings, numbers, null-prototype objects and V8-internal
objects are not counted. They are counted in a separate probe process.
Counting forces extra GCs, and in the same process those GCs let V8 flush
bytecode of effect functions that ran once, which roughly halved the
measured import heap (resend 660 KB to 325 KB).

`size.tarballWithCore` is the SDK tarball plus `@distilled.cloud/core`'s:
what `npm install` downloads from distilled for one provider.

Latency numbers are microseconds on a shared machine; treat ±10% as noise.
Sizes are deterministic.
