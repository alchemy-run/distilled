import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const ListAuditLogsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  starting_after: Schema.optional(Schema.String),
  ending_before: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.Number),
}).pipe(
  T.Http({ method: "GET", path: "/organizations/{organization}/audit-log" }),
);
export type ListAuditLogsInput = typeof ListAuditLogsInput.Type;

// Output Schema
export const ListAuditLogsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  has_next: Schema.Boolean,
  has_prev: Schema.Boolean,
  cursor_start: Schema.NullOr(Schema.String),
  cursor_end: Schema.NullOr(Schema.String),
  data: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      actor_id: Schema.String,
      actor_type: Schema.String,
      auditable_id: Schema.String,
      auditable_type: Schema.String,
      target_id: Schema.String,
      target_type: Schema.String,
      location: Schema.NullOr(Schema.String),
      target_display_name: Schema.String,
      audit_action: Schema.String,
      action: Schema.String,
      actor_display_name: Schema.String,
      auditable_display_name: Schema.String,
      remote_ip: Schema.NullOr(Schema.String),
      created_at: Schema.String,
      updated_at: Schema.String,
      metadata: Schema.Record(Schema.String, Schema.Unknown),
    }),
  ),
});
export type ListAuditLogsOutput = typeof ListAuditLogsOutput.Type;

// The operation
/**
 * List audit logs
 *
 * @param organization - The name of the organization
 * @param starting_after - If provided, returns results after the specified cursor
 * @param ending_before - If provided, returns results before the specified cursor
 * @param limit - If provided, specifies the number of returned results (max 100)
 */
export const listAuditLogs = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListAuditLogsInput,
  outputSchema: ListAuditLogsOutput,
  errors: [Forbidden, NotFound] as const,
}));
