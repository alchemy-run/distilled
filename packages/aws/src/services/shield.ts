import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Shield",
  target: "AWSShield_20160616",
  version: "2016-06-02",
  sigv4: "shield",
  protocol: awsJson1_1Protocol,
  xmlns: "http://ddp.amazonaws.com/doc/2016-06-02/",
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
    const _p0 = () => ({
      authSchemes: [
        { name: "sigv4", signingName: "shield", signingRegion: "us-east-1" },
      ],
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
              return e(
                `https://shield-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://shield.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://shield.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"])<{
    readonly message?: string;
  }> {}
export class AccessDeniedForDependencyException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedForDependencyException", [
    "AuthError",
  ])<{ readonly message?: string }> {}
export class InternalErrorException
  extends /*@__PURE__*/ TE.TaggedError("InternalErrorException", [
    "ServerError",
  ])<{ readonly message?: string }> {}
export class InvalidOperationException
  extends /*@__PURE__*/ TE.TaggedError("InvalidOperationException")<{
    readonly message?: string;
  }> {}
export class InvalidPaginationTokenException
  extends /*@__PURE__*/ TE.TaggedError("InvalidPaginationTokenException")<{
    readonly message?: string;
  }> {}
export class InvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError("InvalidParameterException")<{
    readonly message?: string;
    readonly reason?: ValidationExceptionReason;
    readonly fields?: ValidationExceptionField[];
  }> {}
export class InvalidResourceException
  extends /*@__PURE__*/ TE.TaggedError("InvalidResourceException")<{
    readonly message?: string;
  }> {}
export class LimitsExceededException
  extends /*@__PURE__*/ TE.TaggedError("LimitsExceededException")<{
    readonly message?: string;
    readonly Type?: string;
    readonly Limit?: number;
  }> {}
export class LockedSubscriptionException
  extends /*@__PURE__*/ TE.TaggedError("LockedSubscriptionException")<{
    readonly message?: string;
  }> {}
export class NoAssociatedRoleException
  extends /*@__PURE__*/ TE.TaggedError("NoAssociatedRoleException")<{
    readonly message?: string;
  }> {}
export class OptimisticLockException
  extends /*@__PURE__*/ TE.TaggedError("OptimisticLockException")<{
    readonly message?: string;
  }> {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError("ResourceAlreadyExistsException", [
    "AlreadyExistsError",
  ])<{ readonly message?: string; readonly resourceType?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ResourceNotFoundException")<{
    readonly message?: string;
    readonly resourceType?: string;
  }> {}
export class SubscriptionNotFound
  extends /*@__PURE__*/ TE.TaggedError(
    "SubscriptionNotFound",
    ["NotFoundError"],
    {
      synthetic: {
        from: "ResourceNotFoundException",
        message: "The subscription does not exist.",
      },
    },
  )<{ readonly message?: string; readonly resourceType?: string }> {}
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
export type ProtectionGroupPattern =
  | "ALL"
  | "ARBITRARY"
  | "BY_RESOURCE_TYPE"
  | (string & {});
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
export type ApplicationLayerAutomaticResponseStatus =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
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
export type ProactiveEngagementStatus =
  | "ENABLED"
  | "DISABLED"
  | "PENDING"
  | (string & {});
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
export type ValidationExceptionReason =
  | "FIELD_VALIDATION_FAILED"
  | "OTHER"
  | (string & {});
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
  descriptor: { service: svc, input: { LogBucket: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { RoleArn: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { ProtectionId: 0, HealthCheckArn: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { EmergencyContactList: D.list(i_EmergencyContact) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { Name: 0, ResourceArn: 0, Tags: D.list(i_Tag) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ProtectionGroupId: 0,
      Aggregation: 0,
      Pattern: 0,
      ResourceType: 0,
      Members: 0,
      Tags: D.list(i_Tag),
    },
  },
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
})) as any;

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
  descriptor: { service: svc, input: {} },
  errors: [InternalErrorException, ResourceAlreadyExistsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSubscription",
})) as any;

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
  descriptor: { service: svc, input: { ProtectionId: 0 } },
  errors: [
    InternalErrorException,
    OptimisticLockException,
    ResourceNotFoundException,
    SubscriptionNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProtection",
})) as any;

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
  descriptor: { service: svc, input: { ProtectionGroupId: 0 } },
  errors: [
    InternalErrorException,
    OptimisticLockException,
    ResourceNotFoundException,
    SubscriptionNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProtectionGroup",
})) as any;

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
  descriptor: { service: svc, input: {} },
  errors: [
    InternalErrorException,
    LockedSubscriptionException,
    ResourceNotFoundException,
    SubscriptionNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSubscription",
})) as any;

export type DescribeAttackError =
  | AccessDeniedException
  | InternalErrorException
  | CommonErrors;
/**
 * Describes the details of a DDoS attack.
 */
export const describeAttack: API.OperationMethod<
  DescribeAttackRequest,
  DescribeAttackResponse,
  DescribeAttackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AttackId: 0 },
    output: { Attack: { StartTime: D.ts, EndTime: D.ts } },
  },
  errors: [AccessDeniedException, InternalErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAttack",
})) as any;

export type DescribeAttackStatisticsError =
  | InternalErrorException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: {},
    output: { TimeRange: { FromInclusive: D.ts, ToExclusive: D.ts } },
  },
  errors: [InternalErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAttackStatistics",
})) as any;

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
  descriptor: { service: svc, input: {} },
  errors: [InternalErrorException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDRTAccess",
})) as any;

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
  descriptor: { service: svc, input: {} },
  errors: [InternalErrorException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEmergencyContactSettings",
})) as any;

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
  descriptor: { service: svc, input: { ProtectionId: 0, ResourceArn: 0 } },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    ResourceNotFoundException,
    SubscriptionNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProtection",
})) as any;

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
  descriptor: { service: svc, input: { ProtectionGroupId: 0 } },
  errors: [
    InternalErrorException,
    ResourceNotFoundException,
    SubscriptionNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProtectionGroup",
})) as any;

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
  descriptor: {
    service: svc,
    input: {},
    output: { Subscription: { StartTime: D.ts, EndTime: D.ts } },
  },
  errors: [
    InternalErrorException,
    ResourceNotFoundException,
    SubscriptionNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSubscription",
})) as any;

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
  descriptor: { service: svc, input: { ResourceArn: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: {} },
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
})) as any;

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
  descriptor: { service: svc, input: { LogBucket: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: {} },
  errors: [
    InternalErrorException,
    InvalidOperationException,
    OptimisticLockException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateDRTRole",
})) as any;

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
  descriptor: { service: svc, input: { ProtectionId: 0, HealthCheckArn: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ResourceArn: 0, Action: i_ResponseAction },
  },
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
})) as any;

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
  descriptor: { service: svc, input: {} },
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
})) as any;

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
  descriptor: { service: svc, input: {} },
  errors: [InternalErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSubscriptionState",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ResourceArns: 0,
      StartTime: i_TimeRange,
      EndTime: i_TimeRange,
      NextToken: 0,
      MaxResults: 0,
    },
    output: { AttackSummaries: D.list({ StartTime: D.ts, EndTime: D.ts }) },
  },
  errors: [
    InternalErrorException,
    InvalidOperationException,
    InvalidParameterException,
  ],
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
  descriptor: {
    service: svc,
    input: {
      NextToken: 0,
      MaxResults: 0,
      InclusionFilters: {
        ProtectionGroupIds: 0,
        Patterns: 0,
        ResourceTypes: 0,
        Aggregations: 0,
      },
    },
  },
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
  descriptor: {
    service: svc,
    input: {
      NextToken: 0,
      MaxResults: 0,
      InclusionFilters: {
        ResourceArns: 0,
        ProtectionNames: 0,
        ResourceTypes: 0,
      },
    },
  },
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
  descriptor: {
    service: svc,
    input: { ProtectionGroupId: 0, NextToken: 0, MaxResults: 0 },
  },
  errors: [
    InternalErrorException,
    InvalidPaginationTokenException,
    ResourceNotFoundException,
  ],
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
  descriptor: { service: svc, input: { ResourceARN: 0 } },
  errors: [
    InternalErrorException,
    InvalidResourceException,
    ResourceNotFoundException,
    SubscriptionNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: { service: svc, input: { ResourceARN: 0, Tags: D.list(i_Tag) } },
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
})) as any;

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
  descriptor: { service: svc, input: { ResourceARN: 0, TagKeys: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ResourceArn: 0, Action: i_ResponseAction },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { EmergencyContactList: D.list(i_EmergencyContact) },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    OptimisticLockException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEmergencyContactSettings",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ProtectionGroupId: 0,
      Aggregation: 0,
      Pattern: 0,
      ResourceType: 0,
      Members: 0,
    },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { AutoRenew: 0 } },
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
})) as any;

const i_EmergencyContact: D.LazyStruct = () => ({
  EmailAddress: 0,
  PhoneNumber: 0,
  ContactNotes: 0,
});
const i_ResponseAction: D.LazyStruct = () => ({ Block: {}, Count: {} });
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_TimeRange: D.LazyStruct = () => ({ FromInclusive: 0, ToExclusive: 0 });
