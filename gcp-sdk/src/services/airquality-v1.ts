// ==========================================================================
// Air Quality API (airquality v1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import * as C from "../category";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "airquality",
  version: "v1",
  rootUrl: "https://airquality.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Interval {
  /** Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end. */
  endTime?: string;
  /** Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start. */
  startTime?: string;
}

export const Interval: Schema.Schema<Interval> = Schema.suspend(() =>
  Schema.Struct({
    endTime: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Interval" }) as any as Schema.Schema<Interval>;

export interface LatLng {
  /** The latitude in degrees. It must be in the range [-90.0, +90.0]. */
  latitude?: number;
  /** The longitude in degrees. It must be in the range [-180.0, +180.0]. */
  longitude?: number;
}

export const LatLng: Schema.Schema<LatLng> = Schema.suspend(() =>
  Schema.Struct({
    latitude: Schema.optional(Schema.Number),
    longitude: Schema.optional(Schema.Number),
  }),
).annotate({ identifier: "LatLng" }) as any as Schema.Schema<LatLng>;

export interface CustomLocalAqi {
  /** The country/region requiring the custom AQI. Value should be provided using [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code. */
  regionCode?: string;
  /** The AQI to associate the country/region with. Value should be a [valid index](/maps/documentation/air-quality/laqis) code. */
  aqi?: string;
}

export const CustomLocalAqi: Schema.Schema<CustomLocalAqi> = Schema.suspend(
  () =>
    Schema.Struct({
      regionCode: Schema.optional(Schema.String),
      aqi: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "CustomLocalAqi",
}) as any as Schema.Schema<CustomLocalAqi>;

export interface LookupHistoryRequest {
  /** Optional. A page token received from a previous history call. It is used to retrieve the subsequent page. Note that when providing a value for this parameter all other parameters provided must match the call that provided the page token (the previous call). */
  pageToken?: string;
  /** Optional. The maximum number of hourly info records to return per page. The default is 72 and the max value is 168 (7 days of data). */
  pageSize?: number;
  /** Indicates the start and end period for which to get the historical data. The timestamp is rounded to the previous exact hour. */
  period?: Interval;
  /** Optional. If set to true, the Universal AQI will be included in the 'indexes' field of the response. Default value is true. */
  universalAqi?: boolean;
  /** Required. The latitude and longitude for which the API looks for air quality history data. */
  location?: LatLng;
  /** A timestamp for which to return historical data. The timestamp is rounded to the previous exact hour. Note: this will return hourly data for the requested timestamp only (i.e. a single hourly info element). For example, a request sent where the dateTime parameter is set to 2023-01-03T11:05:49Z will be rounded down to 2023-01-03T11:00:00Z. A timestamp in RFC3339 UTC "Zulu" format, with nanosecond resolution and up to nine fractional digits. Examples: "2014-10-02T15:01:23Z" and "2014-10-02T15:01:23.045123456Z". */
  dateTime?: string;
  /** Optional. Additional features that can be optionally enabled. Specifying extra computations will result in the relevant elements and fields to be returned in the response. */
  extraComputations?: Array<
    | "EXTRA_COMPUTATION_UNSPECIFIED"
    | "LOCAL_AQI"
    | "HEALTH_RECOMMENDATIONS"
    | "POLLUTANT_ADDITIONAL_INFO"
    | "DOMINANT_POLLUTANT_CONCENTRATION"
    | "POLLUTANT_CONCENTRATION"
    | (string & {})
  >;
  /** Optional. Determines the color palette used for data provided by the 'Universal Air Quality Index' (UAQI). This color palette is relevant just for UAQI, other AQIs have a predetermined color palette that can't be controlled. */
  uaqiColorPalette?:
    | "COLOR_PALETTE_UNSPECIFIED"
    | "RED_GREEN"
    | "INDIGO_PERSIAN_DARK"
    | "INDIGO_PERSIAN_LIGHT"
    | (string & {});
  /** Number from 1 to 720 that indicates the hours range for the request. For example: A value of 48 will yield data from the last 48 hours. */
  hours?: number;
  /** Optional. Expresses a 'country/region to AQI' relationship. Pairs a country/region with a desired AQI so that air quality data that is required for that country/region will be displayed according to the chosen AQI. This parameter can be used to specify a non-default AQI for a given country, for example, to get the US EPA index for Canada rather than the default index for Canada. */
  customLocalAqis?: Array<CustomLocalAqi>;
  /** Optional. Allows the client to choose the language for the response. If data cannot be provided for that language the API uses the closest match. Allowed values rely on the IETF standard. Default value is en. */
  languageCode?: string;
}

export const LookupHistoryRequest: Schema.Schema<LookupHistoryRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      pageToken: Schema.optional(Schema.String),
      pageSize: Schema.optional(Schema.Number),
      period: Schema.optional(Interval),
      universalAqi: Schema.optional(Schema.Boolean),
      location: Schema.optional(LatLng),
      dateTime: Schema.optional(Schema.String),
      extraComputations: Schema.optional(Schema.Array(Schema.String)),
      uaqiColorPalette: Schema.optional(Schema.String),
      hours: Schema.optional(Schema.Number),
      customLocalAqis: Schema.optional(Schema.Array(CustomLocalAqi)),
      languageCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LookupHistoryRequest",
  }) as any as Schema.Schema<LookupHistoryRequest>;

export interface Concentration {
  /** Units for measuring this pollutant concentration. */
  units?:
    | "UNIT_UNSPECIFIED"
    | "PARTS_PER_BILLION"
    | "MICROGRAMS_PER_CUBIC_METER"
    | (string & {});
  /** Value of the pollutant concentration. */
  value?: number;
}

export const Concentration: Schema.Schema<Concentration> = Schema.suspend(() =>
  Schema.Struct({
    units: Schema.optional(Schema.String),
    value: Schema.optional(Schema.Number),
  }),
).annotate({
  identifier: "Concentration",
}) as any as Schema.Schema<Concentration>;

export interface Color {
  /** The amount of red in the color as a value in the interval [0, 1]. */
  red?: number;
  /** The amount of blue in the color as a value in the interval [0, 1]. */
  blue?: number;
  /** The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0). */
  alpha?: number;
  /** The amount of green in the color as a value in the interval [0, 1]. */
  green?: number;
}

export const Color: Schema.Schema<Color> = Schema.suspend(() =>
  Schema.Struct({
    red: Schema.optional(Schema.Number),
    blue: Schema.optional(Schema.Number),
    alpha: Schema.optional(Schema.Number),
    green: Schema.optional(Schema.Number),
  }),
).annotate({ identifier: "Color" }) as any as Schema.Schema<Color>;

export interface AirQualityIndex {
  /** The chemical symbol of the dominant pollutant. For example: "CO". */
  dominantPollutant?: string;
  /** The index's numeric score. Examples: 10, 100. The value is not normalized and should only be interpreted in the context of its related air-quality index. For non-numeric indexes, this field will not be returned. Note: This field should be used for calculations, graph display, etc. For displaying the index score, you should use the AQI display field. */
  aqi?: number;
  /** The color used to represent the AQI numeric score. */
  color?: Color;
  /** The index's code. This field represents the index for programming purposes by using snake case instead of spaces. Examples: "uaqi", "fra_atmo". */
  code?: string;
  /** Textual representation of the index numeric score, that may include prefix or suffix symbols, which usually represents the worst index score. Example: >100 or 10+. Note: This field should be used when you want to display the index score. For non-numeric indexes, this field is empty. */
  aqiDisplay?: string;
  /** A human readable representation of the index name. Example: "AQI (US)" */
  displayName?: string;
  /** Textual classification of the index numeric score interpretation. For example: "Excellent air quality". */
  category?: string;
}

export const AirQualityIndex: Schema.Schema<AirQualityIndex> = Schema.suspend(
  () =>
    Schema.Struct({
      dominantPollutant: Schema.optional(Schema.String),
      aqi: Schema.optional(Schema.Number),
      color: Schema.optional(Color),
      code: Schema.optional(Schema.String),
      aqiDisplay: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      category: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "AirQualityIndex",
}) as any as Schema.Schema<AirQualityIndex>;

export interface HealthRecommendations {
  /** Respiratory related problems and asthma suffers. */
  lungDiseasePopulation?: string;
  /** No specific sensitivities. */
  generalPopulation?: string;
  /** Heart and circulatory system diseases. */
  heartDiseasePopulation?: string;
  /** Younger populations including children, toddlers, and babies. */
  children?: string;
  /** Sports and other strenuous outdoor activities. */
  athletes?: string;
  /** Women at all stages of pregnancy. */
  pregnantWomen?: string;
  /** Retirees and people older than the general population. */
  elderly?: string;
}

export const HealthRecommendations: Schema.Schema<HealthRecommendations> =
  Schema.suspend(() =>
    Schema.Struct({
      lungDiseasePopulation: Schema.optional(Schema.String),
      generalPopulation: Schema.optional(Schema.String),
      heartDiseasePopulation: Schema.optional(Schema.String),
      children: Schema.optional(Schema.String),
      athletes: Schema.optional(Schema.String),
      pregnantWomen: Schema.optional(Schema.String),
      elderly: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "HealthRecommendations",
  }) as any as Schema.Schema<HealthRecommendations>;

export interface AdditionalInfo {
  /** Text representing the pollutant's main health effects. */
  effects?: string;
  /** Text representing the pollutant's main emission sources. */
  sources?: string;
}

export const AdditionalInfo: Schema.Schema<AdditionalInfo> = Schema.suspend(
  () =>
    Schema.Struct({
      effects: Schema.optional(Schema.String),
      sources: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "AdditionalInfo",
}) as any as Schema.Schema<AdditionalInfo>;

export interface Pollutant {
  /** The pollutant's full name. For chemical compounds, this is the IUPAC name. Example: "Sulfur Dioxide". For more information about the IUPAC names table, see https://iupac.org/what-we-do/periodic-table-of-elements/. */
  fullName?: string;
  /** The pollutant's display name. For example: "NOx". */
  displayName?: string;
  /** The pollutant's code name (for example, "so2"). For a list of supported pollutant codes, see [Reported pollutants](/maps/documentation/air-quality/pollutants#reported_pollutants). */
  code?: string;
  /** Additional information about the pollutant. */
  additionalInfo?: AdditionalInfo;
  /** The pollutant's concentration level measured by one of the standard air pollutation measure units. */
  concentration?: Concentration;
}

export const Pollutant: Schema.Schema<Pollutant> = Schema.suspend(() =>
  Schema.Struct({
    fullName: Schema.optional(Schema.String),
    displayName: Schema.optional(Schema.String),
    code: Schema.optional(Schema.String),
    additionalInfo: Schema.optional(AdditionalInfo),
    concentration: Schema.optional(Concentration),
  }),
).annotate({ identifier: "Pollutant" }) as any as Schema.Schema<Pollutant>;

export interface LookupCurrentConditionsResponse {
  /** A rounded down timestamp in RFC3339 UTC "Zulu" format, with nanosecond resolution and up to nine fractional digits. For example: "2014-10-02T15:00:00Z". */
  dateTime?: string;
  /** Based on the request parameters, this list will include (up to) two air quality indexes: - Universal AQI. Will be returned if the universalAqi boolean is set to true. - Local AQI. Will be returned if the LOCAL_AQI extra computation is specified. */
  indexes?: Array<AirQualityIndex>;
  /** The ISO_3166-1 alpha-2 code of the country/region corresponding to the location provided in the request. This field might be omitted from the response if the location provided in the request resides in a disputed territory. */
  regionCode?: string;
  /** Health advice and recommended actions related to the reported air quality conditions. Recommendations are tailored differently for populations at risk, groups with greater sensitivities to pollutants, and the general population. */
  healthRecommendations?: HealthRecommendations;
  /** A list of pollutants affecting the location specified in the request. Note: This field will be returned only for requests that specified one or more of the following extra computations: POLLUTANT_ADDITIONAL_INFO, DOMINANT_POLLUTANT_CONCENTRATION, POLLUTANT_CONCENTRATION. */
  pollutants?: Array<Pollutant>;
}

export const LookupCurrentConditionsResponse: Schema.Schema<LookupCurrentConditionsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      dateTime: Schema.optional(Schema.String),
      indexes: Schema.optional(Schema.Array(AirQualityIndex)),
      regionCode: Schema.optional(Schema.String),
      healthRecommendations: Schema.optional(HealthRecommendations),
      pollutants: Schema.optional(Schema.Array(Pollutant)),
    }),
  ).annotate({
    identifier: "LookupCurrentConditionsResponse",
  }) as any as Schema.Schema<LookupCurrentConditionsResponse>;

export interface HourInfo {
  /** A list of pollutants affecting the location specified in the request. Note: This field will be returned only for requests that specified one or more of the following extra computations: POLLUTANT_ADDITIONAL_INFO, DOMINANT_POLLUTANT_CONCENTRATION, POLLUTANT_CONCENTRATION. */
  pollutants?: Array<Pollutant>;
  /** Based on the request parameters, this list will include (up to) two air quality indexes: - Universal AQI. Will be returned if the universalAqi boolean is set to true. - Local AQI. Will be returned if the LOCAL_AQI extra computation is specified. */
  indexes?: Array<AirQualityIndex>;
  /** Health advice and recommended actions related to the reported air quality conditions. Recommendations are tailored differently for populations at risk, groups with greater sensitivities to pollutants, and the general population. */
  healthRecommendations?: HealthRecommendations;
  /** A rounded down timestamp indicating the time the data refers to in RFC3339 UTC "Zulu" format, with nanosecond resolution and up to nine fractional digits. For example: "2014-10-02T15:00:00Z". */
  dateTime?: string;
}

export const HourInfo: Schema.Schema<HourInfo> = Schema.suspend(() =>
  Schema.Struct({
    pollutants: Schema.optional(Schema.Array(Pollutant)),
    indexes: Schema.optional(Schema.Array(AirQualityIndex)),
    healthRecommendations: Schema.optional(HealthRecommendations),
    dateTime: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "HourInfo" }) as any as Schema.Schema<HourInfo>;

export interface HourlyForecast {
  /** A list of pollutants affecting the location specified in the request. Note: This field will be returned only for requests that specified one or more of the following extra computations: POLLUTANT_ADDITIONAL_INFO, DOMINANT_POLLUTANT_CONCENTRATION, POLLUTANT_CONCENTRATION. */
  pollutants?: Array<Pollutant>;
  /** Based on the request parameters, this list will include (up to) two air quality indexes: - Universal AQI. Will be returned if the `universal_aqi` boolean is set to true. - Local AQI. Will be returned if the LOCAL_AQI extra computation is specified. */
  indexes?: Array<AirQualityIndex>;
  /** Health advice and recommended actions related to the reported air quality conditions. Recommendations are tailored differently for populations at risk, groups with greater sensitivities to pollutants, and the general population. */
  healthRecommendations?: HealthRecommendations;
  /** A rounded down timestamp indicating the time (hour) the data refers to in RFC3339 UTC "Zulu" format. For example: "2014-10-02T15:00:00Z". */
  dateTime?: string;
}

export const HourlyForecast: Schema.Schema<HourlyForecast> = Schema.suspend(
  () =>
    Schema.Struct({
      pollutants: Schema.optional(Schema.Array(Pollutant)),
      indexes: Schema.optional(Schema.Array(AirQualityIndex)),
      healthRecommendations: Schema.optional(HealthRecommendations),
      dateTime: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "HourlyForecast",
}) as any as Schema.Schema<HourlyForecast>;

export interface LookupHistoryResponse {
  /** Optional. Contains the air quality information for each hour in the requested range. For example, if the request is for 48 hours of history there will be 48 elements of hourly info. */
  hoursInfo?: Array<HourInfo>;
  /** Optional. The token to retrieve the next page. */
  nextPageToken?: string;
  /** Optional. The ISO_3166-1 alpha-2 code of the country/region corresponding to the location provided in the request. This field might be omitted from the response if the location provided in the request resides in a disputed territory. */
  regionCode?: string;
}

export const LookupHistoryResponse: Schema.Schema<LookupHistoryResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      hoursInfo: Schema.optional(Schema.Array(HourInfo)),
      nextPageToken: Schema.optional(Schema.String),
      regionCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LookupHistoryResponse",
  }) as any as Schema.Schema<LookupHistoryResponse>;

export interface LookupCurrentConditionsRequest {
  /** Optional. Determines the color palette used for data provided by the 'Universal Air Quality Index' (UAQI). This color palette is relevant just for UAQI, other AQIs have a predetermined color palette that can't be controlled. */
  uaqiColorPalette?:
    | "COLOR_PALETTE_UNSPECIFIED"
    | "RED_GREEN"
    | "INDIGO_PERSIAN_DARK"
    | "INDIGO_PERSIAN_LIGHT"
    | (string & {});
  /** Optional. Expresses a 'country/region to AQI' relationship. Pairs a country/region with a desired AQI so that air quality data that is required for that country/region will be displayed according to the chosen AQI. This parameter can be used to specify a non-default AQI for a given country, for example, to get the US EPA index for Canada rather than the default index for Canada. */
  customLocalAqis?: Array<CustomLocalAqi>;
  /** Optional. Allows the client to choose the language for the response. If data cannot be provided for that language the API uses the closest match. Allowed values rely on the IETF standard. Default value is en. */
  languageCode?: string;
  /** Optional. If set to true, the Universal AQI will be included in the 'indexes' field of the response. Default value is true. */
  universalAqi?: boolean;
  /** Required. The longitude and latitude from which the API looks for air quality current conditions data. */
  location?: LatLng;
  /** Optional. Additional features that can be optionally enabled. Specifying extra computations will result in the relevant elements and fields to be returned in the response. */
  extraComputations?: Array<
    | "EXTRA_COMPUTATION_UNSPECIFIED"
    | "LOCAL_AQI"
    | "HEALTH_RECOMMENDATIONS"
    | "POLLUTANT_ADDITIONAL_INFO"
    | "DOMINANT_POLLUTANT_CONCENTRATION"
    | "POLLUTANT_CONCENTRATION"
    | (string & {})
  >;
}

export const LookupCurrentConditionsRequest: Schema.Schema<LookupCurrentConditionsRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      uaqiColorPalette: Schema.optional(Schema.String),
      customLocalAqis: Schema.optional(Schema.Array(CustomLocalAqi)),
      languageCode: Schema.optional(Schema.String),
      universalAqi: Schema.optional(Schema.Boolean),
      location: Schema.optional(LatLng),
      extraComputations: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "LookupCurrentConditionsRequest",
  }) as any as Schema.Schema<LookupCurrentConditionsRequest>;

