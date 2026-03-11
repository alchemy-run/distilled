/**
 * Cloudflare IPS API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service ips
 */

import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import { type DefaultErrors } from "../errors";

// =============================================================================
// IP
// =============================================================================

export interface ListIPsRequest {}

export const ListIPsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({ method: "GET", path: "/ips" }),
) as unknown as Schema.Schema<ListIPsRequest>;

export type ListIPsResponse =
  | {
      etag?: string | null;
      ipv4Cidrs?: string[] | null;
      ipv6Cidrs?: string[] | null;
    }
  | {
      etag?: string | null;
      ipv4Cidrs?: string[] | null;
      ipv6Cidrs?: string[] | null;
      jdcloudCidrs?: string[] | null;
    };

export const ListIPsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Union([
  Schema.Struct({
    etag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    ipv4Cidrs: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    ipv6Cidrs: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
  }).pipe(
    Schema.encodeKeys({
      etag: "etag",
      ipv4Cidrs: "ipv4_cidrs",
      ipv6Cidrs: "ipv6_cidrs",
    }),
  ),
  Schema.Struct({
    etag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    ipv4Cidrs: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    ipv6Cidrs: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    jdcloudCidrs: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
  }).pipe(
    Schema.encodeKeys({
      etag: "etag",
      ipv4Cidrs: "ipv4_cidrs",
      ipv6Cidrs: "ipv6_cidrs",
      jdcloudCidrs: "jdcloud_cidrs",
    }),
  ),
]) as unknown as Schema.Schema<ListIPsResponse>;

export type ListIPsError = DefaultErrors;

export const listIPs: API.OperationMethod<
  ListIPsRequest,
  ListIPsResponse,
  ListIPsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListIPsRequest,
  output: ListIPsResponse,
  errors: [],
}));
