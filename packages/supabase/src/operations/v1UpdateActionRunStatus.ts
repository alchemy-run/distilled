import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1UpdateActionRunStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    run_id: Schema.String.pipe(T.PathParam()),
    clone: Schema.optional(
      Schema.Literals([
        "CREATED",
        "DEAD",
        "EXITED",
        "PAUSED",
        "REMOVING",
        "RESTARTING",
        "RUNNING",
      ]),
    ),
    pull: Schema.optional(
      Schema.Literals([
        "CREATED",
        "DEAD",
        "EXITED",
        "PAUSED",
        "REMOVING",
        "RESTARTING",
        "RUNNING",
      ]),
    ),
    health: Schema.optional(
      Schema.Literals([
        "CREATED",
        "DEAD",
        "EXITED",
        "PAUSED",
        "REMOVING",
        "RESTARTING",
        "RUNNING",
      ]),
    ),
    configure: Schema.optional(
      Schema.Literals([
        "CREATED",
        "DEAD",
        "EXITED",
        "PAUSED",
        "REMOVING",
        "RESTARTING",
        "RUNNING",
      ]),
    ),
    migrate: Schema.optional(
      Schema.Literals([
        "CREATED",
        "DEAD",
        "EXITED",
        "PAUSED",
        "REMOVING",
        "RESTARTING",
        "RUNNING",
      ]),
    ),
    seed: Schema.optional(
      Schema.Literals([
        "CREATED",
        "DEAD",
        "EXITED",
        "PAUSED",
        "REMOVING",
        "RESTARTING",
        "RUNNING",
      ]),
    ),
    deploy: Schema.optional(
      Schema.Literals([
        "CREATED",
        "DEAD",
        "EXITED",
        "PAUSED",
        "REMOVING",
        "RESTARTING",
        "RUNNING",
      ]),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/v1/projects/{ref}/actions/{run_id}/status",
    }),
  );
export type V1UpdateActionRunStatusInput =
  typeof V1UpdateActionRunStatusInput.Type;

// Output Schema
export const V1UpdateActionRunStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    message: Schema.Literals(["ok"]),
  });
export type V1UpdateActionRunStatusOutput =
  typeof V1UpdateActionRunStatusOutput.Type;

// The operation
/**
 * Update the status of an action run
 *
 * Updates the status of an ongoing action run.
 *
 * @param ref - Project ref
 * @param run_id - Action Run ID
 */
export const v1UpdateActionRunStatus = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1UpdateActionRunStatusInput,
    outputSchema: V1UpdateActionRunStatusOutput,
  }),
);
