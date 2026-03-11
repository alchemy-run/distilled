import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdateFederationSettingIdentityProviderInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    federationSettingsId: Schema.String.pipe(T.PathParam()),
    identityProviderId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/api/atlas/v2/federationSettings/{federationSettingsId}/identityProviders/{identityProviderId}",
    }),
  );
export type UpdateFederationSettingIdentityProviderInput =
  typeof UpdateFederationSettingIdentityProviderInput.Type;

// Output Schema
export const UpdateFederationSettingIdentityProviderOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type UpdateFederationSettingIdentityProviderOutput =
  typeof UpdateFederationSettingIdentityProviderOutput.Type;

// The operation
/**
 * Update One Identity Provider
 *
 * Updates one identity provider in the specified federation. To use this resource, the requesting Service Account or API Key must have the Organization Owner role in one of the connected organizations.
 * **Note**: Changing authorization types and/or updating authorization claims can prevent current users and/or groups from accessing the database.
 * **Note**: When deactivating a SAML identity provider connected to an organization, the requesting Service Account or API key must have the Organization Owner role for the organization. If the identity provider is connected to multiple organizations, the request will fail. Deprecated versions: v2-{2023-01-01}
 *
 * @param federationSettingsId - Unique 24-hexadecimal digit string that identifies your federation.
 * @param identityProviderId - Unique string that identifies the identity provider to connect. If using an API version before 11-15-2023, use the legacy 20-hexadecimal digit id. This id can be found within the Federation Management Console > Identity Providers tab by clicking the info icon in the IdP ID row of a configured identity provider. For all other versions, use the 24-hexadecimal digit id.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 */
export const updateFederationSettingIdentityProvider =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: UpdateFederationSettingIdentityProviderInput,
    outputSchema: UpdateFederationSettingIdentityProviderOutput,
  }));
