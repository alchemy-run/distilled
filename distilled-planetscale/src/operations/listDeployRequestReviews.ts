import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const ListDeployRequestReviewsInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  number: Schema.Number.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/organizations/{organization}/databases/{database}/deploy-requests/{number}/reviews",
  }),
);
export type ListDeployRequestReviewsInput =
  typeof ListDeployRequestReviewsInput.Type;

// Output Schema
export const ListDeployRequestReviewsOutput = Schema.Struct({
  current_page: Schema.Number,
  next_page: Schema.NullOr(Schema.Number),
  next_page_url: Schema.NullOr(Schema.String),
  prev_page: Schema.NullOr(Schema.Number),
  prev_page_url: Schema.NullOr(Schema.String),
  data: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      body: Schema.String,
      html_body: Schema.String,
      state: Schema.Literal("commented", "approved"),
      created_at: Schema.String,
      updated_at: Schema.String,
      actor: Schema.Struct({
        id: Schema.String,
        display_name: Schema.String,
        avatar_url: Schema.String,
      }),
    }),
  ),
});
export type ListDeployRequestReviewsOutput =
  typeof ListDeployRequestReviewsOutput.Type;

// The operation
/**
 * List deploy request reviews
 *
 * @param organization - The name of the organization the deploy request belongs to
 * @param database - The name of the database the deploy request belongs to
 * @param number - The number of the deploy request
 */
export const listDeployRequestReviews = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListDeployRequestReviewsInput,
    outputSchema: ListDeployRequestReviewsOutput,
    errors: [Forbidden, NotFound] as const,
  }),
);
