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
  addedAt: Schema.String,
  firstSeenAt: Schema.String,
  host: Schema.String,
  lastSeenAt: Schema.String,
  url: Schema.String,
  urlContainsCdnCgiPath: Schema.Boolean,
  domainReportedMalicious: Schema.optional(Schema.Boolean),
  firstPageUrl: Schema.optional(Schema.String),
  maliciousDomainCategories: Schema.optional(Schema.Array(Schema.String)),
  maliciousUrlCategories: Schema.optional(Schema.Array(Schema.String)),
  pageUrls: Schema.optional(Schema.Array(Schema.String)),
  urlReportedMalicious: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    addedAt: "added_at",
    firstSeenAt: "first_seen_at",
    host: "host",
    lastSeenAt: "last_seen_at",
    url: "url",
    urlContainsCdnCgiPath: "url_contains_cdn_cgi_path",
    domainReportedMalicious: "domain_reported_malicious",
    firstPageUrl: "first_page_url",
    maliciousDomainCategories: "malicious_domain_categories",
    maliciousUrlCategories: "malicious_url_categories",
    pageUrls: "page_urls",
    urlReportedMalicious: "url_reported_malicious",
  }),
) as unknown as Schema.Schema<GetConnectionResponse>;

export type GetConnectionError = CommonErrors;

export const getConnection: API.OperationMethod<
  GetConnectionRequest,
  GetConnectionResponse,
  GetConnectionError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetConnectionRequest,
  output: GetConnectionResponse,
  errors: [],
}));

export interface ListConnectionsRequest {
  /** Path param: Identifier */
  zoneId: string;
  /** Query param: The direction used to sort returned connections. */
  direction?: "asc" | "desc";
  /** Query param: When true, excludes connections seen in a `/cdn-cgi` path from the returned connections. The default value is true. */
  excludeCdnCgi?: boolean;
  /** Query param: Excludes connections whose URL contains one of the URL-encoded URLs separated by commas. */
  excludeUrls?: string;
  /** Query param: Export the list of connections as a file, limited to 50000 entries. */
  export?: "csv";
  /** Query param: Includes connections that match one or more URL-encoded hostnames separated by commas.  Wildcards are supported at the start and end of each hostname to support starts with, ends with and */
  hosts?: string;
  /** Query param: The field used to sort returned connections. */
  orderBy?: "first_seen_at" | "last_seen_at";
  /** Query param: The current page number of the paginated results.  We additionally support a special value "all". When "all" is used, the API will return all the connections with the applied filters in a */
  page?: string;
  /** Query param: Includes connections that match one or more page URLs (separated by commas) where they were last seen  Wildcards are supported at the start and end of each page URL to support starts with */
  pageUrl?: string;
  /** Query param: The number of results per page. */
  perPage?: number;
  /** Query param: When true, malicious connections appear first in the returned connections. */
  prioritizeMalicious?: boolean;
  /** Query param: Filters the returned connections using a comma-separated list of connection statuses. Accepted values: `active`, `infrequent`, and `inactive`. The default value is `active`. */
  status?: string;
  /** Query param: Includes connections whose URL contain one or more URL-encoded URLs separated by commas. */
  urls?: string;
}

export const ListConnectionsRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  direction: Schema.optional(Schema.Literals(["asc", "desc"])).pipe(
    T.HttpQuery("direction"),
  ),
  excludeCdnCgi: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("exclude_cdn_cgi"),
  ),
  excludeUrls: Schema.optional(Schema.String).pipe(T.HttpQuery("exclude_urls")),
  export: Schema.optional(Schema.Literal("csv")).pipe(T.HttpQuery("export")),
  hosts: Schema.optional(Schema.String).pipe(T.HttpQuery("hosts")),
  orderBy: Schema.optional(
    Schema.Literals(["first_seen_at", "last_seen_at"]),
  ).pipe(T.HttpQuery("order_by")),
  page: Schema.optional(Schema.String).pipe(T.HttpQuery("page")),
  pageUrl: Schema.optional(Schema.String).pipe(T.HttpQuery("page_url")),
  perPage: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  prioritizeMalicious: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("prioritize_malicious"),
  ),
  status: Schema.optional(Schema.String).pipe(T.HttpQuery("status")),
  urls: Schema.optional(Schema.String).pipe(T.HttpQuery("urls")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/page_shield/connections" }),
) as unknown as Schema.Schema<ListConnectionsRequest>;

