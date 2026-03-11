import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteFederationSettingIdentityProviderInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    federationSettingsId: Schema.String.pipe(T.PathParam()),
    identityProviderId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/api/atlas/v2/federationSettings/{federationSettingsId}/identityProviders/{identityProviderId}",
    }),
  );
export type DeleteFederationSettingIdentityProviderInput =
  typeof DeleteFederationSettingIdentityProviderInput.Type;

// Output Schema
export const DeleteFederationSettingIdentityProviderOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeleteFederationSettingIdentityProviderOutput =
  typeof DeleteFederationSettingIdentityProviderOutput.Type;

// The operation
/**
 * Delete One Identity Provider
 *
 * Deletes one identity provider in the specified federation. To use this resource, the requesting Service Account or API Key must have the Organization Owner role for the connected organization.
 * **Note**: Requests to this resource will fail if the identity provider is connected to more than one organization or is connected to an organization unowned by the requesting Service Account or API key. Before deleting an identity provider, confirm that no organization in your federation uses this identity provider.
 *
 * @param federationSettingsId - Unique 24-hexadecimal digit string that identifies your federation.
 * @param identityProviderId - Unique 24-hexadecimal digit string that identifies the identity provider to connect.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 */
export const deleteFederationSettingIdentityProvider =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteFederationSettingIdentityProviderInput,
    outputSchema: DeleteFederationSettingIdentityProviderOutput,
  }));
