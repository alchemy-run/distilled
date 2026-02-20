import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { listSolanaAccounts } from "../../src/operations/listSolanaAccounts";
import { listSolanaTokenBalances } from "../../src/operations/listSolanaTokenBalances";
import { runEffect } from "../setup";

const NON_EXISTENT_SOLANA_ADDRESS = "11111111111111111111111111111112";

describe("listSolanaTokenBalances", () => {
  it("can list Solana token balances for an account (if any exist)", async () => {
    const result = await runEffect(
      Effect.gen(function* () {
        const accounts = yield* listSolanaAccounts({});
        if (accounts.accounts.length === 0) return null;
        const address = accounts.accounts[0]!.address;
        return yield* listSolanaTokenBalances({
          address,
          network: "solana-devnet",
        });
      }),
    );
    if (result !== null) {
      expect(Array.isArray(result.balances)).toBe(true);
    }
  });

  it("can list Solana token balances for a non-existent address (returns empty or error)", async () => {
    const result = await runEffect(
      listSolanaTokenBalances({
        address: NON_EXISTENT_SOLANA_ADDRESS,
        network: "solana-devnet",
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
