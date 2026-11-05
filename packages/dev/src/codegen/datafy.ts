/**
 * Turn a tabled service module into data-described operations (dev-time
 * only; runs after `tableSchemas`; runtime: the "Data operations" region of
 * `@distilled.cloud/core/api`).
 *
 *   export const getFile: API.OperationMethod<...> = API.make(() => ({ input: __S(4, __c0, 4), ... }));
 *   function __c0(j: number): any { switch (j) { case 4: return S.Struct({ ... }); } }
 * becomes
 *   export const getFile: API.OperationMethod<...> = API.op((i: any): any =>
 *     i === API.D ? ['{input:#1,...};$3({...})', [__0, __4, ...]] : API.call(getFile, i));
 *   function __d0(): any { return ['...', [__0, ...]]; }
 *   const __0 = __L.at, __4 = S.Struct, ...;
 *
 * Each schema reached by one operation only moves into that operation's
 * arrow. Schemas reached by several roots (operations, error classes, other
 * module-level code) move into shared holders grouped by the exact set of
 * roots that reach them, so a bundle keeps a holder only when it needs all
 * of it. Unless the caller is about to bundle (and rename imports anyway),
 * schema-library and trait functions get short module-level aliases
 * (`__4 = S.Struct`) so holders list them cheaply and a bundler still drops
 * the unused ones. Thunk bodies (`S.suspend(() => ...)`) become entries of
 * their own. Expressions are encoded in the grammar documented in core/api.
 *
 * Every function a module defines costs heap and an object at import, and
 * its text stays in the heap as module source, so:
 *  - a module constant only data reads (`const svc = T.AwsApiService(...)`,
 *    the endpoint rules) moves, as written, into the refs of the holder of
 *    the roots that reach it, and is built on first use;
 *  - a constant expression repeated across holders (the service trait pipe
 *    of every input, a base URL) becomes one value entry, `~R:N`, in the
 *    holder of the roots that reach it (see `hoistConstants`);
 *  - an operation whose name recurs in its strings writes it once, as a
 *    stem (`API.named("GetThing", '..."%Request"...', refs)`).
 *
 * Error classes become data too: their `extends` expression is entry 0 of a
 * function that stands in for the class until first use (`API.error`):
 *   export class Oops extends S.TaggedError<Oops>()("Oops", { ... }) {}
 * becomes
 *   export const Oops = API.error(function Oops(i) {
 *     return API.newError(i, new.target, ['$1()("Oops",{...})', [...]]);
 *   });
 */
import { parseAst } from "rolldown/parseAst";

type Node = { readonly type: string; readonly start: number; readonly end: number } & Record<
  string,
  any
>;

const isNode = (v: unknown): v is Node =>
  v !== null && typeof v === "object" && typeof (v as Node).type === "string";

const strip = (n: Node): Node => {
  while (
    n.type === "TSAsExpression" ||
    n.type === "TSSatisfiesExpression" ||
    n.type === "TSNonNullExpression" ||
    n.type === "ParenthesizedExpression"
  )
    n = n.expression;
  return n;
};

/** `__S(i, __cK, j)` or `__L.at(__cK, j)` (consts the table pass kept) -> `K:j`, or undefined. */
const tableRef = (n: Node): string | undefined => {
  if (n.type !== "CallExpression") return undefined;
  const c = n.callee;
  const table = c.type === "Identifier" && c.name === "__S";
  const at = c.type === "MemberExpression" && c.object.name === "__L" && c.property.name === "at";
  if (!table && !at) return undefined;
  const [f, j] = (n.arguments as Node[]).slice(table ? 1 : 0);
  const m = /^__c(\d+)$/.exec(f!.name ?? "");
  if (!m || j!.type !== "Literal") throw new Error("datafy: unexpected __S call");
  return `${m[1]}:${j!.value}`;
};

const walk = (n: unknown, visit: (n: Node) => boolean): void => {
  if (Array.isArray(n)) {
    for (const c of n) walk(c, visit);
    return;
  }
  if (!isNode(n) || !visit(n)) return;
  for (const key in n) {
    const v = (n as any)[key];
    if (key !== "type" && v !== null && typeof v === "object") walk(v, visit);
  }
};

const IDENT = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

