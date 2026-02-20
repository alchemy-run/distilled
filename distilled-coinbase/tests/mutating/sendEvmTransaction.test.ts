import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { sendEvmTransaction } from "../../src/operations/sendEvmTransaction";
import { runEffect } from "../setup";

const NON_EXISTENT_ADDRESS = "0x0000000000000000000000000000000000000000";

describe("sendEvmTransaction", () => {
  it("returns error for non-existent account", async () => {
    await runEffect(
      sendEvmTransaction({
        address: NON_EXISTENT_ADDRESS,
        network: "base-sepolia",
        transaction:
          "0x02f8650183015f9080830186a09400000000000000000000000000000000000000008080c0",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRequest")),
      ),
    );
  });
});
