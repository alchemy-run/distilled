import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTestHelpersIssuingTransactionsTransactionRefundInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    transaction: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
    refund_amount: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/test_helpers/issuing/transactions/{transaction}/refund",
      contentType: "form-urlencoded",
    }),
  );
export type PostTestHelpersIssuingTransactionsTransactionRefundInput =
  typeof PostTestHelpersIssuingTransactionsTransactionRefundInput.Type;

// Output Schema
export const PostTestHelpersIssuingTransactionsTransactionRefundOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    amount: Schema.Number,
    amount_details: Schema.Unknown,
    authorization: Schema.Unknown,
    balance_transaction: Schema.Unknown,
    card: Schema.Unknown,
    cardholder: Schema.Unknown,
    created: Schema.Number,
    currency: Schema.String,
    dispute: Schema.Unknown,
    id: Schema.String,
    livemode: Schema.Boolean,
    merchant_amount: Schema.Number,
    merchant_currency: Schema.String,
    merchant_data: Schema.Struct({
      category: Schema.String,
      category_code: Schema.String,
      city: Schema.NullOr(Schema.String),
      country: Schema.NullOr(Schema.String),
      name: Schema.NullOr(Schema.String),
      network_id: Schema.String,
      postal_code: Schema.NullOr(Schema.String),
      state: Schema.NullOr(Schema.String),
      tax_id: Schema.NullOr(Schema.String),
      terminal_id: Schema.NullOr(Schema.String),
      url: Schema.NullOr(Schema.String),
    }),
    metadata: Schema.Record(Schema.String, Schema.String),
    network_data: Schema.Unknown,
    object: Schema.Literals(["issuing.transaction"]),
    purchase_details: Schema.optional(Schema.Unknown),
    token: Schema.optional(Schema.Unknown),
    treasury: Schema.optional(Schema.Unknown),
    type: Schema.Literals(["capture", "refund"]),
    wallet: Schema.NullOr(
      Schema.Literals(["apple_pay", "google_pay", "samsung_pay"]),
    ),
  });
export type PostTestHelpersIssuingTransactionsTransactionRefundOutput =
  typeof PostTestHelpersIssuingTransactionsTransactionRefundOutput.Type;

// The operation
/**
 * Refund a test-mode transaction
 *
 * <p>Refund a test-mode Transaction.</p>
 */
export const PostTestHelpersIssuingTransactionsTransactionRefund =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostTestHelpersIssuingTransactionsTransactionRefundInput,
    outputSchema: PostTestHelpersIssuingTransactionsTransactionRefundOutput,
  }));
