import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetRadarEarlyFraudWarningsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    charge: Schema.optional(Schema.String),
    created: Schema.optional(Schema.String),
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    payment_intent: Schema.optional(Schema.String),
    starting_after: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/radar/early_fraud_warnings",
      contentType: "form-urlencoded",
    }),
  );
export type GetRadarEarlyFraudWarningsInput =
  typeof GetRadarEarlyFraudWarningsInput.Type;

// Output Schema
export const GetRadarEarlyFraudWarningsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        actionable: Schema.Boolean,
        charge: Schema.Unknown,
        created: Schema.Number,
        fraud_type: Schema.String,
        id: Schema.String,
        livemode: Schema.Boolean,
        object: Schema.Literals(["radar.early_fraud_warning"]),
        payment_intent: Schema.optional(Schema.Unknown),
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetRadarEarlyFraudWarningsOutput =
  typeof GetRadarEarlyFraudWarningsOutput.Type;

// The operation
/**
 * List all early fraud warnings
 *
 * <p>Returns a list of early fraud warnings.</p>
 *
 * @param charge - Only return early fraud warnings for the charge specified by this charge ID.
 * @param created - Only return early fraud warnings that were created during the given date interval.
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param payment_intent - Only return early fraud warnings for charges that were created by the PaymentIntent specified by this PaymentIntent ID.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetRadarEarlyFraudWarnings = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetRadarEarlyFraudWarningsInput,
    outputSchema: GetRadarEarlyFraudWarningsOutput,
  }),
);
