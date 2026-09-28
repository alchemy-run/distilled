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
  sdkId: "Kinesis Analytics",
  target: "KinesisAnalytics_20150814",
  version: "2015-08-14",
  sigv4: "kinesisanalytics",
  protocol: awsJson1_1Protocol,
  xmlns: "http://analytics.kinesis.amazonaws.com/doc/2015-08-14",
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
export type RoleARN = string;
export interface CloudWatchLoggingOption {
  LogStreamARN: string;
  RoleARN: string;
}
export interface AddApplicationCloudWatchLoggingOptionRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  CloudWatchLoggingOption: CloudWatchLoggingOption;
}
export interface AddApplicationCloudWatchLoggingOptionResponse {}
export type InAppStreamName = string;
export type ResourceARN = string;
export interface InputLambdaProcessor {
  ResourceARN: string;
  RoleARN: string;
}
export interface InputProcessingConfiguration {
  InputLambdaProcessor: InputLambdaProcessor;
}
export interface KinesisStreamsInput {
  ResourceARN: string;
  RoleARN: string;
}
export interface KinesisFirehoseInput {
  ResourceARN: string;
  RoleARN: string;
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
export interface AddApplicationInputResponse {}
export type Id = string;
export interface AddApplicationInputProcessingConfigurationRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  InputId: string;
  InputProcessingConfiguration: InputProcessingConfiguration;
}
export interface AddApplicationInputProcessingConfigurationResponse {}
export interface KinesisStreamsOutput {
  ResourceARN: string;
  RoleARN: string;
}
export interface KinesisFirehoseOutput {
  ResourceARN: string;
  RoleARN: string;
}
export interface LambdaOutput {
  ResourceARN: string;
  RoleARN: string;
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
export interface AddApplicationOutputResponse {}
export type InAppTableName = string;
export type BucketARN = string;
export type FileKey = string;
export interface S3ReferenceDataSource {
  BucketARN: string;
  FileKey: string;
  ReferenceRoleARN: string;
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
export interface AddApplicationReferenceDataSourceResponse {}
export type ApplicationDescription = string;
export type Inputs = Input[];
export type Outputs = Output[];
export type CloudWatchLoggingOptions = CloudWatchLoggingOption[];
export type ApplicationCode = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value?: string;
}
export type Tags = Tag[];
export interface CreateApplicationRequest {
  ApplicationName: string;
  ApplicationDescription?: string;
  Inputs?: Input[];
  Outputs?: Output[];
  CloudWatchLoggingOptions?: CloudWatchLoggingOption[];
  ApplicationCode?: string;
  Tags?: Tag[];
}
export type ApplicationStatus =
  | "DELETING"
  | "STARTING"
  | "STOPPING"
  | "READY"
  | "RUNNING"
  | "UPDATING"
  | (string & {});
export interface ApplicationSummary {
  ApplicationName: string;
  ApplicationARN: string;
  ApplicationStatus: ApplicationStatus;
}
export interface CreateApplicationResponse {
  ApplicationSummary: ApplicationSummary;
}
export interface DeleteApplicationRequest {
  ApplicationName: string;
  CreateTimestamp: Date;
}
export interface DeleteApplicationResponse {}
export interface DeleteApplicationCloudWatchLoggingOptionRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  CloudWatchLoggingOptionId: string;
}
export interface DeleteApplicationCloudWatchLoggingOptionResponse {}
export interface DeleteApplicationInputProcessingConfigurationRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  InputId: string;
}
export interface DeleteApplicationInputProcessingConfigurationResponse {}
export interface DeleteApplicationOutputRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  OutputId: string;
}
export interface DeleteApplicationOutputResponse {}
export interface DeleteApplicationReferenceDataSourceRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  ReferenceId: string;
}
export interface DeleteApplicationReferenceDataSourceResponse {}
export interface DescribeApplicationRequest {
  ApplicationName: string;
}
export type InAppStreamNames = string[];
export interface InputLambdaProcessorDescription {
  ResourceARN?: string;
  RoleARN?: string;
}
export interface InputProcessingConfigurationDescription {
  InputLambdaProcessorDescription?: InputLambdaProcessorDescription;
}
export interface KinesisStreamsInputDescription {
  ResourceARN?: string;
  RoleARN?: string;
}
export interface KinesisFirehoseInputDescription {
  ResourceARN?: string;
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
export interface KinesisStreamsOutputDescription {
  ResourceARN?: string;
  RoleARN?: string;
}
export interface KinesisFirehoseOutputDescription {
  ResourceARN?: string;
  RoleARN?: string;
}
export interface LambdaOutputDescription {
  ResourceARN?: string;
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
export interface S3ReferenceDataSourceDescription {
  BucketARN: string;
  FileKey: string;
  ReferenceRoleARN: string;
}
export interface ReferenceDataSourceDescription {
  ReferenceId: string;
  TableName: string;
  S3ReferenceDataSourceDescription: S3ReferenceDataSourceDescription;
  ReferenceSchema?: SourceSchema;
}
export type ReferenceDataSourceDescriptions = ReferenceDataSourceDescription[];
export interface CloudWatchLoggingOptionDescription {
  CloudWatchLoggingOptionId?: string;
  LogStreamARN: string;
  RoleARN: string;
}
export type CloudWatchLoggingOptionDescriptions =
  CloudWatchLoggingOptionDescription[];
export interface ApplicationDetail {
  ApplicationName: string;
  ApplicationDescription?: string;
  ApplicationARN: string;
  ApplicationStatus: ApplicationStatus;
  CreateTimestamp?: Date;
  LastUpdateTimestamp?: Date;
  InputDescriptions?: InputDescription[];
  OutputDescriptions?: OutputDescription[];
  ReferenceDataSourceDescriptions?: ReferenceDataSourceDescription[];
  CloudWatchLoggingOptionDescriptions?: CloudWatchLoggingOptionDescription[];
  ApplicationCode?: string;
  ApplicationVersionId: number;
}
export interface DescribeApplicationResponse {
  ApplicationDetail: ApplicationDetail;
}
export interface S3Configuration {
  RoleARN: string;
  BucketARN: string;
  FileKey: string;
}
export interface DiscoverInputSchemaRequest {
  ResourceARN?: string;
  RoleARN?: string;
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
export type ListApplicationsInputLimit = number;
export interface ListApplicationsRequest {
  Limit?: number;
  ExclusiveStartApplicationName?: string;
}
export type ApplicationSummaries = ApplicationSummary[];
export interface ListApplicationsResponse {
  ApplicationSummaries: ApplicationSummary[];
  HasMoreApplications: boolean;
}
export type KinesisAnalyticsARN = string;
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export interface InputConfiguration {
  Id: string;
  InputStartingPositionConfiguration: InputStartingPositionConfiguration;
}
export type InputConfigurations = InputConfiguration[];
export interface StartApplicationRequest {
  ApplicationName: string;
  InputConfigurations: InputConfiguration[];
}
export interface StartApplicationResponse {}
export interface StopApplicationRequest {
  ApplicationName: string;
}
export interface StopApplicationResponse {}
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
  ResourceARNUpdate?: string;
  RoleARNUpdate?: string;
}
export interface InputProcessingConfigurationUpdate {
  InputLambdaProcessorUpdate: InputLambdaProcessorUpdate;
}
export interface KinesisStreamsInputUpdate {
  ResourceARNUpdate?: string;
  RoleARNUpdate?: string;
}
export interface KinesisFirehoseInputUpdate {
  ResourceARNUpdate?: string;
  RoleARNUpdate?: string;
}
export interface InputSchemaUpdate {
  RecordFormatUpdate?: RecordFormat;
  RecordEncodingUpdate?: string;
  RecordColumnUpdates?: RecordColumn[];
}
export interface InputParallelismUpdate {
  CountUpdate?: number;
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
  ResourceARNUpdate?: string;
  RoleARNUpdate?: string;
}
export interface KinesisFirehoseOutputUpdate {
  ResourceARNUpdate?: string;
  RoleARNUpdate?: string;
}
export interface LambdaOutputUpdate {
  ResourceARNUpdate?: string;
  RoleARNUpdate?: string;
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
  ReferenceRoleARNUpdate?: string;
}
export interface ReferenceDataSourceUpdate {
  ReferenceId: string;
  TableNameUpdate?: string;
  S3ReferenceDataSourceUpdate?: S3ReferenceDataSourceUpdate;
  ReferenceSchemaUpdate?: SourceSchema;
}
export type ReferenceDataSourceUpdates = ReferenceDataSourceUpdate[];
export interface CloudWatchLoggingOptionUpdate {
  CloudWatchLoggingOptionId: string;
  LogStreamARNUpdate?: string;
  RoleARNUpdate?: string;
}
export type CloudWatchLoggingOptionUpdates = CloudWatchLoggingOptionUpdate[];
export interface ApplicationUpdate {
  InputUpdates?: InputUpdate[];
  ApplicationCodeUpdate?: string;
  OutputUpdates?: OutputUpdate[];
  ReferenceDataSourceUpdates?: ReferenceDataSourceUpdate[];
  CloudWatchLoggingOptionUpdates?: CloudWatchLoggingOptionUpdate[];
}
export interface UpdateApplicationRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  ApplicationUpdate: ApplicationUpdate;
}
export interface UpdateApplicationResponse {}
export type ErrorMessage = string;
export type AddApplicationCloudWatchLoggingOptionError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * This documentation is for version 1 of the Amazon Kinesis Data Analytics API, which only supports SQL applications. Version 2 of the API supports SQL and Java applications. For more information about version 2, see Amazon Kinesis Data Analytics API V2 Documentation.
 *
 * Adds a CloudWatch log stream to monitor application configuration errors. For more
 * information about using CloudWatch log streams with Amazon Kinesis Analytics
 * applications, see Working with Amazon
 * CloudWatch Logs.
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
  operationName: "AddApplicationCloudWatchLoggingOption",
})) as any;

