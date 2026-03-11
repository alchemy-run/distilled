import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1BulkUpdateFunctionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(T.Http({ method: "PUT", path: "/v1/projects/{ref}/functions" }));
export type V1BulkUpdateFunctionsInput = typeof V1BulkUpdateFunctionsInput.Type;

// Output Schema
export const V1BulkUpdateFunctionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    functions: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        slug: Schema.String,
        name: Schema.String,
        status: Schema.Literals(["ACTIVE", "REMOVED", "THROTTLED"]),
        version: Schema.Number,
        created_at: Schema.Number,
        updated_at: Schema.Number,
        verify_jwt: Schema.optional(Schema.Boolean),
        import_map: Schema.optional(Schema.Boolean),
        entrypoint_path: Schema.optional(Schema.String),
        import_map_path: Schema.optional(Schema.String),
        ezbr_sha256: Schema.optional(Schema.String),
      }),
    ),
  });
export type V1BulkUpdateFunctionsOutput =
  typeof V1BulkUpdateFunctionsOutput.Type;

// The operation
/**
 * Bulk update functions
 *
 * Bulk update functions. It will create a new function or replace existing. The operation is idempotent. NOTE: You will need to manually bump the version.
 *
 * @param ref - Project ref
 */
export const v1BulkUpdateFunctions = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1BulkUpdateFunctionsInput,
    outputSchema: V1BulkUpdateFunctionsOutput,
  }),
);
