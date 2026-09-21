import { describe, expect, test } from "bun:test";
import { convertOpenApiToSmithy } from "./openapi.ts";

const model = (
  schema: unknown,
  mediaType = "multipart/form-data",
  responseSchema: unknown = { type: "string", format: "binary" },
  components: Record<string, unknown> = {},
  options: { binaryTypes?: boolean } = { binaryTypes: true },
) =>
  convertOpenApiToSmithy(
    {
      openapi: "3.0.3",
      info: { title: "Binary", version: "1" },
      components,
      paths: {
        "/files": {
          post: {
            operationId: "uploadFile",
            requestBody: { content: { [mediaType]: { schema } } },
            responses: {
              "200": {
                content: {
                  "application/octet-stream": {
                    schema: responseSchema,
                  },
                },
              },
            },
          },
        },
      },
    },
    { namespace: "com.example.binary", serviceName: "Binary", ...options },
  );

describe("OpenAPI binary contracts", () => {
  for (const options of [{}, { binaryTypes: false }]) {
    test(`binary conversion preserves existing contracts with ${JSON.stringify(options)}`, () => {
      const result = model(
        {
          type: "object",
          properties: {
            zip: { type: "string", format: "binary" },
            archive: { $ref: "#/components/schemas/Archive" },
          },
        },
        "multipart/form-data",
        { $ref: "#/components/schemas/Archive" },
        { schemas: { Archive: { type: "string", format: "binary" } } },
        options,
      );
      const request = result.shapes["com.example.binary#UploadFileRequest"];
      expect(request.members.zip.target).toBe("smithy.api#String");
      expect(request.members.archive.target).toBe("smithy.api#String");
      expect(result.shapes["com.example.binary#UploadFile"].output.target).toBe(
        "smithy.api#Unit",
      );
      expect(
        result.shapes["com.example.binary#UploadFileResponse"],
      ).toBeUndefined();
    });
  }

  test("component-referenced binary responses retain the original reference's nullability", () => {
    const result = model(
      { type: "object" },
      "application/json",
      { $ref: "#/components/schemas/Archive", nullable: true },
      { schemas: { Archive: { type: "string", format: "binary" } } },
    );
    const body =
      result.shapes["com.example.binary#UploadFileResponse"].members.body;
    expect(body.target).toBe("smithy.api#Blob");
    expect(body.traits["com.distilled.openapi#rawResponse"]).toEqual({});
    expect(body.traits["com.distilled.openapi#nullable"]).toEqual({});
  });

  test("multipart binary fields become blobs, not text or base64", () => {
    const result = model({
      type: "object",
      properties: {
        zip: { type: "string", format: "binary" },
        encoded: { type: "string", format: "byte" },
        environment: { type: "string" },
      },
    });
    const request = result.shapes["com.example.binary#UploadFileRequest"];
    expect(request.members.zip.target).toBe("smithy.api#Blob");
    expect(request.members.encoded.target).toBe("smithy.api#String");
    expect(request.members.environment.target).toBe("smithy.api#String");
    const response = result.shapes["com.example.binary#UploadFileResponse"];
    expect(response.members.body.target).toBe("smithy.api#Blob");
    expect(
      response.members.body.traits["com.distilled.openapi#rawResponse"],
    ).toEqual({});
  });
});
