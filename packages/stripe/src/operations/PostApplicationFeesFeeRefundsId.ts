import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostApplicationFeesFeeRefundsIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    fee: Schema.String.pipe(T.PathParam()),
    id: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
    metadata: Schema.optional(Schema.Unknown),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/application_fees/{fee}/refunds/{id}",
      contentType: "form-urlencoded",
    }),
  );
export type PostApplicationFeesFeeRefundsIdInput =
  typeof PostApplicationFeesFeeRefundsIdInput.Type;

// Output Schema
export const PostApplicationFeesFeeRefundsIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    amount: Schema.Number,
    balance_transaction: Schema.Unknown,
    created: Schema.Number,
    currency: Schema.String,
    fee: Schema.Unknown,
    id: Schema.String,
    metadata: Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
    object: Schema.Literals(["fee_refund"]),
  });
export type PostApplicationFeesFeeRefundsIdOutput =
  typeof PostApplicationFeesFeeRefundsIdOutput.Type;

// The operation
/**
 * Update an application fee refund
 *
 * <p>Updates the specified application fee refund by setting the values of the parameters passed. Any parameters not provided will be left unchanged.</p>
 * <p>This request only accepts metadata as an argument.</p>
 */
export const PostApplicationFeesFeeRefundsId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostApplicationFeesFeeRefundsIdInput,
    outputSchema: PostApplicationFeesFeeRefundsIdOutput,
  }));
