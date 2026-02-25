/**
 * Cloudflare ZONES API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service zones
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
// ActivationCheck
// =============================================================================

export interface TriggerActivationCheckRequest {
  /** Identifier. */
  zoneId: string;
}

export const TriggerActivationCheckRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "PUT", path: "/zones/{zone_id}/activation_check" }),
) as unknown as Schema.Schema<TriggerActivationCheckRequest>;

export interface TriggerActivationCheckResponse {
  /** Identifier. */
  id?: string;
}

export const TriggerActivationCheckResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<TriggerActivationCheckResponse>;

export const triggerActivationCheck: (
  input: TriggerActivationCheckRequest,
) => Effect.Effect<
  TriggerActivationCheckResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: TriggerActivationCheckRequest,
  output: TriggerActivationCheckResponse,
  errors: [],
}));

// =============================================================================
// CustomNameserver
// =============================================================================

export interface GetCustomNameserverRequest {
  /** Identifier. */
  zoneId: string;
}

export const GetCustomNameserverRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/custom_ns" }),
) as unknown as Schema.Schema<GetCustomNameserverRequest>;

export interface GetCustomNameserverResponse {
  errors: {
    code: number;
    message: string;
    documentationUrl?: string;
    source?: { pointer?: string };
  }[];
  messages: {
    code: number;
    message: string;
    documentationUrl?: string;
    source?: { pointer?: string };
  }[];
  /** Whether the API call was successful. */
  success: true;
  /** Whether zone uses account-level custom nameservers. */
  enabled?: boolean;
  /** The number of the name server set to assign to the zone. */
  nsSet?: number;
  resultInfo?: {
    count?: number;
    page?: number;
    perPage?: number;
    totalCount?: number;
  };
}

export const GetCustomNameserverResponse = Schema.Struct({
  errors: Schema.Array(
    Schema.Struct({
      code: Schema.Number,
      message: Schema.String,
      documentationUrl: Schema.optional(Schema.String),
      source: Schema.optional(
        Schema.Struct({
          pointer: Schema.optional(Schema.String),
        }),
      ),
    }).pipe(Schema.encodeKeys({ documentationUrl: "documentation_url" })),
  ),
  messages: Schema.Array(
    Schema.Struct({
      code: Schema.Number,
      message: Schema.String,
      documentationUrl: Schema.optional(Schema.String),
      source: Schema.optional(
        Schema.Struct({
          pointer: Schema.optional(Schema.String),
        }),
      ),
    }).pipe(Schema.encodeKeys({ documentationUrl: "documentation_url" })),
  ),
  success: Schema.Literal(true),
  enabled: Schema.optional(Schema.Boolean),
  nsSet: Schema.optional(Schema.Number),
  resultInfo: Schema.optional(
    Schema.Struct({
      count: Schema.optional(Schema.Number),
      page: Schema.optional(Schema.Number),
      perPage: Schema.optional(Schema.Number),
      totalCount: Schema.optional(Schema.Number),
    }).pipe(
      Schema.encodeKeys({ perPage: "per_page", totalCount: "total_count" }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({ nsSet: "ns_set", resultInfo: "result_info" }),
) as unknown as Schema.Schema<GetCustomNameserverResponse>;

export const getCustomNameserver: (
  input: GetCustomNameserverRequest,
) => Effect.Effect<
  GetCustomNameserverResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetCustomNameserverRequest,
  output: GetCustomNameserverResponse,
  errors: [],
}));

export interface UpdateCustomNameserverRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: Whether zone uses account-level custom nameservers. */
  enabled?: boolean;
  /** Body param: The number of the name server set to assign to the zone. */
  nsSet?: number;
}

export const UpdateCustomNameserverRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  enabled: Schema.optional(Schema.Boolean),
  nsSet: Schema.optional(Schema.Number),
}).pipe(
  Schema.encodeKeys({ nsSet: "ns_set" }),
  T.Http({ method: "GET", path: "/zones/{zone_id}/custom_ns" }),
) as unknown as Schema.Schema<UpdateCustomNameserverRequest>;

export type UpdateCustomNameserverResponse = string[];

export const UpdateCustomNameserverResponse = Schema.Array(
  Schema.String,
) as unknown as Schema.Schema<UpdateCustomNameserverResponse>;

export const updateCustomNameserver: (
  input: UpdateCustomNameserverRequest,
) => Effect.Effect<
  UpdateCustomNameserverResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateCustomNameserverRequest,
  output: UpdateCustomNameserverResponse,
  errors: [],
}));

// =============================================================================
// Hold
// =============================================================================

export interface GetHoldRequest {
  /** Identifier. */
  zoneId: string;
}

export const GetHoldRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/hold" }),
) as unknown as Schema.Schema<GetHoldRequest>;

export interface GetHoldResponse {
  hold?: boolean;
  holdAfter?: string;
  includeSubdomains?: string;
}

export const GetHoldResponse = Schema.Struct({
  hold: Schema.optional(Schema.Boolean),
  holdAfter: Schema.optional(Schema.String),
  includeSubdomains: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    holdAfter: "hold_after",
    includeSubdomains: "include_subdomains",
  }),
) as unknown as Schema.Schema<GetHoldResponse>;

export const getHold: (
  input: GetHoldRequest,
) => Effect.Effect<
  GetHoldResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetHoldRequest,
  output: GetHoldResponse,
  errors: [],
}));

export interface CreateHoldRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Query param: If provided, the zone hold will extend to block any subdomain of the given zone, as well as SSL4SaaS Custom Hostnames. For example, a zone hold on a zone with the hostname 'example.com' a */
  includeSubdomains?: boolean;
}

export const CreateHoldRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  includeSubdomains: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("include_subdomains"),
  ),
}).pipe(
  T.Http({ method: "POST", path: "/zones/{zone_id}/hold" }),
) as unknown as Schema.Schema<CreateHoldRequest>;

export interface CreateHoldResponse {
  hold?: boolean;
  holdAfter?: string;
  includeSubdomains?: string;
}

export const CreateHoldResponse = Schema.Struct({
  hold: Schema.optional(Schema.Boolean),
  holdAfter: Schema.optional(Schema.String),
  includeSubdomains: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    holdAfter: "hold_after",
    includeSubdomains: "include_subdomains",
  }),
) as unknown as Schema.Schema<CreateHoldResponse>;

export const createHold: (
  input: CreateHoldRequest,
) => Effect.Effect<
  CreateHoldResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateHoldRequest,
  output: CreateHoldResponse,
  errors: [],
}));

export interface PatchHoldRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: If `hold_after` is provided and future-dated, the hold will be temporarily disabled, then automatically re-enabled by the system at the time specified in this RFC3339-formatted timestamp.  */
  holdAfter?: string;
  /** Body param: If `true`, the zone hold will extend to block any subdomain of the given zone, as well as SSL4SaaS Custom Hostnames. For example, a zone hold on a zone with the hostname 'example.com' and  */
  includeSubdomains?: boolean;
}

export const PatchHoldRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  holdAfter: Schema.optional(Schema.String),
  includeSubdomains: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({
    holdAfter: "hold_after",
    includeSubdomains: "include_subdomains",
  }),
  T.Http({ method: "PATCH", path: "/zones/{zone_id}/hold" }),
) as unknown as Schema.Schema<PatchHoldRequest>;

export interface PatchHoldResponse {
  hold?: boolean;
  holdAfter?: string;
  includeSubdomains?: string;
}

export const PatchHoldResponse = Schema.Struct({
  hold: Schema.optional(Schema.Boolean),
  holdAfter: Schema.optional(Schema.String),
  includeSubdomains: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    holdAfter: "hold_after",
    includeSubdomains: "include_subdomains",
  }),
) as unknown as Schema.Schema<PatchHoldResponse>;

export const patchHold: (
  input: PatchHoldRequest,
) => Effect.Effect<
  PatchHoldResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchHoldRequest,
  output: PatchHoldResponse,
  errors: [],
}));

export interface DeleteHoldRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Query param: If `hold_after` is provided, the hold will be temporarily disabled, then automatically re-enabled by the system at the time specified in this RFC3339-formatted timestamp. Otherwise, the h */
  holdAfter?: string;
}

export const DeleteHoldRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  holdAfter: Schema.optional(Schema.String).pipe(T.HttpQuery("hold_after")),
}).pipe(
  T.Http({ method: "DELETE", path: "/zones/{zone_id}/hold" }),
) as unknown as Schema.Schema<DeleteHoldRequest>;

export interface DeleteHoldResponse {
  hold?: boolean;
  holdAfter?: string;
  includeSubdomains?: string;
}

