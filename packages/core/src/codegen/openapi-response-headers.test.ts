import { describe, expect, test } from "bun:test";
import { convertOpenApiToSmithy } from "./openapi.ts";

const ns = "com.example.arm";

// Shaped like ARM's PostgreSQL Servers_CreateOrUpdate / Servers_Update /
// Servers_Get (Swagger 2.0): the body on 200, the status monitor on 202.
const asyncHeaders = {
  "Azure-AsyncOperation": {
    type: "string",
    format: "uri",
    description: "A link to the status monitor",
  },
  Location: { type: "string" },
  "Retry-After": { type: "integer", format: "int32" },
};

const spec = {
  swagger: "2.0",
  info: { title: "Arm", version: "1" },
  paths: {
    "/servers/{serverName}": {
      parameters: [
        { name: "serverName", in: "path", required: true, type: "string" },
      ],
      get: {
        operationId: "Servers_Get",
        responses: { "200": { schema: { $ref: "#/definitions/Server" } } },
      },
      put: {
        operationId: "Servers_CreateOrUpdate",
        parameters: [
          {
            name: "parameters",
            in: "body",
            required: true,
            schema: { $ref: "#/definitions/Server" },
          },
        ],
        responses: {
          "200": { schema: { $ref: "#/definitions/Server" } },
          "202": { description: "Accepted", headers: asyncHeaders },
        },
      },
      post: {
        operationId: "Servers_Restart",
        responses: {
          "200": { schema: { $ref: "#/definitions/RestartResult" } },
          "202": { description: "Accepted", headers: asyncHeaders },
        },
      },
      patch: {
        operationId: "Servers_Update",
        responses: {
          "202": { description: "Accepted", headers: asyncHeaders },
        },
      },
    },
  },
  definitions: {
    Server: {
      type: "object",
      properties: { location: { type: "string" }, name: { type: "string" } },
    },
    RestartResult: {
      type: "object",
      properties: { restartedAt: { type: "string" } },
    },
  },
};

const convert = (responseHeaders?: boolean) =>
  convertOpenApiToSmithy(spec, {
    namespace: ns,
    serviceName: "Arm",
    ...(responseHeaders === undefined ? {} : { responseHeaders }),
  });

const outputOf = (model: ReturnType<typeof convert>, op: string) =>
  model.shapes[model.shapes[`${ns}#${op}`].output.target];

describe("OpenAPI response headers", () => {
  test("are dropped unless asked for", () => {
    const model = convert();
    expect(model.shapes[`${ns}#UpdateServer`].output.target).toBe(
      "smithy.api#Unit",
    );
    expect(model.shapes[`${ns}#ServersCreateOrUpdate`].output.target).toBe(
      `${ns}#Server`,
    );
  });

  test("a bodiless 202 gets an output of its headers", () => {
    const output = outputOf(convert(true), "UpdateServer");
    expect(output.traits["smithy.api#output"]).toEqual({});
    expect(output.members.azureAsyncOperation.traits).toEqual({
      "smithy.api#httpHeader": "Azure-AsyncOperation",
      "smithy.api#documentation": "A link to the status monitor",
    });
    expect(output.members.location.traits["smithy.api#httpHeader"]).toBe(
      "Location",
    );
    expect(output.members.retryAfter.target).toBe("smithy.api#Integer");
    expect(output.members.retryAfter.traits["smithy.api#required"]).toBe(
      undefined,
    );
  });

  test("a shared body component is copied, not changed", () => {
    const model = convert(true);
    const output = outputOf(model, "ServersCreateOrUpdate");
    expect(model.shapes[`${ns}#ServersCreateOrUpdate`].output.target).toBe(
      `${ns}#ServersCreateOrUpdateResponse`,
    );
    expect(Object.keys(output.members).sort()).toEqual([
      "azureAsyncOperation",
      "location",
      "locationHeader",
      "name",
      "retryAfter",
    ]);
    expect(output.members.location.traits?.["smithy.api#httpHeader"]).toBe(
      undefined,
    );
    expect(output.members.locationHeader.traits["smithy.api#httpHeader"]).toBe(
      "Location",
    );
    expect(Object.keys(model.shapes[`${ns}#Server`].members).sort()).toEqual([
      "location",
      "name",
    ]);
    expect(model.shapes[`${ns}#GetServer`].output.target).toBe(`${ns}#Server`);
  });

  test("a component only one op returns takes the headers and keeps its name", () => {
    const model = convert(true);
    const opId = Object.keys(model.shapes).find(
      (id) => model.shapes[id].type === "operation" && id.includes("Restart"),
    )!;
    expect(model.shapes[opId].output.target).toBe(`${ns}#RestartResult`);
    expect(
      Object.keys(model.shapes[`${ns}#RestartResult`].members).sort(),
    ).toEqual(["azureAsyncOperation", "location", "restartedAt", "retryAfter"]);
  });
});
