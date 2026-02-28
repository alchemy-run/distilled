// ==========================================================================
// Gmail Postmaster Tools API (gmailpostmastertools v2)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { GCPAuth } from "../auth.ts";
import type { CommonErrors } from "../errors.ts";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "gmailpostmastertools",
  version: "v2",
  rootUrl: "https://gmailpostmastertools.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Domain {
  /** Identifier. The resource name of the domain. Format: `domains/{domain_name}`, where domain_name is the fully qualified domain name (i.e., mymail.mydomain.com). */
  name?: string;
  /** Output only. User's permission of this domain. */
  permission?: "PERMISSION_UNSPECIFIED" | "READER" | "OWNER" | "NONE" | (string & {});
  /** Output only. Information about a user's verification history and properties for the domain. */
  verificationState?: "VERIFICATION_STATE_UNSPECIFIED" | "UNVERIFIED" | "VERIFIED" | (string & {});
  /** Output only. Immutable. The timestamp at which the domain was added to the user's account. */
  createTime?: string;
  /** The timestamp at which the domain was last verified by the user. */
  lastVerifyTime?: string;
}

export const Domain: Schema.Schema<Domain> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  permission: Schema.optional(Schema.String),
  verificationState: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  lastVerifyTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Domain" }) as any as Schema.Schema<Domain>;

export interface ListDomainsResponse {
  /** The domains that have been registered by the user. */
  domains?: Array<Domain>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const ListDomainsResponse: Schema.Schema<ListDomainsResponse> = Schema.suspend(() => Schema.Struct({
  domains: Schema.optional(Schema.Array(Domain)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListDomainsResponse" }) as any as Schema.Schema<ListDomainsResponse>;

export interface BaseMetric {
  /** A predefined standard metric. */
  standardMetric?: "STANDARD_METRIC_UNSPECIFIED" | "FEEDBACK_LOOP_ID" | "FEEDBACK_LOOP_SPAM_RATE" | "SPAM_RATE" | "AUTH_SUCCESS_RATE" | "TLS_ENCRYPTION_MESSAGE_COUNT" | "TLS_ENCRYPTION_RATE" | "DELIVERY_ERROR_COUNT" | "DELIVERY_ERROR_RATE" | (string & {});
}

export const BaseMetric: Schema.Schema<BaseMetric> = Schema.suspend(() => Schema.Struct({
  standardMetric: Schema.optional(Schema.String),
})).annotate({ identifier: "BaseMetric" }) as any as Schema.Schema<BaseMetric>;

export interface MetricDefinition {
  /** Required. The user-defined name for this metric. This name will be used as the key for this metric's value in the response. */
  name?: string;
  /** Required. The underlying metric to query. */
  baseMetric?: BaseMetric;
  /** Optional. Optional filters to apply to the metric. */
  filter?: string;
}

export const MetricDefinition: Schema.Schema<MetricDefinition> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  baseMetric: Schema.optional(BaseMetric),
  filter: Schema.optional(Schema.String),
})).annotate({ identifier: "MetricDefinition" }) as any as Schema.Schema<MetricDefinition>;

export interface Gmailpostmastertools_Date {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const Gmailpostmastertools_Date: Schema.Schema<Gmailpostmastertools_Date> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
})).annotate({ identifier: "Gmailpostmastertools_Date" }) as any as Schema.Schema<Gmailpostmastertools_Date>;

export interface DateRange {
  /** Required. The inclusive start date of the date range. */
  start?: Gmailpostmastertools_Date;
  /** Required. The inclusive end date of the date range. */
  end?: Gmailpostmastertools_Date;
}

export const DateRange: Schema.Schema<DateRange> = Schema.suspend(() => Schema.Struct({
  start: Schema.optional(Gmailpostmastertools_Date),
  end: Schema.optional(Gmailpostmastertools_Date),
})).annotate({ identifier: "DateRange" }) as any as Schema.Schema<DateRange>;

export interface DateRanges {
  /** Required. The list of date ranges for which to retrieve data. */
  dateRanges?: Array<DateRange>;
}

export const DateRanges: Schema.Schema<DateRanges> = Schema.suspend(() => Schema.Struct({
  dateRanges: Schema.optional(Schema.Array(DateRange)),
})).annotate({ identifier: "DateRanges" }) as any as Schema.Schema<DateRanges>;

