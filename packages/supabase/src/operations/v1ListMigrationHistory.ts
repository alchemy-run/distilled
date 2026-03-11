import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1ListMigrationHistoryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({ method: "GET", path: "/v1/projects/{ref}/database/migrations" }),
  );
export type V1ListMigrationHistoryInput =
  typeof V1ListMigrationHistoryInput.Type;

// Output Schema
export const V1ListMigrationHistoryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
      version: Schema.String,
      name: Schema.optional(Schema.String),
    }),
  );
export type V1ListMigrationHistoryOutput =
  typeof V1ListMigrationHistoryOutput.Type;

// The operation
/**
 * [Beta] List applied migration versions
 *
 * Only available to selected partner OAuth apps
 *
 * @param ref - Project ref
 */
export const v1ListMigrationHistory = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1ListMigrationHistoryInput,
    outputSchema: V1ListMigrationHistoryOutput,
  }),
);
