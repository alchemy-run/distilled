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
  sdkId: "Pipes",
  target: "Pipes",
  version: "2015-10-07",
  sigv4: "pipes",
  protocol: restJson1Protocol,
  xmlns: "http://events.amazonaws.com/doc/2015-10-07",
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
                `https://pipes-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://pipes-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://pipes.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://pipes.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
  }> {}
export class InternalException
  extends /*@__PURE__*/ TE.TaggedError("InternalException", ["ServerError"], {
    status: 500,
    headers: { retryAfterSeconds: ["Retry-After", "num"] },
  })<{ readonly message: string; readonly retryAfterSeconds?: number }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
    readonly serviceCode: string;
    readonly quotaCode: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{
    readonly message: string;
    readonly serviceCode?: string;
    readonly quotaCode?: string;
    readonly retryAfterSeconds?: number;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message?: string;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
export type PipeName = string;
export type PipeDescription = string | redacted.Redacted<string>;
export type RequestedPipeState = string;
export type ArnOrUrl = string;
export type EventPattern = string | redacted.Redacted<string>;
export interface Filter {
  Pattern?: string | redacted.Redacted<string>;
}
export type FilterList = Filter[];
export interface FilterCriteria {
  Filters?: Filter[];
}
export type LimitMax10000 = number;
export type Arn = string;
export interface DeadLetterConfig {
  Arn?: string;
}
export type OnPartialBatchItemFailureStreams = string;
export type MaximumBatchingWindowInSeconds = number;
export type MaximumRecordAgeInSeconds = number;
export type MaximumRetryAttemptsESM = number;
export type LimitMax10 = number;
export type KinesisStreamStartPosition = string;
export interface PipeSourceKinesisStreamParameters {
  BatchSize?: number;
  DeadLetterConfig?: DeadLetterConfig;
  OnPartialBatchItemFailure?: string;
  MaximumBatchingWindowInSeconds?: number;
  MaximumRecordAgeInSeconds?: number;
  MaximumRetryAttempts?: number;
  ParallelizationFactor?: number;
  StartingPosition: string;
  StartingPositionTimestamp?: Date;
}
export type DynamoDBStreamStartPosition = string;
export interface PipeSourceDynamoDBStreamParameters {
  BatchSize?: number;
  DeadLetterConfig?: DeadLetterConfig;
  OnPartialBatchItemFailure?: string;
  MaximumBatchingWindowInSeconds?: number;
  MaximumRecordAgeInSeconds?: number;
  MaximumRetryAttempts?: number;
  ParallelizationFactor?: number;
  StartingPosition: string;
}
export interface PipeSourceSqsQueueParameters {
  BatchSize?: number;
  MaximumBatchingWindowInSeconds?: number;
}
export type SecretManagerArn = string;
export type MQBrokerAccessCredentials = { BasicAuth: string };
export type MQBrokerQueueName = string | redacted.Redacted<string>;
export interface PipeSourceActiveMQBrokerParameters {
  Credentials: MQBrokerAccessCredentials;
  QueueName: string | redacted.Redacted<string>;
  BatchSize?: number;
  MaximumBatchingWindowInSeconds?: number;
}
export type URI = string | redacted.Redacted<string>;
export interface PipeSourceRabbitMQBrokerParameters {
  Credentials: MQBrokerAccessCredentials;
  QueueName: string | redacted.Redacted<string>;
  VirtualHost?: string | redacted.Redacted<string>;
  BatchSize?: number;
  MaximumBatchingWindowInSeconds?: number;
}
export type KafkaTopicName = string | redacted.Redacted<string>;
export type MSKStartPosition = string;
export type MSKAccessCredentials =
  | { SaslScram512Auth: string; ClientCertificateTlsAuth?: never }
  | { SaslScram512Auth?: never; ClientCertificateTlsAuth: string };
export interface PipeSourceManagedStreamingKafkaParameters {
  TopicName: string | redacted.Redacted<string>;
  StartingPosition?: string;
  BatchSize?: number;
  MaximumBatchingWindowInSeconds?: number;
  ConsumerGroupID?: string | redacted.Redacted<string>;
  Credentials?: MSKAccessCredentials;
}
export type SelfManagedKafkaStartPosition = string;
export type EndpointString = string | redacted.Redacted<string>;
export type KafkaBootstrapServers = (string | redacted.Redacted<string>)[];
export type SelfManagedKafkaAccessConfigurationCredentials =
  | {
      BasicAuth: string;
      SaslScram512Auth?: never;
      SaslScram256Auth?: never;
      ClientCertificateTlsAuth?: never;
    }
  | {
      BasicAuth?: never;
      SaslScram512Auth: string;
      SaslScram256Auth?: never;
      ClientCertificateTlsAuth?: never;
    }
  | {
      BasicAuth?: never;
      SaslScram512Auth?: never;
      SaslScram256Auth: string;
      ClientCertificateTlsAuth?: never;
    }
  | {
      BasicAuth?: never;
      SaslScram512Auth?: never;
      SaslScram256Auth?: never;
      ClientCertificateTlsAuth: string;
    };
export type SubnetId = string | redacted.Redacted<string>;
export type SubnetIds = (string | redacted.Redacted<string>)[];
export type SecurityGroupId = string | redacted.Redacted<string>;
export type SecurityGroupIds = (string | redacted.Redacted<string>)[];
export interface SelfManagedKafkaAccessConfigurationVpc {
  Subnets?: (string | redacted.Redacted<string>)[];
  SecurityGroup?: (string | redacted.Redacted<string>)[];
}
export interface PipeSourceSelfManagedKafkaParameters {
  TopicName: string | redacted.Redacted<string>;
  StartingPosition?: string;
  AdditionalBootstrapServers?: (string | redacted.Redacted<string>)[];
  BatchSize?: number;
  MaximumBatchingWindowInSeconds?: number;
  ConsumerGroupID?: string | redacted.Redacted<string>;
  Credentials?: SelfManagedKafkaAccessConfigurationCredentials;
  ServerRootCaCertificate?: string;
  Vpc?: SelfManagedKafkaAccessConfigurationVpc;
}
export interface PipeSourceParameters {
  FilterCriteria?: FilterCriteria;
  KinesisStreamParameters?: PipeSourceKinesisStreamParameters;
  DynamoDBStreamParameters?: PipeSourceDynamoDBStreamParameters;
  SqsQueueParameters?: PipeSourceSqsQueueParameters;
  ActiveMQBrokerParameters?: PipeSourceActiveMQBrokerParameters;
  RabbitMQBrokerParameters?: PipeSourceRabbitMQBrokerParameters;
  ManagedStreamingKafkaParameters?: PipeSourceManagedStreamingKafkaParameters;
  SelfManagedKafkaParameters?: PipeSourceSelfManagedKafkaParameters;
}
export type OptionalArn = string;
export type InputTemplate = string | redacted.Redacted<string>;
export type PathParameter = string | redacted.Redacted<string>;
export type PathParameterList = (string | redacted.Redacted<string>)[];
export type HeaderKey = string;
export type HeaderValue = string | redacted.Redacted<string>;
export type HeaderParametersMap = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export type QueryStringKey = string;
export type QueryStringValue = string | redacted.Redacted<string>;
export type QueryStringParametersMap = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export interface PipeEnrichmentHttpParameters {
  PathParameterValues?: (string | redacted.Redacted<string>)[];
  HeaderParameters?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  QueryStringParameters?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
}
export interface PipeEnrichmentParameters {
  InputTemplate?: string | redacted.Redacted<string>;
  HttpParameters?: PipeEnrichmentHttpParameters;
}
export type PipeTargetInvocationType = string;
export interface PipeTargetLambdaFunctionParameters {
  InvocationType?: string;
}
export interface PipeTargetStateMachineParameters {
  InvocationType?: string;
}
export type KinesisPartitionKey = string | redacted.Redacted<string>;
export interface PipeTargetKinesisStreamParameters {
  PartitionKey: string | redacted.Redacted<string>;
}
export type ArnOrJsonPath = string;
export type LimitMin1 = number;
export type LaunchType = string;
export type Subnet = string | redacted.Redacted<string>;
export type Subnets = (string | redacted.Redacted<string>)[];
export type SecurityGroup = string | redacted.Redacted<string>;
export type SecurityGroups = (string | redacted.Redacted<string>)[];
export type AssignPublicIp = string;
export interface AwsVpcConfiguration {
  Subnets: (string | redacted.Redacted<string>)[];
  SecurityGroups?: (string | redacted.Redacted<string>)[];
  AssignPublicIp?: string;
}
export interface NetworkConfiguration {
  awsvpcConfiguration?: AwsVpcConfiguration;
}
export type CapacityProvider = string | redacted.Redacted<string>;
export type CapacityProviderStrategyItemWeight = number;
export type CapacityProviderStrategyItemBase = number;
export interface CapacityProviderStrategyItem {
  capacityProvider: string | redacted.Redacted<string>;
  weight?: number;
  base?: number;
}
export type CapacityProviderStrategy = CapacityProviderStrategyItem[];
export type PlacementConstraintType = string;
export type PlacementConstraintExpression = string | redacted.Redacted<string>;
export interface PlacementConstraint {
  type?: string;
  expression?: string | redacted.Redacted<string>;
}
export type PlacementConstraints = PlacementConstraint[];
export type PlacementStrategyType = string;
export type PlacementStrategyField = string | redacted.Redacted<string>;
export interface PlacementStrategy {
  type?: string;
  field?: string | redacted.Redacted<string>;
}
export type PlacementStrategies = PlacementStrategy[];
export type PropagateTags = string;
export type ReferenceId = string | redacted.Redacted<string>;
export type StringList = string[];
export interface EcsEnvironmentVariable {
  name?: string;
  value?: string;
}
export type EcsEnvironmentVariableList = EcsEnvironmentVariable[];
export type EcsEnvironmentFileType = string;
export interface EcsEnvironmentFile {
  type: string;
  value: string;
}
export type EcsEnvironmentFileList = EcsEnvironmentFile[];
export type EcsResourceRequirementType = string;
export interface EcsResourceRequirement {
  type: string;
  value: string;
}
export type EcsResourceRequirementsList = EcsResourceRequirement[];
export interface EcsContainerOverride {
  Command?: string[];
  Cpu?: number;
  Environment?: EcsEnvironmentVariable[];
  EnvironmentFiles?: EcsEnvironmentFile[];
  Memory?: number;
  MemoryReservation?: number;
  Name?: string;
  ResourceRequirements?: EcsResourceRequirement[];
}
export type EcsContainerOverrideList = EcsContainerOverride[];
export type EphemeralStorageSize = number;
export interface EcsEphemeralStorage {
  sizeInGiB: number;
}
export interface EcsInferenceAcceleratorOverride {
  deviceName?: string;
  deviceType?: string;
}
export type EcsInferenceAcceleratorOverrideList =
  EcsInferenceAcceleratorOverride[];
export interface EcsTaskOverride {
  ContainerOverrides?: EcsContainerOverride[];
  Cpu?: string;
  EphemeralStorage?: EcsEphemeralStorage;
  ExecutionRoleArn?: string;
  InferenceAcceleratorOverrides?: EcsInferenceAcceleratorOverride[];
  Memory?: string;
  TaskRoleArn?: string;
}
export type TagKey = string;
export type TagValue = string | redacted.Redacted<string>;
export interface Tag {
  Key: string;
  Value: string | redacted.Redacted<string>;
}
export type TagList = Tag[];
export interface PipeTargetEcsTaskParameters {
  TaskDefinitionArn: string;
  TaskCount?: number;
  LaunchType?: string;
  NetworkConfiguration?: NetworkConfiguration;
  PlatformVersion?: string;
  Group?: string;
  CapacityProviderStrategy?: CapacityProviderStrategyItem[];
  EnableECSManagedTags?: boolean;
  EnableExecuteCommand?: boolean;
  PlacementConstraints?: PlacementConstraint[];
  PlacementStrategy?: PlacementStrategy[];
  PropagateTags?: string;
  ReferenceId?: string | redacted.Redacted<string>;
  Overrides?: EcsTaskOverride;
  Tags?: Tag[];
}
export type BatchArraySize = number;
export interface BatchArrayProperties {
  Size?: number;
}
export type BatchRetryAttempts = number;
export interface BatchRetryStrategy {
  Attempts?: number;
}
export interface BatchEnvironmentVariable {
  Name?: string;
  Value?: string;
}
export type BatchEnvironmentVariableList = BatchEnvironmentVariable[];
export type BatchResourceRequirementType = string;
export interface BatchResourceRequirement {
  Type: string;
  Value: string;
}
export type BatchResourceRequirementsList = BatchResourceRequirement[];
export interface BatchContainerOverrides {
  Command?: string[];
  Environment?: BatchEnvironmentVariable[];
  InstanceType?: string;
  ResourceRequirements?: BatchResourceRequirement[];
}
export type BatchJobDependencyType = string;
export interface BatchJobDependency {
  JobId?: string;
  Type?: string;
}
export type BatchDependsOn = BatchJobDependency[];
export type BatchParametersMap = { [key: string]: string | undefined };
export interface PipeTargetBatchJobParameters {
  JobDefinition: string;
  JobName: string;
  ArrayProperties?: BatchArrayProperties;
  RetryStrategy?: BatchRetryStrategy;
  ContainerOverrides?: BatchContainerOverrides;
  DependsOn?: BatchJobDependency[];
  Parameters?: { [key: string]: string | undefined };
}
export type MessageGroupId = string | redacted.Redacted<string>;
export type MessageDeduplicationId = string | redacted.Redacted<string>;
export interface PipeTargetSqsQueueParameters {
  MessageGroupId?: string | redacted.Redacted<string>;
  MessageDeduplicationId?: string | redacted.Redacted<string>;
}
export interface PipeTargetHttpParameters {
  PathParameterValues?: (string | redacted.Redacted<string>)[];
  HeaderParameters?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  QueryStringParameters?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
}
export type SecretManagerArnOrJsonPath = string;
export type Database = string | redacted.Redacted<string>;
export type DbUser = string | redacted.Redacted<string>;
export type StatementName = string | redacted.Redacted<string>;
export type Sql = string | redacted.Redacted<string>;
export type Sqls = (string | redacted.Redacted<string>)[];
export interface PipeTargetRedshiftDataParameters {
  SecretManagerArn?: string;
  Database: string | redacted.Redacted<string>;
  DbUser?: string | redacted.Redacted<string>;
  StatementName?: string | redacted.Redacted<string>;
  WithEvent?: boolean;
  Sqls: (string | redacted.Redacted<string>)[];
}
export type SageMakerPipelineParameterName = string | redacted.Redacted<string>;
export type SageMakerPipelineParameterValue =
  | string
  | redacted.Redacted<string>;
export interface SageMakerPipelineParameter {
  Name: string | redacted.Redacted<string>;
  Value: string | redacted.Redacted<string>;
}
export type SageMakerPipelineParameterList = SageMakerPipelineParameter[];
export interface PipeTargetSageMakerPipelineParameters {
  PipelineParameterList?: SageMakerPipelineParameter[];
}
export type EventBridgeEndpointId = string | redacted.Redacted<string>;
export type EventBridgeDetailType = string | redacted.Redacted<string>;
export type EventBridgeEventSource = string | redacted.Redacted<string>;
export type EventBridgeEventResourceList = string[];
export type JsonPath = string;
export interface PipeTargetEventBridgeEventBusParameters {
  EndpointId?: string | redacted.Redacted<string>;
  DetailType?: string | redacted.Redacted<string>;
  Source?: string | redacted.Redacted<string>;
  Resources?: string[];
  Time?: string;
}
export type LogStreamName = string;
export interface PipeTargetCloudWatchLogsParameters {
  LogStreamName?: string;
  Timestamp?: string;
}
export type TimeValue = string;
export type EpochTimeUnit = string;
export type TimeFieldType = string;
export type TimestampFormat = string;
export type VersionValue = string;
export type DimensionValue = string;
export type DimensionValueType = string;
export type DimensionName = string;
export interface DimensionMapping {
  DimensionValue: string;
  DimensionValueType: string;
  DimensionName: string;
}
export type DimensionMappings = DimensionMapping[];
export type MeasureValue = string;
export type MeasureValueType = string;
export type MeasureName = string;
export interface SingleMeasureMapping {
  MeasureValue: string;
  MeasureValueType: string;
  MeasureName: string;
}
export type SingleMeasureMappings = SingleMeasureMapping[];
export type MultiMeasureName = string;
export type MultiMeasureAttributeName = string;
export interface MultiMeasureAttributeMapping {
  MeasureValue: string;
  MeasureValueType: string;
  MultiMeasureAttributeName: string;
}
export type MultiMeasureAttributeMappings = MultiMeasureAttributeMapping[];
export interface MultiMeasureMapping {
  MultiMeasureName: string;
  MultiMeasureAttributeMappings: MultiMeasureAttributeMapping[];
}
export type MultiMeasureMappings = MultiMeasureMapping[];
export interface PipeTargetTimestreamParameters {
  TimeValue: string;
  EpochTimeUnit?: string;
  TimeFieldType?: string;
  TimestampFormat?: string;
  VersionValue: string;
  DimensionMappings: DimensionMapping[];
  SingleMeasureMappings?: SingleMeasureMapping[];
  MultiMeasureMappings?: MultiMeasureMapping[];
}
export interface PipeTargetParameters {
  InputTemplate?: string | redacted.Redacted<string>;
  LambdaFunctionParameters?: PipeTargetLambdaFunctionParameters;
  StepFunctionStateMachineParameters?: PipeTargetStateMachineParameters;
  KinesisStreamParameters?: PipeTargetKinesisStreamParameters;
  EcsTaskParameters?: PipeTargetEcsTaskParameters;
  BatchJobParameters?: PipeTargetBatchJobParameters;
  SqsQueueParameters?: PipeTargetSqsQueueParameters;
  HttpParameters?: PipeTargetHttpParameters;
  RedshiftDataParameters?: PipeTargetRedshiftDataParameters;
  SageMakerPipelineParameters?: PipeTargetSageMakerPipelineParameters;
  EventBridgeEventBusParameters?: PipeTargetEventBridgeEventBusParameters;
  CloudWatchLogsParameters?: PipeTargetCloudWatchLogsParameters;
  TimestreamParameters?: PipeTargetTimestreamParameters;
}
export type RoleArn = string;
export type TagMap = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export type S3OutputFormat = string;
export interface S3LogDestinationParameters {
  BucketName: string;
  BucketOwner: string;
  OutputFormat?: string;
  Prefix?: string;
}
export type FirehoseArn = string;
export interface FirehoseLogDestinationParameters {
  DeliveryStreamArn: string;
}
export type CloudwatchLogGroupArn = string;
export interface CloudwatchLogsLogDestinationParameters {
  LogGroupArn: string;
}
export type LogLevel = string;
export type IncludeExecutionDataOption = string;
export type IncludeExecutionData = string[];
export interface PipeLogConfigurationParameters {
  S3LogDestination?: S3LogDestinationParameters;
  FirehoseLogDestination?: FirehoseLogDestinationParameters;
  CloudwatchLogsLogDestination?: CloudwatchLogsLogDestinationParameters;
  Level: string;
  IncludeExecutionData?: string[];
}
export type KmsKeyIdentifier = string;
export interface CreatePipeRequest {
  Name: string;
  Description?: string | redacted.Redacted<string>;
  DesiredState?: string;
  Source: string;
  SourceParameters?: PipeSourceParameters;
  Enrichment?: string;
  EnrichmentParameters?: PipeEnrichmentParameters;
  Target: string;
  TargetParameters?: PipeTargetParameters;
  RoleArn: string;
  Tags?: { [key: string]: string | redacted.Redacted<string> | undefined };
  LogConfiguration?: PipeLogConfigurationParameters;
  KmsKeyIdentifier?: string;
}
export type PipeArn = string;
export type PipeState = string;
export interface CreatePipeResponse {
  Arn?: string;
  Name?: string;
  DesiredState?: string;
  CurrentState?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export interface DeletePipeRequest {
  Name: string;
}
export type RequestedPipeStateDescribeResponse = string;
export interface DeletePipeResponse {
  Arn?: string;
  Name?: string;
  DesiredState?: string;
  CurrentState?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export interface DescribePipeRequest {
  Name: string;
}
export type PipeStateReason = string;
export interface S3LogDestination {
  BucketName?: string;
  Prefix?: string;
  BucketOwner?: string;
  OutputFormat?: string;
}
export interface FirehoseLogDestination {
  DeliveryStreamArn?: string;
}
export interface CloudwatchLogsLogDestination {
  LogGroupArn?: string;
}
export interface PipeLogConfiguration {
  S3LogDestination?: S3LogDestination;
  FirehoseLogDestination?: FirehoseLogDestination;
  CloudwatchLogsLogDestination?: CloudwatchLogsLogDestination;
  Level?: string;
  IncludeExecutionData?: string[];
}
export interface DescribePipeResponse {
  Arn?: string;
  Name?: string;
  Description?: string | redacted.Redacted<string>;
  DesiredState?: string;
  CurrentState?: string;
  StateReason?: string;
  Source?: string;
  SourceParameters?: PipeSourceParameters;
  Enrichment?: string;
  EnrichmentParameters?: PipeEnrichmentParameters;
  Target?: string;
  TargetParameters?: PipeTargetParameters;
  RoleArn?: string;
  Tags?: { [key: string]: string | redacted.Redacted<string> | undefined };
  CreationTime?: Date;
  LastModifiedTime?: Date;
  LogConfiguration?: PipeLogConfiguration;
  KmsKeyIdentifier?: string;
}
export type ResourceArn = string;
export type NextToken = string | redacted.Redacted<string>;
export type LimitMax100 = number;
export interface ListPipesRequest {
  NamePrefix?: string;
  DesiredState?: string;
  CurrentState?: string;
  SourcePrefix?: string;
  TargetPrefix?: string;
  NextToken?: string | redacted.Redacted<string>;
  Limit?: number;
}
export interface Pipe {
  Name?: string;
  Arn?: string;
  DesiredState?: string;
  CurrentState?: string;
  StateReason?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  Source?: string;
  Target?: string;
  Enrichment?: string;
}
export type PipeList = Pipe[];
export interface ListPipesResponse {
  Pipes?: Pipe[];
  NextToken?: string | redacted.Redacted<string>;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | redacted.Redacted<string> | undefined };
}
export interface StartPipeRequest {
  Name: string;
}
export interface StartPipeResponse {
  Arn?: string;
  Name?: string;
  DesiredState?: string;
  CurrentState?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export interface StopPipeRequest {
  Name: string;
}
export interface StopPipeResponse {
  Arn?: string;
  Name?: string;
  DesiredState?: string;
  CurrentState?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | redacted.Redacted<string> | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdatePipeSourceKinesisStreamParameters {
  BatchSize?: number;
  DeadLetterConfig?: DeadLetterConfig;
  OnPartialBatchItemFailure?: string;
  MaximumBatchingWindowInSeconds?: number;
  MaximumRecordAgeInSeconds?: number;
  MaximumRetryAttempts?: number;
  ParallelizationFactor?: number;
}
export interface UpdatePipeSourceDynamoDBStreamParameters {
  BatchSize?: number;
  DeadLetterConfig?: DeadLetterConfig;
  OnPartialBatchItemFailure?: string;
  MaximumBatchingWindowInSeconds?: number;
  MaximumRecordAgeInSeconds?: number;
  MaximumRetryAttempts?: number;
  ParallelizationFactor?: number;
}
export interface UpdatePipeSourceSqsQueueParameters {
  BatchSize?: number;
  MaximumBatchingWindowInSeconds?: number;
}
export interface UpdatePipeSourceActiveMQBrokerParameters {
  Credentials: MQBrokerAccessCredentials;
  BatchSize?: number;
  MaximumBatchingWindowInSeconds?: number;
}
export interface UpdatePipeSourceRabbitMQBrokerParameters {
  Credentials: MQBrokerAccessCredentials;
  BatchSize?: number;
  MaximumBatchingWindowInSeconds?: number;
}
export interface UpdatePipeSourceManagedStreamingKafkaParameters {
  BatchSize?: number;
  Credentials?: MSKAccessCredentials;
  MaximumBatchingWindowInSeconds?: number;
}
export interface UpdatePipeSourceSelfManagedKafkaParameters {
  BatchSize?: number;
  MaximumBatchingWindowInSeconds?: number;
  Credentials?: SelfManagedKafkaAccessConfigurationCredentials;
  ServerRootCaCertificate?: string;
  Vpc?: SelfManagedKafkaAccessConfigurationVpc;
}
export interface UpdatePipeSourceParameters {
  FilterCriteria?: FilterCriteria;
  KinesisStreamParameters?: UpdatePipeSourceKinesisStreamParameters;
  DynamoDBStreamParameters?: UpdatePipeSourceDynamoDBStreamParameters;
  SqsQueueParameters?: UpdatePipeSourceSqsQueueParameters;
  ActiveMQBrokerParameters?: UpdatePipeSourceActiveMQBrokerParameters;
  RabbitMQBrokerParameters?: UpdatePipeSourceRabbitMQBrokerParameters;
  ManagedStreamingKafkaParameters?: UpdatePipeSourceManagedStreamingKafkaParameters;
  SelfManagedKafkaParameters?: UpdatePipeSourceSelfManagedKafkaParameters;
}
export interface UpdatePipeRequest {
  Name: string;
  Description?: string | redacted.Redacted<string>;
  DesiredState?: string;
  SourceParameters?: UpdatePipeSourceParameters;
  Enrichment?: string;
  EnrichmentParameters?: PipeEnrichmentParameters;
  Target?: string;
  TargetParameters?: PipeTargetParameters;
  RoleArn: string;
  LogConfiguration?: PipeLogConfigurationParameters;
  KmsKeyIdentifier?: string;
}
export interface UpdatePipeResponse {
  Arn?: string;
  Name?: string;
  DesiredState?: string;
  CurrentState?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export type ErrorMessage = string;
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type CreatePipeError =
  | ConflictException
  | InternalException
  | NotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a pipe. Amazon EventBridge Pipes connect event sources to targets and reduces
 * the need for specialized knowledge and integration code.
 */
export const createPipe: API.OperationMethod<
  CreatePipeRequest,
  CreatePipeResponse,
  CreatePipeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/pipes/{Name}",
    input: {
      Name: 0,
      Description: 0,
      DesiredState: 0,
      Source: 0,
      SourceParameters: {
        FilterCriteria: i_FilterCriteria,
        KinesisStreamParameters: {
          BatchSize: 0,
          DeadLetterConfig: i_DeadLetterConfig,
          OnPartialBatchItemFailure: 0,
          MaximumBatchingWindowInSeconds: 0,
          MaximumRecordAgeInSeconds: 0,
          MaximumRetryAttempts: 0,
          ParallelizationFactor: 0,
          StartingPosition: 0,
          StartingPositionTimestamp: 0,
        },
        DynamoDBStreamParameters: {
          BatchSize: 0,
          DeadLetterConfig: i_DeadLetterConfig,
          OnPartialBatchItemFailure: 0,
          MaximumBatchingWindowInSeconds: 0,
          MaximumRecordAgeInSeconds: 0,
          MaximumRetryAttempts: 0,
          ParallelizationFactor: 0,
          StartingPosition: 0,
        },
        SqsQueueParameters: { BatchSize: 0, MaximumBatchingWindowInSeconds: 0 },
        ActiveMQBrokerParameters: {
          Credentials: i_MQBrokerAccessCredentials,
          QueueName: 0,
          BatchSize: 0,
          MaximumBatchingWindowInSeconds: 0,
        },
        RabbitMQBrokerParameters: {
          Credentials: i_MQBrokerAccessCredentials,
          QueueName: 0,
          VirtualHost: 0,
          BatchSize: 0,
          MaximumBatchingWindowInSeconds: 0,
        },
        ManagedStreamingKafkaParameters: {
          TopicName: 0,
          StartingPosition: 0,
          BatchSize: 0,
          MaximumBatchingWindowInSeconds: 0,
          ConsumerGroupID: 0,
          Credentials: i_MSKAccessCredentials,
        },
        SelfManagedKafkaParameters: {
          TopicName: 0,
          StartingPosition: 0,
          AdditionalBootstrapServers: 0,
          BatchSize: 0,
          MaximumBatchingWindowInSeconds: 0,
          ConsumerGroupID: 0,
          Credentials: i_SelfManagedKafkaAccessConfigurationCredentials,
          ServerRootCaCertificate: 0,
          Vpc: i_SelfManagedKafkaAccessConfigurationVpc,
        },
      },
      Enrichment: 0,
      EnrichmentParameters: i_PipeEnrichmentParameters,
      Target: 0,
      TargetParameters: i_PipeTargetParameters,
      RoleArn: 0,
      Tags: 0,
      LogConfiguration: i_PipeLogConfigurationParameters,
      KmsKeyIdentifier: 0,
    },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts },
    body: true,
  },
  errors: [
    ConflictException,
    InternalException,
    NotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePipe",
})) as any;

export type DeletePipeError =
  | ConflictException
  | InternalException
  | NotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete an existing pipe. For more information about pipes, see Amazon EventBridge Pipes in the Amazon EventBridge User Guide.
 */
export const deletePipe: API.OperationMethod<
  DeletePipeRequest,
  DeletePipeResponse,
  DeletePipeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/pipes/{Name}",
    input: { Name: 0 },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts },
  },
  errors: [
    ConflictException,
    InternalException,
    NotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePipe",
})) as any;

export type DescribePipeError =
  | InternalException
  | NotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the information about an existing pipe. For more information about pipes, see Amazon EventBridge Pipes in the Amazon EventBridge User Guide.
 */
export const describePipe: API.OperationMethod<
  DescribePipeRequest,
  DescribePipeResponse,
  DescribePipeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/pipes/{Name}",
    input: { Name: 0 },
    output: {
      Description: D.secret,
      SourceParameters: {
        FilterCriteria: { Filters: D.list({ Pattern: D.secret }) },
        KinesisStreamParameters: { StartingPositionTimestamp: D.ts },
        ActiveMQBrokerParameters: { QueueName: D.secret },
        RabbitMQBrokerParameters: {
          QueueName: D.secret,
          VirtualHost: D.secret,
        },
        ManagedStreamingKafkaParameters: {
          TopicName: D.secret,
          ConsumerGroupID: D.secret,
        },
        SelfManagedKafkaParameters: {
          TopicName: D.secret,
          AdditionalBootstrapServers: D.list(D.secret),
          ConsumerGroupID: D.secret,
          Vpc: { Subnets: D.list(D.secret), SecurityGroup: D.list(D.secret) },
        },
      },
      EnrichmentParameters: {
        InputTemplate: D.secret,
        HttpParameters: {
          PathParameterValues: D.list(D.secret),
          HeaderParameters: D.map(D.secret),
          QueryStringParameters: D.map(D.secret),
        },
      },
      TargetParameters: {
        InputTemplate: D.secret,
        KinesisStreamParameters: { PartitionKey: D.secret },
        EcsTaskParameters: {
          NetworkConfiguration: {
            awsvpcConfiguration: {
              Subnets: D.list(D.secret),
              SecurityGroups: D.list(D.secret),
            },
          },
          CapacityProviderStrategy: D.list({ capacityProvider: D.secret }),
          PlacementConstraints: D.list({ expression: D.secret }),
          PlacementStrategy: D.list({ field: D.secret }),
          ReferenceId: D.secret,
          Tags: D.list({ Value: D.secret }),
        },
        SqsQueueParameters: {
          MessageGroupId: D.secret,
          MessageDeduplicationId: D.secret,
        },
        HttpParameters: {
          PathParameterValues: D.list(D.secret),
          HeaderParameters: D.map(D.secret),
          QueryStringParameters: D.map(D.secret),
        },
        RedshiftDataParameters: {
          Database: D.secret,
          DbUser: D.secret,
          StatementName: D.secret,
          Sqls: D.list(D.secret),
        },
        SageMakerPipelineParameters: {
          PipelineParameterList: D.list({ Name: D.secret, Value: D.secret }),
        },
        EventBridgeEventBusParameters: {
          EndpointId: D.secret,
          DetailType: D.secret,
          Source: D.secret,
        },
      },
      Tags: D.map(D.secret),
      CreationTime: D.ts,
      LastModifiedTime: D.ts,
    },
  },
  errors: [
    InternalException,
    NotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePipe",
})) as any;

export type ListPipesError =
  | InternalException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the pipes associated with this account. For more information about pipes, see Amazon EventBridge Pipes in the Amazon EventBridge User Guide.
 */
export const listPipes: API.PaginatedOperationMethod<
  ListPipesRequest,
  ListPipesResponse,
  ListPipesError,
  Credentials | HttpClient.HttpClient,
  Pipe
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/pipes",
    input: {
      NamePrefix: D.m({ query: "NamePrefix" }),
      DesiredState: D.m({ query: "DesiredState" }),
      CurrentState: D.m({ query: "CurrentState" }),
      SourcePrefix: D.m({ query: "SourcePrefix" }),
      TargetPrefix: D.m({ query: "TargetPrefix" }),
      NextToken: D.m({ query: "NextToken" }),
      Limit: D.m({ query: "Limit" }),
    },
    output: {
      Pipes: D.list({ CreationTime: D.ts, LastModifiedTime: D.ts }),
      NextToken: D.secret,
    },
  },
  errors: [InternalException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPipes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Pipes",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Displays the tags associated with a pipe.
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
    output: { tags: D.map(D.secret) },
  },
  errors: [InternalException, NotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type StartPipeError =
  | ConflictException
  | InternalException
  | NotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Start an existing pipe.
 */
export const startPipe: API.OperationMethod<
  StartPipeRequest,
  StartPipeResponse,
  StartPipeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/pipes/{Name}/start",
    input: { Name: 0 },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts },
  },
  errors: [
    ConflictException,
    InternalException,
    NotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartPipe",
})) as any;

export type StopPipeError =
  | ConflictException
  | InternalException
  | NotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stop an existing pipe.
 */
export const stopPipe: API.OperationMethod<
  StopPipeRequest,
  StopPipeResponse,
  StopPipeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/pipes/{Name}/stop",
    input: { Name: 0 },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts },
  },
  errors: [
    ConflictException,
    InternalException,
    NotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopPipe",
})) as any;

export type TagResourceError =
  | InternalException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Assigns one or more tags (key-value pairs) to the specified pipe. Tags can help you
 * organize and categorize your resources. You can also use them to scope user permissions by
 * granting a user permission to access or change only resources with certain tag
 * values.
 *
 * Tags don't have any semantic meaning to Amazon Web Services and are interpreted strictly
 * as strings of characters.
 *
 * You can use the `TagResource` action with a pipe that already has tags. If
 * you specify a new tag key, this tag is appended to the list of tags associated with the
 * pipe. If you specify a tag key that is already associated with the pipe, the new tag value
 * that you specify replaces the previous value for that tag.
 *
 * You can associate as many as 50 tags with a pipe.
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
  errors: [InternalException, NotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InternalException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes one or more tags from the specified pipes.
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
  errors: [InternalException, NotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdatePipeError =
  | ConflictException
  | InternalException
  | NotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update an existing pipe. When you call `UpdatePipe`, EventBridge only the
 * updates fields you have specified in the request; the rest remain unchanged. The exception
 * to this is if you modify any Amazon Web Services-service specific fields in the
 * `SourceParameters`, `EnrichmentParameters`, or
 * `TargetParameters` objects. For example,
 * `DynamoDBStreamParameters` or `EventBridgeEventBusParameters`.
 * EventBridge updates the fields in these objects atomically as one and overrides existing
 * values. This is by design, and means that if you don't specify an optional field in one of
 * these `Parameters` objects, EventBridge sets that field to its system-default
 * value during the update.
 *
 * For more information about pipes, see
 * Amazon EventBridge Pipes in the Amazon EventBridge User Guide.
 */
export const updatePipe: API.OperationMethod<
  UpdatePipeRequest,
  UpdatePipeResponse,
  UpdatePipeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/pipes/{Name}",
    input: {
      Name: 0,
      Description: 0,
      DesiredState: 0,
      SourceParameters: {
        FilterCriteria: i_FilterCriteria,
        KinesisStreamParameters: {
          BatchSize: 0,
          DeadLetterConfig: i_DeadLetterConfig,
          OnPartialBatchItemFailure: 0,
          MaximumBatchingWindowInSeconds: 0,
          MaximumRecordAgeInSeconds: 0,
          MaximumRetryAttempts: 0,
          ParallelizationFactor: 0,
        },
        DynamoDBStreamParameters: {
          BatchSize: 0,
          DeadLetterConfig: i_DeadLetterConfig,
          OnPartialBatchItemFailure: 0,
          MaximumBatchingWindowInSeconds: 0,
          MaximumRecordAgeInSeconds: 0,
          MaximumRetryAttempts: 0,
          ParallelizationFactor: 0,
        },
        SqsQueueParameters: { BatchSize: 0, MaximumBatchingWindowInSeconds: 0 },
        ActiveMQBrokerParameters: {
          Credentials: i_MQBrokerAccessCredentials,
          BatchSize: 0,
          MaximumBatchingWindowInSeconds: 0,
        },
        RabbitMQBrokerParameters: {
          Credentials: i_MQBrokerAccessCredentials,
          BatchSize: 0,
          MaximumBatchingWindowInSeconds: 0,
        },
        ManagedStreamingKafkaParameters: {
          BatchSize: 0,
          Credentials: i_MSKAccessCredentials,
          MaximumBatchingWindowInSeconds: 0,
        },
        SelfManagedKafkaParameters: {
          BatchSize: 0,
          MaximumBatchingWindowInSeconds: 0,
          Credentials: i_SelfManagedKafkaAccessConfigurationCredentials,
          ServerRootCaCertificate: 0,
          Vpc: i_SelfManagedKafkaAccessConfigurationVpc,
        },
      },
      Enrichment: 0,
      EnrichmentParameters: i_PipeEnrichmentParameters,
      Target: 0,
      TargetParameters: i_PipeTargetParameters,
      RoleArn: 0,
      LogConfiguration: i_PipeLogConfigurationParameters,
      KmsKeyIdentifier: 0,
    },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts },
    body: true,
  },
  errors: [
    ConflictException,
    InternalException,
    NotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePipe",
})) as any;

const i_DeadLetterConfig: D.LazyStruct = () => ({ Arn: 0 });
const i_FilterCriteria: D.LazyStruct = () => ({
  Filters: D.list({ Pattern: 0 }),
});
const i_MQBrokerAccessCredentials: D.LazyStruct = () => ({ BasicAuth: 0 });
const i_MSKAccessCredentials: D.LazyStruct = () => ({
  SaslScram512Auth: 0,
  ClientCertificateTlsAuth: 0,
});
const i_PipeEnrichmentParameters: D.LazyStruct = () => ({
  InputTemplate: 0,
  HttpParameters: {
    PathParameterValues: 0,
    HeaderParameters: 0,
    QueryStringParameters: 0,
  },
});
const i_PipeLogConfigurationParameters: D.LazyStruct = () => ({
  S3LogDestination: {
    BucketName: 0,
    BucketOwner: 0,
    OutputFormat: 0,
    Prefix: 0,
  },
  FirehoseLogDestination: { DeliveryStreamArn: 0 },
  CloudwatchLogsLogDestination: { LogGroupArn: 0 },
  Level: 0,
  IncludeExecutionData: 0,
});
const i_PipeTargetParameters: D.LazyStruct = () => ({
  InputTemplate: 0,
  LambdaFunctionParameters: { InvocationType: 0 },
  StepFunctionStateMachineParameters: { InvocationType: 0 },
  KinesisStreamParameters: { PartitionKey: 0 },
  EcsTaskParameters: {
    TaskDefinitionArn: 0,
    TaskCount: 0,
    LaunchType: 0,
    NetworkConfiguration: {
      awsvpcConfiguration: { Subnets: 0, SecurityGroups: 0, AssignPublicIp: 0 },
    },
    PlatformVersion: 0,
    Group: 0,
    CapacityProviderStrategy: D.list({
      capacityProvider: 0,
      weight: 0,
      base: 0,
    }),
    EnableECSManagedTags: 0,
    EnableExecuteCommand: 0,
    PlacementConstraints: D.list({ type: 0, expression: 0 }),
    PlacementStrategy: D.list({ type: 0, field: 0 }),
    PropagateTags: 0,
    ReferenceId: 0,
    Overrides: {
      ContainerOverrides: D.list({
        Command: 0,
        Cpu: 0,
        Environment: D.list({ name: 0, value: 0 }),
        EnvironmentFiles: D.list({ type: 0, value: 0 }),
        Memory: 0,
        MemoryReservation: 0,
        Name: 0,
        ResourceRequirements: D.list({ type: 0, value: 0 }),
      }),
      Cpu: 0,
      EphemeralStorage: { sizeInGiB: 0 },
      ExecutionRoleArn: 0,
      InferenceAcceleratorOverrides: D.list({ deviceName: 0, deviceType: 0 }),
      Memory: 0,
      TaskRoleArn: 0,
    },
    Tags: D.list({ Key: 0, Value: 0 }),
  },
  BatchJobParameters: {
    JobDefinition: 0,
    JobName: 0,
    ArrayProperties: { Size: 0 },
    RetryStrategy: { Attempts: 0 },
    ContainerOverrides: {
      Command: 0,
      Environment: D.list({ Name: 0, Value: 0 }),
      InstanceType: 0,
      ResourceRequirements: D.list({ Type: 0, Value: 0 }),
    },
    DependsOn: D.list({ JobId: 0, Type: 0 }),
    Parameters: 0,
  },
  SqsQueueParameters: { MessageGroupId: 0, MessageDeduplicationId: 0 },
  HttpParameters: {
    PathParameterValues: 0,
    HeaderParameters: 0,
    QueryStringParameters: 0,
  },
  RedshiftDataParameters: {
    SecretManagerArn: 0,
    Database: 0,
    DbUser: 0,
    StatementName: 0,
    WithEvent: 0,
    Sqls: 0,
  },
  SageMakerPipelineParameters: {
    PipelineParameterList: D.list({ Name: 0, Value: 0 }),
  },
  EventBridgeEventBusParameters: {
    EndpointId: 0,
    DetailType: 0,
    Source: 0,
    Resources: 0,
    Time: 0,
  },
  CloudWatchLogsParameters: { LogStreamName: 0, Timestamp: 0 },
  TimestreamParameters: {
    TimeValue: 0,
    EpochTimeUnit: 0,
    TimeFieldType: 0,
    TimestampFormat: 0,
    VersionValue: 0,
    DimensionMappings: D.list({
      DimensionValue: 0,
      DimensionValueType: 0,
      DimensionName: 0,
    }),
    SingleMeasureMappings: D.list({
      MeasureValue: 0,
      MeasureValueType: 0,
      MeasureName: 0,
    }),
    MultiMeasureMappings: D.list({
      MultiMeasureName: 0,
      MultiMeasureAttributeMappings: D.list({
        MeasureValue: 0,
        MeasureValueType: 0,
        MultiMeasureAttributeName: 0,
      }),
    }),
  },
});
const i_SelfManagedKafkaAccessConfigurationCredentials: D.LazyStruct = () => ({
  BasicAuth: 0,
  SaslScram512Auth: 0,
  SaslScram256Auth: 0,
  ClientCertificateTlsAuth: 0,
});
const i_SelfManagedKafkaAccessConfigurationVpc: D.LazyStruct = () => ({
  Subnets: 0,
  SecurityGroup: 0,
});
