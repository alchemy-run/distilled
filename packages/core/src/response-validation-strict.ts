/**
 * The strict response checker: validates a decoded response against its
 * output AST without Effect Schema.
 *
 * Generated output schemas are lite nodes (`schema-lite-impl.ts`); the
 * checker accepts what Effect Schema's decoder accepted for the schema
 * `toEffect` built from them (`response-validation-strict.test.ts` compares
 * the two on random schemas and values). Each AST node compiles once to a
 * closure, so a check walks the value only.
 *
 * Hand-written protocols may pass real Effect ASTs. Their structure is
 * checked the same way; refinement `checks` run, but a real `Declaration`
 * with type parameters and `TemplateLiteral` contents are not checked.
 */
import type * as AST from "effect/SchemaAST";
import type { Node } from "./schema-lite-impl.ts";

/** A response that does not match its output schema (the `cause` of a strict `<Sdk>ParseError`). */
export class SchemaMismatch extends Error {
  override readonly name = "SchemaError";
  /** Where in the response the mismatch is, outermost key first. */
  readonly path: ReadonlyArray<PropertyKey>;
  /** What the schema expected there, e.g. `string`. */
  readonly expected: string;
  readonly actual: unknown;
  constructor(path: ReadonlyArray<PropertyKey>, expected: string, actual: unknown) {
    super(
      `Expected ${expected}, got ${show(actual)}${path.length ? ` at ${JSON.stringify(path.map((k) => (typeof k === "symbol" ? String(k) : k)))}` : ""}`,
    );
    this.path = path;
    this.expected = expected;
    this.actual = actual;
  }
}

/**
 * Validate `input` synchronously: `undefined` when it matches, else the
 * mismatch.
 */
export type Decode = (input: unknown) => SchemaMismatch | undefined;

const show = (u: unknown): string => {
  if (u === MISSING) return "nothing (missing key)";
  if (u === undefined) return "undefined";
  if (typeof u === "string") return JSON.stringify(u.length > 40 ? `${u.slice(0, 40)}...` : u);
  if (Array.isArray(u)) return "an array";
  if (u !== null && typeof u === "object") return "an object";
  return String(u);
};

/** A failed check: the path is filled in on the way out, innermost key first. */
interface Fail {
  readonly path: PropertyKey[];
  readonly expected: string;
  readonly actual: unknown;
}
type Check = (u: unknown) => Fail | undefined;

const MISSING: unique symbol = Symbol("missing");
/**
 * The node compiler, built on the first strict check: importing this module
 * (every REST program does, through the protocol) allocates almost nothing.
 */
