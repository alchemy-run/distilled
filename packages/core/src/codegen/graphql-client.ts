/** GraphQL-native introspection compiler. No traversal limits or RPC projection. */
import { readIntrospection, type TypeRef } from "./graphql.ts";

export interface GraphQLArgument {
  readonly type: string;
  readonly description?: string;
  readonly defaultValue?: string;
}
export interface GraphQLField {
  readonly type: string;
  readonly args: Record<string, GraphQLArgument>;
  readonly errors: readonly string[];
  readonly description?: string;
  readonly deprecated?: string | true;
}
export interface GraphQLType {
  readonly kind: string;
  readonly description?: string;
  readonly fields?: Record<string, GraphQLField>;
  readonly inputFields?: Record<string, GraphQLArgument>;
  readonly enumValues?: readonly string[];
  readonly possibleTypes?: readonly string[];
  readonly interfaces?: readonly string[];
  /** TypeScript scalar representation; custom JSON scalars default to unknown. */
  readonly scalar?: string;
}
export interface GraphQLErrorDefinition {
  readonly description?: string;
  readonly category?: string;
  readonly retryable?: boolean;
  readonly matchers: readonly {
    readonly code?: string;
    readonly message?: string;
    readonly messageIncludes?: string;
  }[];
}
export interface GraphQLModel {
  readonly version: 1;
  readonly queryType: string;
  readonly mutationType?: string;
  readonly subscriptionType?: string;
  readonly types: Record<string, GraphQLType>;
  readonly errors: Record<string, GraphQLErrorDefinition>;
  readonly globalErrors: readonly string[];
}

export const graphqlTypeString = (ref: TypeRef): string => {
  if (ref.kind === "NON_NULL" || ref.kind === "LIST") {
    if (!ref.ofType)
      throw new Error(`Incomplete GraphQL ${ref.kind} reference`);
    const inner = graphqlTypeString(ref.ofType);
    return ref.kind === "NON_NULL" ? `${inner}!` : `[${inner}]`;
  }
  if (!ref.name) throw new Error("Unnamed GraphQL type reference");
  return ref.name;
};

/** Retain every schema coordinate, wrapper, default and abstract-type relationship. */
export const convertGraphQLClient = (
  introspection: unknown,
  options: { readonly scalars?: Readonly<Record<string, string>> } = {},
): GraphQLModel => {
  const schema = readIntrospection(introspection);
  const scalars = {
    String: "string",
    ID: "string",
    Int: "number",
    Float: "number",
    Boolean: "boolean",
    ...options.scalars,
  };
  const argument = (value: {
    type: TypeRef;
    description?: string | null;
    defaultValue?: string | null;
  }): GraphQLArgument => ({
    type: graphqlTypeString(value.type),
    ...(value.description ? { description: value.description } : {}),
    ...(value.defaultValue != null ? { defaultValue: value.defaultValue } : {}),
  });
  const types: Record<string, GraphQLType> = {};
  for (const type of [...schema.types].sort((a, b) =>
    a.name.localeCompare(b.name),
  )) {
    if (type.name.startsWith("__")) continue;
    types[type.name] = {
      kind: type.kind,
      ...(type.description ? { description: type.description } : {}),
      ...(type.kind === "SCALAR"
        ? { scalar: scalars[type.name as keyof typeof scalars] ?? "unknown" }
        : {}),
      ...(type.fields
        ? {
            fields: Object.fromEntries(
              [...type.fields]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((field) => [
                  field.name,
                  {
                    type: graphqlTypeString(field.type),
                    args: Object.fromEntries(
                      field.args.map((arg) => [arg.name, argument(arg)]),
                    ),
                    errors: [],
                    ...(field.description
                      ? { description: field.description }
                      : {}),
                    ...(field.isDeprecated
                      ? {
                          deprecated:
                            (
                              field as typeof field & {
                                deprecationReason?: string;
                              }
                            ).deprecationReason || true,
                        }
                      : {}),
                  },
                ]),
            ),
          }
        : {}),
      ...(type.inputFields
        ? {
            inputFields: Object.fromEntries(
              type.inputFields.map((field) => [field.name, argument(field)]),
            ),
          }
        : {}),
      ...(type.enumValues
        ? { enumValues: type.enumValues.map((value) => value.name) }
        : {}),
      ...(type.possibleTypes
        ? { possibleTypes: type.possibleTypes.map((ref) => ref.name!) }
        : {}),
      ...("interfaces" in type && Array.isArray(type.interfaces)
        ? {
            interfaces: type.interfaces.map(
              (ref: { name: string }) => ref.name,
            ),
          }
        : {}),
    };
  }
  return {
    version: 1,
    queryType: schema.queryType.name,
    ...(schema.mutationType ? { mutationType: schema.mutationType.name } : {}),
    ...(schema.subscriptionType
      ? { subscriptionType: schema.subscriptionType.name }
      : {}),
    types,
    errors: {},
    globalErrors: [],
  };
};

