// ==========================================================================
// Cloud Monitoring API (monitoring v3)
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
  name: "monitoring",
  version: "v3",
  rootUrl: "https://monitoring.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface LabelDescriptor {
  /** The key for this label. The key must meet the following criteria: Does not exceed 100 characters. Matches the following regular expression: [a-zA-Z][a-zA-Z0-9_]* The first character must be an upper- or lower-case letter. The remaining characters must be letters, digits, or underscores. */
  key?: string;
  /** The type of data that can be assigned to the label. */
  valueType?: "STRING" | "BOOL" | "INT64" | (string & {});
  /** A human-readable description for the label. */
  description?: string;
}

export const LabelDescriptor: Schema.Schema<LabelDescriptor> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  valueType: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "LabelDescriptor" }) as any as Schema.Schema<LabelDescriptor>;

export interface MonitoredResourceDescriptor {
  /** Optional. The resource name of the monitored resource descriptor: "projects/{project_id}/monitoredResourceDescriptors/{type}" where {type} is the value of the type field in this object and {project_id} is a project ID that provides API-specific context for accessing the type. APIs that do not use project information can use the resource name format "monitoredResourceDescriptors/{type}". */
  name?: string;
  /** Required. The monitored resource type. For example, the type "cloudsql_database" represents databases in Google Cloud SQL. For a list of types, see Monitored resource types (https://cloud.google.com/monitoring/api/resources) and Logging resource types (https://cloud.google.com/logging/docs/api/v2/resource-list). */
  type?: string;
  /** Optional. A concise name for the monitored resource type that might be displayed in user interfaces. It should be a Title Cased Noun Phrase, without any article or other determiners. For example, "Google Cloud SQL Database". */
  displayName?: string;
  /** Optional. A detailed description of the monitored resource type that might be used in documentation. */
  description?: string;
  /** Required. A set of labels used to describe instances of this monitored resource type. For example, an individual Google Cloud SQL database is identified by values for the labels "database_id" and "zone". */
  labels?: Array<LabelDescriptor>;
  /** Optional. The launch stage of the monitored resource definition. */
  launchStage?: "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED" | (string & {});
}

export const MonitoredResourceDescriptor: Schema.Schema<MonitoredResourceDescriptor> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Array(LabelDescriptor)),
  launchStage: Schema.optional(Schema.String),
})).annotate({ identifier: "MonitoredResourceDescriptor" }) as any as Schema.Schema<MonitoredResourceDescriptor>;

export interface ListMonitoredResourceDescriptorsResponse {
  /** The monitored resource descriptors that are available to this project and that match filter, if present. */
  resourceDescriptors?: Array<MonitoredResourceDescriptor>;
  /** If there are more results than have been returned, then this field is set to a non-empty value. To see the additional results, use that value as page_token in the next call to this method. */
  nextPageToken?: string;
}

export const ListMonitoredResourceDescriptorsResponse: Schema.Schema<ListMonitoredResourceDescriptorsResponse> = Schema.suspend(() => Schema.Struct({
  resourceDescriptors: Schema.optional(Schema.Array(MonitoredResourceDescriptor)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListMonitoredResourceDescriptorsResponse" }) as any as Schema.Schema<ListMonitoredResourceDescriptorsResponse>;

export interface MetricDescriptorMetadata {
  /** Deprecated. Must use the MetricDescriptor.launch_stage instead. */
  launchStage?: "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED" | (string & {});
  /** The sampling period of metric data points. For metrics which are written periodically, consecutive data points are stored at this time interval, excluding data loss due to errors. Metrics with a higher granularity have a smaller sampling period. */
  samplePeriod?: string;
  /** The delay of data points caused by ingestion. Data points older than this age are guaranteed to be ingested and available to be read, excluding data loss due to errors. */
  ingestDelay?: string;
  /** The scope of the timeseries data of the metric. */
  timeSeriesResourceHierarchyLevel?: Array<"TIME_SERIES_RESOURCE_HIERARCHY_LEVEL_UNSPECIFIED" | "PROJECT" | "ORGANIZATION" | "FOLDER" | (string & {})>;
}

export const MetricDescriptorMetadata: Schema.Schema<MetricDescriptorMetadata> = Schema.suspend(() => Schema.Struct({
  launchStage: Schema.optional(Schema.String),
  samplePeriod: Schema.optional(Schema.String),
  ingestDelay: Schema.optional(Schema.String),
  timeSeriesResourceHierarchyLevel: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "MetricDescriptorMetadata" }) as any as Schema.Schema<MetricDescriptorMetadata>;

export interface MetricDescriptor {
  /** The resource name of the metric descriptor. */
  name?: string;
  /** The metric type, including its DNS name prefix. The type is not URL-encoded. All user-defined metric types have the DNS name custom.googleapis.com or external.googleapis.com. Metric types should use a natural hierarchical grouping. For example: "custom.googleapis.com/invoice/paid/amount" "external.googleapis.com/prometheus/up" "appengine.googleapis.com/http/server/response_latencies" */
  type?: string;
  /** The set of labels that can be used to describe a specific instance of this metric type. For example, the appengine.googleapis.com/http/server/response_latencies metric type has a label for the HTTP response code, response_code, so you can look at latencies for successful responses or just for responses that failed. */
  labels?: Array<LabelDescriptor>;
  /** Whether the metric records instantaneous values, changes to a value, etc. Some combinations of metric_kind and value_type might not be supported. */
  metricKind?: "METRIC_KIND_UNSPECIFIED" | "GAUGE" | "DELTA" | "CUMULATIVE" | (string & {});
  /** Whether the measurement is an integer, a floating-point number, etc. Some combinations of metric_kind and value_type might not be supported. */
  valueType?: "VALUE_TYPE_UNSPECIFIED" | "BOOL" | "INT64" | "DOUBLE" | "STRING" | "DISTRIBUTION" | "MONEY" | (string & {});
  /** The units in which the metric value is reported. It is only applicable if the value_type is INT64, DOUBLE, or DISTRIBUTION. The unit defines the representation of the stored metric values.Different systems might scale the values to be more easily displayed (so a value of 0.02kBy might be displayed as 20By, and a value of 3523kBy might be displayed as 3.5MBy). However, if the unit is kBy, then the value of the metric is always in thousands of bytes, no matter how it might be displayed.If you want a custom metric to record the exact number of CPU-seconds used by a job, you can create an INT64 CUMULATIVE metric whose unit is s{CPU} (or equivalently 1s{CPU} or just s). If the job uses 12,005 CPU-seconds, then the value is written as 12005.Alternatively, if you want a custom metric to record data in a more granular way, you can create a DOUBLE CUMULATIVE metric whose unit is ks{CPU}, and then write the value 12.005 (which is 12005/1000), or use Kis{CPU} and write 11.723 (which is 12005/1024).The supported units are a subset of The Unified Code for Units of Measure (https://unitsofmeasure.org/ucum.html) standard:Basic units (UNIT) bit bit By byte s second min minute h hour d day 1 dimensionlessPrefixes (PREFIX) k kilo (10^3) M mega (10^6) G giga (10^9) T tera (10^12) P peta (10^15) E exa (10^18) Z zetta (10^21) Y yotta (10^24) m milli (10^-3) u micro (10^-6) n nano (10^-9) p pico (10^-12) f femto (10^-15) a atto (10^-18) z zepto (10^-21) y yocto (10^-24) Ki kibi (2^10) Mi mebi (2^20) Gi gibi (2^30) Ti tebi (2^40) Pi pebi (2^50)GrammarThe grammar also includes these connectors: / division or ratio (as an infix operator). For examples, kBy/{email} or MiBy/10ms (although you should almost never have /s in a metric unit; rates should always be computed at query time from the underlying cumulative or delta value). . multiplication or composition (as an infix operator). For examples, GBy.d or k{watt}.h.The grammar for a unit is as follows: Expression = Component { "." Component } { "/" Component } ; Component = ( [ PREFIX ] UNIT | "%" ) [ Annotation ] | Annotation | "1" ; Annotation = "{" NAME "}" ; Notes: Annotation is just a comment if it follows a UNIT. If the annotation is used alone, then the unit is equivalent to 1. For examples, {request}/s == 1/s, By{transmitted}/s == By/s. NAME is a sequence of non-blank printable ASCII characters not containing { or }. 1 represents a unitary dimensionless unit (https://en.wikipedia.org/wiki/Dimensionless_quantity) of 1, such as in 1/s. It is typically used when none of the basic units are appropriate. For example, "new users per day" can be represented as 1/d or {new-users}/d (and a metric value 5 would mean "5 new users). Alternatively, "thousands of page views per day" would be represented as 1000/d or k1/d or k{page_views}/d (and a metric value of 5.3 would mean "5300 page views per day"). % represents dimensionless value of 1/100, and annotates values giving a percentage (so the metric values are typically in the range of 0..100, and a metric value 3 means "3 percent"). 10^2.% indicates a metric contains a ratio, typically in the range 0..1, that will be multiplied by 100 and displayed as a percentage (so a metric value 0.03 means "3 percent"). */
  unit?: string;
  /** A detailed description of the metric, which can be used in documentation. */
  description?: string;
  /** A concise name for the metric, which can be displayed in user interfaces. Use sentence case without an ending period, for example "Request count". This field is optional but it is recommended to be set for any metrics associated with user-visible concepts, such as Quota. */
  displayName?: string;
  /** Optional. Metadata which can be used to guide usage of the metric. */
  metadata?: MetricDescriptorMetadata;
  /** Optional. The launch stage of the metric definition. */
  launchStage?: "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED" | (string & {});
  /** Read-only. If present, then a time series, which is identified partially by a metric type and a MonitoredResourceDescriptor, that is associated with this metric type can only be associated with one of the monitored resource types listed here. */
  monitoredResourceTypes?: Array<string>;
}

export const MetricDescriptor: Schema.Schema<MetricDescriptor> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Array(LabelDescriptor)),
  metricKind: Schema.optional(Schema.String),
  valueType: Schema.optional(Schema.String),
  unit: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  metadata: Schema.optional(MetricDescriptorMetadata),
  launchStage: Schema.optional(Schema.String),
  monitoredResourceTypes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "MetricDescriptor" }) as any as Schema.Schema<MetricDescriptor>;

export interface ListMetricDescriptorsResponse {
  /** The metric descriptors that are available to the project and that match the value of filter, if present. */
  metricDescriptors?: Array<MetricDescriptor>;
  /** If there are more results than have been returned, then this field is set to a non-empty value. To see the additional results, use that value as page_token in the next call to this method. */
  nextPageToken?: string;
}

export const ListMetricDescriptorsResponse: Schema.Schema<ListMetricDescriptorsResponse> = Schema.suspend(() => Schema.Struct({
  metricDescriptors: Schema.optional(Schema.Array(MetricDescriptor)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListMetricDescriptorsResponse" }) as any as Schema.Schema<ListMetricDescriptorsResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface Metric {
  /** An existing metric type, see google.api.MetricDescriptor. For example, custom.googleapis.com/invoice/paid/amount. */
  type?: string;
  /** The set of label values that uniquely identify this metric. All labels listed in the MetricDescriptor must be assigned values. */
  labels?: Record<string, string>;
}

export const Metric: Schema.Schema<Metric> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "Metric" }) as any as Schema.Schema<Metric>;

export interface MonitoredResource {
  /** Required. The monitored resource type. This field must match the type field of a MonitoredResourceDescriptor object. For example, the type of a Compute Engine VM instance is gce_instance. For a list of types, see Monitoring resource types (https://cloud.google.com/monitoring/api/resources) and Logging resource types (https://cloud.google.com/logging/docs/api/v2/resource-list). */
  type?: string;
  /** Required. Values for all of the labels listed in the associated monitored resource descriptor. For example, Compute Engine VM instances use the labels "project_id", "instance_id", and "zone". */
  labels?: Record<string, string>;
}

export const MonitoredResource: Schema.Schema<MonitoredResource> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "MonitoredResource" }) as any as Schema.Schema<MonitoredResource>;

export interface MonitoredResourceMetadata {
  /** Output only. Values for predefined system metadata labels. System labels are a kind of metadata extracted by Google, including "machine_image", "vpc", "subnet_id", "security_group", "name", etc. System label values can be only strings, Boolean values, or a list of strings. For example: { "name": "my-test-instance", "security_group": ["a", "b", "c"], "spot_instance": false } */
  systemLabels?: Record<string, unknown>;
  /** Output only. A map of user-defined metadata labels. */
  userLabels?: Record<string, string>;
}

export const MonitoredResourceMetadata: Schema.Schema<MonitoredResourceMetadata> = Schema.suspend(() => Schema.Struct({
  systemLabels: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  userLabels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "MonitoredResourceMetadata" }) as any as Schema.Schema<MonitoredResourceMetadata>;

export interface TimeInterval {
  /** Required. The end of the time interval. */
  endTime?: string;
  /** Optional. The beginning of the time interval. The default value for the start time is the end time. The start time must not be later than the end time. */
  startTime?: string;
}

export const TimeInterval: Schema.Schema<TimeInterval> = Schema.suspend(() => Schema.Struct({
  endTime: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
})).annotate({ identifier: "TimeInterval" }) as any as Schema.Schema<TimeInterval>;

export interface Range {
  /** The minimum of the population values. */
  min?: number;
  /** The maximum of the population values. */
  max?: number;
}

export const Range: Schema.Schema<Range> = Schema.suspend(() => Schema.Struct({
  min: Schema.optional(Schema.Number),
  max: Schema.optional(Schema.Number),
})).annotate({ identifier: "Range" }) as any as Schema.Schema<Range>;

export interface Linear {
  /** Must be greater than 0. */
  numFiniteBuckets?: number;
  /** Must be greater than 0. */
  width?: number;
  /** Lower bound of the first bucket. */
  offset?: number;
}

export const Linear: Schema.Schema<Linear> = Schema.suspend(() => Schema.Struct({
  numFiniteBuckets: Schema.optional(Schema.Number),
  width: Schema.optional(Schema.Number),
  offset: Schema.optional(Schema.Number),
})).annotate({ identifier: "Linear" }) as any as Schema.Schema<Linear>;

export interface Exponential {
  /** Must be greater than 0. */
  numFiniteBuckets?: number;
  /** Must be greater than 1. */
  growthFactor?: number;
  /** Must be greater than 0. */
  scale?: number;
}

export const Exponential: Schema.Schema<Exponential> = Schema.suspend(() => Schema.Struct({
  numFiniteBuckets: Schema.optional(Schema.Number),
  growthFactor: Schema.optional(Schema.Number),
  scale: Schema.optional(Schema.Number),
})).annotate({ identifier: "Exponential" }) as any as Schema.Schema<Exponential>;

export interface Explicit {
  /** The values must be monotonically increasing. */
  bounds?: Array<number>;
}

export const Explicit: Schema.Schema<Explicit> = Schema.suspend(() => Schema.Struct({
  bounds: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "Explicit" }) as any as Schema.Schema<Explicit>;

export interface BucketOptions {
  /** The linear bucket. */
  linearBuckets?: Linear;
  /** The exponential buckets. */
  exponentialBuckets?: Exponential;
  /** The explicit buckets. */
  explicitBuckets?: Explicit;
}

export const BucketOptions: Schema.Schema<BucketOptions> = Schema.suspend(() => Schema.Struct({
  linearBuckets: Schema.optional(Linear),
  exponentialBuckets: Schema.optional(Exponential),
  explicitBuckets: Schema.optional(Explicit),
})).annotate({ identifier: "BucketOptions" }) as any as Schema.Schema<BucketOptions>;

export interface Exemplar {
  /** Value of the exemplar point. This value determines to which bucket the exemplar belongs. */
  value?: number;
  /** The observation (sampling) time of the above value. */
  timestamp?: string;
  /** Contextual information about the example value. Examples are:Trace: type.googleapis.com/google.monitoring.v3.SpanContextLiteral string: type.googleapis.com/google.protobuf.StringValueLabels dropped during aggregation: type.googleapis.com/google.monitoring.v3.DroppedLabelsThere may be only a single attachment of any given message type in a single exemplar, and this is enforced by the system. */
  attachments?: Array<Record<string, unknown>>;
}

export const Exemplar: Schema.Schema<Exemplar> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.Number),
  timestamp: Schema.optional(Schema.String),
  attachments: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "Exemplar" }) as any as Schema.Schema<Exemplar>;

export interface Distribution {
  /** The number of values in the population. Must be non-negative. This value must equal the sum of the values in bucket_counts if a histogram is provided. */
  count?: string;
  /** The arithmetic mean of the values in the population. If count is zero then this field must be zero. */
  mean?: number;
  /** The sum of squared deviations from the mean of the values in the population. For values x_i this is: Sum[i=1..n]((x_i - mean)^2) Knuth, "The Art of Computer Programming", Vol. 2, page 232, 3rd edition describes Welford's method for accumulating this sum in one pass.If count is zero then this field must be zero. */
  sumOfSquaredDeviation?: number;
  /** If specified, contains the range of the population values. The field must not be present if the count is zero. This field is presently ignored by the Cloud Monitoring API v3. */
  range?: Range;
  /** Required in the Cloud Monitoring API v3. Defines the histogram bucket boundaries. */
  bucketOptions?: BucketOptions;
  /** Required in the Cloud Monitoring API v3. The values for each bucket specified in bucket_options. The sum of the values in bucketCounts must equal the value in the count field of the Distribution object. The order of the bucket counts follows the numbering schemes described for the three bucket types. The underflow bucket has number 0; the finite buckets, if any, have numbers 1 through N-2; and the overflow bucket has number N-1. The size of bucket_counts must not be greater than N. If the size is less than N, then the remaining buckets are assigned values of zero. */
  bucketCounts?: Array<string>;
  /** Must be in increasing order of value field. */
  exemplars?: Array<Exemplar>;
}

export const Distribution: Schema.Schema<Distribution> = Schema.suspend(() => Schema.Struct({
  count: Schema.optional(Schema.String),
  mean: Schema.optional(Schema.Number),
  sumOfSquaredDeviation: Schema.optional(Schema.Number),
  range: Schema.optional(Range),
  bucketOptions: Schema.optional(BucketOptions),
  bucketCounts: Schema.optional(Schema.Array(Schema.String)),
  exemplars: Schema.optional(Schema.Array(Exemplar)),
})).annotate({ identifier: "Distribution" }) as any as Schema.Schema<Distribution>;

export interface TypedValue {
  /** A Boolean value: true or false. */
  boolValue?: boolean;
  /** A 64-bit integer. Its range is approximately ±9.2x1018. */
  int64Value?: string;
  /** A 64-bit double-precision floating-point number. Its magnitude is approximately ±10±300 and it has 16 significant digits of precision. */
  doubleValue?: number;
  /** A variable-length string value. */
  stringValue?: string;
  /** A distribution value. */
  distributionValue?: Distribution;
}

export const TypedValue: Schema.Schema<TypedValue> = Schema.suspend(() => Schema.Struct({
  boolValue: Schema.optional(Schema.Boolean),
  int64Value: Schema.optional(Schema.String),
  doubleValue: Schema.optional(Schema.Number),
  stringValue: Schema.optional(Schema.String),
  distributionValue: Schema.optional(Distribution),
})).annotate({ identifier: "TypedValue" }) as any as Schema.Schema<TypedValue>;

export interface Point {
  /** The time interval to which the data point applies. For GAUGE metrics, the start time is optional, but if it is supplied, it must equal the end time. For DELTA metrics, the start and end time should specify a non-zero interval, with subsequent points specifying contiguous and non-overlapping intervals. For CUMULATIVE metrics, the start and end time should specify a non-zero interval, with subsequent points specifying the same start time and increasing end times, until an event resets the cumulative value to zero and sets a new start time for the following points. */
  interval?: TimeInterval;
  /** The value of the data point. */
  value?: TypedValue;
}

export const Point: Schema.Schema<Point> = Schema.suspend(() => Schema.Struct({
  interval: Schema.optional(TimeInterval),
  value: Schema.optional(TypedValue),
})).annotate({ identifier: "Point" }) as any as Schema.Schema<Point>;

export interface TimeSeries {
  /** The associated metric. A fully-specified metric used to identify the time series. */
  metric?: Metric;
  /** The associated monitored resource. Custom metrics can use only certain monitored resource types in their time series data. For more information, see Monitored resources for custom metrics (https://cloud.google.com/monitoring/custom-metrics/creating-metrics#custom-metric-resources). */
  resource?: MonitoredResource;
  /** Output only. The associated monitored resource metadata. When reading a time series, this field will include metadata labels that are explicitly named in the reduction. When creating a time series, this field is ignored. */
  metadata?: MonitoredResourceMetadata;
  /** The metric kind of the time series. When listing time series, this metric kind might be different from the metric kind of the associated metric if this time series is an alignment or reduction of other time series.When creating a time series, this field is optional. If present, it must be the same as the metric kind of the associated metric. If the associated metric's descriptor must be auto-created, then this field specifies the metric kind of the new descriptor and must be either GAUGE (the default) or CUMULATIVE. */
  metricKind?: "METRIC_KIND_UNSPECIFIED" | "GAUGE" | "DELTA" | "CUMULATIVE" | (string & {});
  /** The value type of the time series. When listing time series, this value type might be different from the value type of the associated metric if this time series is an alignment or reduction of other time series.When creating a time series, this field is optional. If present, it must be the same as the type of the data in the points field. */
  valueType?: "VALUE_TYPE_UNSPECIFIED" | "BOOL" | "INT64" | "DOUBLE" | "STRING" | "DISTRIBUTION" | "MONEY" | (string & {});
  /** The data points of this time series. When listing time series, points are returned in reverse time order.When creating a time series, this field must contain exactly one point and the point's type must be the same as the value type of the associated metric. If the associated metric's descriptor must be auto-created, then the value type of the descriptor is determined by the point's type, which must be BOOL, INT64, DOUBLE, or DISTRIBUTION. */
  points?: Array<Point>;
  /** The units in which the metric value is reported. It is only applicable if the value_type is INT64, DOUBLE, or DISTRIBUTION. The unit defines the representation of the stored metric values. This field can only be changed through CreateTimeSeries when it is empty. */
  unit?: string;
  /** Input only. A detailed description of the time series that will be associated with the google.api.MetricDescriptor for the metric. Once set, this field cannot be changed through CreateTimeSeries. */
  description?: string;
}

export const TimeSeries: Schema.Schema<TimeSeries> = Schema.suspend(() => Schema.Struct({
  metric: Schema.optional(Metric),
  resource: Schema.optional(MonitoredResource),
  metadata: Schema.optional(MonitoredResourceMetadata),
  metricKind: Schema.optional(Schema.String),
  valueType: Schema.optional(Schema.String),
  points: Schema.optional(Schema.Array(Point)),
  unit: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "TimeSeries" }) as any as Schema.Schema<TimeSeries>;

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

export interface ListTimeSeriesResponse {
  /** One or more time series that match the filter included in the request. */
  timeSeries?: Array<TimeSeries>;
  /** If there are more results than have been returned, then this field is set to a non-empty value. To see the additional results, use that value as page_token in the next call to this method. */
  nextPageToken?: string;
  /** Query execution errors that may have caused the time series data returned to be incomplete. */
  executionErrors?: Array<Status>;
  /** The unit in which all time_series point values are reported. unit follows the UCUM format for units as seen in https://unitsofmeasure.org/ucum.html. If different time_series have different units (for example, because they come from different metric types, or a unit is absent), then unit will be "{not_a_unit}". */
  unit?: string;
  /** Cloud regions that were unreachable which may have caused incomplete data to be returned. */
  unreachable?: Array<string>;
}

export const ListTimeSeriesResponse: Schema.Schema<ListTimeSeriesResponse> = Schema.suspend(() => Schema.Struct({
  timeSeries: Schema.optional(Schema.Array(TimeSeries)),
  nextPageToken: Schema.optional(Schema.String),
  executionErrors: Schema.optional(Schema.Array(Status)),
  unit: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListTimeSeriesResponse" }) as any as Schema.Schema<ListTimeSeriesResponse>;

export interface CreateTimeSeriesRequest {
  /** Required. The new data to be added to a list of time series. Adds at most one data point to each of several time series. The new data point must be more recent than any other point in its time series. Each TimeSeries value must fully specify a unique time series by supplying all label values for the metric and the monitored resource.The maximum number of TimeSeries objects per Create request is 200. */
  timeSeries?: Array<TimeSeries>;
}

export const CreateTimeSeriesRequest: Schema.Schema<CreateTimeSeriesRequest> = Schema.suspend(() => Schema.Struct({
  timeSeries: Schema.optional(Schema.Array(TimeSeries)),
})).annotate({ identifier: "CreateTimeSeriesRequest" }) as any as Schema.Schema<CreateTimeSeriesRequest>;

export interface CollectdValue {
  /** The data source for the collectd value. For example, there are two data sources for network measurements: "rx" and "tx". */
  dataSourceName?: string;
  /** The type of measurement. */
  dataSourceType?: "UNSPECIFIED_DATA_SOURCE_TYPE" | "GAUGE" | "COUNTER" | "DERIVE" | "ABSOLUTE" | (string & {});
  /** The measurement value. */
  value?: TypedValue;
}

export const CollectdValue: Schema.Schema<CollectdValue> = Schema.suspend(() => Schema.Struct({
  dataSourceName: Schema.optional(Schema.String),
  dataSourceType: Schema.optional(Schema.String),
  value: Schema.optional(TypedValue),
})).annotate({ identifier: "CollectdValue" }) as any as Schema.Schema<CollectdValue>;

export interface CollectdPayload {
  /** The measured values during this time interval. Each value must have a different data_source_name. */
  values?: Array<CollectdValue>;
  /** The start time of the interval. */
  startTime?: string;
  /** The end time of the interval. */
  endTime?: string;
  /** The name of the plugin. Example: "disk". */
  plugin?: string;
  /** The instance name of the plugin Example: "hdcl". */
  pluginInstance?: string;
  /** The measurement type. Example: "memory". */
  type?: string;
  /** The measurement type instance. Example: "used". */
  typeInstance?: string;
  /** The measurement metadata. Example: "process_id" -> 12345 */
  metadata?: Record<string, TypedValue>;
}

export const CollectdPayload: Schema.Schema<CollectdPayload> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(CollectdValue)),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  plugin: Schema.optional(Schema.String),
  pluginInstance: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  typeInstance: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, TypedValue)),
})).annotate({ identifier: "CollectdPayload" }) as any as Schema.Schema<CollectdPayload>;

export interface CreateCollectdTimeSeriesRequest {
  /** The monitored resource associated with the time series. */
  resource?: MonitoredResource;
  /** The version of collectd that collected the data. Example: "5.3.0-192.el6". */
  collectdVersion?: string;
  /** The collectd payloads representing the time series data. You must not include more than a single point for each time series, so no two payloads can have the same values for all of the fields plugin, plugin_instance, type, and type_instance. */
  collectdPayloads?: Array<CollectdPayload>;
}

export const CreateCollectdTimeSeriesRequest: Schema.Schema<CreateCollectdTimeSeriesRequest> = Schema.suspend(() => Schema.Struct({
  resource: Schema.optional(MonitoredResource),
  collectdVersion: Schema.optional(Schema.String),
  collectdPayloads: Schema.optional(Schema.Array(CollectdPayload)),
})).annotate({ identifier: "CreateCollectdTimeSeriesRequest" }) as any as Schema.Schema<CreateCollectdTimeSeriesRequest>;

export interface CollectdValueError {
  /** The zero-based index in CollectdPayload.values within the parent CreateCollectdTimeSeriesRequest.collectd_payloads. */
  index?: number;
  /** Records the error status for the value. */
  error?: Status;
}

export const CollectdValueError: Schema.Schema<CollectdValueError> = Schema.suspend(() => Schema.Struct({
  index: Schema.optional(Schema.Number),
  error: Schema.optional(Status),
})).annotate({ identifier: "CollectdValueError" }) as any as Schema.Schema<CollectdValueError>;

export interface CollectdPayloadError {
  /** The zero-based index in CreateCollectdTimeSeriesRequest.collectd_payloads. */
  index?: number;
  /** Records the error status for the payload. If this field is present, the partial errors for nested values won't be populated. */
  error?: Status;
  /** Records the error status for values that were not written due to an error.Failed payloads for which nothing is written will not include partial value errors. */
  valueErrors?: Array<CollectdValueError>;
}

export const CollectdPayloadError: Schema.Schema<CollectdPayloadError> = Schema.suspend(() => Schema.Struct({
  index: Schema.optional(Schema.Number),
  error: Schema.optional(Status),
  valueErrors: Schema.optional(Schema.Array(CollectdValueError)),
})).annotate({ identifier: "CollectdPayloadError" }) as any as Schema.Schema<CollectdPayloadError>;

export interface Monitoring_Error {
  /** The status of the requested write operation. */
  status?: Status;
  /** The number of points that couldn't be written because of status. */
  pointCount?: number;
}

export const Monitoring_Error: Schema.Schema<Monitoring_Error> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(Status),
  pointCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "Monitoring_Error" }) as any as Schema.Schema<Monitoring_Error>;