export interface DateList {
  /** Required. The list of specific dates for which to retrieve data. */
  dates?: Array<Gmailpostmastertools_Date>;
}

export const DateList: Schema.Schema<DateList> = Schema.suspend(() => Schema.Struct({
  dates: Schema.optional(Schema.Array(Gmailpostmastertools_Date)),
})).annotate({ identifier: "DateList" }) as any as Schema.Schema<DateList>;

export interface TimeQuery {
  /** A list of date ranges. */
  dateRanges?: DateRanges;
  /** A list of specific dates. */
  dateList?: DateList;
}

export const TimeQuery: Schema.Schema<TimeQuery> = Schema.suspend(() => Schema.Struct({
  dateRanges: Schema.optional(DateRanges),
  dateList: Schema.optional(DateList),
})).annotate({ identifier: "TimeQuery" }) as any as Schema.Schema<TimeQuery>;

export interface QueryDomainStatsRequest {
  /** Required. The parent resource name where the stats are queried. Format: domains/{domain} */
  parent?: string;
  /** Required. The specific metrics to query. You can define a custom name for each metric, which will be used in the response. */
  metricDefinitions?: Array<MetricDefinition>;
  /** Required. The time range or specific dates for which to retrieve the metrics. */
  timeQuery?: TimeQuery;
  /** Optional. The maximum number of DomainStats resources to return in the response. The server may return fewer than this value. If unspecified, a default value of 10 will be used. The maximum value is 200. */
  pageSize?: number;
  /** Optional. The next_page_token value returned from a previous List request, if any. If the aggregation granularity is DAILY, the page token will be the encoded date + "/" + metric name. If the aggregation granularity is OVERALL, the page token will be the encoded metric name. */
  pageToken?: string;
  /** Optional. The granularity at which to aggregate the statistics. If unspecified, defaults to DAILY. */
  aggregationGranularity?: "AGGREGATION_GRANULARITY_UNSPECIFIED" | "DAILY" | "OVERALL" | (string & {});
}

export const QueryDomainStatsRequest: Schema.Schema<QueryDomainStatsRequest> = Schema.suspend(() => Schema.Struct({
  parent: Schema.optional(Schema.String),
  metricDefinitions: Schema.optional(Schema.Array(MetricDefinition)),
  timeQuery: Schema.optional(TimeQuery),
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
  aggregationGranularity: Schema.optional(Schema.String),
})).annotate({ identifier: "QueryDomainStatsRequest" }) as any as Schema.Schema<QueryDomainStatsRequest>;

export interface StringList {
  /** The string values. */
  values?: Array<string>;
}

export const StringList: Schema.Schema<StringList> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "StringList" }) as any as Schema.Schema<StringList>;

export interface StatisticValue {
  /** Integer value. */
  intValue?: string;
  /** Double value. */
  doubleValue?: number;
  /** String value. */
  stringValue?: string;
  /** Float value. */
  floatValue?: number;
  /** List of string values. */
  stringList?: StringList;
}

export const StatisticValue: Schema.Schema<StatisticValue> = Schema.suspend(() => Schema.Struct({
  intValue: Schema.optional(Schema.String),
  doubleValue: Schema.optional(Schema.Number),
  stringValue: Schema.optional(Schema.String),
  floatValue: Schema.optional(Schema.Number),
  stringList: Schema.optional(StringList),
})).annotate({ identifier: "StatisticValue" }) as any as Schema.Schema<StatisticValue>;

export interface DomainStat {
  /** Output only. The resource name of the DomainStat resource. Format: domains/{domain}/domainStats/{domain_stat} The `{domain_stat}` segment is an opaque, server-generated ID. We recommend using the `metric` field to identify queried metrics instead of parsing the name. */
  name?: string;
  /** The value of the corresponding metric. */
  value?: StatisticValue;
  /** Optional. The specific date for these stats, if granularity is DAILY. This field is populated if the QueryDomainStatsRequest specified a DAILY aggregation granularity. */
  date?: Gmailpostmastertools_Date;
  /** The user-defined name from MetricDefinition.name in the request, used to correlate this result with the requested metric. */
  metric?: string;
}

