import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetOrgApiKeyAccessListEntryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    orgId: Schema.String.pipe(T.PathParam()),
    ipAddress: Schema.String.pipe(T.PathParam()),
    apiUserId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/orgs/{orgId}/apiKeys/{apiUserId}/accessList/{ipAddress}",
    }),
  );
export type GetOrgApiKeyAccessListEntryInput =
  typeof GetOrgApiKeyAccessListEntryInput.Type;

// Output Schema
export const GetOrgApiKeyAccessListEntryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetOrgApiKeyAccessListEntryOutput =
  typeof GetOrgApiKeyAccessListEntryOutput.Type;

// The operation
/**
 * Return One Access List Entry for One Organization API Key
 *
 * Returns one access list entry for the specified organization API key. Resources require  all API requests originate from IP addresses on the API access list. To use this resource, the requesting Service Account or API Key must have the Organization Member role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param orgId - Unique 24-hexadecimal digit string that identifies the organization that contains your projects. Use the [`/orgs`](#tag/Organizations/operation/listOrganizations) endpoint to retrieve all organizations to which the authenticated user has access.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param ipAddress - One IP address or multiple IP addresses represented as one CIDR block to limit  requests to API resources in the specified organization. When adding a CIDR block with a subnet mask, such as  192.0.2.0/24, use the URL-encoded value %2F for the forward slash /.
 * @param apiUserId - Unique 24-hexadecimal digit string that identifies this organization API key for  which you want to return access list entries.
 */
export const getOrgApiKeyAccessListEntry = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetOrgApiKeyAccessListEntryInput,
    outputSchema: GetOrgApiKeyAccessListEntryOutput,
  }),
);
