import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostPaymentRecordsReportPaymentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    amount_requested: Schema.Struct({
      currency: Schema.String,
      value: Schema.Number,
    }),
    customer_details: Schema.optional(
      Schema.Struct({
        customer: Schema.optional(Schema.String),
        email: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        phone: Schema.optional(Schema.String),
      }),
    ),
    customer_presence: Schema.optional(
      Schema.Literals(["off_session", "on_session"]),
    ),
    description: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.Array(Schema.String)),
    failed: Schema.optional(
      Schema.Struct({
        failed_at: Schema.Number,
      }),
    ),
    guaranteed: Schema.optional(
      Schema.Struct({
        guaranteed_at: Schema.Number,
      }),
    ),
    initiated_at: Schema.Number,
    metadata: Schema.optional(Schema.Unknown),
    outcome: Schema.optional(Schema.Literals(["failed", "guaranteed"])),
    payment_method_details: Schema.Struct({
      billing_details: Schema.optional(
        Schema.Struct({
          address: Schema.optional(
            Schema.Struct({
              city: Schema.optional(Schema.String),
              country: Schema.optional(Schema.String),
              line1: Schema.optional(Schema.String),
              line2: Schema.optional(Schema.String),
              postal_code: Schema.optional(Schema.String),
              state: Schema.optional(Schema.String),
            }),
          ),
          email: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          phone: Schema.optional(Schema.String),
        }),
      ),
      custom: Schema.optional(
        Schema.Struct({
          display_name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
      payment_method: Schema.optional(Schema.String),
      type: Schema.optional(Schema.Literals(["custom"])),
    }),
    processor_details: Schema.optional(
      Schema.Struct({
        custom: Schema.optional(
          Schema.Struct({
            payment_reference: Schema.String,
          }),
        ),
        type: Schema.Literals(["custom"]),
      }),
    ),
    shipping_details: Schema.optional(
      Schema.Struct({
        address: Schema.optional(
          Schema.Struct({
            city: Schema.optional(Schema.String),
            country: Schema.optional(Schema.String),
            line1: Schema.optional(Schema.String),
            line2: Schema.optional(Schema.String),
            postal_code: Schema.optional(Schema.String),
            state: Schema.optional(Schema.String),
          }),
        ),
        name: Schema.optional(Schema.String),
        phone: Schema.optional(Schema.String),
      }),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/payment_records/report_payment",
      contentType: "form-urlencoded",
    }),
  );
export type PostPaymentRecordsReportPaymentInput =
  typeof PostPaymentRecordsReportPaymentInput.Type;

// Output Schema
export const PostPaymentRecordsReportPaymentOutput =
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
export type PostPaymentRecordsReportPaymentOutput =
  typeof PostPaymentRecordsReportPaymentOutput.Type;

// The operation
/**
 * Report a payment
 *
 * <p>Report a new Payment Record. You may report a Payment Record as it is
 * initialized and later report updates through the other report_* methods, or report Payment
 * Records in a terminal state directly, through this method.</p>
 */
export const PostPaymentRecordsReportPayment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostPaymentRecordsReportPaymentInput,
    outputSchema: PostPaymentRecordsReportPaymentOutput,
  }));
