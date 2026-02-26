import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { InvalidRequest } from "../../src/errors";
import { createSolanaAccount } from "../../src/operations/createSolanaAccount";
import { updateSolanaAccount } from "../../src/operations/updateSolanaAccount";
import { TEST_PREFIX, runEffect } from "../setup";

describe("updateSolanaAccount", () => {
  it("can update a Solana account name", async () => {
    const result = await runEffect(
      Effect.gen(function* () {
        const created = yield* createSolanaAccount({
          name: `${TEST_PREFIX} distilled coinbase sol update`,
        });
        const updated = yield* updateSolanaAccount({
          address: created.address,
          name: `${TEST_PREFIX} distilled coinbase sol updated`,
        });
        return updated;
      }).pipe(
        Effect.matchEffect({
          onFailure: (e) => Effect.succeed({ error: e }),
          onSuccess: (data) => Effect.succeed({ data }),
        }),
      ),
    );
    if ("data" in result) {
      expect(result.data.address).toBeDefined();
      expect(result.data.name).toBe(
        `${TEST_PREFIX} distilled coinbase sol updated`,
      );
    } else {
      expect(result.error).toBeInstanceOf(InvalidRequest);
    }
  });
});