/** Reject dangling schema/error references after patches, before generating code. */
export const validateGraphQLModel = (model: GraphQLModel): void => {
  const checkType = (ref: string, coordinate: string) => {
    const name = ref.replace(/[\[\]!]/g, "");
    if (!model.types[name])
      throw new Error(`${coordinate}: unknown GraphQL type ${name}`);
  };
  const checkError = (error: string, coordinate: string) => {
    if (!model.errors[error])
      throw new Error(`${coordinate}: unknown GraphQL error ${error}`);
  };
  for (const name of [
    model.queryType,
    model.mutationType,
    model.subscriptionType,
  ]) {
    if (name && !model.types[name])
      throw new Error(`Unknown GraphQL root ${name}`);
  }
  for (const error of model.globalErrors) checkError(error, "globalErrors");
  for (const [name, type] of Object.entries(model.types)) {
    for (const [fieldName, field] of Object.entries(type.fields ?? {})) {
      const coordinate = `${name}.${fieldName}`;
      checkType(field.type, coordinate);
      for (const [argName, arg] of Object.entries(field.args))
        checkType(arg.type, `${coordinate}(${argName})`);
      for (const error of field.errors) checkError(error, coordinate);
    }
    for (const [fieldName, field] of Object.entries(type.inputFields ?? {}))
      checkType(field.type, `${name}.${fieldName}`);
    for (const member of [
      ...(type.possibleTypes ?? []),
      ...(type.interfaces ?? []),
    ])
      checkType(member, name);
  }
};

const literal = (value: unknown): string => JSON.stringify(value);
const union = (values: readonly string[]): string =>
  values.length ? values.join(" | ") : "never";
const documentation = (description?: string): string =>
  description ? `/** ${description.replaceAll("*/", "* /")} */\n` : "";

export interface GenerateGraphQLClientOptions {
  readonly transportImport: string;
  readonly transportName?: string;
  readonly requirementsType: string;
  readonly requirementsImport: string;
  /** Optional legacy-name aliases, e.g. createProject -> projectCreate. */
  readonly operationAliases?: Readonly<Record<string, string>>;
}

