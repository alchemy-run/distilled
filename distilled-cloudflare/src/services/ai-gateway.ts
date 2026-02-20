/**
 * Cloudflare AI-GATEWAY API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service ai-gateway
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
// AiGateway
// =============================================================================

export interface GetAiGatewayRequest {
  id: string;
  accountId: string;
}

export const GetAiGatewayRequest = Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/ai-gateway/gateways/{id}",
  }),
) as unknown as Schema.Schema<GetAiGatewayRequest>;

export interface GetAiGatewayResponse {
  /** gateway id */
  id: string;
  accountId: string;
  accountTag: string;
  cacheInvalidateOnUpdate: boolean;
  cacheTtl: number | null;
  collectLogs: boolean;
  createdAt: string;
  internalId: string;
  modifiedAt: string;
  rateLimitingInterval: number | null;
  rateLimitingLimit: number | null;
  rateLimitingTechnique: "fixed" | "sliding";
  authentication?: boolean;
  dlp?:
    | { action: "BLOCK" | "FLAG"; enabled: boolean; profiles: string[] }
    | {
        enabled: boolean;
        policies: {
          id: string;
          action: "FLAG" | "BLOCK";
          check: ("REQUEST" | "RESPONSE")[];
          enabled: boolean;
          profiles: string[];
        }[];
      };
  isDefault?: boolean;
  logManagement?: number | null;
  logManagementStrategy?: "STOP_INSERTING" | "DELETE_OLDEST" | null;
  logpush?: boolean;
  logpushPublicKey?: string | null;
  otel?:
    | { authorization: string; headers: Record<string, unknown>; url: string }[]
    | null;
  storeId?: string | null;
  stripe?: { authorization: string; usageEvents: { payload: string }[] } | null;
  zdr?: boolean;
}

export const GetAiGatewayResponse = Schema.Struct({
  id: Schema.String,
  accountId: Schema.String,
  accountTag: Schema.String,
  cacheInvalidateOnUpdate: Schema.Boolean,
  cacheTtl: Schema.Union([Schema.Number, Schema.Null]),
  collectLogs: Schema.Boolean,
  createdAt: Schema.String,
  internalId: Schema.String,
  modifiedAt: Schema.String,
  rateLimitingInterval: Schema.Union([Schema.Number, Schema.Null]),
  rateLimitingLimit: Schema.Union([Schema.Number, Schema.Null]),
  rateLimitingTechnique: Schema.Literals(["fixed", "sliding"]),
  authentication: Schema.optional(Schema.Boolean),
  dlp: Schema.optional(
    Schema.Union([
      Schema.Struct({
        action: Schema.Literals(["BLOCK", "FLAG"]),
        enabled: Schema.Boolean,
        profiles: Schema.Array(Schema.String),
      }),
      Schema.Struct({
        enabled: Schema.Boolean,
        policies: Schema.Array(
          Schema.Struct({
            id: Schema.String,
            action: Schema.Literals(["FLAG", "BLOCK"]),
            check: Schema.Array(Schema.Literals(["REQUEST", "RESPONSE"])),
            enabled: Schema.Boolean,
            profiles: Schema.Array(Schema.String),
          }),
        ),
      }),
    ]),
  ),
  isDefault: Schema.optional(Schema.Boolean),
  logManagement: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  logManagementStrategy: Schema.optional(
    Schema.Union([
      Schema.Literal("STOP_INSERTING"),
      Schema.Literal("DELETE_OLDEST"),
      Schema.Null,
    ]),
  ),
  logpush: Schema.optional(Schema.Boolean),
  logpushPublicKey: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  otel: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          authorization: Schema.String,
          headers: Schema.Struct({}),
          url: Schema.String,
        }),
      ),
      Schema.Null,
    ]),
  ),
  storeId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  stripe: Schema.optional(
    Schema.Union([
      Schema.Struct({
        authorization: Schema.String,
        usageEvents: Schema.Array(
          Schema.Struct({
            payload: Schema.String,
          }),
        ),
      }).pipe(Schema.encodeKeys({ usageEvents: "usage_events" })),
      Schema.Null,
    ]),
  ),
  zdr: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({
    accountId: "account_id",
    accountTag: "account_tag",
    cacheInvalidateOnUpdate: "cache_invalidate_on_update",
    cacheTtl: "cache_ttl",
    collectLogs: "collect_logs",
    createdAt: "created_at",
    internalId: "internal_id",
    modifiedAt: "modified_at",
    rateLimitingInterval: "rate_limiting_interval",
    rateLimitingLimit: "rate_limiting_limit",
    rateLimitingTechnique: "rate_limiting_technique",
    isDefault: "is_default",
    logManagement: "log_management",
    logManagementStrategy: "log_management_strategy",
    logpushPublicKey: "logpush_public_key",
    storeId: "store_id",
  }),
) as unknown as Schema.Schema<GetAiGatewayResponse>;

export const getAiGateway: (
  input: GetAiGatewayRequest,
) => Effect.Effect<
  GetAiGatewayResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAiGatewayRequest,
  output: GetAiGatewayResponse,
  errors: [],
}));

export interface CreateAiGatewayRequest {
  /** Path param: */
  accountId: string;
  /** Body param: gateway id */
  id: string;
  /** Body param: */
  cacheInvalidateOnUpdate: boolean;
  /** Body param: */
  cacheTtl: number | null;
  /** Body param: */
  collectLogs: boolean;
  /** Body param: */
  rateLimitingInterval: number | null;
  /** Body param: */
  rateLimitingLimit: number | null;
  /** Body param: */
  rateLimitingTechnique: "fixed" | "sliding";
  /** Body param: */
  authentication?: boolean;
  /** Body param: */
  isDefault?: boolean;
  /** Body param: */
  logManagement?: number | null;
  /** Body param: */
  logManagementStrategy?: "STOP_INSERTING" | "DELETE_OLDEST" | null;
  /** Body param: */
  logpush?: boolean;
  /** Body param: */
  logpushPublicKey?: string | null;
  /** Body param: */
  zdr?: boolean;
}

export const CreateAiGatewayRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  id: Schema.String,
  cacheInvalidateOnUpdate: Schema.Boolean,
  cacheTtl: Schema.Union([Schema.Number, Schema.Null]),
  collectLogs: Schema.Boolean,
  rateLimitingInterval: Schema.Union([Schema.Number, Schema.Null]),
  rateLimitingLimit: Schema.Union([Schema.Number, Schema.Null]),
  rateLimitingTechnique: Schema.Literals(["fixed", "sliding"]),
  authentication: Schema.optional(Schema.Boolean),
  isDefault: Schema.optional(Schema.Boolean),
  logManagement: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  logManagementStrategy: Schema.optional(
    Schema.Union([
      Schema.Literal("STOP_INSERTING"),
      Schema.Literal("DELETE_OLDEST"),
      Schema.Null,
    ]),
  ),
  logpush: Schema.optional(Schema.Boolean),
  logpushPublicKey: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  zdr: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({
    cacheInvalidateOnUpdate: "cache_invalidate_on_update",
    cacheTtl: "cache_ttl",
    collectLogs: "collect_logs",
    rateLimitingInterval: "rate_limiting_interval",
    rateLimitingLimit: "rate_limiting_limit",
    rateLimitingTechnique: "rate_limiting_technique",
    isDefault: "is_default",
    logManagement: "log_management",
    logManagementStrategy: "log_management_strategy",
    logpushPublicKey: "logpush_public_key",
  }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/ai-gateway/gateways",
  }),
) as unknown as Schema.Schema<CreateAiGatewayRequest>;

