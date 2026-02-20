import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { exportSolanaAccount } from "../../src/operations/exportSolanaAccount";
import { runEffect } from "../setup";

const NON_EXISTENT_SOLANA_ADDRESS = "11111111111111111111111111111112";

describe("exportSolanaAccount", () => {
  it("returns error for non-existent address", async () => {
    await runEffect(
      exportSolanaAccount({
        address: NON_EXISTENT_SOLANA_ADDRESS,
        exportEncryptionKey: "test-key",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRequest")),
      ),
    );
  });
});
