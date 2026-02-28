// ==========================================================================
// Places Aggregate API (areainsights v1)
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
  name: "areainsights",
  version: "v1",
  rootUrl: "https://areainsights.googleapis.com/",
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

export interface Circle {
  /** The latitude and longitude of the center of the circle. */
  latLng?: LatLng;
  /** **Format:** Must be in the format `places/PLACE_ID`, where `PLACE_ID` is the unique identifier of a place. For example: `places/ChIJgUbEo8cfqokR5lP9_Wh_DaM`. */
  place?: string;
  /** Optional. The radius of the circle in meters */
  radius?: number;
}

export const Circle: Schema.Schema<Circle> = Schema.suspend(() => Schema.Struct({
  latLng: Schema.optional(LatLng),
  place: Schema.optional(Schema.String),
  radius: Schema.optional(Schema.Number),
})).annotate({ identifier: "Circle" }) as any as Schema.Schema<Circle>;

export interface Region {
  /** The [place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) of the geographic region. Not all region types are supported; see documentation for details. **Format:** Must be in the format `places/PLACE_ID`, where `PLACE_ID` is the unique identifier of a place. For example: `places/ChIJPV4oX_65j4ARVW8IJ6IJUYs`. */
  place?: string;
}

export const Region: Schema.Schema<Region> = Schema.suspend(() => Schema.Struct({
  place: Schema.optional(Schema.String),
})).annotate({ identifier: "Region" }) as any as Schema.Schema<Region>;

export interface Polygon {
  /** Optional. The coordinates that define the polygon. */
  coordinates?: Array<LatLng>;
}

export const Polygon: Schema.Schema<Polygon> = Schema.suspend(() => Schema.Struct({
  coordinates: Schema.optional(Schema.Array(LatLng)),
})).annotate({ identifier: "Polygon" }) as any as Schema.Schema<Polygon>;

export interface CustomArea {
  /** Required. The custom area represented as a polygon */
  polygon?: Polygon;
}

export const CustomArea: Schema.Schema<CustomArea> = Schema.suspend(() => Schema.Struct({
  polygon: Schema.optional(Polygon),
})).annotate({ identifier: "CustomArea" }) as any as Schema.Schema<CustomArea>;

export interface LocationFilter {
  /** Area as a circle. */
  circle?: Circle;
  /** Area as region. */
  region?: Region;
  /** Custom area specified by a polygon. */
  customArea?: CustomArea;
}

export const LocationFilter: Schema.Schema<LocationFilter> = Schema.suspend(() => Schema.Struct({
  circle: Schema.optional(Circle),
  region: Schema.optional(Region),
  customArea: Schema.optional(CustomArea),
})).annotate({ identifier: "LocationFilter" }) as any as Schema.Schema<LocationFilter>;

export interface TypeFilter {
  /** Optional. Included Place types. */
  includedTypes?: Array<string>;
  /** Optional. Excluded Place types. */
  excludedTypes?: Array<string>;
  /** Optional. Included primary Place types. */
  includedPrimaryTypes?: Array<string>;
  /** Optional. Excluded primary Place types. */
  excludedPrimaryTypes?: Array<string>;
}

