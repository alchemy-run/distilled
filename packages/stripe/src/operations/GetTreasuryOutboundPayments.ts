import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetTreasuryOutboundPaymentsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    created: Schema.optional(Schema.String),
    customer: Schema.optional(Schema.String),
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
      path: "/v1/treasury/outbound_payments",
      contentType: "form-urlencoded",
    }),
  );
export type GetTreasuryOutboundPaymentsInput =
  typeof GetTreasuryOutboundPaymentsInput.Type;

// Output Schema
export const GetTreasuryOutboundPaymentsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        amount: Schema.Number,
        cancelable: Schema.Boolean,
        created: Schema.Number,
        currency: Schema.String,
        customer: Schema.NullOr(Schema.String),
        description: Schema.NullOr(Schema.String),
        destination_payment_method: Schema.NullOr(Schema.String),
        destination_payment_method_details: Schema.Unknown,
        end_user_details: Schema.Unknown,
        expected_arrival_date: Schema.Number,
        financial_account: Schema.String,
        hosted_regulatory_receipt_url: Schema.NullOr(Schema.String),
        id: Schema.String,
        livemode: Schema.Boolean,
        metadata: Schema.Record(Schema.String, Schema.String),
        object: Schema.Literals(["treasury.outbound_payment"]),
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
export type GetTreasuryOutboundPaymentsOutput =
  typeof GetTreasuryOutboundPaymentsOutput.Type;

// The operation
/**
 * List all OutboundPayments
 *
 * <p>Returns a list of OutboundPayments sent from the specified FinancialAccount.</p>
 *
 * @param created - Only return OutboundPayments that were created during the given date interval.
 * @param customer - Only return OutboundPayments sent to this customer.
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param financial_account - Returns objects associated with this FinancialAccount.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 * @param status - Only return OutboundPayments that have the given status: `processing`, `failed`, `posted`, `returned`, or `canceled`.
 */
export const GetTreasuryOutboundPayments = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetTreasuryOutboundPaymentsInput,
    outputSchema: GetTreasuryOutboundPaymentsOutput,
  }),
);
