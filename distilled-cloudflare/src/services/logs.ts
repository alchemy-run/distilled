/**
 * Cloudflare LOGS API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service logs
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
// ControlCmbConfig
// =============================================================================

export interface GetControlCmbConfigRequest {
  /** Identifier. */
  accountId: string;
}

export const GetControlCmbConfigRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/logs/control/cmb/config",
  }),
) as unknown as Schema.Schema<GetControlCmbConfigRequest>;

export interface GetControlCmbConfigResponse {
  /** Allow out of region access */
  allowOutOfRegionAccess?: boolean;
  /** Name of the region. */
  regions?: string;
}

export const GetControlCmbConfigResponse = Schema.Struct({
  allowOutOfRegionAccess: Schema.optional(Schema.Boolean),
  regions: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    allowOutOfRegionAccess: "allow_out_of_region_access",
    regions: "regions",
  }),
) as unknown as Schema.Schema<GetControlCmbConfigResponse>;

export const getControlCmbConfig: API.OperationMethod<
  GetControlCmbConfigRequest,
  GetControlCmbConfigResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetControlCmbConfigRequest,
  output: GetControlCmbConfigResponse,
  errors: [],
}));

export interface CreateControlCmbConfigRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: Allow out of region access */
  allowOutOfRegionAccess?: boolean;
  /** Body param: Name of the region. */
  regions?: string;
}

export const CreateControlCmbConfigRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  allowOutOfRegionAccess: Schema.optional(Schema.Boolean),
  regions: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    allowOutOfRegionAccess: "allow_out_of_region_access",
    regions: "regions",
  }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/logs/control/cmb/config",
  }),
) as unknown as Schema.Schema<CreateControlCmbConfigRequest>;

export interface CreateControlCmbConfigResponse {
  /** Allow out of region access */
  allowOutOfRegionAccess?: boolean;
  /** Name of the region. */
  regions?: string;
}

export const CreateControlCmbConfigResponse = Schema.Struct({
  allowOutOfRegionAccess: Schema.optional(Schema.Boolean),
  regions: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    allowOutOfRegionAccess: "allow_out_of_region_access",
    regions: "regions",
  }),
) as unknown as Schema.Schema<CreateControlCmbConfigResponse>;

export const createControlCmbConfig: API.OperationMethod<
  CreateControlCmbConfigRequest,
  CreateControlCmbConfigResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateControlCmbConfigRequest,
  output: CreateControlCmbConfigResponse,
  errors: [],
}));

export interface DeleteControlCmbConfigRequest {
  /** Identifier. */
  accountId: string;
}

export const DeleteControlCmbConfigRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/logs/control/cmb/config",
  }),
) as unknown as Schema.Schema<DeleteControlCmbConfigRequest>;

export type DeleteControlCmbConfigResponse = unknown;

export const DeleteControlCmbConfigResponse =
  Schema.Unknown as unknown as Schema.Schema<DeleteControlCmbConfigResponse>;

export const deleteControlCmbConfig: API.OperationMethod<
  DeleteControlCmbConfigRequest,
  DeleteControlCmbConfigResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteControlCmbConfigRequest,
  output: DeleteControlCmbConfigResponse,
  errors: [],
}));

// =============================================================================
// ControlRetention
// =============================================================================

export interface GetControlRetentionRequest {
  /** Identifier. */
  zoneId: string;
}

export const GetControlRetentionRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/logs/control/retention/flag",
  }),
) as unknown as Schema.Schema<GetControlRetentionRequest>;

export interface GetControlRetentionResponse {
  /** The log retention flag for Logpull API. */
  flag?: boolean;
}

export const GetControlRetentionResponse = Schema.Struct({
  flag: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<GetControlRetentionResponse>;

export const getControlRetention: API.OperationMethod<
  GetControlRetentionRequest,
  GetControlRetentionResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetControlRetentionRequest,
  output: GetControlRetentionResponse,
  errors: [],
}));

export interface CreateControlRetentionRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: The log retention flag for Logpull API. */
  flag?: boolean;
}

export const CreateControlRetentionRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  flag: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "POST",
    path: "/zones/{zone_id}/logs/control/retention/flag",
  }),
) as unknown as Schema.Schema<CreateControlRetentionRequest>;

export interface CreateControlRetentionResponse {
  /** The log retention flag for Logpull API. */
  flag?: boolean;
}

export const CreateControlRetentionResponse = Schema.Struct({
  flag: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<CreateControlRetentionResponse>;

export const createControlRetention: API.OperationMethod<
  CreateControlRetentionRequest,
  CreateControlRetentionResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateControlRetentionRequest,
  output: CreateControlRetentionResponse,
  errors: [],
}));

