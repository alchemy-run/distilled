import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostReviewsReviewApproveInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    review: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/reviews/{review}/approve",
      contentType: "form-urlencoded",
    }),
  );
export type PostReviewsReviewApproveInput =
  typeof PostReviewsReviewApproveInput.Type;

// Output Schema
export const PostReviewsReviewApproveOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  });
export type PostReviewsReviewApproveOutput =
  typeof PostReviewsReviewApproveOutput.Type;

// The operation
/**
 * Approve a review
 *
 * <p>Approves a <code>Review</code> object, closing it and removing it from the list of reviews.</p>
 */
export const PostReviewsReviewApprove = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostReviewsReviewApproveInput,
    outputSchema: PostReviewsReviewApproveOutput,
  }),
);
