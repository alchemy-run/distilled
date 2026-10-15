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
 *   services.full/*.js  the service entry chunks, for bundlers; services/*.js
 *                       are then Node's lazy stubs (see lazy-services.ts).
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
 *   node scripts/bundle-lib.ts [packages/<pkg> ...]   (core is always rebuilt)
 */
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, relative } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const require = createRequire(join(ROOT, "packages", "core", "package.json"));
const { rolldown, RUNTIME_MODULE_ID } = (await import(require.resolve("rolldown"))) as {
  rolldown: any;
  RUNTIME_MODULE_ID: string;
};
const { parseAst } = (await import(require.resolve("rolldown/parseAst"))) as {
  parseAst: (code: string, options: object, filename: string) => any;
};
const { datafyOperations } = (await import(
  join(ROOT, "packages", "core", "src", "codegen", "datafy.ts")
)) as typeof import("../packages/core/src/codegen/datafy.ts");

const { lazyServices, lazyExports } = (await import(
  join(ROOT, "scripts", "lazy-services.ts")
)) as typeof import("./lazy-services.ts");

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
    const src = node.source?.value;
    if (typeof src !== "string" || !src.startsWith(".")) continue;
    if (node.type === "ImportDeclaration") {
      if (node.importKind === "type") continue;
      const specs = node.specifiers ?? [];
      if (specs.length > 0 && specs.every((s: any) => s.importKind === "type")) continue;
    } else if (node.type === "ExportNamedDeclaration" || node.type === "ExportAllDeclaration") {
      if (node.exportKind === "type") continue;
      const specs = node.specifiers ?? [];
      if (specs.length > 0 && specs.every((s: any) => s.exportKind === "type")) continue;
    } else continue;
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
    if (n.exportKind === "type" || n.importKind === "type") continue;
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

const COMMON_INPUT = {
  logLevel: "warn",
  treeshake: { moduleSideEffects: true },
  // Same tsconfig semantics as tsc: ESNext target, define class fields.
  transform: { target: "esnext" },
};

