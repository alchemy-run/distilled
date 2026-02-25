/**
 * Cloudflare ABUSE-REPORTS API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service abuse-reports
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
// Errors
// =============================================================================

export class AbuseReportNotFound extends Schema.TaggedErrorClass<AbuseReportNotFound>()(
  "AbuseReportNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(AbuseReportNotFound, [{ code: 0 }]);

export class InvalidAccountId extends Schema.TaggedErrorClass<InvalidAccountId>()(
  "InvalidAccountId",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidAccountId, [{ code: 7003 }]);

export class InvalidRequest extends Schema.TaggedErrorClass<InvalidRequest>()(
  "InvalidRequest",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidRequest, [{ code: 7003 }]);

// =============================================================================
// AbuseReport
// =============================================================================

export interface GetAbuseReportRequest {
  reportParam: string;
  /** Cloudflare Account ID */
  accountId: string;
}

export const GetAbuseReportRequest = Schema.Struct({
  reportParam: Schema.String.pipe(T.HttpPath("reportParam")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/abuse-reports/{reportParam}",
  }),
) as unknown as Schema.Schema<GetAbuseReportRequest>;

export interface GetAbuseReportResponse {
  /** Public facing ID of abuse report, aka abuse_rand. */
  id: string;
  /** Creation date of report. Time in RFC 3339 format (https://www.rfc-editor.org/rfc/rfc3339.html) */
  cdate: string;
  /** Domain that relates to the report. */
  domain: string;
  /** A summary of the mitigations related to this report. */
  mitigationSummary: {
    acceptedUrlCount: number;
    activeCount: number;
    externalHostNotified: boolean;
    inReviewCount: number;
    pendingCount: number;
  };
  /** An enum value that represents the status of an abuse record */
  status: "accepted" | "in_review";
  /** The abuse report type */
  type:
    | "PHISH"
    | "GEN"
    | "THREAT"
    | "DMCA"
    | "EMER"
    | "TM"
    | "REG_WHO"
    | "NCSEI"
    | "NETWORK";
  /** Justification for the report. */
  justification?: string;
  /** Original work / Targeted brand in the alleged abuse. */
  originalWork?: string;
  /** Information about the submitter of the report. */
  submitter?: {
    company?: string;
    email?: string;
    name?: string;
    telephone?: string;
  };
  urls?: string[];
}

export const GetAbuseReportResponse = Schema.Struct({
  id: Schema.String,
  cdate: Schema.String,
  domain: Schema.String,
  mitigationSummary: Schema.Struct({
    acceptedUrlCount: Schema.Number,
    activeCount: Schema.Number,
    externalHostNotified: Schema.Boolean,
    inReviewCount: Schema.Number,
    pendingCount: Schema.Number,
  }).pipe(
    Schema.encodeKeys({
      acceptedUrlCount: "accepted_url_count",
      activeCount: "active_count",
      externalHostNotified: "external_host_notified",
      inReviewCount: "in_review_count",
      pendingCount: "pending_count",
    }),
  ),
  status: Schema.Literals(["accepted", "in_review"]),
  type: Schema.Literals([
    "PHISH",
    "GEN",
    "THREAT",
    "DMCA",
    "EMER",
    "TM",
    "REG_WHO",
    "NCSEI",
    "NETWORK",
  ]),
  justification: Schema.optional(Schema.String),
  originalWork: Schema.optional(Schema.String),
  submitter: Schema.optional(
    Schema.Struct({
      company: Schema.optional(Schema.String),
      email: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      telephone: Schema.optional(Schema.String),
    }),
  ),
  urls: Schema.optional(Schema.Array(Schema.String)),
}).pipe(
  Schema.encodeKeys({
    mitigationSummary: "mitigation_summary",
    originalWork: "original_work",
  }),
) as unknown as Schema.Schema<GetAbuseReportResponse>;

export const getAbuseReport: (
  input: GetAbuseReportRequest,
) => Effect.Effect<
  GetAbuseReportResponse,
  CommonErrors | InvalidAccountId | AbuseReportNotFound,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAbuseReportRequest,
  output: GetAbuseReportResponse,
  errors: [InvalidAccountId, AbuseReportNotFound],
}));

export interface ListAbuseReportsRequest {
  /** Path param: Cloudflare Account ID */
  accountId: string;
  /** Query param: Returns reports created after the specified date */
  createdAfter?: string;
  /** Query param: Returns reports created before the specified date */
  createdBefore?: string;
  /** Query param: Filter by domain name related to the abuse report */
  domain?: string;
  /** Query param: Filter reports that have any mitigations in the given status. */
  mitigationStatus?:
    | "pending"
    | "active"
    | "in_review"
    | "cancelled"
    | "removed";
  /** Query param: A property to sort by, followed by the order (id, cdate, domain, type, status) */
  sort?: string;
  /** Query param: Filter by the status of the report. */
  status?: "accepted" | "in_review";
  /** Query param: Filter by the type of the report. */
  type?:
    | "PHISH"
    | "GEN"
    | "THREAT"
    | "DMCA"
    | "EMER"
    | "TM"
    | "REG_WHO"
    | "NCSEI"
    | "NETWORK";
}

