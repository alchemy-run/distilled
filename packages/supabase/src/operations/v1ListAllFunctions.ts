import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1ListAllFunctionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(T.Http({ method: "GET", path: "/v1/projects/{ref}/functions" }));
export type V1ListAllFunctionsInput = typeof V1ListAllFunctionsInput.Type;

// Output Schema
export const V1ListAllFunctionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
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
  );
export type V1ListAllFunctionsOutput = typeof V1ListAllFunctionsOutput.Type;

// The operation
/**
 * List all functions
 *
 * Returns all functions you've previously added to the specified project.
 *
 * @param ref - Project ref
 */
export const v1ListAllFunctions = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1ListAllFunctionsInput,
  outputSchema: V1ListAllFunctionsOutput,
}));