export type ListConnectionsResponse = {
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
}[];

export const ListConnectionsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    addedAt: Schema.String,
    firstSeenAt: Schema.String,
    host: Schema.String,
    lastSeenAt: Schema.String,
    url: Schema.String,
    urlContainsCdnCgiPath: Schema.Boolean,
    domainReportedMalicious: Schema.optional(Schema.Boolean),
    firstPageUrl: Schema.optional(Schema.String),
    maliciousDomainCategories: Schema.optional(Schema.Array(Schema.String)),
    maliciousUrlCategories: Schema.optional(Schema.Array(Schema.String)),
    pageUrls: Schema.optional(Schema.Array(Schema.String)),
    urlReportedMalicious: Schema.optional(Schema.Boolean),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      addedAt: "added_at",
      firstSeenAt: "first_seen_at",
      host: "host",
      lastSeenAt: "last_seen_at",
      url: "url",
      urlContainsCdnCgiPath: "url_contains_cdn_cgi_path",
      domainReportedMalicious: "domain_reported_malicious",
      firstPageUrl: "first_page_url",
      maliciousDomainCategories: "malicious_domain_categories",
      maliciousUrlCategories: "malicious_url_categories",
      pageUrls: "page_urls",
      urlReportedMalicious: "url_reported_malicious",
    }),
  ),
) as unknown as Schema.Schema<ListConnectionsResponse>;

export type ListConnectionsError = CommonErrors;

export const listConnections: API.OperationMethod<
  ListConnectionsRequest,
  ListConnectionsResponse,
  ListConnectionsError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListConnectionsRequest,
  output: ListConnectionsResponse,
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
  firstSeenAt: Schema.String,
  host: Schema.String,
  lastSeenAt: Schema.String,
  name: Schema.String,
  type: Schema.Literals(["first_party", "unknown"]),
  domainAttribute: Schema.optional(Schema.String),
  expiresAttribute: Schema.optional(Schema.String),
  httpOnlyAttribute: Schema.optional(Schema.Boolean),
  maxAgeAttribute: Schema.optional(Schema.Number),
  pageUrls: Schema.optional(Schema.Array(Schema.String)),
  pathAttribute: Schema.optional(Schema.String),
  sameSiteAttribute: Schema.optional(
    Schema.Literals(["lax", "strict", "none"]),
  ),
  secureAttribute: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    firstSeenAt: "first_seen_at",
    host: "host",
    lastSeenAt: "last_seen_at",
    name: "name",
    type: "type",
    domainAttribute: "domain_attribute",
    expiresAttribute: "expires_attribute",
    httpOnlyAttribute: "http_only_attribute",
    maxAgeAttribute: "max_age_attribute",
    pageUrls: "page_urls",
    pathAttribute: "path_attribute",
    sameSiteAttribute: "same_site_attribute",
    secureAttribute: "secure_attribute",
  }),
) as unknown as Schema.Schema<GetCookyResponse>;

export type GetCookyError = CommonErrors;

export const getCooky: API.OperationMethod<
  GetCookyRequest,
  GetCookyResponse,
  GetCookyError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetCookyRequest,
  output: GetCookyResponse,
  errors: [],
}));

