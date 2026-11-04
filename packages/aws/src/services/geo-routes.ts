import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
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
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Geo Routes",
  serviceShapeName: "RoutesService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "geo-routes" });
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
            return e(`https://routes.geo.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e(
              `https://routes.geo-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e(
              `https://routes.geo-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e(
              `https://routes.geo.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              `https://routes.geo.${Region}.us-gov.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e(
              `https://routes.geo-fips.${Region}.us-gov.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e(
              `https://routes.geo-fips.${Region}.us-gov.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e(
              `https://routes.geo.${Region}.us-gov.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://geo-routes-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true && UseDualStack === false) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://geo-routes-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err("FIPS is enabled but this partition does not support FIPS");
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://geo-routes.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err("DualStack is enabled but this partition does not support DualStack");
          }
          return e(`https://geo-routes.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://routes.geo.{R}.{D}","properties":{},"headers":{}}',
  [
    "us-gov-west-1",
    "us-gov-east-1",
    "aws-us-gov-global",
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

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "GeoRoutes",
  service: "GeoRoutes",
  propagate: TxXray.propagate,
} as const;

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
export type SensitiveBoolean = boolean;
export interface IsolineAllowOptions {
  Hot?: boolean | undefined;
  Hov?: boolean | undefined;
}
export type TimestampWithTimezoneOffset = string | redacted.Redacted<string>;
export type BoundingBox = number[];
export type Position = number[];
export type LineString = number[][];
export interface Corridor {
  LineString: number[][];
  Radius: number;
}
export type LinearRing = number[][];
export type LinearRings = number[][][];
export type Polyline = string | redacted.Redacted<string>;
export interface PolylineCorridor {
  Polyline: string | redacted.Redacted<string>;
  Radius: number;
}
export type PolylineRing = string | redacted.Redacted<string>;
export type PolylineRingList = (string | redacted.Redacted<string>)[];
export interface IsolineAvoidanceAreaGeometry {
  BoundingBox?: number[] | undefined;
  Corridor?: Corridor | undefined;
  Polygon?: number[][][] | undefined;
  PolylineCorridor?: PolylineCorridor | undefined;
  PolylinePolygon?: (string | redacted.Redacted<string>)[] | undefined;
}
export type IsolineAvoidanceAreaGeometryList = IsolineAvoidanceAreaGeometry[];
export interface IsolineAvoidanceArea {
  Except?: IsolineAvoidanceAreaGeometry[] | undefined;
  Geometry: IsolineAvoidanceAreaGeometry;
}
export type IsolineAvoidanceAreaList = IsolineAvoidanceArea[];
export type TruckRoadType = string | redacted.Redacted<string>;
export type TruckRoadTypeList = (string | redacted.Redacted<string>)[];
export type IsolineZoneCategory =
  | "CongestionPricing"
  | "Environmental"
  | "Vignette"
  | (string & {});
export interface IsolineAvoidanceZoneCategory {
  Category?: IsolineZoneCategory | undefined;
}
export type IsolineAvoidanceZoneCategoryList = IsolineAvoidanceZoneCategory[];
export interface IsolineAvoidanceOptions {
  Areas?: IsolineAvoidanceArea[] | undefined;
  CarShuttleTrains?: boolean | undefined;
  ControlledAccessHighways?: boolean | undefined;
  DirtRoads?: boolean | undefined;
  Ferries?: boolean | undefined;
  SeasonalClosure?: boolean | undefined;
  TollRoads?: boolean | undefined;
  TollTransponders?: boolean | undefined;
  TruckRoadTypes?: (string | redacted.Redacted<string>)[] | undefined;
  Tunnels?: boolean | undefined;
  UTurns?: boolean | undefined;
  ZoneCategories?: IsolineAvoidanceZoneCategory[] | undefined;
}
export type DistanceMeters = number;
export type Heading = number;
export type SensitiveString = string | redacted.Redacted<string>;
export type MatchingStrategy = "MatchAny" | "MatchMostSignificantRoad" | (string & {});
export interface IsolineMatchingOptions {
  NameHint?: string | redacted.Redacted<string> | undefined;
  OnRoadThreshold?: number | undefined;
  Radius?: number | undefined;
  Strategy?: MatchingStrategy | undefined;
}
export type SideOfStreetMatchingStrategy = "AnyStreet" | "DividedStreetOnly" | (string & {});
export interface IsolineSideOfStreetOptions {
  Position: number[];
  UseWith?: SideOfStreetMatchingStrategy | undefined;
}
export interface IsolineDestinationOptions {
  AvoidActionsForDistance?: number | undefined;
  Heading?: number | undefined;
  Matching?: IsolineMatchingOptions | undefined;
  SideOfStreet?: IsolineSideOfStreetOptions | undefined;
}
export type GeometryFormat = "FlexiblePolyline" | "Simple" | (string & {});
export interface IsolineGranularityOptions {
  MaxPoints?: number | undefined;
  MaxResolution?: number | undefined;
}
export type ApiKey = string | redacted.Redacted<string>;
export type IsolineOptimizationObjective =
  | "AccurateCalculation"
  | "BalancedCalculation"
  | "FastCalculation"
  | (string & {});
export type RoutingObjective = "FastestRoute" | "ShortestRoute" | (string & {});
export interface IsolineOriginOptions {
  AvoidActionsForDistance?: number | undefined;
  Heading?: number | undefined;
  Matching?: IsolineMatchingOptions | undefined;
  SideOfStreet?: IsolineSideOfStreetOptions | undefined;
}
export type DistanceThresholdList = number[];
export type DurationSeconds = number;
export type TimeThresholdList = number[];
export interface IsolineThresholds {
  Distance?: number[] | undefined;
  Time?: number[] | undefined;
}
export type TrafficUsage = "IgnoreTrafficData" | "UseTrafficData" | (string & {});
export interface IsolineTrafficOptions {
  FlowEventThresholdOverride?: number | undefined;
  Usage?: TrafficUsage | undefined;
}
export type IsolineTravelMode = "Car" | "Pedestrian" | "Scooter" | "Truck" | (string & {});
export type IsolineEngineType = "Electric" | "InternalCombustion" | "PluginHybrid" | (string & {});
export interface IsolineVehicleLicensePlate {
  LastCharacter?: string | undefined;
}
export type SpeedKilometersPerHour = number;
export type SensitiveInteger = number;
export interface IsolineCarOptions {
  EngineType?: IsolineEngineType | undefined;
  LicensePlate?: IsolineVehicleLicensePlate | undefined;
  MaxSpeed?: number | undefined;
  Occupancy?: number | undefined;
}
export interface IsolineScooterOptions {
  EngineType?: IsolineEngineType | undefined;
  LicensePlate?: IsolineVehicleLicensePlate | undefined;
  MaxSpeed?: number | undefined;
  Occupancy?: number | undefined;
}
export type WeightKilograms = number;
export type IsolineHazardousCargoType =
  | "Combustible"
  | "Corrosive"
  | "Explosive"
  | "Flammable"
  | "Gas"
  | "HarmfulToWater"
  | "Organic"
  | "Other"
  | "Poison"
  | "PoisonousInhalation"
  | "Radioactive"
  | (string & {});
export type IsolineHazardousCargoTypeList = IsolineHazardousCargoType[];
export type DimensionCentimeters = number;
export interface IsolineTrailerOptions {
  AxleCount?: number | undefined;
  TrailerCount?: number | undefined;
}
export type IsolineTruckType = "LightTruck" | "StraightTruck" | "Tractor" | (string & {});
export type TunnelRestrictionCode = string | redacted.Redacted<string>;
export interface WeightPerAxleGroup {
  Single?: number | undefined;
  Tandem?: number | undefined;
  Triple?: number | undefined;
  Quad?: number | undefined;
  Quint?: number | undefined;
}
export interface IsolineTruckOptions {
  AxleCount?: number | undefined;
  EngineType?: IsolineEngineType | undefined;
  GrossWeight?: number | undefined;
  HazardousCargos?: IsolineHazardousCargoType[] | undefined;
  Height?: number | undefined;
  HeightAboveFirstAxle?: number | undefined;
  KpraLength?: number | undefined;
  Length?: number | undefined;
  LicensePlate?: IsolineVehicleLicensePlate | undefined;
  MaxSpeed?: number | undefined;
  Occupancy?: number | undefined;
  PayloadCapacity?: number | undefined;
  TireCount?: number | undefined;
  Trailer?: IsolineTrailerOptions | undefined;
  TruckType?: IsolineTruckType | undefined;
  TunnelRestrictionCode?: string | redacted.Redacted<string> | undefined;
  WeightPerAxle?: number | undefined;
  WeightPerAxleGroup?: WeightPerAxleGroup | undefined;
  Width?: number | undefined;
}
export interface IsolineTravelModeOptions {
  Car?: IsolineCarOptions | undefined;
  Scooter?: IsolineScooterOptions | undefined;
  Truck?: IsolineTruckOptions | undefined;
}
export interface CalculateIsolinesRequest {
  Allow?: IsolineAllowOptions | undefined;
  ArrivalTime?: string | redacted.Redacted<string> | undefined;
  Avoid?: IsolineAvoidanceOptions | undefined;
  DepartNow?: boolean | undefined;
  DepartureTime?: string | redacted.Redacted<string> | undefined;
  Destination?: number[] | undefined;
  DestinationOptions?: IsolineDestinationOptions | undefined;
  IsolineGeometryFormat?: GeometryFormat | undefined;
  IsolineGranularity?: IsolineGranularityOptions | undefined;
  Key?: string | redacted.Redacted<string> | undefined;
  OptimizeIsolineFor?: IsolineOptimizationObjective | undefined;
  OptimizeRoutingFor?: RoutingObjective | undefined;
  Origin?: number[] | undefined;
  OriginOptions?: IsolineOriginOptions | undefined;
  Thresholds: IsolineThresholds;
  Traffic?: IsolineTrafficOptions | undefined;
  TravelMode?: IsolineTravelMode | undefined;
  TravelModeOptions?: IsolineTravelModeOptions | undefined;
}
export interface IsolineConnectionGeometry {
  LineString?: number[][] | undefined;
  Polyline?: string | redacted.Redacted<string> | undefined;
}
export interface IsolineConnection {
  FromPolygonIndex: number;
  Geometry: IsolineConnectionGeometry;
  ToPolygonIndex: number;
}
export type IsolineConnectionList = IsolineConnection[];
export interface IsolineShapeGeometry {
  Polygon?: number[][][] | undefined;
  PolylinePolygon?: (string | redacted.Redacted<string>)[] | undefined;
}
export type IsolineShapeGeometryList = IsolineShapeGeometry[];
export interface Isoline {
  Connections: IsolineConnection[];
  DistanceThreshold?: number | undefined;
  Geometries: IsolineShapeGeometry[];
  TimeThreshold?: number | undefined;
}
export type IsolineList = Isoline[];
export interface CalculateIsolinesResponse {
  ArrivalTime?: string | redacted.Redacted<string> | undefined;
  DepartureTime?: string | redacted.Redacted<string> | undefined;
  IsolineGeometryFormat: GeometryFormat;
  Isolines: Isoline[];
  PricingBucket: string;
  SnappedDestination?: number[] | undefined;
  SnappedOrigin?: number[] | undefined;
}
export interface RouteMatrixAllowOptions {
  Hot?: boolean | undefined;
  Hov?: boolean | undefined;
}
export interface RouteMatrixAvoidanceAreaGeometry {
  BoundingBox?: number[] | undefined;
  Polygon?: number[][][] | undefined;
  PolylinePolygon?: (string | redacted.Redacted<string>)[] | undefined;
}
export interface RouteMatrixAvoidanceArea {
  Geometry: RouteMatrixAvoidanceAreaGeometry;
}
export type RouteMatrixAvoidanceAreaList = RouteMatrixAvoidanceArea[];
export type RouteMatrixZoneCategory =
  | "CongestionPricing"
  | "Environmental"
  | "Vignette"
  | (string & {});
export interface RouteMatrixAvoidanceZoneCategory {
  Category?: RouteMatrixZoneCategory | undefined;
}
export type RouteMatrixAvoidanceZoneCategoryList = RouteMatrixAvoidanceZoneCategory[];
export interface RouteMatrixAvoidanceOptions {
  Areas?: RouteMatrixAvoidanceArea[] | undefined;
  CarShuttleTrains?: boolean | undefined;
  ControlledAccessHighways?: boolean | undefined;
  DirtRoads?: boolean | undefined;
  Ferries?: boolean | undefined;
  TollRoads?: boolean | undefined;
  TollTransponders?: boolean | undefined;
  TruckRoadTypes?: (string | redacted.Redacted<string>)[] | undefined;
  Tunnels?: boolean | undefined;
  UTurns?: boolean | undefined;
  ZoneCategories?: RouteMatrixAvoidanceZoneCategory[] | undefined;
}
export interface RouteMatrixMatchingOptions {
  NameHint?: string | redacted.Redacted<string> | undefined;
  OnRoadThreshold?: number | undefined;
  Radius?: number | undefined;
  Strategy?: MatchingStrategy | undefined;
}
export interface RouteMatrixSideOfStreetOptions {
  Position: number[];
  UseWith?: SideOfStreetMatchingStrategy | undefined;
}
export interface RouteMatrixDestinationOptions {
  AvoidActionsForDistance?: number | undefined;
  Heading?: number | undefined;
  Matching?: RouteMatrixMatchingOptions | undefined;
  SideOfStreet?: RouteMatrixSideOfStreetOptions | undefined;
}
export interface RouteMatrixDestination {
  Options?: RouteMatrixDestinationOptions | undefined;
  Position: number[];
}
export type RouteMatrixDestinationList = RouteMatrixDestination[];
export type CountryCode = string | redacted.Redacted<string>;
export type CountryCodeList = (string | redacted.Redacted<string>)[];
export interface RouteMatrixExclusionOptions {
  Countries: (string | redacted.Redacted<string>)[];
}
export interface RouteMatrixOriginOptions {
  AvoidActionsForDistance?: number | undefined;
  Heading?: number | undefined;
  Matching?: RouteMatrixMatchingOptions | undefined;
  SideOfStreet?: RouteMatrixSideOfStreetOptions | undefined;
}
export interface RouteMatrixOrigin {
  Options?: RouteMatrixOriginOptions | undefined;
  Position: number[];
}
export type RouteMatrixOriginList = RouteMatrixOrigin[];
export interface RouteMatrixAutoCircle {
  Margin?: number | undefined;
  MaxRadius?: number | undefined;
}
export type SensitiveDouble = number;
export interface Circle {
  Center: number[];
  Radius: number;
}
export interface RouteMatrixBoundaryGeometry {
  AutoCircle?: RouteMatrixAutoCircle | undefined;
  Circle?: Circle | undefined;
  BoundingBox?: number[] | undefined;
  Polygon?: number[][][] | undefined;
}
export interface RouteMatrixBoundary {
  Geometry?: RouteMatrixBoundaryGeometry | undefined;
  Unbounded?: boolean | undefined;
}
export interface RouteMatrixTrafficOptions {
  FlowEventThresholdOverride?: number | undefined;
  Usage?: TrafficUsage | undefined;
}
export type RouteMatrixTravelMode = "Car" | "Pedestrian" | "Scooter" | "Truck" | (string & {});
export interface RouteMatrixVehicleLicensePlate {
  LastCharacter?: string | undefined;
}
export interface RouteMatrixCarOptions {
  LicensePlate?: RouteMatrixVehicleLicensePlate | undefined;
  MaxSpeed?: number | undefined;
  Occupancy?: number | undefined;
}
export interface RouteMatrixScooterOptions {
  LicensePlate?: RouteMatrixVehicleLicensePlate | undefined;
  MaxSpeed?: number | undefined;
  Occupancy?: number | undefined;
}
export type RouteMatrixHazardousCargoType =
  | "Combustible"
  | "Corrosive"
  | "Explosive"
  | "Flammable"
  | "Gas"
  | "HarmfulToWater"
  | "Organic"
  | "Other"
  | "Poison"
  | "PoisonousInhalation"
  | "Radioactive"
  | (string & {});
export type RouteMatrixHazardousCargoTypeList = RouteMatrixHazardousCargoType[];
export interface RouteMatrixTrailerOptions {
  TrailerCount?: number | undefined;
}
export type RouteMatrixTruckType = "LightTruck" | "StraightTruck" | "Tractor" | (string & {});
export interface RouteMatrixTruckOptions {
  AxleCount?: number | undefined;
  GrossWeight?: number | undefined;
  HazardousCargos?: RouteMatrixHazardousCargoType[] | undefined;
  Height?: number | undefined;
  KpraLength?: number | undefined;
  Length?: number | undefined;
  LicensePlate?: RouteMatrixVehicleLicensePlate | undefined;
  MaxSpeed?: number | undefined;
  Occupancy?: number | undefined;
  PayloadCapacity?: number | undefined;
  Trailer?: RouteMatrixTrailerOptions | undefined;
  TruckType?: RouteMatrixTruckType | undefined;
  TunnelRestrictionCode?: string | redacted.Redacted<string> | undefined;
  WeightPerAxle?: number | undefined;
  WeightPerAxleGroup?: WeightPerAxleGroup | undefined;
  Width?: number | undefined;
}
export interface RouteMatrixTravelModeOptions {
  Car?: RouteMatrixCarOptions | undefined;
  Scooter?: RouteMatrixScooterOptions | undefined;
  Truck?: RouteMatrixTruckOptions | undefined;
}
export interface CalculateRouteMatrixRequest {
  Allow?: RouteMatrixAllowOptions | undefined;
  Avoid?: RouteMatrixAvoidanceOptions | undefined;
  DepartNow?: boolean | undefined;
  DepartureTime?: string | redacted.Redacted<string> | undefined;
  Destinations: RouteMatrixDestination[];
  Exclude?: RouteMatrixExclusionOptions | undefined;
  Key?: string | redacted.Redacted<string> | undefined;
  OptimizeRoutingFor?: RoutingObjective | undefined;
  Origins: RouteMatrixOrigin[];
  RoutingBoundary?: RouteMatrixBoundary | undefined;
  Traffic?: RouteMatrixTrafficOptions | undefined;
  TravelMode?: RouteMatrixTravelMode | undefined;
  TravelModeOptions?: RouteMatrixTravelModeOptions | undefined;
}
export type RouteMatrixErrorCode =
  | "NoMatch"
  | "NoMatchDestination"
  | "NoMatchOrigin"
  | "NoRoute"
  | "OutOfBounds"
  | "OutOfBoundsDestination"
  | "OutOfBoundsOrigin"
  | "Other"
  | "Violation"
  | (string & {});
export interface RouteMatrixEntry {
  Distance: number;
  Duration: number;
  Error?: RouteMatrixErrorCode | undefined;
}
export type RouteMatrixRow = RouteMatrixEntry[];
export type RouteMatrix = RouteMatrixEntry[][];
export interface CalculateRouteMatrixResponse {
  ErrorCount: number;
  PricingBucket: string;
  RouteMatrix: RouteMatrixEntry[][];
  RoutingBoundary: RouteMatrixBoundary;
}
export interface RouteAllowOptions {
  Hot?: boolean | undefined;
  Hov?: boolean | undefined;
}
export interface RouteAvoidanceAreaGeometry {
  Corridor?: Corridor | undefined;
  BoundingBox?: number[] | undefined;
  Polygon?: number[][][] | undefined;
  PolylineCorridor?: PolylineCorridor | undefined;
  PolylinePolygon?: (string | redacted.Redacted<string>)[] | undefined;
}
export type RouteAvoidanceAreaGeometryList = RouteAvoidanceAreaGeometry[];
export interface RouteAvoidanceArea {
  Except?: RouteAvoidanceAreaGeometry[] | undefined;
  Geometry: RouteAvoidanceAreaGeometry;
}
export type RouteAvoidanceAreaList = RouteAvoidanceArea[];
export type RouteZoneCategory = "CongestionPricing" | "Environmental" | "Vignette" | (string & {});
export interface RouteAvoidanceZoneCategory {
  Category: RouteZoneCategory;
}
export type RouteAvoidanceZoneCategoryList = RouteAvoidanceZoneCategory[];
export interface RouteAvoidanceOptions {
  Areas?: RouteAvoidanceArea[] | undefined;
  CarShuttleTrains?: boolean | undefined;
  ControlledAccessHighways?: boolean | undefined;
  DirtRoads?: boolean | undefined;
  Ferries?: boolean | undefined;
  SeasonalClosure?: boolean | undefined;
  TollRoads?: boolean | undefined;
  TollTransponders?: boolean | undefined;
  TruckRoadTypes?: (string | redacted.Redacted<string>)[] | undefined;
  Tunnels?: boolean | undefined;
  UTurns?: boolean | undefined;
  ZoneCategories?: RouteAvoidanceZoneCategory[] | undefined;
}
export interface RouteMatchingOptions {
  NameHint?: string | redacted.Redacted<string> | undefined;
  OnRoadThreshold?: number | undefined;
  Radius?: number | undefined;
  Strategy?: MatchingStrategy | undefined;
}
export interface RouteSideOfStreetOptions {
  Position: number[];
  UseWith?: SideOfStreetMatchingStrategy | undefined;
}
export interface RouteDestinationOptions {
  AvoidActionsForDistance?: number | undefined;
  AvoidUTurns?: boolean | undefined;
  Heading?: number | undefined;
  Matching?: RouteMatchingOptions | undefined;
  SideOfStreet?: RouteSideOfStreetOptions | undefined;
  StopDuration?: number | undefined;
}
export interface RouteDriverScheduleInterval {
  DriveDuration: number;
  RestDuration: number;
}
export type RouteDriverScheduleIntervalList = RouteDriverScheduleInterval[];
export interface RouteDriverOptions {
  Schedule?: RouteDriverScheduleInterval[] | undefined;
}
export interface RouteExclusionOptions {
  Countries: (string | redacted.Redacted<string>)[];
}
export type MeasurementSystem = "Metric" | "Imperial" | (string & {});
export type LanguageTag = string;
export type LanguageTagList = string[];
export type RouteLegAdditionalFeature =
  | "Elevation"
  | "Incidents"
  | "PassThroughWaypoints"
  | "Summary"
  | "Tolls"
  | "TravelStepInstructions"
  | "TruckRoadTypes"
  | "TypicalDuration"
  | "Zones"
  | "Bookings"
  | "IntermediateStops"
  | "NextDepartures"
  | (string & {});
export type RouteLegAdditionalFeatureList = RouteLegAdditionalFeature[];
export interface RouteOriginOptions {
  AvoidActionsForDistance?: number | undefined;
  AvoidUTurns?: boolean | undefined;
  Heading?: number | undefined;
  Matching?: RouteMatchingOptions | undefined;
  SideOfStreet?: RouteSideOfStreetOptions | undefined;
}
export type RouteSpanAdditionalFeature =
  | "BestCaseDuration"
  | "CarAccess"
  | "Country"
  | "Distance"
  | "Duration"
  | "DynamicSpeed"
  | "FunctionalClassification"
  | "Gates"
  | "Incidents"
  | "Names"
  | "Notices"
  | "PedestrianAccess"
  | "RailwayCrossings"
  | "Region"
  | "RoadAttributes"
  | "RouteNumbers"
  | "ScooterAccess"
  | "SpeedLimit"
  | "TollSystems"
  | "TruckAccess"
  | "TruckRoadTypes"
  | "TypicalDuration"
  | "Zones"
  | "Consumption"
  | (string & {});
export type RouteSpanAdditionalFeatureList = RouteSpanAdditionalFeature[];
export type CurrencyCode = string;
export interface RouteEmissionType {
  Co2EmissionClass?: string | redacted.Redacted<string> | undefined;
  Type: string | redacted.Redacted<string>;
}
export type RouteTollVehicleCategory = "Minibus" | (string & {});
export interface RouteTollOptions {
  AllTransponders?: boolean | undefined;
  AllVignettes?: boolean | undefined;
  Currency?: string | undefined;
  EmissionType?: RouteEmissionType | undefined;
  VehicleCategory?: RouteTollVehicleCategory | undefined;
}
export interface RouteTrafficOptions {
  FlowEventThresholdOverride?: number | undefined;
  Usage?: TrafficUsage | undefined;
}
export type RouteTravelMode =
  | "Car"
  | "Pedestrian"
  | "Scooter"
  | "Truck"
  | "Intermodal"
  | "Transit"
  | (string & {});
export type RouteEngineType = "Electric" | "InternalCombustion" | "PluginHybrid" | (string & {});
export interface RouteVehicleLicensePlate {
  LastCharacter?: string | redacted.Redacted<string> | undefined;
}
export interface RouteCarOptions {
  EngineType?: RouteEngineType | undefined;
  LicensePlate?: RouteVehicleLicensePlate | undefined;
  MaxSpeed?: number | undefined;
  Occupancy?: number | undefined;
}
export interface RoutePedestrianOptions {
  Speed?: number | undefined;
}
export interface RouteScooterOptions {
  EngineType?: RouteEngineType | undefined;
  LicensePlate?: RouteVehicleLicensePlate | undefined;
  MaxSpeed?: number | undefined;
  Occupancy?: number | undefined;
}
export type RouteHazardousCargoType =
  | "Combustible"
  | "Corrosive"
  | "Explosive"
  | "Flammable"
  | "Gas"
  | "HarmfulToWater"
  | "Organic"
  | "Other"
  | "Poison"
  | "PoisonousInhalation"
  | "Radioactive"
  | (string & {});
export type RouteHazardousCargoTypeList = RouteHazardousCargoType[];
export interface RouteTrailerOptions {
  AxleCount?: number | undefined;
  TrailerCount?: number | undefined;
}
export type RouteTruckType = "LightTruck" | "StraightTruck" | "Tractor" | (string & {});
export interface RouteTruckOptions {
  AxleCount?: number | undefined;
  EngineType?: RouteEngineType | undefined;
  GrossWeight?: number | undefined;
  HazardousCargos?: RouteHazardousCargoType[] | undefined;
  Height?: number | undefined;
  HeightAboveFirstAxle?: number | undefined;
  KpraLength?: number | undefined;
  Length?: number | undefined;
  LicensePlate?: RouteVehicleLicensePlate | undefined;
  MaxSpeed?: number | undefined;
  Occupancy?: number | undefined;
  PayloadCapacity?: number | undefined;
  TireCount?: number | undefined;
  Trailer?: RouteTrailerOptions | undefined;
  TruckType?: RouteTruckType | undefined;
  TunnelRestrictionCode?: string | redacted.Redacted<string> | undefined;
  WeightPerAxle?: number | undefined;
  WeightPerAxleGroup?: WeightPerAxleGroup | undefined;
  Width?: number | undefined;
}
export type RouteAccessibilityAttribute = "Wheelchair" | (string & {});
export type RouteAccessibilityAttributeList = RouteAccessibilityAttribute[];
export interface RouteIntermodalPedestrianOptions {
  MaxDistance?: number | undefined;
  Speed?: number | undefined;
}
export type RouteRentalMode = "All" | "Car" | (string & {});
export type RouteRentalModeList = RouteRentalMode[];
export type RouteIntermodalEnabledLegs =
  | "FirstLeg"
  | "LastLeg"
  | "EntireRoute"
  | "None"
  | (string & {});
export type RouteIntermodalEnabledLegsList = RouteIntermodalEnabledLegs[];
export interface RouteIntermodalRentalOptions {
  AllowedModes?: RouteRentalMode[] | undefined;
  EnabledFor?: RouteIntermodalEnabledLegs[] | undefined;
  ExcludedModes?: RouteRentalMode[] | undefined;
}
export type RouteTaxiMode = "All" | "Car" | (string & {});
export type RouteTaxiModeList = RouteTaxiMode[];
export interface RouteIntermodalTaxiOptions {
  AllowedModes?: RouteTaxiMode[] | undefined;
  EnabledFor?: RouteIntermodalEnabledLegs[] | undefined;
  ExcludedModes?: RouteTaxiMode[] | undefined;
}
export type RouteTransitMode =
  | "AerialTramway"
  | "Airplane"
  | "All"
  | "Bus"
  | "BusRapidTransit"
  | "CityTrain"
  | "Ferry"
  | "FunicularRailway"
  | "HighSpeedTrain"
  | "IntercityTrain"
  | "InterregionalTrain"
  | "LightRail"
  | "Monorail"
  | "PrivateBus"
  | "RegionalTrain"
  | "Subway"
  | (string & {});
export type RouteTransitModeList = RouteTransitMode[];
export interface RouteIntermodalTransitOptions {
  AllowedModes?: RouteTransitMode[] | undefined;
  EnabledFor?: RouteIntermodalEnabledLegs[] | undefined;
  ExcludedModes?: RouteTransitMode[] | undefined;
}
export type RouteVehicleMode = "All" | "Car" | (string & {});
export type RouteVehicleModeList = RouteVehicleMode[];
export interface RouteIntermodalVehicleOptions {
  AllowedModes?: RouteVehicleMode[] | undefined;
  EnabledFor?: RouteIntermodalEnabledLegs[] | undefined;
  ExcludedModes?: RouteVehicleMode[] | undefined;
}
export interface RouteIntermodalOptions {
  AccessibilityAttributes?: RouteAccessibilityAttribute[] | undefined;
  MaxTransfers?: number | undefined;
  Pedestrian?: RouteIntermodalPedestrianOptions | undefined;
  Rental?: RouteIntermodalRentalOptions | undefined;
  Taxi?: RouteIntermodalTaxiOptions | undefined;
  Transit?: RouteIntermodalTransitOptions | undefined;
  Vehicle?: RouteIntermodalVehicleOptions | undefined;
}
export interface RouteTransitPedestrianOptions {
  MaxDistance?: number | undefined;
  Speed?: number | undefined;
}
export interface RouteTransitOptions {
  AccessibilityAttributes?: RouteAccessibilityAttribute[] | undefined;
  AllowedModes?: RouteTransitMode[] | undefined;
  ExcludedModes?: RouteTransitMode[] | undefined;
  MaxTransfers?: number | undefined;
  Pedestrian?: RouteTransitPedestrianOptions | undefined;
}
export interface RouteTravelModeOptions {
  Car?: RouteCarOptions | undefined;
  Pedestrian?: RoutePedestrianOptions | undefined;
  Scooter?: RouteScooterOptions | undefined;
  Truck?: RouteTruckOptions | undefined;
  Intermodal?: RouteIntermodalOptions | undefined;
  Transit?: RouteTransitOptions | undefined;
}
export type RouteTravelStepType = "Default" | "TurnByTurn" | (string & {});
export interface RouteWaypoint {
  AvoidActionsForDistance?: number | undefined;
  AvoidUTurns?: boolean | undefined;
  Heading?: number | undefined;
  Matching?: RouteMatchingOptions | undefined;
  PassThrough?: boolean | undefined;
  Position: number[];
  SideOfStreet?: RouteSideOfStreetOptions | undefined;
  StopDuration?: number | undefined;
}
export type RouteWaypointList = RouteWaypoint[];
export interface CalculateRoutesRequest {
  Allow?: RouteAllowOptions | undefined;
  ArrivalTime?: string | redacted.Redacted<string> | undefined;
  Avoid?: RouteAvoidanceOptions | undefined;
  DepartNow?: boolean | undefined;
  DepartureTime?: string | redacted.Redacted<string> | undefined;
  Destination: number[];
  DestinationOptions?: RouteDestinationOptions | undefined;
  Driver?: RouteDriverOptions | undefined;
  Exclude?: RouteExclusionOptions | undefined;
  InstructionsMeasurementSystem?: MeasurementSystem | undefined;
  Key?: string | redacted.Redacted<string> | undefined;
  Languages?: string[] | undefined;
  LegAdditionalFeatures?: RouteLegAdditionalFeature[] | undefined;
  LegGeometryFormat?: GeometryFormat | undefined;
  MaxAlternatives?: number | undefined;
  OptimizeRoutingFor?: RoutingObjective | undefined;
  Origin: number[];
  OriginOptions?: RouteOriginOptions | undefined;
  SpanAdditionalFeatures?: RouteSpanAdditionalFeature[] | undefined;
  Tolls?: RouteTollOptions | undefined;
  Traffic?: RouteTrafficOptions | undefined;
  TravelMode?: RouteTravelMode | undefined;
  TravelModeOptions?: RouteTravelModeOptions | undefined;
  TravelStepType?: RouteTravelStepType | undefined;
  Waypoints?: RouteWaypoint[] | undefined;
}
export type RouteResponseNoticeCode =
  | "MainLanguageNotFound"
  | "Other"
  | "TravelTimeExceedsDriverWorkHours"
  | "TransitDataUnavailable"
  | "TransitRouteUnavailable"
  | "NoTransitStationsFound"
  | (string & {});
export type RouteNoticeImpact = "High" | "Low" | (string & {});
export interface RouteResponseNotice {
  Code: RouteResponseNoticeCode;
  Impact?: RouteNoticeImpact | undefined;
}
export type RouteResponseNoticeList = RouteResponseNotice[];
export type RouteFerryAfterTravelStepType = "Deboard" | (string & {});
export interface RouteFerryAfterTravelStep {
  Duration: number;
  Instruction?: string | redacted.Redacted<string> | undefined;
  Type: RouteFerryAfterTravelStepType;
}
export type RouteFerryAfterTravelStepList = RouteFerryAfterTravelStep[];
export type Position23 = number[];
export interface RouteFerryPlace {
  Name?: string | redacted.Redacted<string> | undefined;
  OriginalPosition?: number[] | undefined;
  Position: number[];
  WaypointIndex?: number | undefined;
}
export interface RouteFerryArrival {
  Place: RouteFerryPlace;
  Time?: string | redacted.Redacted<string> | undefined;
}
export type RouteFerryBeforeTravelStepType = "Board" | (string & {});
export interface RouteFerryBeforeTravelStep {
  Duration: number;
  Instruction?: string | redacted.Redacted<string> | undefined;
  Type: RouteFerryBeforeTravelStepType;
}
export type RouteFerryBeforeTravelStepList = RouteFerryBeforeTravelStep[];
export interface RouteFerryDeparture {
  Place: RouteFerryPlace;
  Time?: string | redacted.Redacted<string> | undefined;
}
export type RouteFerryNoticeCode =
  | "AccuratePolylineUnavailable"
  | "NoSchedule"
  | "Other"
  | "ViolatedAvoidFerry"
  | "ViolatedAvoidRailFerry"
  | "SeasonalClosure"
  | "PotentialViolatedVehicleRestrictionUsage"
  | "ViolatedAvoidAreas"
  | "ViolatedVehicleRestriction"
  | (string & {});
export interface RouteFerryNotice {
  Code: RouteFerryNoticeCode;
  Impact?: RouteNoticeImpact | undefined;
}
export type RouteFerryNoticeList = RouteFerryNotice[];
export interface RoutePassThroughPlace {
  OriginalPosition?: number[] | undefined;
  Position: number[];
  WaypointIndex?: number | undefined;
}
export interface RoutePassThroughWaypoint {
  GeometryOffset?: number | undefined;
  Place: RoutePassThroughPlace;
}
export type RoutePassThroughWaypointList = RoutePassThroughWaypoint[];
export type CountryCode3 = string | redacted.Redacted<string>;
export interface LocalizedString {
  Language?: string | undefined;
  Value: string | redacted.Redacted<string>;
}
export type LocalizedStringList = LocalizedString[];
export interface RouteFerrySpan {
  Country?: string | redacted.Redacted<string> | undefined;
  Distance?: number | undefined;
  Duration?: number | undefined;
  GeometryOffset?: number | undefined;
  Names?: LocalizedString[] | undefined;
  Region?: string | redacted.Redacted<string> | undefined;
}
export type RouteFerrySpanList = RouteFerrySpan[];
export interface RouteFerryOverviewSummary {
  Distance: number;
  Duration: number;
}
export interface RouteFerryTravelOnlySummary {
  Duration: number;
}
export interface RouteFerrySummary {
  Overview?: RouteFerryOverviewSummary | undefined;
  TravelOnly?: RouteFerryTravelOnlySummary | undefined;
}
export type RouteFerryTravelStepType = "Depart" | "Continue" | "Arrive" | (string & {});
export interface RouteFerryTravelStep {
  Distance?: number | undefined;
  Duration: number;
  GeometryOffset?: number | undefined;
  Instruction?: string | redacted.Redacted<string> | undefined;
  Type: RouteFerryTravelStepType;
}
export type RouteFerryTravelStepList = RouteFerryTravelStep[];
export interface RouteFerryLegDetails {
  AfterTravelSteps?: RouteFerryAfterTravelStep[] | undefined;
  Arrival: RouteFerryArrival;
  BeforeTravelSteps?: RouteFerryBeforeTravelStep[] | undefined;
  Departure: RouteFerryDeparture;
  Notices?: RouteFerryNotice[] | undefined;
  PassThroughWaypoints?: RoutePassThroughWaypoint[] | undefined;
  RouteName?: string | redacted.Redacted<string> | undefined;
  Spans?: RouteFerrySpan[] | undefined;
  Summary?: RouteFerrySummary | undefined;
  TravelSteps?: RouteFerryTravelStep[] | undefined;
}
export interface RouteLegGeometry {
  LineString?: number[][] | undefined;
  Polyline?: string | redacted.Redacted<string> | undefined;
}
export type RoutePedestrianAfterTravelStepType = "Wait" | (string & {});
export interface RoutePedestrianAfterTravelStep {
  Duration: number;
  Instruction?: string | redacted.Redacted<string> | undefined;
  Type: RoutePedestrianAfterTravelStepType;
}
export type RoutePedestrianAfterTravelStepList = RoutePedestrianAfterTravelStep[];
export type RouteAccessibilityAvailability =
  | "Available"
  | "Limited"
  | "Unavailable"
  | "Unknown"
  | (string & {});
export interface RouteAccessibilityAvailabilityDetails {
  Wheelchair?: RouteAccessibilityAvailability | undefined;
}
export interface RouteAccessPointDetails {
  Accessibility?: RouteAccessibilityAvailabilityDetails | undefined;
}
export type RouteSideOfStreet = "Left" | "Right" | (string & {});
export interface RouteStationDetails {
  Accessibility?: RouteAccessibilityAvailabilityDetails | undefined;
  PlatformName?: string | redacted.Redacted<string> | undefined;
  ShortName?: string | redacted.Redacted<string> | undefined;
}
export type RoutePedestrianPlaceType =
  | "AccessPoint"
  | "DockingStation"
  | "ParkingLot"
  | "Station"
  | (string & {});
export interface RoutePedestrianPlace {
  AccessPointDetails?: RouteAccessPointDetails | undefined;
  Name?: string | redacted.Redacted<string> | undefined;
  OriginalPosition?: number[] | undefined;
  Position: number[];
  SideOfStreet?: RouteSideOfStreet | undefined;
  StationDetails?: RouteStationDetails | undefined;
  Type?: RoutePedestrianPlaceType | undefined;
  WaypointIndex?: number | undefined;
}
export interface RoutePedestrianArrival {
  Place: RoutePedestrianPlace;
  Time?: string | redacted.Redacted<string> | undefined;
}
export interface RoutePedestrianDeparture {
  Place: RoutePedestrianPlace;
  Time?: string | redacted.Redacted<string> | undefined;
}
export type RoutePedestrianNoticeCode =
  | "AccuratePolylineUnavailable"
  | "Other"
  | "ViolatedAvoidDirtRoad"
  | "ViolatedAvoidTunnel"
  | "ViolatedPedestrianOption"
  | "ViolatedAvoidAreas"
  | (string & {});
export interface RoutePedestrianNotice {
  Code: RoutePedestrianNoticeCode;
  Impact?: RouteNoticeImpact | undefined;
}
export type RoutePedestrianNoticeList = RoutePedestrianNotice[];
export interface RouteSpanDynamicSpeedDetails {
  BestCaseSpeed?: number | undefined;
  TurnDuration?: number | undefined;
  TypicalSpeed?: number | undefined;
}
export type IndexList = number[];
export type RouteSpanPedestrianAccessAttribute =
  | "Allowed"
  | "Indoors"
  | "NoThroughTraffic"
  | "Park"
  | "Stairs"
  | "TollRoad"
  | (string & {});
export type RouteSpanPedestrianAccessAttributeList = RouteSpanPedestrianAccessAttribute[];
export type RouteSpanRoadAttribute =
  | "Bridge"
  | "BuiltUpArea"
  | "ControlledAccessHighway"
  | "DirtRoad"
  | "DividedRoad"
  | "Motorway"
  | "PrivateRoad"
  | "Ramp"
  | "RightHandTraffic"
  | "Roundabout"
  | "Tunnel"
  | "UnderConstruction"
  | (string & {});
export type RouteSpanRoadAttributeList = RouteSpanRoadAttribute[];
export type RouteDirection = "East" | "North" | "South" | "West" | (string & {});
export interface RouteNumber {
  Direction?: RouteDirection | undefined;
  Language?: string | undefined;
  Value: string | redacted.Redacted<string>;
}
export type RouteNumberList = RouteNumber[];
export interface RouteSpanSpeedLimitDetails {
  MaxSpeed?: number | undefined;
  Unlimited?: boolean | undefined;
}
export interface RoutePedestrianSpan {
  BestCaseDuration?: number | undefined;
  Country?: string | redacted.Redacted<string> | undefined;
  Distance?: number | undefined;
  Duration?: number | undefined;
  DynamicSpeed?: RouteSpanDynamicSpeedDetails | undefined;
  FunctionalClassification?: number | undefined;
  GeometryOffset?: number | undefined;
  Incidents?: number[] | undefined;
  Names?: LocalizedString[] | undefined;
  PedestrianAccess?: RouteSpanPedestrianAccessAttribute[] | undefined;
  Region?: string | redacted.Redacted<string> | undefined;
  RoadAttributes?: RouteSpanRoadAttribute[] | undefined;
  RouteNumbers?: RouteNumber[] | undefined;
  SpeedLimit?: RouteSpanSpeedLimitDetails | undefined;
  TypicalDuration?: number | undefined;
}
export type RoutePedestrianSpanList = RoutePedestrianSpan[];
export interface RoutePedestrianOverviewSummary {
  Distance: number;
  Duration: number;
}
export interface RoutePedestrianTravelOnlySummary {
  Duration: number;
}
export interface RoutePedestrianSummary {
  Overview?: RoutePedestrianOverviewSummary | undefined;
  TravelOnly?: RoutePedestrianTravelOnlySummary | undefined;
}
export interface RouteContinueStepDetails {
  Intersection: LocalizedString[];
}
export type RouteRoadType = "Highway" | "Rural" | "Urban" | (string & {});
export interface RouteRoad {
  RoadName: LocalizedString[];
  RouteNumber: RouteNumber[];
  Towards: LocalizedString[];
  Type?: RouteRoadType | undefined;
}
export type RouteSteeringDirection = "Left" | "Right" | "Straight" | (string & {});
export type TurnAngle = number;
export type RouteTurnIntensity = "Sharp" | "Slight" | "Typical" | (string & {});
export interface RouteKeepStepDetails {
  Intersection: LocalizedString[];
  SteeringDirection?: RouteSteeringDirection | undefined;
  TurnAngle?: number | undefined;
  TurnIntensity?: RouteTurnIntensity | undefined;
}
export interface RouteRoundaboutEnterStepDetails {
  Intersection: LocalizedString[];
  SteeringDirection?: RouteSteeringDirection | undefined;
  TurnAngle?: number | undefined;
  TurnIntensity?: RouteTurnIntensity | undefined;
}
export type RoundaboutAngle = number;
export interface RouteRoundaboutExitStepDetails {
  Intersection: LocalizedString[];
  RelativeExit?: number | undefined;
  RoundaboutAngle?: number | undefined;
  SteeringDirection?: RouteSteeringDirection | undefined;
}
export interface RouteRoundaboutPassStepDetails {
  Intersection: LocalizedString[];
  SteeringDirection?: RouteSteeringDirection | undefined;
  TurnAngle?: number | undefined;
  TurnIntensity?: RouteTurnIntensity | undefined;
}
export interface RouteSignpostLabel {
  RouteNumber?: RouteNumber | undefined;
  Text?: LocalizedString | undefined;
}
export type RouteSignpostLabelList = RouteSignpostLabel[];
export interface RouteSignpost {
  Labels: RouteSignpostLabel[];
}
export interface RouteTurnStepDetails {
  Intersection: LocalizedString[];
  SteeringDirection?: RouteSteeringDirection | undefined;
  TurnAngle?: number | undefined;
  TurnIntensity?: RouteTurnIntensity | undefined;
}
export type RoutePedestrianTravelStepType =
  | "Arrive"
  | "Continue"
  | "Depart"
  | "Keep"
  | "RoundaboutEnter"
  | "RoundaboutExit"
  | "RoundaboutPass"
  | "Turn"
  | (string & {});
export interface RoutePedestrianTravelStep {
  ContinueStepDetails?: RouteContinueStepDetails | undefined;
  CurrentRoad?: RouteRoad | undefined;
  Distance?: number | undefined;
  Duration: number;
  ExitNumber?: LocalizedString[] | undefined;
  GeometryOffset?: number | undefined;
  Instruction?: string | redacted.Redacted<string> | undefined;
  KeepStepDetails?: RouteKeepStepDetails | undefined;
  NextRoad?: RouteRoad | undefined;
  RoundaboutEnterStepDetails?: RouteRoundaboutEnterStepDetails | undefined;
  RoundaboutExitStepDetails?: RouteRoundaboutExitStepDetails | undefined;
  RoundaboutPassStepDetails?: RouteRoundaboutPassStepDetails | undefined;
  Signpost?: RouteSignpost | undefined;
  TurnStepDetails?: RouteTurnStepDetails | undefined;
  Type: RoutePedestrianTravelStepType;
}
export type RoutePedestrianTravelStepList = RoutePedestrianTravelStep[];
export interface RoutePedestrianLegDetails {
  AfterTravelSteps?: RoutePedestrianAfterTravelStep[] | undefined;
  Arrival: RoutePedestrianArrival;
  Departure: RoutePedestrianDeparture;
  Notices?: RoutePedestrianNotice[] | undefined;
  PassThroughWaypoints?: RoutePassThroughWaypoint[] | undefined;
  Spans?: RoutePedestrianSpan[] | undefined;
  Summary?: RoutePedestrianSummary | undefined;
  TravelSteps?: RoutePedestrianTravelStep[] | undefined;
}
export type RouteLegTravelMode =
  | "Car"
  | "Ferry"
  | "Pedestrian"
  | "Scooter"
  | "Truck"
  | "CarShuttleTrain"
  | "AerialTramway"
  | "Airplane"
  | "Bus"
  | "BusRapidTransit"
  | "CityTrain"
  | "FunicularRailway"
  | "HighSpeedTrain"
  | "IntercityTrain"
  | "InterregionalTrain"
  | "LightRail"
  | "Monorail"
  | "PrivateBus"
  | "RegionalTrain"
  | "Subway"
  | (string & {});
export type RouteLegType =
  | "Ferry"
  | "Pedestrian"
  | "Vehicle"
  | "Rental"
  | "Taxi"
  | "Transit"
  | (string & {});
export type EnergyKilowattHours = number;
export type PowerKilowatts = number;
export interface RouteChargeStepDetails {
  ArrivalCharge?: number | undefined;
  ConsumablePower?: number | undefined;
  DesiredCharge?: number | undefined;
}
export type RouteVehicleAfterTravelStepType = "Park" | (string & {});
export interface RouteVehicleAfterTravelStep {
  ChargeStepDetails?: RouteChargeStepDetails | undefined;
  Duration: number;
  Instruction?: string | redacted.Redacted<string> | undefined;
  Type: RouteVehicleAfterTravelStepType;
}
export type RouteVehicleAfterTravelStepList = RouteVehicleAfterTravelStep[];
export type RouteVehiclePlaceType =
  | "AccessPoint"
  | "DockingStation"
  | "ParkingLot"
  | "Station"
  | (string & {});
export interface RouteVehiclePlace {
  Name?: string | redacted.Redacted<string> | undefined;
  OriginalPosition?: number[] | undefined;
  Position: number[];
  SideOfStreet?: RouteSideOfStreet | undefined;
  WaypointIndex?: number | undefined;
  AccessPointDetails?: RouteAccessPointDetails | undefined;
  StationDetails?: RouteStationDetails | undefined;
  Type?: RouteVehiclePlaceType | undefined;
}
export interface RouteVehicleArrival {
  Place: RouteVehiclePlace;
  Time?: string | redacted.Redacted<string> | undefined;
}
export interface RouteVehicleDeparture {
  Place: RouteVehiclePlace;
  Time?: string | redacted.Redacted<string> | undefined;
}
export type RouteVehicleIncidentSeverity = "Critical" | "High" | "Medium" | "Low" | (string & {});
export type RouteVehicleIncidentType =
  | "Accident"
  | "Congestion"
  | "Construction"
  | "DisabledVehicle"
  | "LaneRestriction"
  | "MassTransit"
  | "Other"
  | "PlannedEvent"
  | "RoadClosure"
  | "RoadHazard"
  | "Weather"
  | (string & {});
export interface RouteVehicleIncident {
  Description?: string | redacted.Redacted<string> | undefined;
  EndTime?: string | redacted.Redacted<string> | undefined;
  Severity?: RouteVehicleIncidentSeverity | undefined;
  StartTime?: string | redacted.Redacted<string> | undefined;
  Type?: RouteVehicleIncidentType | undefined;
}
export type RouteVehicleIncidentList = RouteVehicleIncident[];
export type RouteVehicleNoticeCode =
  | "AccuratePolylineUnavailable"
  | "Other"
  | "PotentialViolatedAvoidTollRoadUsage"
  | "PotentialViolatedCarpoolUsage"
  | "PotentialViolatedTurnRestrictionUsage"
  | "PotentialViolatedVehicleRestrictionUsage"
  | "PotentialViolatedZoneRestrictionUsage"
  | "SeasonalClosure"
  | "TollsDataTemporarilyUnavailable"
  | "TollsDataUnavailable"
  | "TollTransponder"
  | "ViolatedAvoidControlledAccessHighway"
  | "ViolatedAvoidDifficultTurns"
  | "ViolatedAvoidDirtRoad"
  | "ViolatedAvoidSeasonalClosure"
  | "ViolatedAvoidTollRoad"
  | "ViolatedAvoidTollTransponder"
  | "ViolatedAvoidTruckRoadType"
  | "ViolatedAvoidTunnel"
  | "ViolatedAvoidUTurns"
  | "ViolatedBlockedRoad"
  | "ViolatedCarpool"
  | "ViolatedEmergencyGate"
  | "ViolatedStartDirection"
  | "ViolatedTurnRestriction"
  | "ViolatedVehicleRestriction"
  | "ViolatedZoneRestriction"
  | "TravelTimeExceedsDriverWorkHours"
  | (string & {});
export interface RouteNoticeDetailRange {
  Min?: number | undefined;
  Max?: number | undefined;
}
export type RouteWeightConstraintType = "Current" | "Gross" | "Unknown" | (string & {});
export interface RouteWeightConstraint {
  Type: RouteWeightConstraintType;
  Value: number;
}
export interface RouteViolatedConstraints {
  AllHazardsRestricted?: boolean | undefined;
  AxleCount?: RouteNoticeDetailRange | undefined;
  HazardousCargos: RouteHazardousCargoType[];
  MaxHeight?: number | undefined;
  MaxKpraLength?: number | undefined;
  MaxLength?: number | undefined;
  MaxPayloadCapacity?: number | undefined;
  MaxWeight?: RouteWeightConstraint | undefined;
  MaxWeightPerAxle?: number | undefined;
  MaxWeightPerAxleGroup?: WeightPerAxleGroup | undefined;
  MaxWidth?: number | undefined;
  Occupancy?: RouteNoticeDetailRange | undefined;
  RestrictedTimes?: string | undefined;
  TimeDependent?: boolean | undefined;
  TrailerCount?: RouteNoticeDetailRange | undefined;
  TravelMode?: boolean | undefined;
  TruckRoadType?: string | undefined;
  TruckType?: RouteTruckType | undefined;
  TunnelRestrictionCode?: string | redacted.Redacted<string> | undefined;
}
export interface RouteVehicleNoticeDetail {
  Title?: string | redacted.Redacted<string> | undefined;
  ViolatedConstraints?: RouteViolatedConstraints | undefined;
}
export type RouteVehicleNoticeDetailList = RouteVehicleNoticeDetail[];
export interface RouteVehicleNotice {
  Code: RouteVehicleNoticeCode;
  Details: RouteVehicleNoticeDetail[];
  Impact?: RouteNoticeImpact | undefined;
}
export type RouteVehicleNoticeList = RouteVehicleNotice[];
export type RouteSpanCarAccessAttribute =
  | "Allowed"
  | "NoThroughTraffic"
  | "TollRoad"
  | (string & {});
export type RouteSpanCarAccessAttributeList = RouteSpanCarAccessAttribute[];
export type RouteSpanGateAttribute =
  | "Emergency"
  | "KeyAccess"
  | "PermissionRequired"
  | (string & {});
export type RouteSpanRailwayCrossingAttribute = "Protected" | "Unprotected" | (string & {});
export type RouteSpanScooterAccessAttribute =
  | "Allowed"
  | "NoThroughTraffic"
  | "TollRoad"
  | (string & {});
export type RouteSpanScooterAccessAttributeList = RouteSpanScooterAccessAttribute[];
export type RouteSpanTruckAccessAttribute =
  | "Allowed"
  | "NoThroughTraffic"
  | "TollRoad"
  | (string & {});
export type RouteSpanTruckAccessAttributeList = RouteSpanTruckAccessAttribute[];
export interface RouteVehicleSpan {
  BestCaseDuration?: number | undefined;
  CarAccess?: RouteSpanCarAccessAttribute[] | undefined;
  Country?: string | redacted.Redacted<string> | undefined;
  Distance?: number | undefined;
  Duration?: number | undefined;
  DynamicSpeed?: RouteSpanDynamicSpeedDetails | undefined;
  FunctionalClassification?: number | undefined;
  Gate?: RouteSpanGateAttribute | undefined;
  GeometryOffset?: number | undefined;
  Incidents?: number[] | undefined;
  Names?: LocalizedString[] | undefined;
  Notices?: number[] | undefined;
  RailwayCrossing?: RouteSpanRailwayCrossingAttribute | undefined;
  Region?: string | redacted.Redacted<string> | undefined;
  RoadAttributes?: RouteSpanRoadAttribute[] | undefined;
  RouteNumbers?: RouteNumber[] | undefined;
  ScooterAccess?: RouteSpanScooterAccessAttribute[] | undefined;
  SpeedLimit?: RouteSpanSpeedLimitDetails | undefined;
  TollSystems?: number[] | undefined;
  TruckAccess?: RouteSpanTruckAccessAttribute[] | undefined;
  TruckRoadTypes?: number[] | undefined;
  TypicalDuration?: number | undefined;
  Zones?: number[] | undefined;
}
export type RouteVehicleSpanList = RouteVehicleSpan[];
export interface RouteVehicleOverviewSummary {
  BestCaseDuration?: number | undefined;
  Distance: number;
  Duration: number;
  TypicalDuration?: number | undefined;
}
export interface RouteVehicleTravelOnlySummary {
  BestCaseDuration?: number | undefined;
  Duration: number;
  TypicalDuration?: number | undefined;
}
export interface RouteVehicleSummary {
  Overview?: RouteVehicleOverviewSummary | undefined;
  TravelOnly?: RouteVehicleTravelOnlySummary | undefined;
}
export interface RouteTollPaymentSite {
  Name?: string | undefined;
  Position: number[];
}
export type RouteTollPaymentSiteList = RouteTollPaymentSite[];
export interface RouteTollPriceValueRange {
  Min: number;
  Max: number;
}
export interface RouteTollPrice {
  Currency: string;
  Estimate: boolean;
  PerDuration?: number | undefined;
  Range: boolean;
  RangeValue?: RouteTollPriceValueRange | undefined;
  Value: number;
}
export type RouteTollPassValidityPeriodType =
  | "Annual"
  | "Days"
  | "ExtendedAnnual"
  | "Minutes"
  | "Months"
  | (string & {});
export interface RouteTollPassValidityPeriod {
  Period: RouteTollPassValidityPeriodType;
  PeriodCount?: number | undefined;
}
export interface RouteTollPass {
  IncludesReturnTrip?: boolean | undefined;
  SeniorPass?: boolean | undefined;
  TransferCount?: number | undefined;
  TripCount?: number | undefined;
  ValidityPeriod?: RouteTollPassValidityPeriod | undefined;
}
export type RouteTollPaymentMethod =
  | "BankCard"
  | "Cash"
  | "CashExact"
  | "CreditCard"
  | "PassSubscription"
  | "TravelCard"
  | "Transponder"
  | "VideoToll"
  | (string & {});
export type RouteTollPaymentMethodList = RouteTollPaymentMethod[];
export interface RouteTransponder {
  SystemName?: string | redacted.Redacted<string> | undefined;
}
export type RouteTransponderList = RouteTransponder[];
export interface RouteTollRate {
  ApplicableTimes?: string | redacted.Redacted<string> | undefined;
  ConvertedPrice?: RouteTollPrice | undefined;
  Id: string | redacted.Redacted<string>;
  LocalPrice: RouteTollPrice;
  Name: string | redacted.Redacted<string>;
  Pass?: RouteTollPass | undefined;
  PaymentMethods: RouteTollPaymentMethod[];
  Transponders: RouteTransponder[];
}
export type RouteTollRateList = RouteTollRate[];
export interface RouteToll {
  Country?: string | redacted.Redacted<string> | undefined;
  PaymentSites: RouteTollPaymentSite[];
  Rates: RouteTollRate[];
  Systems: number[];
}
export type RouteTollList = RouteToll[];
export interface RouteTollSystem {
  Name?: string | redacted.Redacted<string> | undefined;
}
export type RouteTollSystemList = RouteTollSystem[];
export interface RouteContinueHighwayStepDetails {
  Intersection: LocalizedString[];
  SteeringDirection?: RouteSteeringDirection | undefined;
  TurnAngle?: number | undefined;
  TurnIntensity?: RouteTurnIntensity | undefined;
}
export interface RouteEnterHighwayStepDetails {
  Intersection: LocalizedString[];
  SteeringDirection?: RouteSteeringDirection | undefined;
  TurnAngle?: number | undefined;
  TurnIntensity?: RouteTurnIntensity | undefined;
}
export interface RouteExitStepDetails {
  Intersection: LocalizedString[];
  RelativeExit?: number | undefined;
  SteeringDirection?: RouteSteeringDirection | undefined;
  TurnAngle?: number | undefined;
  TurnIntensity?: RouteTurnIntensity | undefined;
}
export interface RouteRampStepDetails {
  Intersection: LocalizedString[];
  SteeringDirection?: RouteSteeringDirection | undefined;
  TurnAngle?: number | undefined;
  TurnIntensity?: RouteTurnIntensity | undefined;
}
export type RouteVehicleTravelStepType =
  | "Arrive"
  | "Continue"
  | "ContinueHighway"
  | "Depart"
  | "EnterHighway"
  | "Exit"
  | "Keep"
  | "Ramp"
  | "RoundaboutEnter"
  | "RoundaboutExit"
  | "RoundaboutPass"
  | "Turn"
  | "UTurn"
  | (string & {});
export interface RouteUTurnStepDetails {
  Intersection: LocalizedString[];
  SteeringDirection?: RouteSteeringDirection | undefined;
  TurnAngle?: number | undefined;
  TurnIntensity?: RouteTurnIntensity | undefined;
}
export interface RouteVehicleTravelStep {
  ContinueHighwayStepDetails?: RouteContinueHighwayStepDetails | undefined;
  ContinueStepDetails?: RouteContinueStepDetails | undefined;
  CurrentRoad?: RouteRoad | undefined;
  Distance?: number | undefined;
  Duration: number;
  EnterHighwayStepDetails?: RouteEnterHighwayStepDetails | undefined;
  ExitNumber?: LocalizedString[] | undefined;
  ExitStepDetails?: RouteExitStepDetails | undefined;
  GeometryOffset?: number | undefined;
  Instruction?: string | redacted.Redacted<string> | undefined;
  KeepStepDetails?: RouteKeepStepDetails | undefined;
  NextRoad?: RouteRoad | undefined;
  RampStepDetails?: RouteRampStepDetails | undefined;
  RoundaboutEnterStepDetails?: RouteRoundaboutEnterStepDetails | undefined;
  RoundaboutExitStepDetails?: RouteRoundaboutExitStepDetails | undefined;
  RoundaboutPassStepDetails?: RouteRoundaboutPassStepDetails | undefined;
  Signpost?: RouteSignpost | undefined;
  TurnStepDetails?: RouteTurnStepDetails | undefined;
  Type: RouteVehicleTravelStepType;
  UTurnStepDetails?: RouteUTurnStepDetails | undefined;
}
export type RouteVehicleTravelStepList = RouteVehicleTravelStep[];
export interface RouteZone {
  Category?: RouteZoneCategory | undefined;
  Name?: string | redacted.Redacted<string> | undefined;
}
export type RouteZoneList = RouteZone[];
export interface RouteVehicleLegDetails {
  AfterTravelSteps?: RouteVehicleAfterTravelStep[] | undefined;
  Arrival: RouteVehicleArrival;
  Departure: RouteVehicleDeparture;
  Incidents?: RouteVehicleIncident[] | undefined;
  Notices?: RouteVehicleNotice[] | undefined;
  PassThroughWaypoints?: RoutePassThroughWaypoint[] | undefined;
  Spans?: RouteVehicleSpan[] | undefined;
  Summary?: RouteVehicleSummary | undefined;
  Tolls?: RouteToll[] | undefined;
  TollSystems?: RouteTollSystem[] | undefined;
  TravelSteps?: RouteVehicleTravelStep[] | undefined;
  TruckRoadTypes?: (string | redacted.Redacted<string>)[] | undefined;
  Zones?: RouteZone[] | undefined;
}
export type RouteRentalAfterTravelStepType = "Park" | (string & {});
export interface RouteRentalAfterTravelStep {
  Duration: number;
  Instruction?: string | redacted.Redacted<string> | undefined;
  Type: RouteRentalAfterTravelStepType;
}
export type RouteRentalAfterTravelStepList = RouteRentalAfterTravelStep[];
export interface RouteRentalAgency {
  Name: string | redacted.Redacted<string>;
  Url?: string | redacted.Redacted<string> | undefined;
}
export type RouteRentalPlaceType =
  | "AccessPoint"
  | "DockingStation"
  | "ParkingLot"
  | "Station"
  | (string & {});
export interface RouteRentalPlace {
  AccessPointDetails?: RouteAccessPointDetails | undefined;
  Name?: string | redacted.Redacted<string> | undefined;
  OriginalPosition?: number[] | undefined;
  Position: number[];
  StationDetails?: RouteStationDetails | undefined;
  Type?: RouteRentalPlaceType | undefined;
  WaypointIndex?: number | undefined;
}
export interface RouteRentalArrival {
  Place: RouteRentalPlace;
  Time?: string | redacted.Redacted<string> | undefined;
}
export type RouteAttributionType = "Disclaimer" | "Tariff" | (string & {});
export type RouteWebLinkDeviceType = "Android" | "Ios" | "Web" | (string & {});
export interface RouteWebLink {
  AnchorText?: string | redacted.Redacted<string> | undefined;
  Description: string | redacted.Redacted<string>;
  DeviceType?: RouteWebLinkDeviceType | undefined;
  Url?: string | redacted.Redacted<string> | undefined;
}
export interface RouteAttribution {
  AttributionType?: RouteAttributionType | undefined;
  WebLink: RouteWebLink;
}
export type RouteAttributionList = RouteAttribution[];
export type RouteRentalBeforeTravelStepType = "Setup" | (string & {});
export interface RouteRentalBeforeTravelStep {
  Duration: number;
  Instruction?: string | redacted.Redacted<string> | undefined;
  Type: RouteRentalBeforeTravelStepType;
}
export type RouteRentalBeforeTravelStepList = RouteRentalBeforeTravelStep[];
export type RouteWebLinkList = RouteWebLink[];
export interface RouteRentalDeparture {
  Place: RouteRentalPlace;
  Time?: string | redacted.Redacted<string> | undefined;
}
export interface RouteRentalOverviewSummary {
  Duration: number;
  Distance: number;
}
export interface RouteRentalTravelOnlySummary {
  Duration: number;
}
export interface RouteRentalSummary {
  Overview?: RouteRentalOverviewSummary | undefined;
  TravelOnly?: RouteRentalTravelOnlySummary | undefined;
}
export interface RouteRentalTransportModeDetails {
  AvailableSeats?: number | undefined;
  Category?: string | redacted.Redacted<string> | undefined;
  Color?: string | redacted.Redacted<string> | undefined;
  Engine?: RouteEngineType | undefined;
  LicensePlate?: string | redacted.Redacted<string> | undefined;
  Mode: RouteRentalMode;
  Model?: string | redacted.Redacted<string> | undefined;
  Name?: string | redacted.Redacted<string> | undefined;
  TextColor?: string | redacted.Redacted<string> | undefined;
}
export type RouteRentalTravelStepType =
  | "Arrive"
  | "Continue"
  | "Depart"
  | "Exit"
  | "Keep"
  | "Ramp"
  | "RoundaboutEnter"
  | "RoundaboutExit"
  | "RoundaboutPass"
  | "Turn"
  | "UTurn"
  | (string & {});
export interface RouteRentalTravelStep {
  ContinueStepDetails?: RouteContinueStepDetails | undefined;
  Distance?: number | undefined;
  Duration: number;
  ExitStepDetails?: RouteExitStepDetails | undefined;
  GeometryOffset?: number | undefined;
  Instruction?: string | redacted.Redacted<string> | undefined;
  KeepStepDetails?: RouteKeepStepDetails | undefined;
  RampStepDetails?: RouteRampStepDetails | undefined;
  RoundaboutEnterStepDetails?: RouteRoundaboutEnterStepDetails | undefined;
  RoundaboutExitStepDetails?: RouteRoundaboutExitStepDetails | undefined;
  RoundaboutPassStepDetails?: RouteRoundaboutPassStepDetails | undefined;
  TurnStepDetails?: RouteTurnStepDetails | undefined;
  Type: RouteRentalTravelStepType;
  UTurnStepDetails?: RouteUTurnStepDetails | undefined;
}
export type RouteRentalTravelStepList = RouteRentalTravelStep[];
export interface RouteRentalLegDetails {
  AfterTravelSteps?: RouteRentalAfterTravelStep[] | undefined;
  Agency: RouteRentalAgency;
  Arrival: RouteRentalArrival;
  Attributions?: RouteAttribution[] | undefined;
  BeforeTravelSteps?: RouteRentalBeforeTravelStep[] | undefined;
  BookingWebLinks?: RouteWebLink[] | undefined;
  Departure: RouteRentalDeparture;
  Summary?: RouteRentalSummary | undefined;
  Transport: RouteRentalTransportModeDetails;
  TravelSteps?: RouteRentalTravelStep[] | undefined;
}
export type RouteTaxiAfterTravelStepType = "Park" | (string & {});
export interface RouteTaxiAfterTravelStep {
  Duration: number;
  Instruction?: string | redacted.Redacted<string> | undefined;
  Type: RouteTaxiAfterTravelStepType;
}
export type RouteTaxiAfterTravelStepList = RouteTaxiAfterTravelStep[];
export interface RouteTaxiAgency {
  Name: string | redacted.Redacted<string>;
  Url?: string | redacted.Redacted<string> | undefined;
}
export type RouteTaxiPlaceType = "AccessPoint" | "Station" | (string & {});
export interface RouteTaxiPlace {
  AccessPointDetails?: RouteAccessPointDetails | undefined;
  Name?: string | redacted.Redacted<string> | undefined;
  OriginalPosition?: number[] | undefined;
  Position: number[];
  StationDetails?: RouteStationDetails | undefined;
  Type?: RouteTaxiPlaceType | undefined;
  WaypointIndex?: number | undefined;
}
export interface RouteTaxiArrival {
  Place: RouteTaxiPlace;
  Time?: string | redacted.Redacted<string> | undefined;
}
export type RouteTaxiBeforeTravelStepType = "Wait" | (string & {});
export interface RouteTaxiBeforeTravelStep {
  Duration: number;
  Instruction?: string | redacted.Redacted<string> | undefined;
  Type: RouteTaxiBeforeTravelStepType;
}
export type RouteTaxiBeforeTravelStepList = RouteTaxiBeforeTravelStep[];
export interface RouteTaxiDeparture {
  Place: RouteTaxiPlace;
  Time?: string | redacted.Redacted<string> | undefined;
}
export type RouteTaxiNoticeCode = "AccuratePolylineUnavailable" | "Other" | (string & {});
export interface RouteTaxiNotice {
  Code: RouteTaxiNoticeCode;
  Impact?: RouteNoticeImpact | undefined;
}
export type RouteTaxiNoticeList = RouteTaxiNotice[];
export interface RouteTaxiOverviewSummary {
  Duration: number;
  Distance: number;
}
export interface RouteTaxiTravelOnlySummary {
  Duration: number;
}
export interface RouteTaxiSummary {
  Overview?: RouteTaxiOverviewSummary | undefined;
  TravelOnly?: RouteTaxiTravelOnlySummary | undefined;
}
export interface RouteTaxiTransportModeDetails {
  AvailableSeats?: number | undefined;
  Category?: string | redacted.Redacted<string> | undefined;
  Color?: string | redacted.Redacted<string> | undefined;
  Engine?: RouteEngineType | undefined;
  LicensePlate?: string | redacted.Redacted<string> | undefined;
  Mode: RouteTaxiMode;
  Model?: string | redacted.Redacted<string> | undefined;
  Name?: string | redacted.Redacted<string> | undefined;
  TextColor?: string | redacted.Redacted<string> | undefined;
}
export type RouteTaxiTravelStepType =
  | "Arrive"
  | "Continue"
  | "Depart"
  | "Exit"
  | "Keep"
  | "Ramp"
  | "RoundaboutEnter"
  | "RoundaboutExit"
  | "RoundaboutPass"
  | "Turn"
  | "UTurn"
  | (string & {});
export interface RouteTaxiTravelStep {
  ContinueStepDetails?: RouteContinueStepDetails | undefined;
  Distance?: number | undefined;
  Duration: number;
  ExitStepDetails?: RouteExitStepDetails | undefined;
  GeometryOffset?: number | undefined;
  Instruction?: string | redacted.Redacted<string> | undefined;
  KeepStepDetails?: RouteKeepStepDetails | undefined;
  RampStepDetails?: RouteRampStepDetails | undefined;
  RoundaboutEnterStepDetails?: RouteRoundaboutEnterStepDetails | undefined;
  RoundaboutExitStepDetails?: RouteRoundaboutExitStepDetails | undefined;
  RoundaboutPassStepDetails?: RouteRoundaboutPassStepDetails | undefined;
  TurnStepDetails?: RouteTurnStepDetails | undefined;
  Type: RouteTaxiTravelStepType;
  UTurnStepDetails?: RouteUTurnStepDetails | undefined;
}
export type RouteTaxiTravelStepList = RouteTaxiTravelStep[];
export interface RouteTaxiLegDetails {
  AfterTravelSteps?: RouteTaxiAfterTravelStep[] | undefined;
  Agency: RouteTaxiAgency;
  Arrival: RouteTaxiArrival;
  Attributions?: RouteAttribution[] | undefined;
  BeforeTravelSteps?: RouteTaxiBeforeTravelStep[] | undefined;
  BookingWebLinks?: RouteWebLink[] | undefined;
  Departure: RouteTaxiDeparture;
  Notices?: RouteTaxiNotice[] | undefined;
  Summary?: RouteTaxiSummary | undefined;
  Transport: RouteTaxiTransportModeDetails;
  TravelSteps?: RouteTaxiTravelStep[] | undefined;
}
export type RouteTransitAfterTravelStepType = "Deboard" | (string & {});
export interface RouteTransitAfterTravelStep {
  Duration: number;
  Instruction?: string | redacted.Redacted<string> | undefined;
  Type: RouteTransitAfterTravelStepType;
}
export type RouteTransitAfterTravelStepList = RouteTransitAfterTravelStep[];
export interface RouteTransitAgency {
  Name: string | redacted.Redacted<string>;
  Url?: string | redacted.Redacted<string> | undefined;
}
export type RouteTransitPlaceType = "Station" | (string & {});
export interface RouteTransitPlace {
  Name?: string | redacted.Redacted<string> | undefined;
  OriginalPosition?: number[] | undefined;
  Position: number[];
  StationDetails?: RouteStationDetails | undefined;
  Type?: RouteTransitPlaceType | undefined;
  WaypointIndex?: number | undefined;
}
export type RouteTransitTripStatus =
  | "Added"
  | "Cancelled"
  | "Replaced"
  | "Scheduled"
  | (string & {});
export interface RouteTransitArrival {
  Delay?: number | undefined;
  Place: RouteTransitPlace;
  Status?: RouteTransitTripStatus | undefined;
  Time?: string | redacted.Redacted<string> | undefined;
}
export type RouteTransitBeforeTravelStepType = "Board" | (string & {});
export interface RouteTransitBeforeTravelStep {
  Duration: number;
  Instruction?: string | redacted.Redacted<string> | undefined;
  Type: RouteTransitBeforeTravelStepType;
}
export type RouteTransitBeforeTravelStepList = RouteTransitBeforeTravelStep[];
export interface RouteTransitDeparture {
  Delay?: number | undefined;
  Place: RouteTransitPlace;
  Status?: RouteTransitTripStatus | undefined;
  Time?: string | redacted.Redacted<string> | undefined;
}
export type RouteTransitIncidentEffect =
  | "Delayed"
  | "Detoured"
  | "Other"
  | "ServiceAdded"
  | "ServiceCancelled"
  | "ServiceModified"
  | "ServiceReduced"
  | "StopMoved"
  | (string & {});
export type RouteTransitIncidentType =
  | "Accident"
  | "Construction"
  | "Demonstration"
  | "Holiday"
  | "Maintenance"
  | "MedicalEmergency"
  | "Other"
  | "PoliceActivity"
  | "Strike"
  | "TechnicalProblem"
  | "Weather"
  | (string & {});
export interface RouteTransitIncident {
  Description?: string | redacted.Redacted<string> | undefined;
  Effect: RouteTransitIncidentEffect;
  EndTime?: string | redacted.Redacted<string> | undefined;
  StartTime?: string | redacted.Redacted<string> | undefined;
  Type: RouteTransitIncidentType;
  Url?: string | redacted.Redacted<string> | undefined;
}
export type RouteTransitIncidentList = RouteTransitIncident[];
export type RouteTransitIntermediateStopAttribute = "NoEntry" | "NoExit" | (string & {});
export type RouteTransitIntermediateStopAttributeList = RouteTransitIntermediateStopAttribute[];
export type HexColor = string | redacted.Redacted<string>;
export interface RouteTransitTransportModeDetails {
  Accessibility?: RouteAccessibilityAvailabilityDetails | undefined;
  Color?: string | redacted.Redacted<string> | undefined;
  Headsign?: string | redacted.Redacted<string> | undefined;
  LongRouteName?: string | redacted.Redacted<string> | undefined;
  Mode: RouteTransitMode;
  RouteName?: string | redacted.Redacted<string> | undefined;
  ShortRouteName?: string | redacted.Redacted<string> | undefined;
  TextColor?: string | redacted.Redacted<string> | undefined;
}
export interface RouteTransitIntermediateStop {
  Attributes?: RouteTransitIntermediateStopAttribute[] | undefined;
  Departure: RouteTransitDeparture;
  Duration: number;
  GeometryOffset?: number | undefined;
  Transport?: RouteTransitTransportModeDetails | undefined;
}
export type RouteTransitIntermediateStopList = RouteTransitIntermediateStop[];
export interface RouteTransitNextDeparture {
  Delay?: number | undefined;
  PlatformName?: string | redacted.Redacted<string> | undefined;
  Status?: RouteTransitTripStatus | undefined;
  Time: string | redacted.Redacted<string>;
  Transport?: RouteTransitTransportModeDetails | undefined;
}
export type RouteTransitNextDepartureList = RouteTransitNextDeparture[];
export type RouteTransitNoticeCode =
  | "AccuratePolylineUnavailable"
  | "IntermediateStopsUnavailable"
  | "NoSchedule"
  | "Other"
  | "PotentialViolatedVehicleRestrictionUsage"
  | "ScheduledTimes"
  | "SeasonalClosure"
  | "ViolatedAvoidFerry"
  | "ViolatedAvoidRailFerry"
  | "ViolatedExcludedTransitMode"
  | "ViolatedVehicleRestriction"
  | "ViolatedAvoidAreas"
  | (string & {});
export interface RouteTransitNotice {
  Code: RouteTransitNoticeCode;
  Impact?: RouteNoticeImpact | undefined;
}
export type RouteTransitNoticeList = RouteTransitNotice[];
export interface RouteTransitSpan {
  Country?: string | redacted.Redacted<string> | undefined;
  Distance?: number | undefined;
  Duration?: number | undefined;
  GeometryOffset?: number | undefined;
  Names?: LocalizedString[] | undefined;
  Region?: string | redacted.Redacted<string> | undefined;
}
export type RouteTransitSpanList = RouteTransitSpan[];
export interface RouteTransitOverviewSummary {
  Distance: number;
  Duration: number;
}
export interface RouteTransitTravelOnlySummary {
  Duration: number;
}
export interface RouteTransitSummary {
  Overview?: RouteTransitOverviewSummary | undefined;
  TravelOnly?: RouteTransitTravelOnlySummary | undefined;
}
export type RouteTransitTravelStepType = "Depart" | (string & {});
export interface RouteTransitTravelStep {
  Distance?: number | undefined;
  Duration: number;
  GeometryOffset?: number | undefined;
  Instruction?: string | redacted.Redacted<string> | undefined;
  Type: RouteTransitTravelStepType;
}
export type RouteTransitTravelStepList = RouteTransitTravelStep[];
export interface RouteTransitLegDetails {
  AfterTravelSteps?: RouteTransitAfterTravelStep[] | undefined;
  Agency?: RouteTransitAgency | undefined;
  Arrival: RouteTransitArrival;
  Attributions?: RouteAttribution[] | undefined;
  BeforeTravelSteps?: RouteTransitBeforeTravelStep[] | undefined;
  BookingWebLinks?: RouteWebLink[] | undefined;
  Departure: RouteTransitDeparture;
  Incidents?: RouteTransitIncident[] | undefined;
  IntermediateStops?: RouteTransitIntermediateStop[] | undefined;
  NextDepartures?: RouteTransitNextDeparture[] | undefined;
  Notices?: RouteTransitNotice[] | undefined;
  PassThroughWaypoints?: RoutePassThroughWaypoint[] | undefined;
  Spans?: RouteTransitSpan[] | undefined;
  Summary?: RouteTransitSummary | undefined;
  Transport: RouteTransitTransportModeDetails;
  TravelSteps?: RouteTransitTravelStep[] | undefined;
}
export interface RouteLeg {
  FerryLegDetails?: RouteFerryLegDetails | undefined;
  Geometry: RouteLegGeometry;
  Language?: string | undefined;
  PedestrianLegDetails?: RoutePedestrianLegDetails | undefined;
  TravelMode: RouteLegTravelMode;
  Type: RouteLegType;
  VehicleLegDetails?: RouteVehicleLegDetails | undefined;
  RentalLegDetails?: RouteRentalLegDetails | undefined;
  TaxiLegDetails?: RouteTaxiLegDetails | undefined;
  TransitLegDetails?: RouteTransitLegDetails | undefined;
}
export type RouteLegList = RouteLeg[];
export interface RouteMajorRoadLabel {
  RoadName?: LocalizedString | undefined;
  RouteNumber?: RouteNumber | undefined;
}
export type RouteMajorRoadLabelList = RouteMajorRoadLabel[];
export interface RouteTollPriceSummary {
  Currency: string;
  Estimate: boolean;
  Range: boolean;
  RangeValue?: RouteTollPriceValueRange | undefined;
  Value: number;
}
export interface RouteTollSummary {
  Total?: RouteTollPriceSummary | undefined;
}
export interface RouteSummary {
  Distance?: number | undefined;
  Duration?: number | undefined;
  Tolls?: RouteTollSummary | undefined;
}
export interface Route {
  Legs: RouteLeg[];
  MajorRoadLabels: RouteMajorRoadLabel[];
  Summary?: RouteSummary | undefined;
}
export type RouteList = Route[];
export interface CalculateRoutesResponse {
  LegGeometryFormat: GeometryFormat;
  Notices: RouteResponseNotice[];
  PricingBucket: string;
  Routes: Route[];
}
export interface WaypointOptimizationAvoidanceAreaGeometry {
  BoundingBox?: number[] | undefined;
}
export interface WaypointOptimizationAvoidanceArea {
  Geometry: WaypointOptimizationAvoidanceAreaGeometry;
}
export type WaypointOptimizationAvoidanceAreaList = WaypointOptimizationAvoidanceArea[];
export interface WaypointOptimizationAvoidanceOptions {
  Areas?: WaypointOptimizationAvoidanceArea[] | undefined;
  CarShuttleTrains?: boolean | undefined;
  ControlledAccessHighways?: boolean | undefined;
  DirtRoads?: boolean | undefined;
  Ferries?: boolean | undefined;
  TollRoads?: boolean | undefined;
  Tunnels?: boolean | undefined;
  UTurns?: boolean | undefined;
}
export type WaypointOptimizationClusteringAlgorithm =
  | "DrivingDistance"
  | "TopologySegment"
  | (string & {});
export type WaypointOptimizationDrivingDistance = number;
export interface WaypointOptimizationDrivingDistanceOptions {
  DrivingDistance: number;
}
export interface WaypointOptimizationClusteringOptions {
  Algorithm: WaypointOptimizationClusteringAlgorithm;
  DrivingDistanceOptions?: WaypointOptimizationDrivingDistanceOptions | undefined;
}
export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday"
  | (string & {});
export type TimeOfDay = string | redacted.Redacted<string>;
export interface WaypointOptimizationAccessHoursEntry {
  DayOfWeek: DayOfWeek;
  TimeOfDay: string | redacted.Redacted<string>;
}
export interface WaypointOptimizationAccessHours {
  From: WaypointOptimizationAccessHoursEntry;
  To: WaypointOptimizationAccessHoursEntry;
}
export type WaypointId = string;
export interface WaypointOptimizationSideOfStreetOptions {
  Position: number[];
  UseWith?: SideOfStreetMatchingStrategy | undefined;
}
export interface WaypointOptimizationDestinationOptions {
  AccessHours?: WaypointOptimizationAccessHours | undefined;
  AppointmentTime?: string | redacted.Redacted<string> | undefined;
  Heading?: number | undefined;
  Id?: string | undefined;
  ServiceDuration?: number | undefined;
  SideOfStreet?: WaypointOptimizationSideOfStreetOptions | undefined;
}
export interface WaypointOptimizationRestCycleDurations {
  RestDuration: number;
  WorkDuration: number;
}
export interface WaypointOptimizationRestCycles {
  LongCycle: WaypointOptimizationRestCycleDurations;
  ShortCycle: WaypointOptimizationRestCycleDurations;
}
export interface WaypointOptimizationRestProfile {
  Profile: string | redacted.Redacted<string>;
}
export type WaypointOptimizationServiceTimeTreatment = "Rest" | "Work" | (string & {});
export interface WaypointOptimizationDriverOptions {
  RestCycles?: WaypointOptimizationRestCycles | undefined;
  RestProfile?: WaypointOptimizationRestProfile | undefined;
  TreatServiceTimeAs?: WaypointOptimizationServiceTimeTreatment | undefined;
}
export interface WaypointOptimizationExclusionOptions {
  Countries: (string | redacted.Redacted<string>)[];
}
export type WaypointOptimizationSequencingObjective =
  | "FastestRoute"
  | "ShortestRoute"
  | (string & {});
export interface WaypointOptimizationOriginOptions {
  Id?: string | undefined;
}
export interface WaypointOptimizationTrafficOptions {
  Usage?: TrafficUsage | undefined;
}
export type WaypointOptimizationTravelMode =
  | "Car"
  | "Pedestrian"
  | "Scooter"
  | "Truck"
  | (string & {});
export interface WaypointOptimizationPedestrianOptions {
  Speed?: number | undefined;
}
export type WaypointOptimizationHazardousCargoType =
  | "Combustible"
  | "Corrosive"
  | "Explosive"
  | "Flammable"
  | "Gas"
  | "HarmfulToWater"
  | "Organic"
  | "Other"
  | "Poison"
  | "PoisonousInhalation"
  | "Radioactive"
  | (string & {});
export type WaypointOptimizationHazardousCargoTypeList = WaypointOptimizationHazardousCargoType[];
export interface WaypointOptimizationTrailerOptions {
  TrailerCount?: number | undefined;
}
export type WaypointOptimizationTruckType = "StraightTruck" | "Tractor" | (string & {});
export interface WaypointOptimizationTruckOptions {
  GrossWeight?: number | undefined;
  HazardousCargos?: WaypointOptimizationHazardousCargoType[] | undefined;
  Height?: number | undefined;
  Length?: number | undefined;
  Trailer?: WaypointOptimizationTrailerOptions | undefined;
  TruckType?: WaypointOptimizationTruckType | undefined;
  TunnelRestrictionCode?: string | redacted.Redacted<string> | undefined;
  WeightPerAxle?: number | undefined;
  Width?: number | undefined;
}
export interface WaypointOptimizationTravelModeOptions {
  Pedestrian?: WaypointOptimizationPedestrianOptions | undefined;
  Truck?: WaypointOptimizationTruckOptions | undefined;
}
export type WaypointIndex = number;
export type BeforeWaypointsList = number[];
export interface WaypointOptimizationWaypoint {
  AccessHours?: WaypointOptimizationAccessHours | undefined;
  AppointmentTime?: string | redacted.Redacted<string> | undefined;
  Before?: number[] | undefined;
  Heading?: number | undefined;
  Id?: string | undefined;
  Position: number[];
  ServiceDuration?: number | undefined;
  SideOfStreet?: WaypointOptimizationSideOfStreetOptions | undefined;
}
export type WaypointOptimizationWaypointList = WaypointOptimizationWaypoint[];
export interface OptimizeWaypointsRequest {
  Avoid?: WaypointOptimizationAvoidanceOptions | undefined;
  Clustering?: WaypointOptimizationClusteringOptions | undefined;
  DepartureTime?: string | redacted.Redacted<string> | undefined;
  Destination?: number[] | undefined;
  DestinationOptions?: WaypointOptimizationDestinationOptions | undefined;
  Driver?: WaypointOptimizationDriverOptions | undefined;
  Exclude?: WaypointOptimizationExclusionOptions | undefined;
  Key?: string | redacted.Redacted<string> | undefined;
  OptimizeSequencingFor?: WaypointOptimizationSequencingObjective | undefined;
  Origin: number[];
  OriginOptions?: WaypointOptimizationOriginOptions | undefined;
  Traffic?: WaypointOptimizationTrafficOptions | undefined;
  TravelMode?: WaypointOptimizationTravelMode | undefined;
  TravelModeOptions?: WaypointOptimizationTravelModeOptions | undefined;
  Waypoints?: WaypointOptimizationWaypoint[] | undefined;
}
export interface WaypointOptimizationConnection {
  Distance: number;
  From: string;
  RestDuration: number;
  To: string;
  TravelDuration: number;
  WaitDuration: number;
}
export type WaypointOptimizationConnectionList = WaypointOptimizationConnection[];
export type WaypointOptimizationConstraint =
  | "AccessHours"
  | "AppointmentTime"
  | "Before"
  | "Heading"
  | "ServiceDuration"
  | "SideOfStreet"
  | (string & {});
export interface WaypointOptimizationFailedConstraint {
  Constraint?: WaypointOptimizationConstraint | undefined;
  Reason?: string | redacted.Redacted<string> | undefined;
}
export type WaypointOptimizationFailedConstraintList = WaypointOptimizationFailedConstraint[];
export interface WaypointOptimizationImpedingWaypoint {
  FailedConstraints: WaypointOptimizationFailedConstraint[];
  Id: string;
  Position: number[];
}
export type WaypointOptimizationImpedingWaypointList = WaypointOptimizationImpedingWaypoint[];
export type ClusterIndex = number;
export interface WaypointOptimizationOptimizedWaypoint {
  ArrivalTime?: string | redacted.Redacted<string> | undefined;
  ClusterIndex?: number | undefined;
  DepartureTime?: string | redacted.Redacted<string> | undefined;
  Id: string;
  Position: number[];
}
export type WaypointOptimizationOptimizedWaypointList = WaypointOptimizationOptimizedWaypoint[];
export interface WaypointOptimizationTimeBreakdown {
  RestDuration: number;
  ServiceDuration: number;
  TravelDuration: number;
  WaitDuration: number;
}
export interface OptimizeWaypointsResponse {
  Connections: WaypointOptimizationConnection[];
  Distance: number;
  Duration: number;
  ImpedingWaypoints: WaypointOptimizationImpedingWaypoint[];
  OptimizedWaypoints: WaypointOptimizationOptimizedWaypoint[];
  PricingBucket: string;
  TimeBreakdown: WaypointOptimizationTimeBreakdown;
}
export interface RoadSnapTracePoint {
  Heading?: number | undefined;
  Position: number[];
  Speed?: number | undefined;
  Timestamp?: string | redacted.Redacted<string> | undefined;
}
export type RoadSnapTracePointList = RoadSnapTracePoint[];
export type RoadSnapTravelMode = "Car" | "Pedestrian" | "Scooter" | "Truck" | (string & {});
export type RoadSnapHazardousCargoType =
  | "Combustible"
  | "Corrosive"
  | "Explosive"
  | "Flammable"
  | "Gas"
  | "HarmfulToWater"
  | "Organic"
  | "Other"
  | "Poison"
  | "PoisonousInhalation"
  | "Radioactive"
  | (string & {});
export type RoadSnapHazardousCargoTypeList = RoadSnapHazardousCargoType[];
export interface RoadSnapTrailerOptions {
  TrailerCount?: number | undefined;
}
export interface RoadSnapTruckOptions {
  GrossWeight?: number | undefined;
  HazardousCargos?: RoadSnapHazardousCargoType[] | undefined;
  Height?: number | undefined;
  Length?: number | undefined;
  Trailer?: RoadSnapTrailerOptions | undefined;
  TunnelRestrictionCode?: string | redacted.Redacted<string> | undefined;
  Width?: number | undefined;
}
export interface RoadSnapTravelModeOptions {
  Truck?: RoadSnapTruckOptions | undefined;
}
export interface SnapToRoadsRequest {
  Key?: string | redacted.Redacted<string> | undefined;
  SnappedGeometryFormat?: GeometryFormat | undefined;
  SnapRadius?: number | undefined;
  TracePoints: RoadSnapTracePoint[];
  TravelMode?: RoadSnapTravelMode | undefined;
  TravelModeOptions?: RoadSnapTravelModeOptions | undefined;
}
export type RoadSnapNoticeCode =
  | "TracePointsHeadingIgnored"
  | "TracePointsIgnored"
  | "TracePointsMovedByLargeDistance"
  | "TracePointsNotMatched"
  | "TracePointsOutOfSequence"
  | "TracePointsSpeedEstimated"
  | "TracePointsSpeedIgnored"
  | (string & {});
export type RoadSnapTracePointIndexList = number[];
export interface RoadSnapNotice {
  Code: RoadSnapNoticeCode;
  Title: string | redacted.Redacted<string>;
  TracePointIndexes: number[];
}
export type RoadSnapNoticeList = RoadSnapNotice[];
export interface RoadSnapSnappedGeometry {
  LineString?: number[][] | undefined;
  Polyline?: string | redacted.Redacted<string> | undefined;
}
export interface RoadSnapSnappedTracePoint {
  Confidence: number;
  OriginalPosition: number[];
  SnappedPosition: number[];
}
export type RoadSnapSnappedTracePointList = RoadSnapSnappedTracePoint[];
export interface SnapToRoadsResponse {
  Notices: RoadSnapNotice[];
  PricingBucket: string;
  SnappedGeometry?: RoadSnapSnappedGeometry | undefined;
  SnappedGeometryFormat: GeometryFormat;
  SnappedTracePoints: RoadSnapSnappedTracePoint[];
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
export type CalculateIsolinesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Calculates areas that can be reached within specified time or distance thresholds from a given point. For example, you can use this operation to determine the area within a 30-minute drive of a store location, find neighborhoods within walking distance of a school, or identify delivery zones based on drive time.
 *
 * Isolines (also known as isochrones for time-based calculations) are useful for various applications including:
 *
 * - Service area visualization - Show customers the area you can serve within promised delivery times
 *
 * - Site selection - Analyze potential business locations based on population within travel distance
 *
 * - Site selection - Determine areas that can be reached within specified response times
 *
 * Route preferences such as avoiding toll roads or ferries are treated as preferences rather than absolute restrictions. If a viable route cannot be calculated while honoring all preferences, some may be ignored.
 *
 * For more information, see Calculate isolines in the *Amazon Location Service Developer Guide*.
 */
export const calculateIsolines: API.OperationMethod<
  CalculateIsolinesRequest,
  CalculateIsolinesResponse,
  CalculateIsolinesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(42, __c1, 10) as any as S.Schema<CalculateIsolinesRequest>,
  output: __S(49, __c1, 17) as any as S.Schema<CalculateIsolinesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CalculateIsolines",
  telemetry: TELEMETRY,
  span: "CalculateIsolines",
}));

