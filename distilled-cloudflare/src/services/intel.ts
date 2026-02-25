/**
 * Cloudflare INTEL API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service intel
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
// Asn
// =============================================================================

export interface GetAsnRequest {
  /** Identifier. */
  accountId: string;
}

export const GetAsnRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/intel/asn/{asn}" }),
) as unknown as Schema.Schema<GetAsnRequest>;

export type GetAsnResponse = unknown;

export const GetAsnResponse =
  Schema.Unknown as unknown as Schema.Schema<GetAsnResponse>;

export const getAsn: API.OperationMethod<
  GetAsnRequest,
  GetAsnResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const GetAsnSubnetRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/intel/asn/{asn}/subnets",
  }),
) as unknown as Schema.Schema<GetAsnSubnetRequest>;

export interface GetAsnSubnetResponse {
  asn?: number;
  /** Total results returned based on your search parameters. */
  count?: number;
  ipCountTotal?: number;
  /** Current page within paginated list of results. */
  page?: number;
  /** Number of results per page of results. */
  perPage?: number;
  subnets?: string[];
}

export const GetAsnSubnetResponse = Schema.Struct({
  asn: Schema.optional(Schema.Number),
  count: Schema.optional(Schema.Number),
  ipCountTotal: Schema.optional(Schema.Number),
  page: Schema.optional(Schema.Number),
  perPage: Schema.optional(Schema.Number),
  subnets: Schema.optional(Schema.Array(Schema.String)),
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

export const getAsnSubnet: API.OperationMethod<
  GetAsnSubnetRequest,
  GetAsnSubnetResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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
  "issueClass~neq"?: string[];
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
  "issueType~neq"?: (
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
  "product~neq"?: string[];
  /** Query param: */
  severity?: ("low" | "moderate" | "critical")[];
  /** Query param: */
  "severity~neq"?: ("low" | "moderate" | "critical")[];
  /** Query param: */
  subject?: string[];
  /** Query param: */
  "subject~neq"?: string[];
}

export const ListAttackSurfaceReportIssuesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  dismissed: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("dismissed")),
  issueClass: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("issue_class"),
  ),
  "issueClass~neq": Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("'issue_class~neq'"),
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
  "issueType~neq": Schema.optional(
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
  ).pipe(T.HttpQuery("'issue_type~neq'")),
  product: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("product"),
  ),
  "product~neq": Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("'product~neq'"),
  ),
  severity: Schema.optional(
    Schema.Array(Schema.Literals(["low", "moderate", "critical"])),
  ).pipe(T.HttpQuery("severity")),
  "severity~neq": Schema.optional(
    Schema.Array(Schema.Literals(["low", "moderate", "critical"])),
  ).pipe(T.HttpQuery("'severity~neq'")),
  subject: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("subject"),
  ),
  "subject~neq": Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("'subject~neq'"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/intel/attack-surface-report/issues",
  }),
) as unknown as Schema.Schema<ListAttackSurfaceReportIssuesRequest>;

export type ListAttackSurfaceReportIssuesResponse = {
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

export const ListAttackSurfaceReportIssuesResponse = Schema.Array(
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
    ),
    page: Schema.optional(Schema.Number),
    perPage: Schema.optional(Schema.Number),
  }).pipe(
    Schema.encodeKeys({
      count: "count",
      issues: "issues",
      page: "page",
      perPage: "per_page",
    }),
  ),
) as unknown as Schema.Schema<ListAttackSurfaceReportIssuesResponse>;

export const listAttackSurfaceReportIssues: API.OperationMethod<
  ListAttackSurfaceReportIssuesRequest,
  ListAttackSurfaceReportIssuesResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListAttackSurfaceReportIssuesRequest,
  output: ListAttackSurfaceReportIssuesResponse,
  errors: [],
}));

export interface ClassAttackSurfaceReportIssueRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Query param: */
  dismissed?: boolean;
  /** Query param: */
  issueClass?: string[];
  /** Query param: */
  "issueClass~neq"?: string[];
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
  "issueType~neq"?: (
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
  "product~neq"?: string[];
  /** Query param: */
  severity?: ("low" | "moderate" | "critical")[];
  /** Query param: */
  "severity~neq"?: ("low" | "moderate" | "critical")[];
  /** Query param: */
  subject?: string[];
  /** Query param: */
  "subject~neq"?: string[];
}

export const ClassAttackSurfaceReportIssueRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  dismissed: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("dismissed")),
  issueClass: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("issue_class"),
  ),
  "issueClass~neq": Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("'issue_class~neq'"),
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
  "issueType~neq": Schema.optional(
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
  ).pipe(T.HttpQuery("'issue_type~neq'")),
  product: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("product"),
  ),
  "product~neq": Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("'product~neq'"),
  ),
  severity: Schema.optional(
    Schema.Array(Schema.Literals(["low", "moderate", "critical"])),
  ).pipe(T.HttpQuery("severity")),
  "severity~neq": Schema.optional(
    Schema.Array(Schema.Literals(["low", "moderate", "critical"])),
  ).pipe(T.HttpQuery("'severity~neq'")),
  subject: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("subject"),
  ),
  "subject~neq": Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("'subject~neq'"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/intel/attack-surface-report/issues/class",
  }),
) as unknown as Schema.Schema<ClassAttackSurfaceReportIssueRequest>;