export interface ListCookiesRequest {
  /** Path param: Identifier */
  zoneId: string;
  /** Query param: The direction used to sort returned cookies.' */
  direction?: "asc" | "desc";
  /** Query param: Filters the returned cookies that match the specified domain attribute */
  domain?: string;
  /** Query param: Export the list of cookies as a file, limited to 50000 entries. */
  export?: "csv";
  /** Query param: Includes cookies that match one or more URL-encoded hostnames separated by commas.  Wildcards are supported at the start and end of each hostname to support starts with, ends with and con */
  hosts?: string;
  /** Query param: Filters the returned cookies that are set with HttpOnly */
  httpOnly?: boolean;
  /** Query param: Filters the returned cookies that match the specified name. Wildcards are supported at the start and end to support starts with, ends with and contains. e.g. session\ */
  name?: string;
  /** Query param: The field used to sort returned cookies. */
  orderBy?: "first_seen_at" | "last_seen_at";
  /** Query param: The current page number of the paginated results.  We additionally support a special value "all". When "all" is used, the API will return all the cookies with the applied filters in a sin */
  page?: string;
  /** Query param: Includes connections that match one or more page URLs (separated by commas) where they were last seen  Wildcards are supported at the start and end of each page URL to support starts with */
  pageUrl?: string;
  /** Query param: Filters the returned cookies that match the specified path attribute */
  path?: string;
  /** Query param: The number of results per page. */
  perPage?: number;
  /** Query param: Filters the returned cookies that match the specified same_site attribute */
  sameSite?: "lax" | "strict" | "none";
  /** Query param: Filters the returned cookies that are set with Secure */
  secure?: boolean;
  /** Query param: Filters the returned cookies that match the specified type attribute */
  type?: "first_party" | "unknown";
}

export const ListCookiesRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  direction: Schema.optional(Schema.Literals(["asc", "desc"])).pipe(
    T.HttpQuery("direction"),
  ),
  domain: Schema.optional(Schema.String).pipe(T.HttpQuery("domain")),
  export: Schema.optional(Schema.Literal("csv")).pipe(T.HttpQuery("export")),
  hosts: Schema.optional(Schema.String).pipe(T.HttpQuery("hosts")),
  httpOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("http_only")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  orderBy: Schema.optional(
    Schema.Literals(["first_seen_at", "last_seen_at"]),
  ).pipe(T.HttpQuery("order_by")),
  page: Schema.optional(Schema.String).pipe(T.HttpQuery("page")),
  pageUrl: Schema.optional(Schema.String).pipe(T.HttpQuery("page_url")),
  path: Schema.optional(Schema.String).pipe(T.HttpQuery("path")),
  perPage: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  sameSite: Schema.optional(Schema.Literals(["lax", "strict", "none"])).pipe(
    T.HttpQuery("same_site"),
  ),
  secure: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("secure")),
  type: Schema.optional(Schema.Literals(["first_party", "unknown"])).pipe(
    T.HttpQuery("type"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/page_shield/cookies" }),
) as unknown as Schema.Schema<ListCookiesRequest>;

export type ListCookiesResponse = {
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
}[];

export const ListCookiesResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    firstSeenAt: Schema.String,
    host: Schema.String,
    lastSeenAt: Schema.String,
    name: Schema.String,
    type: Schema.Literals(["first_party", "unknown"]),
    domainAttribute: Schema.optional(Schema.String),
    expiresAttribute: Schema.optional(Schema.String),
    httpOnlyAttribute: Schema.optional(Schema.Boolean),
    maxAgeAttribute: Schema.optional(Schema.Number),
    pageUrls: Schema.optional(Schema.Array(Schema.String)),
    pathAttribute: Schema.optional(Schema.String),
    sameSiteAttribute: Schema.optional(
      Schema.Literals(["lax", "strict", "none"]),
    ),
    secureAttribute: Schema.optional(Schema.Boolean),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      firstSeenAt: "first_seen_at",
      host: "host",
      lastSeenAt: "last_seen_at",
      name: "name",
      type: "type",
      domainAttribute: "domain_attribute",
      expiresAttribute: "expires_attribute",
      httpOnlyAttribute: "http_only_attribute",
      maxAgeAttribute: "max_age_attribute",
      pageUrls: "page_urls",
      pathAttribute: "path_attribute",
      sameSiteAttribute: "same_site_attribute",
      secureAttribute: "secure_attribute",
    }),
  ),
) as unknown as Schema.Schema<ListCookiesResponse>;

export type ListCookiesError = CommonErrors;

