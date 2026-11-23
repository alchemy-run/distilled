import { describe, expect, test } from "vitest";
import {
  convertOpenApiToSmithy,
  isSecretName,
  isSecretParentName,
} from "../../src/codegen/openapi.ts";

const SENSITIVE = "smithy.api#sensitive";
const ns = "com.example.api";

describe("isSecretName", () => {
  test.each([
    "token",
    "webhookSecret",
    "primaryConnectionString",
    "secretValue",
    "kubeconfig",
    "storageAccountAccessKey",
    "aws_secret_access_key",
    "sshPrivateKey",
    "npm-otp",
  ])("%s is a secret", (name) => expect(isSecretName(name)).toBe(true));

  test.each([
    "value",
    "tokenType",
    "secretName",
    "passwordPolicy",
    "nextToken",
    "continuation_token",
    "idempotencyToken",
    "masked_api_key",
    "hashed_token",
    "publicKey",
    "Authorization",
  ])("%s is not a secret", (name) => expect(isSecretName(name)).toBe(false));

  test("headers also match auth, authorization and cookie", () => {
    expect(isSecretName("X-Registry-Auth", "header")).toBe(true);
    expect(isSecretName("Authorization", "header")).toBe(true);
    expect(isSecretName("Cookie", "header")).toBe(true);
  });

  test("an API's own non-secret nouns are skipped", () => {
    expect(isSecretName("fromToken", "body", new Set(["token"]))).toBe(false);
  });
});

describe("isSecretParentName", () => {
  test.each(["Secret", "StorageAccountKey", "CreateSecretRequest", "IoK8sApiCoreV1Secret"])(
    "%s holds a secret",
    (name) => expect(isSecretParentName(name)).toBe(true),
  );
  test.each(["EnvVar", "Label", "SecretMetadata"])("%s does not", (name) =>
    expect(isSecretParentName(name)).toBe(false),
  );
});

describe("convertOpenApiToSmithy sensitive marks", () => {
  const spec = {
    openapi: "3.0.0",
    info: { title: "Example", version: "1" },
    paths: {
      "/secrets": {
        post: {
          operationId: "secrets-create",
          parameters: [
            { name: "api_key", in: "query", schema: { type: "string" } },
            { name: "page", in: "query", schema: { type: "string" } },
            { name: "X-Registry-Auth", in: "header", schema: { type: "string" } },
          ],
          responses: {
            "200": {
              content: { "application/json": { schema: { $ref: "#/components/schemas/Holder" } } },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        Secret: {
          type: "object",
          properties: {
            value: { type: "string" },
            data: { type: "object", additionalProperties: { type: "string" } },
          },
        },
        Holder: {
          type: "object",
          properties: {
            webhookSecret: { anyOf: [{ type: "string" }, { type: "null" }] },
            password: { allOf: [{ $ref: "#/components/schemas/Password" }] },
            adminLogin: { type: "string", "x-ms-secret": true },
            pin: { type: "string", format: "password" },
            name: { type: "string" },
            value: { type: "string" },
            secret: { $ref: "#/components/schemas/Secret" },
          },
        },
        Password: { type: "string" },
      },
    },
  };

  const model = convertOpenApiToSmithy(spec, {
    namespace: ns,
    serviceName: "Example",
    headerParams: true,
    deferNaming: true,
  });
  const shapes = model.shapes as Record<string, any>;
  const marked = (shape: string, member: string) =>
    SENSITIVE in (shapes[`${ns}#${shape}`].members[member].traits ?? {});

  test("names, wrappers and spec flags mark body members", () => {
    expect(marked("Holder", "webhookSecret")).toBe(true);
    expect(marked("Holder", "password")).toBe(true);
    expect(marked("Holder", "adminLogin")).toBe(true);
    expect(marked("Holder", "pin")).toBe(true);
    expect(marked("Holder", "name")).toBe(false);
    expect(marked("Holder", "value")).toBe(false);
  });

  test("a bare value is marked inside an object named as a secret", () => {
    expect(marked("Secret", "value")).toBe(true);
  });

  test("a map of strings is marked on its value", () => {
    const map = shapes[shapes[`${ns}#Secret`].members.data.target];
    expect(SENSITIVE in (map.value.traits ?? {})).toBe(true);
  });

  test("query and header parameters are marked", () => {
    const input = shapes[`${ns}#SecretsCreateRequest`];
    expect(SENSITIVE in input.members.api_key.traits).toBe(true);
    expect(SENSITIVE in input.members.page.traits).toBe(false);
    const header = Object.values<any>(input.members).find(
      (m) => m.traits?.["smithy.api#httpHeader"] === "X-Registry-Auth",
    );
    expect(SENSITIVE in header.traits).toBe(true);
  });
});
