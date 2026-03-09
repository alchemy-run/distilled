import * as HttpClient from "effect/unstable/http/HttpClient";
import * as redacted from "effect/Redacted";
import * as S from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import type { Region } from "../region.ts";
import { SensitiveString } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "Geo Routes",
  serviceShapeName: "RoutesService",
});
const auth = T.AwsAuthSigv4({ name: "geo-routes" });
const ver = T.ServiceVersion("2020-11-19");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
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
            `https://routes.geo.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}/v2`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws" &&
          UseFIPS === true &&
          UseDualStack === true
        ) {
          return e(
            `https://routes.geo-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}/v2`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws" &&
          UseFIPS === true &&
          UseDualStack === false
        ) {
          return e(
            `https://routes.geo-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}/v2`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws" &&
          UseFIPS === false &&
          UseDualStack === true
        ) {
          return e(
            `https://routes.geo.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}/v2`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e(
            `https://routes.geo.${Region}.us-gov.${_.getAttr(PartitionResult, "dnsSuffix")}/v2`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === true &&
          UseDualStack === true
        ) {
          return e(
            `https://routes.geo-fips.${Region}.us-gov.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}/v2`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === true &&
          UseDualStack === false
        ) {
          return e(
            `https://routes.geo-fips.${Region}.us-gov.${_.getAttr(PartitionResult, "dnsSuffix")}/v2`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === false &&
          UseDualStack === true
        ) {
          return e(
            `https://routes.geo.${Region}.us-gov.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}/v2`,
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
});

//# Newtypes
export type SensitiveBoolean = boolean;
export type TimestampWithTimezoneOffset = string | redacted.Redacted<string>;
export type Polyline = string | redacted.Redacted<string>;
export type PolylineRing = string | redacted.Redacted<string>;
export type TruckRoadType = string | redacted.Redacted<string>;
export type IsolineZoneCategory = string;
export type DistanceMeters = number;
export type Heading = number;
export type SensitiveString = string | redacted.Redacted<string>;
export type MatchingStrategy = string;
export type SideOfStreetMatchingStrategy = string;
export type GeometryFormat = string;
export type ApiKey = string | redacted.Redacted<string>;
export type IsolineOptimizationObjective = string;
export type RoutingObjective = string;
export type DurationSeconds = number;
export type TrafficUsage = string;
export type IsolineTravelMode = string;
export type IsolineEngineType = string | redacted.Redacted<string>;
export type SpeedKilometersPerHour = number;
export type SensitiveInteger = number;
export type WeightKilograms = number;
export type IsolineHazardousCargoType = string | redacted.Redacted<string>;
export type DimensionCentimeters = number;
export type IsolineTruckType = string;
export type TunnelRestrictionCode = string | redacted.Redacted<string>;
export type ValidationExceptionReason = string;
export type RouteMatrixZoneCategory = string | redacted.Redacted<string>;
export type CountryCode = string | redacted.Redacted<string>;
export type SensitiveDouble = number;
export type RouteMatrixTravelMode = string;
export type RouteMatrixHazardousCargoType = string | redacted.Redacted<string>;
export type RouteMatrixTruckType = string | redacted.Redacted<string>;
export type RouteMatrixErrorCode = string;
export type RouteZoneCategory = string | redacted.Redacted<string>;
export type MeasurementSystem = string;
export type LanguageTag = string;
export type RouteLegAdditionalFeature = string | redacted.Redacted<string>;
export type RouteSpanAdditionalFeature = string;
export type CurrencyCode = string;
export type RouteTollVehicleCategory = string | redacted.Redacted<string>;
export type RouteTravelMode = string;
export type RouteEngineType = string | redacted.Redacted<string>;
export type RouteHazardousCargoType = string | redacted.Redacted<string>;
export type RouteTruckType = string | redacted.Redacted<string>;
export type RouteTravelStepType = string;
export type RouteResponseNoticeCode = string;
export type RouteNoticeImpact = string;
export type RouteFerryAfterTravelStepType = string | redacted.Redacted<string>;
export type RouteFerryBeforeTravelStepType = string | redacted.Redacted<string>;
export type RouteFerryNoticeCode = string;
export type CountryCode3 = string | redacted.Redacted<string>;
export type RouteFerryTravelStepType = string | redacted.Redacted<string>;
export type RouteSideOfStreet = string | redacted.Redacted<string>;
export type RoutePedestrianNoticeCode = string;
export type RouteSpanPedestrianAccessAttribute =
  | string
  | redacted.Redacted<string>;
export type RouteSpanRoadAttribute = string | redacted.Redacted<string>;
export type RouteDirection = string | redacted.Redacted<string>;
export type RouteRoadType = string | redacted.Redacted<string>;
export type RouteSteeringDirection = string | redacted.Redacted<string>;
export type TurnAngle = number;
export type RouteTurnIntensity = string | redacted.Redacted<string>;
export type RoundaboutAngle = number;
export type RoutePedestrianTravelStepType = string | redacted.Redacted<string>;
export type RouteLegTravelMode = string | redacted.Redacted<string>;
export type RouteLegType = string | redacted.Redacted<string>;
export type RouteVehicleIncidentSeverity = string | redacted.Redacted<string>;
export type RouteVehicleIncidentType = string | redacted.Redacted<string>;
export type RouteVehicleNoticeCode = string;
export type RouteWeightConstraintType = string;
export type RouteSpanCarAccessAttribute = string | redacted.Redacted<string>;
export type RouteSpanGateAttribute = string | redacted.Redacted<string>;
export type RouteSpanRailwayCrossingAttribute =
  | string
  | redacted.Redacted<string>;
export type RouteSpanScooterAccessAttribute =
  | string
  | redacted.Redacted<string>;
export type RouteSpanTruckAccessAttribute = string | redacted.Redacted<string>;
export type RouteTollPassValidityPeriodType =
  | string
  | redacted.Redacted<string>;
export type RouteTollPaymentMethod = string | redacted.Redacted<string>;
export type RouteVehicleTravelStepType = string | redacted.Redacted<string>;
export type WaypointOptimizationClusteringAlgorithm =
  | string
  | redacted.Redacted<string>;
export type DayOfWeek = string | redacted.Redacted<string>;
export type TimeOfDay = string | redacted.Redacted<string>;
export type WaypointId = string;
export type WaypointOptimizationServiceTimeTreatment =
  | string
  | redacted.Redacted<string>;
export type WaypointOptimizationSequencingObjective = string;
export type WaypointOptimizationTravelMode = string;
export type WaypointOptimizationHazardousCargoType =
  | string
  | redacted.Redacted<string>;
export type WaypointOptimizationTruckType = string | redacted.Redacted<string>;
export type WaypointIndex = number;
export type WaypointOptimizationConstraint = string | redacted.Redacted<string>;
export type ClusterIndex = number;
export type RoadSnapTravelMode = string;
export type RoadSnapHazardousCargoType = string | redacted.Redacted<string>;
export type RoadSnapNoticeCode = string | redacted.Redacted<string>;

//# Schemas
export interface IsolineAllowOptions {
  Hot?: boolean;
  Hov?: boolean;
}
export const IsolineAllowOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({ Hot: S.optional(S.Boolean), Hov: S.optional(S.Boolean) }),
).annotate({
  identifier: "IsolineAllowOptions",
}) as any as S.Schema<IsolineAllowOptions>;
export type BoundingBox = number[];
export const BoundingBox = /*@__PURE__*/ /*#__PURE__*/ S.Array(S.Number);
export type Position = number[];
export const Position = /*@__PURE__*/ /*#__PURE__*/ S.Array(S.Number);
export type LineString = number[][];
export const LineString = /*@__PURE__*/ /*#__PURE__*/ S.Array(Position);
export interface Corridor {
  LineString: number[][];
  Radius: number;
}
export const Corridor = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({ LineString: LineString, Radius: S.Number }),
).annotate({ identifier: "Corridor" }) as any as S.Schema<Corridor>;
export type LinearRing = number[][];
export const LinearRing = /*@__PURE__*/ /*#__PURE__*/ S.Array(Position);
export type LinearRings = number[][][];
export const LinearRings = /*@__PURE__*/ /*#__PURE__*/ S.Array(LinearRing);
export interface PolylineCorridor {
  Polyline: string | redacted.Redacted<string>;
  Radius: number;
}
export const PolylineCorridor = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({ Polyline: SensitiveString, Radius: S.Number }),
).annotate({
  identifier: "PolylineCorridor",
}) as any as S.Schema<PolylineCorridor>;
export type PolylineRingList = string | redacted.Redacted<string>[];
export const PolylineRingList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(SensitiveString);
export interface IsolineAvoidanceAreaGeometry {
  BoundingBox?: number[];
  Corridor?: Corridor;
  Polygon?: number[][][];
  PolylineCorridor?: PolylineCorridor;
  PolylinePolygon?: string | redacted.Redacted<string>[];
}
export const IsolineAvoidanceAreaGeometry =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      BoundingBox: S.optional(BoundingBox),
      Corridor: S.optional(Corridor),
      Polygon: S.optional(LinearRings),
      PolylineCorridor: S.optional(PolylineCorridor),
      PolylinePolygon: S.optional(PolylineRingList),
    }),
  ).annotate({
    identifier: "IsolineAvoidanceAreaGeometry",
  }) as any as S.Schema<IsolineAvoidanceAreaGeometry>;
export type IsolineAvoidanceAreaGeometryList = IsolineAvoidanceAreaGeometry[];
export const IsolineAvoidanceAreaGeometryList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(IsolineAvoidanceAreaGeometry);
export interface IsolineAvoidanceArea {
  Except?: IsolineAvoidanceAreaGeometry[];
  Geometry: IsolineAvoidanceAreaGeometry;
}
export const IsolineAvoidanceArea = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    Except: S.optional(IsolineAvoidanceAreaGeometryList),
    Geometry: IsolineAvoidanceAreaGeometry,
  }),
).annotate({
  identifier: "IsolineAvoidanceArea",
}) as any as S.Schema<IsolineAvoidanceArea>;
export type IsolineAvoidanceAreaList = IsolineAvoidanceArea[];
export const IsolineAvoidanceAreaList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(IsolineAvoidanceArea);
export type TruckRoadTypeList = string | redacted.Redacted<string>[];
export const TruckRoadTypeList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(SensitiveString);
export interface IsolineAvoidanceZoneCategory {
  Category?: string;
}
export const IsolineAvoidanceZoneCategory =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({ Category: S.optional(S.String) }),
  ).annotate({
    identifier: "IsolineAvoidanceZoneCategory",
  }) as any as S.Schema<IsolineAvoidanceZoneCategory>;
export type IsolineAvoidanceZoneCategoryList = IsolineAvoidanceZoneCategory[];
export const IsolineAvoidanceZoneCategoryList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(IsolineAvoidanceZoneCategory);
export interface IsolineAvoidanceOptions {
  Areas?: IsolineAvoidanceArea[];
  CarShuttleTrains?: boolean;
  ControlledAccessHighways?: boolean;
  DirtRoads?: boolean;
  Ferries?: boolean;
  SeasonalClosure?: boolean;
  TollRoads?: boolean;
  TollTransponders?: boolean;
  TruckRoadTypes?: string | redacted.Redacted<string>[];
  Tunnels?: boolean;
  UTurns?: boolean;
  ZoneCategories?: IsolineAvoidanceZoneCategory[];
}
export const IsolineAvoidanceOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Areas: S.optional(IsolineAvoidanceAreaList),
      CarShuttleTrains: S.optional(S.Boolean),
      ControlledAccessHighways: S.optional(S.Boolean),
      DirtRoads: S.optional(S.Boolean),
      Ferries: S.optional(S.Boolean),
      SeasonalClosure: S.optional(S.Boolean),
      TollRoads: S.optional(S.Boolean),
      TollTransponders: S.optional(S.Boolean),
      TruckRoadTypes: S.optional(TruckRoadTypeList),
      Tunnels: S.optional(S.Boolean),
      UTurns: S.optional(S.Boolean),
      ZoneCategories: S.optional(IsolineAvoidanceZoneCategoryList),
    }),
).annotate({
  identifier: "IsolineAvoidanceOptions",
}) as any as S.Schema<IsolineAvoidanceOptions>;
export interface IsolineMatchingOptions {
  NameHint?: string | redacted.Redacted<string>;
  OnRoadThreshold?: number;
  Radius?: number;
  Strategy?: string;
}
export const IsolineMatchingOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      NameHint: S.optional(SensitiveString),
      OnRoadThreshold: S.optional(S.Number),
      Radius: S.optional(S.Number),
      Strategy: S.optional(S.String),
    }),
).annotate({
  identifier: "IsolineMatchingOptions",
}) as any as S.Schema<IsolineMatchingOptions>;
export interface IsolineSideOfStreetOptions {
  Position: number[];
  UseWith?: string;
}
export const IsolineSideOfStreetOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () => S.Struct({ Position: Position, UseWith: S.optional(S.String) }),
).annotate({
  identifier: "IsolineSideOfStreetOptions",
}) as any as S.Schema<IsolineSideOfStreetOptions>;
export interface IsolineDestinationOptions {
  AvoidActionsForDistance?: number;
  Heading?: number;
  Matching?: IsolineMatchingOptions;
  SideOfStreet?: IsolineSideOfStreetOptions;
}
export const IsolineDestinationOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AvoidActionsForDistance: S.optional(S.Number),
      Heading: S.optional(S.Number),
      Matching: S.optional(IsolineMatchingOptions),
      SideOfStreet: S.optional(IsolineSideOfStreetOptions),
    }),
).annotate({
  identifier: "IsolineDestinationOptions",
}) as any as S.Schema<IsolineDestinationOptions>;
export interface IsolineGranularityOptions {
  MaxPoints?: number;
  MaxResolution?: number;
}
export const IsolineGranularityOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MaxPoints: S.optional(S.Number),
      MaxResolution: S.optional(S.Number),
    }),
).annotate({
  identifier: "IsolineGranularityOptions",
}) as any as S.Schema<IsolineGranularityOptions>;
export interface IsolineOriginOptions {
  AvoidActionsForDistance?: number;
  Heading?: number;
  Matching?: IsolineMatchingOptions;
  SideOfStreet?: IsolineSideOfStreetOptions;
}
export const IsolineOriginOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    AvoidActionsForDistance: S.optional(S.Number),
    Heading: S.optional(S.Number),
    Matching: S.optional(IsolineMatchingOptions),
    SideOfStreet: S.optional(IsolineSideOfStreetOptions),
  }),
).annotate({
  identifier: "IsolineOriginOptions",
}) as any as S.Schema<IsolineOriginOptions>;
export type DistanceThresholdList = number[];
export const DistanceThresholdList = /*@__PURE__*/ /*#__PURE__*/ S.Array(
  S.Number,
);
export type TimeThresholdList = number[];
export const TimeThresholdList = /*@__PURE__*/ /*#__PURE__*/ S.Array(S.Number);
export interface IsolineThresholds {
  Distance?: number[];
  Time?: number[];
}
export const IsolineThresholds = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    Distance: S.optional(DistanceThresholdList),
    Time: S.optional(TimeThresholdList),
  }),
).annotate({
  identifier: "IsolineThresholds",
}) as any as S.Schema<IsolineThresholds>;
export interface IsolineTrafficOptions {
  FlowEventThresholdOverride?: number;
  Usage?: string;
}
export const IsolineTrafficOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    FlowEventThresholdOverride: S.optional(S.Number),
    Usage: S.optional(S.String),
  }),
).annotate({
  identifier: "IsolineTrafficOptions",
}) as any as S.Schema<IsolineTrafficOptions>;
export interface IsolineVehicleLicensePlate {
  LastCharacter?: string;
}
export const IsolineVehicleLicensePlate = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () => S.Struct({ LastCharacter: S.optional(S.String) }),
).annotate({
  identifier: "IsolineVehicleLicensePlate",
}) as any as S.Schema<IsolineVehicleLicensePlate>;
export interface IsolineCarOptions {
  EngineType?: string | redacted.Redacted<string>;
  LicensePlate?: IsolineVehicleLicensePlate;
  MaxSpeed?: number;
  Occupancy?: number;
}
export const IsolineCarOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    EngineType: S.optional(SensitiveString),
    LicensePlate: S.optional(IsolineVehicleLicensePlate),
    MaxSpeed: S.optional(S.Number),
    Occupancy: S.optional(S.Number),
  }),
).annotate({
  identifier: "IsolineCarOptions",
}) as any as S.Schema<IsolineCarOptions>;
export interface IsolineScooterOptions {
  EngineType?: string | redacted.Redacted<string>;
  LicensePlate?: IsolineVehicleLicensePlate;
  MaxSpeed?: number;
  Occupancy?: number;
}
export const IsolineScooterOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    EngineType: S.optional(SensitiveString),
    LicensePlate: S.optional(IsolineVehicleLicensePlate),
    MaxSpeed: S.optional(S.Number),
    Occupancy: S.optional(S.Number),
  }),
).annotate({
  identifier: "IsolineScooterOptions",
}) as any as S.Schema<IsolineScooterOptions>;
export type IsolineHazardousCargoTypeList =
  | string
  | redacted.Redacted<string>[];
