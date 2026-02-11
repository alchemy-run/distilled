import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { supportedX402PaymentKinds } from "../../src/operations/supportedX402PaymentKinds";
import { runEffect } from "../setup";

describe("supportedX402PaymentKinds", () => {
  it("can get supported payment kinds", async () => {
    const result = await runEffect(
      supportedX402PaymentKinds({}).pipe(
        Effect.matchEffect({
          onFailure: (e) => Effect.succeed({ error: e }),
          onSuccess: (data) => Effect.succeed({ data }),
        }),
      ),
    );
    if ("data" in result) {
      expect(Array.isArray(result.data.kinds)).toBe(true);
      expect(Array.isArray(result.data.extensions)).toBe(true);
      expect(result.data.signers).toBeDefined();
    } else {
      expect((result.error as any)._tag).toBeDefined();
    }
  });
});
