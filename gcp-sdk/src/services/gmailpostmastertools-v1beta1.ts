// ==========================================================================
// Gmail Postmaster Tools API (gmailpostmastertools v1beta1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import * as C from "../category";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "gmailpostmastertools",
  version: "v1beta1",
  rootUrl: "https://gmailpostmastertools.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface DeliveryError {
  /** The class of delivery error. */
  errorClass?: "DELIVERY_ERROR_CLASS_UNSPECIFIED" | "PERMANENT_ERROR" | "TEMPORARY_ERROR" | (string & {});
  /** The ratio of messages where the error occurred vs all authenticated traffic. */
  errorRatio?: number;
  /** The type of delivery error. */
  errorType?: "DELIVERY_ERROR_TYPE_UNSPECIFIED" | "RATE_LIMIT_EXCEEDED" | "SUSPECTED_SPAM" | "CONTENT_SPAMMY" | "BAD_ATTACHMENT" | "BAD_DMARC_POLICY" | "LOW_IP_REPUTATION" | "LOW_DOMAIN_REPUTATION" | "IP_IN_RBL" | "DOMAIN_IN_RBL" | "BAD_PTR_RECORD" | (string & {});
}

export const DeliveryError: Schema.Schema<DeliveryError> = Schema.suspend(() => Schema.Struct({
  errorClass: Schema.optional(Schema.String),
  errorRatio: Schema.optional(Schema.Number),
  errorType: Schema.optional(Schema.String),
})).annotate({ identifier: "DeliveryError" }) as any as Schema.Schema<DeliveryError>;

export interface Domain {
  /** The resource name of the Domain. Domain names have the form `domains/{domain_name}`, where domain_name is the fully qualified domain name (i.e., mymail.mydomain.com). */
  name?: string;
  /** Timestamp when the user registered this domain. Assigned by the server. */
  createTime?: string;
  /** User’s permission for this domain. Assigned by the server. */
  permission?: "PERMISSION_UNSPECIFIED" | "OWNER" | "READER" | "NONE" | (string & {});
}

export const Domain: Schema.Schema<Domain> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  permission: Schema.optional(Schema.String),
})).annotate({ identifier: "Domain" }) as any as Schema.Schema<Domain>;