export const listCookies: API.OperationMethod<
  ListCookiesRequest,
  ListCookiesResponse,
  ListCookiesError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListCookiesRequest,
  output: ListCookiesResponse,
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
  updatedAt: Schema.String,
  useCloudflareReportingEndpoint: Schema.Boolean,
  useConnectionUrlPath: Schema.Boolean,
}).pipe(
  Schema.encodeKeys({
    enabled: "enabled",
    updatedAt: "updated_at",
    useCloudflareReportingEndpoint: "use_cloudflare_reporting_endpoint",
    useConnectionUrlPath: "use_connection_url_path",
  }),
) as unknown as Schema.Schema<GetPageShieldResponse>;

export type GetPageShieldError = CommonErrors;

export const getPageShield: API.OperationMethod<
  GetPageShieldRequest,
  GetPageShieldResponse,
  GetPageShieldError,
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
  useCloudflareReportingEndpoint: Schema.optional(Schema.Boolean),
  useConnectionUrlPath: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({
    enabled: "enabled",
    useCloudflareReportingEndpoint: "use_cloudflare_reporting_endpoint",
    useConnectionUrlPath: "use_connection_url_path",
  }),
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
  updatedAt: Schema.String,
  useCloudflareReportingEndpoint: Schema.Boolean,
  useConnectionUrlPath: Schema.Boolean,
}).pipe(
  Schema.encodeKeys({
    enabled: "enabled",
    updatedAt: "updated_at",
    useCloudflareReportingEndpoint: "use_cloudflare_reporting_endpoint",
    useConnectionUrlPath: "use_connection_url_path",
  }),
) as unknown as Schema.Schema<PutPageShieldResponse>;

export type PutPageShieldError = CommonErrors;

export const putPageShield: API.OperationMethod<
  PutPageShieldRequest,
  PutPageShieldResponse,
  PutPageShieldError,
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

export type GetPolicyError = CommonErrors;

export const getPolicy: API.OperationMethod<
  GetPolicyRequest,
  GetPolicyResponse,
  GetPolicyError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPolicyRequest,
  output: GetPolicyResponse,
  errors: [],
}));

export interface ListPoliciesRequest {
  /** Identifier */
  zoneId: string;
}

export const ListPoliciesRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/page_shield/policies" }),
) as unknown as Schema.Schema<ListPoliciesRequest>;

export type ListPoliciesResponse = {
  id: string;
  action: "allow" | "log";
  description: string;
  enabled: boolean;
  expression: string;
  value: string;
}[];

export const ListPoliciesResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    action: Schema.Literals(["allow", "log"]),
    description: Schema.String,
    enabled: Schema.Boolean,
    expression: Schema.String,
    value: Schema.String,
  }),
) as unknown as Schema.Schema<ListPoliciesResponse>;

export type ListPoliciesError = CommonErrors;

export const listPolicies: API.OperationMethod<
  ListPoliciesRequest,
  ListPoliciesResponse,
  ListPoliciesError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListPoliciesRequest,
  output: ListPoliciesResponse,
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

export type CreatePolicyError = CommonErrors;

export const createPolicy: API.OperationMethod<
  CreatePolicyRequest,
  CreatePolicyResponse,
  CreatePolicyError,
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

export type UpdatePolicyError = CommonErrors;

export const updatePolicy: API.OperationMethod<
  UpdatePolicyRequest,
  UpdatePolicyResponse,
  UpdatePolicyError,
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

export type DeletePolicyError = CommonErrors;

