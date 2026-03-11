import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdateGroupDataFederationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    tenantName: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
    skipRoleValidation: Schema.Boolean,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/api/atlas/v2/groups/{groupId}/dataFederation/{tenantName}",
    }),
  );
export type UpdateGroupDataFederationInput =
  typeof UpdateGroupDataFederationInput.Type;

// Output Schema
export const UpdateGroupDataFederationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type UpdateGroupDataFederationOutput =
  typeof UpdateGroupDataFederationOutput.Type;

// The operation
/**
 * Update One Federated Database Instance in One Project
 *
 * Updates the details of one federated database instance in the specified project. To use this resource, the requesting Service Account or API Key must have the Project Owner or higher role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param tenantName - Human-readable label that identifies the federated database instance to update.
 * @param skipRoleValidation - Flag that indicates whether this request should check if the requesting IAM role can read from the S3 bucket. AWS checks if the role can list the objects in the bucket before writing to it. Some IAM roles only need write permissions. This flag allows you to skip that check.
 */
export const updateGroupDataFederation = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: UpdateGroupDataFederationInput,
    outputSchema: UpdateGroupDataFederationOutput,
  }),
);