export interface LookupForecastRequest {
  /** Optional. Allows the client to choose the language for the response. If data cannot be provided for that language the API uses the closest match. Allowed values rely on the IETF standard (default = 'en'). */
  languageCode?: string;
  /** Optional. Determines the color palette used for data provided by the 'Universal Air Quality Index' (UAQI). This color palette is relevant just for UAQI, other AQIs have a predetermined color palette that can't be controlled. */
  uaqiColorPalette?:
    | "COLOR_PALETTE_UNSPECIFIED"
    | "RED_GREEN"
    | "INDIGO_PERSIAN_DARK"
    | "INDIGO_PERSIAN_LIGHT"
    | (string & {});
  /** Optional. Expresses a 'country/region to AQI' relationship. Pairs a country/region with a desired AQI so that air quality data that is required for that country/region will be displayed according to the chosen AQI. This parameter can be used to specify a non-default AQI for a given country, for example, to get the US EPA index for Canada rather than the default index for Canada. */
  customLocalAqis?: Array<CustomLocalAqi>;
  /** Optional. If set to true, the Universal AQI will be included in the 'indexes' field of the response (default = true). */
  universalAqi?: boolean;
  /** Required. The latitude and longitude for which the API looks for air quality data. */
  location?: LatLng;
  /** A timestamp for which to return the data for a specific point in time. The timestamp is rounded to the previous exact hour. Note: this will return hourly data for the requested timestamp only (i.e. a single hourly info element). For example, a request sent where the date_time parameter is set to 2023-01-03T11:05:49Z will be rounded down to 2023-01-03T11:00:00Z. */
  dateTime?: string;
  /** Optional. Additional features that can be optionally enabled. Specifying extra computations will result in the relevant elements and fields to be returned in the response. */
  extraComputations?: Array<
    | "EXTRA_COMPUTATION_UNSPECIFIED"
    | "LOCAL_AQI"
    | "HEALTH_RECOMMENDATIONS"
    | "POLLUTANT_ADDITIONAL_INFO"
    | "DOMINANT_POLLUTANT_CONCENTRATION"
    | "POLLUTANT_CONCENTRATION"
    | (string & {})
  >;
  /** Optional. A page token received from a previous forecast call. It is used to retrieve the subsequent page. */
  pageToken?: string;
  /** Indicates the start and end period for which to get the forecast data. The timestamp is rounded to the previous exact hour. */
  period?: Interval;
  /** Optional. The maximum number of hourly info records to return per page (default = 24). */
  pageSize?: number;
}