export type AddApplicationInputError =
  | CodeValidationException
  | ConcurrentModificationException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * This documentation is for version 1 of the Amazon Kinesis Data Analytics API, which only supports SQL applications. Version 2 of the API supports SQL and Java applications. For more information about version 2, see Amazon Kinesis Data Analytics API V2 Documentation.
 *
 * Adds a streaming source to your Amazon Kinesis application.
 * For conceptual information,
 * see Configuring Application Input.
 *
 * You can add a streaming source either when you create an application or you can use
 * this operation to add a streaming source after you create an application. For more information, see
 * CreateApplication.
 *
 * Any configuration update, including adding a streaming source using this operation,
 * results in a new version of the application. You can use the DescribeApplication operation
 * to find the current application version.
 *
 * This operation requires permissions to perform the
 * `kinesisanalytics:AddApplicationInput` action.
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
    ResourceInUseException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddApplicationInput",
})) as any;

export type AddApplicationInputProcessingConfigurationError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * This documentation is for version 1 of the Amazon Kinesis Data Analytics API, which only supports SQL applications. Version 2 of the API supports SQL and Java applications. For more information about version 2, see Amazon Kinesis Data Analytics API V2 Documentation.
 *
 * Adds an InputProcessingConfiguration to an application. An input processor preprocesses records on the input stream
 * before the application's SQL code executes. Currently, the only input processor available is
 * AWS Lambda.
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
    ResourceInUseException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddApplicationInputProcessingConfiguration",
})) as any;

