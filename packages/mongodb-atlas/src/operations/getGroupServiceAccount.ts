import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetGroupServiceAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    clientId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/serviceAccounts/{clientId}",
    }),
  );
export type GetGroupServiceAccountInput =
  typeof GetGroupServiceAccountInput.Type;

// Output Schema
export const GetGroupServiceAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetGroupServiceAccountOutput =
  typeof GetGroupServiceAccountOutput.Type;

// The operation
/**
 * Return One Project Service Account
 *
 * Returns one Service Account in the specified Project.
 *
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param clientId - The Client ID of the Service Account.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 */
export const getGroupServiceAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetGroupServiceAccountInput,
    outputSchema: GetGroupServiceAccountOutput,
  }),
);
