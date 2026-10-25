/**
 * Re-bundle each package's `lib/*.js` so a program loads a handful of ES
 * modules instead of one per source file (run after `tsc -b`; `pnpm build`
 * does). Every ES module costs ~5 KB of heap whatever its size, and a Resend
 * program used to load 21 of them.
 *
 * Bundles are built with rolldown from `src/` (not from tsc's output, so the
 * step is idempotent when `tsc -b` has nothing to re-emit). The `.d.ts` files
 * stay as tsc wrote them.
 *
 * Layout of a package's `lib/` afterwards:
 *
 *   _bundle/<group>.js  one chunk per group of small modules (core: base, rest,
 *                       aws, ...; an SDK: one `sdk` group with its credentials,
 *                       errors, traits, ...). Exports are named `<module>$<name>`.
 *   <module>.js         every public module of a group: a one-line facade that
 *                       re-exports from its group chunk.
 *   index.js, services/*.js
 *                       real entry chunks; they import the group chunks directly.
 *   _chunks/*.js        lazily imported code (AWS protocols, credential providers).
 *   services.lazy/*.js  lazy stubs of the service entry chunks, which a Node
 *                       process opts in to with the `distilled-lazy`
 *                       condition (see lazy-services.ts); every other
 *                       condition resolves services/*.js.
 *
 * SDK chunks import core through `@distilled.cloud/core/_bundle/<group>`, never
 * through core's facades. Each source module lands in exactly one chunk, so
 * classes, tags and `instanceof` keep a single identity across entry points.
 *
 * Grouping rule: a group's modules must share one chunk, i.e. be reached by the
 * same set of entries. Every module that imports a module of group G from
 * outside G also imports G's virtual entry, which reaches all of G. The build
 * fails if a group still splits.
 *
 * Memory: one rolldown graph holds every module it bundles, so the groups and
 * the other entries build first, then each service in a build of its own
 * (several at once, within BATCH_BYTES of source), and every SDK package in a
 * process of its own. Building every package peaks at about the largest
 * service plus its package's groups instead of all of them.
 *
 *   node scripts/bundle-lib.ts [packages/<pkg> ...]   (core is always rebuilt)
 */
// Before rolldown loads: its allocator reads its settings at load.
import "./bundle-lib-memory.ts";
import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, isAbsolute, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import {
  type InputOptions,
  type OutputOptions,
  type Plugin,
  rolldown,
  RUNTIME_MODULE_ID,
} from "rolldown";
import { parseAst } from "rolldown/parseAst";
import { datafyOperations } from "../packages/core/src/codegen/datafy.ts";
import { lazyExports, lazyServices, stubTargets } from "./lazy-services.ts";

const ROOT = join(import.meta.dirname, "..");

/** Core modules by group, in load order. Modules not listed are entries of their own. */
const CORE_GROUPS: Record<string, string[]> = {
  // Loaded by every program.
  base: [
    "api",
    "category",
    "config",
    "pagination",
    "retry",
    "trait",
    "response-validation",
    "response-validation-strict",
    "schema-lite-impl",
  ],
  // REST/JSON SDKs (everything but AWS).
  rest: [
    "errors",
    "schema-lite",
    "error-category",
    "debug",
    "protocol-http",
    "protocol-rest",
    "retry-after",
  ],
  // AWS: real Effect Schema, lazy schema tables, SigV4 crypto.
  aws: ["schema", "chunks", "crypto"],
  xml: ["xml"],
  graphql: ["graphql", "query", "graphql.types"],
};
const SDK_GROUP = "sdk";
const VIRTUAL = "distilled-bundle:";
const CORE_VIRTUAL = "\0distilled-core:";
/** A grouped core module, in a service's build: aliases re-exported by the SDK group chunk. */
const CORE_REF = "\0distilled-core-ref:";
/** A grouped module, in a service's build: re-exports of the built group chunk. */
const GROUP_REF = "\0distilled-group:";

interface Plan {
  readonly name: string;
  readonly dir: string;
  /** group -> public modules (src-relative, no extension) */
  readonly groups: Map<string, string[]>;
  /** public modules that are real entry chunks */
  readonly direct: string[];
  /** public modules grouped only if a group already reaches them, else direct */
  readonly deep: string[];
  /** directories of generated service modules (`./*`, `./unstable/*` exports) */
  readonly serviceDirs: string[];
  /** lib paths (relative to lib/) that must not be touched */
  readonly keep: (rel: string) => boolean;
}

interface Built {
  /** module -> group */
  readonly groupOf: Map<string, string>;
  /** public grouped module -> export names */
  readonly exportsOf: Map<string, string[]>;
}

const walk = (dir: string, out: string[] = []): string[] => {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
};

const rel = (from: string, to: string) => relative(from, to).split("\\").join("/");

/** Whether `file` lies inside `dir` (either separator, so module ids work on Windows). */
const inside = (dir: string, file: string) => {
  const r = relative(dir, file);
  return r !== "" && !r.startsWith("..") && !isAbsolute(r);
};
const noExt = (p: string) => p.replace(/\.(ts|js|json)$/, "");
const ident = (m: string) => m.replace(/[^A-Za-z0-9_$]/g, "_");
const exportName = (m: string, e: string) => `${ident(m)}$${e}`;
const isSource = (p: string) =>
  p.endsWith(".ts") && !p.endsWith(".test.ts") && !p.endsWith(".d.ts");

//#region plans