export const DeleteHoldResponse = Schema.Struct({
  hold: Schema.optional(Schema.Boolean),
  holdAfter: Schema.optional(Schema.String),
  includeSubdomains: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    holdAfter: "hold_after",
    includeSubdomains: "include_subdomains",
  }),
) as unknown as Schema.Schema<DeleteHoldResponse>;

export const deleteHold: (
  input: DeleteHoldRequest,
) => Effect.Effect<
  DeleteHoldResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteHoldRequest,
  output: DeleteHoldResponse,
  errors: [],
}));

// =============================================================================
// Plan
// =============================================================================

export interface GetPlanRequest {
  planIdentifier: string;
  /** Identifier */
  zoneId: string;
}

export const GetPlanRequest = Schema.Struct({
  planIdentifier: Schema.String.pipe(T.HttpPath("planIdentifier")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/available_plans/{planIdentifier}",
  }),
) as unknown as Schema.Schema<GetPlanRequest>;

export interface GetPlanResponse {
  /** Identifier */
  id?: string;
  /** Indicates whether you can subscribe to this plan. */
  canSubscribe?: boolean;
  /** The monetary unit in which pricing information is displayed. */
  currency?: string;
  /** Indicates whether this plan is managed externally. */
  externallyManaged?: boolean;
  /** The frequency at which you will be billed for this plan. */
  frequency?: "weekly" | "monthly" | "quarterly" | "yearly";
  /** Indicates whether you are currently subscribed to this plan. */
  isSubscribed?: boolean;
  /** Indicates whether this plan has a legacy discount applied. */
  legacyDiscount?: boolean;
  /** The legacy identifier for this rate plan, if any. */
  legacyId?: string;
  /** The plan name. */
  name?: string;
  /** The amount you will be billed for this plan. */
  price?: number;
}

export const GetPlanResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  canSubscribe: Schema.optional(Schema.Boolean),
  currency: Schema.optional(Schema.String),
  externallyManaged: Schema.optional(Schema.Boolean),
  frequency: Schema.optional(
    Schema.Literals(["weekly", "monthly", "quarterly", "yearly"]),
  ),
  isSubscribed: Schema.optional(Schema.Boolean),
  legacyDiscount: Schema.optional(Schema.Boolean),
  legacyId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  price: Schema.optional(Schema.Number),
}).pipe(
  Schema.encodeKeys({
    canSubscribe: "can_subscribe",
    externallyManaged: "externally_managed",
    isSubscribed: "is_subscribed",
    legacyDiscount: "legacy_discount",
    legacyId: "legacy_id",
  }),
) as unknown as Schema.Schema<GetPlanResponse>;

export const getPlan: (
  input: GetPlanRequest,
) => Effect.Effect<
  GetPlanResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPlanRequest,
  output: GetPlanResponse,
  errors: [],
}));

export interface ListPlansRequest {
  /** Identifier */
  zoneId: string;
}

export const ListPlansRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/available_plans" }),
) as unknown as Schema.Schema<ListPlansRequest>;

export type ListPlansResponse = {
  id?: string;
  canSubscribe?: boolean;
  currency?: string;
  externallyManaged?: boolean;
  frequency?: "weekly" | "monthly" | "quarterly" | "yearly";
  isSubscribed?: boolean;
  legacyDiscount?: boolean;
  legacyId?: string;
  name?: string;
  price?: number;
}[];

export const ListPlansResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    canSubscribe: Schema.optional(Schema.Boolean),
    currency: Schema.optional(Schema.String),
    externallyManaged: Schema.optional(Schema.Boolean),
    frequency: Schema.optional(
      Schema.Literals(["weekly", "monthly", "quarterly", "yearly"]),
    ),
    isSubscribed: Schema.optional(Schema.Boolean),
    legacyDiscount: Schema.optional(Schema.Boolean),
    legacyId: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    price: Schema.optional(Schema.Number),
  }).pipe(
    Schema.encodeKeys({
      canSubscribe: "can_subscribe",
      externallyManaged: "externally_managed",
      isSubscribed: "is_subscribed",
      legacyDiscount: "legacy_discount",
      legacyId: "legacy_id",
    }),
  ),
) as unknown as Schema.Schema<ListPlansResponse>;

export const listPlans: (
  input: ListPlansRequest,
) => Effect.Effect<
  ListPlansResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListPlansRequest,
  output: ListPlansResponse,
  errors: [],
}));

// =============================================================================
// RatePlan
// =============================================================================

export interface GetRatePlanRequest {
  /** Identifier */
  zoneId: string;
}

export const GetRatePlanRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/available_rate_plans" }),
) as unknown as Schema.Schema<GetRatePlanRequest>;

export type GetRatePlanResponse = {
  id?: string;
  components?: {
    default?: number;
    name?:
      | "zones"
      | "page_rules"
      | "dedicated_certificates"
      | "dedicated_certificates_custom";
    unitPrice?: number;
  }[];
  currency?: string;
  duration?: number;
  frequency?: "weekly" | "monthly" | "quarterly" | "yearly";
  name?: string;
}[];

export const GetRatePlanResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    components: Schema.optional(
      Schema.Array(
        Schema.Struct({
          default: Schema.optional(Schema.Number),
          name: Schema.optional(
            Schema.Literals([
              "zones",
              "page_rules",
              "dedicated_certificates",
              "dedicated_certificates_custom",
            ]),
          ),
          unitPrice: Schema.optional(Schema.Number),
        }).pipe(Schema.encodeKeys({ unitPrice: "unit_price" })),
      ),
    ),
    currency: Schema.optional(Schema.String),
    duration: Schema.optional(Schema.Number),
    frequency: Schema.optional(
      Schema.Literals(["weekly", "monthly", "quarterly", "yearly"]),
    ),
    name: Schema.optional(Schema.String),
  }),
) as unknown as Schema.Schema<GetRatePlanResponse>;

export const getRatePlan: (
  input: GetRatePlanRequest,
) => Effect.Effect<
  GetRatePlanResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetRatePlanRequest,
  output: GetRatePlanResponse,
  errors: [],
}));

// =============================================================================
// Setting
// =============================================================================

export interface GetSettingRequest {
  settingId: string;
  /** Identifier */
  zoneId: string;
}

