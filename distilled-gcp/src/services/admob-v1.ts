// ==========================================================================
// AdMob API (admob v1)
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
  name: "admob",
  version: "v1",
  rootUrl: "https://admob.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface PublisherAccount {
  /** Resource name of this account. Format is accounts/{publisher_id}. */
  name?: string;
  /** The unique ID by which this publisher account can be identified in the API requests (for example, pub-1234567890). */
  publisherId?: string;
  /** The time zone that is used in reports that are generated for this account. The value is a time-zone ID as specified by the CLDR project, for example, "America/Los_Angeles". */
  reportingTimeZone?: string;
  /** Currency code of the earning-related metrics, which is the 3-letter code defined in ISO 4217. The daily average rate is used for the currency conversion. */
  currencyCode?: string;
}

export const PublisherAccount: Schema.Schema<PublisherAccount> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  publisherId: Schema.optional(Schema.String),
  reportingTimeZone: Schema.optional(Schema.String),
  currencyCode: Schema.optional(Schema.String),
})).annotate({ identifier: "PublisherAccount" }) as any as Schema.Schema<PublisherAccount>;

export interface ListPublisherAccountsResponse {
  /** Publisher that the client credentials can access. */
  account?: Array<PublisherAccount>;
  /** If not empty, indicates that there might be more accounts for the request; you must pass this value in a new `ListPublisherAccountsRequest`. */
  nextPageToken?: string;
}

export const ListPublisherAccountsResponse: Schema.Schema<ListPublisherAccountsResponse> = Schema.suspend(() => Schema.Struct({
  account: Schema.optional(Schema.Array(PublisherAccount)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListPublisherAccountsResponse" }) as any as Schema.Schema<ListPublisherAccountsResponse>;

export interface Admob_Date {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const Admob_Date: Schema.Schema<Admob_Date> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
})).annotate({ identifier: "Admob_Date" }) as any as Schema.Schema<Admob_Date>;

export interface DateRange {
  /** Start date of the date range, inclusive. Must be less than or equal to the end date. */
  startDate?: Admob_Date;
  /** End date of the date range, inclusive. Must be greater than or equal to the start date. */
  endDate?: Admob_Date;
}

export const DateRange: Schema.Schema<DateRange> = Schema.suspend(() => Schema.Struct({
  startDate: Schema.optional(Admob_Date),
  endDate: Schema.optional(Admob_Date),
})).annotate({ identifier: "DateRange" }) as any as Schema.Schema<DateRange>;

export interface StringList {
  /** The string values. */
  values?: Array<string>;
}

export const StringList: Schema.Schema<StringList> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "StringList" }) as any as Schema.Schema<StringList>;

export interface NetworkReportSpecDimensionFilter {
  /** Matches a row if its value for the specified dimension is in one of the values specified in this condition. */
  matchesAny?: StringList;
  /** Applies the filter criterion to the specified dimension. */
  dimension?: "DIMENSION_UNSPECIFIED" | "DATE" | "MONTH" | "WEEK" | "AD_UNIT" | "APP" | "AD_TYPE" | "COUNTRY" | "FORMAT" | "PLATFORM" | "MOBILE_OS_VERSION" | "GMA_SDK_VERSION" | "APP_VERSION_NAME" | "SERVING_RESTRICTION" | (string & {});
}

export const NetworkReportSpecDimensionFilter: Schema.Schema<NetworkReportSpecDimensionFilter> = Schema.suspend(() => Schema.Struct({
  matchesAny: Schema.optional(StringList),
  dimension: Schema.optional(Schema.String),
})).annotate({ identifier: "NetworkReportSpecDimensionFilter" }) as any as Schema.Schema<NetworkReportSpecDimensionFilter>;

