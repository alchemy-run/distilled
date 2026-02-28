// ==========================================================================
// Air Quality API (airquality v1)
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
  name: "airquality",
  version: "v1",
  rootUrl: "https://airquality.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface LatLng {
  /** The latitude in degrees. It must be in the range [-90.0, +90.0]. */
  latitude?: number;
  /** The longitude in degrees. It must be in the range [-180.0, +180.0]. */
  longitude?: number;
}

export const LatLng: Schema.Schema<LatLng> = Schema.suspend(() => Schema.Struct({
  latitude: Schema.optional(Schema.Number),
  longitude: Schema.optional(Schema.Number),
})).annotate({ identifier: "LatLng" }) as any as Schema.Schema<LatLng>;

export interface CustomLocalAqi {
  /** The country/region requiring the custom AQI. Value should be provided using [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code. */
  regionCode?: string;
  /** The AQI to associate the country/region with. Value should be a [valid index](/maps/documentation/air-quality/laqis) code. */
  aqi?: string;
}

export const CustomLocalAqi: Schema.Schema<CustomLocalAqi> = Schema.suspend(() => Schema.Struct({
  regionCode: Schema.optional(Schema.String),
  aqi: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomLocalAqi" }) as any as Schema.Schema<CustomLocalAqi>;

export interface LookupCurrentConditionsRequest {
  /** Required. The longitude and latitude from which the API looks for air quality current conditions data. */
  location?: LatLng;
  /** Optional. If set to true, the Universal AQI will be included in the 'indexes' field of the response. Default value is true. */
  universalAqi?: boolean;
  /** Optional. Additional features that can be optionally enabled. Specifying extra computations will result in the relevant elements and fields to be returned in the response. */
  extraComputations?: Array<"EXTRA_COMPUTATION_UNSPECIFIED" | "LOCAL_AQI" | "HEALTH_RECOMMENDATIONS" | "POLLUTANT_ADDITIONAL_INFO" | "DOMINANT_POLLUTANT_CONCENTRATION" | "POLLUTANT_CONCENTRATION" | (string & {})>;
  /** Optional. Allows the client to choose the language for the response. If data cannot be provided for that language the API uses the closest match. Allowed values rely on the IETF standard. Default value is en. */
  languageCode?: string;
  /** Optional. Determines the color palette used for data provided by the 'Universal Air Quality Index' (UAQI). This color palette is relevant just for UAQI, other AQIs have a predetermined color palette that can't be controlled. */
  uaqiColorPalette?: "COLOR_PALETTE_UNSPECIFIED" | "RED_GREEN" | "INDIGO_PERSIAN_DARK" | "INDIGO_PERSIAN_LIGHT" | (string & {});
  /** Optional. Expresses a 'country/region to AQI' relationship. Pairs a country/region with a desired AQI so that air quality data that is required for that country/region will be displayed according to the chosen AQI. This parameter can be used to specify a non-default AQI for a given country, for example, to get the US EPA index for Canada rather than the default index for Canada. */
  customLocalAqis?: Array<CustomLocalAqi>;
}

export const LookupCurrentConditionsRequest: Schema.Schema<LookupCurrentConditionsRequest> = Schema.suspend(() => Schema.Struct({
  location: Schema.optional(LatLng),
  universalAqi: Schema.optional(Schema.Boolean),
  extraComputations: Schema.optional(Schema.Array(Schema.String)),
  languageCode: Schema.optional(Schema.String),
  uaqiColorPalette: Schema.optional(Schema.String),
  customLocalAqis: Schema.optional(Schema.Array(CustomLocalAqi)),
})).annotate({ identifier: "LookupCurrentConditionsRequest" }) as any as Schema.Schema<LookupCurrentConditionsRequest>;

export interface Color {
  /** The amount of red in the color as a value in the interval [0, 1]. */
  red?: number;
  /** The amount of green in the color as a value in the interval [0, 1]. */
  green?: number;
  /** The amount of blue in the color as a value in the interval [0, 1]. */
  blue?: number;
  /** The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0). */
  alpha?: number;
}

export const Color: Schema.Schema<Color> = Schema.suspend(() => Schema.Struct({
  red: Schema.optional(Schema.Number),
  green: Schema.optional(Schema.Number),
  blue: Schema.optional(Schema.Number),
  alpha: Schema.optional(Schema.Number),
})).annotate({ identifier: "Color" }) as any as Schema.Schema<Color>;

export interface AirQualityIndex {
  /** The index's code. This field represents the index for programming purposes by using snake case instead of spaces. Examples: "uaqi", "fra_atmo". */
  code?: string;
  /** A human readable representation of the index name. Example: "AQI (US)" */
  displayName?: string;
  /** The index's numeric score. Examples: 10, 100. The value is not normalized and should only be interpreted in the context of its related air-quality index. For non-numeric indexes, this field will not be returned. Note: This field should be used for calculations, graph display, etc. For displaying the index score, you should use the AQI display field. */
  aqi?: number;
  /** Textual representation of the index numeric score, that may include prefix or suffix symbols, which usually represents the worst index score. Example: >100 or 10+. Note: This field should be used when you want to display the index score. For non-numeric indexes, this field is empty. */
  aqiDisplay?: string;
  /** The color used to represent the AQI numeric score. */
  color?: Color;
  /** Textual classification of the index numeric score interpretation. For example: "Excellent air quality". */
  category?: string;
  /** The chemical symbol of the dominant pollutant. For example: "CO". */
  dominantPollutant?: string;
}

export const AirQualityIndex: Schema.Schema<AirQualityIndex> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  aqi: Schema.optional(Schema.Number),
  aqiDisplay: Schema.optional(Schema.String),
  color: Schema.optional(Color),
  category: Schema.optional(Schema.String),
  dominantPollutant: Schema.optional(Schema.String),
})).annotate({ identifier: "AirQualityIndex" }) as any as Schema.Schema<AirQualityIndex>;