export type AddApplicationOutputError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * This documentation is for version 1 of the Amazon Kinesis Data Analytics API, which only supports SQL applications. Version 2 of the API supports SQL and Java applications. For more information about version 2, see Amazon Kinesis Data Analytics API V2 Documentation.
 *
 * Adds an external destination to your Amazon Kinesis Analytics application.
 *
 * If you want Amazon Kinesis Analytics to deliver data from an in-application stream
 * within your application to an external destination (such as an Amazon Kinesis stream, an
 * Amazon Kinesis Firehose delivery stream, or an AWS Lambda function), you add the
 * relevant configuration to your application using this operation. You can configure one
 * or more outputs for your application. Each output configuration maps an in-application
 * stream and an external destination.
 *
 * You can use one of the output configurations to deliver data from your
 * in-application error stream to an external destination so that you can analyze the
 * errors. For more information, see Understanding Application
 * Output (Destination).
 *
 * Any configuration update, including adding a streaming source using this
 * operation, results in a new version of the application. You can use the DescribeApplication operation to find the current application
 * version.
 *
 * For the limits on the number of application inputs and outputs
 * you can configure, see Limits.
 *
 * This operation requires permissions to perform the `kinesisanalytics:AddApplicationOutput` action.
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
    ResourceInUseException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddApplicationOutput",
})) as any;

