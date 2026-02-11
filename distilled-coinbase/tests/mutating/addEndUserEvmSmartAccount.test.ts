import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { addEndUserEvmSmartAccount } from "../../src/operations/addEndUserEvmSmartAccount";
import { runEffect } from "../setup";

const NON_EXISTENT_ID = "00000000-0000-0000-0000-000000000000";

describe("addEndUserEvmSmartAccount", () => {
  it("returns error for non-existent user", async () => {
    await runEffect(
      addEndUserEvmSmartAccount({ userId: NON_EXISTENT_ID }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRequest")),
      ),
    );
  });
});
