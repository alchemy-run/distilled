// ==========================================================================
// Business Profile Performance API (businessprofileperformance v1)
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
  name: "businessprofileperformance",
  version: "v1",
  rootUrl: "https://businessprofileperformance.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Businessprofileperformance_Date {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const Businessprofileperformance_Date: Schema.Schema<Businessprofileperformance_Date> =
  Schema.suspend(() =>
    Schema.Struct({
      year: Schema.optional(Schema.Number),
      month: Schema.optional(Schema.Number),
      day: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "Businessprofileperformance_Date",
  }) as any as Schema.Schema<Businessprofileperformance_Date>;

export interface DatedValue {
  /** The date that the datapoint corresponds to. This represents a month value if the day field is not set. */
  date?: Businessprofileperformance_Date;
  /** The value of the datapoint. This will not be present when the value is zero. */
  value?: string;
}

export const DatedValue: Schema.Schema<DatedValue> = Schema.suspend(() =>
  Schema.Struct({
    date: Schema.optional(Businessprofileperformance_Date),
    value: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "DatedValue" }) as any as Schema.Schema<DatedValue>;

export interface TimeSeries {
  /** List of datapoints in the timeseries, where each datapoint is a date-value pair. */
  datedValues?: Array<DatedValue>;
}

export const TimeSeries: Schema.Schema<TimeSeries> = Schema.suspend(() =>
  Schema.Struct({
    datedValues: Schema.optional(Schema.Array(DatedValue)),
  }),
).annotate({ identifier: "TimeSeries" }) as any as Schema.Schema<TimeSeries>;

export interface InsightsValue {
  /** Represents the threshold below which the actual value falls. */
  threshold?: string;
  /** Represents the actual value. */
  value?: string;
}

export const InsightsValue: Schema.Schema<InsightsValue> = Schema.suspend(() =>
  Schema.Struct({
    threshold: Schema.optional(Schema.String),
    value: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "InsightsValue",
}) as any as Schema.Schema<InsightsValue>;

export interface SearchKeywordCount {
  /** The lower-cased string that the user entered. */
  searchKeyword?: string;
  /** One of either: 1) The sum of the number of unique users that used the keyword in a month, aggregated for each month requested. 2) A threshold that indicates that the actual value is below this threshold. */
  insightsValue?: InsightsValue;
}

export const SearchKeywordCount: Schema.Schema<SearchKeywordCount> =
  Schema.suspend(() =>
    Schema.Struct({
      searchKeyword: Schema.optional(Schema.String),
      insightsValue: Schema.optional(InsightsValue),
    }),
  ).annotate({
    identifier: "SearchKeywordCount",
  }) as any as Schema.Schema<SearchKeywordCount>;

export interface ListSearchKeywordImpressionsMonthlyResponse {
  /** Search terms which have been used to find a business. */
  searchKeywordsCounts?: Array<SearchKeywordCount>;
  /** A token indicating the last paginated result returned. This can be used by succeeding requests to get the next "page" of keywords. It will only be present when there are more results to be returned. */
  nextPageToken?: string;
}

export const ListSearchKeywordImpressionsMonthlyResponse: Schema.Schema<ListSearchKeywordImpressionsMonthlyResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      searchKeywordsCounts: Schema.optional(Schema.Array(SearchKeywordCount)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListSearchKeywordImpressionsMonthlyResponse",
  }) as any as Schema.Schema<ListSearchKeywordImpressionsMonthlyResponse>;

export interface TimeOfDay {
  /** Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. */
  hours?: number;
  /** Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. */
  minutes?: number;
  /** Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. */
  nanos?: number;
  /** Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. */
  seconds?: number;
}

export const TimeOfDay: Schema.Schema<TimeOfDay> = Schema.suspend(() =>
  Schema.Struct({
    hours: Schema.optional(Schema.Number),
    minutes: Schema.optional(Schema.Number),
    nanos: Schema.optional(Schema.Number),
    seconds: Schema.optional(Schema.Number),
  }),
).annotate({ identifier: "TimeOfDay" }) as any as Schema.Schema<TimeOfDay>;

export interface DailySubEntityType {
  /** Represents the day of the week. Eg: MONDAY. Currently supported DailyMetrics = NONE. */
  dayOfWeek?:
    | "DAY_OF_WEEK_UNSPECIFIED"
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY"
    | (string & {});
  /** Represents the time of the day in 24 hour format. Eg: 13:34:20 Currently supported DailyMetrics = NONE. */
  timeOfDay?: TimeOfDay;
}

export const DailySubEntityType: Schema.Schema<DailySubEntityType> =
  Schema.suspend(() =>
    Schema.Struct({
      dayOfWeek: Schema.optional(Schema.String),
      timeOfDay: Schema.optional(TimeOfDay),
    }),
  ).annotate({
    identifier: "DailySubEntityType",
  }) as any as Schema.Schema<DailySubEntityType>;

export interface DailyMetricTimeSeries {
  /** The DailyMetric that the TimeSeries represents. */
  dailyMetric?:
    | "DAILY_METRIC_UNKNOWN"
    | "BUSINESS_IMPRESSIONS_DESKTOP_MAPS"
    | "BUSINESS_IMPRESSIONS_DESKTOP_SEARCH"
    | "BUSINESS_IMPRESSIONS_MOBILE_MAPS"
    | "BUSINESS_IMPRESSIONS_MOBILE_SEARCH"
    | "BUSINESS_CONVERSATIONS"
    | "BUSINESS_DIRECTION_REQUESTS"
    | "CALL_CLICKS"
    | "WEBSITE_CLICKS"
    | "BUSINESS_BOOKINGS"
    | "BUSINESS_FOOD_ORDERS"
    | "BUSINESS_FOOD_MENU_CLICKS"
    | (string & {});
  /** List of datapoints where each datapoint is a date-value pair. */
  timeSeries?: TimeSeries;
  /** The DailySubEntityType that the TimeSeries represents. Will not be present when breakdown does not exist. */
  dailySubEntityType?: DailySubEntityType;
}

export const DailyMetricTimeSeries: Schema.Schema<DailyMetricTimeSeries> =
  Schema.suspend(() =>
    Schema.Struct({
      dailyMetric: Schema.optional(Schema.String),
      timeSeries: Schema.optional(TimeSeries),
      dailySubEntityType: Schema.optional(DailySubEntityType),
    }),
  ).annotate({
    identifier: "DailyMetricTimeSeries",
  }) as any as Schema.Schema<DailyMetricTimeSeries>;

export interface MultiDailyMetricTimeSeries {
  /** List of DailyMetric-TimeSeries pairs. */
  dailyMetricTimeSeries?: Array<DailyMetricTimeSeries>;
}

export const MultiDailyMetricTimeSeries: Schema.Schema<MultiDailyMetricTimeSeries> =
  Schema.suspend(() =>
    Schema.Struct({
      dailyMetricTimeSeries: Schema.optional(
        Schema.Array(DailyMetricTimeSeries),
      ),
    }),
  ).annotate({
    identifier: "MultiDailyMetricTimeSeries",
  }) as any as Schema.Schema<MultiDailyMetricTimeSeries>;

export interface GetDailyMetricsTimeSeriesResponse {
  /** The daily time series. */
  timeSeries?: TimeSeries;
}

export const GetDailyMetricsTimeSeriesResponse: Schema.Schema<GetDailyMetricsTimeSeriesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      timeSeries: Schema.optional(TimeSeries),
    }),
  ).annotate({
    identifier: "GetDailyMetricsTimeSeriesResponse",
  }) as any as Schema.Schema<GetDailyMetricsTimeSeriesResponse>;