export type ClassAttackSurfaceReportIssueResponse = {
  count?: number;
  value?: string;
}[];

export const ClassAttackSurfaceReportIssueResponse = Schema.Array(
  Schema.Struct({
    count: Schema.optional(Schema.Number),
    value: Schema.optional(Schema.String),
  }),
) as unknown as Schema.Schema<ClassAttackSurfaceReportIssueResponse>;

export const classAttackSurfaceReportIssue: API.OperationMethod<
  ClassAttackSurfaceReportIssueRequest,
  ClassAttackSurfaceReportIssueResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const DismissAttackSurfaceReportIssueRequest = Schema.Struct({
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

export const DismissAttackSurfaceReportIssueResponse = Schema.Struct({
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
      documentationUrl: Schema.optional(Schema.String),
      source: Schema.optional(
        Schema.Struct({
          pointer: Schema.optional(Schema.String),
        }),
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

export const dismissAttackSurfaceReportIssue: API.OperationMethod<
  DismissAttackSurfaceReportIssueRequest,
  DismissAttackSurfaceReportIssueResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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
  "issueClass~neq"?: string[];
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
  "issueType~neq"?: (
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
  "product~neq"?: string[];
  /** Query param: */
  severity?: ("low" | "moderate" | "critical")[];
  /** Query param: */
  "severity~neq"?: ("low" | "moderate" | "critical")[];
  /** Query param: */
  subject?: string[];
  /** Query param: */
  "subject~neq"?: string[];
}

export const SeverityAttackSurfaceReportIssueRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  dismissed: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("dismissed")),
  issueClass: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("issue_class"),
  ),
  "issueClass~neq": Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("'issue_class~neq'"),
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
  "issueType~neq": Schema.optional(
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
  ).pipe(T.HttpQuery("'issue_type~neq'")),
  product: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("product"),
  ),
  "product~neq": Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("'product~neq'"),
  ),
  severity: Schema.optional(
    Schema.Array(Schema.Literals(["low", "moderate", "critical"])),
  ).pipe(T.HttpQuery("severity")),
  "severity~neq": Schema.optional(
    Schema.Array(Schema.Literals(["low", "moderate", "critical"])),
  ).pipe(T.HttpQuery("'severity~neq'")),
  subject: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("subject"),
  ),
  "subject~neq": Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("'subject~neq'"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/intel/attack-surface-report/issues/severity",
  }),
) as unknown as Schema.Schema<SeverityAttackSurfaceReportIssueRequest>;

export type SeverityAttackSurfaceReportIssueResponse = {
  count?: number;
  value?: string;
}[];

export const SeverityAttackSurfaceReportIssueResponse = Schema.Array(
  Schema.Struct({
    count: Schema.optional(Schema.Number),
    value: Schema.optional(Schema.String),
  }),
) as unknown as Schema.Schema<SeverityAttackSurfaceReportIssueResponse>;

export const severityAttackSurfaceReportIssue: API.OperationMethod<
  SeverityAttackSurfaceReportIssueRequest,
  SeverityAttackSurfaceReportIssueResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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
  "issueClass~neq"?: string[];
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
  "issueType~neq"?: (
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
  "product~neq"?: string[];
  /** Query param: */
  severity?: ("low" | "moderate" | "critical")[];
  /** Query param: */
  "severity~neq"?: ("low" | "moderate" | "critical")[];
  /** Query param: */
  subject?: string[];
  /** Query param: */
  "subject~neq"?: string[];
}

export const TypeAttackSurfaceReportIssueRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  dismissed: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("dismissed")),
  issueClass: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("issue_class"),
  ),
  "issueClass~neq": Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("'issue_class~neq'"),
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
  "issueType~neq": Schema.optional(
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
  ).pipe(T.HttpQuery("'issue_type~neq'")),
  product: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("product"),
  ),
  "product~neq": Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("'product~neq'"),
  ),
  severity: Schema.optional(
    Schema.Array(Schema.Literals(["low", "moderate", "critical"])),
  ).pipe(T.HttpQuery("severity")),
  "severity~neq": Schema.optional(
    Schema.Array(Schema.Literals(["low", "moderate", "critical"])),
  ).pipe(T.HttpQuery("'severity~neq'")),
  subject: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("subject"),
  ),
  "subject~neq": Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("'subject~neq'"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/intel/attack-surface-report/issues/type",
  }),
) as unknown as Schema.Schema<TypeAttackSurfaceReportIssueRequest>;

export type TypeAttackSurfaceReportIssueResponse = {
  count?: number;
  value?: string;
}[];

