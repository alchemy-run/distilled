import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdateSnapshotInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  snapshot_id: Schema.String.pipe(T.PathParam()),
  snapshot: Schema.Struct({
    name: Schema.optional(Schema.String),
  }),
}).pipe(T.Http({ method: "PATCH", path: "/projects/{project_id}/snapshots/{snapshot_id}" }));
export type UpdateSnapshotInput = typeof UpdateSnapshotInput.Type;

// Output Schema
export const UpdateSnapshotOutput = Schema.Struct({
  snapshot: Schema.Struct({
    id: Schema.String,
    name: Schema.String,
    lsn: Schema.optional(Schema.String),
    timestamp: Schema.optional(Schema.String),
    source_branch_id: Schema.optional(Schema.String),
    created_at: Schema.String,
    expires_at: Schema.optional(Schema.String),
    manual: Schema.optional(Schema.Boolean),
  }),
});
export type UpdateSnapshotOutput = typeof UpdateSnapshotOutput.Type;

// The operation
/**
 * Update snapshot
 *
 * Update the specified snapshot.
 * **Note**: This endpoint is currently in Beta.
 *
 * @param project_id - The Neon project ID
 * @param snapshot_id - The snapshot ID
 */
export const updateSnapshot = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdateSnapshotInput,
  outputSchema: UpdateSnapshotOutput,
}));
