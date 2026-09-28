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
  sdkId: "EMR Serverless",
  target: "AwsToledoWebService",
  version: "2021-07-13",
  sigv4: "emr-serverless",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://emr-serverless.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://emr-serverless.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
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
export type InitialCapacityConfigMap = {
  [key: string]: InitialCapacityConfig | undefined;
};
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
  workerTypeSpecifications?: {
    [key: string]: WorkerTypeSpecificationInput | undefined;
  };
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
export type WorkerTypeSpecificationMap = {
  [key: string]: WorkerTypeSpecification | undefined;
};
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
  workerTypeSpecifications?: {
    [key: string]: WorkerTypeSpecification | undefined;
  };
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
  workerTypeSpecifications?: {
    [key: string]: WorkerTypeSpecification | undefined;
  };
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
  workerTypeSpecifications?: {
    [key: string]: WorkerTypeSpecificationInput | undefined;
  };
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
  descriptor: {
    service: svc,
    http: "DELETE /applications/{applicationId}/jobruns/{jobRunId}",
    input: {
      applicationId: 0,
      jobRunId: 0,
      shutdownGracePeriodInSeconds: D.m({
        query: "shutdownGracePeriodInSeconds",
      }),
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelJobRun",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /applications",
    input: {
      name: 0,
      releaseLabel: 0,
      type: 0,
      clientToken: D.m({ idempotency: true }),
      initialCapacity: D.map(i_InitialCapacityConfig),
      maximumCapacity: i_MaximumAllowedResources,
      tags: 0,
      autoStartConfiguration: i_AutoStartConfig,
      autoStopConfiguration: i_AutoStopConfig,
      networkConfiguration: i_NetworkConfiguration,
      architecture: 0,
      imageConfiguration: i_ImageConfigurationInput,
      workerTypeSpecifications: D.map(i_WorkerTypeSpecificationInput),
      runtimeConfiguration: D.list(i_Configuration),
      monitoringConfiguration: i_MonitoringConfiguration,
      diskEncryptionConfiguration: i_DiskEncryptionConfiguration,
      interactiveConfiguration: i_InteractiveConfiguration,
      schedulerConfiguration: i_SchedulerConfiguration,
      identityCenterConfiguration: i_IdentityCenterConfigurationInput,
      jobLevelCostAllocationConfiguration:
        i_JobLevelCostAllocationConfiguration,
    },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /applications/{applicationId}",
    input: { applicationId: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}",
    input: { applicationId: 0 },
    output: { application: o_Application },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplication",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/jobruns/{jobRunId}/dashboard",
    input: {
      applicationId: 0,
      jobRunId: 0,
      attempt: D.m({ query: "attempt" }),
      accessSystemProfileLogs: D.m({ query: "accessSystemProfileLogs" }),
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDashboardForJobRun",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/jobruns/{jobRunId}",
    input: {
      applicationId: 0,
      jobRunId: 0,
      attempt: D.m({ query: "attempt" }),
    },
    output: {
      jobRun: {
        createdAt: D.ts,
        updatedAt: D.ts,
        jobDriver: {
          sparkSubmit: {
            entryPoint: D.secret,
            entryPointArguments: D.list(D.secret),
            sparkSubmitParameters: D.secret,
          },
          hive: {
            query: D.secret,
            initQueryFile: D.secret,
            parameters: D.secret,
          },
        },
        attemptCreatedAt: D.ts,
        attemptUpdatedAt: D.ts,
        startedAt: D.ts,
        endedAt: D.ts,
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
  operationName: "GetJobRun",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/dashboard",
    input: {
      applicationId: 0,
      resourceId: D.m({ query: "resourceId" }),
      resourceType: D.m({ query: "resourceType" }),
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceDashboard",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/sessions/{sessionId}",
    input: { applicationId: 0, sessionId: 0 },
    output: {
      session: {
        createdAt: D.ts,
        updatedAt: D.ts,
        startedAt: D.ts,
        endedAt: D.ts,
        idleSince: D.ts,
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
  operationName: "GetSession",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/sessions/{sessionId}/endpoint",
    input: { applicationId: 0, sessionId: 0 },
    output: { authToken: D.secret, authTokenExpiresAt: D.ts },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSessionEndpoint",
})) as any;

export type ListApplicationsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "GET /applications",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      states: D.m({ query: "states" }),
    },
    output: { applications: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/jobruns/{jobRunId}/attempts",
    input: {
      applicationId: 0,
      jobRunId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      jobRunAttempts: D.list({
        jobCreatedAt: D.ts,
        createdAt: D.ts,
        updatedAt: D.ts,
      }),
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
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

export type ListJobRunsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/jobruns",
    input: {
      applicationId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      createdAtAfter: D.m({
        query: "createdAtAfter",
        shape: D.tsAs("epoch-seconds"),
      }),
      createdAtBefore: D.m({
        query: "createdAtBefore",
        shape: D.tsAs("epoch-seconds"),
      }),
      states: D.m({ query: "states" }),
      mode: D.m({ query: "mode" }),
    },
    output: {
      jobRuns: D.list({
        createdAt: D.ts,
        updatedAt: D.ts,
        attemptCreatedAt: D.ts,
        attemptUpdatedAt: D.ts,
      }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /applications/{applicationId}/sessions",
    input: {
      applicationId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      states: D.m({ query: "states" }),
      createdAtAfter: D.m({
        query: "createdAtAfter",
        shape: D.tsAs("epoch-seconds"),
      }),
      createdAtBefore: D.m({
        query: "createdAtBefore",
        shape: D.tsAs("epoch-seconds"),
      }),
    },
    output: { sessions: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
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
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /applications/{applicationId}/start",
    input: { applicationId: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartApplication",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /applications/{applicationId}/jobruns",
    input: {
      applicationId: 0,
      clientToken: D.m({ idempotency: true }),
      executionRoleArn: 0,
      executionIamPolicy: { policy: 0, policyArns: 0 },
      jobDriver: {
        sparkSubmit: {
          entryPoint: 0,
          entryPointArguments: 0,
          sparkSubmitParameters: 0,
        },
        hive: { query: 0, initQueryFile: 0, parameters: 0 },
      },
      configurationOverrides: {
        applicationConfiguration: D.list(i_Configuration),
        monitoringConfiguration: i_MonitoringConfiguration,
        diskEncryptionConfiguration: i_DiskEncryptionConfiguration,
      },
      tags: 0,
      executionTimeoutMinutes: 0,
      name: 0,
      mode: 0,
      retryPolicy: { maxAttempts: 0, maxFailedAttemptsPerHour: 0 },
    },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartJobRun",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /applications/{applicationId}/sessions",
    input: {
      applicationId: 0,
      clientToken: D.m({ idempotency: true }),
      executionRoleArn: 0,
      configurationOverrides: { runtimeConfiguration: D.list(i_Configuration) },
      tags: 0,
      idleTimeoutMinutes: 0,
      name: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /applications/{applicationId}/stop",
    input: { applicationId: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopApplication",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /applications/{applicationId}/sessions/{sessionId}",
    input: { applicationId: 0, sessionId: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateSession",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /applications/{applicationId}",
    input: {
      applicationId: 0,
      clientToken: D.m({ idempotency: true }),
      initialCapacity: D.map(i_InitialCapacityConfig),
      maximumCapacity: i_MaximumAllowedResources,
      autoStartConfiguration: i_AutoStartConfig,
      autoStopConfiguration: i_AutoStopConfig,
      networkConfiguration: i_NetworkConfiguration,
      architecture: 0,
      imageConfiguration: i_ImageConfigurationInput,
      workerTypeSpecifications: D.map(i_WorkerTypeSpecificationInput),
      interactiveConfiguration: i_InteractiveConfiguration,
      releaseLabel: 0,
      runtimeConfiguration: D.list(i_Configuration),
      monitoringConfiguration: i_MonitoringConfiguration,
      diskEncryptionConfiguration: i_DiskEncryptionConfiguration,
      schedulerConfiguration: i_SchedulerConfiguration,
      identityCenterConfiguration: i_IdentityCenterConfigurationInput,
      jobLevelCostAllocationConfiguration:
        i_JobLevelCostAllocationConfiguration,
    },
    output: { application: o_Application },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
})) as any;

const i_AutoStartConfig: D.LazyStruct = () => ({ enabled: 0 });
const i_AutoStopConfig: D.LazyStruct = () => ({
  enabled: 0,
  idleTimeoutMinutes: 0,
});
const i_Configuration: D.LazyStruct = () => ({
  classification: 0,
  properties: 0,
  configurations: D.list(i_Configuration),
});
const i_DiskEncryptionConfiguration: D.LazyStruct = () => ({
  encryptionContext: 0,
  encryptionKeyArn: 0,
});
const i_IdentityCenterConfigurationInput: D.LazyStruct = () => ({
  identityCenterInstanceArn: 0,
  userBackgroundSessionsEnabled: 0,
});
const i_ImageConfigurationInput: D.LazyStruct = () => ({
  imageUri: 0,
  applicationLevelDigestResolution: 0,
});
const i_InitialCapacityConfig: D.LazyStruct = () => ({
  workerCount: 0,
  workerConfiguration: { cpu: 0, memory: 0, disk: 0, diskType: 0 },
});
const i_InteractiveConfiguration: D.LazyStruct = () => ({
  studioEnabled: 0,
  livyEndpointEnabled: 0,
  sessionEnabled: 0,
});
const i_JobLevelCostAllocationConfiguration: D.LazyStruct = () => ({
  enabled: 0,
});
const i_MaximumAllowedResources: D.LazyStruct = () => ({
  cpu: 0,
  memory: 0,
  disk: 0,
});
const i_MonitoringConfiguration: D.LazyStruct = () => ({
  s3MonitoringConfiguration: { logUri: 0, encryptionKeyArn: 0 },
  managedPersistenceMonitoringConfiguration: {
    enabled: 0,
    encryptionKeyArn: 0,
  },
  cloudWatchLoggingConfiguration: {
    enabled: 0,
    logGroupName: 0,
    logStreamNamePrefix: 0,
    encryptionKeyArn: 0,
    logTypes: 0,
  },
  prometheusMonitoringConfiguration: { remoteWriteUrl: 0 },
});
const i_NetworkConfiguration: D.LazyStruct = () => ({
  subnetIds: 0,
  securityGroupIds: 0,
});
const i_SchedulerConfiguration: D.LazyStruct = () => ({
  queueTimeoutMinutes: 0,
  maxConcurrentRuns: 0,
});
const i_WorkerTypeSpecificationInput: D.LazyStruct = () => ({
  imageConfiguration: i_ImageConfigurationInput,
});
const o_Application: D.LazyStruct = () => ({
  createdAt: D.ts,
  updatedAt: D.ts,
});