export interface CreateTimeSeriesSummary {
  /** The number of points in the request. */
  totalPointCount?: number;
  /** The number of points that were successfully written. */
  successPointCount?: number;
  /** The number of points that failed to be written. Order is not guaranteed. */
  errors?: Array<Monitoring_Error>;
}

export const CreateTimeSeriesSummary: Schema.Schema<CreateTimeSeriesSummary> = Schema.suspend(() => Schema.Struct({
  totalPointCount: Schema.optional(Schema.Number),
  successPointCount: Schema.optional(Schema.Number),
  errors: Schema.optional(Schema.Array(Monitoring_Error)),
})).annotate({ identifier: "CreateTimeSeriesSummary" }) as any as Schema.Schema<CreateTimeSeriesSummary>;

export interface CreateCollectdTimeSeriesResponse {
  /** Records the error status for points that were not written due to an error in the request.Failed requests for which nothing is written will return an error response instead. Requests where data points were rejected by the backend will set summary instead. */
  payloadErrors?: Array<CollectdPayloadError>;
  /** Aggregate statistics from writing the payloads. This field is omitted if all points were successfully written, so that the response is empty. This is for backwards compatibility with clients that log errors on any non-empty response. */
  summary?: CreateTimeSeriesSummary;
}

export const CreateCollectdTimeSeriesResponse: Schema.Schema<CreateCollectdTimeSeriesResponse> = Schema.suspend(() => Schema.Struct({
  payloadErrors: Schema.optional(Schema.Array(CollectdPayloadError)),
  summary: Schema.optional(CreateTimeSeriesSummary),
})).annotate({ identifier: "CreateCollectdTimeSeriesResponse" }) as any as Schema.Schema<CreateCollectdTimeSeriesResponse>;

export interface Link {
  /** A short display name for the link. The display name must not be empty or exceed 63 characters. Example: "playbook". */
  displayName?: string;
  /** The url of a webpage. A url can be templatized by using variables in the path or the query parameters. The total length of a URL should not exceed 2083 characters before and after variable expansion. Example: "https://my_domain.com/playbook?name=${resource.name}" */
  url?: string;
}

export const Link: Schema.Schema<Link> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
})).annotate({ identifier: "Link" }) as any as Schema.Schema<Link>;

export interface Documentation {
  /** The body of the documentation, interpreted according to mime_type. The content may not exceed 8,192 Unicode characters and may not exceed more than 10,240 bytes when encoded in UTF-8 format, whichever is smaller. This text can be templatized by using variables (https://cloud.google.com/monitoring/alerts/doc-variables#doc-vars). */
  content?: string;
  /** The format of the content field. Presently, only the value "text/markdown" is supported. See Markdown (https://en.wikipedia.org/wiki/Markdown) for more information. */
  mimeType?: string;
  /** Optional. The subject line of the notification. The subject line may not exceed 10,240 bytes. In notifications generated by this policy, the contents of the subject line after variable expansion will be truncated to 255 bytes or shorter at the latest UTF-8 character boundary. The 255-byte limit is recommended by this thread (https://stackoverflow.com/questions/1592291/what-is-the-email-subject-length-limit). It is both the limit imposed by some third-party ticketing products and it is common to define textual fields in databases as VARCHAR(255).The contents of the subject line can be templatized by using variables (https://cloud.google.com/monitoring/alerts/doc-variables#doc-vars). If this field is missing or empty, a default subject line will be generated. */
  subject?: string;
  /** Optional. Links to content such as playbooks, repositories, and other resources. This field can contain up to 3 entries. */
  links?: Array<Link>;
}

export const Documentation: Schema.Schema<Documentation> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.String),
  mimeType: Schema.optional(Schema.String),
  subject: Schema.optional(Schema.String),
  links: Schema.optional(Schema.Array(Link)),
})).annotate({ identifier: "Documentation" }) as any as Schema.Schema<Documentation>;

export interface Aggregation {
  /** The alignment_period specifies a time interval, in seconds, that is used to divide the data in all the time series into consistent blocks of time. This will be done before the per-series aligner can be applied to the data.The value must be at least 60 seconds. If a per-series aligner other than ALIGN_NONE is specified, this field is required or an error is returned. If no per-series aligner is specified, or the aligner ALIGN_NONE is specified, then this field is ignored.The maximum value of the alignment_period is 104 weeks (2 years) for charts, and 90,000 seconds (25 hours) for alerting policies. */
  alignmentPeriod?: string;
  /** An Aligner describes how to bring the data points in a single time series into temporal alignment. Except for ALIGN_NONE, all alignments cause all the data points in an alignment_period to be mathematically grouped together, resulting in a single data point for each alignment_period with end timestamp at the end of the period.Not all alignment operations may be applied to all time series. The valid choices depend on the metric_kind and value_type of the original time series. Alignment can change the metric_kind or the value_type of the time series.Time series data must be aligned in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified and not equal to ALIGN_NONE and alignment_period must be specified; otherwise, an error is returned. */
  perSeriesAligner?: "ALIGN_NONE" | "ALIGN_DELTA" | "ALIGN_RATE" | "ALIGN_INTERPOLATE" | "ALIGN_NEXT_OLDER" | "ALIGN_MIN" | "ALIGN_MAX" | "ALIGN_MEAN" | "ALIGN_COUNT" | "ALIGN_SUM" | "ALIGN_STDDEV" | "ALIGN_COUNT_TRUE" | "ALIGN_COUNT_FALSE" | "ALIGN_FRACTION_TRUE" | "ALIGN_PERCENTILE_99" | "ALIGN_PERCENTILE_95" | "ALIGN_PERCENTILE_50" | "ALIGN_PERCENTILE_05" | "ALIGN_PERCENT_CHANGE" | (string & {});
  /** The reduction operation to be used to combine time series into a single time series, where the value of each data point in the resulting series is a function of all the already aligned values in the input time series.Not all reducer operations can be applied to all time series. The valid choices depend on the metric_kind and the value_type of the original time series. Reduction can yield a time series with a different metric_kind or value_type than the input time series.Time series data must first be aligned (see per_series_aligner) in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified, and must not be ALIGN_NONE. An alignment_period must also be specified; otherwise, an error is returned. */
  crossSeriesReducer?: "REDUCE_NONE" | "REDUCE_MEAN" | "REDUCE_MIN" | "REDUCE_MAX" | "REDUCE_SUM" | "REDUCE_STDDEV" | "REDUCE_COUNT" | "REDUCE_COUNT_TRUE" | "REDUCE_COUNT_FALSE" | "REDUCE_FRACTION_TRUE" | "REDUCE_PERCENTILE_99" | "REDUCE_PERCENTILE_95" | "REDUCE_PERCENTILE_50" | "REDUCE_PERCENTILE_05" | (string & {});
  /** The set of fields to preserve when cross_series_reducer is specified. The group_by_fields determine how the time series are partitioned into subsets prior to applying the aggregation operation. Each subset contains time series that have the same value for each of the grouping fields. Each individual time series is a member of exactly one subset. The cross_series_reducer is applied to each subset of time series. It is not possible to reduce across different resource types, so this field implicitly contains resource.type. Fields not specified in group_by_fields are aggregated away. If group_by_fields is not specified and all the time series have the same resource type, then the time series are aggregated into a single output time series. If cross_series_reducer is not defined, this field is ignored. */
  groupByFields?: Array<string>;
}

export const Aggregation: Schema.Schema<Aggregation> = Schema.suspend(() => Schema.Struct({
  alignmentPeriod: Schema.optional(Schema.String),
  perSeriesAligner: Schema.optional(Schema.String),
  crossSeriesReducer: Schema.optional(Schema.String),
  groupByFields: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Aggregation" }) as any as Schema.Schema<Aggregation>;

export interface ForecastOptions {
  /** Required. The length of time into the future to forecast whether a time series will violate the threshold. If the predicted value is found to violate the threshold, and the violation is observed in all forecasts made for the configured duration, then the time series is considered to be failing. The forecast horizon can range from 1 hour to 60 hours. */
  forecastHorizon?: string;
}

export const ForecastOptions: Schema.Schema<ForecastOptions> = Schema.suspend(() => Schema.Struct({
  forecastHorizon: Schema.optional(Schema.String),
})).annotate({ identifier: "ForecastOptions" }) as any as Schema.Schema<ForecastOptions>;

export interface Trigger {
  /** The absolute number of time series that must fail the predicate for the condition to be triggered. */
  count?: number;
  /** The percentage of time series that must fail the predicate for the condition to be triggered. */
  percent?: number;
}

export const Trigger: Schema.Schema<Trigger> = Schema.suspend(() => Schema.Struct({
  count: Schema.optional(Schema.Number),
  percent: Schema.optional(Schema.Number),
})).annotate({ identifier: "Trigger" }) as any as Schema.Schema<Trigger>;

export interface MetricThreshold {
  /** Required. A filter (https://cloud.google.com/monitoring/api/v3/filters) that identifies which time series should be compared with the threshold.The filter is similar to the one that is specified in the ListTimeSeries request (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.timeSeries/list) (that call is useful to verify the time series that will be retrieved / processed). The filter must specify the metric type and the resource type. Optionally, it can specify resource labels and metric labels. This field must not exceed 2048 Unicode characters in length. */
  filter?: string;
  /** Specifies the alignment of data points in individual time series as well as how to combine the retrieved time series together (such as when aggregating multiple streams on each resource to a single stream for each resource or when aggregating streams across all members of a group of resources). Multiple aggregations are applied in the order specified.This field is similar to the one in the ListTimeSeries request (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.timeSeries/list). It is advisable to use the ListTimeSeries method when debugging this field. */
  aggregations?: Array<Aggregation>;
  /** A filter (https://cloud.google.com/monitoring/api/v3/filters) that identifies a time series that should be used as the denominator of a ratio that will be compared with the threshold. If a denominator_filter is specified, the time series specified by the filter field will be used as the numerator.The filter must specify the metric type and optionally may contain restrictions on resource type, resource labels, and metric labels. This field may not exceed 2048 Unicode characters in length. */
  denominatorFilter?: string;
  /** Specifies the alignment of data points in individual time series selected by denominatorFilter as well as how to combine the retrieved time series together (such as when aggregating multiple streams on each resource to a single stream for each resource or when aggregating streams across all members of a group of resources).When computing ratios, the aggregations and denominator_aggregations fields must use the same alignment period and produce time series that have the same periodicity and labels. */
  denominatorAggregations?: Array<Aggregation>;
  /** When this field is present, the MetricThreshold condition forecasts whether the time series is predicted to violate the threshold within the forecast_horizon. When this field is not set, the MetricThreshold tests the current value of the timeseries against the threshold. */
  forecastOptions?: ForecastOptions;
  /** The comparison to apply between the time series (indicated by filter and aggregation) and the threshold (indicated by threshold_value). The comparison is applied on each time series, with the time series on the left-hand side and the threshold on the right-hand side.Only COMPARISON_LT and COMPARISON_GT are supported currently. */
  comparison?: "COMPARISON_UNSPECIFIED" | "COMPARISON_GT" | "COMPARISON_GE" | "COMPARISON_LT" | "COMPARISON_LE" | "COMPARISON_EQ" | "COMPARISON_NE" | (string & {});
  /** A value against which to compare the time series. */
  thresholdValue?: number;
  /** Required. The amount of time that a time series must violate the threshold to be considered failing. Currently, only values that are a multiple of a minute--e.g., 0, 60, 120, or 300 seconds--are supported. If an invalid value is given, an error will be returned. When choosing a duration, it is useful to keep in mind the frequency of the underlying time series data (which may also be affected by any alignments specified in the aggregations field); a good duration is long enough so that a single outlier does not generate spurious alerts, but short enough that unhealthy states are detected and alerted on quickly. */
  duration?: string;
  /** The number/percent of time series for which the comparison must hold in order for the condition to trigger. If unspecified, then the condition will trigger if the comparison is true for any of the time series that have been identified by filter and aggregations, or by the ratio, if denominator_filter and denominator_aggregations are specified. */
  trigger?: Trigger;
  /** A condition control that determines how metric-threshold conditions are evaluated when data stops arriving. To use this control, the value of the duration field must be greater than or equal to 60 seconds. */
  evaluationMissingData?: "EVALUATION_MISSING_DATA_UNSPECIFIED" | "EVALUATION_MISSING_DATA_INACTIVE" | "EVALUATION_MISSING_DATA_ACTIVE" | "EVALUATION_MISSING_DATA_NO_OP" | (string & {});
}

export const MetricThreshold: Schema.Schema<MetricThreshold> = Schema.suspend(() => Schema.Struct({
  filter: Schema.optional(Schema.String),
  aggregations: Schema.optional(Schema.Array(Aggregation)),
  denominatorFilter: Schema.optional(Schema.String),
  denominatorAggregations: Schema.optional(Schema.Array(Aggregation)),
  forecastOptions: Schema.optional(ForecastOptions),
  comparison: Schema.optional(Schema.String),
  thresholdValue: Schema.optional(Schema.Number),
  duration: Schema.optional(Schema.String),
  trigger: Schema.optional(Trigger),
  evaluationMissingData: Schema.optional(Schema.String),
})).annotate({ identifier: "MetricThreshold" }) as any as Schema.Schema<MetricThreshold>;

export interface MetricAbsence {
  /** Required. A filter (https://cloud.google.com/monitoring/api/v3/filters) that identifies which time series should be compared with the threshold.The filter is similar to the one that is specified in the ListTimeSeries request (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.timeSeries/list) (that call is useful to verify the time series that will be retrieved / processed). The filter must specify the metric type and the resource type. Optionally, it can specify resource labels and metric labels. This field must not exceed 2048 Unicode characters in length. */
  filter?: string;
  /** Specifies the alignment of data points in individual time series as well as how to combine the retrieved time series together (such as when aggregating multiple streams on each resource to a single stream for each resource or when aggregating streams across all members of a group of resources). Multiple aggregations are applied in the order specified.This field is similar to the one in the ListTimeSeries request (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.timeSeries/list). It is advisable to use the ListTimeSeries method when debugging this field. */
  aggregations?: Array<Aggregation>;
  /** Required. The amount of time that a time series must fail to report new data to be considered failing. The minimum value of this field is 120 seconds. Larger values that are a multiple of a minute--for example, 240 or 300 seconds--are supported. If an invalid value is given, an error will be returned. */
  duration?: string;
  /** The number/percent of time series for which the comparison must hold in order for the condition to trigger. If unspecified, then the condition will trigger if the comparison is true for any of the time series that have been identified by filter and aggregations. */
  trigger?: Trigger;
}

export const MetricAbsence: Schema.Schema<MetricAbsence> = Schema.suspend(() => Schema.Struct({
  filter: Schema.optional(Schema.String),
  aggregations: Schema.optional(Schema.Array(Aggregation)),
  duration: Schema.optional(Schema.String),
  trigger: Schema.optional(Trigger),
})).annotate({ identifier: "MetricAbsence" }) as any as Schema.Schema<MetricAbsence>;

export interface LogMatch {
  /** Required. A logs-based filter. See Advanced Logs Queries (https://cloud.google.com/logging/docs/view/advanced-queries) for how this filter should be constructed. */
  filter?: string;
  /** Optional. A map from a label key to an extractor expression, which is used to extract the value for this label key. Each entry in this map is a specification for how data should be extracted from log entries that match filter. Each combination of extracted values is treated as a separate rule for the purposes of triggering notifications. Label keys and corresponding values can be used in notifications generated by this condition.Please see the documentation on logs-based metric valueExtractors (https://cloud.google.com/logging/docs/reference/v2/rest/v2/projects.metrics#LogMetric.FIELDS.value_extractor) for syntax and examples. */
  labelExtractors?: Record<string, string>;
}

export const LogMatch: Schema.Schema<LogMatch> = Schema.suspend(() => Schema.Struct({
  filter: Schema.optional(Schema.String),
  labelExtractors: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "LogMatch" }) as any as Schema.Schema<LogMatch>;

export interface MonitoringQueryLanguageCondition {
  /** Monitoring Query Language (https://cloud.google.com/monitoring/mql) query that outputs a boolean stream. */
  query?: string;
  /** Optional. The amount of time that a time series must violate the threshold to be considered failing. Currently, only values that are a multiple of a minute--e.g., 0, 60, 120, or 300 seconds--are supported. If an invalid value is given, an error will be returned. When choosing a duration, it is useful to keep in mind the frequency of the underlying time series data (which may also be affected by any alignments specified in the aggregations field); a good duration is long enough so that a single outlier does not generate spurious alerts, but short enough that unhealthy states are detected and alerted on quickly. The default value is zero. */
  duration?: string;
  /** The number/percent of time series for which the comparison must hold in order for the condition to trigger. If unspecified, then the condition will trigger if the comparison is true for any of the time series that have been identified by filter and aggregations, or by the ratio, if denominator_filter and denominator_aggregations are specified. */
  trigger?: Trigger;
  /** A condition control that determines how metric-threshold conditions are evaluated when data stops arriving. */
  evaluationMissingData?: "EVALUATION_MISSING_DATA_UNSPECIFIED" | "EVALUATION_MISSING_DATA_INACTIVE" | "EVALUATION_MISSING_DATA_ACTIVE" | "EVALUATION_MISSING_DATA_NO_OP" | (string & {});
}

export const MonitoringQueryLanguageCondition: Schema.Schema<MonitoringQueryLanguageCondition> = Schema.suspend(() => Schema.Struct({
  query: Schema.optional(Schema.String),
  duration: Schema.optional(Schema.String),
  trigger: Schema.optional(Trigger),
  evaluationMissingData: Schema.optional(Schema.String),
})).annotate({ identifier: "MonitoringQueryLanguageCondition" }) as any as Schema.Schema<MonitoringQueryLanguageCondition>;

export interface PrometheusQueryLanguageCondition {
  /** Required. The PromQL expression to evaluate. Every evaluation cycle this expression is evaluated at the current time, and all resultant time series become pending/firing alerts. This field must not be empty. */
  query?: string;
  /** Optional. Alerts are considered firing once their PromQL expression was evaluated to be "true" for this long. Alerts whose PromQL expression was not evaluated to be "true" for long enough are considered pending. Must be a non-negative duration or missing. This field is optional. Its default value is zero. */
  duration?: string;
  /** Optional. How often this rule should be evaluated. Must be a positive multiple of 30 seconds or missing. This field is optional. Its default value is 30 seconds. If this PrometheusQueryLanguageCondition was generated from a Prometheus alerting rule, then this value should be taken from the enclosing rule group. */
  evaluationInterval?: string;
  /** Optional. Labels to add to or overwrite in the PromQL query result. Label names must be valid (https://prometheus.io/docs/concepts/data_model/#metric-names-and-labels). Label values can be templatized by using variables (https://cloud.google.com/monitoring/alerts/doc-variables#doc-vars). The only available variable names are the names of the labels in the PromQL result, including "__name__" and "value". "labels" may be empty. */
  labels?: Record<string, string>;
  /** Optional. The rule group name of this alert in the corresponding Prometheus configuration file.Some external tools may require this field to be populated correctly in order to refer to the original Prometheus configuration file. The rule group name and the alert name are necessary to update the relevant AlertPolicies in case the definition of the rule group changes in the future.This field is optional. If this field is not empty, then it must contain a valid UTF-8 string. This field may not exceed 2048 Unicode characters in length. */
  ruleGroup?: string;
  /** Optional. The alerting rule name of this alert in the corresponding Prometheus configuration file.Some external tools may require this field to be populated correctly in order to refer to the original Prometheus configuration file. The rule group name and the alert name are necessary to update the relevant AlertPolicies in case the definition of the rule group changes in the future.This field is optional. If this field is not empty, then it must be a valid Prometheus label name (https://prometheus.io/docs/concepts/data_model/#metric-names-and-labels). This field may not exceed 2048 Unicode characters in length. */
  alertRule?: string;
  /** Optional. Whether to disable metric existence validation for this condition.This allows alerting policies to be defined on metrics that do not yet exist, improving advanced customer workflows such as configuring alerting policies using Terraform.Users with the monitoring.alertPolicyViewer role are able to see the name of the non-existent metric in the alerting policy condition. */
  disableMetricValidation?: boolean;
}

export const PrometheusQueryLanguageCondition: Schema.Schema<PrometheusQueryLanguageCondition> = Schema.suspend(() => Schema.Struct({
  query: Schema.optional(Schema.String),
  duration: Schema.optional(Schema.String),
  evaluationInterval: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  ruleGroup: Schema.optional(Schema.String),
  alertRule: Schema.optional(Schema.String),
  disableMetricValidation: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "PrometheusQueryLanguageCondition" }) as any as Schema.Schema<PrometheusQueryLanguageCondition>;

export interface Minutes {
  /** Required. Number of minutes between runs. The interval must be greater than or equal to 5 minutes and less than or equal to 1440 minutes. */
  periodicity?: number;
}

export const Minutes: Schema.Schema<Minutes> = Schema.suspend(() => Schema.Struct({
  periodicity: Schema.optional(Schema.Number),
})).annotate({ identifier: "Minutes" }) as any as Schema.Schema<Minutes>;

export interface Hourly {
  /** Required. The number of hours between runs. Must be greater than or equal to 1 hour and less than or equal to 48 hours. */
  periodicity?: number;
  /** Optional. The number of minutes after the hour (in UTC) to run the query. Must be greater than or equal to 0 minutes and less than or equal to 59 minutes. If left unspecified, then an arbitrary offset is used. */
  minuteOffset?: number;
}

export const Hourly: Schema.Schema<Hourly> = Schema.suspend(() => Schema.Struct({
  periodicity: Schema.optional(Schema.Number),
  minuteOffset: Schema.optional(Schema.Number),
})).annotate({ identifier: "Hourly" }) as any as Schema.Schema<Hourly>;

export interface TimeOfDay {
  /** Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. */
  hours?: number;
  /** Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. */
  minutes?: number;
  /** Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. */
  seconds?: number;
  /** Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. */
  nanos?: number;
}

export const TimeOfDay: Schema.Schema<TimeOfDay> = Schema.suspend(() => Schema.Struct({
  hours: Schema.optional(Schema.Number),
  minutes: Schema.optional(Schema.Number),
  seconds: Schema.optional(Schema.Number),
  nanos: Schema.optional(Schema.Number),
})).annotate({ identifier: "TimeOfDay" }) as any as Schema.Schema<TimeOfDay>;

export interface Daily {
  /** Required. The number of days between runs. Must be greater than or equal to 1 day and less than or equal to 31 days. */
  periodicity?: number;
  /** Optional. The time of day (in UTC) at which the query should run. If left unspecified, the server picks an arbitrary time of day and runs the query at the same time each day. */
  executionTime?: TimeOfDay;
}

export const Daily: Schema.Schema<Daily> = Schema.suspend(() => Schema.Struct({
  periodicity: Schema.optional(Schema.Number),
  executionTime: Schema.optional(TimeOfDay),
})).annotate({ identifier: "Daily" }) as any as Schema.Schema<Daily>;

export interface RowCountTest {
  /** Required. The comparison to apply between the number of rows returned by the query and the threshold. */
  comparison?: "COMPARISON_UNSPECIFIED" | "COMPARISON_GT" | "COMPARISON_GE" | "COMPARISON_LT" | "COMPARISON_LE" | "COMPARISON_EQ" | "COMPARISON_NE" | (string & {});
  /** Required. The value against which to compare the row count. */
  threshold?: string;
}

export const RowCountTest: Schema.Schema<RowCountTest> = Schema.suspend(() => Schema.Struct({
  comparison: Schema.optional(Schema.String),
  threshold: Schema.optional(Schema.String),
})).annotate({ identifier: "RowCountTest" }) as any as Schema.Schema<RowCountTest>;

export interface BooleanTest {
  /** Required. The name of the column containing the boolean value. If the value in a row is NULL, that row is ignored. */
  column?: string;
}

export const BooleanTest: Schema.Schema<BooleanTest> = Schema.suspend(() => Schema.Struct({
  column: Schema.optional(Schema.String),
})).annotate({ identifier: "BooleanTest" }) as any as Schema.Schema<BooleanTest>;

export interface SqlCondition {
  /** Required. The Log Analytics SQL query to run, as a string. The query must conform to the required shape. Specifically, the query must not try to filter the input by time. A filter will automatically be applied to filter the input so that the query receives all rows received since the last time the query was run.For example, the following query extracts all log entries containing an HTTP request: SELECT timestamp, log_name, severity, http_request, resource, labels FROM my-project.global._Default._AllLogs WHERE http_request IS NOT NULL */
  query?: string;
  /** Schedule the query to execute every so many minutes. */
  minutes?: Minutes;
  /** Schedule the query to execute every so many hours. */
  hourly?: Hourly;
  /** Schedule the query to execute every so many days. */
  daily?: Daily;
  /** Test the row count against a threshold. */
  rowCountTest?: RowCountTest;
  /** Test the boolean value in the indicated column. */
  booleanTest?: BooleanTest;
}

export const SqlCondition: Schema.Schema<SqlCondition> = Schema.suspend(() => Schema.Struct({
  query: Schema.optional(Schema.String),
  minutes: Schema.optional(Minutes),
  hourly: Schema.optional(Hourly),
  daily: Schema.optional(Daily),
  rowCountTest: Schema.optional(RowCountTest),
  booleanTest: Schema.optional(BooleanTest),
})).annotate({ identifier: "SqlCondition" }) as any as Schema.Schema<SqlCondition>;

export interface Condition {
  /** Required if the condition exists. The unique resource name for this condition. Its format is: projects/[PROJECT_ID_OR_NUMBER]/alertPolicies/[POLICY_ID]/conditions/[CONDITION_ID] [CONDITION_ID] is assigned by Cloud Monitoring when the condition is created as part of a new or updated alerting policy.When calling the alertPolicies.create method, do not include the name field in the conditions of the requested alerting policy. Cloud Monitoring creates the condition identifiers and includes them in the new policy.When calling the alertPolicies.update method to update a policy, including a condition name causes the existing condition to be updated. Conditions without names are added to the updated policy. Existing conditions are deleted if they are not updated.Best practice is to preserve [CONDITION_ID] if you make only small changes, such as those to condition thresholds, durations, or trigger values. Otherwise, treat the change as a new condition and let the existing condition be deleted. */
  name?: string;
  /** A short name or phrase used to identify the condition in dashboards, notifications, and incidents. To avoid confusion, don't use the same display name for multiple conditions in the same policy. */
  displayName?: string;
  /** A condition that compares a time series against a threshold. */
  conditionThreshold?: MetricThreshold;
  /** A condition that checks that a time series continues to receive new data points. */
  conditionAbsent?: MetricAbsence;
  /** A condition that checks for log messages matching given constraints. If set, no other conditions can be present. */
  conditionMatchedLog?: LogMatch;
  /** A condition that uses the Monitoring Query Language to define alerts. */
  conditionMonitoringQueryLanguage?: MonitoringQueryLanguageCondition;
  /** A condition that uses the Prometheus query language to define alerts. */
  conditionPrometheusQueryLanguage?: PrometheusQueryLanguageCondition;
  /** A condition that periodically evaluates a SQL query result. */
  conditionSql?: SqlCondition;
}

export const Condition: Schema.Schema<Condition> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  conditionThreshold: Schema.optional(MetricThreshold),
  conditionAbsent: Schema.optional(MetricAbsence),
  conditionMatchedLog: Schema.optional(LogMatch),
  conditionMonitoringQueryLanguage: Schema.optional(MonitoringQueryLanguageCondition),
  conditionPrometheusQueryLanguage: Schema.optional(PrometheusQueryLanguageCondition),
  conditionSql: Schema.optional(SqlCondition),
})).annotate({ identifier: "Condition" }) as any as Schema.Schema<Condition>;

export interface MutationRecord {
  /** When the change occurred. */
  mutateTime?: string;
  /** The email address of the user making the change. */
  mutatedBy?: string;
}

export const MutationRecord: Schema.Schema<MutationRecord> = Schema.suspend(() => Schema.Struct({
  mutateTime: Schema.optional(Schema.String),
  mutatedBy: Schema.optional(Schema.String),
})).annotate({ identifier: "MutationRecord" }) as any as Schema.Schema<MutationRecord>;

export interface NotificationRateLimit {
  /** Not more than one notification per period. */
  period?: string;
}

export const NotificationRateLimit: Schema.Schema<NotificationRateLimit> = Schema.suspend(() => Schema.Struct({
  period: Schema.optional(Schema.String),
})).annotate({ identifier: "NotificationRateLimit" }) as any as Schema.Schema<NotificationRateLimit>;

export interface NotificationChannelStrategy {
  /** The full REST resource name for the notification channels that these settings apply to. Each of these correspond to the name field in one of the NotificationChannel objects referenced in the notification_channels field of this AlertPolicy. The format is: projects/[PROJECT_ID_OR_NUMBER]/notificationChannels/[CHANNEL_ID] */
  notificationChannelNames?: Array<string>;
  /** The frequency at which to send reminder notifications for open incidents. The value must be between 30 minutes and 24 hours. */
  renotifyInterval?: string;
}

export const NotificationChannelStrategy: Schema.Schema<NotificationChannelStrategy> = Schema.suspend(() => Schema.Struct({
  notificationChannelNames: Schema.optional(Schema.Array(Schema.String)),
  renotifyInterval: Schema.optional(Schema.String),
})).annotate({ identifier: "NotificationChannelStrategy" }) as any as Schema.Schema<NotificationChannelStrategy>;

export interface AlertStrategy {
  /** Required for log-based alerting policies, i.e. policies with a LogMatch condition.This limit is not implemented for alerting policies that do not have a LogMatch condition. */
  notificationRateLimit?: NotificationRateLimit;
  /** For log-based alert policies, the notification prompts is always OPENED. For non log-based alert policies, the notification prompts can be OPENED or OPENED, CLOSED. */
  notificationPrompts?: Array<"NOTIFICATION_PROMPT_UNSPECIFIED" | "OPENED" | "CLOSED" | (string & {})>;
  /** If an alerting policy that was active has no data for this long, any open incidents will close */
  autoClose?: string;
  /** Control how notifications will be sent out, on a per-channel basis. */
  notificationChannelStrategy?: Array<NotificationChannelStrategy>;
}

export const AlertStrategy: Schema.Schema<AlertStrategy> = Schema.suspend(() => Schema.Struct({
  notificationRateLimit: Schema.optional(NotificationRateLimit),
  notificationPrompts: Schema.optional(Schema.Array(Schema.String)),
  autoClose: Schema.optional(Schema.String),
  notificationChannelStrategy: Schema.optional(Schema.Array(NotificationChannelStrategy)),
})).annotate({ identifier: "AlertStrategy" }) as any as Schema.Schema<AlertStrategy>;

export interface AlertPolicy {
  /** Identifier. Required if the policy exists. The resource name for this policy. The format is: projects/[PROJECT_ID_OR_NUMBER]/alertPolicies/[ALERT_POLICY_ID] [ALERT_POLICY_ID] is assigned by Cloud Monitoring when the policy is created. When calling the alertPolicies.create method, do not include the name field in the alerting policy passed as part of the request. */
  name?: string;
  /** A short name or phrase used to identify the policy in dashboards, notifications, and incidents. To avoid confusion, don't use the same display name for multiple policies in the same project. The name is limited to 512 Unicode characters.The convention for the display_name of a PrometheusQueryLanguageCondition is "{rule group name}/{alert name}", where the {rule group name} and {alert name} should be taken from the corresponding Prometheus configuration file. This convention is not enforced. In any case the display_name is not a unique key of the AlertPolicy. */
  displayName?: string;
  /** Documentation that is included with notifications and incidents related to this policy. Best practice is for the documentation to include information to help responders understand, mitigate, escalate, and correct the underlying problems detected by the alerting policy. Notification channels that have limited capacity might not show this documentation. */
  documentation?: Documentation;
  /** User-supplied key/value data to be used for organizing and identifying the AlertPolicy objects.The field can contain up to 64 entries. Each key and value is limited to 63 Unicode characters or 128 bytes, whichever is smaller. Labels and values can contain only lowercase letters, numerals, underscores, and dashes. Keys must begin with a letter.Note that Prometheus {alert name} is a valid Prometheus label names (https://prometheus.io/docs/concepts/data_model/#metric-names-and-labels), whereas Prometheus {rule group} is an unrestricted UTF-8 string. This means that they cannot be stored as-is in user labels, because they may contain characters that are not allowed in user-label values. */
  userLabels?: Record<string, string>;
  /** A list of conditions for the policy. The conditions are combined by AND or OR according to the combiner field. If the combined conditions evaluate to true, then an incident is created. A policy can have from one to six conditions. If condition_time_series_query_language is present, it must be the only condition. If condition_monitoring_query_language is present, it must be the only condition. */
  conditions?: Array<Condition>;
  /** How to combine the results of multiple conditions to determine if an incident should be opened. If condition_time_series_query_language is present, this must be COMBINE_UNSPECIFIED. */
  combiner?: "COMBINE_UNSPECIFIED" | "AND" | "OR" | "AND_WITH_MATCHING_RESOURCE" | (string & {});
  /** Whether or not the policy is enabled. On write, the default interpretation if unset is that the policy is enabled. On read, clients should not make any assumption about the state if it has not been populated. The field should always be populated on List and Get operations, unless a field projection has been specified that strips it out. */
  enabled?: boolean;
  /** Read-only description of how the alerting policy is invalid. This field is only set when the alerting policy is invalid. An invalid alerting policy will not generate incidents. */
  validity?: Status;
  /** Identifies the notification channels to which notifications should be sent when incidents are opened or closed or when new violations occur on an already opened incident. Each element of this array corresponds to the name field in each of the NotificationChannel objects that are returned from the ListNotificationChannels method. The format of the entries in this field is: projects/[PROJECT_ID_OR_NUMBER]/notificationChannels/[CHANNEL_ID] */
  notificationChannels?: Array<string>;
  /** A read-only record of the creation of the alerting policy. If provided in a call to create or update, this field will be ignored. */
  creationRecord?: MutationRecord;
  /** A read-only record of the most recent change to the alerting policy. If provided in a call to create or update, this field will be ignored. */
  mutationRecord?: MutationRecord;
  /** Control over how this alerting policy's notification channels are notified. */
  alertStrategy?: AlertStrategy;
  /** Optional. The severity of an alerting policy indicates how important incidents generated by that policy are. The severity level will be displayed on the Incident detail page and in notifications. */
  severity?: "SEVERITY_UNSPECIFIED" | "CRITICAL" | "ERROR" | "WARNING" | (string & {});
}

export const AlertPolicy: Schema.Schema<AlertPolicy> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  documentation: Schema.optional(Documentation),
  userLabels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  conditions: Schema.optional(Schema.Array(Condition)),
  combiner: Schema.optional(Schema.String),
  enabled: Schema.optional(Schema.Boolean),
  validity: Schema.optional(Status),
  notificationChannels: Schema.optional(Schema.Array(Schema.String)),
  creationRecord: Schema.optional(MutationRecord),
  mutationRecord: Schema.optional(MutationRecord),
  alertStrategy: Schema.optional(AlertStrategy),
  severity: Schema.optional(Schema.String),
})).annotate({ identifier: "AlertPolicy" }) as any as Schema.Schema<AlertPolicy>;