export const ListAbuseReportsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  createdAfter: Schema.optional(Schema.String).pipe(
    T.HttpQuery("created_after"),
  ),
  createdBefore: Schema.optional(Schema.String).pipe(
    T.HttpQuery("created_before"),
  ),
  domain: Schema.optional(Schema.String).pipe(T.HttpQuery("domain")),
  mitigationStatus: Schema.optional(
    Schema.Literals(["pending", "active", "in_review", "cancelled", "removed"]),
  ).pipe(T.HttpQuery("mitigation_status")),
  sort: Schema.optional(Schema.String).pipe(T.HttpQuery("sort")),
  status: Schema.optional(Schema.Literals(["accepted", "in_review"])).pipe(
    T.HttpQuery("status"),
  ),
  type: Schema.optional(
    Schema.Literals([
      "PHISH",
      "GEN",
      "THREAT",
      "DMCA",
      "EMER",
      "TM",
      "REG_WHO",
      "NCSEI",
      "NETWORK",
    ]),
  ).pipe(T.HttpQuery("type")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/abuse-reports" }),
) as unknown as Schema.Schema<ListAbuseReportsRequest>;

export interface ListAbuseReportsResponse {
  reports:
    | {
        id: string;
        cdate: string;
        domain: string;
        mitigationSummary: {
          acceptedUrlCount: number;
          activeCount: number;
          externalHostNotified: boolean;
          inReviewCount: number;
          pendingCount: number;
        };
        status: "accepted" | "in_review";
        type:
          | "PHISH"
          | "GEN"
          | "THREAT"
          | "DMCA"
          | "EMER"
          | "TM"
          | "REG_WHO"
          | "NCSEI"
          | "NETWORK";
        justification?: string;
        originalWork?: string;
        submitter?: {
          company?: string;
          email?: string;
          name?: string;
          telephone?: string;
        };
        urls?: string[];
      }[]
    | null;
}

export const ListAbuseReportsResponse = Schema.Struct({
  reports: Schema.Union([
    Schema.Array(
      Schema.Struct({
        id: Schema.String,
        cdate: Schema.String,
        domain: Schema.String,
        mitigationSummary: Schema.Struct({
          acceptedUrlCount: Schema.Number,
          activeCount: Schema.Number,
          externalHostNotified: Schema.Boolean,
          inReviewCount: Schema.Number,
          pendingCount: Schema.Number,
        }).pipe(
          Schema.encodeKeys({
            acceptedUrlCount: "accepted_url_count",
            activeCount: "active_count",
            externalHostNotified: "external_host_notified",
            inReviewCount: "in_review_count",
            pendingCount: "pending_count",
          }),
        ),
        status: Schema.Literals(["accepted", "in_review"]),
        type: Schema.Literals([
          "PHISH",
          "GEN",
          "THREAT",
          "DMCA",
          "EMER",
          "TM",
          "REG_WHO",
          "NCSEI",
          "NETWORK",
        ]),
        justification: Schema.optional(Schema.String),
        originalWork: Schema.optional(Schema.String),
        submitter: Schema.optional(
          Schema.Struct({
            company: Schema.optional(Schema.String),
            email: Schema.optional(Schema.String),
            name: Schema.optional(Schema.String),
            telephone: Schema.optional(Schema.String),
          }),
        ),
        urls: Schema.optional(Schema.Array(Schema.String)),
      }).pipe(
        Schema.encodeKeys({
          mitigationSummary: "mitigation_summary",
          originalWork: "original_work",
        }),
      ),
    ),
    Schema.Null,
  ]),
}) as unknown as Schema.Schema<ListAbuseReportsResponse>;

export const listAbuseReports: (
  input: ListAbuseReportsRequest,
) => Effect.Effect<
  ListAbuseReportsResponse,
  CommonErrors | InvalidAccountId,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListAbuseReportsRequest,
  output: ListAbuseReportsResponse,
  errors: [InvalidAccountId],
}));

