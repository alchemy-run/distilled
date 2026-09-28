import type * as HttpClient from "effect/unstable/http/HttpClient";
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
  sdkId: "CleanRoomsML",
  target: "AWSStarkControlService",
  version: "2023-09-06",
  sigv4: "cleanrooms-ml",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://cleanrooms-ml.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://cleanrooms-ml.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class InternalServiceException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServiceException",
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
  )<{
    readonly message: string;
    readonly quotaName?: string;
    readonly quotaValue?: number;
  }> {}
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
export type WorkerComputeConfigurationProperties = {
  spark: { [key: string]: string | undefined };
};
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
export type S3DataDistributionType =
  | "FullyReplicated"
  | "ShardedByS3Key"
  | (string & {});
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
export type SyntheticDataColumnType =
  | "CATEGORICAL"
  | "NUMERICAL"
  | (string & {});
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
export type MembershipInferenceAttackVersion =
  | "DISTANCE_TO_CLOSEST_RECORD_V1"
  | (string & {});
export interface MembershipInferenceAttackScore {
  attackVersion: MembershipInferenceAttackVersion;
  score: number;
}
export type MembershipInferenceAttackScoreList =
  MembershipInferenceAttackScore[];
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
export type IncrementalTrainingDataChannelsOutput =
  IncrementalTrainingDataChannelOutput[];
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
export type MetricsStatus =
  | "PUBLISH_SUCCEEDED"
  | "PUBLISH_FAILED"
  | (string & {});
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
export type CollaborationMLInputChannelsList =
  CollaborationMLInputChannelSummary[];
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
export type TrainedModelExportReceiverMembers =
  TrainedModelExportReceiverMember[];
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
export type CollaborationTrainedModelExportJobList =
  CollaborationTrainedModelExportJobSummary[];
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
export type ConfiguredModelAlgorithmAssociationList =
  ConfiguredModelAlgorithmAssociationSummary[];
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
  descriptor: {
    service: svc,
    http: "PATCH /memberships/{membershipIdentifier}/trained-models/{trainedModelArn}",
    input: {
      membershipIdentifier: 0,
      trainedModelArn: 0,
      versionIdentifier: D.m({ query: "versionIdentifier" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /memberships/{membershipIdentifier}/trained-model-inference-jobs/{trainedModelInferenceJobArn}",
    input: { membershipIdentifier: 0, trainedModelInferenceJobArn: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /audience-model",
    input: {
      trainingDataStartTime: D.tsAs("date-time"),
      trainingDataEndTime: D.tsAs("date-time"),
      name: 0,
      trainingDatasetArn: 0,
      kmsKeyArn: 0,
      tags: 0,
      description: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /configured-audience-model",
    input: {
      name: 0,
      audienceModelArn: 0,
      outputConfig: i_ConfiguredAudienceModelOutputConfig,
      description: 0,
      sharedAudienceMetrics: 0,
      minMatchingSeedSize: 0,
      audienceSizeConfig: i_AudienceSizeConfig,
      tags: 0,
      childResourceTagOnCreatePolicy: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /configured-model-algorithms",
    input: {
      name: 0,
      description: 0,
      roleArn: 0,
      trainingContainerConfig: {
        imageUri: 0,
        entrypoint: 0,
        arguments: 0,
        metricDefinitions: D.list({ name: 0, regex: 0 }),
      },
      inferenceContainerConfig: { imageUri: 0 },
      tags: 0,
      kmsKeyArn: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /memberships/{membershipIdentifier}/configured-model-algorithm-associations",
    input: {
      membershipIdentifier: 0,
      configuredModelAlgorithmArn: 0,
      name: 0,
      description: 0,
      privacyConfiguration: {
        policies: {
          trainedModels: {
            containerLogs: D.list(i_LogsConfigurationPolicy),
            containerMetrics: { noiseLevel: 0 },
            maxArtifactSize: { unit: 0, value: 0 },
          },
          trainedModelExports: {
            maxSize: { unit: 0, value: 0 },
            filesToExport: 0,
          },
          trainedModelInferenceJobs: {
            containerLogs: D.list(i_LogsConfigurationPolicy),
            maxOutputSize: { unit: 0, value: 0 },
          },
        },
      },
      tags: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /memberships/{membershipIdentifier}/ml-input-channels",
    input: {
      membershipIdentifier: 0,
      configuredModelAlgorithmAssociations: 0,
      inputChannel: {
        dataSource: {
          protectedQueryInputParameters: {
            sqlParameters: i_ProtectedQuerySQLParameters,
            computeConfiguration: i_ComputeConfiguration,
            resultFormat: 0,
          },
        },
        roleArn: 0,
      },
      name: 0,
      retentionInDays: 0,
      description: 0,
      kmsKeyArn: 0,
      tags: 0,
      payerConfiguration: {
        computePayerAccountId: 0,
        syntheticDataPayerAccountId: 0,
      },
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /memberships/{membershipIdentifier}/trained-models",
    input: {
      membershipIdentifier: 0,
      name: 0,
      configuredModelAlgorithmAssociationArn: 0,
      hyperparameters: 0,
      environment: 0,
      resourceConfig: { instanceCount: 0, instanceType: 0, volumeSizeInGB: 0 },
      stoppingCondition: { maxRuntimeInSeconds: 0 },
      incrementalTrainingDataChannels: D.list({
        trainedModelArn: 0,
        versionIdentifier: 0,
        channelName: 0,
      }),
      dataChannels: D.list({
        mlInputChannelArn: 0,
        channelName: 0,
        s3DataDistributionType: 0,
      }),
      trainingInputMode: 0,
      description: 0,
      kmsKeyArn: 0,
      tags: 0,
      mlModelTrainingPayerAccountId: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /training-dataset",
    input: {
      name: 0,
      roleArn: 0,
      trainingData: D.list({
        type: 0,
        inputConfig: {
          schema: D.list({ columnName: 0, columnTypes: 0 }),
          dataSource: {
            glueDataSource: { tableName: 0, databaseName: 0, catalogId: 0 },
          },
        },
      }),
      tags: 0,
      description: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTrainingDataset",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /audience-generation-job/{audienceGenerationJobArn}",
    input: { audienceGenerationJobArn: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /audience-model/{audienceModelArn}",
    input: { audienceModelArn: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /configured-audience-model/{configuredAudienceModelArn}",
    input: { configuredAudienceModelArn: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /configured-audience-model/{configuredAudienceModelArn}/policy",
    input: { configuredAudienceModelArn: 0 },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfiguredAudienceModelPolicy",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /configured-model-algorithms/{configuredModelAlgorithmArn}",
    input: { configuredModelAlgorithmArn: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /memberships/{membershipIdentifier}/configured-model-algorithm-associations/{configuredModelAlgorithmAssociationArn}",
    input: {
      configuredModelAlgorithmAssociationArn: 0,
      membershipIdentifier: 0,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /memberships/{membershipIdentifier}/ml-configurations",
    input: { membershipIdentifier: 0 },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMLConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /memberships/{membershipIdentifier}/ml-input-channels/{mlInputChannelArn}",
    input: { mlInputChannelArn: 0, membershipIdentifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /memberships/{membershipIdentifier}/trained-models/{trainedModelArn}",
    input: {
      trainedModelArn: 0,
      membershipIdentifier: 0,
      versionIdentifier: D.m({ query: "versionIdentifier" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /training-dataset/{trainingDatasetArn}",
    input: { trainingDatasetArn: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /audience-generation-job/{audienceGenerationJobArn}",
    input: { audienceGenerationJobArn: 0 },
    output: { createTime: D.ts, updateTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAudienceGenerationJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /audience-model/{audienceModelArn}",
    input: { audienceModelArn: 0 },
    output: {
      createTime: D.ts,
      updateTime: D.ts,
      trainingDataStartTime: D.ts,
      trainingDataEndTime: D.ts,
    },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAudienceModel",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /collaborations/{collaborationIdentifier}/configured-model-algorithm-associations/{configuredModelAlgorithmAssociationArn}",
    input: {
      configuredModelAlgorithmAssociationArn: 0,
      collaborationIdentifier: 0,
    },
    output: { createTime: D.ts, updateTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCollaborationConfiguredModelAlgorithmAssociation",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /collaborations/{collaborationIdentifier}/ml-input-channels/{mlInputChannelArn}",
    input: { mlInputChannelArn: 0, collaborationIdentifier: 0 },
    output: {
      privacyBudgets: o_PrivacyBudgets,
      createTime: D.ts,
      updateTime: D.ts,
    },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCollaborationMLInputChannel",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /collaborations/{collaborationIdentifier}/trained-models/{trainedModelArn}",
    input: {
      trainedModelArn: 0,
      collaborationIdentifier: 0,
      versionIdentifier: D.m({ query: "versionIdentifier" }),
    },
    output: { createTime: D.ts, updateTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCollaborationTrainedModel",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /configured-audience-model/{configuredAudienceModelArn}",
    input: { configuredAudienceModelArn: 0 },
    output: { createTime: D.ts, updateTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfiguredAudienceModel",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /configured-audience-model/{configuredAudienceModelArn}/policy",
    input: { configuredAudienceModelArn: 0 },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfiguredAudienceModelPolicy",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /configured-model-algorithms/{configuredModelAlgorithmArn}",
    input: { configuredModelAlgorithmArn: 0 },
    output: { createTime: D.ts, updateTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfiguredModelAlgorithm",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /memberships/{membershipIdentifier}/configured-model-algorithm-associations/{configuredModelAlgorithmAssociationArn}",
    input: {
      configuredModelAlgorithmAssociationArn: 0,
      membershipIdentifier: 0,
    },
    output: { createTime: D.ts, updateTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfiguredModelAlgorithmAssociation",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /memberships/{membershipIdentifier}/ml-configurations",
    input: { membershipIdentifier: 0 },
    output: { createTime: D.ts, updateTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMLConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /memberships/{membershipIdentifier}/ml-input-channels/{mlInputChannelArn}",
    input: { mlInputChannelArn: 0, membershipIdentifier: 0 },
    output: {
      privacyBudgets: o_PrivacyBudgets,
      createTime: D.ts,
      updateTime: D.ts,
    },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMLInputChannel",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /memberships/{membershipIdentifier}/trained-models/{trainedModelArn}",
    input: {
      trainedModelArn: 0,
      membershipIdentifier: 0,
      versionIdentifier: D.m({ query: "versionIdentifier" }),
    },
    output: { createTime: D.ts, updateTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrainedModel",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /memberships/{membershipIdentifier}/trained-model-inference-jobs/{trainedModelInferenceJobArn}",
    input: { membershipIdentifier: 0, trainedModelInferenceJobArn: 0 },
    output: { createTime: D.ts, updateTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrainedModelInferenceJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /training-dataset/{trainingDatasetArn}",
    input: { trainingDatasetArn: 0 },
    output: { createTime: D.ts, updateTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrainingDataset",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /audience-export-job",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      audienceGenerationJobArn: D.m({ query: "audienceGenerationJobArn" }),
    },
    output: {
      audienceExportJobs: D.list({ createTime: D.ts, updateTime: D.ts }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /audience-generation-job",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      configuredAudienceModelArn: D.m({ query: "configuredAudienceModelArn" }),
      collaborationId: D.m({ query: "collaborationId" }),
    },
    output: {
      audienceGenerationJobs: D.list({ createTime: D.ts, updateTime: D.ts }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /audience-model",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { audienceModels: D.list({ createTime: D.ts, updateTime: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /collaborations/{collaborationIdentifier}/configured-model-algorithm-associations",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      collaborationIdentifier: 0,
    },
    output: {
      collaborationConfiguredModelAlgorithmAssociations: D.list({
        createTime: D.ts,
        updateTime: D.ts,
      }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /collaborations/{collaborationIdentifier}/ml-input-channels",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      collaborationIdentifier: 0,
    },
    output: {
      collaborationMLInputChannelsList: D.list({
        createTime: D.ts,
        updateTime: D.ts,
      }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /collaborations/{collaborationIdentifier}/trained-models/{trainedModelArn}/export-jobs",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      collaborationIdentifier: 0,
      trainedModelArn: 0,
      trainedModelVersionIdentifier: D.m({
        query: "trainedModelVersionIdentifier",
      }),
    },
    output: {
      collaborationTrainedModelExportJobs: D.list({
        createTime: D.ts,
        updateTime: D.ts,
      }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /collaborations/{collaborationIdentifier}/trained-model-inference-jobs",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      collaborationIdentifier: 0,
      trainedModelArn: D.m({ query: "trainedModelArn" }),
      trainedModelVersionIdentifier: D.m({
        query: "trainedModelVersionIdentifier",
      }),
    },
    output: {
      collaborationTrainedModelInferenceJobs: D.list({
        createTime: D.ts,
        updateTime: D.ts,
      }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /collaborations/{collaborationIdentifier}/trained-models",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      collaborationIdentifier: 0,
    },
    output: {
      collaborationTrainedModels: D.list({
        createTime: D.ts,
        updateTime: D.ts,
      }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /configured-audience-model",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      configuredAudienceModels: D.list({ createTime: D.ts, updateTime: D.ts }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /memberships/{membershipIdentifier}/configured-model-algorithm-associations",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      membershipIdentifier: 0,
    },
    output: {
      configuredModelAlgorithmAssociations: D.list({
        createTime: D.ts,
        updateTime: D.ts,
      }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /configured-model-algorithms",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      configuredModelAlgorithms: D.list({ createTime: D.ts, updateTime: D.ts }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /memberships/{membershipIdentifier}/ml-input-channels",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      membershipIdentifier: 0,
    },
    output: {
      mlInputChannelsList: D.list({ createTime: D.ts, updateTime: D.ts }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /memberships/{membershipIdentifier}/trained-model-inference-jobs",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      membershipIdentifier: 0,
      trainedModelArn: D.m({ query: "trainedModelArn" }),
      trainedModelVersionIdentifier: D.m({
        query: "trainedModelVersionIdentifier",
      }),
    },
    output: {
      trainedModelInferenceJobs: D.list({ createTime: D.ts, updateTime: D.ts }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /memberships/{membershipIdentifier}/trained-models",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      membershipIdentifier: 0,
    },
    output: { trainedModels: D.list(o_TrainedModelSummary) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /memberships/{membershipIdentifier}/trained-models/{trainedModelArn}/versions",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      membershipIdentifier: 0,
      trainedModelArn: 0,
      status: D.m({ query: "status" }),
    },
    output: { trainedModels: D.list(o_TrainedModelSummary) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /training-dataset",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      trainingDatasets: D.list({ createTime: D.ts, updateTime: D.ts }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "PUT /configured-audience-model/{configuredAudienceModelArn}/policy",
    input: {
      configuredAudienceModelArn: 0,
      configuredAudienceModelPolicy: 0,
      previousPolicyHash: 0,
      policyExistenceCondition: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfiguredAudienceModelPolicy",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /memberships/{membershipIdentifier}/ml-configurations",
    input: {
      membershipIdentifier: 0,
      defaultOutputLocation: {
        destination: { s3Destination: i_S3ConfigMap },
        roleArn: 0,
      },
    },
    body: true,
  },
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutMLConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /audience-export-job",
    input: {
      name: 0,
      audienceGenerationJobArn: 0,
      audienceSize: { type: 0, value: 0 },
      description: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /audience-generation-job",
    input: {
      name: 0,
      configuredAudienceModelArn: 0,
      seedAudience: {
        dataSource: i_S3ConfigMap,
        roleArn: 0,
        sqlParameters: i_ProtectedQuerySQLParameters,
        sqlComputeConfiguration: i_ComputeConfiguration,
      },
      includeSeedInOutput: 0,
      collaborationId: 0,
      description: 0,
      tags: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /memberships/{membershipIdentifier}/trained-models/{trainedModelArn}/export-jobs",
    input: {
      name: 0,
      trainedModelArn: 0,
      trainedModelVersionIdentifier: 0,
      membershipIdentifier: 0,
      outputConfiguration: { members: D.list({ accountId: 0 }) },
      description: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /memberships/{membershipIdentifier}/trained-model-inference-jobs",
    input: {
      membershipIdentifier: 0,
      name: 0,
      trainedModelArn: 0,
      trainedModelVersionIdentifier: 0,
      configuredModelAlgorithmAssociationArn: 0,
      resourceConfig: { instanceType: 0, instanceCount: 0 },
      outputConfiguration: { accept: 0, members: D.list({ accountId: 0 }) },
      dataSource: { mlInputChannelArn: 0 },
      description: 0,
      containerExecutionParameters: { maxPayloadInMB: 0 },
      environment: 0,
      kmsKeyArn: 0,
      tags: 0,
      mlModelInferencePayerAccountId: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /configured-audience-model/{configuredAudienceModelArn}",
    input: {
      configuredAudienceModelArn: 0,
      outputConfig: i_ConfiguredAudienceModelOutputConfig,
      audienceModelArn: 0,
      sharedAudienceMetrics: 0,
      minMatchingSeedSize: 0,
      audienceSizeConfig: i_AudienceSizeConfig,
      description: 0,
    },
    body: true,
  },
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
})) as any;

const i_AudienceSizeConfig: D.LazyStruct = () => ({
  audienceSizeType: 0,
  audienceSizeBins: 0,
});
const i_ComputeConfiguration: D.LazyStruct = () => ({
  worker: { type: 0, number: 0, properties: { spark: 0 } },
});
const i_ConfiguredAudienceModelOutputConfig: D.LazyStruct = () => ({
  destination: { s3Destination: i_S3ConfigMap },
  roleArn: 0,
});
const i_LogsConfigurationPolicy: D.LazyStruct = () => ({
  allowedAccountIds: 0,
  filterPattern: 0,
  logType: 0,
  logRedactionConfiguration: {
    entitiesToRedact: 0,
    customEntityConfig: { customDataIdentifiers: 0 },
  },
});
const i_ProtectedQuerySQLParameters: D.LazyStruct = () => ({
  queryString: 0,
  analysisTemplateArn: 0,
  parameters: 0,
});
const i_S3ConfigMap: D.LazyStruct = () => ({ s3Uri: 0 });
const o_PrivacyBudgets: D.LazyStruct = () => ({
  accessBudgets: D.list({
    details: D.list({ startTime: D.ts, endTime: D.ts }),
  }),
});
const o_TrainedModelSummary: D.LazyStruct = () => ({
  createTime: D.ts,
  updateTime: D.ts,
});
