import { describe, expect, it } from "vitest";
import { listEndUsers } from "../../src/operations/listEndUsers";
import { runEffect } from "../setup";

describe("listEndUsers", () => {
  it("can list end users", async () => {
    const result = await runEffect(listEndUsers({}));
    expect(Array.isArray(result.endUsers)).toBe(true);
  });

  it("can list end users with pagination", async () => {
    const result = await runEffect(listEndUsers({ pageSize: 5 }));
    expect(Array.isArray(result.endUsers)).toBe(true);
  });

  it("returns end users with expected properties", async () => {
    const result = await runEffect(listEndUsers({}));
    if (result.endUsers.length > 0) {
      const user = result.endUsers[0]!;
      expect(user.userId).toBeDefined();
      expect(Array.isArray(user.authenticationMethods)).toBe(true);
      expect(Array.isArray(user.evmAccounts)).toBe(true);
      expect(Array.isArray(user.solanaAccounts)).toBe(true);
      expect(user.createdAt).toBeDefined();
    }
  });
});