export interface ListAlertPoliciesResponse {
  /** The returned alert policies. */
  alertPolicies?: Array<AlertPolicy>;
  /** If there might be more results than were returned, then this field is set to a non-empty value. To see the additional results, use that value as page_token in the next call to this method. */
  nextPageToken?: string;
  /** The total number of alert policies in all pages. This number is only an estimate, and may change in subsequent pages. https://aip.dev/158 */
  totalSize?: number;
}

export const ListAlertPoliciesResponse: Schema.Schema<ListAlertPoliciesResponse> = Schema.suspend(() => Schema.Struct({
  alertPolicies: Schema.optional(Schema.Array(AlertPolicy)),
  nextPageToken: Schema.optional(Schema.String),
  totalSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "ListAlertPoliciesResponse" }) as any as Schema.Schema<ListAlertPoliciesResponse>;

export interface Group {
  /** Output only. The name of this group. The format is: projects/[PROJECT_ID_OR_NUMBER]/groups/[GROUP_ID] When creating a group, this field is ignored and a new name is created consisting of the project specified in the call to CreateGroup and a unique [GROUP_ID] that is generated automatically. */
  name?: string;
  /** A user-assigned name for this group, used only for display purposes. */
  displayName?: string;
  /** The name of the group's parent, if it has one. The format is: projects/[PROJECT_ID_OR_NUMBER]/groups/[GROUP_ID] For groups with no parent, parent_name is the empty string, "". */
  parentName?: string;
  /** The filter used to determine which monitored resources belong to this group. */
  filter?: string;
  /** If true, the members of this group are considered to be a cluster. The system can perform additional analysis on groups that are clusters. */
  isCluster?: boolean;
}

export const Group: Schema.Schema<Group> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  parentName: Schema.optional(Schema.String),
  filter: Schema.optional(Schema.String),
  isCluster: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Group" }) as any as Schema.Schema<Group>;

export interface ListGroupsResponse {
  /** The groups that match the specified filters. */
  group?: Array<Group>;
  /** If there are more results than have been returned, then this field is set to a non-empty value. To see the additional results, use that value as page_token in the next call to this method. */
  nextPageToken?: string;
}

export const ListGroupsResponse: Schema.Schema<ListGroupsResponse> = Schema.suspend(() => Schema.Struct({
  group: Schema.optional(Schema.Array(Group)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListGroupsResponse" }) as any as Schema.Schema<ListGroupsResponse>;

export interface ListGroupMembersResponse {
  /** A set of monitored resources in the group. */
  members?: Array<MonitoredResource>;
  /** If there are more results than have been returned, then this field is set to a non-empty value. To see the additional results, use that value as page_token in the next call to this method. */
  nextPageToken?: string;
  /** The total number of elements matching this request. */
  totalSize?: number;
}

export const ListGroupMembersResponse: Schema.Schema<ListGroupMembersResponse> = Schema.suspend(() => Schema.Struct({
  members: Schema.optional(Schema.Array(MonitoredResource)),
  nextPageToken: Schema.optional(Schema.String),
  totalSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "ListGroupMembersResponse" }) as any as Schema.Schema<ListGroupMembersResponse>;

export interface LogMetadata {
  /** The labels extracted from the log. */
  extractedLabels?: Record<string, string>;
}

export const LogMetadata: Schema.Schema<LogMetadata> = Schema.suspend(() => Schema.Struct({
  extractedLabels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "LogMetadata" }) as any as Schema.Schema<LogMetadata>;

export interface PolicySnapshot {
  /** The name of the alert policy resource. In the form of "projects/PROJECT_ID_OR_NUMBER/alertPolicies/ALERT_POLICY_ID". */
  name?: string;
  /** The display name of the alert policy. */
  displayName?: string;
  /** The severity of the alert policy. */
  severity?: "SEVERITY_UNSPECIFIED" | "CRITICAL" | "ERROR" | "WARNING" | (string & {});
  /** The user labels for the alert policy. */
  userLabels?: Record<string, string>;
}

export const PolicySnapshot: Schema.Schema<PolicySnapshot> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
  userLabels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "PolicySnapshot" }) as any as Schema.Schema<PolicySnapshot>;

export interface Alert {
  /** Identifier. The name of the alert.The format is: projects/[PROJECT_ID_OR_NUMBER]/alerts/[ALERT_ID] The [ALERT_ID] is a system-assigned unique identifier for the alert. */
  name?: string;
  /** Output only. The current state of the alert. */
  state?: "STATE_UNSPECIFIED" | "OPEN" | "CLOSED" | (string & {});
  /** The time when the alert was opened. */
  openTime?: string;
  /** The time when the alert was closed. */
  closeTime?: string;
  /** The monitored resource type and any monitored resource labels preserved from the incident's generating condition. */
  resource?: MonitoredResource;
  /** The metadata of the monitored resource. */
  metadata?: MonitoredResourceMetadata;
  /** The metric type and any metric labels preserved from the incident's generating condition. */
  metric?: Metric;
  /** The log information associated with the alert. This field is only populated for log-based alerts. */
  log?: LogMetadata;
  /** The snapshot of the alert policy that generated this alert. */
  policy?: PolicySnapshot;
}

export const Alert: Schema.Schema<Alert> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  openTime: Schema.optional(Schema.String),
  closeTime: Schema.optional(Schema.String),
  resource: Schema.optional(MonitoredResource),
  metadata: Schema.optional(MonitoredResourceMetadata),
  metric: Schema.optional(Metric),
  log: Schema.optional(LogMetadata),
  policy: Schema.optional(PolicySnapshot),
})).annotate({ identifier: "Alert" }) as any as Schema.Schema<Alert>;

export interface ListAlertsResponse {
  /** The list of alerts. */
  alerts?: Array<Alert>;
  /** If not empty, indicates that there may be more results that match the request. Use the value in the page_token field in a subsequent request to fetch the next set of results. The token is encrypted and only guaranteed to return correct results for 72 hours after it is created. If empty, all results have been returned. */
  nextPageToken?: string;
  /** The estimated total number of matching results for this query. */
  totalSize?: number;
}

export const ListAlertsResponse: Schema.Schema<ListAlertsResponse> = Schema.suspend(() => Schema.Struct({
  alerts: Schema.optional(Schema.Array(Alert)),
  nextPageToken: Schema.optional(Schema.String),
  totalSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "ListAlertsResponse" }) as any as Schema.Schema<ListAlertsResponse>;

export interface NotificationChannelDescriptor {
  /** The full REST resource name for this descriptor. The format is: projects/[PROJECT_ID_OR_NUMBER]/notificationChannelDescriptors/[TYPE] In the above, [TYPE] is the value of the type field. */
  name?: string;
  /** The type of notification channel, such as "email" and "sms". To view the full list of channels, see Channel descriptors (https://cloud.google.com/monitoring/alerts/using-channels-api#ncd). Notification channel types are globally unique. */
  type?: string;
  /** A human-readable name for the notification channel type. This form of the name is suitable for a user interface. */
  displayName?: string;
  /** A human-readable description of the notification channel type. The description may include a description of the properties of the channel and pointers to external documentation. */
  description?: string;
  /** The set of labels that must be defined to identify a particular channel of the corresponding type. Each label includes a description for how that field should be populated. */
  labels?: Array<LabelDescriptor>;
  /** The tiers that support this notification channel; the project service tier must be one of the supported_tiers. */
  supportedTiers?: Array<"SERVICE_TIER_UNSPECIFIED" | "SERVICE_TIER_BASIC" | "SERVICE_TIER_PREMIUM" | (string & {})>;
  /** The product launch stage for channels of this type. */
  launchStage?: "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED" | (string & {});
}

export const NotificationChannelDescriptor: Schema.Schema<NotificationChannelDescriptor> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Array(LabelDescriptor)),
  supportedTiers: Schema.optional(Schema.Array(Schema.String)),
  launchStage: Schema.optional(Schema.String),
})).annotate({ identifier: "NotificationChannelDescriptor" }) as any as Schema.Schema<NotificationChannelDescriptor>;

export interface ListNotificationChannelDescriptorsResponse {
  /** The monitored resource descriptors supported for the specified project, optionally filtered. */
  channelDescriptors?: Array<NotificationChannelDescriptor>;
  /** If not empty, indicates that there may be more results that match the request. Use the value in the page_token field in a subsequent request to fetch the next set of results. If empty, all results have been returned. */
  nextPageToken?: string;
}

export const ListNotificationChannelDescriptorsResponse: Schema.Schema<ListNotificationChannelDescriptorsResponse> = Schema.suspend(() => Schema.Struct({
  channelDescriptors: Schema.optional(Schema.Array(NotificationChannelDescriptor)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListNotificationChannelDescriptorsResponse" }) as any as Schema.Schema<ListNotificationChannelDescriptorsResponse>;

export interface NotificationChannel {
  /** The type of the notification channel. This field matches the value of the NotificationChannelDescriptor.type field. */
  type?: string;
  /** Identifier. The full REST resource name for this channel. The format is: projects/[PROJECT_ID_OR_NUMBER]/notificationChannels/[CHANNEL_ID] The [CHANNEL_ID] is automatically assigned by the server on creation. */
  name?: string;
  /** An optional human-readable name for this notification channel. It is recommended that you specify a non-empty and unique name in order to make it easier to identify the channels in your project, though this is not enforced. The display name is limited to 512 Unicode characters. */
  displayName?: string;
  /** An optional human-readable description of this notification channel. This description may provide additional details, beyond the display name, for the channel. This may not exceed 1024 Unicode characters. */
  description?: string;
  /** Configuration fields that define the channel and its behavior. The permissible and required labels are specified in the NotificationChannelDescriptor.labels of the NotificationChannelDescriptor corresponding to the type field. */
  labels?: Record<string, string>;
  /** User-supplied key/value data that does not need to conform to the corresponding NotificationChannelDescriptor's schema, unlike the labels field. This field is intended to be used for organizing and identifying the NotificationChannel objects.The field can contain up to 64 entries. Each key and value is limited to 63 Unicode characters or 128 bytes, whichever is smaller. Labels and values can contain only lowercase letters, numerals, underscores, and dashes. Keys must begin with a letter. */
  userLabels?: Record<string, string>;
  /** Indicates whether this channel has been verified or not. On a ListNotificationChannels or GetNotificationChannel operation, this field is expected to be populated.If the value is UNVERIFIED, then it indicates that the channel is non-functioning (it both requires verification and lacks verification); otherwise, it is assumed that the channel works.If the channel is neither VERIFIED nor UNVERIFIED, it implies that the channel is of a type that does not require verification or that this specific channel has been exempted from verification because it was created prior to verification being required for channels of this type.This field cannot be modified using a standard UpdateNotificationChannel operation. To change the value of this field, you must call VerifyNotificationChannel. */
  verificationStatus?: "VERIFICATION_STATUS_UNSPECIFIED" | "UNVERIFIED" | "VERIFIED" | (string & {});
  /** Whether notifications are forwarded to the described channel. This makes it possible to disable delivery of notifications to a particular channel without removing the channel from all alerting policies that reference the channel. This is a more convenient approach when the change is temporary and you want to receive notifications from the same set of alerting policies on the channel at some point in the future. */
  enabled?: boolean;
  /** Record of the creation of this channel. */
  creationRecord?: MutationRecord;
  /** Records of the modification of this channel. */
  mutationRecords?: Array<MutationRecord>;
}

export const NotificationChannel: Schema.Schema<NotificationChannel> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  userLabels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  verificationStatus: Schema.optional(Schema.String),
  enabled: Schema.optional(Schema.Boolean),
  creationRecord: Schema.optional(MutationRecord),
  mutationRecords: Schema.optional(Schema.Array(MutationRecord)),
})).annotate({ identifier: "NotificationChannel" }) as any as Schema.Schema<NotificationChannel>;

export interface ListNotificationChannelsResponse {
  /** The notification channels defined for the specified project. */
  notificationChannels?: Array<NotificationChannel>;
  /** If not empty, indicates that there may be more results that match the request. Use the value in the page_token field in a subsequent request to fetch the next set of results. If empty, all results have been returned. */
  nextPageToken?: string;
  /** The total number of notification channels in all pages. This number is only an estimate, and may change in subsequent pages. https://aip.dev/158 */
  totalSize?: number;
}

export const ListNotificationChannelsResponse: Schema.Schema<ListNotificationChannelsResponse> = Schema.suspend(() => Schema.Struct({
  notificationChannels: Schema.optional(Schema.Array(NotificationChannel)),
  nextPageToken: Schema.optional(Schema.String),
  totalSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "ListNotificationChannelsResponse" }) as any as Schema.Schema<ListNotificationChannelsResponse>;

export interface SendNotificationChannelVerificationCodeRequest {
}

export const SendNotificationChannelVerificationCodeRequest: Schema.Schema<SendNotificationChannelVerificationCodeRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "SendNotificationChannelVerificationCodeRequest" }) as any as Schema.Schema<SendNotificationChannelVerificationCodeRequest>;

export interface GetNotificationChannelVerificationCodeRequest {
  /** The desired expiration time. If specified, the API will guarantee that the returned code will not be valid after the specified timestamp; however, the API cannot guarantee that the returned code will be valid for at least as long as the requested time (the API puts an upper bound on the amount of time for which a code may be valid). If omitted, a default expiration will be used, which may be less than the max permissible expiration (so specifying an expiration may extend the code's lifetime over omitting an expiration, even though the API does impose an upper limit on the maximum expiration that is permitted). */
  expireTime?: string;
}

export const GetNotificationChannelVerificationCodeRequest: Schema.Schema<GetNotificationChannelVerificationCodeRequest> = Schema.suspend(() => Schema.Struct({
  expireTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GetNotificationChannelVerificationCodeRequest" }) as any as Schema.Schema<GetNotificationChannelVerificationCodeRequest>;

export interface GetNotificationChannelVerificationCodeResponse {
  /** The verification code, which may be used to verify other channels that have an equivalent identity (i.e. other channels of the same type with the same fingerprint such as other email channels with the same email address or other sms channels with the same number). */
  code?: string;
  /** The expiration time associated with the code that was returned. If an expiration was provided in the request, this is the minimum of the requested expiration in the request and the max permitted expiration. */
  expireTime?: string;
}

export const GetNotificationChannelVerificationCodeResponse: Schema.Schema<GetNotificationChannelVerificationCodeResponse> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GetNotificationChannelVerificationCodeResponse" }) as any as Schema.Schema<GetNotificationChannelVerificationCodeResponse>;

export interface VerifyNotificationChannelRequest {
  /** Required. The verification code that was delivered to the channel as a result of invoking the SendNotificationChannelVerificationCode API method or that was retrieved from a verified channel via GetNotificationChannelVerificationCode. For example, one might have "G-123456" or "TKNZGhhd2EyN3I1MnRnMjRv" (in general, one is only guaranteed that the code is valid UTF-8; one should not make any assumptions regarding the structure or format of the code). */
  code?: string;
}

export const VerifyNotificationChannelRequest: Schema.Schema<VerifyNotificationChannelRequest> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
})).annotate({ identifier: "VerifyNotificationChannelRequest" }) as any as Schema.Schema<VerifyNotificationChannelRequest>;

export interface QueryTimeSeriesRequest {
  /** Required. The query in the Monitoring Query Language (https://cloud.google.com/monitoring/mql/reference) format. The default time zone is in UTC. */
  query?: string;
  /** A positive number that is the maximum number of time_series_data to return. */
  pageSize?: number;
  /** If this field is not empty then it must contain the nextPageToken value returned by a previous call to this method. Using this field causes the method to return additional results from the previous method call. */
  pageToken?: string;
}

export const QueryTimeSeriesRequest: Schema.Schema<QueryTimeSeriesRequest> = Schema.suspend(() => Schema.Struct({
  query: Schema.optional(Schema.String),
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "QueryTimeSeriesRequest" }) as any as Schema.Schema<QueryTimeSeriesRequest>;

export interface ValueDescriptor {
  /** The value key. */
  key?: string;
  /** The value type. */
  valueType?: "VALUE_TYPE_UNSPECIFIED" | "BOOL" | "INT64" | "DOUBLE" | "STRING" | "DISTRIBUTION" | "MONEY" | (string & {});
  /** The value stream kind. */
  metricKind?: "METRIC_KIND_UNSPECIFIED" | "GAUGE" | "DELTA" | "CUMULATIVE" | (string & {});
  /** The unit in which time_series point values are reported. unit follows the UCUM format for units as seen in https://unitsofmeasure.org/ucum.html. unit is only valid if value_type is INTEGER, DOUBLE, DISTRIBUTION. */
  unit?: string;
}

export const ValueDescriptor: Schema.Schema<ValueDescriptor> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  valueType: Schema.optional(Schema.String),
  metricKind: Schema.optional(Schema.String),
  unit: Schema.optional(Schema.String),
})).annotate({ identifier: "ValueDescriptor" }) as any as Schema.Schema<ValueDescriptor>;

export interface TimeSeriesDescriptor {
  /** Descriptors for the labels. */
  labelDescriptors?: Array<LabelDescriptor>;
  /** Descriptors for the point data value columns. */
  pointDescriptors?: Array<ValueDescriptor>;
}

export const TimeSeriesDescriptor: Schema.Schema<TimeSeriesDescriptor> = Schema.suspend(() => Schema.Struct({
  labelDescriptors: Schema.optional(Schema.Array(LabelDescriptor)),
  pointDescriptors: Schema.optional(Schema.Array(ValueDescriptor)),
})).annotate({ identifier: "TimeSeriesDescriptor" }) as any as Schema.Schema<TimeSeriesDescriptor>;

export interface LabelValue {
  /** A bool label value. */
  boolValue?: boolean;
  /** An int64 label value. */
  int64Value?: string;
  /** A string label value. */
  stringValue?: string;
}

export const LabelValue: Schema.Schema<LabelValue> = Schema.suspend(() => Schema.Struct({
  boolValue: Schema.optional(Schema.Boolean),
  int64Value: Schema.optional(Schema.String),
  stringValue: Schema.optional(Schema.String),
})).annotate({ identifier: "LabelValue" }) as any as Schema.Schema<LabelValue>;

export interface PointData {
  /** The values that make up the point. */
  values?: Array<TypedValue>;
  /** The time interval associated with the point. */
  timeInterval?: TimeInterval;
}

export const PointData: Schema.Schema<PointData> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(TypedValue)),
  timeInterval: Schema.optional(TimeInterval),
})).annotate({ identifier: "PointData" }) as any as Schema.Schema<PointData>;

export interface TimeSeriesData {
  /** The values of the labels in the time series identifier, given in the same order as the label_descriptors field of the TimeSeriesDescriptor associated with this object. Each value must have a value of the type given in the corresponding entry of label_descriptors. */
  labelValues?: Array<LabelValue>;
  /** The points in the time series. */
  pointData?: Array<PointData>;
}

export const TimeSeriesData: Schema.Schema<TimeSeriesData> = Schema.suspend(() => Schema.Struct({
  labelValues: Schema.optional(Schema.Array(LabelValue)),
  pointData: Schema.optional(Schema.Array(PointData)),
})).annotate({ identifier: "TimeSeriesData" }) as any as Schema.Schema<TimeSeriesData>;

export interface QueryTimeSeriesResponse {
  /** The descriptor for the time series data. */
  timeSeriesDescriptor?: TimeSeriesDescriptor;
  /** The time series data. */
  timeSeriesData?: Array<TimeSeriesData>;
  /** If there are more results than have been returned, then this field is set to a non-empty value. To see the additional results, use that value as page_token in the next call to this method. */
  nextPageToken?: string;
  /** Query execution errors that may have caused the time series data returned to be incomplete. The available data will be available in the response. */
  partialErrors?: Array<Status>;
}

export const QueryTimeSeriesResponse: Schema.Schema<QueryTimeSeriesResponse> = Schema.suspend(() => Schema.Struct({
  timeSeriesDescriptor: Schema.optional(TimeSeriesDescriptor),
  timeSeriesData: Schema.optional(Schema.Array(TimeSeriesData)),
  nextPageToken: Schema.optional(Schema.String),
  partialErrors: Schema.optional(Schema.Array(Status)),
})).annotate({ identifier: "QueryTimeSeriesResponse" }) as any as Schema.Schema<QueryTimeSeriesResponse>;

export interface Custom {
}

export const Custom: Schema.Schema<Custom> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Custom" }) as any as Schema.Schema<Custom>;

export interface AppEngine {
  /** The ID of the App Engine module underlying this service. Corresponds to the module_id resource label in the gae_app monitored resource (https://cloud.google.com/monitoring/api/resources#tag_gae_app). */
  moduleId?: string;
}

export const AppEngine: Schema.Schema<AppEngine> = Schema.suspend(() => Schema.Struct({
  moduleId: Schema.optional(Schema.String),
})).annotate({ identifier: "AppEngine" }) as any as Schema.Schema<AppEngine>;

export interface CloudEndpoints {
  /** The name of the Cloud Endpoints service underlying this service. Corresponds to the service resource label in the api monitored resource (https://cloud.google.com/monitoring/api/resources#tag_api). */
  service?: string;
}

export const CloudEndpoints: Schema.Schema<CloudEndpoints> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudEndpoints" }) as any as Schema.Schema<CloudEndpoints>;

export interface ClusterIstio {
  /** The location of the Kubernetes cluster in which this Istio service is defined. Corresponds to the location resource label in k8s_cluster resources. */
  location?: string;
  /** The name of the Kubernetes cluster in which this Istio service is defined. Corresponds to the cluster_name resource label in k8s_cluster resources. */
  clusterName?: string;
  /** The namespace of the Istio service underlying this service. Corresponds to the destination_service_namespace metric label in Istio metrics. */
  serviceNamespace?: string;
  /** The name of the Istio service underlying this service. Corresponds to the destination_service_name metric label in Istio metrics. */
  serviceName?: string;
}

export const ClusterIstio: Schema.Schema<ClusterIstio> = Schema.suspend(() => Schema.Struct({
  location: Schema.optional(Schema.String),
  clusterName: Schema.optional(Schema.String),
  serviceNamespace: Schema.optional(Schema.String),
  serviceName: Schema.optional(Schema.String),
})).annotate({ identifier: "ClusterIstio" }) as any as Schema.Schema<ClusterIstio>;

export interface MeshIstio {
  /** Identifier for the mesh in which this Istio service is defined. Corresponds to the mesh_uid metric label in Istio metrics. */
  meshUid?: string;
  /** The namespace of the Istio service underlying this service. Corresponds to the destination_service_namespace metric label in Istio metrics. */
  serviceNamespace?: string;
  /** The name of the Istio service underlying this service. Corresponds to the destination_service_name metric label in Istio metrics. */
  serviceName?: string;
}

export const MeshIstio: Schema.Schema<MeshIstio> = Schema.suspend(() => Schema.Struct({
  meshUid: Schema.optional(Schema.String),
  serviceNamespace: Schema.optional(Schema.String),
  serviceName: Schema.optional(Schema.String),
})).annotate({ identifier: "MeshIstio" }) as any as Schema.Schema<MeshIstio>;

