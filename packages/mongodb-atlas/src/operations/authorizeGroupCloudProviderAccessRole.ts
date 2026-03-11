import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const AuthorizeGroupCloudProviderAccessRoleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    roleId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/api/atlas/v2/groups/{groupId}/cloudProviderAccess/{roleId}",
    }),
  );
export type AuthorizeGroupCloudProviderAccessRoleInput =
  typeof AuthorizeGroupCloudProviderAccessRoleInput.Type;

// Output Schema
export const AuthorizeGroupCloudProviderAccessRoleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AuthorizeGroupCloudProviderAccessRoleOutput =
  typeof AuthorizeGroupCloudProviderAccessRoleOutput.Type;

// The operation
/**
 * Authorize One Cloud Provider Access Role
 *
 * Grants access to the specified project for the specified access role. To use this resource, the requesting Service Account or API Key must have the Project Owner role. This API endpoint is one step in a procedure to create unified access for MongoDB Cloud services. This is not required for GCP service account access.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param roleId - Unique 24-hexadecimal digit string that identifies the role.
 */
export const authorizeGroupCloudProviderAccessRole =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AuthorizeGroupCloudProviderAccessRoleInput,
    outputSchema: AuthorizeGroupCloudProviderAccessRoleOutput,
  }));
