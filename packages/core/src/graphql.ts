/** GraphQL selections, typed failures and Effect execution for generated SDKs. */
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import * as Option from "effect/Option";
import * as S from "effect/Schema";
import * as Schedule from "effect/Schedule";
import * as Stream from "effect/Stream";
import {
  Kind,
  parseType,
  print,
  type FieldNode,
  type SelectionNode,
  type VariableDefinitionNode,
} from "graphql";
import type { GraphQLModel, GraphQLField } from "./codegen/graphql-client.ts";

export type { GraphQLModel } from "./codegen/graphql-client.ts";

/** A generated field's arguments, GraphQL output reference, and error tags. */
export interface Field<Args, Ref extends string, E extends string = never> {
  readonly args: Args;
  readonly type: Ref;
  readonly errors: E;
}

export interface Schema {
  types: Record<string, Record<string, Field<any, string, string>>>;
  scalars: Record<string, unknown>;
  errors: Record<string, GraphQLIssue>;
  possibleTypes: Record<string, string>;
  query: string;
  mutation: string;
  subscription: string;
  globalErrors: string;
}

type Named<T extends string> = T extends `${infer R}!`
  ? Named<R>
  : T extends `[${infer R}]`
    ? Named<R>
    : T;
type Fields<C extends Schema, N extends string> = N extends keyof C["types"]
  ? C["types"][N]
  : {};
type TypeOf<F> = F extends Field<any, infer T, any> ? T : never;
type ArgsOf<F> = F extends Field<infer A, any, any> ? A : never;
type TagsOf<F> = F extends Field<any, any, infer E> ? E : never;
type Where<A> = {} extends A ? { readonly where?: A } : { readonly where: A };
type Directives = { readonly $include?: boolean; readonly $skip?: boolean };
type FieldSelection<C extends Schema, F> =
  Named<TypeOf<F>> extends keyof C["scalars"]
    ?
        | ({} extends ArgsOf<F> ? boolean : never)
        | (Where<ArgsOf<F>> & Directives & { readonly select?: true })
    :
        | (keyof ArgsOf<F> extends never
            ? Selection<C, Named<TypeOf<F>>>
            : never)
        | (Where<ArgsOf<F>> &
            Directives & { readonly select: Selection<C, Named<TypeOf<F>>> });
type Alias<C extends Schema, N extends string> = {
  [K in keyof Fields<C, N>]: {
    readonly [P in K]: FieldSelection<C, Fields<C, N>[K]>;
  };
}[keyof Fields<C, N>];

/** Mobius-style field selection. Arguments are passed in `where`. */
export type Selection<C extends Schema, N extends string> = {
  readonly [K in keyof Fields<C, N>]?: FieldSelection<C, Fields<C, N>[K]>;
} & {
  readonly __typename?: boolean;
  readonly __alias?: Readonly<Record<string, Alias<C, N>>>;
  readonly __on?: N extends keyof C["possibleTypes"]
    ? { readonly [K in C["possibleTypes"][N]]?: Selection<C, K> }
    : never;
};
type Selected<Q> = Q extends { readonly select: infer P } ? P : Q;
type Keys<Q> = {
  [K in keyof Q]: Q[K] extends false | undefined ? never : K;
}[keyof Q];
type Simplify<A> = { [K in keyof A]: A[K] };
type AliasValue<C extends Schema, N extends string, Q> = {
  [K in Extract<Keys<Q>, keyof Fields<C, N>>]: Result<
    C,
    TypeOf<Fields<C, N>[K]>,
    Selected<Q[K]>
  >;
}[Extract<Keys<Q>, keyof Fields<C, N>>];
type AliasResult<C extends Schema, N extends string, Q> = Q extends {
  readonly __alias: infer A;
}
  ? Simplify<
      {
        [
          K in keyof A as Conditional<A[K][keyof A[K]]> extends true ? never : K
        ]: AliasValue<C, N, A[K]>;
      } & {
        [
          K in keyof A as Conditional<A[K][keyof A[K]]> extends true ? K : never
        ]?: AliasValue<C, N, A[K]>;
      }
    >
  : {};
type Conditional<Q> = boolean extends Q
  ? true
  : Q extends { readonly $include: infer I }
    ? [I] extends [true]
      ? Q extends { readonly $skip: infer S }
        ? [S] extends [false]
          ? false
          : true
        : false
      : true
    : Q extends { readonly $skip: infer S }
      ? [S] extends [false]
        ? false
        : true
      : false;
type ObjectFields<C extends Schema, N extends string, Q> = {
  [
    K in Extract<Keys<Q>, keyof Fields<C, N>> as Conditional<Q[K]> extends true
      ? never
      : K
  ]: Result<C, TypeOf<Fields<C, N>[K]>, Selected<Q[K]>>;
} & {
  [
    K in Extract<Keys<Q>, keyof Fields<C, N>> as Conditional<Q[K]> extends true
      ? K
      : never
  ]?: Result<C, TypeOf<Fields<C, N>[K]>, Selected<Q[K]>>;
};
type ObjectResult<C extends Schema, N extends string, Q> = Simplify<
  ObjectFields<C, N, Q> &
    (Q extends { readonly __typename: true } ? { __typename: N } : {}) &
    AliasResult<C, N, Q>
