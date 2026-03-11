import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetV1WorkspacesInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  cursor: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.Number),
}).pipe(T.Http({ method: "GET", path: "/v1/workspaces" }));
export type GetV1WorkspacesInput = typeof GetV1WorkspacesInput.Type;

// Output Schema
export const GetV1WorkspacesOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  data: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      type: Schema.String,
      url: Schema.String,
      name: Schema.String,
      createdAt: Schema.String,
    }),
  ),
  pagination: Schema.Struct({
    nextCursor: Schema.NullOr(Schema.String),
    hasMore: Schema.Boolean,
  }),
});
export type GetV1WorkspacesOutput = typeof GetV1WorkspacesOutput.Type;

// The operation
/**
 * Get list of workspaces
 *
 * Returns the list of workspaces the current token can access.
 */
export const getV1Workspaces = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetV1WorkspacesInput,
  outputSchema: GetV1WorkspacesOutput,
}));
