// ==========================================================================
// Pollen API (pollen v1)
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
  name: "pollen",
  version: "v1",
  rootUrl: "https://pollen.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Color {
  /** The amount of blue in the color as a value in the interval [0, 1]. */
  blue?: number;
  /** The amount of red in the color as a value in the interval [0, 1]. */
  red?: number;
  /** The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0). */
  alpha?: number;
  /** The amount of green in the color as a value in the interval [0, 1]. */
  green?: number;
}

export const Color: Schema.Schema<Color> = Schema.suspend(() =>
  Schema.Struct({
    blue: Schema.optional(Schema.Number),
    red: Schema.optional(Schema.Number),
    alpha: Schema.optional(Schema.Number),
    green: Schema.optional(Schema.Number),
  }),
).annotate({ identifier: "Color" }) as any as Schema.Schema<Color>;

export interface IndexInfo {
  /** The index's code. This field represents the index for programming purposes by using snake cases instead of spaces. Example: "UPI". */
  code?: "INDEX_UNSPECIFIED" | "UPI" | (string & {});
  /** Textual explanation of current index level. */
  indexDescription?: string;
  /** The index's numeric score. Numeric range is between 0 and 5. */
  value?: number;
  /** A human readable representation of the index name. Example: "Universal Pollen Index". */
  displayName?: string;
  /** Text classification of index numerical score interpretation. The index consists of six categories: * 0: "None" * 1: "Very low" * 2: "Low" * 3: "Moderate" * 4: "High" * 5: "Very high */
  category?: string;
  /** The color used to represent the Pollen Index numeric score. */
  color?: Color;
}

export const IndexInfo: Schema.Schema<IndexInfo> = Schema.suspend(() =>
  Schema.Struct({
    code: Schema.optional(Schema.String),
    indexDescription: Schema.optional(Schema.String),
    value: Schema.optional(Schema.Number),
    displayName: Schema.optional(Schema.String),
    category: Schema.optional(Schema.String),
    color: Schema.optional(Color),
  }),
).annotate({ identifier: "IndexInfo" }) as any as Schema.Schema<IndexInfo>;

export interface PollenTypeInfo {
  /** A human readable representation of the pollen type name. Example: "Grass" */
  displayName?: string;
  /** Textual list of explanations, related to health insights based on the current pollen levels. */
  healthRecommendations?: Array<string>;
  /** The pollen type's code name. For example: "GRASS" */
  code?: "POLLEN_TYPE_UNSPECIFIED" | "GRASS" | "TREE" | "WEED" | (string & {});
  /** Indication whether the plant is in season or not. */
  inSeason?: boolean;
  /** Contains the Universal Pollen Index (UPI) data for the pollen type. */
  indexInfo?: IndexInfo;
}

export const PollenTypeInfo: Schema.Schema<PollenTypeInfo> = Schema.suspend(
  () =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      healthRecommendations: Schema.optional(Schema.Array(Schema.String)),
      code: Schema.optional(Schema.String),
      inSeason: Schema.optional(Schema.Boolean),
      indexInfo: Schema.optional(IndexInfo),
    }),
).annotate({
  identifier: "PollenTypeInfo",
}) as any as Schema.Schema<PollenTypeInfo>;

export interface PlantDescription {
  /** Textual description of the plants' colors of leaves, bark, flowers or seeds that helps identify the plant. */
  specialColors?: string;
  /** Link to the picture of the plant. */
  picture?: string;
  /** A human readable representation of the plant family name. Example: "Betulaceae (the Birch family)". */
  family?: string;
  /** Textual list of explanations of seasons where the pollen is active. Example: "Late winter, spring". */
  season?: string;
  /** Textual description of the plants' shapes of leaves, bark, flowers or seeds that helps identify the plant. */
  specialShapes?: string;
  /** Link to a closeup picture of the plant. */
  pictureCloseup?: string;
  /** The plant's pollen type. For example: "GRASS". A list of all available codes could be found here. */
  type?: "POLLEN_TYPE_UNSPECIFIED" | "GRASS" | "TREE" | "WEED" | (string & {});
  /** Textual description of pollen cross reaction plants. Example: Alder, Hazel, Hornbeam, Beech, Willow, and Oak pollen. */
  crossReaction?: string;
}