>;
type Branch<
  C extends Schema,
  N extends string,
  Q,
  T extends string,
> = T extends unknown
  ? Simplify<
      Omit<ObjectResult<C, N, Q>, "__typename"> &
        (Q extends { readonly __on: infer O }
          ? T extends keyof O
            ? ObjectResult<C, T, O[T]>
            : {}
          : {}) & { __typename: T }
    >
  : never;
type Value<C extends Schema, T extends string, Q> = T extends `[${infer I}]`
  ? Array<Result<C, I, Q>>
  : T extends keyof C["scalars"]
    ? C["scalars"][T]
    : T extends keyof C["possibleTypes"]
      ? Branch<C, T, Q, C["possibleTypes"][T]>
      : ObjectResult<C, T, Q>;
/** Selected output, preserving list and nullable wrappers. */
export type Result<
  C extends Schema,
  Ref extends string,
  Q,
> = Ref extends `${infer T}!` ? Value<C, T, Q> : Value<C, Ref, Q> | null;
type SelectionTags<C extends Schema, N extends string, Q> = string extends N
  ? string
  : Q extends object
    ?
        | {
            [K in Extract<Keys<Q>, keyof Fields<C, N>>]:
              | TagsOf<Fields<C, N>[K]>
              | SelectionTags<
                  C,
                  Named<TypeOf<Fields<C, N>[K]>>,
                  Selected<Q[K]>
                >;
          }[Extract<Keys<Q>, keyof Fields<C, N>>]
        | (Q extends { readonly __on: infer O }
            ? { [K in keyof O & string]: SelectionTags<C, K, O[K]> }[keyof O &
                string]
            : never)
        | (Q extends { readonly __alias: infer A }
            ? { [K in keyof A]: SelectionTags<C, N, A[K]> }[keyof A]
            : never)
    : never;
/** Known selected errors plus provider-wide errors and an honest fallback. */
export type Errors<C extends Schema, N extends string, Q> =
  | (SelectionTags<C, N, Q> extends infer Tags
      ? C["errors"][Extract<C["globalErrors"] | Tags, keyof C["errors"]>]
      : never)
  | UnknownGraphQLError;
type Root<C extends Schema, K extends OperationKind> = K extends "query"
  ? C["query"]
  : C["mutation"];
type OperationSelection<
  C extends Schema,
  N extends string,
  K extends keyof Fields<C, N>,
  Q,
> = { [P in K]: { select: Q } };

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
  retryAfter: S.optional(S.Number),
};
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
  /** Server retry hint in seconds. */
  readonly retryAfter?: number;
}
export class UnknownGraphQLError extends S.TaggedError<UnknownGraphQLError>()(
  "UnknownGraphQLError",
  {
    ...errorFields,
    coordinate: S.optional(S.String),
  },
) {}
/** All errors from one GraphQL execution, with the original partial response. */
export class GraphQLFailure<
  E extends GraphQLIssue = GraphQLIssue,
