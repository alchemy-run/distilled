import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { signEvmTypedData } from "../../src/operations/signEvmTypedData";
import { runEffect } from "../setup";

const NON_EXISTENT_ADDRESS = "0x0000000000000000000000000000000000000000";

describe("signEvmTypedData", () => {
  it("returns error for non-existent account", async () => {
    await runEffect(
      signEvmTypedData({
        address: NON_EXISTENT_ADDRESS,
        domain: { name: "Test", version: "1", chainId: 84532 },
        types: { Test: [{ name: "value", type: "string" }] },
        primaryType: "Test",
        message: { value: "hello" },
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRequest")),
      ),
    );
  });
});