export type AddApplicationReferenceDataSourceError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * This documentation is for version 1 of the Amazon Kinesis Data Analytics API, which only supports SQL applications. Version 2 of the API supports SQL and Java applications. For more information about version 2, see Amazon Kinesis Data Analytics API V2 Documentation.
 *
 * Adds a reference data source to an existing application.
 *
 * Amazon Kinesis Analytics reads reference data (that is, an Amazon S3 object) and creates an in-application table within your application. In the request, you provide the source (S3 bucket name and object key name), name of the in-application table to create, and the necessary mapping information that describes how data in Amazon S3 object maps to columns in the resulting in-application table.
 *
 * For conceptual information,
 * see Configuring Application Input.
 * For the limits on data sources you can add to your application, see
 * Limits.
 *
 * This operation requires permissions to perform the `kinesisanalytics:AddApplicationOutput` action.
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
      ReferenceDataSource: {
        TableName: 0,
        S3ReferenceDataSource: {
          BucketARN: 0,
          FileKey: 0,
          ReferenceRoleARN: 0,
        },
        ReferenceSchema: i_SourceSchema,
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
  operationName: "AddApplicationReferenceDataSource",
})) as any;

export type CreateApplicationError =
  | CodeValidationException
  | ConcurrentModificationException
  | InvalidArgumentException
  | LimitExceededException
  | ResourceInUseException
  | TooManyTagsException
  | CommonErrors;