export interface ListDomainsResponse {
  /** The list of domains. */
  domains?: Array<Domain>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const ListDomainsResponse: Schema.Schema<ListDomainsResponse> = Schema.suspend(() => Schema.Struct({
  domains: Schema.optional(Schema.Array(Domain)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListDomainsResponse" }) as any as Schema.Schema<ListDomainsResponse>;

export interface FeedbackLoop {
  /** The ratio of user marked spam messages with the identifier vs the total number of inboxed messages with that identifier. */
  spamRatio?: number;
  /** Feedback loop identifier that uniquely identifies individual campaigns. */
  id?: string;
}

export const FeedbackLoop: Schema.Schema<FeedbackLoop> = Schema.suspend(() => Schema.Struct({
  spamRatio: Schema.optional(Schema.Number),
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "FeedbackLoop" }) as any as Schema.Schema<FeedbackLoop>;

export interface IpReputation {
  /** Total number of unique IPs in this reputation category. This metric only pertains to traffic that passed [SPF](http://www.openspf.org/) or [DKIM](http://www.dkim.org/). */
  ipCount?: string;
  /** The reputation category this IP reputation represents. */
  reputation?: "REPUTATION_CATEGORY_UNSPECIFIED" | "HIGH" | "MEDIUM" | "LOW" | "BAD" | (string & {});
  /** Total number of unique IPs in this reputation category. This metric only pertains to traffic that passed [SPF](http://www.openspf.org/) or [DKIM](http://www.dkim.org/). Deprecated to be complied with ApiLinter for Quantities. Use ip_count instead. */
  numIps?: string;
  /** A sample of IPs in this reputation category. */
  sampleIps?: Array<string>;
}

export const IpReputation: Schema.Schema<IpReputation> = Schema.suspend(() => Schema.Struct({
  ipCount: Schema.optional(Schema.String),
  reputation: Schema.optional(Schema.String),
  numIps: Schema.optional(Schema.String),
  sampleIps: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "IpReputation" }) as any as Schema.Schema<IpReputation>;

export interface TrafficStats {
  /** The resource name of the traffic statistics. Traffic statistic names have the form `domains/{domain}/trafficStats/{date}`, where domain_name is the fully qualified domain name (i.e., mymail.mydomain.com) of the domain this traffic statistics pertains to and date is the date in yyyymmdd format that these statistics corresponds to. For example: domains/mymail.mydomain.com/trafficStats/20160807 */
  name?: string;
  /** The ratio of incoming mail (to Gmail), that passed secure transport (TLS) vs all mail received from that domain. This metric only pertains to traffic that passed [SPF](http://www.openspf.org/) or [DKIM](http://www.dkim.org/). */
  inboundEncryptionRatio?: number;
  /** Delivery errors for the domain. This metric only pertains to traffic that passed [SPF](http://www.openspf.org/) or [DKIM](http://www.dkim.org/). */
  deliveryErrors?: Array<DeliveryError>;
  /** The ratio of mail that successfully authenticated with SPF vs. all mail that attempted to authenticate with [SPF](http://www.openspf.org/). Spoofed mail is excluded. */
  spfSuccessRatio?: number;
  /** Reputation of the domain. */
  domainReputation?: "REPUTATION_CATEGORY_UNSPECIFIED" | "HIGH" | "MEDIUM" | "LOW" | "BAD" | (string & {});
  /** The ratio of outgoing mail (from Gmail) that was accepted over secure transport (TLS). */
  outboundEncryptionRatio?: number;
  /** Spammy [Feedback loop identifiers] (https://support.google.com/mail/answer/6254652) with their individual spam rates. This metric only pertains to traffic that is authenticated by [DKIM](http://www.dkim.org/). */
  spammyFeedbackLoops?: Array<FeedbackLoop>;
  /** Reputation information pertaining to the IP addresses of the email servers for the domain. There is exactly one entry for each reputation category except REPUTATION_CATEGORY_UNSPECIFIED. */
  ipReputations?: Array<IpReputation>;
  /** The ratio of mail that successfully authenticated with DKIM vs. all mail that attempted to authenticate with [DKIM](http://www.dkim.org/). Spoofed mail is excluded. */
  dkimSuccessRatio?: number;
  /** The ratio of mail that passed [DMARC](https://dmarc.org/) alignment checks vs all mail received from the domain that successfully authenticated with either of [SPF](http://www.openspf.org/) or [DKIM](http://www.dkim.org/). */
  dmarcSuccessRatio?: number;
  /** The lower bound of the confidence interval for the user reported spam ratio. If this field is set, then the value of userReportedSpamRatio is set to the midpoint of this interval and is thus inexact. However, the true ratio is guaranteed to be in between this lower bound and the corresponding upper bound 95% of the time. This metric only pertains to emails authenticated by [DKIM](http://www.dkim.org/). */
  userReportedSpamRatioLowerBound?: number;
  /** The ratio of user-report spam vs. email that was sent to the inbox. This is potentially inexact -- users may want to refer to the description of the interval fields userReportedSpamRatioLowerBound and userReportedSpamRatioUpperBound for more explicit accuracy guarantees. This metric only pertains to emails authenticated by [DKIM](http://www.dkim.org/). */
  userReportedSpamRatio?: number;
  /** The upper bound of the confidence interval for the user reported spam ratio. If this field is set, then the value of userReportedSpamRatio is set to the midpoint of this interval and is thus inexact. However, the true ratio is guaranteed to be in between this upper bound and the corresponding lower bound 95% of the time. This metric only pertains to emails authenticated by [DKIM](http://www.dkim.org/). */
  userReportedSpamRatioUpperBound?: number;
}

export const TrafficStats: Schema.Schema<TrafficStats> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  inboundEncryptionRatio: Schema.optional(Schema.Number),
  deliveryErrors: Schema.optional(Schema.Array(DeliveryError)),
  spfSuccessRatio: Schema.optional(Schema.Number),
  domainReputation: Schema.optional(Schema.String),
  outboundEncryptionRatio: Schema.optional(Schema.Number),
  spammyFeedbackLoops: Schema.optional(Schema.Array(FeedbackLoop)),
  ipReputations: Schema.optional(Schema.Array(IpReputation)),
  dkimSuccessRatio: Schema.optional(Schema.Number),
  dmarcSuccessRatio: Schema.optional(Schema.Number),
  userReportedSpamRatioLowerBound: Schema.optional(Schema.Number),
  userReportedSpamRatio: Schema.optional(Schema.Number),
  userReportedSpamRatioUpperBound: Schema.optional(Schema.Number),
})).annotate({ identifier: "TrafficStats" }) as any as Schema.Schema<TrafficStats>;

export interface ListTrafficStatsResponse {
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** The list of TrafficStats. */
  trafficStats?: Array<TrafficStats>;
}

export const ListTrafficStatsResponse: Schema.Schema<ListTrafficStatsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  trafficStats: Schema.optional(Schema.Array(TrafficStats)),
})).annotate({ identifier: "ListTrafficStatsResponse" }) as any as Schema.Schema<ListTrafficStatsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetDomainsRequest {
  /** The resource name of the domain. It should have the form `domains/{domain_name}`, where domain_name is the fully qualified domain name. */
  name: string;
}

export const GetDomainsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/domains/{domainsId}" }),
  svc,
) as unknown as Schema.Schema<GetDomainsRequest>;

