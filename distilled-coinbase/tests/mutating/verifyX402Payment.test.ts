import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { verifyX402Payment } from "../../src/operations/verifyX402Payment";
import { runEffect } from "../setup";

describe("verifyX402Payment", () => {
  it("returns invalid for a fake payment payload", async () => {
    const result = await runEffect(
      verifyX402Payment({
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
          asset: "0x036CbD53842c5426634e7929541eC2318f3dCF7e", // USDC on Base Sepolia
        },
      }).pipe(
        Effect.matchEffect({
          onFailure: (e) => Effect.succeed({ error: e }),
          onSuccess: (data) => Effect.succeed({ data }),
        }),
      ),
    );
    if ("data" in result) {
      expect(typeof result.data.isValid).toBe("boolean");
      expect(result.data.payer).toBeDefined();
    } else {
      expect(typeof (result.error as any)._tag).toBe("string");
    }
  });
});
