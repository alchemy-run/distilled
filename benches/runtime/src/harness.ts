/**
 * Shared benchmark harness.
 *
 * Every measurement here is CPU spent inside Distilled (schema codecs,
 * protocol serializers, the operation pipeline in `@distilled.cloud/core/api`)
 * — never the network. The "full client call" case runs the real operation
 * against an Effect `HttpClient` whose transport is a canned in-memory
 * `Response`, so auth, endpoint resolution, retry wrapping and envelope
 * decoding all execute and the socket does not exist.
 *
 * A `noop-mock-http` baseline measures the mock transport plus the Effect
 * runtime on their own so readers can subtract mock overhead from the
 * per-operation numbers.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import * as Schema from "effect/Schema";
import { measure, type stats as MitataStats } from "mitata";

//#region Options

export interface BenchOptions {
  /** `--full`: longer sampling per case (mitata's own default budget). */
  readonly full: boolean;
  /** `--filter <regex>`: only run cases whose full name matches. */
  readonly filter: RegExp | undefined;
  /** `--json`: emit machine-readable results instead of the table. */
  readonly json: boolean;
  /** `--record`: write `results/latest.json` (the committed artifact). */
  readonly record: boolean;
}

export const parseArgs = (argv: ReadonlyArray<string>): BenchOptions => {
  let full = false;
  let json = false;
  let record = false;
  let filter: RegExp | undefined;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]!;
    if (a === "--full") full = true;
    else if (a === "--json") json = true;
    else if (a === "--record") record = true;
    else if (a === "--filter") filter = new RegExp(argv[++i] ?? "");
    else if (a.startsWith("--filter=")) filter = new RegExp(a.slice(9));
    else if (a === "-h" || a === "--help") {
      console.log(
        "usage: bun run.ts [--full] [--json] [--record] [--filter <regex>]\n" +
          "  --full     mitata's default sampling budget (~0.6s CPU per case)\n" +
          "  --json     print results as JSON\n" +
          "  --record   write results/latest.json (committed; read by the website)\n" +
          "  --filter   only run cases whose 'provider/service/op/stage' matches",
      );
      process.exit(0);
    }
  }
  return { full, filter, json, record };
};

/**
 * mitata measurement budget. The quick profile keeps the whole suite (~80
 * cases) inside a couple of minutes; `--full` uses mitata's defaults.
 */
export const measureOptions = (opts: BenchOptions) =>
  opts.full
    ? {}
    : {
        // mitata's default is 642ms CPU per case.
        min_cpu_time: 120 * 1e6,
        min_samples: 8,
        warmup_samples: 2,
      };

//#endregion

//#region Mock HTTP

export interface CannedResponse {
  readonly status?: number;
  readonly headers?: Record<string, string>;
  readonly body?: string;
}

/**
 * An `HttpClient` whose transport is a closure over one canned response.
 * The transport does no I/O: it constructs a fresh web `Response` per call
 * (a real client would too) and hands it to Effect's response wrapper.
 */
export const mockHttpClient = (
  canned: CannedResponse,
): HttpClient.HttpClient => {
  const status = canned.status ?? 200;
  const headers = canned.headers ?? {};
  const body = canned.body ?? "";
  return HttpClient.make((request: HttpClientRequest.HttpClientRequest) =>
    Effect.succeed(
      HttpClientResponse.fromWeb(
        request,
        new Response(body, { status, headers }),
      ),
    ),
  );
};

export const mockHttpLayer = (
  canned: CannedResponse,
): Layer.Layer<HttpClient.HttpClient> =>
  Layer.succeed(HttpClient.HttpClient, mockHttpClient(canned));

//#endregion

//#region Cases

export type Stage =
  | "encode"
  | "decode"
  | "wire-decode"
  | "build"
  | "call"
  | "call-error";

export interface Case {
  readonly provider: "aws" | "cloudflare" | "baseline";
  readonly service: string;
  readonly op: string;
  readonly stage: Stage;
  /** Notes shown in the table (protocol, payload size, …). */
  readonly note?: string;
  /** Any setup that must happen before timing (memoised schema thunks, layer builds). */
  readonly setup?: () => Promise<void> | void;
  /** The timed function. Sync functions are timed as-is; async ones are awaited. */
  readonly fn: () => unknown;
}

export const caseName = (c: Case) =>
  `${c.provider}/${c.service}/${c.op}/${c.stage}`;

export interface Result {
  readonly name: string;
  readonly provider: Case["provider"];
  readonly service: string;
  readonly op: string;
  readonly stage: Stage;
  readonly note: string;
  /** nanoseconds */
  readonly avg: number;
  readonly p50: number;
  readonly p99: number;
  readonly min: number;
  readonly opsPerSec: number;
  readonly samples: number;
  readonly error?: string;
}

const toResult = (c: Case, s: MitataStats): Result => ({
  name: caseName(c),
  provider: c.provider,
  service: c.service,
  op: c.op,
  stage: c.stage,
  note: c.note ?? "",
  avg: s.avg,
  p50: s.p50,
  p99: s.p99,
  min: s.min,
  opsPerSec: 1e9 / s.avg,
  samples: s.samples.length,
});

