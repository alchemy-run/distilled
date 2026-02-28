// ==========================================================================
// Google Analytics Data API (analyticsdata v1beta)
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
  name: "analyticsdata",
  version: "v1beta",
  rootUrl: "https://analyticsdata.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface CaseExpression {
  /** Name of a dimension. The name must refer back to a name in dimensions field of the request. */
  dimensionName?: string;
}

export const CaseExpression: Schema.Schema<CaseExpression> = Schema.suspend(() => Schema.Struct({
  dimensionName: Schema.optional(Schema.String),
})).annotate({ identifier: "CaseExpression" }) as any as Schema.Schema<CaseExpression>;

export interface ConcatenateExpression {
  /** Names of dimensions. The names must refer back to names in the dimensions field of the request. */
  dimensionNames?: Array<string>;
  /** The delimiter placed between dimension names. Delimiters are often single characters such as "|" or "," but can be longer strings. If a dimension value contains the delimiter, both will be present in response with no distinction. For example if dimension 1 value = "US,FR", dimension 2 value = "JP", and delimiter = ",", then the response will contain "US,FR,JP". */
  delimiter?: string;
}

export const ConcatenateExpression: Schema.Schema<ConcatenateExpression> = Schema.suspend(() => Schema.Struct({
  dimensionNames: Schema.optional(Schema.Array(Schema.String)),
  delimiter: Schema.optional(Schema.String),
})).annotate({ identifier: "ConcatenateExpression" }) as any as Schema.Schema<ConcatenateExpression>;

export interface DimensionExpression {
  /** Used to convert a dimension value to lower case. */
  lowerCase?: CaseExpression;
  /** Used to convert a dimension value to upper case. */
  upperCase?: CaseExpression;
  /** Used to combine dimension values to a single dimension. For example, dimension "country, city": concatenate(country, ", ", city). */
  concatenate?: ConcatenateExpression;
}

export const DimensionExpression: Schema.Schema<DimensionExpression> = Schema.suspend(() => Schema.Struct({
  lowerCase: Schema.optional(CaseExpression),
  upperCase: Schema.optional(CaseExpression),
  concatenate: Schema.optional(ConcatenateExpression),
})).annotate({ identifier: "DimensionExpression" }) as any as Schema.Schema<DimensionExpression>;

export interface Dimension {
  /** The name of the dimension. See the [API Dimensions](https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema#dimensions) for the list of dimension names supported by core reporting methods such as `runReport` and `batchRunReports`. See [Realtime Dimensions](https://developers.google.com/analytics/devguides/reporting/data/v1/realtime-api-schema#dimensions) for the list of dimension names supported by the `runRealtimeReport` method. See [Funnel Dimensions](https://developers.google.com/analytics/devguides/reporting/data/v1/exploration-api-schema#dimensions) for the list of dimension names supported by the `runFunnelReport` method. If `dimensionExpression` is specified, `name` can be any string that you would like within the allowed character set. For example if a `dimensionExpression` concatenates `country` and `city`, you could call that dimension `countryAndCity`. Dimension names that you choose must match the regular expression `^[a-zA-Z0-9_]$`. Dimensions are referenced by `name` in `dimensionFilter`, `orderBys`, `dimensionExpression`, and `pivots`. */
  name?: string;
  /** One dimension can be the result of an expression of multiple dimensions. For example, dimension "country, city": concatenate(country, ", ", city). */
  dimensionExpression?: DimensionExpression;
}

export const Dimension: Schema.Schema<Dimension> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  dimensionExpression: Schema.optional(DimensionExpression),
})).annotate({ identifier: "Dimension" }) as any as Schema.Schema<Dimension>;

export interface Metric {
  /** The name of the metric. See the [API Metrics](https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema#metrics) for the list of metric names supported by core reporting methods such as `runReport` and `batchRunReports`. See [Realtime Metrics](https://developers.google.com/analytics/devguides/reporting/data/v1/realtime-api-schema#metrics) for the list of metric names supported by the `runRealtimeReport` method. See [Funnel Metrics](https://developers.google.com/analytics/devguides/reporting/data/v1/exploration-api-schema#metrics) for the list of metric names supported by the `runFunnelReport` method. If `expression` is specified, `name` can be any string that you would like within the allowed character set. For example if `expression` is `screenPageViews/sessions`, you could call that metric's name = `viewsPerSession`. Metric names that you choose must match the regular expression `^[a-zA-Z0-9_]$`. Metrics are referenced by `name` in `metricFilter`, `orderBys`, and metric `expression`. */
  name?: string;
  /** A mathematical expression for derived metrics. For example, the metric Event count per user is `eventCount/totalUsers`. */
  expression?: string;
  /** Indicates if a metric is invisible in the report response. If a metric is invisible, the metric will not produce a column in the response, but can be used in `metricFilter`, `orderBys`, or a metric `expression`. */
  invisible?: boolean;
}

export const Metric: Schema.Schema<Metric> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  expression: Schema.optional(Schema.String),
  invisible: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Metric" }) as any as Schema.Schema<Metric>;

export interface DateRange {
  /** The inclusive start date for the query in the format `YYYY-MM-DD`. Cannot be after `end_date`. The format `NdaysAgo`, `yesterday`, or `today` is also accepted, and in that case, the date is inferred based on the property's reporting time zone. */
  startDate?: string;
  /** The inclusive end date for the query in the format `YYYY-MM-DD`. Cannot be before `start_date`. The format `NdaysAgo`, `yesterday`, or `today` is also accepted, and in that case, the date is inferred based on the property's reporting time zone. */
  endDate?: string;
  /** Assigns a name to this date range. The dimension `dateRange` is valued to this name in a report response. If set, cannot begin with `date_range_` or `RESERVED_`. If not set, date ranges are named by their zero based index in the request: `date_range_0`, `date_range_1`, etc. */
  name?: string;
}

export const DateRange: Schema.Schema<DateRange> = Schema.suspend(() => Schema.Struct({
  startDate: Schema.optional(Schema.String),
  endDate: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "DateRange" }) as any as Schema.Schema<DateRange>;

export interface FilterExpressionList {
  /** A list of filter expressions. */
  expressions?: Array<FilterExpression>;
}

export const FilterExpressionList: Schema.Schema<FilterExpressionList> = Schema.suspend(() => Schema.Struct({
  expressions: Schema.optional(Schema.Array(FilterExpression)),
})).annotate({ identifier: "FilterExpressionList" }) as any as Schema.Schema<FilterExpressionList>;

export interface StringFilter {
  /** The match type for this filter. */
  matchType?: "MATCH_TYPE_UNSPECIFIED" | "EXACT" | "BEGINS_WITH" | "ENDS_WITH" | "CONTAINS" | "FULL_REGEXP" | "PARTIAL_REGEXP" | (string & {});
  /** The string value used for the matching. */
  value?: string;
  /** If true, the string value is case sensitive. */
  caseSensitive?: boolean;
}

export const StringFilter: Schema.Schema<StringFilter> = Schema.suspend(() => Schema.Struct({
  matchType: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
  caseSensitive: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "StringFilter" }) as any as Schema.Schema<StringFilter>;

export interface InListFilter {
  /** The list of string values. Must be non-empty. */
  values?: Array<string>;
  /** If true, the string value is case sensitive. */
  caseSensitive?: boolean;
}

export const InListFilter: Schema.Schema<InListFilter> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Schema.String)),
  caseSensitive: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "InListFilter" }) as any as Schema.Schema<InListFilter>;

export interface NumericValue {
  /** Integer value */
  int64Value?: string;
  /** Double value */
  doubleValue?: number;
}

export const NumericValue: Schema.Schema<NumericValue> = Schema.suspend(() => Schema.Struct({
  int64Value: Schema.optional(Schema.String),
  doubleValue: Schema.optional(Schema.Number),
})).annotate({ identifier: "NumericValue" }) as any as Schema.Schema<NumericValue>;

export interface NumericFilter {
  /** The operation type for this filter. */
  operation?: "OPERATION_UNSPECIFIED" | "EQUAL" | "LESS_THAN" | "LESS_THAN_OR_EQUAL" | "GREATER_THAN" | "GREATER_THAN_OR_EQUAL" | (string & {});
  /** A numeric value or a date value. */
  value?: NumericValue;
}

export const NumericFilter: Schema.Schema<NumericFilter> = Schema.suspend(() => Schema.Struct({
  operation: Schema.optional(Schema.String),
  value: Schema.optional(NumericValue),
})).annotate({ identifier: "NumericFilter" }) as any as Schema.Schema<NumericFilter>;

export interface BetweenFilter {
  /** Begins with this number. */
  fromValue?: NumericValue;
  /** Ends with this number. */
  toValue?: NumericValue;
}

export const BetweenFilter: Schema.Schema<BetweenFilter> = Schema.suspend(() => Schema.Struct({
  fromValue: Schema.optional(NumericValue),
  toValue: Schema.optional(NumericValue),
})).annotate({ identifier: "BetweenFilter" }) as any as Schema.Schema<BetweenFilter>;

export interface EmptyFilter {
}

export const EmptyFilter: Schema.Schema<EmptyFilter> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "EmptyFilter" }) as any as Schema.Schema<EmptyFilter>;

export interface Filter {
  /** The dimension name or metric name. In most methods, dimensions & metrics can be used for the first time in this field. However in a RunPivotReportRequest, this field must be additionally specified by name in the RunPivotReportRequest's dimensions or metrics. */
  fieldName?: string;
  /** Strings related filter. */
  stringFilter?: StringFilter;
  /** A filter for in list values. */
  inListFilter?: InListFilter;
  /** A filter for numeric or date values. */
  numericFilter?: NumericFilter;
  /** A filter for two values. */
  betweenFilter?: BetweenFilter;
  /** A filter for empty values such as "(not set)" and "" values. */
  emptyFilter?: EmptyFilter;
}

export const Filter: Schema.Schema<Filter> = Schema.suspend(() => Schema.Struct({
  fieldName: Schema.optional(Schema.String),
  stringFilter: Schema.optional(StringFilter),
  inListFilter: Schema.optional(InListFilter),
  numericFilter: Schema.optional(NumericFilter),
  betweenFilter: Schema.optional(BetweenFilter),
  emptyFilter: Schema.optional(EmptyFilter),
})).annotate({ identifier: "Filter" }) as any as Schema.Schema<Filter>;

export interface FilterExpression {
  /** The FilterExpressions in and_group have an AND relationship. */
  andGroup?: FilterExpressionList;
  /** The FilterExpressions in or_group have an OR relationship. */
  orGroup?: FilterExpressionList;
  /** The FilterExpression is NOT of not_expression. */
  notExpression?: FilterExpression;
  /** A primitive filter. In the same FilterExpression, all of the filter's field names need to be either all dimensions or all metrics. */
  filter?: Filter;
}

