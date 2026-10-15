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
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "EMR Serverless",
  serviceShapeName: "AwsToledoWebService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "emr-serverless" });
const ver = /*@__PURE__*/ T.ServiceVersion("2021-07-13");
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
              `https://emr-serverless-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://emr-serverless-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://emr-serverless.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://emr-serverless.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://emr-serverless.{R}.{D}","properties":{},"headers":{}}');

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
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ApplicationId = string;
export type JobRunId = string;
export type ShutdownGracePeriodInSeconds = number;
export interface CancelJobRunRequest {
  applicationId: string;
  jobRunId: string;
  shutdownGracePeriodInSeconds?: number;
}
export interface CancelJobRunResponse {
  applicationId: string;
  jobRunId: string;
}
export type ApplicationName = string;
export type ReleaseLabel = string;
export type EngineType = string;
export type ClientToken = string;
export type WorkerTypeString = string;
export type WorkerCounts = number;
export type CpuSize = string;
export type MemorySize = string;
export type DiskSize = string;
export type DiskType = string;
export interface WorkerResourceConfig {
  cpu: string;
  memory: string;
  disk?: string;
  diskType?: string;
}
export interface InitialCapacityConfig {
  workerCount: number;
  workerConfiguration?: WorkerResourceConfig;
}
export type InitialCapacityConfigMap = { [key: string]: InitialCapacityConfig | undefined };
export interface MaximumAllowedResources {
  cpu: string;
  memory: string;
  disk?: string;
}
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface AutoStartConfig {
  enabled?: boolean;
}
export interface AutoStopConfig {
  enabled?: boolean;
  idleTimeoutMinutes?: number;
}
export type SubnetString = string;
export type SubnetIds = string[];
export type SecurityGroupString = string;
export type SecurityGroupIds = string[];
export interface NetworkConfiguration {
  subnetIds?: string[];
  securityGroupIds?: string[];
}
export type Architecture = string;
export type ImageUri = string;
export interface ImageConfigurationInput {
  imageUri?: string;
  applicationLevelDigestResolution?: boolean;
}
export interface WorkerTypeSpecificationInput {
  imageConfiguration?: ImageConfigurationInput;
}
export type WorkerTypeSpecificationInputMap = {
  [key: string]: WorkerTypeSpecificationInput | undefined;
};
export type String1024 = string;
export type ConfigurationPropertyKey = string;
export type ConfigurationPropertyValue = string;
export type SensitivePropertiesMap = { [key: string]: string | undefined };
export interface Configuration {
  classification: string;
  properties?: { [key: string]: string | undefined };
  configurations?: Configuration[];
}
export type ConfigurationList = Configuration[];
export type UriString = string;
export type EncryptionKeyArn = string;
export interface S3MonitoringConfiguration {
  logUri?: string;
  encryptionKeyArn?: string;
}
export interface ManagedPersistenceMonitoringConfiguration {
  enabled?: boolean;
  encryptionKeyArn?: string;
}
export type LogGroupName = string;
export type LogStreamNamePrefix = string;
export type LogTypeString = string;
export type LogTypeList = string[];
export type LogTypeMap = { [key: string]: string[] | undefined };
export interface CloudWatchLoggingConfiguration {
  enabled: boolean;
  logGroupName?: string;
  logStreamNamePrefix?: string;
  encryptionKeyArn?: string;
  logTypes?: { [key: string]: string[] | undefined };
}
export type PrometheusUrlString = string;
export interface PrometheusMonitoringConfiguration {
  remoteWriteUrl?: string;
}
export interface MonitoringConfiguration {
  s3MonitoringConfiguration?: S3MonitoringConfiguration;
  managedPersistenceMonitoringConfiguration?: ManagedPersistenceMonitoringConfiguration;
  cloudWatchLoggingConfiguration?: CloudWatchLoggingConfiguration;
  prometheusMonitoringConfiguration?: PrometheusMonitoringConfiguration;
}
export type EncryptionContextKey = string;
export type EncryptionContextValue = string;
export type EncryptionContext = { [key: string]: string | undefined };
export interface DiskEncryptionConfiguration {
  encryptionContext?: { [key: string]: string | undefined };
  encryptionKeyArn?: string;
}
export interface InteractiveConfiguration {
  studioEnabled?: boolean;
  livyEndpointEnabled?: boolean;
  sessionEnabled?: boolean;
}
export interface SchedulerConfiguration {
  queueTimeoutMinutes?: number;
  maxConcurrentRuns?: number;
}
export type IdentityCenterInstanceArn = string;
export interface IdentityCenterConfigurationInput {
  identityCenterInstanceArn?: string;
  userBackgroundSessionsEnabled?: boolean;
}
export interface JobLevelCostAllocationConfiguration {
  enabled?: boolean;
}
export interface CreateApplicationRequest {
  name?: string;
  releaseLabel: string;
  type: string;
  clientToken: string;
  initialCapacity?: { [key: string]: InitialCapacityConfig | undefined };
  maximumCapacity?: MaximumAllowedResources;
  tags?: { [key: string]: string | undefined };
  autoStartConfiguration?: AutoStartConfig;
  autoStopConfiguration?: AutoStopConfig;
  networkConfiguration?: NetworkConfiguration;
  architecture?: string;
  imageConfiguration?: ImageConfigurationInput;
  workerTypeSpecifications?: { [key: string]: WorkerTypeSpecificationInput | undefined };
  runtimeConfiguration?: Configuration[];
  monitoringConfiguration?: MonitoringConfiguration;
  diskEncryptionConfiguration?: DiskEncryptionConfiguration;
  interactiveConfiguration?: InteractiveConfiguration;
  schedulerConfiguration?: SchedulerConfiguration;
  identityCenterConfiguration?: IdentityCenterConfigurationInput;
  jobLevelCostAllocationConfiguration?: JobLevelCostAllocationConfiguration;
}
export type ApplicationArn = string;
export interface CreateApplicationResponse {
  applicationId: string;
  name?: string;
  arn: string;
}
export interface DeleteApplicationRequest {
  applicationId: string;
}
export interface DeleteApplicationResponse {}
export interface GetApplicationRequest {
  applicationId: string;
}
export type ApplicationState = string;
export type String256 = string;
export type ImageDigest = string;
export interface ImageConfiguration {
  imageUri: string;
  resolvedImageDigest?: string;
  applicationLevelDigestResolution?: boolean;
}
export interface WorkerTypeSpecification {
  imageConfiguration?: ImageConfiguration;
}
export type WorkerTypeSpecificationMap = { [key: string]: WorkerTypeSpecification | undefined };
export type IdentityCenterApplicationArn = string;
export interface IdentityCenterConfiguration {
  identityCenterInstanceArn?: string;
  identityCenterApplicationArn?: string;
  userBackgroundSessionsEnabled?: boolean;
}
export interface Application {
  applicationId: string;
  name?: string;
  arn: string;
  releaseLabel: string;
  type: string;
  state: string;
  stateDetails?: string;
  initialCapacity?: { [key: string]: InitialCapacityConfig | undefined };
  maximumCapacity?: MaximumAllowedResources;
  createdAt: Date;
  updatedAt: Date;
  tags?: { [key: string]: string | undefined };
  autoStartConfiguration?: AutoStartConfig;
  autoStopConfiguration?: AutoStopConfig;
  networkConfiguration?: NetworkConfiguration;
  architecture?: string;
  imageConfiguration?: ImageConfiguration;
  workerTypeSpecifications?: { [key: string]: WorkerTypeSpecification | undefined };
  runtimeConfiguration?: Configuration[];
  monitoringConfiguration?: MonitoringConfiguration;
  diskEncryptionConfiguration?: DiskEncryptionConfiguration;
  interactiveConfiguration?: InteractiveConfiguration;
  schedulerConfiguration?: SchedulerConfiguration;
  identityCenterConfiguration?: IdentityCenterConfiguration;
  jobLevelCostAllocationConfiguration?: JobLevelCostAllocationConfiguration;
}
export interface GetApplicationResponse {
  application: Application;
}
export type AttemptNumber = number;
export interface GetDashboardForJobRunRequest {
  applicationId: string;
  jobRunId: string;
  attempt?: number;
  accessSystemProfileLogs?: boolean;
}
export type Url = string;
export interface GetDashboardForJobRunResponse {
  url?: string;
}
export interface GetJobRunRequest {
  applicationId: string;
  jobRunId: string;
  attempt?: number;
}
export type JobArn = string;
export type RequestIdentityUserArn = string;
export type IAMRoleArn = string;
export type PolicyDocument = string;
export type Arn = string;
export type PolicyArnList = string[];
export interface JobRunExecutionIamPolicy {
  policy?: string;
  policyArns?: string[];
}
export type JobRunState = string;
export interface ConfigurationOverrides {
  applicationConfiguration?: Configuration[];
  monitoringConfiguration?: MonitoringConfiguration;
  diskEncryptionConfiguration?: DiskEncryptionConfiguration;
}
export type EntryPointPath = string | redacted.Redacted<string>;
export type EntryPointArgument = string | redacted.Redacted<string>;
export type EntryPointArguments = (string | redacted.Redacted<string>)[];
export type SparkSubmitParameters = string | redacted.Redacted<string>;
export interface SparkSubmit {
  entryPoint: string | redacted.Redacted<string>;
  entryPointArguments?: (string | redacted.Redacted<string>)[];
  sparkSubmitParameters?: string | redacted.Redacted<string>;
}
export type Query = string | redacted.Redacted<string>;
export type InitScriptPath = string | redacted.Redacted<string>;
export type HiveCliParameters = string | redacted.Redacted<string>;
export interface Hive {
  query: string | redacted.Redacted<string>;
  initQueryFile?: string | redacted.Redacted<string>;
  parameters?: string | redacted.Redacted<string>;
}
export type JobDriver =
  | { sparkSubmit: SparkSubmit; hive?: never }
  | { sparkSubmit?: never; hive: Hive };
export interface TotalResourceUtilization {
  vCPUHour?: number;
  memoryGBHour?: number;
  storageGBHour?: number;
}
export type Duration = number;
export interface ResourceUtilization {
  vCPUHour?: number;
  memoryGBHour?: number;
  storageGBHour?: number;
}
export type JobRunMode = string;
export interface RetryPolicy {
  maxAttempts?: number;
  maxFailedAttemptsPerHour?: number;
}
export interface JobRun {
  applicationId: string;
  jobRunId: string;
  name?: string;
  arn: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  executionRole: string;
  executionIamPolicy?: JobRunExecutionIamPolicy;
  state: string;
  stateDetails: string;
  releaseLabel: string;
  configurationOverrides?: ConfigurationOverrides;
  jobDriver: JobDriver;
  tags?: { [key: string]: string | undefined };
  totalResourceUtilization?: TotalResourceUtilization;
  networkConfiguration?: NetworkConfiguration;
  totalExecutionDurationSeconds?: number;
  executionTimeoutMinutes?: number;
  billedResourceUtilization?: ResourceUtilization;
  mode?: string;
  retryPolicy?: RetryPolicy;
  attempt?: number;
  attemptCreatedAt?: Date;
  attemptUpdatedAt?: Date;
  startedAt?: Date;
  endedAt?: Date;
  queuedDurationMilliseconds?: number;
  imageConfiguration?: ImageConfiguration;
  workerTypeSpecifications?: { [key: string]: WorkerTypeSpecification | undefined };
}
export interface GetJobRunResponse {
  jobRun: JobRun;
}
export type ResourceId = string;
export type ResourceType = string;
export interface GetResourceDashboardRequest {
  applicationId: string;
  resourceId: string;
  resourceType: string;
}
export interface GetResourceDashboardResponse {
  url?: string;
}
export type SessionId = string;
export interface GetSessionRequest {
  applicationId: string;
  sessionId: string;
}
export type SessionArn = string;
export type SessionState = string;
export interface SessionConfigurationOverrides {
  runtimeConfiguration?: Configuration[];
}
export interface Session {
  applicationId: string;
  sessionId: string;
  arn: string;
  name?: string;
  state: string;
  stateDetails: string;
  releaseLabel: string;
  executionRoleArn: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  startedAt?: Date;
  endedAt?: Date;
  idleSince?: Date;
  configurationOverrides?: SessionConfigurationOverrides;
  networkConfiguration?: NetworkConfiguration;
  idleTimeoutMinutes?: number;
  tags?: { [key: string]: string | undefined };
  totalResourceUtilization?: TotalResourceUtilization;
  billedResourceUtilization?: ResourceUtilization;
  totalExecutionDurationSeconds?: number;
}
export interface GetSessionResponse {
  session: Session;
}
export interface GetSessionEndpointRequest {
  applicationId: string;
  sessionId: string;
}
export type EndpointUrl = string;
export type SessionAuthToken = string | redacted.Redacted<string>;
export interface GetSessionEndpointResponse {
  applicationId: string;
  sessionId: string;
  endpoint: string;
  authToken: string | redacted.Redacted<string>;
  authTokenExpiresAt: Date;
}
export type NextToken = string;
export type ApplicationStateSet = string[];
export interface ListApplicationsRequest {
  nextToken?: string;
  maxResults?: number;
  states?: string[];
}
export interface ApplicationSummary {
  id: string;
  name?: string;
  arn: string;
  releaseLabel: string;
  type: string;
  state: string;
  stateDetails?: string;
  createdAt: Date;
  updatedAt: Date;
  architecture?: string;
}
export type ApplicationList = ApplicationSummary[];
export interface ListApplicationsResponse {
  applications: ApplicationSummary[];
  nextToken?: string;
}
export interface ListJobRunAttemptsRequest {
  applicationId: string;
  jobRunId: string;
  nextToken?: string;
  maxResults?: number;
}
export type JobRunType = string;
export interface JobRunAttemptSummary {
  applicationId: string;
  id: string;
  name?: string;
  mode?: string;
  arn: string;
  createdBy: string;
  jobCreatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  executionRole: string;
  state: string;
  stateDetails: string;
  releaseLabel: string;
  type?: string;
  attempt?: number;
}
export type JobRunAttempts = JobRunAttemptSummary[];
export interface ListJobRunAttemptsResponse {
  jobRunAttempts: JobRunAttemptSummary[];
  nextToken?: string;
}
export type JobRunStateSet = string[];
export interface ListJobRunsRequest {
  applicationId: string;
  nextToken?: string;
  maxResults?: number;
  createdAtAfter?: Date;
  createdAtBefore?: Date;
  states?: string[];
  mode?: string;
}
export interface JobRunSummary {
  applicationId: string;
  id: string;
  name?: string;
  mode?: string;
  arn: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  executionRole: string;
  state: string;
  stateDetails: string;
  releaseLabel: string;
  type?: string;
  attempt?: number;
  attemptCreatedAt?: Date;
  attemptUpdatedAt?: Date;
}
export type JobRuns = JobRunSummary[];
export interface ListJobRunsResponse {
  jobRuns: JobRunSummary[];
  nextToken?: string;
}
export type SessionStateSet = string[];
export interface ListSessionsRequest {
  applicationId: string;
  nextToken?: string;
  maxResults?: number;
  states?: string[];
  createdAtAfter?: Date;
  createdAtBefore?: Date;
}
export interface SessionSummary {
  applicationId: string;
  sessionId: string;
  arn: string;
  name?: string;
  state: string;
  stateDetails: string;
  releaseLabel: string;
  executionRoleArn: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
export type Sessions = SessionSummary[];
export interface ListSessionsResponse {
  sessions: SessionSummary[];
  nextToken?: string;
}
export type ResourceArn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface StartApplicationRequest {
  applicationId: string;
}
export interface StartApplicationResponse {}
export interface StartJobRunRequest {
  applicationId: string;
  clientToken: string;
  executionRoleArn: string;
  executionIamPolicy?: JobRunExecutionIamPolicy;
  jobDriver?: JobDriver;
  configurationOverrides?: ConfigurationOverrides;
  tags?: { [key: string]: string | undefined };
  executionTimeoutMinutes?: number;
  name?: string;
  mode?: string;
  retryPolicy?: RetryPolicy;
}
export interface StartJobRunResponse {
  applicationId: string;
  jobRunId: string;
  arn: string;
}
export interface StartSessionRequest {
  applicationId: string;
  clientToken: string;
  executionRoleArn: string;
  configurationOverrides?: SessionConfigurationOverrides;
  tags?: { [key: string]: string | undefined };
  idleTimeoutMinutes?: number;
  name?: string;
}
export interface StartSessionResponse {
  applicationId: string;
  sessionId: string;
  arn: string;
}
export interface StopApplicationRequest {
  applicationId: string;
}
export interface StopApplicationResponse {}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export interface TerminateSessionRequest {
  applicationId: string;
  sessionId: string;
}
export interface TerminateSessionResponse {
  applicationId: string;
  sessionId: string;
}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateApplicationRequest {
  applicationId: string;
  clientToken: string;
  initialCapacity?: { [key: string]: InitialCapacityConfig | undefined };
  maximumCapacity?: MaximumAllowedResources;
  autoStartConfiguration?: AutoStartConfig;
  autoStopConfiguration?: AutoStopConfig;
  networkConfiguration?: NetworkConfiguration;
  architecture?: string;
  imageConfiguration?: ImageConfigurationInput;
  workerTypeSpecifications?: { [key: string]: WorkerTypeSpecificationInput | undefined };
  interactiveConfiguration?: InteractiveConfiguration;
  releaseLabel?: string;
  runtimeConfiguration?: Configuration[];
  monitoringConfiguration?: MonitoringConfiguration;
  diskEncryptionConfiguration?: DiskEncryptionConfiguration;
  schedulerConfiguration?: SchedulerConfiguration;
  identityCenterConfiguration?: IdentityCenterConfigurationInput;
  jobLevelCostAllocationConfiguration?: JobLevelCostAllocationConfiguration;
}
export interface UpdateApplicationResponse {
  application: Application;
}
export type CancelJobRunError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Cancels a job run.
 */
export const cancelJobRun: API.OperationMethod<
  CancelJobRunRequest,
  CancelJobRunResponse,
  CancelJobRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c20, 0) as any as S.Schema<CancelJobRunRequest>,
  output: __S(161, __c20, 1) as any as S.Schema<CancelJobRunResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelJobRun",
}));

export type CreateApplicationError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates an application.
 */
export const createApplication: API.OperationMethod<
  CreateApplicationRequest,
  CreateApplicationResponse,
  CreateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(168, __c21, 0) as any as S.Schema<CreateApplicationRequest>,
  output: __S(169, __c21, 1) as any as S.Schema<CreateApplicationResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
}));

export type DeleteApplicationError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an application. An application has to be in a stopped or created state in order to be deleted.
 */
export const deleteApplication: API.OperationMethod<
  DeleteApplicationRequest,
  DeleteApplicationResponse,
  DeleteApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(232, __c29, 0) as any as S.Schema<DeleteApplicationRequest>,
  output: __S(240, __c30, 0) as any as S.Schema<DeleteApplicationResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
}));

export type GetApplicationError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Displays detailed information about a specified application.
 */
export const getApplication: API.OperationMethod<
  GetApplicationRequest,
  GetApplicationResponse,
  GetApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(248, __c31, 0) as any as S.Schema<GetApplicationRequest>,
  output: __S(266, __c33, 2) as any as S.Schema<GetApplicationResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplication",
}));

export type GetDashboardForJobRunError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates and returns a URL that you can use to access the application UIs for a job run.
 *
 * For jobs in a running state, the application UI is a live user interface such as the Spark or Tez web UI. For completed jobs, the application UI is a persistent application user interface such as the Spark History Server or persistent Tez UI.
 *
 * The URL is valid for one hour after you generate it. To access the application UI after that hour elapses, you must invoke the API again to generate a new URL.
 */
export const getDashboardForJobRun: API.OperationMethod<
  GetDashboardForJobRunRequest,
  GetDashboardForJobRunResponse,
  GetDashboardForJobRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c34, 0) as any as S.Schema<GetDashboardForJobRunRequest>,
  output: __S(280, __c35, 0) as any as S.Schema<GetDashboardForJobRunResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDashboardForJobRun",
}));

export type GetJobRunError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Displays detailed information about a job run.
 */
export const getJobRun: API.OperationMethod<
  GetJobRunRequest,
  GetJobRunResponse,
  GetJobRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<GetJobRunRequest>,
  output: __S(2, __c0, 2) as any as S.Schema<GetJobRunResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJobRun",
}));

export type GetResourceDashboardError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a URL that you can use to access the application UIs for a specified resource, such as a session.
 *
 * For resources in a running state, the application UI is a live user interface such as the Spark web UI. For terminated resources, the application UI is a persistent application user interface such as the Spark History Server.
 *
 * The URL is valid for one hour after you generate it. To access the application UI after that hour elapses, you must invoke the API again to generate a new URL.
 */
export const getResourceDashboard: API.OperationMethod<
  GetResourceDashboardRequest,
  GetResourceDashboardResponse,
  GetResourceDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(24, __c3, 0) as any as S.Schema<GetResourceDashboardRequest>,
  output: __S(280, __c35, 0) as any as S.Schema<GetResourceDashboardResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceDashboard",
}));

export type GetSessionError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Displays detailed information about a session.
 */
export const getSession: API.OperationMethod<
  GetSessionRequest,
  GetSessionResponse,
  GetSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c4, 0) as any as S.Schema<GetSessionRequest>,
  output: __S(34, __c4, 2) as any as S.Schema<GetSessionResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSession",
}));

export type GetSessionEndpointError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns the session endpoint URL and a time-limited authentication token for the specified session. Use the endpoint and token to connect a client to the session. Call this operation again when the authentication token expires to obtain a new token.
 */
export const getSessionEndpoint: API.OperationMethod<
  GetSessionEndpointRequest,
  GetSessionEndpointResponse,
  GetSessionEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c6, 0) as any as S.Schema<GetSessionEndpointRequest>,
  output: __S(49, __c6, 1) as any as S.Schema<GetSessionEndpointResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSessionEndpoint",
}));

export type ListApplicationsError = InternalServerException | ValidationException | CommonErrors;
/**
 * Lists applications based on a set of parameters.
 */
export const listApplications: API.PaginatedOperationMethod<
  ListApplicationsRequest,
  ListApplicationsResponse,
  ListApplicationsError,
  Credentials | HttpClient.HttpClient,
  ApplicationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(56, __c7, 0) as any as S.Schema<ListApplicationsRequest>,
  output: __S(59, __c7, 3) as any as S.Schema<ListApplicationsResponse>,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplications",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "applications",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListJobRunAttemptsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all attempt of a job run.
 */
export const listJobRunAttempts: API.PaginatedOperationMethod<
  ListJobRunAttemptsRequest,
  ListJobRunAttemptsResponse,
  ListJobRunAttemptsError,
  Credentials | HttpClient.HttpClient,
  JobRunAttemptSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(64, __c8, 0) as any as S.Schema<ListJobRunAttemptsRequest>,
  output: __S(67, __c8, 3) as any as S.Schema<ListJobRunAttemptsResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobRunAttempts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobRunAttempts",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListJobRunsError = InternalServerException | ValidationException | CommonErrors;
/**
 * Lists job runs based on a set of parameters.
 */
export const listJobRuns: API.PaginatedOperationMethod<
  ListJobRunsRequest,
  ListJobRunsResponse,
  ListJobRunsError,
  Credentials | HttpClient.HttpClient,
  JobRunSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(72, __c9, 0) as any as S.Schema<ListJobRunsRequest>,
  output: __S(75, __c9, 3) as any as S.Schema<ListJobRunsResponse>,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobRuns",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobRuns",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSessionsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists sessions for the specified application. You can filter sessions by state and creation time.
 */
export const listSessions: API.PaginatedOperationMethod<
  ListSessionsRequest,
  ListSessionsResponse,
  ListSessionsError,
  Credentials | HttpClient.HttpClient,
  SessionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<ListSessionsRequest>,
  output: __S(83, __c10, 3) as any as S.Schema<ListSessionsResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSessions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "sessions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags assigned to the resources.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(88, __c11, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(89, __c11, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type StartApplicationError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Starts a specified application and initializes initial capacity if configured.
 */
export const startApplication: API.OperationMethod<
  StartApplicationRequest,
  StartApplicationResponse,
  StartApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<StartApplicationRequest>,
  output: __S(240, __c30, 0) as any as S.Schema<StartApplicationResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartApplication",
}));

export type StartJobRunError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Starts a job run.
 */
export const startJobRun: API.OperationMethod<
  StartJobRunRequest,
  StartJobRunResponse,
  StartJobRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<StartJobRunRequest>,
  output: __S(105, __c13, 1) as any as S.Schema<StartJobRunResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartJobRun",
}));

export type StartSessionError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates and starts a new session on the specified application. The application must be in the `STARTED` state or have `AutoStart` enabled, and have interactive sessions enabled. This operation is supported for EMR release 7.13.0 and later.
 */
export const startSession: API.OperationMethod<
  StartSessionRequest,
  StartSessionResponse,
  StartSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c14, 0) as any as S.Schema<StartSessionRequest>,
  output: __S(113, __c14, 1) as any as S.Schema<StartSessionResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSession",
}));

export type StopApplicationError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Stops a specified application and releases initial capacity if configured. All scheduled and running jobs must be completed or cancelled before stopping an application.
 */
export const stopApplication: API.OperationMethod<
  StopApplicationRequest,
  StopApplicationResponse,
  StopApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(120, __c15, 0) as any as S.Schema<StopApplicationRequest>,
  output: __S(240, __c30, 0) as any as S.Schema<StopApplicationResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopApplication",
}));

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Assigns tags to resources. A tag is a label that you assign to an Amazon Web Services resource. Each tag consists of a key and an optional value, both of which you define. Tags enable you to categorize your Amazon Web Services resources by attributes such as purpose, owner, or environment. When you have many resources of the same type, you can quickly identify a specific resource based on the tags you've assigned to it.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(240, __c30, 0) as any as S.Schema<TagResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type TerminateSessionError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Terminates the specified session. After you terminate a session, it enters the `TERMINATING` state and then the `TERMINATED` state. You can still access the Spark History Server for a terminated session through the `GetResourceDashboard` operation.
 */
export const terminateSession: API.OperationMethod<
  TerminateSessionRequest,
  TerminateSessionResponse,
  TerminateSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(136, __c17, 0) as any as S.Schema<TerminateSessionRequest>,
  output: __S(137, __c17, 1) as any as S.Schema<TerminateSessionResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateSession",
}));

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from resources.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(240, __c30, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateApplicationError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a specified application. An application has to be in a stopped or created state in order to be updated.
 */
export const updateApplication: API.OperationMethod<
  UpdateApplicationRequest,
  UpdateApplicationResponse,
  UpdateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<UpdateApplicationRequest>,
  output: __S(266, __c33, 2) as any as S.Schema<UpdateApplicationResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          jobRunId: S.String.pipe(T.HttpLabel("jobRunId")),
          attempt: S.optional(S.Number).pipe(T.HttpQuery("attempt")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{applicationId}/jobruns/{jobRunId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetJobRunRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String,
          jobRunId: S.String,
          name: S.optional(S.String),
          arn: S.String,
          createdBy: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          executionRole: S.String,
          executionIamPolicy: S.optional(__S(16, __c2, 0)),
          state: S.String,
          stateDetails: S.String,
          releaseLabel: S.String,
          configurationOverrides: S.optional(__S(17, __c2, 1)),
          jobDriver: __S(21, __c2, 5),
          tags: S.optional(__S(192, __c24, 0)),
          totalResourceUtilization: S.optional(__S(8, __c1, 0)),
          networkConfiguration: S.optional(__S(208, __c26, 0)),
          totalExecutionDurationSeconds: S.optional(S.Number),
          executionTimeoutMinutes: S.optional(S.Number),
          billedResourceUtilization: S.optional(__S(8, __c1, 0)),
          mode: S.optional(S.String),
          retryPolicy: S.optional(__S(22, __c2, 6)),
          attempt: S.optional(S.Number),
          attemptCreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          attemptUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          queuedDurationMilliseconds: S.optional(S.Number),
          imageConfiguration: S.optional(__S(256, __c32, 0)),
          workerTypeSpecifications: S.optional(__S(258, __c32, 2)),
        }),
      ).annotate({ identifier: "JobRun" });
    case 2:
      return S.suspend(() => S.Struct({ jobRun: __S(1, __c0, 1) })).annotate({
        identifier: "GetJobRunResponse",
      });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vCPUHour: S.optional(S.Number),
          memoryGBHour: S.optional(S.Number),
          storageGBHour: S.optional(S.Number),
        }),
      ).annotate({ identifier: "TotalResourceUtilization" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ policy: S.optional(S.String), policyArns: S.optional(__S(184, __c23, 0)) }),
      ).annotate({ identifier: "JobRunExecutionIamPolicy" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          applicationConfiguration: S.optional(__S(201, __c25, 1)),
          monitoringConfiguration: S.optional(__S(221, __c27, 5)),
          diskEncryptionConfiguration: S.optional(__S(222, __c27, 6)),
        }),
      ).annotate({ identifier: "ConfigurationOverrides" });
    case 2:
      return S.Array(SensitiveString);
    case 3:
      return S.suspend(() =>
        S.Struct({
          entryPoint: SensitiveString,
          entryPointArguments: S.optional(__S(18, __c2, 2)),
          sparkSubmitParameters: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "SparkSubmit" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          query: SensitiveString,
          initQueryFile: S.optional(SensitiveString),
          parameters: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "Hive" });
    case 5:
      return S.Union([
        /*@__PURE__*/ S.Struct({ sparkSubmit: __S(19, __c2, 3) }),
        /*@__PURE__*/ S.Struct({ hive: __S(20, __c2, 4) }),
      ]);
    case 6:
      return S.suspend(() =>
        S.Struct({
          maxAttempts: S.optional(S.Number),
          maxFailedAttemptsPerHour: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RetryPolicy" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          resourceId: S.String.pipe(T.HttpQuery("resourceId")),
          resourceType: S.String.pipe(T.HttpQuery("resourceType")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{applicationId}/dashboard" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetResourceDashboardRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          sessionId: S.String.pipe(T.HttpLabel("sessionId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{applicationId}/sessions/{sessionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSessionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String,
          sessionId: S.String,
          arn: S.String,
          name: S.optional(S.String),
          state: S.String,
          stateDetails: S.String,
          releaseLabel: S.String,
          executionRoleArn: S.String,
          createdBy: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          idleSince: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          configurationOverrides: S.optional(__S(40, __c5, 0)),
          networkConfiguration: S.optional(__S(208, __c26, 0)),
          idleTimeoutMinutes: S.optional(S.Number),
          tags: S.optional(__S(192, __c24, 0)),
          totalResourceUtilization: S.optional(__S(8, __c1, 0)),
          billedResourceUtilization: S.optional(__S(8, __c1, 0)),
          totalExecutionDurationSeconds: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Session" });
    case 2:
      return S.suspend(() => S.Struct({ session: __S(33, __c4, 1) })).annotate({
        identifier: "GetSessionResponse",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ runtimeConfiguration: S.optional(__S(201, __c25, 1)) }),
      ).annotate({ identifier: "SessionConfigurationOverrides" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          sessionId: S.String.pipe(T.HttpLabel("sessionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{applicationId}/sessions/{sessionId}/endpoint",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSessionEndpointRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String,
          sessionId: S.String,
          endpoint: S.String,
          authToken: SensitiveString,
          authTokenExpiresAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "GetSessionEndpointResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          states: S.optional(__S(184, __c23, 0)).pipe(T.HttpQuery("states")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/applications" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListApplicationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          name: S.optional(S.String),
          arn: S.String,
          releaseLabel: S.String,
          type: S.String,
          state: S.String,
          stateDetails: S.optional(S.String),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          architecture: S.optional(S.String),
        }),
      ).annotate({ identifier: "ApplicationSummary" });
    case 2:
      return S.Array(__S(57, __c7, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ applications: __S(58, __c7, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListApplicationsResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          jobRunId: S.String.pipe(T.HttpLabel("jobRunId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{applicationId}/jobruns/{jobRunId}/attempts",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListJobRunAttemptsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String,
          id: S.String,
          name: S.optional(S.String),
          mode: S.optional(S.String),
          arn: S.String,
          createdBy: S.String,
          jobCreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          executionRole: S.String,
          state: S.String,
          stateDetails: S.String,
          releaseLabel: S.String,
          type: S.optional(S.String),
          attempt: S.optional(S.Number),
        }),
      ).annotate({ identifier: "JobRunAttemptSummary" });
    case 2:
      return S.Array(__S(65, __c8, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ jobRunAttempts: __S(66, __c8, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListJobRunAttemptsResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          createdAtAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("createdAtAfter"),
          ),
          createdAtBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("createdAtBefore"),
          ),
          states: S.optional(__S(184, __c23, 0)).pipe(T.HttpQuery("states")),
          mode: S.optional(S.String).pipe(T.HttpQuery("mode")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{applicationId}/jobruns" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListJobRunsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String,
          id: S.String,
          name: S.optional(S.String),
          mode: S.optional(S.String),
          arn: S.String,
          createdBy: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          executionRole: S.String,
          state: S.String,
          stateDetails: S.String,
          releaseLabel: S.String,
          type: S.optional(S.String),
          attempt: S.optional(S.Number),
          attemptCreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          attemptUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "JobRunSummary" });
    case 2:
      return S.Array(__S(73, __c9, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ jobRuns: __S(74, __c9, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListJobRunsResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          states: S.optional(__S(184, __c23, 0)).pipe(T.HttpQuery("states")),
          createdAtAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("createdAtAfter"),
          ),
          createdAtBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("createdAtBefore"),
          ),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{applicationId}/sessions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSessionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String,
          sessionId: S.String,
          arn: S.String,
          name: S.optional(S.String),
          state: S.String,
          stateDetails: S.String,
          releaseLabel: S.String,
          executionRoleArn: S.String,
          createdBy: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "SessionSummary" });
    case 2:
      return S.Array(__S(81, __c10, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ sessions: __S(82, __c10, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSessionsResponse" });
  }
}
function __c11(j: number): any {
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
      return S.suspend(() => S.Struct({ tags: S.optional(__S(192, __c24, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ applicationId: S.String.pipe(T.HttpLabel("applicationId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/applications/{applicationId}/start" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartApplicationRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          clientToken: S.String.pipe(T.IdempotencyToken()),
          executionRoleArn: S.String,
          executionIamPolicy: S.optional(__S(16, __c2, 0)),
          jobDriver: S.optional(__S(21, __c2, 5)),
          configurationOverrides: S.optional(__S(17, __c2, 1)),
          tags: S.optional(__S(192, __c24, 0)),
          executionTimeoutMinutes: S.optional(S.Number),
          name: S.optional(S.String),
          mode: S.optional(S.String),
          retryPolicy: S.optional(__S(22, __c2, 6)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/applications/{applicationId}/jobruns" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartJobRunRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ applicationId: S.String, jobRunId: S.String, arn: S.String }),
      ).annotate({ identifier: "StartJobRunResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          clientToken: S.String.pipe(T.IdempotencyToken()),
          executionRoleArn: S.String,
          configurationOverrides: S.optional(__S(40, __c5, 0)),
          tags: S.optional(__S(192, __c24, 0)),
          idleTimeoutMinutes: S.optional(S.Number),
          name: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/applications/{applicationId}/sessions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartSessionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ applicationId: S.String, sessionId: S.String, arn: S.String }),
      ).annotate({ identifier: "StartSessionResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ applicationId: S.String.pipe(T.HttpLabel("applicationId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/applications/{applicationId}/stop" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopApplicationRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(192, __c24, 0),
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
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          sessionId: S.String.pipe(T.HttpLabel("sessionId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/applications/{applicationId}/sessions/{sessionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TerminateSessionRequest" });
    case 1:
      return S.suspend(() => S.Struct({ applicationId: S.String, sessionId: S.String })).annotate({
        identifier: "TerminateSessionResponse",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(184, __c23, 0).pipe(T.HttpQuery("tagKeys")),
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
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          clientToken: S.String.pipe(T.IdempotencyToken()),
          initialCapacity: S.optional(__S(226, __c28, 2)),
          maximumCapacity: S.optional(__S(227, __c28, 3)),
          autoStartConfiguration: S.optional(__S(228, __c28, 4)),
          autoStopConfiguration: S.optional(__S(229, __c28, 5)),
          networkConfiguration: S.optional(__S(208, __c26, 0)),
          architecture: S.optional(S.String),
          imageConfiguration: S.optional(__S(176, __c22, 0)),
          workerTypeSpecifications: S.optional(__S(178, __c22, 2)),
          interactiveConfiguration: S.optional(__S(230, __c28, 6)),
          releaseLabel: S.optional(S.String),
          runtimeConfiguration: S.optional(__S(201, __c25, 1)),
          monitoringConfiguration: S.optional(__S(221, __c27, 5)),
          diskEncryptionConfiguration: S.optional(__S(222, __c27, 6)),
          schedulerConfiguration: S.optional(__S(231, __c28, 7)),
          identityCenterConfiguration: S.optional(__S(179, __c22, 3)),
          jobLevelCostAllocationConfiguration: S.optional(__S(228, __c28, 4)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/applications/{applicationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateApplicationRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          jobRunId: S.String.pipe(T.HttpLabel("jobRunId")),
          shutdownGracePeriodInSeconds: S.optional(S.Number).pipe(
            T.HttpQuery("shutdownGracePeriodInSeconds"),
          ),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/applications/{applicationId}/jobruns/{jobRunId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelJobRunRequest" });
    case 1:
      return S.suspend(() => S.Struct({ applicationId: S.String, jobRunId: S.String })).annotate({
        identifier: "CancelJobRunResponse",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          releaseLabel: S.String,
          type: S.String,
          clientToken: S.String.pipe(T.IdempotencyToken()),
          initialCapacity: S.optional(__S(226, __c28, 2)),
          maximumCapacity: S.optional(__S(227, __c28, 3)),
          tags: S.optional(__S(192, __c24, 0)),
          autoStartConfiguration: S.optional(__S(228, __c28, 4)),
          autoStopConfiguration: S.optional(__S(229, __c28, 5)),
          networkConfiguration: S.optional(__S(208, __c26, 0)),
          architecture: S.optional(S.String),
          imageConfiguration: S.optional(__S(176, __c22, 0)),
          workerTypeSpecifications: S.optional(__S(178, __c22, 2)),
          runtimeConfiguration: S.optional(__S(201, __c25, 1)),
          monitoringConfiguration: S.optional(__S(221, __c27, 5)),
          diskEncryptionConfiguration: S.optional(__S(222, __c27, 6)),
          interactiveConfiguration: S.optional(__S(230, __c28, 6)),
          schedulerConfiguration: S.optional(__S(231, __c28, 7)),
          identityCenterConfiguration: S.optional(__S(179, __c22, 3)),
          jobLevelCostAllocationConfiguration: S.optional(__S(228, __c28, 4)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/applications" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateApplicationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ applicationId: S.String, name: S.optional(S.String), arn: S.String }),
      ).annotate({ identifier: "CreateApplicationResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          imageUri: S.optional(S.String),
          applicationLevelDigestResolution: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ImageConfigurationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ imageConfiguration: S.optional(__S(176, __c22, 0)) }),
      ).annotate({ identifier: "WorkerTypeSpecificationInput" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(177, __c22, 1).pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({
          identityCenterInstanceArn: S.optional(S.String),
          userBackgroundSessionsEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "IdentityCenterConfigurationInput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          classification: S.String,
          properties: S.optional(__S(192, __c24, 0)),
          configurations: S.optional(
            S.suspend(() => __S(201, __c25, 1)).annotate({ identifier: "ConfigurationList" }),
          ),
        }),
      ).annotate({ identifier: "Configuration" });
    case 1:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<Configuration> => __S(200, __c25, 0)).annotate({
          identifier: "Configuration",
        }),
      );
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          subnetIds: S.optional(__S(184, __c23, 0)),
          securityGroupIds: S.optional(__S(184, __c23, 0)),
        }),
      ).annotate({ identifier: "NetworkConfiguration" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ logUri: S.optional(S.String), encryptionKeyArn: S.optional(S.String) }),
      ).annotate({ identifier: "S3MonitoringConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({ enabled: S.optional(S.Boolean), encryptionKeyArn: S.optional(S.String) }),
      ).annotate({ identifier: "ManagedPersistenceMonitoringConfiguration" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(184, __c23, 0).pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({
          enabled: S.Boolean,
          logGroupName: S.optional(S.String),
          logStreamNamePrefix: S.optional(S.String),
          encryptionKeyArn: S.optional(S.String),
          logTypes: S.optional(__S(218, __c27, 2)),
        }),
      ).annotate({ identifier: "CloudWatchLoggingConfiguration" });
    case 4:
      return S.suspend(() => S.Struct({ remoteWriteUrl: S.optional(S.String) })).annotate({
        identifier: "PrometheusMonitoringConfiguration",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          s3MonitoringConfiguration: S.optional(__S(216, __c27, 0)),
          managedPersistenceMonitoringConfiguration: S.optional(__S(217, __c27, 1)),
          cloudWatchLoggingConfiguration: S.optional(__S(219, __c27, 3)),
          prometheusMonitoringConfiguration: S.optional(__S(220, __c27, 4)),
        }),
      ).annotate({ identifier: "MonitoringConfiguration" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          encryptionContext: S.optional(__S(192, __c24, 0)),
          encryptionKeyArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "DiskEncryptionConfiguration" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cpu: S.String,
          memory: S.String,
          disk: S.optional(S.String),
          diskType: S.optional(S.String),
        }),
      ).annotate({ identifier: "WorkerResourceConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({ workerCount: S.Number, workerConfiguration: S.optional(__S(224, __c28, 0)) }),
      ).annotate({ identifier: "InitialCapacityConfig" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(225, __c28, 1).pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({ cpu: S.String, memory: S.String, disk: S.optional(S.String) }),
      ).annotate({ identifier: "MaximumAllowedResources" });
    case 4:
      return S.suspend(() => S.Struct({ enabled: S.optional(S.Boolean) })).annotate({
        identifier: "AutoStartConfig",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({ enabled: S.optional(S.Boolean), idleTimeoutMinutes: S.optional(S.Number) }),
      ).annotate({ identifier: "AutoStopConfig" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          studioEnabled: S.optional(S.Boolean),
          livyEndpointEnabled: S.optional(S.Boolean),
          sessionEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "InteractiveConfiguration" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          queueTimeoutMinutes: S.optional(S.Number),
          maxConcurrentRuns: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SchedulerConfiguration" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ applicationId: S.String.pipe(T.HttpLabel("applicationId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/applications/{applicationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteApplicationRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteApplicationResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ applicationId: S.String.pipe(T.HttpLabel("applicationId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{applicationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetApplicationRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          imageUri: S.String,
          resolvedImageDigest: S.optional(S.String),
          applicationLevelDigestResolution: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ImageConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({ imageConfiguration: S.optional(__S(256, __c32, 0)) }),
      ).annotate({ identifier: "WorkerTypeSpecification" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(257, __c32, 1).pipe(S.optional));
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          identityCenterInstanceArn: S.optional(S.String),
          identityCenterApplicationArn: S.optional(S.String),
          userBackgroundSessionsEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "IdentityCenterConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String,
          name: S.optional(S.String),
          arn: S.String,
          releaseLabel: S.String,
          type: S.String,
          state: S.String,
          stateDetails: S.optional(S.String),
          initialCapacity: S.optional(__S(226, __c28, 2)),
          maximumCapacity: S.optional(__S(227, __c28, 3)),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          tags: S.optional(__S(192, __c24, 0)),
          autoStartConfiguration: S.optional(__S(228, __c28, 4)),
          autoStopConfiguration: S.optional(__S(229, __c28, 5)),
          networkConfiguration: S.optional(__S(208, __c26, 0)),
          architecture: S.optional(S.String),
          imageConfiguration: S.optional(__S(256, __c32, 0)),
          workerTypeSpecifications: S.optional(__S(258, __c32, 2)),
          runtimeConfiguration: S.optional(__S(201, __c25, 1)),
          monitoringConfiguration: S.optional(__S(221, __c27, 5)),
          diskEncryptionConfiguration: S.optional(__S(222, __c27, 6)),
          interactiveConfiguration: S.optional(__S(230, __c28, 6)),
          schedulerConfiguration: S.optional(__S(231, __c28, 7)),
          identityCenterConfiguration: S.optional(__S(264, __c33, 0)),
          jobLevelCostAllocationConfiguration: S.optional(__S(228, __c28, 4)),
        }),
      ).annotate({ identifier: "Application" });
    case 2:
      return S.suspend(() => S.Struct({ application: __S(265, __c33, 1) })).annotate({
        identifier: "GetApplicationResponse",
      });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String.pipe(T.HttpLabel("applicationId")),
          jobRunId: S.String.pipe(T.HttpLabel("jobRunId")),
          attempt: S.optional(S.Number).pipe(T.HttpQuery("attempt")),
          accessSystemProfileLogs: S.optional(S.Boolean).pipe(
            T.HttpQuery("accessSystemProfileLogs"),
          ),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/applications/{applicationId}/jobruns/{jobRunId}/dashboard",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDashboardForJobRunRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ url: S.optional(S.String) })).annotate({
        identifier: "GetDashboardForJobRunResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
