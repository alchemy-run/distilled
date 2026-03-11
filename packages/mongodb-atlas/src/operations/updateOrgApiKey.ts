import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdateOrgApiKeyInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  orgId: Schema.String.pipe(T.PathParam()),
  apiUserId: Schema.String.pipe(T.PathParam()),
  envelope: Schema.optional(Schema.Boolean),
  pretty: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/api/atlas/v2/orgs/{orgId}/apiKeys/{apiUserId}",
  }),
);
export type UpdateOrgApiKeyInput = typeof UpdateOrgApiKeyInput.Type;

// Output Schema
export const UpdateOrgApiKeyOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type UpdateOrgApiKeyOutput = typeof UpdateOrgApiKeyOutput.Type;

// The operation
/**
 * Update One Organization API Key
 *
 * Updates one organization API key in the specified organization. The organization API keys  grant programmatic access to an organization. To use this resource, the requesting  API Key must have the Organization Owner role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param orgId - Unique 24-hexadecimal digit string that identifies the organization that contains your projects. Use the [`/orgs`](#tag/Organizations/operation/listOrganizations) endpoint to retrieve all organizations to which the authenticated user has access.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param apiUserId - Unique 24-hexadecimal digit string that identifies this organization API key you  want to update.
 */
export const updateOrgApiKey = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdateOrgApiKeyInput,
  outputSchema: UpdateOrgApiKeyOutput,
}));
