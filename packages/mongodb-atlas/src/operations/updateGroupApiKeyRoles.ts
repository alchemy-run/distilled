import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdateGroupApiKeyRolesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    apiUserId: Schema.String.pipe(T.PathParam()),
    pageNum: Schema.optional(Schema.Number),
    itemsPerPage: Schema.optional(Schema.Number),
    includeCount: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
    envelope: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/api/atlas/v2/groups/{groupId}/apiKeys/{apiUserId}",
    }),
  );
export type UpdateGroupApiKeyRolesInput =
  typeof UpdateGroupApiKeyRolesInput.Type;

// Output Schema
export const UpdateGroupApiKeyRolesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type UpdateGroupApiKeyRolesOutput =
  typeof UpdateGroupApiKeyRolesOutput.Type;

// The operation
/**
 * Update Organization API Key Roles for One Project
 *
 * Updates the roles of the organization API key that you specify for the project that you specify. You must specify at least one valid role for the project. The application removes any roles that you do not include in this request if they were previously set in the organization API key that you specify for the project. To use this resource, the requesting Service Account or API Key must have the Project Owner role or Project Access Manager role.
 *
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pageNum - Number of the page that displays the current set of the total objects that the response returns.
 * @param itemsPerPage - Number of items that the response returns per page.
 * @param includeCount - Flag that indicates whether the response returns the total number of items (`totalCount`) in the response.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param apiUserId - Unique 24-hexadecimal digit string that identifies this organization API key that you want to unassign from one project.
 */
export const updateGroupApiKeyRoles = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: UpdateGroupApiKeyRolesInput,
    outputSchema: UpdateGroupApiKeyRolesOutput,
  }),
);