export interface FetchMultiDailyMetricsTimeSeriesResponse {
  /** DailyMetrics and their corresponding time series. */
  multiDailyMetricTimeSeries?: Array<MultiDailyMetricTimeSeries>;
}

export const FetchMultiDailyMetricsTimeSeriesResponse: Schema.Schema<FetchMultiDailyMetricsTimeSeriesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      multiDailyMetricTimeSeries: Schema.optional(
        Schema.Array(MultiDailyMetricTimeSeries),
      ),
    }),
  ).annotate({
    identifier: "FetchMultiDailyMetricsTimeSeriesResponse",
  }) as any as Schema.Schema<FetchMultiDailyMetricsTimeSeriesResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface FetchMultiDailyMetricsTimeSeriesLocationsRequest {
  /** Required. The metrics to retrieve time series for. */
  dailyMetrics?:
    | "DAILY_METRIC_UNKNOWN"
    | "BUSINESS_IMPRESSIONS_DESKTOP_MAPS"
    | "BUSINESS_IMPRESSIONS_DESKTOP_SEARCH"
    | "BUSINESS_IMPRESSIONS_MOBILE_MAPS"
    | "BUSINESS_IMPRESSIONS_MOBILE_SEARCH"
    | "BUSINESS_CONVERSATIONS"
    | "BUSINESS_DIRECTION_REQUESTS"
    | "CALL_CLICKS"
    | "WEBSITE_CLICKS"
    | "BUSINESS_BOOKINGS"
    | "BUSINESS_FOOD_ORDERS"
    | "BUSINESS_FOOD_MENU_CLICKS"
    | (string & {})[];
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  "dailyRange.endDate.year"?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  "dailyRange.startDate.month"?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  "dailyRange.endDate.day"?: number;
  /** Required. The location for which the time series should be fetched. Format: locations/{location_id} where location_id is an unobfuscated listing id. */
  location: string;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  "dailyRange.startDate.day"?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  "dailyRange.endDate.month"?: number;
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  "dailyRange.startDate.year"?: number;
}

