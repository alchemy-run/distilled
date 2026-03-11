import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetTopupsTopupInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  topup: Schema.String.pipe(T.PathParam()),
  expand: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/topups/{topup}",
    contentType: "form-urlencoded",
  }),
);
export type GetTopupsTopupInput = typeof GetTopupsTopupInput.Type;

// Output Schema
export const GetTopupsTopupOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type GetTopupsTopupOutput = typeof GetTopupsTopupOutput.Type;

// The operation
/**
 * Retrieve a top-up
 *
 * <p>Retrieves the details of a top-up that has previously been created. Supply the unique top-up ID that was returned from your previous request, and Stripe will return the corresponding top-up information.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetTopupsTopup = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetTopupsTopupInput,
  outputSchema: GetTopupsTopupOutput,
}));
