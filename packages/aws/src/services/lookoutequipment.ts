import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_0Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "LookoutEquipment",
  target: "AWSLookoutEquipmentFrontendService",
  version: "2020-12-15",
  sigv4: "lookoutequipment",
  protocol: awsJson1_0Protocol,
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://lookoutequipment.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://lookoutequipment.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
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
export type DataUploadFrequency =
  | "PT5M"
  | "PT10M"
  | "PT15M"
  | "PT30M"
  | "PT1H"
  | (string & {});
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
export type ModelVersionSourceType =
  | "TRAINING"
  | "RETRAINING"
  | "IMPORT"
  | (string & {});
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
export type InferenceExecutionStatus =
  | "IN_PROGRESS"
  | "SUCCESS"
  | "FAILED"
  | (string & {});
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
export type Monotonicity =
  | "DECREASING"
  | "INCREASING"
  | "STATIC"
  | (string & {});
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
  descriptor: {
    service: svc,
    input: {
      DatasetName: 0,
      DatasetSchema: i_DatasetSchema,
      ServerSideKmsKeyId: 0,
      ClientToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
    },
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
  operationName: "CreateDataset",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ModelName: 0,
      InferenceSchedulerName: 0,
      DataDelayOffsetInMinutes: 0,
      DataUploadFrequency: 0,
      DataInputConfiguration: i_InferenceInputConfiguration,
      DataOutputConfiguration: i_InferenceOutputConfiguration,
      RoleArn: 0,
      ServerSideKmsKeyId: 0,
      ClientToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
    },
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
  operationName: "CreateInferenceScheduler",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      LabelGroupName: 0,
      StartTime: 0,
      EndTime: 0,
      Rating: 0,
      FaultCode: 0,
      Notes: 0,
      Equipment: 0,
      ClientToken: D.m({ idempotency: true }),
    },
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
  operationName: "CreateLabel",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      LabelGroupName: 0,
      FaultCodes: 0,
      ClientToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
    },
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
  operationName: "CreateLabelGroup",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ModelName: 0,
      DatasetName: 0,
      DatasetSchema: i_DatasetSchema,
      LabelsInputConfiguration: i_LabelsInputConfiguration,
      ClientToken: D.m({ idempotency: true }),
      TrainingDataStartTime: 0,
      TrainingDataEndTime: 0,
      EvaluationDataStartTime: 0,
      EvaluationDataEndTime: 0,
      RoleArn: 0,
      DataPreProcessingConfiguration: { TargetSamplingRate: 0 },
      ServerSideKmsKeyId: 0,
      Tags: D.list(i_Tag),
      OffCondition: 0,
      ModelDiagnosticsOutputConfiguration:
        i_ModelDiagnosticsOutputConfiguration,
    },
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
  operationName: "CreateModel",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ModelName: 0,
      RetrainingStartDate: 0,
      RetrainingFrequency: 0,
      LookbackWindow: 0,
      PromoteMode: 0,
      ClientToken: D.m({ idempotency: true }),
    },
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
  operationName: "CreateRetrainingScheduler",
})) as any;

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
  descriptor: { service: svc, input: { DatasetName: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { InferenceSchedulerName: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { LabelGroupName: 0, LabelId: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { LabelGroupName: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { ModelName: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { ResourceArn: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { ModelName: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { JobId: 0 },
    output: { CreatedAt: D.ts, DataStartTime: D.ts, DataEndTime: D.ts },
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
  operationName: "DescribeDataIngestionJob",
})) as any;

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
  descriptor: {
    service: svc,
    input: { DatasetName: 0 },
    output: {
      CreatedAt: D.ts,
      LastUpdatedAt: D.ts,
      DataStartTime: D.ts,
      DataEndTime: D.ts,
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
  operationName: "DescribeDataset",
})) as any;

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
  descriptor: {
    service: svc,
    input: { InferenceSchedulerName: 0 },
    output: { CreatedAt: D.ts, UpdatedAt: D.ts },
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
  operationName: "DescribeInferenceScheduler",
})) as any;

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
  descriptor: {
    service: svc,
    input: { LabelGroupName: 0, LabelId: 0 },
    output: { StartTime: D.ts, EndTime: D.ts, CreatedAt: D.ts },
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
  operationName: "DescribeLabel",
})) as any;

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
  descriptor: {
    service: svc,
    input: { LabelGroupName: 0 },
    output: { CreatedAt: D.ts, UpdatedAt: D.ts },
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
  operationName: "DescribeLabelGroup",
})) as any;

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
  descriptor: {
    service: svc,
    input: { ModelName: 0 },
    output: {
      TrainingDataStartTime: D.ts,
      TrainingDataEndTime: D.ts,
      EvaluationDataStartTime: D.ts,
      EvaluationDataEndTime: D.ts,
      TrainingExecutionStartTime: D.ts,
      TrainingExecutionEndTime: D.ts,
      LastUpdatedTime: D.ts,
      CreatedAt: D.ts,
      ImportJobStartTime: D.ts,
      ImportJobEndTime: D.ts,
      ModelVersionActivatedAt: D.ts,
      PreviousModelVersionActivatedAt: D.ts,
      LatestScheduledRetrainingStartTime: D.ts,
      NextScheduledRetrainingStartDate: D.ts,
      AccumulatedInferenceDataStartTime: D.ts,
      AccumulatedInferenceDataEndTime: D.ts,
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
  operationName: "DescribeModel",
})) as any;

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
  descriptor: {
    service: svc,
    input: { ModelName: 0, ModelVersion: 0 },
    output: {
      TrainingDataStartTime: D.ts,
      TrainingDataEndTime: D.ts,
      EvaluationDataStartTime: D.ts,
      EvaluationDataEndTime: D.ts,
      TrainingExecutionStartTime: D.ts,
      TrainingExecutionEndTime: D.ts,
      LastUpdatedTime: D.ts,
      CreatedAt: D.ts,
      ImportJobStartTime: D.ts,
      ImportJobEndTime: D.ts,
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
  operationName: "DescribeModelVersion",
})) as any;

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
  descriptor: {
    service: svc,
    input: { ResourceArn: 0 },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts },
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
  operationName: "DescribeResourcePolicy",
})) as any;

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
  descriptor: {
    service: svc,
    input: { ModelName: 0 },
    output: { RetrainingStartDate: D.ts, CreatedAt: D.ts, UpdatedAt: D.ts },
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
  operationName: "DescribeRetrainingScheduler",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      SourceDatasetArn: 0,
      DatasetName: 0,
      ClientToken: D.m({ idempotency: true }),
      ServerSideKmsKeyId: 0,
      Tags: D.list(i_Tag),
    },
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
  operationName: "ImportDataset",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      SourceModelVersionArn: 0,
      ModelName: 0,
      DatasetName: 0,
      LabelsInputConfiguration: i_LabelsInputConfiguration,
      ClientToken: D.m({ idempotency: true }),
      RoleArn: 0,
      ServerSideKmsKeyId: 0,
      Tags: D.list(i_Tag),
      InferenceDataImportStrategy: 0,
    },
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
  operationName: "ImportModelVersion",
})) as any;

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
  descriptor: {
    service: svc,
    input: { DatasetName: 0, NextToken: 0, MaxResults: 0, Status: 0 },
  },
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
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0, DatasetNameBeginsWith: 0 },
    output: { DatasetSummaries: D.list({ CreatedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    input: {
      NextToken: 0,
      MaxResults: 0,
      InferenceSchedulerName: 0,
      IntervalStartTime: 0,
      IntervalEndTime: 0,
    },
    output: {
      InferenceEventSummaries: D.list({
        EventStartTime: D.ts,
        EventEndTime: D.ts,
      }),
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
  descriptor: {
    service: svc,
    input: {
      NextToken: 0,
      MaxResults: 0,
      InferenceSchedulerName: 0,
      DataStartTimeAfter: 0,
      DataEndTimeBefore: 0,
      Status: 0,
    },
    output: {
      InferenceExecutionSummaries: D.list({
        ScheduledStartTime: D.ts,
        DataStartTime: D.ts,
        DataEndTime: D.ts,
      }),
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
  descriptor: {
    service: svc,
    input: {
      NextToken: 0,
      MaxResults: 0,
      InferenceSchedulerNameBeginsWith: 0,
      ModelName: 0,
      Status: 0,
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
  descriptor: {
    service: svc,
    input: { LabelGroupNameBeginsWith: 0, NextToken: 0, MaxResults: 0 },
    output: {
      LabelGroupSummaries: D.list({ CreatedAt: D.ts, UpdatedAt: D.ts }),
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
  descriptor: {
    service: svc,
    input: {
      LabelGroupName: 0,
      IntervalStartTime: 0,
      IntervalEndTime: 0,
      FaultCode: 0,
      Equipment: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      LabelSummaries: D.list({
        StartTime: D.ts,
        EndTime: D.ts,
        CreatedAt: D.ts,
      }),
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
  descriptor: {
    service: svc,
    input: {
      NextToken: 0,
      MaxResults: 0,
      Status: 0,
      ModelNameBeginsWith: 0,
      DatasetNameBeginsWith: 0,
    },
    output: {
      ModelSummaries: D.list({
        CreatedAt: D.ts,
        LatestScheduledRetrainingStartTime: D.ts,
        NextScheduledRetrainingStartDate: D.ts,
      }),
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
  descriptor: {
    service: svc,
    input: {
      ModelName: 0,
      NextToken: 0,
      MaxResults: 0,
      Status: 0,
      SourceType: 0,
      CreatedAtEndTime: 0,
      CreatedAtStartTime: 0,
      MaxModelVersion: 0,
      MinModelVersion: 0,
    },
    output: { ModelVersionSummaries: D.list({ CreatedAt: D.ts }) },
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
  descriptor: {
    service: svc,
    input: { ModelNameBeginsWith: 0, Status: 0, NextToken: 0, MaxResults: 0 },
    output: {
      RetrainingSchedulerSummaries: D.list({ RetrainingStartDate: D.ts }),
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
  descriptor: {
    service: svc,
    input: { DatasetName: 0, IngestionJobId: 0, MaxResults: 0, NextToken: 0 },
    output: {
      SensorStatisticsSummaries: D.list({
        DataStartTime: D.ts,
        DataEndTime: D.ts,
      }),
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
  descriptor: { service: svc, input: { ResourceArn: 0 } },
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
  descriptor: {
    service: svc,
    input: {
      ResourceArn: 0,
      ResourcePolicy: 0,
      PolicyRevisionId: 0,
      ClientToken: D.m({ idempotency: true }),
    },
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
  operationName: "PutResourcePolicy",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DatasetName: 0,
      IngestionInputConfiguration: {
        S3InputConfiguration: { Bucket: 0, Prefix: 0, KeyPattern: 0 },
      },
      RoleArn: 0,
      ClientToken: D.m({ idempotency: true }),
    },
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
  operationName: "StartDataIngestionJob",
})) as any;

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
  descriptor: { service: svc, input: { InferenceSchedulerName: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { ModelName: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { InferenceSchedulerName: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { ModelName: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { ResourceArn: 0, Tags: D.list(i_Tag) } },
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
})) as any;

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
  descriptor: { service: svc, input: { ResourceArn: 0, TagKeys: 0 } },
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
  descriptor: { service: svc, input: { ModelName: 0, ModelVersion: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      InferenceSchedulerName: 0,
      DataDelayOffsetInMinutes: 0,
      DataUploadFrequency: 0,
      DataInputConfiguration: i_InferenceInputConfiguration,
      DataOutputConfiguration: i_InferenceOutputConfiguration,
      RoleArn: 0,
    },
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
  operationName: "UpdateInferenceScheduler",
})) as any;

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
  descriptor: { service: svc, input: { LabelGroupName: 0, FaultCodes: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ModelName: 0,
      LabelsInputConfiguration: i_LabelsInputConfiguration,
      RoleArn: 0,
      ModelDiagnosticsOutputConfiguration:
        i_ModelDiagnosticsOutputConfiguration,
    },
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
  operationName: "UpdateModel",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ModelName: 0,
      RetrainingStartDate: 0,
      RetrainingFrequency: 0,
      LookbackWindow: 0,
      PromoteMode: 0,
    },
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
  operationName: "UpdateRetrainingScheduler",
})) as any;

const i_DatasetSchema: D.LazyStruct = () => ({ InlineDataSchema: 0 });
const i_InferenceInputConfiguration: D.LazyStruct = () => ({
  S3InputConfiguration: { Bucket: 0, Prefix: 0 },
  InputTimeZoneOffset: 0,
  InferenceInputNameConfiguration: {
    TimestampFormat: 0,
    ComponentTimestampDelimiter: 0,
  },
});
const i_InferenceOutputConfiguration: D.LazyStruct = () => ({
  S3OutputConfiguration: { Bucket: 0, Prefix: 0 },
  KmsKeyId: 0,
});
const i_LabelsInputConfiguration: D.LazyStruct = () => ({
  S3InputConfiguration: { Bucket: 0, Prefix: 0 },
  LabelGroupName: 0,
});
const i_ModelDiagnosticsOutputConfiguration: D.LazyStruct = () => ({
  S3OutputConfiguration: { Bucket: 0, Prefix: 0 },
  KmsKeyId: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
