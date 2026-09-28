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
  sdkId: "Location",
  target: "LocationService",
  version: "2020-11-19",
  sigv4: "geo",
  protocol: restJson1Protocol,
  rules: (p, _) => {
    const { Region, UseDualStack = false, UseFIPS = false, Endpoint } = p;
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
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://geo-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://geo-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://geo.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://geo.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
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
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402, renames: { Message: "message" } },
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
    readonly Reason: string;
    readonly FieldList: ValidationExceptionField[];
  }> {}
export type ResourceName = string;
export type Arn = string;
export interface AssociateTrackerConsumerRequest {
  TrackerName: string;
  ConsumerArn: string;
}
export interface AssociateTrackerConsumerResponse {}
export type Id = string;
export type DeviceIdsList = string[];
export interface BatchDeleteDevicePositionHistoryRequest {
  TrackerName: string;
  DeviceIds: string[];
}
export type BatchItemErrorCode = string;
export interface BatchItemError {
  Code?: string;
  Message?: string;
}
export interface BatchDeleteDevicePositionHistoryError_ {
  DeviceId: string;
  Error: BatchItemError;
}
export type BatchDeleteDevicePositionHistoryErrorList =
  BatchDeleteDevicePositionHistoryError_[];
export interface BatchDeleteDevicePositionHistoryResponse {
  Errors: BatchDeleteDevicePositionHistoryError_[];
}
export type IdList = string[];
export interface BatchDeleteGeofenceRequest {
  CollectionName: string;
  GeofenceIds: string[];
}
export interface BatchDeleteGeofenceError_ {
  GeofenceId: string;
  Error: BatchItemError;
}
export type BatchDeleteGeofenceErrorList = BatchDeleteGeofenceError_[];
export interface BatchDeleteGeofenceResponse {
  Errors: BatchDeleteGeofenceError_[];
}
export type Position = number[];
export type SensitiveDouble = number;
export interface PositionalAccuracy {
  Horizontal: number;
}
export type PositionPropertyMap = { [key: string]: string | undefined };
export interface DevicePositionUpdate {
  DeviceId: string;
  SampleTime: Date;
  Position: number[];
  Accuracy?: PositionalAccuracy;
  PositionProperties?: { [key: string]: string | undefined };
}
export type DevicePositionUpdateList = DevicePositionUpdate[];
export interface BatchEvaluateGeofencesRequest {
  CollectionName: string;
  DevicePositionUpdates: DevicePositionUpdate[];
}
export interface BatchEvaluateGeofencesError_ {
  DeviceId: string;
  SampleTime: Date;
  Error: BatchItemError;
}
export type BatchEvaluateGeofencesErrorList = BatchEvaluateGeofencesError_[];
export interface BatchEvaluateGeofencesResponse {
  Errors?: BatchEvaluateGeofencesError_[];
}
export interface BatchGetDevicePositionRequest {
  TrackerName: string;
  DeviceIds: string[];
}
export interface BatchGetDevicePositionError_ {
  DeviceId: string;
  Error: BatchItemError;
}
export type BatchGetDevicePositionErrorList = BatchGetDevicePositionError_[];
export interface DevicePosition {
  DeviceId?: string;
  SampleTime: Date;
  ReceivedTime: Date;
  Position: number[];
  Accuracy?: PositionalAccuracy;
  PositionProperties?: { [key: string]: string | undefined };
}
export type DevicePositionList = DevicePosition[];
export interface BatchGetDevicePositionResponse {
  Errors: BatchGetDevicePositionError_[];
  DevicePositions: DevicePosition[];
}
export type LinearRing = number[][];
export type LinearRings = number[][][];
export interface Circle {
  Center: number[];
  Radius: number;
}
export type Base64EncodedGeobuf = Uint8Array | redacted.Redacted<Uint8Array>;
export type MultiLinearRings = number[][][][];
export interface GeofenceGeometry {
  Polygon?: number[][][];
  Circle?: Circle;
  Geobuf?: Uint8Array | redacted.Redacted<Uint8Array>;
  MultiPolygon?: number[][][][];
}
export type PropertyMap = { [key: string]: string | undefined };
export interface BatchPutGeofenceRequestEntry {
  GeofenceId: string;
  Geometry: GeofenceGeometry;
  GeofenceProperties?: { [key: string]: string | undefined };
}
export type BatchPutGeofenceRequestEntryList = BatchPutGeofenceRequestEntry[];
export interface BatchPutGeofenceRequest {
  CollectionName: string;
  Entries: BatchPutGeofenceRequestEntry[];
}
export interface BatchPutGeofenceSuccess {
  GeofenceId: string;
  CreateTime: Date;
  UpdateTime: Date;
}
export type BatchPutGeofenceSuccessList = BatchPutGeofenceSuccess[];
export interface BatchPutGeofenceError_ {
  GeofenceId: string;
  Error: BatchItemError;
}
export type BatchPutGeofenceErrorList = BatchPutGeofenceError_[];
export interface BatchPutGeofenceResponse {
  Successes: BatchPutGeofenceSuccess[];
  Errors: BatchPutGeofenceError_[];
}
export interface BatchUpdateDevicePositionRequest {
  TrackerName: string;
  Updates: DevicePositionUpdate[];
}
export interface BatchUpdateDevicePositionError_ {
  DeviceId: string;
  SampleTime: Date;
  Error: BatchItemError;
}
export type BatchUpdateDevicePositionErrorList =
  BatchUpdateDevicePositionError_[];
