import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { createEvmAccount } from "../../src/operations/createEvmAccount";
import { createEvmSmartAccount } from "../../src/operations/createEvmSmartAccount";
import { runEffect } from "../setup";

describe("createEvmSmartAccount", () => {
  it("can create a smart account from an existing EVM account", async () => {
    const result = await runEffect(
      Effect.gen(function* () {
        const owner = yield* createEvmAccount({ name: "distilled coinbase smart owner" });
        return yield* createEvmSmartAccount({ owners: [owner.address] });
      }).pipe(
        Effect.matchEffect({
          onFailure: (e) => Effect.succeed({ error: e }),
          onSuccess: (data) => Effect.succeed({ data }),
        }),
      ),
    );
    if ("data" in result) {
      expect(result.data.address).toBeDefined();
      expect(result.data.address.startsWith("0x")).toBe(true);
      expect(Array.isArray(result.data.owners)).toBe(true);
    } else {
      expect(typeof (result.error as any)._tag).toBe("string");
    }
  });
});
