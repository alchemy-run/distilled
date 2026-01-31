/**
 * Cloudflare CONTENT-SCANNING API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service content-scanning
 */

import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import type { HttpClient } from "@effect/platform";
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
// ContentScanning
// =============================================================================

export interface GetContentScanningRequest {
  /** Defines an identifier. */
  zoneId: string;
}

export const GetContentScanningRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/content-upload-scan/settings",
  }),
) as unknown as Schema.Schema<GetContentScanningRequest>;

export interface GetContentScanningResponse {
  /** Defines the last modification date (ISO 8601) of the Content Scanning status. */
  modified?: string;
  /** Defines the status of Content Scanning. */
  value?: string;
}

export const GetContentScanningResponse = Schema.Struct({
  modified: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<GetContentScanningResponse>;

export const getContentScanning: (
  input: GetContentScanningRequest,
) => Effect.Effect<
  GetContentScanningResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetContentScanningRequest,
  output: GetContentScanningResponse,
  errors: [],
}));

export interface CreateContentScanningRequest {
  /** Path param: Defines an identifier. */
  zoneId: string;
  /** Body param: The status value for Content Scanning. */
  value: "enabled" | "disabled";
}

export const CreateContentScanningRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  value: Schema.Literal("enabled", "disabled"),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/zones/{zone_id}/content-upload-scan/settings",
  }),
) as unknown as Schema.Schema<CreateContentScanningRequest>;

export interface CreateContentScanningResponse {
  /** Defines the last modification date (ISO 8601) of the Content Scanning status. */
  modified?: string;
  /** Defines the status of Content Scanning. */
  value?: string;
}

export const CreateContentScanningResponse = Schema.Struct({
  modified: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<CreateContentScanningResponse>;

export const createContentScanning: (
  input: CreateContentScanningRequest,
) => Effect.Effect<
  CreateContentScanningResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateContentScanningRequest,
  output: CreateContentScanningResponse,
  errors: [],
}));

export interface PutContentScanningRequest {
  /** Path param: Defines an identifier. */
  zoneId: string;
  /** Body param: The status value for Content Scanning. */
  value: "enabled" | "disabled";
}

export const PutContentScanningRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  value: Schema.Literal("enabled", "disabled"),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/zones/{zone_id}/content-upload-scan/settings",
  }),
) as unknown as Schema.Schema<PutContentScanningRequest>;

export interface PutContentScanningResponse {
  /** Defines the last modification date (ISO 8601) of the Content Scanning status. */
  modified?: string;
  /** Defines the status of Content Scanning. */
  value?: string;
}

export const PutContentScanningResponse = Schema.Struct({
  modified: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<PutContentScanningResponse>;

export const putContentScanning: (
  input: PutContentScanningRequest,
) => Effect.Effect<
  PutContentScanningResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutContentScanningRequest,
  output: PutContentScanningResponse,
  errors: [],
}));

export interface EnableContentScanningRequest {
  /** Defines an identifier. */
  zoneId: string;
}

export const EnableContentScanningRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "POST",
    path: "/zones/{zone_id}/content-upload-scan/enable",
  }),
) as unknown as Schema.Schema<EnableContentScanningRequest>;

export type EnableContentScanningResponse = unknown;

export const EnableContentScanningResponse =
  Schema.Unknown as unknown as Schema.Schema<EnableContentScanningResponse>;

export const enableContentScanning: (
  input: EnableContentScanningRequest,
) => Effect.Effect<
  EnableContentScanningResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: EnableContentScanningRequest,
  output: EnableContentScanningResponse,
  errors: [],
}));

export interface DisableContentScanningRequest {
  /** Defines an identifier. */
  zoneId: string;
}

export const DisableContentScanningRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "POST",
    path: "/zones/{zone_id}/content-upload-scan/disable",
  }),
) as unknown as Schema.Schema<DisableContentScanningRequest>;

export type DisableContentScanningResponse = unknown;

export const DisableContentScanningResponse =
  Schema.Unknown as unknown as Schema.Schema<DisableContentScanningResponse>;

export const disableContentScanning: (
  input: DisableContentScanningRequest,
) => Effect.Effect<
  DisableContentScanningResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DisableContentScanningRequest,
  output: DisableContentScanningResponse,
  errors: [],
}));

// =============================================================================
// Setting
// =============================================================================

export interface GetSettingRequest {
  /** Defines an identifier. */
  zoneId: string;
}

export const GetSettingRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/content-upload-scan/settings",
  }),
) as unknown as Schema.Schema<GetSettingRequest>;

export interface GetSettingResponse {
  /** Defines the last modification date (ISO 8601) of the Content Scanning status. */
  modified?: string;
  /** Defines the status of Content Scanning. */
  value?: string;
}

export const GetSettingResponse = Schema.Struct({
  modified: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<GetSettingResponse>;

export const getSetting: (
  input: GetSettingRequest,
) => Effect.Effect<
  GetSettingResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSettingRequest,
  output: GetSettingResponse,
  errors: [],
}));
