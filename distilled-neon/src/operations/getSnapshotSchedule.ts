import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetSnapshotScheduleInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/projects/{project_id}/branches/{branch_id}/backup_schedule",
  }),
);
export type GetSnapshotScheduleInput = typeof GetSnapshotScheduleInput.Type;

// Output Schema
export const GetSnapshotScheduleOutput = Schema.Struct({
  schedule: Schema.Array(
    Schema.Struct({
      frequency: Schema.String,
      hour: Schema.optional(Schema.Number),
      day: Schema.optional(Schema.Number),
      month: Schema.optional(Schema.Number),
      retention_seconds: Schema.optional(Schema.Number),
    }),
  ),
});
export type GetSnapshotScheduleOutput = typeof GetSnapshotScheduleOutput.Type;

// The operation
/**
 * View backup schedule
 *
 * View the backup schedule for the specified branch.
 * **Note**: This endpoint is currently in Beta.
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The branch ID
 */
export const getSnapshotSchedule = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetSnapshotScheduleInput,
  outputSchema: GetSnapshotScheduleOutput,
}));