export interface Concentration {
  /** Value of the pollutant concentration. */
  value?: number;
  /** Units for measuring this pollutant concentration. */
  units?: "UNIT_UNSPECIFIED" | "PARTS_PER_BILLION" | "MICROGRAMS_PER_CUBIC_METER" | (string & {});
}

export const Concentration: Schema.Schema<Concentration> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.Number),
  units: Schema.optional(Schema.String),
})).annotate({ identifier: "Concentration" }) as any as Schema.Schema<Concentration>;

export interface AdditionalInfo {
  /** Text representing the pollutant's main emission sources. */
  sources?: string;
  /** Text representing the pollutant's main health effects. */
  effects?: string;
}

export const AdditionalInfo: Schema.Schema<AdditionalInfo> = Schema.suspend(() => Schema.Struct({
  sources: Schema.optional(Schema.String),
  effects: Schema.optional(Schema.String),
})).annotate({ identifier: "AdditionalInfo" }) as any as Schema.Schema<AdditionalInfo>;

export interface Pollutant {
  /** The pollutant's code name (for example, "so2"). For a list of supported pollutant codes, see [Reported pollutants](/maps/documentation/air-quality/pollutants#reported_pollutants). */
  code?: string;
  /** The pollutant's display name. For example: "NOx". */
  displayName?: string;
  /** The pollutant's full name. For chemical compounds, this is the IUPAC name. Example: "Sulfur Dioxide". For more information about the IUPAC names table, see https://iupac.org/what-we-do/periodic-table-of-elements/. */
  fullName?: string;
  /** The pollutant's concentration level measured by one of the standard air pollutation measure units. */
  concentration?: Concentration;
  /** Additional information about the pollutant. */
  additionalInfo?: AdditionalInfo;
}

export const Pollutant: Schema.Schema<Pollutant> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  fullName: Schema.optional(Schema.String),
  concentration: Schema.optional(Concentration),
  additionalInfo: Schema.optional(AdditionalInfo),
})).annotate({ identifier: "Pollutant" }) as any as Schema.Schema<Pollutant>;

