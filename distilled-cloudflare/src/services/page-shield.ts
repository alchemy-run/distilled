/**
 * Cloudflare PAGE-SHIELD API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service page-shield
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
// Connection
// =============================================================================

export interface GetConnectionRequest {
  connectionId: string;
  /** Identifier */
  zoneId: string;
}

export const GetConnectionRequest = Schema.Struct({
  connectionId: Schema.String.pipe(T.HttpPath("connectionId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/page_shield/connections/{connectionId}",
  }),
) as unknown as Schema.Schema<GetConnectionRequest>;

export interface GetConnectionResponse {
  /** Identifier */
  id: string;
  addedAt: string;
  firstSeenAt: string;
  host: string;
  lastSeenAt: string;
  url: string;
  urlContainsCdnCgiPath: boolean;
  domainReportedMalicious?: boolean;
  firstPageUrl?: string;
  maliciousDomainCategories?: string[];
  maliciousUrlCategories?: string[];
  pageUrls?: string[];
  urlReportedMalicious?: boolean;
}

export const GetConnectionResponse = Schema.Struct({
  id: Schema.String,
  addedAt: Schema.String.pipe(T.JsonName("added_at")),
  firstSeenAt: Schema.String.pipe(T.JsonName("first_seen_at")),
  host: Schema.String,
  lastSeenAt: Schema.String.pipe(T.JsonName("last_seen_at")),
  url: Schema.String,
  urlContainsCdnCgiPath: Schema.Boolean.pipe(
    T.JsonName("url_contains_cdn_cgi_path"),
  ),
  domainReportedMalicious: Schema.optional(Schema.Boolean).pipe(
    T.JsonName("domain_reported_malicious"),
  ),
  firstPageUrl: Schema.optional(Schema.String).pipe(
    T.JsonName("first_page_url"),
  ),
  maliciousDomainCategories: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.JsonName("malicious_domain_categories"),
  ),
  maliciousUrlCategories: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.JsonName("malicious_url_categories"),
  ),
  pageUrls: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.JsonName("page_urls"),
  ),
  urlReportedMalicious: Schema.optional(Schema.Boolean).pipe(
    T.JsonName("url_reported_malicious"),
  ),
}) as unknown as Schema.Schema<GetConnectionResponse>;

export const getConnection: (
  input: GetConnectionRequest,
) => Effect.Effect<
  GetConnectionResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetConnectionRequest,
  output: GetConnectionResponse,
  errors: [],
}));

// =============================================================================
// Cooky
// =============================================================================

export interface GetCookyRequest {
  cookieId: string;
  /** Identifier */
  zoneId: string;
}

export const GetCookyRequest = Schema.Struct({
  cookieId: Schema.String.pipe(T.HttpPath("cookieId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/page_shield/cookies/{cookieId}",
  }),
) as unknown as Schema.Schema<GetCookyRequest>;

export interface GetCookyResponse {
  /** Identifier */
  id: string;
  firstSeenAt: string;
  host: string;
  lastSeenAt: string;
  name: string;
  type: "first_party" | "unknown";
  domainAttribute?: string;
  expiresAttribute?: string;
  httpOnlyAttribute?: boolean;
  maxAgeAttribute?: number;
  pageUrls?: string[];
  pathAttribute?: string;
  sameSiteAttribute?: "lax" | "strict" | "none";
  secureAttribute?: boolean;
}

export const GetCookyResponse = Schema.Struct({
  id: Schema.String,
  firstSeenAt: Schema.String.pipe(T.JsonName("first_seen_at")),
  host: Schema.String,
  lastSeenAt: Schema.String.pipe(T.JsonName("last_seen_at")),
  name: Schema.String,
  type: Schema.Literals(["first_party", "unknown"]),
  domainAttribute: Schema.optional(Schema.String).pipe(
    T.JsonName("domain_attribute"),
  ),
  expiresAttribute: Schema.optional(Schema.String).pipe(
    T.JsonName("expires_attribute"),
  ),
  httpOnlyAttribute: Schema.optional(Schema.Boolean).pipe(
    T.JsonName("http_only_attribute"),
  ),
  maxAgeAttribute: Schema.optional(Schema.Number).pipe(
    T.JsonName("max_age_attribute"),
  ),
  pageUrls: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.JsonName("page_urls"),
  ),
  pathAttribute: Schema.optional(Schema.String).pipe(
    T.JsonName("path_attribute"),
  ),
  sameSiteAttribute: Schema.optional(
    Schema.Literals(["lax", "strict", "none"]),
  ).pipe(T.JsonName("same_site_attribute")),
  secureAttribute: Schema.optional(Schema.Boolean).pipe(
    T.JsonName("secure_attribute"),
  ),
}) as unknown as Schema.Schema<GetCookyResponse>;