export const IsolineHazardousCargoTypeList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(SensitiveString);
export interface IsolineTrailerOptions {
  AxleCount?: number;
  TrailerCount?: number;
}
export const IsolineTrailerOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    AxleCount: S.optional(S.Number),
    TrailerCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "IsolineTrailerOptions",
}) as any as S.Schema<IsolineTrailerOptions>;
export interface WeightPerAxleGroup {
  Single?: number;
  Tandem?: number;
  Triple?: number;
  Quad?: number;
  Quint?: number;
}
export const WeightPerAxleGroup = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    Single: S.optional(S.Number),
    Tandem: S.optional(S.Number),
    Triple: S.optional(S.Number),
    Quad: S.optional(S.Number),
    Quint: S.optional(S.Number),
  }),
).annotate({
  identifier: "WeightPerAxleGroup",
}) as any as S.Schema<WeightPerAxleGroup>;
export interface IsolineTruckOptions {
  AxleCount?: number;
  EngineType?: string | redacted.Redacted<string>;
  GrossWeight?: number;
  HazardousCargos?: string | redacted.Redacted<string>[];
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
  TruckType?: string;
  TunnelRestrictionCode?: string | redacted.Redacted<string>;
  WeightPerAxle?: number;
  WeightPerAxleGroup?: WeightPerAxleGroup;
  Width?: number;
}
export const IsolineTruckOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    AxleCount: S.optional(S.Number),
    EngineType: S.optional(SensitiveString),
    GrossWeight: S.optional(S.Number),
    HazardousCargos: S.optional(IsolineHazardousCargoTypeList),
    Height: S.optional(S.Number),
    HeightAboveFirstAxle: S.optional(S.Number),
    KpraLength: S.optional(S.Number),
    Length: S.optional(S.Number),
    LicensePlate: S.optional(IsolineVehicleLicensePlate),
    MaxSpeed: S.optional(S.Number),
    Occupancy: S.optional(S.Number),
    PayloadCapacity: S.optional(S.Number),
    TireCount: S.optional(S.Number),
    Trailer: S.optional(IsolineTrailerOptions),
    TruckType: S.optional(S.String),
    TunnelRestrictionCode: S.optional(SensitiveString),
    WeightPerAxle: S.optional(S.Number),
    WeightPerAxleGroup: S.optional(WeightPerAxleGroup),
    Width: S.optional(S.Number),
  }),
).annotate({
  identifier: "IsolineTruckOptions",
}) as any as S.Schema<IsolineTruckOptions>;
export interface IsolineTravelModeOptions {
  Car?: IsolineCarOptions;
  Scooter?: IsolineScooterOptions;
  Truck?: IsolineTruckOptions;
}
export const IsolineTravelModeOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Car: S.optional(IsolineCarOptions),
      Scooter: S.optional(IsolineScooterOptions),
      Truck: S.optional(IsolineTruckOptions),
    }),
).annotate({
  identifier: "IsolineTravelModeOptions",
}) as any as S.Schema<IsolineTravelModeOptions>;
export interface CalculateIsolinesRequest {
  Allow?: IsolineAllowOptions;
  ArrivalTime?: string | redacted.Redacted<string>;
  Avoid?: IsolineAvoidanceOptions;
  DepartNow?: boolean;
  DepartureTime?: string | redacted.Redacted<string>;
  Destination?: number[];
  DestinationOptions?: IsolineDestinationOptions;
  IsolineGeometryFormat?: string;
  IsolineGranularity?: IsolineGranularityOptions;
  Key?: string | redacted.Redacted<string>;
  OptimizeIsolineFor?: string;
  OptimizeRoutingFor?: string;
  Origin?: number[];
  OriginOptions?: IsolineOriginOptions;
  Thresholds: IsolineThresholds;
  Traffic?: IsolineTrafficOptions;
  TravelMode?: string;
  TravelModeOptions?: IsolineTravelModeOptions;
}
export const CalculateIsolinesRequest = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Allow: S.optional(IsolineAllowOptions),
      ArrivalTime: S.optional(SensitiveString),
      Avoid: S.optional(IsolineAvoidanceOptions),
      DepartNow: S.optional(S.Boolean),
      DepartureTime: S.optional(SensitiveString),
      Destination: S.optional(Position),
      DestinationOptions: S.optional(IsolineDestinationOptions),
      IsolineGeometryFormat: S.optional(S.String),
      IsolineGranularity: S.optional(IsolineGranularityOptions),
      Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
      OptimizeIsolineFor: S.optional(S.String),
      OptimizeRoutingFor: S.optional(S.String),
      Origin: S.optional(Position),
      OriginOptions: S.optional(IsolineOriginOptions),
      Thresholds: IsolineThresholds,
      Traffic: S.optional(IsolineTrafficOptions),
      TravelMode: S.optional(S.String),
      TravelModeOptions: S.optional(IsolineTravelModeOptions),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/isolines" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CalculateIsolinesRequest",
}) as any as S.Schema<CalculateIsolinesRequest>;
export interface IsolineConnectionGeometry {
  LineString?: number[][];
  Polyline?: string | redacted.Redacted<string>;
}
export const IsolineConnectionGeometry = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      LineString: S.optional(LineString),
      Polyline: S.optional(SensitiveString),
    }),
).annotate({
  identifier: "IsolineConnectionGeometry",
}) as any as S.Schema<IsolineConnectionGeometry>;
export interface IsolineConnection {
  FromPolygonIndex: number;
  Geometry: IsolineConnectionGeometry;
  ToPolygonIndex: number;
}
export const IsolineConnection = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    FromPolygonIndex: S.Number,
    Geometry: IsolineConnectionGeometry,
    ToPolygonIndex: S.Number,
  }),
).annotate({
  identifier: "IsolineConnection",
}) as any as S.Schema<IsolineConnection>;
export type IsolineConnectionList = IsolineConnection[];
export const IsolineConnectionList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(IsolineConnection);
export interface IsolineShapeGeometry {
  Polygon?: number[][][];
  PolylinePolygon?: string | redacted.Redacted<string>[];
}
export const IsolineShapeGeometry = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    Polygon: S.optional(LinearRings),
    PolylinePolygon: S.optional(PolylineRingList),
  }),
).annotate({
  identifier: "IsolineShapeGeometry",
}) as any as S.Schema<IsolineShapeGeometry>;
export type IsolineShapeGeometryList = IsolineShapeGeometry[];
export const IsolineShapeGeometryList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(IsolineShapeGeometry);
export interface Isoline {
  Connections: IsolineConnection[];
  DistanceThreshold?: number;
  Geometries: IsolineShapeGeometry[];
  TimeThreshold?: number;
}
export const Isoline = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    Connections: IsolineConnectionList,
    DistanceThreshold: S.optional(S.Number),
    Geometries: IsolineShapeGeometryList,
    TimeThreshold: S.optional(S.Number),
  }),
).annotate({ identifier: "Isoline" }) as any as S.Schema<Isoline>;
export type IsolineList = Isoline[];
export const IsolineList = /*@__PURE__*/ /*#__PURE__*/ S.Array(Isoline);
export interface CalculateIsolinesResponse {
  ArrivalTime?: string | redacted.Redacted<string>;
  DepartureTime?: string | redacted.Redacted<string>;
  IsolineGeometryFormat: string;
  Isolines: Isoline[];
  PricingBucket: string;
  SnappedDestination?: number[];
  SnappedOrigin?: number[];
}
export const CalculateIsolinesResponse = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ArrivalTime: S.optional(SensitiveString),
      DepartureTime: S.optional(SensitiveString),
      IsolineGeometryFormat: S.String,
      Isolines: IsolineList,
      PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
      SnappedDestination: S.optional(Position),
      SnappedOrigin: S.optional(Position),
    }),
).annotate({
  identifier: "CalculateIsolinesResponse",
}) as any as S.Schema<CalculateIsolinesResponse>;
export interface ValidationExceptionField {
  Name: string;
  Message: string;
}
export const ValidationExceptionField = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({ Name: S.String, Message: S.String }).pipe(
      S.encodeKeys({ Name: "name", Message: "message" }),
    ),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = /*@__PURE__*/ /*#__PURE__*/ S.Array(
  ValidationExceptionField,
);
export interface RouteMatrixAllowOptions {
  Hot?: boolean;
  Hov?: boolean;
}
export const RouteMatrixAllowOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () => S.Struct({ Hot: S.optional(S.Boolean), Hov: S.optional(S.Boolean) }),
).annotate({
  identifier: "RouteMatrixAllowOptions",
}) as any as S.Schema<RouteMatrixAllowOptions>;
export interface RouteMatrixAvoidanceAreaGeometry {
  BoundingBox?: number[];
  Polygon?: number[][][];
  PolylinePolygon?: string | redacted.Redacted<string>[];
}
export const RouteMatrixAvoidanceAreaGeometry =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      BoundingBox: S.optional(BoundingBox),
      Polygon: S.optional(LinearRings),
      PolylinePolygon: S.optional(PolylineRingList),
    }),
  ).annotate({
    identifier: "RouteMatrixAvoidanceAreaGeometry",
  }) as any as S.Schema<RouteMatrixAvoidanceAreaGeometry>;
export interface RouteMatrixAvoidanceArea {
  Geometry: RouteMatrixAvoidanceAreaGeometry;
}
export const RouteMatrixAvoidanceArea = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () => S.Struct({ Geometry: RouteMatrixAvoidanceAreaGeometry }),
).annotate({
  identifier: "RouteMatrixAvoidanceArea",
}) as any as S.Schema<RouteMatrixAvoidanceArea>;
export type RouteMatrixAvoidanceAreaList = RouteMatrixAvoidanceArea[];
export const RouteMatrixAvoidanceAreaList = /*@__PURE__*/ /*#__PURE__*/ S.Array(
  RouteMatrixAvoidanceArea,
);
export interface RouteMatrixAvoidanceZoneCategory {
  Category?: string | redacted.Redacted<string>;
}
export const RouteMatrixAvoidanceZoneCategory =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({ Category: S.optional(SensitiveString) }),
  ).annotate({
    identifier: "RouteMatrixAvoidanceZoneCategory",
  }) as any as S.Schema<RouteMatrixAvoidanceZoneCategory>;
export type RouteMatrixAvoidanceZoneCategoryList =
  RouteMatrixAvoidanceZoneCategory[];
export const RouteMatrixAvoidanceZoneCategoryList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(RouteMatrixAvoidanceZoneCategory);
export interface RouteMatrixAvoidanceOptions {
  Areas?: RouteMatrixAvoidanceArea[];
  CarShuttleTrains?: boolean;
  ControlledAccessHighways?: boolean;
  DirtRoads?: boolean;
  Ferries?: boolean;
  TollRoads?: boolean;
  TollTransponders?: boolean;
  TruckRoadTypes?: string | redacted.Redacted<string>[];
  Tunnels?: boolean;
  UTurns?: boolean;
  ZoneCategories?: RouteMatrixAvoidanceZoneCategory[];
}
export const RouteMatrixAvoidanceOptions =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      Areas: S.optional(RouteMatrixAvoidanceAreaList),
      CarShuttleTrains: S.optional(S.Boolean),
      ControlledAccessHighways: S.optional(S.Boolean),
      DirtRoads: S.optional(S.Boolean),
      Ferries: S.optional(S.Boolean),
      TollRoads: S.optional(S.Boolean),
      TollTransponders: S.optional(S.Boolean),
      TruckRoadTypes: S.optional(TruckRoadTypeList),
      Tunnels: S.optional(S.Boolean),
      UTurns: S.optional(S.Boolean),
      ZoneCategories: S.optional(RouteMatrixAvoidanceZoneCategoryList),
    }),
  ).annotate({
    identifier: "RouteMatrixAvoidanceOptions",
  }) as any as S.Schema<RouteMatrixAvoidanceOptions>;
export interface RouteMatrixMatchingOptions {
  NameHint?: string | redacted.Redacted<string>;
  OnRoadThreshold?: number;
  Radius?: number;
  Strategy?: string;
}
export const RouteMatrixMatchingOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      NameHint: S.optional(SensitiveString),
      OnRoadThreshold: S.optional(S.Number),
      Radius: S.optional(S.Number),
      Strategy: S.optional(S.String),
    }),
).annotate({
  identifier: "RouteMatrixMatchingOptions",
}) as any as S.Schema<RouteMatrixMatchingOptions>;
export interface RouteMatrixSideOfStreetOptions {
  Position: number[];
  UseWith?: string;
}
export const RouteMatrixSideOfStreetOptions =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({ Position: Position, UseWith: S.optional(S.String) }),
  ).annotate({
    identifier: "RouteMatrixSideOfStreetOptions",
  }) as any as S.Schema<RouteMatrixSideOfStreetOptions>;
export interface RouteMatrixDestinationOptions {
  AvoidActionsForDistance?: number;
  Heading?: number;
  Matching?: RouteMatrixMatchingOptions;
  SideOfStreet?: RouteMatrixSideOfStreetOptions;
}
export const RouteMatrixDestinationOptions =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      AvoidActionsForDistance: S.optional(S.Number),
      Heading: S.optional(S.Number),
      Matching: S.optional(RouteMatrixMatchingOptions),
      SideOfStreet: S.optional(RouteMatrixSideOfStreetOptions),
    }),
  ).annotate({
    identifier: "RouteMatrixDestinationOptions",
  }) as any as S.Schema<RouteMatrixDestinationOptions>;
export interface RouteMatrixDestination {
  Options?: RouteMatrixDestinationOptions;
  Position: number[];
}
export const RouteMatrixDestination = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Options: S.optional(RouteMatrixDestinationOptions),
      Position: Position,
    }),
).annotate({
  identifier: "RouteMatrixDestination",
}) as any as S.Schema<RouteMatrixDestination>;
export type RouteMatrixDestinationList = RouteMatrixDestination[];
export const RouteMatrixDestinationList = /*@__PURE__*/ /*#__PURE__*/ S.Array(
  RouteMatrixDestination,
);
export type CountryCodeList = string | redacted.Redacted<string>[];
export const CountryCodeList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(SensitiveString);
export interface RouteMatrixExclusionOptions {
  Countries: string | redacted.Redacted<string>[];
}
export const RouteMatrixExclusionOptions =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({ Countries: CountryCodeList }),
  ).annotate({
    identifier: "RouteMatrixExclusionOptions",
  }) as any as S.Schema<RouteMatrixExclusionOptions>;
