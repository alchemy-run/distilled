import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { listEvmAccounts } from "../../src/operations/listEvmAccounts";
import { listTokensForAccount } from "../../src/operations/listTokensForAccount";
import { runEffect } from "../setup";

const NON_EXISTENT_ADDRESS = "0x0000000000000000000000000000000000000000";

describe("listTokensForAccount", () => {
  it("can list tokens for an account (if any exist)", async () => {
    const result = await runEffect(
      Effect.gen(function* () {
        const accounts = yield* listEvmAccounts({});
        if (accounts.accounts.length === 0) return null;
        const address = accounts.accounts[0]!.address;
        return yield* listTokensForAccount({ network: "base-sepolia", address });
      }),
    );
    if (result !== null) {
      expect(result.totalCount !== undefined || result.tokenAddresses !== undefined).toBe(true);
    }
  });

  it("handles non-existent address", async () => {
    const result = await runEffect(
      listTokensForAccount({ network: "base-sepolia", address: NON_EXISTENT_ADDRESS }).pipe(
        Effect.matchEffect({
          onFailure: (e) => Effect.succeed({ error: e }),
          onSuccess: (data) => Effect.succeed({ data }),
        }),
      ),
    );
    if ("data" in result) {
      // May return empty results
      expect(result.data).toBeDefined();
    } else {
      expect((result.error as any)._tag).toBeDefined();
    }
  });
});