export interface BatchUpdateDevicePositionResponse {
  Errors: BatchUpdateDevicePositionError_[];
}
export type WaypointPositionList = number[][];
export type TravelMode = string;
export type SensitiveBoolean = boolean;
export type DistanceUnit = string;
export interface CalculateRouteCarModeOptions {
  AvoidFerries?: boolean;
  AvoidTolls?: boolean;
}
export type DimensionUnit = string;
export interface TruckDimensions {
  Length?: number;
  Height?: number;
  Width?: number;
  Unit?: string;
}
export type VehicleWeightUnit = string;
export interface TruckWeight {
  Total?: number;
  Unit?: string;
}
export interface CalculateRouteTruckModeOptions {
  AvoidFerries?: boolean;
  AvoidTolls?: boolean;
  Dimensions?: TruckDimensions;
  Weight?: TruckWeight;
}
export type OptimizationMode = string;
export type ApiKey = string | redacted.Redacted<string>;
export interface CalculateRouteRequest {
  CalculatorName: string;
  DeparturePosition: number[];
  DestinationPosition: number[];
  WaypointPositions?: number[][];
  TravelMode?: string;
  DepartureTime?: Date;
  DepartNow?: boolean;
  DistanceUnit?: string;
  IncludeLegGeometry?: boolean;
  CarModeOptions?: CalculateRouteCarModeOptions;
  TruckModeOptions?: CalculateRouteTruckModeOptions;
  ArrivalTime?: Date;
  OptimizeFor?: string;
  Key?: string | redacted.Redacted<string>;
}
export type LineString = number[][];
export interface LegGeometry {
  LineString?: number[][];
}
export interface Step {
  StartPosition: number[];
  EndPosition: number[];
  Distance: number;
  DurationSeconds: number;
  GeometryOffset?: number;
}
export type StepList = Step[];
export interface Leg {
  StartPosition: number[];
  EndPosition: number[];
  Distance: number;
  DurationSeconds: number;
  Geometry?: LegGeometry;
  Steps: Step[];
}
export type LegList = Leg[];
export type BoundingBox = number[];
export interface CalculateRouteSummary {
  RouteBBox: number[];
  DataSource: string;
  Distance: number;
  DurationSeconds: number;
  DistanceUnit: string;
}
export interface CalculateRouteResponse {
  Legs: Leg[];
  Summary: CalculateRouteSummary;
}
export type PositionList = number[][];
export interface CalculateRouteMatrixRequest {
  CalculatorName: string;
  DeparturePositions: number[][];
  DestinationPositions: number[][];
  TravelMode?: string;
  DepartureTime?: Date;
  DepartNow?: boolean;
  DistanceUnit?: string;
  CarModeOptions?: CalculateRouteCarModeOptions;
  TruckModeOptions?: CalculateRouteTruckModeOptions;
  Key?: string | redacted.Redacted<string>;
}
export type RouteMatrixErrorCode = string;
export interface RouteMatrixEntryError {
  Code: string;
  Message?: string;
}
export interface RouteMatrixEntry {
  Distance?: number;
  DurationSeconds?: number;
  Error?: RouteMatrixEntryError;
}
export type RouteMatrixRow = RouteMatrixEntry[];
export type RouteMatrix = RouteMatrixEntry[][];
export interface CalculateRouteMatrixSummary {
  DataSource: string;
  RouteCount: number;
  ErrorCount: number;
  DistanceUnit: string;
}
export interface CalculateRouteMatrixResponse {
  RouteMatrix: RouteMatrixEntry[][];
  SnappedDeparturePositions?: number[][];
  SnappedDestinationPositions?: number[][];
  Summary: CalculateRouteMatrixSummary;
}
export type JobId = string;
export interface CancelJobRequest {
  JobId: string;
}
export type GeoArn = string;
export type JobStatus = string;
export interface CancelJobResponse {
  JobArn: string;
  JobId: string;
  Status: string;
}
export type PricingPlan = string;
export type ResourceDescription = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type KmsKeyId = string;
export interface CreateGeofenceCollectionRequest {
  CollectionName: string;
  PricingPlan?: string;
  PricingPlanDataSource?: string;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
  KmsKeyId?: string;
}
export interface CreateGeofenceCollectionResponse {
  CollectionName: string;
  CollectionArn: string;
  CreateTime: Date;
}
export type ApiKeyAction = string;
export type ApiKeyActionList = string[];
export type GeoArnV2 = string;
export type GeoArnList = string[];
export type RefererPattern = string | redacted.Redacted<string>;
export type RefererPatternList = (string | redacted.Redacted<string>)[];
export type AndroidPackageName = string;
export type Sha1CertificateFingerprint = string;
export interface AndroidApp {
  Package: string;
  CertificateFingerprint: string;
}
export type AndroidAppList = AndroidApp[];
export type AppleBundleId = string;
export interface AppleApp {
  BundleId: string;
}
export type AppleAppList = AppleApp[];
export interface ApiKeyRestrictions {
  AllowActions: string[];
  AllowResources: string[];
  AllowReferers?: (string | redacted.Redacted<string>)[];
  AllowAndroidApps?: AndroidApp[];
  AllowAppleApps?: AppleApp[];
}
export interface CreateKeyRequest {
  KeyName: string;
  Restrictions: ApiKeyRestrictions;
  Description?: string;
  ExpireTime?: Date;
  NoExpiry?: boolean;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateKeyResponse {
  Key: string | redacted.Redacted<string>;
  KeyArn: string;
  KeyName: string;
  CreateTime: Date;
}
export type MapStyle = string;
export type CountryCode3 = string | redacted.Redacted<string>;
export type CustomLayer = string;
export type CustomLayerList = string[];
export interface MapConfiguration {
  Style: string;
  PoliticalView?: string | redacted.Redacted<string>;
  CustomLayers?: string[];
}
export interface CreateMapRequest {
  MapName: string;
  Configuration: MapConfiguration;
  PricingPlan?: string;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateMapResponse {
  MapName: string;
  MapArn: string;
  CreateTime: Date;
}
export type IntendedUse = string;
export interface DataSourceConfiguration {
  IntendedUse?: string;
}
export interface CreatePlaceIndexRequest {
  IndexName: string;
  DataSource: string;
  PricingPlan?: string;
  Description?: string;
  DataSourceConfiguration?: DataSourceConfiguration;
  Tags?: { [key: string]: string | undefined };
}
export interface CreatePlaceIndexResponse {
  IndexName: string;
  IndexArn: string;
  CreateTime: Date;
}
export interface CreateRouteCalculatorRequest {
  CalculatorName: string;
  DataSource: string;
  PricingPlan?: string;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateRouteCalculatorResponse {
  CalculatorName: string;
  CalculatorArn: string;
  CreateTime: Date;
}
export type PositionFiltering = string;
export interface CreateTrackerRequest {
  TrackerName: string;
  PricingPlan?: string;
  KmsKeyId?: string;
  PricingPlanDataSource?: string;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
  PositionFiltering?: string;
  EventBridgeEnabled?: boolean;
  KmsKeyEnableGeospatialQueries?: boolean;
}
export interface CreateTrackerResponse {
  TrackerName: string;
  TrackerArn: string;
  CreateTime: Date;
}
export interface DeleteGeofenceCollectionRequest {
  CollectionName: string;
}
export interface DeleteGeofenceCollectionResponse {}
export interface DeleteKeyRequest {
  KeyName: string;
  ForceDelete?: boolean;
}
export interface DeleteKeyResponse {}
export interface DeleteMapRequest {
  MapName: string;
}
export interface DeleteMapResponse {}
export interface DeletePlaceIndexRequest {
  IndexName: string;
}
export interface DeletePlaceIndexResponse {}
export interface DeleteRouteCalculatorRequest {
  CalculatorName: string;
}
export interface DeleteRouteCalculatorResponse {}
export interface DeleteTrackerRequest {
  TrackerName: string;
}
export interface DeleteTrackerResponse {}
export interface DescribeGeofenceCollectionRequest {
  CollectionName: string;
}
export interface DescribeGeofenceCollectionResponse {
  CollectionName: string;
  CollectionArn: string;
  Description?: string;
  PricingPlan?: string;
  PricingPlanDataSource?: string;
  KmsKeyId?: string;
  Tags?: { [key: string]: string | undefined };
  CreateTime: Date;
  UpdateTime: Date;
  GeofenceCount?: number;
}
export interface DescribeKeyRequest {
  KeyName: string;
}
export interface DescribeKeyResponse {
  Key: string | redacted.Redacted<string>;
  KeyArn: string;
  KeyName: string;
  Restrictions: ApiKeyRestrictions;
  CreateTime: Date;
  ExpireTime: Date;
  UpdateTime: Date;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface DescribeMapRequest {
  MapName: string;
}
export interface DescribeMapResponse {
  MapName: string;
  MapArn: string;
  PricingPlan?: string;
  DataSource: string;
  Configuration: MapConfiguration;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
  CreateTime: Date;
  UpdateTime: Date;
}
export interface DescribePlaceIndexRequest {
  IndexName: string;
}
export interface DescribePlaceIndexResponse {
  IndexName: string;
  IndexArn: string;
  PricingPlan?: string;
  Description?: string;
  CreateTime: Date;
  UpdateTime: Date;
  DataSource: string;
  DataSourceConfiguration: DataSourceConfiguration;
  Tags?: { [key: string]: string | undefined };
}
export interface DescribeRouteCalculatorRequest {
  CalculatorName: string;
}
export interface DescribeRouteCalculatorResponse {
  CalculatorName: string;
  CalculatorArn: string;
  PricingPlan?: string;
  Description?: string;
  CreateTime: Date;
  UpdateTime: Date;
  DataSource: string;
  Tags?: { [key: string]: string | undefined };
}
export interface DescribeTrackerRequest {
  TrackerName: string;
}
export interface DescribeTrackerResponse {
  TrackerName: string;
  TrackerArn: string;
  Description?: string;
  PricingPlan?: string;
  PricingPlanDataSource?: string;
  Tags?: { [key: string]: string | undefined };
  CreateTime: Date;
  UpdateTime: Date;
  KmsKeyId?: string;
  PositionFiltering?: string;
  EventBridgeEnabled?: boolean;
  KmsKeyEnableGeospatialQueries?: boolean;
}
export interface DisassociateTrackerConsumerRequest {
  TrackerName: string;
  ConsumerArn: string;
}
export interface DisassociateTrackerConsumerResponse {}
export interface ForecastGeofenceEventsDeviceState {
  Position: number[];
  Speed?: number;
}
export type SpeedUnit = string;
export type LargeToken = string;
export interface ForecastGeofenceEventsRequest {
  CollectionName: string;
  DeviceState: ForecastGeofenceEventsDeviceState;
  TimeHorizonMinutes?: number;
  DistanceUnit?: string;
  SpeedUnit?: string;
  NextToken?: string;
  MaxResults?: number;
}
export type Uuid = string;
export type NearestDistance = number;
export type ForecastedGeofenceEventType = string;
export interface ForecastedEvent {
  EventId: string;
  GeofenceId: string;
  IsDeviceInGeofence: boolean;
  NearestDistance: number;
  EventType: string;
  ForecastedBreachTime?: Date;
  GeofenceProperties?: { [key: string]: string | undefined };
}
export type ForecastedEventsList = ForecastedEvent[];
export interface ForecastGeofenceEventsResponse {
  ForecastedEvents: ForecastedEvent[];
  NextToken?: string;
  DistanceUnit: string;
  SpeedUnit: string;
}
export interface GetDevicePositionRequest {
  TrackerName: string;
  DeviceId: string;
}
export interface GetDevicePositionResponse {
  DeviceId?: string;
  SampleTime: Date;
  ReceivedTime: Date;
  Position: number[];
  Accuracy?: PositionalAccuracy;
  PositionProperties?: { [key: string]: string | undefined };
}
export type Token = string;
export interface GetDevicePositionHistoryRequest {
  TrackerName: string;
  DeviceId: string;
  NextToken?: string;
  StartTimeInclusive?: Date;
  EndTimeExclusive?: Date;
  MaxResults?: number;
}
export interface GetDevicePositionHistoryResponse {
  DevicePositions: DevicePosition[];
  NextToken?: string;
}
export interface GetGeofenceRequest {
  CollectionName: string;
  GeofenceId: string;
}
export interface GetGeofenceResponse {
  GeofenceId: string;
  Geometry: GeofenceGeometry;
  Status: string;
  CreateTime: Date;
  UpdateTime: Date;
  GeofenceProperties?: { [key: string]: string | undefined };
}
export interface GetJobRequest {
  JobId: string;
}
export type JobAction = string;
export type ValidateAddressAdditionalFeature = string;
export type ValidateAddressAdditionalFeatureList = string[];
export interface ValidateAddressActionOptions {
  AdditionalFeatures?: string[];
}
export interface JobActionOptions {
  ValidateAddress?: ValidateAddressActionOptions;
}
export type JobErrorCode = string;
export type JobErrorMessage = string;
export type JobErrorMessagesList = string[];
export interface JobError {
  Code: string;
  Messages?: string[];
}
export type IamRoleArn = string;
export type JobInputLocation = string;
export type JobInputFormat = string;
export interface JobInputOptions {
  Location: string;
  Format: string;
}
export type JobOutputFormat = string;
export type JobOutputLocation = string;
export interface JobOutputOptions {
  Format: string;
  Location: string;
}
export interface GetJobResponse {
  Action: string;
  ActionOptions?: JobActionOptions;
  CreatedAt: Date;
  EndedAt?: Date;
  Error?: JobError;
  ExecutionRoleArn: string;
  InputOptions: JobInputOptions;
  JobArn: string;
  JobId: string;
  Name?: string;
  OutputOptions: JobOutputOptions;
  Status: string;
  UpdatedAt: Date;
  Tags?: { [key: string]: string | undefined };
}
export interface GetMapGlyphsRequest {
  MapName: string;
  FontStack: string;
  FontUnicodeRange: string;
  Key?: string | redacted.Redacted<string>;
}
export interface GetMapGlyphsResponse {
  Blob?: Uint8Array;
  ContentType?: string;
  CacheControl?: string;
}
export interface GetMapSpritesRequest {
  MapName: string;
  FileName: string;
  Key?: string | redacted.Redacted<string>;
}
export interface GetMapSpritesResponse {
  Blob?: Uint8Array;
  ContentType?: string;
  CacheControl?: string;
}
export interface GetMapStyleDescriptorRequest {
  MapName: string;
  Key?: string | redacted.Redacted<string>;
}
export interface GetMapStyleDescriptorResponse {
  Blob?: Uint8Array;
  ContentType?: string;
  CacheControl?: string;
}
export type SensitiveString = string | redacted.Redacted<string>;
export interface GetMapTileRequest {
  MapName: string;
  Z: string | redacted.Redacted<string>;
  X: string | redacted.Redacted<string>;
  Y: string | redacted.Redacted<string>;
  Key?: string | redacted.Redacted<string>;
}
export interface GetMapTileResponse {
  Blob?: Uint8Array;
  ContentType?: string;
  CacheControl?: string;
}
export type PlaceId = string | redacted.Redacted<string>;
export type LanguageTag = string;
export interface GetPlaceRequest {
  IndexName: string;
  PlaceId: string | redacted.Redacted<string>;
  Language?: string;
  Key?: string | redacted.Redacted<string>;
}
export interface PlaceGeometry {
  Point?: number[];
}
export type SensitiveInteger = number;
export interface TimeZone {
  Name: string | redacted.Redacted<string>;
  Offset?: number;
}
export type PlaceCategory = string | redacted.Redacted<string>;
export type PlaceCategoryList = (string | redacted.Redacted<string>)[];
export type PlaceSupplementalCategory = string | redacted.Redacted<string>;
export type PlaceSupplementalCategoryList = (
  | string
  | redacted.Redacted<string>
)[];
export interface Place {
  Label?: string | redacted.Redacted<string>;
  Geometry: PlaceGeometry;
  AddressNumber?: string | redacted.Redacted<string>;
  Street?: string | redacted.Redacted<string>;
  Neighborhood?: string | redacted.Redacted<string>;
  Municipality?: string | redacted.Redacted<string>;
  SubRegion?: string | redacted.Redacted<string>;
  Region?: string | redacted.Redacted<string>;
  Country?: string | redacted.Redacted<string>;
  PostalCode?: string | redacted.Redacted<string>;
  Interpolated?: boolean;
  TimeZone?: TimeZone;
  UnitType?: string | redacted.Redacted<string>;
  UnitNumber?: string | redacted.Redacted<string>;
  Categories?: (string | redacted.Redacted<string>)[];
  SupplementalCategories?: (string | redacted.Redacted<string>)[];
  SubMunicipality?: string | redacted.Redacted<string>;
}
export interface GetPlaceResponse {
  Place: Place;
}
export interface TrackingFilterGeometry {
  Polygon?: number[][][];
}
export interface ListDevicePositionsRequest {
  TrackerName: string;
  MaxResults?: number;
  NextToken?: string;
  FilterGeometry?: TrackingFilterGeometry;
}
export interface ListDevicePositionsResponseEntry {
  DeviceId: string;
  SampleTime: Date;
  Position: number[];
  Accuracy?: PositionalAccuracy;
  PositionProperties?: { [key: string]: string | undefined };
}
export type ListDevicePositionsResponseEntryList =
  ListDevicePositionsResponseEntry[];
export interface ListDevicePositionsResponse {
  Entries: ListDevicePositionsResponseEntry[];
  NextToken?: string;
}
export interface ListGeofenceCollectionsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface ListGeofenceCollectionsResponseEntry {
  CollectionName: string;
  Description?: string;
  PricingPlan?: string;
  PricingPlanDataSource?: string;
  CreateTime: Date;
  UpdateTime: Date;
}
export type ListGeofenceCollectionsResponseEntryList =
  ListGeofenceCollectionsResponseEntry[];
export interface ListGeofenceCollectionsResponse {
  Entries: ListGeofenceCollectionsResponseEntry[];
  NextToken?: string;
}
export interface ListGeofencesRequest {
  CollectionName: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListGeofenceResponseEntry {
  GeofenceId: string;
  Geometry: GeofenceGeometry;
  Status: string;
  CreateTime: Date;
  UpdateTime: Date;
  GeofenceProperties?: { [key: string]: string | undefined };
}
export type ListGeofenceResponseEntryList = ListGeofenceResponseEntry[];
export interface ListGeofencesResponse {
  Entries: ListGeofenceResponseEntry[];
  NextToken?: string;
}
export interface JobsFilter {
  JobStatus?: string;
}
export interface ListJobsRequest {
  Filter?: JobsFilter;
  MaxResults?: number;
  NextToken?: string;
}
export interface ListJobsResponseEntry {
  Action: string;
  ActionOptions?: JobActionOptions;
  CreatedAt: Date;
  ExecutionRoleArn: string;
  EndedAt?: Date;
  Error?: JobError;
  InputOptions: JobInputOptions;
  JobId: string;
  JobArn: string;
  Name?: string;
  OutputOptions: JobOutputOptions;
  Status: string;
  UpdatedAt: Date;
}
export type ListJobsResponseEntryList = ListJobsResponseEntry[];
export interface ListJobsResponse {
  Entries: ListJobsResponseEntry[];
  NextToken?: string;
}
export type Status = string;
export interface ApiKeyFilter {
  KeyStatus?: string;
}
export interface ListKeysRequest {
  MaxResults?: number;
  NextToken?: string;
  Filter?: ApiKeyFilter;
}
export interface ListKeysResponseEntry {
  KeyName: string;
  ExpireTime: Date;
  Description?: string;
  Restrictions: ApiKeyRestrictions;
  CreateTime: Date;
  UpdateTime: Date;
}
export type ListKeysResponseEntryList = ListKeysResponseEntry[];
export interface ListKeysResponse {
  Entries: ListKeysResponseEntry[];
  NextToken?: string;
}
export interface ListMapsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface ListMapsResponseEntry {
  MapName: string;
  Description?: string;
  DataSource: string;
  PricingPlan?: string;
  CreateTime: Date;
  UpdateTime: Date;
}
export type ListMapsResponseEntryList = ListMapsResponseEntry[];
export interface ListMapsResponse {
  Entries: ListMapsResponseEntry[];
  NextToken?: string;
}
export interface ListPlaceIndexesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface ListPlaceIndexesResponseEntry {
  IndexName: string;
  Description?: string;
  DataSource: string;
  PricingPlan?: string;
  CreateTime: Date;
  UpdateTime: Date;
}
export type ListPlaceIndexesResponseEntryList = ListPlaceIndexesResponseEntry[];
export interface ListPlaceIndexesResponse {
  Entries: ListPlaceIndexesResponseEntry[];
  NextToken?: string;
}
export interface ListRouteCalculatorsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface ListRouteCalculatorsResponseEntry {
  CalculatorName: string;
  Description?: string;
  DataSource: string;
  PricingPlan?: string;
  CreateTime: Date;
  UpdateTime: Date;
}
export type ListRouteCalculatorsResponseEntryList =
  ListRouteCalculatorsResponseEntry[];
export interface ListRouteCalculatorsResponse {
  Entries: ListRouteCalculatorsResponseEntry[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface ListTrackerConsumersRequest {
  TrackerName: string;
  MaxResults?: number;
  NextToken?: string;
}
export type ArnList = string[];
export interface ListTrackerConsumersResponse {
  ConsumerArns: string[];
  NextToken?: string;
}
export interface ListTrackersRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface ListTrackersResponseEntry {
  TrackerName: string;
  Description?: string;
  PricingPlan?: string;
  PricingPlanDataSource?: string;
  CreateTime: Date;
  UpdateTime: Date;
}
export type ListTrackersResponseEntryList = ListTrackersResponseEntry[];
export interface ListTrackersResponse {
  Entries: ListTrackersResponseEntry[];
  NextToken?: string;
}
export interface PutGeofenceRequest {
  CollectionName: string;
  GeofenceId: string;
  Geometry: GeofenceGeometry;
  GeofenceProperties?: { [key: string]: string | undefined };
}
export interface PutGeofenceResponse {
  GeofenceId: string;
  CreateTime: Date;
  UpdateTime: Date;
}
export type PlaceIndexSearchResultLimit = number;
export interface SearchPlaceIndexForPositionRequest {
  IndexName: string;
  Position: number[];
  MaxResults?: number;
  Language?: string;
  Key?: string | redacted.Redacted<string>;
}
export interface SearchPlaceIndexForPositionSummary {
  Position: number[];
  MaxResults?: number;
  DataSource: string;
  Language?: string;
}
export interface SearchForPositionResult {
  Place: Place;
  Distance: number;
  PlaceId?: string | redacted.Redacted<string>;
}
export type SearchForPositionResultList = SearchForPositionResult[];
export interface SearchPlaceIndexForPositionResponse {
  Summary: SearchPlaceIndexForPositionSummary;
  Results: SearchForPositionResult[];
}
export type CountryCodeList = (string | redacted.Redacted<string>)[];
export type FilterPlaceCategoryList = (string | redacted.Redacted<string>)[];
export interface SearchPlaceIndexForSuggestionsRequest {
  IndexName: string;
  Text: string | redacted.Redacted<string>;
  BiasPosition?: number[];
  FilterBBox?: number[];
  FilterCountries?: (string | redacted.Redacted<string>)[];
  MaxResults?: number;
  Language?: string;
  FilterCategories?: (string | redacted.Redacted<string>)[];
  Key?: string | redacted.Redacted<string>;
}
export interface SearchPlaceIndexForSuggestionsSummary {
  Text: string | redacted.Redacted<string>;
  BiasPosition?: number[];
  FilterBBox?: number[];
  FilterCountries?: (string | redacted.Redacted<string>)[];
  MaxResults?: number;
  DataSource: string;
  Language?: string;
  FilterCategories?: (string | redacted.Redacted<string>)[];
}
export interface SearchForSuggestionsResult {
  Text: string | redacted.Redacted<string>;
  PlaceId?: string | redacted.Redacted<string>;
  Categories?: (string | redacted.Redacted<string>)[];
  SupplementalCategories?: (string | redacted.Redacted<string>)[];
}
export type SearchForSuggestionsResultList = SearchForSuggestionsResult[];
export interface SearchPlaceIndexForSuggestionsResponse {
  Summary: SearchPlaceIndexForSuggestionsSummary;
  Results: SearchForSuggestionsResult[];
}
export interface SearchPlaceIndexForTextRequest {
  IndexName: string;
  Text: string | redacted.Redacted<string>;
  BiasPosition?: number[];
  FilterBBox?: number[];
  FilterCountries?: (string | redacted.Redacted<string>)[];
  MaxResults?: number;
  Language?: string;
  FilterCategories?: (string | redacted.Redacted<string>)[];
  Key?: string | redacted.Redacted<string>;
}
export interface SearchPlaceIndexForTextSummary {
  Text: string | redacted.Redacted<string>;
  BiasPosition?: number[];
  FilterBBox?: number[];
  FilterCountries?: (string | redacted.Redacted<string>)[];
  MaxResults?: number;
  ResultBBox?: number[];
  DataSource: string;
  Language?: string;
  FilterCategories?: (string | redacted.Redacted<string>)[];
}
export interface SearchForTextResult {
  Place: Place;
  Distance?: number;
  Relevance?: number;
  PlaceId?: string | redacted.Redacted<string>;
}
export type SearchForTextResultList = SearchForTextResult[];
export interface SearchPlaceIndexForTextResponse {
  Summary: SearchPlaceIndexForTextSummary;
  Results: SearchForTextResult[];
}
export type ClientToken = string;
export interface StartJobRequest {
  ClientToken?: string;
  Action: string;
  ActionOptions?: JobActionOptions;
  ExecutionRoleArn: string;
  InputOptions: JobInputOptions;
  Name?: string;
  OutputOptions: JobOutputOptions;
  Tags?: { [key: string]: string | undefined };
}
export interface StartJobResponse {
  CreatedAt: Date;
  JobArn: string;
  JobId: string;
  Status: string;
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeys = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateGeofenceCollectionRequest {
  CollectionName: string;
  PricingPlan?: string;
  PricingPlanDataSource?: string;
  Description?: string;
}
export interface UpdateGeofenceCollectionResponse {
  CollectionName: string;
  CollectionArn: string;
  UpdateTime: Date;
}
export interface UpdateKeyRequest {
  KeyName: string;
  Description?: string;
  ExpireTime?: Date;
  NoExpiry?: boolean;
  ForceUpdate?: boolean;
  Restrictions?: ApiKeyRestrictions;
}
export interface UpdateKeyResponse {
  KeyArn: string;
  KeyName: string;
  UpdateTime: Date;
}
export type CountryCode3OrEmpty = string | redacted.Redacted<string>;
export interface MapConfigurationUpdate {
  PoliticalView?: string | redacted.Redacted<string>;
  CustomLayers?: string[];
}
export interface UpdateMapRequest {
  MapName: string;
  PricingPlan?: string;
  Description?: string;
  ConfigurationUpdate?: MapConfigurationUpdate;
}
export interface UpdateMapResponse {
  MapName: string;
  MapArn: string;
  UpdateTime: Date;
}
export interface UpdatePlaceIndexRequest {
  IndexName: string;
  PricingPlan?: string;
  Description?: string;
  DataSourceConfiguration?: DataSourceConfiguration;
}
export interface UpdatePlaceIndexResponse {
  IndexName: string;
  IndexArn: string;
  UpdateTime: Date;
}
export interface UpdateRouteCalculatorRequest {
  CalculatorName: string;
  PricingPlan?: string;
  Description?: string;
}
export interface UpdateRouteCalculatorResponse {
  CalculatorName: string;
  CalculatorArn: string;
  UpdateTime: Date;
}
export interface UpdateTrackerRequest {
  TrackerName: string;
  PricingPlan?: string;
  PricingPlanDataSource?: string;
  Description?: string;
  PositionFiltering?: string;
  EventBridgeEnabled?: boolean;
  KmsKeyEnableGeospatialQueries?: boolean;
}
export interface UpdateTrackerResponse {
  TrackerName: string;
  TrackerArn: string;
  UpdateTime: Date;
}
export interface WiFiAccessPoint {
  MacAddress: string;
  Rss: number;
}
export type WiFiAccessPointList = WiFiAccessPoint[];
export type EutranCellId = number;
export type Earfcn = number;
export type Pci = number;
export interface LteLocalId {
  Earfcn: number;
  Pci: number;
}
export type Rsrp = number;
export type Rsrq = number;
export interface LteNetworkMeasurements {
  Earfcn: number;
  CellId: number;
  Pci: number;
  Rsrp?: number;
  Rsrq?: number;
}
export type LteNetworkMeasurementsList = LteNetworkMeasurements[];
export interface LteCellDetails {
  CellId: number;
  Mcc: number;
  Mnc: number;
  LocalId?: LteLocalId;
  NetworkMeasurements?: LteNetworkMeasurements[];
  TimingAdvance?: number;
  NrCapable?: boolean;
  Rsrp?: number;
  Rsrq?: number;
  Tac?: number;
}
export type LteCellDetailsList = LteCellDetails[];
export interface CellSignals {
  LteCellDetails: LteCellDetails[];
}
export interface DeviceState {
  DeviceId: string;
  SampleTime: Date;
  Position: number[];
  Accuracy?: PositionalAccuracy;
  Ipv4Address?: string;
  WiFiAccessPoints?: WiFiAccessPoint[];
  CellSignals?: CellSignals;
}
export interface VerifyDevicePositionRequest {
  TrackerName: string;
  DeviceState: DeviceState;
  DistanceUnit?: string;
}
export interface InferredState {
  Position?: number[];
  Accuracy?: PositionalAccuracy;
  DeviationDistance?: number;
  ProxyDetected: boolean;
}
export interface VerifyDevicePositionResponse {
  InferredState: InferredState;
  DeviceId: string;
  SampleTime: Date;
  ReceivedTime: Date;
  DistanceUnit: string;
}
export type ValidationExceptionReason = string;
export interface ValidationExceptionField {
  Name: string;
  Message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type AssociateTrackerConsumerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an association between a geofence collection and a tracker resource. This allows the tracker resource to communicate location data to the linked geofence collection.
 *
 * You can associate up to five geofence collections to each tracker resource.
 *
 * Currently not supported — Cross-account configurations, such as creating associations between a tracker resource in one account and a geofence collection in another account.
 */
export const associateTrackerConsumer: API.OperationMethod<
  AssociateTrackerConsumerRequest,
  AssociateTrackerConsumerResponse,
  AssociateTrackerConsumerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tracking/v0/trackers/{TrackerName}/consumers",
    input: { TrackerName: 0, ConsumerArn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateTrackerConsumer",
  endpointHostPrefix: "cp.tracking.",
})) as any;

export type BatchDeleteDevicePositionHistoryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the position history of one or more devices from a tracker resource.
 */
export const batchDeleteDevicePositionHistory: API.OperationMethod<
  BatchDeleteDevicePositionHistoryRequest,
  BatchDeleteDevicePositionHistoryResponse,
  BatchDeleteDevicePositionHistoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tracking/v0/trackers/{TrackerName}/delete-positions",
    input: { TrackerName: 0, DeviceIds: 0 },
    body: true,
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
  operationName: "BatchDeleteDevicePositionHistory",
  endpointHostPrefix: "tracking.",
})) as any;

export type BatchDeleteGeofenceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a batch of geofences from a geofence collection.
 *
 * This operation deletes the resource permanently.
 */
export const batchDeleteGeofence: API.OperationMethod<
  BatchDeleteGeofenceRequest,
  BatchDeleteGeofenceResponse,
  BatchDeleteGeofenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /geofencing/v0/collections/{CollectionName}/delete-geofences",
    input: { CollectionName: 0, GeofenceIds: 0 },
    body: true,
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
  operationName: "BatchDeleteGeofence",
  endpointHostPrefix: "geofencing.",
})) as any;

export type BatchEvaluateGeofencesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Evaluates device positions against the geofence geometries from a given geofence collection.
 *
 * This operation always returns an empty response because geofences are asynchronously evaluated. The evaluation determines if the device has entered or exited a geofenced area, and then publishes one of the following events to Amazon EventBridge:
 *
 * - `ENTER` if Amazon Location determines that the tracked device has entered a geofenced area.
 *
 * - `EXIT` if Amazon Location determines that the tracked device has exited a geofenced area.
 *
 * The last geofence that a device was observed within is tracked for 30 days after the most recent device position update.
 *
 * Geofence evaluation uses the given device position. It does not account for the optional `Accuracy` of a `DevicePositionUpdate`.
 *
 * The `DeviceID` is used as a string to represent the device. You do not need to have a `Tracker` associated with the `DeviceID`.
 */
export const batchEvaluateGeofences: API.OperationMethod<
  BatchEvaluateGeofencesRequest,
  BatchEvaluateGeofencesResponse,
  BatchEvaluateGeofencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /geofencing/v0/collections/{CollectionName}/positions",
    input: {
      CollectionName: 0,
      DevicePositionUpdates: D.list(i_DevicePositionUpdate),
    },
    output: { Errors: D.list({ SampleTime: D.ts }) },
    body: true,
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
  operationName: "BatchEvaluateGeofences",
  endpointHostPrefix: "geofencing.",
})) as any;

