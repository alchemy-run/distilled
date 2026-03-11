/**
 * Cloudflare CONTENT-SCANNING API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service content-scanning
 */

import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import { type DefaultErrors } from "../errors.ts";

// =============================================================================
// ContentScanning
// =============================================================================

export interface GetContentScanningRequest {
  /** Defines an identifier. */
  zoneId: string;
}

export const GetContentScanningRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/zones/{zone_id}/content-upload-scan/settings",
    }),
  ) as unknown as Schema.Schema<GetContentScanningRequest>;

export interface GetContentScanningResponse {
  /** Defines the last modification date (ISO 8601) of the Content Scanning status. */
  modified?: string | null;
  /** Defines the status of Content Scanning. */
  value?: string | null;
}

export const GetContentScanningResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    modified: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }) as unknown as Schema.Schema<GetContentScanningResponse>;

export type GetContentScanningError = DefaultErrors;

export const getContentScanning: API.OperationMethod<
  GetContentScanningRequest,
  GetContentScanningResponse,
  GetContentScanningError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const CreateContentScanningRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  modified?: string | null;
  /** Defines the status of Content Scanning. */
  value?: string | null;
}

export const CreateContentScanningResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    modified: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }) as unknown as Schema.Schema<CreateContentScanningResponse>;

export type CreateContentScanningError = DefaultErrors;

export const createContentScanning: API.OperationMethod<
  CreateContentScanningRequest,
  CreateContentScanningResponse,
  CreateContentScanningError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const PutContentScanningRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  modified?: string | null;
  /** Defines the status of Content Scanning. */
  value?: string | null;
}

export const PutContentScanningResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    modified: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }) as unknown as Schema.Schema<PutContentScanningResponse>;

export type PutContentScanningError = DefaultErrors;

export const putContentScanning: API.OperationMethod<
  PutContentScanningRequest,
  PutContentScanningResponse,
  PutContentScanningError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutContentScanningRequest,
  output: PutContentScanningResponse,
  errors: [],
}));

export interface EnableContentScanningRequest {
  /** Defines an identifier. */
  zoneId: string;
}

export const EnableContentScanningRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/zones/{zone_id}/content-upload-scan/enable",
    }),
  ) as unknown as Schema.Schema<EnableContentScanningRequest>;

export type EnableContentScanningResponse = unknown;

export const EnableContentScanningResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<EnableContentScanningResponse>;

export type EnableContentScanningError = DefaultErrors;

export const enableContentScanning: API.OperationMethod<
  EnableContentScanningRequest,
  EnableContentScanningResponse,
  EnableContentScanningError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: EnableContentScanningRequest,
  output: EnableContentScanningResponse,
  errors: [],
}));

export interface DisableContentScanningRequest {
  /** Defines an identifier. */
  zoneId: string;
}

export const DisableContentScanningRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/zones/{zone_id}/content-upload-scan/disable",
    }),
  ) as unknown as Schema.Schema<DisableContentScanningRequest>;

export type DisableContentScanningResponse = unknown;

export const DisableContentScanningResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<DisableContentScanningResponse>;

export type DisableContentScanningError = DefaultErrors;

export const disableContentScanning: API.OperationMethod<
  DisableContentScanningRequest,
  DisableContentScanningResponse,
  DisableContentScanningError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const ListPayloadsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/content-upload-scan/payloads",
  }),
) as unknown as Schema.Schema<ListPayloadsRequest>;

export type ListPayloadsResponse = {
  id?: string | null;
  payload?: string | null;
}[];

export const ListPayloadsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    payload: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }),
) as unknown as Schema.Schema<ListPayloadsResponse>;

export type ListPayloadsError = DefaultErrors;

export const listPayloads: API.OperationMethod<
  ListPayloadsRequest,
  ListPayloadsResponse,
  ListPayloadsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const CreatePayloadRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Array(
    Schema.Struct({
      payload: Schema.String,
    }),
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "/zones/{zone_id}/content-upload-scan/payloads",
  }),
) as unknown as Schema.Schema<CreatePayloadRequest>;

export type CreatePayloadResponse = {
  id?: string | null;
  payload?: string | null;
}[];

export const CreatePayloadResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    payload: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }),
) as unknown as Schema.Schema<CreatePayloadResponse>;

export type CreatePayloadError = DefaultErrors;

export const createPayload: API.OperationMethod<
  CreatePayloadRequest,
  CreatePayloadResponse,
  CreatePayloadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreatePayloadRequest,
  output: CreatePayloadResponse,
  errors: [],
}));

export interface DeletePayloadRequest {
  expressionId: string;
  /** Defines an identifier. */
  zoneId: string;
}

export const DeletePayloadRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  expressionId: Schema.String.pipe(T.HttpPath("expressionId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/zones/{zone_id}/content-upload-scan/payloads/{expressionId}",
  }),
) as unknown as Schema.Schema<DeletePayloadRequest>;

export type DeletePayloadResponse = {
  id?: string | null;
  payload?: string | null;
}[];

export const DeletePayloadResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    payload: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }),
) as unknown as Schema.Schema<DeletePayloadResponse>;

export type DeletePayloadError = DefaultErrors;

export const deletePayload: API.OperationMethod<
  DeletePayloadRequest,
  DeletePayloadResponse,
  DeletePayloadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const GetSettingRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/content-upload-scan/settings",
  }),
) as unknown as Schema.Schema<GetSettingRequest>;

export interface GetSettingResponse {
  /** Defines the last modification date (ISO 8601) of the Content Scanning status. */
  modified?: string | null;
  /** Defines the status of Content Scanning. */
  value?: string | null;
}

export const GetSettingResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  modified: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}) as unknown as Schema.Schema<GetSettingResponse>;

export type GetSettingError = DefaultErrors;

export const getSetting: API.OperationMethod<
  GetSettingRequest,
  GetSettingResponse,
  GetSettingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSettingRequest,
  output: GetSettingResponse,
  errors: [],
}));
