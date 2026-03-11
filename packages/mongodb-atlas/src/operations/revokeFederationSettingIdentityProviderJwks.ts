import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const RevokeFederationSettingIdentityProviderJwksInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    federationSettingsId: Schema.String.pipe(T.PathParam()),
    identityProviderId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/api/atlas/v2/federationSettings/{federationSettingsId}/identityProviders/{identityProviderId}/jwks",
    }),
  );
export type RevokeFederationSettingIdentityProviderJwksInput =
  typeof RevokeFederationSettingIdentityProviderJwksInput.Type;

// Output Schema
export const RevokeFederationSettingIdentityProviderJwksOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RevokeFederationSettingIdentityProviderJwksOutput =
  typeof RevokeFederationSettingIdentityProviderJwksOutput.Type;

// The operation
/**
 * Revoke JWKS from One OIDC Identity Provider
 *
 * Revokes the JWKS tokens from the requested OIDC identity provider. To use this resource, the requesting Service Account or API Key must have the Organization Owner role in one of the connected organizations.
 * **Note**: Revoking your JWKS tokens immediately refreshes your IdP public keys from all your Atlas clusters, invalidating previously signed access tokens and logging out all users. You may need to restart your MongoDB clients. All organizations connected to the identity provider will be affected.
 *
 * @param federationSettingsId - Unique 24-hexadecimal digit string that identifies your federation.
 * @param identityProviderId - Unique 24-hexadecimal digit string that identifies the identity provider to connect.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 */
export const revokeFederationSettingIdentityProviderJwks =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RevokeFederationSettingIdentityProviderJwksInput,
    outputSchema: RevokeFederationSettingIdentityProviderJwksOutput,
  }));
