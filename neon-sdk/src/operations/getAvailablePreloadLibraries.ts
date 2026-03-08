import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetAvailablePreloadLibrariesInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/projects/{project_id}/available_preload_libraries",
  }),
);
export type GetAvailablePreloadLibrariesInput =
  typeof GetAvailablePreloadLibrariesInput.Type;

// Output Schema
export const GetAvailablePreloadLibrariesOutput = Schema.Struct({
  libraries: Schema.optional(
    Schema.Array(
      Schema.Struct({
        library_name: Schema.String,
        description: Schema.String,
        is_default: Schema.Boolean,
        is_experimental: Schema.Boolean,
        version: Schema.String,
      }),
    ),
  ),
});
export type GetAvailablePreloadLibrariesOutput =
  typeof GetAvailablePreloadLibrariesOutput.Type;

// The operation
/**
 * Return available shared preload libraries
 */
export const getAvailablePreloadLibraries =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetAvailablePreloadLibrariesInput,
    outputSchema: GetAvailablePreloadLibrariesOutput,
  }));
