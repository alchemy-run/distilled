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
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "DLM", serviceShapeName: "dlm_20180112" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "dlm" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-01-12");
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
            return e(`https://dlm-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://dlm.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://dlm.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://dlm.{R}.{D}","properties":{},"headers":{}}');

export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Code: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Code: /*@__PURE__*/ S.optional(S.String),
      RequiredParameters: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(0, __c0, 0)).annotate({ identifier: "ParameterList" }),
      ),
      MutuallyExclusiveParameters: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(0, __c0, 0)).annotate({ identifier: "ParameterList" }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Code: /*@__PURE__*/ S.optional(S.String),
      ResourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Code: /*@__PURE__*/ S.optional(S.String),
      ResourceType: /*@__PURE__*/ S.optional(S.String),
      ResourceIds: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(0, __c0, 0)).annotate({ identifier: "PolicyIdList" }),
      ),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
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
export type ResourceLocationValues = "CLOUD" | "OUTPOST" | "LOCAL_ZONE" | (string & {});
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
export type LocationValues = "CLOUD" | "OUTPOST_LOCAL" | "LOCAL_ZONE" | (string & {});
export type Interval = number;
export type IntervalUnitValues = "HOURS" | (string & {});
export type TimesList = string[];
export type CronExpression = string;
export type StageValues = "PRE" | "POST" | (string & {});
export type StagesList = StageValues[];
export type ExecutionHandlerServiceValues = "AWS_SYSTEMS_MANAGER" | (string & {});
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
export type RetentionIntervalUnitValues = "DAYS" | "WEEKS" | "MONTHS" | "YEARS" | (string & {});
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
export type GettablePolicyStateValues = "ENABLED" | "DISABLED" | "ERROR" | (string & {});
export type TagFilter = string;
export type TargetTagsFilterList = string[];
export type TagsToAddFilterList = string[];
export type DefaultPoliciesTypeValues = "VOLUME" | "INSTANCE" | "ALL" | (string & {});
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
        CreateRule: CreateRule & { Scripts: (Script & { ExecutionHandler: ExecutionHandler })[] };
        CrossRegionCopyRules: (CrossRegionCopyRule & { Encrypted: Encrypted })[];
        ShareRules: (ShareRule & { TargetAccounts: ShareTargetAccountList })[];
        ArchiveRule: ArchiveRule & {
          RetainRule: ArchiveRetainRule & { RetentionArchiveTier: RetentionArchiveTier };
        };
      })[];
      Parameters: Parameters & { ExcludeDataVolumeTags: (Tag & { Key: string; Value: string })[] };
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
          EncryptionConfiguration: EncryptionConfiguration & { Encrypted: Encrypted };
        })[];
      })[];
      Exclusions: Exclusions & { ExcludeTags: (Tag & { Key: string; Value: string })[] };
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
  input: __S(96, __c3, 0) as any as S.Schema<CreateLifecyclePolicyRequest>,
  output: __S(97, __c3, 1) as any as S.Schema<CreateLifecyclePolicyResponse>,
  errors: [InternalServerException, InvalidRequestException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLifecyclePolicy",
}));

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
  input: __S(224, __c7, 0) as any as S.Schema<DeleteLifecyclePolicyRequest>,
  output: __S(256, __c8, 0) as any as S.Schema<DeleteLifecyclePolicyResponse>,
  errors: [InternalServerException, LimitExceededException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLifecyclePolicy",
}));

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
  input: __S(288, __c9, 0) as any as S.Schema<GetLifecyclePoliciesRequest>,
  output: __S(291, __c9, 3) as any as S.Schema<GetLifecyclePoliciesResponse>,
  errors: [
    InternalServerException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLifecyclePolicies",
}));

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
  input: __S(320, __c10, 0) as any as S.Schema<GetLifecyclePolicyRequest>,
  output: __S(322, __c10, 2) as any as S.Schema<GetLifecyclePolicyResponse>,
  errors: [InternalServerException, LimitExceededException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLifecyclePolicy",
}));

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
  input: __S(352, __c11, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(353, __c11, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [InternalServerException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(384, __c12, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(256, __c8, 0) as any as S.Schema<TagResourceResponse>,
  errors: [InternalServerException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

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
  input: __S(32, __c1, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(256, __c8, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [InternalServerException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(64, __c2, 0) as any as S.Schema<UpdateLifecyclePolicyRequest>,
  output: __S(256, __c8, 0) as any as S.Schema<UpdateLifecyclePolicyResponse>,
  errors: [
    InternalServerException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLifecyclePolicy",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: S.optional(__S(0, __c0, 0)).pipe(T.HttpQuery("tagKeys")),
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
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PolicyId: S.String.pipe(T.HttpLabel("PolicyId")),
          ExecutionRoleArn: S.optional(S.String),
          State: S.optional(S.String),
          Description: S.optional(S.String),
          PolicyDetails: S.optional(__S(219, __c6, 27)),
          CreateInterval: S.optional(S.Number),
          RetainInterval: S.optional(S.Number),
          CopyTags: S.optional(S.Boolean),
          ExtendDeletion: S.optional(S.Boolean),
          CrossRegionCopyTargets: S.optional(__S(217, __c6, 25)),
          Exclusions: S.optional(__S(218, __c6, 26)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/policies/{PolicyId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateLifecyclePolicyRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ExecutionRoleArn: S.optional(S.String),
          Description: S.optional(S.String),
          State: S.optional(S.String),
          PolicyDetails: S.optional(__S(219, __c6, 27)),
          Tags: S.optional(__S(160, __c5, 0)),
          DefaultPolicy: S.optional(S.String),
          CreateInterval: S.optional(S.Number),
          RetainInterval: S.optional(S.Number),
          CopyTags: S.optional(S.Boolean),
          ExtendDeletion: S.optional(S.Boolean),
          CrossRegionCopyTargets: S.optional(__S(217, __c6, 25)),
          Exclusions: S.optional(__S(218, __c6, 26)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/policies" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateLifecyclePolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ PolicyId: S.optional(S.String) })).annotate({
        identifier: "CreateLifecyclePolicyResponse",
      });
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
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "Tag" });
    case 1:
      return S.Array(__S(192, __c6, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Stages: S.optional(__S(128, __c4, 0)),
          ExecutionHandlerService: S.optional(S.String),
          ExecutionHandler: S.optional(S.String),
          ExecuteOperationOnScriptFailure: S.optional(S.Boolean),
          ExecutionTimeout: S.optional(S.Number),
          MaximumRetryCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Script" });
    case 3:
      return S.Array(__S(194, __c6, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Location: S.optional(S.String),
          Interval: S.optional(S.Number),
          IntervalUnit: S.optional(S.String),
          Times: S.optional(__S(0, __c0, 0)),
          CronExpression: S.optional(S.String),
          Scripts: S.optional(__S(195, __c6, 3)),
        }),
      ).annotate({ identifier: "CreateRule" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Count: S.optional(S.Number),
          Interval: S.optional(S.Number),
          IntervalUnit: S.optional(S.String),
        }),
      ).annotate({ identifier: "RetainRule" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Count: S.optional(S.Number),
          Interval: S.optional(S.Number),
          IntervalUnit: S.optional(S.String),
          AvailabilityZones: S.optional(__S(0, __c0, 0)),
          AvailabilityZoneIds: S.optional(__S(0, __c0, 0)),
        }),
      ).annotate({ identifier: "FastRestoreRule" });
    case 7:
      return S.suspend(() =>
        S.Struct({ Interval: S.optional(S.Number), IntervalUnit: S.optional(S.String) }),
      ).annotate({ identifier: "CrossRegionCopyRetainRule" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          TargetRegion: S.optional(S.String),
          Target: S.optional(S.String),
          Encrypted: S.optional(S.Boolean),
          CmkArn: S.optional(S.String),
          CopyTags: S.optional(S.Boolean),
          RetainRule: S.optional(__S(199, __c6, 7)),
          DeprecateRule: S.optional(__S(199, __c6, 7)),
        }),
      ).annotate({ identifier: "CrossRegionCopyRule" });
    case 9:
      return S.Array(__S(200, __c6, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          TargetAccounts: S.optional(__S(0, __c0, 0)),
          UnshareInterval: S.optional(S.Number),
          UnshareIntervalUnit: S.optional(S.String),
        }),
      ).annotate({ identifier: "ShareRule" });
    case 11:
      return S.Array(__S(202, __c6, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({ RetentionArchiveTier: S.optional(__S(197, __c6, 5)) }),
      ).annotate({ identifier: "ArchiveRetainRule" });
    case 13:
      return S.suspend(() => S.Struct({ RetainRule: S.optional(__S(204, __c6, 12)) })).annotate({
        identifier: "ArchiveRule",
      });
    case 14:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          CopyTags: S.optional(S.Boolean),
          TagsToAdd: S.optional(__S(193, __c6, 1)),
          VariableTags: S.optional(__S(193, __c6, 1)),
          CreateRule: S.optional(__S(196, __c6, 4)),
          RetainRule: S.optional(__S(197, __c6, 5)),
          FastRestoreRule: S.optional(__S(198, __c6, 6)),
          CrossRegionCopyRules: S.optional(__S(201, __c6, 9)),
          ShareRules: S.optional(__S(203, __c6, 11)),
          DeprecateRule: S.optional(__S(197, __c6, 5)),
          ArchiveRule: S.optional(__S(205, __c6, 13)),
        }),
      ).annotate({ identifier: "Schedule" });
    case 15:
      return S.Array(__S(206, __c6, 14));
    case 16:
      return S.suspend(() =>
        S.Struct({
          ExcludeBootVolume: S.optional(S.Boolean),
          NoReboot: S.optional(S.Boolean),
          ExcludeDataVolumeTags: S.optional(__S(193, __c6, 1)),
        }),
      ).annotate({ identifier: "Parameters" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          EventType: S.optional(S.String),
          SnapshotOwner: S.optional(__S(0, __c0, 0)),
          DescriptionRegex: S.optional(S.String),
        }),
      ).annotate({ identifier: "EventParameters" });
    case 18:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String), Parameters: S.optional(__S(209, __c6, 17)) }),
      ).annotate({ identifier: "EventSource" });
    case 19:
      return S.suspend(() =>
        S.Struct({ Encrypted: S.optional(S.Boolean), CmkArn: S.optional(S.String) }),
      ).annotate({ identifier: "EncryptionConfiguration" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          Target: S.optional(S.String),
          EncryptionConfiguration: S.optional(__S(211, __c6, 19)),
          RetainRule: S.optional(__S(199, __c6, 7)),
        }),
      ).annotate({ identifier: "CrossRegionCopyAction" });
    case 21:
      return S.Array(__S(212, __c6, 20));
    case 22:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), CrossRegionCopy: S.optional(__S(213, __c6, 21)) }),
      ).annotate({ identifier: "Action" });
    case 23:
      return S.Array(__S(214, __c6, 22));
    case 24:
      return S.suspend(() => S.Struct({ TargetRegion: S.optional(S.String) })).annotate({
        identifier: "CrossRegionCopyTarget",
      });
    case 25:
      return S.Array(__S(216, __c6, 24));
    case 26:
      return S.suspend(() =>
        S.Struct({
          ExcludeBootVolumes: S.optional(S.Boolean),
          ExcludeVolumeTypes: S.optional(__S(0, __c0, 0)),
          ExcludeTags: S.optional(__S(193, __c6, 1)),
        }),
      ).annotate({ identifier: "Exclusions" });
    case 27:
      return S.suspend(() =>
        S.Struct({
          PolicyType: S.optional(S.String),
          ResourceTypes: S.optional(__S(128, __c4, 0)),
          ResourceLocations: S.optional(__S(128, __c4, 0)),
          TargetTags: S.optional(__S(193, __c6, 1)),
          Schedules: S.optional(__S(207, __c6, 15)),
          Parameters: S.optional(__S(208, __c6, 16)),
          EventSource: S.optional(__S(210, __c6, 18)),
          Actions: S.optional(__S(215, __c6, 23)),
          PolicyLanguage: S.optional(S.String),
          ResourceType: S.optional(S.String),
          CreateInterval: S.optional(S.Number),
          RetainInterval: S.optional(S.Number),
          CopyTags: S.optional(S.Boolean),
          CrossRegionCopyTargets: S.optional(__S(217, __c6, 25)),
          ExtendDeletion: S.optional(S.Boolean),
          Exclusions: S.optional(__S(218, __c6, 26)),
        }),
      ).annotate({ identifier: "PolicyDetails" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PolicyId: S.String.pipe(T.HttpLabel("PolicyId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/policies/{PolicyId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteLifecyclePolicyRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "DeleteLifecyclePolicyResponse",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PolicyIds: S.optional(__S(0, __c0, 0)).pipe(T.HttpQuery("policyIds")),
          State: S.optional(S.String).pipe(T.HttpQuery("state")),
          ResourceTypes: S.optional(__S(128, __c4, 0)).pipe(T.HttpQuery("resourceTypes")),
          TargetTags: S.optional(__S(0, __c0, 0)).pipe(T.HttpQuery("targetTags")),
          TagsToAdd: S.optional(__S(0, __c0, 0)).pipe(T.HttpQuery("tagsToAdd")),
          DefaultPolicyType: S.optional(S.String).pipe(T.HttpQuery("defaultPolicyType")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/policies" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetLifecyclePoliciesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PolicyId: S.optional(S.String),
          Description: S.optional(S.String),
          State: S.optional(S.String),
          Tags: S.optional(__S(160, __c5, 0)),
          PolicyType: S.optional(S.String),
          DefaultPolicy: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "LifecyclePolicySummary" });
    case 2:
      return S.Array(__S(289, __c9, 1));
    case 3:
      return S.suspend(() => S.Struct({ Policies: S.optional(__S(290, __c9, 2)) })).annotate({
        identifier: "GetLifecyclePoliciesResponse",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PolicyId: S.String.pipe(T.HttpLabel("PolicyId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/policies/{PolicyId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetLifecyclePolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PolicyId: S.optional(S.String),
          Description: S.optional(S.String),
          State: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          ExecutionRoleArn: S.optional(S.String),
          DateCreated: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          DateModified: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          PolicyDetails: S.optional(__S(219, __c6, 27)),
          Tags: S.optional(__S(160, __c5, 0)),
          PolicyArn: S.optional(S.String),
          DefaultPolicy: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "LifecyclePolicy" });
    case 2:
      return S.suspend(() => S.Struct({ Policy: S.optional(__S(321, __c10, 1)) })).annotate({
        identifier: "GetLifecyclePolicyResponse",
      });
  }
}
function __c11(j: number): any {
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
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(160, __c5, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Tags: S.optional(__S(160, __c5, 0)),
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
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
