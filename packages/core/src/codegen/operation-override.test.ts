import { expect, test } from "bun:test";
import { generateService } from "./generator.ts";

test("per-operation overrides fall back to declarative emission", () => {
  const { code } = generateService(
    {
      smithy: "2.0",
      shapes: {
        "example#Service": {
          type: "service",
          version: "1",
          operations: [
            { target: "example#Public" },
            { target: "example#FetchThing" },
          ],
        },
        "example#Public": {
          type: "operation",
          input: { target: "example#Request" },
          output: { target: "smithy.api#Unit" },
        },
        "example#FetchThing": {
          type: "operation",
          input: { target: "example#Request" },
          output: { target: "smithy.api#Unit" },
        },
        "example#Request": { type: "structure", members: {} },
      },
    },
    {
      operationDecl: {
        contextType: "Context",
        commonErrorType: "Error",
        commonErrorClasses: [],
        protocol: "Protocol",
        retry: "Retry.Retry",
      },
      operation: (ctx) =>
        ctx.opName === "Public"
          ? "export const publicOperation = anonymous;"
          : undefined,
    },
  );
  expect(code).toContain("export const publicOperation = anonymous;");
  expect(code).toContain("export const fetchThing:");
  expect(code).toContain("protocol: Protocol");
});
