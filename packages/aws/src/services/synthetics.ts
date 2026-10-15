import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "synthetics", serviceShapeName: "Synthetics" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "synthetics" });
const ver = /*@__PURE__*/ T.ServiceVersion("2017-10-11");
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
              `https://synthetics-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://synthetics-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://synthetics.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://synthetics.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://synthetics.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalFailureException
  extends /*@__PURE__*/ S.TaggedError<InternalFailureException>()(
    "InternalFailureException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class RequestEntityTooLargeException
  extends /*@__PURE__*/ S.TaggedError<RequestEntityTooLargeException>()(
    "RequestEntityTooLargeException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(413),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type GroupIdentifier = string;
export type CanaryArn = string;
export interface AssociateResourceRequest {
  GroupIdentifier: string;
  ResourceArn: string;
}
export interface AssociateResourceResponse {}
export type CanaryName = string;
export type CodeHandler = string;
export type BlueprintType = string;
export type BlueprintTypes = string[];
export type DependencyType = "LambdaLayer" | (string & {});
export interface Dependency {
  Type?: DependencyType;
  Reference: string;
}
export type Dependencies = Dependency[];
export interface CanaryCodeInput {
  S3Bucket?: string;
  S3Key?: string;
  S3Version?: string;
  ZipFile?: Uint8Array;
  Handler?: string;
  BlueprintTypes?: string[];
  Dependencies?: Dependency[];
}
export type RoleArn = string;
export type MaxOneYearInSeconds = number;
export type MaxRetries = number;
export interface RetryConfigInput {
  MaxRetries: number;
}
export interface CanaryScheduleInput {
  Expression: string;
  DurationInSeconds?: number;
  RetryConfig?: RetryConfigInput;
}
export type MaxFifteenMinutesInSeconds = number;
export type MaxSize3008 = number;
export type EnvironmentVariableName = string;
export type EnvironmentVariableValue = string;
export type EnvironmentVariablesMap = { [key: string]: string | undefined };
export type EphemeralStorageSize = number;
export interface CanaryRunConfigInput {
  TimeoutInSeconds?: number;
  MemoryInMB?: number;
  ActiveTracing?: boolean;
  EnvironmentVariables?: { [key: string]: string | undefined };
  EphemeralStorage?: number;
}
export type MaxSize1024 = number;
export type SubnetId = string;
export type SubnetIds = string[];
export type SecurityGroupId = string;
export type SecurityGroupIds = string[];
export interface VpcConfigInput {
  SubnetIds?: string[];
  SecurityGroupIds?: string[];
  Ipv6AllowedForDualStack?: boolean;
}
export type ResourceToTag = "lambda-function" | (string & {});
export type ResourceList = ResourceToTag[];
export type ProvisionedResourceCleanupSetting = "AUTOMATIC" | "OFF" | (string & {});
export type BrowserType = "CHROME" | "FIREFOX" | (string & {});
export interface BrowserConfig {
  BrowserType?: BrowserType;
}
export type BrowserConfigs = BrowserConfig[];
export type Location = string;
export type KmsKeyArn = string;
export interface AddReplicaLocationInput {
  Location: string;
  VpcConfig?: VpcConfigInput;
  KmsKeyArn?: string;
}
export type AddReplicaLocations = AddReplicaLocationInput[];
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type EncryptionMode = "SSE_S3" | "SSE_KMS" | (string & {});
export interface S3EncryptionConfig {
  EncryptionMode?: EncryptionMode;
  KmsKeyArn?: string;
}
export interface ArtifactConfigInput {
  S3Encryption?: S3EncryptionConfig;
}
export interface CreateCanaryRequest {
  Name: string;
  Code: CanaryCodeInput;
  ArtifactS3Location: string;
  ExecutionRoleArn: string;
  Schedule: CanaryScheduleInput;
  RunConfig?: CanaryRunConfigInput;
  SuccessRetentionPeriodInDays?: number;
  FailureRetentionPeriodInDays?: number;
  RuntimeVersion: string;
  VpcConfig?: VpcConfigInput;
  ResourcesToReplicateTags?: ResourceToTag[];
  ProvisionedResourceCleanup?: ProvisionedResourceCleanupSetting;
  BrowserConfigs?: BrowserConfig[];
  AddReplicaLocations?: AddReplicaLocationInput[];
  Tags?: { [key: string]: string | undefined };
  ArtifactConfig?: ArtifactConfigInput;
  KmsKeyArn?: string;
}
export type UUID = string;
export interface CanaryCodeOutput {
  SourceLocationArn?: string;
  Handler?: string;
  BlueprintTypes?: string[];
  Dependencies?: Dependency[];
}
export interface RetryConfigOutput {
  MaxRetries?: number;
}
export interface CanaryScheduleOutput {
  Expression?: string;
  DurationInSeconds?: number;
  RetryConfig?: RetryConfigOutput;
}
export interface CanaryRunConfigOutput {
  TimeoutInSeconds?: number;
  MemoryInMB?: number;
  ActiveTracing?: boolean;
  EphemeralStorage?: number;
}
export type CanaryState =
  | "CREATING"
  | "READY"
  | "STARTING"
  | "RUNNING"
  | "UPDATING"
  | "STOPPING"
  | "STOPPED"
  | "ERROR"
  | "DELETING"
  | (string & {});
export type CanaryStateReasonCode =
  | "INVALID_PERMISSIONS"
  | "CREATE_PENDING"
  | "CREATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "UPDATE_PENDING"
  | "UPDATE_IN_PROGRESS"
  | "UPDATE_COMPLETE"
  | "ROLLBACK_COMPLETE"
  | "ROLLBACK_FAILED"
  | "DELETE_IN_PROGRESS"
  | "DELETE_FAILED"
  | "SYNC_DELETE_IN_PROGRESS"
  | (string & {});
export interface CanaryStatus {
  State?: CanaryState;
  StateReason?: string;
  StateReasonCode?: CanaryStateReasonCode;
}
export interface CanaryTimeline {
  Created?: Date;
  LastModified?: Date;
  LastStarted?: Date;
  LastStopped?: Date;
}
export type FunctionArn = string;
export type VpcId = string;
export interface VpcConfigOutput {
  VpcId?: string;
  SubnetIds?: string[];
  SecurityGroupIds?: string[];
  Ipv6AllowedForDualStack?: boolean;
}
export type BaseScreenshotConfigIgnoreCoordinate = string;
export type BaseScreenshotIgnoreCoordinates = string[];
export interface BaseScreenshot {
  ScreenshotName: string;
  IgnoreCoordinates?: string[];
}
export type BaseScreenshots = BaseScreenshot[];
export interface VisualReferenceOutput {
  BaseScreenshots?: BaseScreenshot[];
  BaseCanaryRunId?: string;
  BrowserType?: BrowserType;
}
export interface EngineConfig {
  EngineArn?: string;
  BrowserType?: BrowserType;
}
export type EngineConfigs = EngineConfig[];
export type VisualReferencesOutput = VisualReferenceOutput[];
export type LocationType = "Primary" | "Replica" | (string & {});
export type ReplicationState = "InProgress" | "InSync" | "Inconsistent" | (string & {});
export interface ReplicationStatus {
  State?: ReplicationState;
  StateReason?: string;
  StateReasonCode?: string;
}
export interface Replica {
  Location?: string;
  ReplicationStatus?: ReplicationStatus;
  CanaryState?: CanaryState;
  LastModified?: Date;
  VpcConfig?: VpcConfigOutput;
}
export type Replicas = Replica[];
export interface MultiLocationConfig {
  LocationType?: LocationType;
  PrimaryLocation?: string;
  Replicas?: Replica[];
  ReplicationState?: ReplicationState;
}
export interface ArtifactConfigOutput {
  S3Encryption?: S3EncryptionConfig;
}
export interface DryRunConfigOutput {
  DryRunId?: string;
  LastDryRunExecutionStatus?: string;
}
export interface Canary {
  Id?: string;
  Name?: string;
  Code?: CanaryCodeOutput;
  ExecutionRoleArn?: string;
  Schedule?: CanaryScheduleOutput;
  RunConfig?: CanaryRunConfigOutput;
  SuccessRetentionPeriodInDays?: number;
  FailureRetentionPeriodInDays?: number;
  Status?: CanaryStatus;
  Timeline?: CanaryTimeline;
  ArtifactS3Location?: string;
  EngineArn?: string;
  RuntimeVersion?: string;
  VpcConfig?: VpcConfigOutput;
  VisualReference?: VisualReferenceOutput;
  ProvisionedResourceCleanup?: ProvisionedResourceCleanupSetting;
  BrowserConfigs?: BrowserConfig[];
  EngineConfigs?: EngineConfig[];
  VisualReferences?: VisualReferenceOutput[];
  MultiLocationConfig?: MultiLocationConfig;
  Tags?: { [key: string]: string | undefined };
  ArtifactConfig?: ArtifactConfigOutput;
  KmsKeyArn?: string;
  DryRunConfig?: DryRunConfigOutput;
}
export interface CreateCanaryResponse {
  Canary?: Canary;
}
export type GroupName = string;
export interface CreateGroupRequest {
  Name: string;
  Tags?: { [key: string]: string | undefined };
}
export type GroupArn = string;
export interface Group {
  Id?: string;
  Name?: string;
  Arn?: string;
  Tags?: { [key: string]: string | undefined };
  CreatedTime?: Date;
  LastModifiedTime?: Date;
}
export interface CreateGroupResponse {
  Group?: Group;
}
export interface DeleteCanaryRequest {
  Name: string;
  DeleteLambda?: boolean;
}
export interface DeleteCanaryResponse {}
export interface DeleteGroupRequest {
  GroupIdentifier: string;
}
export interface DeleteGroupResponse {}
export type Token = string;
export type MaxCanaryResults = number;
export type DescribeCanariesNameFilter = string[];
export interface DescribeCanariesRequest {
  NextToken?: string;
  MaxResults?: number;
  Names?: string[];
}
export type Canaries = Canary[];
export interface DescribeCanariesResponse {
  Canaries?: Canary[];
  NextToken?: string;
}
export type MaxSize100 = number;
export type DescribeCanariesLastRunNameFilter = string[];
export interface DescribeCanariesLastRunRequest {
  NextToken?: string;
  MaxResults?: number;
  Names?: string[];
  BrowserType?: BrowserType;
}
export type RetryAttempt = number;
export type CanaryRunState = "RUNNING" | "PASSED" | "FAILED" | (string & {});
export type CanaryRunStateReasonCode = "CANARY_FAILURE" | "EXECUTION_FAILURE" | (string & {});
export type CanaryRunTestResult = "PASSED" | "FAILED" | "UNKNOWN" | (string & {});
export interface CanaryRunStatus {
  State?: CanaryRunState;
  StateReason?: string;
  StateReasonCode?: CanaryRunStateReasonCode;
  TestResult?: CanaryRunTestResult;
}
export interface CanaryRunTimeline {
  Started?: Date;
  Completed?: Date;
  MetricTimestampForRunAndRetries?: Date;
}
export interface CanaryDryRunConfigOutput {
  DryRunId?: string;
}
export interface CanaryRun {
  Id?: string;
  ScheduledRunId?: string;
  RetryAttempt?: number;
  Name?: string;
  Status?: CanaryRunStatus;
  Timeline?: CanaryRunTimeline;
  ArtifactS3Location?: string;
  DryRunConfig?: CanaryDryRunConfigOutput;
  BrowserType?: BrowserType;
  Location?: string;
}
export interface CanaryLastRun {
  CanaryName?: string;
  LastRun?: CanaryRun;
}
export type CanariesLastRun = CanaryLastRun[];
export interface DescribeCanariesLastRunResponse {
  CanariesLastRun?: CanaryLastRun[];
  NextToken?: string;
}
export interface DescribeRuntimeVersionsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface RuntimeVersion {
  VersionName?: string;
  Description?: string;
  ReleaseDate?: Date;
  DeprecationDate?: Date;
}
export type RuntimeVersionList = RuntimeVersion[];
export interface DescribeRuntimeVersionsResponse {
  RuntimeVersions?: RuntimeVersion[];
  NextToken?: string;
}
export interface DisassociateResourceRequest {
  GroupIdentifier: string;
  ResourceArn: string;
}
export interface DisassociateResourceResponse {}
export interface GetCanaryRequest {
  Name: string;
  DryRunId?: string;
}
export interface GetCanaryResponse {
  Canary?: Canary;
}
export type RunType = "CANARY_RUN" | "DRY_RUN" | (string & {});
export interface GetCanaryRunsRequest {
  Name: string;
  NextToken?: string;
  MaxResults?: number;
  DryRunId?: string;
  RunType?: RunType;
}
export type CanaryRuns = CanaryRun[];
export interface GetCanaryRunsResponse {
  CanaryRuns?: CanaryRun[];
  NextToken?: string;
}
export interface GetGroupRequest {
  GroupIdentifier: string;
}
export interface GetGroupResponse {
  Group?: Group;
}
export type PaginationToken = string;
export type MaxGroupResults = number;
export interface ListAssociatedGroupsRequest {
  NextToken?: string;
  MaxResults?: number;
  ResourceArn: string;
}
export interface GroupSummary {
  Id?: string;
  Name?: string;
  Arn?: string;
}
export type GroupSummaryList = GroupSummary[];
export interface ListAssociatedGroupsResponse {
  Groups?: GroupSummary[];
  NextToken?: string;
}
export interface ListGroupResourcesRequest {
  NextToken?: string;
  MaxResults?: number;
  GroupIdentifier: string;
}
export type StringList = string[];
export interface ListGroupResourcesResponse {
  Resources?: string[];
  NextToken?: string;
}
export interface ListGroupsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface ListGroupsResponse {
  Groups?: GroupSummary[];
  NextToken?: string;
}
export type ResourceArn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface StartCanaryRequest {
  Name: string;
}
export interface StartCanaryResponse {}
export interface VisualReferenceInput {
  BaseScreenshots?: BaseScreenshot[];
  BaseCanaryRunId: string;
  BrowserType?: BrowserType;
}
export type VisualReferences = VisualReferenceInput[];
export interface StartCanaryDryRunRequest {
  Name: string;
  Code?: CanaryCodeInput;
  RuntimeVersion?: string;
  RunConfig?: CanaryRunConfigInput;
  VpcConfig?: VpcConfigInput;
  ExecutionRoleArn?: string;
  SuccessRetentionPeriodInDays?: number;
  FailureRetentionPeriodInDays?: number;
  VisualReference?: VisualReferenceInput;
  ArtifactS3Location?: string;
  ArtifactConfig?: ArtifactConfigInput;
  ProvisionedResourceCleanup?: ProvisionedResourceCleanupSetting;
  BrowserConfigs?: BrowserConfig[];
  VisualReferences?: VisualReferenceInput[];
}
export interface StartCanaryDryRunResponse {
  DryRunConfig?: DryRunConfigOutput;
}
export interface StopCanaryRequest {
  Name: string;
}
export interface StopCanaryResponse {}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export type RemoveReplicaLocations = string[];
export interface UpdateCanaryRequest {
  Name: string;
  Code?: CanaryCodeInput;
  ExecutionRoleArn?: string;
  RuntimeVersion?: string;
  Schedule?: CanaryScheduleInput;
  RunConfig?: CanaryRunConfigInput;
  SuccessRetentionPeriodInDays?: number;
  FailureRetentionPeriodInDays?: number;
  VpcConfig?: VpcConfigInput;
  VisualReference?: VisualReferenceInput;
  ArtifactS3Location?: string;
  ArtifactConfig?: ArtifactConfigInput;
  ProvisionedResourceCleanup?: ProvisionedResourceCleanupSetting;
  DryRunId?: string;
  VisualReferences?: VisualReferenceInput[];
  BrowserConfigs?: BrowserConfig[];
  AddReplicaLocations?: AddReplicaLocationInput[];
  RemoveReplicaLocations?: string[];
  KmsKeyArn?: string;
}
export interface UpdateCanaryResponse {}
export type ErrorMessage = string;
export type AssociateResourceError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Associates a canary with a group. Using groups can help you with
 * managing and automating your canaries, and you can also view aggregated run results and statistics
 * for all canaries in a group.
 *
 * You must run this operation in the Region where the canary exists.
 */
export const associateResource: API.OperationMethod<
  AssociateResourceRequest,
  AssociateResourceResponse,
  AssociateResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<AssociateResourceRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<AssociateResourceResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateResource",
}));

export type CreateCanaryError =
  | InternalServerException
  | RequestEntityTooLargeException
  | ValidationException
  | CommonErrors;
/**
 * Creates a canary. Canaries are scripts that monitor your endpoints and APIs from the
 * outside-in. Canaries help you check the availability and latency of your web services and
 * troubleshoot anomalies by investigating load time data, screenshots of the UI, logs, and
 * metrics. You can set up a canary to run continuously or just once.
 *
 * Do not use `CreateCanary` to modify an existing canary. Use UpdateCanary instead.
 *
 * To create canaries, you must have the `CloudWatchSyntheticsFullAccess` policy.
 * If you are creating a new IAM role for the canary, you also need the
 * `iam:CreateRole`, `iam:CreatePolicy` and
 * `iam:AttachRolePolicy` permissions. For more information, see Necessary
 * Roles and Permissions.
 *
 * Do not include secrets or proprietary information in your canary names. The canary name
 * makes up part of the Amazon Resource Name (ARN) for the canary, and the ARN is included in
 * outbound calls over the internet. For more information, see Security
 * Considerations for Synthetics Canaries.
 */
export const createCanary: API.OperationMethod<
  CreateCanaryRequest,
  CreateCanaryResponse,
  CreateCanaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(33, __c2, 1) as any as S.Schema<CreateCanaryRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<CreateCanaryResponse>,
  errors: [InternalServerException, RequestEntityTooLargeException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCanary",
}));

export type CreateGroupError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a group which you can use to associate canaries with each other, including cross-Region
 * canaries. Using groups can help you with
 * managing and automating your canaries, and you can also view aggregated run results and statistics
 * for all canaries in a group.
 *
 * Groups are global resources. When you create a group, it is replicated across Amazon Web Services Regions, and
 * you can view it and add canaries to it from any Region.
 * Although the group ARN format reflects the Region name where it was created, a group is not constrained to any Region.
 * This means that you can put canaries from multiple Regions into the same group, and then use
 * that group to view and manage all of those canaries in a single view.
 *
 * Groups are supported in all Regions except the Regions that are disabled by default. For more information
 * about these Regions, see Enabling a Region.
 *
 * Each group can contain as many as 10 canaries. You can have as many as 20 groups in your account. Any single canary
 * can be a member of up to 10 groups.
 */
export const createGroup: API.OperationMethod<
  CreateGroupRequest,
  CreateGroupResponse,
  CreateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<CreateGroupRequest>,
  output: __S(193, __c12, 1) as any as S.Schema<CreateGroupResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGroup",
}));

export type DeleteCanaryError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Permanently deletes the specified canary.
 *
 * If the canary's `ProvisionedResourceCleanup` field is set to `AUTOMATIC`
 * or you specify `DeleteLambda` in this operation as `true`, CloudWatch Synthetics also deletes
 * the Lambda functions and layers that are used by the canary.
 *
 * Other resources used and created by the canary are not automatically deleted.
 * After you delete a canary, you
 * should also delete the following:
 *
 * - The CloudWatch alarms created for this canary. These alarms have a name of
 * Synthetics-Alarm-*first-198-characters-of-canary-name*-*canaryId*-*alarm number*
 *
 * - Amazon S3 objects and buckets, such as the canary's artifact location.
 *
 * - IAM roles created for the canary. If they were created in the console, these roles
 * have the name
 * role/service-role/CloudWatchSyntheticsRole-*First-21-Characters-of-CanaryName*
 *
 * - CloudWatch Logs log groups created for the canary. These logs groups have the name
 * /aws/lambda/cwsyn-*First-21-Characters-of-CanaryName*
 *
 * Before you delete a canary, you might want to use `GetCanary` to display
 * the information about this canary. Make
 * note of the information returned by this operation so that you can delete these resources
 * after you delete the canary.
 */
export const deleteCanary: API.OperationMethod<
  DeleteCanaryRequest,
  DeleteCanaryResponse,
  DeleteCanaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<DeleteCanaryRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteCanaryResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCanary",
}));

export type DeleteGroupError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a group. The group doesn't need to be empty to be deleted. If there are canaries in the group,
 * they are not deleted when you delete the group.
 *
 * Groups are a global resource that appear in all Regions, but the request to delete a group
 * must be made from its home Region. You can find the home Region of a group within its ARN.
 */
export const deleteGroup: API.OperationMethod<
  DeleteGroupRequest,
  DeleteGroupResponse,
  DeleteGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<DeleteGroupRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteGroupResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGroup",
}));

export type DescribeCanariesError = InternalServerException | ValidationException | CommonErrors;
/**
 * This operation returns a list of the canaries in your account, along with full details
 * about each canary.
 *
 * This operation supports resource-level authorization using an IAM policy and
 * the `Names` parameter. If you specify the `Names` parameter, the operation is successful only if you have authorization to view
 * all the canaries that you specify in your request. If you do not have permission to view any of
 * the canaries, the request fails with a 403 response.
 *
 * You are required to use the `Names` parameter if you are logged on to a user or role that has an
 * IAM policy that restricts which canaries that you are allowed to view. For more information,
 * see
 * Limiting a user to viewing specific canaries.
 */
export const describeCanaries: API.PaginatedOperationMethod<
  DescribeCanariesRequest,
  DescribeCanariesResponse,
  DescribeCanariesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<DescribeCanariesRequest>,
  output: __S(242, __c15, 2) as any as S.Schema<DescribeCanariesResponse>,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCanaries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeCanariesLastRunError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Use this operation to see information from the most recent run of each canary that you have created.
 *
 * This operation supports resource-level authorization using an IAM policy and
 * the `Names` parameter. If you specify the `Names` parameter, the operation is successful only if you have authorization to view
 * all the canaries that you specify in your request. If you do not have permission to view any of
 * the canaries, the request fails with a 403 response.
 *
 * You are required to use the `Names` parameter if you are logged on to a user or role that has an
 * IAM policy that restricts which canaries that you are allowed to view. For more information,
 * see
 * Limiting a user to viewing specific canaries.
 */
export const describeCanariesLastRun: API.PaginatedOperationMethod<
  DescribeCanariesLastRunRequest,
  DescribeCanariesLastRunResponse,
  DescribeCanariesLastRunError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<DescribeCanariesLastRunRequest>,
  output: __S(259, __c16, 3) as any as S.Schema<DescribeCanariesLastRunResponse>,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCanariesLastRun",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeRuntimeVersionsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of Synthetics canary runtime versions. For more information,
 * see
 * Canary Runtime Versions.
 */
export const describeRuntimeVersions: API.PaginatedOperationMethod<
  DescribeRuntimeVersionsRequest,
  DescribeRuntimeVersionsResponse,
  DescribeRuntimeVersionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<DescribeRuntimeVersionsRequest>,
  output: __S(291, __c18, 3) as any as S.Schema<DescribeRuntimeVersionsResponse>,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRuntimeVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DisassociateResourceError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes a canary from a group. You must run this operation in the Region where the canary exists.
 */
export const disassociateResource: API.OperationMethod<
  DisassociateResourceRequest,
  DisassociateResourceResponse,
  DisassociateResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<DisassociateResourceRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DisassociateResourceResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateResource",
}));

export type GetCanaryError =
  | InternalServerException
  | ValidationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves complete information about one canary. You must specify
 * the name of the canary that you want. To get a list of canaries
 * and their names, use DescribeCanaries.
 */
export const getCanary: API.OperationMethod<
  GetCanaryRequest,
  GetCanaryResponse,
  GetCanaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<GetCanaryRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<GetCanaryResponse>,
  errors: [InternalServerException, ValidationException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCanary",
}));

export type GetCanaryRunsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of runs for a specified canary.
 */
export const getCanaryRuns: API.PaginatedOperationMethod<
  GetCanaryRunsRequest,
  GetCanaryRunsResponse,
  GetCanaryRunsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<GetCanaryRunsRequest>,
  output: __S(338, __c21, 2) as any as S.Schema<GetCanaryRunsResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCanaryRuns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetGroupError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about one group. Groups are a global resource, so you can use this operation from
 * any Region.
 */
export const getGroup: API.OperationMethod<
  GetGroupRequest,
  GetGroupResponse,
  GetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<GetGroupRequest>,
  output: __S(193, __c12, 1) as any as S.Schema<GetGroupResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroup",
}));

export type ListAssociatedGroupsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the groups that the specified canary is associated with. The canary
 * that you specify must be in the current Region.
 */
export const listAssociatedGroups: API.PaginatedOperationMethod<
  ListAssociatedGroupsRequest,
  ListAssociatedGroupsResponse,
  ListAssociatedGroupsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<ListAssociatedGroupsRequest>,
  output: __S(386, __c24, 2) as any as S.Schema<ListAssociatedGroupsResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssociatedGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGroupResourcesError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * This operation returns a list of the ARNs of the canaries that are associated with the specified group.
 */
export const listGroupResources: API.PaginatedOperationMethod<
  ListGroupResourcesRequest,
  ListGroupResourcesResponse,
  ListGroupResourcesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<ListGroupResourcesRequest>,
  output: __S(401, __c25, 1) as any as S.Schema<ListGroupResourcesResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroupResources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGroupsError = InternalServerException | ValidationException | CommonErrors;
/**
 * Returns a list of all groups in the account, displaying their names, unique IDs, and ARNs. The groups
 * from all Regions are returned.
 */
export const listGroups: API.PaginatedOperationMethod<
  ListGroupsRequest,
  ListGroupsResponse,
  ListGroupsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<ListGroupsRequest>,
  output: __S(386, __c24, 2) as any as S.Schema<ListGroupsResponse>,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays the tags associated with a canary or group.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(433, __c27, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type StartCanaryError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Use this operation to run a canary that has already been created.
 * The frequency of the canary runs is determined by the value of the canary's `Schedule`. To see a canary's schedule,
 * use GetCanary.
 */
export const startCanary: API.OperationMethod<
  StartCanaryRequest,
  StartCanaryResponse,
  StartCanaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<StartCanaryRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<StartCanaryResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCanary",
}));

export type StartCanaryDryRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Use this operation to start a dry run for a canary that has already been created
 */
export const startCanaryDryRun: API.OperationMethod<
  StartCanaryDryRunRequest,
  StartCanaryDryRunResponse,
  StartCanaryDryRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<StartCanaryDryRunRequest>,
  output: __S(465, __c29, 1) as any as S.Schema<StartCanaryDryRunResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCanaryDryRun",
}));

export type StopCanaryError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Stops the canary to prevent all future runs. If the canary is currently running,the
 * run that is in progress completes on its own, publishes metrics, and uploads artifacts, but
 * it is not recorded in Synthetics as a completed run.
 *
 * You can use `StartCanary` to start it running again
 * with the canary's current schedule at any point in the future.
 */
export const stopCanary: API.OperationMethod<
  StopCanaryRequest,
  StopCanaryResponse,
  StopCanaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<StopCanaryRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<StopCanaryResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopCanary",
}));

export type TagResourceError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Assigns one or more tags (key-value pairs) to the specified canary or group.
 *
 * Tags can help you organize and categorize your
 * resources. You can also use them to scope user permissions, by granting a user permission to access or change only resources with
 * certain tag values.
 *
 * Tags don't have any semantic meaning to Amazon Web Services and are interpreted strictly as strings of characters.
 *
 * You can use the `TagResource` action with a resource that already has tags. If you specify a new
 * tag key for the resource,
 * this tag is appended to the list of tags associated
 * with the resource. If you specify a tag key that is already associated with the resource, the new tag
 * value that you specify replaces
 * the previous value for that tag.
 *
 * You can associate as many as 50 tags with a canary or group.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes one or more tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateCanaryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestEntityTooLargeException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of a canary that has already been created.
 *
 * For multibrowser canaries, you can add or remove browsers by updating the browserConfig list in the update call. For example:
 *
 * - To add Firefox to a canary that currently uses Chrome, specify browserConfigs as [CHROME, FIREFOX]
 *
 * - To remove Firefox and keep only Chrome, specify browserConfigs as [CHROME]
 *
 * You can't use this operation to update the tags of an existing canary. To change the tags of an existing canary, use
 * TagResource.
 *
 * When you use the `dryRunId` field when updating a canary, the only other field you can provide is the `Schedule`. Adding any other field will thrown an exception.
 */
export const updateCanary: API.OperationMethod<
  UpdateCanaryRequest,
  UpdateCanaryResponse,
  UpdateCanaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c34, 0) as any as S.Schema<UpdateCanaryRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<UpdateCanaryResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestEntityTooLargeException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCanary",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GroupIdentifier: S.String.pipe(T.HttpLabel("GroupIdentifier")),
          ResourceArn: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/group/{GroupIdentifier}/associate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateResourceRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "AssociateResourceResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Code: __S(144, __c9, 0),
          ArtifactS3Location: S.String,
          ExecutionRoleArn: S.String,
          Schedule: __S(161, __c10, 1),
          RunConfig: S.optional(__S(145, __c9, 1)),
          SuccessRetentionPeriodInDays: S.optional(S.Number),
          FailureRetentionPeriodInDays: S.optional(S.Number),
          RuntimeVersion: S.String,
          VpcConfig: S.optional(__S(146, __c9, 2)),
          ResourcesToReplicateTags: S.optional(__S(32, __c2, 0)),
          ProvisionedResourceCleanup: S.optional(S.String),
          BrowserConfigs: S.optional(__S(115, __c7, 3)),
          AddReplicaLocations: S.optional(__S(163, __c10, 3)),
          Tags: S.optional(__S(48, __c3, 0)),
          ArtifactConfig: S.optional(__S(117, __c7, 5)),
          KmsKeyArn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/canary" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateCanaryRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceLocationArn: S.optional(S.String),
          Handler: S.optional(S.String),
          BlueprintTypes: S.optional(__S(64, __c4, 0)),
          Dependencies: S.optional(__S(113, __c7, 1)),
        }),
      ).annotate({ identifier: "CanaryCodeOutput" });
    case 1:
      return S.suspend(() => S.Struct({ MaxRetries: S.optional(S.Number) })).annotate({
        identifier: "RetryConfigOutput",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Expression: S.optional(S.String),
          DurationInSeconds: S.optional(S.Number),
          RetryConfig: S.optional(__S(81, __c5, 1)),
        }),
      ).annotate({ identifier: "CanaryScheduleOutput" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          TimeoutInSeconds: S.optional(S.Number),
          MemoryInMB: S.optional(S.Number),
          ActiveTracing: S.optional(S.Boolean),
          EphemeralStorage: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CanaryRunConfigOutput" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          State: S.optional(S.String),
          StateReason: S.optional(S.String),
          StateReasonCode: S.optional(S.String),
        }),
      ).annotate({ identifier: "CanaryStatus" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastStarted: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastStopped: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CanaryTimeline" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          VpcId: S.optional(S.String),
          SubnetIds: S.optional(__S(64, __c4, 0)),
          SecurityGroupIds: S.optional(__S(64, __c4, 0)),
          Ipv6AllowedForDualStack: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "VpcConfigOutput" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          BaseScreenshots: S.optional(__S(119, __c7, 7)),
          BaseCanaryRunId: S.optional(S.String),
          BrowserType: S.optional(S.String),
        }),
      ).annotate({ identifier: "VisualReferenceOutput" });
    case 8:
      return S.suspend(() =>
        S.Struct({ EngineArn: S.optional(S.String), BrowserType: S.optional(S.String) }),
      ).annotate({ identifier: "EngineConfig" });
    case 9:
      return S.Array(__S(88, __c5, 8));
    case 10:
      return S.Array(__S(87, __c5, 7));
    case 11:
      return S.suspend(() =>
        S.Struct({
          State: S.optional(S.String),
          StateReason: S.optional(S.String),
          StateReasonCode: S.optional(S.String),
        }),
      ).annotate({ identifier: "ReplicationStatus" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          Location: S.optional(S.String),
          ReplicationStatus: S.optional(__S(91, __c5, 11)),
          CanaryState: S.optional(S.String),
          LastModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          VpcConfig: S.optional(__S(86, __c5, 6)),
        }),
      ).annotate({ identifier: "Replica" });
    case 13:
      return S.Array(__S(92, __c5, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({
          LocationType: S.optional(S.String),
          PrimaryLocation: S.optional(S.String),
          Replicas: S.optional(__S(93, __c5, 13)),
          ReplicationState: S.optional(S.String),
        }),
      ).annotate({ identifier: "MultiLocationConfig" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Code: S.optional(__S(80, __c5, 0)),
          ExecutionRoleArn: S.optional(S.String),
          Schedule: S.optional(__S(82, __c5, 2)),
          RunConfig: S.optional(__S(83, __c5, 3)),
          SuccessRetentionPeriodInDays: S.optional(S.Number),
          FailureRetentionPeriodInDays: S.optional(S.Number),
          Status: S.optional(__S(84, __c5, 4)),
          Timeline: S.optional(__S(85, __c5, 5)),
          ArtifactS3Location: S.optional(S.String),
          EngineArn: S.optional(S.String),
          RuntimeVersion: S.optional(S.String),
          VpcConfig: S.optional(__S(86, __c5, 6)),
          VisualReference: S.optional(__S(87, __c5, 7)),
          ProvisionedResourceCleanup: S.optional(S.String),
          BrowserConfigs: S.optional(__S(115, __c7, 3)),
          EngineConfigs: S.optional(__S(89, __c5, 9)),
          VisualReferences: S.optional(__S(90, __c5, 10)),
          MultiLocationConfig: S.optional(__S(94, __c5, 14)),
          Tags: S.optional(__S(48, __c3, 0)),
          ArtifactConfig: S.optional(__S(117, __c7, 5)),
          KmsKeyArn: S.optional(S.String),
          DryRunConfig: S.optional(__S(96, __c6, 0)),
        }),
      ).annotate({ identifier: "Canary" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DryRunId: S.optional(S.String),
          LastDryRunExecutionStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "DryRunConfigOutput" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String), Reference: S.String }),
      ).annotate({ identifier: "Dependency" });
    case 1:
      return S.Array(__S(112, __c7, 0));
    case 2:
      return S.suspend(() => S.Struct({ BrowserType: S.optional(S.String) })).annotate({
        identifier: "BrowserConfig",
      });
    case 3:
      return S.Array(__S(114, __c7, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ EncryptionMode: S.optional(S.String), KmsKeyArn: S.optional(S.String) }),
      ).annotate({ identifier: "S3EncryptionConfig" });
    case 5:
      return S.suspend(() => S.Struct({ S3Encryption: S.optional(__S(116, __c7, 4)) })).annotate({
        identifier: "ArtifactConfigInput",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({ ScreenshotName: S.String, IgnoreCoordinates: S.optional(__S(64, __c4, 0)) }),
      ).annotate({ identifier: "BaseScreenshot" });
    case 7:
      return S.Array(__S(118, __c7, 6));
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Canary: S.optional(__S(95, __c5, 15)) })).annotate({
        identifier: "CreateCanaryResponse",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          S3Bucket: S.optional(S.String),
          S3Key: S.optional(S.String),
          S3Version: S.optional(S.String),
          ZipFile: S.optional(T.Blob),
          Handler: S.optional(S.String),
          BlueprintTypes: S.optional(__S(64, __c4, 0)),
          Dependencies: S.optional(__S(113, __c7, 1)),
        }),
      ).annotate({ identifier: "CanaryCodeInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TimeoutInSeconds: S.optional(S.Number),
          MemoryInMB: S.optional(S.Number),
          ActiveTracing: S.optional(S.Boolean),
          EnvironmentVariables: S.optional(__S(48, __c3, 0)),
          EphemeralStorage: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CanaryRunConfigInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          SubnetIds: S.optional(__S(64, __c4, 0)),
          SecurityGroupIds: S.optional(__S(64, __c4, 0)),
          Ipv6AllowedForDualStack: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "VpcConfigInput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ MaxRetries: S.Number })).annotate({
        identifier: "RetryConfigInput",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Expression: S.String,
          DurationInSeconds: S.optional(S.Number),
          RetryConfig: S.optional(__S(160, __c10, 0)),
        }),
      ).annotate({ identifier: "CanaryScheduleInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Location: S.String,
          VpcConfig: S.optional(__S(146, __c9, 2)),
          KmsKeyArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "AddReplicaLocationInput" });
    case 3:
      return S.Array(__S(162, __c10, 2));
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Tags: S.optional(__S(48, __c3, 0)) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/group" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateGroupRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Arn: S.optional(S.String),
          Tags: S.optional(__S(48, __c3, 0)),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Group" });
    case 1:
      return S.suspend(() => S.Struct({ Group: S.optional(__S(192, __c12, 0)) })).annotate({
        identifier: "CreateGroupResponse",
      });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          DeleteLambda: S.optional(S.Boolean).pipe(T.HttpQuery("deleteLambda")),
        }).pipe(
          T.all(T.Http({ method: "DELETE", uri: "/canary/{Name}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteCanaryRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GroupIdentifier: S.String.pipe(T.HttpLabel("GroupIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/group/{GroupIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteGroupRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          Names: S.optional(__S(64, __c4, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/canaries" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeCanariesRequest" });
    case 1:
      return S.Array(__S(95, __c5, 15));
    case 2:
      return S.suspend(() =>
        S.Struct({ Canaries: S.optional(__S(241, __c15, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeCanariesResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          Names: S.optional(__S(64, __c4, 0)),
          BrowserType: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/canaries/last-run" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeCanariesLastRunRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ CanaryName: S.optional(S.String), LastRun: S.optional(__S(275, __c17, 3)) }),
      ).annotate({ identifier: "CanaryLastRun" });
    case 2:
      return S.Array(__S(257, __c16, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          CanariesLastRun: S.optional(__S(258, __c16, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeCanariesLastRunResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          State: S.optional(S.String),
          StateReason: S.optional(S.String),
          StateReasonCode: S.optional(S.String),
          TestResult: S.optional(S.String),
        }),
      ).annotate({ identifier: "CanaryRunStatus" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Started: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Completed: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          MetricTimestampForRunAndRetries: S.optional(
            S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ),
        }),
      ).annotate({ identifier: "CanaryRunTimeline" });
    case 2:
      return S.suspend(() => S.Struct({ DryRunId: S.optional(S.String) })).annotate({
        identifier: "CanaryDryRunConfigOutput",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          ScheduledRunId: S.optional(S.String),
          RetryAttempt: S.optional(S.Number),
          Name: S.optional(S.String),
          Status: S.optional(__S(272, __c17, 0)),
          Timeline: S.optional(__S(273, __c17, 1)),
          ArtifactS3Location: S.optional(S.String),
          DryRunConfig: S.optional(__S(274, __c17, 2)),
          BrowserType: S.optional(S.String),
          Location: S.optional(S.String),
        }),
      ).annotate({ identifier: "CanaryRun" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/runtime-versions" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeRuntimeVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          VersionName: S.optional(S.String),
          Description: S.optional(S.String),
          ReleaseDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DeprecationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "RuntimeVersion" });
    case 2:
      return S.Array(__S(289, __c18, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          RuntimeVersions: S.optional(__S(290, __c18, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeRuntimeVersionsResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GroupIdentifier: S.String.pipe(T.HttpLabel("GroupIdentifier")),
          ResourceArn: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/group/{GroupIdentifier}/disassociate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateResourceRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          DryRunId: S.optional(S.String).pipe(T.HttpQuery("dryRunId")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/canary/{Name}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetCanaryRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          DryRunId: S.optional(S.String),
          RunType: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/canary/{Name}/runs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCanaryRunsRequest" });
    case 1:
      return S.Array(__S(275, __c17, 3));
    case 2:
      return S.suspend(() =>
        S.Struct({ CanaryRuns: S.optional(__S(337, __c21, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetCanaryRunsResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GroupIdentifier: S.String.pipe(T.HttpLabel("GroupIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/group/{GroupIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetGroupRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/resource/{ResourceArn}/groups" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAssociatedGroupsRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Arn: S.optional(S.String),
        }),
      ).annotate({ identifier: "GroupSummary" });
    case 1:
      return S.Array(__S(384, __c24, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Groups: S.optional(__S(385, __c24, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAssociatedGroupsResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          GroupIdentifier: S.String.pipe(T.HttpLabel("GroupIdentifier")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/group/{GroupIdentifier}/resources" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListGroupResourcesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Resources: S.optional(__S(64, __c4, 0)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListGroupResourcesResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/groups" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListGroupsRequest" });
  }
}
function __c27(j: number): any {
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
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(48, __c3, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/canary/{Name}/start" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartCanaryRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          Code: S.optional(__S(144, __c9, 0)),
          RuntimeVersion: S.optional(S.String),
          RunConfig: S.optional(__S(145, __c9, 1)),
          VpcConfig: S.optional(__S(146, __c9, 2)),
          ExecutionRoleArn: S.optional(S.String),
          SuccessRetentionPeriodInDays: S.optional(S.Number),
          FailureRetentionPeriodInDays: S.optional(S.Number),
          VisualReference: S.optional(__S(480, __c30, 0)),
          ArtifactS3Location: S.optional(S.String),
          ArtifactConfig: S.optional(__S(117, __c7, 5)),
          ProvisionedResourceCleanup: S.optional(S.String),
          BrowserConfigs: S.optional(__S(115, __c7, 3)),
          VisualReferences: S.optional(__S(481, __c30, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/canary/{Name}/dry-run/start" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartCanaryDryRunRequest" });
    case 1:
      return S.suspend(() => S.Struct({ DryRunConfig: S.optional(__S(96, __c6, 0)) })).annotate({
        identifier: "StartCanaryDryRunResponse",
      });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BaseScreenshots: S.optional(__S(119, __c7, 7)),
          BaseCanaryRunId: S.String,
          BrowserType: S.optional(S.String),
        }),
      ).annotate({ identifier: "VisualReferenceInput" });
    case 1:
      return S.Array(__S(480, __c30, 0));
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/canary/{Name}/stop" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopCanaryRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Tags: __S(48, __c3, 0),
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
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: __S(64, __c4, 0).pipe(T.HttpQuery("tagKeys")),
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
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          Code: S.optional(__S(144, __c9, 0)),
          ExecutionRoleArn: S.optional(S.String),
          RuntimeVersion: S.optional(S.String),
          Schedule: S.optional(__S(161, __c10, 1)),
          RunConfig: S.optional(__S(145, __c9, 1)),
          SuccessRetentionPeriodInDays: S.optional(S.Number),
          FailureRetentionPeriodInDays: S.optional(S.Number),
          VpcConfig: S.optional(__S(146, __c9, 2)),
          VisualReference: S.optional(__S(480, __c30, 0)),
          ArtifactS3Location: S.optional(S.String),
          ArtifactConfig: S.optional(__S(117, __c7, 5)),
          ProvisionedResourceCleanup: S.optional(S.String),
          DryRunId: S.optional(S.String),
          VisualReferences: S.optional(__S(481, __c30, 1)),
          BrowserConfigs: S.optional(__S(115, __c7, 3)),
          AddReplicaLocations: S.optional(__S(163, __c10, 3)),
          RemoveReplicaLocations: S.optional(__S(64, __c4, 0)),
          KmsKeyArn: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "PATCH", uri: "/canary/{Name}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateCanaryRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