export const deletePolicy: API.OperationMethod<
  DeletePolicyRequest,
  DeletePolicyResponse,
  DeletePolicyError,
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
  addedAt: Schema.String,
  firstSeenAt: Schema.String,
  host: Schema.String,
  lastSeenAt: Schema.String,
  url: Schema.String,
  urlContainsCdnCgiPath: Schema.Boolean,
  cryptominingScore: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ),
  dataflowScore: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  domainReportedMalicious: Schema.optional(Schema.Boolean),
  fetchedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  firstPageUrl: Schema.optional(Schema.String),
  hash: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  jsIntegrityScore: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  magecartScore: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  maliciousDomainCategories: Schema.optional(Schema.Array(Schema.String)),
  maliciousUrlCategories: Schema.optional(Schema.Array(Schema.String)),
  malwareScore: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  obfuscationScore: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  pageUrls: Schema.optional(Schema.Array(Schema.String)),
  urlReportedMalicious: Schema.optional(Schema.Boolean),
  versions: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          cryptominingScore: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          dataflowScore: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          fetchedAt: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          hash: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          jsIntegrityScore: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          magecartScore: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          malwareScore: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          obfuscationScore: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            cryptominingScore: "cryptomining_score",
            dataflowScore: "dataflow_score",
            fetchedAt: "fetched_at",
            hash: "hash",
            jsIntegrityScore: "js_integrity_score",
            magecartScore: "magecart_score",
            malwareScore: "malware_score",
            obfuscationScore: "obfuscation_score",
          }),
        ),
      ),
      Schema.Null,
    ]),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    addedAt: "added_at",
    firstSeenAt: "first_seen_at",
    host: "host",
    lastSeenAt: "last_seen_at",
    url: "url",
    urlContainsCdnCgiPath: "url_contains_cdn_cgi_path",
    cryptominingScore: "cryptomining_score",
    dataflowScore: "dataflow_score",
    domainReportedMalicious: "domain_reported_malicious",
    fetchedAt: "fetched_at",
    firstPageUrl: "first_page_url",
    hash: "hash",
    jsIntegrityScore: "js_integrity_score",
    magecartScore: "magecart_score",
    maliciousDomainCategories: "malicious_domain_categories",
    maliciousUrlCategories: "malicious_url_categories",
    malwareScore: "malware_score",
    obfuscationScore: "obfuscation_score",
    pageUrls: "page_urls",
    urlReportedMalicious: "url_reported_malicious",
    versions: "versions",
  }),
) as unknown as Schema.Schema<GetScriptResponse>;

export type GetScriptError = CommonErrors;

export const getScript: API.OperationMethod<
  GetScriptRequest,
  GetScriptResponse,
  GetScriptError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetScriptRequest,
  output: GetScriptResponse,
  errors: [],
}));

export interface ListScriptsRequest {
  /** Path param: Identifier */
  zoneId: string;
  /** Query param: The direction used to sort returned scripts. */
  direction?: "asc" | "desc";
  /** Query param: When true, excludes scripts seen in a `/cdn-cgi` path from the returned scripts. The default value is true. */
  excludeCdnCgi?: boolean;
  /** Query param: When true, excludes duplicate scripts. We consider a script duplicate of another if their javascript content matches and they share the same url host and zone hostname. In such case, we r */
  excludeDuplicates?: boolean;
  /** Query param: Excludes scripts whose URL contains one of the URL-encoded URLs separated by commas. */
  excludeUrls?: string;
  /** Query param: Export the list of scripts as a file, limited to 50000 entries. */
  export?: "csv";
  /** Query param: Includes scripts that match one or more URL-encoded hostnames separated by commas.  Wildcards are supported at the start and end of each hostname to support starts with, ends with and con */
  hosts?: string;
  /** Query param: The field used to sort returned scripts. */
  orderBy?: "first_seen_at" | "last_seen_at";
  /** Query param: The current page number of the paginated results.  We additionally support a special value "all". When "all" is used, the API will return all the scripts with the applied filters in a sin */
  page?: string;
  /** Query param: Includes scripts that match one or more page URLs (separated by commas) where they were last seen  Wildcards are supported at the start and end of each page URL to support starts with, en */
  pageUrl?: string;
  /** Query param: The number of results per page. */
  perPage?: number;
  /** Query param: When true, malicious scripts appear first in the returned scripts. */
  prioritizeMalicious?: boolean;
  /** Query param: Filters the returned scripts using a comma-separated list of scripts statuses. Accepted values: `active`, `infrequent`, and `inactive`. The default value is `active`. */
  status?: string;
  /** Query param: Includes scripts whose URL contain one or more URL-encoded URLs separated by commas. */
  urls?: string;
}

