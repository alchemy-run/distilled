import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const ns = /*@__PURE__*/ T.XmlNamespace("http://analytics.kinesis.amazonaws.com/doc/2018-05-23");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Kinesis Analytics V2",
  serviceShapeName: "KinesisAnalytics_20180523",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "kinesisanalytics" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-05-23");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://kinesisanalytics.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://kinesisanalytics.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://kinesisanalytics.{R}.{D}","properties":{},"headers":{}}');

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "KinesisAnalyticsV2",
  service: "KinesisAnalyticsV2",
  templates: false,
  propagate: TxXray.propagate,
} as const;

export class CodeValidationException
  extends /*@__PURE__*/ S.TaggedError<CodeValidationException>()("CodeValidationException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InvalidApplicationConfigurationException
  extends /*@__PURE__*/ S.TaggedError<InvalidApplicationConfigurationException>()(
    "InvalidApplicationConfigurationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidArgumentException
  extends /*@__PURE__*/ S.TaggedError<InvalidArgumentException>()("InvalidArgumentException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()("InvalidRequestException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()("LimitExceededException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()("ResourceInUseException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()("ResourceNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ResourceProvisionedThroughputExceededException
  extends /*@__PURE__*/ S.TaggedError<ResourceProvisionedThroughputExceededException>()(
    "ResourceProvisionedThroughputExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(503),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()("TooManyTagsException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class UnableToDetectSchemaException
  extends /*@__PURE__*/ S.TaggedError<UnableToDetectSchemaException>()(
    "UnableToDetectSchemaException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RawInputRecords: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(0, __c0, 0)).annotate({ identifier: "RawInputRecords" }),
      ),
      ProcessedInputRecords: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(0, __c0, 0)).annotate({
          identifier: "ProcessedInputRecords",
        }),
      ),
    },
  ) {}
export class UnsupportedOperationException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedOperationException>()(
    "UnsupportedOperationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export type ApplicationName = string;
export type ApplicationVersionId = number;
export type LogStreamARN = string;
export interface CloudWatchLoggingOption {
  LogStreamARN: string;
}
export type ConditionalToken = string;
export interface AddApplicationCloudWatchLoggingOptionRequest {
  ApplicationName: string;
  CurrentApplicationVersionId?: number | undefined;
  CloudWatchLoggingOption: CloudWatchLoggingOption;
  ConditionalToken?: string | undefined;
}
export type ResourceARN = string;
export type Id = string;
export type RoleARN = string;
export interface CloudWatchLoggingOptionDescription {
  CloudWatchLoggingOptionId?: string | undefined;
  LogStreamARN: string;
  RoleARN?: string | undefined;
}
export type CloudWatchLoggingOptionDescriptions = CloudWatchLoggingOptionDescription[];
export type OperationId = string;
export interface AddApplicationCloudWatchLoggingOptionResponse {
  ApplicationARN?: string | undefined;
  ApplicationVersionId?: number | undefined;
  CloudWatchLoggingOptionDescriptions?: CloudWatchLoggingOptionDescription[] | undefined;
  OperationId?: string | undefined;
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
  Count?: number | undefined;
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
  JSONMappingParameters?: JSONMappingParameters | undefined;
  CSVMappingParameters?: CSVMappingParameters | undefined;
}
export interface RecordFormat {
  RecordFormatType: RecordFormatType;
  MappingParameters?: MappingParameters | undefined;
}
export type RecordEncoding = string;
export type RecordColumnName = string;
export type RecordColumnMapping = string;
export type RecordColumnSqlType = string;
export interface RecordColumn {
  Name: string;
  Mapping?: string | undefined;
  SqlType: string;
}
export type RecordColumns = RecordColumn[];
export interface SourceSchema {
  RecordFormat: RecordFormat;
  RecordEncoding?: string | undefined;
  RecordColumns: RecordColumn[];
}
export interface Input {
  NamePrefix: string;
  InputProcessingConfiguration?: InputProcessingConfiguration | undefined;
  KinesisStreamsInput?: KinesisStreamsInput | undefined;
  KinesisFirehoseInput?: KinesisFirehoseInput | undefined;
  InputParallelism?: InputParallelism | undefined;
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
  RoleARN?: string | undefined;
}
export interface InputProcessingConfigurationDescription {
  InputLambdaProcessorDescription?: InputLambdaProcessorDescription | undefined;
}
export interface KinesisStreamsInputDescription {
  ResourceARN: string;
  RoleARN?: string | undefined;
}
export interface KinesisFirehoseInputDescription {
  ResourceARN: string;
  RoleARN?: string | undefined;
}
export type InputStartingPosition = "NOW" | "TRIM_HORIZON" | "LAST_STOPPED_POINT" | (string & {});
export interface InputStartingPositionConfiguration {
  InputStartingPosition?: InputStartingPosition | undefined;
}
export interface InputDescription {
  InputId?: string | undefined;
  NamePrefix?: string | undefined;
  InAppStreamNames?: string[] | undefined;
  InputProcessingConfigurationDescription?: InputProcessingConfigurationDescription | undefined;
  KinesisStreamsInputDescription?: KinesisStreamsInputDescription | undefined;
  KinesisFirehoseInputDescription?: KinesisFirehoseInputDescription | undefined;
  InputSchema?: SourceSchema | undefined;
  InputParallelism?: InputParallelism | undefined;
  InputStartingPositionConfiguration?: InputStartingPositionConfiguration | undefined;
}
export type InputDescriptions = InputDescription[];
export interface AddApplicationInputResponse {
  ApplicationARN?: string | undefined;
  ApplicationVersionId?: number | undefined;
  InputDescriptions?: InputDescription[] | undefined;
}
export interface AddApplicationInputProcessingConfigurationRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  InputId: string;
  InputProcessingConfiguration: InputProcessingConfiguration;
}
export interface AddApplicationInputProcessingConfigurationResponse {
  ApplicationARN?: string | undefined;
  ApplicationVersionId?: number | undefined;
  InputId?: string | undefined;
  InputProcessingConfigurationDescription?: InputProcessingConfigurationDescription | undefined;
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
  KinesisStreamsOutput?: KinesisStreamsOutput | undefined;
  KinesisFirehoseOutput?: KinesisFirehoseOutput | undefined;
  LambdaOutput?: LambdaOutput | undefined;
  DestinationSchema: DestinationSchema;
}
export interface AddApplicationOutputRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  Output: Output;
}
export interface KinesisStreamsOutputDescription {
  ResourceARN: string;
  RoleARN?: string | undefined;
}
export interface KinesisFirehoseOutputDescription {
  ResourceARN: string;
  RoleARN?: string | undefined;
}
export interface LambdaOutputDescription {
  ResourceARN: string;
  RoleARN?: string | undefined;
}
export interface OutputDescription {
  OutputId?: string | undefined;
  Name?: string | undefined;
  KinesisStreamsOutputDescription?: KinesisStreamsOutputDescription | undefined;
  KinesisFirehoseOutputDescription?: KinesisFirehoseOutputDescription | undefined;
  LambdaOutputDescription?: LambdaOutputDescription | undefined;
  DestinationSchema?: DestinationSchema | undefined;
}
export type OutputDescriptions = OutputDescription[];
export interface AddApplicationOutputResponse {
  ApplicationARN?: string | undefined;
  ApplicationVersionId?: number | undefined;
  OutputDescriptions?: OutputDescription[] | undefined;
}
export type InAppTableName = string;
export type BucketARN = string;
export type FileKey = string;
export interface S3ReferenceDataSource {
  BucketARN?: string | undefined;
  FileKey?: string | undefined;
}
export interface ReferenceDataSource {
  TableName: string;
  S3ReferenceDataSource?: S3ReferenceDataSource | undefined;
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
  ReferenceRoleARN?: string | undefined;
}
export interface ReferenceDataSourceDescription {
  ReferenceId: string;
  TableName: string;
  S3ReferenceDataSourceDescription: S3ReferenceDataSourceDescription;
  ReferenceSchema?: SourceSchema | undefined;
}
export type ReferenceDataSourceDescriptions = ReferenceDataSourceDescription[];
export interface AddApplicationReferenceDataSourceResponse {
  ApplicationARN?: string | undefined;
  ApplicationVersionId?: number | undefined;
  ReferenceDataSourceDescriptions?: ReferenceDataSourceDescription[] | undefined;
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
  CurrentApplicationVersionId?: number | undefined;
  VpcConfiguration: VpcConfiguration;
  ConditionalToken?: string | undefined;
}
export type VpcId = string;
export interface VpcConfigurationDescription {
  VpcConfigurationId: string;
  VpcId: string;
  SubnetIds: string[];
  SecurityGroupIds: string[];
}
export interface AddApplicationVpcConfigurationResponse {
  ApplicationARN?: string | undefined;
  ApplicationVersionId?: number | undefined;
  VpcConfigurationDescription?: VpcConfigurationDescription | undefined;
  OperationId?: string | undefined;
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
  Inputs?: Input[] | undefined;
  Outputs?: Output[] | undefined;
  ReferenceDataSources?: ReferenceDataSource[] | undefined;
}
export type ConfigurationType = "DEFAULT" | "CUSTOM" | (string & {});
export type CheckpointInterval = number;
export type MinPauseBetweenCheckpoints = number;
export interface CheckpointConfiguration {
  ConfigurationType: ConfigurationType;
  CheckpointingEnabled?: boolean | undefined;
  CheckpointInterval?: number | undefined;
  MinPauseBetweenCheckpoints?: number | undefined;
}
export type MetricsLevel = "APPLICATION" | "TASK" | "OPERATOR" | "PARALLELISM" | (string & {});
export type LogLevel = "INFO" | "WARN" | "ERROR" | "DEBUG" | (string & {});
export interface MonitoringConfiguration {
  ConfigurationType: ConfigurationType;
  MetricsLevel?: MetricsLevel | undefined;
  LogLevel?: LogLevel | undefined;
}
export type Parallelism = number;
export type ParallelismPerKPU = number;
export interface ParallelismConfiguration {
  ConfigurationType: ConfigurationType;
  Parallelism?: number | undefined;
  ParallelismPerKPU?: number | undefined;
  AutoScalingEnabled?: boolean | undefined;
}
export interface FlinkApplicationConfiguration {
  CheckpointConfiguration?: CheckpointConfiguration | undefined;
  MonitoringConfiguration?: MonitoringConfiguration | undefined;
  ParallelismConfiguration?: ParallelismConfiguration | undefined;
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
  ObjectVersion?: string | undefined;
}
export interface CodeContent {
  TextContent?: string | undefined;
  ZipFileContent?: Uint8Array | undefined;
  S3ContentLocation?: S3ContentLocation | undefined;
}
export type CodeContentType = "PLAINTEXT" | "ZIPFILE" | (string & {});
export interface ApplicationCodeConfiguration {
  CodeContent?: CodeContent | undefined;
  CodeContentType: CodeContentType;
}
export type SnapshotMode = "APPLICATION_SNAPSHOTS_LEGACY" | "ENHANCED_SNAPSHOTS" | (string & {});
export interface ApplicationSnapshotConfiguration {
  SnapshotsEnabled: boolean;
  SnapshotMode?: SnapshotMode | undefined;
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
  BasePath?: string | undefined;
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
  S3ContentLocation?: S3ContentLocation | undefined;
  MavenReference?: MavenReference | undefined;
}
export type CustomArtifactsConfigurationList = CustomArtifactConfiguration[];
export interface ZeppelinApplicationConfiguration {
  MonitoringConfiguration?: ZeppelinMonitoringConfiguration | undefined;
  CatalogConfiguration?: CatalogConfiguration | undefined;
  DeployAsApplicationConfiguration?: DeployAsApplicationConfiguration | undefined;
  CustomArtifactsConfiguration?: CustomArtifactConfiguration[] | undefined;
}
export type KeyId = string;
export type KeyType = "AWS_OWNED_KEY" | "CUSTOMER_MANAGED_KEY" | (string & {});
export interface ApplicationEncryptionConfiguration {
  KeyId?: string | undefined;
  KeyType: KeyType;
}
export interface ApplicationConfiguration {
  SqlApplicationConfiguration?: SqlApplicationConfiguration | undefined;
  FlinkApplicationConfiguration?: FlinkApplicationConfiguration | undefined;
  EnvironmentProperties?: EnvironmentProperties | undefined;
  ApplicationCodeConfiguration?: ApplicationCodeConfiguration | undefined;
  ApplicationSnapshotConfiguration?: ApplicationSnapshotConfiguration | undefined;
  ApplicationSystemRollbackConfiguration?: ApplicationSystemRollbackConfiguration | undefined;
  VpcConfigurations?: VpcConfiguration[] | undefined;
  ZeppelinApplicationConfiguration?: ZeppelinApplicationConfiguration | undefined;
  ApplicationEncryptionConfiguration?: ApplicationEncryptionConfiguration | undefined;
}
export type CloudWatchLoggingOptions = CloudWatchLoggingOption[];
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value?: string | undefined;
}
export type Tags = Tag[];
export type ApplicationMode = "STREAMING" | "INTERACTIVE" | (string & {});
export interface CreateApplicationRequest {
  ApplicationName: string;
  ApplicationDescription?: string | undefined;
  RuntimeEnvironment: RuntimeEnvironment;
  ServiceExecutionRole: string;
  ApplicationConfiguration?: ApplicationConfiguration | undefined;
  CloudWatchLoggingOptions?: CloudWatchLoggingOption[] | undefined;
  Tags?: Tag[] | undefined;
  ApplicationMode?: ApplicationMode | undefined;
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
  InputDescriptions?: InputDescription[] | undefined;
  OutputDescriptions?: OutputDescription[] | undefined;
  ReferenceDataSourceDescriptions?: ReferenceDataSourceDescription[] | undefined;
}
export type CodeMD5 = string;
export type CodeSize = number;
export interface S3ApplicationCodeLocationDescription {
  BucketARN: string;
  FileKey: string;
  ObjectVersion?: string | undefined;
}
export interface CodeContentDescription {
  TextContent?: string | undefined;
  CodeMD5?: string | undefined;
  CodeSize?: number | undefined;
  S3ApplicationCodeLocationDescription?: S3ApplicationCodeLocationDescription | undefined;
}
export interface ApplicationCodeConfigurationDescription {
  CodeContentType: CodeContentType;
  CodeContentDescription?: CodeContentDescription | undefined;
}
export type ApplicationRestoreType =
  | "SKIP_RESTORE_FROM_SNAPSHOT"
  | "RESTORE_FROM_LATEST_SNAPSHOT"
  | "RESTORE_FROM_CUSTOM_SNAPSHOT"
  | (string & {});
