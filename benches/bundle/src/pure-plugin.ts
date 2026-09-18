/**
 * Minimal port of Alchemy's `packages/alchemy/src/Bundle/PurePlugin.ts`
 * (`alchemy:annotate-pure`), kept dependency-free so the bench does not
 * depend on `alchemy`.
 *
 * Behaviour that matters for the numbers and is reproduced 1:1:
 * - only modules owned by a package matching {@link DEFAULT_PURE_PACKAGES}
 *   are touched (package name comes from the nearest `package.json`, so
 *   workspace-linked `packages/<pkg>/src/**` sources are matched, not only
 *   `node_modules/<pkg>/**`);
 * - every top-level call / `new` whose result is BOUND (variable
 *   initializer, export, assignment RHS) gets `/*#__PURE__*\/`;
 * - top-level calls whose result is DISCARDED (bare expression statements)
 *   are annotated only when the package declares `sideEffects: false | []`;
 * - modules of such side-effect-free packages are also returned with
 *   `moduleSideEffects: false`, except entry modules.
 *
 * Differences from Alchemy's plugin: package globs are matched with a tiny
 * `name` / `@scope/*` matcher instead of picomatch, and there is no
 * process-wide anchors cache (each bench build is a fresh process anyway;
 * the warm run measures rolldown, not the plugin cache).
 */
import type {
  CallExpression,
  ExportDefaultDeclaration,
  ExportNamedDeclaration,
  Expression,
  ExpressionStatement,
  NewExpression,
  Program,
  Statement,
  VariableDeclaration,
} from "@oxc-project/types";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import type { InputOptions, Plugin } from "rolldown";
import { RolldownMagicString } from "rolldown";
import { parseAst } from "rolldown/parseAst";

/** Same list as Alchemy's `DEFAULT_PURE_PACKAGES`. */
export const DEFAULT_PURE_PACKAGES: ReadonlyArray<string> = [
  "effect",
  "@effect/*",
  "alchemy",
  "@alchemy.run/*",
  "@distilled.cloud/*",
];

const PURE_COMMENT = "/*#__PURE__*/ ";
const SUPPORTED_FILE_RE = /\.(?:m?[jt]sx?|cjs|cts)$/;

export interface PurePluginStats {
  /** Modules the plugin looked at (matched a configured package). */
  matchedModules: number;
  /** Modules that received at least one annotation. */
  annotatedModules: number;
  /** Total `/*#__PURE__*\/` comments inserted. */
  annotations: number;
  /** Modules returned with `moduleSideEffects: false`. */
  sideEffectFreeModules: number;
}

export interface PurePluginOptions {
  readonly packages?: ReadonlyArray<string>;
  readonly markSideEffectFree?: boolean;
  /** Receives per-build counters; useful for the report. */
  readonly stats?: PurePluginStats;
}

const matcher = (patterns: ReadonlyArray<string>) => {
  const exact = new Set<string>();
  const scopes = new Set<string>();
  for (const p of patterns) {
    if (p.endsWith("/*")) scopes.add(p.slice(0, -2));
    else exact.add(p);
  }
  return (name: string): boolean => {
    if (exact.has(name)) return true;
    const slash = name.indexOf("/");
    return slash > 0 && scopes.has(name.slice(0, slash));
  };
};

export const purePlugin = (options: PurePluginOptions = {}): Plugin => {
  const isMatch = matcher(options.packages ?? DEFAULT_PURE_PACKAGES);
  const markSideEffectFreeOpt = options.markSideEffectFree ?? true;
  const stats = options.stats;
  const pkgInfoCache = new Map<string, PackageInfo | null>();
  const entryPaths = new Set<string>();

  return {
    name: "bench:annotate-pure",
    options(opts) {
      for (const input of inputFilePaths(opts)) entryPaths.add(input);
      return null;
    },
    transform: {
      filter: { id: SUPPORTED_FILE_RE },
      async handler(code, id, meta) {
        const cleanId = stripIdSuffix(id);
        const info = await resolvePackageInfo(
          path.dirname(cleanId),
          pkgInfoCache,
        );
        const name = info?.name ?? packageNameFromId(cleanId);
        if (name === null || !isMatch(name)) return null;
        if (stats) stats.matchedModules++;

        const isEntry = entryPaths.has(cleanId);
        const sideEffectFreePkg = isSideEffectFree(info?.sideEffects);
        const markSideEffectFree =
          markSideEffectFreeOpt && !isEntry && sideEffectFreePkg;
        if (stats && markSideEffectFree) stats.sideEffectFreeModules++;

        const anchors = collectPureAnchors(code, cleanId);
        const annotateDiscarded = !isEntry && sideEffectFreePkg;
        const positions =
          anchors === null
            ? []
            : annotateDiscarded
              ? [...anchors.bound, ...anchors.discarded]
              : anchors.bound;
        if (positions.length === 0) {
          return markSideEffectFree ? { moduleSideEffects: false } : null;
        }
        if (stats) {
          stats.annotatedModules++;
          stats.annotations += positions.length;
        }
        const s = meta.magicString ?? new RolldownMagicString(code);
        for (const anchor of positions) s.appendLeft(anchor, PURE_COMMENT);
        return {
          code: s,
          moduleSideEffects: markSideEffectFree ? false : null,
        };
      },
    },
  };
};