export const FetchMultiDailyMetricsTimeSeriesLocationsRequest = Schema.Struct({
  dailyMetrics: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("dailyMetrics"),
  ),
  "dailyRange.endDate.year": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("dailyRange.endDate.year"),
  ),
  "dailyRange.startDate.month": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("dailyRange.startDate.month"),
  ),
  "dailyRange.endDate.day": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("dailyRange.endDate.day"),
  ),
  location: Schema.String.pipe(T.HttpPath("location")),
  "dailyRange.startDate.day": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("dailyRange.startDate.day"),
  ),
  "dailyRange.endDate.month": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("dailyRange.endDate.month"),
  ),
  "dailyRange.startDate.year": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("dailyRange.startDate.year"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/locations/{locationsId}:fetchMultiDailyMetricsTimeSeries",
  }),
  svc,
) as unknown as Schema.Schema<FetchMultiDailyMetricsTimeSeriesLocationsRequest>;

export type FetchMultiDailyMetricsTimeSeriesLocationsResponse =
  FetchMultiDailyMetricsTimeSeriesResponse;
export const FetchMultiDailyMetricsTimeSeriesLocationsResponse =
  FetchMultiDailyMetricsTimeSeriesResponse;

export type FetchMultiDailyMetricsTimeSeriesLocationsError = DefaultErrors;

/** Returns the values for each date from a given time range and optionally the sub entity type, where applicable, that are associated with the specific daily metrics. Example request: `GET https://businessprofileperformance.googleapis.com/v1/locations/12345:fetchMultiDailyMetricsTimeSeries?dailyMetrics=WEBSITE_CLICKS&dailyMetrics=CALL_CLICKS&daily_range.start_date.year=2022&daily_range.start_date.month=1&daily_range.start_date.day=1&daily_range.end_date.year=2022&daily_range.end_date.month=3&daily_range.end_date.day=31` */
export const fetchMultiDailyMetricsTimeSeriesLocations: API.OperationMethod<
  FetchMultiDailyMetricsTimeSeriesLocationsRequest,
  FetchMultiDailyMetricsTimeSeriesLocationsResponse,
  FetchMultiDailyMetricsTimeSeriesLocationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: FetchMultiDailyMetricsTimeSeriesLocationsRequest,
  output: FetchMultiDailyMetricsTimeSeriesLocationsResponse,
  errors: [],
}));

