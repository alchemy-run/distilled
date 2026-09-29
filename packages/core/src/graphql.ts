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
 *   after extract (`stars => stars > 5`). Relay connections (`edges { node }`)
 *   are lists of the node type, so `projects({ first: 20 }).pipe(Query.map)`
 *   maps projects, not edges.
 * - `Query.filter` — predicate is `Query<Item> => Query<boolean>`; the
 *   boolean Query is walked for fields, then run per row after the POST.
 * - `Query.flatMap` — after extract, run `(value) => Effect | Query`.
 * - `Query.pages` / `Query.items` — a Stream over every page / node of a
 *   Relay connection, one POST per page (see "Pagination").
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
 * into `Query.fn`'s requirements. It returns the parsed `data` and raw
 * `errors`; `Query.fn` classifies the errors (see "Errors" below). Compile
 * failures are {@link GqlError} defects.
 *
 * Generated SDKs export *roots* (`Railway.me`, `Railway.project`).
 * Combinators live in `@distilled.cloud/core/query`.
 */
import * as Context from "effect/Context";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import * as Option from "effect/Option";
import * as Schedule from "effect/Schedule";
import * as S from "effect/Schema";
import * as Stream from "effect/Stream";

export const QuerySymbol = Symbol.for("@distilled.cloud/graphql/Query");
const inspect = Symbol.for("nodejs.util.inspect.custom");

/** A plan that cannot be compiled (a programming error, raised as a defect). */
export class GqlError {
  readonly _tag = "GqlError" as const;
  constructor(readonly message: string) {}
}

// ── Errors ──────────────────────────────────────────────────────────────────
//
// Every entry of a GraphQL `errors` array becomes one typed issue. Generated
// SDKs declare tagged error classes plus the matchers that recognize them,
// scoped to the root fields that can return them (or global). `Query.fn`
// classifies each entry against the roots its path points at, so the error
// channel is the union of the errors declared by the roots the plan reads.

/** Fields every classified GraphQL error carries. */
export const errorFields = {
  message: S.String,
  code: S.optional(S.String),
  path: S.optional(S.Array(S.Union([S.String, S.Number]))),
  locations: S.optional(
    S.Array(S.Struct({ line: S.Number, column: S.Number })),
  ),
  extensions: S.optional(S.Unknown),
  traceId: S.optional(S.String),
  status: S.optional(S.Number),
  /** Server retry hint in seconds. */
  retryAfter: S.optional(S.Number),
};

/** The shape shared by every classified GraphQL error. */
export interface GraphQLIssue {
  readonly _tag: string;
  readonly message: string;
  readonly code?: string;
  readonly path?: ReadonlyArray<string | number>;
  readonly locations?: ReadonlyArray<{
    readonly line: number;
    readonly column: number;
  }>;
  readonly extensions?: unknown;
  readonly traceId?: string;
  readonly status?: number;
  readonly retryAfter?: number;
}

export type GraphQLIssueProps = Omit<GraphQLIssue, "_tag">;

/** A GraphQL error no declared matcher recognizes. */
export class UnknownGraphQLError extends S.TaggedError<UnknownGraphQLError>()(
  "UnknownGraphQLError",
  {
    ...errorFields,
    /** Root field the error path points at, when the path is known. */
    coordinate: S.optional(S.String),
  },
) {}

/** One response carried errors with different tags; none is hidden. */
export class GraphQLFailure<
  E extends GraphQLIssue = GraphQLIssue,
> extends Data.TaggedError("GraphQLFailure")<{
  readonly errors: readonly [E, ...E[]];
  readonly data: unknown;
  readonly status?: number;
}> {
  get message(): string {
    return this.errors
      .map(
        (e) =>
          `${e._tag}${e.path?.length ? ` at ${e.path.join(".")}` : ""}: ${e.message}`,
      )
      .join("; ");
  }
}

/** The request never produced a GraphQL response (network, HTTP, non-JSON). */
export class GraphQLTransportError extends Data.TaggedError(
  "GraphQLTransportError",
)<{
  readonly message: string;
  readonly status?: number;
  /** Server retry hint in seconds. */
  readonly retryAfter?: number;
  readonly cause?: unknown;
}> {}

