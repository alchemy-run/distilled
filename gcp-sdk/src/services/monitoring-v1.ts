// ==========================================================================
// Cloud Monitoring API (monitoring v1)
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
  name: "monitoring",
  version: "v1",
  rootUrl: "https://monitoring.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() =>
  Schema.Struct({
    code: Schema.optional(Schema.Number),
    message: Schema.optional(Schema.String),
    details: Schema.optional(
      Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
    ),
  }),
).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface Operation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the name should be a resource name ending with operations/{unique_id}. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is false, it means the operation is still in progress. If true, the operation is completed, and either error or response is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as Delete, the response is google.protobuf.Empty. If the original method is standard Get/Create/Update, the response should be the resource. For other methods, the response should have the type XxxResponse, where Xxx is the original method name. For example, if the original method name is TakeSnapshot(), the inferred response type is TakeSnapshotResponse. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    done: Schema.optional(Schema.Boolean),
    error: Schema.optional(Status),
    response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  }),
).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface Aggregation {
  /** The alignment_period specifies a time interval, in seconds, that is used to divide the data in all the time series into consistent blocks of time. This will be done before the per-series aligner can be applied to the data.The value must be at least 60 seconds. If a per-series aligner other than ALIGN_NONE is specified, this field is required or an error is returned. If no per-series aligner is specified, or the aligner ALIGN_NONE is specified, then this field is ignored.The maximum value of the alignment_period is 2 years, or 104 weeks. */
  alignmentPeriod?: string;
  /** An Aligner describes how to bring the data points in a single time series into temporal alignment. Except for ALIGN_NONE, all alignments cause all the data points in an alignment_period to be mathematically grouped together, resulting in a single data point for each alignment_period with end timestamp at the end of the period.Not all alignment operations may be applied to all time series. The valid choices depend on the metric_kind and value_type of the original time series. Alignment can change the metric_kind or the value_type of the time series.Time series data must be aligned in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified and not equal to ALIGN_NONE and alignment_period must be specified; otherwise, an error is returned. */
  perSeriesAligner?:
    | "ALIGN_NONE"
    | "ALIGN_DELTA"
    | "ALIGN_RATE"
    | "ALIGN_INTERPOLATE"
    | "ALIGN_NEXT_OLDER"
    | "ALIGN_MIN"
    | "ALIGN_MAX"
    | "ALIGN_MEAN"
    | "ALIGN_COUNT"
    | "ALIGN_SUM"
    | "ALIGN_STDDEV"
    | "ALIGN_COUNT_TRUE"
    | "ALIGN_COUNT_FALSE"
    | "ALIGN_FRACTION_TRUE"
    | "ALIGN_PERCENTILE_99"
    | "ALIGN_PERCENTILE_95"
    | "ALIGN_PERCENTILE_50"
    | "ALIGN_PERCENTILE_05"
    | "ALIGN_PERCENT_CHANGE"
    | (string & {});
  /** The reduction operation to be used to combine time series into a single time series, where the value of each data point in the resulting series is a function of all the already aligned values in the input time series.Not all reducer operations can be applied to all time series. The valid choices depend on the metric_kind and the value_type of the original time series. Reduction can yield a time series with a different metric_kind or value_type than the input time series.Time series data must first be aligned (see per_series_aligner) in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified, and must not be ALIGN_NONE. An alignment_period must also be specified; otherwise, an error is returned. */
  crossSeriesReducer?:
    | "REDUCE_NONE"
    | "REDUCE_MEAN"
    | "REDUCE_MIN"
    | "REDUCE_MAX"
    | "REDUCE_SUM"
    | "REDUCE_STDDEV"
    | "REDUCE_COUNT"
    | "REDUCE_COUNT_TRUE"
    | "REDUCE_COUNT_FALSE"
    | "REDUCE_FRACTION_TRUE"
    | "REDUCE_PERCENTILE_99"
    | "REDUCE_PERCENTILE_95"
    | "REDUCE_PERCENTILE_50"
    | "REDUCE_PERCENTILE_05"
    | (string & {});
  /** The set of fields to preserve when cross_series_reducer is specified. The group_by_fields determine how the time series are partitioned into subsets prior to applying the aggregation operation. Each subset contains time series that have the same value for each of the grouping fields. Each individual time series is a member of exactly one subset. The cross_series_reducer is applied to each subset of time series. It is not possible to reduce across different resource types, so this field implicitly contains resource.type. Fields not specified in group_by_fields are aggregated away. If group_by_fields is not specified and all the time series have the same resource type, then the time series are aggregated into a single output time series. If cross_series_reducer is not defined, this field is ignored. */
  groupByFields?: Array<string>;
}

export const Aggregation: Schema.Schema<Aggregation> = Schema.suspend(() =>
  Schema.Struct({
    alignmentPeriod: Schema.optional(Schema.String),
    perSeriesAligner: Schema.optional(Schema.String),
    crossSeriesReducer: Schema.optional(Schema.String),
    groupByFields: Schema.optional(Schema.Array(Schema.String)),
  }),
).annotate({ identifier: "Aggregation" }) as any as Schema.Schema<Aggregation>;

export interface Interval {
  /** Optional. Inclusive start of the interval.If specified, a Timestamp matching this interval will have to be the same or after the start. */
  startTime?: string;
  /** Optional. Exclusive end of the interval.If specified, a Timestamp matching this interval will have to be before the end. */
  endTime?: string;
}

