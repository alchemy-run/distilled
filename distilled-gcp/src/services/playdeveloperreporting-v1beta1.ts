// ==========================================================================
// Google Play Developer Reporting API (playdeveloperreporting v1beta1)
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
  name: "playdeveloperreporting",
  version: "v1beta1",
  rootUrl: "https://playdeveloperreporting.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

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

export interface GoogleTypeDateTime {
  /** Optional. Year of date. Must be from 1 to 9999, or 0 if specifying a datetime without a year. */
  year?: number;
  /** Optional. Month of year. Must be from 1 to 12, or 0 if specifying a datetime without a month. */
  month?: number;
  /** Optional. Day of month. Must be from 1 to 31 and valid for the year and month, or 0 if specifying a datetime without a day. */
  day?: number;
  /** Optional. Hours of day in 24 hour format. Should be from 0 to 23, defaults to 0 (midnight). An API may choose to allow the value "24:00:00" for scenarios like business closing time. */
  hours?: number;
  /** Optional. Minutes of hour of day. Must be from 0 to 59, defaults to 0. */
  minutes?: number;
  /** Optional. Seconds of minutes of the time. Must normally be from 0 to 59, defaults to 0. An API may allow the value 60 if it allows leap-seconds. */
  seconds?: number;
  /** Optional. Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999, defaults to 0. */
  nanos?: number;
  /** UTC offset. Must be whole seconds, between -18 hours and +18 hours. For example, a UTC offset of -4:00 would be represented as { seconds: -14400 }. */
  utcOffset?: string;
  /** Time zone. */
  timeZone?: GoogleTypeTimeZone;
}

export const GoogleTypeDateTime: Schema.Schema<GoogleTypeDateTime> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
  hours: Schema.optional(Schema.Number),
  minutes: Schema.optional(Schema.Number),
  seconds: Schema.optional(Schema.Number),
  nanos: Schema.optional(Schema.Number),
  utcOffset: Schema.optional(Schema.String),
  timeZone: Schema.optional(GoogleTypeTimeZone),
})).annotate({ identifier: "GoogleTypeDateTime" }) as any as Schema.Schema<GoogleTypeDateTime>;

export interface GooglePlayDeveloperReportingV1beta1TimelineSpec {
  /** Optional. Type of the aggregation period of the datapoints in the timeline. Intervals are identified by the date and time at the start of the interval. */
  aggregationPeriod?: "AGGREGATION_PERIOD_UNSPECIFIED" | "HOURLY" | "DAILY" | "FULL_RANGE" | (string & {});
  /** Optional. Starting datapoint of the timeline (inclusive). Must be aligned to the aggregation period as follows: * HOURLY: the 'minutes', 'seconds' and 'nanos' fields must be unset. The time_zone can be left unset (defaults to UTC) or set explicitly to "UTC". Setting any other utc_offset or timezone id will result in a validation error. * DAILY: the 'hours', 'minutes', 'seconds' and 'nanos' fields must be unset. Different metric sets support different timezones. It can be left unset to use the default timezone specified by the metric set. The timezone of the end point must match the timezone of the start point. */
  startTime?: GoogleTypeDateTime;
  /** Optional. Ending datapoint of the timeline (exclusive). See start_time for restrictions. The timezone of the end point must match the timezone of the start point. */
  endTime?: GoogleTypeDateTime;
}