export interface HealthRecommendations {
  /** No specific sensitivities. */
  generalPopulation?: string;
  /** Retirees and people older than the general population. */
  elderly?: string;
  /** Respiratory related problems and asthma suffers. */
  lungDiseasePopulation?: string;
  /** Heart and circulatory system diseases. */
  heartDiseasePopulation?: string;
  /** Sports and other strenuous outdoor activities. */
  athletes?: string;
  /** Women at all stages of pregnancy. */
  pregnantWomen?: string;
  /** Younger populations including children, toddlers, and babies. */
  children?: string;
}

export const HealthRecommendations: Schema.Schema<HealthRecommendations> = Schema.suspend(() => Schema.Struct({
  generalPopulation: Schema.optional(Schema.String),
  elderly: Schema.optional(Schema.String),
  lungDiseasePopulation: Schema.optional(Schema.String),
  heartDiseasePopulation: Schema.optional(Schema.String),
  athletes: Schema.optional(Schema.String),
  pregnantWomen: Schema.optional(Schema.String),
  children: Schema.optional(Schema.String),
})).annotate({ identifier: "HealthRecommendations" }) as any as Schema.Schema<HealthRecommendations>;

export interface LookupCurrentConditionsResponse {
  /** A rounded down timestamp in RFC3339 UTC "Zulu" format, with nanosecond resolution and up to nine fractional digits. For example: "2014-10-02T15:00:00Z". */
  dateTime?: string;
  /** The ISO_3166-1 alpha-2 code of the country/region corresponding to the location provided in the request. This field might be omitted from the response if the location provided in the request resides in a disputed territory. */
  regionCode?: string;
  /** Based on the request parameters, this list will include (up to) two air quality indexes: - Universal AQI. Will be returned if the universalAqi boolean is set to true. - Local AQI. Will be returned if the LOCAL_AQI extra computation is specified. */
  indexes?: Array<AirQualityIndex>;
  /** A list of pollutants affecting the location specified in the request. Note: This field will be returned only for requests that specified one or more of the following extra computations: POLLUTANT_ADDITIONAL_INFO, DOMINANT_POLLUTANT_CONCENTRATION, POLLUTANT_CONCENTRATION. */
  pollutants?: Array<Pollutant>;
  /** Health advice and recommended actions related to the reported air quality conditions. Recommendations are tailored differently for populations at risk, groups with greater sensitivities to pollutants, and the general population. */
  healthRecommendations?: HealthRecommendations;
}

export const LookupCurrentConditionsResponse: Schema.Schema<LookupCurrentConditionsResponse> = Schema.suspend(() => Schema.Struct({
  dateTime: Schema.optional(Schema.String),
  regionCode: Schema.optional(Schema.String),
  indexes: Schema.optional(Schema.Array(AirQualityIndex)),
  pollutants: Schema.optional(Schema.Array(Pollutant)),
  healthRecommendations: Schema.optional(HealthRecommendations),
})).annotate({ identifier: "LookupCurrentConditionsResponse" }) as any as Schema.Schema<LookupCurrentConditionsResponse>;

export interface Interval {
  /** Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start. */
  startTime?: string;
  /** Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end. */
  endTime?: string;
}

export const Interval: Schema.Schema<Interval> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Interval" }) as any as Schema.Schema<Interval>;

