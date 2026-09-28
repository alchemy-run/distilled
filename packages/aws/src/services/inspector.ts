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
  sdkId: "Inspector",
  target: "InspectorService",
  version: "2016-02-16",
  sigv4: "inspector",
  protocol: awsJson1_1Protocol,
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
                `https://inspector-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://inspector-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://inspector.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://inspector.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    readonly errorCode: AccessDeniedErrorCode;
    readonly canRetry: boolean;
  }> {}
export class AgentsAlreadyRunningAssessmentException
  extends /*@__PURE__*/ TE.TaggedError(
    "AgentsAlreadyRunningAssessmentException",
  )<{
    readonly message: string;
    readonly agents: AgentAlreadyRunningAssessment[];
    readonly agentsTruncated: boolean;
    readonly canRetry: boolean;
  }> {}
export class AssessmentRunInProgressException
  extends /*@__PURE__*/ TE.TaggedError("AssessmentRunInProgressException")<{
    readonly message: string;
    readonly assessmentRunArns: string[];
    readonly assessmentRunArnsTruncated: boolean;
    readonly canRetry: boolean;
  }> {}
export class InternalException
  extends /*@__PURE__*/ TE.TaggedError("InternalException")<{
    readonly message: string;
    readonly canRetry: boolean;
  }> {}
export class InvalidCrossAccountRoleException
  extends /*@__PURE__*/ TE.TaggedError("InvalidCrossAccountRoleException")<{
    readonly message: string;
    readonly errorCode: InvalidCrossAccountRoleErrorCode;
    readonly canRetry: boolean;
  }> {}
export class InvalidInputException
  extends /*@__PURE__*/ TE.TaggedError("InvalidInputException")<{
    readonly message: string;
    readonly errorCode: InvalidInputErrorCode;
    readonly canRetry: boolean;
  }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("LimitExceededException")<{
    readonly message: string;
    readonly errorCode: LimitExceededErrorCode;
    readonly canRetry: boolean;
  }> {}
export class NoSuchEntityException
  extends /*@__PURE__*/ TE.TaggedError("NoSuchEntityException")<{
    readonly message: string;
    readonly errorCode: NoSuchEntityErrorCode;
    readonly canRetry: boolean;
  }> {}
export class PreviewGenerationInProgressException
  extends /*@__PURE__*/ TE.TaggedError("PreviewGenerationInProgressException")<{
    readonly message: string;
  }> {}
export class ServiceTemporarilyUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceTemporarilyUnavailableException",
    ["ServerError"],
    { status: 503 },
  )<{ readonly message: string; readonly canRetry: boolean }> {}
export class UnsupportedFeatureException
  extends /*@__PURE__*/ TE.TaggedError("UnsupportedFeatureException")<{
    readonly message: string;
    readonly canRetry: boolean;
  }> {}
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
export type Severity =
  | "Low"
  | "Medium"
  | "High"
  | "Informational"
  | "Undefined"
  | (string & {});
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
export type ReportStatus =
  | "WORK_IN_PROGRESS"
  | "FAILED"
  | "COMPLETED"
  | (string & {});
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
  descriptor: {
    service: svc,
    input: { findingArns: 0, attributes: D.list(i_Attribute) },
  },
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
})) as any;

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
 * the service-linked role isn’t already registered, this action also creates and
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
  descriptor: {
    service: svc,
    input: { assessmentTargetName: 0, resourceGroupArn: 0 },
  },
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
})) as any;

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
 * of the assessment target. If the service-linked role isn’t already registered, this action also creates and
 * registers a service-linked role to grant Amazon Inspector access to AWS Services needed to
 * perform security assessments.
 */
export const createAssessmentTemplate: API.OperationMethod<
  CreateAssessmentTemplateRequest,
  CreateAssessmentTemplateResponse,
  CreateAssessmentTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      assessmentTargetArn: 0,
      assessmentTemplateName: 0,
      durationInSeconds: 0,
      rulesPackageArns: 0,
      userAttributesForFindings: D.list(i_Attribute),
    },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { assessmentTemplateArn: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { resourceGroupTags: D.list({ key: 0, value: 0 }) },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { assessmentRunArn: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { assessmentTargetArn: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { assessmentTemplateArn: 0 } },
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
})) as any;

export type DescribeAssessmentRunsError =
  | InternalException
  | InvalidInputException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: { assessmentRunArns: 0 },
    output: {
      assessmentRuns: D.list({
        createdAt: D.ts,
        startedAt: D.ts,
        completedAt: D.ts,
        stateChangedAt: D.ts,
        stateChanges: D.list({ stateChangedAt: D.ts }),
        notifications: D.list({ date: D.ts }),
      }),
    },
  },
  errors: [InternalException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAssessmentRuns",
})) as any;

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
  descriptor: {
    service: svc,
    input: { assessmentTargetArns: 0 },
    output: { assessmentTargets: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
  errors: [InternalException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAssessmentTargets",
})) as any;

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
  descriptor: {
    service: svc,
    input: { assessmentTemplateArns: 0 },
    output: { assessmentTemplates: D.list({ createdAt: D.ts }) },
  },
  errors: [InternalException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAssessmentTemplates",
})) as any;

export type DescribeCrossAccountAccessRoleError =
  | InternalException
  | CommonErrors;
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
  descriptor: { service: svc, output: { registeredAt: D.ts } },
  errors: [InternalException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCrossAccountAccessRole",
})) as any;

export type DescribeExclusionsError =
  | InternalException
  | InvalidInputException
  | CommonErrors;
/**
 * Describes the exclusions that are specified by the exclusions' ARNs.
 */
export const describeExclusions: API.OperationMethod<
  DescribeExclusionsRequest,
  DescribeExclusionsResponse,
  DescribeExclusionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { exclusionArns: 0, locale: 0 } },
  errors: [InternalException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeExclusions",
})) as any;

export type DescribeFindingsError =
  | InternalException
  | InvalidInputException
  | CommonErrors;
/**
 * Describes the findings that are specified by the ARNs of the findings.
 */
export const describeFindings: API.OperationMethod<
  DescribeFindingsRequest,
  DescribeFindingsResponse,
  DescribeFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { findingArns: 0, locale: 0 },
    output: { findings: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
  errors: [InternalException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFindings",
})) as any;

export type DescribeResourceGroupsError =
  | InternalException
  | InvalidInputException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: { resourceGroupArns: 0 },
    output: { resourceGroups: D.list({ createdAt: D.ts }) },
  },
  errors: [InternalException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeResourceGroups",
})) as any;

export type DescribeRulesPackagesError =
  | InternalException
  | InvalidInputException
  | CommonErrors;
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
  descriptor: { service: svc, input: { rulesPackageArns: 0, locale: 0 } },
  errors: [InternalException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRulesPackages",
})) as any;

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
  descriptor: {
    service: svc,
    input: { assessmentRunArn: 0, reportFileFormat: 0, reportType: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      assessmentTemplateArn: 0,
      previewToken: 0,
      nextToken: 0,
      maxResults: 0,
      locale: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
  ],
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
  descriptor: { service: svc, input: { assessmentRunArn: 0 } },
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTelemetryMetadata",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      assessmentRunArn: 0,
      filter: { agentHealths: 0, agentHealthCodes: 0 },
      nextToken: 0,
      maxResults: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
  ],
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
  descriptor: {
    service: svc,
    input: {
      assessmentTemplateArns: 0,
      filter: {
        namePattern: 0,
        states: 0,
        durationRange: i_DurationRange,
        rulesPackageArns: 0,
        startTimeRange: i_TimestampRange,
        completionTimeRange: i_TimestampRange,
        stateChangeTimeRange: i_TimestampRange,
      },
      nextToken: 0,
      maxResults: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
  ],
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
  descriptor: {
    service: svc,
    input: {
      filter: { assessmentTargetNamePattern: 0 },
      nextToken: 0,
      maxResults: 0,
    },
  },
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
  descriptor: {
    service: svc,
    input: {
      assessmentTargetArns: 0,
      filter: {
        namePattern: 0,
        durationRange: i_DurationRange,
        rulesPackageArns: 0,
      },
      nextToken: 0,
      maxResults: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
  ],
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
  descriptor: {
    service: svc,
    input: { resourceArn: 0, nextToken: 0, maxResults: 0 },
    output: {
      subscriptions: D.list({
        eventSubscriptions: D.list({ subscribedAt: D.ts }),
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
  ],
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
  descriptor: {
    service: svc,
    input: { assessmentRunArn: 0, nextToken: 0, maxResults: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
  ],
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
  descriptor: {
    service: svc,
    input: {
      assessmentRunArns: 0,
      filter: {
        agentIds: 0,
        autoScalingGroups: 0,
        ruleNames: 0,
        severities: 0,
        rulesPackageArns: 0,
        attributes: D.list(i_Attribute),
        userAttributes: D.list(i_Attribute),
        creationTimeRange: i_TimestampRange,
      },
      nextToken: 0,
      maxResults: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
  ],
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
  descriptor: { service: svc, input: { nextToken: 0, maxResults: 0 } },
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
  descriptor: { service: svc, input: { resourceArn: 0 } },
  errors: [
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    NoSuchEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    input: { previewAgentsArn: 0, nextToken: 0, maxResults: 0 },
  },
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
  descriptor: { service: svc, input: { roleArn: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { findingArns: 0, attributeKeys: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { resourceArn: 0, tags: D.list({ key: 0, value: 0 }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { assessmentTemplateArn: 0, assessmentRunName: 0 },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { assessmentRunArn: 0, stopAction: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { resourceArn: 0, event: 0, topicArn: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { resourceArn: 0, event: 0, topicArn: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      assessmentTargetArn: 0,
      assessmentTargetName: 0,
      resourceGroupArn: 0,
    },
  },
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
})) as any;

const i_Attribute: D.LazyStruct = () => ({ key: 0, value: 0 });
const i_DurationRange: D.LazyStruct = () => ({ minSeconds: 0, maxSeconds: 0 });
const i_TimestampRange: D.LazyStruct = () => ({ beginDate: 0, endDate: 0 });
