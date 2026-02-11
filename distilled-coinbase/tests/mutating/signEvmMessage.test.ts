import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { signEvmMessage } from "../../src/operations/signEvmMessage";
import { runEffect } from "../setup";

const NON_EXISTENT_ADDRESS = "0x0000000000000000000000000000000000000000";

describe("signEvmMessage", () => {
  it("returns error for non-existent account", async () => {
    await runEffect(
      signEvmMessage({ address: NON_EXISTENT_ADDRESS, message: "hello world" }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRequest")),
      ),
    );
  });
});
