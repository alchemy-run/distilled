import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetPostgresUpgradeStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    tracking_id: Schema.optional(Schema.String),
  }).pipe(T.Http({ method: "GET", path: "/v1/projects/{ref}/upgrade/status" }));
export type V1GetPostgresUpgradeStatusInput =
  typeof V1GetPostgresUpgradeStatusInput.Type;

// Output Schema
export const V1GetPostgresUpgradeStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    databaseUpgradeStatus: Schema.NullOr(
      Schema.Struct({
        initiated_at: Schema.String,
        latest_status_at: Schema.String,
        target_version: Schema.Number,
        error: Schema.optional(
          Schema.Literals([
            "1_upgraded_instance_launch_failed",
            "2_volume_detachchment_from_upgraded_instance_failed",
            "3_volume_attachment_to_original_instance_failed",
            "4_data_upgrade_initiation_failed",
            "5_data_upgrade_completion_failed",
            "6_volume_detachchment_from_original_instance_failed",
            "7_volume_attachment_to_upgraded_instance_failed",
            "8_upgrade_completion_failed",
            "9_post_physical_backup_failed",
          ]),
        ),
        progress: Schema.optional(
          Schema.Literals([
            "0_requested",
            "1_started",
            "2_launched_upgraded_instance",
            "3_detached_volume_from_upgraded_instance",
            "4_attached_volume_to_original_instance",
            "5_initiated_data_upgrade",
            "6_completed_data_upgrade",
            "7_detached_volume_from_original_instance",
            "8_attached_volume_to_upgraded_instance",
            "9_completed_upgrade",
            "10_completed_post_physical_backup",
          ]),
        ),
        status: Schema.Number,
      }),
    ),
  });
export type V1GetPostgresUpgradeStatusOutput =
  typeof V1GetPostgresUpgradeStatusOutput.Type;

// The operation
/**
 * [Beta] Gets the latest status of the project's upgrade
 *
 * @param ref - Project ref
 */
export const v1GetPostgresUpgradeStatus = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1GetPostgresUpgradeStatusInput,
    outputSchema: V1GetPostgresUpgradeStatusOutput,
  }),
);
