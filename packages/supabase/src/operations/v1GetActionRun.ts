import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetActionRunInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  ref: Schema.String.pipe(T.PathParam()),
  run_id: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/v1/projects/{ref}/actions/{run_id}" }));
export type V1GetActionRunInput = typeof V1GetActionRunInput.Type;

// Output Schema
export const V1GetActionRunOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  branch_id: Schema.String,
  run_steps: Schema.Array(
    Schema.Struct({
      name: Schema.Literals([
        "clone",
        "pull",
        "health",
        "configure",
        "migrate",
        "seed",
        "deploy",
      ]),
      status: Schema.Literals([
        "CREATED",
        "DEAD",
        "EXITED",
        "PAUSED",
        "REMOVING",
        "RESTARTING",
        "RUNNING",
      ]),
      created_at: Schema.String,
      updated_at: Schema.String,
    }),
  ),
  git_config: Schema.optional(Schema.NullOr(Schema.Unknown)),
  workdir: Schema.NullOr(Schema.String),
  check_run_id: Schema.NullOr(Schema.Number),
  created_at: Schema.String,
  updated_at: Schema.String,
});
export type V1GetActionRunOutput = typeof V1GetActionRunOutput.Type;

// The operation
/**
 * Get the status of an action run
 *
 * Returns the current status of the specified action run.
 *
 * @param ref - Project ref
 * @param run_id - Action Run ID
 */
export const v1GetActionRun = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1GetActionRunInput,
  outputSchema: V1GetActionRunOutput,
}));