export interface IstioCanonicalService {
  /** Identifier for the Istio mesh in which this canonical service is defined. Corresponds to the mesh_uid metric label in Istio metrics (https://cloud.google.com/monitoring/api/metrics_istio). */
  meshUid?: string;
  /** The namespace of the canonical service underlying this service. Corresponds to the destination_canonical_service_namespace metric label in Istio metrics (https://cloud.google.com/monitoring/api/metrics_istio). */
  canonicalServiceNamespace?: string;
  /** The name of the canonical service underlying this service. Corresponds to the destination_canonical_service_name metric label in label in Istio metrics (https://cloud.google.com/monitoring/api/metrics_istio). */
  canonicalService?: string;
}

export const IstioCanonicalService: Schema.Schema<IstioCanonicalService> = Schema.suspend(() => Schema.Struct({
  meshUid: Schema.optional(Schema.String),
  canonicalServiceNamespace: Schema.optional(Schema.String),
  canonicalService: Schema.optional(Schema.String),
})).annotate({ identifier: "IstioCanonicalService" }) as any as Schema.Schema<IstioCanonicalService>;

export interface CloudRun {
  /** The name of the Cloud Run service. Corresponds to the service_name resource label in the cloud_run_revision monitored resource (https://cloud.google.com/monitoring/api/resources#tag_cloud_run_revision). */
  serviceName?: string;
  /** The location the service is run. Corresponds to the location resource label in the cloud_run_revision monitored resource (https://cloud.google.com/monitoring/api/resources#tag_cloud_run_revision). */
  location?: string;
}

export const CloudRun: Schema.Schema<CloudRun> = Schema.suspend(() => Schema.Struct({
  serviceName: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudRun" }) as any as Schema.Schema<CloudRun>;

export interface GkeNamespace {
  /** Output only. The project this resource lives in. For legacy services migrated from the Custom type, this may be a distinct project from the one parenting the service itself. */
  projectId?: string;
  /** The location of the parent cluster. This may be a zone or region. */
  location?: string;
  /** The name of the parent cluster. */
  clusterName?: string;
  /** The name of this namespace. */
  namespaceName?: string;
}

export const GkeNamespace: Schema.Schema<GkeNamespace> = Schema.suspend(() => Schema.Struct({
  projectId: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  clusterName: Schema.optional(Schema.String),
  namespaceName: Schema.optional(Schema.String),
})).annotate({ identifier: "GkeNamespace" }) as any as Schema.Schema<GkeNamespace>;

export interface GkeWorkload {
  /** Output only. The project this resource lives in. For legacy services migrated from the Custom type, this may be a distinct project from the one parenting the service itself. */
  projectId?: string;
  /** The location of the parent cluster. This may be a zone or region. */
  location?: string;
  /** The name of the parent cluster. */
  clusterName?: string;
  /** The name of the parent namespace. */
  namespaceName?: string;
  /** The type of this workload (for example, "Deployment" or "DaemonSet") */
  topLevelControllerType?: string;
  /** The name of this workload. */
  topLevelControllerName?: string;
}

export const GkeWorkload: Schema.Schema<GkeWorkload> = Schema.suspend(() => Schema.Struct({
  projectId: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  clusterName: Schema.optional(Schema.String),
  namespaceName: Schema.optional(Schema.String),
  topLevelControllerType: Schema.optional(Schema.String),
  topLevelControllerName: Schema.optional(Schema.String),
})).annotate({ identifier: "GkeWorkload" }) as any as Schema.Schema<GkeWorkload>;

export interface GkeService {
  /** Output only. The project this resource lives in. For legacy services migrated from the Custom type, this may be a distinct project from the one parenting the service itself. */
  projectId?: string;
  /** The location of the parent cluster. This may be a zone or region. */
  location?: string;
  /** The name of the parent cluster. */
  clusterName?: string;
  /** The name of the parent namespace. */
  namespaceName?: string;
  /** The name of this service. */
  serviceName?: string;
}

export const GkeService: Schema.Schema<GkeService> = Schema.suspend(() => Schema.Struct({
  projectId: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  clusterName: Schema.optional(Schema.String),
  namespaceName: Schema.optional(Schema.String),
  serviceName: Schema.optional(Schema.String),
})).annotate({ identifier: "GkeService" }) as any as Schema.Schema<GkeService>;

export interface BasicService {
  /** The type of service that this basic service defines, e.g. APP_ENGINE service type. Documentation and valid values here (https://cloud.google.com/stackdriver/docs/solutions/slo-monitoring/api/api-structures#basic-svc-w-basic-sli). */
  serviceType?: string;
  /** Labels that specify the resource that emits the monitoring data which is used for SLO reporting of this Service. Documentation and valid values for given service types here (https://cloud.google.com/stackdriver/docs/solutions/slo-monitoring/api/api-structures#basic-svc-w-basic-sli). */
  serviceLabels?: Record<string, string>;
}

export const BasicService: Schema.Schema<BasicService> = Schema.suspend(() => Schema.Struct({
  serviceType: Schema.optional(Schema.String),
  serviceLabels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "BasicService" }) as any as Schema.Schema<BasicService>;

export interface Telemetry {
  /** The full name of the resource that defines this service. Formatted as described in https://cloud.google.com/apis/design/resource_names. */
  resourceName?: string;
}

export const Telemetry: Schema.Schema<Telemetry> = Schema.suspend(() => Schema.Struct({
  resourceName: Schema.optional(Schema.String),
})).annotate({ identifier: "Telemetry" }) as any as Schema.Schema<Telemetry>;

export interface Service {
  /** Identifier. Resource name for this Service. The format is: projects/[PROJECT_ID_OR_NUMBER]/services/[SERVICE_ID] */
  name?: string;
  /** Name used for UI elements listing this Service. */
  displayName?: string;
  /** Custom service type. */
  custom?: Custom;
  /** Type used for App Engine services. */
  appEngine?: AppEngine;
  /** Type used for Cloud Endpoints services. */
  cloudEndpoints?: CloudEndpoints;
  /** Type used for Istio services that live in a Kubernetes cluster. */
  clusterIstio?: ClusterIstio;
  /** Type used for Istio services scoped to an Istio mesh. */
  meshIstio?: MeshIstio;
  /** Type used for canonical services scoped to an Istio mesh. Metrics for Istio are documented here (https://istio.io/latest/docs/reference/config/metrics/) */
  istioCanonicalService?: IstioCanonicalService;
  /** Type used for Cloud Run services. */
  cloudRun?: CloudRun;
  /** Type used for GKE Namespaces. */
  gkeNamespace?: GkeNamespace;
  /** Type used for GKE Workloads. */
  gkeWorkload?: GkeWorkload;
  /** Type used for GKE Services (the Kubernetes concept of a service). */
  gkeService?: GkeService;
  /** Message that contains the service type and service labels of this service if it is a basic service. Documentation and examples here (https://cloud.google.com/stackdriver/docs/solutions/slo-monitoring/api/api-structures#basic-svc-w-basic-sli). */
  basicService?: BasicService;
  /** Configuration for how to query telemetry on a Service. */
  telemetry?: Telemetry;
  /** Labels which have been used to annotate the service. Label keys must start with a letter. Label keys and values may contain lowercase letters, numbers, underscores, and dashes. Label keys and values have a maximum length of 63 characters, and must be less than 128 bytes in size. Up to 64 label entries may be stored. For labels which do not have a semantic value, the empty string may be supplied for the label value. */
  userLabels?: Record<string, string>;
}

export const Service: Schema.Schema<Service> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  custom: Schema.optional(Custom),
  appEngine: Schema.optional(AppEngine),
  cloudEndpoints: Schema.optional(CloudEndpoints),
  clusterIstio: Schema.optional(ClusterIstio),
  meshIstio: Schema.optional(MeshIstio),
  istioCanonicalService: Schema.optional(IstioCanonicalService),
  cloudRun: Schema.optional(CloudRun),
  gkeNamespace: Schema.optional(GkeNamespace),
  gkeWorkload: Schema.optional(GkeWorkload),
  gkeService: Schema.optional(GkeService),
  basicService: Schema.optional(BasicService),
  telemetry: Schema.optional(Telemetry),
  userLabels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "Service" }) as any as Schema.Schema<Service>;

export interface ListServicesResponse {
  /** The Services matching the specified filter. */
  services?: Array<Service>;
  /** If there are more results than have been returned, then this field is set to a non-empty value. To see the additional results, use that value as page_token in the next call to this method. */
  nextPageToken?: string;
}

export const ListServicesResponse: Schema.Schema<ListServicesResponse> = Schema.suspend(() => Schema.Struct({
  services: Schema.optional(Schema.Array(Service)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListServicesResponse" }) as any as Schema.Schema<ListServicesResponse>;

export interface AvailabilityCriteria {
}

export const AvailabilityCriteria: Schema.Schema<AvailabilityCriteria> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AvailabilityCriteria" }) as any as Schema.Schema<AvailabilityCriteria>;

export interface LatencyCriteria {
  /** Good service is defined to be the count of requests made to this service that return in no more than threshold. */
  threshold?: string;
}

export const LatencyCriteria: Schema.Schema<LatencyCriteria> = Schema.suspend(() => Schema.Struct({
  threshold: Schema.optional(Schema.String),
})).annotate({ identifier: "LatencyCriteria" }) as any as Schema.Schema<LatencyCriteria>;

export interface BasicSli {
  /** OPTIONAL: The set of RPCs to which this SLI is relevant. Telemetry from other methods will not be used to calculate performance for this SLI. If omitted, this SLI applies to all the Service's methods. For service types that don't support breaking down by method, setting this field will result in an error. */
  method?: Array<string>;
  /** OPTIONAL: The set of locations to which this SLI is relevant. Telemetry from other locations will not be used to calculate performance for this SLI. If omitted, this SLI applies to all locations in which the Service has activity. For service types that don't support breaking down by location, setting this field will result in an error. */
  location?: Array<string>;
  /** OPTIONAL: The set of API versions to which this SLI is relevant. Telemetry from other API versions will not be used to calculate performance for this SLI. If omitted, this SLI applies to all API versions. For service types that don't support breaking down by version, setting this field will result in an error. */
  version?: Array<string>;
  /** Good service is defined to be the count of requests made to this service that return successfully. */
  availability?: AvailabilityCriteria;
  /** Good service is defined to be the count of requests made to this service that are fast enough with respect to latency.threshold. */
  latency?: LatencyCriteria;
}

export const BasicSli: Schema.Schema<BasicSli> = Schema.suspend(() => Schema.Struct({
  method: Schema.optional(Schema.Array(Schema.String)),
  location: Schema.optional(Schema.Array(Schema.String)),
  version: Schema.optional(Schema.Array(Schema.String)),
  availability: Schema.optional(AvailabilityCriteria),
  latency: Schema.optional(LatencyCriteria),
})).annotate({ identifier: "BasicSli" }) as any as Schema.Schema<BasicSli>;

export interface TimeSeriesRatio {
  /** A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) specifying a TimeSeries quantifying good service provided. Must have ValueType = DOUBLE or ValueType = INT64 and must have MetricKind = DELTA or MetricKind = CUMULATIVE. */
  goodServiceFilter?: string;
  /** A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) specifying a TimeSeries quantifying bad service, either demanded service that was not provided or demanded service that was of inadequate quality. Must have ValueType = DOUBLE or ValueType = INT64 and must have MetricKind = DELTA or MetricKind = CUMULATIVE. */
  badServiceFilter?: string;
  /** A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) specifying a TimeSeries quantifying total demanded service. Must have ValueType = DOUBLE or ValueType = INT64 and must have MetricKind = DELTA or MetricKind = CUMULATIVE. */
  totalServiceFilter?: string;
}

export const TimeSeriesRatio: Schema.Schema<TimeSeriesRatio> = Schema.suspend(() => Schema.Struct({
  goodServiceFilter: Schema.optional(Schema.String),
  badServiceFilter: Schema.optional(Schema.String),
  totalServiceFilter: Schema.optional(Schema.String),
})).annotate({ identifier: "TimeSeriesRatio" }) as any as Schema.Schema<TimeSeriesRatio>;

export interface GoogleMonitoringV3Range {
  /** Range minimum. */
  min?: number;
  /** Range maximum. */
  max?: number;
}

export const GoogleMonitoringV3Range: Schema.Schema<GoogleMonitoringV3Range> = Schema.suspend(() => Schema.Struct({
  min: Schema.optional(Schema.Number),
  max: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleMonitoringV3Range" }) as any as Schema.Schema<GoogleMonitoringV3Range>;

export interface DistributionCut {
  /** A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) specifying a TimeSeries aggregating values. Must have ValueType = DISTRIBUTION and MetricKind = DELTA or MetricKind = CUMULATIVE. */
  distributionFilter?: string;
  /** Range of values considered "good." For a one-sided range, set one bound to an infinite value. */
  range?: GoogleMonitoringV3Range;
}

export const DistributionCut: Schema.Schema<DistributionCut> = Schema.suspend(() => Schema.Struct({
  distributionFilter: Schema.optional(Schema.String),
  range: Schema.optional(GoogleMonitoringV3Range),
})).annotate({ identifier: "DistributionCut" }) as any as Schema.Schema<DistributionCut>;

export interface RequestBasedSli {
  /** good_total_ratio is used when the ratio of good_service to total_service is computed from two TimeSeries. */
  goodTotalRatio?: TimeSeriesRatio;
  /** distribution_cut is used when good_service is a count of values aggregated in a Distribution that fall into a good range. The total_service is the total count of all values aggregated in the Distribution. */
  distributionCut?: DistributionCut;
}

export const RequestBasedSli: Schema.Schema<RequestBasedSli> = Schema.suspend(() => Schema.Struct({
  goodTotalRatio: Schema.optional(TimeSeriesRatio),
  distributionCut: Schema.optional(DistributionCut),
})).annotate({ identifier: "RequestBasedSli" }) as any as Schema.Schema<RequestBasedSli>;

export interface PerformanceThreshold {
  /** RequestBasedSli to evaluate to judge window quality. */
  performance?: RequestBasedSli;
  /** BasicSli to evaluate to judge window quality. */
  basicSliPerformance?: BasicSli;
  /** If window performance >= threshold, the window is counted as good. */
  threshold?: number;
}

export const PerformanceThreshold: Schema.Schema<PerformanceThreshold> = Schema.suspend(() => Schema.Struct({
  performance: Schema.optional(RequestBasedSli),
  basicSliPerformance: Schema.optional(BasicSli),
  threshold: Schema.optional(Schema.Number),
})).annotate({ identifier: "PerformanceThreshold" }) as any as Schema.Schema<PerformanceThreshold>;

export interface MetricRange {
  /** A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) specifying the TimeSeries to use for evaluating window quality. */
  timeSeries?: string;
  /** Range of values considered "good." For a one-sided range, set one bound to an infinite value. */
  range?: GoogleMonitoringV3Range;
}

export const MetricRange: Schema.Schema<MetricRange> = Schema.suspend(() => Schema.Struct({
  timeSeries: Schema.optional(Schema.String),
  range: Schema.optional(GoogleMonitoringV3Range),
})).annotate({ identifier: "MetricRange" }) as any as Schema.Schema<MetricRange>;

export interface WindowsBasedSli {
  /** A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) specifying a TimeSeries with ValueType = BOOL. The window is good if any true values appear in the window. */
  goodBadMetricFilter?: string;
  /** A window is good if its performance is high enough. */
  goodTotalRatioThreshold?: PerformanceThreshold;
  /** A window is good if the metric's value is in a good range, averaged across returned streams. */
  metricMeanInRange?: MetricRange;
  /** A window is good if the metric's value is in a good range, summed across returned streams. */
  metricSumInRange?: MetricRange;
  /** Duration over which window quality is evaluated. Must be an integer fraction of a day and at least 60s. */
  windowPeriod?: string;
}

export const WindowsBasedSli: Schema.Schema<WindowsBasedSli> = Schema.suspend(() => Schema.Struct({
  goodBadMetricFilter: Schema.optional(Schema.String),
  goodTotalRatioThreshold: Schema.optional(PerformanceThreshold),
  metricMeanInRange: Schema.optional(MetricRange),
  metricSumInRange: Schema.optional(MetricRange),
  windowPeriod: Schema.optional(Schema.String),
})).annotate({ identifier: "WindowsBasedSli" }) as any as Schema.Schema<WindowsBasedSli>;

export interface ServiceLevelIndicator {
  /** Basic SLI on a well-known service type. */
  basicSli?: BasicSli;
  /** Request-based SLIs */
  requestBased?: RequestBasedSli;
  /** Windows-based SLIs */
  windowsBased?: WindowsBasedSli;
}

export const ServiceLevelIndicator: Schema.Schema<ServiceLevelIndicator> = Schema.suspend(() => Schema.Struct({
  basicSli: Schema.optional(BasicSli),
  requestBased: Schema.optional(RequestBasedSli),
  windowsBased: Schema.optional(WindowsBasedSli),
})).annotate({ identifier: "ServiceLevelIndicator" }) as any as Schema.Schema<ServiceLevelIndicator>;

export interface ServiceLevelObjective {
  /** Identifier. Resource name for this ServiceLevelObjective. The format is: projects/[PROJECT_ID_OR_NUMBER]/services/[SERVICE_ID]/serviceLevelObjectives/[SLO_NAME] */
  name?: string;
  /** Name used for UI elements listing this SLO. */
  displayName?: string;
  /** The definition of good service, used to measure and calculate the quality of the Service's performance with respect to a single aspect of service quality. */
  serviceLevelIndicator?: ServiceLevelIndicator;
  /** The fraction of service that must be good in order for this objective to be met. 0 < goal <= 0.9999. */
  goal?: number;
  /** A rolling time period, semantically "in the past ". Must be an integer multiple of 1 day no larger than 30 days. */
  rollingPeriod?: string;
  /** A calendar period, semantically "since the start of the current ". At this time, only DAY, WEEK, FORTNIGHT, and MONTH are supported. */
  calendarPeriod?: "CALENDAR_PERIOD_UNSPECIFIED" | "DAY" | "WEEK" | "FORTNIGHT" | "MONTH" | "QUARTER" | "HALF" | "YEAR" | (string & {});
  /** Labels which have been used to annotate the service-level objective. Label keys must start with a letter. Label keys and values may contain lowercase letters, numbers, underscores, and dashes. Label keys and values have a maximum length of 63 characters, and must be less than 128 bytes in size. Up to 64 label entries may be stored. For labels which do not have a semantic value, the empty string may be supplied for the label value. */
  userLabels?: Record<string, string>;
}

export const ServiceLevelObjective: Schema.Schema<ServiceLevelObjective> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  serviceLevelIndicator: Schema.optional(ServiceLevelIndicator),
  goal: Schema.optional(Schema.Number),
  rollingPeriod: Schema.optional(Schema.String),
  calendarPeriod: Schema.optional(Schema.String),
  userLabels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "ServiceLevelObjective" }) as any as Schema.Schema<ServiceLevelObjective>;

export interface ListServiceLevelObjectivesResponse {
  /** The ServiceLevelObjectives matching the specified filter. */
  serviceLevelObjectives?: Array<ServiceLevelObjective>;
  /** If there are more results than have been returned, then this field is set to a non-empty value. To see the additional results, use that value as page_token in the next call to this method. */
  nextPageToken?: string;
}

export const ListServiceLevelObjectivesResponse: Schema.Schema<ListServiceLevelObjectivesResponse> = Schema.suspend(() => Schema.Struct({
  serviceLevelObjectives: Schema.optional(Schema.Array(ServiceLevelObjective)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListServiceLevelObjectivesResponse" }) as any as Schema.Schema<ListServiceLevelObjectivesResponse>;

export interface Criteria {
  /** The specific AlertPolicy names for the alert that should be snoozed. The format is: projects/[PROJECT_ID_OR_NUMBER]/alertPolicies/[POLICY_ID] There is a limit of 16 policies per snooze. This limit is checked during snooze creation. Exactly 1 alert policy is required if filter is specified at the same time. */
  policies?: Array<string>;
  /** Optional. When you define a snooze, you can also define a filter for that snooze. The filter is a string containing one or more key-value pairs. The string uses the standard https://google.aip.dev/160 filter syntax. If you define a filter for a snooze, then the snooze can only apply to one alert policy. When the snooze is active, incidents won't be created when the incident would have key-value pairs (labels) that match those specified by the filter in the snooze.Snooze filters support resource, metric, and metadata labels. If multiple labels are used, then they must be connected with an AND operator. For example, the following filter applies the snooze to incidents that have a resource label with an instance ID of 1234567890, a metric label with an instance name of test_group, a metadata user label with a key of foo and a value of bar, and a metadata system label with a key of region and a value of us-central1: "filter": "resource.labels.instance_id=\"1234567890\" AND metric.labels.instance_name=\"test_group\" AND metadata.user_labels.foo=\"bar\" AND metadata.system_labels.region=\"us-central1\"" */
  filter?: string;
}

export const Criteria: Schema.Schema<Criteria> = Schema.suspend(() => Schema.Struct({
  policies: Schema.optional(Schema.Array(Schema.String)),
  filter: Schema.optional(Schema.String),
})).annotate({ identifier: "Criteria" }) as any as Schema.Schema<Criteria>;

export interface Snooze {
  /** Required. Identifier. The name of the Snooze. The format is: projects/[PROJECT_ID_OR_NUMBER]/snoozes/[SNOOZE_ID] The ID of the Snooze will be generated by the system. */
  name?: string;
  /** Required. This defines the criteria for applying the Snooze. See Criteria for more information. */
  criteria?: Criteria;
  /** Required. The Snooze will be active from interval.start_time through interval.end_time. interval.start_time cannot be in the past. There is a 15 second clock skew to account for the time it takes for a request to reach the API from the UI. */
  interval?: TimeInterval;
  /** Required. A display name for the Snooze. This can be, at most, 512 unicode characters. */
  displayName?: string;
}

export const Snooze: Schema.Schema<Snooze> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  criteria: Schema.optional(Criteria),
  interval: Schema.optional(TimeInterval),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "Snooze" }) as any as Schema.Schema<Snooze>;

export interface ListSnoozesResponse {
  /** Snoozes matching this list call. */
  snoozes?: Array<Snooze>;
  /** Page token for repeated calls to ListSnoozes, to fetch additional pages of results. If this is empty or missing, there are no more pages. */
  nextPageToken?: string;
}

export const ListSnoozesResponse: Schema.Schema<ListSnoozesResponse> = Schema.suspend(() => Schema.Struct({
  snoozes: Schema.optional(Schema.Array(Snooze)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListSnoozesResponse" }) as any as Schema.Schema<ListSnoozesResponse>;

export interface ResourceGroup {
  /** The group of resources being monitored. Should be only the [GROUP_ID], and not the full-path projects/[PROJECT_ID_OR_NUMBER]/groups/[GROUP_ID]. */
  groupId?: string;
  /** The resource type of the group members. */
  resourceType?: "RESOURCE_TYPE_UNSPECIFIED" | "INSTANCE" | "AWS_ELB_LOAD_BALANCER" | (string & {});
}

export const ResourceGroup: Schema.Schema<ResourceGroup> = Schema.suspend(() => Schema.Struct({
  groupId: Schema.optional(Schema.String),
  resourceType: Schema.optional(Schema.String),
})).annotate({ identifier: "ResourceGroup" }) as any as Schema.Schema<ResourceGroup>;

export interface CloudFunctionV2Target {
  /** Required. Fully qualified GCFv2 resource name i.e. projects/{project}/locations/{location}/functions/{function} Required. */
  name?: string;
  /** Output only. The cloud_run_revision Monitored Resource associated with the GCFv2. The Synthetic Monitor execution results (metrics, logs, and spans) are reported against this Monitored Resource. This field is output only. */
  cloudRunRevision?: MonitoredResource;
}

export const CloudFunctionV2Target: Schema.Schema<CloudFunctionV2Target> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  cloudRunRevision: Schema.optional(MonitoredResource),
})).annotate({ identifier: "CloudFunctionV2Target" }) as any as Schema.Schema<CloudFunctionV2Target>;

export interface SyntheticMonitorTarget {
  /** Target a Synthetic Monitor GCFv2 instance. */
  cloudFunctionV2?: CloudFunctionV2Target;
}

export const SyntheticMonitorTarget: Schema.Schema<SyntheticMonitorTarget> = Schema.suspend(() => Schema.Struct({
  cloudFunctionV2: Schema.optional(CloudFunctionV2Target),
})).annotate({ identifier: "SyntheticMonitorTarget" }) as any as Schema.Schema<SyntheticMonitorTarget>;

export interface BasicAuthentication {
  /** The username to use when authenticating with the HTTP server. */
  username?: string;
  /** The password to use when authenticating with the HTTP server. */
  password?: string;
}

export const BasicAuthentication: Schema.Schema<BasicAuthentication> = Schema.suspend(() => Schema.Struct({
  username: Schema.optional(Schema.String),
  password: Schema.optional(Schema.String),
})).annotate({ identifier: "BasicAuthentication" }) as any as Schema.Schema<BasicAuthentication>;

export interface ResponseStatusCode {
  /** A status code to accept. */
  statusValue?: number;
  /** A class of status codes to accept. */
  statusClass?: "STATUS_CLASS_UNSPECIFIED" | "STATUS_CLASS_1XX" | "STATUS_CLASS_2XX" | "STATUS_CLASS_3XX" | "STATUS_CLASS_4XX" | "STATUS_CLASS_5XX" | "STATUS_CLASS_ANY" | (string & {});
}

export const ResponseStatusCode: Schema.Schema<ResponseStatusCode> = Schema.suspend(() => Schema.Struct({
  statusValue: Schema.optional(Schema.Number),
  statusClass: Schema.optional(Schema.String),
})).annotate({ identifier: "ResponseStatusCode" }) as any as Schema.Schema<ResponseStatusCode>;

export interface PingConfig {
  /** Number of ICMP pings. A maximum of 3 ICMP pings is currently supported. */
  pingsCount?: number;
}

export const PingConfig: Schema.Schema<PingConfig> = Schema.suspend(() => Schema.Struct({
  pingsCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "PingConfig" }) as any as Schema.Schema<PingConfig>;

export interface ServiceAgentAuthentication {
  /** Type of authentication. */
  type?: "SERVICE_AGENT_AUTHENTICATION_TYPE_UNSPECIFIED" | "OIDC_TOKEN" | (string & {});
}

export const ServiceAgentAuthentication: Schema.Schema<ServiceAgentAuthentication> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "ServiceAgentAuthentication" }) as any as Schema.Schema<ServiceAgentAuthentication>;

export interface HttpCheck {
  /** The HTTP request method to use for the check. If set to METHOD_UNSPECIFIED then request_method defaults to GET. */
  requestMethod?: "METHOD_UNSPECIFIED" | "GET" | "POST" | (string & {});
  /** If true, use HTTPS instead of HTTP to run the check. */
  useSsl?: boolean;
  /** Optional (defaults to "/"). The path to the page against which to run the check. Will be combined with the host (specified within the monitored_resource) and port to construct the full URL. If the provided path does not begin with "/", a "/" will be prepended automatically. */
  path?: string;
  /** Optional (defaults to 80 when use_ssl is false, and 443 when use_ssl is true). The TCP port on the HTTP server against which to run the check. Will be combined with host (specified within the monitored_resource) and path to construct the full URL. */
  port?: number;
  /** The authentication information. Optional when creating an HTTP check; defaults to empty. Do not set both auth_method and auth_info. */
  authInfo?: BasicAuthentication;
  /** Boolean specifying whether to encrypt the header information. Encryption should be specified for any headers related to authentication that you do not wish to be seen when retrieving the configuration. The server will be responsible for encrypting the headers. On Get/List calls, if mask_headers is set to true then the headers will be obscured with ******. */
  maskHeaders?: boolean;
  /** The list of headers to send as part of the Uptime check request. If two headers have the same key and different values, they should be entered as a single header, with the value being a comma-separated list of all the desired values as described at https://www.w3.org/Protocols/rfc2616/rfc2616.txt (page 31). Entering two separate headers with the same key in a Create call will cause the first to be overwritten by the second. The maximum number of headers allowed is 100. */
  headers?: Record<string, string>;
  /** The content type header to use for the check. The following configurations result in errors: 1. Content type is specified in both the headers field and the content_type field. 2. Request method is GET and content_type is not TYPE_UNSPECIFIED 3. Request method is POST and content_type is TYPE_UNSPECIFIED. 4. Request method is POST and a "Content-Type" header is provided via headers field. The content_type field should be used instead. */
  contentType?: "TYPE_UNSPECIFIED" | "URL_ENCODED" | "USER_PROVIDED" | (string & {});
  /** A user provided content type header to use for the check. The invalid configurations outlined in the content_type field apply to custom_content_type, as well as the following: 1. content_type is URL_ENCODED and custom_content_type is set. 2. content_type is USER_PROVIDED and custom_content_type is not set. */
  customContentType?: string;
  /** Boolean specifying whether to include SSL certificate validation as a part of the Uptime check. Only applies to checks where monitored_resource is set to uptime_url. If use_ssl is false, setting validate_ssl to true has no effect. */
  validateSsl?: boolean;
  /** The request body associated with the HTTP POST request. If content_type is URL_ENCODED, the body passed in must be URL-encoded. Users can provide a Content-Length header via the headers field or the API will do so. If the request_method is GET and body is not empty, the API will return an error. The maximum byte size is 1 megabyte.Note: If client libraries aren't used (which performs the conversion automatically) base64 encode your body data since the field is of bytes type. */
  body?: string;
  /** If present, the check will only pass if the HTTP response status code is in this set of status codes. If empty, the HTTP status code will only pass if the HTTP status code is 200-299. */
  acceptedResponseStatusCodes?: Array<ResponseStatusCode>;
  /** Contains information needed to add pings to an HTTP check. */
  pingConfig?: PingConfig;
  /** If specified, Uptime will generate and attach an OIDC JWT token for the Monitoring service agent service account as an Authorization header in the HTTP request when probing. */
  serviceAgentAuthentication?: ServiceAgentAuthentication;
}

export const HttpCheck: Schema.Schema<HttpCheck> = Schema.suspend(() => Schema.Struct({
  requestMethod: Schema.optional(Schema.String),
  useSsl: Schema.optional(Schema.Boolean),
  path: Schema.optional(Schema.String),
  port: Schema.optional(Schema.Number),
  authInfo: Schema.optional(BasicAuthentication),
  maskHeaders: Schema.optional(Schema.Boolean),
  headers: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  contentType: Schema.optional(Schema.String),
  customContentType: Schema.optional(Schema.String),
  validateSsl: Schema.optional(Schema.Boolean),
  body: Schema.optional(Schema.String),
  acceptedResponseStatusCodes: Schema.optional(Schema.Array(ResponseStatusCode)),
  pingConfig: Schema.optional(PingConfig),
  serviceAgentAuthentication: Schema.optional(ServiceAgentAuthentication),
})).annotate({ identifier: "HttpCheck" }) as any as Schema.Schema<HttpCheck>;

export interface TcpCheck {
  /** The TCP port on the server against which to run the check. Will be combined with host (specified within the monitored_resource) to construct the full URL. Required. */
  port?: number;
  /** Contains information needed to add pings to a TCP check. */
  pingConfig?: PingConfig;
}

export const TcpCheck: Schema.Schema<TcpCheck> = Schema.suspend(() => Schema.Struct({
  port: Schema.optional(Schema.Number),
  pingConfig: Schema.optional(PingConfig),
})).annotate({ identifier: "TcpCheck" }) as any as Schema.Schema<TcpCheck>;

export interface JsonPathMatcher {
  /** JSONPath within the response output pointing to the expected ContentMatcher::content to match against. */
  jsonPath?: string;
  /** The type of JSONPath match that will be applied to the JSON output (ContentMatcher.content) */
  jsonMatcher?: "JSON_PATH_MATCHER_OPTION_UNSPECIFIED" | "EXACT_MATCH" | "REGEX_MATCH" | (string & {});
}

export const JsonPathMatcher: Schema.Schema<JsonPathMatcher> = Schema.suspend(() => Schema.Struct({
  jsonPath: Schema.optional(Schema.String),
  jsonMatcher: Schema.optional(Schema.String),
})).annotate({ identifier: "JsonPathMatcher" }) as any as Schema.Schema<JsonPathMatcher>;

export interface ContentMatcher {
  /** String, regex or JSON content to match. Maximum 1024 bytes. An empty content string indicates no content matching is to be performed. */
  content?: string;
  /** The type of content matcher that will be applied to the server output, compared to the content string when the check is run. */
  matcher?: "CONTENT_MATCHER_OPTION_UNSPECIFIED" | "CONTAINS_STRING" | "NOT_CONTAINS_STRING" | "MATCHES_REGEX" | "NOT_MATCHES_REGEX" | "MATCHES_JSON_PATH" | "NOT_MATCHES_JSON_PATH" | (string & {});
  /** Matcher information for MATCHES_JSON_PATH and NOT_MATCHES_JSON_PATH */
  jsonPathMatcher?: JsonPathMatcher;
}

export const ContentMatcher: Schema.Schema<ContentMatcher> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.String),
  matcher: Schema.optional(Schema.String),
  jsonPathMatcher: Schema.optional(JsonPathMatcher),
})).annotate({ identifier: "ContentMatcher" }) as any as Schema.Schema<ContentMatcher>;

export interface InternalChecker {
  /** A unique resource name for this InternalChecker. The format is: projects/[PROJECT_ID_OR_NUMBER]/internalCheckers/[INTERNAL_CHECKER_ID] [PROJECT_ID_OR_NUMBER] is the Cloud Monitoring Metrics Scope project for the Uptime check config associated with the internal checker. */
  name?: string;
  /** The checker's human-readable name. The display name should be unique within a Cloud Monitoring Metrics Scope in order to make it easier to identify; however, uniqueness is not enforced. */
  displayName?: string;
  /** The GCP VPC network (https://cloud.google.com/vpc/docs/vpc) where the internal resource lives (ex: "default"). */
  network?: string;
  /** The GCP zone the Uptime check should egress from. Only respected for internal Uptime checks, where internal_network is specified. */
  gcpZone?: string;
  /** The GCP project ID where the internal checker lives. Not necessary the same as the Metrics Scope project. */
  peerProjectId?: string;
  /** The current operational state of the internal checker. */
  state?: "UNSPECIFIED" | "CREATING" | "RUNNING" | (string & {});
}

export const InternalChecker: Schema.Schema<InternalChecker> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  network: Schema.optional(Schema.String),
  gcpZone: Schema.optional(Schema.String),
  peerProjectId: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "InternalChecker" }) as any as Schema.Schema<InternalChecker>;

export interface UptimeCheckConfig {
  /** Identifier. A unique resource name for this Uptime check configuration. The format is: projects/[PROJECT_ID_OR_NUMBER]/uptimeCheckConfigs/[UPTIME_CHECK_ID] [PROJECT_ID_OR_NUMBER] is the Workspace host project associated with the Uptime check.This field should be omitted when creating the Uptime check configuration; on create, the resource name is assigned by the server and included in the response. */
  name?: string;
  /** A human-friendly name for the Uptime check configuration. The display name should be unique within a Cloud Monitoring Workspace in order to make it easier to identify; however, uniqueness is not enforced. Required. */
  displayName?: string;
  /** The monitored resource (https://cloud.google.com/monitoring/api/resources) associated with the configuration. The following monitored resource types are valid for this field: uptime_url, gce_instance, gae_app, aws_ec2_instance, aws_elb_load_balancer k8s_service servicedirectory_service cloud_run_revision */
  monitoredResource?: MonitoredResource;
  /** The group resource associated with the configuration. */
  resourceGroup?: ResourceGroup;
  /** Specifies a Synthetic Monitor to invoke. */
  syntheticMonitor?: SyntheticMonitorTarget;
  /** Contains information needed to make an HTTP or HTTPS check. */
  httpCheck?: HttpCheck;
  /** Contains information needed to make a TCP check. */
  tcpCheck?: TcpCheck;
  /** How often, in seconds, the Uptime check is performed. Currently, the only supported values are 60s (1 minute), 300s (5 minutes), 600s (10 minutes), and 900s (15 minutes). Optional, defaults to 60s. */
  period?: string;
  /** The maximum amount of time to wait for the request to complete (must be between 1 and 60 seconds). Required. */
  timeout?: string;
  /** The content that is expected to appear in the data returned by the target server against which the check is run. Currently, only the first entry in the content_matchers list is supported, and additional entries will be ignored. This field is optional and should only be specified if a content match is required as part of the/ Uptime check. */
  contentMatchers?: Array<ContentMatcher>;
  /** The type of checkers to use to execute the Uptime check. */
  checkerType?: "CHECKER_TYPE_UNSPECIFIED" | "STATIC_IP_CHECKERS" | "VPC_CHECKERS" | (string & {});
  /** Whether the check is disabled or not. */
  disabled?: boolean;
  /** The list of regions from which the check will be run. Some regions contain one location, and others contain more than one. If this field is specified, enough regions must be provided to include a minimum of 3 locations. Not specifying this field will result in Uptime checks running from all available regions. */
  selectedRegions?: Array<"REGION_UNSPECIFIED" | "USA" | "EUROPE" | "SOUTH_AMERICA" | "ASIA_PACIFIC" | "USA_OREGON" | "USA_IOWA" | "USA_VIRGINIA" | (string & {})>;
  /** To specify whether to log the results of failed probes to Cloud Logging. */
  logCheckFailures?: boolean;
  /** If this is true, then checks are made only from the 'internal_checkers'. If it is false, then checks are made only from the 'selected_regions'. It is an error to provide 'selected_regions' when is_internal is true, or to provide 'internal_checkers' when is_internal is false. */
  isInternal?: boolean;
  /** The internal checkers that this check will egress from. If is_internal is true and this list is empty, the check will egress from all the InternalCheckers configured for the project that owns this UptimeCheckConfig. */
  internalCheckers?: Array<InternalChecker>;
  /** User-supplied key/value data to be used for organizing and identifying the UptimeCheckConfig objects.The field can contain up to 64 entries. Each key and value is limited to 63 Unicode characters or 128 bytes, whichever is smaller. Labels and values can contain only lowercase letters, numerals, underscores, and dashes. Keys must begin with a letter. */
  userLabels?: Record<string, string>;
}

export const UptimeCheckConfig: Schema.Schema<UptimeCheckConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  monitoredResource: Schema.optional(MonitoredResource),
  resourceGroup: Schema.optional(ResourceGroup),
  syntheticMonitor: Schema.optional(SyntheticMonitorTarget),
  httpCheck: Schema.optional(HttpCheck),
  tcpCheck: Schema.optional(TcpCheck),
  period: Schema.optional(Schema.String),
  timeout: Schema.optional(Schema.String),
  contentMatchers: Schema.optional(Schema.Array(ContentMatcher)),
  checkerType: Schema.optional(Schema.String),
  disabled: Schema.optional(Schema.Boolean),
  selectedRegions: Schema.optional(Schema.Array(Schema.String)),
  logCheckFailures: Schema.optional(Schema.Boolean),
  isInternal: Schema.optional(Schema.Boolean),
  internalCheckers: Schema.optional(Schema.Array(InternalChecker)),
  userLabels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "UptimeCheckConfig" }) as any as Schema.Schema<UptimeCheckConfig>;

export interface ListUptimeCheckConfigsResponse {
  /** The returned Uptime check configurations. */
  uptimeCheckConfigs?: Array<UptimeCheckConfig>;
  /** This field represents the pagination token to retrieve the next page of results. If the value is empty, it means no further results for the request. To retrieve the next page of results, the value of the next_page_token is passed to the subsequent List method call (in the request message's page_token field). */
  nextPageToken?: string;
  /** The total number of Uptime check configurations for the project, irrespective of any pagination. */
  totalSize?: number;
}

export const ListUptimeCheckConfigsResponse: Schema.Schema<ListUptimeCheckConfigsResponse> = Schema.suspend(() => Schema.Struct({
  uptimeCheckConfigs: Schema.optional(Schema.Array(UptimeCheckConfig)),
  nextPageToken: Schema.optional(Schema.String),
  totalSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "ListUptimeCheckConfigsResponse" }) as any as Schema.Schema<ListUptimeCheckConfigsResponse>;

export interface UptimeCheckIp {
  /** A broad region category in which the IP address is located. */
  region?: "REGION_UNSPECIFIED" | "USA" | "EUROPE" | "SOUTH_AMERICA" | "ASIA_PACIFIC" | "USA_OREGON" | "USA_IOWA" | "USA_VIRGINIA" | (string & {});
  /** A more specific location within the region that typically encodes a particular city/town/metro (and its containing state/province or country) within the broader umbrella region category. */
  location?: string;
  /** The IP address from which the Uptime check originates. This is a fully specified IP address (not an IP address range). Most IP addresses, as of this publication, are in IPv4 format; however, one should not rely on the IP addresses being in IPv4 format indefinitely, and should support interpreting this field in either IPv4 or IPv6 format. */
  ipAddress?: string;
}

export const UptimeCheckIp: Schema.Schema<UptimeCheckIp> = Schema.suspend(() => Schema.Struct({
  region: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  ipAddress: Schema.optional(Schema.String),
})).annotate({ identifier: "UptimeCheckIp" }) as any as Schema.Schema<UptimeCheckIp>;

export interface ListUptimeCheckIpsResponse {
  /** The returned list of IP addresses (including region and location) that the checkers run from. */
  uptimeCheckIps?: Array<UptimeCheckIp>;
  /** This field represents the pagination token to retrieve the next page of results. If the value is empty, it means no further results for the request. To retrieve the next page of results, the value of the next_page_token is passed to the subsequent List method call (in the request message's page_token field). NOTE: this field is not yet implemented */
  nextPageToken?: string;
}

export const ListUptimeCheckIpsResponse: Schema.Schema<ListUptimeCheckIpsResponse> = Schema.suspend(() => Schema.Struct({
  uptimeCheckIps: Schema.optional(Schema.Array(UptimeCheckIp)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListUptimeCheckIpsResponse" }) as any as Schema.Schema<ListUptimeCheckIpsResponse>;

export interface Option {
  /** The option's name. For protobuf built-in options (options defined in descriptor.proto), this is the short name. For example, "map_entry". For custom options, it should be the fully-qualified name. For example, "google.api.http". */
  name?: string;
  /** The option's value packed in an Any message. If the value is a primitive, the corresponding wrapper type defined in google/protobuf/wrappers.proto should be used. If the value is an enum, it should be stored as an int32 value using the google.protobuf.Int32Value type. */
  value?: Record<string, unknown>;
}

export const Option: Schema.Schema<Option> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Option" }) as any as Schema.Schema<Option>;

export interface Field {
  /** The field type. */
  kind?: "TYPE_UNKNOWN" | "TYPE_DOUBLE" | "TYPE_FLOAT" | "TYPE_INT64" | "TYPE_UINT64" | "TYPE_INT32" | "TYPE_FIXED64" | "TYPE_FIXED32" | "TYPE_BOOL" | "TYPE_STRING" | "TYPE_GROUP" | "TYPE_MESSAGE" | "TYPE_BYTES" | "TYPE_UINT32" | "TYPE_ENUM" | "TYPE_SFIXED32" | "TYPE_SFIXED64" | "TYPE_SINT32" | "TYPE_SINT64" | (string & {});
  /** The field cardinality. */
  cardinality?: "CARDINALITY_UNKNOWN" | "CARDINALITY_OPTIONAL" | "CARDINALITY_REQUIRED" | "CARDINALITY_REPEATED" | (string & {});
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

export const Field: Schema.Schema<Field> = Schema.suspend(() => Schema.Struct({
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
})).annotate({ identifier: "Field" }) as any as Schema.Schema<Field>;

export interface SourceContext {
  /** The path-qualified name of the .proto file that contained the associated protobuf element. For example: "google/protobuf/source_context.proto". */
  fileName?: string;
}

export const SourceContext: Schema.Schema<SourceContext> = Schema.suspend(() => Schema.Struct({
  fileName: Schema.optional(Schema.String),
})).annotate({ identifier: "SourceContext" }) as any as Schema.Schema<SourceContext>;

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
  syntax?: "SYNTAX_PROTO2" | "SYNTAX_PROTO3" | "SYNTAX_EDITIONS" | (string & {});
  /** The source edition string, only valid when syntax is SYNTAX_EDITIONS. */
  edition?: string;
}

export const Type: Schema.Schema<Type> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  fields: Schema.optional(Schema.Array(Field)),
  oneofs: Schema.optional(Schema.Array(Schema.String)),
  options: Schema.optional(Schema.Array(Option)),
  sourceContext: Schema.optional(SourceContext),
  syntax: Schema.optional(Schema.String),
  edition: Schema.optional(Schema.String),
})).annotate({ identifier: "Type" }) as any as Schema.Schema<Type>;

export interface DroppedLabels {
  /** Map from label to its value, for all labels dropped in any aggregation. */
  label?: Record<string, string>;
}

export const DroppedLabels: Schema.Schema<DroppedLabels> = Schema.suspend(() => Schema.Struct({
  label: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "DroppedLabels" }) as any as Schema.Schema<DroppedLabels>;

export interface SpanContext {
  /** The resource name of the span. The format is: projects/[PROJECT_ID_OR_NUMBER]/traces/[TRACE_ID]/spans/[SPAN_ID] [TRACE_ID] is a unique identifier for a trace within a project; it is a 32-character hexadecimal encoding of a 16-byte array.[SPAN_ID] is a unique identifier for a span within a trace; it is a 16-character hexadecimal encoding of an 8-byte array. */
  spanName?: string;
}

export const SpanContext: Schema.Schema<SpanContext> = Schema.suspend(() => Schema.Struct({
  spanName: Schema.optional(Schema.String),
})).annotate({ identifier: "SpanContext" }) as any as Schema.Schema<SpanContext>;

export interface OperationMetadata {
  /** Current state of the batch operation. */
  state?: "STATE_UNSPECIFIED" | "CREATED" | "RUNNING" | "DONE" | "CANCELLED" | (string & {});
  /** The time when the batch request was received. */
  createTime?: string;
  /** The time when the operation result was last updated. */
  updateTime?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists monitored resource descriptors that match a filter. */
export interface ListProjectsMonitoredResourceDescriptorsRequest {
  /** Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) on which to execute the request. The format is: projects/[PROJECT_ID_OR_NUMBER] */
  name: string;
  /** An optional filter (https://cloud.google.com/monitoring/api/v3/filters) describing the descriptors to be returned. The filter can reference the descriptor's type and labels. For example, the following filter returns only Google Compute Engine descriptors that have an id label: resource.type = starts_with("gce_") AND resource.label:id */
  filter?: string;
  /** A positive number that is the maximum number of results to return. */
  pageSize?: number;
  /** If this field is not empty then it must contain the nextPageToken value returned by a previous call to this method. Using this field causes the method to return additional results from the previous method call. */
  pageToken?: string;
}

export const ListProjectsMonitoredResourceDescriptorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/monitoredResourceDescriptors" }),
  svc,
) as unknown as Schema.Schema<ListProjectsMonitoredResourceDescriptorsRequest>;

export type ListProjectsMonitoredResourceDescriptorsResponse = ListMonitoredResourceDescriptorsResponse;
export const ListProjectsMonitoredResourceDescriptorsResponse = ListMonitoredResourceDescriptorsResponse;

export type ListProjectsMonitoredResourceDescriptorsError = CommonErrors;

export const listProjectsMonitoredResourceDescriptors = API.makePaginated(() => ({
  input: ListProjectsMonitoredResourceDescriptorsRequest,
  output: ListProjectsMonitoredResourceDescriptorsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a single monitored resource descriptor. */
export interface GetProjectsMonitoredResourceDescriptorsRequest {
  /** Required. The monitored resource descriptor to get. The format is: projects/[PROJECT_ID_OR_NUMBER]/monitoredResourceDescriptors/[RESOURCE_TYPE] The [RESOURCE_TYPE] is a predefined type, such as cloudsql_database. */
  name: string;
}

export const GetProjectsMonitoredResourceDescriptorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/monitoredResourceDescriptors/{monitoredResourceDescriptorsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsMonitoredResourceDescriptorsRequest>;

export type GetProjectsMonitoredResourceDescriptorsResponse = MonitoredResourceDescriptor;
export const GetProjectsMonitoredResourceDescriptorsResponse = MonitoredResourceDescriptor;

export type GetProjectsMonitoredResourceDescriptorsError = CommonErrors;

export const getProjectsMonitoredResourceDescriptors: API.OperationMethod<GetProjectsMonitoredResourceDescriptorsRequest, GetProjectsMonitoredResourceDescriptorsResponse, GetProjectsMonitoredResourceDescriptorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsMonitoredResourceDescriptorsRequest,
  output: GetProjectsMonitoredResourceDescriptorsResponse,
  errors: [],
}));

/** Lists metric descriptors that match a filter. */
export interface ListProjectsMetricDescriptorsRequest {
  /** Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) on which to execute the request. The format is: projects/[PROJECT_ID_OR_NUMBER] */
  name: string;
  /** Optional. If this field is empty, all custom and system-defined metric descriptors are returned. Otherwise, the filter (https://cloud.google.com/monitoring/api/v3/filters) specifies which metric descriptors are to be returned. For example, the following filter matches all custom metrics (https://cloud.google.com/monitoring/custom-metrics): metric.type = starts_with("custom.googleapis.com/") */
  filter?: string;
  /** Optional. A positive number that is the maximum number of results to return. The default and maximum value is 10,000. If a page_size <= 0 or > 10,000 is submitted, will instead return a maximum of 10,000 results. */
  pageSize?: number;
  /** Optional. If this field is not empty then it must contain the nextPageToken value returned by a previous call to this method. Using this field causes the method to return additional results from the previous method call. */
  pageToken?: string;
  /** Optional. If true, only metrics and monitored resource types that have recent data (within roughly 25 hours) will be included in the response. - If a metric descriptor enumerates monitored resource types, only the monitored resource types for which the metric type has recent data will be included in the returned metric descriptor, and if none of them have recent data, the metric descriptor will not be returned. - If a metric descriptor does not enumerate the compatible monitored resource types, it will be returned only if the metric type has recent data for some monitored resource type. The returned descriptor will not enumerate any monitored resource types. */
  activeOnly?: boolean;
}

export const ListProjectsMetricDescriptorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  activeOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("activeOnly")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/metricDescriptors" }),
  svc,
) as unknown as Schema.Schema<ListProjectsMetricDescriptorsRequest>;

export type ListProjectsMetricDescriptorsResponse = ListMetricDescriptorsResponse;
export const ListProjectsMetricDescriptorsResponse = ListMetricDescriptorsResponse;

export type ListProjectsMetricDescriptorsError = CommonErrors;

export const listProjectsMetricDescriptors = API.makePaginated(() => ({
  input: ListProjectsMetricDescriptorsRequest,
  output: ListProjectsMetricDescriptorsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a single metric descriptor. */
export interface GetProjectsMetricDescriptorsRequest {
  /** Required. The metric descriptor on which to execute the request. The format is: projects/[PROJECT_ID_OR_NUMBER]/metricDescriptors/[METRIC_ID] An example value of [METRIC_ID] is "compute.googleapis.com/instance/disk/read_bytes_count". */
  name: string;
}

export const GetProjectsMetricDescriptorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/metricDescriptors/{metricDescriptorsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsMetricDescriptorsRequest>;

export type GetProjectsMetricDescriptorsResponse = MetricDescriptor;
export const GetProjectsMetricDescriptorsResponse = MetricDescriptor;

export type GetProjectsMetricDescriptorsError = CommonErrors;

export const getProjectsMetricDescriptors: API.OperationMethod<GetProjectsMetricDescriptorsRequest, GetProjectsMetricDescriptorsResponse, GetProjectsMetricDescriptorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsMetricDescriptorsRequest,
  output: GetProjectsMetricDescriptorsResponse,
  errors: [],
}));

/** Creates a new metric descriptor. The creation is executed asynchronously. User-created metric descriptors define custom metrics (https://cloud.google.com/monitoring/custom-metrics). The metric descriptor is updated if it already exists, except that metric labels are never removed. */
export interface CreateProjectsMetricDescriptorsRequest {
  /** Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) on which to execute the request. The format is: 4 projects/PROJECT_ID_OR_NUMBER */
  name: string;
  /** Request body */
  body?: MetricDescriptor;
}

export const CreateProjectsMetricDescriptorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(MetricDescriptor).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/metricDescriptors", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsMetricDescriptorsRequest>;

export type CreateProjectsMetricDescriptorsResponse = MetricDescriptor;
export const CreateProjectsMetricDescriptorsResponse = MetricDescriptor;

export type CreateProjectsMetricDescriptorsError = CommonErrors;

export const createProjectsMetricDescriptors: API.OperationMethod<CreateProjectsMetricDescriptorsRequest, CreateProjectsMetricDescriptorsResponse, CreateProjectsMetricDescriptorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsMetricDescriptorsRequest,
  output: CreateProjectsMetricDescriptorsResponse,
  errors: [],
}));

/** Deletes a metric descriptor. Only user-created custom metrics (https://cloud.google.com/monitoring/custom-metrics) can be deleted. */
export interface DeleteProjectsMetricDescriptorsRequest {
  /** Required. The metric descriptor on which to execute the request. The format is: projects/[PROJECT_ID_OR_NUMBER]/metricDescriptors/[METRIC_ID] An example of [METRIC_ID] is: "custom.googleapis.com/my_test_metric". */
  name: string;
}

export const DeleteProjectsMetricDescriptorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/projects/{projectsId}/metricDescriptors/{metricDescriptorsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsMetricDescriptorsRequest>;

export type DeleteProjectsMetricDescriptorsResponse = Empty;
export const DeleteProjectsMetricDescriptorsResponse = Empty;

export type DeleteProjectsMetricDescriptorsError = CommonErrors;

export const deleteProjectsMetricDescriptors: API.OperationMethod<DeleteProjectsMetricDescriptorsRequest, DeleteProjectsMetricDescriptorsResponse, DeleteProjectsMetricDescriptorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsMetricDescriptorsRequest,
  output: DeleteProjectsMetricDescriptorsResponse,
  errors: [],
}));

