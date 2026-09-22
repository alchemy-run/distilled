/**
 * GraphQL Query algebra — the runtime generated GraphQL SDKs target.
 *
 * ── Why this exists ────────────────────────────────────────────────────────
 * A GraphQL document is a *selection*, not an RPC. Distilled used to bake a
 * max-depth selection into every operation (`Railway.me({})` downloaded the
 * world). This module instead treats every field as a lazy `Query<Value>`:
 * reading `user.email` records that field, and nothing is posted until
 * `Query.fn` evaluates the plan you returned.
 *
 * ── The two phases ─────────────────────────────────────────────────────────
 * 1. Build (your function). `Railway.me()` / `user.email` / `Query.map` do
 *    not talk to the network. They construct an expression tree:
 *      Of | Map | Filter | FlatMap | Prop | Root
 *    The inner function of `Query.fn` is therefore a *builder*, not an
 *    Effect generator. No `yield*` inside it.
 *
 * 2. Evaluate (`Query.fn`). Walk the returned plan, paint every GraphQL
 *    field that appears onto one selection forest, POST that document
 *    once through {@link GqlTransport}, then interpret Map/Filter/FlatMap
 *    against the JSON. Effects reached via FlatMap (e.g.
 *    `usernameIsAvailable(name)`) run *after* the POST, with real values.
 *
 * ── Combinators ────────────────────────────────────────────────────────────
 * - `Query.of(x)` — a literal; never selected.
 * - `Query.map` on a list — callback receives `Query<Item>` so `p.name` is
 *   still a Query (selected). On a scalar, callback receives the value
 *   after extract (`stars => stars > 5`).
 * - `Query.filter` — predicate is `Query<Item> => Query<boolean>`; the
 *   boolean Query is walked for fields, then run per row after the POST.
 * - `Query.flatMap` — after extract, run `(value) => Effect | Query`.
 *
 * ── Types ──────────────────────────────────────────────────────────────────
 * `Query<Value>` is `QueryNode<Value>` plus the GraphQL fields of `Value`,
 * so `user.name` type-checks. That copy is a circular type alias
 * (`Query<User>` contains `Query<Project[]>` which contains `Query<User>`
 * again). TypeScript leaves the cycle lazy; there is no depth cap.
 *
 * ── Transport ──────────────────────────────────────────────────────────────
 * {@link GqlTransport.execute} posts `{ query, variables, operationName }`.
 * The Effect it returns may require Credentials / HttpClient; those leak
 * into `Query.fn`'s requirements. Compile failures are {@link GqlError}.
 *
 * Generated SDKs export *roots* (`Railway.me`, `Railway.project`).
 * Combinators live in `@distilled.cloud/core/query`.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";

export const QuerySymbol = Symbol.for("@distilled.cloud/graphql/Query");
const inspect = Symbol.for("nodejs.util.inspect.custom");

export class GqlError {
  readonly _tag = "GqlError" as const;
  constructor(readonly message: string) {}
}

export type ArgMeta = Record<string, string>;

export type FieldMeta = {
  readonly name: string;
  readonly kind: "scalar" | "object" | "list";
  readonly of?: TypeMeta;
  readonly argTypes?: ArgMeta;
};

export type TypeMeta = {
  readonly name: string;
  readonly fields: Record<string, FieldMeta>;
};

export const scalarField = (name: string): FieldMeta => ({
  name,
  kind: "scalar",
});
export const objectField = (name: string, objectType: TypeMeta): FieldMeta => ({
  name,
  kind: "object",
  of: objectType,
});
export const listField = (
  name: string,
  itemType: TypeMeta,
  argTypes?: ArgMeta,
): FieldMeta => ({
  name,
  kind: "list",
  of: itemType,
  argTypes,
});

export type TypeRef =
  | { readonly tag: "scalar" }
  | { readonly tag: "object"; readonly meta: TypeMeta }
  | { readonly tag: "list"; readonly of: TypeRef };

const objectRef = (meta: TypeMeta): TypeRef => ({ tag: "object", meta });
const listRef = (itemType: TypeRef): TypeRef => ({
  tag: "list",
  of: itemType,
});

const fieldResult = (parent: TypeRef, field: FieldMeta): TypeRef => {
  const inner = (): TypeRef => {
    if (field.kind === "scalar") return { tag: "scalar" };
    if (field.kind === "object") return objectRef(field.of!);
    return listRef(objectRef(field.of!));
  };
  return parent.tag === "list"
    ? listRef(fieldResult(parent.of, field))
    : inner();
};

const unwrapList = (typeRef: TypeRef): TypeRef => {
  if (typeRef.tag !== "list") throw new GqlError("expected a list Query");
  return typeRef.of;
};

const fieldsOf = (typeRef: TypeRef): Record<string, FieldMeta> => {
  if (typeRef.tag === "object") return typeRef.meta.fields;
  if (typeRef.tag === "list") return fieldsOf(typeRef.of);
  return {};
};

export interface SelNode {
  field: string;
  alias: string | undefined;
  args: Record<string, string> | undefined;
  children: Map<string, SelNode>;
  isScalar: boolean;
  isList: boolean;
}

export interface CompiledOperation {
  readonly document: string;
  readonly operationName: string;
  readonly variables: Record<string, unknown>;
  readonly kind: "query" | "mutation";
  readonly tree: SelNode;
}

export class GqlTransport extends Context.Service<
  GqlTransport,
  {
    readonly execute: (
      req: CompiledOperation,
    ) => Effect.Effect<{ readonly data: unknown }, unknown, any>;
  }
>()("@distilled.cloud/graphql/Transport") {}

const log = (..._args: Array<unknown>): void => {};

/**
 * GraphQL fields copied onto a Query so `user.name` type-checks.
 * `Query<User>` contains `projects: Query<Project[]>`, which contains
 * `owner: Query<User>` again — TypeScript allows that cycle on a type
 * alias as long as we do not add a second type parameter.
 */