export interface RouteMatrixOriginOptions {
  AvoidActionsForDistance?: number;
  Heading?: number;
  Matching?: RouteMatrixMatchingOptions;
  SideOfStreet?: RouteMatrixSideOfStreetOptions;
}
export const RouteMatrixOriginOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AvoidActionsForDistance: S.optional(S.Number),
      Heading: S.optional(S.Number),
      Matching: S.optional(RouteMatrixMatchingOptions),
      SideOfStreet: S.optional(RouteMatrixSideOfStreetOptions),
    }),
).annotate({
  identifier: "RouteMatrixOriginOptions",
}) as any as S.Schema<RouteMatrixOriginOptions>;
export interface RouteMatrixOrigin {
  Options?: RouteMatrixOriginOptions;
  Position: number[];
}
export const RouteMatrixOrigin = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    Options: S.optional(RouteMatrixOriginOptions),
    Position: Position,
  }),
).annotate({
  identifier: "RouteMatrixOrigin",
}) as any as S.Schema<RouteMatrixOrigin>;
export type RouteMatrixOriginList = RouteMatrixOrigin[];
export const RouteMatrixOriginList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(RouteMatrixOrigin);
export interface RouteMatrixAutoCircle {
  Margin?: number;
  MaxRadius?: number;
}
export const RouteMatrixAutoCircle = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({ Margin: S.optional(S.Number), MaxRadius: S.optional(S.Number) }),
).annotate({
  identifier: "RouteMatrixAutoCircle",
}) as any as S.Schema<RouteMatrixAutoCircle>;
export interface Circle {
  Center: number[];
  Radius: number;
}
export const Circle = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({ Center: Position, Radius: S.Number }),
).annotate({ identifier: "Circle" }) as any as S.Schema<Circle>;
export interface RouteMatrixBoundaryGeometry {
  AutoCircle?: RouteMatrixAutoCircle;
  Circle?: Circle;
  BoundingBox?: number[];
  Polygon?: number[][][];
}
export const RouteMatrixBoundaryGeometry =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      AutoCircle: S.optional(RouteMatrixAutoCircle),
      Circle: S.optional(Circle),
      BoundingBox: S.optional(BoundingBox),
      Polygon: S.optional(LinearRings),
    }),
  ).annotate({
    identifier: "RouteMatrixBoundaryGeometry",
  }) as any as S.Schema<RouteMatrixBoundaryGeometry>;
export interface RouteMatrixBoundary {
  Geometry?: RouteMatrixBoundaryGeometry;
  Unbounded?: boolean;
}
export const RouteMatrixBoundary = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    Geometry: S.optional(RouteMatrixBoundaryGeometry),
    Unbounded: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "RouteMatrixBoundary",
}) as any as S.Schema<RouteMatrixBoundary>;
export interface RouteMatrixTrafficOptions {
  FlowEventThresholdOverride?: number;
  Usage?: string;
}
export const RouteMatrixTrafficOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      FlowEventThresholdOverride: S.optional(S.Number),
      Usage: S.optional(S.String),
    }),
).annotate({
  identifier: "RouteMatrixTrafficOptions",
}) as any as S.Schema<RouteMatrixTrafficOptions>;
export interface RouteMatrixVehicleLicensePlate {
  LastCharacter?: string;
}
export const RouteMatrixVehicleLicensePlate =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({ LastCharacter: S.optional(S.String) }),
  ).annotate({
    identifier: "RouteMatrixVehicleLicensePlate",
  }) as any as S.Schema<RouteMatrixVehicleLicensePlate>;
export interface RouteMatrixCarOptions {
  LicensePlate?: RouteMatrixVehicleLicensePlate;
  MaxSpeed?: number;
  Occupancy?: number;
}
export const RouteMatrixCarOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    LicensePlate: S.optional(RouteMatrixVehicleLicensePlate),
    MaxSpeed: S.optional(S.Number),
    Occupancy: S.optional(S.Number),
  }),
).annotate({
  identifier: "RouteMatrixCarOptions",
}) as any as S.Schema<RouteMatrixCarOptions>;
export interface RouteMatrixScooterOptions {
  LicensePlate?: RouteMatrixVehicleLicensePlate;
  MaxSpeed?: number;
  Occupancy?: number;
}
export const RouteMatrixScooterOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      LicensePlate: S.optional(RouteMatrixVehicleLicensePlate),
      MaxSpeed: S.optional(S.Number),
      Occupancy: S.optional(S.Number),
    }),
).annotate({
  identifier: "RouteMatrixScooterOptions",
}) as any as S.Schema<RouteMatrixScooterOptions>;
export type RouteMatrixHazardousCargoTypeList =
  | string
  | redacted.Redacted<string>[];
export const RouteMatrixHazardousCargoTypeList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(SensitiveString);
export interface RouteMatrixTrailerOptions {
  TrailerCount?: number;
}
export const RouteMatrixTrailerOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () => S.Struct({ TrailerCount: S.optional(S.Number) }),
).annotate({
  identifier: "RouteMatrixTrailerOptions",
}) as any as S.Schema<RouteMatrixTrailerOptions>;
export interface RouteMatrixTruckOptions {
  AxleCount?: number;
  GrossWeight?: number;
  HazardousCargos?: string | redacted.Redacted<string>[];
  Height?: number;
  KpraLength?: number;
  Length?: number;
  LicensePlate?: RouteMatrixVehicleLicensePlate;
  MaxSpeed?: number;
  Occupancy?: number;
  PayloadCapacity?: number;
  Trailer?: RouteMatrixTrailerOptions;
  TruckType?: string | redacted.Redacted<string>;
  TunnelRestrictionCode?: string | redacted.Redacted<string>;
  WeightPerAxle?: number;
  WeightPerAxleGroup?: WeightPerAxleGroup;
  Width?: number;
}
export const RouteMatrixTruckOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AxleCount: S.optional(S.Number),
      GrossWeight: S.optional(S.Number),
      HazardousCargos: S.optional(RouteMatrixHazardousCargoTypeList),
      Height: S.optional(S.Number),
      KpraLength: S.optional(S.Number),
      Length: S.optional(S.Number),
      LicensePlate: S.optional(RouteMatrixVehicleLicensePlate),
      MaxSpeed: S.optional(S.Number),
      Occupancy: S.optional(S.Number),
      PayloadCapacity: S.optional(S.Number),
      Trailer: S.optional(RouteMatrixTrailerOptions),
      TruckType: S.optional(SensitiveString),
      TunnelRestrictionCode: S.optional(SensitiveString),
      WeightPerAxle: S.optional(S.Number),
      WeightPerAxleGroup: S.optional(WeightPerAxleGroup),
      Width: S.optional(S.Number),
    }),
).annotate({
  identifier: "RouteMatrixTruckOptions",
}) as any as S.Schema<RouteMatrixTruckOptions>;
export interface RouteMatrixTravelModeOptions {
  Car?: RouteMatrixCarOptions;
  Scooter?: RouteMatrixScooterOptions;
  Truck?: RouteMatrixTruckOptions;
}
export const RouteMatrixTravelModeOptions =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      Car: S.optional(RouteMatrixCarOptions),
      Scooter: S.optional(RouteMatrixScooterOptions),
      Truck: S.optional(RouteMatrixTruckOptions),
    }),
  ).annotate({
    identifier: "RouteMatrixTravelModeOptions",
  }) as any as S.Schema<RouteMatrixTravelModeOptions>;
export interface CalculateRouteMatrixRequest {
  Allow?: RouteMatrixAllowOptions;
  Avoid?: RouteMatrixAvoidanceOptions;
  DepartNow?: boolean;
  DepartureTime?: string | redacted.Redacted<string>;
  Destinations: RouteMatrixDestination[];
  Exclude?: RouteMatrixExclusionOptions;
  Key?: string | redacted.Redacted<string>;
  OptimizeRoutingFor?: string;
  Origins: RouteMatrixOrigin[];
  RoutingBoundary: RouteMatrixBoundary;
  Traffic?: RouteMatrixTrafficOptions;
  TravelMode?: string;
  TravelModeOptions?: RouteMatrixTravelModeOptions;
}
export const CalculateRouteMatrixRequest =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      Allow: S.optional(RouteMatrixAllowOptions),
      Avoid: S.optional(RouteMatrixAvoidanceOptions),
      DepartNow: S.optional(S.Boolean),
      DepartureTime: S.optional(SensitiveString),
      Destinations: RouteMatrixDestinationList,
      Exclude: S.optional(RouteMatrixExclusionOptions),
      Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
      OptimizeRoutingFor: S.optional(S.String),
      Origins: RouteMatrixOriginList,
      RoutingBoundary: RouteMatrixBoundary,
      Traffic: S.optional(RouteMatrixTrafficOptions),
      TravelMode: S.optional(S.String),
      TravelModeOptions: S.optional(RouteMatrixTravelModeOptions),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/route-matrix" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "CalculateRouteMatrixRequest",
  }) as any as S.Schema<CalculateRouteMatrixRequest>;
export interface RouteMatrixEntry {
  Distance: number;
  Duration: number;
  Error?: string;
}
export const RouteMatrixEntry = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    Distance: S.Number,
    Duration: S.Number,
    Error: S.optional(S.String),
  }),
).annotate({
  identifier: "RouteMatrixEntry",
}) as any as S.Schema<RouteMatrixEntry>;
export type RouteMatrixRow = RouteMatrixEntry[];
export const RouteMatrixRow =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(RouteMatrixEntry);
export type RouteMatrix = RouteMatrixEntry[][];
export const RouteMatrix = /*@__PURE__*/ /*#__PURE__*/ S.Array(RouteMatrixRow);
export interface CalculateRouteMatrixResponse {
  ErrorCount: number;
  PricingBucket: string;
  RouteMatrix: RouteMatrixEntry[][];
  RoutingBoundary: RouteMatrixBoundary;
}
export const CalculateRouteMatrixResponse =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      ErrorCount: S.Number,
      PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
      RouteMatrix: RouteMatrix,
      RoutingBoundary: RouteMatrixBoundary,
    }),
  ).annotate({
    identifier: "CalculateRouteMatrixResponse",
  }) as any as S.Schema<CalculateRouteMatrixResponse>;
export interface RouteAllowOptions {
  Hot?: boolean;
  Hov?: boolean;
}
export const RouteAllowOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({ Hot: S.optional(S.Boolean), Hov: S.optional(S.Boolean) }),
).annotate({
  identifier: "RouteAllowOptions",
}) as any as S.Schema<RouteAllowOptions>;
export interface RouteAvoidanceAreaGeometry {
  Corridor?: Corridor;
  BoundingBox?: number[];
  Polygon?: number[][][];
  PolylineCorridor?: PolylineCorridor;
  PolylinePolygon?: string | redacted.Redacted<string>[];
}
export const RouteAvoidanceAreaGeometry = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Corridor: S.optional(Corridor),
      BoundingBox: S.optional(BoundingBox),
      Polygon: S.optional(LinearRings),
      PolylineCorridor: S.optional(PolylineCorridor),
      PolylinePolygon: S.optional(PolylineRingList),
    }),
).annotate({
  identifier: "RouteAvoidanceAreaGeometry",
}) as any as S.Schema<RouteAvoidanceAreaGeometry>;
export type RouteAvoidanceAreaGeometryList = RouteAvoidanceAreaGeometry[];
export const RouteAvoidanceAreaGeometryList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(RouteAvoidanceAreaGeometry);
export interface RouteAvoidanceArea {
  Except?: RouteAvoidanceAreaGeometry[];
  Geometry: RouteAvoidanceAreaGeometry;
}
export const RouteAvoidanceArea = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    Except: S.optional(RouteAvoidanceAreaGeometryList),
    Geometry: RouteAvoidanceAreaGeometry,
  }),
).annotate({
  identifier: "RouteAvoidanceArea",
}) as any as S.Schema<RouteAvoidanceArea>;
export type RouteAvoidanceAreaList = RouteAvoidanceArea[];
export const RouteAvoidanceAreaList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(RouteAvoidanceArea);
export interface RouteAvoidanceZoneCategory {
  Category: string | redacted.Redacted<string>;
}
export const RouteAvoidanceZoneCategory = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () => S.Struct({ Category: SensitiveString }),
).annotate({
  identifier: "RouteAvoidanceZoneCategory",
}) as any as S.Schema<RouteAvoidanceZoneCategory>;
export type RouteAvoidanceZoneCategoryList = RouteAvoidanceZoneCategory[];
export const RouteAvoidanceZoneCategoryList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(RouteAvoidanceZoneCategory);
export interface RouteAvoidanceOptions {
  Areas?: RouteAvoidanceArea[];
  CarShuttleTrains?: boolean;
  ControlledAccessHighways?: boolean;
  DirtRoads?: boolean;
  Ferries?: boolean;
  SeasonalClosure?: boolean;
  TollRoads?: boolean;
  TollTransponders?: boolean;
  TruckRoadTypes?: string | redacted.Redacted<string>[];
  Tunnels?: boolean;
  UTurns?: boolean;
  ZoneCategories?: RouteAvoidanceZoneCategory[];
}
export const RouteAvoidanceOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    Areas: S.optional(RouteAvoidanceAreaList),
    CarShuttleTrains: S.optional(S.Boolean),
    ControlledAccessHighways: S.optional(S.Boolean),
    DirtRoads: S.optional(S.Boolean),
    Ferries: S.optional(S.Boolean),
    SeasonalClosure: S.optional(S.Boolean),
    TollRoads: S.optional(S.Boolean),
    TollTransponders: S.optional(S.Boolean),
    TruckRoadTypes: S.optional(TruckRoadTypeList),
    Tunnels: S.optional(S.Boolean),
    UTurns: S.optional(S.Boolean),
    ZoneCategories: S.optional(RouteAvoidanceZoneCategoryList),
  }),
).annotate({
  identifier: "RouteAvoidanceOptions",
}) as any as S.Schema<RouteAvoidanceOptions>;
export interface RouteMatchingOptions {
  NameHint?: string | redacted.Redacted<string>;
  OnRoadThreshold?: number;
  Radius?: number;
  Strategy?: string;
}
export const RouteMatchingOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    NameHint: S.optional(SensitiveString),
    OnRoadThreshold: S.optional(S.Number),
    Radius: S.optional(S.Number),
    Strategy: S.optional(S.String),
  }),
).annotate({
  identifier: "RouteMatchingOptions",
}) as any as S.Schema<RouteMatchingOptions>;
export interface RouteSideOfStreetOptions {
  Position: number[];
  UseWith?: string;
}
export const RouteSideOfStreetOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () => S.Struct({ Position: Position, UseWith: S.optional(S.String) }),
).annotate({
  identifier: "RouteSideOfStreetOptions",
}) as any as S.Schema<RouteSideOfStreetOptions>;
export interface RouteDestinationOptions {
  AvoidActionsForDistance?: number;
  AvoidUTurns?: boolean;
  Heading?: number;
  Matching?: RouteMatchingOptions;
  SideOfStreet?: RouteSideOfStreetOptions;
  StopDuration?: number;
}
export const RouteDestinationOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AvoidActionsForDistance: S.optional(S.Number),
      AvoidUTurns: S.optional(S.Boolean),
      Heading: S.optional(S.Number),
      Matching: S.optional(RouteMatchingOptions),
      SideOfStreet: S.optional(RouteSideOfStreetOptions),
      StopDuration: S.optional(S.Number),
    }),
).annotate({
  identifier: "RouteDestinationOptions",
}) as any as S.Schema<RouteDestinationOptions>;
export interface RouteDriverScheduleInterval {
  DriveDuration: number;
  RestDuration: number;
}
export const RouteDriverScheduleInterval =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({ DriveDuration: S.Number, RestDuration: S.Number }),
  ).annotate({
    identifier: "RouteDriverScheduleInterval",
  }) as any as S.Schema<RouteDriverScheduleInterval>;
export type RouteDriverScheduleIntervalList = RouteDriverScheduleInterval[];
export const RouteDriverScheduleIntervalList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(RouteDriverScheduleInterval);
export interface RouteDriverOptions {
  Schedule?: RouteDriverScheduleInterval[];
}
export const RouteDriverOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({ Schedule: S.optional(RouteDriverScheduleIntervalList) }),
).annotate({
  identifier: "RouteDriverOptions",
}) as any as S.Schema<RouteDriverOptions>;
export interface RouteExclusionOptions {
  Countries: string | redacted.Redacted<string>[];
}
export const RouteExclusionOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({ Countries: CountryCodeList }),
).annotate({
  identifier: "RouteExclusionOptions",
}) as any as S.Schema<RouteExclusionOptions>;
export type LanguageTagList = string[];
export const LanguageTagList = /*@__PURE__*/ /*#__PURE__*/ S.Array(S.String);
export type RouteLegAdditionalFeatureList =
  | string
  | redacted.Redacted<string>[];