export const Interval: Schema.Schema<Interval> = Schema.suspend(() =>
  Schema.Struct({
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Interval" }) as any as Schema.Schema<Interval>;

export interface PickTimeSeriesFilter {
  /** ranking_method is applied to each time series independently to produce the value which will be used to compare the time series to other time series. */
  rankingMethod?:
    | "METHOD_UNSPECIFIED"
    | "METHOD_MEAN"
    | "METHOD_MAX"
    | "METHOD_MIN"
    | "METHOD_SUM"
    | "METHOD_LATEST"
    | (string & {});
  /** How many time series to allow to pass through the filter. */
  numTimeSeries?: number;
  /** How to use the ranking to select time series that pass through the filter. */
  direction?: "DIRECTION_UNSPECIFIED" | "TOP" | "BOTTOM" | (string & {});
  /** Select the top N streams/time series within this time interval */
  interval?: Interval;
}

export const PickTimeSeriesFilter: Schema.Schema<PickTimeSeriesFilter> =
  Schema.suspend(() =>
    Schema.Struct({
      rankingMethod: Schema.optional(Schema.String),
      numTimeSeries: Schema.optional(Schema.Number),
      direction: Schema.optional(Schema.String),
      interval: Schema.optional(Interval),
    }),
  ).annotate({
    identifier: "PickTimeSeriesFilter",
  }) as any as Schema.Schema<PickTimeSeriesFilter>;

export interface StatisticalTimeSeriesFilter {
  /** rankingMethod is applied to a set of time series, and then the produced value for each individual time series is used to compare a given time series to others. These are methods that cannot be applied stream-by-stream, but rather require the full context of a request to evaluate time series. */
  rankingMethod?:
    | "METHOD_UNSPECIFIED"
    | "METHOD_CLUSTER_OUTLIER"
    | (string & {});
  /** How many time series to output. */
  numTimeSeries?: number;
}

export const StatisticalTimeSeriesFilter: Schema.Schema<StatisticalTimeSeriesFilter> =
  Schema.suspend(() =>
    Schema.Struct({
      rankingMethod: Schema.optional(Schema.String),
      numTimeSeries: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "StatisticalTimeSeriesFilter",
  }) as any as Schema.Schema<StatisticalTimeSeriesFilter>;

export interface TimeSeriesFilter {
  /** Required. The monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) that identifies the metric types, resources, and projects to query. */
  filter?: string;
  /** By default, the raw time series data is returned. Use this field to combine multiple time series for different views of the data. */
  aggregation?: Aggregation;
  /** Apply a second aggregation after aggregation is applied. */
  secondaryAggregation?: Aggregation;
  /** Ranking based time series filter. */
  pickTimeSeriesFilter?: PickTimeSeriesFilter;
  /** Statistics based time series filter. Note: This field is deprecated and completely ignored by the API. */
  statisticalTimeSeriesFilter?: StatisticalTimeSeriesFilter;
}

export const TimeSeriesFilter: Schema.Schema<TimeSeriesFilter> = Schema.suspend(
  () =>
    Schema.Struct({
      filter: Schema.optional(Schema.String),
      aggregation: Schema.optional(Aggregation),
      secondaryAggregation: Schema.optional(Aggregation),
      pickTimeSeriesFilter: Schema.optional(PickTimeSeriesFilter),
      statisticalTimeSeriesFilter: Schema.optional(StatisticalTimeSeriesFilter),
    }),
).annotate({
  identifier: "TimeSeriesFilter",
}) as any as Schema.Schema<TimeSeriesFilter>;

export interface RatioPart {
  /** Required. The monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) that identifies the metric types, resources, and projects to query. */
  filter?: string;
  /** By default, the raw time series data is returned. Use this field to combine multiple time series for different views of the data. */
  aggregation?: Aggregation;
}

export const RatioPart: Schema.Schema<RatioPart> = Schema.suspend(() =>
  Schema.Struct({
    filter: Schema.optional(Schema.String),
    aggregation: Schema.optional(Aggregation),
  }),
).annotate({ identifier: "RatioPart" }) as any as Schema.Schema<RatioPart>;

export interface TimeSeriesFilterRatio {
  /** The numerator of the ratio. */
  numerator?: RatioPart;
  /** The denominator of the ratio. */
  denominator?: RatioPart;
  /** Apply a second aggregation after the ratio is computed. */
  secondaryAggregation?: Aggregation;
  /** Ranking based time series filter. */
  pickTimeSeriesFilter?: PickTimeSeriesFilter;
  /** Statistics based time series filter. Note: This field is deprecated and completely ignored by the API. */
  statisticalTimeSeriesFilter?: StatisticalTimeSeriesFilter;
}

export const TimeSeriesFilterRatio: Schema.Schema<TimeSeriesFilterRatio> =
  Schema.suspend(() =>
    Schema.Struct({
      numerator: Schema.optional(RatioPart),
      denominator: Schema.optional(RatioPart),
      secondaryAggregation: Schema.optional(Aggregation),
      pickTimeSeriesFilter: Schema.optional(PickTimeSeriesFilter),
      statisticalTimeSeriesFilter: Schema.optional(StatisticalTimeSeriesFilter),
    }),
  ).annotate({
    identifier: "TimeSeriesFilterRatio",
  }) as any as Schema.Schema<TimeSeriesFilterRatio>;

export interface OpsAnalyticsQuery {
  /** A SQL query to fetch time series, category series, or numeric series data. */
  sql?: string;
}

export const OpsAnalyticsQuery: Schema.Schema<OpsAnalyticsQuery> =
  Schema.suspend(() =>
    Schema.Struct({
      sql: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OpsAnalyticsQuery",
  }) as any as Schema.Schema<OpsAnalyticsQuery>;

export interface TimeSeriesQuery {
  /** Filter parameters to fetch time series. */
  timeSeriesFilter?: TimeSeriesFilter;
  /** Parameters to fetch a ratio between two time series filters. */
  timeSeriesFilterRatio?: TimeSeriesFilterRatio;
  /** A query used to fetch time series with MQL. */
  timeSeriesQueryLanguage?: string;
  /** A query used to fetch time series with PromQL. */
  prometheusQuery?: string;
  /** Preview: A query used to fetch a time series, category series, or numeric series with SQL. This is a preview feature and may be subject to change before final release. */
  opsAnalyticsQuery?: OpsAnalyticsQuery;
  /** The unit of data contained in fetched time series. If non-empty, this unit will override any unit that accompanies fetched data. The format is the same as the unit (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.metricDescriptors) field in MetricDescriptor. */
  unitOverride?: string;
  /** Optional. If set, Cloud Monitoring will treat the full query duration as the alignment period so that there will be only 1 output value.*Note: This could override the configured alignment period except for the cases where a series of data points are expected, like - XyChart - Scorecard's spark chart */
  outputFullDuration?: boolean;
}

export const TimeSeriesQuery: Schema.Schema<TimeSeriesQuery> = Schema.suspend(
  () =>
    Schema.Struct({
      timeSeriesFilter: Schema.optional(TimeSeriesFilter),
      timeSeriesFilterRatio: Schema.optional(TimeSeriesFilterRatio),
      timeSeriesQueryLanguage: Schema.optional(Schema.String),
      prometheusQuery: Schema.optional(Schema.String),
      opsAnalyticsQuery: Schema.optional(OpsAnalyticsQuery),
      unitOverride: Schema.optional(Schema.String),
      outputFullDuration: Schema.optional(Schema.Boolean),
    }),
).annotate({
  identifier: "TimeSeriesQuery",
}) as any as Schema.Schema<TimeSeriesQuery>;

export interface Dimension {
  /** Required. For widgets that use SQL queries, set the value to the name of the column in the results table whose data is charted. For a histogram that uses a time series query, set the value of this field to metric_value. */
  column?: string;
  /** Optional. The type of the dimension column. This is relevant only if one of the bin_size fields is set. If it is empty, the type TIMESTAMP or INT64 will be assumed based on which bin_size field is set. If populated, this should be set to one of the following types: DATE, TIME, DATETIME, TIMESTAMP, BIGNUMERIC, INT64, NUMERIC, FLOAT64. */
  columnType?: string;
  /** time_bin_size is used when the data type of the specified dimension is a time type and the bin size is determined by a time duration. If column_type is DATE, this must be a whole value multiple of 1 day. If column_type is TIME, this must be less than or equal to 24 hours. */
  timeBinSize?: string;
  /** numeric_bin_size is used when the column type used for a dimension is numeric or string. If the column field is set to metric_value, then numericBinSize overrides maxBinCount. */
  numericBinSize?: number;
  /** Optional. float_bin_size is used when the column type used for a dimension is a floating point numeric column. */
  floatBinSize?: number;
  /** For widgets that use SQL queries, the limit to the number of bins to generate. When 0 is specified, the maximum count is not enforced. For a histogram that uses a time series query, the exact number of bins to generate. If not specified or the value is 0, then the histogram determines the number of bins to use. */
  maxBinCount?: number;
  /** The sort order applied to the sort column. */
  sortOrder?:
    | "SORT_ORDER_UNSPECIFIED"
    | "SORT_ORDER_NONE"
    | "SORT_ORDER_ASCENDING"
    | "SORT_ORDER_DESCENDING"
    | (string & {});
  /** The column name to sort on for binning. This column can be the same column as this dimension or any other column used as a measure in the results. If sort_order is set to NONE, then this value is not used. */
  sortColumn?: string;
}

export const Dimension: Schema.Schema<Dimension> = Schema.suspend(() =>
  Schema.Struct({
    column: Schema.optional(Schema.String),
    columnType: Schema.optional(Schema.String),
    timeBinSize: Schema.optional(Schema.String),
    numericBinSize: Schema.optional(Schema.Number),
    floatBinSize: Schema.optional(Schema.Number),
    maxBinCount: Schema.optional(Schema.Number),
    sortOrder: Schema.optional(Schema.String),
    sortColumn: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Dimension" }) as any as Schema.Schema<Dimension>;

export interface Parameter {
  /** An integer parameter value. */
  intValue?: string;
  /** A floating-point parameter value. */
  doubleValue?: number;
}

export const Parameter: Schema.Schema<Parameter> = Schema.suspend(() =>
  Schema.Struct({
    intValue: Schema.optional(Schema.String),
    doubleValue: Schema.optional(Schema.Number),
  }),
).annotate({ identifier: "Parameter" }) as any as Schema.Schema<Parameter>;

export interface AggregationFunction {
  /** Required. The type of aggregation function, must be one of the following: "none" - no function. "percentile" - APPROX_QUANTILES() - 1 parameter numeric value "average" - AVG() "count" - COUNT() "count-distinct" - COUNT(DISTINCT) "count-distinct-approx" - APPROX_COUNT_DISTINCT() "max" - MAX() "min" - MIN() "sum" - SUM() */
  type?: string;
  /** Optional. Parameters applied to the aggregation function. Only used for functions that require them. */
  parameters?: Array<Parameter>;
}

export const AggregationFunction: Schema.Schema<AggregationFunction> =
  Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      parameters: Schema.optional(Schema.Array(Parameter)),
    }),
  ).annotate({
    identifier: "AggregationFunction",
  }) as any as Schema.Schema<AggregationFunction>;

export interface Measure {
  /** Required. The column name within in the dataset used for the measure. */
  column?: string;
  /** Required. The aggregation function applied to the input column. This must not be set to "none" unless binning is disabled on the dimension. The aggregation function is used to group points on the dimension bins. */
  aggregationFunction?: AggregationFunction;
}

export const Measure: Schema.Schema<Measure> = Schema.suspend(() =>
  Schema.Struct({
    column: Schema.optional(Schema.String),
    aggregationFunction: Schema.optional(AggregationFunction),
  }),
).annotate({ identifier: "Measure" }) as any as Schema.Schema<Measure>;

export interface Breakdown {
  /** Required. The name of the column in the dataset containing the breakdown values. */
  column?: string;
  /** Required. A limit to the number of breakdowns. If set to zero then all possible breakdowns are applied. The list of breakdowns is dependent on the value of the sort_order field. */
  limit?: number;
  /** Required. The Aggregation function is applied across all data in each breakdown created. */
  aggregationFunction?: AggregationFunction;
  /** Required. The sort order is applied to the values of the breakdown column. */
  sortOrder?:
    | "SORT_ORDER_UNSPECIFIED"
    | "SORT_ORDER_NONE"
    | "SORT_ORDER_ASCENDING"
    | "SORT_ORDER_DESCENDING"
    | (string & {});
}

export const Breakdown: Schema.Schema<Breakdown> = Schema.suspend(() =>
  Schema.Struct({
    column: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    aggregationFunction: Schema.optional(AggregationFunction),
    sortOrder: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Breakdown" }) as any as Schema.Schema<Breakdown>;

export interface ColumnSortingOptions {
  /** Optional. Column name to sort data by */
  column?: string;
  /** Optional. A sorting direction that determines ascending or descending order. This is a legacy field kept for backwards compatibility with table. */
  direction?:
    | "SORT_ORDER_UNSPECIFIED"
    | "SORT_ORDER_NONE"
    | "SORT_ORDER_ASCENDING"
    | "SORT_ORDER_DESCENDING"
    | (string & {});
}

export const ColumnSortingOptions: Schema.Schema<ColumnSortingOptions> =
  Schema.suspend(() =>
    Schema.Struct({
      column: Schema.optional(Schema.String),
      direction: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ColumnSortingOptions",
  }) as any as Schema.Schema<ColumnSortingOptions>;

export interface DataSet {
  /** Required. Fields for querying time series data from the Stackdriver metrics API. */
  timeSeriesQuery?: TimeSeriesQuery;
  /** How this data should be plotted on the chart. */
  plotType?:
    | "PLOT_TYPE_UNSPECIFIED"
    | "LINE"
    | "STACKED_AREA"
    | "STACKED_BAR"
    | "HEATMAP"
    | (string & {});
  /** A template string for naming TimeSeries in the resulting data set. This should be a string with interpolations of the form ${label_name}, which will resolve to the label's value. */
  legendTemplate?: string;
  /** Optional. The lower bound on data point frequency for this data set, implemented by specifying the minimum alignment period to use in a time series query For example, if the data is published once every 10 minutes, the min_alignment_period should be at least 10 minutes. It would not make sense to fetch and align data at one minute intervals. */
  minAlignmentPeriod?: string;
  /** Optional. The target axis to use for plotting the metric. */
  targetAxis?: "TARGET_AXIS_UNSPECIFIED" | "Y1" | "Y2" | (string & {});
  /** Optional. A collection of dimension columns. */
  dimensions?: Array<Dimension>;
  /** Optional. A collection of measures. */
  measures?: Array<Measure>;
  /** Optional. The collection of breakdowns to be applied to the dataset. */
  breakdowns?: Array<Breakdown>;
  /** Optional. A collection of sort options, affects the order of the data and legend. */
  sort?: Array<ColumnSortingOptions>;
}

export const DataSet: Schema.Schema<DataSet> = Schema.suspend(() =>
  Schema.Struct({
    timeSeriesQuery: Schema.optional(TimeSeriesQuery),
    plotType: Schema.optional(Schema.String),
    legendTemplate: Schema.optional(Schema.String),
    minAlignmentPeriod: Schema.optional(Schema.String),
    targetAxis: Schema.optional(Schema.String),
    dimensions: Schema.optional(Schema.Array(Dimension)),
    measures: Schema.optional(Schema.Array(Measure)),
    breakdowns: Schema.optional(Schema.Array(Breakdown)),
    sort: Schema.optional(Schema.Array(ColumnSortingOptions)),
  }),
).annotate({ identifier: "DataSet" }) as any as Schema.Schema<DataSet>;

export interface Threshold {
  /** A label for the threshold. */
  label?: string;
  /** The value of the threshold. The value should be defined in the native scale of the metric. */
  value?: number;
  /** The state color for this threshold. Color is not allowed in a XyChart. */
  color?: "COLOR_UNSPECIFIED" | "YELLOW" | "RED" | (string & {});
  /** The direction for the current threshold. Direction is not allowed in a XyChart. */
  direction?: "DIRECTION_UNSPECIFIED" | "ABOVE" | "BELOW" | (string & {});
  /** The target axis to use for plotting the threshold. Target axis is not allowed in a Scorecard. */
  targetAxis?: "TARGET_AXIS_UNSPECIFIED" | "Y1" | "Y2" | (string & {});
}

export const Threshold: Schema.Schema<Threshold> = Schema.suspend(() =>
  Schema.Struct({
    label: Schema.optional(Schema.String),
    value: Schema.optional(Schema.Number),
    color: Schema.optional(Schema.String),
    direction: Schema.optional(Schema.String),
    targetAxis: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Threshold" }) as any as Schema.Schema<Threshold>;

export interface Axis {
  /** The label of the axis. */
  label?: string;
  /** The axis scale. By default, a linear scale is used. */
  scale?: "SCALE_UNSPECIFIED" | "LINEAR" | "LOG10" | (string & {});
}

export const Axis: Schema.Schema<Axis> = Schema.suspend(() =>
  Schema.Struct({
    label: Schema.optional(Schema.String),
    scale: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Axis" }) as any as Schema.Schema<Axis>;

export interface ChartOptions {
  /** The chart mode. */
  mode?: "MODE_UNSPECIFIED" | "COLOR" | "X_RAY" | "STATS" | (string & {});
  /** Preview: Configures whether the charted values are shown on the horizontal or vertical axis. By default, values are represented the vertical axis. This is a preview feature and may be subject to change before final release. */
  displayHorizontal?: boolean;
}

export const ChartOptions: Schema.Schema<ChartOptions> = Schema.suspend(() =>
  Schema.Struct({
    mode: Schema.optional(Schema.String),
    displayHorizontal: Schema.optional(Schema.Boolean),
  }),
).annotate({
  identifier: "ChartOptions",
}) as any as Schema.Schema<ChartOptions>;

export interface XyChart {
  /** Required. The data displayed in this chart. */
  dataSets?: Array<DataSet>;
  /** The duration used to display a comparison chart. A comparison chart simultaneously shows values from two similar-length time periods (e.g., week-over-week metrics). The duration must be positive, and it can only be applied to charts with data sets of LINE plot type. */
  timeshiftDuration?: string;
  /** Threshold lines drawn horizontally across the chart. */
  thresholds?: Array<Threshold>;
  /** The properties applied to the x-axis. */
  xAxis?: Axis;
  /** The properties applied to the y-axis. */
  yAxis?: Axis;
  /** The properties applied to the y2-axis. */
  y2Axis?: Axis;
  /** Display options for the chart. */
  chartOptions?: ChartOptions;
}

export const XyChart: Schema.Schema<XyChart> = Schema.suspend(() =>
  Schema.Struct({
    dataSets: Schema.optional(Schema.Array(DataSet)),
    timeshiftDuration: Schema.optional(Schema.String),
    thresholds: Schema.optional(Schema.Array(Threshold)),
    xAxis: Schema.optional(Axis),
    yAxis: Schema.optional(Axis),
    y2Axis: Schema.optional(Axis),
    chartOptions: Schema.optional(ChartOptions),
  }),
).annotate({ identifier: "XyChart" }) as any as Schema.Schema<XyChart>;

export interface GaugeView {
  /** The lower bound for this gauge chart. The value of the chart should always be greater than or equal to this. */
  lowerBound?: number;
  /** The upper bound for this gauge chart. The value of the chart should always be less than or equal to this. */
  upperBound?: number;
}

export const GaugeView: Schema.Schema<GaugeView> = Schema.suspend(() =>
  Schema.Struct({
    lowerBound: Schema.optional(Schema.Number),
    upperBound: Schema.optional(Schema.Number),
  }),
).annotate({ identifier: "GaugeView" }) as any as Schema.Schema<GaugeView>;

export interface SparkChartView {
  /** Required. The type of sparkchart to show in this chartView. */
  sparkChartType?:
    | "SPARK_CHART_TYPE_UNSPECIFIED"
    | "SPARK_LINE"
    | "SPARK_BAR"
    | (string & {});
  /** The lower bound on data point frequency in the chart implemented by specifying the minimum alignment period to use in a time series query. For example, if the data is published once every 10 minutes it would not make sense to fetch and align data at one minute intervals. This field is optional and exists only as a hint. */
  minAlignmentPeriod?: string;
}

export const SparkChartView: Schema.Schema<SparkChartView> = Schema.suspend(
  () =>
    Schema.Struct({
      sparkChartType: Schema.optional(Schema.String),
      minAlignmentPeriod: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "SparkChartView",
}) as any as Schema.Schema<SparkChartView>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() =>
  Schema.Struct({}),
).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface Scorecard {
  /** Required. Fields for querying time series data from the Stackdriver metrics API. */
  timeSeriesQuery?: TimeSeriesQuery;
  /** Will cause the scorecard to show a gauge chart. */
  gaugeView?: GaugeView;
  /** Will cause the scorecard to show a spark chart. */
  sparkChartView?: SparkChartView;
  /** Will cause the Scorecard to show only the value, with no indicator to its value relative to its thresholds. */
  blankView?: Empty;
  /** The thresholds used to determine the state of the scorecard given the time series' current value. For an actual value x, the scorecard is in a danger state if x is less than or equal to a danger threshold that triggers below, or greater than or equal to a danger threshold that triggers above. Similarly, if x is above/below a warning threshold that triggers above/below, then the scorecard is in a warning state - unless x also puts it in a danger state. (Danger trumps warning.)As an example, consider a scorecard with the following four thresholds: { value: 90, category: 'DANGER', trigger: 'ABOVE', }, { value: 70, category: 'WARNING', trigger: 'ABOVE', }, { value: 10, category: 'DANGER', trigger: 'BELOW', }, { value: 20, category: 'WARNING', trigger: 'BELOW', } Then: values less than or equal to 10 would put the scorecard in a DANGER state, values greater than 10 but less than or equal to 20 a WARNING state, values strictly between 20 and 70 an OK state, values greater than or equal to 70 but less than 90 a WARNING state, and values greater than or equal to 90 a DANGER state. */
  thresholds?: Array<Threshold>;
  /** Optional. A dimension is a structured label, class, or category for a set of measurements in your data. */
  dimensions?: Array<Dimension>;
  /** Optional. A measure is a measured value of a property in your data. For example, rainfall in inches, number of units sold, revenue gained, etc. */
  measures?: Array<Measure>;
  /** Optional. The collection of breakdowns to be applied to the dataset. A breakdown is a way to slice the data. For example, you can break down the data by region. */
  breakdowns?: Array<Breakdown>;
}

export const Scorecard: Schema.Schema<Scorecard> = Schema.suspend(() =>
  Schema.Struct({
    timeSeriesQuery: Schema.optional(TimeSeriesQuery),
    gaugeView: Schema.optional(GaugeView),
    sparkChartView: Schema.optional(SparkChartView),
    blankView: Schema.optional(Empty),
    thresholds: Schema.optional(Schema.Array(Threshold)),
    dimensions: Schema.optional(Schema.Array(Dimension)),
    measures: Schema.optional(Schema.Array(Measure)),
    breakdowns: Schema.optional(Schema.Array(Breakdown)),
  }),
).annotate({ identifier: "Scorecard" }) as any as Schema.Schema<Scorecard>;

export interface TextStyle {
  /** The background color as a hex string. "#RRGGBB" or "#RGB" */
  backgroundColor?: string;
  /** The text color as a hex string. "#RRGGBB" or "#RGB" */
  textColor?: string;
  /** The horizontal alignment of both the title and content */
  horizontalAlignment?:
    | "HORIZONTAL_ALIGNMENT_UNSPECIFIED"
    | "H_LEFT"
    | "H_CENTER"
    | "H_RIGHT"
    | (string & {});
  /** The vertical alignment of both the title and content */
  verticalAlignment?:
    | "VERTICAL_ALIGNMENT_UNSPECIFIED"
    | "V_TOP"
    | "V_CENTER"
    | "V_BOTTOM"
    | (string & {});
  /** The amount of padding around the widget */
  padding?:
    | "PADDING_SIZE_UNSPECIFIED"
    | "P_EXTRA_SMALL"
    | "P_SMALL"
    | "P_MEDIUM"
    | "P_LARGE"
    | "P_EXTRA_LARGE"
    | (string & {});
  /** Font sizes for both the title and content. The title will still be larger relative to the content. */
  fontSize?:
    | "FONT_SIZE_UNSPECIFIED"
    | "FS_EXTRA_SMALL"
    | "FS_SMALL"
    | "FS_MEDIUM"
    | "FS_LARGE"
    | "FS_EXTRA_LARGE"
    | (string & {});
  /** The pointer location for this widget (also sometimes called a "tail") */
  pointerLocation?:
    | "POINTER_LOCATION_UNSPECIFIED"
    | "PL_TOP"
    | "PL_RIGHT"
    | "PL_BOTTOM"
    | "PL_LEFT"
    | "PL_TOP_LEFT"
    | "PL_TOP_RIGHT"
    | "PL_RIGHT_TOP"
    | "PL_RIGHT_BOTTOM"
    | "PL_BOTTOM_RIGHT"
    | "PL_BOTTOM_LEFT"
    | "PL_LEFT_BOTTOM"
    | "PL_LEFT_TOP"
    | (string & {});
}

export const TextStyle: Schema.Schema<TextStyle> = Schema.suspend(() =>
  Schema.Struct({
    backgroundColor: Schema.optional(Schema.String),
    textColor: Schema.optional(Schema.String),
    horizontalAlignment: Schema.optional(Schema.String),
    verticalAlignment: Schema.optional(Schema.String),
    padding: Schema.optional(Schema.String),
    fontSize: Schema.optional(Schema.String),
    pointerLocation: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "TextStyle" }) as any as Schema.Schema<TextStyle>;

export interface Text {
  /** The text content to be displayed. */
  content?: string;
  /** How the text content is formatted. */
  format?: "FORMAT_UNSPECIFIED" | "MARKDOWN" | "RAW" | (string & {});
  /** How the text is styled */
  style?: TextStyle;
}

export const Text: Schema.Schema<Text> = Schema.suspend(() =>
  Schema.Struct({
    content: Schema.optional(Schema.String),
    format: Schema.optional(Schema.String),
    style: Schema.optional(TextStyle),
  }),
).annotate({ identifier: "Text" }) as any as Schema.Schema<Text>;

export interface AlertChart {
  /** Required. The resource name of the alert policy. The format is: projects/[PROJECT_ID_OR_NUMBER]/alertPolicies/[ALERT_POLICY_ID] */
  name?: string;
}

export const AlertChart: Schema.Schema<AlertChart> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "AlertChart" }) as any as Schema.Schema<AlertChart>;

export interface TableDisplayOptions {
  /** Optional. This field is unused and has been replaced by TimeSeriesTable.column_settings */
  shownColumns?: Array<string>;
}

export const TableDisplayOptions: Schema.Schema<TableDisplayOptions> =
  Schema.suspend(() =>
    Schema.Struct({
      shownColumns: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "TableDisplayOptions",
  }) as any as Schema.Schema<TableDisplayOptions>;

export interface TableDataSet {
  /** Required. Fields for querying time series data from the Stackdriver metrics API. */
  timeSeriesQuery?: TimeSeriesQuery;
  /** Optional. A template string for naming TimeSeries in the resulting data set. This should be a string with interpolations of the form ${label_name}, which will resolve to the label's value i.e. "${resource.labels.project_id}." */
  tableTemplate?: string;
  /** Optional. The lower bound on data point frequency for this data set, implemented by specifying the minimum alignment period to use in a time series query For example, if the data is published once every 10 minutes, the min_alignment_period should be at least 10 minutes. It would not make sense to fetch and align data at one minute intervals. */
  minAlignmentPeriod?: string;
  /** Optional. Table display options for configuring how the table is rendered. */
  tableDisplayOptions?: TableDisplayOptions;
}

export const TableDataSet: Schema.Schema<TableDataSet> = Schema.suspend(() =>
  Schema.Struct({
    timeSeriesQuery: Schema.optional(TimeSeriesQuery),
    tableTemplate: Schema.optional(Schema.String),
    minAlignmentPeriod: Schema.optional(Schema.String),
    tableDisplayOptions: Schema.optional(TableDisplayOptions),
  }),
).annotate({
  identifier: "TableDataSet",
}) as any as Schema.Schema<TableDataSet>;

export interface ColumnSettings {
  /** Required. The id of the column. */
  column?: string;
  /** Required. Whether the column should be visible on page load. */
  visible?: boolean;
  /** Optional. Whether the column should be left / middle / right aligned */
  alignment?:
    | "CELL_ALIGNMENT_UNSPECIFIED"
    | "LEFT"
    | "CENTER"
    | "RIGHT"
    | (string & {});
  /** Optional. Display name of the column */
  displayName?: string;
  /** Optional. The thresholds used to determine how the table cell should be rendered given the time series' current value. */
  thresholds?: Array<Threshold>;
}

export const ColumnSettings: Schema.Schema<ColumnSettings> = Schema.suspend(
  () =>
    Schema.Struct({
      column: Schema.optional(Schema.String),
      visible: Schema.optional(Schema.Boolean),
      alignment: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      thresholds: Schema.optional(Schema.Array(Threshold)),
    }),
).annotate({
  identifier: "ColumnSettings",
}) as any as Schema.Schema<ColumnSettings>;

export interface TimeSeriesTable {
  /** Required. The data displayed in this table. */
  dataSets?: Array<TableDataSet>;
  /** Optional. Store rendering strategy */
  metricVisualization?:
    | "METRIC_VISUALIZATION_UNSPECIFIED"
    | "NUMBER"
    | "BAR"
    | (string & {});
  /** Optional. The list of the persistent column settings for the table. */
  columnSettings?: Array<ColumnSettings>;
}

export const TimeSeriesTable: Schema.Schema<TimeSeriesTable> = Schema.suspend(
  () =>
    Schema.Struct({
      dataSets: Schema.optional(Schema.Array(TableDataSet)),
      metricVisualization: Schema.optional(Schema.String),
      columnSettings: Schema.optional(Schema.Array(ColumnSettings)),
    }),
).annotate({
  identifier: "TimeSeriesTable",
}) as any as Schema.Schema<TimeSeriesTable>;

export interface CollapsibleGroup {
  /** The collapsed state of the widget on first page load. */
  collapsed?: boolean;
}

export const CollapsibleGroup: Schema.Schema<CollapsibleGroup> = Schema.suspend(
  () =>
    Schema.Struct({
      collapsed: Schema.optional(Schema.Boolean),
    }),
).annotate({
  identifier: "CollapsibleGroup",
}) as any as Schema.Schema<CollapsibleGroup>;

export interface LogsPanel {
  /** A filter that chooses which log entries to return. See Advanced Logs Queries (https://cloud.google.com/logging/docs/view/advanced-queries). Only log entries that match the filter are returned. An empty filter matches all log entries. */
  filter?: string;
  /** The names of logging resources to collect logs for. Currently projects and storage views are supported. If empty, the widget will default to the host project. */
  resourceNames?: Array<string>;
}

export const LogsPanel: Schema.Schema<LogsPanel> = Schema.suspend(() =>
  Schema.Struct({
    filter: Schema.optional(Schema.String),
    resourceNames: Schema.optional(Schema.Array(Schema.String)),
  }),
).annotate({ identifier: "LogsPanel" }) as any as Schema.Schema<LogsPanel>;

export interface MonitoredResource {
  /** Required. The monitored resource type. This field must match the type field of a MonitoredResourceDescriptor object. For example, the type of a Compute Engine VM instance is gce_instance. For a list of types, see Monitoring resource types (https://cloud.google.com/monitoring/api/resources) and Logging resource types (https://cloud.google.com/logging/docs/api/v2/resource-list). */
  type?: string;
  /** Required. Values for all of the labels listed in the associated monitored resource descriptor. For example, Compute Engine VM instances use the labels "project_id", "instance_id", and "zone". */
  labels?: Record<string, string>;
}

export const MonitoredResource: Schema.Schema<MonitoredResource> =
  Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({
    identifier: "MonitoredResource",
  }) as any as Schema.Schema<MonitoredResource>;

export interface IncidentList {
  /** Optional. The monitored resource for which incidents are listed. The resource doesn't need to be fully specified. That is, you can specify the resource type but not the values of the resource labels. The resource type and labels are used for filtering. */
  monitoredResources?: Array<MonitoredResource>;
  /** Optional. A list of alert policy names to filter the incident list by. Don't include the project ID prefix in the policy name. For example, use alertPolicies/utilization. */
  policyNames?: Array<string>;
}

export const IncidentList: Schema.Schema<IncidentList> = Schema.suspend(() =>
  Schema.Struct({
    monitoredResources: Schema.optional(Schema.Array(MonitoredResource)),
    policyNames: Schema.optional(Schema.Array(Schema.String)),
  }),
).annotate({
  identifier: "IncidentList",
}) as any as Schema.Schema<IncidentList>;

export interface PieChartDataSet {
  /** Required. The query for the PieChart. See, google.monitoring.dashboard.v1.TimeSeriesQuery. */
  timeSeriesQuery?: TimeSeriesQuery;
  /** Optional. A template for the name of the slice. This name will be displayed in the legend and the tooltip of the pie chart. It replaces the auto-generated names for the slices. For example, if the template is set to ${resource.labels.zone}, the zone's value will be used for the name instead of the default name. */
  sliceNameTemplate?: string;
  /** Optional. The lower bound on data point frequency for this data set, implemented by specifying the minimum alignment period to use in a time series query. For example, if the data is published once every 10 minutes, the min_alignment_period should be at least 10 minutes. It would not make sense to fetch and align data at one minute intervals. */
  minAlignmentPeriod?: string;
  /** A dimension is a structured label, class, or category for a set of measurements in your data. */
  dimensions?: Array<Dimension>;
  /** A measure is a measured value of a property in your data. For example, rainfall in inches, number of units sold, revenue gained, etc. */
  measures?: Array<Measure>;
}

export const PieChartDataSet: Schema.Schema<PieChartDataSet> = Schema.suspend(
  () =>
    Schema.Struct({
      timeSeriesQuery: Schema.optional(TimeSeriesQuery),
      sliceNameTemplate: Schema.optional(Schema.String),
      minAlignmentPeriod: Schema.optional(Schema.String),
      dimensions: Schema.optional(Schema.Array(Dimension)),
      measures: Schema.optional(Schema.Array(Measure)),
    }),
).annotate({
  identifier: "PieChartDataSet",
}) as any as Schema.Schema<PieChartDataSet>;

export interface PieChart {
  /** Required. The queries for the chart's data. */
  dataSets?: Array<PieChartDataSet>;
  /** Required. Indicates the visualization type for the PieChart. */
  chartType?: "PIE_CHART_TYPE_UNSPECIFIED" | "PIE" | "DONUT" | (string & {});
  /** Optional. Indicates whether or not the pie chart should show slices' labels */
  showLabels?: boolean;
}

export const PieChart: Schema.Schema<PieChart> = Schema.suspend(() =>
  Schema.Struct({
    dataSets: Schema.optional(Schema.Array(PieChartDataSet)),
    chartType: Schema.optional(Schema.String),
    showLabels: Schema.optional(Schema.Boolean),
  }),
).annotate({ identifier: "PieChart" }) as any as Schema.Schema<PieChart>;

export interface TreemapDataSet {
  /** Required. The query that fetches the relevant data. See google.monitoring.dashboard.v1.TimeSeriesQuery */
  timeSeriesQuery?: TimeSeriesQuery;
  /** Optional. A collection of measures. A measure is a measured value of a property in your data. For example, rainfall in inches, number of units sold, revenue gained, etc. */
  measures?: Array<Measure>;
  /** Optional. The collection of breakdowns to be applied to the dataset. A breakdown is a way to slice the data. For example, you can break down the data by region. */
  breakdowns?: Array<Breakdown>;
}

export const TreemapDataSet: Schema.Schema<TreemapDataSet> = Schema.suspend(
  () =>
    Schema.Struct({
      timeSeriesQuery: Schema.optional(TimeSeriesQuery),
      measures: Schema.optional(Schema.Array(Measure)),
      breakdowns: Schema.optional(Schema.Array(Breakdown)),
    }),
).annotate({
  identifier: "TreemapDataSet",
}) as any as Schema.Schema<TreemapDataSet>;

export interface Treemap {
  /** Required. The collection of datasets used to construct and populate the treemap. For the rendered treemap rectangles: Color is determined by the aggregated value for each grouping. Size is proportional to the count of time series aggregated within that rectangle's segment. */
  dataSets?: Array<TreemapDataSet>;
  /** Required. Ordered labels representing the hierarchical treemap structure. */
  treemapHierarchy?: Array<string>;
}

export const Treemap: Schema.Schema<Treemap> = Schema.suspend(() =>
  Schema.Struct({
    dataSets: Schema.optional(Schema.Array(TreemapDataSet)),
    treemapHierarchy: Schema.optional(Schema.Array(Schema.String)),
  }),
).annotate({ identifier: "Treemap" }) as any as Schema.Schema<Treemap>;

export interface ErrorReportingPanel {
  /** The resource name of the Google Cloud Platform project. Written as projects/{projectID} or projects/{projectNumber}, where {projectID} and {projectNumber} can be found in the Google Cloud console (https://support.google.com/cloud/answer/6158840).Examples: projects/my-project-123, projects/5551234. */
  projectNames?: Array<string>;
  /** An identifier of the service, such as the name of the executable, job, or Google App Engine service name. This field is expected to have a low number of values that are relatively stable over time, as opposed to version, which can be changed whenever new code is deployed.Contains the service name for error reports extracted from Google App Engine logs or default if the App Engine default service is used. */
  services?: Array<string>;
  /** Represents the source code version that the developer provided, which could represent a version label or a Git SHA-1 hash, for example. For App Engine standard environment, the version is set to the version of the app. */
  versions?: Array<string>;
}

export const ErrorReportingPanel: Schema.Schema<ErrorReportingPanel> =
  Schema.suspend(() =>
    Schema.Struct({
      projectNames: Schema.optional(Schema.Array(Schema.String)),
      services: Schema.optional(Schema.Array(Schema.String)),
      versions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ErrorReportingPanel",
  }) as any as Schema.Schema<ErrorReportingPanel>;

export interface SectionHeader {
  /** The subtitle of the section */
  subtitle?: string;
  /** Whether to insert a divider below the section in the table of contents */
  dividerBelow?: boolean;
}

export const SectionHeader: Schema.Schema<SectionHeader> = Schema.suspend(() =>
  Schema.Struct({
    subtitle: Schema.optional(Schema.String),
    dividerBelow: Schema.optional(Schema.Boolean),
  }),
).annotate({
  identifier: "SectionHeader",
}) as any as Schema.Schema<SectionHeader>;

export interface SingleViewGroup {
  /** Optional. Determines how the widget selector will be displayed. */
  displayType?: "DISPLAY_TYPE_UNSPECIFIED" | "DROPDOWN" | "TAB" | (string & {});
}

export const SingleViewGroup: Schema.Schema<SingleViewGroup> = Schema.suspend(
  () =>
    Schema.Struct({
      displayType: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "SingleViewGroup",
}) as any as Schema.Schema<SingleViewGroup>;

export interface FilterControl {
  /** Name of the template variable the widget affects. */
  templateVariable?: string;
}

export const FilterControl: Schema.Schema<FilterControl> = Schema.suspend(() =>
  Schema.Struct({
    templateVariable: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "FilterControl",
}) as any as Schema.Schema<FilterControl>;

export interface TemplateVariableCondition {
  /** The template variable whose value is evaluated. */
  templateVariable?: string;
  /** The value to compare the template variable to. For example, if the comparator is REGEX_FULL_MATCH, this field should contain a regex. */
  templateVariableValue?: string;
  /** Comparator to use to evaluate whether the value of the template variable matches the template_variable_value. For example, if the comparator is REGEX_FULL_MATCH, template_variable_value would contain a regex that is matched against the value of the template variable. */
  comparator?: "COMPARATOR_UNSPECIFIED" | "REGEX_FULL_MATCH" | (string & {});
}

export const TemplateVariableCondition: Schema.Schema<TemplateVariableCondition> =
  Schema.suspend(() =>
    Schema.Struct({
      templateVariable: Schema.optional(Schema.String),
      templateVariableValue: Schema.optional(Schema.String),
      comparator: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "TemplateVariableCondition",
  }) as any as Schema.Schema<TemplateVariableCondition>;

export interface VisibilityCondition {
  /** A condition whose evaluation is based on the value of a template variable. */
  templateVariableCondition?: TemplateVariableCondition;
}

export const VisibilityCondition: Schema.Schema<VisibilityCondition> =
  Schema.suspend(() =>
    Schema.Struct({
      templateVariableCondition: Schema.optional(TemplateVariableCondition),
    }),
  ).annotate({
    identifier: "VisibilityCondition",
  }) as any as Schema.Schema<VisibilityCondition>;

export interface Widget {
  /** Optional. The title of the widget. */
  title?: string;
  /** A chart of time series data. */
  xyChart?: XyChart;
  /** A scorecard summarizing time series data. */
  scorecard?: Scorecard;
  /** A raw string or markdown displaying textual content. */
  text?: Text;
  /** A blank space. */
  blank?: Empty;
  /** A chart of alert policy data. */
  alertChart?: AlertChart;
  /** A widget that displays time series data in a tabular format. */
  timeSeriesTable?: TimeSeriesTable;
  /** A widget that groups the other widgets. All widgets that are within the area spanned by the grouping widget are considered member widgets. */
  collapsibleGroup?: CollapsibleGroup;
  /** A widget that shows a stream of logs. */
  logsPanel?: LogsPanel;
  /** A widget that shows list of incidents. */
  incidentList?: IncidentList;
  /** A widget that displays timeseries data as a pie chart. */
  pieChart?: PieChart;
  /** A widget that displays data as a treemap. */
  treemap?: Treemap;
  /** A widget that displays a list of error groups. */
  errorReportingPanel?: ErrorReportingPanel;
  /** A widget that defines a section header for easier navigation of the dashboard. */
  sectionHeader?: SectionHeader;
  /** A widget that groups the other widgets by using a dropdown menu. */
  singleViewGroup?: SingleViewGroup;
  /** A widget that displays an input field to change the value of a template variable. */
  filterControl?: FilterControl;
  /** Optional. The widget id. Ids may be made up of alphanumerics, dashes and underscores. Widget ids are optional. */
  id?: string;
  /** Optional. If set, this widget is rendered only when the condition is evaluated to true. */
  visibilityCondition?: VisibilityCondition;
}

export const Widget: Schema.Schema<Widget> = Schema.suspend(() =>
  Schema.Struct({
    title: Schema.optional(Schema.String),
    xyChart: Schema.optional(XyChart),
    scorecard: Schema.optional(Scorecard),
    text: Schema.optional(Text),
    blank: Schema.optional(Empty),
    alertChart: Schema.optional(AlertChart),
    timeSeriesTable: Schema.optional(TimeSeriesTable),
    collapsibleGroup: Schema.optional(CollapsibleGroup),
    logsPanel: Schema.optional(LogsPanel),
    incidentList: Schema.optional(IncidentList),
    pieChart: Schema.optional(PieChart),
    treemap: Schema.optional(Treemap),
    errorReportingPanel: Schema.optional(ErrorReportingPanel),
    sectionHeader: Schema.optional(SectionHeader),
    singleViewGroup: Schema.optional(SingleViewGroup),
    filterControl: Schema.optional(FilterControl),
    id: Schema.optional(Schema.String),
    visibilityCondition: Schema.optional(VisibilityCondition),
  }),
).annotate({ identifier: "Widget" }) as any as Schema.Schema<Widget>;

export interface GridLayout {
  /** The number of columns into which the view's width is divided. If omitted or set to zero, a system default will be used while rendering. */
  columns?: string;
  /** The informational elements that are arranged into the columns row-first. */
  widgets?: Array<Widget>;
}

export const GridLayout: Schema.Schema<GridLayout> = Schema.suspend(() =>
  Schema.Struct({
    columns: Schema.optional(Schema.String),
    widgets: Schema.optional(Schema.Array(Widget)),
  }),
).annotate({ identifier: "GridLayout" }) as any as Schema.Schema<GridLayout>;

export interface Tile {
  /** The zero-indexed position of the tile in grid blocks relative to the left edge of the grid. Tiles must be contained within the specified number of columns. x_pos cannot be negative. */
  xPos?: number;
  /** The zero-indexed position of the tile in grid blocks relative to the top edge of the grid. y_pos cannot be negative. */
  yPos?: number;
  /** The width of the tile, measured in grid blocks. Tiles must have a minimum width of 1. */
  width?: number;
  /** The height of the tile, measured in grid blocks. Tiles must have a minimum height of 1. */
  height?: number;
  /** The informational widget contained in the tile. For example an XyChart. */
  widget?: Widget;
}

export const Tile: Schema.Schema<Tile> = Schema.suspend(() =>
  Schema.Struct({
    xPos: Schema.optional(Schema.Number),
    yPos: Schema.optional(Schema.Number),
    width: Schema.optional(Schema.Number),
    height: Schema.optional(Schema.Number),
    widget: Schema.optional(Widget),
  }),
).annotate({ identifier: "Tile" }) as any as Schema.Schema<Tile>;

export interface MosaicLayout {
  /** The number of columns in the mosaic grid. The number of columns must be between 1 and 48, inclusive. */
  columns?: number;
  /** The tiles to display. */
  tiles?: Array<Tile>;
}

export const MosaicLayout: Schema.Schema<MosaicLayout> = Schema.suspend(() =>
  Schema.Struct({
    columns: Schema.optional(Schema.Number),
    tiles: Schema.optional(Schema.Array(Tile)),
  }),
).annotate({
  identifier: "MosaicLayout",
}) as any as Schema.Schema<MosaicLayout>;

export interface Row {
  /** The relative weight of this row. The row weight is used to adjust the height of rows on the screen (relative to peers). Greater the weight, greater the height of the row on the screen. If omitted, a value of 1 is used while rendering. */
  weight?: string;
  /** The display widgets arranged horizontally in this row. */
  widgets?: Array<Widget>;
}

export const Row: Schema.Schema<Row> = Schema.suspend(() =>
  Schema.Struct({
    weight: Schema.optional(Schema.String),
    widgets: Schema.optional(Schema.Array(Widget)),
  }),
).annotate({ identifier: "Row" }) as any as Schema.Schema<Row>;

export interface RowLayout {
  /** The rows of content to display. */
  rows?: Array<Row>;
}

export const RowLayout: Schema.Schema<RowLayout> = Schema.suspend(() =>
  Schema.Struct({
    rows: Schema.optional(Schema.Array(Row)),
  }),
).annotate({ identifier: "RowLayout" }) as any as Schema.Schema<RowLayout>;

export interface Column {
  /** The relative weight of this column. The column weight is used to adjust the width of columns on the screen (relative to peers). Greater the weight, greater the width of the column on the screen. If omitted, a value of 1 is used while rendering. */
  weight?: string;
  /** The display widgets arranged vertically in this column. */
  widgets?: Array<Widget>;
}

export const Column: Schema.Schema<Column> = Schema.suspend(() =>
  Schema.Struct({
    weight: Schema.optional(Schema.String),
    widgets: Schema.optional(Schema.Array(Widget)),
  }),
).annotate({ identifier: "Column" }) as any as Schema.Schema<Column>;

export interface ColumnLayout {
  /** The columns of content to display. */
  columns?: Array<Column>;
}

export const ColumnLayout: Schema.Schema<ColumnLayout> = Schema.suspend(() =>
  Schema.Struct({
    columns: Schema.optional(Schema.Array(Column)),
  }),
).annotate({
  identifier: "ColumnLayout",
}) as any as Schema.Schema<ColumnLayout>;

export interface StringArray {
  /** The values of the array */
  values?: Array<string>;
}

export const StringArray: Schema.Schema<StringArray> = Schema.suspend(() =>
  Schema.Struct({
    values: Schema.optional(Schema.Array(Schema.String)),
  }),
).annotate({ identifier: "StringArray" }) as any as Schema.Schema<StringArray>;

export interface DashboardFilter {
  /** Optional. The key for the label. This must be omitted if the filter_type is VALUE_ONLY but is required otherwise. */
  labelKey?: string;
  /** The placeholder text that can be referenced in a filter string or MQL query. If omitted, the dashboard filter will be applied to all relevant widgets in the dashboard. */
  templateVariable?: string;
  /** The type of the filter value. If value_type is not provided, it will be inferred from the default_value. If neither value_type nor default_value is provided, value_type will be set to STRING by default. */
  valueType?:
    | "VALUE_TYPE_UNSPECIFIED"
    | "STRING"
    | "STRING_ARRAY"
    | (string & {});
  /** A variable-length string value. If this field is set, value_type must be set to STRING or VALUE_TYPE_UNSPECIFIED */
  stringValue?: string;
  /** An array of variable-length string values. If this field is set, value_type must be set to STRING_ARRAY or VALUE_TYPE_UNSPECIFIED */
  stringArrayValue?: StringArray;
  /** The specified filter type */
  filterType?:
    | "FILTER_TYPE_UNSPECIFIED"
    | "RESOURCE_LABEL"
    | "METRIC_LABEL"
    | "USER_METADATA_LABEL"
    | "SYSTEM_METADATA_LABEL"
    | "GROUP"
    | "VALUE_ONLY"
    | (string & {});
  /** A query to run to fetch possible values for the filter. Only OpsAnalyticsQueries are supported */
  timeSeriesQuery?: TimeSeriesQuery;
  /** A list of possible string values for the filter */
  stringArray?: StringArray;
}

export const DashboardFilter: Schema.Schema<DashboardFilter> = Schema.suspend(
  () =>
    Schema.Struct({
      labelKey: Schema.optional(Schema.String),
      templateVariable: Schema.optional(Schema.String),
      valueType: Schema.optional(Schema.String),
      stringValue: Schema.optional(Schema.String),
      stringArrayValue: Schema.optional(StringArray),
      filterType: Schema.optional(Schema.String),
      timeSeriesQuery: Schema.optional(TimeSeriesQuery),
      stringArray: Schema.optional(StringArray),
    }),
).annotate({
  identifier: "DashboardFilter",
}) as any as Schema.Schema<DashboardFilter>;

export interface EventAnnotation {
  /** Solely for UI display. Should not be used programmatically. */
  displayName?: string;
  /** The type of event to display. */
  eventType?:
    | "EVENT_TYPE_UNSPECIFIED"
    | "GKE_WORKLOAD_DEPLOYMENT"
    | "GKE_POD_CRASH"
    | "GKE_POD_UNSCHEDULABLE"
    | "GKE_CONTAINER_CREATION_FAILED"
    | "GKE_CLUSTER_CREATE_DELETE"
    | "GKE_CLUSTER_UPDATE"
    | "GKE_NODE_POOL_UPDATE"
    | "GKE_CLUSTER_AUTOSCALER"
    | "GKE_POD_AUTOSCALER"
    | "VM_TERMINATION"
    | "VM_GUEST_OS_ERROR"
    | "VM_START_FAILED"
    | "MIG_UPDATE"
    | "MIG_AUTOSCALER"
    | "CLOUD_RUN_DEPLOYMENT"
    | "CLOUD_SQL_FAILOVER"
    | "CLOUD_SQL_START_STOP"
    | "CLOUD_SQL_STORAGE"
    | "UPTIME_CHECK_FAILURE"
    | "CLOUD_ALERTING_ALERT"
    | "SERVICE_HEALTH_INCIDENT"
    | "SAP_BACKINT"
    | "SAP_AVAILABILITY"
    | "SAP_OPERATIONS"
    | (string & {});
  /** string filtering the events - event dependant. Example values: "resource.labels.pod_name = 'pod-1'" "protoPayload.authenticationInfo.principalEmail='user@example.com'" */
  filter?: string;
  /** Whether or not to show the events on the dashboard by default */
  enabled?: boolean;
  /** Per annotation level override for the names of logging resources to search for events. Currently only projects are supported. If both this field and the per annotation field is empty, it will default to the host project. Limit: 50 projects. For example: “projects/another-project-id” */
  resourceNames?: Array<string>;
}

export const EventAnnotation: Schema.Schema<EventAnnotation> = Schema.suspend(
  () =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      eventType: Schema.optional(Schema.String),
      filter: Schema.optional(Schema.String),
      enabled: Schema.optional(Schema.Boolean),
      resourceNames: Schema.optional(Schema.Array(Schema.String)),
    }),
).annotate({
  identifier: "EventAnnotation",
}) as any as Schema.Schema<EventAnnotation>;

export interface DashboardAnnotations {
  /** Dashboard level defaults for names of logging resources to search for events. Currently only projects are supported. Each individual EventAnnotation may have its own overrides. If both this field and the per annotation field is empty, then the scoping project is used. Limit: 50 projects. For example: “projects/some-project-id” */
  defaultResourceNames?: Array<string>;
  /** List of annotation configurations for this dashboard. Each entry specifies one event type. */
  eventAnnotations?: Array<EventAnnotation>;
}

export const DashboardAnnotations: Schema.Schema<DashboardAnnotations> =
  Schema.suspend(() =>
    Schema.Struct({
      defaultResourceNames: Schema.optional(Schema.Array(Schema.String)),
      eventAnnotations: Schema.optional(Schema.Array(EventAnnotation)),
    }),
  ).annotate({
    identifier: "DashboardAnnotations",
  }) as any as Schema.Schema<DashboardAnnotations>;

export interface Dashboard {
  /** Identifier. The resource name of the dashboard. */
  name?: string;
  /** Required. The mutable, human-readable name. */
  displayName?: string;
  /** etag is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. An etag is returned in the response to GetDashboard, and users are expected to put that etag in the request to UpdateDashboard to ensure that their change will be applied to the same version of the Dashboard configuration. The field should not be passed during dashboard creation. */
  etag?: string;
  /** Content is arranged with a basic layout that re-flows a simple list of informational elements like widgets or tiles. */
  gridLayout?: GridLayout;
  /** The content is arranged as a grid of tiles, with each content widget occupying one or more grid blocks. */
  mosaicLayout?: MosaicLayout;
  /** The content is divided into equally spaced rows and the widgets are arranged horizontally. */
  rowLayout?: RowLayout;
  /** The content is divided into equally spaced columns and the widgets are arranged vertically. */
  columnLayout?: ColumnLayout;
  /** Filters to reduce the amount of data charted based on the filter criteria. */
  dashboardFilters?: Array<DashboardFilter>;
  /** Labels applied to the dashboard */
  labels?: Record<string, string>;
  /** Configuration for event annotations to display on this dashboard. */
  annotations?: DashboardAnnotations;
}

export const Dashboard: Schema.Schema<Dashboard> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    displayName: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
    gridLayout: Schema.optional(GridLayout),
    mosaicLayout: Schema.optional(MosaicLayout),
    rowLayout: Schema.optional(RowLayout),
    columnLayout: Schema.optional(ColumnLayout),
    dashboardFilters: Schema.optional(Schema.Array(DashboardFilter)),
    labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    annotations: Schema.optional(DashboardAnnotations),
  }),
).annotate({ identifier: "Dashboard" }) as any as Schema.Schema<Dashboard>;

export interface ListDashboardsResponse {
  /** The list of requested dashboards. */
  dashboards?: Array<Dashboard>;
  /** If there are more results than have been returned, then this field is set to a non-empty value. To see the additional results, use that value as page_token in the next call to this method. */
  nextPageToken?: string;
}

export const ListDashboardsResponse: Schema.Schema<ListDashboardsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      dashboards: Schema.optional(Schema.Array(Dashboard)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListDashboardsResponse",
  }) as any as Schema.Schema<ListDashboardsResponse>;

export interface MonitoredProject {
  /** Immutable. The resource name of the MonitoredProject. On input, the resource name includes the scoping project ID and monitored project ID. On output, it contains the equivalent project numbers. Example: locations/global/metricsScopes/{SCOPING_PROJECT_ID_OR_NUMBER}/projects/{MONITORED_PROJECT_ID_OR_NUMBER} */
  name?: string;
  /** Output only. The time when this MonitoredProject was created. */
  createTime?: string;
  /** Output only. Set if the project has been tombstoned by the user. */
  isTombstoned?: boolean;
}

export const MonitoredProject: Schema.Schema<MonitoredProject> = Schema.suspend(
  () =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      isTombstoned: Schema.optional(Schema.Boolean),
    }),
).annotate({
  identifier: "MonitoredProject",
}) as any as Schema.Schema<MonitoredProject>;

export interface MetricsScope {
  /** Immutable. The resource name of the Monitoring Metrics Scope. On input, the resource name can be specified with the scoping project ID or number. On output, the resource name is specified with the scoping project number. Example: locations/global/metricsScopes/{SCOPING_PROJECT_ID_OR_NUMBER} */
  name?: string;
  /** Output only. The time when this Metrics Scope was created. */
  createTime?: string;
  /** Output only. The time when this Metrics Scope record was last updated. */
  updateTime?: string;
  /** Output only. The list of projects monitored by this Metrics Scope. */
  monitoredProjects?: Array<MonitoredProject>;
}

export const MetricsScope: Schema.Schema<MetricsScope> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    createTime: Schema.optional(Schema.String),
    updateTime: Schema.optional(Schema.String),
    monitoredProjects: Schema.optional(Schema.Array(MonitoredProject)),
  }),
).annotate({
  identifier: "MetricsScope",
}) as any as Schema.Schema<MetricsScope>;

export interface ListMetricsScopesByMonitoredProjectResponse {
  /** A set of all metrics scopes that the specified monitored project has been added to. */
  metricsScopes?: Array<MetricsScope>;
}

export const ListMetricsScopesByMonitoredProjectResponse: Schema.Schema<ListMetricsScopesByMonitoredProjectResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      metricsScopes: Schema.optional(Schema.Array(MetricsScope)),
    }),
  ).annotate({
    identifier: "ListMetricsScopesByMonitoredProjectResponse",
  }) as any as Schema.Schema<ListMetricsScopesByMonitoredProjectResponse>;

export interface HttpBody {
  /** The HTTP Content-Type header value specifying the content type of the body. */
  contentType?: string;
  /** The HTTP request/response body as raw binary. */
  data?: string;
  /** Application specific response metadata. Must be set in the first response for streaming APIs. */
  extensions?: Array<Record<string, unknown>>;
}

export const HttpBody: Schema.Schema<HttpBody> = Schema.suspend(() =>
  Schema.Struct({
    contentType: Schema.optional(Schema.String),
    data: Schema.optional(Schema.String),
    extensions: Schema.optional(
      Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
    ),
  }),
).annotate({ identifier: "HttpBody" }) as any as Schema.Schema<HttpBody>;

export interface QueryInstantRequest {
  /** A PromQL query string. Query language documentation: https://prometheus.io/docs/prometheus/latest/querying/basics/. */
  query?: string;
  /** The single point in time to evaluate the query for. Either floating point UNIX seconds or RFC3339 formatted timestamp. */
  time?: string;
  /** An upper bound timeout for the query. Either a Prometheus duration string (https://prometheus.io/docs/prometheus/latest/querying/basics/#time-durations) or floating point seconds. This non-standard encoding must be used for compatibility with the open source API. Clients may still implement timeouts at the connection level while ignoring this field. */
  timeout?: string;
}

export const QueryInstantRequest: Schema.Schema<QueryInstantRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      query: Schema.optional(Schema.String),
      time: Schema.optional(Schema.String),
      timeout: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "QueryInstantRequest",
  }) as any as Schema.Schema<QueryInstantRequest>;

export interface QueryRangeRequest {
  /** A PromQL query string. Query language documentation: https://prometheus.io/docs/prometheus/latest/querying/basics/. */
  query?: string;
  /** The start time to evaluate the query for. Either floating point UNIX seconds or RFC3339 formatted timestamp. */
  start?: string;
  /** The end time to evaluate the query for. Either floating point UNIX seconds or RFC3339 formatted timestamp. */
  end?: string;
  /** The resolution of query result. Either a Prometheus duration string (https://prometheus.io/docs/prometheus/latest/querying/basics/#time-durations) or floating point seconds. This non-standard encoding must be used for compatibility with the open source API. Clients may still implement timeouts at the connection level while ignoring this field. */
  step?: string;
  /** An upper bound timeout for the query. Either a Prometheus duration string (https://prometheus.io/docs/prometheus/latest/querying/basics/#time-durations) or floating point seconds. This non-standard encoding must be used for compatibility with the open source API. Clients may still implement timeouts at the connection level while ignoring this field. */
  timeout?: string;
}

export const QueryRangeRequest: Schema.Schema<QueryRangeRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      query: Schema.optional(Schema.String),
      start: Schema.optional(Schema.String),
      end: Schema.optional(Schema.String),
      step: Schema.optional(Schema.String),
      timeout: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "QueryRangeRequest",
  }) as any as Schema.Schema<QueryRangeRequest>;

export interface QueryLabelsRequest {
  /** The start time to evaluate the query for. Either floating point UNIX seconds or RFC3339 formatted timestamp. */
  start?: string;
  /** The end time to evaluate the query for. Either floating point UNIX seconds or RFC3339 formatted timestamp. */
  end?: string;
  /** A list of matchers encoded in the Prometheus label matcher format to constrain the values to series that satisfy them. */
  match?: string;
}

export const QueryLabelsRequest: Schema.Schema<QueryLabelsRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      start: Schema.optional(Schema.String),
      end: Schema.optional(Schema.String),
      match: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "QueryLabelsRequest",
  }) as any as Schema.Schema<QueryLabelsRequest>;

