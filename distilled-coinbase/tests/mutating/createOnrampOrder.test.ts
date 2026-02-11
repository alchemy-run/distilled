import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { createOnrampOrder } from "../../src/operations/createOnrampOrder";
import { runEffect } from "../setup";

describe("createOnrampOrder", () => {
  it("returns error for invalid order (missing required fields or invalid data)", async () => {
    await runEffect(
      createOnrampOrder({
        agreementAcceptedAt: new Date().toISOString(),
        destinationAddress: "0x0000000000000000000000000000000000000001",
        destinationNetwork: "base",
        email: "test@example.com",
        partnerUserRef: "distilled-test",
        paymentAmount: "10.00",
        paymentCurrency: "USD",
        paymentMethod: "GUEST_CHECKOUT_APPLE_PAY",
        phoneNumber: "+10000000000",
        phoneNumberVerifiedAt: new Date().toISOString(),
        purchaseCurrency: "USDC",
      }).pipe(
        Effect.flip,
        // This will likely fail because we don't have a real Apple Pay session
        Effect.map((e) => expect(e._tag).toBe("NotFound")),
      ),
    );
  });
});