type QueryFields<Value> = [Value] extends [ReadonlyArray<infer Item>]
  ? {
      readonly [Field in keyof Item]: Query<Item[Field]>;
    } & {
      (args: Record<string, unknown>): Query<Value>;
    }
  : [Value] extends [object]
    ? { readonly [Field in keyof Value]: Query<Value[Field]> }
    : {};

/**
 * A lazy GraphQL selection. `Value` is the plain data after `Query.fn` runs.
 */
export type Query<Value> = QueryNode<Value> & QueryFields<Value>;

/** Strip Query/Effect wrappers from a returned plan down to plain data. */
export type UnwrapPlan<Plan> =
  Plan extends QueryNode<infer Value>
    ? Value
    : Plan extends Effect.Effect<infer Success, any, any>
      ? Success
      : Plan extends ReadonlyArray<infer Element>
        ? ReadonlyArray<UnwrapPlan<Element>>
        : Plan extends object
          ? { readonly [Key in keyof Plan]: UnwrapPlan<Plan[Key]> }
          : Plan;

type Expr =
  | RootExpr
  | PropExpr
  | ItemExpr
  | MapValueExpr
  | MapItemsExpr
  | FilterExpr
  | FlatMapExpr
  | LiteralExpr;

type RootExpr = {
  readonly _tag: "Root";
  readonly op: "query" | "mutation";
  readonly field: string;
  readonly args: Record<string, unknown> | undefined;
  readonly argTypes: ArgMeta | undefined;
  readonly type: TypeRef;
};

type PropExpr = {
  readonly _tag: "Prop";
  readonly parent: Expr;
  readonly field: FieldMeta;
  readonly type: TypeRef;
  readonly args?: Record<string, unknown>;
};

type ItemExpr = {
  readonly _tag: "Item";
  readonly list: Expr;
  readonly type: TypeRef;
};

type MapValueExpr = {
  readonly _tag: "MapValue";
  readonly parent: Expr;
  readonly mapFn: (value: unknown) => unknown;
  readonly type: TypeRef;
};

type MapItemsExpr = {
  readonly _tag: "MapItems";
  readonly parent: Expr;
  readonly mapped: unknown;
  readonly type: TypeRef;
};

type FilterExpr = {
  readonly _tag: "Filter";
  readonly parent: Expr;
  readonly predicate: Expr;
  readonly type: TypeRef;
};

type FlatMapExpr = {
  readonly _tag: "FlatMap";
  readonly parent: Expr;
  readonly flatMapFn: (value: unknown) => unknown;
  readonly type: TypeRef;
};

type LiteralExpr = {
  readonly _tag: "Literal";
  readonly value: unknown;
  readonly type: TypeRef;
};

