import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Kinesis Analytics V2",
  target: "KinesisAnalytics_20180523",
  version: "2018-05-23",
  sigv4: "kinesisanalytics",
  protocol: awsJson1_1Protocol,
  xmlns: "http://analytics.kinesis.amazonaws.com/doc/2018-05-23",
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
                `https://kinesisanalytics-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://kinesisanalytics-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://kinesisanalytics.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://kinesisanalytics.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class CodeValidationException
  extends /*@__PURE__*/ TE.TaggedError("CodeValidationException")<{
    readonly message?: string;
  }> {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConcurrentModificationException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class InvalidApplicationConfigurationException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidApplicationConfigurationException",
  )<{ readonly message?: string }> {}
export class InvalidArgumentException
  extends /*@__PURE__*/ TE.TaggedError("InvalidArgumentException")<{
    readonly message?: string;
  }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError("InvalidRequestException")<{
    readonly message?: string;
  }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("LimitExceededException")<{
    readonly message?: string;
  }> {}
export class ResourceInUseException
  extends /*@__PURE__*/ TE.TaggedError("ResourceInUseException")<{
    readonly message?: string;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ResourceNotFoundException")<{
    readonly message?: string;
  }> {}
export class ResourceProvisionedThroughputExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceProvisionedThroughputExceededException",
  )<{ readonly message?: string }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ServerError"],
    { status: 503 },
  )<{ readonly message?: string }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError("TooManyTagsException")<{
    readonly message?: string;
  }> {}
export class UnableToDetectSchemaException
  extends /*@__PURE__*/ TE.TaggedError("UnableToDetectSchemaException")<{
    readonly message?: string;
    readonly RawInputRecords?: string[];
    readonly ProcessedInputRecords?: string[];
  }> {}
export class UnsupportedOperationException
  extends /*@__PURE__*/ TE.TaggedError("UnsupportedOperationException")<{
    readonly message?: string;
  }> {}
export type ApplicationName = string;
export type ApplicationVersionId = number;
export type LogStreamARN = string;
export interface CloudWatchLoggingOption {
  LogStreamARN: string;
}
export type ConditionalToken = string;
export interface AddApplicationCloudWatchLoggingOptionRequest {
  ApplicationName: string;
  CurrentApplicationVersionId?: number;
  CloudWatchLoggingOption: CloudWatchLoggingOption;
  ConditionalToken?: string;
}
export type ResourceARN = string;
export type Id = string;
export type RoleARN = string;
export interface CloudWatchLoggingOptionDescription {
  CloudWatchLoggingOptionId?: string;
  LogStreamARN: string;
  RoleARN?: string;
}
export type CloudWatchLoggingOptionDescriptions =
  CloudWatchLoggingOptionDescription[];
export type OperationId = string;
export interface AddApplicationCloudWatchLoggingOptionResponse {
  ApplicationARN?: string;
  ApplicationVersionId?: number;
  CloudWatchLoggingOptionDescriptions?: CloudWatchLoggingOptionDescription[];
  OperationId?: string;
}
export type InAppStreamName = string;
export interface InputLambdaProcessor {
  ResourceARN: string;
}
export interface InputProcessingConfiguration {
  InputLambdaProcessor: InputLambdaProcessor;
}
export interface KinesisStreamsInput {
  ResourceARN: string;
}
export interface KinesisFirehoseInput {
  ResourceARN: string;
}
export type InputParallelismCount = number;
export interface InputParallelism {
  Count?: number;
}
export type RecordFormatType = "JSON" | "CSV" | (string & {});
export type RecordRowPath = string;
export interface JSONMappingParameters {
  RecordRowPath: string;
}
export type RecordRowDelimiter = string;
export type RecordColumnDelimiter = string;
export interface CSVMappingParameters {
  RecordRowDelimiter: string;
  RecordColumnDelimiter: string;
}
export interface MappingParameters {
  JSONMappingParameters?: JSONMappingParameters;
  CSVMappingParameters?: CSVMappingParameters;
}
export interface RecordFormat {
  RecordFormatType: RecordFormatType;
  MappingParameters?: MappingParameters;
}
export type RecordEncoding = string;
export type RecordColumnName = string;
export type RecordColumnMapping = string;
export type RecordColumnSqlType = string;
export interface RecordColumn {
  Name: string;
  Mapping?: string;
  SqlType: string;
}
export type RecordColumns = RecordColumn[];
export interface SourceSchema {
  RecordFormat: RecordFormat;
  RecordEncoding?: string;
  RecordColumns: RecordColumn[];
}
export interface Input {
  NamePrefix: string;
  InputProcessingConfiguration?: InputProcessingConfiguration;
  KinesisStreamsInput?: KinesisStreamsInput;
  KinesisFirehoseInput?: KinesisFirehoseInput;
  InputParallelism?: InputParallelism;
  InputSchema: SourceSchema;
}
export interface AddApplicationInputRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  Input: Input;
}
export type InAppStreamNames = string[];
export interface InputLambdaProcessorDescription {
  ResourceARN: string;
  RoleARN?: string;
}
export interface InputProcessingConfigurationDescription {
  InputLambdaProcessorDescription?: InputLambdaProcessorDescription;
}
export interface KinesisStreamsInputDescription {
  ResourceARN: string;
  RoleARN?: string;
}
export interface KinesisFirehoseInputDescription {
  ResourceARN: string;
  RoleARN?: string;
}
export type InputStartingPosition =
  | "NOW"
  | "TRIM_HORIZON"
  | "LAST_STOPPED_POINT"
  | (string & {});
export interface InputStartingPositionConfiguration {
  InputStartingPosition?: InputStartingPosition;
}
export interface InputDescription {
  InputId?: string;
  NamePrefix?: string;
  InAppStreamNames?: string[];
  InputProcessingConfigurationDescription?: InputProcessingConfigurationDescription;
  KinesisStreamsInputDescription?: KinesisStreamsInputDescription;
  KinesisFirehoseInputDescription?: KinesisFirehoseInputDescription;
  InputSchema?: SourceSchema;
  InputParallelism?: InputParallelism;
  InputStartingPositionConfiguration?: InputStartingPositionConfiguration;
}
export type InputDescriptions = InputDescription[];
export interface AddApplicationInputResponse {
  ApplicationARN?: string;
  ApplicationVersionId?: number;
  InputDescriptions?: InputDescription[];
}
export interface AddApplicationInputProcessingConfigurationRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  InputId: string;
  InputProcessingConfiguration: InputProcessingConfiguration;
}
export interface AddApplicationInputProcessingConfigurationResponse {
  ApplicationARN?: string;
  ApplicationVersionId?: number;
  InputId?: string;
  InputProcessingConfigurationDescription?: InputProcessingConfigurationDescription;
}
export interface KinesisStreamsOutput {
  ResourceARN: string;
}
export interface KinesisFirehoseOutput {
  ResourceARN: string;
}
export interface LambdaOutput {
  ResourceARN: string;
}
export interface DestinationSchema {
  RecordFormatType: RecordFormatType;
}
export interface Output {
  Name: string;
  KinesisStreamsOutput?: KinesisStreamsOutput;
  KinesisFirehoseOutput?: KinesisFirehoseOutput;
  LambdaOutput?: LambdaOutput;
  DestinationSchema: DestinationSchema;
}
export interface AddApplicationOutputRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  Output: Output;
}
export interface KinesisStreamsOutputDescription {
  ResourceARN: string;
  RoleARN?: string;
}
export interface KinesisFirehoseOutputDescription {
  ResourceARN: string;
  RoleARN?: string;
}
export interface LambdaOutputDescription {
  ResourceARN: string;
  RoleARN?: string;
}
export interface OutputDescription {
  OutputId?: string;
  Name?: string;
  KinesisStreamsOutputDescription?: KinesisStreamsOutputDescription;
  KinesisFirehoseOutputDescription?: KinesisFirehoseOutputDescription;
  LambdaOutputDescription?: LambdaOutputDescription;
  DestinationSchema?: DestinationSchema;
}
export type OutputDescriptions = OutputDescription[];
export interface AddApplicationOutputResponse {
  ApplicationARN?: string;
  ApplicationVersionId?: number;
  OutputDescriptions?: OutputDescription[];
}
export type InAppTableName = string;
export type BucketARN = string;
export type FileKey = string;
export interface S3ReferenceDataSource {
  BucketARN?: string;
  FileKey?: string;
}
export interface ReferenceDataSource {
  TableName: string;
  S3ReferenceDataSource?: S3ReferenceDataSource;
  ReferenceSchema: SourceSchema;
}
export interface AddApplicationReferenceDataSourceRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  ReferenceDataSource: ReferenceDataSource;
}
export interface S3ReferenceDataSourceDescription {
  BucketARN: string;
  FileKey: string;
  ReferenceRoleARN?: string;
}
export interface ReferenceDataSourceDescription {
  ReferenceId: string;
  TableName: string;
  S3ReferenceDataSourceDescription: S3ReferenceDataSourceDescription;
  ReferenceSchema?: SourceSchema;
}
export type ReferenceDataSourceDescriptions = ReferenceDataSourceDescription[];
export interface AddApplicationReferenceDataSourceResponse {
  ApplicationARN?: string;
  ApplicationVersionId?: number;
  ReferenceDataSourceDescriptions?: ReferenceDataSourceDescription[];
}
export type SubnetId = string;
export type SubnetIds = string[];
export type SecurityGroupId = string;
export type SecurityGroupIds = string[];
export interface VpcConfiguration {
  SubnetIds: string[];
  SecurityGroupIds: string[];
}
export interface AddApplicationVpcConfigurationRequest {
  ApplicationName: string;
  CurrentApplicationVersionId?: number;
  VpcConfiguration: VpcConfiguration;
  ConditionalToken?: string;
}
export type VpcId = string;
export interface VpcConfigurationDescription {
  VpcConfigurationId: string;
  VpcId: string;
  SubnetIds: string[];
  SecurityGroupIds: string[];
}
export interface AddApplicationVpcConfigurationResponse {
  ApplicationARN?: string;
  ApplicationVersionId?: number;
  VpcConfigurationDescription?: VpcConfigurationDescription;
  OperationId?: string;
}
export type ApplicationDescription = string;
export type RuntimeEnvironment =
  | "SQL-1_0"
  | "FLINK-1_6"
  | "FLINK-1_8"
  | "ZEPPELIN-FLINK-1_0"
  | "FLINK-1_11"
  | "FLINK-1_13"
  | "ZEPPELIN-FLINK-2_0"
  | "FLINK-1_15"
  | "ZEPPELIN-FLINK-3_0"
  | "FLINK-1_18"
  | "FLINK-1_19"
  | "FLINK-1_20"
  | "FLINK-2_2"
  | "FLINK-2_3"
  | (string & {});
export type Inputs = Input[];
export type Outputs = Output[];
export type ReferenceDataSources = ReferenceDataSource[];
export interface SqlApplicationConfiguration {
  Inputs?: Input[];
  Outputs?: Output[];
  ReferenceDataSources?: ReferenceDataSource[];
}
export type ConfigurationType = "DEFAULT" | "CUSTOM" | (string & {});
export type CheckpointInterval = number;
export type MinPauseBetweenCheckpoints = number;
export interface CheckpointConfiguration {
  ConfigurationType: ConfigurationType;
  CheckpointingEnabled?: boolean;
  CheckpointInterval?: number;
  MinPauseBetweenCheckpoints?: number;
}
export type MetricsLevel =
  | "APPLICATION"
  | "TASK"
  | "OPERATOR"
  | "PARALLELISM"
  | (string & {});
export type LogLevel = "INFO" | "WARN" | "ERROR" | "DEBUG" | (string & {});
export interface MonitoringConfiguration {
  ConfigurationType: ConfigurationType;
  MetricsLevel?: MetricsLevel;
  LogLevel?: LogLevel;
}
export type Parallelism = number;
export type ParallelismPerKPU = number;
export interface ParallelismConfiguration {
  ConfigurationType: ConfigurationType;
  Parallelism?: number;
  ParallelismPerKPU?: number;
  AutoScalingEnabled?: boolean;
}
export interface FlinkApplicationConfiguration {
  CheckpointConfiguration?: CheckpointConfiguration;
  MonitoringConfiguration?: MonitoringConfiguration;
  ParallelismConfiguration?: ParallelismConfiguration;
}
export type PropertyKey = string;
export type PropertyValue = string;
export type PropertyMap = { [key: string]: string | undefined };
export interface PropertyGroup {
  PropertyGroupId: string;
  PropertyMap: { [key: string]: string | undefined };
}
export type PropertyGroups = PropertyGroup[];
export interface EnvironmentProperties {
  PropertyGroups: PropertyGroup[];
}
export type TextContent = string;
export type ZipFileContent = Uint8Array;
export type ObjectVersion = string;
export interface S3ContentLocation {
  BucketARN: string;
  FileKey: string;
  ObjectVersion?: string;
}
export interface CodeContent {
  TextContent?: string;
  ZipFileContent?: Uint8Array;
  S3ContentLocation?: S3ContentLocation;
}
export type CodeContentType = "PLAINTEXT" | "ZIPFILE" | (string & {});
export interface ApplicationCodeConfiguration {
  CodeContent?: CodeContent;
  CodeContentType: CodeContentType;
}
export interface ApplicationSnapshotConfiguration {
  SnapshotsEnabled: boolean;
}
export interface ApplicationSystemRollbackConfiguration {
  RollbackEnabled: boolean;
}
export type VpcConfigurations = VpcConfiguration[];
export interface ZeppelinMonitoringConfiguration {
  LogLevel: LogLevel;
}
export type DatabaseARN = string;
export interface GlueDataCatalogConfiguration {
  DatabaseARN: string;
}
export interface CatalogConfiguration {
  GlueDataCatalogConfiguration: GlueDataCatalogConfiguration;
}
export type BasePath = string;
export interface S3ContentBaseLocation {
  BucketARN: string;
  BasePath?: string;
}
export interface DeployAsApplicationConfiguration {
  S3ContentLocation: S3ContentBaseLocation;
}
export type ArtifactType = "UDF" | "DEPENDENCY_JAR" | (string & {});
export type MavenGroupId = string;
export type MavenArtifactId = string;
export type MavenVersion = string;
export interface MavenReference {
  GroupId: string;
  ArtifactId: string;
  Version: string;
}
export interface CustomArtifactConfiguration {
  ArtifactType: ArtifactType;
  S3ContentLocation?: S3ContentLocation;
  MavenReference?: MavenReference;
}
export type CustomArtifactsConfigurationList = CustomArtifactConfiguration[];
export interface ZeppelinApplicationConfiguration {
  MonitoringConfiguration?: ZeppelinMonitoringConfiguration;
  CatalogConfiguration?: CatalogConfiguration;
  DeployAsApplicationConfiguration?: DeployAsApplicationConfiguration;
  CustomArtifactsConfiguration?: CustomArtifactConfiguration[];
}
export type KeyId = string;
export type KeyType = "AWS_OWNED_KEY" | "CUSTOMER_MANAGED_KEY" | (string & {});
export interface ApplicationEncryptionConfiguration {
  KeyId?: string;
  KeyType: KeyType;
}
export interface ApplicationConfiguration {
  SqlApplicationConfiguration?: SqlApplicationConfiguration;
  FlinkApplicationConfiguration?: FlinkApplicationConfiguration;
  EnvironmentProperties?: EnvironmentProperties;
  ApplicationCodeConfiguration?: ApplicationCodeConfiguration;
  ApplicationSnapshotConfiguration?: ApplicationSnapshotConfiguration;
  ApplicationSystemRollbackConfiguration?: ApplicationSystemRollbackConfiguration;
  VpcConfigurations?: VpcConfiguration[];
  ZeppelinApplicationConfiguration?: ZeppelinApplicationConfiguration;
  ApplicationEncryptionConfiguration?: ApplicationEncryptionConfiguration;
}
export type CloudWatchLoggingOptions = CloudWatchLoggingOption[];
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value?: string;
}
export type Tags = Tag[];
export type ApplicationMode = "STREAMING" | "INTERACTIVE" | (string & {});
export interface CreateApplicationRequest {
  ApplicationName: string;
  ApplicationDescription?: string;
  RuntimeEnvironment: RuntimeEnvironment;
  ServiceExecutionRole: string;
  ApplicationConfiguration?: ApplicationConfiguration;
  CloudWatchLoggingOptions?: CloudWatchLoggingOption[];
  Tags?: Tag[];
  ApplicationMode?: ApplicationMode;
}
export type ApplicationStatus =
  | "DELETING"
  | "STARTING"
  | "STOPPING"
  | "READY"
  | "RUNNING"
  | "UPDATING"
  | "AUTOSCALING"
  | "FORCE_STOPPING"
  | "ROLLING_BACK"
  | "MAINTENANCE"
  | "ROLLED_BACK"
  | (string & {});
export interface SqlApplicationConfigurationDescription {
  InputDescriptions?: InputDescription[];
  OutputDescriptions?: OutputDescription[];
  ReferenceDataSourceDescriptions?: ReferenceDataSourceDescription[];
}
export type CodeMD5 = string;
export type CodeSize = number;
export interface S3ApplicationCodeLocationDescription {
  BucketARN: string;
  FileKey: string;
  ObjectVersion?: string;
}
export interface CodeContentDescription {
  TextContent?: string;
  CodeMD5?: string;
  CodeSize?: number;
  S3ApplicationCodeLocationDescription?: S3ApplicationCodeLocationDescription;
}
export interface ApplicationCodeConfigurationDescription {
  CodeContentType: CodeContentType;
  CodeContentDescription?: CodeContentDescription;
}
export type ApplicationRestoreType =
  | "SKIP_RESTORE_FROM_SNAPSHOT"
  | "RESTORE_FROM_LATEST_SNAPSHOT"
  | "RESTORE_FROM_CUSTOM_SNAPSHOT"
  | (string & {});
export type SnapshotName = string;
export interface ApplicationRestoreConfiguration {
  ApplicationRestoreType: ApplicationRestoreType;
  SnapshotName?: string;
}
export interface FlinkRunConfiguration {
  AllowNonRestoredState?: boolean;
}
export interface RunConfigurationDescription {
  ApplicationRestoreConfigurationDescription?: ApplicationRestoreConfiguration;
  FlinkRunConfigurationDescription?: FlinkRunConfiguration;
}
export interface CheckpointConfigurationDescription {
  ConfigurationType?: ConfigurationType;
  CheckpointingEnabled?: boolean;
  CheckpointInterval?: number;
  MinPauseBetweenCheckpoints?: number;
}
export interface MonitoringConfigurationDescription {
  ConfigurationType?: ConfigurationType;
  MetricsLevel?: MetricsLevel;
  LogLevel?: LogLevel;
}
export interface ParallelismConfigurationDescription {
  ConfigurationType?: ConfigurationType;
  Parallelism?: number;
  ParallelismPerKPU?: number;
  CurrentParallelism?: number;
  AutoScalingEnabled?: boolean;
}
export type JobPlanDescription = string;
export interface FlinkApplicationConfigurationDescription {
  CheckpointConfigurationDescription?: CheckpointConfigurationDescription;
  MonitoringConfigurationDescription?: MonitoringConfigurationDescription;
  ParallelismConfigurationDescription?: ParallelismConfigurationDescription;
  JobPlanDescription?: string;
}
export interface EnvironmentPropertyDescriptions {
  PropertyGroupDescriptions?: PropertyGroup[];
}
export interface ApplicationSnapshotConfigurationDescription {
  SnapshotsEnabled: boolean;
}
export interface ApplicationSystemRollbackConfigurationDescription {
  RollbackEnabled: boolean;
}
export type VpcConfigurationDescriptions = VpcConfigurationDescription[];
export interface ZeppelinMonitoringConfigurationDescription {
  LogLevel?: LogLevel;
}
export interface GlueDataCatalogConfigurationDescription {
  DatabaseARN: string;
}
export interface CatalogConfigurationDescription {
  GlueDataCatalogConfigurationDescription: GlueDataCatalogConfigurationDescription;
}
export interface S3ContentBaseLocationDescription {
  BucketARN: string;
  BasePath?: string;
}
export interface DeployAsApplicationConfigurationDescription {
  S3ContentLocationDescription: S3ContentBaseLocationDescription;
}
export interface CustomArtifactConfigurationDescription {
  ArtifactType?: ArtifactType;
  S3ContentLocationDescription?: S3ContentLocation;
  MavenReferenceDescription?: MavenReference;
}
export type CustomArtifactsConfigurationDescriptionList =
  CustomArtifactConfigurationDescription[];
export interface ZeppelinApplicationConfigurationDescription {
  MonitoringConfigurationDescription: ZeppelinMonitoringConfigurationDescription;
  CatalogConfigurationDescription?: CatalogConfigurationDescription;
  DeployAsApplicationConfigurationDescription?: DeployAsApplicationConfigurationDescription;
  CustomArtifactsConfigurationDescription?: CustomArtifactConfigurationDescription[];
}
export interface ApplicationEncryptionConfigurationDescription {
  KeyId?: string;
  KeyType: KeyType;
}
export interface ApplicationConfigurationDescription {
  SqlApplicationConfigurationDescription?: SqlApplicationConfigurationDescription;
  ApplicationCodeConfigurationDescription?: ApplicationCodeConfigurationDescription;
  RunConfigurationDescription?: RunConfigurationDescription;
  FlinkApplicationConfigurationDescription?: FlinkApplicationConfigurationDescription;
  EnvironmentPropertyDescriptions?: EnvironmentPropertyDescriptions;
  ApplicationSnapshotConfigurationDescription?: ApplicationSnapshotConfigurationDescription;
  ApplicationSystemRollbackConfigurationDescription?: ApplicationSystemRollbackConfigurationDescription;
  VpcConfigurationDescriptions?: VpcConfigurationDescription[];
  ZeppelinApplicationConfigurationDescription?: ZeppelinApplicationConfigurationDescription;
  ApplicationEncryptionConfigurationDescription?: ApplicationEncryptionConfigurationDescription;
}
export type ApplicationMaintenanceWindowStartTime = string;
export type ApplicationMaintenanceWindowEndTime = string;
export interface ApplicationMaintenanceConfigurationDescription {
  ApplicationMaintenanceWindowStartTime: string;
  ApplicationMaintenanceWindowEndTime: string;
}
export interface ApplicationDetail {
  ApplicationARN: string;
  ApplicationDescription?: string;
  ApplicationName: string;
  RuntimeEnvironment: RuntimeEnvironment;
  ServiceExecutionRole?: string;
  ApplicationStatus: ApplicationStatus;
  ApplicationVersionId: number;
  CreateTimestamp?: Date;
  LastUpdateTimestamp?: Date;
  ApplicationConfigurationDescription?: ApplicationConfigurationDescription;
  CloudWatchLoggingOptionDescriptions?: CloudWatchLoggingOptionDescription[];
  ApplicationMaintenanceConfigurationDescription?: ApplicationMaintenanceConfigurationDescription;
  ApplicationVersionUpdatedFrom?: number;
  ApplicationVersionRolledBackFrom?: number;
  ApplicationVersionCreateTimestamp?: Date;
  ConditionalToken?: string;
  ApplicationVersionRolledBackTo?: number;
  ApplicationMode?: ApplicationMode;
}
export interface CreateApplicationResponse {
  ApplicationDetail: ApplicationDetail;
}
export type UrlType = "FLINK_DASHBOARD_URL" | "ZEPPELIN_UI_URL" | (string & {});
export type SessionExpirationDurationInSeconds = number;
export interface CreateApplicationPresignedUrlRequest {
  ApplicationName: string;
  UrlType: UrlType;
  SessionExpirationDurationInSeconds?: number;
}
export type AuthorizedUrl = string;
export interface CreateApplicationPresignedUrlResponse {
  AuthorizedUrl?: string;
}
export interface CreateApplicationSnapshotRequest {
  ApplicationName: string;
  SnapshotName: string;
}
export interface CreateApplicationSnapshotResponse {}
export interface DeleteApplicationRequest {
  ApplicationName: string;
  CreateTimestamp: Date;
}
export interface DeleteApplicationResponse {}
export interface DeleteApplicationCloudWatchLoggingOptionRequest {
  ApplicationName: string;
  CurrentApplicationVersionId?: number;
  CloudWatchLoggingOptionId: string;
  ConditionalToken?: string;
}
export interface DeleteApplicationCloudWatchLoggingOptionResponse {
  ApplicationARN?: string;
  ApplicationVersionId?: number;
  CloudWatchLoggingOptionDescriptions?: CloudWatchLoggingOptionDescription[];
  OperationId?: string;
}
export interface DeleteApplicationInputProcessingConfigurationRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  InputId: string;
}
export interface DeleteApplicationInputProcessingConfigurationResponse {
  ApplicationARN?: string;
  ApplicationVersionId?: number;
}
export interface DeleteApplicationOutputRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  OutputId: string;
}
export interface DeleteApplicationOutputResponse {
  ApplicationARN?: string;
  ApplicationVersionId?: number;
}
export interface DeleteApplicationReferenceDataSourceRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  ReferenceId: string;
}
export interface DeleteApplicationReferenceDataSourceResponse {
  ApplicationARN?: string;
  ApplicationVersionId?: number;
}
export interface DeleteApplicationSnapshotRequest {
  ApplicationName: string;
  SnapshotName: string;
  SnapshotCreationTimestamp: Date;
}
export interface DeleteApplicationSnapshotResponse {}
export interface DeleteApplicationVpcConfigurationRequest {
  ApplicationName: string;
  CurrentApplicationVersionId?: number;
  VpcConfigurationId: string;
  ConditionalToken?: string;
}
export interface DeleteApplicationVpcConfigurationResponse {
  ApplicationARN?: string;
  ApplicationVersionId?: number;
  OperationId?: string;
}
export interface DescribeApplicationRequest {
  ApplicationName: string;
  IncludeAdditionalDetails?: boolean;
}
export interface DescribeApplicationResponse {
  ApplicationDetail: ApplicationDetail;
}
export interface DescribeApplicationOperationRequest {
  ApplicationName: string;
  OperationId: string;
}
export type Operation = string;
export type OperationStatus =
  | "IN_PROGRESS"
  | "CANCELLED"
  | "SUCCESSFUL"
  | "FAILED"
  | (string & {});
export interface ApplicationVersionChangeDetails {
  ApplicationVersionUpdatedFrom: number;
  ApplicationVersionUpdatedTo: number;
}
export type ErrorString = string;
export interface ErrorInfo {
  ErrorString?: string;
}
export interface OperationFailureDetails {
  RollbackOperationId?: string;
  ErrorInfo?: ErrorInfo;
}
export interface ApplicationOperationInfoDetails {
  Operation: string;
  StartTime: Date;
  EndTime: Date;
  OperationStatus: OperationStatus;
  ApplicationVersionChangeDetails?: ApplicationVersionChangeDetails;
  OperationFailureDetails?: OperationFailureDetails;
}
export interface DescribeApplicationOperationResponse {
  ApplicationOperationInfoDetails?: ApplicationOperationInfoDetails;
}
export interface DescribeApplicationSnapshotRequest {
  ApplicationName: string;
  SnapshotName: string;
}
export type SnapshotStatus =
  | "CREATING"
  | "READY"
  | "DELETING"
  | "FAILED"
  | (string & {});
export interface SnapshotDetails {
  SnapshotName: string;
  SnapshotStatus: SnapshotStatus;
  ApplicationVersionId: number;
  SnapshotCreationTimestamp?: Date;
  RuntimeEnvironment?: RuntimeEnvironment;
  ApplicationEncryptionConfigurationDescription?: ApplicationEncryptionConfigurationDescription;
}
export interface DescribeApplicationSnapshotResponse {
  SnapshotDetails: SnapshotDetails;
}
export interface DescribeApplicationVersionRequest {
  ApplicationName: string;
  ApplicationVersionId: number;
}
export interface DescribeApplicationVersionResponse {
  ApplicationVersionDetail?: ApplicationDetail;
}
export interface S3Configuration {
  BucketARN: string;
  FileKey: string;
}
export interface DiscoverInputSchemaRequest {
  ResourceARN?: string;
  ServiceExecutionRole: string;
  InputStartingPositionConfiguration?: InputStartingPositionConfiguration;
  S3Configuration?: S3Configuration;
  InputProcessingConfiguration?: InputProcessingConfiguration;
}
export type ParsedInputRecordField = string;
export type ParsedInputRecord = string[];
export type ParsedInputRecords = string[][];
export type ProcessedInputRecord = string;
export type ProcessedInputRecords = string[];
export type RawInputRecord = string;
export type RawInputRecords = string[];
export interface DiscoverInputSchemaResponse {
  InputSchema?: SourceSchema;
  ParsedInputRecords?: string[][];
  ProcessedInputRecords?: string[];
  RawInputRecords?: string[];
}
export type ListApplicationOperationsInputLimit = number;
export type NextToken = string;
export interface ListApplicationOperationsRequest {
  ApplicationName: string;
  Limit?: number;
  NextToken?: string;
  Operation?: string;
  OperationStatus?: OperationStatus;
}
export interface ApplicationOperationInfo {
  Operation?: string;
  OperationId?: string;
  StartTime?: Date;
  EndTime?: Date;
  OperationStatus?: OperationStatus;
}
export type ApplicationOperationInfoList = ApplicationOperationInfo[];
export interface ListApplicationOperationsResponse {
  ApplicationOperationInfoList?: ApplicationOperationInfo[];
  NextToken?: string;
}
export type ListApplicationsInputLimit = number;
export interface ListApplicationsRequest {
  Limit?: number;
  NextToken?: string;
}
export interface ApplicationSummary {
  ApplicationName: string;
  ApplicationARN: string;
  ApplicationStatus: ApplicationStatus;
  ApplicationVersionId: number;
  RuntimeEnvironment: RuntimeEnvironment;
  ApplicationMode?: ApplicationMode;
}
export type ApplicationSummaries = ApplicationSummary[];
export interface ListApplicationsResponse {
  ApplicationSummaries: ApplicationSummary[];
  NextToken?: string;
}
export type ListSnapshotsInputLimit = number;
export interface ListApplicationSnapshotsRequest {
  ApplicationName: string;
  Limit?: number;
  NextToken?: string;
}
export type SnapshotSummaries = SnapshotDetails[];
export interface ListApplicationSnapshotsResponse {
  SnapshotSummaries?: SnapshotDetails[];
  NextToken?: string;
}
export type ListApplicationVersionsInputLimit = number;
export interface ListApplicationVersionsRequest {
  ApplicationName: string;
  Limit?: number;
  NextToken?: string;
}
export interface ApplicationVersionSummary {
  ApplicationVersionId: number;
  ApplicationStatus: ApplicationStatus;
}
export type ApplicationVersionSummaries = ApplicationVersionSummary[];
export interface ListApplicationVersionsResponse {
  ApplicationVersionSummaries?: ApplicationVersionSummary[];
  NextToken?: string;
}
export type KinesisAnalyticsARN = string;
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export interface RollbackApplicationRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
}
export interface RollbackApplicationResponse {
  ApplicationDetail: ApplicationDetail;
  OperationId?: string;
}
export interface SqlRunConfiguration {
  InputId: string;
  InputStartingPositionConfiguration: InputStartingPositionConfiguration;
}
export type SqlRunConfigurations = SqlRunConfiguration[];
export interface RunConfiguration {
  FlinkRunConfiguration?: FlinkRunConfiguration;
  SqlRunConfigurations?: SqlRunConfiguration[];
  ApplicationRestoreConfiguration?: ApplicationRestoreConfiguration;
}
export interface StartApplicationRequest {
  ApplicationName: string;
  RunConfiguration?: RunConfiguration;
}
export interface StartApplicationResponse {
  OperationId?: string;
}
export interface StopApplicationRequest {
  ApplicationName: string;
  Force?: boolean;
}
export interface StopApplicationResponse {
  OperationId?: string;
}
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeys = string[];
export interface UntagResourceRequest {
  ResourceARN: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface InputLambdaProcessorUpdate {
  ResourceARNUpdate: string;
}
export interface InputProcessingConfigurationUpdate {
  InputLambdaProcessorUpdate: InputLambdaProcessorUpdate;
}
export interface KinesisStreamsInputUpdate {
  ResourceARNUpdate: string;
}
export interface KinesisFirehoseInputUpdate {
  ResourceARNUpdate: string;
}
export interface InputSchemaUpdate {
  RecordFormatUpdate?: RecordFormat;
  RecordEncodingUpdate?: string;
  RecordColumnUpdates?: RecordColumn[];
}
export interface InputParallelismUpdate {
  CountUpdate: number;
}
export interface InputUpdate {
  InputId: string;
  NamePrefixUpdate?: string;
  InputProcessingConfigurationUpdate?: InputProcessingConfigurationUpdate;
  KinesisStreamsInputUpdate?: KinesisStreamsInputUpdate;
  KinesisFirehoseInputUpdate?: KinesisFirehoseInputUpdate;
  InputSchemaUpdate?: InputSchemaUpdate;
  InputParallelismUpdate?: InputParallelismUpdate;
}
export type InputUpdates = InputUpdate[];
export interface KinesisStreamsOutputUpdate {
  ResourceARNUpdate: string;
}
export interface KinesisFirehoseOutputUpdate {
  ResourceARNUpdate: string;
}
export interface LambdaOutputUpdate {
  ResourceARNUpdate: string;
}
export interface OutputUpdate {
  OutputId: string;
  NameUpdate?: string;
  KinesisStreamsOutputUpdate?: KinesisStreamsOutputUpdate;
  KinesisFirehoseOutputUpdate?: KinesisFirehoseOutputUpdate;
  LambdaOutputUpdate?: LambdaOutputUpdate;
  DestinationSchemaUpdate?: DestinationSchema;
}
export type OutputUpdates = OutputUpdate[];
export interface S3ReferenceDataSourceUpdate {
  BucketARNUpdate?: string;
  FileKeyUpdate?: string;
}
export interface ReferenceDataSourceUpdate {
  ReferenceId: string;
  TableNameUpdate?: string;
  S3ReferenceDataSourceUpdate?: S3ReferenceDataSourceUpdate;
  ReferenceSchemaUpdate?: SourceSchema;
}
export type ReferenceDataSourceUpdates = ReferenceDataSourceUpdate[];
export interface SqlApplicationConfigurationUpdate {
  InputUpdates?: InputUpdate[];
  OutputUpdates?: OutputUpdate[];
  ReferenceDataSourceUpdates?: ReferenceDataSourceUpdate[];
}
export interface S3ContentLocationUpdate {
  BucketARNUpdate?: string;
  FileKeyUpdate?: string;
  ObjectVersionUpdate?: string;
}
export interface CodeContentUpdate {
  TextContentUpdate?: string;
  ZipFileContentUpdate?: Uint8Array;
  S3ContentLocationUpdate?: S3ContentLocationUpdate;
}
export interface ApplicationCodeConfigurationUpdate {
  CodeContentTypeUpdate?: CodeContentType;
  CodeContentUpdate?: CodeContentUpdate;
}
export interface CheckpointConfigurationUpdate {
  ConfigurationTypeUpdate?: ConfigurationType;
  CheckpointingEnabledUpdate?: boolean;
  CheckpointIntervalUpdate?: number;
  MinPauseBetweenCheckpointsUpdate?: number;
}
export interface MonitoringConfigurationUpdate {
  ConfigurationTypeUpdate?: ConfigurationType;
  MetricsLevelUpdate?: MetricsLevel;
  LogLevelUpdate?: LogLevel;
}
export interface ParallelismConfigurationUpdate {
  ConfigurationTypeUpdate?: ConfigurationType;
  ParallelismUpdate?: number;
  ParallelismPerKPUUpdate?: number;
  AutoScalingEnabledUpdate?: boolean;
}
export interface FlinkApplicationConfigurationUpdate {
  CheckpointConfigurationUpdate?: CheckpointConfigurationUpdate;
  MonitoringConfigurationUpdate?: MonitoringConfigurationUpdate;
  ParallelismConfigurationUpdate?: ParallelismConfigurationUpdate;
}
export interface EnvironmentPropertyUpdates {
  PropertyGroups: PropertyGroup[];
}
export interface ApplicationSnapshotConfigurationUpdate {
  SnapshotsEnabledUpdate: boolean;
}
export interface ApplicationSystemRollbackConfigurationUpdate {
  RollbackEnabledUpdate: boolean;
}
export interface VpcConfigurationUpdate {
  VpcConfigurationId: string;
  SubnetIdUpdates?: string[];
  SecurityGroupIdUpdates?: string[];
}
export type VpcConfigurationUpdates = VpcConfigurationUpdate[];
export interface ZeppelinMonitoringConfigurationUpdate {
  LogLevelUpdate: LogLevel;
}
export interface GlueDataCatalogConfigurationUpdate {
  DatabaseARNUpdate: string;
}
export interface CatalogConfigurationUpdate {
  GlueDataCatalogConfigurationUpdate: GlueDataCatalogConfigurationUpdate;
}
export interface S3ContentBaseLocationUpdate {
  BucketARNUpdate?: string;
  BasePathUpdate?: string;
}
export interface DeployAsApplicationConfigurationUpdate {
  S3ContentLocationUpdate?: S3ContentBaseLocationUpdate;
}
export interface ZeppelinApplicationConfigurationUpdate {
  MonitoringConfigurationUpdate?: ZeppelinMonitoringConfigurationUpdate;
  CatalogConfigurationUpdate?: CatalogConfigurationUpdate;
  DeployAsApplicationConfigurationUpdate?: DeployAsApplicationConfigurationUpdate;
  CustomArtifactsConfigurationUpdate?: CustomArtifactConfiguration[];
}
export interface ApplicationEncryptionConfigurationUpdate {
  KeyIdUpdate?: string;
  KeyTypeUpdate: KeyType;
}
export interface ApplicationConfigurationUpdate {
  SqlApplicationConfigurationUpdate?: SqlApplicationConfigurationUpdate;
  ApplicationCodeConfigurationUpdate?: ApplicationCodeConfigurationUpdate;
  FlinkApplicationConfigurationUpdate?: FlinkApplicationConfigurationUpdate;
  EnvironmentPropertyUpdates?: EnvironmentPropertyUpdates;
  ApplicationSnapshotConfigurationUpdate?: ApplicationSnapshotConfigurationUpdate;
  ApplicationSystemRollbackConfigurationUpdate?: ApplicationSystemRollbackConfigurationUpdate;
  VpcConfigurationUpdates?: VpcConfigurationUpdate[];
  ZeppelinApplicationConfigurationUpdate?: ZeppelinApplicationConfigurationUpdate;
  ApplicationEncryptionConfigurationUpdate?: ApplicationEncryptionConfigurationUpdate;
}
export interface RunConfigurationUpdate {
  FlinkRunConfiguration?: FlinkRunConfiguration;
  ApplicationRestoreConfiguration?: ApplicationRestoreConfiguration;
}
export interface CloudWatchLoggingOptionUpdate {
  CloudWatchLoggingOptionId: string;
  LogStreamARNUpdate?: string;
}
export type CloudWatchLoggingOptionUpdates = CloudWatchLoggingOptionUpdate[];
export interface UpdateApplicationRequest {
  ApplicationName: string;
  CurrentApplicationVersionId?: number;
  ApplicationConfigurationUpdate?: ApplicationConfigurationUpdate;
  ServiceExecutionRoleUpdate?: string;
  RunConfigurationUpdate?: RunConfigurationUpdate;
  CloudWatchLoggingOptionUpdates?: CloudWatchLoggingOptionUpdate[];
  ConditionalToken?: string;
  RuntimeEnvironmentUpdate?: RuntimeEnvironment;
}
export interface UpdateApplicationResponse {
  ApplicationDetail: ApplicationDetail;
  OperationId?: string;
}
export interface ApplicationMaintenanceConfigurationUpdate {
  ApplicationMaintenanceWindowStartTimeUpdate: string;
}
export interface UpdateApplicationMaintenanceConfigurationRequest {
  ApplicationName: string;
  ApplicationMaintenanceConfigurationUpdate: ApplicationMaintenanceConfigurationUpdate;
}
export interface UpdateApplicationMaintenanceConfigurationResponse {
  ApplicationARN?: string;
  ApplicationMaintenanceConfigurationDescription?: ApplicationMaintenanceConfigurationDescription;
}
export type ErrorMessage = string;
export type AddApplicationCloudWatchLoggingOptionError =
  | ConcurrentModificationException
  | InvalidApplicationConfigurationException
  | InvalidArgumentException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds an Amazon CloudWatch log stream to monitor application configuration errors.
 */
export const addApplicationCloudWatchLoggingOption: API.OperationMethod<
  AddApplicationCloudWatchLoggingOptionRequest,
  AddApplicationCloudWatchLoggingOptionResponse,
  AddApplicationCloudWatchLoggingOptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ApplicationName: 0,
      CurrentApplicationVersionId: 0,
      CloudWatchLoggingOption: i_CloudWatchLoggingOption,
      ConditionalToken: 0,
    },
  },
  errors: [
    ConcurrentModificationException,
    InvalidApplicationConfigurationException,
    InvalidArgumentException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddApplicationCloudWatchLoggingOption",
})) as any;

export type AddApplicationInputError =
  | CodeValidationException
  | ConcurrentModificationException
  | InvalidArgumentException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds a streaming source to your SQL-based Kinesis Data Analytics application.
 *
 * You can add a streaming source when you create an application, or you can use this
 * operation to add a streaming source after you create an application. For more information, see
 * CreateApplication.
 *
 * Any configuration update, including adding a streaming source using this operation,
 * results in a new version of the application. You can use the DescribeApplication operation
 * to find the current application version.
 */
export const addApplicationInput: API.OperationMethod<
  AddApplicationInputRequest,
  AddApplicationInputResponse,
  AddApplicationInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ApplicationName: 0,
      CurrentApplicationVersionId: 0,
      Input: i_Input,
    },
  },
  errors: [
    CodeValidationException,
    ConcurrentModificationException,
    InvalidArgumentException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddApplicationInput",
})) as any;

export type AddApplicationInputProcessingConfigurationError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds an InputProcessingConfiguration to a SQL-based Kinesis Data Analytics application. An input processor pre-processes records
 * on the input stream before the
 * application's SQL code executes. Currently, the only input processor available is Amazon Lambda.
 */
export const addApplicationInputProcessingConfiguration: API.OperationMethod<
  AddApplicationInputProcessingConfigurationRequest,
  AddApplicationInputProcessingConfigurationResponse,
  AddApplicationInputProcessingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ApplicationName: 0,
      CurrentApplicationVersionId: 0,
      InputId: 0,
      InputProcessingConfiguration: i_InputProcessingConfiguration,
    },
  },
  errors: [
    ConcurrentModificationException,
    InvalidArgumentException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddApplicationInputProcessingConfiguration",
})) as any;

export type AddApplicationOutputError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds an external destination to your SQL-based Kinesis Data Analytics application.
 *
 * If you want Kinesis Data Analytics to deliver data from an in-application stream within
 * your application to an external destination (such as an Kinesis data stream, a Kinesis Data
 * Firehose delivery stream, or an Amazon Lambda function), you add the relevant configuration to
 * your application using this operation. You can configure one or more outputs for your
 * application. Each output configuration maps an in-application stream and an external
 * destination.
 *
 * You can use one of the output configurations to deliver data from your
 * in-application error stream to an external destination so that you can analyze the
 * errors.
 *
 * Any configuration update, including adding a streaming source using this
 * operation, results in a new version of the application. You can use the DescribeApplication operation to find the current application
 * version.
 */
export const addApplicationOutput: API.OperationMethod<
  AddApplicationOutputRequest,
  AddApplicationOutputResponse,
  AddApplicationOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ApplicationName: 0,
      CurrentApplicationVersionId: 0,
      Output: i_Output,
    },
  },
  errors: [
    ConcurrentModificationException,
    InvalidArgumentException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddApplicationOutput",
})) as any;

export type AddApplicationReferenceDataSourceError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds a reference data source to an existing SQL-based Kinesis Data Analytics application.
 *
 * Kinesis Data Analytics reads reference data (that is, an Amazon S3 object) and creates an
 * in-application table within your application. In the request, you provide the source (S3
 * bucket name and object key name), name of the in-application table to create, and the
 * necessary mapping information that describes how data in an Amazon S3 object maps to columns
 * in the resulting in-application table.
 */
export const addApplicationReferenceDataSource: API.OperationMethod<
  AddApplicationReferenceDataSourceRequest,
  AddApplicationReferenceDataSourceResponse,
  AddApplicationReferenceDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ApplicationName: 0,
      CurrentApplicationVersionId: 0,
      ReferenceDataSource: i_ReferenceDataSource,
    },
  },
  errors: [
    ConcurrentModificationException,
    InvalidArgumentException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddApplicationReferenceDataSource",
})) as any;

export type AddApplicationVpcConfigurationError =
  | ConcurrentModificationException
  | InvalidApplicationConfigurationException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds a Virtual Private Cloud (VPC) configuration to the application. Applications can use VPCs to store
 * and access resources securely.
 *
 * Note the following about VPC configurations for Managed Service for Apache Flink applications:
 *
 * - VPC configurations are not supported for SQL applications.
 *
 * - When a VPC is added to a Managed Service for Apache Flink application, the application can no longer be accessed from the
 * Internet directly. To enable Internet access to the application, add an Internet gateway to your VPC.
 */
export const addApplicationVpcConfiguration: API.OperationMethod<
  AddApplicationVpcConfigurationRequest,
  AddApplicationVpcConfigurationResponse,
  AddApplicationVpcConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ApplicationName: 0,
      CurrentApplicationVersionId: 0,
      VpcConfiguration: i_VpcConfiguration,
      ConditionalToken: 0,
    },
  },
  errors: [
    ConcurrentModificationException,
    InvalidApplicationConfigurationException,
    InvalidArgumentException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddApplicationVpcConfiguration",
})) as any;

export type CreateApplicationError =
  | CodeValidationException
  | ConcurrentModificationException
  | InvalidArgumentException
  | InvalidRequestException
  | LimitExceededException
  | ResourceInUseException
  | TooManyTagsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Creates a Managed Service for Apache Flink application. For information about creating a
 * Managed Service for Apache Flink application, see Creating an
 * Application.
 */
export const createApplication: API.OperationMethod<
  CreateApplicationRequest,
  CreateApplicationResponse,
  CreateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ApplicationName: 0,
      ApplicationDescription: 0,
      RuntimeEnvironment: 0,
      ServiceExecutionRole: 0,
      ApplicationConfiguration: {
        SqlApplicationConfiguration: {
          Inputs: D.list(i_Input),
          Outputs: D.list(i_Output),
          ReferenceDataSources: D.list(i_ReferenceDataSource),
        },
        FlinkApplicationConfiguration: {
          CheckpointConfiguration: {
            ConfigurationType: 0,
            CheckpointingEnabled: 0,
            CheckpointInterval: 0,
            MinPauseBetweenCheckpoints: 0,
          },
          MonitoringConfiguration: {
            ConfigurationType: 0,
            MetricsLevel: 0,
            LogLevel: 0,
          },
          ParallelismConfiguration: {
            ConfigurationType: 0,
            Parallelism: 0,
            ParallelismPerKPU: 0,
            AutoScalingEnabled: 0,
          },
        },
        EnvironmentProperties: { PropertyGroups: D.list(i_PropertyGroup) },
        ApplicationCodeConfiguration: {
          CodeContent: {
            TextContent: 0,
            ZipFileContent: 0,
            S3ContentLocation: i_S3ContentLocation,
          },
          CodeContentType: 0,
        },
        ApplicationSnapshotConfiguration: { SnapshotsEnabled: 0 },
        ApplicationSystemRollbackConfiguration: { RollbackEnabled: 0 },
        VpcConfigurations: D.list(i_VpcConfiguration),
        ZeppelinApplicationConfiguration: {
          MonitoringConfiguration: { LogLevel: 0 },
          CatalogConfiguration: {
            GlueDataCatalogConfiguration: { DatabaseARN: 0 },
          },
          DeployAsApplicationConfiguration: {
            S3ContentLocation: { BucketARN: 0, BasePath: 0 },
          },
          CustomArtifactsConfiguration: D.list(i_CustomArtifactConfiguration),
        },
        ApplicationEncryptionConfiguration: { KeyId: 0, KeyType: 0 },
      },
      CloudWatchLoggingOptions: D.list(i_CloudWatchLoggingOption),
      Tags: D.list(i_Tag),
      ApplicationMode: 0,
    },
    output: { ApplicationDetail: o_ApplicationDetail },
  },
  errors: [
    CodeValidationException,
    ConcurrentModificationException,
    InvalidArgumentException,
    InvalidRequestException,
    LimitExceededException,
    ResourceInUseException,
    TooManyTagsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
})) as any;

export type CreateApplicationPresignedUrlError =
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates and returns a URL that you can use to connect to
 * an application's extension.
 *
 * The IAM role or user used to call this API defines the permissions to access the
 * extension. After the presigned URL is created, no additional permission is required to access
 * this URL. IAM authorization policies for this API are also enforced for every HTTP request
 * that attempts to connect to the extension.
 *
 * You control the amount of time that the URL will be valid using the `SessionExpirationDurationInSeconds`
 * parameter. If you do not provide this parameter, the returned URL is valid for twelve hours.
 *
 * The URL that you get from a call to CreateApplicationPresignedUrl must be used within 3 minutes
 * to be valid.
 * If you first try to use the URL after the 3-minute limit expires, the service returns an HTTP 403 Forbidden error.
 */
export const createApplicationPresignedUrl: API.OperationMethod<
  CreateApplicationPresignedUrlRequest,
  CreateApplicationPresignedUrlResponse,
  CreateApplicationPresignedUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ApplicationName: 0,
      UrlType: 0,
      SessionExpirationDurationInSeconds: 0,
    },
  },
  errors: [
    InvalidArgumentException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplicationPresignedUrl",
})) as any;

export type CreateApplicationSnapshotError =
  | InvalidApplicationConfigurationException
  | InvalidArgumentException
  | InvalidRequestException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Creates a snapshot of the application's state data.
 */
export const createApplicationSnapshot: API.OperationMethod<
  CreateApplicationSnapshotRequest,
  CreateApplicationSnapshotResponse,
  CreateApplicationSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ApplicationName: 0, SnapshotName: 0 } },
  errors: [
    InvalidApplicationConfigurationException,
    InvalidArgumentException,
    InvalidRequestException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplicationSnapshot",
})) as any;

export type DeleteApplicationError =
  | ConcurrentModificationException
  | InvalidApplicationConfigurationException
  | InvalidArgumentException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified application. Managed Service for Apache Flink halts application execution and deletes the application.
 */
export const deleteApplication: API.OperationMethod<
  DeleteApplicationRequest,
  DeleteApplicationResponse,
  DeleteApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ApplicationName: 0, CreateTimestamp: 0 },
  },
  errors: [
    ConcurrentModificationException,
    InvalidApplicationConfigurationException,
    InvalidArgumentException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
})) as any;

export type DeleteApplicationCloudWatchLoggingOptionError =
  | ConcurrentModificationException
  | InvalidApplicationConfigurationException
  | InvalidArgumentException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an Amazon CloudWatch log stream from an SQL-based Kinesis Data Analytics application.
 */
export const deleteApplicationCloudWatchLoggingOption: API.OperationMethod<
  DeleteApplicationCloudWatchLoggingOptionRequest,
  DeleteApplicationCloudWatchLoggingOptionResponse,
  DeleteApplicationCloudWatchLoggingOptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ApplicationName: 0,
      CurrentApplicationVersionId: 0,
      CloudWatchLoggingOptionId: 0,
      ConditionalToken: 0,
    },
  },
  errors: [
    ConcurrentModificationException,
    InvalidApplicationConfigurationException,
    InvalidArgumentException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplicationCloudWatchLoggingOption",
})) as any;

export type DeleteApplicationInputProcessingConfigurationError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an InputProcessingConfiguration from an input.
 */
export const deleteApplicationInputProcessingConfiguration: API.OperationMethod<
  DeleteApplicationInputProcessingConfigurationRequest,
  DeleteApplicationInputProcessingConfigurationResponse,
  DeleteApplicationInputProcessingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ApplicationName: 0, CurrentApplicationVersionId: 0, InputId: 0 },
  },
  errors: [
    ConcurrentModificationException,
    InvalidArgumentException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplicationInputProcessingConfiguration",
})) as any;

export type DeleteApplicationOutputError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the output destination configuration from your SQL-based Kinesis Data Analytics application's configuration.
 * Kinesis Data Analytics will no longer write data from
 * the corresponding in-application stream to the external output destination.
 */
export const deleteApplicationOutput: API.OperationMethod<
  DeleteApplicationOutputRequest,
  DeleteApplicationOutputResponse,
  DeleteApplicationOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ApplicationName: 0, CurrentApplicationVersionId: 0, OutputId: 0 },
  },
  errors: [
    ConcurrentModificationException,
    InvalidArgumentException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplicationOutput",
})) as any;

export type DeleteApplicationReferenceDataSourceError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a reference data source configuration from the specified SQL-based Kinesis Data Analytics application's configuration.
 *
 * If the application is running, Kinesis Data Analytics immediately removes the in-application table
 * that you created using the AddApplicationReferenceDataSource operation.
 */
export const deleteApplicationReferenceDataSource: API.OperationMethod<
  DeleteApplicationReferenceDataSourceRequest,
  DeleteApplicationReferenceDataSourceResponse,
  DeleteApplicationReferenceDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ApplicationName: 0,
      CurrentApplicationVersionId: 0,
      ReferenceId: 0,
    },
  },
  errors: [
    ConcurrentModificationException,
    InvalidArgumentException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplicationReferenceDataSource",
})) as any;

export type DeleteApplicationSnapshotError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deletes a snapshot of application state.
 */
export const deleteApplicationSnapshot: API.OperationMethod<
  DeleteApplicationSnapshotRequest,
  DeleteApplicationSnapshotResponse,
  DeleteApplicationSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ApplicationName: 0,
      SnapshotName: 0,
      SnapshotCreationTimestamp: 0,
    },
  },
  errors: [
    ConcurrentModificationException,
    InvalidArgumentException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplicationSnapshot",
})) as any;

export type DeleteApplicationVpcConfigurationError =
  | ConcurrentModificationException
  | InvalidApplicationConfigurationException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes a VPC configuration from a Managed Service for Apache Flink application.
 */
export const deleteApplicationVpcConfiguration: API.OperationMethod<
  DeleteApplicationVpcConfigurationRequest,
  DeleteApplicationVpcConfigurationResponse,
  DeleteApplicationVpcConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ApplicationName: 0,
      CurrentApplicationVersionId: 0,
      VpcConfigurationId: 0,
      ConditionalToken: 0,
    },
  },
  errors: [
    ConcurrentModificationException,
    InvalidApplicationConfigurationException,
    InvalidArgumentException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplicationVpcConfiguration",
})) as any;

export type DescribeApplicationError =
  | InvalidArgumentException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns information about a specific Managed Service for Apache Flink application.
 *
 * If you want to retrieve a list of all applications in your account,
 * use the ListApplications operation.
 */
export const describeApplication: API.OperationMethod<
  DescribeApplicationRequest,
  DescribeApplicationResponse,
  DescribeApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ApplicationName: 0, IncludeAdditionalDetails: 0 },
    output: { ApplicationDetail: o_ApplicationDetail },
  },
  errors: [
    InvalidArgumentException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplication",
})) as any;

export type DescribeApplicationOperationError =
  | InvalidArgumentException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Provides a detailed description of a specified application operation. To see a list of all the operations of an application, invoke the ListApplicationOperations operation.
 *
 * This operation is supported only for Managed Service for Apache Flink.
 */
export const describeApplicationOperation: API.OperationMethod<
  DescribeApplicationOperationRequest,
  DescribeApplicationOperationResponse,
  DescribeApplicationOperationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ApplicationName: 0, OperationId: 0 },
    output: {
      ApplicationOperationInfoDetails: { StartTime: D.ts, EndTime: D.ts },
    },
  },
  errors: [
    InvalidArgumentException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplicationOperation",
})) as any;

export type DescribeApplicationSnapshotError =
  | InvalidArgumentException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns information about a snapshot of application state data.
 */
export const describeApplicationSnapshot: API.OperationMethod<
  DescribeApplicationSnapshotRequest,
  DescribeApplicationSnapshotResponse,
  DescribeApplicationSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ApplicationName: 0, SnapshotName: 0 },
    output: { SnapshotDetails: o_SnapshotDetails },
  },
  errors: [
    InvalidArgumentException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplicationSnapshot",
})) as any;

export type DescribeApplicationVersionError =
  | InvalidArgumentException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Provides a detailed description of a specified version of the application. To see a list of all the versions of an application, invoke the ListApplicationVersions operation.
 *
 * This operation is supported only for Managed Service for Apache Flink.
 */
export const describeApplicationVersion: API.OperationMethod<
  DescribeApplicationVersionRequest,
  DescribeApplicationVersionResponse,
  DescribeApplicationVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ApplicationName: 0, ApplicationVersionId: 0 },
    output: { ApplicationVersionDetail: o_ApplicationDetail },
  },
  errors: [
    InvalidArgumentException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplicationVersion",
})) as any;

export type DiscoverInputSchemaError =
  | InvalidArgumentException
  | InvalidRequestException
  | ResourceProvisionedThroughputExceededException
  | ServiceUnavailableException
  | UnableToDetectSchemaException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Infers a schema for a SQL-based Kinesis Data Analytics application by evaluating
 * sample records on the specified streaming source (Kinesis data stream or Kinesis Data Firehose
 * delivery stream) or Amazon S3 object. In the response, the operation returns the inferred
 * schema and also the sample records that the operation used to infer the schema.
 *
 * You can use the inferred schema when configuring a streaming source for your application.
 * When you create an application using the Kinesis Data Analytics console, the console uses this
 * operation to infer a schema and show it in the console user interface.
 */
export const discoverInputSchema: API.OperationMethod<
  DiscoverInputSchemaRequest,
  DiscoverInputSchemaResponse,
  DiscoverInputSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceARN: 0,
      ServiceExecutionRole: 0,
      InputStartingPositionConfiguration: i_InputStartingPositionConfiguration,
      S3Configuration: { BucketARN: 0, FileKey: 0 },
      InputProcessingConfiguration: i_InputProcessingConfiguration,
    },
  },
  errors: [
    InvalidArgumentException,
    InvalidRequestException,
    ResourceProvisionedThroughputExceededException,
    ServiceUnavailableException,
    UnableToDetectSchemaException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DiscoverInputSchema",
})) as any;

export type ListApplicationOperationsError =
  | InvalidArgumentException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Lists all the operations performed for the specified application such as UpdateApplication, StartApplication etc.
 * The response also includes a summary of the operation.
 *
 * To get the complete description of a specific operation, invoke the DescribeApplicationOperation operation.
 *
 * This operation is supported only for Managed Service for Apache Flink.
 */
export const listApplicationOperations: API.PaginatedOperationMethod<
  ListApplicationOperationsRequest,
  ListApplicationOperationsResponse,
  ListApplicationOperationsError,
  Credentials | HttpClient.HttpClient,
  ApplicationOperationInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ApplicationName: 0,
      Limit: 0,
      NextToken: 0,
      Operation: 0,
      OperationStatus: 0,
    },
    output: {
      ApplicationOperationInfoList: D.list({ StartTime: D.ts, EndTime: D.ts }),
    },
  },
  errors: [
    InvalidArgumentException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplicationOperations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ApplicationOperationInfoList",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListApplicationsError = InvalidRequestException | CommonErrors;
/**
 * Returns a list of Managed Service for Apache Flink applications in your account. For each
 * application, the response includes the application name, Amazon Resource Name (ARN), and
 * status.
 *
 * If you want detailed information about a specific application, use
 * DescribeApplication.
 */
export const listApplications: API.PaginatedOperationMethod<
  ListApplicationsRequest,
  ListApplicationsResponse,
  ListApplicationsError,
  Credentials | HttpClient.HttpClient,
  ApplicationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { Limit: 0, NextToken: 0 } },
  errors: [InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplications",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ApplicationSummaries",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListApplicationSnapshotsError =
  | InvalidArgumentException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Lists information about the current application snapshots.
 */
export const listApplicationSnapshots: API.PaginatedOperationMethod<
  ListApplicationSnapshotsRequest,
  ListApplicationSnapshotsResponse,
  ListApplicationSnapshotsError,
  Credentials | HttpClient.HttpClient,
  SnapshotDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ApplicationName: 0, Limit: 0, NextToken: 0 },
    output: { SnapshotSummaries: D.list(o_SnapshotDetails) },
  },
  errors: [InvalidArgumentException, UnsupportedOperationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplicationSnapshots",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SnapshotSummaries",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListApplicationVersionsError =
  | InvalidArgumentException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Lists all the versions for the specified application, including versions that were rolled back. The response also includes a summary of the configuration
 * associated with each version.
 *
 * To get the complete description of a specific application version, invoke the DescribeApplicationVersion operation.
 *
 * This operation is supported only for Managed Service for Apache Flink.
 */
export const listApplicationVersions: API.PaginatedOperationMethod<
  ListApplicationVersionsRequest,
  ListApplicationVersionsResponse,
  ListApplicationVersionsError,
  Credentials | HttpClient.HttpClient,
  ApplicationVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ApplicationName: 0, Limit: 0, NextToken: 0 },
  },
  errors: [
    InvalidArgumentException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplicationVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ApplicationVersionSummaries",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the list of key-value tags assigned to the application. For more information, see
 * Using Tagging.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0 } },
  errors: [
    ConcurrentModificationException,
    InvalidArgumentException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type RollbackApplicationError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Reverts the application to the previous running version. You can roll back an
 * application if you suspect it is stuck in a transient status or in the running status.
 *
 * You can roll back an application only if it is in the `UPDATING`,
 * `AUTOSCALING`, or `RUNNING` statuses.
 *
 * When you rollback an application, it loads state data from the last successful snapshot.
 * If the application has no snapshots, Managed Service for Apache Flink rejects the rollback request.
 */
export const rollbackApplication: API.OperationMethod<
  RollbackApplicationRequest,
  RollbackApplicationResponse,
  RollbackApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ApplicationName: 0, CurrentApplicationVersionId: 0 },
    output: { ApplicationDetail: o_ApplicationDetail },
  },
  errors: [
    ConcurrentModificationException,
    InvalidArgumentException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RollbackApplication",
})) as any;

export type StartApplicationError =
  | InvalidApplicationConfigurationException
  | InvalidArgumentException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Starts the specified Managed Service for Apache Flink application. After creating an application, you must exclusively call this operation to
 * start your application.
 */
export const startApplication: API.OperationMethod<
  StartApplicationRequest,
  StartApplicationResponse,
  StartApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ApplicationName: 0,
      RunConfiguration: {
        FlinkRunConfiguration: i_FlinkRunConfiguration,
        SqlRunConfigurations: D.list({
          InputId: 0,
          InputStartingPositionConfiguration:
            i_InputStartingPositionConfiguration,
        }),
        ApplicationRestoreConfiguration: i_ApplicationRestoreConfiguration,
      },
    },
  },
  errors: [
    InvalidApplicationConfigurationException,
    InvalidArgumentException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartApplication",
})) as any;

export type StopApplicationError =
  | ConcurrentModificationException
  | InvalidApplicationConfigurationException
  | InvalidArgumentException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Stops the application from processing data. You can stop
 * an application only if it is in the running status, unless you set the `Force`
 * parameter to `true`.
 *
 * You can use the DescribeApplication operation to find the application status.
 *
 * Managed Service for Apache Flink takes a snapshot when the application is stopped, unless `Force` is set
 * to `true`.
 */
export const stopApplication: API.OperationMethod<
  StopApplicationRequest,
  StopApplicationResponse,
  StopApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ApplicationName: 0, Force: 0 } },
  errors: [
    ConcurrentModificationException,
    InvalidApplicationConfigurationException,
    InvalidArgumentException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopApplication",
})) as any;

export type TagResourceError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Adds one or more key-value tags to a Managed Service for Apache Flink application. Note that the maximum number of application
 * tags includes system tags. The maximum number of user-defined application tags is 50.
 * For more information, see Using Tagging.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, Tags: D.list(i_Tag) } },
  errors: [
    ConcurrentModificationException,
    InvalidArgumentException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Removes one or more tags from a Managed Service for Apache Flink application. For more information, see
 * Using Tagging.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, TagKeys: 0 } },
  errors: [
    ConcurrentModificationException,
    InvalidArgumentException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateApplicationError =
  | CodeValidationException
  | ConcurrentModificationException
  | InvalidApplicationConfigurationException
  | InvalidArgumentException
  | InvalidRequestException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates an existing Managed Service for Apache Flink application. Using this operation, you
 * can update application code, input configuration, and output configuration.
 *
 * Managed Service for Apache Flink updates the `ApplicationVersionId` each time you update
 * your application.
 */
export const updateApplication: API.OperationMethod<
  UpdateApplicationRequest,
  UpdateApplicationResponse,
  UpdateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ApplicationName: 0,
      CurrentApplicationVersionId: 0,
      ApplicationConfigurationUpdate: {
        SqlApplicationConfigurationUpdate: {
          InputUpdates: D.list({
            InputId: 0,
            NamePrefixUpdate: 0,
            InputProcessingConfigurationUpdate: {
              InputLambdaProcessorUpdate: { ResourceARNUpdate: 0 },
            },
            KinesisStreamsInputUpdate: { ResourceARNUpdate: 0 },
            KinesisFirehoseInputUpdate: { ResourceARNUpdate: 0 },
            InputSchemaUpdate: {
              RecordFormatUpdate: i_RecordFormat,
              RecordEncodingUpdate: 0,
              RecordColumnUpdates: D.list(i_RecordColumn),
            },
            InputParallelismUpdate: { CountUpdate: 0 },
          }),
          OutputUpdates: D.list({
            OutputId: 0,
            NameUpdate: 0,
            KinesisStreamsOutputUpdate: { ResourceARNUpdate: 0 },
            KinesisFirehoseOutputUpdate: { ResourceARNUpdate: 0 },
            LambdaOutputUpdate: { ResourceARNUpdate: 0 },
            DestinationSchemaUpdate: i_DestinationSchema,
          }),
          ReferenceDataSourceUpdates: D.list({
            ReferenceId: 0,
            TableNameUpdate: 0,
            S3ReferenceDataSourceUpdate: {
              BucketARNUpdate: 0,
              FileKeyUpdate: 0,
            },
            ReferenceSchemaUpdate: i_SourceSchema,
          }),
        },
        ApplicationCodeConfigurationUpdate: {
          CodeContentTypeUpdate: 0,
          CodeContentUpdate: {
            TextContentUpdate: 0,
            ZipFileContentUpdate: 0,
            S3ContentLocationUpdate: {
              BucketARNUpdate: 0,
              FileKeyUpdate: 0,
              ObjectVersionUpdate: 0,
            },
          },
        },
        FlinkApplicationConfigurationUpdate: {
          CheckpointConfigurationUpdate: {
            ConfigurationTypeUpdate: 0,
            CheckpointingEnabledUpdate: 0,
            CheckpointIntervalUpdate: 0,
            MinPauseBetweenCheckpointsUpdate: 0,
          },
          MonitoringConfigurationUpdate: {
            ConfigurationTypeUpdate: 0,
            MetricsLevelUpdate: 0,
            LogLevelUpdate: 0,
          },
          ParallelismConfigurationUpdate: {
            ConfigurationTypeUpdate: 0,
            ParallelismUpdate: 0,
            ParallelismPerKPUUpdate: 0,
            AutoScalingEnabledUpdate: 0,
          },
        },
        EnvironmentPropertyUpdates: { PropertyGroups: D.list(i_PropertyGroup) },
        ApplicationSnapshotConfigurationUpdate: { SnapshotsEnabledUpdate: 0 },
        ApplicationSystemRollbackConfigurationUpdate: {
          RollbackEnabledUpdate: 0,
        },
        VpcConfigurationUpdates: D.list({
          VpcConfigurationId: 0,
          SubnetIdUpdates: 0,
          SecurityGroupIdUpdates: 0,
        }),
        ZeppelinApplicationConfigurationUpdate: {
          MonitoringConfigurationUpdate: { LogLevelUpdate: 0 },
          CatalogConfigurationUpdate: {
            GlueDataCatalogConfigurationUpdate: { DatabaseARNUpdate: 0 },
          },
          DeployAsApplicationConfigurationUpdate: {
            S3ContentLocationUpdate: { BucketARNUpdate: 0, BasePathUpdate: 0 },
          },
          CustomArtifactsConfigurationUpdate: D.list(
            i_CustomArtifactConfiguration,
          ),
        },
        ApplicationEncryptionConfigurationUpdate: {
          KeyIdUpdate: 0,
          KeyTypeUpdate: 0,
        },
      },
      ServiceExecutionRoleUpdate: 0,
      RunConfigurationUpdate: {
        FlinkRunConfiguration: i_FlinkRunConfiguration,
        ApplicationRestoreConfiguration: i_ApplicationRestoreConfiguration,
      },
      CloudWatchLoggingOptionUpdates: D.list({
        CloudWatchLoggingOptionId: 0,
        LogStreamARNUpdate: 0,
      }),
      ConditionalToken: 0,
      RuntimeEnvironmentUpdate: 0,
    },
    output: { ApplicationDetail: o_ApplicationDetail },
  },
  errors: [
    CodeValidationException,
    ConcurrentModificationException,
    InvalidApplicationConfigurationException,
    InvalidArgumentException,
    InvalidRequestException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
})) as any;

export type UpdateApplicationMaintenanceConfigurationError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Updates the maintenance configuration of the Managed Service for Apache Flink application.
 *
 * You can invoke this operation on an application that is in one of the two following
 * states: `READY` or `RUNNING`. If you invoke it when the application is
 * in a state other than these two states, it throws a `ResourceInUseException`. The
 * service makes use of the updated configuration the next time it schedules maintenance for the
 * application. If you invoke this operation after the service schedules maintenance, the service
 * will apply the configuration update the next time it schedules maintenance for the
 * application. This means that you might not see the maintenance configuration update applied to
 * the maintenance process that follows a successful invocation of this operation, but to the
 * following maintenance process instead.
 *
 * To see the current maintenance configuration of your application, invoke the
 * DescribeApplication operation.
 *
 * For information about application maintenance, see Managed Service for Apache Flink for Apache Flink Maintenance.
 *
 * This operation is supported only for Managed Service for Apache Flink.
 */
export const updateApplicationMaintenanceConfiguration: API.OperationMethod<
  UpdateApplicationMaintenanceConfigurationRequest,
  UpdateApplicationMaintenanceConfigurationResponse,
  UpdateApplicationMaintenanceConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ApplicationName: 0,
      ApplicationMaintenanceConfigurationUpdate: {
        ApplicationMaintenanceWindowStartTimeUpdate: 0,
      },
    },
  },
  errors: [
    ConcurrentModificationException,
    InvalidArgumentException,
    ResourceInUseException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplicationMaintenanceConfiguration",
})) as any;

const i_ApplicationRestoreConfiguration: D.LazyStruct = () => ({
  ApplicationRestoreType: 0,
  SnapshotName: 0,
});
const i_CloudWatchLoggingOption: D.LazyStruct = () => ({ LogStreamARN: 0 });
const i_CustomArtifactConfiguration: D.LazyStruct = () => ({
  ArtifactType: 0,
  S3ContentLocation: i_S3ContentLocation,
  MavenReference: { GroupId: 0, ArtifactId: 0, Version: 0 },
});
const i_DestinationSchema: D.LazyStruct = () => ({ RecordFormatType: 0 });
const i_FlinkRunConfiguration: D.LazyStruct = () => ({
  AllowNonRestoredState: 0,
});
const i_Input: D.LazyStruct = () => ({
  NamePrefix: 0,
  InputProcessingConfiguration: i_InputProcessingConfiguration,
  KinesisStreamsInput: { ResourceARN: 0 },
  KinesisFirehoseInput: { ResourceARN: 0 },
  InputParallelism: { Count: 0 },
  InputSchema: i_SourceSchema,
});
const i_InputProcessingConfiguration: D.LazyStruct = () => ({
  InputLambdaProcessor: { ResourceARN: 0 },
});
const i_InputStartingPositionConfiguration: D.LazyStruct = () => ({
  InputStartingPosition: 0,
});
const i_Output: D.LazyStruct = () => ({
  Name: 0,
  KinesisStreamsOutput: { ResourceARN: 0 },
  KinesisFirehoseOutput: { ResourceARN: 0 },
  LambdaOutput: { ResourceARN: 0 },
  DestinationSchema: i_DestinationSchema,
});
const i_PropertyGroup: D.LazyStruct = () => ({
  PropertyGroupId: 0,
  PropertyMap: 0,
});
const i_RecordColumn: D.LazyStruct = () => ({
  Name: 0,
  Mapping: 0,
  SqlType: 0,
});
const i_RecordFormat: D.LazyStruct = () => ({
  RecordFormatType: 0,
  MappingParameters: {
    JSONMappingParameters: { RecordRowPath: 0 },
    CSVMappingParameters: { RecordRowDelimiter: 0, RecordColumnDelimiter: 0 },
  },
});
const i_ReferenceDataSource: D.LazyStruct = () => ({
  TableName: 0,
  S3ReferenceDataSource: { BucketARN: 0, FileKey: 0 },
  ReferenceSchema: i_SourceSchema,
});
const i_S3ContentLocation: D.LazyStruct = () => ({
  BucketARN: 0,
  FileKey: 0,
  ObjectVersion: 0,
});
const i_SourceSchema: D.LazyStruct = () => ({
  RecordFormat: i_RecordFormat,
  RecordEncoding: 0,
  RecordColumns: D.list(i_RecordColumn),
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_VpcConfiguration: D.LazyStruct = () => ({
  SubnetIds: 0,
  SecurityGroupIds: 0,
});
const o_ApplicationDetail: D.LazyStruct = () => ({
  CreateTimestamp: D.ts,
  LastUpdateTimestamp: D.ts,
  ApplicationVersionCreateTimestamp: D.ts,
});
const o_SnapshotDetails: D.LazyStruct = () => ({
  SnapshotCreationTimestamp: D.ts,
});
