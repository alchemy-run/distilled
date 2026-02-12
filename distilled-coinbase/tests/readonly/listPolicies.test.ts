import { describe, expect, it } from "vitest";
import { listPolicies } from "../../src/operations/listPolicies";
import { runEffect } from "../setup";

describe("listPolicies", () => {
  it("can list policies", async () => {
    const result = await runEffect(listPolicies({}));
    expect(Array.isArray(result.policies)).toBe(true);
  });

  it("can list policies with scope filter", async () => {
    const result = await runEffect(listPolicies({ scope: "project" }));
    expect(Array.isArray(result.policies)).toBe(true);
    for (const policy of result.policies) {
      expect(policy.scope).toBe("project");
    }
  });

  it("can list account-scoped policies", async () => {
    const result = await runEffect(listPolicies({ scope: "account" }));
    expect(Array.isArray(result.policies)).toBe(true);
    for (const policy of result.policies) {
      expect(policy.scope).toBe("account");
    }
  });

  it("returns policies with expected properties", async () => {
    const result = await runEffect(listPolicies({}));
    if (result.policies.length > 0) {
      const policy = result.policies[0]!;
      expect(policy.id).toBeDefined();
      expect(policy.scope).toBeDefined();
      expect(["project", "account"]).toContain(policy.scope);
      expect(Array.isArray(policy.rules)).toBe(true);
      expect(policy.createdAt).toBeDefined();
      expect(policy.updatedAt).toBeDefined();
    }
  });
});
