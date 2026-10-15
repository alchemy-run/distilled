/**
 * Runtime probe: one fresh `node --expose-gc` process per SDK per mode.
 * Imports the published shape (`lib/*.js`, the default export condition),
 * never the network: the transport is a canned in-memory response and
 * `globalThis.fetch` throws.
 *
 *   baseline  effect import cost, Effect.runPromise and mock-HTTP roundtrip latency
 *   op        import the credentials + one service module, first call, warm calls,
 *             strict-mode call, retained heap and GC pressure per 1k calls
 *   barrel    import the package root (`lib/index.js`), or any list of modules
 *             (one service module, or every service module of a provider)
 *
 * With `objects: true`, op and barrel count live JS objects instead and return
 * nothing else. Counting forces extra GCs, and extra GCs let V8 flush the
 * bytecode of effect functions that ran once, which halves the measured
 * import heap. So objects are counted in their own process.
 *   discover  try operations × canned responses until one call succeeds
 *
 * Usage: node --expose-gc src/probe.ts '<ProbeRequest json>' — prints one JSON line.
 */
import { PerformanceObserver } from "node:perf_hooks";
import { queryObjects } from "node:v8";
import type { CannedResponse, ResolvedImport } from "./targets.ts";
import { EFFECT_HTTP } from "./util.ts";

export interface ProbeRequest {
  readonly mode: "baseline" | "op" | "barrel" | "discover" | "strictBody";
  readonly imports: ReadonlyArray<ResolvedImport>;
  readonly auth?: string;
  readonly call?: string;
  readonly env?: Record<string, string>;
  readonly response?: CannedResponse;
  /** discover: candidate calls (each with its own Op import) */
  readonly candidates?: ReadonlyArray<{
    readonly op: string;
    readonly call: string;
    readonly module: string;
  }>;
  readonly responses?: ReadonlyArray<CannedResponse>;
  /** Wall budget per latency series, ms. */
  readonly budgetMs?: number;
  readonly strictCore?: string;
  /** op/barrel: count live objects only (see the header). */
  readonly objects?: boolean;
  /** op mode: stop after the first call (cold-start timing pass). */
  readonly firstOnly?: boolean;
}

export interface MemorySnapshot {
  readonly rss: number;
  readonly heapUsed: number;
  readonly external: number;
}

export interface LatencyStats {
  readonly samples: number;
  readonly meanUs: number;
  readonly p50Us: number;
  readonly p90Us: number;
  readonly p99Us: number;
  readonly minUs: number;
}

globalThis.fetch = (() => {
  throw new Error("network is disabled in the SDK benchmarks");
}) as typeof fetch;

const gc = (globalThis as { gc?: () => void }).gc;
if (!gc) throw new Error("run with --expose-gc");

const snap = (): MemorySnapshot => {
  gc();
  gc();
  const m = process.memoryUsage();
  return { rss: m.rss, heapUsed: m.heapUsed, external: m.external + m.arrayBuffers };
};

/**
 * Live JS objects whose prototype chain reaches Object.prototype (plain
 * objects, arrays, functions, class instances), after gc. Strings, numbers,
 * null-prototype objects and V8-internal objects are not counted.
 */
const countObjects = (): number => {
  gc();
  gc();
  return queryObjects(Object, { format: "count" }) as number;
};

const diff = (a: MemorySnapshot, b: MemorySnapshot): MemorySnapshot => ({
  rss: b.rss - a.rss,
  heapUsed: b.heapUsed - a.heapUsed,
  external: b.external - a.external,
});

const now = () => performance.now();

const stats = (samplesNs: number[]): LatencyStats => {
  const sorted = [...samplesNs].sort((a, b) => a - b);
  const q = (p: number) =>
    sorted[Math.min(sorted.length - 1, Math.round(p * (sorted.length - 1)))]! / 1e3;
  return {
    samples: sorted.length,
    meanUs: sorted.reduce((s, x) => s + x, 0) / sorted.length / 1e3,
    p50Us: q(0.5),
    p90Us: q(0.9),
    p99Us: q(0.99),
    minUs: sorted[0]! / 1e3,
  };
};

/** Time an async thunk repeatedly: warm-up, then sample until budget or 20k samples. */
const series = async (fn: () => Promise<unknown>, budgetMs: number): Promise<LatencyStats> => {
  for (let i = 0; i < 200; i++) await fn();
  const samples: number[] = [];
  const deadline = now() + budgetMs;
  while (samples.length < 20_000 && (samples.length < 200 || now() < deadline)) {
    const t = process.hrtime.bigint();
    await fn();
    samples.push(Number(process.hrtime.bigint() - t));
  }
  return stats(samples);
};