export const RouteLegAdditionalFeatureList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(SensitiveString);
export interface RouteOriginOptions {
  AvoidActionsForDistance?: number;
  AvoidUTurns?: boolean;
  Heading?: number;
  Matching?: RouteMatchingOptions;
  SideOfStreet?: RouteSideOfStreetOptions;
}
export const RouteOriginOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    AvoidActionsForDistance: S.optional(S.Number),
    AvoidUTurns: S.optional(S.Boolean),
    Heading: S.optional(S.Number),
    Matching: S.optional(RouteMatchingOptions),
    SideOfStreet: S.optional(RouteSideOfStreetOptions),
  }),
).annotate({
  identifier: "RouteOriginOptions",
}) as any as S.Schema<RouteOriginOptions>;
export type RouteSpanAdditionalFeatureList = string[];
export const RouteSpanAdditionalFeatureList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(S.String);
export interface RouteEmissionType {
  Co2EmissionClass?: string | redacted.Redacted<string>;
  Type: string | redacted.Redacted<string>;
}
export const RouteEmissionType = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    Co2EmissionClass: S.optional(SensitiveString),
    Type: SensitiveString,
  }),
).annotate({
  identifier: "RouteEmissionType",
}) as any as S.Schema<RouteEmissionType>;
export interface RouteTollOptions {
  AllTransponders?: boolean;
  AllVignettes?: boolean;
  Currency?: string;
  EmissionType?: RouteEmissionType;
  VehicleCategory?: string | redacted.Redacted<string>;
}
export const RouteTollOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    AllTransponders: S.optional(S.Boolean),
    AllVignettes: S.optional(S.Boolean),
    Currency: S.optional(S.String),
    EmissionType: S.optional(RouteEmissionType),
    VehicleCategory: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "RouteTollOptions",
}) as any as S.Schema<RouteTollOptions>;
export interface RouteTrafficOptions {
  FlowEventThresholdOverride?: number;
  Usage?: string;
}
export const RouteTrafficOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    FlowEventThresholdOverride: S.optional(S.Number),
    Usage: S.optional(S.String),
  }),
).annotate({
  identifier: "RouteTrafficOptions",
}) as any as S.Schema<RouteTrafficOptions>;
export interface RouteVehicleLicensePlate {
  LastCharacter?: string | redacted.Redacted<string>;
}
export const RouteVehicleLicensePlate = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () => S.Struct({ LastCharacter: S.optional(SensitiveString) }),
).annotate({
  identifier: "RouteVehicleLicensePlate",
}) as any as S.Schema<RouteVehicleLicensePlate>;
export interface RouteCarOptions {
  EngineType?: string | redacted.Redacted<string>;
  LicensePlate?: RouteVehicleLicensePlate;
  MaxSpeed?: number;
  Occupancy?: number;
}
export const RouteCarOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    EngineType: S.optional(SensitiveString),
    LicensePlate: S.optional(RouteVehicleLicensePlate),
    MaxSpeed: S.optional(S.Number),
    Occupancy: S.optional(S.Number),
  }),
).annotate({
  identifier: "RouteCarOptions",
}) as any as S.Schema<RouteCarOptions>;
export interface RoutePedestrianOptions {
  Speed?: number;
}
export const RoutePedestrianOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () => S.Struct({ Speed: S.optional(S.Number) }),
).annotate({
  identifier: "RoutePedestrianOptions",
}) as any as S.Schema<RoutePedestrianOptions>;
export interface RouteScooterOptions {
  EngineType?: string | redacted.Redacted<string>;
  LicensePlate?: RouteVehicleLicensePlate;
  MaxSpeed?: number;
  Occupancy?: number;
}
export const RouteScooterOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    EngineType: S.optional(SensitiveString),
    LicensePlate: S.optional(RouteVehicleLicensePlate),
    MaxSpeed: S.optional(S.Number),
    Occupancy: S.optional(S.Number),
  }),
).annotate({
  identifier: "RouteScooterOptions",
}) as any as S.Schema<RouteScooterOptions>;
export type RouteHazardousCargoTypeList = string | redacted.Redacted<string>[];
export const RouteHazardousCargoTypeList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(SensitiveString);
export interface RouteTrailerOptions {
  AxleCount?: number;
  TrailerCount?: number;
}
export const RouteTrailerOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    AxleCount: S.optional(S.Number),
    TrailerCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "RouteTrailerOptions",
}) as any as S.Schema<RouteTrailerOptions>;
export interface RouteTruckOptions {
  AxleCount?: number;
  EngineType?: string | redacted.Redacted<string>;
  GrossWeight?: number;
  HazardousCargos?: string | redacted.Redacted<string>[];
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
  TruckType?: string | redacted.Redacted<string>;
  TunnelRestrictionCode?: string | redacted.Redacted<string>;
  WeightPerAxle?: number;
  WeightPerAxleGroup?: WeightPerAxleGroup;
  Width?: number;
}
export const RouteTruckOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    AxleCount: S.optional(S.Number),
    EngineType: S.optional(SensitiveString),
    GrossWeight: S.optional(S.Number),
    HazardousCargos: S.optional(RouteHazardousCargoTypeList),
    Height: S.optional(S.Number),
    HeightAboveFirstAxle: S.optional(S.Number),
    KpraLength: S.optional(S.Number),
    Length: S.optional(S.Number),
    LicensePlate: S.optional(RouteVehicleLicensePlate),
    MaxSpeed: S.optional(S.Number),
    Occupancy: S.optional(S.Number),
    PayloadCapacity: S.optional(S.Number),
    TireCount: S.optional(S.Number),
    Trailer: S.optional(RouteTrailerOptions),
    TruckType: S.optional(SensitiveString),
    TunnelRestrictionCode: S.optional(SensitiveString),
    WeightPerAxle: S.optional(S.Number),
    WeightPerAxleGroup: S.optional(WeightPerAxleGroup),
    Width: S.optional(S.Number),
  }),
).annotate({
  identifier: "RouteTruckOptions",
}) as any as S.Schema<RouteTruckOptions>;
export interface RouteTravelModeOptions {
  Car?: RouteCarOptions;
  Pedestrian?: RoutePedestrianOptions;
  Scooter?: RouteScooterOptions;
  Truck?: RouteTruckOptions;
}
export const RouteTravelModeOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Car: S.optional(RouteCarOptions),
      Pedestrian: S.optional(RoutePedestrianOptions),
      Scooter: S.optional(RouteScooterOptions),
      Truck: S.optional(RouteTruckOptions),
    }),
).annotate({
  identifier: "RouteTravelModeOptions",
}) as any as S.Schema<RouteTravelModeOptions>;
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
export const RouteWaypoint = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    AvoidActionsForDistance: S.optional(S.Number),
    AvoidUTurns: S.optional(S.Boolean),
    Heading: S.optional(S.Number),
    Matching: S.optional(RouteMatchingOptions),
    PassThrough: S.optional(S.Boolean),
    Position: Position,
    SideOfStreet: S.optional(RouteSideOfStreetOptions),
    StopDuration: S.optional(S.Number),
  }),
).annotate({ identifier: "RouteWaypoint" }) as any as S.Schema<RouteWaypoint>;
export type RouteWaypointList = RouteWaypoint[];
export const RouteWaypointList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(RouteWaypoint);
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
  InstructionsMeasurementSystem?: string;
  Key?: string | redacted.Redacted<string>;
  Languages?: string[];
  LegAdditionalFeatures?: string | redacted.Redacted<string>[];
  LegGeometryFormat?: string;
  MaxAlternatives?: number;
  OptimizeRoutingFor?: string;
  Origin: number[];
  OriginOptions?: RouteOriginOptions;
  SpanAdditionalFeatures?: string[];
  Tolls?: RouteTollOptions;
  Traffic?: RouteTrafficOptions;
  TravelMode?: string;
  TravelModeOptions?: RouteTravelModeOptions;
  TravelStepType?: string;
  Waypoints?: RouteWaypoint[];
}
export const CalculateRoutesRequest = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Allow: S.optional(RouteAllowOptions),
      ArrivalTime: S.optional(SensitiveString),
      Avoid: S.optional(RouteAvoidanceOptions),
      DepartNow: S.optional(S.Boolean),
      DepartureTime: S.optional(SensitiveString),
      Destination: Position,
      DestinationOptions: S.optional(RouteDestinationOptions),
      Driver: S.optional(RouteDriverOptions),
      Exclude: S.optional(RouteExclusionOptions),
      InstructionsMeasurementSystem: S.optional(S.String),
      Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
      Languages: S.optional(LanguageTagList),
      LegAdditionalFeatures: S.optional(RouteLegAdditionalFeatureList),
      LegGeometryFormat: S.optional(S.String),
      MaxAlternatives: S.optional(S.Number),
      OptimizeRoutingFor: S.optional(S.String),
      Origin: Position,
      OriginOptions: S.optional(RouteOriginOptions),
      SpanAdditionalFeatures: S.optional(RouteSpanAdditionalFeatureList),
      Tolls: S.optional(RouteTollOptions),
      Traffic: S.optional(RouteTrafficOptions),
      TravelMode: S.optional(S.String),
      TravelModeOptions: S.optional(RouteTravelModeOptions),
      TravelStepType: S.optional(S.String),
      Waypoints: S.optional(RouteWaypointList),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/routes" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CalculateRoutesRequest",
}) as any as S.Schema<CalculateRoutesRequest>;
export interface RouteResponseNotice {
  Code: string;
  Impact?: string;
}
export const RouteResponseNotice = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({ Code: S.String, Impact: S.optional(S.String) }),
).annotate({
  identifier: "RouteResponseNotice",
}) as any as S.Schema<RouteResponseNotice>;
export type RouteResponseNoticeList = RouteResponseNotice[];
export const RouteResponseNoticeList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(RouteResponseNotice);
export interface RouteFerryAfterTravelStep {
  Duration: number;
  Instruction?: string | redacted.Redacted<string>;
  Type: string | redacted.Redacted<string>;
}
export const RouteFerryAfterTravelStep = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Duration: S.Number,
      Instruction: S.optional(SensitiveString),
      Type: SensitiveString,
    }),
).annotate({
  identifier: "RouteFerryAfterTravelStep",
}) as any as S.Schema<RouteFerryAfterTravelStep>;
export type RouteFerryAfterTravelStepList = RouteFerryAfterTravelStep[];
export const RouteFerryAfterTravelStepList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(RouteFerryAfterTravelStep);
export type Position23 = number[];
export const Position23 = /*@__PURE__*/ /*#__PURE__*/ S.Array(S.Number);
export interface RouteFerryPlace {
  Name?: string | redacted.Redacted<string>;
  OriginalPosition?: number[];
  Position: number[];
  WaypointIndex?: number;
}
export const RouteFerryPlace = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(SensitiveString),
    OriginalPosition: S.optional(Position23),
    Position: Position23,
    WaypointIndex: S.optional(S.Number),
  }),
).annotate({
  identifier: "RouteFerryPlace",
}) as any as S.Schema<RouteFerryPlace>;
export interface RouteFerryArrival {
  Place: RouteFerryPlace;
  Time?: string | redacted.Redacted<string>;
}
export const RouteFerryArrival = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({ Place: RouteFerryPlace, Time: S.optional(SensitiveString) }),
).annotate({
  identifier: "RouteFerryArrival",
}) as any as S.Schema<RouteFerryArrival>;
export interface RouteFerryBeforeTravelStep {
  Duration: number;
  Instruction?: string | redacted.Redacted<string>;
  Type: string | redacted.Redacted<string>;
}
export const RouteFerryBeforeTravelStep = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Duration: S.Number,
      Instruction: S.optional(SensitiveString),
      Type: SensitiveString,
    }),
).annotate({
  identifier: "RouteFerryBeforeTravelStep",
}) as any as S.Schema<RouteFerryBeforeTravelStep>;
export type RouteFerryBeforeTravelStepList = RouteFerryBeforeTravelStep[];
export const RouteFerryBeforeTravelStepList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(RouteFerryBeforeTravelStep);
export interface RouteFerryDeparture {
  Place: RouteFerryPlace;
  Time?: string | redacted.Redacted<string>;
}
export const RouteFerryDeparture = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({ Place: RouteFerryPlace, Time: S.optional(SensitiveString) }),
).annotate({
  identifier: "RouteFerryDeparture",
}) as any as S.Schema<RouteFerryDeparture>;
export interface RouteFerryNotice {
  Code: string;
  Impact?: string;
}
export const RouteFerryNotice = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({ Code: S.String, Impact: S.optional(S.String) }),
).annotate({
  identifier: "RouteFerryNotice",
}) as any as S.Schema<RouteFerryNotice>;
export type RouteFerryNoticeList = RouteFerryNotice[];
export const RouteFerryNoticeList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(RouteFerryNotice);
export interface RoutePassThroughPlace {
  OriginalPosition?: number[];
  Position: number[];
  WaypointIndex?: number;
}
export const RoutePassThroughPlace = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    OriginalPosition: S.optional(Position23),
    Position: Position23,
    WaypointIndex: S.optional(S.Number),
  }),
).annotate({
  identifier: "RoutePassThroughPlace",
}) as any as S.Schema<RoutePassThroughPlace>;
export interface RoutePassThroughWaypoint {
  GeometryOffset?: number;
  Place: RoutePassThroughPlace;
}
export const RoutePassThroughWaypoint = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      GeometryOffset: S.optional(S.Number),
      Place: RoutePassThroughPlace,
    }),
).annotate({
  identifier: "RoutePassThroughWaypoint",
}) as any as S.Schema<RoutePassThroughWaypoint>;
export type RoutePassThroughWaypointList = RoutePassThroughWaypoint[];
export const RoutePassThroughWaypointList = /*@__PURE__*/ /*#__PURE__*/ S.Array(
  RoutePassThroughWaypoint,
);
export interface LocalizedString {
  Language?: string;
  Value: string | redacted.Redacted<string>;
}
export const LocalizedString = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({ Language: S.optional(S.String), Value: SensitiveString }),
).annotate({
  identifier: "LocalizedString",
}) as any as S.Schema<LocalizedString>;
export type LocalizedStringList = LocalizedString[];
export const LocalizedStringList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(LocalizedString);
export interface RouteFerrySpan {
  Country?: string | redacted.Redacted<string>;
  Distance?: number;
  Duration?: number;
  GeometryOffset?: number;
  Names?: LocalizedString[];
  Region?: string | redacted.Redacted<string>;
}
export const RouteFerrySpan = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    Country: S.optional(SensitiveString),
    Distance: S.optional(S.Number),
    Duration: S.optional(S.Number),
    GeometryOffset: S.optional(S.Number),
    Names: S.optional(LocalizedStringList),
    Region: S.optional(SensitiveString),
  }),
).annotate({ identifier: "RouteFerrySpan" }) as any as S.Schema<RouteFerrySpan>;
export type RouteFerrySpanList = RouteFerrySpan[];
export const RouteFerrySpanList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(RouteFerrySpan);
export interface RouteFerryOverviewSummary {
  Distance: number;
  Duration: number;
}
export const RouteFerryOverviewSummary = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () => S.Struct({ Distance: S.Number, Duration: S.Number }),
).annotate({
  identifier: "RouteFerryOverviewSummary",
}) as any as S.Schema<RouteFerryOverviewSummary>;
export interface RouteFerryTravelOnlySummary {
  Duration: number;
}
export const RouteFerryTravelOnlySummary =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({ Duration: S.Number }),
  ).annotate({
    identifier: "RouteFerryTravelOnlySummary",
  }) as any as S.Schema<RouteFerryTravelOnlySummary>;
