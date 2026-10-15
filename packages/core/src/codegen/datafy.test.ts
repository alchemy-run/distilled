import { stripTypeScriptTypes } from "node:module";
import { describe, expect, test } from "vitest";
import * as API from "../api.ts";
import * as C from "../category.ts";
import * as S from "../schema-lite.ts";
import * as T from "../trait.ts";
import { datafyOperations } from "./datafy.ts";

const header = [
  `import * as API from "@distilled.cloud/core/api";`,
  `import * as S from "@distilled.cloud/core/schema-lite";`,
  `import * as __L from "@distilled.cloud/core/schema-lite";`,
  `import * as T from "../traits.ts";`,
  `import * as C from "@distilled.cloud/core/category";`,
].join("\n");

// A tabled module, as `tableSchemas` leaves it.
const tabled = [
  header,
  `const __s: any[] = [];`,
  `const __kept = /*@__PURE__*/ __L.at(__c0, 2);`,
  `const KEYS = { aB: "a_b", "x-y": "x\\u00e9;" };`,
  `export class Oops extends /*@__PURE__*/ S.TaggedError<Oops>()("Oops", { body: S.optional(__S(2, __c0, 2)) }) {}`,
  `/** Not found. */`,
  `export class Gone extends /*@__PURE__*/ T.applyErrorMatchers(`,
  `  S.TaggedError<Gone>()("Gone", { message: S.String, thing: S.optional(__S(3, __c0, 3)) }, { "x;y": "it's" }).pipe(C.withNotFoundError),`,
  `  [{ status: 404 }],`,
  `) {}`,
  `class Kept extends Error { readonly x = 1; }`,
  `export const getThing: API.OperationMethod<any, any, any, any> = /*@__PURE__*/ API.make(() => ({`,
  `  input: __S(0, __c0, 0) as any as S.Schema<any>,`,
  `  output: __S(1, __c0, 1) as any as S.Schema<any>,`,
  `  errors: [Oops, Gone],`,
  `}));`,
  `export const listThings: API.PaginatedOperationMethod<any, any, any, any> = /*@__PURE__*/ API.makePaginated(`,
  `  () => ({ input: __S(0, __c0, 0), output: __S(3, __c0, 3), errors: [], pagination: { mode: "cursor", items: "data" } as const }),`,
  `  strategy,`,
  `);`,
  `function __c0(j: number): any {`,
  `  switch (j) {`,
  `    case 0: return S.suspend(() => S.Struct({ id: S.String.pipe(T.Label()), n: S.optional(S.Number) }).pipe(T.Http({ method: "GET", uri: "/t/{id}" }), T.KeyDictionary(KEYS))).annotate({ identifier: "GetThingRequest" });`,
  `    case 1: return S.suspend(() => S.Struct({ tags: S.Array(__S(2, __c0, 2)), lit: S.Literals(["a;b", -1.5, true, null]) })).annotate({ identifier: "Thing", title: "it's \\\\" });`,
  `    case 2: return S.Record(S.String, Sensitive.pipe(S.NullOr));`,
  `    case 3: return S.Struct({ data: S.Array(__S(1, __c0, 1)), kept: __kept });`,
  `  }`,
  `}`,
  `function __S(i: number, f: (j: number) => unknown, j: number): any {`,
  `  return (__s[i] ??= __L.at(f, j));`,
  `}`,
].join("\n");

const Sensitive = S.String;
const strategy = () => {
  throw new Error("unused");
};

/** Evaluate a generated module (imports bound to core) and return its exports. */
const run = (code: string): Record<string, any> => {
  const js = stripTypeScriptTypes(code)
    .replace(/^import .*$/gm, "")
    .replace(/^export /gm, "");
  const names = [...js.matchAll(/^(?:const|class) ([A-Za-z]\w*)/gm)].map((m) => m[1]!);
  return new Function(
    "API",
    "S",
    "__L",
    "T",
    "C",
    "strategy",
    "Sensitive",
    `${js}\nreturn { ${names.join(", ")} };`,
  )(API, S, S, T, C, strategy, Sensitive);
};

