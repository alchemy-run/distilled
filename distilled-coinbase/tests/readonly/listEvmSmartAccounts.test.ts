import { describe, expect, it } from "vitest";
import { listEvmSmartAccounts } from "../../src/operations/listEvmSmartAccounts";
import { runEffect } from "../setup";

describe("listEvmSmartAccounts", () => {
  it("can list EVM smart accounts", async () => {
    const result = await runEffect(listEvmSmartAccounts({}));
    expect(Array.isArray(result.accounts)).toBe(true);
  });

  it("can list EVM smart accounts with pagination", async () => {
    const result = await runEffect(listEvmSmartAccounts({ pageSize: 5 }));
    expect(Array.isArray(result.accounts)).toBe(true);
  });

  it("returns smart accounts with expected properties", async () => {
    const result = await runEffect(listEvmSmartAccounts({}));
    if (result.accounts.length > 0) {
      const account = result.accounts[0]!;
      expect(account.address).toBeDefined();
      expect(account.address.startsWith("0x")).toBe(true);
      expect(Array.isArray(account.owners)).toBe(true);
    }
  });
});
