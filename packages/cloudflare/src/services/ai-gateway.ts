/**
 * Cloudflare AI-GATEWAY API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service ai-gateway
 */

import * as stream from "effect/Stream";
import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import { type DefaultErrors } from "../errors.ts";

// =============================================================================
// Errors
// =============================================================================

export class GatewayAlreadyExists extends Schema.TaggedErrorClass<GatewayAlreadyExists>()(
  "GatewayAlreadyExists",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(GatewayAlreadyExists, [{ code: 7001 }, { status: 504 }]);

export class GatewayNotFound extends Schema.TaggedErrorClass<GatewayNotFound>()(
  "GatewayNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(GatewayNotFound, [{ code: 7002 }]);

// =============================================================================
// AiGateway
// =============================================================================

export interface GetAiGatewayRequest {
  id: string;
  accountId: string;
}

export const GetAiGatewayRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  accountId?: string | null;
  accountTag?: string | null;
  cacheInvalidateOnUpdate: boolean;
  cacheTtl: number | null;
  collectLogs: boolean;
  createdAt: string;
  internalId?: string | null;
  modifiedAt: string;
  rateLimitingInterval: number | null;
  rateLimitingLimit: number | null;
  rateLimitingTechnique: "fixed" | "sliding";
  authentication?: boolean | null;
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
      }
    | null;
  isDefault?: boolean | null;
  logManagement?: number | null;
  logManagementStrategy?: "STOP_INSERTING" | "DELETE_OLDEST" | null;
  logpush?: boolean | null;
  logpushPublicKey?: string | null;
  otel?:
    | { authorization: string; headers: Record<string, unknown>; url: string }[]
    | null;
  storeId?: string | null;
  stripe?: { authorization: string; usageEvents: { payload: string }[] } | null;
  zdr?: boolean | null;
}

export const GetAiGatewayResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  accountTag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  cacheInvalidateOnUpdate: Schema.Boolean,
  cacheTtl: Schema.Union([Schema.Number, Schema.Null]),
  collectLogs: Schema.Boolean,
  createdAt: Schema.String,
  internalId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  modifiedAt: Schema.String,
  rateLimitingInterval: Schema.Union([Schema.Number, Schema.Null]),
  rateLimitingLimit: Schema.Union([Schema.Number, Schema.Null]),
  rateLimitingTechnique: Schema.Literals(["fixed", "sliding"]),
  authentication: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  dlp: Schema.optional(
    Schema.Union([
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
      Schema.Null,
    ]),
  ),
  isDefault: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  logManagement: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  logManagementStrategy: Schema.optional(
    Schema.Union([
      Schema.Literal("STOP_INSERTING"),
      Schema.Literal("DELETE_OLDEST"),
      Schema.Null,
    ]),
  ),
  logpush: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
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
      }).pipe(
        Schema.encodeKeys({
          authorization: "authorization",
          usageEvents: "usage_events",
        }),
      ),
      Schema.Null,
    ]),
  ),
  zdr: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
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
      authentication: "authentication",
      dlp: "dlp",
      isDefault: "is_default",
      logManagement: "log_management",
      logManagementStrategy: "log_management_strategy",
      logpush: "logpush",
      logpushPublicKey: "logpush_public_key",
      otel: "otel",
      storeId: "store_id",
      stripe: "stripe",
      zdr: "zdr",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetAiGatewayResponse>;

export type GetAiGatewayError = DefaultErrors | GatewayNotFound;

export const getAiGateway: API.OperationMethod<
  GetAiGatewayRequest,
  GetAiGatewayResponse,
  GetAiGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAiGatewayRequest,
  output: GetAiGatewayResponse,
  errors: [GatewayNotFound],
}));

export interface ListAiGatewaysRequest {
  /** Path param: */
  accountId: string;
  /** Query param: Search by id */
  search?: string;
}

export const ListAiGatewaysRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  search: Schema.optional(Schema.String).pipe(T.HttpQuery("search")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/ai-gateway/gateways" }),
) as unknown as Schema.Schema<ListAiGatewaysRequest>;

export interface ListAiGatewaysResponse {
  result: {
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
    authentication?: boolean | null;
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
        }
      | null;
    isDefault?: boolean | null;
    logManagement?: number | null;
    logManagementStrategy?: "STOP_INSERTING" | "DELETE_OLDEST" | null;
    logpush?: boolean | null;
    logpushPublicKey?: string | null;
    otel?:
      | {
          authorization: string;
          headers: Record<string, unknown>;
          url: string;
        }[]
      | null;
    storeId?: string | null;
    stripe?: {
      authorization: string;
      usageEvents: { payload: string }[];
    } | null;
    zdr?: boolean | null;
  }[];
  resultInfo: {
    count?: number | null;
    page?: number | null;
    perPage?: number | null;
    totalCount?: number | null;
  };
}

