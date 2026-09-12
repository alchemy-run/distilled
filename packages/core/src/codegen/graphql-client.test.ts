import { describe, expect, test } from "bun:test";
import { buildSchema, introspectionFromSchema, parse, validate } from "graphql";
import { compile } from "../graphql.ts";
import { fixtureSDL } from "../graphql.fixture.ts";
import { applyOperation } from "../json-patch.ts";
import {
  convertGraphQLClient,
  generateGraphQLClient,
  graphqlTypeString,
  validateGraphQLModel,
} from "./graphql-client.ts";

const named = (name: string, kind = "OBJECT") => ({ kind, name });
const required = (ofType: object) => ({ kind: "NON_NULL", ofType });
const list = (ofType: object) => ({ kind: "LIST", ofType });
const field = (name: string, type: object, args: object[] = []) => ({
  name,
  type,
  args,
});
const fixture = {
  queryType: { name: "Query" },
  mutationType: { name: "Mutation" },
  types: [
    { kind: "SCALAR", name: "String" },
    { kind: "SCALAR", name: "Int" },
    { kind: "SCALAR", name: "JSON" },
    {
      kind: "ENUM",
      name: "Status",
      enumValues: [{ name: "ACTIVE" }, { name: "OLD", isDeprecated: true }],
    },
    {
      kind: "INPUT_OBJECT",
      name: "Filter",
      inputFields: [
        {
          name: "status",
          type: named("Status", "ENUM"),
          defaultValue: "ACTIVE",
        },
      ],
    },
    {
      kind: "OBJECT",
      name: "Query",
      fields: [
        field("project", required(named("Project")), [
          { name: "id", type: required(named("String", "SCALAR")) },
        ]),
        field("search", list(named("Search", "UNION"))),
      ],
    },
    {
      kind: "OBJECT",
      name: "Mutation",
      fields: [
        field("projectCreate", named("Project"), [
          { name: "filter", type: named("Filter", "INPUT_OBJECT") },
        ]),
      ],
    },
    {
      kind: "OBJECT",
      name: "Project",
      interfaces: [named("Node", "INTERFACE")],
      fields: [
        field("id", required(named("String", "SCALAR"))),
        field("children", required(list(required(named("Project")))), [
          {
            name: "first",
            type: required(named("Int", "SCALAR")),
            defaultValue: "20",
          },
          { name: "filter", type: named("Filter", "INPUT_OBJECT") },
        ]),
        {
          ...field("legacy", named("String", "SCALAR")),
          isDeprecated: true,
          deprecationReason: "Use id",
        },
      ],
    },
    {
      kind: "OBJECT",
      name: "Service",
      fields: [field("id", required(named("String", "SCALAR")))],
    },
    {
      kind: "INTERFACE",
      name: "Node",
      fields: [field("id", required(named("String", "SCALAR")))],
      possibleTypes: [named("Project")],
    },
    {
      kind: "UNION",
      name: "Search",
      possibleTypes: [named("Project"), named("Service")],
    },
  ],
};

const options = {
  transportImport: "./transport.ts",
  requirementsImport: "./transport.ts",
  requirementsType: "Requirements",
  operationAliases: { createProject: "projectCreate" },
};

