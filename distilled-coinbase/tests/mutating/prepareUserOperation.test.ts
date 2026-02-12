import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { prepareUserOperation } from "../../src/operations/prepareUserOperation";
import { runEffect } from "../setup";

const NON_EXISTENT_ADDRESS = "0x0000000000000000000000000000000000000000";

describe("prepareUserOperation", () => {
  it("returns error for non-existent smart account", async () => {
    await runEffect(
      prepareUserOperation({
        address: NON_EXISTENT_ADDRESS,
        network: "base-sepolia",
        calls: [{ to: "0x0000000000000000000000000000000000000001", value: "0", data: "0x" }],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NotFound")),
      ),
    );
  });
});
