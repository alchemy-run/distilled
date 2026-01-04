import * as S from "effect/Schema";
import * as API from "../api.ts";
import * as T from "../traits.ts";
const svc = T.AwsApiService({
  sdkId: "Geo Routes",
  serviceShapeName: "RoutesService",
});
const auth = T.AwsAuthSigv4({ name: "geo-routes" });
const ver = T.ServiceVersion("2020-11-19");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointRuleSet({
  version: "1.0",
  parameters: {
    UseDualStack: {
      builtIn: "AWS::UseDualStack",
      required: true,
      default: false,
      documentation:
        "When true, use the dual-stack endpoint. If the configured endpoint does not support dual-stack, dispatching the request MAY return an error.",
      type: "boolean",
    },
    UseFIPS: {
      builtIn: "AWS::UseFIPS",
      required: true,
      default: false,
      documentation:
        "When true, send this request to the FIPS-compliant regional endpoint. If the configured endpoint does not have a FIPS compliant endpoint, dispatching the request will return an error.",
      type: "boolean",
    },
    Endpoint: {
      builtIn: "SDK::Endpoint",
      required: false,
      documentation: "Override the endpoint used to send this request",
      type: "string",
    },
    Region: {
      builtIn: "AWS::Region",
      required: false,
      documentation: "The AWS region used to dispatch the request.",
      type: "string",
    },
  },
  rules: [
    {
      conditions: [{ fn: "isSet", argv: [{ ref: "Endpoint" }] }],
      rules: [
        {
          conditions: [
            { fn: "booleanEquals", argv: [{ ref: "UseFIPS" }, true] },
          ],
          error:
            "Invalid Configuration: FIPS and custom endpoint are not supported",
          type: "error",
        },
        {
          conditions: [],
          rules: [
            {
              conditions: [
                { fn: "booleanEquals", argv: [{ ref: "UseDualStack" }, true] },
              ],
              error:
                "Invalid Configuration: Dualstack and custom endpoint are not supported",
              type: "error",
            },
            {
              conditions: [],
              endpoint: {
                url: { ref: "Endpoint" },
                properties: {},
                headers: {},
              },
              type: "endpoint",
            },
          ],
          type: "tree",
        },
      ],
      type: "tree",
    },
    {
      conditions: [],
      rules: [
        {
          conditions: [{ fn: "isSet", argv: [{ ref: "Region" }] }],
          rules: [
            {
              conditions: [
                {
                  fn: "aws.partition",
                  argv: [{ ref: "Region" }],
                  assign: "PartitionResult",
                },
              ],
              rules: [
                {
                  conditions: [
                    {
                      fn: "stringEquals",
                      argv: [
                        {
                          fn: "getAttr",
                          argv: [{ ref: "PartitionResult" }, "name"],
                        },
                        "aws",
                      ],
                    },
                    { fn: "booleanEquals", argv: [{ ref: "UseFIPS" }, false] },
                    {
                      fn: "booleanEquals",
                      argv: [{ ref: "UseDualStack" }, false],
                    },
                  ],
                  endpoint: {
                    url: "https://routes.geo.{Region}.{PartitionResult#dnsSuffix}/v2",
                    properties: {},
                    headers: {},
                  },
                  type: "endpoint",
                },
                {
                  conditions: [
                    {
                      fn: "stringEquals",
                      argv: [
                        {
                          fn: "getAttr",
                          argv: [{ ref: "PartitionResult" }, "name"],
                        },
                        "aws",
                      ],
                    },
                    { fn: "booleanEquals", argv: [{ ref: "UseFIPS" }, true] },
                    {
                      fn: "booleanEquals",
                      argv: [{ ref: "UseDualStack" }, true],
                    },
                  ],
                  endpoint: {
                    url: "https://routes.geo-fips.{Region}.{PartitionResult#dualStackDnsSuffix}/v2",
                    properties: {},
                    headers: {},
                  },
                  type: "endpoint",
                },
                {
                  conditions: [
                    {
                      fn: "stringEquals",
                      argv: [
                        {
                          fn: "getAttr",
                          argv: [{ ref: "PartitionResult" }, "name"],
                        },
                        "aws",
                      ],
                    },
                    { fn: "booleanEquals", argv: [{ ref: "UseFIPS" }, true] },
                    {
                      fn: "booleanEquals",
                      argv: [{ ref: "UseDualStack" }, false],
                    },
                  ],
                  endpoint: {
                    url: "https://routes.geo-fips.{Region}.{PartitionResult#dnsSuffix}/v2",
                    properties: {},
                    headers: {},
                  },
                  type: "endpoint",
                },
                {
                  conditions: [
                    {
                      fn: "stringEquals",
                      argv: [
                        {
                          fn: "getAttr",
                          argv: [{ ref: "PartitionResult" }, "name"],
                        },
                        "aws",
                      ],
                    },
                    { fn: "booleanEquals", argv: [{ ref: "UseFIPS" }, false] },
                    {
                      fn: "booleanEquals",
                      argv: [{ ref: "UseDualStack" }, true],
                    },
                  ],
                  endpoint: {
                    url: "https://routes.geo.{Region}.{PartitionResult#dualStackDnsSuffix}/v2",
                    properties: {},
                    headers: {},
                  },
                  type: "endpoint",
                },
                {
                  conditions: [
                    {
                      fn: "stringEquals",
                      argv: [
                        {
                          fn: "getAttr",
                          argv: [{ ref: "PartitionResult" }, "name"],
                        },
                        "aws-us-gov",
                      ],
                    },
                    { fn: "booleanEquals", argv: [{ ref: "UseFIPS" }, false] },
                    {
                      fn: "booleanEquals",
                      argv: [{ ref: "UseDualStack" }, false],
                    },
                  ],
                  endpoint: {
                    url: "https://routes.geo.{Region}.us-gov.{PartitionResult#dnsSuffix}/v2",
                    properties: {},
                    headers: {},
                  },
                  type: "endpoint",
                },
                {
                  conditions: [
                    {
                      fn: "stringEquals",
                      argv: [
                        {
                          fn: "getAttr",
                          argv: [{ ref: "PartitionResult" }, "name"],
                        },
                        "aws-us-gov",
                      ],
                    },
                    { fn: "booleanEquals", argv: [{ ref: "UseFIPS" }, true] },
                    {
                      fn: "booleanEquals",
                      argv: [{ ref: "UseDualStack" }, true],
                    },
                  ],
                  endpoint: {
                    url: "https://routes.geo-fips.{Region}.us-gov.{PartitionResult#dualStackDnsSuffix}/v2",
                    properties: {},
                    headers: {},
                  },
                  type: "endpoint",
                },
                {
                  conditions: [
                    {
                      fn: "stringEquals",
                      argv: [
                        {
                          fn: "getAttr",
                          argv: [{ ref: "PartitionResult" }, "name"],
                        },
                        "aws-us-gov",
                      ],
                    },
                    { fn: "booleanEquals", argv: [{ ref: "UseFIPS" }, true] },
                    {
                      fn: "booleanEquals",
                      argv: [{ ref: "UseDualStack" }, false],
                    },
                  ],
                  endpoint: {
                    url: "https://routes.geo-fips.{Region}.us-gov.{PartitionResult#dnsSuffix}/v2",
                    properties: {},
                    headers: {},
                  },
                  type: "endpoint",
                },
                {
                  conditions: [
                    {
                      fn: "stringEquals",
                      argv: [
                        {
                          fn: "getAttr",
                          argv: [{ ref: "PartitionResult" }, "name"],
                        },
                        "aws-us-gov",
                      ],
                    },
                    { fn: "booleanEquals", argv: [{ ref: "UseFIPS" }, false] },
                    {
                      fn: "booleanEquals",
                      argv: [{ ref: "UseDualStack" }, true],
                    },
                  ],
                  endpoint: {
                    url: "https://routes.geo.{Region}.us-gov.{PartitionResult#dualStackDnsSuffix}/v2",
                    properties: {},
                    headers: {},
                  },
                  type: "endpoint",
                },
                {
                  conditions: [
                    { fn: "booleanEquals", argv: [{ ref: "UseFIPS" }, true] },
                    {
                      fn: "booleanEquals",
                      argv: [{ ref: "UseDualStack" }, true],
                    },
                  ],
                  rules: [
                    {
                      conditions: [
                        {
                          fn: "booleanEquals",
                          argv: [
                            true,
                            {
                              fn: "getAttr",
                              argv: [
                                { ref: "PartitionResult" },
                                "supportsFIPS",
                              ],
                            },
                          ],
                        },
                        {
                          fn: "booleanEquals",
                          argv: [
                            true,
                            {
                              fn: "getAttr",
                              argv: [
                                { ref: "PartitionResult" },
                                "supportsDualStack",
                              ],
                            },
                          ],
                        },
                      ],
                      rules: [
                        {
                          conditions: [],
                          endpoint: {
                            url: "https://geo-routes-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                            properties: {},
                            headers: {},
                          },
                          type: "endpoint",
                        },
                      ],
                      type: "tree",
                    },
                    {
                      conditions: [],
                      error:
                        "FIPS and DualStack are enabled, but this partition does not support one or both",
                      type: "error",
                    },
                  ],
                  type: "tree",
                },
                {
                  conditions: [
                    { fn: "booleanEquals", argv: [{ ref: "UseFIPS" }, true] },
                    {
                      fn: "booleanEquals",
                      argv: [{ ref: "UseDualStack" }, false],
                    },
                  ],
                  rules: [
                    {
                      conditions: [
                        {
                          fn: "booleanEquals",
                          argv: [
                            {
                              fn: "getAttr",
                              argv: [
                                { ref: "PartitionResult" },
                                "supportsFIPS",
                              ],
                            },
                            true,
                          ],
                        },
                      ],
                      rules: [
                        {
                          conditions: [],
                          endpoint: {
                            url: "https://geo-routes-fips.{Region}.{PartitionResult#dnsSuffix}",
                            properties: {},
                            headers: {},
                          },
                          type: "endpoint",
                        },
                      ],
                      type: "tree",
                    },
                    {
                      conditions: [],
                      error:
                        "FIPS is enabled but this partition does not support FIPS",
                      type: "error",
                    },
                  ],
                  type: "tree",
                },
                {
                  conditions: [
                    { fn: "booleanEquals", argv: [{ ref: "UseFIPS" }, false] },
                    {
                      fn: "booleanEquals",
                      argv: [{ ref: "UseDualStack" }, true],
                    },
                  ],
                  rules: [
                    {
                      conditions: [
                        {
                          fn: "booleanEquals",
                          argv: [
                            true,
                            {
                              fn: "getAttr",
                              argv: [
                                { ref: "PartitionResult" },
                                "supportsDualStack",
                              ],
                            },
                          ],
                        },
                      ],
                      rules: [
                        {
                          conditions: [],
                          endpoint: {
                            url: "https://geo-routes.{Region}.{PartitionResult#dualStackDnsSuffix}",
                            properties: {},
                            headers: {},
                          },
                          type: "endpoint",
                        },
                      ],
                      type: "tree",
                    },
                    {
                      conditions: [],
                      error:
                        "DualStack is enabled but this partition does not support DualStack",
                      type: "error",
                    },
                  ],
                  type: "tree",
                },
                {
                  conditions: [],
                  endpoint: {
                    url: "https://geo-routes.{Region}.{PartitionResult#dnsSuffix}",
                    properties: {},
                    headers: {},
                  },
                  type: "endpoint",
                },
              ],
              type: "tree",
            },
          ],
          type: "tree",
        },
        {
          conditions: [],
          error: "Invalid Configuration: Missing Region",
          type: "error",
        },
      ],
      type: "tree",
    },
  ],
});