export interface NetworkReportSpecSortCondition {
  /** Sort by the specified dimension. */
  dimension?: "DIMENSION_UNSPECIFIED" | "DATE" | "MONTH" | "WEEK" | "AD_UNIT" | "APP" | "AD_TYPE" | "COUNTRY" | "FORMAT" | "PLATFORM" | "MOBILE_OS_VERSION" | "GMA_SDK_VERSION" | "APP_VERSION_NAME" | "SERVING_RESTRICTION" | (string & {});
  /** Sort by the specified metric. */
  metric?: "METRIC_UNSPECIFIED" | "AD_REQUESTS" | "CLICKS" | "ESTIMATED_EARNINGS" | "IMPRESSIONS" | "IMPRESSION_CTR" | "IMPRESSION_RPM" | "MATCHED_REQUESTS" | "MATCH_RATE" | "SHOW_RATE" | (string & {});
  /** Sorting order of the dimension or metric. */
  order?: "SORT_ORDER_UNSPECIFIED" | "ASCENDING" | "DESCENDING" | (string & {});
}

export const NetworkReportSpecSortCondition: Schema.Schema<NetworkReportSpecSortCondition> = Schema.suspend(() => Schema.Struct({
  dimension: Schema.optional(Schema.String),
  metric: Schema.optional(Schema.String),
  order: Schema.optional(Schema.String),
})).annotate({ identifier: "NetworkReportSpecSortCondition" }) as any as Schema.Schema<NetworkReportSpecSortCondition>;

export interface LocalizationSettings {
  /** Currency code of the earning related metrics, which is the 3-letter code defined in ISO 4217. The daily average rate is used for the currency conversion. Defaults to the account currency code if unspecified. */
  currencyCode?: string;
  /** Language used for any localized text, such as some dimension value display labels. The language tag defined in the IETF BCP47. Defaults to 'en-US' if unspecified. */
  languageCode?: string;
}

