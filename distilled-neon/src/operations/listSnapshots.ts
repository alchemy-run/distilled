import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListSnapshotsInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/projects/{project_id}/snapshots" }));
export type ListSnapshotsInput = typeof ListSnapshotsInput.Type;

// Output Schema
export const ListSnapshotsOutput = Schema.Struct({
  snapshots: Schema.Array(Schema.Struct({
    id: Schema.String,
    name: Schema.String,
    lsn: Schema.optional(Schema.String),
    timestamp: Schema.optional(Schema.String),
    source_branch_id: Schema.optional(Schema.String),
    created_at: Schema.String,
    expires_at: Schema.optional(Schema.String),
    manual: Schema.optional(Schema.Boolean),
  })),
});
export type ListSnapshotsOutput = typeof ListSnapshotsOutput.Type;

// The operation
/**
 * List project snapshots
 *
 * List the snapshots for the specified project.
 * **Note**: This endpoint is currently in Beta.
 *
 * @param project_id - The Neon project ID
 */
export const listSnapshots = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListSnapshotsInput,
  outputSchema: ListSnapshotsOutput,
}));