/** Lite ASTs with every Suspend resolved, as plain data. */
const plain = (n: any, ancestors = new Set<any>()): unknown => {
  if (n === null || typeof n !== "object") return typeof n === "function" ? n.name : n;
  if (ancestors.has(n)) return "<cycle>";
  ancestors.add(n);
  const out: Record<string | symbol, unknown> = {};
  for (const k of Reflect.ownKeys(n)) if (k !== "thunk") out[k] = plain(n[k], ancestors);
  if (n._tag === "Suspend") out.resolved = plain(n.thunk(), ancestors);
  ancestors.delete(n);
  return Array.isArray(n) ? Object.values(out) : out;
};

// Several operations sharing module constants and a repeated trait call.
const long = `/long/${"y".repeat(200)}`;
const shared = [
  header,
  `const __s: any[] = [];`,
  `const svc = /*@__PURE__*/ T.Http({ method: "POST", uri: "/a;b%" });`,
  `const lbl = /*@__PURE__*/ T.Label();`,
  ...["a", "b", "c", "d"].map(
    (x, j) =>
      `export const get${x.toUpperCase()}: API.OperationMethod<any, any, any, any> = /*@__PURE__*/ API.make(() => ({\n  input: __S(${j}, __c0, ${j}),\n  output: __S(9, __c0, 9),\n  errors: [Oops],\n  operationName: "GetThing${x}",\n}));`,
  ),
  `export class Oops extends /*@__PURE__*/ S.TaggedError<Oops>()("Oops", { m: S.String.pipe(svc) }) {}`,
  `function __c0(j: number): any {`,
  `  switch (j) {`,
  ...["a", "b", "c", "d"].map(
    (x, j) =>
      `    case ${j}: return S.suspend(() => S.Struct({ ${x}: S.String.pipe(lbl) }).pipe(T.all(svc, T.Http({ method: "PUT", uri: "${long}" })))).annotate({ identifier: "GetThing${x}Request" });`,
  ),
  `    case 9: return S.Struct({});`,
  `  }`,
  `}`,
  `function __S(i: number, f: (j: number) => unknown, j: number): any {`,
  `  return (__s[i] ??= __L.at(f, j));`,
  `}`,
].join("\n");

