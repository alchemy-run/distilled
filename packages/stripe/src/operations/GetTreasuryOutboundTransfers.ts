import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetTreasuryOutboundTransfersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    financial_account: Schema.String,
    limit: Schema.optional(Schema.Number),
    starting_after: Schema.optional(Schema.String),
    status: Schema.optional(
      Schema.Literals([
        "canceled",
        "failed",
        "posted",
        "processing",
        "returned",
      ]),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/treasury/outbound_transfers",
      contentType: "form-urlencoded",
    }),
  );
export type GetTreasuryOutboundTransfersInput =
  typeof GetTreasuryOutboundTransfersInput.Type;

// Output Schema
export const GetTreasuryOutboundTransfersOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        amount: Schema.Number,
        cancelable: Schema.Boolean,
        created: Schema.Number,
        currency: Schema.String,
        description: Schema.NullOr(Schema.String),
        destination_payment_method: Schema.NullOr(Schema.String),
        destination_payment_method_details: Schema.Struct({
          billing_details: Schema.Struct({
            address: Schema.Struct({
              city: Schema.NullOr(Schema.String),
              country: Schema.NullOr(Schema.String),
              line1: Schema.NullOr(Schema.String),
              line2: Schema.NullOr(Schema.String),
              postal_code: Schema.NullOr(Schema.String),
              state: Schema.NullOr(Schema.String),
            }),
            email: Schema.NullOr(Schema.String),
            name: Schema.NullOr(Schema.String),
          }),
          financial_account: Schema.optional(
            Schema.Struct({
              id: Schema.String,
              network: Schema.Literals(["stripe"]),
            }),
          ),
          type: Schema.Literals(["financial_account", "us_bank_account"]),
          us_bank_account: Schema.optional(
            Schema.Struct({
              account_holder_type: Schema.NullOr(
                Schema.Literals(["company", "individual"]),
              ),
              account_type: Schema.NullOr(
                Schema.Literals(["checking", "savings"]),
              ),
              bank_name: Schema.NullOr(Schema.String),
              fingerprint: Schema.NullOr(Schema.String),
              last4: Schema.NullOr(Schema.String),
              mandate: Schema.optional(Schema.Unknown),
              network: Schema.Literals(["ach", "us_domestic_wire"]),
              routing_number: Schema.NullOr(Schema.String),
            }),
          ),
        }),
        expected_arrival_date: Schema.Number,
        financial_account: Schema.String,
        hosted_regulatory_receipt_url: Schema.NullOr(Schema.String),
        id: Schema.String,
        livemode: Schema.Boolean,
        metadata: Schema.Record(Schema.String, Schema.String),
        object: Schema.Literals(["treasury.outbound_transfer"]),
        returned_details: Schema.Unknown,
        statement_descriptor: Schema.String,
        status: Schema.Literals([
          "canceled",
          "failed",
          "posted",
          "processing",
          "returned",
        ]),
        status_transitions: Schema.Struct({
          canceled_at: Schema.NullOr(Schema.Number),
          failed_at: Schema.NullOr(Schema.Number),
          posted_at: Schema.NullOr(Schema.Number),
          returned_at: Schema.NullOr(Schema.Number),
        }),
        tracking_details: Schema.Unknown,
        transaction: Schema.Unknown,
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetTreasuryOutboundTransfersOutput =
  typeof GetTreasuryOutboundTransfersOutput.Type;

// The operation
/**
 * List all OutboundTransfers
 *
 * <p>Returns a list of OutboundTransfers sent from the specified FinancialAccount.</p>
 *
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param financial_account - Returns objects associated with this FinancialAccount.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 * @param status - Only return OutboundTransfers that have the given status: `processing`, `canceled`, `failed`, `posted`, or `returned`.
 */
export const GetTreasuryOutboundTransfers =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetTreasuryOutboundTransfersInput,
    outputSchema: GetTreasuryOutboundTransfersOutput,
  }));
