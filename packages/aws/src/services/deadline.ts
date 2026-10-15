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
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "deadline", serviceShapeName: "Deadline" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "deadline" });
const ver = /*@__PURE__*/ T.ServiceVersion("2023-10-12");
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
              `https://deadline-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://deadline-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://deadline.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://deadline.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://deadline.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      context: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(0, __c0, 0)).annotate({ identifier: "ExceptionContext" }),
      ),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ConflictExceptionReason",
      }),
      resourceId: S.String,
      resourceType: S.String,
      context: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(0, __c0, 0)).annotate({ identifier: "ExceptionContext" }),
      ),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DeadlineRoleNotAssumable
  extends /*@__PURE__*/ S.TaggedError<DeadlineRoleNotAssumable>()(
    "DeadlineRoleNotAssumable",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ValidationExceptionReason",
      }),
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(1825, __c57, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
      context: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(0, __c0, 0)).annotate({ identifier: "ExceptionContext" }),
      ),
    },
    /*@__PURE__*/ T.SyntheticError({
      from: "ValidationException",
      message: { includes: "Could not sts:AssumeRole" },
    }),
  ).pipe(C.withBadRequestError) {}
export class InternalServerErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServerErrorException>()(
    "InternalServerErrorException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()("InternalServerException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
      context: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(0, __c0, 0)).annotate({ identifier: "ExceptionContext" }),
      ),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ServiceQuotaExceededExceptionReason",
      }),
      resourceType: S.String,
      serviceCode: S.String,
      quotaCode: S.String,
      resourceId: /*@__PURE__*/ S.optional(S.String),
      context: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(0, __c0, 0)).annotate({ identifier: "ExceptionContext" }),
      ),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
      context: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(0, __c0, 0)).annotate({ identifier: "ExceptionContext" }),
      ),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ValidationExceptionReason",
      }),
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(1825, __c57, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
      context: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(0, __c0, 0)).annotate({ identifier: "ExceptionContext" }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type FarmId = string;
export type DeadlinePrincipalType = "USER" | "GROUP" | (string & {});
export type IdentityStoreId = string;
export type MembershipLevel = "VIEWER" | "CONTRIBUTOR" | "OWNER" | "MANAGER" | (string & {});
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
export type BooleanString = string;
export type RangeExprString = string;
export type ParameterStringList = string[];
export type PathStringList = string[];
export type IntStringList = string[];
export type FloatStringList = string[];
export type BooleanStringList = string[];
export type NestedIntStringList = string[];
export type IntStringListList = string[][];
export type JobParameter =
  | {
      int: string;
      float?: never;
      string?: never;
      path?: never;
      bool?: never;
      rangeExpr?: never;
      stringList?: never;
      pathList?: never;
      intList?: never;
      floatList?: never;
      boolList?: never;
      intListList?: never;
    }
  | {
      int?: never;
      float: string;
      string?: never;
      path?: never;
      bool?: never;
      rangeExpr?: never;
      stringList?: never;
      pathList?: never;
      intList?: never;
      floatList?: never;
      boolList?: never;
      intListList?: never;
    }
  | {
      int?: never;
      float?: never;
      string: string;
      path?: never;
      bool?: never;
      rangeExpr?: never;
      stringList?: never;
      pathList?: never;
      intList?: never;
      floatList?: never;
      boolList?: never;
      intListList?: never;
    }
  | {
      int?: never;
      float?: never;
      string?: never;
      path: string;
      bool?: never;
      rangeExpr?: never;
      stringList?: never;
      pathList?: never;
      intList?: never;
      floatList?: never;
      boolList?: never;
      intListList?: never;
    }
  | {
      int?: never;
      float?: never;
      string?: never;
      path?: never;
      bool: string;
      rangeExpr?: never;
      stringList?: never;
      pathList?: never;
      intList?: never;
      floatList?: never;
      boolList?: never;
      intListList?: never;
    }
  | {
      int?: never;
      float?: never;
      string?: never;
      path?: never;
      bool?: never;
      rangeExpr: string;
      stringList?: never;
      pathList?: never;
      intList?: never;
      floatList?: never;
      boolList?: never;
      intListList?: never;
    }
  | {
      int?: never;
      float?: never;
      string?: never;
      path?: never;
      bool?: never;
      rangeExpr?: never;
      stringList: string[];
      pathList?: never;
      intList?: never;
      floatList?: never;
      boolList?: never;
      intListList?: never;
    }
  | {
      int?: never;
      float?: never;
      string?: never;
      path?: never;
      bool?: never;
      rangeExpr?: never;
      stringList?: never;
      pathList: string[];
      intList?: never;
      floatList?: never;
      boolList?: never;
      intListList?: never;
    }
  | {
      int?: never;
      float?: never;
      string?: never;
      path?: never;
      bool?: never;
      rangeExpr?: never;
      stringList?: never;
      pathList?: never;
      intList: string[];
      floatList?: never;
      boolList?: never;
      intListList?: never;
    }
  | {
      int?: never;
      float?: never;
      string?: never;
      path?: never;
      bool?: never;
      rangeExpr?: never;
      stringList?: never;
      pathList?: never;
      intList?: never;
      floatList: string[];
      boolList?: never;
      intListList?: never;
    }
  | {
      int?: never;
      float?: never;
      string?: never;
      path?: never;
      bool?: never;
      rangeExpr?: never;
      stringList?: never;
      pathList?: never;
      intList?: never;
      floatList?: never;
      boolList: string[];
      intListList?: never;
    }
  | {
      int?: never;
      float?: never;
      string?: never;
      path?: never;
      bool?: never;
      rangeExpr?: never;
      stringList?: never;
      pathList?: never;
      intList?: never;
      floatList?: never;
      boolList?: never;
      intListList: string[][];
    };
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
export type RunAs = "QUEUE_CONFIGURED_USER" | "WORKER_AGENT_USER" | (string & {});
export interface JobRunAsUser {
  posix?: PosixUser;
  windows?: WindowsUser;
  runAs: RunAs;
}
export type IamRoleArn = string;
export type OpenjdExtensionName = string;
export type OpenjdExtensionNameList = string[];
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
  extensions?: string[];
  pathMappingRules?: PathMappingRule[];
}
export interface JobAttachmentDetailsEntity {
  jobId: string;
  attachments: Attachments;
}
export type Document = unknown;
export type DependenciesList = string[];
export type SerializedSymbolTable = string;
export interface StepDetailsEntity {
  jobId: string;
  stepId: string;
  schemaVersion: string;
  template: any;
  dependencies: string[];
  extensions?: string[];
  resolvedSymbolTable?: string;
}
export interface EnvironmentDetailsEntity {
  jobId: string;
  environmentId: string;
  schemaVersion: string;
  template: any;
  extensions?: string[];
  resolvedSymbolTable?: string;
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
export type BatchGetSessionActionIdentifiers = BatchGetSessionActionIdentifier[];
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
export type TaskRunManifestPropertiesListResponse = TaskRunManifestPropertiesResponse[];
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
  | { int: string; float?: never; string?: never; path?: never; chunkInt?: never }
  | { int?: never; float: string; string?: never; path?: never; chunkInt?: never }
  | { int?: never; float?: never; string: string; path?: never; chunkInt?: never }
  | { int?: never; float?: never; string?: never; path: string; chunkInt?: never }
  | { int?: never; float?: never; string?: never; path?: never; chunkInt: string };
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
export type StepParameterType = "INT" | "FLOAT" | "STRING" | "PATH" | "CHUNK_INT" | (string & {});
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
export type AutoScalingMode = "NO_SCALING" | "EVENT_BASED_AUTO_SCALING" | (string & {});
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
export type ServiceManagedFleetOperatingSystemFamily = "WINDOWS" | "LINUX" | (string & {});
export type EbsIops = number;
export type EbsThroughputMiB = number;
export interface Ec2EbsVolume {
  sizeGiB?: number;
  iops?: number;
  throughputMiB?: number;
}
export type AcceleratorName = "t4" | "a10g" | "l4" | "l40s" | "rtx-pro-server-6000" | (string & {});
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
export type FleetSoftwareAddOnName = "docker" | (string & {});
export interface FleetSoftwareAddOn {
  name: FleetSoftwareAddOnName;
}
export type FleetSoftwareAddOns = FleetSoftwareAddOn[];
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
  softwareAddOns?: FleetSoftwareAddOn[];
}
export type Ec2MarketType = "on-demand" | "spot" | "wait-and-save" | (string & {});
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
  | { customerManaged: CustomerManagedFleetConfiguration; serviceManagedEc2?: never }
  | { customerManaged?: never; serviceManagedEc2: ServiceManagedEc2FleetConfiguration };
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
export type CreateJobTargetTaskRunStatus = "READY" | "SUSPENDED" | (string & {});
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
export type StorageProfileOperatingSystemFamily = "WINDOWS" | "LINUX" | "MACOS" | (string & {});
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
export type AutoScalingStatus = "GROWING" | "STEADY" | "SHRINKING" | (string & {});
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
export type QueueStatus = "IDLE" | "SCHEDULING" | "SCHEDULING_BLOCKED" | (string & {});
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
export type UsageType = "COMPUTE" | "LICENSE" | "PERSISTENT_VOLUME" | (string & {});
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
export type DependencyConsumerResolutionStatus = "RESOLVED" | "UNRESOLVED" | (string & {});
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
  | { userJobsFirst?: never; fieldSort: FieldSortExpression; parameterSort?: never }
  | { userJobsFirst?: never; fieldSort?: never; parameterSort: ParameterSortExpression };
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
export type UpdatedWorkerStatus = "STARTED" | "STOPPING" | "STOPPED" | (string & {});
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
export type TaskRunManifestPropertiesListRequest = TaskRunManifestPropertiesRequest[];
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
export type UpdatedSessionActions = { [key: string]: UpdatedSessionActionInfo | undefined };
export interface UpdateWorkerScheduleRequest {
  farmId: string;
  fleetId: string;
  workerId: string;
  updatedSessionActions?: { [key: string]: UpdatedSessionActionInfo | undefined };
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
export type SessionMetadataKey = string;
export type SessionMetadataValue = string;
export type SessionMetadata = { [key: string]: string | undefined };
export interface AssignedSession {
  queueId: string;
  jobId: string;
  sessionActions: AssignedSessionAction[];
  logConfiguration: LogConfiguration;
  metadata?: { [key: string]: string | undefined };
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
  input: __S(4960, __c155, 0) as any as S.Schema<AssociateMemberToFarmRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<AssociateMemberToFarmResponse>,
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
}));

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
  input: __S(32, __c1, 0) as any as S.Schema<AssociateMemberToFleetRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<AssociateMemberToFleetResponse>,
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
}));

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
  input: __S(448, __c14, 0) as any as S.Schema<AssociateMemberToJobRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<AssociateMemberToJobResponse>,
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
}));

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
  input: __S(832, __c26, 0) as any as S.Schema<AssociateMemberToQueueRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<AssociateMemberToQueueResponse>,
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
}));

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
  input: __S(1184, __c37, 0) as any as S.Schema<AssumeFleetRoleForReadRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<AssumeFleetRoleForReadResponse>,
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
}));

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
  input: __S(1440, __c45, 0) as any as S.Schema<AssumeFleetRoleForWorkerRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<AssumeFleetRoleForWorkerResponse>,
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
}));

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
  input: __S(1472, __c46, 0) as any as S.Schema<AssumeQueueRoleForReadRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<AssumeQueueRoleForReadResponse>,
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
}));

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
  input: __S(1504, __c47, 0) as any as S.Schema<AssumeQueueRoleForUserRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<AssumeQueueRoleForUserResponse>,
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
}));

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
  input: __S(1536, __c48, 0) as any as S.Schema<AssumeQueueRoleForWorkerRequest>,
  output: __S(1537, __c48, 1) as any as S.Schema<AssumeQueueRoleForWorkerResponse>,
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
}));

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
  input: __S(1570, __c49, 2) as any as S.Schema<BatchGetJobRequest>,
  output: __S(1575, __c49, 7) as any as S.Schema<BatchGetJobResponse>,
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
}));

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
  input: __S(1732, __c54, 4) as any as S.Schema<BatchGetJobEntityRequest>,
  output: __S(1746, __c54, 18) as any as S.Schema<BatchGetJobEntityResponse>,
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
}));

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
  input: __S(1858, __c58, 2) as any as S.Schema<BatchGetSessionRequest>,
  output: __S(1863, __c58, 7) as any as S.Schema<BatchGetSessionResponse>,
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
}));

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
  input: __S(1986, __c62, 2) as any as S.Schema<BatchGetSessionActionRequest>,
  output: __S(1991, __c62, 7) as any as S.Schema<BatchGetSessionActionResponse>,
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
}));

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
  input: __S(2146, __c67, 2) as any as S.Schema<BatchGetStepRequest>,
  output: __S(2151, __c67, 7) as any as S.Schema<BatchGetStepResponse>,
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
}));

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
  input: __S(2274, __c71, 2) as any as S.Schema<BatchGetTaskRequest>,
  output: __S(2279, __c71, 7) as any as S.Schema<BatchGetTaskResponse>,
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
}));

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
  input: __S(2306, __c72, 2) as any as S.Schema<BatchGetWorkerRequest>,
  output: __S(2309, __c72, 5) as any as S.Schema<BatchGetWorkerResponse>,
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
}));

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
  input: __S(2402, __c75, 2) as any as S.Schema<BatchUpdateJobRequest>,
  output: __S(2405, __c75, 5) as any as S.Schema<BatchUpdateJobResponse>,
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
}));

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
  input: __S(2434, __c76, 2) as any as S.Schema<BatchUpdateTaskRequest>,
  output: __S(2437, __c76, 5) as any as S.Schema<BatchUpdateTaskResponse>,
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
}));

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
  input: __S(2465, __c77, 1) as any as S.Schema<CopyJobTemplateRequest>,
  output: __S(2466, __c77, 2) as any as S.Schema<CopyJobTemplateResponse>,
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
}));

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
  input: __S(2496, __c78, 0) as any as S.Schema<CreateBudgetRequest>,
  output: __S(2497, __c78, 1) as any as S.Schema<CreateBudgetResponse>,
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
}));

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
  input: __S(2592, __c81, 0) as any as S.Schema<CreateFarmRequest>,
  output: __S(2593, __c81, 1) as any as S.Schema<CreateFarmResponse>,
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
}));

export type CreateFleetError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | ConflictException
  | DeadlineRoleNotAssumable
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
  input: __S(2624, __c82, 0) as any as S.Schema<CreateFleetRequest>,
  output: __S(2625, __c82, 1) as any as S.Schema<CreateFleetResponse>,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    ConflictException,
    DeadlineRoleNotAssumable,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFleet",
  endpointHostPrefix: "management.",
}));

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
  input: __S(2784, __c87, 0) as any as S.Schema<CreateJobRequest>,
  output: __S(1760, __c55, 0) as any as S.Schema<CreateJobResponse>,
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
}));

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
  input: __S(2816, __c88, 0) as any as S.Schema<CreateLicenseEndpointRequest>,
  output: __S(2817, __c88, 1) as any as S.Schema<CreateLicenseEndpointResponse>,
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
}));

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
  input: __S(2848, __c89, 0) as any as S.Schema<CreateLimitRequest>,
  output: __S(2849, __c89, 1) as any as S.Schema<CreateLimitResponse>,
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
}));

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
  input: __S(2880, __c90, 0) as any as S.Schema<CreateMonitorRequest>,
  output: __S(2881, __c90, 1) as any as S.Schema<CreateMonitorResponse>,
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
}));

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
  input: __S(2912, __c91, 0) as any as S.Schema<CreateQueueRequest>,
  output: __S(2913, __c91, 1) as any as S.Schema<CreateQueueResponse>,
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
}));

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
  input: __S(2976, __c93, 0) as any as S.Schema<CreateQueueEnvironmentRequest>,
  output: __S(2977, __c93, 1) as any as S.Schema<CreateQueueEnvironmentResponse>,
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
}));

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
  input: __S(3008, __c94, 0) as any as S.Schema<CreateQueueFleetAssociationRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<CreateQueueFleetAssociationResponse>,
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
}));

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
  input: __S(3040, __c95, 0) as any as S.Schema<CreateQueueLimitAssociationRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<CreateQueueLimitAssociationResponse>,
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
}));

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
  input: __S(3072, __c96, 0) as any as S.Schema<CreateStorageProfileRequest>,
  output: __S(3073, __c96, 1) as any as S.Schema<CreateStorageProfileResponse>,
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
}));

export type CreateWorkerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a worker. A worker tells your instance how much processing power (vCPU), and memory (GiB) you'll need to assemble the digital assets held within a particular instance. You can specify certain instance types to use, or let the worker know which instances types to exclude.
 *
 * Deadline Cloud limits the number of workers to less than or equal to the fleet's maximum worker count. The service maintains eventual consistency for the worker count. If you make multiple rapid calls to `CreateWorker` before the field updates, you might exceed your fleet's maximum worker count. For example, if your `maxWorkerCount` is 10 and you currently have 9 workers, making two quick `CreateWorker` calls might successfully create 2 workers instead of 1, resulting in 11 total workers.
 */
export const createWorker: API.OperationMethod<
  CreateWorkerRequest,
  CreateWorkerResponse,
  CreateWorkerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3136, __c98, 0) as any as S.Schema<CreateWorkerRequest>,
  output: __S(3137, __c98, 1) as any as S.Schema<CreateWorkerResponse>,
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
}));

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
  input: __S(3200, __c100, 0) as any as S.Schema<DeleteBudgetRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<DeleteBudgetResponse>,
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
}));

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
  input: __S(3232, __c101, 0) as any as S.Schema<DeleteFarmRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<DeleteFarmResponse>,
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
}));

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
  input: __S(3264, __c102, 0) as any as S.Schema<DeleteFleetRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<DeleteFleetResponse>,
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
}));

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
  input: __S(3296, __c103, 0) as any as S.Schema<DeleteLicenseEndpointRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<DeleteLicenseEndpointResponse>,
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
}));

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
  input: __S(3328, __c104, 0) as any as S.Schema<DeleteLimitRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<DeleteLimitResponse>,
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
}));

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
  input: __S(3360, __c105, 0) as any as S.Schema<DeleteMeteredProductRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<DeleteMeteredProductResponse>,
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
}));

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
  input: __S(3392, __c106, 0) as any as S.Schema<DeleteMonitorRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<DeleteMonitorResponse>,
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
}));

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
  input: __S(3424, __c107, 0) as any as S.Schema<DeleteQueueRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<DeleteQueueResponse>,
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
}));

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
  input: __S(3456, __c108, 0) as any as S.Schema<DeleteQueueEnvironmentRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<DeleteQueueEnvironmentResponse>,
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
}));

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
  input: __S(3488, __c109, 0) as any as S.Schema<DeleteQueueFleetAssociationRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<DeleteQueueFleetAssociationResponse>,
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
}));

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
  input: __S(3520, __c110, 0) as any as S.Schema<DeleteQueueLimitAssociationRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<DeleteQueueLimitAssociationResponse>,
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
}));

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
  input: __S(3552, __c111, 0) as any as S.Schema<DeleteStorageProfileRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<DeleteStorageProfileResponse>,
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
}));

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
  input: __S(3584, __c112, 0) as any as S.Schema<DeleteVolumeRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<DeleteVolumeResponse>,
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
}));

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
  input: __S(3616, __c113, 0) as any as S.Schema<DeleteWorkerRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<DeleteWorkerResponse>,
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
}));

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
  input: __S(3648, __c114, 0) as any as S.Schema<DisassociateMemberFromFarmRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<DisassociateMemberFromFarmResponse>,
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
}));

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
  input: __S(3680, __c115, 0) as any as S.Schema<DisassociateMemberFromFleetRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<DisassociateMemberFromFleetResponse>,
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
}));

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
  input: __S(3712, __c116, 0) as any as S.Schema<DisassociateMemberFromJobRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<DisassociateMemberFromJobResponse>,
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
}));

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
  input: __S(3744, __c117, 0) as any as S.Schema<DisassociateMemberFromQueueRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<DisassociateMemberFromQueueResponse>,
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
}));

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
  input: __S(3776, __c118, 0) as any as S.Schema<GetBudgetRequest>,
  output: __S(3777, __c118, 1) as any as S.Schema<GetBudgetResponse>,
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
}));

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
  input: __S(3840, __c120, 0) as any as S.Schema<GetFarmRequest>,
  output: __S(3841, __c120, 1) as any as S.Schema<GetFarmResponse>,
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
}));

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
  input: __S(3872, __c121, 0) as any as S.Schema<GetFleetRequest>,
  output: __S(3874, __c121, 2) as any as S.Schema<GetFleetResponse>,
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
}));

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
  input: __S(3904, __c122, 0) as any as S.Schema<GetJobRequest>,
  output: __S(3905, __c122, 1) as any as S.Schema<GetJobResponse>,
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
}));

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
  input: __S(3936, __c123, 0) as any as S.Schema<GetLicenseEndpointRequest>,
  output: __S(3937, __c123, 1) as any as S.Schema<GetLicenseEndpointResponse>,
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
}));

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
  input: __S(3968, __c124, 0) as any as S.Schema<GetLimitRequest>,
  output: __S(3969, __c124, 1) as any as S.Schema<GetLimitResponse>,
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
}));

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
  input: __S(4000, __c125, 0) as any as S.Schema<GetMonitorRequest>,
  output: __S(4032, __c126, 0) as any as S.Schema<GetMonitorResponse>,
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
}));

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
  input: __S(4064, __c127, 0) as any as S.Schema<GetMonitorSettingsRequest>,
  output: __S(4065, __c127, 1) as any as S.Schema<GetMonitorSettingsResponse>,
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
}));

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
  input: __S(4096, __c128, 0) as any as S.Schema<GetQueueRequest>,
  output: __S(4097, __c128, 1) as any as S.Schema<GetQueueResponse>,
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
}));

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
  input: __S(4128, __c129, 0) as any as S.Schema<GetQueueEnvironmentRequest>,
  output: __S(4129, __c129, 1) as any as S.Schema<GetQueueEnvironmentResponse>,
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
}));

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
  input: __S(4160, __c130, 0) as any as S.Schema<GetQueueFleetAssociationRequest>,
  output: __S(4192, __c131, 0) as any as S.Schema<GetQueueFleetAssociationResponse>,
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
}));

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
  input: __S(4224, __c132, 0) as any as S.Schema<GetQueueLimitAssociationRequest>,
  output: __S(4256, __c133, 0) as any as S.Schema<GetQueueLimitAssociationResponse>,
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
}));

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
  input: __S(4288, __c134, 0) as any as S.Schema<GetSessionRequest>,
  output: __S(4289, __c134, 1) as any as S.Schema<GetSessionResponse>,
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
}));

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
  input: __S(4320, __c135, 0) as any as S.Schema<GetSessionActionRequest>,
  output: __S(4321, __c135, 1) as any as S.Schema<GetSessionActionResponse>,
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
}));

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
  input: __S(4352, __c136, 0) as any as S.Schema<GetSessionsStatisticsAggregationRequest>,
  output: __S(4356, __c136, 4) as any as S.Schema<GetSessionsStatisticsAggregationResponse>,
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
  input: __S(4384, __c137, 0) as any as S.Schema<GetStepRequest>,
  output: __S(4385, __c137, 1) as any as S.Schema<GetStepResponse>,
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
}));

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
  input: __S(4416, __c138, 0) as any as S.Schema<GetStorageProfileRequest>,
  output: __S(4417, __c138, 1) as any as S.Schema<GetStorageProfileResponse>,
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
}));

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
  input: __S(4448, __c139, 0) as any as S.Schema<GetStorageProfileForQueueRequest>,
  output: __S(4449, __c139, 1) as any as S.Schema<GetStorageProfileForQueueResponse>,
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
}));

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
  input: __S(4480, __c140, 0) as any as S.Schema<GetTaskRequest>,
  output: __S(4512, __c141, 0) as any as S.Schema<GetTaskResponse>,
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
}));

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
  input: __S(4544, __c142, 0) as any as S.Schema<GetVolumeRequest>,
  output: __S(4545, __c142, 1) as any as S.Schema<GetVolumeResponse>,
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
}));

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
  input: __S(4576, __c143, 0) as any as S.Schema<GetWorkerRequest>,
  output: __S(2368, __c74, 0) as any as S.Schema<GetWorkerResponse>,
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
}));

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
  input: __S(4608, __c144, 0) as any as S.Schema<ListAvailableMeteredProductsRequest>,
  output: __S(4642, __c145, 2) as any as S.Schema<ListAvailableMeteredProductsResponse>,
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
  input: __S(4672, __c146, 0) as any as S.Schema<ListBudgetsRequest>,
  output: __S(4675, __c146, 3) as any as S.Schema<ListBudgetsResponse>,
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
  input: __S(4704, __c147, 0) as any as S.Schema<ListFarmMembersRequest>,
  output: __S(4707, __c147, 3) as any as S.Schema<ListFarmMembersResponse>,
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
  input: __S(4736, __c148, 0) as any as S.Schema<ListFarmsRequest>,
  output: __S(4739, __c148, 3) as any as S.Schema<ListFarmsResponse>,
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
  input: __S(4768, __c149, 0) as any as S.Schema<ListFleetMembersRequest>,
  output: __S(4771, __c149, 3) as any as S.Schema<ListFleetMembersResponse>,
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
  input: __S(4800, __c150, 0) as any as S.Schema<ListFleetsRequest>,
  output: __S(4803, __c150, 3) as any as S.Schema<ListFleetsResponse>,
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
  input: __S(4832, __c151, 0) as any as S.Schema<ListJobMembersRequest>,
  output: __S(4835, __c151, 3) as any as S.Schema<ListJobMembersResponse>,
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
  input: __S(4864, __c152, 0) as any as S.Schema<ListJobParameterDefinitionsRequest>,
  output: __S(4866, __c152, 2) as any as S.Schema<ListJobParameterDefinitionsResponse>,
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
  input: __S(4896, __c153, 0) as any as S.Schema<ListJobsRequest>,
  output: __S(4899, __c153, 3) as any as S.Schema<ListJobsResponse>,
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
  input: __S(4928, __c154, 0) as any as S.Schema<ListLicenseEndpointsRequest>,
  output: __S(4931, __c154, 3) as any as S.Schema<ListLicenseEndpointsResponse>,
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
  input: __S(5024, __c157, 0) as any as S.Schema<ListLimitsRequest>,
  output: __S(5027, __c157, 3) as any as S.Schema<ListLimitsResponse>,
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
  input: __S(5056, __c158, 0) as any as S.Schema<ListMeteredProductsRequest>,
  output: __S(4642, __c145, 2) as any as S.Schema<ListMeteredProductsResponse>,
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
  input: __S(5088, __c159, 0) as any as S.Schema<ListMonitorsRequest>,
  output: __S(5090, __c159, 2) as any as S.Schema<ListMonitorsResponse>,
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
  input: __S(5120, __c160, 0) as any as S.Schema<ListQueueEnvironmentsRequest>,
  output: __S(5123, __c160, 3) as any as S.Schema<ListQueueEnvironmentsResponse>,
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
  input: __S(5152, __c161, 0) as any as S.Schema<ListQueueFleetAssociationsRequest>,
  output: __S(5154, __c161, 2) as any as S.Schema<ListQueueFleetAssociationsResponse>,
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
  input: __S(5184, __c162, 0) as any as S.Schema<ListQueueLimitAssociationsRequest>,
  output: __S(5186, __c162, 2) as any as S.Schema<ListQueueLimitAssociationsResponse>,
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
  input: __S(5216, __c163, 0) as any as S.Schema<ListQueueMembersRequest>,
  output: __S(5219, __c163, 3) as any as S.Schema<ListQueueMembersResponse>,
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
  input: __S(5248, __c164, 0) as any as S.Schema<ListQueuesRequest>,
  output: __S(5251, __c164, 3) as any as S.Schema<ListQueuesResponse>,
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
  input: __S(5280, __c165, 0) as any as S.Schema<ListSessionActionsRequest>,
  output: __S(5285, __c165, 5) as any as S.Schema<ListSessionActionsResponse>,
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
  input: __S(5312, __c166, 0) as any as S.Schema<ListSessionsRequest>,
  output: __S(5315, __c166, 3) as any as S.Schema<ListSessionsResponse>,
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
  input: __S(64, __c2, 0) as any as S.Schema<ListSessionsForWorkerRequest>,
  output: __S(67, __c2, 3) as any as S.Schema<ListSessionsForWorkerResponse>,
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
  input: __S(96, __c3, 0) as any as S.Schema<ListStepConsumersRequest>,
  output: __S(97, __c3, 1) as any as S.Schema<ListStepConsumersResponse>,
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
  input: __S(160, __c5, 0) as any as S.Schema<ListStepDependenciesRequest>,
  output: __S(161, __c5, 1) as any as S.Schema<ListStepDependenciesResponse>,
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
  input: __S(192, __c6, 0) as any as S.Schema<ListStepsRequest>,
  output: __S(195, __c6, 3) as any as S.Schema<ListStepsResponse>,
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
  input: __S(224, __c7, 0) as any as S.Schema<ListStorageProfilesRequest>,
  output: __S(258, __c8, 2) as any as S.Schema<ListStorageProfilesResponse>,
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
  input: __S(288, __c9, 0) as any as S.Schema<ListStorageProfilesForQueueRequest>,
  output: __S(258, __c8, 2) as any as S.Schema<ListStorageProfilesForQueueResponse>,
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
  input: __S(320, __c10, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(321, __c10, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
}));

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
  input: __S(352, __c11, 0) as any as S.Schema<ListTasksRequest>,
  output: __S(354, __c11, 2) as any as S.Schema<ListTasksResponse>,
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
  input: __S(384, __c12, 0) as any as S.Schema<ListVolumesRequest>,
  output: __S(387, __c12, 3) as any as S.Schema<ListVolumesResponse>,
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
  input: __S(416, __c13, 0) as any as S.Schema<ListWorkersRequest>,
  output: __S(417, __c13, 1) as any as S.Schema<ListWorkersResponse>,
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
  input: __S(480, __c15, 0) as any as S.Schema<PutMeteredProductRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<PutMeteredProductResponse>,
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
}));

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
  input: __S(512, __c16, 0) as any as S.Schema<SearchJobsRequest>,
  output: __S(515, __c16, 3) as any as S.Schema<SearchJobsResponse>,
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
}));

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
  input: __S(576, __c18, 0) as any as S.Schema<SearchStepsRequest>,
  output: __S(579, __c18, 3) as any as S.Schema<SearchStepsResponse>,
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
}));

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
  input: __S(608, __c19, 0) as any as S.Schema<SearchTasksRequest>,
  output: __S(611, __c19, 3) as any as S.Schema<SearchTasksResponse>,
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
}));

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
  input: __S(640, __c20, 0) as any as S.Schema<SearchWorkersRequest>,
  output: __S(643, __c20, 3) as any as S.Schema<SearchWorkersResponse>,
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
}));

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
  input: __S(673, __c21, 1) as any as S.Schema<StartSessionsStatisticsAggregationRequest>,
  output: __S(674, __c21, 2) as any as S.Schema<StartSessionsStatisticsAggregationResponse>,
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
}));

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
  input: __S(704, __c22, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(736, __c23, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(770, __c24, 2) as any as S.Schema<UpdateBudgetRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<UpdateBudgetResponse>,
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
}));

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
  input: __S(800, __c25, 0) as any as S.Schema<UpdateFarmRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<UpdateFarmResponse>,
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
}));

export type UpdateFleetError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | DeadlineRoleNotAssumable
  | CommonErrors;
/**
 * Updates a fleet.
 *
 * Workers that are running when you call `UpdateFleet` keep the instance type and capabilities that they launched with until they scale in. Deadline Cloud can schedule jobs that you submit after the update on these existing workers, so the new configuration might not take effect immediately. To make sure that all workers use the new configuration, set `maxWorkerCount` to 0, use the `ListWorkers` operation to confirm that the fleet has no workers, and then restore `maxWorkerCount`.
 */
export const updateFleet: API.OperationMethod<
  UpdateFleetRequest,
  UpdateFleetResponse,
  UpdateFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c27, 0) as any as S.Schema<UpdateFleetRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<UpdateFleetResponse>,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    DeadlineRoleNotAssumable,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFleet",
  endpointHostPrefix: "management.",
}));

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
  input: __S(896, __c28, 0) as any as S.Schema<UpdateJobRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<UpdateJobResponse>,
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
}));

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
  input: __S(928, __c29, 0) as any as S.Schema<UpdateLimitRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<UpdateLimitResponse>,
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
}));

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
  input: __S(960, __c30, 0) as any as S.Schema<UpdateMonitorRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<UpdateMonitorResponse>,
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
}));

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
  input: __S(992, __c31, 0) as any as S.Schema<UpdateMonitorSettingsRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<UpdateMonitorSettingsResponse>,
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
}));

export type UpdateQueueError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | ConflictException
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
  input: __S(1024, __c32, 0) as any as S.Schema<UpdateQueueRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<UpdateQueueResponse>,
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
  operationName: "UpdateQueue",
  endpointHostPrefix: "management.",
}));

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
  input: __S(1056, __c33, 0) as any as S.Schema<UpdateQueueEnvironmentRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<UpdateQueueEnvironmentResponse>,
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
}));

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
  input: __S(1088, __c34, 0) as any as S.Schema<UpdateQueueFleetAssociationRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<UpdateQueueFleetAssociationResponse>,
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
}));

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
  input: __S(1120, __c35, 0) as any as S.Schema<UpdateQueueLimitAssociationRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<UpdateQueueLimitAssociationResponse>,
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
}));

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
  input: __S(1152, __c36, 0) as any as S.Schema<UpdateSessionRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<UpdateSessionResponse>,
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
}));

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
  input: __S(1280, __c40, 0) as any as S.Schema<UpdateStepRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<UpdateStepResponse>,
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
}));

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
  input: __S(1312, __c41, 0) as any as S.Schema<UpdateStorageProfileRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<UpdateStorageProfileResponse>,
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
}));

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
  input: __S(1344, __c42, 0) as any as S.Schema<UpdateTaskRequest>,
  output: __S(4992, __c156, 0) as any as S.Schema<UpdateTaskResponse>,
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
}));

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
  input: __S(1379, __c43, 3) as any as S.Schema<UpdateWorkerRequest>,
  output: __S(1380, __c43, 4) as any as S.Schema<UpdateWorkerResponse>,
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
}));

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
  input: __S(1410, __c44, 2) as any as S.Schema<UpdateWorkerScheduleRequest>,
  output: __S(1416, __c44, 8) as any as S.Schema<UpdateWorkerScheduleResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          fleetId: S.String.pipe(T.HttpLabel("fleetId")),
          principalType: S.String,
          identityStoreId: S.String,
          membershipLevel: S.String,
          principalId: S.String.pipe(T.HttpLabel("principalId")),
          identityCenterRegion: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}/members/{principalId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateMemberToFleetRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          fleetId: S.String.pipe(T.HttpLabel("fleetId")),
          workerId: S.String.pipe(T.HttpLabel("workerId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}/workers/{workerId}/sessions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSessionsForWorkerRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          sessionId: S.String,
          queueId: S.String,
          jobId: S.String,
          startedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lifecycleStatus: S.String,
          endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          targetLifecycleStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "WorkerSessionSummary" });
    case 2:
      return S.Array(__S(65, __c2, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ sessions: __S(66, __c2, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSessionsForWorkerResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          jobId: S.String.pipe(T.HttpLabel("jobId")),
          stepId: S.String.pipe(T.HttpLabel("stepId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/steps/{stepId}/consumers",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListStepConsumersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ consumers: __S(129, __c4, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListStepConsumersResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ stepId: S.String, status: S.String })).annotate({
        identifier: "StepConsumer",
      });
    case 1:
      return S.Array(__S(128, __c4, 0));
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          jobId: S.String.pipe(T.HttpLabel("jobId")),
          stepId: S.String.pipe(T.HttpLabel("stepId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/steps/{stepId}/dependencies",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListStepDependenciesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ dependencies: __S(129, __c4, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListStepDependenciesResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          jobId: S.String.pipe(T.HttpLabel("jobId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/steps",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListStepsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          stepId: S.String,
          name: S.String,
          lifecycleStatus: S.String,
          lifecycleStatusMessage: S.optional(S.String),
          taskRunStatus: S.String,
          taskRunStatusCounts: __S(1696, __c53, 0),
          taskFailureRetryCount: S.optional(S.Number),
          targetTaskRunStatus: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdBy: S.String,
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedBy: S.optional(S.String),
          startedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          dependencyCounts: S.optional(__S(2208, __c69, 0)),
        }),
      ).annotate({ identifier: "StepSummary" });
    case 2:
      return S.Array(__S(193, __c6, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ steps: __S(194, __c6, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListStepsResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2023-10-12/farms/{farmId}/storage-profiles" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListStorageProfilesRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ storageProfileId: S.String, displayName: S.String, osFamily: S.String }),
      ).annotate({ identifier: "StorageProfileSummary" });
    case 1:
      return S.Array(__S(256, __c8, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ storageProfiles: __S(257, __c8, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListStorageProfilesResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/storage-profiles",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListStorageProfilesForQueueRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2023-10-12/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(0, __c0, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          jobId: S.String.pipe(T.HttpLabel("jobId")),
          stepId: S.String.pipe(T.HttpLabel("stepId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/steps/{stepId}/tasks",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTasksRequest" });
    case 1:
      return S.Array(__S(4512, __c141, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ tasks: __S(353, __c11, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTasksResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          fleetId: S.String.pipe(T.HttpLabel("fleetId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}/volumes" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListVolumesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          volumeId: S.String,
          farmId: S.String,
          fleetId: S.String,
          state: S.String,
          sizeGiB: S.Number,
          availabilityZoneId: S.String,
          attachedWorkerId: S.optional(S.String),
        }),
      ).annotate({ identifier: "VolumeSummary" });
    case 2:
      return S.Array(__S(385, __c12, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ volumes: __S(386, __c12, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListVolumesResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          fleetId: S.String.pipe(T.HttpLabel("fleetId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}/workers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListWorkersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ workers: __S(2336, __c73, 0), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListWorkersResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          jobId: S.String.pipe(T.HttpLabel("jobId")),
          principalType: S.String,
          identityStoreId: S.String,
          membershipLevel: S.String,
          principalId: S.String.pipe(T.HttpLabel("principalId")),
          identityCenterRegion: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/members/{principalId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateMemberToJobRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          licenseEndpointId: S.String.pipe(T.HttpLabel("licenseEndpointId")),
          productId: S.String.pipe(T.HttpLabel("productId")),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/2023-10-12/license-endpoints/{licenseEndpointId}/metered-products/{productId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutMeteredProductRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          filterExpressions: S.optional(__S(550, __c17, 6)),
          sortExpressions: S.optional(__S(554, __c17, 10)),
          itemOffset: S.Number,
          pageSize: S.optional(S.Number),
          queueIds: __S(1600, __c50, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2023-10-12/farms/{farmId}/search/jobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobId: S.optional(S.String),
          queueId: S.optional(S.String),
          name: S.optional(S.String),
          lifecycleStatus: S.optional(S.String),
          lifecycleStatusMessage: S.optional(S.String),
          taskRunStatus: S.optional(S.String),
          targetTaskRunStatus: S.optional(S.String),
          taskRunStatusCounts: S.optional(__S(1696, __c53, 0)),
          taskFailureRetryCount: S.optional(S.Number),
          priority: S.optional(S.Number),
          maxFailedTasksCount: S.optional(S.Number),
          maxRetriesPerTask: S.optional(S.Number),
          createdBy: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          startedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedBy: S.optional(S.String),
          jobParameters: S.optional(__S(1666, __c52, 2)),
          maxWorkerCount: S.optional(S.Number),
          sourceJobId: S.optional(S.String),
        }),
      ).annotate({ identifier: "JobSearchSummary" });
    case 2:
      return S.Array(__S(513, __c16, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          jobs: __S(514, __c16, 2),
          nextItemOffset: S.optional(S.Number),
          totalResults: S.Number,
        }),
      ).annotate({ identifier: "SearchJobsResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          operator: S.String,
          dateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "DateTimeFilterExpression" });
    case 1:
      return S.suspend(() =>
        S.Struct({ name: S.String, operator: S.String, value: S.String }),
      ).annotate({ identifier: "ParameterFilterExpression" });
    case 2:
      return S.suspend(() =>
        S.Struct({ searchTerm: S.String, matchType: S.optional(S.String) }),
      ).annotate({ identifier: "SearchTermFilterExpression" });
    case 3:
      return S.suspend(() =>
        S.Struct({ name: S.String, operator: S.String, values: __S(1600, __c50, 0) }),
      ).annotate({ identifier: "StringListFilterExpression" });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ dateTimeFilter: __S(544, __c17, 0) }),
        /*@__PURE__*/ S.Struct({ parameterFilter: __S(545, __c17, 1) }),
        /*@__PURE__*/ S.Struct({ searchTermFilter: __S(546, __c17, 2) }),
        /*@__PURE__*/ S.Struct({ stringFilter: __S(545, __c17, 1) }),
        /*@__PURE__*/ S.Struct({ stringListFilter: __S(547, __c17, 3) }),
        /*@__PURE__*/ S.Struct({
          groupFilter: /*@__PURE__*/ S.suspend((): S.Schema<SearchGroupedFilterExpressions> =>
            __S(550, __c17, 6),
          ).annotate({ identifier: "SearchGroupedFilterExpressions" }),
        }),
      ]);
    case 5:
      return S.Array(
        /*@__PURE__*/ S.suspend(() => __S(548, __c17, 4)).annotate({
          identifier: "SearchFilterExpression",
        }),
      );
    case 6:
      return S.suspend(() =>
        S.Struct({
          filters: S.suspend(() => __S(549, __c17, 5)).annotate({
            identifier: "SearchFilterExpressions",
          }),
          operator: S.String,
        }),
      ).annotate({ identifier: "SearchGroupedFilterExpressions" });
    case 7:
      return S.suspend(() => S.Struct({ userIdentityId: S.String })).annotate({
        identifier: "UserJobsFirst",
      });
    case 8:
      return S.suspend(() => S.Struct({ sortOrder: S.String, name: S.String })).annotate({
        identifier: "FieldSortExpression",
      });
    case 9:
      return S.Union([
        /*@__PURE__*/ S.Struct({ userJobsFirst: __S(551, __c17, 7) }),
        /*@__PURE__*/ S.Struct({ fieldSort: __S(552, __c17, 8) }),
        /*@__PURE__*/ S.Struct({ parameterSort: __S(552, __c17, 8) }),
      ]);
    case 10:
      return S.Array(__S(553, __c17, 9));
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          filterExpressions: S.optional(__S(550, __c17, 6)),
          sortExpressions: S.optional(__S(554, __c17, 10)),
          itemOffset: S.Number,
          pageSize: S.optional(S.Number),
          queueIds: __S(1600, __c50, 0),
          jobId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2023-10-12/farms/{farmId}/search/steps" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchStepsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          stepId: S.optional(S.String),
          jobId: S.optional(S.String),
          queueId: S.optional(S.String),
          name: S.optional(S.String),
          lifecycleStatus: S.optional(S.String),
          lifecycleStatusMessage: S.optional(S.String),
          taskRunStatus: S.optional(S.String),
          targetTaskRunStatus: S.optional(S.String),
          taskRunStatusCounts: S.optional(__S(1696, __c53, 0)),
          taskFailureRetryCount: S.optional(S.Number),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          createdBy: S.optional(S.String),
          startedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedBy: S.optional(S.String),
          parameterSpace: S.optional(__S(2243, __c70, 3)),
        }),
      ).annotate({ identifier: "StepSearchSummary" });
    case 2:
      return S.Array(__S(577, __c18, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          steps: __S(578, __c18, 2),
          nextItemOffset: S.optional(S.Number),
          totalResults: S.Number,
        }),
      ).annotate({ identifier: "SearchStepsResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          filterExpressions: S.optional(__S(550, __c17, 6)),
          sortExpressions: S.optional(__S(554, __c17, 10)),
          itemOffset: S.Number,
          pageSize: S.optional(S.Number),
          queueIds: __S(1600, __c50, 0),
          jobId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2023-10-12/farms/{farmId}/search/tasks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchTasksRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          taskId: S.optional(S.String),
          stepId: S.optional(S.String),
          jobId: S.optional(S.String),
          queueId: S.optional(S.String),
          runStatus: S.optional(S.String),
          targetRunStatus: S.optional(S.String),
          parameters: S.optional(__S(2017, __c63, 1)),
          failureRetryCount: S.optional(S.Number),
          startedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedBy: S.optional(S.String),
          latestSessionActionId: S.optional(S.String),
        }),
      ).annotate({ identifier: "TaskSearchSummary" });
    case 2:
      return S.Array(__S(609, __c19, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          tasks: __S(610, __c19, 2),
          nextItemOffset: S.optional(S.Number),
          totalResults: S.Number,
        }),
      ).annotate({ identifier: "SearchTasksResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          filterExpressions: S.optional(__S(550, __c17, 6)),
          sortExpressions: S.optional(__S(554, __c17, 10)),
          itemOffset: S.Number,
          pageSize: S.optional(S.Number),
          fleetIds: __S(1600, __c50, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2023-10-12/farms/{farmId}/search/workers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchWorkersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          fleetId: S.optional(S.String),
          workerId: S.optional(S.String),
          status: S.optional(S.String),
          hostProperties: S.optional(__S(1920, __c60, 0)),
          createdBy: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedBy: S.optional(S.String),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "WorkerSearchSummary" });
    case 2:
      return S.Array(__S(641, __c20, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          workers: __S(642, __c20, 2),
          nextItemOffset: S.optional(S.Number),
          totalResults: S.Number,
        }),
      ).annotate({ identifier: "SearchWorkersResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ queueIds: __S(1600, __c50, 0) }),
        /*@__PURE__*/ S.Struct({ fleetIds: __S(1600, __c50, 0) }),
      ]);
    case 1:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          resourceIds: __S(672, __c21, 0),
          startTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          endTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          timezone: S.optional(S.String),
          period: S.optional(S.String),
          groupBy: __S(2688, __c84, 0),
          statistics: __S(2688, __c84, 0),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/2023-10-12/farms/{farmId}/sessions-statistics-aggregation",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartSessionsStatisticsAggregationRequest" });
    case 2:
      return S.suspend(() => S.Struct({ aggregationId: S.String })).annotate({
        identifier: "StartSessionsStatisticsAggregationResponse",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: S.optional(__S(0, __c0, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2023-10-12/tags/{resourceArn}" }),
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
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(1600, __c50, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/2023-10-12/tags/{resourceArn}" }),
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
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ type: S.String, thresholdPercentage: S.Number })).annotate({
        identifier: "BudgetActionToRemove",
      });
    case 1:
      return S.Array(__S(768, __c24, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          budgetId: S.String.pipe(T.HttpLabel("budgetId")),
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Amz-Client-Token"),
            T.IdempotencyToken(),
          ),
          displayName: S.optional(S.String),
          description: S.optional(SensitiveString),
          status: S.optional(S.String),
          approximateDollarLimit: S.optional(S.Number),
          actionsToAdd: S.optional(__S(2529, __c79, 1)),
          actionsToRemove: S.optional(__S(769, __c24, 1)),
          schedule: S.optional(__S(2531, __c79, 3)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/2023-10-12/farms/{farmId}/budgets/{budgetId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateBudgetRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          displayName: S.optional(S.String),
          description: S.optional(SensitiveString),
          costScaleFactor: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/2023-10-12/farms/{farmId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateFarmRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          principalType: S.String,
          identityStoreId: S.String,
          membershipLevel: S.String,
          principalId: S.String.pipe(T.HttpLabel("principalId")),
          identityCenterRegion: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/members/{principalId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateMemberToQueueRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          fleetId: S.String.pipe(T.HttpLabel("fleetId")),
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Amz-Client-Token"),
            T.IdempotencyToken(),
          ),
          displayName: S.optional(S.String),
          description: S.optional(SensitiveString),
          roleArn: S.optional(S.String),
          minWorkerCount: S.optional(S.Number),
          maxWorkerCount: S.optional(S.Number),
          configuration: S.optional(__S(2737, __c85, 17)),
          hostConfiguration: S.optional(__S(2656, __c83, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateFleetRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          jobId: S.String.pipe(T.HttpLabel("jobId")),
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Amz-Client-Token"),
            T.IdempotencyToken(),
          ),
          targetTaskRunStatus: S.optional(S.String),
          priority: S.optional(S.Number),
          maxFailedTasksCount: S.optional(S.Number),
          maxRetriesPerTask: S.optional(S.Number),
          lifecycleStatus: S.optional(S.String),
          maxWorkerCount: S.optional(S.Number),
          name: S.optional(S.String),
          description: S.optional(SensitiveString),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateJobRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          limitId: S.String.pipe(T.HttpLabel("limitId")),
          displayName: S.optional(S.String),
          description: S.optional(SensitiveString),
          maxCount: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/2023-10-12/farms/{farmId}/limits/{limitId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateLimitRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          monitorId: S.String.pipe(T.HttpLabel("monitorId")),
          subdomain: S.optional(S.String),
          displayName: S.optional(S.String),
          roleArn: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/2023-10-12/monitors/{monitorId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateMonitorRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          monitorId: S.String.pipe(T.HttpLabel("monitorId")),
          settings: __S(0, __c0, 0),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/2023-10-12/monitors/{monitorId}/settings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateMonitorSettingsRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Amz-Client-Token"),
            T.IdempotencyToken(),
          ),
          displayName: S.optional(S.String),
          description: S.optional(SensitiveString),
          defaultBudgetAction: S.optional(S.String),
          jobAttachmentSettings: S.optional(__S(1792, __c56, 0)),
          roleArn: S.optional(S.String),
          jobRunAsUser: S.optional(__S(1795, __c56, 3)),
          requiredFileSystemLocationNamesToAdd: S.optional(__S(1600, __c50, 0)),
          requiredFileSystemLocationNamesToRemove: S.optional(__S(1600, __c50, 0)),
          allowedStorageProfileIdsToAdd: S.optional(__S(1600, __c50, 0)),
          allowedStorageProfileIdsToRemove: S.optional(__S(1600, __c50, 0)),
          schedulingConfiguration: S.optional(__S(2948, __c92, 4)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/2023-10-12/farms/{farmId}/queues/{queueId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateQueueRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          queueEnvironmentId: S.String.pipe(T.HttpLabel("queueEnvironmentId")),
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Amz-Client-Token"),
            T.IdempotencyToken(),
          ),
          priority: S.optional(S.Number),
          templateType: S.optional(S.String),
          template: S.optional(SensitiveString),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/environments/{queueEnvironmentId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateQueueEnvironmentRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          fleetId: S.String.pipe(T.HttpLabel("fleetId")),
          status: S.String,
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/2023-10-12/farms/{farmId}/queue-fleet-associations/{queueId}/{fleetId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateQueueFleetAssociationRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          limitId: S.String.pipe(T.HttpLabel("limitId")),
          status: S.String,
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/2023-10-12/farms/{farmId}/queue-limit-associations/{queueId}/{limitId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateQueueLimitAssociationRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          jobId: S.String.pipe(T.HttpLabel("jobId")),
          sessionId: S.String.pipe(T.HttpLabel("sessionId")),
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Amz-Client-Token"),
            T.IdempotencyToken(),
          ),
          targetLifecycleStatus: S.String,
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/sessions/{sessionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSessionRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          fleetId: S.String.pipe(T.HttpLabel("fleetId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}/read-roles",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssumeFleetRoleForReadRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ credentials: __S(1248, __c39, 0) })).annotate({
        identifier: "AssumeFleetRoleForReadResponse",
      });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accessKeyId: SensitiveString,
          secretAccessKey: SensitiveString,
          sessionToken: SensitiveString,
          expiration: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "AwsCredentials" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          jobId: S.String.pipe(T.HttpLabel("jobId")),
          stepId: S.String.pipe(T.HttpLabel("stepId")),
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Amz-Client-Token"),
            T.IdempotencyToken(),
          ),
          targetTaskRunStatus: S.String,
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/steps/{stepId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateStepRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          storageProfileId: S.String.pipe(T.HttpLabel("storageProfileId")),
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Amz-Client-Token"),
            T.IdempotencyToken(),
          ),
          displayName: S.optional(S.String),
          osFamily: S.optional(S.String),
          fileSystemLocationsToAdd: S.optional(__S(3105, __c97, 1)),
          fileSystemLocationsToRemove: S.optional(__S(3105, __c97, 1)),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/2023-10-12/farms/{farmId}/storage-profiles/{storageProfileId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateStorageProfileRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          jobId: S.String.pipe(T.HttpLabel("jobId")),
          stepId: S.String.pipe(T.HttpLabel("stepId")),
          taskId: S.String.pipe(T.HttpLabel("taskId")),
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Amz-Client-Token"),
            T.IdempotencyToken(),
          ),
          targetRunStatus: S.String,
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/steps/{stepId}/tasks/{taskId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateTaskRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, value: S.Number })).annotate({
        identifier: "WorkerAmountCapability",
      });
    case 1:
      return S.Array(__S(1376, __c43, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ amounts: __S(1377, __c43, 1), attributes: __S(2753, __c86, 1) }),
      ).annotate({ identifier: "WorkerCapabilities" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          fleetId: S.String.pipe(T.HttpLabel("fleetId")),
          workerId: S.String.pipe(T.HttpLabel("workerId")),
          status: S.optional(S.String),
          capabilities: S.optional(__S(1378, __c43, 2)),
          hostProperties: S.optional(__S(3168, __c99, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}/workers/{workerId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateWorkerRequest" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          log: S.optional(__S(1952, __c61, 0)),
          hostConfiguration: S.optional(__S(2656, __c83, 0)),
        }),
      ).annotate({ identifier: "UpdateWorkerResponse" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          completedStatus: S.optional(S.String),
          processExitCode: S.optional(S.Number),
          progressMessage: S.optional(SensitiveString),
          startedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          progressPercent: S.optional(S.Number),
          manifests: S.optional(__S(2113, __c66, 1)),
        }),
      ).annotate({ identifier: "UpdatedSessionActionInfo" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(1408, __c44, 0).pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          fleetId: S.String.pipe(T.HttpLabel("fleetId")),
          workerId: S.String.pipe(T.HttpLabel("workerId")),
          updatedSessionActions: S.optional(__S(1409, __c44, 1)),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}/workers/{workerId}/schedule",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateWorkerScheduleRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({ sessionActionId: S.String, definition: __S(2081, __c65, 1) }),
      ).annotate({ identifier: "AssignedSessionAction" });
    case 4:
      return S.Array(__S(1411, __c44, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          queueId: S.String,
          jobId: S.String,
          sessionActions: __S(1412, __c44, 4),
          logConfiguration: __S(1952, __c61, 0),
          metadata: S.optional(__S(0, __c0, 0)),
        }),
      ).annotate({ identifier: "AssignedSession" });
    case 6:
      return S.Record(S.String, /*@__PURE__*/ __S(1413, __c44, 5).pipe(S.optional));
    case 7:
      return S.Record(S.String, /*@__PURE__*/ __S(1600, __c50, 0).pipe(S.optional));
    case 8:
      return S.suspend(() =>
        S.Struct({
          assignedSessions: __S(1414, __c44, 6),
          cancelSessionActions: __S(1415, __c44, 7),
          desiredWorkerStatus: S.optional(S.String),
          updateIntervalSeconds: S.Number,
        }),
      ).annotate({ identifier: "UpdateWorkerScheduleResponse" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          fleetId: S.String.pipe(T.HttpLabel("fleetId")),
          workerId: S.String.pipe(T.HttpLabel("workerId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}/workers/{workerId}/fleet-roles",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssumeFleetRoleForWorkerRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/read-roles",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssumeQueueRoleForReadRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/user-roles",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssumeQueueRoleForUserRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          fleetId: S.String.pipe(T.HttpLabel("fleetId")),
          workerId: S.String.pipe(T.HttpLabel("workerId")),
          queueId: S.String.pipe(T.HttpQuery("queueId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}/workers/{workerId}/queue-roles",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssumeQueueRoleForWorkerRequest" });
    case 1:
      return S.suspend(() => S.Struct({ credentials: S.optional(__S(1248, __c39, 0)) })).annotate({
        identifier: "AssumeQueueRoleForWorkerResponse",
      });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ farmId: S.String, queueId: S.String, jobId: S.String }),
      ).annotate({ identifier: "BatchGetJobIdentifier" });
    case 1:
      return S.Array(__S(1568, __c49, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ identifiers: __S(1569, __c49, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2023-10-12/batch-get-job" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetJobRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String,
          queueId: S.String,
          jobId: S.String,
          name: S.String,
          lifecycleStatus: S.String,
          lifecycleStatusMessage: S.String,
          priority: S.Number,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdBy: S.String,
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedBy: S.optional(S.String),
          startedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          taskRunStatus: S.optional(S.String),
          targetTaskRunStatus: S.optional(S.String),
          taskRunStatusCounts: S.optional(__S(1696, __c53, 0)),
          taskFailureRetryCount: S.optional(S.Number),
          storageProfileId: S.optional(S.String),
          maxFailedTasksCount: S.optional(S.Number),
          maxRetriesPerTask: S.optional(S.Number),
          parameters: S.optional(__S(1666, __c52, 2)),
          attachments: S.optional(__S(1634, __c51, 2)),
          description: S.optional(SensitiveString),
          maxWorkerCount: S.optional(S.Number),
          sourceJobId: S.optional(S.String),
        }),
      ).annotate({ identifier: "BatchGetJobItem" });
    case 4:
      return S.Array(__S(1571, __c49, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String,
          queueId: S.String,
          jobId: S.String,
          code: S.String,
          message: S.String,
        }),
      ).annotate({ identifier: "BatchGetJobError" });
    case 6:
      return S.Array(__S(1573, __c49, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ jobs: __S(1572, __c49, 4), errors: __S(1574, __c49, 6) }),
      ).annotate({ identifier: "BatchGetJobResponse" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          fileSystemLocationName: S.optional(S.String),
          rootPath: S.String,
          rootPathFormat: S.String,
          outputRelativeDirectories: S.optional(__S(1600, __c50, 0)),
          inputManifestPath: S.optional(S.String),
          inputManifestHash: S.optional(S.String),
        }),
      ).annotate({ identifier: "ManifestProperties" });
    case 1:
      return S.Array(__S(1632, __c51, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ manifests: __S(1633, __c51, 1), fileSystem: S.optional(S.String) }),
      ).annotate({ identifier: "Attachments" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(1600, __c50, 0));
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ int: S.String }),
        /*@__PURE__*/ S.Struct({ float: S.String }),
        /*@__PURE__*/ S.Struct({ string: S.String }),
        /*@__PURE__*/ S.Struct({ path: S.String }),
        /*@__PURE__*/ S.Struct({ bool: S.String }),
        /*@__PURE__*/ S.Struct({ rangeExpr: S.String }),
        /*@__PURE__*/ S.Struct({ stringList: __S(1600, __c50, 0) }),
        /*@__PURE__*/ S.Struct({ pathList: __S(1600, __c50, 0) }),
        /*@__PURE__*/ S.Struct({ intList: __S(1600, __c50, 0) }),
        /*@__PURE__*/ S.Struct({ floatList: __S(1600, __c50, 0) }),
        /*@__PURE__*/ S.Struct({ boolList: __S(1600, __c50, 0) }),
        /*@__PURE__*/ S.Struct({ intListList: __S(1664, __c52, 0) }),
      ]);
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(1665, __c52, 1).pipe(S.optional));
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.Number.pipe(S.optional));
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ jobId: S.String, stepId: S.String })).annotate({
        identifier: "StepDetailsIdentifiers",
      });
    case 1:
      return S.suspend(() => S.Struct({ jobId: S.String, environmentId: S.String })).annotate({
        identifier: "EnvironmentDetailsIdentifiers",
      });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ jobDetails: __S(1760, __c55, 0) }),
        /*@__PURE__*/ S.Struct({ jobAttachmentDetails: __S(1760, __c55, 0) }),
        /*@__PURE__*/ S.Struct({ stepDetails: __S(1728, __c54, 0) }),
        /*@__PURE__*/ S.Struct({ environmentDetails: __S(1729, __c54, 1) }),
      ]);
    case 3:
      return S.Array(__S(1730, __c54, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          fleetId: S.String.pipe(T.HttpLabel("fleetId")),
          workerId: S.String.pipe(T.HttpLabel("workerId")),
          identifiers: __S(1731, __c54, 3),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}/workers/{workerId}/batchGetJobEntity",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetJobEntityRequest" });
    case 5:
      return S.suspend(() =>
        S.Struct({ sourcePathFormat: S.String, sourcePath: S.String, destinationPath: S.String }),
      ).annotate({ identifier: "PathMappingRule" });
    case 6:
      return S.Array(__S(1733, __c54, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String,
          jobAttachmentSettings: S.optional(__S(1792, __c56, 0)),
          jobRunAsUser: S.optional(__S(1795, __c56, 3)),
          logGroupName: S.String,
          queueRoleArn: S.optional(S.String),
          parameters: S.optional(__S(1666, __c52, 2)),
          schemaVersion: S.String,
          extensions: S.optional(__S(1600, __c50, 0)),
          pathMappingRules: S.optional(__S(1734, __c54, 6)),
        }),
      ).annotate({ identifier: "JobDetailsEntity" });
    case 8:
      return S.suspend(() =>
        S.Struct({ jobId: S.String, attachments: __S(1634, __c51, 2) }),
      ).annotate({ identifier: "JobAttachmentDetailsEntity" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String,
          stepId: S.String,
          schemaVersion: S.String,
          template: S.Any,
          dependencies: __S(1600, __c50, 0),
          extensions: S.optional(__S(1600, __c50, 0)),
          resolvedSymbolTable: S.optional(S.String),
        }),
      ).annotate({ identifier: "StepDetailsEntity" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String,
          environmentId: S.String,
          schemaVersion: S.String,
          template: S.Any,
          extensions: S.optional(__S(1600, __c50, 0)),
          resolvedSymbolTable: S.optional(S.String),
        }),
      ).annotate({ identifier: "EnvironmentDetailsEntity" });
    case 11:
      return S.Union([
        /*@__PURE__*/ S.Struct({ jobDetails: __S(1735, __c54, 7) }),
        /*@__PURE__*/ S.Struct({ jobAttachmentDetails: __S(1736, __c54, 8) }),
        /*@__PURE__*/ S.Struct({ stepDetails: __S(1737, __c54, 9) }),
        /*@__PURE__*/ S.Struct({ environmentDetails: __S(1738, __c54, 10) }),
      ]);
    case 12:
      return S.Array(__S(1739, __c54, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({ jobId: S.String, code: S.String, message: S.String }),
      ).annotate({ identifier: "JobDetailsError" });
    case 14:
      return S.suspend(() =>
        S.Struct({ jobId: S.String, stepId: S.String, code: S.String, message: S.String }),
      ).annotate({ identifier: "StepDetailsError" });
    case 15:
      return S.suspend(() =>
        S.Struct({ jobId: S.String, environmentId: S.String, code: S.String, message: S.String }),
      ).annotate({ identifier: "EnvironmentDetailsError" });
    case 16:
      return S.Union([
        /*@__PURE__*/ S.Struct({ jobDetails: __S(1741, __c54, 13) }),
        /*@__PURE__*/ S.Struct({ jobAttachmentDetails: __S(1741, __c54, 13) }),
        /*@__PURE__*/ S.Struct({ stepDetails: __S(1742, __c54, 14) }),
        /*@__PURE__*/ S.Struct({ environmentDetails: __S(1743, __c54, 15) }),
      ]);
    case 17:
      return S.Array(__S(1744, __c54, 16));
    case 18:
      return S.suspend(() =>
        S.Struct({ entities: __S(1740, __c54, 12), errors: __S(1745, __c54, 17) }),
      ).annotate({ identifier: "BatchGetJobEntityResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ jobId: S.String })).annotate({
        identifier: "JobDetailsIdentifiers",
      });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ s3BucketName: S.String, rootPrefix: S.String })).annotate({
        identifier: "JobDetailsJobAttachmentSettings",
      });
    case 1:
      return S.suspend(() => S.Struct({ user: S.String, group: S.String })).annotate({
        identifier: "PosixUser",
      });
    case 2:
      return S.suspend(() => S.Struct({ user: S.String, passwordArn: S.String })).annotate({
        identifier: "WindowsUser",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          posix: S.optional(__S(1793, __c56, 1)),
          windows: S.optional(__S(1794, __c56, 2)),
          runAs: S.String,
        }),
      ).annotate({ identifier: "JobRunAsUser" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(1824, __c57, 0));
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ farmId: S.String, queueId: S.String, jobId: S.String, sessionId: S.String }),
      ).annotate({ identifier: "BatchGetSessionIdentifier" });
    case 1:
      return S.Array(__S(1856, __c58, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ identifiers: __S(1857, __c58, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2023-10-12/batch-get-session" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetSessionRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String,
          queueId: S.String,
          jobId: S.String,
          sessionId: S.String,
          fleetId: S.String,
          workerId: S.String,
          startedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lifecycleStatus: S.String,
          endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          targetLifecycleStatus: S.optional(S.String),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedBy: S.optional(S.String),
          log: __S(1952, __c61, 0),
          hostProperties: S.optional(__S(1920, __c60, 0)),
          workerLog: S.optional(__S(1952, __c61, 0)),
        }),
      ).annotate({ identifier: "BatchGetSessionItem" });
    case 4:
      return S.Array(__S(1859, __c58, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String,
          queueId: S.String,
          jobId: S.String,
          sessionId: S.String,
          code: S.String,
          message: S.String,
        }),
      ).annotate({ identifier: "BatchGetSessionError" });
    case 6:
      return S.Array(__S(1861, __c58, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ sessions: __S(1860, __c58, 4), errors: __S(1862, __c58, 6) }),
      ).annotate({ identifier: "BatchGetSessionResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ipV4Addresses: S.optional(__S(1600, __c50, 0)),
          ipV6Addresses: S.optional(__S(1600, __c50, 0)),
        }),
      ).annotate({ identifier: "IpAddresses" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ipAddresses: S.optional(__S(1888, __c59, 0)),
          hostName: S.optional(S.String),
          ec2InstanceArn: S.optional(S.String),
          ec2InstanceType: S.optional(S.String),
        }),
      ).annotate({ identifier: "HostPropertiesResponse" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          logDriver: S.String,
          options: S.optional(__S(0, __c0, 0)),
          parameters: S.optional(__S(0, __c0, 0)),
          error: S.optional(S.String),
        }),
      ).annotate({ identifier: "LogConfiguration" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String,
          queueId: S.String,
          jobId: S.String,
          sessionActionId: S.String,
        }),
      ).annotate({ identifier: "BatchGetSessionActionIdentifier" });
    case 1:
      return S.Array(__S(1984, __c62, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ identifiers: __S(1985, __c62, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2023-10-12/batch-get-session-action" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetSessionActionRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String,
          queueId: S.String,
          jobId: S.String,
          sessionActionId: S.String,
          status: S.String,
          startedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          workerUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          progressPercent: S.optional(S.Number),
          manifests: S.optional(__S(2113, __c66, 1)),
          sessionId: S.String,
          processExitCode: S.optional(S.Number),
          progressMessage: S.optional(SensitiveString),
          acquiredLimits: S.optional(__S(2049, __c64, 1)),
          definition: __S(2081, __c65, 1),
        }),
      ).annotate({ identifier: "BatchGetSessionActionItem" });
    case 4:
      return S.Array(__S(1987, __c62, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String,
          queueId: S.String,
          jobId: S.String,
          sessionActionId: S.String,
          code: S.String,
          message: S.String,
        }),
      ).annotate({ identifier: "BatchGetSessionActionError" });
    case 6:
      return S.Array(__S(1989, __c62, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ sessionActions: __S(1988, __c62, 4), errors: __S(1990, __c62, 6) }),
      ).annotate({ identifier: "BatchGetSessionActionResponse" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ int: S.String }),
        /*@__PURE__*/ S.Struct({ float: S.String }),
        /*@__PURE__*/ S.Struct({ string: S.String }),
        /*@__PURE__*/ S.Struct({ path: S.String }),
        /*@__PURE__*/ S.Struct({ chunkInt: S.String }),
      ]);
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(2016, __c63, 0).pipe(S.optional));
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ limitId: S.String, count: S.Number })).annotate({
        identifier: "AcquiredLimit",
      });
    case 1:
      return S.Array(__S(2048, __c64, 0));
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          taskId: S.optional(S.String),
          stepId: S.String,
          parameters: __S(2017, __c63, 1),
        }),
      ).annotate({ identifier: "TaskRunSessionActionDefinition" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ envEnter: __S(2114, __c66, 2) }),
        /*@__PURE__*/ S.Struct({ envExit: __S(2114, __c66, 2) }),
        /*@__PURE__*/ S.Struct({ taskRun: __S(2080, __c65, 0) }),
        /*@__PURE__*/ S.Struct({ syncInputJobAttachments: __S(2115, __c66, 3) }),
      ]);
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          outputManifestPath: S.optional(S.String),
          outputManifestHash: S.optional(S.String),
        }),
      ).annotate({ identifier: "TaskRunManifestPropertiesResponse" });
    case 1:
      return S.Array(__S(2112, __c66, 0));
    case 2:
      return S.suspend(() => S.Struct({ environmentId: S.String })).annotate({
        identifier: "EnvironmentEnterSessionActionDefinition",
      });
    case 3:
      return S.suspend(() => S.Struct({ stepId: S.optional(S.String) })).annotate({
        identifier: "SyncInputJobAttachmentsSessionActionDefinition",
      });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ farmId: S.String, queueId: S.String, jobId: S.String, stepId: S.String }),
      ).annotate({ identifier: "BatchGetStepIdentifier" });
    case 1:
      return S.Array(__S(2144, __c67, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ identifiers: __S(2145, __c67, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2023-10-12/batch-get-step" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetStepRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String,
          queueId: S.String,
          jobId: S.String,
          stepId: S.String,
          name: S.String,
          lifecycleStatus: S.String,
          lifecycleStatusMessage: S.optional(S.String),
          taskRunStatus: S.String,
          taskRunStatusCounts: __S(1696, __c53, 0),
          taskFailureRetryCount: S.optional(S.Number),
          targetTaskRunStatus: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdBy: S.String,
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedBy: S.optional(S.String),
          startedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          dependencyCounts: S.optional(__S(2208, __c69, 0)),
          requiredCapabilities: S.optional(__S(2180, __c68, 4)),
          parameterSpace: S.optional(__S(2243, __c70, 3)),
          description: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "BatchGetStepItem" });
    case 4:
      return S.Array(__S(2147, __c67, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String,
          queueId: S.String,
          jobId: S.String,
          stepId: S.String,
          code: S.String,
          message: S.String,
        }),
      ).annotate({ identifier: "BatchGetStepError" });
    case 6:
      return S.Array(__S(2149, __c67, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ steps: __S(2148, __c67, 4), errors: __S(2150, __c67, 6) }),
      ).annotate({ identifier: "BatchGetStepResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          anyOf: S.optional(__S(1600, __c50, 0)),
          allOf: S.optional(__S(1600, __c50, 0)),
        }),
      ).annotate({ identifier: "StepAttributeCapability" });
    case 1:
      return S.Array(__S(2176, __c68, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          min: S.optional(S.Number),
          max: S.optional(S.Number),
          value: S.optional(S.Number),
        }),
      ).annotate({ identifier: "StepAmountCapability" });
    case 3:
      return S.Array(__S(2178, __c68, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ attributes: __S(2177, __c68, 1), amounts: __S(2179, __c68, 3) }),
      ).annotate({ identifier: "StepRequiredCapabilities" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          dependenciesResolved: S.Number,
          dependenciesUnresolved: S.Number,
          consumersResolved: S.Number,
          consumersUnresolved: S.Number,
        }),
      ).annotate({ identifier: "DependencyCounts" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          defaultTaskCount: S.Number,
          targetRuntimeSeconds: S.optional(S.Number),
          rangeConstraint: S.String,
        }),
      ).annotate({ identifier: "StepParameterChunks" });
    case 1:
      return S.suspend(() =>
        S.Struct({ name: S.String, type: S.String, chunks: S.optional(__S(2240, __c70, 0)) }),
      ).annotate({ identifier: "StepParameter" });
    case 2:
      return S.Array(__S(2241, __c70, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ parameters: __S(2242, __c70, 2), combination: S.optional(S.String) }),
      ).annotate({ identifier: "ParameterSpace" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String,
          queueId: S.String,
          jobId: S.String,
          stepId: S.String,
          taskId: S.String,
        }),
      ).annotate({ identifier: "BatchGetTaskIdentifier" });
    case 1:
      return S.Array(__S(2272, __c71, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ identifiers: __S(2273, __c71, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2023-10-12/batch-get-task" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetTaskRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String,
          queueId: S.String,
          jobId: S.String,
          stepId: S.String,
          taskId: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdBy: S.String,
          runStatus: S.String,
          targetRunStatus: S.optional(S.String),
          failureRetryCount: S.optional(S.Number),
          startedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedBy: S.optional(S.String),
          latestSessionActionId: S.optional(S.String),
          parameters: S.optional(__S(2017, __c63, 1)),
        }),
      ).annotate({ identifier: "BatchGetTaskItem" });
    case 4:
      return S.Array(__S(2275, __c71, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String,
          queueId: S.String,
          jobId: S.String,
          stepId: S.String,
          taskId: S.String,
          code: S.String,
          message: S.String,
        }),
      ).annotate({ identifier: "BatchGetTaskError" });
    case 6:
      return S.Array(__S(2277, __c71, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ tasks: __S(2276, __c71, 4), errors: __S(2278, __c71, 6) }),
      ).annotate({ identifier: "BatchGetTaskResponse" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ farmId: S.String, fleetId: S.String, workerId: S.String }),
      ).annotate({ identifier: "BatchGetWorkerIdentifier" });
    case 1:
      return S.Array(__S(2304, __c72, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ identifiers: __S(2305, __c72, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2023-10-12/batch-get-worker" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetWorkerRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String,
          fleetId: S.String,
          workerId: S.String,
          code: S.String,
          message: S.String,
        }),
      ).annotate({ identifier: "BatchGetWorkerError" });
    case 4:
      return S.Array(__S(2307, __c72, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ workers: __S(2336, __c73, 0), errors: __S(2308, __c72, 4) }),
      ).annotate({ identifier: "BatchGetWorkerResponse" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(2368, __c74, 0));
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String,
          fleetId: S.String,
          workerId: S.String,
          hostProperties: S.optional(__S(1920, __c60, 0)),
          status: S.String,
          log: S.optional(__S(1952, __c61, 0)),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdBy: S.String,
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "BatchGetWorkerItem" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String,
          queueId: S.String,
          jobId: S.String,
          targetTaskRunStatus: S.optional(S.String),
          priority: S.optional(S.Number),
          maxFailedTasksCount: S.optional(S.Number),
          maxRetriesPerTask: S.optional(S.Number),
          lifecycleStatus: S.optional(S.String),
          maxWorkerCount: S.optional(S.Number),
          name: S.optional(S.String),
          description: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "BatchUpdateJobItem" });
    case 1:
      return S.Array(__S(2400, __c75, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Amz-Client-Token"),
            T.IdempotencyToken(),
          ),
          jobs: __S(2401, __c75, 1),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/2023-10-12/batch-update-job" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchUpdateJobRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String,
          queueId: S.String,
          jobId: S.String,
          code: S.String,
          message: S.String,
        }),
      ).annotate({ identifier: "BatchUpdateJobError" });
    case 4:
      return S.Array(__S(2403, __c75, 3));
    case 5:
      return S.suspend(() => S.Struct({ errors: __S(2404, __c75, 4) })).annotate({
        identifier: "BatchUpdateJobResponse",
      });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String,
          queueId: S.String,
          jobId: S.String,
          stepId: S.String,
          taskId: S.String,
          targetRunStatus: S.String,
        }),
      ).annotate({ identifier: "BatchUpdateTaskItem" });
    case 1:
      return S.Array(__S(2432, __c76, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Amz-Client-Token"),
            T.IdempotencyToken(),
          ),
          tasks: __S(2433, __c76, 1),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/2023-10-12/batch-update-task" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchUpdateTaskRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String,
          queueId: S.String,
          jobId: S.String,
          stepId: S.String,
          taskId: S.String,
          code: S.String,
          message: S.String,
        }),
      ).annotate({ identifier: "BatchUpdateTaskError" });
    case 4:
      return S.Array(__S(2435, __c76, 3));
    case 5:
      return S.suspend(() => S.Struct({ errors: __S(2436, __c76, 4) })).annotate({
        identifier: "BatchUpdateTaskResponse",
      });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ bucketName: S.String, key: S.String })).annotate({
        identifier: "S3Location",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          jobId: S.String.pipe(T.HttpLabel("jobId")),
          targetS3Location: __S(2464, __c77, 0),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/template",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CopyJobTemplateRequest" });
    case 2:
      return S.suspend(() => S.Struct({ templateType: S.String })).annotate({
        identifier: "CopyJobTemplateResponse",
      });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          displayName: S.String,
          description: S.optional(SensitiveString),
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Amz-Client-Token"),
            T.IdempotencyToken(),
          ),
          usageTrackingResource: __S(2560, __c80, 0),
          approximateDollarLimit: S.Number,
          actions: __S(2529, __c79, 1),
          schedule: __S(2531, __c79, 3),
          tags: S.optional(__S(0, __c0, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2023-10-12/farms/{farmId}/budgets" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateBudgetRequest" });
    case 1:
      return S.suspend(() => S.Struct({ budgetId: S.String })).annotate({
        identifier: "CreateBudgetResponse",
      });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          thresholdPercentage: S.Number,
          description: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "BudgetActionToAdd" });
    case 1:
      return S.Array(__S(2528, __c79, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          startTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          endTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "FixedBudgetSchedule" });
    case 3:
      return S.Union([/*@__PURE__*/ S.Struct({ fixed: __S(2530, __c79, 2) })]);
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ queueId: S.String })]);
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Amz-Client-Token"),
            T.IdempotencyToken(),
          ),
          displayName: S.String,
          description: S.optional(SensitiveString),
          kmsKeyArn: S.optional(S.String),
          costScaleFactor: S.optional(S.Number),
          tags: S.optional(__S(0, __c0, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/2023-10-12/farms" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateFarmRequest" });
    case 1:
      return S.suspend(() => S.Struct({ farmId: S.String })).annotate({
        identifier: "CreateFarmResponse",
      });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Amz-Client-Token"),
            T.IdempotencyToken(),
          ),
          displayName: S.String,
          description: S.optional(SensitiveString),
          roleArn: S.String,
          minWorkerCount: S.optional(S.Number),
          maxWorkerCount: S.Number,
          configuration: __S(2737, __c85, 17),
          tags: S.optional(__S(0, __c0, 0)),
          hostConfiguration: S.optional(__S(2656, __c83, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2023-10-12/farms/{farmId}/fleets" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateFleetRequest" });
    case 1:
      return S.suspend(() => S.Struct({ fleetId: S.String })).annotate({
        identifier: "CreateFleetResponse",
      });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ scriptBody: SensitiveString, scriptTimeoutSeconds: S.optional(S.Number) }),
      ).annotate({ identifier: "HostConfiguration" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          standbyWorkerCount: S.optional(S.Number),
          workerIdleDurationSeconds: S.optional(S.Number),
          scaleOutWorkersPerMinute: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CustomerManagedAutoScalingConfiguration" });
    case 1:
      return S.suspend(() => S.Struct({ min: S.Number, max: S.optional(S.Number) })).annotate({
        identifier: "VCpuCountRange",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ name: S.String, min: S.Number, max: S.optional(S.Number) }),
      ).annotate({ identifier: "FleetAmountCapability" });
    case 3:
      return S.Array(__S(2722, __c85, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          vCpuCount: __S(2721, __c85, 1),
          memoryMiB: __S(2721, __c85, 1),
          acceleratorTypes: S.optional(__S(2688, __c84, 0)),
          acceleratorCount: S.optional(__S(2721, __c85, 1)),
          acceleratorTotalMemoryMiB: S.optional(__S(2721, __c85, 1)),
          osFamily: S.String,
          cpuArchitectureType: S.String,
          customAmounts: S.optional(__S(2723, __c85, 3)),
          customAttributes: S.optional(__S(2753, __c86, 1)),
        }),
      ).annotate({ identifier: "CustomerManagedWorkerCapabilities" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          mode: S.String,
          autoScalingConfiguration: S.optional(__S(2720, __c85, 0)),
          workerCapabilities: __S(2724, __c85, 4),
          storageProfileId: S.optional(S.String),
          tagPropagationMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "CustomerManagedFleetConfiguration" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          sizeGiB: S.optional(S.Number),
          iops: S.optional(S.Number),
          throughputMiB: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Ec2EbsVolume" });
    case 7:
      return S.suspend(() => S.Struct({ name: S.String, runtime: S.optional(S.String) })).annotate({
        identifier: "AcceleratorSelection",
      });
    case 8:
      return S.Array(__S(2727, __c85, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({ selections: __S(2728, __c85, 8), count: S.optional(__S(2721, __c85, 1)) }),
      ).annotate({ identifier: "AcceleratorCapabilities" });
    case 10:
      return S.suspend(() => S.Struct({ name: S.String })).annotate({
        identifier: "FleetSoftwareAddOn",
      });
    case 11:
      return S.Array(__S(2730, __c85, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          vCpuCount: __S(2721, __c85, 1),
          memoryMiB: __S(2721, __c85, 1),
          osFamily: S.String,
          cpuArchitectureType: S.String,
          rootEbsVolume: S.optional(__S(2726, __c85, 6)),
          acceleratorCapabilities: S.optional(__S(2729, __c85, 9)),
          allowedInstanceTypes: S.optional(__S(1600, __c50, 0)),
          excludedInstanceTypes: S.optional(__S(1600, __c50, 0)),
          customAmounts: S.optional(__S(2723, __c85, 3)),
          customAttributes: S.optional(__S(2753, __c86, 1)),
          softwareAddOns: S.optional(__S(2731, __c85, 11)),
        }),
      ).annotate({ identifier: "ServiceManagedEc2InstanceCapabilities" });
    case 13:
      return S.suspend(() => S.Struct({ type: S.String })).annotate({
        identifier: "ServiceManagedEc2InstanceMarketOptions",
      });
    case 14:
      return S.suspend(() =>
        S.Struct({ resourceConfigurationArns: S.optional(__S(1600, __c50, 0)) }),
      ).annotate({ identifier: "VpcConfiguration" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          sizeGiB: S.optional(S.Number),
          iops: S.optional(S.Number),
          throughputMiB: S.optional(S.Number),
          mountPath: S.String,
          lastUsedTtlHours: S.optional(S.Number),
        }),
      ).annotate({ identifier: "PersistentVolumeConfiguration" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          instanceCapabilities: __S(2732, __c85, 12),
          instanceMarketOptions: __S(2733, __c85, 13),
          vpcConfiguration: S.optional(__S(2734, __c85, 14)),
          storageProfileId: S.optional(S.String),
          persistentVolumeConfiguration: S.optional(__S(2735, __c85, 15)),
          autoScalingConfiguration: S.optional(__S(2720, __c85, 0)),
        }),
      ).annotate({ identifier: "ServiceManagedEc2FleetConfiguration" });
    case 17:
      return S.Union([
        /*@__PURE__*/ S.Struct({ customerManaged: __S(2725, __c85, 5) }),
        /*@__PURE__*/ S.Struct({ serviceManagedEc2: __S(2736, __c85, 16) }),
      ]);
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, values: __S(1600, __c50, 0) })).annotate({
        identifier: "FleetAttributeCapability",
      });
    case 1:
      return S.Array(__S(2752, __c86, 0));
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Amz-Client-Token"),
            T.IdempotencyToken(),
          ),
          template: S.optional(SensitiveString),
          templateType: S.optional(S.String),
          priority: S.Number,
          parameters: S.optional(__S(1666, __c52, 2)),
          attachments: S.optional(__S(1634, __c51, 2)),
          storageProfileId: S.optional(S.String),
          targetTaskRunStatus: S.optional(S.String),
          maxFailedTasksCount: S.optional(S.Number),
          maxRetriesPerTask: S.optional(S.Number),
          maxWorkerCount: S.optional(S.Number),
          sourceJobId: S.optional(S.String),
          nameOverride: S.optional(S.String),
          descriptionOverride: S.optional(SensitiveString),
          tags: S.optional(__S(0, __c0, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateJobRequest" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Amz-Client-Token"),
            T.IdempotencyToken(),
          ),
          vpcId: S.String,
          subnetIds: __S(1600, __c50, 0),
          securityGroupIds: __S(1600, __c50, 0),
          tags: S.optional(__S(0, __c0, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2023-10-12/license-endpoints" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateLicenseEndpointRequest" });
    case 1:
      return S.suspend(() => S.Struct({ licenseEndpointId: S.String })).annotate({
        identifier: "CreateLicenseEndpointResponse",
      });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Amz-Client-Token"),
            T.IdempotencyToken(),
          ),
          displayName: S.String,
          amountRequirementName: S.String,
          maxCount: S.Number,
          description: S.optional(SensitiveString),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2023-10-12/farms/{farmId}/limits" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateLimitRequest" });
    case 1:
      return S.suspend(() => S.Struct({ limitId: S.String })).annotate({
        identifier: "CreateLimitResponse",
      });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Amz-Client-Token"),
            T.IdempotencyToken(),
          ),
          displayName: S.String,
          identityCenterInstanceArn: S.String,
          identityCenterRegion: S.optional(S.String),
          subdomain: S.String,
          roleArn: S.String,
          tags: S.optional(__S(0, __c0, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2023-10-12/monitors" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateMonitorRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ monitorId: S.String, identityCenterApplicationArn: S.String }),
      ).annotate({ identifier: "CreateMonitorResponse" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Amz-Client-Token"),
            T.IdempotencyToken(),
          ),
          displayName: S.String,
          description: S.optional(SensitiveString),
          defaultBudgetAction: S.optional(S.String),
          jobAttachmentSettings: S.optional(__S(1792, __c56, 0)),
          roleArn: S.optional(S.String),
          jobRunAsUser: S.optional(__S(1795, __c56, 3)),
          requiredFileSystemLocationNames: S.optional(__S(1600, __c50, 0)),
          allowedStorageProfileIds: S.optional(__S(1600, __c50, 0)),
          tags: S.optional(__S(0, __c0, 0)),
          schedulingConfiguration: S.optional(__S(2948, __c92, 4)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2023-10-12/farms/{farmId}/queues" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateQueueRequest" });
    case 1:
      return S.suspend(() => S.Struct({ queueId: S.String })).annotate({
        identifier: "CreateQueueResponse",
      });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ renderingTaskBuffer: S.optional(S.Number) })).annotate({
        identifier: "PriorityBalancedSchedulingConfiguration",
      });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ alwaysScheduleFirst: __S(4992, __c156, 0) })]);
    case 2:
      return S.Union([/*@__PURE__*/ S.Struct({ alwaysScheduleLast: __S(4992, __c156, 0) })]);
    case 3:
      return S.suspend(() =>
        S.Struct({
          priorityWeight: S.optional(S.Number),
          errorWeight: S.optional(S.Number),
          submissionTimeWeight: S.optional(S.Number),
          renderingTaskWeight: S.optional(S.Number),
          renderingTaskBuffer: S.optional(S.Number),
          maxPriorityOverride: S.optional(__S(2945, __c92, 1)),
          minPriorityOverride: S.optional(__S(2946, __c92, 2)),
        }),
      ).annotate({ identifier: "WeightedBalancedSchedulingConfiguration" });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ priorityFifo: __S(4992, __c156, 0) }),
        /*@__PURE__*/ S.Struct({ priorityBalanced: __S(2944, __c92, 0) }),
        /*@__PURE__*/ S.Struct({ weightedBalanced: __S(2947, __c92, 3) }),
      ]);
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Amz-Client-Token"),
            T.IdempotencyToken(),
          ),
          priority: S.Number,
          templateType: S.String,
          template: SensitiveString,
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/environments",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateQueueEnvironmentRequest" });
    case 1:
      return S.suspend(() => S.Struct({ queueEnvironmentId: S.String })).annotate({
        identifier: "CreateQueueEnvironmentResponse",
      });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String,
          fleetId: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/2023-10-12/farms/{farmId}/queue-fleet-associations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateQueueFleetAssociationRequest" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String,
          limitId: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/2023-10-12/farms/{farmId}/queue-limit-associations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateQueueLimitAssociationRequest" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Amz-Client-Token"),
            T.IdempotencyToken(),
          ),
          displayName: S.String,
          osFamily: S.String,
          fileSystemLocations: S.optional(__S(3105, __c97, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2023-10-12/farms/{farmId}/storage-profiles" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateStorageProfileRequest" });
    case 1:
      return S.suspend(() => S.Struct({ storageProfileId: S.String })).annotate({
        identifier: "CreateStorageProfileResponse",
      });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, path: S.String, type: S.String })).annotate(
        { identifier: "FileSystemLocation" },
      );
    case 1:
      return S.Array(__S(3104, __c97, 0));
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          fleetId: S.String.pipe(T.HttpLabel("fleetId")),
          hostProperties: S.optional(__S(3168, __c99, 0)),
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Amz-Client-Token"),
            T.IdempotencyToken(),
          ),
          tags: S.optional(__S(0, __c0, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}/workers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateWorkerRequest" });
    case 1:
      return S.suspend(() => S.Struct({ workerId: S.String })).annotate({
        identifier: "CreateWorkerResponse",
      });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ipAddresses: S.optional(__S(1888, __c59, 0)), hostName: S.optional(S.String) }),
      ).annotate({ identifier: "HostPropertiesRequest" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          budgetId: S.String.pipe(T.HttpLabel("budgetId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/2023-10-12/farms/{farmId}/budgets/{budgetId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteBudgetRequest" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ farmId: S.String.pipe(T.HttpLabel("farmId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/2023-10-12/farms/{farmId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteFarmRequest" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          fleetId: S.String.pipe(T.HttpLabel("fleetId")),
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Amz-Client-Token"),
            T.IdempotencyToken(),
          ),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteFleetRequest" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ licenseEndpointId: S.String.pipe(T.HttpLabel("licenseEndpointId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/2023-10-12/license-endpoints/{licenseEndpointId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteLicenseEndpointRequest" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          limitId: S.String.pipe(T.HttpLabel("limitId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/2023-10-12/farms/{farmId}/limits/{limitId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteLimitRequest" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          licenseEndpointId: S.String.pipe(T.HttpLabel("licenseEndpointId")),
          productId: S.String.pipe(T.HttpLabel("productId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/2023-10-12/license-endpoints/{licenseEndpointId}/metered-products/{productId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMeteredProductRequest" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ monitorId: S.String.pipe(T.HttpLabel("monitorId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/2023-10-12/monitors/{monitorId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMonitorRequest" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/2023-10-12/farms/{farmId}/queues/{queueId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteQueueRequest" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          queueEnvironmentId: S.String.pipe(T.HttpLabel("queueEnvironmentId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/environments/{queueEnvironmentId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteQueueEnvironmentRequest" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          fleetId: S.String.pipe(T.HttpLabel("fleetId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/2023-10-12/farms/{farmId}/queue-fleet-associations/{queueId}/{fleetId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteQueueFleetAssociationRequest" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          limitId: S.String.pipe(T.HttpLabel("limitId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/2023-10-12/farms/{farmId}/queue-limit-associations/{queueId}/{limitId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteQueueLimitAssociationRequest" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          storageProfileId: S.String.pipe(T.HttpLabel("storageProfileId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/2023-10-12/farms/{farmId}/storage-profiles/{storageProfileId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteStorageProfileRequest" });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          fleetId: S.String.pipe(T.HttpLabel("fleetId")),
          volumeId: S.String.pipe(T.HttpLabel("volumeId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}/volumes/{volumeId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteVolumeRequest" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          fleetId: S.String.pipe(T.HttpLabel("fleetId")),
          workerId: S.String.pipe(T.HttpLabel("workerId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}/workers/{workerId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteWorkerRequest" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          principalId: S.String.pipe(T.HttpLabel("principalId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/2023-10-12/farms/{farmId}/members/{principalId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateMemberFromFarmRequest" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          fleetId: S.String.pipe(T.HttpLabel("fleetId")),
          principalId: S.String.pipe(T.HttpLabel("principalId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}/members/{principalId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateMemberFromFleetRequest" });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          jobId: S.String.pipe(T.HttpLabel("jobId")),
          principalId: S.String.pipe(T.HttpLabel("principalId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/members/{principalId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateMemberFromJobRequest" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          principalId: S.String.pipe(T.HttpLabel("principalId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/members/{principalId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateMemberFromQueueRequest" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          budgetId: S.String.pipe(T.HttpLabel("budgetId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2023-10-12/farms/{farmId}/budgets/{budgetId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBudgetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          budgetId: S.String,
          usageTrackingResource: __S(2560, __c80, 0),
          status: S.String,
          displayName: S.String,
          approximateDollarLimit: S.Number,
          usages: __S(3808, __c119, 0),
          createdBy: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedBy: S.optional(S.String),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          description: S.optional(SensitiveString),
          actions: __S(2529, __c79, 1),
          schedule: __S(2531, __c79, 3),
          queueStoppedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "GetBudgetResponse" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ approximateDollarUsage: S.Number })).annotate({
        identifier: "ConsumedUsages",
      });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ farmId: S.String.pipe(T.HttpLabel("farmId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2023-10-12/farms/{farmId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFarmRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String,
          displayName: S.String,
          kmsKeyArn: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdBy: S.String,
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedBy: S.optional(S.String),
          description: S.optional(SensitiveString),
          costScaleFactor: S.Number,
        }),
      ).annotate({ identifier: "GetFarmResponse" });
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          fleetId: S.String.pipe(T.HttpLabel("fleetId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFleetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          amounts: S.optional(__S(2723, __c85, 3)),
          attributes: S.optional(__S(2753, __c86, 1)),
        }),
      ).annotate({ identifier: "FleetCapabilities" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          fleetId: S.String,
          farmId: S.String,
          displayName: S.String,
          status: S.String,
          statusMessage: S.optional(S.String),
          autoScalingStatus: S.optional(S.String),
          targetWorkerCount: S.optional(S.Number),
          workerCount: S.Number,
          minWorkerCount: S.Number,
          maxWorkerCount: S.Number,
          configuration: __S(2737, __c85, 17),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdBy: S.String,
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedBy: S.optional(S.String),
          description: S.optional(SensitiveString),
          hostConfiguration: S.optional(__S(2656, __c83, 0)),
          capabilities: S.optional(__S(3873, __c121, 1)),
          roleArn: S.String,
        }),
      ).annotate({ identifier: "GetFleetResponse" });
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          jobId: S.String.pipe(T.HttpLabel("jobId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String,
          name: S.String,
          lifecycleStatus: S.String,
          lifecycleStatusMessage: S.String,
          priority: S.Number,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdBy: S.String,
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedBy: S.optional(S.String),
          startedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          taskRunStatus: S.optional(S.String),
          targetTaskRunStatus: S.optional(S.String),
          taskRunStatusCounts: S.optional(__S(1696, __c53, 0)),
          taskFailureRetryCount: S.optional(S.Number),
          storageProfileId: S.optional(S.String),
          maxFailedTasksCount: S.optional(S.Number),
          maxRetriesPerTask: S.optional(S.Number),
          parameters: S.optional(__S(1666, __c52, 2)),
          attachments: S.optional(__S(1634, __c51, 2)),
          description: S.optional(SensitiveString),
          maxWorkerCount: S.optional(S.Number),
          sourceJobId: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetJobResponse" });
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ licenseEndpointId: S.String.pipe(T.HttpLabel("licenseEndpointId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2023-10-12/license-endpoints/{licenseEndpointId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetLicenseEndpointRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          licenseEndpointId: S.String,
          status: S.String,
          statusMessage: S.String,
          vpcId: S.optional(S.String),
          dnsName: S.optional(S.String),
          subnetIds: S.optional(__S(1600, __c50, 0)),
          securityGroupIds: S.optional(__S(1600, __c50, 0)),
        }),
      ).annotate({ identifier: "GetLicenseEndpointResponse" });
  }
}
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          limitId: S.String.pipe(T.HttpLabel("limitId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2023-10-12/farms/{farmId}/limits/{limitId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetLimitRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String,
          limitId: S.String,
          currentCount: S.Number,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdBy: S.String,
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedBy: S.optional(S.String),
          displayName: S.String,
          amountRequirementName: S.String,
          maxCount: S.Number,
          description: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "GetLimitResponse" });
  }
}
function __c125(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ monitorId: S.String.pipe(T.HttpLabel("monitorId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2023-10-12/monitors/{monitorId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMonitorRequest" });
  }
}
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          monitorId: S.String,
          displayName: S.String,
          subdomain: S.String,
          url: S.String,
          roleArn: S.String,
          identityCenterInstanceArn: S.String,
          identityCenterRegion: S.optional(S.String),
          identityCenterApplicationArn: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdBy: S.String,
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetMonitorResponse" });
  }
}
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ monitorId: S.String.pipe(T.HttpLabel("monitorId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2023-10-12/monitors/{monitorId}/settings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMonitorSettingsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ settings: __S(0, __c0, 0) })).annotate({
        identifier: "GetMonitorSettingsResponse",
      });
  }
}
function __c128(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2023-10-12/farms/{farmId}/queues/{queueId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetQueueRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String,
          queueId: S.String,
          displayName: S.String,
          status: S.String,
          defaultBudgetAction: S.String,
          blockedReason: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdBy: S.String,
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedBy: S.optional(S.String),
          description: S.optional(SensitiveString),
          jobAttachmentSettings: S.optional(__S(1792, __c56, 0)),
          roleArn: S.optional(S.String),
          requiredFileSystemLocationNames: S.optional(__S(1600, __c50, 0)),
          allowedStorageProfileIds: S.optional(__S(1600, __c50, 0)),
          jobRunAsUser: S.optional(__S(1795, __c56, 3)),
          schedulingConfiguration: S.optional(__S(2948, __c92, 4)),
        }),
      ).annotate({ identifier: "GetQueueResponse" });
  }
}
function __c129(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          queueEnvironmentId: S.String.pipe(T.HttpLabel("queueEnvironmentId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/environments/{queueEnvironmentId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetQueueEnvironmentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          queueEnvironmentId: S.String,
          name: S.String,
          priority: S.Number,
          templateType: S.String,
          template: SensitiveString,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdBy: S.String,
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetQueueEnvironmentResponse" });
  }
}
function __c130(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          fleetId: S.String.pipe(T.HttpLabel("fleetId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2023-10-12/farms/{farmId}/queue-fleet-associations/{queueId}/{fleetId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetQueueFleetAssociationRequest" });
  }
}
function __c131(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          queueId: S.String,
          fleetId: S.String,
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdBy: S.String,
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetQueueFleetAssociationResponse" });
  }
}
function __c132(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          limitId: S.String.pipe(T.HttpLabel("limitId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2023-10-12/farms/{farmId}/queue-limit-associations/{queueId}/{limitId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetQueueLimitAssociationRequest" });
  }
}
function __c133(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          queueId: S.String,
          limitId: S.String,
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdBy: S.String,
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetQueueLimitAssociationResponse" });
  }
}
function __c134(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          jobId: S.String.pipe(T.HttpLabel("jobId")),
          sessionId: S.String.pipe(T.HttpLabel("sessionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/sessions/{sessionId}",
            }),
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
          sessionId: S.String,
          fleetId: S.String,
          workerId: S.String,
          startedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lifecycleStatus: S.String,
          endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          targetLifecycleStatus: S.optional(S.String),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedBy: S.optional(S.String),
          log: __S(1952, __c61, 0),
          hostProperties: S.optional(__S(1920, __c60, 0)),
          workerLog: S.optional(__S(1952, __c61, 0)),
        }),
      ).annotate({ identifier: "GetSessionResponse" });
  }
}
function __c135(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          jobId: S.String.pipe(T.HttpLabel("jobId")),
          sessionActionId: S.String.pipe(T.HttpLabel("sessionActionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/session-actions/{sessionActionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSessionActionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          sessionActionId: S.String,
          status: S.String,
          startedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          workerUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          progressPercent: S.optional(S.Number),
          manifests: S.optional(__S(2113, __c66, 1)),
          sessionId: S.String,
          processExitCode: S.optional(S.Number),
          progressMessage: S.optional(SensitiveString),
          acquiredLimits: S.optional(__S(2049, __c64, 1)),
          definition: __S(2081, __c65, 1),
        }),
      ).annotate({ identifier: "GetSessionActionResponse" });
  }
}
function __c136(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          aggregationId: S.String.pipe(T.HttpQuery("aggregationId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2023-10-12/farms/{farmId}/sessions-statistics-aggregation",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSessionsStatisticsAggregationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          min: S.optional(S.Number),
          max: S.optional(S.Number),
          avg: S.optional(S.Number),
          sum: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Stats" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          queueId: S.optional(S.String),
          fleetId: S.optional(S.String),
          jobId: S.optional(S.String),
          jobName: S.optional(S.String),
          userId: S.optional(S.String),
          usageType: S.optional(S.String),
          licenseProduct: S.optional(S.String),
          instanceType: S.optional(S.String),
          count: S.Number,
          costInUsd: __S(4353, __c136, 1),
          runtimeInSeconds: __S(4353, __c136, 1),
          aggregationStartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          aggregationEndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "Statistics" });
    case 3:
      return S.Array(__S(4354, __c136, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          statistics: S.optional(__S(4355, __c136, 3)),
          status: S.String,
          statusMessage: S.optional(S.String),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetSessionsStatisticsAggregationResponse" });
  }
}
function __c137(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          jobId: S.String.pipe(T.HttpLabel("jobId")),
          stepId: S.String.pipe(T.HttpLabel("stepId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/steps/{stepId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetStepRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          stepId: S.String,
          name: S.String,
          lifecycleStatus: S.String,
          lifecycleStatusMessage: S.optional(S.String),
          taskRunStatus: S.String,
          taskRunStatusCounts: __S(1696, __c53, 0),
          taskFailureRetryCount: S.optional(S.Number),
          targetTaskRunStatus: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdBy: S.String,
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedBy: S.optional(S.String),
          startedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          dependencyCounts: S.optional(__S(2208, __c69, 0)),
          requiredCapabilities: S.optional(__S(2180, __c68, 4)),
          parameterSpace: S.optional(__S(2243, __c70, 3)),
          description: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "GetStepResponse" });
  }
}
function __c138(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          storageProfileId: S.String.pipe(T.HttpLabel("storageProfileId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2023-10-12/farms/{farmId}/storage-profiles/{storageProfileId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetStorageProfileRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          storageProfileId: S.String,
          displayName: S.String,
          osFamily: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdBy: S.String,
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedBy: S.optional(S.String),
          fileSystemLocations: S.optional(__S(3105, __c97, 1)),
        }),
      ).annotate({ identifier: "GetStorageProfileResponse" });
  }
}
function __c139(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          storageProfileId: S.String.pipe(T.HttpLabel("storageProfileId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/storage-profiles/{storageProfileId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetStorageProfileForQueueRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          storageProfileId: S.String,
          displayName: S.String,
          osFamily: S.String,
          fileSystemLocations: S.optional(__S(3105, __c97, 1)),
        }),
      ).annotate({ identifier: "GetStorageProfileForQueueResponse" });
  }
}
function __c140(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          jobId: S.String.pipe(T.HttpLabel("jobId")),
          stepId: S.String.pipe(T.HttpLabel("stepId")),
          taskId: S.String.pipe(T.HttpLabel("taskId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/steps/{stepId}/tasks/{taskId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTaskRequest" });
  }
}
function __c141(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          taskId: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdBy: S.String,
          runStatus: S.String,
          targetRunStatus: S.optional(S.String),
          failureRetryCount: S.optional(S.Number),
          startedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedBy: S.optional(S.String),
          latestSessionActionId: S.optional(S.String),
          parameters: S.optional(__S(2017, __c63, 1)),
        }),
      ).annotate({ identifier: "GetTaskResponse" });
  }
}
function __c142(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          fleetId: S.String.pipe(T.HttpLabel("fleetId")),
          volumeId: S.String.pipe(T.HttpLabel("volumeId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}/volumes/{volumeId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetVolumeRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          volumeId: S.String,
          farmId: S.String,
          fleetId: S.String,
          state: S.String,
          sizeGiB: S.Number,
          availabilityZoneId: S.String,
          attachedWorkerId: S.optional(S.String),
          volumeType: S.String,
          iops: S.optional(S.Number),
          throughputMiB: S.optional(S.Number),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastAssignedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastReleasedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          expiresAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "GetVolumeResponse" });
  }
}
function __c143(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          fleetId: S.String.pipe(T.HttpLabel("fleetId")),
          workerId: S.String.pipe(T.HttpLabel("workerId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}/workers/{workerId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWorkerRequest" });
  }
}
function __c144(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2023-10-12/metered-products" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAvailableMeteredProductsRequest" });
  }
}
function __c145(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ productId: S.String, family: S.String, vendor: S.String, port: S.Number }),
      ).annotate({ identifier: "MeteredProductSummary" });
    case 1:
      return S.Array(__S(4640, __c145, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ meteredProducts: __S(4641, __c145, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAvailableMeteredProductsResponse" });
  }
}
function __c146(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2023-10-12/farms/{farmId}/budgets" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListBudgetsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          budgetId: S.String,
          usageTrackingResource: __S(2560, __c80, 0),
          status: S.String,
          displayName: S.String,
          approximateDollarLimit: S.Number,
          usages: __S(3808, __c119, 0),
          createdBy: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedBy: S.optional(S.String),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          description: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "BudgetSummary" });
    case 2:
      return S.Array(__S(4673, __c146, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ budgets: __S(4674, __c146, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListBudgetsResponse" });
  }
}
function __c147(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2023-10-12/farms/{farmId}/members" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListFarmMembersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String,
          principalId: S.String,
          principalType: S.String,
          identityStoreId: S.String,
          membershipLevel: S.String,
        }),
      ).annotate({ identifier: "FarmMember" });
    case 2:
      return S.Array(__S(4705, __c147, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ members: __S(4706, __c147, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListFarmMembersResponse" });
  }
}
function __c148(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          principalId: S.optional(S.String).pipe(T.HttpQuery("principalId")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/2023-10-12/farms" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListFarmsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String,
          displayName: S.String,
          kmsKeyArn: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdBy: S.String,
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "FarmSummary" });
    case 2:
      return S.Array(__S(4737, __c148, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ farms: __S(4738, __c148, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListFarmsResponse" });
  }
}
function __c149(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          fleetId: S.String.pipe(T.HttpLabel("fleetId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2023-10-12/farms/{farmId}/fleets/{fleetId}/members" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListFleetMembersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String,
          fleetId: S.String,
          principalId: S.String,
          principalType: S.String,
          identityStoreId: S.String,
          membershipLevel: S.String,
        }),
      ).annotate({ identifier: "FleetMember" });
    case 2:
      return S.Array(__S(4769, __c149, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ members: __S(4770, __c149, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListFleetMembersResponse" });
  }
}
function __c150(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          principalId: S.optional(S.String).pipe(T.HttpQuery("principalId")),
          displayName: S.optional(S.String).pipe(T.HttpQuery("displayName")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2023-10-12/farms/{farmId}/fleets" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListFleetsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          fleetId: S.String,
          farmId: S.String,
          displayName: S.String,
          status: S.String,
          statusMessage: S.optional(S.String),
          autoScalingStatus: S.optional(S.String),
          targetWorkerCount: S.optional(S.Number),
          workerCount: S.Number,
          minWorkerCount: S.Number,
          maxWorkerCount: S.Number,
          configuration: __S(2737, __c85, 17),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdBy: S.String,
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "FleetSummary" });
    case 2:
      return S.Array(__S(4801, __c150, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ fleets: __S(4802, __c150, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListFleetsResponse" });
  }
}
function __c151(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          jobId: S.String.pipe(T.HttpLabel("jobId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/members",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListJobMembersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String,
          queueId: S.String,
          jobId: S.String,
          principalId: S.String,
          principalType: S.String,
          identityStoreId: S.String,
          membershipLevel: S.String,
        }),
      ).annotate({ identifier: "JobMember" });
    case 2:
      return S.Array(__S(4833, __c151, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ members: __S(4834, __c151, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListJobMembersResponse" });
  }
}
function __c152(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          jobId: S.String.pipe(T.HttpLabel("jobId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/parameter-definitions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListJobParameterDefinitionsRequest" });
    case 1:
      return S.Array(S.Any);
    case 2:
      return S.suspend(() =>
        S.Struct({
          jobParameterDefinitions: __S(4865, __c152, 1),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListJobParameterDefinitionsResponse" });
  }
}
function __c153(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          principalId: S.optional(S.String).pipe(T.HttpQuery("principalId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String,
          name: S.String,
          lifecycleStatus: S.String,
          lifecycleStatusMessage: S.String,
          priority: S.Number,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdBy: S.String,
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedBy: S.optional(S.String),
          startedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          taskRunStatus: S.optional(S.String),
          targetTaskRunStatus: S.optional(S.String),
          taskRunStatusCounts: S.optional(__S(1696, __c53, 0)),
          taskFailureRetryCount: S.optional(S.Number),
          maxFailedTasksCount: S.optional(S.Number),
          maxRetriesPerTask: S.optional(S.Number),
          maxWorkerCount: S.optional(S.Number),
          sourceJobId: S.optional(S.String),
        }),
      ).annotate({ identifier: "JobSummary" });
    case 2:
      return S.Array(__S(4897, __c153, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ jobs: __S(4898, __c153, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListJobsResponse" });
  }
}
function __c154(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2023-10-12/license-endpoints" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListLicenseEndpointsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          licenseEndpointId: S.optional(S.String),
          status: S.optional(S.String),
          statusMessage: S.optional(S.String),
          vpcId: S.optional(S.String),
        }),
      ).annotate({ identifier: "LicenseEndpointSummary" });
    case 2:
      return S.Array(__S(4929, __c154, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ licenseEndpoints: __S(4930, __c154, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListLicenseEndpointsResponse" });
  }
}
function __c155(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          principalType: S.String,
          identityStoreId: S.String,
          membershipLevel: S.String,
          principalId: S.String.pipe(T.HttpLabel("principalId")),
          identityCenterRegion: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/2023-10-12/farms/{farmId}/members/{principalId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateMemberToFarmRequest" });
  }
}
function __c156(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "AssociateMemberToFarmResponse",
      });
  }
}
function __c157(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2023-10-12/farms/{farmId}/limits" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListLimitsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String,
          limitId: S.String,
          currentCount: S.Number,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdBy: S.String,
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedBy: S.optional(S.String),
          displayName: S.String,
          amountRequirementName: S.String,
          maxCount: S.Number,
        }),
      ).annotate({ identifier: "LimitSummary" });
    case 2:
      return S.Array(__S(5025, __c157, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ limits: __S(5026, __c157, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListLimitsResponse" });
  }
}
function __c158(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          licenseEndpointId: S.String.pipe(T.HttpLabel("licenseEndpointId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2023-10-12/license-endpoints/{licenseEndpointId}/metered-products",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMeteredProductsRequest" });
  }
}
function __c159(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2023-10-12/monitors" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMonitorsRequest" });
    case 1:
      return S.Array(__S(4032, __c126, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ monitors: __S(5089, __c159, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListMonitorsResponse" });
  }
}
function __c160(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/environments",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListQueueEnvironmentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ queueEnvironmentId: S.String, name: S.String, priority: S.Number }),
      ).annotate({ identifier: "QueueEnvironmentSummary" });
    case 2:
      return S.Array(__S(5121, __c160, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ environments: __S(5122, __c160, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListQueueEnvironmentsResponse" });
  }
}
function __c161(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          queueId: S.optional(S.String).pipe(T.HttpQuery("queueId")),
          fleetId: S.optional(S.String).pipe(T.HttpQuery("fleetId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2023-10-12/farms/{farmId}/queue-fleet-associations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListQueueFleetAssociationsRequest" });
    case 1:
      return S.Array(__S(4192, __c131, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ queueFleetAssociations: __S(5153, __c161, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListQueueFleetAssociationsResponse" });
  }
}
function __c162(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          queueId: S.optional(S.String).pipe(T.HttpQuery("queueId")),
          limitId: S.optional(S.String).pipe(T.HttpQuery("limitId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2023-10-12/farms/{farmId}/queue-limit-associations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListQueueLimitAssociationsRequest" });
    case 1:
      return S.Array(__S(4256, __c133, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ queueLimitAssociations: __S(5185, __c162, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListQueueLimitAssociationsResponse" });
  }
}
function __c163(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/members" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListQueueMembersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String,
          queueId: S.String,
          principalId: S.String,
          principalType: S.String,
          identityStoreId: S.String,
          membershipLevel: S.String,
        }),
      ).annotate({ identifier: "QueueMember" });
    case 2:
      return S.Array(__S(5217, __c163, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ members: __S(5218, __c163, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListQueueMembersResponse" });
  }
}
function __c164(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          principalId: S.optional(S.String).pipe(T.HttpQuery("principalId")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2023-10-12/farms/{farmId}/queues" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListQueuesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String,
          queueId: S.String,
          displayName: S.String,
          status: S.String,
          defaultBudgetAction: S.String,
          blockedReason: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdBy: S.String,
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "QueueSummary" });
    case 2:
      return S.Array(__S(5249, __c164, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ queues: __S(5250, __c164, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListQueuesResponse" });
  }
}
function __c165(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          jobId: S.String.pipe(T.HttpLabel("jobId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          sessionId: S.optional(S.String).pipe(T.HttpQuery("sessionId")),
          taskId: S.optional(S.String).pipe(T.HttpQuery("taskId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/session-actions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSessionActionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          taskId: S.optional(S.String),
          stepId: S.String,
          parameters: S.optional(__S(2017, __c63, 1)),
        }),
      ).annotate({ identifier: "TaskRunSessionActionDefinitionSummary" });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ envEnter: __S(2114, __c66, 2) }),
        /*@__PURE__*/ S.Struct({ envExit: __S(2114, __c66, 2) }),
        /*@__PURE__*/ S.Struct({ taskRun: __S(5281, __c165, 1) }),
        /*@__PURE__*/ S.Struct({ syncInputJobAttachments: __S(2115, __c66, 3) }),
      ]);
    case 3:
      return S.suspend(() =>
        S.Struct({
          sessionActionId: S.String,
          status: S.String,
          startedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          workerUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          progressPercent: S.optional(S.Number),
          manifests: S.optional(__S(2113, __c66, 1)),
          definition: __S(5282, __c165, 2),
        }),
      ).annotate({ identifier: "SessionActionSummary" });
    case 4:
      return S.Array(__S(5283, __c165, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ sessionActions: __S(5284, __c165, 4), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSessionActionsResponse" });
  }
}
function __c166(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          farmId: S.String.pipe(T.HttpLabel("farmId")),
          queueId: S.String.pipe(T.HttpLabel("queueId")),
          jobId: S.String.pipe(T.HttpLabel("jobId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2023-10-12/farms/{farmId}/queues/{queueId}/jobs/{jobId}/sessions",
            }),
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
          sessionId: S.String,
          fleetId: S.String,
          workerId: S.String,
          startedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lifecycleStatus: S.String,
          endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          targetLifecycleStatus: S.optional(S.String),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "SessionSummary" });
    case 2:
      return S.Array(__S(5313, __c166, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ sessions: __S(5314, __c166, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSessionsResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
