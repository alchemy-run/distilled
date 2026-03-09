import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PatchV1ProjectsByIdInput = Schema.Struct({
  id: Schema.String.pipe(T.PathParam()),
  name: Schema.optional(Schema.String),
  settings: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
}).pipe(T.Http({ method: "PATCH", path: "/v1/projects/{id}" }));
export type PatchV1ProjectsByIdInput = typeof PatchV1ProjectsByIdInput.Type;

// Output Schema
export const PatchV1ProjectsByIdOutput = Schema.Struct({
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
export type PatchV1ProjectsByIdOutput = typeof PatchV1ProjectsByIdOutput.Type;

// The operation
/**
 * Update project
 *
 * Updates the project with the given ID.
 */
export const patchV1ProjectsById = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PatchV1ProjectsByIdInput,
  outputSchema: PatchV1ProjectsByIdOutput,
}));
