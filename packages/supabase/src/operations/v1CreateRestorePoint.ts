import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1CreateRestorePointInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    name: Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/projects/{ref}/database/backups/restore-point",
    }),
  );
export type V1CreateRestorePointInput = typeof V1CreateRestorePointInput.Type;

// Output Schema
export const V1CreateRestorePointOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String,
    status: Schema.Literals(["AVAILABLE", "PENDING", "REMOVED", "FAILED"]),
  });
export type V1CreateRestorePointOutput = typeof V1CreateRestorePointOutput.Type;

// The operation
/**
 * Initiates a creation of a restore point for a database
 *
 * @param ref - Project ref
 */
export const v1CreateRestorePoint = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1CreateRestorePointInput,
    outputSchema: V1CreateRestorePointOutput,
  }),
);