/** A paginated connection reported more pages without a new cursor. */
export class GraphQLPaginationError extends Data.TaggedError(
  "GraphQLPaginationError",
)<{
  readonly message: string;
  readonly cursor: string | null;
}> {}

/** Recognizes a raw GraphQL error. Every present property must match. */
export interface ErrorMatcher {
  readonly code?: string;
  readonly message?: string;
  readonly messageIncludes?: string;
}

/** Runtime description of one generated error class. */
export interface ErrorSpec<E extends GraphQLIssue = GraphQLIssue> {
  readonly tag: E["_tag"];
  readonly make: (props: GraphQLIssueProps) => E;
  readonly matchers: ReadonlyArray<ErrorMatcher>;
  /** Queries failing only with retryable errors are retried. */
  readonly retryable: boolean;
  /** Applies to every root, including errors that carry no path. */
  readonly global: boolean;
}

export const errorSpec = <E extends GraphQLIssue>(
  make: new (props: GraphQLIssueProps) => E,
  tag: E["_tag"],
  matchers: ReadonlyArray<ErrorMatcher>,
  options: { readonly retryable?: boolean; readonly global?: boolean } = {},
): ErrorSpec<E> => ({
  tag,
  make: (props) => new make(props),
  matchers,
  retryable: options.retryable ?? false,
  global: options.global ?? false,
});

/** An entry of a GraphQL response's `errors` array, as sent on the wire. */
export interface RawGraphQLError {
  readonly message: string;
  readonly path?: ReadonlyArray<string | number>;
  readonly locations?: ReadonlyArray<{
    readonly line: number;
    readonly column: number;
  }>;
  readonly extensions?: Record<string, unknown>;
  readonly [key: string]: unknown;
}

/** What a transport returns once it has a GraphQL response body. */
export interface GraphQLResponse {
  readonly data?: unknown;
  readonly errors?: ReadonlyArray<RawGraphQLError>;
  readonly status?: number;
  readonly headers?: Readonly<Record<string, string | undefined>>;
}

export type ArgMeta = Record<string, string>;