export const LocalizationSettings: Schema.Schema<LocalizationSettings> = Schema.suspend(() => Schema.Struct({
  currencyCode: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "LocalizationSettings" }) as any as Schema.Schema<LocalizationSettings>;

export interface NetworkReportSpec {
  /** The date range for which the report is generated. */
  dateRange?: DateRange;
  /** List of dimensions of the report. The value combination of these dimensions determines the row of the report. If no dimensions are specified, the report returns a single row of requested metrics for the entire account. */
  dimensions?: Array<"DIMENSION_UNSPECIFIED" | "DATE" | "MONTH" | "WEEK" | "AD_UNIT" | "APP" | "AD_TYPE" | "COUNTRY" | "FORMAT" | "PLATFORM" | "MOBILE_OS_VERSION" | "GMA_SDK_VERSION" | "APP_VERSION_NAME" | "SERVING_RESTRICTION" | (string & {})>;
  /** List of metrics of the report. A report must specify at least one metric. */
  metrics?: Array<"METRIC_UNSPECIFIED" | "AD_REQUESTS" | "CLICKS" | "ESTIMATED_EARNINGS" | "IMPRESSIONS" | "IMPRESSION_CTR" | "IMPRESSION_RPM" | "MATCHED_REQUESTS" | "MATCH_RATE" | "SHOW_RATE" | (string & {})>;
  /** Describes which report rows to match based on their dimension values. */
  dimensionFilters?: Array<NetworkReportSpecDimensionFilter>;
  /** Describes the sorting of report rows. The order of the condition in the list defines its precedence; the earlier the condition, the higher its precedence. If no sort conditions are specified, the row ordering is undefined. */
  sortConditions?: Array<NetworkReportSpecSortCondition>;
  /** Localization settings of the report. */
  localizationSettings?: LocalizationSettings;
  /** Maximum number of report data rows to return. If the value is not set, the API returns as many rows as possible, up to 100000. Acceptable values are 1-100000, inclusive. Values larger than 100000 return an error. */
  maxReportRows?: number;
  /** A report time zone. Accepts an IANA TZ name values, such as "America/Los_Angeles." If no time zone is defined, the account default takes effect. Check default value by the get account action. **Warning:** The "America/Los_Angeles" is the only supported value at the moment. */
  timeZone?: string;
}

export const NetworkReportSpec: Schema.Schema<NetworkReportSpec> = Schema.suspend(() => Schema.Struct({
  dateRange: Schema.optional(DateRange),
  dimensions: Schema.optional(Schema.Array(Schema.String)),
  metrics: Schema.optional(Schema.Array(Schema.String)),
  dimensionFilters: Schema.optional(Schema.Array(NetworkReportSpecDimensionFilter)),
  sortConditions: Schema.optional(Schema.Array(NetworkReportSpecSortCondition)),
  localizationSettings: Schema.optional(LocalizationSettings),
  maxReportRows: Schema.optional(Schema.Number),
  timeZone: Schema.optional(Schema.String),
})).annotate({ identifier: "NetworkReportSpec" }) as any as Schema.Schema<NetworkReportSpec>;

export interface GenerateNetworkReportRequest {
  /** Network report specification. */
  reportSpec?: NetworkReportSpec;
}

export const GenerateNetworkReportRequest: Schema.Schema<GenerateNetworkReportRequest> = Schema.suspend(() => Schema.Struct({
  reportSpec: Schema.optional(NetworkReportSpec),
})).annotate({ identifier: "GenerateNetworkReportRequest" }) as any as Schema.Schema<GenerateNetworkReportRequest>;

export interface ReportHeader {
  /** The date range for which the report is generated. This is identical to the range specified in the report request. */
  dateRange?: DateRange;
  /** Localization settings of the report. This is identical to the settings in the report request. */
  localizationSettings?: LocalizationSettings;
  /** The report time zone. The value is a time-zone ID as specified by the CLDR project, for example, "America/Los_Angeles". */
  reportingTimeZone?: string;
}

export const ReportHeader: Schema.Schema<ReportHeader> = Schema.suspend(() => Schema.Struct({
  dateRange: Schema.optional(DateRange),
  localizationSettings: Schema.optional(LocalizationSettings),
  reportingTimeZone: Schema.optional(Schema.String),
})).annotate({ identifier: "ReportHeader" }) as any as Schema.Schema<ReportHeader>;

export interface ReportRowDimensionValue {
  /** Dimension value in the format specified in the report's spec Dimension enum. */
  value?: string;
  /** The localized string representation of the value. If unspecified, the display label should be derived from the value. */
  displayLabel?: string;
}

export const ReportRowDimensionValue: Schema.Schema<ReportRowDimensionValue> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  displayLabel: Schema.optional(Schema.String),
})).annotate({ identifier: "ReportRowDimensionValue" }) as any as Schema.Schema<ReportRowDimensionValue>;

export interface ReportRowMetricValue {
  /** Metric integer value. */
  integerValue?: string;
  /** Double precision (approximate) decimal values. Rates are from 0 to 1. */
  doubleValue?: number;
  /** Amount in micros. One million is equivalent to one unit. Currency value is in the unit (USD, EUR or other) specified by the request. For example, $6.50 whould be represented as 6500000 micros. */
  microsValue?: string;
}

export const ReportRowMetricValue: Schema.Schema<ReportRowMetricValue> = Schema.suspend(() => Schema.Struct({
  integerValue: Schema.optional(Schema.String),
  doubleValue: Schema.optional(Schema.Number),
  microsValue: Schema.optional(Schema.String),
})).annotate({ identifier: "ReportRowMetricValue" }) as any as Schema.Schema<ReportRowMetricValue>;

export interface ReportRow {
  /** Map of dimension values in a row, with keys as enum name of the dimensions. */
  dimensionValues?: Record<string, ReportRowDimensionValue>;
  /** Map of metric values in a row, with keys as enum name of the metrics. If a metric being requested has no value returned, the map will not include it. */
  metricValues?: Record<string, ReportRowMetricValue>;
}

export const ReportRow: Schema.Schema<ReportRow> = Schema.suspend(() => Schema.Struct({
  dimensionValues: Schema.optional(Schema.Record(Schema.String, ReportRowDimensionValue)),
  metricValues: Schema.optional(Schema.Record(Schema.String, ReportRowMetricValue)),
})).annotate({ identifier: "ReportRow" }) as any as Schema.Schema<ReportRow>;

