// ==========================================================================
// Search Ads 360 API (doubleclicksearch v2)
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
  name: "doubleclicksearch",
  version: "v2",
  rootUrl: "https://doubleclicksearch.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface CustomMetric {
  /** Custom metric name. */
  name?: string;
  /** Custom metric numeric value. */
  value?: number;
}

export const CustomMetric: Schema.Schema<CustomMetric> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.Number),
})).annotate({ identifier: "CustomMetric" }) as any as Schema.Schema<CustomMetric>;

export interface CustomDimension {
  /** Custom dimension name. */
  name?: string;
  /** Custom dimension value. */
  value?: string;
}

export const CustomDimension: Schema.Schema<CustomDimension> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomDimension" }) as any as Schema.Schema<CustomDimension>;

export interface Conversion {
  /** DS agency ID. */
  agencyId?: string;
  /** DS advertiser ID. */
  advertiserId?: string;
  /** DS engine account ID. */
  engineAccountId?: string;
  /** DS campaign ID. */
  campaignId?: string;
  /** DS ad group ID. */
  adGroupId?: string;
  /** DS criterion (keyword) ID. */
  criterionId?: string;
  /** DS ad ID. */
  adId?: string;
  /** ID that DoubleClick Search generates for each conversion. */
  dsConversionId?: string;
  /** For offline conversions, advertisers provide this ID. Advertisers can specify any ID that is meaningful to them. Each conversion in a request must specify a unique ID, and the combination of ID and timestamp must be unique amongst all conversions within the advertiser. For online conversions, DS copies the `dsConversionId` or `floodlightOrderId` into this property depending on the advertiser's Floodlight instructions. */
  conversionId?: string;
  /** The state of the conversion, that is, either `ACTIVE` or `REMOVED`. Note: state DELETED is deprecated. */
  state?: string;
  /** The type of the conversion, that is, either `ACTION` or `TRANSACTION`. An `ACTION` conversion is an action by the user that has no monetarily quantifiable value, while a `TRANSACTION` conversion is an action that does have a monetarily quantifiable value. Examples are email list signups (`ACTION`) versus ecommerce purchases (`TRANSACTION`). */
  type?: string;
  /** The revenue amount of this `TRANSACTION` conversion, in micros (value multiplied by 1000000, no decimal). For example, to specify a revenue value of "10" enter "10000000" (10 million) in your request. */
  revenueMicros?: string;
  /** The currency code for the conversion's revenue. Should be in ISO 4217 alphabetic (3-char) format. */
  currencyCode?: string;
  /** The quantity of this conversion, in millis. */
  quantityMillis?: string;
  /** The segmentation type of this conversion (for example, `FLOODLIGHT`). */
  segmentationType?: string;
  /** The numeric segmentation identifier (for example, DoubleClick Search Floodlight activity ID). */
  segmentationId?: string;
  /** The friendly segmentation identifier (for example, DoubleClick Search Floodlight activity name). */
  segmentationName?: string;
  /** The time at which the conversion took place, in epoch millis UTC. */
  conversionTimestamp?: string;
  /** The time at which the conversion was last modified, in epoch millis UTC. */
  conversionModifiedTimestamp?: string;
  /** DS click ID for the conversion. */
  clickId?: string;
  /** The Floodlight order ID provided by the advertiser for the conversion. */
  floodlightOrderId?: string;
  /** Custom metrics for the conversion. */
  customMetric?: Array<CustomMetric>;
  /** Custom dimensions for the conversion, which can be used to filter data in a report. */
  customDimension?: Array<CustomDimension>;
  /** DS product group ID. */
  productGroupId?: string;
  /** Available to advertisers only after contacting DoubleClick Search customer support. */
  countMillis?: string;
  /** Available to advertisers only after contacting DoubleClick Search customer support. */
  attributionModel?: string;
  /** The type of device on which the conversion occurred. */
  deviceType?: string;
  /** Customer ID of a client account in the new Search Ads 360 experience. */
  customerId?: string;
  /** Represents consent for core platform services (CPS) preferences in settings. No default value. Acceptable values are: GRANTED: The desired consent status is to grant. Read the CPS preferences from GTE settings. DENIED: The desired consent status is to deny; CPS list is empty. */
  adUserDataConsent?: "UNKNOWN" | "GRANTED" | "DENIED" | (string & {});
  /** ID that DS generates and uses to uniquely identify the inventory account that contains the product. */
  inventoryAccountId?: string;
  /** The product ID (SKU). */
  productId?: string;
  /** The country registered for the Merchant Center feed that contains the product. Use an ISO 3166 code to specify a country. */
  productCountry?: string;
  /** The language registered for the Merchant Center feed that contains the product. Use an ISO 639 code to specify a language. */
  productLanguage?: string;
  /** The ID of the local store for which the product was advertised. Applicable only when the channel is "`local`". */
  storeId?: string;
  /** Sales channel for the product. Acceptable values are: - "`local`": a physical store - "`online`": an online store */
  channel?: string;
}