export interface QuerySeriesRequest {
  /** The start time to evaluate the query for. Either floating point UNIX seconds or RFC3339 formatted timestamp. */
  start?: string;
  /** The end time to evaluate the query for. Either floating point UNIX seconds or RFC3339 formatted timestamp. */
  end?: string;
}

export const QuerySeriesRequest: Schema.Schema<QuerySeriesRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      start: Schema.optional(Schema.String),
      end: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "QuerySeriesRequest",
  }) as any as Schema.Schema<QuerySeriesRequest>;

export interface QueryExemplarsRequest {
  /** A PromQL query string. Query language documentation: https://prometheus.io/docs/prometheus/latest/querying/basics/. */
  query?: string;
  /** The start time to evaluate the query for. Either floating point UNIX seconds or RFC3339 formatted timestamp. */
  start?: string;
  /** The end time to evaluate the query for. Either floating point UNIX seconds or RFC3339 formatted timestamp. */
  end?: string;
}

export const QueryExemplarsRequest: Schema.Schema<QueryExemplarsRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      query: Schema.optional(Schema.String),
      start: Schema.optional(Schema.String),
      end: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "QueryExemplarsRequest",
  }) as any as Schema.Schema<QueryExemplarsRequest>;

export interface Option {
  /** The option's name. For protobuf built-in options (options defined in descriptor.proto), this is the short name. For example, "map_entry". For custom options, it should be the fully-qualified name. For example, "google.api.http". */
  name?: string;
  /** The option's value packed in an Any message. If the value is a primitive, the corresponding wrapper type defined in google/protobuf/wrappers.proto should be used. If the value is an enum, it should be stored as an int32 value using the google.protobuf.Int32Value type. */
  value?: Record<string, unknown>;
}

