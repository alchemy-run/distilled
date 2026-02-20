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
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAbuseReportRequest,
  output: GetAbuseReportResponse,
  errors: [],
}));

export interface CreateAbuseReportRequest {
  reportParam: string;
}

export const CreateAbuseReportRequest = Schema.Struct({
  reportParam: Schema.String.pipe(T.HttpPath("reportParam")),
}).pipe(
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
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAbuseReportRequest,
  output: CreateAbuseReportResponse,
  errors: [],
}));
