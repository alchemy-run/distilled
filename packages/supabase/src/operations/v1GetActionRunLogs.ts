import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetActionRunLogsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    run_id: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({ method: "GET", path: "/v1/projects/{ref}/actions/{run_id}/logs" }),
  );
export type V1GetActionRunLogsInput = typeof V1GetActionRunLogsInput.Type;

// Output Schema
export const V1GetActionRunLogsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type V1GetActionRunLogsOutput = typeof V1GetActionRunLogsOutput.Type;

// The operation
/**
 * Get the logs of an action run
 *
 * Returns the logs from the specified action run.
 *
 * @param ref - Project ref
 * @param run_id - Action Run ID
 */
export const v1GetActionRunLogs = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1GetActionRunLogsInput,
  outputSchema: V1GetActionRunLogsOutput,
}));