export interface CreateAiGatewayResponse {
  /** gateway id */
  id: string;
  accountId: string;
  accountTag: string;
  cacheInvalidateOnUpdate: boolean;
  cacheTtl: number | null;
  collectLogs: boolean;
  createdAt: string;
  internalId: string;
  modifiedAt: string;
  rateLimitingInterval: number | null;
  rateLimitingLimit: number | null;
  rateLimitingTechnique: "fixed" | "sliding";
  authentication?: boolean;
  dlp?:
    | { action: "BLOCK" | "FLAG"; enabled: boolean; profiles: string[] }
    | {
        enabled: boolean;
        policies: {
          id: string;
          action: "FLAG" | "BLOCK";
          check: ("REQUEST" | "RESPONSE")[];
          enabled: boolean;
          profiles: string[];
        }[];
      };
  isDefault?: boolean;
  logManagement?: number | null;
  logManagementStrategy?: "STOP_INSERTING" | "DELETE_OLDEST" | null;
  logpush?: boolean;
  logpushPublicKey?: string | null;
  otel?:
    | { authorization: string; headers: Record<string, unknown>; url: string }[]
    | null;
  storeId?: string | null;
  stripe?: { authorization: string; usageEvents: { payload: string }[] } | null;
  zdr?: boolean;
}

export const CreateAiGatewayResponse = Schema.Struct({
  id: Schema.String,
  accountId: Schema.String,
  accountTag: Schema.String,
  cacheInvalidateOnUpdate: Schema.Boolean,
  cacheTtl: Schema.Union([Schema.Number, Schema.Null]),
  collectLogs: Schema.Boolean,
  createdAt: Schema.String,
  internalId: Schema.String,
  modifiedAt: Schema.String,
  rateLimitingInterval: Schema.Union([Schema.Number, Schema.Null]),
  rateLimitingLimit: Schema.Union([Schema.Number, Schema.Null]),
  rateLimitingTechnique: Schema.Literals(["fixed", "sliding"]),
  authentication: Schema.optional(Schema.Boolean),
  dlp: Schema.optional(
    Schema.Union([
      Schema.Struct({
        action: Schema.Literals(["BLOCK", "FLAG"]),
        enabled: Schema.Boolean,
        profiles: Schema.Array(Schema.String),
      }),
      Schema.Struct({
        enabled: Schema.Boolean,
        policies: Schema.Array(
          Schema.Struct({
            id: Schema.String,
            action: Schema.Literals(["FLAG", "BLOCK"]),
            check: Schema.Array(Schema.Literals(["REQUEST", "RESPONSE"])),
            enabled: Schema.Boolean,
            profiles: Schema.Array(Schema.String),
          }),
        ),
      }),
    ]),
  ),
  isDefault: Schema.optional(Schema.Boolean),
  logManagement: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  logManagementStrategy: Schema.optional(
    Schema.Union([
      Schema.Literal("STOP_INSERTING"),
      Schema.Literal("DELETE_OLDEST"),
      Schema.Null,
    ]),
  ),
  logpush: Schema.optional(Schema.Boolean),
  logpushPublicKey: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  otel: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          authorization: Schema.String,
          headers: Schema.Struct({}),
          url: Schema.String,
        }),
      ),
      Schema.Null,
    ]),
  ),
  storeId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  stripe: Schema.optional(
    Schema.Union([
      Schema.Struct({
        authorization: Schema.String,
        usageEvents: Schema.Array(
          Schema.Struct({
            payload: Schema.String,
          }),
        ),
      }).pipe(Schema.encodeKeys({ usageEvents: "usage_events" })),
      Schema.Null,
    ]),
  ),
  zdr: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({
    accountId: "account_id",
    accountTag: "account_tag",
    cacheInvalidateOnUpdate: "cache_invalidate_on_update",
    cacheTtl: "cache_ttl",
    collectLogs: "collect_logs",
    createdAt: "created_at",
    internalId: "internal_id",
    modifiedAt: "modified_at",
    rateLimitingInterval: "rate_limiting_interval",
    rateLimitingLimit: "rate_limiting_limit",
    rateLimitingTechnique: "rate_limiting_technique",
    isDefault: "is_default",
    logManagement: "log_management",
    logManagementStrategy: "log_management_strategy",
    logpushPublicKey: "logpush_public_key",
    storeId: "store_id",
  }),
) as unknown as Schema.Schema<CreateAiGatewayResponse>;

export const createAiGateway: (
  input: CreateAiGatewayRequest,
) => Effect.Effect<
  CreateAiGatewayResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAiGatewayRequest,
  output: CreateAiGatewayResponse,
  errors: [],
}));

export interface UpdateAiGatewayRequest {
  id: string;
  /** Path param: */
  accountId: string;
  /** Body param: */
  cacheInvalidateOnUpdate: boolean;
  /** Body param: */
  cacheTtl: number | null;
  /** Body param: */
  collectLogs: boolean;
  /** Body param: */
  rateLimitingInterval: number | null;
  /** Body param: */
  rateLimitingLimit: number | null;
  /** Body param: */
  rateLimitingTechnique: "fixed" | "sliding";
  /** Body param: */
  authentication?: boolean;
  /** Body param: */
  dlp?:
    | { action: "BLOCK" | "FLAG"; enabled: boolean; profiles: string[] }
    | {
        enabled: boolean;
        policies: {
          id: string;
          action: "FLAG" | "BLOCK";
          check: ("REQUEST" | "RESPONSE")[];
          enabled: boolean;
          profiles: string[];
        }[];
      };
  /** Body param: */
  isDefault?: boolean;
  /** Body param: */
  logManagement?: number | null;
  /** Body param: */
  logManagementStrategy?: "STOP_INSERTING" | "DELETE_OLDEST" | null;
  /** Body param: */
  logpush?: boolean;
  /** Body param: */
  logpushPublicKey?: string | null;
  /** Body param: */
  otel?:
    | { authorization: string; headers: Record<string, unknown>; url: string }[]
    | null;
  /** Body param: */
  storeId?: string | null;
  /** Body param: */
  stripe?: { authorization: string; usageEvents: { payload: string }[] } | null;
  /** Body param: */
  zdr?: boolean;
}