/** Whether `encode` (below) accepts an expression: the grammar's subset of JS. */
const encodable = (n: Node): boolean => {
  n = strip(n);
  if (tableRef(n)) return true;
  switch (n.type) {
    case "Literal": {
      const v = n.value;
      return (
        typeof v === "string" ||
        typeof v === "boolean" ||
        (typeof v === "number" && Number.isFinite(v)) ||
        (v === null && !n.regex && !n.bigint)
      );
    }
    case "TemplateLiteral":
      return !n.expressions.length;
    case "UnaryExpression":
      return (
        n.operator === "void" ||
        (n.operator === "-" &&
          n.argument.type === "Literal" &&
          typeof n.argument.value === "number")
      );
    case "Identifier":
      return true;
    case "MemberExpression":
      return !n.computed && encodable(n.object);
    case "CallExpression":
      return (
        encodable(n.callee) &&
        (n.arguments as Node[]).every((a) => a.type !== "SpreadElement" && encodable(a))
      );
    case "ObjectExpression":
      return (n.properties as Node[]).every(
        (p) =>
          p.type === "Property" &&
          p.kind === "init" &&
          !p.method &&
          ((!p.computed && p.key.type === "Identifier") || p.key.type === "Literal") &&
          encodable(p.value),
      );
    case "ArrayExpression":
      return (n.elements as Array<Node | null>).every(
        (e) => !!e && e.type !== "SpreadElement" && encodable(e),
      );
    case "ArrowFunctionExpression":
      return !n.params.length && n.body.type !== "BlockStatement" && encodable(n.body);
    default:
      return false;
  }
};

/**
 * A JSON string with every non-ASCII character, `;` (the entry separator)
 * and `%` (a holder's stem) escaped: the module source must stay one-byte.
 */
const quote = (s: string): string =>
  JSON.stringify(s).replace(
    /[^\x00-\x24\x26-\x3a\x3c-\x7f]/g,
    (c) => `\\u${c.charCodeAt(0).toString(16).padStart(4, "0")}`,
  );

/** Values that get a short module-level alias: namespace members of these imports. */
const VOCAB = /^(?:S|T|__L)\.[A-Za-z_$][\w$]*$/;

/** A data holder being written: its entries and the values they name. */
class Holder {
  readonly entries: string[] = [];
  readonly refs: string[] = ["__0"];
  readonly refIndex = new Map<string, number>([["__0", 0]]);
  /** node key -> entry index in this holder */
  readonly local = new Map<string, number>();
  readonly name: string;
  /** Written once at the start of the data, `%` in its strings (see `stemOf`). */
  stem?: string;
  constructor(name: string) {
    this.name = name;
  }
  ref(text: string): number {
    let i = this.refIndex.get(text);
    if (i === undefined) {
      i = this.refs.length;
      this.refs.push(text);
      this.refIndex.set(text, i);
    }
    return i;
  }
}

/** `x.annotate({ identifier: "X" })` -> `"X"` (encoded `x@"X"`), else undefined. */
const identifierOf = (n: Node): string | undefined => {
  const callee = strip(n.callee);
  const [arg] = n.arguments as Node[];
  const props = arg?.type === "ObjectExpression" ? (arg.properties as Node[]) : [];
  const p = props[0];
  return callee.property.name === "annotate" &&
    n.arguments.length === 1 &&
    props.length === 1 &&
    p!.type === "Property" &&
    !p!.computed &&
    p!.key.name === "identifier" &&
    p!.value.type === "Literal" &&
    typeof p!.value.value === "string"
    ? p!.value.value
    : undefined;
};

/**
 * The encoded form of an expression with every value named by identifier
 * (`$S.Struct`, `$svc`), and its estimated encoded length; undefined when
 * the expression names a schema entry or holds a thunk (it is not
 * constant). `onNode` sees every expression `encode` visits, children first.
 */