const errorText = (e: unknown): string => {
  const s = e instanceof Error ? `${e.name}: ${e.message}` : String(e);
  return s.split("\n")[0]!.slice(0, 300);
};

const importAll = async (imports: ReadonlyArray<ResolvedImport>) => {
  const mods: Record<string, any> = {};
  for (const i of imports) mods[i.alias] = await import(i.lib);
  return mods;
};

const evalExpr = (expr: string, scope: Record<string, unknown>): any =>
  new Function(...Object.keys(scope), `return (${expr});`)(...Object.values(scope));

const main = async (req: ProbeRequest) => {
  const budgetMs = req.budgetMs ?? 1500;
  for (const [k, v] of Object.entries(req.env ?? {})) process.env[k] = v;

  const m0 = snap();
  const tEffect = now();
  const Effect = await import("effect/Effect");
  const Layer = await import("effect/Layer");
  const HttpClient = await import(`${EFFECT_HTTP}/HttpClient`);
  const HttpClientRequest = await import(`${EFFECT_HTTP}/HttpClientRequest`);
  const HttpClientResponse = await import(`${EFFECT_HTTP}/HttpClientResponse`);
  const effectImportMs = now() - tEffect;
  // Warm Node's fetch classes (undici Response/Headers), as official-probe.ts
  // does with its 200 baseline fetches before importing the SDK, so cold-start
  // numbers compare the SDKs and not who first touched undici.
  for (let i = 0; i < 200; i++)
    await new Response('{"warm":true}', { headers: { "content-type": "application/json" } }).text();
  const m1 = snap();

  const mockLayer = (canned: CannedResponse) =>
    Layer.succeed(
      HttpClient.HttpClient,
      HttpClient.make((request: any) =>
        Effect.succeed(
          HttpClientResponse.fromWeb(
            request,
            new Response(canned.status === 204 ? null : canned.body, {
              status: canned.status,
              headers: canned.headers,
            }),
          ),
        ),
      ),
    );

  const buildContext = (layer: any) => Effect.runPromise(Effect.scoped(Layer.build(layer)));
  const base = {
    effectImportMs,
    effectHeap: diff(m0, m1),
    nodeBaseline: m0,
  };

  if (req.mode === "baseline") {
    const canned = { status: 200, headers: { "content-type": "application/json" }, body: "{}" };
    const ctx = await buildContext(mockLayer(canned));
    const request = HttpClientRequest.get("https://bench.example.com/v1/thing");
    const roundtrip = Effect.gen(function* () {
      const client = yield* HttpClient.HttpClient;
      const response = yield* client.execute(request);
      return yield* response.json;
    }).pipe(Effect.provideContext(ctx as any));
    const one = Effect.succeed(1);
    return {
      ...base,
      runPromise: await series(() => Effect.runPromise(one), budgetMs),
      mockRoundtrip: await series(() => Effect.runPromise(roundtrip as any), budgetMs),
      maxRss: process.resourceUsage().maxRSS * 1024,
    };
  }

  if (req.objects && (req.mode === "barrel" || req.mode === "op")) {
    const o1 = countObjects();
    const mods = await importAll(req.imports);
    const o2 = countObjects();
    if (req.mode === "barrel") return { objects: o2 - o1 };
    const ctx = await buildContext(
      Layer.mergeAll(evalExpr(req.auth!, mods), mockLayer(req.response!)),
    );
    try {
      await Effect.runPromise(Effect.provideContext(evalExpr(req.call!, mods), ctx as any) as any);
    } catch (e) {
      return { importObjects: o2 - o1, error: errorText(e) };
    }
    return { importObjects: o2 - o1, firstCallObjects: countObjects() - o2 };
  }

  if (req.mode === "barrel") {
    const t = now();
    const mods = await importAll(req.imports);
    const importMs = now() - t;
    const m2 = snap();
    return {
      ...base,
      importMs,
      heap: diff(m1, m2),
      exports: Object.keys(mods.Barrel ?? {}).length,
      maxRss: process.resourceUsage().maxRSS * 1024,
    };
  }

  if (req.mode === "strictBody") {
    // A response body the operation accepts under ResponseValidation.strict:
    // a minimal value of the output schema (required members only), mapped to
    // wire names by the protocol's own key mapper, then checked by a strict call.
    const mods = await importAll(req.imports);
    const RV = await import(req.strictCore!);
    const SchemaAST = await import("effect/SchemaAST");
    const { mapKeys } = await import(
      req.strictCore!.replace(/response-validation\.js$/, "protocol-http.js")
    );
    const opName = /\bOp\.(\w+)\(/.exec(req.call!)?.[1];
    const op = opName ? (mods.Op as any)?.[opName] : undefined;
    if (!op?.output) return { ok: false, error: "no output schema" };
    const seen = new Set<unknown>();
    const sample = (ast: any, depth: number): unknown => {
      if (depth > 12) return undefined;
      switch (ast._tag) {
        case "Suspend":
          if (seen.has(ast)) return undefined;
          seen.add(ast);
          try {
            return sample(ast.thunk(), depth + 1);
          } finally {
            seen.delete(ast);
          }
        case "String":
        case "TemplateLiteral":
          return "x";
        case "Number":
          return 0;
        case "BigInt":
          return "0";
        case "Boolean":
          return false;
        case "Null":
          return null;
        case "Literal":
          return ast.literal;
        case "Enum":
          return ast.enums?.[0]?.[1];
        case "Unknown":
        case "Any":
          return {};
        case "Undefined":
        case "Void":
          return undefined;
        case "Arrays":
          return (ast.elements ?? []).map((e: any) => sample(e, depth + 1));
        case "Union": {
          for (const t of ast.types) {
            if (t._tag === "Undefined") continue;
            const v = sample(t, depth + 1);
            if (v !== undefined) return v;
          }
          return null;
        }
        case "Objects": {
          const out: Record<string, unknown> = {};
          for (const p of ast.propertySignatures ?? []) {
            if (p.type.context?.isOptional) continue;
            const v = sample(p.type, depth + 1);
            if (v !== undefined) out[String(p.name)] = v;
          }
          return out;
        }
        case "Declaration":
          return /date/i.test(
            String(ast.annotations?.identifier ?? ast.annotations?.expected ?? ""),
          )
            ? "2026-01-01T00:00:00.000Z"
            : "x";
        default:
          return undefined;
      }
    };
    const outputAst = op.output.ast;
    let value: unknown;
    try {
      value = sample(SchemaAST.toEncoded(outputAst), 0);
    } catch (e) {
      return { ok: false, error: `sample: ${errorText(e)}` };
    }
    const wire = (mapKeys(outputAst, value, "encode") ?? {}) as any;
    // Envelopes some protocols unwrap before validating: GraphQL `data`,
    // Slack-style `ok: true`, and the lenient body merged with the sample.
    let lenientBody: any = {};
    try {
      lenientBody = JSON.parse(req.response!.body);
    } catch {}
    const isObj = (v: unknown) => v !== null && typeof v === "object" && !Array.isArray(v);
    const bodies = [
      wire,
      { data: wire },
      isObj(wire) ? { ok: true, ...wire } : wire,
      isObj(wire) && isObj(lenientBody) ? { ...lenientBody, ...wire } : wire,
      isObj(lenientBody) && isObj(lenientBody.data)
        ? { ...lenientBody, data: { ...lenientBody.data, ...wire } }
        : wire,
    ];
    let lastError = "";
    for (const b of bodies) {
      const response = { ...req.response!, body: JSON.stringify(b) };
      try {
        const ctx = await buildContext(
          Layer.mergeAll(evalExpr(req.auth!, mods), mockLayer(response)),
        );
        await Effect.runPromise(
          Effect.provideContext(evalExpr(req.call!, mods), ctx as any).pipe(
            Effect.provide(RV.strict),
          ) as any,
        );
        return { ok: true, response };
      } catch (e) {
        lastError = `${lastError}${lastError ? " | " : ""}${errorText(e).slice(0, 80)}`;
      }
    }
    return { ok: false, error: lastError, body: JSON.stringify(wire).slice(0, 200) };
  }

  if (req.mode === "discover") {
    const fixed = await importAll(req.imports.filter((i) => i.alias !== "Op"));
    const tried: string[] = [];
    for (const c of req.candidates ?? []) {
      let Op: any;
      try {
        Op = await import(c.module);
      } catch (e) {
        tried.push(`${c.op}: import ${errorText(e)}`);
        continue;
      }
      for (const response of req.responses ?? []) {
        try {
          const ctx = await buildContext(
            Layer.mergeAll(evalExpr(req.auth!, { ...fixed, Op }), mockLayer(response)),
          );
          await Effect.runPromise(
            Effect.provideContext(evalExpr(c.call, { ...fixed, Op }), ctx as any) as any,
          );
          return { ok: true, op: c.op, response, tried };
        } catch (e) {
          tried.push(`${c.op} [${response.status} ${response.body.slice(0, 40)}]: ${errorText(e)}`);
        }
      }
    }
    return { ok: false, tried: tried.slice(0, 20) };
  }

  // mode === "op"
  const t = now();
  const mods = await importAll(req.imports);
  const importMs = now() - t;
  const m2 = snap();

  const authLayer = evalExpr(req.auth!, mods);
  const ctx = await buildContext(Layer.mergeAll(authLayer, mockLayer(req.response!)));
  const callOnce = () =>
    Effect.runPromise(Effect.provideContext(evalExpr(req.call!, mods), ctx as any) as any);

  let firstCallMs = NaN;
  let error: string | undefined;
  const tFirst = now();
  try {
    await callOnce();
    firstCallMs = now() - tFirst;
  } catch (e) {
    error = errorText(e);
  }
  if (req.firstOnly)
    return { importMs, firstCallMs, importHeap: diff(m1, m2), ...(error ? { error } : {}) };
  const m3 = snap();
  if (error) {
    return {
      ...base,
      importMs,
      importHeap: diff(m1, m2),
      error,
      maxRss: process.resourceUsage().maxRSS * 1024,
    };
  }

  const secondStart = now();
  await callOnce();
  const secondCallMs = now() - secondStart;

  let gcCount = 0;
  let gcMs = 0;
  const obs = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      gcCount++;
      gcMs += entry.duration;
    }
  });
  obs.observe({ entryTypes: ["gc"] });
  const before = snap();
  const latency = await series(callOnce, budgetMs);
  const calls = latency.samples + 200;
  // let the observer flush
  await new Promise((r) => setTimeout(r, 20));
  obs.disconnect();
  const after = snap();

  // Leak check: heap after another fixed batch of calls, once caches have
  // settled in the series above. Bounded caches read ~0; a leak reads as
  // bytes kept per call.
  const LEAK_CALLS = 3000;
  for (let i = 0; i < LEAK_CALLS; i++) await callOnce();
  const afterLeak = snap();

  // Mock roundtrip in the same process, for "added latency".
  const request = HttpClientRequest.get("https://bench.example.com/v1/thing");
  const roundtrip = Effect.gen(function* () {
    const client = yield* HttpClient.HttpClient;
    const response = yield* client.execute(request);
    return yield* response.text;
  }).pipe(Effect.provideContext(ctx as any));
  const baselineLatency = await series(
    () => Effect.runPromise(roundtrip as any),
    Math.min(budgetMs, 600),
  );

  let strict: { ok: boolean; error?: string; latency?: LatencyStats } = { ok: false };
  if (req.strictCore) {
    const RV = await import(req.strictCore);
    const strictOnce = () =>
      Effect.runPromise(
        Effect.provideContext(evalExpr(req.call!, mods), ctx as any).pipe(
          Effect.provide(RV.strict),
        ) as any,
      );
    try {
      await strictOnce();
      strict = { ok: true, latency: await series(strictOnce, Math.min(budgetMs, 800)) };
    } catch (e) {
      strict = { ok: false, error: errorText(e) };
    }
  }

  return {
    ...base,
    importMs,
    importHeap: diff(m1, m2),
    firstCallMs,
    secondCallMs,
    firstCallHeap: diff(m2, m3),
    latency,
    baselineLatency,
    addedP50Us: latency.p50Us - baselineLatency.p50Us,
    gcPer1k: (gcCount / calls) * 1000,
    gcMsPer1k: (gcMs / calls) * 1000,
    warmHeapGrowth: after.heapUsed - before.heapUsed,
    leakPer1k: ((afterLeak.heapUsed - after.heapUsed) / LEAK_CALLS) * 1000,
    strict,
    maxRss: process.resourceUsage().maxRSS * 1024,
  };
};

const req = JSON.parse(process.argv[2] ?? "{}") as ProbeRequest;
main(req).then(
  (out) => {
    process.stdout.write(`${JSON.stringify(out)}\n`);
    process.exit(0);
  },
  (e) => {
    process.stdout.write(`${JSON.stringify({ fatal: errorText(e) })}\n`);
    process.exit(0);
  },
);
