/**
 * Cloudflare INTEL API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service intel
 */

import * as stream from "effect/Stream";
import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import { type DefaultErrors } from "../errors.ts";

// =============================================================================
// Asn
// =============================================================================

export interface GetAsnRequest {
  /** Identifier. */
  accountId: string;
}

export const GetAsnRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/intel/asn/{asn}" }),
) as unknown as Schema.Schema<GetAsnRequest>;

export type GetAsnResponse = unknown;

export const GetAsnResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<GetAsnResponse>;

export type GetAsnError = DefaultErrors;

export const getAsn: API.OperationMethod<
  GetAsnRequest,
  GetAsnResponse,
  GetAsnError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAsnRequest,
  output: GetAsnResponse,
  errors: [],
}));

// =============================================================================
// AsnSubnet
// =============================================================================

export interface GetAsnSubnetRequest {
  /** Identifier. */
  accountId: string;
}

export const GetAsnSubnetRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/intel/asn/{asn}/subnets",
  }),
) as unknown as Schema.Schema<GetAsnSubnetRequest>;

export interface GetAsnSubnetResponse {
  asn?: number | null;
  /** Total results returned based on your search parameters. */
  count?: number | null;
  ipCountTotal?: number | null;
  /** Current page within paginated list of results. */
  page?: number | null;
  /** Number of results per page of results. */
  perPage?: number | null;
  subnets?: string[] | null;
}

export const GetAsnSubnetResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  asn: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  count: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  ipCountTotal: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  page: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  perPage: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  subnets: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
}).pipe(
  Schema.encodeKeys({
    asn: "asn",
    count: "count",
    ipCountTotal: "ip_count_total",
    page: "page",
    perPage: "per_page",
    subnets: "subnets",
  }),
) as unknown as Schema.Schema<GetAsnSubnetResponse>;

export type GetAsnSubnetError = DefaultErrors;

export const getAsnSubnet: API.OperationMethod<
  GetAsnSubnetRequest,
  GetAsnSubnetResponse,
  GetAsnSubnetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAsnSubnetRequest,
  output: GetAsnSubnetResponse,
  errors: [],
}));

// =============================================================================
// AttackSurfaceReportIssue
// =============================================================================

export interface ListAttackSurfaceReportIssuesRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Query param: */
  dismissed?: boolean;
  /** Query param: */
  issueClass?: string[];
  /** Query param: */
  issueClassNeq?: string[];
  /** Query param: */
  issueType?: (
    | "compliance_violation"
    | "email_security"
    | "exposed_infrastructure"
    | "insecure_configuration"
    | "weak_authentication"
    | "configuration_suggestion"
  )[];
  /** Query param: */
  issueTypeNeq?: (
    | "compliance_violation"
    | "email_security"
    | "exposed_infrastructure"
    | "insecure_configuration"
    | "weak_authentication"
    | "configuration_suggestion"
  )[];
  /** Query param: */
  product?: string[];
  /** Query param: */
  productNeq?: string[];
  /** Query param: */
  severity?: ("low" | "moderate" | "critical")[];
  /** Query param: */
  severityNeq?: ("low" | "moderate" | "critical")[];
  /** Query param: */
  subject?: string[];
  /** Query param: */
  subjectNeq?: string[];
}

export const ListAttackSurfaceReportIssuesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    dismissed: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("dismissed")),
    issueClass: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("issue_class"),
    ),
    issueClassNeq: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("issue_class~neq"),
    ),
    issueType: Schema.optional(
      Schema.Array(
        Schema.Literals([
          "compliance_violation",
          "email_security",
          "exposed_infrastructure",
          "insecure_configuration",
          "weak_authentication",
          "configuration_suggestion",
        ]),
      ),
    ).pipe(T.HttpQuery("issue_type")),
    issueTypeNeq: Schema.optional(
      Schema.Array(
        Schema.Literals([
          "compliance_violation",
          "email_security",
          "exposed_infrastructure",
          "insecure_configuration",
          "weak_authentication",
          "configuration_suggestion",
        ]),
      ),
    ).pipe(T.HttpQuery("issue_type~neq")),
    product: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("product"),
    ),
    productNeq: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("product~neq"),
    ),
    severity: Schema.optional(
      Schema.Array(Schema.Literals(["low", "moderate", "critical"])),
    ).pipe(T.HttpQuery("severity")),
    severityNeq: Schema.optional(
      Schema.Array(Schema.Literals(["low", "moderate", "critical"])),
    ).pipe(T.HttpQuery("severity~neq")),
    subject: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("subject"),
    ),
    subjectNeq: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("subject~neq"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/intel/attack-surface-report/issues",
    }),
  ) as unknown as Schema.Schema<ListAttackSurfaceReportIssuesRequest>;

export interface ListAttackSurfaceReportIssuesResponse {
  result: {
    items?:
      | {
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
        }[]
      | null;
  };
  resultInfo: {
    count?: number | null;
    page?: number | null;
    perPage?: number | null;
    totalCount?: number | null;
  };
}

export const ListAttackSurfaceReportIssuesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.Struct({
      items: Schema.optional(
        Schema.Union([
          Schema.Array(
            Schema.Struct({
              count: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              issues: Schema.optional(
                Schema.Union([
                  Schema.Array(
                    Schema.Struct({
                      id: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
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
                      since: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
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
              perPage: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                count: "count",
                issues: "issues",
                page: "page",
                perPage: "per_page",
              }),
            ),
          ),
          Schema.Null,
        ]),
      ),
    }),
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
  ) as unknown as Schema.Schema<ListAttackSurfaceReportIssuesResponse>;

export type ListAttackSurfaceReportIssuesError = DefaultErrors;

export const listAttackSurfaceReportIssues: API.PaginatedOperationMethod<
  ListAttackSurfaceReportIssuesRequest,
  ListAttackSurfaceReportIssuesResponse,
  ListAttackSurfaceReportIssuesError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListAttackSurfaceReportIssuesRequest,
  ) => stream.Stream<
    ListAttackSurfaceReportIssuesResponse,
    ListAttackSurfaceReportIssuesError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: ListAttackSurfaceReportIssuesRequest) => stream.Stream<
    {
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
    },
    ListAttackSurfaceReportIssuesError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAttackSurfaceReportIssuesRequest,
  output: ListAttackSurfaceReportIssuesResponse,
  errors: [],
  pagination: {
    mode: "page",
    inputToken: "page",
    outputToken: "resultInfo.page",
    items: "result.items",
    pageSize: "perPage",
  } as const,
}));

export interface ClassAttackSurfaceReportIssueRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Query param: */
  dismissed?: boolean;
  /** Query param: */
  issueClass?: string[];
  /** Query param: */
  issueClassNeq?: string[];
  /** Query param: */
  issueType?: (
    | "compliance_violation"
    | "email_security"
    | "exposed_infrastructure"
    | "insecure_configuration"
    | "weak_authentication"
    | "configuration_suggestion"
  )[];
  /** Query param: */
  issueTypeNeq?: (
    | "compliance_violation"
    | "email_security"
    | "exposed_infrastructure"
    | "insecure_configuration"
    | "weak_authentication"
    | "configuration_suggestion"
  )[];
  /** Query param: */
  product?: string[];
  /** Query param: */
  productNeq?: string[];
  /** Query param: */
  severity?: ("low" | "moderate" | "critical")[];
  /** Query param: */
  severityNeq?: ("low" | "moderate" | "critical")[];
  /** Query param: */
  subject?: string[];
  /** Query param: */
  subjectNeq?: string[];
}

export const ClassAttackSurfaceReportIssueRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    dismissed: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("dismissed")),
    issueClass: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("issue_class"),
    ),
    issueClassNeq: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("issue_class~neq"),
    ),
    issueType: Schema.optional(
      Schema.Array(
        Schema.Literals([
          "compliance_violation",
          "email_security",
          "exposed_infrastructure",
          "insecure_configuration",
          "weak_authentication",
          "configuration_suggestion",
        ]),
      ),
    ).pipe(T.HttpQuery("issue_type")),
    issueTypeNeq: Schema.optional(
      Schema.Array(
        Schema.Literals([
          "compliance_violation",
          "email_security",
          "exposed_infrastructure",
          "insecure_configuration",
          "weak_authentication",
          "configuration_suggestion",
        ]),
      ),
    ).pipe(T.HttpQuery("issue_type~neq")),
    product: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("product"),
    ),
    productNeq: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("product~neq"),
    ),
    severity: Schema.optional(
      Schema.Array(Schema.Literals(["low", "moderate", "critical"])),
    ).pipe(T.HttpQuery("severity")),
    severityNeq: Schema.optional(
      Schema.Array(Schema.Literals(["low", "moderate", "critical"])),
    ).pipe(T.HttpQuery("severity~neq")),
    subject: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("subject"),
    ),
    subjectNeq: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("subject~neq"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/intel/attack-surface-report/issues/class",
    }),
  ) as unknown as Schema.Schema<ClassAttackSurfaceReportIssueRequest>;

export type ClassAttackSurfaceReportIssueResponse = {
  count?: number | null;
  value?: string | null;
}[];

export const ClassAttackSurfaceReportIssueResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
      count: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }),
  ).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<ClassAttackSurfaceReportIssueResponse>;

export type ClassAttackSurfaceReportIssueError = DefaultErrors;

export const classAttackSurfaceReportIssue: API.OperationMethod<
  ClassAttackSurfaceReportIssueRequest,
  ClassAttackSurfaceReportIssueResponse,
  ClassAttackSurfaceReportIssueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ClassAttackSurfaceReportIssueRequest,
  output: ClassAttackSurfaceReportIssueResponse,
  errors: [],
}));

export interface DismissAttackSurfaceReportIssueRequest {
  issueId: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: */
  dismiss?: boolean;
}

export const DismissAttackSurfaceReportIssueRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    issueId: Schema.String.pipe(T.HttpPath("issueId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    dismiss: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/accounts/{account_id}/intel/attack-surface-report/{issueId}/dismiss",
    }),
  ) as unknown as Schema.Schema<DismissAttackSurfaceReportIssueRequest>;

export interface DismissAttackSurfaceReportIssueResponse {
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

export const DismissAttackSurfaceReportIssueResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  }) as unknown as Schema.Schema<DismissAttackSurfaceReportIssueResponse>;

export type DismissAttackSurfaceReportIssueError = DefaultErrors;

export const dismissAttackSurfaceReportIssue: API.OperationMethod<
  DismissAttackSurfaceReportIssueRequest,
  DismissAttackSurfaceReportIssueResponse,
  DismissAttackSurfaceReportIssueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DismissAttackSurfaceReportIssueRequest,
  output: DismissAttackSurfaceReportIssueResponse,
  errors: [],
}));

export interface SeverityAttackSurfaceReportIssueRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Query param: */
  dismissed?: boolean;
  /** Query param: */
  issueClass?: string[];
  /** Query param: */
  issueClassNeq?: string[];
  /** Query param: */
  issueType?: (
    | "compliance_violation"
    | "email_security"
    | "exposed_infrastructure"
    | "insecure_configuration"
    | "weak_authentication"
    | "configuration_suggestion"
  )[];
  /** Query param: */
  issueTypeNeq?: (
    | "compliance_violation"
    | "email_security"
    | "exposed_infrastructure"
    | "insecure_configuration"
    | "weak_authentication"
    | "configuration_suggestion"
  )[];
  /** Query param: */
  product?: string[];
  /** Query param: */
  productNeq?: string[];
  /** Query param: */
  severity?: ("low" | "moderate" | "critical")[];
  /** Query param: */
  severityNeq?: ("low" | "moderate" | "critical")[];
  /** Query param: */
  subject?: string[];
  /** Query param: */
  subjectNeq?: string[];
}

export const SeverityAttackSurfaceReportIssueRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    dismissed: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("dismissed")),
    issueClass: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("issue_class"),
    ),
    issueClassNeq: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("issue_class~neq"),
    ),
    issueType: Schema.optional(
      Schema.Array(
        Schema.Literals([
          "compliance_violation",
          "email_security",
          "exposed_infrastructure",
          "insecure_configuration",
          "weak_authentication",
          "configuration_suggestion",
        ]),
      ),
    ).pipe(T.HttpQuery("issue_type")),
    issueTypeNeq: Schema.optional(
      Schema.Array(
        Schema.Literals([
          "compliance_violation",
          "email_security",
          "exposed_infrastructure",
          "insecure_configuration",
          "weak_authentication",
          "configuration_suggestion",
        ]),
      ),
    ).pipe(T.HttpQuery("issue_type~neq")),
    product: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("product"),
    ),
    productNeq: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("product~neq"),
    ),
    severity: Schema.optional(
      Schema.Array(Schema.Literals(["low", "moderate", "critical"])),
    ).pipe(T.HttpQuery("severity")),
    severityNeq: Schema.optional(
      Schema.Array(Schema.Literals(["low", "moderate", "critical"])),
    ).pipe(T.HttpQuery("severity~neq")),
    subject: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("subject"),
    ),
    subjectNeq: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("subject~neq"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/intel/attack-surface-report/issues/severity",
    }),
  ) as unknown as Schema.Schema<SeverityAttackSurfaceReportIssueRequest>;

export type SeverityAttackSurfaceReportIssueResponse = {
  count?: number | null;
  value?: string | null;
}[];

export const SeverityAttackSurfaceReportIssueResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
      count: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }),
  ).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<SeverityAttackSurfaceReportIssueResponse>;

export type SeverityAttackSurfaceReportIssueError = DefaultErrors;

export const severityAttackSurfaceReportIssue: API.OperationMethod<
  SeverityAttackSurfaceReportIssueRequest,
  SeverityAttackSurfaceReportIssueResponse,
  SeverityAttackSurfaceReportIssueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SeverityAttackSurfaceReportIssueRequest,
  output: SeverityAttackSurfaceReportIssueResponse,
  errors: [],
}));

export interface TypeAttackSurfaceReportIssueRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Query param: */
  dismissed?: boolean;
  /** Query param: */
  issueClass?: string[];
  /** Query param: */
  issueClassNeq?: string[];
  /** Query param: */
  issueType?: (
    | "compliance_violation"
    | "email_security"
    | "exposed_infrastructure"
    | "insecure_configuration"
    | "weak_authentication"
    | "configuration_suggestion"
  )[];
  /** Query param: */
  issueTypeNeq?: (
    | "compliance_violation"
    | "email_security"
    | "exposed_infrastructure"
    | "insecure_configuration"
    | "weak_authentication"
    | "configuration_suggestion"
  )[];
  /** Query param: */
  product?: string[];
  /** Query param: */
  productNeq?: string[];
  /** Query param: */
  severity?: ("low" | "moderate" | "critical")[];
  /** Query param: */
  severityNeq?: ("low" | "moderate" | "critical")[];
  /** Query param: */
  subject?: string[];
  /** Query param: */
  subjectNeq?: string[];
}

export const TypeAttackSurfaceReportIssueRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    dismissed: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("dismissed")),
    issueClass: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("issue_class"),
    ),
    issueClassNeq: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("issue_class~neq"),
    ),
    issueType: Schema.optional(
      Schema.Array(
        Schema.Literals([
          "compliance_violation",
          "email_security",
          "exposed_infrastructure",
          "insecure_configuration",
          "weak_authentication",
          "configuration_suggestion",
        ]),
      ),
    ).pipe(T.HttpQuery("issue_type")),
    issueTypeNeq: Schema.optional(
      Schema.Array(
        Schema.Literals([
          "compliance_violation",
          "email_security",
          "exposed_infrastructure",
          "insecure_configuration",
          "weak_authentication",
          "configuration_suggestion",
        ]),
      ),
    ).pipe(T.HttpQuery("issue_type~neq")),
    product: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("product"),
    ),
    productNeq: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("product~neq"),
    ),
    severity: Schema.optional(
      Schema.Array(Schema.Literals(["low", "moderate", "critical"])),
    ).pipe(T.HttpQuery("severity")),
    severityNeq: Schema.optional(
      Schema.Array(Schema.Literals(["low", "moderate", "critical"])),
    ).pipe(T.HttpQuery("severity~neq")),
    subject: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("subject"),
    ),
    subjectNeq: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("subject~neq"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/intel/attack-surface-report/issues/type",
    }),
  ) as unknown as Schema.Schema<TypeAttackSurfaceReportIssueRequest>;

export type TypeAttackSurfaceReportIssueResponse = {
  count?: number | null;
  value?: string | null;
}[];

export const TypeAttackSurfaceReportIssueResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
      count: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }),
  ).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<TypeAttackSurfaceReportIssueResponse>;

export type TypeAttackSurfaceReportIssueError = DefaultErrors;

export const typeAttackSurfaceReportIssue: API.OperationMethod<
  TypeAttackSurfaceReportIssueRequest,
  TypeAttackSurfaceReportIssueResponse,
  TypeAttackSurfaceReportIssueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TypeAttackSurfaceReportIssueRequest,
  output: TypeAttackSurfaceReportIssueResponse,
  errors: [],
}));

// =============================================================================
// AttackSurfaceReportIssueType
// =============================================================================

export interface GetAttackSurfaceReportIssueTypeRequest {
  /** Identifier. */
  accountId: string;
}

export const GetAttackSurfaceReportIssueTypeRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/intel/attack-surface-report/issue-types",
    }),
  ) as unknown as Schema.Schema<GetAttackSurfaceReportIssueTypeRequest>;

export interface GetAttackSurfaceReportIssueTypeResponse {
  result: string[];
}

export const GetAttackSurfaceReportIssueTypeResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.Array(Schema.String),
  }) as unknown as Schema.Schema<GetAttackSurfaceReportIssueTypeResponse>;

export type GetAttackSurfaceReportIssueTypeError = DefaultErrors;

export const getAttackSurfaceReportIssueType: API.PaginatedOperationMethod<
  GetAttackSurfaceReportIssueTypeRequest,
  GetAttackSurfaceReportIssueTypeResponse,
  GetAttackSurfaceReportIssueTypeError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: GetAttackSurfaceReportIssueTypeRequest,
  ) => stream.Stream<
    GetAttackSurfaceReportIssueTypeResponse,
    GetAttackSurfaceReportIssueTypeError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: GetAttackSurfaceReportIssueTypeRequest,
  ) => stream.Stream<
    string,
    GetAttackSurfaceReportIssueTypeError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: GetAttackSurfaceReportIssueTypeRequest,
  output: GetAttackSurfaceReportIssueTypeResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

// =============================================================================
// Dns
// =============================================================================

export interface ListDnsRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Query param: */
  ipv4?: string;
  /** Query param: */
  startEndParams?: { end?: string; start?: string };
}

export const ListDnsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  ipv4: Schema.optional(Schema.String).pipe(T.HttpQuery("ipv4")),
  startEndParams: Schema.optional(
    Schema.Struct({
      end: Schema.optional(Schema.String),
      start: Schema.optional(Schema.String),
    }),
  ).pipe(T.HttpQuery("start_end_params")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/intel/dns" }),
) as unknown as Schema.Schema<ListDnsRequest>;

export interface ListDnsResponse {
  result: {
    items?:
      | {
          count?: number | null;
          page?: number | null;
          perPage?: number | null;
          reverseRecords?:
            | {
                firstSeen?: string | null;
                hostname?: string | null;
                lastSeen?: string | null;
              }[]
            | null;
        }[]
      | null;
  };
  resultInfo: {
    count?: number | null;
    page?: number | null;
    perPage?: number | null;
    totalCount?: number | null;
  };
}

export const ListDnsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Struct({
    items: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            count: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
            page: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
            perPage: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            reverseRecords: Schema.optional(
              Schema.Union([
                Schema.Array(
                  Schema.Struct({
                    firstSeen: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    hostname: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    lastSeen: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                  }).pipe(
                    Schema.encodeKeys({
                      firstSeen: "first_seen",
                      hostname: "hostname",
                      lastSeen: "last_seen",
                    }),
                  ),
                ),
                Schema.Null,
              ]),
            ),
          }).pipe(
            Schema.encodeKeys({
              count: "count",
              page: "page",
              perPage: "per_page",
              reverseRecords: "reverse_records",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
  }),
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
) as unknown as Schema.Schema<ListDnsResponse>;

export type ListDnsError = DefaultErrors;

export const listDns: API.PaginatedOperationMethod<
  ListDnsRequest,
  ListDnsResponse,
  ListDnsError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListDnsRequest,
  ) => stream.Stream<
    ListDnsResponse,
    ListDnsError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: ListDnsRequest) => stream.Stream<
    {
      count?: number | null;
      page?: number | null;
      perPage?: number | null;
      reverseRecords?:
        | {
            firstSeen?: string | null;
            hostname?: string | null;
            lastSeen?: string | null;
          }[]
        | null;
    },
    ListDnsError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListDnsRequest,
  output: ListDnsResponse,
  errors: [],
  pagination: {
    mode: "page",
    inputToken: "page",
    outputToken: "resultInfo.page",
    items: "result.items",
    pageSize: "perPage",
  } as const,
}));

// =============================================================================
// Domain
// =============================================================================

export interface GetDomainRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Query param: */
  domain?: string;
}

export const GetDomainRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  domain: Schema.optional(Schema.String).pipe(T.HttpQuery("domain")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/intel/domain" }),
) as unknown as Schema.Schema<GetDomainRequest>;

export interface GetDomainResponse {
  /** Additional information related to the host name. */
  additionalInformation?: { suspectedMalwareFamily?: string | null } | null;
  /** Application that the hostname belongs to. */
  application?: { id?: number | null; name?: string | null } | null;
  contentCategories?:
    | {
        id?: number | null;
        name?: string | null;
        superCategoryId?: number | null;
      }[]
    | null;
  domain?: string | null;
  inheritedContentCategories?:
    | {
        id?: number | null;
        name?: string | null;
        superCategoryId?: number | null;
      }[]
    | null;
  /** Domain from which `inherited_content_categories` and `inherited_risk_types` are inherited, if applicable. */
  inheritedFrom?: string | null;
  inheritedRiskTypes?:
    | {
        id?: number | null;
        name?: string | null;
        superCategoryId?: number | null;
      }[]
    | null;
  /** Global Cloudflare 100k ranking for the last 30 days, if available for the hostname. The top ranked domain is 1, the lowest ranked domain is 100,000. */
  popularityRank?: number | null;
  /** Specifies a list of references to one or more IP addresses or domain names that the domain name currently resolves to. */
  resolvesToRefs?: { id?: string | null; value?: string | null }[] | null;
  /** Hostname risk score, which is a value between 0 (lowest risk) to 1 (highest risk). */
  riskScore?: number | null;
  riskTypes?:
    | {
        id?: number | null;
        name?: string | null;
        superCategoryId?: number | null;
      }[]
    | null;
}