export class QueryNode<out Value = unknown> {
  readonly [QuerySymbol] = QuerySymbol;
  declare readonly valueType: Value;
  constructor(readonly expr: Expr) {
    return proxy(this) as QueryNode<Value>;
  }
  pipe<Self>(this: Self): Self;
  pipe<Self, Out1>(this: Self, step1: (_: Self) => Out1): Out1;
  pipe<Self, Out1, Out2>(
    this: Self,
    step1: (_: Self) => Out1,
    step2: (_: Out1) => Out2,
  ): Out2;
  pipe<Self, Out1, Out2, Out3>(
    this: Self,
    step1: (_: Self) => Out1,
    step2: (_: Out1) => Out2,
    step3: (_: Out2) => Out3,
  ): Out3;
  pipe<Self, Out1, Out2, Out3, Out4>(
    this: Self,
    step1: (_: Self) => Out1,
    step2: (_: Out1) => Out2,
    step3: (_: Out2) => Out3,
    step4: (_: Out3) => Out4,
  ): Out4;
  pipe<Self, Out1, Out2, Out3, Out4, Out5>(
    this: Self,
    step1: (_: Self) => Out1,
    step2: (_: Out1) => Out2,
    step3: (_: Out2) => Out3,
    step4: (_: Out3) => Out4,
    step5: (_: Out4) => Out5,
  ): Out5;
  pipe<Self, Out1, Out2, Out3, Out4, Out5, Out6>(
    this: Self,
    step1: (_: Self) => Out1,
    step2: (_: Out1) => Out2,
    step3: (_: Out2) => Out3,
    step4: (_: Out3) => Out4,
    step5: (_: Out4) => Out5,
    step6: (_: Out5) => Out6,
  ): Out6;
  pipe<Self, Out1, Out2, Out3, Out4, Out5, Out6, Out7>(
    this: Self,
    step1: (_: Self) => Out1,
    step2: (_: Out1) => Out2,
    step3: (_: Out2) => Out3,
    step4: (_: Out3) => Out4,
    step5: (_: Out4) => Out5,
    step6: (_: Out5) => Out6,
    step7: (_: Out6) => Out7,
  ): Out7;
  pipe<Self, Out1, Out2, Out3, Out4, Out5, Out6, Out7, Out8>(
    this: Self,
    step1: (_: Self) => Out1,
    step2: (_: Out1) => Out2,
    step3: (_: Out2) => Out3,
    step4: (_: Out3) => Out4,
    step5: (_: Out4) => Out5,
    step6: (_: Out5) => Out6,
    step7: (_: Out6) => Out7,
    step8: (_: Out7) => Out8,
  ): Out8;
  pipe(...steps: Array<(_: any) => any>): unknown {
    return steps.reduce((current, step) => step(current), this as never);
  }
  [inspect](): string {
    return printExpr(this.expr);
  }
  toString(): string {
    return this[inspect]();
  }
}

export const isQuery = (value: unknown): value is Query<unknown> =>
  (typeof value === "object" || typeof value === "function") &&
  value !== null &&
  QuerySymbol in value;

const make = <Value>(expr: Expr): Query<Value> =>
  new QueryNode<Value>(expr) as unknown as Query<Value>;

const itemQuery = (list: QueryNode): QueryNode =>
  new QueryNode({
    _tag: "Item",
    list: list.expr,
    type: unwrapList(list.expr.type),
  });

function proxy(self: QueryNode): Query<unknown> {
  const callable = Object.assign(function (bag?: Record<string, unknown>) {
    return bag == null ? self : applyBag(self, bag);
  }, self);
  return new Proxy(callable, {
    has: (_, prop) =>
      prop === QuerySymbol ||
      prop === inspect ||
      prop in self ||
      (typeof prop === "string" && prop in fieldsOf(self.expr.type)),
    get: (_target, prop) => {
      if (prop === QuerySymbol) return QuerySymbol;
      if (prop === inspect) return self[inspect].bind(self);
      if (prop === "pipe") return self.pipe.bind(self);
      if (typeof prop === "string" && prop in self) {
        const member = (self as unknown as Record<string, unknown>)[prop];
        return typeof member === "function" ? member.bind(self) : member;
      }
      if (typeof prop !== "string") return undefined;
      const field = fieldsOf(self.expr.type)[prop];
      if (!field) return undefined;
      return make({
        _tag: "Prop",
        parent: self.expr,
        field,
        type: fieldResult(self.expr.type, field),
      });
    },
    apply: (_target, _thisArg, args) => applyBag(self, args[0] ?? {}),
  }) as unknown as Query<unknown>;
}

