import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { sendUserOperation } from "../../src/operations/sendUserOperation";
import { runEffect } from "../setup";

const NON_EXISTENT_ADDRESS = "0x0000000000000000000000000000000000000000";
const NON_EXISTENT_HASH = "0x0000000000000000000000000000000000000000000000000000000000000000";

describe("sendUserOperation", () => {
  it("returns error for non-existent user operation", async () => {
    await runEffect(
      sendUserOperation({
        address: NON_EXISTENT_ADDRESS,
        userOpHash: NON_EXISTENT_HASH,
        signature: "0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRequest")),
      ),
    );
  });
});