export const GetDomainResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  additionalInformation: Schema.optional(
    Schema.Union([
      Schema.Struct({
        suspectedMalwareFamily: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          suspectedMalwareFamily: "suspected_malware_family",
        }),
      ),
      Schema.Null,
    ]),
  ),
  application: Schema.optional(
    Schema.Union([
      Schema.Struct({
        id: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
      Schema.Null,
    ]),
  ),
  contentCategories: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
          name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          superCategoryId: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            name: "name",
            superCategoryId: "super_category_id",
          }),
        ),
      ),
      Schema.Null,
    ]),
  ),
  domain: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  inheritedContentCategories: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
          name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          superCategoryId: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            name: "name",
            superCategoryId: "super_category_id",
          }),
        ),
      ),
      Schema.Null,
    ]),
  ),
  inheritedFrom: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  inheritedRiskTypes: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
          name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          superCategoryId: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            name: "name",
            superCategoryId: "super_category_id",
          }),
        ),
      ),
      Schema.Null,
    ]),
  ),
  popularityRank: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  resolvesToRefs: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        }),
      ),
      Schema.Null,
    ]),
  ),
  riskScore: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  riskTypes: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
          name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          superCategoryId: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            name: "name",
            superCategoryId: "super_category_id",
          }),
        ),
      ),
      Schema.Null,
    ]),
  ),
})
  .pipe(
    Schema.encodeKeys({
      additionalInformation: "additional_information",
      application: "application",
      contentCategories: "content_categories",
      domain: "domain",
      inheritedContentCategories: "inherited_content_categories",
      inheritedFrom: "inherited_from",
      inheritedRiskTypes: "inherited_risk_types",
      popularityRank: "popularity_rank",
      resolvesToRefs: "resolves_to_refs",
      riskScore: "risk_score",
      riskTypes: "risk_types",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetDomainResponse>;

export type GetDomainError = DefaultErrors;

export const getDomain: API.OperationMethod<
  GetDomainRequest,
  GetDomainResponse,
  GetDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetDomainRequest,
  output: GetDomainResponse,
  errors: [],
}));

// =============================================================================
// DomainBulk
// =============================================================================

export interface GetDomainBulkRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Query param: Accepts multiple values like `?domain=cloudflare.com&domain=example.com`. */
  domain?: string[];
}

export const GetDomainBulkRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  domain: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("domain"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/intel/domain/bulk" }),
) as unknown as Schema.Schema<GetDomainBulkRequest>;

export type GetDomainBulkResponse = {
  additionalInformation?: { suspectedMalwareFamily?: string | null } | null;
  application?: { id?: number | null; name?: string | null } | null;
  contentCategories?:
    | {
        id?: number | null;
        name?: string | null;
        superCategoryId?: number | null;
      }[]
    | null;
  domain?: string | null;
  inheritedContentCategories?:
    | {
        id?: number | null;
        name?: string | null;
        superCategoryId?: number | null;
      }[]
    | null;
  inheritedFrom?: string | null;
  inheritedRiskTypes?:
    | {
        id?: number | null;
        name?: string | null;
        superCategoryId?: number | null;
      }[]
    | null;
  popularityRank?: number | null;
  riskScore?: number | null;
  riskTypes?:
    | {
        id?: number | null;
        name?: string | null;
        superCategoryId?: number | null;
      }[]
    | null;
}[];

export const GetDomainBulkResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    additionalInformation: Schema.optional(
      Schema.Union([
        Schema.Struct({
          suspectedMalwareFamily: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
        }).pipe(
          Schema.encodeKeys({
            suspectedMalwareFamily: "suspected_malware_family",
          }),
        ),
        Schema.Null,
      ]),
    ),
    application: Schema.optional(
      Schema.Union([
        Schema.Struct({
          id: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
          name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        }),
        Schema.Null,
      ]),
    ),
    contentCategories: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            id: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
            name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
            superCategoryId: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({
              id: "id",
              name: "name",
              superCategoryId: "super_category_id",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
    domain: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    inheritedContentCategories: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            id: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
            name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
            superCategoryId: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({
              id: "id",
              name: "name",
              superCategoryId: "super_category_id",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
    inheritedFrom: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    inheritedRiskTypes: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            id: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
            name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
            superCategoryId: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({
              id: "id",
              name: "name",
              superCategoryId: "super_category_id",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
    popularityRank: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    riskScore: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    riskTypes: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            id: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
            name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
            superCategoryId: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({
              id: "id",
              name: "name",
              superCategoryId: "super_category_id",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
  }).pipe(
    Schema.encodeKeys({
      additionalInformation: "additional_information",
      application: "application",
      contentCategories: "content_categories",
      domain: "domain",
      inheritedContentCategories: "inherited_content_categories",
      inheritedFrom: "inherited_from",
      inheritedRiskTypes: "inherited_risk_types",
      popularityRank: "popularity_rank",
      riskScore: "risk_score",
      riskTypes: "risk_types",
    }),
  ),
).pipe(
  T.ResponsePath("result"),
) as unknown as Schema.Schema<GetDomainBulkResponse>;

export type GetDomainBulkError = DefaultErrors;

export const getDomainBulk: API.OperationMethod<
  GetDomainBulkRequest,
  GetDomainBulkResponse,
  GetDomainBulkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetDomainBulkRequest,
  output: GetDomainBulkResponse,
  errors: [],
}));

// =============================================================================
// DomainHistory
// =============================================================================

export interface GetDomainHistoryRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Query param: */
  domain?: string;
}

export const GetDomainHistoryRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    domain: Schema.optional(Schema.String).pipe(T.HttpQuery("domain")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/intel/domain-history",
    }),
  ) as unknown as Schema.Schema<GetDomainHistoryRequest>;

export type GetDomainHistoryResponse = {
  categorizations?:
    | {
        categories?: { id?: number | null; name?: string | null }[] | null;
        end?: string | null;
        start?: string | null;
      }[]
    | null;
  domain?: string | null;
}[];

export const GetDomainHistoryResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
      categorizations: Schema.optional(
        Schema.Union([
          Schema.Array(
            Schema.Struct({
              categories: Schema.optional(
                Schema.Union([
                  Schema.Array(
                    Schema.Struct({
                      id: Schema.optional(
                        Schema.Union([Schema.Number, Schema.Null]),
                      ),
                      name: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
              end: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
              start: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }),
          ),
          Schema.Null,
        ]),
      ),
      domain: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }),
  ).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetDomainHistoryResponse>;

export type GetDomainHistoryError = DefaultErrors;

export const getDomainHistory: API.OperationMethod<
  GetDomainHistoryRequest,
  GetDomainHistoryResponse,
  GetDomainHistoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetDomainHistoryRequest,
  output: GetDomainHistoryResponse,
  errors: [],
}));

// =============================================================================
// IndicatorFeed
// =============================================================================

export interface GetIndicatorFeedRequest {
  feedId: number;
  /** Identifier */
  accountId: string;
}

export const GetIndicatorFeedRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    feedId: Schema.Number.pipe(T.HttpPath("feedId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/intel/indicator-feeds/{feedId}",
    }),
  ) as unknown as Schema.Schema<GetIndicatorFeedRequest>;