export const ListAiGatewaysResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    result: Schema.Array(
      Schema.Struct({
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
        authentication: Schema.optional(
          Schema.Union([Schema.Boolean, Schema.Null]),
        ),
        dlp: Schema.optional(
          Schema.Union([
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
                    check: Schema.Array(
                      Schema.Literals(["REQUEST", "RESPONSE"]),
                    ),
                    enabled: Schema.Boolean,
                    profiles: Schema.Array(Schema.String),
                  }),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        isDefault: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        logManagement: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        logManagementStrategy: Schema.optional(
          Schema.Union([
            Schema.Literal("STOP_INSERTING"),
            Schema.Literal("DELETE_OLDEST"),
            Schema.Null,
          ]),
        ),
        logpush: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        logpushPublicKey: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
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
            }).pipe(
              Schema.encodeKeys({
                authorization: "authorization",
                usageEvents: "usage_events",
              }),
            ),
            Schema.Null,
          ]),
        ),
        zdr: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
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
          authentication: "authentication",
          dlp: "dlp",
          isDefault: "is_default",
          logManagement: "log_management",
          logManagementStrategy: "log_management_strategy",
          logpush: "logpush",
          logpushPublicKey: "logpush_public_key",
          otel: "otel",
          storeId: "store_id",
          stripe: "stripe",
          zdr: "zdr",
        }),
      ),
    ),
    resultInfo: Schema.Struct({
      count: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      page: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      perPage: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      totalCount: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    }).pipe(
      Schema.encodeKeys({
        count: "count",
        page: "page",
        perPage: "per_page",
        totalCount: "total_count",
      }),
    ),
  },
).pipe(
  Schema.encodeKeys({ result: "result", resultInfo: "result_info" }),
) as unknown as Schema.Schema<ListAiGatewaysResponse>;

export type ListAiGatewaysError = DefaultErrors;

export const listAiGateways: API.PaginatedOperationMethod<
  ListAiGatewaysRequest,
  ListAiGatewaysResponse,
  ListAiGatewaysError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListAiGatewaysRequest,
  ) => stream.Stream<
    ListAiGatewaysResponse,
    ListAiGatewaysError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: ListAiGatewaysRequest) => stream.Stream<
    {
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
      authentication?: boolean | null;
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
          }
        | null;
      isDefault?: boolean | null;
      logManagement?: number | null;
      logManagementStrategy?: "STOP_INSERTING" | "DELETE_OLDEST" | null;
      logpush?: boolean | null;
      logpushPublicKey?: string | null;
      otel?:
        | {
            authorization: string;
            headers: Record<string, unknown>;
            url: string;
          }[]
        | null;
      storeId?: string | null;
      stripe?: {
        authorization: string;
        usageEvents: { payload: string }[];
      } | null;
      zdr?: boolean | null;
    },
    ListAiGatewaysError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAiGatewaysRequest,
  output: ListAiGatewaysResponse,
  errors: [],
  pagination: {
    mode: "page",
    inputToken: "page",
    outputToken: "resultInfo.page",
    items: "result",
    pageSize: "perPage",
  } as const,
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

export const CreateAiGatewayRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
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
    logpushPublicKey: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    zdr: Schema.optional(Schema.Boolean),
  },
).pipe(
  Schema.encodeKeys({
    id: "id",
    cacheInvalidateOnUpdate: "cache_invalidate_on_update",
    cacheTtl: "cache_ttl",
    collectLogs: "collect_logs",
    rateLimitingInterval: "rate_limiting_interval",
    rateLimitingLimit: "rate_limiting_limit",
    rateLimitingTechnique: "rate_limiting_technique",
    authentication: "authentication",
    isDefault: "is_default",
    logManagement: "log_management",
    logManagementStrategy: "log_management_strategy",
    logpush: "logpush",
    logpushPublicKey: "logpush_public_key",
    zdr: "zdr",
  }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/ai-gateway/gateways",
  }),
) as unknown as Schema.Schema<CreateAiGatewayRequest>;

export interface CreateAiGatewayResponse {
  /** gateway id */
  id: string;
  accountId?: string | null;
  accountTag?: string | null;
  cacheInvalidateOnUpdate: boolean;
  cacheTtl: number | null;
  collectLogs: boolean;
  createdAt: string;
  internalId?: string | null;
  modifiedAt: string;
  rateLimitingInterval: number | null;
  rateLimitingLimit: number | null;
  rateLimitingTechnique: "fixed" | "sliding";
  authentication?: boolean | null;
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
      }
    | null;
  isDefault?: boolean | null;
  logManagement?: number | null;
  logManagementStrategy?: "STOP_INSERTING" | "DELETE_OLDEST" | null;
  logpush?: boolean | null;
  logpushPublicKey?: string | null;
  otel?:
    | { authorization: string; headers: Record<string, unknown>; url: string }[]
    | null;
  storeId?: string | null;
  stripe?: { authorization: string; usageEvents: { payload: string }[] } | null;
  zdr?: boolean | null;
}

export const CreateAiGatewayResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    accountTag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    cacheInvalidateOnUpdate: Schema.Boolean,
    cacheTtl: Schema.Union([Schema.Number, Schema.Null]),
    collectLogs: Schema.Boolean,
    createdAt: Schema.String,
    internalId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    modifiedAt: Schema.String,
    rateLimitingInterval: Schema.Union([Schema.Number, Schema.Null]),
    rateLimitingLimit: Schema.Union([Schema.Number, Schema.Null]),
    rateLimitingTechnique: Schema.Literals(["fixed", "sliding"]),
    authentication: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    dlp: Schema.optional(
      Schema.Union([
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
        Schema.Null,
      ]),
    ),
    isDefault: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    logManagement: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    logManagementStrategy: Schema.optional(
      Schema.Union([
        Schema.Literal("STOP_INSERTING"),
        Schema.Literal("DELETE_OLDEST"),
        Schema.Null,
      ]),
    ),
    logpush: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    logpushPublicKey: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
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
        }).pipe(
          Schema.encodeKeys({
            authorization: "authorization",
            usageEvents: "usage_events",
          }),
        ),
        Schema.Null,
      ]),
    ),
    zdr: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
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
        authentication: "authentication",
        dlp: "dlp",
        isDefault: "is_default",
        logManagement: "log_management",
        logManagementStrategy: "log_management_strategy",
        logpush: "logpush",
        logpushPublicKey: "logpush_public_key",
        otel: "otel",
        storeId: "store_id",
        stripe: "stripe",
        zdr: "zdr",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<CreateAiGatewayResponse>;