const applyBag = <Value>(
  self: QueryNode<Value>,
  bag: Record<string, unknown>,
): Query<Value> => {
  const argTypes =
    self.expr._tag === "Prop"
      ? self.expr.field.argTypes
      : self.expr._tag === "Root"
        ? self.expr.argTypes
        : undefined;
  const args: Record<string, unknown> = {};
  for (const [argName, argValue] of Object.entries(bag)) {
    if (argTypes && argName in argTypes) args[argName] = argValue;
  }
  if (self.expr._tag === "Prop") {
    return make<Value>({
      ...self.expr,
      args: { ...self.expr.args, ...args },
    });
  }
  if (self.expr._tag === "Root") {
    return make<Value>({
      ...self.expr,
      args: { ...self.expr.args, ...args },
    });
  }
  return self as unknown as Query<Value>;
};

export const root = <Value>(
  op: "query" | "mutation",
  field: string,
  meta: TypeMeta,
  args?: Record<string, unknown>,
  argTypes?: ArgMeta,
): Query<Value> =>
  make({
    _tag: "Root",
    op,
    field,
    args,
    argTypes,
    type: objectRef(meta),
  });

export const rootList = <Item>(
  op: "query" | "mutation",
  field: string,
  meta: TypeMeta,
  args?: Record<string, unknown>,
  argTypes?: ArgMeta,
): Query<ReadonlyArray<Item>> =>
  make({
    _tag: "Root",
    op,
    field,
    args,
    argTypes,
    type: listRef(objectRef(meta)),
  });

/** Root field whose GraphQL type is a scalar, enum, or list of those. */
export const rootLeaf = <Value>(
  op: "query" | "mutation",
  field: string,
  list: boolean,
  args?: Record<string, unknown>,
  argTypes?: ArgMeta,
): Query<Value> =>
  make({
    _tag: "Root",
    op,
    field,
    args,
    argTypes,
    type: list ? listRef({ tag: "scalar" }) : { tag: "scalar" },
  });

const printExpr = (expr: Expr): string => {
  switch (expr._tag) {
    case "Root":
      return expr.args
        ? `${expr.field}(${JSON.stringify(expr.args)})`
        : expr.field;
    case "Prop":
      return `${printExpr(expr.parent)}.${expr.field.name}`;
    case "Item":
      return "$item";
    case "MapValue":
      return `map(${printExpr(expr.parent)})`;
    case "MapItems":
      return `mapItems(${printExpr(expr.parent)})`;
    case "Filter":
      return `filter(${printExpr(expr.parent)})`;
    case "FlatMap":
      return `flatMap(${printExpr(expr.parent)})`;
    case "Literal":
      return `of(${String(expr.value)})`;
  }
};

const emptySel = (field: string): SelNode => ({
  field,
  alias: undefined,
  args: undefined,
  children: new Map(),
  isScalar: false,
  isList: false,
});

const stableStringify = (value: unknown): string => {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  const keys = Object.keys(value as object).sort();
  return `{${keys.map((key) => `${JSON.stringify(key)}:${stableStringify((value as Record<string, unknown>)[key])}`).join(",")}}`;
};

type Forest = {
  kind: "query" | "mutation" | undefined;
  roots: SelNode;
  vars: Map<string, { type: string; value: unknown }>;
  varI: number;
  aliasI: number;
  rootAlias: WeakMap<object, string>;
};

const bindArgs = (
  forest: Forest,
  args: Record<string, unknown> | undefined,
  argTypes: ArgMeta | undefined,
): Record<string, string> | undefined => {
  if (args === undefined) return undefined;
  const bound: Record<string, string> = {};
  let hasArgs = false;
  for (const [name, value] of Object.entries(args)) {
    if (value === undefined) continue;
    forest.vars.set(`v${forest.varI}`, {
      type: argTypes?.[name] ?? "String",
      value,
    });
    bound[name] = `v${forest.varI++}`;
    hasArgs = true;
  }
  return hasArgs ? bound : undefined;
};

const ensureChild = (
  forest: Forest,
  parent: SelNode,
  field: string,
  options: {
    args?: Record<string, unknown>;
    argTypes?: ArgMeta;
    isScalar?: boolean;
    isList?: boolean;
  },
): SelNode => {
  const key =
    options.args === undefined
      ? field
      : `${field}:${stableStringify(options.args)}`;
  const existing = parent.children.get(key);
  if (existing) return existing;
  const taken = new Set(
    [...parent.children.values()].map((c) => c.alias ?? c.field),
  );
  let alias: string | undefined;
  if (taken.has(field)) {
    do {
      alias = `${field}_${forest.aliasI++}`;
    } while (taken.has(alias));
  }
  const sel: SelNode = {
    field,
    alias,
    args: bindArgs(forest, options.args, options.argTypes),
    children: new Map(),
    isScalar: options.isScalar ?? false,
    isList: options.isList ?? false,
  };
  parent.children.set(key, sel);
  return sel;
};

