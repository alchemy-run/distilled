/**
 * Cloudflare HOSTNAMES API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service hostnames
 */

import * as stream from "effect/Stream";
import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import { type DefaultErrors } from "../errors.ts";

// =============================================================================
// SettingTl
// =============================================================================

export interface GetSettingTlsRequest {
  settingId: "ciphers" | "min_tls_version" | "http2";
  /** Identifier. */
  zoneId: string;
}

export const GetSettingTlsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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

export interface GetSettingTlsResponse {
  result: {
    createdAt?: string | null;
    hostname?: string | null;
    status?: string | null;
    updatedAt?: string | null;
    value?: string | number | unknown | null;
  }[];
}

export const GetSettingTlsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      createdAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      hostname: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      status: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      updatedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      value: Schema.optional(
        Schema.Union([
          Schema.Union([Schema.String, Schema.Number, Schema.Unknown]),
          Schema.Null,
        ]),
      ),
    }).pipe(
      Schema.encodeKeys({
        createdAt: "created_at",
        hostname: "hostname",
        status: "status",
        updatedAt: "updated_at",
        value: "value",
      }),
    ),
  ),
}) as unknown as Schema.Schema<GetSettingTlsResponse>;

export type GetSettingTlsError = DefaultErrors;

export const getSettingTls: API.PaginatedOperationMethod<
  GetSettingTlsRequest,
  GetSettingTlsResponse,
  GetSettingTlsError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: GetSettingTlsRequest,
  ) => stream.Stream<
    GetSettingTlsResponse,
    GetSettingTlsError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: GetSettingTlsRequest) => stream.Stream<
    {
      createdAt?: string | null;
      hostname?: string | null;
      status?: string | null;
      updatedAt?: string | null;
      value?: string | number | unknown | null;
    },
    GetSettingTlsError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: GetSettingTlsRequest,
  output: GetSettingTlsResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

export interface PutSettingTlsRequest {
  settingId: "ciphers" | "min_tls_version" | "http2";
  hostname: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: The tls setting value. */
  value: string | number | unknown;
}

export const PutSettingTlsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  createdAt?: string | null;
  /** The hostname for which the tls settings are set. */
  hostname?: string | null;
  /** Deployment status for the given tls setting. */
  status?: string | null;
  /** This is the time the tls setting was updated. */
  updatedAt?: string | null;
  /** The tls setting value. */
  value?: string | number | unknown | null;
}

export const PutSettingTlsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  createdAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  hostname: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  status: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  updatedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  value: Schema.optional(
    Schema.Union([
      Schema.Union([Schema.String, Schema.Number, Schema.Unknown]),
      Schema.Null,
    ]),
  ),
})
  .pipe(
    Schema.encodeKeys({
      createdAt: "created_at",
      hostname: "hostname",
      status: "status",
      updatedAt: "updated_at",
      value: "value",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<PutSettingTlsResponse>;

export type PutSettingTlsError = DefaultErrors;

export const putSettingTls: API.OperationMethod<
  PutSettingTlsRequest,
  PutSettingTlsResponse,
  PutSettingTlsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const DeleteSettingTlsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  createdAt?: string | null;
  /** The hostname for which the tls settings are set. */
  hostname?: string | null;
  /** Deployment status for the given tls setting. */
  status?: string | null;
  /** This is the time the tls setting was updated. */
  updatedAt?: string | null;
  /** The tls setting value. */
  value?: string | number | unknown | null;
}

export const DeleteSettingTlsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    createdAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    hostname: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    status: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    updatedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    value: Schema.optional(
      Schema.Union([
        Schema.Union([Schema.String, Schema.Number, Schema.Unknown]),
        Schema.Null,
      ]),
    ),
  })
    .pipe(
      Schema.encodeKeys({
        createdAt: "created_at",
        hostname: "hostname",
        status: "status",
        updatedAt: "updated_at",
        value: "value",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<DeleteSettingTlsResponse>;

export type DeleteSettingTlsError = DefaultErrors;

export const deleteSettingTls: API.OperationMethod<
  DeleteSettingTlsRequest,
  DeleteSettingTlsResponse,
  DeleteSettingTlsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteSettingTlsRequest,
  output: DeleteSettingTlsResponse,
  errors: [],
}));
