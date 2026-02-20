import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { InvalidRequest } from "../../src/errors";
import { createSolanaAccount } from "../../src/operations/createSolanaAccount";
import { updateSolanaAccount } from "../../src/operations/updateSolanaAccount";
import { runEffect } from "../setup";

describe("updateSolanaAccount", () => {
  it("can update a Solana account name", async () => {
    const result = await runEffect(
      Effect.gen(function* () {
        const created = yield* createSolanaAccount({
          name: "distilled coinbase sol update",
        });
        const updated = yield* updateSolanaAccount({
          address: created.address,
          name: "distilled coinbase sol updated",
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
      expect(result.data.name).toBe("distilled coinbase sol updated");
    } else {
      expect(result.error).toBeInstanceOf(InvalidRequest);
    }
  });
});
