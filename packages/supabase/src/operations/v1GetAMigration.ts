import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetAMigrationInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  ref: Schema.String.pipe(T.PathParam()),
  version: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/projects/{ref}/database/migrations/{version}",
  }),
);
export type V1GetAMigrationInput = typeof V1GetAMigrationInput.Type;

// Output Schema
export const V1GetAMigrationOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  version: Schema.String,
  name: Schema.optional(Schema.String),
  statements: Schema.optional(Schema.Array(Schema.String)),
  rollback: Schema.optional(Schema.Array(Schema.String)),
  created_by: Schema.optional(Schema.String),
  idempotency_key: Schema.optional(Schema.String),
});
export type V1GetAMigrationOutput = typeof V1GetAMigrationOutput.Type;

// The operation
/**
 * [Beta] Fetch an existing entry from migration history
 *
 * Only available to selected partner OAuth apps
 *
 * @param ref - Project ref
 */
export const v1GetAMigration = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1GetAMigrationInput,
  outputSchema: V1GetAMigrationOutput,
}));