export const GooglePlayDeveloperReportingV1beta1TimelineSpec: Schema.Schema<GooglePlayDeveloperReportingV1beta1TimelineSpec> = Schema.suspend(() => Schema.Struct({
  aggregationPeriod: Schema.optional(Schema.String),
  startTime: Schema.optional(GoogleTypeDateTime),
  endTime: Schema.optional(GoogleTypeDateTime),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1TimelineSpec" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1TimelineSpec>;

export interface GooglePlayDeveloperReportingV1beta1DimensionValue {
  /** Actual value, represented as a string. */
  stringValue?: string;
  /** Actual value, represented as an int64. */
  int64Value?: string;
  /** Name of the dimension. */
  dimension?: string;
  /** Optional. Human-friendly label for the value, always in English. For example, 'Spain' for the 'ES' country code. Whereas the dimension value is stable, this value label is subject to change. Do not assume that the (value, value_label) relationship is stable. For example, the ISO country code 'MK' changed its name recently to 'North Macedonia'. */
  valueLabel?: string;
}

export const GooglePlayDeveloperReportingV1beta1DimensionValue: Schema.Schema<GooglePlayDeveloperReportingV1beta1DimensionValue> = Schema.suspend(() => Schema.Struct({
  stringValue: Schema.optional(Schema.String),
  int64Value: Schema.optional(Schema.String),
  dimension: Schema.optional(Schema.String),
  valueLabel: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1DimensionValue" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1DimensionValue>;

export interface GoogleTypeDecimal {
  /** The decimal value, as a string. The string representation consists of an optional sign, `+` (`U+002B`) or `-` (`U+002D`), followed by a sequence of zero or more decimal digits ("the integer"), optionally followed by a fraction, optionally followed by an exponent. An empty string **should** be interpreted as `0`. The fraction consists of a decimal point followed by zero or more decimal digits. The string must contain at least one digit in either the integer or the fraction. The number formed by the sign, the integer and the fraction is referred to as the significand. The exponent consists of the character `e` (`U+0065`) or `E` (`U+0045`) followed by one or more decimal digits. Services **should** normalize decimal values before storing them by: - Removing an explicitly-provided `+` sign (`+2.5` -> `2.5`). - Replacing a zero-length integer value with `0` (`.5` -> `0.5`). - Coercing the exponent character to upper-case, with explicit sign (`2.5e8` -> `2.5E+8`). - Removing an explicitly-provided zero exponent (`2.5E0` -> `2.5`). Services **may** perform additional normalization based on its own needs and the internal decimal implementation selected, such as shifting the decimal point and exponent value together (example: `2.5E-1` <-> `0.25`). Additionally, services **may** preserve trailing zeroes in the fraction to indicate increased precision, but are not required to do so. Note that only the `.` character is supported to divide the integer and the fraction; `,` **should not** be supported regardless of locale. Additionally, thousand separators **should not** be supported. If a service does support them, values **must** be normalized. The ENBF grammar is: DecimalString = '' | [Sign] Significand [Exponent]; Sign = '+' | '-'; Significand = Digits '.' | [Digits] '.' Digits; Exponent = ('e' | 'E') [Sign] Digits; Digits = { '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' }; Services **should** clearly document the range of supported values, the maximum supported precision (total number of digits), and, if applicable, the scale (number of digits after the decimal point), as well as how it behaves when receiving out-of-bounds values. Services **may** choose to accept values passed as input even when the value has a higher precision or scale than the service supports, and **should** round the value to fit the supported scale. Alternatively, the service **may** error with `400 Bad Request` (`INVALID_ARGUMENT` in gRPC) if precision would be lost. Services **should** error with `400 Bad Request` (`INVALID_ARGUMENT` in gRPC) if the service receives a value outside of the supported range. */
  value?: string;
}

export const GoogleTypeDecimal: Schema.Schema<GoogleTypeDecimal> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleTypeDecimal" }) as any as Schema.Schema<GoogleTypeDecimal>;

export interface GooglePlayDeveloperReportingV1beta1DecimalConfidenceInterval {
  /** The confidence interval's lower bound. */
  lowerBound?: GoogleTypeDecimal;
  /** The confidence interval's upper bound. */
  upperBound?: GoogleTypeDecimal;
}

export const GooglePlayDeveloperReportingV1beta1DecimalConfidenceInterval: Schema.Schema<GooglePlayDeveloperReportingV1beta1DecimalConfidenceInterval> = Schema.suspend(() => Schema.Struct({
  lowerBound: Schema.optional(GoogleTypeDecimal),
  upperBound: Schema.optional(GoogleTypeDecimal),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1DecimalConfidenceInterval" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1DecimalConfidenceInterval>;

export interface GooglePlayDeveloperReportingV1beta1MetricValue {
  /** Actual value, represented as a decimal number. */
  decimalValue?: GoogleTypeDecimal;
  /** Confidence interval of a value that is of type `type.Decimal`. */
  decimalValueConfidenceInterval?: GooglePlayDeveloperReportingV1beta1DecimalConfidenceInterval;
  /** Name of the metric. */
  metric?: string;
}

export const GooglePlayDeveloperReportingV1beta1MetricValue: Schema.Schema<GooglePlayDeveloperReportingV1beta1MetricValue> = Schema.suspend(() => Schema.Struct({
  decimalValue: Schema.optional(GoogleTypeDecimal),
  decimalValueConfidenceInterval: Schema.optional(GooglePlayDeveloperReportingV1beta1DecimalConfidenceInterval),
  metric: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1MetricValue" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1MetricValue>;

export interface GooglePlayDeveloperReportingV1beta1Anomaly {
  /** Identifier. Name of the anomaly. Format: apps/{app}/anomalies/{anomaly} */
  name?: string;
  /** Metric set resource where the anomaly was detected. */
  metricSet?: string;
  /** Timeline specification that covers the anomaly period. */
  timelineSpec?: GooglePlayDeveloperReportingV1beta1TimelineSpec;
  /** Combination of dimensions in which the anomaly was detected. */
  dimensions?: Array<GooglePlayDeveloperReportingV1beta1DimensionValue>;
  /** Metric where the anomaly was detected, together with the anomalous value. */
  metric?: GooglePlayDeveloperReportingV1beta1MetricValue;
}

export const GooglePlayDeveloperReportingV1beta1Anomaly: Schema.Schema<GooglePlayDeveloperReportingV1beta1Anomaly> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metricSet: Schema.optional(Schema.String),
  timelineSpec: Schema.optional(GooglePlayDeveloperReportingV1beta1TimelineSpec),
  dimensions: Schema.optional(Schema.Array(GooglePlayDeveloperReportingV1beta1DimensionValue)),
  metric: Schema.optional(GooglePlayDeveloperReportingV1beta1MetricValue),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1Anomaly" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1Anomaly>;

export interface GooglePlayDeveloperReportingV1beta1ListAnomaliesResponse {
  /** Anomalies that were found. */
  anomalies?: Array<GooglePlayDeveloperReportingV1beta1Anomaly>;
  /** Continuation token to fetch the next page of data. */
  nextPageToken?: string;
}

export const GooglePlayDeveloperReportingV1beta1ListAnomaliesResponse: Schema.Schema<GooglePlayDeveloperReportingV1beta1ListAnomaliesResponse> = Schema.suspend(() => Schema.Struct({
  anomalies: Schema.optional(Schema.Array(GooglePlayDeveloperReportingV1beta1Anomaly)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1ListAnomaliesResponse" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1ListAnomaliesResponse>;

export interface GooglePlayDeveloperReportingV1beta1FreshnessInfoFreshness {
  /** Aggregation period for which data is available. */
  aggregationPeriod?: "AGGREGATION_PERIOD_UNSPECIFIED" | "HOURLY" | "DAILY" | "FULL_RANGE" | (string & {});
  /** Latest end time for which data is available, for the aggregation period. The time is specified in the metric set's default timezone. *Note:* time ranges in TimelineSpec are represented as `start_time, end_time)`. For example, if the latest available timeline data point for a `DAILY` aggregation period is `2021-06-23 00:00:00 America/Los_Angeles`, the value of this field would be `2021-06-24 00:00:00 America/Los_Angeles` so it can be easily reused in [TimelineSpec.end_time. */
  latestEndTime?: GoogleTypeDateTime;
}

export const GooglePlayDeveloperReportingV1beta1FreshnessInfoFreshness: Schema.Schema<GooglePlayDeveloperReportingV1beta1FreshnessInfoFreshness> = Schema.suspend(() => Schema.Struct({
  aggregationPeriod: Schema.optional(Schema.String),
  latestEndTime: Schema.optional(GoogleTypeDateTime),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1FreshnessInfoFreshness" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1FreshnessInfoFreshness>;

export interface GooglePlayDeveloperReportingV1beta1FreshnessInfo {
  /** Information about data freshness for every supported aggregation period. This field has set semantics, keyed by the `aggregation_period` field. */
  freshnesses?: Array<GooglePlayDeveloperReportingV1beta1FreshnessInfoFreshness>;
}

export const GooglePlayDeveloperReportingV1beta1FreshnessInfo: Schema.Schema<GooglePlayDeveloperReportingV1beta1FreshnessInfo> = Schema.suspend(() => Schema.Struct({
  freshnesses: Schema.optional(Schema.Array(GooglePlayDeveloperReportingV1beta1FreshnessInfoFreshness)),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1FreshnessInfo" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1FreshnessInfo>;

export interface GooglePlayDeveloperReportingV1beta1CrashRateMetricSet {
  /** Identifier. The resource name. Format: apps/{app}/crashRateMetricSet */
  name?: string;
  /** Summary about data freshness in this resource. */
  freshnessInfo?: GooglePlayDeveloperReportingV1beta1FreshnessInfo;
}

export const GooglePlayDeveloperReportingV1beta1CrashRateMetricSet: Schema.Schema<GooglePlayDeveloperReportingV1beta1CrashRateMetricSet> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  freshnessInfo: Schema.optional(GooglePlayDeveloperReportingV1beta1FreshnessInfo),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1CrashRateMetricSet" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1CrashRateMetricSet>;

export interface GooglePlayDeveloperReportingV1beta1QueryCrashRateMetricSetRequest {
  /** Optional. Specification of the timeline aggregation parameters. **Supported aggregation periods:** * DAILY: metrics are aggregated in calendar date intervals. Due to historical constraints, the default and only supported timezone is `America/Los_Angeles`. * HOURLY: metrics are aggregated in hourly intervals. The default and only supported timezone is `UTC`. */
  timelineSpec?: GooglePlayDeveloperReportingV1beta1TimelineSpec;
  /** Optional. Dimensions to slice the metrics by. **Supported dimensions:** * `apiLevel` (string): the API level of Android that was running on the user's device, e.g., 26. * `versionCode` (int64): version of the app that was running on the user's device. * `deviceModel` (string): unique identifier of the user's device model. The form of the identifier is 'deviceBrand/device', where deviceBrand corresponds to Build.BRAND and device corresponds to Build.DEVICE, e.g., google/coral. * `deviceBrand` (string): unique identifier of the user's device brand, e.g., google. * `deviceType` (string): the type (also known as form factor) of the user's device, e.g., PHONE. * `countryCode` (string): the country or region of the user's device based on their IP address, represented as a 2-letter ISO-3166 code (e.g. US for the United States). * `deviceRamBucket` (int64): RAM of the device, in MB, in buckets (3GB, 4GB, etc.). * `deviceSocMake` (string): Make of the device's primary system-on-chip, e.g., Samsung. [Reference](https://developer.android.com/reference/android/os/Build#SOC_MANUFACTURER) * `deviceSocModel` (string): Model of the device's primary system-on-chip, e.g., "Exynos 2100". [Reference](https://developer.android.com/reference/android/os/Build#SOC_MODEL) * `deviceCpuMake` (string): Make of the device's CPU, e.g., Qualcomm. * `deviceCpuModel` (string): Model of the device's CPU, e.g., "Kryo 240". * `deviceGpuMake` (string): Make of the device's GPU, e.g., ARM. * `deviceGpuModel` (string): Model of the device's GPU, e.g., Mali. * `deviceGpuVersion` (string): Version of the device's GPU, e.g., T750. * `deviceVulkanVersion` (string): Vulkan version of the device, e.g., "4198400". * `deviceGlEsVersion` (string): OpenGL ES version of the device, e.g., "196610". * `deviceScreenSize` (string): Screen size of the device, e.g., NORMAL, LARGE. * `deviceScreenDpi` (string): Screen density of the device, e.g., mdpi, hdpi. */
  dimensions?: Array<string>;
  /** Optional. Metrics to aggregate. **Supported metrics:** * `crashRate` (`google.type.Decimal`): Percentage of distinct users in the aggregation period that experienced at least one crash. * `crashRate7dUserWeighted` (`google.type.Decimal`): Rolling average value of `crashRate` in the last 7 days. The daily values are weighted by the count of distinct users for the day. * `crashRate28dUserWeighted` (`google.type.Decimal`): Rolling average value of `crashRate` in the last 28 days. The daily values are weighted by the count of distinct users for the day. Not supported in HOURLY granularity. * `userPerceivedCrashRate` (`google.type.Decimal`): Percentage of distinct users in the aggregation period that experienced at least one crash while they were actively using your app (a user-perceived crash). An app is considered to be in active use if it is displaying any activity or executing any foreground service. * `userPerceivedCrashRate7dUserWeighted` (`google.type.Decimal`): Rolling average value of `userPerceivedCrashRate` in the last 7 days. The daily values are weighted by the count of distinct users for the day. Not supported in HOURLY granularity. * `userPerceivedCrashRate28dUserWeighted` (`google.type.Decimal`): Rolling average value of `userPerceivedCrashRate` in the last 28 days. The daily values are weighted by the count of distinct users for the day. Not supported in HOURLY granularity. * `distinctUsers` (`google.type.Decimal`): Count of distinct users in the aggregation period that were used as normalization value for the `crashRate` and `userPerceivedCrashRate` metrics. A user is counted in this metric if they used the app actively during the aggregation period. An app is considered to be in active use if it is displaying any activity or executing any foreground service. Care must be taken not to aggregate this count further, as it may result in users being counted multiple times. The value is rounded to the nearest multiple of 10, 100, 1,000 or 1,000,000, depending on the magnitude of the value. */
  metrics?: Array<string>;
  /** Optional. Filters to apply to data. The filtering expression follows [AIP-160](https://google.aip.dev/160) standard and supports filtering by equality of all breakdown dimensions. */
  filter?: string;
  /** Optional. Maximum size of the returned data. If unspecified, at most 1000 rows will be returned. The maximum value is 100,000; values above 100,000 will be coerced to 100,000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to the request must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. User view to select. The output data will correspond to the selected view. **Supported values:** * `OS_PUBLIC` To select data from all publicly released Android versions. This is the default. Supports all the above dimensions. * `APP_TESTERS` To select data from users who have opted in to be testers. Supports all the above dimensions. * `OS_BETA` To select data from beta android versions only, excluding data from released android versions. Only the following dimensions are supported: * `versionCode` (int64): version of the app that was running on the user's device. * `osBuild` (string): OS build of the user's device, e.g., "T1B2.220916.004". */
  userCohort?: "USER_COHORT_UNSPECIFIED" | "OS_PUBLIC" | "OS_BETA" | "APP_TESTERS" | (string & {});
}

export const GooglePlayDeveloperReportingV1beta1QueryCrashRateMetricSetRequest: Schema.Schema<GooglePlayDeveloperReportingV1beta1QueryCrashRateMetricSetRequest> = Schema.suspend(() => Schema.Struct({
  timelineSpec: Schema.optional(GooglePlayDeveloperReportingV1beta1TimelineSpec),
  dimensions: Schema.optional(Schema.Array(Schema.String)),
  metrics: Schema.optional(Schema.Array(Schema.String)),
  filter: Schema.optional(Schema.String),
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
  userCohort: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1QueryCrashRateMetricSetRequest" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1QueryCrashRateMetricSetRequest>;

export interface GooglePlayDeveloperReportingV1beta1MetricsRow {
  /** Optional. Granularity of the aggregation period of the row. */
  aggregationPeriod?: "AGGREGATION_PERIOD_UNSPECIFIED" | "HOURLY" | "DAILY" | "FULL_RANGE" | (string & {});
  /** Optional. Starting date (and time for hourly aggregation) of the period covered by this row. */
  startTime?: GoogleTypeDateTime;
  /** Optional. Dimension columns in the row. */
  dimensions?: Array<GooglePlayDeveloperReportingV1beta1DimensionValue>;
  /** Optional. Metric columns in the row. */
  metrics?: Array<GooglePlayDeveloperReportingV1beta1MetricValue>;
}

export const GooglePlayDeveloperReportingV1beta1MetricsRow: Schema.Schema<GooglePlayDeveloperReportingV1beta1MetricsRow> = Schema.suspend(() => Schema.Struct({
  aggregationPeriod: Schema.optional(Schema.String),
  startTime: Schema.optional(GoogleTypeDateTime),
  dimensions: Schema.optional(Schema.Array(GooglePlayDeveloperReportingV1beta1DimensionValue)),
  metrics: Schema.optional(Schema.Array(GooglePlayDeveloperReportingV1beta1MetricValue)),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1MetricsRow" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1MetricsRow>;

export interface GooglePlayDeveloperReportingV1beta1QueryCrashRateMetricSetResponse {
  /** Returned rows of data. */
  rows?: Array<GooglePlayDeveloperReportingV1beta1MetricsRow>;
  /** Continuation token to fetch the next page of data. */
  nextPageToken?: string;
}

export const GooglePlayDeveloperReportingV1beta1QueryCrashRateMetricSetResponse: Schema.Schema<GooglePlayDeveloperReportingV1beta1QueryCrashRateMetricSetResponse> = Schema.suspend(() => Schema.Struct({
  rows: Schema.optional(Schema.Array(GooglePlayDeveloperReportingV1beta1MetricsRow)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1QueryCrashRateMetricSetResponse" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1QueryCrashRateMetricSetResponse>;

export interface GooglePlayDeveloperReportingV1beta1AnrRateMetricSet {
  /** Identifier. The resource name. Format: apps/{app}/anrRateMetricSet */
  name?: string;
  /** Summary about data freshness in this resource. */
  freshnessInfo?: GooglePlayDeveloperReportingV1beta1FreshnessInfo;
}

export const GooglePlayDeveloperReportingV1beta1AnrRateMetricSet: Schema.Schema<GooglePlayDeveloperReportingV1beta1AnrRateMetricSet> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  freshnessInfo: Schema.optional(GooglePlayDeveloperReportingV1beta1FreshnessInfo),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1AnrRateMetricSet" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1AnrRateMetricSet>;

export interface GooglePlayDeveloperReportingV1beta1QueryAnrRateMetricSetRequest {
  /** Optional. Specification of the timeline aggregation parameters. **Supported aggregation periods:** * DAILY: metrics are aggregated in calendar date intervals. Due to historical constraints, the default and only supported timezone is `America/Los_Angeles`. * HOURLY: metrics are aggregated in hourly intervals. The default and only supported timezone is `UTC`. */
  timelineSpec?: GooglePlayDeveloperReportingV1beta1TimelineSpec;
  /** Optional. Dimensions to slice the metrics by. **Supported dimensions:** * `apiLevel` (string): the API level of Android that was running on the user's device, e.g., 26. * `versionCode` (int64): version of the app that was running on the user's device. * `deviceModel` (string): unique identifier of the user's device model. The form of the identifier is 'deviceBrand/device', where deviceBrand corresponds to Build.BRAND and device corresponds to Build.DEVICE, e.g., google/coral. * `deviceBrand` (string): unique identifier of the user's device brand, e.g., google. * `deviceType` (string): the type (also known as form factor) of the user's device, e.g., PHONE. * `countryCode` (string): the country or region of the user's device based on their IP address, represented as a 2-letter ISO-3166 code (e.g. US for the United States). * `deviceRamBucket` (int64): RAM of the device, in MB, in buckets (3GB, 4GB, etc.). * `deviceSocMake` (string): Make of the device's primary system-on-chip, e.g., Samsung. [Reference](https://developer.android.com/reference/android/os/Build#SOC_MANUFACTURER) * `deviceSocModel` (string): Model of the device's primary system-on-chip, e.g., "Exynos 2100". [Reference](https://developer.android.com/reference/android/os/Build#SOC_MODEL) * `deviceCpuMake` (string): Make of the device's CPU, e.g., Qualcomm. * `deviceCpuModel` (string): Model of the device's CPU, e.g., "Kryo 240". * `deviceGpuMake` (string): Make of the device's GPU, e.g., ARM. * `deviceGpuModel` (string): Model of the device's GPU, e.g., Mali. * `deviceGpuVersion` (string): Version of the device's GPU, e.g., T750. * `deviceVulkanVersion` (string): Vulkan version of the device, e.g., "4198400". * `deviceGlEsVersion` (string): OpenGL ES version of the device, e.g., "196610". * `deviceScreenSize` (string): Screen size of the device, e.g., NORMAL, LARGE. * `deviceScreenDpi` (string): Screen density of the device, e.g., mdpi, hdpi. */
  dimensions?: Array<string>;
  /** Optional. Metrics to aggregate. **Supported metrics:** * `anrRate` (`google.type.Decimal`): Percentage of distinct users in the aggregation period that experienced at least one ANR. * `anrRate7dUserWeighted` (`google.type.Decimal`): Rolling average value of `anrRate` in the last 7 days. The daily values are weighted by the count of distinct users for the day. Not supported in HOURLY granularity. * `anrRate28dUserWeighted` (`google.type.Decimal`): Rolling average value of `anrRate` in the last 28 days. The daily values are weighted by the count of distinct users for the day. Not supported in HOURLY granularity. * `userPerceivedAnrRate` (`google.type.Decimal`): Percentage of distinct users in the aggregation period that experienced at least one user-perceived ANR. User-perceived ANRs are currently those of 'Input dispatching' type. * `userPerceivedAnrRate7dUserWeighted` (`google.type.Decimal`): Rolling average value of `userPerceivedAnrRate` in the last 7 days. The daily values are weighted by the count of distinct users for the day. Not supported in HOURLY granularity. * `userPerceivedAnrRate28dUserWeighted` (`google.type.Decimal`): Rolling average value of `userPerceivedAnrRate` in the last 28 days. The daily values are weighted by the count of distinct users for the day. Not . supported in HOURLY granularity. * `distinctUsers` (`google.type.Decimal`): Count of distinct users in the aggregation period that were used as normalization value for the `anrRate` and `userPerceivedAnrRate` metrics. A user is counted in this metric if they used the app in the foreground during the aggregation period. Care must be taken not to aggregate this count further, as it may result in users being counted multiple times. The value is rounded to the nearest multiple of 10, 100, 1,000 or 1,000,000, depending on the magnitude of the value. */
  metrics?: Array<string>;
  /** Optional. Filters to apply to data. The filtering expression follows [AIP-160](https://google.aip.dev/160) standard and supports filtering by equality of all breakdown dimensions. */
  filter?: string;
  /** Optional. Maximum size of the returned data. If unspecified, at most 1000 rows will be returned. The maximum value is 100,000; values above 100,000 will be coerced to 100,000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to the request must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. User view to select. The output data will correspond to the selected view. **Supported values:** * `OS_PUBLIC` To select data from all publicly released Android versions. This is the default. Supports all the above dimensions. * `APP_TESTERS` To select data from users who have opted in to be testers. Supports all the above dimensions. * `OS_BETA` To select data from beta android versions only, excluding data from released android versions. Only the following dimensions are supported: * `versionCode` (int64): version of the app that was running on the user's device. * `osBuild` (string): OS build of the user's device, e.g., "T1B2.220916.004". */
  userCohort?: "USER_COHORT_UNSPECIFIED" | "OS_PUBLIC" | "OS_BETA" | "APP_TESTERS" | (string & {});
}

export const GooglePlayDeveloperReportingV1beta1QueryAnrRateMetricSetRequest: Schema.Schema<GooglePlayDeveloperReportingV1beta1QueryAnrRateMetricSetRequest> = Schema.suspend(() => Schema.Struct({
  timelineSpec: Schema.optional(GooglePlayDeveloperReportingV1beta1TimelineSpec),
  dimensions: Schema.optional(Schema.Array(Schema.String)),
  metrics: Schema.optional(Schema.Array(Schema.String)),
  filter: Schema.optional(Schema.String),
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
  userCohort: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1QueryAnrRateMetricSetRequest" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1QueryAnrRateMetricSetRequest>;

export interface GooglePlayDeveloperReportingV1beta1QueryAnrRateMetricSetResponse {
  /** Returned rows of data. */
  rows?: Array<GooglePlayDeveloperReportingV1beta1MetricsRow>;
  /** Continuation token to fetch the next page of data. */
  nextPageToken?: string;
}

export const GooglePlayDeveloperReportingV1beta1QueryAnrRateMetricSetResponse: Schema.Schema<GooglePlayDeveloperReportingV1beta1QueryAnrRateMetricSetResponse> = Schema.suspend(() => Schema.Struct({
  rows: Schema.optional(Schema.Array(GooglePlayDeveloperReportingV1beta1MetricsRow)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1QueryAnrRateMetricSetResponse" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1QueryAnrRateMetricSetResponse>;

export interface GooglePlayDeveloperReportingV1beta1LmkRateMetricSet {
  /** Identifier. The resource name. Format: apps/{app}/lmkRateMetricSet */
  name?: string;
  /** Summary about data freshness in this resource. */
  freshnessInfo?: GooglePlayDeveloperReportingV1beta1FreshnessInfo;
}

export const GooglePlayDeveloperReportingV1beta1LmkRateMetricSet: Schema.Schema<GooglePlayDeveloperReportingV1beta1LmkRateMetricSet> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  freshnessInfo: Schema.optional(GooglePlayDeveloperReportingV1beta1FreshnessInfo),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1LmkRateMetricSet" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1LmkRateMetricSet>;

export interface GooglePlayDeveloperReportingV1beta1QueryLmkRateMetricSetRequest {
  /** Optional. Specification of the timeline aggregation parameters. **Supported aggregation periods:** * DAILY: metrics are aggregated in calendar date intervals. Due to historical constraints, the default and only supported timezone is `America/Los_Angeles`. */
  timelineSpec?: GooglePlayDeveloperReportingV1beta1TimelineSpec;
  /** Optional. Dimensions to slice the metrics by. **Supported dimensions:** * `apiLevel` (string): the API level of Android that was running on the user's device, e.g., 26. * `versionCode` (int64): version of the app that was running on the user's device. * `deviceModel` (string): unique identifier of the user's device model. The form of the identifier is 'deviceBrand/device', where deviceBrand corresponds to Build.BRAND and device corresponds to Build.DEVICE, e.g., google/coral. * `deviceBrand` (string): unique identifier of the user's device brand, e.g., google. * `deviceType` (string): the type (also known as form factor) of the user's device, e.g., PHONE. * `countryCode` (string): the country or region of the user's device based on their IP address, represented as a 2-letter ISO-3166 code (e.g. US for the United States). * `deviceRamBucket` (int64): RAM of the device, in MB, in buckets (3GB, 4GB, etc.). * `deviceSocMake` (string): Make of the device's primary system-on-chip, e.g., Samsung. [Reference](https://developer.android.com/reference/android/os/Build#SOC_MANUFACTURER) * `deviceSocModel` (string): Model of the device's primary system-on-chip, e.g., "Exynos 2100". [Reference](https://developer.android.com/reference/android/os/Build#SOC_MODEL) * `deviceCpuMake` (string): Make of the device's CPU, e.g., Qualcomm. * `deviceCpuModel` (string): Model of the device's CPU, e.g., "Kryo 240". * `deviceGpuMake` (string): Make of the device's GPU, e.g., ARM. * `deviceGpuModel` (string): Model of the device's GPU, e.g., Mali. * `deviceGpuVersion` (string): Version of the device's GPU, e.g., T750. * `deviceVulkanVersion` (string): Vulkan version of the device, e.g., "4198400". * `deviceGlEsVersion` (string): OpenGL ES version of the device, e.g., "196610". * `deviceScreenSize` (string): Screen size of the device, e.g., NORMAL, LARGE. * `deviceScreenDpi` (string): Screen density of the device, e.g., mdpi, hdpi. */
  dimensions?: Array<string>;
  /** Optional. Metrics to aggregate. **Supported metrics:** * `userPerceivedLmkRate` (`google.type.Decimal`): Percentage of distinct users in the aggregation period that experienced at least one LMK while they were actively using your app (a user-perceived LMK). An app is considered to be in active use if it is displaying any activity or executing any foreground service. * `userPerceivedLmkRate7dUserWeighted` (`google.type.Decimal`): Rolling average value of `userPerceivedLmkRate` in the last 7 days. The daily values are weighted by the count of distinct users for the day. * `userPerceivedLmkRate28dUserWeighted` (`google.type.Decimal`): Rolling average value of `userPerceivedLmkRate` in the last 28 days. The daily values are weighted by the count of distinct users for the day. * `distinctUsers` (`google.type.Decimal`): Count of distinct users in the aggregation period that were used as normalization value for the `userPerceivedLmkRate` metrics. A user is counted in this metric if they used the app in the foreground during the aggregation period. Care must be taken not to aggregate this count further, as it may result in users being counted multiple times. The value is rounded to the nearest multiple of 10, 100, 1,000 or 1,000,000, depending on the magnitude of the value. */
  metrics?: Array<string>;
  /** Optional. Filters to apply to data. The filtering expression follows [AIP-160](https://google.aip.dev/160) standard and supports filtering by equality of all breakdown dimensions. */
  filter?: string;
  /** Optional. Maximum size of the returned data. If unspecified, at most 1000 rows will be returned. The maximum value is 100,000; values above 100,000 will be coerced to 100,000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to the request must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. User view to select. The output data will correspond to the selected view. **Supported values:** * `OS_PUBLIC` To select data from all publicly released Android versions. This is the default. Supports all the above dimensions. * `APP_TESTERS` To select data from users who have opted in to be testers. Supports all the above dimensions. * `OS_BETA` To select data from beta android versions only, excluding data from released android versions. Only the following dimensions are supported: * `versionCode` (int64): version of the app that was running on the user's device. * `osBuild` (string): OS build of the user's device, e.g., "T1B2.220916.004". */
  userCohort?: "USER_COHORT_UNSPECIFIED" | "OS_PUBLIC" | "OS_BETA" | "APP_TESTERS" | (string & {});
}

export const GooglePlayDeveloperReportingV1beta1QueryLmkRateMetricSetRequest: Schema.Schema<GooglePlayDeveloperReportingV1beta1QueryLmkRateMetricSetRequest> = Schema.suspend(() => Schema.Struct({
  timelineSpec: Schema.optional(GooglePlayDeveloperReportingV1beta1TimelineSpec),
  dimensions: Schema.optional(Schema.Array(Schema.String)),
  metrics: Schema.optional(Schema.Array(Schema.String)),
  filter: Schema.optional(Schema.String),
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
  userCohort: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1QueryLmkRateMetricSetRequest" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1QueryLmkRateMetricSetRequest>;

export interface GooglePlayDeveloperReportingV1beta1QueryLmkRateMetricSetResponse {
  /** Returned rows of data. */
  rows?: Array<GooglePlayDeveloperReportingV1beta1MetricsRow>;
  /** Continuation token to fetch the next page of data. */
  nextPageToken?: string;
}

export const GooglePlayDeveloperReportingV1beta1QueryLmkRateMetricSetResponse: Schema.Schema<GooglePlayDeveloperReportingV1beta1QueryLmkRateMetricSetResponse> = Schema.suspend(() => Schema.Struct({
  rows: Schema.optional(Schema.Array(GooglePlayDeveloperReportingV1beta1MetricsRow)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1QueryLmkRateMetricSetResponse" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1QueryLmkRateMetricSetResponse>;

export interface GooglePlayDeveloperReportingV1beta1ExcessiveWakeupRateMetricSet {
  /** Identifier. The resource name. Format: apps/{app}/excessiveWakeupRateMetricSet */
  name?: string;
  /** Summary about data freshness in this resource. */
  freshnessInfo?: GooglePlayDeveloperReportingV1beta1FreshnessInfo;
}

export const GooglePlayDeveloperReportingV1beta1ExcessiveWakeupRateMetricSet: Schema.Schema<GooglePlayDeveloperReportingV1beta1ExcessiveWakeupRateMetricSet> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  freshnessInfo: Schema.optional(GooglePlayDeveloperReportingV1beta1FreshnessInfo),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1ExcessiveWakeupRateMetricSet" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1ExcessiveWakeupRateMetricSet>;

export interface GooglePlayDeveloperReportingV1beta1QueryExcessiveWakeupRateMetricSetRequest {
  /** Optional. Specification of the timeline aggregation parameters. **Supported aggregation periods:** * DAILY: metrics are aggregated in calendar date intervals. Due to historical constraints, the only supported timezone is `America/Los_Angeles`. */
  timelineSpec?: GooglePlayDeveloperReportingV1beta1TimelineSpec;
  /** Optional. Dimensions to slice the data by. **Supported dimensions:** * `apiLevel` (string): the API level of Android that was running on the user's device, e.g., 26. * `versionCode` (int64): version of the app that was running on the user's device. * `deviceModel` (string): unique identifier of the user's device model. The form of the identifier is 'deviceBrand/device', where deviceBrand corresponds to Build.BRAND and device corresponds to Build.DEVICE, e.g., google/coral. * `deviceBrand` (string): unique identifier of the user's device brand, e.g., google. * `deviceType` (string): the type (also known as form factor) of the user's device, e.g., PHONE. * `countryCode` (string): the country or region of the user's device based on their IP address, represented as a 2-letter ISO-3166 code (e.g. US for the United States). * `deviceRamBucket` (int64): RAM of the device, in MB, in buckets (3GB, 4GB, etc.). * `deviceSocMake` (string): Make of the device's primary system-on-chip, e.g., Samsung. [Reference](https://developer.android.com/reference/android/os/Build#SOC_MANUFACTURER) * `deviceSocModel` (string): Model of the device's primary system-on-chip, e.g., "Exynos 2100". [Reference](https://developer.android.com/reference/android/os/Build#SOC_MODEL) * `deviceCpuMake` (string): Make of the device's CPU, e.g., Qualcomm. * `deviceCpuModel` (string): Model of the device's CPU, e.g., "Kryo 240". * `deviceGpuMake` (string): Make of the device's GPU, e.g., ARM. * `deviceGpuModel` (string): Model of the device's GPU, e.g., Mali. * `deviceGpuVersion` (string): Version of the device's GPU, e.g., T750. * `deviceVulkanVersion` (string): Vulkan version of the device, e.g., "4198400". * `deviceGlEsVersion` (string): OpenGL ES version of the device, e.g., "196610". * `deviceScreenSize` (string): Screen size of the device, e.g., NORMAL, LARGE. * `deviceScreenDpi` (string): Screen density of the device, e.g., mdpi, hdpi. */
  dimensions?: Array<string>;
  /** Optional. Metrics to aggregate. **Supported metrics:** * `excessiveWakeupRate` (`google.type.Decimal`): Percentage of distinct users in the aggregation period that had more than 10 wakeups per hour. * `excessiveWakeupRate7dUserWeighted` (`google.type.Decimal`): Rolling average value of `excessiveWakeupRate` in the last 7 days. The daily values are weighted by the count of distinct users for the day. * `excessiveWakeupRate28dUserWeighted` (`google.type.Decimal`): Rolling average value of `excessiveWakeupRate` in the last 28 days. The daily values are weighted by the count of distinct users for the day. * `distinctUsers` (`google.type.Decimal`): Count of distinct users in the aggregation period that were used as normalization value for the `excessiveWakeupRate` metric. A user is counted in this metric if they app was doing any work on the device, i.e., not just active foreground usage but also background work. Care must be taken not to aggregate this count further, as it may result in users being counted multiple times. The value is rounded to the nearest multiple of 10, 100, 1,000 or 1,000,000, depending on the magnitude of the value. */
  metrics?: Array<string>;
  /** Optional. Filters to apply to data. The filtering expression follows [AIP-160](https://google.aip.dev/160) standard and supports filtering by equality of all breakdown dimensions. */
  filter?: string;
  /** Optional. Maximum size of the returned data. If unspecified, at most 1000 rows will be returned. The maximum value is 100000; values above 100000 will be coerced to 100000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to the request must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. User view to select. The output data will correspond to the selected view. The only supported value is `OS_PUBLIC`. */
  userCohort?: "USER_COHORT_UNSPECIFIED" | "OS_PUBLIC" | "OS_BETA" | "APP_TESTERS" | (string & {});
}

export const GooglePlayDeveloperReportingV1beta1QueryExcessiveWakeupRateMetricSetRequest: Schema.Schema<GooglePlayDeveloperReportingV1beta1QueryExcessiveWakeupRateMetricSetRequest> = Schema.suspend(() => Schema.Struct({
  timelineSpec: Schema.optional(GooglePlayDeveloperReportingV1beta1TimelineSpec),
  dimensions: Schema.optional(Schema.Array(Schema.String)),
  metrics: Schema.optional(Schema.Array(Schema.String)),
  filter: Schema.optional(Schema.String),
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
  userCohort: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1QueryExcessiveWakeupRateMetricSetRequest" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1QueryExcessiveWakeupRateMetricSetRequest>;

export interface GooglePlayDeveloperReportingV1beta1QueryExcessiveWakeupRateMetricSetResponse {
  /** Returned rows of data. */
  rows?: Array<GooglePlayDeveloperReportingV1beta1MetricsRow>;
  /** Continuation token to fetch the next page of data. */
  nextPageToken?: string;
}

export const GooglePlayDeveloperReportingV1beta1QueryExcessiveWakeupRateMetricSetResponse: Schema.Schema<GooglePlayDeveloperReportingV1beta1QueryExcessiveWakeupRateMetricSetResponse> = Schema.suspend(() => Schema.Struct({
  rows: Schema.optional(Schema.Array(GooglePlayDeveloperReportingV1beta1MetricsRow)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1QueryExcessiveWakeupRateMetricSetResponse" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1QueryExcessiveWakeupRateMetricSetResponse>;

export interface GooglePlayDeveloperReportingV1beta1StuckBackgroundWakelockRateMetricSet {
  /** Identifier. The resource name. Format: apps/{app}/stuckBackgroundWakelockRateMetricSet */
  name?: string;
  /** Summary about data freshness in this resource. */
  freshnessInfo?: GooglePlayDeveloperReportingV1beta1FreshnessInfo;
}

export const GooglePlayDeveloperReportingV1beta1StuckBackgroundWakelockRateMetricSet: Schema.Schema<GooglePlayDeveloperReportingV1beta1StuckBackgroundWakelockRateMetricSet> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  freshnessInfo: Schema.optional(GooglePlayDeveloperReportingV1beta1FreshnessInfo),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1StuckBackgroundWakelockRateMetricSet" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1StuckBackgroundWakelockRateMetricSet>;

export interface GooglePlayDeveloperReportingV1beta1QueryStuckBackgroundWakelockRateMetricSetRequest {
  /** Optional. Specification of the timeline aggregation parameters. **Supported aggregation periods:** * DAILY: metrics are aggregated in calendar date intervals. Due to historical constraints, the only supported timezone is `America/Los_Angeles`. */
  timelineSpec?: GooglePlayDeveloperReportingV1beta1TimelineSpec;
  /** Optional. Dimensions to slice the data by. **Supported dimensions:** * `apiLevel` (string): the API level of Android that was running on the user's device, e.g., 26. * `versionCode` (int64): version of the app that was running on the user's device. * `deviceModel` (string): unique identifier of the user's device model. The form of the identifier is 'deviceBrand/device', where deviceBrand corresponds to Build.BRAND and device corresponds to Build.DEVICE, e.g., google/coral. * `deviceBrand` (string): unique identifier of the user's device brand, e.g., google. * `deviceType` (string): the type (also known as form factor) of the user's device, e.g., PHONE. * `countryCode` (string): the country or region of the user's device based on their IP address, represented as a 2-letter ISO-3166 code (e.g. US for the United States). * `deviceRamBucket` (int64): RAM of the device, in MB, in buckets (3GB, 4GB, etc.). * `deviceSocMake` (string): Make of the device's primary system-on-chip, e.g., Samsung. [Reference](https://developer.android.com/reference/android/os/Build#SOC_MANUFACTURER) * `deviceSocModel` (string): Model of the device's primary system-on-chip, e.g., "Exynos 2100". [Reference](https://developer.android.com/reference/android/os/Build#SOC_MODEL) * `deviceCpuMake` (string): Make of the device's CPU, e.g., Qualcomm. * `deviceCpuModel` (string): Model of the device's CPU, e.g., "Kryo 240". * `deviceGpuMake` (string): Make of the device's GPU, e.g., ARM. * `deviceGpuModel` (string): Model of the device's GPU, e.g., Mali. * `deviceGpuVersion` (string): Version of the device's GPU, e.g., T750. * `deviceVulkanVersion` (string): Vulkan version of the device, e.g., "4198400". * `deviceGlEsVersion` (string): OpenGL ES version of the device, e.g., "196610". * `deviceScreenSize` (string): Screen size of the device, e.g., NORMAL, LARGE. * `deviceScreenDpi` (string): Screen density of the device, e.g., mdpi, hdpi. */
  dimensions?: Array<string>;
  /** Optional. Metrics to aggregate. **Supported metrics:** * `stuckBgWakelockRate` (`google.type.Decimal`): Percentage of distinct users in the aggregation period that had a wakelock held in the background for longer than 1 hour. * `stuckBgWakelockRate7dUserWeighted` (`google.type.Decimal`): Rolling average value of `stuckBgWakelockRate` in the last 7 days. The daily values are weighted by the count of distinct users for the day. * `stuckBgWakelockRate28dUserWeighted` (`google.type.Decimal`): Rolling average value of `stuckBgWakelockRate` in the last 28 days. The daily values are weighted by the count of distinct users for the day. * `distinctUsers` (`google.type.Decimal`): Count of distinct users in the aggregation period that were used as normalization value for the `stuckBgWakelockRate` metric. A user is counted in this metric if they app was doing any work on the device, i.e., not just active foreground usage but also background work. Care must be taken not to aggregate this count further, as it may result in users being counted multiple times. The value is rounded to the nearest multiple of 10, 100, 1,000 or 1,000,000, depending on the magnitude of the value. */
  metrics?: Array<string>;
  /** Optional. Filters to apply to data. The filtering expression follows [AIP-160](https://google.aip.dev/160) standard and supports filtering by equality of all breakdown dimensions. */
  filter?: string;
  /** Optional. Maximum size of the returned data. If unspecified, at most 1000 rows will be returned. The maximum value is 100000; values above 100000 will be coerced to 100000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to the request must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. User view to select. The output data will correspond to the selected view. The only supported value is `OS_PUBLIC`. */
  userCohort?: "USER_COHORT_UNSPECIFIED" | "OS_PUBLIC" | "OS_BETA" | "APP_TESTERS" | (string & {});
}

export const GooglePlayDeveloperReportingV1beta1QueryStuckBackgroundWakelockRateMetricSetRequest: Schema.Schema<GooglePlayDeveloperReportingV1beta1QueryStuckBackgroundWakelockRateMetricSetRequest> = Schema.suspend(() => Schema.Struct({
  timelineSpec: Schema.optional(GooglePlayDeveloperReportingV1beta1TimelineSpec),
  dimensions: Schema.optional(Schema.Array(Schema.String)),
  metrics: Schema.optional(Schema.Array(Schema.String)),
  filter: Schema.optional(Schema.String),
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
  userCohort: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1QueryStuckBackgroundWakelockRateMetricSetRequest" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1QueryStuckBackgroundWakelockRateMetricSetRequest>;

export interface GooglePlayDeveloperReportingV1beta1QueryStuckBackgroundWakelockRateMetricSetResponse {
  /** Returned rows of data. */
  rows?: Array<GooglePlayDeveloperReportingV1beta1MetricsRow>;
  /** Continuation token to fetch the next page of data. */
  nextPageToken?: string;
}

export const GooglePlayDeveloperReportingV1beta1QueryStuckBackgroundWakelockRateMetricSetResponse: Schema.Schema<GooglePlayDeveloperReportingV1beta1QueryStuckBackgroundWakelockRateMetricSetResponse> = Schema.suspend(() => Schema.Struct({
  rows: Schema.optional(Schema.Array(GooglePlayDeveloperReportingV1beta1MetricsRow)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1QueryStuckBackgroundWakelockRateMetricSetResponse" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1QueryStuckBackgroundWakelockRateMetricSetResponse>;

export interface GooglePlayDeveloperReportingV1beta1SlowStartRateMetricSet {
  /** Identifier. The resource name. Format: apps/{app}/slowStartRateMetricSet */
  name?: string;
  /** Summary about data freshness in this resource. */
  freshnessInfo?: GooglePlayDeveloperReportingV1beta1FreshnessInfo;
}

export const GooglePlayDeveloperReportingV1beta1SlowStartRateMetricSet: Schema.Schema<GooglePlayDeveloperReportingV1beta1SlowStartRateMetricSet> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  freshnessInfo: Schema.optional(GooglePlayDeveloperReportingV1beta1FreshnessInfo),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1SlowStartRateMetricSet" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1SlowStartRateMetricSet>;

export interface GooglePlayDeveloperReportingV1beta1QuerySlowStartRateMetricSetRequest {
  /** Optional. Specification of the timeline aggregation parameters. **Supported aggregation periods:** * DAILY: metrics are aggregated in calendar date intervals. Due to historical constraints, the only supported timezone is `America/Los_Angeles`. */
  timelineSpec?: GooglePlayDeveloperReportingV1beta1TimelineSpec;
  /** Optional. Dimensions to slice the data by. **Supported dimensions:** * `apiLevel` (string): the API level of Android that was running on the user's device, e.g., 26. * `versionCode` (int64): version of the app that was running on the user's device. * `deviceModel` (string): unique identifier of the user's device model. The form of the identifier is 'deviceBrand/device', where deviceBrand corresponds to Build.BRAND and device corresponds to Build.DEVICE, e.g., google/coral. * `deviceBrand` (string): unique identifier of the user's device brand, e.g., google. * `deviceType` (string): the type (also known as form factor) of the user's device, e.g., PHONE. * `countryCode` (string): the country or region of the user's device based on their IP address, represented as a 2-letter ISO-3166 code (e.g. US for the United States). * `deviceRamBucket` (int64): RAM of the device, in MB, in buckets (3GB, 4GB, etc.). * `deviceSocMake` (string): Make of the device's primary system-on-chip, e.g., Samsung. [Reference](https://developer.android.com/reference/android/os/Build#SOC_MANUFACTURER) * `deviceSocModel` (string): Model of the device's primary system-on-chip, e.g., "Exynos 2100". [Reference](https://developer.android.com/reference/android/os/Build#SOC_MODEL) * `deviceCpuMake` (string): Make of the device's CPU, e.g., Qualcomm. * `deviceCpuModel` (string): Model of the device's CPU, e.g., "Kryo 240". * `deviceGpuMake` (string): Make of the device's GPU, e.g., ARM. * `deviceGpuModel` (string): Model of the device's GPU, e.g., Mali. * `deviceGpuVersion` (string): Version of the device's GPU, e.g., T750. * `deviceVulkanVersion` (string): Vulkan version of the device, e.g., "4198400". * `deviceGlEsVersion` (string): OpenGL ES version of the device, e.g., "196610". * `deviceScreenSize` (string): Screen size of the device, e.g., NORMAL, LARGE. * `deviceScreenDpi` (string): Screen density of the device, e.g., mdpi, hdpi. */
  dimensions?: Array<string>;
  /** Optional. Metrics to aggregate. **Supported metrics:** * `slowStartRate` (`google.type.Decimal`): Percentage of distinct users in the aggregation period that had a slow start. * `slowStartRate7dUserWeighted` (`google.type.Decimal`): Rolling average value of `slowStartRate` in the last 7 days. The daily values are weighted by the count of distinct users for the day. * `slowStartRate28dUserWeighted` (`google.type.Decimal`): Rolling average value of `slowStartRate` in the last 28 days. The daily values are weighted by the count of distinct users for the day. * `distinctUsers` (`google.type.Decimal`): Count of distinct users in the aggregation period that were used as normalization value for the `slowStartRate` metric. A user is counted in this metric if their app was launched in the device. Care must be taken not to aggregate this count further, as it may result in users being counted multiple times. The value is rounded to the nearest multiple of 10, 100, 1,000 or 1,000,000, depending on the magnitude of the value. */
  metrics?: Array<string>;
  /** Optional. Filters to apply to data. The filtering expression follows [AIP-160](https://google.aip.dev/160) standard and supports filtering by equality of all breakdown dimensions. */
  filter?: string;
  /** Optional. Maximum size of the returned data. If unspecified, at most 1000 rows will be returned. The maximum value is 100000; values above 100000 will be coerced to 100000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to the request must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. User view to select. The output data will correspond to the selected view. The only supported value is `OS_PUBLIC`. */
  userCohort?: "USER_COHORT_UNSPECIFIED" | "OS_PUBLIC" | "OS_BETA" | "APP_TESTERS" | (string & {});
}

export const GooglePlayDeveloperReportingV1beta1QuerySlowStartRateMetricSetRequest: Schema.Schema<GooglePlayDeveloperReportingV1beta1QuerySlowStartRateMetricSetRequest> = Schema.suspend(() => Schema.Struct({
  timelineSpec: Schema.optional(GooglePlayDeveloperReportingV1beta1TimelineSpec),
  dimensions: Schema.optional(Schema.Array(Schema.String)),
  metrics: Schema.optional(Schema.Array(Schema.String)),
  filter: Schema.optional(Schema.String),
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
  userCohort: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1QuerySlowStartRateMetricSetRequest" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1QuerySlowStartRateMetricSetRequest>;

export interface GooglePlayDeveloperReportingV1beta1QuerySlowStartRateMetricSetResponse {
  /** Returned rows of data. */
  rows?: Array<GooglePlayDeveloperReportingV1beta1MetricsRow>;
  /** Continuation token to fetch the next page of data. */
  nextPageToken?: string;
}

export const GooglePlayDeveloperReportingV1beta1QuerySlowStartRateMetricSetResponse: Schema.Schema<GooglePlayDeveloperReportingV1beta1QuerySlowStartRateMetricSetResponse> = Schema.suspend(() => Schema.Struct({
  rows: Schema.optional(Schema.Array(GooglePlayDeveloperReportingV1beta1MetricsRow)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1QuerySlowStartRateMetricSetResponse" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1QuerySlowStartRateMetricSetResponse>;

export interface GooglePlayDeveloperReportingV1beta1SlowRenderingRateMetricSet {
  /** Identifier. The resource name. Format: apps/{app}/slowRenderingRateMetricSet */
  name?: string;
  /** Summary about data freshness in this resource. */
  freshnessInfo?: GooglePlayDeveloperReportingV1beta1FreshnessInfo;
}

export const GooglePlayDeveloperReportingV1beta1SlowRenderingRateMetricSet: Schema.Schema<GooglePlayDeveloperReportingV1beta1SlowRenderingRateMetricSet> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  freshnessInfo: Schema.optional(GooglePlayDeveloperReportingV1beta1FreshnessInfo),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1SlowRenderingRateMetricSet" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1SlowRenderingRateMetricSet>;

export interface GooglePlayDeveloperReportingV1beta1QuerySlowRenderingRateMetricSetRequest {
  /** Optional. Specification of the timeline aggregation parameters. **Supported aggregation periods:** * DAILY: metrics are aggregated in calendar date intervals. Due to historical constraints, the only supported timezone is `America/Los_Angeles`. */
  timelineSpec?: GooglePlayDeveloperReportingV1beta1TimelineSpec;
  /** Optional. Dimensions to slice the data by. **Supported dimensions:** * `apiLevel` (string): the API level of Android that was running on the user's device, e.g., 26. * `versionCode` (int64): version of the app that was running on the user's device. * `deviceModel` (string): unique identifier of the user's device model. The form of the identifier is 'deviceBrand/device', where deviceBrand corresponds to Build.BRAND and device corresponds to Build.DEVICE, e.g., google/coral. * `deviceBrand` (string): unique identifier of the user's device brand, e.g., google. * `deviceType` (string): the type (also known as form factor) of the user's device, e.g., PHONE. * `countryCode` (string): the country or region of the user's device based on their IP address, represented as a 2-letter ISO-3166 code (e.g. US for the United States). * `deviceRamBucket` (int64): RAM of the device, in MB, in buckets (3GB, 4GB, etc.). * `deviceSocMake` (string): Make of the device's primary system-on-chip, e.g., Samsung. [Reference](https://developer.android.com/reference/android/os/Build#SOC_MANUFACTURER) * `deviceSocModel` (string): Model of the device's primary system-on-chip, e.g., "Exynos 2100". [Reference](https://developer.android.com/reference/android/os/Build#SOC_MODEL) * `deviceCpuMake` (string): Make of the device's CPU, e.g., Qualcomm. * `deviceCpuModel` (string): Model of the device's CPU, e.g., "Kryo 240". * `deviceGpuMake` (string): Make of the device's GPU, e.g., ARM. * `deviceGpuModel` (string): Model of the device's GPU, e.g., Mali. * `deviceGpuVersion` (string): Version of the device's GPU, e.g., T750. * `deviceVulkanVersion` (string): Vulkan version of the device, e.g., "4198400". * `deviceGlEsVersion` (string): OpenGL ES version of the device, e.g., "196610". * `deviceScreenSize` (string): Screen size of the device, e.g., NORMAL, LARGE. * `deviceScreenDpi` (string): Screen density of the device, e.g., mdpi, hdpi. */
  dimensions?: Array<string>;
  /** Optional. Metrics to aggregate. **Supported metrics:** * `slowRenderingRate20Fps` (`google.type.Decimal`): Percentage of distinct users in the aggregation period that had a slow rendering. * `slowRenderingRate20Fps7dUserWeighted` (`google.type.Decimal`): Rolling average value of `slowRenderingRate20Fps` in the last 7 days. The daily values are weighted by the count of distinct users for the day. * `slowRenderingRate20Fps28dUserWeighted` (`google.type.Decimal`): Rolling average value of `slowRenderingRate20Fps` in the last 28 days. The daily values are weighted by the count of distinct users for the day. * `slowRenderingRate30Fps` (`google.type.Decimal`): Percentage of distinct users in the aggregation period that had a slow rendering. * `slowRenderingRate30Fps7dUserWeighted` (`google.type.Decimal`): Rolling average value of `slowRenderingRate30Fps` in the last 7 days. The daily values are weighted by the count of distinct users for the day. * `slowRenderingRate30Fps28dUserWeighted` (`google.type.Decimal`): Rolling average value of `slowRenderingRate30Fps` in the last 28 days. The daily values are weighted by the count of distinct users for the day. * `distinctUsers` (`google.type.Decimal`): Count of distinct users in the aggregation period that were used as normalization value for the `slowRenderingRate20Fps`/`slowRenderingRate30Fps` metric. A user is counted in this metric if their app was launched in the device. Care must be taken not to aggregate this count further, as it may result in users being counted multiple times. The value is rounded to the nearest multiple of 10, 100, 1,000 or 1,000,000, depending on the magnitude of the value. */
  metrics?: Array<string>;
  /** Optional. Filters to apply to data. The filtering expression follows [AIP-160](https://google.aip.dev/160) standard and supports filtering by equality of all breakdown dimensions. */
  filter?: string;
  /** Optional. Maximum size of the returned data. If unspecified, at most 1000 rows will be returned. The maximum value is 100000; values above 100000 will be coerced to 100000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to the request must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. User view to select. The output data will correspond to the selected view. The only supported value is `OS_PUBLIC`. */
  userCohort?: "USER_COHORT_UNSPECIFIED" | "OS_PUBLIC" | "OS_BETA" | "APP_TESTERS" | (string & {});
}

export const GooglePlayDeveloperReportingV1beta1QuerySlowRenderingRateMetricSetRequest: Schema.Schema<GooglePlayDeveloperReportingV1beta1QuerySlowRenderingRateMetricSetRequest> = Schema.suspend(() => Schema.Struct({
  timelineSpec: Schema.optional(GooglePlayDeveloperReportingV1beta1TimelineSpec),
  dimensions: Schema.optional(Schema.Array(Schema.String)),
  metrics: Schema.optional(Schema.Array(Schema.String)),
  filter: Schema.optional(Schema.String),
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
  userCohort: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1QuerySlowRenderingRateMetricSetRequest" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1QuerySlowRenderingRateMetricSetRequest>;

export interface GooglePlayDeveloperReportingV1beta1QuerySlowRenderingRateMetricSetResponse {
  /** Returned rows of data. */
  rows?: Array<GooglePlayDeveloperReportingV1beta1MetricsRow>;
  /** Continuation token to fetch the next page of data. */
  nextPageToken?: string;
}

export const GooglePlayDeveloperReportingV1beta1QuerySlowRenderingRateMetricSetResponse: Schema.Schema<GooglePlayDeveloperReportingV1beta1QuerySlowRenderingRateMetricSetResponse> = Schema.suspend(() => Schema.Struct({
  rows: Schema.optional(Schema.Array(GooglePlayDeveloperReportingV1beta1MetricsRow)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1QuerySlowRenderingRateMetricSetResponse" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1QuerySlowRenderingRateMetricSetResponse>;

export interface GooglePlayDeveloperReportingV1beta1DeviceId {
  /** Value of Build.BRAND. */
  buildBrand?: string;
  /** Value of Build.DEVICE. */
  buildDevice?: string;
}

export const GooglePlayDeveloperReportingV1beta1DeviceId: Schema.Schema<GooglePlayDeveloperReportingV1beta1DeviceId> = Schema.suspend(() => Schema.Struct({
  buildBrand: Schema.optional(Schema.String),
  buildDevice: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1DeviceId" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1DeviceId>;

export interface GooglePlayDeveloperReportingV1beta1DeviceModelSummary {
  /** Identifier of the device. */
  deviceId?: GooglePlayDeveloperReportingV1beta1DeviceId;
  /** Display name of the device. */
  marketingName?: string;
  /** Link to the device in Play Device Catalog. */
  deviceUri?: string;
}

export const GooglePlayDeveloperReportingV1beta1DeviceModelSummary: Schema.Schema<GooglePlayDeveloperReportingV1beta1DeviceModelSummary> = Schema.suspend(() => Schema.Struct({
  deviceId: Schema.optional(GooglePlayDeveloperReportingV1beta1DeviceId),
  marketingName: Schema.optional(Schema.String),
  deviceUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1DeviceModelSummary" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1DeviceModelSummary>;

export interface GooglePlayDeveloperReportingV1beta1OsVersion {
  /** Optional. Numeric version code of the OS - API level */
  apiLevel?: string;
}

export const GooglePlayDeveloperReportingV1beta1OsVersion: Schema.Schema<GooglePlayDeveloperReportingV1beta1OsVersion> = Schema.suspend(() => Schema.Struct({
  apiLevel: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1OsVersion" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1OsVersion>;

export interface GooglePlayDeveloperReportingV1beta1AppVersion {
  /** Optional. Numeric version code of the app version (set by the app's developer). */
  versionCode?: string;
}

export const GooglePlayDeveloperReportingV1beta1AppVersion: Schema.Schema<GooglePlayDeveloperReportingV1beta1AppVersion> = Schema.suspend(() => Schema.Struct({
  versionCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1AppVersion" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1AppVersion>;

export interface GooglePlayDeveloperReportingV1beta1ErrorReport {
  /** Identifier. The resource name of the report. Format: apps/{app}/{report} */
  name?: string;
  /** Type of the error for which this report was generated. */
  type?: "ERROR_TYPE_UNSPECIFIED" | "APPLICATION_NOT_RESPONDING" | "CRASH" | "NON_FATAL" | (string & {});
  /** Textual representation of the error report. These textual reports are produced by the platform. The reports are then sanitized and filtered to remove any potentially sensitive information. Although their format is fairly stable, they are not entirely meant for machine consumption and we cannot guarantee that there won't be subtle changes to the formatting that may break systems trying to parse information out of the reports. */
  reportText?: string;
  /** The issue this report was associated with. **Please note:** this resource is currently in Alpha. There could be changes to the issue grouping that would result in similar but more recent error reports being assigned to a different issue. */
  issue?: string;
  /** Start of the hour during which the latest event in this error report occurred. */
  eventTime?: string;
  /** A device model on which an event in this error report occurred on. */
  deviceModel?: GooglePlayDeveloperReportingV1beta1DeviceModelSummary;
  /** The OS version on which an event in this error report occurred on. */
  osVersion?: GooglePlayDeveloperReportingV1beta1OsVersion;
  /** The app version on which an event in this error report occurred on. */
  appVersion?: GooglePlayDeveloperReportingV1beta1AppVersion;
  /** Version control system information from BUNDLE-METADATA/version-control-info.textproto or META-INF/version-control-info.textproto of the app bundle or APK, respectively. */
  vcsInformation?: string;
}

export const GooglePlayDeveloperReportingV1beta1ErrorReport: Schema.Schema<GooglePlayDeveloperReportingV1beta1ErrorReport> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  reportText: Schema.optional(Schema.String),
  issue: Schema.optional(Schema.String),
  eventTime: Schema.optional(Schema.String),
  deviceModel: Schema.optional(GooglePlayDeveloperReportingV1beta1DeviceModelSummary),
  osVersion: Schema.optional(GooglePlayDeveloperReportingV1beta1OsVersion),
  appVersion: Schema.optional(GooglePlayDeveloperReportingV1beta1AppVersion),
  vcsInformation: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1ErrorReport" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1ErrorReport>;

export interface GooglePlayDeveloperReportingV1beta1SearchErrorReportsResponse {
  /** Error reports that were found. */
  errorReports?: Array<GooglePlayDeveloperReportingV1beta1ErrorReport>;
  /** Page token to fetch the next page of reports. */
  nextPageToken?: string;
}

export const GooglePlayDeveloperReportingV1beta1SearchErrorReportsResponse: Schema.Schema<GooglePlayDeveloperReportingV1beta1SearchErrorReportsResponse> = Schema.suspend(() => Schema.Struct({
  errorReports: Schema.optional(Schema.Array(GooglePlayDeveloperReportingV1beta1ErrorReport)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1SearchErrorReportsResponse" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1SearchErrorReportsResponse>;

export interface GooglePlayDeveloperReportingV1beta1IssueAnnotation {
  /** Category that the annotation belongs to. An annotation will belong to a single category. Example categories: "Potential fix", "Insight". */
  category?: string;
  /** Title for the annotation. */
  title?: string;
  /** Contains the contents of the annotation message. */
  body?: string;
}

export const GooglePlayDeveloperReportingV1beta1IssueAnnotation: Schema.Schema<GooglePlayDeveloperReportingV1beta1IssueAnnotation> = Schema.suspend(() => Schema.Struct({
  category: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  body: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1IssueAnnotation" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1IssueAnnotation>;

export interface GooglePlayDeveloperReportingV1beta1ErrorIssue {
  /** Identifier. The resource name of the issue. Format: apps/{app}/{issue} */
  name?: string;
  /** Type of the errors grouped in this issue. */
  type?: "ERROR_TYPE_UNSPECIFIED" | "APPLICATION_NOT_RESPONDING" | "CRASH" | "NON_FATAL" | (string & {});
  /** Cause of the issue. Depending on the type this can be either: * APPLICATION_NOT_RESPONDING: the type of ANR that occurred, e.g., 'Input dispatching timed out'. * CRASH: for Java unhandled exception errors, the type of the innermost exception that was thrown, e.g., IllegalArgumentException. For signals in native code, the signal that was raised, e.g. SIGSEGV. */
  cause?: string;
  /** Location where the issue happened. Depending on the type this can be either: * APPLICATION_NOT_RESPONDING: the name of the activity or service that stopped responding. * CRASH: the likely method name that caused the error. */
  location?: string;
  /** The total number of error reports in this issue (only considering occurrences matching the filters and within the requested time period). */
  errorReportCount?: string;
  /** An estimate of the number of unique users who have experienced this issue (only considering occurrences matching the filters and within the requested time period). */
  distinctUsers?: string;
  /** An estimated percentage of users affected by any issue that are affected by this issue (only considering occurrences matching the filters and within the requested time period). */
  distinctUsersPercent?: GoogleTypeDecimal;
  /** Start of the hour during which the last error report in this issue occurred. */
  lastErrorReportTime?: string;
  /** Link to the issue in Android vitals in the Play Console. */
  issueUri?: string;
  /** The smallest OS version in which this error cluster has occurred in the requested time period (only considering occurrences matching the filters and within the requested time period). */
  firstOsVersion?: GooglePlayDeveloperReportingV1beta1OsVersion;
  /** The latest OS version in which this error cluster has occurred in the requested time period (only considering occurrences matching the filters and within the requested time period). */
  lastOsVersion?: GooglePlayDeveloperReportingV1beta1OsVersion;
  /** The earliest (inclusive) app version appearing in this ErrorIssue in the requested time period (only considering occurrences matching the filters). */
  firstAppVersion?: GooglePlayDeveloperReportingV1beta1AppVersion;
  /** The latest (inclusive) app version appearing in this ErrorIssue in the requested time period (only considering occurrences matching the filters). */
  lastAppVersion?: GooglePlayDeveloperReportingV1beta1AppVersion;
  /** List of annotations for an issue. Annotations provide additional information that may help in diagnosing and fixing the issue. */
  annotations?: Array<GooglePlayDeveloperReportingV1beta1IssueAnnotation>;
  /** Output only. Sample error reports which belong to this ErrorIssue. *Note:* currently a maximum of 1 per ErrorIssue is supported. Format: "apps/{app}/{report}" */
  sampleErrorReports?: Array<string>;
}

export const GooglePlayDeveloperReportingV1beta1ErrorIssue: Schema.Schema<GooglePlayDeveloperReportingV1beta1ErrorIssue> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  cause: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  errorReportCount: Schema.optional(Schema.String),
  distinctUsers: Schema.optional(Schema.String),
  distinctUsersPercent: Schema.optional(GoogleTypeDecimal),
  lastErrorReportTime: Schema.optional(Schema.String),
  issueUri: Schema.optional(Schema.String),
  firstOsVersion: Schema.optional(GooglePlayDeveloperReportingV1beta1OsVersion),
  lastOsVersion: Schema.optional(GooglePlayDeveloperReportingV1beta1OsVersion),
  firstAppVersion: Schema.optional(GooglePlayDeveloperReportingV1beta1AppVersion),
  lastAppVersion: Schema.optional(GooglePlayDeveloperReportingV1beta1AppVersion),
  annotations: Schema.optional(Schema.Array(GooglePlayDeveloperReportingV1beta1IssueAnnotation)),
  sampleErrorReports: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1ErrorIssue" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1ErrorIssue>;

export interface GooglePlayDeveloperReportingV1beta1SearchErrorIssuesResponse {
  /** ErrorIssues that were found. */
  errorIssues?: Array<GooglePlayDeveloperReportingV1beta1ErrorIssue>;
  /** Continuation token to fetch the next page of data. */
  nextPageToken?: string;
}

export const GooglePlayDeveloperReportingV1beta1SearchErrorIssuesResponse: Schema.Schema<GooglePlayDeveloperReportingV1beta1SearchErrorIssuesResponse> = Schema.suspend(() => Schema.Struct({
  errorIssues: Schema.optional(Schema.Array(GooglePlayDeveloperReportingV1beta1ErrorIssue)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1SearchErrorIssuesResponse" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1SearchErrorIssuesResponse>;

export interface GooglePlayDeveloperReportingV1beta1ErrorCountMetricSet {
  /** Identifier. The resource name. Format: apps/{app}/errorCountMetricSet */
  name?: string;
  /** Summary about data freshness in this resource. */
  freshnessInfo?: GooglePlayDeveloperReportingV1beta1FreshnessInfo;
}

export const GooglePlayDeveloperReportingV1beta1ErrorCountMetricSet: Schema.Schema<GooglePlayDeveloperReportingV1beta1ErrorCountMetricSet> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  freshnessInfo: Schema.optional(GooglePlayDeveloperReportingV1beta1FreshnessInfo),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1ErrorCountMetricSet" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1ErrorCountMetricSet>;

export interface GooglePlayDeveloperReportingV1beta1QueryErrorCountMetricSetRequest {
  /** Optional. Specification of the timeline aggregation parameters. **Supported aggregation periods:** * DAILY: metrics are aggregated in calendar date intervals. The default and only supported timezone is `America/Los_Angeles`. */
  timelineSpec?: GooglePlayDeveloperReportingV1beta1TimelineSpec;
  /** Optional. Dimensions to slice the data by. **Supported dimensions:** * `apiLevel` (string): the API level of Android that was running on the user's device, e.g., 26. * `versionCode` (int64): unique identifier of the user's device model. The form of the identifier is 'deviceBrand/device', where deviceBrand corresponds to Build.BRAND and device corresponds to Build.DEVICE, e.g., google/coral. * `deviceModel` (string): unique identifier of the user's device model. * `deviceType` (string): identifier of the device's form factor, e.g., PHONE. * `reportType` (string): the type of error. The value should correspond to one of the possible values in ErrorType. * `issueId` (string): the id an error was assigned to. The value should correspond to the `{issue}` component of the issue name. * `deviceRamBucket` (int64): RAM of the device, in MB, in buckets (3GB, 4GB, etc.). * `deviceSocMake` (string): Make of the device's primary system-on-chip, e.g., Samsung. [Reference](https://developer.android.com/reference/android/os/Build#SOC_MANUFACTURER) * `deviceSocModel` (string): Model of the device's primary system-on-chip, e.g., "Exynos 2100". [Reference](https://developer.android.com/reference/android/os/Build#SOC_MODEL) * `deviceCpuMake` (string): Make of the device's CPU, e.g., Qualcomm. * `deviceCpuModel` (string): Model of the device's CPU, e.g., "Kryo 240". * `deviceGpuMake` (string): Make of the device's GPU, e.g., ARM. * `deviceGpuModel` (string): Model of the device's GPU, e.g., Mali. * `deviceGpuVersion` (string): Version of the device's GPU, e.g., T750. * `deviceVulkanVersion` (string): Vulkan version of the device, e.g., "4198400". * `deviceGlEsVersion` (string): OpenGL ES version of the device, e.g., "196610". * `deviceScreenSize` (string): Screen size of the device, e.g., NORMAL, LARGE. * `deviceScreenDpi` (string): Screen density of the device, e.g., mdpi, hdpi. */
  dimensions?: Array<string>;
  /** Optional. Metrics to aggregate. **Supported metrics:** * `errorReportCount` (`google.type.Decimal`): Absolute count of individual error reports that have been received for an app. * `distinctUsers` (`google.type.Decimal`): Count of distinct users for which reports have been received. Care must be taken not to aggregate this count further, as it may result in users being counted multiple times. This value is not rounded, however it may be an approximation. */
  metrics?: Array<string>;
  /** Optional. Maximum size of the returned data. If unspecified, at most 1000 rows will be returned. The maximum value is 100000; values above 100000 will be coerced to 100000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to the request must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Filters to apply to data. The filtering expression follows [AIP-160](https://google.aip.dev/160) standard and supports filtering by equality of all breakdown dimensions and: * `isUserPerceived` (string): denotes whether error is user perceived or not, USER_PERCEIVED or NOT_USER_PERCEIVED. */
  filter?: string;
}

export const GooglePlayDeveloperReportingV1beta1QueryErrorCountMetricSetRequest: Schema.Schema<GooglePlayDeveloperReportingV1beta1QueryErrorCountMetricSetRequest> = Schema.suspend(() => Schema.Struct({
  timelineSpec: Schema.optional(GooglePlayDeveloperReportingV1beta1TimelineSpec),
  dimensions: Schema.optional(Schema.Array(Schema.String)),
  metrics: Schema.optional(Schema.Array(Schema.String)),
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
  filter: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1QueryErrorCountMetricSetRequest" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1QueryErrorCountMetricSetRequest>;

export interface GooglePlayDeveloperReportingV1beta1QueryErrorCountMetricSetResponse {
  /** Returned rows. */
  rows?: Array<GooglePlayDeveloperReportingV1beta1MetricsRow>;
  /** Continuation token to fetch the next page of data. */
  nextPageToken?: string;
}

export const GooglePlayDeveloperReportingV1beta1QueryErrorCountMetricSetResponse: Schema.Schema<GooglePlayDeveloperReportingV1beta1QueryErrorCountMetricSetResponse> = Schema.suspend(() => Schema.Struct({
  rows: Schema.optional(Schema.Array(GooglePlayDeveloperReportingV1beta1MetricsRow)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1QueryErrorCountMetricSetResponse" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1QueryErrorCountMetricSetResponse>;

export interface GooglePlayDeveloperReportingV1beta1Release {
  /** Readable identifier of the release. */
  displayName?: string;
  /** The version codes contained in this release. */
  versionCodes?: Array<string>;
}

export const GooglePlayDeveloperReportingV1beta1Release: Schema.Schema<GooglePlayDeveloperReportingV1beta1Release> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  versionCodes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1Release" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1Release>;

export interface GooglePlayDeveloperReportingV1beta1Track {
  /** Readable identifier of the track. */
  displayName?: string;
  /** The type of the track. */
  type?: string;
  /** Represents all active releases in the track. */
  servingReleases?: Array<GooglePlayDeveloperReportingV1beta1Release>;
}

export const GooglePlayDeveloperReportingV1beta1Track: Schema.Schema<GooglePlayDeveloperReportingV1beta1Track> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  servingReleases: Schema.optional(Schema.Array(GooglePlayDeveloperReportingV1beta1Release)),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1Track" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1Track>;

export interface GooglePlayDeveloperReportingV1beta1ReleaseFilterOptions {
  /** List of tracks to filter releases over. Provides the grouping of version codes under releases and tracks. */
  tracks?: Array<GooglePlayDeveloperReportingV1beta1Track>;
}

export const GooglePlayDeveloperReportingV1beta1ReleaseFilterOptions: Schema.Schema<GooglePlayDeveloperReportingV1beta1ReleaseFilterOptions> = Schema.suspend(() => Schema.Struct({
  tracks: Schema.optional(Schema.Array(GooglePlayDeveloperReportingV1beta1Track)),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1ReleaseFilterOptions" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1ReleaseFilterOptions>;

export interface GooglePlayDeveloperReportingV1beta1App {
  /** Identifier. The resource name. Format: apps/{app} */
  name?: string;
  /** Package name of the app. Example: `com.example.app123`. */
  packageName?: string;
  /** Title of the app. This is the latest title as set in the Play Console and may not yet have been reviewed, so might not match the Play Store. Example: `Google Maps`. */
  displayName?: string;
}

export const GooglePlayDeveloperReportingV1beta1App: Schema.Schema<GooglePlayDeveloperReportingV1beta1App> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1App" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1App>;

export interface GooglePlayDeveloperReportingV1beta1SearchAccessibleAppsResponse {
  /** The apps accessible to the user calling the endpoint. */
  apps?: Array<GooglePlayDeveloperReportingV1beta1App>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GooglePlayDeveloperReportingV1beta1SearchAccessibleAppsResponse: Schema.Schema<GooglePlayDeveloperReportingV1beta1SearchAccessibleAppsResponse> = Schema.suspend(() => Schema.Struct({
  apps: Schema.optional(Schema.Array(GooglePlayDeveloperReportingV1beta1App)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GooglePlayDeveloperReportingV1beta1SearchAccessibleAppsResponse" }) as any as Schema.Schema<GooglePlayDeveloperReportingV1beta1SearchAccessibleAppsResponse>;

export interface ApiservingMcpMcpToolDataHandlingProfile {
  /** // The data access level of the tool's inputs. */
  inputDataAccessLevel?: "DATA_ACCESS_LEVEL_UNSPECIFIED" | "DATA_ACCESS_LEVEL_PUBLIC" | "DATA_ACCESS_LEVEL_CONFIDENTIAL" | "DATA_ACCESS_LEVEL_NEED_TO_KNOW" | "DATA_ACCESS_LEVEL_PII" | "DATA_ACCESS_LEVEL_USER" | "DATA_ACCESS_LEVEL_NO_DATA_ACCESS" | (string & {});
  /** The data access level of the tool's outputs. */
  outputDataAccessLevel?: "DATA_ACCESS_LEVEL_UNSPECIFIED" | "DATA_ACCESS_LEVEL_PUBLIC" | "DATA_ACCESS_LEVEL_CONFIDENTIAL" | "DATA_ACCESS_LEVEL_NEED_TO_KNOW" | "DATA_ACCESS_LEVEL_PII" | "DATA_ACCESS_LEVEL_USER" | "DATA_ACCESS_LEVEL_NO_DATA_ACCESS" | (string & {});
}

export const ApiservingMcpMcpToolDataHandlingProfile: Schema.Schema<ApiservingMcpMcpToolDataHandlingProfile> = Schema.suspend(() => Schema.Struct({
  inputDataAccessLevel: Schema.optional(Schema.String),
  outputDataAccessLevel: Schema.optional(Schema.String),
})).annotate({ identifier: "ApiservingMcpMcpToolDataHandlingProfile" }) as any as Schema.Schema<ApiservingMcpMcpToolDataHandlingProfile>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists anomalies in any of the datasets. */
export interface ListAnomaliesRequest {
  /** Required. Parent app for which anomalies were detected. Format: apps/{app} */
  parent: string;
  /** Optional. Filtering criteria for anomalies. For basic filter guidance, please check: https://google.aip.dev/160. **Supported functions:** * `activeBetween(startTime, endTime)`: If specified, only list anomalies that were active in between `startTime` (inclusive) and `endTime` (exclusive). Both parameters are expected to conform to an RFC-3339 formatted string (e.g. `2012-04-21T11:30:00-04:00`). UTC offsets are supported. Both `startTime` and `endTime` accept the special value `UNBOUNDED`, to signify intervals with no lower or upper bound, respectively. Examples: * `activeBetween("2021-04-21T11:30:00Z", "2021-07-21T00:00:00Z")` * `activeBetween(UNBOUNDED, "2021-11-21T00:00:00-04:00")` * `activeBetween("2021-07-21T00:00:00-04:00", UNBOUNDED)` */
  filter?: string;
  /** Optional. Maximum size of the returned data. If unspecified, at most 10 anomalies will be returned. The maximum value is 100; values above 100 will be coerced to 100. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListErrorReports` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListErrorReports` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListAnomaliesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/apps/{appsId}/anomalies" }),
  svc,
) as unknown as Schema.Schema<ListAnomaliesRequest>;

export type ListAnomaliesResponse = GooglePlayDeveloperReportingV1beta1ListAnomaliesResponse;
export const ListAnomaliesResponse = GooglePlayDeveloperReportingV1beta1ListAnomaliesResponse;

export type ListAnomaliesError = CommonErrors;

export const listAnomalies = API.makePaginated(() => ({
  input: ListAnomaliesRequest,
  output: ListAnomaliesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Describes the properties of the metric set. */
export interface GetVitalsCrashrateRequest {
  /** Required. The resource name. Format: apps/{app}/crashRateMetricSet */
  name: string;
}

export const GetVitalsCrashrateRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/apps/{appsId}/crashRateMetricSet" }),
  svc,
) as unknown as Schema.Schema<GetVitalsCrashrateRequest>;

export type GetVitalsCrashrateResponse = GooglePlayDeveloperReportingV1beta1CrashRateMetricSet;
export const GetVitalsCrashrateResponse = GooglePlayDeveloperReportingV1beta1CrashRateMetricSet;

export type GetVitalsCrashrateError = CommonErrors;

export const getVitalsCrashrate: API.OperationMethod<GetVitalsCrashrateRequest, GetVitalsCrashrateResponse, GetVitalsCrashrateError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetVitalsCrashrateRequest,
  output: GetVitalsCrashrateResponse,
  errors: [],
}));

/** Queries the metrics in the metric set. */
export interface QueryVitalsCrashrateRequest {
  /** Required. The resource name. Format: apps/{app}/crashRateMetricSet */
  name: string;
  /** Request body */
  body?: GooglePlayDeveloperReportingV1beta1QueryCrashRateMetricSetRequest;
}

export const QueryVitalsCrashrateRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GooglePlayDeveloperReportingV1beta1QueryCrashRateMetricSetRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/apps/{appsId}/crashRateMetricSet:query", hasBody: true }),
  svc,
) as unknown as Schema.Schema<QueryVitalsCrashrateRequest>;

export type QueryVitalsCrashrateResponse = GooglePlayDeveloperReportingV1beta1QueryCrashRateMetricSetResponse;
export const QueryVitalsCrashrateResponse = GooglePlayDeveloperReportingV1beta1QueryCrashRateMetricSetResponse;

export type QueryVitalsCrashrateError = CommonErrors;

export const queryVitalsCrashrate: API.OperationMethod<QueryVitalsCrashrateRequest, QueryVitalsCrashrateResponse, QueryVitalsCrashrateError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: QueryVitalsCrashrateRequest,
  output: QueryVitalsCrashrateResponse,
  errors: [],
}));

/** Describes the properties of the metric set. */
export interface GetVitalsAnrrateRequest {
  /** Required. The resource name. Format: apps/{app}/anrRateMetricSet */
  name: string;
}

export const GetVitalsAnrrateRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/apps/{appsId}/anrRateMetricSet" }),
  svc,
) as unknown as Schema.Schema<GetVitalsAnrrateRequest>;

export type GetVitalsAnrrateResponse = GooglePlayDeveloperReportingV1beta1AnrRateMetricSet;
export const GetVitalsAnrrateResponse = GooglePlayDeveloperReportingV1beta1AnrRateMetricSet;

export type GetVitalsAnrrateError = CommonErrors;

export const getVitalsAnrrate: API.OperationMethod<GetVitalsAnrrateRequest, GetVitalsAnrrateResponse, GetVitalsAnrrateError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetVitalsAnrrateRequest,
  output: GetVitalsAnrrateResponse,
  errors: [],
}));

/** Queries the metrics in the metric set. */
export interface QueryVitalsAnrrateRequest {
  /** Required. The resource name. Format: apps/{app}/anrRateMetricSet */
  name: string;
  /** Request body */
  body?: GooglePlayDeveloperReportingV1beta1QueryAnrRateMetricSetRequest;
}

export const QueryVitalsAnrrateRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GooglePlayDeveloperReportingV1beta1QueryAnrRateMetricSetRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/apps/{appsId}/anrRateMetricSet:query", hasBody: true }),
  svc,
) as unknown as Schema.Schema<QueryVitalsAnrrateRequest>;

export type QueryVitalsAnrrateResponse = GooglePlayDeveloperReportingV1beta1QueryAnrRateMetricSetResponse;
export const QueryVitalsAnrrateResponse = GooglePlayDeveloperReportingV1beta1QueryAnrRateMetricSetResponse;

export type QueryVitalsAnrrateError = CommonErrors;

export const queryVitalsAnrrate: API.OperationMethod<QueryVitalsAnrrateRequest, QueryVitalsAnrrateResponse, QueryVitalsAnrrateError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: QueryVitalsAnrrateRequest,
  output: QueryVitalsAnrrateResponse,
  errors: [],
}));

/** Describes the properties of the metric set. */
export interface GetVitalsLmkrateRequest {
  /** Required. The resource name. Format: apps/{app}/lmkRateMetricSet */
  name: string;
}

export const GetVitalsLmkrateRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/apps/{appsId}/lmkRateMetricSet" }),
  svc,
) as unknown as Schema.Schema<GetVitalsLmkrateRequest>;

export type GetVitalsLmkrateResponse = GooglePlayDeveloperReportingV1beta1LmkRateMetricSet;
export const GetVitalsLmkrateResponse = GooglePlayDeveloperReportingV1beta1LmkRateMetricSet;

export type GetVitalsLmkrateError = CommonErrors;

export const getVitalsLmkrate: API.OperationMethod<GetVitalsLmkrateRequest, GetVitalsLmkrateResponse, GetVitalsLmkrateError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetVitalsLmkrateRequest,
  output: GetVitalsLmkrateResponse,
  errors: [],
}));

/** Queries the metrics in the metric set. */
export interface QueryVitalsLmkrateRequest {
  /** Required. The resource name. Format: apps/{app}/lmkRateMetricSet */
  name: string;
  /** Request body */
  body?: GooglePlayDeveloperReportingV1beta1QueryLmkRateMetricSetRequest;
}

export const QueryVitalsLmkrateRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GooglePlayDeveloperReportingV1beta1QueryLmkRateMetricSetRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/apps/{appsId}/lmkRateMetricSet:query", hasBody: true }),
  svc,
) as unknown as Schema.Schema<QueryVitalsLmkrateRequest>;

export type QueryVitalsLmkrateResponse = GooglePlayDeveloperReportingV1beta1QueryLmkRateMetricSetResponse;
export const QueryVitalsLmkrateResponse = GooglePlayDeveloperReportingV1beta1QueryLmkRateMetricSetResponse;

export type QueryVitalsLmkrateError = CommonErrors;

export const queryVitalsLmkrate: API.OperationMethod<QueryVitalsLmkrateRequest, QueryVitalsLmkrateResponse, QueryVitalsLmkrateError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: QueryVitalsLmkrateRequest,
  output: QueryVitalsLmkrateResponse,
  errors: [],
}));

/** Describes the properties of the metric set. */
export interface GetVitalsExcessivewakeuprateRequest {
  /** Required. The resource name. Format: apps/{app}/excessiveWakeupRateMetricSet */
  name: string;
}

export const GetVitalsExcessivewakeuprateRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/apps/{appsId}/excessiveWakeupRateMetricSet" }),
  svc,
) as unknown as Schema.Schema<GetVitalsExcessivewakeuprateRequest>;

export type GetVitalsExcessivewakeuprateResponse = GooglePlayDeveloperReportingV1beta1ExcessiveWakeupRateMetricSet;
export const GetVitalsExcessivewakeuprateResponse = GooglePlayDeveloperReportingV1beta1ExcessiveWakeupRateMetricSet;

export type GetVitalsExcessivewakeuprateError = CommonErrors;

export const getVitalsExcessivewakeuprate: API.OperationMethod<GetVitalsExcessivewakeuprateRequest, GetVitalsExcessivewakeuprateResponse, GetVitalsExcessivewakeuprateError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetVitalsExcessivewakeuprateRequest,
  output: GetVitalsExcessivewakeuprateResponse,
  errors: [],
}));

/** Queries the metrics in the metric set. */
export interface QueryVitalsExcessivewakeuprateRequest {
  /** Required. The resource name. Format: apps/{app}/excessiveWakeupRateMetricSet */
  name: string;
  /** Request body */
  body?: GooglePlayDeveloperReportingV1beta1QueryExcessiveWakeupRateMetricSetRequest;
}

export const QueryVitalsExcessivewakeuprateRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GooglePlayDeveloperReportingV1beta1QueryExcessiveWakeupRateMetricSetRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/apps/{appsId}/excessiveWakeupRateMetricSet:query", hasBody: true }),
  svc,
) as unknown as Schema.Schema<QueryVitalsExcessivewakeuprateRequest>;

export type QueryVitalsExcessivewakeuprateResponse = GooglePlayDeveloperReportingV1beta1QueryExcessiveWakeupRateMetricSetResponse;
export const QueryVitalsExcessivewakeuprateResponse = GooglePlayDeveloperReportingV1beta1QueryExcessiveWakeupRateMetricSetResponse;

export type QueryVitalsExcessivewakeuprateError = CommonErrors;

export const queryVitalsExcessivewakeuprate: API.OperationMethod<QueryVitalsExcessivewakeuprateRequest, QueryVitalsExcessivewakeuprateResponse, QueryVitalsExcessivewakeuprateError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: QueryVitalsExcessivewakeuprateRequest,
  output: QueryVitalsExcessivewakeuprateResponse,
  errors: [],
}));

/** Describes the properties of the metric set. */
export interface GetVitalsStuckbackgroundwakelockrateRequest {
  /** Required. The resource name. Format: apps/{app}/stuckBackgroundWakelockRateMetricSet */
  name: string;
}

export const GetVitalsStuckbackgroundwakelockrateRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/apps/{appsId}/stuckBackgroundWakelockRateMetricSet" }),
  svc,
) as unknown as Schema.Schema<GetVitalsStuckbackgroundwakelockrateRequest>;

export type GetVitalsStuckbackgroundwakelockrateResponse = GooglePlayDeveloperReportingV1beta1StuckBackgroundWakelockRateMetricSet;
export const GetVitalsStuckbackgroundwakelockrateResponse = GooglePlayDeveloperReportingV1beta1StuckBackgroundWakelockRateMetricSet;

export type GetVitalsStuckbackgroundwakelockrateError = CommonErrors;

export const getVitalsStuckbackgroundwakelockrate: API.OperationMethod<GetVitalsStuckbackgroundwakelockrateRequest, GetVitalsStuckbackgroundwakelockrateResponse, GetVitalsStuckbackgroundwakelockrateError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetVitalsStuckbackgroundwakelockrateRequest,
  output: GetVitalsStuckbackgroundwakelockrateResponse,
  errors: [],
}));

/** Queries the metrics in the metric set. */
export interface QueryVitalsStuckbackgroundwakelockrateRequest {
  /** Required. The resource name. Format: apps/{app}/stuckBackgroundWakelockRateMetricSet */
  name: string;
  /** Request body */
  body?: GooglePlayDeveloperReportingV1beta1QueryStuckBackgroundWakelockRateMetricSetRequest;
}

export const QueryVitalsStuckbackgroundwakelockrateRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GooglePlayDeveloperReportingV1beta1QueryStuckBackgroundWakelockRateMetricSetRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/apps/{appsId}/stuckBackgroundWakelockRateMetricSet:query", hasBody: true }),
  svc,
) as unknown as Schema.Schema<QueryVitalsStuckbackgroundwakelockrateRequest>;

export type QueryVitalsStuckbackgroundwakelockrateResponse = GooglePlayDeveloperReportingV1beta1QueryStuckBackgroundWakelockRateMetricSetResponse;
export const QueryVitalsStuckbackgroundwakelockrateResponse = GooglePlayDeveloperReportingV1beta1QueryStuckBackgroundWakelockRateMetricSetResponse;

export type QueryVitalsStuckbackgroundwakelockrateError = CommonErrors;

export const queryVitalsStuckbackgroundwakelockrate: API.OperationMethod<QueryVitalsStuckbackgroundwakelockrateRequest, QueryVitalsStuckbackgroundwakelockrateResponse, QueryVitalsStuckbackgroundwakelockrateError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: QueryVitalsStuckbackgroundwakelockrateRequest,
  output: QueryVitalsStuckbackgroundwakelockrateResponse,
  errors: [],
}));

/** Describes the properties of the metric set. */
export interface GetVitalsSlowstartrateRequest {
  /** Required. The resource name. Format: apps/{app}/slowStartRateMetricSet */
  name: string;
}

export const GetVitalsSlowstartrateRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/apps/{appsId}/slowStartRateMetricSet" }),
  svc,
) as unknown as Schema.Schema<GetVitalsSlowstartrateRequest>;

export type GetVitalsSlowstartrateResponse = GooglePlayDeveloperReportingV1beta1SlowStartRateMetricSet;
export const GetVitalsSlowstartrateResponse = GooglePlayDeveloperReportingV1beta1SlowStartRateMetricSet;

export type GetVitalsSlowstartrateError = CommonErrors;

export const getVitalsSlowstartrate: API.OperationMethod<GetVitalsSlowstartrateRequest, GetVitalsSlowstartrateResponse, GetVitalsSlowstartrateError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetVitalsSlowstartrateRequest,
  output: GetVitalsSlowstartrateResponse,
  errors: [],
}));

/** Queries the metrics in the metric set. */
export interface QueryVitalsSlowstartrateRequest {
  /** Required. The resource name. Format: apps/{app}/slowStartRateMetricSet */
  name: string;
  /** Request body */
  body?: GooglePlayDeveloperReportingV1beta1QuerySlowStartRateMetricSetRequest;
}

export const QueryVitalsSlowstartrateRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GooglePlayDeveloperReportingV1beta1QuerySlowStartRateMetricSetRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/apps/{appsId}/slowStartRateMetricSet:query", hasBody: true }),
  svc,
) as unknown as Schema.Schema<QueryVitalsSlowstartrateRequest>;

export type QueryVitalsSlowstartrateResponse = GooglePlayDeveloperReportingV1beta1QuerySlowStartRateMetricSetResponse;
export const QueryVitalsSlowstartrateResponse = GooglePlayDeveloperReportingV1beta1QuerySlowStartRateMetricSetResponse;

export type QueryVitalsSlowstartrateError = CommonErrors;

export const queryVitalsSlowstartrate: API.OperationMethod<QueryVitalsSlowstartrateRequest, QueryVitalsSlowstartrateResponse, QueryVitalsSlowstartrateError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: QueryVitalsSlowstartrateRequest,
  output: QueryVitalsSlowstartrateResponse,
  errors: [],
}));

/** Describes the properties of the metric set. */
export interface GetVitalsSlowrenderingrateRequest {
  /** Required. The resource name. Format: apps/{app}/slowRenderingRateMetricSet */
  name: string;
}

export const GetVitalsSlowrenderingrateRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/apps/{appsId}/slowRenderingRateMetricSet" }),
  svc,
) as unknown as Schema.Schema<GetVitalsSlowrenderingrateRequest>;

export type GetVitalsSlowrenderingrateResponse = GooglePlayDeveloperReportingV1beta1SlowRenderingRateMetricSet;
export const GetVitalsSlowrenderingrateResponse = GooglePlayDeveloperReportingV1beta1SlowRenderingRateMetricSet;

export type GetVitalsSlowrenderingrateError = CommonErrors;

export const getVitalsSlowrenderingrate: API.OperationMethod<GetVitalsSlowrenderingrateRequest, GetVitalsSlowrenderingrateResponse, GetVitalsSlowrenderingrateError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetVitalsSlowrenderingrateRequest,
  output: GetVitalsSlowrenderingrateResponse,
  errors: [],
}));

/** Queries the metrics in the metric set. */
export interface QueryVitalsSlowrenderingrateRequest {
  /** Required. The resource name. Format: apps/{app}/slowRenderingRateMetricSet */
  name: string;
  /** Request body */
  body?: GooglePlayDeveloperReportingV1beta1QuerySlowRenderingRateMetricSetRequest;
}

export const QueryVitalsSlowrenderingrateRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GooglePlayDeveloperReportingV1beta1QuerySlowRenderingRateMetricSetRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/apps/{appsId}/slowRenderingRateMetricSet:query", hasBody: true }),
  svc,
) as unknown as Schema.Schema<QueryVitalsSlowrenderingrateRequest>;

export type QueryVitalsSlowrenderingrateResponse = GooglePlayDeveloperReportingV1beta1QuerySlowRenderingRateMetricSetResponse;
export const QueryVitalsSlowrenderingrateResponse = GooglePlayDeveloperReportingV1beta1QuerySlowRenderingRateMetricSetResponse;

export type QueryVitalsSlowrenderingrateError = CommonErrors;

export const queryVitalsSlowrenderingrate: API.OperationMethod<QueryVitalsSlowrenderingrateRequest, QueryVitalsSlowrenderingrateResponse, QueryVitalsSlowrenderingrateError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: QueryVitalsSlowrenderingrateRequest,
  output: QueryVitalsSlowrenderingrateResponse,
  errors: [],
}));

/** Searches all error reports received for an app. */
export interface SearchVitalsErrorsReportsRequest {
  /** Required. Parent resource of the reports, indicating the application for which they were received. Format: apps/{app} */
  parent: string;
  /** Optional. Year of date. Must be from 1 to 9999, or 0 if specifying a datetime without a year. */
  "interval.startTime.year"?: number;
  /** Optional. Month of year. Must be from 1 to 12, or 0 if specifying a datetime without a month. */
  "interval.startTime.month"?: number;
  /** Optional. Day of month. Must be from 1 to 31 and valid for the year and month, or 0 if specifying a datetime without a day. */
  "interval.startTime.day"?: number;
  /** Optional. Hours of day in 24 hour format. Should be from 0 to 23, defaults to 0 (midnight). An API may choose to allow the value "24:00:00" for scenarios like business closing time. */
  "interval.startTime.hours"?: number;
  /** Optional. Minutes of hour of day. Must be from 0 to 59, defaults to 0. */
  "interval.startTime.minutes"?: number;
  /** Optional. Seconds of minutes of the time. Must normally be from 0 to 59, defaults to 0. An API may allow the value 60 if it allows leap-seconds. */
  "interval.startTime.seconds"?: number;
  /** Optional. Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999, defaults to 0. */
  "interval.startTime.nanos"?: number;
  /** UTC offset. Must be whole seconds, between -18 hours and +18 hours. For example, a UTC offset of -4:00 would be represented as { seconds: -14400 }. */
  "interval.startTime.utcOffset"?: string;
  /** IANA Time Zone Database time zone. For example "America/New_York". */
  "interval.startTime.timeZone.id"?: string;
  /** Optional. IANA Time Zone Database version number. For example "2019a". */
  "interval.startTime.timeZone.version"?: string;
  /** Optional. Year of date. Must be from 1 to 9999, or 0 if specifying a datetime without a year. */
  "interval.endTime.year"?: number;
  /** Optional. Month of year. Must be from 1 to 12, or 0 if specifying a datetime without a month. */
  "interval.endTime.month"?: number;
  /** Optional. Day of month. Must be from 1 to 31 and valid for the year and month, or 0 if specifying a datetime without a day. */
  "interval.endTime.day"?: number;
  /** Optional. Hours of day in 24 hour format. Should be from 0 to 23, defaults to 0 (midnight). An API may choose to allow the value "24:00:00" for scenarios like business closing time. */
  "interval.endTime.hours"?: number;
  /** Optional. Minutes of hour of day. Must be from 0 to 59, defaults to 0. */
  "interval.endTime.minutes"?: number;
  /** Optional. Seconds of minutes of the time. Must normally be from 0 to 59, defaults to 0. An API may allow the value 60 if it allows leap-seconds. */
  "interval.endTime.seconds"?: number;
  /** Optional. Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999, defaults to 0. */
  "interval.endTime.nanos"?: number;
  /** UTC offset. Must be whole seconds, between -18 hours and +18 hours. For example, a UTC offset of -4:00 would be represented as { seconds: -14400 }. */
  "interval.endTime.utcOffset"?: string;
  /** IANA Time Zone Database time zone. For example "America/New_York". */
  "interval.endTime.timeZone.id"?: string;
  /** Optional. IANA Time Zone Database version number. For example "2019a". */
  "interval.endTime.timeZone.version"?: string;
  /** Optional. The maximum number of reports to return. The service may return fewer than this value. If unspecified, at most 50 reports will be returned. The maximum value is 100; values above 100 will be coerced to 100. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `SearchErrorReports` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `SearchErrorReports` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. A selection predicate to retrieve only a subset of the reports. For filtering basics, please check [AIP-160](https://google.aip.dev/160). ** Supported field names:** * `apiLevel`: Matches error reports that occurred in the requested Android versions (specified as the numeric API level) only. Example: `apiLevel = 28 OR apiLevel = 29`. * `versionCode`: Matches error reports that occurred in the requested app version codes only. Example: `versionCode = 123 OR versionCode = 456`. * `deviceModel`: Matches error issues that occurred in the requested devices. Example: `deviceModel = "google/walleye" OR deviceModel = "google/marlin"`. * `deviceBrand`: Matches error issues that occurred in the requested device brands. Example: `deviceBrand = "Google". * `deviceType`: Matches error reports that occurred in the requested device types. Example: `deviceType = "PHONE"`. * `errorIssueType`: Matches error reports of the requested types only. Valid candidates: `CRASH`, `ANR`, `NON_FATAL`. Example: `errorIssueType = CRASH OR errorIssueType = ANR`. * `errorIssueId`: Matches error reports belonging to the requested error issue ids only. Example: `errorIssueId = 1234 OR errorIssueId = 4567`. * `errorReportId`: Matches error reports with the requested error report id. Example: `errorReportId = 1234 OR errorReportId = 4567`. * `appProcessState`: Matches error reports on the process state of an app, indicating whether an app runs in the foreground (user-visible) or background. Valid candidates: `FOREGROUND`, `BACKGROUND`. Example: `appProcessState = FOREGROUND`. * `isUserPerceived`: Matches error reports that are user-perceived. It is not accompanied by any operators. Example: `isUserPerceived`. ** Supported operators:** * Comparison operators: The only supported comparison operator is equality. The filtered field must appear on the left hand side of the comparison. * Logical Operators: Logical operators `AND` and `OR` can be used to build complex filters following a conjunctive normal form (CNF), i.e., conjunctions of disjunctions. The `OR` operator takes precedence over `AND` so the use of parenthesis is not necessary when building CNF. The `OR` operator is only supported to build disjunctions that apply to the same field, e.g., `versionCode = 123 OR versionCode = ANR`. The filter expression `versionCode = 123 OR errorIssueType = ANR` is not valid. ** Examples ** Some valid filtering expressions: * `versionCode = 123 AND errorIssueType = ANR` * `versionCode = 123 AND errorIssueType = OR errorIssueType = CRASH` * `versionCode = 123 AND (errorIssueType = OR errorIssueType = CRASH)` */
  filter?: string;
}

export const SearchVitalsErrorsReportsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  "interval.startTime.year": Schema.optional(Schema.Number).pipe(T.HttpQuery("interval.startTime.year")),
  "interval.startTime.month": Schema.optional(Schema.Number).pipe(T.HttpQuery("interval.startTime.month")),
  "interval.startTime.day": Schema.optional(Schema.Number).pipe(T.HttpQuery("interval.startTime.day")),
  "interval.startTime.hours": Schema.optional(Schema.Number).pipe(T.HttpQuery("interval.startTime.hours")),
  "interval.startTime.minutes": Schema.optional(Schema.Number).pipe(T.HttpQuery("interval.startTime.minutes")),
  "interval.startTime.seconds": Schema.optional(Schema.Number).pipe(T.HttpQuery("interval.startTime.seconds")),
  "interval.startTime.nanos": Schema.optional(Schema.Number).pipe(T.HttpQuery("interval.startTime.nanos")),
  "interval.startTime.utcOffset": Schema.optional(Schema.String).pipe(T.HttpQuery("interval.startTime.utcOffset")),
  "interval.startTime.timeZone.id": Schema.optional(Schema.String).pipe(T.HttpQuery("interval.startTime.timeZone.id")),
  "interval.startTime.timeZone.version": Schema.optional(Schema.String).pipe(T.HttpQuery("interval.startTime.timeZone.version")),
  "interval.endTime.year": Schema.optional(Schema.Number).pipe(T.HttpQuery("interval.endTime.year")),
  "interval.endTime.month": Schema.optional(Schema.Number).pipe(T.HttpQuery("interval.endTime.month")),
  "interval.endTime.day": Schema.optional(Schema.Number).pipe(T.HttpQuery("interval.endTime.day")),
  "interval.endTime.hours": Schema.optional(Schema.Number).pipe(T.HttpQuery("interval.endTime.hours")),
  "interval.endTime.minutes": Schema.optional(Schema.Number).pipe(T.HttpQuery("interval.endTime.minutes")),
  "interval.endTime.seconds": Schema.optional(Schema.Number).pipe(T.HttpQuery("interval.endTime.seconds")),
  "interval.endTime.nanos": Schema.optional(Schema.Number).pipe(T.HttpQuery("interval.endTime.nanos")),
  "interval.endTime.utcOffset": Schema.optional(Schema.String).pipe(T.HttpQuery("interval.endTime.utcOffset")),
  "interval.endTime.timeZone.id": Schema.optional(Schema.String).pipe(T.HttpQuery("interval.endTime.timeZone.id")),
  "interval.endTime.timeZone.version": Schema.optional(Schema.String).pipe(T.HttpQuery("interval.endTime.timeZone.version")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/apps/{appsId}/errorReports:search" }),
  svc,
) as unknown as Schema.Schema<SearchVitalsErrorsReportsRequest>;

export type SearchVitalsErrorsReportsResponse = GooglePlayDeveloperReportingV1beta1SearchErrorReportsResponse;
export const SearchVitalsErrorsReportsResponse = GooglePlayDeveloperReportingV1beta1SearchErrorReportsResponse;

export type SearchVitalsErrorsReportsError = CommonErrors;

export const searchVitalsErrorsReports = API.makePaginated(() => ({
  input: SearchVitalsErrorsReportsRequest,
  output: SearchVitalsErrorsReportsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Searches all error issues in which reports have been grouped. */
export interface SearchVitalsErrorsIssuesRequest {
  /** Required. Parent resource of the error issues, indicating the application for which they were received. Format: apps/{app} */
  parent: string;
  /** Optional. Year of date. Must be from 1 to 9999, or 0 if specifying a datetime without a year. */
  "interval.startTime.year"?: number;
  /** Optional. Month of year. Must be from 1 to 12, or 0 if specifying a datetime without a month. */
  "interval.startTime.month"?: number;
  /** Optional. Day of month. Must be from 1 to 31 and valid for the year and month, or 0 if specifying a datetime without a day. */
  "interval.startTime.day"?: number;
  /** Optional. Hours of day in 24 hour format. Should be from 0 to 23, defaults to 0 (midnight). An API may choose to allow the value "24:00:00" for scenarios like business closing time. */
  "interval.startTime.hours"?: number;
  /** Optional. Minutes of hour of day. Must be from 0 to 59, defaults to 0. */
  "interval.startTime.minutes"?: number;
  /** Optional. Seconds of minutes of the time. Must normally be from 0 to 59, defaults to 0. An API may allow the value 60 if it allows leap-seconds. */
  "interval.startTime.seconds"?: number;
  /** Optional. Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999, defaults to 0. */
  "interval.startTime.nanos"?: number;
  /** UTC offset. Must be whole seconds, between -18 hours and +18 hours. For example, a UTC offset of -4:00 would be represented as { seconds: -14400 }. */
  "interval.startTime.utcOffset"?: string;
  /** IANA Time Zone Database time zone. For example "America/New_York". */
  "interval.startTime.timeZone.id"?: string;
  /** Optional. IANA Time Zone Database version number. For example "2019a". */
  "interval.startTime.timeZone.version"?: string;
  /** Optional. Year of date. Must be from 1 to 9999, or 0 if specifying a datetime without a year. */
  "interval.endTime.year"?: number;
  /** Optional. Month of year. Must be from 1 to 12, or 0 if specifying a datetime without a month. */
  "interval.endTime.month"?: number;
  /** Optional. Day of month. Must be from 1 to 31 and valid for the year and month, or 0 if specifying a datetime without a day. */
  "interval.endTime.day"?: number;
  /** Optional. Hours of day in 24 hour format. Should be from 0 to 23, defaults to 0 (midnight). An API may choose to allow the value "24:00:00" for scenarios like business closing time. */
  "interval.endTime.hours"?: number;
  /** Optional. Minutes of hour of day. Must be from 0 to 59, defaults to 0. */
  "interval.endTime.minutes"?: number;
  /** Optional. Seconds of minutes of the time. Must normally be from 0 to 59, defaults to 0. An API may allow the value 60 if it allows leap-seconds. */
  "interval.endTime.seconds"?: number;
  /** Optional. Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999, defaults to 0. */
  "interval.endTime.nanos"?: number;
  /** UTC offset. Must be whole seconds, between -18 hours and +18 hours. For example, a UTC offset of -4:00 would be represented as { seconds: -14400 }. */
  "interval.endTime.utcOffset"?: string;
  /** IANA Time Zone Database time zone. For example "America/New_York". */
  "interval.endTime.timeZone.id"?: string;
  /** Optional. IANA Time Zone Database version number. For example "2019a". */
  "interval.endTime.timeZone.version"?: string;
  /** Optional. The maximum number of error issues to return. The service may return fewer than this value. If unspecified, at most 50 error issues will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to the request must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. A selection predicate to retrieve only a subset of the issues. Counts in the returned error issues will only reflect occurrences that matched the filter. For filtering basics, please check [AIP-160](https://google.aip.dev/160). ** Supported field names:** * `apiLevel`: Matches error issues that occurred in the requested Android versions (specified as the numeric API level) only. Example: `apiLevel = 28 OR apiLevel = 29`. * `versionCode`: Matches error issues that occurred in the requested app version codes only. Example: `versionCode = 123 OR versionCode = 456`. * `deviceModel`: Matches error issues that occurred in the requested devices. Example: `deviceModel = "google/walleye" OR deviceModel = "google/marlin"`. * `deviceBrand`: Matches error issues that occurred in the requested device brands. Example: `deviceBrand = "Google". * `deviceType`: Matches error issues that occurred in the requested device types. Example: `deviceType = "PHONE"`. * `errorIssueType`: Matches error issues of the requested types only. Valid candidates: `CRASH`, `ANR`, `NON_FATAL`. Example: `errorIssueType = CRASH OR errorIssueType = ANR`. * `appProcessState`: Matches error issues on the process state of an app, indicating whether an app runs in the foreground (user-visible) or background. Valid candidates: `FOREGROUND`, `BACKGROUND`. Example: `appProcessState = FOREGROUND`. * `isUserPerceived`: Matches error issues that are user-perceived. It is not accompanied by any operators. Example: `isUserPerceived`. ** Supported operators:** * Comparison operators: The only supported comparison operator is equality. The filtered field must appear on the left hand side of the comparison. * Logical Operators: Logical operators `AND` and `OR` can be used to build complex filters following a conjunctive normal form (CNF), i.e., conjunctions of disjunctions. The `OR` operator takes precedence over `AND` so the use of parenthesis is not necessary when building CNF. The `OR` operator is only supported to build disjunctions that apply to the same field, e.g., `versionCode = 123 OR errorIssueType = ANR` is not a valid filter. ** Examples ** Some valid filtering expressions: * `versionCode = 123 AND errorIssueType = ANR` * `versionCode = 123 AND errorIssueType = OR errorIssueType = CRASH` * `versionCode = 123 AND (errorIssueType = OR errorIssueType = CRASH)` */
  filter?: string;
  /** Optional. Specifies a field that will be used to order the results. ** Supported dimensions:** * `errorReportCount`: Orders issues by number of error reports. * `distinctUsers`: Orders issues by number of unique affected users. ** Supported operations:** * `asc` for ascending order. * `desc` for descending order. Format: A field and an operation, e.g., `errorReportCount desc` *Note:* currently only one field is supported at a time. */
  orderBy?: string;
  /** Optional. Number of sample error reports to return per ErrorIssue. If unspecified, 0 will be used. *Note:* currently only 0 and 1 are supported. */
  sampleErrorReportLimit?: number;
}

export const SearchVitalsErrorsIssuesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  "interval.startTime.year": Schema.optional(Schema.Number).pipe(T.HttpQuery("interval.startTime.year")),
  "interval.startTime.month": Schema.optional(Schema.Number).pipe(T.HttpQuery("interval.startTime.month")),
  "interval.startTime.day": Schema.optional(Schema.Number).pipe(T.HttpQuery("interval.startTime.day")),
  "interval.startTime.hours": Schema.optional(Schema.Number).pipe(T.HttpQuery("interval.startTime.hours")),
  "interval.startTime.minutes": Schema.optional(Schema.Number).pipe(T.HttpQuery("interval.startTime.minutes")),
  "interval.startTime.seconds": Schema.optional(Schema.Number).pipe(T.HttpQuery("interval.startTime.seconds")),
  "interval.startTime.nanos": Schema.optional(Schema.Number).pipe(T.HttpQuery("interval.startTime.nanos")),
  "interval.startTime.utcOffset": Schema.optional(Schema.String).pipe(T.HttpQuery("interval.startTime.utcOffset")),
  "interval.startTime.timeZone.id": Schema.optional(Schema.String).pipe(T.HttpQuery("interval.startTime.timeZone.id")),
  "interval.startTime.timeZone.version": Schema.optional(Schema.String).pipe(T.HttpQuery("interval.startTime.timeZone.version")),
  "interval.endTime.year": Schema.optional(Schema.Number).pipe(T.HttpQuery("interval.endTime.year")),
  "interval.endTime.month": Schema.optional(Schema.Number).pipe(T.HttpQuery("interval.endTime.month")),
  "interval.endTime.day": Schema.optional(Schema.Number).pipe(T.HttpQuery("interval.endTime.day")),
  "interval.endTime.hours": Schema.optional(Schema.Number).pipe(T.HttpQuery("interval.endTime.hours")),
  "interval.endTime.minutes": Schema.optional(Schema.Number).pipe(T.HttpQuery("interval.endTime.minutes")),
  "interval.endTime.seconds": Schema.optional(Schema.Number).pipe(T.HttpQuery("interval.endTime.seconds")),
  "interval.endTime.nanos": Schema.optional(Schema.Number).pipe(T.HttpQuery("interval.endTime.nanos")),
  "interval.endTime.utcOffset": Schema.optional(Schema.String).pipe(T.HttpQuery("interval.endTime.utcOffset")),
  "interval.endTime.timeZone.id": Schema.optional(Schema.String).pipe(T.HttpQuery("interval.endTime.timeZone.id")),
  "interval.endTime.timeZone.version": Schema.optional(Schema.String).pipe(T.HttpQuery("interval.endTime.timeZone.version")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  sampleErrorReportLimit: Schema.optional(Schema.Number).pipe(T.HttpQuery("sampleErrorReportLimit")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/apps/{appsId}/errorIssues:search" }),
  svc,
) as unknown as Schema.Schema<SearchVitalsErrorsIssuesRequest>;

export type SearchVitalsErrorsIssuesResponse = GooglePlayDeveloperReportingV1beta1SearchErrorIssuesResponse;
export const SearchVitalsErrorsIssuesResponse = GooglePlayDeveloperReportingV1beta1SearchErrorIssuesResponse;

export type SearchVitalsErrorsIssuesError = CommonErrors;

export const searchVitalsErrorsIssues = API.makePaginated(() => ({
  input: SearchVitalsErrorsIssuesRequest,
  output: SearchVitalsErrorsIssuesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Describes the properties of the metrics set. */
export interface GetVitalsErrorsCountsRequest {
  /** Required. Name of the errors metric set. Format: apps/{app}/errorCountMetricSet */
  name: string;
}

export const GetVitalsErrorsCountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/apps/{appsId}/errorCountMetricSet" }),
  svc,
) as unknown as Schema.Schema<GetVitalsErrorsCountsRequest>;

export type GetVitalsErrorsCountsResponse = GooglePlayDeveloperReportingV1beta1ErrorCountMetricSet;
export const GetVitalsErrorsCountsResponse = GooglePlayDeveloperReportingV1beta1ErrorCountMetricSet;

export type GetVitalsErrorsCountsError = CommonErrors;

export const getVitalsErrorsCounts: API.OperationMethod<GetVitalsErrorsCountsRequest, GetVitalsErrorsCountsResponse, GetVitalsErrorsCountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetVitalsErrorsCountsRequest,
  output: GetVitalsErrorsCountsResponse,
  errors: [],
}));

/** Queries the metrics in the metrics set. */
export interface QueryVitalsErrorsCountsRequest {
  /** Required. The resource name. Format: apps/{app}/errorCountMetricSet */
  name: string;
  /** Request body */
  body?: GooglePlayDeveloperReportingV1beta1QueryErrorCountMetricSetRequest;
}

export const QueryVitalsErrorsCountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GooglePlayDeveloperReportingV1beta1QueryErrorCountMetricSetRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/apps/{appsId}/errorCountMetricSet:query", hasBody: true }),
  svc,
) as unknown as Schema.Schema<QueryVitalsErrorsCountsRequest>;

export type QueryVitalsErrorsCountsResponse = GooglePlayDeveloperReportingV1beta1QueryErrorCountMetricSetResponse;
export const QueryVitalsErrorsCountsResponse = GooglePlayDeveloperReportingV1beta1QueryErrorCountMetricSetResponse;

export type QueryVitalsErrorsCountsError = CommonErrors;

export const queryVitalsErrorsCounts: API.OperationMethod<QueryVitalsErrorsCountsRequest, QueryVitalsErrorsCountsResponse, QueryVitalsErrorsCountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: QueryVitalsErrorsCountsRequest,
  output: QueryVitalsErrorsCountsResponse,
  errors: [],
}));

/** Describes filtering options for releases. */
export interface FetchReleaseFilterOptionsAppsRequest {
  /** Required. Name of the resource, i.e. app the filtering options are for. Format: apps/{app} */
  name: string;
}

export const FetchReleaseFilterOptionsAppsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/apps/{appsId}:fetchReleaseFilterOptions" }),
  svc,
) as unknown as Schema.Schema<FetchReleaseFilterOptionsAppsRequest>;

export type FetchReleaseFilterOptionsAppsResponse = GooglePlayDeveloperReportingV1beta1ReleaseFilterOptions;
export const FetchReleaseFilterOptionsAppsResponse = GooglePlayDeveloperReportingV1beta1ReleaseFilterOptions;

export type FetchReleaseFilterOptionsAppsError = CommonErrors;

export const fetchReleaseFilterOptionsApps: API.OperationMethod<FetchReleaseFilterOptionsAppsRequest, FetchReleaseFilterOptionsAppsResponse, FetchReleaseFilterOptionsAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FetchReleaseFilterOptionsAppsRequest,
  output: FetchReleaseFilterOptionsAppsResponse,
  errors: [],
}));

/** Searches for Apps accessible by the user. */
export interface SearchAppsRequest {
  /** Optional. The maximum number of apps to return. The service may return fewer than this value. If unspecified, at most 50 apps will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `SearchAccessibleApps` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `SearchAccessibleApps` must match the call that provided the page token. */
  pageToken?: string;
}

export const SearchAppsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/apps:search" }),
  svc,
) as unknown as Schema.Schema<SearchAppsRequest>;

export type SearchAppsResponse = GooglePlayDeveloperReportingV1beta1SearchAccessibleAppsResponse;
export const SearchAppsResponse = GooglePlayDeveloperReportingV1beta1SearchAccessibleAppsResponse;

export type SearchAppsError = CommonErrors;

export const searchApps = API.makePaginated(() => ({
  input: SearchAppsRequest,
  output: SearchAppsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