export const runCases = async (
  cases: ReadonlyArray<Case>,
  opts: BenchOptions,
  onProgress?: (r: Result) => void,
): Promise<Result[]> => {
  const results: Result[] = [];
  const mo = measureOptions(opts);
  for (const c of cases) {
    const name = caseName(c);
    if (opts.filter && !opts.filter.test(name)) continue;
    try {
      await c.setup?.();
      // One untimed call surfaces setup/shape errors as a real stack trace
      // rather than a mitata "error" cell, and forces lazy schema thunks.
      await c.fn();
      const s = await measure(c.fn, mo);
      const r = toResult(c, s);
      results.push(r);
      onProgress?.(r);
    } catch (e) {
      const r: Result = {
        name,
        provider: c.provider,
        service: c.service,
        op: c.op,
        stage: c.stage,
        note: c.note ?? "",
        avg: NaN,
        p50: NaN,
        p99: NaN,
        min: NaN,
        opsPerSec: NaN,
        samples: 0,
        error: e instanceof Error ? `${e.name}: ${e.message}` : String(e),
      };
      results.push(r);
      onProgress?.(r);
    }
  }
  return results;
};

//#endregion

//#region Effect helpers

/**
 * Run an effect to completion synchronously. Every benchmarked pipeline is
 * synchronous in practice (the mock transport succeeds immediately, SigV4
 * signing is the one exception and is awaited via runPromise), so the sync
 * runner keeps event-loop scheduling out of the measurement.
 */
export const runSync = <A, E>(effect: Effect.Effect<A, E>): A =>
  Effect.runSync(effect);

export const runPromise = <A, E>(effect: Effect.Effect<A, E>): Promise<A> =>
  Effect.runPromise(effect);

/** Provide a prebuilt context to an operation call. */
export const withContext =
  <R>(ctx: Context.Context<R>) =>
  <A, E>(effect: Effect.Effect<A, E, R>): Effect.Effect<A, E> =>
    Effect.provideContext(effect, ctx);

/** Build a layer once (eagerly, outside the timed region). */
export const buildLayer = <R, E>(
  layer: Layer.Layer<R, E, never>,
): Promise<Context.Context<R>> =>
  Effect.runPromise(Effect.scoped(Layer.build(layer)));

/** Sync schema codecs, curried once per schema (mirrors what the protocols do). */
export const encoder = <S extends Schema.Top>(schema: S) =>
  Schema.encodeUnknownSync(schema as any) as (input: unknown) => unknown;
export const decoder = <S extends Schema.Top>(schema: S) =>
  Schema.decodeUnknownSync(schema as any) as (input: unknown) => unknown;

//#endregion

//#region Output

const fmtNs = (ns: number): string => {
  if (!Number.isFinite(ns)) return "—";
  if (ns < 1e3) return `${ns.toFixed(0)} ns`;
  if (ns < 1e6) return `${(ns / 1e3).toFixed(2)} µs`;
  if (ns < 1e9) return `${(ns / 1e6).toFixed(2)} ms`;
  return `${(ns / 1e9).toFixed(2)} s`;
};

const fmtOps = (ops: number): string => {
  if (!Number.isFinite(ops)) return "—";
  if (ops >= 1e6) return `${(ops / 1e6).toFixed(2)}M`;
  if (ops >= 1e3) return `${(ops / 1e3).toFixed(1)}k`;
  return ops.toFixed(0);
};

const pad = (s: string, n: number, right = false) =>
  right ? s.padStart(n) : s.padEnd(n);

export const printTable = (results: ReadonlyArray<Result>): void => {
  const rows = results.map((r) => ({
    case: r.error ? `${r.name}  !! ${r.error}` : r.name,
    note: r.note,
    ops: fmtOps(r.opsPerSec),
    p50: fmtNs(r.p50),
    p99: fmtNs(r.p99),
    avg: fmtNs(r.avg),
    n: String(r.samples),
  }));
  const w = {
    case: Math.max(4, ...rows.map((r) => r.case.length)),
    note: Math.max(4, ...rows.map((r) => r.note.length)),
    ops: Math.max(7, ...rows.map((r) => r.ops.length)),
    p50: Math.max(3, ...rows.map((r) => r.p50.length)),
    p99: Math.max(3, ...rows.map((r) => r.p99.length)),
    avg: Math.max(3, ...rows.map((r) => r.avg.length)),
    n: Math.max(1, ...rows.map((r) => r.n.length)),
  };
  const line = (r: (typeof rows)[number]) =>
    [
      pad(r.case, w.case),
      pad(r.note, w.note),
      pad(r.ops, w.ops, true),
      pad(r.p50, w.p50, true),
      pad(r.p99, w.p99, true),
      pad(r.avg, w.avg, true),
      pad(r.n, w.n, true),
    ].join("  ");
  console.log(
    line({
      case: "case",
      note: "note",
      ops: "ops/sec",
      p50: "p50",
      p99: "p99",
      avg: "avg",
      n: "n",
    }),
  );
  console.log(
    "-".repeat(w.case + w.note + w.ops + w.p50 + w.p99 + w.avg + w.n + 12),
  );
  let lastProvider: string | undefined;
  for (let i = 0; i < rows.length; i++) {
    const r = results[i]!;
    if (lastProvider !== undefined && r.provider !== lastProvider)
      console.log("");
    lastProvider = r.provider;
    console.log(line(rows[i]!));
  }
};

//#endregion
