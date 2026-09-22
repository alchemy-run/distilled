import { describe, expect, test } from "bun:test";
import { buildSchema, introspectionFromSchema } from "graphql";
import { applyOperation } from "../json-patch.ts";
import {
  convertGraphQLClient,
  generateGraphQLClient,
  graphqlTypeString,
  validateGraphQLModel,
} from "./graphql-client.ts";

const named = (name: string, kind = "OBJECT") => ({ kind, name });
const required = (ofType: object) => ({ kind: "NON_NULL", ofType });
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
    {
      kind: "OBJECT",
      name: "Query",
      fields: [
        field("project", required(named("Project")), [
          { name: "id", type: required(named("String", "SCALAR")) },
        ]),
        field("me", required(named("User"))),
      ],
    },
    {
      kind: "OBJECT",
      name: "Mutation",
      fields: [
        field("projectCreate", named("Project"), [
          { name: "name", type: required(named("String", "SCALAR")) },
        ]),
      ],
    },
    {
      kind: "OBJECT",
      name: "Project",
      fields: [
        field("id", required(named("String", "SCALAR"))),
        field("name", required(named("String", "SCALAR"))),
      ],
    },
    {
      kind: "OBJECT",
      name: "User",
      fields: [
        field("email", required(named("String", "SCALAR"))),
        field("name", named("String", "SCALAR")),
      ],
    },
  ],
};

const options = {
  transportImport: "./transport.ts",
  requirementsImport: "./transport.ts",
  requirementsType: "Requirements",
  sdkName: "Railway",
};

describe("GraphQL Query SDK generator", () => {
  test("emits TypeMeta, interfaces, and named roots on the SDK object", () => {
    const model = convertGraphQLClient(fixture);
    const output = generateGraphQLClient(model, options);
    expect(output).toContain("export interface Project");
    expect(output).toContain("export interface User");
    expect(output).toContain(
      'export const Project: TypeMeta = { name: "Project", fields: {} };',
    );
    expect(output).toContain("export const Railway = {");
    expect(output).toContain('root("query", "me", User)');
    expect(output).toContain('root("query", "project", Project');
    expect(output).toContain('root("mutation", "projectCreate", Project');
    expect(output).toContain('from "@distilled.cloud/core/graphql"');
    expect(() =>
      new Bun.Transpiler({ loader: "ts" }).transformSync(output),
    ).not.toThrow();
  });

  test("unknown coordinates fail validateGraphQLModel", () => {
    const model = convertGraphQLClient(fixture);
    applyOperation(model, {
      op: "add",
      path: "/types/Project/fields/id/errors/-",
      value: "MissingError",
    });
    expect(() => validateGraphQLModel(model)).toThrow(
      "Project.id: unknown GraphQL error MissingError",
    );
    expect(() => graphqlTypeString({ kind: "NON_NULL" })).toThrow(
      "Incomplete GraphQL NON_NULL",
    );
  });

  test("SDL round-trip through convert still produces a model", () => {
    const source = buildSchema(`
      type Query { ping: String }
    `);
    const model = convertGraphQLClient(introspectionFromSchema(source));
    expect(model.queryType).toBe("Query");
    expect(model.types.Query?.fields?.ping?.type).toBe("String");
  });
});