export interface LookupHistoryRequest {
  /** Optional. The maximum number of hourly info records to return per page. The default is 72 and the max value is 168 (7 days of data). */
  pageSize?: number;
  /** Optional. A page token received from a previous history call. It is used to retrieve the subsequent page. Note that when providing a value for this parameter all other parameters provided must match the call that provided the page token (the previous call). */
  pageToken?: string;
  /** Required. The latitude and longitude for which the API looks for air quality history data. */
  location?: LatLng;
  /** A timestamp for which to return historical data. The timestamp is rounded to the previous exact hour. Note: this will return hourly data for the requested timestamp only (i.e. a single hourly info element). For example, a request sent where the dateTime parameter is set to 2023-01-03T11:05:49Z will be rounded down to 2023-01-03T11:00:00Z. A timestamp in RFC3339 UTC "Zulu" format, with nanosecond resolution and up to nine fractional digits. Examples: "2014-10-02T15:01:23Z" and "2014-10-02T15:01:23.045123456Z". */
  dateTime?: string;
  /** Number from 1 to 720 that indicates the hours range for the request. For example: A value of 48 will yield data from the last 48 hours. */
  hours?: number;
  /** Indicates the start and end period for which to get the historical data. The timestamp is rounded to the previous exact hour. */
  period?: Interval;
  /** Optional. If set to true, the Universal AQI will be included in the 'indexes' field of the response. Default value is true. */
  universalAqi?: boolean;
  /** Optional. Additional features that can be optionally enabled. Specifying extra computations will result in the relevant elements and fields to be returned in the response. */
  extraComputations?: Array<"EXTRA_COMPUTATION_UNSPECIFIED" | "LOCAL_AQI" | "HEALTH_RECOMMENDATIONS" | "POLLUTANT_ADDITIONAL_INFO" | "DOMINANT_POLLUTANT_CONCENTRATION" | "POLLUTANT_CONCENTRATION" | (string & {})>;
  /** Optional. Allows the client to choose the language for the response. If data cannot be provided for that language the API uses the closest match. Allowed values rely on the IETF standard. Default value is en. */
  languageCode?: string;
  /** Optional. Determines the color palette used for data provided by the 'Universal Air Quality Index' (UAQI). This color palette is relevant just for UAQI, other AQIs have a predetermined color palette that can't be controlled. */
  uaqiColorPalette?: "COLOR_PALETTE_UNSPECIFIED" | "RED_GREEN" | "INDIGO_PERSIAN_DARK" | "INDIGO_PERSIAN_LIGHT" | (string & {});
  /** Optional. Expresses a 'country/region to AQI' relationship. Pairs a country/region with a desired AQI so that air quality data that is required for that country/region will be displayed according to the chosen AQI. This parameter can be used to specify a non-default AQI for a given country, for example, to get the US EPA index for Canada rather than the default index for Canada. */
  customLocalAqis?: Array<CustomLocalAqi>;
}

export const LookupHistoryRequest: Schema.Schema<LookupHistoryRequest> = Schema.suspend(() => Schema.Struct({
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
  location: Schema.optional(LatLng),
  dateTime: Schema.optional(Schema.String),
  hours: Schema.optional(Schema.Number),
  period: Schema.optional(Interval),
  universalAqi: Schema.optional(Schema.Boolean),
  extraComputations: Schema.optional(Schema.Array(Schema.String)),
  languageCode: Schema.optional(Schema.String),
  uaqiColorPalette: Schema.optional(Schema.String),
  customLocalAqis: Schema.optional(Schema.Array(CustomLocalAqi)),
})).annotate({ identifier: "LookupHistoryRequest" }) as any as Schema.Schema<LookupHistoryRequest>;

export interface HourInfo {
  /** A rounded down timestamp indicating the time the data refers to in RFC3339 UTC "Zulu" format, with nanosecond resolution and up to nine fractional digits. For example: "2014-10-02T15:00:00Z". */
  dateTime?: string;
  /** Based on the request parameters, this list will include (up to) two air quality indexes: - Universal AQI. Will be returned if the universalAqi boolean is set to true. - Local AQI. Will be returned if the LOCAL_AQI extra computation is specified. */
  indexes?: Array<AirQualityIndex>;
  /** A list of pollutants affecting the location specified in the request. Note: This field will be returned only for requests that specified one or more of the following extra computations: POLLUTANT_ADDITIONAL_INFO, DOMINANT_POLLUTANT_CONCENTRATION, POLLUTANT_CONCENTRATION. */
  pollutants?: Array<Pollutant>;
  /** Health advice and recommended actions related to the reported air quality conditions. Recommendations are tailored differently for populations at risk, groups with greater sensitivities to pollutants, and the general population. */
  healthRecommendations?: HealthRecommendations;
}

