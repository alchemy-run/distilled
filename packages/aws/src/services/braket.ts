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
  sdkId: "Braket",
  target: "Braket",
  version: "2019-09-01",
  sigv4: "braket",
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
                `https://braket-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://braket-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://braket.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://braket.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class DeviceOfflineException
  extends /*@__PURE__*/ TE.TaggedError("DeviceOfflineException", [], {
    status: 424,
  })<{ readonly message?: string }> {}
export class DeviceRetiredException
  extends /*@__PURE__*/ TE.TaggedError(
    "DeviceRetiredException",
    ["BadRequestError"],
    { status: 410 },
  )<{ readonly message?: string }> {}
export class InternalServiceException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServiceException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message?: string;
    readonly reason?: string;
    readonly programSetValidationFailures?: ProgramSetValidationFailure[];
  }> {}
export type JobArn = string;
export interface CancelJobRequest {
  jobArn: string;
}
export type CancellationStatus = string;
export interface CancelJobResponse {
  jobArn: string;
  cancellationStatus: string;
}
export type QuantumTaskArn = string;
export type String64 = string;
export interface CancelQuantumTaskRequest {
  quantumTaskArn: string;
  clientToken: string;
}
export interface CancelQuantumTaskResponse {
  quantumTaskArn: string;
  cancellationStatus: string;
}
export type S3Path = string;
export type CompressionType = string;
export interface ScriptModeConfig {
  entryPoint: string;
  s3Uri: string;
  compressionType?: string;
}
export type Uri = string;
export interface ContainerImage {
  uri: string;
}
export interface AlgorithmSpecification {
  scriptModeConfig?: ScriptModeConfig;
  containerImage?: ContainerImage;
}
export type String256 = string;
export interface S3DataSource {
  s3Uri: string;
}
export interface DataSource {
  s3DataSource: S3DataSource;
}
export interface InputFileConfig {
  channelName: string;
  contentType?: string;
  dataSource: DataSource;
}
export type InputConfigList = InputFileConfig[];
export type String2048 = string;
export interface JobOutputDataConfig {
  kmsKeyId?: string;
  s3Path: string;
}
export type String4096 = string;
export interface JobCheckpointConfig {
  localPath?: string;
  s3Uri: string;
}
export type RoleArn = string;
export interface JobStoppingCondition {
  maxRuntimeInSeconds?: number;
}
export type InstanceType = string;
export interface InstanceConfig {
  instanceType: string;
  volumeSizeInGb: number;
  instanceCount?: number;
}
export type HyperParameters = { [key: string]: string | undefined };
export interface DeviceConfig {
  device: string;
}
export type TagsMap = { [key: string]: string | undefined };
export type BraketResourceArn = string;
export type AssociationType = string;
export interface Association {
  arn: string;
  type: string;
}
export type Associations = Association[];
export interface CreateJobRequest {
  clientToken: string;
  algorithmSpecification: AlgorithmSpecification;
  inputDataConfig?: InputFileConfig[];
  outputDataConfig: JobOutputDataConfig;
  checkpointConfig?: JobCheckpointConfig;
  jobName: string;
  roleArn: string;
  stoppingCondition?: JobStoppingCondition;
  instanceConfig: InstanceConfig;
  hyperParameters?: { [key: string]: string | undefined };
  deviceConfig: DeviceConfig;
  tags?: { [key: string]: string | undefined };
  associations?: Association[];
}
export interface CreateJobResponse {
  jobArn: string;
}
export type DeviceArn = string;
export type JsonValue = string;
export type JobToken = string;
export type ExperimentalCapabilitiesEnablementType = string;
export type ExperimentalCapabilities = { enabled: string };
export interface CreateQuantumTaskRequest {
  clientToken: string;
  deviceArn: string;
  deviceParameters?: string;
  shots: number;
  outputS3Bucket: string;
  outputS3KeyPrefix: string;
  action: string;
  tags?: { [key: string]: string | undefined };
  jobToken?: string;
  associations?: Association[];
  experimentalCapabilities?: ExperimentalCapabilities;
}
export interface CreateQuantumTaskResponse {
  quantumTaskArn: string;
}
export interface TimePeriod {
  startAt: Date;
  endAt: Date;
}
export interface CreateSpendingLimitRequest {
  clientToken: string;
  deviceArn: string;
  spendingLimit: string;
  timePeriod?: TimePeriod;
  tags?: { [key: string]: string | undefined };
}
export type SpendingLimitArn = string;
export interface CreateSpendingLimitResponse {
  spendingLimitArn: string;
}
export interface DeleteSpendingLimitRequest {
  spendingLimitArn: string;
}
export interface DeleteSpendingLimitResponse {}
export interface GetDeviceRequest {
  deviceArn: string;
}
export type DeviceType = string;
export type DeviceStatus = string;
export type QueueName = string;
export type QueuePriority = string;
export interface DeviceQueueInfo {
  queue: string;
  queueSize: string;
  queuePriority?: string;
}
export type DeviceQueueInfoList = DeviceQueueInfo[];
export interface GetDeviceResponse {
  deviceArn: string;
  deviceName: string;
  providerName: string;
  deviceType: string;
  deviceStatus: string;
  deviceCapabilities: string;
  deviceQueueInfo?: DeviceQueueInfo[];
}
export type HybridJobAdditionalAttributeName = string;
export type HybridJobAdditionalAttributeNamesList = string[];
export interface GetJobRequest {
  jobArn: string;
  additionalAttributeNames?: string[];
}
export type JobPrimaryStatus = string;
export type String1024 = string;
export type JobEventType = string;
export interface JobEventDetails {
  eventType?: string;
  timeOfEvent?: Date;
  message?: string;
}
export type JobEvents = JobEventDetails[];
export interface HybridJobQueueInfo {
  queue: string;
  position: string;
  message?: string;
}
export interface GetJobResponse {
  status: string;
  jobArn: string;
  roleArn: string;
  failureReason?: string;
  jobName: string;
  hyperParameters?: { [key: string]: string | undefined };
  inputDataConfig?: InputFileConfig[];
  outputDataConfig: JobOutputDataConfig;
  stoppingCondition?: JobStoppingCondition;
  checkpointConfig?: JobCheckpointConfig;
  algorithmSpecification: AlgorithmSpecification;
  instanceConfig: InstanceConfig;
  createdAt: Date;
  startedAt?: Date;
  endedAt?: Date;
  billableDuration?: number;
  deviceConfig?: DeviceConfig;
  events?: JobEventDetails[];
  tags?: { [key: string]: string | undefined };
  queueInfo?: HybridJobQueueInfo;
  associations?: Association[];
}
export type QuantumTaskAdditionalAttributeName = string;
export type QuantumTaskAdditionalAttributeNamesList = string[];
export interface GetQuantumTaskRequest {
  quantumTaskArn: string;
  additionalAttributeNames?: string[];
}
export type QuantumTaskStatus = string;
export interface QuantumTaskQueueInfo {
  queue: string;
  position: string;
  queuePriority?: string;
  message?: string;
}
export interface ActionMetadata {
  actionType: string;
  programCount?: number;
  executableCount?: number;
}
export interface GetQuantumTaskResponse {
  quantumTaskArn: string;
  status: string;
  failureReason?: string;
  deviceArn: string;
  deviceParameters: string;
  shots: number;
  outputS3Bucket: string;
  outputS3Directory: string;
  createdAt: Date;
  endedAt?: Date;
  tags?: { [key: string]: string | undefined };
  jobArn?: string;
  queueInfo?: QuantumTaskQueueInfo;
  associations?: Association[];
  numSuccessfulShots?: number;
  actionMetadata?: ActionMetadata;
  experimentalCapabilities?: ExperimentalCapabilities;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export type String256List = string[];
export interface SearchDevicesFilter {
  name: string;
  values: string[];
}
export type SearchDevicesFilterList = SearchDevicesFilter[];
export interface SearchDevicesRequest {
  nextToken?: string;
  maxResults?: number;
  filters: SearchDevicesFilter[];
}
export interface DeviceSummary {
  deviceArn: string;
  deviceName: string;
  providerName: string;
  deviceType: string;
  deviceStatus: string;
}
export type DeviceSummaryList = DeviceSummary[];
export interface SearchDevicesResponse {
  devices: DeviceSummary[];
  nextToken?: string;
}
export type SearchJobsFilterOperator = string;
export interface SearchJobsFilter {
  name: string;
  values: string[];
  operator: string;
}
export type SearchJobsFilterList = SearchJobsFilter[];
export interface SearchJobsRequest {
  nextToken?: string;
  maxResults?: number;
  filters: SearchJobsFilter[];
}
export interface JobSummary {
  status: string;
  jobArn: string;
  jobName: string;
  device: string;
  createdAt: Date;
  startedAt?: Date;
  endedAt?: Date;
  tags?: { [key: string]: string | undefined };
}
export type JobSummaryList = JobSummary[];
export interface SearchJobsResponse {
  jobs: JobSummary[];
  nextToken?: string;
}
export type SearchQuantumTasksFilterOperator = string;
export interface SearchQuantumTasksFilter {
  name: string;
  values: string[];
  operator: string;
}
export type SearchQuantumTasksFilterList = SearchQuantumTasksFilter[];
export interface SearchQuantumTasksRequest {
  nextToken?: string;
  maxResults?: number;
  filters: SearchQuantumTasksFilter[];
}
export interface QuantumTaskSummary {
  quantumTaskArn: string;
  status: string;
  deviceArn: string;
  shots: number;
  outputS3Bucket: string;
  outputS3Directory: string;
  createdAt: Date;
  endedAt?: Date;
  tags?: { [key: string]: string | undefined };
}
export type QuantumTaskSummaryList = QuantumTaskSummary[];
export interface SearchQuantumTasksResponse {
  quantumTasks: QuantumTaskSummary[];
  nextToken?: string;
}
export type SearchSpendingLimitsFilterOperator = string;
export interface SearchSpendingLimitsFilter {
  name: string;
  values: string[];
  operator: string;
}
export type SearchSpendingLimitsFilterList = SearchSpendingLimitsFilter[];
export interface SearchSpendingLimitsRequest {
  nextToken?: string;
  maxResults?: number;
  filters?: SearchSpendingLimitsFilter[];
}
export interface SpendingLimitSummary {
  spendingLimitArn: string;
  deviceArn: string;
  timePeriod: TimePeriod;
  spendingLimit: string;
  queuedSpend: string;
  totalSpend: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: { [key: string]: string | undefined };
}
export type SpendingLimitSummaryList = SpendingLimitSummary[];
export interface SearchSpendingLimitsResponse {
  spendingLimits: SpendingLimitSummary[];
  nextToken?: string;
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
export interface UpdateSpendingLimitRequest {
  spendingLimitArn: string;
  clientToken: string;
  spendingLimit?: string;
  timePeriod?: TimePeriod;
}
export interface UpdateSpendingLimitResponse {}
export type ValidationExceptionReason = string;
export type ProgramValidationFailuresList = string[];
export interface ProgramSetValidationFailure {
  programIndex: number;
  inputsIndex?: number;
  errors?: string[];
}
export type ProgramSetValidationFailuresList = ProgramSetValidationFailure[];
export type CancelJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels an Amazon Braket hybrid job.
 */
export const cancelJob: API.OperationMethod<
  CancelJobRequest,
  CancelJobResponse,
  CancelJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /job/{jobArn}/cancel",
    input: { jobArn: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelJob",
})) as any;

export type CancelQuantumTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels the specified task.
 */
export const cancelQuantumTask: API.OperationMethod<
  CancelQuantumTaskRequest,
  CancelQuantumTaskResponse,
  CancelQuantumTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /quantum-task/{quantumTaskArn}/cancel",
    input: { quantumTaskArn: 0, clientToken: D.m({ idempotency: true }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelQuantumTask",
})) as any;

export type CreateJobError =
  | AccessDeniedException
  | ConflictException
  | DeviceOfflineException
  | DeviceRetiredException
  | InternalServiceException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Braket hybrid job.
 */
export const createJob: API.OperationMethod<
  CreateJobRequest,
  CreateJobResponse,
  CreateJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /job",
    input: {
      clientToken: D.m({ idempotency: true }),
      algorithmSpecification: {
        scriptModeConfig: { entryPoint: 0, s3Uri: 0, compressionType: 0 },
        containerImage: { uri: 0 },
      },
      inputDataConfig: D.list({
        channelName: 0,
        contentType: 0,
        dataSource: { s3DataSource: { s3Uri: 0 } },
      }),
      outputDataConfig: { kmsKeyId: 0, s3Path: 0 },
      checkpointConfig: { localPath: 0, s3Uri: 0 },
      jobName: 0,
      roleArn: 0,
      stoppingCondition: { maxRuntimeInSeconds: 0 },
      instanceConfig: { instanceType: 0, volumeSizeInGb: 0, instanceCount: 0 },
      hyperParameters: 0,
      deviceConfig: { device: 0 },
      tags: 0,
      associations: D.list(i_Association),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DeviceOfflineException,
    DeviceRetiredException,
    InternalServiceException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateJob",
})) as any;

export type CreateQuantumTaskError =
  | AccessDeniedException
  | DeviceOfflineException
  | DeviceRetiredException
  | InternalServiceException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a quantum task.
 */
export const createQuantumTask: API.OperationMethod<
  CreateQuantumTaskRequest,
  CreateQuantumTaskResponse,
  CreateQuantumTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /quantum-task",
    input: {
      clientToken: D.m({ idempotency: true }),
      deviceArn: 0,
      deviceParameters: 0,
      shots: 0,
      outputS3Bucket: 0,
      outputS3KeyPrefix: 0,
      action: 0,
      tags: 0,
      jobToken: 0,
      associations: D.list(i_Association),
      experimentalCapabilities: { enabled: 0 },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DeviceOfflineException,
    DeviceRetiredException,
    InternalServiceException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateQuantumTask",
})) as any;

export type CreateSpendingLimitError =
  | AccessDeniedException
  | DeviceRetiredException
  | InternalServiceException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a spending limit for a specified quantum device. Spending limits help you control costs by setting maximum amounts that can be spent on quantum computing tasks within a specified time period. Simulators do not support spending limits.
 */
export const createSpendingLimit: API.OperationMethod<
  CreateSpendingLimitRequest,
  CreateSpendingLimitResponse,
  CreateSpendingLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /spending-limit",
    input: {
      clientToken: D.m({ idempotency: true }),
      deviceArn: 0,
      spendingLimit: 0,
      timePeriod: i_TimePeriod,
      tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DeviceRetiredException,
    InternalServiceException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSpendingLimit",
})) as any;

export type DeleteSpendingLimitError =
  | AccessDeniedException
  | InternalServiceException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing spending limit. This operation permanently removes the spending limit and cannot be undone. After deletion, the associated device becomes unrestricted for spending.
 */
export const deleteSpendingLimit: API.OperationMethod<
  DeleteSpendingLimitRequest,
  DeleteSpendingLimitResponse,
  DeleteSpendingLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /spending-limit/{spendingLimitArn}/delete",
    input: { spendingLimitArn: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSpendingLimit",
})) as any;

export type GetDeviceError =
  | AccessDeniedException
  | InternalServiceException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the devices available in Amazon Braket.
 *
 * For backwards compatibility with older versions of BraketSchemas, OpenQASM information is omitted from GetDevice API calls. To get this information the user-agent needs to present a recent version of the BraketSchemas (1.8.0 or later). The Braket SDK automatically reports this for you. If you do not see OpenQASM results in the GetDevice response when using a Braket SDK, you may need to set AWS_EXECUTION_ENV environment variable to configure user-agent. See the code examples provided below for how to do this for the AWS CLI, Boto3, and the Go, Java, and JavaScript/TypeScript SDKs.
 */
export const getDevice: API.OperationMethod<
  GetDeviceRequest,
  GetDeviceResponse,
  GetDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /device/{deviceArn}",
    input: { deviceArn: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDevice",
})) as any;

export type GetJobError =
  | AccessDeniedException
  | InternalServiceException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified Amazon Braket hybrid job.
 */
export const getJob: API.OperationMethod<
  GetJobRequest,
  GetJobResponse,
  GetJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /job/{jobArn}",
    input: {
      jobArn: 0,
      additionalAttributeNames: D.m({ query: "additionalAttributeNames" }),
    },
    output: {
      createdAt: D.ts,
      startedAt: D.ts,
      endedAt: D.ts,
      events: D.list({ timeOfEvent: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJob",
})) as any;

export type GetQuantumTaskError =
  | AccessDeniedException
  | InternalServiceException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified quantum task.
 */
export const getQuantumTask: API.OperationMethod<
  GetQuantumTaskRequest,
  GetQuantumTaskResponse,
  GetQuantumTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /quantum-task/{quantumTaskArn}",
    input: {
      quantumTaskArn: 0,
      additionalAttributeNames: D.m({ query: "additionalAttributeNames" }),
    },
    output: { createdAt: D.ts, endedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQuantumTask",
})) as any;

export type ListTagsForResourceError =
  | InternalServiceException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Shows the tags associated with this resource.
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
    InternalServiceException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type SearchDevicesError =
  | AccessDeniedException
  | InternalServiceException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches for devices using the specified filters.
 */
export const searchDevices: API.PaginatedOperationMethod<
  SearchDevicesRequest,
  SearchDevicesResponse,
  SearchDevicesError,
  Credentials | HttpClient.HttpClient,
  DeviceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /devices",
    input: {
      nextToken: 0,
      maxResults: 0,
      filters: D.list({ name: 0, values: 0 }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchDevices",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "devices",
    pageSize: "maxResults",
  } as const,
})) as any;

export type SearchJobsError =
  | AccessDeniedException
  | InternalServiceException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches for Amazon Braket hybrid jobs that match the specified filter values.
 */
export const searchJobs: API.PaginatedOperationMethod<
  SearchJobsRequest,
  SearchJobsResponse,
  SearchJobsError,
  Credentials | HttpClient.HttpClient,
  JobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /jobs",
    input: {
      nextToken: 0,
      maxResults: 0,
      filters: D.list({ name: 0, values: 0, operator: 0 }),
    },
    output: {
      jobs: D.list({ createdAt: D.ts, startedAt: D.ts, endedAt: D.ts }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type SearchQuantumTasksError =
  | AccessDeniedException
  | InternalServiceException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches for tasks that match the specified filter values.
 */
export const searchQuantumTasks: API.PaginatedOperationMethod<
  SearchQuantumTasksRequest,
  SearchQuantumTasksResponse,
  SearchQuantumTasksError,
  Credentials | HttpClient.HttpClient,
  QuantumTaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /quantum-tasks",
    input: {
      nextToken: 0,
      maxResults: 0,
      filters: D.list({ name: 0, values: 0, operator: 0 }),
    },
    output: { quantumTasks: D.list({ createdAt: D.ts, endedAt: D.ts }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchQuantumTasks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "quantumTasks",
    pageSize: "maxResults",
  } as const,
})) as any;

export type SearchSpendingLimitsError =
  | AccessDeniedException
  | InternalServiceException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches and lists spending limits based on specified filters. This operation supports pagination and allows filtering by various criteria to find specific spending limits. We recommend using pagination to ensure that the operation returns quickly and successfully.
 */
export const searchSpendingLimits: API.PaginatedOperationMethod<
  SearchSpendingLimitsRequest,
  SearchSpendingLimitsResponse,
  SearchSpendingLimitsError,
  Credentials | HttpClient.HttpClient,
  SpendingLimitSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /spending-limits",
    input: {
      nextToken: 0,
      maxResults: 0,
      filters: D.list({ name: 0, values: 0, operator: 0 }),
    },
    output: {
      spendingLimits: D.list({
        timePeriod: { startAt: D.ts, endAt: D.ts },
        createdAt: D.ts,
        updatedAt: D.ts,
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchSpendingLimits",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "spendingLimits",
    pageSize: "maxResults",
  } as const,
})) as any;

export type TagResourceError =
  | InternalServiceException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Add a tag to the specified resource.
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
    InternalServiceException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InternalServiceException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Remove tags from a resource.
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
    InternalServiceException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateSpendingLimitError =
  | AccessDeniedException
  | InternalServiceException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing spending limit. You can modify the spending amount or time period. Changes take effect immediately.
 */
export const updateSpendingLimit: API.OperationMethod<
  UpdateSpendingLimitRequest,
  UpdateSpendingLimitResponse,
  UpdateSpendingLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /spending-limit/{spendingLimitArn}/update",
    input: {
      spendingLimitArn: 0,
      clientToken: D.m({ idempotency: true }),
      spendingLimit: 0,
      timePeriod: i_TimePeriod,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSpendingLimit",
})) as any;

const i_Association: D.LazyStruct = () => ({ arn: 0, type: 0 });
const i_TimePeriod: D.LazyStruct = () => ({ startAt: 0, endAt: 0 });
