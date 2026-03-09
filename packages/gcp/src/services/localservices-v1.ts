// ==========================================================================
// Local Services API (localservices v1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
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

export interface GoogleTypeTimeZone {
  /** Optional. IANA Time Zone Database version number. For example "2019a". */
  version?: string;
  /** IANA Time Zone Database time zone. For example "America/New_York". */
  id?: string;
}

export const GoogleTypeTimeZone: Schema.Schema<GoogleTypeTimeZone> =
  Schema.suspend(() =>
    Schema.Struct({
      version: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleTypeTimeZone",
  }) as any as Schema.Schema<GoogleTypeTimeZone>;

export interface GoogleAdsHomeservicesLocalservicesV1AggregatorInfo {
  /** Provider id (listed in aggregator system) which maps to a account id in GLS system. */
  aggregatorProviderId?: string;
}

export const GoogleAdsHomeservicesLocalservicesV1AggregatorInfo: Schema.Schema<GoogleAdsHomeservicesLocalservicesV1AggregatorInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      aggregatorProviderId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAdsHomeservicesLocalservicesV1AggregatorInfo",
  }) as any as Schema.Schema<GoogleAdsHomeservicesLocalservicesV1AggregatorInfo>;

export interface GoogleAdsHomeservicesLocalservicesV1MessageLead {
  /** The job type of the specified lead. */
  jobType?: string;
  /** Consumer phone number associated with the message lead. */
  consumerPhoneNumber?: string;
  /** Name of the customer who created the lead. */
  customerName?: string;
  /** The postal code of the customer who created the lead. */
  postalCode?: string;
}