const stripIdSuffix = (id: string): string => id.replace(/[?#].*$/, "");

function inputFilePaths(opts: InputOptions): string[] {
  const raw: unknown[] =
    typeof opts.input === "string"
      ? [opts.input]
      : Array.isArray(opts.input)
        ? opts.input
        : opts.input && typeof opts.input === "object"
          ? Object.values(opts.input)
          : [];
  const cwd = opts.cwd ?? process.cwd();
  return raw
    .filter(
      (entry): entry is string =>
        typeof entry === "string" && !entry.startsWith("\0"),
    )
    .map((entry) => path.resolve(cwd, entry));
}

interface PackageInfo {
  readonly name: string | null;
  readonly sideEffects: unknown;
}

async function resolvePackageInfo(
  startDir: string,
  cache: Map<string, PackageInfo | null>,
): Promise<PackageInfo | null> {
  let dir = path.resolve(startDir);
  const visited: string[] = [];
  let result: PackageInfo | null = null;
  for (let i = 0; i < 64; i++) {
    if (path.basename(dir) === "node_modules") break;
    const cached = cache.get(dir);
    if (cached !== undefined) {
      result = cached;
      break;
    }
    visited.push(dir);
    const info = await readPackageJson(path.join(dir, "package.json"));
    if (info !== null) {
      result = info;
      break;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  for (const v of visited) cache.set(v, result);
  return result;
}

async function readPackageJson(file: string): Promise<PackageInfo | null> {
  try {
    const json = JSON.parse(await fs.readFile(file, "utf8")) as {
      name?: unknown;
      sideEffects?: unknown;
    };
    return {
      name: typeof json.name === "string" ? json.name : null,
      sideEffects: json.sideEffects,
    };
  } catch {
    return null;
  }
}

function isSideEffectFree(value: unknown): boolean {
  if (value === false) return true;
  if (Array.isArray(value) && value.length === 0) return true;
  return false;
}

function packageNameFromId(id: string): string | null {
  const normalized = id.replace(/\\/g, "/");
  const idx = normalized.lastIndexOf("/node_modules/");
  if (idx === -1) return null;
  const parts = normalized.slice(idx + "/node_modules/".length).split("/");
  if (parts.length === 0 || parts[0] === "") return null;
  if (parts[0].startsWith("@")) {
    if (parts.length < 2) return null;
    return `${parts[0]}/${parts[1]}`;
  }
  return parts[0];
}

interface PureAnchors {
  readonly bound: number[];
  readonly discarded: number[];
}

function collectPureAnchors(
  code: string,
  filename: string,
): PureAnchors | null {
  let program: Program;
  try {
    program = parseAst(code, { sourceType: "module", lang: "ts" }, filename);
  } catch {
    return null;
  }
  const bound: number[] = [];
  const discarded: number[] = [];

  const visitCall = (
    call: CallExpression | NewExpression,
    isDiscarded: boolean,
  ) => {
    if (isIIFE(call)) return;
    const anchor =
      call.type === "NewExpression" ? call.start : call.callee.start;
    if (alreadyAnnotated(code, anchor)) return;
    (isDiscarded ? discarded : bound).push(anchor);
  };

  const visitExpression = (
    expr: Expression | null | undefined,
    isDiscarded: boolean,
  ) => {
    if (!expr) return;
    switch (expr.type) {
      case "CallExpression":
      case "NewExpression":
        visitCall(expr, isDiscarded);
        return;
      case "SequenceExpression": {
        const exprs = expr.expressions;
        for (let i = 0; i < exprs.length; i++) {
          visitExpression(exprs[i], i < exprs.length - 1 ? true : isDiscarded);
        }
        return;
      }
      case "ParenthesizedExpression":
        visitExpression(expr.expression, isDiscarded);
        return;
      case "LogicalExpression":
        visitExpression(expr.left, isDiscarded);
        visitExpression(expr.right, isDiscarded);
        return;
      case "ConditionalExpression":
        visitExpression(expr.consequent, isDiscarded);
        visitExpression(expr.alternate, isDiscarded);
        return;
      case "AssignmentExpression":
        visitExpression(expr.right, false);
        return;
      case "TSAsExpression":
      case "TSSatisfiesExpression":
      case "TSNonNullExpression":
      case "TSTypeAssertion":
        visitExpression(expr.expression, isDiscarded);
        return;
      case "ChainExpression": {
        const inner = expr.expression;
        if (inner.type === "CallExpression") visitCall(inner, isDiscarded);
        return;
      }
      default:
        return;
    }
  };

  const visitTopLevel = (node: Statement) => {
    switch (node.type) {
      case "ExpressionStatement":
        visitExpression((node as ExpressionStatement).expression, true);
        return;
      case "VariableDeclaration":
        for (const decl of (node as VariableDeclaration).declarations) {
          visitExpression(decl.init, false);
        }
        return;
      case "ExportNamedDeclaration": {
        const decl = (node as ExportNamedDeclaration).declaration;
        if (decl) visitTopLevel(decl as Statement);
        return;
      }
      case "ExportDefaultDeclaration": {
        const decl = (node as ExportDefaultDeclaration).declaration;
        if (
          decl &&
          decl.type !== "FunctionDeclaration" &&
          decl.type !== "ClassDeclaration" &&
          decl.type !== "TSInterfaceDeclaration"
        ) {
          visitExpression(decl as Expression, false);
        }
        return;
      }
      default:
        return;
    }
  };

  for (const node of program.body) visitTopLevel(node as Statement);

  return bound.length === 0 && discarded.length === 0
    ? null
    : { bound, discarded };
}

function isIIFE(node: CallExpression | NewExpression): boolean {
  let callee: Expression = node.callee;
  while (callee.type === "ParenthesizedExpression") {
    callee = callee.expression;
  }
  return (
    callee.type === "FunctionExpression" ||
    callee.type === "ArrowFunctionExpression"
  );
}

function alreadyAnnotated(code: string, pos: number): boolean {
  const start = Math.max(0, pos - 32);
  const slice = code.slice(start, pos);
  return slice.includes("/*#__PURE__*/") || slice.includes("/*@__PURE__*/");
}
