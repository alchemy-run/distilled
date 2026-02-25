/**
 * Cloudflare AUDIT-LOGS API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service audit-logs
 */

import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { ApiToken } from "../auth.ts";
import {
  type CommonErrors,
  UnknownCloudflareError,
  CloudflareNetworkError,
  CloudflareHttpError,
} from "../errors.ts";

// =============================================================================
// AuditLog
// =============================================================================

export interface ListAuditLogsRequest {
  /** Path param: Identifier */
  accountId: string;
  /** Query param: Finds a specific log by its ID. */
  id?: string;
  /** Query param: */
  action?: { type?: string };
  /** Query param: */
  actor?: { email?: string; ip?: string };
  /** Query param: Limits the returned results to logs older than the specified date. A `full-date` that conforms to RFC3339. */
  before?: unknown;
  /** Query param: Changes the direction of the chronological sorting. */
  direction?: "desc" | "asc";
  /** Query param: Indicates that this request is an export of logs in CSV format. */
  export?: boolean;
  /** Query param: Indicates whether or not to hide user level audit logs. */
  hideUserLogs?: boolean;
  /** Query param: Limits the returned results to logs newer than the specified date. A `full-date` that conforms to RFC3339. */
  since?: unknown;
  /** Query param: */
  zone?: { name?: string };
}

export const ListAuditLogsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  id: Schema.optional(Schema.String).pipe(T.HttpQuery("id")),
  action: Schema.optional(
    Schema.Struct({
      type: Schema.optional(Schema.String),
    }),
  ).pipe(T.HttpQuery("action")),
  actor: Schema.optional(
    Schema.Struct({
      email: Schema.optional(Schema.String),
      ip: Schema.optional(Schema.String),
    }),
  ).pipe(T.HttpQuery("actor")),
  before: Schema.optional(Schema.Unknown).pipe(T.HttpQuery("before")),
  direction: Schema.optional(Schema.Literals(["desc", "asc"])).pipe(
    T.HttpQuery("direction"),
  ),
  export: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("export")),
  hideUserLogs: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("hide_user_logs"),
  ),
  since: Schema.optional(Schema.Unknown).pipe(T.HttpQuery("since")),
  zone: Schema.optional(
    Schema.Struct({
      name: Schema.optional(Schema.String),
    }),
  ).pipe(T.HttpQuery("zone")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/audit_logs" }),
) as unknown as Schema.Schema<ListAuditLogsRequest>;

export type ListAuditLogsResponse = unknown;

export const ListAuditLogsResponse =
  Schema.Unknown as unknown as Schema.Schema<ListAuditLogsResponse>;

export const listAuditLogs: (
  input: ListAuditLogsRequest,
) => Effect.Effect<
  ListAuditLogsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListAuditLogsRequest,
  output: ListAuditLogsResponse,
  errors: [],
}));
