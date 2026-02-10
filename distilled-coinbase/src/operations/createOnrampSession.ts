import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateOnrampSessionInput = Schema.Struct({
  purchaseCurrency: Schema.String,
  destinationNetwork: Schema.String,
  destinationAddress: Schema.String,
  paymentAmount: Schema.optional(Schema.String),
  purchaseAmount: Schema.optional(Schema.String),
  paymentCurrency: Schema.optional(Schema.String),
  paymentMethod: Schema.optional(Schema.Literal("CARD", "ACH", "APPLE_PAY", "PAYPAL", "FIAT_WALLET", "CRYPTO_WALLET")),
  country: Schema.optional(Schema.String),
  subdivision: Schema.optional(Schema.String),
  redirectUrl: Schema.optional(Schema.String),
  clientIp: Schema.optional(Schema.String),
  partnerUserRef: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "POST", path: "/v2/onramp/sessions" }));
export type CreateOnrampSessionInput = typeof CreateOnrampSessionInput.Type;

// Output Schema
export const CreateOnrampSessionOutput = Schema.Struct({
  session: Schema.Struct({
    onrampUrl: Schema.String,
  }),
  quote: Schema.optional(Schema.Struct({
    paymentTotal: Schema.String,
    paymentSubtotal: Schema.String,
    paymentCurrency: Schema.String,
    purchaseAmount: Schema.String,
    purchaseCurrency: Schema.String,
    destinationNetwork: Schema.String,
    fees: Schema.Array(Schema.Struct({
      type: Schema.Literal("FEE_TYPE_NETWORK", "FEE_TYPE_EXCHANGE"),
      amount: Schema.String,
      currency: Schema.String,
    })),
    exchangeRate: Schema.String,
  })),
});
export type CreateOnrampSessionOutput = typeof CreateOnrampSessionOutput.Type;

// The operation
/**
 * Create an onramp session
 *
 * Returns a single-use URL for an Onramp session. This API provides flexible  functionality based on the parameters provided, supporting three cases:
 * **Important**: The returned URL is single-use only. Once a user visits the URL,  no one else can access it.
 * ## Use Cases
 * ### 1. Basic Session (Minimum Parameters)
 * **Required**: `destinationAddress`, `purchaseCurrency`, `destinationNetwork`
 * **Returns**: Basic single-use onramp URL. The `quote` object will not be included in the response.
 * ### 2. One-Click Onramp URL
 * **Required**: Basic parameters + (`paymentAmount` OR `purchaseAmount`), `paymentCurrency`
 * **Returns**: One-click onramp URL for streamlined checkout. The `quote` object will not be included in the response.
 * ### 3. One-Click Onramp URL with Quote
 * **Required**: One-Click Onramp parameters + `paymentMethod`, `country`, `subdivision`
 * **Returns**: Complete pricing quote and one-click onramp URL. Both `session` and `quote` objects will be included in the response.
 * **Note**: Only one of `paymentAmount` or `purchaseAmount` should be provided, not both. Providing both will result in an error. When `paymentAmount` is provided, the quote shows how much crypto the user will receive for the specified fiat amount (fee-inclusive). When `purchaseAmount` is provided, the quote shows how much fiat the user needs to pay for the specified crypto amount (fee-exclusive).
 */
export const createOnrampSession = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateOnrampSessionInput,
  outputSchema: CreateOnrampSessionOutput,
}));
