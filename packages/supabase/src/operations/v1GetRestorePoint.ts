import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetRestorePointInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    ref: Schema.String.pipe(T.PathParam()),
    name: Schema.optional(Schema.String),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/v1/projects/{ref}/database/backups/restore-point",
  }),
);
export type V1GetRestorePointInput = typeof V1GetRestorePointInput.Type;

// Output Schema
export const V1GetRestorePointOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String,
    status: Schema.Literals(["AVAILABLE", "PENDING", "REMOVED", "FAILED"]),
  });
export type V1GetRestorePointOutput = typeof V1GetRestorePointOutput.Type;

// The operation
/**
 * Get restore points for project
 *
 * @param ref - Project ref
 */
export const v1GetRestorePoint = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1GetRestorePointInput,
  outputSchema: V1GetRestorePointOutput,
}));
