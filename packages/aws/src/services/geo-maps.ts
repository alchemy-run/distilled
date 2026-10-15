import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "Geo Maps", serviceShapeName: "MapsService" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "geo-maps" });
const ver = /*@__PURE__*/ T.ServiceVersion("2020-11-19");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
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
        return err("Invalid Configuration: FIPS and custom endpoint are not supported");
      }
      if (UseDualStack === true) {
        return err("Invalid Configuration: Dualstack and custom endpoint are not supported");
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
            return e(`https://maps.geo.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
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
            return e(`https://maps.geo-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
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
            return e(`https://maps.geo.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
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
            return e(`https://maps.geo-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
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
            return err("FIPS is enabled but this partition does not support FIPS");
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://geo-maps.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err("DualStack is enabled but this partition does not support DualStack");
          }
          return e(`https://geo-maps.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://maps.geo.{R}.{D}","properties":{},"headers":{}}',
  [
    "cn-north-1",
    "cn-northwest-1",
    "aws-cn-global",
    "us-iso-east-1",
    "us-iso-west-1",
    "aws-iso-global",
    "us-isob-east-1",
    "aws-iso-b-global",
    "aws-iso-f-global",
    "us-isof-east-1",
    "us-isof-south-1",
    "eusc-de-east-1",
  ],
);

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(429), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ValidationExceptionReason",
      }),
      FieldList: /*@__PURE__*/ S.suspend(() => __S(1, __c0, 1)).annotate({
        identifier: "ValidationExceptionFieldList",
      }),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type MapStyle = "Standard" | "Monochrome" | "Hybrid" | "Satellite" | (string & {});
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
  input: __S(2, __c1, 0) as any as S.Schema<GetGlyphsRequest>,
  output: __S(4, __c2, 0) as any as S.Schema<GetGlyphsResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGlyphs",
}));

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
  input: __S(6, __c3, 0) as any as S.Schema<GetSpritesRequest>,
  output: __S(4, __c2, 0) as any as S.Schema<GetSpritesResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSprites",
}));

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
  input: __S(8, __c4, 0) as any as S.Schema<GetStaticMapRequest>,
  output: __S(10, __c5, 0) as any as S.Schema<GetStaticMapResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStaticMap",
}));

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
  input: __S(12, __c6, 0) as any as S.Schema<GetStyleDescriptorRequest>,
  output: __S(4, __c2, 0) as any as S.Schema<GetStyleDescriptorResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStyleDescriptor",
}));

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
  input: __S(16, __c8, 0) as any as S.Schema<GetTileRequest>,
  output: __S(10, __c5, 0) as any as S.Schema<GetTileResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Message: S.String }).pipe(
          S.encodeKeys({ Name: "name", Message: "message" }),
        ),
      ).annotate({ identifier: "ValidationExceptionField" });
    case 1:
      return S.Array(__S(0, __c0, 0));
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FontStack: S.String.pipe(T.HttpLabel("FontStack")),
          FontUnicodeRange: S.String.pipe(T.HttpLabel("FontUnicodeRange")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/glyphs/{FontStack}/{FontUnicodeRange}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetGlyphsRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Blob: S.optional(T.Blob).pipe(T.HttpPayload()),
          ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
          CacheControl: S.optional(S.String).pipe(T.HttpHeader("Cache-Control")),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
        }),
      ).annotate({ identifier: "GetGlyphsResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FileName: S.String.pipe(T.HttpLabel("FileName")),
          Style: S.String.pipe(T.HttpLabel("Style")),
          ColorScheme: S.String.pipe(T.HttpLabel("ColorScheme")),
          Variant: S.String.pipe(T.HttpLabel("Variant")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/styles/{Style}/{ColorScheme}/{Variant}/sprites/{FileName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSpritesRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BoundingBox: S.optional(SensitiveString).pipe(T.HttpQuery("bounding-box")),
          BoundedPositions: S.optional(SensitiveString).pipe(T.HttpQuery("bounded-positions")),
          Center: S.optional(SensitiveString).pipe(T.HttpQuery("center")),
          ColorScheme: S.optional(S.String).pipe(T.HttpQuery("color-scheme")),
          CompactOverlay: S.optional(SensitiveString).pipe(T.HttpQuery("compact-overlay")),
          CropLabels: S.optional(S.Boolean).pipe(T.HttpQuery("crop-labels")),
          GeoJsonOverlay: S.optional(SensitiveString).pipe(T.HttpQuery("geojson-overlay")),
          Height: S.Number.pipe(T.HttpQuery("height")),
          Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
          LabelSize: S.optional(S.String).pipe(T.HttpQuery("label-size")),
          Language: S.optional(S.String).pipe(T.HttpQuery("lang")),
          Padding: S.optional(S.Number).pipe(T.HttpQuery("padding")),
          PoliticalView: S.optional(SensitiveString).pipe(T.HttpQuery("political-view")),
          PointsOfInterests: S.optional(S.String).pipe(T.HttpQuery("pois")),
          Radius: S.optional(S.Number).pipe(T.HttpQuery("radius")),
          FileName: S.String.pipe(T.HttpLabel("FileName")),
          ScaleBarUnit: S.optional(S.String).pipe(T.HttpQuery("scale-unit")),
          Style: S.optional(S.String).pipe(T.HttpQuery("style")),
          Width: S.Number.pipe(T.HttpQuery("width")),
          Zoom: S.optional(S.Number).pipe(T.HttpQuery("zoom")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/static/{FileName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetStaticMapRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Blob: S.optional(T.Blob).pipe(T.HttpPayload()),
          ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
          CacheControl: S.optional(S.String).pipe(T.HttpHeader("Cache-Control")),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
          PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
        }),
      ).annotate({ identifier: "GetStaticMapResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Style: S.String.pipe(T.HttpLabel("Style")),
          ColorScheme: S.optional(S.String).pipe(T.HttpQuery("color-scheme")),
          PoliticalView: S.optional(SensitiveString).pipe(T.HttpQuery("political-view")),
          Terrain: S.optional(S.String).pipe(T.HttpQuery("terrain")),
          ContourDensity: S.optional(S.String).pipe(T.HttpQuery("contour-density")),
          Traffic: S.optional(S.String).pipe(T.HttpQuery("traffic")),
          TravelModes: S.optional(__S(14, __c7, 0)).pipe(T.HttpQuery("travel-modes")),
          Buildings: S.optional(S.String).pipe(T.HttpQuery("buildings")),
          PoiDensity: S.optional(S.String).pipe(T.HttpQuery("poi-density")),
          PoiCategories: S.optional(__S(14, __c7, 0)).pipe(T.HttpQuery("poi-categories")),
          Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/styles/{Style}/descriptor" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetStyleDescriptorRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AdditionalFeatures: S.optional(__S(14, __c7, 0)).pipe(T.HttpQuery("additional-features")),
          Tileset: S.String.pipe(T.HttpLabel("Tileset")),
          Z: SensitiveString.pipe(T.HttpLabel("Z")),
          X: SensitiveString.pipe(T.HttpLabel("X")),
          Y: SensitiveString.pipe(T.HttpLabel("Y")),
          Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/tiles/{Tileset}/{Z}/{X}/{Y}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTileRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