export interface ReportWarning {
  /** Type of the warning. */
  type?: "TYPE_UNSPECIFIED" | "DATA_BEFORE_ACCOUNT_TIMEZONE_CHANGE" | "DATA_DELAYED" | "OTHER" | "REPORT_CURRENCY_NOT_ACCOUNT_CURRENCY" | (string & {});
  /** Describes the details of the warning message, in English. */
  description?: string;
}

export const ReportWarning: Schema.Schema<ReportWarning> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "ReportWarning" }) as any as Schema.Schema<ReportWarning>;

export interface ReportFooter {
  /** Warnings associated with generation of the report. */
  warnings?: Array<ReportWarning>;
  /** Total number of rows that matched the request. Warning: This count does NOT always match the number of rows in the response. Do not make that assumption when processing the response. */
  matchingRowCount?: string;
}

export const ReportFooter: Schema.Schema<ReportFooter> = Schema.suspend(() => Schema.Struct({
  warnings: Schema.optional(Schema.Array(ReportWarning)),
  matchingRowCount: Schema.optional(Schema.String),
})).annotate({ identifier: "ReportFooter" }) as any as Schema.Schema<ReportFooter>;

export interface GenerateNetworkReportResponse {
  /** Report generation settings that describes the report contents, such as the report date range and localization settings. */
  header?: ReportHeader;
  /** Actual report data. */
  row?: ReportRow;
  /** Additional information about the generated report, such as warnings about the data. */
  footer?: ReportFooter;
}

export const GenerateNetworkReportResponse: Schema.Schema<GenerateNetworkReportResponse> = Schema.suspend(() => Schema.Struct({
  header: Schema.optional(ReportHeader),
  row: Schema.optional(ReportRow),
  footer: Schema.optional(ReportFooter),
})).annotate({ identifier: "GenerateNetworkReportResponse" }) as any as Schema.Schema<GenerateNetworkReportResponse>;

export interface MediationReportSpecDimensionFilter {
  /** Matches a row if its value for the specified dimension is in one of the values specified in this condition. */
  matchesAny?: StringList;
  /** Applies the filter criterion to the specified dimension. */
  dimension?: "DIMENSION_UNSPECIFIED" | "DATE" | "MONTH" | "WEEK" | "AD_SOURCE" | "AD_SOURCE_INSTANCE" | "AD_UNIT" | "APP" | "MEDIATION_GROUP" | "COUNTRY" | "FORMAT" | "PLATFORM" | "MOBILE_OS_VERSION" | "GMA_SDK_VERSION" | "APP_VERSION_NAME" | "SERVING_RESTRICTION" | (string & {});
}

export const MediationReportSpecDimensionFilter: Schema.Schema<MediationReportSpecDimensionFilter> = Schema.suspend(() => Schema.Struct({
  matchesAny: Schema.optional(StringList),
  dimension: Schema.optional(Schema.String),
})).annotate({ identifier: "MediationReportSpecDimensionFilter" }) as any as Schema.Schema<MediationReportSpecDimensionFilter>;

export interface MediationReportSpecSortCondition {
  /** Sort by the specified dimension. */
  dimension?: "DIMENSION_UNSPECIFIED" | "DATE" | "MONTH" | "WEEK" | "AD_SOURCE" | "AD_SOURCE_INSTANCE" | "AD_UNIT" | "APP" | "MEDIATION_GROUP" | "COUNTRY" | "FORMAT" | "PLATFORM" | "MOBILE_OS_VERSION" | "GMA_SDK_VERSION" | "APP_VERSION_NAME" | "SERVING_RESTRICTION" | (string & {});
  /** Sort by the specified metric. */
  metric?: "METRIC_UNSPECIFIED" | "AD_REQUESTS" | "CLICKS" | "ESTIMATED_EARNINGS" | "IMPRESSIONS" | "IMPRESSION_CTR" | "MATCHED_REQUESTS" | "MATCH_RATE" | "OBSERVED_ECPM" | (string & {});
  /** Sorting order of the dimension or metric. */
  order?: "SORT_ORDER_UNSPECIFIED" | "ASCENDING" | "DESCENDING" | (string & {});
}