export const Conversion: Schema.Schema<Conversion> = Schema.suspend(() => Schema.Struct({
  agencyId: Schema.optional(Schema.String),
  advertiserId: Schema.optional(Schema.String),
  engineAccountId: Schema.optional(Schema.String),
  campaignId: Schema.optional(Schema.String),
  adGroupId: Schema.optional(Schema.String),
  criterionId: Schema.optional(Schema.String),
  adId: Schema.optional(Schema.String),
  dsConversionId: Schema.optional(Schema.String),
  conversionId: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  revenueMicros: Schema.optional(Schema.String),
  currencyCode: Schema.optional(Schema.String),
  quantityMillis: Schema.optional(Schema.String),
  segmentationType: Schema.optional(Schema.String),
  segmentationId: Schema.optional(Schema.String),
  segmentationName: Schema.optional(Schema.String),
  conversionTimestamp: Schema.optional(Schema.String),
  conversionModifiedTimestamp: Schema.optional(Schema.String),
  clickId: Schema.optional(Schema.String),
  floodlightOrderId: Schema.optional(Schema.String),
  customMetric: Schema.optional(Schema.Array(CustomMetric)),
  customDimension: Schema.optional(Schema.Array(CustomDimension)),
  productGroupId: Schema.optional(Schema.String),
  countMillis: Schema.optional(Schema.String),
  attributionModel: Schema.optional(Schema.String),
  deviceType: Schema.optional(Schema.String),
  customerId: Schema.optional(Schema.String),
  adUserDataConsent: Schema.optional(Schema.String),
  inventoryAccountId: Schema.optional(Schema.String),
  productId: Schema.optional(Schema.String),
  productCountry: Schema.optional(Schema.String),
  productLanguage: Schema.optional(Schema.String),
  storeId: Schema.optional(Schema.String),
  channel: Schema.optional(Schema.String),
})).annotate({ identifier: "Conversion" }) as any as Schema.Schema<Conversion>;

export interface ConversionList {
  /** The conversions being requested. */
  conversion?: Array<Conversion>;
  /** Identifies this as a ConversionList resource. Value: the fixed string doubleclicksearch#conversionList. */
  kind?: string;
}

