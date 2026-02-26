import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { InvalidRequest } from "../../src/errors";
import { createSolanaAccount } from "../../src/operations/createSolanaAccount";
import { TEST_PREFIX, runEffect } from "../setup";

describe("createSolanaAccount", () => {
  it("can create a new Solana account", async () => {
    const result = await runEffect(
      createSolanaAccount({ name: `${TEST_PREFIX} distilled coinbase solana test` }).pipe(
        Effect.matchEffect({
          onFailure: (e) => Effect.succeed({ error: e }),
          onSuccess: (data) => Effect.succeed({ data }),
        }),
      ),
    );
    if ("data" in result) {
      expect(result.data.address).toBeDefined();
      expect(typeof result.data.address).toBe("string");
    } else {
      expect(result.error).toBeInstanceOf(InvalidRequest);
    }
  });
});
