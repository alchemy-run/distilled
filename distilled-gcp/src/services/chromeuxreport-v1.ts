// ==========================================================================
// Chrome UX Report API (chromeuxreport v1)
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
  name: "chromeuxreport",
  version: "v1",
  rootUrl: "https://chromeuxreport.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface QueryRequest {
  /** The url pattern "origin" refers to a url pattern that is the origin of a website. Examples: "https://example.com", "https://cloud.google.com" */
  origin?: string;
  /** The url pattern "url" refers to a url pattern that is any arbitrary url. Examples: "https://example.com/", "https://cloud.google.com/why-google-cloud/" */
  url?: string;
  /** The effective connection type is a query dimension that specifies the effective network class that the record's data should belong to. This field uses the values ["offline", "slow-2G", "2G", "3G", "4G"] as specified in: https://wicg.github.io/netinfo/#effective-connection-types Note: If no effective connection type is specified, then a special record with aggregated data over all effective connection types will be returned. */
  effectiveConnectionType?: string;
  /** The form factor is a query dimension that specifies the device class that the record's data should belong to. Note: If no form factor is specified, then a special record with aggregated data over all form factors will be returned. */
  formFactor?: "ALL_FORM_FACTORS" | "PHONE" | "DESKTOP" | "TABLET" | (string & {});
  /** The metrics that should be included in the response. If none are specified then any metrics found will be returned. Allowed values: ["first_contentful_paint", "first_input_delay", "largest_contentful_paint", "cumulative_layout_shift", "experimental_time_to_first_byte", "experimental_interaction_to_next_paint"] */
  metrics?: Array<string>;
}

export const QueryRequest: Schema.Schema<QueryRequest> = Schema.suspend(() => Schema.Struct({
  origin: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
  effectiveConnectionType: Schema.optional(Schema.String),
  formFactor: Schema.optional(Schema.String),
  metrics: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "QueryRequest" }) as any as Schema.Schema<QueryRequest>;

export interface Key {
  /** Origin specifies the origin that this record is for. Note: When specifying an origin, data for loads under this origin over all pages are aggregated into origin level user experience data. */
  origin?: string;
  /** Url specifies a specific url that this record is for. Note: When specifying a "url" only data for that specific url will be aggregated. */
  url?: string;
  /** The form factor is the device class that all users used to access the site for this record. If the form factor is unspecified, then aggregated data over all form factors will be returned. */
  formFactor?: "ALL_FORM_FACTORS" | "PHONE" | "DESKTOP" | "TABLET" | (string & {});
  /** The effective connection type is the general connection class that all users experienced for this record. This field uses the values ["offline", "slow-2G", "2G", "3G", "4G"] as specified in: https://wicg.github.io/netinfo/#effective-connection-types If the effective connection type is unspecified, then aggregated data over all effective connection types will be returned. */
  effectiveConnectionType?: string;
}

export const Key: Schema.Schema<Key> = Schema.suspend(() => Schema.Struct({
  origin: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
  formFactor: Schema.optional(Schema.String),
  effectiveConnectionType: Schema.optional(Schema.String),
})).annotate({ identifier: "Key" }) as any as Schema.Schema<Key>;

export interface Bin {
  /** Start is the beginning of the data bin. */
  start?: unknown;
  /** End is the end of the data bin. If end is not populated, then the bin has no end and is valid from start to +inf. */
  end?: unknown;
  /** The proportion of users that experienced this bin's value for the given metric. */
  density?: unknown;
}

export const Bin: Schema.Schema<Bin> = Schema.suspend(() => Schema.Struct({
  start: Schema.optional(Schema.Unknown),
  end: Schema.optional(Schema.Unknown),
  density: Schema.optional(Schema.Unknown),
})).annotate({ identifier: "Bin" }) as any as Schema.Schema<Bin>;

export interface Percentiles {
  /** 75% of users experienced the given metric at or below this value. */
  p75?: unknown;
}

export const Percentiles: Schema.Schema<Percentiles> = Schema.suspend(() => Schema.Struct({
  p75: Schema.optional(Schema.Unknown),
})).annotate({ identifier: "Percentiles" }) as any as Schema.Schema<Percentiles>;

export interface Metric {
  /** The histogram of user experiences for a metric. The histogram will have at least one bin and the densities of all bins will add up to ~1. */
  histogram?: Array<Bin>;
  /** Commonly useful percentiles of the Metric. The value type for the percentiles will be the same as the value types given for the Histogram bins. */
  percentiles?: Percentiles;
  /** For enum metrics, provides fractions which add up to approximately 1.0. */
  fractions?: Record<string, number>;
}

export const Metric: Schema.Schema<Metric> = Schema.suspend(() => Schema.Struct({
  histogram: Schema.optional(Schema.Array(Bin)),
  percentiles: Schema.optional(Percentiles),
  fractions: Schema.optional(Schema.Record(Schema.String, Schema.Number)),
})).annotate({ identifier: "Metric" }) as any as Schema.Schema<Metric>;

export interface Chromeuxreport_Date {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const Chromeuxreport_Date: Schema.Schema<Chromeuxreport_Date> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
})).annotate({ identifier: "Chromeuxreport_Date" }) as any as Schema.Schema<Chromeuxreport_Date>;