export const ConversionList: Schema.Schema<ConversionList> = Schema.suspend(() => Schema.Struct({
  conversion: Schema.optional(Schema.Array(Conversion)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ConversionList" }) as any as Schema.Schema<ConversionList>;

export interface Availability {
  /** DS agency ID. */
  agencyId?: string;
  /** DS advertiser ID. */
  advertiserId?: string;
  /** The segmentation type that this availability is for (its default value is `FLOODLIGHT`). */
  segmentationType?: string;
  /** The numeric segmentation identifier (for example, DoubleClick Search Floodlight activity ID). */
  segmentationId?: string;
  /** The friendly segmentation identifier (for example, DoubleClick Search Floodlight activity name). */
  segmentationName?: string;
  /** The time by which all conversions have been uploaded, in epoch millis UTC. */
  availabilityTimestamp?: string;
  /** Customer ID of a client account in the new Search Ads 360 experience. */
  customerId?: string;
}

export const Availability: Schema.Schema<Availability> = Schema.suspend(() => Schema.Struct({
  agencyId: Schema.optional(Schema.String),
  advertiserId: Schema.optional(Schema.String),
  segmentationType: Schema.optional(Schema.String),
  segmentationId: Schema.optional(Schema.String),
  segmentationName: Schema.optional(Schema.String),
  availabilityTimestamp: Schema.optional(Schema.String),
  customerId: Schema.optional(Schema.String),
})).annotate({ identifier: "Availability" }) as any as Schema.Schema<Availability>;

export interface UpdateAvailabilityRequest {
  /** The availabilities being requested. */
  availabilities?: Array<Availability>;
}

export const UpdateAvailabilityRequest: Schema.Schema<UpdateAvailabilityRequest> = Schema.suspend(() => Schema.Struct({
  availabilities: Schema.optional(Schema.Array(Availability)),
})).annotate({ identifier: "UpdateAvailabilityRequest" }) as any as Schema.Schema<UpdateAvailabilityRequest>;

export interface UpdateAvailabilityResponse {
  /** The availabilities being returned. */
  availabilities?: Array<Availability>;
}

export const UpdateAvailabilityResponse: Schema.Schema<UpdateAvailabilityResponse> = Schema.suspend(() => Schema.Struct({
  availabilities: Schema.optional(Schema.Array(Availability)),
})).annotate({ identifier: "UpdateAvailabilityResponse" }) as any as Schema.Schema<UpdateAvailabilityResponse>;

export interface ReportApiColumnSpec {
  /** Name of a DoubleClick Search column to include in the report. */
  columnName?: string;
  /** Name of a saved column to include in the report. The report must be scoped at advertiser or lower, and this saved column must already be created in the DoubleClick Search UI. */
  savedColumnName?: string;
  /** Text used to identify this column in the report output; defaults to `columnName` or `savedColumnName` when not specified. This can be used to prevent collisions between DoubleClick Search columns and saved columns with the same name. */
  headerText?: string;
  /** Segments a report by a custom dimension. The report must be scoped to an advertiser or lower, and the custom dimension must already be set up in DoubleClick Search. The custom dimension name, which appears in DoubleClick Search, is case sensitive.\ If used in a conversion report, returns the value of the specified custom dimension for the given conversion, if set. This column does not segment the conversion report. */
  customDimensionName?: string;
  /** The platform that is used to provide data for the custom dimension. Acceptable values are "floodlight". */
  platformSource?: string;
  /** Name of a custom metric to include in the report. The report must be scoped to an advertiser or lower, and the custom metric must already be set up in DoubleClick Search. The custom metric name, which appears in DoubleClick Search, is case sensitive. */
  customMetricName?: string;
  /** Returns metrics only for a specific type of product activity. Accepted values are: - "`sold`": returns metrics only for products that were sold - "`advertised`": returns metrics only for products that were advertised in a Shopping campaign, and that might or might not have been sold */
  productReportPerspective?: string;
  /** Inclusive date in YYYY-MM-DD format. When provided, this overrides the overall time range of the report for this column only. Must be provided together with `endDate`. */
  startDate?: string;
  /** Inclusive day in YYYY-MM-DD format. When provided, this overrides the overall time range of the report for this column only. Must be provided together with `startDate`. */
  endDate?: string;
  /** Synchronous report only. Set to `true` to group by this column. Defaults to `false`. */
  groupByColumn?: boolean;
}

export const ReportApiColumnSpec: Schema.Schema<ReportApiColumnSpec> = Schema.suspend(() => Schema.Struct({
  columnName: Schema.optional(Schema.String),
  savedColumnName: Schema.optional(Schema.String),
  headerText: Schema.optional(Schema.String),
  customDimensionName: Schema.optional(Schema.String),
  platformSource: Schema.optional(Schema.String),
  customMetricName: Schema.optional(Schema.String),
  productReportPerspective: Schema.optional(Schema.String),
  startDate: Schema.optional(Schema.String),
  endDate: Schema.optional(Schema.String),
  groupByColumn: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ReportApiColumnSpec" }) as any as Schema.Schema<ReportApiColumnSpec>;

export interface ReportRequest {
  /** Determines the type of rows that are returned in the report. For example, if you specify `reportType: keyword`, each row in the report will contain data about a keyword. See the [Types of Reports](/search-ads/v2/report-types/) reference for the columns that are available for each type. */
  reportType?: string;
  /** The columns to include in the report. This includes both DoubleClick Search columns and saved columns. For DoubleClick Search columns, only the `columnName` parameter is required. For saved columns only the `savedColumnName` parameter is required. Both `columnName` and `savedColumnName` cannot be set in the same stanza.\ The maximum number of columns per request is 300. */
  columns?: Array<ReportApiColumnSpec>;
  /** A list of filters to be applied to the report.\ The maximum number of filters per request is 300. */
  filters?: Array<{ column?: ReportApiColumnSpec; operator?: string; values?: Array<unknown> }>;
  /** Synchronous report only. A list of columns and directions defining sorting to be performed on the report rows.\ The maximum number of orderings per request is 300. */
  orderBy?: Array<{ column?: ReportApiColumnSpec; sortOrder?: string }>;
  /** Determines if removed entities should be included in the report. Defaults to `false`. */
  includeRemovedEntities?: boolean;
  /** Format that the report should be returned in. Currently `csv` or `tsv` is supported. */
  downloadFormat?: string;
  /** Specifies the currency in which monetary will be returned. Possible values are: `usd`, `agency` (valid if the report is scoped to agency or lower), `advertiser` (valid if the report is scoped to * advertiser or lower), or `account` (valid if the report is scoped to engine account or lower). */
  statisticsCurrency?: string;
  /** Synchronous report only. Zero-based index of the first row to return. Acceptable values are `0` to `50000`, inclusive. Defaults to `0`. */
  startRow?: number;
  /** Synchronous report only. The maximum number of rows to return; additional rows are dropped. Acceptable values are `0` to `10000`, inclusive. Defaults to `10000`. */
  rowCount?: number;
  /** Asynchronous report only. The maximum number of rows per report file. A large report is split into many files based on this field. Acceptable values are `1000000` to `100000000`, inclusive. */
  maxRowsPerFile?: number;
  /** If `true`, the report would only be created if all the requested stat data are sourced from a single timezone. Defaults to `false`. */
  verifySingleTimeZone?: boolean;
  /** Determines if removed entities should be included in the report. Defaults to `false`. Deprecated, please use `includeRemovedEntities` instead. */
  includeDeletedEntities?: boolean;
  /** The reportScope is a set of IDs that are used to determine which subset of entities will be returned in the report. The full lineage of IDs from the lowest scoped level desired up through agency is required. */
  reportScope?: { agencyId?: string; advertiserId?: string; engineAccountId?: string; campaignId?: string; adGroupId?: string; keywordId?: string; adId?: string };
  /** If metrics are requested in a report, this argument will be used to restrict the metrics to a specific time range. */
  timeRange?: { changedMetricsSinceTimestamp?: string; changedAttributesSinceTimestamp?: string; startDate?: string; endDate?: string };
}

export const ReportRequest: Schema.Schema<ReportRequest> = Schema.suspend(() => Schema.Struct({
  reportType: Schema.optional(Schema.String),
  columns: Schema.optional(Schema.Array(ReportApiColumnSpec)),
  filters: Schema.optional(Schema.Array(Schema.Struct({ column: Schema.optional(ReportApiColumnSpec), operator: Schema.optional(Schema.String), values: Schema.optional(Schema.Array(Schema.Unknown)) }))),
  orderBy: Schema.optional(Schema.Array(Schema.Struct({ column: Schema.optional(ReportApiColumnSpec), sortOrder: Schema.optional(Schema.String) }))),
  includeRemovedEntities: Schema.optional(Schema.Boolean),
  downloadFormat: Schema.optional(Schema.String),
  statisticsCurrency: Schema.optional(Schema.String),
  startRow: Schema.optional(Schema.Number),
  rowCount: Schema.optional(Schema.Number),
  maxRowsPerFile: Schema.optional(Schema.Number),
  verifySingleTimeZone: Schema.optional(Schema.Boolean),
  includeDeletedEntities: Schema.optional(Schema.Boolean),
  reportScope: Schema.optional(Schema.Struct({ agencyId: Schema.optional(Schema.String), advertiserId: Schema.optional(Schema.String), engineAccountId: Schema.optional(Schema.String), campaignId: Schema.optional(Schema.String), adGroupId: Schema.optional(Schema.String), keywordId: Schema.optional(Schema.String), adId: Schema.optional(Schema.String) })),
  timeRange: Schema.optional(Schema.Struct({ changedMetricsSinceTimestamp: Schema.optional(Schema.String), changedAttributesSinceTimestamp: Schema.optional(Schema.String), startDate: Schema.optional(Schema.String), endDate: Schema.optional(Schema.String) })),
})).annotate({ identifier: "ReportRequest" }) as any as Schema.Schema<ReportRequest>;

export type ReportRow = Record<string, unknown>;
export const ReportRow: Schema.Schema<ReportRow> = Schema.Record(Schema.String, Schema.Unknown) as any as Schema.Schema<ReportRow>;

export interface Report {
  /** Asynchronous report only. Id of the report. */
  id?: string;
  /** The request that created the report. Optional fields not specified in the original request are filled with default values. */
  request?: ReportRequest;
  /** Synchronous report only. Generated report rows. */
  rows?: Array<ReportRow>;
  /** Asynchronous report only. Contains a list of generated report files once the report has successfully completed. */
  files?: Array<{ url?: string; byteCount?: string }>;
  /** The number of report rows generated by the report, not including headers. */
  rowCount?: number;
  /** The currency code of all monetary values produced in the report, including values that are set by users (e.g., keyword bid settings) and metrics (e.g., cost and revenue). The currency code of a report is determined by the `statisticsCurrency` field of the report request. */
  statisticsCurrencyCode?: string;
  /** If all statistics of the report are sourced from the same time zone, this would be it. Otherwise the field is unset. */
  statisticsTimeZone?: string;
  /** Asynchronous report only. True if and only if the report has completed successfully and the report files are ready to be downloaded. */
  isReportReady?: boolean;
  /** Identifies this as a Report resource. Value: the fixed string `doubleclicksearch#report`. */
  kind?: string;
}

export const Report: Schema.Schema<Report> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  request: Schema.optional(ReportRequest),
  rows: Schema.optional(Schema.Array(ReportRow)),
  files: Schema.optional(Schema.Array(Schema.Struct({ url: Schema.optional(Schema.String), byteCount: Schema.optional(Schema.String) }))),
  rowCount: Schema.optional(Schema.Number),
  statisticsCurrencyCode: Schema.optional(Schema.String),
  statisticsTimeZone: Schema.optional(Schema.String),
  isReportReady: Schema.optional(Schema.Boolean),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "Report" }) as any as Schema.Schema<Report>;

export interface IdMappingFile {
}

export const IdMappingFile: Schema.Schema<IdMappingFile> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "IdMappingFile" }) as any as Schema.Schema<IdMappingFile>;

export interface SavedColumn {
  /** The name of the saved column. */
  savedColumnName?: string;
  /** The type of data this saved column will produce. */
  type?: string;
  /** Identifies this as a SavedColumn resource. Value: the fixed string doubleclicksearch#savedColumn. */
  kind?: string;
}

export const SavedColumn: Schema.Schema<SavedColumn> = Schema.suspend(() => Schema.Struct({
  savedColumnName: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "SavedColumn" }) as any as Schema.Schema<SavedColumn>;

export interface SavedColumnList {
  /** Identifies this as a SavedColumnList resource. Value: the fixed string doubleclicksearch#savedColumnList. */
  kind?: string;
  /** The saved columns being requested. */
  items?: Array<SavedColumn>;
}

export const SavedColumnList: Schema.Schema<SavedColumnList> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(SavedColumn)),
})).annotate({ identifier: "SavedColumnList" }) as any as Schema.Schema<SavedColumnList>;

