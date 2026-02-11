import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { addEndUserEvmAccount } from "../../src/operations/addEndUserEvmAccount";
import { runEffect } from "../setup";

const NON_EXISTENT_ID = "00000000-0000-0000-0000-000000000000";

describe("addEndUserEvmAccount", () => {
  it("returns error for non-existent user", async () => {
    await runEffect(
      addEndUserEvmAccount({ userId: NON_EXISTENT_ID }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRequest")),
      ),
    );
  });
});
