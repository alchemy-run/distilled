import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateFederationSettingIdentityProviderInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    federationSettingsId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/api/atlas/v2/federationSettings/{federationSettingsId}/identityProviders",
    }),
  );
export type CreateFederationSettingIdentityProviderInput =
  typeof CreateFederationSettingIdentityProviderInput.Type;

// Output Schema
export const CreateFederationSettingIdentityProviderOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CreateFederationSettingIdentityProviderOutput =
  typeof CreateFederationSettingIdentityProviderOutput.Type;

// The operation
/**
 * Create One Identity Provider
 *
 * Creates one identity provider within the specified federation. To use this resource, the requesting Service Account or API Key must have the Organization Owner role in one of the connected organizations.
 * **Note**: This resource only supports the creation of OIDC identity providers.
 *
 * @param federationSettingsId - Unique 24-hexadecimal digit string that identifies your federation.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 */
export const createFederationSettingIdentityProvider =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateFederationSettingIdentityProviderInput,
    outputSchema: CreateFederationSettingIdentityProviderOutput,
  }));
