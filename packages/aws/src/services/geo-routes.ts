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
  sdkId: "Geo Routes",
  target: "RoutesService",
  version: "2020-11-19",
  sigv4: "geo-routes",
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
              `https://routes.geo.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://geo-routes.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://geo-routes.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export type SensitiveBoolean = boolean;
export interface IsolineAllowOptions {
  Hot?: boolean;
  Hov?: boolean;
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
  BoundingBox?: number[];
  Corridor?: Corridor;
  Polygon?: number[][][];
  PolylineCorridor?: PolylineCorridor;
  PolylinePolygon?: (string | redacted.Redacted<string>)[];
}
export type IsolineAvoidanceAreaGeometryList = IsolineAvoidanceAreaGeometry[];
export interface IsolineAvoidanceArea {
  Except?: IsolineAvoidanceAreaGeometry[];
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
  Category?: IsolineZoneCategory;
}
export type IsolineAvoidanceZoneCategoryList = IsolineAvoidanceZoneCategory[];
export interface IsolineAvoidanceOptions {
  Areas?: IsolineAvoidanceArea[];
  CarShuttleTrains?: boolean;
  ControlledAccessHighways?: boolean;
  DirtRoads?: boolean;
  Ferries?: boolean;
  SeasonalClosure?: boolean;
  TollRoads?: boolean;
  TollTransponders?: boolean;
  TruckRoadTypes?: (string | redacted.Redacted<string>)[];
  Tunnels?: boolean;
  UTurns?: boolean;
  ZoneCategories?: IsolineAvoidanceZoneCategory[];
}
export type DistanceMeters = number;
export type Heading = number;
export type SensitiveString = string | redacted.Redacted<string>;
export type MatchingStrategy =
  | "MatchAny"
  | "MatchMostSignificantRoad"
  | (string & {});
export interface IsolineMatchingOptions {
  NameHint?: string | redacted.Redacted<string>;
  OnRoadThreshold?: number;
  Radius?: number;
  Strategy?: MatchingStrategy;
}
export type SideOfStreetMatchingStrategy =
  | "AnyStreet"
  | "DividedStreetOnly"
  | (string & {});
export interface IsolineSideOfStreetOptions {
  Position: number[];
  UseWith?: SideOfStreetMatchingStrategy;
}
export interface IsolineDestinationOptions {
  AvoidActionsForDistance?: number;
  Heading?: number;
  Matching?: IsolineMatchingOptions;
  SideOfStreet?: IsolineSideOfStreetOptions;
}
export type GeometryFormat = "FlexiblePolyline" | "Simple" | (string & {});
export interface IsolineGranularityOptions {
  MaxPoints?: number;
  MaxResolution?: number;
}
export type ApiKey = string | redacted.Redacted<string>;
export type IsolineOptimizationObjective =
  | "AccurateCalculation"
  | "BalancedCalculation"
  | "FastCalculation"
  | (string & {});
export type RoutingObjective = "FastestRoute" | "ShortestRoute" | (string & {});
export interface IsolineOriginOptions {
  AvoidActionsForDistance?: number;
  Heading?: number;
  Matching?: IsolineMatchingOptions;
  SideOfStreet?: IsolineSideOfStreetOptions;
}
export type DistanceThresholdList = number[];
export type DurationSeconds = number;
export type TimeThresholdList = number[];
export interface IsolineThresholds {
  Distance?: number[];
  Time?: number[];
}
export type TrafficUsage =
  | "IgnoreTrafficData"
  | "UseTrafficData"
  | (string & {});
export interface IsolineTrafficOptions {
  FlowEventThresholdOverride?: number;
  Usage?: TrafficUsage;
}
export type IsolineTravelMode =
  | "Car"
  | "Pedestrian"
  | "Scooter"
  | "Truck"
  | (string & {});
export type IsolineEngineType =
  | "Electric"
  | "InternalCombustion"
  | "PluginHybrid"
  | (string & {});
export interface IsolineVehicleLicensePlate {
  LastCharacter?: string;
}
export type SpeedKilometersPerHour = number;
export type SensitiveInteger = number;
export interface IsolineCarOptions {
  EngineType?: IsolineEngineType;
  LicensePlate?: IsolineVehicleLicensePlate;
  MaxSpeed?: number;
  Occupancy?: number;
}
export interface IsolineScooterOptions {
  EngineType?: IsolineEngineType;
  LicensePlate?: IsolineVehicleLicensePlate;
  MaxSpeed?: number;
  Occupancy?: number;
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
  AxleCount?: number;
  TrailerCount?: number;
}
export type IsolineTruckType =
  | "LightTruck"
  | "StraightTruck"
  | "Tractor"
  | (string & {});
export type TunnelRestrictionCode = string | redacted.Redacted<string>;
export interface WeightPerAxleGroup {
  Single?: number;
  Tandem?: number;
  Triple?: number;
  Quad?: number;
  Quint?: number;
}
export interface IsolineTruckOptions {
  AxleCount?: number;
  EngineType?: IsolineEngineType;
  GrossWeight?: number;
  HazardousCargos?: IsolineHazardousCargoType[];
  Height?: number;
  HeightAboveFirstAxle?: number;
  KpraLength?: number;
  Length?: number;
  LicensePlate?: IsolineVehicleLicensePlate;
  MaxSpeed?: number;
  Occupancy?: number;
  PayloadCapacity?: number;
  TireCount?: number;
  Trailer?: IsolineTrailerOptions;
  TruckType?: IsolineTruckType;
  TunnelRestrictionCode?: string | redacted.Redacted<string>;
  WeightPerAxle?: number;
  WeightPerAxleGroup?: WeightPerAxleGroup;
  Width?: number;
}
export interface IsolineTravelModeOptions {
  Car?: IsolineCarOptions;
  Scooter?: IsolineScooterOptions;
  Truck?: IsolineTruckOptions;
}
export interface CalculateIsolinesRequest {
  Allow?: IsolineAllowOptions;
  ArrivalTime?: string | redacted.Redacted<string>;
  Avoid?: IsolineAvoidanceOptions;
  DepartNow?: boolean;
  DepartureTime?: string | redacted.Redacted<string>;
  Destination?: number[];
  DestinationOptions?: IsolineDestinationOptions;
  IsolineGeometryFormat?: GeometryFormat;
  IsolineGranularity?: IsolineGranularityOptions;
  Key?: string | redacted.Redacted<string>;
  OptimizeIsolineFor?: IsolineOptimizationObjective;
  OptimizeRoutingFor?: RoutingObjective;
  Origin?: number[];
  OriginOptions?: IsolineOriginOptions;
  Thresholds: IsolineThresholds;
  Traffic?: IsolineTrafficOptions;
  TravelMode?: IsolineTravelMode;
  TravelModeOptions?: IsolineTravelModeOptions;
}
export interface IsolineConnectionGeometry {
  LineString?: number[][];
  Polyline?: string | redacted.Redacted<string>;
}
export interface IsolineConnection {
  FromPolygonIndex: number;
  Geometry: IsolineConnectionGeometry;
  ToPolygonIndex: number;
}
export type IsolineConnectionList = IsolineConnection[];
export interface IsolineShapeGeometry {
  Polygon?: number[][][];
  PolylinePolygon?: (string | redacted.Redacted<string>)[];
}
export type IsolineShapeGeometryList = IsolineShapeGeometry[];
export interface Isoline {
  Connections: IsolineConnection[];
  DistanceThreshold?: number;
  Geometries: IsolineShapeGeometry[];
  TimeThreshold?: number;
}
export type IsolineList = Isoline[];
export interface CalculateIsolinesResponse {
  ArrivalTime?: string | redacted.Redacted<string>;
  DepartureTime?: string | redacted.Redacted<string>;
  IsolineGeometryFormat: GeometryFormat;
  Isolines: Isoline[];
  PricingBucket: string;
  SnappedDestination?: number[];
  SnappedOrigin?: number[];
}
export interface RouteMatrixAllowOptions {
  Hot?: boolean;
  Hov?: boolean;
}
export interface RouteMatrixAvoidanceAreaGeometry {
  BoundingBox?: number[];
  Polygon?: number[][][];
  PolylinePolygon?: (string | redacted.Redacted<string>)[];
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
  Category?: RouteMatrixZoneCategory;
}
export type RouteMatrixAvoidanceZoneCategoryList =
  RouteMatrixAvoidanceZoneCategory[];
export interface RouteMatrixAvoidanceOptions {
  Areas?: RouteMatrixAvoidanceArea[];
  CarShuttleTrains?: boolean;
  ControlledAccessHighways?: boolean;
  DirtRoads?: boolean;
  Ferries?: boolean;
  TollRoads?: boolean;
  TollTransponders?: boolean;
  TruckRoadTypes?: (string | redacted.Redacted<string>)[];
  Tunnels?: boolean;
  UTurns?: boolean;
  ZoneCategories?: RouteMatrixAvoidanceZoneCategory[];
}
export interface RouteMatrixMatchingOptions {
  NameHint?: string | redacted.Redacted<string>;
  OnRoadThreshold?: number;
  Radius?: number;
  Strategy?: MatchingStrategy;
}
export interface RouteMatrixSideOfStreetOptions {
  Position: number[];
  UseWith?: SideOfStreetMatchingStrategy;
}
export interface RouteMatrixDestinationOptions {
  AvoidActionsForDistance?: number;
  Heading?: number;
  Matching?: RouteMatrixMatchingOptions;
  SideOfStreet?: RouteMatrixSideOfStreetOptions;
}
export interface RouteMatrixDestination {
  Options?: RouteMatrixDestinationOptions;
  Position: number[];
}
export type RouteMatrixDestinationList = RouteMatrixDestination[];
export type CountryCode = string | redacted.Redacted<string>;
export type CountryCodeList = (string | redacted.Redacted<string>)[];
export interface RouteMatrixExclusionOptions {
  Countries: (string | redacted.Redacted<string>)[];
}
export interface RouteMatrixOriginOptions {
  AvoidActionsForDistance?: number;
  Heading?: number;
  Matching?: RouteMatrixMatchingOptions;
  SideOfStreet?: RouteMatrixSideOfStreetOptions;
}
export interface RouteMatrixOrigin {
  Options?: RouteMatrixOriginOptions;
  Position: number[];
}
export type RouteMatrixOriginList = RouteMatrixOrigin[];
export interface RouteMatrixAutoCircle {
  Margin?: number;
  MaxRadius?: number;
}
export type SensitiveDouble = number;
export interface Circle {
  Center: number[];
  Radius: number;
}
export interface RouteMatrixBoundaryGeometry {
  AutoCircle?: RouteMatrixAutoCircle;
  Circle?: Circle;
  BoundingBox?: number[];
  Polygon?: number[][][];
}
export interface RouteMatrixBoundary {
  Geometry?: RouteMatrixBoundaryGeometry;
  Unbounded?: boolean;
}
export interface RouteMatrixTrafficOptions {
  FlowEventThresholdOverride?: number;
  Usage?: TrafficUsage;
}
export type RouteMatrixTravelMode =
  | "Car"
  | "Pedestrian"
  | "Scooter"
  | "Truck"
  | (string & {});
export interface RouteMatrixVehicleLicensePlate {
  LastCharacter?: string;
}
export interface RouteMatrixCarOptions {
  LicensePlate?: RouteMatrixVehicleLicensePlate;
  MaxSpeed?: number;
  Occupancy?: number;
}
export interface RouteMatrixScooterOptions {
  LicensePlate?: RouteMatrixVehicleLicensePlate;
  MaxSpeed?: number;
  Occupancy?: number;
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
  TrailerCount?: number;
}
export type RouteMatrixTruckType =
  | "LightTruck"
  | "StraightTruck"
  | "Tractor"
  | (string & {});
export interface RouteMatrixTruckOptions {
  AxleCount?: number;
  GrossWeight?: number;
  HazardousCargos?: RouteMatrixHazardousCargoType[];
  Height?: number;
  KpraLength?: number;
  Length?: number;
  LicensePlate?: RouteMatrixVehicleLicensePlate;
  MaxSpeed?: number;
  Occupancy?: number;
  PayloadCapacity?: number;
  Trailer?: RouteMatrixTrailerOptions;
  TruckType?: RouteMatrixTruckType;
  TunnelRestrictionCode?: string | redacted.Redacted<string>;
  WeightPerAxle?: number;
  WeightPerAxleGroup?: WeightPerAxleGroup;
  Width?: number;
}
export interface RouteMatrixTravelModeOptions {
  Car?: RouteMatrixCarOptions;
  Scooter?: RouteMatrixScooterOptions;
  Truck?: RouteMatrixTruckOptions;
}
export interface CalculateRouteMatrixRequest {
  Allow?: RouteMatrixAllowOptions;
  Avoid?: RouteMatrixAvoidanceOptions;
  DepartNow?: boolean;
  DepartureTime?: string | redacted.Redacted<string>;
  Destinations: RouteMatrixDestination[];
  Exclude?: RouteMatrixExclusionOptions;
  Key?: string | redacted.Redacted<string>;
  OptimizeRoutingFor?: RoutingObjective;
  Origins: RouteMatrixOrigin[];
  RoutingBoundary?: RouteMatrixBoundary;
  Traffic?: RouteMatrixTrafficOptions;
  TravelMode?: RouteMatrixTravelMode;
  TravelModeOptions?: RouteMatrixTravelModeOptions;
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
  Error?: RouteMatrixErrorCode;
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
  Hot?: boolean;
  Hov?: boolean;
}
export interface RouteAvoidanceAreaGeometry {
  Corridor?: Corridor;
  BoundingBox?: number[];
  Polygon?: number[][][];
  PolylineCorridor?: PolylineCorridor;
  PolylinePolygon?: (string | redacted.Redacted<string>)[];
}
export type RouteAvoidanceAreaGeometryList = RouteAvoidanceAreaGeometry[];
export interface RouteAvoidanceArea {
  Except?: RouteAvoidanceAreaGeometry[];
  Geometry: RouteAvoidanceAreaGeometry;
}
export type RouteAvoidanceAreaList = RouteAvoidanceArea[];
export type RouteZoneCategory =
  | "CongestionPricing"
  | "Environmental"
  | "Vignette"
  | (string & {});
export interface RouteAvoidanceZoneCategory {
  Category: RouteZoneCategory;
}
export type RouteAvoidanceZoneCategoryList = RouteAvoidanceZoneCategory[];
export interface RouteAvoidanceOptions {
  Areas?: RouteAvoidanceArea[];
  CarShuttleTrains?: boolean;
  ControlledAccessHighways?: boolean;
  DirtRoads?: boolean;
  Ferries?: boolean;
  SeasonalClosure?: boolean;
  TollRoads?: boolean;
  TollTransponders?: boolean;
  TruckRoadTypes?: (string | redacted.Redacted<string>)[];
  Tunnels?: boolean;
  UTurns?: boolean;
  ZoneCategories?: RouteAvoidanceZoneCategory[];
}
export interface RouteMatchingOptions {
  NameHint?: string | redacted.Redacted<string>;
  OnRoadThreshold?: number;
  Radius?: number;
  Strategy?: MatchingStrategy;
}
export interface RouteSideOfStreetOptions {
  Position: number[];
  UseWith?: SideOfStreetMatchingStrategy;
}
export interface RouteDestinationOptions {
  AvoidActionsForDistance?: number;
  AvoidUTurns?: boolean;
  Heading?: number;
  Matching?: RouteMatchingOptions;
  SideOfStreet?: RouteSideOfStreetOptions;
  StopDuration?: number;
}
export interface RouteDriverScheduleInterval {
  DriveDuration: number;
  RestDuration: number;
}
export type RouteDriverScheduleIntervalList = RouteDriverScheduleInterval[];
export interface RouteDriverOptions {
  Schedule?: RouteDriverScheduleInterval[];
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
  AvoidActionsForDistance?: number;
  AvoidUTurns?: boolean;
  Heading?: number;
  Matching?: RouteMatchingOptions;
  SideOfStreet?: RouteSideOfStreetOptions;
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
  Co2EmissionClass?: string | redacted.Redacted<string>;
  Type: string | redacted.Redacted<string>;
}
export type RouteTollVehicleCategory = "Minibus" | (string & {});
export interface RouteTollOptions {
  AllTransponders?: boolean;
  AllVignettes?: boolean;
  Currency?: string;
  EmissionType?: RouteEmissionType;
  VehicleCategory?: RouteTollVehicleCategory;
}
export interface RouteTrafficOptions {
  FlowEventThresholdOverride?: number;
  Usage?: TrafficUsage;
}
export type RouteTravelMode =
  | "Car"
  | "Pedestrian"
  | "Scooter"
  | "Truck"
  | "Intermodal"
  | "Transit"
  | (string & {});
export type RouteEngineType =
  | "Electric"
  | "InternalCombustion"
  | "PluginHybrid"
  | (string & {});
export interface RouteVehicleLicensePlate {
  LastCharacter?: string | redacted.Redacted<string>;
}
export interface RouteCarOptions {
  EngineType?: RouteEngineType;
  LicensePlate?: RouteVehicleLicensePlate;
  MaxSpeed?: number;
  Occupancy?: number;
}
export interface RoutePedestrianOptions {
  Speed?: number;
}
export interface RouteScooterOptions {
  EngineType?: RouteEngineType;
  LicensePlate?: RouteVehicleLicensePlate;
  MaxSpeed?: number;
  Occupancy?: number;
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
  AxleCount?: number;
  TrailerCount?: number;
}
export type RouteTruckType =
  | "LightTruck"
  | "StraightTruck"
  | "Tractor"
  | (string & {});
export interface RouteTruckOptions {
  AxleCount?: number;
  EngineType?: RouteEngineType;
  GrossWeight?: number;
  HazardousCargos?: RouteHazardousCargoType[];
  Height?: number;
  HeightAboveFirstAxle?: number;
  KpraLength?: number;
  Length?: number;
  LicensePlate?: RouteVehicleLicensePlate;
  MaxSpeed?: number;
  Occupancy?: number;
  PayloadCapacity?: number;
  TireCount?: number;
  Trailer?: RouteTrailerOptions;
  TruckType?: RouteTruckType;
  TunnelRestrictionCode?: string | redacted.Redacted<string>;
  WeightPerAxle?: number;
  WeightPerAxleGroup?: WeightPerAxleGroup;
  Width?: number;
}
export type RouteAccessibilityAttribute = "Wheelchair" | (string & {});
export type RouteAccessibilityAttributeList = RouteAccessibilityAttribute[];
export interface RouteIntermodalPedestrianOptions {
  MaxDistance?: number;
  Speed?: number;
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
  AllowedModes?: RouteRentalMode[];
  EnabledFor?: RouteIntermodalEnabledLegs[];
  ExcludedModes?: RouteRentalMode[];
}
export type RouteTaxiMode = "All" | "Car" | (string & {});
export type RouteTaxiModeList = RouteTaxiMode[];
export interface RouteIntermodalTaxiOptions {
  AllowedModes?: RouteTaxiMode[];
  EnabledFor?: RouteIntermodalEnabledLegs[];
  ExcludedModes?: RouteTaxiMode[];
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
  AllowedModes?: RouteTransitMode[];
  EnabledFor?: RouteIntermodalEnabledLegs[];
  ExcludedModes?: RouteTransitMode[];
}
export type RouteVehicleMode = "All" | "Car" | (string & {});
export type RouteVehicleModeList = RouteVehicleMode[];
export interface RouteIntermodalVehicleOptions {
  AllowedModes?: RouteVehicleMode[];
  EnabledFor?: RouteIntermodalEnabledLegs[];
  ExcludedModes?: RouteVehicleMode[];
}
export interface RouteIntermodalOptions {
  AccessibilityAttributes?: RouteAccessibilityAttribute[];
  MaxTransfers?: number;
  Pedestrian?: RouteIntermodalPedestrianOptions;
  Rental?: RouteIntermodalRentalOptions;
  Taxi?: RouteIntermodalTaxiOptions;
  Transit?: RouteIntermodalTransitOptions;
  Vehicle?: RouteIntermodalVehicleOptions;
}
export interface RouteTransitPedestrianOptions {
  MaxDistance?: number;
  Speed?: number;
}
export interface RouteTransitOptions {
  AccessibilityAttributes?: RouteAccessibilityAttribute[];
  AllowedModes?: RouteTransitMode[];
  ExcludedModes?: RouteTransitMode[];
  MaxTransfers?: number;
  Pedestrian?: RouteTransitPedestrianOptions;
}
export interface RouteTravelModeOptions {
  Car?: RouteCarOptions;
  Pedestrian?: RoutePedestrianOptions;
  Scooter?: RouteScooterOptions;
  Truck?: RouteTruckOptions;
  Intermodal?: RouteIntermodalOptions;
  Transit?: RouteTransitOptions;
}
export type RouteTravelStepType = "Default" | "TurnByTurn" | (string & {});
export interface RouteWaypoint {
  AvoidActionsForDistance?: number;
  AvoidUTurns?: boolean;
  Heading?: number;
  Matching?: RouteMatchingOptions;
  PassThrough?: boolean;
  Position: number[];
  SideOfStreet?: RouteSideOfStreetOptions;
  StopDuration?: number;
}
export type RouteWaypointList = RouteWaypoint[];
export interface CalculateRoutesRequest {
  Allow?: RouteAllowOptions;
  ArrivalTime?: string | redacted.Redacted<string>;
  Avoid?: RouteAvoidanceOptions;
  DepartNow?: boolean;
  DepartureTime?: string | redacted.Redacted<string>;
  Destination: number[];
  DestinationOptions?: RouteDestinationOptions;
  Driver?: RouteDriverOptions;
  Exclude?: RouteExclusionOptions;
  InstructionsMeasurementSystem?: MeasurementSystem;
  Key?: string | redacted.Redacted<string>;
  Languages?: string[];
  LegAdditionalFeatures?: RouteLegAdditionalFeature[];
  LegGeometryFormat?: GeometryFormat;
  MaxAlternatives?: number;
  OptimizeRoutingFor?: RoutingObjective;
  Origin: number[];
  OriginOptions?: RouteOriginOptions;
  SpanAdditionalFeatures?: RouteSpanAdditionalFeature[];
  Tolls?: RouteTollOptions;
  Traffic?: RouteTrafficOptions;
  TravelMode?: RouteTravelMode;
  TravelModeOptions?: RouteTravelModeOptions;
  TravelStepType?: RouteTravelStepType;
  Waypoints?: RouteWaypoint[];
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
  Impact?: RouteNoticeImpact;
}
export type RouteResponseNoticeList = RouteResponseNotice[];
export type RouteFerryAfterTravelStepType = "Deboard" | (string & {});
export interface RouteFerryAfterTravelStep {
  Duration: number;
  Instruction?: string | redacted.Redacted<string>;
  Type: RouteFerryAfterTravelStepType;
}
export type RouteFerryAfterTravelStepList = RouteFerryAfterTravelStep[];
export type Position23 = number[];
export interface RouteFerryPlace {
  Name?: string | redacted.Redacted<string>;
  OriginalPosition?: number[];
  Position: number[];
  WaypointIndex?: number;
}
export interface RouteFerryArrival {
  Place: RouteFerryPlace;
  Time?: string | redacted.Redacted<string>;
}
export type RouteFerryBeforeTravelStepType = "Board" | (string & {});
export interface RouteFerryBeforeTravelStep {
  Duration: number;
  Instruction?: string | redacted.Redacted<string>;
  Type: RouteFerryBeforeTravelStepType;
}
export type RouteFerryBeforeTravelStepList = RouteFerryBeforeTravelStep[];
export interface RouteFerryDeparture {
  Place: RouteFerryPlace;
  Time?: string | redacted.Redacted<string>;
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
  Impact?: RouteNoticeImpact;
}
export type RouteFerryNoticeList = RouteFerryNotice[];
export interface RoutePassThroughPlace {
  OriginalPosition?: number[];
  Position: number[];
  WaypointIndex?: number;
}
export interface RoutePassThroughWaypoint {
  GeometryOffset?: number;
  Place: RoutePassThroughPlace;
}
export type RoutePassThroughWaypointList = RoutePassThroughWaypoint[];
export type CountryCode3 = string | redacted.Redacted<string>;
export interface LocalizedString {
  Language?: string;
  Value: string | redacted.Redacted<string>;
}
export type LocalizedStringList = LocalizedString[];
export interface RouteFerrySpan {
  Country?: string | redacted.Redacted<string>;
  Distance?: number;
  Duration?: number;
  GeometryOffset?: number;
  Names?: LocalizedString[];
  Region?: string | redacted.Redacted<string>;
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
  Overview?: RouteFerryOverviewSummary;
  TravelOnly?: RouteFerryTravelOnlySummary;
}
export type RouteFerryTravelStepType =
  | "Depart"
  | "Continue"
  | "Arrive"
  | (string & {});
export interface RouteFerryTravelStep {
  Distance?: number;
  Duration: number;
  GeometryOffset?: number;
  Instruction?: string | redacted.Redacted<string>;
  Type: RouteFerryTravelStepType;
}
export type RouteFerryTravelStepList = RouteFerryTravelStep[];
export interface RouteFerryLegDetails {
  AfterTravelSteps?: RouteFerryAfterTravelStep[];
  Arrival: RouteFerryArrival;
  BeforeTravelSteps?: RouteFerryBeforeTravelStep[];
  Departure: RouteFerryDeparture;
  Notices?: RouteFerryNotice[];
  PassThroughWaypoints?: RoutePassThroughWaypoint[];
  RouteName?: string | redacted.Redacted<string>;
  Spans?: RouteFerrySpan[];
  Summary?: RouteFerrySummary;
  TravelSteps?: RouteFerryTravelStep[];
}
export interface RouteLegGeometry {
  LineString?: number[][];
  Polyline?: string | redacted.Redacted<string>;
}
export type RoutePedestrianAfterTravelStepType = "Wait" | (string & {});
export interface RoutePedestrianAfterTravelStep {
  Duration: number;
  Instruction?: string | redacted.Redacted<string>;
  Type: RoutePedestrianAfterTravelStepType;
}
export type RoutePedestrianAfterTravelStepList =
  RoutePedestrianAfterTravelStep[];
export type RouteAccessibilityAvailability =
  | "Available"
  | "Limited"
  | "Unavailable"
  | "Unknown"
  | (string & {});
export interface RouteAccessibilityAvailabilityDetails {
  Wheelchair?: RouteAccessibilityAvailability;
}
export interface RouteAccessPointDetails {
  Accessibility?: RouteAccessibilityAvailabilityDetails;
}
export type RouteSideOfStreet = "Left" | "Right" | (string & {});
export interface RouteStationDetails {
  Accessibility?: RouteAccessibilityAvailabilityDetails;
  PlatformName?: string | redacted.Redacted<string>;
  ShortName?: string | redacted.Redacted<string>;
}
export type RoutePedestrianPlaceType =
  | "AccessPoint"
  | "DockingStation"
  | "ParkingLot"
  | "Station"
  | (string & {});
export interface RoutePedestrianPlace {
  AccessPointDetails?: RouteAccessPointDetails;
  Name?: string | redacted.Redacted<string>;
  OriginalPosition?: number[];
  Position: number[];
  SideOfStreet?: RouteSideOfStreet;
  StationDetails?: RouteStationDetails;
  Type?: RoutePedestrianPlaceType;
  WaypointIndex?: number;
}
export interface RoutePedestrianArrival {
  Place: RoutePedestrianPlace;
  Time?: string | redacted.Redacted<string>;
}
export interface RoutePedestrianDeparture {
  Place: RoutePedestrianPlace;
  Time?: string | redacted.Redacted<string>;
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
  Impact?: RouteNoticeImpact;
}
export type RoutePedestrianNoticeList = RoutePedestrianNotice[];
export interface RouteSpanDynamicSpeedDetails {
  BestCaseSpeed?: number;
  TurnDuration?: number;
  TypicalSpeed?: number;
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
export type RouteSpanPedestrianAccessAttributeList =
  RouteSpanPedestrianAccessAttribute[];
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
export type RouteDirection =
  | "East"
  | "North"
  | "South"
  | "West"
  | (string & {});
export interface RouteNumber {
  Direction?: RouteDirection;
  Language?: string;
  Value: string | redacted.Redacted<string>;
}
export type RouteNumberList = RouteNumber[];
export interface RouteSpanSpeedLimitDetails {
  MaxSpeed?: number;
  Unlimited?: boolean;
}
export interface RoutePedestrianSpan {
  BestCaseDuration?: number;
  Country?: string | redacted.Redacted<string>;
  Distance?: number;
  Duration?: number;
  DynamicSpeed?: RouteSpanDynamicSpeedDetails;
  FunctionalClassification?: number;
  GeometryOffset?: number;
  Incidents?: number[];
  Names?: LocalizedString[];
  PedestrianAccess?: RouteSpanPedestrianAccessAttribute[];
  Region?: string | redacted.Redacted<string>;
  RoadAttributes?: RouteSpanRoadAttribute[];
  RouteNumbers?: RouteNumber[];
  SpeedLimit?: RouteSpanSpeedLimitDetails;
  TypicalDuration?: number;
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
  Overview?: RoutePedestrianOverviewSummary;
  TravelOnly?: RoutePedestrianTravelOnlySummary;
}
export interface RouteContinueStepDetails {
  Intersection: LocalizedString[];
}
export type RouteRoadType = "Highway" | "Rural" | "Urban" | (string & {});
export interface RouteRoad {
  RoadName: LocalizedString[];
  RouteNumber: RouteNumber[];
  Towards: LocalizedString[];
  Type?: RouteRoadType;
}
export type RouteSteeringDirection =
  | "Left"
  | "Right"
  | "Straight"
  | (string & {});
export type TurnAngle = number;
export type RouteTurnIntensity = "Sharp" | "Slight" | "Typical" | (string & {});
export interface RouteKeepStepDetails {
  Intersection: LocalizedString[];
  SteeringDirection?: RouteSteeringDirection;
  TurnAngle?: number;
  TurnIntensity?: RouteTurnIntensity;
}
export interface RouteRoundaboutEnterStepDetails {
  Intersection: LocalizedString[];
  SteeringDirection?: RouteSteeringDirection;
  TurnAngle?: number;
  TurnIntensity?: RouteTurnIntensity;
}
export type RoundaboutAngle = number;
export interface RouteRoundaboutExitStepDetails {
  Intersection: LocalizedString[];
  RelativeExit?: number;
  RoundaboutAngle?: number;
  SteeringDirection?: RouteSteeringDirection;
}
export interface RouteRoundaboutPassStepDetails {
  Intersection: LocalizedString[];
  SteeringDirection?: RouteSteeringDirection;
  TurnAngle?: number;
  TurnIntensity?: RouteTurnIntensity;
}
export interface RouteSignpostLabel {
  RouteNumber?: RouteNumber;
  Text?: LocalizedString;
}
export type RouteSignpostLabelList = RouteSignpostLabel[];
export interface RouteSignpost {
  Labels: RouteSignpostLabel[];
}
export interface RouteTurnStepDetails {
  Intersection: LocalizedString[];
  SteeringDirection?: RouteSteeringDirection;
  TurnAngle?: number;
  TurnIntensity?: RouteTurnIntensity;
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
  ContinueStepDetails?: RouteContinueStepDetails;
  CurrentRoad?: RouteRoad;
  Distance?: number;
  Duration: number;
  ExitNumber?: LocalizedString[];
  GeometryOffset?: number;
  Instruction?: string | redacted.Redacted<string>;
  KeepStepDetails?: RouteKeepStepDetails;
  NextRoad?: RouteRoad;
  RoundaboutEnterStepDetails?: RouteRoundaboutEnterStepDetails;
  RoundaboutExitStepDetails?: RouteRoundaboutExitStepDetails;
  RoundaboutPassStepDetails?: RouteRoundaboutPassStepDetails;
  Signpost?: RouteSignpost;
  TurnStepDetails?: RouteTurnStepDetails;
  Type: RoutePedestrianTravelStepType;
}
export type RoutePedestrianTravelStepList = RoutePedestrianTravelStep[];
export interface RoutePedestrianLegDetails {
  AfterTravelSteps?: RoutePedestrianAfterTravelStep[];
  Arrival: RoutePedestrianArrival;
  Departure: RoutePedestrianDeparture;
  Notices?: RoutePedestrianNotice[];
  PassThroughWaypoints?: RoutePassThroughWaypoint[];
  Spans?: RoutePedestrianSpan[];
  Summary?: RoutePedestrianSummary;
  TravelSteps?: RoutePedestrianTravelStep[];
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
  ArrivalCharge?: number;
  ConsumablePower?: number;
  DesiredCharge?: number;
}
export type RouteVehicleAfterTravelStepType = "Park" | (string & {});
export interface RouteVehicleAfterTravelStep {
  ChargeStepDetails?: RouteChargeStepDetails;
  Duration: number;
  Instruction?: string | redacted.Redacted<string>;
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
  Name?: string | redacted.Redacted<string>;
  OriginalPosition?: number[];
  Position: number[];
  SideOfStreet?: RouteSideOfStreet;
  WaypointIndex?: number;
  AccessPointDetails?: RouteAccessPointDetails;
  StationDetails?: RouteStationDetails;
  Type?: RouteVehiclePlaceType;
}
export interface RouteVehicleArrival {
  Place: RouteVehiclePlace;
  Time?: string | redacted.Redacted<string>;
}
export interface RouteVehicleDeparture {
  Place: RouteVehiclePlace;
  Time?: string | redacted.Redacted<string>;
}
export type RouteVehicleIncidentSeverity =
  | "Critical"
  | "High"
  | "Medium"
  | "Low"
  | (string & {});
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
  Description?: string | redacted.Redacted<string>;
  EndTime?: string | redacted.Redacted<string>;
  Severity?: RouteVehicleIncidentSeverity;
  StartTime?: string | redacted.Redacted<string>;
  Type?: RouteVehicleIncidentType;
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
  Min?: number;
  Max?: number;
}
export type RouteWeightConstraintType =
  | "Current"
  | "Gross"
  | "Unknown"
  | (string & {});
export interface RouteWeightConstraint {
  Type: RouteWeightConstraintType;
  Value: number;
}
export interface RouteViolatedConstraints {
  AllHazardsRestricted?: boolean;
  AxleCount?: RouteNoticeDetailRange;
  HazardousCargos: RouteHazardousCargoType[];
  MaxHeight?: number;
  MaxKpraLength?: number;
  MaxLength?: number;
  MaxPayloadCapacity?: number;
  MaxWeight?: RouteWeightConstraint;
  MaxWeightPerAxle?: number;
  MaxWeightPerAxleGroup?: WeightPerAxleGroup;
  MaxWidth?: number;
  Occupancy?: RouteNoticeDetailRange;
  RestrictedTimes?: string;
  TimeDependent?: boolean;
  TrailerCount?: RouteNoticeDetailRange;
  TravelMode?: boolean;
  TruckRoadType?: string;
  TruckType?: RouteTruckType;
  TunnelRestrictionCode?: string | redacted.Redacted<string>;
}
export interface RouteVehicleNoticeDetail {
  Title?: string | redacted.Redacted<string>;
  ViolatedConstraints?: RouteViolatedConstraints;
}
export type RouteVehicleNoticeDetailList = RouteVehicleNoticeDetail[];
export interface RouteVehicleNotice {
  Code: RouteVehicleNoticeCode;
  Details: RouteVehicleNoticeDetail[];
  Impact?: RouteNoticeImpact;
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
export type RouteSpanRailwayCrossingAttribute =
  | "Protected"
  | "Unprotected"
  | (string & {});
export type RouteSpanScooterAccessAttribute =
  | "Allowed"
  | "NoThroughTraffic"
  | "TollRoad"
  | (string & {});
export type RouteSpanScooterAccessAttributeList =
  RouteSpanScooterAccessAttribute[];
export type RouteSpanTruckAccessAttribute =
  | "Allowed"
  | "NoThroughTraffic"
  | "TollRoad"
  | (string & {});
export type RouteSpanTruckAccessAttributeList = RouteSpanTruckAccessAttribute[];
export interface RouteVehicleSpan {
  BestCaseDuration?: number;
  CarAccess?: RouteSpanCarAccessAttribute[];
  Country?: string | redacted.Redacted<string>;
  Distance?: number;
  Duration?: number;
  DynamicSpeed?: RouteSpanDynamicSpeedDetails;
  FunctionalClassification?: number;
  Gate?: RouteSpanGateAttribute;
  GeometryOffset?: number;
  Incidents?: number[];
  Names?: LocalizedString[];
  Notices?: number[];
  RailwayCrossing?: RouteSpanRailwayCrossingAttribute;
  Region?: string | redacted.Redacted<string>;
  RoadAttributes?: RouteSpanRoadAttribute[];
  RouteNumbers?: RouteNumber[];
  ScooterAccess?: RouteSpanScooterAccessAttribute[];
  SpeedLimit?: RouteSpanSpeedLimitDetails;
  TollSystems?: number[];
  TruckAccess?: RouteSpanTruckAccessAttribute[];
  TruckRoadTypes?: number[];
  TypicalDuration?: number;
  Zones?: number[];
}
export type RouteVehicleSpanList = RouteVehicleSpan[];
export interface RouteVehicleOverviewSummary {
  BestCaseDuration?: number;
  Distance: number;
  Duration: number;
  TypicalDuration?: number;
}
export interface RouteVehicleTravelOnlySummary {
  BestCaseDuration?: number;
  Duration: number;
  TypicalDuration?: number;
}
export interface RouteVehicleSummary {
  Overview?: RouteVehicleOverviewSummary;
  TravelOnly?: RouteVehicleTravelOnlySummary;
}
export interface RouteTollPaymentSite {
  Name?: string;
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
  PerDuration?: number;
  Range: boolean;
  RangeValue?: RouteTollPriceValueRange;
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
  PeriodCount?: number;
}
export interface RouteTollPass {
  IncludesReturnTrip?: boolean;
  SeniorPass?: boolean;
  TransferCount?: number;
  TripCount?: number;
  ValidityPeriod?: RouteTollPassValidityPeriod;
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
  SystemName?: string | redacted.Redacted<string>;
}
export type RouteTransponderList = RouteTransponder[];
export interface RouteTollRate {
  ApplicableTimes?: string | redacted.Redacted<string>;
  ConvertedPrice?: RouteTollPrice;
  Id: string | redacted.Redacted<string>;
  LocalPrice: RouteTollPrice;
  Name: string | redacted.Redacted<string>;
  Pass?: RouteTollPass;
  PaymentMethods: RouteTollPaymentMethod[];
  Transponders: RouteTransponder[];
}
export type RouteTollRateList = RouteTollRate[];
export interface RouteToll {
  Country?: string | redacted.Redacted<string>;
  PaymentSites: RouteTollPaymentSite[];
  Rates: RouteTollRate[];
  Systems: number[];
}
export type RouteTollList = RouteToll[];
export interface RouteTollSystem {
  Name?: string | redacted.Redacted<string>;
}
export type RouteTollSystemList = RouteTollSystem[];
export interface RouteContinueHighwayStepDetails {
  Intersection: LocalizedString[];
  SteeringDirection?: RouteSteeringDirection;
  TurnAngle?: number;
  TurnIntensity?: RouteTurnIntensity;
}
export interface RouteEnterHighwayStepDetails {
  Intersection: LocalizedString[];
  SteeringDirection?: RouteSteeringDirection;
  TurnAngle?: number;
  TurnIntensity?: RouteTurnIntensity;
}
export interface RouteExitStepDetails {
  Intersection: LocalizedString[];
  RelativeExit?: number;
  SteeringDirection?: RouteSteeringDirection;
  TurnAngle?: number;
  TurnIntensity?: RouteTurnIntensity;
}
export interface RouteRampStepDetails {
  Intersection: LocalizedString[];
  SteeringDirection?: RouteSteeringDirection;
  TurnAngle?: number;
  TurnIntensity?: RouteTurnIntensity;
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
  SteeringDirection?: RouteSteeringDirection;
  TurnAngle?: number;
  TurnIntensity?: RouteTurnIntensity;
}
export interface RouteVehicleTravelStep {
  ContinueHighwayStepDetails?: RouteContinueHighwayStepDetails;
  ContinueStepDetails?: RouteContinueStepDetails;
  CurrentRoad?: RouteRoad;
  Distance?: number;
  Duration: number;
  EnterHighwayStepDetails?: RouteEnterHighwayStepDetails;
  ExitNumber?: LocalizedString[];
  ExitStepDetails?: RouteExitStepDetails;
  GeometryOffset?: number;
  Instruction?: string | redacted.Redacted<string>;
  KeepStepDetails?: RouteKeepStepDetails;
  NextRoad?: RouteRoad;
  RampStepDetails?: RouteRampStepDetails;
  RoundaboutEnterStepDetails?: RouteRoundaboutEnterStepDetails;
  RoundaboutExitStepDetails?: RouteRoundaboutExitStepDetails;
  RoundaboutPassStepDetails?: RouteRoundaboutPassStepDetails;
  Signpost?: RouteSignpost;
  TurnStepDetails?: RouteTurnStepDetails;
  Type: RouteVehicleTravelStepType;
  UTurnStepDetails?: RouteUTurnStepDetails;
}
export type RouteVehicleTravelStepList = RouteVehicleTravelStep[];
export interface RouteZone {
  Category?: RouteZoneCategory;
  Name?: string | redacted.Redacted<string>;
}
export type RouteZoneList = RouteZone[];
export interface RouteVehicleLegDetails {
  AfterTravelSteps?: RouteVehicleAfterTravelStep[];
  Arrival: RouteVehicleArrival;
  Departure: RouteVehicleDeparture;
  Incidents?: RouteVehicleIncident[];
  Notices?: RouteVehicleNotice[];
  PassThroughWaypoints?: RoutePassThroughWaypoint[];
  Spans?: RouteVehicleSpan[];
  Summary?: RouteVehicleSummary;
  Tolls?: RouteToll[];
  TollSystems?: RouteTollSystem[];
  TravelSteps?: RouteVehicleTravelStep[];
  TruckRoadTypes?: (string | redacted.Redacted<string>)[];
  Zones?: RouteZone[];
}
export type RouteRentalAfterTravelStepType = "Park" | (string & {});
export interface RouteRentalAfterTravelStep {
  Duration: number;
  Instruction?: string | redacted.Redacted<string>;
  Type: RouteRentalAfterTravelStepType;
}
export type RouteRentalAfterTravelStepList = RouteRentalAfterTravelStep[];
export interface RouteRentalAgency {
  Name: string | redacted.Redacted<string>;
  Url?: string | redacted.Redacted<string>;
}
export type RouteRentalPlaceType =
  | "AccessPoint"
  | "DockingStation"
  | "ParkingLot"
  | "Station"
  | (string & {});
export interface RouteRentalPlace {
  AccessPointDetails?: RouteAccessPointDetails;
  Name?: string | redacted.Redacted<string>;
  OriginalPosition?: number[];
  Position: number[];
  StationDetails?: RouteStationDetails;
  Type?: RouteRentalPlaceType;
  WaypointIndex?: number;
}
export interface RouteRentalArrival {
  Place: RouteRentalPlace;
  Time?: string | redacted.Redacted<string>;
}
export type RouteAttributionType = "Disclaimer" | "Tariff" | (string & {});
export type RouteWebLinkDeviceType = "Android" | "Ios" | "Web" | (string & {});
export interface RouteWebLink {
  AnchorText?: string | redacted.Redacted<string>;
  Description: string | redacted.Redacted<string>;
  DeviceType?: RouteWebLinkDeviceType;
  Url?: string | redacted.Redacted<string>;
}
export interface RouteAttribution {
  AttributionType?: RouteAttributionType;
  WebLink: RouteWebLink;
}
export type RouteAttributionList = RouteAttribution[];
export type RouteRentalBeforeTravelStepType = "Setup" | (string & {});
export interface RouteRentalBeforeTravelStep {
  Duration: number;
  Instruction?: string | redacted.Redacted<string>;
  Type: RouteRentalBeforeTravelStepType;
}
export type RouteRentalBeforeTravelStepList = RouteRentalBeforeTravelStep[];
export type RouteWebLinkList = RouteWebLink[];
export interface RouteRentalDeparture {
  Place: RouteRentalPlace;
  Time?: string | redacted.Redacted<string>;
}
export interface RouteRentalOverviewSummary {
  Duration: number;
  Distance: number;
}
export interface RouteRentalTravelOnlySummary {
  Duration: number;
}
export interface RouteRentalSummary {
  Overview?: RouteRentalOverviewSummary;
  TravelOnly?: RouteRentalTravelOnlySummary;
}
export interface RouteRentalTransportModeDetails {
  AvailableSeats?: number;
  Category?: string | redacted.Redacted<string>;
  Color?: string | redacted.Redacted<string>;
  Engine?: RouteEngineType;
  LicensePlate?: string | redacted.Redacted<string>;
  Mode: RouteRentalMode;
  Model?: string | redacted.Redacted<string>;
  Name?: string | redacted.Redacted<string>;
  TextColor?: string | redacted.Redacted<string>;
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
  ContinueStepDetails?: RouteContinueStepDetails;
  Distance?: number;
  Duration: number;
  ExitStepDetails?: RouteExitStepDetails;
  GeometryOffset?: number;
  Instruction?: string | redacted.Redacted<string>;
  KeepStepDetails?: RouteKeepStepDetails;
  RampStepDetails?: RouteRampStepDetails;
  RoundaboutEnterStepDetails?: RouteRoundaboutEnterStepDetails;
  RoundaboutExitStepDetails?: RouteRoundaboutExitStepDetails;
  RoundaboutPassStepDetails?: RouteRoundaboutPassStepDetails;
  TurnStepDetails?: RouteTurnStepDetails;
  Type: RouteRentalTravelStepType;
  UTurnStepDetails?: RouteUTurnStepDetails;
}
export type RouteRentalTravelStepList = RouteRentalTravelStep[];
export interface RouteRentalLegDetails {
  AfterTravelSteps?: RouteRentalAfterTravelStep[];
  Agency: RouteRentalAgency;
  Arrival: RouteRentalArrival;
  Attributions?: RouteAttribution[];
  BeforeTravelSteps?: RouteRentalBeforeTravelStep[];
  BookingWebLinks?: RouteWebLink[];
  Departure: RouteRentalDeparture;
  Summary?: RouteRentalSummary;
  Transport: RouteRentalTransportModeDetails;
  TravelSteps?: RouteRentalTravelStep[];
}
export type RouteTaxiAfterTravelStepType = "Park" | (string & {});
export interface RouteTaxiAfterTravelStep {
  Duration: number;
  Instruction?: string | redacted.Redacted<string>;
  Type: RouteTaxiAfterTravelStepType;
}
export type RouteTaxiAfterTravelStepList = RouteTaxiAfterTravelStep[];
export interface RouteTaxiAgency {
  Name: string | redacted.Redacted<string>;
  Url?: string | redacted.Redacted<string>;
}
export type RouteTaxiPlaceType = "AccessPoint" | "Station" | (string & {});
export interface RouteTaxiPlace {
  AccessPointDetails?: RouteAccessPointDetails;
  Name?: string | redacted.Redacted<string>;
  OriginalPosition?: number[];
  Position: number[];
  StationDetails?: RouteStationDetails;
  Type?: RouteTaxiPlaceType;
  WaypointIndex?: number;
}
export interface RouteTaxiArrival {
  Place: RouteTaxiPlace;
  Time?: string | redacted.Redacted<string>;
}
export type RouteTaxiBeforeTravelStepType = "Wait" | (string & {});
export interface RouteTaxiBeforeTravelStep {
  Duration: number;
  Instruction?: string | redacted.Redacted<string>;
  Type: RouteTaxiBeforeTravelStepType;
}
export type RouteTaxiBeforeTravelStepList = RouteTaxiBeforeTravelStep[];
export interface RouteTaxiDeparture {
  Place: RouteTaxiPlace;
  Time?: string | redacted.Redacted<string>;
}
export type RouteTaxiNoticeCode =
  | "AccuratePolylineUnavailable"
  | "Other"
  | (string & {});
export interface RouteTaxiNotice {
  Code: RouteTaxiNoticeCode;
  Impact?: RouteNoticeImpact;
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
  Overview?: RouteTaxiOverviewSummary;
  TravelOnly?: RouteTaxiTravelOnlySummary;
}
export interface RouteTaxiTransportModeDetails {
  AvailableSeats?: number;
  Category?: string | redacted.Redacted<string>;
  Color?: string | redacted.Redacted<string>;
  Engine?: RouteEngineType;
  LicensePlate?: string | redacted.Redacted<string>;
  Mode: RouteTaxiMode;
  Model?: string | redacted.Redacted<string>;
  Name?: string | redacted.Redacted<string>;
  TextColor?: string | redacted.Redacted<string>;
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
  ContinueStepDetails?: RouteContinueStepDetails;
  Distance?: number;
  Duration: number;
  ExitStepDetails?: RouteExitStepDetails;
  GeometryOffset?: number;
  Instruction?: string | redacted.Redacted<string>;
  KeepStepDetails?: RouteKeepStepDetails;
  RampStepDetails?: RouteRampStepDetails;
  RoundaboutEnterStepDetails?: RouteRoundaboutEnterStepDetails;
  RoundaboutExitStepDetails?: RouteRoundaboutExitStepDetails;
  RoundaboutPassStepDetails?: RouteRoundaboutPassStepDetails;
  TurnStepDetails?: RouteTurnStepDetails;
  Type: RouteTaxiTravelStepType;
  UTurnStepDetails?: RouteUTurnStepDetails;
}
export type RouteTaxiTravelStepList = RouteTaxiTravelStep[];
export interface RouteTaxiLegDetails {
  AfterTravelSteps?: RouteTaxiAfterTravelStep[];
  Agency: RouteTaxiAgency;
  Arrival: RouteTaxiArrival;
  Attributions?: RouteAttribution[];
  BeforeTravelSteps?: RouteTaxiBeforeTravelStep[];
  BookingWebLinks?: RouteWebLink[];
  Departure: RouteTaxiDeparture;
  Notices?: RouteTaxiNotice[];
  Summary?: RouteTaxiSummary;
  Transport: RouteTaxiTransportModeDetails;
  TravelSteps?: RouteTaxiTravelStep[];
}
export type RouteTransitAfterTravelStepType = "Deboard" | (string & {});
export interface RouteTransitAfterTravelStep {
  Duration: number;
  Instruction?: string | redacted.Redacted<string>;
  Type: RouteTransitAfterTravelStepType;
}
export type RouteTransitAfterTravelStepList = RouteTransitAfterTravelStep[];
export interface RouteTransitAgency {
  Name: string | redacted.Redacted<string>;
  Url?: string | redacted.Redacted<string>;
}
export type RouteTransitPlaceType = "Station" | (string & {});
export interface RouteTransitPlace {
  Name?: string | redacted.Redacted<string>;
  OriginalPosition?: number[];
  Position: number[];
  StationDetails?: RouteStationDetails;
  Type?: RouteTransitPlaceType;
  WaypointIndex?: number;
}
export type RouteTransitTripStatus =
  | "Added"
  | "Cancelled"
  | "Replaced"
  | "Scheduled"
  | (string & {});
export interface RouteTransitArrival {
  Delay?: number;
  Place: RouteTransitPlace;
  Status?: RouteTransitTripStatus;
  Time?: string | redacted.Redacted<string>;
}
export type RouteTransitBeforeTravelStepType = "Board" | (string & {});
export interface RouteTransitBeforeTravelStep {
  Duration: number;
  Instruction?: string | redacted.Redacted<string>;
  Type: RouteTransitBeforeTravelStepType;
}
export type RouteTransitBeforeTravelStepList = RouteTransitBeforeTravelStep[];
export interface RouteTransitDeparture {
  Delay?: number;
  Place: RouteTransitPlace;
  Status?: RouteTransitTripStatus;
  Time?: string | redacted.Redacted<string>;
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
  Description?: string | redacted.Redacted<string>;
  Effect: RouteTransitIncidentEffect;
  EndTime?: string | redacted.Redacted<string>;
  StartTime?: string | redacted.Redacted<string>;
  Type: RouteTransitIncidentType;
  Url?: string | redacted.Redacted<string>;
}
export type RouteTransitIncidentList = RouteTransitIncident[];
export type RouteTransitIntermediateStopAttribute =
  | "NoEntry"
  | "NoExit"
  | (string & {});
export type RouteTransitIntermediateStopAttributeList =
  RouteTransitIntermediateStopAttribute[];
export type HexColor = string | redacted.Redacted<string>;
export interface RouteTransitTransportModeDetails {
  Accessibility?: RouteAccessibilityAvailabilityDetails;
  Color?: string | redacted.Redacted<string>;
  Headsign?: string | redacted.Redacted<string>;
  LongRouteName?: string | redacted.Redacted<string>;
  Mode: RouteTransitMode;
  RouteName?: string | redacted.Redacted<string>;
  ShortRouteName?: string | redacted.Redacted<string>;
  TextColor?: string | redacted.Redacted<string>;
}
export interface RouteTransitIntermediateStop {
  Attributes?: RouteTransitIntermediateStopAttribute[];
  Departure: RouteTransitDeparture;
  Duration: number;
  GeometryOffset?: number;
  Transport?: RouteTransitTransportModeDetails;
}
export type RouteTransitIntermediateStopList = RouteTransitIntermediateStop[];
export interface RouteTransitNextDeparture {
  Delay?: number;
  PlatformName?: string | redacted.Redacted<string>;
  Status?: RouteTransitTripStatus;
  Time: string | redacted.Redacted<string>;
  Transport?: RouteTransitTransportModeDetails;
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
  Impact?: RouteNoticeImpact;
}
export type RouteTransitNoticeList = RouteTransitNotice[];
export interface RouteTransitSpan {
  Country?: string | redacted.Redacted<string>;
  Distance?: number;
  Duration?: number;
  GeometryOffset?: number;
  Names?: LocalizedString[];
  Region?: string | redacted.Redacted<string>;
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
  Overview?: RouteTransitOverviewSummary;
  TravelOnly?: RouteTransitTravelOnlySummary;
}
export type RouteTransitTravelStepType = "Depart" | (string & {});
export interface RouteTransitTravelStep {
  Distance?: number;
  Duration: number;
  GeometryOffset?: number;
  Instruction?: string | redacted.Redacted<string>;
  Type: RouteTransitTravelStepType;
}
export type RouteTransitTravelStepList = RouteTransitTravelStep[];
export interface RouteTransitLegDetails {
  AfterTravelSteps?: RouteTransitAfterTravelStep[];
  Agency?: RouteTransitAgency;
  Arrival: RouteTransitArrival;
  Attributions?: RouteAttribution[];
  BeforeTravelSteps?: RouteTransitBeforeTravelStep[];
  BookingWebLinks?: RouteWebLink[];
  Departure: RouteTransitDeparture;
  Incidents?: RouteTransitIncident[];
  IntermediateStops?: RouteTransitIntermediateStop[];
  NextDepartures?: RouteTransitNextDeparture[];
  Notices?: RouteTransitNotice[];
  PassThroughWaypoints?: RoutePassThroughWaypoint[];
  Spans?: RouteTransitSpan[];
  Summary?: RouteTransitSummary;
  Transport: RouteTransitTransportModeDetails;
  TravelSteps?: RouteTransitTravelStep[];
}
export interface RouteLeg {
  FerryLegDetails?: RouteFerryLegDetails;
  Geometry: RouteLegGeometry;
  Language?: string;
  PedestrianLegDetails?: RoutePedestrianLegDetails;
  TravelMode: RouteLegTravelMode;
  Type: RouteLegType;
  VehicleLegDetails?: RouteVehicleLegDetails;
  RentalLegDetails?: RouteRentalLegDetails;
  TaxiLegDetails?: RouteTaxiLegDetails;
  TransitLegDetails?: RouteTransitLegDetails;
}
export type RouteLegList = RouteLeg[];
export interface RouteMajorRoadLabel {
  RoadName?: LocalizedString;
  RouteNumber?: RouteNumber;
}
export type RouteMajorRoadLabelList = RouteMajorRoadLabel[];
export interface RouteTollPriceSummary {
  Currency: string;
  Estimate: boolean;
  Range: boolean;
  RangeValue?: RouteTollPriceValueRange;
  Value: number;
}
export interface RouteTollSummary {
  Total?: RouteTollPriceSummary;
}
export interface RouteSummary {
  Distance?: number;
  Duration?: number;
  Tolls?: RouteTollSummary;
}
export interface Route {
  Legs: RouteLeg[];
  MajorRoadLabels: RouteMajorRoadLabel[];
  Summary?: RouteSummary;
}
export type RouteList = Route[];
export interface CalculateRoutesResponse {
  LegGeometryFormat: GeometryFormat;
  Notices: RouteResponseNotice[];
  PricingBucket: string;
  Routes: Route[];
}
export interface WaypointOptimizationAvoidanceAreaGeometry {
  BoundingBox?: number[];
}
export interface WaypointOptimizationAvoidanceArea {
  Geometry: WaypointOptimizationAvoidanceAreaGeometry;
}
export type WaypointOptimizationAvoidanceAreaList =
  WaypointOptimizationAvoidanceArea[];
export interface WaypointOptimizationAvoidanceOptions {
  Areas?: WaypointOptimizationAvoidanceArea[];
  CarShuttleTrains?: boolean;
  ControlledAccessHighways?: boolean;
  DirtRoads?: boolean;
  Ferries?: boolean;
  TollRoads?: boolean;
  Tunnels?: boolean;
  UTurns?: boolean;
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
  DrivingDistanceOptions?: WaypointOptimizationDrivingDistanceOptions;
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
  UseWith?: SideOfStreetMatchingStrategy;
}
export interface WaypointOptimizationDestinationOptions {
  AccessHours?: WaypointOptimizationAccessHours;
  AppointmentTime?: string | redacted.Redacted<string>;
  Heading?: number;
  Id?: string;
  ServiceDuration?: number;
  SideOfStreet?: WaypointOptimizationSideOfStreetOptions;
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
export type WaypointOptimizationServiceTimeTreatment =
  | "Rest"
  | "Work"
  | (string & {});
export interface WaypointOptimizationDriverOptions {
  RestCycles?: WaypointOptimizationRestCycles;
  RestProfile?: WaypointOptimizationRestProfile;
  TreatServiceTimeAs?: WaypointOptimizationServiceTimeTreatment;
}
export interface WaypointOptimizationExclusionOptions {
  Countries: (string | redacted.Redacted<string>)[];
}
export type WaypointOptimizationSequencingObjective =
  | "FastestRoute"
  | "ShortestRoute"
  | (string & {});
export interface WaypointOptimizationOriginOptions {
  Id?: string;
}
export interface WaypointOptimizationTrafficOptions {
  Usage?: TrafficUsage;
}
export type WaypointOptimizationTravelMode =
  | "Car"
  | "Pedestrian"
  | "Scooter"
  | "Truck"
  | (string & {});
export interface WaypointOptimizationPedestrianOptions {
  Speed?: number;
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
export type WaypointOptimizationHazardousCargoTypeList =
  WaypointOptimizationHazardousCargoType[];
export interface WaypointOptimizationTrailerOptions {
  TrailerCount?: number;
}
export type WaypointOptimizationTruckType =
  | "StraightTruck"
  | "Tractor"
  | (string & {});
export interface WaypointOptimizationTruckOptions {
  GrossWeight?: number;
  HazardousCargos?: WaypointOptimizationHazardousCargoType[];
  Height?: number;
  Length?: number;
  Trailer?: WaypointOptimizationTrailerOptions;
  TruckType?: WaypointOptimizationTruckType;
  TunnelRestrictionCode?: string | redacted.Redacted<string>;
  WeightPerAxle?: number;
  Width?: number;
}
export interface WaypointOptimizationTravelModeOptions {
  Pedestrian?: WaypointOptimizationPedestrianOptions;
  Truck?: WaypointOptimizationTruckOptions;
}
export type WaypointIndex = number;
export type BeforeWaypointsList = number[];
export interface WaypointOptimizationWaypoint {
  AccessHours?: WaypointOptimizationAccessHours;
  AppointmentTime?: string | redacted.Redacted<string>;
  Before?: number[];
  Heading?: number;
  Id?: string;
  Position: number[];
  ServiceDuration?: number;
  SideOfStreet?: WaypointOptimizationSideOfStreetOptions;
}
export type WaypointOptimizationWaypointList = WaypointOptimizationWaypoint[];
export interface OptimizeWaypointsRequest {
  Avoid?: WaypointOptimizationAvoidanceOptions;
  Clustering?: WaypointOptimizationClusteringOptions;
  DepartureTime?: string | redacted.Redacted<string>;
  Destination?: number[];
  DestinationOptions?: WaypointOptimizationDestinationOptions;
  Driver?: WaypointOptimizationDriverOptions;
  Exclude?: WaypointOptimizationExclusionOptions;
  Key?: string | redacted.Redacted<string>;
  OptimizeSequencingFor?: WaypointOptimizationSequencingObjective;
  Origin: number[];
  OriginOptions?: WaypointOptimizationOriginOptions;
  Traffic?: WaypointOptimizationTrafficOptions;
  TravelMode?: WaypointOptimizationTravelMode;
  TravelModeOptions?: WaypointOptimizationTravelModeOptions;
  Waypoints?: WaypointOptimizationWaypoint[];
}
export interface WaypointOptimizationConnection {
  Distance: number;
  From: string;
  RestDuration: number;
  To: string;
  TravelDuration: number;
  WaitDuration: number;
}
export type WaypointOptimizationConnectionList =
  WaypointOptimizationConnection[];
export type WaypointOptimizationConstraint =
  | "AccessHours"
  | "AppointmentTime"
  | "Before"
  | "Heading"
  | "ServiceDuration"
  | "SideOfStreet"
  | (string & {});
export interface WaypointOptimizationFailedConstraint {
  Constraint?: WaypointOptimizationConstraint;
  Reason?: string | redacted.Redacted<string>;
}
export type WaypointOptimizationFailedConstraintList =
  WaypointOptimizationFailedConstraint[];
export interface WaypointOptimizationImpedingWaypoint {
  FailedConstraints: WaypointOptimizationFailedConstraint[];
  Id: string;
  Position: number[];
}
export type WaypointOptimizationImpedingWaypointList =
  WaypointOptimizationImpedingWaypoint[];
export type ClusterIndex = number;
export interface WaypointOptimizationOptimizedWaypoint {
  ArrivalTime?: string | redacted.Redacted<string>;
  ClusterIndex?: number;
  DepartureTime?: string | redacted.Redacted<string>;
  Id: string;
  Position: number[];
}
export type WaypointOptimizationOptimizedWaypointList =
  WaypointOptimizationOptimizedWaypoint[];
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
  Heading?: number;
  Position: number[];
  Speed?: number;
  Timestamp?: string | redacted.Redacted<string>;
}
export type RoadSnapTracePointList = RoadSnapTracePoint[];
export type RoadSnapTravelMode =
  | "Car"
  | "Pedestrian"
  | "Scooter"
  | "Truck"
  | (string & {});
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
  TrailerCount?: number;
}
export interface RoadSnapTruckOptions {
  GrossWeight?: number;
  HazardousCargos?: RoadSnapHazardousCargoType[];
  Height?: number;
  Length?: number;
  Trailer?: RoadSnapTrailerOptions;
  TunnelRestrictionCode?: string | redacted.Redacted<string>;
  Width?: number;
}
export interface RoadSnapTravelModeOptions {
  Truck?: RoadSnapTruckOptions;
}
export interface SnapToRoadsRequest {
  Key?: string | redacted.Redacted<string>;
  SnappedGeometryFormat?: GeometryFormat;
  SnapRadius?: number;
  TracePoints: RoadSnapTracePoint[];
  TravelMode?: RoadSnapTravelMode;
  TravelModeOptions?: RoadSnapTravelModeOptions;
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
  LineString?: number[][];
  Polyline?: string | redacted.Redacted<string>;
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
  SnappedGeometry?: RoadSnapSnappedGeometry;
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
  descriptor: {
    service: svc,
    http: "POST /v2/isolines",
    input: {
      Allow: { Hot: 0, Hov: 0 },
      ArrivalTime: 0,
      Avoid: {
        Areas: D.list({
          Except: D.list(i_IsolineAvoidanceAreaGeometry),
          Geometry: i_IsolineAvoidanceAreaGeometry,
        }),
        CarShuttleTrains: 0,
        ControlledAccessHighways: 0,
        DirtRoads: 0,
        Ferries: 0,
        SeasonalClosure: 0,
        TollRoads: 0,
        TollTransponders: 0,
        TruckRoadTypes: 0,
        Tunnels: 0,
        UTurns: 0,
        ZoneCategories: D.list({ Category: 0 }),
      },
      DepartNow: 0,
      DepartureTime: 0,
      Destination: 0,
      DestinationOptions: {
        AvoidActionsForDistance: 0,
        Heading: 0,
        Matching: i_IsolineMatchingOptions,
        SideOfStreet: i_IsolineSideOfStreetOptions,
      },
      IsolineGeometryFormat: 0,
      IsolineGranularity: { MaxPoints: 0, MaxResolution: 0 },
      Key: D.m({ query: "key" }),
      OptimizeIsolineFor: 0,
      OptimizeRoutingFor: 0,
      Origin: 0,
      OriginOptions: {
        AvoidActionsForDistance: 0,
        Heading: 0,
        Matching: i_IsolineMatchingOptions,
        SideOfStreet: i_IsolineSideOfStreetOptions,
      },
      Thresholds: { Distance: 0, Time: 0 },
      Traffic: { FlowEventThresholdOverride: 0, Usage: 0 },
      TravelMode: 0,
      TravelModeOptions: {
        Car: {
          EngineType: 0,
          LicensePlate: i_IsolineVehicleLicensePlate,
          MaxSpeed: 0,
          Occupancy: 0,
        },
        Scooter: {
          EngineType: 0,
          LicensePlate: i_IsolineVehicleLicensePlate,
          MaxSpeed: 0,
          Occupancy: 0,
        },
        Truck: {
          AxleCount: 0,
          EngineType: 0,
          GrossWeight: 0,
          HazardousCargos: 0,
          Height: 0,
          HeightAboveFirstAxle: 0,
          KpraLength: 0,
          Length: 0,
          LicensePlate: i_IsolineVehicleLicensePlate,
          MaxSpeed: 0,
          Occupancy: 0,
          PayloadCapacity: 0,
          TireCount: 0,
          Trailer: { AxleCount: 0, TrailerCount: 0 },
          TruckType: 0,
          TunnelRestrictionCode: 0,
          WeightPerAxle: 0,
          WeightPerAxleGroup: i_WeightPerAxleGroup,
          Width: 0,
        },
      },
    },
    output: {
      ArrivalTime: D.secret,
      DepartureTime: D.secret,
      Isolines: D.list({
        Connections: D.list({ Geometry: { Polyline: D.secret } }),
        Geometries: D.list({ PolylinePolygon: D.list(D.secret) }),
      }),
      PricingBucket: D.m({ header: "x-amz-geo-pricing-bucket" }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CalculateIsolines",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/route-matrix",
    input: {
      Allow: { Hot: 0, Hov: 0 },
      Avoid: {
        Areas: D.list({
          Geometry: { BoundingBox: 0, Polygon: 0, PolylinePolygon: 0 },
        }),
        CarShuttleTrains: 0,
        ControlledAccessHighways: 0,
        DirtRoads: 0,
        Ferries: 0,
        TollRoads: 0,
        TollTransponders: 0,
        TruckRoadTypes: 0,
        Tunnels: 0,
        UTurns: 0,
        ZoneCategories: D.list({ Category: 0 }),
      },
      DepartNow: 0,
      DepartureTime: 0,
      Destinations: D.list({
        Options: {
          AvoidActionsForDistance: 0,
          Heading: 0,
          Matching: i_RouteMatrixMatchingOptions,
          SideOfStreet: i_RouteMatrixSideOfStreetOptions,
        },
        Position: 0,
      }),
      Exclude: { Countries: 0 },
      Key: D.m({ query: "key" }),
      OptimizeRoutingFor: 0,
      Origins: D.list({
        Options: {
          AvoidActionsForDistance: 0,
          Heading: 0,
          Matching: i_RouteMatrixMatchingOptions,
          SideOfStreet: i_RouteMatrixSideOfStreetOptions,
        },
        Position: 0,
      }),
      RoutingBoundary: {
        Geometry: {
          AutoCircle: { Margin: 0, MaxRadius: 0 },
          Circle: { Center: 0, Radius: 0 },
          BoundingBox: 0,
          Polygon: 0,
        },
        Unbounded: 0,
      },
      Traffic: { FlowEventThresholdOverride: 0, Usage: 0 },
      TravelMode: 0,
      TravelModeOptions: {
        Car: {
          LicensePlate: i_RouteMatrixVehicleLicensePlate,
          MaxSpeed: 0,
          Occupancy: 0,
        },
        Scooter: {
          LicensePlate: i_RouteMatrixVehicleLicensePlate,
          MaxSpeed: 0,
          Occupancy: 0,
        },
        Truck: {
          AxleCount: 0,
          GrossWeight: 0,
          HazardousCargos: 0,
          Height: 0,
          KpraLength: 0,
          Length: 0,
          LicensePlate: i_RouteMatrixVehicleLicensePlate,
          MaxSpeed: 0,
          Occupancy: 0,
          PayloadCapacity: 0,
          Trailer: { TrailerCount: 0 },
          TruckType: 0,
          TunnelRestrictionCode: 0,
          WeightPerAxle: 0,
          WeightPerAxleGroup: i_WeightPerAxleGroup,
          Width: 0,
        },
      },
    },
    output: { PricingBucket: D.m({ header: "x-amz-geo-pricing-bucket" }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CalculateRouteMatrix",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/routes",
    input: {
      Allow: { Hot: 0, Hov: 0 },
      ArrivalTime: 0,
      Avoid: {
        Areas: D.list({
          Except: D.list(i_RouteAvoidanceAreaGeometry),
          Geometry: i_RouteAvoidanceAreaGeometry,
        }),
        CarShuttleTrains: 0,
        ControlledAccessHighways: 0,
        DirtRoads: 0,
        Ferries: 0,
        SeasonalClosure: 0,
        TollRoads: 0,
        TollTransponders: 0,
        TruckRoadTypes: 0,
        Tunnels: 0,
        UTurns: 0,
        ZoneCategories: D.list({ Category: 0 }),
      },
      DepartNow: 0,
      DepartureTime: 0,
      Destination: 0,
      DestinationOptions: {
        AvoidActionsForDistance: 0,
        AvoidUTurns: 0,
        Heading: 0,
        Matching: i_RouteMatchingOptions,
        SideOfStreet: i_RouteSideOfStreetOptions,
        StopDuration: 0,
      },
      Driver: { Schedule: D.list({ DriveDuration: 0, RestDuration: 0 }) },
      Exclude: { Countries: 0 },
      InstructionsMeasurementSystem: 0,
      Key: D.m({ query: "key" }),
      Languages: 0,
      LegAdditionalFeatures: 0,
      LegGeometryFormat: 0,
      MaxAlternatives: 0,
      OptimizeRoutingFor: 0,
      Origin: 0,
      OriginOptions: {
        AvoidActionsForDistance: 0,
        AvoidUTurns: 0,
        Heading: 0,
        Matching: i_RouteMatchingOptions,
        SideOfStreet: i_RouteSideOfStreetOptions,
      },
      SpanAdditionalFeatures: 0,
      Tolls: {
        AllTransponders: 0,
        AllVignettes: 0,
        Currency: 0,
        EmissionType: { Co2EmissionClass: 0, Type: 0 },
        VehicleCategory: 0,
      },
      Traffic: { FlowEventThresholdOverride: 0, Usage: 0 },
      TravelMode: 0,
      TravelModeOptions: {
        Car: {
          EngineType: 0,
          LicensePlate: i_RouteVehicleLicensePlate,
          MaxSpeed: 0,
          Occupancy: 0,
        },
        Pedestrian: { Speed: 0 },
        Scooter: {
          EngineType: 0,
          LicensePlate: i_RouteVehicleLicensePlate,
          MaxSpeed: 0,
          Occupancy: 0,
        },
        Truck: {
          AxleCount: 0,
          EngineType: 0,
          GrossWeight: 0,
          HazardousCargos: 0,
          Height: 0,
          HeightAboveFirstAxle: 0,
          KpraLength: 0,
          Length: 0,
          LicensePlate: i_RouteVehicleLicensePlate,
          MaxSpeed: 0,
          Occupancy: 0,
          PayloadCapacity: 0,
          TireCount: 0,
          Trailer: { AxleCount: 0, TrailerCount: 0 },
          TruckType: 0,
          TunnelRestrictionCode: 0,
          WeightPerAxle: 0,
          WeightPerAxleGroup: i_WeightPerAxleGroup,
          Width: 0,
        },
        Intermodal: {
          AccessibilityAttributes: 0,
          MaxTransfers: 0,
          Pedestrian: { MaxDistance: 0, Speed: 0 },
          Rental: { AllowedModes: 0, EnabledFor: 0, ExcludedModes: 0 },
          Taxi: { AllowedModes: 0, EnabledFor: 0, ExcludedModes: 0 },
          Transit: { AllowedModes: 0, EnabledFor: 0, ExcludedModes: 0 },
          Vehicle: { AllowedModes: 0, EnabledFor: 0, ExcludedModes: 0 },
        },
        Transit: {
          AccessibilityAttributes: 0,
          AllowedModes: 0,
          ExcludedModes: 0,
          MaxTransfers: 0,
          Pedestrian: { MaxDistance: 0, Speed: 0 },
        },
      },
      TravelStepType: 0,
      Waypoints: D.list({
        AvoidActionsForDistance: 0,
        AvoidUTurns: 0,
        Heading: 0,
        Matching: i_RouteMatchingOptions,
        PassThrough: 0,
        Position: 0,
        SideOfStreet: i_RouteSideOfStreetOptions,
        StopDuration: 0,
      }),
    },
    output: {
      PricingBucket: D.m({ header: "x-amz-geo-pricing-bucket" }),
      Routes: D.list({
        Legs: D.list({
          FerryLegDetails: {
            AfterTravelSteps: D.list({ Instruction: D.secret, Type: D.secret }),
            Arrival: { Place: o_RouteFerryPlace, Time: D.secret },
            BeforeTravelSteps: D.list({
              Instruction: D.secret,
              Type: D.secret,
            }),
            Departure: { Place: o_RouteFerryPlace, Time: D.secret },
            RouteName: D.secret,
            Spans: D.list({
              Country: D.secret,
              Names: D.list(o_LocalizedString),
              Region: D.secret,
            }),
            TravelSteps: D.list({ Instruction: D.secret, Type: D.secret }),
          },
          Geometry: { Polyline: D.secret },
          PedestrianLegDetails: {
            AfterTravelSteps: D.list({ Instruction: D.secret, Type: D.secret }),
            Arrival: { Place: o_RoutePedestrianPlace, Time: D.secret },
            Departure: { Place: o_RoutePedestrianPlace, Time: D.secret },
            Spans: D.list({
              Country: D.secret,
              Names: D.list(o_LocalizedString),
              PedestrianAccess: D.list(D.secret),
              Region: D.secret,
              RoadAttributes: D.list(D.secret),
              RouteNumbers: D.list(o_RouteNumber),
            }),
            TravelSteps: D.list({
              ContinueStepDetails: o_RouteContinueStepDetails,
              CurrentRoad: o_RouteRoad,
              ExitNumber: D.list(o_LocalizedString),
              Instruction: D.secret,
              KeepStepDetails: o_RouteKeepStepDetails,
              NextRoad: o_RouteRoad,
              RoundaboutEnterStepDetails: o_RouteRoundaboutEnterStepDetails,
              RoundaboutExitStepDetails: o_RouteRoundaboutExitStepDetails,
              RoundaboutPassStepDetails: o_RouteRoundaboutPassStepDetails,
              Signpost: o_RouteSignpost,
              TurnStepDetails: o_RouteTurnStepDetails,
              Type: D.secret,
            }),
          },
          TravelMode: D.secret,
          Type: D.secret,
          VehicleLegDetails: {
            AfterTravelSteps: D.list({ Instruction: D.secret, Type: D.secret }),
            Arrival: { Place: o_RouteVehiclePlace, Time: D.secret },
            Departure: { Place: o_RouteVehiclePlace, Time: D.secret },
            Incidents: D.list({
              Description: D.secret,
              EndTime: D.secret,
              Severity: D.secret,
              StartTime: D.secret,
              Type: D.secret,
            }),
            Notices: D.list({
              Details: D.list({
                Title: D.secret,
                ViolatedConstraints: {
                  HazardousCargos: D.list(D.secret),
                  TruckType: D.secret,
                  TunnelRestrictionCode: D.secret,
                },
              }),
            }),
            Spans: D.list({
              CarAccess: D.list(D.secret),
              Country: D.secret,
              Gate: D.secret,
              Names: D.list(o_LocalizedString),
              RailwayCrossing: D.secret,
              Region: D.secret,
              RoadAttributes: D.list(D.secret),
              RouteNumbers: D.list(o_RouteNumber),
              ScooterAccess: D.list(D.secret),
              TruckAccess: D.list(D.secret),
            }),
            Tolls: D.list({
              Country: D.secret,
              Rates: D.list({
                ApplicableTimes: D.secret,
                Id: D.secret,
                Name: D.secret,
                Pass: { ValidityPeriod: { Period: D.secret } },
                PaymentMethods: D.list(D.secret),
                Transponders: D.list({ SystemName: D.secret }),
              }),
            }),
            TollSystems: D.list({ Name: D.secret }),
            TravelSteps: D.list({
              ContinueHighwayStepDetails: {
                Intersection: D.list(o_LocalizedString),
                SteeringDirection: D.secret,
                TurnIntensity: D.secret,
              },
              ContinueStepDetails: o_RouteContinueStepDetails,
              CurrentRoad: o_RouteRoad,
              EnterHighwayStepDetails: {
                Intersection: D.list(o_LocalizedString),
                SteeringDirection: D.secret,
                TurnIntensity: D.secret,
              },
              ExitNumber: D.list(o_LocalizedString),
              ExitStepDetails: o_RouteExitStepDetails,
              Instruction: D.secret,
              KeepStepDetails: o_RouteKeepStepDetails,
              NextRoad: o_RouteRoad,
              RampStepDetails: o_RouteRampStepDetails,
              RoundaboutEnterStepDetails: o_RouteRoundaboutEnterStepDetails,
              RoundaboutExitStepDetails: o_RouteRoundaboutExitStepDetails,
              RoundaboutPassStepDetails: o_RouteRoundaboutPassStepDetails,
              Signpost: o_RouteSignpost,
              TurnStepDetails: o_RouteTurnStepDetails,
              Type: D.secret,
              UTurnStepDetails: o_RouteUTurnStepDetails,
            }),
            TruckRoadTypes: D.list(D.secret),
            Zones: D.list({ Category: D.secret, Name: D.secret }),
          },
          RentalLegDetails: {
            AfterTravelSteps: D.list({ Instruction: D.secret, Type: D.secret }),
            Agency: { Name: D.secret, Url: D.secret },
            Arrival: { Place: o_RouteRentalPlace, Time: D.secret },
            Attributions: D.list(o_RouteAttribution),
            BeforeTravelSteps: D.list({
              Instruction: D.secret,
              Type: D.secret,
            }),
            BookingWebLinks: D.list(o_RouteWebLink),
            Departure: { Place: o_RouteRentalPlace, Time: D.secret },
            Transport: {
              Category: D.secret,
              Color: D.secret,
              Engine: D.secret,
              LicensePlate: D.secret,
              Mode: D.secret,
              Model: D.secret,
              Name: D.secret,
              TextColor: D.secret,
            },
            TravelSteps: D.list({
              ContinueStepDetails: o_RouteContinueStepDetails,
              ExitStepDetails: o_RouteExitStepDetails,
              Instruction: D.secret,
              KeepStepDetails: o_RouteKeepStepDetails,
              RampStepDetails: o_RouteRampStepDetails,
              RoundaboutEnterStepDetails: o_RouteRoundaboutEnterStepDetails,
              RoundaboutExitStepDetails: o_RouteRoundaboutExitStepDetails,
              RoundaboutPassStepDetails: o_RouteRoundaboutPassStepDetails,
              TurnStepDetails: o_RouteTurnStepDetails,
              Type: D.secret,
              UTurnStepDetails: o_RouteUTurnStepDetails,
            }),
          },
          TaxiLegDetails: {
            AfterTravelSteps: D.list({ Instruction: D.secret, Type: D.secret }),
            Agency: { Name: D.secret, Url: D.secret },
            Arrival: { Place: o_RouteTaxiPlace, Time: D.secret },
            Attributions: D.list(o_RouteAttribution),
            BeforeTravelSteps: D.list({
              Instruction: D.secret,
              Type: D.secret,
            }),
            BookingWebLinks: D.list(o_RouteWebLink),
            Departure: { Place: o_RouteTaxiPlace, Time: D.secret },
            Transport: {
              Category: D.secret,
              Color: D.secret,
              Engine: D.secret,
              LicensePlate: D.secret,
              Mode: D.secret,
              Model: D.secret,
              Name: D.secret,
              TextColor: D.secret,
            },
            TravelSteps: D.list({
              ContinueStepDetails: o_RouteContinueStepDetails,
              ExitStepDetails: o_RouteExitStepDetails,
              Instruction: D.secret,
              KeepStepDetails: o_RouteKeepStepDetails,
              RampStepDetails: o_RouteRampStepDetails,
              RoundaboutEnterStepDetails: o_RouteRoundaboutEnterStepDetails,
              RoundaboutExitStepDetails: o_RouteRoundaboutExitStepDetails,
              RoundaboutPassStepDetails: o_RouteRoundaboutPassStepDetails,
              TurnStepDetails: o_RouteTurnStepDetails,
              Type: D.secret,
              UTurnStepDetails: o_RouteUTurnStepDetails,
            }),
          },
          TransitLegDetails: {
            AfterTravelSteps: D.list({ Instruction: D.secret, Type: D.secret }),
            Agency: { Name: D.secret, Url: D.secret },
            Arrival: {
              Place: o_RouteTransitPlace,
              Status: D.secret,
              Time: D.secret,
            },
            Attributions: D.list(o_RouteAttribution),
            BeforeTravelSteps: D.list({
              Instruction: D.secret,
              Type: D.secret,
            }),
            BookingWebLinks: D.list(o_RouteWebLink),
            Departure: o_RouteTransitDeparture,
            Incidents: D.list({
              Description: D.secret,
              Effect: D.secret,
              EndTime: D.secret,
              StartTime: D.secret,
              Type: D.secret,
              Url: D.secret,
            }),
            IntermediateStops: D.list({
              Attributes: D.list(D.secret),
              Departure: o_RouteTransitDeparture,
              Transport: o_RouteTransitTransportModeDetails,
            }),
            NextDepartures: D.list({
              PlatformName: D.secret,
              Status: D.secret,
              Time: D.secret,
              Transport: o_RouteTransitTransportModeDetails,
            }),
            Spans: D.list({
              Country: D.secret,
              Names: D.list(o_LocalizedString),
              Region: D.secret,
            }),
            Transport: o_RouteTransitTransportModeDetails,
            TravelSteps: D.list({ Instruction: D.secret, Type: D.secret }),
          },
        }),
        MajorRoadLabels: D.list({
          RoadName: o_LocalizedString,
          RouteNumber: o_RouteNumber,
        }),
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CalculateRoutes",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/optimize-waypoints",
    input: {
      Avoid: {
        Areas: D.list({ Geometry: { BoundingBox: 0 } }),
        CarShuttleTrains: 0,
        ControlledAccessHighways: 0,
        DirtRoads: 0,
        Ferries: 0,
        TollRoads: 0,
        Tunnels: 0,
        UTurns: 0,
      },
      Clustering: {
        Algorithm: 0,
        DrivingDistanceOptions: { DrivingDistance: 0 },
      },
      DepartureTime: 0,
      Destination: 0,
      DestinationOptions: {
        AccessHours: i_WaypointOptimizationAccessHours,
        AppointmentTime: 0,
        Heading: 0,
        Id: 0,
        ServiceDuration: 0,
        SideOfStreet: i_WaypointOptimizationSideOfStreetOptions,
      },
      Driver: {
        RestCycles: {
          LongCycle: i_WaypointOptimizationRestCycleDurations,
          ShortCycle: i_WaypointOptimizationRestCycleDurations,
        },
        RestProfile: { Profile: 0 },
        TreatServiceTimeAs: 0,
      },
      Exclude: { Countries: 0 },
      Key: D.m({ query: "key" }),
      OptimizeSequencingFor: 0,
      Origin: 0,
      OriginOptions: { Id: 0 },
      Traffic: { Usage: 0 },
      TravelMode: 0,
      TravelModeOptions: {
        Pedestrian: { Speed: 0 },
        Truck: {
          GrossWeight: 0,
          HazardousCargos: 0,
          Height: 0,
          Length: 0,
          Trailer: { TrailerCount: 0 },
          TruckType: 0,
          TunnelRestrictionCode: 0,
          WeightPerAxle: 0,
          Width: 0,
        },
      },
      Waypoints: D.list({
        AccessHours: i_WaypointOptimizationAccessHours,
        AppointmentTime: 0,
        Before: 0,
        Heading: 0,
        Id: 0,
        Position: 0,
        ServiceDuration: 0,
        SideOfStreet: i_WaypointOptimizationSideOfStreetOptions,
      }),
    },
    output: {
      ImpedingWaypoints: D.list({
        FailedConstraints: D.list({ Constraint: D.secret, Reason: D.secret }),
      }),
      OptimizedWaypoints: D.list({
        ArrivalTime: D.secret,
        DepartureTime: D.secret,
      }),
      PricingBucket: D.m({ header: "x-amz-geo-pricing-bucket" }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "OptimizeWaypoints",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/snap-to-roads",
    input: {
      Key: D.m({ query: "key" }),
      SnappedGeometryFormat: 0,
      SnapRadius: 0,
      TracePoints: D.list({ Heading: 0, Position: 0, Speed: 0, Timestamp: 0 }),
      TravelMode: 0,
      TravelModeOptions: {
        Truck: {
          GrossWeight: 0,
          HazardousCargos: 0,
          Height: 0,
          Length: 0,
          Trailer: { TrailerCount: 0 },
          TunnelRestrictionCode: 0,
          Width: 0,
        },
      },
    },
    output: {
      Notices: D.list({ Code: D.secret, Title: D.secret }),
      PricingBucket: D.m({ header: "x-amz-geo-pricing-bucket" }),
      SnappedGeometry: { Polyline: D.secret },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SnapToRoads",
})) as any;

const i_IsolineAvoidanceAreaGeometry: D.LazyStruct = () => ({
  BoundingBox: 0,
  Corridor: i_Corridor,
  Polygon: 0,
  PolylineCorridor: i_PolylineCorridor,
  PolylinePolygon: 0,
});
const i_IsolineMatchingOptions: D.LazyStruct = () => ({
  NameHint: 0,
  OnRoadThreshold: 0,
  Radius: 0,
  Strategy: 0,
});
const i_IsolineSideOfStreetOptions: D.LazyStruct = () => ({
  Position: 0,
  UseWith: 0,
});
const i_IsolineVehicleLicensePlate: D.LazyStruct = () => ({ LastCharacter: 0 });
const i_RouteAvoidanceAreaGeometry: D.LazyStruct = () => ({
  Corridor: i_Corridor,
  BoundingBox: 0,
  Polygon: 0,
  PolylineCorridor: i_PolylineCorridor,
  PolylinePolygon: 0,
});
const i_RouteMatchingOptions: D.LazyStruct = () => ({
  NameHint: 0,
  OnRoadThreshold: 0,
  Radius: 0,
  Strategy: 0,
});
const i_RouteMatrixMatchingOptions: D.LazyStruct = () => ({
  NameHint: 0,
  OnRoadThreshold: 0,
  Radius: 0,
  Strategy: 0,
});
const i_RouteMatrixSideOfStreetOptions: D.LazyStruct = () => ({
  Position: 0,
  UseWith: 0,
});
const i_RouteMatrixVehicleLicensePlate: D.LazyStruct = () => ({
  LastCharacter: 0,
});
const i_RouteSideOfStreetOptions: D.LazyStruct = () => ({
  Position: 0,
  UseWith: 0,
});
const i_RouteVehicleLicensePlate: D.LazyStruct = () => ({ LastCharacter: 0 });
const i_WaypointOptimizationAccessHours: D.LazyStruct = () => ({
  From: i_WaypointOptimizationAccessHoursEntry,
  To: i_WaypointOptimizationAccessHoursEntry,
});
const i_WaypointOptimizationRestCycleDurations: D.LazyStruct = () => ({
  RestDuration: 0,
  WorkDuration: 0,
});
const i_WaypointOptimizationSideOfStreetOptions: D.LazyStruct = () => ({
  Position: 0,
  UseWith: 0,
});
const i_WeightPerAxleGroup: D.LazyStruct = () => ({
  Single: 0,
  Tandem: 0,
  Triple: 0,
  Quad: 0,
  Quint: 0,
});
const o_LocalizedString: D.LazyStruct = () => ({ Value: D.secret });
const o_RouteAttribution: D.LazyStruct = () => ({
  AttributionType: D.secret,
  WebLink: o_RouteWebLink,
});
const o_RouteContinueStepDetails: D.LazyStruct = () => ({
  Intersection: D.list(o_LocalizedString),
});
const o_RouteExitStepDetails: D.LazyStruct = () => ({
  Intersection: D.list(o_LocalizedString),
  SteeringDirection: D.secret,
  TurnIntensity: D.secret,
});
const o_RouteFerryPlace: D.LazyStruct = () => ({ Name: D.secret });
const o_RouteKeepStepDetails: D.LazyStruct = () => ({
  Intersection: D.list(o_LocalizedString),
  SteeringDirection: D.secret,
  TurnIntensity: D.secret,
});
const o_RouteNumber: D.LazyStruct = () => ({
  Direction: D.secret,
  Value: D.secret,
});
const o_RoutePedestrianPlace: D.LazyStruct = () => ({
  Name: D.secret,
  SideOfStreet: D.secret,
  StationDetails: o_RouteStationDetails,
  Type: D.secret,
});
const o_RouteRampStepDetails: D.LazyStruct = () => ({
  Intersection: D.list(o_LocalizedString),
  SteeringDirection: D.secret,
  TurnIntensity: D.secret,
});
const o_RouteRentalPlace: D.LazyStruct = () => ({
  Name: D.secret,
  StationDetails: o_RouteStationDetails,
  Type: D.secret,
});
const o_RouteRoad: D.LazyStruct = () => ({
  RoadName: D.list(o_LocalizedString),
  RouteNumber: D.list(o_RouteNumber),
  Towards: D.list(o_LocalizedString),
  Type: D.secret,
});
const o_RouteRoundaboutEnterStepDetails: D.LazyStruct = () => ({
  Intersection: D.list(o_LocalizedString),
  SteeringDirection: D.secret,
  TurnIntensity: D.secret,
});
const o_RouteRoundaboutExitStepDetails: D.LazyStruct = () => ({
  Intersection: D.list(o_LocalizedString),
  SteeringDirection: D.secret,
});
const o_RouteRoundaboutPassStepDetails: D.LazyStruct = () => ({
  Intersection: D.list(o_LocalizedString),
  SteeringDirection: D.secret,
  TurnIntensity: D.secret,
});
const o_RouteSignpost: D.LazyStruct = () => ({
  Labels: D.list({ RouteNumber: o_RouteNumber, Text: o_LocalizedString }),
});
const o_RouteTaxiPlace: D.LazyStruct = () => ({
  Name: D.secret,
  StationDetails: o_RouteStationDetails,
  Type: D.secret,
});
const o_RouteTransitDeparture: D.LazyStruct = () => ({
  Place: o_RouteTransitPlace,
  Status: D.secret,
  Time: D.secret,
});
const o_RouteTransitPlace: D.LazyStruct = () => ({
  Name: D.secret,
  StationDetails: o_RouteStationDetails,
  Type: D.secret,
});
const o_RouteTransitTransportModeDetails: D.LazyStruct = () => ({
  Color: D.secret,
  Headsign: D.secret,
  LongRouteName: D.secret,
  Mode: D.secret,
  RouteName: D.secret,
  ShortRouteName: D.secret,
  TextColor: D.secret,
});
const o_RouteTurnStepDetails: D.LazyStruct = () => ({
  Intersection: D.list(o_LocalizedString),
  SteeringDirection: D.secret,
  TurnIntensity: D.secret,
});
const o_RouteUTurnStepDetails: D.LazyStruct = () => ({
  Intersection: D.list(o_LocalizedString),
  SteeringDirection: D.secret,
  TurnIntensity: D.secret,
});
const o_RouteVehiclePlace: D.LazyStruct = () => ({
  Name: D.secret,
  SideOfStreet: D.secret,
  StationDetails: o_RouteStationDetails,
  Type: D.secret,
});
const o_RouteWebLink: D.LazyStruct = () => ({
  AnchorText: D.secret,
  Description: D.secret,
  DeviceType: D.secret,
  Url: D.secret,
});
const i_Corridor: D.LazyStruct = () => ({ LineString: 0, Radius: 0 });
const i_PolylineCorridor: D.LazyStruct = () => ({ Polyline: 0, Radius: 0 });
const i_WaypointOptimizationAccessHoursEntry: D.LazyStruct = () => ({
  DayOfWeek: 0,
  TimeOfDay: 0,
});
const o_RouteStationDetails: D.LazyStruct = () => ({
  PlatformName: D.secret,
  ShortName: D.secret,
});
