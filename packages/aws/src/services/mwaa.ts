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
  sdkId: "MWAA",
  target: "AmazonMWAA",
  version: "2020-07-01",
  sigv4: "airflow",
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
                `https://airflow-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://airflow-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://airflow.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://airflow.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class RestApiClientException
  extends /*@__PURE__*/ TE.TaggedError(
    "RestApiClientException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly RestApiStatusCode?: number;
    readonly RestApiResponse?: any;
    readonly message?: string;
  }> {}
export class RestApiServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "RestApiServerException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly RestApiStatusCode?: number;
    readonly RestApiResponse?: any;
    readonly message?: string;
  }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ServerError"],
    { status: 503 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type EnvironmentName = string;
export interface CreateCliTokenRequest {
  Name: string;
}
export type Token = string | redacted.Redacted<string>;
export type Hostname = string;
export interface CreateCliTokenResponse {
  CliToken?: string | redacted.Redacted<string>;
  WebServerHostname?: string;
}
export type IamRoleArn = string;
export type S3BucketArn = string;
export type RelativePath = string;
export type SubnetId = string;
export type SubnetList = string[];
export type SecurityGroupId = string;
export type SecurityGroupList = string[];
export interface NetworkConfiguration {
  SubnetIds?: string[];
  SecurityGroupIds?: string[];
}
export type S3ObjectVersion = string;
export type ConfigKey = string;
export type ConfigValue = string | redacted.Redacted<string>;
export type AirflowConfigurationOptions = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export type EnvironmentClass = string;
export type MaxWorkers = number;
export type KmsKey = string;
export type AirflowVersion = string;
export type LoggingEnabled = boolean;
export type LoggingLevel = string;
export interface ModuleLoggingConfigurationInput {
  Enabled: boolean;
  LogLevel: string;
}
export interface LoggingConfigurationInput {
  DagProcessingLogs?: ModuleLoggingConfigurationInput;
  SchedulerLogs?: ModuleLoggingConfigurationInput;
  WebserverLogs?: ModuleLoggingConfigurationInput;
  WorkerLogs?: ModuleLoggingConfigurationInput;
  TaskLogs?: ModuleLoggingConfigurationInput;
}
export type WeeklyMaintenanceWindowStart = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type WebserverAccessMode = string;
export type MinWorkers = number;
export type Schedulers = number;
export type EndpointManagement = string;
export type MinWebservers = number;
export type MaxWebservers = number;
export interface CreateEnvironmentInput {
  Name: string;
  ExecutionRoleArn: string;
  SourceBucketArn: string;
  DagS3Path: string;
  NetworkConfiguration: NetworkConfiguration;
  PluginsS3Path?: string;
  PluginsS3ObjectVersion?: string;
  RequirementsS3Path?: string;
  RequirementsS3ObjectVersion?: string;
  StartupScriptS3Path?: string;
  StartupScriptS3ObjectVersion?: string;
  AirflowConfigurationOptions?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  EnvironmentClass?: string;
  MaxWorkers?: number;
  KmsKey?: string;
  AirflowVersion?: string;
  LoggingConfiguration?: LoggingConfigurationInput;
  WeeklyMaintenanceWindowStart?: string;
  Tags?: { [key: string]: string | undefined };
  WebserverAccessMode?: string;
  MinWorkers?: number;
  Schedulers?: number;
  EndpointManagement?: string;
  MinWebservers?: number;
  MaxWebservers?: number;
}
export type EnvironmentArn = string;
export interface CreateEnvironmentOutput {
  Arn?: string;
}
export interface CreateWebLoginTokenRequest {
  Name: string;
}
export type IamIdentity = string;
export type AirflowIdentity = string;
export interface CreateWebLoginTokenResponse {
  WebToken?: string | redacted.Redacted<string>;
  WebServerHostname?: string;
  IamIdentity?: string;
  AirflowIdentity?: string;
}
export interface DeleteEnvironmentInput {
  Name: string;
}
export interface DeleteEnvironmentOutput {}
export interface GetEnvironmentInput {
  Name: string;
}
export type EnvironmentStatus = string;
export type CreatedAt = Date;
export type WebserverUrl = string;
export type CloudWatchLogGroupArn = string;
export interface ModuleLoggingConfiguration {
  Enabled?: boolean;
  LogLevel?: string;
  CloudWatchLogGroupArn?: string;
}
export interface LoggingConfiguration {
  DagProcessingLogs?: ModuleLoggingConfiguration;
  SchedulerLogs?: ModuleLoggingConfiguration;
  WebserverLogs?: ModuleLoggingConfiguration;
  WorkerLogs?: ModuleLoggingConfiguration;
  TaskLogs?: ModuleLoggingConfiguration;
}
export type UpdateStatus = string;
export type UpdateCreatedAt = Date;
export type ErrorCode = string;
export type ErrorMessage = string;
export interface UpdateError {
  ErrorCode?: string;
  ErrorMessage?: string;
}
export type UpdateSource = string;
export type WorkerReplacementStrategy = string;
export interface LastUpdate {
  Status?: string;
  CreatedAt?: Date;
  Error?: UpdateError;
  Source?: string;
  WorkerReplacementStrategy?: string;
}
export type VpcEndpointServiceName = string;
export type CeleryExecutorQueue = string;
export interface Environment {
  Name?: string;
  Status?: string;
  Arn?: string;
  CreatedAt?: Date;
  WebserverUrl?: string;
  ExecutionRoleArn?: string;
  ServiceRoleArn?: string;
  KmsKey?: string;
  AirflowVersion?: string;
  SourceBucketArn?: string;
  DagS3Path?: string;
  PluginsS3Path?: string;
  PluginsS3ObjectVersion?: string;
  RequirementsS3Path?: string;
  RequirementsS3ObjectVersion?: string;
  StartupScriptS3Path?: string;
  StartupScriptS3ObjectVersion?: string;
  AirflowConfigurationOptions?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  EnvironmentClass?: string;
  MaxWorkers?: number;
  NetworkConfiguration?: NetworkConfiguration;
  LoggingConfiguration?: LoggingConfiguration;
  LastUpdate?: LastUpdate;
  WeeklyMaintenanceWindowStart?: string;
  Tags?: { [key: string]: string | undefined };
  WebserverAccessMode?: string;
  MinWorkers?: number;
  Schedulers?: number;
  WebserverVpcEndpointService?: string;
  DatabaseVpcEndpointService?: string;
  CeleryExecutorQueue?: string;
  EndpointManagement?: string;
  MinWebservers?: number;
  MaxWebservers?: number;
}
export interface GetEnvironmentOutput {
  Environment?: Environment;
}
export type RestApiPath = string;
export type RestApiMethod = string;
export type RestApiRequestBody = unknown;
export interface InvokeRestApiRequest {
  Name: string;
  Path: string;
  Method: string;
  QueryParameters?: any;
  Body?: any;
}
export type RestApiResponse = unknown;
export interface InvokeRestApiResponse {
  RestApiStatusCode?: number;
  RestApiResponse?: any;
}
export type NextToken = string;
export interface ListEnvironmentsInput {
  NextToken?: string;
  MaxResults?: number;
}
export type EnvironmentList = string[];
export interface ListEnvironmentsOutput {
  Environments: string[];
  NextToken?: string;
}
export interface ListTagsForResourceInput {
  ResourceArn: string;
}
export interface ListTagsForResourceOutput {
  Tags?: { [key: string]: string | undefined };
}
export interface Dimension {
  Name: string;
  Value: string;
}
export type Dimensions = Dimension[];
export type Unit = string;
export interface StatisticSet {
  SampleCount?: number;
  Sum?: number;
  Minimum?: number;
  Maximum?: number;
}
export interface MetricDatum {
  MetricName: string;
  Timestamp: Date;
  Dimensions?: Dimension[];
  Value?: number;
  Unit?: string;
  StatisticValues?: StatisticSet;
}
export type MetricData = MetricDatum[];
export interface PublishMetricsInput {
  EnvironmentName: string;
  MetricData: MetricDatum[];
}
export interface PublishMetricsOutput {}
export interface TagResourceInput {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceOutput {}
export type TagKeyList = string[];
export interface UntagResourceInput {
  ResourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceOutput {}
export interface UpdateNetworkConfigurationInput {
  SecurityGroupIds: string[];
}
export interface UpdateEnvironmentInput {
  Name: string;
  ExecutionRoleArn?: string;
  AirflowConfigurationOptions?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  AirflowVersion?: string;
  DagS3Path?: string;
  EnvironmentClass?: string;
  LoggingConfiguration?: LoggingConfigurationInput;
  MaxWorkers?: number;
  MinWorkers?: number;
  MaxWebservers?: number;
  MinWebservers?: number;
  WorkerReplacementStrategy?: string;
  NetworkConfiguration?: UpdateNetworkConfigurationInput;
  PluginsS3Path?: string;
  PluginsS3ObjectVersion?: string;
  RequirementsS3Path?: string;
  RequirementsS3ObjectVersion?: string;
  Schedulers?: number;
  SourceBucketArn?: string;
  StartupScriptS3Path?: string;
  StartupScriptS3ObjectVersion?: string;
  WebserverAccessMode?: string;
  WeeklyMaintenanceWindowStart?: string;
}
export interface UpdateEnvironmentOutput {
  Arn?: string;
}
export type CreateCliTokenError = ResourceNotFoundException | CommonErrors;
/**
 * Creates a CLI token for the Airflow CLI. To learn more, see Creating an Apache Airflow CLI token.
 */
export const createCliToken: API.OperationMethod<
  CreateCliTokenRequest,
  CreateCliTokenResponse,
  CreateCliTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /clitoken/{Name}",
    input: { Name: 0 },
    output: { CliToken: D.secret },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCliToken",
  endpointHostPrefix: "env.",
})) as any;

export type CreateEnvironmentError =
  | InternalServerException
  | ServiceUnavailableException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Managed Workflows for Apache Airflow (Amazon MWAA) environment.
 */
export const createEnvironment: API.OperationMethod<
  CreateEnvironmentInput,
  CreateEnvironmentOutput,
  CreateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /environments/{Name}",
    input: {
      Name: 0,
      ExecutionRoleArn: 0,
      SourceBucketArn: 0,
      DagS3Path: 0,
      NetworkConfiguration: { SubnetIds: 0, SecurityGroupIds: 0 },
      PluginsS3Path: 0,
      PluginsS3ObjectVersion: 0,
      RequirementsS3Path: 0,
      RequirementsS3ObjectVersion: 0,
      StartupScriptS3Path: 0,
      StartupScriptS3ObjectVersion: 0,
      AirflowConfigurationOptions: 0,
      EnvironmentClass: 0,
      MaxWorkers: 0,
      KmsKey: 0,
      AirflowVersion: 0,
      LoggingConfiguration: i_LoggingConfigurationInput,
      WeeklyMaintenanceWindowStart: 0,
      Tags: 0,
      WebserverAccessMode: 0,
      MinWorkers: 0,
      Schedulers: 0,
      EndpointManagement: 0,
      MinWebservers: 0,
      MaxWebservers: 0,
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ServiceUnavailableException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEnvironment",
  endpointHostPrefix: "api.",
})) as any;

export type CreateWebLoginTokenError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates a web login token for the Airflow Web UI. To learn more, see Creating an Apache Airflow web login token.
 */
export const createWebLoginToken: API.OperationMethod<
  CreateWebLoginTokenRequest,
  CreateWebLoginTokenResponse,
  CreateWebLoginTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /webtoken/{Name}",
    input: { Name: 0 },
    output: { WebToken: D.secret },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWebLoginToken",
  endpointHostPrefix: "env.",
})) as any;

export type DeleteEnvironmentError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon Managed Workflows for Apache Airflow (Amazon MWAA) environment.
 */
export const deleteEnvironment: API.OperationMethod<
  DeleteEnvironmentInput,
  DeleteEnvironmentOutput,
  DeleteEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /environments/{Name}",
    input: { Name: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnvironment",
  endpointHostPrefix: "api.",
})) as any;

export type GetEnvironmentError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes an Amazon Managed Workflows for Apache Airflow (MWAA) environment.
 */
export const getEnvironment: API.OperationMethod<
  GetEnvironmentInput,
  GetEnvironmentOutput,
  GetEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /environments/{Name}",
    input: { Name: 0 },
    output: {
      Environment: {
        CreatedAt: D.ts,
        AirflowConfigurationOptions: D.map(D.secret),
        LastUpdate: { CreatedAt: D.ts },
      },
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironment",
  endpointHostPrefix: "api.",
})) as any;

export type InvokeRestApiError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | RestApiClientException
  | RestApiServerException
  | ValidationException
  | CommonErrors;
/**
 * Invokes the Apache Airflow REST API on the webserver with the specified inputs. To learn more, see Using the Apache Airflow REST API
 */
export const invokeRestApi: API.OperationMethod<
  InvokeRestApiRequest,
  InvokeRestApiResponse,
  InvokeRestApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /restapi/{Name}",
    input: { Name: 0, Path: 0, Method: 0, QueryParameters: 0, Body: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    RestApiClientException,
    RestApiServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeRestApi",
  endpointHostPrefix: "env.",
})) as any;

export type ListEnvironmentsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Amazon Managed Workflows for Apache Airflow (MWAA) environments.
 */
export const listEnvironments: API.PaginatedOperationMethod<
  ListEnvironmentsInput,
  ListEnvironmentsOutput,
  ListEnvironmentsError,
  Credentials | HttpClient.HttpClient,
  EnvironmentName
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /environments",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
  },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironments",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Environments",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the key-value tag pairs associated to the Amazon Managed Workflows for Apache Airflow (MWAA) environment. For example, `"Environment": "Staging"`.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{ResourceArn}",
    input: { ResourceArn: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  endpointHostPrefix: "api.",
})) as any;

export type PublishMetricsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * **Internal only**. Publishes environment health metrics to Amazon CloudWatch.
 */
export const publishMetrics: API.OperationMethod<
  PublishMetricsInput,
  PublishMetricsOutput,
  PublishMetricsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /metrics/environments/{EnvironmentName}",
    input: {
      EnvironmentName: 0,
      MetricData: D.list({
        MetricName: 0,
        Timestamp: 0,
        Dimensions: D.list({ Name: 0, Value: 0 }),
        Value: 0,
        Unit: 0,
        StatisticValues: { SampleCount: 0, Sum: 0, Minimum: 0, Maximum: 0 },
      }),
    },
    body: true,
  },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PublishMetrics",
  endpointHostPrefix: "ops.",
})) as any;

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Associates key-value tag pairs to your Amazon Managed Workflows for Apache Airflow (MWAA) environment.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{ResourceArn}",
    input: { ResourceArn: 0, Tags: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  endpointHostPrefix: "api.",
})) as any;

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes key-value tag pairs associated to your Amazon Managed Workflows for Apache Airflow (MWAA) environment. For example, `"Environment": "Staging"`.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{ResourceArn}",
    input: { ResourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  endpointHostPrefix: "api.",
})) as any;

export type UpdateEnvironmentError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ValidationException
  | CommonErrors;
/**
 * Updates an Amazon Managed Workflows for Apache Airflow (MWAA) environment.
 */
export const updateEnvironment: API.OperationMethod<
  UpdateEnvironmentInput,
  UpdateEnvironmentOutput,
  UpdateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /environments/{Name}",
    input: {
      Name: 0,
      ExecutionRoleArn: 0,
      AirflowConfigurationOptions: 0,
      AirflowVersion: 0,
      DagS3Path: 0,
      EnvironmentClass: 0,
      LoggingConfiguration: i_LoggingConfigurationInput,
      MaxWorkers: 0,
      MinWorkers: 0,
      MaxWebservers: 0,
      MinWebservers: 0,
      WorkerReplacementStrategy: 0,
      NetworkConfiguration: { SecurityGroupIds: 0 },
      PluginsS3Path: 0,
      PluginsS3ObjectVersion: 0,
      RequirementsS3Path: 0,
      RequirementsS3ObjectVersion: 0,
      Schedulers: 0,
      SourceBucketArn: 0,
      StartupScriptS3Path: 0,
      StartupScriptS3ObjectVersion: 0,
      WebserverAccessMode: 0,
      WeeklyMaintenanceWindowStart: 0,
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEnvironment",
  endpointHostPrefix: "api.",
})) as any;

const i_LoggingConfigurationInput: D.LazyStruct = () => ({
  DagProcessingLogs: i_ModuleLoggingConfigurationInput,
  SchedulerLogs: i_ModuleLoggingConfigurationInput,
  WebserverLogs: i_ModuleLoggingConfigurationInput,
  WorkerLogs: i_ModuleLoggingConfigurationInput,
  TaskLogs: i_ModuleLoggingConfigurationInput,
});
const i_ModuleLoggingConfigurationInput: D.LazyStruct = () => ({
  Enabled: 0,
  LogLevel: 0,
});
