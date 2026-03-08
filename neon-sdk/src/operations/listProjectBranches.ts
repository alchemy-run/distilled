import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListProjectBranchesInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  search: Schema.optional(Schema.String),
  sort_by: Schema.optional(
    Schema.Literals(["name", "created_at", "updated_at"]),
  ),
  cursor: Schema.optional(Schema.String),
  sort_order: Schema.optional(Schema.Literals(["asc", "desc"])),
  limit: Schema.optional(Schema.Number),
}).pipe(T.Http({ method: "GET", path: "/projects/{project_id}/branches" }));
export type ListProjectBranchesInput = typeof ListProjectBranchesInput.Type;

// Output Schema
export const ListProjectBranchesOutput = Schema.Struct({
  branches: Schema.Array(
    Schema.Struct({
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
  ),
  annotations: Schema.Record(
    Schema.String,
    Schema.Struct({
      object: Schema.Struct({
        type: Schema.String,
        id: Schema.String,
      }),
      value: Schema.Record(Schema.String, Schema.String),
      created_at: Schema.optional(Schema.String),
      updated_at: Schema.optional(Schema.String),
    }),
  ),
  pagination: Schema.optional(
    Schema.Struct({
      next: Schema.optional(Schema.String),
      sort_by: Schema.optional(Schema.String),
      sort_order: Schema.optional(Schema.String),
    }),
  ),
});
export type ListProjectBranchesOutput = typeof ListProjectBranchesOutput.Type;

// The operation
/**
 * List branches
 *
 * Retrieves a list of branches for the specified project.
 * You can obtain a `project_id` by listing the projects for your Neon account.
 * Each Neon project has a root branch named `main`.
 * A `branch_id` value has a `br-` prefix.
 * A project may contain child branches that were branched from `main` or from another branch.
 * A parent branch is identified by the `parent_id` value, which is the `id` of the parent branch.
 * For related information, see [Manage branches](https://neon.tech/docs/manage/branches/).
 *
 * @param project_id - The Neon project ID
 * @param search - Search by branch `name` or `id`. You can specify partial `name` or `id` values to filter results.
 * @param sort_by - Sort the branches by sort_field. If not provided, branches will be sorted by updated_at descending order
 * @param cursor - A cursor to use in pagination. A cursor defines your place in the data list. Include `response.pagination.next` in subsequent API calls to fetch next page of the list.
 * @param sort_order - Defines the sorting order of entities.
 * @param limit - The maximum number of records to be returned in the response
 */
export const listProjectBranches = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListProjectBranchesInput,
  outputSchema: ListProjectBranchesOutput,
}));
