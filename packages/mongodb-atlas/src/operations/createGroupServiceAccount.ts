import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateGroupServiceAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/api/atlas/v2/groups/{groupId}/serviceAccounts",
    }),
  );
export type CreateGroupServiceAccountInput =
  typeof CreateGroupServiceAccountInput.Type;

// Output Schema
export const CreateGroupServiceAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CreateGroupServiceAccountOutput =
  typeof CreateGroupServiceAccountOutput.Type;

// The operation
/**
 * Create One Project Service Account
 *
 * Creates one Service Account for the specified Project. The Service Account will automatically be added as an Organization Member to the Organization that the specified Project is a part of.
 *
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 */
export const createGroupServiceAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CreateGroupServiceAccountInput,
    outputSchema: CreateGroupServiceAccountOutput,
  }),
);
