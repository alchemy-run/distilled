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
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Location",
  serviceShapeName: "LocationService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "geo" });
const ver = /*@__PURE__*/ T.ServiceVersion("2020-11-19");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
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
            return e(`https://geo-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://geo.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://geo.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://geo.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
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
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
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
      Reason: S.String,
      FieldList: /*@__PURE__*/ S.suspend(() => __S(1121, __c70, 1)).annotate({
        identifier: "ValidationExceptionFieldList",
      }),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type BatchDeleteDevicePositionHistoryErrorList = BatchDeleteDevicePositionHistoryError_[];
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
export type BatchUpdateDevicePositionErrorList = BatchUpdateDevicePositionError_[];
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
export type PlaceSupplementalCategoryList = (string | redacted.Redacted<string>)[];
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
export type ListDevicePositionsResponseEntryList = ListDevicePositionsResponseEntry[];
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
export type ListGeofenceCollectionsResponseEntryList = ListGeofenceCollectionsResponseEntry[];
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
export type ListRouteCalculatorsResponseEntryList = ListRouteCalculatorsResponseEntry[];
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
 * Currently not supported -- Cross-account configurations, such as creating associations between a tracker resource in one account and a geofence collection in another account.
 */
export const associateTrackerConsumer: API.OperationMethod<
  AssociateTrackerConsumerRequest,
  AssociateTrackerConsumerResponse,
  AssociateTrackerConsumerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1296, __c81, 0) as any as S.Schema<AssociateTrackerConsumerRequest>,
  output: __S(1312, __c82, 0) as any as S.Schema<AssociateTrackerConsumerResponse>,
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
}));

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
  input: __S(1344, __c84, 0) as any as S.Schema<BatchDeleteDevicePositionHistoryRequest>,
  output: __S(1347, __c84, 3) as any as S.Schema<BatchDeleteDevicePositionHistoryResponse>,
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
}));

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
  input: __S(1392, __c87, 0) as any as S.Schema<BatchDeleteGeofenceRequest>,
  output: __S(1395, __c87, 3) as any as S.Schema<BatchDeleteGeofenceResponse>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<BatchEvaluateGeofencesRequest>,
  output: __S(3, __c0, 3) as any as S.Schema<BatchEvaluateGeofencesResponse>,
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
}));

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
  input: __S(80, __c5, 0) as any as S.Schema<BatchGetDevicePositionRequest>,
  output: __S(83, __c5, 3) as any as S.Schema<BatchGetDevicePositionResponse>,
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
}));

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
  input: __S(130, __c8, 2) as any as S.Schema<BatchPutGeofenceRequest>,
  output: __S(134, __c8, 6) as any as S.Schema<BatchPutGeofenceResponse>,
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
}));

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
  input: __S(208, __c13, 0) as any as S.Schema<BatchUpdateDevicePositionRequest>,
  output: __S(211, __c13, 3) as any as S.Schema<BatchUpdateDevicePositionResponse>,
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
}));

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
  input: __S(224, __c14, 0) as any as S.Schema<CalculateRouteRequest>,
  output: __S(231, __c14, 7) as any as S.Schema<CalculateRouteResponse>,
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
}));

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
  input: __S(256, __c16, 0) as any as S.Schema<CalculateRouteMatrixRequest>,
  output: __S(262, __c16, 6) as any as S.Schema<CalculateRouteMatrixResponse>,
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
}));

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
  input: __S(272, __c17, 0) as any as S.Schema<CancelJobRequest>,
  output: __S(273, __c17, 1) as any as S.Schema<CancelJobResponse>,
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
}));

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
  input: __S(288, __c18, 0) as any as S.Schema<CreateGeofenceCollectionRequest>,
  output: __S(289, __c18, 1) as any as S.Schema<CreateGeofenceCollectionResponse>,
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
}));

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
  input: __S(304, __c19, 0) as any as S.Schema<CreateKeyRequest>,
  output: __S(305, __c19, 1) as any as S.Schema<CreateKeyResponse>,
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
}));

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
  input: __S(352, __c22, 0) as any as S.Schema<CreateMapRequest>,
  output: __S(353, __c22, 1) as any as S.Schema<CreateMapResponse>,
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
}));

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
  input: __S(384, __c24, 0) as any as S.Schema<CreatePlaceIndexRequest>,
  output: __S(385, __c24, 1) as any as S.Schema<CreatePlaceIndexResponse>,
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
}));

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
  input: __S(416, __c26, 0) as any as S.Schema<CreateRouteCalculatorRequest>,
  output: __S(417, __c26, 1) as any as S.Schema<CreateRouteCalculatorResponse>,
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
}));

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
  input: __S(432, __c27, 0) as any as S.Schema<CreateTrackerRequest>,
  output: __S(433, __c27, 1) as any as S.Schema<CreateTrackerResponse>,
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
}));

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
  input: __S(448, __c28, 0) as any as S.Schema<DeleteGeofenceCollectionRequest>,
  output: __S(1312, __c82, 0) as any as S.Schema<DeleteGeofenceCollectionResponse>,
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
}));

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
  input: __S(464, __c29, 0) as any as S.Schema<DeleteKeyRequest>,
  output: __S(1312, __c82, 0) as any as S.Schema<DeleteKeyResponse>,
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
}));

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
  input: __S(480, __c30, 0) as any as S.Schema<DeleteMapRequest>,
  output: __S(1312, __c82, 0) as any as S.Schema<DeleteMapResponse>,
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
}));

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
  input: __S(496, __c31, 0) as any as S.Schema<DeletePlaceIndexRequest>,
  output: __S(1312, __c82, 0) as any as S.Schema<DeletePlaceIndexResponse>,
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
}));

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
  input: __S(512, __c32, 0) as any as S.Schema<DeleteRouteCalculatorRequest>,
  output: __S(1312, __c82, 0) as any as S.Schema<DeleteRouteCalculatorResponse>,
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
}));

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
  input: __S(528, __c33, 0) as any as S.Schema<DeleteTrackerRequest>,
  output: __S(1312, __c82, 0) as any as S.Schema<DeleteTrackerResponse>,
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
}));

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
  input: __S(544, __c34, 0) as any as S.Schema<DescribeGeofenceCollectionRequest>,
  output: __S(545, __c34, 1) as any as S.Schema<DescribeGeofenceCollectionResponse>,
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
}));

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
  input: __S(560, __c35, 0) as any as S.Schema<DescribeKeyRequest>,
  output: __S(561, __c35, 1) as any as S.Schema<DescribeKeyResponse>,
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
}));

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
  input: __S(576, __c36, 0) as any as S.Schema<DescribeMapRequest>,
  output: __S(577, __c36, 1) as any as S.Schema<DescribeMapResponse>,
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
}));

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
  input: __S(592, __c37, 0) as any as S.Schema<DescribePlaceIndexRequest>,
  output: __S(593, __c37, 1) as any as S.Schema<DescribePlaceIndexResponse>,
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
}));

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
  input: __S(608, __c38, 0) as any as S.Schema<DescribeRouteCalculatorRequest>,
  output: __S(609, __c38, 1) as any as S.Schema<DescribeRouteCalculatorResponse>,
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
}));

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
  input: __S(624, __c39, 0) as any as S.Schema<DescribeTrackerRequest>,
  output: __S(625, __c39, 1) as any as S.Schema<DescribeTrackerResponse>,
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
}));

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
  input: __S(640, __c40, 0) as any as S.Schema<DisassociateTrackerConsumerRequest>,
  output: __S(1312, __c82, 0) as any as S.Schema<DisassociateTrackerConsumerResponse>,
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
}));

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
  input: __S(657, __c41, 1) as any as S.Schema<ForecastGeofenceEventsRequest>,
  output: __S(660, __c41, 4) as any as S.Schema<ForecastGeofenceEventsResponse>,
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
  input: __S(672, __c42, 0) as any as S.Schema<GetDevicePositionRequest>,
  output: __S(96, __c6, 0) as any as S.Schema<GetDevicePositionResponse>,
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
}));

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
  input: __S(688, __c43, 0) as any as S.Schema<GetDevicePositionHistoryRequest>,
  output: __S(689, __c43, 1) as any as S.Schema<GetDevicePositionHistoryResponse>,
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
  input: __S(704, __c44, 0) as any as S.Schema<GetGeofenceRequest>,
  output: __S(720, __c45, 0) as any as S.Schema<GetGeofenceResponse>,
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
}));

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
  input: __S(736, __c46, 0) as any as S.Schema<GetJobRequest>,
  output: __S(737, __c46, 1) as any as S.Schema<GetJobResponse>,
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
}));

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
  input: __S(784, __c49, 0) as any as S.Schema<GetMapGlyphsRequest>,
  output: __S(800, __c50, 0) as any as S.Schema<GetMapGlyphsResponse>,
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
}));

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
  input: __S(816, __c51, 0) as any as S.Schema<GetMapSpritesRequest>,
  output: __S(800, __c50, 0) as any as S.Schema<GetMapSpritesResponse>,
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
}));

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
 * The style descriptor contains speciU+FB01cations on how features render on a map. For example, what data to display, what order to display the data in, and the style for the data. Style descriptors follow the Mapbox Style Specification.
 */
export const getMapStyleDescriptor: API.OperationMethod<
  GetMapStyleDescriptorRequest,
  GetMapStyleDescriptorResponse,
  GetMapStyleDescriptorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c52, 0) as any as S.Schema<GetMapStyleDescriptorRequest>,
  output: __S(800, __c50, 0) as any as S.Schema<GetMapStyleDescriptorResponse>,
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
}));

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
  input: __S(848, __c53, 0) as any as S.Schema<GetMapTileRequest>,
  output: __S(800, __c50, 0) as any as S.Schema<GetMapTileResponse>,
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
}));

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
  input: __S(864, __c54, 0) as any as S.Schema<GetPlaceRequest>,
  output: __S(865, __c54, 1) as any as S.Schema<GetPlaceResponse>,
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
}));

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
  input: __S(897, __c56, 1) as any as S.Schema<ListDevicePositionsRequest>,
  output: __S(898, __c56, 2) as any as S.Schema<ListDevicePositionsResponse>,
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
  input: __S(912, __c57, 0) as any as S.Schema<ListGeofenceCollectionsRequest>,
  output: __S(915, __c57, 3) as any as S.Schema<ListGeofenceCollectionsResponse>,
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
  input: __S(928, __c58, 0) as any as S.Schema<ListGeofencesRequest>,
  output: __S(930, __c58, 2) as any as S.Schema<ListGeofencesResponse>,
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
  input: __S(945, __c59, 1) as any as S.Schema<ListJobsRequest>,
  output: __S(948, __c59, 4) as any as S.Schema<ListJobsResponse>,
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
  input: __S(961, __c60, 1) as any as S.Schema<ListKeysRequest>,
  output: __S(964, __c60, 4) as any as S.Schema<ListKeysResponse>,
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
  input: __S(976, __c61, 0) as any as S.Schema<ListMapsRequest>,
  output: __S(979, __c61, 3) as any as S.Schema<ListMapsResponse>,
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
  input: __S(992, __c62, 0) as any as S.Schema<ListPlaceIndexesRequest>,
  output: __S(995, __c62, 3) as any as S.Schema<ListPlaceIndexesResponse>,
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
  input: __S(1008, __c63, 0) as any as S.Schema<ListRouteCalculatorsRequest>,
  output: __S(1011, __c63, 3) as any as S.Schema<ListRouteCalculatorsResponse>,
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
  input: __S(1024, __c64, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(1025, __c64, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
}));

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
  input: __S(1040, __c65, 0) as any as S.Schema<ListTrackerConsumersRequest>,
  output: __S(1041, __c65, 1) as any as S.Schema<ListTrackerConsumersResponse>,
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
  input: __S(1056, __c66, 0) as any as S.Schema<ListTrackersRequest>,
  output: __S(1059, __c66, 3) as any as S.Schema<ListTrackersResponse>,
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
  input: __S(1072, __c67, 0) as any as S.Schema<PutGeofenceRequest>,
  output: __S(192, __c12, 0) as any as S.Schema<PutGeofenceResponse>,
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
}));

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
  input: __S(1088, __c68, 0) as any as S.Schema<SearchPlaceIndexForPositionRequest>,
  output: __S(1092, __c68, 4) as any as S.Schema<SearchPlaceIndexForPositionResponse>,
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
}));

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
  input: __S(1104, __c69, 0) as any as S.Schema<SearchPlaceIndexForSuggestionsRequest>,
  output: __S(1108, __c69, 4) as any as S.Schema<SearchPlaceIndexForSuggestionsResponse>,
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
}));

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
  input: __S(1136, __c71, 0) as any as S.Schema<SearchPlaceIndexForTextRequest>,
  output: __S(1140, __c71, 4) as any as S.Schema<SearchPlaceIndexForTextResponse>,
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
}));

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
  input: __S(1152, __c72, 0) as any as S.Schema<StartJobRequest>,
  output: __S(1153, __c72, 1) as any as S.Schema<StartJobResponse>,
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
}));

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
  input: __S(1168, __c73, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(1312, __c82, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(1184, __c74, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(1312, __c82, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(1200, __c75, 0) as any as S.Schema<UpdateGeofenceCollectionRequest>,
  output: __S(1201, __c75, 1) as any as S.Schema<UpdateGeofenceCollectionResponse>,
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
}));

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
  input: __S(1216, __c76, 0) as any as S.Schema<UpdateKeyRequest>,
  output: __S(1217, __c76, 1) as any as S.Schema<UpdateKeyResponse>,
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
}));

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
  input: __S(1233, __c77, 1) as any as S.Schema<UpdateMapRequest>,
  output: __S(1234, __c77, 2) as any as S.Schema<UpdateMapResponse>,
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
}));

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
  input: __S(1248, __c78, 0) as any as S.Schema<UpdatePlaceIndexRequest>,
  output: __S(1249, __c78, 1) as any as S.Schema<UpdatePlaceIndexResponse>,
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
}));

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
  input: __S(1264, __c79, 0) as any as S.Schema<UpdateRouteCalculatorRequest>,
  output: __S(1265, __c79, 1) as any as S.Schema<UpdateRouteCalculatorResponse>,
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
}));

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
  input: __S(1280, __c80, 0) as any as S.Schema<UpdateTrackerRequest>,
  output: __S(1281, __c80, 1) as any as S.Schema<UpdateTrackerResponse>,
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
}));

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
  input: __S(1337, __c83, 9) as any as S.Schema<VerifyDevicePositionRequest>,
  output: __S(1339, __c83, 11) as any as S.Schema<VerifyDevicePositionResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CollectionName: S.String.pipe(T.HttpLabel("CollectionName")),
          DevicePositionUpdates: __S(65, __c4, 1),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/geofencing/v0/collections/{CollectionName}/positions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchEvaluateGeofencesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DeviceId: S.String,
          SampleTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          Error: __S(1360, __c85, 0),
        }),
      ).annotate({ identifier: "BatchEvaluateGeofencesError" });
    case 2:
      return S.Array(__S(1, __c0, 1));
    case 3:
      return S.suspend(() => S.Struct({ Errors: S.optional(__S(2, __c0, 2)) })).annotate({
        identifier: "BatchEvaluateGeofencesResponse",
      });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Number);
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Horizontal: S.Number })).annotate({
        identifier: "PositionalAccuracy",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DeviceId: S.String,
          SampleTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          Position: __S(16, __c1, 0),
          Accuracy: S.optional(__S(48, __c3, 0)),
          PositionProperties: S.optional(__S(32, __c2, 0)),
        }),
      ).annotate({ identifier: "DevicePositionUpdate" });
    case 1:
      return S.Array(__S(64, __c4, 0));
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TrackerName: S.String.pipe(T.HttpLabel("TrackerName")),
          DeviceIds: __S(1376, __c86, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tracking/v0/trackers/{TrackerName}/get-positions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetDevicePositionRequest" });
    case 1:
      return S.suspend(() => S.Struct({ DeviceId: S.String, Error: __S(1360, __c85, 0) })).annotate(
        { identifier: "BatchGetDevicePositionError" },
      );
    case 2:
      return S.Array(__S(81, __c5, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Errors: __S(82, __c5, 2), DevicePositions: __S(112, __c7, 0) }),
      ).annotate({ identifier: "BatchGetDevicePositionResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DeviceId: S.optional(S.String),
          SampleTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ReceivedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          Position: __S(16, __c1, 0),
          Accuracy: S.optional(__S(48, __c3, 0)),
          PositionProperties: S.optional(__S(32, __c2, 0)),
        }),
      ).annotate({ identifier: "DevicePosition" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(96, __c6, 0));
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GeofenceId: S.String,
          Geometry: __S(178, __c11, 2),
          GeofenceProperties: S.optional(__S(32, __c2, 0)),
        }),
      ).annotate({ identifier: "BatchPutGeofenceRequestEntry" });
    case 1:
      return S.Array(__S(128, __c8, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          CollectionName: S.String.pipe(T.HttpLabel("CollectionName")),
          Entries: __S(129, __c8, 1),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/geofencing/v0/collections/{CollectionName}/put-geofences",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchPutGeofenceRequest" });
    case 3:
      return S.Array(__S(192, __c12, 0));
    case 4:
      return S.suspend(() =>
        S.Struct({ GeofenceId: S.String, Error: __S(1360, __c85, 0) }),
      ).annotate({ identifier: "BatchPutGeofenceError" });
    case 5:
      return S.Array(__S(132, __c8, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ Successes: __S(131, __c8, 3), Errors: __S(133, __c8, 5) }),
      ).annotate({ identifier: "BatchPutGeofenceResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(16, __c1, 0));
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(144, __c9, 0));
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Center: __S(16, __c1, 0), Radius: S.Number })).annotate({
        identifier: "Circle",
      });
    case 1:
      return S.Array(__S(160, __c10, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Polygon: S.optional(__S(160, __c10, 0)),
          Circle: S.optional(__S(176, __c11, 0)),
          Geobuf: S.optional(SensitiveBlob),
          MultiPolygon: S.optional(__S(177, __c11, 1)),
        }),
      ).annotate({ identifier: "GeofenceGeometry" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GeofenceId: S.String,
          CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "BatchPutGeofenceSuccess" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TrackerName: S.String.pipe(T.HttpLabel("TrackerName")),
          Updates: __S(65, __c4, 1),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tracking/v0/trackers/{TrackerName}/positions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchUpdateDevicePositionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DeviceId: S.String,
          SampleTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          Error: __S(1360, __c85, 0),
        }),
      ).annotate({ identifier: "BatchUpdateDevicePositionError" });
    case 2:
      return S.Array(__S(209, __c13, 1));
    case 3:
      return S.suspend(() => S.Struct({ Errors: __S(210, __c13, 2) })).annotate({
        identifier: "BatchUpdateDevicePositionResponse",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CalculatorName: S.String.pipe(T.HttpLabel("CalculatorName")),
          DeparturePosition: __S(16, __c1, 0),
          DestinationPosition: __S(16, __c1, 0),
          WaypointPositions: S.optional(__S(144, __c9, 0)),
          TravelMode: S.optional(S.String),
          DepartureTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          DepartNow: S.optional(S.Boolean),
          DistanceUnit: S.optional(S.String),
          IncludeLegGeometry: S.optional(S.Boolean),
          CarModeOptions: S.optional(__S(240, __c15, 0)),
          TruckModeOptions: S.optional(__S(243, __c15, 3)),
          ArrivalTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          OptimizeFor: S.optional(S.String),
          Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/routes/v0/calculators/{CalculatorName}/calculate/route",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CalculateRouteRequest" });
    case 1:
      return S.suspend(() => S.Struct({ LineString: S.optional(__S(144, __c9, 0)) })).annotate({
        identifier: "LegGeometry",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          StartPosition: __S(16, __c1, 0),
          EndPosition: __S(16, __c1, 0),
          Distance: S.Number,
          DurationSeconds: S.Number,
          GeometryOffset: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Step" });
    case 3:
      return S.Array(__S(226, __c14, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          StartPosition: __S(16, __c1, 0),
          EndPosition: __S(16, __c1, 0),
          Distance: S.Number,
          DurationSeconds: S.Number,
          Geometry: S.optional(__S(225, __c14, 1)),
          Steps: __S(227, __c14, 3),
        }),
      ).annotate({ identifier: "Leg" });
    case 5:
      return S.Array(__S(228, __c14, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          RouteBBox: __S(16, __c1, 0),
          DataSource: S.String,
          Distance: S.Number,
          DurationSeconds: S.Number,
          DistanceUnit: S.String,
        }),
      ).annotate({ identifier: "CalculateRouteSummary" });
    case 7:
      return S.suspend(() =>
        S.Struct({ Legs: __S(229, __c14, 5), Summary: __S(230, __c14, 6) }),
      ).annotate({ identifier: "CalculateRouteResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AvoidFerries: S.optional(S.Boolean), AvoidTolls: S.optional(S.Boolean) }),
      ).annotate({ identifier: "CalculateRouteCarModeOptions" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Length: S.optional(S.Number),
          Height: S.optional(S.Number),
          Width: S.optional(S.Number),
          Unit: S.optional(S.String),
        }),
      ).annotate({ identifier: "TruckDimensions" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Total: S.optional(S.Number), Unit: S.optional(S.String) }),
      ).annotate({ identifier: "TruckWeight" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          AvoidFerries: S.optional(S.Boolean),
          AvoidTolls: S.optional(S.Boolean),
          Dimensions: S.optional(__S(241, __c15, 1)),
          Weight: S.optional(__S(242, __c15, 2)),
        }),
      ).annotate({ identifier: "CalculateRouteTruckModeOptions" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CalculatorName: S.String.pipe(T.HttpLabel("CalculatorName")),
          DeparturePositions: __S(144, __c9, 0),
          DestinationPositions: __S(144, __c9, 0),
          TravelMode: S.optional(S.String),
          DepartureTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          DepartNow: S.optional(S.Boolean),
          DistanceUnit: S.optional(S.String),
          CarModeOptions: S.optional(__S(240, __c15, 0)),
          TruckModeOptions: S.optional(__S(243, __c15, 3)),
          Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/routes/v0/calculators/{CalculatorName}/calculate/route-matrix",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CalculateRouteMatrixRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Code: S.String, Message: S.optional(S.String) })).annotate({
        identifier: "RouteMatrixEntryError",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Distance: S.optional(S.Number),
          DurationSeconds: S.optional(S.Number),
          Error: S.optional(__S(257, __c16, 1)),
        }),
      ).annotate({ identifier: "RouteMatrixEntry" });
    case 3:
      return S.Array(__S(258, __c16, 2));
    case 4:
      return S.Array(__S(259, __c16, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          DataSource: S.String,
          RouteCount: S.Number,
          ErrorCount: S.Number,
          DistanceUnit: S.String,
        }),
      ).annotate({ identifier: "CalculateRouteMatrixSummary" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          RouteMatrix: __S(260, __c16, 4),
          SnappedDeparturePositions: S.optional(__S(144, __c9, 0)),
          SnappedDestinationPositions: S.optional(__S(144, __c9, 0)),
          Summary: __S(261, __c16, 5),
        }),
      ).annotate({ identifier: "CalculateRouteMatrixResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/metadata/v0/jobs/cancel-job" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ JobArn: S.String, JobId: S.String, Status: S.String }),
      ).annotate({ identifier: "CancelJobResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CollectionName: S.String,
          PricingPlan: S.optional(S.String),
          PricingPlanDataSource: S.optional(S.String),
          Description: S.optional(S.String),
          Tags: S.optional(__S(32, __c2, 0)),
          KmsKeyId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/geofencing/v0/collections" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateGeofenceCollectionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CollectionName: S.String,
          CollectionArn: S.String,
          CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "CreateGeofenceCollectionResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          KeyName: S.String,
          Restrictions: __S(340, __c21, 4),
          Description: S.optional(S.String),
          ExpireTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          NoExpiry: S.optional(S.Boolean),
          Tags: S.optional(__S(32, __c2, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/metadata/v0/keys" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateKeyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Key: SensitiveString,
          KeyArn: S.String,
          KeyName: S.String,
          CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "CreateKeyResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.Array(SensitiveString);
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Package: S.String, CertificateFingerprint: S.String }),
      ).annotate({ identifier: "AndroidApp" });
    case 1:
      return S.Array(__S(336, __c21, 0));
    case 2:
      return S.suspend(() => S.Struct({ BundleId: S.String })).annotate({ identifier: "AppleApp" });
    case 3:
      return S.Array(__S(338, __c21, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          AllowActions: __S(1376, __c86, 0),
          AllowResources: __S(1376, __c86, 0),
          AllowReferers: S.optional(__S(320, __c20, 0)),
          AllowAndroidApps: S.optional(__S(337, __c21, 1)),
          AllowAppleApps: S.optional(__S(339, __c21, 3)),
        }),
      ).annotate({ identifier: "ApiKeyRestrictions" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MapName: S.String,
          Configuration: __S(368, __c23, 0),
          PricingPlan: S.optional(S.String),
          Description: S.optional(S.String),
          Tags: S.optional(__S(32, __c2, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/maps/v0/maps" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateMapRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MapName: S.String,
          MapArn: S.String,
          CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "CreateMapResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Style: S.String,
          PoliticalView: S.optional(SensitiveString),
          CustomLayers: S.optional(__S(1376, __c86, 0)),
        }),
      ).annotate({ identifier: "MapConfiguration" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IndexName: S.String,
          DataSource: S.String,
          PricingPlan: S.optional(S.String),
          Description: S.optional(S.String),
          DataSourceConfiguration: S.optional(__S(400, __c25, 0)),
          Tags: S.optional(__S(32, __c2, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/places/v0/indexes" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreatePlaceIndexRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          IndexName: S.String,
          IndexArn: S.String,
          CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "CreatePlaceIndexResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ IntendedUse: S.optional(S.String) })).annotate({
        identifier: "DataSourceConfiguration",
      });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CalculatorName: S.String,
          DataSource: S.String,
          PricingPlan: S.optional(S.String),
          Description: S.optional(S.String),
          Tags: S.optional(__S(32, __c2, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/routes/v0/calculators" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateRouteCalculatorRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CalculatorName: S.String,
          CalculatorArn: S.String,
          CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "CreateRouteCalculatorResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TrackerName: S.String,
          PricingPlan: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          PricingPlanDataSource: S.optional(S.String),
          Description: S.optional(S.String),
          Tags: S.optional(__S(32, __c2, 0)),
          PositionFiltering: S.optional(S.String),
          EventBridgeEnabled: S.optional(S.Boolean),
          KmsKeyEnableGeospatialQueries: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tracking/v0/trackers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateTrackerRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TrackerName: S.String,
          TrackerArn: S.String,
          CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "CreateTrackerResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CollectionName: S.String.pipe(T.HttpLabel("CollectionName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/geofencing/v0/collections/{CollectionName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteGeofenceCollectionRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          KeyName: S.String.pipe(T.HttpLabel("KeyName")),
          ForceDelete: S.optional(S.Boolean).pipe(T.HttpQuery("forceDelete")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/metadata/v0/keys/{KeyName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteKeyRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MapName: S.String.pipe(T.HttpLabel("MapName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/maps/v0/maps/{MapName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMapRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IndexName: S.String.pipe(T.HttpLabel("IndexName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/places/v0/indexes/{IndexName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePlaceIndexRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CalculatorName: S.String.pipe(T.HttpLabel("CalculatorName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/routes/v0/calculators/{CalculatorName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRouteCalculatorRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TrackerName: S.String.pipe(T.HttpLabel("TrackerName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tracking/v0/trackers/{TrackerName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTrackerRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CollectionName: S.String.pipe(T.HttpLabel("CollectionName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/geofencing/v0/collections/{CollectionName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeGeofenceCollectionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CollectionName: S.String,
          CollectionArn: S.String,
          Description: S.optional(S.String),
          PricingPlan: S.optional(S.String),
          PricingPlanDataSource: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          Tags: S.optional(__S(32, __c2, 0)),
          CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          GeofenceCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DescribeGeofenceCollectionResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ KeyName: S.String.pipe(T.HttpLabel("KeyName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/metadata/v0/keys/{KeyName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeKeyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Key: SensitiveString,
          KeyArn: S.String,
          KeyName: S.String,
          Restrictions: __S(340, __c21, 4),
          CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ExpireTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          Description: S.optional(S.String),
          Tags: S.optional(__S(32, __c2, 0)),
        }),
      ).annotate({ identifier: "DescribeKeyResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MapName: S.String.pipe(T.HttpLabel("MapName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/maps/v0/maps/{MapName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeMapRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MapName: S.String,
          MapArn: S.String,
          PricingPlan: S.optional(S.String),
          DataSource: S.String,
          Configuration: __S(368, __c23, 0),
          Description: S.optional(S.String),
          Tags: S.optional(__S(32, __c2, 0)),
          CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "DescribeMapResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IndexName: S.String.pipe(T.HttpLabel("IndexName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/places/v0/indexes/{IndexName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribePlaceIndexRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          IndexName: S.String,
          IndexArn: S.String,
          PricingPlan: S.optional(S.String),
          Description: S.optional(S.String),
          CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          DataSource: S.String,
          DataSourceConfiguration: __S(400, __c25, 0),
          Tags: S.optional(__S(32, __c2, 0)),
        }),
      ).annotate({ identifier: "DescribePlaceIndexResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CalculatorName: S.String.pipe(T.HttpLabel("CalculatorName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/routes/v0/calculators/{CalculatorName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeRouteCalculatorRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CalculatorName: S.String,
          CalculatorArn: S.String,
          PricingPlan: S.optional(S.String),
          Description: S.optional(S.String),
          CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          DataSource: S.String,
          Tags: S.optional(__S(32, __c2, 0)),
        }),
      ).annotate({ identifier: "DescribeRouteCalculatorResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TrackerName: S.String.pipe(T.HttpLabel("TrackerName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tracking/v0/trackers/{TrackerName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeTrackerRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TrackerName: S.String,
          TrackerArn: S.String,
          Description: S.optional(S.String),
          PricingPlan: S.optional(S.String),
          PricingPlanDataSource: S.optional(S.String),
          Tags: S.optional(__S(32, __c2, 0)),
          CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          KmsKeyId: S.optional(S.String),
          PositionFiltering: S.optional(S.String),
          EventBridgeEnabled: S.optional(S.Boolean),
          KmsKeyEnableGeospatialQueries: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DescribeTrackerResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TrackerName: S.String.pipe(T.HttpLabel("TrackerName")),
          ConsumerArn: S.String.pipe(T.HttpLabel("ConsumerArn")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/tracking/v0/trackers/{TrackerName}/consumers/{ConsumerArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateTrackerConsumerRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Position: __S(16, __c1, 0), Speed: S.optional(S.Number) }),
      ).annotate({ identifier: "ForecastGeofenceEventsDeviceState" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CollectionName: S.String.pipe(T.HttpLabel("CollectionName")),
          DeviceState: __S(656, __c41, 0),
          TimeHorizonMinutes: S.optional(S.Number),
          DistanceUnit: S.optional(S.String),
          SpeedUnit: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/geofencing/v0/collections/{CollectionName}/forecast-geofence-events",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ForecastGeofenceEventsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          EventId: S.String,
          GeofenceId: S.String,
          IsDeviceInGeofence: S.Boolean,
          NearestDistance: S.Number,
          EventType: S.String,
          ForecastedBreachTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          GeofenceProperties: S.optional(__S(32, __c2, 0)),
        }),
      ).annotate({ identifier: "ForecastedEvent" });
    case 3:
      return S.Array(__S(658, __c41, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          ForecastedEvents: __S(659, __c41, 3),
          NextToken: S.optional(S.String),
          DistanceUnit: S.String,
          SpeedUnit: S.String,
        }),
      ).annotate({ identifier: "ForecastGeofenceEventsResponse" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TrackerName: S.String.pipe(T.HttpLabel("TrackerName")),
          DeviceId: S.String.pipe(T.HttpLabel("DeviceId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/tracking/v0/trackers/{TrackerName}/devices/{DeviceId}/positions/latest",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDevicePositionRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TrackerName: S.String.pipe(T.HttpLabel("TrackerName")),
          DeviceId: S.String.pipe(T.HttpLabel("DeviceId")),
          NextToken: S.optional(S.String),
          StartTimeInclusive: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndTimeExclusive: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          MaxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/tracking/v0/trackers/{TrackerName}/devices/{DeviceId}/list-positions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDevicePositionHistoryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DevicePositions: __S(112, __c7, 0), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetDevicePositionHistoryResponse" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CollectionName: S.String.pipe(T.HttpLabel("CollectionName")),
          GeofenceId: S.String.pipe(T.HttpLabel("GeofenceId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/geofencing/v0/collections/{CollectionName}/geofences/{GeofenceId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetGeofenceRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GeofenceId: S.String,
          Geometry: __S(178, __c11, 2),
          Status: S.String,
          CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          GeofenceProperties: S.optional(__S(32, __c2, 0)),
        }),
      ).annotate({ identifier: "GetGeofenceResponse" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobId: S.String.pipe(T.HttpLabel("JobId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/metadata/v0/jobs/{JobId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Action: S.String,
          ActionOptions: S.optional(__S(769, __c48, 1)),
          CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          EndedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Error: S.optional(__S(752, __c47, 0)),
          ExecutionRoleArn: S.String,
          InputOptions: __S(770, __c48, 2),
          JobArn: S.String,
          JobId: S.String,
          Name: S.optional(S.String),
          OutputOptions: __S(771, __c48, 3),
          Status: S.String,
          UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          Tags: S.optional(__S(32, __c2, 0)),
        }),
      ).annotate({ identifier: "GetJobResponse" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Code: S.String, Messages: S.optional(__S(1376, __c86, 0)) }),
      ).annotate({ identifier: "JobError" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AdditionalFeatures: S.optional(__S(1376, __c86, 0)) }),
      ).annotate({ identifier: "ValidateAddressActionOptions" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ValidateAddress: S.optional(__S(768, __c48, 0)) }),
      ).annotate({ identifier: "JobActionOptions" });
    case 2:
      return S.suspend(() => S.Struct({ Location: S.String, Format: S.String })).annotate({
        identifier: "JobInputOptions",
      });
    case 3:
      return S.suspend(() => S.Struct({ Format: S.String, Location: S.String })).annotate({
        identifier: "JobOutputOptions",
      });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MapName: S.String.pipe(T.HttpLabel("MapName")),
          FontStack: S.String.pipe(T.HttpLabel("FontStack")),
          FontUnicodeRange: S.String.pipe(T.HttpLabel("FontUnicodeRange")),
          Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/maps/v0/maps/{MapName}/glyphs/{FontStack}/{FontUnicodeRange}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMapGlyphsRequest" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Blob: S.optional(T.Blob).pipe(T.HttpPayload()),
          ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
          CacheControl: S.optional(S.String).pipe(T.HttpHeader("Cache-Control")),
        }),
      ).annotate({ identifier: "GetMapGlyphsResponse" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MapName: S.String.pipe(T.HttpLabel("MapName")),
          FileName: S.String.pipe(T.HttpLabel("FileName")),
          Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/maps/v0/maps/{MapName}/sprites/{FileName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMapSpritesRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MapName: S.String.pipe(T.HttpLabel("MapName")),
          Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/maps/v0/maps/{MapName}/style-descriptor" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMapStyleDescriptorRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MapName: S.String.pipe(T.HttpLabel("MapName")),
          Z: SensitiveString.pipe(T.HttpLabel("Z")),
          X: SensitiveString.pipe(T.HttpLabel("X")),
          Y: SensitiveString.pipe(T.HttpLabel("Y")),
          Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/maps/v0/maps/{MapName}/tiles/{Z}/{X}/{Y}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMapTileRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IndexName: S.String.pipe(T.HttpLabel("IndexName")),
          PlaceId: SensitiveString.pipe(T.HttpLabel("PlaceId")),
          Language: S.optional(S.String).pipe(T.HttpQuery("language")),
          Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/places/v0/indexes/{IndexName}/places/{PlaceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPlaceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Place: __S(882, __c55, 2) })).annotate({
        identifier: "GetPlaceResponse",
      });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Point: S.optional(__S(16, __c1, 0)) })).annotate({
        identifier: "PlaceGeometry",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ Name: SensitiveString, Offset: S.optional(S.Number) }),
      ).annotate({ identifier: "TimeZone" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Label: S.optional(SensitiveString),
          Geometry: __S(880, __c55, 0),
          AddressNumber: S.optional(SensitiveString),
          Street: S.optional(SensitiveString),
          Neighborhood: S.optional(SensitiveString),
          Municipality: S.optional(SensitiveString),
          SubRegion: S.optional(SensitiveString),
          Region: S.optional(SensitiveString),
          Country: S.optional(SensitiveString),
          PostalCode: S.optional(SensitiveString),
          Interpolated: S.optional(S.Boolean),
          TimeZone: S.optional(__S(881, __c55, 1)),
          UnitType: S.optional(SensitiveString),
          UnitNumber: S.optional(SensitiveString),
          Categories: S.optional(__S(320, __c20, 0)),
          SupplementalCategories: S.optional(__S(320, __c20, 0)),
          SubMunicipality: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "Place" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Polygon: S.optional(__S(160, __c10, 0)) })).annotate({
        identifier: "TrackingFilterGeometry",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TrackerName: S.String.pipe(T.HttpLabel("TrackerName")),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          FilterGeometry: S.optional(__S(896, __c56, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tracking/v0/trackers/{TrackerName}/list-positions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDevicePositionsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Entries: __S(65, __c4, 1), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDevicePositionsResponse" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/geofencing/v0/list-collections" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListGeofenceCollectionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CollectionName: S.String,
          Description: S.optional(S.String),
          PricingPlan: S.optional(S.String),
          PricingPlanDataSource: S.optional(S.String),
          CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "ListGeofenceCollectionsResponseEntry" });
    case 2:
      return S.Array(__S(913, __c57, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Entries: __S(914, __c57, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListGeofenceCollectionsResponse" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CollectionName: S.String.pipe(T.HttpLabel("CollectionName")),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/geofencing/v0/collections/{CollectionName}/list-geofences",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListGeofencesRequest" });
    case 1:
      return S.Array(__S(720, __c45, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Entries: __S(929, __c58, 1), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListGeofencesResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ JobStatus: S.optional(S.String) })).annotate({
        identifier: "JobsFilter",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Filter: S.optional(__S(944, __c59, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/metadata/v0/jobs/list-jobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListJobsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Action: S.String,
          ActionOptions: S.optional(__S(769, __c48, 1)),
          CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ExecutionRoleArn: S.String,
          EndedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Error: S.optional(__S(752, __c47, 0)),
          InputOptions: __S(770, __c48, 2),
          JobId: S.String,
          JobArn: S.String,
          Name: S.optional(S.String),
          OutputOptions: __S(771, __c48, 3),
          Status: S.String,
          UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "ListJobsResponseEntry" });
    case 3:
      return S.Array(__S(946, __c59, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ Entries: __S(947, __c59, 3), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListJobsResponse" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ KeyStatus: S.optional(S.String) })).annotate({
        identifier: "ApiKeyFilter",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Filter: S.optional(__S(960, __c60, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/metadata/v0/list-keys" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListKeysRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          KeyName: S.String,
          ExpireTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          Description: S.optional(S.String),
          Restrictions: __S(340, __c21, 4),
          CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "ListKeysResponseEntry" });
    case 3:
      return S.Array(__S(962, __c60, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ Entries: __S(963, __c60, 3), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListKeysResponse" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/maps/v0/list-maps" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMapsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MapName: S.String,
          Description: S.optional(S.String),
          DataSource: S.String,
          PricingPlan: S.optional(S.String),
          CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "ListMapsResponseEntry" });
    case 2:
      return S.Array(__S(977, __c61, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Entries: __S(978, __c61, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListMapsResponse" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/places/v0/list-indexes" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPlaceIndexesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          IndexName: S.String,
          Description: S.optional(S.String),
          DataSource: S.String,
          PricingPlan: S.optional(S.String),
          CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "ListPlaceIndexesResponseEntry" });
    case 2:
      return S.Array(__S(993, __c62, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Entries: __S(994, __c62, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListPlaceIndexesResponse" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/routes/v0/list-calculators" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRouteCalculatorsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CalculatorName: S.String,
          Description: S.optional(S.String),
          DataSource: S.String,
          PricingPlan: S.optional(S.String),
          CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "ListRouteCalculatorsResponseEntry" });
    case 2:
      return S.Array(__S(1009, __c63, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Entries: __S(1010, __c63, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRouteCalculatorsResponse" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(32, __c2, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TrackerName: S.String.pipe(T.HttpLabel("TrackerName")),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tracking/v0/trackers/{TrackerName}/list-consumers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTrackerConsumersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ConsumerArns: __S(1376, __c86, 0), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTrackerConsumersResponse" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tracking/v0/list-trackers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTrackersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TrackerName: S.String,
          Description: S.optional(S.String),
          PricingPlan: S.optional(S.String),
          PricingPlanDataSource: S.optional(S.String),
          CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "ListTrackersResponseEntry" });
    case 2:
      return S.Array(__S(1057, __c66, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Entries: __S(1058, __c66, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTrackersResponse" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CollectionName: S.String.pipe(T.HttpLabel("CollectionName")),
          GeofenceId: S.String.pipe(T.HttpLabel("GeofenceId")),
          Geometry: __S(178, __c11, 2),
          GeofenceProperties: S.optional(__S(32, __c2, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/geofencing/v0/collections/{CollectionName}/geofences/{GeofenceId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutGeofenceRequest" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IndexName: S.String.pipe(T.HttpLabel("IndexName")),
          Position: __S(16, __c1, 0),
          MaxResults: S.optional(S.Number),
          Language: S.optional(S.String),
          Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/places/v0/indexes/{IndexName}/search/position" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchPlaceIndexForPositionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Position: __S(16, __c1, 0),
          MaxResults: S.optional(S.Number),
          DataSource: S.String,
          Language: S.optional(S.String),
        }),
      ).annotate({ identifier: "SearchPlaceIndexForPositionSummary" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Place: __S(882, __c55, 2),
          Distance: S.Number,
          PlaceId: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "SearchForPositionResult" });
    case 3:
      return S.Array(__S(1090, __c68, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ Summary: __S(1089, __c68, 1), Results: __S(1091, __c68, 3) }),
      ).annotate({ identifier: "SearchPlaceIndexForPositionResponse" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IndexName: S.String.pipe(T.HttpLabel("IndexName")),
          Text: SensitiveString,
          BiasPosition: S.optional(__S(16, __c1, 0)),
          FilterBBox: S.optional(__S(16, __c1, 0)),
          FilterCountries: S.optional(__S(320, __c20, 0)),
          MaxResults: S.optional(S.Number),
          Language: S.optional(S.String),
          FilterCategories: S.optional(__S(320, __c20, 0)),
          Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/places/v0/indexes/{IndexName}/search/suggestions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchPlaceIndexForSuggestionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Text: SensitiveString,
          BiasPosition: S.optional(__S(16, __c1, 0)),
          FilterBBox: S.optional(__S(16, __c1, 0)),
          FilterCountries: S.optional(__S(320, __c20, 0)),
          MaxResults: S.optional(S.Number),
          DataSource: S.String,
          Language: S.optional(S.String),
          FilterCategories: S.optional(__S(320, __c20, 0)),
        }),
      ).annotate({ identifier: "SearchPlaceIndexForSuggestionsSummary" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Text: SensitiveString,
          PlaceId: S.optional(SensitiveString),
          Categories: S.optional(__S(320, __c20, 0)),
          SupplementalCategories: S.optional(__S(320, __c20, 0)),
        }),
      ).annotate({ identifier: "SearchForSuggestionsResult" });
    case 3:
      return S.Array(__S(1106, __c69, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ Summary: __S(1105, __c69, 1), Results: __S(1107, __c69, 3) }),
      ).annotate({ identifier: "SearchPlaceIndexForSuggestionsResponse" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Message: S.String }).pipe(
          S.encodeKeys({ Name: "name", Message: "message" }),
        ),
      ).annotate({ identifier: "ValidationExceptionField" });
    case 1:
      return S.Array(__S(1120, __c70, 0));
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IndexName: S.String.pipe(T.HttpLabel("IndexName")),
          Text: SensitiveString,
          BiasPosition: S.optional(__S(16, __c1, 0)),
          FilterBBox: S.optional(__S(16, __c1, 0)),
          FilterCountries: S.optional(__S(320, __c20, 0)),
          MaxResults: S.optional(S.Number),
          Language: S.optional(S.String),
          FilterCategories: S.optional(__S(320, __c20, 0)),
          Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/places/v0/indexes/{IndexName}/search/text" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchPlaceIndexForTextRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Text: SensitiveString,
          BiasPosition: S.optional(__S(16, __c1, 0)),
          FilterBBox: S.optional(__S(16, __c1, 0)),
          FilterCountries: S.optional(__S(320, __c20, 0)),
          MaxResults: S.optional(S.Number),
          ResultBBox: S.optional(__S(16, __c1, 0)),
          DataSource: S.String,
          Language: S.optional(S.String),
          FilterCategories: S.optional(__S(320, __c20, 0)),
        }),
      ).annotate({ identifier: "SearchPlaceIndexForTextSummary" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Place: __S(882, __c55, 2),
          Distance: S.optional(S.Number),
          Relevance: S.optional(S.Number),
          PlaceId: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "SearchForTextResult" });
    case 3:
      return S.Array(__S(1138, __c71, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ Summary: __S(1137, __c71, 1), Results: __S(1139, __c71, 3) }),
      ).annotate({ identifier: "SearchPlaceIndexForTextResponse" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Action: S.String,
          ActionOptions: S.optional(__S(769, __c48, 1)),
          ExecutionRoleArn: S.String,
          InputOptions: __S(770, __c48, 2),
          Name: S.optional(S.String),
          OutputOptions: __S(771, __c48, 3),
          Tags: S.optional(__S(32, __c2, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/metadata/v0/jobs" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          JobArn: S.String,
          JobId: S.String,
          Status: S.String,
        }),
      ).annotate({ identifier: "StartJobResponse" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Tags: __S(32, __c2, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: __S(1376, __c86, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CollectionName: S.String.pipe(T.HttpLabel("CollectionName")),
          PricingPlan: S.optional(S.String),
          PricingPlanDataSource: S.optional(S.String),
          Description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/geofencing/v0/collections/{CollectionName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateGeofenceCollectionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CollectionName: S.String,
          CollectionArn: S.String,
          UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "UpdateGeofenceCollectionResponse" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          KeyName: S.String.pipe(T.HttpLabel("KeyName")),
          Description: S.optional(S.String),
          ExpireTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          NoExpiry: S.optional(S.Boolean),
          ForceUpdate: S.optional(S.Boolean),
          Restrictions: S.optional(__S(340, __c21, 4)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/metadata/v0/keys/{KeyName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateKeyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          KeyArn: S.String,
          KeyName: S.String,
          UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "UpdateKeyResponse" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PoliticalView: S.optional(SensitiveString),
          CustomLayers: S.optional(__S(1376, __c86, 0)),
        }),
      ).annotate({ identifier: "MapConfigurationUpdate" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MapName: S.String.pipe(T.HttpLabel("MapName")),
          PricingPlan: S.optional(S.String),
          Description: S.optional(S.String),
          ConfigurationUpdate: S.optional(__S(1232, __c77, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/maps/v0/maps/{MapName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateMapRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          MapName: S.String,
          MapArn: S.String,
          UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "UpdateMapResponse" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IndexName: S.String.pipe(T.HttpLabel("IndexName")),
          PricingPlan: S.optional(S.String),
          Description: S.optional(S.String),
          DataSourceConfiguration: S.optional(__S(400, __c25, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/places/v0/indexes/{IndexName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdatePlaceIndexRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          IndexName: S.String,
          IndexArn: S.String,
          UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "UpdatePlaceIndexResponse" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CalculatorName: S.String.pipe(T.HttpLabel("CalculatorName")),
          PricingPlan: S.optional(S.String),
          Description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/routes/v0/calculators/{CalculatorName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRouteCalculatorRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CalculatorName: S.String,
          CalculatorArn: S.String,
          UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "UpdateRouteCalculatorResponse" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TrackerName: S.String.pipe(T.HttpLabel("TrackerName")),
          PricingPlan: S.optional(S.String),
          PricingPlanDataSource: S.optional(S.String),
          Description: S.optional(S.String),
          PositionFiltering: S.optional(S.String),
          EventBridgeEnabled: S.optional(S.Boolean),
          KmsKeyEnableGeospatialQueries: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/tracking/v0/trackers/{TrackerName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateTrackerRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TrackerName: S.String,
          TrackerArn: S.String,
          UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "UpdateTrackerResponse" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TrackerName: S.String.pipe(T.HttpLabel("TrackerName")),
          ConsumerArn: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tracking/v0/trackers/{TrackerName}/consumers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateTrackerConsumerRequest" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "AssociateTrackerConsumerResponse",
      });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ MacAddress: S.String, Rss: S.Number })).annotate({
        identifier: "WiFiAccessPoint",
      });
    case 1:
      return S.Array(__S(1328, __c83, 0));
    case 2:
      return S.suspend(() => S.Struct({ Earfcn: S.Number, Pci: S.Number })).annotate({
        identifier: "LteLocalId",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Earfcn: S.Number,
          CellId: S.Number,
          Pci: S.Number,
          Rsrp: S.optional(S.Number),
          Rsrq: S.optional(S.Number),
        }),
      ).annotate({ identifier: "LteNetworkMeasurements" });
    case 4:
      return S.Array(__S(1331, __c83, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          CellId: S.Number,
          Mcc: S.Number,
          Mnc: S.Number,
          LocalId: S.optional(__S(1330, __c83, 2)),
          NetworkMeasurements: S.optional(__S(1332, __c83, 4)),
          TimingAdvance: S.optional(S.Number),
          NrCapable: S.optional(S.Boolean),
          Rsrp: S.optional(S.Number),
          Rsrq: S.optional(S.Number),
          Tac: S.optional(S.Number),
        }),
      ).annotate({ identifier: "LteCellDetails" });
    case 6:
      return S.Array(__S(1333, __c83, 5));
    case 7:
      return S.suspend(() => S.Struct({ LteCellDetails: __S(1334, __c83, 6) })).annotate({
        identifier: "CellSignals",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({
          DeviceId: S.String,
          SampleTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          Position: __S(16, __c1, 0),
          Accuracy: S.optional(__S(48, __c3, 0)),
          Ipv4Address: S.optional(S.String),
          WiFiAccessPoints: S.optional(__S(1329, __c83, 1)),
          CellSignals: S.optional(__S(1335, __c83, 7)),
        }),
      ).annotate({ identifier: "DeviceState" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          TrackerName: S.String.pipe(T.HttpLabel("TrackerName")),
          DeviceState: __S(1336, __c83, 8),
          DistanceUnit: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tracking/v0/trackers/{TrackerName}/positions/verify" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "VerifyDevicePositionRequest" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          Position: S.optional(__S(16, __c1, 0)),
          Accuracy: S.optional(__S(48, __c3, 0)),
          DeviationDistance: S.optional(S.Number),
          ProxyDetected: S.Boolean,
        }),
      ).annotate({ identifier: "InferredState" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          InferredState: __S(1338, __c83, 10),
          DeviceId: S.String,
          SampleTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ReceivedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          DistanceUnit: S.String,
        }),
      ).annotate({ identifier: "VerifyDevicePositionResponse" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TrackerName: S.String.pipe(T.HttpLabel("TrackerName")),
          DeviceIds: __S(1376, __c86, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tracking/v0/trackers/{TrackerName}/delete-positions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchDeleteDevicePositionHistoryRequest" });
    case 1:
      return S.suspend(() => S.Struct({ DeviceId: S.String, Error: __S(1360, __c85, 0) })).annotate(
        { identifier: "BatchDeleteDevicePositionHistoryError" },
      );
    case 2:
      return S.Array(__S(1345, __c84, 1));
    case 3:
      return S.suspend(() => S.Struct({ Errors: __S(1346, __c84, 2) })).annotate({
        identifier: "BatchDeleteDevicePositionHistoryResponse",
      });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Code: S.optional(S.String), Message: S.optional(S.String) }),
      ).annotate({ identifier: "BatchItemError" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CollectionName: S.String.pipe(T.HttpLabel("CollectionName")),
          GeofenceIds: __S(1376, __c86, 0),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/geofencing/v0/collections/{CollectionName}/delete-geofences",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchDeleteGeofenceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ GeofenceId: S.String, Error: __S(1360, __c85, 0) }),
      ).annotate({ identifier: "BatchDeleteGeofenceError" });
    case 2:
      return S.Array(__S(1393, __c87, 1));
    case 3:
      return S.suspend(() => S.Struct({ Errors: __S(1394, __c87, 2) })).annotate({
        identifier: "BatchDeleteGeofenceResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