export const GoogleAdsHomeservicesLocalservicesV1MessageLead: Schema.Schema<GoogleAdsHomeservicesLocalservicesV1MessageLead> =
  Schema.suspend(() =>
    Schema.Struct({
      jobType: Schema.optional(Schema.String),
      consumerPhoneNumber: Schema.optional(Schema.String),
      customerName: Schema.optional(Schema.String),
      postalCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAdsHomeservicesLocalservicesV1MessageLead",
  }) as any as Schema.Schema<GoogleAdsHomeservicesLocalservicesV1MessageLead>;

export interface GoogleAdsHomeservicesLocalservicesV1BookingLead {
  /** Timestamp of when service is provided by advertiser. */
  bookingAppointmentTimestamp?: string;
  /** Consumer phone number associated with the booking lead. */
  consumerPhoneNumber?: string;
  /** The job type of the specified lead. */
  jobType?: string;
  /** Consumer email associated with the booking lead. */
  consumerEmail?: string;
  /** Name of the customer who created the lead. */
  customerName?: string;
}

export const GoogleAdsHomeservicesLocalservicesV1BookingLead: Schema.Schema<GoogleAdsHomeservicesLocalservicesV1BookingLead> =
  Schema.suspend(() =>
    Schema.Struct({
      bookingAppointmentTimestamp: Schema.optional(Schema.String),
      consumerPhoneNumber: Schema.optional(Schema.String),
      jobType: Schema.optional(Schema.String),
      consumerEmail: Schema.optional(Schema.String),
      customerName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAdsHomeservicesLocalservicesV1BookingLead",
  }) as any as Schema.Schema<GoogleAdsHomeservicesLocalservicesV1BookingLead>;

export interface GoogleAdsHomeservicesLocalservicesV1PhoneLead {
  /** Timestamp of the phone call which resulted in a charged phone lead. */
  chargedCallTimestamp?: string;
  /** Duration of the charged phone call in seconds. */
  chargedConnectedCallDurationSeconds?: string;
  /** Consumer phone number associated with the phone lead. */
  consumerPhoneNumber?: string;
}

export const GoogleAdsHomeservicesLocalservicesV1PhoneLead: Schema.Schema<GoogleAdsHomeservicesLocalservicesV1PhoneLead> =
  Schema.suspend(() =>
    Schema.Struct({
      chargedCallTimestamp: Schema.optional(Schema.String),
      chargedConnectedCallDurationSeconds: Schema.optional(Schema.String),
      consumerPhoneNumber: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAdsHomeservicesLocalservicesV1PhoneLead",
  }) as any as Schema.Schema<GoogleAdsHomeservicesLocalservicesV1PhoneLead>;

export interface GoogleAdsHomeservicesLocalservicesV1DetailedLeadReport {
  /** Currency code. */
  currencyCode?: string;
  /** Timezone of the particular provider associated to a lead. */
  timezone?: GoogleTypeTimeZone;
  /** Deprecated in favor of google_ads_lead_id. Unique identifier of a Detailed Lead Report. */
  leadId?: string;
  /** Timestamp of when the lead was created. */
  leadCreationTimestamp?: string;
  /** Aggregator specific information related to the lead. */
  aggregatorInfo?: GoogleAdsHomeservicesLocalservicesV1AggregatorInfo;
  /** Unique identifier of a Detailed Lead Report. */
  googleAdsLeadId?: string;
  /** More information associated to only message leads. */
  messageLead?: GoogleAdsHomeservicesLocalservicesV1MessageLead;
  /** Whether the lead has been charged. */
  chargeStatus?:
    | "CHARGE_STATUS_UNSPECIFIED"
    | "CHARGED"
    | "NOT_CHARGED"
    | (string & {});
  /** Dispute status related to the lead. */
  disputeStatus?: string;
  /** Lead type. */
  leadType?:
    | "LEAD_TYPE_UNSPECIFIED"
    | "MESSAGE"
    | "PHONE_CALL"
    | "BOOKING"
    | (string & {});
  /** Location of the associated account's home city. */
  geo?: string;
  /** More information associated to only booking leads. */
  bookingLead?: GoogleAdsHomeservicesLocalservicesV1BookingLead;
  /** Identifies account that received the lead. */
  accountId?: string;
  /** Price of the lead (available only after it has been charged). */
  leadPrice?: number;
  /** More information associated to only phone leads. */
  phoneLead?: GoogleAdsHomeservicesLocalservicesV1PhoneLead;
  /** Lead category (e.g. hvac, plumber) */
  leadCategory?: string;
  /** Business name associated to the account. */
  businessName?: string;
}

export const GoogleAdsHomeservicesLocalservicesV1DetailedLeadReport: Schema.Schema<GoogleAdsHomeservicesLocalservicesV1DetailedLeadReport> =
  Schema.suspend(() =>
    Schema.Struct({
      currencyCode: Schema.optional(Schema.String),
      timezone: Schema.optional(GoogleTypeTimeZone),
      leadId: Schema.optional(Schema.String),
      leadCreationTimestamp: Schema.optional(Schema.String),
      aggregatorInfo: Schema.optional(
        GoogleAdsHomeservicesLocalservicesV1AggregatorInfo,
      ),
      googleAdsLeadId: Schema.optional(Schema.String),
      messageLead: Schema.optional(
        GoogleAdsHomeservicesLocalservicesV1MessageLead,
      ),
      chargeStatus: Schema.optional(Schema.String),
      disputeStatus: Schema.optional(Schema.String),
      leadType: Schema.optional(Schema.String),
      geo: Schema.optional(Schema.String),
      bookingLead: Schema.optional(
        GoogleAdsHomeservicesLocalservicesV1BookingLead,
      ),
      accountId: Schema.optional(Schema.String),
      leadPrice: Schema.optional(Schema.Number),
      phoneLead: Schema.optional(GoogleAdsHomeservicesLocalservicesV1PhoneLead),
      leadCategory: Schema.optional(Schema.String),
      businessName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAdsHomeservicesLocalservicesV1DetailedLeadReport",
  }) as any as Schema.Schema<GoogleAdsHomeservicesLocalservicesV1DetailedLeadReport>;

export interface GoogleAdsHomeservicesLocalservicesV1AccountReport {
  /** Number of charged leads the account received in current specified period. */
  currentPeriodChargedLeads?: string;
  /** Number of phone calls in previous specified period, including both connected and unconnected calls. */
  previousPeriodPhoneCalls?: string;
  /** Aggregator specific information related to the account. */
  aggregatorInfo?: GoogleAdsHomeservicesLocalservicesV1AggregatorInfo;
  /** Average weekly budget in the currency code of the account. */
  averageWeeklyBudget?: number;
  /** Number of phone calls in current specified period, including both connected and unconnected calls. */
  currentPeriodPhoneCalls?: string;
  /** Currency code of the account. */
  currencyCode?: string;
  /** Number of charged leads the account received in previous specified period. */
  previousPeriodChargedLeads?: string;
  /** Number of impressions that customers have had in the past 2 days. */
  impressionsLastTwoDays?: string;
  /** Total cost of the account in current specified period in the account's specified currency. */
  currentPeriodTotalCost?: number;
  /** Total number of reviews the account has up to current date. */
  totalReview?: number;
  /** Number of connected phone calls (duration over 30s) in current specified period. */
  currentPeriodConnectedPhoneCalls?: string;
  /** Business name of the account. */
  businessName?: string;
  /** Total cost of the account in previous specified period in the account's specified currency. */
  previousPeriodTotalCost?: number;
  /** Unique identifier of the GLS account. */
  accountId?: string;
  /** Average review rating score from 1-5 stars. */
  averageFiveStarRating?: number;
  /** Number of connected phone calls (duration over 30s) in previous specified period. */
  previousPeriodConnectedPhoneCalls?: string;
  /** Phone lead responsiveness of the account for the past 90 days from current date. This is computed by taking the total number of connected calls from charged phone leads and dividing by the total number of calls received. */
  phoneLeadResponsiveness?: number;
}

export const GoogleAdsHomeservicesLocalservicesV1AccountReport: Schema.Schema<GoogleAdsHomeservicesLocalservicesV1AccountReport> =
  Schema.suspend(() =>
    Schema.Struct({
      currentPeriodChargedLeads: Schema.optional(Schema.String),
      previousPeriodPhoneCalls: Schema.optional(Schema.String),
      aggregatorInfo: Schema.optional(
        GoogleAdsHomeservicesLocalservicesV1AggregatorInfo,
      ),
      averageWeeklyBudget: Schema.optional(Schema.Number),
      currentPeriodPhoneCalls: Schema.optional(Schema.String),
      currencyCode: Schema.optional(Schema.String),
      previousPeriodChargedLeads: Schema.optional(Schema.String),
      impressionsLastTwoDays: Schema.optional(Schema.String),
      currentPeriodTotalCost: Schema.optional(Schema.Number),
      totalReview: Schema.optional(Schema.Number),
      currentPeriodConnectedPhoneCalls: Schema.optional(Schema.String),
      businessName: Schema.optional(Schema.String),
      previousPeriodTotalCost: Schema.optional(Schema.Number),
      accountId: Schema.optional(Schema.String),
      averageFiveStarRating: Schema.optional(Schema.Number),
      previousPeriodConnectedPhoneCalls: Schema.optional(Schema.String),
      phoneLeadResponsiveness: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleAdsHomeservicesLocalservicesV1AccountReport",
  }) as any as Schema.Schema<GoogleAdsHomeservicesLocalservicesV1AccountReport>;

export interface GoogleAdsHomeservicesLocalservicesV1SearchAccountReportsResponse {
  /** Pagination token to retrieve the next page of results. When `next_page_token` is not filled in, there is no next page and the list returned is the last page in the result set. */
  nextPageToken?: string;
  /** List of account reports which maps 1:1 to a particular linked GLS account. */
  accountReports?: Array<GoogleAdsHomeservicesLocalservicesV1AccountReport>;
}

export const GoogleAdsHomeservicesLocalservicesV1SearchAccountReportsResponse: Schema.Schema<GoogleAdsHomeservicesLocalservicesV1SearchAccountReportsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      accountReports: Schema.optional(
        Schema.Array(GoogleAdsHomeservicesLocalservicesV1AccountReport),
      ),
    }),
  ).annotate({
    identifier:
      "GoogleAdsHomeservicesLocalservicesV1SearchAccountReportsResponse",
  }) as any as Schema.Schema<GoogleAdsHomeservicesLocalservicesV1SearchAccountReportsResponse>;

export interface GoogleAdsHomeservicesLocalservicesV1SearchDetailedLeadReportsResponse {
  /** List of detailed lead reports uniquely identified by external lead id. */
  detailedLeadReports?: Array<GoogleAdsHomeservicesLocalservicesV1DetailedLeadReport>;
  /** Pagination token to retrieve the next page of results. When `next_page_token` is not filled in, there is no next page and the list returned is the last page in the result set. */
  nextPageToken?: string;
}

export const GoogleAdsHomeservicesLocalservicesV1SearchDetailedLeadReportsResponse: Schema.Schema<GoogleAdsHomeservicesLocalservicesV1SearchDetailedLeadReportsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      detailedLeadReports: Schema.optional(
        Schema.Array(GoogleAdsHomeservicesLocalservicesV1DetailedLeadReport),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleAdsHomeservicesLocalservicesV1SearchDetailedLeadReportsResponse",
  }) as any as Schema.Schema<GoogleAdsHomeservicesLocalservicesV1SearchDetailedLeadReportsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface SearchAccountReportsRequest {
  /** A query string for searching for account reports. Caller must provide a customer id of their MCC account with an associated Gaia Mint that allows read permission on their linked accounts. Search expressions are case insensitive. Example query: | Query | Description | |-------------------------|-----------------------------------------------| | manager_customer_id:123 | Get Account Report for Manager with id 123. | Required. */
  query?: string;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  "startDate.day"?: number;
  /** The maximum number of accounts to return. If the page size is unset, page size will default to 1000. Maximum page_size is 10000. Optional. */
  pageSize?: number;
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  "endDate.year"?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  "endDate.day"?: number;
  /** The `next_page_token` value returned from a previous request to SearchAccountReports that indicates where listing should continue. Optional. */
  pageToken?: string;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  "startDate.month"?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  "endDate.month"?: number;
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  "startDate.year"?: number;
}

export const SearchAccountReportsRequest = Schema.Struct({
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
  "startDate.day": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("startDate.day"),
  ),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  "endDate.year": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("endDate.year"),
  ),
  "endDate.day": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("endDate.day"),
  ),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  "startDate.month": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("startDate.month"),
  ),
  "endDate.month": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("endDate.month"),
  ),
  "startDate.year": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("startDate.year"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "v1/accountReports:search" }),
  svc,
) as unknown as Schema.Schema<SearchAccountReportsRequest>;

