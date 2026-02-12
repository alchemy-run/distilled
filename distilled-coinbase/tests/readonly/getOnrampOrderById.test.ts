import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { getOnrampOrderById } from "../../src/operations/getOnrampOrderById";
import { runEffect } from "../setup";

const NON_EXISTENT_ID = "00000000-0000-0000-0000-000000000000";

describe("getOnrampOrderById", () => {
  it("returns NotFound for non-existent order", async () => {
    await runEffect(
      getOnrampOrderById({ orderId: NON_EXISTENT_ID }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NotFound")),
      ),
    );
  });
});
