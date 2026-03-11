import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1ListActionRunsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  ref: Schema.String.pipe(T.PathParam()),
  offset: Schema.optional(Schema.Number),
  limit: Schema.optional(Schema.Number),
}).pipe(T.Http({ method: "GET", path: "/v1/projects/{ref}/actions" }));
export type V1ListActionRunsInput = typeof V1ListActionRunsInput.Type;

// Output Schema
export const V1ListActionRunsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
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
  }),
);
export type V1ListActionRunsOutput = typeof V1ListActionRunsOutput.Type;

// The operation
/**
 * List all action runs
 *
 * Returns a paginated list of action runs of the specified project.
 *
 * @param ref - Project ref
 */
export const v1ListActionRuns = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1ListActionRunsInput,
  outputSchema: V1ListActionRunsOutput,
}));
