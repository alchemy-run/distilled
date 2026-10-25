import { expect, test } from "vitest";
import { generateService } from "../../src/codegen/generator.ts";

test('items "$" keeps a bare-list output paginated without a syntheticOutputs entry', () => {
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
          traits: {
            "smithy.api#paginated": { mode: "link", inputToken: "cursor", items: "$" },
          },
        },
        "example#Request": {
          type: "structure",
          members: { cursor: { target: "smithy.api#String" } },
        },
        "example#Response": {
          type: "structure",
          members: { body: { target: "example#Items", traits: { "example#raw": {} } } },
        },
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
      extraBindings: [
        {
          trait: "example#raw",
          binding: "rawResponse",
          pipe: "T.RawResponse()",
          rootPipe: "T.RawResponseRoot()",
        },
      ],
      paginationProfiles: { default: { protocol: "PaginatedProtocol", itemsFallback: "items" } },
    },
  );
  expect(code).toContain("protocol: PaginatedProtocol");
  expect(code).not.toContain("protocol: DefaultProtocol");
});
