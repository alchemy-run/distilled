/**
 * Cloudflare ABUSE-REPORTS API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service abuse-reports
 */

import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import type { HttpClient } from "@effect/platform";
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

export class AbuseReportNotFound extends Schema.TaggedError<AbuseReportNotFound>()(
  "AbuseReportNotFound",
  { code: Schema.Number, message: Schema.String },
).pipe(T.HttpErrorMatchers([{ code: 0 }])) {}

export class InvalidAccountId extends Schema.TaggedError<InvalidAccountId>()(
  "InvalidAccountId",
  { code: Schema.Number, message: Schema.String },
).pipe(T.HttpErrorMatchers([{ code: 7003 }])) {}

export class InvalidRequest extends Schema.TaggedError<InvalidRequest>()(
  "InvalidRequest",
  { code: Schema.Number, message: Schema.String },
).pipe(T.HttpErrorMatchers([{ code: 7003 }])) {}

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
    acceptedUrlCount?: number;
    activeCount?: number;
    externalHostNotified?: boolean;
    inReviewCount?: number;
    pendingCount?: number;
  };
  /** An enum value that represents the status of an abuse record */
  status: "accepted" | "ACCEPTED" | "in_review" | "IN_REVIEW";
  /** The abuse report type */
  type:
    | "PHISH"
    | "phish"
    | "GEN"
    | "gen"
    | "THREAT"
    | "threat"
    | "DMCA"
    | "dmca"
    | "EMER"
    | "emer"
    | "TM"
    | "tm"
    | "REG_WHO"
    | "reg_who"
    | "NCSEI"
    | "ncsei"
    | "NETWORK"
    | "network";
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
    acceptedUrlCount: Schema.optional(Schema.Number).pipe(
      T.JsonName("accepted_url_count"),
    ),
    activeCount: Schema.optional(Schema.Number).pipe(
      T.JsonName("active_count"),
    ),
    externalHostNotified: Schema.optional(Schema.Boolean).pipe(
      T.JsonName("external_host_notified"),
    ),
    inReviewCount: Schema.optional(Schema.Number).pipe(
      T.JsonName("in_review_count"),
    ),
    pendingCount: Schema.optional(Schema.Number).pipe(
      T.JsonName("pending_count"),
    ),
  }).pipe(T.JsonName("mitigation_summary")),
  status: Schema.Literal("accepted", "in_review"),
  type: Schema.Literal(
    "PHISH",
    "GEN",
    "THREAT",
    "DMCA",
    "EMER",
    "TM",
    "REG_WHO",
    "NCSEI",
    "NETWORK",
  ),
  justification: Schema.optional(Schema.String),
  originalWork: Schema.optional(Schema.String).pipe(
    T.JsonName("original_work"),
  ),
  submitter: Schema.optional(
    Schema.Struct({
      company: Schema.optional(Schema.String),
      email: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      telephone: Schema.optional(Schema.String),
    }),
  ),
  urls: Schema.optional(Schema.Array(Schema.String)),
}) as unknown as Schema.Schema<GetAbuseReportResponse>;

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
  CommonErrors | InvalidRequest,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAbuseReportRequest,
  output: CreateAbuseReportResponse,
  errors: [InvalidRequest],
}));
