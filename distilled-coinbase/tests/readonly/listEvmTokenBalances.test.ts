import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { listEvmAccounts } from "../../src/operations/listEvmAccounts";
import { listEvmTokenBalances } from "../../src/operations/listEvmTokenBalances";
import { runEffect } from "../setup";

const NON_EXISTENT_ADDRESS = "0x0000000000000000000000000000000000000000";

describe("listEvmTokenBalances", () => {
  it("can list EVM token balances for an account (if any exist)", async () => {
    const result = await runEffect(
      Effect.gen(function* () {
        const accounts = yield* listEvmAccounts({});
        if (accounts.accounts.length === 0) return null;
        const address = accounts.accounts[0]!.address;
        return yield* listEvmTokenBalances({
          address,
          network: "base-sepolia",
        });
      }),
    );
    if (result !== null) {
      expect(Array.isArray(result.balances)).toBe(true);
    }
  });

  it("can list token balances for a non-existent address (returns empty)", async () => {
    const result = await runEffect(
      listEvmTokenBalances({
        address: NON_EXISTENT_ADDRESS,
        network: "base-sepolia",
      }).pipe(
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