export const TypeAttackSurfaceReportIssueResponse = Schema.Array(
  Schema.Struct({
    count: Schema.optional(Schema.Number),
    value: Schema.optional(Schema.String),
  }),
) as unknown as Schema.Schema<TypeAttackSurfaceReportIssueResponse>;

export const typeAttackSurfaceReportIssue: API.OperationMethod<
  TypeAttackSurfaceReportIssueRequest,
  TypeAttackSurfaceReportIssueResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const GetAttackSurfaceReportIssueTypeRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/intel/attack-surface-report/issue-types",
  }),
) as unknown as Schema.Schema<GetAttackSurfaceReportIssueTypeRequest>;

export type GetAttackSurfaceReportIssueTypeResponse = string[];

export const GetAttackSurfaceReportIssueTypeResponse = Schema.Array(
  Schema.String,
) as unknown as Schema.Schema<GetAttackSurfaceReportIssueTypeResponse>;

export const getAttackSurfaceReportIssueType: API.OperationMethod<
  GetAttackSurfaceReportIssueTypeRequest,
  GetAttackSurfaceReportIssueTypeResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAttackSurfaceReportIssueTypeRequest,
  output: GetAttackSurfaceReportIssueTypeResponse,
  errors: [],
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

export const ListDnsRequest = Schema.Struct({
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

export type ListDnsResponse = {
  count?: number;
  page?: number;
  perPage?: number;
  reverseRecords?: {
    firstSeen?: string;
    hostname?: string;
    lastSeen?: string;
  }[];
}[];

export const ListDnsResponse = Schema.Array(
  Schema.Struct({
    count: Schema.optional(Schema.Number),
    page: Schema.optional(Schema.Number),
    perPage: Schema.optional(Schema.Number),
    reverseRecords: Schema.optional(
      Schema.Array(
        Schema.Struct({
          firstSeen: Schema.optional(Schema.String),
          hostname: Schema.optional(Schema.String),
          lastSeen: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            firstSeen: "first_seen",
            hostname: "hostname",
            lastSeen: "last_seen",
          }),
        ),
      ),
    ),
  }).pipe(
    Schema.encodeKeys({
      count: "count",
      page: "page",
      perPage: "per_page",
      reverseRecords: "reverse_records",
    }),
  ),
) as unknown as Schema.Schema<ListDnsResponse>;

export const listDns: API.OperationMethod<
  ListDnsRequest,
  ListDnsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListDnsRequest,
  output: ListDnsResponse,
  errors: [],
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

export const GetDomainRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  domain: Schema.optional(Schema.String).pipe(T.HttpQuery("domain")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/intel/domain" }),
) as unknown as Schema.Schema<GetDomainRequest>;

export interface GetDomainResponse {
  /** Additional information related to the host name. */
  additionalInformation?: { suspectedMalwareFamily?: string };
  /** Application that the hostname belongs to. */
  application?: { id?: number; name?: string };
  contentCategories?: {
    id?: number;
    name?: string;
    superCategoryId?: number;
  }[];
  domain?: string;
  inheritedContentCategories?: {
    id?: number;
    name?: string;
    superCategoryId?: number;
  }[];
  /** Domain from which `inherited_content_categories` and `inherited_risk_types` are inherited, if applicable. */
  inheritedFrom?: string;
  inheritedRiskTypes?: {
    id?: number;
    name?: string;
    superCategoryId?: number;
  }[];
  /** Global Cloudflare 100k ranking for the last 30 days, if available for the hostname. The top ranked domain is 1, the lowest ranked domain is 100,000. */
  popularityRank?: number;
  /** Specifies a list of references to one or more IP addresses or domain names that the domain name currently resolves to. */
  resolvesToRefs?: { id?: string; value?: string }[];
  /** Hostname risk score, which is a value between 0 (lowest risk) to 1 (highest risk). */
  riskScore?: number;
  riskTypes?: { id?: number; name?: string; superCategoryId?: number }[];
}

export const GetDomainResponse = Schema.Struct({
  additionalInformation: Schema.optional(
    Schema.Struct({
      suspectedMalwareFamily: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({ suspectedMalwareFamily: "suspected_malware_family" }),
    ),
  ),
  application: Schema.optional(
    Schema.Struct({
      id: Schema.optional(Schema.Number),
      name: Schema.optional(Schema.String),
    }),
  ),
  contentCategories: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.Number),
        name: Schema.optional(Schema.String),
        superCategoryId: Schema.optional(Schema.Number),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          name: "name",
          superCategoryId: "super_category_id",
        }),
      ),
    ),
  ),
  domain: Schema.optional(Schema.String),
  inheritedContentCategories: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.Number),
        name: Schema.optional(Schema.String),
        superCategoryId: Schema.optional(Schema.Number),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          name: "name",
          superCategoryId: "super_category_id",
        }),
      ),
    ),
  ),
  inheritedFrom: Schema.optional(Schema.String),
  inheritedRiskTypes: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.Number),
        name: Schema.optional(Schema.String),
        superCategoryId: Schema.optional(Schema.Number),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          name: "name",
          superCategoryId: "super_category_id",
        }),
      ),
    ),
  ),
  popularityRank: Schema.optional(Schema.Number),
  resolvesToRefs: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        value: Schema.optional(Schema.String),
      }),
    ),
  ),
  riskScore: Schema.optional(Schema.Number),
  riskTypes: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.Number),
        name: Schema.optional(Schema.String),
        superCategoryId: Schema.optional(Schema.Number),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          name: "name",
          superCategoryId: "super_category_id",
        }),
      ),
    ),
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
    resolvesToRefs: "resolves_to_refs",
    riskScore: "risk_score",
    riskTypes: "risk_types",
  }),
) as unknown as Schema.Schema<GetDomainResponse>;

