import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdateGroupServiceAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    clientId: Schema.String.pipe(T.PathParam()),
    groupId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/api/atlas/v2/groups/{groupId}/serviceAccounts/{clientId}",
    }),
  );
export type UpdateGroupServiceAccountInput =
  typeof UpdateGroupServiceAccountInput.Type;

// Output Schema
export const UpdateGroupServiceAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type UpdateGroupServiceAccountOutput =
  typeof UpdateGroupServiceAccountOutput.Type;

// The operation
/**
 * Update One Project Service Account
 *
 * Updates one Service Account in the specified Project.
 *
 * @param clientId - The Client ID of the Service Account.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 */
export const updateGroupServiceAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: UpdateGroupServiceAccountInput,
    outputSchema: UpdateGroupServiceAccountOutput,
  }),
);