export interface CreateAbuseReportRequest {
  reportParam: string;
  /** Path param: Cloudflare Account ID */
  accountId: string;
  /** Body param: The report type for submitted reports. */
  act: "abuse_dmca";
  /** Body param: Text not exceeding 100 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/). */
  address1: string;
  /** Body param: The name of the copyright holder. Text not exceeding 60 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/). */
  agentName: string;
  /** Body param: Can be `0` for false or `1` for true. Must be value: 1 for DMCA reports */
  agree: "1";
  /** Body param: Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/). */
  city: string;
  /** Body param: Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/). */
  country: string;
  /** Body param: A valid email of the abuse reporter. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/). */
  email: string;
  /** Body param: Should match the value provided in `email` */
  email2: string;
  /** Body param: Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous. */
  hostNotification: "send";
  /** Body param: Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/). */
  name: string;
  /** Body param: Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/). */
  originalWork: string;
  /** Body param: Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous. */
  ownerNotification: "send";
  /** Body param: Required for DMCA reports, should be same as Name. An affirmation that all information in the report is true and accurate while agreeing to the policies of Cloudflare's abuse reports */
  signature: string;
  /** Body param: Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/). */
  state: string;
  /** Body param: A list of valid URLs separated by ‘\n’ (new line character). The list of the URLs should not exceed 250 URLs. All URLs should have the same hostname. Each URL should be unique. This field  */
  urls: string;
  /** Body param: Any additional comments about the infringement not exceeding 2000 characters */
  comments?: string;
  /** Body param: Text not exceeding 100 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/). */
  company?: string;
  /** Body param: Text containing 2 characters */
  reportedCountry?: string;
  /** Body param: Text not exceeding 255 characters */
  reportedUserAgent?: string;
  /** Body param: Text not exceeding 20 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/). */
  tele?: string;
  /** Body param: Text not exceeding 255 characters */
  title?: string;
}

export const CreateAbuseReportRequest = Schema.Struct({
  reportParam: Schema.String.pipe(T.HttpPath("reportParam")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  act: Schema.Literal("abuse_dmca"),
  address1: Schema.String,
  agentName: Schema.String,
  agree: Schema.Literal("1"),
  city: Schema.String,
  country: Schema.String,
  email: Schema.String,
  email2: Schema.String,
  hostNotification: Schema.Literal("send"),
  name: Schema.String,
  originalWork: Schema.String,
  ownerNotification: Schema.Literal("send"),
  signature: Schema.String,
  state: Schema.String,
  urls: Schema.String,
  comments: Schema.optional(Schema.String),
  company: Schema.optional(Schema.String),
  reportedCountry: Schema.optional(Schema.String),
  reportedUserAgent: Schema.optional(Schema.String),
  tele: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    agentName: "agent_name",
    hostNotification: "host_notification",
    originalWork: "original_work",
    ownerNotification: "owner_notification",
    reportedCountry: "reported_country",
    reportedUserAgent: "reported_user_agent",
  }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/abuse-reports/{reportParam}",
  }),
) as unknown as Schema.Schema<CreateAbuseReportRequest>;

export type CreateAbuseReportResponse = string;

export const CreateAbuseReportResponse =
  Schema.String as unknown as Schema.Schema<CreateAbuseReportResponse>;

export const createAbuseReport: (
  input: CreateAbuseReportRequest,
) => Effect.Effect<
  CreateAbuseReportResponse,
  CommonErrors | InvalidRequest,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAbuseReportRequest,
  output: CreateAbuseReportResponse,
  errors: [InvalidRequest],
}));

// =============================================================================
// Mitigation
// =============================================================================

export interface ListMitigationsRequest {
  reportId: string;
  /** Path param: Cloudflare Account ID */
  accountId: string;
  /** Query param: Returns mitigation that were dispatched after the given date */
  effectiveAfter?: string;
  /** Query param: Returns mitigations that were dispatched before the given date */
  effectiveBefore?: string;
  /** Query param: Filter by the type of entity the mitigation impacts. */
  entityType?: "url_pattern" | "account" | "zone";
  /** Query param: A property to sort by, followed by the order */
  sort?:
    | "type,asc"
    | "type,desc"
    | "effective_date,asc"
    | "effective_date,desc"
    | "status,asc"
    | "status,desc"
    | "entity_type,asc"
    | "entity_type,desc";
  /** Query param: Filter by the status of the mitigation. */
  status?: "pending" | "active" | "in_review" | "cancelled" | "removed";
  /** Query param: Filter by the type of mitigation. This filter parameter can be specified multiple times to include multiple types of mitigations in the result set, e.g. ?type=rate_limit_cache&type=legal_ */
  type?:
    | "legal_block"
    | "phishing_interstitial"
    | "network_block"
    | "rate_limit_cache"
    | "account_suspend"
    | "redirect_video_stream";
}

