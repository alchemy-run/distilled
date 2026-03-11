import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetReviewsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  created: Schema.optional(Schema.String),
  ending_before: Schema.optional(Schema.String),
  expand: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.Number),
  starting_after: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/reviews",
    contentType: "form-urlencoded",
  }),
);
export type GetReviewsInput = typeof GetReviewsInput.Type;

// Output Schema
export const GetReviewsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  data: Schema.Array(
    Schema.Struct({
      billing_zip: Schema.NullOr(Schema.String),
      charge: Schema.Unknown,
      closed_reason: Schema.NullOr(
        Schema.Literals([
          "acknowledged",
          "approved",
          "canceled",
          "disputed",
          "payment_never_settled",
          "redacted",
          "refunded",
          "refunded_as_fraud",
        ]),
      ),
      created: Schema.Number,
      id: Schema.String,
      ip_address: Schema.NullOr(Schema.String),
      ip_address_location: Schema.Unknown,
      livemode: Schema.Boolean,
      object: Schema.Literals(["review"]),
      open: Schema.Boolean,
      opened_reason: Schema.Literals(["manual", "rule"]),
      payment_intent: Schema.optional(Schema.Unknown),
      reason: Schema.String,
      session: Schema.Unknown,
    }),
  ),
  has_more: Schema.Boolean,
  object: Schema.Literals(["list"]),
  url: Schema.String,
});
export type GetReviewsOutput = typeof GetReviewsOutput.Type;

// The operation
/**
 * List all open reviews
 *
 * <p>Returns a list of <code>Review</code> objects that have <code>open</code> set to <code>true</code>. The objects are sorted in descending order by creation date, with the most recently created object appearing first.</p>
 *
 * @param created - Only return reviews that were created during the given date interval.
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetReviews = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetReviewsInput,
  outputSchema: GetReviewsOutput,
}));
