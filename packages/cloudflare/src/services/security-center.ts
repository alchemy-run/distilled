/**
 * Cloudflare SECURITY-CENTER API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service security-center
 */

import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import { type DefaultErrors } from "../errors.ts";

// =============================================================================
// Insight
// =============================================================================

export interface ListInsightsRequest {}

export const ListInsightsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/{accountOrZone}/{accountOrZoneId}/security-center/insights",
  }),
) as unknown as Schema.Schema<ListInsightsRequest>;

export type ListInsightsResponse = {
  count?: number | null;
  issues?:
    | {
        id?: string | null;
        dismissed?: boolean | null;
        issueClass?: string | null;
        issueType?:
          | "compliance_violation"
          | "email_security"
          | "exposed_infrastructure"
          | "insecure_configuration"
          | "weak_authentication"
          | "configuration_suggestion"
          | null;
        payload?: {
          detectionMethod?: string | null;
          zoneTag?: string | null;
        } | null;
        resolveLink?: string | null;
        resolveText?: string | null;
        severity?: "Low" | "Moderate" | "Critical" | null;
        since?: string | null;
        subject?: string | null;
        timestamp?: string | null;
      }[]
    | null;
  page?: number | null;
  perPage?: number | null;
}[];

export const ListInsightsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    count: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    issues: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
            dismissed: Schema.optional(
              Schema.Union([Schema.Boolean, Schema.Null]),
            ),
            issueClass: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            issueType: Schema.optional(
              Schema.Union([
                Schema.Literals([
                  "compliance_violation",
                  "email_security",
                  "exposed_infrastructure",
                  "insecure_configuration",
                  "weak_authentication",
                  "configuration_suggestion",
                ]),
                Schema.Null,
              ]),
            ),
            payload: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  detectionMethod: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                  zoneTag: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    detectionMethod: "detection_method",
                    zoneTag: "zone_tag",
                  }),
                ),
                Schema.Null,
              ]),
            ),
            resolveLink: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            resolveText: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            severity: Schema.optional(
              Schema.Union([
                Schema.Literals(["Low", "Moderate", "Critical"]),
                Schema.Null,
              ]),
            ),
            since: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
            subject: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            timestamp: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({
              id: "id",
              dismissed: "dismissed",
              issueClass: "issue_class",
              issueType: "issue_type",
              payload: "payload",
              resolveLink: "resolve_link",
              resolveText: "resolve_text",
              severity: "severity",
              since: "since",
              subject: "subject",
              timestamp: "timestamp",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
    page: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    perPage: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  }).pipe(
    Schema.encodeKeys({
      count: "count",
      issues: "issues",
      page: "page",
      perPage: "per_page",
    }),
  ),
) as unknown as Schema.Schema<ListInsightsResponse>;

export type ListInsightsError = DefaultErrors;

export const listInsights: API.OperationMethod<
  ListInsightsRequest,
  ListInsightsResponse,
  ListInsightsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const DismissInsightRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
    documentationUrl?: string | null;
    source?: { pointer?: string | null } | null;
  }[];
  messages: {
    code: number;
    message: string;
    documentationUrl?: string | null;
    source?: { pointer?: string | null } | null;
  }[];
  /** Whether the API call was successful. */
  success: true;
}

export const DismissInsightResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    errors: Schema.Array(
      Schema.Struct({
        code: Schema.Number,
        message: Schema.String,
        documentationUrl: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        source: Schema.optional(
          Schema.Union([
            Schema.Struct({
              pointer: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }),
            Schema.Null,
          ]),
        ),
      }).pipe(
        Schema.encodeKeys({
          code: "code",
          message: "message",
          documentationUrl: "documentation_url",
          source: "source",
        }),
      ),
    ),
    messages: Schema.Array(
      Schema.Struct({
        code: Schema.Number,
        message: Schema.String,
        documentationUrl: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        source: Schema.optional(
          Schema.Union([
            Schema.Struct({
              pointer: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }),
            Schema.Null,
          ]),
        ),
      }).pipe(
        Schema.encodeKeys({
          code: "code",
          message: "message",
          documentationUrl: "documentation_url",
          source: "source",
        }),
      ),
    ),
    success: Schema.Literal(true),
  },
) as unknown as Schema.Schema<DismissInsightResponse>;

export type DismissInsightError = DefaultErrors;

export const dismissInsight: API.OperationMethod<
  DismissInsightRequest,
  DismissInsightResponse,
  DismissInsightError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DismissInsightRequest,
  output: DismissInsightResponse,
  errors: [],
}));

// =============================================================================
// InsightClass
// =============================================================================

export interface GetInsightClassRequest {}

export const GetInsightClassRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/{accountOrZone}/{accountOrZoneId}/security-center/insights/class",
  }),
) as unknown as Schema.Schema<GetInsightClassRequest>;

export type GetInsightClassResponse = {
  count?: number | null;
  value?: string | null;
}[];

export const GetInsightClassResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    count: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }),
) as unknown as Schema.Schema<GetInsightClassResponse>;

export type GetInsightClassError = DefaultErrors;

export const getInsightClass: API.OperationMethod<
  GetInsightClassRequest,
  GetInsightClassResponse,
  GetInsightClassError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetInsightClassRequest,
  output: GetInsightClassResponse,
  errors: [],
}));

// =============================================================================
// InsightSeverity
// =============================================================================

export interface GetInsightSeverityRequest {}

export const GetInsightSeverityRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/{accountOrZone}/{accountOrZoneId}/security-center/insights/severity",
    }),
  ) as unknown as Schema.Schema<GetInsightSeverityRequest>;

export type GetInsightSeverityResponse = {
  count?: number | null;
  value?: string | null;
}[];

export const GetInsightSeverityResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
      count: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }),
  ) as unknown as Schema.Schema<GetInsightSeverityResponse>;

export type GetInsightSeverityError = DefaultErrors;

export const getInsightSeverity: API.OperationMethod<
  GetInsightSeverityRequest,
  GetInsightSeverityResponse,
  GetInsightSeverityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetInsightSeverityRequest,
  output: GetInsightSeverityResponse,
  errors: [],
}));

// =============================================================================
// InsightType
// =============================================================================

export interface GetInsightTypeRequest {}

export const GetInsightTypeRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/{accountOrZone}/{accountOrZoneId}/security-center/insights/type",
  }),
) as unknown as Schema.Schema<GetInsightTypeRequest>;

export type GetInsightTypeResponse = {
  count?: number | null;
  value?: string | null;
}[];

export const GetInsightTypeResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    count: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }),
) as unknown as Schema.Schema<GetInsightTypeResponse>;

export type GetInsightTypeError = DefaultErrors;

export const getInsightType: API.OperationMethod<
  GetInsightTypeRequest,
  GetInsightTypeResponse,
  GetInsightTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetInsightTypeRequest,
  output: GetInsightTypeResponse,
  errors: [],
}));