export const UpdateAiGatewayRequest = Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  cacheInvalidateOnUpdate: Schema.Boolean,
  cacheTtl: Schema.Union([Schema.Number, Schema.Null]),
  collectLogs: Schema.Boolean,
  rateLimitingInterval: Schema.Union([Schema.Number, Schema.Null]),
  rateLimitingLimit: Schema.Union([Schema.Number, Schema.Null]),
  rateLimitingTechnique: Schema.Literals(["fixed", "sliding"]),
  authentication: Schema.optional(Schema.Boolean),
  dlp: Schema.optional(
    Schema.Union([
      Schema.Struct({
        action: Schema.Literals(["BLOCK", "FLAG"]),
        enabled: Schema.Boolean,
        profiles: Schema.Array(Schema.String),
      }),
      Schema.Struct({
        enabled: Schema.Boolean,
        policies: Schema.Array(
          Schema.Struct({
            id: Schema.String,
            action: Schema.Literals(["FLAG", "BLOCK"]),
            check: Schema.Array(Schema.Literals(["REQUEST", "RESPONSE"])),
            enabled: Schema.Boolean,
            profiles: Schema.Array(Schema.String),
          }),
        ),
      }),
    ]),
  ),
  isDefault: Schema.optional(Schema.Boolean),
  logManagement: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  logManagementStrategy: Schema.optional(
    Schema.Union([
      Schema.Literal("STOP_INSERTING"),
      Schema.Literal("DELETE_OLDEST"),
      Schema.Null,
    ]),
  ),
  logpush: Schema.optional(Schema.Boolean),
  logpushPublicKey: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  otel: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          authorization: Schema.String,
          headers: Schema.Struct({}),
          url: Schema.String,
        }),
      ),
      Schema.Null,
    ]),
  ),
  storeId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  stripe: Schema.optional(
    Schema.Union([
      Schema.Struct({
        authorization: Schema.String,
        usageEvents: Schema.Array(
          Schema.Struct({
            payload: Schema.String,
          }),
        ),
      }).pipe(Schema.encodeKeys({ usageEvents: "usage_events" })),
      Schema.Null,
    ]),
  ),
  zdr: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({
    cacheInvalidateOnUpdate: "cache_invalidate_on_update",
    cacheTtl: "cache_ttl",
    collectLogs: "collect_logs",
    rateLimitingInterval: "rate_limiting_interval",
    rateLimitingLimit: "rate_limiting_limit",
    rateLimitingTechnique: "rate_limiting_technique",
    isDefault: "is_default",
    logManagement: "log_management",
    logManagementStrategy: "log_management_strategy",
    logpushPublicKey: "logpush_public_key",
    storeId: "store_id",
  }),
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/ai-gateway/gateways/{id}",
  }),
) as unknown as Schema.Schema<UpdateAiGatewayRequest>;

export interface UpdateAiGatewayResponse {
  /** gateway id */
  id: string;
  accountId: string;
  accountTag: string;
  cacheInvalidateOnUpdate: boolean;
  cacheTtl: number | null;
  collectLogs: boolean;
  createdAt: string;
  internalId: string;
  modifiedAt: string;
  rateLimitingInterval: number | null;
  rateLimitingLimit: number | null;
  rateLimitingTechnique: "fixed" | "sliding";
  authentication?: boolean;
  dlp?:
    | { action: "BLOCK" | "FLAG"; enabled: boolean; profiles: string[] }
    | {
        enabled: boolean;
        policies: {
          id: string;
          action: "FLAG" | "BLOCK";
          check: ("REQUEST" | "RESPONSE")[];
          enabled: boolean;
          profiles: string[];
        }[];
      };
  isDefault?: boolean;
  logManagement?: number | null;
  logManagementStrategy?: "STOP_INSERTING" | "DELETE_OLDEST" | null;
  logpush?: boolean;
  logpushPublicKey?: string | null;
  otel?:
    | { authorization: string; headers: Record<string, unknown>; url: string }[]
    | null;
  storeId?: string | null;
  stripe?: { authorization: string; usageEvents: { payload: string }[] } | null;
  zdr?: boolean;
}

export const UpdateAiGatewayResponse = Schema.Struct({
  id: Schema.String,
  accountId: Schema.String,
  accountTag: Schema.String,
  cacheInvalidateOnUpdate: Schema.Boolean,
  cacheTtl: Schema.Union([Schema.Number, Schema.Null]),
  collectLogs: Schema.Boolean,
  createdAt: Schema.String,
  internalId: Schema.String,
  modifiedAt: Schema.String,
  rateLimitingInterval: Schema.Union([Schema.Number, Schema.Null]),
  rateLimitingLimit: Schema.Union([Schema.Number, Schema.Null]),
  rateLimitingTechnique: Schema.Literals(["fixed", "sliding"]),
  authentication: Schema.optional(Schema.Boolean),
  dlp: Schema.optional(
    Schema.Union([
      Schema.Struct({
        action: Schema.Literals(["BLOCK", "FLAG"]),
        enabled: Schema.Boolean,
        profiles: Schema.Array(Schema.String),
      }),
      Schema.Struct({
        enabled: Schema.Boolean,
        policies: Schema.Array(
          Schema.Struct({
            id: Schema.String,
            action: Schema.Literals(["FLAG", "BLOCK"]),
            check: Schema.Array(Schema.Literals(["REQUEST", "RESPONSE"])),
            enabled: Schema.Boolean,
            profiles: Schema.Array(Schema.String),
          }),
        ),
      }),
    ]),
  ),
  isDefault: Schema.optional(Schema.Boolean),
  logManagement: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  logManagementStrategy: Schema.optional(
    Schema.Union([
      Schema.Literal("STOP_INSERTING"),
      Schema.Literal("DELETE_OLDEST"),
      Schema.Null,
    ]),
  ),
  logpush: Schema.optional(Schema.Boolean),
  logpushPublicKey: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  otel: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          authorization: Schema.String,
          headers: Schema.Struct({}),
          url: Schema.String,
        }),
      ),
      Schema.Null,
    ]),
  ),
  storeId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  stripe: Schema.optional(
    Schema.Union([
      Schema.Struct({
        authorization: Schema.String,
        usageEvents: Schema.Array(
          Schema.Struct({
            payload: Schema.String,
          }),
        ),
      }).pipe(Schema.encodeKeys({ usageEvents: "usage_events" })),
      Schema.Null,
    ]),
  ),
  zdr: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({
    accountId: "account_id",
    accountTag: "account_tag",
    cacheInvalidateOnUpdate: "cache_invalidate_on_update",
    cacheTtl: "cache_ttl",
    collectLogs: "collect_logs",
    createdAt: "created_at",
    internalId: "internal_id",
    modifiedAt: "modified_at",
    rateLimitingInterval: "rate_limiting_interval",
    rateLimitingLimit: "rate_limiting_limit",
    rateLimitingTechnique: "rate_limiting_technique",
    isDefault: "is_default",
    logManagement: "log_management",
    logManagementStrategy: "log_management_strategy",
    logpushPublicKey: "logpush_public_key",
    storeId: "store_id",
  }),
) as unknown as Schema.Schema<UpdateAiGatewayResponse>;

export const updateAiGateway: (
  input: UpdateAiGatewayRequest,
) => Effect.Effect<
  UpdateAiGatewayResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateAiGatewayRequest,
  output: UpdateAiGatewayResponse,
  errors: [],
}));

export interface DeleteAiGatewayRequest {
  id: string;
  accountId: string;
}

export const DeleteAiGatewayRequest = Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/ai-gateway/gateways/{id}",
  }),
) as unknown as Schema.Schema<DeleteAiGatewayRequest>;

export interface DeleteAiGatewayResponse {
  /** gateway id */
  id: string;
  accountId: string;
  accountTag: string;
  cacheInvalidateOnUpdate: boolean;
  cacheTtl: number | null;
  collectLogs: boolean;
  createdAt: string;
  internalId: string;
  modifiedAt: string;
  rateLimitingInterval: number | null;
  rateLimitingLimit: number | null;
  rateLimitingTechnique: "fixed" | "sliding";
  authentication?: boolean;
  dlp?:
    | { action: "BLOCK" | "FLAG"; enabled: boolean; profiles: string[] }
    | {
        enabled: boolean;
        policies: {
          id: string;
          action: "FLAG" | "BLOCK";
          check: ("REQUEST" | "RESPONSE")[];
          enabled: boolean;
          profiles: string[];
        }[];
      };
  isDefault?: boolean;
  logManagement?: number | null;
  logManagementStrategy?: "STOP_INSERTING" | "DELETE_OLDEST" | null;
  logpush?: boolean;
  logpushPublicKey?: string | null;
  otel?:
    | { authorization: string; headers: Record<string, unknown>; url: string }[]
    | null;
  storeId?: string | null;
  stripe?: { authorization: string; usageEvents: { payload: string }[] } | null;
  zdr?: boolean;
}