export const Option: Schema.Schema<Option> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    value: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  }),
).annotate({ identifier: "Option" }) as any as Schema.Schema<Option>;

export interface Field {
  /** The field type. */
  kind?:
    | "TYPE_UNKNOWN"
    | "TYPE_DOUBLE"
    | "TYPE_FLOAT"
    | "TYPE_INT64"
    | "TYPE_UINT64"
    | "TYPE_INT32"
    | "TYPE_FIXED64"
    | "TYPE_FIXED32"
    | "TYPE_BOOL"
    | "TYPE_STRING"
    | "TYPE_GROUP"
    | "TYPE_MESSAGE"
    | "TYPE_BYTES"
    | "TYPE_UINT32"
    | "TYPE_ENUM"
    | "TYPE_SFIXED32"
    | "TYPE_SFIXED64"
    | "TYPE_SINT32"
    | "TYPE_SINT64"
    | (string & {});
  /** The field cardinality. */
  cardinality?:
    | "CARDINALITY_UNKNOWN"
    | "CARDINALITY_OPTIONAL"
    | "CARDINALITY_REQUIRED"
    | "CARDINALITY_REPEATED"
    | (string & {});
  /** The field number. */
  number?: number;
  /** The field name. */
  name?: string;
  /** The field type URL, without the scheme, for message or enumeration types. Example: "type.googleapis.com/google.protobuf.Timestamp". */
  typeUrl?: string;
  /** The index of the field type in Type.oneofs, for message or enumeration types. The first type has index 1; zero means the type is not in the list. */
  oneofIndex?: number;
  /** Whether to use alternative packed wire representation. */
  packed?: boolean;
  /** The protocol buffer options. */
  options?: Array<Option>;
  /** The field JSON name. */
  jsonName?: string;
  /** The string value of the default value of this field. Proto2 syntax only. */
  defaultValue?: string;
}

