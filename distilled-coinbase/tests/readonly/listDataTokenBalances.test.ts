import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { listEvmAccounts } from "../../src/operations/listEvmAccounts";
import { listDataTokenBalances } from "../../src/operations/listDataTokenBalances";
import { runEffect } from "../setup";

const NON_EXISTENT_ADDRESS = "0x0000000000000000000000000000000000000000";

describe("listDataTokenBalances", () => {
  it("can list data token balances for an account (if any exist)", async () => {
    const result = await runEffect(
      Effect.gen(function* () {
        const accounts = yield* listEvmAccounts({});
        if (accounts.accounts.length === 0) return null;
        const address = accounts.accounts[0]!.address;
        return yield* listDataTokenBalances({ address, network: "base-sepolia" });
      }),
    );
    if (result !== null) {
      expect(Array.isArray(result.balances)).toBe(true);
    }
  });

  it("handles non-existent address", async () => {
    const result = await runEffect(
      listDataTokenBalances({ address: NON_EXISTENT_ADDRESS, network: "base-sepolia" }).pipe(
        Effect.matchEffect({
          onFailure: (e) => Effect.succeed({ error: e }),
          onSuccess: (data) => Effect.succeed({ data }),
        }),
      ),
    );
    if ("data" in result) {
      expect(Array.isArray(result.data.balances)).toBe(true);
    } else {
      expect((result.error as any)._tag).toBeDefined();
    }
  });
});