export type CreateAiGatewayError = DefaultErrors | GatewayAlreadyExists;

export const createAiGateway: API.OperationMethod<
  CreateAiGatewayRequest,
  CreateAiGatewayResponse,
  CreateAiGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAiGatewayRequest,
  output: CreateAiGatewayResponse,
  errors: [GatewayAlreadyExists],
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

export const UpdateAiGatewayRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
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
    logpushPublicKey: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
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
        }).pipe(
          Schema.encodeKeys({
            authorization: "authorization",
            usageEvents: "usage_events",
          }),
        ),
        Schema.Null,
      ]),
    ),
    zdr: Schema.optional(Schema.Boolean),
  },
).pipe(
  Schema.encodeKeys({
    cacheInvalidateOnUpdate: "cache_invalidate_on_update",
    cacheTtl: "cache_ttl",
    collectLogs: "collect_logs",
    rateLimitingInterval: "rate_limiting_interval",
    rateLimitingLimit: "rate_limiting_limit",
    rateLimitingTechnique: "rate_limiting_technique",
    authentication: "authentication",
    dlp: "dlp",
    isDefault: "is_default",
    logManagement: "log_management",
    logManagementStrategy: "log_management_strategy",
    logpush: "logpush",
    logpushPublicKey: "logpush_public_key",
    otel: "otel",
    storeId: "store_id",
    stripe: "stripe",
    zdr: "zdr",
  }),
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/ai-gateway/gateways/{id}",
  }),
) as unknown as Schema.Schema<UpdateAiGatewayRequest>;

export interface UpdateAiGatewayResponse {
  /** gateway id */
  id: string;
  accountId?: string | null;
  accountTag?: string | null;
  cacheInvalidateOnUpdate: boolean;
  cacheTtl: number | null;
  collectLogs: boolean;
  createdAt: string;
  internalId?: string | null;
  modifiedAt: string;
  rateLimitingInterval: number | null;
  rateLimitingLimit: number | null;
  rateLimitingTechnique: "fixed" | "sliding";
  authentication?: boolean | null;
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
      }
    | null;
  isDefault?: boolean | null;
  logManagement?: number | null;
  logManagementStrategy?: "STOP_INSERTING" | "DELETE_OLDEST" | null;
  logpush?: boolean | null;
  logpushPublicKey?: string | null;
  otel?:
    | { authorization: string; headers: Record<string, unknown>; url: string }[]
    | null;
  storeId?: string | null;
  stripe?: { authorization: string; usageEvents: { payload: string }[] } | null;
  zdr?: boolean | null;
}

export const UpdateAiGatewayResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    accountTag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    cacheInvalidateOnUpdate: Schema.Boolean,
    cacheTtl: Schema.Union([Schema.Number, Schema.Null]),
    collectLogs: Schema.Boolean,
    createdAt: Schema.String,
    internalId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    modifiedAt: Schema.String,
    rateLimitingInterval: Schema.Union([Schema.Number, Schema.Null]),
    rateLimitingLimit: Schema.Union([Schema.Number, Schema.Null]),
    rateLimitingTechnique: Schema.Literals(["fixed", "sliding"]),
    authentication: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    dlp: Schema.optional(
      Schema.Union([
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
        Schema.Null,
      ]),
    ),
    isDefault: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    logManagement: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    logManagementStrategy: Schema.optional(
      Schema.Union([
        Schema.Literal("STOP_INSERTING"),
        Schema.Literal("DELETE_OLDEST"),
        Schema.Null,
      ]),
    ),
    logpush: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    logpushPublicKey: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
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
        }).pipe(
          Schema.encodeKeys({
            authorization: "authorization",
            usageEvents: "usage_events",
          }),
        ),
        Schema.Null,
      ]),
    ),
    zdr: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
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
        authentication: "authentication",
        dlp: "dlp",
        isDefault: "is_default",
        logManagement: "log_management",
        logManagementStrategy: "log_management_strategy",
        logpush: "logpush",
        logpushPublicKey: "logpush_public_key",
        otel: "otel",
        storeId: "store_id",
        stripe: "stripe",
        zdr: "zdr",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<UpdateAiGatewayResponse>;

export type UpdateAiGatewayError = DefaultErrors | GatewayNotFound;

export const updateAiGateway: API.OperationMethod<
  UpdateAiGatewayRequest,
  UpdateAiGatewayResponse,
  UpdateAiGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateAiGatewayRequest,
  output: UpdateAiGatewayResponse,
  errors: [GatewayNotFound],
}));

export interface DeleteAiGatewayRequest {
  id: string;
  accountId: string;
}

export const DeleteAiGatewayRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.String.pipe(T.HttpPath("id")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/ai-gateway/gateways/{id}",
  }),
) as unknown as Schema.Schema<DeleteAiGatewayRequest>;