export const MediationReportSpecSortCondition: Schema.Schema<MediationReportSpecSortCondition> = Schema.suspend(() => Schema.Struct({
  dimension: Schema.optional(Schema.String),
  metric: Schema.optional(Schema.String),
  order: Schema.optional(Schema.String),
})).annotate({ identifier: "MediationReportSpecSortCondition" }) as any as Schema.Schema<MediationReportSpecSortCondition>;

export interface MediationReportSpec {
  /** The date range for which the report is generated. */
  dateRange?: DateRange;
  /** List of dimensions of the report. The value combination of these dimensions determines the row of the report. If no dimensions are specified, the report returns a single row of requested metrics for the entire account. */
  dimensions?: Array<"DIMENSION_UNSPECIFIED" | "DATE" | "MONTH" | "WEEK" | "AD_SOURCE" | "AD_SOURCE_INSTANCE" | "AD_UNIT" | "APP" | "MEDIATION_GROUP" | "COUNTRY" | "FORMAT" | "PLATFORM" | "MOBILE_OS_VERSION" | "GMA_SDK_VERSION" | "APP_VERSION_NAME" | "SERVING_RESTRICTION" | (string & {})>;
  /** List of metrics of the report. A report must specify at least one metric. */
  metrics?: Array<"METRIC_UNSPECIFIED" | "AD_REQUESTS" | "CLICKS" | "ESTIMATED_EARNINGS" | "IMPRESSIONS" | "IMPRESSION_CTR" | "MATCHED_REQUESTS" | "MATCH_RATE" | "OBSERVED_ECPM" | (string & {})>;
  /** Describes which report rows to match based on their dimension values. */
  dimensionFilters?: Array<MediationReportSpecDimensionFilter>;
  /** Describes the sorting of report rows. The order of the condition in the list defines its precedence; the earlier the condition, the higher its precedence. If no sort conditions are specified, the row ordering is undefined. */
  sortConditions?: Array<MediationReportSpecSortCondition>;
  /** Localization settings of the report. */
  localizationSettings?: LocalizationSettings;
  /** Maximum number of report data rows to return. If the value is not set, the API returns as many rows as possible, up to 100000. Acceptable values are 1-100000, inclusive. Values larger than 100000 return an error. */
  maxReportRows?: number;
  /** A report time zone. Accepts an IANA TZ name values, such as "America/Los_Angeles." If no time zone is defined, the account default takes effect. Check default value by the get account action. **Warning:** The "America/Los_Angeles" is the only supported value at the moment. */
  timeZone?: string;
}

export const MediationReportSpec: Schema.Schema<MediationReportSpec> = Schema.suspend(() => Schema.Struct({
  dateRange: Schema.optional(DateRange),
  dimensions: Schema.optional(Schema.Array(Schema.String)),
  metrics: Schema.optional(Schema.Array(Schema.String)),
  dimensionFilters: Schema.optional(Schema.Array(MediationReportSpecDimensionFilter)),
  sortConditions: Schema.optional(Schema.Array(MediationReportSpecSortCondition)),
  localizationSettings: Schema.optional(LocalizationSettings),
  maxReportRows: Schema.optional(Schema.Number),
  timeZone: Schema.optional(Schema.String),
})).annotate({ identifier: "MediationReportSpec" }) as any as Schema.Schema<MediationReportSpec>;

export interface GenerateMediationReportRequest {
  /** Network report specification. */
  reportSpec?: MediationReportSpec;
}

export const GenerateMediationReportRequest: Schema.Schema<GenerateMediationReportRequest> = Schema.suspend(() => Schema.Struct({
  reportSpec: Schema.optional(MediationReportSpec),
})).annotate({ identifier: "GenerateMediationReportRequest" }) as any as Schema.Schema<GenerateMediationReportRequest>;