const canon = (
  n: Node,
  isNamespace: (n: Node) => boolean,
  onNode?: (n: Node, up: Node | undefined, key: string | undefined, len: number) => void,
  up?: Node,
): [string, number] | undefined => {
  n = strip(n);
  const go = (x: Node) => canon(x, isNamespace, onNode, n);
  const all = (xs: Node[]) => {
    const parts = xs.map(go);
    return parts.every((p) => p) ? (parts as Array<[string, number]>) : undefined;
  };
  const join = (ps: Array<[string, number]>) => ps.map((p) => p[0]).join(",");
  const width = (ps: Array<[string, number]>) => ps.reduce((a, p) => a + p[1] + 1, 0);
  let out: [string, number] | undefined;
  if (tableRef(n)) out = undefined;
  else
    switch (n.type) {
      case "Literal":
      case "TemplateLiteral":
      case "UnaryExpression": {
        const v =
          n.type === "TemplateLiteral"
            ? n.expressions.length
              ? undefined
              : quote(n.quasis[0].value.cooked)
            : n.type === "UnaryExpression"
              ? n.operator === "void"
                ? "u"
                : `-${n.argument.value}`
              : typeof n.value === "string"
                ? quote(n.value)
                : String(n.value);
        out = v === undefined ? undefined : [v, v.length];
        break;
      }
      case "Identifier":
        out = n.name === "undefined" ? ["u", 1] : [`$${n.name}`, 3];
        break;
      case "MemberExpression": {
        const obj = strip(n.object);
        if (isNamespace(obj)) out = [`$${obj.name}.${n.property.name}`, 3];
        else {
          const o = go(obj);
          out = o && [`${o[0]}.${n.property.name}`, o[1] + 1 + n.property.name.length];
        }
        break;
      }
      case "CallExpression": {
        const callee = strip(n.callee);
        if (callee.type === "MemberExpression" && !isNamespace(strip(callee.object))) {
          const o = go(callee.object);
          const name = callee.property.name as string;
          const id = identifierOf(n);
          if (id !== undefined) out = o && [`${o[0]}@${quote(id)}`, o[1] + 3 + id.length];
          else {
            const args = all(n.arguments as Node[]);
            out = o &&
              args && [`${o[0]}.${name}(${join(args)})`, o[1] + name.length + 2 + width(args)];
          }
        } else {
          const args = all(n.arguments as Node[]);
          const c = go(callee);
          out = c && args && [`${c[0]}(${join(args)})`, c[1] + 1 + width(args)];
        }
        break;
      }
      case "ObjectExpression": {
        const props = n.properties as Node[];
        const vals = all(props.map((p) => p.value));
        out = vals && [
          `{${props.map((p, i) => `${quote(String(p.key.name ?? p.key.value))}:${vals[i]![0]}`).join(",")}}`,
          props.reduce(
            (a, p, i) => a + String(p.key.name ?? p.key.value).length + 2 + vals[i]![1],
            1,
          ),
        ];
        break;
      }
      case "ArrayExpression": {
        const els = all(n.elements as Node[]);
        out = els && [`[${join(els)}]`, width(els) + 1];
        break;
      }
      case "ArrowFunctionExpression":
        go(n.body);
        out = undefined;
        break;
      default:
        out = undefined;
    }
  onNode?.(n, up, out?.[0], out?.[1] ?? 0);
  return out;
};

/** An operation's config; a paginated operation's `strategy` argument becomes a member. */
const configOf = (o: { name: string; config: Node; strategy?: Node }): Node => {
  if (!o.strategy) return o.config;
  const c = strip(o.config);
  if (c.type !== "ObjectExpression") throw new Error(`datafy: ${o.name} config is not an object`);
  const key = { type: "Identifier", start: 0, end: 0, name: "strategy" };
  const member = {
    type: "Property",
    start: 0,
    end: 0,
    kind: "init",
    method: false,
    computed: false,
    key,
    value: o.strategy,
  };
  return { ...c, properties: [...c.properties, member] };
};

/** A constant expression evaluated once per holder and shared by every place that named it. */
interface Value {
  readonly nodes: Node[];
  readonly holder: Holder;
  j: number;
  /** A module constant moved as written: the code of its initializer, a ref of the holder. */
  readonly code?: string;
}

/** Longest function (source characters) a moved module constant may hold. */
const MAX_MOVED_FUNCTION = 4000;

/** Shortest constant (encoded characters) worth a value entry. */
const MIN_LEN = 16;
/** Smallest saving (source characters) worth a value entry: each costs a bundle some indirection. */
const MIN_SAVING = 64;
/**
 * What a new holder must save first: about 300 characters of heap, plus the
 * function wrapper every bundle that keeps it pays.
 */
const NEW_HOLDER_COST = 3000;

/**
 * Common constant expressions (calls and longer strings that name no schema
 * entry) found in more than one place move into value entries: the
 * service trait pipe of every input, base URLs, ... Each lands in the holder of exactly the roots that reach it,
 * so a bundle still keeps only data its operations need. Biggest savings
 * first; a nested expression only counts where its container stays.
 */