export const DomainStat: Schema.Schema<DomainStat> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(StatisticValue),
  date: Schema.optional(Gmailpostmastertools_Date),
  metric: Schema.optional(Schema.String),
})).annotate({ identifier: "DomainStat" }) as any as Schema.Schema<DomainStat>;

export interface QueryDomainStatsResponse {
  /** The list of domain statistics. Each DomainStat object contains the value for a metric requested in the QueryDomainStatsRequest. */
  domainStats?: Array<DomainStat>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const QueryDomainStatsResponse: Schema.Schema<QueryDomainStatsResponse> = Schema.suspend(() => Schema.Struct({
  domainStats: Schema.optional(Schema.Array(DomainStat)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "QueryDomainStatsResponse" }) as any as Schema.Schema<QueryDomainStatsResponse>;

export interface BatchQueryDomainStatsRequest {
  /** Required. A list of individual query requests. Each request can be for a different domain. A maximum of 100 requests can be included in a single batch. */
  requests?: Array<QueryDomainStatsRequest>;
}

export const BatchQueryDomainStatsRequest: Schema.Schema<BatchQueryDomainStatsRequest> = Schema.suspend(() => Schema.Struct({
  requests: Schema.optional(Schema.Array(QueryDomainStatsRequest)),
})).annotate({ identifier: "BatchQueryDomainStatsRequest" }) as any as Schema.Schema<BatchQueryDomainStatsRequest>;

export interface Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface BatchQueryDomainStatsResult {
  /** The successful response for the individual query. */
  response?: QueryDomainStatsResponse;
  /** The error status if the individual query failed. */
  error?: Status;
}

export const BatchQueryDomainStatsResult: Schema.Schema<BatchQueryDomainStatsResult> = Schema.suspend(() => Schema.Struct({
  response: Schema.optional(QueryDomainStatsResponse),
  error: Schema.optional(Status),
})).annotate({ identifier: "BatchQueryDomainStatsResult" }) as any as Schema.Schema<BatchQueryDomainStatsResult>;

export interface BatchQueryDomainStatsResponse {
  /** A list of responses, one for each query in the BatchQueryDomainStatsRequest. The order of responses will correspond to the order of requests. */
  results?: Array<BatchQueryDomainStatsResult>;
}

export const BatchQueryDomainStatsResponse: Schema.Schema<BatchQueryDomainStatsResponse> = Schema.suspend(() => Schema.Struct({
  results: Schema.optional(Schema.Array(BatchQueryDomainStatsResult)),
})).annotate({ identifier: "BatchQueryDomainStatsResponse" }) as any as Schema.Schema<BatchQueryDomainStatsResponse>;

export interface ComplianceStatus {
  /** Output only. The compliance status. */
  status?: "STATE_UNSPECIFIED" | "COMPLIANT" | "NEEDS_WORK" | (string & {});
}

export const ComplianceStatus: Schema.Schema<ComplianceStatus> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(Schema.String),
})).annotate({ identifier: "ComplianceStatus" }) as any as Schema.Schema<ComplianceStatus>;

export interface ComplianceRowData {
  /** The compliance requirement. */
  requirement?: "COMPLIANCE_REQUIREMENT_UNSPECIFIED" | "SPF" | "DKIM" | "SPF_AND_DKIM" | "DMARC_POLICY" | "DMARC_ALIGNMENT" | "MESSAGE_FORMATTING" | "DNS_RECORDS" | "ENCRYPTION" | "USER_REPORTED_SPAM_RATE" | "ONE_CLICK_UNSUBSCRIBE" | "HONOR_UNSUBSCRIBE" | (string & {});
  /** The compliance status for the requirement. */
  status?: ComplianceStatus;
}

export const ComplianceRowData: Schema.Schema<ComplianceRowData> = Schema.suspend(() => Schema.Struct({
  requirement: Schema.optional(Schema.String),
  status: Schema.optional(ComplianceStatus),
})).annotate({ identifier: "ComplianceRowData" }) as any as Schema.Schema<ComplianceRowData>;