export const DeleteAiGatewayResponse = Schema.Struct({
  id: Schema.String,
  accountId: Schema.String,
  accountTag: Schema.String,
  cacheInvalidateOnUpdate: Schema.Boolean,
  cacheTtl: Schema.Union([Schema.Number, Schema.Null]),
  collectLogs: Schema.Boolean,
  createdAt: Schema.String,
  internalId: Schema.String,
  modifiedAt: Schema.String,
  rateLimitingInterval: Schema.Union([Schema.Number, Schema.Null]),
  rateLimitingLimit: Schema.Union([Schema.Number, Schema.Null]),
  rateLimitingTechnique: Schema.Literals(["fixed", "sliding"]),
  authentication: Schema.optional(Schema.Boolean),
  dlp: Schema.optional(
    Schema.Union([
      Schema.Struct({
        action: Schema.Literals(["BLOCK", "FLAG"]),
        enabled: Schema.Boolean,
        profiles: Schema.Array(Schema.String),
      }),
      Schema.Struct({
        enabled: Schema.Boolean,
        policies: Schema.Array(
          Schema.Struct({
            id: Schema.String,
            action: Schema.Literals(["FLAG", "BLOCK"]),
            check: Schema.Array(Schema.Literals(["REQUEST", "RESPONSE"])),
            enabled: Schema.Boolean,
            profiles: Schema.Array(Schema.String),
          }),
        ),
      }),
    ]),
  ),
  isDefault: Schema.optional(Schema.Boolean),
  logManagement: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  logManagementStrategy: Schema.optional(
    Schema.Union([
      Schema.Literal("STOP_INSERTING"),
      Schema.Literal("DELETE_OLDEST"),
      Schema.Null,
    ]),
  ),
  logpush: Schema.optional(Schema.Boolean),
  logpushPublicKey: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  otel: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          authorization: Schema.String,
          headers: Schema.Struct({}),
          url: Schema.String,
        }),
      ),
      Schema.Null,
    ]),
  ),
  storeId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  stripe: Schema.optional(
    Schema.Union([
      Schema.Struct({
        authorization: Schema.String,
        usageEvents: Schema.Array(
          Schema.Struct({
            payload: Schema.String,
          }),
        ),
      }).pipe(Schema.encodeKeys({ usageEvents: "usage_events" })),
      Schema.Null,
    ]),
  ),
  zdr: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({
    accountId: "account_id",
    accountTag: "account_tag",
    cacheInvalidateOnUpdate: "cache_invalidate_on_update",
    cacheTtl: "cache_ttl",
    collectLogs: "collect_logs",
    createdAt: "created_at",
    internalId: "internal_id",
    modifiedAt: "modified_at",
    rateLimitingInterval: "rate_limiting_interval",
    rateLimitingLimit: "rate_limiting_limit",
    rateLimitingTechnique: "rate_limiting_technique",
    isDefault: "is_default",
    logManagement: "log_management",
    logManagementStrategy: "log_management_strategy",
    logpushPublicKey: "logpush_public_key",
    storeId: "store_id",
  }),
) as unknown as Schema.Schema<DeleteAiGatewayResponse>;

export const deleteAiGateway: (
  input: DeleteAiGatewayRequest,
) => Effect.Effect<
  DeleteAiGatewayResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAiGatewayRequest,
  output: DeleteAiGatewayResponse,
  errors: [],
}));

// =============================================================================
// Dataset
// =============================================================================

export interface GetDatasetRequest {
  gatewayId: string;
  id: string;
  accountId: string;
}

export const GetDatasetRequest = Schema.Struct({
  gatewayId: Schema.String.pipe(T.HttpPath("gatewayId")),
  id: Schema.String.pipe(T.HttpPath("id")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/ai-gateway/gateways/{gatewayId}/datasets/{id}",
  }),
) as unknown as Schema.Schema<GetDatasetRequest>;

export interface GetDatasetResponse {
  id: string;
  accountId: string;
  accountTag: string;
  createdAt: string;
  enable: boolean;
  filters: {
    key:
      | "created_at"
      | "request_content_type"
      | "response_content_type"
      | "success"
      | "cached"
      | "provider"
      | "model"
      | "cost"
      | "tokens"
      | "tokens_in"
      | "tokens_out"
      | "duration"
      | "feedback";
    operator: "eq" | "contains" | "lt" | "gt";
    value: (string | number | boolean)[];
  }[];
  /** gateway id */
  gatewayId: string;
  modifiedAt: string;
  name: string;
}

export const GetDatasetResponse = Schema.Struct({
  id: Schema.String,
  accountId: Schema.String,
  accountTag: Schema.String,
  createdAt: Schema.String,
  enable: Schema.Boolean,
  filters: Schema.Array(
    Schema.Struct({
      key: Schema.Literals([
        "created_at",
        "request_content_type",
        "response_content_type",
        "success",
        "cached",
        "provider",
        "model",
        "cost",
        "tokens",
        "tokens_in",
        "tokens_out",
        "duration",
        "feedback",
      ]),
      operator: Schema.Literals(["eq", "contains", "lt", "gt"]),
      value: Schema.Array(
        Schema.Union([Schema.String, Schema.Number, Schema.Boolean]),
      ),
    }),
  ),
  gatewayId: Schema.String,
  modifiedAt: Schema.String,
  name: Schema.String,
}).pipe(
  Schema.encodeKeys({
    accountId: "account_id",
    accountTag: "account_tag",
    createdAt: "created_at",
    gatewayId: "gateway_id",
    modifiedAt: "modified_at",
  }),
) as unknown as Schema.Schema<GetDatasetResponse>;

export const getDataset: (
  input: GetDatasetRequest,
) => Effect.Effect<
  GetDatasetResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetDatasetRequest,
  output: GetDatasetResponse,
  errors: [],
}));

export interface CreateDatasetRequest {
  gatewayId: string;
  /** Path param: */
  accountId: string;
  /** Body param: */
  enable: boolean;
  /** Body param: */
  filters: {
    key:
      | "created_at"
      | "request_content_type"
      | "response_content_type"
      | "success"
      | "cached"
      | "provider"
      | "model"
      | "cost"
      | "tokens"
      | "tokens_in"
      | "tokens_out"
      | "duration"
      | "feedback";
    operator: "eq" | "contains" | "lt" | "gt";
    value: (string | number | boolean)[];
  }[];
  /** Body param: */
  name: string;
}

