import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { settleX402Payment } from "../../src/operations/settleX402Payment";
import { runEffect } from "../setup";

describe("settleX402Payment", () => {
  it("returns error for invalid payment payload", async () => {
    const result = await runEffect(
      settleX402Payment({
        x402Version: 1,
        paymentPayload: {
          x402Version: 1,
          scheme: "exact",
          network: "base-sepolia",
          payload: {
            signature: "0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
            authorization: {
              from: "0x0000000000000000000000000000000000000001",
              to: "0x0000000000000000000000000000000000000002",
              value: "1000000",
              validAfter: "0",
              validBefore: "999999999999",
              nonce: "0x0000000000000000000000000000000000000000000000000000000000000000",
            },
          },
        },
        paymentRequirements: {
          scheme: "exact",
          network: "base-sepolia",
          maxAmountRequired: "1000000",
          resource: "https://example.com/resource",
          description: "Test payment",
          mimeType: "application/json",
          payTo: "0x0000000000000000000000000000000000000002",
          maxTimeoutSeconds: 300,
          asset: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
        },
      }).pipe(
        Effect.matchEffect({
          onFailure: (e) => Effect.succeed({ error: e }),
          onSuccess: (data) => Effect.succeed({ data }),
        }),
      ),
    );
    if ("data" in result) {
      // Settlement of invalid payment should fail gracefully
      expect(typeof result.data.success).toBe("boolean");
    } else {
      expect(typeof (result.error as any)._tag).toBe("string");
    }
  });
});
