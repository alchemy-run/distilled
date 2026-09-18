import { expect, test } from "bun:test";
import { generateService } from "./generator.ts";

test("imports only the pagination protocol when every operation uses it", () => {
  const { code } = generateService(
    {
      smithy: "2.0",
      shapes: {
        "example#Service": {
          type: "service",
          version: "1",
          operations: [{ target: "example#List" }],
        },
        "example#List": {
          type: "operation",
          input: { target: "example#Request" },
          output: { target: "example#Response" },
          traits: { "smithy.api#paginated": { mode: "single", items: "items" } },
        },
        "example#Request": { type: "structure", members: {} },
        "example#Response": { type: "structure", members: { items: { target: "example#Items" } } },
        "example#Items": { type: "list", member: { target: "smithy.api#String" } },
      },
    },
    {
      operationDecl: {
        contextType: "OpContext",
        commonErrorType: "OpError",
        commonErrorClasses: [],
        protocol: "DefaultProtocol",
        retry: "Retry.Retry",
      },
      paginationProfiles: { default: { protocol: "PaginatedProtocol", itemsFallback: "items" } },
    },
  );
  expect(code).toContain("protocol: PaginatedProtocol");
  expect(code).toContain("  PaginatedProtocol,");
  expect(code).not.toContain("DefaultProtocol");
});
