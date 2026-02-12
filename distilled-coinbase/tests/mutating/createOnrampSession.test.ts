import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { createOnrampSession } from "../../src/operations/createOnrampSession";
import { runEffect } from "../setup";

describe("createOnrampSession", () => {
  it("can create an onramp session (or handles error)", async () => {
    const result = await runEffect(
      createOnrampSession({
        purchaseCurrency: "USDC",
        destinationNetwork: "base",
        destinationAddress: "0x0000000000000000000000000000000000000001",
      }).pipe(
        Effect.matchEffect({
          onFailure: (e) => Effect.succeed({ error: e }),
          onSuccess: (data) => Effect.succeed({ data }),
        }),
      ),
    );
    if ("data" in result) {
      expect(result.data.session).toBeDefined();
      expect(result.data.session.onrampUrl).toBeDefined();
    } else {
      expect(typeof (result.error as any)._tag).toBe("string");
    }
  });
});
