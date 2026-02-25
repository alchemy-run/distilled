/**
 * Cloudflare CONTENT-SCANNING API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service content-scanning
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

export const getContentScanning: API.OperationMethod<
  GetContentScanningRequest,
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
  value: Schema.Literals(["enabled", "disabled"]),
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

export const createContentScanning: API.OperationMethod<
  CreateContentScanningRequest,
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
  value: Schema.Literals(["enabled", "disabled"]),
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

export const putContentScanning: API.OperationMethod<
  PutContentScanningRequest,
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

export const enableContentScanning: API.OperationMethod<
  EnableContentScanningRequest,
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

export const disableContentScanning: API.OperationMethod<
  DisableContentScanningRequest,
  DisableContentScanningResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DisableContentScanningRequest,
  output: DisableContentScanningResponse,
  errors: [],
}));

// =============================================================================
// Payload
// =============================================================================

export interface ListPayloadsRequest {
  /** Defines an identifier. */
  zoneId: string;
}

export const ListPayloadsRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/content-upload-scan/payloads",
  }),
) as unknown as Schema.Schema<ListPayloadsRequest>;

export type ListPayloadsResponse = { id?: string; payload?: string }[];

export const ListPayloadsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    payload: Schema.optional(Schema.String),
  }),
) as unknown as Schema.Schema<ListPayloadsResponse>;

export const listPayloads: API.OperationMethod<
  ListPayloadsRequest,
  ListPayloadsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListPayloadsRequest,
  output: ListPayloadsResponse,
  errors: [],
}));

export interface CreatePayloadRequest {
  /** Path param: Defines an identifier. */
  zoneId: string;
  /** Body param: */
  body: { payload: string }[];
}

export const CreatePayloadRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Array(
    Schema.Struct({
      payload: Schema.String,
    }),
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/content-upload-scan/payloads",
  }),
) as unknown as Schema.Schema<CreatePayloadRequest>;

export type CreatePayloadResponse = { id?: string; payload?: string }[];

export const CreatePayloadResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    payload: Schema.optional(Schema.String),
  }),
) as unknown as Schema.Schema<CreatePayloadResponse>;

export const createPayload: API.OperationMethod<
  CreatePayloadRequest,
  CreatePayloadResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePayloadRequest,
  output: CreatePayloadResponse,
  errors: [],
}));

export interface DeletePayloadRequest {
  expressionId: string;
  /** Defines an identifier. */
  zoneId: string;
}

export const DeletePayloadRequest = Schema.Struct({
  expressionId: Schema.String.pipe(T.HttpPath("expressionId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/content-upload-scan/payloads/{expressionId}",
  }),
) as unknown as Schema.Schema<DeletePayloadRequest>;

export type DeletePayloadResponse = { id?: string; payload?: string }[];

export const DeletePayloadResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    payload: Schema.optional(Schema.String),
  }),
) as unknown as Schema.Schema<DeletePayloadResponse>;

export const deletePayload: API.OperationMethod<
  DeletePayloadRequest,
  DeletePayloadResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletePayloadRequest,
  output: DeletePayloadResponse,
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

export const getSetting: API.OperationMethod<
  GetSettingRequest,
  GetSettingResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSettingRequest,
  output: GetSettingResponse,
  errors: [],
}));