export interface OneClickUnsubscribeVerdict {
  /** The compliance status. */
  status?: ComplianceStatus;
  /** The specific reason for the compliance verdict. Must be empty if the status is compliant. */
  reason?: "REASON_UNSPECIFIED" | "NO_UNSUB_GENERAL" | "NO_UNSUB_SPAM_REPORTS" | "NO_UNSUB_PROMO_SPAM_REPORTS" | (string & {});
}

export const OneClickUnsubscribeVerdict: Schema.Schema<OneClickUnsubscribeVerdict> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(ComplianceStatus),
  reason: Schema.optional(Schema.String),
})).annotate({ identifier: "OneClickUnsubscribeVerdict" }) as any as Schema.Schema<OneClickUnsubscribeVerdict>;

export interface HonorUnsubscribeVerdict {
  /** The compliance status. */
  status?: ComplianceStatus;
  /** The specific reason for the compliance verdict. Must be empty if the status is compliant. */
  reason?: "REASON_UNSPECIFIED" | "NOT_HONORING" | "NOT_HONORING_TOO_FEW_CAMPAIGNS" | "NOT_HONORING_TOO_MANY_CAMPAIGNS" | (string & {});
}

export const HonorUnsubscribeVerdict: Schema.Schema<HonorUnsubscribeVerdict> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(ComplianceStatus),
  reason: Schema.optional(Schema.String),
})).annotate({ identifier: "HonorUnsubscribeVerdict" }) as any as Schema.Schema<HonorUnsubscribeVerdict>;

export interface DomainComplianceData {
  /** Domain that this data is for. */
  domainId?: string;
  /** Data for each of the rows of the table. Each message contains all the data that backs a single row. */
  rowData?: Array<ComplianceRowData>;
  /** One-click unsubscribe compliance verdict. */
  oneClickUnsubscribeVerdict?: OneClickUnsubscribeVerdict;
  /** Unsubscribe honoring compliance verdict. */
  honorUnsubscribeVerdict?: HonorUnsubscribeVerdict;
}

export const DomainComplianceData: Schema.Schema<DomainComplianceData> = Schema.suspend(() => Schema.Struct({
  domainId: Schema.optional(Schema.String),
  rowData: Schema.optional(Schema.Array(ComplianceRowData)),
  oneClickUnsubscribeVerdict: Schema.optional(OneClickUnsubscribeVerdict),
  honorUnsubscribeVerdict: Schema.optional(HonorUnsubscribeVerdict),
})).annotate({ identifier: "DomainComplianceData" }) as any as Schema.Schema<DomainComplianceData>;

export interface DomainComplianceStatus {
  /** Identifier. The resource name of the domain's compliance status. Format: `domains/{domain_id}/complianceStatus`. */
  name?: string;
  /** Compliance data for the registrable domain part of the domain in `name`. For example, if `name` is `domains/example.com/complianceStatus`, this field contains compliance data for `example.com`. */
  complianceData?: DomainComplianceData;
  /** Compliance data calculated specifically for the subdomain in `name`. This field is only populated if the domain in `name` is a subdomain that differs from its registrable domain (e.g., `sub.example.com`), and if compliance data is available for that specific subdomain. */
  subdomainComplianceData?: DomainComplianceData;
}

export const DomainComplianceStatus: Schema.Schema<DomainComplianceStatus> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  complianceData: Schema.optional(DomainComplianceData),
  subdomainComplianceData: Schema.optional(DomainComplianceData),
})).annotate({ identifier: "DomainComplianceStatus" }) as any as Schema.Schema<DomainComplianceStatus>;

// ==========================================================================
// Operations
// ==========================================================================

/** Retrieves detailed information about a domain registered by you. Returns NOT_FOUND if the domain is not registered by you. Domain represents the metadata of a domain that has been registered within the system and linked to a user. */
export interface GetDomainsRequest {
  /** Required. The resource name of the domain. Format: `domains/{domain_name}`, where domain_name is the fully qualified domain name (i.e., mymail.mydomain.com). */
  name: string;
}

export const GetDomainsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/domains/{domainsId}" }),
  svc,
) as unknown as Schema.Schema<GetDomainsRequest>;

export type GetDomainsResponse = Domain;
export const GetDomainsResponse = Domain;

export type GetDomainsError = CommonErrors;