export interface RouteFerrySummary {
  Overview?: RouteFerryOverviewSummary;
  TravelOnly?: RouteFerryTravelOnlySummary;
}
export const RouteFerrySummary = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    Overview: S.optional(RouteFerryOverviewSummary),
    TravelOnly: S.optional(RouteFerryTravelOnlySummary),
  }),
).annotate({
  identifier: "RouteFerrySummary",
}) as any as S.Schema<RouteFerrySummary>;
export interface RouteFerryTravelStep {
  Distance?: number;
  Duration: number;
  GeometryOffset?: number;
  Instruction?: string | redacted.Redacted<string>;
  Type: string | redacted.Redacted<string>;
}
export const RouteFerryTravelStep = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    Distance: S.optional(S.Number),
    Duration: S.Number,
    GeometryOffset: S.optional(S.Number),
    Instruction: S.optional(SensitiveString),
    Type: SensitiveString,
  }),
).annotate({
  identifier: "RouteFerryTravelStep",
}) as any as S.Schema<RouteFerryTravelStep>;
export type RouteFerryTravelStepList = RouteFerryTravelStep[];
export const RouteFerryTravelStepList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(RouteFerryTravelStep);
export interface RouteFerryLegDetails {
  AfterTravelSteps: RouteFerryAfterTravelStep[];
  Arrival: RouteFerryArrival;
  BeforeTravelSteps: RouteFerryBeforeTravelStep[];
  Departure: RouteFerryDeparture;
  Notices: RouteFerryNotice[];
  PassThroughWaypoints: RoutePassThroughWaypoint[];
  RouteName?: string | redacted.Redacted<string>;
  Spans: RouteFerrySpan[];
  Summary?: RouteFerrySummary;
  TravelSteps: RouteFerryTravelStep[];
}
export const RouteFerryLegDetails = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    AfterTravelSteps: RouteFerryAfterTravelStepList,
    Arrival: RouteFerryArrival,
    BeforeTravelSteps: RouteFerryBeforeTravelStepList,
    Departure: RouteFerryDeparture,
    Notices: RouteFerryNoticeList,
    PassThroughWaypoints: RoutePassThroughWaypointList,
    RouteName: S.optional(SensitiveString),
    Spans: RouteFerrySpanList,
    Summary: S.optional(RouteFerrySummary),
    TravelSteps: RouteFerryTravelStepList,
  }),
).annotate({
  identifier: "RouteFerryLegDetails",
}) as any as S.Schema<RouteFerryLegDetails>;
export interface RouteLegGeometry {
  LineString?: number[][];
  Polyline?: string | redacted.Redacted<string>;
}
export const RouteLegGeometry = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    LineString: S.optional(LineString),
    Polyline: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "RouteLegGeometry",
}) as any as S.Schema<RouteLegGeometry>;
export interface RoutePedestrianPlace {
  Name?: string | redacted.Redacted<string>;
  OriginalPosition?: number[];
  Position: number[];
  SideOfStreet?: string | redacted.Redacted<string>;
  WaypointIndex?: number;
}
export const RoutePedestrianPlace = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(SensitiveString),
    OriginalPosition: S.optional(Position23),
    Position: Position23,
    SideOfStreet: S.optional(SensitiveString),
    WaypointIndex: S.optional(S.Number),
  }),
).annotate({
  identifier: "RoutePedestrianPlace",
}) as any as S.Schema<RoutePedestrianPlace>;
export interface RoutePedestrianArrival {
  Place: RoutePedestrianPlace;
  Time?: string | redacted.Redacted<string>;
}
export const RoutePedestrianArrival = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Place: RoutePedestrianPlace,
      Time: S.optional(SensitiveString),
    }),
).annotate({
  identifier: "RoutePedestrianArrival",
}) as any as S.Schema<RoutePedestrianArrival>;
export interface RoutePedestrianDeparture {
  Place: RoutePedestrianPlace;
  Time?: string | redacted.Redacted<string>;
}
export const RoutePedestrianDeparture = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Place: RoutePedestrianPlace,
      Time: S.optional(SensitiveString),
    }),
).annotate({
  identifier: "RoutePedestrianDeparture",
}) as any as S.Schema<RoutePedestrianDeparture>;
export interface RoutePedestrianNotice {
  Code: string;
  Impact?: string;
}
export const RoutePedestrianNotice = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({ Code: S.String, Impact: S.optional(S.String) }),
).annotate({
  identifier: "RoutePedestrianNotice",
}) as any as S.Schema<RoutePedestrianNotice>;
export type RoutePedestrianNoticeList = RoutePedestrianNotice[];
export const RoutePedestrianNoticeList = /*@__PURE__*/ /*#__PURE__*/ S.Array(
  RoutePedestrianNotice,
);
export interface RouteSpanDynamicSpeedDetails {
  BestCaseSpeed?: number;
  TurnDuration?: number;
  TypicalSpeed?: number;
}
export const RouteSpanDynamicSpeedDetails =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      BestCaseSpeed: S.optional(S.Number),
      TurnDuration: S.optional(S.Number),
      TypicalSpeed: S.optional(S.Number),
    }),
  ).annotate({
    identifier: "RouteSpanDynamicSpeedDetails",
  }) as any as S.Schema<RouteSpanDynamicSpeedDetails>;
export type IndexList = number[];
export const IndexList = /*@__PURE__*/ /*#__PURE__*/ S.Array(S.Number);
export type RouteSpanPedestrianAccessAttributeList =
  | string
  | redacted.Redacted<string>[];
export const RouteSpanPedestrianAccessAttributeList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(SensitiveString);
export type RouteSpanRoadAttributeList = string | redacted.Redacted<string>[];
export const RouteSpanRoadAttributeList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(SensitiveString);
export interface RouteNumber {
  Direction?: string | redacted.Redacted<string>;
  Language?: string;
  Value: string | redacted.Redacted<string>;
}
export const RouteNumber = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    Direction: S.optional(SensitiveString),
    Language: S.optional(S.String),
    Value: SensitiveString,
  }),
).annotate({ identifier: "RouteNumber" }) as any as S.Schema<RouteNumber>;
export type RouteNumberList = RouteNumber[];
export const RouteNumberList = /*@__PURE__*/ /*#__PURE__*/ S.Array(RouteNumber);
export interface RouteSpanSpeedLimitDetails {
  MaxSpeed?: number;
  Unlimited?: boolean;
}
export const RouteSpanSpeedLimitDetails = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MaxSpeed: S.optional(S.Number),
      Unlimited: S.optional(S.Boolean),
    }),
).annotate({
  identifier: "RouteSpanSpeedLimitDetails",
}) as any as S.Schema<RouteSpanSpeedLimitDetails>;
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
  PedestrianAccess?: string | redacted.Redacted<string>[];
  Region?: string | redacted.Redacted<string>;
  RoadAttributes?: string | redacted.Redacted<string>[];
  RouteNumbers?: RouteNumber[];
  SpeedLimit?: RouteSpanSpeedLimitDetails;
  TypicalDuration?: number;
}
export const RoutePedestrianSpan = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    BestCaseDuration: S.optional(S.Number),
    Country: S.optional(SensitiveString),
    Distance: S.optional(S.Number),
    Duration: S.optional(S.Number),
    DynamicSpeed: S.optional(RouteSpanDynamicSpeedDetails),
    FunctionalClassification: S.optional(S.Number),
    GeometryOffset: S.optional(S.Number),
    Incidents: S.optional(IndexList),
    Names: S.optional(LocalizedStringList),
    PedestrianAccess: S.optional(RouteSpanPedestrianAccessAttributeList),
    Region: S.optional(SensitiveString),
    RoadAttributes: S.optional(RouteSpanRoadAttributeList),
    RouteNumbers: S.optional(RouteNumberList),
    SpeedLimit: S.optional(RouteSpanSpeedLimitDetails),
    TypicalDuration: S.optional(S.Number),
  }),
).annotate({
  identifier: "RoutePedestrianSpan",
}) as any as S.Schema<RoutePedestrianSpan>;
export type RoutePedestrianSpanList = RoutePedestrianSpan[];
export const RoutePedestrianSpanList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(RoutePedestrianSpan);
export interface RoutePedestrianOverviewSummary {
  Distance: number;
  Duration: number;
}
export const RoutePedestrianOverviewSummary =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({ Distance: S.Number, Duration: S.Number }),
  ).annotate({
    identifier: "RoutePedestrianOverviewSummary",
  }) as any as S.Schema<RoutePedestrianOverviewSummary>;
export interface RoutePedestrianTravelOnlySummary {
  Duration: number;
}
export const RoutePedestrianTravelOnlySummary =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({ Duration: S.Number }),
  ).annotate({
    identifier: "RoutePedestrianTravelOnlySummary",
  }) as any as S.Schema<RoutePedestrianTravelOnlySummary>;
export interface RoutePedestrianSummary {
  Overview?: RoutePedestrianOverviewSummary;
  TravelOnly?: RoutePedestrianTravelOnlySummary;
}
export const RoutePedestrianSummary = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Overview: S.optional(RoutePedestrianOverviewSummary),
      TravelOnly: S.optional(RoutePedestrianTravelOnlySummary),
    }),
).annotate({
  identifier: "RoutePedestrianSummary",
}) as any as S.Schema<RoutePedestrianSummary>;
export interface RouteContinueStepDetails {
  Intersection: LocalizedString[];
}
export const RouteContinueStepDetails = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () => S.Struct({ Intersection: LocalizedStringList }),
).annotate({
  identifier: "RouteContinueStepDetails",
}) as any as S.Schema<RouteContinueStepDetails>;
export interface RouteRoad {
  RoadName: LocalizedString[];
  RouteNumber: RouteNumber[];
  Towards: LocalizedString[];
  Type?: string | redacted.Redacted<string>;
}
export const RouteRoad = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    RoadName: LocalizedStringList,
    RouteNumber: RouteNumberList,
    Towards: LocalizedStringList,
    Type: S.optional(SensitiveString),
  }),
).annotate({ identifier: "RouteRoad" }) as any as S.Schema<RouteRoad>;
export interface RouteKeepStepDetails {
  Intersection: LocalizedString[];
  SteeringDirection?: string | redacted.Redacted<string>;
  TurnAngle?: number;
  TurnIntensity?: string | redacted.Redacted<string>;
}
export const RouteKeepStepDetails = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    Intersection: LocalizedStringList,
    SteeringDirection: S.optional(SensitiveString),
    TurnAngle: S.optional(S.Number),
    TurnIntensity: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "RouteKeepStepDetails",
}) as any as S.Schema<RouteKeepStepDetails>;
export interface RouteRoundaboutEnterStepDetails {
  Intersection: LocalizedString[];
  SteeringDirection?: string | redacted.Redacted<string>;
  TurnAngle?: number;
  TurnIntensity?: string | redacted.Redacted<string>;
}
export const RouteRoundaboutEnterStepDetails =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      Intersection: LocalizedStringList,
      SteeringDirection: S.optional(SensitiveString),
      TurnAngle: S.optional(S.Number),
      TurnIntensity: S.optional(SensitiveString),
    }),
  ).annotate({
    identifier: "RouteRoundaboutEnterStepDetails",
  }) as any as S.Schema<RouteRoundaboutEnterStepDetails>;
export interface RouteRoundaboutExitStepDetails {
  Intersection: LocalizedString[];
  RelativeExit?: number;
  RoundaboutAngle?: number;
  SteeringDirection?: string | redacted.Redacted<string>;
}
export const RouteRoundaboutExitStepDetails =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      Intersection: LocalizedStringList,
      RelativeExit: S.optional(S.Number),
      RoundaboutAngle: S.optional(S.Number),
      SteeringDirection: S.optional(SensitiveString),
    }),
  ).annotate({
    identifier: "RouteRoundaboutExitStepDetails",
  }) as any as S.Schema<RouteRoundaboutExitStepDetails>;
export interface RouteRoundaboutPassStepDetails {
  Intersection: LocalizedString[];
  SteeringDirection?: string | redacted.Redacted<string>;
  TurnAngle?: number;
  TurnIntensity?: string | redacted.Redacted<string>;
}
export const RouteRoundaboutPassStepDetails =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      Intersection: LocalizedStringList,
      SteeringDirection: S.optional(SensitiveString),
      TurnAngle: S.optional(S.Number),
      TurnIntensity: S.optional(SensitiveString),
    }),
  ).annotate({
    identifier: "RouteRoundaboutPassStepDetails",
  }) as any as S.Schema<RouteRoundaboutPassStepDetails>;
export interface RouteSignpostLabel {
  RouteNumber?: RouteNumber;
  Text?: LocalizedString;
}
export const RouteSignpostLabel = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    RouteNumber: S.optional(RouteNumber),
    Text: S.optional(LocalizedString),
  }),
).annotate({
  identifier: "RouteSignpostLabel",
}) as any as S.Schema<RouteSignpostLabel>;
export type RouteSignpostLabelList = RouteSignpostLabel[];
export const RouteSignpostLabelList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(RouteSignpostLabel);
export interface RouteSignpost {
  Labels: RouteSignpostLabel[];
}
export const RouteSignpost = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({ Labels: RouteSignpostLabelList }),
).annotate({ identifier: "RouteSignpost" }) as any as S.Schema<RouteSignpost>;
export interface RouteTurnStepDetails {
  Intersection: LocalizedString[];
  SteeringDirection?: string | redacted.Redacted<string>;
  TurnAngle?: number;
  TurnIntensity?: string | redacted.Redacted<string>;
}
export const RouteTurnStepDetails = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    Intersection: LocalizedStringList,
    SteeringDirection: S.optional(SensitiveString),
    TurnAngle: S.optional(S.Number),
    TurnIntensity: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "RouteTurnStepDetails",
}) as any as S.Schema<RouteTurnStepDetails>;
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
  Type: string | redacted.Redacted<string>;
}
export const RoutePedestrianTravelStep = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ContinueStepDetails: S.optional(RouteContinueStepDetails),
      CurrentRoad: S.optional(RouteRoad),
      Distance: S.optional(S.Number),
      Duration: S.Number,
      ExitNumber: S.optional(LocalizedStringList),
      GeometryOffset: S.optional(S.Number),
      Instruction: S.optional(SensitiveString),
      KeepStepDetails: S.optional(RouteKeepStepDetails),
      NextRoad: S.optional(RouteRoad),
      RoundaboutEnterStepDetails: S.optional(RouteRoundaboutEnterStepDetails),
      RoundaboutExitStepDetails: S.optional(RouteRoundaboutExitStepDetails),
      RoundaboutPassStepDetails: S.optional(RouteRoundaboutPassStepDetails),
      Signpost: S.optional(RouteSignpost),
      TurnStepDetails: S.optional(RouteTurnStepDetails),
      Type: SensitiveString,
    }),
).annotate({
  identifier: "RoutePedestrianTravelStep",
}) as any as S.Schema<RoutePedestrianTravelStep>;
export type RoutePedestrianTravelStepList = RoutePedestrianTravelStep[];
export const RoutePedestrianTravelStepList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(RoutePedestrianTravelStep);
export interface RoutePedestrianLegDetails {
  Arrival: RoutePedestrianArrival;
  Departure: RoutePedestrianDeparture;
  Notices: RoutePedestrianNotice[];
  PassThroughWaypoints: RoutePassThroughWaypoint[];
  Spans: RoutePedestrianSpan[];
  Summary?: RoutePedestrianSummary;
  TravelSteps: RoutePedestrianTravelStep[];
}
export const RoutePedestrianLegDetails = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Arrival: RoutePedestrianArrival,
      Departure: RoutePedestrianDeparture,
      Notices: RoutePedestrianNoticeList,
      PassThroughWaypoints: RoutePassThroughWaypointList,
      Spans: RoutePedestrianSpanList,
      Summary: S.optional(RoutePedestrianSummary),
      TravelSteps: RoutePedestrianTravelStepList,
    }),
).annotate({
  identifier: "RoutePedestrianLegDetails",
}) as any as S.Schema<RoutePedestrianLegDetails>;
export interface RouteVehiclePlace {
  Name?: string | redacted.Redacted<string>;
  OriginalPosition?: number[];
  Position: number[];
  SideOfStreet?: string | redacted.Redacted<string>;
  WaypointIndex?: number;
}
export const RouteVehiclePlace = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(SensitiveString),
    OriginalPosition: S.optional(Position23),
    Position: Position23,
    SideOfStreet: S.optional(SensitiveString),
    WaypointIndex: S.optional(S.Number),
  }),
).annotate({
  identifier: "RouteVehiclePlace",
}) as any as S.Schema<RouteVehiclePlace>;
export interface RouteVehicleArrival {
  Place: RouteVehiclePlace;
  Time?: string | redacted.Redacted<string>;
}
export const RouteVehicleArrival = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({ Place: RouteVehiclePlace, Time: S.optional(SensitiveString) }),
).annotate({
  identifier: "RouteVehicleArrival",
}) as any as S.Schema<RouteVehicleArrival>;
export interface RouteVehicleDeparture {
  Place: RouteVehiclePlace;
  Time?: string | redacted.Redacted<string>;
}
export const RouteVehicleDeparture = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({ Place: RouteVehiclePlace, Time: S.optional(SensitiveString) }),
).annotate({
  identifier: "RouteVehicleDeparture",
}) as any as S.Schema<RouteVehicleDeparture>;
export interface RouteVehicleIncident {
  Description?: string | redacted.Redacted<string>;
  EndTime?: string | redacted.Redacted<string>;
  Severity?: string | redacted.Redacted<string>;
  StartTime?: string | redacted.Redacted<string>;
  Type?: string | redacted.Redacted<string>;
}
export const RouteVehicleIncident = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(SensitiveString),
    EndTime: S.optional(SensitiveString),
    Severity: S.optional(SensitiveString),
    StartTime: S.optional(SensitiveString),
    Type: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "RouteVehicleIncident",
}) as any as S.Schema<RouteVehicleIncident>;
export type RouteVehicleIncidentList = RouteVehicleIncident[];
export const RouteVehicleIncidentList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(RouteVehicleIncident);
export interface RouteNoticeDetailRange {
  Min?: number;
  Max?: number;
}
export const RouteNoticeDetailRange = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () => S.Struct({ Min: S.optional(S.Number), Max: S.optional(S.Number) }),
).annotate({
  identifier: "RouteNoticeDetailRange",
}) as any as S.Schema<RouteNoticeDetailRange>;
export interface RouteWeightConstraint {
  Type: string;
  Value: number;
}
export const RouteWeightConstraint = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({ Type: S.String, Value: S.Number }),
).annotate({
  identifier: "RouteWeightConstraint",
}) as any as S.Schema<RouteWeightConstraint>;
export interface RouteViolatedConstraints {
  AllHazardsRestricted?: boolean;
  AxleCount?: RouteNoticeDetailRange;
  HazardousCargos: string | redacted.Redacted<string>[];
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
  TruckType?: string | redacted.Redacted<string>;
  TunnelRestrictionCode?: string | redacted.Redacted<string>;
}
export const RouteViolatedConstraints = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AllHazardsRestricted: S.optional(S.Boolean),
      AxleCount: S.optional(RouteNoticeDetailRange),
      HazardousCargos: RouteHazardousCargoTypeList,
      MaxHeight: S.optional(S.Number),
      MaxKpraLength: S.optional(S.Number),
      MaxLength: S.optional(S.Number),
      MaxPayloadCapacity: S.optional(S.Number),
      MaxWeight: S.optional(RouteWeightConstraint),
      MaxWeightPerAxle: S.optional(S.Number),
      MaxWeightPerAxleGroup: S.optional(WeightPerAxleGroup),
      MaxWidth: S.optional(S.Number),
      Occupancy: S.optional(RouteNoticeDetailRange),
      RestrictedTimes: S.optional(S.String),
      TimeDependent: S.optional(S.Boolean),
      TrailerCount: S.optional(RouteNoticeDetailRange),
      TravelMode: S.optional(S.Boolean),
      TruckRoadType: S.optional(S.String),
      TruckType: S.optional(SensitiveString),
      TunnelRestrictionCode: S.optional(SensitiveString),
    }),
).annotate({
  identifier: "RouteViolatedConstraints",
}) as any as S.Schema<RouteViolatedConstraints>;
export interface RouteVehicleNoticeDetail {
  Title?: string | redacted.Redacted<string>;
  ViolatedConstraints?: RouteViolatedConstraints;
}
export const RouteVehicleNoticeDetail = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Title: S.optional(SensitiveString),
      ViolatedConstraints: S.optional(RouteViolatedConstraints),
    }),
).annotate({
  identifier: "RouteVehicleNoticeDetail",
}) as any as S.Schema<RouteVehicleNoticeDetail>;
export type RouteVehicleNoticeDetailList = RouteVehicleNoticeDetail[];
export const RouteVehicleNoticeDetailList = /*@__PURE__*/ /*#__PURE__*/ S.Array(
  RouteVehicleNoticeDetail,
);
export interface RouteVehicleNotice {
  Code: string;
  Details: RouteVehicleNoticeDetail[];
  Impact?: string;
}
export const RouteVehicleNotice = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    Code: S.String,
    Details: RouteVehicleNoticeDetailList,
    Impact: S.optional(S.String),
  }),
).annotate({
  identifier: "RouteVehicleNotice",
}) as any as S.Schema<RouteVehicleNotice>;
export type RouteVehicleNoticeList = RouteVehicleNotice[];
export const RouteVehicleNoticeList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(RouteVehicleNotice);
export type RouteSpanCarAccessAttributeList =
  | string
  | redacted.Redacted<string>[];