export type SnapshotName = string;
export type SnapshotArn = string;
export interface ApplicationRestoreConfiguration {
  ApplicationRestoreType: ApplicationRestoreType;
  SnapshotName?: string | undefined;
  SnapshotArn?: string | undefined;
}
export interface FlinkRunConfiguration {
  AllowNonRestoredState?: boolean | undefined;
}
export interface RunConfigurationDescription {
  ApplicationRestoreConfigurationDescription?: ApplicationRestoreConfiguration | undefined;
  FlinkRunConfigurationDescription?: FlinkRunConfiguration | undefined;
}
export interface CheckpointConfigurationDescription {
  ConfigurationType?: ConfigurationType | undefined;
  CheckpointingEnabled?: boolean | undefined;
  CheckpointInterval?: number | undefined;
  MinPauseBetweenCheckpoints?: number | undefined;
}
export interface MonitoringConfigurationDescription {
  ConfigurationType?: ConfigurationType | undefined;
  MetricsLevel?: MetricsLevel | undefined;
  LogLevel?: LogLevel | undefined;
}
export interface ParallelismConfigurationDescription {
  ConfigurationType?: ConfigurationType | undefined;
  Parallelism?: number | undefined;
  ParallelismPerKPU?: number | undefined;
  CurrentParallelism?: number | undefined;
  AutoScalingEnabled?: boolean | undefined;
}
export type JobPlanDescription = string;
export interface FlinkApplicationConfigurationDescription {
  CheckpointConfigurationDescription?: CheckpointConfigurationDescription | undefined;
  MonitoringConfigurationDescription?: MonitoringConfigurationDescription | undefined;
  ParallelismConfigurationDescription?: ParallelismConfigurationDescription | undefined;
  JobPlanDescription?: string | undefined;
}
export interface EnvironmentPropertyDescriptions {
  PropertyGroupDescriptions?: PropertyGroup[] | undefined;
}
export interface ApplicationSnapshotConfigurationDescription {
  SnapshotsEnabled: boolean;
  SnapshotMode?: SnapshotMode | undefined;
}
export interface ApplicationSystemRollbackConfigurationDescription {
  RollbackEnabled: boolean;
}
export type VpcConfigurationDescriptions = VpcConfigurationDescription[];
export interface ZeppelinMonitoringConfigurationDescription {
  LogLevel?: LogLevel | undefined;
}
export interface GlueDataCatalogConfigurationDescription {
  DatabaseARN: string;
}
export interface CatalogConfigurationDescription {
  GlueDataCatalogConfigurationDescription: GlueDataCatalogConfigurationDescription;
}
export interface S3ContentBaseLocationDescription {
  BucketARN: string;
  BasePath?: string | undefined;
}
export interface DeployAsApplicationConfigurationDescription {
  S3ContentLocationDescription: S3ContentBaseLocationDescription;
}
export interface CustomArtifactConfigurationDescription {
  ArtifactType?: ArtifactType | undefined;
  S3ContentLocationDescription?: S3ContentLocation | undefined;
  MavenReferenceDescription?: MavenReference | undefined;
}
export type CustomArtifactsConfigurationDescriptionList = CustomArtifactConfigurationDescription[];
export interface ZeppelinApplicationConfigurationDescription {
  MonitoringConfigurationDescription: ZeppelinMonitoringConfigurationDescription;
  CatalogConfigurationDescription?: CatalogConfigurationDescription | undefined;
  DeployAsApplicationConfigurationDescription?:
    | DeployAsApplicationConfigurationDescription
    | undefined;
  CustomArtifactsConfigurationDescription?: CustomArtifactConfigurationDescription[] | undefined;
}
export interface ApplicationEncryptionConfigurationDescription {
  KeyId?: string | undefined;
  KeyType: KeyType;
}
export interface ApplicationConfigurationDescription {
  SqlApplicationConfigurationDescription?: SqlApplicationConfigurationDescription | undefined;
  ApplicationCodeConfigurationDescription?: ApplicationCodeConfigurationDescription | undefined;
  RunConfigurationDescription?: RunConfigurationDescription | undefined;
  FlinkApplicationConfigurationDescription?: FlinkApplicationConfigurationDescription | undefined;
  EnvironmentPropertyDescriptions?: EnvironmentPropertyDescriptions | undefined;
  ApplicationSnapshotConfigurationDescription?:
    | ApplicationSnapshotConfigurationDescription
    | undefined;
  ApplicationSystemRollbackConfigurationDescription?:
    | ApplicationSystemRollbackConfigurationDescription
    | undefined;
  VpcConfigurationDescriptions?: VpcConfigurationDescription[] | undefined;
  ZeppelinApplicationConfigurationDescription?:
    | ZeppelinApplicationConfigurationDescription
    | undefined;
  ApplicationEncryptionConfigurationDescription?:
    | ApplicationEncryptionConfigurationDescription
    | undefined;
}
export type ApplicationMaintenanceWindowStartTime = string;
export type ApplicationMaintenanceWindowEndTime = string;
export interface ApplicationMaintenanceConfigurationDescription {
  ApplicationMaintenanceWindowStartTime: string;
  ApplicationMaintenanceWindowEndTime: string;
}
export interface ApplicationDetail {
  ApplicationARN: string;
  ApplicationDescription?: string | undefined;
  ApplicationName: string;
  RuntimeEnvironment: RuntimeEnvironment;
  ServiceExecutionRole?: string | undefined;
  ApplicationStatus: ApplicationStatus;
  ApplicationVersionId: number;
  CreateTimestamp?: Date | undefined;
  LastUpdateTimestamp?: Date | undefined;
  ApplicationConfigurationDescription?: ApplicationConfigurationDescription | undefined;
  CloudWatchLoggingOptionDescriptions?: CloudWatchLoggingOptionDescription[] | undefined;
  ApplicationMaintenanceConfigurationDescription?:
    | ApplicationMaintenanceConfigurationDescription
    | undefined;
  ApplicationVersionUpdatedFrom?: number | undefined;
  ApplicationVersionRolledBackFrom?: number | undefined;
  ApplicationVersionCreateTimestamp?: Date | undefined;
  ConditionalToken?: string | undefined;
  ApplicationVersionRolledBackTo?: number | undefined;
  ApplicationMode?: ApplicationMode | undefined;
}
export interface CreateApplicationResponse {
  ApplicationDetail: ApplicationDetail;
}
export type UrlType = "FLINK_DASHBOARD_URL" | "ZEPPELIN_UI_URL" | (string & {});
export type SessionExpirationDurationInSeconds = number;
export interface CreateApplicationPresignedUrlRequest {
  ApplicationName: string;
  UrlType: UrlType;
  SessionExpirationDurationInSeconds?: number | undefined;
}
export type AuthorizedUrl = string;
export interface CreateApplicationPresignedUrlResponse {
  AuthorizedUrl?: string | undefined;
}
export interface CreateApplicationSnapshotRequest {
  ApplicationName: string;
  SnapshotName: string;
}
export interface CreateApplicationSnapshotResponse {}
export type SnapshotV2Name = string;
export type SnapshotV2Description = string;
export interface CreateSnapshotRequest {
  ApplicationName: string;
  SnapshotName: string;
  SnapshotDescription?: string | undefined;
  Tags?: Tag[] | undefined;
}
export type SnapshotStatus = "CREATING" | "READY" | "DELETING" | "FAILED" | (string & {});
export type SnapshotOperationId = string;
export type SnapshotOperationStatus =
  | "IN_PROGRESS"
  | "SUCCESSFUL"
  | "FAILED"
  | "CANCELLED"
  | (string & {});
export interface CreateSnapshotResponse {
  SnapshotArn: string;
  SnapshotStatus: SnapshotStatus;
  SnapshotOperationId: string;
  SnapshotOperationStatus: SnapshotOperationStatus;
}
export interface DeleteApplicationRequest {
  ApplicationName: string;
  CreateTimestamp: Date;
}
export interface DeleteApplicationResponse {}
export interface DeleteApplicationCloudWatchLoggingOptionRequest {
  ApplicationName: string;
  CurrentApplicationVersionId?: number | undefined;
  CloudWatchLoggingOptionId: string;
  ConditionalToken?: string | undefined;
}
export interface DeleteApplicationCloudWatchLoggingOptionResponse {
  ApplicationARN?: string | undefined;
  ApplicationVersionId?: number | undefined;
  CloudWatchLoggingOptionDescriptions?: CloudWatchLoggingOptionDescription[] | undefined;
  OperationId?: string | undefined;
}
export interface DeleteApplicationInputProcessingConfigurationRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  InputId: string;
}
export interface DeleteApplicationInputProcessingConfigurationResponse {
  ApplicationARN?: string | undefined;
  ApplicationVersionId?: number | undefined;
}
export interface DeleteApplicationOutputRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  OutputId: string;
}
export interface DeleteApplicationOutputResponse {
  ApplicationARN?: string | undefined;
  ApplicationVersionId?: number | undefined;
}
export interface DeleteApplicationReferenceDataSourceRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  ReferenceId: string;
}
export interface DeleteApplicationReferenceDataSourceResponse {
  ApplicationARN?: string | undefined;
  ApplicationVersionId?: number | undefined;
}
export interface DeleteApplicationSnapshotRequest {
  ApplicationName: string;
  SnapshotName: string;
  SnapshotCreationTimestamp: Date;
}
export interface DeleteApplicationSnapshotResponse {}
export interface DeleteApplicationVpcConfigurationRequest {
  ApplicationName: string;
  CurrentApplicationVersionId?: number | undefined;
  VpcConfigurationId: string;
  ConditionalToken?: string | undefined;
}
export interface DeleteApplicationVpcConfigurationResponse {
  ApplicationARN?: string | undefined;
  ApplicationVersionId?: number | undefined;
  OperationId?: string | undefined;
}
export interface DeleteSnapshotRequest {
  SnapshotName: string;
  SnapshotCreationTimestamp: Date;
}
export interface DeleteSnapshotResponse {
  SnapshotArn: string;
  SnapshotStatus: SnapshotStatus;
  SnapshotOperationId: string;
  SnapshotOperationStatus: SnapshotOperationStatus;
}
export interface DescribeApplicationRequest {
  ApplicationName: string;
  IncludeAdditionalDetails?: boolean | undefined;
}
export interface DescribeApplicationResponse {
  ApplicationDetail: ApplicationDetail;
}
export interface DescribeApplicationOperationRequest {
  ApplicationName: string;
  OperationId: string;
}
export type Operation = string;
export type OperationStatus = "IN_PROGRESS" | "CANCELLED" | "SUCCESSFUL" | "FAILED" | (string & {});
export interface ApplicationVersionChangeDetails {
  ApplicationVersionUpdatedFrom: number;
  ApplicationVersionUpdatedTo: number;
}
export type ErrorString = string;
export interface ErrorInfo {
  ErrorString?: string | undefined;
}
export interface OperationFailureDetails {
  RollbackOperationId?: string | undefined;
  ErrorInfo?: ErrorInfo | undefined;
}
export interface ApplicationOperationInfoDetails {
  Operation: string;
  StartTime: Date;
  EndTime: Date;
  OperationStatus: OperationStatus;
  ApplicationVersionChangeDetails?: ApplicationVersionChangeDetails | undefined;
  OperationFailureDetails?: OperationFailureDetails | undefined;
}
export interface DescribeApplicationOperationResponse {
  ApplicationOperationInfoDetails?: ApplicationOperationInfoDetails | undefined;
}
export interface DescribeApplicationSnapshotRequest {
  ApplicationName: string;
  SnapshotName: string;
}
export interface SnapshotDetails {
  SnapshotName: string;
  SnapshotStatus: SnapshotStatus;
  ApplicationVersionId: number;
  SnapshotCreationTimestamp?: Date | undefined;
  RuntimeEnvironment?: RuntimeEnvironment | undefined;
  ApplicationEncryptionConfigurationDescription?:
    | ApplicationEncryptionConfigurationDescription
    | undefined;
}
export interface DescribeApplicationSnapshotResponse {
  SnapshotDetails: SnapshotDetails;
}
export interface DescribeApplicationVersionRequest {
  ApplicationName: string;
  ApplicationVersionId: number;
}
export interface DescribeApplicationVersionResponse {
  ApplicationVersionDetail?: ApplicationDetail | undefined;
}
export interface DescribeSnapshotRequest {
  SnapshotName: string;
}
export type SnapshotSizeInBytes = number;
export interface SnapshotEncryptionConfiguration {
  KeyId?: string | undefined;
  KeyType: KeyType;
}
export type SnapshotInitiator = "USER" | "SYSTEM" | (string & {});
export type SnapshotInitiatorOperation =
  | "CreateSnapshot"
  | "ImportSnapshot"
  | "SystemCreateSnapshot"
  | (string & {});
export type KeyPrefix = string;
export interface S3PrefixLocation {
  BucketARN: string;
  KeyPrefix: string;
}
export interface SourceApplicationDescription {
  ApplicationName: string;
  ApplicationCreationTimestamp: Date;
  ApplicationVersionId: number;
}
export interface SnapshotSourceDescription {
  S3PrefixLocation?: S3PrefixLocation | undefined;
  SourceApplicationDescription?: SourceApplicationDescription | undefined;
}
export type SnapshotFormat = "CANONICAL" | (string & {});
export interface SnapshotInfoDetails {
  SnapshotName: string;
  SnapshotArn: string;
  SnapshotDescription?: string | undefined;
  SnapshotStatus: SnapshotStatus;
  SnapshotCreationTimestamp: Date;
  RuntimeEnvironment?: RuntimeEnvironment | undefined;
  SnapshotSizeInBytes?: number | undefined;
  SnapshotEncryptionConfigurationDescription?: SnapshotEncryptionConfiguration | undefined;
  SnapshotInitiator: SnapshotInitiator;
  SnapshotInitiatorOperation: SnapshotInitiatorOperation;
  SnapshotSourceDescription: SnapshotSourceDescription;
  SnapshotFormat: SnapshotFormat;
}
export interface DescribeSnapshotResponse {
  SnapshotInfoDetails: SnapshotInfoDetails;
}
export interface DescribeSnapshotOperationRequest {
  SnapshotName: string;
  SnapshotOperationId: string;
}
export type SnapshotOperation =
  | "CreateSnapshot"
  | "DeleteSnapshot"
  | "ImportSnapshot"
  | "ExportSnapshot"
  | "SystemCreateSnapshot"
  | (string & {});
