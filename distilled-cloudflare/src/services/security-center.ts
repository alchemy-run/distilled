/**
 * Cloudflare SECURITY-CENTER API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service security-center
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
// Insight
// =============================================================================

export interface ListInsightsRequest {}

export const ListInsightsRequest = Schema.Struct({}).pipe(
  T.Http({
    method: "GET",
    path: "/{accountOrZone}/{accountOrZoneId}/security-center/insights",
  }),
) as unknown as Schema.Schema<ListInsightsRequest>;

export type ListInsightsResponse = {
  count?: number;
  issues?: {
    id?: string;
    dismissed?: boolean;
    issueClass?: string;
    issueType?:
      | "compliance_violation"
      | "email_security"
      | "exposed_infrastructure"
      | "insecure_configuration"
      | "weak_authentication"
      | "configuration_suggestion";
    payload?: { detectionMethod?: string; zoneTag?: string };
    resolveLink?: string;
    resolveText?: string;
    severity?: "Low" | "Moderate" | "Critical";
    since?: string;
    subject?: string;
    timestamp?: string;
  }[];
  page?: number;
  perPage?: number;
}[];

export const ListInsightsResponse = Schema.Array(
  Schema.Struct({
    count: Schema.optional(Schema.Number),
    issues: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          dismissed: Schema.optional(Schema.Boolean),
          issueClass: Schema.optional(Schema.String),
          issueType: Schema.optional(
            Schema.Literals([
              "compliance_violation",
              "email_security",
              "exposed_infrastructure",
              "insecure_configuration",
              "weak_authentication",
              "configuration_suggestion",
            ]),
          ),
          payload: Schema.optional(
            Schema.Struct({
              detectionMethod: Schema.optional(Schema.String),
              zoneTag: Schema.optional(Schema.String),
            }).pipe(
              Schema.encodeKeys({
                detectionMethod: "detection_method",
                zoneTag: "zone_tag",
              }),
            ),
          ),
          resolveLink: Schema.optional(Schema.String),
          resolveText: Schema.optional(Schema.String),
          severity: Schema.optional(
            Schema.Literals(["Low", "Moderate", "Critical"]),
          ),
          since: Schema.optional(Schema.String),
          subject: Schema.optional(Schema.String),
          timestamp: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            issueClass: "issue_class",
            issueType: "issue_type",
            resolveLink: "resolve_link",
            resolveText: "resolve_text",
          }),
        ),
      ),
    ),
    page: Schema.optional(Schema.Number),
    perPage: Schema.optional(Schema.Number),
  }).pipe(Schema.encodeKeys({ perPage: "per_page" })),
) as unknown as Schema.Schema<ListInsightsResponse>;

export const listInsights: (
  input: ListInsightsRequest,
) => Effect.Effect<
  ListInsightsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListInsightsRequest,
  output: ListInsightsResponse,
  errors: [],
}));

export interface DismissInsightRequest {
  issueId: string;
  /** Path param: The Account ID to use for this endpoint. Mutually exclusive with the Zone ID. */
  accountId?: string;
  /** Path param: The Zone ID to use for this endpoint. Mutually exclusive with the Account ID. */
  zoneId?: string;
  /** Body param: */
  dismiss?: boolean;
}

export const DismissInsightRequest = Schema.Struct({
  issueId: Schema.String.pipe(T.HttpPath("issueId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  dismiss: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/{accountOrZone}/{accountOrZoneId}/security-center/insights/{issueId}/dismiss",
  }),
) as unknown as Schema.Schema<DismissInsightRequest>;

export interface DismissInsightResponse {
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
}

export const DismissInsightResponse = Schema.Struct({
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
}) as unknown as Schema.Schema<DismissInsightResponse>;

export const dismissInsight: (
  input: DismissInsightRequest,
) => Effect.Effect<
  DismissInsightResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DismissInsightRequest,
  output: DismissInsightResponse,
  errors: [],
}));

// =============================================================================
// InsightClass
// =============================================================================

export interface GetInsightClassRequest {}

export const GetInsightClassRequest = Schema.Struct({}).pipe(
  T.Http({
    method: "GET",
    path: "/{accountOrZone}/{accountOrZoneId}/security-center/insights/class",
  }),
) as unknown as Schema.Schema<GetInsightClassRequest>;

export type GetInsightClassResponse = { count?: number; value?: string }[];

export const GetInsightClassResponse = Schema.Array(
  Schema.Struct({
    count: Schema.optional(Schema.Number),
    value: Schema.optional(Schema.String),
  }),
) as unknown as Schema.Schema<GetInsightClassResponse>;

export const getInsightClass: (
  input: GetInsightClassRequest,
) => Effect.Effect<
  GetInsightClassResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetInsightClassRequest,
  output: GetInsightClassResponse,
  errors: [],
}));

// =============================================================================
// InsightSeverity
// =============================================================================

export interface GetInsightSeverityRequest {}

export const GetInsightSeverityRequest = Schema.Struct({}).pipe(
  T.Http({
    method: "GET",
    path: "/{accountOrZone}/{accountOrZoneId}/security-center/insights/severity",
  }),
) as unknown as Schema.Schema<GetInsightSeverityRequest>;

export type GetInsightSeverityResponse = { count?: number; value?: string }[];

export const GetInsightSeverityResponse = Schema.Array(
  Schema.Struct({
    count: Schema.optional(Schema.Number),
    value: Schema.optional(Schema.String),
  }),
) as unknown as Schema.Schema<GetInsightSeverityResponse>;

export const getInsightSeverity: (
  input: GetInsightSeverityRequest,
) => Effect.Effect<
  GetInsightSeverityResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetInsightSeverityRequest,
  output: GetInsightSeverityResponse,
  errors: [],
}));

// =============================================================================
// InsightType
// =============================================================================

export interface GetInsightTypeRequest {}

export const GetInsightTypeRequest = Schema.Struct({}).pipe(
  T.Http({
    method: "GET",
    path: "/{accountOrZone}/{accountOrZoneId}/security-center/insights/type",
  }),
) as unknown as Schema.Schema<GetInsightTypeRequest>;

export type GetInsightTypeResponse = { count?: number; value?: string }[];

export const GetInsightTypeResponse = Schema.Array(
  Schema.Struct({
    count: Schema.optional(Schema.Number),
    value: Schema.optional(Schema.String),
  }),
) as unknown as Schema.Schema<GetInsightTypeResponse>;

export const getInsightType: (
  input: GetInsightTypeRequest,
) => Effect.Effect<
  GetInsightTypeResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetInsightTypeRequest,
  output: GetInsightTypeResponse,
  errors: [],
}));