export const FilterExpression: Schema.Schema<FilterExpression> = Schema.suspend(() => Schema.Struct({
  andGroup: Schema.optional(FilterExpressionList),
  orGroup: Schema.optional(FilterExpressionList),
  notExpression: Schema.optional(FilterExpression),
  filter: Schema.optional(Filter),
})).annotate({ identifier: "FilterExpression" }) as any as Schema.Schema<FilterExpression>;

export interface MetricOrderBy {
  /** A metric name in the request to order by. */
  metricName?: string;
}

export const MetricOrderBy: Schema.Schema<MetricOrderBy> = Schema.suspend(() => Schema.Struct({
  metricName: Schema.optional(Schema.String),
})).annotate({ identifier: "MetricOrderBy" }) as any as Schema.Schema<MetricOrderBy>;

export interface DimensionOrderBy {
  /** A dimension name in the request to order by. */
  dimensionName?: string;
  /** Controls the rule for dimension value ordering. */
  orderType?: "ORDER_TYPE_UNSPECIFIED" | "ALPHANUMERIC" | "CASE_INSENSITIVE_ALPHANUMERIC" | "NUMERIC" | (string & {});
}

export const DimensionOrderBy: Schema.Schema<DimensionOrderBy> = Schema.suspend(() => Schema.Struct({
  dimensionName: Schema.optional(Schema.String),
  orderType: Schema.optional(Schema.String),
})).annotate({ identifier: "DimensionOrderBy" }) as any as Schema.Schema<DimensionOrderBy>;

export interface PivotSelection {
  /** Must be a dimension name from the request. */
  dimensionName?: string;
  /** Order by only when the named dimension is this value. */
  dimensionValue?: string;
}

export const PivotSelection: Schema.Schema<PivotSelection> = Schema.suspend(() => Schema.Struct({
  dimensionName: Schema.optional(Schema.String),
  dimensionValue: Schema.optional(Schema.String),
})).annotate({ identifier: "PivotSelection" }) as any as Schema.Schema<PivotSelection>;

export interface PivotOrderBy {
  /** In the response to order by, order rows by this column. Must be a metric name from the request. */
  metricName?: string;
  /** Used to select a dimension name and value pivot. If multiple pivot selections are given, the sort occurs on rows where all pivot selection dimension name and value pairs match the row's dimension name and value pair. */
  pivotSelections?: Array<PivotSelection>;
}

export const PivotOrderBy: Schema.Schema<PivotOrderBy> = Schema.suspend(() => Schema.Struct({
  metricName: Schema.optional(Schema.String),
  pivotSelections: Schema.optional(Schema.Array(PivotSelection)),
})).annotate({ identifier: "PivotOrderBy" }) as any as Schema.Schema<PivotOrderBy>;

export interface OrderBy {
  /** Sorts results by a metric's values. */
  metric?: MetricOrderBy;
  /** Sorts results by a dimension's values. */
  dimension?: DimensionOrderBy;
  /** Sorts results by a metric's values within a pivot column group. */
  pivot?: PivotOrderBy;
  /** If true, sorts by descending order. */
  desc?: boolean;
}

export const OrderBy: Schema.Schema<OrderBy> = Schema.suspend(() => Schema.Struct({
  metric: Schema.optional(MetricOrderBy),
  dimension: Schema.optional(DimensionOrderBy),
  pivot: Schema.optional(PivotOrderBy),
  desc: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "OrderBy" }) as any as Schema.Schema<OrderBy>;

export interface Cohort {
  /** Assigns a name to this cohort. The dimension `cohort` is valued to this name in a report response. If set, cannot begin with `cohort_` or `RESERVED_`. If not set, cohorts are named by their zero based index `cohort_0`, `cohort_1`, etc. */
  name?: string;
  /** Dimension used by the cohort. Required and only supports `firstSessionDate`. */
  dimension?: string;
  /** The cohort selects users whose first touch date is between start date and end date defined in the `dateRange`. This `dateRange` does not specify the full date range of event data that is present in a cohort report. In a cohort report, this `dateRange` is extended by the granularity and offset present in the `cohortsRange`; event data for the extended reporting date range is present in a cohort report. In a cohort request, this `dateRange` is required and the `dateRanges` in the `RunReportRequest` or `RunPivotReportRequest` must be unspecified. This `dateRange` should generally be aligned with the cohort's granularity. If `CohortsRange` uses daily granularity, this `dateRange` can be a single day. If `CohortsRange` uses weekly granularity, this `dateRange` can be aligned to a week boundary, starting at Sunday and ending Saturday. If `CohortsRange` uses monthly granularity, this `dateRange` can be aligned to a month, starting at the first and ending on the last day of the month. */
  dateRange?: DateRange;
}

export const Cohort: Schema.Schema<Cohort> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  dimension: Schema.optional(Schema.String),
  dateRange: Schema.optional(DateRange),
})).annotate({ identifier: "Cohort" }) as any as Schema.Schema<Cohort>;

export interface CohortsRange {
  /** Required. The granularity used to interpret the `startOffset` and `endOffset` for the extended reporting date range for a cohort report. */
  granularity?: "GRANULARITY_UNSPECIFIED" | "DAILY" | "WEEKLY" | "MONTHLY" | (string & {});
  /** `startOffset` specifies the start date of the extended reporting date range for a cohort report. `startOffset` is commonly set to 0 so that reports contain data from the acquisition of the cohort forward. If `granularity` is `DAILY`, the `startDate` of the extended reporting date range is `startDate` of the cohort plus `startOffset` days. If `granularity` is `WEEKLY`, the `startDate` of the extended reporting date range is `startDate` of the cohort plus `startOffset * 7` days. If `granularity` is `MONTHLY`, the `startDate` of the extended reporting date range is `startDate` of the cohort plus `startOffset * 30` days. */
  startOffset?: number;
  /** Required. `endOffset` specifies the end date of the extended reporting date range for a cohort report. `endOffset` can be any positive integer but is commonly set to 5 to 10 so that reports contain data on the cohort for the next several granularity time periods. If `granularity` is `DAILY`, the `endDate` of the extended reporting date range is `endDate` of the cohort plus `endOffset` days. If `granularity` is `WEEKLY`, the `endDate` of the extended reporting date range is `endDate` of the cohort plus `endOffset * 7` days. If `granularity` is `MONTHLY`, the `endDate` of the extended reporting date range is `endDate` of the cohort plus `endOffset * 30` days. */
  endOffset?: number;
}

export const CohortsRange: Schema.Schema<CohortsRange> = Schema.suspend(() => Schema.Struct({
  granularity: Schema.optional(Schema.String),
  startOffset: Schema.optional(Schema.Number),
  endOffset: Schema.optional(Schema.Number),
})).annotate({ identifier: "CohortsRange" }) as any as Schema.Schema<CohortsRange>;

export interface CohortReportSettings {
  /** If true, accumulates the result from first touch day to the end day. Not supported in `RunReportRequest`. */
  accumulate?: boolean;
}

export const CohortReportSettings: Schema.Schema<CohortReportSettings> = Schema.suspend(() => Schema.Struct({
  accumulate: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "CohortReportSettings" }) as any as Schema.Schema<CohortReportSettings>;

export interface CohortSpec {
  /** Defines the selection criteria to group users into cohorts. Most cohort reports define only a single cohort. If multiple cohorts are specified, each cohort can be recognized in the report by their name. */
  cohorts?: Array<Cohort>;
  /** Cohort reports follow cohorts over an extended reporting date range. This range specifies an offset duration to follow the cohorts over. */
  cohortsRange?: CohortsRange;
  /** Optional settings for a cohort report. */
  cohortReportSettings?: CohortReportSettings;
}

export const CohortSpec: Schema.Schema<CohortSpec> = Schema.suspend(() => Schema.Struct({
  cohorts: Schema.optional(Schema.Array(Cohort)),
  cohortsRange: Schema.optional(CohortsRange),
  cohortReportSettings: Schema.optional(CohortReportSettings),
})).annotate({ identifier: "CohortSpec" }) as any as Schema.Schema<CohortSpec>;

export interface Comparison {
  /** Each comparison produces separate rows in the response. In the response, this comparison is identified by this name. If name is unspecified, we will use the saved comparisons display name. */
  name?: string;
  /** A basic comparison. */
  dimensionFilter?: FilterExpression;
  /** A saved comparison identified by the comparison's resource name. For example, 'comparisons/1234'. */
  comparison?: string;
}

export const Comparison: Schema.Schema<Comparison> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  dimensionFilter: Schema.optional(FilterExpression),
  comparison: Schema.optional(Schema.String),
})).annotate({ identifier: "Comparison" }) as any as Schema.Schema<Comparison>;

export interface RunReportRequest {
  /** A Google Analytics property identifier whose events are tracked. Specified in the URL path and not the body. To learn more, see [where to find your Property ID](https://developers.google.com/analytics/devguides/reporting/data/v1/property-id). Within a batch request, this property should either be unspecified or consistent with the batch-level property. Example: properties/1234 */
  property?: string;
  /** The dimensions requested and displayed. */
  dimensions?: Array<Dimension>;
  /** The metrics requested and displayed. */
  metrics?: Array<Metric>;
  /** Date ranges of data to read. If multiple date ranges are requested, each response row will contain a zero based date range index. If two date ranges overlap, the event data for the overlapping days is included in the response rows for both date ranges. In a cohort request, this `dateRanges` must be unspecified. */
  dateRanges?: Array<DateRange>;
  /** Dimension filters let you ask for only specific dimension values in the report. To learn more, see [Fundamentals of Dimension Filters](https://developers.google.com/analytics/devguides/reporting/data/v1/basics#dimension_filters) for examples. Metrics cannot be used in this filter. */
  dimensionFilter?: FilterExpression;
  /** The filter clause of metrics. Applied after aggregating the report's rows, similar to SQL having-clause. Dimensions cannot be used in this filter. */
  metricFilter?: FilterExpression;
  /** The row count of the start row. The first row is counted as row 0. When paging, the first request does not specify offset; or equivalently, sets offset to 0; the first request returns the first `limit` of rows. The second request sets offset to the `limit` of the first request; the second request returns the second `limit` of rows. To learn more about this pagination parameter, see [Pagination](https://developers.google.com/analytics/devguides/reporting/data/v1/basics#pagination). */
  offset?: string;
  /** The number of rows to return. If unspecified, 10,000 rows are returned. The API returns a maximum of 250,000 rows per request, no matter how many you ask for. `limit` must be positive. The API can also return fewer rows than the requested `limit`, if there aren't as many dimension values as the `limit`. For instance, there are fewer than 300 possible values for the dimension `country`, so when reporting on only `country`, you can't get more than 300 rows, even if you set `limit` to a higher value. To learn more about this pagination parameter, see [Pagination](https://developers.google.com/analytics/devguides/reporting/data/v1/basics#pagination). */
  limit?: string;
  /** Aggregation of metrics. Aggregated metric values will be shown in rows where the dimension_values are set to "RESERVED_(MetricAggregation)". Aggregates including both comparisons and multiple date ranges will be aggregated based on the date ranges. */
  metricAggregations?: Array<"METRIC_AGGREGATION_UNSPECIFIED" | "TOTAL" | "MINIMUM" | "MAXIMUM" | "COUNT" | (string & {})>;
  /** Specifies how rows are ordered in the response. Requests including both comparisons and multiple date ranges will have order bys applied on the comparisons. */
  orderBys?: Array<OrderBy>;
  /** A currency code in ISO4217 format, such as "AED", "USD", "JPY". If the field is empty, the report uses the property's default currency. */
  currencyCode?: string;
  /** Cohort group associated with this request. If there is a cohort group in the request the 'cohort' dimension must be present. */
  cohortSpec?: CohortSpec;
  /** If false or unspecified, each row with all metrics equal to 0 will not be returned. If true, these rows will be returned if they are not separately removed by a filter. Regardless of this `keep_empty_rows` setting, only data recorded by the Google Analytics property can be displayed in a report. For example if a property never logs a `purchase` event, then a query for the `eventName` dimension and `eventCount` metric will not have a row eventName: "purchase" and eventCount: 0. */
  keepEmptyRows?: boolean;
  /** Toggles whether to return the current state of this Google Analytics property's quota. Quota is returned in [PropertyQuota](#PropertyQuota). */
  returnPropertyQuota?: boolean;
  /** Optional. The configuration of comparisons requested and displayed. The request only requires a comparisons field in order to receive a comparison column in the response. */
  comparisons?: Array<Comparison>;
}