export interface GetDailyMetricsTimeSeriesLocationsRequest {
  /** Required. The metric to retrieve time series. */
  dailyMetric?:
    | "DAILY_METRIC_UNKNOWN"
    | "BUSINESS_IMPRESSIONS_DESKTOP_MAPS"
    | "BUSINESS_IMPRESSIONS_DESKTOP_SEARCH"
    | "BUSINESS_IMPRESSIONS_MOBILE_MAPS"
    | "BUSINESS_IMPRESSIONS_MOBILE_SEARCH"
    | "BUSINESS_CONVERSATIONS"
    | "BUSINESS_DIRECTION_REQUESTS"
    | "CALL_CLICKS"
    | "WEBSITE_CLICKS"
    | "BUSINESS_BOOKINGS"
    | "BUSINESS_FOOD_ORDERS"
    | "BUSINESS_FOOD_MENU_CLICKS"
    | (string & {});
  /** Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. */
  "dailySubEntityType.timeOfDay.seconds"?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  "dailyRange.startDate.month"?: number;
  /** Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. */
  "dailySubEntityType.timeOfDay.hours"?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  "dailyRange.endDate.day"?: number;
  /** Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. */
  "dailySubEntityType.timeOfDay.nanos"?: number;
  /** Represents the day of the week. Eg: MONDAY. Currently supported DailyMetrics = NONE. */
  "dailySubEntityType.dayOfWeek"?:
    | "DAY_OF_WEEK_UNSPECIFIED"
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY"
    | (string & {});
  /** Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. */
  "dailySubEntityType.timeOfDay.minutes"?: number;
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  "dailyRange.startDate.year"?: number;
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  "dailyRange.endDate.year"?: number;
  /** Required. The location for which the time series should be fetched. Format: locations/{location_id} where location_id is an unobfuscated listing id. */
  name: string;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  "dailyRange.startDate.day"?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  "dailyRange.endDate.month"?: number;
}

export const GetDailyMetricsTimeSeriesLocationsRequest = Schema.Struct({
  dailyMetric: Schema.optional(Schema.String).pipe(T.HttpQuery("dailyMetric")),
  "dailySubEntityType.timeOfDay.seconds": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("dailySubEntityType.timeOfDay.seconds"),
  ),
  "dailyRange.startDate.month": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("dailyRange.startDate.month"),
  ),
  "dailySubEntityType.timeOfDay.hours": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("dailySubEntityType.timeOfDay.hours"),
  ),
  "dailyRange.endDate.day": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("dailyRange.endDate.day"),
  ),
  "dailySubEntityType.timeOfDay.nanos": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("dailySubEntityType.timeOfDay.nanos"),
  ),
  "dailySubEntityType.dayOfWeek": Schema.optional(Schema.String).pipe(
    T.HttpQuery("dailySubEntityType.dayOfWeek"),
  ),
  "dailySubEntityType.timeOfDay.minutes": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("dailySubEntityType.timeOfDay.minutes"),
  ),
  "dailyRange.startDate.year": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("dailyRange.startDate.year"),
  ),
  "dailyRange.endDate.year": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("dailyRange.endDate.year"),
  ),
  name: Schema.String.pipe(T.HttpPath("name")),
  "dailyRange.startDate.day": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("dailyRange.startDate.day"),
  ),
  "dailyRange.endDate.month": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("dailyRange.endDate.month"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/locations/{locationsId}:getDailyMetricsTimeSeries",
  }),
  svc,
) as unknown as Schema.Schema<GetDailyMetricsTimeSeriesLocationsRequest>;

export type GetDailyMetricsTimeSeriesLocationsResponse =
  GetDailyMetricsTimeSeriesResponse;
export const GetDailyMetricsTimeSeriesLocationsResponse =
  GetDailyMetricsTimeSeriesResponse;

export type GetDailyMetricsTimeSeriesLocationsError = DefaultErrors;

