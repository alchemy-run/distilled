import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetApplicationFeesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    charge: Schema.optional(Schema.String),
    created: Schema.optional(Schema.String),
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    starting_after: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/application_fees",
      contentType: "form-urlencoded",
    }),
  );
export type GetApplicationFeesInput = typeof GetApplicationFeesInput.Type;

// Output Schema
export const GetApplicationFeesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
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
              metadata: Schema.NullOr(
                Schema.Record(Schema.String, Schema.String),
              ),
              object: Schema.Literals(["fee_refund"]),
            }),
          ),
          has_more: Schema.Boolean,
          object: Schema.Literals(["list"]),
          url: Schema.String,
        }),
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetApplicationFeesOutput = typeof GetApplicationFeesOutput.Type;

// The operation
/**
 * List all application fees
 *
 * <p>Returns a list of application fees you’ve previously collected. The application fees are returned in sorted order, with the most recent fees appearing first.</p>
 *
 * @param charge - Only return application fees for the charge specified by this charge ID.
 * @param created - Only return applications fees that were created during the given date interval.
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetApplicationFees = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetApplicationFeesInput,
  outputSchema: GetApplicationFeesOutput,
}));
