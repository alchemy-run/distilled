import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteSnapshotInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  snapshot_id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/projects/{project_id}/snapshots/{snapshot_id}",
  }),
);
export type DeleteSnapshotInput = typeof DeleteSnapshotInput.Type;

// Output Schema
export const DeleteSnapshotOutput = Schema.Void;
export type DeleteSnapshotOutput = typeof DeleteSnapshotOutput.Type;

// The operation
/**
 * Delete snapshot
 *
 * Delete the specified snapshot.
 * **Note**: This endpoint is currently in Beta.
 *
 * @param project_id - The Neon project ID
 * @param snapshot_id - The snapshot ID
 */
export const deleteSnapshot = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeleteSnapshotInput,
  outputSchema: DeleteSnapshotOutput,
}));
