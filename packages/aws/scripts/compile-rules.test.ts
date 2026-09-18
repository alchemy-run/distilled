import { describe, expect, test } from "bun:test";
import { compileRuleSet, generateRuleSetCode, type RuleSetObject } from "./compile-rules.ts";

describe("endpoint resolver helpers", () => {
  test("omits unused helpers for an unconditional endpoint", () => {
    const rules: RuleSetObject = {
      version: "1.0",
      parameters: { Endpoint: { type: "string" } },
      rules: [{ type: "endpoint", conditions: [], endpoint: { url: { ref: "Endpoint" } } }],
    };
    expect(generateRuleSetCode(rules, { typed: true })).not.toContain("const err");
    expect(generateRuleSetCode(rules)).not.toContain("(p, _)");
    expect(compileRuleSet(rules)({ Endpoint: "https://example.com" })).toEqual({
      type: "endpoint",
      endpoint: { url: "https://example.com", properties: {}, headers: {} },
    });
  });

  test("preserves runtime helpers and the no-match fallback", () => {
    const rules: RuleSetObject = {
      version: "1.0",
      parameters: { Host: { type: "string" } },
      rules: [
        {
          type: "endpoint",
          conditions: [{ fn: "isValidHostLabel", argv: [{ ref: "Host" }, false] }],
          endpoint: { url: "https://{Host}.example.com" },
        },
      ],
    };
    const resolve = compileRuleSet(rules);
    expect(resolve({ Host: "valid" }).type).toBe("endpoint");
    expect(resolve({ Host: "not a host" })).toEqual({
      type: "error",
      message: "No matching endpoint rule",
    });
  });
});