export const getDomain: API.OperationMethod<
  GetDomainRequest,
  GetDomainResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const GetDomainBulkRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  domain: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("domain"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/intel/domain/bulk" }),
) as unknown as Schema.Schema<GetDomainBulkRequest>;

export type GetDomainBulkResponse = {
  additionalInformation?: { suspectedMalwareFamily?: string };
  application?: { id?: number; name?: string };
  contentCategories?: {
    id?: number;
    name?: string;
    superCategoryId?: number;
  }[];
  domain?: string;
  inheritedContentCategories?: {
    id?: number;
    name?: string;
    superCategoryId?: number;
  }[];
  inheritedFrom?: string;
  inheritedRiskTypes?: {
    id?: number;
    name?: string;
    superCategoryId?: number;
  }[];
  popularityRank?: number;
  riskScore?: number;
  riskTypes?: { id?: number; name?: string; superCategoryId?: number }[];
}[];

export const GetDomainBulkResponse = Schema.Array(
  Schema.Struct({
    additionalInformation: Schema.optional(
      Schema.Struct({
        suspectedMalwareFamily: Schema.optional(Schema.String),
      }).pipe(
        Schema.encodeKeys({
          suspectedMalwareFamily: "suspected_malware_family",
        }),
      ),
    ),
    application: Schema.optional(
      Schema.Struct({
        id: Schema.optional(Schema.Number),
        name: Schema.optional(Schema.String),
      }),
    ),
    contentCategories: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.Number),
          name: Schema.optional(Schema.String),
          superCategoryId: Schema.optional(Schema.Number),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            name: "name",
            superCategoryId: "super_category_id",
          }),
        ),
      ),
    ),
    domain: Schema.optional(Schema.String),
    inheritedContentCategories: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.Number),
          name: Schema.optional(Schema.String),
          superCategoryId: Schema.optional(Schema.Number),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            name: "name",
            superCategoryId: "super_category_id",
          }),
        ),
      ),
    ),
    inheritedFrom: Schema.optional(Schema.String),
    inheritedRiskTypes: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.Number),
          name: Schema.optional(Schema.String),
          superCategoryId: Schema.optional(Schema.Number),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            name: "name",
            superCategoryId: "super_category_id",
          }),
        ),
      ),
    ),
    popularityRank: Schema.optional(Schema.Number),
    riskScore: Schema.optional(Schema.Number),
    riskTypes: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.Number),
          name: Schema.optional(Schema.String),
          superCategoryId: Schema.optional(Schema.Number),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            name: "name",
            superCategoryId: "super_category_id",
          }),
        ),
      ),
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
) as unknown as Schema.Schema<GetDomainBulkResponse>;

export const getDomainBulk: API.OperationMethod<
  GetDomainBulkRequest,
  GetDomainBulkResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const GetDomainHistoryRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  domain: Schema.optional(Schema.String).pipe(T.HttpQuery("domain")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/intel/domain-history",
  }),
) as unknown as Schema.Schema<GetDomainHistoryRequest>;

export type GetDomainHistoryResponse = {
  categorizations?: {
    categories?: { id?: number; name?: string }[];
    end?: string;
    start?: string;
  }[];
  domain?: string;
}[];

export const GetDomainHistoryResponse = Schema.Array(
  Schema.Struct({
    categorizations: Schema.optional(
      Schema.Array(
        Schema.Struct({
          categories: Schema.optional(
            Schema.Array(
              Schema.Struct({
                id: Schema.optional(Schema.Number),
                name: Schema.optional(Schema.String),
              }),
            ),
          ),
          end: Schema.optional(Schema.String),
          start: Schema.optional(Schema.String),
        }),
      ),
    ),
    domain: Schema.optional(Schema.String),
  }),
) as unknown as Schema.Schema<GetDomainHistoryResponse>;

