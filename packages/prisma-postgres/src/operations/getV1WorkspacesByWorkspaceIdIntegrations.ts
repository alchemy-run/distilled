import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetV1WorkspacesByWorkspaceIdIntegrationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    workspaceId: Schema.String.pipe(T.PathParam()),
    cursor: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/workspaces/{workspaceId}/integrations",
    }),
  );
export type GetV1WorkspacesByWorkspaceIdIntegrationsInput =
  typeof GetV1WorkspacesByWorkspaceIdIntegrationsInput.Type;

// Output Schema
export const GetV1WorkspacesByWorkspaceIdIntegrationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        url: Schema.String,
        createdAt: Schema.String,
        scopes: Schema.Array(Schema.String),
        client: Schema.Struct({
          id: Schema.String,
          name: Schema.String,
          createdAt: Schema.String,
        }),
        createdByUser: Schema.Struct({
          id: Schema.String,
          email: Schema.String,
          displayName: Schema.NullOr(Schema.String),
        }),
      }),
    ),
    pagination: Schema.Struct({
      nextCursor: Schema.NullOr(Schema.String),
      hasMore: Schema.Boolean,
    }),
  });
export type GetV1WorkspacesByWorkspaceIdIntegrationsOutput =
  typeof GetV1WorkspacesByWorkspaceIdIntegrationsOutput.Type;

// The operation
/**
 * Get list of integrations
 *
 * Returns integrations for the given workspace.
 */
export const getV1WorkspacesByWorkspaceIdIntegrations =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetV1WorkspacesByWorkspaceIdIntegrationsInput,
    outputSchema: GetV1WorkspacesByWorkspaceIdIntegrationsOutput,
  }));