export const HourInfo: Schema.Schema<HourInfo> = Schema.suspend(() => Schema.Struct({
  dateTime: Schema.optional(Schema.String),
  indexes: Schema.optional(Schema.Array(AirQualityIndex)),
  pollutants: Schema.optional(Schema.Array(Pollutant)),
  healthRecommendations: Schema.optional(HealthRecommendations),
})).annotate({ identifier: "HourInfo" }) as any as Schema.Schema<HourInfo>;

export interface LookupHistoryResponse {
  /** Optional. Contains the air quality information for each hour in the requested range. For example, if the request is for 48 hours of history there will be 48 elements of hourly info. */
  hoursInfo?: Array<HourInfo>;
  /** Optional. The ISO_3166-1 alpha-2 code of the country/region corresponding to the location provided in the request. This field might be omitted from the response if the location provided in the request resides in a disputed territory. */
  regionCode?: string;
  /** Optional. The token to retrieve the next page. */
  nextPageToken?: string;
}

export const LookupHistoryResponse: Schema.Schema<LookupHistoryResponse> = Schema.suspend(() => Schema.Struct({
  hoursInfo: Schema.optional(Schema.Array(HourInfo)),
  regionCode: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "LookupHistoryResponse" }) as any as Schema.Schema<LookupHistoryResponse>;

export interface LookupForecastRequest {
  /** Required. The latitude and longitude for which the API looks for air quality data. */
  location?: LatLng;
  /** A timestamp for which to return the data for a specific point in time. The timestamp is rounded to the previous exact hour. Note: this will return hourly data for the requested timestamp only (i.e. a single hourly info element). For example, a request sent where the date_time parameter is set to 2023-01-03T11:05:49Z will be rounded down to 2023-01-03T11:00:00Z. */
  dateTime?: string;
  /** Indicates the start and end period for which to get the forecast data. The timestamp is rounded to the previous exact hour. */
  period?: Interval;
  /** Optional. If set to true, the Universal AQI will be included in the 'indexes' field of the response (default = true). */
  universalAqi?: boolean;
  /** Optional. Additional features that can be optionally enabled. Specifying extra computations will result in the relevant elements and fields to be returned in the response. */
  extraComputations?: Array<"EXTRA_COMPUTATION_UNSPECIFIED" | "LOCAL_AQI" | "HEALTH_RECOMMENDATIONS" | "POLLUTANT_ADDITIONAL_INFO" | "DOMINANT_POLLUTANT_CONCENTRATION" | "POLLUTANT_CONCENTRATION" | (string & {})>;
  /** Optional. Allows the client to choose the language for the response. If data cannot be provided for that language the API uses the closest match. Allowed values rely on the IETF standard (default = 'en'). */
  languageCode?: string;
  /** Optional. Determines the color palette used for data provided by the 'Universal Air Quality Index' (UAQI). This color palette is relevant just for UAQI, other AQIs have a predetermined color palette that can't be controlled. */
  uaqiColorPalette?: "COLOR_PALETTE_UNSPECIFIED" | "RED_GREEN" | "INDIGO_PERSIAN_DARK" | "INDIGO_PERSIAN_LIGHT" | (string & {});
  /** Optional. Expresses a 'country/region to AQI' relationship. Pairs a country/region with a desired AQI so that air quality data that is required for that country/region will be displayed according to the chosen AQI. This parameter can be used to specify a non-default AQI for a given country, for example, to get the US EPA index for Canada rather than the default index for Canada. */
  customLocalAqis?: Array<CustomLocalAqi>;
  /** Optional. The maximum number of hourly info records to return per page (default = 24). */
  pageSize?: number;
  /** Optional. A page token received from a previous forecast call. It is used to retrieve the subsequent page. */
  pageToken?: string;
}

export const LookupForecastRequest: Schema.Schema<LookupForecastRequest> = Schema.suspend(() => Schema.Struct({
  location: Schema.optional(LatLng),
  dateTime: Schema.optional(Schema.String),
  period: Schema.optional(Interval),
  universalAqi: Schema.optional(Schema.Boolean),
  extraComputations: Schema.optional(Schema.Array(Schema.String)),
  languageCode: Schema.optional(Schema.String),
  uaqiColorPalette: Schema.optional(Schema.String),
  customLocalAqis: Schema.optional(Schema.Array(CustomLocalAqi)),
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "LookupForecastRequest" }) as any as Schema.Schema<LookupForecastRequest>;

export interface HourlyForecast {
  /** A rounded down timestamp indicating the time (hour) the data refers to in RFC3339 UTC "Zulu" format. For example: "2014-10-02T15:00:00Z". */
  dateTime?: string;
  /** Based on the request parameters, this list will include (up to) two air quality indexes: - Universal AQI. Will be returned if the `universal_aqi` boolean is set to true. - Local AQI. Will be returned if the LOCAL_AQI extra computation is specified. */
  indexes?: Array<AirQualityIndex>;
  /** A list of pollutants affecting the location specified in the request. Note: This field will be returned only for requests that specified one or more of the following extra computations: POLLUTANT_ADDITIONAL_INFO, DOMINANT_POLLUTANT_CONCENTRATION, POLLUTANT_CONCENTRATION. */
  pollutants?: Array<Pollutant>;
  /** Health advice and recommended actions related to the reported air quality conditions. Recommendations are tailored differently for populations at risk, groups with greater sensitivities to pollutants, and the general population. */
  healthRecommendations?: HealthRecommendations;
}

export const HourlyForecast: Schema.Schema<HourlyForecast> = Schema.suspend(() => Schema.Struct({
  dateTime: Schema.optional(Schema.String),
  indexes: Schema.optional(Schema.Array(AirQualityIndex)),
  pollutants: Schema.optional(Schema.Array(Pollutant)),
  healthRecommendations: Schema.optional(HealthRecommendations),
})).annotate({ identifier: "HourlyForecast" }) as any as Schema.Schema<HourlyForecast>;

export interface LookupForecastResponse {
  /** Optional. Contains the air quality information for each hour in the requested range. For example, if the request is for 48 hours of forecast there will be 48 elements of hourly forecasts. */
  hourlyForecasts?: Array<HourlyForecast>;
  /** Optional. The ISO_3166-1 alpha-2 code of the country/region corresponding to the location provided in the request. This field might be omitted from the response if the location provided in the request resides in a disputed territory. */
  regionCode?: string;
  /** Optional. The token to retrieve the next page. */
  nextPageToken?: string;
}

export const LookupForecastResponse: Schema.Schema<LookupForecastResponse> = Schema.suspend(() => Schema.Struct({
  hourlyForecasts: Schema.optional(Schema.Array(HourlyForecast)),
  regionCode: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "LookupForecastResponse" }) as any as Schema.Schema<LookupForecastResponse>;

export interface HttpBody {
  /** The HTTP Content-Type header value specifying the content type of the body. */
  contentType?: string;
  /** The HTTP request/response body as raw binary. */
  data?: string;
  /** Application specific response metadata. Must be set in the first response for streaming APIs. */
  extensions?: Array<Record<string, unknown>>;
}

export const HttpBody: Schema.Schema<HttpBody> = Schema.suspend(() => Schema.Struct({
  contentType: Schema.optional(Schema.String),
  data: Schema.optional(Schema.String),
  extensions: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "HttpBody" }) as any as Schema.Schema<HttpBody>;

// ==========================================================================
// Operations
// ==========================================================================

/** The Current Conditions endpoint provides hourly air quality information in more than 100 countries, up to a 500 x 500 meters resolution. Includes over 70 local indexes and global air quality index and categories. */
export interface LookupCurrentConditionsRequest_Op {
  /** Request body */
  body?: LookupCurrentConditionsRequest;
}

export const LookupCurrentConditionsRequest_Op = Schema.Struct({
  body: Schema.optional(LookupCurrentConditionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/currentConditions:lookup", hasBody: true }),
  svc,
) as unknown as Schema.Schema<LookupCurrentConditionsRequest_Op>;

export type LookupCurrentConditionsResponse_Op = LookupCurrentConditionsResponse;
export const LookupCurrentConditionsResponse_Op = LookupCurrentConditionsResponse;

export type LookupCurrentConditionsError = CommonErrors;

export const lookupCurrentConditions: API.OperationMethod<LookupCurrentConditionsRequest_Op, LookupCurrentConditionsResponse_Op, LookupCurrentConditionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LookupCurrentConditionsRequest_Op,
  output: LookupCurrentConditionsResponse_Op,
  errors: [],
}));

/** Returns air quality history for a specific location for a given time range. */
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

export type LookupHistoryError = CommonErrors;

export const lookupHistory: API.OperationMethod<LookupHistoryRequest_Op, LookupHistoryResponse_Op, LookupHistoryError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LookupHistoryRequest_Op,
  output: LookupHistoryResponse_Op,
  errors: [],
}));