// ==========================================================================
// Operations
// ==========================================================================

/** Retrieves a list of conversions from a DoubleClick Search engine account. */
export interface GetConversionRequest {
  /** Numeric ID of the agency. */
  agencyId: string;
  /** Numeric ID of the advertiser. */
  advertiserId: string;
  /** Numeric ID of the engine account. */
  engineAccountId: string;
  /** Numeric ID of the ad group. */
  adGroupId?: string;
  /** Numeric ID of the ad. */
  adId?: string;
  /** Numeric ID of the campaign. */
  campaignId?: string;
  /** Numeric ID of the criterion. */
  criterionId?: string;
  /** Last date (inclusive) on which to retrieve conversions. Format is yyyymmdd. */
  endDate: number;
  /** The number of conversions to return per call. */
  rowCount: number;
  /** First date (inclusive) on which to retrieve conversions. Format is yyyymmdd. */
  startDate: number;
  /** The 0-based starting index for retrieving conversions results. */
  startRow: number;
  /** Customer ID of a client account in the new Search Ads 360 experience. */
  customerId?: string;
}

export const GetConversionRequest = Schema.Struct({
  agencyId: Schema.String.pipe(T.HttpPath("agencyId")),
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  engineAccountId: Schema.String.pipe(T.HttpPath("engineAccountId")),
  adGroupId: Schema.optional(Schema.String).pipe(T.HttpQuery("adGroupId")),
  adId: Schema.optional(Schema.String).pipe(T.HttpQuery("adId")),
  campaignId: Schema.optional(Schema.String).pipe(T.HttpQuery("campaignId")),
  criterionId: Schema.optional(Schema.String).pipe(T.HttpQuery("criterionId")),
  endDate: Schema.Number.pipe(T.HttpQuery("endDate")),
  rowCount: Schema.Number.pipe(T.HttpQuery("rowCount")),
  startDate: Schema.Number.pipe(T.HttpQuery("startDate")),
  startRow: Schema.Number.pipe(T.HttpQuery("startRow")),
  customerId: Schema.optional(Schema.String).pipe(T.HttpQuery("customerId")),
}).pipe(
  T.Http({ method: "GET", path: "doubleclicksearch/v2/agency/{agencyId}/advertiser/{advertiserId}/engine/{engineAccountId}/conversion" }),
  svc,
) as unknown as Schema.Schema<GetConversionRequest>;