export const RunReportRequest: Schema.Schema<RunReportRequest> = Schema.suspend(() => Schema.Struct({
  property: Schema.optional(Schema.String),
  dimensions: Schema.optional(Schema.Array(Dimension)),
  metrics: Schema.optional(Schema.Array(Metric)),
  dateRanges: Schema.optional(Schema.Array(DateRange)),
  dimensionFilter: Schema.optional(FilterExpression),
  metricFilter: Schema.optional(FilterExpression),
  offset: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.String),
  metricAggregations: Schema.optional(Schema.Array(Schema.String)),
  orderBys: Schema.optional(Schema.Array(OrderBy)),
  currencyCode: Schema.optional(Schema.String),
  cohortSpec: Schema.optional(CohortSpec),
  keepEmptyRows: Schema.optional(Schema.Boolean),
  returnPropertyQuota: Schema.optional(Schema.Boolean),
  comparisons: Schema.optional(Schema.Array(Comparison)),
})).annotate({ identifier: "RunReportRequest" }) as any as Schema.Schema<RunReportRequest>;

export interface DimensionHeader {
  /** The dimension's name. */
  name?: string;
}

export const DimensionHeader: Schema.Schema<DimensionHeader> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "DimensionHeader" }) as any as Schema.Schema<DimensionHeader>;

export interface MetricHeader {
  /** The metric's name. */
  name?: string;
  /** The metric's data type. */
  type?: "METRIC_TYPE_UNSPECIFIED" | "TYPE_INTEGER" | "TYPE_FLOAT" | "TYPE_SECONDS" | "TYPE_MILLISECONDS" | "TYPE_MINUTES" | "TYPE_HOURS" | "TYPE_STANDARD" | "TYPE_CURRENCY" | "TYPE_FEET" | "TYPE_MILES" | "TYPE_METERS" | "TYPE_KILOMETERS" | (string & {});
}

export const MetricHeader: Schema.Schema<MetricHeader> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "MetricHeader" }) as any as Schema.Schema<MetricHeader>;

export interface DimensionValue {
  /** Value as a string if the dimension type is a string. */
  value?: string;
}

export const DimensionValue: Schema.Schema<DimensionValue> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "DimensionValue" }) as any as Schema.Schema<DimensionValue>;

export interface MetricValue {
  /** Measurement value. See MetricHeader for type. */
  value?: string;
}

export const MetricValue: Schema.Schema<MetricValue> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "MetricValue" }) as any as Schema.Schema<MetricValue>;

export interface Row {
  /** List of requested dimension values. In a PivotReport, dimension_values are only listed for dimensions included in a pivot. */
  dimensionValues?: Array<DimensionValue>;
  /** List of requested visible metric values. */
  metricValues?: Array<MetricValue>;
}

export const Row: Schema.Schema<Row> = Schema.suspend(() => Schema.Struct({
  dimensionValues: Schema.optional(Schema.Array(DimensionValue)),
  metricValues: Schema.optional(Schema.Array(MetricValue)),
})).annotate({ identifier: "Row" }) as any as Schema.Schema<Row>;

export interface ActiveMetricRestriction {
  /** The name of the restricted metric. */
  metricName?: string;
  /** The reason for this metric's restriction. */
  restrictedMetricTypes?: Array<"RESTRICTED_METRIC_TYPE_UNSPECIFIED" | "COST_DATA" | "REVENUE_DATA" | (string & {})>;
}