export const LookupForecastRequest: Schema.Schema<LookupForecastRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      languageCode: Schema.optional(Schema.String),
      uaqiColorPalette: Schema.optional(Schema.String),
      customLocalAqis: Schema.optional(Schema.Array(CustomLocalAqi)),
      universalAqi: Schema.optional(Schema.Boolean),
      location: Schema.optional(LatLng),
      dateTime: Schema.optional(Schema.String),
      extraComputations: Schema.optional(Schema.Array(Schema.String)),
      pageToken: Schema.optional(Schema.String),
      period: Schema.optional(Interval),
      pageSize: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "LookupForecastRequest",
  }) as any as Schema.Schema<LookupForecastRequest>;

export interface HttpBody {
  /** The HTTP request/response body as raw binary. */
  data?: string;
  /** Application specific response metadata. Must be set in the first response for streaming APIs. */
  extensions?: Array<Record<string, unknown>>;
  /** The HTTP Content-Type header value specifying the content type of the body. */
  contentType?: string;
}

export const HttpBody: Schema.Schema<HttpBody> = Schema.suspend(() =>
  Schema.Struct({
    data: Schema.optional(Schema.String),
    extensions: Schema.optional(
      Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
    ),
    contentType: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "HttpBody" }) as any as Schema.Schema<HttpBody>;

export interface LookupForecastResponse {
  /** Optional. The token to retrieve the next page. */
  nextPageToken?: string;
  /** Optional. Contains the air quality information for each hour in the requested range. For example, if the request is for 48 hours of forecast there will be 48 elements of hourly forecasts. */
  hourlyForecasts?: Array<HourlyForecast>;
  /** Optional. The ISO_3166-1 alpha-2 code of the country/region corresponding to the location provided in the request. This field might be omitted from the response if the location provided in the request resides in a disputed territory. */
  regionCode?: string;
}

export const LookupForecastResponse: Schema.Schema<LookupForecastResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      hourlyForecasts: Schema.optional(Schema.Array(HourlyForecast)),
      regionCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LookupForecastResponse",
  }) as any as Schema.Schema<LookupForecastResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface LookupForecastRequest_Op {
  /** Request body */
  body?: LookupForecastRequest;
}

