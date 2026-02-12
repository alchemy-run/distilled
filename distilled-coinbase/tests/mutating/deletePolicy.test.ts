import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { deletePolicy } from "../../src/operations/deletePolicy";
import { runEffect } from "../setup";

const NON_EXISTENT_ID = "00000000-0000-0000-0000-000000000000";

describe("deletePolicy", () => {
  it("returns Forbidden for non-existent policy", async () => {
    await runEffect(
      deletePolicy({ policyId: NON_EXISTENT_ID }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("Forbidden")),
      ),
    );
  });
});
