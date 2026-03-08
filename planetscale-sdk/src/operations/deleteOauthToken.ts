import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const DeleteOauthTokenInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  application_id: Schema.String.pipe(T.PathParam()),
  token_id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/organizations/{organization}/oauth-applications/{application_id}/tokens/{token_id}",
  }),
);
export type DeleteOauthTokenInput = typeof DeleteOauthTokenInput.Type;

// Output Schema
export const DeleteOauthTokenOutput = Schema.Void;
export type DeleteOauthTokenOutput = typeof DeleteOauthTokenOutput.Type;

// The operation
/**
 * Delete an OAuth token
 *
 * @param organization - The name of the organization the OAuth application belongs to
 * @param application_id - The ID of the OAuth application
 * @param token_id - The ID of the OAuth application token
 */
export const deleteOauthToken = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeleteOauthTokenInput,
  outputSchema: DeleteOauthTokenOutput,
  errors: [Forbidden, NotFound] as const,
}));