export interface CollectionPeriod {
  /** The first day in the collection period, inclusive. */
  firstDate?: Chromeuxreport_Date;
  /** The last day in the collection period, inclusive. */
  lastDate?: Chromeuxreport_Date;
}

export const CollectionPeriod: Schema.Schema<CollectionPeriod> = Schema.suspend(() => Schema.Struct({
  firstDate: Schema.optional(Chromeuxreport_Date),
  lastDate: Schema.optional(Chromeuxreport_Date),
})).annotate({ identifier: "CollectionPeriod" }) as any as Schema.Schema<CollectionPeriod>;

export interface Chromeuxreport_Record {
  /** Key defines all of the unique querying parameters needed to look up a user experience record. */
  key?: Key;
  /** Metrics is the map of user experience data available for the record defined in the key field. Metrics are keyed on the metric name. Allowed key values: ["first_contentful_paint", "first_input_delay", "largest_contentful_paint", "cumulative_layout_shift", "experimental_time_to_first_byte", "experimental_interaction_to_next_paint"] */
  metrics?: Record<string, Metric>;
  /** The collection period indicates when the data reflected in this record was collected. */
  collectionPeriod?: CollectionPeriod;
}

export const Chromeuxreport_Record: Schema.Schema<Chromeuxreport_Record> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Key),
  metrics: Schema.optional(Schema.Record(Schema.String, Metric)),
  collectionPeriod: Schema.optional(CollectionPeriod),
})).annotate({ identifier: "Chromeuxreport_Record" }) as any as Schema.Schema<Chromeuxreport_Record>;

export interface UrlNormalization {
  /** The original requested URL prior to any normalization actions. */
  originalUrl?: string;
  /** The URL after any normalization actions. This is a valid user experience URL that could reasonably be looked up. */
  normalizedUrl?: string;
}

