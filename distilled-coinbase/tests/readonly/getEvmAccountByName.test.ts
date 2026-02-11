import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { listEvmAccounts } from "../../src/operations/listEvmAccounts";
import { getEvmAccountByName } from "../../src/operations/getEvmAccountByName";
import { runEffect } from "../setup";

const NON_EXISTENT_NAME = "this-name-definitely-does-not-exist-12345";

describe("getEvmAccountByName", () => {
  it("can get an EVM account by name (if any have names)", async () => {
    const result = await runEffect(
      Effect.gen(function* () {
        const accounts = yield* listEvmAccounts({});
        const namedAccount = accounts.accounts.find((a) => a.name);
        if (!namedAccount?.name) return null;
        return yield* getEvmAccountByName({ name: namedAccount.name });
      }),
    );
    if (result !== null) {
      expect(result.address).toBeDefined();
      expect(result.name).toBeDefined();
    }
  });

  it("returns NotFound for non-existent name", async () => {
    await runEffect(
      getEvmAccountByName({ name: NON_EXISTENT_NAME }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NotFound")),
      ),
    );
  });
});