/**
 * This documentation is for version 1 of the Amazon Kinesis Data Analytics API, which only supports SQL applications. Version 2 of the API supports SQL and Java applications. For more information about version 2, see Amazon Kinesis Data Analytics API V2 Documentation.
 *
 * Creates an Amazon Kinesis Analytics application.
 * You can configure each application with one streaming source as input,
 * application code to process the input, and up to
 * three destinations where
 * you want Amazon Kinesis Analytics to write the output data from your application.
 * For an overview, see
 * How it Works.
 *
 * In the input configuration, you map the streaming source to an in-application stream, which you can think of as a constantly updating table. In the mapping, you must provide a schema for the in-application stream and map each data column in the in-application stream to a
 * data element in the streaming source.
 *
 * Your application code is one or more SQL statements that read input data, transform it, and generate output. Your application code can create one or more SQL artifacts like SQL streams or pumps.
 *
 * In the output configuration, you can configure the application to write data from in-application streams created in your applications to up to three destinations.
 *
 * To read data from your source stream or write data to destination streams, Amazon Kinesis Analytics
 * needs your permissions. You grant these permissions by creating IAM roles. This operation requires permissions to perform the
 * `kinesisanalytics:CreateApplication` action.
 *
 * For introductory exercises to create an Amazon Kinesis Analytics application, see
 * Getting Started.
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
      Inputs: D.list(i_Input),
      Outputs: D.list(i_Output),
      CloudWatchLoggingOptions: D.list(i_CloudWatchLoggingOption),
      ApplicationCode: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    CodeValidationException,
    ConcurrentModificationException,
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
})) as any;

export type DeleteApplicationError =
  | ConcurrentModificationException
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * This documentation is for version 1 of the Amazon Kinesis Data Analytics API, which only supports SQL applications. Version 2 of the API supports SQL and Java applications. For more information about version 2, see Amazon Kinesis Data Analytics API V2 Documentation.
 *
 * Deletes the specified application. Amazon Kinesis Analytics halts application execution and deletes the application, including any application artifacts (such as in-application streams, reference table, and application code).
 *
 * This operation requires permissions to perform the `kinesisanalytics:DeleteApplication` action.
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
    ResourceInUseException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
})) as any;

export type DeleteApplicationCloudWatchLoggingOptionError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * This documentation is for version 1 of the Amazon Kinesis Data Analytics API, which only supports SQL applications. Version 2 of the API supports SQL and Java applications. For more information about version 2, see Amazon Kinesis Data Analytics API V2 Documentation.
 *
 * Deletes a CloudWatch log stream from an application. For more information about
 * using CloudWatch log streams with Amazon Kinesis Analytics applications, see
 * Working with Amazon CloudWatch Logs.
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
  operationName: "DeleteApplicationCloudWatchLoggingOption",
})) as any;

export type DeleteApplicationInputProcessingConfigurationError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * This documentation is for version 1 of the Amazon Kinesis Data Analytics API, which only supports SQL applications. Version 2 of the API supports SQL and Java applications. For more information about version 2, see Amazon Kinesis Data Analytics API V2 Documentation.
 *
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
    ResourceInUseException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplicationInputProcessingConfiguration",
})) as any;

export type DeleteApplicationOutputError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * This documentation is for version 1 of the Amazon Kinesis Data Analytics API, which only supports SQL applications. Version 2 of the API supports SQL and Java applications. For more information about version 2, see Amazon Kinesis Data Analytics API V2 Documentation.
 *
 * Deletes output destination configuration from your application configuration. Amazon Kinesis Analytics will no longer write data from the corresponding in-application stream to the external output destination.
 *
 * This operation requires permissions to perform the
 * `kinesisanalytics:DeleteApplicationOutput` action.
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
    ResourceInUseException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplicationOutput",
})) as any;

export type DeleteApplicationReferenceDataSourceError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * This documentation is for version 1 of the Amazon Kinesis Data Analytics API, which only supports SQL applications. Version 2 of the API supports SQL and Java applications. For more information about version 2, see Amazon Kinesis Data Analytics API V2 Documentation.
 *
 * Deletes a reference data source configuration from the specified application configuration.
 *
 * If the application is running, Amazon Kinesis Analytics immediately removes the in-application table
 * that you created using the AddApplicationReferenceDataSource operation.
 *
 * This operation requires permissions to perform the `kinesisanalytics.DeleteApplicationReferenceDataSource`
 * action.
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
    ResourceInUseException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplicationReferenceDataSource",
})) as any;

export type DescribeApplicationError =
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * This documentation is for version 1 of the Amazon Kinesis Data Analytics API, which only supports SQL applications. Version 2 of the API supports SQL and Java applications. For more information about version 2, see Amazon Kinesis Data Analytics API V2 Documentation.
 *
 * Returns information about a specific Amazon Kinesis Analytics application.
 *
 * If you want to retrieve a list of all applications in your account,
 * use the ListApplications operation.
 *
 * This operation requires permissions to perform the `kinesisanalytics:DescribeApplication`
 * action. You can use `DescribeApplication` to get the current application versionId, which you need to call other
 * operations such as `Update`.
 */
export const describeApplication: API.OperationMethod<
  DescribeApplicationRequest,
  DescribeApplicationResponse,
  DescribeApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ApplicationName: 0 },
    output: {
      ApplicationDetail: { CreateTimestamp: D.ts, LastUpdateTimestamp: D.ts },
    },
  },
  errors: [ResourceNotFoundException, UnsupportedOperationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplication",
})) as any;

export type DiscoverInputSchemaError =
  | InvalidArgumentException
  | ResourceProvisionedThroughputExceededException
  | ServiceUnavailableException
  | UnableToDetectSchemaException
  | CommonErrors;
