import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { signEvmHash } from "../../src/operations/signEvmHash";
import { runEffect } from "../setup";

const NON_EXISTENT_ADDRESS = "0x0000000000000000000000000000000000000000";

describe("signEvmHash", () => {
  it("returns error for non-existent account", async () => {
    await runEffect(
      signEvmHash({
        address: NON_EXISTENT_ADDRESS,
        hash: "0x0000000000000000000000000000000000000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRequest")),
      ),
    );
  });
});
