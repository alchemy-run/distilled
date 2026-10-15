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
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Inspector",
  serviceShapeName: "InspectorService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "inspector" });
const ver = /*@__PURE__*/ T.ServiceVersion("2016-02-16");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
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
              `https://inspector-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://inspector-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://inspector.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://inspector.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://inspector.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      errorCode: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "AccessDeniedErrorCode",
      }),
      canRetry: S.Boolean,
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class AgentsAlreadyRunningAssessmentException
  extends /*@__PURE__*/ S.TaggedError<AgentsAlreadyRunningAssessmentException>()(
    "AgentsAlreadyRunningAssessmentException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      agents: /*@__PURE__*/ S.suspend(() => __S(1, __c0, 1)).annotate({
        identifier: "AgentAlreadyRunningAssessmentList",
      }),
      agentsTruncated: S.Boolean,
      canRetry: S.Boolean,
    },
  ) {}
export class AssessmentRunInProgressException
  extends /*@__PURE__*/ S.TaggedError<AssessmentRunInProgressException>()(
    "AssessmentRunInProgressException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      assessmentRunArns: /*@__PURE__*/ S.suspend(() => __S(224, __c14, 0)).annotate({
        identifier: "AssessmentRunInProgressArnList",
      }),
      assessmentRunArnsTruncated: S.Boolean,
      canRetry: S.Boolean,
    },
  ) {}
export class InternalException
  extends /*@__PURE__*/ S.TaggedError<InternalException>()("InternalException", {
    message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
    canRetry: S.Boolean,
  }) {}
export class InvalidCrossAccountRoleException
  extends /*@__PURE__*/ S.TaggedError<InvalidCrossAccountRoleException>()(
    "InvalidCrossAccountRoleException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      errorCode: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "InvalidCrossAccountRoleErrorCode",
      }),
      canRetry: S.Boolean,
    },
  ) {}
export class InvalidInputException
  extends /*@__PURE__*/ S.TaggedError<InvalidInputException>()("InvalidInputException", {
    message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
    errorCode: /*@__PURE__*/ S.suspend(() => S.String).annotate({
      identifier: "InvalidInputErrorCode",
    }),
    canRetry: S.Boolean,
  }) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()("LimitExceededException", {
    message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
    errorCode: /*@__PURE__*/ S.suspend(() => S.String).annotate({
      identifier: "LimitExceededErrorCode",
    }),
    canRetry: S.Boolean,
  }) {}
export class NoSuchEntityException
  extends /*@__PURE__*/ S.TaggedError<NoSuchEntityException>()("NoSuchEntityException", {
    message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
    errorCode: /*@__PURE__*/ S.suspend(() => S.String).annotate({
      identifier: "NoSuchEntityErrorCode",
    }),
    canRetry: S.Boolean,
  }) {}
export class PreviewGenerationInProgressException
  extends /*@__PURE__*/ S.TaggedError<PreviewGenerationInProgressException>()(
    "PreviewGenerationInProgressException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ServiceTemporarilyUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceTemporarilyUnavailableException>()(
    "ServiceTemporarilyUnavailableException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()), canRetry: S.Boolean },
    /*@__PURE__*/ T.HttpError(503),
  ).pipe(C.withServerError) {}
export class UnsupportedFeatureException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedFeatureException>()(
    "UnsupportedFeatureException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()), canRetry: S.Boolean },
  ) {}
export type Arn = string;
export type AddRemoveAttributesFindingArnList = string[];
export type AttributeKey = string;
export type AttributeValue = string;
export interface Attribute {
  key: string;
  value?: string;
}
export type UserAttributeList = Attribute[];
export interface AddAttributesToFindingsRequest {
  findingArns: string[];
  attributes: Attribute[];
}
export type FailedItemErrorCode =
  | "INVALID_ARN"
  | "DUPLICATE_ARN"
  | "ITEM_DOES_NOT_EXIST"
  | "ACCESS_DENIED"
  | "LIMIT_EXCEEDED"
  | "INTERNAL_ERROR"
  | (string & {});
export interface FailedItemDetails {
  failureCode: FailedItemErrorCode;
  retryable: boolean;
}
export type FailedItems = { [key: string]: FailedItemDetails | undefined };
export interface AddAttributesToFindingsResponse {
  failedItems: { [key: string]: FailedItemDetails | undefined };
}
export type AssessmentTargetName = string;
export interface CreateAssessmentTargetRequest {
  assessmentTargetName: string;
  resourceGroupArn?: string;
}
export interface CreateAssessmentTargetResponse {
  assessmentTargetArn: string;
}
export type AssessmentTemplateName = string;
export type AssessmentRunDuration = number;
export type AssessmentTemplateRulesPackageArnList = string[];
export interface CreateAssessmentTemplateRequest {
  assessmentTargetArn: string;
  assessmentTemplateName: string;
  durationInSeconds: number;
  rulesPackageArns: string[];
  userAttributesForFindings?: Attribute[];
}
export interface CreateAssessmentTemplateResponse {
  assessmentTemplateArn: string;
}
export interface CreateExclusionsPreviewRequest {
  assessmentTemplateArn: string;
}
export type UUID = string;
export interface CreateExclusionsPreviewResponse {
  previewToken: string;
}
export type TagKey = string;
export type TagValue = string;
export interface ResourceGroupTag {
  key: string;
  value?: string;
}
export type ResourceGroupTags = ResourceGroupTag[];
export interface CreateResourceGroupRequest {
  resourceGroupTags: ResourceGroupTag[];
}
export interface CreateResourceGroupResponse {
  resourceGroupArn: string;
}
export interface DeleteAssessmentRunRequest {
  assessmentRunArn: string;
}
export interface DeleteAssessmentRunResponse {}
export interface DeleteAssessmentTargetRequest {
  assessmentTargetArn: string;
}
export interface DeleteAssessmentTargetResponse {}
export interface DeleteAssessmentTemplateRequest {
  assessmentTemplateArn: string;
}
export interface DeleteAssessmentTemplateResponse {}
export type BatchDescribeArnList = string[];
export interface DescribeAssessmentRunsRequest {
  assessmentRunArns: string[];
}
export type AssessmentRunName = string;
export type AssessmentRunState =
  | "CREATED"
  | "START_DATA_COLLECTION_PENDING"
  | "START_DATA_COLLECTION_IN_PROGRESS"
  | "COLLECTING_DATA"
  | "STOP_DATA_COLLECTION_PENDING"
  | "DATA_COLLECTED"
  | "START_EVALUATING_RULES_PENDING"
  | "EVALUATING_RULES"
  | "FAILED"
  | "ERROR"
  | "COMPLETED"
  | "COMPLETED_WITH_ERRORS"
  | "CANCELED"
  | (string & {});
export type AssessmentRulesPackageArnList = string[];
export interface AssessmentRunStateChange {
  stateChangedAt: Date;
  state: AssessmentRunState;
}
export type AssessmentRunStateChangeList = AssessmentRunStateChange[];
export type InspectorEvent =
  | "ASSESSMENT_RUN_STARTED"
  | "ASSESSMENT_RUN_COMPLETED"
  | "ASSESSMENT_RUN_STATE_CHANGED"
  | "FINDING_REPORTED"
  | "OTHER"
  | (string & {});
export type Message = string;
export type AssessmentRunNotificationSnsStatusCode =
  | "SUCCESS"
  | "TOPIC_DOES_NOT_EXIST"
  | "ACCESS_DENIED"
  | "INTERNAL_ERROR"
  | (string & {});
export interface AssessmentRunNotification {
  date: Date;
  event: InspectorEvent;
  message?: string;
  error: boolean;
  snsTopicArn?: string;
  snsPublishStatusCode?: AssessmentRunNotificationSnsStatusCode;
}
export type AssessmentRunNotificationList = AssessmentRunNotification[];
export type Severity = "Low" | "Medium" | "High" | "Informational" | "Undefined" | (string & {});
export type FindingCount = number;
export type AssessmentRunFindingCounts = { [key in Severity]?: number };
export interface AssessmentRun {
  arn: string;
  name: string;
  assessmentTemplateArn: string;
  state: AssessmentRunState;
  durationInSeconds: number;
  rulesPackageArns: string[];
  userAttributesForFindings: Attribute[];
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  stateChangedAt: Date;
  dataCollected: boolean;
  stateChanges: AssessmentRunStateChange[];
  notifications: AssessmentRunNotification[];
  findingCounts: { [key: string]: number | undefined };
}
export type AssessmentRunList = AssessmentRun[];
export interface DescribeAssessmentRunsResponse {
  assessmentRuns: AssessmentRun[];
  failedItems: { [key: string]: FailedItemDetails | undefined };
}
export interface DescribeAssessmentTargetsRequest {
  assessmentTargetArns: string[];
}
export interface AssessmentTarget {
  arn: string;
  name: string;
  resourceGroupArn?: string;
  createdAt: Date;
  updatedAt: Date;
}
export type AssessmentTargetList = AssessmentTarget[];
export interface DescribeAssessmentTargetsResponse {
  assessmentTargets: AssessmentTarget[];
  failedItems: { [key: string]: FailedItemDetails | undefined };
}
export interface DescribeAssessmentTemplatesRequest {
  assessmentTemplateArns: string[];
}
export type ArnCount = number;
export interface AssessmentTemplate {
  arn: string;
  name: string;
  assessmentTargetArn: string;
  durationInSeconds: number;
  rulesPackageArns: string[];
  userAttributesForFindings: Attribute[];
  lastAssessmentRunArn?: string;
  assessmentRunCount: number;
  createdAt: Date;
}
export type AssessmentTemplateList = AssessmentTemplate[];
export interface DescribeAssessmentTemplatesResponse {
  assessmentTemplates: AssessmentTemplate[];
  failedItems: { [key: string]: FailedItemDetails | undefined };
}
export interface DescribeCrossAccountAccessRoleRequest {}
export interface DescribeCrossAccountAccessRoleResponse {
  roleArn: string;
  valid: boolean;
  registeredAt: Date;
}
export type BatchDescribeExclusionsArnList = string[];
export type Locale = "EN_US" | (string & {});
export interface DescribeExclusionsRequest {
  exclusionArns: string[];
  locale?: Locale;
}
export type Text = string;
export type ScopeType = "INSTANCE_ID" | "RULES_PACKAGE_ARN" | (string & {});
export type ScopeValue = string;
export interface Scope {
  key?: ScopeType;
  value?: string;
}
export type ScopeList = Scope[];
export type AttributeList = Attribute[];
export interface Exclusion {
  arn: string;
  title: string;
  description: string;
  recommendation: string;
  scopes: Scope[];
  attributes?: Attribute[];
}
export type ExclusionMap = { [key: string]: Exclusion | undefined };
export interface DescribeExclusionsResponse {
  exclusions: { [key: string]: Exclusion | undefined };
  failedItems: { [key: string]: FailedItemDetails | undefined };
}
export interface DescribeFindingsRequest {
  findingArns: string[];
  locale?: Locale;
}
export type NumericVersion = number;
export type ServiceName = string;
export interface InspectorServiceAttributes {
  schemaVersion: number;
  assessmentRunArn?: string;
  rulesPackageArn?: string;
}
export type AssetType = "ec2-instance" | (string & {});
export type AgentId = string;
export type AutoScalingGroup = string;
export type AmiId = string;
export type Hostname = string;
export type Ipv4Address = string;
export type Ipv4AddressList = string[];
export interface Tag {
  key: string;
  value?: string;
}
export type Tags = Tag[];
export interface PrivateIp {
  privateDnsName?: string;
  privateIpAddress?: string;
}
export type PrivateIpAddresses = PrivateIp[];
export type Ipv6Addresses = string[];
export interface SecurityGroup {
  groupName?: string;
  groupId?: string;
}
export type SecurityGroups = SecurityGroup[];
export interface NetworkInterface {
  networkInterfaceId?: string;
  subnetId?: string;
  vpcId?: string;
  privateDnsName?: string;
  privateIpAddress?: string;
  privateIpAddresses?: PrivateIp[];
  publicDnsName?: string;
  publicIp?: string;
  ipv6Addresses?: string[];
  securityGroups?: SecurityGroup[];
}
export type NetworkInterfaces = NetworkInterface[];
export interface AssetAttributes {
  schemaVersion: number;
  agentId?: string;
  autoScalingGroup?: string;
  amiId?: string;
  hostname?: string;
  ipv4Addresses?: string[];
  tags?: Tag[];
  networkInterfaces?: NetworkInterface[];
}
export type FindingId = string;
export type NumericSeverity = number;
export type IocConfidence = number;
export interface Finding {
  arn: string;
  schemaVersion?: number;
  service?: string;
  serviceAttributes?: InspectorServiceAttributes;
  assetType?: AssetType;
  assetAttributes?: AssetAttributes;
  id?: string;
  title?: string;
  description?: string;
  recommendation?: string;
  severity?: Severity;
  numericSeverity?: number;
  confidence?: number;
  indicatorOfCompromise?: boolean;
  attributes: Attribute[];
  userAttributes: Attribute[];
  createdAt: Date;
  updatedAt: Date;
}
export type FindingList = Finding[];
export interface DescribeFindingsResponse {
  findings: Finding[];
  failedItems: { [key: string]: FailedItemDetails | undefined };
}
export interface DescribeResourceGroupsRequest {
  resourceGroupArns: string[];
}
export interface ResourceGroup {
  arn: string;
  tags: ResourceGroupTag[];
  createdAt: Date;
}
export type ResourceGroupList = ResourceGroup[];
export interface DescribeResourceGroupsResponse {
  resourceGroups: ResourceGroup[];
  failedItems: { [key: string]: FailedItemDetails | undefined };
}
export interface DescribeRulesPackagesRequest {
  rulesPackageArns: string[];
  locale?: Locale;
}
export type RulesPackageName = string;
export type Version = string;
export type ProviderName = string;
export interface RulesPackage {
  arn: string;
  name: string;
  version: string;
  provider: string;
  description?: string;
}
export type RulesPackageList = RulesPackage[];
export interface DescribeRulesPackagesResponse {
  rulesPackages: RulesPackage[];
  failedItems: { [key: string]: FailedItemDetails | undefined };
}
export type ReportFileFormat = "HTML" | "PDF" | (string & {});
export type ReportType = "FINDING" | "FULL" | (string & {});
export interface GetAssessmentReportRequest {
  assessmentRunArn: string;
  reportFileFormat: ReportFileFormat;
  reportType: ReportType;
}
export type ReportStatus = "WORK_IN_PROGRESS" | "FAILED" | "COMPLETED" | (string & {});
export type Url = string;
export interface GetAssessmentReportResponse {
  status: ReportStatus;
  url?: string;
}
export type PaginationToken = string;
export type ListMaxResults = number;
export interface GetExclusionsPreviewRequest {
  assessmentTemplateArn: string;
  previewToken: string;
  nextToken?: string;
  maxResults?: number;
  locale?: Locale;
}
export type PreviewStatus = "WORK_IN_PROGRESS" | "COMPLETED" | (string & {});
export interface ExclusionPreview {
  title: string;
  description: string;
  recommendation: string;
  scopes: Scope[];
  attributes?: Attribute[];
}
export type ExclusionPreviewList = ExclusionPreview[];
export interface GetExclusionsPreviewResponse {
  previewStatus: PreviewStatus;
  exclusionPreviews?: ExclusionPreview[];
  nextToken?: string;
}
export interface GetTelemetryMetadataRequest {
  assessmentRunArn: string;
}
export type MessageType = string;
export interface TelemetryMetadata {
  messageType: string;
  count: number;
  dataSize?: number;
}
export type TelemetryMetadataList = TelemetryMetadata[];
export interface GetTelemetryMetadataResponse {
  telemetryMetadata: TelemetryMetadata[];
}
export type AgentHealth = "HEALTHY" | "UNHEALTHY" | "UNKNOWN" | (string & {});
export type AgentHealthList = AgentHealth[];
export type AgentHealthCode =
  | "IDLE"
  | "RUNNING"
  | "SHUTDOWN"
  | "UNHEALTHY"
  | "THROTTLED"
  | "UNKNOWN"
  | (string & {});
export type AgentHealthCodeList = AgentHealthCode[];
export interface AgentFilter {
  agentHealths: AgentHealth[];
  agentHealthCodes: AgentHealthCode[];
}
export interface ListAssessmentRunAgentsRequest {
  assessmentRunArn: string;
  filter?: AgentFilter;
  nextToken?: string;
  maxResults?: number;
}
export interface AssessmentRunAgent {
  agentId: string;
  assessmentRunArn: string;
  agentHealth: AgentHealth;
  agentHealthCode: AgentHealthCode;
  agentHealthDetails?: string;
  autoScalingGroup?: string;
  telemetryMetadata: TelemetryMetadata[];
}
export type AssessmentRunAgentList = AssessmentRunAgent[];
export interface ListAssessmentRunAgentsResponse {
  assessmentRunAgents: AssessmentRunAgent[];
  nextToken?: string;
}
export type ListParentArnList = string[];
export type NamePattern = string;
export type AssessmentRunStateList = AssessmentRunState[];
export interface DurationRange {
  minSeconds?: number;
  maxSeconds?: number;
}
export type FilterRulesPackageArnList = string[];
export interface TimestampRange {
  beginDate?: Date;
  endDate?: Date;
}
export interface AssessmentRunFilter {
  namePattern?: string;
  states?: AssessmentRunState[];
  durationRange?: DurationRange;
  rulesPackageArns?: string[];
  startTimeRange?: TimestampRange;
  completionTimeRange?: TimestampRange;
  stateChangeTimeRange?: TimestampRange;
}
export interface ListAssessmentRunsRequest {
  assessmentTemplateArns?: string[];
  filter?: AssessmentRunFilter;
  nextToken?: string;
  maxResults?: number;
}
export type ListReturnedArnList = string[];
export interface ListAssessmentRunsResponse {
  assessmentRunArns: string[];
  nextToken?: string;
}
export interface AssessmentTargetFilter {
  assessmentTargetNamePattern?: string;
}
export interface ListAssessmentTargetsRequest {
  filter?: AssessmentTargetFilter;
  nextToken?: string;
  maxResults?: number;
}
export interface ListAssessmentTargetsResponse {
  assessmentTargetArns: string[];
  nextToken?: string;
}
export interface AssessmentTemplateFilter {
  namePattern?: string;
  durationRange?: DurationRange;
  rulesPackageArns?: string[];
}
export interface ListAssessmentTemplatesRequest {
  assessmentTargetArns?: string[];
  filter?: AssessmentTemplateFilter;
  nextToken?: string;
  maxResults?: number;
}
export interface ListAssessmentTemplatesResponse {
  assessmentTemplateArns: string[];
  nextToken?: string;
}
export type ListEventSubscriptionsMaxResults = number;
export interface ListEventSubscriptionsRequest {
  resourceArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface EventSubscription {
  event: InspectorEvent;
  subscribedAt: Date;
}
export type EventSubscriptionList = EventSubscription[];
export interface Subscription {
  resourceArn: string;
  topicArn: string;
  eventSubscriptions: EventSubscription[];
}
export type SubscriptionList = Subscription[];
export interface ListEventSubscriptionsResponse {
  subscriptions: Subscription[];
  nextToken?: string;
}
export interface ListExclusionsRequest {
  assessmentRunArn: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ListExclusionsResponse {
  exclusionArns: string[];
  nextToken?: string;
}
export type AgentIdList = string[];
export type AutoScalingGroupList = string[];
export type RuleName = string;
export type RuleNameList = string[];
export type SeverityList = Severity[];
export interface FindingFilter {
  agentIds?: string[];
  autoScalingGroups?: string[];
  ruleNames?: string[];
  severities?: Severity[];
  rulesPackageArns?: string[];
  attributes?: Attribute[];
  userAttributes?: Attribute[];
  creationTimeRange?: TimestampRange;
}
export interface ListFindingsRequest {
  assessmentRunArns?: string[];
  filter?: FindingFilter;
  nextToken?: string;
  maxResults?: number;
}
export interface ListFindingsResponse {
  findingArns: string[];
  nextToken?: string;
}
export interface ListRulesPackagesRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface ListRulesPackagesResponse {
  rulesPackageArns: string[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export type TagList = Tag[];
export interface ListTagsForResourceResponse {
  tags: Tag[];
}
export type PreviewAgentsMaxResults = number;
export interface PreviewAgentsRequest {
  previewAgentsArn: string;
  nextToken?: string;
  maxResults?: number;
}
export type AgentVersion = string;
export type OperatingSystem = string;
export type KernelVersion = string;
export interface AgentPreview {
  hostname?: string;
  agentId: string;
  autoScalingGroup?: string;
  agentHealth?: AgentHealth;
  agentVersion?: string;
  operatingSystem?: string;
  kernelVersion?: string;
  ipv4Address?: string;
}
export type AgentPreviewList = AgentPreview[];
export interface PreviewAgentsResponse {
  agentPreviews: AgentPreview[];
  nextToken?: string;
}
export interface RegisterCrossAccountAccessRoleRequest {
  roleArn: string;
}
export interface RegisterCrossAccountAccessRoleResponse {}
export type UserAttributeKeyList = string[];
export interface RemoveAttributesFromFindingsRequest {
  findingArns: string[];
  attributeKeys: string[];
}
export interface RemoveAttributesFromFindingsResponse {
  failedItems: { [key: string]: FailedItemDetails | undefined };
}
export interface SetTagsForResourceRequest {
  resourceArn: string;
  tags?: Tag[];
}
export interface SetTagsForResourceResponse {}
export interface StartAssessmentRunRequest {
  assessmentTemplateArn: string;
  assessmentRunName?: string;
}
export interface StartAssessmentRunResponse {
  assessmentRunArn: string;
}
export type StopAction = "START_EVALUATION" | "SKIP_EVALUATION" | (string & {});
export interface StopAssessmentRunRequest {
  assessmentRunArn: string;
  stopAction?: StopAction;
}
export interface StopAssessmentRunResponse {}
export interface SubscribeToEventRequest {
  resourceArn: string;
  event: InspectorEvent;
  topicArn: string;
}
export interface SubscribeToEventResponse {}
export interface UnsubscribeFromEventRequest {
  resourceArn: string;
  event: InspectorEvent;
  topicArn: string;
}
export interface UnsubscribeFromEventResponse {}
export interface UpdateAssessmentTargetRequest {
  assessmentTargetArn: string;
  assessmentTargetName: string;
  resourceGroupArn?: string;
}
export interface UpdateAssessmentTargetResponse {}
export type ErrorMessage = string;
export type AccessDeniedErrorCode =
  | "ACCESS_DENIED_TO_ASSESSMENT_TARGET"
  | "ACCESS_DENIED_TO_ASSESSMENT_TEMPLATE"
  | "ACCESS_DENIED_TO_ASSESSMENT_RUN"
  | "ACCESS_DENIED_TO_FINDING"
  | "ACCESS_DENIED_TO_RESOURCE_GROUP"
  | "ACCESS_DENIED_TO_RULES_PACKAGE"
  | "ACCESS_DENIED_TO_SNS_TOPIC"
  | "ACCESS_DENIED_TO_IAM_ROLE"
  | (string & {});
export type InvalidInputErrorCode =
  | "INVALID_ASSESSMENT_TARGET_ARN"
  | "INVALID_ASSESSMENT_TEMPLATE_ARN"
  | "INVALID_ASSESSMENT_RUN_ARN"
  | "INVALID_FINDING_ARN"
  | "INVALID_RESOURCE_GROUP_ARN"
  | "INVALID_RULES_PACKAGE_ARN"
  | "INVALID_RESOURCE_ARN"
  | "INVALID_SNS_TOPIC_ARN"
  | "INVALID_IAM_ROLE_ARN"
  | "INVALID_ASSESSMENT_TARGET_NAME"
  | "INVALID_ASSESSMENT_TARGET_NAME_PATTERN"
  | "INVALID_ASSESSMENT_TEMPLATE_NAME"
  | "INVALID_ASSESSMENT_TEMPLATE_NAME_PATTERN"
  | "INVALID_ASSESSMENT_TEMPLATE_DURATION"
  | "INVALID_ASSESSMENT_TEMPLATE_DURATION_RANGE"
  | "INVALID_ASSESSMENT_RUN_DURATION_RANGE"
  | "INVALID_ASSESSMENT_RUN_START_TIME_RANGE"
  | "INVALID_ASSESSMENT_RUN_COMPLETION_TIME_RANGE"
  | "INVALID_ASSESSMENT_RUN_STATE_CHANGE_TIME_RANGE"
  | "INVALID_ASSESSMENT_RUN_STATE"
  | "INVALID_TAG"
  | "INVALID_TAG_KEY"
  | "INVALID_TAG_VALUE"
  | "INVALID_RESOURCE_GROUP_TAG_KEY"
  | "INVALID_RESOURCE_GROUP_TAG_VALUE"
  | "INVALID_ATTRIBUTE"
  | "INVALID_USER_ATTRIBUTE"
  | "INVALID_USER_ATTRIBUTE_KEY"
  | "INVALID_USER_ATTRIBUTE_VALUE"
  | "INVALID_PAGINATION_TOKEN"
  | "INVALID_MAX_RESULTS"
  | "INVALID_AGENT_ID"
  | "INVALID_AUTO_SCALING_GROUP"
  | "INVALID_RULE_NAME"
  | "INVALID_SEVERITY"
  | "INVALID_LOCALE"
  | "INVALID_EVENT"
  | "ASSESSMENT_TARGET_NAME_ALREADY_TAKEN"
  | "ASSESSMENT_TEMPLATE_NAME_ALREADY_TAKEN"
  | "INVALID_NUMBER_OF_ASSESSMENT_TARGET_ARNS"
  | "INVALID_NUMBER_OF_ASSESSMENT_TEMPLATE_ARNS"
  | "INVALID_NUMBER_OF_ASSESSMENT_RUN_ARNS"
  | "INVALID_NUMBER_OF_FINDING_ARNS"
  | "INVALID_NUMBER_OF_RESOURCE_GROUP_ARNS"
  | "INVALID_NUMBER_OF_RULES_PACKAGE_ARNS"
  | "INVALID_NUMBER_OF_ASSESSMENT_RUN_STATES"
  | "INVALID_NUMBER_OF_TAGS"
  | "INVALID_NUMBER_OF_RESOURCE_GROUP_TAGS"
  | "INVALID_NUMBER_OF_ATTRIBUTES"
  | "INVALID_NUMBER_OF_USER_ATTRIBUTES"
  | "INVALID_NUMBER_OF_AGENT_IDS"
  | "INVALID_NUMBER_OF_AUTO_SCALING_GROUPS"
  | "INVALID_NUMBER_OF_RULE_NAMES"
  | "INVALID_NUMBER_OF_SEVERITIES"
  | (string & {});
export type NoSuchEntityErrorCode =
  | "ASSESSMENT_TARGET_DOES_NOT_EXIST"
  | "ASSESSMENT_TEMPLATE_DOES_NOT_EXIST"
  | "ASSESSMENT_RUN_DOES_NOT_EXIST"
  | "FINDING_DOES_NOT_EXIST"
  | "RESOURCE_GROUP_DOES_NOT_EXIST"
  | "RULES_PACKAGE_DOES_NOT_EXIST"
  | "SNS_TOPIC_DOES_NOT_EXIST"
  | "IAM_ROLE_DOES_NOT_EXIST"
  | (string & {});
export type InvalidCrossAccountRoleErrorCode =
  | "ROLE_DOES_NOT_EXIST_OR_INVALID_TRUST_RELATIONSHIP"
  | "ROLE_DOES_NOT_HAVE_CORRECT_POLICY"
  | (string & {});
export type LimitExceededErrorCode =
  | "ASSESSMENT_TARGET_LIMIT_EXCEEDED"
  | "ASSESSMENT_TEMPLATE_LIMIT_EXCEEDED"
  | "ASSESSMENT_RUN_LIMIT_EXCEEDED"
  | "RESOURCE_GROUP_LIMIT_EXCEEDED"
  | "EVENT_SUBSCRIPTION_LIMIT_EXCEEDED"
  | (string & {});
export type AssessmentRunInProgressArnList = string[];
export interface AgentAlreadyRunningAssessment {
  agentId: string;
  assessmentRunArn: string;
}
export type AgentAlreadyRunningAssessmentList = AgentAlreadyRunningAssessment[];
export type AddAttributesToFindingsError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | ServiceTemporarilyUnavailableException
  | CommonErrors;
/**
 * Assigns attributes (key and value pairs) to the findings that are specified by the
 * ARNs of the findings.
 */
export const addAttributesToFindings: API.OperationMethod<
  AddAttributesToFindingsRequest,
  AddAttributesToFindingsResponse,
  AddAttributesToFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c1, 0) as any as S.Schema<AddAttributesToFindingsRequest>,
  output: __S(64, __c4, 0) as any as S.Schema<AddAttributesToFindingsResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
    ServiceTemporarilyUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddAttributesToFindings",
}));

export type CreateAssessmentTargetError =
  | AccessDeniedException
  | InternalException
  | InvalidCrossAccountRoleException
  | InvalidInputException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceTemporarilyUnavailableException
  | CommonErrors;
/**
 * Creates a new assessment target using the ARN of the resource group that is generated
 * by CreateResourceGroup. If resourceGroupArn is not specified, all EC2
 * instances in the current AWS account and region are included in the assessment target. If
 * the service-linked role isn't already registered, this action also creates and
 * registers a service-linked role to grant Amazon Inspector access to AWS Services needed to
 * perform security assessments. You can create up to 50 assessment targets per AWS account.
 * You can run up to 500 concurrent agents per AWS account. For more information, see
 * Amazon Inspector Assessment Targets.
 */
export const createAssessmentTarget: API.OperationMethod<
  CreateAssessmentTargetRequest,
  CreateAssessmentTargetResponse,
  CreateAssessmentTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<CreateAssessmentTargetRequest>,
  output: __S(81, __c5, 1) as any as S.Schema<CreateAssessmentTargetResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidCrossAccountRoleException,
    InvalidInputException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceTemporarilyUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAssessmentTarget",
}));

export type CreateAssessmentTemplateError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceTemporarilyUnavailableException
  | CommonErrors;
/**
 * Creates an assessment template for the assessment target that is specified by the ARN
 * of the assessment target. If the service-linked role isn't already registered, this action also creates and
 * registers a service-linked role to grant Amazon Inspector access to AWS Services needed to
 * perform security assessments.
 */
export const createAssessmentTemplate: API.OperationMethod<
  CreateAssessmentTemplateRequest,
  CreateAssessmentTemplateResponse,
  CreateAssessmentTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<CreateAssessmentTemplateRequest>,
  output: __S(97, __c6, 1) as any as S.Schema<CreateAssessmentTemplateResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceTemporarilyUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAssessmentTemplate",
}));

export type CreateExclusionsPreviewError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | PreviewGenerationInProgressException
  | ServiceTemporarilyUnavailableException
  | CommonErrors;
/**
 * Starts the generation of an exclusions preview for the specified assessment template.
 * The exclusions preview lists the potential exclusions (ExclusionPreview) that Inspector can
 * detect before it runs the assessment.
 */
export const createExclusionsPreview: API.OperationMethod<
  CreateExclusionsPreviewRequest,
  CreateExclusionsPreviewResponse,
  CreateExclusionsPreviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<CreateExclusionsPreviewRequest>,
  output: __S(113, __c7, 1) as any as S.Schema<CreateExclusionsPreviewResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
    PreviewGenerationInProgressException,
    ServiceTemporarilyUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateExclusionsPreview",
}));

export type CreateResourceGroupError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | LimitExceededException
  | ServiceTemporarilyUnavailableException
  | CommonErrors;
/**
 * Creates a resource group using the specified set of tags (key and value pairs) that
 * are used to select the EC2 instances to be included in an Amazon Inspector assessment
 * target. The created resource group is then used to create an Amazon Inspector assessment
 * target. For more information, see CreateAssessmentTarget.
 */
export const createResourceGroup: API.OperationMethod<
  CreateResourceGroupRequest,
  CreateResourceGroupResponse,
  CreateResourceGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<CreateResourceGroupRequest>,
  output: __S(129, __c8, 1) as any as S.Schema<CreateResourceGroupResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    LimitExceededException,
    ServiceTemporarilyUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResourceGroup",
}));

export type DeleteAssessmentRunError =
  | AccessDeniedException
  | AssessmentRunInProgressException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | ServiceTemporarilyUnavailableException
  | CommonErrors;
/**
 * Deletes the assessment run that is specified by the ARN of the assessment
 * run.
 */
export const deleteAssessmentRun: API.OperationMethod<
  DeleteAssessmentRunRequest,
  DeleteAssessmentRunResponse,
  DeleteAssessmentRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<DeleteAssessmentRunRequest>,
  output: __S(160, __c10, 0) as any as S.Schema<DeleteAssessmentRunResponse>,
  errors: [
    AccessDeniedException,
    AssessmentRunInProgressException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
    ServiceTemporarilyUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAssessmentRun",
}));

export type DeleteAssessmentTargetError =
  | AccessDeniedException
  | AssessmentRunInProgressException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | ServiceTemporarilyUnavailableException
  | CommonErrors;
/**
 * Deletes the assessment target that is specified by the ARN of the assessment
 * target.
 */
export const deleteAssessmentTarget: API.OperationMethod<
  DeleteAssessmentTargetRequest,
  DeleteAssessmentTargetResponse,
  DeleteAssessmentTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<DeleteAssessmentTargetRequest>,
  output: __S(160, __c10, 0) as any as S.Schema<DeleteAssessmentTargetResponse>,
  errors: [
    AccessDeniedException,
    AssessmentRunInProgressException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
    ServiceTemporarilyUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAssessmentTarget",
}));

export type DeleteAssessmentTemplateError =
  | AccessDeniedException
  | AssessmentRunInProgressException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | ServiceTemporarilyUnavailableException
  | CommonErrors;
/**
 * Deletes the assessment template that is specified by the ARN of the assessment
 * template.
 */
export const deleteAssessmentTemplate: API.OperationMethod<
  DeleteAssessmentTemplateRequest,
  DeleteAssessmentTemplateResponse,
  DeleteAssessmentTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<DeleteAssessmentTemplateRequest>,
  output: __S(160, __c10, 0) as any as S.Schema<DeleteAssessmentTemplateResponse>,
  errors: [
    AccessDeniedException,
    AssessmentRunInProgressException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
    ServiceTemporarilyUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAssessmentTemplate",
}));

export type DescribeAssessmentRunsError = InternalException | InvalidInputException | CommonErrors;
/**
 * Describes the assessment runs that are specified by the ARNs of the assessment
 * runs.
 */
export const describeAssessmentRuns: API.OperationMethod<
  DescribeAssessmentRunsRequest,
  DescribeAssessmentRunsResponse,
  DescribeAssessmentRunsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<DescribeAssessmentRunsRequest>,
  output: __S(216, __c13, 8) as any as S.Schema<DescribeAssessmentRunsResponse>,
  errors: [InternalException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAssessmentRuns",
}));

export type DescribeAssessmentTargetsError =
  | InternalException
  | InvalidInputException
  | CommonErrors;
/**
 * Describes the assessment targets that are specified by the ARNs of the assessment
 * targets.
 */
export const describeAssessmentTargets: API.OperationMethod<
  DescribeAssessmentTargetsRequest,
  DescribeAssessmentTargetsResponse,
  DescribeAssessmentTargetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<DescribeAssessmentTargetsRequest>,
  output: __S(243, __c15, 3) as any as S.Schema<DescribeAssessmentTargetsResponse>,
  errors: [InternalException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAssessmentTargets",
}));

export type DescribeAssessmentTemplatesError =
  | InternalException
  | InvalidInputException
  | CommonErrors;
/**
 * Describes the assessment templates that are specified by the ARNs of the assessment
 * templates.
 */
export const describeAssessmentTemplates: API.OperationMethod<
  DescribeAssessmentTemplatesRequest,
  DescribeAssessmentTemplatesResponse,
  DescribeAssessmentTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<DescribeAssessmentTemplatesRequest>,
  output: __S(259, __c16, 3) as any as S.Schema<DescribeAssessmentTemplatesResponse>,
  errors: [InternalException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAssessmentTemplates",
}));

export type DescribeCrossAccountAccessRoleError = InternalException | CommonErrors;
/**
 * Describes the IAM role that enables Amazon Inspector to access your AWS
 * account.
 */
export const describeCrossAccountAccessRole: API.OperationMethod<
  DescribeCrossAccountAccessRoleRequest,
  DescribeCrossAccountAccessRoleResponse,
  DescribeCrossAccountAccessRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<DescribeCrossAccountAccessRoleRequest>,
  output: __S(273, __c17, 1) as any as S.Schema<DescribeCrossAccountAccessRoleResponse>,
  errors: [InternalException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCrossAccountAccessRole",
}));

export type DescribeExclusionsError = InternalException | InvalidInputException | CommonErrors;
/**
 * Describes the exclusions that are specified by the exclusions' ARNs.
 */
export const describeExclusions: API.OperationMethod<
  DescribeExclusionsRequest,
  DescribeExclusionsResponse,
  DescribeExclusionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<DescribeExclusionsRequest>,
  output: __S(291, __c18, 3) as any as S.Schema<DescribeExclusionsResponse>,
  errors: [InternalException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeExclusions",
}));

export type DescribeFindingsError = InternalException | InvalidInputException | CommonErrors;
/**
 * Describes the findings that are specified by the ARNs of the findings.
 */
export const describeFindings: API.OperationMethod<
  DescribeFindingsRequest,
  DescribeFindingsResponse,
  DescribeFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<DescribeFindingsRequest>,
  output: __S(331, __c20, 11) as any as S.Schema<DescribeFindingsResponse>,
  errors: [InternalException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFindings",
}));

export type DescribeResourceGroupsError = InternalException | InvalidInputException | CommonErrors;
/**
 * Describes the resource groups that are specified by the ARNs of the resource
 * groups.
 */
export const describeResourceGroups: API.OperationMethod<
  DescribeResourceGroupsRequest,
  DescribeResourceGroupsResponse,
  DescribeResourceGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<DescribeResourceGroupsRequest>,
  output: __S(339, __c21, 3) as any as S.Schema<DescribeResourceGroupsResponse>,
  errors: [InternalException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeResourceGroups",
}));

export type DescribeRulesPackagesError = InternalException | InvalidInputException | CommonErrors;
/**
 * Describes the rules packages that are specified by the ARNs of the rules
 * packages.
 */
export const describeRulesPackages: API.OperationMethod<
  DescribeRulesPackagesRequest,
  DescribeRulesPackagesResponse,
  DescribeRulesPackagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<DescribeRulesPackagesRequest>,
  output: __S(355, __c22, 3) as any as S.Schema<DescribeRulesPackagesResponse>,
  errors: [InternalException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRulesPackages",
}));

export type GetAssessmentReportError =
  | AccessDeniedException
  | AssessmentRunInProgressException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | ServiceTemporarilyUnavailableException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Produces an assessment report that includes detailed and comprehensive results of a
 * specified assessment run.
 */
export const getAssessmentReport: API.OperationMethod<
  GetAssessmentReportRequest,
  GetAssessmentReportResponse,
  GetAssessmentReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<GetAssessmentReportRequest>,
  output: __S(369, __c23, 1) as any as S.Schema<GetAssessmentReportResponse>,
  errors: [
    AccessDeniedException,
    AssessmentRunInProgressException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
    ServiceTemporarilyUnavailableException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssessmentReport",
}));

export type GetExclusionsPreviewError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | CommonErrors;
/**
 * Retrieves the exclusions preview (a list of ExclusionPreview objects) specified by
 * the preview token. You can obtain the preview token by running the CreateExclusionsPreview
 * API.
 */
export const getExclusionsPreview: API.PaginatedOperationMethod<
  GetExclusionsPreviewRequest,
  GetExclusionsPreviewResponse,
  GetExclusionsPreviewError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<GetExclusionsPreviewRequest>,
  output: __S(387, __c24, 3) as any as S.Schema<GetExclusionsPreviewResponse>,
  errors: [AccessDeniedException, InternalException, InvalidInputException, NoSuchEntityException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExclusionsPreview",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetTelemetryMetadataError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | CommonErrors;
/**
 * Information about the data that is collected for the specified assessment
 * run.
 */
export const getTelemetryMetadata: API.OperationMethod<
  GetTelemetryMetadataRequest,
  GetTelemetryMetadataResponse,
  GetTelemetryMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<GetTelemetryMetadataRequest>,
  output: __S(401, __c25, 1) as any as S.Schema<GetTelemetryMetadataResponse>,
  errors: [AccessDeniedException, InternalException, InvalidInputException, NoSuchEntityException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTelemetryMetadata",
}));

export type ListAssessmentRunAgentsError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | CommonErrors;
/**
 * Lists the agents of the assessment runs that are specified by the ARNs of the
 * assessment runs.
 */
export const listAssessmentRunAgents: API.PaginatedOperationMethod<
  ListAssessmentRunAgentsRequest,
  ListAssessmentRunAgentsResponse,
  ListAssessmentRunAgentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(433, __c27, 1) as any as S.Schema<ListAssessmentRunAgentsRequest>,
  output: __S(436, __c27, 4) as any as S.Schema<ListAssessmentRunAgentsResponse>,
  errors: [AccessDeniedException, InternalException, InvalidInputException, NoSuchEntityException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssessmentRunAgents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssessmentRunsError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | CommonErrors;
/**
 * Lists the assessment runs that correspond to the assessment templates that are
 * specified by the ARNs of the assessment templates.
 */
export const listAssessmentRuns: API.PaginatedOperationMethod<
  ListAssessmentRunsRequest,
  ListAssessmentRunsResponse,
  ListAssessmentRunsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(465, __c29, 1) as any as S.Schema<ListAssessmentRunsRequest>,
  output: __S(466, __c29, 2) as any as S.Schema<ListAssessmentRunsResponse>,
  errors: [AccessDeniedException, InternalException, InvalidInputException, NoSuchEntityException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssessmentRuns",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssessmentTargetsError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | CommonErrors;
/**
 * Lists the ARNs of the assessment targets within this AWS account. For more
 * information about assessment targets, see Amazon Inspector Assessment
 * Targets.
 */
export const listAssessmentTargets: API.PaginatedOperationMethod<
  ListAssessmentTargetsRequest,
  ListAssessmentTargetsResponse,
  ListAssessmentTargetsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(513, __c32, 1) as any as S.Schema<ListAssessmentTargetsRequest>,
  output: __S(514, __c32, 2) as any as S.Schema<ListAssessmentTargetsResponse>,
  errors: [AccessDeniedException, InternalException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssessmentTargets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssessmentTemplatesError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | CommonErrors;
/**
 * Lists the assessment templates that correspond to the assessment targets that are
 * specified by the ARNs of the assessment targets.
 */
export const listAssessmentTemplates: API.PaginatedOperationMethod<
  ListAssessmentTemplatesRequest,
  ListAssessmentTemplatesResponse,
  ListAssessmentTemplatesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(529, __c33, 1) as any as S.Schema<ListAssessmentTemplatesRequest>,
  output: __S(530, __c33, 2) as any as S.Schema<ListAssessmentTemplatesResponse>,
  errors: [AccessDeniedException, InternalException, InvalidInputException, NoSuchEntityException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssessmentTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEventSubscriptionsError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | CommonErrors;
/**
 * Lists all the event subscriptions for the assessment template that is specified by
 * the ARN of the assessment template. For more information, see SubscribeToEvent and UnsubscribeFromEvent.
 */
export const listEventSubscriptions: API.PaginatedOperationMethod<
  ListEventSubscriptionsRequest,
  ListEventSubscriptionsResponse,
  ListEventSubscriptionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(544, __c34, 0) as any as S.Schema<ListEventSubscriptionsRequest>,
  output: __S(549, __c34, 5) as any as S.Schema<ListEventSubscriptionsResponse>,
  errors: [AccessDeniedException, InternalException, InvalidInputException, NoSuchEntityException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEventSubscriptions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListExclusionsError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | CommonErrors;
/**
 * List exclusions that are generated by the assessment run.
 */
export const listExclusions: API.PaginatedOperationMethod<
  ListExclusionsRequest,
  ListExclusionsResponse,
  ListExclusionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(560, __c35, 0) as any as S.Schema<ListExclusionsRequest>,
  output: __S(561, __c35, 1) as any as S.Schema<ListExclusionsResponse>,
  errors: [AccessDeniedException, InternalException, InvalidInputException, NoSuchEntityException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExclusions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFindingsError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | CommonErrors;
/**
 * Lists findings that are generated by the assessment runs that are specified by the
 * ARNs of the assessment runs.
 */
export const listFindings: API.PaginatedOperationMethod<
  ListFindingsRequest,
  ListFindingsResponse,
  ListFindingsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(577, __c36, 1) as any as S.Schema<ListFindingsRequest>,
  output: __S(578, __c36, 2) as any as S.Schema<ListFindingsResponse>,
  errors: [AccessDeniedException, InternalException, InvalidInputException, NoSuchEntityException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFindings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRulesPackagesError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | CommonErrors;
/**
 * Lists all available Amazon Inspector rules packages.
 */
export const listRulesPackages: API.PaginatedOperationMethod<
  ListRulesPackagesRequest,
  ListRulesPackagesResponse,
  ListRulesPackagesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(592, __c37, 0) as any as S.Schema<ListRulesPackagesRequest>,
  output: __S(593, __c37, 1) as any as S.Schema<ListRulesPackagesResponse>,
  errors: [AccessDeniedException, InternalException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRulesPackages",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | CommonErrors;
/**
 * Lists all tags associated with an assessment template.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c38, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(609, __c38, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [AccessDeniedException, InternalException, InvalidInputException, NoSuchEntityException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PreviewAgentsError =
  | AccessDeniedException
  | InternalException
  | InvalidCrossAccountRoleException
  | InvalidInputException
  | NoSuchEntityException
  | CommonErrors;
/**
 * Previews the agents installed on the EC2 instances that are part of the specified
 * assessment target.
 */
export const previewAgents: API.PaginatedOperationMethod<
  PreviewAgentsRequest,
  PreviewAgentsResponse,
  PreviewAgentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(624, __c39, 0) as any as S.Schema<PreviewAgentsRequest>,
  output: __S(627, __c39, 3) as any as S.Schema<PreviewAgentsResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidCrossAccountRoleException,
    InvalidInputException,
    NoSuchEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PreviewAgents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type RegisterCrossAccountAccessRoleError =
  | AccessDeniedException
  | InternalException
  | InvalidCrossAccountRoleException
  | InvalidInputException
  | ServiceTemporarilyUnavailableException
  | CommonErrors;
/**
 * Registers the IAM role that grants Amazon Inspector access to AWS Services needed to
 * perform security assessments.
 */
export const registerCrossAccountAccessRole: API.OperationMethod<
  RegisterCrossAccountAccessRoleRequest,
  RegisterCrossAccountAccessRoleResponse,
  RegisterCrossAccountAccessRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c40, 0) as any as S.Schema<RegisterCrossAccountAccessRoleRequest>,
  output: __S(160, __c10, 0) as any as S.Schema<RegisterCrossAccountAccessRoleResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidCrossAccountRoleException,
    InvalidInputException,
    ServiceTemporarilyUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterCrossAccountAccessRole",
}));

export type RemoveAttributesFromFindingsError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | ServiceTemporarilyUnavailableException
  | CommonErrors;
/**
 * Removes entire attributes (key and value pairs) from the findings that are specified
 * by the ARNs of the findings where an attribute with the specified key exists.
 */
export const removeAttributesFromFindings: API.OperationMethod<
  RemoveAttributesFromFindingsRequest,
  RemoveAttributesFromFindingsResponse,
  RemoveAttributesFromFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(656, __c41, 0) as any as S.Schema<RemoveAttributesFromFindingsRequest>,
  output: __S(64, __c4, 0) as any as S.Schema<RemoveAttributesFromFindingsResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
    ServiceTemporarilyUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveAttributesFromFindings",
}));

export type SetTagsForResourceError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | ServiceTemporarilyUnavailableException
  | CommonErrors;
/**
 * Sets tags (key and value pairs) to the assessment template that is specified by the
 * ARN of the assessment template.
 */
export const setTagsForResource: API.OperationMethod<
  SetTagsForResourceRequest,
  SetTagsForResourceResponse,
  SetTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c42, 0) as any as S.Schema<SetTagsForResourceRequest>,
  output: __S(160, __c10, 0) as any as S.Schema<SetTagsForResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
    ServiceTemporarilyUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetTagsForResource",
}));

export type StartAssessmentRunError =
  | AccessDeniedException
  | AgentsAlreadyRunningAssessmentException
  | InternalException
  | InvalidCrossAccountRoleException
  | InvalidInputException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceTemporarilyUnavailableException
  | CommonErrors;
/**
 * Starts the assessment run specified by the ARN of the assessment template. For this
 * API to function properly, you must not exceed the limit of running up to 500 concurrent
 * agents per AWS account.
 */
export const startAssessmentRun: API.OperationMethod<
  StartAssessmentRunRequest,
  StartAssessmentRunResponse,
  StartAssessmentRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(688, __c43, 0) as any as S.Schema<StartAssessmentRunRequest>,
  output: __S(689, __c43, 1) as any as S.Schema<StartAssessmentRunResponse>,
  errors: [
    AccessDeniedException,
    AgentsAlreadyRunningAssessmentException,
    InternalException,
    InvalidCrossAccountRoleException,
    InvalidInputException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceTemporarilyUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAssessmentRun",
}));

export type StopAssessmentRunError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | ServiceTemporarilyUnavailableException
  | CommonErrors;
/**
 * Stops the assessment run that is specified by the ARN of the assessment
 * run.
 */
export const stopAssessmentRun: API.OperationMethod<
  StopAssessmentRunRequest,
  StopAssessmentRunResponse,
  StopAssessmentRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c44, 0) as any as S.Schema<StopAssessmentRunRequest>,
  output: __S(160, __c10, 0) as any as S.Schema<StopAssessmentRunResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
    ServiceTemporarilyUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopAssessmentRun",
}));

export type SubscribeToEventError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | LimitExceededException
  | NoSuchEntityException
  | ServiceTemporarilyUnavailableException
  | CommonErrors;
/**
 * Enables the process of sending Amazon Simple Notification Service (SNS) notifications
 * about a specified event to a specified SNS topic.
 */
export const subscribeToEvent: API.OperationMethod<
  SubscribeToEventRequest,
  SubscribeToEventResponse,
  SubscribeToEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(720, __c45, 0) as any as S.Schema<SubscribeToEventRequest>,
  output: __S(160, __c10, 0) as any as S.Schema<SubscribeToEventResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    LimitExceededException,
    NoSuchEntityException,
    ServiceTemporarilyUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SubscribeToEvent",
}));

export type UnsubscribeFromEventError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | ServiceTemporarilyUnavailableException
  | CommonErrors;
/**
 * Disables the process of sending Amazon Simple Notification Service (SNS)
 * notifications about a specified event to a specified SNS topic.
 */
export const unsubscribeFromEvent: API.OperationMethod<
  UnsubscribeFromEventRequest,
  UnsubscribeFromEventResponse,
  UnsubscribeFromEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c46, 0) as any as S.Schema<UnsubscribeFromEventRequest>,
  output: __S(160, __c10, 0) as any as S.Schema<UnsubscribeFromEventResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
    ServiceTemporarilyUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UnsubscribeFromEvent",
}));

export type UpdateAssessmentTargetError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | NoSuchEntityException
  | ServiceTemporarilyUnavailableException
  | CommonErrors;
/**
 * Updates the assessment target that is specified by the ARN of the assessment
 * target.
 *
 * If resourceGroupArn is not specified, all EC2 instances in the current AWS account
 * and region are included in the assessment target.
 */
export const updateAssessmentTarget: API.OperationMethod<
  UpdateAssessmentTargetRequest,
  UpdateAssessmentTargetResponse,
  UpdateAssessmentTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(752, __c47, 0) as any as S.Schema<UpdateAssessmentTargetRequest>,
  output: __S(160, __c10, 0) as any as S.Schema<UpdateAssessmentTargetResponse>,
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
    ServiceTemporarilyUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAssessmentTarget",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ agentId: S.String, assessmentRunArn: S.String })).annotate({
        identifier: "AgentAlreadyRunningAssessment",
      });
    case 1:
      return S.Array(__S(0, __c0, 0));
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ findingArns: __S(224, __c14, 0), attributes: __S(33, __c2, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AddAttributesToFindingsRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, value: S.optional(S.String) })).annotate({
        identifier: "Attribute",
      });
    case 1:
      return S.Array(__S(32, __c2, 0));
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ failureCode: S.String, retryable: S.Boolean })).annotate({
        identifier: "FailedItemDetails",
      });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(48, __c3, 0).pipe(S.optional));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ failedItems: __S(49, __c3, 1) })).annotate({
        identifier: "AddAttributesToFindingsResponse",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ assessmentTargetName: S.String, resourceGroupArn: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateAssessmentTargetRequest" });
    case 1:
      return S.suspend(() => S.Struct({ assessmentTargetArn: S.String })).annotate({
        identifier: "CreateAssessmentTargetResponse",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assessmentTargetArn: S.String,
          assessmentTemplateName: S.String,
          durationInSeconds: S.Number,
          rulesPackageArns: __S(224, __c14, 0),
          userAttributesForFindings: S.optional(__S(33, __c2, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAssessmentTemplateRequest" });
    case 1:
      return S.suspend(() => S.Struct({ assessmentTemplateArn: S.String })).annotate({
        identifier: "CreateAssessmentTemplateResponse",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ assessmentTemplateArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateExclusionsPreviewRequest" });
    case 1:
      return S.suspend(() => S.Struct({ previewToken: S.String })).annotate({
        identifier: "CreateExclusionsPreviewResponse",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceGroupTags: __S(33, __c2, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateResourceGroupRequest" });
    case 1:
      return S.suspend(() => S.Struct({ resourceGroupArn: S.String })).annotate({
        identifier: "CreateResourceGroupResponse",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ assessmentRunArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteAssessmentRunRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteAssessmentRunResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ assessmentTargetArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteAssessmentTargetRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ assessmentTemplateArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteAssessmentTemplateRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ assessmentRunArns: __S(224, __c14, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeAssessmentRunsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          stateChangedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          state: S.String,
        }),
      ).annotate({ identifier: "AssessmentRunStateChange" });
    case 2:
      return S.Array(__S(209, __c13, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          date: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          event: S.String,
          message: S.optional(S.String),
          error: S.Boolean,
          snsTopicArn: S.optional(S.String),
          snsPublishStatusCode: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssessmentRunNotification" });
    case 4:
      return S.Array(__S(211, __c13, 3));
    case 5:
      return S.Record(S.String, /*@__PURE__*/ S.Number.pipe(S.optional));
    case 6:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          name: S.String,
          assessmentTemplateArn: S.String,
          state: S.String,
          durationInSeconds: S.Number,
          rulesPackageArns: __S(224, __c14, 0),
          userAttributesForFindings: __S(33, __c2, 1),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          completedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          stateChangedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          dataCollected: S.Boolean,
          stateChanges: __S(210, __c13, 2),
          notifications: __S(212, __c13, 4),
          findingCounts: __S(213, __c13, 5),
        }),
      ).annotate({ identifier: "AssessmentRun" });
    case 7:
      return S.Array(__S(214, __c13, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({ assessmentRuns: __S(215, __c13, 7), failedItems: __S(49, __c3, 1) }),
      ).annotate({ identifier: "DescribeAssessmentRunsResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ assessmentTargetArns: __S(224, __c14, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeAssessmentTargetsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          name: S.String,
          resourceGroupArn: S.optional(S.String),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "AssessmentTarget" });
    case 2:
      return S.Array(__S(241, __c15, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ assessmentTargets: __S(242, __c15, 2), failedItems: __S(49, __c3, 1) }),
      ).annotate({ identifier: "DescribeAssessmentTargetsResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ assessmentTemplateArns: __S(224, __c14, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeAssessmentTemplatesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          name: S.String,
          assessmentTargetArn: S.String,
          durationInSeconds: S.Number,
          rulesPackageArns: __S(224, __c14, 0),
          userAttributesForFindings: __S(33, __c2, 1),
          lastAssessmentRunArn: S.optional(S.String),
          assessmentRunCount: S.Number,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "AssessmentTemplate" });
    case 2:
      return S.Array(__S(257, __c16, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ assessmentTemplates: __S(258, __c16, 2), failedItems: __S(49, __c3, 1) }),
      ).annotate({ identifier: "DescribeAssessmentTemplatesResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeCrossAccountAccessRoleRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          roleArn: S.String,
          valid: S.Boolean,
          registeredAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "DescribeCrossAccountAccessRoleResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ exclusionArns: __S(224, __c14, 0), locale: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeExclusionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          title: S.String,
          description: S.String,
          recommendation: S.String,
          scopes: __S(305, __c19, 1),
          attributes: S.optional(__S(33, __c2, 1)),
        }),
      ).annotate({ identifier: "Exclusion" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(289, __c18, 1).pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({ exclusions: __S(290, __c18, 2), failedItems: __S(49, __c3, 1) }),
      ).annotate({ identifier: "DescribeExclusionsResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ key: S.optional(S.String), value: S.optional(S.String) }),
      ).annotate({ identifier: "Scope" });
    case 1:
      return S.Array(__S(304, __c19, 0));
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ findingArns: __S(224, __c14, 0), locale: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeFindingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          schemaVersion: S.Number,
          assessmentRunArn: S.optional(S.String),
          rulesPackageArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "InspectorServiceAttributes" });
    case 2:
      return S.suspend(() =>
        S.Struct({ privateDnsName: S.optional(S.String), privateIpAddress: S.optional(S.String) }),
      ).annotate({ identifier: "PrivateIp" });
    case 3:
      return S.Array(__S(322, __c20, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ groupName: S.optional(S.String), groupId: S.optional(S.String) }),
      ).annotate({ identifier: "SecurityGroup" });
    case 5:
      return S.Array(__S(324, __c20, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          networkInterfaceId: S.optional(S.String),
          subnetId: S.optional(S.String),
          vpcId: S.optional(S.String),
          privateDnsName: S.optional(S.String),
          privateIpAddress: S.optional(S.String),
          privateIpAddresses: S.optional(__S(323, __c20, 3)),
          publicDnsName: S.optional(S.String),
          publicIp: S.optional(S.String),
          ipv6Addresses: S.optional(__S(224, __c14, 0)),
          securityGroups: S.optional(__S(325, __c20, 5)),
        }),
      ).annotate({ identifier: "NetworkInterface" });
    case 7:
      return S.Array(__S(326, __c20, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          schemaVersion: S.Number,
          agentId: S.optional(S.String),
          autoScalingGroup: S.optional(S.String),
          amiId: S.optional(S.String),
          hostname: S.optional(S.String),
          ipv4Addresses: S.optional(__S(224, __c14, 0)),
          tags: S.optional(__S(33, __c2, 1)),
          networkInterfaces: S.optional(__S(327, __c20, 7)),
        }),
      ).annotate({ identifier: "AssetAttributes" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          schemaVersion: S.optional(S.Number),
          service: S.optional(S.String),
          serviceAttributes: S.optional(__S(321, __c20, 1)),
          assetType: S.optional(S.String),
          assetAttributes: S.optional(__S(328, __c20, 8)),
          id: S.optional(S.String),
          title: S.optional(S.String),
          description: S.optional(S.String),
          recommendation: S.optional(S.String),
          severity: S.optional(S.String),
          numericSeverity: S.optional(S.Number),
          confidence: S.optional(S.Number),
          indicatorOfCompromise: S.optional(S.Boolean),
          attributes: __S(33, __c2, 1),
          userAttributes: __S(33, __c2, 1),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "Finding" });
    case 10:
      return S.Array(__S(329, __c20, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({ findings: __S(330, __c20, 10), failedItems: __S(49, __c3, 1) }),
      ).annotate({ identifier: "DescribeFindingsResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceGroupArns: __S(224, __c14, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeResourceGroupsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          tags: __S(33, __c2, 1),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "ResourceGroup" });
    case 2:
      return S.Array(__S(337, __c21, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ resourceGroups: __S(338, __c21, 2), failedItems: __S(49, __c3, 1) }),
      ).annotate({ identifier: "DescribeResourceGroupsResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ rulesPackageArns: __S(224, __c14, 0), locale: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeRulesPackagesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          name: S.String,
          version: S.String,
          provider: S.String,
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "RulesPackage" });
    case 2:
      return S.Array(__S(353, __c22, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ rulesPackages: __S(354, __c22, 2), failedItems: __S(49, __c3, 1) }),
      ).annotate({ identifier: "DescribeRulesPackagesResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assessmentRunArn: S.String,
          reportFileFormat: S.String,
          reportType: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetAssessmentReportRequest" });
    case 1:
      return S.suspend(() => S.Struct({ status: S.String, url: S.optional(S.String) })).annotate({
        identifier: "GetAssessmentReportResponse",
      });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assessmentTemplateArn: S.String,
          previewToken: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          locale: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetExclusionsPreviewRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          title: S.String,
          description: S.String,
          recommendation: S.String,
          scopes: __S(305, __c19, 1),
          attributes: S.optional(__S(33, __c2, 1)),
        }),
      ).annotate({ identifier: "ExclusionPreview" });
    case 2:
      return S.Array(__S(385, __c24, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          previewStatus: S.String,
          exclusionPreviews: S.optional(__S(386, __c24, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetExclusionsPreviewResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ assessmentRunArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetTelemetryMetadataRequest" });
    case 1:
      return S.suspend(() => S.Struct({ telemetryMetadata: __S(417, __c26, 1) })).annotate({
        identifier: "GetTelemetryMetadataResponse",
      });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ messageType: S.String, count: S.Number, dataSize: S.optional(S.Number) }),
      ).annotate({ identifier: "TelemetryMetadata" });
    case 1:
      return S.Array(__S(416, __c26, 0));
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ agentHealths: __S(448, __c28, 0), agentHealthCodes: __S(448, __c28, 0) }),
      ).annotate({ identifier: "AgentFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          assessmentRunArn: S.String,
          filter: S.optional(__S(432, __c27, 0)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAssessmentRunAgentsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String,
          assessmentRunArn: S.String,
          agentHealth: S.String,
          agentHealthCode: S.String,
          agentHealthDetails: S.optional(S.String),
          autoScalingGroup: S.optional(S.String),
          telemetryMetadata: __S(417, __c26, 1),
        }),
      ).annotate({ identifier: "AssessmentRunAgent" });
    case 3:
      return S.Array(__S(434, __c27, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ assessmentRunAgents: __S(435, __c27, 3), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAssessmentRunAgentsResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          namePattern: S.optional(S.String),
          states: S.optional(__S(448, __c28, 0)),
          durationRange: S.optional(__S(480, __c30, 0)),
          rulesPackageArns: S.optional(__S(224, __c14, 0)),
          startTimeRange: S.optional(__S(496, __c31, 0)),
          completionTimeRange: S.optional(__S(496, __c31, 0)),
          stateChangeTimeRange: S.optional(__S(496, __c31, 0)),
        }),
      ).annotate({ identifier: "AssessmentRunFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          assessmentTemplateArns: S.optional(__S(224, __c14, 0)),
          filter: S.optional(__S(464, __c29, 0)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAssessmentRunsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ assessmentRunArns: __S(224, __c14, 0), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAssessmentRunsResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ minSeconds: S.optional(S.Number), maxSeconds: S.optional(S.Number) }),
      ).annotate({ identifier: "DurationRange" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          beginDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "TimestampRange" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ assessmentTargetNamePattern: S.optional(S.String) }),
      ).annotate({ identifier: "AssessmentTargetFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          filter: S.optional(__S(512, __c32, 0)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAssessmentTargetsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ assessmentTargetArns: __S(224, __c14, 0), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAssessmentTargetsResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          namePattern: S.optional(S.String),
          durationRange: S.optional(__S(480, __c30, 0)),
          rulesPackageArns: S.optional(__S(224, __c14, 0)),
        }),
      ).annotate({ identifier: "AssessmentTemplateFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          assessmentTargetArns: S.optional(__S(224, __c14, 0)),
          filter: S.optional(__S(528, __c33, 0)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAssessmentTemplatesRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ assessmentTemplateArns: __S(224, __c14, 0), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAssessmentTemplatesResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListEventSubscriptionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          event: S.String,
          subscribedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "EventSubscription" });
    case 2:
      return S.Array(__S(545, __c34, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String,
          topicArn: S.String,
          eventSubscriptions: __S(546, __c34, 2),
        }),
      ).annotate({ identifier: "Subscription" });
    case 4:
      return S.Array(__S(547, __c34, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ subscriptions: __S(548, __c34, 4), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListEventSubscriptionsResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assessmentRunArn: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListExclusionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ exclusionArns: __S(224, __c14, 0), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListExclusionsResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentIds: S.optional(__S(224, __c14, 0)),
          autoScalingGroups: S.optional(__S(224, __c14, 0)),
          ruleNames: S.optional(__S(224, __c14, 0)),
          severities: S.optional(__S(448, __c28, 0)),
          rulesPackageArns: S.optional(__S(224, __c14, 0)),
          attributes: S.optional(__S(33, __c2, 1)),
          userAttributes: S.optional(__S(33, __c2, 1)),
          creationTimeRange: S.optional(__S(496, __c31, 0)),
        }),
      ).annotate({ identifier: "FindingFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          assessmentRunArns: S.optional(__S(224, __c14, 0)),
          filter: S.optional(__S(576, __c36, 0)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListFindingsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ findingArns: __S(224, __c14, 0), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListFindingsResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), maxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListRulesPackagesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ rulesPackageArns: __S(224, __c14, 0), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRulesPackagesResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: __S(33, __c2, 1) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          previewAgentsArn: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PreviewAgentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          hostname: S.optional(S.String),
          agentId: S.String,
          autoScalingGroup: S.optional(S.String),
          agentHealth: S.optional(S.String),
          agentVersion: S.optional(S.String),
          operatingSystem: S.optional(S.String),
          kernelVersion: S.optional(S.String),
          ipv4Address: S.optional(S.String),
        }),
      ).annotate({ identifier: "AgentPreview" });
    case 2:
      return S.Array(__S(625, __c39, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ agentPreviews: __S(626, __c39, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "PreviewAgentsResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ roleArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RegisterCrossAccountAccessRoleRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ findingArns: __S(224, __c14, 0), attributeKeys: __S(224, __c14, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RemoveAttributesFromFindingsRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tags: S.optional(__S(33, __c2, 1)) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SetTagsForResourceRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ assessmentTemplateArn: S.String, assessmentRunName: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartAssessmentRunRequest" });
    case 1:
      return S.suspend(() => S.Struct({ assessmentRunArn: S.String })).annotate({
        identifier: "StartAssessmentRunResponse",
      });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ assessmentRunArn: S.String, stopAction: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopAssessmentRunRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, event: S.String, topicArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SubscribeToEventRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, event: S.String, topicArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UnsubscribeFromEventRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assessmentTargetArn: S.String,
          assessmentTargetName: S.String,
          resourceGroupArn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateAssessmentTargetRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
