import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteOrgServiceAccountAccessListEntryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    orgId: Schema.String.pipe(T.PathParam()),
    clientId: Schema.String.pipe(T.PathParam()),
    ipAddress: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/api/atlas/v2/orgs/{orgId}/serviceAccounts/{clientId}/accessList/{ipAddress}",
    }),
  );
export type DeleteOrgServiceAccountAccessListEntryInput =
  typeof DeleteOrgServiceAccountAccessListEntryInput.Type;

// Output Schema
export const DeleteOrgServiceAccountAccessListEntryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeleteOrgServiceAccountAccessListEntryOutput =
  typeof DeleteOrgServiceAccountAccessListEntryOutput.Type;

// The operation
/**
 * Remove One Access List Entry from One Organization Service Account
 *
 * Removes the specified access list entry from the specified Service Account for the organization. You can't remove the requesting IP address from the access list.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param orgId - Unique 24-hexadecimal digit string that identifies the organization that contains your projects. Use the [`/orgs`](#tag/Organizations/operation/listOrganizations) endpoint to retrieve all organizations to which the authenticated user has access.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param clientId - The Client ID of the Service Account.
 * @param ipAddress - One IP address or multiple IP addresses represented as one CIDR block. When specifying a CIDR block with a subnet mask, such as 192.0.2.0/24, use the URL-encoded value %2F for the forward slash /.
 */
export const deleteOrgServiceAccountAccessListEntry =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteOrgServiceAccountAccessListEntryInput,
    outputSchema: DeleteOrgServiceAccountAccessListEntryOutput,
  }));
