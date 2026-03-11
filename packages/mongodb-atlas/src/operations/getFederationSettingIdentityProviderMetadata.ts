import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetFederationSettingIdentityProviderMetadataInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    federationSettingsId: Schema.String.pipe(T.PathParam()),
    identityProviderId: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/federationSettings/{federationSettingsId}/identityProviders/{identityProviderId}/metadata.xml",
    }),
  );
export type GetFederationSettingIdentityProviderMetadataInput =
  typeof GetFederationSettingIdentityProviderMetadataInput.Type;

// Output Schema
export const GetFederationSettingIdentityProviderMetadataOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetFederationSettingIdentityProviderMetadataOutput =
  typeof GetFederationSettingIdentityProviderMetadataOutput.Type;

// The operation
/**
 * Return Metadata of One Identity Provider
 *
 * Returns the metadata of one identity provider in the specified federation. To use this resource, the requesting Service Account or API Key must have the Organization Owner role in one of the connected organizations.
 *
 * @param federationSettingsId - Unique 24-hexadecimal digit string that identifies your federation.
 * @param identityProviderId - Legacy 20-hexadecimal digit string that identifies the identity provider. This id can be found within the Federation Management Console > Identity Providers tab by clicking the info icon in the IdP ID row of a configured identity provider.
 */
export const getFederationSettingIdentityProviderMetadata =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetFederationSettingIdentityProviderMetadataInput,
    outputSchema: GetFederationSettingIdentityProviderMetadataOutput,
  }));
