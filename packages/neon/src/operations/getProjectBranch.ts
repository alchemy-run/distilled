import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetProjectBranchInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/projects/{project_id}/branches/{branch_id}",
  }),
);
export type GetProjectBranchInput = typeof GetProjectBranchInput.Type;

// Output Schema
export const GetProjectBranchOutput = Schema.Struct({
  branch: Schema.Struct({
    id: Schema.String,
    project_id: Schema.String,
    parent_id: Schema.optional(Schema.String),
    parent_lsn: Schema.optional(Schema.String),
    parent_timestamp: Schema.optional(Schema.String),
    name: Schema.String,
    current_state: Schema.String,
    pending_state: Schema.optional(Schema.String),
    state_changed_at: Schema.String,
    logical_size: Schema.optional(Schema.Number),
    creation_source: Schema.String,
    primary: Schema.optional(Schema.Boolean),
    default: Schema.Boolean,
    protected: Schema.Boolean,
    cpu_used_sec: Schema.Number,
    compute_time_seconds: Schema.Number,
    active_time_seconds: Schema.Number,
    written_data_bytes: Schema.Number,
    data_transfer_bytes: Schema.Number,
    created_at: Schema.String,
    updated_at: Schema.String,
    ttl_interval_seconds: Schema.optional(Schema.Number),
    expires_at: Schema.optional(Schema.String),
    last_reset_at: Schema.optional(Schema.String),
    created_by: Schema.optional(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        image: Schema.optional(Schema.String),
      }),
    ),
    init_source: Schema.optional(Schema.String),
    restore_status: Schema.optional(Schema.String),
    restored_from: Schema.optional(Schema.String),
    restored_as: Schema.optional(Schema.String),
    restricted_actions: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.String,
          reason: Schema.String,
        }),
      ),
    ),
  }),
  annotation: Schema.Struct({
    object: Schema.Struct({
      type: Schema.String,
      id: Schema.String,
    }),
    value: Schema.Record(Schema.String, Schema.String),
    created_at: Schema.optional(Schema.String),
    updated_at: Schema.optional(Schema.String),
  }),
});
export type GetProjectBranchOutput = typeof GetProjectBranchOutput.Type;

// The operation
/**
 * Retrieve branch details
 *
 * Retrieves information about the specified branch.
 * You can obtain a `project_id` by listing the projects for your Neon account.
 * You can obtain a `branch_id` by listing the project's branches.
 * A `branch_id` value has a `br-` prefix.
 * Each Neon project is initially created with a root and default branch named `main`.
 * A project can contain one or more branches.
 * A parent branch is identified by a `parent_id` value, which is the `id` of the parent branch.
 * For related information, see [Manage branches](https://neon.tech/docs/manage/branches/).
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The branch ID
 */
export const getProjectBranch = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetProjectBranchInput,
  outputSchema: GetProjectBranchOutput,
}));