export interface EncryptionConfigurationDescription {
  KeyId?: string | undefined;
  KeyType: KeyType;
}
export type StorageLocationType = "S3" | (string & {});
export interface SnapshotOperationS3PrefixLocation {
  BucketARN: string;
  KeyPrefix: string;
  ExportedPrefix?: string | undefined;
}
export interface SnapshotOperationLocationDescription {
  LocationType: StorageLocationType;
  S3PrefixLocation: SnapshotOperationS3PrefixLocation;
}
export interface ApplicationOperationDescription {
  ApplicationOperationId?: string | undefined;
  ApplicationName?: string | undefined;
}
export type SnapshotOperationErrorCode = string;
export interface SnapshotErrorInfo {
  ErrorCode?: string | undefined;
  ErrorString?: string | undefined;
}
export interface SnapshotOperationFailureDetails {
  ErrorInfo?: SnapshotErrorInfo | undefined;
}
export interface SnapshotOperationInfoDetails {
  SnapshotOperationId: string;
  SnapshotOperation: SnapshotOperation;
  SnapshotOperationStatus: SnapshotOperationStatus;
  SnapshotArn: string;
  SourceEncryptionConfigurationDescription?: EncryptionConfigurationDescription | undefined;
  DestinationEncryptionConfigurationDescription?: EncryptionConfigurationDescription | undefined;
  SnapshotSourceLocationDescription?: SnapshotOperationLocationDescription | undefined;
  SnapshotDestinationLocationDescription?: SnapshotOperationLocationDescription | undefined;
  ApplicationOperationDescription?: ApplicationOperationDescription | undefined;
  StartTime?: Date | undefined;
  EndTime?: Date | undefined;
  SnapshotOperationFailureDetails?: SnapshotOperationFailureDetails | undefined;
}
export interface DescribeSnapshotOperationResponse {
  SnapshotOperationInfoDetails: SnapshotOperationInfoDetails;
}
export interface S3Configuration {
  BucketARN: string;
  FileKey: string;
}
export interface DiscoverInputSchemaRequest {
  ResourceARN?: string | undefined;
  ServiceExecutionRole: string;
  InputStartingPositionConfiguration?: InputStartingPositionConfiguration | undefined;
  S3Configuration?: S3Configuration | undefined;
  InputProcessingConfiguration?: InputProcessingConfiguration | undefined;
}
export type ParsedInputRecordField = string;
export type ParsedInputRecord = string[];
export type ParsedInputRecords = string[][];
export type ProcessedInputRecord = string;
export type ProcessedInputRecords = string[];
export type RawInputRecord = string;
export type RawInputRecords = string[];
export interface DiscoverInputSchemaResponse {
  InputSchema?: SourceSchema | undefined;
  ParsedInputRecords?: string[][] | undefined;
  ProcessedInputRecords?: string[] | undefined;
  RawInputRecords?: string[] | undefined;
}
export interface ExportDestinationConfiguration {
  DestinationType: StorageLocationType;
  ExportRoleArn: string;
  DestinationEncryptionConfiguration?: SnapshotEncryptionConfiguration | undefined;
  DestinationS3PrefixLocation: S3PrefixLocation;
}
export interface ExportSnapshotRequest {
  SnapshotName: string;
  ExportDestinationConfiguration: ExportDestinationConfiguration;
}
export interface ExportSnapshotResponse {
  SnapshotOperationId: string;
  SnapshotOperationStatus: SnapshotOperationStatus;
}
export interface ImportSourceConfiguration {
  SourceType: StorageLocationType;
  ImportRoleArn: string;
  SourceEncryptionConfiguration?: SnapshotEncryptionConfiguration | undefined;
  SourceS3PrefixLocation: S3PrefixLocation;
}
export interface ImportSnapshotRequest {
  SnapshotName: string;
  ImportSourceConfiguration: ImportSourceConfiguration;
  DestinationEncryptionConfiguration?: SnapshotEncryptionConfiguration | undefined;
  SnapshotDescription?: string | undefined;
  SnapshotFormat?: SnapshotFormat | undefined;
  Tags?: Tag[] | undefined;
}
export interface ImportSnapshotResponse {
  SnapshotArn: string;
  SnapshotStatus: SnapshotStatus;
  SnapshotOperationId: string;
  SnapshotOperationStatus: SnapshotOperationStatus;
}
export type ListApplicationOperationsInputLimit = number;
export type NextToken = string;
export interface ListApplicationOperationsRequest {
  ApplicationName: string;
  Limit?: number | undefined;
  NextToken?: string | undefined;
  Operation?: string | undefined;
  OperationStatus?: OperationStatus | undefined;
}
export interface ApplicationOperationInfo {
  Operation?: string | undefined;
  OperationId?: string | undefined;
  StartTime?: Date | undefined;
  EndTime?: Date | undefined;
  OperationStatus?: OperationStatus | undefined;
}
export type ApplicationOperationInfoList = ApplicationOperationInfo[];
export interface ListApplicationOperationsResponse {
  ApplicationOperationInfoList?: ApplicationOperationInfo[] | undefined;
  NextToken?: string | undefined;
}
export type ListApplicationsInputLimit = number;
export interface ListApplicationsRequest {
  Limit?: number | undefined;
  NextToken?: string | undefined;
}
export interface ApplicationSummary {
  ApplicationName: string;
  ApplicationARN: string;
  ApplicationStatus: ApplicationStatus;
  ApplicationVersionId: number;
  RuntimeEnvironment: RuntimeEnvironment;
  ApplicationMode?: ApplicationMode | undefined;
}
export type ApplicationSummaries = ApplicationSummary[];
export interface ListApplicationsResponse {
  ApplicationSummaries: ApplicationSummary[];
  NextToken?: string | undefined;
}
export type ListSnapshotsInputLimit = number;
export interface ListApplicationSnapshotsRequest {
  ApplicationName: string;
  Limit?: number | undefined;
  NextToken?: string | undefined;
}
export type SnapshotSummaries = SnapshotDetails[];
export interface ListApplicationSnapshotsResponse {
  SnapshotSummaries?: SnapshotDetails[] | undefined;
  NextToken?: string | undefined;
}
export type ListApplicationVersionsInputLimit = number;
export interface ListApplicationVersionsRequest {
  ApplicationName: string;
  Limit?: number | undefined;
  NextToken?: string | undefined;
}
export interface ApplicationVersionSummary {
  ApplicationVersionId: number;
  ApplicationStatus: ApplicationStatus;
}
export type ApplicationVersionSummaries = ApplicationVersionSummary[];
export interface ListApplicationVersionsResponse {
  ApplicationVersionSummaries?: ApplicationVersionSummary[] | undefined;
  NextToken?: string | undefined;
}
export type ListSnapshotOperationsLimit = number;
export interface ListSnapshotOperationsRequest {
  SnapshotName: string;
  SnapshotOperation?: SnapshotOperation | undefined;
  SnapshotOperationStatus?: SnapshotOperationStatus | undefined;
  Limit?: number | undefined;
  NextToken?: string | undefined;
}
export interface SnapshotOperationInfo {
  SnapshotOperationId: string;
  SnapshotOperation: SnapshotOperation;
  SnapshotOperationStatus: SnapshotOperationStatus;
  StartTime?: Date | undefined;
  EndTime?: Date | undefined;
}
export type SnapshotOperationInfoList = SnapshotOperationInfo[];
export interface ListSnapshotOperationsResponse {
  SnapshotOperationInfoList: SnapshotOperationInfo[];
  NextToken?: string | undefined;
}
export type ListSnapshotsLimit = number;
export interface ListSnapshotsRequest {
  SourceApplicationName?: string | undefined;
  SnapshotInitiator?: SnapshotInitiator | undefined;
  SnapshotInitiatorOperation?: SnapshotInitiatorOperation | undefined;
  SnapshotStatus?: SnapshotStatus | undefined;
  Limit?: number | undefined;
  NextToken?: string | undefined;
}
export interface SnapshotInfo {
  SnapshotName: string;
  SnapshotArn: string;
  SnapshotStatus: SnapshotStatus;
  SnapshotCreationTimestamp: Date;
  SnapshotInitiator: SnapshotInitiator;
  SnapshotInitiatorOperation: SnapshotInitiatorOperation;
  SourceApplicationName?: string | undefined;
  SnapshotFormat: SnapshotFormat;
}
export type SnapshotInfoList = SnapshotInfo[];
export interface ListSnapshotsResponse {
  SnapshotInfoList: SnapshotInfo[];
  NextToken?: string | undefined;
}
export type KinesisAnalyticsARN = string;
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[] | undefined;
}
export interface RollbackApplicationRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
}
export interface RollbackApplicationResponse {
  ApplicationDetail: ApplicationDetail;
  OperationId?: string | undefined;
}
export interface SqlRunConfiguration {
  InputId: string;
  InputStartingPositionConfiguration: InputStartingPositionConfiguration;
}
export type SqlRunConfigurations = SqlRunConfiguration[];
export interface RunConfiguration {
  FlinkRunConfiguration?: FlinkRunConfiguration | undefined;
  SqlRunConfigurations?: SqlRunConfiguration[] | undefined;
  ApplicationRestoreConfiguration?: ApplicationRestoreConfiguration | undefined;
}
export interface StartApplicationRequest {
  ApplicationName: string;
  RunConfiguration?: RunConfiguration | undefined;
}
export interface StartApplicationResponse {
  OperationId?: string | undefined;
}
export interface StopApplicationRequest {
  ApplicationName: string;
  Force?: boolean | undefined;
}
export interface StopApplicationResponse {
  OperationId?: string | undefined;
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
  RecordFormatUpdate?: RecordFormat | undefined;
  RecordEncodingUpdate?: string | undefined;
  RecordColumnUpdates?: RecordColumn[] | undefined;
}
export interface InputParallelismUpdate {
  CountUpdate: number;
}
export interface InputUpdate {
  InputId: string;
  NamePrefixUpdate?: string | undefined;
  InputProcessingConfigurationUpdate?: InputProcessingConfigurationUpdate | undefined;
  KinesisStreamsInputUpdate?: KinesisStreamsInputUpdate | undefined;
  KinesisFirehoseInputUpdate?: KinesisFirehoseInputUpdate | undefined;
  InputSchemaUpdate?: InputSchemaUpdate | undefined;
  InputParallelismUpdate?: InputParallelismUpdate | undefined;
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
  NameUpdate?: string | undefined;
  KinesisStreamsOutputUpdate?: KinesisStreamsOutputUpdate | undefined;
  KinesisFirehoseOutputUpdate?: KinesisFirehoseOutputUpdate | undefined;
  LambdaOutputUpdate?: LambdaOutputUpdate | undefined;
  DestinationSchemaUpdate?: DestinationSchema | undefined;
}
export type OutputUpdates = OutputUpdate[];
export interface S3ReferenceDataSourceUpdate {
  BucketARNUpdate?: string | undefined;
  FileKeyUpdate?: string | undefined;
}
export interface ReferenceDataSourceUpdate {
  ReferenceId: string;
  TableNameUpdate?: string | undefined;
  S3ReferenceDataSourceUpdate?: S3ReferenceDataSourceUpdate | undefined;
  ReferenceSchemaUpdate?: SourceSchema | undefined;
}
export type ReferenceDataSourceUpdates = ReferenceDataSourceUpdate[];
export interface SqlApplicationConfigurationUpdate {
  InputUpdates?: InputUpdate[] | undefined;
  OutputUpdates?: OutputUpdate[] | undefined;
  ReferenceDataSourceUpdates?: ReferenceDataSourceUpdate[] | undefined;
}
export interface S3ContentLocationUpdate {
  BucketARNUpdate?: string | undefined;
  FileKeyUpdate?: string | undefined;
  ObjectVersionUpdate?: string | undefined;
}
export interface CodeContentUpdate {
  TextContentUpdate?: string | undefined;
  ZipFileContentUpdate?: Uint8Array | undefined;
  S3ContentLocationUpdate?: S3ContentLocationUpdate | undefined;
}
export interface ApplicationCodeConfigurationUpdate {
  CodeContentTypeUpdate?: CodeContentType | undefined;
  CodeContentUpdate?: CodeContentUpdate | undefined;
}
export interface CheckpointConfigurationUpdate {
  ConfigurationTypeUpdate?: ConfigurationType | undefined;
  CheckpointingEnabledUpdate?: boolean | undefined;
  CheckpointIntervalUpdate?: number | undefined;
  MinPauseBetweenCheckpointsUpdate?: number | undefined;
}
export interface MonitoringConfigurationUpdate {
  ConfigurationTypeUpdate?: ConfigurationType | undefined;
  MetricsLevelUpdate?: MetricsLevel | undefined;
  LogLevelUpdate?: LogLevel | undefined;
}
export interface ParallelismConfigurationUpdate {
  ConfigurationTypeUpdate?: ConfigurationType | undefined;
  ParallelismUpdate?: number | undefined;
  ParallelismPerKPUUpdate?: number | undefined;
  AutoScalingEnabledUpdate?: boolean | undefined;
}
export interface FlinkApplicationConfigurationUpdate {
  CheckpointConfigurationUpdate?: CheckpointConfigurationUpdate | undefined;
  MonitoringConfigurationUpdate?: MonitoringConfigurationUpdate | undefined;
  ParallelismConfigurationUpdate?: ParallelismConfigurationUpdate | undefined;
}
export interface EnvironmentPropertyUpdates {
  PropertyGroups: PropertyGroup[];
}
export interface ApplicationSnapshotConfigurationUpdate {
  SnapshotsEnabledUpdate: boolean;
  SnapshotModeUpdate?: SnapshotMode | undefined;
}
export interface ApplicationSystemRollbackConfigurationUpdate {
  RollbackEnabledUpdate: boolean;
}
export interface VpcConfigurationUpdate {
  VpcConfigurationId: string;
  SubnetIdUpdates?: string[] | undefined;
  SecurityGroupIdUpdates?: string[] | undefined;
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
  BucketARNUpdate?: string | undefined;
  BasePathUpdate?: string | undefined;
}
export interface DeployAsApplicationConfigurationUpdate {
  S3ContentLocationUpdate?: S3ContentBaseLocationUpdate | undefined;
}
export interface ZeppelinApplicationConfigurationUpdate {
  MonitoringConfigurationUpdate?: ZeppelinMonitoringConfigurationUpdate | undefined;
  CatalogConfigurationUpdate?: CatalogConfigurationUpdate | undefined;
  DeployAsApplicationConfigurationUpdate?: DeployAsApplicationConfigurationUpdate | undefined;
  CustomArtifactsConfigurationUpdate?: CustomArtifactConfiguration[] | undefined;
}
export interface ApplicationEncryptionConfigurationUpdate {
  KeyIdUpdate?: string | undefined;
  KeyTypeUpdate: KeyType;
}
export interface ApplicationConfigurationUpdate {
  SqlApplicationConfigurationUpdate?: SqlApplicationConfigurationUpdate | undefined;
  ApplicationCodeConfigurationUpdate?: ApplicationCodeConfigurationUpdate | undefined;
  FlinkApplicationConfigurationUpdate?: FlinkApplicationConfigurationUpdate | undefined;
  EnvironmentPropertyUpdates?: EnvironmentPropertyUpdates | undefined;
  ApplicationSnapshotConfigurationUpdate?: ApplicationSnapshotConfigurationUpdate | undefined;
  ApplicationSystemRollbackConfigurationUpdate?:
    | ApplicationSystemRollbackConfigurationUpdate
    | undefined;
  VpcConfigurationUpdates?: VpcConfigurationUpdate[] | undefined;
  ZeppelinApplicationConfigurationUpdate?: ZeppelinApplicationConfigurationUpdate | undefined;
  ApplicationEncryptionConfigurationUpdate?: ApplicationEncryptionConfigurationUpdate | undefined;
}
export interface RunConfigurationUpdate {
  FlinkRunConfiguration?: FlinkRunConfiguration | undefined;
  ApplicationRestoreConfiguration?: ApplicationRestoreConfiguration | undefined;
}
export interface CloudWatchLoggingOptionUpdate {
  CloudWatchLoggingOptionId: string;
  LogStreamARNUpdate?: string | undefined;
}
export type CloudWatchLoggingOptionUpdates = CloudWatchLoggingOptionUpdate[];
export interface UpdateApplicationRequest {
  ApplicationName: string;
  CurrentApplicationVersionId?: number | undefined;
  ApplicationConfigurationUpdate?: ApplicationConfigurationUpdate | undefined;
  ServiceExecutionRoleUpdate?: string | undefined;
  RunConfigurationUpdate?: RunConfigurationUpdate | undefined;
  CloudWatchLoggingOptionUpdates?: CloudWatchLoggingOptionUpdate[] | undefined;
  ConditionalToken?: string | undefined;
  RuntimeEnvironmentUpdate?: RuntimeEnvironment | undefined;
}
export interface UpdateApplicationResponse {
  ApplicationDetail: ApplicationDetail;
  OperationId?: string | undefined;
}
export interface ApplicationMaintenanceConfigurationUpdate {
  ApplicationMaintenanceWindowStartTimeUpdate: string;
}
export interface UpdateApplicationMaintenanceConfigurationRequest {
  ApplicationName: string;
  ApplicationMaintenanceConfigurationUpdate: ApplicationMaintenanceConfigurationUpdate;
}
export interface UpdateApplicationMaintenanceConfigurationResponse {
  ApplicationARN?: string | undefined;
  ApplicationMaintenanceConfigurationDescription?:
    | ApplicationMaintenanceConfigurationDescription
    | undefined;
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
  AddApplicationCloudWatchLoggingOptionRequest & RegionInput,
  AddApplicationCloudWatchLoggingOptionResponse,
  AddApplicationCloudWatchLoggingOptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c1, 0) as any as S.Schema<AddApplicationCloudWatchLoggingOptionRequest>,
  output: __S(128, __c4, 0) as any as S.Schema<AddApplicationCloudWatchLoggingOptionResponse>,
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
  telemetry: TELEMETRY,
  span: "AddApplicationCloudWatchLoggingOption",
}));

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
  AddApplicationInputRequest & RegionInput,
  AddApplicationInputResponse,
  AddApplicationInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c5, 0) as any as S.Schema<AddApplicationInputRequest>,
  output: __S(161, __c5, 1) as any as S.Schema<AddApplicationInputResponse>,
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
  telemetry: TELEMETRY,
  span: "AddApplicationInput",
}));

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
  AddApplicationInputProcessingConfigurationRequest & RegionInput,
  AddApplicationInputProcessingConfigurationResponse,
  AddApplicationInputProcessingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c14, 0) as any as S.Schema<AddApplicationInputProcessingConfigurationRequest>,
  output: __S(449, __c14, 1) as any as S.Schema<AddApplicationInputProcessingConfigurationResponse>,
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
  telemetry: TELEMETRY,
  span: "AddApplicationInputProcessingConfiguration",
}));

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
  AddApplicationOutputRequest & RegionInput,
  AddApplicationOutputResponse,
  AddApplicationOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c15, 0) as any as S.Schema<AddApplicationOutputRequest>,
  output: __S(481, __c15, 1) as any as S.Schema<AddApplicationOutputResponse>,
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
  telemetry: TELEMETRY,
  span: "AddApplicationOutput",
}));

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
  AddApplicationReferenceDataSourceRequest & RegionInput,
  AddApplicationReferenceDataSourceResponse,
  AddApplicationReferenceDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c18, 0) as any as S.Schema<AddApplicationReferenceDataSourceRequest>,
  output: __S(577, __c18, 1) as any as S.Schema<AddApplicationReferenceDataSourceResponse>,
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
  telemetry: TELEMETRY,
  span: "AddApplicationReferenceDataSource",
}));

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
  AddApplicationVpcConfigurationRequest & RegionInput,
  AddApplicationVpcConfigurationResponse,
  AddApplicationVpcConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c21, 0) as any as S.Schema<AddApplicationVpcConfigurationRequest>,
  output: __S(673, __c21, 1) as any as S.Schema<AddApplicationVpcConfigurationResponse>,
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
  telemetry: TELEMETRY,
  span: "AddApplicationVpcConfiguration",
}));

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
  CreateApplicationRequest & RegionInput,
  CreateApplicationResponse,
  CreateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(785, __c24, 17) as any as S.Schema<CreateApplicationRequest>,
  output: __S(832, __c26, 0) as any as S.Schema<CreateApplicationResponse>,
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
  telemetry: TELEMETRY,
  span: "CreateApplication",
}));

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
  CreateApplicationPresignedUrlRequest & RegionInput,
  CreateApplicationPresignedUrlResponse,
  CreateApplicationPresignedUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c32, 0) as any as S.Schema<CreateApplicationPresignedUrlRequest>,
  output: __S(1025, __c32, 1) as any as S.Schema<CreateApplicationPresignedUrlResponse>,
  errors: [InvalidArgumentException, ResourceInUseException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplicationPresignedUrl",
  telemetry: TELEMETRY,
  span: "CreateApplicationPresignedUrl",
}));

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
  CreateApplicationSnapshotRequest & RegionInput,
  CreateApplicationSnapshotResponse,
  CreateApplicationSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1056, __c33, 0) as any as S.Schema<CreateApplicationSnapshotRequest>,
  output: __S(1088, __c34, 0) as any as S.Schema<CreateApplicationSnapshotResponse>,
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
  telemetry: TELEMETRY,
  span: "CreateApplicationSnapshot",
}));

