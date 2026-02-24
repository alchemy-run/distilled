import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const SetSnapshotScheduleInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
  schedule: Schema.Array(
    Schema.Struct({
      frequency: Schema.String,
      hour: Schema.optional(Schema.Number),
      day: Schema.optional(Schema.Number),
      month: Schema.optional(Schema.Number),
      retention_seconds: Schema.optional(Schema.Number),
    }),
  ),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/projects/{project_id}/branches/{branch_id}/backup_schedule",
  }),
);
export type SetSnapshotScheduleInput = typeof SetSnapshotScheduleInput.Type;

// Output Schema
export const SetSnapshotScheduleOutput = Schema.Struct({});
export type SetSnapshotScheduleOutput = typeof SetSnapshotScheduleOutput.Type;

// The operation
/**
 * Update backup schedule
 *
 * Update the backup schedule for the specified branch.
 * **Note** : This endpoint is currently in Beta.
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The branch ID
 */
export const setSnapshotSchedule = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SetSnapshotScheduleInput,
  outputSchema: SetSnapshotScheduleOutput,
}));