export interface DeleteAiGatewayResponse {
  /** gateway id */
  id: string;
  accountId?: string | null;
  accountTag?: string | null;
  cacheInvalidateOnUpdate: boolean;
  cacheTtl: number | null;
  collectLogs: boolean;
  createdAt: string;
  internalId?: string | null;
  modifiedAt: string;
  rateLimitingInterval: number | null;
  rateLimitingLimit: number | null;
  rateLimitingTechnique: "fixed" | "sliding";
  authentication?: boolean | null;
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
      }
    | null;
  isDefault?: boolean | null;
  logManagement?: number | null;
  logManagementStrategy?: "STOP_INSERTING" | "DELETE_OLDEST" | null;
  logpush?: boolean | null;
  logpushPublicKey?: string | null;
  otel?:
    | { authorization: string; headers: Record<string, unknown>; url: string }[]
    | null;
  storeId?: string | null;
  stripe?: { authorization: string; usageEvents: { payload: string }[] } | null;
  zdr?: boolean | null;
}

export const DeleteAiGatewayResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    accountTag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    cacheInvalidateOnUpdate: Schema.Boolean,
    cacheTtl: Schema.Union([Schema.Number, Schema.Null]),
    collectLogs: Schema.Boolean,
    createdAt: Schema.String,
    internalId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    modifiedAt: Schema.String,
    rateLimitingInterval: Schema.Union([Schema.Number, Schema.Null]),
    rateLimitingLimit: Schema.Union([Schema.Number, Schema.Null]),
    rateLimitingTechnique: Schema.Literals(["fixed", "sliding"]),
    authentication: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    dlp: Schema.optional(
      Schema.Union([
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
        Schema.Null,
      ]),
    ),
    isDefault: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    logManagement: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    logManagementStrategy: Schema.optional(
      Schema.Union([
        Schema.Literal("STOP_INSERTING"),
        Schema.Literal("DELETE_OLDEST"),
        Schema.Null,
      ]),
    ),
    logpush: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    logpushPublicKey: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
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
        }).pipe(
          Schema.encodeKeys({
            authorization: "authorization",
            usageEvents: "usage_events",
          }),
        ),
        Schema.Null,
      ]),
    ),
    zdr: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
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
        authentication: "authentication",
        dlp: "dlp",
        isDefault: "is_default",
        logManagement: "log_management",
        logManagementStrategy: "log_management_strategy",
        logpush: "logpush",
        logpushPublicKey: "logpush_public_key",
        otel: "otel",
        storeId: "store_id",
        stripe: "stripe",
        zdr: "zdr",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<DeleteAiGatewayResponse>;

export type DeleteAiGatewayError = DefaultErrors | GatewayNotFound;

export const deleteAiGateway: API.OperationMethod<
  DeleteAiGatewayRequest,
  DeleteAiGatewayResponse,
  DeleteAiGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAiGatewayRequest,
  output: DeleteAiGatewayResponse,
  errors: [GatewayNotFound],
}));

// =============================================================================
// Dataset
// =============================================================================

export interface GetDatasetRequest {
  gatewayId: string;
  id: string;
  accountId: string;
}

export const GetDatasetRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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

export const GetDatasetResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      accountId: "account_id",
      accountTag: "account_tag",
      createdAt: "created_at",
      enable: "enable",
      filters: "filters",
      gatewayId: "gateway_id",
      modifiedAt: "modified_at",
      name: "name",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetDatasetResponse>;

export type GetDatasetError = DefaultErrors;

export const getDataset: API.OperationMethod<
  GetDatasetRequest,
  GetDatasetResponse,
  GetDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetDatasetRequest,
  output: GetDatasetResponse,
  errors: [],
}));

export interface ListDatasetsRequest {
  gatewayId: string;
  /** Path param: */
  accountId: string;
  /** Query param: */
  enable?: boolean;
  /** Query param: */
  name?: string;
  /** Query param: Search by id, name, filters */
  search?: string;
}

export const ListDatasetsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  gatewayId: Schema.String.pipe(T.HttpPath("gatewayId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  enable: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("enable")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  search: Schema.optional(Schema.String).pipe(T.HttpQuery("search")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/ai-gateway/gateways/{gatewayId}/datasets",
  }),
) as unknown as Schema.Schema<ListDatasetsRequest>;

export interface ListDatasetsResponse {
  result: {
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
  resultInfo: {
    count?: number | null;
    page?: number | null;
    perPage?: number | null;
    totalCount?: number | null;
  };
}

export const ListDatasetsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
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
        id: "id",
        accountId: "account_id",
        accountTag: "account_tag",
        createdAt: "created_at",
        enable: "enable",
        filters: "filters",
        gatewayId: "gateway_id",
        modifiedAt: "modified_at",
        name: "name",
      }),
    ),
  ),
  resultInfo: Schema.Struct({
    count: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    page: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    perPage: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    totalCount: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  }).pipe(
    Schema.encodeKeys({
      count: "count",
      page: "page",
      perPage: "per_page",
      totalCount: "total_count",
    }),
  ),
}).pipe(
  Schema.encodeKeys({ result: "result", resultInfo: "result_info" }),
) as unknown as Schema.Schema<ListDatasetsResponse>;

export type ListDatasetsError = DefaultErrors;

export const listDatasets: API.PaginatedOperationMethod<
  ListDatasetsRequest,
  ListDatasetsResponse,
  ListDatasetsError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListDatasetsRequest,
  ) => stream.Stream<
    ListDatasetsResponse,
    ListDatasetsError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: ListDatasetsRequest) => stream.Stream<
    {
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
    },
    ListDatasetsError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListDatasetsRequest,
  output: ListDatasetsResponse,
  errors: [],
  pagination: {
    mode: "page",
    inputToken: "page",
    outputToken: "resultInfo.page",
    items: "result",
    pageSize: "perPage",
  } as const,
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

