import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { getUserOperation } from "../../src/operations/getUserOperation";
import { runEffect } from "../setup";

const NON_EXISTENT_ADDRESS = "0x0000000000000000000000000000000000000000";
const NON_EXISTENT_HASH = "0x0000000000000000000000000000000000000000000000000000000000000000";

describe("getUserOperation", () => {
  it("returns NotFound for non-existent user operation", async () => {
    await runEffect(
      getUserOperation({ address: NON_EXISTENT_ADDRESS, userOpHash: NON_EXISTENT_HASH }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NotFound")),
      ),
    );
  });
});