export const CreateDatasetRequest = Schema.Struct({
  gatewayId: Schema.String.pipe(T.HttpPath("gatewayId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  enable: Schema.Boolean,
  filters: Schema.Array(
    Schema.Struct({
      key: Schema.Literals([
        "created_at",
        "request_content_type",
        "response_content_type",
        "success",
        "cached",
        "provider",
        "model",
        "cost",
        "tokens",
        "tokens_in",
        "tokens_out",
        "duration",
        "feedback",
      ]),
      operator: Schema.Literals(["eq", "contains", "lt", "gt"]),
      value: Schema.Array(
        Schema.Union([Schema.String, Schema.Number, Schema.Boolean]),
      ),
    }),
  ),
  name: Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/ai-gateway/gateways/{gatewayId}/datasets",
  }),
) as unknown as Schema.Schema<CreateDatasetRequest>;

export interface CreateDatasetResponse {
  id: string;
  accountId: string;
  accountTag: string;
  createdAt: string;
  enable: boolean;
  filters: {
    key:
      | "created_at"
      | "request_content_type"
      | "response_content_type"
      | "success"
      | "cached"
      | "provider"
      | "model"
      | "cost"
      | "tokens"
      | "tokens_in"
      | "tokens_out"
      | "duration"
      | "feedback";
    operator: "eq" | "contains" | "lt" | "gt";
    value: (string | number | boolean)[];
  }[];
  /** gateway id */
  gatewayId: string;
  modifiedAt: string;
  name: string;
}

export const CreateDatasetResponse = Schema.Struct({
  id: Schema.String,
  accountId: Schema.String,
  accountTag: Schema.String,
  createdAt: Schema.String,
  enable: Schema.Boolean,
  filters: Schema.Array(
    Schema.Struct({
      key: Schema.Literals([
        "created_at",
        "request_content_type",
        "response_content_type",
        "success",
        "cached",
        "provider",
        "model",
        "cost",
        "tokens",
        "tokens_in",
        "tokens_out",
        "duration",
        "feedback",
      ]),
      operator: Schema.Literals(["eq", "contains", "lt", "gt"]),
      value: Schema.Array(
        Schema.Union([Schema.String, Schema.Number, Schema.Boolean]),
      ),
    }),
  ),
  gatewayId: Schema.String,
  modifiedAt: Schema.String,
  name: Schema.String,
}).pipe(
  Schema.encodeKeys({
    accountId: "account_id",
    accountTag: "account_tag",
    createdAt: "created_at",
    gatewayId: "gateway_id",
    modifiedAt: "modified_at",
  }),
) as unknown as Schema.Schema<CreateDatasetResponse>;

export const createDataset: (
  input: CreateDatasetRequest,
) => Effect.Effect<
  CreateDatasetResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateDatasetRequest,
  output: CreateDatasetResponse,
  errors: [],
}));

export interface UpdateDatasetRequest {
  gatewayId: string;
  id: string;
  /** Path param: */
  accountId: string;
  /** Body param: */
  enable: boolean;
  /** Body param: */
  filters: {
    key:
      | "created_at"
      | "request_content_type"
      | "response_content_type"
      | "success"
      | "cached"
      | "provider"
      | "model"
      | "cost"
      | "tokens"
      | "tokens_in"
      | "tokens_out"
      | "duration"
      | "feedback";
    operator: "eq" | "contains" | "lt" | "gt";
    value: (string | number | boolean)[];
  }[];
  /** Body param: */
  name: string;
}

export const UpdateDatasetRequest = Schema.Struct({
  gatewayId: Schema.String.pipe(T.HttpPath("gatewayId")),
  id: Schema.String.pipe(T.HttpPath("id")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  enable: Schema.Boolean,
  filters: Schema.Array(
    Schema.Struct({
      key: Schema.Literals([
        "created_at",
        "request_content_type",
        "response_content_type",
        "success",
        "cached",
        "provider",
        "model",
        "cost",
        "tokens",
        "tokens_in",
        "tokens_out",
        "duration",
        "feedback",
      ]),
      operator: Schema.Literals(["eq", "contains", "lt", "gt"]),
      value: Schema.Array(
        Schema.Union([Schema.String, Schema.Number, Schema.Boolean]),
      ),
    }),
  ),
  name: Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/ai-gateway/gateways/{gatewayId}/datasets/{id}",
  }),
) as unknown as Schema.Schema<UpdateDatasetRequest>;

export interface UpdateDatasetResponse {
  id: string;
  accountId: string;
  accountTag: string;
  createdAt: string;
  enable: boolean;
  filters: {
    key:
      | "created_at"
      | "request_content_type"
      | "response_content_type"
      | "success"
      | "cached"
      | "provider"
      | "model"
      | "cost"
      | "tokens"
      | "tokens_in"
      | "tokens_out"
      | "duration"
      | "feedback";
    operator: "eq" | "contains" | "lt" | "gt";
    value: (string | number | boolean)[];
  }[];
  /** gateway id */
  gatewayId: string;
  modifiedAt: string;
  name: string;
}

export const UpdateDatasetResponse = Schema.Struct({
  id: Schema.String,
  accountId: Schema.String,
  accountTag: Schema.String,
  createdAt: Schema.String,
  enable: Schema.Boolean,
  filters: Schema.Array(
    Schema.Struct({
      key: Schema.Literals([
        "created_at",
        "request_content_type",
        "response_content_type",
        "success",
        "cached",
        "provider",
        "model",
        "cost",
        "tokens",
        "tokens_in",
        "tokens_out",
        "duration",
        "feedback",
      ]),
      operator: Schema.Literals(["eq", "contains", "lt", "gt"]),
      value: Schema.Array(
        Schema.Union([Schema.String, Schema.Number, Schema.Boolean]),
      ),
    }),
  ),
  gatewayId: Schema.String,
  modifiedAt: Schema.String,
  name: Schema.String,
}).pipe(
  Schema.encodeKeys({
    accountId: "account_id",
    accountTag: "account_tag",
    createdAt: "created_at",
    gatewayId: "gateway_id",
    modifiedAt: "modified_at",
  }),
) as unknown as Schema.Schema<UpdateDatasetResponse>;

export const updateDataset: (
  input: UpdateDatasetRequest,
) => Effect.Effect<
  UpdateDatasetResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateDatasetRequest,
  output: UpdateDatasetResponse,
  errors: [],
}));

export interface DeleteDatasetRequest {
  gatewayId: string;
  id: string;
  accountId: string;
}

export const DeleteDatasetRequest = Schema.Struct({
  gatewayId: Schema.String.pipe(T.HttpPath("gatewayId")),
  id: Schema.String.pipe(T.HttpPath("id")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/ai-gateway/gateways/{gatewayId}/datasets/{id}",
  }),
) as unknown as Schema.Schema<DeleteDatasetRequest>;

export interface DeleteDatasetResponse {
  id: string;
  accountId: string;
  accountTag: string;
  createdAt: string;
  enable: boolean;
  filters: {
    key:
      | "created_at"
      | "request_content_type"
      | "response_content_type"
      | "success"
      | "cached"
      | "provider"
      | "model"
      | "cost"
      | "tokens"
      | "tokens_in"
      | "tokens_out"
      | "duration"
      | "feedback";
    operator: "eq" | "contains" | "lt" | "gt";
    value: (string | number | boolean)[];
  }[];
  /** gateway id */
  gatewayId: string;
  modifiedAt: string;
  name: string;
}

export const DeleteDatasetResponse = Schema.Struct({
  id: Schema.String,
  accountId: Schema.String,
  accountTag: Schema.String,
  createdAt: Schema.String,
  enable: Schema.Boolean,
  filters: Schema.Array(
    Schema.Struct({
      key: Schema.Literals([
        "created_at",
        "request_content_type",
        "response_content_type",
        "success",
        "cached",
        "provider",
        "model",
        "cost",
        "tokens",
        "tokens_in",
        "tokens_out",
        "duration",
        "feedback",
      ]),
      operator: Schema.Literals(["eq", "contains", "lt", "gt"]),
      value: Schema.Array(
        Schema.Union([Schema.String, Schema.Number, Schema.Boolean]),
      ),
    }),
  ),
  gatewayId: Schema.String,
  modifiedAt: Schema.String,
  name: Schema.String,
}).pipe(
  Schema.encodeKeys({
    accountId: "account_id",
    accountTag: "account_tag",
    createdAt: "created_at",
    gatewayId: "gateway_id",
    modifiedAt: "modified_at",
  }),
) as unknown as Schema.Schema<DeleteDatasetResponse>;