export const Field: Schema.Schema<Field> = Schema.suspend(() =>
  Schema.Struct({
    kind: Schema.optional(Schema.String),
    cardinality: Schema.optional(Schema.String),
    number: Schema.optional(Schema.Number),
    name: Schema.optional(Schema.String),
    typeUrl: Schema.optional(Schema.String),
    oneofIndex: Schema.optional(Schema.Number),
    packed: Schema.optional(Schema.Boolean),
    options: Schema.optional(Schema.Array(Option)),
    jsonName: Schema.optional(Schema.String),
    defaultValue: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Field" }) as any as Schema.Schema<Field>;

export interface SourceContext {
  /** The path-qualified name of the .proto file that contained the associated protobuf element. For example: "google/protobuf/source_context.proto". */
  fileName?: string;
}

export const SourceContext: Schema.Schema<SourceContext> = Schema.suspend(() =>
  Schema.Struct({
    fileName: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "SourceContext",
}) as any as Schema.Schema<SourceContext>;

export interface Type {
  /** The fully qualified message name. */
  name?: string;
  /** The list of fields. */
  fields?: Array<Field>;
  /** The list of types appearing in oneof definitions in this type. */
  oneofs?: Array<string>;
  /** The protocol buffer options. */
  options?: Array<Option>;
  /** The source context. */
  sourceContext?: SourceContext;
  /** The source syntax. */
  syntax?:
    | "SYNTAX_PROTO2"
    | "SYNTAX_PROTO3"
    | "SYNTAX_EDITIONS"
    | (string & {});
  /** The source edition string, only valid when syntax is SYNTAX_EDITIONS. */
  edition?: string;
}

export const Type: Schema.Schema<Type> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    fields: Schema.optional(Schema.Array(Field)),
    oneofs: Schema.optional(Schema.Array(Schema.String)),
    options: Schema.optional(Schema.Array(Option)),
    sourceContext: Schema.optional(SourceContext),
    syntax: Schema.optional(Schema.String),
    edition: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Type" }) as any as Schema.Schema<Type>;

export interface DroppedLabels {
  /** Map from label to its value, for all labels dropped in any aggregation. */
  label?: Record<string, string>;
}

export const DroppedLabels: Schema.Schema<DroppedLabels> = Schema.suspend(() =>
  Schema.Struct({
    label: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  }),
).annotate({
  identifier: "DroppedLabels",
}) as any as Schema.Schema<DroppedLabels>;

export interface SpanContext {
  /** The resource name of the span. The format is: projects/[PROJECT_ID_OR_NUMBER]/traces/[TRACE_ID]/spans/[SPAN_ID] [TRACE_ID] is a unique identifier for a trace within a project; it is a 32-character hexadecimal encoding of a 16-byte array.[SPAN_ID] is a unique identifier for a span within a trace; it is a 16-character hexadecimal encoding of an 8-byte array. */
  spanName?: string;
}

export const SpanContext: Schema.Schema<SpanContext> = Schema.suspend(() =>
  Schema.Struct({
    spanName: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "SpanContext" }) as any as Schema.Schema<SpanContext>;

export interface OperationMetadata {
  /** Current state of the batch operation. */
  state?:
    | "STATE_UNSPECIFIED"
    | "CREATED"
    | "RUNNING"
    | "DONE"
    | "CANCELLED"
    | (string & {});
  /** The time when the batch request was received. */
  createTime?: string;
  /** The time when the operation result was last updated. */
  updateTime?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      state: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OperationMetadata",
  }) as any as Schema.Schema<OperationMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOperationsRequest>;

export type GetOperationsResponse = Operation;
export const GetOperationsResponse = Operation;

export type GetOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getOperations: API.OperationMethod<
  GetOperationsRequest,
  GetOperationsResponse,
  GetOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetOperationsRequest,
  output: GetOperationsResponse,
  errors: [],
}));

export interface CreateProjectsDashboardsRequest {
  /** Required. The project on which to execute the request. The format is: projects/[PROJECT_ID_OR_NUMBER] The [PROJECT_ID_OR_NUMBER] must match the dashboard resource name. */
  parent: string;
  /** If set, validate the request and preview the review, but do not actually save it. */
  validateOnly?: boolean;
  /** Request body */
  body?: Dashboard;
}

export const CreateProjectsDashboardsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("validateOnly"),
  ),
  body: Schema.optional(Dashboard).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/dashboards",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsDashboardsRequest>;