export interface GetIndicatorFeedResponse {
  /** The unique identifier for the indicator feed */
  id?: number | null;
  /** The date and time when the data entry was created */
  createdOn?: string | null;
  /** The description of the example test */
  description?: string | null;
  /** Whether the indicator feed can be attributed to a provider */
  isAttributable?: boolean | null;
  /** Whether the indicator feed can be downloaded */
  isDownloadable?: boolean | null;
  /** Whether the indicator feed is exposed to customers */
  isPublic?: boolean | null;
  /** Status of the latest snapshot uploaded */
  latestUploadStatus?:
    | "Mirroring"
    | "Unifying"
    | "Loading"
    | "Provisioning"
    | "Complete"
    | "Error"
    | null;
  /** The date and time when the data entry was last modified */
  modifiedOn?: string | null;
  /** The name of the indicator feed */
  name?: string | null;
  /** The unique identifier for the provider */
  providerId?: string | null;
  /** The provider of the indicator feed */
  providerName?: string | null;
}

export const GetIndicatorFeedResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    isAttributable: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    isDownloadable: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    isPublic: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    latestUploadStatus: Schema.optional(
      Schema.Union([
        Schema.Literals([
          "Mirroring",
          "Unifying",
          "Loading",
          "Provisioning",
          "Complete",
          "Error",
        ]),
        Schema.Null,
      ]),
    ),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    providerId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    providerName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        createdOn: "created_on",
        description: "description",
        isAttributable: "is_attributable",
        isDownloadable: "is_downloadable",
        isPublic: "is_public",
        latestUploadStatus: "latest_upload_status",
        modifiedOn: "modified_on",
        name: "name",
        providerId: "provider_id",
        providerName: "provider_name",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<GetIndicatorFeedResponse>;

export type GetIndicatorFeedError = DefaultErrors;

export const getIndicatorFeed: API.OperationMethod<
  GetIndicatorFeedRequest,
  GetIndicatorFeedResponse,
  GetIndicatorFeedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetIndicatorFeedRequest,
  output: GetIndicatorFeedResponse,
  errors: [],
}));

export interface ListIndicatorFeedsRequest {
  /** Identifier */
  accountId: string;
}

export const ListIndicatorFeedsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/intel/indicator-feeds",
    }),
  ) as unknown as Schema.Schema<ListIndicatorFeedsRequest>;

export interface ListIndicatorFeedsResponse {
  result: {
    id?: number | null;
    createdOn?: string | null;
    description?: string | null;
    isAttributable?: boolean | null;
    isDownloadable?: boolean | null;
    isPublic?: boolean | null;
    modifiedOn?: string | null;
    name?: string | null;
  }[];
}

export const ListIndicatorFeedsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        isAttributable: Schema.optional(
          Schema.Union([Schema.Boolean, Schema.Null]),
        ),
        isDownloadable: Schema.optional(
          Schema.Union([Schema.Boolean, Schema.Null]),
        ),
        isPublic: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          createdOn: "created_on",
          description: "description",
          isAttributable: "is_attributable",
          isDownloadable: "is_downloadable",
          isPublic: "is_public",
          modifiedOn: "modified_on",
          name: "name",
        }),
      ),
    ),
  }) as unknown as Schema.Schema<ListIndicatorFeedsResponse>;

export type ListIndicatorFeedsError = DefaultErrors;

export const listIndicatorFeeds: API.PaginatedOperationMethod<
  ListIndicatorFeedsRequest,
  ListIndicatorFeedsResponse,
  ListIndicatorFeedsError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListIndicatorFeedsRequest,
  ) => stream.Stream<
    ListIndicatorFeedsResponse,
    ListIndicatorFeedsError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: ListIndicatorFeedsRequest) => stream.Stream<
    {
      id?: number | null;
      createdOn?: string | null;
      description?: string | null;
      isAttributable?: boolean | null;
      isDownloadable?: boolean | null;
      isPublic?: boolean | null;
      modifiedOn?: string | null;
      name?: string | null;
    },
    ListIndicatorFeedsError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListIndicatorFeedsRequest,
  output: ListIndicatorFeedsResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

export interface CreateIndicatorFeedRequest {
  /** Path param: Identifier */
  accountId: string;
  /** Body param: The description of the example test */
  description?: string;
  /** Body param: The name of the indicator feed */
  name?: string;
}

export const CreateIndicatorFeedRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    description: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/intel/indicator-feeds",
    }),
  ) as unknown as Schema.Schema<CreateIndicatorFeedRequest>;

export interface CreateIndicatorFeedResponse {
  /** The unique identifier for the indicator feed */
  id?: number | null;
  /** The date and time when the data entry was created */
  createdOn?: string | null;
  /** The description of the example test */
  description?: string | null;
  /** Whether the indicator feed can be attributed to a provider */
  isAttributable?: boolean | null;
  /** Whether the indicator feed can be downloaded */
  isDownloadable?: boolean | null;
  /** Whether the indicator feed is exposed to customers */
  isPublic?: boolean | null;
  /** The date and time when the data entry was last modified */
  modifiedOn?: string | null;
  /** The name of the indicator feed */
  name?: string | null;
}

export const CreateIndicatorFeedResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    isAttributable: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    isDownloadable: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    isPublic: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        createdOn: "created_on",
        description: "description",
        isAttributable: "is_attributable",
        isDownloadable: "is_downloadable",
        isPublic: "is_public",
        modifiedOn: "modified_on",
        name: "name",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<CreateIndicatorFeedResponse>;

export type CreateIndicatorFeedError = DefaultErrors;

export const createIndicatorFeed: API.OperationMethod<
  CreateIndicatorFeedRequest,
  CreateIndicatorFeedResponse,
  CreateIndicatorFeedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateIndicatorFeedRequest,
  output: CreateIndicatorFeedResponse,
  errors: [],
}));

export interface UpdateIndicatorFeedRequest {
  feedId: number;
  /** Path param: Identifier */
  accountId: string;
  /** Body param: The new description of the feed */
  description?: string;
  /** Body param: The new is_attributable value of the feed */
  isAttributable?: boolean;
  /** Body param: The new is_downloadable value of the feed */
  isDownloadable?: boolean;
  /** Body param: The new is_public value of the feed */
  isPublic?: boolean;
  /** Body param: The new name of the feed */
  name?: string;
}

export const UpdateIndicatorFeedRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    feedId: Schema.Number.pipe(T.HttpPath("feedId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    description: Schema.optional(Schema.String),
    isAttributable: Schema.optional(Schema.Boolean),
    isDownloadable: Schema.optional(Schema.Boolean),
    isPublic: Schema.optional(Schema.Boolean),
    name: Schema.optional(Schema.String),
  }).pipe(
    Schema.encodeKeys({
      description: "description",
      isAttributable: "is_attributable",
      isDownloadable: "is_downloadable",
      isPublic: "is_public",
      name: "name",
    }),
    T.Http({
      method: "PUT",
      path: "/accounts/{account_id}/intel/indicator-feeds/{feedId}",
    }),
  ) as unknown as Schema.Schema<UpdateIndicatorFeedRequest>;

export interface UpdateIndicatorFeedResponse {
  /** The unique identifier for the indicator feed */
  id?: number | null;
  /** The date and time when the data entry was created */
  createdOn?: string | null;
  /** The description of the example test */
  description?: string | null;
  /** Whether the indicator feed can be attributed to a provider */
  isAttributable?: boolean | null;
  /** Whether the indicator feed can be downloaded */
  isDownloadable?: boolean | null;
  /** Whether the indicator feed is exposed to customers */
  isPublic?: boolean | null;
  /** The date and time when the data entry was last modified */
  modifiedOn?: string | null;
  /** The name of the indicator feed */
  name?: string | null;
}

export const UpdateIndicatorFeedResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    isAttributable: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    isDownloadable: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    isPublic: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        createdOn: "created_on",
        description: "description",
        isAttributable: "is_attributable",
        isDownloadable: "is_downloadable",
        isPublic: "is_public",
        modifiedOn: "modified_on",
        name: "name",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<UpdateIndicatorFeedResponse>;

export type UpdateIndicatorFeedError = DefaultErrors;