export const ListMitigationsRequest = Schema.Struct({
  reportId: Schema.String.pipe(T.HttpPath("reportId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  effectiveAfter: Schema.optional(Schema.String).pipe(
    T.HttpQuery("effective_after"),
  ),
  effectiveBefore: Schema.optional(Schema.String).pipe(
    T.HttpQuery("effective_before"),
  ),
  entityType: Schema.optional(
    Schema.Literals(["url_pattern", "account", "zone"]),
  ).pipe(T.HttpQuery("entity_type")),
  sort: Schema.optional(
    Schema.Literals([
      "type,asc",
      "type,desc",
      "effective_date,asc",
      "effective_date,desc",
      "status,asc",
      "status,desc",
      "entity_type,asc",
      "entity_type,desc",
    ]),
  ).pipe(T.HttpQuery("sort")),
  status: Schema.optional(
    Schema.Literals(["pending", "active", "in_review", "cancelled", "removed"]),
  ).pipe(T.HttpQuery("status")),
  type: Schema.optional(
    Schema.Literals([
      "legal_block",
      "phishing_interstitial",
      "network_block",
      "rate_limit_cache",
      "account_suspend",
      "redirect_video_stream",
    ]),
  ).pipe(T.HttpQuery("type")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/abuse-reports/{reportId}/mitigations",
  }),
) as unknown as Schema.Schema<ListMitigationsRequest>;

export type ListMitigationsResponse = {
  mitigations: {
    id: string;
    effectiveDate: string;
    entityId: string;
    entityType: "url_pattern" | "account" | "zone";
    status: "pending" | "active" | "in_review" | "cancelled" | "removed";
    type:
      | "legal_block"
      | "phishing_interstitial"
      | "network_block"
      | "rate_limit_cache"
      | "account_suspend"
      | "redirect_video_stream";
  }[];
}[];

export const ListMitigationsResponse = Schema.Array(
  Schema.Struct({
    mitigations: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        effectiveDate: Schema.String,
        entityId: Schema.String,
        entityType: Schema.Literals(["url_pattern", "account", "zone"]),
        status: Schema.Literals([
          "pending",
          "active",
          "in_review",
          "cancelled",
          "removed",
        ]),
        type: Schema.Literals([
          "legal_block",
          "phishing_interstitial",
          "network_block",
          "rate_limit_cache",
          "account_suspend",
          "redirect_video_stream",
        ]),
      }).pipe(
        Schema.encodeKeys({
          effectiveDate: "effective_date",
          entityId: "entity_id",
          entityType: "entity_type",
        }),
      ),
    ),
  }),
) as unknown as Schema.Schema<ListMitigationsResponse>;

export const listMitigations: (
  input: ListMitigationsRequest,
) => Effect.Effect<
  ListMitigationsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListMitigationsRequest,
  output: ListMitigationsResponse,
  errors: [],
}));

export interface ReviewMitigationRequest {
  reportId: string;
  /** Path param: Cloudflare Account ID */
  accountId: string;
  /** Body param: List of mitigations to appeal. */
  appeals: { id: string; reason: "removed" | "misclassified" }[];
}

export const ReviewMitigationRequest = Schema.Struct({
  reportId: Schema.String.pipe(T.HttpPath("reportId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  appeals: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      reason: Schema.Literals(["removed", "misclassified"]),
    }),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/abuse-reports/{reportId}/mitigations/appeal",
  }),
) as unknown as Schema.Schema<ReviewMitigationRequest>;

export type ReviewMitigationResponse = {
  id: string;
  effectiveDate: string;
  entityId: string;
  entityType: "url_pattern" | "account" | "zone";
  status: "pending" | "active" | "in_review" | "cancelled" | "removed";
  type:
    | "legal_block"
    | "phishing_interstitial"
    | "network_block"
    | "rate_limit_cache"
    | "account_suspend"
    | "redirect_video_stream";
}[];

export const ReviewMitigationResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    effectiveDate: Schema.String,
    entityId: Schema.String,
    entityType: Schema.Literals(["url_pattern", "account", "zone"]),
    status: Schema.Literals([
      "pending",
      "active",
      "in_review",
      "cancelled",
      "removed",
    ]),
    type: Schema.Literals([
      "legal_block",
      "phishing_interstitial",
      "network_block",
      "rate_limit_cache",
      "account_suspend",
      "redirect_video_stream",
    ]),
  }).pipe(
    Schema.encodeKeys({
      effectiveDate: "effective_date",
      entityId: "entity_id",
      entityType: "entity_type",
    }),
  ),
) as unknown as Schema.Schema<ReviewMitigationResponse>;

export const reviewMitigation: (
  input: ReviewMitigationRequest,
) => Effect.Effect<
  ReviewMitigationResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ReviewMitigationRequest,
  output: ReviewMitigationResponse,
  errors: [],
}));