export const RouteSpanCarAccessAttributeList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(SensitiveString);
export type RouteSpanScooterAccessAttributeList =
  | string
  | redacted.Redacted<string>[];
export const RouteSpanScooterAccessAttributeList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(SensitiveString);
export type RouteSpanTruckAccessAttributeList =
  | string
  | redacted.Redacted<string>[];
export const RouteSpanTruckAccessAttributeList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(SensitiveString);
export interface RouteVehicleSpan {
  BestCaseDuration?: number;
  CarAccess?: string | redacted.Redacted<string>[];
  Country?: string | redacted.Redacted<string>;
  Distance?: number;
  Duration?: number;
  DynamicSpeed?: RouteSpanDynamicSpeedDetails;
  FunctionalClassification?: number;
  Gate?: string | redacted.Redacted<string>;
  GeometryOffset?: number;
  Incidents?: number[];
  Names?: LocalizedString[];
  Notices?: number[];
  RailwayCrossing?: string | redacted.Redacted<string>;
  Region?: string | redacted.Redacted<string>;
  RoadAttributes?: string | redacted.Redacted<string>[];
  RouteNumbers?: RouteNumber[];
  ScooterAccess?: string | redacted.Redacted<string>[];
  SpeedLimit?: RouteSpanSpeedLimitDetails;
  TollSystems?: number[];
  TruckAccess?: string | redacted.Redacted<string>[];
  TruckRoadTypes?: number[];
  TypicalDuration?: number;
  Zones?: number[];
}
export const RouteVehicleSpan = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    BestCaseDuration: S.optional(S.Number),
    CarAccess: S.optional(RouteSpanCarAccessAttributeList),
    Country: S.optional(SensitiveString),
    Distance: S.optional(S.Number),
    Duration: S.optional(S.Number),
    DynamicSpeed: S.optional(RouteSpanDynamicSpeedDetails),
    FunctionalClassification: S.optional(S.Number),
    Gate: S.optional(SensitiveString),
    GeometryOffset: S.optional(S.Number),
    Incidents: S.optional(IndexList),
    Names: S.optional(LocalizedStringList),
    Notices: S.optional(IndexList),
    RailwayCrossing: S.optional(SensitiveString),
    Region: S.optional(SensitiveString),
    RoadAttributes: S.optional(RouteSpanRoadAttributeList),
    RouteNumbers: S.optional(RouteNumberList),
    ScooterAccess: S.optional(RouteSpanScooterAccessAttributeList),
    SpeedLimit: S.optional(RouteSpanSpeedLimitDetails),
    TollSystems: S.optional(IndexList),
    TruckAccess: S.optional(RouteSpanTruckAccessAttributeList),
    TruckRoadTypes: S.optional(IndexList),
    TypicalDuration: S.optional(S.Number),
    Zones: S.optional(IndexList),
  }),
).annotate({
  identifier: "RouteVehicleSpan",
}) as any as S.Schema<RouteVehicleSpan>;
export type RouteVehicleSpanList = RouteVehicleSpan[];
export const RouteVehicleSpanList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(RouteVehicleSpan);
export interface RouteVehicleOverviewSummary {
  BestCaseDuration?: number;
  Distance: number;
  Duration: number;
  TypicalDuration?: number;
}
export const RouteVehicleOverviewSummary =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      BestCaseDuration: S.optional(S.Number),
      Distance: S.Number,
      Duration: S.Number,
      TypicalDuration: S.optional(S.Number),
    }),
  ).annotate({
    identifier: "RouteVehicleOverviewSummary",
  }) as any as S.Schema<RouteVehicleOverviewSummary>;
export interface RouteVehicleTravelOnlySummary {
  BestCaseDuration?: number;
  Duration: number;
  TypicalDuration?: number;
}
export const RouteVehicleTravelOnlySummary =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      BestCaseDuration: S.optional(S.Number),
      Duration: S.Number,
      TypicalDuration: S.optional(S.Number),
    }),
  ).annotate({
    identifier: "RouteVehicleTravelOnlySummary",
  }) as any as S.Schema<RouteVehicleTravelOnlySummary>;
export interface RouteVehicleSummary {
  Overview?: RouteVehicleOverviewSummary;
  TravelOnly?: RouteVehicleTravelOnlySummary;
}
export const RouteVehicleSummary = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    Overview: S.optional(RouteVehicleOverviewSummary),
    TravelOnly: S.optional(RouteVehicleTravelOnlySummary),
  }),
).annotate({
  identifier: "RouteVehicleSummary",
}) as any as S.Schema<RouteVehicleSummary>;
export interface RouteTollPaymentSite {
  Name?: string;
  Position: number[];
}
export const RouteTollPaymentSite = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Position: Position23 }),
).annotate({
  identifier: "RouteTollPaymentSite",
}) as any as S.Schema<RouteTollPaymentSite>;
export type RouteTollPaymentSiteList = RouteTollPaymentSite[];
export const RouteTollPaymentSiteList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(RouteTollPaymentSite);
export interface RouteTollPriceValueRange {
  Min: number;
  Max: number;
}
export const RouteTollPriceValueRange = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () => S.Struct({ Min: S.Number, Max: S.Number }),
).annotate({
  identifier: "RouteTollPriceValueRange",
}) as any as S.Schema<RouteTollPriceValueRange>;
export interface RouteTollPrice {
  Currency: string;
  Estimate: boolean;
  PerDuration?: number;
  Range: boolean;
  RangeValue?: RouteTollPriceValueRange;
  Value: number;
}
export const RouteTollPrice = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    Currency: S.String,
    Estimate: S.Boolean,
    PerDuration: S.optional(S.Number),
    Range: S.Boolean,
    RangeValue: S.optional(RouteTollPriceValueRange),
    Value: S.Number,
  }),
).annotate({ identifier: "RouteTollPrice" }) as any as S.Schema<RouteTollPrice>;
export interface RouteTollPassValidityPeriod {
  Period: string | redacted.Redacted<string>;
  PeriodCount?: number;
}
export const RouteTollPassValidityPeriod =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({ Period: SensitiveString, PeriodCount: S.optional(S.Number) }),
  ).annotate({
    identifier: "RouteTollPassValidityPeriod",
  }) as any as S.Schema<RouteTollPassValidityPeriod>;
export interface RouteTollPass {
  IncludesReturnTrip?: boolean;
  SeniorPass?: boolean;
  TransferCount?: number;
  TripCount?: number;
  ValidityPeriod?: RouteTollPassValidityPeriod;
}
export const RouteTollPass = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    IncludesReturnTrip: S.optional(S.Boolean),
    SeniorPass: S.optional(S.Boolean),
    TransferCount: S.optional(S.Number),
    TripCount: S.optional(S.Number),
    ValidityPeriod: S.optional(RouteTollPassValidityPeriod),
  }),
).annotate({ identifier: "RouteTollPass" }) as any as S.Schema<RouteTollPass>;
export type RouteTollPaymentMethodList = string | redacted.Redacted<string>[];
export const RouteTollPaymentMethodList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(SensitiveString);
export interface RouteTransponder {
  SystemName?: string | redacted.Redacted<string>;
}
export const RouteTransponder = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({ SystemName: S.optional(SensitiveString) }),
).annotate({
  identifier: "RouteTransponder",
}) as any as S.Schema<RouteTransponder>;
export type RouteTransponderList = RouteTransponder[];
export const RouteTransponderList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(RouteTransponder);
export interface RouteTollRate {
  ApplicableTimes?: string | redacted.Redacted<string>;
  ConvertedPrice?: RouteTollPrice;
  Id: string | redacted.Redacted<string>;
  LocalPrice: RouteTollPrice;
  Name: string | redacted.Redacted<string>;
  Pass?: RouteTollPass;
  PaymentMethods: string | redacted.Redacted<string>[];
  Transponders: RouteTransponder[];
}
export const RouteTollRate = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicableTimes: S.optional(SensitiveString),
    ConvertedPrice: S.optional(RouteTollPrice),
    Id: SensitiveString,
    LocalPrice: RouteTollPrice,
    Name: SensitiveString,
    Pass: S.optional(RouteTollPass),
    PaymentMethods: RouteTollPaymentMethodList,
    Transponders: RouteTransponderList,
  }),
).annotate({ identifier: "RouteTollRate" }) as any as S.Schema<RouteTollRate>;
export type RouteTollRateList = RouteTollRate[];
export const RouteTollRateList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(RouteTollRate);
export interface RouteToll {
  Country?: string | redacted.Redacted<string>;
  PaymentSites: RouteTollPaymentSite[];
  Rates: RouteTollRate[];
  Systems: number[];
}
export const RouteToll = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    Country: S.optional(SensitiveString),
    PaymentSites: RouteTollPaymentSiteList,
    Rates: RouteTollRateList,
    Systems: IndexList,
  }),
).annotate({ identifier: "RouteToll" }) as any as S.Schema<RouteToll>;
export type RouteTollList = RouteToll[];
export const RouteTollList = /*@__PURE__*/ /*#__PURE__*/ S.Array(RouteToll);
export interface RouteTollSystem {
  Name?: string | redacted.Redacted<string>;
}
export const RouteTollSystem = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(SensitiveString) }),
).annotate({
  identifier: "RouteTollSystem",
}) as any as S.Schema<RouteTollSystem>;
export type RouteTollSystemList = RouteTollSystem[];
export const RouteTollSystemList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(RouteTollSystem);
export interface RouteContinueHighwayStepDetails {
  Intersection: LocalizedString[];
  SteeringDirection?: string | redacted.Redacted<string>;
  TurnAngle?: number;
  TurnIntensity?: string | redacted.Redacted<string>;
}
export const RouteContinueHighwayStepDetails =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      Intersection: LocalizedStringList,
      SteeringDirection: S.optional(SensitiveString),
      TurnAngle: S.optional(S.Number),
      TurnIntensity: S.optional(SensitiveString),
    }),
  ).annotate({
    identifier: "RouteContinueHighwayStepDetails",
  }) as any as S.Schema<RouteContinueHighwayStepDetails>;
export interface RouteEnterHighwayStepDetails {
  Intersection: LocalizedString[];
  SteeringDirection?: string | redacted.Redacted<string>;
  TurnAngle?: number;
  TurnIntensity?: string | redacted.Redacted<string>;
}
export const RouteEnterHighwayStepDetails =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      Intersection: LocalizedStringList,
      SteeringDirection: S.optional(SensitiveString),
      TurnAngle: S.optional(S.Number),
      TurnIntensity: S.optional(SensitiveString),
    }),
  ).annotate({
    identifier: "RouteEnterHighwayStepDetails",
  }) as any as S.Schema<RouteEnterHighwayStepDetails>;