export const CreateDatasetRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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

export const CreateDatasetResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      accountId: "account_id",
      accountTag: "account_tag",
      createdAt: "created_at",
      enable: "enable",
      filters: "filters",
      gatewayId: "gateway_id",
      modifiedAt: "modified_at",
      name: "name",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<CreateDatasetResponse>;

export type CreateDatasetError = DefaultErrors;

export const createDataset: API.OperationMethod<
  CreateDatasetRequest,
  CreateDatasetResponse,
  CreateDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const UpdateDatasetRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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

export const UpdateDatasetResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      accountId: "account_id",
      accountTag: "account_tag",
      createdAt: "created_at",
      enable: "enable",
      filters: "filters",
      gatewayId: "gateway_id",
      modifiedAt: "modified_at",
      name: "name",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<UpdateDatasetResponse>;

export type UpdateDatasetError = DefaultErrors;

export const updateDataset: API.OperationMethod<
  UpdateDatasetRequest,
  UpdateDatasetResponse,
  UpdateDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateDatasetRequest,
  output: UpdateDatasetResponse,
  errors: [],
}));

export interface DeleteDatasetRequest {
  gatewayId: string;
  id: string;
  accountId: string;
}

export const DeleteDatasetRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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

export const DeleteDatasetResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      accountId: "account_id",
      accountTag: "account_tag",
      createdAt: "created_at",
      enable: "enable",
      filters: "filters",
      gatewayId: "gateway_id",
      modifiedAt: "modified_at",
      name: "name",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<DeleteDatasetResponse>;

export type DeleteDatasetError = DefaultErrors;

export const deleteDataset: API.OperationMethod<
  DeleteDatasetRequest,
  DeleteDatasetResponse,
  DeleteDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const GetEvaluationRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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

export const GetEvaluationResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
        id: "id",
        accountId: "account_id",
        accountTag: "account_tag",
        createdAt: "created_at",
        enable: "enable",
        filters: "filters",
        gatewayId: "gateway_id",
        modifiedAt: "modified_at",
        name: "name",
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
        id: "id",
        createdAt: "created_at",
        evaluationId: "evaluation_id",
        evaluationTypeId: "evaluation_type_id",
        modifiedAt: "modified_at",
        result: "result",
        status: "status",
        statusDescription: "status_description",
        totalLogs: "total_logs",
      }),
    ),
  ),
  totalLogs: Schema.Number,
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      accountId: "account_id",
      accountTag: "account_tag",
      createdAt: "created_at",
      datasets: "datasets",
      gatewayId: "gateway_id",
      modifiedAt: "modified_at",
      name: "name",
      processed: "processed",
      results: "results",
      totalLogs: "total_logs",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetEvaluationResponse>;

export type GetEvaluationError = DefaultErrors;

export const getEvaluation: API.OperationMethod<
  GetEvaluationRequest,
  GetEvaluationResponse,
  GetEvaluationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetEvaluationRequest,
  output: GetEvaluationResponse,
  errors: [],
}));

export interface ListEvaluationsRequest {
  gatewayId: string;
  /** Path param: */
  accountId: string;
  /** Query param: */
  name?: string;
  /** Query param: */
  processed?: boolean;
  /** Query param: Search by id, name */
  search?: string;
}

export const ListEvaluationsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    gatewayId: Schema.String.pipe(T.HttpPath("gatewayId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
    processed: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("processed")),
    search: Schema.optional(Schema.String).pipe(T.HttpQuery("search")),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/ai-gateway/gateways/{gatewayId}/evaluations",
  }),
) as unknown as Schema.Schema<ListEvaluationsRequest>;

export interface ListEvaluationsResponse {
  result: {
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
  }[];
  resultInfo: {
    count?: number | null;
    page?: number | null;
    perPage?: number | null;
    totalCount?: number | null;
  };
}

export const ListEvaluationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.Array(
      Schema.Struct({
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
              id: "id",
              accountId: "account_id",
              accountTag: "account_tag",
              createdAt: "created_at",
              enable: "enable",
              filters: "filters",
              gatewayId: "gateway_id",
              modifiedAt: "modified_at",
              name: "name",
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
              id: "id",
              createdAt: "created_at",
              evaluationId: "evaluation_id",
              evaluationTypeId: "evaluation_type_id",
              modifiedAt: "modified_at",
              result: "result",
              status: "status",
              statusDescription: "status_description",
              totalLogs: "total_logs",
            }),
          ),
        ),
        totalLogs: Schema.Number,
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          accountId: "account_id",
          accountTag: "account_tag",
          createdAt: "created_at",
          datasets: "datasets",
          gatewayId: "gateway_id",
          modifiedAt: "modified_at",
          name: "name",
          processed: "processed",
          results: "results",
          totalLogs: "total_logs",
        }),
      ),
    ),
    resultInfo: Schema.Struct({
      count: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      page: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      perPage: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      totalCount: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    }).pipe(
      Schema.encodeKeys({
        count: "count",
        page: "page",
        perPage: "per_page",
        totalCount: "total_count",
      }),
    ),
  }).pipe(
    Schema.encodeKeys({ result: "result", resultInfo: "result_info" }),
  ) as unknown as Schema.Schema<ListEvaluationsResponse>;

export type ListEvaluationsError = DefaultErrors;

