import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { NotFound } from "../errors";

// Input Schema
export const GetOnrampOrderByIdInput = Schema.Struct({
  orderId: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/v2/onramp/orders/{orderId}" }));
export type GetOnrampOrderByIdInput = typeof GetOnrampOrderByIdInput.Type;

// Output Schema
export const GetOnrampOrderByIdOutput = Schema.Struct({
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
});
export type GetOnrampOrderByIdOutput = typeof GetOnrampOrderByIdOutput.Type;

// The operation
/**
 * Get an onramp order by ID
 *
 * Get an onramp order by ID.
 *
 * @param orderId - The ID of the onramp order to retrieve.
 */
export const getOnrampOrderById = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetOnrampOrderByIdInput,
  outputSchema: GetOnrampOrderByIdOutput,
  errors: [NotFound],
}));