export interface RouteExitStepDetails {
  Intersection: LocalizedString[];
  RelativeExit?: number;
  SteeringDirection?: string | redacted.Redacted<string>;
  TurnAngle?: number;
  TurnIntensity?: string | redacted.Redacted<string>;
}
export const RouteExitStepDetails = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    Intersection: LocalizedStringList,
    RelativeExit: S.optional(S.Number),
    SteeringDirection: S.optional(SensitiveString),
    TurnAngle: S.optional(S.Number),
    TurnIntensity: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "RouteExitStepDetails",
}) as any as S.Schema<RouteExitStepDetails>;
export interface RouteRampStepDetails {
  Intersection: LocalizedString[];
  SteeringDirection?: string | redacted.Redacted<string>;
  TurnAngle?: number;
  TurnIntensity?: string | redacted.Redacted<string>;
}
export const RouteRampStepDetails = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    Intersection: LocalizedStringList,
    SteeringDirection: S.optional(SensitiveString),
    TurnAngle: S.optional(S.Number),
    TurnIntensity: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "RouteRampStepDetails",
}) as any as S.Schema<RouteRampStepDetails>;
export interface RouteUTurnStepDetails {
  Intersection: LocalizedString[];
  SteeringDirection?: string | redacted.Redacted<string>;
  TurnAngle?: number;
  TurnIntensity?: string | redacted.Redacted<string>;
}
export const RouteUTurnStepDetails = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    Intersection: LocalizedStringList,
    SteeringDirection: S.optional(SensitiveString),
    TurnAngle: S.optional(S.Number),
    TurnIntensity: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "RouteUTurnStepDetails",
}) as any as S.Schema<RouteUTurnStepDetails>;
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
  Type: string | redacted.Redacted<string>;
  UTurnStepDetails?: RouteUTurnStepDetails;
}
export const RouteVehicleTravelStep = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ContinueHighwayStepDetails: S.optional(RouteContinueHighwayStepDetails),
      ContinueStepDetails: S.optional(RouteContinueStepDetails),
      CurrentRoad: S.optional(RouteRoad),
      Distance: S.optional(S.Number),
      Duration: S.Number,
      EnterHighwayStepDetails: S.optional(RouteEnterHighwayStepDetails),
      ExitNumber: S.optional(LocalizedStringList),
      ExitStepDetails: S.optional(RouteExitStepDetails),
      GeometryOffset: S.optional(S.Number),
      Instruction: S.optional(SensitiveString),
      KeepStepDetails: S.optional(RouteKeepStepDetails),
      NextRoad: S.optional(RouteRoad),
      RampStepDetails: S.optional(RouteRampStepDetails),
      RoundaboutEnterStepDetails: S.optional(RouteRoundaboutEnterStepDetails),
      RoundaboutExitStepDetails: S.optional(RouteRoundaboutExitStepDetails),
      RoundaboutPassStepDetails: S.optional(RouteRoundaboutPassStepDetails),
      Signpost: S.optional(RouteSignpost),
      TurnStepDetails: S.optional(RouteTurnStepDetails),
      Type: SensitiveString,
      UTurnStepDetails: S.optional(RouteUTurnStepDetails),
    }),
).annotate({
  identifier: "RouteVehicleTravelStep",
}) as any as S.Schema<RouteVehicleTravelStep>;
export type RouteVehicleTravelStepList = RouteVehicleTravelStep[];
export const RouteVehicleTravelStepList = /*@__PURE__*/ /*#__PURE__*/ S.Array(
  RouteVehicleTravelStep,
);
export interface RouteZone {
  Category?: string | redacted.Redacted<string>;
  Name?: string | redacted.Redacted<string>;
}
export const RouteZone = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    Category: S.optional(SensitiveString),
    Name: S.optional(SensitiveString),
  }),
).annotate({ identifier: "RouteZone" }) as any as S.Schema<RouteZone>;
export type RouteZoneList = RouteZone[];
export const RouteZoneList = /*@__PURE__*/ /*#__PURE__*/ S.Array(RouteZone);
export interface RouteVehicleLegDetails {
  Arrival: RouteVehicleArrival;
  Departure: RouteVehicleDeparture;
  Incidents: RouteVehicleIncident[];
  Notices: RouteVehicleNotice[];
  PassThroughWaypoints: RoutePassThroughWaypoint[];
  Spans: RouteVehicleSpan[];
  Summary?: RouteVehicleSummary;
  Tolls: RouteToll[];
  TollSystems: RouteTollSystem[];
  TravelSteps: RouteVehicleTravelStep[];
  TruckRoadTypes: string | redacted.Redacted<string>[];
  Zones: RouteZone[];
}
export const RouteVehicleLegDetails = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Arrival: RouteVehicleArrival,
      Departure: RouteVehicleDeparture,
      Incidents: RouteVehicleIncidentList,
      Notices: RouteVehicleNoticeList,
      PassThroughWaypoints: RoutePassThroughWaypointList,
      Spans: RouteVehicleSpanList,
      Summary: S.optional(RouteVehicleSummary),
      Tolls: RouteTollList,
      TollSystems: RouteTollSystemList,
      TravelSteps: RouteVehicleTravelStepList,
      TruckRoadTypes: TruckRoadTypeList,
      Zones: RouteZoneList,
    }),
).annotate({
  identifier: "RouteVehicleLegDetails",
}) as any as S.Schema<RouteVehicleLegDetails>;
export interface RouteLeg {
  FerryLegDetails?: RouteFerryLegDetails;
  Geometry: RouteLegGeometry;
  Language?: string;
  PedestrianLegDetails?: RoutePedestrianLegDetails;
  TravelMode: string | redacted.Redacted<string>;
  Type: string | redacted.Redacted<string>;
  VehicleLegDetails?: RouteVehicleLegDetails;
}
export const RouteLeg = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    FerryLegDetails: S.optional(RouteFerryLegDetails),
    Geometry: RouteLegGeometry,
    Language: S.optional(S.String),
    PedestrianLegDetails: S.optional(RoutePedestrianLegDetails),
    TravelMode: SensitiveString,
    Type: SensitiveString,
    VehicleLegDetails: S.optional(RouteVehicleLegDetails),
  }),
).annotate({ identifier: "RouteLeg" }) as any as S.Schema<RouteLeg>;
export type RouteLegList = RouteLeg[];
export const RouteLegList = /*@__PURE__*/ /*#__PURE__*/ S.Array(RouteLeg);
export interface RouteMajorRoadLabel {
  RoadName?: LocalizedString;
  RouteNumber?: RouteNumber;
}
export const RouteMajorRoadLabel = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    RoadName: S.optional(LocalizedString),
    RouteNumber: S.optional(RouteNumber),
  }),
).annotate({
  identifier: "RouteMajorRoadLabel",
}) as any as S.Schema<RouteMajorRoadLabel>;
export type RouteMajorRoadLabelList = RouteMajorRoadLabel[];
export const RouteMajorRoadLabelList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(RouteMajorRoadLabel);
export interface RouteTollPriceSummary {
  Currency: string;
  Estimate: boolean;
  Range: boolean;
  RangeValue?: RouteTollPriceValueRange;
  Value: number;
}
export const RouteTollPriceSummary = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    Currency: S.String,
    Estimate: S.Boolean,
    Range: S.Boolean,
    RangeValue: S.optional(RouteTollPriceValueRange),
    Value: S.Number,
  }),
).annotate({
  identifier: "RouteTollPriceSummary",
}) as any as S.Schema<RouteTollPriceSummary>;
export interface RouteTollSummary {
  Total?: RouteTollPriceSummary;
}
export const RouteTollSummary = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({ Total: S.optional(RouteTollPriceSummary) }),
).annotate({
  identifier: "RouteTollSummary",
}) as any as S.Schema<RouteTollSummary>;
export interface RouteSummary {
  Distance?: number;
  Duration?: number;
  Tolls?: RouteTollSummary;
}
export const RouteSummary = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    Distance: S.optional(S.Number),
    Duration: S.optional(S.Number),
    Tolls: S.optional(RouteTollSummary),
  }),
).annotate({ identifier: "RouteSummary" }) as any as S.Schema<RouteSummary>;
export interface Route {
  Legs: RouteLeg[];
  MajorRoadLabels: RouteMajorRoadLabel[];
  Summary?: RouteSummary;
}
export const Route = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    Legs: RouteLegList,
    MajorRoadLabels: RouteMajorRoadLabelList,
    Summary: S.optional(RouteSummary),
  }),
).annotate({ identifier: "Route" }) as any as S.Schema<Route>;
export type RouteList = Route[];
export const RouteList = /*@__PURE__*/ /*#__PURE__*/ S.Array(Route);
export interface CalculateRoutesResponse {
  LegGeometryFormat: string;
  Notices: RouteResponseNotice[];
  PricingBucket: string;
  Routes: Route[];
}
export const CalculateRoutesResponse = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      LegGeometryFormat: S.String,
      Notices: RouteResponseNoticeList,
      PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
      Routes: RouteList,
    }),
).annotate({
  identifier: "CalculateRoutesResponse",
}) as any as S.Schema<CalculateRoutesResponse>;
export interface WaypointOptimizationAvoidanceAreaGeometry {
  BoundingBox?: number[];
}
export const WaypointOptimizationAvoidanceAreaGeometry =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({ BoundingBox: S.optional(BoundingBox) }),
  ).annotate({
    identifier: "WaypointOptimizationAvoidanceAreaGeometry",
  }) as any as S.Schema<WaypointOptimizationAvoidanceAreaGeometry>;
export interface WaypointOptimizationAvoidanceArea {
  Geometry: WaypointOptimizationAvoidanceAreaGeometry;
}
export const WaypointOptimizationAvoidanceArea =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({ Geometry: WaypointOptimizationAvoidanceAreaGeometry }),
  ).annotate({
    identifier: "WaypointOptimizationAvoidanceArea",
  }) as any as S.Schema<WaypointOptimizationAvoidanceArea>;
export type WaypointOptimizationAvoidanceAreaList =
  WaypointOptimizationAvoidanceArea[];
export const WaypointOptimizationAvoidanceAreaList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(WaypointOptimizationAvoidanceArea);
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
export const WaypointOptimizationAvoidanceOptions =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      Areas: S.optional(WaypointOptimizationAvoidanceAreaList),
      CarShuttleTrains: S.optional(S.Boolean),
      ControlledAccessHighways: S.optional(S.Boolean),
      DirtRoads: S.optional(S.Boolean),
      Ferries: S.optional(S.Boolean),
      TollRoads: S.optional(S.Boolean),
      Tunnels: S.optional(S.Boolean),
      UTurns: S.optional(S.Boolean),
    }),
  ).annotate({
    identifier: "WaypointOptimizationAvoidanceOptions",
  }) as any as S.Schema<WaypointOptimizationAvoidanceOptions>;
export interface WaypointOptimizationDrivingDistanceOptions {
  DrivingDistance: number;
}
export const WaypointOptimizationDrivingDistanceOptions =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({ DrivingDistance: S.Number }),
  ).annotate({
    identifier: "WaypointOptimizationDrivingDistanceOptions",
  }) as any as S.Schema<WaypointOptimizationDrivingDistanceOptions>;
export interface WaypointOptimizationClusteringOptions {
  Algorithm: string | redacted.Redacted<string>;
  DrivingDistanceOptions?: WaypointOptimizationDrivingDistanceOptions;
}
export const WaypointOptimizationClusteringOptions =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      Algorithm: SensitiveString,
      DrivingDistanceOptions: S.optional(
        WaypointOptimizationDrivingDistanceOptions,
      ),
    }),
  ).annotate({
    identifier: "WaypointOptimizationClusteringOptions",
  }) as any as S.Schema<WaypointOptimizationClusteringOptions>;
export interface WaypointOptimizationAccessHoursEntry {
  DayOfWeek: string | redacted.Redacted<string>;
  TimeOfDay: string | redacted.Redacted<string>;
}
export const WaypointOptimizationAccessHoursEntry =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({ DayOfWeek: SensitiveString, TimeOfDay: SensitiveString }),
  ).annotate({
    identifier: "WaypointOptimizationAccessHoursEntry",
  }) as any as S.Schema<WaypointOptimizationAccessHoursEntry>;
export interface WaypointOptimizationAccessHours {
  From: WaypointOptimizationAccessHoursEntry;
  To: WaypointOptimizationAccessHoursEntry;
}
export const WaypointOptimizationAccessHours =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      From: WaypointOptimizationAccessHoursEntry,
      To: WaypointOptimizationAccessHoursEntry,
    }),
  ).annotate({
    identifier: "WaypointOptimizationAccessHours",
  }) as any as S.Schema<WaypointOptimizationAccessHours>;
export interface WaypointOptimizationSideOfStreetOptions {
  Position: number[];
  UseWith?: string;
}
export const WaypointOptimizationSideOfStreetOptions =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({ Position: Position, UseWith: S.optional(S.String) }),
  ).annotate({
    identifier: "WaypointOptimizationSideOfStreetOptions",
  }) as any as S.Schema<WaypointOptimizationSideOfStreetOptions>;
export interface WaypointOptimizationDestinationOptions {
  AccessHours?: WaypointOptimizationAccessHours;
  AppointmentTime?: string | redacted.Redacted<string>;
  Heading?: number;
  Id?: string;
  ServiceDuration?: number;
  SideOfStreet?: WaypointOptimizationSideOfStreetOptions;
}
export const WaypointOptimizationDestinationOptions =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      AccessHours: S.optional(WaypointOptimizationAccessHours),
      AppointmentTime: S.optional(SensitiveString),
      Heading: S.optional(S.Number),
      Id: S.optional(S.String),
      ServiceDuration: S.optional(S.Number),
      SideOfStreet: S.optional(WaypointOptimizationSideOfStreetOptions),
    }),
  ).annotate({
    identifier: "WaypointOptimizationDestinationOptions",
  }) as any as S.Schema<WaypointOptimizationDestinationOptions>;
export interface WaypointOptimizationRestCycleDurations {
  RestDuration: number;
  WorkDuration: number;
}
export const WaypointOptimizationRestCycleDurations =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({ RestDuration: S.Number, WorkDuration: S.Number }),
  ).annotate({
    identifier: "WaypointOptimizationRestCycleDurations",
  }) as any as S.Schema<WaypointOptimizationRestCycleDurations>;
export interface WaypointOptimizationRestCycles {
  LongCycle: WaypointOptimizationRestCycleDurations;
  ShortCycle: WaypointOptimizationRestCycleDurations;
}
export const WaypointOptimizationRestCycles =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      LongCycle: WaypointOptimizationRestCycleDurations,
      ShortCycle: WaypointOptimizationRestCycleDurations,
    }),
  ).annotate({
    identifier: "WaypointOptimizationRestCycles",
  }) as any as S.Schema<WaypointOptimizationRestCycles>;
export interface WaypointOptimizationRestProfile {
  Profile: string | redacted.Redacted<string>;
}
export const WaypointOptimizationRestProfile =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({ Profile: SensitiveString }),
  ).annotate({
    identifier: "WaypointOptimizationRestProfile",
  }) as any as S.Schema<WaypointOptimizationRestProfile>;
export interface WaypointOptimizationDriverOptions {
  RestCycles?: WaypointOptimizationRestCycles;
  RestProfile?: WaypointOptimizationRestProfile;
  TreatServiceTimeAs?: string | redacted.Redacted<string>;
}
export const WaypointOptimizationDriverOptions =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      RestCycles: S.optional(WaypointOptimizationRestCycles),
      RestProfile: S.optional(WaypointOptimizationRestProfile),
      TreatServiceTimeAs: S.optional(SensitiveString),
    }),
  ).annotate({
    identifier: "WaypointOptimizationDriverOptions",
  }) as any as S.Schema<WaypointOptimizationDriverOptions>;
export interface WaypointOptimizationExclusionOptions {
  Countries: string | redacted.Redacted<string>[];
}
export const WaypointOptimizationExclusionOptions =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({ Countries: CountryCodeList }),
  ).annotate({
    identifier: "WaypointOptimizationExclusionOptions",
  }) as any as S.Schema<WaypointOptimizationExclusionOptions>;
export interface WaypointOptimizationOriginOptions {
  Id?: string;
}
export const WaypointOptimizationOriginOptions =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({ Id: S.optional(S.String) }),
  ).annotate({
    identifier: "WaypointOptimizationOriginOptions",
  }) as any as S.Schema<WaypointOptimizationOriginOptions>;
export interface WaypointOptimizationTrafficOptions {
  Usage?: string;
}
export const WaypointOptimizationTrafficOptions =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({ Usage: S.optional(S.String) }),
  ).annotate({
    identifier: "WaypointOptimizationTrafficOptions",
  }) as any as S.Schema<WaypointOptimizationTrafficOptions>;
export interface WaypointOptimizationPedestrianOptions {
  Speed?: number;
}
export const WaypointOptimizationPedestrianOptions =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({ Speed: S.optional(S.Number) }),
  ).annotate({
    identifier: "WaypointOptimizationPedestrianOptions",
  }) as any as S.Schema<WaypointOptimizationPedestrianOptions>;
export type WaypointOptimizationHazardousCargoTypeList =
  | string
  | redacted.Redacted<string>[];
export const WaypointOptimizationHazardousCargoTypeList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(SensitiveString);
export interface WaypointOptimizationTrailerOptions {
  TrailerCount?: number;
}
export const WaypointOptimizationTrailerOptions =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({ TrailerCount: S.optional(S.Number) }),
  ).annotate({
    identifier: "WaypointOptimizationTrailerOptions",
  }) as any as S.Schema<WaypointOptimizationTrailerOptions>;
export interface WaypointOptimizationTruckOptions {
  GrossWeight?: number;
  HazardousCargos?: string | redacted.Redacted<string>[];
  Height?: number;
  Length?: number;
  Trailer?: WaypointOptimizationTrailerOptions;
  TruckType?: string | redacted.Redacted<string>;
  TunnelRestrictionCode?: string | redacted.Redacted<string>;
  WeightPerAxle?: number;
  Width?: number;
}
export const WaypointOptimizationTruckOptions =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      GrossWeight: S.optional(S.Number),
      HazardousCargos: S.optional(WaypointOptimizationHazardousCargoTypeList),
      Height: S.optional(S.Number),
      Length: S.optional(S.Number),
      Trailer: S.optional(WaypointOptimizationTrailerOptions),
      TruckType: S.optional(SensitiveString),
      TunnelRestrictionCode: S.optional(SensitiveString),
      WeightPerAxle: S.optional(S.Number),
      Width: S.optional(S.Number),
    }),
  ).annotate({
    identifier: "WaypointOptimizationTruckOptions",
  }) as any as S.Schema<WaypointOptimizationTruckOptions>;
