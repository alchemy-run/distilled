import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { signSolanaMessage } from "../../src/operations/signSolanaMessage";
import { runEffect } from "../setup";

const NON_EXISTENT_SOLANA_ADDRESS = "11111111111111111111111111111112";

describe("signSolanaMessage", () => {
  it("returns error for non-existent account", async () => {
    await runEffect(
      signSolanaMessage({ address: NON_EXISTENT_SOLANA_ADDRESS, message: "hello world" }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRequest")),
      ),
    );
  });
});
