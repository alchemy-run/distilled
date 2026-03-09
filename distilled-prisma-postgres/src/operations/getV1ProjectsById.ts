import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetV1ProjectsByIdInput = Schema.Struct({
  id: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/v1/projects/{id}" }));
export type GetV1ProjectsByIdInput = typeof GetV1ProjectsByIdInput.Type;

// Output Schema
export const GetV1ProjectsByIdOutput = Schema.Struct({
  data: Schema.Struct({
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
});
export type GetV1ProjectsByIdOutput = typeof GetV1ProjectsByIdOutput.Type;

// The operation
/**
 * Get project
 *
 * Returns the project with the given ID.
 */
export const getV1ProjectsById = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetV1ProjectsByIdInput,
  outputSchema: GetV1ProjectsByIdOutput,
}));
