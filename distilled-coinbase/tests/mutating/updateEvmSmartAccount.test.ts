import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { updateEvmSmartAccount } from "../../src/operations/updateEvmSmartAccount";
import { runEffect } from "../setup";

const NON_EXISTENT_ADDRESS = "0x0000000000000000000000000000000000000000";

describe("updateEvmSmartAccount", () => {
  it("returns NotFound for non-existent smart account", async () => {
    await runEffect(
      updateEvmSmartAccount({
        address: NON_EXISTENT_ADDRESS,
        name: "should-not-work",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NotFound")),
      ),
    );
  });
});