//# Schemas
export const Position = S.Array(S.Number);
export const LanguageTagList = S.Array(S.String);
export const RouteLegAdditionalFeatureList = S.Array(S.String);
export const RouteSpanAdditionalFeatureList = S.Array(S.String);
export const TruckRoadTypeList = S.Array(S.String);
export const DistanceThresholdList = S.Array(S.Number);
export const TimeThresholdList = S.Array(S.Number);
export const CountryCodeList = S.Array(S.String);
export const BeforeWaypointsList = S.Array(S.Number);
export class IsolineAllowOptions extends S.Class<IsolineAllowOptions>(
  "IsolineAllowOptions",
)({ Hot: S.optional(S.Boolean), Hov: S.optional(S.Boolean) }) {}
export class IsolineGranularityOptions extends S.Class<IsolineGranularityOptions>(
  "IsolineGranularityOptions",
)({ MaxPoints: S.optional(S.Number), MaxResolution: S.optional(S.Number) }) {}
export class IsolineMatchingOptions extends S.Class<IsolineMatchingOptions>(
  "IsolineMatchingOptions",
)({
  NameHint: S.optional(S.String),
  OnRoadThreshold: S.optional(S.Number),
  Radius: S.optional(S.Number),
  Strategy: S.optional(S.String),
}) {}
export class IsolineSideOfStreetOptions extends S.Class<IsolineSideOfStreetOptions>(
  "IsolineSideOfStreetOptions",
)({ Position: Position, UseWith: S.optional(S.String) }) {}
export class IsolineOriginOptions extends S.Class<IsolineOriginOptions>(
  "IsolineOriginOptions",
)({
  AvoidActionsForDistance: S.optional(S.Number),
  Heading: S.optional(S.Number),
  Matching: S.optional(IsolineMatchingOptions),
  SideOfStreet: S.optional(IsolineSideOfStreetOptions),
}) {}
export class IsolineThresholds extends S.Class<IsolineThresholds>(
  "IsolineThresholds",
)({
  Distance: S.optional(DistanceThresholdList),
  Time: S.optional(TimeThresholdList),
}) {}
export class IsolineTrafficOptions extends S.Class<IsolineTrafficOptions>(
  "IsolineTrafficOptions",
)({
  FlowEventThresholdOverride: S.optional(S.Number),
  Usage: S.optional(S.String),
}) {}
export class RouteMatrixAllowOptions extends S.Class<RouteMatrixAllowOptions>(
  "RouteMatrixAllowOptions",
)({ Hot: S.optional(S.Boolean), Hov: S.optional(S.Boolean) }) {}
export class RouteMatrixExclusionOptions extends S.Class<RouteMatrixExclusionOptions>(
  "RouteMatrixExclusionOptions",
)({ Countries: CountryCodeList }) {}
export class RouteMatrixTrafficOptions extends S.Class<RouteMatrixTrafficOptions>(
  "RouteMatrixTrafficOptions",
)({
  FlowEventThresholdOverride: S.optional(S.Number),
  Usage: S.optional(S.String),
}) {}
export class RouteAllowOptions extends S.Class<RouteAllowOptions>(
  "RouteAllowOptions",
)({ Hot: S.optional(S.Boolean), Hov: S.optional(S.Boolean) }) {}
export class RouteExclusionOptions extends S.Class<RouteExclusionOptions>(
  "RouteExclusionOptions",
)({ Countries: CountryCodeList }) {}
export class RouteMatchingOptions extends S.Class<RouteMatchingOptions>(
  "RouteMatchingOptions",
)({
  NameHint: S.optional(S.String),
  OnRoadThreshold: S.optional(S.Number),
  Radius: S.optional(S.Number),
  Strategy: S.optional(S.String),
}) {}
export class RouteSideOfStreetOptions extends S.Class<RouteSideOfStreetOptions>(
  "RouteSideOfStreetOptions",
)({ Position: Position, UseWith: S.optional(S.String) }) {}
export class RouteOriginOptions extends S.Class<RouteOriginOptions>(
  "RouteOriginOptions",
)({
  AvoidActionsForDistance: S.optional(S.Number),
  AvoidUTurns: S.optional(S.Boolean),
  Heading: S.optional(S.Number),
  Matching: S.optional(RouteMatchingOptions),
  SideOfStreet: S.optional(RouteSideOfStreetOptions),
}) {}
export class RouteTrafficOptions extends S.Class<RouteTrafficOptions>(
  "RouteTrafficOptions",
)({
  FlowEventThresholdOverride: S.optional(S.Number),
  Usage: S.optional(S.String),
}) {}
export class RouteWaypoint extends S.Class<RouteWaypoint>("RouteWaypoint")({
  AvoidActionsForDistance: S.optional(S.Number),
  AvoidUTurns: S.optional(S.Boolean),
  Heading: S.optional(S.Number),
  Matching: S.optional(RouteMatchingOptions),
  PassThrough: S.optional(S.Boolean),
  Position: Position,
  SideOfStreet: S.optional(RouteSideOfStreetOptions),
  StopDuration: S.optional(S.Number),
}) {}
export const RouteWaypointList = S.Array(RouteWaypoint);
export class WaypointOptimizationExclusionOptions extends S.Class<WaypointOptimizationExclusionOptions>(
  "WaypointOptimizationExclusionOptions",
)({ Countries: CountryCodeList }) {}
export class WaypointOptimizationOriginOptions extends S.Class<WaypointOptimizationOriginOptions>(
  "WaypointOptimizationOriginOptions",
)({ Id: S.optional(S.String) }) {}
export class WaypointOptimizationTrafficOptions extends S.Class<WaypointOptimizationTrafficOptions>(
  "WaypointOptimizationTrafficOptions",
)({ Usage: S.optional(S.String) }) {}
export class WaypointOptimizationAccessHoursEntry extends S.Class<WaypointOptimizationAccessHoursEntry>(
  "WaypointOptimizationAccessHoursEntry",
)({ DayOfWeek: S.String, TimeOfDay: S.String }) {}
export class WaypointOptimizationAccessHours extends S.Class<WaypointOptimizationAccessHours>(
  "WaypointOptimizationAccessHours",
)({
  From: WaypointOptimizationAccessHoursEntry,
  To: WaypointOptimizationAccessHoursEntry,
}) {}
export class WaypointOptimizationSideOfStreetOptions extends S.Class<WaypointOptimizationSideOfStreetOptions>(
  "WaypointOptimizationSideOfStreetOptions",
)({ Position: Position, UseWith: S.optional(S.String) }) {}
export class WaypointOptimizationWaypoint extends S.Class<WaypointOptimizationWaypoint>(
  "WaypointOptimizationWaypoint",
)({
  AccessHours: S.optional(WaypointOptimizationAccessHours),
  AppointmentTime: S.optional(S.String),
  Before: S.optional(BeforeWaypointsList),
  Heading: S.optional(S.Number),
  Id: S.optional(S.String),
  Position: Position,
  ServiceDuration: S.optional(S.Number),
  SideOfStreet: S.optional(WaypointOptimizationSideOfStreetOptions),
}) {}
export const WaypointOptimizationWaypointList = S.Array(
  WaypointOptimizationWaypoint,
);
export class RoadSnapTracePoint extends S.Class<RoadSnapTracePoint>(
  "RoadSnapTracePoint",
)({
  Heading: S.optional(S.Number),
  Position: Position,
  Speed: S.optional(S.Number),
  Timestamp: S.optional(S.String),
}) {}
export const RoadSnapTracePointList = S.Array(RoadSnapTracePoint);
export const IsolineHazardousCargoTypeList = S.Array(S.String);
export const BoundingBox = S.Array(S.Number);
export const LinearRing = S.Array(Position);
export const LinearRings = S.Array(LinearRing);
export const RouteMatrixHazardousCargoTypeList = S.Array(S.String);
export const RouteHazardousCargoTypeList = S.Array(S.String);
export const WaypointOptimizationHazardousCargoTypeList = S.Array(S.String);
export const RoadSnapHazardousCargoTypeList = S.Array(S.String);
export class IsolineAvoidanceZoneCategory extends S.Class<IsolineAvoidanceZoneCategory>(
  "IsolineAvoidanceZoneCategory",
)({ Category: S.optional(S.String) }) {}
export const IsolineAvoidanceZoneCategoryList = S.Array(
  IsolineAvoidanceZoneCategory,
);
export class IsolineVehicleLicensePlate extends S.Class<IsolineVehicleLicensePlate>(
  "IsolineVehicleLicensePlate",
)({ LastCharacter: S.optional(S.String) }) {}
export class IsolineScooterOptions extends S.Class<IsolineScooterOptions>(
  "IsolineScooterOptions",
)({
  EngineType: S.optional(S.String),
  LicensePlate: S.optional(IsolineVehicleLicensePlate),
  MaxSpeed: S.optional(S.Number),
  Occupancy: S.optional(S.Number),
}) {}
export class RouteMatrixAvoidanceZoneCategory extends S.Class<RouteMatrixAvoidanceZoneCategory>(
  "RouteMatrixAvoidanceZoneCategory",
)({ Category: S.optional(S.String) }) {}
export const RouteMatrixAvoidanceZoneCategoryList = S.Array(
  RouteMatrixAvoidanceZoneCategory,
);
export class RouteMatrixMatchingOptions extends S.Class<RouteMatrixMatchingOptions>(
  "RouteMatrixMatchingOptions",
)({
  NameHint: S.optional(S.String),
  OnRoadThreshold: S.optional(S.Number),
  Radius: S.optional(S.Number),
  Strategy: S.optional(S.String),
}) {}
export class RouteMatrixSideOfStreetOptions extends S.Class<RouteMatrixSideOfStreetOptions>(
  "RouteMatrixSideOfStreetOptions",
)({ Position: Position, UseWith: S.optional(S.String) }) {}
export class RouteMatrixOriginOptions extends S.Class<RouteMatrixOriginOptions>(
  "RouteMatrixOriginOptions",
)({
  AvoidActionsForDistance: S.optional(S.Number),
  Heading: S.optional(S.Number),
  Matching: S.optional(RouteMatrixMatchingOptions),
  SideOfStreet: S.optional(RouteMatrixSideOfStreetOptions),
}) {}
export class RouteMatrixVehicleLicensePlate extends S.Class<RouteMatrixVehicleLicensePlate>(
  "RouteMatrixVehicleLicensePlate",
)({ LastCharacter: S.optional(S.String) }) {}
export class RouteMatrixScooterOptions extends S.Class<RouteMatrixScooterOptions>(
  "RouteMatrixScooterOptions",
)({
  LicensePlate: S.optional(RouteMatrixVehicleLicensePlate),
  MaxSpeed: S.optional(S.Number),
  Occupancy: S.optional(S.Number),
}) {}
export class RouteAvoidanceZoneCategory extends S.Class<RouteAvoidanceZoneCategory>(
  "RouteAvoidanceZoneCategory",
)({ Category: S.String }) {}
export const RouteAvoidanceZoneCategoryList = S.Array(
  RouteAvoidanceZoneCategory,
);
export class RouteDriverScheduleInterval extends S.Class<RouteDriverScheduleInterval>(
  "RouteDriverScheduleInterval",
)({ DriveDuration: S.Number, RestDuration: S.Number }) {}
export const RouteDriverScheduleIntervalList = S.Array(
  RouteDriverScheduleInterval,
);
export class RouteEmissionType extends S.Class<RouteEmissionType>(
  "RouteEmissionType",
)({ Co2EmissionClass: S.optional(S.String), Type: S.String }) {}
export class RoutePedestrianOptions extends S.Class<RoutePedestrianOptions>(
  "RoutePedestrianOptions",
)({ Speed: S.optional(S.Number) }) {}
export class RouteVehicleLicensePlate extends S.Class<RouteVehicleLicensePlate>(
  "RouteVehicleLicensePlate",
)({ LastCharacter: S.optional(S.String) }) {}
export class RouteScooterOptions extends S.Class<RouteScooterOptions>(
  "RouteScooterOptions",
)({
  EngineType: S.optional(S.String),
  LicensePlate: S.optional(RouteVehicleLicensePlate),
  MaxSpeed: S.optional(S.Number),
  Occupancy: S.optional(S.Number),
}) {}
export class WaypointOptimizationDrivingDistanceOptions extends S.Class<WaypointOptimizationDrivingDistanceOptions>(
  "WaypointOptimizationDrivingDistanceOptions",
)({ DrivingDistance: S.Number }) {}
export class WaypointOptimizationRestProfile extends S.Class<WaypointOptimizationRestProfile>(
  "WaypointOptimizationRestProfile",
)({ Profile: S.String }) {}
export class WaypointOptimizationPedestrianOptions extends S.Class<WaypointOptimizationPedestrianOptions>(
  "WaypointOptimizationPedestrianOptions",
)({ Speed: S.optional(S.Number) }) {}
export const PolylineRingList = S.Array(S.String);
export class IsolineDestinationOptions extends S.Class<IsolineDestinationOptions>(
  "IsolineDestinationOptions",
)({
  AvoidActionsForDistance: S.optional(S.Number),
  Heading: S.optional(S.Number),
  Matching: S.optional(IsolineMatchingOptions),
  SideOfStreet: S.optional(IsolineSideOfStreetOptions),
}) {}
export class RouteMatrixOrigin extends S.Class<RouteMatrixOrigin>(
  "RouteMatrixOrigin",
)({ Options: S.optional(RouteMatrixOriginOptions), Position: Position }) {}
export const RouteMatrixOriginList = S.Array(RouteMatrixOrigin);
export class RouteDestinationOptions extends S.Class<RouteDestinationOptions>(
  "RouteDestinationOptions",
)({
  AvoidActionsForDistance: S.optional(S.Number),
  AvoidUTurns: S.optional(S.Boolean),
  Heading: S.optional(S.Number),
  Matching: S.optional(RouteMatchingOptions),
  SideOfStreet: S.optional(RouteSideOfStreetOptions),
  StopDuration: S.optional(S.Number),
}) {}
export class RouteDriverOptions extends S.Class<RouteDriverOptions>(
  "RouteDriverOptions",
)({ Schedule: S.optional(RouteDriverScheduleIntervalList) }) {}
export class RouteTollOptions extends S.Class<RouteTollOptions>(
  "RouteTollOptions",
)({
  AllTransponders: S.optional(S.Boolean),
  AllVignettes: S.optional(S.Boolean),
  Currency: S.optional(S.String),
  EmissionType: S.optional(RouteEmissionType),
  VehicleCategory: S.optional(S.String),
}) {}
export class WaypointOptimizationClusteringOptions extends S.Class<WaypointOptimizationClusteringOptions>(
  "WaypointOptimizationClusteringOptions",
)({
  Algorithm: S.String,
  DrivingDistanceOptions: S.optional(
    WaypointOptimizationDrivingDistanceOptions,
  ),
}) {}
export class IsolineTrailerOptions extends S.Class<IsolineTrailerOptions>(
  "IsolineTrailerOptions",
)({ AxleCount: S.optional(S.Number), TrailerCount: S.optional(S.Number) }) {}
export class WeightPerAxleGroup extends S.Class<WeightPerAxleGroup>(
  "WeightPerAxleGroup",
)({
  Single: S.optional(S.Number),
  Tandem: S.optional(S.Number),
  Triple: S.optional(S.Number),
  Quad: S.optional(S.Number),
  Quint: S.optional(S.Number),
}) {}
export class RouteMatrixAvoidanceAreaGeometry extends S.Class<RouteMatrixAvoidanceAreaGeometry>(
  "RouteMatrixAvoidanceAreaGeometry",
)({
  BoundingBox: S.optional(BoundingBox),
  Polygon: S.optional(LinearRings),
  PolylinePolygon: S.optional(PolylineRingList),
}) {}
export class RouteMatrixAutoCircle extends S.Class<RouteMatrixAutoCircle>(
  "RouteMatrixAutoCircle",
)({ Margin: S.optional(S.Number), MaxRadius: S.optional(S.Number) }) {}
export class Circle extends S.Class<Circle>("Circle")({
  Center: Position,
  Radius: S.Number,
}) {}
export class RouteMatrixTrailerOptions extends S.Class<RouteMatrixTrailerOptions>(
  "RouteMatrixTrailerOptions",
)({ TrailerCount: S.optional(S.Number) }) {}
export const LineString = S.Array(Position);
export class Corridor extends S.Class<Corridor>("Corridor")({
  LineString: LineString,
  Radius: S.Number,
}) {}
export class PolylineCorridor extends S.Class<PolylineCorridor>(
  "PolylineCorridor",
)({ Polyline: S.String, Radius: S.Number }) {}
export class RouteAvoidanceAreaGeometry extends S.Class<RouteAvoidanceAreaGeometry>(
  "RouteAvoidanceAreaGeometry",
)({
  Corridor: S.optional(Corridor),
  BoundingBox: S.optional(BoundingBox),
  Polygon: S.optional(LinearRings),
  PolylineCorridor: S.optional(PolylineCorridor),
  PolylinePolygon: S.optional(PolylineRingList),
}) {}
export const RouteAvoidanceAreaGeometryList = S.Array(
  RouteAvoidanceAreaGeometry,
);
export class RouteTrailerOptions extends S.Class<RouteTrailerOptions>(
  "RouteTrailerOptions",
)({ AxleCount: S.optional(S.Number), TrailerCount: S.optional(S.Number) }) {}
export class WaypointOptimizationAvoidanceAreaGeometry extends S.Class<WaypointOptimizationAvoidanceAreaGeometry>(
  "WaypointOptimizationAvoidanceAreaGeometry",
)({ BoundingBox: S.optional(BoundingBox) }) {}
export class WaypointOptimizationRestCycleDurations extends S.Class<WaypointOptimizationRestCycleDurations>(
  "WaypointOptimizationRestCycleDurations",
)({ RestDuration: S.Number, WorkDuration: S.Number }) {}
export class WaypointOptimizationTrailerOptions extends S.Class<WaypointOptimizationTrailerOptions>(
  "WaypointOptimizationTrailerOptions",
)({ TrailerCount: S.optional(S.Number) }) {}
export class RoadSnapTrailerOptions extends S.Class<RoadSnapTrailerOptions>(
  "RoadSnapTrailerOptions",
)({ TrailerCount: S.optional(S.Number) }) {}
export class IsolineCarOptions extends S.Class<IsolineCarOptions>(
  "IsolineCarOptions",
)({
  EngineType: S.optional(S.String),
  LicensePlate: S.optional(IsolineVehicleLicensePlate),
  MaxSpeed: S.optional(S.Number),
  Occupancy: S.optional(S.Number),
}) {}
export class IsolineTruckOptions extends S.Class<IsolineTruckOptions>(
  "IsolineTruckOptions",
)({
  AxleCount: S.optional(S.Number),
  EngineType: S.optional(S.String),
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
  TunnelRestrictionCode: S.optional(S.String),
  WeightPerAxle: S.optional(S.Number),
  WeightPerAxleGroup: S.optional(WeightPerAxleGroup),
  Width: S.optional(S.Number),
}) {}
export class RouteMatrixAvoidanceArea extends S.Class<RouteMatrixAvoidanceArea>(
  "RouteMatrixAvoidanceArea",
)({ Geometry: RouteMatrixAvoidanceAreaGeometry }) {}
export const RouteMatrixAvoidanceAreaList = S.Array(RouteMatrixAvoidanceArea);
export class RouteMatrixDestinationOptions extends S.Class<RouteMatrixDestinationOptions>(
  "RouteMatrixDestinationOptions",
)({
  AvoidActionsForDistance: S.optional(S.Number),
  Heading: S.optional(S.Number),
  Matching: S.optional(RouteMatrixMatchingOptions),
  SideOfStreet: S.optional(RouteMatrixSideOfStreetOptions),
}) {}
export class RouteMatrixBoundaryGeometry extends S.Class<RouteMatrixBoundaryGeometry>(
  "RouteMatrixBoundaryGeometry",
)({
  AutoCircle: S.optional(RouteMatrixAutoCircle),
  Circle: S.optional(Circle),
  BoundingBox: S.optional(BoundingBox),
  Polygon: S.optional(LinearRings),
}) {}
export class RouteMatrixCarOptions extends S.Class<RouteMatrixCarOptions>(
  "RouteMatrixCarOptions",
)({
  LicensePlate: S.optional(RouteMatrixVehicleLicensePlate),
  MaxSpeed: S.optional(S.Number),
  Occupancy: S.optional(S.Number),
}) {}
export class RouteMatrixTruckOptions extends S.Class<RouteMatrixTruckOptions>(
  "RouteMatrixTruckOptions",
)({
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
  TruckType: S.optional(S.String),
  TunnelRestrictionCode: S.optional(S.String),
  WeightPerAxle: S.optional(S.Number),
  WeightPerAxleGroup: S.optional(WeightPerAxleGroup),
  Width: S.optional(S.Number),
}) {}
export class RouteAvoidanceArea extends S.Class<RouteAvoidanceArea>(
  "RouteAvoidanceArea",
)({
  Except: S.optional(RouteAvoidanceAreaGeometryList),
  Geometry: RouteAvoidanceAreaGeometry,
}) {}
export const RouteAvoidanceAreaList = S.Array(RouteAvoidanceArea);
export class RouteCarOptions extends S.Class<RouteCarOptions>(
  "RouteCarOptions",
)({
  EngineType: S.optional(S.String),
  LicensePlate: S.optional(RouteVehicleLicensePlate),
  MaxSpeed: S.optional(S.Number),
  Occupancy: S.optional(S.Number),
}) {}
export class RouteTruckOptions extends S.Class<RouteTruckOptions>(
  "RouteTruckOptions",
)({
  AxleCount: S.optional(S.Number),
  EngineType: S.optional(S.String),
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
  TruckType: S.optional(S.String),
  TunnelRestrictionCode: S.optional(S.String),
  WeightPerAxle: S.optional(S.Number),
  WeightPerAxleGroup: S.optional(WeightPerAxleGroup),
  Width: S.optional(S.Number),
}) {}
export class WaypointOptimizationAvoidanceArea extends S.Class<WaypointOptimizationAvoidanceArea>(
  "WaypointOptimizationAvoidanceArea",
)({ Geometry: WaypointOptimizationAvoidanceAreaGeometry }) {}
export const WaypointOptimizationAvoidanceAreaList = S.Array(
  WaypointOptimizationAvoidanceArea,
);
export class WaypointOptimizationRestCycles extends S.Class<WaypointOptimizationRestCycles>(
  "WaypointOptimizationRestCycles",
)({
  LongCycle: WaypointOptimizationRestCycleDurations,
  ShortCycle: WaypointOptimizationRestCycleDurations,
}) {}
export class WaypointOptimizationTruckOptions extends S.Class<WaypointOptimizationTruckOptions>(
  "WaypointOptimizationTruckOptions",
)({
  GrossWeight: S.optional(S.Number),
  HazardousCargos: S.optional(WaypointOptimizationHazardousCargoTypeList),
  Height: S.optional(S.Number),
  Length: S.optional(S.Number),
  Trailer: S.optional(WaypointOptimizationTrailerOptions),
  TruckType: S.optional(S.String),
  TunnelRestrictionCode: S.optional(S.String),
  WeightPerAxle: S.optional(S.Number),
  Width: S.optional(S.Number),
}) {}
export class RoadSnapTruckOptions extends S.Class<RoadSnapTruckOptions>(
  "RoadSnapTruckOptions",
)({
  GrossWeight: S.optional(S.Number),
  HazardousCargos: S.optional(RoadSnapHazardousCargoTypeList),
  Height: S.optional(S.Number),
  Length: S.optional(S.Number),
  Trailer: S.optional(RoadSnapTrailerOptions),
  TunnelRestrictionCode: S.optional(S.String),
  Width: S.optional(S.Number),
}) {}
export class IsolineTravelModeOptions extends S.Class<IsolineTravelModeOptions>(
  "IsolineTravelModeOptions",
)({
  Car: S.optional(IsolineCarOptions),
  Scooter: S.optional(IsolineScooterOptions),
  Truck: S.optional(IsolineTruckOptions),
}) {}
export class RouteMatrixAvoidanceOptions extends S.Class<RouteMatrixAvoidanceOptions>(
  "RouteMatrixAvoidanceOptions",
)({
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
}) {}
export class RouteMatrixDestination extends S.Class<RouteMatrixDestination>(
  "RouteMatrixDestination",
)({ Options: S.optional(RouteMatrixDestinationOptions), Position: Position }) {}
export const RouteMatrixDestinationList = S.Array(RouteMatrixDestination);
export class RouteMatrixBoundary extends S.Class<RouteMatrixBoundary>(
  "RouteMatrixBoundary",
)({
  Geometry: S.optional(RouteMatrixBoundaryGeometry),
  Unbounded: S.optional(S.Boolean),
}) {}
export class RouteMatrixTravelModeOptions extends S.Class<RouteMatrixTravelModeOptions>(
  "RouteMatrixTravelModeOptions",
)({
  Car: S.optional(RouteMatrixCarOptions),
  Scooter: S.optional(RouteMatrixScooterOptions),
  Truck: S.optional(RouteMatrixTruckOptions),
}) {}
export class RouteAvoidanceOptions extends S.Class<RouteAvoidanceOptions>(
  "RouteAvoidanceOptions",
)({
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
}) {}
export class RouteTravelModeOptions extends S.Class<RouteTravelModeOptions>(
  "RouteTravelModeOptions",
)({
  Car: S.optional(RouteCarOptions),
  Pedestrian: S.optional(RoutePedestrianOptions),
  Scooter: S.optional(RouteScooterOptions),
  Truck: S.optional(RouteTruckOptions),
}) {}
export class WaypointOptimizationAvoidanceOptions extends S.Class<WaypointOptimizationAvoidanceOptions>(
  "WaypointOptimizationAvoidanceOptions",
)({
  Areas: S.optional(WaypointOptimizationAvoidanceAreaList),
  CarShuttleTrains: S.optional(S.Boolean),
  ControlledAccessHighways: S.optional(S.Boolean),
  DirtRoads: S.optional(S.Boolean),
  Ferries: S.optional(S.Boolean),
  TollRoads: S.optional(S.Boolean),
  Tunnels: S.optional(S.Boolean),
  UTurns: S.optional(S.Boolean),
}) {}
export class WaypointOptimizationDestinationOptions extends S.Class<WaypointOptimizationDestinationOptions>(
  "WaypointOptimizationDestinationOptions",
)({
  AccessHours: S.optional(WaypointOptimizationAccessHours),
  AppointmentTime: S.optional(S.String),
  Heading: S.optional(S.Number),
  Id: S.optional(S.String),
  ServiceDuration: S.optional(S.Number),
  SideOfStreet: S.optional(WaypointOptimizationSideOfStreetOptions),
}) {}
export class WaypointOptimizationDriverOptions extends S.Class<WaypointOptimizationDriverOptions>(
  "WaypointOptimizationDriverOptions",
)({
  RestCycles: S.optional(WaypointOptimizationRestCycles),
  RestProfile: S.optional(WaypointOptimizationRestProfile),
  TreatServiceTimeAs: S.optional(S.String),
}) {}
export class WaypointOptimizationTravelModeOptions extends S.Class<WaypointOptimizationTravelModeOptions>(
  "WaypointOptimizationTravelModeOptions",
)({
  Pedestrian: S.optional(WaypointOptimizationPedestrianOptions),
  Truck: S.optional(WaypointOptimizationTruckOptions),
}) {}
export class RoadSnapTravelModeOptions extends S.Class<RoadSnapTravelModeOptions>(
  "RoadSnapTravelModeOptions",
)({ Truck: S.optional(RoadSnapTruckOptions) }) {}
export class IsolineAvoidanceAreaGeometry extends S.Class<IsolineAvoidanceAreaGeometry>(
  "IsolineAvoidanceAreaGeometry",
)({
  BoundingBox: S.optional(BoundingBox),
  Corridor: S.optional(Corridor),
  Polygon: S.optional(LinearRings),
  PolylineCorridor: S.optional(PolylineCorridor),
  PolylinePolygon: S.optional(PolylineRingList),
}) {}
export const IsolineAvoidanceAreaGeometryList = S.Array(
  IsolineAvoidanceAreaGeometry,
);
export class CalculateRouteMatrixRequest extends S.Class<CalculateRouteMatrixRequest>(
  "CalculateRouteMatrixRequest",
)(
  {
    Allow: S.optional(RouteMatrixAllowOptions),
    Avoid: S.optional(RouteMatrixAvoidanceOptions),
    DepartNow: S.optional(S.Boolean),
    DepartureTime: S.optional(S.String),
    Destinations: RouteMatrixDestinationList,
    Exclude: S.optional(RouteMatrixExclusionOptions),
    Key: S.optional(S.String).pipe(T.HttpQuery("key")),
    OptimizeRoutingFor: S.optional(S.String),
    Origins: RouteMatrixOriginList,
    RoutingBoundary: RouteMatrixBoundary,
    Traffic: S.optional(RouteMatrixTrafficOptions),
    TravelMode: S.optional(S.String),
    TravelModeOptions: S.optional(RouteMatrixTravelModeOptions),
  },
  T.all(
    T.Http({ method: "POST", uri: "/route-matrix" }),
    svc,
    auth,
    proto,
    ver,
    rules,
  ),
) {}
export class CalculateRoutesRequest extends S.Class<CalculateRoutesRequest>(
  "CalculateRoutesRequest",
)(
  {
    Allow: S.optional(RouteAllowOptions),
    ArrivalTime: S.optional(S.String),
    Avoid: S.optional(RouteAvoidanceOptions),
    DepartNow: S.optional(S.Boolean),
    DepartureTime: S.optional(S.String),
    Destination: Position,
    DestinationOptions: S.optional(RouteDestinationOptions),
    Driver: S.optional(RouteDriverOptions),
    Exclude: S.optional(RouteExclusionOptions),
    InstructionsMeasurementSystem: S.optional(S.String),
    Key: S.optional(S.String).pipe(T.HttpQuery("key")),
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
  },
  T.all(
    T.Http({ method: "POST", uri: "/routes" }),
    svc,
    auth,
    proto,
    ver,
    rules,
  ),
) {}
export class OptimizeWaypointsRequest extends S.Class<OptimizeWaypointsRequest>(
  "OptimizeWaypointsRequest",
)(
  {
    Avoid: S.optional(WaypointOptimizationAvoidanceOptions),
    Clustering: S.optional(WaypointOptimizationClusteringOptions),
    DepartureTime: S.optional(S.String),
    Destination: S.optional(Position),
    DestinationOptions: S.optional(WaypointOptimizationDestinationOptions),
    Driver: S.optional(WaypointOptimizationDriverOptions),
    Exclude: S.optional(WaypointOptimizationExclusionOptions),
    Key: S.optional(S.String).pipe(T.HttpQuery("key")),
    OptimizeSequencingFor: S.optional(S.String),
    Origin: Position,
    OriginOptions: S.optional(WaypointOptimizationOriginOptions),
    Traffic: S.optional(WaypointOptimizationTrafficOptions),
    TravelMode: S.optional(S.String),
    TravelModeOptions: S.optional(WaypointOptimizationTravelModeOptions),
    Waypoints: S.optional(WaypointOptimizationWaypointList),
  },
  T.all(
    T.Http({ method: "POST", uri: "/optimize-waypoints" }),
    svc,
    auth,
    proto,
    ver,
    rules,
  ),
) {}
export class SnapToRoadsRequest extends S.Class<SnapToRoadsRequest>(
  "SnapToRoadsRequest",
)(
  {
    Key: S.optional(S.String).pipe(T.HttpQuery("key")),
    SnappedGeometryFormat: S.optional(S.String),
    SnapRadius: S.optional(S.Number),
    TracePoints: RoadSnapTracePointList,
    TravelMode: S.optional(S.String),
    TravelModeOptions: S.optional(RoadSnapTravelModeOptions),
  },
  T.all(
    T.Http({ method: "POST", uri: "/snap-to-roads" }),
    svc,
    auth,
    proto,
    ver,
    rules,
  ),
) {}
export class IsolineAvoidanceArea extends S.Class<IsolineAvoidanceArea>(
  "IsolineAvoidanceArea",
)({
  Except: S.optional(IsolineAvoidanceAreaGeometryList),
  Geometry: IsolineAvoidanceAreaGeometry,
}) {}
export const IsolineAvoidanceAreaList = S.Array(IsolineAvoidanceArea);
export class IsolineAvoidanceOptions extends S.Class<IsolineAvoidanceOptions>(
  "IsolineAvoidanceOptions",
)({
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
}) {}
export class CalculateIsolinesRequest extends S.Class<CalculateIsolinesRequest>(
  "CalculateIsolinesRequest",
)(
  {
    Allow: S.optional(IsolineAllowOptions),
    ArrivalTime: S.optional(S.String),
    Avoid: S.optional(IsolineAvoidanceOptions),
    DepartNow: S.optional(S.Boolean),
    DepartureTime: S.optional(S.String),
    Destination: S.optional(Position),
    DestinationOptions: S.optional(IsolineDestinationOptions),
    IsolineGeometryFormat: S.optional(S.String),
    IsolineGranularity: S.optional(IsolineGranularityOptions),
    Key: S.optional(S.String).pipe(T.HttpQuery("key")),
    OptimizeIsolineFor: S.optional(S.String),
    OptimizeRoutingFor: S.optional(S.String),
    Origin: S.optional(Position),
    OriginOptions: S.optional(IsolineOriginOptions),
    Thresholds: IsolineThresholds,
    Traffic: S.optional(IsolineTrafficOptions),
    TravelMode: S.optional(S.String),
    TravelModeOptions: S.optional(IsolineTravelModeOptions),
  },
  T.all(
    T.Http({ method: "POST", uri: "/isolines" }),
    svc,
    auth,
    proto,
    ver,
    rules,
  ),
) {}
export const RoadSnapTracePointIndexList = S.Array(S.Number);
export class RouteMatrixEntry extends S.Class<RouteMatrixEntry>(
  "RouteMatrixEntry",
)({ Distance: S.Number, Duration: S.Number, Error: S.optional(S.String) }) {}
export const RouteMatrixRow = S.Array(RouteMatrixEntry);
export const RouteMatrix = S.Array(RouteMatrixRow);
export class RouteResponseNotice extends S.Class<RouteResponseNotice>(
  "RouteResponseNotice",
)({ Code: S.String, Impact: S.optional(S.String) }) {}
export const RouteResponseNoticeList = S.Array(RouteResponseNotice);
export class WaypointOptimizationConnection extends S.Class<WaypointOptimizationConnection>(
  "WaypointOptimizationConnection",
)({
  Distance: S.Number,
  From: S.String,
  RestDuration: S.Number,
  To: S.String,
  TravelDuration: S.Number,
  WaitDuration: S.Number,
}) {}
export const WaypointOptimizationConnectionList = S.Array(
  WaypointOptimizationConnection,
);
export class WaypointOptimizationOptimizedWaypoint extends S.Class<WaypointOptimizationOptimizedWaypoint>(
  "WaypointOptimizationOptimizedWaypoint",
)({
  ArrivalTime: S.optional(S.String),
  ClusterIndex: S.optional(S.Number),
  DepartureTime: S.String,
  Id: S.String,
  Position: Position,
}) {}
export const WaypointOptimizationOptimizedWaypointList = S.Array(
  WaypointOptimizationOptimizedWaypoint,
);
export class WaypointOptimizationTimeBreakdown extends S.Class<WaypointOptimizationTimeBreakdown>(
  "WaypointOptimizationTimeBreakdown",
)({
  RestDuration: S.Number,
  ServiceDuration: S.Number,
  TravelDuration: S.Number,
  WaitDuration: S.Number,
}) {}
export class RoadSnapNotice extends S.Class<RoadSnapNotice>("RoadSnapNotice")({
  Code: S.String,
  Title: S.String,
  TracePointIndexes: RoadSnapTracePointIndexList,
}) {}
export const RoadSnapNoticeList = S.Array(RoadSnapNotice);
export class RoadSnapSnappedGeometry extends S.Class<RoadSnapSnappedGeometry>(
  "RoadSnapSnappedGeometry",
)({ LineString: S.optional(LineString), Polyline: S.optional(S.String) }) {}
export class RoadSnapSnappedTracePoint extends S.Class<RoadSnapSnappedTracePoint>(
  "RoadSnapSnappedTracePoint",
)({
  Confidence: S.Number,
  OriginalPosition: Position,
  SnappedPosition: Position,
}) {}
export const RoadSnapSnappedTracePointList = S.Array(RoadSnapSnappedTracePoint);
export class CalculateRouteMatrixResponse extends S.Class<CalculateRouteMatrixResponse>(
  "CalculateRouteMatrixResponse",
)({
  ErrorCount: S.Number,
  PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
  RouteMatrix: RouteMatrix,
  RoutingBoundary: RouteMatrixBoundary,
}) {}
export class SnapToRoadsResponse extends S.Class<SnapToRoadsResponse>(
  "SnapToRoadsResponse",
)({
  Notices: RoadSnapNoticeList,
  PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
  SnappedGeometry: S.optional(RoadSnapSnappedGeometry),
  SnappedGeometryFormat: S.String,
  SnappedTracePoints: RoadSnapSnappedTracePointList,
}) {}
export class WaypointOptimizationFailedConstraint extends S.Class<WaypointOptimizationFailedConstraint>(
  "WaypointOptimizationFailedConstraint",
)({ Constraint: S.optional(S.String), Reason: S.optional(S.String) }) {}
export const WaypointOptimizationFailedConstraintList = S.Array(
  WaypointOptimizationFailedConstraint,
);
export class WaypointOptimizationImpedingWaypoint extends S.Class<WaypointOptimizationImpedingWaypoint>(
  "WaypointOptimizationImpedingWaypoint",
)({
  FailedConstraints: WaypointOptimizationFailedConstraintList,
  Id: S.String,
  Position: Position,
}) {}
export const WaypointOptimizationImpedingWaypointList = S.Array(
  WaypointOptimizationImpedingWaypoint,
);
export class RouteLegGeometry extends S.Class<RouteLegGeometry>(
  "RouteLegGeometry",
)({ LineString: S.optional(LineString), Polyline: S.optional(S.String) }) {}
export class LocalizedString extends S.Class<LocalizedString>(
  "LocalizedString",
)({ Language: S.optional(S.String), Value: S.String }) {}
export class RouteNumber extends S.Class<RouteNumber>("RouteNumber")({
  Direction: S.optional(S.String),
  Language: S.optional(S.String),
  Value: S.String,
}) {}
export const LocalizedStringList = S.Array(LocalizedString);
export const IndexList = S.Array(S.Number);
export const RouteSpanPedestrianAccessAttributeList = S.Array(S.String);
export const RouteSpanRoadAttributeList = S.Array(S.String);
export const RouteNumberList = S.Array(RouteNumber);
export const RouteSpanCarAccessAttributeList = S.Array(S.String);
export const RouteSpanScooterAccessAttributeList = S.Array(S.String);
export const RouteSpanTruckAccessAttributeList = S.Array(S.String);
export class OptimizeWaypointsResponse extends S.Class<OptimizeWaypointsResponse>(
  "OptimizeWaypointsResponse",
)({
  Connections: WaypointOptimizationConnectionList,
  Distance: S.Number,
  Duration: S.Number,
  ImpedingWaypoints: WaypointOptimizationImpedingWaypointList,
  OptimizedWaypoints: WaypointOptimizationOptimizedWaypointList,
  PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
  TimeBreakdown: WaypointOptimizationTimeBreakdown,
}) {}
export class IsolineShapeGeometry extends S.Class<IsolineShapeGeometry>(
  "IsolineShapeGeometry",
)({
  Polygon: S.optional(LinearRings),
  PolylinePolygon: S.optional(PolylineRingList),
}) {}
export const IsolineShapeGeometryList = S.Array(IsolineShapeGeometry);
export class RouteMajorRoadLabel extends S.Class<RouteMajorRoadLabel>(
  "RouteMajorRoadLabel",
)({
  RoadName: S.optional(LocalizedString),
  RouteNumber: S.optional(RouteNumber),
}) {}
export const RouteMajorRoadLabelList = S.Array(RouteMajorRoadLabel);
export class RouteFerryAfterTravelStep extends S.Class<RouteFerryAfterTravelStep>(
  "RouteFerryAfterTravelStep",
)({ Duration: S.Number, Instruction: S.optional(S.String), Type: S.String }) {}
export const RouteFerryAfterTravelStepList = S.Array(RouteFerryAfterTravelStep);
export class RouteFerryBeforeTravelStep extends S.Class<RouteFerryBeforeTravelStep>(
  "RouteFerryBeforeTravelStep",
)({ Duration: S.Number, Instruction: S.optional(S.String), Type: S.String }) {}
export const RouteFerryBeforeTravelStepList = S.Array(
  RouteFerryBeforeTravelStep,
);
export const Position23 = S.Array(S.Number);
export class RouteFerryPlace extends S.Class<RouteFerryPlace>(
  "RouteFerryPlace",
)({
  Name: S.optional(S.String),
  OriginalPosition: S.optional(Position23),
  Position: Position23,
  WaypointIndex: S.optional(S.Number),
}) {}
export class RouteFerryDeparture extends S.Class<RouteFerryDeparture>(
  "RouteFerryDeparture",
)({ Place: RouteFerryPlace, Time: S.optional(S.String) }) {}
export class RouteFerryNotice extends S.Class<RouteFerryNotice>(
  "RouteFerryNotice",
)({ Code: S.String, Impact: S.optional(S.String) }) {}
export const RouteFerryNoticeList = S.Array(RouteFerryNotice);
export class RouteFerrySpan extends S.Class<RouteFerrySpan>("RouteFerrySpan")({
  Country: S.optional(S.String),
  Distance: S.optional(S.Number),
  Duration: S.optional(S.Number),
  GeometryOffset: S.optional(S.Number),
  Names: S.optional(LocalizedStringList),
  Region: S.optional(S.String),
}) {}
export const RouteFerrySpanList = S.Array(RouteFerrySpan);
export class RouteFerryTravelStep extends S.Class<RouteFerryTravelStep>(
  "RouteFerryTravelStep",
)({
  Distance: S.optional(S.Number),
  Duration: S.Number,
  GeometryOffset: S.optional(S.Number),
  Instruction: S.optional(S.String),
  Type: S.String,
}) {}
export const RouteFerryTravelStepList = S.Array(RouteFerryTravelStep);
export class RoutePedestrianPlace extends S.Class<RoutePedestrianPlace>(
  "RoutePedestrianPlace",
)({
  Name: S.optional(S.String),
  OriginalPosition: S.optional(Position23),
  Position: Position23,
  SideOfStreet: S.optional(S.String),
  WaypointIndex: S.optional(S.Number),
}) {}
export class RoutePedestrianDeparture extends S.Class<RoutePedestrianDeparture>(
  "RoutePedestrianDeparture",
)({ Place: RoutePedestrianPlace, Time: S.optional(S.String) }) {}
export class RoutePedestrianNotice extends S.Class<RoutePedestrianNotice>(
  "RoutePedestrianNotice",
)({ Code: S.String, Impact: S.optional(S.String) }) {}
export const RoutePedestrianNoticeList = S.Array(RoutePedestrianNotice);
export class RouteVehiclePlace extends S.Class<RouteVehiclePlace>(
  "RouteVehiclePlace",
)({
  Name: S.optional(S.String),
  OriginalPosition: S.optional(Position23),
  Position: Position23,
  SideOfStreet: S.optional(S.String),
  WaypointIndex: S.optional(S.Number),
}) {}
export class RouteVehicleDeparture extends S.Class<RouteVehicleDeparture>(
  "RouteVehicleDeparture",
)({ Place: RouteVehiclePlace, Time: S.optional(S.String) }) {}
export class RouteVehicleIncident extends S.Class<RouteVehicleIncident>(
  "RouteVehicleIncident",
)({
  Description: S.optional(S.String),
  EndTime: S.optional(S.String),
  Severity: S.optional(S.String),
  StartTime: S.optional(S.String),
  Type: S.optional(S.String),
}) {}
export const RouteVehicleIncidentList = S.Array(RouteVehicleIncident);
export class RouteSpanDynamicSpeedDetails extends S.Class<RouteSpanDynamicSpeedDetails>(
  "RouteSpanDynamicSpeedDetails",
)({
  BestCaseSpeed: S.optional(S.Number),
  TurnDuration: S.optional(S.Number),
  TypicalSpeed: S.optional(S.Number),
}) {}
export class RouteSpanSpeedLimitDetails extends S.Class<RouteSpanSpeedLimitDetails>(
  "RouteSpanSpeedLimitDetails",
)({ MaxSpeed: S.optional(S.Number), Unlimited: S.optional(S.Boolean) }) {}
export class RouteVehicleSpan extends S.Class<RouteVehicleSpan>(
  "RouteVehicleSpan",
)({
  BestCaseDuration: S.optional(S.Number),
  CarAccess: S.optional(RouteSpanCarAccessAttributeList),
  Country: S.optional(S.String),
  Distance: S.optional(S.Number),
  Duration: S.optional(S.Number),
  DynamicSpeed: S.optional(RouteSpanDynamicSpeedDetails),
  FunctionalClassification: S.optional(S.Number),
  Gate: S.optional(S.String),
  GeometryOffset: S.optional(S.Number),
  Incidents: S.optional(IndexList),
  Names: S.optional(LocalizedStringList),
  Notices: S.optional(IndexList),
  RailwayCrossing: S.optional(S.String),
  Region: S.optional(S.String),
  RoadAttributes: S.optional(RouteSpanRoadAttributeList),
  RouteNumbers: S.optional(RouteNumberList),
  ScooterAccess: S.optional(RouteSpanScooterAccessAttributeList),
  SpeedLimit: S.optional(RouteSpanSpeedLimitDetails),
  TollSystems: S.optional(IndexList),
  TruckAccess: S.optional(RouteSpanTruckAccessAttributeList),
  TruckRoadTypes: S.optional(IndexList),
  TypicalDuration: S.optional(S.Number),
  Zones: S.optional(IndexList),
}) {}
export const RouteVehicleSpanList = S.Array(RouteVehicleSpan);
export class RouteTollSystem extends S.Class<RouteTollSystem>(
  "RouteTollSystem",
)({ Name: S.optional(S.String) }) {}
export const RouteTollSystemList = S.Array(RouteTollSystem);
export class RouteZone extends S.Class<RouteZone>("RouteZone")({
  Category: S.optional(S.String),
  Name: S.optional(S.String),
}) {}
export const RouteZoneList = S.Array(RouteZone);
export const RouteTollPaymentMethodList = S.Array(S.String);
export class IsolineConnectionGeometry extends S.Class<IsolineConnectionGeometry>(
  "IsolineConnectionGeometry",
)({ LineString: S.optional(LineString), Polyline: S.optional(S.String) }) {}
export class RoutePassThroughPlace extends S.Class<RoutePassThroughPlace>(
  "RoutePassThroughPlace",
)({
  OriginalPosition: S.optional(Position23),
  Position: Position23,
  WaypointIndex: S.optional(S.Number),
}) {}
export class RouteFerryOverviewSummary extends S.Class<RouteFerryOverviewSummary>(
  "RouteFerryOverviewSummary",
)({ Distance: S.Number, Duration: S.Number }) {}
export class RouteFerryTravelOnlySummary extends S.Class<RouteFerryTravelOnlySummary>(
  "RouteFerryTravelOnlySummary",
)({ Duration: S.Number }) {}
export class RoutePedestrianOverviewSummary extends S.Class<RoutePedestrianOverviewSummary>(
  "RoutePedestrianOverviewSummary",
)({ Distance: S.Number, Duration: S.Number }) {}
export class RoutePedestrianTravelOnlySummary extends S.Class<RoutePedestrianTravelOnlySummary>(
  "RoutePedestrianTravelOnlySummary",
)({ Duration: S.Number }) {}
export class RouteContinueStepDetails extends S.Class<RouteContinueStepDetails>(
  "RouteContinueStepDetails",
)({ Intersection: LocalizedStringList }) {}
export class RouteRoad extends S.Class<RouteRoad>("RouteRoad")({
  RoadName: LocalizedStringList,
  RouteNumber: RouteNumberList,
  Towards: LocalizedStringList,
  Type: S.optional(S.String),
}) {}
export class RouteKeepStepDetails extends S.Class<RouteKeepStepDetails>(
  "RouteKeepStepDetails",
)({
  Intersection: LocalizedStringList,
  SteeringDirection: S.optional(S.String),
  TurnAngle: S.optional(S.Number),
  TurnIntensity: S.optional(S.String),
}) {}
export class RouteRoundaboutEnterStepDetails extends S.Class<RouteRoundaboutEnterStepDetails>(
  "RouteRoundaboutEnterStepDetails",
)({
  Intersection: LocalizedStringList,
  SteeringDirection: S.optional(S.String),
  TurnAngle: S.optional(S.Number),
  TurnIntensity: S.optional(S.String),
}) {}
export class RouteRoundaboutExitStepDetails extends S.Class<RouteRoundaboutExitStepDetails>(
  "RouteRoundaboutExitStepDetails",
)({
  Intersection: LocalizedStringList,
  RelativeExit: S.optional(S.Number),
  RoundaboutAngle: S.optional(S.Number),
  SteeringDirection: S.optional(S.String),
}) {}
export class RouteRoundaboutPassStepDetails extends S.Class<RouteRoundaboutPassStepDetails>(
  "RouteRoundaboutPassStepDetails",
)({
  Intersection: LocalizedStringList,
  SteeringDirection: S.optional(S.String),
  TurnAngle: S.optional(S.Number),
  TurnIntensity: S.optional(S.String),
}) {}
export class RouteTurnStepDetails extends S.Class<RouteTurnStepDetails>(
  "RouteTurnStepDetails",
)({
  Intersection: LocalizedStringList,
  SteeringDirection: S.optional(S.String),
  TurnAngle: S.optional(S.Number),
  TurnIntensity: S.optional(S.String),
}) {}
export class RouteVehicleOverviewSummary extends S.Class<RouteVehicleOverviewSummary>(
  "RouteVehicleOverviewSummary",
)({
  BestCaseDuration: S.optional(S.Number),
  Distance: S.Number,
  Duration: S.Number,
  TypicalDuration: S.optional(S.Number),
}) {}
export class RouteVehicleTravelOnlySummary extends S.Class<RouteVehicleTravelOnlySummary>(
  "RouteVehicleTravelOnlySummary",
)({
  BestCaseDuration: S.optional(S.Number),
  Duration: S.Number,
  TypicalDuration: S.optional(S.Number),
}) {}
export class RouteTollPaymentSite extends S.Class<RouteTollPaymentSite>(
  "RouteTollPaymentSite",
)({ Name: S.optional(S.String), Position: Position23 }) {}
export const RouteTollPaymentSiteList = S.Array(RouteTollPaymentSite);
export class RouteContinueHighwayStepDetails extends S.Class<RouteContinueHighwayStepDetails>(
  "RouteContinueHighwayStepDetails",
)({
  Intersection: LocalizedStringList,
  SteeringDirection: S.optional(S.String),
  TurnAngle: S.optional(S.Number),
  TurnIntensity: S.optional(S.String),
}) {}
export class RouteEnterHighwayStepDetails extends S.Class<RouteEnterHighwayStepDetails>(
  "RouteEnterHighwayStepDetails",
)({
  Intersection: LocalizedStringList,
  SteeringDirection: S.optional(S.String),
  TurnAngle: S.optional(S.Number),
  TurnIntensity: S.optional(S.String),
}) {}
export class RouteExitStepDetails extends S.Class<RouteExitStepDetails>(
  "RouteExitStepDetails",
)({
  Intersection: LocalizedStringList,
  RelativeExit: S.optional(S.Number),
  SteeringDirection: S.optional(S.String),
  TurnAngle: S.optional(S.Number),
  TurnIntensity: S.optional(S.String),
}) {}
export class RouteRampStepDetails extends S.Class<RouteRampStepDetails>(
  "RouteRampStepDetails",
)({
  Intersection: LocalizedStringList,
  SteeringDirection: S.optional(S.String),
  TurnAngle: S.optional(S.Number),
  TurnIntensity: S.optional(S.String),
}) {}
export class RouteUTurnStepDetails extends S.Class<RouteUTurnStepDetails>(
  "RouteUTurnStepDetails",
)({
  Intersection: LocalizedStringList,
  SteeringDirection: S.optional(S.String),
  TurnAngle: S.optional(S.Number),
  TurnIntensity: S.optional(S.String),
}) {}
export class RouteTollPriceValueRange extends S.Class<RouteTollPriceValueRange>(
  "RouteTollPriceValueRange",
)({ Min: S.Number, Max: S.Number }) {}
export class IsolineConnection extends S.Class<IsolineConnection>(
  "IsolineConnection",
)({
  FromPolygonIndex: S.Number,
  Geometry: IsolineConnectionGeometry,
  ToPolygonIndex: S.Number,
}) {}
export const IsolineConnectionList = S.Array(IsolineConnection);
export class RouteFerryArrival extends S.Class<RouteFerryArrival>(
  "RouteFerryArrival",
)({ Place: RouteFerryPlace, Time: S.optional(S.String) }) {}
export class RoutePassThroughWaypoint extends S.Class<RoutePassThroughWaypoint>(
  "RoutePassThroughWaypoint",
)({ GeometryOffset: S.optional(S.Number), Place: RoutePassThroughPlace }) {}
export const RoutePassThroughWaypointList = S.Array(RoutePassThroughWaypoint);
export class RouteFerrySummary extends S.Class<RouteFerrySummary>(
  "RouteFerrySummary",
)({
  Overview: S.optional(RouteFerryOverviewSummary),
  TravelOnly: S.optional(RouteFerryTravelOnlySummary),
}) {}
export class RoutePedestrianArrival extends S.Class<RoutePedestrianArrival>(
  "RoutePedestrianArrival",
)({ Place: RoutePedestrianPlace, Time: S.optional(S.String) }) {}
export class RoutePedestrianSpan extends S.Class<RoutePedestrianSpan>(
  "RoutePedestrianSpan",
)({
  BestCaseDuration: S.optional(S.Number),
  Country: S.optional(S.String),
  Distance: S.optional(S.Number),
  Duration: S.optional(S.Number),
  DynamicSpeed: S.optional(RouteSpanDynamicSpeedDetails),
  FunctionalClassification: S.optional(S.Number),
  GeometryOffset: S.optional(S.Number),
  Incidents: S.optional(IndexList),
  Names: S.optional(LocalizedStringList),
  PedestrianAccess: S.optional(RouteSpanPedestrianAccessAttributeList),
  Region: S.optional(S.String),
  RoadAttributes: S.optional(RouteSpanRoadAttributeList),
  RouteNumbers: S.optional(RouteNumberList),
  SpeedLimit: S.optional(RouteSpanSpeedLimitDetails),
  TypicalDuration: S.optional(S.Number),
}) {}
export const RoutePedestrianSpanList = S.Array(RoutePedestrianSpan);
export class RoutePedestrianSummary extends S.Class<RoutePedestrianSummary>(
  "RoutePedestrianSummary",
)({
  Overview: S.optional(RoutePedestrianOverviewSummary),
  TravelOnly: S.optional(RoutePedestrianTravelOnlySummary),
}) {}
export class RouteVehicleArrival extends S.Class<RouteVehicleArrival>(
  "RouteVehicleArrival",
)({ Place: RouteVehiclePlace, Time: S.optional(S.String) }) {}
export class RouteVehicleSummary extends S.Class<RouteVehicleSummary>(
  "RouteVehicleSummary",
)({
  Overview: S.optional(RouteVehicleOverviewSummary),
  TravelOnly: S.optional(RouteVehicleTravelOnlySummary),
}) {}
export class RouteSignpostLabel extends S.Class<RouteSignpostLabel>(
  "RouteSignpostLabel",
)({
  RouteNumber: S.optional(RouteNumber),
  Text: S.optional(LocalizedString),
}) {}
export const RouteSignpostLabelList = S.Array(RouteSignpostLabel);
export class RouteSignpost extends S.Class<RouteSignpost>("RouteSignpost")({
  Labels: RouteSignpostLabelList,
}) {}
export class RouteVehicleTravelStep extends S.Class<RouteVehicleTravelStep>(
  "RouteVehicleTravelStep",
)({
  ContinueHighwayStepDetails: S.optional(RouteContinueHighwayStepDetails),
  ContinueStepDetails: S.optional(RouteContinueStepDetails),
  CurrentRoad: S.optional(RouteRoad),
  Distance: S.optional(S.Number),
  Duration: S.Number,
  EnterHighwayStepDetails: S.optional(RouteEnterHighwayStepDetails),
  ExitNumber: S.optional(LocalizedStringList),
  ExitStepDetails: S.optional(RouteExitStepDetails),
  GeometryOffset: S.optional(S.Number),
  Instruction: S.optional(S.String),
  KeepStepDetails: S.optional(RouteKeepStepDetails),
  NextRoad: S.optional(RouteRoad),
  RampStepDetails: S.optional(RouteRampStepDetails),
  RoundaboutEnterStepDetails: S.optional(RouteRoundaboutEnterStepDetails),
  RoundaboutExitStepDetails: S.optional(RouteRoundaboutExitStepDetails),
  RoundaboutPassStepDetails: S.optional(RouteRoundaboutPassStepDetails),
  Signpost: S.optional(RouteSignpost),
  TurnStepDetails: S.optional(RouteTurnStepDetails),
  Type: S.String,
  UTurnStepDetails: S.optional(RouteUTurnStepDetails),
}) {}
export const RouteVehicleTravelStepList = S.Array(RouteVehicleTravelStep);
export class RouteTollPriceSummary extends S.Class<RouteTollPriceSummary>(
  "RouteTollPriceSummary",
)({
  Currency: S.String,
  Estimate: S.Boolean,
  Range: S.Boolean,
  RangeValue: S.optional(RouteTollPriceValueRange),
  Value: S.Number,
}) {}
export class Isoline extends S.Class<Isoline>("Isoline")({
  Connections: IsolineConnectionList,
  DistanceThreshold: S.optional(S.Number),
  Geometries: IsolineShapeGeometryList,
  TimeThreshold: S.optional(S.Number),
}) {}
export const IsolineList = S.Array(Isoline);
export class RouteTollPrice extends S.Class<RouteTollPrice>("RouteTollPrice")({
  Currency: S.String,
  Estimate: S.Boolean,
  PerDuration: S.optional(S.Number),
  Range: S.Boolean,
  RangeValue: S.optional(RouteTollPriceValueRange),
  Value: S.Number,
}) {}
export class RouteTransponder extends S.Class<RouteTransponder>(
  "RouteTransponder",
)({ SystemName: S.optional(S.String) }) {}
export const RouteTransponderList = S.Array(RouteTransponder);
export class RouteFerryLegDetails extends S.Class<RouteFerryLegDetails>(
  "RouteFerryLegDetails",
)({
  AfterTravelSteps: RouteFerryAfterTravelStepList,
  Arrival: RouteFerryArrival,
  BeforeTravelSteps: RouteFerryBeforeTravelStepList,
  Departure: RouteFerryDeparture,
  Notices: RouteFerryNoticeList,
  PassThroughWaypoints: RoutePassThroughWaypointList,
  RouteName: S.optional(S.String),
  Spans: RouteFerrySpanList,
  Summary: S.optional(RouteFerrySummary),
  TravelSteps: RouteFerryTravelStepList,
}) {}
export class RouteTollSummary extends S.Class<RouteTollSummary>(
  "RouteTollSummary",
)({ Total: S.optional(RouteTollPriceSummary) }) {}
export class CalculateIsolinesResponse extends S.Class<CalculateIsolinesResponse>(
  "CalculateIsolinesResponse",
)({
  ArrivalTime: S.optional(S.String),
  DepartureTime: S.optional(S.String),
  IsolineGeometryFormat: S.String,
  Isolines: IsolineList,
  PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
  SnappedDestination: S.optional(Position),
  SnappedOrigin: S.optional(Position),
}) {}
export class RouteNoticeDetailRange extends S.Class<RouteNoticeDetailRange>(
  "RouteNoticeDetailRange",
)({ Min: S.optional(S.Number), Max: S.optional(S.Number) }) {}
export class RouteWeightConstraint extends S.Class<RouteWeightConstraint>(
  "RouteWeightConstraint",
)({ Type: S.String, Value: S.Number }) {}
export class RouteTollPassValidityPeriod extends S.Class<RouteTollPassValidityPeriod>(
  "RouteTollPassValidityPeriod",
)({ Period: S.String, PeriodCount: S.optional(S.Number) }) {}
export class RouteSummary extends S.Class<RouteSummary>("RouteSummary")({
  Distance: S.optional(S.Number),
  Duration: S.optional(S.Number),
  Tolls: S.optional(RouteTollSummary),
}) {}
export class RoutePedestrianTravelStep extends S.Class<RoutePedestrianTravelStep>(
  "RoutePedestrianTravelStep",
)({
  ContinueStepDetails: S.optional(RouteContinueStepDetails),
  CurrentRoad: S.optional(RouteRoad),
  Distance: S.optional(S.Number),
  Duration: S.Number,
  ExitNumber: S.optional(LocalizedStringList),
  GeometryOffset: S.optional(S.Number),
  Instruction: S.optional(S.String),
  KeepStepDetails: S.optional(RouteKeepStepDetails),
  NextRoad: S.optional(RouteRoad),
  RoundaboutEnterStepDetails: S.optional(RouteRoundaboutEnterStepDetails),
  RoundaboutExitStepDetails: S.optional(RouteRoundaboutExitStepDetails),
  RoundaboutPassStepDetails: S.optional(RouteRoundaboutPassStepDetails),
  Signpost: S.optional(RouteSignpost),
  TurnStepDetails: S.optional(RouteTurnStepDetails),
  Type: S.String,
}) {}
export const RoutePedestrianTravelStepList = S.Array(RoutePedestrianTravelStep);
export class RouteViolatedConstraints extends S.Class<RouteViolatedConstraints>(
  "RouteViolatedConstraints",
)({
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
  TruckType: S.optional(S.String),
  TunnelRestrictionCode: S.optional(S.String),
}) {}
export class RouteTollPass extends S.Class<RouteTollPass>("RouteTollPass")({
  IncludesReturnTrip: S.optional(S.Boolean),
  SeniorPass: S.optional(S.Boolean),
  TransferCount: S.optional(S.Number),
  TripCount: S.optional(S.Number),
  ValidityPeriod: S.optional(RouteTollPassValidityPeriod),
}) {}
export class RoutePedestrianLegDetails extends S.Class<RoutePedestrianLegDetails>(
  "RoutePedestrianLegDetails",
)({
  Arrival: RoutePedestrianArrival,
  Departure: RoutePedestrianDeparture,
  Notices: RoutePedestrianNoticeList,
  PassThroughWaypoints: RoutePassThroughWaypointList,
  Spans: RoutePedestrianSpanList,
  Summary: S.optional(RoutePedestrianSummary),
  TravelSteps: RoutePedestrianTravelStepList,
}) {}
export class RouteVehicleNoticeDetail extends S.Class<RouteVehicleNoticeDetail>(
  "RouteVehicleNoticeDetail",
)({
  Title: S.optional(S.String),
  ViolatedConstraints: S.optional(RouteViolatedConstraints),
}) {}
export const RouteVehicleNoticeDetailList = S.Array(RouteVehicleNoticeDetail);
export class RouteTollRate extends S.Class<RouteTollRate>("RouteTollRate")({
  ApplicableTimes: S.optional(S.String),
  ConvertedPrice: S.optional(RouteTollPrice),
  Id: S.String,
  LocalPrice: RouteTollPrice,
  Name: S.String,
  Pass: S.optional(RouteTollPass),
  PaymentMethods: RouteTollPaymentMethodList,
  Transponders: RouteTransponderList,
}) {}
export const RouteTollRateList = S.Array(RouteTollRate);
export class RouteVehicleNotice extends S.Class<RouteVehicleNotice>(
  "RouteVehicleNotice",
)({
  Code: S.String,
  Details: RouteVehicleNoticeDetailList,
  Impact: S.optional(S.String),
}) {}
export const RouteVehicleNoticeList = S.Array(RouteVehicleNotice);
export class RouteToll extends S.Class<RouteToll>("RouteToll")({
  Country: S.optional(S.String),
  PaymentSites: RouteTollPaymentSiteList,
  Rates: RouteTollRateList,
  Systems: IndexList,
}) {}
export const RouteTollList = S.Array(RouteToll);
export class ValidationExceptionField extends S.Class<ValidationExceptionField>(
  "ValidationExceptionField",
)({
  Name: S.String.pipe(T.JsonName("name")),
  Message: S.String.pipe(T.JsonName("message")),
}) {}
export const ValidationExceptionFieldList = S.Array(ValidationExceptionField);
export class RouteVehicleLegDetails extends S.Class<RouteVehicleLegDetails>(
  "RouteVehicleLegDetails",
)({
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
}) {}
export class RouteLeg extends S.Class<RouteLeg>("RouteLeg")({
  FerryLegDetails: S.optional(RouteFerryLegDetails),
  Geometry: RouteLegGeometry,
  Language: S.optional(S.String),
  PedestrianLegDetails: S.optional(RoutePedestrianLegDetails),
  TravelMode: S.String,
  Type: S.String,
  VehicleLegDetails: S.optional(RouteVehicleLegDetails),
}) {}
export const RouteLegList = S.Array(RouteLeg);
export class Route extends S.Class<Route>("Route")({
  Legs: RouteLegList,
  MajorRoadLabels: RouteMajorRoadLabelList,
  Summary: S.optional(RouteSummary),
}) {}
export const RouteList = S.Array(Route);
export class CalculateRoutesResponse extends S.Class<CalculateRoutesResponse>(
  "CalculateRoutesResponse",
)({
  LegGeometryFormat: S.String,
  Notices: RouteResponseNoticeList,
  PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
  Routes: RouteList,
}) {}