export type SearchAccountReportsResponse =
  GoogleAdsHomeservicesLocalservicesV1SearchAccountReportsResponse;
export const SearchAccountReportsResponse =
  GoogleAdsHomeservicesLocalservicesV1SearchAccountReportsResponse;

export type SearchAccountReportsError = DefaultErrors;

/** Get account reports containing aggregate account data of all linked GLS accounts. Caller needs to provide their manager customer id and the associated auth credential that allows them read permissions on their linked accounts. */
export const searchAccountReports: API.PaginatedOperationMethod<
  SearchAccountReportsRequest,
  SearchAccountReportsResponse,
  SearchAccountReportsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: SearchAccountReportsRequest,
  output: SearchAccountReportsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface SearchDetailedLeadReportsRequest {
  /** A query string for searching for account reports. Caller must provide a customer id of their MCC account with an associated Gaia Mint that allows read permission on their linked accounts. Search expressions are case insensitive. Example query: | Query | Description | |-------------------------|-----------------------------------------------| | manager_customer_id:123 | Get Detailed Lead Report for Manager with id | | | 123. | Required. */
  query?: string;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  "startDate.day"?: number;
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  "endDate.year"?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  "endDate.day"?: number;
  /** The maximum number of accounts to return. If the page size is unset, page size will default to 1000. Maximum page_size is 10000. Optional. */
  pageSize?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  "startDate.month"?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  "endDate.month"?: number;
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  "startDate.year"?: number;
  /** The `next_page_token` value returned from a previous request to SearchDetailedLeadReports that indicates where listing should continue. Optional. */
  pageToken?: string;
}

