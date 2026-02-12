import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { createSpendPermission } from "../../src/operations/createSpendPermission";
import { runEffect } from "../setup";

const NON_EXISTENT_ADDRESS = "0x0000000000000000000000000000000000000000";

describe("createSpendPermission", () => {
  it("returns error for non-existent smart account", async () => {
    await runEffect(
      createSpendPermission({
        address: NON_EXISTENT_ADDRESS,
        network: "base-sepolia",
        spender: "0x0000000000000000000000000000000000000001",
        token: "0x0000000000000000000000000000000000000000",
        allowance: "1000000",
        period: "86400",
        start: "0",
        end: "999999999999",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRequest")),
      ),
    );
  });
});