//# Errors
export class AccessDeniedException extends S.TaggedError<AccessDeniedException>()(
  "AccessDeniedException",
  { Message: S.String.pipe(T.JsonName("message")) },
) {}
export class InternalServerException extends S.TaggedError<InternalServerException>()(
  "InternalServerException",
  { Message: S.String.pipe(T.JsonName("message")) },
) {}
export class ThrottlingException extends S.TaggedError<ThrottlingException>()(
  "ThrottlingException",
  { Message: S.String.pipe(T.JsonName("message")) },
) {}
export class ValidationException extends S.TaggedError<ValidationException>()(
  "ValidationException",
  {
    Message: S.String.pipe(T.JsonName("message")),
    Reason: S.String.pipe(T.JsonName("reason")),
    FieldList: ValidationExceptionFieldList.pipe(T.JsonName("fieldList")),
  },
) {}

//# Operations
/**
 * Use `CalculateRouteMatrix` to compute results for all pairs of Origins to Destinations. Each row corresponds to one entry in Origins. Each entry in the row corresponds to the route from that entry in Origins to an entry in Destinations positions.
 */
export const calculateRouteMatrix = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    input: CalculateRouteMatrixRequest,
    output: CalculateRouteMatrixResponse,
    errors: [
      AccessDeniedException,
      InternalServerException,
      ThrottlingException,
      ValidationException,
    ],
  }),
);
/**
 * `OptimizeWaypoints` calculates the optimal order to travel between a set of waypoints to minimize either the travel time or the distance travelled during the journey, based on road network restrictions and the traffic pattern data.
 */
export const optimizeWaypoints = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: OptimizeWaypointsRequest,
  output: OptimizeWaypointsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * `SnapToRoads` matches GPS trace to roads most likely traveled on.
 */
export const snapToRoads = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SnapToRoadsRequest,
  output: SnapToRoadsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Use the `CalculateIsolines` action to find service areas that can be reached in a given threshold of time, distance.
 */
export const calculateIsolines = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CalculateIsolinesRequest,
  output: CalculateIsolinesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * `CalculateRoutes` computes routes given the following required parameters: `Origin` and `Destination`.
 */
export const calculateRoutes = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CalculateRoutesRequest,
  output: CalculateRoutesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