export const deleteDataset: (
  input: DeleteDatasetRequest,
) => Effect.Effect<
  DeleteDatasetResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteDatasetRequest,
  output: DeleteDatasetResponse,
  errors: [],
}));

// =============================================================================
// Evaluation
// =============================================================================

export interface GetEvaluationRequest {
  gatewayId: string;
  id: string;
  accountId: string;
}

export const GetEvaluationRequest = Schema.Struct({
  gatewayId: Schema.String.pipe(T.HttpPath("gatewayId")),
  id: Schema.String.pipe(T.HttpPath("id")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/ai-gateway/gateways/{gatewayId}/evaluations/{id}",
  }),
) as unknown as Schema.Schema<GetEvaluationRequest>;

export interface GetEvaluationResponse {
  id: string;
  accountId: string;
  accountTag: string;
  createdAt: string;
  datasets: {
    id: string;
    accountId: string;
    accountTag: string;
    createdAt: string;
    enable: boolean;
    filters: {
      key:
        | "created_at"
        | "request_content_type"
        | "response_content_type"
        | "success"
        | "cached"
        | "provider"
        | "model"
        | "cost"
        | "tokens"
        | "tokens_in"
        | "tokens_out"
        | "duration"
        | "feedback";
      operator: "eq" | "contains" | "lt" | "gt";
      value: (string | number | boolean)[];
    }[];
    gatewayId: string;
    modifiedAt: string;
    name: string;
  }[];
  /** gateway id */
  gatewayId: string;
  modifiedAt: string;
  name: string;
  processed: boolean;
  results: {
    id: string;
    createdAt: string;
    evaluationId: string;
    evaluationTypeId: string;
    modifiedAt: string;
    result: string;
    status: number;
    statusDescription: string;
    totalLogs: number;
  }[];
  totalLogs: number;
}

export const GetEvaluationResponse = Schema.Struct({
  id: Schema.String,
  accountId: Schema.String,
  accountTag: Schema.String,
  createdAt: Schema.String,
  datasets: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      accountId: Schema.String,
      accountTag: Schema.String,
      createdAt: Schema.String,
      enable: Schema.Boolean,
      filters: Schema.Array(
        Schema.Struct({
          key: Schema.Literals([
            "created_at",
            "request_content_type",
            "response_content_type",
            "success",
            "cached",
            "provider",
            "model",
            "cost",
            "tokens",
            "tokens_in",
            "tokens_out",
            "duration",
            "feedback",
          ]),
          operator: Schema.Literals(["eq", "contains", "lt", "gt"]),
          value: Schema.Array(
            Schema.Union([Schema.String, Schema.Number, Schema.Boolean]),
          ),
        }),
      ),
      gatewayId: Schema.String,
      modifiedAt: Schema.String,
      name: Schema.String,
    }).pipe(
      Schema.encodeKeys({
        accountId: "account_id",
        accountTag: "account_tag",
        createdAt: "created_at",
        gatewayId: "gateway_id",
        modifiedAt: "modified_at",
      }),
    ),
  ),
  gatewayId: Schema.String,
  modifiedAt: Schema.String,
  name: Schema.String,
  processed: Schema.Boolean,
  results: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      createdAt: Schema.String,
      evaluationId: Schema.String,
      evaluationTypeId: Schema.String,
      modifiedAt: Schema.String,
      result: Schema.String,
      status: Schema.Number,
      statusDescription: Schema.String,
      totalLogs: Schema.Number,
    }).pipe(
      Schema.encodeKeys({
        createdAt: "created_at",
        evaluationId: "evaluation_id",
        evaluationTypeId: "evaluation_type_id",
        modifiedAt: "modified_at",
        statusDescription: "status_description",
        totalLogs: "total_logs",
      }),
    ),
  ),
  totalLogs: Schema.Number,
}).pipe(
  Schema.encodeKeys({
    accountId: "account_id",
    accountTag: "account_tag",
    createdAt: "created_at",
    gatewayId: "gateway_id",
    modifiedAt: "modified_at",
    totalLogs: "total_logs",
  }),
) as unknown as Schema.Schema<GetEvaluationResponse>;

export const getEvaluation: (
  input: GetEvaluationRequest,
) => Effect.Effect<
  GetEvaluationResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetEvaluationRequest,
  output: GetEvaluationResponse,
  errors: [],
}));

export interface CreateEvaluationRequest {
  gatewayId: string;
  /** Path param: */
  accountId: string;
  /** Body param: */
  datasetIds: string[];
  /** Body param: */
  evaluationTypeIds: string[];
  /** Body param: */
  name: string;
}

export const CreateEvaluationRequest = Schema.Struct({
  gatewayId: Schema.String.pipe(T.HttpPath("gatewayId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  datasetIds: Schema.Array(Schema.String),
  evaluationTypeIds: Schema.Array(Schema.String),
  name: Schema.String,
}).pipe(
  Schema.encodeKeys({
    datasetIds: "dataset_ids",
    evaluationTypeIds: "evaluation_type_ids",
  }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/ai-gateway/gateways/{gatewayId}/evaluations",
  }),
) as unknown as Schema.Schema<CreateEvaluationRequest>;

export interface CreateEvaluationResponse {
  id: string;
  accountId: string;
  accountTag: string;
  createdAt: string;
  datasets: {
    id: string;
    accountId: string;
    accountTag: string;
    createdAt: string;
    enable: boolean;
    filters: {
      key:
        | "created_at"
        | "request_content_type"
        | "response_content_type"
        | "success"
        | "cached"
        | "provider"
        | "model"
        | "cost"
        | "tokens"
        | "tokens_in"
        | "tokens_out"
        | "duration"
        | "feedback";
      operator: "eq" | "contains" | "lt" | "gt";
      value: (string | number | boolean)[];
    }[];
    gatewayId: string;
    modifiedAt: string;
    name: string;
  }[];
  /** gateway id */
  gatewayId: string;
  modifiedAt: string;
  name: string;
  processed: boolean;
  results: {
    id: string;
    createdAt: string;
    evaluationId: string;
    evaluationTypeId: string;
    modifiedAt: string;
    result: string;
    status: number;
    statusDescription: string;
    totalLogs: number;
  }[];
  totalLogs: number;
}

export const CreateEvaluationResponse = Schema.Struct({
  id: Schema.String,
  accountId: Schema.String,
  accountTag: Schema.String,
  createdAt: Schema.String,
  datasets: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      accountId: Schema.String,
      accountTag: Schema.String,
      createdAt: Schema.String,
      enable: Schema.Boolean,
      filters: Schema.Array(
        Schema.Struct({
          key: Schema.Literals([
            "created_at",
            "request_content_type",
            "response_content_type",
            "success",
            "cached",
            "provider",
            "model",
            "cost",
            "tokens",
            "tokens_in",
            "tokens_out",
            "duration",
            "feedback",
          ]),
          operator: Schema.Literals(["eq", "contains", "lt", "gt"]),
          value: Schema.Array(
            Schema.Union([Schema.String, Schema.Number, Schema.Boolean]),
          ),
        }),
      ),
      gatewayId: Schema.String,
      modifiedAt: Schema.String,
      name: Schema.String,
    }).pipe(
      Schema.encodeKeys({
        accountId: "account_id",
        accountTag: "account_tag",
        createdAt: "created_at",
        gatewayId: "gateway_id",
        modifiedAt: "modified_at",
      }),
    ),
  ),
  gatewayId: Schema.String,
  modifiedAt: Schema.String,
  name: Schema.String,
  processed: Schema.Boolean,
  results: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      createdAt: Schema.String,
      evaluationId: Schema.String,
      evaluationTypeId: Schema.String,
      modifiedAt: Schema.String,
      result: Schema.String,
      status: Schema.Number,
      statusDescription: Schema.String,
      totalLogs: Schema.Number,
    }).pipe(
      Schema.encodeKeys({
        createdAt: "created_at",
        evaluationId: "evaluation_id",
        evaluationTypeId: "evaluation_type_id",
        modifiedAt: "modified_at",
        statusDescription: "status_description",
        totalLogs: "total_logs",
      }),
    ),
  ),
  totalLogs: Schema.Number,
}).pipe(
  Schema.encodeKeys({
    accountId: "account_id",
    accountTag: "account_tag",
    createdAt: "created_at",
    gatewayId: "gateway_id",
    modifiedAt: "modified_at",
    totalLogs: "total_logs",
  }),
) as unknown as Schema.Schema<CreateEvaluationResponse>;

