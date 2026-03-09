import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetV1WorkspacesByIdInput = Schema.Struct({
  id: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/v1/workspaces/{id}" }));
export type GetV1WorkspacesByIdInput = typeof GetV1WorkspacesByIdInput.Type;

// Output Schema
export const GetV1WorkspacesByIdOutput = Schema.Struct({
  data: Schema.Struct({
    id: Schema.String,
    type: Schema.Literal("workspace"),
    url: Schema.String,
    name: Schema.String,
    createdAt: Schema.String,
  }),
});
export type GetV1WorkspacesByIdOutput = typeof GetV1WorkspacesByIdOutput.Type;

// The operation
/**
 * Get workspace
 *
 * Returns the workspace with the given ID.
 */
export const getV1WorkspacesById = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetV1WorkspacesByIdInput,
  outputSchema: GetV1WorkspacesByIdOutput,
}));
