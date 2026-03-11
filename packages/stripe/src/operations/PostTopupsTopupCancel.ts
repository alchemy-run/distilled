import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTopupsTopupCancelInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    topup: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/topups/{topup}/cancel",
      contentType: "form-urlencoded",
    }),
  );
export type PostTopupsTopupCancelInput = typeof PostTopupsTopupCancelInput.Type;

// Output Schema
export const PostTopupsTopupCancelOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    amount: Schema.Number,
    balance_transaction: Schema.Unknown,
    created: Schema.Number,
    currency: Schema.String,
    description: Schema.NullOr(Schema.String),
    expected_availability_date: Schema.NullOr(Schema.Number),
    failure_code: Schema.NullOr(Schema.String),
    failure_message: Schema.NullOr(Schema.String),
    id: Schema.String,
    livemode: Schema.Boolean,
    metadata: Schema.Record(Schema.String, Schema.String),
    object: Schema.Literals(["topup"]),
    source: Schema.Unknown,
    statement_descriptor: Schema.NullOr(Schema.String),
    status: Schema.Literals([
      "canceled",
      "failed",
      "pending",
      "reversed",
      "succeeded",
    ]),
    transfer_group: Schema.NullOr(Schema.String),
  });
export type PostTopupsTopupCancelOutput =
  typeof PostTopupsTopupCancelOutput.Type;

// The operation
/**
 * Cancel a top-up
 *
 * <p>Cancels a top-up. Only pending top-ups can be canceled.</p>
 */
export const PostTopupsTopupCancel = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostTopupsTopupCancelInput,
    outputSchema: PostTopupsTopupCancelOutput,
  }),
);
