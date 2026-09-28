import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { restJson1Protocol } from "../protocols/rest-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Geo Maps",
  target: "MapsService",
  version: "2020-11-19",
  sigv4: "geo-maps",
  protocol: restJson1Protocol,
  rules: (p, _) => {
    const { UseDualStack = false, UseFIPS = false, Endpoint, Region } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    if (Endpoint != null) {
      if (UseFIPS === true) {
        return err(
          "Invalid Configuration: FIPS and custom endpoint are not supported",
        );
      }
      if (UseDualStack === true) {
        return err(
          "Invalid Configuration: Dualstack and custom endpoint are not supported",
        );
      }
      return e(Endpoint);
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              `https://maps.geo.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e(
              `https://maps.geo-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e(
              `https://maps.geo-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e(
              `https://maps.geo.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              `https://maps.geo.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e(
              `https://maps.geo-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e(
              `https://maps.geo-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e(
              `https://maps.geo.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://geo-maps-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true && UseDualStack === false) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://geo-maps-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://geo-maps.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://geo-maps.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
    renames: { Message: "message" },
  })<{ readonly message: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500, renames: { Message: "message" } },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404, renames: { Message: "message" } },
  )<{ readonly message: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429, renames: { Message: "message" } },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    {
      status: 400,
      renames: { Message: "message", Reason: "reason", FieldList: "fieldList" },
    },
  )<{
    readonly message: string;
    readonly Reason: ValidationExceptionReason;
    readonly FieldList: ValidationExceptionField[];
  }> {}
export interface GetGlyphsRequest {
  FontStack: string;
  FontUnicodeRange: string;
}
export interface GetGlyphsResponse {
  Blob?: Uint8Array;
  ContentType?: string;
  CacheControl?: string;
  ETag?: string;
}
export type MapStyle =
  | "Standard"
  | "Monochrome"
  | "Hybrid"
  | "Satellite"
  | (string & {});
export type ColorScheme = "Light" | "Dark" | (string & {});
export type Variant = "Default" | (string & {});
export interface GetSpritesRequest {
  FileName: string;
  Style: MapStyle;
  ColorScheme: ColorScheme;
  Variant: Variant;
}
export interface GetSpritesResponse {
  Blob?: Uint8Array;
  ContentType?: string;
  CacheControl?: string;
  ETag?: string;
}
export type PositionListString = string | redacted.Redacted<string>;
export type PositionString = string | redacted.Redacted<string>;
export type CompactOverlay = string | redacted.Redacted<string>;
export type GeoJsonOverlay = string | redacted.Redacted<string>;
export type SensitiveInteger = number;
export type ApiKey = string | redacted.Redacted<string>;
export type LabelSize = "Small" | "Large" | (string & {});
export type LanguageTag = string;
export type CountryCode = string | redacted.Redacted<string>;
export type MapFeatureMode = "Enabled" | "Disabled" | (string & {});
export type DistanceMeters = number;
export type ScaleBarUnit =
  | "Kilometers"
  | "KilometersMiles"
  | "Miles"
  | "MilesKilometers"
  | (string & {});
export type StaticMapStyle = "Satellite" | "Standard" | (string & {});
export type SensitiveFloat = number;
export interface GetStaticMapRequest {
  BoundingBox?: string | redacted.Redacted<string>;
  BoundedPositions?: string | redacted.Redacted<string>;
  Center?: string | redacted.Redacted<string>;
  ColorScheme?: ColorScheme;
  CompactOverlay?: string | redacted.Redacted<string>;
  CropLabels?: boolean;
  GeoJsonOverlay?: string | redacted.Redacted<string>;
  Height: number;
  Key?: string | redacted.Redacted<string>;
  LabelSize?: LabelSize;
  Language?: string;
  Padding?: number;
  PoliticalView?: string | redacted.Redacted<string>;
  PointsOfInterests?: MapFeatureMode;
  Radius?: number;
  FileName: string;
  ScaleBarUnit?: ScaleBarUnit;
  Style?: StaticMapStyle;
  Width: number;
  Zoom?: number;
}
export interface GetStaticMapResponse {
  Blob?: Uint8Array;
  ContentType?: string;
  CacheControl?: string;
  ETag?: string;
  PricingBucket: string;
}
export type Terrain = "Hillshade" | "Terrain3D" | (string & {});
export type ContourDensity = "Low" | "Medium" | "High" | (string & {});
export type Traffic = "All" | "Congestion" | (string & {});
export type TravelMode = "Transit" | "Truck" | (string & {});
export type TravelModeList = TravelMode[];
export type Buildings = "Buildings3D" | (string & {});
export type PoiDensity =
  | "Off"
  | "VerySparse"
  | "Sparse"
  | "Default"
  | "Dense"
  | "VeryDense"
  | (string & {});
export type PoiCategory =
  | "FoodAndDrink"
  | "Entertainment"
  | "SightsAndMuseums"
  | "Transportation"
  | "Accommodations"
  | "LeisureAndOutdoor"
  | "Shopping"
  | "BusinessAndServices"
  | "FacilitiesAndBuildings"
  | (string & {});
export type PoiCategoryList = PoiCategory[];
export interface GetStyleDescriptorRequest {
  Style: MapStyle;
  ColorScheme?: ColorScheme;
  PoliticalView?: string | redacted.Redacted<string>;
  Terrain?: Terrain;
  ContourDensity?: ContourDensity;
  Traffic?: Traffic;
  TravelModes?: TravelMode[];
  Buildings?: Buildings;
  PoiDensity?: PoiDensity;
  PoiCategories?: PoiCategory[];
  Key?: string | redacted.Redacted<string>;
}
export interface GetStyleDescriptorResponse {
  Blob?: Uint8Array;
  ContentType?: string;
  CacheControl?: string;
  ETag?: string;
}
export type TileAdditionalFeature =
  | "ContourLines"
  | "Hillshade"
  | "Logistics"
  | "Transit"
  | (string & {});
export type TileAdditionalFeatureList = TileAdditionalFeature[];
export type Tileset = string;
export type SensitiveString = string | redacted.Redacted<string>;
export interface GetTileRequest {
  AdditionalFeatures?: TileAdditionalFeature[];
  Tileset: string;
  Z: string | redacted.Redacted<string>;
  X: string | redacted.Redacted<string>;
  Y: string | redacted.Redacted<string>;
  Key?: string | redacted.Redacted<string>;
}
export interface GetTileResponse {
  Blob?: Uint8Array;
  ContentType?: string;
  CacheControl?: string;
  ETag?: string;
  PricingBucket: string;
}
export type ValidationExceptionReason =
  | "UnknownOperation"
  | "Missing"
  | "CannotParse"
  | "FieldValidationFailed"
  | "Other"
  | "UnknownField"
  | (string & {});
export interface ValidationExceptionField {
  Name: string;
  Message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type GetGlyphsError = CommonErrors;
/**
 * `GetGlyphs` returns the map's glyphs.
 *
 * For more information, see Style labels with glyphs in the *Amazon Location Service Developer Guide*.
 */
export const getGlyphs: API.OperationMethod<
  GetGlyphsRequest,
  GetGlyphsResponse,
  GetGlyphsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/glyphs/{FontStack}/{FontUnicodeRange}",
    input: { FontStack: 0, FontUnicodeRange: 0 },
    output: {
      Blob: D.m({ payload: true, shape: D.blob }),
      ContentType: D.m({ header: "Content-Type" }),
      CacheControl: D.m({ header: "Cache-Control" }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGlyphs",
})) as any;

export type GetSpritesError = CommonErrors;
/**
 * `GetSprites` returns the map's sprites.
 *
 * For more information, see Style iconography with sprites in the *Amazon Location Service Developer Guide*.
 */
export const getSprites: API.OperationMethod<
  GetSpritesRequest,
  GetSpritesResponse,
  GetSpritesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/styles/{Style}/{ColorScheme}/{Variant}/sprites/{FileName}",
    input: { FileName: 0, Style: 0, ColorScheme: 0, Variant: 0 },
    output: {
      Blob: D.m({ payload: true, shape: D.blob }),
      ContentType: D.m({ header: "Content-Type" }),
      CacheControl: D.m({ header: "Cache-Control" }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSprites",
})) as any;

export type GetStaticMapError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * `GetStaticMap` provides high-quality static map images with customizable options. You can modify the map's appearance and overlay additional information. It's an ideal solution for applications requiring tailored static map snapshots. Not supported in `ap-southeast-1` and `ap-southeast-5` regions for GrabMaps customers.
 *
 * For more information, see the following topics in the *Amazon Location Service Developer Guide*:
 *
 * - Static maps
 *
 * - Customize static maps
 *
 * - Overlay on the static map
 */
export const getStaticMap: API.OperationMethod<
  GetStaticMapRequest,
  GetStaticMapResponse,
  GetStaticMapError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/static/{FileName}",
    input: {
      BoundingBox: D.m({ query: "bounding-box" }),
      BoundedPositions: D.m({ query: "bounded-positions" }),
      Center: D.m({ query: "center" }),
      ColorScheme: D.m({ query: "color-scheme" }),
      CompactOverlay: D.m({ query: "compact-overlay" }),
      CropLabels: D.m({ query: "crop-labels" }),
      GeoJsonOverlay: D.m({ query: "geojson-overlay" }),
      Height: D.m({ query: "height" }),
      Key: D.m({ query: "key" }),
      LabelSize: D.m({ query: "label-size" }),
      Language: D.m({ query: "lang" }),
      Padding: D.m({ query: "padding" }),
      PoliticalView: D.m({ query: "political-view" }),
      PointsOfInterests: D.m({ query: "pois" }),
      Radius: D.m({ query: "radius" }),
      FileName: 0,
      ScaleBarUnit: D.m({ query: "scale-unit" }),
      Style: D.m({ query: "style" }),
      Width: D.m({ query: "width" }),
      Zoom: D.m({ query: "zoom" }),
    },
    output: {
      Blob: D.m({ payload: true, shape: D.blob }),
      ContentType: D.m({ header: "Content-Type" }),
      CacheControl: D.m({ header: "Cache-Control" }),
      ETag: D.m({ header: "ETag" }),
      PricingBucket: D.m({ header: "x-amz-geo-pricing-bucket" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStaticMap",
})) as any;

export type GetStyleDescriptorError = CommonErrors;
/**
 * `GetStyleDescriptor` returns information about the style.
 *
 * For more information, see Style dynamic maps in the *Amazon Location Service Developer Guide*.
 */
export const getStyleDescriptor: API.OperationMethod<
  GetStyleDescriptorRequest,
  GetStyleDescriptorResponse,
  GetStyleDescriptorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/styles/{Style}/descriptor",
    input: {
      Style: 0,
      ColorScheme: D.m({ query: "color-scheme" }),
      PoliticalView: D.m({ query: "political-view" }),
      Terrain: D.m({ query: "terrain" }),
      ContourDensity: D.m({ query: "contour-density" }),
      Traffic: D.m({ query: "traffic" }),
      TravelModes: D.m({ query: "travel-modes" }),
      Buildings: D.m({ query: "buildings" }),
      PoiDensity: D.m({ query: "poi-density" }),
      PoiCategories: D.m({ query: "poi-categories" }),
      Key: D.m({ query: "key" }),
    },
    output: {
      Blob: D.m({ payload: true, shape: D.blob }),
      ContentType: D.m({ header: "Content-Type" }),
      CacheControl: D.m({ header: "Cache-Control" }),
      ETag: D.m({ header: "ETag" }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStyleDescriptor",
})) as any;

export type GetTileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * `GetTile` returns a tile. Map tiles are used by clients to render a map. They're addressed using a grid arrangement with an X coordinate, Y coordinate, and Z (zoom) level.
 *
 * For more information, see Tiles in the *Amazon Location Service Developer Guide*.
 */
export const getTile: API.OperationMethod<
  GetTileRequest,
  GetTileResponse,
  GetTileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/tiles/{Tileset}/{Z}/{X}/{Y}",
    input: {
      AdditionalFeatures: D.m({ query: "additional-features" }),
      Tileset: 0,
      Z: 0,
      X: 0,
      Y: 0,
      Key: D.m({ query: "key" }),
    },
    output: {
      Blob: D.m({ payload: true, shape: D.blob }),
      ContentType: D.m({ header: "Content-Type" }),
      CacheControl: D.m({ header: "Cache-Control" }),
      ETag: D.m({ header: "ETag" }),
      PricingBucket: D.m({ header: "x-amz-geo-pricing-bucket" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTile",
})) as any;