export interface GenerateMediationReportResponse {
  /** Report generation settings that describes the report contents, such as the report date range and localization settings. */
  header?: ReportHeader;
  /** Actual report data. */
  row?: ReportRow;
  /** Additional information about the generated report, such as warnings about the data. */
  footer?: ReportFooter;
}

export const GenerateMediationReportResponse: Schema.Schema<GenerateMediationReportResponse> = Schema.suspend(() => Schema.Struct({
  header: Schema.optional(ReportHeader),
  row: Schema.optional(ReportRow),
  footer: Schema.optional(ReportFooter),
})).annotate({ identifier: "GenerateMediationReportResponse" }) as any as Schema.Schema<GenerateMediationReportResponse>;

export interface AppManualAppInfo {
  /** The display name of the app as shown in the AdMob UI, which is provided by the user. The maximum length allowed is 80 characters. */
  displayName?: string;
}

export const AppManualAppInfo: Schema.Schema<AppManualAppInfo> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "AppManualAppInfo" }) as any as Schema.Schema<AppManualAppInfo>;

export interface AppLinkedAppInfo {
  /** The app store ID of the app; present if and only if the app is linked to an app store. If the app is added to the Google Play store, it will be the application ID of the app. For example: "com.example.myapp". See https://developer.android.com/studio/build/application-id. If the app is added to the Apple App Store, it will be app store ID. For example "105169111". Note that setting the app store id is considered an irreversible action. Once an app is linked, it cannot be unlinked. */
  appStoreId?: string;
  /** Output only. Display name of the app as it appears in the app store. This is an output-only field, and may be empty if the app cannot be found in the store. */
  displayName?: string;
}

export const AppLinkedAppInfo: Schema.Schema<AppLinkedAppInfo> = Schema.suspend(() => Schema.Struct({
  appStoreId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "AppLinkedAppInfo" }) as any as Schema.Schema<AppLinkedAppInfo>;

export interface App {
  /** Resource name for this app. Format is accounts/{publisher_id}/apps/{app_id_fragment} Example: accounts/pub-9876543210987654/apps/0123456789 */
  name?: string;
  /** The externally visible ID of the app which can be used to integrate with the AdMob SDK. This is a read only property. Example: ca-app-pub-9876543210987654~0123456789 */
  appId?: string;
  /** Describes the platform of the app. Limited to "IOS" and "ANDROID". */
  platform?: string;
  /** The information for an app that is not linked to any app store. After an app is linked, this information is still retrivable. If no name is provided for the app upon creation, a placeholder name will be used. */
  manualAppInfo?: AppManualAppInfo;
  /** Immutable. The information for an app that is linked to an app store. This field is present if and only if the app is linked to an app store. */
  linkedAppInfo?: AppLinkedAppInfo;
  /** Output only. The approval state for the app. The field is read-only. */
  appApprovalState?: "APP_APPROVAL_STATE_UNSPECIFIED" | "ACTION_REQUIRED" | "IN_REVIEW" | "APPROVED" | (string & {});
}

export const App: Schema.Schema<App> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  appId: Schema.optional(Schema.String),
  platform: Schema.optional(Schema.String),
  manualAppInfo: Schema.optional(AppManualAppInfo),
  linkedAppInfo: Schema.optional(AppLinkedAppInfo),
  appApprovalState: Schema.optional(Schema.String),
})).annotate({ identifier: "App" }) as any as Schema.Schema<App>;

export interface ListAppsResponse {
  /** The resulting apps for the requested account. */
  apps?: Array<App>;
  /** If not empty, indicates that there may be more apps for the request; this value should be passed in a new `ListAppsRequest`. */
  nextPageToken?: string;
}

