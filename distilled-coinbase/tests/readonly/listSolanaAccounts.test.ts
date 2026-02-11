import { describe, expect, it } from "vitest";
import { listSolanaAccounts } from "../../src/operations/listSolanaAccounts";
import { runEffect } from "../setup";

describe("listSolanaAccounts", () => {
  it("can list Solana accounts", async () => {
    const result = await runEffect(listSolanaAccounts({}));
    expect(Array.isArray(result.accounts)).toBe(true);
  });

  it("can list Solana accounts with pagination", async () => {
    const result = await runEffect(listSolanaAccounts({ pageSize: 5 }));
    expect(Array.isArray(result.accounts)).toBe(true);
  });

  it("returns accounts with expected properties", async () => {
    const result = await runEffect(listSolanaAccounts({}));
    if (result.accounts.length > 0) {
      const account = result.accounts[0]!;
      expect(account.address).toBeDefined();
      expect(typeof account.address).toBe("string");
    }
  });
});
