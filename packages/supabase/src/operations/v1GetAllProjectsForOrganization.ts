import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetAllProjectsForOrganizationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    slug: Schema.String.pipe(T.PathParam()),
    offset: Schema.optional(Schema.Number),
    limit: Schema.optional(Schema.Number),
    search: Schema.optional(Schema.String),
    sort: Schema.optional(
      Schema.Literals(["name_asc", "name_desc", "created_asc", "created_desc"]),
    ),
    statuses: Schema.optional(Schema.String),
  }).pipe(T.Http({ method: "GET", path: "/v1/organizations/{slug}/projects" }));
export type V1GetAllProjectsForOrganizationInput =
  typeof V1GetAllProjectsForOrganizationInput.Type;

// Output Schema
export const V1GetAllProjectsForOrganizationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    projects: Schema.Array(
      Schema.Struct({
        ref: Schema.String,
        name: Schema.String,
        cloud_provider: Schema.String,
        region: Schema.String,
        is_branch: Schema.Boolean,
        status: Schema.Literals([
          "INACTIVE",
          "ACTIVE_HEALTHY",
          "ACTIVE_UNHEALTHY",
          "COMING_UP",
          "UNKNOWN",
          "GOING_DOWN",
          "INIT_FAILED",
          "REMOVED",
          "RESTORING",
          "UPGRADING",
          "PAUSING",
          "RESTORE_FAILED",
          "RESTARTING",
          "PAUSE_FAILED",
          "RESIZING",
        ]),
        inserted_at: Schema.String,
        databases: Schema.Array(
          Schema.Struct({
            infra_compute_size: Schema.optional(
              Schema.Literals([
                "pico",
                "nano",
                "micro",
                "small",
                "medium",
                "large",
                "xlarge",
                "2xlarge",
                "4xlarge",
                "8xlarge",
                "12xlarge",
                "16xlarge",
                "24xlarge",
                "24xlarge_optimized_memory",
                "24xlarge_optimized_cpu",
                "24xlarge_high_memory",
                "48xlarge",
                "48xlarge_optimized_memory",
                "48xlarge_optimized_cpu",
                "48xlarge_high_memory",
              ]),
            ),
            region: Schema.String,
            status: Schema.Literals([
              "ACTIVE_HEALTHY",
              "ACTIVE_UNHEALTHY",
              "COMING_UP",
              "GOING_DOWN",
              "INIT_FAILED",
              "REMOVED",
              "RESTORING",
              "UNKNOWN",
              "INIT_READ_REPLICA",
              "INIT_READ_REPLICA_FAILED",
              "RESTARTING",
              "RESIZING",
            ]),
            cloud_provider: Schema.String,
            identifier: Schema.String,
            type: Schema.Literals(["PRIMARY", "READ_REPLICA"]),
            disk_volume_size_gb: Schema.optional(Schema.Number),
            disk_type: Schema.optional(Schema.Literals(["gp3", "io2"])),
            disk_throughput_mbps: Schema.optional(Schema.Number),
            disk_last_modified_at: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
    pagination: Schema.Struct({
      count: Schema.Number,
      limit: Schema.Number,
      offset: Schema.Number,
    }),
  });
export type V1GetAllProjectsForOrganizationOutput =
  typeof V1GetAllProjectsForOrganizationOutput.Type;

// The operation
/**
 * Gets all projects for the given organization
 *
 * Returns a paginated list of projects for the specified organization.
 * This endpoint uses offset-based pagination. Use the `offset` parameter to skip a number of projects and the `limit` parameter to control the number of projects returned per page.
 *
 * @param slug - Organization slug
 * @param offset - Number of projects to skip
 * @param limit - Number of projects to return per page
 * @param search - Search projects by name
 * @param sort - Sort order for projects
 * @param statuses - A comma-separated list of project statuses to filter by.

The following values are supported: `ACTIVE_HEALTHY`, `INACTIVE`.
 */
export const v1GetAllProjectsForOrganization =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: V1GetAllProjectsForOrganizationInput,
    outputSchema: V1GetAllProjectsForOrganizationOutput,
  }));