export const listEvaluations: API.PaginatedOperationMethod<
  ListEvaluationsRequest,
  ListEvaluationsResponse,
  ListEvaluationsError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListEvaluationsRequest,
  ) => stream.Stream<
    ListEvaluationsResponse,
    ListEvaluationsError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: ListEvaluationsRequest) => stream.Stream<
    {
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
    },
    ListEvaluationsError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListEvaluationsRequest,
  output: ListEvaluationsResponse,
  errors: [],
  pagination: {
    mode: "page",
    inputToken: "page",
    outputToken: "resultInfo.page",
    items: "result",
    pageSize: "perPage",
  } as const,
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

export const CreateEvaluationRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    gatewayId: Schema.String.pipe(T.HttpPath("gatewayId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    datasetIds: Schema.Array(Schema.String),
    evaluationTypeIds: Schema.Array(Schema.String),
    name: Schema.String,
  }).pipe(
    Schema.encodeKeys({
      datasetIds: "dataset_ids",
      evaluationTypeIds: "evaluation_type_ids",
      name: "name",
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

export const CreateEvaluationResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
          id: "id",
          accountId: "account_id",
          accountTag: "account_tag",
          createdAt: "created_at",
          enable: "enable",
          filters: "filters",
          gatewayId: "gateway_id",
          modifiedAt: "modified_at",
          name: "name",
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
          id: "id",
          createdAt: "created_at",
          evaluationId: "evaluation_id",
          evaluationTypeId: "evaluation_type_id",
          modifiedAt: "modified_at",
          result: "result",
          status: "status",
          statusDescription: "status_description",
          totalLogs: "total_logs",
        }),
      ),
    ),
    totalLogs: Schema.Number,
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        accountId: "account_id",
        accountTag: "account_tag",
        createdAt: "created_at",
        datasets: "datasets",
        gatewayId: "gateway_id",
        modifiedAt: "modified_at",
        name: "name",
        processed: "processed",
        results: "results",
        totalLogs: "total_logs",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<CreateEvaluationResponse>;

export type CreateEvaluationError = DefaultErrors;

export const createEvaluation: API.OperationMethod<
  CreateEvaluationRequest,
  CreateEvaluationResponse,
  CreateEvaluationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateEvaluationRequest,
  output: CreateEvaluationResponse,
  errors: [],
}));

export interface DeleteEvaluationRequest {
  gatewayId: string;
  id: string;
  accountId: string;
}

export const DeleteEvaluationRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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

export const DeleteEvaluationResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
          id: "id",
          accountId: "account_id",
          accountTag: "account_tag",
          createdAt: "created_at",
          enable: "enable",
          filters: "filters",
          gatewayId: "gateway_id",
          modifiedAt: "modified_at",
          name: "name",
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
          id: "id",
          createdAt: "created_at",
          evaluationId: "evaluation_id",
          evaluationTypeId: "evaluation_type_id",
          modifiedAt: "modified_at",
          result: "result",
          status: "status",
          statusDescription: "status_description",
          totalLogs: "total_logs",
        }),
      ),
    ),
    totalLogs: Schema.Number,
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        accountId: "account_id",
        accountTag: "account_tag",
        createdAt: "created_at",
        datasets: "datasets",
        gatewayId: "gateway_id",
        modifiedAt: "modified_at",
        name: "name",
        processed: "processed",
        results: "results",
        totalLogs: "total_logs",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<DeleteEvaluationResponse>;

export type DeleteEvaluationError = DefaultErrors;

export const deleteEvaluation: API.OperationMethod<
  DeleteEvaluationRequest,
  DeleteEvaluationResponse,
  DeleteEvaluationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteEvaluationRequest,
  output: DeleteEvaluationResponse,
  errors: [],
}));

// =============================================================================
// EvaluationType
// =============================================================================

export interface ListEvaluationTypesRequest {
  /** Path param: */
  accountId: string;
  /** Query param: */
  orderBy?: string;
  /** Query param: */
  orderByDirection?: "asc" | "desc";
}

export const ListEvaluationTypesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("order_by")),
    orderByDirection: Schema.optional(Schema.Literals(["asc", "desc"])).pipe(
      T.HttpQuery("order_by_direction"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/ai-gateway/evaluation-types",
    }),
  ) as unknown as Schema.Schema<ListEvaluationTypesRequest>;

export interface ListEvaluationTypesResponse {
  result: {
    id: string;
    createdAt: string;
    description: string;
    enable: boolean;
    mandatory: boolean;
    modifiedAt: string;
    name: string;
    type: string;
  }[];
  resultInfo: {
    count?: number | null;
    page?: number | null;
    perPage?: number | null;
    totalCount?: number | null;
  };
}

export const ListEvaluationTypesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        createdAt: Schema.String,
        description: Schema.String,
        enable: Schema.Boolean,
        mandatory: Schema.Boolean,
        modifiedAt: Schema.String,
        name: Schema.String,
        type: Schema.String,
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          createdAt: "created_at",
          description: "description",
          enable: "enable",
          mandatory: "mandatory",
          modifiedAt: "modified_at",
          name: "name",
          type: "type",
        }),
      ),
    ),
    resultInfo: Schema.Struct({
      count: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      page: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      perPage: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      totalCount: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    }).pipe(
      Schema.encodeKeys({
        count: "count",
        page: "page",
        perPage: "per_page",
        totalCount: "total_count",
      }),
    ),
  }).pipe(
    Schema.encodeKeys({ result: "result", resultInfo: "result_info" }),
  ) as unknown as Schema.Schema<ListEvaluationTypesResponse>;

export type ListEvaluationTypesError = DefaultErrors;

