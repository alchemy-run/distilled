import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTopupsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  amount: Schema.Number,
  currency: Schema.String,
  description: Schema.optional(Schema.String),
  expand: Schema.optional(Schema.Array(Schema.String)),
  metadata: Schema.optional(Schema.Unknown),
  source: Schema.optional(Schema.String),
  statement_descriptor: Schema.optional(Schema.String),
  transfer_group: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "POST",
    path: "/v1/topups",
    contentType: "form-urlencoded",
  }),
);
export type PostTopupsInput = typeof PostTopupsInput.Type;

// Output Schema
export const PostTopupsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type PostTopupsOutput = typeof PostTopupsOutput.Type;

// The operation
/**
 * Create a top-up
 *
 * <p>Top up the balance of an account</p>
 */
export const PostTopups = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PostTopupsInput,
  outputSchema: PostTopupsOutput,
}));