export type CalculateRouteMatrixError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use `CalculateRouteMatrix` to compute results for all pairs of Origins to Destinations. Each row corresponds to one entry in Origins. Each entry in the row corresponds to the route from that entry in Origins to an entry in Destinations positions.
 *
 * For more information, see Calculate route matrix in the *Amazon Location Service Developer Guide*.
 */
export const calculateRouteMatrix: API.OperationMethod<
  CalculateRouteMatrixRequest,
  CalculateRouteMatrixResponse,
  CalculateRouteMatrixError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(301, __c9, 13) as any as S.Schema<CalculateRouteMatrixRequest>,
  output: __S(305, __c9, 17) as any as S.Schema<CalculateRouteMatrixResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CalculateRouteMatrix",
  telemetry: TELEMETRY,
  span: "CalculateRouteMatrix",
}));

export type CalculateRoutesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * `CalculateRoutes` computes routes given the following required parameters: `Origin` and `Destination`.
 *
 * For more information, see Calculate routes in the *Amazon Location Service Developer Guide*.
 */
export const calculateRoutes: API.OperationMethod<
  CalculateRoutesRequest,
  CalculateRoutesResponse,
  CalculateRoutesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(409, __c12, 25) as any as S.Schema<CalculateRoutesRequest>,
  output: __S(522, __c16, 10) as any as S.Schema<CalculateRoutesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CalculateRoutes",
  telemetry: TELEMETRY,
  span: "CalculateRoutes",
}));

