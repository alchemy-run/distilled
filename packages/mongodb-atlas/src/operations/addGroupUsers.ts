import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const AddGroupUsersInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  groupId: Schema.String.pipe(T.PathParam()),
  envelope: Schema.optional(Schema.Boolean),
  pretty: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({ method: "POST", path: "/api/atlas/v2/groups/{groupId}/users" }),
);
export type AddGroupUsersInput = typeof AddGroupUsersInput.Type;

// Output Schema
export const AddGroupUsersOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AddGroupUsersOutput = typeof AddGroupUsersOutput.Type;

// The operation
/**
 * Add One MongoDB Cloud User to One Project
 *
 * Adds one MongoDB Cloud user to one project. To use this resource, the requesting Service Account or API Key must have the Project Owner role or Project Access Manager role.
 * - If the user has a pending invitation to join the project's organization, MongoDB Cloud modifies it and grants project access.
 * - If the user doesn't have an invitation to join the organization, MongoDB Cloud sends a new invitation that grants the user organization and project access.
 * - If the user is already active in the project's organization, MongoDB Cloud grants access to the project.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 */
export const addGroupUsers = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AddGroupUsersInput,
  outputSchema: AddGroupUsersOutput,
}));