export const updateIndicatorFeed: API.OperationMethod<
  UpdateIndicatorFeedRequest,
  UpdateIndicatorFeedResponse,
  UpdateIndicatorFeedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateIndicatorFeedRequest,
  output: UpdateIndicatorFeedResponse,
  errors: [],
}));

export interface DataIndicatorFeedRequest {
  feedId: number;
  /** Identifier */
  accountId: string;
}

export const DataIndicatorFeedRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    feedId: Schema.Number.pipe(T.HttpPath("feedId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/intel/indicator-feeds/{feedId}/data",
    }),
  ) as unknown as Schema.Schema<DataIndicatorFeedRequest>;

export type DataIndicatorFeedResponse = unknown;

export const DataIndicatorFeedResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<DataIndicatorFeedResponse>;

export type DataIndicatorFeedError = DefaultErrors;

export const dataIndicatorFeed: API.OperationMethod<
  DataIndicatorFeedRequest,
  DataIndicatorFeedResponse,
  DataIndicatorFeedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DataIndicatorFeedRequest,
  output: DataIndicatorFeedResponse,
  errors: [],
}));

// =============================================================================
// IndicatorFeedPermission
// =============================================================================

export interface ListIndicatorFeedPermissionsRequest {
  /** Identifier */
  accountId: string;
}

export const ListIndicatorFeedPermissionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/intel/indicator-feeds/permissions/view",
    }),
  ) as unknown as Schema.Schema<ListIndicatorFeedPermissionsRequest>;

export type ListIndicatorFeedPermissionsResponse = {
  id?: number | null;
  description?: string | null;
  isAttributable?: boolean | null;
  isDownloadable?: boolean | null;
  isPublic?: boolean | null;
  name?: string | null;
}[];

export const ListIndicatorFeedPermissionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      isAttributable: Schema.optional(
        Schema.Union([Schema.Boolean, Schema.Null]),
      ),
      isDownloadable: Schema.optional(
        Schema.Union([Schema.Boolean, Schema.Null]),
      ),
      isPublic: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
      name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        description: "description",
        isAttributable: "is_attributable",
        isDownloadable: "is_downloadable",
        isPublic: "is_public",
        name: "name",
      }),
    ),
  ).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<ListIndicatorFeedPermissionsResponse>;

export type ListIndicatorFeedPermissionsError = DefaultErrors;

export const listIndicatorFeedPermissions: API.OperationMethod<
  ListIndicatorFeedPermissionsRequest,
  ListIndicatorFeedPermissionsResponse,
  ListIndicatorFeedPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListIndicatorFeedPermissionsRequest,
  output: ListIndicatorFeedPermissionsResponse,
  errors: [],
}));

export interface CreateIndicatorFeedPermissionRequest {
  /** Path param: Identifier */
  accountId: string;
  /** Body param: The Cloudflare account tag of the account to change permissions on */
  accountTag?: string;
  /** Body param: The ID of the feed to add/remove permissions on */
  feedId?: number;
}

export const CreateIndicatorFeedPermissionRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    accountTag: Schema.optional(Schema.String),
    feedId: Schema.optional(Schema.Number),
  }).pipe(
    Schema.encodeKeys({ accountTag: "account_tag", feedId: "feed_id" }),
    T.Http({
      method: "PUT",
      path: "/accounts/{account_id}/intel/indicator-feeds/permissions/add",
    }),
  ) as unknown as Schema.Schema<CreateIndicatorFeedPermissionRequest>;

export interface CreateIndicatorFeedPermissionResponse {
  /** Whether the update succeeded or not */
  success?: boolean | null;
}

export const CreateIndicatorFeedPermissionResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    success: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<CreateIndicatorFeedPermissionResponse>;

export type CreateIndicatorFeedPermissionError = DefaultErrors;

export const createIndicatorFeedPermission: API.OperationMethod<
  CreateIndicatorFeedPermissionRequest,
  CreateIndicatorFeedPermissionResponse,
  CreateIndicatorFeedPermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateIndicatorFeedPermissionRequest,
  output: CreateIndicatorFeedPermissionResponse,
  errors: [],
}));

export interface DeleteIndicatorFeedPermissionRequest {
  /** Path param: Identifier */
  accountId: string;
  /** Body param: The Cloudflare account tag of the account to change permissions on */
  accountTag?: string;
  /** Body param: The ID of the feed to add/remove permissions on */
  feedId?: number;
}

export const DeleteIndicatorFeedPermissionRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    accountTag: Schema.optional(Schema.String),
    feedId: Schema.optional(Schema.Number),
  }).pipe(
    Schema.encodeKeys({ accountTag: "account_tag", feedId: "feed_id" }),
    T.Http({
      method: "PUT",
      path: "/accounts/{account_id}/intel/indicator-feeds/permissions/remove",
    }),
  ) as unknown as Schema.Schema<DeleteIndicatorFeedPermissionRequest>;

export interface DeleteIndicatorFeedPermissionResponse {
  /** Whether the update succeeded or not */
  success?: boolean | null;
}

export const DeleteIndicatorFeedPermissionResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    success: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<DeleteIndicatorFeedPermissionResponse>;

export type DeleteIndicatorFeedPermissionError = DefaultErrors;

export const deleteIndicatorFeedPermission: API.OperationMethod<
  DeleteIndicatorFeedPermissionRequest,
  DeleteIndicatorFeedPermissionResponse,
  DeleteIndicatorFeedPermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteIndicatorFeedPermissionRequest,
  output: DeleteIndicatorFeedPermissionResponse,
  errors: [],
}));

// =============================================================================
// IndicatorFeedSnapshot
// =============================================================================

export interface PutIndicatorFeedSnapshotRequest {
  feedId: number;
  /** Path param: Identifier */
  accountId: string;
  /** Body param: The file to upload */
  source?: string;
}

export const PutIndicatorFeedSnapshotRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    feedId: Schema.Number.pipe(T.HttpPath("feedId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    source: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/accounts/{account_id}/intel/indicator-feeds/{feedId}/snapshot",
      contentType: "multipart",
    }),
  ) as unknown as Schema.Schema<PutIndicatorFeedSnapshotRequest>;

export interface PutIndicatorFeedSnapshotResponse {
  /** Feed id */
  fileId?: number | null;
  /** Name of the file unified in our system */
  filename?: string | null;
  /** Current status of upload, should be unified */
  status?: string | null;
}

export const PutIndicatorFeedSnapshotResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    fileId: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    filename: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    status: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        fileId: "file_id",
        filename: "filename",
        status: "status",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<PutIndicatorFeedSnapshotResponse>;

export type PutIndicatorFeedSnapshotError = DefaultErrors;

export const putIndicatorFeedSnapshot: API.OperationMethod<
  PutIndicatorFeedSnapshotRequest,
  PutIndicatorFeedSnapshotResponse,
  PutIndicatorFeedSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutIndicatorFeedSnapshotRequest,
  output: PutIndicatorFeedSnapshotResponse,
  errors: [],
}));

// =============================================================================
// Ip
// =============================================================================

export interface GetIpRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Query param: */
  ipv4?: string;
  /** Query param: */
  ipv6?: string;
}

export const GetIpRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  ipv4: Schema.optional(Schema.String).pipe(T.HttpQuery("ipv4")),
  ipv6: Schema.optional(Schema.String).pipe(T.HttpQuery("ipv6")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/intel/ip" }),
) as unknown as Schema.Schema<GetIpRequest>;

export type GetIpResponse = {
  belongsToRef?: {
    id?: string | null;
    country?: string | null;
    description?: string | null;
    type?: "hosting_provider" | "isp" | "organization" | null;
    value?: string | null;
  } | null;
  ip?: string | null;
  riskTypes?:
    | {
        id?: number | null;
        name?: string | null;
        superCategoryId?: number | null;
      }[]
    | null;
}[];