export const listEvaluationTypes: API.PaginatedOperationMethod<
  ListEvaluationTypesRequest,
  ListEvaluationTypesResponse,
  ListEvaluationTypesError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListEvaluationTypesRequest,
  ) => stream.Stream<
    ListEvaluationTypesResponse,
    ListEvaluationTypesError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: ListEvaluationTypesRequest) => stream.Stream<
    {
      id: string;
      createdAt: string;
      description: string;
      enable: boolean;
      mandatory: boolean;
      modifiedAt: string;
      name: string;
      type: string;
    },
    ListEvaluationTypesError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListEvaluationTypesRequest,
  output: ListEvaluationTypesResponse,
  errors: [],
  pagination: {
    mode: "page",
    inputToken: "page",
    outputToken: "resultInfo.page",
    items: "result",
    pageSize: "perPage",
  } as const,
}));

// =============================================================================
// Log
// =============================================================================

export interface GetLogRequest {
  gatewayId: string;
  id: string;
  accountId: string;
}

export const GetLogRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  cost?: number | null;
  customCost?: boolean | null;
  metadata?: string | null;
  modelType?: string | null;
  requestContentType?: string | null;
  requestHead?: string | null;
  requestHeadComplete?: boolean | null;
  requestSize?: number | null;
  requestType?: string | null;
  responseContentType?: string | null;
  responseHead?: string | null;
  responseHeadComplete?: boolean | null;
  responseSize?: number | null;
  statusCode?: number | null;
  step?: number | null;
}

export const GetLogResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  cost: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  customCost: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  metadata: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  modelType: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  requestContentType: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  requestHead: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  requestHeadComplete: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  requestSize: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  requestType: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  responseContentType: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  responseHead: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  responseHeadComplete: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  responseSize: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  statusCode: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  step: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      cached: "cached",
      createdAt: "created_at",
      duration: "duration",
      model: "model",
      path: "path",
      provider: "provider",
      success: "success",
      tokensIn: "tokens_in",
      tokensOut: "tokens_out",
      cost: "cost",
      customCost: "custom_cost",
      metadata: "metadata",
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
      step: "step",
    }),
  )
  .pipe(T.ResponsePath("result")) as unknown as Schema.Schema<GetLogResponse>;

export type GetLogError = DefaultErrors;

export const getLog: API.OperationMethod<
  GetLogRequest,
  GetLogResponse,
  GetLogError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetLogRequest,
  output: GetLogResponse,
  errors: [],
}));

export interface ListLogsRequest {
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
  metaInfo?: boolean;
  /** Query param: */
  orderBy?:
    | "created_at"
    | "provider"
    | "model"
    | "model_type"
    | "success"
    | "cached";
  /** Query param: */
  orderByDirection?: "asc" | "desc";
  /** Query param: */
  search?: string;
  /** @deprecated Query param: */
  cached?: boolean;
  /** @deprecated Query param: */
  direction?: "asc" | "desc";
  /** @deprecated Query param: */
  endDate?: string;
  /** @deprecated Query param: */
  feedback?: "0" | "1";
  /** @deprecated Query param: */
  maxCost?: number;
  /** @deprecated Query param: */
  maxDuration?: number;
  /** @deprecated Query param: */
  maxTokensIn?: number;
  /** @deprecated Query param: */
  maxTokensOut?: number;
  /** @deprecated Query param: */
  maxTotalTokens?: number;
  /** @deprecated Query param: */
  minCost?: number;
  /** @deprecated Query param: */
  minDuration?: number;
  /** @deprecated Query param: */
  minTokensIn?: number;
  /** @deprecated Query param: */
  minTokensOut?: number;
  /** @deprecated Query param: */
  minTotalTokens?: number;
  /** @deprecated Query param: */
  model?: string;
  /** @deprecated Query param: */
  modelType?: string;
  /** @deprecated Query param: */
  provider?: string;
  /** @deprecated Query param: */
  requestContentType?: string;
  /** @deprecated Query param: */
  responseContentType?: string;
  /** @deprecated Query param: */
  startDate?: string;
  /** @deprecated Query param: */
  success?: boolean;
}

export const ListLogsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  metaInfo: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("meta_info")),
  orderBy: Schema.optional(
    Schema.Literals([
      "created_at",
      "provider",
      "model",
      "model_type",
      "success",
      "cached",
    ]),
  ).pipe(T.HttpQuery("order_by")),
  orderByDirection: Schema.optional(Schema.Literals(["asc", "desc"])).pipe(
    T.HttpQuery("order_by_direction"),
  ),
  search: Schema.optional(Schema.String).pipe(T.HttpQuery("search")),
  cached: Schema.optional(Schema.Boolean),
  direction: Schema.optional(Schema.Literals(["asc", "desc"])),
  endDate: Schema.optional(Schema.String),
  feedback: Schema.optional(Schema.Literals(["0", "1"])),
  maxCost: Schema.optional(Schema.Number),
  maxDuration: Schema.optional(Schema.Number),
  maxTokensIn: Schema.optional(Schema.Number),
  maxTokensOut: Schema.optional(Schema.Number),
  maxTotalTokens: Schema.optional(Schema.Number),
  minCost: Schema.optional(Schema.Number),
  minDuration: Schema.optional(Schema.Number),
  minTokensIn: Schema.optional(Schema.Number),
  minTokensOut: Schema.optional(Schema.Number),
  minTotalTokens: Schema.optional(Schema.Number),
  model: Schema.optional(Schema.String),
  modelType: Schema.optional(Schema.String),
  provider: Schema.optional(Schema.String),
  requestContentType: Schema.optional(Schema.String),
  responseContentType: Schema.optional(Schema.String),
  startDate: Schema.optional(Schema.String),
  success: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({
    cached: "cached",
    direction: "direction",
    endDate: "end_date",
    feedback: "feedback",
    maxCost: "max_cost",
    maxDuration: "max_duration",
    maxTokensIn: "max_tokens_in",
    maxTokensOut: "max_tokens_out",
    maxTotalTokens: "max_total_tokens",
    minCost: "min_cost",
    minDuration: "min_duration",
    minTokensIn: "min_tokens_in",
    minTokensOut: "min_tokens_out",
    minTotalTokens: "min_total_tokens",
    model: "model",
    modelType: "model_type",
    provider: "provider",
    requestContentType: "request_content_type",
    responseContentType: "response_content_type",
    startDate: "start_date",
    success: "success",
  }),
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/ai-gateway/gateways/{gatewayId}/logs",
  }),
) as unknown as Schema.Schema<ListLogsRequest>;