export type CreateProjectsDashboardsResponse = Dashboard;
export const CreateProjectsDashboardsResponse = Dashboard;

export type CreateProjectsDashboardsError = DefaultErrors;

/** Creates a new custom dashboard. For examples on how you can use this API to create dashboards, see Managing dashboards by API (https://cloud.google.com/monitoring/dashboards/api-dashboard). This method requires the monitoring.dashboards.create permission on the specified project. For more information about permissions, see Cloud Identity and Access Management (https://cloud.google.com/iam). */
export const createProjectsDashboards: API.OperationMethod<
  CreateProjectsDashboardsRequest,
  CreateProjectsDashboardsResponse,
  CreateProjectsDashboardsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsDashboardsRequest,
  output: CreateProjectsDashboardsResponse,
  errors: [],
}));

export interface ListProjectsDashboardsRequest {
  /** Required. The scope of the dashboards to list. The format is: projects/[PROJECT_ID_OR_NUMBER] */
  parent: string;
  /** A positive number that is the maximum number of results to return. If unspecified, a default of 1000 is used. */
  pageSize?: number;
  /** Optional. If this field is not empty then it must contain the nextPageToken value returned by a previous call to this method. Using this field causes the method to return additional results from the previous method call. */
  pageToken?: string;
}

export const ListProjectsDashboardsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/dashboards" }),
  svc,
) as unknown as Schema.Schema<ListProjectsDashboardsRequest>;

