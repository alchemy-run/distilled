import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetPaymentAttemptRecordsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    payment_record: Schema.String,
    starting_after: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/payment_attempt_records",
      contentType: "form-urlencoded",
    }),
  );
export type GetPaymentAttemptRecordsInput =
  typeof GetPaymentAttemptRecordsInput.Type;

// Output Schema
export const GetPaymentAttemptRecordsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
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
        livemode: Schema.Boolean,
        metadata: Schema.Record(Schema.String, Schema.String),
        object: Schema.Literals(["payment_attempt_record"]),
        payment_method_details: Schema.Unknown,
        payment_record: Schema.NullOr(Schema.String),
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
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetPaymentAttemptRecordsOutput =
  typeof GetPaymentAttemptRecordsOutput.Type;

// The operation
/**
 * List Payment Attempt Records
 *
 * <p>List all the Payment Attempt Records attached to the specified Payment Record.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param payment_record - The ID of the Payment Record.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetPaymentAttemptRecords = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetPaymentAttemptRecordsInput,
    outputSchema: GetPaymentAttemptRecordsOutput,
  }),
);