export type BatchGetDevicePositionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the latest device positions for requested devices.
 */
export const batchGetDevicePosition: API.OperationMethod<
  BatchGetDevicePositionRequest,
  BatchGetDevicePositionResponse,
  BatchGetDevicePositionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tracking/v0/trackers/{TrackerName}/get-positions",
    input: { TrackerName: 0, DeviceIds: 0 },
    output: { DevicePositions: D.list(o_DevicePosition) },
    body: true,
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
  operationName: "BatchGetDevicePosition",
  endpointHostPrefix: "tracking.",
})) as any;

export type BatchPutGeofenceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A batch request for storing geofence geometries into a given geofence collection, or updates the geometry of an existing geofence if a geofence ID is included in the request.
 */
export const batchPutGeofence: API.OperationMethod<
  BatchPutGeofenceRequest,
  BatchPutGeofenceResponse,
  BatchPutGeofenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /geofencing/v0/collections/{CollectionName}/put-geofences",
    input: {
      CollectionName: 0,
      Entries: D.list({
        GeofenceId: 0,
        Geometry: i_GeofenceGeometry,
        GeofenceProperties: 0,
      }),
    },
    output: { Successes: D.list({ CreateTime: D.ts, UpdateTime: D.ts }) },
    body: true,
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
  operationName: "BatchPutGeofence",
  endpointHostPrefix: "geofencing.",
})) as any;

export type BatchUpdateDevicePositionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Uploads position update data for one or more devices to a tracker resource (up to 10 devices per batch). Amazon Location uses the data when it reports the last known device position and position history. Amazon Location retains location data for 30 days.
 *
 * Position updates are handled based on the `PositionFiltering` property of the tracker. When `PositionFiltering` is set to `TimeBased`, updates are evaluated against linked geofence collections, and location data is stored at a maximum of one position per 30 second interval. If your update frequency is more often than every 30 seconds, only one update per 30 seconds is stored for each unique device ID.
 *
 * When `PositionFiltering` is set to `DistanceBased` filtering, location data is stored and evaluated against linked geofence collections only if the device has moved more than 30 m (98.4 ft).
 *
 * When `PositionFiltering` is set to `AccuracyBased` filtering, location data is stored and evaluated against linked geofence collections only if the device has moved more than the measured accuracy. For example, if two consecutive updates from a device have a horizontal accuracy of 5 m and 10 m, the second update is neither stored or evaluated if the device has moved less than 15 m. If `PositionFiltering` is set to `AccuracyBased` filtering, Amazon Location uses the default value `{ "Horizontal": 0}` when accuracy is not provided on a `DevicePositionUpdate`.
 */
export const batchUpdateDevicePosition: API.OperationMethod<
  BatchUpdateDevicePositionRequest,
  BatchUpdateDevicePositionResponse,
  BatchUpdateDevicePositionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tracking/v0/trackers/{TrackerName}/positions",
    input: { TrackerName: 0, Updates: D.list(i_DevicePositionUpdate) },
    output: { Errors: D.list({ SampleTime: D.ts }) },
    body: true,
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
  operationName: "BatchUpdateDevicePosition",
  endpointHostPrefix: "tracking.",
})) as any;

export type CalculateRouteError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend you upgrade to `CalculateRoutes` or `CalculateIsolines` unless you require Grab data.
 *
 * - `CalculateRoute` is part of a previous Amazon Location Service Routes API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The version 2 `CalculateRoutes` operation gives better results for point-to-point routing, while the version 2 `CalculateIsolines` operation adds support for calculating service areas and travel time envelopes.
 *
 * - If you are using an Amazon Web Services SDK or the Amazon Web Services CLI, note that the Routes API version 2 is found under `geo-routes` or `geo_routes`, not under `location`.
 *
 * - Since Grab is not yet fully supported in Routes API version 2, we recommend you continue using API version 1 when using Grab.
 *
 * Calculates a route given the following required parameters: `DeparturePosition` and `DestinationPosition`. Requires that you first create a route calculator resource.
 *
 * By default, a request that doesn't specify a departure time uses the best time of day to travel with the best traffic conditions when calculating the route.
 *
 * Additional options include:
 *
 * - Specifying a departure time using either `DepartureTime` or `DepartNow`. This calculates a route based on predictive traffic data at the given time.
 *
 * You can't specify both `DepartureTime` and `DepartNow` in a single request. Specifying both parameters returns a validation error.
 *
 * - Specifying a travel mode using TravelMode sets the transportation mode used to calculate the routes. This also lets you specify additional route preferences in `CarModeOptions` if traveling by `Car`, or `TruckModeOptions` if traveling by `Truck`.
 *
 * If you specify `walking` for the travel mode and your data provider is Esri, the start and destination must be within 40km.
 */
export const calculateRoute: API.OperationMethod<
  CalculateRouteRequest,
  CalculateRouteResponse,
  CalculateRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /routes/v0/calculators/{CalculatorName}/calculate/route",
    input: {
      CalculatorName: 0,
      DeparturePosition: 0,
      DestinationPosition: 0,
      WaypointPositions: 0,
      TravelMode: 0,
      DepartureTime: D.tsAs("date-time"),
      DepartNow: 0,
      DistanceUnit: 0,
      IncludeLegGeometry: 0,
      CarModeOptions: i_CalculateRouteCarModeOptions,
      TruckModeOptions: i_CalculateRouteTruckModeOptions,
      ArrivalTime: D.tsAs("date-time"),
      OptimizeFor: 0,
      Key: D.m({ query: "key" }),
    },
    body: true,
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
  operationName: "CalculateRoute",
  endpointHostPrefix: "routes.",
})) as any;

export type CalculateRouteMatrixError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend you upgrade to the V2 `CalculateRouteMatrix` unless you require Grab data.
 *
 * - This version of `CalculateRouteMatrix` is part of a previous Amazon Location Service Routes API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The version 2 `CalculateRouteMatrix` operation gives better results for matrix routing calculations.
 *
 * - If you are using an Amazon Web Services SDK or the Amazon Web Services CLI, note that the Routes API version 2 is found under `geo-routes` or `geo_routes`, not under `location`.
 *
 * - Since Grab is not yet fully supported in Routes API version 2, we recommend you continue using API version 1 when using Grab.
 *
 * - Start your version 2 API journey with the Routes V2 API Reference or the Developer Guide.
 *
 * Calculates a route matrix given the following required parameters: `DeparturePositions` and `DestinationPositions`. `CalculateRouteMatrix` calculates routes and returns the travel time and travel distance from each departure position to each destination position in the request. For example, given departure positions A and B, and destination positions X and Y, `CalculateRouteMatrix` will return time and distance for routes from A to X, A to Y, B to X, and B to Y (in that order). The number of results returned (and routes calculated) will be the number of `DeparturePositions` times the number of `DestinationPositions`.
 *
 * Your account is charged for each route calculated, not the number of requests.
 *
 * Requires that you first create a route calculator resource.
 *
 * By default, a request that doesn't specify a departure time uses the best time of day to travel with the best traffic conditions when calculating routes.
 *
 * Additional options include:
 *
 * - Specifying a departure time using either `DepartureTime` or `DepartNow`. This calculates routes based on predictive traffic data at the given time.
 *
 * You can't specify both `DepartureTime` and `DepartNow` in a single request. Specifying both parameters returns a validation error.
 *
 * - Specifying a travel mode using TravelMode sets the transportation mode used to calculate the routes. This also lets you specify additional route preferences in `CarModeOptions` if traveling by `Car`, or `TruckModeOptions` if traveling by `Truck`.
 */
export const calculateRouteMatrix: API.OperationMethod<
  CalculateRouteMatrixRequest,
  CalculateRouteMatrixResponse,
  CalculateRouteMatrixError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /routes/v0/calculators/{CalculatorName}/calculate/route-matrix",
    input: {
      CalculatorName: 0,
      DeparturePositions: 0,
      DestinationPositions: 0,
      TravelMode: 0,
      DepartureTime: D.tsAs("date-time"),
      DepartNow: 0,
      DistanceUnit: 0,
      CarModeOptions: i_CalculateRouteCarModeOptions,
      TruckModeOptions: i_CalculateRouteTruckModeOptions,
      Key: D.m({ query: "key" }),
    },
    body: true,
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
  operationName: "CalculateRouteMatrix",
  endpointHostPrefix: "routes.",
})) as any;

export type CancelJobError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * `CancelJob` cancels a job that is currently running or pending. If the job is already in a terminal state (`Completed`, `Failed`, or `Cancelled`), the operation returns successfully with the current status.
 *
 * For more information, see Job concepts in the *Amazon Location Service Developer Guide*.
 */
export const cancelJob: API.OperationMethod<
  CancelJobRequest,
  CancelJobResponse,
  CancelJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /metadata/v0/jobs/cancel-job",
    input: { JobId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelJob",
  endpointHostPrefix: "metadata.",
})) as any;

export type CreateGeofenceCollectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a geofence collection, which manages and stores geofences.
 */
export const createGeofenceCollection: API.OperationMethod<
  CreateGeofenceCollectionRequest,
  CreateGeofenceCollectionResponse,
  CreateGeofenceCollectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /geofencing/v0/collections",
    input: {
      CollectionName: 0,
      PricingPlan: 0,
      PricingPlanDataSource: 0,
      Description: 0,
      Tags: 0,
      KmsKeyId: 0,
    },
    output: { CreateTime: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGeofenceCollection",
  endpointHostPrefix: "cp.geofencing.",
})) as any;

export type CreateKeyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an API key resource in your Amazon Web Services account, which lets you grant actions for Amazon Location resources to the API key bearer.
 *
 * For more information, see Use API keys to authenticate in the *Amazon Location Service Developer Guide*.
 */
export const createKey: API.OperationMethod<
  CreateKeyRequest,
  CreateKeyResponse,
  CreateKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /metadata/v0/keys",
    input: {
      KeyName: 0,
      Restrictions: i_ApiKeyRestrictions,
      Description: 0,
      ExpireTime: D.tsAs("date-time"),
      NoExpiry: 0,
      Tags: 0,
    },
    output: { Key: D.secret, CreateTime: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateKey",
  endpointHostPrefix: "cp.metadata.",
})) as any;

export type CreateMapError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend upgrading to the Maps API V2 unless you require `Grab` data.
 *
 * - `CreateMap` is part of a previous Amazon Location Service Maps API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The Maps API version 2 has a simplified interface that can be used without creating or managing map resources.
 *
 * - If you are using an AWS SDK or the AWS CLI, note that the Maps API version 2 is found under `geo-maps` or `geo_maps`, not under `location`.
 *
 * - Since `Grab` is not yet fully supported in Maps API version 2, we recommend you continue using API version 1 when using `Grab`.
 *
 * - Start your version 2 API journey with the Maps V2 API Reference or the Developer Guide.
 *
 * Creates a map resource in your Amazon Web Services account, which provides map tiles of different styles sourced from global location data providers.
 *
 * If your application is tracking or routing assets you use in your business, such as delivery vehicles or employees, you must not use Esri as your geolocation provider. See section 82 of the Amazon Web Services service terms for more details.
 */
export const createMap: API.OperationMethod<
  CreateMapRequest,
  CreateMapResponse,
  CreateMapError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /maps/v0/maps",
    input: {
      MapName: 0,
      Configuration: { Style: 0, PoliticalView: 0, CustomLayers: 0 },
      PricingPlan: 0,
      Description: 0,
      Tags: 0,
    },
    output: { CreateTime: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMap",
  endpointHostPrefix: "cp.maps.",
})) as any;

export type CreatePlaceIndexError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend you upgrade to the Places API V2 unless you require Grab data.
 *
 * - `CreatePlaceIndex` is part of a previous Amazon Location Service Places API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The Places API version 2 has a simplified interface that can be used without creating or managing place index resources.
 *
 * - If you are using an Amazon Web Services SDK or the Amazon Web Services CLI, note that the Places API version 2 is found under `geo-places` or `geo_places`, not under `location`.
 *
 * - Since Grab is not yet fully supported in Places API version 2, we recommend you continue using API version 1 when using Grab.
 *
 * - Start your version 2 API journey with the Places V2 API Reference or the Developer Guide.
 *
 * Creates a place index resource in your Amazon Web Services account. Use a place index resource to geocode addresses and other text queries by using the `SearchPlaceIndexForText` operation, and reverse geocode coordinates by using the `SearchPlaceIndexForPosition` operation, and enable autosuggestions by using the `SearchPlaceIndexForSuggestions` operation.
 *
 * If your application is tracking or routing assets you use in your business, such as delivery vehicles or employees, you must not use Esri as your geolocation provider. See section 82 of the Amazon Web Services service terms for more details.
 */