/** Returns the values for each date from a given time range that are associated with the specific daily metric. Example request: `GET https://businessprofileperformance.googleapis.com/v1/locations/12345:getDailyMetricsTimeSeries?dailyMetric=WEBSITE_CLICKS&daily_range.start_date.year=2022&daily_range.start_date.month=1&daily_range.start_date.day=1&daily_range.end_date.year=2022&daily_range.end_date.month=3&daily_range.end_date.day=31` */
export const getDailyMetricsTimeSeriesLocations: API.OperationMethod<
  GetDailyMetricsTimeSeriesLocationsRequest,
  GetDailyMetricsTimeSeriesLocationsResponse,
  GetDailyMetricsTimeSeriesLocationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetDailyMetricsTimeSeriesLocationsRequest,
  output: GetDailyMetricsTimeSeriesLocationsResponse,
  errors: [],
}));

export interface ListLocationsSearchkeywordsImpressionsMonthlyRequest {
  /** Optional. A token indicating the next paginated result to be returned. */
  pageToken?: string;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  "monthlyRange.endMonth.month"?: number;
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  "monthlyRange.startMonth.year"?: number;
  /** Optional. The number of results requested. The default page size is 100. Page size can be set to a maximum of 100. */
  pageSize?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  "monthlyRange.endMonth.day"?: number;
  /** Required. The location for which the time series should be fetched. Format: locations/{location_id} where location_id is an unobfuscated listing id. */
  parent: string;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  "monthlyRange.startMonth.month"?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  "monthlyRange.startMonth.day"?: number;
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  "monthlyRange.endMonth.year"?: number;
}

export const ListLocationsSearchkeywordsImpressionsMonthlyRequest =
  Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    "monthlyRange.endMonth.month": Schema.optional(Schema.Number).pipe(
      T.HttpQuery("monthlyRange.endMonth.month"),
    ),
    "monthlyRange.startMonth.year": Schema.optional(Schema.Number).pipe(
      T.HttpQuery("monthlyRange.startMonth.year"),
    ),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    "monthlyRange.endMonth.day": Schema.optional(Schema.Number).pipe(
      T.HttpQuery("monthlyRange.endMonth.day"),
    ),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    "monthlyRange.startMonth.month": Schema.optional(Schema.Number).pipe(
      T.HttpQuery("monthlyRange.startMonth.month"),
    ),
    "monthlyRange.startMonth.day": Schema.optional(Schema.Number).pipe(
      T.HttpQuery("monthlyRange.startMonth.day"),
    ),
    "monthlyRange.endMonth.year": Schema.optional(Schema.Number).pipe(
      T.HttpQuery("monthlyRange.endMonth.year"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/locations/{locationsId}/searchkeywords/impressions/monthly",
    }),
    svc,
  ) as unknown as Schema.Schema<ListLocationsSearchkeywordsImpressionsMonthlyRequest>;

export type ListLocationsSearchkeywordsImpressionsMonthlyResponse =
  ListSearchKeywordImpressionsMonthlyResponse;
export const ListLocationsSearchkeywordsImpressionsMonthlyResponse =
  ListSearchKeywordImpressionsMonthlyResponse;

export type ListLocationsSearchkeywordsImpressionsMonthlyError = DefaultErrors;

/** Returns the search keywords used to find a business in search or maps. Each search keyword is accompanied by impressions which are aggregated on a monthly basis. Example request: `GET https://businessprofileperformance.googleapis.com/v1/locations/12345/searchkeywords/impressions/monthly?monthly_range.start_month.year=2022&monthly_range.start_month.month=1&monthly_range.end_month.year=2022&monthly_range.end_month.month=3` */
export const listLocationsSearchkeywordsImpressionsMonthly: API.PaginatedOperationMethod<
  ListLocationsSearchkeywordsImpressionsMonthlyRequest,
  ListLocationsSearchkeywordsImpressionsMonthlyResponse,
  ListLocationsSearchkeywordsImpressionsMonthlyError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListLocationsSearchkeywordsImpressionsMonthlyRequest,
  output: ListLocationsSearchkeywordsImpressionsMonthlyResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));
