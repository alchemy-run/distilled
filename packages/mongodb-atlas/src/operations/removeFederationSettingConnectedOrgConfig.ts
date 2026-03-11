import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const RemoveFederationSettingConnectedOrgConfigInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    federationSettingsId: Schema.String.pipe(T.PathParam()),
    orgId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/api/atlas/v2/federationSettings/{federationSettingsId}/connectedOrgConfigs/{orgId}",
    }),
  );
export type RemoveFederationSettingConnectedOrgConfigInput =
  typeof RemoveFederationSettingConnectedOrgConfigInput.Type;

// Output Schema
export const RemoveFederationSettingConnectedOrgConfigOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RemoveFederationSettingConnectedOrgConfigOutput =
  typeof RemoveFederationSettingConnectedOrgConfigOutput.Type;

// The operation
/**
 * Remove One Organization Configuration from One Federation
 *
 * Removes one connected organization configuration from the specified federation. To use this resource, the requesting Service Account or API Key must have the Organization Owner role. Note: This request fails if only one connected organization exists in the federation.
 *
 * @param federationSettingsId - Unique 24-hexadecimal digit string that identifies your federation.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param orgId - Unique 24-hexadecimal digit string that identifies the connected organization configuration to remove.
 */
export const removeFederationSettingConnectedOrgConfig =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RemoveFederationSettingConnectedOrgConfigInput,
    outputSchema: RemoveFederationSettingConnectedOrgConfigOutput,
  }));