export const LookupForecastRequest_Op = Schema.Struct({
  body: Schema.optional(LookupForecastRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/forecast:lookup", hasBody: true }),
  svc,
) as unknown as Schema.Schema<LookupForecastRequest_Op>;

export type LookupForecastResponse_Op = LookupForecastResponse;
export const LookupForecastResponse_Op = LookupForecastResponse;

export type LookupForecastError = DefaultErrors;

/** Returns air quality forecast for a specific location for a given time range. */
export const lookupForecast: API.OperationMethod<
  LookupForecastRequest_Op,
  LookupForecastResponse_Op,
  LookupForecastError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: LookupForecastRequest_Op,
  output: LookupForecastResponse_Op,
  errors: [],
}));

export interface LookupCurrentConditionsRequest_Op {
  /** Request body */
  body?: LookupCurrentConditionsRequest;
}

export const LookupCurrentConditionsRequest_Op = Schema.Struct({
  body: Schema.optional(LookupCurrentConditionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/currentConditions:lookup",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<LookupCurrentConditionsRequest_Op>;

export type LookupCurrentConditionsResponse_Op =
  LookupCurrentConditionsResponse;
export const LookupCurrentConditionsResponse_Op =
  LookupCurrentConditionsResponse;

export type LookupCurrentConditionsError = DefaultErrors;

/** The Current Conditions endpoint provides hourly air quality information in more than 100 countries, up to a 500 x 500 meters resolution. Includes over 70 local indexes and global air quality index and categories. */
export const lookupCurrentConditions: API.OperationMethod<
  LookupCurrentConditionsRequest_Op,
  LookupCurrentConditionsResponse_Op,
  LookupCurrentConditionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: LookupCurrentConditionsRequest_Op,
  output: LookupCurrentConditionsResponse_Op,
  errors: [],
}));

