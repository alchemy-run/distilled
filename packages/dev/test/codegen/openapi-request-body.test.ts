import { describe, expect, test } from "vitest";
import { convertOpenApiToSmithy } from "../../src/codegen/openapi.ts";

describe("OpenAPI request bodies", () => {
  test("follows a requestBodies $ref that points at another requestBodies entry", () => {
    // 1Password Events: AuditEventsRequest → CursorRequest → content.
    const model = convertOpenApiToSmithy(
      {
        openapi: "3.0.0",
        info: { title: "Events", version: "1" },
        components: {
          requestBodies: {
            AuditEventsRequest: { $ref: "#/components/requestBodies/CursorRequest" },
            CursorRequest: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: { cursor: { type: "string" } },
                  },
                },
              },
            },
          },
        },
        paths: {
          "/auditevents": {
            post: {
              operationId: "getAuditEvents",
              requestBody: { $ref: "#/components/requestBodies/AuditEventsRequest" },
              responses: { "200": { description: "ok" } },
            },
          },
        },
      },
      { namespace: "com.example.events", serviceName: "Events" },
    );
    const op = model.shapes["com.example.events#GetAuditEvents"];
    expect(op.input.target).toBe("com.example.events#GetAuditEventsRequest");
    const input = model.shapes["com.example.events#GetAuditEventsRequest"];
    expect(input.members.cursor.target).toBe("smithy.api#String");
  });
});