const hoistConstants = (
  roots: ReadonlyArray<[Node, Holder]>,
  isNamespace: (n: Node) => boolean,
  holderOf: (key: string, create: boolean) => Holder | undefined,
  rootsOf: Map<Holder, string>,
  pinned: ReadonlyMap<string, string>,
): Value[] => {
  const pinnedUses = new Map<string, Node[]>();
  const parent = new Map<Node, Node>();
  const container = new Map<Node, Holder>();
  const byKey = new Map<string, { len: number; nodes: Node[] }>();
  for (const [root, h] of roots) {
    container.set(strip(root), h);
    canon(root, isNamespace, (n, up, key, len) => {
      if (up) parent.set(n, up);
      if (n.type === "Identifier" && pinned.has(n.name)) {
        let uses = pinnedUses.get(n.name);
        if (!uses) pinnedUses.set(n.name, (uses = []));
        uses.push(n);
      }
      if (key === undefined) return;
      const candidate =
        (len >= MIN_LEN && n.type === "CallExpression" && n.arguments.length > 0) ||
        ((n.type === "Literal" || n.type === "TemplateLiteral") && len >= MIN_LEN);
      if (!candidate) return;
      let c = byKey.get(key);
      if (!c) byKey.set(key, (c = { len, nodes: [] }));
      c.nodes.push(n);
    });
  }
  const valueOf = new Map<Node, Value>();
  const liveIn = (n: Node): Holder | undefined => {
    for (let x = n; ;) {
      const p = parent.get(x);
      if (!p) return container.get(x);
      const v = valueOf.get(p);
      if (v) return v.nodes[0] === p ? v.holder : undefined;
      x = p;
    }
  };
  const keyOf = (holders: Iterable<Holder>) => {
    const rs = new Set<number>();
    for (const h of holders) for (const r of rootsOf.get(h)!.split(",")) rs.add(+r);
    return [...rs].sort((a, b) => a - b).join(",");
  };
  // Each moved constant was at least one object at import; the holder it moves to may be new.
  let newHolders = Math.max(0, pinned.size - 1);
  const values: Value[] = [];
  const candidates = [...byKey.values()]
    .filter((c) => c.nodes.length > 1)
    .sort((a, b) => (b.nodes.length - 1) * b.len - (a.nodes.length - 1) * a.len);
  for (const c of candidates) {
    const live: Array<[Node, Holder]> = [];
    for (const n of c.nodes) {
      const h = liveIn(n);
      if (h) live.push([n, h]);
    }
    if (live.length < 2) continue;
    const key = keyOf(live.map(([, h]) => h));
    const existing = holderOf(key, false);
    // A new holder is one more function at import: only as many as moved constants free.
    if (!existing && !newHolders) continue;
    let cost = c.len + (existing ? 0 : NEW_HOLDER_COST);
    const users = new Set<Holder>();
    for (const [, h] of live) {
      cost += h === existing ? 3 : 6;
      users.add(h);
    }
    cost += 6 * [...users].filter((h) => h !== existing).length;
    if (live.length * c.len - cost < MIN_SAVING) continue;
    if (!existing) newHolders--;
    const holder = existing ?? holderOf(key, true)!;
    rootsOf.set(holder, key);
    const v: Value = { nodes: live.map(([n]) => n), holder, j: -1 };
    for (const n of v.nodes) valueOf.set(n, v);
    values.push(v);
  }
  for (const [name, code] of pinned) {
    const live: Array<[Node, Holder]> = [];
    for (const n of pinnedUses.get(name) ?? []) {
      const h = liveIn(n);
      if (h) live.push([n, h]);
    }
    if (!live.length) throw new Error(`datafy: constant ${name} has no live reader`);
    const key = keyOf(live.map(([, h]) => h));
    const holder = holderOf(key, true)!;
    rootsOf.set(holder, key);
    values.push({ nodes: live.map(([n]) => n), holder, j: -1, code });
  }
  return values;
};

const STRING = /"(?:[^"\\]|\\.)*"/g;
const STEM = /^[\w.-]{4,}$/;

/**
 * An operation's name recurs in its strings (`"GetThing"`, `"GetThingRequest"`,
 * `"GetThingOutput"`): the string that saves most when written once as the
 * holder's stem and as `%` everywhere else becomes the stem.
 */
const stemOf = (h: Holder): void => {
  const strings = h.entries.flatMap((e) => e.match(STRING) ?? []).map((t) => t.slice(1, -1));
  let best = 0;
  for (const c of new Set(strings)) {
    if (!STEM.test(c)) continue;
    let uses = 0;
    for (const t of strings) uses += t.split(c).length - 1;
    const saving = uses * (c.length - 1) - (c.length + 4);
    if (saving > best) [best, h.stem] = [saving, c];
  }
  const stem = h.stem;
  if (stem)
    for (let j = 0; j < h.entries.length; j++)
      h.entries[j] = h.entries[j]!.replace(STRING, (t) => t.split(stem).join("%"));
};

