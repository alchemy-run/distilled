import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { listEvmSmartAccounts } from "../../src/operations/listEvmSmartAccounts";
import { getEvmSmartAccount } from "../../src/operations/getEvmSmartAccount";
import { runEffect } from "../setup";

const NON_EXISTENT_ADDRESS = "0x0000000000000000000000000000000000000000";

describe("getEvmSmartAccount", () => {
  it("can get a smart account by address (if any exist)", async () => {
    const result = await runEffect(
      Effect.gen(function* () {
        const accounts = yield* listEvmSmartAccounts({});
        if (accounts.accounts.length === 0) return null;
        const address = accounts.accounts[0]!.address;
        return yield* getEvmSmartAccount({ address });
      }),
    );
    if (result !== null) {
      expect(result.address).toBeDefined();
      expect(result.address.startsWith("0x")).toBe(true);
      expect(Array.isArray(result.owners)).toBe(true);
    }
  });

  it("returns NotFound for non-existent address", async () => {
    await runEffect(
      getEvmSmartAccount({ address: NON_EXISTENT_ADDRESS }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NotFound")),
      ),
    );
  });
});