const makeCompile = (): ((n: Node) => Check) => {
  const fail = (expected: string, actual: unknown): Fail => ({ path: [], expected, actual });
  const ok: Check = () => undefined;
  const typeOf =
    (t: string): Check =>
    (u) =>
      typeof u === t ? undefined : fail(t, u);

  const compiled = new WeakMap<object, Check>();

  const compile = (n: Node): Check => {
    let c = compiled.get(n);
    if (c === undefined) {
      // A node reached again while it compiles (only through Suspend) calls
      // through this slot.
      let self: Check | undefined;
      compiled.set(n, (u) => self!(u));
      self = c = withChecks(n, build(n));
      compiled.set(n, c);
    }
    return c;
  };

  /** Effect refinements (`checks`) on real nodes run after the structural check. */
  const withChecks = (n: Node, base: Check): Check => {
    const checks = (n as { checks?: ReadonlyArray<any> }).checks;
    if (!checks?.length || isLite(n)) return base;
    const flat: any[] = [];
    const add = (c: any) => (c._tag === "FilterGroup" ? c.checks.forEach(add) : flat.push(c));
    checks.forEach(add);
    return (u) => {
      const f = base(u);
      if (f) return f;
      for (const c of flat) {
        const r = c.run(u, n, {});
        if (r !== undefined && r !== true)
          return fail(String(c.annotations?.expected ?? "a valid value"), u);
      }
      return undefined;
    };
  };

  const isLite = (n: Node): boolean => (n as any)["~lite"] === true;

  const isOptional = (n: Node): boolean => n.context?.isOptional === true;

  const build = (n: Node): Check => {
    // A real node that decodes from another form is checked in that form (the
    // body as read); lite encodings are type-side only.
    const encoding = (n as { encoding?: ReadonlyArray<{ to: Node }> }).encoding;
    if (encoding?.length && !isLite(n)) return compile(encoding[encoding.length - 1]!.to);
    switch (n._tag) {
      case "String":
      case "TemplateLiteral":
        return typeOf("string");
      case "Number":
        return typeOf("number");
      case "Boolean":
        return typeOf("boolean");
      case "BigInt":
        return typeOf("bigint");
      case "Symbol":
        return typeOf("symbol");
      case "Null":
        return (u) => (u === null ? undefined : fail("null", u));
      case "Undefined":
        return (u) => (u === undefined ? undefined : fail("undefined", u));
      case "Never":
        return (u) => fail("never", u);
      case "Literal":
      case "UniqueSymbol": {
        const lit = n._tag === "Literal" ? n.literal : (n as any).symbol;
        return (u) => (u === lit ? undefined : fail(show(lit), u));
      }
      case "Enum": {
        const values = ((n as any).enums as ReadonlyArray<readonly [string, unknown]>).map(
          (e) => e[1],
        );
        return (u) => (values.includes(u) ? undefined : fail("an enum value", u));
      }
      case "ObjectKeyword":
        return (u) =>
          (typeof u === "object" && u !== null) || typeof u === "function"
            ? undefined
            : fail("object | function", u);
      case "Union":
        return union(n);
      case "Arrays":
        return arrays(n);
      case "Objects":
        return objects(n);
      case "Suspend": {
        let inner: Check | undefined;
        return (u) => (inner ??= compile(n.thunk!()))(u);
      }
      case "Declaration": {
        if (isLite(n)) {
          const check = n.check;
          const name = String(n.annotations?.identifier ?? "a valid value");
          return check ? (u) => (check(u) ? undefined : fail(name, u)) : ok;
        }
        return declaration(n);
      }
      default:
        // Unknown, Any, Void (Effect's `void` accepts any value) and anything
        // without structure.
        return ok;
    }
  };

  /** A real Effect declaration without type parameters runs its own parser (synchronous ones only). */
  const declaration = (n: Node): Check => {
    const run = (n as any).run as ((tps: ReadonlyArray<unknown>) => any) | undefined;
    if (!run || n.typeParameters?.length) return ok;
    let parse: any;
    return (u) => {
      const exit = (parse ??= run([]))(u, n, {});
      return exit?._tag === "Failure"
        ? fail(String(n.annotations?.identifier ?? n.annotations?.expected ?? "a valid value"), u)
        : undefined;
    };
  };

  const union = (n: Node): Check => {
    const members = n.types!.map(compile);
    return (u) => {
      let first: Fail | undefined;
      for (let i = 0; i < members.length; i++) {
        const f = members[i]!(u);
        if (f === undefined) return undefined;
        first ??= f;
      }
      return members.length === 1 ? first : fail("a union member", u);
    };
  };

  const arrays = (n: Node): Check => {
    const elements = (n.elements ?? []).map((e) => [compile(e), isOptional(e)] as const);
    const rest = (n.rest ?? []).map(compile);
    const head = rest[0];
    const tail = rest.slice(1);
    return (u) => {
      if (!Array.isArray(u)) return fail("array", u);
      const len = u.length;
      for (let i = 0; i < elements.length; i++) {
        const [check, optional] = elements[i]!;
        if (i >= len) {
          if (optional) continue;
          return at(fail("an element", MISSING), i);
        }
        const f = check(u[i]);
        if (f) return at(f, i);
      }
      if (head === undefined) {
        return len > elements.length
          ? at(fail("never", u[elements.length]), elements.length)
          : undefined;
      }
      const end = len - tail.length;
      if (end < elements.length) return at(fail("an element", MISSING), len);
      for (let i = elements.length; i < end; i++) {
        const f = head(u[i]);
        if (f) return at(f, i);
      }
      for (let j = 0; j < tail.length; j++) {
        const f = tail[j]!(u[end + j]);
        if (f) return at(f, end + j);
      }
      return undefined;
    };
  };

  const at = (f: Fail, key: PropertyKey): Fail => {
    f.path.push(key);
    return f;
  };

  const objects = (n: Node): Check => {
    const props = (n.propertySignatures ?? []).map(
      (p) => [p.name, compile(p.type), isOptional(p.type)] as const,
    );
    const index = (n.indexSignatures ?? []).map(
      (s) => [compile(s.parameter), compile(s.type)] as const,
    );
    const known = new Set(props.map((p) => p[0]));
    // Effect's empty struct is TypeScript's `{}`: any value but null and undefined.
    if (props.length === 0 && index.length === 0) {
      return (u) => (u === null || u === undefined ? fail("{}", u) : undefined);
    }
    return (u) => {
      if (typeof u !== "object" || u === null || Array.isArray(u)) return fail("object", u);
      const o = u as Record<PropertyKey, unknown>;
      for (let i = 0; i < props.length; i++) {
        const [name, check, optional] = props[i]!;
        if (!(name === "__proto__" ? Object.hasOwn(o, name) : name in o)) {
          if (optional) continue;
          return at(fail("a value", MISSING), name);
        }
        const f = check(o[name]);
        if (f) return at(f, name);
      }
      if (index.length) {
        for (const key of Object.keys(o)) {
          if (known.has(key)) continue;
          for (const [param, check] of index) {
            if (param(key) !== undefined) continue;
            const f = check(o[key]);
            if (f) return at(f, key);
          }
        }
      }
      return undefined;
    };
  };

  return compile;
};
let compileNode: ((n: Node) => Check) | undefined;

/** The checker for an output AST: compiled once per node, then reused. */
export const decoderFor = (ast: AST.AST): Decode => {
  let decode = decoders.get(ast);
  if (decode === undefined) {
    const check = (compileNode ??= makeCompile())(ast as unknown as Node);
    decode = (input) => {
      const f = check(input);
      return f === undefined
        ? undefined
        : new SchemaMismatch(f.path.reverse(), f.expected, f.actual);
    };
    decoders.set(ast, decode);
  }
  return decode;
};
const decoders = /*@__PURE__*/ new WeakMap<AST.AST, Decode>();