export const createEvaluation: (
  input: CreateEvaluationRequest,
) => Effect.Effect<
  CreateEvaluationResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateEvaluationRequest,
  output: CreateEvaluationResponse,
  errors: [],
}));

export interface DeleteEvaluationRequest {
  gatewayId: string;
  id: string;
  accountId: string;
}

export const DeleteEvaluationRequest = Schema.Struct({
  gatewayId: Schema.String.pipe(T.HttpPath("gatewayId")),
  id: Schema.String.pipe(T.HttpPath("id")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/ai-gateway/gateways/{gatewayId}/evaluations/{id}",
  }),
) as unknown as Schema.Schema<DeleteEvaluationRequest>;

export interface DeleteEvaluationResponse {
  id: string;
  accountId: string;
  accountTag: string;
  createdAt: string;
  datasets: {
    id: string;
    accountId: string;
    accountTag: string;
    createdAt: string;
    enable: boolean;
    filters: {
      key:
        | "created_at"
        | "request_content_type"
        | "response_content_type"
        | "success"
        | "cached"
        | "provider"
        | "model"
        | "cost"
        | "tokens"
        | "tokens_in"
        | "tokens_out"
        | "duration"
        | "feedback";
      operator: "eq" | "contains" | "lt" | "gt";
      value: (string | number | boolean)[];
    }[];
    gatewayId: string;
    modifiedAt: string;
    name: string;
  }[];
  /** gateway id */
  gatewayId: string;
  modifiedAt: string;
  name: string;
  processed: boolean;
  results: {
    id: string;
    createdAt: string;
    evaluationId: string;
    evaluationTypeId: string;
    modifiedAt: string;
    result: string;
    status: number;
    statusDescription: string;
    totalLogs: number;
  }[];
  totalLogs: number;
}

export const DeleteEvaluationResponse = Schema.Struct({
  id: Schema.String,
  accountId: Schema.String,
  accountTag: Schema.String,
  createdAt: Schema.String,
  datasets: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      accountId: Schema.String,
      accountTag: Schema.String,
      createdAt: Schema.String,
      enable: Schema.Boolean,
      filters: Schema.Array(
        Schema.Struct({
          key: Schema.Literals([
            "created_at",
            "request_content_type",
            "response_content_type",
            "success",
            "cached",
            "provider",
            "model",
            "cost",
            "tokens",
            "tokens_in",
            "tokens_out",
            "duration",
            "feedback",
          ]),
          operator: Schema.Literals(["eq", "contains", "lt", "gt"]),
          value: Schema.Array(
            Schema.Union([Schema.String, Schema.Number, Schema.Boolean]),
          ),
        }),
      ),
      gatewayId: Schema.String,
      modifiedAt: Schema.String,
      name: Schema.String,
    }).pipe(
      Schema.encodeKeys({
        accountId: "account_id",
        accountTag: "account_tag",
        createdAt: "created_at",
        gatewayId: "gateway_id",
        modifiedAt: "modified_at",
      }),
    ),
  ),
  gatewayId: Schema.String,
  modifiedAt: Schema.String,
  name: Schema.String,
  processed: Schema.Boolean,
  results: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      createdAt: Schema.String,
      evaluationId: Schema.String,
      evaluationTypeId: Schema.String,
      modifiedAt: Schema.String,
      result: Schema.String,
      status: Schema.Number,
      statusDescription: Schema.String,
      totalLogs: Schema.Number,
    }).pipe(
      Schema.encodeKeys({
        createdAt: "created_at",
        evaluationId: "evaluation_id",
        evaluationTypeId: "evaluation_type_id",
        modifiedAt: "modified_at",
        statusDescription: "status_description",
        totalLogs: "total_logs",
      }),
    ),
  ),
  totalLogs: Schema.Number,
}).pipe(
  Schema.encodeKeys({
    accountId: "account_id",
    accountTag: "account_tag",
    createdAt: "created_at",
    gatewayId: "gateway_id",
    modifiedAt: "modified_at",
    totalLogs: "total_logs",
  }),
) as unknown as Schema.Schema<DeleteEvaluationResponse>;

export const deleteEvaluation: (
  input: DeleteEvaluationRequest,
) => Effect.Effect<
  DeleteEvaluationResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteEvaluationRequest,
  output: DeleteEvaluationResponse,
  errors: [],
}));

// =============================================================================
// Log
// =============================================================================

export interface GetLogRequest {
  gatewayId: string;
  id: string;
  accountId: string;
}

export const GetLogRequest = Schema.Struct({
  gatewayId: Schema.String.pipe(T.HttpPath("gatewayId")),
  id: Schema.String.pipe(T.HttpPath("id")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/ai-gateway/gateways/{gatewayId}/logs/{id}",
  }),
) as unknown as Schema.Schema<GetLogRequest>;

export interface GetLogResponse {
  id: string;
  cached: boolean;
  createdAt: string;
  duration: number;
  model: string;
  path: string;
  provider: string;
  success: boolean;
  tokensIn: number | null;
  tokensOut: number | null;
  cost?: number;
  customCost?: boolean;
  metadata?: string;
  modelType?: string;
  requestContentType?: string;
  requestHead?: string;
  requestHeadComplete?: boolean;
  requestSize?: number;
  requestType?: string;
  responseContentType?: string;
  responseHead?: string;
  responseHeadComplete?: boolean;
  responseSize?: number;
  statusCode?: number;
  step?: number;
}

export const GetLogResponse = Schema.Struct({
  id: Schema.String,
  cached: Schema.Boolean,
  createdAt: Schema.String,
  duration: Schema.Number,
  model: Schema.String,
  path: Schema.String,
  provider: Schema.String,
  success: Schema.Boolean,
  tokensIn: Schema.Union([Schema.Number, Schema.Null]),
  tokensOut: Schema.Union([Schema.Number, Schema.Null]),
  cost: Schema.optional(Schema.Number),
  customCost: Schema.optional(Schema.Boolean),
  metadata: Schema.optional(Schema.String),
  modelType: Schema.optional(Schema.String),
  requestContentType: Schema.optional(Schema.String),
  requestHead: Schema.optional(Schema.String),
  requestHeadComplete: Schema.optional(Schema.Boolean),
  requestSize: Schema.optional(Schema.Number),
  requestType: Schema.optional(Schema.String),
  responseContentType: Schema.optional(Schema.String),
  responseHead: Schema.optional(Schema.String),
  responseHeadComplete: Schema.optional(Schema.Boolean),
  responseSize: Schema.optional(Schema.Number),
  statusCode: Schema.optional(Schema.Number),
  step: Schema.optional(Schema.Number),
}).pipe(
  Schema.encodeKeys({
    createdAt: "created_at",
    tokensIn: "tokens_in",
    tokensOut: "tokens_out",
    customCost: "custom_cost",
    modelType: "model_type",
    requestContentType: "request_content_type",
    requestHead: "request_head",
    requestHeadComplete: "request_head_complete",
    requestSize: "request_size",
    requestType: "request_type",
    responseContentType: "response_content_type",
    responseHead: "response_head",
    responseHeadComplete: "response_head_complete",
    responseSize: "response_size",
    statusCode: "status_code",
  }),
) as unknown as Schema.Schema<GetLogResponse>;

