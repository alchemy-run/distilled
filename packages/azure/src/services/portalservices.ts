/**
 * Azure Portalservices API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const CopilotSettingsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/providers/Microsoft.PortalServices/copilotSettings/default",
    }),
  );
export type CopilotSettingsCreateOrUpdateInput =
  typeof CopilotSettingsCreateOrUpdateInput.Type;

// Output Schema
export const CopilotSettingsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CopilotSettingsCreateOrUpdateOutput =
  typeof CopilotSettingsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a CopilotSettingsResource
 *
 * @param api-version - The API version to use for this operation.
 */
export const CopilotSettingsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CopilotSettingsCreateOrUpdateInput,
    outputSchema: CopilotSettingsCreateOrUpdateOutput,
  }));
// Input Schema
export const CopilotSettingsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/providers/Microsoft.PortalServices/copilotSettings/default",
    }),
  );
export type CopilotSettingsDeleteInput = typeof CopilotSettingsDeleteInput.Type;

// Output Schema
export const CopilotSettingsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CopilotSettingsDeleteOutput =
  typeof CopilotSettingsDeleteOutput.Type;

// The operation
/**
 * Delete a CopilotSettingsResource
 *
 * @param api-version - The API version to use for this operation.
 */
export const CopilotSettingsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CopilotSettingsDeleteInput,
    outputSchema: CopilotSettingsDeleteOutput,
  }),
);
// Input Schema
export const CopilotSettingsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.PortalServices/copilotSettings/default",
    }),
  );
export type CopilotSettingsGetInput = typeof CopilotSettingsGetInput.Type;

// Output Schema
export const CopilotSettingsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CopilotSettingsGetOutput = typeof CopilotSettingsGetOutput.Type;

// The operation
/**
 * Get a CopilotSettingsResource
 *
 * @param api-version - The API version to use for this operation.
 */
export const CopilotSettingsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CopilotSettingsGetInput,
  outputSchema: CopilotSettingsGetOutput,
}));
// Input Schema
export const CopilotSettingsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/providers/Microsoft.PortalServices/copilotSettings/default",
    }),
  );
export type CopilotSettingsUpdateInput = typeof CopilotSettingsUpdateInput.Type;

// Output Schema
export const CopilotSettingsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CopilotSettingsUpdateOutput =
  typeof CopilotSettingsUpdateOutput.Type;

// The operation
/**
 * Update a CopilotSettingsResource
 *
 * @param api-version - The API version to use for this operation.
 */
export const CopilotSettingsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CopilotSettingsUpdateInput,
    outputSchema: CopilotSettingsUpdateOutput,
  }),
);
