import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { listEvmAccounts } from "../../src/operations/listEvmAccounts";
import { getEvmAccount } from "../../src/operations/getEvmAccount";
import { runEffect } from "../setup";

const NON_EXISTENT_ADDRESS = "0x0000000000000000000000000000000000000000";

describe("getEvmAccount", () => {
  it("can get an EVM account by address (if any exist)", async () => {
    const result = await runEffect(
      Effect.gen(function* () {
        const accounts = yield* listEvmAccounts({});
        if (accounts.accounts.length === 0) return null;
        const address = accounts.accounts[0]!.address;
        return yield* getEvmAccount({ address });
      }),
    );
    if (result !== null) {
      expect(result.address).toBeDefined();
      expect(result.address.startsWith("0x")).toBe(true);
    }
  });

  it("returns NotFound for non-existent address", async () => {
    await runEffect(
      getEvmAccount({ address: NON_EXISTENT_ADDRESS }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NotFound")),
      ),
    );
  });
});