export const getLog: (
  input: GetLogRequest,
) => Effect.Effect<
  GetLogResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetLogRequest,
  output: GetLogResponse,
  errors: [],
}));

export interface PatchLogRequest {
  gatewayId: string;
  id: string;
  /** Path param: */
  accountId: string;
  /** Body param: */
  feedback?: number | null;
  /** Body param: */
  metadata?: Record<string, unknown> | null;
  /** Body param: */
  score?: number | null;
}

export const PatchLogRequest = Schema.Struct({
  gatewayId: Schema.String.pipe(T.HttpPath("gatewayId")),
  id: Schema.String.pipe(T.HttpPath("id")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  feedback: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  metadata: Schema.optional(Schema.Union([Schema.Struct({}), Schema.Null])),
  score: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/ai-gateway/gateways/{gatewayId}/logs/{id}",
  }),
) as unknown as Schema.Schema<PatchLogRequest>;

export type PatchLogResponse = unknown;

export const PatchLogResponse =
  Schema.Unknown as unknown as Schema.Schema<PatchLogResponse>;

export const patchLog: (
  input: PatchLogRequest,
) => Effect.Effect<
  PatchLogResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchLogRequest,
  output: PatchLogResponse,
  errors: [],
}));

export interface DeleteLogRequest {
  gatewayId: string;
  /** Path param: */
  accountId: string;
  /** Query param: */
  filters?: {
    key:
      | "id"
      | "created_at"
      | "request_content_type"
      | "response_content_type"
      | "request_type"
      | "success"
      | "cached"
      | "provider"
      | "model"
      | "model_type"
      | "cost"
      | "tokens"
      | "tokens_in"
      | "tokens_out"
      | "duration"
      | "feedback"
      | "event_id"
      | "metadata.key"
      | "metadata.value"
      | "prompts.prompt_id"
      | "prompts.version_id"
      | "authentication"
      | "wholesale"
      | "compatibilityMode"
      | "dlp_action";
    operator: "eq" | "neq" | "contains" | "lt" | "gt";
    value: (string | null | number | boolean)[];
  }[];
  /** Query param: */
  limit?: number;
  /** Query param: */
  orderBy?:
    | "created_at"
    | "provider"
    | "model"
    | "model_type"
    | "success"
    | "cached"
    | "cost"
    | "tokens_in"
    | "tokens_out"
    | "duration"
    | "feedback";
  /** Query param: */
  orderByDirection?: "asc" | "desc";
}

export const DeleteLogRequest = Schema.Struct({
  gatewayId: Schema.String.pipe(T.HttpPath("gatewayId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  filters: Schema.optional(
    Schema.Array(
      Schema.Struct({
        key: Schema.Literals([
          "id",
          "created_at",
          "request_content_type",
          "response_content_type",
          "request_type",
          "success",
          "cached",
          "provider",
          "model",
          "model_type",
          "cost",
          "tokens",
          "tokens_in",
          "tokens_out",
          "duration",
          "feedback",
          "event_id",
          "metadata.key",
          "metadata.value",
          "prompts.prompt_id",
          "prompts.version_id",
          "authentication",
          "wholesale",
          "compatibilityMode",
          "dlp_action",
        ]),
        operator: Schema.Literals(["eq", "neq", "contains", "lt", "gt"]),
        value: Schema.Array(
          Schema.Union([
            Schema.String,
            Schema.Null,
            Schema.Number,
            Schema.Boolean,
          ]),
        ),
      }),
    ),
  ).pipe(T.HttpQuery("filters")),
  limit: Schema.optional(Schema.Number).pipe(T.HttpQuery("limit")),
  orderBy: Schema.optional(
    Schema.Literals([
      "created_at",
      "provider",
      "model",
      "model_type",
      "success",
      "cached",
      "cost",
      "tokens_in",
      "tokens_out",
      "duration",
      "feedback",
    ]),
  ).pipe(T.HttpQuery("order_by")),
  orderByDirection: Schema.optional(Schema.Literals(["asc", "desc"])).pipe(
    T.HttpQuery("order_by_direction"),
  ),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/ai-gateway/gateways/{gatewayId}/logs",
  }),
) as unknown as Schema.Schema<DeleteLogRequest>;

export interface DeleteLogResponse {
  success: boolean;
}

export const DeleteLogResponse = Schema.Struct({
  success: Schema.Boolean,
}) as unknown as Schema.Schema<DeleteLogResponse>;

export const deleteLog: (
  input: DeleteLogRequest,
) => Effect.Effect<
  DeleteLogResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteLogRequest,
  output: DeleteLogResponse,
  errors: [],
}));

export interface RequestLogRequest {
  gatewayId: string;
  id: string;
  accountId: string;
}

export const RequestLogRequest = Schema.Struct({
  gatewayId: Schema.String.pipe(T.HttpPath("gatewayId")),
  id: Schema.String.pipe(T.HttpPath("id")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/ai-gateway/gateways/{gatewayId}/logs/{id}/request",
  }),
) as unknown as Schema.Schema<RequestLogRequest>;

export type RequestLogResponse = unknown;

export const RequestLogResponse =
  Schema.Unknown as unknown as Schema.Schema<RequestLogResponse>;

export const requestLog: (
  input: RequestLogRequest,
) => Effect.Effect<
  RequestLogResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: RequestLogRequest,
  output: RequestLogResponse,
  errors: [],
}));

export interface ResponseLogRequest {
  gatewayId: string;
  id: string;
  accountId: string;
}

export const ResponseLogRequest = Schema.Struct({
  gatewayId: Schema.String.pipe(T.HttpPath("gatewayId")),
  id: Schema.String.pipe(T.HttpPath("id")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/ai-gateway/gateways/{gatewayId}/logs/{id}/response",
  }),
) as unknown as Schema.Schema<ResponseLogRequest>;

export type ResponseLogResponse = unknown;

export const ResponseLogResponse =
  Schema.Unknown as unknown as Schema.Schema<ResponseLogResponse>;

export const responseLog: (
  input: ResponseLogRequest,
) => Effect.Effect<
  ResponseLogResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ResponseLogRequest,
  output: ResponseLogResponse,
  errors: [],
}));

// =============================================================================
// Url
// =============================================================================

export interface GetUrlRequest {
  gatewayId: string;
  provider: string;
  accountId: string;
}

export const GetUrlRequest = Schema.Struct({
  gatewayId: Schema.String.pipe(T.HttpPath("gatewayId")),
  provider: Schema.String.pipe(T.HttpPath("provider")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/ai-gateway/gateways/{gatewayId}/url/{provider}",
  }),
) as unknown as Schema.Schema<GetUrlRequest>;

export type GetUrlResponse = string;

export const GetUrlResponse =
  Schema.String as unknown as Schema.Schema<GetUrlResponse>;

export const getUrl: (
  input: GetUrlRequest,
) => Effect.Effect<
  GetUrlResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetUrlRequest,
  output: GetUrlResponse,
  errors: [],
}));