export const UrlNormalization: Schema.Schema<UrlNormalization> = Schema.suspend(() => Schema.Struct({
  originalUrl: Schema.optional(Schema.String),
  normalizedUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "UrlNormalization" }) as any as Schema.Schema<UrlNormalization>;

export interface QueryResponse {
  /** The record that was found. */
  record?: Chromeuxreport_Record;
  /** These are details about automated normalization actions that were taken in order to make the requested `url_pattern` valid. */
  urlNormalizationDetails?: UrlNormalization;
}

export const QueryResponse: Schema.Schema<QueryResponse> = Schema.suspend(() => Schema.Struct({
  record: Schema.optional(Chromeuxreport_Record),
  urlNormalizationDetails: Schema.optional(UrlNormalization),
})).annotate({ identifier: "QueryResponse" }) as any as Schema.Schema<QueryResponse>;

export interface QueryHistoryRequest {
  /** The url pattern "origin" refers to a url pattern that is the origin of a website. Examples: "https://example.com", "https://cloud.google.com" */
  origin?: string;
  /** The url pattern "url" refers to a url pattern that is any arbitrary url. Examples: "https://example.com/", "https://cloud.google.com/why-google-cloud/" */
  url?: string;
  /** The form factor is a query dimension that specifies the device class that the record's data should belong to. Note: If no form factor is specified, then a special record with aggregated data over all form factors will be returned. */
  formFactor?: "ALL_FORM_FACTORS" | "PHONE" | "DESKTOP" | "TABLET" | (string & {});
  /** The metrics that should be included in the response. If none are specified then any metrics found will be returned. Allowed values: ["first_contentful_paint", "first_input_delay", "largest_contentful_paint", "cumulative_layout_shift", "experimental_time_to_first_byte", "experimental_interaction_to_next_paint"] */
  metrics?: Array<string>;
  /** The number of collection periods to return. If not specified, the default is 25. If present, must be in the range [1, 40]. */
  collectionPeriodCount?: number;
}

export const QueryHistoryRequest: Schema.Schema<QueryHistoryRequest> = Schema.suspend(() => Schema.Struct({
  origin: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
  formFactor: Schema.optional(Schema.String),
  metrics: Schema.optional(Schema.Array(Schema.String)),
  collectionPeriodCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "QueryHistoryRequest" }) as any as Schema.Schema<QueryHistoryRequest>;

export interface HistoryKey {
  /** Origin specifies the origin that this record is for. Note: When specifying an origin, data for loads under this origin over all pages are aggregated into origin level user experience data. */
  origin?: string;
  /** Url specifies a specific url that this record is for. This url should be normalized, following the normalization actions taken in the request to increase the chances of successful lookup. Note: When specifying a "url" only data for that specific url will be aggregated. */
  url?: string;
  /** The form factor is the device class that all users used to access the site for this record. If the form factor is unspecified, then aggregated data over all form factors will be returned. */
  formFactor?: "ALL_FORM_FACTORS" | "PHONE" | "DESKTOP" | "TABLET" | (string & {});
}

export const HistoryKey: Schema.Schema<HistoryKey> = Schema.suspend(() => Schema.Struct({
  origin: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
  formFactor: Schema.optional(Schema.String),
})).annotate({ identifier: "HistoryKey" }) as any as Schema.Schema<HistoryKey>;

export interface TimeseriesBin {
  /** Start is the beginning of the data bin. */
  start?: unknown;
  /** End is the end of the data bin. If end is not populated, then the bin has no end and is valid from start to +inf. */
  end?: unknown;
  /** The proportion of users that experienced this bin's value for the given metric in a given collection period; the index for each of these entries corresponds to an entry in the CollectionPeriods field in the HistoryRecord message, which describes when the density was observed in the field. Thus, the length of this list of densities is equal to the length of the CollectionPeriods field in the HistoryRecord message. */
  densities?: Array<number>;
}

export const TimeseriesBin: Schema.Schema<TimeseriesBin> = Schema.suspend(() => Schema.Struct({
  start: Schema.optional(Schema.Unknown),
  end: Schema.optional(Schema.Unknown),
  densities: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "TimeseriesBin" }) as any as Schema.Schema<TimeseriesBin>;

export interface TimeseriesPercentiles {
  /** 75% of users experienced the given metric at or below this value. The length of this list of densities is equal to the length of the CollectionPeriods field in the HistoryRecord message, which describes when the density was observed in the field. */
  p75s?: Array<unknown>;
}

export const TimeseriesPercentiles: Schema.Schema<TimeseriesPercentiles> = Schema.suspend(() => Schema.Struct({
  p75s: Schema.optional(Schema.Array(Schema.Unknown)),
})).annotate({ identifier: "TimeseriesPercentiles" }) as any as Schema.Schema<TimeseriesPercentiles>;

export interface FractionTimeseries {
  /** Values between 0.0 and 1.0 (inclusive) and NaN. */
  fractions?: Array<number>;
}

export const FractionTimeseries: Schema.Schema<FractionTimeseries> = Schema.suspend(() => Schema.Struct({
  fractions: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "FractionTimeseries" }) as any as Schema.Schema<FractionTimeseries>;

export interface MetricTimeseries {
  /** The histogram of user experiences for a metric. The histogram will have at least one bin and the densities of all bins will add up to ~1, for each timeseries entry. */
  histogramTimeseries?: Array<TimeseriesBin>;
  /** Commonly useful percentiles of the Metric. The value type for the percentiles will be the same as the value types given for the Histogram bins. */
  percentilesTimeseries?: TimeseriesPercentiles;
  /** Mapping from labels to timeseries of fractions attributed to this label. */
  fractionTimeseries?: Record<string, FractionTimeseries>;
}

export const MetricTimeseries: Schema.Schema<MetricTimeseries> = Schema.suspend(() => Schema.Struct({
  histogramTimeseries: Schema.optional(Schema.Array(TimeseriesBin)),
  percentilesTimeseries: Schema.optional(TimeseriesPercentiles),
  fractionTimeseries: Schema.optional(Schema.Record(Schema.String, FractionTimeseries)),
})).annotate({ identifier: "MetricTimeseries" }) as any as Schema.Schema<MetricTimeseries>;

export interface HistoryRecord {
  /** Key defines all of the unique querying parameters needed to look up a user experience history record. */
  key?: HistoryKey;
  /** Metrics is the map of user experience time series data available for the record defined in the key field. Metrics are keyed on the metric name. Allowed key values: ["first_contentful_paint", "first_input_delay", "largest_contentful_paint", "cumulative_layout_shift", "experimental_time_to_first_byte", "experimental_interaction_to_next_paint"] */
  metrics?: Record<string, MetricTimeseries>;
  /** The collection periods indicate when each of the data points reflected in the time series data in metrics was collected. Note that all the time series share the same collection periods, and it is enforced in the CrUX pipeline that every time series has the same number of data points. */
  collectionPeriods?: Array<CollectionPeriod>;
}

export const HistoryRecord: Schema.Schema<HistoryRecord> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(HistoryKey),
  metrics: Schema.optional(Schema.Record(Schema.String, MetricTimeseries)),
  collectionPeriods: Schema.optional(Schema.Array(CollectionPeriod)),
})).annotate({ identifier: "HistoryRecord" }) as any as Schema.Schema<HistoryRecord>;

export interface QueryHistoryResponse {
  /** The record that was found. */
  record?: HistoryRecord;
  /** These are details about automated normalization actions that were taken in order to make the requested `url_pattern` valid. */
  urlNormalizationDetails?: UrlNormalization;
}

export const QueryHistoryResponse: Schema.Schema<QueryHistoryResponse> = Schema.suspend(() => Schema.Struct({
  record: Schema.optional(HistoryRecord),
  urlNormalizationDetails: Schema.optional(UrlNormalization),
})).annotate({ identifier: "QueryHistoryResponse" }) as any as Schema.Schema<QueryHistoryResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Queries the Chrome User Experience for a single `record` for a given site. Returns a `record` that contains one or more `metrics` corresponding to performance data about the requested site. */
export interface QueryRecordRecordsRequest {
  /** Request body */
  body?: QueryRequest;
}

export const QueryRecordRecordsRequest = Schema.Struct({
  body: Schema.optional(QueryRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/records:queryRecord", hasBody: true }),
  svc,
) as unknown as Schema.Schema<QueryRecordRecordsRequest>;

export type QueryRecordRecordsResponse = QueryResponse;
export const QueryRecordRecordsResponse = QueryResponse;

export type QueryRecordRecordsError = CommonErrors;

export const queryRecordRecords: API.OperationMethod<QueryRecordRecordsRequest, QueryRecordRecordsResponse, QueryRecordRecordsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: QueryRecordRecordsRequest,
  output: QueryRecordRecordsResponse,
  errors: [],
}));

/** Queries the Chrome User Experience Report for a timeseries `history record` for a given site. Returns a `history record` that contains one or more `metric timeseries` corresponding to performance data about the requested site. */
export interface QueryHistoryRecordRecordsRequest {
  /** Request body */
  body?: QueryHistoryRequest;
}

export const QueryHistoryRecordRecordsRequest = Schema.Struct({
  body: Schema.optional(QueryHistoryRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/records:queryHistoryRecord", hasBody: true }),
  svc,
) as unknown as Schema.Schema<QueryHistoryRecordRecordsRequest>;

export type QueryHistoryRecordRecordsResponse = QueryHistoryResponse;
export const QueryHistoryRecordRecordsResponse = QueryHistoryResponse;

export type QueryHistoryRecordRecordsError = CommonErrors;

export const queryHistoryRecordRecords: API.OperationMethod<QueryHistoryRecordRecordsRequest, QueryHistoryRecordRecordsResponse, QueryHistoryRecordRecordsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: QueryHistoryRecordRecordsRequest,
  output: QueryHistoryRecordRecordsResponse,
  errors: [],
}));

