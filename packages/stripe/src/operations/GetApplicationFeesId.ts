import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetApplicationFeesIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/application_fees/{id}",
      contentType: "form-urlencoded",
    }),
  );
export type GetApplicationFeesIdInput = typeof GetApplicationFeesIdInput.Type;

// Output Schema
export const GetApplicationFeesIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    account: Schema.Unknown,
    amount: Schema.Number,
    amount_refunded: Schema.Number,
    application: Schema.Unknown,
    balance_transaction: Schema.Unknown,
    charge: Schema.Unknown,
    created: Schema.Number,
    currency: Schema.String,
    fee_source: Schema.Unknown,
    id: Schema.String,
    livemode: Schema.Boolean,
    object: Schema.Literals(["application_fee"]),
    originating_transaction: Schema.Unknown,
    refunded: Schema.Boolean,
    refunds: Schema.Struct({
      data: Schema.Array(
        Schema.Struct({
          amount: Schema.Number,
          balance_transaction: Schema.Unknown,
          created: Schema.Number,
          currency: Schema.String,
          fee: Schema.Unknown,
          id: Schema.String,
          metadata: Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
          object: Schema.Literals(["fee_refund"]),
        }),
      ),
      has_more: Schema.Boolean,
      object: Schema.Literals(["list"]),
      url: Schema.String,
    }),
  });
export type GetApplicationFeesIdOutput = typeof GetApplicationFeesIdOutput.Type;

// The operation
/**
 * Retrieve an application fee
 *
 * <p>Retrieves the details of an application fee that your account has collected. The same information is returned when refunding the application fee.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetApplicationFeesId = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetApplicationFeesIdInput,
    outputSchema: GetApplicationFeesIdOutput,
  }),
);