export const createPlaceIndex: API.OperationMethod<
  CreatePlaceIndexRequest,
  CreatePlaceIndexResponse,
  CreatePlaceIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /places/v0/indexes",
    input: {
      IndexName: 0,
      DataSource: 0,
      PricingPlan: 0,
      Description: 0,
      DataSourceConfiguration: i_DataSourceConfiguration,
      Tags: 0,
    },
    output: { CreateTime: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePlaceIndex",
  endpointHostPrefix: "cp.places.",
})) as any;

export type CreateRouteCalculatorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend you upgrade to the Routes API V2 unless you require Grab data.
 *
 * - `CreateRouteCalculator` is part of a previous Amazon Location Service Routes API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The Routes API version 2 has a simplified interface that can be used without creating or managing route calculator resources.
 *
 * - If you are using an Amazon Web Services SDK or the Amazon Web Services CLI, note that the Routes API version 2 is found under `geo-routes` or `geo_routes`, not under `location`.
 *
 * - Since Grab is not yet fully supported in Routes API version 2, we recommend you continue using API version 1 when using Grab.
 *
 * - Start your version 2 API journey with the Routes V2 API Reference or the Developer Guide.
 *
 * Creates a route calculator resource in your Amazon Web Services account.
 *
 * You can send requests to a route calculator resource to estimate travel time, distance, and get directions. A route calculator sources traffic and road network data from your chosen data provider.
 *
 * If your application is tracking or routing assets you use in your business, such as delivery vehicles or employees, you must not use Esri as your geolocation provider. See section 82 of the Amazon Web Services service terms for more details.
 */
export const createRouteCalculator: API.OperationMethod<
  CreateRouteCalculatorRequest,
  CreateRouteCalculatorResponse,
  CreateRouteCalculatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /routes/v0/calculators",
    input: {
      CalculatorName: 0,
      DataSource: 0,
      PricingPlan: 0,
      Description: 0,
      Tags: 0,
    },
    output: { CreateTime: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRouteCalculator",
  endpointHostPrefix: "cp.routes.",
})) as any;

export type CreateTrackerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a tracker resource in your Amazon Web Services account, which lets you retrieve current and historical location of devices.
 */
export const createTracker: API.OperationMethod<
  CreateTrackerRequest,
  CreateTrackerResponse,
  CreateTrackerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tracking/v0/trackers",
    input: {
      TrackerName: 0,
      PricingPlan: 0,
      KmsKeyId: 0,
      PricingPlanDataSource: 0,
      Description: 0,
      Tags: 0,
      PositionFiltering: 0,
      EventBridgeEnabled: 0,
      KmsKeyEnableGeospatialQueries: 0,
    },
    output: { CreateTime: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTracker",
  endpointHostPrefix: "cp.tracking.",
})) as any;

export type DeleteGeofenceCollectionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a geofence collection from your Amazon Web Services account.
 *
 * This operation deletes the resource permanently. If the geofence collection is the target of a tracker resource, the devices will no longer be monitored.
 */
export const deleteGeofenceCollection: API.OperationMethod<
  DeleteGeofenceCollectionRequest,
  DeleteGeofenceCollectionResponse,
  DeleteGeofenceCollectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /geofencing/v0/collections/{CollectionName}",
    input: { CollectionName: 0 },
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
  operationName: "DeleteGeofenceCollection",
  endpointHostPrefix: "cp.geofencing.",
})) as any;

export type DeleteKeyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified API key. The API key must have been deactivated more than 90 days previously.
 *
 * For more information, see Use API keys to authenticate in the *Amazon Location Service Developer Guide*.
 */
export const deleteKey: API.OperationMethod<
  DeleteKeyRequest,
  DeleteKeyResponse,
  DeleteKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /metadata/v0/keys/{KeyName}",
    input: { KeyName: 0, ForceDelete: D.m({ query: "forceDelete" }) },
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
  operationName: "DeleteKey",
  endpointHostPrefix: "cp.metadata.",
})) as any;

export type DeleteMapError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend upgrading to the Maps API V2 unless you require `Grab` data.
 *
 * - `DeleteMap` is part of a previous Amazon Location Service Maps API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The Maps API version 2 has a simplified interface that can be used without creating or managing map resources.
 *
 * - If you are using an AWS SDK or the AWS CLI, note that the Maps API version 2 is found under `geo-maps` or `geo_maps`, not under `location`.
 *
 * - Since `Grab` is not yet fully supported in Maps API version 2, we recommend you continue using API version 1 when using `Grab`.
 *
 * - Start your version 2 API journey with the Maps V2 API Reference or the Developer Guide.
 *
 * Deletes a map resource from your Amazon Web Services account.
 *
 * This operation deletes the resource permanently. If the map is being used in an application, the map may not render.
 */
export const deleteMap: API.OperationMethod<
  DeleteMapRequest,
  DeleteMapResponse,
  DeleteMapError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /maps/v0/maps/{MapName}",
    input: { MapName: 0 },
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
  operationName: "DeleteMap",
  endpointHostPrefix: "cp.maps.",
})) as any;

export type DeletePlaceIndexError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend you upgrade to the Places API V2 unless you require Grab data.
 *
 * - `DeletePlaceIndex` is part of a previous Amazon Location Service Places API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The Places API version 2 has a simplified interface that can be used without creating or managing place index resources.
 *
 * - If you are using an Amazon Web Services SDK or the Amazon Web Services CLI, note that the Places API version 2 is found under `geo-places` or `geo_places`, not under `location`.
 *
 * - Since Grab is not yet fully supported in Places API version 2, we recommend you continue using API version 1 when using Grab.
 *
 * - Start your version 2 API journey with the Places V2 API Reference or the Developer Guide.
 *
 * Deletes a place index resource from your Amazon Web Services account.
 *
 * This operation deletes the resource permanently.
 */
export const deletePlaceIndex: API.OperationMethod<
  DeletePlaceIndexRequest,
  DeletePlaceIndexResponse,
  DeletePlaceIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /places/v0/indexes/{IndexName}",
    input: { IndexName: 0 },
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
  operationName: "DeletePlaceIndex",
  endpointHostPrefix: "cp.places.",
})) as any;

export type DeleteRouteCalculatorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend you upgrade to the Routes API V2 unless you require Grab data.
 *
 * - `DeleteRouteCalculator` is part of a previous Amazon Location Service Routes API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The Routes API version 2 has a simplified interface that can be used without creating or managing route calculator resources.
 *
 * - If you are using an Amazon Web Services SDK or the Amazon Web Services CLI, note that the Routes API version 2 is found under `geo-routes` or `geo_routes`, not under `location`.
 *
 * - Since Grab is not yet fully supported in Routes API version 2, we recommend you continue using API version 1 when using Grab.
 *
 * - Start your version 2 API journey with the Routes V2 API Reference or the Developer Guide.
 *
 * Deletes a route calculator resource from your Amazon Web Services account.
 *
 * This operation deletes the resource permanently.
 */
export const deleteRouteCalculator: API.OperationMethod<
  DeleteRouteCalculatorRequest,
  DeleteRouteCalculatorResponse,
  DeleteRouteCalculatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /routes/v0/calculators/{CalculatorName}",
    input: { CalculatorName: 0 },
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
  operationName: "DeleteRouteCalculator",
  endpointHostPrefix: "cp.routes.",
})) as any;

export type DeleteTrackerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a tracker resource from your Amazon Web Services account.
 *
 * This operation deletes the resource permanently. If the tracker resource is in use, you may encounter an error. Make sure that the target resource isn't a dependency for your applications.
 */
export const deleteTracker: API.OperationMethod<
  DeleteTrackerRequest,
  DeleteTrackerResponse,
  DeleteTrackerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tracking/v0/trackers/{TrackerName}",
    input: { TrackerName: 0 },
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
  operationName: "DeleteTracker",
  endpointHostPrefix: "cp.tracking.",
})) as any;

export type DescribeGeofenceCollectionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the geofence collection details.
 */
export const describeGeofenceCollection: API.OperationMethod<
  DescribeGeofenceCollectionRequest,
  DescribeGeofenceCollectionResponse,
  DescribeGeofenceCollectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /geofencing/v0/collections/{CollectionName}",
    input: { CollectionName: 0 },
    output: { CreateTime: D.ts, UpdateTime: D.ts },
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
  operationName: "DescribeGeofenceCollection",
  endpointHostPrefix: "cp.geofencing.",
})) as any;

export type DescribeKeyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the API key resource details.
 *
 * For more information, see Use API keys to authenticate in the *Amazon Location Service Developer Guide*.
 */
export const describeKey: API.OperationMethod<
  DescribeKeyRequest,
  DescribeKeyResponse,
  DescribeKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /metadata/v0/keys/{KeyName}",
    input: { KeyName: 0 },
    output: {
      Key: D.secret,
      Restrictions: o_ApiKeyRestrictions,
      CreateTime: D.ts,
      ExpireTime: D.ts,
      UpdateTime: D.ts,
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
  operationName: "DescribeKey",
  endpointHostPrefix: "cp.metadata.",
})) as any;

export type DescribeMapError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend upgrading to the Maps API V2 unless you require `Grab` data.
 *
 * - `DescribeMap` is part of a previous Amazon Location Service Maps API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The Maps API version 2 has a simplified interface that can be used without creating or managing map resources.
 *
 * - If you are using an AWS SDK or the AWS CLI, note that the Maps API version 2 is found under `geo-maps` or `geo_maps`, not under `location`.
 *
 * - Since `Grab` is not yet fully supported in Maps API version 2, we recommend you continue using API version 1 when using `Grab`.
 *
 * - Start your version 2 API journey with the Maps V2 API Reference or the Developer Guide.
 *
 * Retrieves the map resource details.
 */
export const describeMap: API.OperationMethod<
  DescribeMapRequest,
  DescribeMapResponse,
  DescribeMapError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /maps/v0/maps/{MapName}",
    input: { MapName: 0 },
    output: {
      Configuration: { PoliticalView: D.secret },
      CreateTime: D.ts,
      UpdateTime: D.ts,
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
  operationName: "DescribeMap",
  endpointHostPrefix: "cp.maps.",
})) as any;

export type DescribePlaceIndexError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend you upgrade to the Places API V2 unless you require Grab data.
 *
 * - `DescribePlaceIndex` is part of a previous Amazon Location Service Places API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The Places API version 2 has a simplified interface that can be used without creating or managing place index resources.
 *
 * - If you are using an Amazon Web Services SDK or the Amazon Web Services CLI, note that the Places API version 2 is found under `geo-places` or `geo_places`, not under `location`.
 *
 * - Since Grab is not yet fully supported in Places API version 2, we recommend you continue using API version 1 when using Grab.
 *
 * - Start your version 2 API journey with the Places V2 API Reference or the Developer Guide.
 *
 * Retrieves the place index resource details.
 */
export const describePlaceIndex: API.OperationMethod<
  DescribePlaceIndexRequest,
  DescribePlaceIndexResponse,
  DescribePlaceIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /places/v0/indexes/{IndexName}",
    input: { IndexName: 0 },
    output: { CreateTime: D.ts, UpdateTime: D.ts },
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
  operationName: "DescribePlaceIndex",
  endpointHostPrefix: "cp.places.",
})) as any;

export type DescribeRouteCalculatorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend you upgrade to the Routes API V2 unless you require Grab data.
 *
 * - `DescribeRouteCalculator` is part of a previous Amazon Location Service Routes API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The Routes API version 2 has a simplified interface that can be used without creating or managing route calculator resources.
 *
 * - If you are using an Amazon Web Services SDK or the Amazon Web Services CLI, note that the Routes API version 2 is found under `geo-routes` or `geo_routes`, not under `location`.
 *
 * - Since Grab is not yet fully supported in Routes API version 2, we recommend you continue using API version 1 when using Grab.
 *
 * - Start your version 2 API journey with the Routes V2 API Reference or the Developer Guide.
 *
 * Retrieves the route calculator resource details.
 */
export const describeRouteCalculator: API.OperationMethod<
  DescribeRouteCalculatorRequest,
  DescribeRouteCalculatorResponse,
  DescribeRouteCalculatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /routes/v0/calculators/{CalculatorName}",
    input: { CalculatorName: 0 },
    output: { CreateTime: D.ts, UpdateTime: D.ts },
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
  operationName: "DescribeRouteCalculator",
  endpointHostPrefix: "cp.routes.",
})) as any;

export type DescribeTrackerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the tracker resource details.
 */
export const describeTracker: API.OperationMethod<
  DescribeTrackerRequest,
  DescribeTrackerResponse,
  DescribeTrackerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tracking/v0/trackers/{TrackerName}",
    input: { TrackerName: 0 },
    output: { CreateTime: D.ts, UpdateTime: D.ts },
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
  operationName: "DescribeTracker",
  endpointHostPrefix: "cp.tracking.",
})) as any;

export type DisassociateTrackerConsumerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the association between a tracker resource and a geofence collection.
 *
 * Once you unlink a tracker resource from a geofence collection, the tracker positions will no longer be automatically evaluated against geofences.
 */
