import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetTreasuryInboundTransfersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    financial_account: Schema.String,
    limit: Schema.optional(Schema.Number),
    starting_after: Schema.optional(Schema.String),
    status: Schema.optional(
      Schema.Literals(["canceled", "failed", "processing", "succeeded"]),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/treasury/inbound_transfers",
      contentType: "form-urlencoded",
    }),
  );
export type GetTreasuryInboundTransfersInput =
  typeof GetTreasuryInboundTransfersInput.Type;

// Output Schema
export const GetTreasuryInboundTransfersOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        amount: Schema.Number,
        cancelable: Schema.Boolean,
        created: Schema.Number,
        currency: Schema.String,
        description: Schema.NullOr(Schema.String),
        failure_details: Schema.Unknown,
        financial_account: Schema.String,
        hosted_regulatory_receipt_url: Schema.NullOr(Schema.String),
        id: Schema.String,
        linked_flows: Schema.Struct({
          received_debit: Schema.NullOr(Schema.String),
        }),
        livemode: Schema.Boolean,
        metadata: Schema.Record(Schema.String, Schema.String),
        object: Schema.Literals(["treasury.inbound_transfer"]),
        origin_payment_method: Schema.NullOr(Schema.String),
        origin_payment_method_details: Schema.Unknown,
        returned: Schema.NullOr(Schema.Boolean),
        statement_descriptor: Schema.String,
        status: Schema.Literals([
          "canceled",
          "failed",
          "processing",
          "succeeded",
        ]),
        status_transitions: Schema.Struct({
          canceled_at: Schema.optional(Schema.NullOr(Schema.Number)),
          failed_at: Schema.NullOr(Schema.Number),
          succeeded_at: Schema.NullOr(Schema.Number),
        }),
        transaction: Schema.Unknown,
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetTreasuryInboundTransfersOutput =
  typeof GetTreasuryInboundTransfersOutput.Type;

// The operation
/**
 * List all InboundTransfers
 *
 * <p>Returns a list of InboundTransfers sent from the specified FinancialAccount.</p>
 *
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param financial_account - Returns objects associated with this FinancialAccount.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 * @param status - Only return InboundTransfers that have the given status: `processing`, `succeeded`, `failed` or `canceled`.
 */
export const GetTreasuryInboundTransfers = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetTreasuryInboundTransfersInput,
    outputSchema: GetTreasuryInboundTransfersOutput,
  }),
);
