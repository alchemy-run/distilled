import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTopupsTopupInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  topup: Schema.String.pipe(T.PathParam()),
  description: Schema.optional(Schema.String),
  expand: Schema.optional(Schema.Array(Schema.String)),
  metadata: Schema.optional(Schema.Unknown),
}).pipe(
  T.Http({
    method: "POST",
    path: "/v1/topups/{topup}",
    contentType: "form-urlencoded",
  }),
);
export type PostTopupsTopupInput = typeof PostTopupsTopupInput.Type;

// Output Schema
export const PostTopupsTopupOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type PostTopupsTopupOutput = typeof PostTopupsTopupOutput.Type;

// The operation
/**
 * Update a top-up
 *
 * <p>Updates the metadata of a top-up. Other top-up details are not editable by design.</p>
 */
export const PostTopupsTopup = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PostTopupsTopupInput,
  outputSchema: PostTopupsTopupOutput,
}));