export const disassociateTrackerConsumer: API.OperationMethod<
  DisassociateTrackerConsumerRequest,
  DisassociateTrackerConsumerResponse,
  DisassociateTrackerConsumerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tracking/v0/trackers/{TrackerName}/consumers/{ConsumerArn}",
    input: { TrackerName: 0, ConsumerArn: 0 },
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
  operationName: "DisassociateTrackerConsumer",
  endpointHostPrefix: "cp.tracking.",
})) as any;

export type ForecastGeofenceEventsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This action forecasts future geofence events that are likely to occur within a specified time horizon if a device continues moving at its current speed. Each forecasted event is associated with a geofence from a provided geofence collection. A forecast event can have one of the following states:
 *
 * `ENTER`: The device position is outside the referenced geofence, but the device may cross into the geofence during the forecasting time horizon if it maintains its current speed.
 *
 * `EXIT`: The device position is inside the referenced geofence, but the device may leave the geofence during the forecasted time horizon if the device maintains it's current speed.
 *
 * `IDLE`:The device is inside the geofence, and it will remain inside the geofence through the end of the time horizon if the device maintains it's current speed.
 *
 * Heading direction is not considered in the current version. The API takes a conservative approach and includes events that can occur for any heading.
 */
export const forecastGeofenceEvents: API.PaginatedOperationMethod<
  ForecastGeofenceEventsRequest,
  ForecastGeofenceEventsResponse,
  ForecastGeofenceEventsError,
  Credentials | HttpClient.HttpClient,
  ForecastedEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /geofencing/v0/collections/{CollectionName}/forecast-geofence-events",
    input: {
      CollectionName: 0,
      DeviceState: { Position: 0, Speed: 0 },
      TimeHorizonMinutes: 0,
      DistanceUnit: 0,
      SpeedUnit: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: { ForecastedEvents: D.list({ ForecastedBreachTime: D.ts }) },
    body: true,
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
  operationName: "ForecastGeofenceEvents",
  endpointHostPrefix: "geofencing.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ForecastedEvents",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetDevicePositionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a device's most recent position according to its sample time.
 *
 * Device positions are deleted after 30 days.
 */
export const getDevicePosition: API.OperationMethod<
  GetDevicePositionRequest,
  GetDevicePositionResponse,
  GetDevicePositionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tracking/v0/trackers/{TrackerName}/devices/{DeviceId}/positions/latest",
    input: { TrackerName: 0, DeviceId: 0 },
    output: { SampleTime: D.ts, ReceivedTime: D.ts },
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
  operationName: "GetDevicePosition",
  endpointHostPrefix: "tracking.",
})) as any;

export type GetDevicePositionHistoryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the device position history from a tracker resource within a specified range of time.
 *
 * Device positions are deleted after 30 days.
 */
export const getDevicePositionHistory: API.PaginatedOperationMethod<
  GetDevicePositionHistoryRequest,
  GetDevicePositionHistoryResponse,
  GetDevicePositionHistoryError,
  Credentials | HttpClient.HttpClient,
  DevicePosition
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /tracking/v0/trackers/{TrackerName}/devices/{DeviceId}/list-positions",
    input: {
      TrackerName: 0,
      DeviceId: 0,
      NextToken: 0,
      StartTimeInclusive: D.tsAs("date-time"),
      EndTimeExclusive: D.tsAs("date-time"),
      MaxResults: 0,
    },
    output: { DevicePositions: D.list(o_DevicePosition) },
    body: true,
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
  operationName: "GetDevicePositionHistory",
  endpointHostPrefix: "tracking.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DevicePositions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetGeofenceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the geofence details from a geofence collection.
 *
 * The returned geometry will always match the geometry format used when the geofence was created.
 */
export const getGeofence: API.OperationMethod<
  GetGeofenceRequest,
  GetGeofenceResponse,
  GetGeofenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /geofencing/v0/collections/{CollectionName}/geofences/{GeofenceId}",
    input: { CollectionName: 0, GeofenceId: 0 },
    output: {
      Geometry: o_GeofenceGeometry,
      CreateTime: D.ts,
      UpdateTime: D.ts,
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
  operationName: "GetGeofence",
  endpointHostPrefix: "geofencing.",
})) as any;

export type GetJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * `GetJob` retrieves detailed information about a specific job, including its current status, configuration, and error information if the job failed.
 *
 * For more information, see Job concepts in the *Amazon Location Service Developer Guide*.
 */
export const getJob: API.OperationMethod<
  GetJobRequest,
  GetJobResponse,
  GetJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /metadata/v0/jobs/{JobId}",
    input: { JobId: 0 },
    output: { CreatedAt: D.ts, EndedAt: D.ts, UpdatedAt: D.ts },
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
  operationName: "GetJob",
  endpointHostPrefix: "metadata.",
})) as any;

export type GetMapGlyphsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend upgrading to `GetGlyphs` unless you require `Grab` data.
 *
 * - `GetMapGlyphs` is part of a previous Amazon Location Service Maps API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The version 2 `GetGlyphs` operation gives a better user experience and is compatible with the remainder of the V2 Maps API.
 *
 * - If you are using an AWS SDK or the AWS CLI, note that the Maps API version 2 is found under `geo-maps` or `geo_maps`, not under `location`.
 *
 * - Since `Grab` is not yet fully supported in Maps API version 2, we recommend you continue using API version 1 when using `Grab`.
 *
 * - Start your version 2 API journey with the Maps V2 API Reference or the Developer Guide.
 *
 * Retrieves glyphs used to display labels on a map.
 */
export const getMapGlyphs: API.OperationMethod<
  GetMapGlyphsRequest,
  GetMapGlyphsResponse,
  GetMapGlyphsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /maps/v0/maps/{MapName}/glyphs/{FontStack}/{FontUnicodeRange}",
    input: {
      MapName: 0,
      FontStack: 0,
      FontUnicodeRange: 0,
      Key: D.m({ query: "key" }),
    },
    output: {
      Blob: D.m({ payload: true, shape: D.blob }),
      ContentType: D.m({ header: "Content-Type" }),
      CacheControl: D.m({ header: "Cache-Control" }),
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
  operationName: "GetMapGlyphs",
  endpointHostPrefix: "maps.",
})) as any;

export type GetMapSpritesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend upgrading to `GetSprites` unless you require `Grab` data.
 *
 * - `GetMapSprites` is part of a previous Amazon Location Service Maps API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The version 2 `GetSprites` operation gives a better user experience and is compatible with the remainder of the V2 Maps API.
 *
 * - If you are using an AWS SDK or the AWS CLI, note that the Maps API version 2 is found under `geo-maps` or `geo_maps`, not under `location`.
 *
 * - Since `Grab` is not yet fully supported in Maps API version 2, we recommend you continue using API version 1 when using `Grab`.
 *
 * - Start your version 2 API journey with the Maps V2 API Reference or the Developer Guide.
 *
 * Retrieves the sprite sheet corresponding to a map resource. The sprite sheet is a PNG image paired with a JSON document describing the offsets of individual icons that will be displayed on a rendered map.
 */
export const getMapSprites: API.OperationMethod<
  GetMapSpritesRequest,
  GetMapSpritesResponse,
  GetMapSpritesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /maps/v0/maps/{MapName}/sprites/{FileName}",
    input: { MapName: 0, FileName: 0, Key: D.m({ query: "key" }) },
    output: {
      Blob: D.m({ payload: true, shape: D.blob }),
      ContentType: D.m({ header: "Content-Type" }),
      CacheControl: D.m({ header: "Cache-Control" }),
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
  operationName: "GetMapSprites",
  endpointHostPrefix: "maps.",
})) as any;

export type GetMapStyleDescriptorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend upgrading to `GetStyleDescriptor` unless you require `Grab` data.
 *
 * - `GetMapStyleDescriptor` is part of a previous Amazon Location Service Maps API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The version 2 `GetStyleDescriptor` operation gives a better user experience and is compatible with the remainder of the V2 Maps API.
 *
 * - If you are using an AWS SDK or the AWS CLI, note that the Maps API version 2 is found under `geo-maps` or `geo_maps`, not under `location`.
 *
 * - Since `Grab` is not yet fully supported in Maps API version 2, we recommend you continue using API version 1 when using `Grab`.
 *
 * - Start your version 2 API journey with the Maps V2 API Reference or the Developer Guide.
 *
 * Retrieves the map style descriptor from a map resource.
 *
 * The style descriptor contains speciﬁcations on how features render on a map. For example, what data to display, what order to display the data in, and the style for the data. Style descriptors follow the Mapbox Style Specification.
 */
export const getMapStyleDescriptor: API.OperationMethod<
  GetMapStyleDescriptorRequest,
  GetMapStyleDescriptorResponse,
  GetMapStyleDescriptorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /maps/v0/maps/{MapName}/style-descriptor",
    input: { MapName: 0, Key: D.m({ query: "key" }) },
    output: {
      Blob: D.m({ payload: true, shape: D.blob }),
      ContentType: D.m({ header: "Content-Type" }),
      CacheControl: D.m({ header: "Cache-Control" }),
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
  operationName: "GetMapStyleDescriptor",
  endpointHostPrefix: "maps.",
})) as any;

export type GetMapTileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend upgrading to `GetTile` unless you require `Grab` data.
 *
 * - `GetMapTile` is part of a previous Amazon Location Service Maps API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The version 2 `GetTile` operation gives a better user experience and is compatible with the remainder of the V2 Maps API.
 *
 * - If you are using an AWS SDK or the AWS CLI, note that the Maps API version 2 is found under `geo-maps` or `geo_maps`, not under `location`.
 *
 * - Since `Grab` is not yet fully supported in Maps API version 2, we recommend you continue using API version 1 when using `Grab`.
 *
 * - Start your version 2 API journey with the Maps V2 API Reference or the Developer Guide.
 *
 * Retrieves a vector data tile from the map resource. Map tiles are used by clients to render a map. they're addressed using a grid arrangement with an X coordinate, Y coordinate, and Z (zoom) level.
 *
 * The origin (0, 0) is the top left of the map. Increasing the zoom level by 1 doubles both the X and Y dimensions, so a tile containing data for the entire world at (0/0/0) will be split into 4 tiles at zoom 1 (1/0/0, 1/0/1, 1/1/0, 1/1/1).
 */
export const getMapTile: API.OperationMethod<
  GetMapTileRequest,
  GetMapTileResponse,
  GetMapTileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /maps/v0/maps/{MapName}/tiles/{Z}/{X}/{Y}",
    input: { MapName: 0, Z: 0, X: 0, Y: 0, Key: D.m({ query: "key" }) },
    output: {
      Blob: D.m({ payload: true, shape: D.blob }),
      ContentType: D.m({ header: "Content-Type" }),
      CacheControl: D.m({ header: "Cache-Control" }),
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
  operationName: "GetMapTile",
  endpointHostPrefix: "maps.",
})) as any;

export type GetPlaceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend you upgrade to the V2 `GetPlace` operation unless you require Grab data.
 *
 * - This version of `GetPlace` is part of a previous Amazon Location Service Places API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - Version 2 of the `GetPlace` operation interoperates with the rest of the Places V2 API, while this version does not.
 *
 * - If you are using an Amazon Web Services SDK or the Amazon Web Services CLI, note that the Places API version 2 is found under `geo-places` or `geo_places`, not under `location`.
 *
 * - Since Grab is not yet fully supported in Places API version 2, we recommend you continue using API version 1 when using Grab.
 *
 * - Start your version 2 API journey with the Places V2 API Reference or the Developer Guide.
 *
 * Finds a place by its unique ID. A `PlaceId` is returned by other search operations.
 *
 * A PlaceId is valid only if all of the following are the same in the original search request and the call to `GetPlace`.
 *
 * - Customer Amazon Web Services account
 *
 * - Amazon Web Services Region
 *
 * - Data provider specified in the place index resource
 *
 * If your Place index resource is configured with Grab as your geolocation provider and Storage as Intended use, the GetPlace operation is unavailable. For more information, see AWS service terms.
 */
export const getPlace: API.OperationMethod<
  GetPlaceRequest,
  GetPlaceResponse,
  GetPlaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /places/v0/indexes/{IndexName}/places/{PlaceId}",
    input: {
      IndexName: 0,
      PlaceId: 0,
      Language: D.m({ query: "language" }),
      Key: D.m({ query: "key" }),
    },
    output: { Place: o_Place },
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
  operationName: "GetPlace",
  endpointHostPrefix: "places.",
})) as any;

export type ListDevicePositionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A batch request to retrieve all device positions.
 */
export const listDevicePositions: API.PaginatedOperationMethod<
  ListDevicePositionsRequest,
  ListDevicePositionsResponse,
  ListDevicePositionsError,
  Credentials | HttpClient.HttpClient,
  ListDevicePositionsResponseEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /tracking/v0/trackers/{TrackerName}/list-positions",
    input: {
      TrackerName: 0,
      MaxResults: 0,
      NextToken: 0,
      FilterGeometry: { Polygon: 0 },
    },
    output: { Entries: D.list({ SampleTime: D.ts }) },
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
  operationName: "ListDevicePositions",
  endpointHostPrefix: "tracking.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Entries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGeofenceCollectionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists geofence collections in your Amazon Web Services account.
 */
