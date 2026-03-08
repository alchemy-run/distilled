/**
 * Cloudflare IPS API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service ips
 */

import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import { API } from "../client";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import { type DefaultErrors } from "../errors";

// =============================================================================
// IP
// =============================================================================

export interface ListIPsRequest {}

export const ListIPsRequest = Schema.Struct({}).pipe(
  T.Http({ method: "GET", path: "/ips" }),
) as unknown as Schema.Schema<ListIPsRequest>;

export type ListIPsResponse =
  | { etag?: string; ipv4Cidrs?: string[]; ipv6Cidrs?: string[] }
  | {
      etag?: string;
      ipv4Cidrs?: string[];
      ipv6Cidrs?: string[];
      jdcloudCidrs?: string[];
    };

export const ListIPsResponse = Schema.Union([
  Schema.Struct({
    etag: Schema.optional(Schema.String),
    ipv4Cidrs: Schema.optional(Schema.Array(Schema.String)),
    ipv6Cidrs: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    Schema.encodeKeys({
      etag: "etag",
      ipv4Cidrs: "ipv4_cidrs",
      ipv6Cidrs: "ipv6_cidrs",
    }),
  ),
  Schema.Struct({
    etag: Schema.optional(Schema.String),
    ipv4Cidrs: Schema.optional(Schema.Array(Schema.String)),
    ipv6Cidrs: Schema.optional(Schema.Array(Schema.String)),
    jdcloudCidrs: Schema.optional(Schema.Array(Schema.String)),
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
> = API.make(() => ({
  input: ListIPsRequest,
  output: ListIPsResponse,
  errors: [],
}));
