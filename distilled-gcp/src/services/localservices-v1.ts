// ==========================================================================
// Local Services API (localservices v1)
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
  name: "localservices",
  version: "v1",
  rootUrl: "https://localservices.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleAdsHomeservicesLocalservicesV1PhoneLead {
  /** Timestamp of the phone call which resulted in a charged phone lead. */
  chargedCallTimestamp?: string;
  /** Duration of the charged phone call in seconds. */
  chargedConnectedCallDurationSeconds?: string;
  /** Consumer phone number associated with the phone lead. */
  consumerPhoneNumber?: string;
}

export const GoogleAdsHomeservicesLocalservicesV1PhoneLead: Schema.Schema<GoogleAdsHomeservicesLocalservicesV1PhoneLead> = Schema.suspend(() => Schema.Struct({
  chargedCallTimestamp: Schema.optional(Schema.String),
  chargedConnectedCallDurationSeconds: Schema.optional(Schema.String),
  consumerPhoneNumber: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsHomeservicesLocalservicesV1PhoneLead" }) as any as Schema.Schema<GoogleAdsHomeservicesLocalservicesV1PhoneLead>;

export interface GoogleTypeTimeZone {
  /** IANA Time Zone Database time zone. For example "America/New_York". */
  id?: string;
  /** Optional. IANA Time Zone Database version number. For example "2019a". */
  version?: string;
}

export const GoogleTypeTimeZone: Schema.Schema<GoogleTypeTimeZone> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleTypeTimeZone" }) as any as Schema.Schema<GoogleTypeTimeZone>;

export interface GoogleAdsHomeservicesLocalservicesV1AggregatorInfo {
  /** Provider id (listed in aggregator system) which maps to a account id in GLS system. */
  aggregatorProviderId?: string;
}

export const GoogleAdsHomeservicesLocalservicesV1AggregatorInfo: Schema.Schema<GoogleAdsHomeservicesLocalservicesV1AggregatorInfo> = Schema.suspend(() => Schema.Struct({
  aggregatorProviderId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsHomeservicesLocalservicesV1AggregatorInfo" }) as any as Schema.Schema<GoogleAdsHomeservicesLocalservicesV1AggregatorInfo>;

export interface GoogleAdsHomeservicesLocalservicesV1BookingLead {
  /** Timestamp of when service is provided by advertiser. */
  bookingAppointmentTimestamp?: string;
  /** The job type of the specified lead. */
  jobType?: string;
  /** Consumer email associated with the booking lead. */
  consumerEmail?: string;
  /** Consumer phone number associated with the booking lead. */
  consumerPhoneNumber?: string;
  /** Name of the customer who created the lead. */
  customerName?: string;
}

export const GoogleAdsHomeservicesLocalservicesV1BookingLead: Schema.Schema<GoogleAdsHomeservicesLocalservicesV1BookingLead> = Schema.suspend(() => Schema.Struct({
  bookingAppointmentTimestamp: Schema.optional(Schema.String),
  jobType: Schema.optional(Schema.String),
  consumerEmail: Schema.optional(Schema.String),
  consumerPhoneNumber: Schema.optional(Schema.String),
  customerName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsHomeservicesLocalservicesV1BookingLead" }) as any as Schema.Schema<GoogleAdsHomeservicesLocalservicesV1BookingLead>;

export interface GoogleAdsHomeservicesLocalservicesV1MessageLead {
  /** Consumer phone number associated with the message lead. */
  consumerPhoneNumber?: string;
  /** Name of the customer who created the lead. */
  customerName?: string;
  /** The postal code of the customer who created the lead. */
  postalCode?: string;
  /** The job type of the specified lead. */
  jobType?: string;
}

export const GoogleAdsHomeservicesLocalservicesV1MessageLead: Schema.Schema<GoogleAdsHomeservicesLocalservicesV1MessageLead> = Schema.suspend(() => Schema.Struct({
  consumerPhoneNumber: Schema.optional(Schema.String),
  customerName: Schema.optional(Schema.String),
  postalCode: Schema.optional(Schema.String),
  jobType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsHomeservicesLocalservicesV1MessageLead" }) as any as Schema.Schema<GoogleAdsHomeservicesLocalservicesV1MessageLead>;

export interface GoogleAdsHomeservicesLocalservicesV1DetailedLeadReport {
  /** Dispute status related to the lead. */
  disputeStatus?: string;
  /** Timestamp of when the lead was created. */
  leadCreationTimestamp?: string;
  /** Identifies account that received the lead. */
  accountId?: string;
  /** Aggregator specific information related to the lead. */
  aggregatorInfo?: GoogleAdsHomeservicesLocalservicesV1AggregatorInfo;
  /** More information associated to only phone leads. */
  phoneLead?: GoogleAdsHomeservicesLocalservicesV1PhoneLead;
  /** Business name associated to the account. */
  businessName?: string;
  /** Lead type. */
  leadType?: "LEAD_TYPE_UNSPECIFIED" | "MESSAGE" | "PHONE_CALL" | "BOOKING" | (string & {});
  /** More information associated to only booking leads. */
  bookingLead?: GoogleAdsHomeservicesLocalservicesV1BookingLead;
  /** Location of the associated account's home city. */
  geo?: string;
  /** Price of the lead (available only after it has been charged). */
  leadPrice?: number;
  /** Deprecated in favor of google_ads_lead_id. Unique identifier of a Detailed Lead Report. */
  leadId?: string;
  /** More information associated to only message leads. */
  messageLead?: GoogleAdsHomeservicesLocalservicesV1MessageLead;
  /** Whether the lead has been charged. */
  chargeStatus?: "CHARGE_STATUS_UNSPECIFIED" | "CHARGED" | "NOT_CHARGED" | (string & {});
  /** Unique identifier of a Detailed Lead Report. */
  googleAdsLeadId?: string;
  /** Lead category (e.g. hvac, plumber) */
  leadCategory?: string;
  /** Currency code. */
  currencyCode?: string;
  /** Timezone of the particular provider associated to a lead. */
  timezone?: GoogleTypeTimeZone;
}

export const GoogleAdsHomeservicesLocalservicesV1DetailedLeadReport: Schema.Schema<GoogleAdsHomeservicesLocalservicesV1DetailedLeadReport> = Schema.suspend(() => Schema.Struct({
  disputeStatus: Schema.optional(Schema.String),
  leadCreationTimestamp: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  aggregatorInfo: Schema.optional(GoogleAdsHomeservicesLocalservicesV1AggregatorInfo),
  phoneLead: Schema.optional(GoogleAdsHomeservicesLocalservicesV1PhoneLead),
  businessName: Schema.optional(Schema.String),
  leadType: Schema.optional(Schema.String),
  bookingLead: Schema.optional(GoogleAdsHomeservicesLocalservicesV1BookingLead),
  geo: Schema.optional(Schema.String),
  leadPrice: Schema.optional(Schema.Number),
  leadId: Schema.optional(Schema.String),
  messageLead: Schema.optional(GoogleAdsHomeservicesLocalservicesV1MessageLead),
  chargeStatus: Schema.optional(Schema.String),
  googleAdsLeadId: Schema.optional(Schema.String),
  leadCategory: Schema.optional(Schema.String),
  currencyCode: Schema.optional(Schema.String),
  timezone: Schema.optional(GoogleTypeTimeZone),
})).annotate({ identifier: "GoogleAdsHomeservicesLocalservicesV1DetailedLeadReport" }) as any as Schema.Schema<GoogleAdsHomeservicesLocalservicesV1DetailedLeadReport>;

export interface GoogleAdsHomeservicesLocalservicesV1SearchDetailedLeadReportsResponse {
  /** Pagination token to retrieve the next page of results. When `next_page_token` is not filled in, there is no next page and the list returned is the last page in the result set. */
  nextPageToken?: string;
  /** List of detailed lead reports uniquely identified by external lead id. */
  detailedLeadReports?: Array<GoogleAdsHomeservicesLocalservicesV1DetailedLeadReport>;
}

export const GoogleAdsHomeservicesLocalservicesV1SearchDetailedLeadReportsResponse: Schema.Schema<GoogleAdsHomeservicesLocalservicesV1SearchDetailedLeadReportsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  detailedLeadReports: Schema.optional(Schema.Array(GoogleAdsHomeservicesLocalservicesV1DetailedLeadReport)),
})).annotate({ identifier: "GoogleAdsHomeservicesLocalservicesV1SearchDetailedLeadReportsResponse" }) as any as Schema.Schema<GoogleAdsHomeservicesLocalservicesV1SearchDetailedLeadReportsResponse>;

export interface GoogleAdsHomeservicesLocalservicesV1AccountReport {
  /** Number of phone calls in current specified period, including both connected and unconnected calls. */
  currentPeriodPhoneCalls?: string;
  /** Total cost of the account in previous specified period in the account's specified currency. */
  previousPeriodTotalCost?: number;
  /** Number of charged leads the account received in current specified period. */
  currentPeriodChargedLeads?: string;
  /** Number of charged leads the account received in previous specified period. */
  previousPeriodChargedLeads?: string;
  /** Unique identifier of the GLS account. */
  accountId?: string;
  /** Phone lead responsiveness of the account for the past 90 days from current date. This is computed by taking the total number of connected calls from charged phone leads and dividing by the total number of calls received. */
  phoneLeadResponsiveness?: number;
  /** Total cost of the account in current specified period in the account's specified currency. */
  currentPeriodTotalCost?: number;
  /** Aggregator specific information related to the account. */
  aggregatorInfo?: GoogleAdsHomeservicesLocalservicesV1AggregatorInfo;
  /** Business name of the account. */
  businessName?: string;
  /** Average weekly budget in the currency code of the account. */
  averageWeeklyBudget?: number;
  /** Number of connected phone calls (duration over 30s) in previous specified period. */
  previousPeriodConnectedPhoneCalls?: string;
  /** Total number of reviews the account has up to current date. */
  totalReview?: number;
  /** Number of impressions that customers have had in the past 2 days. */
  impressionsLastTwoDays?: string;
  /** Number of connected phone calls (duration over 30s) in current specified period. */
  currentPeriodConnectedPhoneCalls?: string;
  /** Number of phone calls in previous specified period, including both connected and unconnected calls. */
  previousPeriodPhoneCalls?: string;
  /** Currency code of the account. */
  currencyCode?: string;
  /** Average review rating score from 1-5 stars. */
  averageFiveStarRating?: number;
}

export const GoogleAdsHomeservicesLocalservicesV1AccountReport: Schema.Schema<GoogleAdsHomeservicesLocalservicesV1AccountReport> = Schema.suspend(() => Schema.Struct({
  currentPeriodPhoneCalls: Schema.optional(Schema.String),
  previousPeriodTotalCost: Schema.optional(Schema.Number),
  currentPeriodChargedLeads: Schema.optional(Schema.String),
  previousPeriodChargedLeads: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  phoneLeadResponsiveness: Schema.optional(Schema.Number),
  currentPeriodTotalCost: Schema.optional(Schema.Number),
  aggregatorInfo: Schema.optional(GoogleAdsHomeservicesLocalservicesV1AggregatorInfo),
  businessName: Schema.optional(Schema.String),
  averageWeeklyBudget: Schema.optional(Schema.Number),
  previousPeriodConnectedPhoneCalls: Schema.optional(Schema.String),
  totalReview: Schema.optional(Schema.Number),
  impressionsLastTwoDays: Schema.optional(Schema.String),
  currentPeriodConnectedPhoneCalls: Schema.optional(Schema.String),
  previousPeriodPhoneCalls: Schema.optional(Schema.String),
  currencyCode: Schema.optional(Schema.String),
  averageFiveStarRating: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleAdsHomeservicesLocalservicesV1AccountReport" }) as any as Schema.Schema<GoogleAdsHomeservicesLocalservicesV1AccountReport>;

export interface GoogleAdsHomeservicesLocalservicesV1SearchAccountReportsResponse {
  /** List of account reports which maps 1:1 to a particular linked GLS account. */
  accountReports?: Array<GoogleAdsHomeservicesLocalservicesV1AccountReport>;
  /** Pagination token to retrieve the next page of results. When `next_page_token` is not filled in, there is no next page and the list returned is the last page in the result set. */
  nextPageToken?: string;
}

export const GoogleAdsHomeservicesLocalservicesV1SearchAccountReportsResponse: Schema.Schema<GoogleAdsHomeservicesLocalservicesV1SearchAccountReportsResponse> = Schema.suspend(() => Schema.Struct({
  accountReports: Schema.optional(Schema.Array(GoogleAdsHomeservicesLocalservicesV1AccountReport)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAdsHomeservicesLocalservicesV1SearchAccountReportsResponse" }) as any as Schema.Schema<GoogleAdsHomeservicesLocalservicesV1SearchAccountReportsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface SearchAccountReportsRequest {
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  "endDate.day"?: number;
  /** The `next_page_token` value returned from a previous request to SearchAccountReports that indicates where listing should continue. Optional. */
  pageToken?: string;
  /** The maximum number of accounts to return. If the page size is unset, page size will default to 1000. Maximum page_size is 10000. Optional. */
  pageSize?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  "endDate.month"?: number;
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  "endDate.year"?: number;
  /** A query string for searching for account reports. Caller must provide a customer id of their MCC account with an associated Gaia Mint that allows read permission on their linked accounts. Search expressions are case insensitive. Example query: | Query | Description | |-------------------------|-----------------------------------------------| | manager_customer_id:123 | Get Account Report for Manager with id 123. | Required. */
  query?: string;
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  "startDate.year"?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  "startDate.month"?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  "startDate.day"?: number;
}

export const SearchAccountReportsRequest = Schema.Struct({
  "endDate.day": Schema.optional(Schema.Number).pipe(T.HttpQuery("endDate.day")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  "endDate.month": Schema.optional(Schema.Number).pipe(T.HttpQuery("endDate.month")),
  "endDate.year": Schema.optional(Schema.Number).pipe(T.HttpQuery("endDate.year")),
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
  "startDate.year": Schema.optional(Schema.Number).pipe(T.HttpQuery("startDate.year")),
  "startDate.month": Schema.optional(Schema.Number).pipe(T.HttpQuery("startDate.month")),
  "startDate.day": Schema.optional(Schema.Number).pipe(T.HttpQuery("startDate.day")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accountReports:search" }),
  svc,
) as unknown as Schema.Schema<SearchAccountReportsRequest>;

export type SearchAccountReportsResponse = GoogleAdsHomeservicesLocalservicesV1SearchAccountReportsResponse;
export const SearchAccountReportsResponse = GoogleAdsHomeservicesLocalservicesV1SearchAccountReportsResponse;

export type SearchAccountReportsError = CommonErrors;

/** Get account reports containing aggregate account data of all linked GLS accounts. Caller needs to provide their manager customer id and the associated auth credential that allows them read permissions on their linked accounts. */
export const searchAccountReports: API.PaginatedOperationMethod<SearchAccountReportsRequest, SearchAccountReportsResponse, SearchAccountReportsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: SearchAccountReportsRequest,
  output: SearchAccountReportsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface SearchDetailedLeadReportsRequest {
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  "startDate.month"?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  "startDate.day"?: number;
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  "startDate.year"?: number;
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  "endDate.year"?: number;
  /** A query string for searching for account reports. Caller must provide a customer id of their MCC account with an associated Gaia Mint that allows read permission on their linked accounts. Search expressions are case insensitive. Example query: | Query | Description | |-------------------------|-----------------------------------------------| | manager_customer_id:123 | Get Detailed Lead Report for Manager with id | | | 123. | Required. */
  query?: string;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  "endDate.day"?: number;
  /** The `next_page_token` value returned from a previous request to SearchDetailedLeadReports that indicates where listing should continue. Optional. */
  pageToken?: string;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  "endDate.month"?: number;
  /** The maximum number of accounts to return. If the page size is unset, page size will default to 1000. Maximum page_size is 10000. Optional. */
  pageSize?: number;
}

export const SearchDetailedLeadReportsRequest = Schema.Struct({
  "startDate.month": Schema.optional(Schema.Number).pipe(T.HttpQuery("startDate.month")),
  "startDate.day": Schema.optional(Schema.Number).pipe(T.HttpQuery("startDate.day")),
  "startDate.year": Schema.optional(Schema.Number).pipe(T.HttpQuery("startDate.year")),
  "endDate.year": Schema.optional(Schema.Number).pipe(T.HttpQuery("endDate.year")),
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
  "endDate.day": Schema.optional(Schema.Number).pipe(T.HttpQuery("endDate.day")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  "endDate.month": Schema.optional(Schema.Number).pipe(T.HttpQuery("endDate.month")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/detailedLeadReports:search" }),
  svc,
) as unknown as Schema.Schema<SearchDetailedLeadReportsRequest>;

export type SearchDetailedLeadReportsResponse = GoogleAdsHomeservicesLocalservicesV1SearchDetailedLeadReportsResponse;
export const SearchDetailedLeadReportsResponse = GoogleAdsHomeservicesLocalservicesV1SearchDetailedLeadReportsResponse;

export type SearchDetailedLeadReportsError = CommonErrors;

/** Get detailed lead reports containing leads that have been received by all linked GLS accounts. Caller needs to provide their manager customer id and the associated auth credential that allows them read permissions on their linked accounts. */
export const searchDetailedLeadReports: API.PaginatedOperationMethod<SearchDetailedLeadReportsRequest, SearchDetailedLeadReportsResponse, SearchDetailedLeadReportsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: SearchDetailedLeadReportsRequest,
  output: SearchDetailedLeadReportsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