/** Lists time series that match a filter. */
export interface ListProjectsTimeSeriesRequest {
  /** Required. The project (https://cloud.google.com/monitoring/api/v3#project_name), organization or folder on which to execute the request. The format is: projects/[PROJECT_ID_OR_NUMBER] organizations/[ORGANIZATION_ID] folders/[FOLDER_ID] */
  name: string;
  /** Required. A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) that specifies which time series should be returned. The filter must specify a single metric type, and can additionally specify metric labels and other information. For example: metric.type = "compute.googleapis.com/instance/cpu/usage_time" AND metric.labels.instance_name = "my-instance-name" */
  filter?: string;
  /** Required. The end of the time interval. */
  "interval.endTime"?: string;
  /** Optional. The beginning of the time interval. The default value for the start time is the end time. The start time must not be later than the end time. */
  "interval.startTime"?: string;
  /** The alignment_period specifies a time interval, in seconds, that is used to divide the data in all the time series into consistent blocks of time. This will be done before the per-series aligner can be applied to the data.The value must be at least 60 seconds. If a per-series aligner other than ALIGN_NONE is specified, this field is required or an error is returned. If no per-series aligner is specified, or the aligner ALIGN_NONE is specified, then this field is ignored.The maximum value of the alignment_period is 104 weeks (2 years) for charts, and 90,000 seconds (25 hours) for alerting policies. */
  "aggregation.alignmentPeriod"?: string;
  /** An Aligner describes how to bring the data points in a single time series into temporal alignment. Except for ALIGN_NONE, all alignments cause all the data points in an alignment_period to be mathematically grouped together, resulting in a single data point for each alignment_period with end timestamp at the end of the period.Not all alignment operations may be applied to all time series. The valid choices depend on the metric_kind and value_type of the original time series. Alignment can change the metric_kind or the value_type of the time series.Time series data must be aligned in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified and not equal to ALIGN_NONE and alignment_period must be specified; otherwise, an error is returned. */
  "aggregation.perSeriesAligner"?: "ALIGN_NONE" | "ALIGN_DELTA" | "ALIGN_RATE" | "ALIGN_INTERPOLATE" | "ALIGN_NEXT_OLDER" | "ALIGN_MIN" | "ALIGN_MAX" | "ALIGN_MEAN" | "ALIGN_COUNT" | "ALIGN_SUM" | "ALIGN_STDDEV" | "ALIGN_COUNT_TRUE" | "ALIGN_COUNT_FALSE" | "ALIGN_FRACTION_TRUE" | "ALIGN_PERCENTILE_99" | "ALIGN_PERCENTILE_95" | "ALIGN_PERCENTILE_50" | "ALIGN_PERCENTILE_05" | "ALIGN_PERCENT_CHANGE" | (string & {});
  /** The reduction operation to be used to combine time series into a single time series, where the value of each data point in the resulting series is a function of all the already aligned values in the input time series.Not all reducer operations can be applied to all time series. The valid choices depend on the metric_kind and the value_type of the original time series. Reduction can yield a time series with a different metric_kind or value_type than the input time series.Time series data must first be aligned (see per_series_aligner) in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified, and must not be ALIGN_NONE. An alignment_period must also be specified; otherwise, an error is returned. */
  "aggregation.crossSeriesReducer"?: "REDUCE_NONE" | "REDUCE_MEAN" | "REDUCE_MIN" | "REDUCE_MAX" | "REDUCE_SUM" | "REDUCE_STDDEV" | "REDUCE_COUNT" | "REDUCE_COUNT_TRUE" | "REDUCE_COUNT_FALSE" | "REDUCE_FRACTION_TRUE" | "REDUCE_PERCENTILE_99" | "REDUCE_PERCENTILE_95" | "REDUCE_PERCENTILE_50" | "REDUCE_PERCENTILE_05" | (string & {});
  /** The set of fields to preserve when cross_series_reducer is specified. The group_by_fields determine how the time series are partitioned into subsets prior to applying the aggregation operation. Each subset contains time series that have the same value for each of the grouping fields. Each individual time series is a member of exactly one subset. The cross_series_reducer is applied to each subset of time series. It is not possible to reduce across different resource types, so this field implicitly contains resource.type. Fields not specified in group_by_fields are aggregated away. If group_by_fields is not specified and all the time series have the same resource type, then the time series are aggregated into a single output time series. If cross_series_reducer is not defined, this field is ignored. */
  "aggregation.groupByFields"?: string[];
  /** The alignment_period specifies a time interval, in seconds, that is used to divide the data in all the time series into consistent blocks of time. This will be done before the per-series aligner can be applied to the data.The value must be at least 60 seconds. If a per-series aligner other than ALIGN_NONE is specified, this field is required or an error is returned. If no per-series aligner is specified, or the aligner ALIGN_NONE is specified, then this field is ignored.The maximum value of the alignment_period is 104 weeks (2 years) for charts, and 90,000 seconds (25 hours) for alerting policies. */
  "secondaryAggregation.alignmentPeriod"?: string;
  /** An Aligner describes how to bring the data points in a single time series into temporal alignment. Except for ALIGN_NONE, all alignments cause all the data points in an alignment_period to be mathematically grouped together, resulting in a single data point for each alignment_period with end timestamp at the end of the period.Not all alignment operations may be applied to all time series. The valid choices depend on the metric_kind and value_type of the original time series. Alignment can change the metric_kind or the value_type of the time series.Time series data must be aligned in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified and not equal to ALIGN_NONE and alignment_period must be specified; otherwise, an error is returned. */
  "secondaryAggregation.perSeriesAligner"?: "ALIGN_NONE" | "ALIGN_DELTA" | "ALIGN_RATE" | "ALIGN_INTERPOLATE" | "ALIGN_NEXT_OLDER" | "ALIGN_MIN" | "ALIGN_MAX" | "ALIGN_MEAN" | "ALIGN_COUNT" | "ALIGN_SUM" | "ALIGN_STDDEV" | "ALIGN_COUNT_TRUE" | "ALIGN_COUNT_FALSE" | "ALIGN_FRACTION_TRUE" | "ALIGN_PERCENTILE_99" | "ALIGN_PERCENTILE_95" | "ALIGN_PERCENTILE_50" | "ALIGN_PERCENTILE_05" | "ALIGN_PERCENT_CHANGE" | (string & {});
  /** The reduction operation to be used to combine time series into a single time series, where the value of each data point in the resulting series is a function of all the already aligned values in the input time series.Not all reducer operations can be applied to all time series. The valid choices depend on the metric_kind and the value_type of the original time series. Reduction can yield a time series with a different metric_kind or value_type than the input time series.Time series data must first be aligned (see per_series_aligner) in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified, and must not be ALIGN_NONE. An alignment_period must also be specified; otherwise, an error is returned. */
  "secondaryAggregation.crossSeriesReducer"?: "REDUCE_NONE" | "REDUCE_MEAN" | "REDUCE_MIN" | "REDUCE_MAX" | "REDUCE_SUM" | "REDUCE_STDDEV" | "REDUCE_COUNT" | "REDUCE_COUNT_TRUE" | "REDUCE_COUNT_FALSE" | "REDUCE_FRACTION_TRUE" | "REDUCE_PERCENTILE_99" | "REDUCE_PERCENTILE_95" | "REDUCE_PERCENTILE_50" | "REDUCE_PERCENTILE_05" | (string & {});
  /** The set of fields to preserve when cross_series_reducer is specified. The group_by_fields determine how the time series are partitioned into subsets prior to applying the aggregation operation. Each subset contains time series that have the same value for each of the grouping fields. Each individual time series is a member of exactly one subset. The cross_series_reducer is applied to each subset of time series. It is not possible to reduce across different resource types, so this field implicitly contains resource.type. Fields not specified in group_by_fields are aggregated away. If group_by_fields is not specified and all the time series have the same resource type, then the time series are aggregated into a single output time series. If cross_series_reducer is not defined, this field is ignored. */
  "secondaryAggregation.groupByFields"?: string[];
  /** Unsupported: must be left blank. The points in each time series are currently returned in reverse time order (most recent to oldest). */
  orderBy?: string;
  /** Required. Specifies which information is returned about the time series. */
  view?: "FULL" | "HEADERS" | (string & {});
  /** A positive number that is the maximum number of results to return. If page_size is empty or more than 100,000 results, the effective page_size is 100,000 results. If view is set to FULL, this is the maximum number of Points returned. If view is set to HEADERS, this is the maximum number of TimeSeries returned. */
  pageSize?: number;
  /** If this field is not empty then it must contain the nextPageToken value returned by a previous call to this method. Using this field causes the method to return additional results from the previous method call. */
  pageToken?: string;
}

