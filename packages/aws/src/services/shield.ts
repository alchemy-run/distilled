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
const ns = /*@__PURE__*/ T.XmlNamespace("http://ddp.amazonaws.com/doc/2016-06-02/");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Shield",
  serviceShapeName: "AWSShield_20160616",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "shield" });
const ver = /*@__PURE__*/ T.ServiceVersion("2016-06-02");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
    const { Region, UseDualStack = false, UseFIPS = false, Endpoint } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    const _p0 = () => ({
      authSchemes: [{ name: "sigv4", signingName: "shield", signingRegion: "us-east-1" }],
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
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e("https://shield.us-east-1.amazonaws.com", _p0(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e("https://shield-fips.us-east-1.amazonaws.com", _p0(), {});
          }
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://shield-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(`https://shield-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
            }
            return err("FIPS is enabled but this partition does not support FIPS");
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://shield.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err("DualStack is enabled but this partition does not support DualStack");
          }
          return e(`https://shield.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://shield.us-east-1.{D}","properties":{"authSchemes":[{"name":"sigv4","signingName":"shield","signingRegion":"us-east-1"}]},"headers":{}}',
  [
    "us-gov-west-1",
    "us-gov-east-1",
    "aws-us-gov-global",
    "cn-north-1",
    "cn-northwest-1",
    "aws-cn-global",
    "us-iso-east-1",
    "us-iso-west-1",
    "aws-iso-global",
    "us-isob-east-1",
    "aws-iso-b-global",
    "aws-iso-f-global",
    "us-isof-east-1",
    "us-isof-south-1",
    "eusc-de-east-1",
  ],
);

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()("AccessDeniedException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withAuthError) {}
export class AccessDeniedForDependencyException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedForDependencyException>()(
    "AccessDeniedForDependencyException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withAuthError) {}
export class InternalErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalErrorException>()("InternalErrorException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withServerError) {}
export class InvalidOperationException
  extends /*@__PURE__*/ S.TaggedError<InvalidOperationException>()("InvalidOperationException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidPaginationTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidPaginationTokenException>()(
    "InvalidPaginationTokenException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()("InvalidParameterException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    reason: /*@__PURE__*/ S.optional(
      /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ValidationExceptionReason" }),
    ),
    fields: /*@__PURE__*/ S.optional(
      /*@__PURE__*/ S.suspend(() => __S(721, __c45, 1)).annotate({
        identifier: "ValidationExceptionFieldList",
      }),
    ),
  }) {}
export class InvalidResourceException
  extends /*@__PURE__*/ S.TaggedError<InvalidResourceException>()("InvalidResourceException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class LimitsExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitsExceededException>()("LimitsExceededException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    Type: /*@__PURE__*/ S.optional(S.String),
    Limit: /*@__PURE__*/ S.optional(S.Number),
  }) {}
export class LockedSubscriptionException
  extends /*@__PURE__*/ S.TaggedError<LockedSubscriptionException>()(
    "LockedSubscriptionException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class NoAssociatedRoleException
  extends /*@__PURE__*/ S.TaggedError<NoAssociatedRoleException>()("NoAssociatedRoleException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class OptimisticLockException
  extends /*@__PURE__*/ S.TaggedError<OptimisticLockException>()("OptimisticLockException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ResourceAlreadyExistsException>()(
    "ResourceAlreadyExistsException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceType: /*@__PURE__*/ S.optional(S.String),
    },
  ).pipe(C.withAlreadyExistsError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()("ResourceNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    resourceType: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class SubscriptionNotFound
  extends /*@__PURE__*/ S.TaggedError<SubscriptionNotFound>()(
    "SubscriptionNotFound",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.SyntheticError({
      from: "ResourceNotFoundException",
      message: "The subscription does not exist.",
    }),
  ).pipe(C.withNotFoundError) {}
export type LogBucket = string;
export interface AssociateDRTLogBucketRequest {
  LogBucket: string;
}
export interface AssociateDRTLogBucketResponse {}
export type RoleArn = string;
export interface AssociateDRTRoleRequest {
  RoleArn: string;
}
export interface AssociateDRTRoleResponse {}
export type ProtectionId = string;
export type HealthCheckArn = string;
export interface AssociateHealthCheckRequest {
  ProtectionId: string;
  HealthCheckArn: string;
}
export interface AssociateHealthCheckResponse {}
export type EmailAddress = string;
export type PhoneNumber = string;
export type ContactNotes = string;
export interface EmergencyContact {
  EmailAddress: string;
  PhoneNumber?: string;
  ContactNotes?: string;
}
export type EmergencyContactList = EmergencyContact[];
export interface AssociateProactiveEngagementDetailsRequest {
  EmergencyContactList: EmergencyContact[];
}
export interface AssociateProactiveEngagementDetailsResponse {}
export type ProtectionName = string;
export type ResourceArn = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export type TagList = Tag[];
export interface CreateProtectionRequest {
  Name: string;
  ResourceArn: string;
  Tags?: Tag[];
}
export interface CreateProtectionResponse {
  ProtectionId?: string;
}
export type ProtectionGroupId = string;
export type ProtectionGroupAggregation = "SUM" | "MEAN" | "MAX" | (string & {});
export type ProtectionGroupPattern = "ALL" | "ARBITRARY" | "BY_RESOURCE_TYPE" | (string & {});
export type ProtectedResourceType =
  | "CLOUDFRONT_DISTRIBUTION"
  | "ROUTE_53_HOSTED_ZONE"
  | "ELASTIC_IP_ALLOCATION"
  | "CLASSIC_LOAD_BALANCER"
  | "APPLICATION_LOAD_BALANCER"
  | "GLOBAL_ACCELERATOR"
  | (string & {});
export type ProtectionGroupMembers = string[];
export interface CreateProtectionGroupRequest {
  ProtectionGroupId: string;
  Aggregation: ProtectionGroupAggregation;
  Pattern: ProtectionGroupPattern;
  ResourceType?: ProtectedResourceType;
  Members?: string[];
  Tags?: Tag[];
}
export interface CreateProtectionGroupResponse {}
export interface CreateSubscriptionRequest {}
export interface CreateSubscriptionResponse {}
export interface DeleteProtectionRequest {
  ProtectionId: string;
}
export interface DeleteProtectionResponse {}
export interface DeleteProtectionGroupRequest {
  ProtectionGroupId: string;
}
export interface DeleteProtectionGroupResponse {}
export interface DeleteSubscriptionRequest {}
export interface DeleteSubscriptionResponse {}
export type AttackId = string;
export interface DescribeAttackRequest {
  AttackId: string;
}
export type SubResourceType = "IP" | "URL" | (string & {});
export interface SummarizedCounter {
  Name?: string;
  Max?: number;
  Average?: number;
  Sum?: number;
  N?: number;
  Unit?: string;
}
export type SummarizedCounterList = SummarizedCounter[];
export interface SummarizedAttackVector {
  VectorType: string;
  VectorCounters?: SummarizedCounter[];
}
export type SummarizedAttackVectorList = SummarizedAttackVector[];
export interface SubResourceSummary {
  Type?: SubResourceType;
  Id?: string;
  AttackVectors?: SummarizedAttackVector[];
  Counters?: SummarizedCounter[];
}
export type SubResourceSummaryList = SubResourceSummary[];
export type AttackTimestamp = Date;
export type AttackLayer = "NETWORK" | "APPLICATION" | (string & {});
export type AttackPropertyIdentifier =
  | "DESTINATION_URL"
  | "REFERRER"
  | "SOURCE_ASN"
  | "SOURCE_COUNTRY"
  | "SOURCE_IP_ADDRESS"
  | "SOURCE_USER_AGENT"
  | "WORDPRESS_PINGBACK_REFLECTOR"
  | "WORDPRESS_PINGBACK_SOURCE"
  | (string & {});
export interface Contributor {
  Name?: string;
  Value?: number;
}
export type TopContributors = Contributor[];
export type Unit = "BITS" | "BYTES" | "PACKETS" | "REQUESTS" | (string & {});
export interface AttackProperty {
  AttackLayer?: AttackLayer;
  AttackPropertyIdentifier?: AttackPropertyIdentifier;
  TopContributors?: Contributor[];
  Unit?: Unit;
  Total?: number;
}
export type AttackProperties = AttackProperty[];
export interface Mitigation {
  MitigationName?: string;
}
export type MitigationList = Mitigation[];
export interface AttackDetail {
  AttackId?: string;
  ResourceArn?: string;
  SubResources?: SubResourceSummary[];
  StartTime?: Date;
  EndTime?: Date;
  AttackCounters?: SummarizedCounter[];
  AttackProperties?: AttackProperty[];
  Mitigations?: Mitigation[];
}
export interface DescribeAttackResponse {
  Attack?: AttackDetail;
}
export interface DescribeAttackStatisticsRequest {}
export interface TimeRange {
  FromInclusive?: Date;
  ToExclusive?: Date;
}
export interface AttackVolumeStatistics {
  Max: number;
}
export interface AttackVolume {
  BitsPerSecond?: AttackVolumeStatistics;
  PacketsPerSecond?: AttackVolumeStatistics;
  RequestsPerSecond?: AttackVolumeStatistics;
}
export interface AttackStatisticsDataItem {
  AttackVolume?: AttackVolume;
  AttackCount: number;
}
export type AttackStatisticsDataList = AttackStatisticsDataItem[];
export interface DescribeAttackStatisticsResponse {
  TimeRange: TimeRange;
  DataItems: AttackStatisticsDataItem[];
}
export interface DescribeDRTAccessRequest {}
export type LogBucketList = string[];
export interface DescribeDRTAccessResponse {
  RoleArn?: string;
  LogBucketList?: string[];
}
export interface DescribeEmergencyContactSettingsRequest {}
export interface DescribeEmergencyContactSettingsResponse {
  EmergencyContactList?: EmergencyContact[];
}
export interface DescribeProtectionRequest {
  ProtectionId?: string;
  ResourceArn?: string;
}
export type HealthCheckId = string;
export type HealthCheckIds = string[];
export type ApplicationLayerAutomaticResponseStatus = "ENABLED" | "DISABLED" | (string & {});
export interface BlockAction {}
export interface CountAction {}
export interface ResponseAction {
  Block?: BlockAction;
  Count?: CountAction;
}
export interface ApplicationLayerAutomaticResponseConfiguration {
  Status: ApplicationLayerAutomaticResponseStatus;
  Action: ResponseAction;
}
export interface Protection {
  Id?: string;
  Name?: string;
  ResourceArn?: string;
  HealthCheckIds?: string[];
  ProtectionArn?: string;
  ApplicationLayerAutomaticResponseConfiguration?: ApplicationLayerAutomaticResponseConfiguration;
}
export interface DescribeProtectionResponse {
  Protection?: Protection;
}
export interface DescribeProtectionGroupRequest {
  ProtectionGroupId: string;
}
export interface ProtectionGroup {
  ProtectionGroupId: string;
  Aggregation: ProtectionGroupAggregation;
  Pattern: ProtectionGroupPattern;
  ResourceType?: ProtectedResourceType;
  Members: string[];
  ProtectionGroupArn?: string;
}
export interface DescribeProtectionGroupResponse {
  ProtectionGroup: ProtectionGroup;
}
export interface DescribeSubscriptionRequest {}
export type DurationInSeconds = number;
export type AutoRenew = "ENABLED" | "DISABLED" | (string & {});
export interface Limit {
  Type?: string;
  Max?: number;
}
export type Limits = Limit[];
export type ProactiveEngagementStatus = "ENABLED" | "DISABLED" | "PENDING" | (string & {});
export interface ProtectionLimits {
  ProtectedResourceTypeLimits: Limit[];
}
export interface ProtectionGroupArbitraryPatternLimits {
  MaxMembers: number;
}
export interface ProtectionGroupPatternTypeLimits {
  ArbitraryPatternLimits: ProtectionGroupArbitraryPatternLimits;
}
export interface ProtectionGroupLimits {
  MaxProtectionGroups: number;
  PatternTypeLimits: ProtectionGroupPatternTypeLimits;
}
export interface SubscriptionLimits {
  ProtectionLimits: ProtectionLimits;
  ProtectionGroupLimits: ProtectionGroupLimits;
}
export interface Subscription {
  StartTime?: Date;
  EndTime?: Date;
  TimeCommitmentInSeconds?: number;
  AutoRenew?: AutoRenew;
  Limits?: Limit[];
  ProactiveEngagementStatus?: ProactiveEngagementStatus;
  SubscriptionLimits: SubscriptionLimits;
  SubscriptionArn?: string;
}
export interface DescribeSubscriptionResponse {
  Subscription?: Subscription;
}
export interface DisableApplicationLayerAutomaticResponseRequest {
  ResourceArn: string;
}
export interface DisableApplicationLayerAutomaticResponseResponse {}
export interface DisableProactiveEngagementRequest {}
export interface DisableProactiveEngagementResponse {}
export interface DisassociateDRTLogBucketRequest {
  LogBucket: string;
}
export interface DisassociateDRTLogBucketResponse {}
export interface DisassociateDRTRoleRequest {}
export interface DisassociateDRTRoleResponse {}
export interface DisassociateHealthCheckRequest {
  ProtectionId: string;
  HealthCheckArn: string;
}
export interface DisassociateHealthCheckResponse {}
export interface EnableApplicationLayerAutomaticResponseRequest {
  ResourceArn: string;
  Action: ResponseAction;
}
export interface EnableApplicationLayerAutomaticResponseResponse {}
export interface EnableProactiveEngagementRequest {}
export interface EnableProactiveEngagementResponse {}
export interface GetSubscriptionStateRequest {}
export type SubscriptionState = "ACTIVE" | "INACTIVE" | (string & {});
export interface GetSubscriptionStateResponse {
  SubscriptionState: SubscriptionState;
}
export type ResourceArnFilterList = string[];
export type Token = string;
export type MaxResults = number;
export interface ListAttacksRequest {
  ResourceArns?: string[];
  StartTime?: TimeRange;
  EndTime?: TimeRange;
  NextToken?: string;
  MaxResults?: number;
}
export interface AttackVectorDescription {
  VectorType: string;
}
export type AttackVectorDescriptionList = AttackVectorDescription[];
export interface AttackSummary {
  AttackId?: string;
  ResourceArn?: string;
  StartTime?: Date;
  EndTime?: Date;
  AttackVectors?: AttackVectorDescription[];
}
export type AttackSummaries = AttackSummary[];
export interface ListAttacksResponse {
  AttackSummaries?: AttackSummary[];
  NextToken?: string;
}
export type ProtectionGroupIdFilters = string[];
export type ProtectionGroupPatternFilters = ProtectionGroupPattern[];
export type ProtectedResourceTypeFilters = ProtectedResourceType[];
export type ProtectionGroupAggregationFilters = ProtectionGroupAggregation[];
export interface InclusionProtectionGroupFilters {
  ProtectionGroupIds?: string[];
  Patterns?: ProtectionGroupPattern[];
  ResourceTypes?: ProtectedResourceType[];
  Aggregations?: ProtectionGroupAggregation[];
}
export interface ListProtectionGroupsRequest {
  NextToken?: string;
  MaxResults?: number;
  InclusionFilters?: InclusionProtectionGroupFilters;
}
export type ProtectionGroups = ProtectionGroup[];
export interface ListProtectionGroupsResponse {
  ProtectionGroups: ProtectionGroup[];
  NextToken?: string;
}
export type ResourceArnFilters = string[];
export type ProtectionNameFilters = string[];
export interface InclusionProtectionFilters {
  ResourceArns?: string[];
  ProtectionNames?: string[];
  ResourceTypes?: ProtectedResourceType[];
}
export interface ListProtectionsRequest {
  NextToken?: string;
  MaxResults?: number;
  InclusionFilters?: InclusionProtectionFilters;
}
export type Protections = Protection[];
export interface ListProtectionsResponse {
  Protections?: Protection[];
  NextToken?: string;
}
export interface ListResourcesInProtectionGroupRequest {
  ProtectionGroupId: string;
  NextToken?: string;
  MaxResults?: number;
}
export type ResourceArnList = string[];
export interface ListResourcesInProtectionGroupResponse {
  ResourceArns: string[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceARN: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateApplicationLayerAutomaticResponseRequest {
  ResourceArn: string;
  Action: ResponseAction;
}
export interface UpdateApplicationLayerAutomaticResponseResponse {}
export interface UpdateEmergencyContactSettingsRequest {
  EmergencyContactList?: EmergencyContact[];
}
export interface UpdateEmergencyContactSettingsResponse {}
export interface UpdateProtectionGroupRequest {
  ProtectionGroupId: string;
  Aggregation: ProtectionGroupAggregation;
  Pattern: ProtectionGroupPattern;
  ResourceType?: ProtectedResourceType;
  Members?: string[];
}
export interface UpdateProtectionGroupResponse {}
export interface UpdateSubscriptionRequest {
  AutoRenew?: AutoRenew;
}
export interface UpdateSubscriptionResponse {}
export type ErrorMessage = string;
export type ValidationExceptionReason = "FIELD_VALIDATION_FAILED" | "OTHER" | (string & {});
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type LimitType = string;
export type LimitNumber = number;
export type AssociateDRTLogBucketError =
  | AccessDeniedForDependencyException
  | InternalErrorException
  | InvalidOperationException
  | InvalidParameterException
  | LimitsExceededException
  | NoAssociatedRoleException
  | OptimisticLockException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Authorizes the Shield Response Team (SRT) to access the specified Amazon S3 bucket containing log data such as Application Load Balancer access logs, CloudFront logs, or logs from third party sources. You can associate up to 10 Amazon S3 buckets with your subscription.
 *
 * To use the services of the SRT and make an `AssociateDRTLogBucket` request, you must be subscribed to the Business Support plan or the Enterprise Support plan.
 */
export const associateDRTLogBucket: API.OperationMethod<
  AssociateDRTLogBucketRequest,
  AssociateDRTLogBucketResponse,
  AssociateDRTLogBucketError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<AssociateDRTLogBucketRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<AssociateDRTLogBucketResponse>,
  errors: [
    AccessDeniedForDependencyException,
    InternalErrorException,
    InvalidOperationException,
    InvalidParameterException,
    LimitsExceededException,
    NoAssociatedRoleException,
    OptimisticLockException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateDRTLogBucket",
}));

export type AssociateDRTRoleError =
  | AccessDeniedForDependencyException
  | InternalErrorException
  | InvalidOperationException
  | InvalidParameterException
  | OptimisticLockException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Authorizes the Shield Response Team (SRT) using the specified role, to access your Amazon Web Services account to assist with DDoS attack mitigation during potential attacks. This enables the SRT to inspect your WAF configuration and create or update WAF rules and web ACLs.
 *
 * You can associate only one `RoleArn` with your subscription. If you submit an `AssociateDRTRole` request for an account that already has an associated role, the new `RoleArn` will replace the existing `RoleArn`.
 *
 * Prior to making the `AssociateDRTRole` request, you must attach the `AWSShieldDRTAccessPolicy` managed policy to the role that you'll specify in the request. You can access this policy in the IAM console at AWSShieldDRTAccessPolicy. For more information see Adding and removing IAM identity permissions. The role must also trust the service principal
 * `drt.shield.amazonaws.com`. For more information, see IAM JSON policy elements: Principal.
 *
 * The SRT will have access only to your WAF and Shield resources. By submitting this request, you authorize the SRT to inspect your WAF and Shield configuration and create and update WAF rules and web ACLs on your behalf. The SRT takes these actions only if explicitly authorized by you.
 *
 * You must have the `iam:PassRole` permission to make an `AssociateDRTRole` request. For more information, see Granting a user permissions to pass a role to an Amazon Web Services service.
 *
 * To use the services of the SRT and make an `AssociateDRTRole` request, you must be subscribed to the Business Support plan or the Enterprise Support plan.
 */
export const associateDRTRole: API.OperationMethod<
  AssociateDRTRoleRequest,
  AssociateDRTRoleResponse,
  AssociateDRTRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c2, 0) as any as S.Schema<AssociateDRTRoleRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<AssociateDRTRoleResponse>,
  errors: [
    AccessDeniedForDependencyException,
    InternalErrorException,
    InvalidOperationException,
    InvalidParameterException,
    OptimisticLockException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateDRTRole",
}));

export type AssociateHealthCheckError =
  | InternalErrorException
  | InvalidParameterException
  | InvalidResourceException
  | LimitsExceededException
  | OptimisticLockException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds health-based detection to the Shield Advanced protection for a resource. Shield Advanced health-based detection uses the health of your Amazon Web Services resource to improve responsiveness and accuracy in attack detection and response.
 *
 * You define the health check in Route 53 and then associate it with your Shield Advanced protection. For more information, see Shield Advanced Health-Based Detection in the *WAF Developer Guide*.
 */
export const associateHealthCheck: API.OperationMethod<
  AssociateHealthCheckRequest,
  AssociateHealthCheckResponse,
  AssociateHealthCheckError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c3, 0) as any as S.Schema<AssociateHealthCheckRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<AssociateHealthCheckResponse>,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    InvalidResourceException,
    LimitsExceededException,
    OptimisticLockException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateHealthCheck",
}));

export type AssociateProactiveEngagementDetailsError =
  | InternalErrorException
  | InvalidOperationException
  | InvalidParameterException
  | OptimisticLockException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Initializes proactive engagement and sets the list of contacts for the Shield Response Team (SRT) to use. You must provide at least one phone number in the emergency contact list.
 *
 * After you have initialized proactive engagement using this call, to disable or enable proactive engagement, use the calls `DisableProactiveEngagement` and `EnableProactiveEngagement`.
 *
 * This call defines the list of email addresses and phone numbers that the SRT can use to contact you for escalations to the SRT and to initiate proactive customer support.
 *
 * The contacts that you provide in the request replace any contacts that were already defined. If you already have contacts defined and want to use them, retrieve the list using `DescribeEmergencyContactSettings` and then provide it to this call.
 */
export const associateProactiveEngagementDetails: API.OperationMethod<
  AssociateProactiveEngagementDetailsRequest,
  AssociateProactiveEngagementDetailsResponse,
  AssociateProactiveEngagementDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c4, 0) as any as S.Schema<AssociateProactiveEngagementDetailsRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<AssociateProactiveEngagementDetailsResponse>,
  errors: [
    InternalErrorException,
    InvalidOperationException,
    InvalidParameterException,
    OptimisticLockException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateProactiveEngagementDetails",
}));

export type CreateProtectionError =
  | InternalErrorException
  | InvalidOperationException
  | InvalidParameterException
  | InvalidResourceException
  | LimitsExceededException
  | OptimisticLockException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | SubscriptionNotFound
  | CommonErrors;
/**
 * Enables Shield Advanced for a specific Amazon Web Services resource. The resource can be an Amazon CloudFront distribution, Amazon Route 53 hosted zone, Global Accelerator standard accelerator, Elastic IP Address, Application Load Balancer, or a Classic Load Balancer. You can protect Amazon EC2 instances and Network Load Balancers by association with protected Amazon EC2 Elastic IP addresses.
 *
 * You can add protection to only a single resource with each `CreateProtection` request. You can add protection to multiple resources
 * at once through the Shield Advanced console at https://console.aws.amazon.com/wafv2/shieldv2#/.
 * For more information see
 * Getting Started with Shield Advanced
 * and Adding Shield Advanced protection to Amazon Web Services resources.
 */
export const createProtection: API.OperationMethod<
  CreateProtectionRequest,
  CreateProtectionResponse,
  CreateProtectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<CreateProtectionRequest>,
  output: __S(97, __c6, 1) as any as S.Schema<CreateProtectionResponse>,
  errors: [
    InternalErrorException,
    InvalidOperationException,
    InvalidParameterException,
    InvalidResourceException,
    LimitsExceededException,
    OptimisticLockException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    SubscriptionNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProtection",
}));

export type CreateProtectionGroupError =
  | InternalErrorException
  | InvalidParameterException
  | LimitsExceededException
  | OptimisticLockException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | SubscriptionNotFound
  | CommonErrors;
/**
 * Creates a grouping of protected resources so they can be handled as a collective. This resource grouping improves the accuracy of detection and reduces false positives.
 */
export const createProtectionGroup: API.OperationMethod<
  CreateProtectionGroupRequest,
  CreateProtectionGroupResponse,
  CreateProtectionGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<CreateProtectionGroupRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<CreateProtectionGroupResponse>,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    LimitsExceededException,
    OptimisticLockException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    SubscriptionNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProtectionGroup",
}));

export type CreateSubscriptionError =
  | InternalErrorException
  | ResourceAlreadyExistsException
  | CommonErrors;
/**
 * Activates Shield Advanced for an account.
 *
 * For accounts that are members of an Organizations organization, Shield Advanced subscriptions are billed against the organization's payer account,
 * regardless of whether the payer account itself is subscribed.
 *
 * When you initially create a subscription, your subscription is set to be automatically renewed at the end of the existing subscription period. You can change this by submitting an `UpdateSubscription` request.
 */
export const createSubscription: API.OperationMethod<
  CreateSubscriptionRequest,
  CreateSubscriptionResponse,
  CreateSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<CreateSubscriptionRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<CreateSubscriptionResponse>,
  errors: [InternalErrorException, ResourceAlreadyExistsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSubscription",
}));

export type DeleteProtectionError =
  | InternalErrorException
  | OptimisticLockException
  | ResourceNotFoundException
  | SubscriptionNotFound
  | CommonErrors;
/**
 * Deletes an Shield Advanced Protection.
 */
export const deleteProtection: API.OperationMethod<
  DeleteProtectionRequest,
  DeleteProtectionResponse,
  DeleteProtectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<DeleteProtectionRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteProtectionResponse>,
  errors: [
    InternalErrorException,
    OptimisticLockException,
    ResourceNotFoundException,
    SubscriptionNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProtection",
}));

export type DeleteProtectionGroupError =
  | InternalErrorException
  | OptimisticLockException
  | ResourceNotFoundException
  | SubscriptionNotFound
  | CommonErrors;
/**
 * Removes the specified protection group.
 */
export const deleteProtectionGroup: API.OperationMethod<
  DeleteProtectionGroupRequest,
  DeleteProtectionGroupResponse,
  DeleteProtectionGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<DeleteProtectionGroupRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteProtectionGroupResponse>,
  errors: [
    InternalErrorException,
    OptimisticLockException,
    ResourceNotFoundException,
    SubscriptionNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProtectionGroup",
}));

export type DeleteSubscriptionError =
  | InternalErrorException
  | LockedSubscriptionException
  | ResourceNotFoundException
  | SubscriptionNotFound
  | CommonErrors;
/**
 * Removes Shield Advanced from an account. Shield Advanced requires a 1-year subscription commitment. You cannot delete a subscription prior to the completion of that commitment.
 */
export const deleteSubscription: API.OperationMethod<
  DeleteSubscriptionRequest,
  DeleteSubscriptionResponse,
  DeleteSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<DeleteSubscriptionRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteSubscriptionResponse>,
  errors: [
    InternalErrorException,
    LockedSubscriptionException,
    ResourceNotFoundException,
    SubscriptionNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSubscription",
}));

export type DescribeAttackError = AccessDeniedException | InternalErrorException | CommonErrors;
/**
 * Describes the details of a DDoS attack.
 */
export const describeAttack: API.OperationMethod<
  DescribeAttackRequest,
  DescribeAttackResponse,
  DescribeAttackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<DescribeAttackRequest>,
  output: __S(238, __c14, 14) as any as S.Schema<DescribeAttackResponse>,
  errors: [AccessDeniedException, InternalErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAttack",
}));

export type DescribeAttackStatisticsError = InternalErrorException | CommonErrors;
/**
 * Provides information about the number and type of attacks Shield has detected in the last year for all resources that belong to your account, regardless of whether you've defined Shield protections for them. This operation is available to Shield customers as well as to Shield Advanced customers.
 *
 * The operation returns data for the time range of midnight UTC, one year ago, to midnight UTC, today. For example, if the current time is `2020-10-26 15:39:32 PDT`, equal to `2020-10-26 22:39:32 UTC`, then the time range for the attack data returned is from `2019-10-26 00:00:00 UTC` to `2020-10-26 00:00:00 UTC`.
 *
 * The time range indicates the period covered by the attack statistics data items.
 */
export const describeAttackStatistics: API.OperationMethod<
  DescribeAttackStatisticsRequest,
  DescribeAttackStatisticsResponse,
  DescribeAttackStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<DescribeAttackStatisticsRequest>,
  output: __S(245, __c15, 5) as any as S.Schema<DescribeAttackStatisticsResponse>,
  errors: [InternalErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAttackStatistics",
}));

export type DescribeDRTAccessError =
  | InternalErrorException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns the current role and list of Amazon S3 log buckets used by the Shield Response Team (SRT) to access your Amazon Web Services account while assisting with attack mitigation.
 */
export const describeDRTAccess: API.OperationMethod<
  DescribeDRTAccessRequest,
  DescribeDRTAccessResponse,
  DescribeDRTAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<DescribeDRTAccessRequest>,
  output: __S(273, __c17, 1) as any as S.Schema<DescribeDRTAccessResponse>,
  errors: [InternalErrorException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDRTAccess",
}));

export type DescribeEmergencyContactSettingsError =
  | InternalErrorException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * A list of email addresses and phone numbers that the Shield Response Team (SRT) can use to contact you if you have proactive engagement enabled, for escalations to the SRT and to initiate proactive customer support.
 */
export const describeEmergencyContactSettings: API.OperationMethod<
  DescribeEmergencyContactSettingsRequest,
  DescribeEmergencyContactSettingsResponse,
  DescribeEmergencyContactSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<DescribeEmergencyContactSettingsRequest>,
  output: __S(289, __c18, 1) as any as S.Schema<DescribeEmergencyContactSettingsResponse>,
  errors: [InternalErrorException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEmergencyContactSettings",
}));

export type DescribeProtectionError =
  | InternalErrorException
  | InvalidParameterException
  | ResourceNotFoundException
  | SubscriptionNotFound
  | CommonErrors;
/**
 * Lists the details of a Protection object.
 */
export const describeProtection: API.OperationMethod<
  DescribeProtectionRequest,
  DescribeProtectionResponse,
  DescribeProtectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<DescribeProtectionRequest>,
  output: __S(305, __c19, 1) as any as S.Schema<DescribeProtectionResponse>,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    ResourceNotFoundException,
    SubscriptionNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProtection",
}));

export type DescribeProtectionGroupError =
  | InternalErrorException
  | ResourceNotFoundException
  | SubscriptionNotFound
  | CommonErrors;
/**
 * Returns the specification for the specified protection group.
 */
export const describeProtectionGroup: API.OperationMethod<
  DescribeProtectionGroupRequest,
  DescribeProtectionGroupResponse,
  DescribeProtectionGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<DescribeProtectionGroupRequest>,
  output: __S(353, __c22, 1) as any as S.Schema<DescribeProtectionGroupResponse>,
  errors: [InternalErrorException, ResourceNotFoundException, SubscriptionNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProtectionGroup",
}));

export type DescribeSubscriptionError =
  | InternalErrorException
  | ResourceNotFoundException
  | SubscriptionNotFound
  | CommonErrors;
/**
 * Provides details about the Shield Advanced subscription for an account.
 */
export const describeSubscription: API.OperationMethod<
  DescribeSubscriptionRequest,
  DescribeSubscriptionResponse,
  DescribeSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<DescribeSubscriptionRequest>,
  output: __S(393, __c24, 9) as any as S.Schema<DescribeSubscriptionResponse>,
  errors: [InternalErrorException, ResourceNotFoundException, SubscriptionNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSubscription",
}));

export type DisableApplicationLayerAutomaticResponseError =
  | InternalErrorException
  | InvalidOperationException
  | InvalidParameterException
  | OptimisticLockException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disable the Shield Advanced automatic application layer DDoS mitigation feature for the protected resource. This
 * stops Shield Advanced from creating, verifying, and applying WAF rules for attacks that it detects for the resource.
 */
export const disableApplicationLayerAutomaticResponse: API.OperationMethod<
  DisableApplicationLayerAutomaticResponseRequest,
  DisableApplicationLayerAutomaticResponseResponse,
  DisableApplicationLayerAutomaticResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<DisableApplicationLayerAutomaticResponseRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DisableApplicationLayerAutomaticResponseResponse>,
  errors: [
    InternalErrorException,
    InvalidOperationException,
    InvalidParameterException,
    OptimisticLockException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableApplicationLayerAutomaticResponse",
}));

export type DisableProactiveEngagementError =
  | InternalErrorException
  | InvalidOperationException
  | InvalidParameterException
  | OptimisticLockException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes authorization from the Shield Response Team (SRT) to notify contacts about escalations to the SRT and to initiate proactive customer support.
 */
export const disableProactiveEngagement: API.OperationMethod<
  DisableProactiveEngagementRequest,
  DisableProactiveEngagementResponse,
  DisableProactiveEngagementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<DisableProactiveEngagementRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DisableProactiveEngagementResponse>,
  errors: [
    InternalErrorException,
    InvalidOperationException,
    InvalidParameterException,
    OptimisticLockException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableProactiveEngagement",
}));

export type DisassociateDRTLogBucketError =
  | AccessDeniedForDependencyException
  | InternalErrorException
  | InvalidOperationException
  | NoAssociatedRoleException
  | OptimisticLockException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes the Shield Response Team's (SRT) access to the specified Amazon S3 bucket containing the logs that you shared previously.
 */
export const disassociateDRTLogBucket: API.OperationMethod<
  DisassociateDRTLogBucketRequest,
  DisassociateDRTLogBucketResponse,
  DisassociateDRTLogBucketError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<DisassociateDRTLogBucketRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DisassociateDRTLogBucketResponse>,
  errors: [
    AccessDeniedForDependencyException,
    InternalErrorException,
    InvalidOperationException,
    NoAssociatedRoleException,
    OptimisticLockException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateDRTLogBucket",
}));

export type DisassociateDRTRoleError =
  | InternalErrorException
  | InvalidOperationException
  | OptimisticLockException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes the Shield Response Team's (SRT) access to your Amazon Web Services account.
 */
export const disassociateDRTRole: API.OperationMethod<
  DisassociateDRTRoleRequest,
  DisassociateDRTRoleResponse,
  DisassociateDRTRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<DisassociateDRTRoleRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DisassociateDRTRoleResponse>,
  errors: [
    InternalErrorException,
    InvalidOperationException,
    OptimisticLockException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateDRTRole",
}));

export type DisassociateHealthCheckError =
  | InternalErrorException
  | InvalidParameterException
  | InvalidResourceException
  | OptimisticLockException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes health-based detection from the Shield Advanced protection for a resource. Shield Advanced health-based detection uses the health of your Amazon Web Services resource to improve responsiveness and accuracy in attack detection and response.
 *
 * You define the health check in Route 53 and then associate or disassociate it with your Shield Advanced protection. For more information, see Shield Advanced Health-Based Detection in the *WAF Developer Guide*.
 */
export const disassociateHealthCheck: API.OperationMethod<
  DisassociateHealthCheckRequest,
  DisassociateHealthCheckResponse,
  DisassociateHealthCheckError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<DisassociateHealthCheckRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DisassociateHealthCheckResponse>,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    InvalidResourceException,
    OptimisticLockException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateHealthCheck",
}));

export type EnableApplicationLayerAutomaticResponseError =
  | InternalErrorException
  | InvalidOperationException
  | InvalidParameterException
  | LimitsExceededException
  | OptimisticLockException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Enable the Shield Advanced automatic application layer DDoS mitigation for the protected resource.
 *
 * This feature is available for Amazon CloudFront distributions and Application Load Balancers only.
 *
 * This causes Shield Advanced to create, verify, and apply WAF rules for DDoS attacks that it detects for the
 * resource. Shield Advanced applies the rules in a Shield rule group inside the web ACL that you've associated
 * with the resource. For information about how automatic mitigation works and the requirements for using it, see
 * Shield Advanced automatic application layer DDoS mitigation.
 *
 * Don't use this action to make changes to automatic mitigation settings when it's already enabled for a resource. Instead, use UpdateApplicationLayerAutomaticResponse.
 *
 * To use this feature, you must associate a web ACL with the protected resource. The web ACL must be created using the latest version of WAF (v2). You can associate the web ACL through the Shield Advanced console
 * at https://console.aws.amazon.com/wafv2/shieldv2#/. For more information,
 * see Getting Started with Shield Advanced. You can also associate the web ACL to the resource through the WAF console or the WAF API, but you must manage Shield Advanced automatic mitigation through Shield Advanced. For information about WAF, see
 * WAF Developer Guide.
 */
export const enableApplicationLayerAutomaticResponse: API.OperationMethod<
  EnableApplicationLayerAutomaticResponseRequest,
  EnableApplicationLayerAutomaticResponseResponse,
  EnableApplicationLayerAutomaticResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<EnableApplicationLayerAutomaticResponseRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<EnableApplicationLayerAutomaticResponseResponse>,
  errors: [
    InternalErrorException,
    InvalidOperationException,
    InvalidParameterException,
    LimitsExceededException,
    OptimisticLockException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableApplicationLayerAutomaticResponse",
}));

export type EnableProactiveEngagementError =
  | InternalErrorException
  | InvalidOperationException
  | InvalidParameterException
  | OptimisticLockException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Authorizes the Shield Response Team (SRT) to use email and phone to notify contacts about escalations to the SRT and to initiate proactive customer support.
 */
export const enableProactiveEngagement: API.OperationMethod<
  EnableProactiveEngagementRequest,
  EnableProactiveEngagementResponse,
  EnableProactiveEngagementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<EnableProactiveEngagementRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<EnableProactiveEngagementResponse>,
  errors: [
    InternalErrorException,
    InvalidOperationException,
    InvalidParameterException,
    OptimisticLockException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableProactiveEngagement",
}));

export type GetSubscriptionStateError = InternalErrorException | CommonErrors;
/**
 * Returns the `SubscriptionState`, either `Active` or `Inactive`.
 */
export const getSubscriptionState: API.OperationMethod<
  GetSubscriptionStateRequest,
  GetSubscriptionStateResponse,
  GetSubscriptionStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<GetSubscriptionStateRequest>,
  output: __S(513, __c32, 1) as any as S.Schema<GetSubscriptionStateResponse>,
  errors: [InternalErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSubscriptionState",
}));

export type ListAttacksError =
  | InternalErrorException
  | InvalidOperationException
  | InvalidParameterException
  | CommonErrors;
/**
 * Returns all ongoing DDoS attacks or all DDoS attacks during a specified time
 * period.
 */
export const listAttacks: API.PaginatedOperationMethod<
  ListAttacksRequest,
  ListAttacksResponse,
  ListAttacksError,
  Credentials | HttpClient.HttpClient,
  AttackSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<ListAttacksRequest>,
  output: __S(533, __c33, 5) as any as S.Schema<ListAttacksResponse>,
  errors: [InternalErrorException, InvalidOperationException, InvalidParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAttacks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AttackSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProtectionGroupsError =
  | InternalErrorException
  | InvalidPaginationTokenException
  | ResourceNotFoundException
  | SubscriptionNotFound
  | CommonErrors;
/**
 * Retrieves ProtectionGroup objects for the account. You can retrieve all protection groups or you can provide
 * filtering criteria and retrieve just the subset of protection groups that match the criteria.
 */
export const listProtectionGroups: API.PaginatedOperationMethod<
  ListProtectionGroupsRequest,
  ListProtectionGroupsResponse,
  ListProtectionGroupsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(545, __c34, 1) as any as S.Schema<ListProtectionGroupsRequest>,
  output: __S(547, __c34, 3) as any as S.Schema<ListProtectionGroupsResponse>,
  errors: [
    InternalErrorException,
    InvalidPaginationTokenException,
    ResourceNotFoundException,
    SubscriptionNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProtectionGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProtectionsError =
  | InternalErrorException
  | InvalidPaginationTokenException
  | ResourceNotFoundException
  | SubscriptionNotFound
  | CommonErrors;
/**
 * Retrieves Protection objects for the account. You can retrieve all protections or you can provide
 * filtering criteria and retrieve just the subset of protections that match the criteria.
 */
export const listProtections: API.PaginatedOperationMethod<
  ListProtectionsRequest,
  ListProtectionsResponse,
  ListProtectionsError,
  Credentials | HttpClient.HttpClient,
  Protection
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(577, __c36, 1) as any as S.Schema<ListProtectionsRequest>,
  output: __S(579, __c36, 3) as any as S.Schema<ListProtectionsResponse>,
  errors: [
    InternalErrorException,
    InvalidPaginationTokenException,
    ResourceNotFoundException,
    SubscriptionNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProtections",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Protections",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourcesInProtectionGroupError =
  | InternalErrorException
  | InvalidPaginationTokenException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the resources that are included in the protection group.
 */
export const listResourcesInProtectionGroup: API.PaginatedOperationMethod<
  ListResourcesInProtectionGroupRequest,
  ListResourcesInProtectionGroupResponse,
  ListResourcesInProtectionGroupError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(592, __c37, 0) as any as S.Schema<ListResourcesInProtectionGroupRequest>,
  output: __S(593, __c37, 1) as any as S.Schema<ListResourcesInProtectionGroupResponse>,
  errors: [InternalErrorException, InvalidPaginationTokenException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourcesInProtectionGroup",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalErrorException
  | InvalidResourceException
  | ResourceNotFoundException
  | SubscriptionNotFound
  | CommonErrors;
/**
 * Gets information about Amazon Web Services tags for a specified Amazon Resource Name (ARN) in Shield.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c38, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(609, __c38, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    InternalErrorException,
    InvalidResourceException,
    ResourceNotFoundException,
    SubscriptionNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type TagResourceError =
  | InternalErrorException
  | InvalidParameterException
  | InvalidResourceException
  | ResourceNotFoundException
  | SubscriptionNotFound
  | CommonErrors;
/**
 * Adds or updates tags for a resource in Shield.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(624, __c39, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    InvalidResourceException,
    ResourceNotFoundException,
    SubscriptionNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalErrorException
  | InvalidParameterException
  | InvalidResourceException
  | ResourceNotFoundException
  | SubscriptionNotFound
  | CommonErrors;
/**
 * Removes tags from a resource in Shield.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c40, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    InvalidResourceException,
    ResourceNotFoundException,
    SubscriptionNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateApplicationLayerAutomaticResponseError =
  | InternalErrorException
  | InvalidOperationException
  | InvalidParameterException
  | OptimisticLockException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates an existing Shield Advanced automatic application layer DDoS mitigation configuration for the specified resource.
 */
export const updateApplicationLayerAutomaticResponse: API.OperationMethod<
  UpdateApplicationLayerAutomaticResponseRequest,
  UpdateApplicationLayerAutomaticResponseResponse,
  UpdateApplicationLayerAutomaticResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(656, __c41, 0) as any as S.Schema<UpdateApplicationLayerAutomaticResponseRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<UpdateApplicationLayerAutomaticResponseResponse>,
  errors: [
    InternalErrorException,
    InvalidOperationException,
    InvalidParameterException,
    OptimisticLockException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplicationLayerAutomaticResponse",
}));

export type UpdateEmergencyContactSettingsError =
  | InternalErrorException
  | InvalidParameterException
  | OptimisticLockException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the details of the list of email addresses and phone numbers that the Shield Response Team (SRT) can use to contact you if you have proactive engagement enabled, for escalations to the SRT and to initiate proactive customer support.
 */
export const updateEmergencyContactSettings: API.OperationMethod<
  UpdateEmergencyContactSettingsRequest,
  UpdateEmergencyContactSettingsResponse,
  UpdateEmergencyContactSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c42, 0) as any as S.Schema<UpdateEmergencyContactSettingsRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<UpdateEmergencyContactSettingsResponse>,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    OptimisticLockException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEmergencyContactSettings",
}));

export type UpdateProtectionGroupError =
  | InternalErrorException
  | InvalidParameterException
  | OptimisticLockException
  | ResourceNotFoundException
  | SubscriptionNotFound
  | CommonErrors;
/**
 * Updates an existing protection group. A protection group is a grouping of protected resources so they can be handled as a collective. This resource grouping improves the accuracy of detection and reduces false positives.
 */
export const updateProtectionGroup: API.OperationMethod<
  UpdateProtectionGroupRequest,
  UpdateProtectionGroupResponse,
  UpdateProtectionGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(688, __c43, 0) as any as S.Schema<UpdateProtectionGroupRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<UpdateProtectionGroupResponse>,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    OptimisticLockException,
    ResourceNotFoundException,
    SubscriptionNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProtectionGroup",
}));

export type UpdateSubscriptionError =
  | InternalErrorException
  | InvalidParameterException
  | LockedSubscriptionException
  | OptimisticLockException
  | ResourceNotFoundException
  | SubscriptionNotFound
  | CommonErrors;
/**
 * Updates the details of an existing subscription. Only enter values for parameters you want to change. Empty parameters are not updated.
 *
 * For accounts that are members of an Organizations organization, Shield Advanced subscriptions are billed against the organization's payer account,
 * regardless of whether the payer account itself is subscribed.
 */
export const updateSubscription: API.OperationMethod<
  UpdateSubscriptionRequest,
  UpdateSubscriptionResponse,
  UpdateSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c44, 0) as any as S.Schema<UpdateSubscriptionRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<UpdateSubscriptionResponse>,
  errors: [
    InternalErrorException,
    InvalidParameterException,
    LockedSubscriptionException,
    OptimisticLockException,
    ResourceNotFoundException,
    SubscriptionNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSubscription",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LogBucket: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociateDRTLogBucketRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "AssociateDRTLogBucketResponse",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RoleArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociateDRTRoleRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProtectionId: S.String, HealthCheckArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociateHealthCheckRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EmergencyContactList: __S(81, __c5, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociateProactiveEngagementDetailsRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EmailAddress: S.String,
          PhoneNumber: S.optional(S.String),
          ContactNotes: S.optional(S.String),
        }),
      ).annotate({ identifier: "EmergencyContact" });
    case 1:
      return S.Array(__S(80, __c5, 0));
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          ResourceArn: S.String,
          Tags: S.optional(__S(113, __c7, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateProtectionRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ProtectionId: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "CreateProtectionResponse",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "Tag" });
    case 1:
      return S.Array(__S(112, __c7, 0));
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProtectionGroupId: S.String,
          Aggregation: S.String,
          Pattern: S.String,
          ResourceType: S.optional(S.String),
          Members: S.optional(__S(144, __c9, 0)),
          Tags: S.optional(__S(113, __c7, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateProtectionGroupRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateSubscriptionRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProtectionId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteProtectionRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProtectionGroupId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteProtectionGroupRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteSubscriptionRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AttackId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeAttackRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Max: S.optional(S.Number),
          Average: S.optional(S.Number),
          Sum: S.optional(S.Number),
          N: S.optional(S.Number),
          Unit: S.optional(S.String),
        }),
      ).annotate({ identifier: "SummarizedCounter" });
    case 2:
      return S.Array(__S(225, __c14, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ VectorType: S.String, VectorCounters: S.optional(__S(226, __c14, 2)) }),
      ).annotate({ identifier: "SummarizedAttackVector" });
    case 4:
      return S.Array(__S(227, __c14, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          Id: S.optional(S.String),
          AttackVectors: S.optional(__S(228, __c14, 4)),
          Counters: S.optional(__S(226, __c14, 2)),
        }),
      ).annotate({ identifier: "SubResourceSummary" });
    case 6:
      return S.Array(__S(229, __c14, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Value: S.optional(S.Number) }),
      ).annotate({ identifier: "Contributor" });
    case 8:
      return S.Array(__S(231, __c14, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          AttackLayer: S.optional(S.String),
          AttackPropertyIdentifier: S.optional(S.String),
          TopContributors: S.optional(__S(232, __c14, 8)),
          Unit: S.optional(S.String),
          Total: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AttackProperty" });
    case 10:
      return S.Array(__S(233, __c14, 9));
    case 11:
      return S.suspend(() => S.Struct({ MitigationName: S.optional(S.String) })).annotate({
        identifier: "Mitigation",
      });
    case 12:
      return S.Array(__S(235, __c14, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({
          AttackId: S.optional(S.String),
          ResourceArn: S.optional(S.String),
          SubResources: S.optional(__S(230, __c14, 6)),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AttackCounters: S.optional(__S(226, __c14, 2)),
          AttackProperties: S.optional(__S(234, __c14, 10)),
          Mitigations: S.optional(__S(236, __c14, 12)),
        }),
      ).annotate({ identifier: "AttackDetail" });
    case 14:
      return S.suspend(() =>
        S.Struct({ Attack: S.optional(__S(237, __c14, 13)) }).pipe(ns),
      ).annotate({ identifier: "DescribeAttackResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeAttackStatisticsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Max: S.Number })).annotate({
        identifier: "AttackVolumeStatistics",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          BitsPerSecond: S.optional(__S(241, __c15, 1)),
          PacketsPerSecond: S.optional(__S(241, __c15, 1)),
          RequestsPerSecond: S.optional(__S(241, __c15, 1)),
        }),
      ).annotate({ identifier: "AttackVolume" });
    case 3:
      return S.suspend(() =>
        S.Struct({ AttackVolume: S.optional(__S(242, __c15, 2)), AttackCount: S.Number }),
      ).annotate({ identifier: "AttackStatisticsDataItem" });
    case 4:
      return S.Array(__S(243, __c15, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ TimeRange: __S(256, __c16, 0), DataItems: __S(244, __c15, 4) }).pipe(ns),
      ).annotate({ identifier: "DescribeAttackStatisticsResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FromInclusive: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ToExclusive: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "TimeRange" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeDRTAccessRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RoleArn: S.optional(S.String),
          LogBucketList: S.optional(__S(144, __c9, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeDRTAccessResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeEmergencyContactSettingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ EmergencyContactList: S.optional(__S(81, __c5, 1)) }).pipe(ns),
      ).annotate({ identifier: "DescribeEmergencyContactSettingsResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProtectionId: S.optional(S.String), ResourceArn: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeProtectionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Protection: S.optional(__S(337, __c21, 1)) }).pipe(ns),
      ).annotate({ identifier: "DescribeProtectionResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "BlockAction" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Block: S.optional(__S(320, __c20, 0)), Count: S.optional(__S(320, __c20, 0)) }),
      ).annotate({ identifier: "ResponseAction" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Status: S.String, Action: __S(321, __c20, 1) })).annotate({
        identifier: "ApplicationLayerAutomaticResponseConfiguration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          ResourceArn: S.optional(S.String),
          HealthCheckIds: S.optional(__S(144, __c9, 0)),
          ProtectionArn: S.optional(S.String),
          ApplicationLayerAutomaticResponseConfiguration: S.optional(__S(336, __c21, 0)),
        }),
      ).annotate({ identifier: "Protection" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProtectionGroupId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeProtectionGroupRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ProtectionGroup: __S(368, __c23, 0) }).pipe(ns)).annotate({
        identifier: "DescribeProtectionGroupResponse",
      });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProtectionGroupId: S.String,
          Aggregation: S.String,
          Pattern: S.String,
          ResourceType: S.optional(S.String),
          Members: __S(144, __c9, 0),
          ProtectionGroupArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProtectionGroup" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeSubscriptionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String), Max: S.optional(S.Number) }),
      ).annotate({ identifier: "Limit" });
    case 2:
      return S.Array(__S(385, __c24, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ ProtectedResourceTypeLimits: __S(386, __c24, 2) }),
      ).annotate({ identifier: "ProtectionLimits" });
    case 4:
      return S.suspend(() => S.Struct({ MaxMembers: S.Number })).annotate({
        identifier: "ProtectionGroupArbitraryPatternLimits",
      });
    case 5:
      return S.suspend(() => S.Struct({ ArbitraryPatternLimits: __S(388, __c24, 4) })).annotate({
        identifier: "ProtectionGroupPatternTypeLimits",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({ MaxProtectionGroups: S.Number, PatternTypeLimits: __S(389, __c24, 5) }),
      ).annotate({ identifier: "ProtectionGroupLimits" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          ProtectionLimits: __S(387, __c24, 3),
          ProtectionGroupLimits: __S(390, __c24, 6),
        }),
      ).annotate({ identifier: "SubscriptionLimits" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TimeCommitmentInSeconds: S.optional(S.Number),
          AutoRenew: S.optional(S.String),
          Limits: S.optional(__S(386, __c24, 2)),
          ProactiveEngagementStatus: S.optional(S.String),
          SubscriptionLimits: __S(391, __c24, 7),
          SubscriptionArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "Subscription" });
    case 9:
      return S.suspend(() =>
        S.Struct({ Subscription: S.optional(__S(392, __c24, 8)) }).pipe(ns),
      ).annotate({ identifier: "DescribeSubscriptionResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisableApplicationLayerAutomaticResponseRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisableProactiveEngagementRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LogBucket: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisassociateDRTLogBucketRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisassociateDRTRoleRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProtectionId: S.String, HealthCheckArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisassociateHealthCheckRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, Action: __S(321, __c20, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "EnableApplicationLayerAutomaticResponseRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "EnableProactiveEngagementRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSubscriptionStateRequest" });
    case 1:
      return S.suspend(() => S.Struct({ SubscriptionState: S.String }).pipe(ns)).annotate({
        identifier: "GetSubscriptionStateResponse",
      });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArns: S.optional(__S(144, __c9, 0)),
          StartTime: S.optional(__S(256, __c16, 0)),
          EndTime: S.optional(__S(256, __c16, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAttacksRequest" });
    case 1:
      return S.suspend(() => S.Struct({ VectorType: S.String })).annotate({
        identifier: "AttackVectorDescription",
      });
    case 2:
      return S.Array(__S(529, __c33, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AttackId: S.optional(S.String),
          ResourceArn: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AttackVectors: S.optional(__S(530, __c33, 2)),
        }),
      ).annotate({ identifier: "AttackSummary" });
    case 4:
      return S.Array(__S(531, __c33, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          AttackSummaries: S.optional(__S(532, __c33, 4)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListAttacksResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProtectionGroupIds: S.optional(__S(144, __c9, 0)),
          Patterns: S.optional(__S(560, __c35, 0)),
          ResourceTypes: S.optional(__S(560, __c35, 0)),
          Aggregations: S.optional(__S(560, __c35, 0)),
        }),
      ).annotate({ identifier: "InclusionProtectionGroupFilters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          InclusionFilters: S.optional(__S(544, __c34, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListProtectionGroupsRequest" });
    case 2:
      return S.Array(__S(368, __c23, 0));
    case 3:
      return S.suspend(() =>
        S.Struct({ ProtectionGroups: __S(546, __c34, 2), NextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListProtectionGroupsResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArns: S.optional(__S(144, __c9, 0)),
          ProtectionNames: S.optional(__S(144, __c9, 0)),
          ResourceTypes: S.optional(__S(560, __c35, 0)),
        }),
      ).annotate({ identifier: "InclusionProtectionFilters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          InclusionFilters: S.optional(__S(576, __c36, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListProtectionsRequest" });
    case 2:
      return S.Array(__S(337, __c21, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Protections: S.optional(__S(578, __c36, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListProtectionsResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProtectionGroupId: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListResourcesInProtectionGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ResourceArns: __S(144, __c9, 0), NextToken: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "ListResourcesInProtectionGroupResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(113, __c7, 1)) }).pipe(ns)).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, Tags: __S(113, __c7, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, TagKeys: __S(144, __c9, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, Action: __S(321, __c20, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateApplicationLayerAutomaticResponseRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EmergencyContactList: S.optional(__S(81, __c5, 1)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateEmergencyContactSettingsRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProtectionGroupId: S.String,
          Aggregation: S.String,
          Pattern: S.String,
          ResourceType: S.optional(S.String),
          Members: S.optional(__S(144, __c9, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateProtectionGroupRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AutoRenew: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateSubscriptionRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(720, __c45, 0));
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