export const getCooky: (
  input: GetCookyRequest,
) => Effect.Effect<
  GetCookyResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetCookyRequest,
  output: GetCookyResponse,
  errors: [],
}));

// =============================================================================
// PageShield
// =============================================================================

export interface GetPageShieldRequest {
  /** Identifier */
  zoneId: string;
}

export const GetPageShieldRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/page_shield" }),
) as unknown as Schema.Schema<GetPageShieldRequest>;

export interface GetPageShieldResponse {
  /** When true, indicates that Page Shield is enabled. */
  enabled: boolean;
  /** The timestamp of when Page Shield was last updated. */
  updatedAt: string;
  /** When true, CSP reports will be sent to https://csp-reporting.cloudflare.com/cdn-cgi/script_monitor/report */
  useCloudflareReportingEndpoint: boolean;
  /** When true, the paths associated with connections URLs will also be analyzed. */
  useConnectionUrlPath: boolean;
}

export const GetPageShieldResponse = Schema.Struct({
  enabled: Schema.Boolean,
  updatedAt: Schema.String.pipe(T.JsonName("updated_at")),
  useCloudflareReportingEndpoint: Schema.Boolean.pipe(
    T.JsonName("use_cloudflare_reporting_endpoint"),
  ),
  useConnectionUrlPath: Schema.Boolean.pipe(
    T.JsonName("use_connection_url_path"),
  ),
}) as unknown as Schema.Schema<GetPageShieldResponse>;

export const getPageShield: (
  input: GetPageShieldRequest,
) => Effect.Effect<
  GetPageShieldResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPageShieldRequest,
  output: GetPageShieldResponse,
  errors: [],
}));

export interface PutPageShieldRequest {
  /** Path param: Identifier */
  zoneId: string;
  /** Body param: When true, indicates that Page Shield is enabled. */
  enabled?: boolean;
  /** Body param: When true, CSP reports will be sent to https://csp-reporting.cloudflare.com/cdn-cgi/script_monitor/report */
  useCloudflareReportingEndpoint?: boolean;
  /** Body param: When true, the paths associated with connections URLs will also be analyzed. */
  useConnectionUrlPath?: boolean;
}

export const PutPageShieldRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  enabled: Schema.optional(Schema.Boolean),
  useCloudflareReportingEndpoint: Schema.optional(Schema.Boolean).pipe(
    T.JsonName("use_cloudflare_reporting_endpoint"),
  ),
  useConnectionUrlPath: Schema.optional(Schema.Boolean).pipe(
    T.JsonName("use_connection_url_path"),
  ),
}).pipe(
  T.Http({ method: "PUT", path: "/zones/{zone_id}/page_shield" }),
) as unknown as Schema.Schema<PutPageShieldRequest>;

export interface PutPageShieldResponse {
  /** When true, indicates that Page Shield is enabled. */
  enabled: boolean;
  /** The timestamp of when Page Shield was last updated. */
  updatedAt: string;
  /** When true, CSP reports will be sent to https://csp-reporting.cloudflare.com/cdn-cgi/script_monitor/report */
  useCloudflareReportingEndpoint: boolean;
  /** When true, the paths associated with connections URLs will also be analyzed. */
  useConnectionUrlPath: boolean;
}

export const PutPageShieldResponse = Schema.Struct({
  enabled: Schema.Boolean,
  updatedAt: Schema.String.pipe(T.JsonName("updated_at")),
  useCloudflareReportingEndpoint: Schema.Boolean.pipe(
    T.JsonName("use_cloudflare_reporting_endpoint"),
  ),
  useConnectionUrlPath: Schema.Boolean.pipe(
    T.JsonName("use_connection_url_path"),
  ),
}) as unknown as Schema.Schema<PutPageShieldResponse>;

export const putPageShield: (
  input: PutPageShieldRequest,
) => Effect.Effect<
  PutPageShieldResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutPageShieldRequest,
  output: PutPageShieldResponse,
  errors: [],
}));

// =============================================================================
// Policy
// =============================================================================

export interface GetPolicyRequest {
  policyId: string;
  /** Identifier */
  zoneId: string;
}

export const GetPolicyRequest = Schema.Struct({
  policyId: Schema.String.pipe(T.HttpPath("policyId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/page_shield/policies/{policyId}",
  }),
) as unknown as Schema.Schema<GetPolicyRequest>;

export interface GetPolicyResponse {
  /** Identifier */
  id: string;
  /** The action to take if the expression matches */
  action: "allow" | "log";
  /** A description for the policy */
  description: string;
  /** Whether the policy is enabled */
  enabled: boolean;
  /** The expression which must match for the policy to be applied, using the Cloudflare Firewall rule expression syntax */
  expression: string;
  /** The policy which will be applied */
  value: string;
}

export const GetPolicyResponse = Schema.Struct({
  id: Schema.String,
  action: Schema.Literals(["allow", "log"]),
  description: Schema.String,
  enabled: Schema.Boolean,
  expression: Schema.String,
  value: Schema.String,
}) as unknown as Schema.Schema<GetPolicyResponse>;

export const getPolicy: (
  input: GetPolicyRequest,
) => Effect.Effect<
  GetPolicyResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPolicyRequest,
  output: GetPolicyResponse,
  errors: [],
}));