type Path = Array<string | "*">;

const paintAbs = (forest: Forest, expr: Expr): Path => {
  switch (expr._tag) {
    case "Root": {
      if (forest.kind !== undefined && forest.kind !== expr.op) {
        throw new GqlError(
          `cannot mix ${forest.kind} and ${expr.op} in one document`,
        );
      }
      forest.kind = expr.op;
      const node = ensureChild(forest, forest.roots, expr.field, {
        args: expr.args,
        argTypes: expr.argTypes,
        isList: expr.type.tag === "list",
      });
      const key = node.alias ?? node.field;
      forest.rootAlias.set(expr, key);
      return [key];
    }
    case "Prop": {
      const parentPath = paintAbs(forest, expr.parent);
      const parentSel = selAt(forest.roots, parentPath);
      const node = ensureChild(forest, parentSel, expr.field.name, {
        args: expr.args,
        argTypes: expr.field.argTypes,
        isScalar: expr.field.kind === "scalar",
        isList: expr.field.kind === "list",
      });
      return [...parentPath, node.alias ?? node.field];
    }
    default:
      throw new GqlError(`paintAbs: ${expr._tag}`);
  }
};

const selAt = (roots: SelNode, path: Path): SelNode => {
  let current = roots;
  for (const segment of path) {
    if (segment === "*") continue;
    const child = [...current.children.values()].find(
      (candidate) => (candidate.alias ?? candidate.field) === segment,
    );
    if (!child) {
      throw new GqlError(`internal: missing ${String(segment)}`);
    }
    current = child;
  }
  return current;
};

const relSel = (expr: Expr, listSel: SelNode): SelNode => {
  switch (expr._tag) {
    case "Item":
      return listSel;
    case "Prop": {
      const parent = relSel(expr.parent, listSel);
      const child = [...parent.children.values()].find(
        (c) => c.field === expr.field.name,
      );
      if (!child) {
        throw new GqlError(`missing ${expr.field.name} in list selection`);
      }
      return child;
    }
    default:
      return listSel;
  }
};

const paintRel = (forest: Forest, expr: Expr, listSel: SelNode): void => {
  switch (expr._tag) {
    case "Item":
    case "Literal":
      return;
    case "Prop":
      paintRel(forest, expr.parent, listSel);
      ensureChild(forest, relSel(expr.parent, listSel), expr.field.name, {
        args: expr.args,
        argTypes: expr.field.argTypes,
        isScalar: expr.field.kind === "scalar",
        isList: expr.field.kind === "list",
      });
      return;
    case "MapValue":
    case "FlatMap":
      paintRel(forest, expr.parent, listSel);
      return;
    case "MapItems":
      paintRel(forest, expr.parent, listSel);
      visitRel(expr.mapped, forest, relSel(expr.parent, listSel));
      return;
    case "Filter":
      paintRel(forest, expr.parent, listSel);
      paintRel(forest, expr.predicate, relSel(expr.parent, listSel));
      return;
    case "Root":
      throw new GqlError("root inside list item");
  }
};

const visitExpr = (forest: Forest, expr: Expr): void => {
  switch (expr._tag) {
    case "Root":
    case "Prop":
      paintAbs(forest, expr);
      return;
    case "Item":
      return;
    case "Literal":
      return;
    case "MapValue":
    case "FlatMap":
      visitExpr(forest, expr.parent);
      return;
    case "MapItems": {
      visitExpr(forest, expr.parent);
      const path = paintAbs(forest, graphqlBase(expr.parent));
      visitRel(expr.mapped, forest, selAt(forest.roots, path));
      return;
    }
    case "Filter": {
      visitExpr(forest, expr.parent);
      const path = paintAbs(forest, graphqlBase(expr.parent));
      paintRel(forest, expr.predicate, selAt(forest.roots, path));
      return;
    }
  }
};

const graphqlBase = (expr: Expr): Expr => {
  switch (expr._tag) {
    case "Root":
    case "Prop":
    case "Item":
      return expr;
    case "MapValue":
    case "MapItems":
    case "Filter":
    case "FlatMap":
      return graphqlBase(expr.parent);
    case "Literal":
      throw new GqlError("literal has no graphql base");
  }
};