export type GetConversionResponse = ConversionList;
export const GetConversionResponse = ConversionList;

export type GetConversionError = CommonErrors;

export const getConversion: API.OperationMethod<GetConversionRequest, GetConversionResponse, GetConversionError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetConversionRequest,
  output: GetConversionResponse,
  errors: [],
}));

/** Retrieves a list of conversions from a DoubleClick Search engine account. */
export interface GetByCustomerIdConversionRequest {
  /** Customer ID of a client account in the new Search Ads 360 experience. */
  customerId: string;
  /** Numeric ID of the ad group. */
  adGroupId?: string;
  /** Numeric ID of the ad. */
  adId?: string;
  /** Numeric ID of the advertiser. */
  advertiserId?: string;
  /** Numeric ID of the agency. */
  agencyId?: string;
  /** Numeric ID of the campaign. */
  campaignId?: string;
  /** Numeric ID of the criterion. */
  criterionId?: string;
  /** Last date (inclusive) on which to retrieve conversions. Format is yyyymmdd. */
  endDate: number;
  /** Numeric ID of the engine account. */
  engineAccountId?: string;
  /** The number of conversions to return per call. */
  rowCount: number;
  /** First date (inclusive) on which to retrieve conversions. Format is yyyymmdd. */
  startDate: number;
  /** The 0-based starting index for retrieving conversions results. */
  startRow: number;
}

