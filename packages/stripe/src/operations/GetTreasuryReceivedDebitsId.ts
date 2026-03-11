import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetTreasuryReceivedDebitsIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/treasury/received_debits/{id}",
      contentType: "form-urlencoded",
    }),
  );
export type GetTreasuryReceivedDebitsIdInput =
  typeof GetTreasuryReceivedDebitsIdInput.Type;

// Output Schema
export const GetTreasuryReceivedDebitsIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    amount: Schema.Number,
    created: Schema.Number,
    currency: Schema.String,
    description: Schema.String,
    failure_code: Schema.NullOr(
      Schema.Literals([
        "account_closed",
        "account_frozen",
        "insufficient_funds",
        "international_transaction",
        "other",
      ]),
    ),
    financial_account: Schema.NullOr(Schema.String),
    hosted_regulatory_receipt_url: Schema.NullOr(Schema.String),
    id: Schema.String,
    initiating_payment_method_details: Schema.optional(
      Schema.Struct({
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
    ),
    linked_flows: Schema.Struct({
      debit_reversal: Schema.NullOr(Schema.String),
      inbound_transfer: Schema.NullOr(Schema.String),
      issuing_authorization: Schema.NullOr(Schema.String),
      issuing_transaction: Schema.NullOr(Schema.String),
      payout: Schema.NullOr(Schema.String),
      topup: Schema.NullOr(Schema.String),
    }),
    livemode: Schema.Boolean,
    network: Schema.Literals(["ach", "card", "stripe"]),
    object: Schema.Literals(["treasury.received_debit"]),
    reversal_details: Schema.Unknown,
    status: Schema.Literals(["failed", "succeeded"]),
    transaction: Schema.Unknown,
  });
export type GetTreasuryReceivedDebitsIdOutput =
  typeof GetTreasuryReceivedDebitsIdOutput.Type;

// The operation
/**
 * Retrieve a ReceivedDebit
 *
 * <p>Retrieves the details of an existing ReceivedDebit by passing the unique ReceivedDebit ID from the ReceivedDebit list</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetTreasuryReceivedDebitsId = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetTreasuryReceivedDebitsIdInput,
    outputSchema: GetTreasuryReceivedDebitsIdOutput,
  }),
);