describe("shared constants and values", () => {
  const { code } = datafyOperations(shared);

  test("module constants and repeated calls are written once, in holders their users reach", () => {
    expect(code).not.toMatch(/const (svc|lbl) =/);
    expect(code.match(/T\.Http\(\{ method: "POST", uri: "\/a;b%" \}\)/g)).toHaveLength(1);
    expect(code.match(/y{200}/g)).toHaveLength(1);
    expect(code).toMatch(/\.pipe\(~\d+:\d+\)/);
    // The operation name is written once, as the stem of its strings.
    expect(code).toMatch(/API\.named\("GetThinga", '[^']*"%"[^']*', \[/);
    expect(code).toContain(`@"%Request"`);
  });

  test("evaluates to the same schemas, errors and names as the code form", () => {
    const before = run(shared);
    const after = run(code);
    for (const name of ["getA", "getB", "getC", "getD"]) {
      expect(plain(after[name].input.ast)).toEqual(plain(before[name].input.ast));
      expect(after[name].operationName).toBe(before[name].operationName);
      expect(after[name].errors).toEqual([after.Oops]);
    }
    expect(plain(after.Oops.ast)).toEqual(plain(before.Oops.ast));
  });
});

describe("datafyOperations", () => {
  const { code, operations, holders, errors } = datafyOperations(tabled);

  test("replaces builders and the table with data operations", () => {
    expect(operations).toBe(2);
    expect(errors).toBe(2);
    expect(code).toContain(
      `export const Gone: any = /*@__PURE__*/ API.error(function Gone(i: any): any {`,
    );
    expect(code).toContain(`  return API.newError(i, new.target, ['`);
    expect(code).toContain(`/** Not found. */\nexport const Gone`);
    expect(code).toContain(`class Kept extends Error { readonly x = 1; }`);
    expect(holders).toBeGreaterThan(0);
    expect(code).not.toMatch(/function __c0|function __S|const __s/);
    expect(code).toContain(`API.op((i: any): any => i === API.D ? ['`);
    expect(code).toContain(`API.opPaginated(`);
    expect(code).toContain(`API.call(getThing, i)`);
    expect(code).toContain(`const __0 = __L.at;`);
    expect(code).toMatch(/^const __\d+ = S\.Struct;$/m);
    // The module source stays one-byte.
    expect(code).not.toMatch(/[^\x00-\x7f]/);
  });

  test("builds the same schemas, errors and pagination as the code form", () => {
    const before = run(tabled);
    const after = run(code);
    for (const name of ["getThing", "listThings"]) {
      expect(plain(after[name].input.ast)).toEqual(plain(before[name].input.ast));
      expect(plain(after[name].output.ast)).toEqual(plain(before[name].output.ast));
      expect(after[name].errors.map((e: any) => e.identifier)).toEqual(
        before[name].errors.map((e: any) => e.identifier),
      );
    }
    expect(after.listThings.pagination).toEqual(before.listThings.pagination);
    expect(typeof after.listThings.pages).toBe("function");
    expect(plain(after.Oops.fields.body.ast)).toEqual(plain(before.Oops.fields.body.ast));
    // One schema object per entry, shared by every operation that reaches it.
    expect(after.getThing.input).toBe(after.listThings.input);
  });

  test("error classes build on first use and behave like the code form", () => {
    const before = run(tabled);
    const after = run(code);
    const Gone = after.Gone;
    // Not built yet: its statics are the lazy ones.
    expect(Object.getPrototypeOf(Gone)).not.toBe(Function.prototype);
    expect(typeof Gone.call).toBe("function");
    expect(Object.getPrototypeOf(Gone).constructor).toBe(Function);
    // A static read builds it.
    expect(T.getErrorMatchers(Gone)).toEqual([{ status: 404 }]);
    expect(Gone.identifier).toBe("Gone");
    expect(plain(Gone.ast)).toEqual(plain(before.Gone.ast));
    expect(Object.keys(Gone.fields)).toEqual(["message", "thing"]);
    const e = new Gone({ message: "no", thing: { data: [] }, extra: 1 });
    expect(e).toBeInstanceOf(Gone);
    expect(e).toBeInstanceOf(Error);
    expect(e).not.toBeInstanceOf(after.Oops);
    expect(e._tag).toBe("Gone");
    expect(e.name).toBe("Gone");
    expect(e.message).toBe("no");
    expect(e.extra).toBeUndefined();
    expect(e.constructor).toBe(Gone);
    expect(C.isNotFoundError(e)).toBe(true);
    expect(C.isNotFoundError(new before.Gone({ message: "no" }))).toBe(true);
    // `new` first, no static read before it.
    const o = new after.Oops({ body: { a: "b" } });
    expect(o).toBeInstanceOf(after.Oops);
    expect(o._tag).toBe("Oops");
    expect(o.body).toEqual({ a: "b" });
    // Subclasses declared before the class is built.
    const run2 = run(code);
    const Base: new (props: object) => any = run2.Gone;
    class Sub extends Base {}
    const s = new Sub({ message: "m" });
    expect(s).toBeInstanceOf(Sub);
    expect(s).toBeInstanceOf(run2.Gone);
    expect(s._tag).toBe("Gone");
    expect((Sub as any).identifier).toBe("Gone");
    expect(new run2.Gone({ message: "x" })).not.toBeInstanceOf(Sub);
  });
});