export const ActiveMetricRestriction: Schema.Schema<ActiveMetricRestriction> = Schema.suspend(() => Schema.Struct({
  metricName: Schema.optional(Schema.String),
  restrictedMetricTypes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ActiveMetricRestriction" }) as any as Schema.Schema<ActiveMetricRestriction>;

export interface SchemaRestrictionResponse {
  /** All restrictions actively enforced in creating the report. For example, `purchaseRevenue` always has the restriction type `REVENUE_DATA`. However, this active response restriction is only populated if the user's custom role disallows access to `REVENUE_DATA`. */
  activeMetricRestrictions?: Array<ActiveMetricRestriction>;
}

export const SchemaRestrictionResponse: Schema.Schema<SchemaRestrictionResponse> = Schema.suspend(() => Schema.Struct({
  activeMetricRestrictions: Schema.optional(Schema.Array(ActiveMetricRestriction)),
})).annotate({ identifier: "SchemaRestrictionResponse" }) as any as Schema.Schema<SchemaRestrictionResponse>;

export interface SamplingMetadata {
  /** The total number of events read in this sampled report for a date range. This is the size of the subset this property's data that was analyzed in this report. */
  samplesReadCount?: string;
  /** The total number of events present in this property's data that could have been analyzed in this report for a date range. Sampling uncovers the meaningful information about the larger data set, and this is the size of the larger data set. To calculate the percentage of available data that was used in this report, compute `samplesReadCount/samplingSpaceSize`. */
  samplingSpaceSize?: string;
}

export const SamplingMetadata: Schema.Schema<SamplingMetadata> = Schema.suspend(() => Schema.Struct({
  samplesReadCount: Schema.optional(Schema.String),
  samplingSpaceSize: Schema.optional(Schema.String),
})).annotate({ identifier: "SamplingMetadata" }) as any as Schema.Schema<SamplingMetadata>;

export interface ResponseMetaData {
  /** If true, indicates some buckets of dimension combinations are rolled into "(other)" row. This can happen for high cardinality reports. The metadata parameter dataLossFromOtherRow is populated based on the aggregated data table used in the report. The parameter will be accurately populated regardless of the filters and limits in the report. For example, the (other) row could be dropped from the report because the request contains a filter on sessionSource = google. This parameter will still be populated if data loss from other row was present in the input aggregate data used to generate this report. To learn more, see [About the (other) row and data sampling](https://support.google.com/analytics/answer/13208658#reports). */
  dataLossFromOtherRow?: boolean;
  /** Describes the schema restrictions actively enforced in creating this report. To learn more, see [Access and data-restriction management](https://support.google.com/analytics/answer/10851388). */
  schemaRestrictionResponse?: SchemaRestrictionResponse;
  /** The currency code used in this report. Intended to be used in formatting currency metrics like `purchaseRevenue` for visualization. If currency_code was specified in the request, this response parameter will echo the request parameter; otherwise, this response parameter is the property's current currency_code. Currency codes are string encodings of currency types from the ISO 4217 standard (https://en.wikipedia.org/wiki/ISO_4217); for example "USD", "EUR", "JPY". To learn more, see https://support.google.com/analytics/answer/9796179. */
  currencyCode?: string;
  /** The property's current timezone. Intended to be used to interpret time-based dimensions like `hour` and `minute`. Formatted as strings from the IANA Time Zone database (https://www.iana.org/time-zones); for example "America/New_York" or "Asia/Tokyo". */
  timeZone?: string;
  /** If empty reason is specified, the report is empty for this reason. */
  emptyReason?: string;
  /** If `subjectToThresholding` is true, this report is subject to thresholding and only returns data that meets the minimum aggregation thresholds. It is possible for a request to be subject to thresholding thresholding and no data is absent from the report, and this happens when all data is above the thresholds. To learn more, see [Data thresholds](https://support.google.com/analytics/answer/9383630). */
  subjectToThresholding?: boolean;
  /** If this report results is [sampled](https://support.google.com/analytics/answer/13331292), this describes the percentage of events used in this report. One `samplingMetadatas` is populated for each date range. Each `samplingMetadatas` corresponds to a date range in order that date ranges were specified in the request. However if the results are not sampled, this field will not be defined. */
  samplingMetadatas?: Array<SamplingMetadata>;
}

export const ResponseMetaData: Schema.Schema<ResponseMetaData> = Schema.suspend(() => Schema.Struct({
  dataLossFromOtherRow: Schema.optional(Schema.Boolean),
  schemaRestrictionResponse: Schema.optional(SchemaRestrictionResponse),
  currencyCode: Schema.optional(Schema.String),
  timeZone: Schema.optional(Schema.String),
  emptyReason: Schema.optional(Schema.String),
  subjectToThresholding: Schema.optional(Schema.Boolean),
  samplingMetadatas: Schema.optional(Schema.Array(SamplingMetadata)),
})).annotate({ identifier: "ResponseMetaData" }) as any as Schema.Schema<ResponseMetaData>;

export interface QuotaStatus {
  /** Quota consumed by this request. */
  consumed?: number;
  /** Quota remaining after this request. */
  remaining?: number;
}

export const QuotaStatus: Schema.Schema<QuotaStatus> = Schema.suspend(() => Schema.Struct({
  consumed: Schema.optional(Schema.Number),
  remaining: Schema.optional(Schema.Number),
})).annotate({ identifier: "QuotaStatus" }) as any as Schema.Schema<QuotaStatus>;

export interface PropertyQuota {
  /** Standard Analytics Properties can use up to 200,000 tokens per day; Analytics 360 Properties can use 2,000,000 tokens per day. Most requests consume fewer than 10 tokens. */
  tokensPerDay?: QuotaStatus;
  /** Standard Analytics Properties can use up to 40,000 tokens per hour; Analytics 360 Properties can use 400,000 tokens per hour. An API request consumes a single number of tokens, and that number is deducted from all of the hourly, daily, and per project hourly quotas. */
  tokensPerHour?: QuotaStatus;
  /** Standard Analytics Properties can send up to 10 concurrent requests; Analytics 360 Properties can use up to 50 concurrent requests. */
  concurrentRequests?: QuotaStatus;
  /** Standard Analytics Properties and cloud project pairs can have up to 10 server errors per hour; Analytics 360 Properties and cloud project pairs can have up to 50 server errors per hour. */
  serverErrorsPerProjectPerHour?: QuotaStatus;
  /** Analytics Properties can send up to 120 requests with potentially thresholded dimensions per hour. In a batch request, each report request is individually counted for this quota if the request contains potentially thresholded dimensions. */
  potentiallyThresholdedRequestsPerHour?: QuotaStatus;
  /** Analytics Properties can use up to 35% of their tokens per project per hour. This amounts to standard Analytics Properties can use up to 14,000 tokens per project per hour, and Analytics 360 Properties can use 140,000 tokens per project per hour. An API request consumes a single number of tokens, and that number is deducted from all of the hourly, daily, and per project hourly quotas. */
  tokensPerProjectPerHour?: QuotaStatus;
}

export const PropertyQuota: Schema.Schema<PropertyQuota> = Schema.suspend(() => Schema.Struct({
  tokensPerDay: Schema.optional(QuotaStatus),
  tokensPerHour: Schema.optional(QuotaStatus),
  concurrentRequests: Schema.optional(QuotaStatus),
  serverErrorsPerProjectPerHour: Schema.optional(QuotaStatus),
  potentiallyThresholdedRequestsPerHour: Schema.optional(QuotaStatus),
  tokensPerProjectPerHour: Schema.optional(QuotaStatus),
})).annotate({ identifier: "PropertyQuota" }) as any as Schema.Schema<PropertyQuota>;

export interface RunReportResponse {
  /** Describes dimension columns. The number of DimensionHeaders and ordering of DimensionHeaders matches the dimensions present in rows. */
  dimensionHeaders?: Array<DimensionHeader>;
  /** Describes metric columns. The number of MetricHeaders and ordering of MetricHeaders matches the metrics present in rows. */
  metricHeaders?: Array<MetricHeader>;
  /** Rows of dimension value combinations and metric values in the report. */
  rows?: Array<Row>;
  /** If requested, the totaled values of metrics. */
  totals?: Array<Row>;
  /** If requested, the maximum values of metrics. */
  maximums?: Array<Row>;
  /** If requested, the minimum values of metrics. */
  minimums?: Array<Row>;
  /** The total number of rows in the query result. `rowCount` is independent of the number of rows returned in the response, the `limit` request parameter, and the `offset` request parameter. For example if a query returns 175 rows and includes `limit` of 50 in the API request, the response will contain `rowCount` of 175 but only 50 rows. To learn more about this pagination parameter, see [Pagination](https://developers.google.com/analytics/devguides/reporting/data/v1/basics#pagination). */
  rowCount?: number;
  /** Metadata for the report. */
  metadata?: ResponseMetaData;
  /** This Google Analytics property's quota state including this request. */
  propertyQuota?: PropertyQuota;
  /** Identifies what kind of resource this message is. This `kind` is always the fixed string "analyticsData#runReport". Useful to distinguish between response types in JSON. */
  kind?: string;
}

export const RunReportResponse: Schema.Schema<RunReportResponse> = Schema.suspend(() => Schema.Struct({
  dimensionHeaders: Schema.optional(Schema.Array(DimensionHeader)),
  metricHeaders: Schema.optional(Schema.Array(MetricHeader)),
  rows: Schema.optional(Schema.Array(Row)),
  totals: Schema.optional(Schema.Array(Row)),
  maximums: Schema.optional(Schema.Array(Row)),
  minimums: Schema.optional(Schema.Array(Row)),
  rowCount: Schema.optional(Schema.Number),
  metadata: Schema.optional(ResponseMetaData),
  propertyQuota: Schema.optional(PropertyQuota),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "RunReportResponse" }) as any as Schema.Schema<RunReportResponse>;

export interface Pivot {
  /** Dimension names for visible columns in the report response. Including "dateRange" produces a date range column; for each row in the response, dimension values in the date range column will indicate the corresponding date range from the request. */
  fieldNames?: Array<string>;
  /** Specifies how dimensions are ordered in the pivot. In the first Pivot, the OrderBys determine Row and PivotDimensionHeader ordering; in subsequent Pivots, the OrderBys determine only PivotDimensionHeader ordering. Dimensions specified in these OrderBys must be a subset of Pivot.field_names. */
  orderBys?: Array<OrderBy>;
  /** The row count of the start row. The first row is counted as row 0. */
  offset?: string;
  /** The number of unique combinations of dimension values to return in this pivot. The `limit` parameter is required. A `limit` of 10,000 is common for single pivot requests. The product of the `limit` for each `pivot` in a `RunPivotReportRequest` must not exceed 250,000. For example, a two pivot request with `limit: 1000` in each pivot will fail because the product is `1,000,000`. */
  limit?: string;
  /** Aggregate the metrics by dimensions in this pivot using the specified metric_aggregations. */
  metricAggregations?: Array<"METRIC_AGGREGATION_UNSPECIFIED" | "TOTAL" | "MINIMUM" | "MAXIMUM" | "COUNT" | (string & {})>;
}

export const Pivot: Schema.Schema<Pivot> = Schema.suspend(() => Schema.Struct({
  fieldNames: Schema.optional(Schema.Array(Schema.String)),
  orderBys: Schema.optional(Schema.Array(OrderBy)),
  offset: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.String),
  metricAggregations: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Pivot" }) as any as Schema.Schema<Pivot>;

export interface RunPivotReportRequest {
  /** A Google Analytics property identifier whose events are tracked. Specified in the URL path and not the body. To learn more, see [where to find your Property ID](https://developers.google.com/analytics/devguides/reporting/data/v1/property-id). Within a batch request, this property should either be unspecified or consistent with the batch-level property. Example: properties/1234 */
  property?: string;
  /** The dimensions requested. All defined dimensions must be used by one of the following: dimension_expression, dimension_filter, pivots, order_bys. */
  dimensions?: Array<Dimension>;
  /** The metrics requested, at least one metric needs to be specified. All defined metrics must be used by one of the following: metric_expression, metric_filter, order_bys. */
  metrics?: Array<Metric>;
  /** The date range to retrieve event data for the report. If multiple date ranges are specified, event data from each date range is used in the report. A special dimension with field name "dateRange" can be included in a Pivot's field names; if included, the report compares between date ranges. In a cohort request, this `dateRanges` must be unspecified. */
  dateRanges?: Array<DateRange>;
  /** Describes the visual format of the report's dimensions in columns or rows. The union of the fieldNames (dimension names) in all pivots must be a subset of dimension names defined in Dimensions. No two pivots can share a dimension. A dimension is only visible if it appears in a pivot. */
  pivots?: Array<Pivot>;
  /** The filter clause of dimensions. Dimensions must be requested to be used in this filter. Metrics cannot be used in this filter. */
  dimensionFilter?: FilterExpression;
  /** The filter clause of metrics. Applied at post aggregation phase, similar to SQL having-clause. Metrics must be requested to be used in this filter. Dimensions cannot be used in this filter. */
  metricFilter?: FilterExpression;
  /** A currency code in ISO4217 format, such as "AED", "USD", "JPY". If the field is empty, the report uses the property's default currency. */
  currencyCode?: string;
  /** Cohort group associated with this request. If there is a cohort group in the request the 'cohort' dimension must be present. */
  cohortSpec?: CohortSpec;
  /** If false or unspecified, each row with all metrics equal to 0 will not be returned. If true, these rows will be returned if they are not separately removed by a filter. Regardless of this `keep_empty_rows` setting, only data recorded by the Google Analytics property can be displayed in a report. For example if a property never logs a `purchase` event, then a query for the `eventName` dimension and `eventCount` metric will not have a row eventName: "purchase" and eventCount: 0. */
  keepEmptyRows?: boolean;
  /** Toggles whether to return the current state of this Google Analytics property's quota. Quota is returned in [PropertyQuota](#PropertyQuota). */
  returnPropertyQuota?: boolean;
  /** Optional. The configuration of comparisons requested and displayed. The request requires both a comparisons field and a comparisons dimension to receive a comparison column in the response. */
  comparisons?: Array<Comparison>;
}

export const RunPivotReportRequest: Schema.Schema<RunPivotReportRequest> = Schema.suspend(() => Schema.Struct({
  property: Schema.optional(Schema.String),
  dimensions: Schema.optional(Schema.Array(Dimension)),
  metrics: Schema.optional(Schema.Array(Metric)),
  dateRanges: Schema.optional(Schema.Array(DateRange)),
  pivots: Schema.optional(Schema.Array(Pivot)),
  dimensionFilter: Schema.optional(FilterExpression),
  metricFilter: Schema.optional(FilterExpression),
  currencyCode: Schema.optional(Schema.String),
  cohortSpec: Schema.optional(CohortSpec),
  keepEmptyRows: Schema.optional(Schema.Boolean),
  returnPropertyQuota: Schema.optional(Schema.Boolean),
  comparisons: Schema.optional(Schema.Array(Comparison)),
})).annotate({ identifier: "RunPivotReportRequest" }) as any as Schema.Schema<RunPivotReportRequest>;

export interface PivotDimensionHeader {
  /** Values of multiple dimensions in a pivot. */
  dimensionValues?: Array<DimensionValue>;
}

export const PivotDimensionHeader: Schema.Schema<PivotDimensionHeader> = Schema.suspend(() => Schema.Struct({
  dimensionValues: Schema.optional(Schema.Array(DimensionValue)),
})).annotate({ identifier: "PivotDimensionHeader" }) as any as Schema.Schema<PivotDimensionHeader>;

export interface PivotHeader {
  /** The size is the same as the cardinality of the corresponding dimension combinations. */
  pivotDimensionHeaders?: Array<PivotDimensionHeader>;
  /** The cardinality of the pivot. The total number of rows for this pivot's fields regardless of how the parameters `offset` and `limit` are specified in the request. */
  rowCount?: number;
}

export const PivotHeader: Schema.Schema<PivotHeader> = Schema.suspend(() => Schema.Struct({
  pivotDimensionHeaders: Schema.optional(Schema.Array(PivotDimensionHeader)),
  rowCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "PivotHeader" }) as any as Schema.Schema<PivotHeader>;

export interface RunPivotReportResponse {
  /** Summarizes the columns and rows created by a pivot. Each pivot in the request produces one header in the response. If we have a request like this: "pivots": [{ "fieldNames": ["country", "city"] }, { "fieldNames": "eventName" }] We will have the following `pivotHeaders` in the response: "pivotHeaders" : [{ "dimensionHeaders": [{ "dimensionValues": [ { "value": "United Kingdom" }, { "value": "London" } ] }, { "dimensionValues": [ { "value": "Japan" }, { "value": "Osaka" } ] }] }, { "dimensionHeaders": [{ "dimensionValues": [{ "value": "session_start" }] }, { "dimensionValues": [{ "value": "scroll" }] }] }] */
  pivotHeaders?: Array<PivotHeader>;
  /** Describes dimension columns. The number of DimensionHeaders and ordering of DimensionHeaders matches the dimensions present in rows. */
  dimensionHeaders?: Array<DimensionHeader>;
  /** Describes metric columns. The number of MetricHeaders and ordering of MetricHeaders matches the metrics present in rows. */
  metricHeaders?: Array<MetricHeader>;
  /** Rows of dimension value combinations and metric values in the report. */
  rows?: Array<Row>;
  /** Aggregation of metric values. Can be totals, minimums, or maximums. The returned aggregations are controlled by the metric_aggregations in the pivot. The type of aggregation returned in each row is shown by the dimension_values which are set to "RESERVED_". */
  aggregates?: Array<Row>;
  /** Metadata for the report. */
  metadata?: ResponseMetaData;
  /** This Google Analytics property's quota state including this request. */
  propertyQuota?: PropertyQuota;
  /** Identifies what kind of resource this message is. This `kind` is always the fixed string "analyticsData#runPivotReport". Useful to distinguish between response types in JSON. */
  kind?: string;
}

export const RunPivotReportResponse: Schema.Schema<RunPivotReportResponse> = Schema.suspend(() => Schema.Struct({
  pivotHeaders: Schema.optional(Schema.Array(PivotHeader)),
  dimensionHeaders: Schema.optional(Schema.Array(DimensionHeader)),
  metricHeaders: Schema.optional(Schema.Array(MetricHeader)),
  rows: Schema.optional(Schema.Array(Row)),
  aggregates: Schema.optional(Schema.Array(Row)),
  metadata: Schema.optional(ResponseMetaData),
  propertyQuota: Schema.optional(PropertyQuota),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "RunPivotReportResponse" }) as any as Schema.Schema<RunPivotReportResponse>;

export interface BatchRunReportsRequest {
  /** Individual requests. Each request has a separate report response. Each batch request is allowed up to 5 requests. */
  requests?: Array<RunReportRequest>;
}

export const BatchRunReportsRequest: Schema.Schema<BatchRunReportsRequest> = Schema.suspend(() => Schema.Struct({
  requests: Schema.optional(Schema.Array(RunReportRequest)),
})).annotate({ identifier: "BatchRunReportsRequest" }) as any as Schema.Schema<BatchRunReportsRequest>;

export interface BatchRunReportsResponse {
  /** Individual responses. Each response has a separate report request. */
  reports?: Array<RunReportResponse>;
  /** Identifies what kind of resource this message is. This `kind` is always the fixed string "analyticsData#batchRunReports". Useful to distinguish between response types in JSON. */
  kind?: string;
}

export const BatchRunReportsResponse: Schema.Schema<BatchRunReportsResponse> = Schema.suspend(() => Schema.Struct({
  reports: Schema.optional(Schema.Array(RunReportResponse)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "BatchRunReportsResponse" }) as any as Schema.Schema<BatchRunReportsResponse>;

export interface BatchRunPivotReportsRequest {
  /** Individual requests. Each request has a separate pivot report response. Each batch request is allowed up to 5 requests. */
  requests?: Array<RunPivotReportRequest>;
}

export const BatchRunPivotReportsRequest: Schema.Schema<BatchRunPivotReportsRequest> = Schema.suspend(() => Schema.Struct({
  requests: Schema.optional(Schema.Array(RunPivotReportRequest)),
})).annotate({ identifier: "BatchRunPivotReportsRequest" }) as any as Schema.Schema<BatchRunPivotReportsRequest>;

export interface BatchRunPivotReportsResponse {
  /** Individual responses. Each response has a separate pivot report request. */
  pivotReports?: Array<RunPivotReportResponse>;
  /** Identifies what kind of resource this message is. This `kind` is always the fixed string "analyticsData#batchRunPivotReports". Useful to distinguish between response types in JSON. */
  kind?: string;
}

export const BatchRunPivotReportsResponse: Schema.Schema<BatchRunPivotReportsResponse> = Schema.suspend(() => Schema.Struct({
  pivotReports: Schema.optional(Schema.Array(RunPivotReportResponse)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "BatchRunPivotReportsResponse" }) as any as Schema.Schema<BatchRunPivotReportsResponse>;

export interface DimensionMetadata {
  /** This dimension's name. Useable in [Dimension](#Dimension)'s `name`. For example, `eventName`. */
  apiName?: string;
  /** This dimension's name within the Google Analytics user interface. For example, `Event name`. */
  uiName?: string;
  /** Description of how this dimension is used and calculated. */
  description?: string;
  /** Still usable but deprecated names for this dimension. If populated, this dimension is available by either `apiName` or one of `deprecatedApiNames` for a period of time. After the deprecation period, the dimension will be available only by `apiName`. */
  deprecatedApiNames?: Array<string>;
  /** True if the dimension is custom to this property. This includes user, event, & item scoped custom dimensions; to learn more about custom dimensions, see https://support.google.com/analytics/answer/14240153. This also include custom channel groups; to learn more about custom channel groups, see https://support.google.com/analytics/answer/13051316. */
  customDefinition?: boolean;
  /** The display name of the category that this dimension belongs to. Similar dimensions and metrics are categorized together. */
  category?: string;
}

export const DimensionMetadata: Schema.Schema<DimensionMetadata> = Schema.suspend(() => Schema.Struct({
  apiName: Schema.optional(Schema.String),
  uiName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  deprecatedApiNames: Schema.optional(Schema.Array(Schema.String)),
  customDefinition: Schema.optional(Schema.Boolean),
  category: Schema.optional(Schema.String),
})).annotate({ identifier: "DimensionMetadata" }) as any as Schema.Schema<DimensionMetadata>;

export interface MetricMetadata {
  /** A metric name. Useable in [Metric](#Metric)'s `name`. For example, `eventCount`. */
  apiName?: string;
  /** This metric's name within the Google Analytics user interface. For example, `Event count`. */
  uiName?: string;
  /** Description of how this metric is used and calculated. */
  description?: string;
  /** Still usable but deprecated names for this metric. If populated, this metric is available by either `apiName` or one of `deprecatedApiNames` for a period of time. After the deprecation period, the metric will be available only by `apiName`. */
  deprecatedApiNames?: Array<string>;
  /** The type of this metric. */
  type?: "METRIC_TYPE_UNSPECIFIED" | "TYPE_INTEGER" | "TYPE_FLOAT" | "TYPE_SECONDS" | "TYPE_MILLISECONDS" | "TYPE_MINUTES" | "TYPE_HOURS" | "TYPE_STANDARD" | "TYPE_CURRENCY" | "TYPE_FEET" | "TYPE_MILES" | "TYPE_METERS" | "TYPE_KILOMETERS" | (string & {});
  /** The mathematical expression for this derived metric. Can be used in [Metric](#Metric)'s `expression` field for equivalent reports. Most metrics are not expressions, and for non-expressions, this field is empty. */
  expression?: string;
  /** True if the metric is a custom metric for this property. */
  customDefinition?: boolean;
  /** If reasons are specified, your access is blocked to this metric for this property. API requests from you to this property for this metric will succeed; however, the report will contain only zeros for this metric. API requests with metric filters on blocked metrics will fail. If reasons are empty, you have access to this metric. To learn more, see [Access and data-restriction management](https://support.google.com/analytics/answer/10851388). */
  blockedReasons?: Array<"BLOCKED_REASON_UNSPECIFIED" | "NO_REVENUE_METRICS" | "NO_COST_METRICS" | (string & {})>;
  /** The display name of the category that this metrics belongs to. Similar dimensions and metrics are categorized together. */
  category?: string;
}

export const MetricMetadata: Schema.Schema<MetricMetadata> = Schema.suspend(() => Schema.Struct({
  apiName: Schema.optional(Schema.String),
  uiName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  deprecatedApiNames: Schema.optional(Schema.Array(Schema.String)),
  type: Schema.optional(Schema.String),
  expression: Schema.optional(Schema.String),
  customDefinition: Schema.optional(Schema.Boolean),
  blockedReasons: Schema.optional(Schema.Array(Schema.String)),
  category: Schema.optional(Schema.String),
})).annotate({ identifier: "MetricMetadata" }) as any as Schema.Schema<MetricMetadata>;

export interface ComparisonMetadata {
  /** This comparison's resource name. Useable in [Comparison](#Comparison)'s `comparison` field. For example, 'comparisons/1234'. */
  apiName?: string;
  /** This comparison's name within the Google Analytics user interface. */
  uiName?: string;
  /** This comparison's description. */
  description?: string;
}

export const ComparisonMetadata: Schema.Schema<ComparisonMetadata> = Schema.suspend(() => Schema.Struct({
  apiName: Schema.optional(Schema.String),
  uiName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "ComparisonMetadata" }) as any as Schema.Schema<ComparisonMetadata>;

export interface Metadata {
  /** Resource name of this metadata. */
  name?: string;
  /** The dimension descriptions. */
  dimensions?: Array<DimensionMetadata>;
  /** The metric descriptions. */
  metrics?: Array<MetricMetadata>;
  /** The comparison descriptions. */
  comparisons?: Array<ComparisonMetadata>;
}

export const Metadata: Schema.Schema<Metadata> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  dimensions: Schema.optional(Schema.Array(DimensionMetadata)),
  metrics: Schema.optional(Schema.Array(MetricMetadata)),
  comparisons: Schema.optional(Schema.Array(ComparisonMetadata)),
})).annotate({ identifier: "Metadata" }) as any as Schema.Schema<Metadata>;

export interface MinuteRange {
  /** The inclusive start minute for the query as a number of minutes before now. For example, `"startMinutesAgo": 29` specifies the report should include event data from 29 minutes ago and after. Cannot be after `endMinutesAgo`. If unspecified, `startMinutesAgo` is defaulted to 29. Standard Analytics properties can request up to the last 30 minutes of event data (`startMinutesAgo <= 29`), and 360 Analytics properties can request up to the last 60 minutes of event data (`startMinutesAgo <= 59`). */
  startMinutesAgo?: number;
  /** The inclusive end minute for the query as a number of minutes before now. Cannot be before `startMinutesAgo`. For example, `"endMinutesAgo": 15` specifies the report should include event data from prior to 15 minutes ago. If unspecified, `endMinutesAgo` is defaulted to 0. Standard Analytics properties can request any minute in the last 30 minutes of event data (`endMinutesAgo <= 29`), and 360 Analytics properties can request any minute in the last 60 minutes of event data (`endMinutesAgo <= 59`). */
  endMinutesAgo?: number;
  /** Assigns a name to this minute range. The dimension `dateRange` is valued to this name in a report response. If set, cannot begin with `date_range_` or `RESERVED_`. If not set, minute ranges are named by their zero based index in the request: `date_range_0`, `date_range_1`, etc. */
  name?: string;
}

export const MinuteRange: Schema.Schema<MinuteRange> = Schema.suspend(() => Schema.Struct({
  startMinutesAgo: Schema.optional(Schema.Number),
  endMinutesAgo: Schema.optional(Schema.Number),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "MinuteRange" }) as any as Schema.Schema<MinuteRange>;

export interface RunRealtimeReportRequest {
  /** The dimensions requested and displayed. */
  dimensions?: Array<Dimension>;
  /** The metrics requested and displayed. */
  metrics?: Array<Metric>;
  /** The filter clause of dimensions. Metrics cannot be used in this filter. */
  dimensionFilter?: FilterExpression;
  /** The filter clause of metrics. Applied at post aggregation phase, similar to SQL having-clause. Dimensions cannot be used in this filter. */
  metricFilter?: FilterExpression;
  /** The number of rows to return. If unspecified, 10,000 rows are returned. The API returns a maximum of 250,000 rows per request, no matter how many you ask for. `limit` must be positive. The API can also return fewer rows than the requested `limit`, if there aren't as many dimension values as the `limit`. For instance, there are fewer than 300 possible values for the dimension `country`, so when reporting on only `country`, you can't get more than 300 rows, even if you set `limit` to a higher value. */
  limit?: string;
  /** Aggregation of metrics. Aggregated metric values will be shown in rows where the dimension_values are set to "RESERVED_(MetricAggregation)". */
  metricAggregations?: Array<"METRIC_AGGREGATION_UNSPECIFIED" | "TOTAL" | "MINIMUM" | "MAXIMUM" | "COUNT" | (string & {})>;
  /** Specifies how rows are ordered in the response. */
  orderBys?: Array<OrderBy>;
  /** Toggles whether to return the current state of this Google Analytics property's Realtime quota. Quota is returned in [PropertyQuota](#PropertyQuota). */
  returnPropertyQuota?: boolean;
  /** The minute ranges of event data to read. If unspecified, one minute range for the last 30 minutes will be used. If multiple minute ranges are requested, each response row will contain a zero based minute range index. If two minute ranges overlap, the event data for the overlapping minutes is included in the response rows for both minute ranges. */
  minuteRanges?: Array<MinuteRange>;
}

export const RunRealtimeReportRequest: Schema.Schema<RunRealtimeReportRequest> = Schema.suspend(() => Schema.Struct({
  dimensions: Schema.optional(Schema.Array(Dimension)),
  metrics: Schema.optional(Schema.Array(Metric)),
  dimensionFilter: Schema.optional(FilterExpression),
  metricFilter: Schema.optional(FilterExpression),
  limit: Schema.optional(Schema.String),
  metricAggregations: Schema.optional(Schema.Array(Schema.String)),
  orderBys: Schema.optional(Schema.Array(OrderBy)),
  returnPropertyQuota: Schema.optional(Schema.Boolean),
  minuteRanges: Schema.optional(Schema.Array(MinuteRange)),
})).annotate({ identifier: "RunRealtimeReportRequest" }) as any as Schema.Schema<RunRealtimeReportRequest>;

export interface RunRealtimeReportResponse {
  /** Describes dimension columns. The number of DimensionHeaders and ordering of DimensionHeaders matches the dimensions present in rows. */
  dimensionHeaders?: Array<DimensionHeader>;
  /** Describes metric columns. The number of MetricHeaders and ordering of MetricHeaders matches the metrics present in rows. */
  metricHeaders?: Array<MetricHeader>;
  /** Rows of dimension value combinations and metric values in the report. */
  rows?: Array<Row>;
  /** If requested, the totaled values of metrics. */
  totals?: Array<Row>;
  /** If requested, the maximum values of metrics. */
  maximums?: Array<Row>;
  /** If requested, the minimum values of metrics. */
  minimums?: Array<Row>;
  /** The total number of rows in the query result. `rowCount` is independent of the number of rows returned in the response and the `limit` request parameter. For example if a query returns 175 rows and includes `limit` of 50 in the API request, the response will contain `rowCount` of 175 but only 50 rows. */
  rowCount?: number;
  /** This Google Analytics property's Realtime quota state including this request. */
  propertyQuota?: PropertyQuota;
  /** Identifies what kind of resource this message is. This `kind` is always the fixed string "analyticsData#runRealtimeReport". Useful to distinguish between response types in JSON. */
  kind?: string;
}

export const RunRealtimeReportResponse: Schema.Schema<RunRealtimeReportResponse> = Schema.suspend(() => Schema.Struct({
  dimensionHeaders: Schema.optional(Schema.Array(DimensionHeader)),
  metricHeaders: Schema.optional(Schema.Array(MetricHeader)),
  rows: Schema.optional(Schema.Array(Row)),
  totals: Schema.optional(Schema.Array(Row)),
  maximums: Schema.optional(Schema.Array(Row)),
  minimums: Schema.optional(Schema.Array(Row)),
  rowCount: Schema.optional(Schema.Number),
  propertyQuota: Schema.optional(PropertyQuota),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "RunRealtimeReportResponse" }) as any as Schema.Schema<RunRealtimeReportResponse>;

export interface CheckCompatibilityRequest {
  /** The dimensions in this report. `dimensions` should be the same value as in your `runReport` request. */
  dimensions?: Array<Dimension>;
  /** The metrics in this report. `metrics` should be the same value as in your `runReport` request. */
  metrics?: Array<Metric>;
  /** The filter clause of dimensions. `dimensionFilter` should be the same value as in your `runReport` request. */
  dimensionFilter?: FilterExpression;
  /** The filter clause of metrics. `metricFilter` should be the same value as in your `runReport` request */
  metricFilter?: FilterExpression;
  /** Filters the dimensions and metrics in the response to just this compatibility. Commonly used as `”compatibilityFilter”: “COMPATIBLE”` to only return compatible dimensions & metrics. */
  compatibilityFilter?: "COMPATIBILITY_UNSPECIFIED" | "COMPATIBLE" | "INCOMPATIBLE" | (string & {});
}

export const CheckCompatibilityRequest: Schema.Schema<CheckCompatibilityRequest> = Schema.suspend(() => Schema.Struct({
  dimensions: Schema.optional(Schema.Array(Dimension)),
  metrics: Schema.optional(Schema.Array(Metric)),
  dimensionFilter: Schema.optional(FilterExpression),
  metricFilter: Schema.optional(FilterExpression),
  compatibilityFilter: Schema.optional(Schema.String),
})).annotate({ identifier: "CheckCompatibilityRequest" }) as any as Schema.Schema<CheckCompatibilityRequest>;

export interface DimensionCompatibility {
  /** The dimension metadata contains the API name for this compatibility information. The dimension metadata also contains other helpful information like the UI name and description. */
  dimensionMetadata?: DimensionMetadata;
  /** The compatibility of this dimension. If the compatibility is COMPATIBLE, this dimension can be successfully added to the report. */
  compatibility?: "COMPATIBILITY_UNSPECIFIED" | "COMPATIBLE" | "INCOMPATIBLE" | (string & {});
}

export const DimensionCompatibility: Schema.Schema<DimensionCompatibility> = Schema.suspend(() => Schema.Struct({
  dimensionMetadata: Schema.optional(DimensionMetadata),
  compatibility: Schema.optional(Schema.String),
})).annotate({ identifier: "DimensionCompatibility" }) as any as Schema.Schema<DimensionCompatibility>;

export interface MetricCompatibility {
  /** The metric metadata contains the API name for this compatibility information. The metric metadata also contains other helpful information like the UI name and description. */
  metricMetadata?: MetricMetadata;
  /** The compatibility of this metric. If the compatibility is COMPATIBLE, this metric can be successfully added to the report. */
  compatibility?: "COMPATIBILITY_UNSPECIFIED" | "COMPATIBLE" | "INCOMPATIBLE" | (string & {});
}

export const MetricCompatibility: Schema.Schema<MetricCompatibility> = Schema.suspend(() => Schema.Struct({
  metricMetadata: Schema.optional(MetricMetadata),
  compatibility: Schema.optional(Schema.String),
})).annotate({ identifier: "MetricCompatibility" }) as any as Schema.Schema<MetricCompatibility>;

export interface CheckCompatibilityResponse {
  /** The compatibility of each dimension. */
  dimensionCompatibilities?: Array<DimensionCompatibility>;
  /** The compatibility of each metric. */
  metricCompatibilities?: Array<MetricCompatibility>;
}

export const CheckCompatibilityResponse: Schema.Schema<CheckCompatibilityResponse> = Schema.suspend(() => Schema.Struct({
  dimensionCompatibilities: Schema.optional(Schema.Array(DimensionCompatibility)),
  metricCompatibilities: Schema.optional(Schema.Array(MetricCompatibility)),
})).annotate({ identifier: "CheckCompatibilityResponse" }) as any as Schema.Schema<CheckCompatibilityResponse>;

export interface V1betaAudienceDimension {
  /** Optional. The API name of the dimension. See the [API Dimensions](https://developers.google.com/analytics/devguides/reporting/data/v1/audience-list-api-schema#dimensions) for the list of dimension names. */
  dimensionName?: string;
}

export const V1betaAudienceDimension: Schema.Schema<V1betaAudienceDimension> = Schema.suspend(() => Schema.Struct({
  dimensionName: Schema.optional(Schema.String),
})).annotate({ identifier: "V1betaAudienceDimension" }) as any as Schema.Schema<V1betaAudienceDimension>;

export interface AudienceExport {
  /** Output only. Identifier. The audience export resource name assigned during creation. This resource name identifies this `AudienceExport`. Format: `properties/{property}/audienceExports/{audience_export}` */
  name?: string;
  /** Required. The audience resource name. This resource name identifies the audience being listed and is shared between the Analytics Data & Admin APIs. Format: `properties/{property}/audiences/{audience}` */
  audience?: string;
  /** Output only. The descriptive display name for this audience. For example, "Purchasers". */
  audienceDisplayName?: string;
  /** Required. The dimensions requested and displayed in the query response. */
  dimensions?: Array<V1betaAudienceDimension>;
  /** Output only. The current state for this AudienceExport. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "FAILED" | (string & {});
  /** Output only. The time when CreateAudienceExport was called and the AudienceExport began the `CREATING` state. */
  beginCreatingTime?: string;
  /** Output only. The total quota tokens charged during creation of the AudienceExport. Because this token count is based on activity from the `CREATING` state, this tokens charged will be fixed once an AudienceExport enters the `ACTIVE` or `FAILED` states. */
  creationQuotaTokensCharged?: number;
  /** Output only. The total number of rows in the AudienceExport result. */
  rowCount?: number;
  /** Output only. Error message is populated when an audience export fails during creation. A common reason for such a failure is quota exhaustion. */
  errorMessage?: string;
  /** Output only. The percentage completed for this audience export ranging between 0 to 100. */
  percentageCompleted?: number;
}

export const AudienceExport: Schema.Schema<AudienceExport> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  audience: Schema.optional(Schema.String),
  audienceDisplayName: Schema.optional(Schema.String),
  dimensions: Schema.optional(Schema.Array(V1betaAudienceDimension)),
  state: Schema.optional(Schema.String),
  beginCreatingTime: Schema.optional(Schema.String),
  creationQuotaTokensCharged: Schema.optional(Schema.Number),
  rowCount: Schema.optional(Schema.Number),
  errorMessage: Schema.optional(Schema.String),
  percentageCompleted: Schema.optional(Schema.Number),
})).annotate({ identifier: "AudienceExport" }) as any as Schema.Schema<AudienceExport>;

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

export interface Operation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(Status),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface QueryAudienceExportRequest {
  /** Optional. The row count of the start row. The first row is counted as row 0. When paging, the first request does not specify offset; or equivalently, sets offset to 0; the first request returns the first `limit` of rows. The second request sets offset to the `limit` of the first request; the second request returns the second `limit` of rows. To learn more about this pagination parameter, see [Pagination](https://developers.google.com/analytics/devguides/reporting/data/v1/basics#pagination). */
  offset?: string;
  /** Optional. The number of rows to return. If unspecified, 10,000 rows are returned. The API returns a maximum of 250,000 rows per request, no matter how many you ask for. `limit` must be positive. The API can also return fewer rows than the requested `limit`, if there aren't as many dimension values as the `limit`. To learn more about this pagination parameter, see [Pagination](https://developers.google.com/analytics/devguides/reporting/data/v1/basics#pagination). */
  limit?: string;
}

export const QueryAudienceExportRequest: Schema.Schema<QueryAudienceExportRequest> = Schema.suspend(() => Schema.Struct({
  offset: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.String),
})).annotate({ identifier: "QueryAudienceExportRequest" }) as any as Schema.Schema<QueryAudienceExportRequest>;

export interface V1betaAudienceDimensionValue {
  /** Value as a string if the dimension type is a string. */
  value?: string;
}

export const V1betaAudienceDimensionValue: Schema.Schema<V1betaAudienceDimensionValue> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "V1betaAudienceDimensionValue" }) as any as Schema.Schema<V1betaAudienceDimensionValue>;

export interface V1betaAudienceRow {
  /** Each dimension value attribute for an audience user. One dimension value will be added for each dimension column requested. */
  dimensionValues?: Array<V1betaAudienceDimensionValue>;
}

export const V1betaAudienceRow: Schema.Schema<V1betaAudienceRow> = Schema.suspend(() => Schema.Struct({
  dimensionValues: Schema.optional(Schema.Array(V1betaAudienceDimensionValue)),
})).annotate({ identifier: "V1betaAudienceRow" }) as any as Schema.Schema<V1betaAudienceRow>;

export interface QueryAudienceExportResponse {
  /** Configuration data about AudienceExport being queried. Returned to help interpret the audience rows in this response. For example, the dimensions in this AudienceExport correspond to the columns in the AudienceRows. */
  audienceExport?: AudienceExport;
  /** Rows for each user in an audience export. The number of rows in this response will be less than or equal to request's page size. */
  audienceRows?: Array<V1betaAudienceRow>;
  /** The total number of rows in the AudienceExport result. `rowCount` is independent of the number of rows returned in the response, the `limit` request parameter, and the `offset` request parameter. For example if a query returns 175 rows and includes `limit` of 50 in the API request, the response will contain `rowCount` of 175 but only 50 rows. To learn more about this pagination parameter, see [Pagination](https://developers.google.com/analytics/devguides/reporting/data/v1/basics#pagination). */
  rowCount?: number;
}

export const QueryAudienceExportResponse: Schema.Schema<QueryAudienceExportResponse> = Schema.suspend(() => Schema.Struct({
  audienceExport: Schema.optional(AudienceExport),
  audienceRows: Schema.optional(Schema.Array(V1betaAudienceRow)),
  rowCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "QueryAudienceExportResponse" }) as any as Schema.Schema<QueryAudienceExportResponse>;

export interface ListAudienceExportsResponse {
  /** Each audience export for a property. */
  audienceExports?: Array<AudienceExport>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListAudienceExportsResponse: Schema.Schema<ListAudienceExportsResponse> = Schema.suspend(() => Schema.Struct({
  audienceExports: Schema.optional(Schema.Array(AudienceExport)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAudienceExportsResponse" }) as any as Schema.Schema<ListAudienceExportsResponse>;

export interface AudienceListMetadata {
}

export const AudienceListMetadata: Schema.Schema<AudienceListMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AudienceListMetadata" }) as any as Schema.Schema<AudienceListMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

/** Returns a customized report of your Google Analytics event data. Reports contain statistics derived from data collected by the Google Analytics tracking code. The data returned from the API is as a table with columns for the requested dimensions and metrics. Metrics are individual measurements of user activity on your property, such as active users or event count. Dimensions break down metrics across some common criteria, such as country or event name. For a guide to constructing requests & understanding responses, see [Creating a Report](https://developers.google.com/analytics/devguides/reporting/data/v1/basics). */
export interface RunReportPropertiesRequest {
  /** A Google Analytics property identifier whose events are tracked. Specified in the URL path and not the body. To learn more, see [where to find your Property ID](https://developers.google.com/analytics/devguides/reporting/data/v1/property-id). Within a batch request, this property should either be unspecified or consistent with the batch-level property. Example: properties/1234 */
  property: string;
  /** Request body */
  body?: RunReportRequest;
}

export const RunReportPropertiesRequest = Schema.Struct({
  property: Schema.String.pipe(T.HttpPath("property")),
  body: Schema.optional(RunReportRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/properties/{propertiesId}:runReport", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RunReportPropertiesRequest>;

export type RunReportPropertiesResponse = RunReportResponse;
export const RunReportPropertiesResponse = RunReportResponse;

export type RunReportPropertiesError = CommonErrors;

export const runReportProperties: API.OperationMethod<RunReportPropertiesRequest, RunReportPropertiesResponse, RunReportPropertiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RunReportPropertiesRequest,
  output: RunReportPropertiesResponse,
  errors: [],
}));

/** Returns a customized pivot report of your Google Analytics event data. Pivot reports are more advanced and expressive formats than regular reports. In a pivot report, dimensions are only visible if they are included in a pivot. Multiple pivots can be specified to further dissect your data. */
export interface RunPivotReportPropertiesRequest {
  /** A Google Analytics property identifier whose events are tracked. Specified in the URL path and not the body. To learn more, see [where to find your Property ID](https://developers.google.com/analytics/devguides/reporting/data/v1/property-id). Within a batch request, this property should either be unspecified or consistent with the batch-level property. Example: properties/1234 */
  property: string;
  /** Request body */
  body?: RunPivotReportRequest;
}

export const RunPivotReportPropertiesRequest = Schema.Struct({
  property: Schema.String.pipe(T.HttpPath("property")),
  body: Schema.optional(RunPivotReportRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/properties/{propertiesId}:runPivotReport", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RunPivotReportPropertiesRequest>;

export type RunPivotReportPropertiesResponse = RunPivotReportResponse;
export const RunPivotReportPropertiesResponse = RunPivotReportResponse;

export type RunPivotReportPropertiesError = CommonErrors;

export const runPivotReportProperties: API.OperationMethod<RunPivotReportPropertiesRequest, RunPivotReportPropertiesResponse, RunPivotReportPropertiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RunPivotReportPropertiesRequest,
  output: RunPivotReportPropertiesResponse,
  errors: [],
}));

/** Returns multiple reports in a batch. All reports must be for the same Google Analytics property. */
export interface BatchRunReportsPropertiesRequest {
  /** A Google Analytics property identifier whose events are tracked. Specified in the URL path and not the body. To learn more, see [where to find your Property ID](https://developers.google.com/analytics/devguides/reporting/data/v1/property-id). This property must be specified for the batch. The property within RunReportRequest may either be unspecified or consistent with this property. Example: properties/1234 */
  property: string;
  /** Request body */
  body?: BatchRunReportsRequest;
}

export const BatchRunReportsPropertiesRequest = Schema.Struct({
  property: Schema.String.pipe(T.HttpPath("property")),
  body: Schema.optional(BatchRunReportsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/properties/{propertiesId}:batchRunReports", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchRunReportsPropertiesRequest>;

export type BatchRunReportsPropertiesResponse = BatchRunReportsResponse;
export const BatchRunReportsPropertiesResponse = BatchRunReportsResponse;

export type BatchRunReportsPropertiesError = CommonErrors;

export const batchRunReportsProperties: API.OperationMethod<BatchRunReportsPropertiesRequest, BatchRunReportsPropertiesResponse, BatchRunReportsPropertiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchRunReportsPropertiesRequest,
  output: BatchRunReportsPropertiesResponse,
  errors: [],
}));

/** Returns multiple pivot reports in a batch. All reports must be for the same Google Analytics property. */
export interface BatchRunPivotReportsPropertiesRequest {
  /** A Google Analytics property identifier whose events are tracked. Specified in the URL path and not the body. To learn more, see [where to find your Property ID](https://developers.google.com/analytics/devguides/reporting/data/v1/property-id). This property must be specified for the batch. The property within RunPivotReportRequest may either be unspecified or consistent with this property. Example: properties/1234 */
  property: string;
  /** Request body */
  body?: BatchRunPivotReportsRequest;
}

export const BatchRunPivotReportsPropertiesRequest = Schema.Struct({
  property: Schema.String.pipe(T.HttpPath("property")),
  body: Schema.optional(BatchRunPivotReportsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/properties/{propertiesId}:batchRunPivotReports", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchRunPivotReportsPropertiesRequest>;

export type BatchRunPivotReportsPropertiesResponse = BatchRunPivotReportsResponse;
export const BatchRunPivotReportsPropertiesResponse = BatchRunPivotReportsResponse;

export type BatchRunPivotReportsPropertiesError = CommonErrors;

export const batchRunPivotReportsProperties: API.OperationMethod<BatchRunPivotReportsPropertiesRequest, BatchRunPivotReportsPropertiesResponse, BatchRunPivotReportsPropertiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchRunPivotReportsPropertiesRequest,
  output: BatchRunPivotReportsPropertiesResponse,
  errors: [],
}));

/** Returns metadata for dimensions and metrics available in reporting methods. Used to explore the dimensions and metrics. In this method, a Google Analytics property identifier is specified in the request, and the metadata response includes Custom dimensions and metrics as well as Universal metadata. For example if a custom metric with parameter name `levels_unlocked` is registered to a property, the Metadata response will contain `customEvent:levels_unlocked`. Universal metadata are dimensions and metrics applicable to any property such as `country` and `totalUsers`. */
export interface GetMetadataPropertiesRequest {
  /** Required. The resource name of the metadata to retrieve. This name field is specified in the URL path and not URL parameters. Property is a numeric Google Analytics property identifier. To learn more, see [where to find your Property ID](https://developers.google.com/analytics/devguides/reporting/data/v1/property-id). Example: properties/1234/metadata Set the Property ID to 0 for dimensions and metrics common to all properties. In this special mode, this method will not return custom dimensions and metrics. */
  name: string;
}

export const GetMetadataPropertiesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/properties/{propertiesId}/metadata" }),
  svc,
) as unknown as Schema.Schema<GetMetadataPropertiesRequest>;

export type GetMetadataPropertiesResponse = Metadata;
export const GetMetadataPropertiesResponse = Metadata;

export type GetMetadataPropertiesError = CommonErrors;

export const getMetadataProperties: API.OperationMethod<GetMetadataPropertiesRequest, GetMetadataPropertiesResponse, GetMetadataPropertiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetMetadataPropertiesRequest,
  output: GetMetadataPropertiesResponse,
  errors: [],
}));

/** Returns a customized report of realtime event data for your property. Events appear in realtime reports seconds after they have been sent to the Google Analytics. Realtime reports show events and usage data for the periods of time ranging from the present moment to 30 minutes ago (up to 60 minutes for Google Analytics 360 properties). For a guide to constructing realtime requests & understanding responses, see [Creating a Realtime Report](https://developers.google.com/analytics/devguides/reporting/data/v1/realtime-basics). */
export interface RunRealtimeReportPropertiesRequest {
  /** A Google Analytics property identifier whose events are tracked. Specified in the URL path and not the body. To learn more, see [where to find your Property ID](https://developers.google.com/analytics/devguides/reporting/data/v1/property-id). Example: properties/1234 */
  property: string;
  /** Request body */
  body?: RunRealtimeReportRequest;
}

export const RunRealtimeReportPropertiesRequest = Schema.Struct({
  property: Schema.String.pipe(T.HttpPath("property")),
  body: Schema.optional(RunRealtimeReportRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/properties/{propertiesId}:runRealtimeReport", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RunRealtimeReportPropertiesRequest>;

export type RunRealtimeReportPropertiesResponse = RunRealtimeReportResponse;
export const RunRealtimeReportPropertiesResponse = RunRealtimeReportResponse;

export type RunRealtimeReportPropertiesError = CommonErrors;

export const runRealtimeReportProperties: API.OperationMethod<RunRealtimeReportPropertiesRequest, RunRealtimeReportPropertiesResponse, RunRealtimeReportPropertiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RunRealtimeReportPropertiesRequest,
  output: RunRealtimeReportPropertiesResponse,
  errors: [],
}));

/** This compatibility method lists dimensions and metrics that can be added to a report request and maintain compatibility. This method fails if the request's dimensions and metrics are incompatible. In Google Analytics, reports fail if they request incompatible dimensions and/or metrics; in that case, you will need to remove dimensions and/or metrics from the incompatible report until the report is compatible. The Realtime and Core reports have different compatibility rules. This method checks compatibility for Core reports. */
export interface CheckCompatibilityPropertiesRequest {
  /** A Google Analytics property identifier whose events are tracked. To learn more, see [where to find your Property ID](https://developers.google.com/analytics/devguides/reporting/data/v1/property-id). `property` should be the same value as in your `runReport` request. Example: properties/1234 */
  property: string;
  /** Request body */
  body?: CheckCompatibilityRequest;
}

export const CheckCompatibilityPropertiesRequest = Schema.Struct({
  property: Schema.String.pipe(T.HttpPath("property")),
  body: Schema.optional(CheckCompatibilityRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/properties/{propertiesId}:checkCompatibility", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CheckCompatibilityPropertiesRequest>;

export type CheckCompatibilityPropertiesResponse = CheckCompatibilityResponse;
export const CheckCompatibilityPropertiesResponse = CheckCompatibilityResponse;

export type CheckCompatibilityPropertiesError = CommonErrors;

export const checkCompatibilityProperties: API.OperationMethod<CheckCompatibilityPropertiesRequest, CheckCompatibilityPropertiesResponse, CheckCompatibilityPropertiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CheckCompatibilityPropertiesRequest,
  output: CheckCompatibilityPropertiesResponse,
  errors: [],
}));

/** Creates an audience export for later retrieval. This method quickly returns the audience export's resource name and initiates a long running asynchronous request to form an audience export. To export the users in an audience export, first create the audience export through this method and then send the audience resource name to the `QueryAudienceExport` method. See [Creating an Audience Export](https://developers.google.com/analytics/devguides/reporting/data/v1/audience-list-basics) for an introduction to Audience Exports with examples. An audience export is a snapshot of the users currently in the audience at the time of audience export creation. Creating audience exports for one audience on different days will return different results as users enter and exit the audience. Audiences in Google Analytics 4 allow you to segment your users in the ways that are important to your business. To learn more, see https://support.google.com/analytics/answer/9267572. Audience exports contain the users in each audience. Audience Export APIs have some methods at alpha and other methods at beta stability. The intention is to advance methods to beta stability after some feedback and adoption. To give your feedback on this API, complete the [Google Analytics Audience Export API Feedback](https://forms.gle/EeA5u5LW6PEggtCEA) form. */
export interface CreatePropertiesAudienceExportsRequest {
  /** Required. The parent resource where this audience export will be created. Format: `properties/{property}` */
  parent: string;
  /** Request body */
  body?: AudienceExport;
}

export const CreatePropertiesAudienceExportsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(AudienceExport).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/properties/{propertiesId}/audienceExports", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreatePropertiesAudienceExportsRequest>;

export type CreatePropertiesAudienceExportsResponse = Operation;
export const CreatePropertiesAudienceExportsResponse = Operation;

export type CreatePropertiesAudienceExportsError = CommonErrors;

export const createPropertiesAudienceExports: API.OperationMethod<CreatePropertiesAudienceExportsRequest, CreatePropertiesAudienceExportsResponse, CreatePropertiesAudienceExportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreatePropertiesAudienceExportsRequest,
  output: CreatePropertiesAudienceExportsResponse,
  errors: [],
}));

/** Retrieves an audience export of users. After creating an audience, the users are not immediately available for exporting. First, a request to `CreateAudienceExport` is necessary to create an audience export of users, and then second, this method is used to retrieve the users in the audience export. See [Creating an Audience Export](https://developers.google.com/analytics/devguides/reporting/data/v1/audience-list-basics) for an introduction to Audience Exports with examples. Audiences in Google Analytics 4 allow you to segment your users in the ways that are important to your business. To learn more, see https://support.google.com/analytics/answer/9267572. Audience Export APIs have some methods at alpha and other methods at beta stability. The intention is to advance methods to beta stability after some feedback and adoption. To give your feedback on this API, complete the [Google Analytics Audience Export API Feedback](https://forms.gle/EeA5u5LW6PEggtCEA) form. */
export interface QueryPropertiesAudienceExportsRequest {
  /** Required. The name of the audience export to retrieve users from. Format: `properties/{property}/audienceExports/{audience_export}` */
  name: string;
  /** Request body */
  body?: QueryAudienceExportRequest;
}

export const QueryPropertiesAudienceExportsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(QueryAudienceExportRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/properties/{propertiesId}/audienceExports/{audienceExportsId}:query", hasBody: true }),
  svc,
) as unknown as Schema.Schema<QueryPropertiesAudienceExportsRequest>;

export type QueryPropertiesAudienceExportsResponse = QueryAudienceExportResponse;
export const QueryPropertiesAudienceExportsResponse = QueryAudienceExportResponse;

export type QueryPropertiesAudienceExportsError = CommonErrors;

export const queryPropertiesAudienceExports: API.OperationMethod<QueryPropertiesAudienceExportsRequest, QueryPropertiesAudienceExportsResponse, QueryPropertiesAudienceExportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: QueryPropertiesAudienceExportsRequest,
  output: QueryPropertiesAudienceExportsResponse,
  errors: [],
}));

/** Gets configuration metadata about a specific audience export. This method can be used to understand an audience export after it has been created. See [Creating an Audience Export](https://developers.google.com/analytics/devguides/reporting/data/v1/audience-list-basics) for an introduction to Audience Exports with examples. Audience Export APIs have some methods at alpha and other methods at beta stability. The intention is to advance methods to beta stability after some feedback and adoption. To give your feedback on this API, complete the [Google Analytics Audience Export API Feedback](https://forms.gle/EeA5u5LW6PEggtCEA) form. */
export interface GetPropertiesAudienceExportsRequest {
  /** Required. The audience export resource name. Format: `properties/{property}/audienceExports/{audience_export}` */
  name: string;
}

export const GetPropertiesAudienceExportsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/properties/{propertiesId}/audienceExports/{audienceExportsId}" }),
  svc,
) as unknown as Schema.Schema<GetPropertiesAudienceExportsRequest>;

export type GetPropertiesAudienceExportsResponse = AudienceExport;
export const GetPropertiesAudienceExportsResponse = AudienceExport;

export type GetPropertiesAudienceExportsError = CommonErrors;

export const getPropertiesAudienceExports: API.OperationMethod<GetPropertiesAudienceExportsRequest, GetPropertiesAudienceExportsResponse, GetPropertiesAudienceExportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPropertiesAudienceExportsRequest,
  output: GetPropertiesAudienceExportsResponse,
  errors: [],
}));

