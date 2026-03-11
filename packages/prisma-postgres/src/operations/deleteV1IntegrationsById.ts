import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteV1IntegrationsByIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
  }).pipe(T.Http({ method: "DELETE", path: "/v1/integrations/{id}" }));
export type DeleteV1IntegrationsByIdInput =
  typeof DeleteV1IntegrationsByIdInput.Type;

// Output Schema
export const DeleteV1IntegrationsByIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeleteV1IntegrationsByIdOutput =
  typeof DeleteV1IntegrationsByIdOutput.Type;

// The operation
/**
 * Delete integration
 *
 * Revokes the integration tokens by integration ID.
 */
export const deleteV1IntegrationsById = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeleteV1IntegrationsByIdInput,
    outputSchema: DeleteV1IntegrationsByIdOutput,
  }),
);
