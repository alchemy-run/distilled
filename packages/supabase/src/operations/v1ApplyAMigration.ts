import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1ApplyAMigrationInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    ref: Schema.String.pipe(T.PathParam()),
    query: Schema.String,
    name: Schema.optional(Schema.String),
    rollback: Schema.optional(Schema.String),
  },
).pipe(
  T.Http({ method: "POST", path: "/v1/projects/{ref}/database/migrations" }),
);
export type V1ApplyAMigrationInput = typeof V1ApplyAMigrationInput.Type;

// Output Schema
export const V1ApplyAMigrationOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type V1ApplyAMigrationOutput = typeof V1ApplyAMigrationOutput.Type;

// The operation
/**
 * [Beta] Apply a database migration
 *
 * Only available to selected partner OAuth apps
 *
 * @param ref - Project ref
 * @param Idempotency-Key - A unique key to ensure the same migration is tracked only once.
 */
export const v1ApplyAMigration = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1ApplyAMigrationInput,
  outputSchema: V1ApplyAMigrationOutput,
}));