/** Lists all audience exports for a property. This method can be used for you to find and reuse existing audience exports rather than creating unnecessary new audience exports. The same audience can have multiple audience exports that represent the export of users that were in an audience on different days. See [Creating an Audience Export](https://developers.google.com/analytics/devguides/reporting/data/v1/audience-list-basics) for an introduction to Audience Exports with examples. Audience Export APIs have some methods at alpha and other methods at beta stability. The intention is to advance methods to beta stability after some feedback and adoption. To give your feedback on this API, complete the [Google Analytics Audience Export API Feedback](https://forms.gle/EeA5u5LW6PEggtCEA) form. */
export interface ListPropertiesAudienceExportsRequest {
  /** Required. All audience exports for this property will be listed in the response. Format: `properties/{property}` */
  parent: string;
  /** Optional. The maximum number of audience exports to return. The service may return fewer than this value. If unspecified, at most 200 audience exports will be returned. The maximum value is 1000 (higher values will be coerced to the maximum). */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListAudienceExports` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListAudienceExports` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListPropertiesAudienceExportsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/properties/{propertiesId}/audienceExports" }),
  svc,
) as unknown as Schema.Schema<ListPropertiesAudienceExportsRequest>;

export type ListPropertiesAudienceExportsResponse = ListAudienceExportsResponse;
export const ListPropertiesAudienceExportsResponse = ListAudienceExportsResponse;

export type ListPropertiesAudienceExportsError = CommonErrors;

export const listPropertiesAudienceExports = API.makePaginated(() => ({
  input: ListPropertiesAudienceExportsRequest,
  output: ListPropertiesAudienceExportsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