export type ListProjectsDashboardsResponse = ListDashboardsResponse;
export const ListProjectsDashboardsResponse = ListDashboardsResponse;

export type ListProjectsDashboardsError = DefaultErrors;

/** Lists the existing dashboards.This method requires the monitoring.dashboards.list permission on the specified project. For more information, see Cloud Identity and Access Management (https://cloud.google.com/iam). */
export const listProjectsDashboards: API.PaginatedOperationMethod<
  ListProjectsDashboardsRequest,
  ListProjectsDashboardsResponse,
  ListProjectsDashboardsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsDashboardsRequest,
  output: ListProjectsDashboardsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsDashboardsRequest {
  /** Required. The resource name of the Dashboard. The format is one of: dashboards/[DASHBOARD_ID] (for system dashboards) projects/[PROJECT_ID_OR_NUMBER]/dashboards/[DASHBOARD_ID] (for custom dashboards). */
  name: string;
}

export const GetProjectsDashboardsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/dashboards/{dashboardsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsDashboardsRequest>;

export type GetProjectsDashboardsResponse = Dashboard;
export const GetProjectsDashboardsResponse = Dashboard;

export type GetProjectsDashboardsError = DefaultErrors;

/** Fetches a specific dashboard.This method requires the monitoring.dashboards.get permission on the specified dashboard. For more information, see Cloud Identity and Access Management (https://cloud.google.com/iam). */
export const getProjectsDashboards: API.OperationMethod<
  GetProjectsDashboardsRequest,
  GetProjectsDashboardsResponse,
  GetProjectsDashboardsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsDashboardsRequest,
  output: GetProjectsDashboardsResponse,
  errors: [],
}));

export interface DeleteProjectsDashboardsRequest {
  /** Required. The resource name of the Dashboard. The format is: projects/[PROJECT_ID_OR_NUMBER]/dashboards/[DASHBOARD_ID] */
  name: string;
}

export const DeleteProjectsDashboardsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1/projects/{projectsId}/dashboards/{dashboardsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsDashboardsRequest>;

export type DeleteProjectsDashboardsResponse = Empty;
export const DeleteProjectsDashboardsResponse = Empty;

export type DeleteProjectsDashboardsError = DefaultErrors;

/** Deletes an existing custom dashboard.This method requires the monitoring.dashboards.delete permission on the specified dashboard. For more information, see Cloud Identity and Access Management (https://cloud.google.com/iam). */
export const deleteProjectsDashboards: API.OperationMethod<
  DeleteProjectsDashboardsRequest,
  DeleteProjectsDashboardsResponse,
  DeleteProjectsDashboardsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsDashboardsRequest,
  output: DeleteProjectsDashboardsResponse,
  errors: [],
}));

export interface PatchProjectsDashboardsRequest {
  /** Identifier. The resource name of the dashboard. */
  name: string;
  /** If set, validate the request and preview the review, but do not actually save it. */
  validateOnly?: boolean;
  /** Request body */
  body?: Dashboard;
}

export const PatchProjectsDashboardsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("validateOnly"),
  ),
  body: Schema.optional(Dashboard).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1/projects/{projectsId}/dashboards/{dashboardsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsDashboardsRequest>;

export type PatchProjectsDashboardsResponse = Dashboard;
export const PatchProjectsDashboardsResponse = Dashboard;

export type PatchProjectsDashboardsError = DefaultErrors;

/** Replaces an existing custom dashboard with a new definition.This method requires the monitoring.dashboards.update permission on the specified dashboard. For more information, see Cloud Identity and Access Management (https://cloud.google.com/iam). */
export const patchProjectsDashboards: API.OperationMethod<
  PatchProjectsDashboardsRequest,
  PatchProjectsDashboardsResponse,
  PatchProjectsDashboardsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsDashboardsRequest,
  output: PatchProjectsDashboardsResponse,
  errors: [],
}));

export interface QueryProjectsLocationPrometheusApiV1Request {
  /** Required. The project on which to execute the request. Data associcated with the project's workspace stored under the The format is: projects/PROJECT_ID_OR_NUMBER. Open source API but used as a request path prefix to distinguish different virtual Prometheus instances of Google Prometheus Engine. */
  name: string;
  /** Location of the resource information. Has to be "global" now. */
  location: string;
  /** Request body */
  body?: QueryInstantRequest;
}

export const QueryProjectsLocationPrometheusApiV1Request = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  location: Schema.String.pipe(T.HttpPath("location")),
  body: Schema.optional(QueryInstantRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/location/{location}/prometheus/api/v1/query",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<QueryProjectsLocationPrometheusApiV1Request>;

export type QueryProjectsLocationPrometheusApiV1Response = HttpBody;
export const QueryProjectsLocationPrometheusApiV1Response = HttpBody;

export type QueryProjectsLocationPrometheusApiV1Error = DefaultErrors;

/** Evaluate a PromQL query at a single point in time. */
export const queryProjectsLocationPrometheusApiV1: API.OperationMethod<
  QueryProjectsLocationPrometheusApiV1Request,
  QueryProjectsLocationPrometheusApiV1Response,
  QueryProjectsLocationPrometheusApiV1Error,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: QueryProjectsLocationPrometheusApiV1Request,
  output: QueryProjectsLocationPrometheusApiV1Response,
  errors: [],
}));

export interface Query_rangeProjectsLocationPrometheusApiV1Request {
  /** Required. The project on which to execute the request. Data associcated with the project's workspace stored under the The format is: projects/PROJECT_ID_OR_NUMBER. Open source API but used as a request path prefix to distinguish different virtual Prometheus instances of Google Prometheus Engine. */
  name: string;
  /** Location of the resource information. Has to be "global" now. */
  location: string;
  /** Request body */
  body?: QueryRangeRequest;
}

export const Query_rangeProjectsLocationPrometheusApiV1Request = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  location: Schema.String.pipe(T.HttpPath("location")),
  body: Schema.optional(QueryRangeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/location/{location}/prometheus/api/v1/query_range",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<Query_rangeProjectsLocationPrometheusApiV1Request>;

export type Query_rangeProjectsLocationPrometheusApiV1Response = HttpBody;
export const Query_rangeProjectsLocationPrometheusApiV1Response = HttpBody;

export type Query_rangeProjectsLocationPrometheusApiV1Error = DefaultErrors;

/** Evaluate a PromQL query with start, end time range. */
export const query_rangeProjectsLocationPrometheusApiV1: API.OperationMethod<
  Query_rangeProjectsLocationPrometheusApiV1Request,
  Query_rangeProjectsLocationPrometheusApiV1Response,
  Query_rangeProjectsLocationPrometheusApiV1Error,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: Query_rangeProjectsLocationPrometheusApiV1Request,
  output: Query_rangeProjectsLocationPrometheusApiV1Response,
  errors: [],
}));

export interface LabelsProjectsLocationPrometheusApiV1Request {
  /** Required. The workspace on which to execute the request. It is not part of the open source API but used as a request path prefix to distinguish different virtual Prometheus instances of Google Prometheus Engine. The format is: projects/PROJECT_ID_OR_NUMBER. */
  name: string;
  /** Location of the resource information. Has to be "global" now. */
  location: string;
  /** Request body */
  body?: QueryLabelsRequest;
}

export const LabelsProjectsLocationPrometheusApiV1Request = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  location: Schema.String.pipe(T.HttpPath("location")),
  body: Schema.optional(QueryLabelsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/location/{location}/prometheus/api/v1/labels",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<LabelsProjectsLocationPrometheusApiV1Request>;

export type LabelsProjectsLocationPrometheusApiV1Response = HttpBody;
export const LabelsProjectsLocationPrometheusApiV1Response = HttpBody;

export type LabelsProjectsLocationPrometheusApiV1Error = DefaultErrors;

/** Lists labels for metrics. */
export const labelsProjectsLocationPrometheusApiV1: API.OperationMethod<
  LabelsProjectsLocationPrometheusApiV1Request,
  LabelsProjectsLocationPrometheusApiV1Response,
  LabelsProjectsLocationPrometheusApiV1Error,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: LabelsProjectsLocationPrometheusApiV1Request,
  output: LabelsProjectsLocationPrometheusApiV1Response,
  errors: [],
}));

export interface SeriesProjectsLocationPrometheusApiV1Request {
  /** Required. The workspace on which to execute the request. It is not part of the open source API but used as a request path prefix to distinguish different virtual Prometheus instances of Google Prometheus Engine. The format is: projects/PROJECT_ID_OR_NUMBER. */
  name: string;
  /** Location of the resource information. Has to be "global" for now. */
  location: string;
  /** Request body */
  body?: QuerySeriesRequest;
}