export const GetIpResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    belongsToRef: Schema.optional(
      Schema.Union([
        Schema.Struct({
          id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          country: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          description: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          type: Schema.optional(
            Schema.Union([
              Schema.Literals(["hosting_provider", "isp", "organization"]),
              Schema.Null,
            ]),
          ),
          value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        }),
        Schema.Null,
      ]),
    ),
    ip: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    riskTypes: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            id: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
            name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
            superCategoryId: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
          }).pipe(
            Schema.encodeKeys({
              id: "id",
              name: "name",
              superCategoryId: "super_category_id",
            }),
          ),
        ),
        Schema.Null,
      ]),
    ),
  }).pipe(
    Schema.encodeKeys({
      belongsToRef: "belongs_to_ref",
      ip: "ip",
      riskTypes: "risk_types",
    }),
  ),
).pipe(T.ResponsePath("result")) as unknown as Schema.Schema<GetIpResponse>;

export type GetIpError = DefaultErrors;

export const getIp: API.OperationMethod<
  GetIpRequest,
  GetIpResponse,
  GetIpError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetIpRequest,
  output: GetIpResponse,
  errors: [],
}));

// =============================================================================
// IpList
// =============================================================================

export interface GetIpListRequest {
  /** Identifier. */
  accountId: string;
}

export const GetIpListRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/intel/ip-list" }),
) as unknown as Schema.Schema<GetIpListRequest>;

export interface GetIpListResponse {
  result: {
    id?: number | null;
    description?: string | null;
    name?: string | null;
  }[];
}

export const GetIpListResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }),
  ),
}) as unknown as Schema.Schema<GetIpListResponse>;

export type GetIpListError = DefaultErrors;

export const getIpList: API.PaginatedOperationMethod<
  GetIpListRequest,
  GetIpListResponse,
  GetIpListError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: GetIpListRequest,
  ) => stream.Stream<
    GetIpListResponse,
    GetIpListError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: GetIpListRequest,
  ) => stream.Stream<
    { id?: number | null; description?: string | null; name?: string | null },
    GetIpListError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: GetIpListRequest,
  output: GetIpListResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

// =============================================================================
// Miscategorization
// =============================================================================

export interface CreateMiscategorizationRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: Content category IDs to add. */
  contentAdds?: number[];
  /** Body param: Content category IDs to remove. */
  contentRemoves?: number[];
  /** Body param: */
  indicatorType?: "domain" | "ipv4" | "ipv6" | "url";
  /** Body param: Provide only if indicator_type is `ipv4` or `ipv6`. */
  ip?: string | null;
  /** Body param: Security category IDs to add. */
  securityAdds?: number[];
  /** Body param: Security category IDs to remove. */
  securityRemoves?: number[];
  /** Body param: Provide only if indicator_type is `domain` or `url`. Example if indicator_type is `domain`: `example.com`. Example if indicator_type is `url`: `https://example.com/news/`. */
  url?: string;
}

export const CreateMiscategorizationRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    contentAdds: Schema.optional(Schema.Array(Schema.Number)),
    contentRemoves: Schema.optional(Schema.Array(Schema.Number)),
    indicatorType: Schema.optional(
      Schema.Literals(["domain", "ipv4", "ipv6", "url"]),
    ),
    ip: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    securityAdds: Schema.optional(Schema.Array(Schema.Number)),
    securityRemoves: Schema.optional(Schema.Array(Schema.Number)),
    url: Schema.optional(Schema.String),
  }).pipe(
    Schema.encodeKeys({
      contentAdds: "content_adds",
      contentRemoves: "content_removes",
      indicatorType: "indicator_type",
      ip: "ip",
      securityAdds: "security_adds",
      securityRemoves: "security_removes",
      url: "url",
    }),
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/intel/miscategorization",
    }),
  ) as unknown as Schema.Schema<CreateMiscategorizationRequest>;

export interface CreateMiscategorizationResponse {
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

export const CreateMiscategorizationResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  }) as unknown as Schema.Schema<CreateMiscategorizationResponse>;

export type CreateMiscategorizationError = DefaultErrors;

export const createMiscategorization: API.OperationMethod<
  CreateMiscategorizationRequest,
  CreateMiscategorizationResponse,
  CreateMiscategorizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateMiscategorizationRequest,
  output: CreateMiscategorizationResponse,
  errors: [],
}));

// =============================================================================
// Sinkhole
// =============================================================================

export interface ListSinkholesRequest {
  /** Identifier */
  accountId: string;
}

export const ListSinkholesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/intel/sinkholes" }),
) as unknown as Schema.Schema<ListSinkholesRequest>;

export interface ListSinkholesResponse {
  result: {
    id?: number | null;
    accountTag?: string | null;
    createdOn?: string | null;
    modifiedOn?: string | null;
    name?: string | null;
    r2Bucket?: string | null;
    r2Id?: string | null;
  }[];
}

export const ListSinkholesResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      accountTag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      r2Bucket: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      r2Id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        accountTag: "account_tag",
        createdOn: "created_on",
        modifiedOn: "modified_on",
        name: "name",
        r2Bucket: "r2_bucket",
        r2Id: "r2_id",
      }),
    ),
  ),
}) as unknown as Schema.Schema<ListSinkholesResponse>;

export type ListSinkholesError = DefaultErrors;

export const listSinkholes: API.PaginatedOperationMethod<
  ListSinkholesRequest,
  ListSinkholesResponse,
  ListSinkholesError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListSinkholesRequest,
  ) => stream.Stream<
    ListSinkholesResponse,
    ListSinkholesError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: ListSinkholesRequest) => stream.Stream<
    {
      id?: number | null;
      accountTag?: string | null;
      createdOn?: string | null;
      modifiedOn?: string | null;
      name?: string | null;
      r2Bucket?: string | null;
      r2Id?: string | null;
    },
    ListSinkholesError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSinkholesRequest,
  output: ListSinkholesResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

// =============================================================================
// Whoi
// =============================================================================

export interface GetWhoiRequest {
  /** Path param: Use to uniquely identify or reference the resource. */
  accountId: string;
  /** Query param: */
  domain?: string;
}

export const GetWhoiRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  domain: Schema.optional(Schema.String).pipe(T.HttpQuery("domain")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/intel/whois" }),
) as unknown as Schema.Schema<GetWhoiRequest>;