export const SearchDetailedLeadReportsRequest = Schema.Struct({
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
  "startDate.day": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("startDate.day"),
  ),
  "endDate.year": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("endDate.year"),
  ),
  "endDate.day": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("endDate.day"),
  ),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  "startDate.month": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("startDate.month"),
  ),
  "endDate.month": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("endDate.month"),
  ),
  "startDate.year": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("startDate.year"),
  ),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/detailedLeadReports:search" }),
  svc,
) as unknown as Schema.Schema<SearchDetailedLeadReportsRequest>;

export type SearchDetailedLeadReportsResponse =
  GoogleAdsHomeservicesLocalservicesV1SearchDetailedLeadReportsResponse;
export const SearchDetailedLeadReportsResponse =
  GoogleAdsHomeservicesLocalservicesV1SearchDetailedLeadReportsResponse;

export type SearchDetailedLeadReportsError = DefaultErrors;

/** Get detailed lead reports containing leads that have been received by all linked GLS accounts. Caller needs to provide their manager customer id and the associated auth credential that allows them read permissions on their linked accounts. */
export const searchDetailedLeadReports: API.PaginatedOperationMethod<
  SearchDetailedLeadReportsRequest,
  SearchDetailedLeadReportsResponse,
  SearchDetailedLeadReportsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: SearchDetailedLeadReportsRequest,
  output: SearchDetailedLeadReportsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));
