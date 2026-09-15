import { describe, expect, test } from "bun:test";
import { buildRequest } from "@distilled.cloud/core/protocol-http";
import type * as AST from "effect/SchemaAST";
import { CreateUserSchemaRequest } from "./services/api_gateway.ts";
import { CreateProjectDeploymentRequest } from "./services/pages.ts";
import { SummaryCtRequest } from "./services/radar.ts";
import { GetInstanceRequest } from "./services/workflows.ts";

/**
 * Members the Cloudflare docs type as the string enum `"true" | "false"`
 * take a boolean and travel as the documented string: the form-data uploads
 * (API Shield's `validation_enabled`, Pages' `commit_dirty`) and the query
 * flags (Workflows' `simple`, Radar's `unique_entries`).
 */
const request = (inputAst: AST.AST, input: unknown) =>
  buildRequest({
    input,
    inputAst,
    baseUrl: "https://api.cloudflare.com/client/v4",
  });

const formOf = (inputAst: AST.AST, input: unknown): FormData => {
  const body = request(inputAst, input).body as {
    readonly formData?: FormData;
  };
  if (!body.formData) throw new Error("request body is not multipart");
  return body.formData;
};

const queryOf = (inputAst: AST.AST, input: unknown): URLSearchParams =>
  new URL(request(inputAst, input).url).searchParams;

const file = new File(["{}"], "schema.json");

describe("createUserSchema multipart encoding", () => {
  const input = (validationEnabled?: boolean) => ({
    zoneId: "zone",
    file,
    kind: "openapi_v3",
    name: "schema.json",
    ...(validationEnabled === undefined ? {} : { validationEnabled }),
  });

  test("a boolean becomes the string the multipart endpoint expects", () => {
    expect(
      formOf(CreateUserSchemaRequest.ast, input(true)).get(
        "validation_enabled",
      ),
    ).toBe("true");
    expect(
      formOf(CreateUserSchemaRequest.ast, input(false)).get(
        "validation_enabled",
      ),
    ).toBe("false");
  });

  test("an omitted validationEnabled sends no part", () => {
    const form = formOf(CreateUserSchemaRequest.ast, input());
    expect(form.has("validation_enabled")).toBe(false);
    expect(form.get("kind")).toBe("openapi_v3");
  });
});

describe("createProjectDeployment multipart encoding", () => {
  const input = (commitDirty: boolean) => ({
    accountId: "account",
    projectName: "project",
    branch: "main",
    commitDirty,
  });

  test("commitDirty travels as a boolean string", () => {
    expect(
      formOf(CreateProjectDeploymentRequest.ast, input(true)).get(
        "commit_dirty",
      ),
    ).toBe("true");
    expect(
      formOf(CreateProjectDeploymentRequest.ast, input(false)).get(
        "commit_dirty",
      ),
    ).toBe("false");
  });
});

describe("boolean query flags", () => {
  test("workflows getInstance sends simple=true", () => {
    const query = queryOf(GetInstanceRequest.ast, {
      accountId: "account",
      workflowName: "workflow",
      instanceId: "instance",
      simple: true,
    });
    expect(query.get("simple")).toBe("true");
  });

  test("radar ctSummary repeats each uniqueEntries flag", () => {
    const query = queryOf(SummaryCtRequest.ast, {
      uniqueEntries: [true, false],
    });
    expect(query.getAll("uniqueEntries")).toEqual(["true", "false"]);
  });
});