export const TypeFilter: Schema.Schema<TypeFilter> = Schema.suspend(() => Schema.Struct({
  includedTypes: Schema.optional(Schema.Array(Schema.String)),
  excludedTypes: Schema.optional(Schema.Array(Schema.String)),
  includedPrimaryTypes: Schema.optional(Schema.Array(Schema.String)),
  excludedPrimaryTypes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TypeFilter" }) as any as Schema.Schema<TypeFilter>;

export interface RatingFilter {
  /** Optional. Restricts results to places whose average user rating is greater than or equal to min_rating. Values must be between 1.0 and 5.0. */
  minRating?: number;
  /** Optional. Restricts results to places whose average user rating is strictly less than or equal to max_rating. Values must be between 1.0 and 5.0. */
  maxRating?: number;
}

export const RatingFilter: Schema.Schema<RatingFilter> = Schema.suspend(() => Schema.Struct({
  minRating: Schema.optional(Schema.Number),
  maxRating: Schema.optional(Schema.Number),
})).annotate({ identifier: "RatingFilter" }) as any as Schema.Schema<RatingFilter>;

export interface Filter {
  /** Required. Restricts results to places which are located in the area specified by location filters. */
  locationFilter?: LocationFilter;
  /** Required. Place type filters. */
  typeFilter?: TypeFilter;
  /** Optional. Restricts results to places whose operating status is included on this list. If operating_status is not set, OPERATING_STATUS_OPERATIONAL is used as default. */
  operatingStatus?: Array<"OPERATING_STATUS_UNSPECIFIED" | "OPERATING_STATUS_OPERATIONAL" | "OPERATING_STATUS_PERMANENTLY_CLOSED" | "OPERATING_STATUS_TEMPORARILY_CLOSED" | (string & {})>;
  /** Optional. Restricts results to places whose price level is included on this list. If `price_levels` is not set, all price levels are included in the results. */
  priceLevels?: Array<"PRICE_LEVEL_UNSPECIFIED" | "PRICE_LEVEL_FREE" | "PRICE_LEVEL_INEXPENSIVE" | "PRICE_LEVEL_MODERATE" | "PRICE_LEVEL_EXPENSIVE" | "PRICE_LEVEL_VERY_EXPENSIVE" | (string & {})>;
  /** Optional. Restricts results to places whose average user ratings are in the range specified by rating_filter. If rating_filter is not set, all ratings are included in the result. */
  ratingFilter?: RatingFilter;
}

export const Filter: Schema.Schema<Filter> = Schema.suspend(() => Schema.Struct({
  locationFilter: Schema.optional(LocationFilter),
  typeFilter: Schema.optional(TypeFilter),
  operatingStatus: Schema.optional(Schema.Array(Schema.String)),
  priceLevels: Schema.optional(Schema.Array(Schema.String)),
  ratingFilter: Schema.optional(RatingFilter),
})).annotate({ identifier: "Filter" }) as any as Schema.Schema<Filter>;

export interface ComputeInsightsRequest {
  /** Required. Insights to compute. Currently only INSIGHT_COUNT and INSIGHT_PLACES are supported. */
  insights?: Array<"INSIGHT_UNSPECIFIED" | "INSIGHT_COUNT" | "INSIGHT_PLACES" | (string & {})>;
  /** Required. Insight filter. */
  filter?: Filter;
}

export const ComputeInsightsRequest: Schema.Schema<ComputeInsightsRequest> = Schema.suspend(() => Schema.Struct({
  insights: Schema.optional(Schema.Array(Schema.String)),
  filter: Schema.optional(Filter),
})).annotate({ identifier: "ComputeInsightsRequest" }) as any as Schema.Schema<ComputeInsightsRequest>;

export interface PlaceInsight {
  /** The unique identifier of the place. This resource name can be used to retrieve details about the place using the [Places API](https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places/get). */
  place?: string;
}

export const PlaceInsight: Schema.Schema<PlaceInsight> = Schema.suspend(() => Schema.Struct({
  place: Schema.optional(Schema.String),
})).annotate({ identifier: "PlaceInsight" }) as any as Schema.Schema<PlaceInsight>;

export interface ComputeInsightsResponse {
  /** Result for Insights.INSIGHT_COUNT. */
  count?: string;
  /** Result for Insights.INSIGHT_PLACES. */
  placeInsights?: Array<PlaceInsight>;
}

export const ComputeInsightsResponse: Schema.Schema<ComputeInsightsResponse> = Schema.suspend(() => Schema.Struct({
  count: Schema.optional(Schema.String),
  placeInsights: Schema.optional(Schema.Array(PlaceInsight)),
})).annotate({ identifier: "ComputeInsightsResponse" }) as any as Schema.Schema<ComputeInsightsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** This method lets you retrieve insights about areas using a variety of filter such as: area, place type, operating status, price level and ratings. Currently "count" and "places" insights are supported. With "count" insights you can answer questions such as "How many restaurant are located in California that are operational, are inexpensive and have an average rating of at least 4 stars" (see `insight` enum for more details). With "places" insights, you can determine which places match the requested filter. Clients can then use those place resource names to fetch more details about each individual place using the Places API. */
export interface ComputeInsightsV1Request {
  /** Request body */
  body?: ComputeInsightsRequest;
}

export const ComputeInsightsV1Request = Schema.Struct({
  body: Schema.optional(ComputeInsightsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1:computeInsights", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ComputeInsightsV1Request>;

export type ComputeInsightsV1Response = ComputeInsightsResponse;
export const ComputeInsightsV1Response = ComputeInsightsResponse;

export type ComputeInsightsV1Error = CommonErrors;

export const computeInsightsV1: API.OperationMethod<ComputeInsightsV1Request, ComputeInsightsV1Response, ComputeInsightsV1Error, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ComputeInsightsV1Request,
  output: ComputeInsightsV1Response,
  errors: [],
}));

