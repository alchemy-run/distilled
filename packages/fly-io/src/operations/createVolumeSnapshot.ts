import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateVolumeSnapshotInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    app_name: Schema.String.pipe(T.PathParam()),
    volume_id: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apps/{app_name}/volumes/{volume_id}/snapshots",
    }),
  );
export type CreateVolumeSnapshotInput = typeof CreateVolumeSnapshotInput.Type;

// Output Schema
export const CreateVolumeSnapshotOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CreateVolumeSnapshotOutput = typeof CreateVolumeSnapshotOutput.Type;

// The operation
/**
 * Create Snapshot
 *
 * Create a snapshot for a specific volume within an app.
 *
 * @param app_name - Fly App Name
 * @param volume_id - Volume ID
 */
export const createVolumeSnapshot = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CreateVolumeSnapshotInput,
    outputSchema: CreateVolumeSnapshotOutput,
  }),
);
