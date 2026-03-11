import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const VolumesGetByIdInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  app_name: Schema.String.pipe(T.PathParam()),
  volume_id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({ method: "GET", path: "/apps/{app_name}/volumes/{volume_id}" }),
);
export type VolumesGetByIdInput = typeof VolumesGetByIdInput.Type;

// Output Schema
export const VolumesGetByIdOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type VolumesGetByIdOutput = typeof VolumesGetByIdOutput.Type;

// The operation
/**
 * Get Volume
 *
 * Retrieve details about a specific volume by its ID within an app.
 *
 * @param app_name - Fly App Name
 * @param volume_id - Volume ID
 */
export const VolumesGetById = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VolumesGetByIdInput,
  outputSchema: VolumesGetByIdOutput,
}));