export const ListProjectsTimeSeriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  "interval.endTime": Schema.optional(Schema.String).pipe(T.HttpQuery("interval.endTime")),
  "interval.startTime": Schema.optional(Schema.String).pipe(T.HttpQuery("interval.startTime")),
  "aggregation.alignmentPeriod": Schema.optional(Schema.String).pipe(T.HttpQuery("aggregation.alignmentPeriod")),
  "aggregation.perSeriesAligner": Schema.optional(Schema.String).pipe(T.HttpQuery("aggregation.perSeriesAligner")),
  "aggregation.crossSeriesReducer": Schema.optional(Schema.String).pipe(T.HttpQuery("aggregation.crossSeriesReducer")),
  "aggregation.groupByFields": Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("aggregation.groupByFields")),
  "secondaryAggregation.alignmentPeriod": Schema.optional(Schema.String).pipe(T.HttpQuery("secondaryAggregation.alignmentPeriod")),
  "secondaryAggregation.perSeriesAligner": Schema.optional(Schema.String).pipe(T.HttpQuery("secondaryAggregation.perSeriesAligner")),
  "secondaryAggregation.crossSeriesReducer": Schema.optional(Schema.String).pipe(T.HttpQuery("secondaryAggregation.crossSeriesReducer")),
  "secondaryAggregation.groupByFields": Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("secondaryAggregation.groupByFields")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/timeSeries" }),
  svc,
) as unknown as Schema.Schema<ListProjectsTimeSeriesRequest>;

export type ListProjectsTimeSeriesResponse = ListTimeSeriesResponse;
export const ListProjectsTimeSeriesResponse = ListTimeSeriesResponse;

export type ListProjectsTimeSeriesError = CommonErrors;

export const listProjectsTimeSeries = API.makePaginated(() => ({
  input: ListProjectsTimeSeriesRequest,
  output: ListProjectsTimeSeriesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates or adds data to one or more time series. The response is empty if all time series in the request were written. If any time series could not be written, a corresponding failure message is included in the error response. This method does not support resource locations constraint of an organization policy (https://cloud.google.com/resource-manager/docs/organization-policy/defining-locations#setting_the_organization_policy). */
export interface CreateProjectsTimeSeriesRequest {
  /** Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) on which to execute the request. The format is: projects/[PROJECT_ID_OR_NUMBER] */
  name: string;
  /** Request body */
  body?: CreateTimeSeriesRequest;
}

export const CreateProjectsTimeSeriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CreateTimeSeriesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/timeSeries", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsTimeSeriesRequest>;

export type CreateProjectsTimeSeriesResponse = Empty;
export const CreateProjectsTimeSeriesResponse = Empty;

export type CreateProjectsTimeSeriesError = CommonErrors;

export const createProjectsTimeSeries: API.OperationMethod<CreateProjectsTimeSeriesRequest, CreateProjectsTimeSeriesResponse, CreateProjectsTimeSeriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsTimeSeriesRequest,
  output: CreateProjectsTimeSeriesResponse,
  errors: [],
}));

/** Creates or adds data to one or more service time series. A service time series is a time series for a metric from a Google Cloud service. The response is empty if all time series in the request were written. If any time series could not be written, a corresponding failure message is included in the error response. This endpoint rejects writes to user-defined metrics. This method is only for use by Google Cloud services. Use projects.timeSeries.create instead. */
export interface CreateServiceProjectsTimeSeriesRequest {
  /** Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) on which to execute the request. The format is: projects/[PROJECT_ID_OR_NUMBER] */
  name: string;
  /** Request body */
  body?: CreateTimeSeriesRequest;
}

export const CreateServiceProjectsTimeSeriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CreateTimeSeriesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/timeSeries:createService", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateServiceProjectsTimeSeriesRequest>;

export type CreateServiceProjectsTimeSeriesResponse = Empty;
export const CreateServiceProjectsTimeSeriesResponse = Empty;

export type CreateServiceProjectsTimeSeriesError = CommonErrors;

export const createServiceProjectsTimeSeries: API.OperationMethod<CreateServiceProjectsTimeSeriesRequest, CreateServiceProjectsTimeSeriesResponse, CreateServiceProjectsTimeSeriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateServiceProjectsTimeSeriesRequest,
  output: CreateServiceProjectsTimeSeriesResponse,
  errors: [],
}));

/** Queries time series by using Monitoring Query Language (MQL). We recommend using PromQL instead of MQL. For more information about the status of MQL, see the MQL deprecation notice (https://cloud.google.com/stackdriver/docs/deprecations/mql). */
export interface QueryProjectsTimeSeriesRequest {
  /** Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) on which to execute the request. The format is: projects/[PROJECT_ID_OR_NUMBER] */
  name: string;
  /** Request body */
  body?: QueryTimeSeriesRequest;
}

export const QueryProjectsTimeSeriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(QueryTimeSeriesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/timeSeries:query", hasBody: true }),
  svc,
) as unknown as Schema.Schema<QueryProjectsTimeSeriesRequest>;

export type QueryProjectsTimeSeriesResponse = QueryTimeSeriesResponse;
export const QueryProjectsTimeSeriesResponse = QueryTimeSeriesResponse;

export type QueryProjectsTimeSeriesError = CommonErrors;

export const queryProjectsTimeSeries: API.OperationMethod<QueryProjectsTimeSeriesRequest, QueryProjectsTimeSeriesResponse, QueryProjectsTimeSeriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: QueryProjectsTimeSeriesRequest,
  output: QueryProjectsTimeSeriesResponse,
  errors: [],
}));

/** Cloud Monitoring Agent only: Creates a new time series.This method is only for use by the Cloud Monitoring Agent. Use projects.timeSeries.create instead. */
export interface CreateProjectsCollectdTimeSeriesRequest {
  /** The project (https://cloud.google.com/monitoring/api/v3#project_name) in which to create the time series. The format is: projects/[PROJECT_ID_OR_NUMBER] */
  name: string;
  /** Request body */
  body?: CreateCollectdTimeSeriesRequest;
}

export const CreateProjectsCollectdTimeSeriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CreateCollectdTimeSeriesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/collectdTimeSeries", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsCollectdTimeSeriesRequest>;

export type CreateProjectsCollectdTimeSeriesResponse = CreateCollectdTimeSeriesResponse;
export const CreateProjectsCollectdTimeSeriesResponse = CreateCollectdTimeSeriesResponse;

export type CreateProjectsCollectdTimeSeriesError = CommonErrors;

export const createProjectsCollectdTimeSeries: API.OperationMethod<CreateProjectsCollectdTimeSeriesRequest, CreateProjectsCollectdTimeSeriesResponse, CreateProjectsCollectdTimeSeriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsCollectdTimeSeriesRequest,
  output: CreateProjectsCollectdTimeSeriesResponse,
  errors: [],
}));

/** Lists the existing alerting policies for the workspace. */
export interface ListProjectsAlertPoliciesRequest {
  /** Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) whose alert policies are to be listed. The format is: projects/[PROJECT_ID_OR_NUMBER] Note that this field names the parent container in which the alerting policies to be listed are stored. To retrieve a single alerting policy by name, use the GetAlertPolicy operation, instead. */
  name: string;
  /** Optional. If provided, this field specifies the criteria that must be met by alert policies to be included in the response.For more details, see sorting and filtering (https://cloud.google.com/monitoring/api/v3/sorting-and-filtering). */
  filter?: string;
  /** Optional. A comma-separated list of fields by which to sort the result. Supports the same set of field references as the filter field. Entries can be prefixed with a minus sign to sort by the field in descending order.For more details, see sorting and filtering (https://cloud.google.com/monitoring/api/v3/sorting-and-filtering). */
  orderBy?: string;
  /** Optional. The maximum number of results to return in a single response. */
  pageSize?: number;
  /** Optional. If this field is not empty then it must contain the nextPageToken value returned by a previous call to this method. Using this field causes the method to return more results from the previous method call. */
  pageToken?: string;
}

export const ListProjectsAlertPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/alertPolicies" }),
  svc,
) as unknown as Schema.Schema<ListProjectsAlertPoliciesRequest>;

export type ListProjectsAlertPoliciesResponse = ListAlertPoliciesResponse;
export const ListProjectsAlertPoliciesResponse = ListAlertPoliciesResponse;

export type ListProjectsAlertPoliciesError = CommonErrors;

export const listProjectsAlertPolicies = API.makePaginated(() => ({
  input: ListProjectsAlertPoliciesRequest,
  output: ListProjectsAlertPoliciesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a single alerting policy. */
export interface GetProjectsAlertPoliciesRequest {
  /** Required. The alerting policy to retrieve. The format is: projects/[PROJECT_ID_OR_NUMBER]/alertPolicies/[ALERT_POLICY_ID] */
  name: string;
}

export const GetProjectsAlertPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/alertPolicies/{alertPoliciesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsAlertPoliciesRequest>;

export type GetProjectsAlertPoliciesResponse = AlertPolicy;
export const GetProjectsAlertPoliciesResponse = AlertPolicy;

export type GetProjectsAlertPoliciesError = CommonErrors;

export const getProjectsAlertPolicies: API.OperationMethod<GetProjectsAlertPoliciesRequest, GetProjectsAlertPoliciesResponse, GetProjectsAlertPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsAlertPoliciesRequest,
  output: GetProjectsAlertPoliciesResponse,
  errors: [],
}));

/** Creates a new alerting policy.Design your application to single-thread API calls that modify the state of alerting policies in a single project. This includes calls to CreateAlertPolicy, DeleteAlertPolicy and UpdateAlertPolicy. */
export interface CreateProjectsAlertPoliciesRequest {
  /** Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) in which to create the alerting policy. The format is: projects/[PROJECT_ID_OR_NUMBER] Note that this field names the parent container in which the alerting policy will be written, not the name of the created policy. |name| must be a host project of a Metrics Scope, otherwise INVALID_ARGUMENT error will return. The alerting policy that is returned will have a name that contains a normalized representation of this name as a prefix but adds a suffix of the form /alertPolicies/[ALERT_POLICY_ID], identifying the policy in the container. */
  name: string;
  /** Request body */
  body?: AlertPolicy;
}

export const CreateProjectsAlertPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(AlertPolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/alertPolicies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsAlertPoliciesRequest>;

export type CreateProjectsAlertPoliciesResponse = AlertPolicy;
export const CreateProjectsAlertPoliciesResponse = AlertPolicy;

export type CreateProjectsAlertPoliciesError = CommonErrors;

export const createProjectsAlertPolicies: API.OperationMethod<CreateProjectsAlertPoliciesRequest, CreateProjectsAlertPoliciesResponse, CreateProjectsAlertPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsAlertPoliciesRequest,
  output: CreateProjectsAlertPoliciesResponse,
  errors: [],
}));

/** Deletes an alerting policy.Design your application to single-thread API calls that modify the state of alerting policies in a single project. This includes calls to CreateAlertPolicy, DeleteAlertPolicy and UpdateAlertPolicy. */
export interface DeleteProjectsAlertPoliciesRequest {
  /** Required. The alerting policy to delete. The format is: projects/[PROJECT_ID_OR_NUMBER]/alertPolicies/[ALERT_POLICY_ID] For more information, see AlertPolicy. */
  name: string;
}

export const DeleteProjectsAlertPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/projects/{projectsId}/alertPolicies/{alertPoliciesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsAlertPoliciesRequest>;

export type DeleteProjectsAlertPoliciesResponse = Empty;
export const DeleteProjectsAlertPoliciesResponse = Empty;

export type DeleteProjectsAlertPoliciesError = CommonErrors;

export const deleteProjectsAlertPolicies: API.OperationMethod<DeleteProjectsAlertPoliciesRequest, DeleteProjectsAlertPoliciesResponse, DeleteProjectsAlertPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsAlertPoliciesRequest,
  output: DeleteProjectsAlertPoliciesResponse,
  errors: [],
}));

/** Updates an alerting policy. You can either replace the entire policy with a new one or replace only certain fields in the current alerting policy by specifying the fields to be updated via updateMask. Returns the updated alerting policy.Design your application to single-thread API calls that modify the state of alerting policies in a single project. This includes calls to CreateAlertPolicy, DeleteAlertPolicy and UpdateAlertPolicy. */
export interface PatchProjectsAlertPoliciesRequest {
  /** Identifier. Required if the policy exists. The resource name for this policy. The format is: projects/[PROJECT_ID_OR_NUMBER]/alertPolicies/[ALERT_POLICY_ID] [ALERT_POLICY_ID] is assigned by Cloud Monitoring when the policy is created. When calling the alertPolicies.create method, do not include the name field in the alerting policy passed as part of the request. */
  name: string;
  /** Optional. A list of alerting policy field names. If this field is not empty, each listed field in the existing alerting policy is set to the value of the corresponding field in the supplied policy (alert_policy), or to the field's default value if the field is not in the supplied alerting policy. Fields not listed retain their previous value.Examples of valid field masks include display_name, documentation, documentation.content, documentation.mime_type, user_labels, user_label.nameofkey, enabled, conditions, combiner, etc.If this field is empty, then the supplied alerting policy replaces the existing policy. It is the same as deleting the existing policy and adding the supplied policy, except for the following: The new policy will have the same [ALERT_POLICY_ID] as the former policy. This gives you continuity with the former policy in your notifications and incidents. Conditions in the new policy will keep their former [CONDITION_ID] if the supplied condition includes the name field with that [CONDITION_ID]. If the supplied condition omits the name field, then a new [CONDITION_ID] is created. */
  updateMask?: string;
  /** Request body */
  body?: AlertPolicy;
}

export const PatchProjectsAlertPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(AlertPolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/projects/{projectsId}/alertPolicies/{alertPoliciesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsAlertPoliciesRequest>;

export type PatchProjectsAlertPoliciesResponse = AlertPolicy;
export const PatchProjectsAlertPoliciesResponse = AlertPolicy;

export type PatchProjectsAlertPoliciesError = CommonErrors;

export const patchProjectsAlertPolicies: API.OperationMethod<PatchProjectsAlertPoliciesRequest, PatchProjectsAlertPoliciesResponse, PatchProjectsAlertPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsAlertPoliciesRequest,
  output: PatchProjectsAlertPoliciesResponse,
  errors: [],
}));

/** Lists the existing groups. */
export interface ListProjectsGroupsRequest {
  /** Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) whose groups are to be listed. The format is: projects/[PROJECT_ID_OR_NUMBER] */
  name: string;
  /** A group name. The format is: projects/[PROJECT_ID_OR_NUMBER]/groups/[GROUP_ID] Returns groups whose parent_name field contains the group name. If no groups have this parent, the results are empty. */
  childrenOfGroup?: string;
  /** A group name. The format is: projects/[PROJECT_ID_OR_NUMBER]/groups/[GROUP_ID] Returns groups that are ancestors of the specified group. The groups are returned in order, starting with the immediate parent and ending with the most distant ancestor. If the specified group has no immediate parent, the results are empty. */
  ancestorsOfGroup?: string;
  /** A group name. The format is: projects/[PROJECT_ID_OR_NUMBER]/groups/[GROUP_ID] Returns the descendants of the specified group. This is a superset of the results returned by the children_of_group filter, and includes children-of-children, and so forth. */
  descendantsOfGroup?: string;
  /** A positive number that is the maximum number of results to return. */
  pageSize?: number;
  /** If this field is not empty then it must contain the next_page_token value returned by a previous call to this method. Using this field causes the method to return additional results from the previous method call. */
  pageToken?: string;
}

export const ListProjectsGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  childrenOfGroup: Schema.optional(Schema.String).pipe(T.HttpQuery("childrenOfGroup")),
  ancestorsOfGroup: Schema.optional(Schema.String).pipe(T.HttpQuery("ancestorsOfGroup")),
  descendantsOfGroup: Schema.optional(Schema.String).pipe(T.HttpQuery("descendantsOfGroup")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/groups" }),
  svc,
) as unknown as Schema.Schema<ListProjectsGroupsRequest>;

export type ListProjectsGroupsResponse = ListGroupsResponse;
export const ListProjectsGroupsResponse = ListGroupsResponse;

export type ListProjectsGroupsError = CommonErrors;

export const listProjectsGroups = API.makePaginated(() => ({
  input: ListProjectsGroupsRequest,
  output: ListProjectsGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a single group. */
export interface GetProjectsGroupsRequest {
  /** Required. The group to retrieve. The format is: projects/[PROJECT_ID_OR_NUMBER]/groups/[GROUP_ID] */
  name: string;
}

export const GetProjectsGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/groups/{groupsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsGroupsRequest>;

export type GetProjectsGroupsResponse = Group;
export const GetProjectsGroupsResponse = Group;

export type GetProjectsGroupsError = CommonErrors;

export const getProjectsGroups: API.OperationMethod<GetProjectsGroupsRequest, GetProjectsGroupsResponse, GetProjectsGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsGroupsRequest,
  output: GetProjectsGroupsResponse,
  errors: [],
}));

/** Creates a new group. */
export interface CreateProjectsGroupsRequest {
  /** Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) in which to create the group. The format is: projects/[PROJECT_ID_OR_NUMBER] */
  name: string;
  /** If true, validate this request but do not create the group. */
  validateOnly?: boolean;
  /** Request body */
  body?: Group;
}

export const CreateProjectsGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(Group).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/groups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsGroupsRequest>;

export type CreateProjectsGroupsResponse = Group;
export const CreateProjectsGroupsResponse = Group;

export type CreateProjectsGroupsError = CommonErrors;

export const createProjectsGroups: API.OperationMethod<CreateProjectsGroupsRequest, CreateProjectsGroupsResponse, CreateProjectsGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsGroupsRequest,
  output: CreateProjectsGroupsResponse,
  errors: [],
}));

/** Updates an existing group. You can change any group attributes except name. */
export interface UpdateProjectsGroupsRequest {
  /** Output only. The name of this group. The format is: projects/[PROJECT_ID_OR_NUMBER]/groups/[GROUP_ID] When creating a group, this field is ignored and a new name is created consisting of the project specified in the call to CreateGroup and a unique [GROUP_ID] that is generated automatically. */
  name: string;
  /** If true, validate this request but do not update the existing group. */
  validateOnly?: boolean;
  /** Request body */
  body?: Group;
}

export const UpdateProjectsGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(Group).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v3/projects/{projectsId}/groups/{groupsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateProjectsGroupsRequest>;

export type UpdateProjectsGroupsResponse = Group;
export const UpdateProjectsGroupsResponse = Group;

export type UpdateProjectsGroupsError = CommonErrors;

export const updateProjectsGroups: API.OperationMethod<UpdateProjectsGroupsRequest, UpdateProjectsGroupsResponse, UpdateProjectsGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateProjectsGroupsRequest,
  output: UpdateProjectsGroupsResponse,
  errors: [],
}));

/** Deletes an existing group. */
export interface DeleteProjectsGroupsRequest {
  /** Required. The group to delete. The format is: projects/[PROJECT_ID_OR_NUMBER]/groups/[GROUP_ID] */
  name: string;
  /** If this field is true, then the request means to delete a group with all its descendants. Otherwise, the request means to delete a group only when it has no descendants. The default value is false. */
  recursive?: boolean;
}

export const DeleteProjectsGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  recursive: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("recursive")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/projects/{projectsId}/groups/{groupsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsGroupsRequest>;

export type DeleteProjectsGroupsResponse = Empty;
export const DeleteProjectsGroupsResponse = Empty;

export type DeleteProjectsGroupsError = CommonErrors;

export const deleteProjectsGroups: API.OperationMethod<DeleteProjectsGroupsRequest, DeleteProjectsGroupsResponse, DeleteProjectsGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsGroupsRequest,
  output: DeleteProjectsGroupsResponse,
  errors: [],
}));

/** Lists the monitored resources that are members of a group. */
export interface ListProjectsGroupsMembersRequest {
  /** Required. The group whose members are listed. The format is: projects/[PROJECT_ID_OR_NUMBER]/groups/[GROUP_ID] */
  name: string;
  /** A positive number that is the maximum number of results to return. */
  pageSize?: number;
  /** If this field is not empty then it must contain the next_page_token value returned by a previous call to this method. Using this field causes the method to return additional results from the previous method call. */
  pageToken?: string;
  /** An optional list filter (https://cloud.google.com/monitoring/api/learn_more#filtering) describing the members to be returned. The filter may reference the type, labels, and metadata of monitored resources that comprise the group. For example, to return only resources representing Compute Engine VM instances, use this filter: `resource.type = "gce_instance"` */
  filter?: string;
  /** Required. The end of the time interval. */
  "interval.endTime"?: string;
  /** Optional. The beginning of the time interval. The default value for the start time is the end time. The start time must not be later than the end time. */
  "interval.startTime"?: string;
}

export const ListProjectsGroupsMembersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  "interval.endTime": Schema.optional(Schema.String).pipe(T.HttpQuery("interval.endTime")),
  "interval.startTime": Schema.optional(Schema.String).pipe(T.HttpQuery("interval.startTime")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/groups/{groupsId}/members" }),
  svc,
) as unknown as Schema.Schema<ListProjectsGroupsMembersRequest>;

export type ListProjectsGroupsMembersResponse = ListGroupMembersResponse;
export const ListProjectsGroupsMembersResponse = ListGroupMembersResponse;

export type ListProjectsGroupsMembersError = CommonErrors;