export interface WaypointOptimizationTravelModeOptions {
  Pedestrian?: WaypointOptimizationPedestrianOptions;
  Truck?: WaypointOptimizationTruckOptions;
}
export const WaypointOptimizationTravelModeOptions =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      Pedestrian: S.optional(WaypointOptimizationPedestrianOptions),
      Truck: S.optional(WaypointOptimizationTruckOptions),
    }),
  ).annotate({
    identifier: "WaypointOptimizationTravelModeOptions",
  }) as any as S.Schema<WaypointOptimizationTravelModeOptions>;
export type BeforeWaypointsList = number[];
export const BeforeWaypointsList = /*@__PURE__*/ /*#__PURE__*/ S.Array(
  S.Number,
);
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
export const WaypointOptimizationWaypoint =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      AccessHours: S.optional(WaypointOptimizationAccessHours),
      AppointmentTime: S.optional(SensitiveString),
      Before: S.optional(BeforeWaypointsList),
      Heading: S.optional(S.Number),
      Id: S.optional(S.String),
      Position: Position,
      ServiceDuration: S.optional(S.Number),
      SideOfStreet: S.optional(WaypointOptimizationSideOfStreetOptions),
    }),
  ).annotate({
    identifier: "WaypointOptimizationWaypoint",
  }) as any as S.Schema<WaypointOptimizationWaypoint>;
export type WaypointOptimizationWaypointList = WaypointOptimizationWaypoint[];
export const WaypointOptimizationWaypointList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(WaypointOptimizationWaypoint);
export interface OptimizeWaypointsRequest {
  Avoid?: WaypointOptimizationAvoidanceOptions;
  Clustering?: WaypointOptimizationClusteringOptions;
  DepartureTime?: string | redacted.Redacted<string>;
  Destination?: number[];
  DestinationOptions?: WaypointOptimizationDestinationOptions;
  Driver?: WaypointOptimizationDriverOptions;
  Exclude?: WaypointOptimizationExclusionOptions;
  Key?: string | redacted.Redacted<string>;
  OptimizeSequencingFor?: string;
  Origin: number[];
  OriginOptions?: WaypointOptimizationOriginOptions;
  Traffic?: WaypointOptimizationTrafficOptions;
  TravelMode?: string;
  TravelModeOptions?: WaypointOptimizationTravelModeOptions;
  Waypoints?: WaypointOptimizationWaypoint[];
}
export const OptimizeWaypointsRequest = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Avoid: S.optional(WaypointOptimizationAvoidanceOptions),
      Clustering: S.optional(WaypointOptimizationClusteringOptions),
      DepartureTime: S.optional(SensitiveString),
      Destination: S.optional(Position),
      DestinationOptions: S.optional(WaypointOptimizationDestinationOptions),
      Driver: S.optional(WaypointOptimizationDriverOptions),
      Exclude: S.optional(WaypointOptimizationExclusionOptions),
      Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
      OptimizeSequencingFor: S.optional(S.String),
      Origin: Position,
      OriginOptions: S.optional(WaypointOptimizationOriginOptions),
      Traffic: S.optional(WaypointOptimizationTrafficOptions),
      TravelMode: S.optional(S.String),
      TravelModeOptions: S.optional(WaypointOptimizationTravelModeOptions),
      Waypoints: S.optional(WaypointOptimizationWaypointList),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/optimize-waypoints" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "OptimizeWaypointsRequest",
}) as any as S.Schema<OptimizeWaypointsRequest>;
export interface WaypointOptimizationConnection {
  Distance: number;
  From: string;
  RestDuration: number;
  To: string;
  TravelDuration: number;
  WaitDuration: number;
}
export const WaypointOptimizationConnection =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      Distance: S.Number,
      From: S.String,
      RestDuration: S.Number,
      To: S.String,
      TravelDuration: S.Number,
      WaitDuration: S.Number,
    }),
  ).annotate({
    identifier: "WaypointOptimizationConnection",
  }) as any as S.Schema<WaypointOptimizationConnection>;
export type WaypointOptimizationConnectionList =
  WaypointOptimizationConnection[];
export const WaypointOptimizationConnectionList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(WaypointOptimizationConnection);
export interface WaypointOptimizationFailedConstraint {
  Constraint?: string | redacted.Redacted<string>;
  Reason?: string | redacted.Redacted<string>;
}
export const WaypointOptimizationFailedConstraint =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      Constraint: S.optional(SensitiveString),
      Reason: S.optional(SensitiveString),
    }),
  ).annotate({
    identifier: "WaypointOptimizationFailedConstraint",
  }) as any as S.Schema<WaypointOptimizationFailedConstraint>;
export type WaypointOptimizationFailedConstraintList =
  WaypointOptimizationFailedConstraint[];
export const WaypointOptimizationFailedConstraintList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(WaypointOptimizationFailedConstraint);
export interface WaypointOptimizationImpedingWaypoint {
  FailedConstraints: WaypointOptimizationFailedConstraint[];
  Id: string;
  Position: number[];
}
export const WaypointOptimizationImpedingWaypoint =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      FailedConstraints: WaypointOptimizationFailedConstraintList,
      Id: S.String,
      Position: Position,
    }),
  ).annotate({
    identifier: "WaypointOptimizationImpedingWaypoint",
  }) as any as S.Schema<WaypointOptimizationImpedingWaypoint>;
export type WaypointOptimizationImpedingWaypointList =
  WaypointOptimizationImpedingWaypoint[];
export const WaypointOptimizationImpedingWaypointList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(WaypointOptimizationImpedingWaypoint);
export interface WaypointOptimizationOptimizedWaypoint {
  ArrivalTime?: string | redacted.Redacted<string>;
  ClusterIndex?: number;
  DepartureTime: string | redacted.Redacted<string>;
  Id: string;
  Position: number[];
}
export const WaypointOptimizationOptimizedWaypoint =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      ArrivalTime: S.optional(SensitiveString),
      ClusterIndex: S.optional(S.Number),
      DepartureTime: SensitiveString,
      Id: S.String,
      Position: Position,
    }),
  ).annotate({
    identifier: "WaypointOptimizationOptimizedWaypoint",
  }) as any as S.Schema<WaypointOptimizationOptimizedWaypoint>;
export type WaypointOptimizationOptimizedWaypointList =
  WaypointOptimizationOptimizedWaypoint[];
export const WaypointOptimizationOptimizedWaypointList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(WaypointOptimizationOptimizedWaypoint);
export interface WaypointOptimizationTimeBreakdown {
  RestDuration: number;
  ServiceDuration: number;
  TravelDuration: number;
  WaitDuration: number;
}
export const WaypointOptimizationTimeBreakdown =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      RestDuration: S.Number,
      ServiceDuration: S.Number,
      TravelDuration: S.Number,
      WaitDuration: S.Number,
    }),
  ).annotate({
    identifier: "WaypointOptimizationTimeBreakdown",
  }) as any as S.Schema<WaypointOptimizationTimeBreakdown>;
export interface OptimizeWaypointsResponse {
  Connections: WaypointOptimizationConnection[];
  Distance: number;
  Duration: number;
  ImpedingWaypoints: WaypointOptimizationImpedingWaypoint[];
  OptimizedWaypoints: WaypointOptimizationOptimizedWaypoint[];
  PricingBucket: string;
  TimeBreakdown: WaypointOptimizationTimeBreakdown;
}
export const OptimizeWaypointsResponse = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Connections: WaypointOptimizationConnectionList,
      Distance: S.Number,
      Duration: S.Number,
      ImpedingWaypoints: WaypointOptimizationImpedingWaypointList,
      OptimizedWaypoints: WaypointOptimizationOptimizedWaypointList,
      PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
      TimeBreakdown: WaypointOptimizationTimeBreakdown,
    }),
).annotate({
  identifier: "OptimizeWaypointsResponse",
}) as any as S.Schema<OptimizeWaypointsResponse>;
export interface RoadSnapTracePoint {
  Heading?: number;
  Position: number[];
  Speed?: number;
  Timestamp?: string | redacted.Redacted<string>;
}
export const RoadSnapTracePoint = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    Heading: S.optional(S.Number),
    Position: Position,
    Speed: S.optional(S.Number),
    Timestamp: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "RoadSnapTracePoint",
}) as any as S.Schema<RoadSnapTracePoint>;
export type RoadSnapTracePointList = RoadSnapTracePoint[];
export const RoadSnapTracePointList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(RoadSnapTracePoint);
export type RoadSnapHazardousCargoTypeList =
  | string
  | redacted.Redacted<string>[];
export const RoadSnapHazardousCargoTypeList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(SensitiveString);
export interface RoadSnapTrailerOptions {
  TrailerCount?: number;
}
export const RoadSnapTrailerOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () => S.Struct({ TrailerCount: S.optional(S.Number) }),
).annotate({
  identifier: "RoadSnapTrailerOptions",
}) as any as S.Schema<RoadSnapTrailerOptions>;
export interface RoadSnapTruckOptions {
  GrossWeight?: number;
  HazardousCargos?: string | redacted.Redacted<string>[];
  Height?: number;
  Length?: number;
  Trailer?: RoadSnapTrailerOptions;
  TunnelRestrictionCode?: string | redacted.Redacted<string>;
  Width?: number;
}
export const RoadSnapTruckOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    GrossWeight: S.optional(S.Number),
    HazardousCargos: S.optional(RoadSnapHazardousCargoTypeList),
    Height: S.optional(S.Number),
    Length: S.optional(S.Number),
    Trailer: S.optional(RoadSnapTrailerOptions),
    TunnelRestrictionCode: S.optional(SensitiveString),
    Width: S.optional(S.Number),
  }),
).annotate({
  identifier: "RoadSnapTruckOptions",
}) as any as S.Schema<RoadSnapTruckOptions>;
export interface RoadSnapTravelModeOptions {
  Truck?: RoadSnapTruckOptions;
}
export const RoadSnapTravelModeOptions = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () => S.Struct({ Truck: S.optional(RoadSnapTruckOptions) }),
).annotate({
  identifier: "RoadSnapTravelModeOptions",
}) as any as S.Schema<RoadSnapTravelModeOptions>;
export interface SnapToRoadsRequest {
  Key?: string | redacted.Redacted<string>;
  SnappedGeometryFormat?: string;
  SnapRadius?: number;
  TracePoints: RoadSnapTracePoint[];
  TravelMode?: string;
  TravelModeOptions?: RoadSnapTravelModeOptions;
}
export const SnapToRoadsRequest = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
    SnappedGeometryFormat: S.optional(S.String),
    SnapRadius: S.optional(S.Number),
    TracePoints: RoadSnapTracePointList,
    TravelMode: S.optional(S.String),
    TravelModeOptions: S.optional(RoadSnapTravelModeOptions),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/snap-to-roads" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SnapToRoadsRequest",
}) as any as S.Schema<SnapToRoadsRequest>;
export type RoadSnapTracePointIndexList = number[];
export const RoadSnapTracePointIndexList = /*@__PURE__*/ /*#__PURE__*/ S.Array(
  S.Number,
);
export interface RoadSnapNotice {
  Code: string | redacted.Redacted<string>;
  Title: string | redacted.Redacted<string>;
  TracePointIndexes: number[];
}
export const RoadSnapNotice = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    Code: SensitiveString,
    Title: SensitiveString,
    TracePointIndexes: RoadSnapTracePointIndexList,
  }),
).annotate({ identifier: "RoadSnapNotice" }) as any as S.Schema<RoadSnapNotice>;
export type RoadSnapNoticeList = RoadSnapNotice[];
export const RoadSnapNoticeList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(RoadSnapNotice);
export interface RoadSnapSnappedGeometry {
  LineString?: number[][];
  Polyline?: string | redacted.Redacted<string>;
}
export const RoadSnapSnappedGeometry = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      LineString: S.optional(LineString),
      Polyline: S.optional(SensitiveString),
    }),
).annotate({
  identifier: "RoadSnapSnappedGeometry",
}) as any as S.Schema<RoadSnapSnappedGeometry>;
export interface RoadSnapSnappedTracePoint {
  Confidence: number;
  OriginalPosition: number[];
  SnappedPosition: number[];
}
export const RoadSnapSnappedTracePoint = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Confidence: S.Number,
      OriginalPosition: Position,
      SnappedPosition: Position,
    }),
).annotate({
  identifier: "RoadSnapSnappedTracePoint",
}) as any as S.Schema<RoadSnapSnappedTracePoint>;
export type RoadSnapSnappedTracePointList = RoadSnapSnappedTracePoint[];
export const RoadSnapSnappedTracePointList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(RoadSnapSnappedTracePoint);
export interface SnapToRoadsResponse {
  Notices: RoadSnapNotice[];
  PricingBucket: string;
  SnappedGeometry?: RoadSnapSnappedGeometry;
  SnappedGeometryFormat: string;
  SnappedTracePoints: RoadSnapSnappedTracePoint[];
}
export const SnapToRoadsResponse = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    Notices: RoadSnapNoticeList,
    PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
    SnappedGeometry: S.optional(RoadSnapSnappedGeometry),
    SnappedGeometryFormat: S.String,
    SnappedTracePoints: RoadSnapSnappedTracePointList,
  }),
).annotate({
  identifier: "SnapToRoadsResponse",
}) as any as S.Schema<SnapToRoadsResponse>;

//# Errors
export class AccessDeniedException extends S.TaggedErrorClass<AccessDeniedException>()(
  "AccessDeniedException",
  { Message: S.String },
).pipe(C.withAuthError) {}
export class InternalServerException extends S.TaggedErrorClass<InternalServerException>()(
  "InternalServerException",
  { Message: S.String },
  T.Retryable(),
).pipe(C.withServerError, C.withRetryableError) {}
export class ThrottlingException extends S.TaggedErrorClass<ThrottlingException>()(
  "ThrottlingException",
  { Message: S.String },
  T.Retryable(),
).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException extends S.TaggedErrorClass<ValidationException>()(
  "ValidationException",
  {
    Message: S.String,
    Reason: S.String,
    FieldList: ValidationExceptionFieldList,
  },
).pipe(C.withBadRequestError) {}

//# Operations
export type CalculateIsolinesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use the `CalculateIsolines` action to find service areas that can be reached in a given threshold of time, distance.
 */
export const calculateIsolines: API.OperationMethod<
  CalculateIsolinesRequest,
  CalculateIsolinesResponse,
  CalculateIsolinesError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CalculateIsolinesRequest,
  output: CalculateIsolinesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type CalculateRouteMatrixError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use `CalculateRouteMatrix` to compute results for all pairs of Origins to Destinations. Each row corresponds to one entry in Origins. Each entry in the row corresponds to the route from that entry in Origins to an entry in Destinations positions.
 */
export const calculateRouteMatrix: API.OperationMethod<
  CalculateRouteMatrixRequest,
  CalculateRouteMatrixResponse,
  CalculateRouteMatrixError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CalculateRouteMatrixRequest,
  output: CalculateRouteMatrixResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type CalculateRoutesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * `CalculateRoutes` computes routes given the following required parameters: `Origin` and `Destination`.
 */
export const calculateRoutes: API.OperationMethod<
  CalculateRoutesRequest,
  CalculateRoutesResponse,
  CalculateRoutesError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CalculateRoutesRequest,
  output: CalculateRoutesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type OptimizeWaypointsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * `OptimizeWaypoints` calculates the optimal order to travel between a set of waypoints to minimize either the travel time or the distance travelled during the journey, based on road network restrictions and the traffic pattern data.
 */
export const optimizeWaypoints: API.OperationMethod<
  OptimizeWaypointsRequest,
  OptimizeWaypointsResponse,
  OptimizeWaypointsError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: OptimizeWaypointsRequest,
  output: OptimizeWaypointsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type SnapToRoadsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * `SnapToRoads` matches GPS trace to roads most likely traveled on.
 */
export const snapToRoads: API.OperationMethod<
  SnapToRoadsRequest,
  SnapToRoadsResponse,
  SnapToRoadsError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SnapToRoadsRequest,
  output: SnapToRoadsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
