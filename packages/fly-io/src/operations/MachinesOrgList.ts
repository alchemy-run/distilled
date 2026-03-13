import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const MachinesOrgListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  org_slug: Schema.String.pipe(T.PathParam()),
  include_deleted: Schema.optional(Schema.Boolean),
  region: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  updated_after: Schema.optional(Schema.String),
  cursor: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.Number),
}).pipe(T.Http({ method: "GET", path: "/orgs/{org_slug}/machines" }));
export type MachinesOrgListInput = typeof MachinesOrgListInput.Type;

// Output Schema
export const MachinesOrgListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  last_machine_id: Schema.optional(Schema.String),
  last_updated_at: Schema.optional(Schema.String),
  machines: Schema.optional(
    Schema.Array(
      Schema.Struct({
        app_id: Schema.optional(Schema.Number),
        app_name: Schema.optional(Schema.String),
        created_at: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        instance_id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        private_ip: Schema.optional(Schema.String),
        region: Schema.optional(Schema.String),
        state: Schema.optional(Schema.String),
        updated_at: Schema.optional(Schema.String),
      }),
    ),
  ),
  next_cursor: Schema.optional(Schema.String),
});
export type MachinesOrgListOutput = typeof MachinesOrgListOutput.Type;

// The operation
/**
 * List All Machines
 *
 * List all Machines associated with a specific organization. Machines are sorted by their `updated_at` timestamps, oldest to newest.
 * This API call represents "a point in time". Recent machine changes, including creations and destructions, may take time to propagate. When polling with `updated_after`, offset your timestamps to catch late-arriving events.
 *
 * @param org_slug - Fly Organization Slug
 * @param include_deleted - Include deleted machines
 * @param region - Region filter
 * @param state - Comma separated list of states to filter (created, started, stopped, suspended)
 * @param updated_after - Only return machines updated after this time. Timestamp must be in the RFC 3339 format
 * @param cursor - Pagination cursor from previous response (takes precedence over updated_after)
 * @param limit - The number of machines to fetch (max of 2000). This limit is advisory. Responses may be shorter, even when more machines remain. If omitted, the maximum is used
 */
export const MachinesOrgList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MachinesOrgListInput,
  outputSchema: MachinesOrgListOutput,
}));
