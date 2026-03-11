import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetApplicationFeesFeeRefundsIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    fee: Schema.String.pipe(T.PathParam()),
    id: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/application_fees/{fee}/refunds/{id}",
      contentType: "form-urlencoded",
    }),
  );
export type GetApplicationFeesFeeRefundsIdInput =
  typeof GetApplicationFeesFeeRefundsIdInput.Type;

// Output Schema
export const GetApplicationFeesFeeRefundsIdOutput =
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
export type GetApplicationFeesFeeRefundsIdOutput =
  typeof GetApplicationFeesFeeRefundsIdOutput.Type;

// The operation
/**
 * Retrieve an application fee refund
 *
 * <p>By default, you can see the 10 most recent refunds stored directly on the application fee object, but you can also retrieve details about a specific refund stored on the application fee.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetApplicationFeesFeeRefundsId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetApplicationFeesFeeRefundsIdInput,
    outputSchema: GetApplicationFeesFeeRefundsIdOutput,
  }));
