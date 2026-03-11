import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const VolumesListSnapshotsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    app_name: Schema.String.pipe(T.PathParam()),
    volume_id: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/apps/{app_name}/volumes/{volume_id}/snapshots",
    }),
  );
export type VolumesListSnapshotsInput = typeof VolumesListSnapshotsInput.Type;

// Output Schema
export const VolumesListSnapshotsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
      created_at: Schema.optional(Schema.String),
      digest: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      retention_days: Schema.optional(Schema.Number),
      size: Schema.optional(Schema.Number),
      status: Schema.optional(Schema.String),
      volume_size: Schema.optional(Schema.Number),
    }),
  );
export type VolumesListSnapshotsOutput = typeof VolumesListSnapshotsOutput.Type;

// The operation
/**
 * List Snapshots
 *
 * List all snapshots for a specific volume within an app.
 *
 * @param app_name - Fly App Name
 * @param volume_id - Volume ID
 */
export const VolumesListSnapshots = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VolumesListSnapshotsInput,
    outputSchema: VolumesListSnapshotsOutput,
  }),
);