export const getDomainHistory: API.OperationMethod<
  GetDomainHistoryRequest,
  GetDomainHistoryResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const GetIndicatorFeedRequest = Schema.Struct({
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
  id?: number;
  /** The date and time when the data entry was created */
  createdOn?: string;
  /** The description of the example test */
  description?: string;
  /** Whether the indicator feed can be attributed to a provider */
  isAttributable?: boolean;
  /** Whether the indicator feed can be downloaded */
  isDownloadable?: boolean;
  /** Whether the indicator feed is exposed to customers */
  isPublic?: boolean;
  /** Status of the latest snapshot uploaded */
  latestUploadStatus?:
    | "Mirroring"
    | "Unifying"
    | "Loading"
    | "Provisioning"
    | "Complete"
    | "Error";
  /** The date and time when the data entry was last modified */
  modifiedOn?: string;
  /** The name of the indicator feed */
  name?: string;
  /** The unique identifier for the provider */
  providerId?: string;
  /** The provider of the indicator feed */
  providerName?: string;
}

export const GetIndicatorFeedResponse = Schema.Struct({
  id: Schema.optional(Schema.Number),
  createdOn: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  isAttributable: Schema.optional(Schema.Boolean),
  isDownloadable: Schema.optional(Schema.Boolean),
  isPublic: Schema.optional(Schema.Boolean),
  latestUploadStatus: Schema.optional(
    Schema.Literals([
      "Mirroring",
      "Unifying",
      "Loading",
      "Provisioning",
      "Complete",
      "Error",
    ]),
  ),
  modifiedOn: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  providerId: Schema.optional(Schema.String),
  providerName: Schema.optional(Schema.String),
}).pipe(
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
) as unknown as Schema.Schema<GetIndicatorFeedResponse>;

export const getIndicatorFeed: API.OperationMethod<
  GetIndicatorFeedRequest,
  GetIndicatorFeedResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetIndicatorFeedRequest,
  output: GetIndicatorFeedResponse,
  errors: [],
}));

export interface ListIndicatorFeedsRequest {
  /** Identifier */
  accountId: string;
}

export const ListIndicatorFeedsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/intel/indicator-feeds",
  }),
) as unknown as Schema.Schema<ListIndicatorFeedsRequest>;

export type ListIndicatorFeedsResponse = {
  id?: number;
  createdOn?: string;
  description?: string;
  isAttributable?: boolean;
  isDownloadable?: boolean;
  isPublic?: boolean;
  modifiedOn?: string;
  name?: string;
}[];

export const ListIndicatorFeedsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.Number),
    createdOn: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    isAttributable: Schema.optional(Schema.Boolean),
    isDownloadable: Schema.optional(Schema.Boolean),
    isPublic: Schema.optional(Schema.Boolean),
    modifiedOn: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
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
) as unknown as Schema.Schema<ListIndicatorFeedsResponse>;

export const listIndicatorFeeds: API.OperationMethod<
  ListIndicatorFeedsRequest,
  ListIndicatorFeedsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListIndicatorFeedsRequest,
  output: ListIndicatorFeedsResponse,
  errors: [],
}));

export interface CreateIndicatorFeedRequest {
  /** Path param: Identifier */
  accountId: string;
  /** Body param: The description of the example test */
  description?: string;
  /** Body param: The name of the indicator feed */
  name?: string;
}

export const CreateIndicatorFeedRequest = Schema.Struct({
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
  id?: number;
  /** The date and time when the data entry was created */
  createdOn?: string;
  /** The description of the example test */
  description?: string;
  /** Whether the indicator feed can be attributed to a provider */
  isAttributable?: boolean;
  /** Whether the indicator feed can be downloaded */
  isDownloadable?: boolean;
  /** Whether the indicator feed is exposed to customers */
  isPublic?: boolean;
  /** The date and time when the data entry was last modified */
  modifiedOn?: string;
  /** The name of the indicator feed */
  name?: string;
}

export const CreateIndicatorFeedResponse = Schema.Struct({
  id: Schema.optional(Schema.Number),
  createdOn: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  isAttributable: Schema.optional(Schema.Boolean),
  isDownloadable: Schema.optional(Schema.Boolean),
  isPublic: Schema.optional(Schema.Boolean),
  modifiedOn: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
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
) as unknown as Schema.Schema<CreateIndicatorFeedResponse>;

export const createIndicatorFeed: API.OperationMethod<
  CreateIndicatorFeedRequest,
  CreateIndicatorFeedResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const UpdateIndicatorFeedRequest = Schema.Struct({
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
  id?: number;
  /** The date and time when the data entry was created */
  createdOn?: string;
  /** The description of the example test */
  description?: string;
  /** Whether the indicator feed can be attributed to a provider */
  isAttributable?: boolean;
  /** Whether the indicator feed can be downloaded */
  isDownloadable?: boolean;
  /** Whether the indicator feed is exposed to customers */
  isPublic?: boolean;
  /** The date and time when the data entry was last modified */
  modifiedOn?: string;
  /** The name of the indicator feed */
  name?: string;
}

export const UpdateIndicatorFeedResponse = Schema.Struct({
  id: Schema.optional(Schema.Number),
  createdOn: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  isAttributable: Schema.optional(Schema.Boolean),
  isDownloadable: Schema.optional(Schema.Boolean),
  isPublic: Schema.optional(Schema.Boolean),
  modifiedOn: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
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
) as unknown as Schema.Schema<UpdateIndicatorFeedResponse>;

export const updateIndicatorFeed: API.OperationMethod<
  UpdateIndicatorFeedRequest,
  UpdateIndicatorFeedResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateIndicatorFeedRequest,
  output: UpdateIndicatorFeedResponse,
  errors: [],
}));

export interface DataIndicatorFeedRequest {
  feedId: number;
  /** Identifier */
  accountId: string;
}

export const DataIndicatorFeedRequest = Schema.Struct({
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
  Schema.Unknown as unknown as Schema.Schema<DataIndicatorFeedResponse>;

export const dataIndicatorFeed: API.OperationMethod<
  DataIndicatorFeedRequest,
  DataIndicatorFeedResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const ListIndicatorFeedPermissionsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/intel/indicator-feeds/permissions/view",
  }),
) as unknown as Schema.Schema<ListIndicatorFeedPermissionsRequest>;