export type OptimizeWaypointsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * `OptimizeWaypoints` calculates the optimal order to travel between a set of waypoints to minimize either the travel time or the distance travelled during the journey, based on road network restrictions and the traffic pattern data.
 *
 * For more information, see Optimize waypoints in the *Amazon Location Service Developer Guide*.
 */
export const optimizeWaypoints: API.OperationMethod<
  OptimizeWaypointsRequest,
  OptimizeWaypointsResponse,
  OptimizeWaypointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(595, __c18, 19) as any as S.Schema<OptimizeWaypointsRequest>,
  output: __S(605, __c18, 29) as any as S.Schema<OptimizeWaypointsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "OptimizeWaypoints",
  telemetry: TELEMETRY,
  span: "OptimizeWaypoints",
}));

export type SnapToRoadsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * `SnapToRoads` matches GPS trace to roads most likely traveled on.
 *
 * For more information, see Snap to Roads in the *Amazon Location Service Developer Guide*.
 */
export const snapToRoads: API.OperationMethod<
  SnapToRoadsRequest,
  SnapToRoadsResponse,
  SnapToRoadsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(612, __c19, 4) as any as S.Schema<SnapToRoadsRequest>,
  output: __S(617, __c19, 9) as any as S.Schema<SnapToRoadsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SnapToRoads",
  telemetry: TELEMETRY,
  span: "SnapToRoads",
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
          BoundingBox: S.optional(__S(160, __c5, 0)),
          Corridor: S.optional(__S(224, __c7, 0)),
          Polygon: S.optional(__S(97, __c3, 1)),
          PolylineCorridor: S.optional(__S(225, __c7, 1)),
          PolylinePolygon: S.optional(__S(128, __c4, 0)),
        }),
      ).annotate({ identifier: "IsolineAvoidanceAreaGeometry" });
    case 1:
      return S.Array(__S(32, __c1, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Except: S.optional(__S(33, __c1, 1)), Geometry: __S(32, __c1, 0) }),
      ).annotate({ identifier: "IsolineAvoidanceArea" });
    case 3:
      return S.Array(__S(34, __c1, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Areas: S.optional(__S(35, __c1, 3)),
          CarShuttleTrains: S.optional(S.Boolean),
          ControlledAccessHighways: S.optional(S.Boolean),
          DirtRoads: S.optional(S.Boolean),
          Ferries: S.optional(S.Boolean),
          SeasonalClosure: S.optional(S.Boolean),
          TollRoads: S.optional(S.Boolean),
          TollTransponders: S.optional(S.Boolean),
          TruckRoadTypes: S.optional(__S(128, __c4, 0)),
          Tunnels: S.optional(S.Boolean),
          UTurns: S.optional(S.Boolean),
          ZoneCategories: S.optional(__S(65, __c2, 1)),
        }),
      ).annotate({ identifier: "IsolineAvoidanceOptions" });
    case 5:
      return S.suspend(() =>
        S.Struct({ MaxPoints: S.optional(S.Number), MaxResolution: S.optional(S.Number) }),
      ).annotate({ identifier: "IsolineGranularityOptions" });
    case 6:
      return S.suspend(() =>
        S.Struct({ Distance: S.optional(__S(160, __c5, 0)), Time: S.optional(__S(160, __c5, 0)) }),
      ).annotate({ identifier: "IsolineThresholds" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          EngineType: S.optional(S.String),
          LicensePlate: S.optional(__S(67, __c2, 3)),
          MaxSpeed: S.optional(S.Number),
          Occupancy: S.optional(S.Number),
        }),
      ).annotate({ identifier: "IsolineCarOptions" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          AxleCount: S.optional(S.Number),
          EngineType: S.optional(S.String),
          GrossWeight: S.optional(S.Number),
          HazardousCargos: S.optional(__S(161, __c5, 1)),
          Height: S.optional(S.Number),
          HeightAboveFirstAxle: S.optional(S.Number),
          KpraLength: S.optional(S.Number),
          Length: S.optional(S.Number),
          LicensePlate: S.optional(__S(67, __c2, 3)),
          MaxSpeed: S.optional(S.Number),
          Occupancy: S.optional(S.Number),
          PayloadCapacity: S.optional(S.Number),
          TireCount: S.optional(S.Number),
          Trailer: S.optional(__S(226, __c7, 2)),
          TruckType: S.optional(S.String),
          TunnelRestrictionCode: S.optional(SensitiveString),
          WeightPerAxle: S.optional(S.Number),
          WeightPerAxleGroup: S.optional(__S(100, __c3, 4)),
          Width: S.optional(S.Number),
        }),
      ).annotate({ identifier: "IsolineTruckOptions" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          Car: S.optional(__S(39, __c1, 7)),
          Scooter: S.optional(__S(39, __c1, 7)),
          Truck: S.optional(__S(40, __c1, 8)),
        }),
      ).annotate({ identifier: "IsolineTravelModeOptions" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          Allow: S.optional(__S(96, __c3, 0)),
          ArrivalTime: S.optional(SensitiveString),
          Avoid: S.optional(__S(36, __c1, 4)),
          DepartNow: S.optional(S.Boolean),
          DepartureTime: S.optional(SensitiveString),
          Destination: S.optional(__S(160, __c5, 0)),
          DestinationOptions: S.optional(__S(66, __c2, 2)),
          IsolineGeometryFormat: S.optional(S.String),
          IsolineGranularity: S.optional(__S(37, __c1, 5)),
          Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
          OptimizeIsolineFor: S.optional(S.String),
          OptimizeRoutingFor: S.optional(S.String),
          Origin: S.optional(__S(160, __c5, 0)),
          OriginOptions: S.optional(__S(66, __c2, 2)),
          Thresholds: __S(38, __c1, 6),
          Traffic: S.optional(__S(99, __c3, 3)),
          TravelMode: S.optional(S.String),
          TravelModeOptions: S.optional(__S(41, __c1, 9)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v2/isolines" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CalculateIsolinesRequest" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          FromPolygonIndex: S.Number,
          Geometry: __S(256, __c8, 0),
          ToPolygonIndex: S.Number,
        }),
      ).annotate({ identifier: "IsolineConnection" });
    case 12:
      return S.Array(__S(43, __c1, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({
          Polygon: S.optional(__S(97, __c3, 1)),
          PolylinePolygon: S.optional(__S(128, __c4, 0)),
        }),
      ).annotate({ identifier: "IsolineShapeGeometry" });
    case 14:
      return S.Array(__S(45, __c1, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({
          Connections: __S(44, __c1, 12),
          DistanceThreshold: S.optional(S.Number),
          Geometries: __S(46, __c1, 14),
          TimeThreshold: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Isoline" });
    case 16:
      return S.Array(__S(47, __c1, 15));
    case 17:
      return S.suspend(() =>
        S.Struct({
          ArrivalTime: S.optional(SensitiveString),
          DepartureTime: S.optional(SensitiveString),
          IsolineGeometryFormat: S.String,
          Isolines: __S(48, __c1, 16),
          PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
          SnappedDestination: S.optional(__S(160, __c5, 0)),
          SnappedOrigin: S.optional(__S(160, __c5, 0)),
        }),
      ).annotate({ identifier: "CalculateIsolinesResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Category: S.optional(S.String) })).annotate({
        identifier: "IsolineAvoidanceZoneCategory",
      });
    case 1:
      return S.Array(__S(64, __c2, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          AvoidActionsForDistance: S.optional(S.Number),
          Heading: S.optional(S.Number),
          Matching: S.optional(__S(98, __c3, 2)),
          SideOfStreet: S.optional(__S(129, __c4, 1)),
        }),
      ).annotate({ identifier: "IsolineDestinationOptions" });
    case 3:
      return S.suspend(() => S.Struct({ LastCharacter: S.optional(S.String) })).annotate({
        identifier: "IsolineVehicleLicensePlate",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Hot: S.optional(S.Boolean), Hov: S.optional(S.Boolean) }),
      ).annotate({ identifier: "IsolineAllowOptions" });
    case 1:
      return S.Array(__S(192, __c6, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NameHint: S.optional(SensitiveString),
          OnRoadThreshold: S.optional(S.Number),
          Radius: S.optional(S.Number),
          Strategy: S.optional(S.String),
        }),
      ).annotate({ identifier: "IsolineMatchingOptions" });
    case 3:
      return S.suspend(() =>
        S.Struct({ FlowEventThresholdOverride: S.optional(S.Number), Usage: S.optional(S.String) }),
      ).annotate({ identifier: "IsolineTrafficOptions" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Single: S.optional(S.Number),
          Tandem: S.optional(S.Number),
          Triple: S.optional(S.Number),
          Quad: S.optional(S.Number),
          Quint: S.optional(S.Number),
        }),
      ).annotate({ identifier: "WeightPerAxleGroup" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Array(SensitiveString);
    case 1:
      return S.suspend(() =>
        S.Struct({ Position: __S(160, __c5, 0), UseWith: S.optional(S.String) }),
      ).annotate({ identifier: "IsolineSideOfStreetOptions" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Number);
    case 1:
      return S.Array(S.String);
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(160, __c5, 0));
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LineString: __S(192, __c6, 0), Radius: S.Number }),
      ).annotate({ identifier: "Corridor" });
    case 1:
      return S.suspend(() => S.Struct({ Polyline: SensitiveString, Radius: S.Number })).annotate({
        identifier: "PolylineCorridor",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ AxleCount: S.optional(S.Number), TrailerCount: S.optional(S.Number) }),
      ).annotate({ identifier: "IsolineTrailerOptions" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LineString: S.optional(__S(192, __c6, 0)),
          Polyline: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "IsolineConnectionGeometry" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BoundingBox: S.optional(__S(160, __c5, 0)),
          Polygon: S.optional(__S(97, __c3, 1)),
          PolylinePolygon: S.optional(__S(128, __c4, 0)),
        }),
      ).annotate({ identifier: "RouteMatrixAvoidanceAreaGeometry" });
    case 1:
      return S.suspend(() => S.Struct({ Geometry: __S(288, __c9, 0) })).annotate({
        identifier: "RouteMatrixAvoidanceArea",
      });
    case 2:
      return S.Array(__S(289, __c9, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Areas: S.optional(__S(290, __c9, 2)),
          CarShuttleTrains: S.optional(S.Boolean),
          ControlledAccessHighways: S.optional(S.Boolean),
          DirtRoads: S.optional(S.Boolean),
          Ferries: S.optional(S.Boolean),
          TollRoads: S.optional(S.Boolean),
          TollTransponders: S.optional(S.Boolean),
          TruckRoadTypes: S.optional(__S(128, __c4, 0)),
          Tunnels: S.optional(S.Boolean),
          UTurns: S.optional(S.Boolean),
          ZoneCategories: S.optional(__S(65, __c2, 1)),
        }),
      ).annotate({ identifier: "RouteMatrixAvoidanceOptions" });
    case 4:
      return S.suspend(() =>
        S.Struct({ Options: S.optional(__S(66, __c2, 2)), Position: __S(160, __c5, 0) }),
      ).annotate({ identifier: "RouteMatrixDestination" });
    case 5:
      return S.Array(__S(292, __c9, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ Margin: S.optional(S.Number), MaxRadius: S.optional(S.Number) }),
      ).annotate({ identifier: "RouteMatrixAutoCircle" });
    case 7:
      return S.suspend(() => S.Struct({ Center: __S(160, __c5, 0), Radius: S.Number })).annotate({
        identifier: "Circle",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({
          AutoCircle: S.optional(__S(294, __c9, 6)),
          Circle: S.optional(__S(295, __c9, 7)),
          BoundingBox: S.optional(__S(160, __c5, 0)),
          Polygon: S.optional(__S(97, __c3, 1)),
        }),
      ).annotate({ identifier: "RouteMatrixBoundaryGeometry" });
    case 9:
      return S.suspend(() =>
        S.Struct({ Geometry: S.optional(__S(296, __c9, 8)), Unbounded: S.optional(S.Boolean) }),
      ).annotate({ identifier: "RouteMatrixBoundary" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          LicensePlate: S.optional(__S(67, __c2, 3)),
          MaxSpeed: S.optional(S.Number),
          Occupancy: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RouteMatrixCarOptions" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          AxleCount: S.optional(S.Number),
          GrossWeight: S.optional(S.Number),
          HazardousCargos: S.optional(__S(161, __c5, 1)),
          Height: S.optional(S.Number),
          KpraLength: S.optional(S.Number),
          Length: S.optional(S.Number),
          LicensePlate: S.optional(__S(67, __c2, 3)),
          MaxSpeed: S.optional(S.Number),
          Occupancy: S.optional(S.Number),
          PayloadCapacity: S.optional(S.Number),
          Trailer: S.optional(__S(352, __c11, 0)),
          TruckType: S.optional(S.String),
          TunnelRestrictionCode: S.optional(SensitiveString),
          WeightPerAxle: S.optional(S.Number),
          WeightPerAxleGroup: S.optional(__S(100, __c3, 4)),
          Width: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RouteMatrixTruckOptions" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          Car: S.optional(__S(298, __c9, 10)),
          Scooter: S.optional(__S(298, __c9, 10)),
          Truck: S.optional(__S(299, __c9, 11)),
        }),
      ).annotate({ identifier: "RouteMatrixTravelModeOptions" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          Allow: S.optional(__S(96, __c3, 0)),
          Avoid: S.optional(__S(291, __c9, 3)),
          DepartNow: S.optional(S.Boolean),
          DepartureTime: S.optional(SensitiveString),
          Destinations: __S(293, __c9, 5),
          Exclude: S.optional(__S(320, __c10, 0)),
          Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
          OptimizeRoutingFor: S.optional(S.String),
          Origins: __S(293, __c9, 5),
          RoutingBoundary: S.optional(__S(297, __c9, 9)),
          Traffic: S.optional(__S(99, __c3, 3)),
          TravelMode: S.optional(S.String),
          TravelModeOptions: S.optional(__S(300, __c9, 12)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v2/route-matrix" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CalculateRouteMatrixRequest" });
    case 14:
      return S.suspend(() =>
        S.Struct({ Distance: S.Number, Duration: S.Number, Error: S.optional(S.String) }),
      ).annotate({ identifier: "RouteMatrixEntry" });
    case 15:
      return S.Array(__S(302, __c9, 14));
    case 16:
      return S.Array(__S(303, __c9, 15));
    case 17:
      return S.suspend(() =>
        S.Struct({
          ErrorCount: S.Number,
          PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
          RouteMatrix: __S(304, __c9, 16),
          RoutingBoundary: __S(297, __c9, 9),
        }),
      ).annotate({ identifier: "CalculateRouteMatrixResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Countries: __S(128, __c4, 0) })).annotate({
        identifier: "RouteMatrixExclusionOptions",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ TrailerCount: S.optional(S.Number) })).annotate({
        identifier: "RouteMatrixTrailerOptions",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Corridor: S.optional(__S(224, __c7, 0)),
          BoundingBox: S.optional(__S(160, __c5, 0)),
          Polygon: S.optional(__S(97, __c3, 1)),
          PolylineCorridor: S.optional(__S(225, __c7, 1)),
          PolylinePolygon: S.optional(__S(128, __c4, 0)),
        }),
      ).annotate({ identifier: "RouteAvoidanceAreaGeometry" });
    case 1:
      return S.Array(__S(384, __c12, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Except: S.optional(__S(385, __c12, 1)), Geometry: __S(384, __c12, 0) }),
      ).annotate({ identifier: "RouteAvoidanceArea" });
    case 3:
      return S.Array(__S(386, __c12, 2));
    case 4:
      return S.suspend(() => S.Struct({ Category: S.String })).annotate({
        identifier: "RouteAvoidanceZoneCategory",
      });
    case 5:
      return S.Array(__S(388, __c12, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          Areas: S.optional(__S(387, __c12, 3)),
          CarShuttleTrains: S.optional(S.Boolean),
          ControlledAccessHighways: S.optional(S.Boolean),
          DirtRoads: S.optional(S.Boolean),
          Ferries: S.optional(S.Boolean),
          SeasonalClosure: S.optional(S.Boolean),
          TollRoads: S.optional(S.Boolean),
          TollTransponders: S.optional(S.Boolean),
          TruckRoadTypes: S.optional(__S(128, __c4, 0)),
          Tunnels: S.optional(S.Boolean),
          UTurns: S.optional(S.Boolean),
          ZoneCategories: S.optional(__S(389, __c12, 5)),
        }),
      ).annotate({ identifier: "RouteAvoidanceOptions" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          AvoidActionsForDistance: S.optional(S.Number),
          AvoidUTurns: S.optional(S.Boolean),
          Heading: S.optional(S.Number),
          Matching: S.optional(__S(98, __c3, 2)),
          SideOfStreet: S.optional(__S(129, __c4, 1)),
          StopDuration: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RouteDestinationOptions" });
    case 8:
      return S.suspend(() =>
        S.Struct({ DriveDuration: S.Number, RestDuration: S.Number }),
      ).annotate({ identifier: "RouteDriverScheduleInterval" });
    case 9:
      return S.Array(__S(392, __c12, 8));
    case 10:
      return S.suspend(() => S.Struct({ Schedule: S.optional(__S(393, __c12, 9)) })).annotate({
        identifier: "RouteDriverOptions",
      });
    case 11:
      return S.Array(S.String);
    case 12:
      return S.suspend(() =>
        S.Struct({
          AvoidActionsForDistance: S.optional(S.Number),
          AvoidUTurns: S.optional(S.Boolean),
          Heading: S.optional(S.Number),
          Matching: S.optional(__S(98, __c3, 2)),
          SideOfStreet: S.optional(__S(129, __c4, 1)),
        }),
      ).annotate({ identifier: "RouteOriginOptions" });
    case 13:
      return S.suspend(() =>
        S.Struct({ Co2EmissionClass: S.optional(SensitiveString), Type: SensitiveString }),
      ).annotate({ identifier: "RouteEmissionType" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          AllTransponders: S.optional(S.Boolean),
          AllVignettes: S.optional(S.Boolean),
          Currency: S.optional(S.String),
          EmissionType: S.optional(__S(397, __c12, 13)),
          VehicleCategory: S.optional(S.String),
        }),
      ).annotate({ identifier: "RouteTollOptions" });
    case 15:
      return S.suspend(() => S.Struct({ LastCharacter: S.optional(SensitiveString) })).annotate({
        identifier: "RouteVehicleLicensePlate",
      });
    case 16:
      return S.suspend(() =>
        S.Struct({
          EngineType: S.optional(S.String),
          LicensePlate: S.optional(__S(399, __c12, 15)),
          MaxSpeed: S.optional(S.Number),
          Occupancy: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RouteCarOptions" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          AxleCount: S.optional(S.Number),
          EngineType: S.optional(S.String),
          GrossWeight: S.optional(S.Number),
          HazardousCargos: S.optional(__S(161, __c5, 1)),
          Height: S.optional(S.Number),
          HeightAboveFirstAxle: S.optional(S.Number),
          KpraLength: S.optional(S.Number),
          Length: S.optional(S.Number),
          LicensePlate: S.optional(__S(399, __c12, 15)),
          MaxSpeed: S.optional(S.Number),
          Occupancy: S.optional(S.Number),
          PayloadCapacity: S.optional(S.Number),
          TireCount: S.optional(S.Number),
          Trailer: S.optional(__S(226, __c7, 2)),
          TruckType: S.optional(S.String),
          TunnelRestrictionCode: S.optional(SensitiveString),
          WeightPerAxle: S.optional(S.Number),
          WeightPerAxleGroup: S.optional(__S(100, __c3, 4)),
          Width: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RouteTruckOptions" });
    case 18:
      return S.suspend(() =>
        S.Struct({ MaxDistance: S.optional(S.Number), Speed: S.optional(S.Number) }),
      ).annotate({ identifier: "RouteIntermodalPedestrianOptions" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          AllowedModes: S.optional(__S(161, __c5, 1)),
          EnabledFor: S.optional(__S(161, __c5, 1)),
          ExcludedModes: S.optional(__S(161, __c5, 1)),
        }),
      ).annotate({ identifier: "RouteIntermodalRentalOptions" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          AccessibilityAttributes: S.optional(__S(161, __c5, 1)),
          MaxTransfers: S.optional(S.Number),
          Pedestrian: S.optional(__S(402, __c12, 18)),
          Rental: S.optional(__S(403, __c12, 19)),
          Taxi: S.optional(__S(403, __c12, 19)),
          Transit: S.optional(__S(403, __c12, 19)),
          Vehicle: S.optional(__S(403, __c12, 19)),
        }),
      ).annotate({ identifier: "RouteIntermodalOptions" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          AccessibilityAttributes: S.optional(__S(161, __c5, 1)),
          AllowedModes: S.optional(__S(161, __c5, 1)),
          ExcludedModes: S.optional(__S(161, __c5, 1)),
          MaxTransfers: S.optional(S.Number),
          Pedestrian: S.optional(__S(402, __c12, 18)),
        }),
      ).annotate({ identifier: "RouteTransitOptions" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          Car: S.optional(__S(400, __c12, 16)),
          Pedestrian: S.optional(__S(544, __c17, 0)),
          Scooter: S.optional(__S(400, __c12, 16)),
          Truck: S.optional(__S(401, __c12, 17)),
          Intermodal: S.optional(__S(404, __c12, 20)),
          Transit: S.optional(__S(405, __c12, 21)),
        }),
      ).annotate({ identifier: "RouteTravelModeOptions" });
    case 23:
      return S.suspend(() =>
        S.Struct({
          AvoidActionsForDistance: S.optional(S.Number),
          AvoidUTurns: S.optional(S.Boolean),
          Heading: S.optional(S.Number),
          Matching: S.optional(__S(98, __c3, 2)),
          PassThrough: S.optional(S.Boolean),
          Position: __S(160, __c5, 0),
          SideOfStreet: S.optional(__S(129, __c4, 1)),
          StopDuration: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RouteWaypoint" });
    case 24:
      return S.Array(__S(407, __c12, 23));
    case 25:
      return S.suspend(() =>
        S.Struct({
          Allow: S.optional(__S(96, __c3, 0)),
          ArrivalTime: S.optional(SensitiveString),
          Avoid: S.optional(__S(390, __c12, 6)),
          DepartNow: S.optional(S.Boolean),
          DepartureTime: S.optional(SensitiveString),
          Destination: __S(160, __c5, 0),
          DestinationOptions: S.optional(__S(391, __c12, 7)),
          Driver: S.optional(__S(394, __c12, 10)),
          Exclude: S.optional(__S(320, __c10, 0)),
          InstructionsMeasurementSystem: S.optional(S.String),
          Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
          Languages: S.optional(__S(395, __c12, 11)),
          LegAdditionalFeatures: S.optional(__S(161, __c5, 1)),
          LegGeometryFormat: S.optional(S.String),
          MaxAlternatives: S.optional(S.Number),
          OptimizeRoutingFor: S.optional(S.String),
          Origin: __S(160, __c5, 0),
          OriginOptions: S.optional(__S(396, __c12, 12)),
          SpanAdditionalFeatures: S.optional(__S(161, __c5, 1)),
          Tolls: S.optional(__S(398, __c12, 14)),
          Traffic: S.optional(__S(99, __c3, 3)),
          TravelMode: S.optional(S.String),
          TravelModeOptions: S.optional(__S(406, __c12, 22)),
          TravelStepType: S.optional(S.String),
          Waypoints: S.optional(__S(408, __c12, 24)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/v2/routes" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CalculateRoutesRequest" });
    case 26:
      return S.suspend(() => S.Struct({ Code: S.String, Impact: S.optional(S.String) })).annotate({
        identifier: "RouteResponseNotice",
      });
    case 27:
      return S.Array(__S(410, __c12, 26));
    case 28:
      return S.suspend(() =>
        S.Struct({ Duration: S.Number, Instruction: S.optional(SensitiveString), Type: S.String }),
      ).annotate({ identifier: "RouteFerryAfterTravelStep" });
    case 29:
      return S.Array(__S(412, __c12, 28));
    case 30:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(SensitiveString),
          OriginalPosition: S.optional(__S(160, __c5, 0)),
          Position: __S(160, __c5, 0),
          WaypointIndex: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RouteFerryPlace" });
    case 31:
      return S.suspend(() =>
        S.Struct({ Place: __S(414, __c12, 30), Time: S.optional(SensitiveString) }),
      ).annotate({ identifier: "RouteFerryArrival" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OriginalPosition: S.optional(__S(160, __c5, 0)),
          Position: __S(160, __c5, 0),
          WaypointIndex: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RoutePassThroughPlace" });
    case 1:
      return S.suspend(() =>
        S.Struct({ GeometryOffset: S.optional(S.Number), Place: __S(416, __c13, 0) }),
      ).annotate({ identifier: "RoutePassThroughWaypoint" });
    case 2:
      return S.Array(__S(417, __c13, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Language: S.optional(S.String), Value: SensitiveString }),
      ).annotate({ identifier: "LocalizedString" });
    case 4:
      return S.Array(__S(419, __c13, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Country: S.optional(SensitiveString),
          Distance: S.optional(S.Number),
          Duration: S.optional(S.Number),
          GeometryOffset: S.optional(S.Number),
          Names: S.optional(__S(420, __c13, 4)),
          Region: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "RouteFerrySpan" });
    case 6:
      return S.Array(__S(421, __c13, 5));
    case 7:
      return S.suspend(() => S.Struct({ Distance: S.Number, Duration: S.Number })).annotate({
        identifier: "RouteFerryOverviewSummary",
      });
    case 8:
      return S.suspend(() => S.Struct({ Duration: S.Number })).annotate({
        identifier: "RouteFerryTravelOnlySummary",
      });
    case 9:
      return S.suspend(() =>
        S.Struct({
          Overview: S.optional(__S(423, __c13, 7)),
          TravelOnly: S.optional(__S(424, __c13, 8)),
        }),
      ).annotate({ identifier: "RouteFerrySummary" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          Distance: S.optional(S.Number),
          Duration: S.Number,
          GeometryOffset: S.optional(S.Number),
          Instruction: S.optional(SensitiveString),
          Type: S.String,
        }),
      ).annotate({ identifier: "RouteFerryTravelStep" });
    case 11:
      return S.Array(__S(426, __c13, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          AfterTravelSteps: S.optional(__S(413, __c12, 29)),
          Arrival: __S(415, __c12, 31),
          BeforeTravelSteps: S.optional(__S(413, __c12, 29)),
          Departure: __S(415, __c12, 31),
          Notices: S.optional(__S(411, __c12, 27)),
          PassThroughWaypoints: S.optional(__S(418, __c13, 2)),
          RouteName: S.optional(SensitiveString),
          Spans: S.optional(__S(422, __c13, 6)),
          Summary: S.optional(__S(425, __c13, 9)),
          TravelSteps: S.optional(__S(427, __c13, 11)),
        }),
      ).annotate({ identifier: "RouteFerryLegDetails" });
    case 13:
      return S.suspend(() => S.Struct({ Wheelchair: S.optional(S.String) })).annotate({
        identifier: "RouteAccessibilityAvailabilityDetails",
      });
    case 14:
      return S.suspend(() => S.Struct({ Accessibility: S.optional(__S(429, __c13, 13)) })).annotate(
        { identifier: "RouteAccessPointDetails" },
      );
    case 15:
      return S.suspend(() =>
        S.Struct({
          Accessibility: S.optional(__S(429, __c13, 13)),
          PlatformName: S.optional(SensitiveString),
          ShortName: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "RouteStationDetails" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          AccessPointDetails: S.optional(__S(430, __c13, 14)),
          Name: S.optional(SensitiveString),
          OriginalPosition: S.optional(__S(160, __c5, 0)),
          Position: __S(160, __c5, 0),
          SideOfStreet: S.optional(S.String),
          StationDetails: S.optional(__S(431, __c13, 15)),
          Type: S.optional(S.String),
          WaypointIndex: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RoutePedestrianPlace" });
    case 17:
      return S.suspend(() =>
        S.Struct({ Place: __S(432, __c13, 16), Time: S.optional(SensitiveString) }),
      ).annotate({ identifier: "RoutePedestrianArrival" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          BestCaseSpeed: S.optional(S.Number),
          TurnDuration: S.optional(S.Number),
          TypicalSpeed: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RouteSpanDynamicSpeedDetails" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          Direction: S.optional(S.String),
          Language: S.optional(S.String),
          Value: SensitiveString,
        }),
      ).annotate({ identifier: "RouteNumber" });
    case 20:
      return S.Array(__S(435, __c13, 19));
    case 21:
      return S.suspend(() =>
        S.Struct({ MaxSpeed: S.optional(S.Number), Unlimited: S.optional(S.Boolean) }),
      ).annotate({ identifier: "RouteSpanSpeedLimitDetails" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          BestCaseDuration: S.optional(S.Number),
          Country: S.optional(SensitiveString),
          Distance: S.optional(S.Number),
          Duration: S.optional(S.Number),
          DynamicSpeed: S.optional(__S(434, __c13, 18)),
          FunctionalClassification: S.optional(S.Number),
          GeometryOffset: S.optional(S.Number),
          Incidents: S.optional(__S(160, __c5, 0)),
          Names: S.optional(__S(420, __c13, 4)),
          PedestrianAccess: S.optional(__S(161, __c5, 1)),
          Region: S.optional(SensitiveString),
          RoadAttributes: S.optional(__S(161, __c5, 1)),
          RouteNumbers: S.optional(__S(436, __c13, 20)),
          SpeedLimit: S.optional(__S(437, __c13, 21)),
          TypicalDuration: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RoutePedestrianSpan" });
    case 23:
      return S.Array(__S(438, __c13, 22));
    case 24:
      return S.suspend(() => S.Struct({ Intersection: __S(420, __c13, 4) })).annotate({
        identifier: "RouteContinueStepDetails",
      });
    case 25:
      return S.suspend(() =>
        S.Struct({
          RoadName: __S(420, __c13, 4),
          RouteNumber: __S(436, __c13, 20),
          Towards: __S(420, __c13, 4),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "RouteRoad" });
    case 26:
      return S.suspend(() =>
        S.Struct({
          Intersection: __S(420, __c13, 4),
          SteeringDirection: S.optional(S.String),
          TurnAngle: S.optional(S.Number),
          TurnIntensity: S.optional(S.String),
        }),
      ).annotate({ identifier: "RouteKeepStepDetails" });
    case 27:
      return S.suspend(() =>
        S.Struct({
          Intersection: __S(420, __c13, 4),
          RelativeExit: S.optional(S.Number),
          RoundaboutAngle: S.optional(S.Number),
          SteeringDirection: S.optional(S.String),
        }),
      ).annotate({ identifier: "RouteRoundaboutExitStepDetails" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          RouteNumber: S.optional(__S(435, __c13, 19)),
          Text: S.optional(__S(419, __c13, 3)),
        }),
      ).annotate({ identifier: "RouteSignpostLabel" });
    case 29:
      return S.Array(__S(444, __c13, 28));
    case 30:
      return S.suspend(() => S.Struct({ Labels: __S(445, __c13, 29) })).annotate({
        identifier: "RouteSignpost",
      });
    case 31:
      return S.suspend(() =>
        S.Struct({
          ContinueStepDetails: S.optional(__S(440, __c13, 24)),
          CurrentRoad: S.optional(__S(441, __c13, 25)),
          Distance: S.optional(S.Number),
          Duration: S.Number,
          ExitNumber: S.optional(__S(420, __c13, 4)),
          GeometryOffset: S.optional(S.Number),
          Instruction: S.optional(SensitiveString),
          KeepStepDetails: S.optional(__S(442, __c13, 26)),
          NextRoad: S.optional(__S(441, __c13, 25)),
          RoundaboutEnterStepDetails: S.optional(__S(442, __c13, 26)),
          RoundaboutExitStepDetails: S.optional(__S(443, __c13, 27)),
          RoundaboutPassStepDetails: S.optional(__S(442, __c13, 26)),
          Signpost: S.optional(__S(446, __c13, 30)),
          TurnStepDetails: S.optional(__S(442, __c13, 26)),
          Type: S.String,
        }),
      ).annotate({ identifier: "RoutePedestrianTravelStep" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(447, __c13, 31));
    case 1:
      return S.suspend(() =>
        S.Struct({
          AfterTravelSteps: S.optional(__S(413, __c12, 29)),
          Arrival: __S(433, __c13, 17),
          Departure: __S(433, __c13, 17),
          Notices: S.optional(__S(411, __c12, 27)),
          PassThroughWaypoints: S.optional(__S(418, __c13, 2)),
          Spans: S.optional(__S(439, __c13, 23)),
          Summary: S.optional(__S(425, __c13, 9)),
          TravelSteps: S.optional(__S(448, __c14, 0)),
        }),
      ).annotate({ identifier: "RoutePedestrianLegDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ArrivalCharge: S.optional(S.Number),
          ConsumablePower: S.optional(S.Number),
          DesiredCharge: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RouteChargeStepDetails" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ChargeStepDetails: S.optional(__S(450, __c14, 2)),
          Duration: S.Number,
          Instruction: S.optional(SensitiveString),
          Type: S.String,
        }),
      ).annotate({ identifier: "RouteVehicleAfterTravelStep" });
    case 4:
      return S.Array(__S(451, __c14, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(SensitiveString),
          OriginalPosition: S.optional(__S(160, __c5, 0)),
          Position: __S(160, __c5, 0),
          SideOfStreet: S.optional(S.String),
          WaypointIndex: S.optional(S.Number),
          AccessPointDetails: S.optional(__S(430, __c13, 14)),
          StationDetails: S.optional(__S(431, __c13, 15)),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "RouteVehiclePlace" });
    case 6:
      return S.suspend(() =>
        S.Struct({ Place: __S(453, __c14, 5), Time: S.optional(SensitiveString) }),
      ).annotate({ identifier: "RouteVehicleArrival" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(SensitiveString),
          EndTime: S.optional(SensitiveString),
          Severity: S.optional(S.String),
          StartTime: S.optional(SensitiveString),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "RouteVehicleIncident" });
    case 8:
      return S.Array(__S(455, __c14, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({ Min: S.optional(S.Number), Max: S.optional(S.Number) }),
      ).annotate({ identifier: "RouteNoticeDetailRange" });
    case 10:
      return S.suspend(() => S.Struct({ Type: S.String, Value: S.Number })).annotate({
        identifier: "RouteWeightConstraint",
      });
    case 11:
      return S.suspend(() =>
        S.Struct({
          AllHazardsRestricted: S.optional(S.Boolean),
          AxleCount: S.optional(__S(457, __c14, 9)),
          HazardousCargos: __S(161, __c5, 1),
          MaxHeight: S.optional(S.Number),
          MaxKpraLength: S.optional(S.Number),
          MaxLength: S.optional(S.Number),
          MaxPayloadCapacity: S.optional(S.Number),
          MaxWeight: S.optional(__S(458, __c14, 10)),
          MaxWeightPerAxle: S.optional(S.Number),
          MaxWeightPerAxleGroup: S.optional(__S(100, __c3, 4)),
          MaxWidth: S.optional(S.Number),
          Occupancy: S.optional(__S(457, __c14, 9)),
          RestrictedTimes: S.optional(S.String),
          TimeDependent: S.optional(S.Boolean),
          TrailerCount: S.optional(__S(457, __c14, 9)),
          TravelMode: S.optional(S.Boolean),
          TruckRoadType: S.optional(S.String),
          TruckType: S.optional(S.String),
          TunnelRestrictionCode: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "RouteViolatedConstraints" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          Title: S.optional(SensitiveString),
          ViolatedConstraints: S.optional(__S(459, __c14, 11)),
        }),
      ).annotate({ identifier: "RouteVehicleNoticeDetail" });
    case 13:
      return S.Array(__S(460, __c14, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({ Code: S.String, Details: __S(461, __c14, 13), Impact: S.optional(S.String) }),
      ).annotate({ identifier: "RouteVehicleNotice" });
    case 15:
      return S.Array(__S(462, __c14, 14));
    case 16:
      return S.suspend(() =>
        S.Struct({
          BestCaseDuration: S.optional(S.Number),
          CarAccess: S.optional(__S(161, __c5, 1)),
          Country: S.optional(SensitiveString),
          Distance: S.optional(S.Number),
          Duration: S.optional(S.Number),
          DynamicSpeed: S.optional(__S(434, __c13, 18)),
          FunctionalClassification: S.optional(S.Number),
          Gate: S.optional(S.String),
          GeometryOffset: S.optional(S.Number),
          Incidents: S.optional(__S(160, __c5, 0)),
          Names: S.optional(__S(420, __c13, 4)),
          Notices: S.optional(__S(160, __c5, 0)),
          RailwayCrossing: S.optional(S.String),
          Region: S.optional(SensitiveString),
          RoadAttributes: S.optional(__S(161, __c5, 1)),
          RouteNumbers: S.optional(__S(436, __c13, 20)),
          ScooterAccess: S.optional(__S(161, __c5, 1)),
          SpeedLimit: S.optional(__S(437, __c13, 21)),
          TollSystems: S.optional(__S(160, __c5, 0)),
          TruckAccess: S.optional(__S(161, __c5, 1)),
          TruckRoadTypes: S.optional(__S(160, __c5, 0)),
          TypicalDuration: S.optional(S.Number),
          Zones: S.optional(__S(160, __c5, 0)),
        }),
      ).annotate({ identifier: "RouteVehicleSpan" });
    case 17:
      return S.Array(__S(464, __c14, 16));
    case 18:
      return S.suspend(() =>
        S.Struct({
          BestCaseDuration: S.optional(S.Number),
          Distance: S.Number,
          Duration: S.Number,
          TypicalDuration: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RouteVehicleOverviewSummary" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          BestCaseDuration: S.optional(S.Number),
          Duration: S.Number,
          TypicalDuration: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RouteVehicleTravelOnlySummary" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          Overview: S.optional(__S(466, __c14, 18)),
          TravelOnly: S.optional(__S(467, __c14, 19)),
        }),
      ).annotate({ identifier: "RouteVehicleSummary" });
    case 21:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Position: __S(160, __c5, 0) }),
      ).annotate({ identifier: "RouteTollPaymentSite" });
    case 22:
      return S.Array(__S(469, __c14, 21));
    case 23:
      return S.suspend(() => S.Struct({ Min: S.Number, Max: S.Number })).annotate({
        identifier: "RouteTollPriceValueRange",
      });
    case 24:
      return S.suspend(() =>
        S.Struct({
          Currency: S.String,
          Estimate: S.Boolean,
          PerDuration: S.optional(S.Number),
          Range: S.Boolean,
          RangeValue: S.optional(__S(471, __c14, 23)),
          Value: S.Number,
        }),
      ).annotate({ identifier: "RouteTollPrice" });
    case 25:
      return S.suspend(() =>
        S.Struct({ Period: S.String, PeriodCount: S.optional(S.Number) }),
      ).annotate({ identifier: "RouteTollPassValidityPeriod" });
    case 26:
      return S.suspend(() =>
        S.Struct({
          IncludesReturnTrip: S.optional(S.Boolean),
          SeniorPass: S.optional(S.Boolean),
          TransferCount: S.optional(S.Number),
          TripCount: S.optional(S.Number),
          ValidityPeriod: S.optional(__S(473, __c14, 25)),
        }),
      ).annotate({ identifier: "RouteTollPass" });
    case 27:
      return S.suspend(() => S.Struct({ SystemName: S.optional(SensitiveString) })).annotate({
        identifier: "RouteTransponder",
      });
    case 28:
      return S.Array(__S(475, __c14, 27));
    case 29:
      return S.suspend(() =>
        S.Struct({
          ApplicableTimes: S.optional(SensitiveString),
          ConvertedPrice: S.optional(__S(472, __c14, 24)),
          Id: SensitiveString,
          LocalPrice: __S(472, __c14, 24),
          Name: SensitiveString,
          Pass: S.optional(__S(474, __c14, 26)),
          PaymentMethods: __S(161, __c5, 1),
          Transponders: __S(476, __c14, 28),
        }),
      ).annotate({ identifier: "RouteTollRate" });
    case 30:
      return S.Array(__S(477, __c14, 29));
    case 31:
      return S.suspend(() =>
        S.Struct({
          Country: S.optional(SensitiveString),
          PaymentSites: __S(470, __c14, 22),
          Rates: __S(478, __c14, 30),
          Systems: __S(160, __c5, 0),
        }),
      ).annotate({ identifier: "RouteToll" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(479, __c14, 31));
    case 1:
      return S.suspend(() => S.Struct({ Name: S.optional(SensitiveString) })).annotate({
        identifier: "RouteTollSystem",
      });
    case 2:
      return S.Array(__S(481, __c15, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Intersection: __S(420, __c13, 4),
          RelativeExit: S.optional(S.Number),
          SteeringDirection: S.optional(S.String),
          TurnAngle: S.optional(S.Number),
          TurnIntensity: S.optional(S.String),
        }),
      ).annotate({ identifier: "RouteExitStepDetails" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          ContinueHighwayStepDetails: S.optional(__S(442, __c13, 26)),
          ContinueStepDetails: S.optional(__S(440, __c13, 24)),
          CurrentRoad: S.optional(__S(441, __c13, 25)),
          Distance: S.optional(S.Number),
          Duration: S.Number,
          EnterHighwayStepDetails: S.optional(__S(442, __c13, 26)),
          ExitNumber: S.optional(__S(420, __c13, 4)),
          ExitStepDetails: S.optional(__S(483, __c15, 3)),
          GeometryOffset: S.optional(S.Number),
          Instruction: S.optional(SensitiveString),
          KeepStepDetails: S.optional(__S(442, __c13, 26)),
          NextRoad: S.optional(__S(441, __c13, 25)),
          RampStepDetails: S.optional(__S(442, __c13, 26)),
          RoundaboutEnterStepDetails: S.optional(__S(442, __c13, 26)),
          RoundaboutExitStepDetails: S.optional(__S(443, __c13, 27)),
          RoundaboutPassStepDetails: S.optional(__S(442, __c13, 26)),
          Signpost: S.optional(__S(446, __c13, 30)),
          TurnStepDetails: S.optional(__S(442, __c13, 26)),
          Type: S.String,
          UTurnStepDetails: S.optional(__S(442, __c13, 26)),
        }),
      ).annotate({ identifier: "RouteVehicleTravelStep" });
    case 5:
      return S.Array(__S(484, __c15, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ Category: S.optional(S.String), Name: S.optional(SensitiveString) }),
      ).annotate({ identifier: "RouteZone" });
    case 7:
      return S.Array(__S(486, __c15, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          AfterTravelSteps: S.optional(__S(452, __c14, 4)),
          Arrival: __S(454, __c14, 6),
          Departure: __S(454, __c14, 6),
          Incidents: S.optional(__S(456, __c14, 8)),
          Notices: S.optional(__S(463, __c14, 15)),
          PassThroughWaypoints: S.optional(__S(418, __c13, 2)),
          Spans: S.optional(__S(465, __c14, 17)),
          Summary: S.optional(__S(468, __c14, 20)),
          Tolls: S.optional(__S(480, __c15, 0)),
          TollSystems: S.optional(__S(482, __c15, 2)),
          TravelSteps: S.optional(__S(485, __c15, 5)),
          TruckRoadTypes: S.optional(__S(128, __c4, 0)),
          Zones: S.optional(__S(487, __c15, 7)),
        }),
      ).annotate({ identifier: "RouteVehicleLegDetails" });
    case 9:
      return S.suspend(() =>
        S.Struct({ Name: SensitiveString, Url: S.optional(SensitiveString) }),
      ).annotate({ identifier: "RouteRentalAgency" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          AccessPointDetails: S.optional(__S(430, __c13, 14)),
          Name: S.optional(SensitiveString),
          OriginalPosition: S.optional(__S(160, __c5, 0)),
          Position: __S(160, __c5, 0),
          StationDetails: S.optional(__S(431, __c13, 15)),
          Type: S.optional(S.String),
          WaypointIndex: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RouteRentalPlace" });
    case 11:
      return S.suspend(() =>
        S.Struct({ Place: __S(490, __c15, 10), Time: S.optional(SensitiveString) }),
      ).annotate({ identifier: "RouteRentalArrival" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          AnchorText: S.optional(SensitiveString),
          Description: SensitiveString,
          DeviceType: S.optional(S.String),
          Url: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "RouteWebLink" });
    case 13:
      return S.suspend(() =>
        S.Struct({ AttributionType: S.optional(S.String), WebLink: __S(492, __c15, 12) }),
      ).annotate({ identifier: "RouteAttribution" });
    case 14:
      return S.Array(__S(493, __c15, 13));
    case 15:
      return S.Array(__S(492, __c15, 12));
    case 16:
      return S.suspend(() => S.Struct({ Duration: S.Number, Distance: S.Number })).annotate({
        identifier: "RouteRentalOverviewSummary",
      });
    case 17:
      return S.suspend(() =>
        S.Struct({
          Overview: S.optional(__S(496, __c15, 16)),
          TravelOnly: S.optional(__S(424, __c13, 8)),
        }),
      ).annotate({ identifier: "RouteRentalSummary" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          AvailableSeats: S.optional(S.Number),
          Category: S.optional(SensitiveString),
          Color: S.optional(SensitiveString),
          Engine: S.optional(S.String),
          LicensePlate: S.optional(SensitiveString),
          Mode: S.String,
          Model: S.optional(SensitiveString),
          Name: S.optional(SensitiveString),
          TextColor: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "RouteRentalTransportModeDetails" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          ContinueStepDetails: S.optional(__S(440, __c13, 24)),
          Distance: S.optional(S.Number),
          Duration: S.Number,
          ExitStepDetails: S.optional(__S(483, __c15, 3)),
          GeometryOffset: S.optional(S.Number),
          Instruction: S.optional(SensitiveString),
          KeepStepDetails: S.optional(__S(442, __c13, 26)),
          RampStepDetails: S.optional(__S(442, __c13, 26)),
          RoundaboutEnterStepDetails: S.optional(__S(442, __c13, 26)),
          RoundaboutExitStepDetails: S.optional(__S(443, __c13, 27)),
          RoundaboutPassStepDetails: S.optional(__S(442, __c13, 26)),
          TurnStepDetails: S.optional(__S(442, __c13, 26)),
          Type: S.String,
          UTurnStepDetails: S.optional(__S(442, __c13, 26)),
        }),
      ).annotate({ identifier: "RouteRentalTravelStep" });
    case 20:
      return S.Array(__S(499, __c15, 19));
    case 21:
      return S.suspend(() =>
        S.Struct({
          AfterTravelSteps: S.optional(__S(413, __c12, 29)),
          Agency: __S(489, __c15, 9),
          Arrival: __S(491, __c15, 11),
          Attributions: S.optional(__S(494, __c15, 14)),
          BeforeTravelSteps: S.optional(__S(413, __c12, 29)),
          BookingWebLinks: S.optional(__S(495, __c15, 15)),
          Departure: __S(491, __c15, 11),
          Summary: S.optional(__S(497, __c15, 17)),
          Transport: __S(498, __c15, 18),
          TravelSteps: S.optional(__S(500, __c15, 20)),
        }),
      ).annotate({ identifier: "RouteRentalLegDetails" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          AfterTravelSteps: S.optional(__S(413, __c12, 29)),
          Agency: __S(489, __c15, 9),
          Arrival: __S(491, __c15, 11),
          Attributions: S.optional(__S(494, __c15, 14)),
          BeforeTravelSteps: S.optional(__S(413, __c12, 29)),
          BookingWebLinks: S.optional(__S(495, __c15, 15)),
          Departure: __S(491, __c15, 11),
          Notices: S.optional(__S(411, __c12, 27)),
          Summary: S.optional(__S(497, __c15, 17)),
          Transport: __S(498, __c15, 18),
          TravelSteps: S.optional(__S(500, __c15, 20)),
        }),
      ).annotate({ identifier: "RouteTaxiLegDetails" });
    case 23:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(SensitiveString),
          OriginalPosition: S.optional(__S(160, __c5, 0)),
          Position: __S(160, __c5, 0),
          StationDetails: S.optional(__S(431, __c13, 15)),
          Type: S.optional(S.String),
          WaypointIndex: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RouteTransitPlace" });
    case 24:
      return S.suspend(() =>
        S.Struct({
          Delay: S.optional(S.Number),
          Place: __S(503, __c15, 23),
          Status: S.optional(S.String),
          Time: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "RouteTransitArrival" });
    case 25:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(SensitiveString),
          Effect: S.String,
          EndTime: S.optional(SensitiveString),
          StartTime: S.optional(SensitiveString),
          Type: S.String,
          Url: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "RouteTransitIncident" });
    case 26:
      return S.Array(__S(505, __c15, 25));
    case 27:
      return S.suspend(() =>
        S.Struct({
          Accessibility: S.optional(__S(429, __c13, 13)),
          Color: S.optional(SensitiveString),
          Headsign: S.optional(SensitiveString),
          LongRouteName: S.optional(SensitiveString),
          Mode: S.String,
          RouteName: S.optional(SensitiveString),
          ShortRouteName: S.optional(SensitiveString),
          TextColor: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "RouteTransitTransportModeDetails" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          Attributes: S.optional(__S(161, __c5, 1)),
          Departure: __S(504, __c15, 24),
          Duration: S.Number,
          GeometryOffset: S.optional(S.Number),
          Transport: S.optional(__S(507, __c15, 27)),
        }),
      ).annotate({ identifier: "RouteTransitIntermediateStop" });
    case 29:
      return S.Array(__S(508, __c15, 28));
    case 30:
      return S.suspend(() =>
        S.Struct({
          Delay: S.optional(S.Number),
          PlatformName: S.optional(SensitiveString),
          Status: S.optional(S.String),
          Time: SensitiveString,
          Transport: S.optional(__S(507, __c15, 27)),
        }),
      ).annotate({ identifier: "RouteTransitNextDeparture" });
    case 31:
      return S.Array(__S(510, __c15, 30));
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AfterTravelSteps: S.optional(__S(413, __c12, 29)),
          Agency: S.optional(__S(489, __c15, 9)),
          Arrival: __S(504, __c15, 24),
          Attributions: S.optional(__S(494, __c15, 14)),
          BeforeTravelSteps: S.optional(__S(413, __c12, 29)),
          BookingWebLinks: S.optional(__S(495, __c15, 15)),
          Departure: __S(504, __c15, 24),
          Incidents: S.optional(__S(506, __c15, 26)),
          IntermediateStops: S.optional(__S(509, __c15, 29)),
          NextDepartures: S.optional(__S(511, __c15, 31)),
          Notices: S.optional(__S(411, __c12, 27)),
          PassThroughWaypoints: S.optional(__S(418, __c13, 2)),
          Spans: S.optional(__S(422, __c13, 6)),
          Summary: S.optional(__S(425, __c13, 9)),
          Transport: __S(507, __c15, 27),
          TravelSteps: S.optional(__S(427, __c13, 11)),
        }),
      ).annotate({ identifier: "RouteTransitLegDetails" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FerryLegDetails: S.optional(__S(428, __c13, 12)),
          Geometry: __S(256, __c8, 0),
          Language: S.optional(S.String),
          PedestrianLegDetails: S.optional(__S(449, __c14, 1)),
          TravelMode: S.String,
          Type: S.String,
          VehicleLegDetails: S.optional(__S(488, __c15, 8)),
          RentalLegDetails: S.optional(__S(501, __c15, 21)),
          TaxiLegDetails: S.optional(__S(502, __c15, 22)),
          TransitLegDetails: S.optional(__S(512, __c16, 0)),
        }),
      ).annotate({ identifier: "RouteLeg" });
    case 2:
      return S.Array(__S(513, __c16, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          RoadName: S.optional(__S(419, __c13, 3)),
          RouteNumber: S.optional(__S(435, __c13, 19)),
        }),
      ).annotate({ identifier: "RouteMajorRoadLabel" });
    case 4:
      return S.Array(__S(515, __c16, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Currency: S.String,
          Estimate: S.Boolean,
          Range: S.Boolean,
          RangeValue: S.optional(__S(471, __c14, 23)),
          Value: S.Number,
        }),
      ).annotate({ identifier: "RouteTollPriceSummary" });
    case 6:
      return S.suspend(() => S.Struct({ Total: S.optional(__S(517, __c16, 5)) })).annotate({
        identifier: "RouteTollSummary",
      });
    case 7:
      return S.suspend(() =>
        S.Struct({
          Distance: S.optional(S.Number),
          Duration: S.optional(S.Number),
          Tolls: S.optional(__S(518, __c16, 6)),
        }),
      ).annotate({ identifier: "RouteSummary" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          Legs: __S(514, __c16, 2),
          MajorRoadLabels: __S(516, __c16, 4),
          Summary: S.optional(__S(519, __c16, 7)),
        }),
      ).annotate({ identifier: "Route" });
    case 9:
      return S.Array(__S(520, __c16, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          LegGeometryFormat: S.String,
          Notices: __S(411, __c12, 27),
          PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
          Routes: __S(521, __c16, 9),
        }),
      ).annotate({ identifier: "CalculateRoutesResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Speed: S.optional(S.Number) })).annotate({
        identifier: "RoutePedestrianOptions",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ BoundingBox: S.optional(__S(160, __c5, 0)) })).annotate({
        identifier: "WaypointOptimizationAvoidanceAreaGeometry",
      });
    case 1:
      return S.suspend(() => S.Struct({ Geometry: __S(576, __c18, 0) })).annotate({
        identifier: "WaypointOptimizationAvoidanceArea",
      });
    case 2:
      return S.Array(__S(577, __c18, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Areas: S.optional(__S(578, __c18, 2)),
          CarShuttleTrains: S.optional(S.Boolean),
          ControlledAccessHighways: S.optional(S.Boolean),
          DirtRoads: S.optional(S.Boolean),
          Ferries: S.optional(S.Boolean),
          TollRoads: S.optional(S.Boolean),
          Tunnels: S.optional(S.Boolean),
          UTurns: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "WaypointOptimizationAvoidanceOptions" });
    case 4:
      return S.suspend(() => S.Struct({ DrivingDistance: S.Number })).annotate({
        identifier: "WaypointOptimizationDrivingDistanceOptions",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({ Algorithm: S.String, DrivingDistanceOptions: S.optional(__S(580, __c18, 4)) }),
      ).annotate({ identifier: "WaypointOptimizationClusteringOptions" });
    case 6:
      return S.suspend(() =>
        S.Struct({ DayOfWeek: S.String, TimeOfDay: SensitiveString }),
      ).annotate({ identifier: "WaypointOptimizationAccessHoursEntry" });
    case 7:
      return S.suspend(() =>
        S.Struct({ From: __S(582, __c18, 6), To: __S(582, __c18, 6) }),
      ).annotate({ identifier: "WaypointOptimizationAccessHours" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          AccessHours: S.optional(__S(583, __c18, 7)),
          AppointmentTime: S.optional(SensitiveString),
          Heading: S.optional(S.Number),
          Id: S.optional(S.String),
          ServiceDuration: S.optional(S.Number),
          SideOfStreet: S.optional(__S(129, __c4, 1)),
        }),
      ).annotate({ identifier: "WaypointOptimizationDestinationOptions" });
    case 9:
      return S.suspend(() => S.Struct({ RestDuration: S.Number, WorkDuration: S.Number })).annotate(
        { identifier: "WaypointOptimizationRestCycleDurations" },
      );
    case 10:
      return S.suspend(() =>
        S.Struct({ LongCycle: __S(585, __c18, 9), ShortCycle: __S(585, __c18, 9) }),
      ).annotate({ identifier: "WaypointOptimizationRestCycles" });
    case 11:
      return S.suspend(() => S.Struct({ Profile: SensitiveString })).annotate({
        identifier: "WaypointOptimizationRestProfile",
      });
    case 12:
      return S.suspend(() =>
        S.Struct({
          RestCycles: S.optional(__S(586, __c18, 10)),
          RestProfile: S.optional(__S(587, __c18, 11)),
          TreatServiceTimeAs: S.optional(S.String),
        }),
      ).annotate({ identifier: "WaypointOptimizationDriverOptions" });
    case 13:
      return S.suspend(() => S.Struct({ Id: S.optional(S.String) })).annotate({
        identifier: "WaypointOptimizationOriginOptions",
      });
    case 14:
      return S.suspend(() => S.Struct({ Usage: S.optional(S.String) })).annotate({
        identifier: "WaypointOptimizationTrafficOptions",
      });
    case 15:
      return S.suspend(() =>
        S.Struct({
          GrossWeight: S.optional(S.Number),
          HazardousCargos: S.optional(__S(161, __c5, 1)),
          Height: S.optional(S.Number),
          Length: S.optional(S.Number),
          Trailer: S.optional(__S(352, __c11, 0)),
          TruckType: S.optional(S.String),
          TunnelRestrictionCode: S.optional(SensitiveString),
          WeightPerAxle: S.optional(S.Number),
          Width: S.optional(S.Number),
        }),
      ).annotate({ identifier: "WaypointOptimizationTruckOptions" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          Pedestrian: S.optional(__S(544, __c17, 0)),
          Truck: S.optional(__S(591, __c18, 15)),
        }),
      ).annotate({ identifier: "WaypointOptimizationTravelModeOptions" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          AccessHours: S.optional(__S(583, __c18, 7)),
          AppointmentTime: S.optional(SensitiveString),
          Before: S.optional(__S(160, __c5, 0)),
          Heading: S.optional(S.Number),
          Id: S.optional(S.String),
          Position: __S(160, __c5, 0),
          ServiceDuration: S.optional(S.Number),
          SideOfStreet: S.optional(__S(129, __c4, 1)),
        }),
      ).annotate({ identifier: "WaypointOptimizationWaypoint" });
    case 18:
      return S.Array(__S(593, __c18, 17));
    case 19:
      return S.suspend(() =>
        S.Struct({
          Avoid: S.optional(__S(579, __c18, 3)),
          Clustering: S.optional(__S(581, __c18, 5)),
          DepartureTime: S.optional(SensitiveString),
          Destination: S.optional(__S(160, __c5, 0)),
          DestinationOptions: S.optional(__S(584, __c18, 8)),
          Driver: S.optional(__S(588, __c18, 12)),
          Exclude: S.optional(__S(320, __c10, 0)),
          Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
          OptimizeSequencingFor: S.optional(S.String),
          Origin: __S(160, __c5, 0),
          OriginOptions: S.optional(__S(589, __c18, 13)),
          Traffic: S.optional(__S(590, __c18, 14)),
          TravelMode: S.optional(S.String),
          TravelModeOptions: S.optional(__S(592, __c18, 16)),
          Waypoints: S.optional(__S(594, __c18, 18)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/optimize-waypoints" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "OptimizeWaypointsRequest" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          Distance: S.Number,
          From: S.String,
          RestDuration: S.Number,
          To: S.String,
          TravelDuration: S.Number,
          WaitDuration: S.Number,
        }),
      ).annotate({ identifier: "WaypointOptimizationConnection" });
    case 21:
      return S.Array(__S(596, __c18, 20));
    case 22:
      return S.suspend(() =>
        S.Struct({ Constraint: S.optional(S.String), Reason: S.optional(SensitiveString) }),
      ).annotate({ identifier: "WaypointOptimizationFailedConstraint" });
    case 23:
      return S.Array(__S(598, __c18, 22));
    case 24:
      return S.suspend(() =>
        S.Struct({
          FailedConstraints: __S(599, __c18, 23),
          Id: S.String,
          Position: __S(160, __c5, 0),
        }),
      ).annotate({ identifier: "WaypointOptimizationImpedingWaypoint" });
    case 25:
      return S.Array(__S(600, __c18, 24));
    case 26:
      return S.suspend(() =>
        S.Struct({
          ArrivalTime: S.optional(SensitiveString),
          ClusterIndex: S.optional(S.Number),
          DepartureTime: S.optional(SensitiveString),
          Id: S.String,
          Position: __S(160, __c5, 0),
        }),
      ).annotate({ identifier: "WaypointOptimizationOptimizedWaypoint" });
    case 27:
      return S.Array(__S(602, __c18, 26));
    case 28:
      return S.suspend(() =>
        S.Struct({
          RestDuration: S.Number,
          ServiceDuration: S.Number,
          TravelDuration: S.Number,
          WaitDuration: S.Number,
        }),
      ).annotate({ identifier: "WaypointOptimizationTimeBreakdown" });
    case 29:
      return S.suspend(() =>
        S.Struct({
          Connections: __S(597, __c18, 21),
          Distance: S.Number,
          Duration: S.Number,
          ImpedingWaypoints: __S(601, __c18, 25),
          OptimizedWaypoints: __S(603, __c18, 27),
          PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
          TimeBreakdown: __S(604, __c18, 28),
        }),
      ).annotate({ identifier: "OptimizeWaypointsResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Heading: S.optional(S.Number),
          Position: __S(160, __c5, 0),
          Speed: S.optional(S.Number),
          Timestamp: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "RoadSnapTracePoint" });
    case 1:
      return S.Array(__S(608, __c19, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          GrossWeight: S.optional(S.Number),
          HazardousCargos: S.optional(__S(161, __c5, 1)),
          Height: S.optional(S.Number),
          Length: S.optional(S.Number),
          Trailer: S.optional(__S(352, __c11, 0)),
          TunnelRestrictionCode: S.optional(SensitiveString),
          Width: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RoadSnapTruckOptions" });
    case 3:
      return S.suspend(() => S.Struct({ Truck: S.optional(__S(610, __c19, 2)) })).annotate({
        identifier: "RoadSnapTravelModeOptions",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
          SnappedGeometryFormat: S.optional(S.String),
          SnapRadius: S.optional(S.Number),
          TracePoints: __S(609, __c19, 1),
          TravelMode: S.optional(S.String),
          TravelModeOptions: S.optional(__S(611, __c19, 3)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v2/snap-to-roads" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SnapToRoadsRequest" });
    case 5:
      return S.suspend(() =>
        S.Struct({ Code: S.String, Title: SensitiveString, TracePointIndexes: __S(160, __c5, 0) }),
      ).annotate({ identifier: "RoadSnapNotice" });
    case 6:
      return S.Array(__S(613, __c19, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          Confidence: S.Number,
          OriginalPosition: __S(160, __c5, 0),
          SnappedPosition: __S(160, __c5, 0),
        }),
      ).annotate({ identifier: "RoadSnapSnappedTracePoint" });
    case 8:
      return S.Array(__S(615, __c19, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          Notices: __S(614, __c19, 6),
          PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
          SnappedGeometry: S.optional(__S(256, __c8, 0)),
          SnappedGeometryFormat: S.String,
          SnappedTracePoints: __S(616, __c19, 8),
        }),
      ).annotate({ identifier: "SnapToRoadsResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