const external = (id: string) =>
  !id.startsWith(".") &&
  !id.startsWith("/") &&
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
const exportNames = async (plan: Plan, plugins: object[]): Promise<Map<string, string[]>> => {
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
const toLatin1 = (lib: string, output: any[]) => {
  for (const c of output) {
    if (c.type !== "chunk" || !/[^\x00-\xff]/.test(c.code)) continue;
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
  const plugins: object[] = core ? [corePlugin(corePlan, core)] : [];
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

  const bundlePlugin = {
    name: "distilled-bundle",
    resolveId(source: string) {
      if (source.startsWith(VIRTUAL)) return "\0" + source;
    },
    load(id: string) {
      if (!id.startsWith("\0" + VIRTUAL)) return;
      const g = id.slice(VIRTUAL.length + 1);
      const lines: string[] = g === SDK_GROUP ? [...coreRefs].map((r) => `import "${r}";`) : [];
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
      if (!id.startsWith(src + "/") || !id.endsWith(".ts")) return;
      const m = noExt(rel(src, id));
      // Service modules ship as data operations (see core/codegen/datafy.ts);
      // this is the same rewrite strip-lib-docs applies to tsc's output, done
      // here on the source because the bundled, minified output no longer
      // has the shape datafy reads.
      if (isService(plan, m)) code = datafyOperations(code, id, { aliases: false }).code;
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

  const input: Record<string, string> = {};
  for (const g of groupNames) input[fileOf(g)] = VIRTUAL + g;
  for (const m of plan.direct) if (!barrels.has(m)) input[m] = join(src, `${m}.ts`);

  const bundle = await rolldown({
    ...COMMON_INPUT,
    input,
    external,
    plugins: [
      bundlePlugin,
      ...plugins,
      ...(process.env.BUNDLE_LIB_DEBUG ? [debugPlugin(src, groupOf)] : []),
    ],
    preserveEntrySignatures: "allow-extension",
  });
  const outputOptions = {
    dir: lib,
    format: "es",
    entryFileNames: "[name].js",
    chunkFileNames: "_chunks/[name]-[hash].js",
    sourcemap: true,
    // Maps point at `src/`, which every package publishes.
    sourcemapExcludeSources: true,
    comments: { legal: true, annotation: true, jsdoc: false },
  };
  // V8 keeps every module's source text in the heap: whitespace and long
  // local names cost memory in every process (S3 -27%, Resend -22% import
  // heap with the bundling). Function and class names stay (`.name`, stack
  // traces); source maps map back to src/. BUNDLE_LIB_MINIFY=false for
  // readable output.
  const minify = process.env.BUNDLE_LIB_MINIFY
    ? JSON.parse(process.env.BUNDLE_LIB_MINIFY)
    : { compress: false, mangle: { keepNames: true }, codegen: { removeWhitespace: true } };
  const key = (c: any) => `${c.name}|${c.moduleIds.join(",")}`;
  const pretty = minify
    ? new Map(
        (await bundle.generate({ ...outputOptions, sourcemap: false })).output
          .filter((c: any) => c.type === "chunk")
          .map((c: any) => [key(c), c.code]),
      )
    : undefined;
  const { output } = await bundle.generate({ ...outputOptions, minify });
  await bundle.close();
  mkdirSync(lib, { recursive: true });
  for (const c of output) {
    const file = join(lib, c.fileName);
    mkdirSync(dirname(file), { recursive: true });
    if (c.type !== "chunk") {
      // Chunk source maps are written below, after reannotate shifts them.
      if (!c.fileName.endsWith(".js.map")) writeFileSync(file, c.source);
      continue;
    }
    const map = c.map ? JSON.parse(c.map.toString()) : undefined;
    // `c.code` already ends with the sourceMappingURL comment.
    writeFileSync(file, pretty ? reannotate(pretty.get(key(c))!, c.code, map) : c.code);
    if (map) writeFileSync(`${file}.map`, JSON.stringify(map));
  }

  // A group that split into several chunks would duplicate nothing, but costs modules; fail loudly.
  const written = new Set<string>();
  const problems: string[] = [];
  for (const c of output) {
    written.add(c.fileName);
    if (c.type !== "chunk") continue;
    if (c.sourcemapFileName) written.add(c.sourcemapFileName);
    const own = groupNames.find((g) => c.isEntry && c.name === fileOf(g));
    for (const id of c.moduleIds as string[]) {
      if (!id.startsWith(src + "/")) continue;
      const g = groupOf.get(noExt(rel(src, id)));
      if (g && g !== own)
        problems.push(
          `${rel(src, id)} (group ${g}) in ${c.fileName}: ${c.modules[id]?.renderedLength} B`,
        );
    }
  }
  // Rolldown never duplicates a module, so this is about module count only;
  // re-export-only modules (a namespace object, ~1 KB) may land elsewhere.
  const big = problems.filter((p) => Number(p.split(": ").at(-1)!.split(" ")[0]) > 2048);
  if (big.length)
    console.warn(
      `bundle-lib: ${plan.name}: group code outside its chunk:\n  ${big.slice(0, 20).join("\n  ")}`,
    );
  if (output.some((c: any) => c.moduleIds?.length === 1 && c.moduleIds[0] === RUNTIME_MODULE_ID))
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
    if (JSON.stringify(lazyExports(pkg.exports, r.dirs, r.twins)) !== JSON.stringify(pkg.exports))
      staleExports.push(rel(ROOT, plan.dir));
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
const core = corePlan();
const coreBuilt = await buildPackage(core, core, undefined);
for (const dir of dirs) {
  const plan = sdkPlan(dir);
  if (plan) await buildPackage(plan, core, coreBuilt);
}
if (staleExports.length)
  throw new Error(
    `bundle-lib: package.json exports do not route Node to the lazy service stubs; run: node scripts/lazy-services.ts --exports ${staleExports.join(" ")}`,
  );