export interface GetWhoiResponse {
  dnssec: boolean;
  domain: string;
  extension: string;
  found: boolean;
  nameservers: string[];
  punycode: string;
  registrant: string;
  registrar: string;
  id?: string | null;
  administrativeCity?: string | null;
  administrativeCountry?: string | null;
  administrativeEmail?: string | null;
  administrativeFax?: string | null;
  administrativeFaxExt?: string | null;
  administrativeId?: string | null;
  administrativeName?: string | null;
  administrativeOrg?: string | null;
  administrativePhone?: string | null;
  administrativePhoneExt?: string | null;
  administrativePostalCode?: string | null;
  administrativeProvince?: string | null;
  administrativeReferralUrl?: string | null;
  administrativeStreet?: string | null;
  billingCity?: string | null;
  billingCountry?: string | null;
  billingEmail?: string | null;
  billingFax?: string | null;
  billingFaxExt?: string | null;
  billingId?: string | null;
  billingName?: string | null;
  billingOrg?: string | null;
  billingPhone?: string | null;
  billingPhoneExt?: string | null;
  billingPostalCode?: string | null;
  billingProvince?: string | null;
  billingReferralUrl?: string | null;
  billingStreet?: string | null;
  createdDate?: string | null;
  createdDateRaw?: string | null;
  expirationDate?: string | null;
  expirationDateRaw?: string | null;
  registrantCity?: string | null;
  registrantCountry?: string | null;
  registrantEmail?: string | null;
  registrantFax?: string | null;
  registrantFaxExt?: string | null;
  registrantId?: string | null;
  registrantName?: string | null;
  registrantOrg?: string | null;
  registrantPhone?: string | null;
  registrantPhoneExt?: string | null;
  registrantPostalCode?: string | null;
  registrantProvince?: string | null;
  registrantReferralUrl?: string | null;
  registrantStreet?: string | null;
  registrarCity?: string | null;
  registrarCountry?: string | null;
  registrarEmail?: string | null;
  registrarFax?: string | null;
  registrarFaxExt?: string | null;
  registrarId?: string | null;
  registrarName?: string | null;
  registrarOrg?: string | null;
  registrarPhone?: string | null;
  registrarPhoneExt?: string | null;
  registrarPostalCode?: string | null;
  registrarProvince?: string | null;
  registrarReferralUrl?: string | null;
  registrarStreet?: string | null;
  status?: string[] | null;
  technicalCity?: string | null;
  technicalCountry?: string | null;
  technicalEmail?: string | null;
  technicalFax?: string | null;
  technicalFaxExt?: string | null;
  technicalId?: string | null;
  technicalName?: string | null;
  technicalOrg?: string | null;
  technicalPhone?: string | null;
  technicalPhoneExt?: string | null;
  technicalPostalCode?: string | null;
  technicalProvince?: string | null;
  technicalReferralUrl?: string | null;
  technicalStreet?: string | null;
  updatedDate?: string | null;
  updatedDateRaw?: string | null;
  whoisServer?: string | null;
}

export const GetWhoiResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  dnssec: Schema.Boolean,
  domain: Schema.String,
  extension: Schema.String,
  found: Schema.Boolean,
  nameservers: Schema.Array(Schema.String),
  punycode: Schema.String,
  registrant: Schema.String,
  registrar: Schema.String,
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  administrativeCity: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  administrativeCountry: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  administrativeEmail: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  administrativeFax: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  administrativeFaxExt: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  administrativeId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  administrativeName: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  administrativeOrg: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  administrativePhone: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  administrativePhoneExt: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  administrativePostalCode: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  administrativeProvince: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  administrativeReferralUrl: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  administrativeStreet: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  billingCity: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  billingCountry: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  billingEmail: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  billingFax: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  billingFaxExt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  billingId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  billingName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  billingOrg: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  billingPhone: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  billingPhoneExt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  billingPostalCode: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  billingProvince: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  billingReferralUrl: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  billingStreet: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  createdDate: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  createdDateRaw: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  expirationDate: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  expirationDateRaw: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  registrantCity: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  registrantCountry: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  registrantEmail: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  registrantFax: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  registrantFaxExt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  registrantId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  registrantName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  registrantOrg: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  registrantPhone: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  registrantPhoneExt: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  registrantPostalCode: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  registrantProvince: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  registrantReferralUrl: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  registrantStreet: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  registrarCity: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  registrarCountry: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  registrarEmail: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  registrarFax: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  registrarFaxExt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  registrarId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  registrarName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  registrarOrg: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  registrarPhone: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  registrarPhoneExt: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  registrarPostalCode: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  registrarProvince: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  registrarReferralUrl: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  registrarStreet: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  status: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
  technicalCity: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  technicalCountry: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  technicalEmail: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  technicalFax: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  technicalFaxExt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  technicalId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  technicalName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  technicalOrg: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  technicalPhone: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  technicalPhoneExt: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  technicalPostalCode: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  technicalProvince: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  technicalReferralUrl: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  technicalStreet: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  updatedDate: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  updatedDateRaw: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  whoisServer: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      dnssec: "dnssec",
      domain: "domain",
      extension: "extension",
      found: "found",
      nameservers: "nameservers",
      punycode: "punycode",
      registrant: "registrant",
      registrar: "registrar",
      id: "id",
      administrativeCity: "administrative_city",
      administrativeCountry: "administrative_country",
      administrativeEmail: "administrative_email",
      administrativeFax: "administrative_fax",
      administrativeFaxExt: "administrative_fax_ext",
      administrativeId: "administrative_id",
      administrativeName: "administrative_name",
      administrativeOrg: "administrative_org",
      administrativePhone: "administrative_phone",
      administrativePhoneExt: "administrative_phone_ext",
      administrativePostalCode: "administrative_postal_code",
      administrativeProvince: "administrative_province",
      administrativeReferralUrl: "administrative_referral_url",
      administrativeStreet: "administrative_street",
      billingCity: "billing_city",
      billingCountry: "billing_country",
      billingEmail: "billing_email",
      billingFax: "billing_fax",
      billingFaxExt: "billing_fax_ext",
      billingId: "billing_id",
      billingName: "billing_name",
      billingOrg: "billing_org",
      billingPhone: "billing_phone",
      billingPhoneExt: "billing_phone_ext",
      billingPostalCode: "billing_postal_code",
      billingProvince: "billing_province",
      billingReferralUrl: "billing_referral_url",
      billingStreet: "billing_street",
      createdDate: "created_date",
      createdDateRaw: "created_date_raw",
      expirationDate: "expiration_date",
      expirationDateRaw: "expiration_date_raw",
      registrantCity: "registrant_city",
      registrantCountry: "registrant_country",
      registrantEmail: "registrant_email",
      registrantFax: "registrant_fax",
      registrantFaxExt: "registrant_fax_ext",
      registrantId: "registrant_id",
      registrantName: "registrant_name",
      registrantOrg: "registrant_org",
      registrantPhone: "registrant_phone",
      registrantPhoneExt: "registrant_phone_ext",
      registrantPostalCode: "registrant_postal_code",
      registrantProvince: "registrant_province",
      registrantReferralUrl: "registrant_referral_url",
      registrantStreet: "registrant_street",
      registrarCity: "registrar_city",
      registrarCountry: "registrar_country",
      registrarEmail: "registrar_email",
      registrarFax: "registrar_fax",
      registrarFaxExt: "registrar_fax_ext",
      registrarId: "registrar_id",
      registrarName: "registrar_name",
      registrarOrg: "registrar_org",
      registrarPhone: "registrar_phone",
      registrarPhoneExt: "registrar_phone_ext",
      registrarPostalCode: "registrar_postal_code",
      registrarProvince: "registrar_province",
      registrarReferralUrl: "registrar_referral_url",
      registrarStreet: "registrar_street",
      status: "status",
      technicalCity: "technical_city",
      technicalCountry: "technical_country",
      technicalEmail: "technical_email",
      technicalFax: "technical_fax",
      technicalFaxExt: "technical_fax_ext",
      technicalId: "technical_id",
      technicalName: "technical_name",
      technicalOrg: "technical_org",
      technicalPhone: "technical_phone",
      technicalPhoneExt: "technical_phone_ext",
      technicalPostalCode: "technical_postal_code",
      technicalProvince: "technical_province",
      technicalReferralUrl: "technical_referral_url",
      technicalStreet: "technical_street",
      updatedDate: "updated_date",
      updatedDateRaw: "updated_date_raw",
      whoisServer: "whois_server",
    }),
  )
  .pipe(T.ResponsePath("result")) as unknown as Schema.Schema<GetWhoiResponse>;

export type GetWhoiError = DefaultErrors;

export const getWhoi: API.OperationMethod<
  GetWhoiRequest,
  GetWhoiResponse,
  GetWhoiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetWhoiRequest,
  output: GetWhoiResponse,
  errors: [],
}));
