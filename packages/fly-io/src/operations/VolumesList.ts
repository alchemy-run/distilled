import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const VolumesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  app_name: Schema.String.pipe(T.PathParam()),
  summary: Schema.optional(Schema.Boolean),
}).pipe(T.Http({ method: "GET", path: "/apps/{app_name}/volumes" }));
export type VolumesListInput = typeof VolumesListInput.Type;

// Output Schema
export const VolumesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    attached_alloc_id: Schema.optional(Schema.String),
    attached_machine_id: Schema.optional(Schema.String),
    auto_backup_enabled: Schema.optional(Schema.Boolean),
    block_size: Schema.optional(Schema.Number),
    blocks: Schema.optional(Schema.Number),
    blocks_avail: Schema.optional(Schema.Number),
    blocks_free: Schema.optional(Schema.Number),
    bytes_total: Schema.optional(Schema.Number),
    bytes_used: Schema.optional(Schema.Number),
    created_at: Schema.optional(Schema.String),
    encrypted: Schema.optional(Schema.Boolean),
    fstype: Schema.optional(Schema.String),
    host_status: Schema.optional(
      Schema.Literals(["ok", "unknown", "unreachable"]),
    ),
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    region: Schema.optional(Schema.String),
    size_gb: Schema.optional(Schema.Number),
    snapshot_retention: Schema.optional(Schema.Number),
    state: Schema.optional(Schema.String),
    zone: Schema.optional(Schema.String),
  }),
);
export type VolumesListOutput = typeof VolumesListOutput.Type;

// The operation
/**
 * List Volumes
 *
 * List all volumes associated with a specific app.
 *
 * @param app_name - Fly App Name
 * @param summary - Only return summary info about volumes (omit blocks, block size, etc)
 */
export const VolumesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VolumesListInput,
  outputSchema: VolumesListOutput,
}));
