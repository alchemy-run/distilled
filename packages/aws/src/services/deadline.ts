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
  sdkId: "deadline",
  target: "Deadline",
  version: "2023-10-12",
  sigv4: "deadline",
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
                `https://deadline-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://deadline-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://deadline.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://deadline.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{
    readonly message: string;
    readonly context?: { [key: string]: string | undefined };
  }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly message: string;
    readonly reason: ConflictExceptionReason;
    readonly resourceId: string;
    readonly resourceType: string;
    readonly context?: { [key: string]: string | undefined };
  }> {}
export class InternalServerErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerErrorException",
    ["ServerError", "RetryableError"],
    { status: 500, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly retryAfterSeconds?: number }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError("InternalServerException", [
    "ServerError",
    "RetryableError",
  ])<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
    readonly context?: { [key: string]: string | undefined };
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message: string;
    readonly reason: ServiceQuotaExceededExceptionReason;
    readonly resourceType: string;
    readonly serviceCode: string;
    readonly quotaCode: string;
    readonly resourceId?: string;
    readonly context?: { [key: string]: string | undefined };
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{
    readonly message: string;
    readonly serviceCode?: string;
    readonly quotaCode?: string;
    readonly retryAfterSeconds?: number;
    readonly context?: { [key: string]: string | undefined };
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly reason: ValidationExceptionReason;
    readonly fieldList?: ValidationExceptionField[];
    readonly context?: { [key: string]: string | undefined };
  }> {}
export type FarmId = string;
export type DeadlinePrincipalType = "USER" | "GROUP" | (string & {});
export type IdentityStoreId = string;
export type MembershipLevel =
  | "VIEWER"
  | "CONTRIBUTOR"
  | "OWNER"
  | "MANAGER"
  | (string & {});
export type IdentityCenterPrincipalId = string;
export type Region = string;
export interface AssociateMemberToFarmRequest {
  farmId: string;
  principalType: DeadlinePrincipalType;
  identityStoreId: string;
  membershipLevel: MembershipLevel;
  principalId: string;
  identityCenterRegion?: string;
}
export interface AssociateMemberToFarmResponse {}
export type FleetId = string;
export interface AssociateMemberToFleetRequest {
  farmId: string;
  fleetId: string;
  principalType: DeadlinePrincipalType;
  identityStoreId: string;
  membershipLevel: MembershipLevel;
  principalId: string;
  identityCenterRegion?: string;
}
export interface AssociateMemberToFleetResponse {}
export type QueueId = string;
export type JobId = string;
export interface AssociateMemberToJobRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  principalType: DeadlinePrincipalType;
  identityStoreId: string;
  membershipLevel: MembershipLevel;
  principalId: string;
  identityCenterRegion?: string;
}
export interface AssociateMemberToJobResponse {}
export interface AssociateMemberToQueueRequest {
  farmId: string;
  queueId: string;
  principalType: DeadlinePrincipalType;
  identityStoreId: string;
  membershipLevel: MembershipLevel;
  principalId: string;
  identityCenterRegion?: string;
}
export interface AssociateMemberToQueueResponse {}
export interface AssumeFleetRoleForReadRequest {
  farmId: string;
  fleetId: string;
}
export type AccessKeyId = string | redacted.Redacted<string>;
export type SecretAccessKey = string | redacted.Redacted<string>;
export type SessionToken = string | redacted.Redacted<string>;
export interface AwsCredentials {
  accessKeyId: string | redacted.Redacted<string>;
  secretAccessKey: string | redacted.Redacted<string>;
  sessionToken: string | redacted.Redacted<string>;
  expiration: Date;
}
export interface AssumeFleetRoleForReadResponse {
  credentials: AwsCredentials;
}
export type WorkerId = string;
export interface AssumeFleetRoleForWorkerRequest {
  farmId: string;
  fleetId: string;
  workerId: string;
}
export interface AssumeFleetRoleForWorkerResponse {
  credentials: AwsCredentials;
}
export interface AssumeQueueRoleForReadRequest {
  farmId: string;
  queueId: string;
}
export interface AssumeQueueRoleForReadResponse {
  credentials: AwsCredentials;
}
export interface AssumeQueueRoleForUserRequest {
  farmId: string;
  queueId: string;
}
export interface AssumeQueueRoleForUserResponse {
  credentials: AwsCredentials;
}
export interface AssumeQueueRoleForWorkerRequest {
  farmId: string;
  fleetId: string;
  workerId: string;
  queueId: string;
}
export interface AssumeQueueRoleForWorkerResponse {
  credentials?: AwsCredentials;
}
export interface BatchGetJobIdentifier {
  farmId: string;
  queueId: string;
  jobId: string;
}
export type BatchGetJobIdentifiers = BatchGetJobIdentifier[];
export interface BatchGetJobRequest {
  identifiers: BatchGetJobIdentifier[];
}
export type JobName = string;
export type JobLifecycleStatus =
  | "CREATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "CREATE_COMPLETE"
  | "UPLOAD_IN_PROGRESS"
  | "UPLOAD_FAILED"
  | "UPDATE_IN_PROGRESS"
  | "UPDATE_FAILED"
  | "UPDATE_SUCCEEDED"
  | "ARCHIVED"
  | (string & {});
export type JobPriority = number;
export type CreatedAt = Date;
export type CreatedBy = string;
export type UpdatedAt = Date;
export type UpdatedBy = string;
export type StartedAt = Date;
export type EndedAt = Date;
export type TaskRunStatus =
  | "PENDING"
  | "READY"
  | "ASSIGNED"
  | "STARTING"
  | "SCHEDULED"
  | "INTERRUPTING"
  | "RUNNING"
  | "SUSPENDED"
  | "CANCELED"
  | "FAILED"
  | "SUCCEEDED"
  | "NOT_COMPATIBLE"
  | (string & {});
export type JobTargetTaskRunStatus =
  | "READY"
  | "FAILED"
  | "SUCCEEDED"
  | "CANCELED"
  | "SUSPENDED"
  | "PENDING"
  | (string & {});
export type TaskRunStatusCounts = { [key in TaskRunStatus]?: number };
export type TaskFailureRetryCount = number;
export type StorageProfileId = string;
export type MaxFailedTasksCount = number;
export type MaxRetriesPerTask = number;
export type IntString = string;
export type FloatString = string;
export type ParameterString = string;
export type PathString = string;
export type JobParameter =
  | { int: string; float?: never; string?: never; path?: never }
  | { int?: never; float: string; string?: never; path?: never }
  | { int?: never; float?: never; string: string; path?: never }
  | { int?: never; float?: never; string?: never; path: string };
export type JobParameters = { [key: string]: JobParameter | undefined };
export type FileSystemLocationName = string;
export type PathFormat = "windows" | "posix" | (string & {});
export type OutputRelativeDirectoriesList = string[];
export interface ManifestProperties {
  fileSystemLocationName?: string;
  rootPath: string;
  rootPathFormat: PathFormat;
  outputRelativeDirectories?: string[];
  inputManifestPath?: string;
  inputManifestHash?: string;
}
export type ManifestPropertiesList = ManifestProperties[];
export type JobAttachmentsFileSystem = "COPIED" | "VIRTUAL" | (string & {});
export interface Attachments {
  manifests: ManifestProperties[];
  fileSystem?: JobAttachmentsFileSystem;
}
export type JobDescription = string | redacted.Redacted<string>;
export type MaxWorkerCount = number;
export interface BatchGetJobItem {
  farmId: string;
  queueId: string;
  jobId: string;
  name: string;
  lifecycleStatus: JobLifecycleStatus;
  lifecycleStatusMessage: string;
  priority: number;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  startedAt?: Date;
  endedAt?: Date;
  taskRunStatus?: TaskRunStatus;
  targetTaskRunStatus?: JobTargetTaskRunStatus;
  taskRunStatusCounts?: { [key: string]: number | undefined };
  taskFailureRetryCount?: number;
  storageProfileId?: string;
  maxFailedTasksCount?: number;
  maxRetriesPerTask?: number;
  parameters?: { [key: string]: JobParameter | undefined };
  attachments?: Attachments;
  description?: string | redacted.Redacted<string>;
  maxWorkerCount?: number;
  sourceJobId?: string;
}
export type BatchGetJobItems = BatchGetJobItem[];
export type BatchGetJobErrorCode =
  | "InternalServerErrorException"
  | "ResourceNotFoundException"
  | "ValidationException"
  | "AccessDeniedException"
  | "ThrottlingException"
  | (string & {});
export interface BatchGetJobError_ {
  farmId: string;
  queueId: string;
  jobId: string;
  code: BatchGetJobErrorCode;
  message: string;
}
export type BatchGetJobErrors = BatchGetJobError_[];
export interface BatchGetJobResponse {
  jobs: BatchGetJobItem[];
  errors: BatchGetJobError_[];
}
export interface JobDetailsIdentifiers {
  jobId: string;
}
export interface JobAttachmentDetailsIdentifiers {
  jobId: string;
}
export type StepId = string;
export interface StepDetailsIdentifiers {
  jobId: string;
  stepId: string;
}
export type EnvironmentId = string;
export interface EnvironmentDetailsIdentifiers {
  jobId: string;
  environmentId: string;
}
export type JobEntityIdentifiersUnion =
  | {
      jobDetails: JobDetailsIdentifiers;
      jobAttachmentDetails?: never;
      stepDetails?: never;
      environmentDetails?: never;
    }
  | {
      jobDetails?: never;
      jobAttachmentDetails: JobAttachmentDetailsIdentifiers;
      stepDetails?: never;
      environmentDetails?: never;
    }
  | {
      jobDetails?: never;
      jobAttachmentDetails?: never;
      stepDetails: StepDetailsIdentifiers;
      environmentDetails?: never;
    }
  | {
      jobDetails?: never;
      jobAttachmentDetails?: never;
      stepDetails?: never;
      environmentDetails: EnvironmentDetailsIdentifiers;
    };
export type JobEntityIdentifiers = JobEntityIdentifiersUnion[];
export interface BatchGetJobEntityRequest {
  farmId: string;
  fleetId: string;
  workerId: string;
  identifiers: JobEntityIdentifiersUnion[];
}
export type S3BucketName = string;
export type S3Prefix = string;
export interface JobDetailsJobAttachmentSettings {
  s3BucketName: string;
  rootPrefix: string;
}
export interface PosixUser {
  user: string;
  group: string;
}
export interface WindowsUser {
  user: string;
  passwordArn: string;
}
export type RunAs =
  | "QUEUE_CONFIGURED_USER"
  | "WORKER_AGENT_USER"
  | (string & {});
export interface JobRunAsUser {
  posix?: PosixUser;
  windows?: WindowsUser;
  runAs: RunAs;
}
export type IamRoleArn = string;
export interface PathMappingRule {
  sourcePathFormat: PathFormat;
  sourcePath: string;
  destinationPath: string;
}
export type PathMappingRules = PathMappingRule[];
export interface JobDetailsEntity {
  jobId: string;
  jobAttachmentSettings?: JobDetailsJobAttachmentSettings;
  jobRunAsUser?: JobRunAsUser;
  logGroupName: string;
  queueRoleArn?: string;
  parameters?: { [key: string]: JobParameter | undefined };
  schemaVersion: string;
  pathMappingRules?: PathMappingRule[];
}
export interface JobAttachmentDetailsEntity {
  jobId: string;
  attachments: Attachments;
}
export type Document = unknown;
export type DependenciesList = string[];
export interface StepDetailsEntity {
  jobId: string;
  stepId: string;
  schemaVersion: string;
  template: any;
  dependencies: string[];
}
export interface EnvironmentDetailsEntity {
  jobId: string;
  environmentId: string;
  schemaVersion: string;
  template: any;
}
export type JobEntity =
  | {
      jobDetails: JobDetailsEntity;
      jobAttachmentDetails?: never;
      stepDetails?: never;
      environmentDetails?: never;
    }
  | {
      jobDetails?: never;
      jobAttachmentDetails: JobAttachmentDetailsEntity;
      stepDetails?: never;
      environmentDetails?: never;
    }
  | {
      jobDetails?: never;
      jobAttachmentDetails?: never;
      stepDetails: StepDetailsEntity;
      environmentDetails?: never;
    }
  | {
      jobDetails?: never;
      jobAttachmentDetails?: never;
      stepDetails?: never;
      environmentDetails: EnvironmentDetailsEntity;
    };
export type BatchGetJobEntityList = JobEntity[];
export type JobEntityErrorCode =
  | "AccessDeniedException"
  | "InternalServerException"
  | "ValidationException"
  | "ResourceNotFoundException"
  | "MaxPayloadSizeExceeded"
  | "ConflictException"
  | (string & {});
export interface JobDetailsError {
  jobId: string;
  code: JobEntityErrorCode;
  message: string;
}
export interface JobAttachmentDetailsError {
  jobId: string;
  code: JobEntityErrorCode;
  message: string;
}
export interface StepDetailsError {
  jobId: string;
  stepId: string;
  code: JobEntityErrorCode;
  message: string;
}
export interface EnvironmentDetailsError {
  jobId: string;
  environmentId: string;
  code: JobEntityErrorCode;
  message: string;
}
export type GetJobEntityError =
  | {
      jobDetails: JobDetailsError;
      jobAttachmentDetails?: never;
      stepDetails?: never;
      environmentDetails?: never;
    }
  | {
      jobDetails?: never;
      jobAttachmentDetails: JobAttachmentDetailsError;
      stepDetails?: never;
      environmentDetails?: never;
    }
  | {
      jobDetails?: never;
      jobAttachmentDetails?: never;
      stepDetails: StepDetailsError;
      environmentDetails?: never;
    }
  | {
      jobDetails?: never;
      jobAttachmentDetails?: never;
      stepDetails?: never;
      environmentDetails: EnvironmentDetailsError;
    };
export type BatchGetJobEntityErrors = GetJobEntityError[];
export interface BatchGetJobEntityResponse {
  entities: JobEntity[];
  errors: GetJobEntityError[];
}
export type SessionId = string;
export interface BatchGetSessionIdentifier {
  farmId: string;
  queueId: string;
  jobId: string;
  sessionId: string;
}
export type BatchGetSessionIdentifiers = BatchGetSessionIdentifier[];
export interface BatchGetSessionRequest {
  identifiers: BatchGetSessionIdentifier[];
}
export type SessionLifecycleStatus =
  | "STARTED"
  | "UPDATE_IN_PROGRESS"
  | "UPDATE_SUCCEEDED"
  | "UPDATE_FAILED"
  | "ENDED"
  | (string & {});
export type SessionLifecycleTargetStatus = "ENDED" | (string & {});
export type LogDriver = string;
export type LogOptions = { [key: string]: string | undefined };
export type LogParameters = { [key: string]: string | undefined };
export type LogError = string;
export interface LogConfiguration {
  logDriver: string;
  options?: { [key: string]: string | undefined };
  parameters?: { [key: string]: string | undefined };
  error?: string;
}
export type IpV4Address = string;
export type IpV4Addresses = string[];
export type IpV6Address = string;
export type IpV6Addresses = string[];
export interface IpAddresses {
  ipV4Addresses?: string[];
  ipV6Addresses?: string[];
}
export type HostName = string;
export type InstanceType = string;
export interface HostPropertiesResponse {
  ipAddresses?: IpAddresses;
  hostName?: string;
  ec2InstanceArn?: string;
  ec2InstanceType?: string;
}
export interface BatchGetSessionItem {
  farmId: string;
  queueId: string;
  jobId: string;
  sessionId: string;
  fleetId: string;
  workerId: string;
  startedAt: Date;
  lifecycleStatus: SessionLifecycleStatus;
  endedAt?: Date;
  targetLifecycleStatus?: SessionLifecycleTargetStatus;
  updatedAt?: Date;
  updatedBy?: string;
  log: LogConfiguration;
  hostProperties?: HostPropertiesResponse;
  workerLog?: LogConfiguration;
}
export type BatchGetSessionItems = BatchGetSessionItem[];
export type BatchGetSessionErrorCode =
  | "InternalServerErrorException"
  | "ResourceNotFoundException"
  | "ValidationException"
  | (string & {});
export interface BatchGetSessionError_ {
  farmId: string;
  queueId: string;
  jobId: string;
  sessionId: string;
  code: BatchGetSessionErrorCode;
  message: string;
}
export type BatchGetSessionErrors = BatchGetSessionError_[];
export interface BatchGetSessionResponse {
  sessions: BatchGetSessionItem[];
  errors: BatchGetSessionError_[];
}
export type SessionActionId = string;
export interface BatchGetSessionActionIdentifier {
  farmId: string;
  queueId: string;
  jobId: string;
  sessionActionId: string;
}
export type BatchGetSessionActionIdentifiers =
  BatchGetSessionActionIdentifier[];
export interface BatchGetSessionActionRequest {
  identifiers: BatchGetSessionActionIdentifier[];
}
export type SessionActionStatus =
  | "ASSIGNED"
  | "RUNNING"
  | "CANCELING"
  | "SUCCEEDED"
  | "FAILED"
  | "INTERRUPTED"
  | "CANCELED"
  | "NEVER_ATTEMPTED"
  | "SCHEDULED"
  | "RECLAIMING"
  | "RECLAIMED"
  | (string & {});
export type SessionActionProgressPercent = number;
export interface TaskRunManifestPropertiesResponse {
  outputManifestPath?: string;
  outputManifestHash?: string;
}
export type TaskRunManifestPropertiesListResponse =
  TaskRunManifestPropertiesResponse[];
export type ProcessExitCode = number;
export type SessionActionProgressMessage = string | redacted.Redacted<string>;
export type LimitId = string;
export type MinOneMaxInteger = number;
export interface AcquiredLimit {
  limitId: string;
  count: number;
}
export type AcquiredLimits = AcquiredLimit[];
export interface EnvironmentEnterSessionActionDefinition {
  environmentId: string;
}
export interface EnvironmentExitSessionActionDefinition {
  environmentId: string;
}
export type TaskId = string;
export type TaskParameterValue =
  | {
      int: string;
      float?: never;
      string?: never;
      path?: never;
      chunkInt?: never;
    }
  | {
      int?: never;
      float: string;
      string?: never;
      path?: never;
      chunkInt?: never;
    }
  | {
      int?: never;
      float?: never;
      string: string;
      path?: never;
      chunkInt?: never;
    }
  | {
      int?: never;
      float?: never;
      string?: never;
      path: string;
      chunkInt?: never;
    }
  | {
      int?: never;
      float?: never;
      string?: never;
      path?: never;
      chunkInt: string;
    };
export type TaskParameters = { [key: string]: TaskParameterValue | undefined };
export interface TaskRunSessionActionDefinition {
  taskId?: string;
  stepId: string;
  parameters: { [key: string]: TaskParameterValue | undefined };
}
export interface SyncInputJobAttachmentsSessionActionDefinition {
  stepId?: string;
}
export type SessionActionDefinition =
  | {
      envEnter: EnvironmentEnterSessionActionDefinition;
      envExit?: never;
      taskRun?: never;
      syncInputJobAttachments?: never;
    }
  | {
      envEnter?: never;
      envExit: EnvironmentExitSessionActionDefinition;
      taskRun?: never;
      syncInputJobAttachments?: never;
    }
  | {
      envEnter?: never;
      envExit?: never;
      taskRun: TaskRunSessionActionDefinition;
      syncInputJobAttachments?: never;
    }
  | {
      envEnter?: never;
      envExit?: never;
      taskRun?: never;
      syncInputJobAttachments: SyncInputJobAttachmentsSessionActionDefinition;
    };
export interface BatchGetSessionActionItem {
  farmId: string;
  queueId: string;
  jobId: string;
  sessionActionId: string;
  status: SessionActionStatus;
  startedAt?: Date;
  endedAt?: Date;
  workerUpdatedAt?: Date;
  progressPercent?: number;
  manifests?: TaskRunManifestPropertiesResponse[];
  sessionId: string;
  processExitCode?: number;
  progressMessage?: string | redacted.Redacted<string>;
  acquiredLimits?: AcquiredLimit[];
  definition: SessionActionDefinition;
}
export type BatchGetSessionActionItems = BatchGetSessionActionItem[];
export type BatchGetSessionActionErrorCode =
  | "InternalServerErrorException"
  | "ResourceNotFoundException"
  | "ValidationException"
  | (string & {});
export interface BatchGetSessionActionError_ {
  farmId: string;
  queueId: string;
  jobId: string;
  sessionActionId: string;
  code: BatchGetSessionActionErrorCode;
  message: string;
}
export type BatchGetSessionActionErrors = BatchGetSessionActionError_[];
export interface BatchGetSessionActionResponse {
  sessionActions: BatchGetSessionActionItem[];
  errors: BatchGetSessionActionError_[];
}
export interface BatchGetStepIdentifier {
  farmId: string;
  queueId: string;
  jobId: string;
  stepId: string;
}
export type BatchGetStepIdentifiers = BatchGetStepIdentifier[];
export interface BatchGetStepRequest {
  identifiers: BatchGetStepIdentifier[];
}
export type StepName = string;
export type StepLifecycleStatus =
  | "CREATE_COMPLETE"
  | "UPDATE_IN_PROGRESS"
  | "UPDATE_FAILED"
  | "UPDATE_SUCCEEDED"
  | (string & {});
export type StepTargetTaskRunStatus =
  | "READY"
  | "FAILED"
  | "SUCCEEDED"
  | "CANCELED"
  | "SUSPENDED"
  | "PENDING"
  | (string & {});
export interface DependencyCounts {
  dependenciesResolved: number;
  dependenciesUnresolved: number;
  consumersResolved: number;
  consumersUnresolved: number;
}
export type AttributeCapabilityName = string;
export type AttributeCapabilityValue = string;
export type ListAttributeCapabilityValue = string[];
export interface StepAttributeCapability {
  name: string;
  anyOf?: string[];
  allOf?: string[];
}
export type StepAttributeCapabilities = StepAttributeCapability[];
export type AmountCapabilityName = string;
export interface StepAmountCapability {
  name: string;
  min?: number;
  max?: number;
  value?: number;
}
export type StepAmountCapabilities = StepAmountCapability[];
export interface StepRequiredCapabilities {
  attributes: StepAttributeCapability[];
  amounts: StepAmountCapability[];
}
export type StepParameterName = string;
export type StepParameterType =
  | "INT"
  | "FLOAT"
  | "STRING"
  | "PATH"
  | "CHUNK_INT"
  | (string & {});
export type DefaultTaskCount = number;
export type TargetRuntimeSeconds = number;
export type RangeConstraint = "CONTIGUOUS" | "NONCONTIGUOUS" | (string & {});
export interface StepParameterChunks {
  defaultTaskCount: number;
  targetRuntimeSeconds?: number;
  rangeConstraint: RangeConstraint;
}
export interface StepParameter {
  name: string;
  type: StepParameterType;
  chunks?: StepParameterChunks;
}
export type StepParameterList = StepParameter[];
export type CombinationExpression = string;
export interface ParameterSpace {
  parameters: StepParameter[];
  combination?: string;
}
export type StepDescription = string | redacted.Redacted<string>;
export interface BatchGetStepItem {
  farmId: string;
  queueId: string;
  jobId: string;
  stepId: string;
  name: string;
  lifecycleStatus: StepLifecycleStatus;
  lifecycleStatusMessage?: string;
  taskRunStatus: TaskRunStatus;
  taskRunStatusCounts: { [key: string]: number | undefined };
  taskFailureRetryCount?: number;
  targetTaskRunStatus?: StepTargetTaskRunStatus;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  startedAt?: Date;
  endedAt?: Date;
  dependencyCounts?: DependencyCounts;
  requiredCapabilities?: StepRequiredCapabilities;
  parameterSpace?: ParameterSpace;
  description?: string | redacted.Redacted<string>;
}
export type BatchGetStepItems = BatchGetStepItem[];
export type BatchGetStepErrorCode =
  | "InternalServerErrorException"
  | "ResourceNotFoundException"
  | "ValidationException"
  | "AccessDeniedException"
  | "ThrottlingException"
  | (string & {});
export interface BatchGetStepError_ {
  farmId: string;
  queueId: string;
  jobId: string;
  stepId: string;
  code: BatchGetStepErrorCode;
  message: string;
}
export type BatchGetStepErrors = BatchGetStepError_[];
export interface BatchGetStepResponse {
  steps: BatchGetStepItem[];
  errors: BatchGetStepError_[];
}
export interface BatchGetTaskIdentifier {
  farmId: string;
  queueId: string;
  jobId: string;
  stepId: string;
  taskId: string;
}
export type BatchGetTaskIdentifiers = BatchGetTaskIdentifier[];
export interface BatchGetTaskRequest {
  identifiers: BatchGetTaskIdentifier[];
}
export type TaskTargetRunStatus =
  | "READY"
  | "FAILED"
  | "SUCCEEDED"
  | "CANCELED"
  | "SUSPENDED"
  | "PENDING"
  | (string & {});
export type TaskRetryCount = number;
export interface BatchGetTaskItem {
  farmId: string;
  queueId: string;
  jobId: string;
  stepId: string;
  taskId: string;
  createdAt: Date;
  createdBy: string;
  runStatus: TaskRunStatus;
  targetRunStatus?: TaskTargetRunStatus;
  failureRetryCount?: number;
  startedAt?: Date;
  endedAt?: Date;
  updatedAt?: Date;
  updatedBy?: string;
  latestSessionActionId?: string;
  parameters?: { [key: string]: TaskParameterValue | undefined };
}
export type BatchGetTaskItems = BatchGetTaskItem[];
export type BatchGetTaskErrorCode =
  | "InternalServerErrorException"
  | "ResourceNotFoundException"
  | "ValidationException"
  | "AccessDeniedException"
  | "ThrottlingException"
  | (string & {});
export interface BatchGetTaskError_ {
  farmId: string;
  queueId: string;
  jobId: string;
  stepId: string;
  taskId: string;
  code: BatchGetTaskErrorCode;
  message: string;
}
export type BatchGetTaskErrors = BatchGetTaskError_[];
export interface BatchGetTaskResponse {
  tasks: BatchGetTaskItem[];
  errors: BatchGetTaskError_[];
}
export interface BatchGetWorkerIdentifier {
  farmId: string;
  fleetId: string;
  workerId: string;
}
export type BatchGetWorkerIdentifiers = BatchGetWorkerIdentifier[];
export interface BatchGetWorkerRequest {
  identifiers: BatchGetWorkerIdentifier[];
}
export type WorkerStatus =
  | "CREATED"
  | "STARTED"
  | "STOPPING"
  | "STOPPED"
  | "NOT_RESPONDING"
  | "NOT_COMPATIBLE"
  | "RUNNING"
  | "IDLE"
  | (string & {});
export interface BatchGetWorkerItem {
  farmId: string;
  fleetId: string;
  workerId: string;
  hostProperties?: HostPropertiesResponse;
  status: WorkerStatus;
  log?: LogConfiguration;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export type BatchGetWorkerItems = BatchGetWorkerItem[];
export type BatchGetWorkerErrorCode =
  | "InternalServerErrorException"
  | "ResourceNotFoundException"
  | "ValidationException"
  | (string & {});
export interface BatchGetWorkerError_ {
  farmId: string;
  fleetId: string;
  workerId: string;
  code: BatchGetWorkerErrorCode;
  message: string;
}
export type BatchGetWorkerErrors = BatchGetWorkerError_[];
export interface BatchGetWorkerResponse {
  workers: BatchGetWorkerItem[];
  errors: BatchGetWorkerError_[];
}
export type ClientToken = string;
export type UpdateJobLifecycleStatus = "ARCHIVED" | (string & {});
export type JobDescriptionOverride = string | redacted.Redacted<string>;
export interface BatchUpdateJobItem {
  farmId: string;
  queueId: string;
  jobId: string;
  targetTaskRunStatus?: JobTargetTaskRunStatus;
  priority?: number;
  maxFailedTasksCount?: number;
  maxRetriesPerTask?: number;
  lifecycleStatus?: UpdateJobLifecycleStatus;
  maxWorkerCount?: number;
  name?: string;
  description?: string | redacted.Redacted<string>;
}
export type BatchUpdateJobItems = BatchUpdateJobItem[];
export interface BatchUpdateJobRequest {
  clientToken?: string;
  jobs: BatchUpdateJobItem[];
}
export type BatchUpdateJobErrorCode =
  | "ConflictException"
  | "InternalServerErrorException"
  | "ResourceNotFoundException"
  | "ValidationException"
  | "AccessDeniedException"
  | "ThrottlingException"
  | (string & {});
export interface BatchUpdateJobError_ {
  farmId: string;
  queueId: string;
  jobId: string;
  code: BatchUpdateJobErrorCode;
  message: string;
}
export type BatchUpdateJobErrors = BatchUpdateJobError_[];
export interface BatchUpdateJobResponse {
  errors: BatchUpdateJobError_[];
}
export interface BatchUpdateTaskItem {
  farmId: string;
  queueId: string;
  jobId: string;
  stepId: string;
  taskId: string;
  targetRunStatus: TaskTargetRunStatus;
}
export type BatchUpdateTaskItems = BatchUpdateTaskItem[];
export interface BatchUpdateTaskRequest {
  clientToken?: string;
  tasks: BatchUpdateTaskItem[];
}
export type BatchUpdateTaskErrorCode =
  | "ConflictException"
  | "InternalServerErrorException"
  | "ResourceNotFoundException"
  | "ValidationException"
  | "AccessDeniedException"
  | "ThrottlingException"
  | (string & {});
export interface BatchUpdateTaskError_ {
  farmId: string;
  queueId: string;
  jobId: string;
  stepId: string;
  taskId: string;
  code: BatchUpdateTaskErrorCode;
  message: string;
}
export type BatchUpdateTaskErrors = BatchUpdateTaskError_[];
export interface BatchUpdateTaskResponse {
  errors: BatchUpdateTaskError_[];
}
export type S3Key = string;
export interface S3Location {
  bucketName: string;
  key: string;
}
export interface CopyJobTemplateRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  targetS3Location: S3Location;
}
export type JobTemplateType = "JSON" | "YAML" | (string & {});
export interface CopyJobTemplateResponse {
  templateType: JobTemplateType;
}
export type ResourceName = string;
export type Description = string | redacted.Redacted<string>;
export type UsageTrackingResource = { queueId: string };
export type ConsumedUsageLimit = number;
export type BudgetActionType =
  | "STOP_SCHEDULING_AND_COMPLETE_TASKS"
  | "STOP_SCHEDULING_AND_CANCEL_TASKS"
  | (string & {});
export type ThresholdPercentage = number;
export interface BudgetActionToAdd {
  type: BudgetActionType;
  thresholdPercentage: number;
  description?: string | redacted.Redacted<string>;
}
export type BudgetActionsToAdd = BudgetActionToAdd[];
export type StartsAt = Date;
export type EndsAt = Date;
export interface FixedBudgetSchedule {
  startTime: Date;
  endTime: Date;
}
export type BudgetSchedule = { fixed: FixedBudgetSchedule };
export type Tags = { [key: string]: string | undefined };
export interface CreateBudgetRequest {
  farmId: string;
  displayName: string;
  description?: string | redacted.Redacted<string>;
  clientToken?: string;
  usageTrackingResource: UsageTrackingResource;
  approximateDollarLimit: number;
  actions: BudgetActionToAdd[];
  schedule: BudgetSchedule;
  tags?: { [key: string]: string | undefined };
}
export type BudgetId = string;
export interface CreateBudgetResponse {
  budgetId: string;
}
export type KmsKeyArn = string;
export type CostScaleFactor = number;
export interface CreateFarmRequest {
  clientToken?: string;
  displayName: string;
  description?: string | redacted.Redacted<string>;
  kmsKeyArn?: string;
  costScaleFactor?: number;
  tags?: { [key: string]: string | undefined };
}
export interface CreateFarmResponse {
  farmId: string;
}
export type MinZeroMaxInteger = number;
export type AutoScalingMode =
  | "NO_SCALING"
  | "EVENT_BASED_AUTO_SCALING"
  | (string & {});
export interface CustomerManagedAutoScalingConfiguration {
  standbyWorkerCount?: number;
  workerIdleDurationSeconds?: number;
  scaleOutWorkersPerMinute?: number;
}
export type MinOneMaxTenThousand = number;
export interface VCpuCountRange {
  min: number;
  max?: number;
}
export type MemoryAmountMiB = number;
export interface MemoryMiBRange {
  min: number;
  max?: number;
}
export type AcceleratorType = "gpu" | (string & {});
export type AcceleratorTypes = AcceleratorType[];
export interface AcceleratorCountRange {
  min: number;
  max?: number;
}
export interface AcceleratorTotalMemoryMiBRange {
  min: number;
  max?: number;
}
export type CustomerManagedFleetOperatingSystemFamily =
  | "WINDOWS"
  | "LINUX"
  | "MACOS"
  | (string & {});
export type CpuArchitectureType = "x86_64" | "arm64" | (string & {});
export interface FleetAmountCapability {
  name: string;
  min: number;
  max?: number;
}
export type CustomFleetAmountCapabilities = FleetAmountCapability[];
export type AttributeCapabilityValuesList = string[];
export interface FleetAttributeCapability {
  name: string;
  values: string[];
}
export type CustomFleetAttributeCapabilities = FleetAttributeCapability[];
export interface CustomerManagedWorkerCapabilities {
  vCpuCount: VCpuCountRange;
  memoryMiB: MemoryMiBRange;
  acceleratorTypes?: AcceleratorType[];
  acceleratorCount?: AcceleratorCountRange;
  acceleratorTotalMemoryMiB?: AcceleratorTotalMemoryMiBRange;
  osFamily: CustomerManagedFleetOperatingSystemFamily;
  cpuArchitectureType: CpuArchitectureType;
  customAmounts?: FleetAmountCapability[];
  customAttributes?: FleetAttributeCapability[];
}
export type TagPropagationMode =
  | "NO_PROPAGATION"
  | "PROPAGATE_TAGS_TO_WORKERS_AT_LAUNCH"
  | (string & {});
export interface CustomerManagedFleetConfiguration {
  mode: AutoScalingMode;
  autoScalingConfiguration?: CustomerManagedAutoScalingConfiguration;
  workerCapabilities: CustomerManagedWorkerCapabilities;
  storageProfileId?: string;
  tagPropagationMode?: TagPropagationMode;
}
export type ServiceManagedFleetOperatingSystemFamily =
  | "WINDOWS"
  | "LINUX"
  | (string & {});
export type EbsIops = number;
export type EbsThroughputMiB = number;
export interface Ec2EbsVolume {
  sizeGiB?: number;
  iops?: number;
  throughputMiB?: number;
}
export type AcceleratorName =
  | "t4"
  | "a10g"
  | "l4"
  | "l40s"
  | "rtx-pro-server-6000"
  | (string & {});
export type AcceleratorRuntime = string;
export interface AcceleratorSelection {
  name: AcceleratorName;
  runtime?: string;
}
export type AcceleratorSelections = AcceleratorSelection[];
export interface AcceleratorCapabilities {
  selections: AcceleratorSelection[];
  count?: AcceleratorCountRange;
}
export type InstanceTypes = string[];
export interface ServiceManagedEc2InstanceCapabilities {
  vCpuCount: VCpuCountRange;
  memoryMiB: MemoryMiBRange;
  osFamily: ServiceManagedFleetOperatingSystemFamily;
  cpuArchitectureType: CpuArchitectureType;
  rootEbsVolume?: Ec2EbsVolume;
  acceleratorCapabilities?: AcceleratorCapabilities;
  allowedInstanceTypes?: string[];
  excludedInstanceTypes?: string[];
  customAmounts?: FleetAmountCapability[];
  customAttributes?: FleetAttributeCapability[];
}
export type Ec2MarketType =
  | "on-demand"
  | "spot"
  | "wait-and-save"
  | (string & {});
export interface ServiceManagedEc2InstanceMarketOptions {
  type: Ec2MarketType;
}
export type VpcResourceConfigurationArn = string;
export type VpcResourceConfigurationArns = string[];
export interface VpcConfiguration {
  resourceConfigurationArns?: string[];
}
export type PersistentVolumeSizeGiB = number;
export type PersistentVolumeIops = number;
export type PersistentVolumeThroughputMiB = number;
export type MountPath = string;
export type PersistentVolumeTtlHours = number;
export interface PersistentVolumeConfiguration {
  sizeGiB?: number;
  iops?: number;
  throughputMiB?: number;
  mountPath: string;
  lastUsedTtlHours?: number;
}
export type ServiceManagedEc2WorkerIdleDurationSeconds = number;
export interface ServiceManagedEc2AutoScalingConfiguration {
  standbyWorkerCount?: number;
  workerIdleDurationSeconds?: number;
  scaleOutWorkersPerMinute?: number;
}
export interface ServiceManagedEc2FleetConfiguration {
  instanceCapabilities: ServiceManagedEc2InstanceCapabilities;
  instanceMarketOptions: ServiceManagedEc2InstanceMarketOptions;
  vpcConfiguration?: VpcConfiguration;
  storageProfileId?: string;
  persistentVolumeConfiguration?: PersistentVolumeConfiguration;
  autoScalingConfiguration?: ServiceManagedEc2AutoScalingConfiguration;
}
export type FleetConfiguration =
  | {
      customerManaged: CustomerManagedFleetConfiguration;
      serviceManagedEc2?: never;
    }
  | {
      customerManaged?: never;
      serviceManagedEc2: ServiceManagedEc2FleetConfiguration;
    };
export type HostConfigurationScript = string | redacted.Redacted<string>;
export type HostConfigurationScriptTimeoutSeconds = number;
export interface HostConfiguration {
  scriptBody: string | redacted.Redacted<string>;
  scriptTimeoutSeconds?: number;
}
export interface CreateFleetRequest {
  farmId: string;
  clientToken?: string;
  displayName: string;
  description?: string | redacted.Redacted<string>;
  roleArn: string;
  minWorkerCount?: number;
  maxWorkerCount: number;
  configuration: FleetConfiguration;
  tags?: { [key: string]: string | undefined };
  hostConfiguration?: HostConfiguration;
}
export interface CreateFleetResponse {
  fleetId: string;
}
export type JobTemplate = string | redacted.Redacted<string>;
export type CreateJobTargetTaskRunStatus =
  | "READY"
  | "SUSPENDED"
  | (string & {});
export interface CreateJobRequest {
  farmId: string;
  queueId: string;
  clientToken?: string;
  template?: string | redacted.Redacted<string>;
  templateType?: JobTemplateType;
  priority: number;
  parameters?: { [key: string]: JobParameter | undefined };
  attachments?: Attachments;
  storageProfileId?: string;
  targetTaskRunStatus?: CreateJobTargetTaskRunStatus;
  maxFailedTasksCount?: number;
  maxRetriesPerTask?: number;
  maxWorkerCount?: number;
  sourceJobId?: string;
  nameOverride?: string;
  descriptionOverride?: string | redacted.Redacted<string>;
  tags?: { [key: string]: string | undefined };
}
export interface CreateJobResponse {
  jobId: string;
}
export type VpcId = string;
export type SubnetId = string;
export type SubnetIdList = string[];
export type SecurityGroupId = string;
export type SecurityGroupIdList = string[];
export interface CreateLicenseEndpointRequest {
  clientToken?: string;
  vpcId: string;
  subnetIds: string[];
  securityGroupIds: string[];
  tags?: { [key: string]: string | undefined };
}
export type LicenseEndpointId = string;
export interface CreateLicenseEndpointResponse {
  licenseEndpointId: string;
}
export type AmountRequirementName = string;
export type MaxCount = number;
export interface CreateLimitRequest {
  farmId: string;
  clientToken?: string;
  displayName: string;
  amountRequirementName: string;
  maxCount: number;
  description?: string | redacted.Redacted<string>;
}
export interface CreateLimitResponse {
  limitId: string;
}
export type IdentityCenterInstanceArn = string;
export type Subdomain = string;
export interface CreateMonitorRequest {
  clientToken?: string;
  displayName: string;
  identityCenterInstanceArn: string;
  identityCenterRegion?: string;
  subdomain: string;
  roleArn: string;
  tags?: { [key: string]: string | undefined };
}
export type MonitorId = string;
export type IdentityCenterApplicationArn = string;
export interface CreateMonitorResponse {
  monitorId: string;
  identityCenterApplicationArn: string;
}
export type DefaultQueueBudgetAction =
  | "NONE"
  | "STOP_SCHEDULING_AND_COMPLETE_TASKS"
  | "STOP_SCHEDULING_AND_CANCEL_TASKS"
  | (string & {});
export interface JobAttachmentSettings {
  s3BucketName: string;
  rootPrefix: string;
}
export type RequiredFileSystemLocationNames = string[];
export type AllowedStorageProfileIds = string[];
export interface PriorityFifoSchedulingConfiguration {}
export type SchedulingRenderingTaskBuffer = number;
export interface PriorityBalancedSchedulingConfiguration {
  renderingTaskBuffer?: number;
}
export type SchedulingPriorityWeight = number;
export type SchedulingErrorWeight = number;
export type SchedulingSubmissionTimeWeight = number;
export type SchedulingRenderingTaskWeight = number;
export interface SchedulingMaxPriorityOverrideAlwaysScheduleFirst {}
export type SchedulingMaxPriorityOverride = {
  alwaysScheduleFirst: SchedulingMaxPriorityOverrideAlwaysScheduleFirst;
};
export interface SchedulingMinPriorityOverrideAlwaysScheduleLast {}
export type SchedulingMinPriorityOverride = {
  alwaysScheduleLast: SchedulingMinPriorityOverrideAlwaysScheduleLast;
};
export interface WeightedBalancedSchedulingConfiguration {
  priorityWeight?: number;
  errorWeight?: number;
  submissionTimeWeight?: number;
  renderingTaskWeight?: number;
  renderingTaskBuffer?: number;
  maxPriorityOverride?: SchedulingMaxPriorityOverride;
  minPriorityOverride?: SchedulingMinPriorityOverride;
}
export type SchedulingConfiguration =
  | {
      priorityFifo: PriorityFifoSchedulingConfiguration;
      priorityBalanced?: never;
      weightedBalanced?: never;
    }
  | {
      priorityFifo?: never;
      priorityBalanced: PriorityBalancedSchedulingConfiguration;
      weightedBalanced?: never;
    }
  | {
      priorityFifo?: never;
      priorityBalanced?: never;
      weightedBalanced: WeightedBalancedSchedulingConfiguration;
    };
export interface CreateQueueRequest {
  farmId: string;
  clientToken?: string;
  displayName: string;
  description?: string | redacted.Redacted<string>;
  defaultBudgetAction?: DefaultQueueBudgetAction;
  jobAttachmentSettings?: JobAttachmentSettings;
  roleArn?: string;
  jobRunAsUser?: JobRunAsUser;
  requiredFileSystemLocationNames?: string[];
  allowedStorageProfileIds?: string[];
  tags?: { [key: string]: string | undefined };
  schedulingConfiguration?: SchedulingConfiguration;
}
export interface CreateQueueResponse {
  queueId: string;
}
export type Priority = number;
export type EnvironmentTemplateType = "JSON" | "YAML" | (string & {});
export type EnvironmentTemplate = string | redacted.Redacted<string>;
export interface CreateQueueEnvironmentRequest {
  farmId: string;
  queueId: string;
  clientToken?: string;
  priority: number;
  templateType: EnvironmentTemplateType;
  template: string | redacted.Redacted<string>;
}
export type QueueEnvironmentId = string;
export interface CreateQueueEnvironmentResponse {
  queueEnvironmentId: string;
}
export interface CreateQueueFleetAssociationRequest {
  farmId: string;
  queueId: string;
  fleetId: string;
}
export interface CreateQueueFleetAssociationResponse {}
export interface CreateQueueLimitAssociationRequest {
  farmId: string;
  queueId: string;
  limitId: string;
}
export interface CreateQueueLimitAssociationResponse {}
export type StorageProfileOperatingSystemFamily =
  | "WINDOWS"
  | "LINUX"
  | "MACOS"
  | (string & {});
export type FileSystemLocationType = "SHARED" | "LOCAL" | (string & {});
export interface FileSystemLocation {
  name: string;
  path: string;
  type: FileSystemLocationType;
}
export type FileSystemLocationsList = FileSystemLocation[];
export interface CreateStorageProfileRequest {
  farmId: string;
  clientToken?: string;
  displayName: string;
  osFamily: StorageProfileOperatingSystemFamily;
  fileSystemLocations?: FileSystemLocation[];
}
export interface CreateStorageProfileResponse {
  storageProfileId: string;
}
export interface HostPropertiesRequest {
  ipAddresses?: IpAddresses;
  hostName?: string;
}
export interface CreateWorkerRequest {
  farmId: string;
  fleetId: string;
  hostProperties?: HostPropertiesRequest;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateWorkerResponse {
  workerId: string;
}
export interface DeleteBudgetRequest {
  farmId: string;
  budgetId: string;
}
export interface DeleteBudgetResponse {}
export interface DeleteFarmRequest {
  farmId: string;
}
export interface DeleteFarmResponse {}
export interface DeleteFleetRequest {
  farmId: string;
  fleetId: string;
  clientToken?: string;
}
export interface DeleteFleetResponse {}
export interface DeleteLicenseEndpointRequest {
  licenseEndpointId: string;
}
export interface DeleteLicenseEndpointResponse {}
export interface DeleteLimitRequest {
  farmId: string;
  limitId: string;
}
export interface DeleteLimitResponse {}
export type MeteredProductId = string;
export interface DeleteMeteredProductRequest {
  licenseEndpointId: string;
  productId: string;
}
export interface DeleteMeteredProductResponse {}
export interface DeleteMonitorRequest {
  monitorId: string;
}
export interface DeleteMonitorResponse {}
export interface DeleteQueueRequest {
  farmId: string;
  queueId: string;
}
export interface DeleteQueueResponse {}
export interface DeleteQueueEnvironmentRequest {
  farmId: string;
  queueId: string;
  queueEnvironmentId: string;
}
export interface DeleteQueueEnvironmentResponse {}
export interface DeleteQueueFleetAssociationRequest {
  farmId: string;
  queueId: string;
  fleetId: string;
}
export interface DeleteQueueFleetAssociationResponse {}
export interface DeleteQueueLimitAssociationRequest {
  farmId: string;
  queueId: string;
  limitId: string;
}
export interface DeleteQueueLimitAssociationResponse {}
export interface DeleteStorageProfileRequest {
  farmId: string;
  storageProfileId: string;
}
export interface DeleteStorageProfileResponse {}
export type VolumeId = string;
export interface DeleteVolumeRequest {
  farmId: string;
  fleetId: string;
  volumeId: string;
}
export interface DeleteVolumeResponse {}
export interface DeleteWorkerRequest {
  farmId: string;
  fleetId: string;
  workerId: string;
}
export interface DeleteWorkerResponse {}
export interface DisassociateMemberFromFarmRequest {
  farmId: string;
  principalId: string;
}
export interface DisassociateMemberFromFarmResponse {}
export interface DisassociateMemberFromFleetRequest {
  farmId: string;
  fleetId: string;
  principalId: string;
}
export interface DisassociateMemberFromFleetResponse {}
export interface DisassociateMemberFromJobRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  principalId: string;
}
export interface DisassociateMemberFromJobResponse {}
export interface DisassociateMemberFromQueueRequest {
  farmId: string;
  queueId: string;
  principalId: string;
}
export interface DisassociateMemberFromQueueResponse {}
export interface GetBudgetRequest {
  farmId: string;
  budgetId: string;
}
export type BudgetStatus = "ACTIVE" | "INACTIVE" | (string & {});
export interface ConsumedUsages {
  approximateDollarUsage: number;
}
export interface ResponseBudgetAction {
  type: BudgetActionType;
  thresholdPercentage: number;
  description?: string | redacted.Redacted<string>;
}
export type ResponseBudgetActionList = ResponseBudgetAction[];
export interface GetBudgetResponse {
  budgetId: string;
  usageTrackingResource: UsageTrackingResource;
  status: BudgetStatus;
  displayName: string;
  approximateDollarLimit: number;
  usages: ConsumedUsages;
  createdBy: string;
  createdAt: Date;
  updatedBy?: string;
  updatedAt?: Date;
  description?: string | redacted.Redacted<string>;
  actions: ResponseBudgetAction[];
  schedule: BudgetSchedule;
  queueStoppedAt?: Date;
}
export interface GetFarmRequest {
  farmId: string;
}
export interface GetFarmResponse {
  farmId: string;
  displayName: string;
  kmsKeyArn?: string;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  description?: string | redacted.Redacted<string>;
  costScaleFactor: number;
}
export interface GetFleetRequest {
  farmId: string;
  fleetId: string;
}
export type FleetStatus =
  | "ACTIVE"
  | "CREATE_IN_PROGRESS"
  | "UPDATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "UPDATE_FAILED"
  | "SUSPENDED"
  | (string & {});
export type AutoScalingStatus =
  | "GROWING"
  | "STEADY"
  | "SHRINKING"
  | (string & {});
export type FleetAmountCapabilities = FleetAmountCapability[];
export type FleetAttributeCapabilities = FleetAttributeCapability[];
export interface FleetCapabilities {
  amounts?: FleetAmountCapability[];
  attributes?: FleetAttributeCapability[];
}
export interface GetFleetResponse {
  fleetId: string;
  farmId: string;
  displayName: string;
  status: FleetStatus;
  statusMessage?: string;
  autoScalingStatus?: AutoScalingStatus;
  targetWorkerCount?: number;
  workerCount: number;
  minWorkerCount: number;
  maxWorkerCount: number;
  configuration: FleetConfiguration;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  description?: string | redacted.Redacted<string>;
  hostConfiguration?: HostConfiguration;
  capabilities?: FleetCapabilities;
  roleArn: string;
}
export interface GetJobRequest {
  farmId: string;
  queueId: string;
  jobId: string;
}
export interface GetJobResponse {
  jobId: string;
  name: string;
  lifecycleStatus: JobLifecycleStatus;
  lifecycleStatusMessage: string;
  priority: number;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  startedAt?: Date;
  endedAt?: Date;
  taskRunStatus?: TaskRunStatus;
  targetTaskRunStatus?: JobTargetTaskRunStatus;
  taskRunStatusCounts?: { [key: string]: number | undefined };
  taskFailureRetryCount?: number;
  storageProfileId?: string;
  maxFailedTasksCount?: number;
  maxRetriesPerTask?: number;
  parameters?: { [key: string]: JobParameter | undefined };
  attachments?: Attachments;
  description?: string | redacted.Redacted<string>;
  maxWorkerCount?: number;
  sourceJobId?: string;
}
export interface GetLicenseEndpointRequest {
  licenseEndpointId: string;
}
export type LicenseEndpointStatus =
  | "CREATE_IN_PROGRESS"
  | "DELETE_IN_PROGRESS"
  | "READY"
  | "NOT_READY"
  | (string & {});
export type StatusMessage = string;
export type DnsName = string;
export interface GetLicenseEndpointResponse {
  licenseEndpointId: string;
  status: LicenseEndpointStatus;
  statusMessage: string;
  vpcId?: string;
  dnsName?: string;
  subnetIds?: string[];
  securityGroupIds?: string[];
}
export interface GetLimitRequest {
  farmId: string;
  limitId: string;
}
export interface GetLimitResponse {
  farmId: string;
  limitId: string;
  currentCount: number;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  displayName: string;
  amountRequirementName: string;
  maxCount: number;
  description?: string | redacted.Redacted<string>;
}
export interface GetMonitorRequest {
  monitorId: string;
}
export type Url = string;
export interface GetMonitorResponse {
  monitorId: string;
  displayName: string;
  subdomain: string;
  url: string;
  roleArn: string;
  identityCenterInstanceArn: string;
  identityCenterRegion?: string;
  identityCenterApplicationArn: string;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export interface GetMonitorSettingsRequest {
  monitorId: string;
}
export type SettingKey = string;
export type SettingValue = string;
export type SettingsMap = { [key: string]: string | undefined };
export interface GetMonitorSettingsResponse {
  settings: { [key: string]: string | undefined };
}
export interface GetQueueRequest {
  farmId: string;
  queueId: string;
}
export type QueueStatus =
  | "IDLE"
  | "SCHEDULING"
  | "SCHEDULING_BLOCKED"
  | (string & {});
export type QueueBlockedReason =
  | "NO_BUDGET_CONFIGURED"
  | "BUDGET_THRESHOLD_REACHED"
  | (string & {});
export interface GetQueueResponse {
  farmId: string;
  queueId: string;
  displayName: string;
  status: QueueStatus;
  defaultBudgetAction: DefaultQueueBudgetAction;
  blockedReason?: QueueBlockedReason;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  description?: string | redacted.Redacted<string>;
  jobAttachmentSettings?: JobAttachmentSettings;
  roleArn?: string;
  requiredFileSystemLocationNames?: string[];
  allowedStorageProfileIds?: string[];
  jobRunAsUser?: JobRunAsUser;
  schedulingConfiguration?: SchedulingConfiguration;
}
export interface GetQueueEnvironmentRequest {
  farmId: string;
  queueId: string;
  queueEnvironmentId: string;
}
export type EnvironmentName = string;
export interface GetQueueEnvironmentResponse {
  queueEnvironmentId: string;
  name: string;
  priority: number;
  templateType: EnvironmentTemplateType;
  template: string | redacted.Redacted<string>;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export interface GetQueueFleetAssociationRequest {
  farmId: string;
  queueId: string;
  fleetId: string;
}
export type QueueFleetAssociationStatus =
  | "ACTIVE"
  | "STOP_SCHEDULING_AND_COMPLETE_TASKS"
  | "STOP_SCHEDULING_AND_CANCEL_TASKS"
  | "STOPPED"
  | (string & {});
export interface GetQueueFleetAssociationResponse {
  queueId: string;
  fleetId: string;
  status: QueueFleetAssociationStatus;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export interface GetQueueLimitAssociationRequest {
  farmId: string;
  queueId: string;
  limitId: string;
}
export type QueueLimitAssociationStatus =
  | "ACTIVE"
  | "STOP_LIMIT_USAGE_AND_COMPLETE_TASKS"
  | "STOP_LIMIT_USAGE_AND_CANCEL_TASKS"
  | "STOPPED"
  | (string & {});
export interface GetQueueLimitAssociationResponse {
  queueId: string;
  limitId: string;
  status: QueueLimitAssociationStatus;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export interface GetSessionRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  sessionId: string;
}
export interface GetSessionResponse {
  sessionId: string;
  fleetId: string;
  workerId: string;
  startedAt: Date;
  lifecycleStatus: SessionLifecycleStatus;
  endedAt?: Date;
  targetLifecycleStatus?: SessionLifecycleTargetStatus;
  updatedAt?: Date;
  updatedBy?: string;
  log: LogConfiguration;
  hostProperties?: HostPropertiesResponse;
  workerLog?: LogConfiguration;
}
export interface GetSessionActionRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  sessionActionId: string;
}
export interface GetSessionActionResponse {
  sessionActionId: string;
  status: SessionActionStatus;
  startedAt?: Date;
  endedAt?: Date;
  workerUpdatedAt?: Date;
  progressPercent?: number;
  manifests?: TaskRunManifestPropertiesResponse[];
  sessionId: string;
  processExitCode?: number;
  progressMessage?: string | redacted.Redacted<string>;
  acquiredLimits?: AcquiredLimit[];
  definition: SessionActionDefinition;
}
export type NextToken = string;
export type MaxResults = number;
export type AggregationId = string;
export interface GetSessionsStatisticsAggregationRequest {
  farmId: string;
  nextToken?: string;
  maxResults?: number;
  aggregationId: string;
}
export type UserId = string;
export type UsageType =
  | "COMPUTE"
  | "LICENSE"
  | "PERSISTENT_VOLUME"
  | (string & {});
export type LicenseProduct = string;
export interface Stats {
  min?: number;
  max?: number;
  avg?: number;
  sum?: number;
}
export interface Statistics {
  queueId?: string;
  fleetId?: string;
  jobId?: string;
  jobName?: string;
  userId?: string;
  usageType?: UsageType;
  licenseProduct?: string;
  instanceType?: string;
  count: number;
  costInUsd: Stats;
  runtimeInSeconds: Stats;
  aggregationStartTime?: Date;
  aggregationEndTime?: Date;
}
export type StatisticsList = Statistics[];
export type SessionsStatisticsAggregationStatus =
  | "IN_PROGRESS"
  | "TIMEOUT"
  | "FAILED"
  | "COMPLETED"
  | (string & {});
export interface GetSessionsStatisticsAggregationResponse {
  statistics?: Statistics[];
  status: SessionsStatisticsAggregationStatus;
  statusMessage?: string;
  nextToken?: string;
}
export interface GetStepRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  stepId: string;
}
export interface GetStepResponse {
  stepId: string;
  name: string;
  lifecycleStatus: StepLifecycleStatus;
  lifecycleStatusMessage?: string;
  taskRunStatus: TaskRunStatus;
  taskRunStatusCounts: { [key: string]: number | undefined };
  taskFailureRetryCount?: number;
  targetTaskRunStatus?: StepTargetTaskRunStatus;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  startedAt?: Date;
  endedAt?: Date;
  dependencyCounts?: DependencyCounts;
  requiredCapabilities?: StepRequiredCapabilities;
  parameterSpace?: ParameterSpace;
  description?: string | redacted.Redacted<string>;
}
export interface GetStorageProfileRequest {
  farmId: string;
  storageProfileId: string;
}
export interface GetStorageProfileResponse {
  storageProfileId: string;
  displayName: string;
  osFamily: StorageProfileOperatingSystemFamily;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  fileSystemLocations?: FileSystemLocation[];
}
export interface GetStorageProfileForQueueRequest {
  farmId: string;
  queueId: string;
  storageProfileId: string;
}
export interface GetStorageProfileForQueueResponse {
  storageProfileId: string;
  displayName: string;
  osFamily: StorageProfileOperatingSystemFamily;
  fileSystemLocations?: FileSystemLocation[];
}
export interface GetTaskRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  stepId: string;
  taskId: string;
}
export interface GetTaskResponse {
  taskId: string;
  createdAt: Date;
  createdBy: string;
  runStatus: TaskRunStatus;
  targetRunStatus?: TaskTargetRunStatus;
  failureRetryCount?: number;
  startedAt?: Date;
  endedAt?: Date;
  updatedAt?: Date;
  updatedBy?: string;
  latestSessionActionId?: string;
  parameters?: { [key: string]: TaskParameterValue | undefined };
}
export interface GetVolumeRequest {
  farmId: string;
  fleetId: string;
  volumeId: string;
}
export type VolumeState =
  | "PENDING_CREATION"
  | "PENDING_ATTACHMENT"
  | "IN_USE"
  | "AVAILABLE"
  | "PENDING_DELETION"
  | (string & {});
export type EbsVolumeType = "gp3" | (string & {});
export interface GetVolumeResponse {
  volumeId: string;
  farmId: string;
  fleetId: string;
  state: VolumeState;
  sizeGiB: number;
  availabilityZoneId: string;
  attachedWorkerId?: string;
  volumeType: EbsVolumeType;
  iops?: number;
  throughputMiB?: number;
  createdAt: Date;
  lastAssignedAt?: Date;
  lastReleasedAt?: Date;
  expiresAt?: Date;
}
export interface GetWorkerRequest {
  farmId: string;
  fleetId: string;
  workerId: string;
}
export interface GetWorkerResponse {
  farmId: string;
  fleetId: string;
  workerId: string;
  hostProperties?: HostPropertiesResponse;
  status: WorkerStatus;
  log?: LogConfiguration;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export interface ListAvailableMeteredProductsRequest {
  nextToken?: string;
  maxResults?: number;
}
export type BoundedString = string;
export type PortNumber = number;
export interface MeteredProductSummary {
  productId: string;
  family: string;
  vendor: string;
  port: number;
}
export type MeteredProductSummaryList = MeteredProductSummary[];
export interface ListAvailableMeteredProductsResponse {
  meteredProducts: MeteredProductSummary[];
  nextToken?: string;
}
export interface ListBudgetsRequest {
  farmId: string;
  nextToken?: string;
  maxResults?: number;
  status?: BudgetStatus;
}
export interface BudgetSummary {
  budgetId: string;
  usageTrackingResource: UsageTrackingResource;
  status: BudgetStatus;
  displayName: string;
  approximateDollarLimit: number;
  usages: ConsumedUsages;
  createdBy: string;
  createdAt: Date;
  updatedBy?: string;
  updatedAt?: Date;
  description?: string | redacted.Redacted<string>;
}
export type BudgetSummaries = BudgetSummary[];
export interface ListBudgetsResponse {
  budgets: BudgetSummary[];
  nextToken?: string;
}
export interface ListFarmMembersRequest {
  farmId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface FarmMember {
  farmId: string;
  principalId: string;
  principalType: DeadlinePrincipalType;
  identityStoreId: string;
  membershipLevel: MembershipLevel;
}
export type FarmMembers = FarmMember[];
export interface ListFarmMembersResponse {
  members: FarmMember[];
  nextToken?: string;
}
export interface ListFarmsRequest {
  nextToken?: string;
  maxResults?: number;
  principalId?: string;
}
export interface FarmSummary {
  farmId: string;
  displayName: string;
  kmsKeyArn?: string;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export type FarmSummaries = FarmSummary[];
export interface ListFarmsResponse {
  farms: FarmSummary[];
  nextToken?: string;
}
export interface ListFleetMembersRequest {
  farmId: string;
  fleetId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface FleetMember {
  farmId: string;
  fleetId: string;
  principalId: string;
  principalType: DeadlinePrincipalType;
  identityStoreId: string;
  membershipLevel: MembershipLevel;
}
export type FleetMembers = FleetMember[];
export interface ListFleetMembersResponse {
  members: FleetMember[];
  nextToken?: string;
}
export interface ListFleetsRequest {
  farmId: string;
  nextToken?: string;
  maxResults?: number;
  principalId?: string;
  displayName?: string;
  status?: FleetStatus;
}
export interface FleetSummary {
  fleetId: string;
  farmId: string;
  displayName: string;
  status: FleetStatus;
  statusMessage?: string;
  autoScalingStatus?: AutoScalingStatus;
  targetWorkerCount?: number;
  workerCount: number;
  minWorkerCount: number;
  maxWorkerCount: number;
  configuration: FleetConfiguration;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export type FleetSummaries = FleetSummary[];
export interface ListFleetsResponse {
  fleets: FleetSummary[];
  nextToken?: string;
}
export interface ListJobMembersRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface JobMember {
  farmId: string;
  queueId: string;
  jobId: string;
  principalId: string;
  principalType: DeadlinePrincipalType;
  identityStoreId: string;
  membershipLevel: MembershipLevel;
}
export type JobMembers = JobMember[];
export interface ListJobMembersResponse {
  members: JobMember[];
  nextToken?: string;
}
export interface ListJobParameterDefinitionsRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  nextToken?: string;
  maxResults?: number;
}
export type JobParameterDefinition = unknown;
export type JobParameterDefinitions = any[];
export interface ListJobParameterDefinitionsResponse {
  jobParameterDefinitions: any[];
  nextToken?: string;
}
export interface ListJobsRequest {
  farmId: string;
  queueId: string;
  nextToken?: string;
  maxResults?: number;
  principalId?: string;
}
export interface JobSummary {
  jobId: string;
  name: string;
  lifecycleStatus: JobLifecycleStatus;
  lifecycleStatusMessage: string;
  priority: number;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  startedAt?: Date;
  endedAt?: Date;
  taskRunStatus?: TaskRunStatus;
  targetTaskRunStatus?: JobTargetTaskRunStatus;
  taskRunStatusCounts?: { [key: string]: number | undefined };
  taskFailureRetryCount?: number;
  maxFailedTasksCount?: number;
  maxRetriesPerTask?: number;
  maxWorkerCount?: number;
  sourceJobId?: string;
}
export type JobSummaries = JobSummary[];
export interface ListJobsResponse {
  jobs: JobSummary[];
  nextToken?: string;
}
export interface ListLicenseEndpointsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface LicenseEndpointSummary {
  licenseEndpointId?: string;
  status?: LicenseEndpointStatus;
  statusMessage?: string;
  vpcId?: string;
}
export type LicenseEndpointSummaries = LicenseEndpointSummary[];
export interface ListLicenseEndpointsResponse {
  licenseEndpoints: LicenseEndpointSummary[];
  nextToken?: string;
}
export interface ListLimitsRequest {
  farmId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface LimitSummary {
  farmId: string;
  limitId: string;
  currentCount: number;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  displayName: string;
  amountRequirementName: string;
  maxCount: number;
}
export type LimitSummaries = LimitSummary[];
export interface ListLimitsResponse {
  limits: LimitSummary[];
  nextToken?: string;
}
export interface ListMeteredProductsRequest {
  licenseEndpointId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ListMeteredProductsResponse {
  meteredProducts: MeteredProductSummary[];
  nextToken?: string;
}
export interface ListMonitorsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface MonitorSummary {
  monitorId: string;
  displayName: string;
  subdomain: string;
  url: string;
  roleArn: string;
  identityCenterInstanceArn: string;
  identityCenterRegion?: string;
  identityCenterApplicationArn: string;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export type MonitorSummaries = MonitorSummary[];
export interface ListMonitorsResponse {
  monitors: MonitorSummary[];
  nextToken?: string;
}
export interface ListQueueEnvironmentsRequest {
  farmId: string;
  queueId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface QueueEnvironmentSummary {
  queueEnvironmentId: string;
  name: string;
  priority: number;
}
export type QueueEnvironmentSummaries = QueueEnvironmentSummary[];
export interface ListQueueEnvironmentsResponse {
  environments: QueueEnvironmentSummary[];
  nextToken?: string;
}
export interface ListQueueFleetAssociationsRequest {
  farmId: string;
  nextToken?: string;
  maxResults?: number;
  queueId?: string;
  fleetId?: string;
}
export interface QueueFleetAssociationSummary {
  queueId: string;
  fleetId: string;
  status: QueueFleetAssociationStatus;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export type QueueFleetAssociationSummaries = QueueFleetAssociationSummary[];
export interface ListQueueFleetAssociationsResponse {
  queueFleetAssociations: QueueFleetAssociationSummary[];
  nextToken?: string;
}
export interface ListQueueLimitAssociationsRequest {
  farmId: string;
  nextToken?: string;
  maxResults?: number;
  queueId?: string;
  limitId?: string;
}
export interface QueueLimitAssociationSummary {
  queueId: string;
  limitId: string;
  status: QueueLimitAssociationStatus;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export type QueueLimitAssociationSummaries = QueueLimitAssociationSummary[];
export interface ListQueueLimitAssociationsResponse {
  queueLimitAssociations: QueueLimitAssociationSummary[];
  nextToken?: string;
}
export interface ListQueueMembersRequest {
  farmId: string;
  queueId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface QueueMember {
  farmId: string;
  queueId: string;
  principalId: string;
  principalType: DeadlinePrincipalType;
  identityStoreId: string;
  membershipLevel: MembershipLevel;
}
export type QueueMemberList = QueueMember[];
export interface ListQueueMembersResponse {
  members: QueueMember[];
  nextToken?: string;
}
export interface ListQueuesRequest {
  farmId: string;
  nextToken?: string;
  maxResults?: number;
  principalId?: string;
  status?: QueueStatus;
}
export interface QueueSummary {
  farmId: string;
  queueId: string;
  displayName: string;
  status: QueueStatus;
  defaultBudgetAction: DefaultQueueBudgetAction;
  blockedReason?: QueueBlockedReason;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export type QueueSummaries = QueueSummary[];
export interface ListQueuesResponse {
  queues: QueueSummary[];
  nextToken?: string;
}
export interface ListSessionActionsRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  nextToken?: string;
  maxResults?: number;
  sessionId?: string;
  taskId?: string;
}
export interface EnvironmentEnterSessionActionDefinitionSummary {
  environmentId: string;
}
export interface EnvironmentExitSessionActionDefinitionSummary {
  environmentId: string;
}
export interface TaskRunSessionActionDefinitionSummary {
  taskId?: string;
  stepId: string;
  parameters?: { [key: string]: TaskParameterValue | undefined };
}
export interface SyncInputJobAttachmentsSessionActionDefinitionSummary {
  stepId?: string;
}
export type SessionActionDefinitionSummary =
  | {
      envEnter: EnvironmentEnterSessionActionDefinitionSummary;
      envExit?: never;
      taskRun?: never;
      syncInputJobAttachments?: never;
    }
  | {
      envEnter?: never;
      envExit: EnvironmentExitSessionActionDefinitionSummary;
      taskRun?: never;
      syncInputJobAttachments?: never;
    }
  | {
      envEnter?: never;
      envExit?: never;
      taskRun: TaskRunSessionActionDefinitionSummary;
      syncInputJobAttachments?: never;
    }
  | {
      envEnter?: never;
      envExit?: never;
      taskRun?: never;
      syncInputJobAttachments: SyncInputJobAttachmentsSessionActionDefinitionSummary;
    };
export interface SessionActionSummary {
  sessionActionId: string;
  status: SessionActionStatus;
  startedAt?: Date;
  endedAt?: Date;
  workerUpdatedAt?: Date;
  progressPercent?: number;
  manifests?: TaskRunManifestPropertiesResponse[];
  definition: SessionActionDefinitionSummary;
}
export type SessionActionSummaries = SessionActionSummary[];
export interface ListSessionActionsResponse {
  sessionActions: SessionActionSummary[];
  nextToken?: string;
}
export interface ListSessionsRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface SessionSummary {
  sessionId: string;
  fleetId: string;
  workerId: string;
  startedAt: Date;
  lifecycleStatus: SessionLifecycleStatus;
  endedAt?: Date;
  targetLifecycleStatus?: SessionLifecycleTargetStatus;
  updatedAt?: Date;
  updatedBy?: string;
}
export type SessionSummaries = SessionSummary[];
export interface ListSessionsResponse {
  sessions: SessionSummary[];
  nextToken?: string;
}
export interface ListSessionsForWorkerRequest {
  farmId: string;
  fleetId: string;
  workerId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface WorkerSessionSummary {
  sessionId: string;
  queueId: string;
  jobId: string;
  startedAt: Date;
  lifecycleStatus: SessionLifecycleStatus;
  endedAt?: Date;
  targetLifecycleStatus?: SessionLifecycleTargetStatus;
}
export type ListSessionsForWorkerSummaries = WorkerSessionSummary[];
export interface ListSessionsForWorkerResponse {
  sessions: WorkerSessionSummary[];
  nextToken?: string;
}
export interface ListStepConsumersRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  stepId: string;
  nextToken?: string;
  maxResults?: number;
}
export type DependencyConsumerResolutionStatus =
  | "RESOLVED"
  | "UNRESOLVED"
  | (string & {});
export interface StepConsumer {
  stepId: string;
  status: DependencyConsumerResolutionStatus;
}
export type StepConsumers = StepConsumer[];
export interface ListStepConsumersResponse {
  consumers: StepConsumer[];
  nextToken?: string;
}
export interface ListStepDependenciesRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  stepId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface StepDependency {
  stepId: string;
  status: DependencyConsumerResolutionStatus;
}
export type StepDependencies = StepDependency[];
export interface ListStepDependenciesResponse {
  dependencies: StepDependency[];
  nextToken?: string;
}
export interface ListStepsRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface StepSummary {
  stepId: string;
  name: string;
  lifecycleStatus: StepLifecycleStatus;
  lifecycleStatusMessage?: string;
  taskRunStatus: TaskRunStatus;
  taskRunStatusCounts: { [key: string]: number | undefined };
  taskFailureRetryCount?: number;
  targetTaskRunStatus?: StepTargetTaskRunStatus;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  startedAt?: Date;
  endedAt?: Date;
  dependencyCounts?: DependencyCounts;
}
export type StepSummaries = StepSummary[];
export interface ListStepsResponse {
  steps: StepSummary[];
  nextToken?: string;
}
export interface ListStorageProfilesRequest {
  farmId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface StorageProfileSummary {
  storageProfileId: string;
  displayName: string;
  osFamily: StorageProfileOperatingSystemFamily;
}
export type StorageProfileSummaries = StorageProfileSummary[];
export interface ListStorageProfilesResponse {
  storageProfiles: StorageProfileSummary[];
  nextToken?: string;
}
export interface ListStorageProfilesForQueueRequest {
  farmId: string;
  queueId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ListStorageProfilesForQueueResponse {
  storageProfiles: StorageProfileSummary[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface ListTasksRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  stepId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface TaskSummary {
  taskId: string;
  createdAt: Date;
  createdBy: string;
  runStatus: TaskRunStatus;
  targetRunStatus?: TaskTargetRunStatus;
  failureRetryCount?: number;
  startedAt?: Date;
  endedAt?: Date;
  updatedAt?: Date;
  updatedBy?: string;
  latestSessionActionId?: string;
  parameters?: { [key: string]: TaskParameterValue | undefined };
}
export type TaskSummaries = TaskSummary[];
export interface ListTasksResponse {
  tasks: TaskSummary[];
  nextToken?: string;
}
export interface ListVolumesRequest {
  farmId: string;
  fleetId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface VolumeSummary {
  volumeId: string;
  farmId: string;
  fleetId: string;
  state: VolumeState;
  sizeGiB: number;
  availabilityZoneId: string;
  attachedWorkerId?: string;
}
export type VolumeSummaries = VolumeSummary[];
export interface ListVolumesResponse {
  volumes: VolumeSummary[];
  nextToken?: string;
}
export interface ListWorkersRequest {
  farmId: string;
  fleetId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface WorkerSummary {
  farmId: string;
  fleetId: string;
  workerId: string;
  hostProperties?: HostPropertiesResponse;
  status: WorkerStatus;
  log?: LogConfiguration;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export type WorkerSummaries = WorkerSummary[];
export interface ListWorkersResponse {
  workers: WorkerSummary[];
  nextToken?: string;
}
export interface PutMeteredProductRequest {
  licenseEndpointId: string;
  productId: string;
}
export interface PutMeteredProductResponse {}
export type ComparisonOperator =
  | "EQUAL"
  | "NOT_EQUAL"
  | "GREATER_THAN_EQUAL_TO"
  | "GREATER_THAN"
  | "LESS_THAN_EQUAL_TO"
  | "LESS_THAN"
  | "ANY_EQUALS"
  | "ALL_NOT_EQUALS"
  | (string & {});
export interface DateTimeFilterExpression {
  name: string;
  operator: ComparisonOperator;
  dateTime: Date;
}
export type ParameterValue = string;
export interface ParameterFilterExpression {
  name: string;
  operator: ComparisonOperator;
  value: string;
}
export type SearchTerm = string;
export type SearchTermMatchingType = "FUZZY_MATCH" | "CONTAINS" | (string & {});
export interface SearchTermFilterExpression {
  searchTerm: string;
  matchType?: SearchTermMatchingType;
}
export type StringFilter = string;
export interface StringFilterExpression {
  name: string;
  operator: ComparisonOperator;
  value: string;
}
export type StringFilterList = string[];
export interface StringListFilterExpression {
  name: string;
  operator: ComparisonOperator;
  values: string[];
}
export type SearchFilterExpression =
  | {
      dateTimeFilter: DateTimeFilterExpression;
      parameterFilter?: never;
      searchTermFilter?: never;
      stringFilter?: never;
      stringListFilter?: never;
      groupFilter?: never;
    }
  | {
      dateTimeFilter?: never;
      parameterFilter: ParameterFilterExpression;
      searchTermFilter?: never;
      stringFilter?: never;
      stringListFilter?: never;
      groupFilter?: never;
    }
  | {
      dateTimeFilter?: never;
      parameterFilter?: never;
      searchTermFilter: SearchTermFilterExpression;
      stringFilter?: never;
      stringListFilter?: never;
      groupFilter?: never;
    }
  | {
      dateTimeFilter?: never;
      parameterFilter?: never;
      searchTermFilter?: never;
      stringFilter: StringFilterExpression;
      stringListFilter?: never;
      groupFilter?: never;
    }
  | {
      dateTimeFilter?: never;
      parameterFilter?: never;
      searchTermFilter?: never;
      stringFilter?: never;
      stringListFilter: StringListFilterExpression;
      groupFilter?: never;
    }
  | {
      dateTimeFilter?: never;
      parameterFilter?: never;
      searchTermFilter?: never;
      stringFilter?: never;
      stringListFilter?: never;
      groupFilter: SearchGroupedFilterExpressions;
    };
export type SearchFilterExpressions = SearchFilterExpression[];
export type LogicalOperator = "AND" | "OR" | (string & {});
export interface SearchGroupedFilterExpressions {
  filters: SearchFilterExpression[];
  operator: LogicalOperator;
}
export interface UserJobsFirst {
  userIdentityId: string;
}
export type SortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export interface FieldSortExpression {
  sortOrder: SortOrder;
  name: string;
}
export interface ParameterSortExpression {
  sortOrder: SortOrder;
  name: string;
}
export type SearchSortExpression =
  | { userJobsFirst: UserJobsFirst; fieldSort?: never; parameterSort?: never }
  | {
      userJobsFirst?: never;
      fieldSort: FieldSortExpression;
      parameterSort?: never;
    }
  | {
      userJobsFirst?: never;
      fieldSort?: never;
      parameterSort: ParameterSortExpression;
    };
export type SearchSortExpressions = SearchSortExpression[];
export type QueueIds = string[];
export interface SearchJobsRequest {
  farmId: string;
  filterExpressions?: SearchGroupedFilterExpressions;
  sortExpressions?: SearchSortExpression[];
  itemOffset: number;
  pageSize?: number;
  queueIds: string[];
}
export interface JobSearchSummary {
  jobId?: string;
  queueId?: string;
  name?: string;
  lifecycleStatus?: JobLifecycleStatus;
  lifecycleStatusMessage?: string;
  taskRunStatus?: TaskRunStatus;
  targetTaskRunStatus?: JobTargetTaskRunStatus;
  taskRunStatusCounts?: { [key: string]: number | undefined };
  taskFailureRetryCount?: number;
  priority?: number;
  maxFailedTasksCount?: number;
  maxRetriesPerTask?: number;
  createdBy?: string;
  createdAt?: Date;
  endedAt?: Date;
  startedAt?: Date;
  updatedAt?: Date;
  updatedBy?: string;
  jobParameters?: { [key: string]: JobParameter | undefined };
  maxWorkerCount?: number;
  sourceJobId?: string;
}
export type JobSearchSummaries = JobSearchSummary[];
export type NextItemOffset = number;
export type TotalResults = number;
export interface SearchJobsResponse {
  jobs: JobSearchSummary[];
  nextItemOffset?: number;
  totalResults: number;
}
export interface SearchStepsRequest {
  farmId: string;
  filterExpressions?: SearchGroupedFilterExpressions;
  sortExpressions?: SearchSortExpression[];
  itemOffset: number;
  pageSize?: number;
  queueIds: string[];
  jobId?: string;
}
export interface StepSearchSummary {
  stepId?: string;
  jobId?: string;
  queueId?: string;
  name?: string;
  lifecycleStatus?: StepLifecycleStatus;
  lifecycleStatusMessage?: string;
  taskRunStatus?: TaskRunStatus;
  targetTaskRunStatus?: StepTargetTaskRunStatus;
  taskRunStatusCounts?: { [key: string]: number | undefined };
  taskFailureRetryCount?: number;
  createdAt?: Date;
  createdBy?: string;
  startedAt?: Date;
  endedAt?: Date;
  updatedAt?: Date;
  updatedBy?: string;
  parameterSpace?: ParameterSpace;
}
export type StepSearchSummaries = StepSearchSummary[];
export interface SearchStepsResponse {
  steps: StepSearchSummary[];
  nextItemOffset?: number;
  totalResults: number;
}
export interface SearchTasksRequest {
  farmId: string;
  filterExpressions?: SearchGroupedFilterExpressions;
  sortExpressions?: SearchSortExpression[];
  itemOffset: number;
  pageSize?: number;
  queueIds: string[];
  jobId?: string;
}
export interface TaskSearchSummary {
  taskId?: string;
  stepId?: string;
  jobId?: string;
  queueId?: string;
  runStatus?: TaskRunStatus;
  targetRunStatus?: TaskTargetRunStatus;
  parameters?: { [key: string]: TaskParameterValue | undefined };
  failureRetryCount?: number;
  startedAt?: Date;
  endedAt?: Date;
  updatedAt?: Date;
  updatedBy?: string;
  latestSessionActionId?: string;
}
export type TaskSearchSummaries = TaskSearchSummary[];
export interface SearchTasksResponse {
  tasks: TaskSearchSummary[];
  nextItemOffset?: number;
  totalResults: number;
}
export type FleetIds = string[];
export interface SearchWorkersRequest {
  farmId: string;
  filterExpressions?: SearchGroupedFilterExpressions;
  sortExpressions?: SearchSortExpression[];
  itemOffset: number;
  pageSize?: number;
  fleetIds: string[];
}
export interface WorkerSearchSummary {
  fleetId?: string;
  workerId?: string;
  status?: WorkerStatus;
  hostProperties?: HostPropertiesResponse;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;
}
export type WorkerSearchSummaries = WorkerSearchSummary[];
export interface SearchWorkersResponse {
  workers: WorkerSearchSummary[];
  nextItemOffset?: number;
  totalResults: number;
}
export type SessionsStatisticsResources =
  | { queueIds: string[]; fleetIds?: never }
  | { queueIds?: never; fleetIds: string[] };
export type Timezone = string;
export type Period = "HOURLY" | "DAILY" | "WEEKLY" | "MONTHLY" | (string & {});
export type UsageGroupByField =
  | "QUEUE_ID"
  | "FLEET_ID"
  | "JOB_ID"
  | "USER_ID"
  | "USAGE_TYPE"
  | "INSTANCE_TYPE"
  | "LICENSE_PRODUCT"
  | (string & {});
export type UsageGroupBy = UsageGroupByField[];
export type UsageStatistic = "SUM" | "MIN" | "MAX" | "AVG" | (string & {});
export type UsageStatistics = UsageStatistic[];
export interface StartSessionsStatisticsAggregationRequest {
  farmId: string;
  resourceIds: SessionsStatisticsResources;
  startTime: Date;
  endTime: Date;
  timezone?: string;
  period?: Period;
  groupBy: UsageGroupByField[];
  statistics: UsageStatistic[];
}
export interface StartSessionsStatisticsAggregationResponse {
  aggregationId: string;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags?: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type StringList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface BudgetActionToRemove {
  type: BudgetActionType;
  thresholdPercentage: number;
}
export type BudgetActionsToRemove = BudgetActionToRemove[];
export interface UpdateBudgetRequest {
  farmId: string;
  budgetId: string;
  clientToken?: string;
  displayName?: string;
  description?: string | redacted.Redacted<string>;
  status?: BudgetStatus;
  approximateDollarLimit?: number;
  actionsToAdd?: BudgetActionToAdd[];
  actionsToRemove?: BudgetActionToRemove[];
  schedule?: BudgetSchedule;
}
export interface UpdateBudgetResponse {}
export interface UpdateFarmRequest {
  farmId: string;
  displayName?: string;
  description?: string | redacted.Redacted<string>;
  costScaleFactor?: number;
}
export interface UpdateFarmResponse {}
export interface UpdateFleetRequest {
  farmId: string;
  fleetId: string;
  clientToken?: string;
  displayName?: string;
  description?: string | redacted.Redacted<string>;
  roleArn?: string;
  minWorkerCount?: number;
  maxWorkerCount?: number;
  configuration?: FleetConfiguration;
  hostConfiguration?: HostConfiguration;
}
export interface UpdateFleetResponse {}
export interface UpdateJobRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  clientToken?: string;
  targetTaskRunStatus?: JobTargetTaskRunStatus;
  priority?: number;
  maxFailedTasksCount?: number;
  maxRetriesPerTask?: number;
  lifecycleStatus?: UpdateJobLifecycleStatus;
  maxWorkerCount?: number;
  name?: string;
  description?: string | redacted.Redacted<string>;
}
export interface UpdateJobResponse {}
export interface UpdateLimitRequest {
  farmId: string;
  limitId: string;
  displayName?: string;
  description?: string | redacted.Redacted<string>;
  maxCount?: number;
}
export interface UpdateLimitResponse {}
export interface UpdateMonitorRequest {
  monitorId: string;
  subdomain?: string;
  displayName?: string;
  roleArn?: string;
}
export interface UpdateMonitorResponse {}
export interface UpdateMonitorSettingsRequest {
  monitorId: string;
  settings: { [key: string]: string | undefined };
}
export interface UpdateMonitorSettingsResponse {}
export interface UpdateQueueRequest {
  farmId: string;
  queueId: string;
  clientToken?: string;
  displayName?: string;
  description?: string | redacted.Redacted<string>;
  defaultBudgetAction?: DefaultQueueBudgetAction;
  jobAttachmentSettings?: JobAttachmentSettings;
  roleArn?: string;
  jobRunAsUser?: JobRunAsUser;
  requiredFileSystemLocationNamesToAdd?: string[];
  requiredFileSystemLocationNamesToRemove?: string[];
  allowedStorageProfileIdsToAdd?: string[];
  allowedStorageProfileIdsToRemove?: string[];
  schedulingConfiguration?: SchedulingConfiguration;
}
export interface UpdateQueueResponse {}
export interface UpdateQueueEnvironmentRequest {
  farmId: string;
  queueId: string;
  queueEnvironmentId: string;
  clientToken?: string;
  priority?: number;
  templateType?: EnvironmentTemplateType;
  template?: string | redacted.Redacted<string>;
}
export interface UpdateQueueEnvironmentResponse {}
export type UpdateQueueFleetAssociationStatus =
  | "ACTIVE"
  | "STOP_SCHEDULING_AND_COMPLETE_TASKS"
  | "STOP_SCHEDULING_AND_CANCEL_TASKS"
  | (string & {});
export interface UpdateQueueFleetAssociationRequest {
  farmId: string;
  queueId: string;
  fleetId: string;
  status: UpdateQueueFleetAssociationStatus;
}
export interface UpdateQueueFleetAssociationResponse {}
export type UpdateQueueLimitAssociationStatus =
  | "ACTIVE"
  | "STOP_LIMIT_USAGE_AND_COMPLETE_TASKS"
  | "STOP_LIMIT_USAGE_AND_CANCEL_TASKS"
  | (string & {});
export interface UpdateQueueLimitAssociationRequest {
  farmId: string;
  queueId: string;
  limitId: string;
  status: UpdateQueueLimitAssociationStatus;
}
export interface UpdateQueueLimitAssociationResponse {}
export interface UpdateSessionRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  sessionId: string;
  clientToken?: string;
  targetLifecycleStatus: SessionLifecycleTargetStatus;
}
export interface UpdateSessionResponse {}
export interface UpdateStepRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  stepId: string;
  clientToken?: string;
  targetTaskRunStatus: StepTargetTaskRunStatus;
}
export interface UpdateStepResponse {}
export interface UpdateStorageProfileRequest {
  farmId: string;
  storageProfileId: string;
  clientToken?: string;
  displayName?: string;
  osFamily?: StorageProfileOperatingSystemFamily;
  fileSystemLocationsToAdd?: FileSystemLocation[];
  fileSystemLocationsToRemove?: FileSystemLocation[];
}
export interface UpdateStorageProfileResponse {}
export interface UpdateTaskRequest {
  farmId: string;
  queueId: string;
  jobId: string;
  stepId: string;
  taskId: string;
  clientToken?: string;
  targetRunStatus: TaskTargetRunStatus;
}
export interface UpdateTaskResponse {}
export type UpdatedWorkerStatus =
  | "STARTED"
  | "STOPPING"
  | "STOPPED"
  | (string & {});
export interface WorkerAmountCapability {
  name: string;
  value: number;
}
export type WorkerAmountCapabilityList = WorkerAmountCapability[];
export interface WorkerAttributeCapability {
  name: string;
  values: string[];
}
export type WorkerAttributeCapabilityList = WorkerAttributeCapability[];
export interface WorkerCapabilities {
  amounts: WorkerAmountCapability[];
  attributes: WorkerAttributeCapability[];
}
export interface UpdateWorkerRequest {
  farmId: string;
  fleetId: string;
  workerId: string;
  status?: UpdatedWorkerStatus;
  capabilities?: WorkerCapabilities;
  hostProperties?: HostPropertiesRequest;
}
export interface UpdateWorkerResponse {
  log?: LogConfiguration;
  hostConfiguration?: HostConfiguration;
}
export type CompletedStatus =
  | "SUCCEEDED"
  | "FAILED"
  | "INTERRUPTED"
  | "CANCELED"
  | "NEVER_ATTEMPTED"
  | (string & {});
export interface TaskRunManifestPropertiesRequest {
  outputManifestPath?: string;
  outputManifestHash?: string;
}
export type TaskRunManifestPropertiesListRequest =
  TaskRunManifestPropertiesRequest[];
export interface UpdatedSessionActionInfo {
  completedStatus?: CompletedStatus;
  processExitCode?: number;
  progressMessage?: string | redacted.Redacted<string>;
  startedAt?: Date;
  endedAt?: Date;
  updatedAt?: Date;
  progressPercent?: number;
  manifests?: TaskRunManifestPropertiesRequest[];
}
export type UpdatedSessionActions = {
  [key: string]: UpdatedSessionActionInfo | undefined;
};
export interface UpdateWorkerScheduleRequest {
  farmId: string;
  fleetId: string;
  workerId: string;
  updatedSessionActions?: {
    [key: string]: UpdatedSessionActionInfo | undefined;
  };
}
export interface AssignedEnvironmentEnterSessionActionDefinition {
  environmentId: string;
}
export interface AssignedEnvironmentExitSessionActionDefinition {
  environmentId: string;
}
export interface AssignedTaskRunSessionActionDefinition {
  taskId?: string;
  stepId: string;
  parameters: { [key: string]: TaskParameterValue | undefined };
}
export interface AssignedSyncInputJobAttachmentsSessionActionDefinition {
  stepId?: string;
}
export type AssignedSessionActionDefinition =
  | {
      envEnter: AssignedEnvironmentEnterSessionActionDefinition;
      envExit?: never;
      taskRun?: never;
      syncInputJobAttachments?: never;
    }
  | {
      envEnter?: never;
      envExit: AssignedEnvironmentExitSessionActionDefinition;
      taskRun?: never;
      syncInputJobAttachments?: never;
    }
  | {
      envEnter?: never;
      envExit?: never;
      taskRun: AssignedTaskRunSessionActionDefinition;
      syncInputJobAttachments?: never;
    }
  | {
      envEnter?: never;
      envExit?: never;
      taskRun?: never;
      syncInputJobAttachments: AssignedSyncInputJobAttachmentsSessionActionDefinition;
    };
export interface AssignedSessionAction {
  sessionActionId: string;
  definition: AssignedSessionActionDefinition;
}
export type AssignedSessionActions = AssignedSessionAction[];
export interface AssignedSession {
  queueId: string;
  jobId: string;
  sessionActions: AssignedSessionAction[];
  logConfiguration: LogConfiguration;
}
export type AssignedSessions = { [key: string]: AssignedSession | undefined };
export type SessionActionIdList = string[];
export type CancelSessionActions = { [key: string]: string[] | undefined };
export type DesiredWorkerStatus = "STOPPED" | (string & {});
export type UpdateWorkerScheduleInterval = number;
export interface UpdateWorkerScheduleResponse {
  assignedSessions: { [key: string]: AssignedSession | undefined };
  cancelSessionActions: { [key: string]: string[] | undefined };
  desiredWorkerStatus?: DesiredWorkerStatus;
  updateIntervalSeconds: number;
}
export type ExceptionContext = { [key: string]: string | undefined };
export type ServiceQuotaExceededExceptionReason =
  | "SERVICE_QUOTA_EXCEEDED_EXCEPTION"
  | "KMS_KEY_LIMIT_EXCEEDED"
  | "DEPENDENCY_LIMIT_EXCEEDED"
  | (string & {});
export type ValidationExceptionReason =
  | "UNKNOWN_OPERATION"
  | "CANNOT_PARSE"
  | "FIELD_VALIDATION_FAILED"
  | "OTHER"
  | (string & {});
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type ConflictExceptionReason =
  | "CONFLICT_EXCEPTION"
  | "CONCURRENT_MODIFICATION"
  | "RESOURCE_ALREADY_EXISTS"
  | "RESOURCE_IN_USE"
  | "STATUS_CONFLICT"
  | (string & {});
export type AssociateMemberToFarmError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Assigns a farm membership level to a member.
 */
export const associateMemberToFarm: API.OperationMethod<
  AssociateMemberToFarmRequest,
  AssociateMemberToFarmResponse,
  AssociateMemberToFarmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2023-10-12/farms/{farmId}/members/{principalId}",
    input: {
      farmId: 0,
      principalType: 0,
      identityStoreId: 0,
      membershipLevel: 0,
      principalId: 0,
      identityCenterRegion: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateMemberToFarm",
  endpointHostPrefix: "management.",
})) as any;

export type AssociateMemberToFleetError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Assigns a fleet membership level to a member.
 */
export const associateMemberToFleet: API.OperationMethod<
  AssociateMemberToFleetRequest,
  AssociateMemberToFleetResponse,
  AssociateMemberToFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2023-10-12/farms/{farmId}/fleets/{fleetId}/members/{principalId}",
    input: {
      farmId: 0,
      fleetId: 0,
      principalType: 0,
      identityStoreId: 0,
      membershipLevel: 0,
      principalId: 0,
      identityCenterRegion: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateMemberToFleet",
  endpointHostPrefix: "management.",
})) as any;

export type AssociateMemberToJobError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Assigns a job membership level to a member
 */
export const associateMemberToJob: API.OperationMethod<
  AssociateMemberToJobRequest,
  AssociateMemberToJobResponse,
  AssociateMemberToJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/members/{principalId}",
    input: {
      farmId: 0,
      queueId: 0,
      jobId: 0,
      principalType: 0,
      identityStoreId: 0,
      membershipLevel: 0,
      principalId: 0,
      identityCenterRegion: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateMemberToJob",
  endpointHostPrefix: "management.",
})) as any;

export type AssociateMemberToQueueError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Assigns a queue membership level to a member
 */
export const associateMemberToQueue: API.OperationMethod<
  AssociateMemberToQueueRequest,
  AssociateMemberToQueueResponse,
  AssociateMemberToQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2023-10-12/farms/{farmId}/queues/{queueId}/members/{principalId}",
    input: {
      farmId: 0,
      queueId: 0,
      principalType: 0,
      identityStoreId: 0,
      membershipLevel: 0,
      principalId: 0,
      identityCenterRegion: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateMemberToQueue",
  endpointHostPrefix: "management.",
})) as any;

export type AssumeFleetRoleForReadError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get Amazon Web Services credentials from the fleet role. The IAM permissions of the credentials are scoped down to have read-only access.
 */
export const assumeFleetRoleForRead: API.OperationMethod<
  AssumeFleetRoleForReadRequest,
  AssumeFleetRoleForReadResponse,
  AssumeFleetRoleForReadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/fleets/{fleetId}/read-roles",
    input: { farmId: 0, fleetId: 0 },
    output: { credentials: o_AwsCredentials },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssumeFleetRoleForRead",
  endpointHostPrefix: "management.",
})) as any;

export type AssumeFleetRoleForWorkerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get credentials from the fleet role for a worker.
 */
export const assumeFleetRoleForWorker: API.OperationMethod<
  AssumeFleetRoleForWorkerRequest,
  AssumeFleetRoleForWorkerResponse,
  AssumeFleetRoleForWorkerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/fleets/{fleetId}/workers/{workerId}/fleet-roles",
    input: { farmId: 0, fleetId: 0, workerId: 0 },
    output: { credentials: o_AwsCredentials },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssumeFleetRoleForWorker",
  endpointHostPrefix: "scheduling.",
})) as any;

export type AssumeQueueRoleForReadError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets Amazon Web Services credentials from the queue role. The IAM permissions of the credentials are scoped down to have read-only access.
 */
export const assumeQueueRoleForRead: API.OperationMethod<
  AssumeQueueRoleForReadRequest,
  AssumeQueueRoleForReadResponse,
  AssumeQueueRoleForReadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/queues/{queueId}/read-roles",
    input: { farmId: 0, queueId: 0 },
    output: { credentials: o_AwsCredentials },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssumeQueueRoleForRead",
  endpointHostPrefix: "management.",
})) as any;

export type AssumeQueueRoleForUserError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows a user to assume a role for a queue.
 */
export const assumeQueueRoleForUser: API.OperationMethod<
  AssumeQueueRoleForUserRequest,
  AssumeQueueRoleForUserResponse,
  AssumeQueueRoleForUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/queues/{queueId}/user-roles",
    input: { farmId: 0, queueId: 0 },
    output: { credentials: o_AwsCredentials },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssumeQueueRoleForUser",
  endpointHostPrefix: "management.",
})) as any;

export type AssumeQueueRoleForWorkerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows a worker to assume a queue role.
 */
export const assumeQueueRoleForWorker: API.OperationMethod<
  AssumeQueueRoleForWorkerRequest,
  AssumeQueueRoleForWorkerResponse,
  AssumeQueueRoleForWorkerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/fleets/{fleetId}/workers/{workerId}/queue-roles",
    input: {
      farmId: 0,
      fleetId: 0,
      workerId: 0,
      queueId: D.m({ query: "queueId" }),
    },
    output: { credentials: o_AwsCredentials },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssumeQueueRoleForWorker",
  endpointHostPrefix: "scheduling.",
})) as any;

export type BatchGetJobError =
  | AccessDeniedException
  | InternalServerErrorException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves multiple jobs in a single request. This is a batch version of the `GetJob` API.
 *
 * The result of getting each job is reported individually in the response. Because the batch request can result in a combination of successful and unsuccessful actions, you should check for batch errors even when the call returns an HTTP status code of 200.
 */
export const batchGetJob: API.OperationMethod<
  BatchGetJobRequest,
  BatchGetJobResponse,
  BatchGetJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2023-10-12/batch-get-job",
    input: { identifiers: D.list({ farmId: 0, queueId: 0, jobId: 0 }) },
    output: {
      jobs: D.list({
        createdAt: D.ts,
        updatedAt: D.ts,
        startedAt: D.ts,
        endedAt: D.ts,
        description: D.secret,
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetJob",
  endpointHostPrefix: "management.",
})) as any;

export type BatchGetJobEntityError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get batched job details for a worker.
 */
export const batchGetJobEntity: API.OperationMethod<
  BatchGetJobEntityRequest,
  BatchGetJobEntityResponse,
  BatchGetJobEntityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2023-10-12/farms/{farmId}/fleets/{fleetId}/workers/{workerId}/batchGetJobEntity",
    input: {
      farmId: 0,
      fleetId: 0,
      workerId: 0,
      identifiers: D.list({
        jobDetails: { jobId: 0 },
        jobAttachmentDetails: { jobId: 0 },
        stepDetails: { jobId: 0, stepId: 0 },
        environmentDetails: { jobId: 0, environmentId: 0 },
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetJobEntity",
  endpointHostPrefix: "scheduling.",
})) as any;

export type BatchGetSessionError =
  | AccessDeniedException
  | InternalServerErrorException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves multiple sessions in a single request. This is a batch version of the `GetSession` API.
 *
 * The result of getting each session is reported individually in the response. Because the batch request can result in a combination of successful and unsuccessful actions, you should check for batch errors even when the call returns an HTTP status code of 200.
 */
export const batchGetSession: API.OperationMethod<
  BatchGetSessionRequest,
  BatchGetSessionResponse,
  BatchGetSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2023-10-12/batch-get-session",
    input: {
      identifiers: D.list({ farmId: 0, queueId: 0, jobId: 0, sessionId: 0 }),
    },
    output: {
      sessions: D.list({ startedAt: D.ts, endedAt: D.ts, updatedAt: D.ts }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetSession",
  endpointHostPrefix: "management.",
})) as any;

export type BatchGetSessionActionError =
  | AccessDeniedException
  | InternalServerErrorException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves multiple session actions in a single request. This is a batch version of the `GetSessionAction` API.
 *
 * The result of getting each session action is reported individually in the response. Because the batch request can result in a combination of successful and unsuccessful actions, you should check for batch errors even when the call returns an HTTP status code of 200.
 */
export const batchGetSessionAction: API.OperationMethod<
  BatchGetSessionActionRequest,
  BatchGetSessionActionResponse,
  BatchGetSessionActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2023-10-12/batch-get-session-action",
    input: {
      identifiers: D.list({
        farmId: 0,
        queueId: 0,
        jobId: 0,
        sessionActionId: 0,
      }),
    },
    output: {
      sessionActions: D.list({
        startedAt: D.ts,
        endedAt: D.ts,
        workerUpdatedAt: D.ts,
        progressMessage: D.secret,
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetSessionAction",
  endpointHostPrefix: "management.",
})) as any;

export type BatchGetStepError =
  | AccessDeniedException
  | InternalServerErrorException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves multiple steps in a single request. This is a batch version of the `GetStep` API.
 *
 * The result of getting each step is reported individually in the response. Because the batch request can result in a combination of successful and unsuccessful actions, you should check for batch errors even when the call returns an HTTP status code of 200.
 */
export const batchGetStep: API.OperationMethod<
  BatchGetStepRequest,
  BatchGetStepResponse,
  BatchGetStepError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2023-10-12/batch-get-step",
    input: {
      identifiers: D.list({ farmId: 0, queueId: 0, jobId: 0, stepId: 0 }),
    },
    output: {
      steps: D.list({
        createdAt: D.ts,
        updatedAt: D.ts,
        startedAt: D.ts,
        endedAt: D.ts,
        description: D.secret,
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetStep",
  endpointHostPrefix: "management.",
})) as any;

export type BatchGetTaskError =
  | AccessDeniedException
  | InternalServerErrorException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves multiple tasks in a single request. This is a batch version of the `GetTask` API.
 *
 * The result of getting each task is reported individually in the response. Because the batch request can result in a combination of successful and unsuccessful actions, you should check for batch errors even when the call returns an HTTP status code of 200.
 */
export const batchGetTask: API.OperationMethod<
  BatchGetTaskRequest,
  BatchGetTaskResponse,
  BatchGetTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2023-10-12/batch-get-task",
    input: {
      identifiers: D.list({
        farmId: 0,
        queueId: 0,
        jobId: 0,
        stepId: 0,
        taskId: 0,
      }),
    },
    output: {
      tasks: D.list({
        createdAt: D.ts,
        startedAt: D.ts,
        endedAt: D.ts,
        updatedAt: D.ts,
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetTask",
  endpointHostPrefix: "management.",
})) as any;

export type BatchGetWorkerError =
  | AccessDeniedException
  | InternalServerErrorException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves multiple workers in a single request. This is a batch version of the `GetWorker` API.
 *
 * The result of getting each worker is reported individually in the response. Because the batch request can result in a combination of successful and unsuccessful actions, you should check for batch errors even when the call returns an HTTP status code of 200.
 */
export const batchGetWorker: API.OperationMethod<
  BatchGetWorkerRequest,
  BatchGetWorkerResponse,
  BatchGetWorkerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2023-10-12/batch-get-worker",
    input: { identifiers: D.list({ farmId: 0, fleetId: 0, workerId: 0 }) },
    output: { workers: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetWorker",
  endpointHostPrefix: "management.",
})) as any;

export type BatchUpdateJobError =
  | AccessDeniedException
  | InternalServerErrorException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates multiple jobs in a single request. This is a batch version of the `UpdateJob` API.
 *
 * The result of updating each job is reported individually in the response. Because the batch request can result in a combination of successful and unsuccessful actions, you should check for batch errors even when the call returns an HTTP status code of 200.
 *
 * When you change the status of a job to `ARCHIVED`, the job can't be scheduled or archived.
 *
 * An archived job and its steps and tasks are deleted after 120 days. The job can't be recovered.
 */
export const batchUpdateJob: API.OperationMethod<
  BatchUpdateJobRequest,
  BatchUpdateJobResponse,
  BatchUpdateJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /2023-10-12/batch-update-job",
    input: {
      clientToken: D.m({ header: "X-Amz-Client-Token", idempotency: true }),
      jobs: D.list({
        farmId: 0,
        queueId: 0,
        jobId: 0,
        targetTaskRunStatus: 0,
        priority: 0,
        maxFailedTasksCount: 0,
        maxRetriesPerTask: 0,
        lifecycleStatus: 0,
        maxWorkerCount: 0,
        name: 0,
        description: 0,
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateJob",
  endpointHostPrefix: "management.",
})) as any;

export type BatchUpdateTaskError =
  | AccessDeniedException
  | InternalServerErrorException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates multiple tasks in a single request. This is a batch version of the `UpdateTask` API.
 *
 * The result of updating each task is reported individually in the response. Because the batch request can result in a combination of successful and unsuccessful actions, you should check for batch errors even when the call returns an HTTP status code of 200.
 */
export const batchUpdateTask: API.OperationMethod<
  BatchUpdateTaskRequest,
  BatchUpdateTaskResponse,
  BatchUpdateTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /2023-10-12/batch-update-task",
    input: {
      clientToken: D.m({ header: "X-Amz-Client-Token", idempotency: true }),
      tasks: D.list({
        farmId: 0,
        queueId: 0,
        jobId: 0,
        stepId: 0,
        taskId: 0,
        targetRunStatus: 0,
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateTask",
  endpointHostPrefix: "management.",
})) as any;

export type CopyJobTemplateError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Copies a job template to an Amazon S3 bucket.
 */
export const copyJobTemplate: API.OperationMethod<
  CopyJobTemplateRequest,
  CopyJobTemplateResponse,
  CopyJobTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/template",
    input: {
      farmId: 0,
      queueId: 0,
      jobId: 0,
      targetS3Location: { bucketName: 0, key: 0 },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopyJobTemplate",
  endpointHostPrefix: "management.",
})) as any;

export type CreateBudgetError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | ConflictException
  | CommonErrors;
/**
 * Creates a budget to set spending thresholds for your rendering activity.
 */
export const createBudget: API.OperationMethod<
  CreateBudgetRequest,
  CreateBudgetResponse,
  CreateBudgetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2023-10-12/farms/{farmId}/budgets",
    input: {
      farmId: 0,
      displayName: 0,
      description: 0,
      clientToken: D.m({ header: "X-Amz-Client-Token", idempotency: true }),
      usageTrackingResource: { queueId: 0 },
      approximateDollarLimit: 0,
      actions: D.list(i_BudgetActionToAdd),
      schedule: i_BudgetSchedule,
      tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    ConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBudget",
  endpointHostPrefix: "management.",
})) as any;

export type CreateFarmError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a farm to allow space for queues and fleets. Farms are the space where the components of your renders gather and are pieced together in the cloud. Farms contain budgets and allow you to enforce permissions. Deadline Cloud farms are a useful container for large projects.
 */
export const createFarm: API.OperationMethod<
  CreateFarmRequest,
  CreateFarmResponse,
  CreateFarmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2023-10-12/farms",
    input: {
      clientToken: D.m({ header: "X-Amz-Client-Token", idempotency: true }),
      displayName: 0,
      description: 0,
      kmsKeyArn: 0,
      costScaleFactor: 0,
      tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFarm",
  endpointHostPrefix: "management.",
})) as any;

export type CreateFleetError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | ConflictException
  | CommonErrors;
/**
 * Creates a fleet. Fleets gather information relating to compute, or capacity, for renders within your farms. You can choose to manage your own capacity or opt to have fleets fully managed by Deadline Cloud.
 */
export const createFleet: API.OperationMethod<
  CreateFleetRequest,
  CreateFleetResponse,
  CreateFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2023-10-12/farms/{farmId}/fleets",
    input: {
      farmId: 0,
      clientToken: D.m({ header: "X-Amz-Client-Token", idempotency: true }),
      displayName: 0,
      description: 0,
      roleArn: 0,
      minWorkerCount: 0,
      maxWorkerCount: 0,
      configuration: i_FleetConfiguration,
      tags: 0,
      hostConfiguration: i_HostConfiguration,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    ConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFleet",
  endpointHostPrefix: "management.",
})) as any;

export type CreateJobError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a job. A job is a set of instructions that Deadline Cloud uses to schedule and run work on available workers. For more information, see Deadline Cloud jobs.
 */
export const createJob: API.OperationMethod<
  CreateJobRequest,
  CreateJobResponse,
  CreateJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2023-10-12/farms/{farmId}/queues/{queueId}/jobs",
    input: {
      farmId: 0,
      queueId: 0,
      clientToken: D.m({ header: "X-Amz-Client-Token", idempotency: true }),
      template: 0,
      templateType: 0,
      priority: 0,
      parameters: D.map({ int: 0, float: 0, string: 0, path: 0 }),
      attachments: {
        manifests: D.list({
          fileSystemLocationName: 0,
          rootPath: 0,
          rootPathFormat: 0,
          outputRelativeDirectories: 0,
          inputManifestPath: 0,
          inputManifestHash: 0,
        }),
        fileSystem: 0,
      },
      storageProfileId: 0,
      targetTaskRunStatus: 0,
      maxFailedTasksCount: 0,
      maxRetriesPerTask: 0,
      maxWorkerCount: 0,
      sourceJobId: 0,
      nameOverride: 0,
      descriptionOverride: 0,
      tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateJob",
  endpointHostPrefix: "management.",
})) as any;

export type CreateLicenseEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a license endpoint to integrate your various licensed software used for rendering on Deadline Cloud.
 */
export const createLicenseEndpoint: API.OperationMethod<
  CreateLicenseEndpointRequest,
  CreateLicenseEndpointResponse,
  CreateLicenseEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2023-10-12/license-endpoints",
    input: {
      clientToken: D.m({ header: "X-Amz-Client-Token", idempotency: true }),
      vpcId: 0,
      subnetIds: 0,
      securityGroupIds: 0,
      tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLicenseEndpoint",
  endpointHostPrefix: "management.",
})) as any;

export type CreateLimitError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a limit that manages the distribution of shared resources, such as floating licenses. A limit can throttle work assignments, help manage workloads, and track current usage. Before you use a limit, you must associate the limit with one or more queues.
 *
 * You must add the `amountRequirementName` to a step in a job template to declare the limit requirement.
 */
export const createLimit: API.OperationMethod<
  CreateLimitRequest,
  CreateLimitResponse,
  CreateLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2023-10-12/farms/{farmId}/limits",
    input: {
      farmId: 0,
      clientToken: D.m({ header: "X-Amz-Client-Token", idempotency: true }),
      displayName: 0,
      amountRequirementName: 0,
      maxCount: 0,
      description: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLimit",
  endpointHostPrefix: "management.",
})) as any;

export type CreateMonitorError =
  | AccessDeniedException
  | InternalServerErrorException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | ConflictException
  | CommonErrors;
/**
 * Creates an Amazon Web Services Deadline Cloud monitor that you can use to view your farms, queues, and fleets. After you submit a job, you can track the progress of the tasks and steps that make up the job, and then download the job's results.
 */
export const createMonitor: API.OperationMethod<
  CreateMonitorRequest,
  CreateMonitorResponse,
  CreateMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2023-10-12/monitors",
    input: {
      clientToken: D.m({ header: "X-Amz-Client-Token", idempotency: true }),
      displayName: 0,
      identityCenterInstanceArn: 0,
      identityCenterRegion: 0,
      subdomain: 0,
      roleArn: 0,
      tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    ConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMonitor",
  endpointHostPrefix: "management.",
})) as any;

export type CreateQueueError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | ConflictException
  | CommonErrors;
/**
 * Creates a queue to coordinate the order in which jobs run on a farm. A queue can also specify where to pull resources and indicate where to output completed jobs.
 */
export const createQueue: API.OperationMethod<
  CreateQueueRequest,
  CreateQueueResponse,
  CreateQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2023-10-12/farms/{farmId}/queues",
    input: {
      farmId: 0,
      clientToken: D.m({ header: "X-Amz-Client-Token", idempotency: true }),
      displayName: 0,
      description: 0,
      defaultBudgetAction: 0,
      jobAttachmentSettings: i_JobAttachmentSettings,
      roleArn: 0,
      jobRunAsUser: i_JobRunAsUser,
      requiredFileSystemLocationNames: 0,
      allowedStorageProfileIds: 0,
      tags: 0,
      schedulingConfiguration: i_SchedulingConfiguration,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    ConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateQueue",
  endpointHostPrefix: "management.",
})) as any;

export type CreateQueueEnvironmentError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an environment for a queue that defines how jobs in the queue run.
 */
export const createQueueEnvironment: API.OperationMethod<
  CreateQueueEnvironmentRequest,
  CreateQueueEnvironmentResponse,
  CreateQueueEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2023-10-12/farms/{farmId}/queues/{queueId}/environments",
    input: {
      farmId: 0,
      queueId: 0,
      clientToken: D.m({ header: "X-Amz-Client-Token", idempotency: true }),
      priority: 0,
      templateType: 0,
      template: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateQueueEnvironment",
  endpointHostPrefix: "management.",
})) as any;

export type CreateQueueFleetAssociationError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an association between a queue and a fleet.
 */
export const createQueueFleetAssociation: API.OperationMethod<
  CreateQueueFleetAssociationRequest,
  CreateQueueFleetAssociationResponse,
  CreateQueueFleetAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2023-10-12/farms/{farmId}/queue-fleet-associations",
    input: { farmId: 0, queueId: 0, fleetId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateQueueFleetAssociation",
  endpointHostPrefix: "management.",
})) as any;

export type CreateQueueLimitAssociationError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a limit with a particular queue. After the limit is associated, all workers for jobs that specify the limit associated with the queue are subject to the limit. You can't associate two limits with the same `amountRequirementName` to the same queue.
 */
export const createQueueLimitAssociation: API.OperationMethod<
  CreateQueueLimitAssociationRequest,
  CreateQueueLimitAssociationResponse,
  CreateQueueLimitAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2023-10-12/farms/{farmId}/queue-limit-associations",
    input: { farmId: 0, queueId: 0, limitId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateQueueLimitAssociation",
  endpointHostPrefix: "management.",
})) as any;

export type CreateStorageProfileError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | ConflictException
  | CommonErrors;
/**
 * Creates a storage profile that specifies the operating system, file type, and file location of resources used on a farm.
 */
export const createStorageProfile: API.OperationMethod<
  CreateStorageProfileRequest,
  CreateStorageProfileResponse,
  CreateStorageProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2023-10-12/farms/{farmId}/storage-profiles",
    input: {
      farmId: 0,
      clientToken: D.m({ header: "X-Amz-Client-Token", idempotency: true }),
      displayName: 0,
      osFamily: 0,
      fileSystemLocations: D.list(i_FileSystemLocation),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    ConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStorageProfile",
  endpointHostPrefix: "management.",
})) as any;

export type CreateWorkerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a worker. A worker tells your instance how much processing power (vCPU), and memory (GiB) you’ll need to assemble the digital assets held within a particular instance. You can specify certain instance types to use, or let the worker know which instances types to exclude.
 *
 * Deadline Cloud limits the number of workers to less than or equal to the fleet's maximum worker count. The service maintains eventual consistency for the worker count. If you make multiple rapid calls to `CreateWorker` before the field updates, you might exceed your fleet's maximum worker count. For example, if your `maxWorkerCount` is 10 and you currently have 9 workers, making two quick `CreateWorker` calls might successfully create 2 workers instead of 1, resulting in 11 total workers.
 */
export const createWorker: API.OperationMethod<
  CreateWorkerRequest,
  CreateWorkerResponse,
  CreateWorkerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2023-10-12/farms/{farmId}/fleets/{fleetId}/workers",
    input: {
      farmId: 0,
      fleetId: 0,
      hostProperties: i_HostPropertiesRequest,
      clientToken: D.m({ header: "X-Amz-Client-Token", idempotency: true }),
      tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorker",
  endpointHostPrefix: "scheduling.",
})) as any;

export type DeleteBudgetError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | ConflictException
  | CommonErrors;
/**
 * Deletes a budget.
 */
export const deleteBudget: API.OperationMethod<
  DeleteBudgetRequest,
  DeleteBudgetResponse,
  DeleteBudgetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2023-10-12/farms/{farmId}/budgets/{budgetId}",
    input: { farmId: 0, budgetId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    ConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBudget",
  endpointHostPrefix: "management.",
})) as any;

export type DeleteFarmError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | ConflictException
  | CommonErrors;
/**
 * Deletes a farm.
 */
export const deleteFarm: API.OperationMethod<
  DeleteFarmRequest,
  DeleteFarmResponse,
  DeleteFarmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2023-10-12/farms/{farmId}",
    input: { farmId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    ConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFarm",
  endpointHostPrefix: "management.",
})) as any;

export type DeleteFleetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a fleet.
 */
export const deleteFleet: API.OperationMethod<
  DeleteFleetRequest,
  DeleteFleetResponse,
  DeleteFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2023-10-12/farms/{farmId}/fleets/{fleetId}",
    input: {
      farmId: 0,
      fleetId: 0,
      clientToken: D.m({ header: "X-Amz-Client-Token", idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFleet",
  endpointHostPrefix: "management.",
})) as any;

export type DeleteLicenseEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a license endpoint.
 */
export const deleteLicenseEndpoint: API.OperationMethod<
  DeleteLicenseEndpointRequest,
  DeleteLicenseEndpointResponse,
  DeleteLicenseEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2023-10-12/license-endpoints/{licenseEndpointId}",
    input: { licenseEndpointId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLicenseEndpoint",
  endpointHostPrefix: "management.",
})) as any;

export type DeleteLimitError =
  | AccessDeniedException
  | InternalServerErrorException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a limit from the specified farm. Before you delete a limit you must use the `DeleteQueueLimitAssociation` operation to remove the association with any queues.
 */
export const deleteLimit: API.OperationMethod<
  DeleteLimitRequest,
  DeleteLimitResponse,
  DeleteLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2023-10-12/farms/{farmId}/limits/{limitId}",
    input: { farmId: 0, limitId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLimit",
  endpointHostPrefix: "management.",
})) as any;

export type DeleteMeteredProductError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a metered product.
 */
export const deleteMeteredProduct: API.OperationMethod<
  DeleteMeteredProductRequest,
  DeleteMeteredProductResponse,
  DeleteMeteredProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2023-10-12/license-endpoints/{licenseEndpointId}/metered-products/{productId}",
    input: { licenseEndpointId: 0, productId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMeteredProduct",
  endpointHostPrefix: "management.",
})) as any;

export type DeleteMonitorError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | ConflictException
  | CommonErrors;
/**
 * Removes a Deadline Cloud monitor. After you delete a monitor, you can create a new one and attach farms to the monitor.
 */
export const deleteMonitor: API.OperationMethod<
  DeleteMonitorRequest,
  DeleteMonitorResponse,
  DeleteMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2023-10-12/monitors/{monitorId}",
    input: { monitorId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    ConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMonitor",
  endpointHostPrefix: "management.",
})) as any;

export type DeleteQueueError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a queue.
 *
 * You can't recover the jobs in a queue if you delete the queue. Deleting the queue also deletes the jobs in that queue.
 */
export const deleteQueue: API.OperationMethod<
  DeleteQueueRequest,
  DeleteQueueResponse,
  DeleteQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2023-10-12/farms/{farmId}/queues/{queueId}",
    input: { farmId: 0, queueId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQueue",
  endpointHostPrefix: "management.",
})) as any;

export type DeleteQueueEnvironmentError =
  | AccessDeniedException
  | InternalServerErrorException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a queue environment.
 */
export const deleteQueueEnvironment: API.OperationMethod<
  DeleteQueueEnvironmentRequest,
  DeleteQueueEnvironmentResponse,
  DeleteQueueEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2023-10-12/farms/{farmId}/queues/{queueId}/environments/{queueEnvironmentId}",
    input: { farmId: 0, queueId: 0, queueEnvironmentId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQueueEnvironment",
  endpointHostPrefix: "management.",
})) as any;

export type DeleteQueueFleetAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a queue-fleet association.
 */
export const deleteQueueFleetAssociation: API.OperationMethod<
  DeleteQueueFleetAssociationRequest,
  DeleteQueueFleetAssociationResponse,
  DeleteQueueFleetAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2023-10-12/farms/{farmId}/queue-fleet-associations/{queueId}/{fleetId}",
    input: { farmId: 0, queueId: 0, fleetId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQueueFleetAssociation",
  endpointHostPrefix: "management.",
})) as any;

export type DeleteQueueLimitAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the association between a queue and a limit. You must use the `UpdateQueueLimitAssociation` operation to set the status to `STOP_LIMIT_USAGE_AND_COMPLETE_TASKS` or `STOP_LIMIT_USAGE_AND_CANCEL_TASKS`. The status does not change immediately. Use the `GetQueueLimitAssociation` operation to see if the status changed to `STOPPED` before deleting the association.
 */
export const deleteQueueLimitAssociation: API.OperationMethod<
  DeleteQueueLimitAssociationRequest,
  DeleteQueueLimitAssociationResponse,
  DeleteQueueLimitAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2023-10-12/farms/{farmId}/queue-limit-associations/{queueId}/{limitId}",
    input: { farmId: 0, queueId: 0, limitId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQueueLimitAssociation",
  endpointHostPrefix: "management.",
})) as any;

export type DeleteStorageProfileError =
  | AccessDeniedException
  | InternalServerErrorException
  | ThrottlingException
  | ValidationException
  | ConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a storage profile.
 */
export const deleteStorageProfile: API.OperationMethod<
  DeleteStorageProfileRequest,
  DeleteStorageProfileResponse,
  DeleteStorageProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2023-10-12/farms/{farmId}/storage-profiles/{storageProfileId}",
    input: { farmId: 0, storageProfileId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ThrottlingException,
    ValidationException,
    ConflictException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStorageProfile",
  endpointHostPrefix: "management.",
})) as any;

export type DeleteVolumeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a persistent volume.
 */
export const deleteVolume: API.OperationMethod<
  DeleteVolumeRequest,
  DeleteVolumeResponse,
  DeleteVolumeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2023-10-12/farms/{farmId}/fleets/{fleetId}/volumes/{volumeId}",
    input: { farmId: 0, fleetId: 0, volumeId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVolume",
  endpointHostPrefix: "management.",
})) as any;

export type DeleteWorkerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a worker.
 */
export const deleteWorker: API.OperationMethod<
  DeleteWorkerRequest,
  DeleteWorkerResponse,
  DeleteWorkerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2023-10-12/farms/{farmId}/fleets/{fleetId}/workers/{workerId}",
    input: { farmId: 0, fleetId: 0, workerId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorker",
  endpointHostPrefix: "management.",
})) as any;

export type DisassociateMemberFromFarmError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a member from a farm.
 */
export const disassociateMemberFromFarm: API.OperationMethod<
  DisassociateMemberFromFarmRequest,
  DisassociateMemberFromFarmResponse,
  DisassociateMemberFromFarmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2023-10-12/farms/{farmId}/members/{principalId}",
    input: { farmId: 0, principalId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateMemberFromFarm",
  endpointHostPrefix: "management.",
})) as any;

export type DisassociateMemberFromFleetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a member from a fleet.
 */
export const disassociateMemberFromFleet: API.OperationMethod<
  DisassociateMemberFromFleetRequest,
  DisassociateMemberFromFleetResponse,
  DisassociateMemberFromFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2023-10-12/farms/{farmId}/fleets/{fleetId}/members/{principalId}",
    input: { farmId: 0, fleetId: 0, principalId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateMemberFromFleet",
  endpointHostPrefix: "management.",
})) as any;

export type DisassociateMemberFromJobError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a member from a job.
 */
export const disassociateMemberFromJob: API.OperationMethod<
  DisassociateMemberFromJobRequest,
  DisassociateMemberFromJobResponse,
  DisassociateMemberFromJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/members/{principalId}",
    input: { farmId: 0, queueId: 0, jobId: 0, principalId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateMemberFromJob",
  endpointHostPrefix: "management.",
})) as any;

export type DisassociateMemberFromQueueError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a member from a queue.
 */
export const disassociateMemberFromQueue: API.OperationMethod<
  DisassociateMemberFromQueueRequest,
  DisassociateMemberFromQueueResponse,
  DisassociateMemberFromQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2023-10-12/farms/{farmId}/queues/{queueId}/members/{principalId}",
    input: { farmId: 0, queueId: 0, principalId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateMemberFromQueue",
  endpointHostPrefix: "management.",
})) as any;

export type GetBudgetError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a budget.
 */
export const getBudget: API.OperationMethod<
  GetBudgetRequest,
  GetBudgetResponse,
  GetBudgetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/budgets/{budgetId}",
    input: { farmId: 0, budgetId: 0 },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      description: D.secret,
      actions: D.list({ description: D.secret }),
      schedule: { fixed: { startTime: D.ts, endTime: D.ts } },
      queueStoppedAt: D.ts,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBudget",
  endpointHostPrefix: "management.",
})) as any;

export type GetFarmError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a farm.
 */
export const getFarm: API.OperationMethod<
  GetFarmRequest,
  GetFarmResponse,
  GetFarmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}",
    input: { farmId: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts, description: D.secret },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFarm",
  endpointHostPrefix: "management.",
})) as any;

export type GetFleetError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a fleet.
 */
export const getFleet: API.OperationMethod<
  GetFleetRequest,
  GetFleetResponse,
  GetFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/fleets/{fleetId}",
    input: { farmId: 0, fleetId: 0 },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      description: D.secret,
      hostConfiguration: o_HostConfiguration,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFleet",
  endpointHostPrefix: "management.",
})) as any;

export type GetJobError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a Deadline Cloud job.
 */
export const getJob: API.OperationMethod<
  GetJobRequest,
  GetJobResponse,
  GetJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}",
    input: { farmId: 0, queueId: 0, jobId: 0 },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      startedAt: D.ts,
      endedAt: D.ts,
      description: D.secret,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJob",
  endpointHostPrefix: "management.",
})) as any;

export type GetLicenseEndpointError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a licence endpoint.
 */
export const getLicenseEndpoint: API.OperationMethod<
  GetLicenseEndpointRequest,
  GetLicenseEndpointResponse,
  GetLicenseEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/license-endpoints/{licenseEndpointId}",
    input: { licenseEndpointId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLicenseEndpoint",
  endpointHostPrefix: "management.",
})) as any;

export type GetLimitError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a specific limit.
 */
export const getLimit: API.OperationMethod<
  GetLimitRequest,
  GetLimitResponse,
  GetLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/limits/{limitId}",
    input: { farmId: 0, limitId: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts, description: D.secret },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLimit",
  endpointHostPrefix: "management.",
})) as any;

export type GetMonitorError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the specified monitor.
 */
export const getMonitor: API.OperationMethod<
  GetMonitorRequest,
  GetMonitorResponse,
  GetMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/monitors/{monitorId}",
    input: { monitorId: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMonitor",
  endpointHostPrefix: "management.",
})) as any;

export type GetMonitorSettingsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the settings for a Deadline Cloud monitor.
 */
export const getMonitorSettings: API.OperationMethod<
  GetMonitorSettingsRequest,
  GetMonitorSettingsResponse,
  GetMonitorSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/monitors/{monitorId}/settings",
    input: { monitorId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMonitorSettings",
  endpointHostPrefix: "management.",
})) as any;

export type GetQueueError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a queue.
 */
export const getQueue: API.OperationMethod<
  GetQueueRequest,
  GetQueueResponse,
  GetQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/queues/{queueId}",
    input: { farmId: 0, queueId: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts, description: D.secret },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueue",
  endpointHostPrefix: "management.",
})) as any;

export type GetQueueEnvironmentError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a queue environment.
 */
export const getQueueEnvironment: API.OperationMethod<
  GetQueueEnvironmentRequest,
  GetQueueEnvironmentResponse,
  GetQueueEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/queues/{queueId}/environments/{queueEnvironmentId}",
    input: { farmId: 0, queueId: 0, queueEnvironmentId: 0 },
    output: { template: D.secret, createdAt: D.ts, updatedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueueEnvironment",
  endpointHostPrefix: "management.",
})) as any;

export type GetQueueFleetAssociationError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a queue-fleet association.
 */
export const getQueueFleetAssociation: API.OperationMethod<
  GetQueueFleetAssociationRequest,
  GetQueueFleetAssociationResponse,
  GetQueueFleetAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/queue-fleet-associations/{queueId}/{fleetId}",
    input: { farmId: 0, queueId: 0, fleetId: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueueFleetAssociation",
  endpointHostPrefix: "management.",
})) as any;

export type GetQueueLimitAssociationError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a specific association between a queue and a limit.
 */
export const getQueueLimitAssociation: API.OperationMethod<
  GetQueueLimitAssociationRequest,
  GetQueueLimitAssociationResponse,
  GetQueueLimitAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/queue-limit-associations/{queueId}/{limitId}",
    input: { farmId: 0, queueId: 0, limitId: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueueLimitAssociation",
  endpointHostPrefix: "management.",
})) as any;

export type GetSessionError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a session.
 */
export const getSession: API.OperationMethod<
  GetSessionRequest,
  GetSessionResponse,
  GetSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/sessions/{sessionId}",
    input: { farmId: 0, queueId: 0, jobId: 0, sessionId: 0 },
    output: { startedAt: D.ts, endedAt: D.ts, updatedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSession",
  endpointHostPrefix: "management.",
})) as any;

export type GetSessionActionError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a session action for the job.
 */
export const getSessionAction: API.OperationMethod<
  GetSessionActionRequest,
  GetSessionActionResponse,
  GetSessionActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/session-actions/{sessionActionId}",
    input: { farmId: 0, queueId: 0, jobId: 0, sessionActionId: 0 },
    output: {
      startedAt: D.ts,
      endedAt: D.ts,
      workerUpdatedAt: D.ts,
      progressMessage: D.secret,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSessionAction",
  endpointHostPrefix: "management.",
})) as any;

export type GetSessionsStatisticsAggregationError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a set of statistics for queues or farms. Before you can call the `GetSessionStatisticsAggregation` operation, you must first call the `StartSessionsStatisticsAggregation` operation. Statistics are available for 1 hour after you call the `StartSessionsStatisticsAggregation` operation.
 */
export const getSessionsStatisticsAggregation: API.PaginatedOperationMethod<
  GetSessionsStatisticsAggregationRequest,
  GetSessionsStatisticsAggregationResponse,
  GetSessionsStatisticsAggregationError,
  Credentials | HttpClient.HttpClient,
  Statistics
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/sessions-statistics-aggregation",
    input: {
      farmId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      aggregationId: D.m({ query: "aggregationId" }),
    },
    output: {
      statistics: D.list({
        aggregationStartTime: D.ts,
        aggregationEndTime: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSessionsStatisticsAggregation",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "statistics",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetStepError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a step.
 */
export const getStep: API.OperationMethod<
  GetStepRequest,
  GetStepResponse,
  GetStepError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/steps/{stepId}",
    input: { farmId: 0, queueId: 0, jobId: 0, stepId: 0 },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      startedAt: D.ts,
      endedAt: D.ts,
      description: D.secret,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStep",
  endpointHostPrefix: "management.",
})) as any;

export type GetStorageProfileError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a storage profile.
 */
export const getStorageProfile: API.OperationMethod<
  GetStorageProfileRequest,
  GetStorageProfileResponse,
  GetStorageProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/storage-profiles/{storageProfileId}",
    input: { farmId: 0, storageProfileId: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStorageProfile",
  endpointHostPrefix: "management.",
})) as any;

export type GetStorageProfileForQueueError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a storage profile for a queue.
 */
export const getStorageProfileForQueue: API.OperationMethod<
  GetStorageProfileForQueueRequest,
  GetStorageProfileForQueueResponse,
  GetStorageProfileForQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/queues/{queueId}/storage-profiles/{storageProfileId}",
    input: { farmId: 0, queueId: 0, storageProfileId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStorageProfileForQueue",
  endpointHostPrefix: "management.",
})) as any;

export type GetTaskError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a task.
 */
export const getTask: API.OperationMethod<
  GetTaskRequest,
  GetTaskResponse,
  GetTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/steps/{stepId}/tasks/{taskId}",
    input: { farmId: 0, queueId: 0, jobId: 0, stepId: 0, taskId: 0 },
    output: {
      createdAt: D.ts,
      startedAt: D.ts,
      endedAt: D.ts,
      updatedAt: D.ts,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTask",
  endpointHostPrefix: "management.",
})) as any;

export type GetVolumeError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a persistent volume.
 */
export const getVolume: API.OperationMethod<
  GetVolumeRequest,
  GetVolumeResponse,
  GetVolumeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/fleets/{fleetId}/volumes/{volumeId}",
    input: { farmId: 0, fleetId: 0, volumeId: 0 },
    output: {
      createdAt: D.ts,
      lastAssignedAt: D.ts,
      lastReleasedAt: D.ts,
      expiresAt: D.ts,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVolume",
  endpointHostPrefix: "management.",
})) as any;

export type GetWorkerError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a worker.
 */
export const getWorker: API.OperationMethod<
  GetWorkerRequest,
  GetWorkerResponse,
  GetWorkerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/fleets/{fleetId}/workers/{workerId}",
    input: { farmId: 0, fleetId: 0, workerId: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorker",
  endpointHostPrefix: "management.",
})) as any;

export type ListAvailableMeteredProductsError =
  | InternalServerErrorException
  | ThrottlingException
  | CommonErrors;
/**
 * A list of the available metered products.
 */
export const listAvailableMeteredProducts: API.PaginatedOperationMethod<
  ListAvailableMeteredProductsRequest,
  ListAvailableMeteredProductsResponse,
  ListAvailableMeteredProductsError,
  Credentials | HttpClient.HttpClient,
  MeteredProductSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/metered-products",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [InternalServerErrorException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAvailableMeteredProducts",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "meteredProducts",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBudgetsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A list of budgets in a farm.
 */
export const listBudgets: API.PaginatedOperationMethod<
  ListBudgetsRequest,
  ListBudgetsResponse,
  ListBudgetsError,
  Credentials | HttpClient.HttpClient,
  BudgetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/budgets",
    input: {
      farmId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      status: D.m({ query: "status" }),
    },
    output: {
      budgets: D.list({
        createdAt: D.ts,
        updatedAt: D.ts,
        description: D.secret,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBudgets",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "budgets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFarmMembersError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the members of a farm.
 */
export const listFarmMembers: API.PaginatedOperationMethod<
  ListFarmMembersRequest,
  ListFarmMembersResponse,
  ListFarmMembersError,
  Credentials | HttpClient.HttpClient,
  FarmMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/members",
    input: {
      farmId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFarmMembers",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "members",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFarmsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists farms.
 */
export const listFarms: API.PaginatedOperationMethod<
  ListFarmsRequest,
  ListFarmsResponse,
  ListFarmsError,
  Credentials | HttpClient.HttpClient,
  FarmSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      principalId: D.m({ query: "principalId" }),
    },
    output: { farms: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFarms",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "farms",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFleetMembersError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists fleet members.
 */
export const listFleetMembers: API.PaginatedOperationMethod<
  ListFleetMembersRequest,
  ListFleetMembersResponse,
  ListFleetMembersError,
  Credentials | HttpClient.HttpClient,
  FleetMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/fleets/{fleetId}/members",
    input: {
      farmId: 0,
      fleetId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFleetMembers",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "members",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFleetsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists fleets.
 */
export const listFleets: API.PaginatedOperationMethod<
  ListFleetsRequest,
  ListFleetsResponse,
  ListFleetsError,
  Credentials | HttpClient.HttpClient,
  FleetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/fleets",
    input: {
      farmId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      principalId: D.m({ query: "principalId" }),
      displayName: D.m({ query: "displayName" }),
      status: D.m({ query: "status" }),
    },
    output: { fleets: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFleets",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "fleets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListJobMembersError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists members on a job.
 */
export const listJobMembers: API.PaginatedOperationMethod<
  ListJobMembersRequest,
  ListJobMembersResponse,
  ListJobMembersError,
  Credentials | HttpClient.HttpClient,
  JobMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/members",
    input: {
      farmId: 0,
      queueId: 0,
      jobId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobMembers",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "members",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListJobParameterDefinitionsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists parameter definitions of a job.
 */
export const listJobParameterDefinitions: API.PaginatedOperationMethod<
  ListJobParameterDefinitionsRequest,
  ListJobParameterDefinitionsResponse,
  ListJobParameterDefinitionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/parameter-definitions",
    input: {
      farmId: 0,
      queueId: 0,
      jobId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobParameterDefinitions",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobParameterDefinitions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListJobsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists jobs.
 */
export const listJobs: API.PaginatedOperationMethod<
  ListJobsRequest,
  ListJobsResponse,
  ListJobsError,
  Credentials | HttpClient.HttpClient,
  JobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/queues/{queueId}/jobs",
    input: {
      farmId: 0,
      queueId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      principalId: D.m({ query: "principalId" }),
    },
    output: {
      jobs: D.list({
        createdAt: D.ts,
        updatedAt: D.ts,
        startedAt: D.ts,
        endedAt: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobs",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListLicenseEndpointsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists license endpoints.
 */
export const listLicenseEndpoints: API.PaginatedOperationMethod<
  ListLicenseEndpointsRequest,
  ListLicenseEndpointsResponse,
  ListLicenseEndpointsError,
  Credentials | HttpClient.HttpClient,
  LicenseEndpointSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/license-endpoints",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLicenseEndpoints",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "licenseEndpoints",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListLimitsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of limits defined in the specified farm.
 */
export const listLimits: API.PaginatedOperationMethod<
  ListLimitsRequest,
  ListLimitsResponse,
  ListLimitsError,
  Credentials | HttpClient.HttpClient,
  LimitSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/limits",
    input: {
      farmId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { limits: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLimits",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "limits",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMeteredProductsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists metered products.
 */
export const listMeteredProducts: API.PaginatedOperationMethod<
  ListMeteredProductsRequest,
  ListMeteredProductsResponse,
  ListMeteredProductsError,
  Credentials | HttpClient.HttpClient,
  MeteredProductSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/license-endpoints/{licenseEndpointId}/metered-products",
    input: {
      licenseEndpointId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMeteredProducts",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "meteredProducts",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMonitorsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of your monitors in Deadline Cloud.
 */
export const listMonitors: API.PaginatedOperationMethod<
  ListMonitorsRequest,
  ListMonitorsResponse,
  ListMonitorsError,
  Credentials | HttpClient.HttpClient,
  MonitorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/monitors",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { monitors: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMonitors",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "monitors",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListQueueEnvironmentsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists queue environments.
 */
export const listQueueEnvironments: API.PaginatedOperationMethod<
  ListQueueEnvironmentsRequest,
  ListQueueEnvironmentsResponse,
  ListQueueEnvironmentsError,
  Credentials | HttpClient.HttpClient,
  QueueEnvironmentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/queues/{queueId}/environments",
    input: {
      farmId: 0,
      queueId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQueueEnvironments",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "environments",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListQueueFleetAssociationsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists queue-fleet associations.
 */
export const listQueueFleetAssociations: API.PaginatedOperationMethod<
  ListQueueFleetAssociationsRequest,
  ListQueueFleetAssociationsResponse,
  ListQueueFleetAssociationsError,
  Credentials | HttpClient.HttpClient,
  QueueFleetAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/queue-fleet-associations",
    input: {
      farmId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      queueId: D.m({ query: "queueId" }),
      fleetId: D.m({ query: "fleetId" }),
    },
    output: {
      queueFleetAssociations: D.list({ createdAt: D.ts, updatedAt: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQueueFleetAssociations",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "queueFleetAssociations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListQueueLimitAssociationsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets a list of the associations between queues and limits defined in a farm.
 */
export const listQueueLimitAssociations: API.PaginatedOperationMethod<
  ListQueueLimitAssociationsRequest,
  ListQueueLimitAssociationsResponse,
  ListQueueLimitAssociationsError,
  Credentials | HttpClient.HttpClient,
  QueueLimitAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/queue-limit-associations",
    input: {
      farmId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      queueId: D.m({ query: "queueId" }),
      limitId: D.m({ query: "limitId" }),
    },
    output: {
      queueLimitAssociations: D.list({ createdAt: D.ts, updatedAt: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQueueLimitAssociations",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "queueLimitAssociations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListQueueMembersError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the members in a queue.
 */
export const listQueueMembers: API.PaginatedOperationMethod<
  ListQueueMembersRequest,
  ListQueueMembersResponse,
  ListQueueMembersError,
  Credentials | HttpClient.HttpClient,
  QueueMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/queues/{queueId}/members",
    input: {
      farmId: 0,
      queueId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQueueMembers",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "members",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListQueuesError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists queues.
 */
export const listQueues: API.PaginatedOperationMethod<
  ListQueuesRequest,
  ListQueuesResponse,
  ListQueuesError,
  Credentials | HttpClient.HttpClient,
  QueueSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/queues",
    input: {
      farmId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      principalId: D.m({ query: "principalId" }),
      status: D.m({ query: "status" }),
    },
    output: { queues: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQueues",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "queues",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSessionActionsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists session actions.
 */
export const listSessionActions: API.PaginatedOperationMethod<
  ListSessionActionsRequest,
  ListSessionActionsResponse,
  ListSessionActionsError,
  Credentials | HttpClient.HttpClient,
  SessionActionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/session-actions",
    input: {
      farmId: 0,
      queueId: 0,
      jobId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      sessionId: D.m({ query: "sessionId" }),
      taskId: D.m({ query: "taskId" }),
    },
    output: {
      sessionActions: D.list({
        startedAt: D.ts,
        endedAt: D.ts,
        workerUpdatedAt: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSessionActions",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "sessionActions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSessionsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists sessions.
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
    http: "GET /2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/sessions",
    input: {
      farmId: 0,
      queueId: 0,
      jobId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      sessions: D.list({ startedAt: D.ts, endedAt: D.ts, updatedAt: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSessions",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "sessions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSessionsForWorkerError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists sessions for a worker.
 */
export const listSessionsForWorker: API.PaginatedOperationMethod<
  ListSessionsForWorkerRequest,
  ListSessionsForWorkerResponse,
  ListSessionsForWorkerError,
  Credentials | HttpClient.HttpClient,
  WorkerSessionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/fleets/{fleetId}/workers/{workerId}/sessions",
    input: {
      farmId: 0,
      fleetId: 0,
      workerId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { sessions: D.list({ startedAt: D.ts, endedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSessionsForWorker",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "sessions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListStepConsumersError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists step consumers.
 */
export const listStepConsumers: API.PaginatedOperationMethod<
  ListStepConsumersRequest,
  ListStepConsumersResponse,
  ListStepConsumersError,
  Credentials | HttpClient.HttpClient,
  StepConsumer
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/steps/{stepId}/consumers",
    input: {
      farmId: 0,
      queueId: 0,
      jobId: 0,
      stepId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStepConsumers",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "consumers",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListStepDependenciesError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the dependencies for a step.
 */
export const listStepDependencies: API.PaginatedOperationMethod<
  ListStepDependenciesRequest,
  ListStepDependenciesResponse,
  ListStepDependenciesError,
  Credentials | HttpClient.HttpClient,
  StepDependency
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/steps/{stepId}/dependencies",
    input: {
      farmId: 0,
      queueId: 0,
      jobId: 0,
      stepId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStepDependencies",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dependencies",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListStepsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists steps for a job.
 */
export const listSteps: API.PaginatedOperationMethod<
  ListStepsRequest,
  ListStepsResponse,
  ListStepsError,
  Credentials | HttpClient.HttpClient,
  StepSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/steps",
    input: {
      farmId: 0,
      queueId: 0,
      jobId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      steps: D.list({
        createdAt: D.ts,
        updatedAt: D.ts,
        startedAt: D.ts,
        endedAt: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSteps",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "steps",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListStorageProfilesError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists storage profiles.
 */
export const listStorageProfiles: API.PaginatedOperationMethod<
  ListStorageProfilesRequest,
  ListStorageProfilesResponse,
  ListStorageProfilesError,
  Credentials | HttpClient.HttpClient,
  StorageProfileSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/storage-profiles",
    input: {
      farmId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStorageProfiles",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "storageProfiles",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListStorageProfilesForQueueError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists storage profiles for a queue.
 */
export const listStorageProfilesForQueue: API.PaginatedOperationMethod<
  ListStorageProfilesForQueueRequest,
  ListStorageProfilesForQueueResponse,
  ListStorageProfilesForQueueError,
  Credentials | HttpClient.HttpClient,
  StorageProfileSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/queues/{queueId}/storage-profiles",
    input: {
      farmId: 0,
      queueId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStorageProfilesForQueue",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "storageProfiles",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists tags for a resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  endpointHostPrefix: "management.",
})) as any;

export type ListTasksError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists tasks for a job.
 */
export const listTasks: API.PaginatedOperationMethod<
  ListTasksRequest,
  ListTasksResponse,
  ListTasksError,
  Credentials | HttpClient.HttpClient,
  TaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/steps/{stepId}/tasks",
    input: {
      farmId: 0,
      queueId: 0,
      jobId: 0,
      stepId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      tasks: D.list({
        createdAt: D.ts,
        startedAt: D.ts,
        endedAt: D.ts,
        updatedAt: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTasks",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tasks",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListVolumesError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the persistent volumes in a fleet.
 */
export const listVolumes: API.PaginatedOperationMethod<
  ListVolumesRequest,
  ListVolumesResponse,
  ListVolumesError,
  Credentials | HttpClient.HttpClient,
  VolumeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/fleets/{fleetId}/volumes",
    input: {
      farmId: 0,
      fleetId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVolumes",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "volumes",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWorkersError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists workers.
 */
export const listWorkers: API.PaginatedOperationMethod<
  ListWorkersRequest,
  ListWorkersResponse,
  ListWorkersError,
  Credentials | HttpClient.HttpClient,
  WorkerSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2023-10-12/farms/{farmId}/fleets/{fleetId}/workers",
    input: {
      farmId: 0,
      fleetId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { workers: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkers",
  endpointHostPrefix: "management.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "workers",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutMeteredProductError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds a metered product.
 */
export const putMeteredProduct: API.OperationMethod<
  PutMeteredProductRequest,
  PutMeteredProductResponse,
  PutMeteredProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2023-10-12/license-endpoints/{licenseEndpointId}/metered-products/{productId}",
    input: { licenseEndpointId: 0, productId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutMeteredProduct",
  endpointHostPrefix: "management.",
})) as any;

export type SearchJobsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches for jobs.
 */
export const searchJobs: API.OperationMethod<
  SearchJobsRequest,
  SearchJobsResponse,
  SearchJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2023-10-12/farms/{farmId}/search/jobs",
    input: {
      farmId: 0,
      filterExpressions: i_SearchGroupedFilterExpressions,
      sortExpressions: D.list(i_SearchSortExpression),
      itemOffset: 0,
      pageSize: 0,
      queueIds: 0,
    },
    output: {
      jobs: D.list({
        createdAt: D.ts,
        endedAt: D.ts,
        startedAt: D.ts,
        updatedAt: D.ts,
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchJobs",
  endpointHostPrefix: "management.",
})) as any;

export type SearchStepsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches for steps.
 */
export const searchSteps: API.OperationMethod<
  SearchStepsRequest,
  SearchStepsResponse,
  SearchStepsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2023-10-12/farms/{farmId}/search/steps",
    input: {
      farmId: 0,
      filterExpressions: i_SearchGroupedFilterExpressions,
      sortExpressions: D.list(i_SearchSortExpression),
      itemOffset: 0,
      pageSize: 0,
      queueIds: 0,
      jobId: 0,
    },
    output: {
      steps: D.list({
        createdAt: D.ts,
        startedAt: D.ts,
        endedAt: D.ts,
        updatedAt: D.ts,
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchSteps",
  endpointHostPrefix: "management.",
})) as any;

export type SearchTasksError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches for tasks.
 */
export const searchTasks: API.OperationMethod<
  SearchTasksRequest,
  SearchTasksResponse,
  SearchTasksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2023-10-12/farms/{farmId}/search/tasks",
    input: {
      farmId: 0,
      filterExpressions: i_SearchGroupedFilterExpressions,
      sortExpressions: D.list(i_SearchSortExpression),
      itemOffset: 0,
      pageSize: 0,
      queueIds: 0,
      jobId: 0,
    },
    output: {
      tasks: D.list({ startedAt: D.ts, endedAt: D.ts, updatedAt: D.ts }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchTasks",
  endpointHostPrefix: "management.",
})) as any;

export type SearchWorkersError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches for workers.
 */
export const searchWorkers: API.OperationMethod<
  SearchWorkersRequest,
  SearchWorkersResponse,
  SearchWorkersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2023-10-12/farms/{farmId}/search/workers",
    input: {
      farmId: 0,
      filterExpressions: i_SearchGroupedFilterExpressions,
      sortExpressions: D.list(i_SearchSortExpression),
      itemOffset: 0,
      pageSize: 0,
      fleetIds: 0,
    },
    output: { workers: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchWorkers",
  endpointHostPrefix: "management.",
})) as any;

export type StartSessionsStatisticsAggregationError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts an asynchronous request for getting aggregated statistics about queues and farms. Get the statistics using the `GetSessionsStatisticsAggregation` operation. You can only have one running aggregation for your Deadline Cloud farm. Call the `GetSessionsStatisticsAggregation` operation and check the `status` field to see if an aggregation is running. Statistics are available for 1 hour after you call the `StartSessionsStatisticsAggregation` operation.
 */
export const startSessionsStatisticsAggregation: API.OperationMethod<
  StartSessionsStatisticsAggregationRequest,
  StartSessionsStatisticsAggregationResponse,
  StartSessionsStatisticsAggregationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2023-10-12/farms/{farmId}/sessions-statistics-aggregation",
    input: {
      farmId: 0,
      resourceIds: { queueIds: 0, fleetIds: 0 },
      startTime: D.tsAs("date-time"),
      endTime: D.tsAs("date-time"),
      timezone: 0,
      period: 0,
      groupBy: 0,
      statistics: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSessionsStatisticsAggregation",
  endpointHostPrefix: "management.",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Tags a resource using the resource's ARN and desired tags.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2023-10-12/tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  endpointHostPrefix: "management.",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a tag from a resource using the resource's ARN and tag to remove.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2023-10-12/tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  endpointHostPrefix: "management.",
})) as any;

export type UpdateBudgetError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | ConflictException
  | InternalServerException
  | CommonErrors;
/**
 * Updates a budget that sets spending thresholds for rendering activity.
 */
export const updateBudget: API.OperationMethod<
  UpdateBudgetRequest,
  UpdateBudgetResponse,
  UpdateBudgetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /2023-10-12/farms/{farmId}/budgets/{budgetId}",
    input: {
      farmId: 0,
      budgetId: 0,
      clientToken: D.m({ header: "X-Amz-Client-Token", idempotency: true }),
      displayName: 0,
      description: 0,
      status: 0,
      approximateDollarLimit: 0,
      actionsToAdd: D.list(i_BudgetActionToAdd),
      actionsToRemove: D.list({ type: 0, thresholdPercentage: 0 }),
      schedule: i_BudgetSchedule,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    ConflictException,
    InternalServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBudget",
  endpointHostPrefix: "management.",
})) as any;

export type UpdateFarmError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | ConflictException
  | CommonErrors;
/**
 * Updates a farm.
 */
export const updateFarm: API.OperationMethod<
  UpdateFarmRequest,
  UpdateFarmResponse,
  UpdateFarmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /2023-10-12/farms/{farmId}",
    input: { farmId: 0, displayName: 0, description: 0, costScaleFactor: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    ConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFarm",
  endpointHostPrefix: "management.",
})) as any;

export type UpdateFleetError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a fleet.
 */
export const updateFleet: API.OperationMethod<
  UpdateFleetRequest,
  UpdateFleetResponse,
  UpdateFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /2023-10-12/farms/{farmId}/fleets/{fleetId}",
    input: {
      farmId: 0,
      fleetId: 0,
      clientToken: D.m({ header: "X-Amz-Client-Token", idempotency: true }),
      displayName: 0,
      description: 0,
      roleArn: 0,
      minWorkerCount: 0,
      maxWorkerCount: 0,
      configuration: i_FleetConfiguration,
      hostConfiguration: i_HostConfiguration,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFleet",
  endpointHostPrefix: "management.",
})) as any;

export type UpdateJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a job.
 *
 * When you change the status of the job to `ARCHIVED`, the job can't be scheduled or archived.
 *
 * An archived jobs and its steps and tasks are deleted after 120 days. The job can't be recovered.
 */
export const updateJob: API.OperationMethod<
  UpdateJobRequest,
  UpdateJobResponse,
  UpdateJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}",
    input: {
      farmId: 0,
      queueId: 0,
      jobId: 0,
      clientToken: D.m({ header: "X-Amz-Client-Token", idempotency: true }),
      targetTaskRunStatus: 0,
      priority: 0,
      maxFailedTasksCount: 0,
      maxRetriesPerTask: 0,
      lifecycleStatus: 0,
      maxWorkerCount: 0,
      name: 0,
      description: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateJob",
  endpointHostPrefix: "management.",
})) as any;

export type UpdateLimitError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the properties of the specified limit.
 */
export const updateLimit: API.OperationMethod<
  UpdateLimitRequest,
  UpdateLimitResponse,
  UpdateLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /2023-10-12/farms/{farmId}/limits/{limitId}",
    input: {
      farmId: 0,
      limitId: 0,
      displayName: 0,
      description: 0,
      maxCount: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLimit",
  endpointHostPrefix: "management.",
})) as any;

export type UpdateMonitorError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | ConflictException
  | CommonErrors;
/**
 * Modifies the settings for a Deadline Cloud monitor. You can modify one or all of the settings when you call `UpdateMonitor`.
 */
export const updateMonitor: API.OperationMethod<
  UpdateMonitorRequest,
  UpdateMonitorResponse,
  UpdateMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /2023-10-12/monitors/{monitorId}",
    input: { monitorId: 0, subdomain: 0, displayName: 0, roleArn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    ConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMonitor",
  endpointHostPrefix: "management.",
})) as any;

export type UpdateMonitorSettingsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the settings for a Deadline Cloud monitor. Keys present in the request are upserted; keys absent are left unchanged. Send an empty string value to delete a key.
 */
export const updateMonitorSettings: API.OperationMethod<
  UpdateMonitorSettingsRequest,
  UpdateMonitorSettingsResponse,
  UpdateMonitorSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /2023-10-12/monitors/{monitorId}/settings",
    input: { monitorId: 0, settings: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMonitorSettings",
  endpointHostPrefix: "management.",
})) as any;

export type UpdateQueueError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a queue.
 */
export const updateQueue: API.OperationMethod<
  UpdateQueueRequest,
  UpdateQueueResponse,
  UpdateQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /2023-10-12/farms/{farmId}/queues/{queueId}",
    input: {
      farmId: 0,
      queueId: 0,
      clientToken: D.m({ header: "X-Amz-Client-Token", idempotency: true }),
      displayName: 0,
      description: 0,
      defaultBudgetAction: 0,
      jobAttachmentSettings: i_JobAttachmentSettings,
      roleArn: 0,
      jobRunAsUser: i_JobRunAsUser,
      requiredFileSystemLocationNamesToAdd: 0,
      requiredFileSystemLocationNamesToRemove: 0,
      allowedStorageProfileIdsToAdd: 0,
      allowedStorageProfileIdsToRemove: 0,
      schedulingConfiguration: i_SchedulingConfiguration,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQueue",
  endpointHostPrefix: "management.",
})) as any;

export type UpdateQueueEnvironmentError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the queue environment.
 */
export const updateQueueEnvironment: API.OperationMethod<
  UpdateQueueEnvironmentRequest,
  UpdateQueueEnvironmentResponse,
  UpdateQueueEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /2023-10-12/farms/{farmId}/queues/{queueId}/environments/{queueEnvironmentId}",
    input: {
      farmId: 0,
      queueId: 0,
      queueEnvironmentId: 0,
      clientToken: D.m({ header: "X-Amz-Client-Token", idempotency: true }),
      priority: 0,
      templateType: 0,
      template: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQueueEnvironment",
  endpointHostPrefix: "management.",
})) as any;

export type UpdateQueueFleetAssociationError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a queue-fleet association.
 */
export const updateQueueFleetAssociation: API.OperationMethod<
  UpdateQueueFleetAssociationRequest,
  UpdateQueueFleetAssociationResponse,
  UpdateQueueFleetAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /2023-10-12/farms/{farmId}/queue-fleet-associations/{queueId}/{fleetId}",
    input: { farmId: 0, queueId: 0, fleetId: 0, status: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQueueFleetAssociation",
  endpointHostPrefix: "management.",
})) as any;

export type UpdateQueueLimitAssociationError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the status of the queue. If you set the status to one of the `STOP_LIMIT_USAGE*` values, there will be a delay before the status transitions to the `STOPPED` state.
 */
export const updateQueueLimitAssociation: API.OperationMethod<
  UpdateQueueLimitAssociationRequest,
  UpdateQueueLimitAssociationResponse,
  UpdateQueueLimitAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /2023-10-12/farms/{farmId}/queue-limit-associations/{queueId}/{limitId}",
    input: { farmId: 0, queueId: 0, limitId: 0, status: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQueueLimitAssociation",
  endpointHostPrefix: "management.",
})) as any;

export type UpdateSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a session.
 */
export const updateSession: API.OperationMethod<
  UpdateSessionRequest,
  UpdateSessionResponse,
  UpdateSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/sessions/{sessionId}",
    input: {
      farmId: 0,
      queueId: 0,
      jobId: 0,
      sessionId: 0,
      clientToken: D.m({ header: "X-Amz-Client-Token", idempotency: true }),
      targetLifecycleStatus: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSession",
  endpointHostPrefix: "management.",
})) as any;

export type UpdateStepError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a step.
 */
export const updateStep: API.OperationMethod<
  UpdateStepRequest,
  UpdateStepResponse,
  UpdateStepError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/steps/{stepId}",
    input: {
      farmId: 0,
      queueId: 0,
      jobId: 0,
      stepId: 0,
      clientToken: D.m({ header: "X-Amz-Client-Token", idempotency: true }),
      targetTaskRunStatus: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStep",
  endpointHostPrefix: "management.",
})) as any;

export type UpdateStorageProfileError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | ConflictException
  | CommonErrors;
/**
 * Updates a storage profile.
 */
export const updateStorageProfile: API.OperationMethod<
  UpdateStorageProfileRequest,
  UpdateStorageProfileResponse,
  UpdateStorageProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /2023-10-12/farms/{farmId}/storage-profiles/{storageProfileId}",
    input: {
      farmId: 0,
      storageProfileId: 0,
      clientToken: D.m({ header: "X-Amz-Client-Token", idempotency: true }),
      displayName: 0,
      osFamily: 0,
      fileSystemLocationsToAdd: D.list(i_FileSystemLocation),
      fileSystemLocationsToRemove: D.list(i_FileSystemLocation),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    ConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStorageProfile",
  endpointHostPrefix: "management.",
})) as any;

export type UpdateTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a task.
 */
export const updateTask: API.OperationMethod<
  UpdateTaskRequest,
  UpdateTaskResponse,
  UpdateTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/steps/{stepId}/tasks/{taskId}",
    input: {
      farmId: 0,
      queueId: 0,
      jobId: 0,
      stepId: 0,
      taskId: 0,
      clientToken: D.m({ header: "X-Amz-Client-Token", idempotency: true }),
      targetRunStatus: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTask",
  endpointHostPrefix: "management.",
})) as any;

export type UpdateWorkerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a worker.
 */
export const updateWorker: API.OperationMethod<
  UpdateWorkerRequest,
  UpdateWorkerResponse,
  UpdateWorkerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /2023-10-12/farms/{farmId}/fleets/{fleetId}/workers/{workerId}",
    input: {
      farmId: 0,
      fleetId: 0,
      workerId: 0,
      status: 0,
      capabilities: {
        amounts: D.list({ name: 0, value: 0 }),
        attributes: D.list({ name: 0, values: 0 }),
      },
      hostProperties: i_HostPropertiesRequest,
    },
    output: { hostConfiguration: o_HostConfiguration },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorker",
  endpointHostPrefix: "scheduling.",
})) as any;

export type UpdateWorkerScheduleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the schedule for a worker.
 */
export const updateWorkerSchedule: API.OperationMethod<
  UpdateWorkerScheduleRequest,
  UpdateWorkerScheduleResponse,
  UpdateWorkerScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /2023-10-12/farms/{farmId}/fleets/{fleetId}/workers/{workerId}/schedule",
    input: {
      farmId: 0,
      fleetId: 0,
      workerId: 0,
      updatedSessionActions: D.map({
        completedStatus: 0,
        processExitCode: 0,
        progressMessage: 0,
        startedAt: D.tsAs("date-time"),
        endedAt: D.tsAs("date-time"),
        updatedAt: D.tsAs("date-time"),
        progressPercent: 0,
        manifests: D.list({ outputManifestPath: 0, outputManifestHash: 0 }),
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkerSchedule",
  endpointHostPrefix: "scheduling.",
})) as any;

const i_BudgetActionToAdd: D.LazyStruct = () => ({
  type: 0,
  thresholdPercentage: 0,
  description: 0,
});
const i_BudgetSchedule: D.LazyStruct = () => ({
  fixed: { startTime: D.tsAs("date-time"), endTime: D.tsAs("date-time") },
});
const i_FileSystemLocation: D.LazyStruct = () => ({
  name: 0,
  path: 0,
  type: 0,
});
const i_FleetConfiguration: D.LazyStruct = () => ({
  customerManaged: {
    mode: 0,
    autoScalingConfiguration: {
      standbyWorkerCount: 0,
      workerIdleDurationSeconds: 0,
      scaleOutWorkersPerMinute: 0,
    },
    workerCapabilities: {
      vCpuCount: i_VCpuCountRange,
      memoryMiB: i_MemoryMiBRange,
      acceleratorTypes: 0,
      acceleratorCount: i_AcceleratorCountRange,
      acceleratorTotalMemoryMiB: { min: 0, max: 0 },
      osFamily: 0,
      cpuArchitectureType: 0,
      customAmounts: D.list(i_FleetAmountCapability),
      customAttributes: D.list(i_FleetAttributeCapability),
    },
    storageProfileId: 0,
    tagPropagationMode: 0,
  },
  serviceManagedEc2: {
    instanceCapabilities: {
      vCpuCount: i_VCpuCountRange,
      memoryMiB: i_MemoryMiBRange,
      osFamily: 0,
      cpuArchitectureType: 0,
      rootEbsVolume: { sizeGiB: 0, iops: 0, throughputMiB: 0 },
      acceleratorCapabilities: {
        selections: D.list({ name: 0, runtime: 0 }),
        count: i_AcceleratorCountRange,
      },
      allowedInstanceTypes: 0,
      excludedInstanceTypes: 0,
      customAmounts: D.list(i_FleetAmountCapability),
      customAttributes: D.list(i_FleetAttributeCapability),
    },
    instanceMarketOptions: { type: 0 },
    vpcConfiguration: { resourceConfigurationArns: 0 },
    storageProfileId: 0,
    persistentVolumeConfiguration: {
      sizeGiB: 0,
      iops: 0,
      throughputMiB: 0,
      mountPath: 0,
      lastUsedTtlHours: 0,
    },
    autoScalingConfiguration: {
      standbyWorkerCount: 0,
      workerIdleDurationSeconds: 0,
      scaleOutWorkersPerMinute: 0,
    },
  },
});
const i_HostConfiguration: D.LazyStruct = () => ({
  scriptBody: 0,
  scriptTimeoutSeconds: 0,
});
const i_HostPropertiesRequest: D.LazyStruct = () => ({
  ipAddresses: { ipV4Addresses: 0, ipV6Addresses: 0 },
  hostName: 0,
});
const i_JobAttachmentSettings: D.LazyStruct = () => ({
  s3BucketName: 0,
  rootPrefix: 0,
});
const i_JobRunAsUser: D.LazyStruct = () => ({
  posix: { user: 0, group: 0 },
  windows: { user: 0, passwordArn: 0 },
  runAs: 0,
});
const i_SchedulingConfiguration: D.LazyStruct = () => ({
  priorityFifo: {},
  priorityBalanced: { renderingTaskBuffer: 0 },
  weightedBalanced: {
    priorityWeight: 0,
    errorWeight: 0,
    submissionTimeWeight: 0,
    renderingTaskWeight: 0,
    renderingTaskBuffer: 0,
    maxPriorityOverride: { alwaysScheduleFirst: {} },
    minPriorityOverride: { alwaysScheduleLast: {} },
  },
});
const i_SearchGroupedFilterExpressions: D.LazyStruct = () => ({
  filters: D.list({
    dateTimeFilter: { name: 0, operator: 0, dateTime: D.tsAs("date-time") },
    parameterFilter: { name: 0, operator: 0, value: 0 },
    searchTermFilter: { searchTerm: 0, matchType: 0 },
    stringFilter: { name: 0, operator: 0, value: 0 },
    stringListFilter: { name: 0, operator: 0, values: 0 },
    groupFilter: i_SearchGroupedFilterExpressions,
  }),
  operator: 0,
});
const i_SearchSortExpression: D.LazyStruct = () => ({
  userJobsFirst: { userIdentityId: 0 },
  fieldSort: { sortOrder: 0, name: 0 },
  parameterSort: { sortOrder: 0, name: 0 },
});
const o_AwsCredentials: D.LazyStruct = () => ({
  accessKeyId: D.secret,
  secretAccessKey: D.secret,
  sessionToken: D.secret,
  expiration: D.ts,
});
const o_HostConfiguration: D.LazyStruct = () => ({ scriptBody: D.secret });
const i_AcceleratorCountRange: D.LazyStruct = () => ({ min: 0, max: 0 });
const i_FleetAmountCapability: D.LazyStruct = () => ({
  name: 0,
  min: 0,
  max: 0,
});
const i_FleetAttributeCapability: D.LazyStruct = () => ({ name: 0, values: 0 });
const i_MemoryMiBRange: D.LazyStruct = () => ({ min: 0, max: 0 });
const i_VCpuCountRange: D.LazyStruct = () => ({ min: 0, max: 0 });
