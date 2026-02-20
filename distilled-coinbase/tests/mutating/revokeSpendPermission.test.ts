import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { revokeSpendPermission } from "../../src/operations/revokeSpendPermission";
import { runEffect } from "../setup";

const NON_EXISTENT_ADDRESS = "0x0000000000000000000000000000000000000000";
const NON_EXISTENT_HASH =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

describe("revokeSpendPermission", () => {
  it("returns error for non-existent spend permission", async () => {
    await runEffect(
      revokeSpendPermission({
        address: NON_EXISTENT_ADDRESS,
        network: "base-sepolia",
        permissionHash: NON_EXISTENT_HASH,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRequest")),
      ),
    );
  });
});