export const datafyOperations = (
  code: string,
  filename = "generated.ts",
  /**
   * Short module-level aliases for namespace members (`const __4 = S.Struct`).
   * A bundler that is about to rename imports anyway does not need them.
   */
  { aliases: aliased = true }: { aliases?: boolean } = {},
): { code: string; operations: number; holders: number; errors: number } => {
  if (!/\bfunction __S\(/.test(code)) return { code, operations: 0, holders: 0, errors: 0 };
  const program = parseAst(code, { sourceType: "module", lang: "ts" }, filename);
  const body = program.body as unknown as Node[];
  const text = (n: Node) => code.slice(n.start, n.end);
  // `import * as X`: `X.y` is a plain value; any other receiver keeps `this` in calls.
  const namespaces = new Set<string>();
  for (const st of body)
    if (st.type === "ImportDeclaration" && st.importKind !== "type")
      for (const sp of st.specifiers as Node[])
        if (sp.type === "ImportNamespaceSpecifier") namespaces.add(sp.local.name);
  const isNamespace = (n: Node) => n.type === "Identifier" && namespaces.has(n.name);
  // Emitted JS (lib/) gets no type annotations.
  const ts = !filename.endsWith(".js");
  const any = ts ? ": any" : "";

  // Graph nodes: schemas (`K:j`, from the builders).
  const nodes = new Map<string, Node>();
  const removals: Node[] = [];
  // A root: an operation (`init` is its `API.make(...)` call) or an error
  // class (`init` is its whole statement, `config` its `extends` expression).
  type Op = {
    name: string;
    init: Node;
    paginated: boolean;
    config: Node;
    strategy?: Node;
    error?: { exported: boolean };
  };
  const ops: Op[] = [];
  const errors: Op[] = [];
  const rest: Node[] = [];
  for (const st of body) {
    const cls = st.type === "ExportNamedDeclaration" ? st.declaration : st;
    if (
      cls?.type === "ClassDeclaration" &&
      cls.id &&
      cls.superClass &&
      !cls.body.body.length &&
      !cls.decorators?.length &&
      encodable(cls.superClass)
    ) {
      errors.push({
        name: cls.id.name,
        init: st,
        paginated: false,
        config: cls.superClass,
        error: { exported: st !== cls },
      });
      continue;
    }
    if (st.type === "FunctionDeclaration" && /^__c\d+$/.test(st.id?.name ?? "")) {
      const k = st.id.name.slice(3);
      const sw = st.body.body[0] as Node;
      if (sw?.type !== "SwitchStatement") throw new Error(`datafy: ${st.id.name} is not a switch`);
      for (const c of sw.cases as Node[]) {
        const ret = c.consequent[0] as Node;
        if (ret?.type !== "ReturnStatement") throw new Error("datafy: case without return");
        nodes.set(`${k}:${c.test.value}`, ret.argument);
      }
      removals.push(st);
      continue;
    }
    if (st.type === "FunctionDeclaration" && st.id?.name === "__S") {
      removals.push(st);
      continue;
    }
    if (st.type === "VariableDeclaration" && st.declarations.length === 1) {
      const d = st.declarations[0] as Node;
      if (d.id.name === "__s") {
        removals.push(st);
        continue;
      }
    }
    const decl = st.type === "ExportNamedDeclaration" ? st.declaration : st;
    if (decl?.type === "VariableDeclaration" && decl.declarations.length === 1) {
      const d = decl.declarations[0] as Node;
      const init = d.init ? strip(d.init) : undefined;
      if (
        init?.type === "CallExpression" &&
        init.callee.type === "MemberExpression" &&
        init.callee.object.name === "API" &&
        (init.callee.property.name === "make" || init.callee.property.name === "makePaginated")
      ) {
        const [fn, strategy] = init.arguments as Node[];
        if (
          fn?.type !== "ArrowFunctionExpression" ||
          fn.params.length ||
          fn.body.type === "BlockStatement"
        )
          throw new Error(`datafy: unexpected operation form in ${d.id.name}`);
        ops.push({
          name: d.id.name,
          init: d.init,
          paginated: init.callee.property.name === "makePaginated",
          config: strip(fn.body),
          strategy,
        });
        continue;
      }
    }
    if (st.type !== "ImportDeclaration") rest.push(st);
  }
  if (!ops.length && !errors.length) return { code, operations: 0, holders: 0, errors: 0 };
  const operations = ops.length;
  // From here on an error class is a root like an operation; its entry 0 is its base class.
  ops.push(...errors);

  // Module constants only data reads (service traits, endpoint rules, ...)
  // move, as written, into the holder of the roots that reach them.
  const reads = (n: unknown, name: string): number => {
    let count = 0;
    walk(n, (x) => {
      if (x.type === "Identifier" && x.name === name) count++;
      return true;
    });
    return count;
  };
  const dataRoots: unknown[] = [[...nodes.values()], ops.map((o) => [o.config, o.strategy])];
  const pinnable = new Map<string, { st: Node; init: Node }>();
  for (const st of rest) {
    if (st.type !== "VariableDeclaration" || st.kind !== "const" || st.declarations.length !== 1)
      continue;
    const d = st.declarations[0] as Node;
    if (d.id.type !== "Identifier" || !d.init || strip(d.init).type !== "CallExpression") continue;
    if (!/\/\*[@#]__PURE__\*\/\s*$/.test(code.slice(Math.max(0, d.init.start - 20), d.init.start)))
      continue;
    let internal = false;
    walk(d.init, (x) => {
      if (tableRef(x) || (x.type === "Identifier" && /^__[cSs]\d*$/.test(x.name))) internal = true;
      // A first call would parse a big function twice (holder, then itself): it stays.
      if (/Function/.test(x.type) && x.end - x.start > MAX_MOVED_FUNCTION) internal = true;
      return true;
    });
    if (!internal) pinnable.set(d.id.name, { st, init: d.init });
  }
  for (let changed = true; changed;) {
    changed = false;
    for (const [name, c] of pinnable) {
      const outside = rest.some((st) => st !== c.st && reads(st, name) > 0);
      const chained = [...pinnable.keys()].some((other) => reads(c.init, other) > 0);
      if (outside || chained || reads(c.init, name) || !reads(dataRoots, name)) {
        pinnable.delete(name);
        changed = true;
      }
    }
  }
  const pinned = new Map<string, string>();
  for (const [name, c] of pinnable) {
    pinned.set(name, text(c.init));
    removals.push(c.st);
  }
  const roots = rest.filter((st) => !removals.includes(st));

  /** Graph nodes an expression names. */
  const refsOf = (n: unknown): Set<string> => {
    const out = new Set<string>();
    walk(n, (x) => {
      const k = tableRef(x);
      if (k) out.add(k);
      return !k;
    });
    return out;
  };

  // Reachability: which roots reach each node.
  const edges = new Map<string, Set<string>>();
  for (const [k, n] of nodes) edges.set(k, refsOf(n));
  const otherRoots = roots.filter((st) => refsOf(st).size);
  const rootRefs = [...ops.map((o) => refsOf(o.config)), ...otherRoots.map((st) => refsOf(st))];
  const reachedBy = new Map<string, number[]>();
  rootRefs.forEach((start, r) => {
    const seen = new Set<string>();
    const stack = [...start];
    while (stack.length) {
      const k = stack.pop()!;
      if (seen.has(k)) continue;
      seen.add(k);
      if (!nodes.has(k)) throw new Error(`datafy: missing schema ${k}`);
      let list = reachedBy.get(k);
      if (!list) reachedBy.set(k, (list = []));
      list.push(r);
      for (const x of edges.get(k)!) stack.push(x);
    }
  });

  // Placement: an operation's own holder, or a shared holder per root set.
  const opHolders = ops.map((o) => new Holder(o.name));
  const shared = new Map<string, Holder>();
  const home = new Map<string, Holder>();
  for (const k of nodes.keys()) {
    const rs = reachedBy.get(k);
    if (!rs) continue; // unreachable: dropped
    let h: Holder;
    if (rs.length === 1 && rs[0]! < ops.length) h = opHolders[rs[0]!]!;
    else {
      const key = rs.join(",");
      h = shared.get(key) ?? new Holder(`__d${shared.size}`);
      shared.set(key, h);
    }
    home.set(k, h);
  }
  // Entry indexes: operation config first, then nodes in source order.
  for (const h of opHolders) h.entries.push("");
  for (const [k, h] of home) {
    h.local.set(k, h.entries.length);
    h.entries.push("");
  }

  // Aliases: `__0` is `at`; other namespace members are numbered on first use.
  const aliases = new Map<string, string>([["__L.at", "__0"]]);
  const alias = (t: string): string => {
    let a = aliases.get(t);
    if (!a) aliases.set(t, (a = `__${aliases.size}`));
    return a;
  };

  const nodeRef = (k: string, h: Holder): string => {
    const target = home.get(k)!;
    const j = target.local.get(k)!;
    if (target === h) return `#${j}`;
    return `#${h.ref(target.name)}:${j}`;
  };

  const configs = ops.map(configOf);

  // Repeated constant expressions become value entries (`~N`, `~R:N`).
  const holderOfKey = (key: string, create: boolean): Holder | undefined => {
    const rs = key.split(",").map(Number);
    if (rs.length === 1 && rs[0]! < ops.length) return opHolders[rs[0]!]!;
    let h = shared.get(key);
    if (!h && create) shared.set(key, (h = new Holder(`__d${shared.size}`)));
    return h;
  };
  const rootsOf = new Map<Holder, string>();
  opHolders.forEach((h, i) => rootsOf.set(h, String(i)));
  for (const [key, h] of shared) rootsOf.set(h, key);
  const exprRoots: Array<[Node, Holder]> = [...home].map(([k, h]) => [nodes.get(k)!, h]);
  configs.forEach((c, i) => exprRoots.push([c, opHolders[i]!]));
  const values = hoistConstants(exprRoots, isNamespace, holderOfKey, rootsOf, pinned);
  for (const v of values) {
    v.j = v.holder.entries.length;
    v.holder.entries.push("");
  }
  const valueOf = new Map<Node, Value>();
  for (const v of values) for (const n of v.nodes) valueOf.set(n, v);

  const encode = (n: Node, h: Holder, self?: Value): string => {
    const value = (t: string): string => `$${h.ref(aliased && VOCAB.test(t) ? alias(t) : t)}`;
    n = strip(n);
    const v = valueOf.get(n);
    if (v && v !== self) return v.holder === h ? `~${v.j}` : `~${h.ref(v.holder.name)}:${v.j}`;
    const k = tableRef(n);
    if (k) return nodeRef(k, h);
    const enc = (x: Node) => encode(x, h);
    switch (n.type) {
      case "Literal": {
        const v = n.value;
        if (typeof v === "string") return quote(v);
        if (typeof v === "number" && Number.isFinite(v)) return String(v);
        if (typeof v === "boolean") return String(v);
        if (v === null && !n.regex && !n.bigint) return "null";
        throw new Error(`datafy: unsupported literal ${text(n)}`);
      }
      case "TemplateLiteral":
        if (n.expressions.length) throw new Error("datafy: template with expressions");
        return quote(n.quasis[0].value.cooked);
      case "UnaryExpression":
        if (
          n.operator === "-" &&
          n.argument.type === "Literal" &&
          typeof n.argument.value === "number"
        )
          return String(-n.argument.value);
        if (n.operator === "void") return "u";
        throw new Error(`datafy: unsupported unary ${text(n)}`);
      case "Identifier":
        if (n.name === "undefined") return "u";
        return value(n.name);
      case "MemberExpression": {
        if (n.computed) throw new Error(`datafy: computed member ${text(n)}`);
        const obj = strip(n.object);
        // `S.String`, `Retry.Retry`: one value.
        if (isNamespace(obj)) return value(`${obj.name}.${n.property.name}`);
        return `${enc(obj)}.${n.property.name}`;
      }
      case "CallExpression": {
        const args = (n.arguments as Node[]).map((a) => {
          if (a.type === "SpreadElement") throw new Error("datafy: spread argument");
          return enc(a);
        });
        const callee = strip(n.callee);
        // `S.Struct(...)` calls the namespace member as a plain function;
        // `x.pipe(...)` on any other receiver is a method call.
        if (
          callee.type === "MemberExpression" &&
          !callee.computed &&
          !isNamespace(strip(callee.object))
        ) {
          // `.annotate({ identifier: "X" })`, on most schemas: `@"X"`.
          const id = identifierOf(n);
          if (id !== undefined) return `${enc(callee.object)}@${quote(id)}`;
          return `${enc(callee.object)}.${callee.property.name}(${args.join(",")})`;
        }
        return `${enc(callee)}(${args.join(",")})`;
      }
      case "ObjectExpression":
        return `{${(n.properties as Node[])
          .map((p) => {
            if (p.type !== "Property" || p.kind !== "init" || p.method)
              throw new Error(`datafy: unsupported property ${text(p)}`);
            let key: string;
            if (!p.computed && p.key.type === "Identifier") key = p.key.name;
            else if (p.key.type === "Literal") key = String(p.key.value);
            else throw new Error(`datafy: unsupported key ${text(p)}`);
            return `${IDENT.test(key) ? key : quote(key)}:${enc(p.value)}`;
          })
          .join(",")}}`;
      case "ArrayExpression":
        return `[${(n.elements as Array<Node | null>)
          .map((e) => {
            if (!e || e.type === "SpreadElement") throw new Error("datafy: array hole or spread");
            return enc(e);
          })
          .join(",")}]`;
      case "ArrowFunctionExpression":
        if (n.params.length || n.body.type === "BlockStatement")
          throw new Error(`datafy: unsupported function ${text(n).slice(0, 80)}`);
        {
          // The body becomes its own entry, so a reader never has to skip it.
          const j = h.entries.length;
          h.entries.push("");
          h.entries[j] = enc(n.body);
          return `>${j}`;
        }
      default:
        throw new Error(`datafy: unsupported ${n.type}: ${text(n).slice(0, 80)}`);
    }
  };

  for (const [k, h] of home) h.entries[h.local.get(k)!] = encode(nodes.get(k)!, h);
  configs.forEach((c, i) => (opHolders[i]!.entries[0] = encode(c, opHolders[i]!)));
  for (const v of values)
    v.holder.entries[v.j] = v.code ? `$${v.holder.ref(v.code)}` : encode(v.nodes[0]!, v.holder, v);

  // Operations only: an error class's data is built on every construction.
  for (const h of opHolders.slice(0, operations)) stemOf(h);

  // The data string is a single-quoted JS literal.
  const literal = (h: Holder) => {
    const data = `'${h.entries.join(";").replace(/[\\']/g, (c) => `\\${c}`)}'`;
    const refs = `[${(aliased ? h.refs : ["__L.at", ...h.refs.slice(1)]).join(", ")}]`;
    return h.stem ? `API.named(${quote(h.stem)}, ${data}, ${refs})` : `[${data}, ${refs}]`;
  };

  const edits: Array<[number, number, string]> = [];
  for (const st of removals) {
    let end = st.end;
    while (code[end] === "\n") end++;
    edits.push([st.start, end, ""]);
  }
  ops.forEach((o, i) => {
    if (o.error) {
      // A plain function, not an arrow: it is the class (`new`, `instanceof`, `extends`).
      edits.push([
        o.init.start,
        o.init.end,
        `${o.error.exported ? "export " : ""}const ${o.name}${any} = /*@__PURE__*/ API.error(function ${o.name}(i${any})${any} {\n  return API.newError(i, new.target, ${literal(opHolders[i]!)});\n});`,
      ]);
      return;
    }
    const fn = o.paginated ? "API.opPaginated" : "API.op";
    const marked = /\/\*[@#]__PURE__\*\/\s*$/.test(code.slice(o.init.start - 20, o.init.start));
    edits.push([
      o.init.start,
      o.init.end,
      `${marked ? "" : "/*@__PURE__*/ "}${fn}((i${any})${any} => i === API.D ? ${literal(opHolders[i]!)} : API.call(${o.name}, i))`,
    ]);
  });
  // Module-level code that names a schema at import (error classes).
  for (const st of otherRoots)
    walk(st, (n) => {
      const k = tableRef(n);
      if (!k) return true;
      const target = home.get(k)!;
      edits.push([n.start, n.end, `API.schema(${target.name}, ${target.local.get(k)})`]);
      return false;
    });

  edits.sort((a, b) => a[0] - b[0]);
  const parts: string[] = [];
  let pos = 0;
  for (const [s, e, t] of edits) {
    if (s < pos) throw new Error("datafy: overlapping edits");
    parts.push(code.slice(pos, s), t);
    pos = e;
  }
  parts.push(code.slice(pos));
  let out = parts.join("");
  out = out.replace(/\n*$/, "\n").replace(/^\/\/ Schema table, filled on first reach.*\n/m, "");
  if (shared.size)
    out +=
      "\n// Shared schema data (see `op` in core/api).\n" +
      [...shared.values()]
        .map((h) => `function ${h.name}()${any} {\n  return ${literal(h)};\n}\n`)
        .join("");
  // Aliases go right after the imports: error classes reach schemas while the module evaluates.
  const lastImport = [...body].reverse().find((st) => st.type === "ImportDeclaration");
  const at = lastImport ? lastImport.end : 0;
  const decls = aliased ? [...aliases].map(([t, a]) => `const ${a} = ${t};`) : [];
  out = `${out.slice(0, at)}\n${decls.join("\n")}${out.slice(at)}`;
  return { code: out, operations, holders: shared.size, errors: errors.length };
};
