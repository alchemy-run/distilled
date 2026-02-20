import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { exportEvmAccount } from "../../src/operations/exportEvmAccount";
import { runEffect } from "../setup";

const NON_EXISTENT_ADDRESS = "0x0000000000000000000000000000000000000000";

describe("exportEvmAccount", () => {
  it("returns error for non-existent address", async () => {
    await runEffect(
      exportEvmAccount({
        address: NON_EXISTENT_ADDRESS,
        exportEncryptionKey: "test-key",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRequest")),
      ),
    );
  });
});
