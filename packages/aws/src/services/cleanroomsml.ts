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
  sdkId: "CleanRoomsML",
  serviceShapeName: "AWSStarkControlService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "cleanrooms-ml" });
const ver = /*@__PURE__*/ T.ServiceVersion("2023-09-06");
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
              `https://cleanrooms-ml-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://cleanrooms-ml-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://cleanrooms-ml.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://cleanrooms-ml.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://cleanrooms-ml.{R}.{D}","properties":{},"headers":{}}');

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
export class InternalServiceException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceException>()(
    "InternalServiceException",
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
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      quotaName: /*@__PURE__*/ S.optional(S.String),
      quotaValue: /*@__PURE__*/ S.optional(S.Number),
    },
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
export type UUID = string;
export type TrainedModelArn = string;
export interface CancelTrainedModelRequest {
  membershipIdentifier: string;
  trainedModelArn: string;
  versionIdentifier?: string;
}
export interface CancelTrainedModelResponse {}
export type TrainedModelInferenceJobArn = string;
export interface CancelTrainedModelInferenceJobRequest {
  membershipIdentifier: string;
  trainedModelInferenceJobArn: string;
}
export interface CancelTrainedModelInferenceJobResponse {}
export type NameString = string;
export type TrainingDatasetArn = string;
export type KmsKeyArn = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type ResourceDescription = string;
export interface CreateAudienceModelRequest {
  trainingDataStartTime?: Date;
  trainingDataEndTime?: Date;
  name: string;
  trainingDatasetArn: string;
  kmsKeyArn?: string;
  tags?: { [key: string]: string | undefined };
  description?: string;
}
export type AudienceModelArn = string;
export interface CreateAudienceModelResponse {
  audienceModelArn: string;
}
export type S3Path = string;
export interface S3ConfigMap {
  s3Uri: string;
}
export interface AudienceDestination {
  s3Destination: S3ConfigMap;
}
export type IamRoleArn = string;
export interface ConfiguredAudienceModelOutputConfig {
  destination: AudienceDestination;
  roleArn: string;
}
export type SharedAudienceMetrics = "ALL" | "NONE" | (string & {});
export type MetricsList = SharedAudienceMetrics[];
export type MinMatchingSeedSize = number;
export type AudienceSizeType = "ABSOLUTE" | "PERCENTAGE" | (string & {});
export type AudienceSizeValue = number;
export type AudienceSizeBins = number[];
export interface AudienceSizeConfig {
  audienceSizeType: AudienceSizeType;
  audienceSizeBins: number[];
}
export type TagOnCreatePolicy = "FROM_PARENT_RESOURCE" | "NONE" | (string & {});
export interface CreateConfiguredAudienceModelRequest {
  name: string;
  audienceModelArn: string;
  outputConfig: ConfiguredAudienceModelOutputConfig;
  description?: string;
  sharedAudienceMetrics: SharedAudienceMetrics[];
  minMatchingSeedSize?: number;
  audienceSizeConfig?: AudienceSizeConfig;
  tags?: { [key: string]: string | undefined };
  childResourceTagOnCreatePolicy?: TagOnCreatePolicy;
}
export type ConfiguredAudienceModelArn = string;
export interface CreateConfiguredAudienceModelResponse {
  configuredAudienceModelArn: string;
}
export type AlgorithmImage = string;
export type ContainerEntrypointString = string;
export type ContainerEntrypoint = string[];
export type ContainerArgument = string;
export type ContainerArguments = string[];
export type MetricName = string;
export type MetricRegex = string;
export interface MetricDefinition {
  name: string;
  regex: string;
}
export type MetricDefinitionList = MetricDefinition[];
export interface ContainerConfig {
  imageUri: string;
  entrypoint?: string[];
  arguments?: string[];
  metricDefinitions?: MetricDefinition[];
}
export interface InferenceContainerConfig {
  imageUri: string;
}
export interface CreateConfiguredModelAlgorithmRequest {
  name: string;
  description?: string;
  roleArn: string;
  trainingContainerConfig?: ContainerConfig;
  inferenceContainerConfig?: InferenceContainerConfig;
  tags?: { [key: string]: string | undefined };
  kmsKeyArn?: string;
}
export type ConfiguredModelAlgorithmArn = string;
export interface CreateConfiguredModelAlgorithmResponse {
  configuredModelAlgorithmArn: string;
}
export type AccountIdList = string[];
export type LogType = "ALL" | "ERROR_SUMMARY" | (string & {});
export type EntityType =
  | "ALL_PERSONALLY_IDENTIFIABLE_INFORMATION"
  | "NUMBERS"
  | "CUSTOM"
  | (string & {});
export type EntityTypeList = EntityType[];
export type CustomDataIdentifier = string;
export type CustomDataIdentifierList = string[];
export interface CustomEntityConfig {
  customDataIdentifiers: string[];
}
export interface LogRedactionConfiguration {
  entitiesToRedact: EntityType[];
  customEntityConfig?: CustomEntityConfig;
}
export interface LogsConfigurationPolicy {
  allowedAccountIds: string[];
  filterPattern?: string;
  logType?: LogType;
  logRedactionConfiguration?: LogRedactionConfiguration;
}
export type LogsConfigurationPolicyList = LogsConfigurationPolicy[];
export type NoiseLevelType = "HIGH" | "MEDIUM" | "LOW" | "NONE" | (string & {});
export interface MetricsConfigurationPolicy {
  noiseLevel: NoiseLevelType;
}
export type TrainedModelArtifactMaxSizeUnitType = "GB" | (string & {});
export type TrainedModelArtifactMaxSizeValue = number;
export interface TrainedModelArtifactMaxSize {
  unit: TrainedModelArtifactMaxSizeUnitType;
  value: number;
}
export interface TrainedModelsConfigurationPolicy {
  containerLogs?: LogsConfigurationPolicy[];
  containerMetrics?: MetricsConfigurationPolicy;
  maxArtifactSize?: TrainedModelArtifactMaxSize;
}
export type TrainedModelExportsMaxSizeUnitType = "GB" | (string & {});
export type TrainedModelExportsMaxSizeValue = number;
export interface TrainedModelExportsMaxSize {
  unit: TrainedModelExportsMaxSizeUnitType;
  value: number;
}
export type TrainedModelExportFileType = "MODEL" | "OUTPUT" | (string & {});
export type TrainedModelExportFileTypeList = TrainedModelExportFileType[];
export interface TrainedModelExportsConfigurationPolicy {
  maxSize: TrainedModelExportsMaxSize;
  filesToExport: TrainedModelExportFileType[];
}
export type TrainedModelInferenceMaxOutputSizeUnitType = "GB" | (string & {});
export type TrainedModelInferenceMaxOutputSizeValue = number;
export interface TrainedModelInferenceMaxOutputSize {
  unit: TrainedModelInferenceMaxOutputSizeUnitType;
  value: number;
}
export interface TrainedModelInferenceJobsConfigurationPolicy {
  containerLogs?: LogsConfigurationPolicy[];
  maxOutputSize?: TrainedModelInferenceMaxOutputSize;
}
export interface PrivacyConfigurationPolicies {
  trainedModels?: TrainedModelsConfigurationPolicy;
  trainedModelExports?: TrainedModelExportsConfigurationPolicy;
  trainedModelInferenceJobs?: TrainedModelInferenceJobsConfigurationPolicy;
}
export interface PrivacyConfiguration {
  policies: PrivacyConfigurationPolicies;
}
export interface CreateConfiguredModelAlgorithmAssociationRequest {
  membershipIdentifier: string;
  configuredModelAlgorithmArn: string;
  name: string;
  description?: string;
  privacyConfiguration?: PrivacyConfiguration;
  tags?: { [key: string]: string | undefined };
}
export type ConfiguredModelAlgorithmAssociationArn = string;
export interface CreateConfiguredModelAlgorithmAssociationResponse {
  configuredModelAlgorithmAssociationArn: string;
}
export type ConfiguredModelAlgorithmAssociationArnList = string[];
export type AnalysisTemplateArn = string;
export type ParameterName = string;
export type ParameterValue = string;
export type ParameterMap = { [key: string]: string | undefined };
export interface ProtectedQuerySQLParameters {
  queryString?: string;
  analysisTemplateArn?: string;
  parameters?: { [key: string]: string | undefined };
}
export type WorkerComputeType = "CR.1X" | "CR.4X" | "CR.8X" | (string & {});
export type SparkPropertyKey = string;
export type SparkPropertyValue = string;
export type SparkProperties = { [key: string]: string | undefined };
export type WorkerComputeConfigurationProperties = { spark: { [key: string]: string | undefined } };
export interface WorkerComputeConfiguration {
  type?: WorkerComputeType;
  number?: number;
  properties?: WorkerComputeConfigurationProperties;
}
export type ComputeConfiguration = { worker: WorkerComputeConfiguration };
export type ResultFormat = "CSV" | "PARQUET" | (string & {});
export interface ProtectedQueryInputParameters {
  sqlParameters: ProtectedQuerySQLParameters;
  computeConfiguration?: ComputeConfiguration;
  resultFormat?: ResultFormat;
}
export type InputChannelDataSource = {
  protectedQueryInputParameters: ProtectedQueryInputParameters;
};
export interface InputChannel {
  dataSource: InputChannelDataSource;
  roleArn: string;
}
export type AccountId = string;
export interface PayerConfiguration {
  computePayerAccountId?: string;
  syntheticDataPayerAccountId?: string;
}
export interface CreateMLInputChannelRequest {
  membershipIdentifier: string;
  configuredModelAlgorithmAssociations: string[];
  inputChannel: InputChannel;
  name: string;
  retentionInDays: number;
  description?: string;
  kmsKeyArn?: string;
  tags?: { [key: string]: string | undefined };
  payerConfiguration?: PayerConfiguration;
}
export type MLInputChannelArn = string;
export interface CreateMLInputChannelResponse {
  mlInputChannelArn: string;
}
export type HyperParameters = { [key: string]: string | undefined };
export type Environment = { [key: string]: string | undefined };
export type InstanceType =
  | "ml.m4.xlarge"
  | "ml.m4.2xlarge"
  | "ml.m4.4xlarge"
  | "ml.m4.10xlarge"
  | "ml.m4.16xlarge"
  | "ml.g4dn.xlarge"
  | "ml.g4dn.2xlarge"
  | "ml.g4dn.4xlarge"
  | "ml.g4dn.8xlarge"
  | "ml.g4dn.12xlarge"
  | "ml.g4dn.16xlarge"
  | "ml.m5.large"
  | "ml.m5.xlarge"
  | "ml.m5.2xlarge"
  | "ml.m5.4xlarge"
  | "ml.m5.12xlarge"
  | "ml.m5.24xlarge"
  | "ml.c4.xlarge"
  | "ml.c4.2xlarge"
  | "ml.c4.4xlarge"
  | "ml.c4.8xlarge"
  | "ml.p2.xlarge"
  | "ml.p2.8xlarge"
  | "ml.p2.16xlarge"
  | "ml.p4d.24xlarge"
  | "ml.p4de.24xlarge"
  | "ml.p5.48xlarge"
  | "ml.c5.xlarge"
  | "ml.c5.2xlarge"
  | "ml.c5.4xlarge"
  | "ml.c5.9xlarge"
  | "ml.c5.18xlarge"
  | "ml.c5n.xlarge"
  | "ml.c5n.2xlarge"
  | "ml.c5n.4xlarge"
  | "ml.c5n.9xlarge"
  | "ml.c5n.18xlarge"
  | "ml.g5.xlarge"
  | "ml.g5.2xlarge"
  | "ml.g5.4xlarge"
  | "ml.g5.8xlarge"
  | "ml.g5.16xlarge"
  | "ml.g5.12xlarge"
  | "ml.g5.24xlarge"
  | "ml.g5.48xlarge"
  | "ml.trn1.2xlarge"
  | "ml.trn1.32xlarge"
  | "ml.trn1n.32xlarge"
  | "ml.m6i.large"
  | "ml.m6i.xlarge"
  | "ml.m6i.2xlarge"
  | "ml.m6i.4xlarge"
  | "ml.m6i.8xlarge"
  | "ml.m6i.12xlarge"
  | "ml.m6i.16xlarge"
  | "ml.m6i.24xlarge"
  | "ml.m6i.32xlarge"
  | "ml.c6i.xlarge"
  | "ml.c6i.2xlarge"
  | "ml.c6i.8xlarge"
  | "ml.c6i.4xlarge"
  | "ml.c6i.12xlarge"
  | "ml.c6i.16xlarge"
  | "ml.c6i.24xlarge"
  | "ml.c6i.32xlarge"
  | "ml.r5d.large"
  | "ml.r5d.xlarge"
  | "ml.r5d.2xlarge"
  | "ml.r5d.4xlarge"
  | "ml.r5d.8xlarge"
  | "ml.r5d.12xlarge"
  | "ml.r5d.16xlarge"
  | "ml.r5d.24xlarge"
  | "ml.t3.medium"
  | "ml.t3.large"
  | "ml.t3.xlarge"
  | "ml.t3.2xlarge"
  | "ml.r5.large"
  | "ml.r5.xlarge"
  | "ml.r5.2xlarge"
  | "ml.r5.4xlarge"
  | "ml.r5.8xlarge"
  | "ml.r5.12xlarge"
  | "ml.r5.16xlarge"
  | "ml.r5.24xlarge"
  | "ml.c7i.large"
  | "ml.c7i.xlarge"
  | "ml.c7i.2xlarge"
  | "ml.c7i.4xlarge"
  | "ml.c7i.8xlarge"
  | "ml.c7i.12xlarge"
  | "ml.c7i.16xlarge"
  | "ml.c7i.24xlarge"
  | "ml.c7i.48xlarge"
  | "ml.m7i.large"
  | "ml.m7i.xlarge"
  | "ml.m7i.2xlarge"
  | "ml.m7i.4xlarge"
  | "ml.m7i.8xlarge"
  | "ml.m7i.12xlarge"
  | "ml.m7i.16xlarge"
  | "ml.m7i.24xlarge"
  | "ml.m7i.48xlarge"
  | "ml.r7i.large"
  | "ml.r7i.xlarge"
  | "ml.r7i.2xlarge"
  | "ml.r7i.4xlarge"
  | "ml.r7i.8xlarge"
  | "ml.r7i.12xlarge"
  | "ml.r7i.16xlarge"
  | "ml.r7i.24xlarge"
  | "ml.r7i.48xlarge"
  | "ml.g6.xlarge"
  | "ml.g6.2xlarge"
  | "ml.g6.4xlarge"
  | "ml.g6.8xlarge"
  | "ml.g6.12xlarge"
  | "ml.g6.16xlarge"
  | "ml.g6.24xlarge"
  | "ml.g6.48xlarge"
  | "ml.g6e.xlarge"
  | "ml.g6e.2xlarge"
  | "ml.g6e.4xlarge"
  | "ml.g6e.8xlarge"
  | "ml.g6e.12xlarge"
  | "ml.g6e.16xlarge"
  | "ml.g6e.24xlarge"
  | "ml.g6e.48xlarge"
  | "ml.p5en.48xlarge"
  | "ml.p3.2xlarge"
  | "ml.p3.8xlarge"
  | "ml.p3.16xlarge"
  | "ml.p3dn.24xlarge"
  | (string & {});
export interface ResourceConfig {
  instanceCount?: number;
  instanceType: InstanceType;
  volumeSizeInGB: number;
}
export interface StoppingCondition {
  maxRuntimeInSeconds?: number;
}
export type ModelTrainingDataChannelName = string;
export interface IncrementalTrainingDataChannel {
  trainedModelArn: string;
  versionIdentifier?: string;
  channelName: string;
}
export type IncrementalTrainingDataChannels = IncrementalTrainingDataChannel[];
export type S3DataDistributionType = "FullyReplicated" | "ShardedByS3Key" | (string & {});
export interface ModelTrainingDataChannel {
  mlInputChannelArn: string;
  channelName: string;
  s3DataDistributionType?: S3DataDistributionType;
}
export type ModelTrainingDataChannels = ModelTrainingDataChannel[];
export type TrainingInputMode = "File" | "FastFile" | "Pipe" | (string & {});
export interface CreateTrainedModelRequest {
  membershipIdentifier: string;
  name: string;
  configuredModelAlgorithmAssociationArn: string;
  hyperparameters?: { [key: string]: string | undefined };
  environment?: { [key: string]: string | undefined };
  resourceConfig: ResourceConfig;
  stoppingCondition?: StoppingCondition;
  incrementalTrainingDataChannels?: IncrementalTrainingDataChannel[];
  dataChannels: ModelTrainingDataChannel[];
  trainingInputMode?: TrainingInputMode;
  description?: string;
  kmsKeyArn?: string;
  tags?: { [key: string]: string | undefined };
  mlModelTrainingPayerAccountId?: string;
}
export interface CreateTrainedModelResponse {
  trainedModelArn: string;
  versionIdentifier?: string;
}
export type DatasetType = "INTERACTIONS" | (string & {});
export type ColumnName = string;
export type ColumnType =
  | "USER_ID"
  | "ITEM_ID"
  | "TIMESTAMP"
  | "CATEGORICAL_FEATURE"
  | "NUMERICAL_FEATURE"
  | (string & {});
export type ColumnTypeList = ColumnType[];
export interface ColumnSchema {
  columnName: string;
  columnTypes: ColumnType[];
}
export type DatasetSchemaList = ColumnSchema[];
export type GlueTableName = string;
export type GlueDatabaseName = string;
export interface GlueDataSource {
  tableName: string;
  databaseName: string;
  catalogId?: string;
}
export interface DataSource {
  glueDataSource: GlueDataSource;
}
export interface DatasetInputConfig {
  schema: ColumnSchema[];
  dataSource: DataSource;
}
export interface Dataset {
  type: DatasetType;
  inputConfig: DatasetInputConfig;
}
export type DatasetList = Dataset[];
export interface CreateTrainingDatasetRequest {
  name: string;
  roleArn: string;
  trainingData: Dataset[];
  tags?: { [key: string]: string | undefined };
  description?: string;
}
export interface CreateTrainingDatasetResponse {
  trainingDatasetArn: string;
}
export type AudienceGenerationJobArn = string;
export interface DeleteAudienceGenerationJobRequest {
  audienceGenerationJobArn: string;
}
export interface DeleteAudienceGenerationJobResponse {}
export interface DeleteAudienceModelRequest {
  audienceModelArn: string;
}
export interface DeleteAudienceModelResponse {}
export interface DeleteConfiguredAudienceModelRequest {
  configuredAudienceModelArn: string;
}
export interface DeleteConfiguredAudienceModelResponse {}
export interface DeleteConfiguredAudienceModelPolicyRequest {
  configuredAudienceModelArn: string;
}
export interface DeleteConfiguredAudienceModelPolicyResponse {}
export interface DeleteConfiguredModelAlgorithmRequest {
  configuredModelAlgorithmArn: string;
}
export interface DeleteConfiguredModelAlgorithmResponse {}
export interface DeleteConfiguredModelAlgorithmAssociationRequest {
  configuredModelAlgorithmAssociationArn: string;
  membershipIdentifier: string;
}
export interface DeleteConfiguredModelAlgorithmAssociationResponse {}
export interface DeleteMLConfigurationRequest {
  membershipIdentifier: string;
}
export interface DeleteMLConfigurationResponse {}
export interface DeleteMLInputChannelDataRequest {
  mlInputChannelArn: string;
  membershipIdentifier: string;
}
export interface DeleteMLInputChannelDataResponse {}
export interface DeleteTrainedModelOutputRequest {
  trainedModelArn: string;
  membershipIdentifier: string;
  versionIdentifier?: string;
}
export interface DeleteTrainedModelOutputResponse {}
export interface DeleteTrainingDatasetRequest {
  trainingDatasetArn: string;
}
export interface DeleteTrainingDatasetResponse {}
export interface GetAudienceGenerationJobRequest {
  audienceGenerationJobArn: string;
}
export type AudienceGenerationJobStatus =
  | "CREATE_PENDING"
  | "CREATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "ACTIVE"
  | "DELETE_PENDING"
  | "DELETE_IN_PROGRESS"
  | "DELETE_FAILED"
  | (string & {});
export interface StatusDetails {
  statusCode?: string;
  message?: string;
}
export interface AudienceGenerationJobDataSource {
  dataSource?: S3ConfigMap;
  roleArn: string;
  sqlParameters?: ProtectedQuerySQLParameters;
  sqlComputeConfiguration?: ComputeConfiguration;
}
export interface AudienceSize {
  type: AudienceSizeType;
  value: number;
}
export interface RelevanceMetric {
  audienceSize: AudienceSize;
  score?: number;
}
export type RelevanceMetrics = RelevanceMetric[];
export interface AudienceQualityMetrics {
  relevanceMetrics: RelevanceMetric[];
  recallMetric?: number;
}
export interface GetAudienceGenerationJobResponse {
  createTime: Date;
  updateTime: Date;
  audienceGenerationJobArn: string;
  name: string;
  description?: string;
  status: AudienceGenerationJobStatus;
  statusDetails?: StatusDetails;
  configuredAudienceModelArn: string;
  seedAudience?: AudienceGenerationJobDataSource;
  includeSeedInOutput?: boolean;
  collaborationId?: string;
  metrics?: AudienceQualityMetrics;
  startedBy?: string;
  tags?: { [key: string]: string | undefined };
  protectedQueryIdentifier?: string;
}
export interface GetAudienceModelRequest {
  audienceModelArn: string;
}
export type AudienceModelStatus =
  | "CREATE_PENDING"
  | "CREATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "ACTIVE"
  | "DELETE_PENDING"
  | "DELETE_IN_PROGRESS"
  | "DELETE_FAILED"
  | (string & {});
export interface GetAudienceModelResponse {
  createTime: Date;
  updateTime: Date;
  trainingDataStartTime?: Date;
  trainingDataEndTime?: Date;
  audienceModelArn: string;
  name: string;
  trainingDatasetArn: string;
  status: AudienceModelStatus;
  statusDetails?: StatusDetails;
  kmsKeyArn?: string;
  tags?: { [key: string]: string | undefined };
  description?: string;
}
export interface GetCollaborationConfiguredModelAlgorithmAssociationRequest {
  configuredModelAlgorithmAssociationArn: string;
  collaborationIdentifier: string;
}
export interface GetCollaborationConfiguredModelAlgorithmAssociationResponse {
  createTime: Date;
  updateTime: Date;
  configuredModelAlgorithmAssociationArn: string;
  membershipIdentifier: string;
  collaborationIdentifier: string;
  configuredModelAlgorithmArn: string;
  name: string;
  description?: string;
  creatorAccountId: string;
  privacyConfiguration?: PrivacyConfiguration;
}
export interface GetCollaborationMLInputChannelRequest {
  mlInputChannelArn: string;
  collaborationIdentifier: string;
}
export type MLInputChannelStatus =
  | "CREATE_PENDING"
  | "CREATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "ACTIVE"
  | "DELETE_PENDING"
  | "DELETE_IN_PROGRESS"
  | "DELETE_FAILED"
  | "INACTIVE"
  | (string & {});
export type BudgetedResourceArn = string;
export type Budget = number;
export type AccessBudgetType =
  | "CALENDAR_DAY"
  | "CALENDAR_MONTH"
  | "CALENDAR_WEEK"
  | "LIFETIME"
  | (string & {});
export type AutoRefreshMode = "ENABLED" | "DISABLED" | (string & {});
export interface AccessBudgetDetails {
  startTime: Date;
  endTime?: Date;
  remainingBudget: number;
  budget: number;
  budgetType: AccessBudgetType;
  autoRefresh?: AutoRefreshMode;
}
export type AccessBudgetDetailsList = AccessBudgetDetails[];
export interface AccessBudget {
  resourceArn: string;
  details: AccessBudgetDetails[];
  aggregateRemainingBudget: number;
}
export type AccessBudgets = AccessBudget[];
export type PrivacyBudgets = { accessBudgets: AccessBudget[] };
export type SyntheticDataColumnName = string;
export type SyntheticDataColumnType = "CATEGORICAL" | "NUMERICAL" | (string & {});
export interface SyntheticDataColumnProperties {
  columnName: string;
  columnType: SyntheticDataColumnType;
  isPredictiveValue: boolean;
}
export type ColumnMappingList = SyntheticDataColumnProperties[];
export interface ColumnClassificationDetails {
  columnMapping: SyntheticDataColumnProperties[];
}
export interface MLSyntheticDataParameters {
  epsilon: number;
  maxMembershipInferenceAttackScore: number;
  columnClassification?: ColumnClassificationDetails;
}
export type MembershipInferenceAttackVersion = "DISTANCE_TO_CLOSEST_RECORD_V1" | (string & {});
export interface MembershipInferenceAttackScore {
  attackVersion: MembershipInferenceAttackVersion;
  score: number;
}
export type MembershipInferenceAttackScoreList = MembershipInferenceAttackScore[];
export interface DataPrivacyScores {
  membershipInferenceAttackScores: MembershipInferenceAttackScore[];
}
export interface SyntheticDataEvaluationScores {
  dataPrivacyScores: DataPrivacyScores;
}
export interface SyntheticDataConfiguration {
  syntheticDataParameters: MLSyntheticDataParameters;
  syntheticDataEvaluationScores?: SyntheticDataEvaluationScores;
}
export interface GetCollaborationMLInputChannelResponse {
  membershipIdentifier: string;
  collaborationIdentifier: string;
  mlInputChannelArn: string;
  name: string;
  configuredModelAlgorithmAssociations: string[];
  status: MLInputChannelStatus;
  statusDetails?: StatusDetails;
  retentionInDays: number;
  numberOfRecords?: number;
  privacyBudgets?: PrivacyBudgets;
  description?: string;
  syntheticDataConfiguration?: SyntheticDataConfiguration;
  payerConfiguration?: PayerConfiguration;
  createTime: Date;
  updateTime: Date;
  creatorAccountId: string;
}
export interface GetCollaborationTrainedModelRequest {
  trainedModelArn: string;
  collaborationIdentifier: string;
  versionIdentifier?: string;
}
export interface IncrementalTrainingDataChannelOutput {
  channelName: string;
  versionIdentifier?: string;
  modelName: string;
}
export type IncrementalTrainingDataChannelsOutput = IncrementalTrainingDataChannelOutput[];
export type TrainedModelStatus =
  | "CREATE_PENDING"
  | "CREATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "ACTIVE"
  | "DELETE_PENDING"
  | "DELETE_IN_PROGRESS"
  | "DELETE_FAILED"
  | "INACTIVE"
  | "CANCEL_PENDING"
  | "CANCEL_IN_PROGRESS"
  | "CANCEL_FAILED"
  | (string & {});
export type MetricsStatus = "PUBLISH_SUCCEEDED" | "PUBLISH_FAILED" | (string & {});
export type LogsStatus = "PUBLISH_SUCCEEDED" | "PUBLISH_FAILED" | (string & {});
export interface GetCollaborationTrainedModelResponse {
  membershipIdentifier: string;
  collaborationIdentifier: string;
  trainedModelArn: string;
  versionIdentifier?: string;
  incrementalTrainingDataChannels?: IncrementalTrainingDataChannelOutput[];
  name: string;
  description?: string;
  status: TrainedModelStatus;
  statusDetails?: StatusDetails;
  configuredModelAlgorithmAssociationArn: string;
  resourceConfig?: ResourceConfig;
  trainingInputMode?: TrainingInputMode;
  stoppingCondition?: StoppingCondition;
  metricsStatus?: MetricsStatus;
  metricsStatusDetails?: string;
  logsStatus?: LogsStatus;
  logsStatusDetails?: string;
  trainingContainerImageDigest?: string;
  mlModelTrainingPayerAccountId?: string;
  createTime: Date;
  updateTime: Date;
  creatorAccountId: string;
}
export interface GetConfiguredAudienceModelRequest {
  configuredAudienceModelArn: string;
}
export type ConfiguredAudienceModelStatus = "ACTIVE" | (string & {});
export interface GetConfiguredAudienceModelResponse {
  createTime: Date;
  updateTime: Date;
  configuredAudienceModelArn: string;
  name: string;
  audienceModelArn: string;
  outputConfig: ConfiguredAudienceModelOutputConfig;
  description?: string;
  status: ConfiguredAudienceModelStatus;
  sharedAudienceMetrics: SharedAudienceMetrics[];
  minMatchingSeedSize?: number;
  audienceSizeConfig?: AudienceSizeConfig;
  tags?: { [key: string]: string | undefined };
  childResourceTagOnCreatePolicy?: TagOnCreatePolicy;
}
export interface GetConfiguredAudienceModelPolicyRequest {
  configuredAudienceModelArn: string;
}
export type ResourcePolicy = string;
export type Hash = string;
export interface GetConfiguredAudienceModelPolicyResponse {
  configuredAudienceModelArn: string;
  configuredAudienceModelPolicy: string;
  policyHash: string;
}
export interface GetConfiguredModelAlgorithmRequest {
  configuredModelAlgorithmArn: string;
}
export interface GetConfiguredModelAlgorithmResponse {
  createTime: Date;
  updateTime: Date;
  configuredModelAlgorithmArn: string;
  name: string;
  trainingContainerConfig?: ContainerConfig;
  inferenceContainerConfig?: InferenceContainerConfig;
  roleArn: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  kmsKeyArn?: string;
}
export interface GetConfiguredModelAlgorithmAssociationRequest {
  configuredModelAlgorithmAssociationArn: string;
  membershipIdentifier: string;
}
export interface GetConfiguredModelAlgorithmAssociationResponse {
  createTime: Date;
  updateTime: Date;
  configuredModelAlgorithmAssociationArn: string;
  membershipIdentifier: string;
  collaborationIdentifier: string;
  configuredModelAlgorithmArn: string;
  name: string;
  privacyConfiguration?: PrivacyConfiguration;
  description?: string;
  tags?: { [key: string]: string | undefined };
}
export interface GetMLConfigurationRequest {
  membershipIdentifier: string;
}
export interface Destination {
  s3Destination: S3ConfigMap;
}
export interface MLOutputConfiguration {
  destination?: Destination;
  roleArn: string;
}
export interface GetMLConfigurationResponse {
  membershipIdentifier: string;
  defaultOutputLocation: MLOutputConfiguration;
  createTime: Date;
  updateTime: Date;
}
export interface GetMLInputChannelRequest {
  mlInputChannelArn: string;
  membershipIdentifier: string;
}
export interface GetMLInputChannelResponse {
  membershipIdentifier: string;
  collaborationIdentifier: string;
  mlInputChannelArn: string;
  name: string;
  configuredModelAlgorithmAssociations: string[];
  status: MLInputChannelStatus;
  statusDetails?: StatusDetails;
  retentionInDays: number;
  numberOfRecords?: number;
  privacyBudgets?: PrivacyBudgets;
  description?: string;
  syntheticDataConfiguration?: SyntheticDataConfiguration;
  payerConfiguration?: PayerConfiguration;
  createTime: Date;
  updateTime: Date;
  inputChannel: InputChannel;
  protectedQueryIdentifier?: string;
  numberOfFiles?: number;
  sizeInGb?: number;
  kmsKeyArn?: string;
  tags?: { [key: string]: string | undefined };
}
export interface GetTrainedModelRequest {
  trainedModelArn: string;
  membershipIdentifier: string;
  versionIdentifier?: string;
}
export interface GetTrainedModelResponse {
  membershipIdentifier: string;
  collaborationIdentifier: string;
  trainedModelArn: string;
  versionIdentifier?: string;
  incrementalTrainingDataChannels?: IncrementalTrainingDataChannelOutput[];
  name: string;
  description?: string;
  status: TrainedModelStatus;
  statusDetails?: StatusDetails;
  configuredModelAlgorithmAssociationArn: string;
  resourceConfig?: ResourceConfig;
  trainingInputMode?: TrainingInputMode;
  stoppingCondition?: StoppingCondition;
  metricsStatus?: MetricsStatus;
  metricsStatusDetails?: string;
  logsStatus?: LogsStatus;
  logsStatusDetails?: string;
  trainingContainerImageDigest?: string;
  mlModelTrainingPayerAccountId?: string;
  createTime: Date;
  updateTime: Date;
  hyperparameters?: { [key: string]: string | undefined };
  environment?: { [key: string]: string | undefined };
  kmsKeyArn?: string;
  tags?: { [key: string]: string | undefined };
  dataChannels: ModelTrainingDataChannel[];
}
export interface GetTrainedModelInferenceJobRequest {
  membershipIdentifier: string;
  trainedModelInferenceJobArn: string;
}
export type TrainedModelInferenceJobStatus =
  | "CREATE_PENDING"
  | "CREATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "ACTIVE"
  | "CANCEL_PENDING"
  | "CANCEL_IN_PROGRESS"
  | "CANCEL_FAILED"
  | "INACTIVE"
  | (string & {});
export type InferenceInstanceType =
  | "ml.r7i.48xlarge"
  | "ml.r6i.16xlarge"
  | "ml.m6i.xlarge"
  | "ml.m5.4xlarge"
  | "ml.p2.xlarge"
  | "ml.m4.16xlarge"
  | "ml.r7i.16xlarge"
  | "ml.m7i.xlarge"
  | "ml.m6i.12xlarge"
  | "ml.r7i.8xlarge"
  | "ml.r7i.large"
  | "ml.m7i.12xlarge"
  | "ml.m6i.24xlarge"
  | "ml.m7i.24xlarge"
  | "ml.r6i.8xlarge"
  | "ml.r6i.large"
  | "ml.g5.2xlarge"
  | "ml.m5.large"
  | "ml.m7i.48xlarge"
  | "ml.m6i.16xlarge"
  | "ml.p2.16xlarge"
  | "ml.g5.4xlarge"
  | "ml.m7i.16xlarge"
  | "ml.c4.2xlarge"
  | "ml.c5.2xlarge"
  | "ml.c6i.32xlarge"
  | "ml.c4.4xlarge"
  | "ml.g5.8xlarge"
  | "ml.c6i.xlarge"
  | "ml.c5.4xlarge"
  | "ml.g4dn.xlarge"
  | "ml.c7i.xlarge"
  | "ml.c6i.12xlarge"
  | "ml.g4dn.12xlarge"
  | "ml.c7i.12xlarge"
  | "ml.c6i.24xlarge"
  | "ml.g4dn.2xlarge"
  | "ml.c7i.24xlarge"
  | "ml.c7i.2xlarge"
  | "ml.c4.8xlarge"
  | "ml.c6i.2xlarge"
  | "ml.g4dn.4xlarge"
  | "ml.c7i.48xlarge"
  | "ml.c7i.4xlarge"
  | "ml.c6i.16xlarge"
  | "ml.c5.9xlarge"
  | "ml.g4dn.16xlarge"
  | "ml.c7i.16xlarge"
  | "ml.c6i.4xlarge"
  | "ml.c5.xlarge"
  | "ml.c4.xlarge"
  | "ml.g4dn.8xlarge"
  | "ml.c7i.8xlarge"
  | "ml.c7i.large"
  | "ml.g5.xlarge"
  | "ml.c6i.8xlarge"
  | "ml.c6i.large"
  | "ml.g5.12xlarge"
  | "ml.g5.24xlarge"
  | "ml.m7i.2xlarge"
  | "ml.c5.18xlarge"
  | "ml.g5.48xlarge"
  | "ml.m6i.2xlarge"
  | "ml.g5.16xlarge"
  | "ml.m7i.4xlarge"
  | "ml.r6i.32xlarge"
  | "ml.m6i.4xlarge"
  | "ml.m5.xlarge"
  | "ml.m4.10xlarge"
  | "ml.r6i.xlarge"
  | "ml.m5.12xlarge"
  | "ml.m4.xlarge"
  | "ml.r7i.2xlarge"
  | "ml.r7i.xlarge"
  | "ml.r6i.12xlarge"
  | "ml.m5.24xlarge"
  | "ml.r7i.12xlarge"
  | "ml.m7i.8xlarge"
  | "ml.m7i.large"
  | "ml.r6i.24xlarge"
  | "ml.r6i.2xlarge"
  | "ml.m4.2xlarge"
  | "ml.r7i.24xlarge"
  | "ml.r7i.4xlarge"
  | "ml.m6i.8xlarge"
  | "ml.m6i.large"
  | "ml.m5.2xlarge"
  | "ml.p2.8xlarge"
  | "ml.r6i.4xlarge"
  | "ml.m6i.32xlarge"
  | "ml.m4.4xlarge"
  | "ml.p3.16xlarge"
  | "ml.p3.2xlarge"
  | "ml.p3.8xlarge"
  | (string & {});
export interface InferenceResourceConfig {
  instanceType: InferenceInstanceType;
  instanceCount?: number;
}
export interface InferenceReceiverMember {
  accountId: string;
}
export type InferenceReceiverMembers = InferenceReceiverMember[];
export interface InferenceOutputConfiguration {
  accept?: string;
  members: InferenceReceiverMember[];
}
export interface ModelInferenceDataSource {
  mlInputChannelArn: string;
}
export interface InferenceContainerExecutionParameters {
  maxPayloadInMB?: number;
}
export type InferenceEnvironmentMap = { [key: string]: string | undefined };
export interface GetTrainedModelInferenceJobResponse {
  createTime: Date;
  updateTime: Date;
  trainedModelInferenceJobArn: string;
  configuredModelAlgorithmAssociationArn?: string;
  name: string;
  status: TrainedModelInferenceJobStatus;
  trainedModelArn: string;
  trainedModelVersionIdentifier?: string;
  resourceConfig: InferenceResourceConfig;
  outputConfiguration: InferenceOutputConfiguration;
  membershipIdentifier: string;
  dataSource: ModelInferenceDataSource;
  containerExecutionParameters?: InferenceContainerExecutionParameters;
  statusDetails?: StatusDetails;
  description?: string;
  inferenceContainerImageDigest?: string;
  environment?: { [key: string]: string | undefined };
  kmsKeyArn?: string;
  metricsStatus?: MetricsStatus;
  metricsStatusDetails?: string;
  logsStatus?: LogsStatus;
  logsStatusDetails?: string;
  tags?: { [key: string]: string | undefined };
  mlModelInferencePayerAccountId?: string;
}
export interface GetTrainingDatasetRequest {
  trainingDatasetArn: string;
}
export type TrainingDatasetStatus = "ACTIVE" | (string & {});
export interface GetTrainingDatasetResponse {
  createTime: Date;
  updateTime: Date;
  trainingDatasetArn: string;
  name: string;
  trainingData: Dataset[];
  status: TrainingDatasetStatus;
  roleArn: string;
  tags?: { [key: string]: string | undefined };
  description?: string;
}
export type NextToken = string;
export type MaxResults = number;
export interface ListAudienceExportJobsRequest {
  nextToken?: string;
  maxResults?: number;
  audienceGenerationJobArn?: string;
}
export type AudienceExportJobStatus =
  | "CREATE_PENDING"
  | "CREATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "ACTIVE"
  | (string & {});
export interface AudienceExportJobSummary {
  createTime: Date;
  updateTime: Date;
  name: string;
  audienceGenerationJobArn: string;
  audienceSize: AudienceSize;
  description?: string;
  status: AudienceExportJobStatus;
  statusDetails?: StatusDetails;
  outputLocation?: string;
}
export type AudienceExportJobList = AudienceExportJobSummary[];
export interface ListAudienceExportJobsResponse {
  nextToken?: string;
  audienceExportJobs: AudienceExportJobSummary[];
}
export interface ListAudienceGenerationJobsRequest {
  nextToken?: string;
  maxResults?: number;
  configuredAudienceModelArn?: string;
  collaborationId?: string;
}
export interface AudienceGenerationJobSummary {
  createTime: Date;
  updateTime: Date;
  audienceGenerationJobArn: string;
  name: string;
  description?: string;
  status: AudienceGenerationJobStatus;
  configuredAudienceModelArn: string;
  collaborationId?: string;
  startedBy?: string;
}
export type AudienceGenerationJobList = AudienceGenerationJobSummary[];
export interface ListAudienceGenerationJobsResponse {
  nextToken?: string;
  audienceGenerationJobs: AudienceGenerationJobSummary[];
}
export interface ListAudienceModelsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface AudienceModelSummary {
  createTime: Date;
  updateTime: Date;
  audienceModelArn: string;
  name: string;
  trainingDatasetArn: string;
  status: AudienceModelStatus;
  description?: string;
}
export type AudienceModelList = AudienceModelSummary[];
export interface ListAudienceModelsResponse {
  nextToken?: string;
  audienceModels: AudienceModelSummary[];
}
export interface ListCollaborationConfiguredModelAlgorithmAssociationsRequest {
  nextToken?: string;
  maxResults?: number;
  collaborationIdentifier: string;
}
export interface CollaborationConfiguredModelAlgorithmAssociationSummary {
  createTime: Date;
  updateTime: Date;
  configuredModelAlgorithmAssociationArn: string;
  name: string;
  description?: string;
  membershipIdentifier: string;
  collaborationIdentifier: string;
  configuredModelAlgorithmArn: string;
  creatorAccountId: string;
}
export type CollaborationConfiguredModelAlgorithmAssociationList =
  CollaborationConfiguredModelAlgorithmAssociationSummary[];
export interface ListCollaborationConfiguredModelAlgorithmAssociationsResponse {
  nextToken?: string;
  collaborationConfiguredModelAlgorithmAssociations: CollaborationConfiguredModelAlgorithmAssociationSummary[];
}
export interface ListCollaborationMLInputChannelsRequest {
  nextToken?: string;
  maxResults?: number;
  collaborationIdentifier: string;
}
export interface CollaborationMLInputChannelSummary {
  createTime: Date;
  updateTime: Date;
  membershipIdentifier: string;
  collaborationIdentifier: string;
  name: string;
  configuredModelAlgorithmAssociations: string[];
  mlInputChannelArn: string;
  status: MLInputChannelStatus;
  creatorAccountId: string;
  description?: string;
  payerConfiguration?: PayerConfiguration;
}
export type CollaborationMLInputChannelsList = CollaborationMLInputChannelSummary[];
export interface ListCollaborationMLInputChannelsResponse {
  nextToken?: string;
  collaborationMLInputChannelsList: CollaborationMLInputChannelSummary[];
}
export interface ListCollaborationTrainedModelExportJobsRequest {
  nextToken?: string;
  maxResults?: number;
  collaborationIdentifier: string;
  trainedModelArn: string;
  trainedModelVersionIdentifier?: string;
}
export interface TrainedModelExportReceiverMember {
  accountId: string;
}
export type TrainedModelExportReceiverMembers = TrainedModelExportReceiverMember[];
export interface TrainedModelExportOutputConfiguration {
  members: TrainedModelExportReceiverMember[];
}
export type TrainedModelExportJobStatus =
  | "CREATE_PENDING"
  | "CREATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "ACTIVE"
  | (string & {});
export interface CollaborationTrainedModelExportJobSummary {
  createTime: Date;
  updateTime: Date;
  name: string;
  outputConfiguration: TrainedModelExportOutputConfiguration;
  status: TrainedModelExportJobStatus;
  statusDetails?: StatusDetails;
  description?: string;
  creatorAccountId: string;
  trainedModelArn: string;
  trainedModelVersionIdentifier?: string;
  membershipIdentifier: string;
  collaborationIdentifier: string;
}
export type CollaborationTrainedModelExportJobList = CollaborationTrainedModelExportJobSummary[];
export interface ListCollaborationTrainedModelExportJobsResponse {
  nextToken?: string;
  collaborationTrainedModelExportJobs: CollaborationTrainedModelExportJobSummary[];
}
export interface ListCollaborationTrainedModelInferenceJobsRequest {
  nextToken?: string;
  maxResults?: number;
  collaborationIdentifier: string;
  trainedModelArn?: string;
  trainedModelVersionIdentifier?: string;
}
export interface CollaborationTrainedModelInferenceJobSummary {
  trainedModelInferenceJobArn: string;
  configuredModelAlgorithmAssociationArn?: string;
  membershipIdentifier: string;
  trainedModelArn: string;
  trainedModelVersionIdentifier?: string;
  collaborationIdentifier: string;
  status: TrainedModelInferenceJobStatus;
  outputConfiguration: InferenceOutputConfiguration;
  name: string;
  description?: string;
  metricsStatus?: MetricsStatus;
  metricsStatusDetails?: string;
  logsStatus?: LogsStatus;
  logsStatusDetails?: string;
  mlModelInferencePayerAccountId?: string;
  createTime: Date;
  updateTime: Date;
  creatorAccountId: string;
}
export type CollaborationTrainedModelInferenceJobList =
  CollaborationTrainedModelInferenceJobSummary[];
export interface ListCollaborationTrainedModelInferenceJobsResponse {
  nextToken?: string;
  collaborationTrainedModelInferenceJobs: CollaborationTrainedModelInferenceJobSummary[];
}
export interface ListCollaborationTrainedModelsRequest {
  nextToken?: string;
  maxResults?: number;
  collaborationIdentifier: string;
}
export interface CollaborationTrainedModelSummary {
  createTime: Date;
  updateTime: Date;
  trainedModelArn: string;
  name: string;
  versionIdentifier?: string;
  incrementalTrainingDataChannels?: IncrementalTrainingDataChannelOutput[];
  description?: string;
  membershipIdentifier: string;
  collaborationIdentifier: string;
  status: TrainedModelStatus;
  configuredModelAlgorithmAssociationArn: string;
  creatorAccountId: string;
  mlModelTrainingPayerAccountId?: string;
}
export type CollaborationTrainedModelList = CollaborationTrainedModelSummary[];
export interface ListCollaborationTrainedModelsResponse {
  nextToken?: string;
  collaborationTrainedModels: CollaborationTrainedModelSummary[];
}
export interface ListConfiguredAudienceModelsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface ConfiguredAudienceModelSummary {
  createTime: Date;
  updateTime: Date;
  name: string;
  audienceModelArn: string;
  outputConfig: ConfiguredAudienceModelOutputConfig;
  description?: string;
  configuredAudienceModelArn: string;
  status: ConfiguredAudienceModelStatus;
}
export type ConfiguredAudienceModelList = ConfiguredAudienceModelSummary[];
export interface ListConfiguredAudienceModelsResponse {
  nextToken?: string;
  configuredAudienceModels: ConfiguredAudienceModelSummary[];
}
export interface ListConfiguredModelAlgorithmAssociationsRequest {
  nextToken?: string;
  maxResults?: number;
  membershipIdentifier: string;
}
export interface ConfiguredModelAlgorithmAssociationSummary {
  createTime: Date;
  updateTime: Date;
  configuredModelAlgorithmAssociationArn: string;
  configuredModelAlgorithmArn: string;
  name: string;
  description?: string;
  membershipIdentifier: string;
  collaborationIdentifier: string;
}
export type ConfiguredModelAlgorithmAssociationList = ConfiguredModelAlgorithmAssociationSummary[];
export interface ListConfiguredModelAlgorithmAssociationsResponse {
  nextToken?: string;
  configuredModelAlgorithmAssociations: ConfiguredModelAlgorithmAssociationSummary[];
}
export interface ListConfiguredModelAlgorithmsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface ConfiguredModelAlgorithmSummary {
  createTime: Date;
  updateTime: Date;
  configuredModelAlgorithmArn: string;
  name: string;
  description?: string;
}
export type ConfiguredModelAlgorithmList = ConfiguredModelAlgorithmSummary[];
export interface ListConfiguredModelAlgorithmsResponse {
  nextToken?: string;
  configuredModelAlgorithms: ConfiguredModelAlgorithmSummary[];
}
export interface ListMLInputChannelsRequest {
  nextToken?: string;
  maxResults?: number;
  membershipIdentifier: string;
}
export interface MLInputChannelSummary {
  createTime: Date;
  updateTime: Date;
  membershipIdentifier: string;
  collaborationIdentifier: string;
  name: string;
  configuredModelAlgorithmAssociations: string[];
  protectedQueryIdentifier?: string;
  mlInputChannelArn: string;
  status: MLInputChannelStatus;
  description?: string;
  payerConfiguration?: PayerConfiguration;
}
export type MLInputChannelsList = MLInputChannelSummary[];
export interface ListMLInputChannelsResponse {
  nextToken?: string;
  mlInputChannelsList: MLInputChannelSummary[];
}
export type TaggableArn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags: { [key: string]: string | undefined };
}
export interface ListTrainedModelInferenceJobsRequest {
  nextToken?: string;
  maxResults?: number;
  membershipIdentifier: string;
  trainedModelArn?: string;
  trainedModelVersionIdentifier?: string;
}
export interface TrainedModelInferenceJobSummary {
  trainedModelInferenceJobArn: string;
  configuredModelAlgorithmAssociationArn?: string;
  membershipIdentifier: string;
  trainedModelArn: string;
  trainedModelVersionIdentifier?: string;
  collaborationIdentifier: string;
  status: TrainedModelInferenceJobStatus;
  outputConfiguration: InferenceOutputConfiguration;
  name: string;
  description?: string;
  metricsStatus?: MetricsStatus;
  metricsStatusDetails?: string;
  logsStatus?: LogsStatus;
  logsStatusDetails?: string;
  mlModelInferencePayerAccountId?: string;
  createTime: Date;
  updateTime: Date;
}
export type TrainedModelInferenceJobList = TrainedModelInferenceJobSummary[];
export interface ListTrainedModelInferenceJobsResponse {
  nextToken?: string;
  trainedModelInferenceJobs: TrainedModelInferenceJobSummary[];
}
export interface ListTrainedModelsRequest {
  nextToken?: string;
  maxResults?: number;
  membershipIdentifier: string;
}
export interface TrainedModelSummary {
  createTime: Date;
  updateTime: Date;
  trainedModelArn: string;
  versionIdentifier?: string;
  incrementalTrainingDataChannels?: IncrementalTrainingDataChannelOutput[];
  name: string;
  description?: string;
  membershipIdentifier: string;
  collaborationIdentifier: string;
  status: TrainedModelStatus;
  configuredModelAlgorithmAssociationArn: string;
  mlModelTrainingPayerAccountId?: string;
}
export type TrainedModelList = TrainedModelSummary[];
export interface ListTrainedModelsResponse {
  nextToken?: string;
  trainedModels: TrainedModelSummary[];
}
export interface ListTrainedModelVersionsRequest {
  nextToken?: string;
  maxResults?: number;
  membershipIdentifier: string;
  trainedModelArn: string;
  status?: TrainedModelStatus;
}
export interface ListTrainedModelVersionsResponse {
  nextToken?: string;
  trainedModels: TrainedModelSummary[];
}
export interface ListTrainingDatasetsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface TrainingDatasetSummary {
  createTime: Date;
  updateTime: Date;
  trainingDatasetArn: string;
  name: string;
  status: TrainingDatasetStatus;
  description?: string;
}
export type TrainingDatasetList = TrainingDatasetSummary[];
export interface ListTrainingDatasetsResponse {
  nextToken?: string;
  trainingDatasets: TrainingDatasetSummary[];
}
export type PolicyExistenceCondition =
  | "POLICY_MUST_EXIST"
  | "POLICY_MUST_NOT_EXIST"
  | (string & {});
export interface PutConfiguredAudienceModelPolicyRequest {
  configuredAudienceModelArn: string;
  configuredAudienceModelPolicy: string;
  previousPolicyHash?: string;
  policyExistenceCondition?: PolicyExistenceCondition;
}
export interface PutConfiguredAudienceModelPolicyResponse {
  configuredAudienceModelPolicy: string;
  policyHash: string;
}
export interface PutMLConfigurationRequest {
  membershipIdentifier: string;
  defaultOutputLocation: MLOutputConfiguration;
}
export interface PutMLConfigurationResponse {}
export interface StartAudienceExportJobRequest {
  name: string;
  audienceGenerationJobArn: string;
  audienceSize: AudienceSize;
  description?: string;
}
export interface StartAudienceExportJobResponse {}
export interface StartAudienceGenerationJobRequest {
  name: string;
  configuredAudienceModelArn: string;
  seedAudience: AudienceGenerationJobDataSource;
  includeSeedInOutput?: boolean;
  collaborationId?: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
}
export interface StartAudienceGenerationJobResponse {
  audienceGenerationJobArn: string;
}
export interface StartTrainedModelExportJobRequest {
  name: string;
  trainedModelArn: string;
  trainedModelVersionIdentifier?: string;
  membershipIdentifier: string;
  outputConfiguration: TrainedModelExportOutputConfiguration;
  description?: string;
}
export interface StartTrainedModelExportJobResponse {}
export interface StartTrainedModelInferenceJobRequest {
  membershipIdentifier: string;
  name: string;
  trainedModelArn: string;
  trainedModelVersionIdentifier?: string;
  configuredModelAlgorithmAssociationArn?: string;
  resourceConfig: InferenceResourceConfig;
  outputConfiguration: InferenceOutputConfiguration;
  dataSource: ModelInferenceDataSource;
  description?: string;
  containerExecutionParameters?: InferenceContainerExecutionParameters;
  environment?: { [key: string]: string | undefined };
  kmsKeyArn?: string;
  tags?: { [key: string]: string | undefined };
  mlModelInferencePayerAccountId?: string;
}
export interface StartTrainedModelInferenceJobResponse {
  trainedModelInferenceJobArn: string;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeys = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateConfiguredAudienceModelRequest {
  configuredAudienceModelArn: string;
  outputConfig?: ConfiguredAudienceModelOutputConfig;
  audienceModelArn?: string;
  sharedAudienceMetrics?: SharedAudienceMetrics[];
  minMatchingSeedSize?: number;
  audienceSizeConfig?: AudienceSizeConfig;
  description?: string;
}
export interface UpdateConfiguredAudienceModelResponse {
  configuredAudienceModelArn: string;
}
export type CancelTrainedModelError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Submits a request to cancel the trained model job.
 */
export const cancelTrainedModel: API.OperationMethod<
  CancelTrainedModelRequest,
  CancelTrainedModelResponse,
  CancelTrainedModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1328, __c83, 0) as any as S.Schema<CancelTrainedModelRequest>,
  output: __S(1344, __c84, 0) as any as S.Schema<CancelTrainedModelResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelTrainedModel",
}));

export type CancelTrainedModelInferenceJobError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Submits a request to cancel a trained model inference job.
 */
export const cancelTrainedModelInferenceJob: API.OperationMethod<
  CancelTrainedModelInferenceJobRequest,
  CancelTrainedModelInferenceJobResponse,
  CancelTrainedModelInferenceJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1360, __c85, 0) as any as S.Schema<CancelTrainedModelInferenceJobRequest>,
  output: __S(1344, __c84, 0) as any as S.Schema<CancelTrainedModelInferenceJobResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelTrainedModelInferenceJob",
}));

export type CreateAudienceModelError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Defines the information necessary to create an audience model. An audience model is a machine learning model that Clean Rooms ML trains to measure similarity between users. Clean Rooms ML manages training and storing the audience model. The audience model can be used in multiple calls to the StartAudienceGenerationJob API.
 */
export const createAudienceModel: API.OperationMethod<
  CreateAudienceModelRequest,
  CreateAudienceModelResponse,
  CreateAudienceModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1376, __c86, 0) as any as S.Schema<CreateAudienceModelRequest>,
  output: __S(1377, __c86, 1) as any as S.Schema<CreateAudienceModelResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAudienceModel",
}));

export type CreateConfiguredAudienceModelError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Defines the information necessary to create a configured audience model.
 */
export const createConfiguredAudienceModel: API.OperationMethod<
  CreateConfiguredAudienceModelRequest,
  CreateConfiguredAudienceModelResponse,
  CreateConfiguredAudienceModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateConfiguredAudienceModelRequest>,
  output: __S(96, __c6, 0) as any as S.Schema<CreateConfiguredAudienceModelResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfiguredAudienceModel",
}));

export type CreateConfiguredModelAlgorithmError =
  | AccessDeniedException
  | ConflictException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a configured model algorithm using a container image stored in an ECR repository.
 */
export const createConfiguredModelAlgorithm: API.OperationMethod<
  CreateConfiguredModelAlgorithmRequest,
  CreateConfiguredModelAlgorithmResponse,
  CreateConfiguredModelAlgorithmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<CreateConfiguredModelAlgorithmRequest>,
  output: __S(113, __c7, 1) as any as S.Schema<CreateConfiguredModelAlgorithmResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfiguredModelAlgorithm",
}));

export type CreateConfiguredModelAlgorithmAssociationError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a configured model algorithm to a collaboration for use by any member of the collaboration.
 */
export const createConfiguredModelAlgorithmAssociation: API.OperationMethod<
  CreateConfiguredModelAlgorithmAssociationRequest,
  CreateConfiguredModelAlgorithmAssociationResponse,
  CreateConfiguredModelAlgorithmAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<CreateConfiguredModelAlgorithmAssociationRequest>,
  output: __S(161, __c10, 1) as any as S.Schema<CreateConfiguredModelAlgorithmAssociationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfiguredModelAlgorithmAssociation",
}));

export type CreateMLInputChannelError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides the information to create an ML input channel. An ML input channel is the result of a query that can be used for ML modeling.
 */
export const createMLInputChannel: API.OperationMethod<
  CreateMLInputChannelRequest,
  CreateMLInputChannelResponse,
  CreateMLInputChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<CreateMLInputChannelRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<CreateMLInputChannelResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMLInputChannel",
}));

export type CreateTrainedModelError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a trained model from an associated configured model algorithm using data from any member of the collaboration.
 */
export const createTrainedModel: API.OperationMethod<
  CreateTrainedModelRequest,
  CreateTrainedModelResponse,
  CreateTrainedModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(274, __c17, 2) as any as S.Schema<CreateTrainedModelRequest>,
  output: __S(275, __c17, 3) as any as S.Schema<CreateTrainedModelResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTrainedModel",
}));

export type CreateTrainingDatasetError =
  | AccessDeniedException
  | ConflictException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Defines the information necessary to create a training dataset. In Clean Rooms ML, the `TrainingDataset` is metadata that points to a Glue table, which is read only during `AudienceModel` creation.
 */
export const createTrainingDataset: API.OperationMethod<
  CreateTrainingDatasetRequest,
  CreateTrainingDatasetResponse,
  CreateTrainingDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<CreateTrainingDatasetRequest>,
  output: __S(321, __c20, 1) as any as S.Schema<CreateTrainingDatasetResponse>,
  errors: [AccessDeniedException, ConflictException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTrainingDataset",
}));

export type DeleteAudienceGenerationJobError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified audience generation job, and removes all data associated with the job.
 */
export const deleteAudienceGenerationJob: API.OperationMethod<
  DeleteAudienceGenerationJobRequest,
  DeleteAudienceGenerationJobResponse,
  DeleteAudienceGenerationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<DeleteAudienceGenerationJobRequest>,
  output: __S(1344, __c84, 0) as any as S.Schema<DeleteAudienceGenerationJobResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAudienceGenerationJob",
}));

export type DeleteAudienceModelError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Specifies an audience model that you want to delete. You can't delete an audience model if there are any configured audience models that depend on the audience model.
 */
export const deleteAudienceModel: API.OperationMethod<
  DeleteAudienceModelRequest,
  DeleteAudienceModelResponse,
  DeleteAudienceModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<DeleteAudienceModelRequest>,
  output: __S(1344, __c84, 0) as any as S.Schema<DeleteAudienceModelResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAudienceModel",
}));

export type DeleteConfiguredAudienceModelError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified configured audience model. You can't delete a configured audience model if there are any lookalike models that use the configured audience model. If you delete a configured audience model, it will be removed from any collaborations that it is associated to.
 */
export const deleteConfiguredAudienceModel: API.OperationMethod<
  DeleteConfiguredAudienceModelRequest,
  DeleteConfiguredAudienceModelResponse,
  DeleteConfiguredAudienceModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<DeleteConfiguredAudienceModelRequest>,
  output: __S(1344, __c84, 0) as any as S.Schema<DeleteConfiguredAudienceModelResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfiguredAudienceModel",
}));

export type DeleteConfiguredAudienceModelPolicyError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified configured audience model policy.
 */
export const deleteConfiguredAudienceModelPolicy: API.OperationMethod<
  DeleteConfiguredAudienceModelPolicyRequest,
  DeleteConfiguredAudienceModelPolicyResponse,
  DeleteConfiguredAudienceModelPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<DeleteConfiguredAudienceModelPolicyRequest>,
  output: __S(1344, __c84, 0) as any as S.Schema<DeleteConfiguredAudienceModelPolicyResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfiguredAudienceModelPolicy",
}));

export type DeleteConfiguredModelAlgorithmError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a configured model algorithm.
 */
export const deleteConfiguredModelAlgorithm: API.OperationMethod<
  DeleteConfiguredModelAlgorithmRequest,
  DeleteConfiguredModelAlgorithmResponse,
  DeleteConfiguredModelAlgorithmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<DeleteConfiguredModelAlgorithmRequest>,
  output: __S(1344, __c84, 0) as any as S.Schema<DeleteConfiguredModelAlgorithmResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfiguredModelAlgorithm",
}));

export type DeleteConfiguredModelAlgorithmAssociationError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a configured model algorithm association.
 */
export const deleteConfiguredModelAlgorithmAssociation: API.OperationMethod<
  DeleteConfiguredModelAlgorithmAssociationRequest,
  DeleteConfiguredModelAlgorithmAssociationResponse,
  DeleteConfiguredModelAlgorithmAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<DeleteConfiguredModelAlgorithmAssociationRequest>,
  output: __S(1344, __c84, 0) as any as S.Schema<DeleteConfiguredModelAlgorithmAssociationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfiguredModelAlgorithmAssociation",
}));

export type DeleteMLConfigurationError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a ML modeling configuration.
 */
export const deleteMLConfiguration: API.OperationMethod<
  DeleteMLConfigurationRequest,
  DeleteMLConfigurationResponse,
  DeleteMLConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<DeleteMLConfigurationRequest>,
  output: __S(1344, __c84, 0) as any as S.Schema<DeleteMLConfigurationResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMLConfiguration",
}));

export type DeleteMLInputChannelDataError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides the information necessary to delete an ML input channel.
 */
export const deleteMLInputChannelData: API.OperationMethod<
  DeleteMLInputChannelDataRequest,
  DeleteMLInputChannelDataResponse,
  DeleteMLInputChannelDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<DeleteMLInputChannelDataRequest>,
  output: __S(1344, __c84, 0) as any as S.Schema<DeleteMLInputChannelDataResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMLInputChannelData",
}));

export type DeleteTrainedModelOutputError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the model artifacts stored by the service.
 */
export const deleteTrainedModelOutput: API.OperationMethod<
  DeleteTrainedModelOutputRequest,
  DeleteTrainedModelOutputResponse,
  DeleteTrainedModelOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<DeleteTrainedModelOutputRequest>,
  output: __S(1344, __c84, 0) as any as S.Schema<DeleteTrainedModelOutputResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTrainedModelOutput",
}));

export type DeleteTrainingDatasetError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Specifies a training dataset that you want to delete. You can't delete a training dataset if there are any audience models that depend on the training dataset. In Clean Rooms ML, the `TrainingDataset` is metadata that points to a Glue table, which is read only during `AudienceModel` creation. This action deletes the metadata.
 */
export const deleteTrainingDataset: API.OperationMethod<
  DeleteTrainingDatasetRequest,
  DeleteTrainingDatasetResponse,
  DeleteTrainingDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<DeleteTrainingDatasetRequest>,
  output: __S(1344, __c84, 0) as any as S.Schema<DeleteTrainingDatasetResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTrainingDataset",
}));

export type GetAudienceGenerationJobError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about an audience generation job.
 */
export const getAudienceGenerationJob: API.OperationMethod<
  GetAudienceGenerationJobRequest,
  GetAudienceGenerationJobResponse,
  GetAudienceGenerationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<GetAudienceGenerationJobRequest>,
  output: __S(516, __c32, 4) as any as S.Schema<GetAudienceGenerationJobResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAudienceGenerationJob",
}));

export type GetAudienceModelError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about an audience model
 */
export const getAudienceModel: API.OperationMethod<
  GetAudienceModelRequest,
  GetAudienceModelResponse,
  GetAudienceModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c36, 0) as any as S.Schema<GetAudienceModelRequest>,
  output: __S(577, __c36, 1) as any as S.Schema<GetAudienceModelResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAudienceModel",
}));

export type GetCollaborationConfiguredModelAlgorithmAssociationError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the configured model algorithm association in a collaboration.
 */
export const getCollaborationConfiguredModelAlgorithmAssociation: API.OperationMethod<
  GetCollaborationConfiguredModelAlgorithmAssociationRequest,
  GetCollaborationConfiguredModelAlgorithmAssociationResponse,
  GetCollaborationConfiguredModelAlgorithmAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(
    592,
    __c37,
    0,
  ) as any as S.Schema<GetCollaborationConfiguredModelAlgorithmAssociationRequest>,
  output: __S(
    593,
    __c37,
    1,
  ) as any as S.Schema<GetCollaborationConfiguredModelAlgorithmAssociationResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCollaborationConfiguredModelAlgorithmAssociation",
}));

export type GetCollaborationMLInputChannelError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a specific ML input channel in a collaboration.
 */
export const getCollaborationMLInputChannel: API.OperationMethod<
  GetCollaborationMLInputChannelRequest,
  GetCollaborationMLInputChannelResponse,
  GetCollaborationMLInputChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c38, 0) as any as S.Schema<GetCollaborationMLInputChannelRequest>,
  output: __S(609, __c38, 1) as any as S.Schema<GetCollaborationMLInputChannelResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCollaborationMLInputChannel",
}));

export type GetCollaborationTrainedModelError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a trained model in a collaboration.
 */
export const getCollaborationTrainedModel: API.OperationMethod<
  GetCollaborationTrainedModelRequest,
  GetCollaborationTrainedModelResponse,
  GetCollaborationTrainedModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c40, 0) as any as S.Schema<GetCollaborationTrainedModelRequest>,
  output: __S(641, __c40, 1) as any as S.Schema<GetCollaborationTrainedModelResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCollaborationTrainedModel",
}));

export type GetConfiguredAudienceModelError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a specified configured audience model.
 */
export const getConfiguredAudienceModel: API.OperationMethod<
  GetConfiguredAudienceModelRequest,
  GetConfiguredAudienceModelResponse,
  GetConfiguredAudienceModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c42, 0) as any as S.Schema<GetConfiguredAudienceModelRequest>,
  output: __S(673, __c42, 1) as any as S.Schema<GetConfiguredAudienceModelResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfiguredAudienceModel",
}));

export type GetConfiguredAudienceModelPolicyError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a configured audience model policy.
 */
export const getConfiguredAudienceModelPolicy: API.OperationMethod<
  GetConfiguredAudienceModelPolicyRequest,
  GetConfiguredAudienceModelPolicyResponse,
  GetConfiguredAudienceModelPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(688, __c43, 0) as any as S.Schema<GetConfiguredAudienceModelPolicyRequest>,
  output: __S(689, __c43, 1) as any as S.Schema<GetConfiguredAudienceModelPolicyResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfiguredAudienceModelPolicy",
}));

export type GetConfiguredModelAlgorithmError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a configured model algorithm.
 */
export const getConfiguredModelAlgorithm: API.OperationMethod<
  GetConfiguredModelAlgorithmRequest,
  GetConfiguredModelAlgorithmResponse,
  GetConfiguredModelAlgorithmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c44, 0) as any as S.Schema<GetConfiguredModelAlgorithmRequest>,
  output: __S(705, __c44, 1) as any as S.Schema<GetConfiguredModelAlgorithmResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfiguredModelAlgorithm",
}));

export type GetConfiguredModelAlgorithmAssociationError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a configured model algorithm association.
 */
export const getConfiguredModelAlgorithmAssociation: API.OperationMethod<
  GetConfiguredModelAlgorithmAssociationRequest,
  GetConfiguredModelAlgorithmAssociationResponse,
  GetConfiguredModelAlgorithmAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(720, __c45, 0) as any as S.Schema<GetConfiguredModelAlgorithmAssociationRequest>,
  output: __S(721, __c45, 1) as any as S.Schema<GetConfiguredModelAlgorithmAssociationResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfiguredModelAlgorithmAssociation",
}));

export type GetMLConfigurationError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a specific ML configuration.
 */
export const getMLConfiguration: API.OperationMethod<
  GetMLConfigurationRequest,
  GetMLConfigurationResponse,
  GetMLConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c46, 0) as any as S.Schema<GetMLConfigurationRequest>,
  output: __S(737, __c46, 1) as any as S.Schema<GetMLConfigurationResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMLConfiguration",
}));

export type GetMLInputChannelError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about an ML input channel.
 */
export const getMLInputChannel: API.OperationMethod<
  GetMLInputChannelRequest,
  GetMLInputChannelResponse,
  GetMLInputChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c48, 0) as any as S.Schema<GetMLInputChannelRequest>,
  output: __S(769, __c48, 1) as any as S.Schema<GetMLInputChannelResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMLInputChannel",
}));

export type GetTrainedModelError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a trained model.
 */
export const getTrainedModel: API.OperationMethod<
  GetTrainedModelRequest,
  GetTrainedModelResponse,
  GetTrainedModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(784, __c49, 0) as any as S.Schema<GetTrainedModelRequest>,
  output: __S(785, __c49, 1) as any as S.Schema<GetTrainedModelResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrainedModel",
}));

export type GetTrainedModelInferenceJobError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a trained model inference job.
 */
export const getTrainedModelInferenceJob: API.OperationMethod<
  GetTrainedModelInferenceJobRequest,
  GetTrainedModelInferenceJobResponse,
  GetTrainedModelInferenceJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c50, 0) as any as S.Schema<GetTrainedModelInferenceJobRequest>,
  output: __S(801, __c50, 1) as any as S.Schema<GetTrainedModelInferenceJobResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrainedModelInferenceJob",
}));

export type GetTrainingDatasetError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a training dataset.
 */
export const getTrainingDataset: API.OperationMethod<
  GetTrainingDatasetRequest,
  GetTrainingDatasetResponse,
  GetTrainingDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c54, 0) as any as S.Schema<GetTrainingDatasetRequest>,
  output: __S(865, __c54, 1) as any as S.Schema<GetTrainingDatasetResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrainingDataset",
}));

export type ListAudienceExportJobsError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the audience export jobs.
 */
export const listAudienceExportJobs: API.PaginatedOperationMethod<
  ListAudienceExportJobsRequest,
  ListAudienceExportJobsResponse,
  ListAudienceExportJobsError,
  Credentials | HttpClient.HttpClient,
  AudienceExportJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(880, __c55, 0) as any as S.Schema<ListAudienceExportJobsRequest>,
  output: __S(883, __c55, 3) as any as S.Schema<ListAudienceExportJobsResponse>,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAudienceExportJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "audienceExportJobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAudienceGenerationJobsError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of audience generation jobs.
 */
export const listAudienceGenerationJobs: API.PaginatedOperationMethod<
  ListAudienceGenerationJobsRequest,
  ListAudienceGenerationJobsResponse,
  ListAudienceGenerationJobsError,
  Credentials | HttpClient.HttpClient,
  AudienceGenerationJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(896, __c56, 0) as any as S.Schema<ListAudienceGenerationJobsRequest>,
  output: __S(899, __c56, 3) as any as S.Schema<ListAudienceGenerationJobsResponse>,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAudienceGenerationJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "audienceGenerationJobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAudienceModelsError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of audience models.
 */
export const listAudienceModels: API.PaginatedOperationMethod<
  ListAudienceModelsRequest,
  ListAudienceModelsResponse,
  ListAudienceModelsError,
  Credentials | HttpClient.HttpClient,
  AudienceModelSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(912, __c57, 0) as any as S.Schema<ListAudienceModelsRequest>,
  output: __S(915, __c57, 3) as any as S.Schema<ListAudienceModelsResponse>,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAudienceModels",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "audienceModels",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCollaborationConfiguredModelAlgorithmAssociationsError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the configured model algorithm associations in a collaboration.
 */
export const listCollaborationConfiguredModelAlgorithmAssociations: API.PaginatedOperationMethod<
  ListCollaborationConfiguredModelAlgorithmAssociationsRequest,
  ListCollaborationConfiguredModelAlgorithmAssociationsResponse,
  ListCollaborationConfiguredModelAlgorithmAssociationsError,
  Credentials | HttpClient.HttpClient,
  CollaborationConfiguredModelAlgorithmAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(
    928,
    __c58,
    0,
  ) as any as S.Schema<ListCollaborationConfiguredModelAlgorithmAssociationsRequest>,
  output: __S(
    931,
    __c58,
    3,
  ) as any as S.Schema<ListCollaborationConfiguredModelAlgorithmAssociationsResponse>,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCollaborationConfiguredModelAlgorithmAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "collaborationConfiguredModelAlgorithmAssociations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCollaborationMLInputChannelsError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the ML input channels in a collaboration.
 */
export const listCollaborationMLInputChannels: API.PaginatedOperationMethod<
  ListCollaborationMLInputChannelsRequest,
  ListCollaborationMLInputChannelsResponse,
  ListCollaborationMLInputChannelsError,
  Credentials | HttpClient.HttpClient,
  CollaborationMLInputChannelSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(944, __c59, 0) as any as S.Schema<ListCollaborationMLInputChannelsRequest>,
  output: __S(947, __c59, 3) as any as S.Schema<ListCollaborationMLInputChannelsResponse>,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCollaborationMLInputChannels",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "collaborationMLInputChannelsList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCollaborationTrainedModelExportJobsError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the export jobs for a trained model in a collaboration.
 */
export const listCollaborationTrainedModelExportJobs: API.PaginatedOperationMethod<
  ListCollaborationTrainedModelExportJobsRequest,
  ListCollaborationTrainedModelExportJobsResponse,
  ListCollaborationTrainedModelExportJobsError,
  Credentials | HttpClient.HttpClient,
  CollaborationTrainedModelExportJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(960, __c60, 0) as any as S.Schema<ListCollaborationTrainedModelExportJobsRequest>,
  output: __S(963, __c60, 3) as any as S.Schema<ListCollaborationTrainedModelExportJobsResponse>,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCollaborationTrainedModelExportJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "collaborationTrainedModelExportJobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCollaborationTrainedModelInferenceJobsError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of trained model inference jobs in a specified collaboration.
 */
export const listCollaborationTrainedModelInferenceJobs: API.PaginatedOperationMethod<
  ListCollaborationTrainedModelInferenceJobsRequest,
  ListCollaborationTrainedModelInferenceJobsResponse,
  ListCollaborationTrainedModelInferenceJobsError,
  Credentials | HttpClient.HttpClient,
  CollaborationTrainedModelInferenceJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(992, __c62, 0) as any as S.Schema<ListCollaborationTrainedModelInferenceJobsRequest>,
  output: __S(995, __c62, 3) as any as S.Schema<ListCollaborationTrainedModelInferenceJobsResponse>,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCollaborationTrainedModelInferenceJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "collaborationTrainedModelInferenceJobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCollaborationTrainedModelsError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the trained models in a collaboration.
 */
export const listCollaborationTrainedModels: API.PaginatedOperationMethod<
  ListCollaborationTrainedModelsRequest,
  ListCollaborationTrainedModelsResponse,
  ListCollaborationTrainedModelsError,
  Credentials | HttpClient.HttpClient,
  CollaborationTrainedModelSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1008, __c63, 0) as any as S.Schema<ListCollaborationTrainedModelsRequest>,
  output: __S(1011, __c63, 3) as any as S.Schema<ListCollaborationTrainedModelsResponse>,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCollaborationTrainedModels",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "collaborationTrainedModels",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListConfiguredAudienceModelsError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the configured audience models.
 */
export const listConfiguredAudienceModels: API.PaginatedOperationMethod<
  ListConfiguredAudienceModelsRequest,
  ListConfiguredAudienceModelsResponse,
  ListConfiguredAudienceModelsError,
  Credentials | HttpClient.HttpClient,
  ConfiguredAudienceModelSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1024, __c64, 0) as any as S.Schema<ListConfiguredAudienceModelsRequest>,
  output: __S(1027, __c64, 3) as any as S.Schema<ListConfiguredAudienceModelsResponse>,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfiguredAudienceModels",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "configuredAudienceModels",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListConfiguredModelAlgorithmAssociationsError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of configured model algorithm associations.
 */
export const listConfiguredModelAlgorithmAssociations: API.PaginatedOperationMethod<
  ListConfiguredModelAlgorithmAssociationsRequest,
  ListConfiguredModelAlgorithmAssociationsResponse,
  ListConfiguredModelAlgorithmAssociationsError,
  Credentials | HttpClient.HttpClient,
  ConfiguredModelAlgorithmAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1040, __c65, 0) as any as S.Schema<ListConfiguredModelAlgorithmAssociationsRequest>,
  output: __S(1043, __c65, 3) as any as S.Schema<ListConfiguredModelAlgorithmAssociationsResponse>,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfiguredModelAlgorithmAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "configuredModelAlgorithmAssociations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListConfiguredModelAlgorithmsError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of configured model algorithms.
 */
export const listConfiguredModelAlgorithms: API.PaginatedOperationMethod<
  ListConfiguredModelAlgorithmsRequest,
  ListConfiguredModelAlgorithmsResponse,
  ListConfiguredModelAlgorithmsError,
  Credentials | HttpClient.HttpClient,
  ConfiguredModelAlgorithmSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1056, __c66, 0) as any as S.Schema<ListConfiguredModelAlgorithmsRequest>,
  output: __S(1059, __c66, 3) as any as S.Schema<ListConfiguredModelAlgorithmsResponse>,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfiguredModelAlgorithms",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "configuredModelAlgorithms",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMLInputChannelsError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of ML input channels.
 */
export const listMLInputChannels: API.PaginatedOperationMethod<
  ListMLInputChannelsRequest,
  ListMLInputChannelsResponse,
  ListMLInputChannelsError,
  Credentials | HttpClient.HttpClient,
  MLInputChannelSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1072, __c67, 0) as any as S.Schema<ListMLInputChannelsRequest>,
  output: __S(1075, __c67, 3) as any as S.Schema<ListMLInputChannelsResponse>,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMLInputChannels",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "mlInputChannelsList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of tags for a provided resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1088, __c68, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(1089, __c68, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListTrainedModelInferenceJobsError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of trained model inference jobs that match the request parameters.
 */
export const listTrainedModelInferenceJobs: API.PaginatedOperationMethod<
  ListTrainedModelInferenceJobsRequest,
  ListTrainedModelInferenceJobsResponse,
  ListTrainedModelInferenceJobsError,
  Credentials | HttpClient.HttpClient,
  TrainedModelInferenceJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1104, __c69, 0) as any as S.Schema<ListTrainedModelInferenceJobsRequest>,
  output: __S(1107, __c69, 3) as any as S.Schema<ListTrainedModelInferenceJobsResponse>,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrainedModelInferenceJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "trainedModelInferenceJobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTrainedModelsError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of trained models.
 */
export const listTrainedModels: API.PaginatedOperationMethod<
  ListTrainedModelsRequest,
  ListTrainedModelsResponse,
  ListTrainedModelsError,
  Credentials | HttpClient.HttpClient,
  TrainedModelSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1120, __c70, 0) as any as S.Schema<ListTrainedModelsRequest>,
  output: __S(1138, __c71, 2) as any as S.Schema<ListTrainedModelsResponse>,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrainedModels",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "trainedModels",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTrainedModelVersionsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of trained model versions for a specified trained model. This operation allows you to view all versions of a trained model, including information about their status and creation details. You can use this to track the evolution of your trained models and select specific versions for inference or further training.
 */
export const listTrainedModelVersions: API.PaginatedOperationMethod<
  ListTrainedModelVersionsRequest,
  ListTrainedModelVersionsResponse,
  ListTrainedModelVersionsError,
  Credentials | HttpClient.HttpClient,
  TrainedModelSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1152, __c72, 0) as any as S.Schema<ListTrainedModelVersionsRequest>,
  output: __S(1138, __c71, 2) as any as S.Schema<ListTrainedModelVersionsResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrainedModelVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "trainedModels",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTrainingDatasetsError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of training datasets.
 */
export const listTrainingDatasets: API.PaginatedOperationMethod<
  ListTrainingDatasetsRequest,
  ListTrainingDatasetsResponse,
  ListTrainingDatasetsError,
  Credentials | HttpClient.HttpClient,
  TrainingDatasetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1168, __c73, 0) as any as S.Schema<ListTrainingDatasetsRequest>,
  output: __S(1171, __c73, 3) as any as S.Schema<ListTrainingDatasetsResponse>,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrainingDatasets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "trainingDatasets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutConfiguredAudienceModelPolicyError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create or update the resource policy for a configured audience model.
 */
export const putConfiguredAudienceModelPolicy: API.OperationMethod<
  PutConfiguredAudienceModelPolicyRequest,
  PutConfiguredAudienceModelPolicyResponse,
  PutConfiguredAudienceModelPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1184, __c74, 0) as any as S.Schema<PutConfiguredAudienceModelPolicyRequest>,
  output: __S(1185, __c74, 1) as any as S.Schema<PutConfiguredAudienceModelPolicyResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfiguredAudienceModelPolicy",
}));

export type PutMLConfigurationError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Assigns information about an ML configuration.
 */
export const putMLConfiguration: API.OperationMethod<
  PutMLConfigurationRequest,
  PutMLConfigurationResponse,
  PutMLConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1200, __c75, 0) as any as S.Schema<PutMLConfigurationRequest>,
  output: __S(1344, __c84, 0) as any as S.Schema<PutMLConfigurationResponse>,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutMLConfiguration",
}));

export type StartAudienceExportJobError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Export an audience of a specified size after you have generated an audience.
 */
export const startAudienceExportJob: API.OperationMethod<
  StartAudienceExportJobRequest,
  StartAudienceExportJobResponse,
  StartAudienceExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1216, __c76, 0) as any as S.Schema<StartAudienceExportJobRequest>,
  output: __S(1344, __c84, 0) as any as S.Schema<StartAudienceExportJobResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAudienceExportJob",
}));

export type StartAudienceGenerationJobError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Information necessary to start the audience generation job.
 */
export const startAudienceGenerationJob: API.OperationMethod<
  StartAudienceGenerationJobRequest,
  StartAudienceGenerationJobResponse,
  StartAudienceGenerationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1232, __c77, 0) as any as S.Schema<StartAudienceGenerationJobRequest>,
  output: __S(1233, __c77, 1) as any as S.Schema<StartAudienceGenerationJobResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAudienceGenerationJob",
}));

export type StartTrainedModelExportJobError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides the information necessary to start a trained model export job.
 */
export const startTrainedModelExportJob: API.OperationMethod<
  StartTrainedModelExportJobRequest,
  StartTrainedModelExportJobResponse,
  StartTrainedModelExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1248, __c78, 0) as any as S.Schema<StartTrainedModelExportJobRequest>,
  output: __S(1344, __c84, 0) as any as S.Schema<StartTrainedModelExportJobResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTrainedModelExportJob",
}));

export type StartTrainedModelInferenceJobError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Defines the information necessary to begin a trained model inference job.
 */
export const startTrainedModelInferenceJob: API.OperationMethod<
  StartTrainedModelInferenceJobRequest,
  StartTrainedModelInferenceJobResponse,
  StartTrainedModelInferenceJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1264, __c79, 0) as any as S.Schema<StartTrainedModelInferenceJobRequest>,
  output: __S(1265, __c79, 1) as any as S.Schema<StartTrainedModelInferenceJobResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTrainedModelInferenceJob",
}));

export type TagResourceError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds metadata tags to a specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1280, __c80, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(1344, __c84, 0) as any as S.Schema<TagResourceResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes metadata tags from a specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1296, __c81, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(1344, __c84, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateConfiguredAudienceModelError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides the information necessary to update a configured audience model. Updates that impact audience generation jobs take effect when a new job starts, but do not impact currently running jobs.
 */
export const updateConfiguredAudienceModel: API.OperationMethod<
  UpdateConfiguredAudienceModelRequest,
  UpdateConfiguredAudienceModelResponse,
  UpdateConfiguredAudienceModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1312, __c82, 0) as any as S.Schema<UpdateConfiguredAudienceModelRequest>,
  output: __S(96, __c6, 0) as any as S.Schema<UpdateConfiguredAudienceModelResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfiguredAudienceModel",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          audienceModelArn: S.String,
          outputConfig: __S(64, __c4, 0),
          description: S.optional(S.String),
          sharedAudienceMetrics: __S(16, __c1, 0),
          minMatchingSeedSize: S.optional(S.Number),
          audienceSizeConfig: S.optional(__S(81, __c5, 1)),
          tags: S.optional(__S(1392, __c87, 0)),
          childResourceTagOnCreatePolicy: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/configured-audience-model" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateConfiguredAudienceModelRequest" });
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
      return S.suspend(() => S.Struct({ s3Uri: S.String })).annotate({ identifier: "S3ConfigMap" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ s3Destination: __S(32, __c2, 0) })).annotate({
        identifier: "AudienceDestination",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ destination: __S(48, __c3, 0), roleArn: S.String }),
      ).annotate({ identifier: "ConfiguredAudienceModelOutputConfig" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Number);
    case 1:
      return S.suspend(() =>
        S.Struct({ audienceSizeType: S.String, audienceSizeBins: __S(80, __c5, 0) }),
      ).annotate({ identifier: "AudienceSizeConfig" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ configuredAudienceModelArn: S.String })).annotate({
        identifier: "CreateConfiguredAudienceModelResponse",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          roleArn: S.String,
          trainingContainerConfig: S.optional(__S(146, __c9, 2)),
          inferenceContainerConfig: S.optional(__S(147, __c9, 3)),
          tags: S.optional(__S(1392, __c87, 0)),
          kmsKeyArn: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/configured-model-algorithms" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateConfiguredModelAlgorithmRequest" });
    case 1:
      return S.suspend(() => S.Struct({ configuredModelAlgorithmArn: S.String })).annotate({
        identifier: "CreateConfiguredModelAlgorithmResponse",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, regex: S.String })).annotate({
        identifier: "MetricDefinition",
      });
    case 1:
      return S.Array(__S(144, __c9, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          imageUri: S.String,
          entrypoint: S.optional(__S(128, __c8, 0)),
          arguments: S.optional(__S(128, __c8, 0)),
          metricDefinitions: S.optional(__S(145, __c9, 1)),
        }),
      ).annotate({ identifier: "ContainerConfig" });
    case 3:
      return S.suspend(() => S.Struct({ imageUri: S.String })).annotate({
        identifier: "InferenceContainerConfig",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
          configuredModelAlgorithmArn: S.String,
          name: S.String,
          description: S.optional(S.String),
          privacyConfiguration: S.optional(__S(186, __c11, 10)),
          tags: S.optional(__S(1392, __c87, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/memberships/{membershipIdentifier}/configured-model-algorithm-associations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateConfiguredModelAlgorithmAssociationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ configuredModelAlgorithmAssociationArn: S.String }),
      ).annotate({ identifier: "CreateConfiguredModelAlgorithmAssociationResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ customDataIdentifiers: __S(128, __c8, 0) })).annotate({
        identifier: "CustomEntityConfig",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          entitiesToRedact: __S(16, __c1, 0),
          customEntityConfig: S.optional(__S(176, __c11, 0)),
        }),
      ).annotate({ identifier: "LogRedactionConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          allowedAccountIds: __S(128, __c8, 0),
          filterPattern: S.optional(S.String),
          logType: S.optional(S.String),
          logRedactionConfiguration: S.optional(__S(177, __c11, 1)),
        }),
      ).annotate({ identifier: "LogsConfigurationPolicy" });
    case 3:
      return S.Array(__S(178, __c11, 2));
    case 4:
      return S.suspend(() => S.Struct({ noiseLevel: S.String })).annotate({
        identifier: "MetricsConfigurationPolicy",
      });
    case 5:
      return S.suspend(() => S.Struct({ unit: S.String, value: S.Number })).annotate({
        identifier: "TrainedModelArtifactMaxSize",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({
          containerLogs: S.optional(__S(179, __c11, 3)),
          containerMetrics: S.optional(__S(180, __c11, 4)),
          maxArtifactSize: S.optional(__S(181, __c11, 5)),
        }),
      ).annotate({ identifier: "TrainedModelsConfigurationPolicy" });
    case 7:
      return S.suspend(() =>
        S.Struct({ maxSize: __S(181, __c11, 5), filesToExport: __S(16, __c1, 0) }),
      ).annotate({ identifier: "TrainedModelExportsConfigurationPolicy" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          containerLogs: S.optional(__S(179, __c11, 3)),
          maxOutputSize: S.optional(__S(181, __c11, 5)),
        }),
      ).annotate({ identifier: "TrainedModelInferenceJobsConfigurationPolicy" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          trainedModels: S.optional(__S(182, __c11, 6)),
          trainedModelExports: S.optional(__S(183, __c11, 7)),
          trainedModelInferenceJobs: S.optional(__S(184, __c11, 8)),
        }),
      ).annotate({ identifier: "PrivacyConfigurationPolicies" });
    case 10:
      return S.suspend(() => S.Struct({ policies: __S(185, __c11, 9) })).annotate({
        identifier: "PrivacyConfiguration",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
          configuredModelAlgorithmAssociations: __S(128, __c8, 0),
          inputChannel: __S(242, __c15, 2),
          name: S.String,
          retentionInDays: S.Number,
          description: S.optional(S.String),
          kmsKeyArn: S.optional(S.String),
          tags: S.optional(__S(1392, __c87, 0)),
          payerConfiguration: S.optional(__S(224, __c14, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/memberships/{membershipIdentifier}/ml-input-channels",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateMLInputChannelRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          queryString: S.optional(S.String),
          analysisTemplateArn: S.optional(S.String),
          parameters: S.optional(__S(1392, __c87, 0)),
        }),
      ).annotate({ identifier: "ProtectedQuerySQLParameters" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ spark: __S(1392, __c87, 0) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          number: S.optional(S.Number),
          properties: S.optional(__S(209, __c13, 1)),
        }),
      ).annotate({ identifier: "WorkerComputeConfiguration" });
    case 3:
      return S.Union([/*@__PURE__*/ S.Struct({ worker: __S(210, __c13, 2) })]);
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          computePayerAccountId: S.optional(S.String),
          syntheticDataPayerAccountId: S.optional(S.String),
        }),
      ).annotate({ identifier: "PayerConfiguration" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sqlParameters: __S(208, __c13, 0),
          computeConfiguration: S.optional(__S(211, __c13, 3)),
          resultFormat: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProtectedQueryInputParameters" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ protectedQueryInputParameters: __S(240, __c15, 0) }),
      ]);
    case 2:
      return S.suspend(() =>
        S.Struct({ dataSource: __S(241, __c15, 1), roleArn: S.String }),
      ).annotate({ identifier: "InputChannel" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ mlInputChannelArn: S.String })).annotate({
        identifier: "CreateMLInputChannelResponse",
      });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          trainedModelArn: S.String,
          versionIdentifier: S.optional(S.String),
          channelName: S.String,
        }),
      ).annotate({ identifier: "IncrementalTrainingDataChannel" });
    case 1:
      return S.Array(__S(272, __c17, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
          name: S.String,
          configuredModelAlgorithmAssociationArn: S.String,
          hyperparameters: S.optional(__S(1392, __c87, 0)),
          environment: S.optional(__S(1392, __c87, 0)),
          resourceConfig: __S(288, __c18, 0),
          stoppingCondition: S.optional(__S(289, __c18, 1)),
          incrementalTrainingDataChannels: S.optional(__S(273, __c17, 1)),
          dataChannels: __S(305, __c19, 1),
          trainingInputMode: S.optional(S.String),
          description: S.optional(S.String),
          kmsKeyArn: S.optional(S.String),
          tags: S.optional(__S(1392, __c87, 0)),
          mlModelTrainingPayerAccountId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/memberships/{membershipIdentifier}/trained-models" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateTrainedModelRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({ trainedModelArn: S.String, versionIdentifier: S.optional(S.String) }),
      ).annotate({ identifier: "CreateTrainedModelResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceCount: S.optional(S.Number),
          instanceType: S.String,
          volumeSizeInGB: S.Number,
        }),
      ).annotate({ identifier: "ResourceConfig" });
    case 1:
      return S.suspend(() => S.Struct({ maxRuntimeInSeconds: S.optional(S.Number) })).annotate({
        identifier: "StoppingCondition",
      });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          mlInputChannelArn: S.String,
          channelName: S.String,
          s3DataDistributionType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ModelTrainingDataChannel" });
    case 1:
      return S.Array(__S(304, __c19, 0));
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          roleArn: S.String,
          trainingData: __S(342, __c21, 6),
          tags: S.optional(__S(1392, __c87, 0)),
          description: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/training-dataset" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateTrainingDatasetRequest" });
    case 1:
      return S.suspend(() => S.Struct({ trainingDatasetArn: S.String })).annotate({
        identifier: "CreateTrainingDatasetResponse",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ columnName: S.String, columnTypes: __S(16, __c1, 0) }),
      ).annotate({ identifier: "ColumnSchema" });
    case 1:
      return S.Array(__S(336, __c21, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ tableName: S.String, databaseName: S.String, catalogId: S.optional(S.String) }),
      ).annotate({ identifier: "GlueDataSource" });
    case 3:
      return S.suspend(() => S.Struct({ glueDataSource: __S(338, __c21, 2) })).annotate({
        identifier: "DataSource",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({ schema: __S(337, __c21, 1), dataSource: __S(339, __c21, 3) }),
      ).annotate({ identifier: "DatasetInputConfig" });
    case 5:
      return S.suspend(() =>
        S.Struct({ type: S.String, inputConfig: __S(340, __c21, 4) }),
      ).annotate({ identifier: "Dataset" });
    case 6:
      return S.Array(__S(341, __c21, 5));
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          audienceGenerationJobArn: S.String.pipe(T.HttpLabel("audienceGenerationJobArn")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/audience-generation-job/{audienceGenerationJobArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAudienceGenerationJobRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ audienceModelArn: S.String.pipe(T.HttpLabel("audienceModelArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/audience-model/{audienceModelArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAudienceModelRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          configuredAudienceModelArn: S.String.pipe(T.HttpLabel("configuredAudienceModelArn")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/configured-audience-model/{configuredAudienceModelArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteConfiguredAudienceModelRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          configuredAudienceModelArn: S.String.pipe(T.HttpLabel("configuredAudienceModelArn")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/configured-audience-model/{configuredAudienceModelArn}/policy",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteConfiguredAudienceModelPolicyRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          configuredModelAlgorithmArn: S.String.pipe(T.HttpLabel("configuredModelAlgorithmArn")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/configured-model-algorithms/{configuredModelAlgorithmArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteConfiguredModelAlgorithmRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          configuredModelAlgorithmAssociationArn: S.String.pipe(
            T.HttpLabel("configuredModelAlgorithmAssociationArn"),
          ),
          membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/memberships/{membershipIdentifier}/configured-model-algorithm-associations/{configuredModelAlgorithmAssociationArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteConfiguredModelAlgorithmAssociationRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")) }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/memberships/{membershipIdentifier}/ml-configurations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMLConfigurationRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          mlInputChannelArn: S.String.pipe(T.HttpLabel("mlInputChannelArn")),
          membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/memberships/{membershipIdentifier}/ml-input-channels/{mlInputChannelArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMLInputChannelDataRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          trainedModelArn: S.String.pipe(T.HttpLabel("trainedModelArn")),
          membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
          versionIdentifier: S.optional(S.String).pipe(T.HttpQuery("versionIdentifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/memberships/{membershipIdentifier}/trained-models/{trainedModelArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTrainedModelOutputRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ trainingDatasetArn: S.String.pipe(T.HttpLabel("trainingDatasetArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/training-dataset/{trainingDatasetArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTrainingDatasetRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          audienceGenerationJobArn: S.String.pipe(T.HttpLabel("audienceGenerationJobArn")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/audience-generation-job/{audienceGenerationJobArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAudienceGenerationJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ audienceSize: __S(544, __c34, 0), score: S.optional(S.Number) }),
      ).annotate({ identifier: "RelevanceMetric" });
    case 2:
      return S.Array(__S(513, __c32, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ relevanceMetrics: __S(514, __c32, 2), recallMetric: S.optional(S.Number) }),
      ).annotate({ identifier: "AudienceQualityMetrics" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          audienceGenerationJobArn: S.String,
          name: S.String,
          description: S.optional(S.String),
          status: S.String,
          statusDetails: S.optional(__S(528, __c33, 0)),
          configuredAudienceModelArn: S.String,
          seedAudience: S.optional(__S(560, __c35, 0)),
          includeSeedInOutput: S.optional(S.Boolean),
          collaborationId: S.optional(S.String),
          metrics: S.optional(__S(515, __c32, 3)),
          startedBy: S.optional(S.String),
          tags: S.optional(__S(1392, __c87, 0)),
          protectedQueryIdentifier: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetAudienceGenerationJobResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ statusCode: S.optional(S.String), message: S.optional(S.String) }),
      ).annotate({ identifier: "StatusDetails" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ type: S.String, value: S.Number })).annotate({
        identifier: "AudienceSize",
      });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          dataSource: S.optional(__S(32, __c2, 0)),
          roleArn: S.String,
          sqlParameters: S.optional(__S(208, __c13, 0)),
          sqlComputeConfiguration: S.optional(__S(211, __c13, 3)),
        }),
      ).annotate({ identifier: "AudienceGenerationJobDataSource" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ audienceModelArn: S.String.pipe(T.HttpLabel("audienceModelArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/audience-model/{audienceModelArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAudienceModelRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          trainingDataStartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          trainingDataEndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          audienceModelArn: S.String,
          name: S.String,
          trainingDatasetArn: S.String,
          status: S.String,
          statusDetails: S.optional(__S(528, __c33, 0)),
          kmsKeyArn: S.optional(S.String),
          tags: S.optional(__S(1392, __c87, 0)),
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetAudienceModelResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          configuredModelAlgorithmAssociationArn: S.String.pipe(
            T.HttpLabel("configuredModelAlgorithmAssociationArn"),
          ),
          collaborationIdentifier: S.String.pipe(T.HttpLabel("collaborationIdentifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/collaborations/{collaborationIdentifier}/configured-model-algorithm-associations/{configuredModelAlgorithmAssociationArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCollaborationConfiguredModelAlgorithmAssociationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          configuredModelAlgorithmAssociationArn: S.String,
          membershipIdentifier: S.String,
          collaborationIdentifier: S.String,
          configuredModelAlgorithmArn: S.String,
          name: S.String,
          description: S.optional(S.String),
          creatorAccountId: S.String,
          privacyConfiguration: S.optional(__S(186, __c11, 10)),
        }),
      ).annotate({ identifier: "GetCollaborationConfiguredModelAlgorithmAssociationResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          mlInputChannelArn: S.String.pipe(T.HttpLabel("mlInputChannelArn")),
          collaborationIdentifier: S.String.pipe(T.HttpLabel("collaborationIdentifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/collaborations/{collaborationIdentifier}/ml-input-channels/{mlInputChannelArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCollaborationMLInputChannelRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          membershipIdentifier: S.String,
          collaborationIdentifier: S.String,
          mlInputChannelArn: S.String,
          name: S.String,
          configuredModelAlgorithmAssociations: __S(128, __c8, 0),
          status: S.String,
          statusDetails: S.optional(__S(528, __c33, 0)),
          retentionInDays: S.Number,
          numberOfRecords: S.optional(S.Number),
          privacyBudgets: S.optional(__S(628, __c39, 4)),
          description: S.optional(S.String),
          syntheticDataConfiguration: S.optional(__S(637, __c39, 13)),
          payerConfiguration: S.optional(__S(224, __c14, 0)),
          createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          creatorAccountId: S.String,
        }),
      ).annotate({ identifier: "GetCollaborationMLInputChannelResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          startTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          remainingBudget: S.Number,
          budget: S.Number,
          budgetType: S.String,
          autoRefresh: S.optional(S.String),
        }),
      ).annotate({ identifier: "AccessBudgetDetails" });
    case 1:
      return S.Array(__S(624, __c39, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String,
          details: __S(625, __c39, 1),
          aggregateRemainingBudget: S.Number,
        }),
      ).annotate({ identifier: "AccessBudget" });
    case 3:
      return S.Array(__S(626, __c39, 2));
    case 4:
      return S.Union([/*@__PURE__*/ S.Struct({ accessBudgets: __S(627, __c39, 3) })]);
    case 5:
      return S.suspend(() =>
        S.Struct({ columnName: S.String, columnType: S.String, isPredictiveValue: S.Boolean }),
      ).annotate({ identifier: "SyntheticDataColumnProperties" });
    case 6:
      return S.Array(__S(629, __c39, 5));
    case 7:
      return S.suspend(() => S.Struct({ columnMapping: __S(630, __c39, 6) })).annotate({
        identifier: "ColumnClassificationDetails",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({
          epsilon: S.Number,
          maxMembershipInferenceAttackScore: S.Number,
          columnClassification: S.optional(__S(631, __c39, 7)),
        }),
      ).annotate({ identifier: "MLSyntheticDataParameters" });
    case 9:
      return S.suspend(() => S.Struct({ attackVersion: S.String, score: S.Number })).annotate({
        identifier: "MembershipInferenceAttackScore",
      });
    case 10:
      return S.Array(__S(633, __c39, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({ membershipInferenceAttackScores: __S(634, __c39, 10) }),
      ).annotate({ identifier: "DataPrivacyScores" });
    case 12:
      return S.suspend(() => S.Struct({ dataPrivacyScores: __S(635, __c39, 11) })).annotate({
        identifier: "SyntheticDataEvaluationScores",
      });
    case 13:
      return S.suspend(() =>
        S.Struct({
          syntheticDataParameters: __S(632, __c39, 8),
          syntheticDataEvaluationScores: S.optional(__S(636, __c39, 12)),
        }),
      ).annotate({ identifier: "SyntheticDataConfiguration" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          trainedModelArn: S.String.pipe(T.HttpLabel("trainedModelArn")),
          collaborationIdentifier: S.String.pipe(T.HttpLabel("collaborationIdentifier")),
          versionIdentifier: S.optional(S.String).pipe(T.HttpQuery("versionIdentifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/collaborations/{collaborationIdentifier}/trained-models/{trainedModelArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCollaborationTrainedModelRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          membershipIdentifier: S.String,
          collaborationIdentifier: S.String,
          trainedModelArn: S.String,
          versionIdentifier: S.optional(S.String),
          incrementalTrainingDataChannels: S.optional(__S(657, __c41, 1)),
          name: S.String,
          description: S.optional(S.String),
          status: S.String,
          statusDetails: S.optional(__S(528, __c33, 0)),
          configuredModelAlgorithmAssociationArn: S.String,
          resourceConfig: S.optional(__S(288, __c18, 0)),
          trainingInputMode: S.optional(S.String),
          stoppingCondition: S.optional(__S(289, __c18, 1)),
          metricsStatus: S.optional(S.String),
          metricsStatusDetails: S.optional(S.String),
          logsStatus: S.optional(S.String),
          logsStatusDetails: S.optional(S.String),
          trainingContainerImageDigest: S.optional(S.String),
          mlModelTrainingPayerAccountId: S.optional(S.String),
          createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          creatorAccountId: S.String,
        }),
      ).annotate({ identifier: "GetCollaborationTrainedModelResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          channelName: S.String,
          versionIdentifier: S.optional(S.String),
          modelName: S.String,
        }),
      ).annotate({ identifier: "IncrementalTrainingDataChannelOutput" });
    case 1:
      return S.Array(__S(656, __c41, 0));
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          configuredAudienceModelArn: S.String.pipe(T.HttpLabel("configuredAudienceModelArn")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/configured-audience-model/{configuredAudienceModelArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConfiguredAudienceModelRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          configuredAudienceModelArn: S.String,
          name: S.String,
          audienceModelArn: S.String,
          outputConfig: __S(64, __c4, 0),
          description: S.optional(S.String),
          status: S.String,
          sharedAudienceMetrics: __S(16, __c1, 0),
          minMatchingSeedSize: S.optional(S.Number),
          audienceSizeConfig: S.optional(__S(81, __c5, 1)),
          tags: S.optional(__S(1392, __c87, 0)),
          childResourceTagOnCreatePolicy: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetConfiguredAudienceModelResponse" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          configuredAudienceModelArn: S.String.pipe(T.HttpLabel("configuredAudienceModelArn")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/configured-audience-model/{configuredAudienceModelArn}/policy",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConfiguredAudienceModelPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          configuredAudienceModelArn: S.String,
          configuredAudienceModelPolicy: S.String,
          policyHash: S.String,
        }),
      ).annotate({ identifier: "GetConfiguredAudienceModelPolicyResponse" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          configuredModelAlgorithmArn: S.String.pipe(T.HttpLabel("configuredModelAlgorithmArn")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/configured-model-algorithms/{configuredModelAlgorithmArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConfiguredModelAlgorithmRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          configuredModelAlgorithmArn: S.String,
          name: S.String,
          trainingContainerConfig: S.optional(__S(146, __c9, 2)),
          inferenceContainerConfig: S.optional(__S(147, __c9, 3)),
          roleArn: S.String,
          description: S.optional(S.String),
          tags: S.optional(__S(1392, __c87, 0)),
          kmsKeyArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetConfiguredModelAlgorithmResponse" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          configuredModelAlgorithmAssociationArn: S.String.pipe(
            T.HttpLabel("configuredModelAlgorithmAssociationArn"),
          ),
          membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/memberships/{membershipIdentifier}/configured-model-algorithm-associations/{configuredModelAlgorithmAssociationArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConfiguredModelAlgorithmAssociationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          configuredModelAlgorithmAssociationArn: S.String,
          membershipIdentifier: S.String,
          collaborationIdentifier: S.String,
          configuredModelAlgorithmArn: S.String,
          name: S.String,
          privacyConfiguration: S.optional(__S(186, __c11, 10)),
          description: S.optional(S.String),
          tags: S.optional(__S(1392, __c87, 0)),
        }),
      ).annotate({ identifier: "GetConfiguredModelAlgorithmAssociationResponse" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/memberships/{membershipIdentifier}/ml-configurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMLConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          membershipIdentifier: S.String,
          defaultOutputLocation: __S(752, __c47, 0),
          createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "GetMLConfigurationResponse" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ destination: S.optional(__S(48, __c3, 0)), roleArn: S.String }),
      ).annotate({ identifier: "MLOutputConfiguration" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          mlInputChannelArn: S.String.pipe(T.HttpLabel("mlInputChannelArn")),
          membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/memberships/{membershipIdentifier}/ml-input-channels/{mlInputChannelArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMLInputChannelRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          membershipIdentifier: S.String,
          collaborationIdentifier: S.String,
          mlInputChannelArn: S.String,
          name: S.String,
          configuredModelAlgorithmAssociations: __S(128, __c8, 0),
          status: S.String,
          statusDetails: S.optional(__S(528, __c33, 0)),
          retentionInDays: S.Number,
          numberOfRecords: S.optional(S.Number),
          privacyBudgets: S.optional(__S(628, __c39, 4)),
          description: S.optional(S.String),
          syntheticDataConfiguration: S.optional(__S(637, __c39, 13)),
          payerConfiguration: S.optional(__S(224, __c14, 0)),
          createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          inputChannel: __S(242, __c15, 2),
          protectedQueryIdentifier: S.optional(S.String),
          numberOfFiles: S.optional(S.Number),
          sizeInGb: S.optional(S.Number),
          kmsKeyArn: S.optional(S.String),
          tags: S.optional(__S(1392, __c87, 0)),
        }),
      ).annotate({ identifier: "GetMLInputChannelResponse" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          trainedModelArn: S.String.pipe(T.HttpLabel("trainedModelArn")),
          membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
          versionIdentifier: S.optional(S.String).pipe(T.HttpQuery("versionIdentifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/memberships/{membershipIdentifier}/trained-models/{trainedModelArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTrainedModelRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          membershipIdentifier: S.String,
          collaborationIdentifier: S.String,
          trainedModelArn: S.String,
          versionIdentifier: S.optional(S.String),
          incrementalTrainingDataChannels: S.optional(__S(657, __c41, 1)),
          name: S.String,
          description: S.optional(S.String),
          status: S.String,
          statusDetails: S.optional(__S(528, __c33, 0)),
          configuredModelAlgorithmAssociationArn: S.String,
          resourceConfig: S.optional(__S(288, __c18, 0)),
          trainingInputMode: S.optional(S.String),
          stoppingCondition: S.optional(__S(289, __c18, 1)),
          metricsStatus: S.optional(S.String),
          metricsStatusDetails: S.optional(S.String),
          logsStatus: S.optional(S.String),
          logsStatusDetails: S.optional(S.String),
          trainingContainerImageDigest: S.optional(S.String),
          mlModelTrainingPayerAccountId: S.optional(S.String),
          createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          hyperparameters: S.optional(__S(1392, __c87, 0)),
          environment: S.optional(__S(1392, __c87, 0)),
          kmsKeyArn: S.optional(S.String),
          tags: S.optional(__S(1392, __c87, 0)),
          dataChannels: __S(305, __c19, 1),
        }),
      ).annotate({ identifier: "GetTrainedModelResponse" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
          trainedModelInferenceJobArn: S.String.pipe(T.HttpLabel("trainedModelInferenceJobArn")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/memberships/{membershipIdentifier}/trained-model-inference-jobs/{trainedModelInferenceJobArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTrainedModelInferenceJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          trainedModelInferenceJobArn: S.String,
          configuredModelAlgorithmAssociationArn: S.optional(S.String),
          name: S.String,
          status: S.String,
          trainedModelArn: S.String,
          trainedModelVersionIdentifier: S.optional(S.String),
          resourceConfig: __S(848, __c53, 0),
          outputConfiguration: __S(832, __c52, 0),
          membershipIdentifier: S.String,
          dataSource: __S(256, __c16, 0),
          containerExecutionParameters: S.optional(__S(849, __c53, 1)),
          statusDetails: S.optional(__S(528, __c33, 0)),
          description: S.optional(S.String),
          inferenceContainerImageDigest: S.optional(S.String),
          environment: S.optional(__S(1392, __c87, 0)),
          kmsKeyArn: S.optional(S.String),
          metricsStatus: S.optional(S.String),
          metricsStatusDetails: S.optional(S.String),
          logsStatus: S.optional(S.String),
          logsStatusDetails: S.optional(S.String),
          tags: S.optional(__S(1392, __c87, 0)),
          mlModelInferencePayerAccountId: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetTrainedModelInferenceJobResponse" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ accountId: S.String })).annotate({
        identifier: "InferenceReceiverMember",
      });
    case 1:
      return S.Array(__S(816, __c51, 0));
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ accept: S.optional(S.String), members: __S(817, __c51, 1) }),
      ).annotate({ identifier: "InferenceOutputConfiguration" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ instanceType: S.String, instanceCount: S.optional(S.Number) }),
      ).annotate({ identifier: "InferenceResourceConfig" });
    case 1:
      return S.suspend(() => S.Struct({ maxPayloadInMB: S.optional(S.Number) })).annotate({
        identifier: "InferenceContainerExecutionParameters",
      });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ trainingDatasetArn: S.String.pipe(T.HttpLabel("trainingDatasetArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/training-dataset/{trainingDatasetArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTrainingDatasetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          trainingDatasetArn: S.String,
          name: S.String,
          trainingData: __S(342, __c21, 6),
          status: S.String,
          roleArn: S.String,
          tags: S.optional(__S(1392, __c87, 0)),
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetTrainingDatasetResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          audienceGenerationJobArn: S.optional(S.String).pipe(
            T.HttpQuery("audienceGenerationJobArn"),
          ),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/audience-export-job" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAudienceExportJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          name: S.String,
          audienceGenerationJobArn: S.String,
          audienceSize: __S(544, __c34, 0),
          description: S.optional(S.String),
          status: S.String,
          statusDetails: S.optional(__S(528, __c33, 0)),
          outputLocation: S.optional(S.String),
        }),
      ).annotate({ identifier: "AudienceExportJobSummary" });
    case 2:
      return S.Array(__S(881, __c55, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), audienceExportJobs: __S(882, __c55, 2) }),
      ).annotate({ identifier: "ListAudienceExportJobsResponse" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          configuredAudienceModelArn: S.optional(S.String).pipe(
            T.HttpQuery("configuredAudienceModelArn"),
          ),
          collaborationId: S.optional(S.String).pipe(T.HttpQuery("collaborationId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/audience-generation-job" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAudienceGenerationJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          audienceGenerationJobArn: S.String,
          name: S.String,
          description: S.optional(S.String),
          status: S.String,
          configuredAudienceModelArn: S.String,
          collaborationId: S.optional(S.String),
          startedBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "AudienceGenerationJobSummary" });
    case 2:
      return S.Array(__S(897, __c56, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), audienceGenerationJobs: __S(898, __c56, 2) }),
      ).annotate({ identifier: "ListAudienceGenerationJobsResponse" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/audience-model" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListAudienceModelsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          audienceModelArn: S.String,
          name: S.String,
          trainingDatasetArn: S.String,
          status: S.String,
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "AudienceModelSummary" });
    case 2:
      return S.Array(__S(913, __c57, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), audienceModels: __S(914, __c57, 2) }),
      ).annotate({ identifier: "ListAudienceModelsResponse" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          collaborationIdentifier: S.String.pipe(T.HttpLabel("collaborationIdentifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/collaborations/{collaborationIdentifier}/configured-model-algorithm-associations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCollaborationConfiguredModelAlgorithmAssociationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          configuredModelAlgorithmAssociationArn: S.String,
          name: S.String,
          description: S.optional(S.String),
          membershipIdentifier: S.String,
          collaborationIdentifier: S.String,
          configuredModelAlgorithmArn: S.String,
          creatorAccountId: S.String,
        }),
      ).annotate({ identifier: "CollaborationConfiguredModelAlgorithmAssociationSummary" });
    case 2:
      return S.Array(__S(929, __c58, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          collaborationConfiguredModelAlgorithmAssociations: __S(930, __c58, 2),
        }),
      ).annotate({ identifier: "ListCollaborationConfiguredModelAlgorithmAssociationsResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          collaborationIdentifier: S.String.pipe(T.HttpLabel("collaborationIdentifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/collaborations/{collaborationIdentifier}/ml-input-channels",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCollaborationMLInputChannelsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          membershipIdentifier: S.String,
          collaborationIdentifier: S.String,
          name: S.String,
          configuredModelAlgorithmAssociations: __S(128, __c8, 0),
          mlInputChannelArn: S.String,
          status: S.String,
          creatorAccountId: S.String,
          description: S.optional(S.String),
          payerConfiguration: S.optional(__S(224, __c14, 0)),
        }),
      ).annotate({ identifier: "CollaborationMLInputChannelSummary" });
    case 2:
      return S.Array(__S(945, __c59, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          collaborationMLInputChannelsList: __S(946, __c59, 2),
        }),
      ).annotate({ identifier: "ListCollaborationMLInputChannelsResponse" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          collaborationIdentifier: S.String.pipe(T.HttpLabel("collaborationIdentifier")),
          trainedModelArn: S.String.pipe(T.HttpLabel("trainedModelArn")),
          trainedModelVersionIdentifier: S.optional(S.String).pipe(
            T.HttpQuery("trainedModelVersionIdentifier"),
          ),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/collaborations/{collaborationIdentifier}/trained-models/{trainedModelArn}/export-jobs",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCollaborationTrainedModelExportJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          name: S.String,
          outputConfiguration: __S(976, __c61, 0),
          status: S.String,
          statusDetails: S.optional(__S(528, __c33, 0)),
          description: S.optional(S.String),
          creatorAccountId: S.String,
          trainedModelArn: S.String,
          trainedModelVersionIdentifier: S.optional(S.String),
          membershipIdentifier: S.String,
          collaborationIdentifier: S.String,
        }),
      ).annotate({ identifier: "CollaborationTrainedModelExportJobSummary" });
    case 2:
      return S.Array(__S(961, __c60, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          collaborationTrainedModelExportJobs: __S(962, __c60, 2),
        }),
      ).annotate({ identifier: "ListCollaborationTrainedModelExportJobsResponse" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ members: __S(817, __c51, 1) })).annotate({
        identifier: "TrainedModelExportOutputConfiguration",
      });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          collaborationIdentifier: S.String.pipe(T.HttpLabel("collaborationIdentifier")),
          trainedModelArn: S.optional(S.String).pipe(T.HttpQuery("trainedModelArn")),
          trainedModelVersionIdentifier: S.optional(S.String).pipe(
            T.HttpQuery("trainedModelVersionIdentifier"),
          ),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/collaborations/{collaborationIdentifier}/trained-model-inference-jobs",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCollaborationTrainedModelInferenceJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          trainedModelInferenceJobArn: S.String,
          configuredModelAlgorithmAssociationArn: S.optional(S.String),
          membershipIdentifier: S.String,
          trainedModelArn: S.String,
          trainedModelVersionIdentifier: S.optional(S.String),
          collaborationIdentifier: S.String,
          status: S.String,
          outputConfiguration: __S(832, __c52, 0),
          name: S.String,
          description: S.optional(S.String),
          metricsStatus: S.optional(S.String),
          metricsStatusDetails: S.optional(S.String),
          logsStatus: S.optional(S.String),
          logsStatusDetails: S.optional(S.String),
          mlModelInferencePayerAccountId: S.optional(S.String),
          createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          creatorAccountId: S.String,
        }),
      ).annotate({ identifier: "CollaborationTrainedModelInferenceJobSummary" });
    case 2:
      return S.Array(__S(993, __c62, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          collaborationTrainedModelInferenceJobs: __S(994, __c62, 2),
        }),
      ).annotate({ identifier: "ListCollaborationTrainedModelInferenceJobsResponse" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          collaborationIdentifier: S.String.pipe(T.HttpLabel("collaborationIdentifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/collaborations/{collaborationIdentifier}/trained-models",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCollaborationTrainedModelsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          trainedModelArn: S.String,
          name: S.String,
          versionIdentifier: S.optional(S.String),
          incrementalTrainingDataChannels: S.optional(__S(657, __c41, 1)),
          description: S.optional(S.String),
          membershipIdentifier: S.String,
          collaborationIdentifier: S.String,
          status: S.String,
          configuredModelAlgorithmAssociationArn: S.String,
          creatorAccountId: S.String,
          mlModelTrainingPayerAccountId: S.optional(S.String),
        }),
      ).annotate({ identifier: "CollaborationTrainedModelSummary" });
    case 2:
      return S.Array(__S(1009, __c63, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          collaborationTrainedModels: __S(1010, __c63, 2),
        }),
      ).annotate({ identifier: "ListCollaborationTrainedModelsResponse" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/configured-audience-model" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListConfiguredAudienceModelsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          name: S.String,
          audienceModelArn: S.String,
          outputConfig: __S(64, __c4, 0),
          description: S.optional(S.String),
          configuredAudienceModelArn: S.String,
          status: S.String,
        }),
      ).annotate({ identifier: "ConfiguredAudienceModelSummary" });
    case 2:
      return S.Array(__S(1025, __c64, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          configuredAudienceModels: __S(1026, __c64, 2),
        }),
      ).annotate({ identifier: "ListConfiguredAudienceModelsResponse" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/memberships/{membershipIdentifier}/configured-model-algorithm-associations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListConfiguredModelAlgorithmAssociationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          configuredModelAlgorithmAssociationArn: S.String,
          configuredModelAlgorithmArn: S.String,
          name: S.String,
          description: S.optional(S.String),
          membershipIdentifier: S.String,
          collaborationIdentifier: S.String,
        }),
      ).annotate({ identifier: "ConfiguredModelAlgorithmAssociationSummary" });
    case 2:
      return S.Array(__S(1041, __c65, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          configuredModelAlgorithmAssociations: __S(1042, __c65, 2),
        }),
      ).annotate({ identifier: "ListConfiguredModelAlgorithmAssociationsResponse" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/configured-model-algorithms" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListConfiguredModelAlgorithmsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          configuredModelAlgorithmArn: S.String,
          name: S.String,
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConfiguredModelAlgorithmSummary" });
    case 2:
      return S.Array(__S(1057, __c66, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          configuredModelAlgorithms: __S(1058, __c66, 2),
        }),
      ).annotate({ identifier: "ListConfiguredModelAlgorithmsResponse" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/memberships/{membershipIdentifier}/ml-input-channels" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMLInputChannelsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          membershipIdentifier: S.String,
          collaborationIdentifier: S.String,
          name: S.String,
          configuredModelAlgorithmAssociations: __S(128, __c8, 0),
          protectedQueryIdentifier: S.optional(S.String),
          mlInputChannelArn: S.String,
          status: S.String,
          description: S.optional(S.String),
          payerConfiguration: S.optional(__S(224, __c14, 0)),
        }),
      ).annotate({ identifier: "MLInputChannelSummary" });
    case 2:
      return S.Array(__S(1073, __c67, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), mlInputChannelsList: __S(1074, __c67, 2) }),
      ).annotate({ identifier: "ListMLInputChannelsResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: __S(1392, __c87, 0) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
          trainedModelArn: S.optional(S.String).pipe(T.HttpQuery("trainedModelArn")),
          trainedModelVersionIdentifier: S.optional(S.String).pipe(
            T.HttpQuery("trainedModelVersionIdentifier"),
          ),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/memberships/{membershipIdentifier}/trained-model-inference-jobs",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTrainedModelInferenceJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          trainedModelInferenceJobArn: S.String,
          configuredModelAlgorithmAssociationArn: S.optional(S.String),
          membershipIdentifier: S.String,
          trainedModelArn: S.String,
          trainedModelVersionIdentifier: S.optional(S.String),
          collaborationIdentifier: S.String,
          status: S.String,
          outputConfiguration: __S(832, __c52, 0),
          name: S.String,
          description: S.optional(S.String),
          metricsStatus: S.optional(S.String),
          metricsStatusDetails: S.optional(S.String),
          logsStatus: S.optional(S.String),
          logsStatusDetails: S.optional(S.String),
          mlModelInferencePayerAccountId: S.optional(S.String),
          createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "TrainedModelInferenceJobSummary" });
    case 2:
      return S.Array(__S(1105, __c69, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          trainedModelInferenceJobs: __S(1106, __c69, 2),
        }),
      ).annotate({ identifier: "ListTrainedModelInferenceJobsResponse" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/memberships/{membershipIdentifier}/trained-models" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTrainedModelsRequest" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          trainedModelArn: S.String,
          versionIdentifier: S.optional(S.String),
          incrementalTrainingDataChannels: S.optional(__S(657, __c41, 1)),
          name: S.String,
          description: S.optional(S.String),
          membershipIdentifier: S.String,
          collaborationIdentifier: S.String,
          status: S.String,
          configuredModelAlgorithmAssociationArn: S.String,
          mlModelTrainingPayerAccountId: S.optional(S.String),
        }),
      ).annotate({ identifier: "TrainedModelSummary" });
    case 1:
      return S.Array(__S(1136, __c71, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), trainedModels: __S(1137, __c71, 1) }),
      ).annotate({ identifier: "ListTrainedModelsResponse" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
          trainedModelArn: S.String.pipe(T.HttpLabel("trainedModelArn")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/memberships/{membershipIdentifier}/trained-models/{trainedModelArn}/versions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTrainedModelVersionsRequest" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/training-dataset" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTrainingDatasetsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          createTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          trainingDatasetArn: S.String,
          name: S.String,
          status: S.String,
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "TrainingDatasetSummary" });
    case 2:
      return S.Array(__S(1169, __c73, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), trainingDatasets: __S(1170, __c73, 2) }),
      ).annotate({ identifier: "ListTrainingDatasetsResponse" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          configuredAudienceModelArn: S.String.pipe(T.HttpLabel("configuredAudienceModelArn")),
          configuredAudienceModelPolicy: S.String,
          previousPolicyHash: S.optional(S.String),
          policyExistenceCondition: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/configured-audience-model/{configuredAudienceModelArn}/policy",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutConfiguredAudienceModelPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ configuredAudienceModelPolicy: S.String, policyHash: S.String }),
      ).annotate({ identifier: "PutConfiguredAudienceModelPolicyResponse" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
          defaultOutputLocation: __S(752, __c47, 0),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/memberships/{membershipIdentifier}/ml-configurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutMLConfigurationRequest" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          audienceGenerationJobArn: S.String,
          audienceSize: __S(544, __c34, 0),
          description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/audience-export-job" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartAudienceExportJobRequest" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          configuredAudienceModelArn: S.String,
          seedAudience: __S(560, __c35, 0),
          includeSeedInOutput: S.optional(S.Boolean),
          collaborationId: S.optional(S.String),
          description: S.optional(S.String),
          tags: S.optional(__S(1392, __c87, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/audience-generation-job" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartAudienceGenerationJobRequest" });
    case 1:
      return S.suspend(() => S.Struct({ audienceGenerationJobArn: S.String })).annotate({
        identifier: "StartAudienceGenerationJobResponse",
      });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          trainedModelArn: S.String.pipe(T.HttpLabel("trainedModelArn")),
          trainedModelVersionIdentifier: S.optional(S.String),
          membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
          outputConfiguration: __S(976, __c61, 0),
          description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/memberships/{membershipIdentifier}/trained-models/{trainedModelArn}/export-jobs",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartTrainedModelExportJobRequest" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
          name: S.String,
          trainedModelArn: S.String,
          trainedModelVersionIdentifier: S.optional(S.String),
          configuredModelAlgorithmAssociationArn: S.optional(S.String),
          resourceConfig: __S(848, __c53, 0),
          outputConfiguration: __S(832, __c52, 0),
          dataSource: __S(256, __c16, 0),
          description: S.optional(S.String),
          containerExecutionParameters: S.optional(__S(849, __c53, 1)),
          environment: S.optional(__S(1392, __c87, 0)),
          kmsKeyArn: S.optional(S.String),
          tags: S.optional(__S(1392, __c87, 0)),
          mlModelInferencePayerAccountId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/memberships/{membershipIdentifier}/trained-model-inference-jobs",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartTrainedModelInferenceJobRequest" });
    case 1:
      return S.suspend(() => S.Struct({ trainedModelInferenceJobArn: S.String })).annotate({
        identifier: "StartTrainedModelInferenceJobResponse",
      });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(1392, __c87, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{resourceArn}" }),
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
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(128, __c8, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{resourceArn}" }),
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
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          configuredAudienceModelArn: S.String.pipe(T.HttpLabel("configuredAudienceModelArn")),
          outputConfig: S.optional(__S(64, __c4, 0)),
          audienceModelArn: S.optional(S.String),
          sharedAudienceMetrics: S.optional(__S(16, __c1, 0)),
          minMatchingSeedSize: S.optional(S.Number),
          audienceSizeConfig: S.optional(__S(81, __c5, 1)),
          description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/configured-audience-model/{configuredAudienceModelArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateConfiguredAudienceModelRequest" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
          trainedModelArn: S.String.pipe(T.HttpLabel("trainedModelArn")),
          versionIdentifier: S.optional(S.String).pipe(T.HttpQuery("versionIdentifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/memberships/{membershipIdentifier}/trained-models/{trainedModelArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelTrainedModelRequest" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "CancelTrainedModelResponse" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          membershipIdentifier: S.String.pipe(T.HttpLabel("membershipIdentifier")),
          trainedModelInferenceJobArn: S.String.pipe(T.HttpLabel("trainedModelInferenceJobArn")),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/memberships/{membershipIdentifier}/trained-model-inference-jobs/{trainedModelInferenceJobArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelTrainedModelInferenceJobRequest" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          trainingDataStartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          trainingDataEndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          name: S.String,
          trainingDatasetArn: S.String,
          kmsKeyArn: S.optional(S.String),
          tags: S.optional(__S(1392, __c87, 0)),
          description: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/audience-model" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateAudienceModelRequest" });
    case 1:
      return S.suspend(() => S.Struct({ audienceModelArn: S.String })).annotate({
        identifier: "CreateAudienceModelResponse",
      });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
