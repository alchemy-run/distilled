import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const ReviewDeployRequestInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  number: Schema.Number.pipe(T.PathParam()),
  state: Schema.optional(Schema.Literal("commented", "approved")),
  body: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "POST",
    path: "/organizations/{organization}/databases/{database}/deploy-requests/{number}/reviews",
  }),
);
export type ReviewDeployRequestInput = typeof ReviewDeployRequestInput.Type;

// Output Schema
export const ReviewDeployRequestOutput = Schema.Struct({
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
});
export type ReviewDeployRequestOutput = typeof ReviewDeployRequestOutput.Type;

// The operation
/**
 * Review a deploy request
 *
 * Review a deploy request by either approving or commenting on the deploy request
 *
 * @param organization - The name of the organization the deploy request belongs to
 * @param database - The name of the database the deploy request belongs to
 * @param number - The number of the deploy request
 * @param state - Whether the review is a comment or approval. Service tokens must have corresponding access (either `approve_deploy_request` or `review_deploy_request`)
 * @param body - Deploy request review comments
 */
export const reviewDeployRequest = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ReviewDeployRequestInput,
  outputSchema: ReviewDeployRequestOutput,
  errors: [Forbidden, NotFound] as const,
}));
