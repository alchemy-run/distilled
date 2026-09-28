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
  sdkId: "synthetics",
  target: "Synthetics",
  version: "2017-10-11",
  sigv4: "synthetics",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://synthetics.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://synthetics.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class InternalFailureException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalFailureException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class RequestEntityTooLargeException
  extends /*@__PURE__*/ TE.TaggedError(
    "RequestEntityTooLargeException",
    ["BadRequestError"],
    { status: 413 },
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
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestsException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
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
export type ProvisionedResourceCleanupSetting =
  | "AUTOMATIC"
  | "OFF"
  | (string & {});
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
export type ReplicationState =
  | "InProgress"
  | "InSync"
  | "Inconsistent"
  | (string & {});
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
export type CanaryRunStateReasonCode =
  | "CANARY_FAILURE"
  | "EXECUTION_FAILURE"
  | (string & {});
export type CanaryRunTestResult =
  | "PASSED"
  | "FAILED"
  | "UNKNOWN"
  | (string & {});
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
  descriptor: {
    service: svc,
    http: "PATCH /group/{GroupIdentifier}/associate",
    input: { GroupIdentifier: 0, ResourceArn: 0 },
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
  operationName: "AssociateResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /canary",
    input: {
      Name: 0,
      Code: i_CanaryCodeInput,
      ArtifactS3Location: 0,
      ExecutionRoleArn: 0,
      Schedule: i_CanaryScheduleInput,
      RunConfig: i_CanaryRunConfigInput,
      SuccessRetentionPeriodInDays: 0,
      FailureRetentionPeriodInDays: 0,
      RuntimeVersion: 0,
      VpcConfig: i_VpcConfigInput,
      ResourcesToReplicateTags: 0,
      ProvisionedResourceCleanup: 0,
      BrowserConfigs: D.list(i_BrowserConfig),
      AddReplicaLocations: D.list(i_AddReplicaLocationInput),
      Tags: 0,
      ArtifactConfig: i_ArtifactConfigInput,
      KmsKeyArn: 0,
    },
    output: { Canary: o_Canary },
    body: true,
  },
  errors: [
    InternalServerException,
    RequestEntityTooLargeException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCanary",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /group",
    input: { Name: 0, Tags: 0 },
    output: { Group: o_Group },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGroup",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /canary/{Name}",
    input: { Name: 0, DeleteLambda: D.m({ query: "deleteLambda" }) },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCanary",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /group/{GroupIdentifier}",
    input: { GroupIdentifier: 0 },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGroup",
})) as any;

