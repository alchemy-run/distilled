import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetV1ProjectsInput = Schema.Struct({
  cursor: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.Number),
}).pipe(T.Http({ method: "GET", path: "/v1/projects" }));
export type GetV1ProjectsInput = typeof GetV1ProjectsInput.Type;

// Output Schema
export const GetV1ProjectsOutput = Schema.Struct({
  data: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      type: Schema.Literal("project"),
      url: Schema.String,
      name: Schema.String,
      createdAt: Schema.String,
      defaultRegion: Schema.NullOr(Schema.String),
      workspace: Schema.Struct({
        id: Schema.String,
        url: Schema.String,
        name: Schema.String,
      }),
    }),
  ),
  pagination: Schema.Struct({
    nextCursor: Schema.NullOr(Schema.String),
    hasMore: Schema.Boolean,
  }),
});
export type GetV1ProjectsOutput = typeof GetV1ProjectsOutput.Type;

// The operation
/**
 * Get list of projects
 *
 * Returns the list of projects the token has access to.
 */
export const getV1Projects = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetV1ProjectsInput,
  outputSchema: GetV1ProjectsOutput,
}));