const visitRel = (plan: unknown, forest: Forest, listSel: SelNode): void => {
  if (isQuery(plan)) {
    paintRel(forest, (plan as QueryNode).expr, listSel);
    return;
  }
  if (plan !== null && typeof plan === "object" && !Effect.isEffect(plan)) {
    for (const nested of Object.values(plan as Record<string, unknown>)) {
      visitRel(nested, forest, listSel);
    }
  }
};

/**
 * Recurse through a builder return value. Query nodes contribute GraphQL
 * fields to `forest`; Effects are ignored until interpret (FlatMap).
 */
const visitPlan = (plan: unknown, forest: Forest): void => {
  if (isQuery(plan)) {
    log("visit", printExpr((plan as QueryNode).expr));
    visitExpr(forest, (plan as QueryNode).expr);
    return;
  }
  if (Effect.isEffect(plan)) return;
  if (plan !== null && typeof plan === "object" && !Array.isArray(plan)) {
    for (const nested of Object.values(plan as Record<string, unknown>)) {
      visitPlan(nested, forest);
    }
  }
};

const validate = (node: SelNode): string | undefined => {
  for (const child of node.children.values()) {
    if (!child.isScalar && child.children.size === 0) {
      return `field "${child.field}" has no sub-selection`;
    }
    const inner = validate(child);
    if (inner) return inner;
  }
  return undefined;
};

const printChildren = (node: SelNode, indent: number): string => {
  const pad = "  ".repeat(indent);
  const lines: Array<string> = [];
  for (const child of node.children.values()) {
    let head = child.alias ? `${child.alias}: ${child.field}` : child.field;
    if (child.args && Object.keys(child.args).length > 0) {
      const printed = Object.entries(child.args)
        .map(([argName, varName]) => `${argName}: $${varName}`)
        .join(", ");
      head += `(${printed})`;
    }
    if (child.isScalar) lines.push(`${pad}${head}`);
    else {
      lines.push(`${pad}${head} {`);
      lines.push(printChildren(child, indent + 1));
      lines.push(`${pad}}`);
    }
  }
  return lines.join("\n");
};

const emptyForest = (): Forest => ({
  kind: undefined,
  roots: emptySel(""),
  vars: new Map(),
  varI: 0,
  aliasI: 0,
  rootAlias: new WeakMap(),
});

const emit = (forest: Forest): Compiled => {
  const err = validate(forest.roots);
  if (err) throw new GqlError(err);
  const kind = forest.kind ?? "query";
  const varDefs = [...forest.vars.entries()]
    .map(([name, binding]) => `$${name}: ${binding.type}`)
    .join(", ");
  const header = varDefs.length > 0 ? `${kind} Gql(${varDefs})` : `${kind} Gql`;
  const variables: Record<string, unknown> = {};
  for (const [name, binding] of forest.vars) variables[name] = binding.value;
  return {
    document: `${header} {\n${printChildren(forest.roots, 1)}\n}`,
    operationName: "Gql",
    variables,
    kind,
    tree: forest.roots,
    rootAlias: forest.rootAlias,
  };
};

type Compiled = CompiledOperation & {
  readonly rootAlias: WeakMap<object, string>;
};

const extractAbs = (
  expr: Expr,
  data: unknown,
  rootAlias: WeakMap<object, string>,
): unknown => {
  switch (expr._tag) {
    case "Root":
      return (data as Record<string, unknown>)[
        rootAlias.get(expr) ?? expr.field
      ];
    case "Prop": {
      const parent = extractAbs(expr.parent, data, rootAlias);
      if (Array.isArray(parent)) {
        return parent.map((item) =>
          item == null
            ? item
            : (item as Record<string, unknown>)[expr.field.name],
        );
      }
      return parent == null
        ? parent
        : (parent as Record<string, unknown>)[expr.field.name];
    }
    default:
      throw new GqlError(`extractAbs: ${expr._tag}`);
  }
};

const extractRel = (expr: Expr, item: unknown): unknown => {
  switch (expr._tag) {
    case "Item":
      return item;
    case "Prop": {
      const parent = extractRel(expr.parent, item);
      if (Array.isArray(parent)) {
        return parent.map((element) =>
          element == null
            ? element
            : (element as Record<string, unknown>)[expr.field.name],
        );
      }
      return parent == null
        ? parent
        : (parent as Record<string, unknown>)[expr.field.name];
    }
    default:
      throw new GqlError(`extractRel: ${expr._tag}`);
  }
};