export interface CreatePolicyRequest {
  /** Path param: Identifier */
  zoneId: string;
  /** Body param: The action to take if the expression matches */
  action: "allow" | "log";
  /** Body param: A description for the policy */
  description: string;
  /** Body param: Whether the policy is enabled */
  enabled: boolean;
  /** Body param: The expression which must match for the policy to be applied, using the Cloudflare Firewall rule expression syntax */
  expression: string;
  /** Body param: The policy which will be applied */
  value: string;
}

export const CreatePolicyRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  action: Schema.Literals(["allow", "log"]),
  description: Schema.String,
  enabled: Schema.Boolean,
  expression: Schema.String,
  value: Schema.String,
}).pipe(
  T.Http({ method: "POST", path: "/zones/{zone_id}/page_shield/policies" }),
) as unknown as Schema.Schema<CreatePolicyRequest>;

export interface CreatePolicyResponse {
  /** Identifier */
  id: string;
  /** The action to take if the expression matches */
  action: "allow" | "log";
  /** A description for the policy */
  description: string;
  /** Whether the policy is enabled */
  enabled: boolean;
  /** The expression which must match for the policy to be applied, using the Cloudflare Firewall rule expression syntax */
  expression: string;
  /** The policy which will be applied */
  value: string;
}

export const CreatePolicyResponse = Schema.Struct({
  id: Schema.String,
  action: Schema.Literals(["allow", "log"]),
  description: Schema.String,
  enabled: Schema.Boolean,
  expression: Schema.String,
  value: Schema.String,
}) as unknown as Schema.Schema<CreatePolicyResponse>;

export const createPolicy: (
  input: CreatePolicyRequest,
) => Effect.Effect<
  CreatePolicyResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePolicyRequest,
  output: CreatePolicyResponse,
  errors: [],
}));

export interface UpdatePolicyRequest {
  policyId: string;
  /** Path param: Identifier */
  zoneId: string;
  /** Body param: The action to take if the expression matches */
  action?: "allow" | "log";
  /** Body param: A description for the policy */
  description?: string;
  /** Body param: Whether the policy is enabled */
  enabled?: boolean;
  /** Body param: The expression which must match for the policy to be applied, using the Cloudflare Firewall rule expression syntax */
  expression?: string;
  /** Body param: The policy which will be applied */
  value?: string;
}

export const UpdatePolicyRequest = Schema.Struct({
  policyId: Schema.String.pipe(T.HttpPath("policyId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  action: Schema.optional(Schema.Literals(["allow", "log"])),
  description: Schema.optional(Schema.String),
  enabled: Schema.optional(Schema.Boolean),
  expression: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/zones/{zone_id}/page_shield/policies/{policyId}",
  }),
) as unknown as Schema.Schema<UpdatePolicyRequest>;

export interface UpdatePolicyResponse {
  /** Identifier */
  id: string;
  /** The action to take if the expression matches */
  action: "allow" | "log";
  /** A description for the policy */
  description: string;
  /** Whether the policy is enabled */
  enabled: boolean;
  /** The expression which must match for the policy to be applied, using the Cloudflare Firewall rule expression syntax */
  expression: string;
  /** The policy which will be applied */
  value: string;
}

export const UpdatePolicyResponse = Schema.Struct({
  id: Schema.String,
  action: Schema.Literals(["allow", "log"]),
  description: Schema.String,
  enabled: Schema.Boolean,
  expression: Schema.String,
  value: Schema.String,
}) as unknown as Schema.Schema<UpdatePolicyResponse>;

export const updatePolicy: (
  input: UpdatePolicyRequest,
) => Effect.Effect<
  UpdatePolicyResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdatePolicyRequest,
  output: UpdatePolicyResponse,
  errors: [],
}));

export interface DeletePolicyRequest {
  policyId: string;
  /** Identifier */
  zoneId: string;
}

export const DeletePolicyRequest = Schema.Struct({
  policyId: Schema.String.pipe(T.HttpPath("policyId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/zones/{zone_id}/page_shield/policies/{policyId}",
  }),
) as unknown as Schema.Schema<DeletePolicyRequest>;

export type DeletePolicyResponse = unknown;

export const DeletePolicyResponse =
  Schema.Unknown as unknown as Schema.Schema<DeletePolicyResponse>;

export const deletePolicy: (
  input: DeletePolicyRequest,
) => Effect.Effect<
  DeletePolicyResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletePolicyRequest,
  output: DeletePolicyResponse,
  errors: [],
}));