export const ListAppsResponse: Schema.Schema<ListAppsResponse> = Schema.suspend(() => Schema.Struct({
  apps: Schema.optional(Schema.Array(App)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAppsResponse" }) as any as Schema.Schema<ListAppsResponse>;

export interface AdUnit {
  /** Resource name for this ad unit. Format is accounts/{publisher_id}/adUnits/{ad_unit_id_fragment} Example: accounts/pub-9876543210987654/adUnits/0123456789 */
  name?: string;
  /** The externally visible ID of the ad unit which can be used to integrate with the AdMob SDK. This is a read only property. Example: ca-app-pub-9876543210987654/0123456789 */
  adUnitId?: string;
  /** The externally visible ID of the app this ad unit is associated with. Example: ca-app-pub-9876543210987654~0123456789 */
  appId?: string;
  /** The display name of the ad unit as shown in the AdMob UI, which is provided by the user. The maximum length allowed is 80 characters. */
  displayName?: string;
  /** AdFormat of the ad unit. Possible values are as follows: "APP_OPEN" - App Open ad format. "BANNER" - Banner ad format. "BANNER_INTERSTITIAL" - Legacy format that can be used as either banner or interstitial. This format can no longer be created but can be targeted by mediation groups. "INTERSTITIAL" - A full screen ad. Supported ad types are "RICH_MEDIA" and "VIDEO". "NATIVE" - Native ad format. "REWARDED" - An ad that, once viewed, gets a callback verifying the view so that a reward can be given to the user. Supported ad types are "RICH_MEDIA" (interactive) and video where video can not be excluded. "REWARDED_INTERSTITIAL" - Rewarded Interstitial ad format. Only supports video ad type. See https://support.google.com/admob/answer/9884467. */
  adFormat?: string;
  /** Ad media type supported by this ad unit. Possible values as follows: "RICH_MEDIA" - Text, image, and other non-video media. "VIDEO" - Video media. */
  adTypes?: Array<string>;
}

export const AdUnit: Schema.Schema<AdUnit> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  adUnitId: Schema.optional(Schema.String),
  appId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  adFormat: Schema.optional(Schema.String),
  adTypes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AdUnit" }) as any as Schema.Schema<AdUnit>;

export interface ListAdUnitsResponse {
  /** The resulting ad units for the requested account. */
  adUnits?: Array<AdUnit>;
  /** If not empty, indicates that there may be more ad units for the request; this value should be passed in a new `ListAdUnitsRequest`. */
  nextPageToken?: string;
}

export const ListAdUnitsResponse: Schema.Schema<ListAdUnitsResponse> = Schema.suspend(() => Schema.Struct({
  adUnits: Schema.optional(Schema.Array(AdUnit)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAdUnitsResponse" }) as any as Schema.Schema<ListAdUnitsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Gets information about the specified AdMob publisher account. */
export interface GetAccountsRequest {
  /** Resource name of the publisher account to retrieve. Example: accounts/pub-9876543210987654 */
  name: string;
}

export const GetAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsRequest>;

export type GetAccountsResponse = PublisherAccount;
export const GetAccountsResponse = PublisherAccount;

export type GetAccountsError = CommonErrors;

export const getAccounts: API.OperationMethod<GetAccountsRequest, GetAccountsResponse, GetAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsRequest,
  output: GetAccountsResponse,
  errors: [],
}));

/** Lists the AdMob publisher account that was most recently signed in to from the AdMob UI. For more information, see https://support.google.com/admob/answer/10243672. */
export interface ListAccountsRequest {
  /** Maximum number of accounts to return. */
  pageSize?: number;
  /** The value returned by the last `ListPublisherAccountsResponse`; indicates that this is a continuation of a prior `ListPublisherAccounts` call, and that the system should return the next page of data. */
  pageToken?: string;
}

export const ListAccountsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts" }),
  svc,
) as unknown as Schema.Schema<ListAccountsRequest>;

export type ListAccountsResponse = ListPublisherAccountsResponse;
export const ListAccountsResponse = ListPublisherAccountsResponse;

export type ListAccountsError = CommonErrors;

export const listAccounts = API.makePaginated(() => ({
  input: ListAccountsRequest,
  output: ListAccountsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Generates an AdMob Network report based on the provided report specification. Returns result of a server-side streaming RPC. The result is returned in a sequence of responses. */
export interface GenerateAccountsNetworkReportRequest {
  /** Resource name of the account to generate the report for. Example: accounts/pub-9876543210987654 */
  parent: string;
  /** Request body */
  body?: GenerateNetworkReportRequest;
}

export const GenerateAccountsNetworkReportRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GenerateNetworkReportRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts/{accountsId}/networkReport:generate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GenerateAccountsNetworkReportRequest>;

export type GenerateAccountsNetworkReportResponse = GenerateNetworkReportResponse;
export const GenerateAccountsNetworkReportResponse = GenerateNetworkReportResponse;

export type GenerateAccountsNetworkReportError = CommonErrors;

export const generateAccountsNetworkReport: API.OperationMethod<GenerateAccountsNetworkReportRequest, GenerateAccountsNetworkReportResponse, GenerateAccountsNetworkReportError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateAccountsNetworkReportRequest,
  output: GenerateAccountsNetworkReportResponse,
  errors: [],
}));

/** Generates an AdMob Mediation report based on the provided report specification. Returns result of a server-side streaming RPC. The result is returned in a sequence of responses. */
export interface GenerateAccountsMediationReportRequest {
  /** Resource name of the account to generate the report for. Example: accounts/pub-9876543210987654 */
  parent: string;
  /** Request body */
  body?: GenerateMediationReportRequest;
}

export const GenerateAccountsMediationReportRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GenerateMediationReportRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts/{accountsId}/mediationReport:generate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GenerateAccountsMediationReportRequest>;

export type GenerateAccountsMediationReportResponse = GenerateMediationReportResponse;
export const GenerateAccountsMediationReportResponse = GenerateMediationReportResponse;

export type GenerateAccountsMediationReportError = CommonErrors;

export const generateAccountsMediationReport: API.OperationMethod<GenerateAccountsMediationReportRequest, GenerateAccountsMediationReportResponse, GenerateAccountsMediationReportError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateAccountsMediationReportRequest,
  output: GenerateAccountsMediationReportResponse,
  errors: [],
}));

/** List the apps under the specified AdMob account. */
export interface ListAccountsAppsRequest {
  /** Required. Resource name of the account to list apps for. Example: accounts/pub-9876543210987654 */
  parent: string;
  /** The maximum number of apps to return. If unspecified or 0, at most 10,000 apps will be returned. The maximum value is 20,000; values above 20,000 will be coerced to 20,000. */
  pageSize?: number;
  /** The value returned by the last `ListAppsResponse`; indicates that this is a continuation of a prior `ListApps` call, and that the system should return the next page of data. */
  pageToken?: string;
}

export const ListAccountsAppsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}/apps" }),
  svc,
) as unknown as Schema.Schema<ListAccountsAppsRequest>;

