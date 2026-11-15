/**
 * The catalogue of per-SDK metrics a run records. Written into every run
 * file so a dashboard can list what exists without knowing this code.
 */
export interface Metric {
  readonly id: string;
  readonly suite: "size" | "bundle" | "runtime" | "memory" | "typecheck";
  readonly label: string;
  /** Dotted path into a run's `sdks[pkg]` record. */
  readonly path: string;
  readonly unit: "bytes" | "ms" | "us" | "count" | "ratio";
  readonly description: string;
  /** Lower is better for every metric except where noted. */
  readonly higherIsBetter?: boolean;
  /** Dotted path into a run's `baselines` record, when a baseline applies. */
  readonly baseline?: string;
}

const LENIENT: ReadonlyArray<Metric> = [
  // size
  {
    id: "size.tarball",
    suite: "size",
    label: "Download (tarball)",
    path: "size.tarball",
    unit: "bytes",
    description:
      "Gzipped tarball `npm pack` would publish: what `npm install` downloads for this package alone.",
  },
  {
    id: "size.tarballWithCore",
    suite: "size",
    label: "Download with core",
    path: "size.tarballWithCore",
    unit: "bytes",
    description:
      "Gzipped tarball of the SDK plus @distilled.cloud/core: everything distilled publishes that `npm install` downloads for this provider (effect not included).",
  },
  {
    id: "size.unpacked",
    suite: "size",
    label: "Unpacked on disk",
    path: "size.unpacked",
    unit: "bytes",
    description: "Unpacked size of the published files (src + lib JS + .d.ts + maps).",
  },
  {
    id: "size.install",
    suite: "size",
    label: "Install footprint",
    path: "size.installBytes",
    unit: "bytes",
    description:
      "Unpacked SDK + @distilled.cloud/core + effect: disk cost of adding the SDK to a project with no other deps.",
  },
  {
    id: "size.files",
    suite: "size",
    label: "Published files",
    path: "size.files",
    unit: "count",
    description: "Number of files in the tarball.",
  },
  {
    id: "size.js",
    suite: "size",
    label: "lib JS",
    path: "size.jsBytes",
    unit: "bytes",
    description: "Compiled JavaScript in lib/ (excluding maps).",
  },
  {
    id: "size.dts",
    suite: "size",
    label: "Declarations",
    path: "size.dtsBytes",
    unit: "bytes",
    description: ".d.ts bytes the consumer's type checker may read.",
  },
  {
    id: "size.maps",
    suite: "size",
    label: "Source maps",
    path: "size.mapBytes",
    unit: "bytes",
    description: ".map bytes published (dead weight for most consumers).",
  },
  {
    id: "size.generatedLines",
    suite: "size",
    label: "Generated LOC",
    path: "size.generatedLines",
    unit: "count",
    description: "Lines in src/services (generated code).",
  },
  {
    id: "size.operations",
    suite: "size",
    label: "Operations",
    path: "size.operations",
    unit: "count",
    description: "Operations the SDK exposes (static count).",
    higherIsBetter: true,
  },
  {
    id: "size.protocols",
    suite: "size",
    label: "Protocols",
    path: "protocolCount",
    unit: "count",
    description:
      "Protocols the SDK's operations use: distinct `protocol:` layers, and for AWS each wire family. Each one gets its own 1 auth + 1 op program (see the SDK page).",
  },
  {
    id: "size.bytesPerOp",
    suite: "size",
    label: "Tarball bytes / op",
    path: "size.bytesPerOp",
    unit: "bytes",
    description: "Download size divided by operation count.",
  },

  // bundle
  {
    id: "bundle.gzip",
    suite: "bundle",
    label: "1 auth + 1 op (gzip)",
    path: "bundle.gzip",
    unit: "bytes",
    description:
      "Minified + gzip -9 rolldown bundle of a program that builds the credentials layer, provides FetchHttpClient and runs one operation.",
    baseline: "bundle.effect-http.gzip",
  },
  {
    id: "bundle.bytes",
    suite: "bundle",
    label: "1 auth + 1 op (min)",
    path: "bundle.bytes",
    unit: "bytes",
    description: "Same bundle, minified, uncompressed.",
    baseline: "bundle.effect-http.bytes",
  },
  {
    id: "bundle.brotli",
    suite: "bundle",
    label: "1 auth + 1 op (brotli)",
    path: "bundle.brotli",
    unit: "bytes",
    description: "Same bundle, brotli.",
  },
  {
    id: "bundle.overheadGzip",
    suite: "bundle",
    label: "Distilled overhead (gzip)",
    path: "bundle.overheadGzip",
    unit: "bytes",
    description: "SDK bundle gzip minus the hand-written Effect equivalent (effect-http baseline).",
  },
  {
    id: "bundle.sdkRendered",
    suite: "bundle",
    label: "SDK code in bundle",
    path: "bundle.composition.sdk",
    unit: "bytes",
    description: "Rendered bytes (post tree-shake, pre-minify) from the SDK package itself.",
  },
  {
    id: "bundle.coreRendered",
    suite: "bundle",
    label: "core in bundle",
    path: "bundle.composition.core",
    unit: "bytes",
    description: "Rendered bytes from @distilled.cloud/core.",
  },
  {
    id: "bundle.effectRendered",
    suite: "bundle",
    label: "effect in bundle",
    path: "bundle.composition.effect",
    unit: "bytes",
    description: "Rendered bytes from effect.",
  },
  {
    id: "bundle.modules",
    suite: "bundle",
    label: "Modules",
    path: "bundle.modules",
    unit: "count",
    description: "Modules in the bundle graph.",
  },
  {
    id: "bundle.buildMs",
    suite: "bundle",
    label: "Bundle time",
    path: "bundle.buildMs",
    unit: "ms",
    description: "rolldown build + write wall time (warm process, parallel builds; noisy).",
  },

  // runtime
  {
    id: "runtime.addedP50",
    suite: "runtime",
    label: "Added latency p50",
    path: "runtime.addedP50Us",
    unit: "us",
    description:
      "Per-call p50 of the operation on an in-memory transport minus a bare HttpClient roundtrip on the same transport: what distilled adds to every request.",
  },
  {
    id: "runtime.p50",
    suite: "runtime",
    label: "Call p50",
    path: "runtime.latency.p50Us",
    unit: "us",
    description:
      "Warm per-call p50: build request, credentials, sign, send (mock), parse, lenient decode.",
  },
  {
    id: "runtime.p99",
    suite: "runtime",
    label: "Call p99",
    path: "runtime.latency.p99Us",
    unit: "us",
    description: "Warm per-call p99.",
  },
  {
    id: "runtime.strictP50",
    suite: "runtime",
    label: "Strict call p50",
    path: "runtime.strict.latency.p50Us",
    unit: "us",
    description: "Per-call p50 with ResponseValidation.strict (schema decode of the response).",
  },
  {
    id: "runtime.firstCall",
    suite: "runtime",
    label: "First call",
    path: "runtime.firstCallMs",
    unit: "ms",
    description: "Cold first call after import (lazy schema construction, protocol setup).",
  },
  {
    id: "runtime.importOp",
    suite: "runtime",
    label: "Import (1 op)",
    path: "runtime.importMs",
    unit: "ms",
    description:
      "Time to import the credentials + one service module from lib/ after effect is loaded.",
  },
  {
    id: "runtime.importBarrel",
    suite: "runtime",
    label: "Import (root)",
    path: "barrel.importMs",
    unit: "ms",
    description:
      "Time to import the package root lib/index.js after effect is loaded (fresh process).",
  },
  {
    id: "runtime.importProvider",
    suite: "runtime",
    label: "Import (all services)",
    path: "provider.importMs",
    unit: "ms",
    description:
      "Time to import every service module the provider publishes (lib/services/*.js) in one fresh process, after effect is loaded.",
  },
  {
    id: "runtime.importServiceMedian",
    suite: "runtime",
    label: "Import (1 service, median)",
    path: "provider.serviceImportMedianMs",
    unit: "ms",
    description:
      "Median over the provider's services of the time to import one service module alone (fresh process each, effect loaded). Every service is under `services.<name>.importMs`.",
  },
  {
    id: "runtime.importServiceMax",
    suite: "runtime",
    label: "Import (1 service, slowest)",
    path: "provider.serviceImportMaxMs",
    unit: "ms",
    description: "Slowest single-service import of the provider.",
  },
  {
    id: "runtime.gcPer1k",
    suite: "runtime",
    label: "GCs / 1k calls",
    path: "runtime.gcPer1k",
    unit: "count",
    description: "Garbage collections per 1,000 warm calls.",
  },

  // memory
  {
    id: "memory.importOpHeap",
    suite: "memory",
    label: "Heap (1 op)",
    path: "runtime.importHeap.heapUsed",
    unit: "bytes",
    description:
      "Retained V8 heap after importing credentials + one service module (after gc, effect already loaded).",
  },
  {
    id: "memory.importOpObjects",
    suite: "memory",
    label: "Objects (1 op)",
    path: "runtime.importObjects",
    unit: "count",
    description:
      "Live JS objects added by importing credentials + one service module (v8.queryObjects(Object) after gc: objects, arrays, functions, class instances; strings and null-prototype objects not counted).",
  },
  {
    id: "memory.firstCallObjects",
    suite: "memory",
    label: "Objects after 1st call",
    path: "runtime.firstCallObjects",
    unit: "count",
    description: "Live JS objects added by the first call (lazy schemas, caches).",
  },
  {
    id: "memory.firstCallHeap",
    suite: "memory",
    label: "Heap after 1st call",
    path: "runtime.firstCallHeap.heapUsed",
    unit: "bytes",
    description: "Retained heap added by the first call (lazy schemas, caches).",
  },
  {
    id: "memory.barrelHeap",
    suite: "memory",
    label: "Heap (root import)",
    path: "barrel.heap.heapUsed",
    unit: "bytes",
    description: "Retained heap after importing the package root (fresh process, after gc).",
  },
  {
    id: "memory.barrelObjects",
    suite: "memory",
    label: "Objects (root import)",
    path: "barrel.objects",
    unit: "count",
    description: "Live JS objects added by importing the package root.",
  },
  {
    id: "memory.providerHeap",
    suite: "memory",
    label: "Heap (all services)",
    path: "provider.heap",
    unit: "bytes",
    description:
      "Retained heap after importing every service module of the provider in one fresh process (after gc, effect already loaded): the heap cost of the whole provider.",
  },
  {
    id: "memory.providerObjects",
    suite: "memory",
    label: "Objects (all services)",
    path: "provider.objects",
    unit: "count",
    description: "Live JS objects added by importing every service module of the provider.",
  },
  {
    id: "memory.barrelRss",
    suite: "memory",
    label: "RSS (root import)",
    path: "barrel.heap.rss",
    unit: "bytes",
    description: "RSS growth from importing the package root.",
  },
  {
    id: "memory.warmHeapGrowth",
    suite: "memory",
    label: "Heap growth while warming",
    path: "runtime.warmHeapGrowth",
    unit: "bytes",
    description:
      "Heap retained (after gc) across the latency series: caches that fill up during the first thousands of calls.",
  },
  {
    id: "memory.leakPer1k",
    suite: "memory",
    label: "Leak / 1k calls",
    path: "runtime.leakPer1k",
    unit: "bytes",
    description:
      "Heap retained per 1,000 calls over a further 3,000 calls once caches have settled. ~0 (± a few KB of gc noise) means no leak.",
  },
  {
    id: "memory.peakRss",
    suite: "memory",
    label: "Peak RSS (op probe)",
    path: "runtime.maxRss",
    unit: "bytes",
    description: "Peak RSS of the process that imports and calls one operation.",
  },

  // typecheck
  {
    id: "typecheck.wall",
    suite: "typecheck",
    label: "Consumer tsc",
    path: "typecheck.wallMs",
    unit: "ms",
    description:
      "`tsc --noEmit` wall time of the 1 auth + 1 op program against lib/*.d.ts (skipLibCheck).",
    baseline: "typecheck.wallMs",
  },
  {
    id: "typecheck.rss",
    suite: "typecheck",
    label: "Consumer tsc RSS",
    path: "typecheck.peakRss",
    unit: "bytes",
    description: "Peak RSS of that tsc run.",
  },
  {
    id: "typecheck.types",
    suite: "typecheck",
    label: "Types instantiated",
    path: "typecheck.types",
    unit: "count",
    description: "Types tsc created checking the program.",
  },
  {
    id: "typecheck.errors",
    suite: "typecheck",
    label: "Consumer type errors",
    path: "typecheck.errors",
    unit: "count",
    description: "Type errors in the uncast 1 auth + 1 op program (should be 0).",
  },
];

