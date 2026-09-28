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
  sdkId: "DLM",
  target: "dlm_20180112",
  version: "2018-01-12",
  sigv4: "dlm",
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
                `https://dlm-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
                return e(`https://dlm.${Region}.amazonaws.com`);
              }
              return e(
                `https://dlm-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://dlm.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://dlm.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string; readonly Code?: string }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message?: string;
    readonly Code?: string;
    readonly RequiredParameters?: string[];
    readonly MutuallyExclusiveParameters?: string[];
  }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["ThrottlingError"],
    { status: 429 },
  )<{
    readonly message?: string;
    readonly Code?: string;
    readonly ResourceType?: string;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message?: string;
    readonly Code?: string;
    readonly ResourceType?: string;
    readonly ResourceIds?: string[];
  }> {}
export type ExecutionRoleArn = string;
export type PolicyDescription = string;
export type SettablePolicyStateValues = "ENABLED" | "DISABLED" | (string & {});
export type PolicyTypeValues =
  | "EBS_SNAPSHOT_MANAGEMENT"
  | "IMAGE_MANAGEMENT"
  | "EVENT_BASED_POLICY"
  | (string & {});
export type ResourceTypeValues = "VOLUME" | "INSTANCE" | (string & {});
export type ResourceTypeValuesList = ResourceTypeValues[];
export type ResourceLocationValues =
  | "CLOUD"
  | "OUTPOST"
  | "LOCAL_ZONE"
  | (string & {});
export type ResourceLocationList = ResourceLocationValues[];
export interface Tag {
  Key?: string;
  Value?: string;
}
export type TargetTagList = Tag[];
export type ScheduleName = string;
export type CopyTags = boolean;
export type TagsToAddList = Tag[];
export type VariableTagsList = Tag[];
export type LocationValues =
  | "CLOUD"
  | "OUTPOST_LOCAL"
  | "LOCAL_ZONE"
  | (string & {});
export type Interval = number;
export type IntervalUnitValues = "HOURS" | (string & {});
export type TimesList = string[];
export type CronExpression = string;
export type StageValues = "PRE" | "POST" | (string & {});
export type StagesList = StageValues[];
export type ExecutionHandlerServiceValues =
  | "AWS_SYSTEMS_MANAGER"
  | (string & {});
export type ExecutionHandler = string;
export type ExecuteOperationOnScriptFailure = boolean;
export type ScriptExecutionTimeout = number;
export type ScriptMaximumRetryCount = number;
export interface Script {
  Stages?: StageValues[];
  ExecutionHandlerService?: ExecutionHandlerServiceValues;
  ExecutionHandler?: string;
  ExecuteOperationOnScriptFailure?: boolean;
  ExecutionTimeout?: number;
  MaximumRetryCount?: number;
}
export type ScriptsList = Script[];
export interface CreateRule {
  Location?: LocationValues;
  Interval?: number;
  IntervalUnit?: IntervalUnitValues;
  Times?: string[];
  CronExpression?: string;
  Scripts?: Script[];
}
export type StandardTierRetainRuleCount = number;
export type StandardTierRetainRuleInterval = number;
export type RetentionIntervalUnitValues =
  | "DAYS"
  | "WEEKS"
  | "MONTHS"
  | "YEARS"
  | (string & {});
export interface RetainRule {
  Count?: number;
  Interval?: number;
  IntervalUnit?: RetentionIntervalUnitValues;
}
export type Count = number;
export type AvailabilityZone = string;
export type AvailabilityZoneList = string[];
export type AvailabilityZoneId = string;
export type AvailabilityZoneIdList = string[];
export interface FastRestoreRule {
  Count?: number;
  Interval?: number;
  IntervalUnit?: RetentionIntervalUnitValues;
  AvailabilityZones?: string[];
  AvailabilityZoneIds?: string[];
}
export type TargetRegion = string;
export type Target = string;
export type Encrypted = boolean;
export type CmkArn = string;
export type CopyTagsNullable = boolean;
export interface CrossRegionCopyRetainRule {
  Interval?: number;
  IntervalUnit?: RetentionIntervalUnitValues;
}
export interface CrossRegionCopyDeprecateRule {
  Interval?: number;
  IntervalUnit?: RetentionIntervalUnitValues;
}
export interface CrossRegionCopyRule {
  TargetRegion?: string;
  Target?: string;
  Encrypted?: boolean;
  CmkArn?: string;
  CopyTags?: boolean;
  RetainRule?: CrossRegionCopyRetainRule;
  DeprecateRule?: CrossRegionCopyDeprecateRule;
}
export type CrossRegionCopyRules = CrossRegionCopyRule[];
export type AwsAccountId = string;
export type ShareTargetAccountList = string[];
export interface ShareRule {
  TargetAccounts?: string[];
  UnshareInterval?: number;
  UnshareIntervalUnit?: RetentionIntervalUnitValues;
}
export type ShareRules = ShareRule[];
export interface DeprecateRule {
  Count?: number;
  Interval?: number;
  IntervalUnit?: RetentionIntervalUnitValues;
}
export interface RetentionArchiveTier {
  Count?: number;
  Interval?: number;
  IntervalUnit?: RetentionIntervalUnitValues;
}
export interface ArchiveRetainRule {
  RetentionArchiveTier?: RetentionArchiveTier;
}
export interface ArchiveRule {
  RetainRule?: ArchiveRetainRule;
}
export interface Schedule {
  Name?: string;
  CopyTags?: boolean;
  TagsToAdd?: Tag[];
  VariableTags?: Tag[];
  CreateRule?: CreateRule;
  RetainRule?: RetainRule;
  FastRestoreRule?: FastRestoreRule;
  CrossRegionCopyRules?: CrossRegionCopyRule[];
  ShareRules?: ShareRule[];
  DeprecateRule?: DeprecateRule;
  ArchiveRule?: ArchiveRule;
}
export type ScheduleList = Schedule[];
export type ExcludeBootVolume = boolean;
export type NoReboot = boolean;
export type ExcludeDataVolumeTagList = Tag[];
export interface Parameters {
  ExcludeBootVolume?: boolean;
  NoReboot?: boolean;
  ExcludeDataVolumeTags?: Tag[];
}
export type EventSourceValues = "MANAGED_CWE" | (string & {});
export type EventTypeValues = "shareSnapshot" | (string & {});
export type SnapshotOwnerList = string[];
export type DescriptionRegex = string;
export interface EventParameters {
  EventType?: EventTypeValues;
  SnapshotOwner?: string[];
  DescriptionRegex?: string;
}
export interface EventSource {
  Type?: EventSourceValues;
  Parameters?: EventParameters;
}
export type ActionName = string;
export interface EncryptionConfiguration {
  Encrypted?: boolean;
  CmkArn?: string;
}
export interface CrossRegionCopyAction {
  Target?: string;
  EncryptionConfiguration?: EncryptionConfiguration;
  RetainRule?: CrossRegionCopyRetainRule;
}
export type CrossRegionCopyActionList = CrossRegionCopyAction[];
export interface Action {
  Name?: string;
  CrossRegionCopy?: CrossRegionCopyAction[];
}
export type ActionList = Action[];
export type PolicyLanguageValues = "SIMPLIFIED" | "STANDARD" | (string & {});
export type CreateInterval = number;
export type RetainInterval = number;
export interface CrossRegionCopyTarget {
  TargetRegion?: string;
}
export type CrossRegionCopyTargetList = CrossRegionCopyTarget[];
export type ExtendDeletion = boolean;
export type ExcludeBootVolumes = boolean;
export type VolumeTypeValues = string;
export type ExcludeVolumeTypesList = string[];
export type ExcludeTagsList = Tag[];
export interface Exclusions {
  ExcludeBootVolumes?: boolean;
  ExcludeVolumeTypes?: string[];
  ExcludeTags?: Tag[];
}
export interface PolicyDetails {
  PolicyType?: PolicyTypeValues;
  ResourceTypes?: ResourceTypeValues[];
  ResourceLocations?: ResourceLocationValues[];
  TargetTags?: Tag[];
  Schedules?: Schedule[];
  Parameters?: Parameters;
  EventSource?: EventSource;
  Actions?: Action[];
  PolicyLanguage?: PolicyLanguageValues;
  ResourceType?: ResourceTypeValues;
  CreateInterval?: number;
  RetainInterval?: number;
  CopyTags?: boolean;
  CrossRegionCopyTargets?: CrossRegionCopyTarget[];
  ExtendDeletion?: boolean;
  Exclusions?: Exclusions;
}
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type DefaultPolicyTypeValues = "VOLUME" | "INSTANCE" | (string & {});
export interface CreateLifecyclePolicyRequest {
  ExecutionRoleArn?: string;
  Description?: string;
  State?: SettablePolicyStateValues;
  PolicyDetails?: PolicyDetails;
  Tags?: { [key: string]: string | undefined };
  DefaultPolicy?: DefaultPolicyTypeValues;
  CreateInterval?: number;
  RetainInterval?: number;
  CopyTags?: boolean;
  ExtendDeletion?: boolean;
  CrossRegionCopyTargets?: CrossRegionCopyTarget[];
  Exclusions?: Exclusions;
}
export type PolicyId = string;
export interface CreateLifecyclePolicyResponse {
  PolicyId?: string;
}
export interface DeleteLifecyclePolicyRequest {
  PolicyId: string;
}
export interface DeleteLifecyclePolicyResponse {}
export type PolicyIdList = string[];
export type GettablePolicyStateValues =
  | "ENABLED"
  | "DISABLED"
  | "ERROR"
  | (string & {});
export type TagFilter = string;
export type TargetTagsFilterList = string[];
export type TagsToAddFilterList = string[];
export type DefaultPoliciesTypeValues =
  | "VOLUME"
  | "INSTANCE"
  | "ALL"
  | (string & {});
export interface GetLifecyclePoliciesRequest {
  PolicyIds?: string[];
  State?: GettablePolicyStateValues;
  ResourceTypes?: ResourceTypeValues[];
  TargetTags?: string[];
  TagsToAdd?: string[];
  DefaultPolicyType?: DefaultPoliciesTypeValues;
}
export type DefaultPolicy = boolean;
export interface LifecyclePolicySummary {
  PolicyId?: string;
  Description?: string;
  State?: GettablePolicyStateValues;
  Tags?: { [key: string]: string | undefined };
  PolicyType?: PolicyTypeValues;
  DefaultPolicy?: boolean;
}
export type LifecyclePolicySummaryList = LifecyclePolicySummary[];
export interface GetLifecyclePoliciesResponse {
  Policies?: LifecyclePolicySummary[];
}
export interface GetLifecyclePolicyRequest {
  PolicyId: string;
}
export type StatusMessage = string;
export type PolicyArn = string;
export interface LifecyclePolicy {
  PolicyId?: string;
  Description?: string;
  State?: GettablePolicyStateValues;
  StatusMessage?: string;
  ExecutionRoleArn?: string;
  DateCreated?: Date;
  DateModified?: Date;
  PolicyDetails?: PolicyDetails;
  Tags?: { [key: string]: string | undefined };
  PolicyArn?: string;
  DefaultPolicy?: boolean;
}
export interface GetLifecyclePolicyResponse {
  Policy?: LifecyclePolicy & {
    PolicyDetails: PolicyDetails & {
      TargetTags: (Tag & { Key: string; Value: string })[];
      Schedules: (Schedule & {
        TagsToAdd: (Tag & { Key: string; Value: string })[];
        VariableTags: (Tag & { Key: string; Value: string })[];
        CreateRule: CreateRule & {
          Scripts: (Script & { ExecutionHandler: ExecutionHandler })[];
        };
        CrossRegionCopyRules: (CrossRegionCopyRule & {
          Encrypted: Encrypted;
        })[];
        ShareRules: (ShareRule & { TargetAccounts: ShareTargetAccountList })[];
        ArchiveRule: ArchiveRule & {
          RetainRule: ArchiveRetainRule & {
            RetentionArchiveTier: RetentionArchiveTier;
          };
        };
      })[];
      Parameters: Parameters & {
        ExcludeDataVolumeTags: (Tag & { Key: string; Value: string })[];
      };
      EventSource: EventSource & {
        Type: EventSourceValues;
        Parameters: EventParameters & {
          EventType: EventTypeValues;
          SnapshotOwner: SnapshotOwnerList;
          DescriptionRegex: DescriptionRegex;
        };
      };
      Actions: (Action & {
        Name: ActionName;
        CrossRegionCopy: (CrossRegionCopyAction & {
          Target: Target;
          EncryptionConfiguration: EncryptionConfiguration & {
            Encrypted: Encrypted;
          };
        })[];
      })[];
      Exclusions: Exclusions & {
        ExcludeTags: (Tag & { Key: string; Value: string })[];
      };
    };
  };
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags?: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys?: string[];
}
export interface UntagResourceResponse {}
export interface UpdateLifecyclePolicyRequest {
  PolicyId: string;
  ExecutionRoleArn?: string;
  State?: SettablePolicyStateValues;
  Description?: string;
  PolicyDetails?: PolicyDetails;
  CreateInterval?: number;
  RetainInterval?: number;
  CopyTags?: boolean;
  ExtendDeletion?: boolean;
  CrossRegionCopyTargets?: CrossRegionCopyTarget[];
  Exclusions?: Exclusions;
}
export interface UpdateLifecyclePolicyResponse {}
export type ErrorMessage = string;
export type ErrorCode = string;
export type Parameter = string;
export type ParameterList = string[];
export type CreateLifecyclePolicyError =
  | InternalServerException
  | InvalidRequestException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates an Amazon Data Lifecycle Manager lifecycle policy. Amazon Data Lifecycle Manager supports the following policy types:
 *
 * - Custom EBS snapshot policy
 *
 * - Custom EBS-backed AMI policy
 *
 * - Cross-account copy event policy
 *
 * - Default policy for EBS snapshots
 *
 * - Default policy for EBS-backed AMIs
 *
 * For more information, see
 * Default policies vs custom policies.
 *
 * If you create a default policy, you can specify the request parameters either in
 * the request body, or in the PolicyDetails request structure, but not both.
 */
export const createLifecyclePolicy: API.OperationMethod<
  CreateLifecyclePolicyRequest,
  CreateLifecyclePolicyResponse,
  CreateLifecyclePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /policies",
    input: {
      ExecutionRoleArn: 0,
      Description: 0,
      State: 0,
      PolicyDetails: i_PolicyDetails,
      Tags: 0,
      DefaultPolicy: 0,
      CreateInterval: 0,
      RetainInterval: 0,
      CopyTags: 0,
      ExtendDeletion: 0,
      CrossRegionCopyTargets: D.list(i_CrossRegionCopyTarget),
      Exclusions: i_Exclusions,
    },
    body: true,
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLifecyclePolicy",
})) as any;

export type DeleteLifecyclePolicyError =
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified lifecycle policy and halts the automated operations that the
 * policy specified.
 *
 * For more information about deleting a policy, see Delete lifecycle
 * policies.
 */
export const deleteLifecyclePolicy: API.OperationMethod<
  DeleteLifecyclePolicyRequest,
  DeleteLifecyclePolicyResponse,
  DeleteLifecyclePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /policies/{PolicyId}",
    input: { PolicyId: 0 },
  },
  errors: [
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLifecyclePolicy",
})) as any;

export type GetLifecyclePoliciesError =
  | InternalServerException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets summary information about all or the specified data lifecycle policies.
 *
 * To get complete information about a policy, use GetLifecyclePolicy.
 */
export const getLifecyclePolicies: API.OperationMethod<
  GetLifecyclePoliciesRequest,
  GetLifecyclePoliciesResponse,
  GetLifecyclePoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /policies",
    input: {
      PolicyIds: D.m({ query: "policyIds" }),
      State: D.m({ query: "state" }),
      ResourceTypes: D.m({ query: "resourceTypes" }),
      TargetTags: D.m({ query: "targetTags" }),
      TagsToAdd: D.m({ query: "tagsToAdd" }),
      DefaultPolicyType: D.m({ query: "defaultPolicyType" }),
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLifecyclePolicies",
})) as any;

export type GetLifecyclePolicyError =
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets detailed information about the specified lifecycle policy.
 */
export const getLifecyclePolicy: API.OperationMethod<
  GetLifecyclePolicyRequest,
  GetLifecyclePolicyResponse,
  GetLifecyclePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /policies/{PolicyId}",
    input: { PolicyId: 0 },
    output: { Policy: { DateCreated: D.ts, DateModified: D.ts } },
  },
  errors: [
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLifecyclePolicy",
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the tags for the specified resource.
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
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type TagResourceError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds the specified tags to the specified resource.
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
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes the specified tags from the specified resource.
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
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateLifecyclePolicyError =
  | InternalServerException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the specified lifecycle policy.
 *
 * For more information about updating a policy, see Modify lifecycle
 * policies.
 */
export const updateLifecyclePolicy: API.OperationMethod<
  UpdateLifecyclePolicyRequest,
  UpdateLifecyclePolicyResponse,
  UpdateLifecyclePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /policies/{PolicyId}",
    input: {
      PolicyId: 0,
      ExecutionRoleArn: 0,
      State: 0,
      Description: 0,
      PolicyDetails: i_PolicyDetails,
      CreateInterval: 0,
      RetainInterval: 0,
      CopyTags: 0,
      ExtendDeletion: 0,
      CrossRegionCopyTargets: D.list(i_CrossRegionCopyTarget),
      Exclusions: i_Exclusions,
    },
    body: true,
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLifecyclePolicy",
})) as any;

const i_CrossRegionCopyTarget: D.LazyStruct = () => ({ TargetRegion: 0 });
const i_Exclusions: D.LazyStruct = () => ({
  ExcludeBootVolumes: 0,
  ExcludeVolumeTypes: 0,
  ExcludeTags: D.list(i_Tag),
});
const i_PolicyDetails: D.LazyStruct = () => ({
  PolicyType: 0,
  ResourceTypes: 0,
  ResourceLocations: 0,
  TargetTags: D.list(i_Tag),
  Schedules: D.list({
    Name: 0,
    CopyTags: 0,
    TagsToAdd: D.list(i_Tag),
    VariableTags: D.list(i_Tag),
    CreateRule: {
      Location: 0,
      Interval: 0,
      IntervalUnit: 0,
      Times: 0,
      CronExpression: 0,
      Scripts: D.list({
        Stages: 0,
        ExecutionHandlerService: 0,
        ExecutionHandler: 0,
        ExecuteOperationOnScriptFailure: 0,
        ExecutionTimeout: 0,
        MaximumRetryCount: 0,
      }),
    },
    RetainRule: { Count: 0, Interval: 0, IntervalUnit: 0 },
    FastRestoreRule: {
      Count: 0,
      Interval: 0,
      IntervalUnit: 0,
      AvailabilityZones: 0,
      AvailabilityZoneIds: 0,
    },
    CrossRegionCopyRules: D.list({
      TargetRegion: 0,
      Target: 0,
      Encrypted: 0,
      CmkArn: 0,
      CopyTags: 0,
      RetainRule: i_CrossRegionCopyRetainRule,
      DeprecateRule: { Interval: 0, IntervalUnit: 0 },
    }),
    ShareRules: D.list({
      TargetAccounts: 0,
      UnshareInterval: 0,
      UnshareIntervalUnit: 0,
    }),
    DeprecateRule: { Count: 0, Interval: 0, IntervalUnit: 0 },
    ArchiveRule: {
      RetainRule: {
        RetentionArchiveTier: { Count: 0, Interval: 0, IntervalUnit: 0 },
      },
    },
  }),
  Parameters: {
    ExcludeBootVolume: 0,
    NoReboot: 0,
    ExcludeDataVolumeTags: D.list(i_Tag),
  },
  EventSource: {
    Type: 0,
    Parameters: { EventType: 0, SnapshotOwner: 0, DescriptionRegex: 0 },
  },
  Actions: D.list({
    Name: 0,
    CrossRegionCopy: D.list({
      Target: 0,
      EncryptionConfiguration: { Encrypted: 0, CmkArn: 0 },
      RetainRule: i_CrossRegionCopyRetainRule,
    }),
  }),
  PolicyLanguage: 0,
  ResourceType: 0,
  CreateInterval: 0,
  RetainInterval: 0,
  CopyTags: 0,
  CrossRegionCopyTargets: D.list(i_CrossRegionCopyTarget),
  ExtendDeletion: 0,
  Exclusions: i_Exclusions,
});
const i_CrossRegionCopyRetainRule: D.LazyStruct = () => ({
  Interval: 0,
  IntervalUnit: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
