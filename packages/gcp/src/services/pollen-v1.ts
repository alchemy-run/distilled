// ==========================================================================
// Pollen API (pollen v1)
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
  name: "pollen",
  version: "v1",
  rootUrl: "https://pollen.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Pollen_Date {
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const Pollen_Date: Schema.Schema<Pollen_Date> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      month: Schema.optional(Schema.Number),
      year: Schema.optional(Schema.Number),
      day: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "Pollen_Date",
  }) as any as Schema.Schema<Pollen_Date>;

export interface Color {
  /** The amount of red in the color as a value in the interval [0, 1]. */
  red?: number;
  /** The amount of green in the color as a value in the interval [0, 1]. */
  green?: number;
  /** The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0). */
  alpha?: number;
  /** The amount of blue in the color as a value in the interval [0, 1]. */
  blue?: number;
}

export const Color: Schema.Schema<Color> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      red: Schema.optional(Schema.Number),
      green: Schema.optional(Schema.Number),
      alpha: Schema.optional(Schema.Number),
      blue: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "Color" }) as any as Schema.Schema<Color>;

export interface HttpBody {
  /** The HTTP request/response body as raw binary. */
  data?: string;
  /** Application specific response metadata. Must be set in the first response for streaming APIs. */
  extensions?: Array<Record<string, unknown>>;
  /** The HTTP Content-Type header value specifying the content type of the body. */
  contentType?: string;
}

export const HttpBody: Schema.Schema<HttpBody> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      data: Schema.optional(Schema.String),
      extensions: Schema.optional(
        Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
      ),
      contentType: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "HttpBody" }) as any as Schema.Schema<HttpBody>;

export interface IndexInfo {
  /** Textual explanation of current index level. */
  indexDescription?: string;
  /** The index's numeric score. Numeric range is between 0 and 5. */
  value?: number;
  /** The color used to represent the Pollen Index numeric score. */
  color?: Color;
  /** Text classification of index numerical score interpretation. The index consists of six categories: * 0: "None" * 1: "Very low" * 2: "Low" * 3: "Moderate" * 4: "High" * 5: "Very high */
  category?: string;
  /** A human readable representation of the index name. Example: "Universal Pollen Index". */
  displayName?: string;
  /** The index's code. This field represents the index for programming purposes by using snake cases instead of spaces. Example: "UPI". */
  code?: "INDEX_UNSPECIFIED" | "UPI" | (string & {});
}

export const IndexInfo: Schema.Schema<IndexInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      indexDescription: Schema.optional(Schema.String),
      value: Schema.optional(Schema.Number),
      color: Schema.optional(Color),
      category: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      code: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "IndexInfo" }) as any as Schema.Schema<IndexInfo>;

export interface PlantDescription {
  /** Textual list of explanations of seasons where the pollen is active. Example: "Late winter, spring". */
  season?: string;
  /** Link to the picture of the plant. */
  picture?: string;
  /** Textual description of the plants' colors of leaves, bark, flowers or seeds that helps identify the plant. */
  specialColors?: string;
  /** A human readable representation of the plant family name. Example: "Betulaceae (the Birch family)". */
  family?: string;
  /** The plant's pollen type. For example: "GRASS". A list of all available codes could be found here. */
  type?: "POLLEN_TYPE_UNSPECIFIED" | "GRASS" | "TREE" | "WEED" | (string & {});
  /** Textual description of the plants' shapes of leaves, bark, flowers or seeds that helps identify the plant. */
  specialShapes?: string;
  /** Textual description of pollen cross reaction plants. Example: Alder, Hazel, Hornbeam, Beech, Willow, and Oak pollen. */
  crossReaction?: string;
  /** Link to a closeup picture of the plant. */
  pictureCloseup?: string;
}

export const PlantDescription: Schema.Schema<PlantDescription> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      season: Schema.optional(Schema.String),
      picture: Schema.optional(Schema.String),
      specialColors: Schema.optional(Schema.String),
      family: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      specialShapes: Schema.optional(Schema.String),
      crossReaction: Schema.optional(Schema.String),
      pictureCloseup: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PlantDescription",
  }) as any as Schema.Schema<PlantDescription>;

