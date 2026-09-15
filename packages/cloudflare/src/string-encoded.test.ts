import { describe, expect, test } from "bun:test";
import { buildRequest } from "@distilled.cloud/core/protocol-http";
import { CreateUserSchemaRequest } from "./services/api_gateway.ts";

/**
 * `T.StringEncoded()` members: the TS surface keeps the natural type while
 * the wire carries the value's string spelling. API Shield's schema upload
 * is the live case — the docs model the multipart `validation_enabled` part
 * as the enum `"true" | "false"`, so a raw boolean part is rejected.
 */
const formOf = (input: unknown): FormData => {
  const request = buildRequest({
    input,
    inputAst: CreateUserSchemaRequest.ast,
    baseUrl: "https://api.cloudflare.com/client/v4",
  });
  const body = request.body as { readonly formData?: FormData };
  if (!body.formData) throw new Error("request body is not multipart");
  return body.formData;
};

const file = new File(["{}"], "schema.json");

describe("createUserSchema multipart encoding", () => {
  test('validationEnabled: true becomes the string "true"', () => {
    const form = formOf({
      zoneId: "zone",
      file,
      kind: "openapi_v3",
      name: "schema.json",
      validationEnabled: true,
    });
    expect(form.get("validation_enabled")).toBe("true");
  });

  test('validationEnabled: false becomes the string "false"', () => {
    const form = formOf({
      zoneId: "zone",
      file,
      kind: "openapi_v3",
      name: "schema.json",
      validationEnabled: false,
    });
    expect(form.get("validation_enabled")).toBe("false");
  });

  test("an omitted validationEnabled sends no part", () => {
    const form = formOf({ zoneId: "zone", file, kind: "openapi_v3" });
    expect(form.has("validation_enabled")).toBe(false);
    expect(form.get("kind")).toBe("openapi_v3");
  });
});
