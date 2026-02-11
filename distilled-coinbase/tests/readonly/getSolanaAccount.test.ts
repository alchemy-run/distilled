import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { listSolanaAccounts } from "../../src/operations/listSolanaAccounts";
import { getSolanaAccount } from "../../src/operations/getSolanaAccount";
import { runEffect } from "../setup";

const NON_EXISTENT_SOLANA_ADDRESS = "11111111111111111111111111111112";

describe("getSolanaAccount", () => {
  it("can get a Solana account by address (if any exist)", async () => {
    const result = await runEffect(
      Effect.gen(function* () {
        const accounts = yield* listSolanaAccounts({});
        if (accounts.accounts.length === 0) return null;
        const address = accounts.accounts[0]!.address;
        return yield* getSolanaAccount({ address });
      }),
    );
    if (result !== null) {
      expect(result.address).toBeDefined();
    }
  });

  it("returns NotFound for non-existent address", async () => {
    await runEffect(
      getSolanaAccount({ address: NON_EXISTENT_SOLANA_ADDRESS }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NotFound")),
      ),
    );
  });
});
