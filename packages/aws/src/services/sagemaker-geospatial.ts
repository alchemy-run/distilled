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
  sdkId: "SageMaker Geospatial",
  target: "SageMakerGeospatial",
  version: "2020-05-27",
  sigv4: "sagemaker-geospatial",
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
                `https://sagemaker-geospatial-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://sagemaker-geospatial-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://sagemaker-geospatial.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://sagemaker-geospatial.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message: string; readonly ResourceId?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message: string; readonly ResourceId?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message: string; readonly ResourceId?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message: string; readonly ResourceId?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message: string; readonly ResourceId?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string; readonly ResourceId?: string }> {}
export type EarthObservationJobArn = string;
export interface DeleteEarthObservationJobInput {
  Arn: string;
}
export interface DeleteEarthObservationJobOutput {}
export type VectorEnrichmentJobArn = string;
export interface DeleteVectorEnrichmentJobInput {
  Arn: string;
}
export interface DeleteVectorEnrichmentJobOutput {}
export type ExecutionRoleArn = string;
export type S3Uri = string;
export type KmsKey = string;
export interface ExportS3DataInput {
  S3Uri: string;
  KmsKeyId?: string;
}
export interface OutputConfigInput {
  S3Data: ExportS3DataInput;
}
export interface ExportEarthObservationJobInput {
  Arn: string;
  ClientToken?: string;
  ExecutionRoleArn: string;
  OutputConfig: OutputConfigInput;
  ExportSourceImages?: boolean;
}
export type EarthObservationJobExportStatus = string;
export interface ExportEarthObservationJobOutput {
  Arn: string;
  CreationTime: Date;
  ExportStatus: string;
  ExecutionRoleArn: string;
  OutputConfig: OutputConfigInput;
  ExportSourceImages?: boolean;
}
export interface VectorEnrichmentJobS3Data {
  S3Uri: string;
  KmsKeyId?: string;
}
export interface ExportVectorEnrichmentJobOutputConfig {
  S3Data: VectorEnrichmentJobS3Data;
}
export interface ExportVectorEnrichmentJobInput {
  Arn: string;
  ClientToken?: string;
  ExecutionRoleArn: string;
  OutputConfig: ExportVectorEnrichmentJobOutputConfig;
}
export type VectorEnrichmentJobExportStatus = string;
export interface ExportVectorEnrichmentJobOutput {
  Arn: string;
  CreationTime: Date;
  ExecutionRoleArn: string;
  ExportStatus: string;
  OutputConfig: ExportVectorEnrichmentJobOutputConfig;
}
export interface GetEarthObservationJobInput {
  Arn: string;
}
export type EarthObservationJobStatus = string;
export type DataCollectionArn = string;
export interface TimeRangeFilterOutput {
  StartTime: Date;
  EndTime: Date;
}
export type Position = number[];
export type LinearRing = number[][];
export type LinearRings = number[][][];
export interface PolygonGeometryInput {
  Coordinates: number[][][];
}
export type LinearRingsList = number[][][][];
export interface MultiPolygonGeometryInput {
  Coordinates: number[][][][];
}
export type AreaOfInterestGeometry =
  | { PolygonGeometry: PolygonGeometryInput; MultiPolygonGeometry?: never }
  | {
      PolygonGeometry?: never;
      MultiPolygonGeometry: MultiPolygonGeometryInput;
    };
export type AreaOfInterest = { AreaOfInterestGeometry: AreaOfInterestGeometry };
export interface EoCloudCoverInput {
  LowerBound: number;
  UpperBound: number;
}
export interface ViewOffNadirInput {
  LowerBound: number;
  UpperBound: number;
}
export interface ViewSunAzimuthInput {
  LowerBound: number;
  UpperBound: number;
}
export interface ViewSunElevationInput {
  LowerBound: number;
  UpperBound: number;
}
export type ComparisonOperator = string;
export interface PlatformInput {
  Value: string;
  ComparisonOperator?: string;
}
export interface LandsatCloudCoverLandInput {
  LowerBound: number;
  UpperBound: number;
}
export type Property =
  | {
      EoCloudCover: EoCloudCoverInput;
      ViewOffNadir?: never;
      ViewSunAzimuth?: never;
      ViewSunElevation?: never;
      Platform?: never;
      LandsatCloudCoverLand?: never;
    }
  | {
      EoCloudCover?: never;
      ViewOffNadir: ViewOffNadirInput;
      ViewSunAzimuth?: never;
      ViewSunElevation?: never;
      Platform?: never;
      LandsatCloudCoverLand?: never;
    }
  | {
      EoCloudCover?: never;
      ViewOffNadir?: never;
      ViewSunAzimuth: ViewSunAzimuthInput;
      ViewSunElevation?: never;
      Platform?: never;
      LandsatCloudCoverLand?: never;
    }
  | {
      EoCloudCover?: never;
      ViewOffNadir?: never;
      ViewSunAzimuth?: never;
      ViewSunElevation: ViewSunElevationInput;
      Platform?: never;
      LandsatCloudCoverLand?: never;
    }
  | {
      EoCloudCover?: never;
      ViewOffNadir?: never;
      ViewSunAzimuth?: never;
      ViewSunElevation?: never;
      Platform: PlatformInput;
      LandsatCloudCoverLand?: never;
    }
  | {
      EoCloudCover?: never;
      ViewOffNadir?: never;
      ViewSunAzimuth?: never;
      ViewSunElevation?: never;
      Platform?: never;
      LandsatCloudCoverLand: LandsatCloudCoverLandInput;
    };
export interface PropertyFilter {
  Property: Property;
}
export type PropertyFiltersList = PropertyFilter[];
export type LogicalOperator = string;
export interface PropertyFilters {
  Properties?: PropertyFilter[];
  LogicalOperator?: string;
}
export interface RasterDataCollectionQueryOutput {
  RasterDataCollectionArn: string;
  RasterDataCollectionName: string;
  TimeRangeFilter: TimeRangeFilterOutput;
  AreaOfInterest?: AreaOfInterest;
  PropertyFilters?: PropertyFilters;
}
export interface InputConfigOutput {
  PreviousEarthObservationJobArn?: string;
  RasterDataCollectionQuery?: RasterDataCollectionQueryOutput;
}
export type StringListInput = string[];
export type OutputType = string;
export interface Operation {
  Name: string;
  Equation: string;
  OutputType?: string;
}
export type OperationsListInput = Operation[];
export interface CustomIndicesInput {
  Operations?: Operation[];
}
export interface BandMathConfigInput {
  PredefinedIndices?: string[];
  CustomIndices?: CustomIndicesInput;
}
export type Unit = string;
export interface UserDefined {
  Value: number;
  Unit: string;
}
export interface OutputResolutionResamplingInput {
  UserDefined: UserDefined;
}
export type AlgorithmNameResampling = string;
export interface ResamplingConfigInput {
  OutputResolution: OutputResolutionResamplingInput;
  AlgorithmName?: string;
  TargetBands?: string[];
}
export type GroupBy = string;
export type TemporalStatistics = string;
export type TemporalStatisticsListInput = string[];
export interface TemporalStatisticsConfigInput {
  GroupBy?: string;
  Statistics: string[];
  TargetBands?: string[];
}
export type AlgorithmNameCloudRemoval = string;
export interface CloudRemovalConfigInput {
  AlgorithmName?: string;
  InterpolationValue?: string;
  TargetBands?: string[];
}
export type ZonalStatistics = string;
export type ZonalStatisticsListInput = string[];
export interface ZonalStatisticsConfigInput {
  ZoneS3Path: string;
  Statistics: string[];
  TargetBands?: string[];
  ZoneS3PathKmsKeyId?: string;
}
export type AlgorithmNameGeoMosaic = string;
export interface GeoMosaicConfigInput {
  AlgorithmName?: string;
  TargetBands?: string[];
}
export type PredefinedResolution = string;
export interface OutputResolutionStackInput {
  Predefined?: string;
  UserDefined?: UserDefined;
}
export interface StackConfigInput {
  OutputResolution?: OutputResolutionStackInput;
  TargetBands?: string[];
}
export interface CloudMaskingConfigInput {}
export interface LandCoverSegmentationConfigInput {}
export type JobConfigInput =
  | {
      BandMathConfig: BandMathConfigInput;
      ResamplingConfig?: never;
      TemporalStatisticsConfig?: never;
      CloudRemovalConfig?: never;
      ZonalStatisticsConfig?: never;
      GeoMosaicConfig?: never;
      StackConfig?: never;
      CloudMaskingConfig?: never;
      LandCoverSegmentationConfig?: never;
    }
  | {
      BandMathConfig?: never;
      ResamplingConfig: ResamplingConfigInput;
      TemporalStatisticsConfig?: never;
      CloudRemovalConfig?: never;
      ZonalStatisticsConfig?: never;
      GeoMosaicConfig?: never;
      StackConfig?: never;
      CloudMaskingConfig?: never;
      LandCoverSegmentationConfig?: never;
    }
  | {
      BandMathConfig?: never;
      ResamplingConfig?: never;
      TemporalStatisticsConfig: TemporalStatisticsConfigInput;
      CloudRemovalConfig?: never;
      ZonalStatisticsConfig?: never;
      GeoMosaicConfig?: never;
      StackConfig?: never;
      CloudMaskingConfig?: never;
      LandCoverSegmentationConfig?: never;
    }
  | {
      BandMathConfig?: never;
      ResamplingConfig?: never;
      TemporalStatisticsConfig?: never;
      CloudRemovalConfig: CloudRemovalConfigInput;
      ZonalStatisticsConfig?: never;
      GeoMosaicConfig?: never;
      StackConfig?: never;
      CloudMaskingConfig?: never;
      LandCoverSegmentationConfig?: never;
    }
  | {
      BandMathConfig?: never;
      ResamplingConfig?: never;
      TemporalStatisticsConfig?: never;
      CloudRemovalConfig?: never;
      ZonalStatisticsConfig: ZonalStatisticsConfigInput;
      GeoMosaicConfig?: never;
      StackConfig?: never;
      CloudMaskingConfig?: never;
      LandCoverSegmentationConfig?: never;
    }
  | {
      BandMathConfig?: never;
      ResamplingConfig?: never;
      TemporalStatisticsConfig?: never;
      CloudRemovalConfig?: never;
      ZonalStatisticsConfig?: never;
      GeoMosaicConfig: GeoMosaicConfigInput;
      StackConfig?: never;
      CloudMaskingConfig?: never;
      LandCoverSegmentationConfig?: never;
    }
  | {
      BandMathConfig?: never;
      ResamplingConfig?: never;
      TemporalStatisticsConfig?: never;
      CloudRemovalConfig?: never;
      ZonalStatisticsConfig?: never;
      GeoMosaicConfig?: never;
      StackConfig: StackConfigInput;
      CloudMaskingConfig?: never;
      LandCoverSegmentationConfig?: never;
    }
  | {
      BandMathConfig?: never;
      ResamplingConfig?: never;
      TemporalStatisticsConfig?: never;
      CloudRemovalConfig?: never;
      ZonalStatisticsConfig?: never;
      GeoMosaicConfig?: never;
      StackConfig?: never;
      CloudMaskingConfig: CloudMaskingConfigInput;
      LandCoverSegmentationConfig?: never;
    }
  | {
      BandMathConfig?: never;
      ResamplingConfig?: never;
      TemporalStatisticsConfig?: never;
      CloudRemovalConfig?: never;
      ZonalStatisticsConfig?: never;
      GeoMosaicConfig?: never;
      StackConfig?: never;
      CloudMaskingConfig?: never;
      LandCoverSegmentationConfig: LandCoverSegmentationConfigInput;
    };
export interface OutputBand {
  BandName: string;
  OutputDataType: string;
}
export type EarthObservationJobOutputBands = OutputBand[];
export type EarthObservationJobErrorType = string;
export interface EarthObservationJobErrorDetails {
  Type?: string;
  Message?: string;
}
export type ExportErrorType = string;
export interface ExportErrorDetailsOutput {
  Type?: string;
  Message?: string;
}
export interface ExportErrorDetails {
  ExportResults?: ExportErrorDetailsOutput;
  ExportSourceImages?: ExportErrorDetailsOutput;
}
export type Tags = { [key: string]: string | undefined };
export interface GetEarthObservationJobOutput {
  Arn: string;
  Name: string;
  CreationTime: Date;
  DurationInSeconds: number;
  Status: string;
  KmsKeyId?: string;
  InputConfig: InputConfigOutput;
  JobConfig: JobConfigInput;
  OutputBands?: OutputBand[];
  ExecutionRoleArn?: string;
  ErrorDetails?: EarthObservationJobErrorDetails;
  ExportStatus?: string;
  ExportErrorDetails?: ExportErrorDetails;
  Tags?: { [key: string]: string | undefined };
}
export interface GetRasterDataCollectionInput {
  Arn: string;
}
export type DataCollectionType = string;
export interface Filter {
  Name: string;
  Type: string;
  Minimum?: number;
  Maximum?: number;
}
export type FilterList = Filter[];
export type ImageSourceBandList = string[];
export interface GetRasterDataCollectionOutput {
  Name: string;
  Arn: string;
  Type: string;
  Description: string;
  DescriptionPageUrl: string;
  SupportedFilters: Filter[];
  ImageSourceBands: string[];
  Tags?: { [key: string]: string | undefined };
}
export type TargetOptions = string;
export interface GetTileInput {
  x: number;
  y: number;
  z: number;
  ImageAssets: string[];
  Target: string;
  Arn: string;
  ImageMask?: boolean;
  OutputFormat?: string;
  TimeRangeFilter?: string;
  PropertyFilters?: string;
  OutputDataType?: string;
  ExecutionRoleArn?: string;
}
export interface GetTileOutput {
  BinaryFile?: T.StreamingOutputBody;
}
export interface GetVectorEnrichmentJobInput {
  Arn: string;
}
export type VectorEnrichmentJobType = string;
export type VectorEnrichmentJobStatus = string;
export type VectorEnrichmentJobDocumentType = string;
export type VectorEnrichmentJobDataSourceConfigInput = {
  S3Data: VectorEnrichmentJobS3Data;
};
export interface VectorEnrichmentJobInputConfig {
  DocumentType: string;
  DataSourceConfig: VectorEnrichmentJobDataSourceConfigInput;
}
export interface ReverseGeocodingConfig {
  YAttributeName: string;
  XAttributeName: string;
}
export interface MapMatchingConfig {
  IdAttributeName: string;
  YAttributeName: string;
  XAttributeName: string;
  TimestampAttributeName: string;
}
export type VectorEnrichmentJobConfig =
  | {
      ReverseGeocodingConfig: ReverseGeocodingConfig;
      MapMatchingConfig?: never;
    }
  | { ReverseGeocodingConfig?: never; MapMatchingConfig: MapMatchingConfig };
export type VectorEnrichmentJobErrorType = string;
export interface VectorEnrichmentJobErrorDetails {
  ErrorType?: string;
  ErrorMessage?: string;
}
export type VectorEnrichmentJobExportErrorType = string;
export interface VectorEnrichmentJobExportErrorDetails {
  Type?: string;
  Message?: string;
}
export interface GetVectorEnrichmentJobOutput {
  Arn: string;
  Type: string;
  Name: string;
  CreationTime: Date;
  DurationInSeconds: number;
  Status: string;
  KmsKeyId?: string;
  InputConfig: VectorEnrichmentJobInputConfig;
  JobConfig: VectorEnrichmentJobConfig;
  ExecutionRoleArn: string;
  ErrorDetails?: VectorEnrichmentJobErrorDetails;
  ExportStatus?: string;
  ExportErrorDetails?: VectorEnrichmentJobExportErrorDetails;
  Tags?: { [key: string]: string | undefined };
}
export type SortOrder = string;
export type NextToken = string | redacted.Redacted<string>;
export interface ListEarthObservationJobInput {
  StatusEquals?: string;
  SortOrder?: string;
  SortBy?: string;
  NextToken?: string | redacted.Redacted<string>;
  MaxResults?: number;
}
export interface ListEarthObservationJobOutputConfig {
  Arn: string;
  Name: string;
  CreationTime: Date;
  DurationInSeconds: number;
  Status: string;
  OperationType: string;
  Tags?: { [key: string]: string | undefined };
}
export type EarthObservationJobList = ListEarthObservationJobOutputConfig[];
export interface ListEarthObservationJobOutput {
  EarthObservationJobSummaries: ListEarthObservationJobOutputConfig[];
  NextToken?: string | redacted.Redacted<string>;
}
export interface ListRasterDataCollectionsInput {
  NextToken?: string | redacted.Redacted<string>;
  MaxResults?: number;
}
export interface RasterDataCollectionMetadata {
  Name: string;
  Arn: string;
  Type: string;
  Description: string;
  DescriptionPageUrl?: string;
  SupportedFilters: Filter[];
  Tags?: { [key: string]: string | undefined };
}
export type DataCollectionsList = RasterDataCollectionMetadata[];
export interface ListRasterDataCollectionsOutput {
  RasterDataCollectionSummaries: RasterDataCollectionMetadata[];
  NextToken?: string | redacted.Redacted<string>;
}
export type Arn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface ListVectorEnrichmentJobInput {
  StatusEquals?: string;
  SortOrder?: string;
  SortBy?: string;
  NextToken?: string | redacted.Redacted<string>;
  MaxResults?: number;
}
export interface ListVectorEnrichmentJobOutputConfig {
  Arn: string;
  Name: string;
  Type: string;
  CreationTime: Date;
  DurationInSeconds: number;
  Status: string;
  Tags?: { [key: string]: string | undefined };
}
export type VectorEnrichmentJobList = ListVectorEnrichmentJobOutputConfig[];
export interface ListVectorEnrichmentJobOutput {
  VectorEnrichmentJobSummaries: ListVectorEnrichmentJobOutputConfig[];
  NextToken?: string | redacted.Redacted<string>;
}
export interface TimeRangeFilterInput {
  StartTime: Date;
  EndTime: Date;
}
export interface RasterDataCollectionQueryWithBandFilterInput {
  TimeRangeFilter: TimeRangeFilterInput;
  AreaOfInterest?: AreaOfInterest;
  PropertyFilters?: PropertyFilters;
  BandFilter?: string[];
}
export interface SearchRasterDataCollectionInput {
  Arn: string;
  RasterDataCollectionQuery: RasterDataCollectionQueryWithBandFilterInput;
  NextToken?: string | redacted.Redacted<string>;
}
export interface Geometry {
  Type: string;
  Coordinates: number[][][];
}
export interface AssetValue {
  Href?: string;
}
export type AssetsMap = { [key: string]: AssetValue | undefined };
export interface Properties {
  EoCloudCover?: number;
  ViewOffNadir?: number;
  ViewSunAzimuth?: number;
  ViewSunElevation?: number;
  Platform?: string;
  LandsatCloudCoverLand?: number;
}
export interface ItemSource {
  Id: string;
  Geometry: Geometry;
  Assets?: { [key: string]: AssetValue | undefined };
  DateTime: Date;
  Properties?: Properties;
}
export type ItemSourceList = ItemSource[];
export interface SearchRasterDataCollectionOutput {
  ApproximateResultCount: number;
  NextToken?: string | redacted.Redacted<string>;
  Items?: ItemSource[];
}
export interface RasterDataCollectionQueryInput {
  RasterDataCollectionArn: string;
  TimeRangeFilter: TimeRangeFilterInput;
  AreaOfInterest?: AreaOfInterest;
  PropertyFilters?: PropertyFilters;
}
export interface InputConfigInput {
  PreviousEarthObservationJobArn?: string;
  RasterDataCollectionQuery?: RasterDataCollectionQueryInput;
}
export interface StartEarthObservationJobInput {
  Name: string;
  ClientToken?: string;
  KmsKeyId?: string;
  InputConfig: InputConfigInput;
  JobConfig: JobConfigInput;
  ExecutionRoleArn: string;
  Tags?: { [key: string]: string | undefined };
}
export interface StartEarthObservationJobOutput {
  Name: string;
  Arn: string;
  CreationTime: Date;
  DurationInSeconds: number;
  Status: string;
  KmsKeyId?: string;
  InputConfig?: InputConfigOutput;
  JobConfig: JobConfigInput;
  ExecutionRoleArn: string;
  Tags?: { [key: string]: string | undefined };
}
export interface StartVectorEnrichmentJobInput {
  Name: string;
  ClientToken?: string;
  KmsKeyId?: string;
  InputConfig: VectorEnrichmentJobInputConfig;
  JobConfig: VectorEnrichmentJobConfig;
  ExecutionRoleArn: string;
  Tags?: { [key: string]: string | undefined };
}
export interface StartVectorEnrichmentJobOutput {
  Name: string;
  Arn: string;
  Type: string;
  CreationTime: Date;
  DurationInSeconds: number;
  Status: string;
  KmsKeyId?: string;
  InputConfig: VectorEnrichmentJobInputConfig;
  JobConfig: VectorEnrichmentJobConfig;
  ExecutionRoleArn: string;
  Tags?: { [key: string]: string | undefined };
}
export interface StopEarthObservationJobInput {
  Arn: string;
}
export interface StopEarthObservationJobOutput {}
export interface StopVectorEnrichmentJobInput {
  Arn: string;
}
export interface StopVectorEnrichmentJobOutput {}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export type DeleteEarthObservationJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this operation to delete an Earth Observation job.
 */
export const deleteEarthObservationJob: API.OperationMethod<
  DeleteEarthObservationJobInput,
  DeleteEarthObservationJobOutput,
  DeleteEarthObservationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /earth-observation-jobs/{Arn}",
    input: { Arn: 0 },
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
  operationName: "DeleteEarthObservationJob",
})) as any;

export type DeleteVectorEnrichmentJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this operation to delete a Vector Enrichment job.
 */
export const deleteVectorEnrichmentJob: API.OperationMethod<
  DeleteVectorEnrichmentJobInput,
  DeleteVectorEnrichmentJobOutput,
  DeleteVectorEnrichmentJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /vector-enrichment-jobs/{Arn}",
    input: { Arn: 0 },
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
  operationName: "DeleteVectorEnrichmentJob",
})) as any;

export type ExportEarthObservationJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this operation to export results of an Earth Observation job and optionally source images used as input to the EOJ to an Amazon S3 location.
 */
export const exportEarthObservationJob: API.OperationMethod<
  ExportEarthObservationJobInput,
  ExportEarthObservationJobOutput,
  ExportEarthObservationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /export-earth-observation-job",
    input: {
      Arn: 0,
      ClientToken: D.m({ idempotency: true }),
      ExecutionRoleArn: 0,
      OutputConfig: { S3Data: { S3Uri: 0, KmsKeyId: 0 } },
      ExportSourceImages: 0,
    },
    output: { CreationTime: D.ts },
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
  operationName: "ExportEarthObservationJob",
})) as any;

export type ExportVectorEnrichmentJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this operation to copy results of a Vector Enrichment job to an Amazon S3 location.
 */
export const exportVectorEnrichmentJob: API.OperationMethod<
  ExportVectorEnrichmentJobInput,
  ExportVectorEnrichmentJobOutput,
  ExportVectorEnrichmentJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /export-vector-enrichment-jobs",
    input: {
      Arn: 0,
      ClientToken: D.m({ idempotency: true }),
      ExecutionRoleArn: 0,
      OutputConfig: { S3Data: i_VectorEnrichmentJobS3Data },
    },
    output: { CreationTime: D.ts },
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
  operationName: "ExportVectorEnrichmentJob",
})) as any;

export type GetEarthObservationJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the details for a previously initiated Earth Observation job.
 */
export const getEarthObservationJob: API.OperationMethod<
  GetEarthObservationJobInput,
  GetEarthObservationJobOutput,
  GetEarthObservationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /earth-observation-jobs/{Arn}",
    input: { Arn: 0 },
    output: { CreationTime: D.ts, InputConfig: o_InputConfigOutput },
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
  operationName: "GetEarthObservationJob",
})) as any;

export type GetRasterDataCollectionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this operation to get details of a specific raster data collection.
 */
export const getRasterDataCollection: API.OperationMethod<
  GetRasterDataCollectionInput,
  GetRasterDataCollectionOutput,
  GetRasterDataCollectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /raster-data-collection/{Arn}",
    input: { Arn: 0 },
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
  operationName: "GetRasterDataCollection",
})) as any;

export type GetTileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a web mercator tile for the given Earth Observation job.
 */
export const getTile: API.OperationMethod<
  GetTileInput,
  GetTileOutput,
  GetTileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tile/{z}/{x}/{y}",
    input: {
      x: 0,
      y: 0,
      z: 0,
      ImageAssets: D.m({ query: "ImageAssets" }),
      Target: D.m({ query: "Target" }),
      Arn: D.m({ query: "Arn" }),
      ImageMask: D.m({ query: "ImageMask" }),
      OutputFormat: D.m({ query: "OutputFormat" }),
      TimeRangeFilter: D.m({ query: "TimeRangeFilter" }),
      PropertyFilters: D.m({ query: "PropertyFilters" }),
      OutputDataType: D.m({ query: "OutputDataType" }),
      ExecutionRoleArn: D.m({ query: "ExecutionRoleArn" }),
    },
    output: { BinaryFile: D.m({ payload: true, shape: D.stream }) },
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

export type GetVectorEnrichmentJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details of a Vector Enrichment Job for a given job Amazon Resource Name (ARN).
 */
export const getVectorEnrichmentJob: API.OperationMethod<
  GetVectorEnrichmentJobInput,
  GetVectorEnrichmentJobOutput,
  GetVectorEnrichmentJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /vector-enrichment-jobs/{Arn}",
    input: { Arn: 0 },
    output: { CreationTime: D.ts },
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
  operationName: "GetVectorEnrichmentJob",
})) as any;

export type ListEarthObservationJobsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this operation to get a list of the Earth Observation jobs associated with the calling Amazon Web Services account.
 */
export const listEarthObservationJobs: API.PaginatedOperationMethod<
  ListEarthObservationJobInput,
  ListEarthObservationJobOutput,
  ListEarthObservationJobsError,
  Credentials | HttpClient.HttpClient,
  ListEarthObservationJobOutputConfig
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /list-earth-observation-jobs",
    input: {
      StatusEquals: 0,
      SortOrder: 0,
      SortBy: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      EarthObservationJobSummaries: D.list({ CreationTime: D.ts }),
      NextToken: D.secret,
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
  operationName: "ListEarthObservationJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EarthObservationJobSummaries",
  } as const,
})) as any;

export type ListRasterDataCollectionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this operation to get raster data collections.
 */
export const listRasterDataCollections: API.PaginatedOperationMethod<
  ListRasterDataCollectionsInput,
  ListRasterDataCollectionsOutput,
  ListRasterDataCollectionsError,
  Credentials | HttpClient.HttpClient,
  RasterDataCollectionMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /raster-data-collections",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
    output: { NextToken: D.secret },
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
  operationName: "ListRasterDataCollections",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RasterDataCollectionSummaries",
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
 * Lists the tags attached to the resource.
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
})) as any;

export type ListVectorEnrichmentJobsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of vector enrichment jobs.
 */
export const listVectorEnrichmentJobs: API.PaginatedOperationMethod<
  ListVectorEnrichmentJobInput,
  ListVectorEnrichmentJobOutput,
  ListVectorEnrichmentJobsError,
  Credentials | HttpClient.HttpClient,
  ListVectorEnrichmentJobOutputConfig
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /list-vector-enrichment-jobs",
    input: {
      StatusEquals: 0,
      SortOrder: 0,
      SortBy: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      VectorEnrichmentJobSummaries: D.list({ CreationTime: D.ts }),
      NextToken: D.secret,
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
  operationName: "ListVectorEnrichmentJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "VectorEnrichmentJobSummaries",
  } as const,
})) as any;

export type SearchRasterDataCollectionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows you run image query on a specific raster data collection to get a list of the satellite imagery matching the selected filters.
 */
export const searchRasterDataCollection: API.PaginatedOperationMethod<
  SearchRasterDataCollectionInput,
  SearchRasterDataCollectionOutput,
  SearchRasterDataCollectionError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /search-raster-data-collection",
    input: {
      Arn: 0,
      RasterDataCollectionQuery: {
        TimeRangeFilter: i_TimeRangeFilterInput,
        AreaOfInterest: i_AreaOfInterest,
        PropertyFilters: i_PropertyFilters,
        BandFilter: 0,
      },
      NextToken: 0,
    },
    output: { NextToken: D.secret, Items: D.list({ DateTime: D.ts }) },
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
  operationName: "SearchRasterDataCollection",
  pagination: { inputToken: "NextToken", outputToken: "NextToken" } as const,
})) as any;

export type StartEarthObservationJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this operation to create an Earth observation job.
 */
export const startEarthObservationJob: API.OperationMethod<
  StartEarthObservationJobInput,
  StartEarthObservationJobOutput,
  StartEarthObservationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /earth-observation-jobs",
    input: {
      Name: 0,
      ClientToken: D.m({ idempotency: true }),
      KmsKeyId: 0,
      InputConfig: {
        PreviousEarthObservationJobArn: 0,
        RasterDataCollectionQuery: {
          RasterDataCollectionArn: 0,
          TimeRangeFilter: i_TimeRangeFilterInput,
          AreaOfInterest: i_AreaOfInterest,
          PropertyFilters: i_PropertyFilters,
        },
      },
      JobConfig: {
        BandMathConfig: {
          PredefinedIndices: 0,
          CustomIndices: {
            Operations: D.list({ Name: 0, Equation: 0, OutputType: 0 }),
          },
        },
        ResamplingConfig: {
          OutputResolution: { UserDefined: i_UserDefined },
          AlgorithmName: 0,
          TargetBands: 0,
        },
        TemporalStatisticsConfig: { GroupBy: 0, Statistics: 0, TargetBands: 0 },
        CloudRemovalConfig: {
          AlgorithmName: 0,
          InterpolationValue: 0,
          TargetBands: 0,
        },
        ZonalStatisticsConfig: {
          ZoneS3Path: 0,
          Statistics: 0,
          TargetBands: 0,
          ZoneS3PathKmsKeyId: 0,
        },
        GeoMosaicConfig: { AlgorithmName: 0, TargetBands: 0 },
        StackConfig: {
          OutputResolution: { Predefined: 0, UserDefined: i_UserDefined },
          TargetBands: 0,
        },
        CloudMaskingConfig: {},
        LandCoverSegmentationConfig: {},
      },
      ExecutionRoleArn: 0,
      Tags: 0,
    },
    output: { CreationTime: D.ts, InputConfig: o_InputConfigOutput },
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
  operationName: "StartEarthObservationJob",
})) as any;

export type StartVectorEnrichmentJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Vector Enrichment job for the supplied job type. Currently, there are two supported job types: reverse geocoding and map matching.
 */
export const startVectorEnrichmentJob: API.OperationMethod<
  StartVectorEnrichmentJobInput,
  StartVectorEnrichmentJobOutput,
  StartVectorEnrichmentJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /vector-enrichment-jobs",
    input: {
      Name: 0,
      ClientToken: D.m({ idempotency: true }),
      KmsKeyId: 0,
      InputConfig: {
        DocumentType: 0,
        DataSourceConfig: { S3Data: i_VectorEnrichmentJobS3Data },
      },
      JobConfig: {
        ReverseGeocodingConfig: { YAttributeName: 0, XAttributeName: 0 },
        MapMatchingConfig: {
          IdAttributeName: 0,
          YAttributeName: 0,
          XAttributeName: 0,
          TimestampAttributeName: 0,
        },
      },
      ExecutionRoleArn: 0,
      Tags: 0,
    },
    output: { CreationTime: D.ts },
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
  operationName: "StartVectorEnrichmentJob",
})) as any;

export type StopEarthObservationJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this operation to stop an existing earth observation job.
 */
export const stopEarthObservationJob: API.OperationMethod<
  StopEarthObservationJobInput,
  StopEarthObservationJobOutput,
  StopEarthObservationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /earth-observation-jobs/stop",
    input: { Arn: 0 },
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
  operationName: "StopEarthObservationJob",
})) as any;

export type StopVectorEnrichmentJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops the Vector Enrichment job for a given job ARN.
 */
export const stopVectorEnrichmentJob: API.OperationMethod<
  StopVectorEnrichmentJobInput,
  StopVectorEnrichmentJobOutput,
  StopVectorEnrichmentJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /vector-enrichment-jobs/stop",
    input: { Arn: 0 },
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
  operationName: "StopVectorEnrichmentJob",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The resource you want to tag.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /tags/{ResourceArn}",
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
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The resource you want to untag.
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
})) as any;

const i_AreaOfInterest: D.LazyStruct = () => ({
  AreaOfInterestGeometry: {
    PolygonGeometry: { Coordinates: 0 },
    MultiPolygonGeometry: { Coordinates: 0 },
  },
});
const i_PropertyFilters: D.LazyStruct = () => ({
  Properties: D.list({
    Property: {
      EoCloudCover: { LowerBound: 0, UpperBound: 0 },
      ViewOffNadir: { LowerBound: 0, UpperBound: 0 },
      ViewSunAzimuth: { LowerBound: 0, UpperBound: 0 },
      ViewSunElevation: { LowerBound: 0, UpperBound: 0 },
      Platform: { Value: 0, ComparisonOperator: 0 },
      LandsatCloudCoverLand: { LowerBound: 0, UpperBound: 0 },
    },
  }),
  LogicalOperator: 0,
});
const i_TimeRangeFilterInput: D.LazyStruct = () => ({
  StartTime: 0,
  EndTime: 0,
});
const i_UserDefined: D.LazyStruct = () => ({ Value: 0, Unit: 0 });
const i_VectorEnrichmentJobS3Data: D.LazyStruct = () => ({
  S3Uri: 0,
  KmsKeyId: 0,
});
const o_InputConfigOutput: D.LazyStruct = () => ({
  RasterDataCollectionQuery: {
    TimeRangeFilter: { StartTime: D.ts, EndTime: D.ts },
  },
});
