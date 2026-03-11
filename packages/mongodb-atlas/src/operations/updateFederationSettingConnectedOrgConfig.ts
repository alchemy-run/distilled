import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdateFederationSettingConnectedOrgConfigInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    federationSettingsId: Schema.String.pipe(T.PathParam()),
    orgId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/api/atlas/v2/federationSettings/{federationSettingsId}/connectedOrgConfigs/{orgId}",
    }),
  );
export type UpdateFederationSettingConnectedOrgConfigInput =
  typeof UpdateFederationSettingConnectedOrgConfigInput.Type;

// Output Schema
export const UpdateFederationSettingConnectedOrgConfigOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type UpdateFederationSettingConnectedOrgConfigOutput =
  typeof UpdateFederationSettingConnectedOrgConfigOutput.Type;

// The operation
/**
 * Update One Organization Configuration in One Federation
 *
 * Updates one connected organization configuration from the specified federation. To use this resource, the requesting Service Account or API Key must have the Organization Owner role.
 * **Note** If the organization configuration has no associated identity provider, you can't use this resource to update role mappings or post authorization role grants.
 * **Note**: The `domainRestrictionEnabled` field defaults to false if not provided in the request.
 * **Note**: If the `identityProviderId` field is not provided, you will disconnect the organization and the identity provider.
 * **Note**: Currently connected data access identity providers missing from the `dataAccessIdentityProviderIds` field will be disconnected.
 *
 * @param federationSettingsId - Unique 24-hexadecimal digit string that identifies your federation.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param orgId - Unique 24-hexadecimal digit string that identifies the connected organization configuration to update.
 */
export const updateFederationSettingConnectedOrgConfig =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: UpdateFederationSettingConnectedOrgConfigInput,
    outputSchema: UpdateFederationSettingConnectedOrgConfigOutput,
  }));