export type CreateSnapshotError =
  | ConcurrentModificationException
  | InvalidApplicationConfigurationException
  | InvalidArgumentException
  | LimitExceededException
  | ResourceInUseException
  | TooManyTagsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Creates an enhanced snapshot of the state data of a running Managed Service for Apache Flink application. The application must be in the `RUNNING` status, use Apache Flink version 1.20 or later, and use the `ENHANCED_SNAPSHOTS` snapshot mode.
 *
 * This operation is asynchronous. The response returns the snapshot ARN with the `CREATING` status. To check the status of the snapshot, use `DescribeSnapshot`. To track the progress of the operation, use `DescribeSnapshotOperation`.
 *
 * An application can have only one `CreateSnapshot` operation in progress at a time. For information about limits, see Managed Service for Apache Flink Quotas. For more information about snapshots, see Enhanced Snapshots.
 */
export const createSnapshot: API.OperationMethod<
  CreateSnapshotRequest & RegionInput,
  CreateSnapshotResponse,
  CreateSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1120, __c35, 0) as any as S.Schema<CreateSnapshotRequest>,
  output: __S(1152, __c36, 0) as any as S.Schema<CreateSnapshotResponse>,
  errors: [
    ConcurrentModificationException,
    InvalidApplicationConfigurationException,
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    TooManyTagsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSnapshot",
  telemetry: TELEMETRY,
  span: "CreateSnapshot",
}));

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
  DeleteApplicationRequest & RegionInput,
  DeleteApplicationResponse,
  DeleteApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1184, __c37, 0) as any as S.Schema<DeleteApplicationRequest>,
  output: __S(1088, __c34, 0) as any as S.Schema<DeleteApplicationResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteApplication",
}));

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
  DeleteApplicationCloudWatchLoggingOptionRequest & RegionInput,
  DeleteApplicationCloudWatchLoggingOptionResponse,
  DeleteApplicationCloudWatchLoggingOptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1216, __c38, 0) as any as S.Schema<DeleteApplicationCloudWatchLoggingOptionRequest>,
  output: __S(128, __c4, 0) as any as S.Schema<DeleteApplicationCloudWatchLoggingOptionResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteApplicationCloudWatchLoggingOption",
}));

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
  DeleteApplicationInputProcessingConfigurationRequest & RegionInput,
  DeleteApplicationInputProcessingConfigurationResponse,
  DeleteApplicationInputProcessingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(
    1248,
    __c39,
    0,
  ) as any as S.Schema<DeleteApplicationInputProcessingConfigurationRequest>,
  output: __S(
    1280,
    __c40,
    0,
  ) as any as S.Schema<DeleteApplicationInputProcessingConfigurationResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteApplicationInputProcessingConfiguration",
}));

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
  DeleteApplicationOutputRequest & RegionInput,
  DeleteApplicationOutputResponse,
  DeleteApplicationOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1312, __c41, 0) as any as S.Schema<DeleteApplicationOutputRequest>,
  output: __S(1280, __c40, 0) as any as S.Schema<DeleteApplicationOutputResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteApplicationOutput",
}));

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
  DeleteApplicationReferenceDataSourceRequest & RegionInput,
  DeleteApplicationReferenceDataSourceResponse,
  DeleteApplicationReferenceDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1344, __c42, 0) as any as S.Schema<DeleteApplicationReferenceDataSourceRequest>,
  output: __S(1280, __c40, 0) as any as S.Schema<DeleteApplicationReferenceDataSourceResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteApplicationReferenceDataSource",
}));

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
  DeleteApplicationSnapshotRequest & RegionInput,
  DeleteApplicationSnapshotResponse,
  DeleteApplicationSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1376, __c43, 0) as any as S.Schema<DeleteApplicationSnapshotRequest>,
  output: __S(1088, __c34, 0) as any as S.Schema<DeleteApplicationSnapshotResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteApplicationSnapshot",
}));

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
  DeleteApplicationVpcConfigurationRequest & RegionInput,
  DeleteApplicationVpcConfigurationResponse,
  DeleteApplicationVpcConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1408, __c44, 0) as any as S.Schema<DeleteApplicationVpcConfigurationRequest>,
  output: __S(1409, __c44, 1) as any as S.Schema<DeleteApplicationVpcConfigurationResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteApplicationVpcConfiguration",
}));

export type DeleteSnapshotError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deletes an enhanced snapshot. Snapshots are not scoped to an application, so you can delete a snapshot independently of the application that it was created from.
 *
 * This operation is asynchronous. The response returns the snapshot ARN with the `DELETING` status. To track the progress of the operation, use `DescribeSnapshotOperation`.
 *
 * You can delete a snapshot in the `READY` or `FAILED` status. If a snapshot operation, such as an export, uses the snapshot, Managed Service for Apache Flink waits for that operation to finish before it deletes the snapshot. For a snapshot in any other status, `ResourceInUseException` is returned.
 */
export const deleteSnapshot: API.OperationMethod<
  DeleteSnapshotRequest & RegionInput,
  DeleteSnapshotResponse,
  DeleteSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1440, __c45, 0) as any as S.Schema<DeleteSnapshotRequest>,
  output: __S(1152, __c36, 0) as any as S.Schema<DeleteSnapshotResponse>,
  errors: [
    ConcurrentModificationException,
    InvalidArgumentException,
    ResourceInUseException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSnapshot",
  telemetry: TELEMETRY,
  span: "DeleteSnapshot",
}));

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
  DescribeApplicationRequest & RegionInput,
  DescribeApplicationResponse,
  DescribeApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1472, __c46, 0) as any as S.Schema<DescribeApplicationRequest>,
  output: __S(832, __c26, 0) as any as S.Schema<DescribeApplicationResponse>,
  errors: [InvalidArgumentException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplication",
  telemetry: TELEMETRY,
  span: "DescribeApplication",
}));

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
  DescribeApplicationOperationRequest & RegionInput,
  DescribeApplicationOperationResponse,
  DescribeApplicationOperationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1504, __c47, 0) as any as S.Schema<DescribeApplicationOperationRequest>,
  output: __S(1509, __c47, 5) as any as S.Schema<DescribeApplicationOperationResponse>,
  errors: [InvalidArgumentException, ResourceNotFoundException, UnsupportedOperationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplicationOperation",
  telemetry: TELEMETRY,
  span: "DescribeApplicationOperation",
}));

export type DescribeApplicationSnapshotError =
  | InvalidArgumentException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns information about a snapshot of application state data.
 */