const inItem = (expr: Expr): boolean => {
  switch (expr._tag) {
    case "Item":
      return true;
    case "Prop":
    case "MapValue":
    case "MapItems":
    case "Filter":
    case "FlatMap":
      return inItem(expr.parent);
    default:
      return false;
  }
};

const interpretExpr = (
  expr: Expr,
  data: unknown,
  rootAlias: WeakMap<object, string>,
  item: unknown,
): unknown => {
  switch (expr._tag) {
    case "Literal":
      return expr.value;
    case "Item":
      return item;
    case "Root":
    case "Prop":
      return inItem(expr)
        ? extractRel(expr, item)
        : extractAbs(expr, data, rootAlias);
    case "MapValue":
      return expr.mapFn(interpretExpr(expr.parent, data, rootAlias, item));
    case "Filter": {
      const list = interpretExpr(expr.parent, data, rootAlias, item);
      const arr = Array.isArray(list) ? list : [];
      return arr.filter((row) =>
        Boolean(interpretExpr(expr.predicate, data, rootAlias, row)),
      );
    }
    case "MapItems": {
      const list = interpretExpr(expr.parent, data, rootAlias, item);
      const arr = Array.isArray(list) ? list : [];
      return arr.map((row) =>
        interpretValueSync(expr.mapped, data, rootAlias, row),
      );
    }
    case "FlatMap":
      throw new GqlError("FlatMap must be interpreted as Effect");
  }
};

const interpretValueSync = (
  plan: unknown,
  data: unknown,
  rootAlias: WeakMap<object, string>,
  item: unknown,
): unknown => {
  if (isQuery(plan)) {
    return interpretExpr((plan as QueryNode).expr, data, rootAlias, item);
  }
  if (plan !== null && typeof plan === "object" && !Effect.isEffect(plan)) {
    const out: Record<string, unknown> = {};
    for (const [key, nested] of Object.entries(
      plan as Record<string, unknown>,
    )) {
      out[key] = interpretValueSync(nested, data, rootAlias, item);
    }
    return out;
  }
  return plan;
};

const interpretPlan = (
  plan: unknown,
  data: unknown,
  rootAlias: WeakMap<object, string>,
): Effect.Effect<unknown, unknown, GqlTransport> =>
  Effect.gen(function* () {
    if (isQuery(plan)) {
      const expr = (plan as QueryNode).expr;
      if (expr._tag === "FlatMap") {
        const resolved = interpretExpr(expr.parent, data, rootAlias, undefined);
        const next = expr.flatMapFn(resolved);
        if (Effect.isEffect(next)) return yield* next;
        if (isQuery(next)) return yield* interpretPlan(next, data, rootAlias);
        return next;
      }
      return interpretExpr(expr, data, rootAlias, undefined);
    }
    if (Effect.isEffect(plan)) return yield* plan;
    if (plan !== null && typeof plan === "object" && !Array.isArray(plan)) {
      const out: Record<string, unknown> = {};
      for (const [key, nested] of Object.entries(
        plan as Record<string, unknown>,
      )) {
        out[key] = yield* interpretPlan(nested, data, rootAlias);
      }
      return out;
    }
    return plan;
  }) as Effect.Effect<unknown, unknown, GqlTransport>;

/**
 * Compile every Query in `plan` into one document, POST it, then replace
 * Query/Effect leaves with plain data (`UnwrapPlan`).
 */
const evaluatePlan = <Plan>(
  plan: Plan,
): Effect.Effect<UnwrapPlan<Plan>, unknown, GqlTransport> =>
  Effect.gen(function* () {
    const forest = emptyForest();
    visitPlan(plan, forest);
    let data: unknown = {};
    let rootAlias: WeakMap<object, string> = new WeakMap();
    if (forest.roots.children.size > 0) {
      const compiled = emit(forest);
      log("document\n" + compiled.document);
      const transport = yield* GqlTransport;
      const result = yield* transport.execute(compiled);
      data = result.data;
      rootAlias = compiled.rootAlias;
    }
    return (yield* interpretPlan(plan, data, rootAlias)) as UnwrapPlan<Plan>;
  }) as Effect.Effect<UnwrapPlan<Plan>, unknown, GqlTransport>;

