import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteV1WorkspacesByWorkspaceIdIntegrationsByClientIdInput =
  Schema.Struct({
    clientId: Schema.String.pipe(T.PathParam()),
    workspaceId: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/v1/workspaces/{workspaceId}/integrations/{clientId}",
    }),
  );
export type DeleteV1WorkspacesByWorkspaceIdIntegrationsByClientIdInput =
  typeof DeleteV1WorkspacesByWorkspaceIdIntegrationsByClientIdInput.Type;

// Output Schema
export const DeleteV1WorkspacesByWorkspaceIdIntegrationsByClientIdOutput =
  Schema.Void;
export type DeleteV1WorkspacesByWorkspaceIdIntegrationsByClientIdOutput =
  typeof DeleteV1WorkspacesByWorkspaceIdIntegrationsByClientIdOutput.Type;

// The operation
/**
 * Revoke integration tokens
 *
 * Revokes the integration tokens with the given client ID.
 */
export const deleteV1WorkspacesByWorkspaceIdIntegrationsByClientId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteV1WorkspacesByWorkspaceIdIntegrationsByClientIdInput,
    outputSchema: DeleteV1WorkspacesByWorkspaceIdIntegrationsByClientIdOutput,
  }));