const corePlan = (): Plan => {
  const dir = join(ROOT, "packages", "core");
  const src = join(dir, "src");
  const all = walk(src)
    .map((p) => rel(src, p))
    .filter((p) => isSource(p) && !p.startsWith("codegen/") && !p.startsWith("fixtures/"))
    .map(noExt);
  const grouped = new Set(Object.values(CORE_GROUPS).flat());
  for (const m of grouped)
    if (!all.includes(m)) throw new Error(`core group lists missing module ${m}`);
  return {
    name: "core",
    dir,
    groups: new Map(Object.entries(CORE_GROUPS)),
    direct: all.filter((m) => !grouped.has(m)),
    deep: [],
    serviceDirs: [],
    // codegen runs from src (bun condition); its tsc output is left alone.
    keep: (p) => p.startsWith("codegen/") || p.startsWith("fixtures/"),
  };
};

const exportTargets = (value: unknown, out: string[] = []): string[] => {
  if (typeof value === "string") out.push(value);
  else if (value && typeof value === "object")
    for (const [k, v] of Object.entries(value)) if (k !== "types") exportTargets(v, out);
  return out;
};

/** Short export names in order: a, b, ..., _, aa, ba, ... (no `$`, so no clash with `<module>$<name>`). */
const SHORT_NAMES: string[] = [];
const shortName = (i: number): string => {
  const first = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_";
  const rest = `${first}0123456789`;
  for (let n = SHORT_NAMES.length; SHORT_NAMES.length <= i; n++) {
    let name = first[n % first.length]!;
    for (let k = Math.floor(n / first.length); k > 0; k = Math.floor((k - 1) / rest.length))
      name += rest[(k - 1) % rest.length]!;
    if (!["do", "if", "in"].includes(name)) SHORT_NAMES.push(name);
  }
  return SHORT_NAMES[i]!;
};

const isService = (plan: Plan, m: string) => plan.serviceDirs.some((d) => m.startsWith(`${d}/`));

const sdkPlan = (dir: string): Plan | undefined => {
  const pkg = JSON.parse(readFileSync(join(dir, "package.json"), "utf8"));
  if (!pkg.exports || !existsSync(join(dir, "src"))) return undefined;
  const src = join(dir, "src");
  const publicMods = new Set<string>();
  const serviceDirs = new Set<string>();
  for (const [key, value] of Object.entries(pkg.exports)) {
    if (key.includes("*")) {
      for (const t of exportTargets(value)) {
        const m = /^\.\/lib\/(.+)\/\*\.js$/.exec(t);
        if (m && existsSync(join(src, m[1]!))) serviceDirs.add(m[1]!);
      }
      continue;
    }
    for (const t of exportTargets(value)) {
      const m = /^\.\/lib\/(.+)\.js$/.exec(t);
      if (m && existsSync(join(src, `${m[1]}.ts`))) publicMods.add(m[1]!);
    }
  }
  const services = [...serviceDirs].flatMap((d) =>
    walk(join(src, d))
      .map((p) => rel(src, p))
      .filter(isSource)
      .map(noExt),
  );
  const inServiceDir = (m: string) => [...serviceDirs].some((d) => m.startsWith(`${d}/`));
  const direct = [...publicMods].filter((m) => m === "index" || m.startsWith("index."));
  // The group is what a program (credentials + one service) loads anyway:
  // credentials and every module a service imports, with their static
  // dependencies. Other public modules (`./Auth`, `./protocols/rest-xml`, ...)
  // join the group only if it already reaches them; otherwise they are entries
  // of their own, so lazily imported code (AWS protocols, credential
  // providers) stays lazy.
  const roots = new Set<string>(publicMods.has("credentials") ? ["credentials"] : []);
  for (const s of services)
    for (const m of readFileSync(join(src, `${s}.ts`), "utf8").matchAll(
      /^(?:import|export)[^;]*? from "(\.[^"]+)";/gm,
    )) {
      const target = noExt(rel(src, join(src, dirname(s), m[1]!)));
      if (!inServiceDir(target)) roots.add(target);
    }
  const group = [...roots];
  const deep = [...publicMods].filter(
    (m) => !direct.includes(m) && !roots.has(m) && !inServiceDir(m),
  );
  return {
    name: pkg.name.replace("@distilled.cloud/", ""),
    dir,
    groups: new Map([[SDK_GROUP, group]]),
    direct: [...direct, ...services],
    deep,
    serviceDirs: [...serviceDirs],
    keep: () => false,
  };
};

//#endregion

//#region static import graph (non-service sources only)

interface Imports {
  readonly static: string[];
  readonly dynamic: string[];
}

const importsOf = (file: string): Imports => {
  const code = readFileSync(file, "utf8");
  const ast = parseAst(code, { sourceType: "module", lang: "ts" }, file);
  const out: string[] = [];
  const dynamic: string[] = [];
  const visit = (node: any): void => {
    if (Array.isArray(node)) return node.forEach(visit);
    if (!node || typeof node !== "object") return;
    if (node.type === "ImportExpression" && typeof node.source?.value === "string")
      dynamic.push(node.source.value);
    for (const k in node)
      if (k !== "type" && node[k] && typeof node[k] === "object") visit(node[k]);
  };
  if (code.includes("import(")) visit(ast);
  for (const node of ast.body) {
    if (
      node.type !== "ImportDeclaration" &&
      node.type !== "ExportNamedDeclaration" &&
      node.type !== "ExportAllDeclaration"
    )
      continue;
    const src = node.source?.value;
    if (typeof src !== "string" || !src.startsWith(".")) continue;
    if (node.type === "ImportDeclaration") {
      if (node.importKind === "type") continue;
      const specs = node.specifiers ?? [];
      if (specs.length > 0 && specs.every((s: any) => s.importKind === "type")) continue;
    } else {
      if (node.exportKind === "type") continue;
      const specs = node.type === "ExportNamedDeclaration" ? node.specifiers : [];
      if (specs.length > 0 && specs.every((s) => s.exportKind === "type")) continue;
    }
    out.push(src);
  }
  return { static: out, dynamic: dynamic.filter((d) => d.startsWith(".")) };
};