export type FieldMeta = {
  readonly name: string;
  readonly kind: "scalar" | "object" | "list" | "connection";
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
/** Relay connection: GraphQL `edges { node }` presented as `Query<Item[]>`. */
export const connectionField = (
  name: string,
  nodeType: TypeMeta,
  argTypes?: ArgMeta,
): FieldMeta => ({
  name,
  kind: "connection",
  of: nodeType,
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
    return listRef(objectRef(field.of!)); // list | connection
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
    ) => Effect.Effect<GraphQLResponse, GraphQLTransportError, any>;
  }
>()("@distilled.cloud/graphql/Transport") {}

const log = (..._args: Array<unknown>): void => {};

/**
 * GraphQL fields copied onto a Query so `user.name` type-checks.
 * `Query<User>` contains `projects: Query<Project[]>`, which contains
 * `owner: Query<User>` again — TypeScript leaves the cycle lazy. Fields
 * inherit the errors of the root they were read from.
 */
type QueryFields<Value, Error> = [Value] extends [ReadonlyArray<infer Item>]
  ? {
      readonly [Field in keyof Item]: Query<Item[Field], Error>;
    } & {
      (args: Record<string, unknown>): Query<Value, Error>;
    }
  : [Value] extends [object]
    ? { readonly [Field in keyof Value]: Query<Value[Field], Error> }
    : {};

/**
 * A lazy GraphQL selection. `Value` is the plain data after `Query.fn` runs;
 * `Error` is the union of typed errors the roots it reads can return.
 */
export type Query<Value, Error = never> = QueryNode<Value, Error> &
  QueryFields<Value, Error>;

/** Strip Query/Effect wrappers from a returned plan down to plain data. */
export type UnwrapPlan<Plan> =
  Plan extends QueryNode<infer Value, any>
    ? Value
    : Plan extends Effect.Effect<infer Success, any, any>
      ? Success
      : Plan extends ReadonlyArray<infer Element>
        ? ReadonlyArray<UnwrapPlan<Element>>
        : Plan extends object
          ? { readonly [Key in keyof Plan]: UnwrapPlan<Plan[Key]> }
          : Plan;

/** Typed errors of every Query and Effect in a returned plan. */
export type PlanError<Plan> =
  Plan extends QueryNode<any, infer Error>
    ? Error
    : Plan extends Effect.Effect<any, infer Error, any>
      ? Error
      : Plan extends ReadonlyArray<infer Element>
        ? PlanError<Element>
        : Plan extends object
          ? { readonly [Key in keyof Plan]: PlanError<Plan[Key]> }[keyof Plan]
          : never;

/** Failures of evaluating a plan whose roots declare `Error`. */
export type QueryError<Error> =
  | Error
  | GraphQLFailure<Extract<Error, GraphQLIssue> | UnknownGraphQLError>
  | UnknownGraphQLError
  | GraphQLTransportError;

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
  /** Relay connection: paint `edges { node }`, extract an array of nodes. */
  readonly connection?: boolean;
  /** Errors this root field can return, including global errors. */
  readonly errors: ReadonlyArray<ErrorSpec>;
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

export class QueryNode<out Value = unknown, out Error = never> {
  readonly [QuerySymbol] = QuerySymbol;
  declare readonly valueType: Value;
  declare readonly errorType: Error;
  constructor(readonly expr: Expr) {
    return proxy(this) as QueryNode<Value, Error>;
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

const make = <Value, Error = never>(expr: Expr): Query<Value, Error> =>
  new QueryNode<Value, Error>(expr) as unknown as Query<Value, Error>;

const itemQuery = (list: QueryNode): QueryNode =>
  new QueryNode({
    _tag: "Item",
    list: list.expr,
    type: unwrapList(list.expr.type),
  });

function proxy(self: QueryNode<unknown, unknown>): Query<unknown> {
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

const applyBag = <Value, Error>(
  self: QueryNode<Value, Error>,
  bag: Record<string, unknown>,
): Query<Value, Error> => {
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
    return make<Value, Error>({
      ...self.expr,
      args: { ...self.expr.args, ...args },
    });
  }
  if (self.expr._tag === "Root") {
    return make<Value, Error>({
      ...self.expr,
      args: { ...self.expr.args, ...args },
    });
  }
  return self as unknown as Query<Value, Error>;
};

export const root = <Value, Error = never>(
  op: "query" | "mutation",
  field: string,
  meta: TypeMeta,
  args?: Record<string, unknown>,
  argTypes?: ArgMeta,
  errors: ReadonlyArray<ErrorSpec> = [],
): Query<Value, Error> =>
  make({
    _tag: "Root",
    op,
    field,
    args,
    argTypes,
    type: objectRef(meta),
    errors,
  });

export const rootList = <Item, Error = never>(
  op: "query" | "mutation",
  field: string,
  meta: TypeMeta,
  args?: Record<string, unknown>,
  argTypes?: ArgMeta,
  errors: ReadonlyArray<ErrorSpec> = [],
): Query<ReadonlyArray<Item>, Error> =>
  make({
    _tag: "Root",
    op,
    field,
    args,
    argTypes,
    type: listRef(objectRef(meta)),
    errors,
  });

/** Root Relay connection: typed as `Query<Item[]>`, document uses `edges { node }`. */
export const rootConnection = <Item, Error = never>(
  op: "query" | "mutation",
  field: string,
  meta: TypeMeta,
  args?: Record<string, unknown>,
  argTypes?: ArgMeta,
  errors: ReadonlyArray<ErrorSpec> = [],
): Query<ReadonlyArray<Item>, Error> =>
  make({
    _tag: "Root",
    op,
    field,
    args,
    argTypes,
    type: listRef(objectRef(meta)),
    connection: true,
    errors,
  });

/** Root field whose GraphQL type is a scalar, enum, or list of those. */
export const rootLeaf = <Value, Error = never>(
  op: "query" | "mutation",
  field: string,
  list: boolean,
  args?: Record<string, unknown>,
  argTypes?: ArgMeta,
  errors: ReadonlyArray<ErrorSpec> = [],
): Query<Value, Error> =>
  make({
    _tag: "Root",
    op,
    field,
    args,
    argTypes,
    type: list ? listRef({ tag: "scalar" }) : { tag: "scalar" },
    errors,
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
  /** Response key of each root → the root field and its declared errors. */
  rootErrors: Map<string, RootErrors>;
};

interface RootErrors {
  readonly field: string;
  readonly errors: ReadonlyArray<ErrorSpec>;
}

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

const paintConnection = (forest: Forest, connection: SelNode): Path => {
  const edges = ensureChild(forest, connection, "edges", { isList: true });
  ensureChild(forest, edges, "node", {});
  return ["edges", "node"];
};

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
        // Leaf roots (`projectDelete: Boolean!`) take no sub-selection.
        isScalar:
          expr.type.tag === "scalar" ||
          (expr.type.tag === "list" && expr.type.of.tag === "scalar"),
        isList: expr.type.tag === "list" && !expr.connection,
      });
      const key = node.alias ?? node.field;
      forest.rootAlias.set(expr, key);
      forest.rootErrors.set(key, { field: expr.field, errors: expr.errors });
      return expr.connection ? [key, ...paintConnection(forest, node)] : [key];
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
      const path = [...parentPath, node.alias ?? node.field];
      return expr.field.kind === "connection"
        ? [...path, ...paintConnection(forest, node)]
        : path;
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

const connectionNodeSel = (connection: SelNode): SelNode => {
  const edges = [...connection.children.values()].find(
    (c) => c.field === "edges",
  );
  const node = edges
    ? [...edges.children.values()].find((c) => c.field === "node")
    : undefined;
  if (!node) throw new GqlError("internal: connection missing edges.node");
  return node;
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
      return expr.field.kind === "connection"
        ? connectionNodeSel(child)
        : child;
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
    case "Prop": {
      paintRel(forest, expr.parent, listSel);
      const child = ensureChild(
        forest,
        relSel(expr.parent, listSel),
        expr.field.name,
        {
          args: expr.args,
          argTypes: expr.field.argTypes,
          isScalar: expr.field.kind === "scalar",
          isList: expr.field.kind === "list",
        },
      );
      if (expr.field.kind === "connection") paintConnection(forest, child);
      return;
    }
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
  rootErrors: new Map(),
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
    rootErrors: forest.rootErrors,
  };
};

type Compiled = CompiledOperation & {
  readonly rootAlias: WeakMap<object, string>;
  readonly rootErrors: ReadonlyMap<string, RootErrors>;
};

const nodesFromConnection = (value: unknown): unknown => {
  if (value == null) return value;
  if (Array.isArray(value)) return value.map(nodesFromConnection);
  const edges = (value as Record<string, unknown>).edges;
  if (!Array.isArray(edges)) return [];
  return edges.map((edge) =>
    edge == null ? edge : (edge as Record<string, unknown>).node,
  );
};

const readField = (parent: unknown, name: string): unknown => {
  if (parent == null) return parent;
  if (Array.isArray(parent)) {
    return parent.map((item) =>
      item == null ? item : (item as Record<string, unknown>)[name],
    );
  }
  return (parent as Record<string, unknown>)[name];
};

const extractAbs = (
  expr: Expr,
  data: unknown,
  rootAlias: WeakMap<object, string>,
): unknown => {
  switch (expr._tag) {
    case "Root": {
      const raw = (data as Record<string, unknown>)[
        rootAlias.get(expr) ?? expr.field
      ];
      return expr.connection ? nodesFromConnection(raw) : raw;
    }
    case "Prop": {
      const value = readField(
        extractAbs(expr.parent, data, rootAlias),
        expr.field.name,
      );
      return expr.field.kind === "connection"
        ? nodesFromConnection(value)
        : value;
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
      const value = readField(extractRel(expr.parent, item), expr.field.name);
      return expr.field.kind === "connection"
        ? nodesFromConnection(value)
        : value;
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
): Effect.Effect<UnwrapPlan<Plan>, QueryError<PlanError<Plan>>, GqlTransport> =>
  Effect.gen(function* () {
    const forest = emptyForest();
    visitPlan(plan, forest);
    let data: unknown = {};
    let rootAlias: WeakMap<object, string> = new WeakMap();
    if (forest.roots.children.size > 0) {
      const compiled = emit(forest);
      log("document\n" + compiled.document);
      data = yield* execute(compiled);
      rootAlias = compiled.rootAlias;
    }
    return (yield* interpretPlan(plan, data, rootAlias)) as UnwrapPlan<Plan>;
  }) as Effect.Effect<
    UnwrapPlan<Plan>,
    QueryError<PlanError<Plan>>,
    GqlTransport
  >;

/**
 * POST one compiled document and fail with its classified errors. Queries
 * are retried (bounded) while every failure is retryable; mutations never
 * are, since an error can follow a side effect that already happened.
 */
const execute = (
  compiled: Compiled,
): Effect.Effect<unknown, ExecuteError, GqlTransport> => {
  const once = Effect.gen(function* () {
    const transport = yield* GqlTransport;
    const response = yield* transport.execute(compiled);
    const raw = response.errors ?? [];
    if (raw.length === 0) return response.data;
    const issues = raw.map((error) => classify(compiled, error, response));
    const [first, ...rest] = issues as [GraphQLIssue, ...GraphQLIssue[]];
    return yield* Effect.fail(
      rest.every((issue) => issue._tag === first._tag)
        ? first
        : new GraphQLFailure({
            errors: [first, ...rest],
            data: response.data,
            status: response.status,
          }),
    );
  });
  return compiled.kind === "query"
    ? once.pipe(
        Effect.retry({
          while: (error) => isRetryable(compiled, error),
          times: 5,
          schedule: Schedule.exponential("200 millis"),
        }),
      )
    : once;
};

type ExecuteError = GraphQLIssue | GraphQLFailure | GraphQLTransportError;

const isRetryable = (compiled: Compiled, error: ExecuteError): boolean => {
  if (error instanceof GraphQLTransportError) {
    return (
      error.status === undefined || error.status === 429 || error.status >= 500
    );
  }
  const retryable = new Set(
    [...compiled.rootErrors.values()].flatMap((root) =>
      root.errors.filter((spec) => spec.retryable).map((spec) => spec.tag),
    ),
  );
  return error instanceof GraphQLFailure
    ? error.errors.every((issue) => retryable.has(issue._tag))
    : retryable.has(error._tag);
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/**
 * Pick the most specific matcher among the errors the root at `path[0]`
 * declares (or the global errors for a path-less error). A tie between
 * different tags is ambiguous and stays {@link UnknownGraphQLError}.
 */
const classify = (
  compiled: Compiled,
  raw: RawGraphQLError,
  response: GraphQLResponse,
): GraphQLIssue => {
  const path = Array.isArray(raw.path) ? raw.path : undefined;
  const root =
    typeof path?.[0] === "string"
      ? compiled.rootErrors.get(path[0])
      : undefined;
  const candidates = root
    ? root.errors
    : uniqueByTag(
        [...compiled.rootErrors.values()].flatMap((entry) =>
          entry.errors.filter((spec) => spec.global),
        ),
      );
  const extensions = isRecord(raw.extensions) ? raw.extensions : {};
  const code =
    typeof extensions.code === "string"
      ? extensions.code
      : typeof extensions.errorCode === "string"
        ? extensions.errorCode
        : undefined;
  const message = typeof raw.message === "string" ? raw.message : "";
  const retryHeader = response.headers?.["retry-after"];
  const props: GraphQLIssueProps = {
    message,
    code,
    path,
    locations: raw.locations,
    extensions: raw.extensions,
    traceId:
      typeof extensions.traceId === "string"
        ? extensions.traceId
        : typeof raw.traceId === "string"
          ? raw.traceId
          : undefined,
    status: response.status,
    retryAfter:
      retryHeader && /^\d+(\.\d+)?$/.test(retryHeader)
        ? Number(retryHeader)
        : undefined,
  };
  const matches = candidates.flatMap((spec) =>
    spec.matchers
      .filter(
        (matcher) =>
          (matcher.code === undefined || matcher.code === code) &&
          (matcher.message === undefined || matcher.message === message) &&
          (matcher.messageIncludes === undefined ||
            message.includes(matcher.messageIncludes)),
      )
      .map((matcher) => ({
        spec,
        score:
          (matcher.code ? 1 : 0) +
          (matcher.message ? 4 : 0) +
          (matcher.messageIncludes ? 2 : 0),
      })),
  );
  matches.sort((a, b) => b.score - a.score);
  const best = matches[0];
  if (
    best &&
    !matches.some(
      (match) => match.score === best.score && match.spec.tag !== best.spec.tag,
    )
  ) {
    return best.spec.make(props);
  }
  return new UnknownGraphQLError({
    ...props,
    coordinate: root?.field,
  });
};

const uniqueByTag = (specs: ReadonlyArray<ErrorSpec>): ErrorSpec[] => [
  ...new Map(specs.map((spec) => [spec.tag, spec])).values(),
];

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

export function filterQuery<Item, Error = never>(
  predicate: (item: Query<Item>) => QueryNode<boolean, any>,
): (source: QueryNode<readonly Item[], Error>) => Query<readonly Item[], Error>;
export function filterQuery<Item, Error = never>(
  source: QueryNode<readonly Item[], Error>,
  predicate: (item: Query<Item>) => QueryNode<boolean, any>,
): Query<readonly Item[], Error>;
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

export function mapQuery<Item, Mapped, Error = never>(
  mapFn: (item: Query<Item>) => Mapped,
): (
  source: QueryNode<readonly Item[], Error>,
) => Query<readonly UnwrapPlan<Mapped>[], Error>;
export function mapQuery<Value, Mapped, Error = never>(
  mapFn: (value: Value) => Mapped,
): (source: QueryNode<Value, Error>) => Query<Mapped, Error>;
export function mapQuery<Item, Mapped, Error = never>(
  source: QueryNode<readonly Item[], Error>,
  mapFn: (item: Query<Item>) => Mapped,
): Query<readonly UnwrapPlan<Mapped>[], Error>;
export function mapQuery<Value, Mapped, Error = never>(
  source: QueryNode<Value, Error>,
  mapFn: (value: Value) => Mapped,
): Query<Mapped, Error>;
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

export function flatMapQuery<
  Value,
  Result,
  Error,
  Requirements,
  SourceError = never,
>(
  flatMapFn: (
    value: Value,
  ) => Effect.Effect<Result, Error, Requirements> | QueryNode<Result, Error>,
): (
  source: QueryNode<Value, SourceError>,
) => Query<Result, SourceError | Error>;
export function flatMapQuery<
  Value,
  Result,
  Error,
  Requirements,
  SourceError = never,
>(
  source: QueryNode<Value, SourceError>,
  flatMapFn: (
    value: Value,
  ) => Effect.Effect<Result, Error, Requirements> | QueryNode<Result, Error>,
): Query<Result, SourceError | Error>;
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
  ) => Effect.Effect<
    UnwrapPlan<Plan>,
    QueryError<PlanError<Plan>>,
    GqlTransport
  >) =>
  (...args) => {
    const plan = build(...args);
    return evaluatePlan(plan);
  };

// ── Pagination ──────────────────────────────────────────────────────────────
//
// A connection lens hides `edges`/`pageInfo`. `Query.pages` re-evaluates the
// query once per page: it sets the connection's `after` argument, paints
// `pageInfo { hasNextPage endCursor }` next to `edges`, and stops when
// `hasNextPage` is false.

/** The connection a paged query reads, below any list-level Map/Filter. */
const connectionOf = (expr: Expr): RootExpr | PropExpr => {
  const base = graphqlBase(expr);
  const isConnection =
    (base._tag === "Root" && base.connection === true) ||
    (base._tag === "Prop" && base.field.kind === "connection");
  if (!isConnection || inItem(base)) {
    throw new GqlError(
      `Query.pages needs a Relay connection, got ${printExpr(base)}`,
    );
  }
  const argTypes = base._tag === "Root" ? base.argTypes : base.field.argTypes;
  if (!argTypes || !("after" in argTypes)) {
    throw new GqlError(`${printExpr(base)} takes no "after" cursor`);
  }
  return base as RootExpr | PropExpr;
};

/** Rebuild `expr` with the connection's `after` argument set. */
const withCursor = (
  expr: Expr,
  connection: Expr,
  after: string | undefined,
): Expr => {
  if (expr === connection) {
    const current = expr as RootExpr | PropExpr;
    return { ...current, args: { ...current.args, after } } as Expr;
  }
  switch (expr._tag) {
    case "MapItems":
    case "Filter":
    case "MapValue":
    case "FlatMap":
      return { ...expr, parent: withCursor(expr.parent, connection, after) };
    default:
      throw new GqlError(`withCursor: ${expr._tag}`);
  }
};

const readPath = (data: unknown, path: Path): unknown => {
  let current = data;
  for (const segment of path) {
    if (current == null) return undefined;
    if (Array.isArray(current)) {
      throw new GqlError("Query.pages cannot page a connection inside a list");
    }
    current = (current as Record<string, unknown>)[segment];
  }
  return current;
};

interface PageState {
  readonly after: string | undefined;
  readonly seen: ReadonlySet<string>;
}

const fetchPage = <Item>(
  query: QueryNode<ReadonlyArray<Item>, unknown>,
  connection: RootExpr | PropExpr,
  state: PageState,
) =>
  Effect.gen(function* () {
    const pageExpr = withCursor(query.expr, connection, state.after);
    const forest = emptyForest();
    visitExpr(forest, pageExpr);
    const nodePath = paintAbs(
      forest,
      withCursor(connection, connection, state.after),
    );
    const connectionPath = nodePath.slice(0, -2);
    const pageInfo = ensureChild(
      forest,
      selAt(forest.roots, connectionPath),
      "pageInfo",
      {},
    );
    ensureChild(forest, pageInfo, "hasNextPage", { isScalar: true });
    ensureChild(forest, pageInfo, "endCursor", { isScalar: true });
    const compiled = emit(forest);
    log("page\n" + compiled.document);
    const data = yield* execute(compiled);
    const items = (yield* interpretPlan(
      make(pageExpr),
      data,
      compiled.rootAlias,
    )) as ReadonlyArray<Item> | null | undefined;
    const info = readPath(data, [...connectionPath, "pageInfo"]) as
      | { hasNextPage?: boolean; endCursor?: string | null }
      | null
      | undefined;
    const cursor = info?.endCursor ?? null;
    if (info?.hasNextPage !== true) {
      return [items ?? [], Option.none<PageState>()] as const;
    }
    if (cursor === null || cursor === state.after || state.seen.has(cursor)) {
      return yield* new GraphQLPaginationError({
        message: `${printExpr(connection)} returned a non-advancing cursor`,
        cursor,
      });
    }
    return [
      items ?? [],
      Option.some({ after: cursor, seen: new Set([...state.seen, cursor]) }),
    ] as const;
  });

/**
 * Every page of a Relay connection, one request per page. `query` is a
 * connection lens (root or nested under objects), optionally mapped or
 * filtered: `Query.pages(Railway.project({ id }).services({ first: 50 }))`.
 * Starts from the query's own `after` argument, if any.
 */
export const pagesQuery = <Item, Error>(
  query: QueryNode<ReadonlyArray<Item>, Error>,
): Stream.Stream<
  ReadonlyArray<Item>,
  QueryError<Error> | GraphQLPaginationError,
  GqlTransport
> =>
  Stream.unwrap(
    Effect.sync(() => {
      const connection = connectionOf(query.expr);
      const after = connection.args?.after;
      return Stream.paginate<
        PageState,
        ReadonlyArray<Item>,
        QueryError<Error> | GraphQLPaginationError,
        GqlTransport
      >(
        {
          after: typeof after === "string" ? after : undefined,
          seen: new Set(),
        },
        (state) =>
          fetchPage(query, connection, state).pipe(
            Effect.map(([items, next]) => [[items], next] as const),
          ) as Effect.Effect<
            readonly [
              ReadonlyArray<ReadonlyArray<Item>>,
              Option.Option<PageState>,
            ],
            QueryError<Error> | GraphQLPaginationError,
            GqlTransport
          >,
      );
    }),
  );

/** Every node of a Relay connection, across all pages. */
export const itemsQuery = <Item, Error>(
  query: QueryNode<ReadonlyArray<Item>, Error>,
): Stream.Stream<
  Item,
  QueryError<Error> | GraphQLPaginationError,
  GqlTransport
> => pagesQuery(query).pipe(Stream.flatMap(Stream.fromIterable));