export const describeApplicationSnapshot: API.OperationMethod<
  DescribeApplicationSnapshotRequest & RegionInput,
  DescribeApplicationSnapshotResponse,
  DescribeApplicationSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1536, __c48, 0) as any as S.Schema<DescribeApplicationSnapshotRequest>,
  output: __S(1537, __c48, 1) as any as S.Schema<DescribeApplicationSnapshotResponse>,
  errors: [InvalidArgumentException, ResourceNotFoundException, UnsupportedOperationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplicationSnapshot",
  telemetry: TELEMETRY,
  span: "DescribeApplicationSnapshot",
}));

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
  DescribeApplicationVersionRequest & RegionInput,
  DescribeApplicationVersionResponse,
  DescribeApplicationVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1600, __c50, 0) as any as S.Schema<DescribeApplicationVersionRequest>,
  output: __S(1601, __c50, 1) as any as S.Schema<DescribeApplicationVersionResponse>,
  errors: [InvalidArgumentException, ResourceNotFoundException, UnsupportedOperationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplicationVersion",
  telemetry: TELEMETRY,
  span: "DescribeApplicationVersion",
}));

export type DescribeSnapshotError =
  | InvalidArgumentException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns information about an enhanced snapshot. To see a list of the snapshots in your account, use `ListSnapshots`.
 */
export const describeSnapshot: API.OperationMethod<
  DescribeSnapshotRequest & RegionInput,
  DescribeSnapshotResponse,
  DescribeSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1632, __c51, 0) as any as S.Schema<DescribeSnapshotRequest>,
  output: __S(1636, __c51, 4) as any as S.Schema<DescribeSnapshotResponse>,
  errors: [InvalidArgumentException, ResourceNotFoundException, UnsupportedOperationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSnapshot",
  telemetry: TELEMETRY,
  span: "DescribeSnapshot",
}));

export type DescribeSnapshotOperationError =
  | InvalidArgumentException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Provides a detailed description of a specified operation that was performed on an enhanced snapshot. To see a list of the operations of a snapshot, use `ListSnapshotOperations`.
 *
 * Snapshot operations are available for 90 days after they are created.
 */
export const describeSnapshotOperation: API.OperationMethod<
  DescribeSnapshotOperationRequest & RegionInput,
  DescribeSnapshotOperationResponse,
  DescribeSnapshotOperationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1696, __c53, 0) as any as S.Schema<DescribeSnapshotOperationRequest>,
  output: __S(1703, __c53, 7) as any as S.Schema<DescribeSnapshotOperationResponse>,
  errors: [InvalidArgumentException, ResourceNotFoundException, UnsupportedOperationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSnapshotOperation",
  telemetry: TELEMETRY,
  span: "DescribeSnapshotOperation",
}));

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
  DiscoverInputSchemaRequest & RegionInput,
  DiscoverInputSchemaResponse,
  DiscoverInputSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1729, __c54, 1) as any as S.Schema<DiscoverInputSchemaRequest>,
  output: __S(1731, __c54, 3) as any as S.Schema<DiscoverInputSchemaResponse>,
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
  telemetry: TELEMETRY,
  span: "DiscoverInputSchema",
}));

export type ExportSnapshotError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Exports the data of an enhanced snapshot to an Amazon S3 location. Managed Service for Apache Flink assumes the IAM role that you specify in `ExportDestinationConfiguration` to write the snapshot data. The snapshot must be in the `READY` status.
 *
 * This operation is asynchronous. To track the progress of the export, use `DescribeSnapshotOperation`.
 *
 * A snapshot can have only one export in progress at a time. If an export of the snapshot is already in progress, `LimitExceededException` is returned.
 *
 * For more information, see Import and export.
 */
export const exportSnapshot: API.OperationMethod<
  ExportSnapshotRequest & RegionInput,
  ExportSnapshotResponse,
  ExportSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1761, __c55, 1) as any as S.Schema<ExportSnapshotRequest>,
  output: __S(1762, __c55, 2) as any as S.Schema<ExportSnapshotResponse>,
  errors: [
    ConcurrentModificationException,
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportSnapshot",
  telemetry: TELEMETRY,
  span: "ExportSnapshot",
}));

export type ImportSnapshotError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | LimitExceededException
  | ResourceInUseException
  | TooManyTagsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Imports an Apache Flink savepoint from an Amazon S3 location as an enhanced snapshot. Managed Service for Apache Flink assumes the IAM role that you specify in `ImportSourceConfiguration` to read the savepoint data.
 *
 * This operation is asynchronous. The response returns the snapshot ARN with the `CREATING` status. To track the progress of the import, use `DescribeSnapshotOperation`.
 *
 * For more information, see Import and export.
 */
export const importSnapshot: API.OperationMethod<
  ImportSnapshotRequest & RegionInput,
  ImportSnapshotResponse,
  ImportSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1793, __c56, 1) as any as S.Schema<ImportSnapshotRequest>,
  output: __S(1152, __c36, 0) as any as S.Schema<ImportSnapshotResponse>,
  errors: [
    ConcurrentModificationException,
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    TooManyTagsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportSnapshot",
  telemetry: TELEMETRY,
  span: "ImportSnapshot",
}));

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
  ListApplicationOperationsRequest & RegionInput,
  ListApplicationOperationsResponse,
  ListApplicationOperationsError,
  Credentials | HttpClient.HttpClient,
  ApplicationOperationInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1824, __c57, 0) as any as S.Schema<ListApplicationOperationsRequest>,
  output: __S(1827, __c57, 3) as any as S.Schema<ListApplicationOperationsResponse>,
  errors: [InvalidArgumentException, ResourceNotFoundException, UnsupportedOperationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplicationOperations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ApplicationOperationInfoList",
    pageSize: "Limit",
  } as const,
  telemetry: TELEMETRY,
  span: "ListApplicationOperations",
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
  ListApplicationsRequest & RegionInput,
  ListApplicationsResponse,
  ListApplicationsError,
  Credentials | HttpClient.HttpClient,
  ApplicationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1856, __c58, 0) as any as S.Schema<ListApplicationsRequest>,
  output: __S(1859, __c58, 3) as any as S.Schema<ListApplicationsResponse>,
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
  telemetry: TELEMETRY,
  span: "ListApplications",
})) as any;

export type ListApplicationSnapshotsError =
  | InvalidArgumentException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Lists information about the current application snapshots.
 */
export const listApplicationSnapshots: API.PaginatedOperationMethod<
  ListApplicationSnapshotsRequest & RegionInput,
  ListApplicationSnapshotsResponse,
  ListApplicationSnapshotsError,
  Credentials | HttpClient.HttpClient,
  SnapshotDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1888, __c59, 0) as any as S.Schema<ListApplicationSnapshotsRequest>,
  output: __S(1890, __c59, 2) as any as S.Schema<ListApplicationSnapshotsResponse>,
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
  telemetry: TELEMETRY,
  span: "ListApplicationSnapshots",
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
  ListApplicationVersionsRequest & RegionInput,
  ListApplicationVersionsResponse,
  ListApplicationVersionsError,
  Credentials | HttpClient.HttpClient,
  ApplicationVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1920, __c60, 0) as any as S.Schema<ListApplicationVersionsRequest>,
  output: __S(1923, __c60, 3) as any as S.Schema<ListApplicationVersionsResponse>,
  errors: [InvalidArgumentException, ResourceNotFoundException, UnsupportedOperationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplicationVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ApplicationVersionSummaries",
    pageSize: "Limit",
  } as const,
  telemetry: TELEMETRY,
  span: "ListApplicationVersions",
})) as any;

export type ListSnapshotOperationsError =
  | InvalidArgumentException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Lists the operations that were performed on the specified enhanced snapshot, such as `CreateSnapshot`, `ImportSnapshot`, and `ExportSnapshot`. The response includes a summary of each operation.
 *
 * You can specify only one of the `SnapshotOperation` or `SnapshotOperationStatus` filters in a request. If you specify both, `InvalidArgumentException` is returned.
 *
 * To get the complete description of a specific operation, use `DescribeSnapshotOperation`. Snapshot operations are available for 90 days after they are created.
 */
export const listSnapshotOperations: API.PaginatedOperationMethod<
  ListSnapshotOperationsRequest & RegionInput,
  ListSnapshotOperationsResponse,
  ListSnapshotOperationsError,
  Credentials | HttpClient.HttpClient,
  SnapshotOperationInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1952, __c61, 0) as any as S.Schema<ListSnapshotOperationsRequest>,
  output: __S(1955, __c61, 3) as any as S.Schema<ListSnapshotOperationsResponse>,
  errors: [InvalidArgumentException, ResourceNotFoundException, UnsupportedOperationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSnapshotOperations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SnapshotOperationInfoList",
    pageSize: "Limit",
  } as const,
  telemetry: TELEMETRY,
  span: "ListSnapshotOperations",
})) as any;

export type ListSnapshotsError =
  | InvalidArgumentException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Lists the enhanced snapshots in your account. Snapshots are not scoped to an application. To list the snapshots that were created from a specific application, use the `SourceApplicationName` parameter.
 *
 * You can specify only one of the following filters in a request: `SourceApplicationName`, `SnapshotInitiator`, `SnapshotInitiatorOperation`, or `SnapshotStatus`. If you specify more than one filter, `InvalidArgumentException` is returned.
 *
 * The results are sorted in descending order of snapshot creation timestamp. To get detailed information about a specific snapshot, use `DescribeSnapshot`.
 */
export const listSnapshots: API.PaginatedOperationMethod<
  ListSnapshotsRequest & RegionInput,
  ListSnapshotsResponse,
  ListSnapshotsError,
  Credentials | HttpClient.HttpClient,
  SnapshotInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1984, __c62, 0) as any as S.Schema<ListSnapshotsRequest>,
  output: __S(1987, __c62, 3) as any as S.Schema<ListSnapshotsResponse>,
  errors: [InvalidArgumentException, UnsupportedOperationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSnapshots",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SnapshotInfoList",
    pageSize: "Limit",
  } as const,
  telemetry: TELEMETRY,
  span: "ListSnapshots",
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
  ListTagsForResourceRequest & RegionInput,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2016, __c63, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(2017, __c63, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [ConcurrentModificationException, InvalidArgumentException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
}));

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
  RollbackApplicationRequest & RegionInput,
  RollbackApplicationResponse,
  RollbackApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2048, __c64, 0) as any as S.Schema<RollbackApplicationRequest>,
  output: __S(2080, __c65, 0) as any as S.Schema<RollbackApplicationResponse>,
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
  telemetry: TELEMETRY,
  span: "RollbackApplication",
}));

export type StartApplicationError =
  | InvalidApplicationConfigurationException
  | InvalidArgumentException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Starts the specified Managed Service for Apache Flink application. After creating an application, you must exclusively call this operation to
 * start your application.
 */
export const startApplication: API.OperationMethod<
  StartApplicationRequest & RegionInput,
  StartApplicationResponse,
  StartApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2115, __c66, 3) as any as S.Schema<StartApplicationRequest>,
  output: __S(2144, __c67, 0) as any as S.Schema<StartApplicationResponse>,
  errors: [
    InvalidApplicationConfigurationException,
    InvalidArgumentException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartApplication",
  telemetry: TELEMETRY,
  span: "StartApplication",
}));

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
  StopApplicationRequest & RegionInput,
  StopApplicationResponse,
  StopApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2176, __c68, 0) as any as S.Schema<StopApplicationRequest>,
  output: __S(2144, __c67, 0) as any as S.Schema<StopApplicationResponse>,
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
  telemetry: TELEMETRY,
  span: "StopApplication",
}));

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
  TagResourceRequest & RegionInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2208, __c69, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(1088, __c34, 0) as any as S.Schema<TagResourceResponse>,
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
  telemetry: TELEMETRY,
  span: "TagResource",
}));

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
  UntagResourceRequest & RegionInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2240, __c70, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(1088, __c34, 0) as any as S.Schema<UntagResourceResponse>,
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
  telemetry: TELEMETRY,
  span: "UntagResource",
}));

export type UpdateApplicationError =
  | CodeValidationException
  | ConcurrentModificationException
  | InvalidApplicationConfigurationException
  | InvalidArgumentException
  | InvalidRequestException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Updates an existing Managed Service for Apache Flink application. Using this operation, you
 * can update application code, input configuration, and output configuration.
 *
 * Managed Service for Apache Flink updates the `ApplicationVersionId` each time you update
 * your application.
 */
