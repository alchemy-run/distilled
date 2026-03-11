import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListFederationSettingIdentityProvidersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    federationSettingsId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    itemsPerPage: Schema.optional(Schema.Number),
    pageNum: Schema.optional(Schema.Number),
    protocol: Schema.optional(Schema.String),
    idpType: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/federationSettings/{federationSettingsId}/identityProviders",
    }),
  );
export type ListFederationSettingIdentityProvidersInput =
  typeof ListFederationSettingIdentityProvidersInput.Type;

// Output Schema
export const ListFederationSettingIdentityProvidersOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ListFederationSettingIdentityProvidersOutput =
  typeof ListFederationSettingIdentityProvidersOutput.Type;

// The operation
/**
 * Return All Identity Providers in One Federation
 *
 * Returns all identity providers with the provided protocol and type in the specified federation. If no protocol is specified, only SAML identity providers will be returned. If no `idpType` is specified, only WORKFORCE identity providers will be returned. To use this resource, the requesting Service Account or API Key must have the Organization Owner role in one of the connected organizations.
 *
 * @param federationSettingsId - Unique 24-hexadecimal digit string that identifies your federation.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param itemsPerPage - Number of items that the response returns per page.
 * @param pageNum - Number of the page that displays the current set of the total objects that the response returns.
 * @param protocol - The protocols of the target identity providers.
 * @param idpType - The types of the target identity providers.
 */
export const listFederationSettingIdentityProviders =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListFederationSettingIdentityProvidersInput,
    outputSchema: ListFederationSettingIdentityProvidersOutput,
  }));
