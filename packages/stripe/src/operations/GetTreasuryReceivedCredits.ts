import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetTreasuryReceivedCreditsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    financial_account: Schema.String,
    limit: Schema.optional(Schema.Number),
    linked_flows: Schema.optional(Schema.String),
    starting_after: Schema.optional(Schema.String),
    status: Schema.optional(Schema.Literals(["failed", "succeeded"])),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/treasury/received_credits",
      contentType: "form-urlencoded",
    }),
  );
export type GetTreasuryReceivedCreditsInput =
  typeof GetTreasuryReceivedCreditsInput.Type;

// Output Schema
export const GetTreasuryReceivedCreditsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        amount: Schema.Number,
        created: Schema.Number,
        currency: Schema.String,
        description: Schema.String,
        failure_code: Schema.NullOr(
          Schema.Literals([
            "account_closed",
            "account_frozen",
            "international_transaction",
            "other",
          ]),
        ),
        financial_account: Schema.NullOr(Schema.String),
        hosted_regulatory_receipt_url: Schema.NullOr(Schema.String),
        id: Schema.String,
        initiating_payment_method_details: Schema.Struct({
          balance: Schema.optional(Schema.Literals(["payments"])),
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
          issuing_card: Schema.optional(Schema.String),
          type: Schema.Literals([
            "balance",
            "financial_account",
            "issuing_card",
            "stripe",
            "us_bank_account",
          ]),
          us_bank_account: Schema.optional(
            Schema.Struct({
              bank_name: Schema.NullOr(Schema.String),
              last4: Schema.NullOr(Schema.String),
              routing_number: Schema.NullOr(Schema.String),
            }),
          ),
        }),
        linked_flows: Schema.Struct({
          credit_reversal: Schema.NullOr(Schema.String),
          issuing_authorization: Schema.NullOr(Schema.String),
          issuing_transaction: Schema.NullOr(Schema.String),
          source_flow: Schema.NullOr(Schema.String),
          source_flow_details: Schema.optional(Schema.Unknown),
          source_flow_type: Schema.NullOr(Schema.String),
        }),
        livemode: Schema.Boolean,
        network: Schema.Literals(["ach", "card", "stripe", "us_domestic_wire"]),
        object: Schema.Literals(["treasury.received_credit"]),
        reversal_details: Schema.Unknown,
        status: Schema.Literals(["failed", "succeeded"]),
        transaction: Schema.Unknown,
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetTreasuryReceivedCreditsOutput =
  typeof GetTreasuryReceivedCreditsOutput.Type;

// The operation
/**
 * List all ReceivedCredits
 *
 * <p>Returns a list of ReceivedCredits.</p>
 *
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param financial_account - The FinancialAccount that received the funds.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param linked_flows - Only return ReceivedCredits described by the flow.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 * @param status - Only return ReceivedCredits that have the given status: `succeeded` or `failed`.
 */
export const GetTreasuryReceivedCredits = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetTreasuryReceivedCreditsInput,
    outputSchema: GetTreasuryReceivedCreditsOutput,
  }),
);
