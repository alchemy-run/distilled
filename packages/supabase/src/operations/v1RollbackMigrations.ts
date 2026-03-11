import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1RollbackMigrationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    gte: Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/v1/projects/{ref}/database/migrations",
    }),
  );
export type V1RollbackMigrationsInput = typeof V1RollbackMigrationsInput.Type;

// Output Schema
export const V1RollbackMigrationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type V1RollbackMigrationsOutput = typeof V1RollbackMigrationsOutput.Type;

// The operation
/**
 * [Beta] Rollback database migrations and remove them from history table
 *
 * Only available to selected partner OAuth apps
 *
 * @param ref - Project ref
 * @param gte - Rollback migrations greater or equal to this version
 */
export const v1RollbackMigrations = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1RollbackMigrationsInput,
    outputSchema: V1RollbackMigrationsOutput,
  }),
);