/**
 * This documentation is for version 1 of the Amazon Kinesis Data Analytics API, which only supports SQL applications. Version 2 of the API supports SQL and Java applications. For more information about version 2, see Amazon Kinesis Data Analytics API V2 Documentation.
 *
 * Infers a schema by evaluating sample records on the specified streaming source (Amazon Kinesis stream or Amazon Kinesis Firehose delivery stream) or S3 object. In the response, the operation returns the inferred schema and also the sample records that the operation used to infer the schema.
 *
 * You can use the inferred schema when configuring a streaming source
 * for your application. For conceptual information,
 * see Configuring Application Input.
 * Note that when you create an application using the Amazon Kinesis Analytics console,
 * the console uses this operation to infer a schema and show it in the console user interface.
 *
 * This operation requires permissions to perform the
 * `kinesisanalytics:DiscoverInputSchema` action.
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
      RoleARN: 0,
      InputStartingPositionConfiguration: i_InputStartingPositionConfiguration,
      S3Configuration: { RoleARN: 0, BucketARN: 0, FileKey: 0 },
      InputProcessingConfiguration: i_InputProcessingConfiguration,
    },
  },
  errors: [
    InvalidArgumentException,
    ResourceProvisionedThroughputExceededException,
    ServiceUnavailableException,
    UnableToDetectSchemaException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DiscoverInputSchema",
})) as any;

export type ListApplicationsError = CommonErrors;
/**
 * This documentation is for version 1 of the Amazon Kinesis Data Analytics API, which only supports SQL applications. Version 2 of the API supports SQL and Java applications. For more information about version 2, see Amazon Kinesis Data Analytics API V2 Documentation.
 *
 * Returns a list of Amazon Kinesis Analytics applications in your account.
 * For each application, the response includes the application name,
 * Amazon Resource Name (ARN), and status.
 *
 * If the response returns the `HasMoreApplications` value as true,
 * you can send another request by adding the
 * `ExclusiveStartApplicationName` in the request body, and
 * set the value of this to the last application name from
 * the previous response.
 *
 * If you want detailed information about a specific application, use
 * DescribeApplication.
 *
 * This operation requires permissions to perform the
 * `kinesisanalytics:ListApplications` action.
 */
export const listApplications: API.OperationMethod<
  ListApplicationsRequest,
  ListApplicationsResponse,
  ListApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Limit: 0, ExclusiveStartApplicationName: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplications",
})) as any;

export type ListTagsForResourceError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the list of key-value tags assigned to the application. For more information, see Using Tagging.
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

export type StartApplicationError =
  | InvalidApplicationConfigurationException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * This documentation is for version 1 of the Amazon Kinesis Data Analytics API, which only supports SQL applications. Version 2 of the API supports SQL and Java applications. For more information about version 2, see Amazon Kinesis Data Analytics API V2 Documentation.
 *
 * Starts the specified Amazon Kinesis Analytics application. After creating an application, you must exclusively call this operation to start your application.
 *
 * After the application starts, it begins consuming the input data, processes it, and writes the output to the configured destination.
 *
 * The application status must be `READY` for you to start an application. You can
 * get the application status in the console or using the DescribeApplication operation.
 *
 * After you start the application, you can stop the application from processing
 * the input by calling the StopApplication operation.
 *
 * This operation requires permissions to perform the
 * `kinesisanalytics:StartApplication` action.
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
      InputConfigurations: D.list({
        Id: 0,
        InputStartingPositionConfiguration:
          i_InputStartingPositionConfiguration,
      }),
    },
  },
  errors: [
    InvalidApplicationConfigurationException,
    InvalidArgumentException,
    ResourceInUseException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartApplication",
})) as any;

export type StopApplicationError =
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * This documentation is for version 1 of the Amazon Kinesis Data Analytics API, which only supports SQL applications. Version 2 of the API supports SQL and Java applications. For more information about version 2, see Amazon Kinesis Data Analytics API V2 Documentation.
 *
 * Stops the application from processing input data. You can stop
 * an application only if it is in the running state.
 * You can use the DescribeApplication operation to find the application state.
 * After the application is stopped,
 * Amazon Kinesis Analytics stops reading data from the input, the
 * application stops processing data, and there is no output written to the destination.
 *
 * This operation requires permissions to perform the
 * `kinesisanalytics:StopApplication` action.
 */