export interface ListLogsResponse {
  result: {
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
    cost?: number | null;
    customCost?: boolean | null;
    metadata?: string | null;
    modelType?: string | null;
    requestContentType?: string | null;
    requestType?: string | null;
    responseContentType?: string | null;
    statusCode?: number | null;
    step?: number | null;
  }[];
  resultInfo: {
    count?: number | null;
    page?: number | null;
    perPage?: number | null;
    totalCount?: number | null;
  };
}

export const ListLogsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
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
      cost: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      customCost: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
      metadata: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      modelType: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      requestContentType: Schema.optional(
        Schema.Union([Schema.String, Schema.Null]),
      ),
      requestType: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      responseContentType: Schema.optional(
        Schema.Union([Schema.String, Schema.Null]),
      ),
      statusCode: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      step: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        cached: "cached",
        createdAt: "created_at",
        duration: "duration",
        model: "model",
        path: "path",
        provider: "provider",
        success: "success",
        tokensIn: "tokens_in",
        tokensOut: "tokens_out",
        cost: "cost",
        customCost: "custom_cost",
        metadata: "metadata",
        modelType: "model_type",
        requestContentType: "request_content_type",
        requestType: "request_type",
        responseContentType: "response_content_type",
        statusCode: "status_code",
        step: "step",
      }),
    ),
  ),
  resultInfo: Schema.Struct({
    count: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    page: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    perPage: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    totalCount: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  }).pipe(
    Schema.encodeKeys({
      count: "count",
      page: "page",
      perPage: "per_page",
      totalCount: "total_count",
    }),
  ),
}).pipe(
  Schema.encodeKeys({ result: "result", resultInfo: "result_info" }),
) as unknown as Schema.Schema<ListLogsResponse>;

export type ListLogsError = DefaultErrors;

export const listLogs: API.PaginatedOperationMethod<
  ListLogsRequest,
  ListLogsResponse,
  ListLogsError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListLogsRequest,
  ) => stream.Stream<
    ListLogsResponse,
    ListLogsError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: ListLogsRequest) => stream.Stream<
    {
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
      cost?: number | null;
      customCost?: boolean | null;
      metadata?: string | null;
      modelType?: string | null;
      requestContentType?: string | null;
      requestType?: string | null;
      responseContentType?: string | null;
      statusCode?: number | null;
      step?: number | null;
    },
    ListLogsError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListLogsRequest,
  output: ListLogsResponse,
  errors: [],
  pagination: {
    mode: "page",
    inputToken: "page",
    outputToken: "resultInfo.page",
    items: "result",
    pageSize: "perPage",
  } as const,
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

export const PatchLogRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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

export const PatchLogResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown.pipe(
  T.ResponsePath("result"),
) as unknown as Schema.Schema<PatchLogResponse>;

export type PatchLogError = DefaultErrors;

export const patchLog: API.OperationMethod<
  PatchLogRequest,
  PatchLogResponse,
  PatchLogError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const DeleteLogRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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

export const DeleteLogResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  success: Schema.Boolean,
}) as unknown as Schema.Schema<DeleteLogResponse>;

export type DeleteLogError = DefaultErrors;

export const deleteLog: API.OperationMethod<
  DeleteLogRequest,
  DeleteLogResponse,
  DeleteLogError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteLogRequest,
  output: DeleteLogResponse,
  errors: [],
}));

export interface RequestLogRequest {
  gatewayId: string;
  id: string;
  accountId: string;
}

export const RequestLogRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<RequestLogResponse>;

export type RequestLogError = DefaultErrors;

export const requestLog: API.OperationMethod<
  RequestLogRequest,
  RequestLogResponse,
  RequestLogError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RequestLogRequest,
  output: RequestLogResponse,
  errors: [],
}));

export interface ResponseLogRequest {
  gatewayId: string;
  id: string;
  accountId: string;
}

export const ResponseLogRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<ResponseLogResponse>;

export type ResponseLogError = DefaultErrors;

export const responseLog: API.OperationMethod<
  ResponseLogRequest,
  ResponseLogResponse,
  ResponseLogError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const GetUrlRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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

export const GetUrlResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.String.pipe(
  T.ResponsePath("result"),
) as unknown as Schema.Schema<GetUrlResponse>;

export type GetUrlError = DefaultErrors;

export const getUrl: API.OperationMethod<
  GetUrlRequest,
  GetUrlResponse,
  GetUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetUrlRequest,
  output: GetUrlResponse,
  errors: [],
}));
