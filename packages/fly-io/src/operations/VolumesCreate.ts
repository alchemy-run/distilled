import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const VolumesCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  app_name: Schema.String.pipe(T.PathParam()),
  auto_backup_enabled: Schema.optional(Schema.Boolean),
  compute: Schema.optional(
    Schema.Struct({
      cpu_kind: Schema.optional(Schema.String),
      cpus: Schema.optional(Schema.Number),
      gpu_kind: Schema.optional(Schema.String),
      gpus: Schema.optional(Schema.Number),
      host_dedication_id: Schema.optional(Schema.String),
      kernel_args: Schema.optional(Schema.Array(Schema.String)),
      memory_mb: Schema.optional(Schema.Number),
      persist_rootfs: Schema.optional(
        Schema.Literals(["never", "always", "restart"]),
      ),
    }),
  ),
  compute_image: Schema.optional(Schema.String),
  encrypted: Schema.optional(Schema.Boolean),
  fstype: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  region: Schema.optional(Schema.String),
  require_unique_zone: Schema.optional(Schema.Boolean),
  size_gb: Schema.optional(Schema.Number),
  snapshot_id: Schema.optional(Schema.String),
  snapshot_retention: Schema.optional(Schema.Number),
  source_volume_id: Schema.optional(Schema.String),
  unique_zone_app_wide: Schema.optional(Schema.Boolean),
}).pipe(T.Http({ method: "POST", path: "/apps/{app_name}/volumes" }));
export type VolumesCreateInput = typeof VolumesCreateInput.Type;

// Output Schema
export const VolumesCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type VolumesCreateOutput = typeof VolumesCreateOutput.Type;

// The operation
/**
 * Create Volume
 *
 * Create a volume for a specific app using the details provided in the request body.
 *
 * @param app_name - Fly App Name
 */
export const VolumesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VolumesCreateInput,
  outputSchema: VolumesCreateOutput,
}));
