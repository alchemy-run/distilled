import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateFederationSettingConnectedOrgConfigRoleMappingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    federationSettingsId: Schema.String.pipe(T.PathParam()),
    orgId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/api/atlas/v2/federationSettings/{federationSettingsId}/connectedOrgConfigs/{orgId}/roleMappings",
    }),
  );
export type CreateFederationSettingConnectedOrgConfigRoleMappingInput =
  typeof CreateFederationSettingConnectedOrgConfigRoleMappingInput.Type;

// Output Schema
export const CreateFederationSettingConnectedOrgConfigRoleMappingOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CreateFederationSettingConnectedOrgConfigRoleMappingOutput =
  typeof CreateFederationSettingConnectedOrgConfigRoleMappingOutput.Type;

// The operation
/**
 * Create One Role Mapping in One Organization Configuration
 *
 * Adds one role mapping to the specified organization in the specified federation. To use this resource, the requesting Service Account or API Key must have the Organization Owner role.
 *
 * @param federationSettingsId - Unique 24-hexadecimal digit string that identifies your federation.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param orgId - Unique 24-hexadecimal digit string that identifies the organization that contains your projects. Use the [`/orgs`](#tag/Organizations/operation/listOrganizations) endpoint to retrieve all organizations to which the authenticated user has access.
 */
export const createFederationSettingConnectedOrgConfigRoleMapping =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateFederationSettingConnectedOrgConfigRoleMappingInput,
    outputSchema: CreateFederationSettingConnectedOrgConfigRoleMappingOutput,
  }));
