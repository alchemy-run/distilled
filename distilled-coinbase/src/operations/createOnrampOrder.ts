import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { GuestPermissionDenied, GuestRegionForbidden, GuestTransactionCount, GuestTransactionLimit, InvalidRequest, NetworkNotTradable, PhoneNumberVerificationExpired } from "../errors";

// Input Schema
export const CreateOnrampOrderInput = Schema.Struct({
  agreementAcceptedAt: Schema.String,
  destinationAddress: Schema.String,
  destinationNetwork: Schema.String,
  email: Schema.String,
  isQuote: Schema.optional(Schema.Boolean),
  partnerOrderRef: Schema.optional(Schema.String),
  partnerUserRef: Schema.String,
  paymentAmount: Schema.optional(Schema.String),
  paymentCurrency: Schema.String,
  paymentMethod: Schema.Literal("GUEST_CHECKOUT_APPLE_PAY"),
  phoneNumber: Schema.String,
  phoneNumberVerifiedAt: Schema.String,
  purchaseAmount: Schema.optional(Schema.String),
  purchaseCurrency: Schema.String,
  clientIp: Schema.optional(Schema.String),
  domain: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "POST", path: "/v2/onramp/orders" }));
export type CreateOnrampOrderInput = typeof CreateOnrampOrderInput.Type;

// Output Schema
export const CreateOnrampOrderOutput = Schema.Struct({
  order: Schema.Struct({
    orderId: Schema.String,
    paymentTotal: Schema.String,
    paymentSubtotal: Schema.String,
    paymentCurrency: Schema.String,
    paymentMethod: Schema.Literal("GUEST_CHECKOUT_APPLE_PAY"),
    purchaseAmount: Schema.String,
    purchaseCurrency: Schema.String,
    fees: Schema.Array(Schema.Struct({
      type: Schema.Literal("FEE_TYPE_NETWORK", "FEE_TYPE_EXCHANGE"),
      amount: Schema.String,
      currency: Schema.String,
    })),
    exchangeRate: Schema.String,
    destinationAddress: Schema.String,
    destinationNetwork: Schema.String,
    status: Schema.Literal("ONRAMP_ORDER_STATUS_PENDING_AUTH", "ONRAMP_ORDER_STATUS_PENDING_PAYMENT", "ONRAMP_ORDER_STATUS_PROCESSING", "ONRAMP_ORDER_STATUS_COMPLETED", "ONRAMP_ORDER_STATUS_FAILED"),
    txHash: Schema.optional(Schema.String),
    createdAt: Schema.String,
    updatedAt: Schema.String,
    partnerUserRef: Schema.optional(Schema.String),
  }),
  paymentLink: Schema.optional(Schema.Struct({
    url: Schema.String,
    paymentLinkType: Schema.Literal("PAYMENT_LINK_TYPE_APPLE_PAY_BUTTON"),
  })),
});
export type CreateOnrampOrderOutput = typeof CreateOnrampOrderOutput.Type;

// The operation
/**
 * Create an onramp order
 *
 * Create a new Onramp order or get a quote for an Onramp order. Either `paymentAmount` or `purchaseAmount` must be provided.
 * This API currently only supports the payment method `GUEST_CHECKOUT_APPLE_PAY`.
 * For detailed integration instructions and to get access to this API, refer to the  [Apple Pay Onramp API docs](https://docs.cdp.coinbase.com/onramp-&-offramp/onramp-apis/apple-pay-onramp-api).
 */
export const createOnrampOrder = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateOnrampOrderInput,
  outputSchema: CreateOnrampOrderOutput,
  errors: [GuestPermissionDenied, GuestRegionForbidden, GuestTransactionCount, GuestTransactionLimit, InvalidRequest, NetworkNotTradable, PhoneNumberVerificationExpired],
}));