export const GetByCustomerIdConversionRequest = Schema.Struct({
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
  adGroupId: Schema.optional(Schema.String).pipe(T.HttpQuery("adGroupId")),
  adId: Schema.optional(Schema.String).pipe(T.HttpQuery("adId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
  agencyId: Schema.optional(Schema.String).pipe(T.HttpQuery("agencyId")),
  campaignId: Schema.optional(Schema.String).pipe(T.HttpQuery("campaignId")),
  criterionId: Schema.optional(Schema.String).pipe(T.HttpQuery("criterionId")),
  endDate: Schema.Number.pipe(T.HttpQuery("endDate")),
  engineAccountId: Schema.optional(Schema.String).pipe(T.HttpQuery("engineAccountId")),
  rowCount: Schema.Number.pipe(T.HttpQuery("rowCount")),
  startDate: Schema.Number.pipe(T.HttpQuery("startDate")),
  startRow: Schema.Number.pipe(T.HttpQuery("startRow")),
}).pipe(
  T.Http({ method: "GET", path: "doubleclicksearch/v2/customer/{customerId}/conversion" }),
  svc,
) as unknown as Schema.Schema<GetByCustomerIdConversionRequest>;

export type GetByCustomerIdConversionResponse = ConversionList;
export const GetByCustomerIdConversionResponse = ConversionList;

export type GetByCustomerIdConversionError = CommonErrors;

export const getByCustomerIdConversion: API.OperationMethod<GetByCustomerIdConversionRequest, GetByCustomerIdConversionResponse, GetByCustomerIdConversionError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetByCustomerIdConversionRequest,
  output: GetByCustomerIdConversionResponse,
  errors: [],
}));