export const PlantDescription: Schema.Schema<PlantDescription> = Schema.suspend(
  () =>
    Schema.Struct({
      specialColors: Schema.optional(Schema.String),
      picture: Schema.optional(Schema.String),
      family: Schema.optional(Schema.String),
      season: Schema.optional(Schema.String),
      specialShapes: Schema.optional(Schema.String),
      pictureCloseup: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      crossReaction: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "PlantDescription",
}) as any as Schema.Schema<PlantDescription>;

export interface PlantInfo {
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
  /** Indication of either the plant is in season or not. */
  inSeason?: boolean;
  /** This object contains data representing specific pollen index value, category and description. */
  indexInfo?: IndexInfo;
  /** A human readable representation of the plant name. Example: “Cottonwood". */
  displayName?: string;
}

export const PlantInfo: Schema.Schema<PlantInfo> = Schema.suspend(() =>
  Schema.Struct({
    plantDescription: Schema.optional(PlantDescription),
    code: Schema.optional(Schema.String),
    inSeason: Schema.optional(Schema.Boolean),
    indexInfo: Schema.optional(IndexInfo),
    displayName: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "PlantInfo" }) as any as Schema.Schema<PlantInfo>;

export interface Pollen_Date {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const Pollen_Date: Schema.Schema<Pollen_Date> = Schema.suspend(() =>
  Schema.Struct({
    year: Schema.optional(Schema.Number),
    month: Schema.optional(Schema.Number),
    day: Schema.optional(Schema.Number),
  }),
).annotate({ identifier: "Pollen_Date" }) as any as Schema.Schema<Pollen_Date>;

export interface DayInfo {
  /** This list will include up to three pollen types (GRASS, WEED, TREE) affecting the location specified in the request. */
  pollenTypeInfo?: Array<PollenTypeInfo>;
  /** This list will include up to 15 pollen species affecting the location specified in the request. */
  plantInfo?: Array<PlantInfo>;
  /** The date in UTC at which the pollen forecast data is represented. */
  date?: Pollen_Date;
}

export const DayInfo: Schema.Schema<DayInfo> = Schema.suspend(() =>
  Schema.Struct({
    pollenTypeInfo: Schema.optional(Schema.Array(PollenTypeInfo)),
    plantInfo: Schema.optional(Schema.Array(PlantInfo)),
    date: Schema.optional(Pollen_Date),
  }),
).annotate({ identifier: "DayInfo" }) as any as Schema.Schema<DayInfo>;

export interface LookupForecastResponse {
  /** The ISO_3166-1 alpha-2 code of the country/region corresponding to the location provided in the request. This field might be omitted from the response if the location provided in the request resides in a disputed territory. */
  regionCode?: string;
  /** Required. This object contains the daily forecast information for each day requested. */
  dailyInfo?: Array<DayInfo>;
  /** Optional. The token to retrieve the next page. */
  nextPageToken?: string;
}

export const LookupForecastResponse: Schema.Schema<LookupForecastResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      regionCode: Schema.optional(Schema.String),
      dailyInfo: Schema.optional(Schema.Array(DayInfo)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LookupForecastResponse",
  }) as any as Schema.Schema<LookupForecastResponse>;

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

// ==========================================================================
// Operations
// ==========================================================================

export interface LookupForecastRequest {
  /** The longitude in degrees. It must be in the range [-180.0, +180.0]. */
  "location.longitude"?: number;
  /** The latitude in degrees. It must be in the range [-90.0, +90.0]. */
  "location.latitude"?: number;
  /** Optional. Contains general information about plants, including details on their seasonality, special shapes and colors, information about allergic cross-reactions, and plant photos. The default value is "true". */
  plantsDescription?: boolean;
  /** Required. A number that indicates how many forecast days to request (minimum value 1, maximum value is 5). */
  days?: number;
  /** Optional. The maximum number of daily info records to return per page. The default and max value is 5, indicating 5 days of data. */
  pageSize?: number;
  /** Optional. A page token received from a previous daily call. It is used to retrieve the subsequent page. Note that when providing a value for the page token, all other request parameters provided must match the previous call that provided the page token. */
  pageToken?: string;
  /** Optional. Allows the client to choose the language for the response. If data cannot be provided for that language, the API uses the closest match. Allowed values rely on the IETF BCP-47 standard. The default value is "en". */
  languageCode?: string;
}

export const LookupForecastRequest = Schema.Struct({
  "location.longitude": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("location.longitude"),
  ),
  "location.latitude": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("location.latitude"),
  ),
  plantsDescription: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("plantsDescription"),
  ),
  days: Schema.optional(Schema.Number).pipe(T.HttpQuery("days")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  languageCode: Schema.optional(Schema.String).pipe(
    T.HttpQuery("languageCode"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "v1/forecast:lookup" }),
  svc,
) as unknown as Schema.Schema<LookupForecastRequest>;

export type LookupForecastResponse_Op = LookupForecastResponse;
export const LookupForecastResponse_Op = LookupForecastResponse;

export type LookupForecastError = DefaultErrors;

/** Returns up to 5 days of daily pollen information in more than 65 countries, up to 1km resolution. */
export const lookupForecast: API.PaginatedOperationMethod<
  LookupForecastRequest,
  LookupForecastResponse_Op,
  LookupForecastError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: LookupForecastRequest,
  output: LookupForecastResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface LookupHeatmapTileMapTypesHeatmapTilesRequest {
  /** Required. Defines the east-west point in the requested tile. */
  x: number;
  /** Required. The map's zoom level. Defines how large or small the contents of a map appear in a map view. * Zoom level 0 is the entire world in a single tile. * Zoom level 1 is the entire world in 4 tiles. * Zoom level 2 is the entire world in 16 tiles. * Zoom level 16 is the entire world in 65,536 tiles. Allowed values: 0-16 */
  zoom: number;
  /** Required. The type of the pollen heatmap. Defines the combination of pollen type and index that the map will graphically represent. */
  mapType:
    | "MAP_TYPE_UNSPECIFIED"
    | "TREE_UPI"
    | "GRASS_UPI"
    | "WEED_UPI"
    | (string & {});
  /** Required. Defines the north-south point in the requested tile. */
  y: number;
}

export const LookupHeatmapTileMapTypesHeatmapTilesRequest = Schema.Struct({
  x: Schema.Number.pipe(T.HttpPath("x")),
  zoom: Schema.Number.pipe(T.HttpPath("zoom")),
  mapType: Schema.String.pipe(T.HttpPath("mapType")),
  y: Schema.Number.pipe(T.HttpPath("y")),
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

/** Returns a byte array containing the data of the tile PNG image. */
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
