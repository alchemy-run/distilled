/**
 * Cloudflare HOSTNAMES API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service hostnames
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
// SettingTl
// =============================================================================

export interface GetSettingTlsRequest {
  settingId: "ciphers" | "min_tls_version" | "http2";
  /** Identifier. */
  zoneId: string;
}

export const GetSettingTlsRequest = Schema.Struct({
  settingId: Schema.Literals(["ciphers", "min_tls_version", "http2"]).pipe(
    T.HttpPath("settingId"),
  ),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/hostnames/settings/{settingId}",
  }),
) as unknown as Schema.Schema<GetSettingTlsRequest>;

export type GetSettingTlsResponse = {
  createdAt?: string;
  hostname?: string;
  status?: string;
  updatedAt?: string;
  value?: string | number | unknown;
}[];

export const GetSettingTlsResponse = Schema.Array(
  Schema.Struct({
    createdAt: Schema.optional(Schema.String),
    hostname: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    updatedAt: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Union([Schema.String, Schema.Number, Schema.Unknown]),
    ),
  }).pipe(
    Schema.encodeKeys({ createdAt: "created_at", updatedAt: "updated_at" }),
  ),
) as unknown as Schema.Schema<GetSettingTlsResponse>;

export const getSettingTls: (
  input: GetSettingTlsRequest,
) => Effect.Effect<
  GetSettingTlsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSettingTlsRequest,
  output: GetSettingTlsResponse,
  errors: [],
}));

export interface PutSettingTlsRequest {
  settingId: "ciphers" | "min_tls_version" | "http2";
  hostname: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: The tls setting value. */
  value: string | number | unknown;
}

export const PutSettingTlsRequest = Schema.Struct({
  settingId: Schema.Literals(["ciphers", "min_tls_version", "http2"]).pipe(
    T.HttpPath("settingId"),
  ),
  hostname: Schema.String.pipe(T.HttpPath("hostname")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  value: Schema.Union([Schema.String, Schema.Number, Schema.Unknown]),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/zones/{zone_id}/hostnames/settings/{settingId}/{hostname}",
  }),
) as unknown as Schema.Schema<PutSettingTlsRequest>;

export interface PutSettingTlsResponse {
  /** This is the time the tls setting was originally created for this hostname. */
  createdAt?: string;
  /** The hostname for which the tls settings are set. */
  hostname?: string;
  /** Deployment status for the given tls setting. */
  status?: string;
  /** This is the time the tls setting was updated. */
  updatedAt?: string;
  /** The tls setting value. */
  value?: string | number | unknown;
}

export const PutSettingTlsResponse = Schema.Struct({
  createdAt: Schema.optional(Schema.String),
  hostname: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  updatedAt: Schema.optional(Schema.String),
  value: Schema.optional(
    Schema.Union([Schema.String, Schema.Number, Schema.Unknown]),
  ),
}).pipe(
  Schema.encodeKeys({ createdAt: "created_at", updatedAt: "updated_at" }),
) as unknown as Schema.Schema<PutSettingTlsResponse>;

export const putSettingTls: (
  input: PutSettingTlsRequest,
) => Effect.Effect<
  PutSettingTlsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutSettingTlsRequest,
  output: PutSettingTlsResponse,
  errors: [],
}));

export interface DeleteSettingTlsRequest {
  settingId: "ciphers" | "min_tls_version" | "http2";
  hostname: string;
  /** Identifier. */
  zoneId: string;
}

export const DeleteSettingTlsRequest = Schema.Struct({
  settingId: Schema.Literals(["ciphers", "min_tls_version", "http2"]).pipe(
    T.HttpPath("settingId"),
  ),
  hostname: Schema.String.pipe(T.HttpPath("hostname")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/zones/{zone_id}/hostnames/settings/{settingId}/{hostname}",
  }),
) as unknown as Schema.Schema<DeleteSettingTlsRequest>;

export interface DeleteSettingTlsResponse {
  /** This is the time the tls setting was originally created for this hostname. */
  createdAt?: string;
  /** The hostname for which the tls settings are set. */
  hostname?: string;
  /** Deployment status for the given tls setting. */
  status?: string;
  /** This is the time the tls setting was updated. */
  updatedAt?: string;
  /** The tls setting value. */
  value?: string | number | unknown;
}

export const DeleteSettingTlsResponse = Schema.Struct({
  createdAt: Schema.optional(Schema.String),
  hostname: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  updatedAt: Schema.optional(Schema.String),
  value: Schema.optional(
    Schema.Union([Schema.String, Schema.Number, Schema.Unknown]),
  ),
}).pipe(
  Schema.encodeKeys({ createdAt: "created_at", updatedAt: "updated_at" }),
) as unknown as Schema.Schema<DeleteSettingTlsResponse>;

export const deleteSettingTls: (
  input: DeleteSettingTlsRequest,
) => Effect.Effect<
  DeleteSettingTlsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteSettingTlsRequest,
  output: DeleteSettingTlsResponse,
  errors: [],
}));