> extends Data.TaggedError("GraphQLFailure")<{
  readonly errors: readonly [E, ...E[]];
  readonly data: unknown;
  readonly status: number;
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
export class GraphQLTransportError extends Data.TaggedError(
  "GraphQLTransportError",
)<{
  readonly message: string;
  readonly cause?: unknown;
  readonly status?: number;
  readonly retryAfter?: number;
}> {}
export class GraphQLDecodeError extends Data.TaggedError("GraphQLDecodeError")<{
  readonly message: string;
  readonly path?: ReadonlyArray<string | number>;
  readonly cause?: unknown;
}> {}
export class GraphQLRequestError extends Data.TaggedError(
  "GraphQLRequestError",
)<{ readonly message: string }> {}
export type ClientError =
  | GraphQLTransportError
  | GraphQLDecodeError
  | GraphQLRequestError;
type IssueOf<E> = E extends GraphQLFailure<infer I> ? I : never;
/** True only when every issue has an allowed tag; mixed failures are never hidden. */
export const isErrorTag = (
  error: unknown,
  tags: string | readonly string[],
): boolean => {
  const allowed = typeof tags === "string" ? [tags] : tags;
  return (
    error instanceof GraphQLFailure &&
    error.errors.length > 0 &&
    error.errors.every((issue) => allowed.includes(issue._tag))
  );
};
/** Recover only an aggregate whose every issue matches. The original aggregate is also supplied. */
export const catchTags =
  <const T extends readonly string[] | string, B, E2, R2>(
    tags: T,
    handler: (
      error: GraphQLIssue & { readonly _tag: T extends string ? T : T[number] },
      failure: GraphQLFailure,
    ) => Effect.Effect<B, E2, R2>,
  ) =>
  <A, E, R>(
    self: Effect.Effect<A, E, R>,
  ): Effect.Effect<A | B, E | E2, R | R2> =>
    self.pipe(
      Effect.catch((error): Effect.Effect<B, E | E2, R2> =>
        isErrorTag(error, tags)
          ? handler(
              (error as GraphQLFailure).errors[0] as any,
              error as GraphQLFailure,
            )
          : Effect.fail(error),
      ),
    );

export type OperationKind = "query" | "mutation";
export interface GraphQLRequest {
  readonly query: string;
  readonly variables: Record<string, unknown>;
  readonly operationName: string;
  readonly kind: OperationKind;
}
export interface GraphQLResponse {
  readonly body: unknown;
  readonly status: number;
  readonly headers: Readonly<Record<string, string | undefined>>;
}
export type Transport<R> = (
  request: GraphQLRequest,
) => Effect.Effect<
  GraphQLResponse,
  GraphQLTransportError | GraphQLDecodeError,
  R
>;
interface Position {
  readonly field: string;
  readonly key: string;
  readonly coordinate: string;
  readonly type: string;
  readonly errors: readonly string[];
  readonly children: readonly Position[];
  readonly branches: Readonly<Record<string, readonly Position[]>>;
  readonly typename?: boolean;
  readonly conditional: boolean;
}
export interface CompiledQuery extends GraphQLRequest {
  readonly rootType: string;
  readonly positions: readonly Position[];
}
const object = (value: unknown): value is Record<string, any> =>
  value !== null && typeof value === "object" && !Array.isArray(value);
const named = (ref: string): string => ref.replace(/[\[\]!]/g, "");
const nameNode = (value: string) => ({ kind: Kind.NAME, value }) as const;
const requestError = (message: string): never => {
  throw new GraphQLRequestError({ message });
};
const assertName = (name: string) => {
  if (!/^[_A-Za-z][_0-9A-Za-z]*$/.test(name))
    requestError(`Invalid GraphQL name ${name}`);
};

/** Validate and encode inputs recursively. Undefined omits; null stays null. */
const encodeInput = (
  model: GraphQLModel,
  ref: string,
  value: unknown,
  at: string,
): unknown => {
  if (value === undefined) return undefined;
  if (value === null) {
    if (ref.endsWith("!")) requestError(`${at} must not be null`);
    return null;
  }
  const base = ref.endsWith("!") ? ref.slice(0, -1) : ref;
  if (base.startsWith("[")) {
    if (!Array.isArray(value)) requestError(`${at} must be an array`);
    return (value as unknown[]).map((v, i) => {
      if (v === undefined) requestError(`${at}[${i}] must not be undefined`);
      return encodeInput(model, base.slice(1, -1), v, `${at}[${i}]`);
    });
  }
  const type = model.types[base];
  if (!type) requestError(`${at}: unknown input type ${base}`);
  if (type.kind === "INPUT_OBJECT") {
    if (!object(value)) requestError(`${at} must be an input object`);
    const input = value as Record<string, unknown>;
    const result: Record<string, unknown> = {};
    for (const key of Object.keys(input))
      if (!type.inputFields?.[key])
        requestError(`${at}: unknown input field ${key}`);
    for (const [key, field] of Object.entries(type.inputFields ?? {})) {
      if (input[key] === undefined) {
        if (field.type.endsWith("!") && field.defaultValue === undefined)
          requestError(`${at}.${key} is required`);
      } else
        result[key] = encodeInput(
          model,
          field.type,
          input[key],
          `${at}.${key}`,
        );
    }
    return result;
  }
  if (type.kind === "ENUM") {
    if (typeof value !== "string" || !type.enumValues?.includes(value))
      requestError(`${at}: invalid ${base}`);
  } else if (type.scalar === "string" || base === "String" || base === "ID") {
    if (typeof value !== "string") requestError(`${at} must be a string`);
  } else if (type.scalar === "number" || base === "Int" || base === "Float") {
    if (typeof value !== "number" || !Number.isFinite(value))
      requestError(`${at} must be a finite number`);
    if (
      base === "Int" &&
      (!Number.isInteger(value) ||
        (value as number) < -2147483648 ||
        (value as number) > 2147483647)
    )
      requestError(`${at} must be a GraphQL Int`);
  } else if (type.scalar === "boolean" || base === "Boolean") {
    if (typeof value !== "boolean") requestError(`${at} must be a boolean`);
  }
  if (
    type.scalar === "string | number" &&
    typeof value !== "string" &&
    typeof value !== "number"
  )
    requestError(`${at} must be a string or number`);
  if (
    base === "BigInt" &&
    ((typeof value === "number" && !Number.isSafeInteger(value)) ||
      (typeof value === "string" && !/^-?\d+$/.test(value)))
  )
    requestError(`${at} must be a safe integer or an integer string`);
  // JSON custom scalars must still be transportable JSON; preserve scalar contents.
  try {
    return JSON.parse(JSON.stringify(value));
  } catch {
    return requestError(`${at} is not a JSON-encodable scalar`);
  }
};

/** Compile one selection to a GraphQL AST, variables, and an error/decoder path map. */
export const compile = (
  model: GraphQLModel,
  kind: OperationKind,
  selection: unknown,
  operationName = "Distilled",
): CompiledQuery => {
  const rootType = kind === "query" ? model.queryType : model.mutationType;
  if (!rootType) return requestError(`Schema has no ${kind} root`);
  assertName(operationName);
  const variables: Record<string, unknown> = {};
  const definitions: VariableDefinitionNode[] = [];
  const variable = (ref: string, value: unknown) => {
    const id = `v${definitions.length}`;
    variables[id] = value;
    definitions.push({
      kind: Kind.VARIABLE_DEFINITION,
      variable: { kind: Kind.VARIABLE, name: nameNode(id) },
      type: parseType(ref),
    });
    return { kind: Kind.VARIABLE, name: nameNode(id) } as const;
  };
  const walk = (
    parent: string,
    input: unknown,
  ): { nodes: SelectionNode[]; positions: Position[] } => {
    if (!object(input))
      return requestError(`${parent} requires an object selection`);
    const type = model.types[parent];
    if (!type) return requestError(`Unknown GraphQL type ${parent}`);
    const nodes: SelectionNode[] = [];
    const positions: Position[] = [];
    const addField = (fieldName: string, selected: unknown, alias?: string) => {
      if (selected === false || selected === undefined) return;
      assertName(fieldName);
      if (alias) assertName(alias);
      const key = alias ?? fieldName;
      if (positions.some((p) => p.key === key))
        return requestError(
          `Duplicate response key ${parent}.${key}; use distinct aliases`,
        );
      const field: GraphQLField | undefined =
        fieldName === "__typename"
          ? { type: "String!", args: {}, errors: [] }
          : type.fields?.[fieldName];
      if (!field) return requestError(`Unknown field ${parent}.${fieldName}`);
      const wrapper =
        object(selected) &&
        ("where" in selected ||
          "select" in selected ||
          "$include" in selected ||
          "$skip" in selected)
          ? selected
          : undefined;
      const args = wrapper?.where ?? {};
      if (!object(args))
        return requestError(`${parent}.${fieldName}.where must be an object`);
      for (const arg of Object.keys(args))
        if (!field.args[arg])
          return requestError(
            `Unknown argument ${parent}.${fieldName}(${arg})`,
          );
      const arguments_: NonNullable<FieldNode["arguments"]>[number][] = [];
      for (const [arg, definition] of Object.entries(field.args)) {
        if (args[arg] === undefined) {
          if (
            definition.type.endsWith("!") &&
            definition.defaultValue === undefined
          )
            return requestError(`${parent}.${fieldName}(${arg}) is required`);
        } else
          arguments_.push({
            kind: Kind.ARGUMENT,
            name: nameNode(arg),
            value: variable(
              definition.type,
              encodeInput(
                model,
                definition.type,
                args[arg],
                `${parent}.${fieldName}(${arg})`,
              ),
            ),
          });
      }
      const directives: NonNullable<FieldNode["directives"]>[number][] = [];
      for (const directive of ["include", "skip"] as const) {
        const value = wrapper?.[`$${directive}`];
        if (value !== undefined) {
          if (typeof value !== "boolean")
            return requestError(`$${directive} must be a boolean`);
          directives.push({
            kind: Kind.DIRECTIVE,
            name: nameNode(directive),
            arguments: [
              {
                kind: Kind.ARGUMENT,
                name: nameNode("if"),
                value: variable("Boolean!", value),
              },
            ],
          });
        }
      }
      const outputType = model.types[named(field.type)];
      const leaf =
        fieldName === "__typename" ||
        outputType?.kind === "SCALAR" ||
        outputType?.kind === "ENUM";
      const sub = wrapper ? wrapper.select : selected;
      let child: ReturnType<typeof walk> = { nodes: [], positions: [] };
      if (leaf) {
        if (sub !== true && sub !== undefined)
          return requestError(
            `${parent}.${fieldName} is a leaf and takes no selection`,
          );
      } else child = walk(named(field.type), sub);
      nodes.push({
        kind: Kind.FIELD,
        name: nameNode(fieldName),
        ...(alias ? { alias: nameNode(alias) } : {}),
        arguments: arguments_,
        directives,
        ...(!leaf
          ? {
              selectionSet: {
                kind: Kind.SELECTION_SET,
                selections: child.nodes,
              },
            }
          : {}),
      });
      const branches: Record<string, readonly Position[]> = {};
      // Branch metadata is attached to sentinel positions by walk and removed from regular children.
      for (const p of child.positions)
        if (p.field === "__fragment") branches[p.type] = p.children;
      positions.push({
        field: fieldName,
        key,
        coordinate: `${parent}.${fieldName}`,
        type: field.type,
        errors: field.errors,
        children: child.positions.filter((p) => p.field !== "__fragment"),
        branches,
        typename: fieldName === "__typename",
        conditional: wrapper?.$include === false || wrapper?.$skip === true,
      });
    };
    for (const [key, value] of Object.entries(input)) {
      if (key === "__alias") {
        if (!object(value))
          return requestError(`${parent}.__alias must be an object`);
        for (const [alias, fields] of Object.entries(value)) {
          if (!object(fields) || Object.keys(fields).length !== 1)
            return requestError(`Alias ${alias} must select exactly one field`);
          const [field, selected] = Object.entries(fields)[0]!;
          addField(field, selected, alias);
        }
      } else if (key === "__on") {
        if (!object(value))
          return requestError(`${parent}.__on must be an object`);
        for (const [branch, fields] of Object.entries(value)) {
          if (!type.possibleTypes?.includes(branch))
            return requestError(
              `${branch} is not a possible type of ${parent}`,
            );
          const children = walk(branch, fields);
          nodes.push({
            kind: Kind.INLINE_FRAGMENT,
            typeCondition: { kind: Kind.NAMED_TYPE, name: nameNode(branch) },
            selectionSet: {
              kind: Kind.SELECTION_SET,
              selections: children.nodes,
            },
          });
          positions.push({
            field: "__fragment",
            key: "",
            coordinate: parent,
            type: branch,
            errors: [],
            children: children.positions,
            branches: {},
            conditional: false,
          });
        }
      } else addField(key, value);
    }
    if (type.possibleTypes?.length && !positions.some((p) => p.typename))
      addField("__typename", true);
    if (!nodes.length) return requestError(`${parent} has an empty selection`);
    return { nodes, positions };
  };
  const selected = walk(rootType, selection);
  const query = print({
    kind: Kind.DOCUMENT,
    definitions: [
      {
        kind: Kind.OPERATION_DEFINITION,
        operation: kind as any,
        name: nameNode(operationName),
        variableDefinitions: definitions,
        selectionSet: { kind: Kind.SELECTION_SET, selections: selected.nodes },
      },
    ],
  });
  return {
    query,
    variables,
    operationName,
    kind,
    rootType,
    positions: selected.positions,
  };
};

const decodeFailure = (
  message: string,
  path: ReadonlyArray<string | number>,
): never => {
  throw new GraphQLDecodeError({ message, path });
};
/** Validate only selected fields. Preserve the schema's nullability exactly. */
const decodeData = (
  model: GraphQLModel,
  ref: string,
  data: unknown,
  positions: readonly Position[],
  branches: Readonly<Record<string, readonly Position[]>>,
  path: ReadonlyArray<string | number>,
): unknown => {
  if (data === null) {
    if (ref.endsWith("!"))
      return decodeFailure(`Non-null ${ref} was null`, path);
    return null;
  }
  if (data === undefined) return decodeFailure(`Missing selected ${ref}`, path);
  const base = ref.endsWith("!") ? ref.slice(0, -1) : ref;
  if (base.startsWith("[")) {
    if (!Array.isArray(data))
      return decodeFailure(`Expected ${ref} array`, path);
    return data.map((v, i) =>
      decodeData(model, base.slice(1, -1), v, positions, branches, [
        ...path,
        i,
      ]),
    );
  }
  const type = model.types[base];
  if (!type) return decodeFailure(`Unknown response type ${base}`, path);
  if (type.kind === "SCALAR") {
    const primitive =
      type.scalar ??
      (
        {
          String: "string",
          ID: "string",
          Boolean: "boolean",
          Int: "number",
          Float: "number",
        } as Record<string, string>
      )[base];
    if (
      primitive === "string | number" &&
      typeof data !== "string" &&
      typeof data !== "number"
    )
      return decodeFailure(`Expected ${base}`, path);
    if (
      base === "BigInt" &&
      ((typeof data === "number" && !Number.isSafeInteger(data)) ||
        (typeof data === "string" && !/^-?\d+$/.test(data)))
    )
      return decodeFailure(`Invalid ${base}`, path);
    if (
      ["string", "number", "boolean"].includes(primitive ?? "") &&
      typeof data !== primitive
    )
      return decodeFailure(`Expected ${base}`, path);
    if (
      typeof data === "number" &&
      (!Number.isFinite(data) ||
        (base === "Int" &&
          (!Number.isInteger(data) || data < -2147483648 || data > 2147483647)))
    )
      return decodeFailure(`Invalid ${base}`, path);
    return data;
  }
  if (type.kind === "ENUM") {
    if (typeof data !== "string" || !type.enumValues?.includes(data))
      return decodeFailure(`Invalid ${base} enum`, path);
    return data;
  }
  if (!object(data)) return decodeFailure(`Expected ${base} object`, path);
  if (
    type.possibleTypes?.length &&
    (typeof data.__typename !== "string" ||
      !type.possibleTypes.includes(data.__typename))
  )
    return decodeFailure(`Missing or invalid ${base} __typename`, path);
  const active = [
    ...positions,
    ...(typeof data.__typename === "string"
      ? (branches[data.__typename] ?? [])
      : []),
  ];
  const result: Record<string, unknown> = {};
  const merged = new Map<string, Position>();
  for (const position of active) {
    if (position.conditional) continue;
    const previous = merged.get(position.key);
    merged.set(
      position.key,
      previous
        ? {
            ...position,
            children: [...previous.children, ...position.children],
            branches: Object.fromEntries(
              [
                ...new Set([
                  ...Object.keys(previous.branches),
                  ...Object.keys(position.branches),
                ]),
              ].map((key) => [
                key,
                [
                  ...(previous.branches[key] ?? []),
                  ...(position.branches[key] ?? []),
                ],
              ]),
            ),
          }
        : position,
    );
  }
  for (const position of merged.values()) {
    if (position.conditional) continue;
    if (position.typename) {
      if (
        typeof data[position.key] !== "string" ||
        (type.kind === "OBJECT" && data[position.key] !== base)
      )
        return decodeFailure(`Invalid __typename for ${base}`, [
          ...path,
          position.key,
        ]);
      Object.defineProperty(result, position.key, {
        value: data[position.key],
        enumerable: true,
        configurable: true,
        writable: true,
      });
    } else
      Object.defineProperty(result, position.key, {
        value: decodeData(
          model,
          position.type,
          data[position.key],
          position.children,
          position.branches,
          [...path, position.key],
        ),
        enumerable: true,
        configurable: true,
        writable: true,
      });
  }
  return result;
};

type ErrorConstructor = new (args: any) => GraphQLIssue;
const classify = (
  model: GraphQLModel,
  compiled: CompiledQuery,
  raw: Record<string, any>,
  response: GraphQLResponse,
  classes: Readonly<Record<string, ErrorConstructor>>,
): GraphQLIssue => {
  const path = Array.isArray(raw.path)
    ? (raw.path as (string | number)[])
    : undefined;
  let candidates = compiled.positions;
  let position: Position | undefined;
  let currentData: unknown = object(response.body)
    ? response.body.data
    : undefined;
  let parents: readonly Position[] = [];
  const descendants = (
    positions: readonly Position[],
    value: unknown,
  ): readonly Position[] =>
    positions.flatMap((p) => [
      ...p.children,
      ...(object(value) && typeof value.__typename === "string"
        ? (p.branches[value.__typename] ?? [])
        : Object.values(p.branches).flat()),
    ]);
  let valid = !!path?.length;
  for (const segment of path ?? []) {
    if (typeof segment === "number") {
      currentData = Array.isArray(currentData)
        ? currentData[segment]
        : undefined;
      candidates = descendants(parents, currentData);
      continue;
    }
    const matches = candidates.filter((p) => p.key === segment);
    if (!matches.length) {
      valid = false;
      break;
    }
    position = {
      ...matches[0]!,
      errors: [...new Set(matches.flatMap((p) => p.errors))],
    };
    currentData = object(currentData) ? currentData[segment] : undefined;
    parents = matches;
    candidates = descendants(matches, currentData);
  }
  const extensions = object(raw.extensions) ? raw.extensions : {};
  const code =
    typeof extensions.code === "string"
      ? extensions.code
      : typeof extensions.errorCode === "string"
        ? extensions.errorCode
        : undefined;
  const retryHeader = response.headers["retry-after"];
  const retryAfter =
    retryHeader && /^\d+(\.\d+)?$/.test(retryHeader)
      ? Number(retryHeader)
      : undefined;
  const props = {
    message: raw.message,
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
    retryAfter,
  };
  const tags = [
    ...model.globalErrors,
    ...(valid ? (position?.errors ?? []) : []),
  ];
  const matches = tags.flatMap((tag) =>
    (model.errors[tag]?.matchers ?? [])
      .filter(
        (matcher) =>
          (matcher.code === undefined || matcher.code === code) &&
          (matcher.message === undefined || matcher.message === raw.message) &&
          (matcher.messageIncludes === undefined ||
            raw.message.includes(matcher.messageIncludes)),
      )
      .map((matcher) => ({
        tag,
        score:
          (matcher.code ? 1 : 0) +
          (matcher.message ? 4 : 0) +
          (matcher.messageIncludes ? 2 : 0),
      })),
  );
  matches.sort((a, b) => b.score - a.score);
  const best = matches[0];
  const tag =
    best && !matches.some((m) => m.score === best.score && m.tag !== best.tag)
      ? best.tag
      : undefined;
  if (tag && classes[tag]) return new classes[tag](props);
  return new UnknownGraphQLError({
    ...props,
    coordinate: valid ? position?.coordinate : undefined,
  });
};

export interface Report<A, E extends GraphQLIssue> {
  readonly data: A | null | undefined;
  readonly errors: ReadonlyArray<E>;
  readonly status: number;
  readonly extensions?: unknown;
}
type Failure<C extends Schema, N extends string, Q> =
  | ClientError
  | GraphQLFailure<Errors<C, N, Q>>;
type FieldAt<
  C extends Schema,
  N extends string,
  K extends string,
> = K extends keyof Fields<C, N> ? Fields<C, N>[K] : never;
type ConnectionEdge<C extends Schema, Ref extends string> = Named<
  TypeOf<FieldAt<C, Named<Ref>, "edges">>
>;
type ConnectionNode<C extends Schema, Ref extends string> = TypeOf<
  FieldAt<C, ConnectionEdge<C, Ref>, "node">
>;

export interface ObjectOperation<
  C extends Schema,
  K extends OperationKind,
  N extends keyof Fields<C, Root<C, K>> & string,
  R,
> {
  <const Q extends Selection<C, Named<TypeOf<Fields<C, Root<C, K>>[N]>>>>(
    args: ArgsOf<Fields<C, Root<C, K>>[N]>,
    select: Q,
  ): Effect.Effect<
    Result<C, TypeOf<Fields<C, Root<C, K>>[N]>, Q>,
    Failure<C, Root<C, K>, OperationSelection<C, Root<C, K>, N, Q>>,
    R
  >;
}
export interface ScalarOperation<
  C extends Schema,
  K extends OperationKind,
  N extends keyof Fields<C, Root<C, K>> & string,
  R,
> {
  (
    args: ArgsOf<Fields<C, Root<C, K>>[N]>,
  ): Effect.Effect<
    Result<C, TypeOf<Fields<C, Root<C, K>>[N]>, true>,
    Failure<C, Root<C, K>, OperationSelection<C, Root<C, K>, N, true>>,
    R
  >;
}
export interface Pagination<
  C extends Schema,
  K extends OperationKind,
  N extends keyof Fields<C, Root<C, K>> & string,
  R,
> {
  pages<const Q extends Selection<C, Named<TypeOf<Fields<C, Root<C, K>>[N]>>>>(
    args: ArgsOf<Fields<C, Root<C, K>>[N]>,
    select: Q,
  ): Stream.Stream<
    Result<C, TypeOf<Fields<C, Root<C, K>>[N]>, Q>,
    | ClientError
    | GraphQLFailure<
        | Errors<C, Root<C, K>, OperationSelection<C, Root<C, K>, N, Q>>
        | Errors<
            C,
            Named<TypeOf<Fields<C, Root<C, K>>[N]>>,
            { pageInfo: { endCursor: true; hasNextPage: true } }
          >
      >,
    R
  >;
  items<
    const Q extends Selection<
      C,
      Named<ConnectionNode<C, TypeOf<Fields<C, Root<C, K>>[N]>>>
    >,
  >(
    args: ArgsOf<Fields<C, Root<C, K>>[N]>,
    select: Q,
  ): Stream.Stream<
    Result<C, ConnectionNode<C, TypeOf<Fields<C, Root<C, K>>[N]>>, Q>,
    Failure<
      C,
      Root<C, K>,
      OperationSelection<
        C,
        Root<C, K>,
        N,
        { edges: { node: Q }; pageInfo: { endCursor: true; hasNextPage: true } }
      >
    >,
    R
  >;
}
export type Operation<
  C extends Schema,
  K extends OperationKind,
  N extends keyof Fields<C, Root<C, K>> & string,
  R,
> =
  Named<TypeOf<Fields<C, Root<C, K>>[N]>> extends keyof C["scalars"]
    ? ScalarOperation<C, K, N, R>
    : ObjectOperation<C, K, N, R> &
        (K extends "query"
          ? "after" extends keyof ArgsOf<Fields<C, Root<C, K>>[N]>
            ? [ConnectionNode<C, TypeOf<Fields<C, Root<C, K>>[N]>>] extends [
                never,
              ]
              ? {}
              : Pagination<C, K, N, R>
            : {}
          : {});

/** Construct an Effect client; credentials and HTTP are resolved by the transport per call. */
export const makeClient = <C extends Schema, R>(
  model: GraphQLModel,
  transport: Transport<R>,
  classes: Readonly<Record<string, ErrorConstructor>>,
) => {
  const executeReport = (
    kind: OperationKind,
    selection: unknown,
  ): Effect.Effect<Report<any, GraphQLIssue>, ClientError, R> =>
    Effect.gen(function* () {
      const compiled = yield* Effect.try({
        try: () => compile(model, kind, selection),
        catch: (cause) =>
          cause instanceof GraphQLRequestError
            ? cause
            : new GraphQLRequestError({ message: String(cause) }),
      });
      const response = yield* transport(compiled);
      return yield* Effect.try({
        try: () => {
          const body = response.body;
          if (!object(body))
            return decodeFailure("GraphQL response must be an object", []);
          if (
            body.errors !== undefined &&
            (!Array.isArray(body.errors) || !body.errors.length)
          )
            return decodeFailure("GraphQL errors must be a nonempty array", []);
          const rawErrors = body.errors ?? [];
          for (const error of rawErrors) {
            if (!object(error) || typeof error.message !== "string")
              return decodeFailure("Invalid GraphQL error", []);
            if (
              error.path !== undefined &&
              (!Array.isArray(error.path) ||
                error.path.some(
                  (p: unknown) =>
                    typeof p !== "string" &&
                    (typeof p !== "number" || !Number.isInteger(p) || p < 0),
                ))
            )
              return decodeFailure("Invalid GraphQL error path", []);
          }
          if (!("data" in body) && !rawErrors.length) {
            if (response.status >= 400)
              throw new GraphQLTransportError({
                message: `HTTP ${response.status} without a GraphQL response`,
                status: response.status,
              });
            return decodeFailure(
              "GraphQL response has neither data nor errors",
              [],
            );
          }
          if (response.status >= 400 && !rawErrors.length)
            throw new GraphQLTransportError({
              message: `HTTP ${response.status} without GraphQL errors`,
              status: response.status,
            });
          const errors = rawErrors.map((raw: Record<string, any>) =>
            classify(model, compiled, raw, response, classes),
          );
          let data = body.data;
          if (data !== undefined && data !== null)
            data = decodeData(
              model,
              compiled.rootType + "!",
              data,
              compiled.positions,
              {},
              [],
            );
          if ((data === undefined || data === null) && !errors.length)
            return decodeFailure("GraphQL success has no data", []);
          return {
            data,
            errors,
            status: response.status,
            extensions: body.extensions,
          };
        },
        catch: (cause) =>
          cause instanceof GraphQLDecodeError ||
          cause instanceof GraphQLTransportError
            ? cause
            : new GraphQLDecodeError({
                message: "Invalid GraphQL response",
                cause,
              }),
      });
    });
  const retryable = (error: ClientError | GraphQLFailure): boolean =>
    error instanceof GraphQLFailure
      ? error.errors.every(
          (issue) => model.errors[issue._tag]?.retryable === true,
        )
      : error instanceof GraphQLTransportError &&
        (error.status === undefined ||
          error.status === 429 ||
          error.status >= 500);
  const execute = (
    kind: OperationKind,
    selection: unknown,
  ): Effect.Effect<any, ClientError | GraphQLFailure, R> => {
    const effect = executeReport(kind, selection).pipe(
      Effect.flatMap((report) =>
        report.errors.length
          ? Effect.fail(
              new GraphQLFailure({
                errors: report.errors as [GraphQLIssue, ...GraphQLIssue[]],
                data: report.data,
                status: report.status,
              }),
            )
          : Effect.succeed(report.data),
      ),
    );
    return kind === "query"
      ? effect.pipe(
          Effect.retry({
            while: retryable,
            times: 5,
            schedule: Schedule.exponential("200 millis"),
          }),
        )
      : effect;
  };
  const operation = <
    K extends OperationKind,
    N extends keyof Fields<C, Root<C, K>> & string,
  >(
    kind: K,
    name: N,
  ): Operation<C, K, N, R> => {
    const field =
      model.types[kind === "query" ? model.queryType : model.mutationType!]
        ?.fields?.[name];
    const call = (args: unknown, selection?: unknown) =>
      execute(kind, {
        [name]: { where: args, select: selection ?? true },
      }).pipe(Effect.map((data) => data[name]));
    const pages = (args: any, selection: any) =>
      Stream.unwrap(
        Effect.try({
          try: () => {
            const connection = field && model.types[named(field.type)];
            if (
              kind !== "query" ||
              !field?.args.after ||
              !connection?.fields?.edges ||
              !connection.fields.pageInfo
            )
              return Stream.fromEffect(
                Effect.fail(
                  new GraphQLRequestError({
                    message: `${name} is not a paginated query connection`,
                  }),
                ),
              );
            // Cursor fields are internal additions; the caller's projection remains exact.
            const projection = compile(model, kind, {
              [name]: { where: args, select: selection },
            }).positions[0]!;
            let cursorKey = "pageInfo";
            let complete: Record<string, unknown>;
            if (
              selection.__alias &&
              Object.hasOwn(selection.__alias, "pageInfo")
            ) {
              cursorKey = "_distilledPageInfo";
              while (
                Object.hasOwn(selection, cursorKey) ||
                Object.hasOwn(selection.__alias, cursorKey)
              )
                cursorKey += "_";
              complete = {
                ...selection,
                __alias: {
                  ...selection.__alias,
                  [cursorKey]: {
                    pageInfo: { endCursor: true, hasNextPage: true },
                  },
                },
              };
            } else {
              const {
                $include: _include,
                $skip: _skip,
                ...pageFields
              } = selection.pageInfo?.select ?? selection.pageInfo ?? {};
              complete = {
                ...selection,
                pageInfo: { ...pageFields, endCursor: true, hasNextPage: true },
              };
            }
            return Stream.paginate(
              {
                after: args.after as string | undefined,
                seen: new Set<string>(),
              },
              (state) =>
                call({ ...args, after: state.after }, complete).pipe(
                  Effect.flatMap((page) => {
                    const cursor = page?.[cursorKey]?.endCursor;
                    const more = page?.[cursorKey]?.hasNextPage;
                    if (
                      more &&
                      (typeof cursor !== "string" ||
                        cursor === state.after ||
                        state.seen.has(cursor))
                    )
                      return Effect.fail(
                        new GraphQLDecodeError({
                          message: `${name} returned a non-advancing pagination cursor`,
                        }),
                      );
                    const seen = new Set(state.seen);
                    if (typeof cursor === "string") seen.add(cursor);
                    const projected: any = decodeData(
                      model,
                      field.type,
                      page,
                      projection.children,
                      projection.branches,
                      [],
                    );
                    return Effect.succeed([
                      [projected],
                      more
                        ? Option.some({ after: cursor, seen })
                        : Option.none(),
                    ] as const);
                  }),
                ),
            );
          },
          catch: (cause) =>
            cause instanceof GraphQLRequestError
              ? cause
              : new GraphQLRequestError({ message: String(cause) }),
        }),
      );
    return Object.assign(call, {
      pages,
      items: (args: unknown, select: unknown) =>
        pages(args, { edges: { node: select } }).pipe(
          Stream.flatMap((page) =>
            Stream.fromIterable(
              (page?.edges ?? []).flatMap((edge: any) =>
                edge === null ? [] : [edge.node],
              ),
            ),
          ),
        ),
    }) as unknown as Operation<C, K, N, R>;
  };
  return {
    query: <const Q extends Selection<C, C["query"]>>(
      selection: Q,
    ): Effect.Effect<
      Result<C, `${C["query"]}!`, Q>,
      Failure<C, C["query"], Q>,
      R
    > => execute("query", selection) as any,
    mutation: <const Q extends Selection<C, C["mutation"]>>(
      selection: Q,
    ): Effect.Effect<
      Result<C, `${C["mutation"]}!`, Q>,
      Failure<C, C["mutation"], Q>,
      R
    > => execute("mutation", selection) as any,
    report: {
      query: <const Q extends Selection<C, C["query"]>>(
        selection: Q,
      ): Effect.Effect<
        Report<Result<C, `${C["query"]}!`, Q>, Errors<C, C["query"], Q>>,
        ClientError,
        R
      > => executeReport("query", selection) as any,
      mutation: <const Q extends Selection<C, C["mutation"]>>(
        selection: Q,
      ): Effect.Effect<
        Report<Result<C, `${C["mutation"]}!`, Q>, Errors<C, C["mutation"], Q>>,
        ClientError,
        R
      > => executeReport("mutation", selection) as any,
    },
    operation,
  };
};