export type ListAccountsAppsResponse = ListAppsResponse;
export const ListAccountsAppsResponse = ListAppsResponse;

export type ListAccountsAppsError = CommonErrors;

export const listAccountsApps = API.makePaginated(() => ({
  input: ListAccountsAppsRequest,
  output: ListAccountsAppsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** List the ad units under the specified AdMob account. */
export interface ListAccountsAdUnitsRequest {
  /** Required. Resource name of the account to list ad units for. Example: accounts/pub-9876543210987654 */
  parent: string;
  /** The maximum number of ad units to return. If unspecified or 0, at most 10,000 ad units will be returned. The maximum value is 20,000; values above 20,000 will be coerced to 20,000. */
  pageSize?: number;
  /** The value returned by the last `ListAdUnitsResponse`; indicates that this is a continuation of a prior `ListAdUnits` call, and that the system should return the next page of data. */
  pageToken?: string;
}

export const ListAccountsAdUnitsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}/adUnits" }),
  svc,
) as unknown as Schema.Schema<ListAccountsAdUnitsRequest>;

export type ListAccountsAdUnitsResponse = ListAdUnitsResponse;
export const ListAccountsAdUnitsResponse = ListAdUnitsResponse;

export type ListAccountsAdUnitsError = CommonErrors;

export const listAccountsAdUnits = API.makePaginated(() => ({
  input: ListAccountsAdUnitsRequest,
  output: ListAccountsAdUnitsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