/** Returns air quality forecast for a specific location for a given time range. */
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

export type LookupForecastError = CommonErrors;

export const lookupForecast: API.OperationMethod<LookupForecastRequest_Op, LookupForecastResponse_Op, LookupForecastError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LookupForecastRequest_Op,
  output: LookupForecastResponse_Op,
  errors: [],
}));

/** Returns a bytes array containing the data of the tile PNG image. */
export interface LookupHeatmapTileMapTypesHeatmapTilesRequest {
  /** Required. The type of the air quality heatmap. Defines the pollutant that the map will graphically represent. Allowed values: - UAQI_RED_GREEN (UAQI, red-green palette) - UAQI_INDIGO_PERSIAN (UAQI, indigo-persian palette) - PM25_INDIGO_PERSIAN - GBR_DEFRA - DEU_UBA - CAN_EC - FRA_ATMO - US_AQI */
  mapType: "MAP_TYPE_UNSPECIFIED" | "UAQI_RED_GREEN" | "UAQI_INDIGO_PERSIAN" | "PM25_INDIGO_PERSIAN" | "GBR_DEFRA" | "DEU_UBA" | "CAN_EC" | "FRA_ATMO" | "US_AQI" | (string & {});
  /** Required. The map's zoom level. Defines how large or small the contents of a map appear in a map view. Zoom level 0 is the entire world in a single tile. Zoom level 1 is the entire world in 4 tiles. Zoom level 2 is the entire world in 16 tiles. Zoom level 16 is the entire world in 65,536 tiles. Allowed values: 0-16 */
  zoom: number;
  /** Required. Defines the east-west point in the requested tile. */
  x: number;
  /** Required. Defines the north-south point in the requested tile. */
  y: number;
}