/** `Query.of` / pure. */
export const ofQuery = <Value>(value: Value): Query<Value> =>
  make({ _tag: "Literal", value, type: { tag: "scalar" } });

const filterImpl = (
  source: QueryNode,
  predicate: (item: QueryNode) => QueryNode,
): Query<unknown> => {
  const proto = itemQuery(source);
  const predicateQuery = predicate(proto);
  log("filter pred", printExpr(predicateQuery.expr));
  return make({
    _tag: "Filter",
    parent: source.expr,
    predicate: predicateQuery.expr,
    type: source.expr.type,
  });
};

export function filterQuery<Item>(
  predicate: (item: Query<Item>) => Query<boolean>,
): (source: QueryNode<readonly Item[]>) => Query<readonly Item[]>;
export function filterQuery<Item>(
  source: QueryNode<readonly Item[]>,
  predicate: (item: Query<Item>) => Query<boolean>,
): Query<readonly Item[]>;
export function filterQuery(sourceOrPredicate: any, predicate?: any): any {
  if (predicate === undefined) {
    return (source: QueryNode) => filterImpl(source, sourceOrPredicate);
  }
  return filterImpl(sourceOrPredicate, predicate);
}

const mapImpl = (
  source: QueryNode,
  mapFn: (value: any) => unknown,
): Query<unknown> => {
  if (source.expr.type.tag === "list") {
    const proto = itemQuery(source);
    const mapped = mapFn(proto);
    log("map items", printExpr(source.expr));
    return make({
      _tag: "MapItems",
      parent: source.expr,
      mapped,
      type: source.expr.type,
    });
  }
  log("map value", printExpr(source.expr));
  return make({
    _tag: "MapValue",
    parent: source.expr,
    mapFn,
    type: { tag: "scalar" },
  });
};

export function mapQuery<Item, Mapped>(
  mapFn: (item: Query<Item>) => Mapped,
): (source: QueryNode<readonly Item[]>) => Query<readonly UnwrapPlan<Mapped>[]>;
export function mapQuery<Value, Mapped>(
  mapFn: (value: Value) => Mapped,
): (source: QueryNode<Value>) => Query<Mapped>;
export function mapQuery<Item, Mapped>(
  source: QueryNode<readonly Item[]>,
  mapFn: (item: Query<Item>) => Mapped,
): Query<readonly UnwrapPlan<Mapped>[]>;
export function mapQuery<Value, Mapped>(
  source: QueryNode<Value>,
  mapFn: (value: Value) => Mapped,
): Query<Mapped>;
export function mapQuery(sourceOrMapFn: any, mapFn?: any): any {
  if (mapFn === undefined) {
    return (source: QueryNode) => mapImpl(source, sourceOrMapFn);
  }
  return mapImpl(sourceOrMapFn, mapFn);
}

const flatMapImpl = (
  source: QueryNode,
  flatMapFn: (value: unknown) => unknown,
): Query<unknown> => {
  log("flatMap", printExpr(source.expr));
  return make({
    _tag: "FlatMap",
    parent: source.expr,
    flatMapFn,
    type: { tag: "scalar" },
  });
};

export function flatMapQuery<Value, Result, Error, Requirements>(
  flatMapFn: (
    value: Value,
  ) => Effect.Effect<Result, Error, Requirements> | Query<Result>,
): (source: QueryNode<Value>) => Query<Result>;
export function flatMapQuery<Value, Result, Error, Requirements>(
  source: QueryNode<Value>,
  flatMapFn: (
    value: Value,
  ) => Effect.Effect<Result, Error, Requirements> | Query<Result>,
): Query<Result>;
export function flatMapQuery(sourceOrFlatMapFn: any, flatMapFn?: any): any {
  if (flatMapFn === undefined) {
    return (source: QueryNode) => flatMapImpl(source, sourceOrFlatMapFn);
  }
  return flatMapImpl(sourceOrFlatMapFn, flatMapFn);
}

/**
 * Builder → Effect. The inner function is *not* a generator; it returns a
 * plan of Query/Effect values. Query.fn visits the plan, POSTs one document,
 * then interprets Map/Filter/FlatMap/Of.
 */
export const queryFn =
  <Arguments extends Array<unknown>, Plan>(
    build: (...args: Arguments) => Plan,
  ): ((
    ...args: Arguments
  ) => Effect.Effect<UnwrapPlan<Plan>, unknown, GqlTransport>) =>
  (...args) => {
    const plan = build(...args);
    return evaluatePlan(plan);
  };
