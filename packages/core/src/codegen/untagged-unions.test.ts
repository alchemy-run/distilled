import { expect, test } from "bun:test";
import { generateService } from "./generator.ts";

const model = {
  smithy: "2.0",
  shapes: {
    "com.example#Service": {
      type: "service",
      version: "1",
      operations: [{ target: "com.example#GetValue" }],
    },
    "com.example#GetValue": {
      type: "operation",
      input: { target: "com.example#Input" },
      output: { target: "com.example#Output" },
      traits: {
        "smithy.api#http": { method: "GET", uri: "/value", code: 200 },
      },
    },
    "com.example#Input": { type: "structure", members: {} },
    "com.example#Output": {
      type: "structure",
      members: { value: { target: "com.example#Choice" } },
    },
    "com.example#Choice": {
      type: "union",
      members: {
        boolean: { target: "smithy.api#Boolean" },
        paths: { target: "com.example#Paths" },
      },
    },
    "com.example#Paths": {
      type: "list",
      member: { target: "smithy.api#String" },
    },
  },
};

const operationDecl = {
  contextType: "ExampleOpContext",
  commonErrorType: "ExampleOpError",
  commonErrorClasses: [],
  protocol: "ExampleProtocol",
};

test("untagged unions validate primitive and collection alternatives", () => {
  const { code } = generateService(model, {
    unionStyle: "untagged",
    operationDecl,
  });
  expect(code).toContain("export type Choice = boolean | Paths;");
  expect(code).toContain("S.Union([S.Boolean, Paths])");
  expect(code).not.toContain("S.Unknown as any as S.Schema<Choice>");
});

test("omitting a retry policy emits neither a retry import nor an operation setting", () => {
  const { code } = generateService(model, {
    unionStyle: "untagged",
    operationDecl,
  });
  expect(code).not.toContain("../retry.ts");
  expect(code).not.toContain("retry:");
  expect(code).not.toContain('import {  } from "../errors.ts"');
});

test("an explicit retry policy retains the existing import and operation setting", () => {
  const { code } = generateService(model, {
    unionStyle: "untagged",
    operationDecl: { ...operationDecl, retry: "Retry.Retry" },
  });
  expect(code).toContain('import * as Retry from "../retry.ts"');
  expect(code).toContain("retry: Retry.Retry");
});