export const listProjectsGroupsMembers = API.makePaginated(() => ({
  input: ListProjectsGroupsMembersRequest,
  output: ListProjectsGroupsMembersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists the existing alerts for the metrics scope of the project. */
export interface ListProjectsAlertsRequest {
  /** Required. The name of the project to list alerts for. */
  parent: string;
  /** Optional. An alert is returned if there is a match on any fields belonging to the alert or its subfields. */
  filter?: string;
  /** Optional. A comma-separated list of fields in Alert to use for sorting. The default sort direction is ascending. To specify descending order for a field, add a desc modifier. The following fields are supported: open_time close_timeFor example, close_time desc, open_time will return the alerts closed most recently, with ties broken in the order of older alerts listed first.If the field is not set, the results are sorted by open_time desc. */
  orderBy?: string;
  /** Optional. The maximum number of results to return in a single response. If not set to a positive number, at most 50 alerts will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. If non-empty, page_token must contain a value returned as the next_page_token in a previous response to request the next set of results. */
  pageToken?: string;
}

export const ListProjectsAlertsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/alerts" }),
  svc,
) as unknown as Schema.Schema<ListProjectsAlertsRequest>;

export type ListProjectsAlertsResponse = ListAlertsResponse;
export const ListProjectsAlertsResponse = ListAlertsResponse;

export type ListProjectsAlertsError = CommonErrors;

export const listProjectsAlerts = API.makePaginated(() => ({
  input: ListProjectsAlertsRequest,
  output: ListProjectsAlertsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a single alert. */
export interface GetProjectsAlertsRequest {
  /** Required. The name of the alert.The format is: projects/[PROJECT_ID_OR_NUMBER]/alerts/[ALERT_ID] The [ALERT_ID] is a system-assigned unique identifier for the alert. */
  name: string;
}

export const GetProjectsAlertsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/alerts/{alertsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsAlertsRequest>;

export type GetProjectsAlertsResponse = Alert;
export const GetProjectsAlertsResponse = Alert;

export type GetProjectsAlertsError = CommonErrors;

export const getProjectsAlerts: API.OperationMethod<GetProjectsAlertsRequest, GetProjectsAlertsResponse, GetProjectsAlertsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsAlertsRequest,
  output: GetProjectsAlertsResponse,
  errors: [],
}));

/** Lists the descriptors for supported channel types. The use of descriptors makes it possible for new channel types to be dynamically added. */
export interface ListProjectsNotificationChannelDescriptorsRequest {
  /** Required. The REST resource name of the parent from which to retrieve the notification channel descriptors. The expected syntax is: projects/[PROJECT_ID_OR_NUMBER] Note that this names (https://cloud.google.com/monitoring/api/v3#project_name) the parent container in which to look for the descriptors; to retrieve a single descriptor by name, use the GetNotificationChannelDescriptor operation, instead. */
  name: string;
  /** The maximum number of results to return in a single response. If not set to a positive number, a reasonable value will be chosen by the service. */
  pageSize?: number;
  /** If non-empty, page_token must contain a value returned as the next_page_token in a previous response to request the next set of results. */
  pageToken?: string;
}

export const ListProjectsNotificationChannelDescriptorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/notificationChannelDescriptors" }),
  svc,
) as unknown as Schema.Schema<ListProjectsNotificationChannelDescriptorsRequest>;

export type ListProjectsNotificationChannelDescriptorsResponse = ListNotificationChannelDescriptorsResponse;
export const ListProjectsNotificationChannelDescriptorsResponse = ListNotificationChannelDescriptorsResponse;

export type ListProjectsNotificationChannelDescriptorsError = CommonErrors;

export const listProjectsNotificationChannelDescriptors = API.makePaginated(() => ({
  input: ListProjectsNotificationChannelDescriptorsRequest,
  output: ListProjectsNotificationChannelDescriptorsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a single channel descriptor. The descriptor indicates which fields are expected / permitted for a notification channel of the given type. */
export interface GetProjectsNotificationChannelDescriptorsRequest {
  /** Required. The channel type for which to execute the request. The format is: projects/[PROJECT_ID_OR_NUMBER]/notificationChannelDescriptors/[CHANNEL_TYPE] */
  name: string;
}

export const GetProjectsNotificationChannelDescriptorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/notificationChannelDescriptors/{notificationChannelDescriptorsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsNotificationChannelDescriptorsRequest>;

export type GetProjectsNotificationChannelDescriptorsResponse = NotificationChannelDescriptor;
export const GetProjectsNotificationChannelDescriptorsResponse = NotificationChannelDescriptor;

export type GetProjectsNotificationChannelDescriptorsError = CommonErrors;

export const getProjectsNotificationChannelDescriptors: API.OperationMethod<GetProjectsNotificationChannelDescriptorsRequest, GetProjectsNotificationChannelDescriptorsResponse, GetProjectsNotificationChannelDescriptorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsNotificationChannelDescriptorsRequest,
  output: GetProjectsNotificationChannelDescriptorsResponse,
  errors: [],
}));

/** Lists the notification channels that have been created for the project. To list the types of notification channels that are supported, use the ListNotificationChannelDescriptors method. */
export interface ListProjectsNotificationChannelsRequest {
  /** Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) on which to execute the request. The format is: projects/[PROJECT_ID_OR_NUMBER] This names the container in which to look for the notification channels; it does not name a specific channel. To query a specific channel by REST resource name, use the GetNotificationChannel operation. */
  name: string;
  /** Optional. If provided, this field specifies the criteria that must be met by notification channels to be included in the response.For more details, see sorting and filtering (https://cloud.google.com/monitoring/api/v3/sorting-and-filtering). */
  filter?: string;
  /** Optional. A comma-separated list of fields by which to sort the result. Supports the same set of fields as in filter. Entries can be prefixed with a minus sign to sort in descending rather than ascending order.For more details, see sorting and filtering (https://cloud.google.com/monitoring/api/v3/sorting-and-filtering). */
  orderBy?: string;
  /** Optional. The maximum number of results to return in a single response. If not set to a positive number, a reasonable value will be chosen by the service. */
  pageSize?: number;
  /** Optional. If non-empty, page_token must contain a value returned as the next_page_token in a previous response to request the next set of results. */
  pageToken?: string;
}

export const ListProjectsNotificationChannelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/notificationChannels" }),
  svc,
) as unknown as Schema.Schema<ListProjectsNotificationChannelsRequest>;

export type ListProjectsNotificationChannelsResponse = ListNotificationChannelsResponse;
export const ListProjectsNotificationChannelsResponse = ListNotificationChannelsResponse;

export type ListProjectsNotificationChannelsError = CommonErrors;

export const listProjectsNotificationChannels = API.makePaginated(() => ({
  input: ListProjectsNotificationChannelsRequest,
  output: ListProjectsNotificationChannelsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a single notification channel. The channel includes the relevant configuration details with which the channel was created. However, the response may truncate or omit passwords, API keys, or other private key matter and thus the response may not be 100% identical to the information that was supplied in the call to the create method. */
export interface GetProjectsNotificationChannelsRequest {
  /** Required. The channel for which to execute the request. The format is: projects/[PROJECT_ID_OR_NUMBER]/notificationChannels/[CHANNEL_ID] */
  name: string;
}

export const GetProjectsNotificationChannelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/notificationChannels/{notificationChannelsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsNotificationChannelsRequest>;

export type GetProjectsNotificationChannelsResponse = NotificationChannel;
export const GetProjectsNotificationChannelsResponse = NotificationChannel;

export type GetProjectsNotificationChannelsError = CommonErrors;

export const getProjectsNotificationChannels: API.OperationMethod<GetProjectsNotificationChannelsRequest, GetProjectsNotificationChannelsResponse, GetProjectsNotificationChannelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsNotificationChannelsRequest,
  output: GetProjectsNotificationChannelsResponse,
  errors: [],
}));

/** Creates a new notification channel, representing a single notification endpoint such as an email address, SMS number, or PagerDuty service.Design your application to single-thread API calls that modify the state of notification channels in a single project. This includes calls to CreateNotificationChannel, DeleteNotificationChannel and UpdateNotificationChannel. */
export interface CreateProjectsNotificationChannelsRequest {
  /** Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) on which to execute the request. The format is: projects/[PROJECT_ID_OR_NUMBER] This names the container into which the channel will be written, this does not name the newly created channel. The resulting channel's name will have a normalized version of this field as a prefix, but will add /notificationChannels/[CHANNEL_ID] to identify the channel. */
  name: string;
  /** Request body */
  body?: NotificationChannel;
}

export const CreateProjectsNotificationChannelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(NotificationChannel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/notificationChannels", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsNotificationChannelsRequest>;

export type CreateProjectsNotificationChannelsResponse = NotificationChannel;
export const CreateProjectsNotificationChannelsResponse = NotificationChannel;

export type CreateProjectsNotificationChannelsError = CommonErrors;

export const createProjectsNotificationChannels: API.OperationMethod<CreateProjectsNotificationChannelsRequest, CreateProjectsNotificationChannelsResponse, CreateProjectsNotificationChannelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsNotificationChannelsRequest,
  output: CreateProjectsNotificationChannelsResponse,
  errors: [],
}));

/** Updates a notification channel. Fields not specified in the field mask remain unchanged.Design your application to single-thread API calls that modify the state of notification channels in a single project. This includes calls to CreateNotificationChannel, DeleteNotificationChannel and UpdateNotificationChannel. */
export interface PatchProjectsNotificationChannelsRequest {
  /** Identifier. The full REST resource name for this channel. The format is: projects/[PROJECT_ID_OR_NUMBER]/notificationChannels/[CHANNEL_ID] The [CHANNEL_ID] is automatically assigned by the server on creation. */
  name: string;
  /** Optional. The fields to update. */
  updateMask?: string;
  /** Request body */
  body?: NotificationChannel;
}

export const PatchProjectsNotificationChannelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(NotificationChannel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/projects/{projectsId}/notificationChannels/{notificationChannelsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsNotificationChannelsRequest>;

export type PatchProjectsNotificationChannelsResponse = NotificationChannel;
export const PatchProjectsNotificationChannelsResponse = NotificationChannel;

export type PatchProjectsNotificationChannelsError = CommonErrors;

export const patchProjectsNotificationChannels: API.OperationMethod<PatchProjectsNotificationChannelsRequest, PatchProjectsNotificationChannelsResponse, PatchProjectsNotificationChannelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsNotificationChannelsRequest,
  output: PatchProjectsNotificationChannelsResponse,
  errors: [],
}));

/** Deletes a notification channel.Design your application to single-thread API calls that modify the state of notification channels in a single project. This includes calls to CreateNotificationChannel, DeleteNotificationChannel and UpdateNotificationChannel. */
export interface DeleteProjectsNotificationChannelsRequest {
  /** Required. The channel for which to execute the request. The format is: projects/[PROJECT_ID_OR_NUMBER]/notificationChannels/[CHANNEL_ID] */
  name: string;
  /** If true, the notification channel will be deleted regardless of its use in alert policies (the policies will be updated to remove the channel). If false, this operation will fail if the notification channel is referenced by existing alerting policies. */
  force?: boolean;
}

export const DeleteProjectsNotificationChannelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/projects/{projectsId}/notificationChannels/{notificationChannelsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsNotificationChannelsRequest>;

export type DeleteProjectsNotificationChannelsResponse = Empty;
export const DeleteProjectsNotificationChannelsResponse = Empty;

export type DeleteProjectsNotificationChannelsError = CommonErrors;

export const deleteProjectsNotificationChannels: API.OperationMethod<DeleteProjectsNotificationChannelsRequest, DeleteProjectsNotificationChannelsResponse, DeleteProjectsNotificationChannelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsNotificationChannelsRequest,
  output: DeleteProjectsNotificationChannelsResponse,
  errors: [],
}));

/** Causes a verification code to be delivered to the channel. The code can then be supplied in VerifyNotificationChannel to verify the channel. */
export interface SendVerificationCodeProjectsNotificationChannelsRequest {
  /** Required. The notification channel to which to send a verification code. */
  name: string;
  /** Request body */
  body?: SendNotificationChannelVerificationCodeRequest;
}

export const SendVerificationCodeProjectsNotificationChannelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SendNotificationChannelVerificationCodeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/notificationChannels/{notificationChannelsId}:sendVerificationCode", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SendVerificationCodeProjectsNotificationChannelsRequest>;

export type SendVerificationCodeProjectsNotificationChannelsResponse = Empty;
export const SendVerificationCodeProjectsNotificationChannelsResponse = Empty;

export type SendVerificationCodeProjectsNotificationChannelsError = CommonErrors;

export const sendVerificationCodeProjectsNotificationChannels: API.OperationMethod<SendVerificationCodeProjectsNotificationChannelsRequest, SendVerificationCodeProjectsNotificationChannelsResponse, SendVerificationCodeProjectsNotificationChannelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SendVerificationCodeProjectsNotificationChannelsRequest,
  output: SendVerificationCodeProjectsNotificationChannelsResponse,
  errors: [],
}));

/** Requests a verification code for an already verified channel that can then be used in a call to VerifyNotificationChannel() on a different channel with an equivalent identity in the same or in a different project. This makes it possible to copy a channel between projects without requiring manual reverification of the channel. If the channel is not in the verified state, this method will fail (in other words, this may only be used if the SendNotificationChannelVerificationCode and VerifyNotificationChannel paths have already been used to put the given channel into the verified state).There is no guarantee that the verification codes returned by this method will be of a similar structure or form as the ones that are delivered to the channel via SendNotificationChannelVerificationCode; while VerifyNotificationChannel() will recognize both the codes delivered via SendNotificationChannelVerificationCode() and returned from GetNotificationChannelVerificationCode(), it is typically the case that the verification codes delivered via SendNotificationChannelVerificationCode() will be shorter and also have a shorter expiration (e.g. codes such as "G-123456") whereas GetVerificationCode() will typically return a much longer, websafe base 64 encoded string that has a longer expiration time. */
export interface GetVerificationCodeProjectsNotificationChannelsRequest {
  /** Required. The notification channel for which a verification code is to be generated and retrieved. This must name a channel that is already verified; if the specified channel is not verified, the request will fail. */
  name: string;
  /** Request body */
  body?: GetNotificationChannelVerificationCodeRequest;
}

export const GetVerificationCodeProjectsNotificationChannelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GetNotificationChannelVerificationCodeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/notificationChannels/{notificationChannelsId}:getVerificationCode", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetVerificationCodeProjectsNotificationChannelsRequest>;

export type GetVerificationCodeProjectsNotificationChannelsResponse = GetNotificationChannelVerificationCodeResponse;
export const GetVerificationCodeProjectsNotificationChannelsResponse = GetNotificationChannelVerificationCodeResponse;

export type GetVerificationCodeProjectsNotificationChannelsError = CommonErrors;

export const getVerificationCodeProjectsNotificationChannels: API.OperationMethod<GetVerificationCodeProjectsNotificationChannelsRequest, GetVerificationCodeProjectsNotificationChannelsResponse, GetVerificationCodeProjectsNotificationChannelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetVerificationCodeProjectsNotificationChannelsRequest,
  output: GetVerificationCodeProjectsNotificationChannelsResponse,
  errors: [],
}));

/** Verifies a NotificationChannel by proving receipt of the code delivered to the channel as a result of calling SendNotificationChannelVerificationCode. */
export interface VerifyProjectsNotificationChannelsRequest {
  /** Required. The notification channel to verify. */
  name: string;
  /** Request body */
  body?: VerifyNotificationChannelRequest;
}

export const VerifyProjectsNotificationChannelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(VerifyNotificationChannelRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/notificationChannels/{notificationChannelsId}:verify", hasBody: true }),
  svc,
) as unknown as Schema.Schema<VerifyProjectsNotificationChannelsRequest>;

export type VerifyProjectsNotificationChannelsResponse = NotificationChannel;
export const VerifyProjectsNotificationChannelsResponse = NotificationChannel;

export type VerifyProjectsNotificationChannelsError = CommonErrors;

export const verifyProjectsNotificationChannels: API.OperationMethod<VerifyProjectsNotificationChannelsRequest, VerifyProjectsNotificationChannelsResponse, VerifyProjectsNotificationChannelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: VerifyProjectsNotificationChannelsRequest,
  output: VerifyProjectsNotificationChannelsResponse,
  errors: [],
}));

/** Creates a Snooze that will prevent alerts, which match the provided criteria, from being opened. The Snooze applies for a specific time interval. */
export interface CreateProjectsSnoozesRequest {
  /** Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) in which a Snooze should be created. The format is: projects/[PROJECT_ID_OR_NUMBER] */
  parent: string;
  /** Request body */
  body?: Snooze;
}

export const CreateProjectsSnoozesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Snooze).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/snoozes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsSnoozesRequest>;

export type CreateProjectsSnoozesResponse = Snooze;
export const CreateProjectsSnoozesResponse = Snooze;

export type CreateProjectsSnoozesError = CommonErrors;

export const createProjectsSnoozes: API.OperationMethod<CreateProjectsSnoozesRequest, CreateProjectsSnoozesResponse, CreateProjectsSnoozesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsSnoozesRequest,
  output: CreateProjectsSnoozesResponse,
  errors: [],
}));

/** Lists the Snoozes associated with a project. Can optionally pass in filter, which specifies predicates to match Snoozes. */
export interface ListProjectsSnoozesRequest {
  /** Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) whose Snoozes should be listed. The format is: projects/[PROJECT_ID_OR_NUMBER] */
  parent: string;
  /** Optional. Optional filter to restrict results to the given criteria. The following fields are supported. interval.start_time interval.end_timeFor example: interval.start_time > "2022-03-11T00:00:00-08:00" AND interval.end_time < "2022-03-12T00:00:00-08:00" */
  filter?: string;
  /** Optional. The maximum number of results to return for a single query. The server may further constrain the maximum number of results returned in a single page. The value should be in the range 1, 1000. If the value given is outside this range, the server will decide the number of results to be returned. */
  pageSize?: number;
  /** Optional. The next_page_token from a previous call to ListSnoozesRequest to get the next page of results. */
  pageToken?: string;
}

export const ListProjectsSnoozesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/snoozes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsSnoozesRequest>;

export type ListProjectsSnoozesResponse = ListSnoozesResponse;
export const ListProjectsSnoozesResponse = ListSnoozesResponse;

export type ListProjectsSnoozesError = CommonErrors;

export const listProjectsSnoozes = API.makePaginated(() => ({
  input: ListProjectsSnoozesRequest,
  output: ListProjectsSnoozesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieves a Snooze by name. */
export interface GetProjectsSnoozesRequest {
  /** Required. The ID of the Snooze to retrieve. The format is: projects/[PROJECT_ID_OR_NUMBER]/snoozes/[SNOOZE_ID] */
  name: string;
}

export const GetProjectsSnoozesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/snoozes/{snoozesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsSnoozesRequest>;

export type GetProjectsSnoozesResponse = Snooze;
export const GetProjectsSnoozesResponse = Snooze;

export type GetProjectsSnoozesError = CommonErrors;

export const getProjectsSnoozes: API.OperationMethod<GetProjectsSnoozesRequest, GetProjectsSnoozesResponse, GetProjectsSnoozesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsSnoozesRequest,
  output: GetProjectsSnoozesResponse,
  errors: [],
}));

/** Updates a Snooze, identified by its name, with the parameters in the given Snooze object. */
export interface PatchProjectsSnoozesRequest {
  /** Required. Identifier. The name of the Snooze. The format is: projects/[PROJECT_ID_OR_NUMBER]/snoozes/[SNOOZE_ID] The ID of the Snooze will be generated by the system. */
  name: string;
  /** Required. The fields to update.For each field listed in update_mask: If the Snooze object supplied in the UpdateSnoozeRequest has a value for that field, the value of the field in the existing Snooze will be set to the value of the field in the supplied Snooze. If the field does not have a value in the supplied Snooze, the field in the existing Snooze is set to its default value.Fields not listed retain their existing value.The following are the field names that are accepted in update_mask: display_name interval.start_time interval.end_timeThat said, the start time and end time of the Snooze determines which fields can legally be updated. Before attempting an update, users should consult the documentation for UpdateSnoozeRequest, which talks about which fields can be updated. */
  updateMask?: string;
  /** Request body */
  body?: Snooze;
}

export const PatchProjectsSnoozesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Snooze).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/projects/{projectsId}/snoozes/{snoozesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsSnoozesRequest>;

export type PatchProjectsSnoozesResponse = Snooze;
export const PatchProjectsSnoozesResponse = Snooze;

export type PatchProjectsSnoozesError = CommonErrors;

export const patchProjectsSnoozes: API.OperationMethod<PatchProjectsSnoozesRequest, PatchProjectsSnoozesResponse, PatchProjectsSnoozesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsSnoozesRequest,
  output: PatchProjectsSnoozesResponse,
  errors: [],
}));

/** Lists the existing valid Uptime check configurations for the project (leaving out any invalid configurations). */
export interface ListProjectsUptimeCheckConfigsRequest {
  /** Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) whose Uptime check configurations are listed. The format is: projects/[PROJECT_ID_OR_NUMBER] */
  parent: string;
  /** If provided, this field specifies the criteria that must be met by uptime checks to be included in the response.For more details, see Filtering syntax (https://cloud.google.com/monitoring/api/v3/sorting-and-filtering#filter_syntax). */
  filter?: string;
  /** The maximum number of results to return in a single response. The server may further constrain the maximum number of results returned in a single page. If the page_size is <=0, the server will decide the number of results to be returned. */
  pageSize?: number;
  /** If this field is not empty then it must contain the nextPageToken value returned by a previous call to this method. Using this field causes the method to return more results from the previous method call. */
  pageToken?: string;
}

export const ListProjectsUptimeCheckConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/uptimeCheckConfigs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsUptimeCheckConfigsRequest>;

export type ListProjectsUptimeCheckConfigsResponse = ListUptimeCheckConfigsResponse;
export const ListProjectsUptimeCheckConfigsResponse = ListUptimeCheckConfigsResponse;

export type ListProjectsUptimeCheckConfigsError = CommonErrors;

export const listProjectsUptimeCheckConfigs = API.makePaginated(() => ({
  input: ListProjectsUptimeCheckConfigsRequest,
  output: ListProjectsUptimeCheckConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a single Uptime check configuration. */
export interface GetProjectsUptimeCheckConfigsRequest {
  /** Required. The Uptime check configuration to retrieve. The format is: projects/[PROJECT_ID_OR_NUMBER]/uptimeCheckConfigs/[UPTIME_CHECK_ID] */
  name: string;
}

export const GetProjectsUptimeCheckConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/uptimeCheckConfigs/{uptimeCheckConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsUptimeCheckConfigsRequest>;

export type GetProjectsUptimeCheckConfigsResponse = UptimeCheckConfig;
export const GetProjectsUptimeCheckConfigsResponse = UptimeCheckConfig;

export type GetProjectsUptimeCheckConfigsError = CommonErrors;

export const getProjectsUptimeCheckConfigs: API.OperationMethod<GetProjectsUptimeCheckConfigsRequest, GetProjectsUptimeCheckConfigsResponse, GetProjectsUptimeCheckConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsUptimeCheckConfigsRequest,
  output: GetProjectsUptimeCheckConfigsResponse,
  errors: [],
}));

/** Creates a new Uptime check configuration. */
export interface CreateProjectsUptimeCheckConfigsRequest {
  /** Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) in which to create the Uptime check. The format is: projects/[PROJECT_ID_OR_NUMBER] */
  parent: string;
  /** Request body */
  body?: UptimeCheckConfig;
}

export const CreateProjectsUptimeCheckConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(UptimeCheckConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/uptimeCheckConfigs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsUptimeCheckConfigsRequest>;

export type CreateProjectsUptimeCheckConfigsResponse = UptimeCheckConfig;
export const CreateProjectsUptimeCheckConfigsResponse = UptimeCheckConfig;

export type CreateProjectsUptimeCheckConfigsError = CommonErrors;

export const createProjectsUptimeCheckConfigs: API.OperationMethod<CreateProjectsUptimeCheckConfigsRequest, CreateProjectsUptimeCheckConfigsResponse, CreateProjectsUptimeCheckConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsUptimeCheckConfigsRequest,
  output: CreateProjectsUptimeCheckConfigsResponse,
  errors: [],
}));

/** Updates an Uptime check configuration. You can either replace the entire configuration with a new one or replace only certain fields in the current configuration by specifying the fields to be updated via updateMask. Returns the updated configuration. */
export interface PatchProjectsUptimeCheckConfigsRequest {
  /** Identifier. A unique resource name for this Uptime check configuration. The format is: projects/[PROJECT_ID_OR_NUMBER]/uptimeCheckConfigs/[UPTIME_CHECK_ID] [PROJECT_ID_OR_NUMBER] is the Workspace host project associated with the Uptime check.This field should be omitted when creating the Uptime check configuration; on create, the resource name is assigned by the server and included in the response. */
  name: string;
  /** Optional. If present, only the listed fields in the current Uptime check configuration are updated with values from the new configuration. If this field is empty, then the current configuration is completely replaced with the new configuration. */
  updateMask?: string;
  /** Request body */
  body?: UptimeCheckConfig;
}

export const PatchProjectsUptimeCheckConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(UptimeCheckConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/projects/{projectsId}/uptimeCheckConfigs/{uptimeCheckConfigsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsUptimeCheckConfigsRequest>;

export type PatchProjectsUptimeCheckConfigsResponse = UptimeCheckConfig;
export const PatchProjectsUptimeCheckConfigsResponse = UptimeCheckConfig;

export type PatchProjectsUptimeCheckConfigsError = CommonErrors;

export const patchProjectsUptimeCheckConfigs: API.OperationMethod<PatchProjectsUptimeCheckConfigsRequest, PatchProjectsUptimeCheckConfigsResponse, PatchProjectsUptimeCheckConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsUptimeCheckConfigsRequest,
  output: PatchProjectsUptimeCheckConfigsResponse,
  errors: [],
}));

/** Deletes an Uptime check configuration. Note that this method will fail if the Uptime check configuration is referenced by an alert policy or other dependent configs that would be rendered invalid by the deletion. */
export interface DeleteProjectsUptimeCheckConfigsRequest {
  /** Required. The Uptime check configuration to delete. The format is: projects/[PROJECT_ID_OR_NUMBER]/uptimeCheckConfigs/[UPTIME_CHECK_ID] */
  name: string;
}

export const DeleteProjectsUptimeCheckConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/projects/{projectsId}/uptimeCheckConfigs/{uptimeCheckConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsUptimeCheckConfigsRequest>;

export type DeleteProjectsUptimeCheckConfigsResponse = Empty;
export const DeleteProjectsUptimeCheckConfigsResponse = Empty;

export type DeleteProjectsUptimeCheckConfigsError = CommonErrors;

export const deleteProjectsUptimeCheckConfigs: API.OperationMethod<DeleteProjectsUptimeCheckConfigsRequest, DeleteProjectsUptimeCheckConfigsResponse, DeleteProjectsUptimeCheckConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsUptimeCheckConfigsRequest,
  output: DeleteProjectsUptimeCheckConfigsResponse,
  errors: [],
}));

/** Lists time series that match a filter. */
export interface ListOrganizationsTimeSeriesRequest {
  /** Required. The project (https://cloud.google.com/monitoring/api/v3#project_name), organization or folder on which to execute the request. The format is: projects/[PROJECT_ID_OR_NUMBER] organizations/[ORGANIZATION_ID] folders/[FOLDER_ID] */
  name: string;
  /** Required. A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) that specifies which time series should be returned. The filter must specify a single metric type, and can additionally specify metric labels and other information. For example: metric.type = "compute.googleapis.com/instance/cpu/usage_time" AND metric.labels.instance_name = "my-instance-name" */
  filter?: string;
  /** Required. The end of the time interval. */
  "interval.endTime"?: string;
  /** Optional. The beginning of the time interval. The default value for the start time is the end time. The start time must not be later than the end time. */
  "interval.startTime"?: string;
  /** The alignment_period specifies a time interval, in seconds, that is used to divide the data in all the time series into consistent blocks of time. This will be done before the per-series aligner can be applied to the data.The value must be at least 60 seconds. If a per-series aligner other than ALIGN_NONE is specified, this field is required or an error is returned. If no per-series aligner is specified, or the aligner ALIGN_NONE is specified, then this field is ignored.The maximum value of the alignment_period is 104 weeks (2 years) for charts, and 90,000 seconds (25 hours) for alerting policies. */
  "aggregation.alignmentPeriod"?: string;
  /** An Aligner describes how to bring the data points in a single time series into temporal alignment. Except for ALIGN_NONE, all alignments cause all the data points in an alignment_period to be mathematically grouped together, resulting in a single data point for each alignment_period with end timestamp at the end of the period.Not all alignment operations may be applied to all time series. The valid choices depend on the metric_kind and value_type of the original time series. Alignment can change the metric_kind or the value_type of the time series.Time series data must be aligned in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified and not equal to ALIGN_NONE and alignment_period must be specified; otherwise, an error is returned. */
  "aggregation.perSeriesAligner"?: "ALIGN_NONE" | "ALIGN_DELTA" | "ALIGN_RATE" | "ALIGN_INTERPOLATE" | "ALIGN_NEXT_OLDER" | "ALIGN_MIN" | "ALIGN_MAX" | "ALIGN_MEAN" | "ALIGN_COUNT" | "ALIGN_SUM" | "ALIGN_STDDEV" | "ALIGN_COUNT_TRUE" | "ALIGN_COUNT_FALSE" | "ALIGN_FRACTION_TRUE" | "ALIGN_PERCENTILE_99" | "ALIGN_PERCENTILE_95" | "ALIGN_PERCENTILE_50" | "ALIGN_PERCENTILE_05" | "ALIGN_PERCENT_CHANGE" | (string & {});
  /** The reduction operation to be used to combine time series into a single time series, where the value of each data point in the resulting series is a function of all the already aligned values in the input time series.Not all reducer operations can be applied to all time series. The valid choices depend on the metric_kind and the value_type of the original time series. Reduction can yield a time series with a different metric_kind or value_type than the input time series.Time series data must first be aligned (see per_series_aligner) in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified, and must not be ALIGN_NONE. An alignment_period must also be specified; otherwise, an error is returned. */
  "aggregation.crossSeriesReducer"?: "REDUCE_NONE" | "REDUCE_MEAN" | "REDUCE_MIN" | "REDUCE_MAX" | "REDUCE_SUM" | "REDUCE_STDDEV" | "REDUCE_COUNT" | "REDUCE_COUNT_TRUE" | "REDUCE_COUNT_FALSE" | "REDUCE_FRACTION_TRUE" | "REDUCE_PERCENTILE_99" | "REDUCE_PERCENTILE_95" | "REDUCE_PERCENTILE_50" | "REDUCE_PERCENTILE_05" | (string & {});
  /** The set of fields to preserve when cross_series_reducer is specified. The group_by_fields determine how the time series are partitioned into subsets prior to applying the aggregation operation. Each subset contains time series that have the same value for each of the grouping fields. Each individual time series is a member of exactly one subset. The cross_series_reducer is applied to each subset of time series. It is not possible to reduce across different resource types, so this field implicitly contains resource.type. Fields not specified in group_by_fields are aggregated away. If group_by_fields is not specified and all the time series have the same resource type, then the time series are aggregated into a single output time series. If cross_series_reducer is not defined, this field is ignored. */
  "aggregation.groupByFields"?: string[];
  /** The alignment_period specifies a time interval, in seconds, that is used to divide the data in all the time series into consistent blocks of time. This will be done before the per-series aligner can be applied to the data.The value must be at least 60 seconds. If a per-series aligner other than ALIGN_NONE is specified, this field is required or an error is returned. If no per-series aligner is specified, or the aligner ALIGN_NONE is specified, then this field is ignored.The maximum value of the alignment_period is 104 weeks (2 years) for charts, and 90,000 seconds (25 hours) for alerting policies. */
  "secondaryAggregation.alignmentPeriod"?: string;
  /** An Aligner describes how to bring the data points in a single time series into temporal alignment. Except for ALIGN_NONE, all alignments cause all the data points in an alignment_period to be mathematically grouped together, resulting in a single data point for each alignment_period with end timestamp at the end of the period.Not all alignment operations may be applied to all time series. The valid choices depend on the metric_kind and value_type of the original time series. Alignment can change the metric_kind or the value_type of the time series.Time series data must be aligned in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified and not equal to ALIGN_NONE and alignment_period must be specified; otherwise, an error is returned. */
  "secondaryAggregation.perSeriesAligner"?: "ALIGN_NONE" | "ALIGN_DELTA" | "ALIGN_RATE" | "ALIGN_INTERPOLATE" | "ALIGN_NEXT_OLDER" | "ALIGN_MIN" | "ALIGN_MAX" | "ALIGN_MEAN" | "ALIGN_COUNT" | "ALIGN_SUM" | "ALIGN_STDDEV" | "ALIGN_COUNT_TRUE" | "ALIGN_COUNT_FALSE" | "ALIGN_FRACTION_TRUE" | "ALIGN_PERCENTILE_99" | "ALIGN_PERCENTILE_95" | "ALIGN_PERCENTILE_50" | "ALIGN_PERCENTILE_05" | "ALIGN_PERCENT_CHANGE" | (string & {});
  /** The reduction operation to be used to combine time series into a single time series, where the value of each data point in the resulting series is a function of all the already aligned values in the input time series.Not all reducer operations can be applied to all time series. The valid choices depend on the metric_kind and the value_type of the original time series. Reduction can yield a time series with a different metric_kind or value_type than the input time series.Time series data must first be aligned (see per_series_aligner) in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified, and must not be ALIGN_NONE. An alignment_period must also be specified; otherwise, an error is returned. */
  "secondaryAggregation.crossSeriesReducer"?: "REDUCE_NONE" | "REDUCE_MEAN" | "REDUCE_MIN" | "REDUCE_MAX" | "REDUCE_SUM" | "REDUCE_STDDEV" | "REDUCE_COUNT" | "REDUCE_COUNT_TRUE" | "REDUCE_COUNT_FALSE" | "REDUCE_FRACTION_TRUE" | "REDUCE_PERCENTILE_99" | "REDUCE_PERCENTILE_95" | "REDUCE_PERCENTILE_50" | "REDUCE_PERCENTILE_05" | (string & {});
  /** The set of fields to preserve when cross_series_reducer is specified. The group_by_fields determine how the time series are partitioned into subsets prior to applying the aggregation operation. Each subset contains time series that have the same value for each of the grouping fields. Each individual time series is a member of exactly one subset. The cross_series_reducer is applied to each subset of time series. It is not possible to reduce across different resource types, so this field implicitly contains resource.type. Fields not specified in group_by_fields are aggregated away. If group_by_fields is not specified and all the time series have the same resource type, then the time series are aggregated into a single output time series. If cross_series_reducer is not defined, this field is ignored. */
  "secondaryAggregation.groupByFields"?: string[];
  /** Unsupported: must be left blank. The points in each time series are currently returned in reverse time order (most recent to oldest). */
  orderBy?: string;
  /** Required. Specifies which information is returned about the time series. */
  view?: "FULL" | "HEADERS" | (string & {});
  /** A positive number that is the maximum number of results to return. If page_size is empty or more than 100,000 results, the effective page_size is 100,000 results. If view is set to FULL, this is the maximum number of Points returned. If view is set to HEADERS, this is the maximum number of TimeSeries returned. */
  pageSize?: number;
  /** If this field is not empty then it must contain the nextPageToken value returned by a previous call to this method. Using this field causes the method to return additional results from the previous method call. */
  pageToken?: string;
}

export const ListOrganizationsTimeSeriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  "interval.endTime": Schema.optional(Schema.String).pipe(T.HttpQuery("interval.endTime")),
  "interval.startTime": Schema.optional(Schema.String).pipe(T.HttpQuery("interval.startTime")),
  "aggregation.alignmentPeriod": Schema.optional(Schema.String).pipe(T.HttpQuery("aggregation.alignmentPeriod")),
  "aggregation.perSeriesAligner": Schema.optional(Schema.String).pipe(T.HttpQuery("aggregation.perSeriesAligner")),
  "aggregation.crossSeriesReducer": Schema.optional(Schema.String).pipe(T.HttpQuery("aggregation.crossSeriesReducer")),
  "aggregation.groupByFields": Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("aggregation.groupByFields")),
  "secondaryAggregation.alignmentPeriod": Schema.optional(Schema.String).pipe(T.HttpQuery("secondaryAggregation.alignmentPeriod")),
  "secondaryAggregation.perSeriesAligner": Schema.optional(Schema.String).pipe(T.HttpQuery("secondaryAggregation.perSeriesAligner")),
  "secondaryAggregation.crossSeriesReducer": Schema.optional(Schema.String).pipe(T.HttpQuery("secondaryAggregation.crossSeriesReducer")),
  "secondaryAggregation.groupByFields": Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("secondaryAggregation.groupByFields")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3/organizations/{organizationsId}/timeSeries" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsTimeSeriesRequest>;

export type ListOrganizationsTimeSeriesResponse = ListTimeSeriesResponse;
export const ListOrganizationsTimeSeriesResponse = ListTimeSeriesResponse;

export type ListOrganizationsTimeSeriesError = CommonErrors;

export const listOrganizationsTimeSeries = API.makePaginated(() => ({
  input: ListOrganizationsTimeSeriesRequest,
  output: ListOrganizationsTimeSeriesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists time series that match a filter. */
export interface ListFoldersTimeSeriesRequest {
  /** Required. The project (https://cloud.google.com/monitoring/api/v3#project_name), organization or folder on which to execute the request. The format is: projects/[PROJECT_ID_OR_NUMBER] organizations/[ORGANIZATION_ID] folders/[FOLDER_ID] */
  name: string;
  /** Required. A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) that specifies which time series should be returned. The filter must specify a single metric type, and can additionally specify metric labels and other information. For example: metric.type = "compute.googleapis.com/instance/cpu/usage_time" AND metric.labels.instance_name = "my-instance-name" */
  filter?: string;
  /** Required. The end of the time interval. */
  "interval.endTime"?: string;
  /** Optional. The beginning of the time interval. The default value for the start time is the end time. The start time must not be later than the end time. */
  "interval.startTime"?: string;
  /** The alignment_period specifies a time interval, in seconds, that is used to divide the data in all the time series into consistent blocks of time. This will be done before the per-series aligner can be applied to the data.The value must be at least 60 seconds. If a per-series aligner other than ALIGN_NONE is specified, this field is required or an error is returned. If no per-series aligner is specified, or the aligner ALIGN_NONE is specified, then this field is ignored.The maximum value of the alignment_period is 104 weeks (2 years) for charts, and 90,000 seconds (25 hours) for alerting policies. */
  "aggregation.alignmentPeriod"?: string;
  /** An Aligner describes how to bring the data points in a single time series into temporal alignment. Except for ALIGN_NONE, all alignments cause all the data points in an alignment_period to be mathematically grouped together, resulting in a single data point for each alignment_period with end timestamp at the end of the period.Not all alignment operations may be applied to all time series. The valid choices depend on the metric_kind and value_type of the original time series. Alignment can change the metric_kind or the value_type of the time series.Time series data must be aligned in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified and not equal to ALIGN_NONE and alignment_period must be specified; otherwise, an error is returned. */
  "aggregation.perSeriesAligner"?: "ALIGN_NONE" | "ALIGN_DELTA" | "ALIGN_RATE" | "ALIGN_INTERPOLATE" | "ALIGN_NEXT_OLDER" | "ALIGN_MIN" | "ALIGN_MAX" | "ALIGN_MEAN" | "ALIGN_COUNT" | "ALIGN_SUM" | "ALIGN_STDDEV" | "ALIGN_COUNT_TRUE" | "ALIGN_COUNT_FALSE" | "ALIGN_FRACTION_TRUE" | "ALIGN_PERCENTILE_99" | "ALIGN_PERCENTILE_95" | "ALIGN_PERCENTILE_50" | "ALIGN_PERCENTILE_05" | "ALIGN_PERCENT_CHANGE" | (string & {});
  /** The reduction operation to be used to combine time series into a single time series, where the value of each data point in the resulting series is a function of all the already aligned values in the input time series.Not all reducer operations can be applied to all time series. The valid choices depend on the metric_kind and the value_type of the original time series. Reduction can yield a time series with a different metric_kind or value_type than the input time series.Time series data must first be aligned (see per_series_aligner) in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified, and must not be ALIGN_NONE. An alignment_period must also be specified; otherwise, an error is returned. */
  "aggregation.crossSeriesReducer"?: "REDUCE_NONE" | "REDUCE_MEAN" | "REDUCE_MIN" | "REDUCE_MAX" | "REDUCE_SUM" | "REDUCE_STDDEV" | "REDUCE_COUNT" | "REDUCE_COUNT_TRUE" | "REDUCE_COUNT_FALSE" | "REDUCE_FRACTION_TRUE" | "REDUCE_PERCENTILE_99" | "REDUCE_PERCENTILE_95" | "REDUCE_PERCENTILE_50" | "REDUCE_PERCENTILE_05" | (string & {});
  /** The set of fields to preserve when cross_series_reducer is specified. The group_by_fields determine how the time series are partitioned into subsets prior to applying the aggregation operation. Each subset contains time series that have the same value for each of the grouping fields. Each individual time series is a member of exactly one subset. The cross_series_reducer is applied to each subset of time series. It is not possible to reduce across different resource types, so this field implicitly contains resource.type. Fields not specified in group_by_fields are aggregated away. If group_by_fields is not specified and all the time series have the same resource type, then the time series are aggregated into a single output time series. If cross_series_reducer is not defined, this field is ignored. */
  "aggregation.groupByFields"?: string[];
  /** The alignment_period specifies a time interval, in seconds, that is used to divide the data in all the time series into consistent blocks of time. This will be done before the per-series aligner can be applied to the data.The value must be at least 60 seconds. If a per-series aligner other than ALIGN_NONE is specified, this field is required or an error is returned. If no per-series aligner is specified, or the aligner ALIGN_NONE is specified, then this field is ignored.The maximum value of the alignment_period is 104 weeks (2 years) for charts, and 90,000 seconds (25 hours) for alerting policies. */
  "secondaryAggregation.alignmentPeriod"?: string;
  /** An Aligner describes how to bring the data points in a single time series into temporal alignment. Except for ALIGN_NONE, all alignments cause all the data points in an alignment_period to be mathematically grouped together, resulting in a single data point for each alignment_period with end timestamp at the end of the period.Not all alignment operations may be applied to all time series. The valid choices depend on the metric_kind and value_type of the original time series. Alignment can change the metric_kind or the value_type of the time series.Time series data must be aligned in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified and not equal to ALIGN_NONE and alignment_period must be specified; otherwise, an error is returned. */
  "secondaryAggregation.perSeriesAligner"?: "ALIGN_NONE" | "ALIGN_DELTA" | "ALIGN_RATE" | "ALIGN_INTERPOLATE" | "ALIGN_NEXT_OLDER" | "ALIGN_MIN" | "ALIGN_MAX" | "ALIGN_MEAN" | "ALIGN_COUNT" | "ALIGN_SUM" | "ALIGN_STDDEV" | "ALIGN_COUNT_TRUE" | "ALIGN_COUNT_FALSE" | "ALIGN_FRACTION_TRUE" | "ALIGN_PERCENTILE_99" | "ALIGN_PERCENTILE_95" | "ALIGN_PERCENTILE_50" | "ALIGN_PERCENTILE_05" | "ALIGN_PERCENT_CHANGE" | (string & {});
  /** The reduction operation to be used to combine time series into a single time series, where the value of each data point in the resulting series is a function of all the already aligned values in the input time series.Not all reducer operations can be applied to all time series. The valid choices depend on the metric_kind and the value_type of the original time series. Reduction can yield a time series with a different metric_kind or value_type than the input time series.Time series data must first be aligned (see per_series_aligner) in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified, and must not be ALIGN_NONE. An alignment_period must also be specified; otherwise, an error is returned. */
  "secondaryAggregation.crossSeriesReducer"?: "REDUCE_NONE" | "REDUCE_MEAN" | "REDUCE_MIN" | "REDUCE_MAX" | "REDUCE_SUM" | "REDUCE_STDDEV" | "REDUCE_COUNT" | "REDUCE_COUNT_TRUE" | "REDUCE_COUNT_FALSE" | "REDUCE_FRACTION_TRUE" | "REDUCE_PERCENTILE_99" | "REDUCE_PERCENTILE_95" | "REDUCE_PERCENTILE_50" | "REDUCE_PERCENTILE_05" | (string & {});
  /** The set of fields to preserve when cross_series_reducer is specified. The group_by_fields determine how the time series are partitioned into subsets prior to applying the aggregation operation. Each subset contains time series that have the same value for each of the grouping fields. Each individual time series is a member of exactly one subset. The cross_series_reducer is applied to each subset of time series. It is not possible to reduce across different resource types, so this field implicitly contains resource.type. Fields not specified in group_by_fields are aggregated away. If group_by_fields is not specified and all the time series have the same resource type, then the time series are aggregated into a single output time series. If cross_series_reducer is not defined, this field is ignored. */
  "secondaryAggregation.groupByFields"?: string[];
  /** Unsupported: must be left blank. The points in each time series are currently returned in reverse time order (most recent to oldest). */
  orderBy?: string;
  /** Required. Specifies which information is returned about the time series. */
  view?: "FULL" | "HEADERS" | (string & {});
  /** A positive number that is the maximum number of results to return. If page_size is empty or more than 100,000 results, the effective page_size is 100,000 results. If view is set to FULL, this is the maximum number of Points returned. If view is set to HEADERS, this is the maximum number of TimeSeries returned. */
  pageSize?: number;
  /** If this field is not empty then it must contain the nextPageToken value returned by a previous call to this method. Using this field causes the method to return additional results from the previous method call. */
  pageToken?: string;
}

export const ListFoldersTimeSeriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  "interval.endTime": Schema.optional(Schema.String).pipe(T.HttpQuery("interval.endTime")),
  "interval.startTime": Schema.optional(Schema.String).pipe(T.HttpQuery("interval.startTime")),
  "aggregation.alignmentPeriod": Schema.optional(Schema.String).pipe(T.HttpQuery("aggregation.alignmentPeriod")),
  "aggregation.perSeriesAligner": Schema.optional(Schema.String).pipe(T.HttpQuery("aggregation.perSeriesAligner")),
  "aggregation.crossSeriesReducer": Schema.optional(Schema.String).pipe(T.HttpQuery("aggregation.crossSeriesReducer")),
  "aggregation.groupByFields": Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("aggregation.groupByFields")),
  "secondaryAggregation.alignmentPeriod": Schema.optional(Schema.String).pipe(T.HttpQuery("secondaryAggregation.alignmentPeriod")),
  "secondaryAggregation.perSeriesAligner": Schema.optional(Schema.String).pipe(T.HttpQuery("secondaryAggregation.perSeriesAligner")),
  "secondaryAggregation.crossSeriesReducer": Schema.optional(Schema.String).pipe(T.HttpQuery("secondaryAggregation.crossSeriesReducer")),
  "secondaryAggregation.groupByFields": Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("secondaryAggregation.groupByFields")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3/folders/{foldersId}/timeSeries" }),
  svc,
) as unknown as Schema.Schema<ListFoldersTimeSeriesRequest>;

export type ListFoldersTimeSeriesResponse = ListTimeSeriesResponse;
export const ListFoldersTimeSeriesResponse = ListTimeSeriesResponse;

export type ListFoldersTimeSeriesError = CommonErrors;

export const listFoldersTimeSeries = API.makePaginated(() => ({
  input: ListFoldersTimeSeriesRequest,
  output: ListFoldersTimeSeriesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Create a Service. */
export interface CreateServicesRequest {
  /** Required. Resource name (https://cloud.google.com/monitoring/api/v3#project_name) of the parent Metrics Scope. The format is: projects/[PROJECT_ID_OR_NUMBER] */
  parent: string;
  /** Optional. The Service id to use for this Service. If omitted, an id will be generated instead. Must match the pattern [a-z0-9\-]+ */
  serviceId?: string;
  /** Request body */
  body?: Service;
}

export const CreateServicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  serviceId: Schema.optional(Schema.String).pipe(T.HttpQuery("serviceId")),
  body: Schema.optional(Service).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/{v3Id}/{v3Id1}/services", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateServicesRequest>;

export type CreateServicesResponse = Service;
export const CreateServicesResponse = Service;

export type CreateServicesError = CommonErrors;

export const createServices: API.OperationMethod<CreateServicesRequest, CreateServicesResponse, CreateServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateServicesRequest,
  output: CreateServicesResponse,
  errors: [],
}));

/** Get the named Service. */
export interface GetServicesRequest {
  /** Required. Resource name of the Service. The format is: projects/[PROJECT_ID_OR_NUMBER]/services/[SERVICE_ID] */
  name: string;
}

export const GetServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/{v3Id}/{v3Id1}/services/{servicesId}" }),
  svc,
) as unknown as Schema.Schema<GetServicesRequest>;

export type GetServicesResponse = Service;
export const GetServicesResponse = Service;

export type GetServicesError = CommonErrors;

export const getServices: API.OperationMethod<GetServicesRequest, GetServicesResponse, GetServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetServicesRequest,
  output: GetServicesResponse,
  errors: [],
}));

/** List Services for this Metrics Scope. */
export interface ListServicesRequest {
  /** Required. Resource name of the parent containing the listed services, either a project (https://cloud.google.com/monitoring/api/v3#project_name) or a Monitoring Metrics Scope. The formats are: projects/[PROJECT_ID_OR_NUMBER] workspaces/[HOST_PROJECT_ID_OR_NUMBER] */
  parent: string;
  /** A filter specifying what Services to return. The filter supports filtering on a particular service-identifier type or one of its attributes.To filter on a particular service-identifier type, the identifier_case refers to which option in the identifier field is populated. For example, the filter identifier_case = "CUSTOM" would match all services with a value for the custom field. Valid options include "CUSTOM", "APP_ENGINE", "MESH_ISTIO", and the other options listed at https://cloud.google.com/monitoring/api/ref_v3/rest/v3/services#ServiceTo filter on an attribute of a service-identifier type, apply the filter name by using the snake case of the service-identifier type and the attribute of that service-identifier type, and join the two with a period. For example, to filter by the meshUid field of the MeshIstio service-identifier type, you must filter on mesh_istio.mesh_uid = "123" to match all services with mesh UID "123". Service-identifier types and their attributes are described at https://cloud.google.com/monitoring/api/ref_v3/rest/v3/services#Service */
  filter?: string;
  /** A non-negative number that is the maximum number of results to return. When 0, use default page size. */
  pageSize?: number;
  /** If this field is not empty then it must contain the nextPageToken value returned by a previous call to this method. Using this field causes the method to return additional results from the previous method call. */
  pageToken?: string;
}

export const ListServicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3/{v3Id}/{v3Id1}/services" }),
  svc,
) as unknown as Schema.Schema<ListServicesRequest>;

export type ListServicesResponse_Op = ListServicesResponse;
export const ListServicesResponse_Op = ListServicesResponse;

export type ListServicesError = CommonErrors;

export const listServices = API.makePaginated(() => ({
  input: ListServicesRequest,
  output: ListServicesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Update this Service. */
export interface PatchServicesRequest {
  /** Identifier. Resource name for this Service. The format is: projects/[PROJECT_ID_OR_NUMBER]/services/[SERVICE_ID] */
  name: string;
  /** A set of field paths defining which fields to use for the update. */
  updateMask?: string;
  /** Request body */
  body?: Service;
}

export const PatchServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Service).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/{v3Id}/{v3Id1}/services/{servicesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchServicesRequest>;

export type PatchServicesResponse = Service;
export const PatchServicesResponse = Service;

export type PatchServicesError = CommonErrors;

export const patchServices: API.OperationMethod<PatchServicesRequest, PatchServicesResponse, PatchServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchServicesRequest,
  output: PatchServicesResponse,
  errors: [],
}));

/** Soft delete this Service. */
export interface DeleteServicesRequest {
  /** Required. Resource name of the Service to delete. The format is: projects/[PROJECT_ID_OR_NUMBER]/services/[SERVICE_ID] */
  name: string;
}

export const DeleteServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/{v3Id}/{v3Id1}/services/{servicesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteServicesRequest>;

export type DeleteServicesResponse = Empty;
export const DeleteServicesResponse = Empty;

export type DeleteServicesError = CommonErrors;

export const deleteServices: API.OperationMethod<DeleteServicesRequest, DeleteServicesResponse, DeleteServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteServicesRequest,
  output: DeleteServicesResponse,
  errors: [],
}));

/** Create a ServiceLevelObjective for the given Service. */
export interface CreateServicesServiceLevelObjectivesRequest {
  /** Required. Resource name of the parent Service. The format is: projects/[PROJECT_ID_OR_NUMBER]/services/[SERVICE_ID] */
  parent: string;
  /** Optional. The ServiceLevelObjective id to use for this ServiceLevelObjective. If omitted, an id will be generated instead. Must match the pattern ^[a-zA-Z0-9-_:.]+$ */
  serviceLevelObjectiveId?: string;
  /** Request body */
  body?: ServiceLevelObjective;
}

export const CreateServicesServiceLevelObjectivesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  serviceLevelObjectiveId: Schema.optional(Schema.String).pipe(T.HttpQuery("serviceLevelObjectiveId")),
  body: Schema.optional(ServiceLevelObjective).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/{v3Id}/{v3Id1}/services/{servicesId}/serviceLevelObjectives", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateServicesServiceLevelObjectivesRequest>;

export type CreateServicesServiceLevelObjectivesResponse = ServiceLevelObjective;
export const CreateServicesServiceLevelObjectivesResponse = ServiceLevelObjective;

export type CreateServicesServiceLevelObjectivesError = CommonErrors;

export const createServicesServiceLevelObjectives: API.OperationMethod<CreateServicesServiceLevelObjectivesRequest, CreateServicesServiceLevelObjectivesResponse, CreateServicesServiceLevelObjectivesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateServicesServiceLevelObjectivesRequest,
  output: CreateServicesServiceLevelObjectivesResponse,
  errors: [],
}));

/** Get a ServiceLevelObjective by name. */
export interface GetServicesServiceLevelObjectivesRequest {
  /** Required. Resource name of the ServiceLevelObjective to get. The format is: projects/[PROJECT_ID_OR_NUMBER]/services/[SERVICE_ID]/serviceLevelObjectives/[SLO_NAME] */
  name: string;
  /** View of the ServiceLevelObjective to return. If DEFAULT, return the ServiceLevelObjective as originally defined. If EXPLICIT and the ServiceLevelObjective is defined in terms of a BasicSli, replace the BasicSli with a RequestBasedSli spelling out how the SLI is computed. */
  view?: "VIEW_UNSPECIFIED" | "FULL" | "EXPLICIT" | (string & {});
}

export const GetServicesServiceLevelObjectivesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v3/{v3Id}/{v3Id1}/services/{servicesId}/serviceLevelObjectives/{serviceLevelObjectivesId}" }),
  svc,
) as unknown as Schema.Schema<GetServicesServiceLevelObjectivesRequest>;

export type GetServicesServiceLevelObjectivesResponse = ServiceLevelObjective;
export const GetServicesServiceLevelObjectivesResponse = ServiceLevelObjective;

export type GetServicesServiceLevelObjectivesError = CommonErrors;

export const getServicesServiceLevelObjectives: API.OperationMethod<GetServicesServiceLevelObjectivesRequest, GetServicesServiceLevelObjectivesResponse, GetServicesServiceLevelObjectivesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetServicesServiceLevelObjectivesRequest,
  output: GetServicesServiceLevelObjectivesResponse,
  errors: [],
}));

/** List the ServiceLevelObjectives for the given Service. */
export interface ListServicesServiceLevelObjectivesRequest {
  /** Required. Resource name of the parent containing the listed SLOs, either a project or a Monitoring Metrics Scope. The formats are: projects/[PROJECT_ID_OR_NUMBER]/services/[SERVICE_ID] workspaces/[HOST_PROJECT_ID_OR_NUMBER]/services/- */
  parent: string;
  /** A filter specifying what ServiceLevelObjectives to return. */
  filter?: string;
  /** A non-negative number that is the maximum number of results to return. When 0, use default page size. */
  pageSize?: number;
  /** If this field is not empty then it must contain the nextPageToken value returned by a previous call to this method. Using this field causes the method to return additional results from the previous method call. */
  pageToken?: string;
  /** View of the ServiceLevelObjectives to return. If DEFAULT, return each ServiceLevelObjective as originally defined. If EXPLICIT and the ServiceLevelObjective is defined in terms of a BasicSli, replace the BasicSli with a RequestBasedSli spelling out how the SLI is computed. */
  view?: "VIEW_UNSPECIFIED" | "FULL" | "EXPLICIT" | (string & {});
}

export const ListServicesServiceLevelObjectivesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v3/{v3Id}/{v3Id1}/services/{servicesId}/serviceLevelObjectives" }),
  svc,
) as unknown as Schema.Schema<ListServicesServiceLevelObjectivesRequest>;

export type ListServicesServiceLevelObjectivesResponse = ListServiceLevelObjectivesResponse;
export const ListServicesServiceLevelObjectivesResponse = ListServiceLevelObjectivesResponse;

export type ListServicesServiceLevelObjectivesError = CommonErrors;

export const listServicesServiceLevelObjectives = API.makePaginated(() => ({
  input: ListServicesServiceLevelObjectivesRequest,
  output: ListServicesServiceLevelObjectivesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Update the given ServiceLevelObjective. */
export interface PatchServicesServiceLevelObjectivesRequest {
  /** Identifier. Resource name for this ServiceLevelObjective. The format is: projects/[PROJECT_ID_OR_NUMBER]/services/[SERVICE_ID]/serviceLevelObjectives/[SLO_NAME] */
  name: string;
  /** A set of field paths defining which fields to use for the update. */
  updateMask?: string;
  /** Request body */
  body?: ServiceLevelObjective;
}

export const PatchServicesServiceLevelObjectivesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(ServiceLevelObjective).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/{v3Id}/{v3Id1}/services/{servicesId}/serviceLevelObjectives/{serviceLevelObjectivesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchServicesServiceLevelObjectivesRequest>;

export type PatchServicesServiceLevelObjectivesResponse = ServiceLevelObjective;
export const PatchServicesServiceLevelObjectivesResponse = ServiceLevelObjective;

export type PatchServicesServiceLevelObjectivesError = CommonErrors;

export const patchServicesServiceLevelObjectives: API.OperationMethod<PatchServicesServiceLevelObjectivesRequest, PatchServicesServiceLevelObjectivesResponse, PatchServicesServiceLevelObjectivesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchServicesServiceLevelObjectivesRequest,
  output: PatchServicesServiceLevelObjectivesResponse,
  errors: [],
}));

/** Delete the given ServiceLevelObjective. */
export interface DeleteServicesServiceLevelObjectivesRequest {
  /** Required. Resource name of the ServiceLevelObjective to delete. The format is: projects/[PROJECT_ID_OR_NUMBER]/services/[SERVICE_ID]/serviceLevelObjectives/[SLO_NAME] */
  name: string;
}

export const DeleteServicesServiceLevelObjectivesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/{v3Id}/{v3Id1}/services/{servicesId}/serviceLevelObjectives/{serviceLevelObjectivesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteServicesServiceLevelObjectivesRequest>;

export type DeleteServicesServiceLevelObjectivesResponse = Empty;
export const DeleteServicesServiceLevelObjectivesResponse = Empty;

export type DeleteServicesServiceLevelObjectivesError = CommonErrors;

export const deleteServicesServiceLevelObjectives: API.OperationMethod<DeleteServicesServiceLevelObjectivesRequest, DeleteServicesServiceLevelObjectivesResponse, DeleteServicesServiceLevelObjectivesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteServicesServiceLevelObjectivesRequest,
  output: DeleteServicesServiceLevelObjectivesResponse,
  errors: [],
}));

/** Returns the list of IP addresses that checkers run from. */
export interface ListUptimeCheckIpsRequest {
  /** The maximum number of results to return in a single response. The server may further constrain the maximum number of results returned in a single page. If the page_size is <=0, the server will decide the number of results to be returned. NOTE: this field is not yet implemented */
  pageSize?: number;
  /** If this field is not empty then it must contain the nextPageToken value returned by a previous call to this method. Using this field causes the method to return more results from the previous method call. NOTE: this field is not yet implemented */
  pageToken?: string;
}

export const ListUptimeCheckIpsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3/uptimeCheckIps" }),
  svc,
) as unknown as Schema.Schema<ListUptimeCheckIpsRequest>;

export type ListUptimeCheckIpsResponse_Op = ListUptimeCheckIpsResponse;
export const ListUptimeCheckIpsResponse_Op = ListUptimeCheckIpsResponse;

export type ListUptimeCheckIpsError = CommonErrors;

export const listUptimeCheckIps = API.makePaginated(() => ({
  input: ListUptimeCheckIpsRequest,
  output: ListUptimeCheckIpsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