export type ListIndicatorFeedPermissionsResponse = {
  id?: number;
  description?: string;
  isAttributable?: boolean;
  isDownloadable?: boolean;
  isPublic?: boolean;
  name?: string;
}[];

export const ListIndicatorFeedPermissionsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.Number),
    description: Schema.optional(Schema.String),
    isAttributable: Schema.optional(Schema.Boolean),
    isDownloadable: Schema.optional(Schema.Boolean),
    isPublic: Schema.optional(Schema.Boolean),
    name: Schema.optional(Schema.String),
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
) as unknown as Schema.Schema<ListIndicatorFeedPermissionsResponse>;

export const listIndicatorFeedPermissions: API.OperationMethod<
  ListIndicatorFeedPermissionsRequest,
  ListIndicatorFeedPermissionsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const CreateIndicatorFeedPermissionRequest = Schema.Struct({
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
  success?: boolean;
}

export const CreateIndicatorFeedPermissionResponse = Schema.Struct({
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<CreateIndicatorFeedPermissionResponse>;

export const createIndicatorFeedPermission: API.OperationMethod<
  CreateIndicatorFeedPermissionRequest,
  CreateIndicatorFeedPermissionResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const DeleteIndicatorFeedPermissionRequest = Schema.Struct({
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
  success?: boolean;
}

export const DeleteIndicatorFeedPermissionResponse = Schema.Struct({
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<DeleteIndicatorFeedPermissionResponse>;

export const deleteIndicatorFeedPermission: API.OperationMethod<
  DeleteIndicatorFeedPermissionRequest,
  DeleteIndicatorFeedPermissionResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const PutIndicatorFeedSnapshotRequest = Schema.Struct({
  feedId: Schema.Number.pipe(T.HttpPath("feedId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  source: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/intel/indicator-feeds/{feedId}/snapshot",
  }),
) as unknown as Schema.Schema<PutIndicatorFeedSnapshotRequest>;

export interface PutIndicatorFeedSnapshotResponse {
  /** Feed id */
  fileId?: number;
  /** Name of the file unified in our system */
  filename?: string;
  /** Current status of upload, should be unified */
  status?: string;
}

export const PutIndicatorFeedSnapshotResponse = Schema.Struct({
  fileId: Schema.optional(Schema.Number),
  filename: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    fileId: "file_id",
    filename: "filename",
    status: "status",
  }),
) as unknown as Schema.Schema<PutIndicatorFeedSnapshotResponse>;

export const putIndicatorFeedSnapshot: API.OperationMethod<
  PutIndicatorFeedSnapshotRequest,
  PutIndicatorFeedSnapshotResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const GetIpRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  ipv4: Schema.optional(Schema.String).pipe(T.HttpQuery("ipv4")),
  ipv6: Schema.optional(Schema.String).pipe(T.HttpQuery("ipv6")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/intel/ip" }),
) as unknown as Schema.Schema<GetIpRequest>;

export type GetIpResponse = {
  belongsToRef?: {
    id?: string;
    country?: string;
    description?: string;
    type?: "hosting_provider" | "isp" | "organization";
    value?: string;
  };
  ip?: string;
  riskTypes?: { id?: number; name?: string; superCategoryId?: number }[];
}[];

export const GetIpResponse = Schema.Array(
  Schema.Struct({
    belongsToRef: Schema.optional(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        country: Schema.optional(Schema.String),
        description: Schema.optional(Schema.String),
        type: Schema.optional(
          Schema.Literals(["hosting_provider", "isp", "organization"]),
        ),
        value: Schema.optional(Schema.String),
      }),
    ),
    ip: Schema.optional(Schema.String),
    riskTypes: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.Number),
          name: Schema.optional(Schema.String),
          superCategoryId: Schema.optional(Schema.Number),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            name: "name",
            superCategoryId: "super_category_id",
          }),
        ),
      ),
    ),
  }).pipe(
    Schema.encodeKeys({
      belongsToRef: "belongs_to_ref",
      ip: "ip",
      riskTypes: "risk_types",
    }),
  ),
) as unknown as Schema.Schema<GetIpResponse>;

