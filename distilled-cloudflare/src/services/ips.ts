/**
 * Cloudflare IPS API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service ips
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
// IP
// =============================================================================

export interface ListIPsRequest {}

export const ListIPsRequest = Schema.Struct({}).pipe(
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

export const ListIPsResponse = Schema.Union([
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

export type ListIPsError = CommonErrors;

export const listIPs: API.OperationMethod<
  ListIPsRequest,
  ListIPsResponse,
  ListIPsError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListIPsRequest,
  output: ListIPsResponse,
  errors: [],
}));