export const getDomains: API.OperationMethod<GetDomainsRequest, GetDomainsResponse, GetDomainsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetDomainsRequest,
  output: GetDomainsResponse,
  errors: [],
}));

/** Retrieves a list of all domains registered by you, along with their corresponding metadata. The order of domains in the response is unspecified and non-deterministic. Newly registered domains will not necessarily be added to the end of this list. */
export interface ListDomainsRequest {
  /** Optional. Requested page size. Server may return fewer domains than requested. If unspecified, the default value for this field is 10. The maximum value for this field is 200. */
  pageSize?: number;
  /** Optional. The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
}

export const ListDomainsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2/domains" }),
  svc,
) as unknown as Schema.Schema<ListDomainsRequest>;

export type ListDomainsResponse_Op = ListDomainsResponse;
export const ListDomainsResponse_Op = ListDomainsResponse;

export type ListDomainsError = CommonErrors;

export const listDomains = API.makePaginated(() => ({
  input: ListDomainsRequest,
  output: ListDomainsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieves the compliance status for a given domain. Returns PERMISSION_DENIED if you don't have permission to access compliance status for the domain. */
export interface GetComplianceStatusDomainsRequest {
  /** Required. The resource name of the domain's compliance status to retrieve. Format: `domains/{domain_id}/complianceStatus`. */
  name: string;
}

export const GetComplianceStatusDomainsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/domains/{domainsId}/complianceStatus" }),
  svc,
) as unknown as Schema.Schema<GetComplianceStatusDomainsRequest>;

export type GetComplianceStatusDomainsResponse = DomainComplianceStatus;
export const GetComplianceStatusDomainsResponse = DomainComplianceStatus;

export type GetComplianceStatusDomainsError = CommonErrors;

export const getComplianceStatusDomains: API.OperationMethod<GetComplianceStatusDomainsRequest, GetComplianceStatusDomainsResponse, GetComplianceStatusDomainsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetComplianceStatusDomainsRequest,
  output: GetComplianceStatusDomainsResponse,
  errors: [],
}));

/** Retrieves a list of domain statistics for a given domain and time period. Returns statistics only for dates where data is available. Returns PERMISSION_DENIED if you don't have permission to access DomainStats for the domain. */
export interface QueryDomainsDomainStatsRequest {
  /** Required. The parent resource name where the stats are queried. Format: domains/{domain} */
  parent: string;
  /** Request body */
  body?: QueryDomainStatsRequest;
}

export const QueryDomainsDomainStatsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(QueryDomainStatsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/domains/{domainsId}/domainStats:query", hasBody: true }),
  svc,
) as unknown as Schema.Schema<QueryDomainsDomainStatsRequest>;

export type QueryDomainsDomainStatsResponse = QueryDomainStatsResponse;
export const QueryDomainsDomainStatsResponse = QueryDomainStatsResponse;

export type QueryDomainsDomainStatsError = CommonErrors;

export const queryDomainsDomainStats: API.OperationMethod<QueryDomainsDomainStatsRequest, QueryDomainsDomainStatsResponse, QueryDomainsDomainStatsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: QueryDomainsDomainStatsRequest,
  output: QueryDomainsDomainStatsResponse,
  errors: [],
}));

/** Executes a batch of QueryDomainStats requests for multiple domains. Returns PERMISSION_DENIED if you don't have permission to access DomainStats for any of the requested domains. */
export interface BatchQueryDomainStatsRequest_Op {
  /** Request body */
  body?: BatchQueryDomainStatsRequest;
}

export const BatchQueryDomainStatsRequest_Op = Schema.Struct({
  body: Schema.optional(BatchQueryDomainStatsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/domainStats:batchQuery", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchQueryDomainStatsRequest_Op>;

export type BatchQueryDomainStatsResponse_Op = BatchQueryDomainStatsResponse;
export const BatchQueryDomainStatsResponse_Op = BatchQueryDomainStatsResponse;

export type BatchQueryDomainStatsError = CommonErrors;

export const batchQueryDomainStats: API.OperationMethod<BatchQueryDomainStatsRequest_Op, BatchQueryDomainStatsResponse_Op, BatchQueryDomainStatsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchQueryDomainStatsRequest_Op,
  output: BatchQueryDomainStatsResponse_Op,
  errors: [],
}));