describe("GraphQL-native compiler", () => {
  test("root helpers allocate safe unique names without hiding schema operations", () => {
    const source = buildSchema(`
      type Query {
        query: String report: String schema: String transport: String G: String
        catchTags: String delete: String Scalars: String Selection: String
        same: String mutationSame: String
      }
      type Mutation { same: String }
    `);
    const model = convertGraphQLClient(introspectionFromSchema(source));
    const output = generateGraphQLClient(model, {
      ...options,
      operationAliases: {
        default: "delete",
        deleteField: "delete",
        transport: "report",
        readReport: "report",
      },
    });
    expect(output).toContain(
      'export const queryQuery = client.operation("query", "query");',
    );
    expect(output).toContain(
      'export const queryReport = client.operation("query", "report");',
    );
    expect(output).toContain(
      'export const queryTransport = client.operation("query", "transport");',
    );
    expect(output).toContain(
      'export const queryDelete = client.operation("query", "delete");',
    );
    expect(output).toContain(
      'export const queryScalars = client.operation("query", "Scalars");',
    );
    expect(output).toContain(
      'export const mutationSame2 = client.operation("mutation", "same");',
    );
    expect(output).toContain("export const deleteField = queryDelete;");
    expect(output).toContain("export const readReport = queryReport;");
    expect(output).not.toContain("export const default =");
    expect(
      [...output.matchAll(/export const ([A-Za-z_$][\w$]*) =/g)].map(
        (match) => match[1],
      ),
    ).toEqual(expect.arrayContaining(["query", "report", "queryCatchTags"]));
    const declarations = [
      ...output.matchAll(/export (?:const|class|type) ([A-Za-z_$][\w$]*)/g),
    ].map((match) => match[1]);
    expect(new Set(declarations).size).toBe(declarations.length);
    expect(output.match(/client\.operation\(/g)).toHaveLength(12);
    expect(() =>
      new Bun.Transpiler({ loader: "ts" }).transformSync(output),
    ).not.toThrow();
    expect(
      generateGraphQLClient(model, {
        ...options,
        operationAliases: {
          default: "delete",
          deleteField: "delete",
          transport: "report",
          readReport: "report",
        },
      }),
    ).toBe(output);
  });

  test("schema type names and patched error tags cannot shadow generated support symbols", () => {
    const model = convertGraphQLClient(
      introspectionFromSchema(
        buildSchema(`
      type Query { data: Schema }
      type Schema { selection: Selection }
      type Selection { id: ID! }
    `),
      ),
    );
    for (const tag of ["Schema", "catchTags", "class"]) {
      applyOperation(model, {
        op: "add",
        path: `/errors/${tag}`,
        value: { matchers: [{ code: tag }] },
      });
      applyOperation(model, {
        op: "add",
        path: "/types/Query/fields/data/errors/-",
        value: tag,
      });
    }
    const output = generateGraphQLClient(model, options);
    expect(output).toContain(
      'export class SchemaError extends S.TaggedError<SchemaError>()("Schema", G.errorFields)',
    );
    expect(output).toContain(
      'export class catchTagsError extends S.TaggedError<catchTagsError>()("catchTags", G.errorFields)',
    );
    expect(output).toContain(
      'export class classError extends S.TaggedError<classError>()("class", G.errorFields)',
    );
    expect(output).toContain('"Schema": SchemaError;');
    expect(output).toContain('"Schema": {');
    expect(output).toContain('"Selection": {');
    expect(() =>
      new Bun.Transpiler({ loader: "ts" }).transformSync(output),
    ).not.toThrow();
  });

  test("real introspection round-trips abstract fragments, recursive selections and defaulted required arguments", () => {
    const schema = buildSchema(
      fixtureSDL.replaceAll("first: Int = 20", "first: Int! = 20"),
    );
    const model = convertGraphQLClient(introspectionFromSchema(schema));
    const compiled = compile(model, "query", {
      node: {
        where: { id: "node-id" },
        select: {
          id: true,
          __typename: true,
          __on: {
            Project: {
              services: { select: { edges: { node: { id: true } } } },
            },
            Service: { status: true, project: { parent: { name: true } } },
          },
        },
      },
      search: {
        where: { text: "query" },
        select: {
          __typename: true,
          __on: { Project: { name: true }, Service: { status: true } },
        },
      },
    });
    expect(validate(schema, parse(compiled.query))).toEqual([]);
    expect(compiled.query).not.toContain("first:");
    expect(model.types.Project!.fields!.services!.args.first).toEqual({
      type: "Int!",
      defaultValue: "20",
    });
    expect(model.types.ProjectFilter!.inputFields!.statuses).toEqual({
      type: "[Status!]",
      defaultValue: "[ACTIVE]",
    });
    const output = generateGraphQLClient(model, options);
    expect(output).toContain('"first"?: Scalars["Int"]');
    expect(output).toContain('"Node": "Project" | "Service"');
    expect(output).toContain('"SearchResult": "Project" | "Service"');
  });

  test("required input fields with defaults are omittable but other required fields stay required", () => {
    const schema = buildSchema(`
      input Paging { limit: Int! = 20, owner: ID!, statuses: [String!]! = [] }
      type Query { names(paging: Paging!): [String!]! }
    `);
    const model = convertGraphQLClient(introspectionFromSchema(schema));
    const output = generateGraphQLClient(model, options);
    expect(output).toContain('"limit"?: Scalars["Int"]');
    expect(output).toContain('"owner": Scalars["ID"]');
    expect(output).toContain('"statuses"?: ReadonlyArray<Scalars["String"]>');
    const compiled = compile(model, "query", {
      names: { where: { paging: { owner: "account" } } },
    });
    expect(Object.values(compiled.variables)).toEqual([{ owner: "account" }]);
    expect(validate(schema, parse(compiled.query))).toEqual([]);
    expect(() =>
      compile(model, "query", { names: { where: { paging: {} } } }),
    ).toThrow("owner is required");
  });

  test("provider scalar overrides stay aligned in runtime metadata and generated scalar types", () => {
    const schema = buildSchema(
      `scalar DateTime scalar JSON type Query { date: DateTime! blob: JSON! }`,
    );
    const model = convertGraphQLClient(introspectionFromSchema(schema), {
      scalars: { DateTime: "string" },
    });
    const output = generateGraphQLClient(model, options);
    expect(model.types.DateTime!.scalar).toBe("string");
    expect(model.types.JSON!.scalar).toBe("unknown");
    expect(output).toContain('"DateTime": string;');
    expect(output).toContain('"JSON": unknown;');
    expect(
      validate(
        schema,
        parse(compile(model, "query", { date: true, blob: true }).query),
      ),
    ).toEqual([]);
  });

  test("preserves nested required arguments, defaults, recursion, union/interface members and deprecated fields", () => {
    const model = convertGraphQLClient({ data: { __schema: fixture } });
    expect(model.types.Project!.fields!.children).toEqual({
      type: "[Project!]!",
      args: {
        first: { type: "Int!", defaultValue: "20" },
        filter: { type: "Filter" },
      },
      errors: [],
    });
    expect(model.types.Project!.interfaces).toEqual(["Node"]);
    expect(model.types.Node!.possibleTypes).toEqual(["Project"]);
    expect(model.types.Search!.possibleTypes).toEqual(["Project", "Service"]);
    expect(model.types.Project!.fields!.legacy!.deprecated).toBe("Use id");
    expect(model.types.Status!.enumValues).toEqual(["ACTIVE", "OLD"]);
    expect(model.types.Filter!.inputFields!.status!.defaultValue).toBe(
      "ACTIVE",
    );
    expect(model.types.JSON!.scalar).toBe("unknown");
    validateGraphQLModel(model);
  });

  test("field errors patch the one model used by emitted type unions and runtime classification", () => {
    const model = convertGraphQLClient(fixture);
    applyOperation(model, {
      op: "add",
      path: "/errors/ChildrenUnavailable",
      value: {
        category: "server",
        matchers: [{ code: "CHILDREN_UNAVAILABLE" }],
      },
    });
    applyOperation(model, {
      op: "add",
      path: "/types/Project/fields/children/errors/-",
      value: "ChildrenUnavailable",
    });
    const output = generateGraphQLClient(model, options);
    expect(output).toContain(
      '"children": G.Field<{ "first"?: Scalars["Int"]; "filter"?: Inputs["Filter"] | null }, "[Project!]!", "ChildrenUnavailable">;',
    );
    expect(output).toContain(
      'export class ChildrenUnavailable extends S.TaggedError<ChildrenUnavailable>()("ChildrenUnavailable", G.errorFields).pipe(Category.withServerError)',
    );
    expect(output).toContain('"errors":["ChildrenUnavailable"]');
    expect(output).toContain('"matchers":[{"code":"CHILDREN_UNAVAILABLE"}]');
    expect(output).toContain(
      'export const projectCreate = client.operation("mutation", "projectCreate");',
    );
    expect(output).toContain("export const createProject = projectCreate;");
  });

  test("generation has no fixed depth projection or artificial output optionality", () => {
    const output = generateGraphQLClient(
      convertGraphQLClient(fixture),
      options,
    );
    expect(output).toContain('"Project": {');
    expect(output).toContain('"Search": "Project" | "Service";');
    expect(output).toContain('"Node": "Project";');
    expect(output).toContain('"id": G.Field<{  }, "String!", never>;');
    expect(output).not.toContain('"id"?: G.Field');
    expect(output).not.toContain("maxDepth");
  });

  test("unknown coordinates, incomplete references and stale patches fail immediately", () => {
    const model = convertGraphQLClient(fixture);
    applyOperation(model, {
      op: "add",
      path: "/types/Project/fields/children/errors/-",
      value: "MissingError",
    });
    expect(() => validateGraphQLModel(model)).toThrow(
      "Project.children: unknown GraphQL error MissingError",
    );
    expect(() => graphqlTypeString({ kind: "NON_NULL" })).toThrow(
      "Incomplete GraphQL NON_NULL",
    );
    expect(() =>
      applyOperation(model, {
        op: "replace",
        path: "/types/Project/fields/removed/errors",
        value: [],
      }),
    ).toThrow();
  });
});