export interface PlantInfo {
  /** This object contains data representing specific pollen index value, category and description. */
  indexInfo?: IndexInfo;
  /** Contains general information about plants, including details on their seasonality, special shapes and colors, information about allergic cross-reactions, and plant photos. */
  plantDescription?: PlantDescription;
  /** The plant code name. For example: "COTTONWOOD". A list of all available codes could be found here. */
  code?:
    | "PLANT_UNSPECIFIED"
    | "ALDER"
    | "ASH"
    | "BIRCH"
    | "COTTONWOOD"
    | "ELM"
    | "MAPLE"
    | "OLIVE"
    | "JUNIPER"
    | "OAK"
    | "PINE"
    | "CYPRESS_PINE"
    | "HAZEL"
    | "GRAMINALES"
    | "RAGWEED"
    | "MUGWORT"
    | "JAPANESE_CEDAR"
    | "JAPANESE_CYPRESS"
    | (string & {});
  /** A human readable representation of the plant name. Example: “Cottonwood". */
  displayName?: string;
  /** Indication of either the plant is in season or not. */
  inSeason?: boolean;
}

export const PlantInfo: Schema.Schema<PlantInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      indexInfo: Schema.optional(IndexInfo),
      plantDescription: Schema.optional(PlantDescription),
      code: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      inSeason: Schema.optional(Schema.Boolean),
    }),
  ).annotate({ identifier: "PlantInfo" }) as any as Schema.Schema<PlantInfo>;

export interface PollenTypeInfo {
  /** Textual list of explanations, related to health insights based on the current pollen levels. */
  healthRecommendations?: Array<string>;
  /** The pollen type's code name. For example: "GRASS" */
  code?: "POLLEN_TYPE_UNSPECIFIED" | "GRASS" | "TREE" | "WEED" | (string & {});
  /** A human readable representation of the pollen type name. Example: "Grass" */
  displayName?: string;
  /** Indication whether the plant is in season or not. */
  inSeason?: boolean;
  /** Contains the Universal Pollen Index (UPI) data for the pollen type. */
  indexInfo?: IndexInfo;
}

export const PollenTypeInfo: Schema.Schema<PollenTypeInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      healthRecommendations: Schema.optional(Schema.Array(Schema.String)),
      code: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      inSeason: Schema.optional(Schema.Boolean),
      indexInfo: Schema.optional(IndexInfo),
    }),
  ).annotate({
    identifier: "PollenTypeInfo",
  }) as any as Schema.Schema<PollenTypeInfo>;

export interface DayInfo {
  /** The date in UTC at which the pollen forecast data is represented. */
  date?: Pollen_Date;
  /** This list will include up to 15 pollen species affecting the location specified in the request. */
  plantInfo?: Array<PlantInfo>;
  /** This list will include up to three pollen types (GRASS, WEED, TREE) affecting the location specified in the request. */
  pollenTypeInfo?: Array<PollenTypeInfo>;
}

export const DayInfo: Schema.Schema<DayInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      date: Schema.optional(Pollen_Date),
      plantInfo: Schema.optional(Schema.Array(PlantInfo)),
      pollenTypeInfo: Schema.optional(Schema.Array(PollenTypeInfo)),
    }),
  ).annotate({ identifier: "DayInfo" }) as any as Schema.Schema<DayInfo>;

export interface LookupForecastResponse {
  /** Optional. The token to retrieve the next page. */
  nextPageToken?: string;
  /** The ISO_3166-1 alpha-2 code of the country/region corresponding to the location provided in the request. This field might be omitted from the response if the location provided in the request resides in a disputed territory. */
  regionCode?: string;
  /** Required. This object contains the daily forecast information for each day requested. */
  dailyInfo?: Array<DayInfo>;
}