export const updateApplication: API.OperationMethod<
  UpdateApplicationRequest & RegionInput,
  UpdateApplicationResponse,
  UpdateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2306, __c72, 2) as any as S.Schema<UpdateApplicationRequest>,
  output: __S(2080, __c65, 0) as any as S.Schema<UpdateApplicationResponse>,
  errors: [
    CodeValidationException,
    ConcurrentModificationException,
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
  operationName: "UpdateApplication",
  telemetry: TELEMETRY,
  span: "UpdateApplication",
}));

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
  UpdateApplicationMaintenanceConfigurationRequest & RegionInput,
  UpdateApplicationMaintenanceConfigurationResponse,
  UpdateApplicationMaintenanceConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2337, __c73, 1) as any as S.Schema<UpdateApplicationMaintenanceConfigurationRequest>,
  output: __S(2338, __c73, 2) as any as S.Schema<UpdateApplicationMaintenanceConfigurationResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateApplicationMaintenanceConfiguration",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationName: S.String,
          CurrentApplicationVersionId: S.optional(S.Number),
          CloudWatchLoggingOption: __S(64, __c2, 0),
          ConditionalToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AddApplicationCloudWatchLoggingOptionRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ LogStreamARN: S.String })).annotate({
        identifier: "CloudWatchLoggingOption",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CloudWatchLoggingOptionId: S.optional(S.String),
          LogStreamARN: S.String,
          RoleARN: S.optional(S.String),
        }),
      ).annotate({ identifier: "CloudWatchLoggingOptionDescription" });
    case 1:
      return S.Array(__S(96, __c3, 0));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationARN: S.optional(S.String),
          ApplicationVersionId: S.optional(S.Number),
          CloudWatchLoggingOptionDescriptions: S.optional(__S(97, __c3, 1)),
          OperationId: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "AddApplicationCloudWatchLoggingOptionResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationName: S.String,
          CurrentApplicationVersionId: S.Number,
          Input: __S(352, __c11, 0),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AddApplicationInputRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ApplicationARN: S.optional(S.String),
          ApplicationVersionId: S.optional(S.Number),
          InputDescriptions: S.optional(__S(418, __c13, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "AddApplicationInputResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, RoleARN: S.optional(S.String) }),
      ).annotate({ identifier: "InputLambdaProcessorDescription" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ResourceARN: S.String })).annotate({
        identifier: "InputLambdaProcessor",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InputLambdaProcessorDescription: S.optional(__S(192, __c6, 0)) }),
      ).annotate({ identifier: "InputProcessingConfigurationDescription" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ InputLambdaProcessor: __S(224, __c7, 0) })).annotate({
        identifier: "InputProcessingConfiguration",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ RecordRowPath: S.String })).annotate({
        identifier: "JSONMappingParameters",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ RecordRowDelimiter: S.String, RecordColumnDelimiter: S.String }),
      ).annotate({ identifier: "CSVMappingParameters" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          JSONMappingParameters: S.optional(__S(320, __c10, 0)),
          CSVMappingParameters: S.optional(__S(321, __c10, 1)),
        }),
      ).annotate({ identifier: "MappingParameters" });
    case 3:
      return S.suspend(() =>
        S.Struct({ RecordFormatType: S.String, MappingParameters: S.optional(__S(322, __c10, 2)) }),
      ).annotate({ identifier: "RecordFormat" });
    case 4:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Mapping: S.optional(S.String), SqlType: S.String }),
      ).annotate({ identifier: "RecordColumn" });
    case 5:
      return S.Array(__S(324, __c10, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          RecordFormat: __S(323, __c10, 3),
          RecordEncoding: S.optional(S.String),
          RecordColumns: __S(325, __c10, 5),
        }),
      ).annotate({ identifier: "SourceSchema" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NamePrefix: S.String,
          InputProcessingConfiguration: S.optional(__S(288, __c9, 0)),
          KinesisStreamsInput: S.optional(__S(224, __c7, 0)),
          KinesisFirehoseInput: S.optional(__S(224, __c7, 0)),
          InputParallelism: S.optional(__S(416, __c13, 0)),
          InputSchema: __S(326, __c10, 6),
        }),
      ).annotate({ identifier: "Input" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ InputStartingPosition: S.optional(S.String) })).annotate({
        identifier: "InputStartingPositionConfiguration",
      });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Count: S.optional(S.Number) })).annotate({
        identifier: "InputParallelism",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          InputId: S.optional(S.String),
          NamePrefix: S.optional(S.String),
          InAppStreamNames: S.optional(__S(0, __c0, 0)),
          InputProcessingConfigurationDescription: S.optional(__S(256, __c8, 0)),
          KinesisStreamsInputDescription: S.optional(__S(192, __c6, 0)),
          KinesisFirehoseInputDescription: S.optional(__S(192, __c6, 0)),
          InputSchema: S.optional(__S(326, __c10, 6)),
          InputParallelism: S.optional(__S(416, __c13, 0)),
          InputStartingPositionConfiguration: S.optional(__S(384, __c12, 0)),
        }),
      ).annotate({ identifier: "InputDescription" });
    case 2:
      return S.Array(__S(417, __c13, 1));
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationName: S.String,
          CurrentApplicationVersionId: S.Number,
          InputId: S.String,
          InputProcessingConfiguration: __S(288, __c9, 0),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AddApplicationInputProcessingConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ApplicationARN: S.optional(S.String),
          ApplicationVersionId: S.optional(S.Number),
          InputId: S.optional(S.String),
          InputProcessingConfigurationDescription: S.optional(__S(256, __c8, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "AddApplicationInputProcessingConfigurationResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationName: S.String,
          CurrentApplicationVersionId: S.Number,
          Output: __S(512, __c16, 0),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AddApplicationOutputRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ApplicationARN: S.optional(S.String),
          ApplicationVersionId: S.optional(S.Number),
          OutputDescriptions: S.optional(__S(546, __c17, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "AddApplicationOutputResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          KinesisStreamsOutput: S.optional(__S(224, __c7, 0)),
          KinesisFirehoseOutput: S.optional(__S(224, __c7, 0)),
          LambdaOutput: S.optional(__S(224, __c7, 0)),
          DestinationSchema: __S(544, __c17, 0),
        }),
      ).annotate({ identifier: "Output" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ RecordFormatType: S.String })).annotate({
        identifier: "DestinationSchema",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          OutputId: S.optional(S.String),
          Name: S.optional(S.String),
          KinesisStreamsOutputDescription: S.optional(__S(192, __c6, 0)),
          KinesisFirehoseOutputDescription: S.optional(__S(192, __c6, 0)),
          LambdaOutputDescription: S.optional(__S(192, __c6, 0)),
          DestinationSchema: S.optional(__S(544, __c17, 0)),
        }),
      ).annotate({ identifier: "OutputDescription" });
    case 2:
      return S.Array(__S(545, __c17, 1));
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationName: S.String,
          CurrentApplicationVersionId: S.Number,
          ReferenceDataSource: __S(609, __c19, 1),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AddApplicationReferenceDataSourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ApplicationARN: S.optional(S.String),
          ApplicationVersionId: S.optional(S.Number),
          ReferenceDataSourceDescriptions: S.optional(__S(642, __c20, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "AddApplicationReferenceDataSourceResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BucketARN: S.optional(S.String), FileKey: S.optional(S.String) }),
      ).annotate({ identifier: "S3ReferenceDataSource" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TableName: S.String,
          S3ReferenceDataSource: S.optional(__S(608, __c19, 0)),
          ReferenceSchema: __S(326, __c10, 6),
        }),
      ).annotate({ identifier: "ReferenceDataSource" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BucketARN: S.String,
          FileKey: S.String,
          ReferenceRoleARN: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3ReferenceDataSourceDescription" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ReferenceId: S.String,
          TableName: S.String,
          S3ReferenceDataSourceDescription: __S(640, __c20, 0),
          ReferenceSchema: S.optional(__S(326, __c10, 6)),
        }),
      ).annotate({ identifier: "ReferenceDataSourceDescription" });
    case 2:
      return S.Array(__S(641, __c20, 1));
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationName: S.String,
          CurrentApplicationVersionId: S.optional(S.Number),
          VpcConfiguration: __S(704, __c22, 0),
          ConditionalToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AddApplicationVpcConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ApplicationARN: S.optional(S.String),
          ApplicationVersionId: S.optional(S.Number),
          VpcConfigurationDescription: S.optional(__S(736, __c23, 0)),
          OperationId: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "AddApplicationVpcConfigurationResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SubnetIds: __S(0, __c0, 0), SecurityGroupIds: __S(0, __c0, 0) }),
      ).annotate({ identifier: "VpcConfiguration" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VpcConfigurationId: S.String,
          VpcId: S.String,
          SubnetIds: __S(0, __c0, 0),
          SecurityGroupIds: __S(0, __c0, 0),
        }),
      ).annotate({ identifier: "VpcConfigurationDescription" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(352, __c11, 0));
    case 1:
      return S.Array(__S(512, __c16, 0));
    case 2:
      return S.Array(__S(609, __c19, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Inputs: S.optional(__S(768, __c24, 0)),
          Outputs: S.optional(__S(769, __c24, 1)),
          ReferenceDataSources: S.optional(__S(770, __c24, 2)),
        }),
      ).annotate({ identifier: "SqlApplicationConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          ConfigurationType: S.String,
          CheckpointingEnabled: S.optional(S.Boolean),
          CheckpointInterval: S.optional(S.Number),
          MinPauseBetweenCheckpoints: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CheckpointConfiguration" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          ConfigurationType: S.String,
          MetricsLevel: S.optional(S.String),
          LogLevel: S.optional(S.String),
        }),
      ).annotate({ identifier: "MonitoringConfiguration" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          ConfigurationType: S.String,
          Parallelism: S.optional(S.Number),
          ParallelismPerKPU: S.optional(S.Number),
          AutoScalingEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ParallelismConfiguration" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          CheckpointConfiguration: S.optional(__S(772, __c24, 4)),
          MonitoringConfiguration: S.optional(__S(773, __c24, 5)),
          ParallelismConfiguration: S.optional(__S(774, __c24, 6)),
        }),
      ).annotate({ identifier: "FlinkApplicationConfiguration" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          TextContent: S.optional(S.String),
          ZipFileContent: S.optional(T.Blob),
          S3ContentLocation: S.optional(__S(931, __c29, 3)),
        }),
      ).annotate({ identifier: "CodeContent" });
    case 9:
      return S.suspend(() =>
        S.Struct({ CodeContent: S.optional(__S(776, __c24, 8)), CodeContentType: S.String }),
      ).annotate({ identifier: "ApplicationCodeConfiguration" });
    case 10:
      return S.Array(__S(704, __c22, 0));
    case 11:
      return S.suspend(() => S.Struct({ LogLevel: S.String })).annotate({
        identifier: "ZeppelinMonitoringConfiguration",
      });
    case 12:
      return S.suspend(() =>
        S.Struct({ GlueDataCatalogConfiguration: __S(934, __c29, 6) }),
      ).annotate({ identifier: "CatalogConfiguration" });
    case 13:
      return S.suspend(() => S.Struct({ S3ContentLocation: __S(935, __c29, 7) })).annotate({
        identifier: "DeployAsApplicationConfiguration",
      });
    case 14:
      return S.suspend(() =>
        S.Struct({
          MonitoringConfiguration: S.optional(__S(779, __c24, 11)),
          CatalogConfiguration: S.optional(__S(780, __c24, 12)),
          DeployAsApplicationConfiguration: S.optional(__S(781, __c24, 13)),
          CustomArtifactsConfiguration: S.optional(__S(994, __c31, 2)),
        }),
      ).annotate({ identifier: "ZeppelinApplicationConfiguration" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          SqlApplicationConfiguration: S.optional(__S(771, __c24, 3)),
          FlinkApplicationConfiguration: S.optional(__S(775, __c24, 7)),
          EnvironmentProperties: S.optional(__S(992, __c31, 0)),
          ApplicationCodeConfiguration: S.optional(__S(777, __c24, 9)),
          ApplicationSnapshotConfiguration: S.optional(__S(932, __c29, 4)),
          ApplicationSystemRollbackConfiguration: S.optional(__S(933, __c29, 5)),
          VpcConfigurations: S.optional(__S(778, __c24, 10)),
          ZeppelinApplicationConfiguration: S.optional(__S(782, __c24, 14)),
          ApplicationEncryptionConfiguration: S.optional(__S(864, __c27, 0)),
        }),
      ).annotate({ identifier: "ApplicationConfiguration" });
    case 16:
      return S.Array(__S(64, __c2, 0));
    case 17:
      return S.suspend(() =>
        S.Struct({
          ApplicationName: S.String,
          ApplicationDescription: S.optional(S.String),
          RuntimeEnvironment: S.String,
          ServiceExecutionRole: S.String,
          ApplicationConfiguration: S.optional(__S(783, __c24, 15)),
          CloudWatchLoggingOptions: S.optional(__S(784, __c24, 16)),
          Tags: S.optional(__S(801, __c25, 1)),
          ApplicationMode: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateApplicationRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.optional(S.String) })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(800, __c25, 0));
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationDetail: __S(954, __c29, 26) }).pipe(ns),
      ).annotate({ identifier: "CreateApplicationResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ KeyId: S.optional(S.String), KeyType: S.String })).annotate(
        { identifier: "ApplicationEncryptionConfiguration" },
      );
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationRestoreType: S.String,
          SnapshotName: S.optional(S.String),
          SnapshotArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ApplicationRestoreConfiguration" });
    case 1:
      return S.suspend(() => S.Struct({ AllowNonRestoredState: S.optional(S.Boolean) })).annotate({
        identifier: "FlinkRunConfiguration",
      });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({ PropertyGroupId: S.String, PropertyMap: __S(928, __c29, 0) }),
      ).annotate({ identifier: "PropertyGroup" });
    case 2:
      return S.Array(__S(929, __c29, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ BucketARN: S.String, FileKey: S.String, ObjectVersion: S.optional(S.String) }),
      ).annotate({ identifier: "S3ContentLocation" });
    case 4:
      return S.suspend(() =>
        S.Struct({ SnapshotsEnabled: S.Boolean, SnapshotMode: S.optional(S.String) }),
      ).annotate({ identifier: "ApplicationSnapshotConfiguration" });
    case 5:
      return S.suspend(() => S.Struct({ RollbackEnabled: S.Boolean })).annotate({
        identifier: "ApplicationSystemRollbackConfiguration",
      });
    case 6:
      return S.suspend(() => S.Struct({ DatabaseARN: S.String })).annotate({
        identifier: "GlueDataCatalogConfiguration",
      });
    case 7:
      return S.suspend(() =>
        S.Struct({ BucketARN: S.String, BasePath: S.optional(S.String) }),
      ).annotate({ identifier: "S3ContentBaseLocation" });
    case 8:
      return S.suspend(() =>
        S.Struct({ GroupId: S.String, ArtifactId: S.String, Version: S.String }),
      ).annotate({ identifier: "MavenReference" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          InputDescriptions: S.optional(__S(418, __c13, 2)),
          OutputDescriptions: S.optional(__S(546, __c17, 2)),
          ReferenceDataSourceDescriptions: S.optional(__S(642, __c20, 2)),
        }),
      ).annotate({ identifier: "SqlApplicationConfigurationDescription" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          TextContent: S.optional(S.String),
          CodeMD5: S.optional(S.String),
          CodeSize: S.optional(S.Number),
          S3ApplicationCodeLocationDescription: S.optional(__S(931, __c29, 3)),
        }),
      ).annotate({ identifier: "CodeContentDescription" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          CodeContentType: S.String,
          CodeContentDescription: S.optional(__S(938, __c29, 10)),
        }),
      ).annotate({ identifier: "ApplicationCodeConfigurationDescription" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          ApplicationRestoreConfigurationDescription: S.optional(__S(896, __c28, 0)),
          FlinkRunConfigurationDescription: S.optional(__S(897, __c28, 1)),
        }),
      ).annotate({ identifier: "RunConfigurationDescription" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          ConfigurationType: S.optional(S.String),
          CheckpointingEnabled: S.optional(S.Boolean),
          CheckpointInterval: S.optional(S.Number),
          MinPauseBetweenCheckpoints: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CheckpointConfigurationDescription" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          ConfigurationType: S.optional(S.String),
          MetricsLevel: S.optional(S.String),
          LogLevel: S.optional(S.String),
        }),
      ).annotate({ identifier: "MonitoringConfigurationDescription" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          ConfigurationType: S.optional(S.String),
          Parallelism: S.optional(S.Number),
          ParallelismPerKPU: S.optional(S.Number),
          CurrentParallelism: S.optional(S.Number),
          AutoScalingEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ParallelismConfigurationDescription" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          CheckpointConfigurationDescription: S.optional(__S(941, __c29, 13)),
          MonitoringConfigurationDescription: S.optional(__S(942, __c29, 14)),
          ParallelismConfigurationDescription: S.optional(__S(943, __c29, 15)),
          JobPlanDescription: S.optional(S.String),
        }),
      ).annotate({ identifier: "FlinkApplicationConfigurationDescription" });
    case 17:
      return S.suspend(() =>
        S.Struct({ PropertyGroupDescriptions: S.optional(__S(930, __c29, 2)) }),
      ).annotate({ identifier: "EnvironmentPropertyDescriptions" });
    case 18:
      return S.Array(__S(736, __c23, 0));
    case 19:
      return S.suspend(() => S.Struct({ LogLevel: S.optional(S.String) })).annotate({
        identifier: "ZeppelinMonitoringConfigurationDescription",
      });
    case 20:
      return S.suspend(() =>
        S.Struct({ GlueDataCatalogConfigurationDescription: __S(934, __c29, 6) }),
      ).annotate({ identifier: "CatalogConfigurationDescription" });
    case 21:
      return S.suspend(() =>
        S.Struct({ S3ContentLocationDescription: __S(935, __c29, 7) }),
      ).annotate({ identifier: "DeployAsApplicationConfigurationDescription" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          ArtifactType: S.optional(S.String),
          S3ContentLocationDescription: S.optional(__S(931, __c29, 3)),
          MavenReferenceDescription: S.optional(__S(936, __c29, 8)),
        }),
      ).annotate({ identifier: "CustomArtifactConfigurationDescription" });
    case 23:
      return S.Array(__S(950, __c29, 22));
    case 24:
      return S.suspend(() =>
        S.Struct({
          MonitoringConfigurationDescription: __S(947, __c29, 19),
          CatalogConfigurationDescription: S.optional(__S(948, __c29, 20)),
          DeployAsApplicationConfigurationDescription: S.optional(__S(949, __c29, 21)),
          CustomArtifactsConfigurationDescription: S.optional(__S(951, __c29, 23)),
        }),
      ).annotate({ identifier: "ZeppelinApplicationConfigurationDescription" });
    case 25:
      return S.suspend(() =>
        S.Struct({
          SqlApplicationConfigurationDescription: S.optional(__S(937, __c29, 9)),
          ApplicationCodeConfigurationDescription: S.optional(__S(939, __c29, 11)),
          RunConfigurationDescription: S.optional(__S(940, __c29, 12)),
          FlinkApplicationConfigurationDescription: S.optional(__S(944, __c29, 16)),
          EnvironmentPropertyDescriptions: S.optional(__S(945, __c29, 17)),
          ApplicationSnapshotConfigurationDescription: S.optional(__S(932, __c29, 4)),
          ApplicationSystemRollbackConfigurationDescription: S.optional(__S(933, __c29, 5)),
          VpcConfigurationDescriptions: S.optional(__S(946, __c29, 18)),
          ZeppelinApplicationConfigurationDescription: S.optional(__S(952, __c29, 24)),
          ApplicationEncryptionConfigurationDescription: S.optional(__S(864, __c27, 0)),
        }),
      ).annotate({ identifier: "ApplicationConfigurationDescription" });
    case 26:
      return S.suspend(() =>
        S.Struct({
          ApplicationARN: S.String,
          ApplicationDescription: S.optional(S.String),
          ApplicationName: S.String,
          RuntimeEnvironment: S.String,
          ServiceExecutionRole: S.optional(S.String),
          ApplicationStatus: S.String,
          ApplicationVersionId: S.Number,
          CreateTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdateTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ApplicationConfigurationDescription: S.optional(__S(953, __c29, 25)),
          CloudWatchLoggingOptionDescriptions: S.optional(__S(97, __c3, 1)),
          ApplicationMaintenanceConfigurationDescription: S.optional(__S(960, __c30, 0)),
          ApplicationVersionUpdatedFrom: S.optional(S.Number),
          ApplicationVersionRolledBackFrom: S.optional(S.Number),
          ApplicationVersionCreateTimestamp: S.optional(
            S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ),
          ConditionalToken: S.optional(S.String),
          ApplicationVersionRolledBackTo: S.optional(S.Number),
          ApplicationMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "ApplicationDetail" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationMaintenanceWindowStartTime: S.String,
          ApplicationMaintenanceWindowEndTime: S.String,
        }),
      ).annotate({ identifier: "ApplicationMaintenanceConfigurationDescription" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ PropertyGroups: __S(930, __c29, 2) })).annotate({
        identifier: "EnvironmentProperties",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ArtifactType: S.String,
          S3ContentLocation: S.optional(__S(931, __c29, 3)),
          MavenReference: S.optional(__S(936, __c29, 8)),
        }),
      ).annotate({ identifier: "CustomArtifactConfiguration" });
    case 2:
      return S.Array(__S(993, __c31, 1));
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationName: S.String,
          UrlType: S.String,
          SessionExpirationDurationInSeconds: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateApplicationPresignedUrlRequest" });
    case 1:
      return S.suspend(() => S.Struct({ AuthorizedUrl: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "CreateApplicationPresignedUrlResponse",
      });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationName: S.String, SnapshotName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateApplicationSnapshotRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "CreateApplicationSnapshotResponse",
      });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationName: S.String,
          SnapshotName: S.String,
          SnapshotDescription: S.optional(S.String),
          Tags: S.optional(__S(801, __c25, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateSnapshotRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SnapshotArn: S.String,
          SnapshotStatus: S.String,
          SnapshotOperationId: S.String,
          SnapshotOperationStatus: S.String,
        }).pipe(ns),
      ).annotate({ identifier: "CreateSnapshotResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationName: S.String,
          CreateTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteApplicationRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationName: S.String,
          CurrentApplicationVersionId: S.optional(S.Number),
          CloudWatchLoggingOptionId: S.String,
          ConditionalToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteApplicationCloudWatchLoggingOptionRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationName: S.String,
          CurrentApplicationVersionId: S.Number,
          InputId: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteApplicationInputProcessingConfigurationRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationARN: S.optional(S.String),
          ApplicationVersionId: S.optional(S.Number),
        }).pipe(ns),
      ).annotate({ identifier: "DeleteApplicationInputProcessingConfigurationResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationName: S.String,
          CurrentApplicationVersionId: S.Number,
          OutputId: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteApplicationOutputRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationName: S.String,
          CurrentApplicationVersionId: S.Number,
          ReferenceId: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteApplicationReferenceDataSourceRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationName: S.String,
          SnapshotName: S.String,
          SnapshotCreationTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteApplicationSnapshotRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationName: S.String,
          CurrentApplicationVersionId: S.optional(S.Number),
          VpcConfigurationId: S.String,
          ConditionalToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteApplicationVpcConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ApplicationARN: S.optional(S.String),
          ApplicationVersionId: S.optional(S.Number),
          OperationId: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DeleteApplicationVpcConfigurationResponse" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SnapshotName: S.String,
          SnapshotCreationTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteSnapshotRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationName: S.String,
          IncludeAdditionalDetails: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeApplicationRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationName: S.String, OperationId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeApplicationOperationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ApplicationVersionUpdatedFrom: S.Number,
          ApplicationVersionUpdatedTo: S.Number,
        }),
      ).annotate({ identifier: "ApplicationVersionChangeDetails" });
    case 2:
      return S.suspend(() => S.Struct({ ErrorString: S.optional(S.String) })).annotate({
        identifier: "ErrorInfo",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          RollbackOperationId: S.optional(S.String),
          ErrorInfo: S.optional(__S(1506, __c47, 2)),
        }),
      ).annotate({ identifier: "OperationFailureDetails" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Operation: S.String,
          StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          OperationStatus: S.String,
          ApplicationVersionChangeDetails: S.optional(__S(1505, __c47, 1)),
          OperationFailureDetails: S.optional(__S(1507, __c47, 3)),
        }),
      ).annotate({ identifier: "ApplicationOperationInfoDetails" });
    case 5:
      return S.suspend(() =>
        S.Struct({ ApplicationOperationInfoDetails: S.optional(__S(1508, __c47, 4)) }).pipe(ns),
      ).annotate({ identifier: "DescribeApplicationOperationResponse" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationName: S.String, SnapshotName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeApplicationSnapshotRequest" });
    case 1:
      return S.suspend(() => S.Struct({ SnapshotDetails: __S(1568, __c49, 0) }).pipe(ns)).annotate({
        identifier: "DescribeApplicationSnapshotResponse",
      });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SnapshotName: S.String,
          SnapshotStatus: S.String,
          ApplicationVersionId: S.Number,
          SnapshotCreationTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RuntimeEnvironment: S.optional(S.String),
          ApplicationEncryptionConfigurationDescription: S.optional(__S(864, __c27, 0)),
        }),
      ).annotate({ identifier: "SnapshotDetails" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationName: S.String, ApplicationVersionId: S.Number }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeApplicationVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ApplicationVersionDetail: S.optional(__S(954, __c29, 26)) }).pipe(ns),
      ).annotate({ identifier: "DescribeApplicationVersionResponse" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SnapshotName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeSnapshotRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ApplicationName: S.String,
          ApplicationCreationTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ApplicationVersionId: S.Number,
        }),
      ).annotate({ identifier: "SourceApplicationDescription" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          S3PrefixLocation: S.optional(__S(1664, __c52, 0)),
          SourceApplicationDescription: S.optional(__S(1633, __c51, 1)),
        }),
      ).annotate({ identifier: "SnapshotSourceDescription" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          SnapshotName: S.String,
          SnapshotArn: S.String,
          SnapshotDescription: S.optional(S.String),
          SnapshotStatus: S.String,
          SnapshotCreationTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          RuntimeEnvironment: S.optional(S.String),
          SnapshotSizeInBytes: S.optional(S.Number),
          SnapshotEncryptionConfigurationDescription: S.optional(__S(864, __c27, 0)),
          SnapshotInitiator: S.String,
          SnapshotInitiatorOperation: S.String,
          SnapshotSourceDescription: __S(1634, __c51, 2),
          SnapshotFormat: S.String,
        }),
      ).annotate({ identifier: "SnapshotInfoDetails" });
    case 4:
      return S.suspend(() =>
        S.Struct({ SnapshotInfoDetails: __S(1635, __c51, 3) }).pipe(ns),
      ).annotate({ identifier: "DescribeSnapshotResponse" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ BucketARN: S.String, KeyPrefix: S.String })).annotate({
        identifier: "S3PrefixLocation",
      });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SnapshotName: S.String, SnapshotOperationId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeSnapshotOperationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BucketARN: S.String,
          KeyPrefix: S.String,
          ExportedPrefix: S.optional(S.String),
        }),
      ).annotate({ identifier: "SnapshotOperationS3PrefixLocation" });
    case 2:
      return S.suspend(() =>
        S.Struct({ LocationType: S.String, S3PrefixLocation: __S(1697, __c53, 1) }),
      ).annotate({ identifier: "SnapshotOperationLocationDescription" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ApplicationOperationId: S.optional(S.String),
          ApplicationName: S.optional(S.String),
        }),
      ).annotate({ identifier: "ApplicationOperationDescription" });
    case 4:
      return S.suspend(() =>
        S.Struct({ ErrorCode: S.optional(S.String), ErrorString: S.optional(S.String) }),
      ).annotate({ identifier: "SnapshotErrorInfo" });
    case 5:
      return S.suspend(() => S.Struct({ ErrorInfo: S.optional(__S(1700, __c53, 4)) })).annotate({
        identifier: "SnapshotOperationFailureDetails",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({
          SnapshotOperationId: S.String,
          SnapshotOperation: S.String,
          SnapshotOperationStatus: S.String,
          SnapshotArn: S.String,
          SourceEncryptionConfigurationDescription: S.optional(__S(864, __c27, 0)),
          DestinationEncryptionConfigurationDescription: S.optional(__S(864, __c27, 0)),
          SnapshotSourceLocationDescription: S.optional(__S(1698, __c53, 2)),
          SnapshotDestinationLocationDescription: S.optional(__S(1698, __c53, 2)),
          ApplicationOperationDescription: S.optional(__S(1699, __c53, 3)),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SnapshotOperationFailureDetails: S.optional(__S(1701, __c53, 5)),
        }),
      ).annotate({ identifier: "SnapshotOperationInfoDetails" });
    case 7:
      return S.suspend(() =>
        S.Struct({ SnapshotOperationInfoDetails: __S(1702, __c53, 6) }).pipe(ns),
      ).annotate({ identifier: "DescribeSnapshotOperationResponse" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ BucketARN: S.String, FileKey: S.String })).annotate({
        identifier: "S3Configuration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceARN: S.optional(S.String),
          ServiceExecutionRole: S.String,
          InputStartingPositionConfiguration: S.optional(__S(384, __c12, 0)),
          S3Configuration: S.optional(__S(1728, __c54, 0)),
          InputProcessingConfiguration: S.optional(__S(288, __c9, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DiscoverInputSchemaRequest" });
    case 2:
      return S.Array(__S(0, __c0, 0));
    case 3:
      return S.suspend(() =>
        S.Struct({
          InputSchema: S.optional(__S(326, __c10, 6)),
          ParsedInputRecords: S.optional(__S(1730, __c54, 2)),
          ProcessedInputRecords: S.optional(__S(0, __c0, 0)),
          RawInputRecords: S.optional(__S(0, __c0, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "DiscoverInputSchemaResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DestinationType: S.String,
          ExportRoleArn: S.String,
          DestinationEncryptionConfiguration: S.optional(__S(864, __c27, 0)),
          DestinationS3PrefixLocation: __S(1664, __c52, 0),
        }),
      ).annotate({ identifier: "ExportDestinationConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SnapshotName: S.String,
          ExportDestinationConfiguration: __S(1760, __c55, 0),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ExportSnapshotRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ SnapshotOperationId: S.String, SnapshotOperationStatus: S.String }).pipe(ns),
      ).annotate({ identifier: "ExportSnapshotResponse" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceType: S.String,
          ImportRoleArn: S.String,
          SourceEncryptionConfiguration: S.optional(__S(864, __c27, 0)),
          SourceS3PrefixLocation: __S(1664, __c52, 0),
        }),
      ).annotate({ identifier: "ImportSourceConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SnapshotName: S.String,
          ImportSourceConfiguration: __S(1792, __c56, 0),
          DestinationEncryptionConfiguration: S.optional(__S(864, __c27, 0)),
          SnapshotDescription: S.optional(S.String),
          SnapshotFormat: S.optional(S.String),
          Tags: S.optional(__S(801, __c25, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ImportSnapshotRequest" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationName: S.String,
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Operation: S.optional(S.String),
          OperationStatus: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListApplicationOperationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Operation: S.optional(S.String),
          OperationId: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          OperationStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "ApplicationOperationInfo" });
    case 2:
      return S.Array(__S(1825, __c57, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ApplicationOperationInfoList: S.optional(__S(1826, __c57, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListApplicationOperationsResponse" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Limit: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListApplicationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ApplicationName: S.String,
          ApplicationARN: S.String,
          ApplicationStatus: S.String,
          ApplicationVersionId: S.Number,
          RuntimeEnvironment: S.String,
          ApplicationMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "ApplicationSummary" });
    case 2:
      return S.Array(__S(1857, __c58, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ApplicationSummaries: __S(1858, __c58, 2),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListApplicationsResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationName: S.String,
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListApplicationSnapshotsRequest" });
    case 1:
      return S.Array(__S(1568, __c49, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          SnapshotSummaries: S.optional(__S(1889, __c59, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListApplicationSnapshotsResponse" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationName: S.String,
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListApplicationVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ApplicationVersionId: S.Number, ApplicationStatus: S.String }),
      ).annotate({ identifier: "ApplicationVersionSummary" });
    case 2:
      return S.Array(__S(1921, __c60, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ApplicationVersionSummaries: S.optional(__S(1922, __c60, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListApplicationVersionsResponse" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SnapshotName: S.String,
          SnapshotOperation: S.optional(S.String),
          SnapshotOperationStatus: S.optional(S.String),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSnapshotOperationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SnapshotOperationId: S.String,
          SnapshotOperation: S.String,
          SnapshotOperationStatus: S.String,
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "SnapshotOperationInfo" });
    case 2:
      return S.Array(__S(1953, __c61, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          SnapshotOperationInfoList: __S(1954, __c61, 2),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListSnapshotOperationsResponse" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceApplicationName: S.optional(S.String),
          SnapshotInitiator: S.optional(S.String),
          SnapshotInitiatorOperation: S.optional(S.String),
          SnapshotStatus: S.optional(S.String),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSnapshotsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SnapshotName: S.String,
          SnapshotArn: S.String,
          SnapshotStatus: S.String,
          SnapshotCreationTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          SnapshotInitiator: S.String,
          SnapshotInitiatorOperation: S.String,
          SourceApplicationName: S.optional(S.String),
          SnapshotFormat: S.String,
        }),
      ).annotate({ identifier: "SnapshotInfo" });
    case 2:
      return S.Array(__S(1985, __c62, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ SnapshotInfoList: __S(1986, __c62, 2), NextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListSnapshotsResponse" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(801, __c25, 1)) }).pipe(ns)).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationName: S.String, CurrentApplicationVersionId: S.Number }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RollbackApplicationRequest" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationDetail: __S(954, __c29, 26),
          OperationId: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "RollbackApplicationResponse" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InputId: S.String, InputStartingPositionConfiguration: __S(384, __c12, 0) }),
      ).annotate({ identifier: "SqlRunConfiguration" });
    case 1:
      return S.Array(__S(2112, __c66, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          FlinkRunConfiguration: S.optional(__S(897, __c28, 1)),
          SqlRunConfigurations: S.optional(__S(2113, __c66, 1)),
          ApplicationRestoreConfiguration: S.optional(__S(896, __c28, 0)),
        }),
      ).annotate({ identifier: "RunConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ApplicationName: S.String,
          RunConfiguration: S.optional(__S(2114, __c66, 2)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartApplicationRequest" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ OperationId: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "StartApplicationResponse",
      });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationName: S.String, Force: S.optional(S.Boolean) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopApplicationRequest" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, Tags: __S(801, __c25, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, TagKeys: __S(0, __c0, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ResourceARNUpdate: S.String })).annotate({
        identifier: "InputLambdaProcessorUpdate",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ InputLambdaProcessorUpdate: __S(2272, __c71, 0) }),
      ).annotate({ identifier: "InputProcessingConfigurationUpdate" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          RecordFormatUpdate: S.optional(__S(323, __c10, 3)),
          RecordEncodingUpdate: S.optional(S.String),
          RecordColumnUpdates: S.optional(__S(325, __c10, 5)),
        }),
      ).annotate({ identifier: "InputSchemaUpdate" });
    case 3:
      return S.suspend(() => S.Struct({ CountUpdate: S.Number })).annotate({
        identifier: "InputParallelismUpdate",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          InputId: S.String,
          NamePrefixUpdate: S.optional(S.String),
          InputProcessingConfigurationUpdate: S.optional(__S(2273, __c71, 1)),
          KinesisStreamsInputUpdate: S.optional(__S(2272, __c71, 0)),
          KinesisFirehoseInputUpdate: S.optional(__S(2272, __c71, 0)),
          InputSchemaUpdate: S.optional(__S(2274, __c71, 2)),
          InputParallelismUpdate: S.optional(__S(2275, __c71, 3)),
        }),
      ).annotate({ identifier: "InputUpdate" });
    case 5:
      return S.Array(__S(2276, __c71, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          OutputId: S.String,
          NameUpdate: S.optional(S.String),
          KinesisStreamsOutputUpdate: S.optional(__S(2272, __c71, 0)),
          KinesisFirehoseOutputUpdate: S.optional(__S(2272, __c71, 0)),
          LambdaOutputUpdate: S.optional(__S(2272, __c71, 0)),
          DestinationSchemaUpdate: S.optional(__S(544, __c17, 0)),
        }),
      ).annotate({ identifier: "OutputUpdate" });
    case 7:
      return S.Array(__S(2278, __c71, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({ BucketARNUpdate: S.optional(S.String), FileKeyUpdate: S.optional(S.String) }),
      ).annotate({ identifier: "S3ReferenceDataSourceUpdate" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          ReferenceId: S.String,
          TableNameUpdate: S.optional(S.String),
          S3ReferenceDataSourceUpdate: S.optional(__S(2280, __c71, 8)),
          ReferenceSchemaUpdate: S.optional(__S(326, __c10, 6)),
        }),
      ).annotate({ identifier: "ReferenceDataSourceUpdate" });
    case 10:
      return S.Array(__S(2281, __c71, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({
          InputUpdates: S.optional(__S(2277, __c71, 5)),
          OutputUpdates: S.optional(__S(2279, __c71, 7)),
          ReferenceDataSourceUpdates: S.optional(__S(2282, __c71, 10)),
        }),
      ).annotate({ identifier: "SqlApplicationConfigurationUpdate" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          BucketARNUpdate: S.optional(S.String),
          FileKeyUpdate: S.optional(S.String),
          ObjectVersionUpdate: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3ContentLocationUpdate" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          TextContentUpdate: S.optional(S.String),
          ZipFileContentUpdate: S.optional(T.Blob),
          S3ContentLocationUpdate: S.optional(__S(2284, __c71, 12)),
        }),
      ).annotate({ identifier: "CodeContentUpdate" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          CodeContentTypeUpdate: S.optional(S.String),
          CodeContentUpdate: S.optional(__S(2285, __c71, 13)),
        }),
      ).annotate({ identifier: "ApplicationCodeConfigurationUpdate" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          ConfigurationTypeUpdate: S.optional(S.String),
          CheckpointingEnabledUpdate: S.optional(S.Boolean),
          CheckpointIntervalUpdate: S.optional(S.Number),
          MinPauseBetweenCheckpointsUpdate: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CheckpointConfigurationUpdate" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          ConfigurationTypeUpdate: S.optional(S.String),
          MetricsLevelUpdate: S.optional(S.String),
          LogLevelUpdate: S.optional(S.String),
        }),
      ).annotate({ identifier: "MonitoringConfigurationUpdate" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          ConfigurationTypeUpdate: S.optional(S.String),
          ParallelismUpdate: S.optional(S.Number),
          ParallelismPerKPUUpdate: S.optional(S.Number),
          AutoScalingEnabledUpdate: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ParallelismConfigurationUpdate" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          CheckpointConfigurationUpdate: S.optional(__S(2287, __c71, 15)),
          MonitoringConfigurationUpdate: S.optional(__S(2288, __c71, 16)),
          ParallelismConfigurationUpdate: S.optional(__S(2289, __c71, 17)),
        }),
      ).annotate({ identifier: "FlinkApplicationConfigurationUpdate" });
    case 19:
      return S.suspend(() =>
        S.Struct({ SnapshotsEnabledUpdate: S.Boolean, SnapshotModeUpdate: S.optional(S.String) }),
      ).annotate({ identifier: "ApplicationSnapshotConfigurationUpdate" });
    case 20:
      return S.suspend(() => S.Struct({ RollbackEnabledUpdate: S.Boolean })).annotate({
        identifier: "ApplicationSystemRollbackConfigurationUpdate",
      });
    case 21:
      return S.suspend(() =>
        S.Struct({
          VpcConfigurationId: S.String,
          SubnetIdUpdates: S.optional(__S(0, __c0, 0)),
          SecurityGroupIdUpdates: S.optional(__S(0, __c0, 0)),
        }),
      ).annotate({ identifier: "VpcConfigurationUpdate" });
    case 22:
      return S.Array(__S(2293, __c71, 21));
    case 23:
      return S.suspend(() => S.Struct({ LogLevelUpdate: S.String })).annotate({
        identifier: "ZeppelinMonitoringConfigurationUpdate",
      });
    case 24:
      return S.suspend(() => S.Struct({ DatabaseARNUpdate: S.String })).annotate({
        identifier: "GlueDataCatalogConfigurationUpdate",
      });
    case 25:
      return S.suspend(() =>
        S.Struct({ GlueDataCatalogConfigurationUpdate: __S(2296, __c71, 24) }),
      ).annotate({ identifier: "CatalogConfigurationUpdate" });
    case 26:
      return S.suspend(() =>
        S.Struct({ BucketARNUpdate: S.optional(S.String), BasePathUpdate: S.optional(S.String) }),
      ).annotate({ identifier: "S3ContentBaseLocationUpdate" });
    case 27:
      return S.suspend(() =>
        S.Struct({ S3ContentLocationUpdate: S.optional(__S(2298, __c71, 26)) }),
      ).annotate({ identifier: "DeployAsApplicationConfigurationUpdate" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          MonitoringConfigurationUpdate: S.optional(__S(2295, __c71, 23)),
          CatalogConfigurationUpdate: S.optional(__S(2297, __c71, 25)),
          DeployAsApplicationConfigurationUpdate: S.optional(__S(2299, __c71, 27)),
          CustomArtifactsConfigurationUpdate: S.optional(__S(994, __c31, 2)),
        }),
      ).annotate({ identifier: "ZeppelinApplicationConfigurationUpdate" });
    case 29:
      return S.suspend(() =>
        S.Struct({ KeyIdUpdate: S.optional(S.String), KeyTypeUpdate: S.String }),
      ).annotate({ identifier: "ApplicationEncryptionConfigurationUpdate" });
    case 30:
      return S.suspend(() =>
        S.Struct({
          SqlApplicationConfigurationUpdate: S.optional(__S(2283, __c71, 11)),
          ApplicationCodeConfigurationUpdate: S.optional(__S(2286, __c71, 14)),
          FlinkApplicationConfigurationUpdate: S.optional(__S(2290, __c71, 18)),
          EnvironmentPropertyUpdates: S.optional(__S(992, __c31, 0)),
          ApplicationSnapshotConfigurationUpdate: S.optional(__S(2291, __c71, 19)),
          ApplicationSystemRollbackConfigurationUpdate: S.optional(__S(2292, __c71, 20)),
          VpcConfigurationUpdates: S.optional(__S(2294, __c71, 22)),
          ZeppelinApplicationConfigurationUpdate: S.optional(__S(2300, __c71, 28)),
          ApplicationEncryptionConfigurationUpdate: S.optional(__S(2301, __c71, 29)),
        }),
      ).annotate({ identifier: "ApplicationConfigurationUpdate" });
    case 31:
      return S.suspend(() =>
        S.Struct({
          FlinkRunConfiguration: S.optional(__S(897, __c28, 1)),
          ApplicationRestoreConfiguration: S.optional(__S(896, __c28, 0)),
        }),
      ).annotate({ identifier: "RunConfigurationUpdate" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CloudWatchLoggingOptionId: S.String, LogStreamARNUpdate: S.optional(S.String) }),
      ).annotate({ identifier: "CloudWatchLoggingOptionUpdate" });
    case 1:
      return S.Array(__S(2304, __c72, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ApplicationName: S.String,
          CurrentApplicationVersionId: S.optional(S.Number),
          ApplicationConfigurationUpdate: S.optional(__S(2302, __c71, 30)),
          ServiceExecutionRoleUpdate: S.optional(S.String),
          RunConfigurationUpdate: S.optional(__S(2303, __c71, 31)),
          CloudWatchLoggingOptionUpdates: S.optional(__S(2305, __c72, 1)),
          ConditionalToken: S.optional(S.String),
          RuntimeEnvironmentUpdate: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateApplicationRequest" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationMaintenanceWindowStartTimeUpdate: S.String }),
      ).annotate({ identifier: "ApplicationMaintenanceConfigurationUpdate" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ApplicationName: S.String,
          ApplicationMaintenanceConfigurationUpdate: __S(2336, __c73, 0),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateApplicationMaintenanceConfigurationRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ApplicationARN: S.optional(S.String),
          ApplicationMaintenanceConfigurationDescription: S.optional(__S(960, __c30, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateApplicationMaintenanceConfigurationResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
