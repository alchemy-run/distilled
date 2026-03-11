import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteOrgApiKeyInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  orgId: Schema.String.pipe(T.PathParam()),
  apiUserId: Schema.String.pipe(T.PathParam()),
  envelope: Schema.optional(Schema.Boolean),
  pretty: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/api/atlas/v2/orgs/{orgId}/apiKeys/{apiUserId}",
  }),
);
export type DeleteOrgApiKeyInput = typeof DeleteOrgApiKeyInput.Type;

// Output Schema
export const DeleteOrgApiKeyOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeleteOrgApiKeyOutput = typeof DeleteOrgApiKeyOutput.Type;

// The operation
/**
 * Remove One Organization API Key
 *
 * Removes one organization API key from the specified organization. When you remove an API key from an organization, MongoDB Cloud also removes that key from any projects that use that key. To use this resource, the requesting Service Account or API Key must have the Organization Owner role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param orgId - Unique 24-hexadecimal digit string that identifies the organization that contains your projects. Use the [`/orgs`](#tag/Organizations/operation/listOrganizations) endpoint to retrieve all organizations to which the authenticated user has access.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param apiUserId - Unique 24-hexadecimal digit string that identifies this organization API key.
 */
export const deleteOrgApiKey = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeleteOrgApiKeyInput,
  outputSchema: DeleteOrgApiKeyOutput,
}));