export const stopApplication: API.OperationMethod<
  StopApplicationRequest,
  StopApplicationResponse,
  StopApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ApplicationName: 0 } },
  errors: [
    ResourceInUseException,
    ResourceNotFoundException,
    UnsupportedOperationException,
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
 * Adds one or more key-value tags to a Kinesis Analytics application. Note that the maximum number of application tags includes system tags. The maximum number of user-defined application tags is 50.
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
 * Removes one or more tags from a Kinesis Analytics application. For more information, see Using Tagging.
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
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * This documentation is for version 1 of the Amazon Kinesis Data Analytics API, which only supports SQL applications. Version 2 of the API supports SQL and Java applications. For more information about version 2, see Amazon Kinesis Data Analytics API V2 Documentation.
 *
 * Updates an existing Amazon Kinesis Analytics application. Using this API,
 * you can update application code, input configuration, and
 * output configuration.
 *
 * Note that Amazon Kinesis Analytics updates the `CurrentApplicationVersionId`
 * each time you update your application.
 *
 * This operation requires permission for the
 * `kinesisanalytics:UpdateApplication` action.
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
      ApplicationUpdate: {
        InputUpdates: D.list({
          InputId: 0,
          NamePrefixUpdate: 0,
          InputProcessingConfigurationUpdate: {
            InputLambdaProcessorUpdate: {
              ResourceARNUpdate: 0,
              RoleARNUpdate: 0,
            },
          },
          KinesisStreamsInputUpdate: { ResourceARNUpdate: 0, RoleARNUpdate: 0 },
          KinesisFirehoseInputUpdate: {
            ResourceARNUpdate: 0,
            RoleARNUpdate: 0,
          },
          InputSchemaUpdate: {
            RecordFormatUpdate: i_RecordFormat,
            RecordEncodingUpdate: 0,
            RecordColumnUpdates: D.list(i_RecordColumn),
          },
          InputParallelismUpdate: { CountUpdate: 0 },
        }),
        ApplicationCodeUpdate: 0,
        OutputUpdates: D.list({
          OutputId: 0,
          NameUpdate: 0,
          KinesisStreamsOutputUpdate: {
            ResourceARNUpdate: 0,
            RoleARNUpdate: 0,
          },
          KinesisFirehoseOutputUpdate: {
            ResourceARNUpdate: 0,
            RoleARNUpdate: 0,
          },
          LambdaOutputUpdate: { ResourceARNUpdate: 0, RoleARNUpdate: 0 },
          DestinationSchemaUpdate: i_DestinationSchema,
        }),
        ReferenceDataSourceUpdates: D.list({
          ReferenceId: 0,
          TableNameUpdate: 0,
          S3ReferenceDataSourceUpdate: {
            BucketARNUpdate: 0,
            FileKeyUpdate: 0,
            ReferenceRoleARNUpdate: 0,
          },
          ReferenceSchemaUpdate: i_SourceSchema,
        }),
        CloudWatchLoggingOptionUpdates: D.list({
          CloudWatchLoggingOptionId: 0,
          LogStreamARNUpdate: 0,
          RoleARNUpdate: 0,
        }),
      },
    },
  },
  errors: [
    CodeValidationException,
    ConcurrentModificationException,
    InvalidArgumentException,
    ResourceInUseException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
})) as any;

const i_CloudWatchLoggingOption: D.LazyStruct = () => ({
  LogStreamARN: 0,
  RoleARN: 0,
});
const i_DestinationSchema: D.LazyStruct = () => ({ RecordFormatType: 0 });
const i_Input: D.LazyStruct = () => ({
  NamePrefix: 0,
  InputProcessingConfiguration: i_InputProcessingConfiguration,
  KinesisStreamsInput: { ResourceARN: 0, RoleARN: 0 },
  KinesisFirehoseInput: { ResourceARN: 0, RoleARN: 0 },
  InputParallelism: { Count: 0 },
  InputSchema: i_SourceSchema,
});
const i_InputProcessingConfiguration: D.LazyStruct = () => ({
  InputLambdaProcessor: { ResourceARN: 0, RoleARN: 0 },
});
const i_InputStartingPositionConfiguration: D.LazyStruct = () => ({
  InputStartingPosition: 0,
});
const i_Output: D.LazyStruct = () => ({
  Name: 0,
  KinesisStreamsOutput: { ResourceARN: 0, RoleARN: 0 },
  KinesisFirehoseOutput: { ResourceARN: 0, RoleARN: 0 },
  LambdaOutput: { ResourceARN: 0, RoleARN: 0 },
  DestinationSchema: i_DestinationSchema,
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
const i_SourceSchema: D.LazyStruct = () => ({
  RecordFormat: i_RecordFormat,
  RecordEncoding: 0,
  RecordColumns: D.list(i_RecordColumn),
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