export interface LookupHistoryRequest_Op {
  /** Request body */
  body?: LookupHistoryRequest;
}

export const LookupHistoryRequest_Op = Schema.Struct({
  body: Schema.optional(LookupHistoryRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/history:lookup", hasBody: true }),
  svc,
) as unknown as Schema.Schema<LookupHistoryRequest_Op>;

export type LookupHistoryResponse_Op = LookupHistoryResponse;
export const LookupHistoryResponse_Op = LookupHistoryResponse;

export type LookupHistoryError = DefaultErrors;

/** Returns air quality history for a specific location for a given time range. */
export const lookupHistory: API.OperationMethod<
  LookupHistoryRequest_Op,
  LookupHistoryResponse_Op,
  LookupHistoryError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: LookupHistoryRequest_Op,
  output: LookupHistoryResponse_Op,
  errors: [],
}));

export interface LookupHeatmapTileMapTypesHeatmapTilesRequest {
  /** Required. Defines the north-south point in the requested tile. */
  y: number;
  /** Required. The type of the air quality heatmap. Defines the pollutant that the map will graphically represent. Allowed values: - UAQI_RED_GREEN (UAQI, red-green palette) - UAQI_INDIGO_PERSIAN (UAQI, indigo-persian palette) - PM25_INDIGO_PERSIAN - GBR_DEFRA - DEU_UBA - CAN_EC - FRA_ATMO - US_AQI */
  mapType:
    | "MAP_TYPE_UNSPECIFIED"
    | "UAQI_RED_GREEN"
    | "UAQI_INDIGO_PERSIAN"
    | "PM25_INDIGO_PERSIAN"
    | "GBR_DEFRA"
    | "DEU_UBA"
    | "CAN_EC"
    | "FRA_ATMO"
    | "US_AQI"
    | (string & {});
  /** Required. The map's zoom level. Defines how large or small the contents of a map appear in a map view. Zoom level 0 is the entire world in a single tile. Zoom level 1 is the entire world in 4 tiles. Zoom level 2 is the entire world in 16 tiles. Zoom level 16 is the entire world in 65,536 tiles. Allowed values: 0-16 */
  zoom: number;
  /** Required. Defines the east-west point in the requested tile. */
  x: number;
}

