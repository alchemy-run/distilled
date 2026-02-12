import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { listEvmSmartAccounts } from "../../src/operations/listEvmSmartAccounts";
import { listSpendPermissions } from "../../src/operations/listSpendPermissions";
import { runEffect } from "../setup";

const NON_EXISTENT_ADDRESS = "0x0000000000000000000000000000000000000000";

describe("listSpendPermissions", () => {
  it("can list spend permissions for a smart account (if any exist)", async () => {
    const result = await runEffect(
      Effect.gen(function* () {
        const accounts = yield* listEvmSmartAccounts({});
        if (accounts.accounts.length === 0) return null;
        const address = accounts.accounts[0]!.address;
        return yield* listSpendPermissions({ address });
      }),
    );
    if (result !== null) {
      expect(Array.isArray(result.spendPermissions)).toBe(true);
    }
  });

  it("returns empty list for non-existent smart account", async () => {
    const result = await runEffect(
      listSpendPermissions({ address: NON_EXISTENT_ADDRESS }),
    );
    expect(Array.isArray(result.spendPermissions)).toBe(true);
    expect(result.spendPermissions.length).toBe(0);
  });
});
