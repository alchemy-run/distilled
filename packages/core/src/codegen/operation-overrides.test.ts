import { expect, test } from "bun:test";
import { generateService } from "./generator.ts";

test("operationDecl.overrides swaps protocol and context per operation", () => {
  const { code } = generateService(
    {
      smithy: "2.0",
      shapes: {
        "example#Service": {
          type: "service",
          version: "1",
          operations: [
            { target: "example#Login" },
            { target: "example#FetchThing" },
          ],
        },
        "example#Login": {
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
        overrides: (ctx) =>
          ctx.opName === "Login"
            ? { protocol: "PublicProtocol", contextType: "PublicContext" }
            : undefined,
      },
    },
  );
  const login = code.slice(code.indexOf("export const login:"));
  const fetchThing = code.slice(code.indexOf("export const fetchThing:"));
  expect(login).toContain("PublicContext");
  expect(login).toContain("protocol: PublicProtocol");
  expect(fetchThing).toContain("  Context\n");
  expect(fetchThing).toContain("protocol: Protocol");
});