export const LookupHeatmapTileMapTypesHeatmapTilesRequest = Schema.Struct({
  y: Schema.Number.pipe(T.HttpPath("y")),
  mapType: Schema.String.pipe(T.HttpPath("mapType")),
  zoom: Schema.Number.pipe(T.HttpPath("zoom")),
  x: Schema.Number.pipe(T.HttpPath("x")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/mapTypes/{mapType}/heatmapTiles/{zoom}/{x}/{y}",
  }),
  svc,
) as unknown as Schema.Schema<LookupHeatmapTileMapTypesHeatmapTilesRequest>;

export type LookupHeatmapTileMapTypesHeatmapTilesResponse = HttpBody;
export const LookupHeatmapTileMapTypesHeatmapTilesResponse = HttpBody;

export type LookupHeatmapTileMapTypesHeatmapTilesError = DefaultErrors;

/** Returns a bytes array containing the data of the tile PNG image. */
export const lookupHeatmapTileMapTypesHeatmapTiles: API.OperationMethod<
  LookupHeatmapTileMapTypesHeatmapTilesRequest,
  LookupHeatmapTileMapTypesHeatmapTilesResponse,
  LookupHeatmapTileMapTypesHeatmapTilesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: LookupHeatmapTileMapTypesHeatmapTilesRequest,
  output: LookupHeatmapTileMapTypesHeatmapTilesResponse,
  errors: [],
}));