// =============================================================================
// Script
// =============================================================================

export interface GetScriptRequest {
  scriptId: string;
  /** Identifier */
  zoneId: string;
}

export const GetScriptRequest = Schema.Struct({
  scriptId: Schema.String.pipe(T.HttpPath("scriptId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/page_shield/scripts/{scriptId}",
  }),
) as unknown as Schema.Schema<GetScriptRequest>;

export interface GetScriptResponse {
  /** Identifier */
  id: string;
  addedAt: string;
  firstSeenAt: string;
  host: string;
  lastSeenAt: string;
  url: string;
  urlContainsCdnCgiPath: boolean;
  /** The cryptomining score of the JavaScript content. */
  cryptominingScore?: number | null;
  /** The dataflow score of the JavaScript content. */
  dataflowScore?: number | null;
  domainReportedMalicious?: boolean;
  /** The timestamp of when the script was last fetched. */
  fetchedAt?: string | null;
  firstPageUrl?: string;
  /** The computed hash of the analyzed script. */
  hash?: string | null;
  /** The integrity score of the JavaScript content. */
  jsIntegrityScore?: number | null;
  /** The magecart score of the JavaScript content. */
  magecartScore?: number | null;
  maliciousDomainCategories?: string[];
  maliciousUrlCategories?: string[];
  /** The malware score of the JavaScript content. */
  malwareScore?: number | null;
  /** The obfuscation score of the JavaScript content. */
  obfuscationScore?: number | null;
  pageUrls?: string[];
  urlReportedMalicious?: boolean;
  versions?:
    | {
        cryptominingScore?: number | null;
        dataflowScore?: number | null;
        fetchedAt?: string | null;
        hash?: string | null;
        jsIntegrityScore?: number | null;
        magecartScore?: number | null;
        malwareScore?: number | null;
        obfuscationScore?: number | null;
      }[]
    | null;
}

export const GetScriptResponse = Schema.Struct({
  id: Schema.String,
  addedAt: Schema.String.pipe(T.JsonName("added_at")),
  firstSeenAt: Schema.String.pipe(T.JsonName("first_seen_at")),
  host: Schema.String,
  lastSeenAt: Schema.String.pipe(T.JsonName("last_seen_at")),
  url: Schema.String,
  urlContainsCdnCgiPath: Schema.Boolean.pipe(
    T.JsonName("url_contains_cdn_cgi_path"),
  ),
  cryptominingScore: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ).pipe(T.JsonName("cryptomining_score")),
  dataflowScore: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ).pipe(T.JsonName("dataflow_score")),
  domainReportedMalicious: Schema.optional(Schema.Boolean).pipe(
    T.JsonName("domain_reported_malicious"),
  ),
  fetchedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])).pipe(
    T.JsonName("fetched_at"),
  ),
  firstPageUrl: Schema.optional(Schema.String).pipe(
    T.JsonName("first_page_url"),
  ),
  hash: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  jsIntegrityScore: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ).pipe(T.JsonName("js_integrity_score")),
  magecartScore: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ).pipe(T.JsonName("magecart_score")),
  maliciousDomainCategories: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.JsonName("malicious_domain_categories"),
  ),
  maliciousUrlCategories: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.JsonName("malicious_url_categories"),
  ),
  malwareScore: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ).pipe(T.JsonName("malware_score")),
  obfuscationScore: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ).pipe(T.JsonName("obfuscation_score")),
  pageUrls: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.JsonName("page_urls"),
  ),
  urlReportedMalicious: Schema.optional(Schema.Boolean).pipe(
    T.JsonName("url_reported_malicious"),
  ),
  versions: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          cryptominingScore: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ).pipe(T.JsonName("cryptomining_score")),
          dataflowScore: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ).pipe(T.JsonName("dataflow_score")),
          fetchedAt: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ).pipe(T.JsonName("fetched_at")),
          hash: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          jsIntegrityScore: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ).pipe(T.JsonName("js_integrity_score")),
          magecartScore: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ).pipe(T.JsonName("magecart_score")),
          malwareScore: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ).pipe(T.JsonName("malware_score")),
          obfuscationScore: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ).pipe(T.JsonName("obfuscation_score")),
        }),
      ),
      Schema.Null,
    ]),
  ),
}) as unknown as Schema.Schema<GetScriptResponse>;

export const getScript: (
  input: GetScriptRequest,
) => Effect.Effect<
  GetScriptResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetScriptRequest,
  output: GetScriptResponse,
  errors: [],
}));