export const listGeofenceCollections: API.PaginatedOperationMethod<
  ListGeofenceCollectionsRequest,
  ListGeofenceCollectionsResponse,
  ListGeofenceCollectionsError,
  Credentials | HttpClient.HttpClient,
  ListGeofenceCollectionsResponseEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /geofencing/v0/list-collections",
    input: { MaxResults: 0, NextToken: 0 },
    output: { Entries: D.list({ CreateTime: D.ts, UpdateTime: D.ts }) },
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
  operationName: "ListGeofenceCollections",
  endpointHostPrefix: "cp.geofencing.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Entries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGeofencesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists geofences stored in a given geofence collection.
 */
export const listGeofences: API.PaginatedOperationMethod<
  ListGeofencesRequest,
  ListGeofencesResponse,
  ListGeofencesError,
  Credentials | HttpClient.HttpClient,
  ListGeofenceResponseEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /geofencing/v0/collections/{CollectionName}/list-geofences",
    input: { CollectionName: 0, NextToken: 0, MaxResults: 0 },
    output: {
      Entries: D.list({
        Geometry: o_GeofenceGeometry,
        CreateTime: D.ts,
        UpdateTime: D.ts,
      }),
    },
    body: true,
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
  operationName: "ListGeofences",
  endpointHostPrefix: "geofencing.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Entries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListJobsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * `ListJobs` retrieves a list of jobs with optional filtering and pagination support.
 *
 * For more information, see Job concepts in the *Amazon Location Service Developer Guide*.
 */
export const listJobs: API.PaginatedOperationMethod<
  ListJobsRequest,
  ListJobsResponse,
  ListJobsError,
  Credentials | HttpClient.HttpClient,
  ListJobsResponseEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /metadata/v0/jobs/list-jobs",
    input: { Filter: { JobStatus: 0 }, MaxResults: 0, NextToken: 0 },
    output: {
      Entries: D.list({ CreatedAt: D.ts, EndedAt: D.ts, UpdatedAt: D.ts }),
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
  operationName: "ListJobs",
  endpointHostPrefix: "metadata.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Entries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListKeysError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists API key resources in your Amazon Web Services account.
 *
 * For more information, see Use API keys to authenticate in the *Amazon Location Service Developer Guide*.
 */
export const listKeys: API.PaginatedOperationMethod<
  ListKeysRequest,
  ListKeysResponse,
  ListKeysError,
  Credentials | HttpClient.HttpClient,
  ListKeysResponseEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /metadata/v0/list-keys",
    input: { MaxResults: 0, NextToken: 0, Filter: { KeyStatus: 0 } },
    output: {
      Entries: D.list({
        ExpireTime: D.ts,
        Restrictions: o_ApiKeyRestrictions,
        CreateTime: D.ts,
        UpdateTime: D.ts,
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
  operationName: "ListKeys",
  endpointHostPrefix: "cp.metadata.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Entries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMapsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend upgrading to the Maps API V2 unless you require `Grab` data.
 *
 * - `ListMaps` is part of a previous Amazon Location Service Maps API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The Maps API version 2 has a simplified interface that can be used without creating or managing map resources.
 *
 * - If you are using an AWS SDK or the AWS CLI, note that the Maps API version 2 is found under `geo-maps` or `geo_maps`, not under `location`.
 *
 * - Since `Grab` is not yet fully supported in Maps API version 2, we recommend you continue using API version 1 when using `Grab`.
 *
 * - Start your version 2 API journey with the Maps V2 API Reference or the Developer Guide.
 *
 * Lists map resources in your Amazon Web Services account.
 */
export const listMaps: API.PaginatedOperationMethod<
  ListMapsRequest,
  ListMapsResponse,
  ListMapsError,
  Credentials | HttpClient.HttpClient,
  ListMapsResponseEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /maps/v0/list-maps",
    input: { MaxResults: 0, NextToken: 0 },
    output: { Entries: D.list({ CreateTime: D.ts, UpdateTime: D.ts }) },
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
  operationName: "ListMaps",
  endpointHostPrefix: "cp.maps.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Entries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPlaceIndexesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend you upgrade to the Places API V2 unless you require Grab data.
 *
 * - `ListPlaceIndexes` is part of a previous Amazon Location Service Places API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The Places API version 2 has a simplified interface that can be used without creating or managing place index resources.
 *
 * - If you are using an Amazon Web Services SDK or the Amazon Web Services CLI, note that the Places API version 2 is found under `geo-places` or `geo_places`, not under `location`.
 *
 * - Since Grab is not yet fully supported in Places API version 2, we recommend you continue using API version 1 when using Grab.
 *
 * - Start your version 2 API journey with the Places V2 API Reference or the Developer Guide.
 *
 * Lists place index resources in your Amazon Web Services account.
 */
export const listPlaceIndexes: API.PaginatedOperationMethod<
  ListPlaceIndexesRequest,
  ListPlaceIndexesResponse,
  ListPlaceIndexesError,
  Credentials | HttpClient.HttpClient,
  ListPlaceIndexesResponseEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /places/v0/list-indexes",
    input: { MaxResults: 0, NextToken: 0 },
    output: { Entries: D.list({ CreateTime: D.ts, UpdateTime: D.ts }) },
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
  operationName: "ListPlaceIndexes",
  endpointHostPrefix: "cp.places.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Entries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRouteCalculatorsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend you upgrade to the Routes API V2 unless you require Grab data.
 *
 * - `ListRouteCalculators` is part of a previous Amazon Location Service Routes API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The Routes API version 2 has a simplified interface that can be used without creating or managing route calculator resources.
 *
 * - If you are using an Amazon Web Services SDK or the Amazon Web Services CLI, note that the Routes API version 2 is found under `geo-routes` or `geo_routes`, not under `location`.
 *
 * - Since Grab is not yet fully supported in Routes API version 2, we recommend you continue using API version 1 when using Grab.
 *
 * - Start your version 2 API journey with the Routes V2 API Reference or the Developer Guide.
 *
 * Lists route calculator resources in your Amazon Web Services account.
 */
export const listRouteCalculators: API.PaginatedOperationMethod<
  ListRouteCalculatorsRequest,
  ListRouteCalculatorsResponse,
  ListRouteCalculatorsError,
  Credentials | HttpClient.HttpClient,
  ListRouteCalculatorsResponseEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /routes/v0/list-calculators",
    input: { MaxResults: 0, NextToken: 0 },
    output: { Entries: D.list({ CreateTime: D.ts, UpdateTime: D.ts }) },
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
  operationName: "ListRouteCalculators",
  endpointHostPrefix: "cp.routes.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Entries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of tags that are applied to the specified Amazon Location resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{ResourceArn}",
    input: { ResourceArn: 0 },
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
  operationName: "ListTagsForResource",
  endpointHostPrefix: "cp.metadata.",
})) as any;

export type ListTrackerConsumersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists geofence collections currently associated to the given tracker resource.
 */
export const listTrackerConsumers: API.PaginatedOperationMethod<
  ListTrackerConsumersRequest,
  ListTrackerConsumersResponse,
  ListTrackerConsumersError,
  Credentials | HttpClient.HttpClient,
  Arn
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /tracking/v0/trackers/{TrackerName}/list-consumers",
    input: { TrackerName: 0, MaxResults: 0, NextToken: 0 },
    body: true,
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
  operationName: "ListTrackerConsumers",
  endpointHostPrefix: "cp.tracking.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ConsumerArns",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTrackersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists tracker resources in your Amazon Web Services account.
 */
export const listTrackers: API.PaginatedOperationMethod<
  ListTrackersRequest,
  ListTrackersResponse,
  ListTrackersError,
  Credentials | HttpClient.HttpClient,
  ListTrackersResponseEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /tracking/v0/list-trackers",
    input: { MaxResults: 0, NextToken: 0 },
    output: { Entries: D.list({ CreateTime: D.ts, UpdateTime: D.ts }) },
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
  operationName: "ListTrackers",
  endpointHostPrefix: "cp.tracking.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Entries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutGeofenceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stores a geofence geometry in a given geofence collection, or updates the geometry of an existing geofence if a geofence ID is included in the request.
 */
export const putGeofence: API.OperationMethod<
  PutGeofenceRequest,
  PutGeofenceResponse,
  PutGeofenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /geofencing/v0/collections/{CollectionName}/geofences/{GeofenceId}",
    input: {
      CollectionName: 0,
      GeofenceId: 0,
      Geometry: i_GeofenceGeometry,
      GeofenceProperties: 0,
    },
    output: { CreateTime: D.ts, UpdateTime: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutGeofence",
  endpointHostPrefix: "geofencing.",
})) as any;

export type SearchPlaceIndexForPositionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend you upgrade to `ReverseGeocode` or `SearchNearby` unless you require Grab data.
 *
 * - `SearchPlaceIndexForPosition` is part of a previous Amazon Location Service Places API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The version 2 `ReverseGeocode` operation gives better results in the address reverse-geocoding use case, while the version 2 `SearchNearby` operation gives better results when searching for businesses and points of interest near a specific location.
 *
 * - If you are using an Amazon Web Services SDK or the Amazon Web Services CLI, note that the Places API version 2 is found under `geo-places` or `geo_places`, not under `location`.
 *
 * - Since Grab is not yet fully supported in Places API version 2, we recommend you continue using API version 1 when using Grab.
 *
 * Reverse geocodes a given coordinate and returns a legible address. Allows you to search for Places or points of interest near a given position.
 */
export const searchPlaceIndexForPosition: API.OperationMethod<
  SearchPlaceIndexForPositionRequest,
  SearchPlaceIndexForPositionResponse,
  SearchPlaceIndexForPositionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /places/v0/indexes/{IndexName}/search/position",
    input: {
      IndexName: 0,
      Position: 0,
      MaxResults: 0,
      Language: 0,
      Key: D.m({ query: "key" }),
    },
    output: { Results: D.list({ Place: o_Place, PlaceId: D.secret }) },
    body: true,
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
  operationName: "SearchPlaceIndexForPosition",
  endpointHostPrefix: "places.",
})) as any;

export type SearchPlaceIndexForSuggestionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend you upgrade to `Suggest` or `Autocomplete` unless you require Grab data.
 *
 * - `SearchPlaceIndexForSuggestions` is part of a previous Amazon Location Service Places API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The version 2 `Suggest` operation gives better results for typeahead place search suggestions with fuzzy matching, while the version 2 `Autocomplete` operation gives better results for address completion based on partial input.
 *
 * - If you are using an Amazon Web Services SDK or the Amazon Web Services CLI, note that the Places API version 2 is found under `geo-places` or `geo_places`, not under `location`.
 *
 * - Since Grab is not yet fully supported in Places API version 2, we recommend you continue using API version 1 when using Grab.
 *
 * Generates suggestions for addresses and points of interest based on partial or misspelled free-form text. This operation is also known as autocomplete, autosuggest, or fuzzy matching.
 *
 * Optional parameters let you narrow your search results by bounding box or country, or bias your search toward a specific position on the globe.
 *
 * You can search for suggested place names near a specified position by using `BiasPosition`, or filter results within a bounding box by using `FilterBBox`. These parameters are mutually exclusive; using both `BiasPosition` and `FilterBBox` in the same command returns an error.
 */
export const searchPlaceIndexForSuggestions: API.OperationMethod<
  SearchPlaceIndexForSuggestionsRequest,
  SearchPlaceIndexForSuggestionsResponse,
  SearchPlaceIndexForSuggestionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /places/v0/indexes/{IndexName}/search/suggestions",
    input: {
      IndexName: 0,
      Text: 0,
      BiasPosition: 0,
      FilterBBox: 0,
      FilterCountries: 0,
      MaxResults: 0,
      Language: 0,
      FilterCategories: 0,
      Key: D.m({ query: "key" }),
    },
    output: {
      Summary: {
        Text: D.secret,
        FilterCountries: D.list(D.secret),
        FilterCategories: D.list(D.secret),
      },
      Results: D.list({
        Text: D.secret,
        PlaceId: D.secret,
        Categories: D.list(D.secret),
        SupplementalCategories: D.list(D.secret),
      }),
    },
    body: true,
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
  operationName: "SearchPlaceIndexForSuggestions",
  endpointHostPrefix: "places.",
})) as any;

