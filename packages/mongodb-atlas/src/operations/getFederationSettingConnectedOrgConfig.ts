import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetFederationSettingConnectedOrgConfigInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    federationSettingsId: Schema.String.pipe(T.PathParam()),
    orgId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/federationSettings/{federationSettingsId}/connectedOrgConfigs/{orgId}",
    }),
  );
export type GetFederationSettingConnectedOrgConfigInput =
  typeof GetFederationSettingConnectedOrgConfigInput.Type;

// Output Schema
export const GetFederationSettingConnectedOrgConfigOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetFederationSettingConnectedOrgConfigOutput =
  typeof GetFederationSettingConnectedOrgConfigOutput.Type;

// The operation
/**
 * Return One Organization Configuration from One Federation
 *
 * Returns the specified connected organization configuration from the specified federation. To use this resource, the requesting Service Account or API Key must have the Organization Owner role in the connected organization.
 *
 * @param federationSettingsId - Unique 24-hexadecimal digit string that identifies your federation.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param orgId - Unique 24-hexadecimal digit string that identifies the connected organization configuration to return.
 */
export const getFederationSettingConnectedOrgConfig =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetFederationSettingConnectedOrgConfigInput,
    outputSchema: GetFederationSettingConnectedOrgConfigOutput,
  }));
