import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteGroupServiceAccountAccessListEntryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    clientId: Schema.String.pipe(T.PathParam()),
    ipAddress: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/api/atlas/v2/groups/{groupId}/serviceAccounts/{clientId}/accessList/{ipAddress}",
    }),
  );
export type DeleteGroupServiceAccountAccessListEntryInput =
  typeof DeleteGroupServiceAccountAccessListEntryInput.Type;

// Output Schema
export const DeleteGroupServiceAccountAccessListEntryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeleteGroupServiceAccountAccessListEntryOutput =
  typeof DeleteGroupServiceAccountAccessListEntryOutput.Type;

// The operation
/**
 * Remove One Access List Entry from One Project Service Account
 *
 * Removes the specified access list entry from the specified Service Account for the project. You can't remove the requesting IP address from the access list. To use this resource, the requesting Service Account or API Key must have the Project Owner role or Project Access Manager role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param clientId - The Client ID of the Service Account.
 * @param ipAddress - One IP address or multiple IP addresses represented as one CIDR block. When specifying a CIDR block with a subnet mask, such as 192.0.2.0/24, use the URL-encoded value %2F for the forward slash /.
 */
export const deleteGroupServiceAccountAccessListEntry =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteGroupServiceAccountAccessListEntryInput,
    outputSchema: DeleteGroupServiceAccountAccessListEntryOutput,
  }));
