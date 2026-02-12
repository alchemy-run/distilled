import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const ListOauthApplicationsInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  page: Schema.optional(Schema.Number),
  per_page: Schema.optional(Schema.Number),
}).pipe(
  T.Http({
    method: "GET",
    path: "/organizations/{organization}/oauth-applications",
  }),
);
export type ListOauthApplicationsInput = typeof ListOauthApplicationsInput.Type;

// Output Schema
export const ListOauthApplicationsOutput = Schema.Struct({
  current_page: Schema.Number,
  next_page: Schema.NullOr(Schema.Number),
  next_page_url: Schema.NullOr(Schema.String),
  prev_page: Schema.NullOr(Schema.Number),
  prev_page_url: Schema.NullOr(Schema.String),
  data: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      name: Schema.String,
      redirect_uri: Schema.String,
      domain: Schema.String,
      created_at: Schema.String,
      updated_at: Schema.String,
      scopes: Schema.Array(Schema.String),
      avatar: Schema.String,
      client_id: Schema.String,
      tokens: Schema.Number,
    }),
  ),
});
export type ListOauthApplicationsOutput =
  typeof ListOauthApplicationsOutput.Type;

// The operation
/**
 * List OAuth applications
 *
 * @param organization - The name of the organization the OAuth applications belong to
 * @param page - If provided, specifies the page offset of returned results
 * @param per_page - If provided, specifies the number of returned results
 */
export const listOauthApplications = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListOauthApplicationsInput,
    outputSchema: ListOauthApplicationsOutput,
    errors: [Forbidden, NotFound] as const,
  }),
);
