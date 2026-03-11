import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const VolumeDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  app_name: Schema.String.pipe(T.PathParam()),
  volume_id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({ method: "DELETE", path: "/apps/{app_name}/volumes/{volume_id}" }),
);
export type VolumeDeleteInput = typeof VolumeDeleteInput.Type;

// Output Schema
export const VolumeDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
});
export type VolumeDeleteOutput = typeof VolumeDeleteOutput.Type;

// The operation
/**
 * Destroy Volume
 *
 * Delete a specific volume within an app by volume ID.
 *
 * @param app_name - Fly App Name
 * @param volume_id - Volume ID
 */
export const VolumeDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VolumeDeleteInput,
  outputSchema: VolumeDeleteOutput,
}));
