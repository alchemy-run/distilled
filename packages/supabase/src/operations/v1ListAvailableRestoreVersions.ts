import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1ListAvailableRestoreVersionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(T.Http({ method: "GET", path: "/v1/projects/{ref}/restore" }));
export type V1ListAvailableRestoreVersionsInput =
  typeof V1ListAvailableRestoreVersionsInput.Type;

// Output Schema
export const V1ListAvailableRestoreVersionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    available_versions: Schema.Array(
      Schema.Struct({
        version: Schema.String,
        release_channel: Schema.Literals([
          "internal",
          "alpha",
          "beta",
          "ga",
          "withdrawn",
          "preview",
        ]),
        postgres_engine: Schema.Literals(["13", "14", "15", "17", "17-oriole"]),
      }),
    ),
  });
export type V1ListAvailableRestoreVersionsOutput =
  typeof V1ListAvailableRestoreVersionsOutput.Type;

// The operation
/**
 * Lists available restore versions for the given project
 *
 * @param ref - Project ref
 */
export const v1ListAvailableRestoreVersions =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: V1ListAvailableRestoreVersionsInput,
    outputSchema: V1ListAvailableRestoreVersionsOutput,
  }));
