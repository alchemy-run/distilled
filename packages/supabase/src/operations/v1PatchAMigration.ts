import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1PatchAMigrationInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    ref: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    name: Schema.optional(Schema.String),
    rollback: Schema.optional(Schema.String),
  },
).pipe(
  T.Http({
    method: "PATCH",
    path: "/v1/projects/{ref}/database/migrations/{version}",
  }),
);
export type V1PatchAMigrationInput = typeof V1PatchAMigrationInput.Type;

// Output Schema
export const V1PatchAMigrationOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type V1PatchAMigrationOutput = typeof V1PatchAMigrationOutput.Type;

// The operation
/**
 * [Beta] Patch an existing entry in migration history
 *
 * Only available to selected partner OAuth apps
 *
 * @param ref - Project ref
 */
export const v1PatchAMigration = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1PatchAMigrationInput,
  outputSchema: V1PatchAMigrationOutput,
}));
