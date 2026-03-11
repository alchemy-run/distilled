import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateOrgInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  envelope: Schema.optional(Schema.Boolean),
  pretty: Schema.optional(Schema.Boolean),
}).pipe(T.Http({ method: "POST", path: "/api/atlas/v2/orgs" }));
export type CreateOrgInput = typeof CreateOrgInput.Type;

// Output Schema
export const CreateOrgOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CreateOrgOutput = typeof CreateOrgOutput.Type;

// The operation
/**
 * Create One Organization
 *
 * Creates one organization in MongoDB Cloud and links it to the requesting Service Account's or API Key's organization. To use this resource, the requesting Service Account or API Key must have the Organization Owner role. The requesting Service Account's or API Key's organization must be a paying organization. To learn more, see Configure a Paying Organization in the MongoDB Atlas documentation. Optionally, if `federationSettingsId` is provided, the new Organization will be linked to the federation. The requesting Service Account or API Key must be an Organization Owner in the federation.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 */
export const createOrg = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateOrgInput,
  outputSchema: CreateOrgOutput,
}));