export const LookupForecastResponse: Schema.Schema<LookupForecastResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      regionCode: Schema.optional(Schema.String),
      dailyInfo: Schema.optional(Schema.Array(DayInfo)),
    }),
  ).annotate({
    identifier: "LookupForecastResponse",
  }) as any as Schema.Schema<LookupForecastResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface LookupForecastRequest {
  /** Optional. Allows the client to choose the language for the response. If data cannot be provided for that language, the API uses the closest match. Allowed values rely on the IETF BCP-47 standard. The default value is "en". */
  languageCode?: string;
  /** Required. A number that indicates how many forecast days to request (minimum value 1, maximum value is 5). */
  days?: number;
  /** Optional. Contains general information about plants, including details on their seasonality, special shapes and colors, information about allergic cross-reactions, and plant photos. The default value is "true". */
  plantsDescription?: boolean;
  /** Optional. A page token received from a previous daily call. It is used to retrieve the subsequent page. Note that when providing a value for the page token, all other request parameters provided must match the previous call that provided the page token. */
  pageToken?: string;
  /** The latitude in degrees. It must be in the range [-90.0, +90.0]. */
  "location.latitude"?: number;
  /** The longitude in degrees. It must be in the range [-180.0, +180.0]. */
  "location.longitude"?: number;
  /** Optional. The maximum number of daily info records to return per page. The default and max value is 5, indicating 5 days of data. */
  pageSize?: number;
}

export const LookupForecastRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  languageCode: Schema.optional(Schema.String).pipe(
    T.HttpQuery("languageCode"),
  ),
  days: Schema.optional(Schema.Number).pipe(T.HttpQuery("days")),
  plantsDescription: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("plantsDescription"),
  ),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  "location.latitude": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("location.latitude"),
  ),
  "location.longitude": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("location.longitude"),
  ),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/forecast:lookup" }),
  svc,
) as unknown as Schema.Schema<LookupForecastRequest>;

export type LookupForecastResponse_Op = LookupForecastResponse;
export const LookupForecastResponse_Op =
  /*@__PURE__*/ /*#__PURE__*/ LookupForecastResponse;

export type LookupForecastError = DefaultErrors;

/** Returns up to 5 days of daily pollen information in more than 65 countries, up to 1km resolution. */
export const lookupForecast: API.PaginatedOperationMethod<
  LookupForecastRequest,
  LookupForecastResponse_Op,
  LookupForecastError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: LookupForecastRequest,
  output: LookupForecastResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface LookupHeatmapTileMapTypesHeatmapTilesRequest {
  /** Required. The type of the pollen heatmap. Defines the combination of pollen type and index that the map will graphically represent. */
  mapType:
    | "MAP_TYPE_UNSPECIFIED"
    | "TREE_UPI"
    | "GRASS_UPI"
    | "WEED_UPI"
    | (string & {});
  /** Required. Defines the east-west point in the requested tile. */
  x: number;
  /** Required. The map's zoom level. Defines how large or small the contents of a map appear in a map view. * Zoom level 0 is the entire world in a single tile. * Zoom level 1 is the entire world in 4 tiles. * Zoom level 2 is the entire world in 16 tiles. * Zoom level 16 is the entire world in 65,536 tiles. Allowed values: 0-16 */
  zoom: number;
  /** Required. Defines the north-south point in the requested tile. */
  y: number;
}

export const LookupHeatmapTileMapTypesHeatmapTilesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    mapType: Schema.String.pipe(T.HttpPath("mapType")),
    x: Schema.Number.pipe(T.HttpPath("x")),
    zoom: Schema.Number.pipe(T.HttpPath("zoom")),
    y: Schema.Number.pipe(T.HttpPath("y")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/mapTypes/{mapType}/heatmapTiles/{zoom}/{x}/{y}",
    }),
    svc,
  ) as unknown as Schema.Schema<LookupHeatmapTileMapTypesHeatmapTilesRequest>;

export type LookupHeatmapTileMapTypesHeatmapTilesResponse = HttpBody;
export const LookupHeatmapTileMapTypesHeatmapTilesResponse =
  /*@__PURE__*/ /*#__PURE__*/ HttpBody;

export type LookupHeatmapTileMapTypesHeatmapTilesError = DefaultErrors;

/** Returns a byte array containing the data of the tile PNG image. */
export const lookupHeatmapTileMapTypesHeatmapTiles: API.OperationMethod<
  LookupHeatmapTileMapTypesHeatmapTilesRequest,
  LookupHeatmapTileMapTypesHeatmapTilesResponse,
  LookupHeatmapTileMapTypesHeatmapTilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: LookupHeatmapTileMapTypesHeatmapTilesRequest,
  output: LookupHeatmapTileMapTypesHeatmapTilesResponse,
  errors: [],
}));