/** Emit schema-indexed types and the matching runtime graph from one patched model. */
export const generateGraphQLClient = (
  model: GraphQLModel,
  options: GenerateGraphQLClientOptions,
): string => {
  validateGraphQLModel(model);
  const inputType = (ref: string): string => {
    if (ref.endsWith("!")) return requiredInput(ref.slice(0, -1));
    return `${requiredInput(ref)} | null`;
  };
  const requiredInput = (ref: string): string => {
    if (ref.startsWith("["))
      return `ReadonlyArray<${inputType(ref.slice(1, -1))}>`;
    const type = model.types[ref]!;
    return type.kind === "INPUT_OBJECT"
      ? `Inputs[${literal(ref)}]`
      : `Scalars[${literal(ref)}]`;
  };
  const argsType = (args: Record<string, GraphQLArgument>): string =>
    `{ ${Object.entries(args)
      .map(
        ([name, arg]) =>
          `${literal(name)}${arg.type.endsWith("!") && arg.defaultValue === undefined ? "" : "?"}: ${inputType(arg.type)}`,
      )
      .join("; ")} }`;
  // GraphQL names are not necessarily valid or unoccupied TypeScript symbols.
  // Schema names remain quoted map keys; exported values get stable safe names.
  const occupied = new Set([
    ..."await break case catch class const continue debugger default delete do else enum export extends false finally for function if import in instanceof new null return super switch this throw true try typeof var void while with yield implements interface let package private protected public static arguments eval abstract any as asserts async bigint boolean constructor declare from get global infer intrinsic is keyof module namespace never number object of override readonly require satisfies set string symbol type undefined unique unknown using".split(
      " ",
    ),
    "G",
    "S",
    "Category",
    "Scalars",
    "Inputs",
    "Errors",
    "Types",
    "PossibleTypes",
    "Schema",
    "Selection",
    "Result",
    "SelectedErrors",
    "GraphQLIssue",
    "Report",
    "catchTags",
    "isErrorTag",
    "GraphQLFailure",
    "GraphQLTransportError",
    "GraphQLDecodeError",
    "GraphQLRequestError",
    "UnknownGraphQLError",
    "query",
    "mutation",
    "report",
    "client",
    "schema",
    "errorClasses",
    options.transportName ?? "transport",
    options.requirementsType,
  ]);
  const identifier = (name: string) =>
    name.replace(/[^A-Za-z0-9_$]/g, "_").replace(/^(?=[0-9])/, "_") ||
    "generated";
  const allocate = (preferred: string, fallback: string): string => {
    let name = identifier(preferred);
    if (occupied.has(name)) name = identifier(fallback);
    const base = name;
    for (let suffix = 2; occupied.has(name); suffix++)
      name = `${base}${suffix}`;
    occupied.add(name);
    return name;
  };
  const errorNames = new Map(
    Object.keys(model.errors).map((tag) => [
      tag,
      allocate(tag, `${identifier(tag)}Error`),
    ]),
  );
  const lines: string[] = [
    "// Generated by @distilled.cloud/core/codegen/graphql-client. DO NOT EDIT.",
    'import * as G from "@distilled.cloud/core/graphql";',
    'import * as S from "effect/Schema";',
    'import * as Category from "@distilled.cloud/core/category";',
    `import { ${options.transportName ?? "transport"} } from ${literal(options.transportImport)};`,
    `import type { ${options.requirementsType} } from ${literal(options.requirementsImport)};`,
    `export type { ${options.requirementsType} } from ${literal(options.requirementsImport)};`,
    'export { catchTags, isErrorTag, GraphQLFailure, GraphQLTransportError, GraphQLDecodeError, GraphQLRequestError, UnknownGraphQLError, type GraphQLIssue, type Report } from "@distilled.cloud/core/graphql";',
    "",
    "export type Scalars = {",
  ];
  for (const [name, type] of Object.entries(model.types)) {
    if (type.kind === "SCALAR" || type.kind === "ENUM")
      lines.push(
        `${literal(name)}: ${type.kind === "SCALAR" ? (type.scalar ?? "unknown") : union(type.enumValues!.map(literal))};`,
      );
  }
  lines.push("}", "export type Inputs = {");
  for (const [name, type] of Object.entries(model.types)) {
    if (type.kind === "INPUT_OBJECT")
      lines.push(
        documentation(type.description),
        `${literal(name)}: ${argsType(type.inputFields ?? {})};`,
      );
  }
  lines.push("}");
  const categories: Record<string, string> = {
    auth: "withAuthError",
    badRequest: "withBadRequestError",
    notFound: "withNotFoundError",
    throttling: "withThrottlingError",
    quota: "withQuotaError",
    server: "withServerError",
    conflict: "withConflictError",
  };
  for (const [tag, error] of Object.entries(model.errors)) {
    const name = errorNames.get(tag)!;
    const pipes = [
      error.category
        ? categories[error.category] && `Category.${categories[error.category]}`
        : undefined,
      error.retryable
        ? `Category.withRetryable(${error.category === "throttling" ? "{ throttling: true }" : ""})`
        : undefined,
    ].filter(Boolean);
    lines.push(
      documentation(error.description),
      `export class ${name} extends S.TaggedError<${name}>()(${literal(tag)}, G.errorFields)${pipes.length ? `.pipe(${pipes.join(", ")})` : ""} {}`,
    );
  }
  lines.push("export type Errors = {");
  for (const [tag, name] of errorNames) lines.push(`${literal(tag)}: ${name};`);
  lines.push("}", "export type Types = {");
  for (const [name, type] of Object.entries(model.types)) {
    if (!["OBJECT", "INTERFACE", "UNION"].includes(type.kind)) continue;
    lines.push(documentation(type.description), `${literal(name)}: {`);
    for (const [fieldName, field] of Object.entries(type.fields ?? {})) {
      lines.push(
        documentation(field.description),
        `${literal(fieldName)}: G.Field<${argsType(field.args)}, ${literal(field.type)}, ${union(field.errors.map(literal))}>;`,
      );
    }
    lines.push("};");
  }
  lines.push("}", "export type PossibleTypes = {");
  for (const [name, type] of Object.entries(model.types)) {
    if (type.kind === "INTERFACE" || type.kind === "UNION")
      lines.push(
        `${literal(name)}: ${union((type.possibleTypes ?? []).map(literal))};`,
      );
  }
  lines.push(
    "}",
    "export type Schema = {",
    "types: Types; scalars: Scalars; errors: Errors; possibleTypes: PossibleTypes;",
    `query: ${literal(model.queryType)};`,
    `mutation: ${model.mutationType ? literal(model.mutationType) : "never"};`,
    `subscription: ${model.subscriptionType ? literal(model.subscriptionType) : "never"};`,
    `globalErrors: ${union(model.globalErrors.map(literal))};`,
    "};",
  );
  lines.push(
    "export type Selection<Name extends keyof Types> = G.Selection<Schema, Name>;",
    "export type Result<Name extends string, Select> = G.Result<Schema, Name, Select>;",
    "export type SelectedErrors<Name extends keyof Types, Select> = G.Errors<Schema, Name, Select>;",
  );
  lines.push(`export const schema: G.GraphQLModel = ${JSON.stringify(model)};`);
  lines.push(
    `export const errorClasses = { ${[...errorNames].map(([tag, name]) => `${literal(tag)}: ${name}`).join(", ")} };`,
  );
  lines.push(
    `export const client = G.makeClient<Schema, ${options.requirementsType}>(schema, ${options.transportName ?? "transport"}, errorClasses);`,
    "export const query = client.query;",
    "export const mutation = client.mutation;",
    "export const report = client.report;",
  );
  const operationNames = new Map<string, string>();
  for (const [kind, name] of [
    ["query", model.queryType],
    ["mutation", model.mutationType],
  ] as const) {
    for (const field of Object.keys(model.types[name ?? ""]?.fields ?? {})) {
      const exportName = allocate(
        field,
        `${kind}${field[0]!.toUpperCase()}${field.slice(1)}`,
      );
      if (!operationNames.has(field)) operationNames.set(field, exportName);
      lines.push(
        `export const ${exportName} = client.operation(${literal(kind)}, ${literal(field)});`,
      );
    }
  }
  for (const [alias, target] of Object.entries(
    options.operationAliases ?? {},
  )) {
    const targetName = operationNames.get(target);
    // Legacy aliases are optional conveniences; never displace a real export.
    if (
      targetName &&
      alias !== target &&
      identifier(alias) === alias &&
      !occupied.has(alias)
    ) {
      occupied.add(alias);
      lines.push(`export const ${alias} = ${targetName};`);
    }
  }
  return lines.join("\n") + "\n";
};