export type DescribeCanariesError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "POST /canaries",
    input: { NextToken: 0, MaxResults: 0, Names: 0 },
    output: { Canaries: D.list(o_Canary) },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /canaries/last-run",
    input: { NextToken: 0, MaxResults: 0, Names: 0, BrowserType: 0 },
    output: { CanariesLastRun: D.list({ LastRun: o_CanaryRun }) },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /runtime-versions",
    input: { NextToken: 0, MaxResults: 0 },
    output: {
      RuntimeVersions: D.list({ ReleaseDate: D.ts, DeprecationDate: D.ts }),
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "PATCH /group/{GroupIdentifier}/disassociate",
    input: { GroupIdentifier: 0, ResourceArn: 0 },
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
  operationName: "DisassociateResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /canary/{Name}",
    input: { Name: 0, DryRunId: D.m({ query: "dryRunId" }) },
    output: { Canary: o_Canary },
  },
  errors: [
    InternalServerException,
    ValidationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCanary",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /canary/{Name}/runs",
    input: { Name: 0, NextToken: 0, MaxResults: 0, DryRunId: 0, RunType: 0 },
    output: { CanaryRuns: D.list(o_CanaryRun) },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
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
  descriptor: {
    service: svc,
    http: "GET /group/{GroupIdentifier}",
    input: { GroupIdentifier: 0 },
    output: { Group: o_Group },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroup",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /resource/{ResourceArn}/groups",
    input: { NextToken: 0, MaxResults: 0, ResourceArn: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
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
  descriptor: {
    service: svc,
    http: "POST /group/{GroupIdentifier}/resources",
    input: { NextToken: 0, MaxResults: 0, GroupIdentifier: 0 },
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
  operationName: "ListGroupResources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGroupsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "POST /groups",
    input: { NextToken: 0, MaxResults: 0 },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "GET /tags/{ResourceArn}",
    input: { ResourceArn: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /canary/{Name}/start",
    input: { Name: 0 },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCanary",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /canary/{Name}/dry-run/start",
    input: {
      Name: 0,
      Code: i_CanaryCodeInput,
      RuntimeVersion: 0,
      RunConfig: i_CanaryRunConfigInput,
      VpcConfig: i_VpcConfigInput,
      ExecutionRoleArn: 0,
      SuccessRetentionPeriodInDays: 0,
      FailureRetentionPeriodInDays: 0,
      VisualReference: i_VisualReferenceInput,
      ArtifactS3Location: 0,
      ArtifactConfig: i_ArtifactConfigInput,
      ProvisionedResourceCleanup: 0,
      BrowserConfigs: D.list(i_BrowserConfig),
      VisualReferences: D.list(i_VisualReferenceInput),
    },
    body: true,
  },
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
})) as any;

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
 * with the canary’s current schedule at any point in the future.
 */
export const stopCanary: API.OperationMethod<
  StopCanaryRequest,
  StopCanaryResponse,
  StopCanaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /canary/{Name}/stop",
    input: { Name: 0 },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopCanary",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags/{ResourceArn}",
    input: { ResourceArn: 0, Tags: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{ResourceArn}",
    input: { ResourceArn: 0, TagKeys: D.m({ query: "tagKeys" }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /canary/{Name}",
    input: {
      Name: 0,
      Code: i_CanaryCodeInput,
      ExecutionRoleArn: 0,
      RuntimeVersion: 0,
      Schedule: i_CanaryScheduleInput,
      RunConfig: i_CanaryRunConfigInput,
      SuccessRetentionPeriodInDays: 0,
      FailureRetentionPeriodInDays: 0,
      VpcConfig: i_VpcConfigInput,
      VisualReference: i_VisualReferenceInput,
      ArtifactS3Location: 0,
      ArtifactConfig: i_ArtifactConfigInput,
      ProvisionedResourceCleanup: 0,
      DryRunId: 0,
      VisualReferences: D.list(i_VisualReferenceInput),
      BrowserConfigs: D.list(i_BrowserConfig),
      AddReplicaLocations: D.list(i_AddReplicaLocationInput),
      RemoveReplicaLocations: 0,
      KmsKeyArn: 0,
    },
    body: true,
  },
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
})) as any;

const i_AddReplicaLocationInput: D.LazyStruct = () => ({
  Location: 0,
  VpcConfig: i_VpcConfigInput,
  KmsKeyArn: 0,
});
const i_ArtifactConfigInput: D.LazyStruct = () => ({
  S3Encryption: { EncryptionMode: 0, KmsKeyArn: 0 },
});
const i_BrowserConfig: D.LazyStruct = () => ({ BrowserType: 0 });
const i_CanaryCodeInput: D.LazyStruct = () => ({
  S3Bucket: 0,
  S3Key: 0,
  S3Version: 0,
  ZipFile: 0,
  Handler: 0,
  BlueprintTypes: 0,
  Dependencies: D.list({ Type: 0, Reference: 0 }),
});
const i_CanaryRunConfigInput: D.LazyStruct = () => ({
  TimeoutInSeconds: 0,
  MemoryInMB: 0,
  ActiveTracing: 0,
  EnvironmentVariables: 0,
  EphemeralStorage: 0,
});
const i_CanaryScheduleInput: D.LazyStruct = () => ({
  Expression: 0,
  DurationInSeconds: 0,
  RetryConfig: { MaxRetries: 0 },
});
const i_VisualReferenceInput: D.LazyStruct = () => ({
  BaseScreenshots: D.list({ ScreenshotName: 0, IgnoreCoordinates: 0 }),
  BaseCanaryRunId: 0,
  BrowserType: 0,
});
const i_VpcConfigInput: D.LazyStruct = () => ({
  SubnetIds: 0,
  SecurityGroupIds: 0,
  Ipv6AllowedForDualStack: 0,
});
const o_Canary: D.LazyStruct = () => ({
  Timeline: {
    Created: D.ts,
    LastModified: D.ts,
    LastStarted: D.ts,
    LastStopped: D.ts,
  },
  MultiLocationConfig: { Replicas: D.list({ LastModified: D.ts }) },
});
const o_CanaryRun: D.LazyStruct = () => ({
  Timeline: {
    Started: D.ts,
    Completed: D.ts,
    MetricTimestampForRunAndRetries: D.ts,
  },
});
const o_Group: D.LazyStruct = () => ({
  CreatedTime: D.ts,
  LastModifiedTime: D.ts,
});