export const SeriesProjectsLocationPrometheusApiV1Request = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  location: Schema.String.pipe(T.HttpPath("location")),
  body: Schema.optional(QuerySeriesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/location/{location}/prometheus/api/v1/series",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<SeriesProjectsLocationPrometheusApiV1Request>;

export type SeriesProjectsLocationPrometheusApiV1Response = HttpBody;
export const SeriesProjectsLocationPrometheusApiV1Response = HttpBody;

export type SeriesProjectsLocationPrometheusApiV1Error = DefaultErrors;

/** Lists metadata for metrics. */
export const seriesProjectsLocationPrometheusApiV1: API.OperationMethod<
  SeriesProjectsLocationPrometheusApiV1Request,
  SeriesProjectsLocationPrometheusApiV1Response,
  SeriesProjectsLocationPrometheusApiV1Error,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SeriesProjectsLocationPrometheusApiV1Request,
  output: SeriesProjectsLocationPrometheusApiV1Response,
  errors: [],
}));

export interface Query_exemplarsProjectsLocationPrometheusApiV1Request {
  /** Required. The project on which to execute the request. Data associcated with the project's workspace stored under the The format is: projects/PROJECT_ID_OR_NUMBER. Open source API but used as a request path prefix to distinguish different virtual Prometheus instances of Google Prometheus Engine. */
  name: string;
  /** Location of the resource information. Has to be "global" now. */
  location: string;
  /** Request body */
  body?: QueryExemplarsRequest;
}

export const Query_exemplarsProjectsLocationPrometheusApiV1Request =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    location: Schema.String.pipe(T.HttpPath("location")),
    body: Schema.optional(QueryExemplarsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/location/{location}/prometheus/api/v1/query_exemplars",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<Query_exemplarsProjectsLocationPrometheusApiV1Request>;

export type Query_exemplarsProjectsLocationPrometheusApiV1Response = HttpBody;
export const Query_exemplarsProjectsLocationPrometheusApiV1Response = HttpBody;

export type Query_exemplarsProjectsLocationPrometheusApiV1Error = DefaultErrors;

/** Lists exemplars relevant to a given PromQL query, */
export const query_exemplarsProjectsLocationPrometheusApiV1: API.OperationMethod<
  Query_exemplarsProjectsLocationPrometheusApiV1Request,
  Query_exemplarsProjectsLocationPrometheusApiV1Response,
  Query_exemplarsProjectsLocationPrometheusApiV1Error,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: Query_exemplarsProjectsLocationPrometheusApiV1Request,
  output: Query_exemplarsProjectsLocationPrometheusApiV1Response,
  errors: [],
}));

export interface ValuesProjectsLocationPrometheusApiV1LabelRequest {
  /** Required. The workspace on which to execute the request. It is not part of the open source API but used as a request path prefix to distinguish different virtual Prometheus instances of Google Prometheus Engine. The format is: projects/PROJECT_ID_OR_NUMBER. */
  name: string;
  /** Location of the resource information. Has to be "global" now. */
  location: string;
  /** The label name for which values are queried. */
  label: string;
  /** The start time to evaluate the query for. Either floating point UNIX seconds or RFC3339 formatted timestamp. */
  start?: string;
  /** The end time to evaluate the query for. Either floating point UNIX seconds or RFC3339 formatted timestamp. */
  end?: string;
  /** A list of matchers encoded in the Prometheus label matcher format to constrain the values to series that satisfy them. */
  match?: string;
}

export const ValuesProjectsLocationPrometheusApiV1LabelRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  location: Schema.String.pipe(T.HttpPath("location")),
  label: Schema.String.pipe(T.HttpPath("label")),
  start: Schema.optional(Schema.String).pipe(T.HttpQuery("start")),
  end: Schema.optional(Schema.String).pipe(T.HttpQuery("end")),
  match: Schema.optional(Schema.String).pipe(T.HttpQuery("match")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/location/{location}/prometheus/api/v1/label/{label}/values",
  }),
  svc,
) as unknown as Schema.Schema<ValuesProjectsLocationPrometheusApiV1LabelRequest>;

export type ValuesProjectsLocationPrometheusApiV1LabelResponse = HttpBody;
export const ValuesProjectsLocationPrometheusApiV1LabelResponse = HttpBody;

export type ValuesProjectsLocationPrometheusApiV1LabelError = DefaultErrors;

/** Lists possible values for a given label name. */
export const valuesProjectsLocationPrometheusApiV1Label: API.OperationMethod<
  ValuesProjectsLocationPrometheusApiV1LabelRequest,
  ValuesProjectsLocationPrometheusApiV1LabelResponse,
  ValuesProjectsLocationPrometheusApiV1LabelError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ValuesProjectsLocationPrometheusApiV1LabelRequest,
  output: ValuesProjectsLocationPrometheusApiV1LabelResponse,
  errors: [],
}));

export interface ListProjectsLocationPrometheusApiV1MetadataRequest {
  /** Required. The workspace on which to execute the request. It is not part of the open source API but used as a request path prefix to distinguish different virtual Prometheus instances of Google Prometheus Engine. The format is: projects/PROJECT_ID_OR_NUMBER. */
  name: string;
  /** Location of the resource information. Has to be "global" for now. */
  location: string;
  /** The metric name for which to query metadata. If unset, all metric metadata is returned. */
  metric?: string;
  /** Maximum number of metrics to return. */
  limit?: string;
}

export const ListProjectsLocationPrometheusApiV1MetadataRequest = Schema.Struct(
  {
    name: Schema.String.pipe(T.HttpPath("name")),
    location: Schema.String.pipe(T.HttpPath("location")),
    metric: Schema.optional(Schema.String).pipe(T.HttpQuery("metric")),
    limit: Schema.optional(Schema.String).pipe(T.HttpQuery("limit")),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/location/{location}/prometheus/api/v1/metadata",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationPrometheusApiV1MetadataRequest>;

export type ListProjectsLocationPrometheusApiV1MetadataResponse = HttpBody;
export const ListProjectsLocationPrometheusApiV1MetadataResponse = HttpBody;

export type ListProjectsLocationPrometheusApiV1MetadataError = DefaultErrors;

/** Lists metadata for metrics. */
export const listProjectsLocationPrometheusApiV1Metadata: API.OperationMethod<
  ListProjectsLocationPrometheusApiV1MetadataRequest,
  ListProjectsLocationPrometheusApiV1MetadataResponse,
  ListProjectsLocationPrometheusApiV1MetadataError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListProjectsLocationPrometheusApiV1MetadataRequest,
  output: ListProjectsLocationPrometheusApiV1MetadataResponse,
  errors: [],
}));

export interface GetLocationsGlobalMetricsScopesRequest {
  /** Required. The resource name of the Metrics Scope. Example: locations/global/metricsScopes/{SCOPING_PROJECT_ID_OR_NUMBER} */
  name: string;
}

export const GetLocationsGlobalMetricsScopesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/locations/global/metricsScopes/{metricsScopesId}",
  }),
  svc,
) as unknown as Schema.Schema<GetLocationsGlobalMetricsScopesRequest>;

export type GetLocationsGlobalMetricsScopesResponse = MetricsScope;
export const GetLocationsGlobalMetricsScopesResponse = MetricsScope;

export type GetLocationsGlobalMetricsScopesError = DefaultErrors;

/** Returns a specific Metrics Scope, including the list of projects monitored by the specified Metrics Scope. */
export const getLocationsGlobalMetricsScopes: API.OperationMethod<
  GetLocationsGlobalMetricsScopesRequest,
  GetLocationsGlobalMetricsScopesResponse,
  GetLocationsGlobalMetricsScopesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetLocationsGlobalMetricsScopesRequest,
  output: GetLocationsGlobalMetricsScopesResponse,
  errors: [],
}));

export interface ListMetricsScopesByMonitoredProjectLocationsGlobalMetricsScopesRequest {
  /** Required. The resource name of the Monitored Project being requested. Example: projects/{MONITORED_PROJECT_ID_OR_NUMBER} */
  monitoredResourceContainer?: string;
}

export const ListMetricsScopesByMonitoredProjectLocationsGlobalMetricsScopesRequest =
  Schema.Struct({
    monitoredResourceContainer: Schema.optional(Schema.String).pipe(
      T.HttpQuery("monitoredResourceContainer"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/locations/global/metricsScopes:listMetricsScopesByMonitoredProject",
    }),
    svc,
  ) as unknown as Schema.Schema<ListMetricsScopesByMonitoredProjectLocationsGlobalMetricsScopesRequest>;

export type ListMetricsScopesByMonitoredProjectLocationsGlobalMetricsScopesResponse =
  ListMetricsScopesByMonitoredProjectResponse;
export const ListMetricsScopesByMonitoredProjectLocationsGlobalMetricsScopesResponse =
  ListMetricsScopesByMonitoredProjectResponse;

export type ListMetricsScopesByMonitoredProjectLocationsGlobalMetricsScopesError =
  DefaultErrors;

/** Returns a list of every Metrics Scope that a specific MonitoredProject has been added to. The metrics scope representing the specified monitored project will always be the first entry in the response. */
export const listMetricsScopesByMonitoredProjectLocationsGlobalMetricsScopes: API.OperationMethod<
  ListMetricsScopesByMonitoredProjectLocationsGlobalMetricsScopesRequest,
  ListMetricsScopesByMonitoredProjectLocationsGlobalMetricsScopesResponse,
  ListMetricsScopesByMonitoredProjectLocationsGlobalMetricsScopesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListMetricsScopesByMonitoredProjectLocationsGlobalMetricsScopesRequest,
  output:
    ListMetricsScopesByMonitoredProjectLocationsGlobalMetricsScopesResponse,
  errors: [],
}));

export interface CreateLocationsGlobalMetricsScopesProjectsRequest {
  /** Required. The resource name of the existing Metrics Scope that will monitor this project. Example: locations/global/metricsScopes/{SCOPING_PROJECT_ID_OR_NUMBER} */
  parent: string;
  /** Request body */
  body?: MonitoredProject;
}

export const CreateLocationsGlobalMetricsScopesProjectsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(MonitoredProject).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/locations/global/metricsScopes/{metricsScopesId}/projects",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateLocationsGlobalMetricsScopesProjectsRequest>;

export type CreateLocationsGlobalMetricsScopesProjectsResponse = Operation;
export const CreateLocationsGlobalMetricsScopesProjectsResponse = Operation;

export type CreateLocationsGlobalMetricsScopesProjectsError = DefaultErrors;

/** Adds a MonitoredProject with the given project ID to the specified Metrics Scope. */
export const createLocationsGlobalMetricsScopesProjects: API.OperationMethod<
  CreateLocationsGlobalMetricsScopesProjectsRequest,
  CreateLocationsGlobalMetricsScopesProjectsResponse,
  CreateLocationsGlobalMetricsScopesProjectsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateLocationsGlobalMetricsScopesProjectsRequest,
  output: CreateLocationsGlobalMetricsScopesProjectsResponse,
  errors: [],
}));

export interface DeleteLocationsGlobalMetricsScopesProjectsRequest {
  /** Required. The resource name of the MonitoredProject. Example: locations/global/metricsScopes/{SCOPING_PROJECT_ID_OR_NUMBER}/projects/{MONITORED_PROJECT_ID_OR_NUMBER}Authorization requires the following Google IAM (https://cloud.google.com/iam) permissions on both the Metrics Scope and on the MonitoredProject: monitoring.metricsScopes.link */
  name: string;
}

export const DeleteLocationsGlobalMetricsScopesProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1/locations/global/metricsScopes/{metricsScopesId}/projects/{projectsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteLocationsGlobalMetricsScopesProjectsRequest>;

export type DeleteLocationsGlobalMetricsScopesProjectsResponse = Operation;
export const DeleteLocationsGlobalMetricsScopesProjectsResponse = Operation;

export type DeleteLocationsGlobalMetricsScopesProjectsError = DefaultErrors;

/** Deletes a MonitoredProject from the specified Metrics Scope. */
export const deleteLocationsGlobalMetricsScopesProjects: API.OperationMethod<
  DeleteLocationsGlobalMetricsScopesProjectsRequest,
  DeleteLocationsGlobalMetricsScopesProjectsResponse,
  DeleteLocationsGlobalMetricsScopesProjectsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteLocationsGlobalMetricsScopesProjectsRequest,
  output: DeleteLocationsGlobalMetricsScopesProjectsResponse,
  errors: [],
}));