export const GetSettingRequest = Schema.Struct({
  settingId: Schema.String.pipe(T.HttpPath("settingId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/settings/{settingId}" }),
) as unknown as Schema.Schema<GetSettingRequest>;

export type GetSettingResponse =
  | {
      id: "0rtt";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "advanced_ddos";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "aegis";
      modifiedOn?: string | null;
      value?: { enabled?: boolean; poolId?: string };
    }
  | {
      id: "always_online";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "always_use_https";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "automatic_https_rewrites";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "brotli";
      value: "off" | "on";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "browser_cache_ttl";
      value: number;
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "browser_check";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "cache_level";
      value: "aggressive" | "basic" | "simplified";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "challenge_ttl";
      value:
        | "300"
        | "900"
        | "1800"
        | "2700"
        | "3600"
        | "7200"
        | "10800"
        | "14400"
        | "28800"
        | "57600"
        | "86400"
        | "604800"
        | "2592000"
        | "31536000";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "china_network_enabled";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "ciphers";
      value: string[];
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "cname_flattening";
      value: "flatten_at_root" | "flatten_all";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "development_mode";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
      timeRemaining?: number;
    }
  | {
      id: "early_hints";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "edge_cache_ttl";
      value:
        | "30"
        | "60"
        | "300"
        | "1200"
        | "1800"
        | "3600"
        | "7200"
        | "10800"
        | "14400"
        | "18000"
        | "28800"
        | "43200"
        | "57600"
        | "72000"
        | "86400"
        | "172800"
        | "259200"
        | "345600"
        | "432000"
        | "518400"
        | "604800";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "email_obfuscation";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "h2_prioritization";
      value: "on" | "off" | "custom";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "hotlink_protection";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "http2";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "http3";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "image_resizing";
      value: "on" | "off" | "open";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "ip_geolocation";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "ipv6";
      value: "off" | "on";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "max_upload";
      value:
        | "100"
        | "125"
        | "150"
        | "175"
        | "200"
        | "225"
        | "250"
        | "275"
        | "300"
        | "325"
        | "350"
        | "375"
        | "400"
        | "425"
        | "450"
        | "475"
        | "500"
        | "1000";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "min_tls_version";
      value: "1.0" | "1.1" | "1.2" | "1.3";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "mirage";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "nel";
      value: { enabled?: boolean };
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "opportunistic_encryption";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "opportunistic_onion";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "orange_to_orange";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "origin_error_page_pass_thru";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | { id: "origin_h2_max_streams"; modifiedOn?: string | null; value?: number }
  | {
      id: "origin_max_http_version";
      modifiedOn?: string | null;
      value?: "2" | "1";
    }
  | {
      id: "polish";
      value: "off" | "lossless" | "lossy";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "prefetch_preload";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "privacy_pass";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "proxy_read_timeout";
      value: number;
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "pseudo_ipv4";
      value: "off" | "add_header" | "overwrite_header";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "replace_insecure_js";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "response_buffering";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "rocket_loader";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "automatic_platform_optimization";
      value: unknown;
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "security_header";
      value: {
        strictTransportSecurity?: {
          enabled?: boolean;
          includeSubdomains?: boolean;
          maxAge?: number;
          nosniff?: boolean;
          preload?: boolean;
        };
      };
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "security_level";
      value:
        | "off"
        | "essentially_off"
        | "low"
        | "medium"
        | "high"
        | "under_attack";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "server_side_exclude";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "sha1_support";
      value: "off" | "on";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "sort_query_string_for_cache";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "ssl";
      value: "off" | "flexible" | "full" | "strict";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | { id?: "ssl_recommender"; enabled?: boolean }
  | {
      id: "tls_1_2_only";
      value: "off" | "on";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "tls_1_3";
      value: "on" | "off" | "zrt";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "tls_client_auth";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "transformations";
      value: "on" | "off" | "open";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "transformations_allowed_origins";
      value: string;
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "true_client_ip_header";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "waf";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "webp";
      value: "off" | "on";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "websockets";
      value: "off" | "on";
      editable?: true | false;
      modifiedOn?: string | null;
    };

export const GetSettingResponse = Schema.Union([
  Schema.Struct({
    id: Schema.Literal("0rtt"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("advanced_ddos"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("aegis"),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    value: Schema.optional(
      Schema.Struct({
        enabled: Schema.optional(Schema.Boolean),
        poolId: Schema.optional(Schema.String),
      }).pipe(Schema.encodeKeys({ poolId: "pool_id" })),
    ),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("always_online"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("always_use_https"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("automatic_https_rewrites"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("brotli"),
    value: Schema.Literals(["off", "on"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("browser_cache_ttl"),
    value: Schema.Number,
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("browser_check"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("cache_level"),
    value: Schema.Literals(["aggressive", "basic", "simplified"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("challenge_ttl"),
    value: Schema.Literals([
      "300",
      "900",
      "1800",
      "2700",
      "3600",
      "7200",
      "10800",
      "14400",
      "28800",
      "57600",
      "86400",
      "604800",
      "2592000",
      "31536000",
    ]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("china_network_enabled"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("ciphers"),
    value: Schema.Array(Schema.String),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("cname_flattening"),
    value: Schema.Literals(["flatten_at_root", "flatten_all"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("development_mode"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    timeRemaining: Schema.optional(Schema.Number),
  }).pipe(
    Schema.encodeKeys({
      modifiedOn: "modified_on",
      timeRemaining: "time_remaining",
    }),
  ),
  Schema.Struct({
    id: Schema.Literal("early_hints"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("edge_cache_ttl"),
    value: Schema.Literals([
      "30",
      "60",
      "300",
      "1200",
      "1800",
      "3600",
      "7200",
      "10800",
      "14400",
      "18000",
      "28800",
      "43200",
      "57600",
      "72000",
      "86400",
      "172800",
      "259200",
      "345600",
      "432000",
      "518400",
      "604800",
    ]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("email_obfuscation"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("h2_prioritization"),
    value: Schema.Literals(["on", "off", "custom"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("hotlink_protection"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("http2"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("http3"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("image_resizing"),
    value: Schema.Literals(["on", "off", "open"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("ip_geolocation"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("ipv6"),
    value: Schema.Literals(["off", "on"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("max_upload"),
    value: Schema.Literals([
      "100",
      "125",
      "150",
      "175",
      "200",
      "225",
      "250",
      "275",
      "300",
      "325",
      "350",
      "375",
      "400",
      "425",
      "450",
      "475",
      "500",
      "1000",
    ]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("min_tls_version"),
    value: Schema.Literals(["1.0", "1.1", "1.2", "1.3"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("mirage"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("nel"),
    value: Schema.Struct({
      enabled: Schema.optional(Schema.Boolean),
    }),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("opportunistic_encryption"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("opportunistic_onion"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("orange_to_orange"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("origin_error_page_pass_thru"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("origin_h2_max_streams"),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    value: Schema.optional(Schema.Number),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("origin_max_http_version"),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    value: Schema.optional(Schema.Literals(["2", "1"])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("polish"),
    value: Schema.Literals(["off", "lossless", "lossy"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("prefetch_preload"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("privacy_pass"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("proxy_read_timeout"),
    value: Schema.Number,
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("pseudo_ipv4"),
    value: Schema.Literals(["off", "add_header", "overwrite_header"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("replace_insecure_js"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("response_buffering"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("rocket_loader"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("automatic_platform_optimization"),
    value: Schema.Unknown,
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("security_header"),
    value: Schema.Struct({
      strictTransportSecurity: Schema.optional(
        Schema.Struct({
          enabled: Schema.optional(Schema.Boolean),
          includeSubdomains: Schema.optional(Schema.Boolean),
          maxAge: Schema.optional(Schema.Number),
          nosniff: Schema.optional(Schema.Boolean),
          preload: Schema.optional(Schema.Boolean),
        }).pipe(
          Schema.encodeKeys({
            includeSubdomains: "include_subdomains",
            maxAge: "max_age",
          }),
        ),
      ),
    }).pipe(
      Schema.encodeKeys({
        strictTransportSecurity: "strict_transport_security",
      }),
    ),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("security_level"),
    value: Schema.Literals([
      "off",
      "essentially_off",
      "low",
      "medium",
      "high",
      "under_attack",
    ]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("server_side_exclude"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("sha1_support"),
    value: Schema.Literals(["off", "on"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("sort_query_string_for_cache"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("ssl"),
    value: Schema.Literals(["off", "flexible", "full", "strict"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.optional(Schema.Literal("ssl_recommender")),
    enabled: Schema.optional(Schema.Boolean),
  }),
  Schema.Struct({
    id: Schema.Literal("tls_1_2_only"),
    value: Schema.Literals(["off", "on"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("tls_1_3"),
    value: Schema.Literals(["on", "off", "zrt"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("tls_client_auth"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("transformations"),
    value: Schema.Literals(["on", "off", "open"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("transformations_allowed_origins"),
    value: Schema.String,
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("true_client_ip_header"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("waf"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("webp"),
    value: Schema.Literals(["off", "on"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("websockets"),
    value: Schema.Literals(["off", "on"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
]) as unknown as Schema.Schema<GetSettingResponse>;

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

export interface PatchSettingRequest {
  settingId: string;
  /** Path param: Identifier */
  zoneId: string;
  /** Body param: ssl-recommender enrollment setting. */
  enabled?: boolean;
}

export const PatchSettingRequest = Schema.Struct({
  settingId: Schema.String.pipe(T.HttpPath("settingId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  enabled: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({ method: "PATCH", path: "/zones/{zone_id}/settings/{settingId}" }),
) as unknown as Schema.Schema<PatchSettingRequest>;

export type PatchSettingResponse =
  | {
      id: "0rtt";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "advanced_ddos";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "aegis";
      modifiedOn?: string | null;
      value?: { enabled?: boolean; poolId?: string };
    }
  | {
      id: "always_online";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "always_use_https";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "automatic_https_rewrites";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "brotli";
      value: "off" | "on";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "browser_cache_ttl";
      value: number;
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "browser_check";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "cache_level";
      value: "aggressive" | "basic" | "simplified";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "challenge_ttl";
      value:
        | "300"
        | "900"
        | "1800"
        | "2700"
        | "3600"
        | "7200"
        | "10800"
        | "14400"
        | "28800"
        | "57600"
        | "86400"
        | "604800"
        | "2592000"
        | "31536000";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "china_network_enabled";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "ciphers";
      value: string[];
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "cname_flattening";
      value: "flatten_at_root" | "flatten_all";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "development_mode";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
      timeRemaining?: number;
    }
  | {
      id: "early_hints";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "edge_cache_ttl";
      value:
        | "30"
        | "60"
        | "300"
        | "1200"
        | "1800"
        | "3600"
        | "7200"
        | "10800"
        | "14400"
        | "18000"
        | "28800"
        | "43200"
        | "57600"
        | "72000"
        | "86400"
        | "172800"
        | "259200"
        | "345600"
        | "432000"
        | "518400"
        | "604800";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "email_obfuscation";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "h2_prioritization";
      value: "on" | "off" | "custom";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "hotlink_protection";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "http2";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "http3";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "image_resizing";
      value: "on" | "off" | "open";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "ip_geolocation";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "ipv6";
      value: "off" | "on";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "max_upload";
      value:
        | "100"
        | "125"
        | "150"
        | "175"
        | "200"
        | "225"
        | "250"
        | "275"
        | "300"
        | "325"
        | "350"
        | "375"
        | "400"
        | "425"
        | "450"
        | "475"
        | "500"
        | "1000";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "min_tls_version";
      value: "1.0" | "1.1" | "1.2" | "1.3";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "mirage";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "nel";
      value: { enabled?: boolean };
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "opportunistic_encryption";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "opportunistic_onion";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "orange_to_orange";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "origin_error_page_pass_thru";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | { id: "origin_h2_max_streams"; modifiedOn?: string | null; value?: number }
  | {
      id: "origin_max_http_version";
      modifiedOn?: string | null;
      value?: "2" | "1";
    }
  | {
      id: "polish";
      value: "off" | "lossless" | "lossy";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "prefetch_preload";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "privacy_pass";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "proxy_read_timeout";
      value: number;
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "pseudo_ipv4";
      value: "off" | "add_header" | "overwrite_header";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "replace_insecure_js";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "response_buffering";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "rocket_loader";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "automatic_platform_optimization";
      value: unknown;
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "security_header";
      value: {
        strictTransportSecurity?: {
          enabled?: boolean;
          includeSubdomains?: boolean;
          maxAge?: number;
          nosniff?: boolean;
          preload?: boolean;
        };
      };
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "security_level";
      value:
        | "off"
        | "essentially_off"
        | "low"
        | "medium"
        | "high"
        | "under_attack";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "server_side_exclude";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "sha1_support";
      value: "off" | "on";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "sort_query_string_for_cache";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "ssl";
      value: "off" | "flexible" | "full" | "strict";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | { id?: "ssl_recommender"; enabled?: boolean }
  | {
      id: "tls_1_2_only";
      value: "off" | "on";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "tls_1_3";
      value: "on" | "off" | "zrt";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "tls_client_auth";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "transformations";
      value: "on" | "off" | "open";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "transformations_allowed_origins";
      value: string;
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "true_client_ip_header";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "waf";
      value: "on" | "off";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "webp";
      value: "off" | "on";
      editable?: true | false;
      modifiedOn?: string | null;
    }
  | {
      id: "websockets";
      value: "off" | "on";
      editable?: true | false;
      modifiedOn?: string | null;
    };

export const PatchSettingResponse = Schema.Union([
  Schema.Struct({
    id: Schema.Literal("0rtt"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("advanced_ddos"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("aegis"),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    value: Schema.optional(
      Schema.Struct({
        enabled: Schema.optional(Schema.Boolean),
        poolId: Schema.optional(Schema.String),
      }).pipe(Schema.encodeKeys({ poolId: "pool_id" })),
    ),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("always_online"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("always_use_https"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("automatic_https_rewrites"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("brotli"),
    value: Schema.Literals(["off", "on"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("browser_cache_ttl"),
    value: Schema.Number,
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("browser_check"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("cache_level"),
    value: Schema.Literals(["aggressive", "basic", "simplified"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("challenge_ttl"),
    value: Schema.Literals([
      "300",
      "900",
      "1800",
      "2700",
      "3600",
      "7200",
      "10800",
      "14400",
      "28800",
      "57600",
      "86400",
      "604800",
      "2592000",
      "31536000",
    ]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("china_network_enabled"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("ciphers"),
    value: Schema.Array(Schema.String),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("cname_flattening"),
    value: Schema.Literals(["flatten_at_root", "flatten_all"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("development_mode"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    timeRemaining: Schema.optional(Schema.Number),
  }).pipe(
    Schema.encodeKeys({
      modifiedOn: "modified_on",
      timeRemaining: "time_remaining",
    }),
  ),
  Schema.Struct({
    id: Schema.Literal("early_hints"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("edge_cache_ttl"),
    value: Schema.Literals([
      "30",
      "60",
      "300",
      "1200",
      "1800",
      "3600",
      "7200",
      "10800",
      "14400",
      "18000",
      "28800",
      "43200",
      "57600",
      "72000",
      "86400",
      "172800",
      "259200",
      "345600",
      "432000",
      "518400",
      "604800",
    ]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("email_obfuscation"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("h2_prioritization"),
    value: Schema.Literals(["on", "off", "custom"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("hotlink_protection"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("http2"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("http3"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("image_resizing"),
    value: Schema.Literals(["on", "off", "open"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("ip_geolocation"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("ipv6"),
    value: Schema.Literals(["off", "on"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("max_upload"),
    value: Schema.Literals([
      "100",
      "125",
      "150",
      "175",
      "200",
      "225",
      "250",
      "275",
      "300",
      "325",
      "350",
      "375",
      "400",
      "425",
      "450",
      "475",
      "500",
      "1000",
    ]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("min_tls_version"),
    value: Schema.Literals(["1.0", "1.1", "1.2", "1.3"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("mirage"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("nel"),
    value: Schema.Struct({
      enabled: Schema.optional(Schema.Boolean),
    }),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("opportunistic_encryption"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("opportunistic_onion"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("orange_to_orange"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("origin_error_page_pass_thru"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("origin_h2_max_streams"),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    value: Schema.optional(Schema.Number),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("origin_max_http_version"),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    value: Schema.optional(Schema.Literals(["2", "1"])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("polish"),
    value: Schema.Literals(["off", "lossless", "lossy"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("prefetch_preload"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("privacy_pass"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("proxy_read_timeout"),
    value: Schema.Number,
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("pseudo_ipv4"),
    value: Schema.Literals(["off", "add_header", "overwrite_header"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("replace_insecure_js"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("response_buffering"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("rocket_loader"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("automatic_platform_optimization"),
    value: Schema.Unknown,
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("security_header"),
    value: Schema.Struct({
      strictTransportSecurity: Schema.optional(
        Schema.Struct({
          enabled: Schema.optional(Schema.Boolean),
          includeSubdomains: Schema.optional(Schema.Boolean),
          maxAge: Schema.optional(Schema.Number),
          nosniff: Schema.optional(Schema.Boolean),
          preload: Schema.optional(Schema.Boolean),
        }).pipe(
          Schema.encodeKeys({
            includeSubdomains: "include_subdomains",
            maxAge: "max_age",
          }),
        ),
      ),
    }).pipe(
      Schema.encodeKeys({
        strictTransportSecurity: "strict_transport_security",
      }),
    ),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("security_level"),
    value: Schema.Literals([
      "off",
      "essentially_off",
      "low",
      "medium",
      "high",
      "under_attack",
    ]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("server_side_exclude"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("sha1_support"),
    value: Schema.Literals(["off", "on"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("sort_query_string_for_cache"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("ssl"),
    value: Schema.Literals(["off", "flexible", "full", "strict"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.optional(Schema.Literal("ssl_recommender")),
    enabled: Schema.optional(Schema.Boolean),
  }),
  Schema.Struct({
    id: Schema.Literal("tls_1_2_only"),
    value: Schema.Literals(["off", "on"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("tls_1_3"),
    value: Schema.Literals(["on", "off", "zrt"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("tls_client_auth"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("transformations"),
    value: Schema.Literals(["on", "off", "open"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("transformations_allowed_origins"),
    value: Schema.String,
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("true_client_ip_header"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("waf"),
    value: Schema.Literals(["on", "off"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("webp"),
    value: Schema.Literals(["off", "on"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
  Schema.Struct({
    id: Schema.Literal("websockets"),
    value: Schema.Literals(["off", "on"]),
    editable: Schema.optional(Schema.Literals([true, false])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(Schema.encodeKeys({ modifiedOn: "modified_on" })),
]) as unknown as Schema.Schema<PatchSettingResponse>;

export const patchSetting: (
  input: PatchSettingRequest,
) => Effect.Effect<
  PatchSettingResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchSettingRequest,
  output: PatchSettingResponse,
  errors: [],
}));

// =============================================================================
// Subscription
// =============================================================================

export interface GetSubscriptionRequest {
  /** Identifier */
  zoneId: string;
}

export const GetSubscriptionRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/subscription" }),
) as unknown as Schema.Schema<GetSubscriptionRequest>;

export interface GetSubscriptionResponse {
  /** Subscription identifier tag. */
  id?: string;
  /** The monetary unit in which pricing information is displayed. */
  currency?: string;
  /** The end of the current period and also when the next billing is due. */
  currentPeriodEnd?: string;
  /** When the current billing period started. May match initial_period_start if this is the first period. */
  currentPeriodStart?: string;
  /** How often the subscription is renewed automatically. */
  frequency?: "weekly" | "monthly" | "quarterly" | "yearly" | "not-applicable";
  /** The price of the subscription that will be billed, in US dollars. */
  price?: number;
  /** The rate plan applied to the subscription. */
  ratePlan?: unknown;
  /** The state that the subscription is in. */
  state?:
    | "Trial"
    | "Provisioned"
    | "Paid"
    | "AwaitingPayment"
    | "Cancelled"
    | "Failed"
    | "Expired";
}

export const GetSubscriptionResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  currency: Schema.optional(Schema.String),
  currentPeriodEnd: Schema.optional(Schema.String),
  currentPeriodStart: Schema.optional(Schema.String),
  frequency: Schema.optional(
    Schema.Literals([
      "weekly",
      "monthly",
      "quarterly",
      "yearly",
      "not-applicable",
    ]),
  ),
  price: Schema.optional(Schema.Number),
  ratePlan: Schema.optional(Schema.Unknown),
  state: Schema.optional(
    Schema.Literals([
      "Trial",
      "Provisioned",
      "Paid",
      "AwaitingPayment",
      "Cancelled",
      "Failed",
      "Expired",
    ]),
  ),
}).pipe(
  Schema.encodeKeys({
    currentPeriodEnd: "current_period_end",
    currentPeriodStart: "current_period_start",
    ratePlan: "rate_plan",
  }),
) as unknown as Schema.Schema<GetSubscriptionResponse>;

export const getSubscription: (
  input: GetSubscriptionRequest,
) => Effect.Effect<
  GetSubscriptionResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSubscriptionRequest,
  output: GetSubscriptionResponse,
  errors: [],
}));

export interface CreateSubscriptionRequest {
  /** Path param: Identifier */
  zoneId: string;
  /** Body param: How often the subscription is renewed automatically. */
  frequency?: "weekly" | "monthly" | "quarterly" | "yearly";
  /** Body param: The rate plan applied to the subscription. */
  ratePlan?: unknown;
}

export const CreateSubscriptionRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  frequency: Schema.optional(
    Schema.Literals(["weekly", "monthly", "quarterly", "yearly"]),
  ),
  ratePlan: Schema.optional(Schema.Unknown),
}).pipe(
  Schema.encodeKeys({ ratePlan: "rate_plan" }),
  T.Http({ method: "POST", path: "/zones/{zone_id}/subscription" }),
) as unknown as Schema.Schema<CreateSubscriptionRequest>;

export interface CreateSubscriptionResponse {
  /** Subscription identifier tag. */
  id?: string;
  /** The monetary unit in which pricing information is displayed. */
  currency?: string;
  /** The end of the current period and also when the next billing is due. */
  currentPeriodEnd?: string;
  /** When the current billing period started. May match initial_period_start if this is the first period. */
  currentPeriodStart?: string;
  /** How often the subscription is renewed automatically. */
  frequency?: "weekly" | "monthly" | "quarterly" | "yearly" | "not-applicable";
  /** The price of the subscription that will be billed, in US dollars. */
  price?: number;
  /** The rate plan applied to the subscription. */
  ratePlan?: unknown;
  /** The state that the subscription is in. */
  state?:
    | "Trial"
    | "Provisioned"
    | "Paid"
    | "AwaitingPayment"
    | "Cancelled"
    | "Failed"
    | "Expired";
}

export const CreateSubscriptionResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  currency: Schema.optional(Schema.String),
  currentPeriodEnd: Schema.optional(Schema.String),
  currentPeriodStart: Schema.optional(Schema.String),
  frequency: Schema.optional(
    Schema.Literals([
      "weekly",
      "monthly",
      "quarterly",
      "yearly",
      "not-applicable",
    ]),
  ),
  price: Schema.optional(Schema.Number),
  ratePlan: Schema.optional(Schema.Unknown),
  state: Schema.optional(
    Schema.Literals([
      "Trial",
      "Provisioned",
      "Paid",
      "AwaitingPayment",
      "Cancelled",
      "Failed",
      "Expired",
    ]),
  ),
}).pipe(
  Schema.encodeKeys({
    currentPeriodEnd: "current_period_end",
    currentPeriodStart: "current_period_start",
    ratePlan: "rate_plan",
  }),
) as unknown as Schema.Schema<CreateSubscriptionResponse>;

export const createSubscription: (
  input: CreateSubscriptionRequest,
) => Effect.Effect<
  CreateSubscriptionResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateSubscriptionRequest,
  output: CreateSubscriptionResponse,
  errors: [],
}));

export interface UpdateSubscriptionRequest {
  /** Path param: Identifier */
  zoneId: string;
  /** Body param: How often the subscription is renewed automatically. */
  frequency?: "weekly" | "monthly" | "quarterly" | "yearly";
  /** Body param: The rate plan applied to the subscription. */
  ratePlan?: unknown;
}

export const UpdateSubscriptionRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  frequency: Schema.optional(
    Schema.Literals(["weekly", "monthly", "quarterly", "yearly"]),
  ),
  ratePlan: Schema.optional(Schema.Unknown),
}).pipe(
  Schema.encodeKeys({ ratePlan: "rate_plan" }),
  T.Http({ method: "PUT", path: "/zones/{zone_id}/subscription" }),
) as unknown as Schema.Schema<UpdateSubscriptionRequest>;

export interface UpdateSubscriptionResponse {
  /** Subscription identifier tag. */
  id?: string;
  /** The monetary unit in which pricing information is displayed. */
  currency?: string;
  /** The end of the current period and also when the next billing is due. */
  currentPeriodEnd?: string;
  /** When the current billing period started. May match initial_period_start if this is the first period. */
  currentPeriodStart?: string;
  /** How often the subscription is renewed automatically. */
  frequency?: "weekly" | "monthly" | "quarterly" | "yearly" | "not-applicable";
  /** The price of the subscription that will be billed, in US dollars. */
  price?: number;
  /** The rate plan applied to the subscription. */
  ratePlan?: unknown;
  /** The state that the subscription is in. */
  state?:
    | "Trial"
    | "Provisioned"
    | "Paid"
    | "AwaitingPayment"
    | "Cancelled"
    | "Failed"
    | "Expired";
}

export const UpdateSubscriptionResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  currency: Schema.optional(Schema.String),
  currentPeriodEnd: Schema.optional(Schema.String),
  currentPeriodStart: Schema.optional(Schema.String),
  frequency: Schema.optional(
    Schema.Literals([
      "weekly",
      "monthly",
      "quarterly",
      "yearly",
      "not-applicable",
    ]),
  ),
  price: Schema.optional(Schema.Number),
  ratePlan: Schema.optional(Schema.Unknown),
  state: Schema.optional(
    Schema.Literals([
      "Trial",
      "Provisioned",
      "Paid",
      "AwaitingPayment",
      "Cancelled",
      "Failed",
      "Expired",
    ]),
  ),
}).pipe(
  Schema.encodeKeys({
    currentPeriodEnd: "current_period_end",
    currentPeriodStart: "current_period_start",
    ratePlan: "rate_plan",
  }),
) as unknown as Schema.Schema<UpdateSubscriptionResponse>;

export const updateSubscription: (
  input: UpdateSubscriptionRequest,
) => Effect.Effect<
  UpdateSubscriptionResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateSubscriptionRequest,
  output: UpdateSubscriptionResponse,
  errors: [],
}));

// =============================================================================
// Zone
// =============================================================================

export interface GetZoneRequest {
  /** Identifier */
  zoneId: string;
}

export const GetZoneRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}" }),
) as unknown as Schema.Schema<GetZoneRequest>;

export interface GetZoneResponse {
  /** Identifier */
  id: string;
  /** The account the zone belongs to. */
  account: { id?: string; name?: string };
  /** The last time proof of ownership was detected and the zone was made active. */
  activatedOn: string | null;
  /** When the zone was created. */
  createdOn: string;
  /** The interval (in seconds) from when development mode expires (positive integer) or last expired (negative integer) for the domain. If development mode has never been enabled, this value is 0. */
  developmentMode: number;
  /** Metadata about the zone. */
  meta: {
    cdnOnly?: boolean;
    customCertificateQuota?: number;
    dnsOnly?: boolean;
    foundationDns?: boolean;
    pageRuleQuota?: number;
    phishingDetected?: boolean;
    step?: number;
  };
  /** When the zone was last modified. */
  modifiedOn: string;
  /** The domain name. */
  name: string;
  /** The name servers Cloudflare assigns to a zone. */
  nameServers: string[];
  /** DNS host at the time of switching to Cloudflare. */
  originalDnshost: string | null;
  /** Original name servers before moving to Cloudflare. */
  originalNameServers: string[] | null;
  /** Registrar for the domain at the time of switching to Cloudflare. */
  originalRegistrar: string | null;
  /** The owner of the zone. */
  owner: { id?: string; name?: string; type?: string };
  /** @deprecated Please use the `/zones/{zone_id}/subscription` API to update a zone's plan. Changing this value will create/cancel associated subscriptions. To view available plans for this zone, see [Zon */
  plan: {
    id?: string;
    canSubscribe?: boolean;
    currency?: string;
    externallyManaged?: boolean;
    frequency?: string;
    isSubscribed?: boolean;
    legacyDiscount?: boolean;
    legacyId?: string;
    name?: string;
    price?: number;
  };
  /** Allows the customer to use a custom apex. _Tenants Only Configuration_. */
  cnameSuffix?: string;
  /** Indicates whether the zone is only using Cloudflare DNS services. A true value means the zone will not receive security or performance benefits. */
  paused?: boolean;
  /** @deprecated This has been replaced by Account memberships. */
  permissions?: string[];
  /** The zone status on Cloudflare. */
  status?: "initializing" | "pending" | "active" | "moved";
  /** The root organizational unit that this zone belongs to (such as a tenant or organization). */
  tenant?: { id?: string; name?: string };
  /** The immediate parent organizational unit that this zone belongs to (such as under a tenant or sub-organization). */
  tenantUnit?: { id?: string };
  /** A full zone implies that DNS is hosted with Cloudflare. A partial zone is typically a partner-hosted zone or a CNAME setup. */
  type?: "full" | "partial" | "secondary" | "internal";
  /** An array of domains used for custom name servers. This is only available for Business and Enterprise plans. */
  vanityNameServers?: string[];
  /** Verification key for partial zone setup. */
  verificationKey?: string;
}

export const GetZoneResponse = Schema.Struct({
  id: Schema.String,
  account: Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
  }),
  activatedOn: Schema.Union([Schema.String, Schema.Null]),
  createdOn: Schema.String,
  developmentMode: Schema.Number,
  meta: Schema.Struct({
    cdnOnly: Schema.optional(Schema.Boolean),
    customCertificateQuota: Schema.optional(Schema.Number),
    dnsOnly: Schema.optional(Schema.Boolean),
    foundationDns: Schema.optional(Schema.Boolean),
    pageRuleQuota: Schema.optional(Schema.Number),
    phishingDetected: Schema.optional(Schema.Boolean),
    step: Schema.optional(Schema.Number),
  }).pipe(
    Schema.encodeKeys({
      cdnOnly: "cdn_only",
      customCertificateQuota: "custom_certificate_quota",
      dnsOnly: "dns_only",
      foundationDns: "foundation_dns",
      pageRuleQuota: "page_rule_quota",
      phishingDetected: "phishing_detected",
    }),
  ),
  modifiedOn: Schema.String,
  name: Schema.String,
  nameServers: Schema.Array(Schema.String),
  originalDnshost: Schema.Union([Schema.String, Schema.Null]),
  originalNameServers: Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  originalRegistrar: Schema.Union([Schema.String, Schema.Null]),
  owner: Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  }),
  plan: Schema.Struct({
    id: Schema.optional(Schema.String),
    canSubscribe: Schema.optional(Schema.Boolean),
    currency: Schema.optional(Schema.String),
    externallyManaged: Schema.optional(Schema.Boolean),
    frequency: Schema.optional(Schema.String),
    isSubscribed: Schema.optional(Schema.Boolean),
    legacyDiscount: Schema.optional(Schema.Boolean),
    legacyId: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    price: Schema.optional(Schema.Number),
  }).pipe(
    Schema.encodeKeys({
      canSubscribe: "can_subscribe",
      externallyManaged: "externally_managed",
      isSubscribed: "is_subscribed",
      legacyDiscount: "legacy_discount",
      legacyId: "legacy_id",
    }),
  ),
  cnameSuffix: Schema.optional(Schema.String),
  paused: Schema.optional(Schema.Boolean),
  permissions: Schema.optional(Schema.Array(Schema.String)),
  status: Schema.optional(
    Schema.Literals(["initializing", "pending", "active", "moved"]),
  ),
  tenant: Schema.optional(
    Schema.Struct({
      id: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ),
  tenantUnit: Schema.optional(
    Schema.Struct({
      id: Schema.optional(Schema.String),
    }),
  ),
  type: Schema.optional(
    Schema.Literals(["full", "partial", "secondary", "internal"]),
  ),
  vanityNameServers: Schema.optional(Schema.Array(Schema.String)),
  verificationKey: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    activatedOn: "activated_on",
    createdOn: "created_on",
    developmentMode: "development_mode",
    modifiedOn: "modified_on",
    nameServers: "name_servers",
    originalDnshost: "original_dnshost",
    originalNameServers: "original_name_servers",
    originalRegistrar: "original_registrar",
    cnameSuffix: "cname_suffix",
    tenantUnit: "tenant_unit",
    vanityNameServers: "vanity_name_servers",
    verificationKey: "verification_key",
  }),
) as unknown as Schema.Schema<GetZoneResponse>;

export const getZone: (
  input: GetZoneRequest,
) => Effect.Effect<
  GetZoneResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetZoneRequest,
  output: GetZoneResponse,
  errors: [],
}));

export interface ListZonesRequest {}

export const ListZonesRequest = Schema.Struct({}).pipe(
  T.Http({ method: "GET", path: "/zones" }),
) as unknown as Schema.Schema<ListZonesRequest>;

export type ListZonesResponse = {
  id: string;
  account: { id?: string; name?: string };
  activatedOn: string | null;
  createdOn: string;
  developmentMode: number;
  meta: {
    cdnOnly?: boolean;
    customCertificateQuota?: number;
    dnsOnly?: boolean;
    foundationDns?: boolean;
    pageRuleQuota?: number;
    phishingDetected?: boolean;
    step?: number;
  };
  modifiedOn: string;
  name: string;
  nameServers: string[];
  originalDnshost: string | null;
  originalNameServers: string[] | null;
  originalRegistrar: string | null;
  owner: { id?: string; name?: string; type?: string };
  plan: {
    id?: string;
    canSubscribe?: boolean;
    currency?: string;
    externallyManaged?: boolean;
    frequency?: string;
    isSubscribed?: boolean;
    legacyDiscount?: boolean;
    legacyId?: string;
    name?: string;
    price?: number;
  };
  cnameSuffix?: string;
  paused?: boolean;
  permissions?: string[];
  status?: "initializing" | "pending" | "active" | "moved";
  tenant?: { id?: string; name?: string };
  tenantUnit?: { id?: string };
  type?: "full" | "partial" | "secondary" | "internal";
  vanityNameServers?: string[];
  verificationKey?: string;
}[];

export const ListZonesResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    account: Schema.Struct({
      id: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
    activatedOn: Schema.Union([Schema.String, Schema.Null]),
    createdOn: Schema.String,
    developmentMode: Schema.Number,
    meta: Schema.Struct({
      cdnOnly: Schema.optional(Schema.Boolean),
      customCertificateQuota: Schema.optional(Schema.Number),
      dnsOnly: Schema.optional(Schema.Boolean),
      foundationDns: Schema.optional(Schema.Boolean),
      pageRuleQuota: Schema.optional(Schema.Number),
      phishingDetected: Schema.optional(Schema.Boolean),
      step: Schema.optional(Schema.Number),
    }).pipe(
      Schema.encodeKeys({
        cdnOnly: "cdn_only",
        customCertificateQuota: "custom_certificate_quota",
        dnsOnly: "dns_only",
        foundationDns: "foundation_dns",
        pageRuleQuota: "page_rule_quota",
        phishingDetected: "phishing_detected",
      }),
    ),
    modifiedOn: Schema.String,
    name: Schema.String,
    nameServers: Schema.Array(Schema.String),
    originalDnshost: Schema.Union([Schema.String, Schema.Null]),
    originalNameServers: Schema.Union([
      Schema.Array(Schema.String),
      Schema.Null,
    ]),
    originalRegistrar: Schema.Union([Schema.String, Schema.Null]),
    owner: Schema.Struct({
      id: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
    }),
    plan: Schema.Struct({
      id: Schema.optional(Schema.String),
      canSubscribe: Schema.optional(Schema.Boolean),
      currency: Schema.optional(Schema.String),
      externallyManaged: Schema.optional(Schema.Boolean),
      frequency: Schema.optional(Schema.String),
      isSubscribed: Schema.optional(Schema.Boolean),
      legacyDiscount: Schema.optional(Schema.Boolean),
      legacyId: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      price: Schema.optional(Schema.Number),
    }).pipe(
      Schema.encodeKeys({
        canSubscribe: "can_subscribe",
        externallyManaged: "externally_managed",
        isSubscribed: "is_subscribed",
        legacyDiscount: "legacy_discount",
        legacyId: "legacy_id",
      }),
    ),
    cnameSuffix: Schema.optional(Schema.String),
    paused: Schema.optional(Schema.Boolean),
    permissions: Schema.optional(Schema.Array(Schema.String)),
    status: Schema.optional(
      Schema.Literals(["initializing", "pending", "active", "moved"]),
    ),
    tenant: Schema.optional(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
      }),
    ),
    tenantUnit: Schema.optional(
      Schema.Struct({
        id: Schema.optional(Schema.String),
      }),
    ),
    type: Schema.optional(
      Schema.Literals(["full", "partial", "secondary", "internal"]),
    ),
    vanityNameServers: Schema.optional(Schema.Array(Schema.String)),
    verificationKey: Schema.optional(Schema.String),
  }).pipe(
    Schema.encodeKeys({
      activatedOn: "activated_on",
      createdOn: "created_on",
      developmentMode: "development_mode",
      modifiedOn: "modified_on",
      nameServers: "name_servers",
      originalDnshost: "original_dnshost",
      originalNameServers: "original_name_servers",
      originalRegistrar: "original_registrar",
      cnameSuffix: "cname_suffix",
      tenantUnit: "tenant_unit",
      vanityNameServers: "vanity_name_servers",
      verificationKey: "verification_key",
    }),
  ),
) as unknown as Schema.Schema<ListZonesResponse>;

export const listZones: (
  input: ListZonesRequest,
) => Effect.Effect<
  ListZonesResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListZonesRequest,
  output: ListZonesResponse,
  errors: [],
}));

export interface CreateZoneRequest {
  account: { id?: string };
  /** The domain name. */
  name: string;
  /** A full zone implies that DNS is hosted with Cloudflare. A partial zone is typically a partner-hosted zone or a CNAME setup. */
  type?: "full" | "partial" | "secondary" | "internal";
}

export const CreateZoneRequest = Schema.Struct({
  account: Schema.Struct({
    id: Schema.optional(Schema.String),
  }),
  name: Schema.String,
  type: Schema.optional(
    Schema.Literals(["full", "partial", "secondary", "internal"]),
  ),
}).pipe(
  T.Http({ method: "POST", path: "/zones" }),
) as unknown as Schema.Schema<CreateZoneRequest>;

export interface CreateZoneResponse {
  /** Identifier */
  id: string;
  /** The account the zone belongs to. */
  account: { id?: string; name?: string };
  /** The last time proof of ownership was detected and the zone was made active. */
  activatedOn: string | null;
  /** When the zone was created. */
  createdOn: string;
  /** The interval (in seconds) from when development mode expires (positive integer) or last expired (negative integer) for the domain. If development mode has never been enabled, this value is 0. */
  developmentMode: number;
  /** Metadata about the zone. */
  meta: {
    cdnOnly?: boolean;
    customCertificateQuota?: number;
    dnsOnly?: boolean;
    foundationDns?: boolean;
    pageRuleQuota?: number;
    phishingDetected?: boolean;
    step?: number;
  };
  /** When the zone was last modified. */
  modifiedOn: string;
  /** The domain name. */
  name: string;
  /** The name servers Cloudflare assigns to a zone. */
  nameServers: string[];
  /** DNS host at the time of switching to Cloudflare. */
  originalDnshost: string | null;
  /** Original name servers before moving to Cloudflare. */
  originalNameServers: string[] | null;
  /** Registrar for the domain at the time of switching to Cloudflare. */
  originalRegistrar: string | null;
  /** The owner of the zone. */
  owner: { id?: string; name?: string; type?: string };
  /** @deprecated Please use the `/zones/{zone_id}/subscription` API to update a zone's plan. Changing this value will create/cancel associated subscriptions. To view available plans for this zone, see [Zon */
  plan: {
    id?: string;
    canSubscribe?: boolean;
    currency?: string;
    externallyManaged?: boolean;
    frequency?: string;
    isSubscribed?: boolean;
    legacyDiscount?: boolean;
    legacyId?: string;
    name?: string;
    price?: number;
  };
  /** Allows the customer to use a custom apex. _Tenants Only Configuration_. */
  cnameSuffix?: string;
  /** Indicates whether the zone is only using Cloudflare DNS services. A true value means the zone will not receive security or performance benefits. */
  paused?: boolean;
  /** @deprecated This has been replaced by Account memberships. */
  permissions?: string[];
  /** The zone status on Cloudflare. */
  status?: "initializing" | "pending" | "active" | "moved";
  /** The root organizational unit that this zone belongs to (such as a tenant or organization). */
  tenant?: { id?: string; name?: string };
  /** The immediate parent organizational unit that this zone belongs to (such as under a tenant or sub-organization). */
  tenantUnit?: { id?: string };
  /** A full zone implies that DNS is hosted with Cloudflare. A partial zone is typically a partner-hosted zone or a CNAME setup. */
  type?: "full" | "partial" | "secondary" | "internal";
  /** An array of domains used for custom name servers. This is only available for Business and Enterprise plans. */
  vanityNameServers?: string[];
  /** Verification key for partial zone setup. */
  verificationKey?: string;
}

export const CreateZoneResponse = Schema.Struct({
  id: Schema.String,
  account: Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
  }),
  activatedOn: Schema.Union([Schema.String, Schema.Null]),
  createdOn: Schema.String,
  developmentMode: Schema.Number,
  meta: Schema.Struct({
    cdnOnly: Schema.optional(Schema.Boolean),
    customCertificateQuota: Schema.optional(Schema.Number),
    dnsOnly: Schema.optional(Schema.Boolean),
    foundationDns: Schema.optional(Schema.Boolean),
    pageRuleQuota: Schema.optional(Schema.Number),
    phishingDetected: Schema.optional(Schema.Boolean),
    step: Schema.optional(Schema.Number),
  }).pipe(
    Schema.encodeKeys({
      cdnOnly: "cdn_only",
      customCertificateQuota: "custom_certificate_quota",
      dnsOnly: "dns_only",
      foundationDns: "foundation_dns",
      pageRuleQuota: "page_rule_quota",
      phishingDetected: "phishing_detected",
    }),
  ),
  modifiedOn: Schema.String,
  name: Schema.String,
  nameServers: Schema.Array(Schema.String),
  originalDnshost: Schema.Union([Schema.String, Schema.Null]),
  originalNameServers: Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  originalRegistrar: Schema.Union([Schema.String, Schema.Null]),
  owner: Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  }),
  plan: Schema.Struct({
    id: Schema.optional(Schema.String),
    canSubscribe: Schema.optional(Schema.Boolean),
    currency: Schema.optional(Schema.String),
    externallyManaged: Schema.optional(Schema.Boolean),
    frequency: Schema.optional(Schema.String),
    isSubscribed: Schema.optional(Schema.Boolean),
    legacyDiscount: Schema.optional(Schema.Boolean),
    legacyId: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    price: Schema.optional(Schema.Number),
  }).pipe(
    Schema.encodeKeys({
      canSubscribe: "can_subscribe",
      externallyManaged: "externally_managed",
      isSubscribed: "is_subscribed",
      legacyDiscount: "legacy_discount",
      legacyId: "legacy_id",
    }),
  ),
  cnameSuffix: Schema.optional(Schema.String),
  paused: Schema.optional(Schema.Boolean),
  permissions: Schema.optional(Schema.Array(Schema.String)),
  status: Schema.optional(
    Schema.Literals(["initializing", "pending", "active", "moved"]),
  ),
  tenant: Schema.optional(
    Schema.Struct({
      id: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ),
  tenantUnit: Schema.optional(
    Schema.Struct({
      id: Schema.optional(Schema.String),
    }),
  ),
  type: Schema.optional(
    Schema.Literals(["full", "partial", "secondary", "internal"]),
  ),
  vanityNameServers: Schema.optional(Schema.Array(Schema.String)),
  verificationKey: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    activatedOn: "activated_on",
    createdOn: "created_on",
    developmentMode: "development_mode",
    modifiedOn: "modified_on",
    nameServers: "name_servers",
    originalDnshost: "original_dnshost",
    originalNameServers: "original_name_servers",
    originalRegistrar: "original_registrar",
    cnameSuffix: "cname_suffix",
    tenantUnit: "tenant_unit",
    vanityNameServers: "vanity_name_servers",
    verificationKey: "verification_key",
  }),
) as unknown as Schema.Schema<CreateZoneResponse>;

export const createZone: (
  input: CreateZoneRequest,
) => Effect.Effect<
  CreateZoneResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateZoneRequest,
  output: CreateZoneResponse,
  errors: [],
}));

export interface PatchZoneRequest {
  /** Path param: Identifier */
  zoneId: string;
  /** Body param: Indicates whether the zone is only using Cloudflare DNS services. A true value means the zone will not receive security or performance benefits. */
  paused?: boolean;
  /** Body param: A full zone implies that DNS is hosted with Cloudflare. A partial zone is typically a partner-hosted zone or a CNAME setup. This parameter is only available to Enterprise customers or if i */
  type?: "full" | "partial" | "secondary" | "internal";
  /** Body param: An array of domains used for custom name servers. This is only available for Business and Enterprise plans. */
  vanityNameServers?: string[];
}

export const PatchZoneRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  paused: Schema.optional(Schema.Boolean),
  type: Schema.optional(
    Schema.Literals(["full", "partial", "secondary", "internal"]),
  ),
  vanityNameServers: Schema.optional(Schema.Array(Schema.String)),
}).pipe(
  Schema.encodeKeys({ vanityNameServers: "vanity_name_servers" }),
  T.Http({ method: "PATCH", path: "/zones/{zone_id}" }),
) as unknown as Schema.Schema<PatchZoneRequest>;

export interface PatchZoneResponse {
  /** Identifier */
  id: string;
  /** The account the zone belongs to. */
  account: { id?: string; name?: string };
  /** The last time proof of ownership was detected and the zone was made active. */
  activatedOn: string | null;
  /** When the zone was created. */
  createdOn: string;
  /** The interval (in seconds) from when development mode expires (positive integer) or last expired (negative integer) for the domain. If development mode has never been enabled, this value is 0. */
  developmentMode: number;
  /** Metadata about the zone. */
  meta: {
    cdnOnly?: boolean;
    customCertificateQuota?: number;
    dnsOnly?: boolean;
    foundationDns?: boolean;
    pageRuleQuota?: number;
    phishingDetected?: boolean;
    step?: number;
  };
  /** When the zone was last modified. */
  modifiedOn: string;
  /** The domain name. */
  name: string;
  /** The name servers Cloudflare assigns to a zone. */
  nameServers: string[];
  /** DNS host at the time of switching to Cloudflare. */
  originalDnshost: string | null;
  /** Original name servers before moving to Cloudflare. */
  originalNameServers: string[] | null;
  /** Registrar for the domain at the time of switching to Cloudflare. */
  originalRegistrar: string | null;
  /** The owner of the zone. */
  owner: { id?: string; name?: string; type?: string };
  /** @deprecated Please use the `/zones/{zone_id}/subscription` API to update a zone's plan. Changing this value will create/cancel associated subscriptions. To view available plans for this zone, see [Zon */
  plan: {
    id?: string;
    canSubscribe?: boolean;
    currency?: string;
    externallyManaged?: boolean;
    frequency?: string;
    isSubscribed?: boolean;
    legacyDiscount?: boolean;
    legacyId?: string;
    name?: string;
    price?: number;
  };
  /** Allows the customer to use a custom apex. _Tenants Only Configuration_. */
  cnameSuffix?: string;
  /** Indicates whether the zone is only using Cloudflare DNS services. A true value means the zone will not receive security or performance benefits. */
  paused?: boolean;
  /** @deprecated This has been replaced by Account memberships. */
  permissions?: string[];
  /** The zone status on Cloudflare. */
  status?: "initializing" | "pending" | "active" | "moved";
  /** The root organizational unit that this zone belongs to (such as a tenant or organization). */
  tenant?: { id?: string; name?: string };
  /** The immediate parent organizational unit that this zone belongs to (such as under a tenant or sub-organization). */
  tenantUnit?: { id?: string };
  /** A full zone implies that DNS is hosted with Cloudflare. A partial zone is typically a partner-hosted zone or a CNAME setup. */
  type?: "full" | "partial" | "secondary" | "internal";
  /** An array of domains used for custom name servers. This is only available for Business and Enterprise plans. */
  vanityNameServers?: string[];
  /** Verification key for partial zone setup. */
  verificationKey?: string;
}

export const PatchZoneResponse = Schema.Struct({
  id: Schema.String,
  account: Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
  }),
  activatedOn: Schema.Union([Schema.String, Schema.Null]),
  createdOn: Schema.String,
  developmentMode: Schema.Number,
  meta: Schema.Struct({
    cdnOnly: Schema.optional(Schema.Boolean),
    customCertificateQuota: Schema.optional(Schema.Number),
    dnsOnly: Schema.optional(Schema.Boolean),
    foundationDns: Schema.optional(Schema.Boolean),
    pageRuleQuota: Schema.optional(Schema.Number),
    phishingDetected: Schema.optional(Schema.Boolean),
    step: Schema.optional(Schema.Number),
  }).pipe(
    Schema.encodeKeys({
      cdnOnly: "cdn_only",
      customCertificateQuota: "custom_certificate_quota",
      dnsOnly: "dns_only",
      foundationDns: "foundation_dns",
      pageRuleQuota: "page_rule_quota",
      phishingDetected: "phishing_detected",
    }),
  ),
  modifiedOn: Schema.String,
  name: Schema.String,
  nameServers: Schema.Array(Schema.String),
  originalDnshost: Schema.Union([Schema.String, Schema.Null]),
  originalNameServers: Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  originalRegistrar: Schema.Union([Schema.String, Schema.Null]),
  owner: Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  }),
  plan: Schema.Struct({
    id: Schema.optional(Schema.String),
    canSubscribe: Schema.optional(Schema.Boolean),
    currency: Schema.optional(Schema.String),
    externallyManaged: Schema.optional(Schema.Boolean),
    frequency: Schema.optional(Schema.String),
    isSubscribed: Schema.optional(Schema.Boolean),
    legacyDiscount: Schema.optional(Schema.Boolean),
    legacyId: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    price: Schema.optional(Schema.Number),
  }).pipe(
    Schema.encodeKeys({
      canSubscribe: "can_subscribe",
      externallyManaged: "externally_managed",
      isSubscribed: "is_subscribed",
      legacyDiscount: "legacy_discount",
      legacyId: "legacy_id",
    }),
  ),
  cnameSuffix: Schema.optional(Schema.String),
  paused: Schema.optional(Schema.Boolean),
  permissions: Schema.optional(Schema.Array(Schema.String)),
  status: Schema.optional(
    Schema.Literals(["initializing", "pending", "active", "moved"]),
  ),
  tenant: Schema.optional(
    Schema.Struct({
      id: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ),
  tenantUnit: Schema.optional(
    Schema.Struct({
      id: Schema.optional(Schema.String),
    }),
  ),
  type: Schema.optional(
    Schema.Literals(["full", "partial", "secondary", "internal"]),
  ),
  vanityNameServers: Schema.optional(Schema.Array(Schema.String)),
  verificationKey: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    activatedOn: "activated_on",
    createdOn: "created_on",
    developmentMode: "development_mode",
    modifiedOn: "modified_on",
    nameServers: "name_servers",
    originalDnshost: "original_dnshost",
    originalNameServers: "original_name_servers",
    originalRegistrar: "original_registrar",
    cnameSuffix: "cname_suffix",
    tenantUnit: "tenant_unit",
    vanityNameServers: "vanity_name_servers",
    verificationKey: "verification_key",
  }),
) as unknown as Schema.Schema<PatchZoneResponse>;

export const patchZone: (
  input: PatchZoneRequest,
) => Effect.Effect<
  PatchZoneResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchZoneRequest,
  output: PatchZoneResponse,
  errors: [],
}));

export interface DeleteZoneRequest {
  /** Identifier */
  zoneId: string;
}

export const DeleteZoneRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "DELETE", path: "/zones/{zone_id}" }),
) as unknown as Schema.Schema<DeleteZoneRequest>;

export interface DeleteZoneResponse {
  /** Identifier */
  id: string;
}

export const DeleteZoneResponse = Schema.Struct({
  id: Schema.String,
}) as unknown as Schema.Schema<DeleteZoneResponse>;

export const deleteZone: (
  input: DeleteZoneRequest,
) => Effect.Effect<
  DeleteZoneResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteZoneRequest,
  output: DeleteZoneResponse,
  errors: [],
}));