/** Inserts a batch of new conversions into DoubleClick Search. */
export interface InsertConversionRequest {
  /** Request body */
  body?: ConversionList;
}

export const InsertConversionRequest = Schema.Struct({
  body: Schema.optional(ConversionList).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "doubleclicksearch/v2/conversion", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertConversionRequest>;

export type InsertConversionResponse = ConversionList;
export const InsertConversionResponse = ConversionList;

export type InsertConversionError = CommonErrors;

export const insertConversion: API.OperationMethod<InsertConversionRequest, InsertConversionResponse, InsertConversionError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertConversionRequest,
  output: InsertConversionResponse,
  errors: [],
}));

/** Updates a batch of conversions in DoubleClick Search. */
export interface UpdateConversionRequest {
  /** Request body */
  body?: ConversionList;
}

export const UpdateConversionRequest = Schema.Struct({
  body: Schema.optional(ConversionList).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "doubleclicksearch/v2/conversion", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateConversionRequest>;

export type UpdateConversionResponse = ConversionList;
export const UpdateConversionResponse = ConversionList;

export type UpdateConversionError = CommonErrors;

export const updateConversion: API.OperationMethod<UpdateConversionRequest, UpdateConversionResponse, UpdateConversionError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateConversionRequest,
  output: UpdateConversionResponse,
  errors: [],
}));

/** Updates the availabilities of a batch of floodlight activities in DoubleClick Search. */
export interface UpdateAvailabilityConversionRequest {
  /** Request body */
  body?: UpdateAvailabilityRequest;
}

export const UpdateAvailabilityConversionRequest = Schema.Struct({
  body: Schema.optional(UpdateAvailabilityRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "doubleclicksearch/v2/conversion/updateAvailability", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAvailabilityConversionRequest>;

export type UpdateAvailabilityConversionResponse = UpdateAvailabilityResponse;
export const UpdateAvailabilityConversionResponse = UpdateAvailabilityResponse;

export type UpdateAvailabilityConversionError = CommonErrors;

export const updateAvailabilityConversion: API.OperationMethod<UpdateAvailabilityConversionRequest, UpdateAvailabilityConversionResponse, UpdateAvailabilityConversionError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAvailabilityConversionRequest,
  output: UpdateAvailabilityConversionResponse,
  errors: [],
}));

/** Generates and returns a report immediately. */
export interface GenerateReportsRequest {
  /** Request body */
  body?: ReportRequest;
}

export const GenerateReportsRequest = Schema.Struct({
  body: Schema.optional(ReportRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "doubleclicksearch/v2/reports/generate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GenerateReportsRequest>;

export type GenerateReportsResponse = Report;
export const GenerateReportsResponse = Report;

export type GenerateReportsError = CommonErrors;

export const generateReports: API.OperationMethod<GenerateReportsRequest, GenerateReportsResponse, GenerateReportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateReportsRequest,
  output: GenerateReportsResponse,
  errors: [],
}));

/** Polls for the status of a report request. */
export interface GetReportsRequest {
  /** ID of the report request being polled. */
  reportId: string;
}

export const GetReportsRequest = Schema.Struct({
  reportId: Schema.String.pipe(T.HttpPath("reportId")),
}).pipe(
  T.Http({ method: "GET", path: "doubleclicksearch/v2/reports/{reportId}" }),
  svc,
) as unknown as Schema.Schema<GetReportsRequest>;

export type GetReportsResponse = Report;
export const GetReportsResponse = Report;

export type GetReportsError = CommonErrors;

export const getReports: API.OperationMethod<GetReportsRequest, GetReportsResponse, GetReportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetReportsRequest,
  output: GetReportsResponse,
  errors: [],
}));

