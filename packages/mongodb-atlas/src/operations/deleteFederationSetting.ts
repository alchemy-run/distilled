import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteFederationSettingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    federationSettingsId: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/api/atlas/v2/federationSettings/{federationSettingsId}",
    }),
  );
export type DeleteFederationSettingInput =
  typeof DeleteFederationSettingInput.Type;

// Output Schema
export const DeleteFederationSettingOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeleteFederationSettingOutput =
  typeof DeleteFederationSettingOutput.Type;

// The operation
/**
 * Delete One Federation Settings Instance
 *
 * Deletes the federation settings instance and all associated data, including identity providers and domains. To use this resource, the requesting Service Account or API Key must have the Organization Owner role in the last remaining connected organization. **Note**: requests to this resource will fail if there is more than one connected organization in the federation.
 *
 * @param federationSettingsId - Unique 24-hexadecimal digit string that identifies your federation.
 */
export const deleteFederationSetting = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeleteFederationSettingInput,
    outputSchema: DeleteFederationSettingOutput,
  }),
);
