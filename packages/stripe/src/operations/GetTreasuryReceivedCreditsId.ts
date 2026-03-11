import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetTreasuryReceivedCreditsIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/treasury/received_credits/{id}",
      contentType: "form-urlencoded",
    }),
  );
export type GetTreasuryReceivedCreditsIdInput =
  typeof GetTreasuryReceivedCreditsIdInput.Type;

// Output Schema
export const GetTreasuryReceivedCreditsIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  });
export type GetTreasuryReceivedCreditsIdOutput =
  typeof GetTreasuryReceivedCreditsIdOutput.Type;

// The operation
/**
 * Retrieve a ReceivedCredit
 *
 * <p>Retrieves the details of an existing ReceivedCredit by passing the unique ReceivedCredit ID from the ReceivedCredit list.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetTreasuryReceivedCreditsId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetTreasuryReceivedCreditsIdInput,
    outputSchema: GetTreasuryReceivedCreditsIdOutput,
  }));