/** Downloads a report file encoded in UTF-8. */
export interface GetFileReportsRequest {
  /** ID of the report. */
  reportId: string;
  /** The index of the report fragment to download. */
  reportFragment: number;
}

export const GetFileReportsRequest = Schema.Struct({
  reportId: Schema.String.pipe(T.HttpPath("reportId")),
  reportFragment: Schema.Number.pipe(T.HttpPath("reportFragment")),
}).pipe(
  T.Http({ method: "GET", path: "doubleclicksearch/v2/reports/{reportId}/files/{reportFragment}" }),
  svc,
) as unknown as Schema.Schema<GetFileReportsRequest>;

export interface GetFileReportsResponse {}
export const GetFileReportsResponse: Schema.Schema<GetFileReportsResponse> = Schema.Struct({}) as any as Schema.Schema<GetFileReportsResponse>;

export type GetFileReportsError = CommonErrors;

export const getFileReports: API.OperationMethod<GetFileReportsRequest, GetFileReportsResponse, GetFileReportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFileReportsRequest,
  output: GetFileReportsResponse,
  errors: [],
}));

/** Downloads a csv file(encoded in UTF-8) that contains ID mappings between legacy SA360 and new SA360. The file includes all children entities of the given advertiser(e.g. engine accounts, campaigns, ad groups, etc.) that exist in both legacy SA360 and new SA360. */
export interface GetIdMappingFileReportsRequest {
  /** Legacy SA360 agency ID. */
  agencyId: string;
  /** Legacy SA360 advertiser ID. */
  advertiserId: string;
}

export const GetIdMappingFileReportsRequest = Schema.Struct({
  agencyId: Schema.String.pipe(T.HttpPath("agencyId")),
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
}).pipe(
  T.Http({ method: "GET", path: "doubleclicksearch/v2/agency/{agencyId}/advertiser/{advertiserId}/idmapping" }),
  svc,
) as unknown as Schema.Schema<GetIdMappingFileReportsRequest>;

export type GetIdMappingFileReportsResponse = IdMappingFile;
export const GetIdMappingFileReportsResponse = IdMappingFile;

export type GetIdMappingFileReportsError = CommonErrors;

export const getIdMappingFileReports: API.OperationMethod<GetIdMappingFileReportsRequest, GetIdMappingFileReportsResponse, GetIdMappingFileReportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIdMappingFileReportsRequest,
  output: GetIdMappingFileReportsResponse,
  errors: [],
}));

/** Inserts a report request into the reporting system. */
export interface RequestReportsRequest {
  /** Request body */
  body?: ReportRequest;
}

export const RequestReportsRequest = Schema.Struct({
  body: Schema.optional(ReportRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "doubleclicksearch/v2/reports", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RequestReportsRequest>;

export type RequestReportsResponse = Report;
export const RequestReportsResponse = Report;

export type RequestReportsError = CommonErrors;

export const requestReports: API.OperationMethod<RequestReportsRequest, RequestReportsResponse, RequestReportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RequestReportsRequest,
  output: RequestReportsResponse,
  errors: [],
}));

/** Retrieve the list of saved columns for a specified advertiser. */
export interface ListSavedColumnsRequest {
  /** DS ID of the agency. */
  agencyId: string;
  /** DS ID of the advertiser. */
  advertiserId: string;
}

export const ListSavedColumnsRequest = Schema.Struct({
  agencyId: Schema.String.pipe(T.HttpPath("agencyId")),
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
}).pipe(
  T.Http({ method: "GET", path: "doubleclicksearch/v2/agency/{agencyId}/advertiser/{advertiserId}/savedcolumns" }),
  svc,
) as unknown as Schema.Schema<ListSavedColumnsRequest>;

export type ListSavedColumnsResponse = SavedColumnList;
export const ListSavedColumnsResponse = SavedColumnList;

export type ListSavedColumnsError = CommonErrors;

export const listSavedColumns: API.OperationMethod<ListSavedColumnsRequest, ListSavedColumnsResponse, ListSavedColumnsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListSavedColumnsRequest,
  output: ListSavedColumnsResponse,
  errors: [],
}));

