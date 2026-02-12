import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { listEvmAccounts } from "../../src/operations/listEvmAccounts";
import { runEffect } from "../setup";

describe("listEvmAccounts", () => {
  it("can list EVM accounts", async () => {
    const result = await runEffect(listEvmAccounts({}));
    expect(Array.isArray(result.accounts)).toBe(true);
  });

  it("can list EVM accounts with pagination", async () => {
    const result = await runEffect(listEvmAccounts({ pageSize: 5 }));
    expect(Array.isArray(result.accounts)).toBe(true);
  });

  it("returns accounts with expected properties", async () => {
    const result = await runEffect(listEvmAccounts({}));
    if (result.accounts.length > 0) {
      const account = result.accounts[0]!;
      expect(account.address).toBeDefined();
      expect(typeof account.address).toBe("string");
      expect(account.address.startsWith("0x")).toBe(true);
    }
  });
});
