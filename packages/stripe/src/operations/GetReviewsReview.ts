import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetReviewsReviewInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  review: Schema.String.pipe(T.PathParam()),
  expand: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/reviews/{review}",
    contentType: "form-urlencoded",
  }),
);
export type GetReviewsReviewInput = typeof GetReviewsReviewInput.Type;

// Output Schema
export const GetReviewsReviewOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
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
  },
);
export type GetReviewsReviewOutput = typeof GetReviewsReviewOutput.Type;

// The operation
/**
 * Retrieve a review
 *
 * <p>Retrieves a <code>Review</code> object.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetReviewsReview = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetReviewsReviewInput,
  outputSchema: GetReviewsReviewOutput,
}));