export const LookupHeatmapTileMapTypesHeatmapTilesRequest = Schema.Struct({
  mapType: Schema.String.pipe(T.HttpPath("mapType")),
  zoom: Schema.Number.pipe(T.HttpPath("zoom")),
  x: Schema.Number.pipe(T.HttpPath("x")),
  y: Schema.Number.pipe(T.HttpPath("y")),
}).pipe(
  T.Http({ method: "GET", path: "v1/mapTypes/{mapType}/heatmapTiles/{zoom}/{x}/{y}" }),
  svc,
) as unknown as Schema.Schema<LookupHeatmapTileMapTypesHeatmapTilesRequest>;

export type LookupHeatmapTileMapTypesHeatmapTilesResponse = HttpBody;
export const LookupHeatmapTileMapTypesHeatmapTilesResponse = HttpBody;

export type LookupHeatmapTileMapTypesHeatmapTilesError = CommonErrors;

export const lookupHeatmapTileMapTypesHeatmapTiles: API.OperationMethod<LookupHeatmapTileMapTypesHeatmapTilesRequest, LookupHeatmapTileMapTypesHeatmapTilesResponse, LookupHeatmapTileMapTypesHeatmapTilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LookupHeatmapTileMapTypesHeatmapTilesRequest,
  output: LookupHeatmapTileMapTypesHeatmapTilesResponse,
  errors: [],
}));

