import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostPaymentRecordsIdReportRefundInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    amount: Schema.optional(
      Schema.Struct({
        currency: Schema.String,
        value: Schema.Number,
      }),
    ),
    expand: Schema.optional(Schema.Array(Schema.String)),
    initiated_at: Schema.optional(Schema.Number),
    metadata: Schema.optional(Schema.Unknown),
    outcome: Schema.Literals(["refunded"]),
    processor_details: Schema.Struct({
      custom: Schema.optional(
        Schema.Struct({
          refund_reference: Schema.String,
        }),
      ),
      type: Schema.Literals(["custom"]),
    }),
    refunded: Schema.Struct({
      refunded_at: Schema.Number,
    }),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/payment_records/{id}/report_refund",
      contentType: "form-urlencoded",
    }),
  );
export type PostPaymentRecordsIdReportRefundInput =
  typeof PostPaymentRecordsIdReportRefundInput.Type;

// Output Schema
export const PostPaymentRecordsIdReportRefundOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    amount: Schema.Struct({
      currency: Schema.String,
      value: Schema.Number,
    }),
    amount_authorized: Schema.Struct({
      currency: Schema.String,
      value: Schema.Number,
    }),
    amount_canceled: Schema.Struct({
      currency: Schema.String,
      value: Schema.Number,
    }),
    amount_failed: Schema.Struct({
      currency: Schema.String,
      value: Schema.Number,
    }),
    amount_guaranteed: Schema.Struct({
      currency: Schema.String,
      value: Schema.Number,
    }),
    amount_refunded: Schema.Struct({
      currency: Schema.String,
      value: Schema.Number,
    }),
    amount_requested: Schema.Struct({
      currency: Schema.String,
      value: Schema.Number,
    }),
    application: Schema.NullOr(Schema.String),
    created: Schema.Number,
    customer_details: Schema.Unknown,
    customer_presence: Schema.NullOr(
      Schema.Literals(["off_session", "on_session"]),
    ),
    description: Schema.NullOr(Schema.String),
    id: Schema.String,
    latest_payment_attempt_record: Schema.NullOr(Schema.String),
    livemode: Schema.Boolean,
    metadata: Schema.Record(Schema.String, Schema.String),
    object: Schema.Literals(["payment_record"]),
    payment_method_details: Schema.Unknown,
    processor_details: Schema.Struct({
      custom: Schema.optional(
        Schema.Struct({
          payment_reference: Schema.NullOr(Schema.String),
        }),
      ),
      type: Schema.Literals(["custom"]),
    }),
    reported_by: Schema.Literals(["self", "stripe"]),
    shipping_details: Schema.Unknown,
  });
export type PostPaymentRecordsIdReportRefundOutput =
  typeof PostPaymentRecordsIdReportRefundOutput.Type;

// The operation
/**
 * Report a refund
 *
 * <p>Report that the most recent payment attempt on the specified Payment Record
 * was refunded.</p>
 *
 * @param id - The ID of the Payment Record.
 */
export const PostPaymentRecordsIdReportRefund =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostPaymentRecordsIdReportRefundInput,
    outputSchema: PostPaymentRecordsIdReportRefundOutput,
  }));