// =============================================================================
// Rayid
// =============================================================================

export interface GetRayidRequest {
  rayID: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Query param: The `/received` route by default returns a limited set of fields, and allows customers to override the default field set by specifying individual fields. The reasons for this are: 1. Most */
  fields?: string;
  /** Query param: By default, timestamps in responses are returned as Unix nanosecond integers. The `?timestamps=` argument can be set to change the format in which response timestamps are returned. Possib */
  timestamps?: "unix" | "unixnano" | "rfc3339";
}

export const GetRayidRequest = Schema.Struct({
  rayID: Schema.String.pipe(T.HttpPath("RayID")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  fields: Schema.optional(Schema.String).pipe(T.HttpQuery("fields")),
  timestamps: Schema.optional(
    Schema.Literals(["unix", "unixnano", "rfc3339"]),
  ).pipe(T.HttpQuery("timestamps")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/logs/rayids/{RayID}" }),
) as unknown as Schema.Schema<GetRayidRequest>;

export type GetRayidResponse = string;

export const GetRayidResponse =
  Schema.String as unknown as Schema.Schema<GetRayidResponse>;

export const getRayid: API.OperationMethod<
  GetRayidRequest,
  GetRayidResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetRayidRequest,
  output: GetRayidResponse,
  errors: [],
}));

// =============================================================================
// Received
// =============================================================================

export interface GetReceivedRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Query param: Sets the (exclusive) end of the requested time frame. This can be a unix timestamp (in seconds or nanoseconds), or an absolute timestamp that conforms to RFC 3339. `end` must be at least  */
  end: string | number;
  /** Query param: When `?count=` is provided, the response will contain up to `count` results. Since results are not sorted, you are likely to get different data for repeated requests. `count` must be an i */
  count?: number;
  /** Query param: The `/received` route by default returns a limited set of fields, and allows customers to override the default field set by specifying individual fields. The reasons for this are: 1. Most */
  fields?: string;
  /** Query param: When `?sample=` is provided, a sample of matching records is returned. If `sample=0.1` then 10% of records will be returned. Sampling is random: repeated calls will not only return differ */
  sample?: number;
  /** Query param: Sets the (inclusive) beginning of the requested time frame. This can be a unix timestamp (in seconds or nanoseconds), or an absolute timestamp that conforms to RFC 3339. At this point in  */
  start?: string | number;
  /** Query param: By default, timestamps in responses are returned as Unix nanosecond integers. The `?timestamps=` argument can be set to change the format in which response timestamps are returned. Possib */
  timestamps?: "unix" | "unixnano" | "rfc3339";
}

export const GetReceivedRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  end: Schema.Union([Schema.String, Schema.Number]).pipe(T.HttpQuery("end")),
  count: Schema.optional(Schema.Number).pipe(T.HttpQuery("count")),
  fields: Schema.optional(Schema.String).pipe(T.HttpQuery("fields")),
  sample: Schema.optional(Schema.Number).pipe(T.HttpQuery("sample")),
  start: Schema.optional(Schema.Union([Schema.String, Schema.Number])).pipe(
    T.HttpQuery("start"),
  ),
  timestamps: Schema.optional(
    Schema.Literals(["unix", "unixnano", "rfc3339"]),
  ).pipe(T.HttpQuery("timestamps")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/logs/received" }),
) as unknown as Schema.Schema<GetReceivedRequest>;

export type GetReceivedResponse = string;

export const GetReceivedResponse =
  Schema.String as unknown as Schema.Schema<GetReceivedResponse>;

export const getReceived: API.OperationMethod<
  GetReceivedRequest,
  GetReceivedResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetReceivedRequest,
  output: GetReceivedResponse,
  errors: [],
}));

// =============================================================================
// ReceivedField
// =============================================================================

export interface GetReceivedFieldRequest {
  /** Identifier. */
  zoneId: string;
}

export const GetReceivedFieldRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/logs/received/fields" }),
) as unknown as Schema.Schema<GetReceivedFieldRequest>;

export interface GetReceivedFieldResponse {
  key?: string;
}

export const GetReceivedFieldResponse = Schema.Struct({
  key: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<GetReceivedFieldResponse>;

export const getReceivedField: API.OperationMethod<
  GetReceivedFieldRequest,
  GetReceivedFieldResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetReceivedFieldRequest,
  output: GetReceivedFieldResponse,
  errors: [],
}));
