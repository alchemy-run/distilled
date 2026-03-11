import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteGroupServiceAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    clientId: Schema.String.pipe(T.PathParam()),
    groupId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/api/atlas/v2/groups/{groupId}/serviceAccounts/{clientId}",
    }),
  );
export type DeleteGroupServiceAccountInput =
  typeof DeleteGroupServiceAccountInput.Type;

// Output Schema
export const DeleteGroupServiceAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeleteGroupServiceAccountOutput =
  typeof DeleteGroupServiceAccountOutput.Type;

// The operation
/**
 * Remove One Project Service Account
 *
 * Removes the specified Service Account from the specified project. The Service Account will still be a part of the Organization it was created in, and the credentials will remain active until expired or manually revoked.
 *
 * @param clientId - The Client ID of the Service Account.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 */
export const deleteGroupServiceAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeleteGroupServiceAccountInput,
    outputSchema: DeleteGroupServiceAccountOutput,
  }),
);
