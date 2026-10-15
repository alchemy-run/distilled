import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "MWAA", serviceShapeName: "AmazonMWAA" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "airflow" });
const ver = /*@__PURE__*/ T.ServiceVersion("2020-07-01");
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
              `https://airflow-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://airflow-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://airflow.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://airflow.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://airflow.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class MwaaExecutionRoleNotAssumable
  extends /*@__PURE__*/ S.TaggedError<MwaaExecutionRoleNotAssumable>()(
    "MwaaExecutionRoleNotAssumable",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "ValidationException",
      message: { includes: "Failed to assume role" },
    }),
  ).pipe(C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class RestApiClientException
  extends /*@__PURE__*/ S.TaggedError<RestApiClientException>()(
    "RestApiClientException",
    {
      RestApiStatusCode: /*@__PURE__*/ S.optional(S.Number),
      RestApiResponse: /*@__PURE__*/ S.optional(S.Any),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class RestApiServerException
  extends /*@__PURE__*/ S.TaggedError<RestApiServerException>()(
    "RestApiServerException",
    {
      RestApiStatusCode: /*@__PURE__*/ S.optional(S.Number),
      RestApiResponse: /*@__PURE__*/ S.optional(S.Any),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(503),
  ).pipe(C.withServerError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
  AirflowConfigurationOptions?: { [key: string]: string | redacted.Redacted<string> | undefined };
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
  AirflowConfigurationOptions?: { [key: string]: string | redacted.Redacted<string> | undefined };
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
  AirflowConfigurationOptions?: { [key: string]: string | redacted.Redacted<string> | undefined };
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
  input: __S(88, __c11, 0) as any as S.Schema<CreateCliTokenRequest>,
  output: __S(89, __c11, 1) as any as S.Schema<CreateCliTokenResponse>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCliToken",
  endpointHostPrefix: "env.",
}));

export type CreateEnvironmentError =
  | InternalServerException
  | ServiceUnavailableException
  | ValidationException
  | MwaaExecutionRoleNotAssumable
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
  input: __S(96, __c12, 0) as any as S.Schema<CreateEnvironmentInput>,
  output: __S(138, __c17, 2) as any as S.Schema<CreateEnvironmentOutput>,
  errors: [
    InternalServerException,
    ServiceUnavailableException,
    ValidationException,
    MwaaExecutionRoleNotAssumable,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEnvironment",
  endpointHostPrefix: "api.",
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<CreateWebLoginTokenRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateWebLoginTokenResponse>,
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
}));

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
  input: __S(8, __c1, 0) as any as S.Schema<DeleteEnvironmentInput>,
  output: __S(16, __c2, 0) as any as S.Schema<DeleteEnvironmentOutput>,
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
}));

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
  input: __S(24, __c3, 0) as any as S.Schema<GetEnvironmentInput>,
  output: __S(30, __c3, 6) as any as S.Schema<GetEnvironmentOutput>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironment",
  endpointHostPrefix: "api.",
}));

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
  input: __S(32, __c4, 0) as any as S.Schema<InvokeRestApiRequest>,
  output: __S(33, __c4, 1) as any as S.Schema<InvokeRestApiResponse>,
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
}));

export type ListEnvironmentsError = InternalServerException | ValidationException | CommonErrors;
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
  input: __S(40, __c5, 0) as any as S.Schema<ListEnvironmentsInput>,
  output: __S(41, __c5, 1) as any as S.Schema<ListEnvironmentsOutput>,
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
  input: __S(48, __c6, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(49, __c6, 1) as any as S.Schema<ListTagsForResourceOutput>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  endpointHostPrefix: "api.",
}));

export type PublishMetricsError = InternalServerException | ValidationException | CommonErrors;
/**
 * **Internal only**. Publishes environment health metrics to Amazon CloudWatch.
 */
export const publishMetrics: API.OperationMethod<
  PublishMetricsInput,
  PublishMetricsOutput,
  PublishMetricsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(61, __c7, 5) as any as S.Schema<PublishMetricsInput>,
  output: __S(16, __c2, 0) as any as S.Schema<PublishMetricsOutput>,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PublishMetrics",
  endpointHostPrefix: "ops.",
}));

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
  input: __S(64, __c8, 0) as any as S.Schema<TagResourceInput>,
  output: __S(16, __c2, 0) as any as S.Schema<TagResourceOutput>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  endpointHostPrefix: "api.",
}));

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
  input: __S(72, __c9, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(16, __c2, 0) as any as S.Schema<UntagResourceOutput>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  endpointHostPrefix: "api.",
}));

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
  input: __S(81, __c10, 1) as any as S.Schema<UpdateEnvironmentInput>,
  output: __S(138, __c17, 2) as any as S.Schema<UpdateEnvironmentOutput>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/webtoken/{Name}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateWebLoginTokenRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          WebToken: S.optional(SensitiveString),
          WebServerHostname: S.optional(S.String),
          IamIdentity: S.optional(S.String),
          AirflowIdentity: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateWebLoginTokenResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/environments/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteEnvironmentInput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteEnvironmentOutput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/environments/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEnvironmentInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Enabled: S.optional(S.Boolean),
          LogLevel: S.optional(S.String),
          CloudWatchLogGroupArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ModuleLoggingConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DagProcessingLogs: S.optional(__S(25, __c3, 1)),
          SchedulerLogs: S.optional(__S(25, __c3, 1)),
          WebserverLogs: S.optional(__S(25, __c3, 1)),
          WorkerLogs: S.optional(__S(25, __c3, 1)),
          TaskLogs: S.optional(__S(25, __c3, 1)),
        }),
      ).annotate({ identifier: "LoggingConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({ ErrorCode: S.optional(S.String), ErrorMessage: S.optional(S.String) }),
      ).annotate({ identifier: "UpdateError" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Error: S.optional(__S(27, __c3, 3)),
          Source: S.optional(S.String),
          WorkerReplacementStrategy: S.optional(S.String),
        }),
      ).annotate({ identifier: "LastUpdate" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          Arn: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          WebserverUrl: S.optional(S.String),
          ExecutionRoleArn: S.optional(S.String),
          ServiceRoleArn: S.optional(S.String),
          KmsKey: S.optional(S.String),
          AirflowVersion: S.optional(S.String),
          SourceBucketArn: S.optional(S.String),
          DagS3Path: S.optional(S.String),
          PluginsS3Path: S.optional(S.String),
          PluginsS3ObjectVersion: S.optional(S.String),
          RequirementsS3Path: S.optional(S.String),
          RequirementsS3ObjectVersion: S.optional(S.String),
          StartupScriptS3Path: S.optional(S.String),
          StartupScriptS3ObjectVersion: S.optional(S.String),
          AirflowConfigurationOptions: S.optional(__S(128, __c16, 0)),
          EnvironmentClass: S.optional(S.String),
          MaxWorkers: S.optional(S.Number),
          NetworkConfiguration: S.optional(__S(104, __c13, 0)),
          LoggingConfiguration: S.optional(__S(26, __c3, 2)),
          LastUpdate: S.optional(__S(28, __c3, 4)),
          WeeklyMaintenanceWindowStart: S.optional(S.String),
          Tags: S.optional(__S(120, __c15, 0)),
          WebserverAccessMode: S.optional(S.String),
          MinWorkers: S.optional(S.Number),
          Schedulers: S.optional(S.Number),
          WebserverVpcEndpointService: S.optional(S.String),
          DatabaseVpcEndpointService: S.optional(S.String),
          CeleryExecutorQueue: S.optional(S.String),
          EndpointManagement: S.optional(S.String),
          MinWebservers: S.optional(S.Number),
          MaxWebservers: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Environment" });
    case 6:
      return S.suspend(() => S.Struct({ Environment: S.optional(__S(29, __c3, 5)) })).annotate({
        identifier: "GetEnvironmentOutput",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          Path: S.String,
          Method: S.String,
          QueryParameters: S.optional(S.Any),
          Body: S.optional(S.Any),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/restapi/{Name}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "InvokeRestApiRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ RestApiStatusCode: S.optional(S.Number), RestApiResponse: S.optional(S.Any) }),
      ).annotate({ identifier: "InvokeRestApiResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/environments" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListEnvironmentsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Environments: __S(112, __c14, 0), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListEnvironmentsOutput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(120, __c15, 0)) })).annotate({
        identifier: "ListTagsForResourceOutput",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.String, Value: S.String })).annotate({
        identifier: "Dimension",
      });
    case 1:
      return S.Array(__S(56, __c7, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          SampleCount: S.optional(S.Number),
          Sum: S.optional(S.Number),
          Minimum: S.optional(S.Number),
          Maximum: S.optional(S.Number),
        }),
      ).annotate({ identifier: "StatisticSet" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          MetricName: S.String,
          Timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Dimensions: S.optional(__S(57, __c7, 1)),
          Value: S.optional(S.Number),
          Unit: S.optional(S.String),
          StatisticValues: S.optional(__S(58, __c7, 2)),
        }),
      ).annotate({ identifier: "MetricDatum" });
    case 4:
      return S.Array(__S(59, __c7, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          EnvironmentName: S.String.pipe(T.HttpLabel("EnvironmentName")),
          MetricData: __S(60, __c7, 4),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/metrics/environments/{EnvironmentName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PublishMetricsInput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Tags: __S(120, __c15, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          tagKeys: __S(112, __c14, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ SecurityGroupIds: __S(112, __c14, 0) })).annotate({
        identifier: "UpdateNetworkConfigurationInput",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          ExecutionRoleArn: S.optional(S.String),
          AirflowConfigurationOptions: S.optional(__S(128, __c16, 0)),
          AirflowVersion: S.optional(S.String),
          DagS3Path: S.optional(S.String),
          EnvironmentClass: S.optional(S.String),
          LoggingConfiguration: S.optional(__S(137, __c17, 1)),
          MaxWorkers: S.optional(S.Number),
          MinWorkers: S.optional(S.Number),
          MaxWebservers: S.optional(S.Number),
          MinWebservers: S.optional(S.Number),
          WorkerReplacementStrategy: S.optional(S.String),
          NetworkConfiguration: S.optional(__S(80, __c10, 0)),
          PluginsS3Path: S.optional(S.String),
          PluginsS3ObjectVersion: S.optional(S.String),
          RequirementsS3Path: S.optional(S.String),
          RequirementsS3ObjectVersion: S.optional(S.String),
          Schedulers: S.optional(S.Number),
          SourceBucketArn: S.optional(S.String),
          StartupScriptS3Path: S.optional(S.String),
          StartupScriptS3ObjectVersion: S.optional(S.String),
          WebserverAccessMode: S.optional(S.String),
          WeeklyMaintenanceWindowStart: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/environments/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateEnvironmentInput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/clitoken/{Name}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateCliTokenRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CliToken: S.optional(SensitiveString),
          WebServerHostname: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateCliTokenResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          ExecutionRoleArn: S.String,
          SourceBucketArn: S.String,
          DagS3Path: S.String,
          NetworkConfiguration: __S(104, __c13, 0),
          PluginsS3Path: S.optional(S.String),
          PluginsS3ObjectVersion: S.optional(S.String),
          RequirementsS3Path: S.optional(S.String),
          RequirementsS3ObjectVersion: S.optional(S.String),
          StartupScriptS3Path: S.optional(S.String),
          StartupScriptS3ObjectVersion: S.optional(S.String),
          AirflowConfigurationOptions: S.optional(__S(128, __c16, 0)),
          EnvironmentClass: S.optional(S.String),
          MaxWorkers: S.optional(S.Number),
          KmsKey: S.optional(S.String),
          AirflowVersion: S.optional(S.String),
          LoggingConfiguration: S.optional(__S(137, __c17, 1)),
          WeeklyMaintenanceWindowStart: S.optional(S.String),
          Tags: S.optional(__S(120, __c15, 0)),
          WebserverAccessMode: S.optional(S.String),
          MinWorkers: S.optional(S.Number),
          Schedulers: S.optional(S.Number),
          EndpointManagement: S.optional(S.String),
          MinWebservers: S.optional(S.Number),
          MaxWebservers: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/environments/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateEnvironmentInput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubnetIds: S.optional(__S(112, __c14, 0)),
          SecurityGroupIds: S.optional(__S(112, __c14, 0)),
        }),
      ).annotate({ identifier: "NetworkConfiguration" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ SensitiveString.pipe(S.optional));
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Enabled: S.Boolean, LogLevel: S.String })).annotate({
        identifier: "ModuleLoggingConfigurationInput",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DagProcessingLogs: S.optional(__S(136, __c17, 0)),
          SchedulerLogs: S.optional(__S(136, __c17, 0)),
          WebserverLogs: S.optional(__S(136, __c17, 0)),
          WorkerLogs: S.optional(__S(136, __c17, 0)),
          TaskLogs: S.optional(__S(136, __c17, 0)),
        }),
      ).annotate({ identifier: "LoggingConfigurationInput" });
    case 2:
      return S.suspend(() => S.Struct({ Arn: S.optional(S.String) })).annotate({
        identifier: "CreateEnvironmentOutput",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
