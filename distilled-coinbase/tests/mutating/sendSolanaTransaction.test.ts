import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { sendSolanaTransaction } from "../../src/operations/sendSolanaTransaction";
import { runEffect } from "../setup";

describe("sendSolanaTransaction", () => {
  it("returns error for invalid transaction", async () => {
    await runEffect(
      sendSolanaTransaction({
        network: "solana-devnet",
        transaction: "AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRequest")),
      ),
    );
  });
});