export const ListScriptsRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  direction: Schema.optional(Schema.Literals(["asc", "desc"])).pipe(
    T.HttpQuery("direction"),
  ),
  excludeCdnCgi: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("exclude_cdn_cgi"),
  ),
  excludeDuplicates: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("exclude_duplicates"),
  ),
  excludeUrls: Schema.optional(Schema.String).pipe(T.HttpQuery("exclude_urls")),
  export: Schema.optional(Schema.Literal("csv")).pipe(T.HttpQuery("export")),
  hosts: Schema.optional(Schema.String).pipe(T.HttpQuery("hosts")),
  orderBy: Schema.optional(
    Schema.Literals(["first_seen_at", "last_seen_at"]),
  ).pipe(T.HttpQuery("order_by")),
  page: Schema.optional(Schema.String).pipe(T.HttpQuery("page")),
  pageUrl: Schema.optional(Schema.String).pipe(T.HttpQuery("page_url")),
  perPage: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  prioritizeMalicious: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("prioritize_malicious"),
  ),
  status: Schema.optional(Schema.String).pipe(T.HttpQuery("status")),
  urls: Schema.optional(Schema.String).pipe(T.HttpQuery("urls")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/page_shield/scripts" }),
) as unknown as Schema.Schema<ListScriptsRequest>;

export type ListScriptsResponse = {
  id: string;
  addedAt: string;
  firstSeenAt: string;
  host: string;
  lastSeenAt: string;
  url: string;
  urlContainsCdnCgiPath: boolean;
  cryptominingScore?: number | null;
  dataflowScore?: number | null;
  domainReportedMalicious?: boolean;
  fetchedAt?: string | null;
  firstPageUrl?: string;
  hash?: string | null;
  jsIntegrityScore?: number | null;
  magecartScore?: number | null;
  maliciousDomainCategories?: string[];
  maliciousUrlCategories?: string[];
  malwareScore?: number | null;
  obfuscationScore?: number | null;
  pageUrls?: string[];
  urlReportedMalicious?: boolean;
}[];

export const ListScriptsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    addedAt: Schema.String,
    firstSeenAt: Schema.String,
    host: Schema.String,
    lastSeenAt: Schema.String,
    url: Schema.String,
    urlContainsCdnCgiPath: Schema.Boolean,
    cryptominingScore: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    dataflowScore: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    domainReportedMalicious: Schema.optional(Schema.Boolean),
    fetchedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    firstPageUrl: Schema.optional(Schema.String),
    hash: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    jsIntegrityScore: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    magecartScore: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    maliciousDomainCategories: Schema.optional(Schema.Array(Schema.String)),
    maliciousUrlCategories: Schema.optional(Schema.Array(Schema.String)),
    malwareScore: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    obfuscationScore: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    pageUrls: Schema.optional(Schema.Array(Schema.String)),
    urlReportedMalicious: Schema.optional(Schema.Boolean),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      addedAt: "added_at",
      firstSeenAt: "first_seen_at",
      host: "host",
      lastSeenAt: "last_seen_at",
      url: "url",
      urlContainsCdnCgiPath: "url_contains_cdn_cgi_path",
      cryptominingScore: "cryptomining_score",
      dataflowScore: "dataflow_score",
      domainReportedMalicious: "domain_reported_malicious",
      fetchedAt: "fetched_at",
      firstPageUrl: "first_page_url",
      hash: "hash",
      jsIntegrityScore: "js_integrity_score",
      magecartScore: "magecart_score",
      maliciousDomainCategories: "malicious_domain_categories",
      maliciousUrlCategories: "malicious_url_categories",
      malwareScore: "malware_score",
      obfuscationScore: "obfuscation_score",
      pageUrls: "page_urls",
      urlReportedMalicious: "url_reported_malicious",
    }),
  ),
) as unknown as Schema.Schema<ListScriptsResponse>;

export type ListScriptsError = CommonErrors;

export const listScripts: API.OperationMethod<
  ListScriptsRequest,
  ListScriptsResponse,
  ListScriptsError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListScriptsRequest,
  output: ListScriptsResponse,
  errors: [],
}));