export type GetDomainsResponse = Domain;
export const GetDomainsResponse = Domain;

export type GetDomainsError = DefaultErrors;

/** Gets a specific domain registered by the client. Returns NOT_FOUND if the domain does not exist. */
export const getDomains: API.OperationMethod<GetDomainsRequest, GetDomainsResponse, GetDomainsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetDomainsRequest,
  output: GetDomainsResponse,
  errors: [],
}));

export interface ListDomainsRequest {
  /** Requested page size. Server may return fewer domains than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** The next_page_token value returned from a previous List request, if any. This is the value of ListDomainsResponse.next_page_token returned from the previous call to `ListDomains` method. */
  pageToken?: string;
}

export const ListDomainsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/domains" }),
  svc,
) as unknown as Schema.Schema<ListDomainsRequest>;

export type ListDomainsResponse_Op = ListDomainsResponse;
export const ListDomainsResponse_Op = ListDomainsResponse;

export type ListDomainsError = DefaultErrors;

/** Lists the domains that have been registered by the client. The order of domains in the response is unspecified and non-deterministic. Newly created domains will not necessarily be added to the end of this list. */
export const listDomains: API.PaginatedOperationMethod<ListDomainsRequest, ListDomainsResponse_Op, ListDomainsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListDomainsRequest,
  output: ListDomainsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetDomainsTrafficStatsRequest {
  /** The resource name of the traffic statistics to get. E.g., domains/mymail.mydomain.com/trafficStats/20160807. */
  name: string;
}

export const GetDomainsTrafficStatsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/domains/{domainsId}/trafficStats/{trafficStatsId}" }),
  svc,
) as unknown as Schema.Schema<GetDomainsTrafficStatsRequest>;

export type GetDomainsTrafficStatsResponse = TrafficStats;
export const GetDomainsTrafficStatsResponse = TrafficStats;

export type GetDomainsTrafficStatsError = DefaultErrors;

/** Get traffic statistics for a domain on a specific date. Returns PERMISSION_DENIED if user does not have permission to access TrafficStats for the domain. */
export const getDomainsTrafficStats: API.OperationMethod<GetDomainsTrafficStatsRequest, GetDomainsTrafficStatsResponse, GetDomainsTrafficStatsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetDomainsTrafficStatsRequest,
  output: GetDomainsTrafficStatsResponse,
  errors: [],
}));

export interface ListDomainsTrafficStatsRequest {
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  "startDate.day"?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  "endDate.day"?: number;
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  "startDate.year"?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  "startDate.month"?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  "endDate.month"?: number;
  /** The next_page_token value returned from a previous List request, if any. This is the value of ListTrafficStatsResponse.next_page_token returned from the previous call to `ListTrafficStats` method. */
  pageToken?: string;
  /** The resource name of the domain whose traffic statistics we'd like to list. It should have the form `domains/{domain_name}`, where domain_name is the fully qualified domain name. */
  parent: string;
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  "endDate.year"?: number;
  /** Requested page size. Server may return fewer TrafficStats than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
}

export const ListDomainsTrafficStatsRequest = Schema.Struct({
  "startDate.day": Schema.optional(Schema.Number).pipe(T.HttpQuery("startDate.day")),
  "endDate.day": Schema.optional(Schema.Number).pipe(T.HttpQuery("endDate.day")),
  "startDate.year": Schema.optional(Schema.Number).pipe(T.HttpQuery("startDate.year")),
  "startDate.month": Schema.optional(Schema.Number).pipe(T.HttpQuery("startDate.month")),
  "endDate.month": Schema.optional(Schema.Number).pipe(T.HttpQuery("endDate.month")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  "endDate.year": Schema.optional(Schema.Number).pipe(T.HttpQuery("endDate.year")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/domains/{domainsId}/trafficStats" }),
  svc,
) as unknown as Schema.Schema<ListDomainsTrafficStatsRequest>;

export type ListDomainsTrafficStatsResponse = ListTrafficStatsResponse;
export const ListDomainsTrafficStatsResponse = ListTrafficStatsResponse;

export type ListDomainsTrafficStatsError = DefaultErrors;

/** List traffic statistics for all available days. Returns PERMISSION_DENIED if user does not have permission to access TrafficStats for the domain. */
export const listDomainsTrafficStats: API.PaginatedOperationMethod<ListDomainsTrafficStatsRequest, ListDomainsTrafficStatsResponse, ListDomainsTrafficStatsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListDomainsTrafficStatsRequest,
  output: ListDomainsTrafficStatsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

