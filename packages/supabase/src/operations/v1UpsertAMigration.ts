import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1UpsertAMigrationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    query: Schema.String,
    name: Schema.optional(Schema.String),
    rollback: Schema.optional(Schema.String),
  }).pipe(
    T.Http({ method: "PUT", path: "/v1/projects/{ref}/database/migrations" }),
  );
export type V1UpsertAMigrationInput = typeof V1UpsertAMigrationInput.Type;

// Output Schema
export const V1UpsertAMigrationOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type V1UpsertAMigrationOutput = typeof V1UpsertAMigrationOutput.Type;

// The operation
/**
 * [Beta] Upsert a database migration without applying
 *
 * Only available to selected partner OAuth apps
 *
 * @param ref - Project ref
 * @param Idempotency-Key - A unique key to ensure the same migration is tracked only once.
 */
export const v1UpsertAMigration = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1UpsertAMigrationInput,
  outputSchema: V1UpsertAMigrationOutput,
}));