/**
 * The same program with `ResponseValidation.strict` provided (the program's
 * call piped through `Effect.provide(RV.strict)`): bundle, import, first
 * call, latency and memory of a caller that validates responses. Stored as
 * `strictBundle` / `strictRuntime` next to the lenient `bundle` / `runtime`.
 */
const STRICT_IDS = new Set([
  "bundle.gzip",
  "bundle.overheadGzip",
  "bundle.effectRendered",
  "runtime.addedP50",
  "runtime.p99",
  "runtime.firstCall",
  "runtime.importOp",
  "runtime.gcPer1k",
  "memory.importOpHeap",
  "memory.importOpObjects",
  "memory.firstCallHeap",
  "memory.firstCallObjects",
  "memory.warmHeapGrowth",
  "memory.leakPer1k",
  "memory.peakRss",
]);

const strictOf = (m: Metric): Metric => ({
  ...m,
  id: `strict.${m.id}`,
  label: `${m.label} (strict)`,
  path: m.path.replace(/^bundle\./, "strictBundle.").replace(/^runtime\./, "strictRuntime."),
  description: `${m.description} With ResponseValidation.strict provided.`,
});

export const METRICS: ReadonlyArray<Metric> = [
  // runtime.strictP50 is superseded by strict.runtime.addedP50 / p99.
  ...LENIENT.filter((m) => m.id !== "runtime.strictP50"),
  ...LENIENT.filter((m) => STRICT_IDS.has(m.id)).map(strictOf),
];