const graphOf = (plan: Plan): Map<string, Imports> => {
  const src = join(plan.dir, "src");
  const graph = new Map<string, Imports>();
  for (const file of walk(src)) {
    const r = rel(src, file);
    if (!isSource(r) || isService(plan, r) || r.startsWith("codegen/")) continue;
    const m = noExt(r);
    const i = importsOf(file);
    const local = (s: string) => noExt(rel(src, join(dirname(file), s)));
    graph.set(m, { static: i.static.map(local), dynamic: i.dynamic.map(local) });
  }
  return graph;
};

const assignGroups = (plan: Plan, graph: Map<string, Imports>): Map<string, string> => {
  const groupOf = new Map<string, string>();
  const direct = new Set(plan.direct);
  for (const [g, mods] of plan.groups) {
    const stack = [...mods];
    while (stack.length) {
      const m = stack.pop()!;
      if (groupOf.has(m) || (direct.has(m) && !mods.includes(m))) continue;
      groupOf.set(m, g);
      for (const d of graph.get(m)?.static ?? []) stack.push(d);
    }
  }
  return groupOf;
};

/**
 * A barrel (`index.ts`, `services/index.ts`) only re-exports. Bundled, it
 * would make rolldown synthesize a namespace object (one getter per export)
 * inside every service chunk it re-exports `* as`. Emitted as plain ESM
 * re-exports of the public files, its namespaces stay native and free.
 */
const barrelOf = (src: string, file: string): { code: string; targets: string[] } | undefined => {
  const ast = parseAst(readFileSync(file, "utf8"), { sourceType: "module", lang: "ts" }, file);
  const name = (n: any) => (n.type === "Identifier" ? n.name : JSON.stringify(n.value));
  const lines: string[] = [];
  const targets: string[] = [];
  const spec = (s: string) => {
    if (!s.startsWith(".")) return s;
    targets.push(noExt(rel(src, join(dirname(file), s))));
    return s.replace(/\.ts$/, ".js");
  };
  for (const n of ast.body) {
    if (
      ("exportKind" in n && n.exportKind === "type") ||
      ("importKind" in n && n.importKind === "type")
    )
      continue;
    if (n.type === "ExportAllDeclaration") {
      lines.push(
        `export * ${n.exported ? `as ${name(n.exported)} ` : ""}from "${spec(n.source.value)}";`,
      );
    } else if (n.type === "ExportNamedDeclaration" && n.source) {
      const specs = n.specifiers.filter((s: any) => s.exportKind !== "type");
      if (specs.length === 0) continue;
      const list = specs.map((s: any) =>
        name(s.local) === name(s.exported)
          ? name(s.local)
          : `${name(s.local)} as ${name(s.exported)}`,
      );
      lines.push(`export { ${list.join(", ")} } from "${spec(n.source.value)}";`);
    } else if (
      n.type === "TSInterfaceDeclaration" ||
      n.type === "TSTypeAliasDeclaration" ||
      (n.type === "ExportNamedDeclaration" && n.declaration && /^TS/.test(n.declaration.type))
    ) {
      continue;
    } else return undefined;
  }
  return { code: lines.join("\n") + "\n", targets };
};

//#endregion

//#region rolldown

/**
 * Source bytes of the services that build at once (see buildPackage): what
 * bounds bundle-lib's memory. Lower trades time for memory; a service larger
 * than this builds alone.
 */
const BATCH_BYTES = Number(process.env.BUNDLE_LIB_BATCH_BYTES ?? 8 * 1024 * 1024);

const COMMON_INPUT = {
  logLevel: "warn",
  treeshake: { moduleSideEffects: true },
  // Same tsconfig semantics as tsc: ESNext target, define class fields.
  transform: { target: "esnext" },
} satisfies InputOptions;

const external = (id: string) =>
  !id.startsWith(".") &&
  !isAbsolute(id) &&
  !id.startsWith("\0") &&
  !id.startsWith(VIRTUAL) &&
  !id.startsWith("@distilled.cloud/core");

/** SDK builds: route `@distilled.cloud/core/<m>` straight to core's group chunks. */
const corePlugin = (core: Plan, built: Built) => ({
  name: "distilled-core",
  resolveId(source: string) {
    if (source.startsWith("@distilled.cloud/core/_bundle/")) return { id: source, external: true };
    if (source !== "@distilled.cloud/core" && !source.startsWith("@distilled.cloud/core/")) return;
    const m =
      source === "@distilled.cloud/core" ? "index" : source.slice("@distilled.cloud/core/".length);
    if (built.exportsOf.has(m)) return CORE_VIRTUAL + m;
    if (core.direct.includes(m)) return { id: source, external: true };
    throw new Error(`unknown core module ${source}`);
  },
  load(id: string) {
    if (!id.startsWith(CORE_VIRTUAL)) return;
    const m = id.slice(CORE_VIRTUAL.length);
    const names = built.exportsOf.get(m)!;
    if (names.length === 0) return "export {};";
    const g = built.groupOf.get(m)!;
    return `export { ${names.map((e) => `${exportName(m, e)} as ${e}`).join(", ")} } from "@distilled.cloud/core/_bundle/${g}";`;
  },
});

