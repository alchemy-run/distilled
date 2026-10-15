import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "LookoutEquipment",
  serviceShapeName: "AWSLookoutEquipmentFrontendService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "lookoutequipment" });
const ver = /*@__PURE__*/ T.ServiceVersion("2020-12-15");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_0();
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
              `https://lookoutequipment-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://lookoutequipment-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://lookoutequipment.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://lookoutequipment.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://lookoutequipment.{R}.{D}","properties":{},"headers":{}}');

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
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
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
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type DatasetName = string;
export type SynthesizedJsonInlineDataSchema = string;
export interface DatasetSchema {
  InlineDataSchema?: string;
}
export type NameOrArn = string;
export type IdempotenceToken = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface CreateDatasetRequest {
  DatasetName: string;
  DatasetSchema?: DatasetSchema;
  ServerSideKmsKeyId?: string;
  ClientToken: string;
  Tags?: Tag[];
}
export type DatasetArn = string;
export type DatasetStatus =
  | "CREATED"
  | "INGESTION_IN_PROGRESS"
  | "ACTIVE"
  | "IMPORT_IN_PROGRESS"
  | (string & {});
export interface CreateDatasetResponse {
  DatasetName?: string;
  DatasetArn?: string;
  Status?: DatasetStatus;
}
export type ModelName = string;
export type InferenceSchedulerName = string;
export type DataDelayOffsetInMinutes = number;
export type DataUploadFrequency = "PT5M" | "PT10M" | "PT15M" | "PT30M" | "PT1H" | (string & {});
export type S3Bucket = string;
export type S3Prefix = string;
export interface InferenceS3InputConfiguration {
  Bucket: string;
  Prefix?: string;
}
export type TimeZoneOffset = string;
export type FileNameTimestampFormat = string;
export type ComponentTimestampDelimiter = string;
export interface InferenceInputNameConfiguration {
  TimestampFormat?: string;
  ComponentTimestampDelimiter?: string;
}
export interface InferenceInputConfiguration {
  S3InputConfiguration?: InferenceS3InputConfiguration;
  InputTimeZoneOffset?: string;
  InferenceInputNameConfiguration?: InferenceInputNameConfiguration;
}
export interface InferenceS3OutputConfiguration {
  Bucket: string;
  Prefix?: string;
}
export interface InferenceOutputConfiguration {
  S3OutputConfiguration: InferenceS3OutputConfiguration;
  KmsKeyId?: string;
}
export type IamRoleArn = string;
export interface CreateInferenceSchedulerRequest {
  ModelName: string;
  InferenceSchedulerName: string;
  DataDelayOffsetInMinutes?: number;
  DataUploadFrequency: DataUploadFrequency;
  DataInputConfiguration: InferenceInputConfiguration;
  DataOutputConfiguration: InferenceOutputConfiguration;
  RoleArn: string;
  ServerSideKmsKeyId?: string;
  ClientToken: string;
  Tags?: Tag[];
}
export type InferenceSchedulerArn = string;
export type InferenceSchedulerStatus =
  | "PENDING"
  | "RUNNING"
  | "STOPPING"
  | "STOPPED"
  | (string & {});
export type ModelQuality =
  | "QUALITY_THRESHOLD_MET"
  | "CANNOT_DETERMINE_QUALITY"
  | "POOR_QUALITY_DETECTED"
  | (string & {});
export interface CreateInferenceSchedulerResponse {
  InferenceSchedulerArn?: string;
  InferenceSchedulerName?: string;
  Status?: InferenceSchedulerStatus;
  ModelQuality?: ModelQuality;
}
export type LabelGroupName = string;
export type LabelRating = "ANOMALY" | "NO_ANOMALY" | "NEUTRAL" | (string & {});
export type FaultCode = string;
export type Comments = string;
export type Equipment = string;
export interface CreateLabelRequest {
  LabelGroupName: string;
  StartTime: Date;
  EndTime: Date;
  Rating: LabelRating;
  FaultCode?: string;
  Notes?: string;
  Equipment?: string;
  ClientToken: string;
}
export type LabelId = string;
export interface CreateLabelResponse {
  LabelId?: string;
}
export type FaultCodes = string[];
export interface CreateLabelGroupRequest {
  LabelGroupName: string;
  FaultCodes?: string[];
  ClientToken: string;
  Tags?: Tag[];
}
export type LabelGroupArn = string;
export interface CreateLabelGroupResponse {
  LabelGroupName?: string;
  LabelGroupArn?: string;
}
export type DatasetIdentifier = string;
export interface LabelsS3InputConfiguration {
  Bucket: string;
  Prefix?: string;
}
export interface LabelsInputConfiguration {
  S3InputConfiguration?: LabelsS3InputConfiguration;
  LabelGroupName?: string;
}
export type TargetSamplingRate =
  | "PT1S"
  | "PT5S"
  | "PT10S"
  | "PT15S"
  | "PT30S"
  | "PT1M"
  | "PT5M"
  | "PT10M"
  | "PT15M"
  | "PT30M"
  | "PT1H"
  | (string & {});
export interface DataPreProcessingConfiguration {
  TargetSamplingRate?: TargetSamplingRate;
}
export type OffCondition = string;
export interface ModelDiagnosticsS3OutputConfiguration {
  Bucket: string;
  Prefix?: string;
}
export interface ModelDiagnosticsOutputConfiguration {
  S3OutputConfiguration: ModelDiagnosticsS3OutputConfiguration;
  KmsKeyId?: string;
}
export interface CreateModelRequest {
  ModelName: string;
  DatasetName: string;
  DatasetSchema?: DatasetSchema;
  LabelsInputConfiguration?: LabelsInputConfiguration;
  ClientToken: string;
  TrainingDataStartTime?: Date;
  TrainingDataEndTime?: Date;
  EvaluationDataStartTime?: Date;
  EvaluationDataEndTime?: Date;
  RoleArn?: string;
  DataPreProcessingConfiguration?: DataPreProcessingConfiguration;
  ServerSideKmsKeyId?: string;
  Tags?: Tag[];
  OffCondition?: string;
  ModelDiagnosticsOutputConfiguration?: ModelDiagnosticsOutputConfiguration;
}
export type ModelArn = string;
export type ModelStatus =
  | "IN_PROGRESS"
  | "SUCCESS"
  | "FAILED"
  | "IMPORT_IN_PROGRESS"
  | (string & {});
export interface CreateModelResponse {
  ModelArn?: string;
  Status?: ModelStatus;
}
export type RetrainingFrequency = string;
export type LookbackWindow = string;
export type ModelPromoteMode = "MANAGED" | "MANUAL" | (string & {});
export interface CreateRetrainingSchedulerRequest {
  ModelName: string;
  RetrainingStartDate?: Date;
  RetrainingFrequency: string;
  LookbackWindow: string;
  PromoteMode?: ModelPromoteMode;
  ClientToken: string;
}
export type RetrainingSchedulerStatus =
  | "PENDING"
  | "RUNNING"
  | "STOPPING"
  | "STOPPED"
  | (string & {});
export interface CreateRetrainingSchedulerResponse {
  ModelName?: string;
  ModelArn?: string;
  Status?: RetrainingSchedulerStatus;
}
export interface DeleteDatasetRequest {
  DatasetName: string;
}
export interface DeleteDatasetResponse {}
export type InferenceSchedulerIdentifier = string;
export interface DeleteInferenceSchedulerRequest {
  InferenceSchedulerName: string;
}
export interface DeleteInferenceSchedulerResponse {}
export interface DeleteLabelRequest {
  LabelGroupName: string;
  LabelId: string;
}
export interface DeleteLabelResponse {}
export interface DeleteLabelGroupRequest {
  LabelGroupName: string;
}
export interface DeleteLabelGroupResponse {}
export interface DeleteModelRequest {
  ModelName: string;
}
export interface DeleteModelResponse {}
export type ResourceArn = string;
export interface DeleteResourcePolicyRequest {
  ResourceArn: string;
}
export interface DeleteResourcePolicyResponse {}
export interface DeleteRetrainingSchedulerRequest {
  ModelName: string;
}
export interface DeleteRetrainingSchedulerResponse {}
export type IngestionJobId = string;
export interface DescribeDataIngestionJobRequest {
  JobId: string;
}
export type KeyPattern = string;
export interface IngestionS3InputConfiguration {
  Bucket: string;
  Prefix?: string;
  KeyPattern?: string;
}
export interface IngestionInputConfiguration {
  S3InputConfiguration: IngestionS3InputConfiguration;
}
export type IngestionJobStatus =
  | "IN_PROGRESS"
  | "SUCCESS"
  | "FAILED"
  | "IMPORT_IN_PROGRESS"
  | (string & {});
export type BoundedLengthString = string;
export interface MissingCompleteSensorData {
  AffectedSensorCount: number;
}
export interface SensorsWithShortDateRange {
  AffectedSensorCount: number;
}
export interface InsufficientSensorData {
  MissingCompleteSensorData: MissingCompleteSensorData;
  SensorsWithShortDateRange: SensorsWithShortDateRange;
}
export interface MissingSensorData {
  AffectedSensorCount: number;
  TotalNumberOfMissingValues: number;
}
export interface InvalidSensorData {
  AffectedSensorCount: number;
  TotalNumberOfInvalidValues: number;
}
export interface UnsupportedTimestamps {
  TotalNumberOfUnsupportedTimestamps: number;
}
export interface DuplicateTimestamps {
  TotalNumberOfDuplicateTimestamps: number;
}
export interface DataQualitySummary {
  InsufficientSensorData: InsufficientSensorData;
  MissingSensorData: MissingSensorData;
  InvalidSensorData: InvalidSensorData;
  UnsupportedTimestamps: UnsupportedTimestamps;
  DuplicateTimestamps: DuplicateTimestamps;
}
export type S3Key = string;
export interface S3Object {
  Bucket: string;
  Key: string;
}
export type ListOfDiscardedFiles = S3Object[];
export interface IngestedFilesSummary {
  TotalNumberOfFiles: number;
  IngestedNumberOfFiles: number;
  DiscardedFiles?: S3Object[];
}
export type DataSizeInBytes = number;
export interface DescribeDataIngestionJobResponse {
  JobId?: string;
  DatasetArn?: string;
  IngestionInputConfiguration?: IngestionInputConfiguration;
  RoleArn?: string;
  CreatedAt?: Date;
  Status?: IngestionJobStatus;
  FailedReason?: string;
  DataQualitySummary?: DataQualitySummary;
  IngestedFilesSummary?: IngestedFilesSummary;
  StatusDetail?: string;
  IngestedDataSize?: number;
  DataStartTime?: Date;
  DataEndTime?: Date;
  SourceDatasetArn?: string;
}
export interface DescribeDatasetRequest {
  DatasetName: string;
}
export type KmsKeyArn = string;
export interface DescribeDatasetResponse {
  DatasetName?: string;
  DatasetArn?: string;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  Status?: DatasetStatus;
  Schema?: string;
  ServerSideKmsKeyId?: string;
  IngestionInputConfiguration?: IngestionInputConfiguration;
  DataQualitySummary?: DataQualitySummary;
  IngestedFilesSummary?: IngestedFilesSummary;
  RoleArn?: string;
  DataStartTime?: Date;
  DataEndTime?: Date;
  SourceDatasetArn?: string;
}
export interface DescribeInferenceSchedulerRequest {
  InferenceSchedulerName: string;
}
export type LatestInferenceResult = "ANOMALOUS" | "NORMAL" | (string & {});
export interface DescribeInferenceSchedulerResponse {
  ModelArn?: string;
  ModelName?: string;
  InferenceSchedulerName?: string;
  InferenceSchedulerArn?: string;
  Status?: InferenceSchedulerStatus;
  DataDelayOffsetInMinutes?: number;
  DataUploadFrequency?: DataUploadFrequency;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  DataInputConfiguration?: InferenceInputConfiguration;
  DataOutputConfiguration?: InferenceOutputConfiguration;
  RoleArn?: string;
  ServerSideKmsKeyId?: string;
  LatestInferenceResult?: LatestInferenceResult;
}
export interface DescribeLabelRequest {
  LabelGroupName: string;
  LabelId: string;
}
export interface DescribeLabelResponse {
  LabelGroupName?: string;
  LabelGroupArn?: string;
  LabelId?: string;
  StartTime?: Date;
  EndTime?: Date;
  Rating?: LabelRating;
  FaultCode?: string;
  Notes?: string;
  Equipment?: string;
  CreatedAt?: Date;
}
export interface DescribeLabelGroupRequest {
  LabelGroupName: string;
}
export interface DescribeLabelGroupResponse {
  LabelGroupName?: string;
  LabelGroupArn?: string;
  FaultCodes?: string[];
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export interface DescribeModelRequest {
  ModelName: string;
}
export type SynthesizedJsonModelMetrics = string;
export type ModelVersionArn = string;
export type ModelVersion = number;
export type ModelVersionStatus =
  | "IN_PROGRESS"
  | "SUCCESS"
  | "FAILED"
  | "IMPORT_IN_PROGRESS"
  | "CANCELED"
  | (string & {});
export interface DescribeModelResponse {
  ModelName?: string;
  ModelArn?: string;
  DatasetName?: string;
  DatasetArn?: string;
  Schema?: string;
  LabelsInputConfiguration?: LabelsInputConfiguration;
  TrainingDataStartTime?: Date;
  TrainingDataEndTime?: Date;
  EvaluationDataStartTime?: Date;
  EvaluationDataEndTime?: Date;
  RoleArn?: string;
  DataPreProcessingConfiguration?: DataPreProcessingConfiguration;
  Status?: ModelStatus;
  TrainingExecutionStartTime?: Date;
  TrainingExecutionEndTime?: Date;
  FailedReason?: string;
  ModelMetrics?: string;
  LastUpdatedTime?: Date;
  CreatedAt?: Date;
  ServerSideKmsKeyId?: string;
  OffCondition?: string;
  SourceModelVersionArn?: string;
  ImportJobStartTime?: Date;
  ImportJobEndTime?: Date;
  ActiveModelVersion?: number;
  ActiveModelVersionArn?: string;
  ModelVersionActivatedAt?: Date;
  PreviousActiveModelVersion?: number;
  PreviousActiveModelVersionArn?: string;
  PreviousModelVersionActivatedAt?: Date;
  PriorModelMetrics?: string;
  LatestScheduledRetrainingFailedReason?: string;
  LatestScheduledRetrainingStatus?: ModelVersionStatus;
  LatestScheduledRetrainingModelVersion?: number;
  LatestScheduledRetrainingStartTime?: Date;
  LatestScheduledRetrainingAvailableDataInDays?: number;
  NextScheduledRetrainingStartDate?: Date;
  AccumulatedInferenceDataStartTime?: Date;
  AccumulatedInferenceDataEndTime?: Date;
  RetrainingSchedulerStatus?: RetrainingSchedulerStatus;
  ModelDiagnosticsOutputConfiguration?: ModelDiagnosticsOutputConfiguration;
  ModelQuality?: ModelQuality;
}
export interface DescribeModelVersionRequest {
  ModelName: string;
  ModelVersion: number;
}
export type ModelVersionSourceType = "TRAINING" | "RETRAINING" | "IMPORT" | (string & {});
export type InlineDataSchema = string;
export type ModelMetrics = string;
export type AutoPromotionResult =
  | "MODEL_PROMOTED"
  | "MODEL_NOT_PROMOTED"
  | "RETRAINING_INTERNAL_ERROR"
  | "RETRAINING_CUSTOMER_ERROR"
  | "RETRAINING_CANCELLED"
  | (string & {});
export type AutoPromotionResultReason = string;
export interface DescribeModelVersionResponse {
  ModelName?: string;
  ModelArn?: string;
  ModelVersion?: number;
  ModelVersionArn?: string;
  Status?: ModelVersionStatus;
  SourceType?: ModelVersionSourceType;
  DatasetName?: string;
  DatasetArn?: string;
  Schema?: string;
  LabelsInputConfiguration?: LabelsInputConfiguration;
  TrainingDataStartTime?: Date;
  TrainingDataEndTime?: Date;
  EvaluationDataStartTime?: Date;
  EvaluationDataEndTime?: Date;
  RoleArn?: string;
  DataPreProcessingConfiguration?: DataPreProcessingConfiguration;
  TrainingExecutionStartTime?: Date;
  TrainingExecutionEndTime?: Date;
  FailedReason?: string;
  ModelMetrics?: string;
  LastUpdatedTime?: Date;
  CreatedAt?: Date;
  ServerSideKmsKeyId?: string;
  OffCondition?: string;
  SourceModelVersionArn?: string;
  ImportJobStartTime?: Date;
  ImportJobEndTime?: Date;
  ImportedDataSizeInBytes?: number;
  PriorModelMetrics?: string;
  RetrainingAvailableDataInDays?: number;
  AutoPromotionResult?: AutoPromotionResult;
  AutoPromotionResultReason?: string;
  ModelDiagnosticsOutputConfiguration?: ModelDiagnosticsOutputConfiguration;
  ModelDiagnosticsResultsObject?: S3Object;
  ModelQuality?: ModelQuality;
}
export interface DescribeResourcePolicyRequest {
  ResourceArn: string;
}
export type PolicyRevisionId = string;
export type Policy = string;
export interface DescribeResourcePolicyResponse {
  PolicyRevisionId?: string;
  ResourcePolicy?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export interface DescribeRetrainingSchedulerRequest {
  ModelName: string;
}
export interface DescribeRetrainingSchedulerResponse {
  ModelName?: string;
  ModelArn?: string;
  RetrainingStartDate?: Date;
  RetrainingFrequency?: string;
  LookbackWindow?: string;
  Status?: RetrainingSchedulerStatus;
  PromoteMode?: ModelPromoteMode;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export interface ImportDatasetRequest {
  SourceDatasetArn: string;
  DatasetName?: string;
  ClientToken: string;
  ServerSideKmsKeyId?: string;
  Tags?: Tag[];
}
export interface ImportDatasetResponse {
  DatasetName?: string;
  DatasetArn?: string;
  Status?: DatasetStatus;
  JobId?: string;
}
export type InferenceDataImportStrategy =
  | "NO_IMPORT"
  | "ADD_WHEN_EMPTY"
  | "OVERWRITE"
  | (string & {});
export interface ImportModelVersionRequest {
  SourceModelVersionArn: string;
  ModelName?: string;
  DatasetName: string;
  LabelsInputConfiguration?: LabelsInputConfiguration;
  ClientToken: string;
  RoleArn?: string;
  ServerSideKmsKeyId?: string;
  Tags?: Tag[];
  InferenceDataImportStrategy?: InferenceDataImportStrategy;
}
export interface ImportModelVersionResponse {
  ModelName?: string;
  ModelArn?: string;
  ModelVersionArn?: string;
  ModelVersion?: number;
  Status?: ModelVersionStatus;
}
export type NextToken = string;
export type MaxResults = number;
export interface ListDataIngestionJobsRequest {
  DatasetName?: string;
  NextToken?: string;
  MaxResults?: number;
  Status?: IngestionJobStatus;
}
export interface DataIngestionJobSummary {
  JobId?: string;
  DatasetName?: string;
  DatasetArn?: string;
  IngestionInputConfiguration?: IngestionInputConfiguration;
  Status?: IngestionJobStatus;
}
export type DataIngestionJobSummaries = DataIngestionJobSummary[];
export interface ListDataIngestionJobsResponse {
  NextToken?: string;
  DataIngestionJobSummaries?: DataIngestionJobSummary[];
}
export interface ListDatasetsRequest {
  NextToken?: string;
  MaxResults?: number;
  DatasetNameBeginsWith?: string;
}
export interface DatasetSummary {
  DatasetName?: string;
  DatasetArn?: string;
  Status?: DatasetStatus;
  CreatedAt?: Date;
}
export type DatasetSummaries = DatasetSummary[];
export interface ListDatasetsResponse {
  NextToken?: string;
  DatasetSummaries?: DatasetSummary[];
}
export interface ListInferenceEventsRequest {
  NextToken?: string;
  MaxResults?: number;
  InferenceSchedulerName: string;
  IntervalStartTime: Date;
  IntervalEndTime: Date;
}
export type EventDurationInSeconds = number;
export interface InferenceEventSummary {
  InferenceSchedulerArn?: string;
  InferenceSchedulerName?: string;
  EventStartTime?: Date;
  EventEndTime?: Date;
  Diagnostics?: string;
  EventDurationInSeconds?: number;
}
export type InferenceEventSummaries = InferenceEventSummary[];
export interface ListInferenceEventsResponse {
  NextToken?: string;
  InferenceEventSummaries?: InferenceEventSummary[];
}
export type InferenceExecutionStatus = "IN_PROGRESS" | "SUCCESS" | "FAILED" | (string & {});
export interface ListInferenceExecutionsRequest {
  NextToken?: string;
  MaxResults?: number;
  InferenceSchedulerName: string;
  DataStartTimeAfter?: Date;
  DataEndTimeBefore?: Date;
  Status?: InferenceExecutionStatus;
}
export interface InferenceExecutionSummary {
  ModelName?: string;
  ModelArn?: string;
  InferenceSchedulerName?: string;
  InferenceSchedulerArn?: string;
  ScheduledStartTime?: Date;
  DataStartTime?: Date;
  DataEndTime?: Date;
  DataInputConfiguration?: InferenceInputConfiguration;
  DataOutputConfiguration?: InferenceOutputConfiguration;
  CustomerResultObject?: S3Object;
  Status?: InferenceExecutionStatus;
  FailedReason?: string;
  ModelVersion?: number;
  ModelVersionArn?: string;
}
export type InferenceExecutionSummaries = InferenceExecutionSummary[];
export interface ListInferenceExecutionsResponse {
  NextToken?: string;
  InferenceExecutionSummaries?: InferenceExecutionSummary[];
}
export interface ListInferenceSchedulersRequest {
  NextToken?: string;
  MaxResults?: number;
  InferenceSchedulerNameBeginsWith?: string;
  ModelName?: string;
  Status?: InferenceSchedulerStatus;
}
export interface InferenceSchedulerSummary {
  ModelName?: string;
  ModelArn?: string;
  InferenceSchedulerName?: string;
  InferenceSchedulerArn?: string;
  Status?: InferenceSchedulerStatus;
  DataDelayOffsetInMinutes?: number;
  DataUploadFrequency?: DataUploadFrequency;
  LatestInferenceResult?: LatestInferenceResult;
}
export type InferenceSchedulerSummaries = InferenceSchedulerSummary[];
export interface ListInferenceSchedulersResponse {
  NextToken?: string;
  InferenceSchedulerSummaries?: InferenceSchedulerSummary[];
}
export interface ListLabelGroupsRequest {
  LabelGroupNameBeginsWith?: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface LabelGroupSummary {
  LabelGroupName?: string;
  LabelGroupArn?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export type LabelGroupSummaries = LabelGroupSummary[];
export interface ListLabelGroupsResponse {
  NextToken?: string;
  LabelGroupSummaries?: LabelGroupSummary[];
}
export interface ListLabelsRequest {
  LabelGroupName: string;
  IntervalStartTime?: Date;
  IntervalEndTime?: Date;
  FaultCode?: string;
  Equipment?: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface LabelSummary {
  LabelGroupName?: string;
  LabelId?: string;
  LabelGroupArn?: string;
  StartTime?: Date;
  EndTime?: Date;
  Rating?: LabelRating;
  FaultCode?: string;
  Equipment?: string;
  CreatedAt?: Date;
}
export type LabelSummaries = LabelSummary[];
export interface ListLabelsResponse {
  NextToken?: string;
  LabelSummaries?: LabelSummary[];
}
export interface ListModelsRequest {
  NextToken?: string;
  MaxResults?: number;
  Status?: ModelStatus;
  ModelNameBeginsWith?: string;
  DatasetNameBeginsWith?: string;
}
export interface ModelSummary {
  ModelName?: string;
  ModelArn?: string;
  DatasetName?: string;
  DatasetArn?: string;
  Status?: ModelStatus;
  CreatedAt?: Date;
  ActiveModelVersion?: number;
  ActiveModelVersionArn?: string;
  LatestScheduledRetrainingStatus?: ModelVersionStatus;
  LatestScheduledRetrainingModelVersion?: number;
  LatestScheduledRetrainingStartTime?: Date;
  NextScheduledRetrainingStartDate?: Date;
  RetrainingSchedulerStatus?: RetrainingSchedulerStatus;
  ModelDiagnosticsOutputConfiguration?: ModelDiagnosticsOutputConfiguration;
  ModelQuality?: ModelQuality;
}
export type ModelSummaries = ModelSummary[];
export interface ListModelsResponse {
  NextToken?: string;
  ModelSummaries?: ModelSummary[];
}
export interface ListModelVersionsRequest {
  ModelName: string;
  NextToken?: string;
  MaxResults?: number;
  Status?: ModelVersionStatus;
  SourceType?: ModelVersionSourceType;
  CreatedAtEndTime?: Date;
  CreatedAtStartTime?: Date;
  MaxModelVersion?: number;
  MinModelVersion?: number;
}
export interface ModelVersionSummary {
  ModelName?: string;
  ModelArn?: string;
  ModelVersion?: number;
  ModelVersionArn?: string;
  CreatedAt?: Date;
  Status?: ModelVersionStatus;
  SourceType?: ModelVersionSourceType;
  ModelQuality?: ModelQuality;
}
export type ModelVersionSummaries = ModelVersionSummary[];
export interface ListModelVersionsResponse {
  NextToken?: string;
  ModelVersionSummaries?: ModelVersionSummary[];
}
export interface ListRetrainingSchedulersRequest {
  ModelNameBeginsWith?: string;
  Status?: RetrainingSchedulerStatus;
  NextToken?: string;
  MaxResults?: number;
}
export interface RetrainingSchedulerSummary {
  ModelName?: string;
  ModelArn?: string;
  Status?: RetrainingSchedulerStatus;
  RetrainingStartDate?: Date;
  RetrainingFrequency?: string;
  LookbackWindow?: string;
}
export type RetrainingSchedulerSummaries = RetrainingSchedulerSummary[];
export interface ListRetrainingSchedulersResponse {
  RetrainingSchedulerSummaries?: RetrainingSchedulerSummary[];
  NextToken?: string;
}
export interface ListSensorStatisticsRequest {
  DatasetName: string;
  IngestionJobId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type ComponentName = string;
export type SensorName = string;
export interface CountPercent {
  Count: number;
  Percentage: number;
}
export type StatisticalIssueStatus =
  | "POTENTIAL_ISSUE_DETECTED"
  | "NO_ISSUE_DETECTED"
  | (string & {});
export interface CategoricalValues {
  Status: StatisticalIssueStatus;
  NumberOfCategory?: number;
}
export interface MultipleOperatingModes {
  Status: StatisticalIssueStatus;
}
export interface LargeTimestampGaps {
  Status: StatisticalIssueStatus;
  NumberOfLargeTimestampGaps?: number;
  MaxTimestampGapInDays?: number;
}
export type Monotonicity = "DECREASING" | "INCREASING" | "STATIC" | (string & {});
export interface MonotonicValues {
  Status: StatisticalIssueStatus;
  Monotonicity?: Monotonicity;
}
export interface SensorStatisticsSummary {
  ComponentName?: string;
  SensorName?: string;
  DataExists?: boolean;
  MissingValues?: CountPercent;
  InvalidValues?: CountPercent;
  InvalidDateEntries?: CountPercent;
  DuplicateTimestamps?: CountPercent;
  CategoricalValues?: CategoricalValues;
  MultipleOperatingModes?: MultipleOperatingModes;
  LargeTimestampGaps?: LargeTimestampGaps;
  MonotonicValues?: MonotonicValues;
  DataStartTime?: Date;
  DataEndTime?: Date;
}
export type SensorStatisticsSummaries = SensorStatisticsSummary[];
export interface ListSensorStatisticsResponse {
  SensorStatisticsSummaries?: SensorStatisticsSummary[];
  NextToken?: string;
}
export type AmazonResourceArn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export interface PutResourcePolicyRequest {
  ResourceArn: string;
  ResourcePolicy: string;
  PolicyRevisionId?: string;
  ClientToken: string;
}
export interface PutResourcePolicyResponse {
  ResourceArn?: string;
  PolicyRevisionId?: string;
}
export interface StartDataIngestionJobRequest {
  DatasetName: string;
  IngestionInputConfiguration: IngestionInputConfiguration;
  RoleArn: string;
  ClientToken: string;
}
export interface StartDataIngestionJobResponse {
  JobId?: string;
  Status?: IngestionJobStatus;
}
export interface StartInferenceSchedulerRequest {
  InferenceSchedulerName: string;
}
export interface StartInferenceSchedulerResponse {
  ModelArn?: string;
  ModelName?: string;
  InferenceSchedulerName?: string;
  InferenceSchedulerArn?: string;
  Status?: InferenceSchedulerStatus;
}
export interface StartRetrainingSchedulerRequest {
  ModelName: string;
}
export interface StartRetrainingSchedulerResponse {
  ModelName?: string;
  ModelArn?: string;
  Status?: RetrainingSchedulerStatus;
}
export interface StopInferenceSchedulerRequest {
  InferenceSchedulerName: string;
}
export interface StopInferenceSchedulerResponse {
  ModelArn?: string;
  ModelName?: string;
  InferenceSchedulerName?: string;
  InferenceSchedulerArn?: string;
  Status?: InferenceSchedulerStatus;
}
export interface StopRetrainingSchedulerRequest {
  ModelName: string;
}
export interface StopRetrainingSchedulerResponse {
  ModelName?: string;
  ModelArn?: string;
  Status?: RetrainingSchedulerStatus;
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateActiveModelVersionRequest {
  ModelName: string;
  ModelVersion: number;
}
export interface UpdateActiveModelVersionResponse {
  ModelName?: string;
  ModelArn?: string;
  CurrentActiveVersion?: number;
  PreviousActiveVersion?: number;
  CurrentActiveVersionArn?: string;
  PreviousActiveVersionArn?: string;
}
export interface UpdateInferenceSchedulerRequest {
  InferenceSchedulerName: string;
  DataDelayOffsetInMinutes?: number;
  DataUploadFrequency?: DataUploadFrequency;
  DataInputConfiguration?: InferenceInputConfiguration;
  DataOutputConfiguration?: InferenceOutputConfiguration;
  RoleArn?: string;
}
export interface UpdateInferenceSchedulerResponse {}
export interface UpdateLabelGroupRequest {
  LabelGroupName: string;
  FaultCodes?: string[];
}
export interface UpdateLabelGroupResponse {}
export interface UpdateModelRequest {
  ModelName: string;
  LabelsInputConfiguration?: LabelsInputConfiguration;
  RoleArn?: string;
  ModelDiagnosticsOutputConfiguration?: ModelDiagnosticsOutputConfiguration;
}
export interface UpdateModelResponse {}
export interface UpdateRetrainingSchedulerRequest {
  ModelName: string;
  RetrainingStartDate?: Date;
  RetrainingFrequency?: string;
  LookbackWindow?: string;
  PromoteMode?: ModelPromoteMode;
}
export interface UpdateRetrainingSchedulerResponse {}
export type CreateDatasetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a container for a collection of data being ingested for analysis. The dataset
 * contains the metadata describing where the data is and what the data actually looks like.
 * For example, it contains the location of the data source, the data schema, and other
 * information. A dataset also contains any tags associated with the ingested data.
 */
export const createDataset: API.OperationMethod<
  CreateDatasetRequest,
  CreateDatasetResponse,
  CreateDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(880, __c55, 0) as any as S.Schema<CreateDatasetRequest>,
  output: __S(881, __c55, 1) as any as S.Schema<CreateDatasetResponse>,
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
  operationName: "CreateDataset",
}));

export type CreateInferenceSchedulerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a scheduled inference. Scheduling an inference is setting up a continuous
 * real-time inference plan to analyze new measurement data. When setting up the schedule, you
 * provide an S3 bucket location for the input data, assign it a delimiter between separate
 * entries in the data, set an offset delay if desired, and set the frequency of inferencing.
 * You must also provide an S3 bucket location for the output data.
 */
export const createInferenceScheduler: API.OperationMethod<
  CreateInferenceSchedulerRequest,
  CreateInferenceSchedulerResponse,
  CreateInferenceSchedulerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(928, __c58, 0) as any as S.Schema<CreateInferenceSchedulerRequest>,
  output: __S(929, __c58, 1) as any as S.Schema<CreateInferenceSchedulerResponse>,
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
  operationName: "CreateInferenceScheduler",
}));

export type CreateLabelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a label for an event.
 */
export const createLabel: API.OperationMethod<
  CreateLabelRequest,
  CreateLabelResponse,
  CreateLabelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(992, __c62, 0) as any as S.Schema<CreateLabelRequest>,
  output: __S(993, __c62, 1) as any as S.Schema<CreateLabelResponse>,
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
  operationName: "CreateLabel",
}));

export type CreateLabelGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a group of labels.
 */
export const createLabelGroup: API.OperationMethod<
  CreateLabelGroupRequest,
  CreateLabelGroupResponse,
  CreateLabelGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateLabelGroupRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateLabelGroupResponse>,
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
  operationName: "CreateLabelGroup",
}));

export type CreateModelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a machine learning model for data inference.
 *
 * A machine-learning (ML) model is a mathematical model that finds patterns in your data.
 * In Amazon Lookout for Equipment, the model learns the patterns of normal behavior and detects abnormal
 * behavior that could be potential equipment failure (or maintenance events). The models are
 * made by analyzing normal data and abnormalities in machine behavior that have already
 * occurred.
 *
 * Your model is trained using a portion of the data from your dataset and uses that data
 * to learn patterns of normal behavior and abnormal patterns that lead to equipment failure.
 * Another portion of the data is used to evaluate the model's accuracy.
 */
export const createModel: API.OperationMethod<
  CreateModelRequest,
  CreateModelResponse,
  CreateModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c2, 0) as any as S.Schema<CreateModelRequest>,
  output: __S(33, __c2, 1) as any as S.Schema<CreateModelResponse>,
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
  operationName: "CreateModel",
}));

export type CreateRetrainingSchedulerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a retraining scheduler on the specified model.
 */
export const createRetrainingScheduler: API.OperationMethod<
  CreateRetrainingSchedulerRequest,
  CreateRetrainingSchedulerResponse,
  CreateRetrainingSchedulerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<CreateRetrainingSchedulerRequest>,
  output: __S(96, __c6, 0) as any as S.Schema<CreateRetrainingSchedulerResponse>,
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
  operationName: "CreateRetrainingScheduler",
}));

export type DeleteDatasetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a dataset and associated artifacts. The operation will check to see if any
 * inference scheduler or data ingestion job is currently using the dataset, and if there
 * isn't, the dataset, its metadata, and any associated data stored in S3 will be deleted.
 * This does not affect any models that used this dataset for training and evaluation, but
 * does prevent it from being used in the future.
 */
export const deleteDataset: API.OperationMethod<
  DeleteDatasetRequest,
  DeleteDatasetResponse,
  DeleteDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<DeleteDatasetRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<DeleteDatasetResponse>,
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
  operationName: "DeleteDataset",
}));

export type DeleteInferenceSchedulerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an inference scheduler that has been set up. Prior inference results will not be
 * deleted.
 */
export const deleteInferenceScheduler: API.OperationMethod<
  DeleteInferenceSchedulerRequest,
  DeleteInferenceSchedulerResponse,
  DeleteInferenceSchedulerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<DeleteInferenceSchedulerRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<DeleteInferenceSchedulerResponse>,
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
  operationName: "DeleteInferenceScheduler",
}));

export type DeleteLabelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a label.
 */
export const deleteLabel: API.OperationMethod<
  DeleteLabelRequest,
  DeleteLabelResponse,
  DeleteLabelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<DeleteLabelRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<DeleteLabelResponse>,
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
  operationName: "DeleteLabel",
}));

export type DeleteLabelGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a group of labels.
 */
export const deleteLabelGroup: API.OperationMethod<
  DeleteLabelGroupRequest,
  DeleteLabelGroupResponse,
  DeleteLabelGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<DeleteLabelGroupRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<DeleteLabelGroupResponse>,
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
  operationName: "DeleteLabelGroup",
}));

export type DeleteModelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a machine learning model currently available for Amazon Lookout for Equipment. This will prevent it
 * from being used with an inference scheduler, even one that is already set up.
 */
export const deleteModel: API.OperationMethod<
  DeleteModelRequest,
  DeleteModelResponse,
  DeleteModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<DeleteModelRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<DeleteModelResponse>,
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
  operationName: "DeleteModel",
}));

export type DeleteResourcePolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the resource policy attached to the resource.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<DeleteResourcePolicyRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<DeleteResourcePolicyResponse>,
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
  operationName: "DeleteResourcePolicy",
}));

export type DeleteRetrainingSchedulerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a retraining scheduler from a model. The retraining scheduler must be in the
 * `STOPPED` status.
 */
export const deleteRetrainingScheduler: API.OperationMethod<
  DeleteRetrainingSchedulerRequest,
  DeleteRetrainingSchedulerResponse,
  DeleteRetrainingSchedulerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<DeleteRetrainingSchedulerRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<DeleteRetrainingSchedulerResponse>,
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
  operationName: "DeleteRetrainingScheduler",
}));

export type DescribeDataIngestionJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides information on a specific data ingestion job such as creation time, dataset
 * ARN, and status.
 */
export const describeDataIngestionJob: API.OperationMethod<
  DescribeDataIngestionJobRequest,
  DescribeDataIngestionJobResponse,
  DescribeDataIngestionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<DescribeDataIngestionJobRequest>,
  output: __S(241, __c15, 1) as any as S.Schema<DescribeDataIngestionJobResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataIngestionJob",
}));

export type DescribeDatasetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides a JSON description of the data in each time series dataset, including names,
 * column names, and data types.
 */
export const describeDataset: API.OperationMethod<
  DescribeDatasetRequest,
  DescribeDatasetResponse,
  DescribeDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<DescribeDatasetRequest>,
  output: __S(305, __c19, 1) as any as S.Schema<DescribeDatasetResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataset",
}));

export type DescribeInferenceSchedulerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Specifies information about the inference scheduler being used, including name, model,
 * status, and associated metadata
 */
export const describeInferenceScheduler: API.OperationMethod<
  DescribeInferenceSchedulerRequest,
  DescribeInferenceSchedulerResponse,
  DescribeInferenceSchedulerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<DescribeInferenceSchedulerRequest>,
  output: __S(321, __c20, 1) as any as S.Schema<DescribeInferenceSchedulerResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInferenceScheduler",
}));

export type DescribeLabelError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the name of the label.
 */
export const describeLabel: API.OperationMethod<
  DescribeLabelRequest,
  DescribeLabelResponse,
  DescribeLabelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<DescribeLabelRequest>,
  output: __S(337, __c21, 1) as any as S.Schema<DescribeLabelResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLabel",
}));

export type DescribeLabelGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the label group.
 */
export const describeLabelGroup: API.OperationMethod<
  DescribeLabelGroupRequest,
  DescribeLabelGroupResponse,
  DescribeLabelGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<DescribeLabelGroupRequest>,
  output: __S(353, __c22, 1) as any as S.Schema<DescribeLabelGroupResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLabelGroup",
}));

export type DescribeModelError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides a JSON containing the overall information about a specific machine learning
 * model, including model name and ARN, dataset, training and evaluation information, status,
 * and so on.
 */
export const describeModel: API.OperationMethod<
  DescribeModelRequest,
  DescribeModelResponse,
  DescribeModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<DescribeModelRequest>,
  output: __S(369, __c23, 1) as any as S.Schema<DescribeModelResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeModel",
}));

export type DescribeModelVersionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a specific machine learning model version.
 */
export const describeModelVersion: API.OperationMethod<
  DescribeModelVersionRequest,
  DescribeModelVersionResponse,
  DescribeModelVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<DescribeModelVersionRequest>,
  output: __S(385, __c24, 1) as any as S.Schema<DescribeModelVersionResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeModelVersion",
}));

export type DescribeResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides the details of a resource policy attached to a resource.
 */
export const describeResourcePolicy: API.OperationMethod<
  DescribeResourcePolicyRequest,
  DescribeResourcePolicyResponse,
  DescribeResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<DescribeResourcePolicyRequest>,
  output: __S(401, __c25, 1) as any as S.Schema<DescribeResourcePolicyResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeResourcePolicy",
}));

export type DescribeRetrainingSchedulerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides a description of the retraining scheduler, including information such as the
 * model name and retraining parameters.
 */
export const describeRetrainingScheduler: API.OperationMethod<
  DescribeRetrainingSchedulerRequest,
  DescribeRetrainingSchedulerResponse,
  DescribeRetrainingSchedulerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<DescribeRetrainingSchedulerRequest>,
  output: __S(417, __c26, 1) as any as S.Schema<DescribeRetrainingSchedulerResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRetrainingScheduler",
}));

export type ImportDatasetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Imports a dataset.
 */
export const importDataset: API.OperationMethod<
  ImportDatasetRequest,
  ImportDatasetResponse,
  ImportDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<ImportDatasetRequest>,
  output: __S(433, __c27, 1) as any as S.Schema<ImportDatasetResponse>,
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
  operationName: "ImportDataset",
}));

export type ImportModelVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Imports a model that has been trained successfully.
 */
export const importModelVersion: API.OperationMethod<
  ImportModelVersionRequest,
  ImportModelVersionResponse,
  ImportModelVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<ImportModelVersionRequest>,
  output: __S(449, __c28, 1) as any as S.Schema<ImportModelVersionResponse>,
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
  operationName: "ImportModelVersion",
}));

export type ListDataIngestionJobsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides a list of all data ingestion jobs, including dataset name and ARN, S3 location
 * of the input data, status, and so on.
 */
export const listDataIngestionJobs: API.PaginatedOperationMethod<
  ListDataIngestionJobsRequest,
  ListDataIngestionJobsResponse,
  ListDataIngestionJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<ListDataIngestionJobsRequest>,
  output: __S(467, __c29, 3) as any as S.Schema<ListDataIngestionJobsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataIngestionJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDatasetsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all datasets currently available in your account, filtering on the dataset name.
 */
export const listDatasets: API.PaginatedOperationMethod<
  ListDatasetsRequest,
  ListDatasetsResponse,
  ListDatasetsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<ListDatasetsRequest>,
  output: __S(483, __c30, 3) as any as S.Schema<ListDatasetsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInferenceEventsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all inference events that have been found for the specified inference scheduler.
 */
export const listInferenceEvents: API.PaginatedOperationMethod<
  ListInferenceEventsRequest,
  ListInferenceEventsResponse,
  ListInferenceEventsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<ListInferenceEventsRequest>,
  output: __S(499, __c31, 3) as any as S.Schema<ListInferenceEventsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInferenceEvents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInferenceExecutionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all inference executions that have been performed by the specified inference
 * scheduler.
 */
export const listInferenceExecutions: API.PaginatedOperationMethod<
  ListInferenceExecutionsRequest,
  ListInferenceExecutionsResponse,
  ListInferenceExecutionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<ListInferenceExecutionsRequest>,
  output: __S(515, __c32, 3) as any as S.Schema<ListInferenceExecutionsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInferenceExecutions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInferenceSchedulersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of all inference schedulers currently available for your account.
 */
export const listInferenceSchedulers: API.PaginatedOperationMethod<
  ListInferenceSchedulersRequest,
  ListInferenceSchedulersResponse,
  ListInferenceSchedulersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<ListInferenceSchedulersRequest>,
  output: __S(531, __c33, 3) as any as S.Schema<ListInferenceSchedulersResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInferenceSchedulers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLabelGroupsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the label groups.
 */
export const listLabelGroups: API.PaginatedOperationMethod<
  ListLabelGroupsRequest,
  ListLabelGroupsResponse,
  ListLabelGroupsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(544, __c34, 0) as any as S.Schema<ListLabelGroupsRequest>,
  output: __S(547, __c34, 3) as any as S.Schema<ListLabelGroupsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLabelGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLabelsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides a list of labels.
 */
export const listLabels: API.PaginatedOperationMethod<
  ListLabelsRequest,
  ListLabelsResponse,
  ListLabelsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(560, __c35, 0) as any as S.Schema<ListLabelsRequest>,
  output: __S(563, __c35, 3) as any as S.Schema<ListLabelsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLabels",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListModelsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Generates a list of all models in the account, including model name and ARN, dataset,
 * and status.
 */
export const listModels: API.PaginatedOperationMethod<
  ListModelsRequest,
  ListModelsResponse,
  ListModelsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(576, __c36, 0) as any as S.Schema<ListModelsRequest>,
  output: __S(579, __c36, 3) as any as S.Schema<ListModelsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListModels",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListModelVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Generates a list of all model versions for a given model, including the model version,
 * model version ARN, and status. To list a subset of versions, use the
 * `MaxModelVersion` and `MinModelVersion` fields.
 */
export const listModelVersions: API.PaginatedOperationMethod<
  ListModelVersionsRequest,
  ListModelVersionsResponse,
  ListModelVersionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(592, __c37, 0) as any as S.Schema<ListModelVersionsRequest>,
  output: __S(595, __c37, 3) as any as S.Schema<ListModelVersionsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListModelVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRetrainingSchedulersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all retraining schedulers in your account, filtering by model name prefix and
 * status.
 */
export const listRetrainingSchedulers: API.PaginatedOperationMethod<
  ListRetrainingSchedulersRequest,
  ListRetrainingSchedulersResponse,
  ListRetrainingSchedulersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(608, __c38, 0) as any as S.Schema<ListRetrainingSchedulersRequest>,
  output: __S(611, __c38, 3) as any as S.Schema<ListRetrainingSchedulersResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRetrainingSchedulers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSensorStatisticsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists statistics about the data collected for each of the sensors that have been
 * successfully ingested in the particular dataset. Can also be used to retreive Sensor
 * Statistics for a previous ingestion job.
 */
export const listSensorStatistics: API.PaginatedOperationMethod<
  ListSensorStatisticsRequest,
  ListSensorStatisticsResponse,
  ListSensorStatisticsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(624, __c39, 0) as any as S.Schema<ListSensorStatisticsRequest>,
  output: __S(632, __c39, 8) as any as S.Schema<ListSensorStatisticsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSensorStatistics",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
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
 * Lists all the tags for a specified resource, including key and value.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c40, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(641, __c40, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
}));

export type PutResourcePolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a resource control policy for a given resource.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(656, __c41, 0) as any as S.Schema<PutResourcePolicyRequest>,
  output: __S(657, __c41, 1) as any as S.Schema<PutResourcePolicyResponse>,
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
  operationName: "PutResourcePolicy",
}));

export type StartDataIngestionJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a data ingestion job. Amazon Lookout for Equipment returns the job status.
 */
export const startDataIngestionJob: API.OperationMethod<
  StartDataIngestionJobRequest,
  StartDataIngestionJobResponse,
  StartDataIngestionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c42, 0) as any as S.Schema<StartDataIngestionJobRequest>,
  output: __S(673, __c42, 1) as any as S.Schema<StartDataIngestionJobResponse>,
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
  operationName: "StartDataIngestionJob",
}));

export type StartInferenceSchedulerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts an inference scheduler.
 */
export const startInferenceScheduler: API.OperationMethod<
  StartInferenceSchedulerRequest,
  StartInferenceSchedulerResponse,
  StartInferenceSchedulerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(688, __c43, 0) as any as S.Schema<StartInferenceSchedulerRequest>,
  output: __S(704, __c44, 0) as any as S.Schema<StartInferenceSchedulerResponse>,
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
  operationName: "StartInferenceScheduler",
}));

export type StartRetrainingSchedulerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a retraining scheduler.
 */
export const startRetrainingScheduler: API.OperationMethod<
  StartRetrainingSchedulerRequest,
  StartRetrainingSchedulerResponse,
  StartRetrainingSchedulerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(720, __c45, 0) as any as S.Schema<StartRetrainingSchedulerRequest>,
  output: __S(96, __c6, 0) as any as S.Schema<StartRetrainingSchedulerResponse>,
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
  operationName: "StartRetrainingScheduler",
}));

export type StopInferenceSchedulerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops an inference scheduler.
 */
export const stopInferenceScheduler: API.OperationMethod<
  StopInferenceSchedulerRequest,
  StopInferenceSchedulerResponse,
  StopInferenceSchedulerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c46, 0) as any as S.Schema<StopInferenceSchedulerRequest>,
  output: __S(704, __c44, 0) as any as S.Schema<StopInferenceSchedulerResponse>,
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
  operationName: "StopInferenceScheduler",
}));

export type StopRetrainingSchedulerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops a retraining scheduler.
 */
export const stopRetrainingScheduler: API.OperationMethod<
  StopRetrainingSchedulerRequest,
  StopRetrainingSchedulerResponse,
  StopRetrainingSchedulerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(752, __c47, 0) as any as S.Schema<StopRetrainingSchedulerRequest>,
  output: __S(96, __c6, 0) as any as S.Schema<StopRetrainingSchedulerResponse>,
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
  operationName: "StopRetrainingScheduler",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a given tag to a resource in your account. A tag is a key-value pair which
 * can be added to an Amazon Lookout for Equipment resource as metadata. Tags can be used for organizing your
 * resources as well as helping you to search and filter by tag. Multiple tags can be added to
 * a resource, either when you create it, or later. Up to 50 tags can be associated with each
 * resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c48, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a specific tag from a given resource. The tag is specified by its key.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(784, __c49, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

export type UpdateActiveModelVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets the active model version for a given machine learning model.
 */
export const updateActiveModelVersion: API.OperationMethod<
  UpdateActiveModelVersionRequest,
  UpdateActiveModelVersionResponse,
  UpdateActiveModelVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c50, 0) as any as S.Schema<UpdateActiveModelVersionRequest>,
  output: __S(801, __c50, 1) as any as S.Schema<UpdateActiveModelVersionResponse>,
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
  operationName: "UpdateActiveModelVersion",
}));

export type UpdateInferenceSchedulerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an inference scheduler.
 */
export const updateInferenceScheduler: API.OperationMethod<
  UpdateInferenceSchedulerRequest,
  UpdateInferenceSchedulerResponse,
  UpdateInferenceSchedulerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(816, __c51, 0) as any as S.Schema<UpdateInferenceSchedulerRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<UpdateInferenceSchedulerResponse>,
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
  operationName: "UpdateInferenceScheduler",
}));

export type UpdateLabelGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the label group.
 */
export const updateLabelGroup: API.OperationMethod<
  UpdateLabelGroupRequest,
  UpdateLabelGroupResponse,
  UpdateLabelGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c52, 0) as any as S.Schema<UpdateLabelGroupRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<UpdateLabelGroupResponse>,
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
  operationName: "UpdateLabelGroup",
}));

export type UpdateModelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a model in the account.
 */
export const updateModel: API.OperationMethod<
  UpdateModelRequest,
  UpdateModelResponse,
  UpdateModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(848, __c53, 0) as any as S.Schema<UpdateModelRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<UpdateModelResponse>,
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
  operationName: "UpdateModel",
}));

export type UpdateRetrainingSchedulerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a retraining scheduler.
 */
export const updateRetrainingScheduler: API.OperationMethod<
  UpdateRetrainingSchedulerRequest,
  UpdateRetrainingSchedulerResponse,
  UpdateRetrainingSchedulerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c54, 0) as any as S.Schema<UpdateRetrainingSchedulerRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<UpdateRetrainingSchedulerResponse>,
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
  operationName: "UpdateRetrainingScheduler",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LabelGroupName: S.String,
          FaultCodes: S.optional(__S(16, __c1, 0)),
          ClientToken: S.String.pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(913, __c57, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateLabelGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ LabelGroupName: S.optional(S.String), LabelGroupArn: S.optional(S.String) }),
      ).annotate({ identifier: "CreateLabelGroupResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ModelName: S.String,
          DatasetName: S.String,
          DatasetSchema: S.optional(__S(896, __c56, 0)),
          LabelsInputConfiguration: S.optional(__S(64, __c4, 0)),
          ClientToken: S.String.pipe(T.IdempotencyToken()),
          TrainingDataStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TrainingDataEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EvaluationDataStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EvaluationDataEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RoleArn: S.optional(S.String),
          DataPreProcessingConfiguration: S.optional(__S(48, __c3, 0)),
          ServerSideKmsKeyId: S.optional(S.String),
          Tags: S.optional(__S(913, __c57, 1)),
          OffCondition: S.optional(S.String),
          ModelDiagnosticsOutputConfiguration: S.optional(__S(960, __c60, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateModelRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ModelArn: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "CreateModelResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ TargetSamplingRate: S.optional(S.String) })).annotate({
        identifier: "DataPreProcessingConfiguration",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          S3InputConfiguration: S.optional(__S(944, __c59, 0)),
          LabelGroupName: S.optional(S.String),
        }),
      ).annotate({ identifier: "LabelsInputConfiguration" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ModelName: S.String,
          RetrainingStartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RetrainingFrequency: S.String,
          LookbackWindow: S.String,
          PromoteMode: S.optional(S.String),
          ClientToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateRetrainingSchedulerRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ModelName: S.optional(S.String),
          ModelArn: S.optional(S.String),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateRetrainingSchedulerResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DatasetName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDatasetRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteDatasetResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InferenceSchedulerName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteInferenceSchedulerRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LabelGroupName: S.String, LabelId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteLabelRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LabelGroupName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteLabelGroupRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ModelName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteModelRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteResourcePolicyRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ModelName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteRetrainingSchedulerRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeDataIngestionJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          JobId: S.optional(S.String),
          DatasetArn: S.optional(S.String),
          IngestionInputConfiguration: S.optional(__S(289, __c18, 1)),
          RoleArn: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          FailedReason: S.optional(S.String),
          DataQualitySummary: S.optional(__S(262, __c16, 6)),
          IngestedFilesSummary: S.optional(__S(264, __c16, 8)),
          StatusDetail: S.optional(S.String),
          IngestedDataSize: S.optional(S.Number),
          DataStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DataEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SourceDatasetArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeDataIngestionJobResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ AffectedSensorCount: S.Number })).annotate({
        identifier: "MissingCompleteSensorData",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MissingCompleteSensorData: __S(256, __c16, 0),
          SensorsWithShortDateRange: __S(256, __c16, 0),
        }),
      ).annotate({ identifier: "InsufficientSensorData" });
    case 2:
      return S.suspend(() =>
        S.Struct({ AffectedSensorCount: S.Number, TotalNumberOfMissingValues: S.Number }),
      ).annotate({ identifier: "MissingSensorData" });
    case 3:
      return S.suspend(() =>
        S.Struct({ AffectedSensorCount: S.Number, TotalNumberOfInvalidValues: S.Number }),
      ).annotate({ identifier: "InvalidSensorData" });
    case 4:
      return S.suspend(() => S.Struct({ TotalNumberOfUnsupportedTimestamps: S.Number })).annotate({
        identifier: "UnsupportedTimestamps",
      });
    case 5:
      return S.suspend(() => S.Struct({ TotalNumberOfDuplicateTimestamps: S.Number })).annotate({
        identifier: "DuplicateTimestamps",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({
          InsufficientSensorData: __S(257, __c16, 1),
          MissingSensorData: __S(258, __c16, 2),
          InvalidSensorData: __S(259, __c16, 3),
          UnsupportedTimestamps: __S(260, __c16, 4),
          DuplicateTimestamps: __S(261, __c16, 5),
        }),
      ).annotate({ identifier: "DataQualitySummary" });
    case 7:
      return S.Array(__S(272, __c17, 0));
    case 8:
      return S.suspend(() =>
        S.Struct({
          TotalNumberOfFiles: S.Number,
          IngestedNumberOfFiles: S.Number,
          DiscardedFiles: S.optional(__S(263, __c16, 7)),
        }),
      ).annotate({ identifier: "IngestedFilesSummary" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Bucket: S.String, Key: S.String })).annotate({
        identifier: "S3Object",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String,
          Prefix: S.optional(S.String),
          KeyPattern: S.optional(S.String),
        }),
      ).annotate({ identifier: "IngestionS3InputConfiguration" });
    case 1:
      return S.suspend(() => S.Struct({ S3InputConfiguration: __S(288, __c18, 0) })).annotate({
        identifier: "IngestionInputConfiguration",
      });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DatasetName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeDatasetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DatasetName: S.optional(S.String),
          DatasetArn: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          Schema: S.optional(S.String),
          ServerSideKmsKeyId: S.optional(S.String),
          IngestionInputConfiguration: S.optional(__S(289, __c18, 1)),
          DataQualitySummary: S.optional(__S(262, __c16, 6)),
          IngestedFilesSummary: S.optional(__S(264, __c16, 8)),
          RoleArn: S.optional(S.String),
          DataStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DataEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SourceDatasetArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeDatasetResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InferenceSchedulerName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeInferenceSchedulerRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ModelArn: S.optional(S.String),
          ModelName: S.optional(S.String),
          InferenceSchedulerName: S.optional(S.String),
          InferenceSchedulerArn: S.optional(S.String),
          Status: S.optional(S.String),
          DataDelayOffsetInMinutes: S.optional(S.Number),
          DataUploadFrequency: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DataInputConfiguration: S.optional(__S(977, __c61, 1)),
          DataOutputConfiguration: S.optional(__S(960, __c60, 0)),
          RoleArn: S.optional(S.String),
          ServerSideKmsKeyId: S.optional(S.String),
          LatestInferenceResult: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeInferenceSchedulerResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LabelGroupName: S.String, LabelId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeLabelRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LabelGroupName: S.optional(S.String),
          LabelGroupArn: S.optional(S.String),
          LabelId: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Rating: S.optional(S.String),
          FaultCode: S.optional(S.String),
          Notes: S.optional(S.String),
          Equipment: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DescribeLabelResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LabelGroupName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeLabelGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LabelGroupName: S.optional(S.String),
          LabelGroupArn: S.optional(S.String),
          FaultCodes: S.optional(__S(16, __c1, 0)),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DescribeLabelGroupResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ModelName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeModelRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ModelName: S.optional(S.String),
          ModelArn: S.optional(S.String),
          DatasetName: S.optional(S.String),
          DatasetArn: S.optional(S.String),
          Schema: S.optional(S.String),
          LabelsInputConfiguration: S.optional(__S(64, __c4, 0)),
          TrainingDataStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TrainingDataEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EvaluationDataStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EvaluationDataEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RoleArn: S.optional(S.String),
          DataPreProcessingConfiguration: S.optional(__S(48, __c3, 0)),
          Status: S.optional(S.String),
          TrainingExecutionStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TrainingExecutionEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FailedReason: S.optional(S.String),
          ModelMetrics: S.optional(S.String),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ServerSideKmsKeyId: S.optional(S.String),
          OffCondition: S.optional(S.String),
          SourceModelVersionArn: S.optional(S.String),
          ImportJobStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ImportJobEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ActiveModelVersion: S.optional(S.Number),
          ActiveModelVersionArn: S.optional(S.String),
          ModelVersionActivatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          PreviousActiveModelVersion: S.optional(S.Number),
          PreviousActiveModelVersionArn: S.optional(S.String),
          PreviousModelVersionActivatedAt: S.optional(
            S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ),
          PriorModelMetrics: S.optional(S.String),
          LatestScheduledRetrainingFailedReason: S.optional(S.String),
          LatestScheduledRetrainingStatus: S.optional(S.String),
          LatestScheduledRetrainingModelVersion: S.optional(S.Number),
          LatestScheduledRetrainingStartTime: S.optional(
            S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ),
          LatestScheduledRetrainingAvailableDataInDays: S.optional(S.Number),
          NextScheduledRetrainingStartDate: S.optional(
            S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ),
          AccumulatedInferenceDataStartTime: S.optional(
            S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ),
          AccumulatedInferenceDataEndTime: S.optional(
            S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ),
          RetrainingSchedulerStatus: S.optional(S.String),
          ModelDiagnosticsOutputConfiguration: S.optional(__S(960, __c60, 0)),
          ModelQuality: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeModelResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ModelName: S.String, ModelVersion: S.Number }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeModelVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ModelName: S.optional(S.String),
          ModelArn: S.optional(S.String),
          ModelVersion: S.optional(S.Number),
          ModelVersionArn: S.optional(S.String),
          Status: S.optional(S.String),
          SourceType: S.optional(S.String),
          DatasetName: S.optional(S.String),
          DatasetArn: S.optional(S.String),
          Schema: S.optional(S.String),
          LabelsInputConfiguration: S.optional(__S(64, __c4, 0)),
          TrainingDataStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TrainingDataEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EvaluationDataStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EvaluationDataEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RoleArn: S.optional(S.String),
          DataPreProcessingConfiguration: S.optional(__S(48, __c3, 0)),
          TrainingExecutionStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TrainingExecutionEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FailedReason: S.optional(S.String),
          ModelMetrics: S.optional(S.String),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ServerSideKmsKeyId: S.optional(S.String),
          OffCondition: S.optional(S.String),
          SourceModelVersionArn: S.optional(S.String),
          ImportJobStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ImportJobEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ImportedDataSizeInBytes: S.optional(S.Number),
          PriorModelMetrics: S.optional(S.String),
          RetrainingAvailableDataInDays: S.optional(S.Number),
          AutoPromotionResult: S.optional(S.String),
          AutoPromotionResultReason: S.optional(S.String),
          ModelDiagnosticsOutputConfiguration: S.optional(__S(960, __c60, 0)),
          ModelDiagnosticsResultsObject: S.optional(__S(272, __c17, 0)),
          ModelQuality: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeModelVersionResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeResourcePolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PolicyRevisionId: S.optional(S.String),
          ResourcePolicy: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DescribeResourcePolicyResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ModelName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeRetrainingSchedulerRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ModelName: S.optional(S.String),
          ModelArn: S.optional(S.String),
          RetrainingStartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RetrainingFrequency: S.optional(S.String),
          LookbackWindow: S.optional(S.String),
          Status: S.optional(S.String),
          PromoteMode: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DescribeRetrainingSchedulerResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceDatasetArn: S.String,
          DatasetName: S.optional(S.String),
          ClientToken: S.String.pipe(T.IdempotencyToken()),
          ServerSideKmsKeyId: S.optional(S.String),
          Tags: S.optional(__S(913, __c57, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ImportDatasetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DatasetName: S.optional(S.String),
          DatasetArn: S.optional(S.String),
          Status: S.optional(S.String),
          JobId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ImportDatasetResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceModelVersionArn: S.String,
          ModelName: S.optional(S.String),
          DatasetName: S.String,
          LabelsInputConfiguration: S.optional(__S(64, __c4, 0)),
          ClientToken: S.String.pipe(T.IdempotencyToken()),
          RoleArn: S.optional(S.String),
          ServerSideKmsKeyId: S.optional(S.String),
          Tags: S.optional(__S(913, __c57, 1)),
          InferenceDataImportStrategy: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ImportModelVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ModelName: S.optional(S.String),
          ModelArn: S.optional(S.String),
          ModelVersionArn: S.optional(S.String),
          ModelVersion: S.optional(S.Number),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "ImportModelVersionResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DatasetName: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          Status: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDataIngestionJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          JobId: S.optional(S.String),
          DatasetName: S.optional(S.String),
          DatasetArn: S.optional(S.String),
          IngestionInputConfiguration: S.optional(__S(289, __c18, 1)),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "DataIngestionJobSummary" });
    case 2:
      return S.Array(__S(465, __c29, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          DataIngestionJobSummaries: S.optional(__S(466, __c29, 2)),
        }),
      ).annotate({ identifier: "ListDataIngestionJobsResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          DatasetNameBeginsWith: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDatasetsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DatasetName: S.optional(S.String),
          DatasetArn: S.optional(S.String),
          Status: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DatasetSummary" });
    case 2:
      return S.Array(__S(481, __c30, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          DatasetSummaries: S.optional(__S(482, __c30, 2)),
        }),
      ).annotate({ identifier: "ListDatasetsResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          InferenceSchedulerName: S.String,
          IntervalStartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          IntervalEndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListInferenceEventsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          InferenceSchedulerArn: S.optional(S.String),
          InferenceSchedulerName: S.optional(S.String),
          EventStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EventEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Diagnostics: S.optional(S.String),
          EventDurationInSeconds: S.optional(S.Number),
        }),
      ).annotate({ identifier: "InferenceEventSummary" });
    case 2:
      return S.Array(__S(497, __c31, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          InferenceEventSummaries: S.optional(__S(498, __c31, 2)),
        }),
      ).annotate({ identifier: "ListInferenceEventsResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          InferenceSchedulerName: S.String,
          DataStartTimeAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DataEndTimeBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListInferenceExecutionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ModelName: S.optional(S.String),
          ModelArn: S.optional(S.String),
          InferenceSchedulerName: S.optional(S.String),
          InferenceSchedulerArn: S.optional(S.String),
          ScheduledStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DataStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DataEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DataInputConfiguration: S.optional(__S(977, __c61, 1)),
          DataOutputConfiguration: S.optional(__S(960, __c60, 0)),
          CustomerResultObject: S.optional(__S(272, __c17, 0)),
          Status: S.optional(S.String),
          FailedReason: S.optional(S.String),
          ModelVersion: S.optional(S.Number),
          ModelVersionArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "InferenceExecutionSummary" });
    case 2:
      return S.Array(__S(513, __c32, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          InferenceExecutionSummaries: S.optional(__S(514, __c32, 2)),
        }),
      ).annotate({ identifier: "ListInferenceExecutionsResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          InferenceSchedulerNameBeginsWith: S.optional(S.String),
          ModelName: S.optional(S.String),
          Status: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListInferenceSchedulersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ModelName: S.optional(S.String),
          ModelArn: S.optional(S.String),
          InferenceSchedulerName: S.optional(S.String),
          InferenceSchedulerArn: S.optional(S.String),
          Status: S.optional(S.String),
          DataDelayOffsetInMinutes: S.optional(S.Number),
          DataUploadFrequency: S.optional(S.String),
          LatestInferenceResult: S.optional(S.String),
        }),
      ).annotate({ identifier: "InferenceSchedulerSummary" });
    case 2:
      return S.Array(__S(529, __c33, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          InferenceSchedulerSummaries: S.optional(__S(530, __c33, 2)),
        }),
      ).annotate({ identifier: "ListInferenceSchedulersResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LabelGroupNameBeginsWith: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListLabelGroupsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LabelGroupName: S.optional(S.String),
          LabelGroupArn: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "LabelGroupSummary" });
    case 2:
      return S.Array(__S(545, __c34, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          LabelGroupSummaries: S.optional(__S(546, __c34, 2)),
        }),
      ).annotate({ identifier: "ListLabelGroupsResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LabelGroupName: S.String,
          IntervalStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          IntervalEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FaultCode: S.optional(S.String),
          Equipment: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListLabelsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LabelGroupName: S.optional(S.String),
          LabelId: S.optional(S.String),
          LabelGroupArn: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Rating: S.optional(S.String),
          FaultCode: S.optional(S.String),
          Equipment: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "LabelSummary" });
    case 2:
      return S.Array(__S(561, __c35, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          LabelSummaries: S.optional(__S(562, __c35, 2)),
        }),
      ).annotate({ identifier: "ListLabelsResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          Status: S.optional(S.String),
          ModelNameBeginsWith: S.optional(S.String),
          DatasetNameBeginsWith: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListModelsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ModelName: S.optional(S.String),
          ModelArn: S.optional(S.String),
          DatasetName: S.optional(S.String),
          DatasetArn: S.optional(S.String),
          Status: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ActiveModelVersion: S.optional(S.Number),
          ActiveModelVersionArn: S.optional(S.String),
          LatestScheduledRetrainingStatus: S.optional(S.String),
          LatestScheduledRetrainingModelVersion: S.optional(S.Number),
          LatestScheduledRetrainingStartTime: S.optional(
            S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ),
          NextScheduledRetrainingStartDate: S.optional(
            S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ),
          RetrainingSchedulerStatus: S.optional(S.String),
          ModelDiagnosticsOutputConfiguration: S.optional(__S(960, __c60, 0)),
          ModelQuality: S.optional(S.String),
        }),
      ).annotate({ identifier: "ModelSummary" });
    case 2:
      return S.Array(__S(577, __c36, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          ModelSummaries: S.optional(__S(578, __c36, 2)),
        }),
      ).annotate({ identifier: "ListModelsResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ModelName: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          Status: S.optional(S.String),
          SourceType: S.optional(S.String),
          CreatedAtEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedAtStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          MaxModelVersion: S.optional(S.Number),
          MinModelVersion: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListModelVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ModelName: S.optional(S.String),
          ModelArn: S.optional(S.String),
          ModelVersion: S.optional(S.Number),
          ModelVersionArn: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          SourceType: S.optional(S.String),
          ModelQuality: S.optional(S.String),
        }),
      ).annotate({ identifier: "ModelVersionSummary" });
    case 2:
      return S.Array(__S(593, __c37, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          ModelVersionSummaries: S.optional(__S(594, __c37, 2)),
        }),
      ).annotate({ identifier: "ListModelVersionsResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ModelNameBeginsWith: S.optional(S.String),
          Status: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListRetrainingSchedulersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ModelName: S.optional(S.String),
          ModelArn: S.optional(S.String),
          Status: S.optional(S.String),
          RetrainingStartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RetrainingFrequency: S.optional(S.String),
          LookbackWindow: S.optional(S.String),
        }),
      ).annotate({ identifier: "RetrainingSchedulerSummary" });
    case 2:
      return S.Array(__S(609, __c38, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          RetrainingSchedulerSummaries: S.optional(__S(610, __c38, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListRetrainingSchedulersResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DatasetName: S.String,
          IngestionJobId: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSensorStatisticsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Count: S.Number, Percentage: S.Number })).annotate({
        identifier: "CountPercent",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ Status: S.String, NumberOfCategory: S.optional(S.Number) }),
      ).annotate({ identifier: "CategoricalValues" });
    case 3:
      return S.suspend(() => S.Struct({ Status: S.String })).annotate({
        identifier: "MultipleOperatingModes",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Status: S.String,
          NumberOfLargeTimestampGaps: S.optional(S.Number),
          MaxTimestampGapInDays: S.optional(S.Number),
        }),
      ).annotate({ identifier: "LargeTimestampGaps" });
    case 5:
      return S.suspend(() =>
        S.Struct({ Status: S.String, Monotonicity: S.optional(S.String) }),
      ).annotate({ identifier: "MonotonicValues" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          ComponentName: S.optional(S.String),
          SensorName: S.optional(S.String),
          DataExists: S.optional(S.Boolean),
          MissingValues: S.optional(__S(625, __c39, 1)),
          InvalidValues: S.optional(__S(625, __c39, 1)),
          InvalidDateEntries: S.optional(__S(625, __c39, 1)),
          DuplicateTimestamps: S.optional(__S(625, __c39, 1)),
          CategoricalValues: S.optional(__S(626, __c39, 2)),
          MultipleOperatingModes: S.optional(__S(627, __c39, 3)),
          LargeTimestampGaps: S.optional(__S(628, __c39, 4)),
          MonotonicValues: S.optional(__S(629, __c39, 5)),
          DataStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DataEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "SensorStatisticsSummary" });
    case 7:
      return S.Array(__S(630, __c39, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          SensorStatisticsSummaries: S.optional(__S(631, __c39, 7)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListSensorStatisticsResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(913, __c57, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String,
          ResourcePolicy: S.String,
          PolicyRevisionId: S.optional(S.String),
          ClientToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutResourcePolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.optional(S.String), PolicyRevisionId: S.optional(S.String) }),
      ).annotate({ identifier: "PutResourcePolicyResponse" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DatasetName: S.String,
          IngestionInputConfiguration: __S(289, __c18, 1),
          RoleArn: S.String,
          ClientToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartDataIngestionJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ JobId: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "StartDataIngestionJobResponse" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InferenceSchedulerName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartInferenceSchedulerRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ModelArn: S.optional(S.String),
          ModelName: S.optional(S.String),
          InferenceSchedulerName: S.optional(S.String),
          InferenceSchedulerArn: S.optional(S.String),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "StartInferenceSchedulerResponse" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ModelName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartRetrainingSchedulerRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InferenceSchedulerName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopInferenceSchedulerRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ModelName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopRetrainingSchedulerRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, Tags: __S(913, __c57, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, TagKeys: __S(16, __c1, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ModelName: S.String, ModelVersion: S.Number }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateActiveModelVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ModelName: S.optional(S.String),
          ModelArn: S.optional(S.String),
          CurrentActiveVersion: S.optional(S.Number),
          PreviousActiveVersion: S.optional(S.Number),
          CurrentActiveVersionArn: S.optional(S.String),
          PreviousActiveVersionArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateActiveModelVersionResponse" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InferenceSchedulerName: S.String,
          DataDelayOffsetInMinutes: S.optional(S.Number),
          DataUploadFrequency: S.optional(S.String),
          DataInputConfiguration: S.optional(__S(977, __c61, 1)),
          DataOutputConfiguration: S.optional(__S(960, __c60, 0)),
          RoleArn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateInferenceSchedulerRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LabelGroupName: S.String, FaultCodes: S.optional(__S(16, __c1, 0)) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateLabelGroupRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ModelName: S.String,
          LabelsInputConfiguration: S.optional(__S(64, __c4, 0)),
          RoleArn: S.optional(S.String),
          ModelDiagnosticsOutputConfiguration: S.optional(__S(960, __c60, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateModelRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ModelName: S.String,
          RetrainingStartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RetrainingFrequency: S.optional(S.String),
          LookbackWindow: S.optional(S.String),
          PromoteMode: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateRetrainingSchedulerRequest" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DatasetName: S.String,
          DatasetSchema: S.optional(__S(896, __c56, 0)),
          ServerSideKmsKeyId: S.optional(S.String),
          ClientToken: S.String.pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(913, __c57, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDatasetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DatasetName: S.optional(S.String),
          DatasetArn: S.optional(S.String),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateDatasetResponse" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ InlineDataSchema: S.optional(S.String) })).annotate({
        identifier: "DatasetSchema",
      });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(912, __c57, 0));
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ModelName: S.String,
          InferenceSchedulerName: S.String,
          DataDelayOffsetInMinutes: S.optional(S.Number),
          DataUploadFrequency: S.String,
          DataInputConfiguration: __S(977, __c61, 1),
          DataOutputConfiguration: __S(960, __c60, 0),
          RoleArn: S.String,
          ServerSideKmsKeyId: S.optional(S.String),
          ClientToken: S.String.pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(913, __c57, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateInferenceSchedulerRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          InferenceSchedulerArn: S.optional(S.String),
          InferenceSchedulerName: S.optional(S.String),
          Status: S.optional(S.String),
          ModelQuality: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateInferenceSchedulerResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Bucket: S.String, Prefix: S.optional(S.String) })).annotate(
        { identifier: "InferenceS3InputConfiguration" },
      );
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ S3OutputConfiguration: __S(944, __c59, 0), KmsKeyId: S.optional(S.String) }),
      ).annotate({ identifier: "InferenceOutputConfiguration" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TimestampFormat: S.optional(S.String),
          ComponentTimestampDelimiter: S.optional(S.String),
        }),
      ).annotate({ identifier: "InferenceInputNameConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          S3InputConfiguration: S.optional(__S(944, __c59, 0)),
          InputTimeZoneOffset: S.optional(S.String),
          InferenceInputNameConfiguration: S.optional(__S(976, __c61, 0)),
        }),
      ).annotate({ identifier: "InferenceInputConfiguration" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LabelGroupName: S.String,
          StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Rating: S.String,
          FaultCode: S.optional(S.String),
          Notes: S.optional(S.String),
          Equipment: S.optional(S.String),
          ClientToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateLabelRequest" });
    case 1:
      return S.suspend(() => S.Struct({ LabelId: S.optional(S.String) })).annotate({
        identifier: "CreateLabelResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
