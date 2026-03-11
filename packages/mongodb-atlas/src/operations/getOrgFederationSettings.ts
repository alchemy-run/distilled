import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetOrgFederationSettingsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    orgId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/orgs/{orgId}/federationSettings",
    }),
  );
export type GetOrgFederationSettingsInput =
  typeof GetOrgFederationSettingsInput.Type;

// Output Schema
export const GetOrgFederationSettingsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetOrgFederationSettingsOutput =
  typeof GetOrgFederationSettingsOutput.Type;

// The operation
/**
 * Return Federation Settings for One Organization
 *
 * Returns information about the federation settings for the specified organization. To use this resource, the requesting Service Account or API Key must have the Organization Owner role in the connected organization.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param orgId - Unique 24-hexadecimal digit string that identifies the organization that contains your projects. Use the [`/orgs`](#tag/Organizations/operation/listOrganizations) endpoint to retrieve all organizations to which the authenticated user has access.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 */
export const getOrgFederationSettings = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetOrgFederationSettingsInput,
    outputSchema: GetOrgFederationSettingsOutput,
  }),
);
