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
  /** Export name for the root object (`Railway`, `Eas`, …). Default `"Sdk"`. */
  readonly sdkName?: string;
}

const peelRef = (
  ref: string,
): { name: string; list: boolean; nonNull: boolean } => {
  let text = ref;
  let nonNull = false;
  let list = false;
  if (text.endsWith("!")) {
    nonNull = true;
    text = text.slice(0, -1);
  }
  if (text.startsWith("[") && text.endsWith("]")) {
    list = true;
    text = text.slice(1, -1);
    if (text.endsWith("!")) text = text.slice(0, -1);
  }
  return { name: text, list, nonNull };
};

/**
 * Emit a Query-algebra SDK: TypeMeta + TS types + named roots
 * (`me`, `project`, …). Combinators stay in `@distilled.cloud/core/query`;
 * this file only describes the schema as lazy lenses.
 */
export const generateGraphQLClient = (
  model: GraphQLModel,
  options: GenerateGraphQLClientOptions,
): string => {
  validateGraphQLModel(model);
  const sdkName = options.sdkName ?? "Sdk";
  const skipRoots = new Set(
    [model.queryType, model.mutationType, model.subscriptionType].filter(
      (name): name is string => typeof name === "string",
    ),
  );
  const tsNamed = (name: string): string => {
    const type = model.types[name];
    if (!type) return "unknown";
    if (type.kind === "SCALAR") return type.scalar ?? "unknown";
    if (type.kind === "ENUM")
      return (
        (type.enumValues ?? [])
          .map((value) => JSON.stringify(value))
          .join(" | ") || "string"
      );
    if (type.kind === "UNION")
      return (
        (type.possibleTypes ?? []).filter(Boolean).join(" | ") || "unknown"
      );
    return name;
  };
  const tsOutput = (ref: string): string => {
    const { name, list } = peelRef(ref);
    const inner = tsNamed(name);
    return list ? `ReadonlyArray<${inner}>` : inner;
  };
  const tsArg = (ref: string): string => tsOutput(ref);
  const isObjectLike = (name: string): boolean => {
    const kind = model.types[name]?.kind;
    return kind === "OBJECT" || kind === "INTERFACE";
  };
  const fieldMeta = (fieldName: string, field: GraphQLField): string => {
    const { name, list } = peelRef(field.type);
    const argTypes = Object.keys(field.args).length
      ? `{ ${Object.entries(field.args)
          .map(([argName, arg]) => `${argName}: ${JSON.stringify(arg.type)}`)
          .join(", ")} }`
      : undefined;
    if (list && isObjectLike(name)) {
      return argTypes
        ? `listField(${JSON.stringify(fieldName)}, ${name}, ${argTypes})`
        : `listField(${JSON.stringify(fieldName)}, ${name})`;
    }
    if (isObjectLike(name) || model.types[name]?.kind === "UNION") {
      return `objectField(${JSON.stringify(fieldName)}, ${name})`;
    }
    return `scalarField(${JSON.stringify(fieldName)})`;
  };
  const rootFn = (
    kind: "query" | "mutation",
    fieldName: string,
    field: GraphQLField,
  ): string => {
    const { name, list } = peelRef(field.type);
    const resultTs = tsOutput(field.type);
    const argEntries = Object.entries(field.args);
    const argTypes =
      argEntries.length > 0
        ? `{ ${argEntries.map(([argName, arg]) => `${argName}: ${JSON.stringify(arg.type)}`).join(", ")} }`
        : undefined;
    const required = argEntries.filter(([, arg]) => arg.type.endsWith("!"));
    const optional = argEntries.filter(([, arg]) => !arg.type.endsWith("!"));
    const argFields = [
      ...required.map(
        ([argName, arg]) => `readonly ${argName}: ${tsArg(arg.type)}`,
      ),
      ...optional.map(
        ([argName, arg]) => `readonly ${argName}?: ${tsArg(arg.type)}`,
      ),
    ].join("; ");
    const sig =
      argEntries.length === 0
        ? ""
        : required.length === 0
          ? `args?: { ${argFields} }`
          : `args: { ${argFields} }`;
    const argsExpr = argEntries.length === 0 ? "" : ", args";
    const argTypesExpr = argTypes ? `, ${argTypes}` : "";
    if (isObjectLike(name)) {
      const helper = list ? "rootList" : "root";
      return sig
        ? `  ${fieldName}: (${sig}): Query<${resultTs}> =>\n    ${helper}(${JSON.stringify(kind)}, ${JSON.stringify(fieldName)}, ${name}${argsExpr}${argTypesExpr}),`
        : `  ${fieldName}: (): Query<${resultTs}> => ${helper}(${JSON.stringify(kind)}, ${JSON.stringify(fieldName)}, ${name}),`;
    }
    return sig
      ? `  ${fieldName}: (${sig}): Query<${resultTs}> =>\n    rootLeaf(${JSON.stringify(kind)}, ${JSON.stringify(fieldName)}, ${list}${argsExpr}${argTypesExpr}),`
      : `  ${fieldName}: (): Query<${resultTs}> => rootLeaf(${JSON.stringify(kind)}, ${JSON.stringify(fieldName)}, ${list}),`;
  };

  const objects: string[] = [];
  const enums: string[] = [];
  const inputs: string[] = [];
  const unions: string[] = [];
  for (const [name, type] of Object.entries(model.types)) {
    if (name.startsWith("__") || skipRoots.has(name)) continue;
    if (type.kind === "OBJECT" || type.kind === "INTERFACE") objects.push(name);
    else if (type.kind === "ENUM") enums.push(name);
    else if (type.kind === "INPUT_OBJECT") inputs.push(name);
    else if (type.kind === "UNION") unions.push(name);
  }
  objects.sort();
  enums.sort();
  inputs.sort();
  unions.sort();

  const lines: string[] = [
    "// Generated by @distilled.cloud/core/codegen/graphql-client. DO NOT EDIT.",
    `import {`,
    `  listField,`,
    `  objectField,`,
    `  root,`,
    `  rootLeaf,`,
    `  rootList,`,
    `  scalarField,`,
    `  type Query,`,
    `  type TypeMeta,`,
    `} from "@distilled.cloud/core/graphql";`,
    "",
  ];

  for (const name of enums) {
    const type = model.types[name]!;
    lines.push(
      documentation(type.description) +
        `export type ${name} = ${union((type.enumValues ?? []).map(literal))};`,
      "",
    );
  }

  for (const name of inputs) {
    const type = model.types[name]!;
    const fields = Object.entries(type.inputFields ?? {}).map(
      ([fieldName, field]) =>
        `  readonly ${fieldName}${field.type.endsWith("!") ? "" : "?"}: ${tsArg(field.type)};`,
    );
    lines.push(
      documentation(type.description) + `export interface ${name} {`,
      ...fields,
      "}",
      "",
    );
  }

  for (const name of unions) {
    const type = model.types[name]!;
    lines.push(
      documentation(type.description) +
        `export type ${name} = ${(type.possibleTypes ?? []).join(" | ") || "unknown"};`,
      "",
    );
  }

  for (const name of objects) {
    const type = model.types[name]!;
    const fields = Object.entries(type.fields ?? {}).map(
      ([fieldName, field]) =>
        `  readonly ${fieldName}: ${tsOutput(field.type)};`,
    );
    lines.push(
      documentation(type.description) + `export interface ${name} {`,
      ...fields,
      "}",
      "",
    );
  }

  for (const name of [...objects, ...unions]) {
    lines.push(
      `export const ${name}: TypeMeta = { name: ${JSON.stringify(name)}, fields: {} };`,
    );
  }
  lines.push("");

  for (const name of objects) {
    const type = model.types[name]!;
    lines.push(`Object.assign(${name}.fields, {`);
    for (const [fieldName, field] of Object.entries(type.fields ?? {})) {
      lines.push(`  ${fieldName}: ${fieldMeta(fieldName, field)},`);
    }
    lines.push("});", "");
  }
  for (const name of unions) {
    lines.push(
      `Object.assign(${name}.fields, { __typename: scalarField("__typename") });`,
      "",
    );
  }

  lines.push(`export const ${sdkName} = {`);
  const queryNames = new Set<string>();
  const queryType = model.types[model.queryType];
  if (queryType?.fields) {
    for (const [fieldName, field] of Object.entries(queryType.fields)) {
      queryNames.add(fieldName);
      lines.push(rootFn("query", fieldName, field));
    }
  }
  if (model.mutationType) {
    const mutationType = model.types[model.mutationType];
    if (mutationType?.fields) {
      for (const [fieldName, field] of Object.entries(mutationType.fields)) {
        const exportName = queryNames.has(fieldName)
          ? `${fieldName}Mutation`
          : fieldName;
        const line = rootFn("mutation", fieldName, field);
        lines.push(
          exportName === fieldName
            ? line
            : line.replace(`  ${fieldName}:`, `  ${exportName}:`),
        );
      }
    }
  }
  lines.push("};", "");
  return lines.join("\n") + "\n";
};