/** Export names of every grouped public module (one in-memory build). */
const exportNames = async (plan: Plan, plugins: Plugin[]): Promise<Map<string, string[]>> => {
  const mods = [...plan.groups.values()].flat();
  const out = new Map<string, string[]>();
  if (mods.length === 0) return out;
  const bundle = await rolldown({
    ...COMMON_INPUT,
    input: Object.fromEntries(mods.map((m) => [m, join(plan.dir, "src", `${m}.ts`)])),
    external,
    plugins,
    preserveEntrySignatures: "strict",
  });
  const { output } = await bundle.generate({ format: "es" });
  await bundle.close();
  for (const c of output)
    if (c.type === "chunk" && c.isEntry) out.set(c.name, [...c.exports].sort());
  for (const m of mods) if (!out.has(m)) throw new Error(`${plan.name}: no entry chunk for ${m}`);
  return out;
};

//#region PURE annotations through minification

const PURE = "/*@__PURE__*/";
const B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

/** Call and `new` expressions in pre-order, with whether a PURE annotation precedes each. */
const calls = (code: string): { start: number; pure: boolean }[] => {
  const out: { start: number; pure: boolean }[] = [];
  const visit = (node: any): void => {
    if (Array.isArray(node)) return node.forEach(visit);
    if (!node || typeof node !== "object") return;
    if (node.type === "CallExpression" || node.type === "NewExpression") {
      const before = code.slice(Math.max(0, node.start - 20), node.start).trimEnd();
      out.push({ start: node.start, pure: /\/\*\s*[@#]__PURE__\s*\*\/$/.test(before) });
    }
    for (const k in node)
      if (k !== "type" && node[k] && typeof node[k] === "object") visit(node[k]);
  };
  visit(parseAst(code, { sourceType: "module" }, "chunk.js"));
  return out;
};

const vlqDecode = (s: string): number[] => {
  const out: number[] = [];
  let shift = 0;
  let value = 0;
  for (const ch of s) {
    const d = B64.indexOf(ch);
    value += (d & 31) << shift;
    if (d & 32) shift += 5;
    else {
      out.push(value & 1 ? -(value >>> 1) : value >>> 1);
      shift = 0;
      value = 0;
    }
  }
  return out;
};

const vlqEncode = (values: number[]): string =>
  values
    .map((v) => {
      let x = v < 0 ? (-v << 1) | 1 : v << 1;
      let out = "";
      do {
        let d = x & 31;
        x >>>= 5;
        if (x) d |= 32;
        out += B64[d];
      } while (x);
      return out;
    })
    .join("");

/**
 * The minifier drops comments, PURE annotations included, and consumers that
 * bundle `lib/` need them to tree-shake (`const op = make(...)`). With
 * `compress: false` the minified chunk has the same AST as the readable one,
 * so the k-th call carries the k-th call's annotation. Returns the new code;
 * shifts the source map's generated columns to match.
 */
const reannotate = (pretty: string, min: string, map: any): string => {
  const a = calls(pretty);
  const b = calls(min);
  if (a.length !== b.length)
    throw new Error(`reannotate: ${a.length} calls before minify, ${b.length} after`);
  // Calls the minifier left annotated (comments kept) need nothing.
  const at = b.filter((c, i) => a[i]!.pure && !c.pure).map((c) => c.start);
  if (at.length === 0) return min;
  let code = "";
  let last = 0;
  for (const i of at) {
    code += min.slice(last, i) + PURE;
    last = i;
  }
  code += min.slice(last);
  if (map) {
    // Insertion offsets as (line, column) of the minified code.
    const lineStarts = [0];
    for (let i = 0; i < min.length; i++) if (min.charCodeAt(i) === 10) lineStarts.push(i + 1);
    const byLine = new Map<number, number[]>();
    let line = 0;
    for (const off of at) {
      while (line + 1 < lineStarts.length && lineStarts[line + 1]! <= off) line++;
      byLine.set(line, [...(byLine.get(line) ?? []), off - lineStarts[line]!]);
    }
    map.mappings = (map.mappings as string)
      .split(";")
      .map((segs, l) => {
        const cols = byLine.get(l);
        if (!cols || !segs) return segs;
        let abs = 0;
        let prevOut = 0;
        return segs
          .split(",")
          .map((seg) => {
            const f = vlqDecode(seg);
            abs += f[0]!;
            const shifted = abs + PURE.length * cols.filter((c) => c <= abs).length;
            f[0] = shifted - prevOut;
            prevOut = shifted;
            return vlqEncode(f);
          })
          .join(",");
      })
      .join(";");
  }
  return code;
};

//#endregion

/**
 * V8 stores a whole module source as two-byte if any character is outside
 * Latin-1. The sources are Latin-1 (codegen's toLatin1 pass), but rolldown
 * prints `\u2019` in a string as the character itself; escape it back. Only
 * strings, regexes and comments can hold such characters, and `\uXXXX` means
 * the same there.
 */
const toLatin1 = (lib: string, output: { type: string; fileName: string; latin1?: boolean }[]) => {
  for (const c of output) {
    if (c.type !== "chunk" || c.latin1) continue;
    const file = join(lib, c.fileName);
    const code = readFileSync(file, "utf8");
    writeFileSync(
      file,
      code.replace(/[^\x00-\xff]/g, (ch) => `\\u${ch.charCodeAt(0).toString(16).padStart(4, "0")}`),
    );
  }
};

const buildPackage = async (
  plan: Plan,
  corePlan: Plan,
  core: Built | undefined,
): Promise<Built> => {
  const src = join(plan.dir, "src");
  const lib = join(plan.dir, "lib");
  const graph = graphOf(plan);
  const groupOf = assignGroups(plan, graph);
  for (const d of plan.deep) {
    const g = groupOf.get(d);
    if (g) plan.groups.get(g)!.push(d);
    else plan.direct.push(d);
  }
  const dynamicTargets = new Set([...graph.values()].flatMap((i) => i.dynamic));
  const plugins: Plugin[] = core ? [corePlugin(corePlan, core)] : [];
  // Core modules that services and the SDK group import. The SDK group
  // imports all of them, so the re-export shims that route them to core's
  // chunks live in that chunk instead of a chunk of their own. Lazily loaded
  // modules are left out, so their core chunks (xml, ...) stay lazy.
  const coreRefs = new Set<string>();
  if (core)
    for (const file of walk(src))
      if (
        isSource(rel(src, file)) &&
        (isService(plan, rel(src, file)) || groupOf.has(noExt(rel(src, file))))
      )
        for (const m of readFileSync(file, "utf8").matchAll(
          /"(@distilled\.cloud\/core(?:\/[\w.-]+)?)"/g,
        ))
          if (m[1] !== "@distilled.cloud/core" && !corePlan.direct.includes(m[1]!.slice(22)))
            coreRefs.add(m[1]!);

  // Services reach core through the SDK group chunk, as they did when the
  // whole package was one build: `sdk.js` re-exports every core name a
  // service uses under a short alias, so each service has one short import.
  // Aliases are fixed up front (every service build and the group build
  // agree on them); the group exports only the ones services import.
  const coreAlias = new Map<string, string>();
  if (core && plan.groups.get(SDK_GROUP)?.length)
    for (const r of [...coreRefs].sort()) {
      const m = r.slice("@distilled.cloud/core/".length);
      for (const e of core.exportsOf.get(m) ?? [])
        coreAlias.set(`${m}\0${e}`, shortName(coreAlias.size));
    }
  const usedAliases = new Set<string>();

  const barrels = new Map<string, string>();
  const targets: string[] = [];
  for (const m of plan.direct) {
    if (!/(^|\/)index(\.|$)/.test(m)) continue;
    const b = barrelOf(src, join(src, `${m}.ts`));
    if (!b) continue;
    barrels.set(m, b.code);
    targets.push(...b.targets);
  }
  for (const t of targets) {
    if (barrels.has(t) || plan.direct.includes(t)) continue;
    if ([...plan.groups.values()].some((mods) => mods.includes(t))) continue;
    const g = groupOf.get(t);
    if (g) plan.groups.get(g)!.push(t);
    else plan.direct.push(t);
  }
  const exportsOf = await exportNames(plan, plugins);
  const built: Built = { groupOf, exportsOf };
  const groupNames = [...plan.groups.keys()].filter((g) => plan.groups.get(g)!.length > 0);
  const fileOf = (g: string) => `_bundle/${g}`;

  const datafied = new Map<string, string>();
  const bundlePlugin = {
    name: "distilled-bundle",
    resolveId(source: string) {
      if (source.startsWith(VIRTUAL)) return "\0" + source;
    },
    load(id: string) {
      if (!id.startsWith("\0" + VIRTUAL)) return;
      const g = id.slice(VIRTUAL.length + 1);
      const lines: string[] = g === SDK_GROUP ? [...coreRefs].map((r) => `import "${r}";`) : [];
      if (g === SDK_GROUP)
        for (const [k, alias] of coreAlias) {
          if (!usedAliases.has(alias)) continue;
          const [m, e] = k.split("\0") as [string, string];
          lines.push(`export { ${e} as ${alias} } from "@distilled.cloud/core/${m}";`);
        }
      // Rolldown's helpers (`__exportAll` for namespace objects) go in the
      // first group's chunk, which every chunk of the package already imports,
      // instead of a chunk of their own.
      if (g === groupNames[0]) lines.unshift(`import "${RUNTIME_MODULE_ID}";`);
      for (const m of plan.groups.get(g)!) {
        const names = exportsOf.get(m)!;
        const file = JSON.stringify(join(src, `${m}.ts`));
        lines.push(
          names.length
            ? `export { ${names.map((e) => `${e} as ${exportName(m, e)}`).join(", ")} } from ${file};`
            : `import ${file};`,
        );
      }
      return lines.join("\n");
    },
    transform(code: string, id: string) {
      if (!inside(src, id) || !id.endsWith(".ts")) return;
      const m = noExt(rel(src, id));
      // Service modules ship as data operations (see core/codegen/datafy.ts);
      // this is the same rewrite strip-lib-docs applies to tsc's output, done
      // here on the source because the bundled, minified output no longer
      // has the shape datafy reads.
      // Each `generate()` rebuilds the graph; datafy a service once per build.
      if (isService(plan, m)) {
        let d = datafied.get(id);
        if (d === undefined)
          datafied.set(id, (d = datafyOperations(code, id, { aliases: false }).code));
        code = d;
      }
      const own = groupOf.get(m);
      const deps = graph.get(m);
      // Services are not in the parsed graph (too big to parse twice); they import the SDK group.
      const needs = deps
        ? new Set(
            deps.static.map((d) => groupOf.get(d)).filter((g): g is string => !!g && g !== own),
          )
        : new Set(groupNames.filter((g) => g !== own));
      // A grouped module that is also imported lazily is an entry of its own;
      // it must reach the whole group too, or the group splits.
      if (own && dynamicTargets.has(m)) needs.add(own);
      if (needs.size === 0) return;
      // Appended, not prepended: line/column mappings stay valid.
      return {
        code: `${code}\n${[...needs].map((g) => `import "${VIRTUAL}${g}";`).join("\n")}\n`,
        map: null,
      };
    },
  };

  // One rolldown graph holds every module of its build: a whole provider at
  // once peaks at 2-4 GB. So each service builds on its own, then the groups
  // and the other entries. A service imports only grouped modules and
  // core, so it reaches the groups the way SDKs reach core: through the built
  // group chunk's exports. A one-entry build writes one chunk, the same
  // whatever else builds. Services build concurrently while their source
  // stays under BATCH_BYTES; memory peaks at about the largest service
  // (~0.8 GB for Cloudflare's 7 MB zero_trust).
  const shared: Record<string, string> = {};
  for (const g of groupNames) shared[fileOf(g)] = VIRTUAL + g;
  const services: { m: string; size: number }[] = [];
  for (const m of plan.direct) {
    if (barrels.has(m)) continue;
    const file = join(src, `${m}.ts`);
    // A module of a service directory that imports ungrouped code (AWS
    // middleware) builds with the groups, where that code has one chunk.
    const ownImports = isService(plan, m)
      ? [...readFileSync(file, "utf8").matchAll(/(?:from|import)\s*\(?\s*"(\.\.?\/[^"]+)"/g)]
      : [];
    if (
      isService(plan, m) &&
      ownImports.every((i) => groupOf.has(noExt(rel(src, join(dirname(file), i[1]!)))))
    )
      services.push({ m, size: statSync(file).size });
    else shared[m] = file;
  }

  const outputOptions = {
    dir: lib,
    format: "es",
    entryFileNames: "[name].js",
    chunkFileNames: "_chunks/[name]-[hash].js",
    sourcemap: true,
    // Maps point at `src/`, which every package publishes.
    sourcemapExcludeSources: true,
    comments: { legal: true, annotation: true, jsdoc: false },
  } satisfies OutputOptions;
  // V8 keeps every module's source text in the heap: whitespace and long
  // local names cost memory in every process (S3 -27%, Resend -22% import
  // heap with the bundling). Function and class names stay (`.name`, stack
  // traces); source maps map back to src/. BUNDLE_LIB_MINIFY=false for
  // readable output.
  const minify = process.env.BUNDLE_LIB_MINIFY
    ? JSON.parse(process.env.BUNDLE_LIB_MINIFY)
    : { compress: false, mangle: { keepNames: true }, codegen: { removeWhitespace: true } };
  const key = (c: any) => `${c.name}|${c.moduleIds.join(",")}`;
  mkdirSync(lib, { recursive: true });
  // What the checks below read of each chunk; code is not kept between builds.
  const output: {
    type: string;
    fileName: string;
    isEntry?: boolean;
    name?: string;
    moduleIds?: string[];
    rendered?: Record<string, number>;
    sourcemapFileName?: string | null;
    latin1?: boolean;
  }[] = [];
  // Other entries name a service through the package (`@distilled.cloud/axiom/edge_ingest`),
  // the file its own build writes, instead of bundling a second copy of it.
  const pkgJson = JSON.parse(readFileSync(join(plan.dir, "package.json"), "utf8"));
  const selfRefs = new Map<string, string>();
  for (const [k, v] of Object.entries<any>(pkgJson.exports ?? {}))
    if (k.endsWith("/*"))
      for (const t of exportTargets(v)) {
        const d = /^\.\/lib\/(.+)\/\*\.js$/.exec(t)?.[1];
        if (d && plan.serviceDirs.includes(d) && !selfRefs.has(d))
          selfRefs.set(d, `${pkgJson.name}/${k.slice(2, -1)}`);
      }
  const separate = new Set(services.map((x) => x.m));
  const servicesByPackage = {
    name: "distilled-services-by-package",
    resolveId(source: string, importer: string | undefined) {
      if (!importer || !source.startsWith(".") || !inside(src, importer)) return;
      const m = noExt(rel(src, join(dirname(importer), source)));
      if (!separate.has(m)) return;
      const d = plan.serviceDirs.find((x) => m.startsWith(`${x}/`))!;
      if (!selfRefs.has(d)) throw new Error(`${plan.name}: no wildcard export for ${d}/`);
      return { id: selfRefs.get(d) + m.slice(d.length + 1), external: true };
    },
  };
  /** Grouped modules of a service build: re-exports of the built group chunks. */
  const builtGroups = (service: string) => ({
    name: "distilled-built-groups",
    resolveId(source: string, importer: string | undefined) {
      if (source.startsWith(VIRTUAL)) {
        const to = rel(
          dirname(join(lib, service)),
          join(lib, fileOf(source.slice(VIRTUAL.length))),
        );
        return { id: `${to.startsWith(".") ? to : `./${to}`}.js`, external: true };
      }
      const c = source.startsWith("@distilled.cloud/core/")
        ? source.slice("@distilled.cloud/core/".length)
        : undefined;
      if (c !== undefined && core?.exportsOf.has(c) && coreAlias.size) return CORE_REF + c;
      if (!importer || !source.startsWith(".") || !inside(src, importer)) return;
      const m = noExt(rel(src, join(dirname(importer), source)));
      if (groupOf.has(m)) return GROUP_REF + m;
    },
    load(id: string) {
      if (id.startsWith(CORE_REF)) {
        const m = id.slice(CORE_REF.length);
        const names = core!.exportsOf.get(m)!;
        const group = `${VIRTUAL}${SDK_GROUP}`;
        return names.length
          ? `export { ${names.map((e) => `${coreAlias.get(`${m}\0${e}`)} as ${e}`).join(", ")} } from "${group}";`
          : `import "${group}";`;
      }
      if (!id.startsWith(GROUP_REF)) return;
      const m = id.slice(GROUP_REF.length);
      const names = exportsOf.get(m)!;
      const group = `${VIRTUAL}${groupOf.get(m)}`;
      return names.length
        ? `export { ${names.map((e) => `${exportName(m, e)} as ${e}`).join(", ")} } from "${group}";`
        : `import "${group}";`;
    },
  });
  const build = async (service?: string) => {
    const bundle = await rolldown({
      ...COMMON_INPUT,
      input: service ? { [service]: join(src, `${service}.ts`) } : shared,
      external,
      plugins: [service ? builtGroups(service) : servicesByPackage, bundlePlugin, ...plugins],
      preserveEntrySignatures: "allow-extension",
    });
    const pretty = minify
      ? new Map(
          (await bundle.generate({ ...outputOptions, sourcemap: false })).output
            .filter((c: any) => c.type === "chunk")
            .map((c: any) => [key(c), c.code]),
        )
      : undefined;
    const generated = (await bundle.generate({ ...outputOptions, minify })).output;
    await bundle.close();
    if (service) datafied.delete(join(src, `${service}.ts`));
    const chunks = generated.filter((c: any) => c.type === "chunk");
    if (service) {
      const stray = chunks
        .flatMap((c: any) => c.moduleIds as string[])
        .find((id: string) => inside(src, id) && noExt(rel(src, id)) !== service);
      if (chunks.length !== 1 || stray)
        throw new Error(
          `${plan.name}: ${service} ${stray ? `bundles ${rel(src, stray)}` : `built ${chunks.length} chunks`}; a service may import only grouped modules and core`,
        );
      // Rolldown 1.2 reports no imported bindings; read them off the import statements.
      const code = (chunks[0] as any).code as string;
      for (const im of code.matchAll(/import\s*\{([^}]*)\}\s*from\s*"([^"]+)"/g)) {
        if (!im[2]!.endsWith(`_bundle/${SDK_GROUP}.js`)) continue;
        for (const spec of im[1]!.split(",")) {
          const name = spec.trim().split(/\s+as\s+/)[0]!;
          if (name) usedAliases.add(name);
        }
      }
    }
    for (const c of generated) {
      const file = join(lib, c.fileName);
      mkdirSync(dirname(file), { recursive: true });
      if (c.type !== "chunk") {
        output.push({ type: c.type, fileName: c.fileName });
        // Chunk source maps are written below, after reannotate shifts them.
        if (!c.fileName.endsWith(".js.map")) writeFileSync(file, c.source);
        continue;
      }
      const map = c.map ? JSON.parse(c.map.toString()) : undefined;
      // `c.code` already ends with the sourceMappingURL comment.
      writeFileSync(file, pretty ? reannotate(pretty.get(key(c))!, c.code, map) : c.code);
      if (map) writeFileSync(`${file}.map`, JSON.stringify(map));
      output.push({
        type: c.type,
        fileName: c.fileName,
        isEntry: c.isEntry,
        name: c.name,
        moduleIds: c.moduleIds,
        rendered: Object.fromEntries(
          c.moduleIds.map((id: string) => [id, c.modules[id]?.renderedLength ?? 0]),
        ),
        sourcemapFileName: c.sourcemapFileName,
        latin1: !/[^\x00-\xff]/.test(c.code),
      });
    }
  };
  // Largest first; start the next while the running builds' source fits the budget.
  const queue = services.sort((x, y) => y.size - x.size);
  const running = new Set<Promise<void>>();
  let inFlight = 0;
  for (const { m, size } of queue) {
    while (running.size > 0 && inFlight + size > BATCH_BYTES) await Promise.race(running);
    inFlight += size;
    const p: Promise<void> = build(m).finally(() => {
      inFlight -= size;
      running.delete(p);
    });
    running.add(p);
  }
  await Promise.all(running);
  await build();

  // A group that split into several chunks would duplicate nothing, but costs modules; fail loudly.
  const written = new Set<string>();
  const problems: string[] = [];
  for (const c of output) {
    written.add(c.fileName);
    if (c.type !== "chunk") continue;
    if (c.sourcemapFileName) written.add(c.sourcemapFileName);
    const own = groupNames.find((g) => c.isEntry && c.name === fileOf(g));
    for (const id of c.moduleIds!) {
      if (!inside(src, id)) continue;
      const g = groupOf.get(noExt(rel(src, id)));
      if (g && g !== own)
        problems.push(`${rel(src, id)} (group ${g}) in ${c.fileName}: ${c.rendered![id]} B`);
    }
  }
  // Rolldown never duplicates a module, so this is about module count only;
  // re-export-only modules (a namespace object, ~1 KB) may land elsewhere.
  const big = problems.filter((p) => Number(p.split(": ").at(-1)!.split(" ")[0]) > 2048);
  if (big.length)
    console.warn(
      `bundle-lib: ${plan.name}: group code outside its chunk:\n  ${big.slice(0, 20).join("\n  ")}`,
    );
  if (output.some((c) => c.moduleIds?.length === 1 && c.moduleIds[0] === RUNTIME_MODULE_ID))
    throw new Error(`${plan.name}: rolldown runtime got a chunk of its own`);
  toLatin1(lib, output);

  // Facades for grouped public modules.
  for (const [g, mods] of plan.groups)
    for (const m of mods) {
      const file = `${m}.js`;
      const names = exportsOf.get(m)!;
      const target = rel(dirname(join(lib, file)), join(lib, `${fileOf(g)}.js`));
      const spec = target.startsWith(".") ? target : `./${target}`;
      mkdirSync(dirname(join(lib, file)), { recursive: true });
      writeFileSync(
        join(lib, file),
        names.length
          ? `export { ${names.map((e) => `${exportName(m, e)} as ${e}`).join(", ")} } from "${spec}";\n`
          : "export {};\n",
      );
      written.add(file);
    }

  for (const [m, code] of barrels) {
    writeFileSync(join(lib, `${m}.js`), code);
    written.add(`${m}.js`);
  }

  if (plan.serviceDirs.length) {
    const r = lazyServices(plan.dir, plan.serviceDirs);
    for (const w of r.written) written.add(w);
    writeFileSync(
      join(lib, ".lazy.json"),
      JSON.stringify({ serviceDirs: r.dirs, twins: r.twins }) + "\n",
    );
    written.add(".lazy.json");
    const pkg = JSON.parse(readFileSync(join(plan.dir, "package.json"), "utf8"));
    const bad = stubTargets(pkg.exports, r.dirs, r.twins);
    if (JSON.stringify(lazyExports(pkg.exports, r.dirs, r.twins)) !== JSON.stringify(pkg.exports))
      staleExports.push(rel(ROOT, plan.dir));
    else if (bad.length)
      throw new Error(
        `bundle-lib: ${plan.name}: exports ${bad.join(", ")} reach a lazy stub without the distilled-lazy condition`,
      );
    console.log(
      `bundle-lib: ${plan.name}: ${r.stubs} lazy service stubs${r.kept ? `, ${r.kept} kept whole` : ""}${r.twins.length ? `, twins: ${r.twins.join(", ")}` : ""}`,
    );
  }

  // Drop tsc's per-file output that no entry point reaches any more.
  let removed = 0;
  for (const file of walk(lib)) {
    const r = rel(lib, file);
    if (plan.keep(r) || written.has(r)) continue;
    if (/\.js(\.map)?$/.test(r) || r.endsWith(".json")) {
      rmSync(file);
      removed++;
    }
  }
  const chunks = output.filter((c: any) => c.type === "chunk");
  console.log(
    `bundle-lib: ${plan.name}: ${chunks.length} chunks (${groupNames.map(fileOf).join(", ")}, ${chunks.filter((c: any) => c.fileName.startsWith("_chunks/")).length} lazy), ${[...plan.groups.values()].flat().length} facades, ${removed} stale files removed`,
  );
  return built;
};

//#endregion

const args = process.argv.slice(2);
const dirs = (
  args.length
    ? args.map((p) => join(ROOT, p))
    : readdirSync(join(ROOT, "packages")).map((p) => join(ROOT, "packages", p))
).filter((d) => !d.endsWith(join("packages", "core")) && existsSync(join(d, "lib")));

/** Packages whose package.json `exports` do not match their lazy service layout. */
const staleExports: string[] = [];
/** A child's exit code for "built, but its `exports` need rewriting". */
const STALE_EXIT = 3;
/** Set in a child process: the file the parent wrote core's build to. */
const childOf = process.env.BUNDLE_LIB_CORE;
if (childOf) {
  const c = JSON.parse(readFileSync(childOf, "utf8"));
  const core: Plan = { ...corePlan(), direct: c.direct };
  const built: Built = { groupOf: new Map(c.groupOf), exportsOf: new Map(c.exportsOf) };
  for (const dir of dirs) {
    const plan = sdkPlan(dir);
    if (plan) await buildPackage(plan, core, built);
  }
  if (staleExports.length) process.exitCode = STALE_EXIT;
} else {
  const core = corePlan();
  const coreBuilt = await buildPackage(core, core, undefined);
  const sdks = dirs.filter((d) => sdkPlan(d));
  if (sdks.length <= 1) for (const dir of sdks) await buildPackage(sdkPlan(dir)!, core, coreBuilt);
  else {
    // A process keeps the memory it peaked at: build each package in a
    // process of its own, so building every SDK peaks at the largest one
    // instead of what they add up to.
    const tmp = mkdtempSync(join(tmpdir(), "bundle-lib-"));
    const file = join(tmp, "core.json");
    writeFileSync(
      file,
      JSON.stringify({
        direct: core.direct,
        groupOf: [...coreBuilt.groupOf],
        exportsOf: [...coreBuilt.exportsOf],
      }),
    );
    try {
      for (const dir of sdks) {
        const r = spawnSync(
          process.execPath,
          [...process.execArgv, fileURLToPath(import.meta.url), rel(ROOT, dir)],
          { stdio: "inherit", env: { ...process.env, BUNDLE_LIB_CORE: file } },
        );
        if (r.status === STALE_EXIT) staleExports.push(rel(ROOT, dir));
        else if (r.status !== 0)
          throw new Error(`bundle-lib: ${rel(ROOT, dir)} failed (${r.status ?? r.signal})`);
      }
    } finally {
      rmSync(tmp, { recursive: true, force: true });
    }
  }
}
if (staleExports.length && !childOf)
  throw new Error(
    `bundle-lib: package.json exports do not match the lazy service layout; run: node scripts/lazy-services.ts --exports ${staleExports.join(" ")}`,
  );