export const getIp: API.OperationMethod<
  GetIpRequest,
  GetIpResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const GetIpListRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/intel/ip-list" }),
) as unknown as Schema.Schema<GetIpListRequest>;

export type GetIpListResponse = {
  id?: number;
  description?: string;
  name?: string;
}[];

export const GetIpListResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.Number),
    description: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
  }),
) as unknown as Schema.Schema<GetIpListResponse>;

export const getIpList: API.OperationMethod<
  GetIpListRequest,
  GetIpListResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetIpListRequest,
  output: GetIpListResponse,
  errors: [],
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

export const CreateMiscategorizationRequest = Schema.Struct({
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

export const CreateMiscategorizationResponse = Schema.Struct({
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
      documentationUrl: Schema.optional(Schema.String),
      source: Schema.optional(
        Schema.Struct({
          pointer: Schema.optional(Schema.String),
        }),
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

export const createMiscategorization: API.OperationMethod<
  CreateMiscategorizationRequest,
  CreateMiscategorizationResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const ListSinkholesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/intel/sinkholes" }),
) as unknown as Schema.Schema<ListSinkholesRequest>;

export type ListSinkholesResponse = {
  id?: number;
  accountTag?: string;
  createdOn?: string;
  modifiedOn?: string;
  name?: string;
  r2Bucket?: string;
  r2Id?: string;
}[];

export const ListSinkholesResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.Number),
    accountTag: Schema.optional(Schema.String),
    createdOn: Schema.optional(Schema.String),
    modifiedOn: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    r2Bucket: Schema.optional(Schema.String),
    r2Id: Schema.optional(Schema.String),
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
) as unknown as Schema.Schema<ListSinkholesResponse>;

export const listSinkholes: API.OperationMethod<
  ListSinkholesRequest,
  ListSinkholesResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListSinkholesRequest,
  output: ListSinkholesResponse,
  errors: [],
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

export const GetWhoiRequest = Schema.Struct({
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
  id?: string;
  administrativeCity?: string;
  administrativeCountry?: string;
  administrativeEmail?: string;
  administrativeFax?: string;
  administrativeFaxExt?: string;
  administrativeId?: string;
  administrativeName?: string;
  administrativeOrg?: string;
  administrativePhone?: string;
  administrativePhoneExt?: string;
  administrativePostalCode?: string;
  administrativeProvince?: string;
  administrativeReferralUrl?: string;
  administrativeStreet?: string;
  billingCity?: string;
  billingCountry?: string;
  billingEmail?: string;
  billingFax?: string;
  billingFaxExt?: string;
  billingId?: string;
  billingName?: string;
  billingOrg?: string;
  billingPhone?: string;
  billingPhoneExt?: string;
  billingPostalCode?: string;
  billingProvince?: string;
  billingReferralUrl?: string;
  billingStreet?: string;
  createdDate?: string;
  createdDateRaw?: string;
  expirationDate?: string;
  expirationDateRaw?: string;
  registrantCity?: string;
  registrantCountry?: string;
  registrantEmail?: string;
  registrantFax?: string;
  registrantFaxExt?: string;
  registrantId?: string;
  registrantName?: string;
  registrantOrg?: string;
  registrantPhone?: string;
  registrantPhoneExt?: string;
  registrantPostalCode?: string;
  registrantProvince?: string;
  registrantReferralUrl?: string;
  registrantStreet?: string;
  registrarCity?: string;
  registrarCountry?: string;
  registrarEmail?: string;
  registrarFax?: string;
  registrarFaxExt?: string;
  registrarId?: string;
  registrarName?: string;
  registrarOrg?: string;
  registrarPhone?: string;
  registrarPhoneExt?: string;
  registrarPostalCode?: string;
  registrarProvince?: string;
  registrarReferralUrl?: string;
  registrarStreet?: string;
  status?: string[];
  technicalCity?: string;
  technicalCountry?: string;
  technicalEmail?: string;
  technicalFax?: string;
  technicalFaxExt?: string;
  technicalId?: string;
  technicalName?: string;
  technicalOrg?: string;
  technicalPhone?: string;
  technicalPhoneExt?: string;
  technicalPostalCode?: string;
  technicalProvince?: string;
  technicalReferralUrl?: string;
  technicalStreet?: string;
  updatedDate?: string;
  updatedDateRaw?: string;
  whoisServer?: string;
}

export const GetWhoiResponse = Schema.Struct({
  dnssec: Schema.Boolean,
  domain: Schema.String,
  extension: Schema.String,
  found: Schema.Boolean,
  nameservers: Schema.Array(Schema.String),
  punycode: Schema.String,
  registrant: Schema.String,
  registrar: Schema.String,
  id: Schema.optional(Schema.String),
  administrativeCity: Schema.optional(Schema.String),
  administrativeCountry: Schema.optional(Schema.String),
  administrativeEmail: Schema.optional(Schema.String),
  administrativeFax: Schema.optional(Schema.String),
  administrativeFaxExt: Schema.optional(Schema.String),
  administrativeId: Schema.optional(Schema.String),
  administrativeName: Schema.optional(Schema.String),
  administrativeOrg: Schema.optional(Schema.String),
  administrativePhone: Schema.optional(Schema.String),
  administrativePhoneExt: Schema.optional(Schema.String),
  administrativePostalCode: Schema.optional(Schema.String),
  administrativeProvince: Schema.optional(Schema.String),
  administrativeReferralUrl: Schema.optional(Schema.String),
  administrativeStreet: Schema.optional(Schema.String),
  billingCity: Schema.optional(Schema.String),
  billingCountry: Schema.optional(Schema.String),
  billingEmail: Schema.optional(Schema.String),
  billingFax: Schema.optional(Schema.String),
  billingFaxExt: Schema.optional(Schema.String),
  billingId: Schema.optional(Schema.String),
  billingName: Schema.optional(Schema.String),
  billingOrg: Schema.optional(Schema.String),
  billingPhone: Schema.optional(Schema.String),
  billingPhoneExt: Schema.optional(Schema.String),
  billingPostalCode: Schema.optional(Schema.String),
  billingProvince: Schema.optional(Schema.String),
  billingReferralUrl: Schema.optional(Schema.String),
  billingStreet: Schema.optional(Schema.String),
  createdDate: Schema.optional(Schema.String),
  createdDateRaw: Schema.optional(Schema.String),
  expirationDate: Schema.optional(Schema.String),
  expirationDateRaw: Schema.optional(Schema.String),
  registrantCity: Schema.optional(Schema.String),
  registrantCountry: Schema.optional(Schema.String),
  registrantEmail: Schema.optional(Schema.String),
  registrantFax: Schema.optional(Schema.String),
  registrantFaxExt: Schema.optional(Schema.String),
  registrantId: Schema.optional(Schema.String),
  registrantName: Schema.optional(Schema.String),
  registrantOrg: Schema.optional(Schema.String),
  registrantPhone: Schema.optional(Schema.String),
  registrantPhoneExt: Schema.optional(Schema.String),
  registrantPostalCode: Schema.optional(Schema.String),
  registrantProvince: Schema.optional(Schema.String),
  registrantReferralUrl: Schema.optional(Schema.String),
  registrantStreet: Schema.optional(Schema.String),
  registrarCity: Schema.optional(Schema.String),
  registrarCountry: Schema.optional(Schema.String),
  registrarEmail: Schema.optional(Schema.String),
  registrarFax: Schema.optional(Schema.String),
  registrarFaxExt: Schema.optional(Schema.String),
  registrarId: Schema.optional(Schema.String),
  registrarName: Schema.optional(Schema.String),
  registrarOrg: Schema.optional(Schema.String),
  registrarPhone: Schema.optional(Schema.String),
  registrarPhoneExt: Schema.optional(Schema.String),
  registrarPostalCode: Schema.optional(Schema.String),
  registrarProvince: Schema.optional(Schema.String),
  registrarReferralUrl: Schema.optional(Schema.String),
  registrarStreet: Schema.optional(Schema.String),
  status: Schema.optional(Schema.Array(Schema.String)),
  technicalCity: Schema.optional(Schema.String),
  technicalCountry: Schema.optional(Schema.String),
  technicalEmail: Schema.optional(Schema.String),
  technicalFax: Schema.optional(Schema.String),
  technicalFaxExt: Schema.optional(Schema.String),
  technicalId: Schema.optional(Schema.String),
  technicalName: Schema.optional(Schema.String),
  technicalOrg: Schema.optional(Schema.String),
  technicalPhone: Schema.optional(Schema.String),
  technicalPhoneExt: Schema.optional(Schema.String),
  technicalPostalCode: Schema.optional(Schema.String),
  technicalProvince: Schema.optional(Schema.String),
  technicalReferralUrl: Schema.optional(Schema.String),
  technicalStreet: Schema.optional(Schema.String),
  updatedDate: Schema.optional(Schema.String),
  updatedDateRaw: Schema.optional(Schema.String),
  whoisServer: Schema.optional(Schema.String),
}).pipe(
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
) as unknown as Schema.Schema<GetWhoiResponse>;

export const getWhoi: API.OperationMethod<
  GetWhoiRequest,
  GetWhoiResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetWhoiRequest,
  output: GetWhoiResponse,
  errors: [],
}));
