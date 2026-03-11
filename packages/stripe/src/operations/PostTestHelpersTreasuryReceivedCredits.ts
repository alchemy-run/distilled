import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTestHelpersTreasuryReceivedCreditsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    amount: Schema.Number,
    currency: Schema.String,
    description: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.Array(Schema.String)),
    financial_account: Schema.String,
    initiating_payment_method_details: Schema.optional(
      Schema.Struct({
        type: Schema.Literals(["us_bank_account"]),
        us_bank_account: Schema.optional(
          Schema.Struct({
            account_holder_name: Schema.optional(Schema.String),
            account_number: Schema.optional(Schema.String),
            routing_number: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
    network: Schema.Literals(["ach", "us_domestic_wire"]),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/test_helpers/treasury/received_credits",
      contentType: "form-urlencoded",
    }),
  );
export type PostTestHelpersTreasuryReceivedCreditsInput =
  typeof PostTestHelpersTreasuryReceivedCreditsInput.Type;

// Output Schema
export const PostTestHelpersTreasuryReceivedCreditsOutput =
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
export type PostTestHelpersTreasuryReceivedCreditsOutput =
  typeof PostTestHelpersTreasuryReceivedCreditsOutput.Type;

// The operation
/**
 * Test mode: Create a ReceivedCredit
 *
 * <p>Use this endpoint to simulate a test mode ReceivedCredit initiated by a third party. In live mode, you can’t directly create ReceivedCredits initiated by third parties.</p>
 */
export const PostTestHelpersTreasuryReceivedCredits =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostTestHelpersTreasuryReceivedCreditsInput,
    outputSchema: PostTestHelpersTreasuryReceivedCreditsOutput,
  }));
