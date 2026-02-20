import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { signSolanaTransaction } from "../../src/operations/signSolanaTransaction";
import { runEffect } from "../setup";

const NON_EXISTENT_SOLANA_ADDRESS = "11111111111111111111111111111112";

describe("signSolanaTransaction", () => {
  it("returns error for non-existent account", async () => {
    await runEffect(
      signSolanaTransaction({
        address: NON_EXISTENT_SOLANA_ADDRESS,
        transaction:
          "AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRequest")),
      ),
    );
  });
});