export type SearchPlaceIndexForTextError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend you upgrade to `Geocode` or `SearchText` unless you require Grab data.
 *
 * - `SearchPlaceIndexForText` is part of a previous Amazon Location Service Places API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The version 2 `Geocode` operation gives better results in the address geocoding use case, while the version 2 `SearchText` operation gives better results when searching for businesses and points of interest.
 *
 * - If you are using an Amazon Web Services SDK or the Amazon Web Services CLI, note that the Places API version 2 is found under `geo-places` or `geo_places`, not under `location`.
 *
 * - Since Grab is not yet fully supported in Places API version 2, we recommend you continue using API version 1 when using Grab.
 *
 * Geocodes free-form text, such as an address, name, city, or region to allow you to search for Places or points of interest.
 *
 * Optional parameters let you narrow your search results by bounding box or country, or bias your search toward a specific position on the globe.
 *
 * You can search for places near a given position using `BiasPosition`, or filter results within a bounding box using `FilterBBox`. Providing both parameters simultaneously returns an error.
 *
 * Search results are returned in order of highest to lowest relevance.
 */
export const searchPlaceIndexForText: API.OperationMethod<
  SearchPlaceIndexForTextRequest,
  SearchPlaceIndexForTextResponse,
  SearchPlaceIndexForTextError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /places/v0/indexes/{IndexName}/search/text",
    input: {
      IndexName: 0,
      Text: 0,
      BiasPosition: 0,
      FilterBBox: 0,
      FilterCountries: 0,
      MaxResults: 0,
      Language: 0,
      FilterCategories: 0,
      Key: D.m({ query: "key" }),
    },
    output: {
      Summary: {
        Text: D.secret,
        FilterCountries: D.list(D.secret),
        FilterCategories: D.list(D.secret),
      },
      Results: D.list({ Place: o_Place, PlaceId: D.secret }),
    },
    body: true,
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
  operationName: "SearchPlaceIndexForText",
  endpointHostPrefix: "places.",
})) as any;

export type StartJobError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * `StartJob` starts a new asynchronous bulk processing job. You specify the input data location in Amazon S3, the action to perform, and the output location where results are written.
 *
 * For more information, see Job concepts in the *Amazon Location Service Developer Guide*.
 */
export const startJob: API.OperationMethod<
  StartJobRequest,
  StartJobResponse,
  StartJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /metadata/v0/jobs",
    input: {
      ClientToken: D.m({ idempotency: true }),
      Action: 0,
      ActionOptions: { ValidateAddress: { AdditionalFeatures: 0 } },
      ExecutionRoleArn: 0,
      InputOptions: { Location: 0, Format: 0 },
      Name: 0,
      OutputOptions: { Format: 0, Location: 0 },
      Tags: 0,
    },
    output: { CreatedAt: D.ts },
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
  operationName: "StartJob",
  endpointHostPrefix: "metadata.",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Assigns one or more tags (key-value pairs) to the specified Amazon Location Service resource.
 *
 * Tags can help you organize and categorize your resources. You can also use them to scope user permissions, by granting a user permission to access or change only resources with certain tag values.
 *
 * You can use the `TagResource` operation with an Amazon Location Service resource that already has tags. If you specify a new tag key for the resource, this tag is appended to the tags already associated with the resource. If you specify a tag key that's already associated with the resource, the new tag value that you specify replaces the previous value for that tag.
 *
 * You can associate up to 50 tags with a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{ResourceArn}",
    input: { ResourceArn: 0, Tags: 0 },
    body: true,
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
  operationName: "TagResource",
  endpointHostPrefix: "cp.metadata.",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes one or more tags from the specified Amazon Location resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{ResourceArn}",
    input: { ResourceArn: 0, TagKeys: D.m({ query: "tagKeys" }) },
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
  operationName: "UntagResource",
  endpointHostPrefix: "cp.metadata.",
})) as any;

export type UpdateGeofenceCollectionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified properties of a given geofence collection.
 */
export const updateGeofenceCollection: API.OperationMethod<
  UpdateGeofenceCollectionRequest,
  UpdateGeofenceCollectionResponse,
  UpdateGeofenceCollectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /geofencing/v0/collections/{CollectionName}",
    input: {
      CollectionName: 0,
      PricingPlan: 0,
      PricingPlanDataSource: 0,
      Description: 0,
    },
    output: { UpdateTime: D.ts },
    body: true,
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
  operationName: "UpdateGeofenceCollection",
  endpointHostPrefix: "cp.geofencing.",
})) as any;

export type UpdateKeyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified properties of a given API key resource.
 */
export const updateKey: API.OperationMethod<
  UpdateKeyRequest,
  UpdateKeyResponse,
  UpdateKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /metadata/v0/keys/{KeyName}",
    input: {
      KeyName: 0,
      Description: 0,
      ExpireTime: D.tsAs("date-time"),
      NoExpiry: 0,
      ForceUpdate: 0,
      Restrictions: i_ApiKeyRestrictions,
    },
    output: { UpdateTime: D.ts },
    body: true,
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
  operationName: "UpdateKey",
  endpointHostPrefix: "cp.metadata.",
})) as any;

export type UpdateMapError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend upgrading to the Maps API V2 unless you require `Grab` data.
 *
 * - `UpdateMap` is part of a previous Amazon Location Service Maps API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The Maps API version 2 has a simplified interface that can be used without creating or managing map resources.
 *
 * - If you are using an AWS SDK or the AWS CLI, note that the Maps API version 2 is found under `geo-maps` or `geo_maps`, not under `location`.
 *
 * - Since `Grab` is not yet fully supported in Maps API version 2, we recommend you continue using API version 1 when using `Grab`.
 *
 * - Start your version 2 API journey with the Maps V2 API Reference or the Developer Guide.
 *
 * Updates the specified properties of a given map resource.
 */
export const updateMap: API.OperationMethod<
  UpdateMapRequest,
  UpdateMapResponse,
  UpdateMapError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /maps/v0/maps/{MapName}",
    input: {
      MapName: 0,
      PricingPlan: 0,
      Description: 0,
      ConfigurationUpdate: { PoliticalView: 0, CustomLayers: 0 },
    },
    output: { UpdateTime: D.ts },
    body: true,
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
  operationName: "UpdateMap",
  endpointHostPrefix: "cp.maps.",
})) as any;

export type UpdatePlaceIndexError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend you upgrade to the Places API V2 unless you require Grab data.
 *
 * - `UpdatePlaceIndex` is part of a previous Amazon Location Service Places API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The Places API version 2 has a simplified interface that can be used without creating or managing place index resources.
 *
 * - If you are using an Amazon Web Services SDK or the Amazon Web Services CLI, note that the Places API version 2 is found under `geo-places` or `geo_places`, not under `location`.
 *
 * - Since Grab is not yet fully supported in Places API version 2, we recommend you continue using API version 1 when using Grab.
 *
 * - Start your version 2 API journey with the Places V2 API Reference or the Developer Guide.
 *
 * Updates the specified properties of a given place index resource.
 */
export const updatePlaceIndex: API.OperationMethod<
  UpdatePlaceIndexRequest,
  UpdatePlaceIndexResponse,
  UpdatePlaceIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /places/v0/indexes/{IndexName}",
    input: {
      IndexName: 0,
      PricingPlan: 0,
      Description: 0,
      DataSourceConfiguration: i_DataSourceConfiguration,
    },
    output: { UpdateTime: D.ts },
    body: true,
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
  operationName: "UpdatePlaceIndex",
  endpointHostPrefix: "cp.places.",
})) as any;

export type UpdateRouteCalculatorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend you upgrade to the Routes API V2 unless you require Grab data.
 *
 * - `UpdateRouteCalculator` is part of a previous Amazon Location Service Routes API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The Routes API version 2 has a simplified interface that can be used without creating or managing route calculator resources.
 *
 * - If you are using an Amazon Web Services SDK or the Amazon Web Services CLI, note that the Routes API version 2 is found under `geo-routes` or `geo_routes`, not under `location`.
 *
 * - Since Grab is not yet fully supported in Routes API version 2, we recommend you continue using API version 1 when using Grab.
 *
 * - Start your version 2 API journey with the Routes V2 API Reference or the Developer Guide.
 *
 * Updates the specified properties for a given route calculator resource.
 */
export const updateRouteCalculator: API.OperationMethod<
  UpdateRouteCalculatorRequest,
  UpdateRouteCalculatorResponse,
  UpdateRouteCalculatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /routes/v0/calculators/{CalculatorName}",
    input: { CalculatorName: 0, PricingPlan: 0, Description: 0 },
    output: { UpdateTime: D.ts },
    body: true,
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
  operationName: "UpdateRouteCalculator",
  endpointHostPrefix: "cp.routes.",
})) as any;

export type UpdateTrackerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified properties of a given tracker resource.
 */
export const updateTracker: API.OperationMethod<
  UpdateTrackerRequest,
  UpdateTrackerResponse,
  UpdateTrackerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /tracking/v0/trackers/{TrackerName}",
    input: {
      TrackerName: 0,
      PricingPlan: 0,
      PricingPlanDataSource: 0,
      Description: 0,
      PositionFiltering: 0,
      EventBridgeEnabled: 0,
      KmsKeyEnableGeospatialQueries: 0,
    },
    output: { UpdateTime: D.ts },
    body: true,
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
  operationName: "UpdateTracker",
  endpointHostPrefix: "cp.tracking.",
})) as any;

export type VerifyDevicePositionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Verifies the integrity of the device's position by determining if it was reported behind a proxy, and by comparing it to an inferred position estimated based on the device's state.
 *
 * The Location Integrity SDK provides enhanced features related to device verification, and it is available for use by request. To get access to the SDK, contact Sales Support.
 */
export const verifyDevicePosition: API.OperationMethod<
  VerifyDevicePositionRequest,
  VerifyDevicePositionResponse,
  VerifyDevicePositionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tracking/v0/trackers/{TrackerName}/positions/verify",
    input: {
      TrackerName: 0,
      DeviceState: {
        DeviceId: 0,
        SampleTime: D.tsAs("date-time"),
        Position: 0,
        Accuracy: i_PositionalAccuracy,
        Ipv4Address: 0,
        WiFiAccessPoints: D.list({ MacAddress: 0, Rss: 0 }),
        CellSignals: {
          LteCellDetails: D.list({
            CellId: 0,
            Mcc: 0,
            Mnc: 0,
            LocalId: { Earfcn: 0, Pci: 0 },
            NetworkMeasurements: D.list({
              Earfcn: 0,
              CellId: 0,
              Pci: 0,
              Rsrp: 0,
              Rsrq: 0,
            }),
            TimingAdvance: 0,
            NrCapable: 0,
            Rsrp: 0,
            Rsrq: 0,
            Tac: 0,
          }),
        },
      },
      DistanceUnit: 0,
    },
    output: { SampleTime: D.ts, ReceivedTime: D.ts },
    body: true,
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
  operationName: "VerifyDevicePosition",
  endpointHostPrefix: "tracking.",
})) as any;

const i_ApiKeyRestrictions: D.LazyStruct = () => ({
  AllowActions: 0,
  AllowResources: 0,
  AllowReferers: 0,
  AllowAndroidApps: D.list({ Package: 0, CertificateFingerprint: 0 }),
  AllowAppleApps: D.list({ BundleId: 0 }),
});
const i_CalculateRouteCarModeOptions: D.LazyStruct = () => ({
  AvoidFerries: 0,
  AvoidTolls: 0,
});
const i_CalculateRouteTruckModeOptions: D.LazyStruct = () => ({
  AvoidFerries: 0,
  AvoidTolls: 0,
  Dimensions: { Length: 0, Height: 0, Width: 0, Unit: 0 },
  Weight: { Total: 0, Unit: 0 },
});
const i_DataSourceConfiguration: D.LazyStruct = () => ({ IntendedUse: 0 });
const i_DevicePositionUpdate: D.LazyStruct = () => ({
  DeviceId: 0,
  SampleTime: D.tsAs("date-time"),
  Position: 0,
  Accuracy: i_PositionalAccuracy,
  PositionProperties: 0,
});
const i_GeofenceGeometry: D.LazyStruct = () => ({
  Polygon: 0,
  Circle: { Center: 0, Radius: 0 },
  Geobuf: 0,
  MultiPolygon: 0,
});
const i_PositionalAccuracy: D.LazyStruct = () => ({ Horizontal: 0 });
const o_ApiKeyRestrictions: D.LazyStruct = () => ({
  AllowReferers: D.list(D.secret),
});
const o_DevicePosition: D.LazyStruct = () => ({
  SampleTime: D.ts,
  ReceivedTime: D.ts,
});
const o_GeofenceGeometry: D.LazyStruct = () => ({ Geobuf: D.secretBlob });
const o_Place: D.LazyStruct = () => ({
  Label: D.secret,
  AddressNumber: D.secret,
  Street: D.secret,
  Neighborhood: D.secret,
  Municipality: D.secret,
  SubRegion: D.secret,
  Region: D.secret,
  Country: D.secret,
  PostalCode: D.secret,
  TimeZone: { Name: D.secret },
  UnitType: D.secret,
  UnitNumber: D.secret,
  Categories: D.list(D.secret),
  SupplementalCategories: D.list(D.secret),
  SubMunicipality: D.secret,
});
