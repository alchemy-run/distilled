import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_0Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Compute Optimizer Automation",
  target: "ComputeOptimizerAutomationService",
  version: "2025-09-22",
  sigv4: "aco-automation",
  protocol: awsJson1_0Protocol,
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
                `https://aco-automation-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://aco-automation-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://aco-automation.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://aco-automation.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ForbiddenException
  extends /*@__PURE__*/ TE.TaggedError("ForbiddenException", ["AuthError"], {
    status: 403,
  })<{ readonly message?: string }> {}
export class IdempotencyTokenInUseException
  extends /*@__PURE__*/ TE.TaggedError(
    "IdempotencyTokenInUseException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class IdempotentParameterMismatchException
  extends /*@__PURE__*/ TE.TaggedError(
    "IdempotentParameterMismatchException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterValueException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class NotManagementAccountException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotManagementAccountException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class OptInRequiredException
  extends /*@__PURE__*/ TE.TaggedError(
    "OptInRequiredException",
    ["AuthError"],
    { status: 403 },
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
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ServerError"],
    { status: 503 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export type AccountId = string;
export type AccountIdList = string[];
export type ClientToken = string;
export interface AssociateAccountsRequest {
  accountIds: string[];
  clientToken?: string;
}
export type StringList = string[];
export interface AssociateAccountsResponse {
  accountIds?: string[];
  errors?: string[];
}
export type RuleName = string;
export type RuleDescription = string;
export type RuleType = "OrganizationRule" | "AccountRule" | (string & {});
export type RuleApplyOrder =
  | "BeforeAccountRules"
  | "AfterAccountRules"
  | (string & {});
export type OrganizationConfigurationAccountIds = string[];
export interface OrganizationConfiguration {
  ruleApplyOrder?: RuleApplyOrder;
  accountIds?: string[];
}
export type RecommendedActionType =
  | "SnapshotAndDeleteUnattachedEbsVolume"
  | "UpgradeEbsVolumeType"
  | (string & {});
export type RecommendedActionTypeList = RecommendedActionType[];
export type ComparisonOperator =
  | "StringEquals"
  | "StringNotEquals"
  | "StringEqualsIgnoreCase"
  | "StringNotEqualsIgnoreCase"
  | "StringLike"
  | "StringNotLike"
  | "NumericEquals"
  | "NumericNotEquals"
  | "NumericLessThan"
  | "NumericLessThanEquals"
  | "NumericGreaterThan"
  | "NumericGreaterThanEquals"
  | "StringEqualsIfExists"
  | "StringNotEqualsIfExists"
  | "StringEqualsIgnoreCaseIfExists"
  | "StringNotEqualsIgnoreCaseIfExists"
  | "StringLikeIfExists"
  | "StringNotLikeIfExists"
  | "NumericEqualsIfExists"
  | "NumericNotEqualsIfExists"
  | "NumericLessThanIfExists"
  | "NumericLessThanEqualsIfExists"
  | "NumericGreaterThanIfExists"
  | "NumericGreaterThanEqualsIfExists"
  | (string & {});
export type StringCriteriaValue = string;
export type StringCriteriaValues = string[];
export interface StringCriteriaCondition {
  comparison?: ComparisonOperator;
  values?: string[];
}
export type StringCriteriaConditionList = StringCriteriaCondition[];
export type IntegerList = number[];
export interface IntegerCriteriaCondition {
  comparison?: ComparisonOperator;
  values?: number[];
}
export type IntegerCriteriaConditionList = IntegerCriteriaCondition[];
export type DoubleList = number[];
export interface DoubleCriteriaCondition {
  comparison?: ComparisonOperator;
  values?: number[];
}
export type DoubleCriteriaConditionList = DoubleCriteriaCondition[];
export interface ResourceTagsCriteriaCondition {
  comparison?: ComparisonOperator;
  key?: string;
  values?: string[];
}
export type ResourceTagsCriteriaConditionList = ResourceTagsCriteriaCondition[];
export interface Criteria {
  region?: StringCriteriaCondition[];
  resourceArn?: StringCriteriaCondition[];
  ebsVolumeType?: StringCriteriaCondition[];
  ebsVolumeSizeInGib?: IntegerCriteriaCondition[];
  estimatedMonthlySavings?: DoubleCriteriaCondition[];
  resourceTag?: ResourceTagsCriteriaCondition[];
  lookBackPeriodInDays?: IntegerCriteriaCondition[];
  restartNeeded?: StringCriteriaCondition[];
}
export interface Schedule {
  scheduleExpression?: string;
  scheduleExpressionTimezone?: string;
  executionWindowInMinutes?: number;
}
export type RuleStatus = "Active" | "Inactive" | (string & {});
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value: string;
}
export type TagList = Tag[];
export interface CreateAutomationRuleRequest {
  name: string;
  description?: string;
  ruleType: RuleType;
  organizationConfiguration?: OrganizationConfiguration;
  priority?: string;
  recommendedActionTypes: RecommendedActionType[];
  criteria?: Criteria;
  schedule: Schedule;
  status: RuleStatus;
  tags?: Tag[];
  clientToken?: string;
}
export type RuleArn = string;
export type RuleId = string;
export interface CreateAutomationRuleResponse {
  ruleArn?: string;
  ruleId?: string;
  name?: string;
  description?: string;
  ruleType?: RuleType;
  ruleRevision?: number;
  organizationConfiguration?: OrganizationConfiguration;
  priority?: string;
  recommendedActionTypes?: RecommendedActionType[];
  criteria?: Criteria;
  schedule?: Schedule;
  status?: RuleStatus;
  tags?: Tag[];
  createdTimestamp?: Date;
}
export interface DeleteAutomationRuleRequest {
  ruleArn: string;
  ruleRevision: number;
  clientToken?: string;
}
export interface DeleteAutomationRuleResponse {}
export interface DisassociateAccountsRequest {
  accountIds: string[];
  clientToken?: string;
}
export interface DisassociateAccountsResponse {
  accountIds?: string[];
  errors?: string[];
}
export type EventId = string;
export interface GetAutomationEventRequest {
  eventId: string;
}
export type EventType =
  | "SnapshotAndDeleteUnattachedEbsVolume"
  | "UpgradeEbsVolumeType"
  | (string & {});
export type EventStatus =
  | "Ready"
  | "InProgress"
  | "Complete"
  | "Failed"
  | "Cancelled"
  | "RollbackReady"
  | "RollbackInProgress"
  | "RollbackComplete"
  | "RollbackFailed"
  | (string & {});
export type ResourceArn = string;
export type ResourceId = string;
export type RecommendedActionId = string;
export type ResourceType = "EbsVolume" | (string & {});
export type SavingsEstimationMode =
  | "BeforeDiscount"
  | "AfterDiscount"
  | (string & {});
export interface EstimatedMonthlySavings {
  currency: string;
  beforeDiscountSavings: number;
  afterDiscountSavings: number;
  savingsEstimationMode: SavingsEstimationMode;
}
export interface GetAutomationEventResponse {
  eventId?: string;
  eventDescription?: string;
  eventType?: EventType;
  eventStatus?: EventStatus;
  eventStatusReason?: string;
  resourceArn?: string;
  resourceId?: string;
  recommendedActionId?: string;
  accountId?: string;
  region?: string;
  ruleId?: string;
  resourceType?: ResourceType;
  createdTimestamp?: Date;
  completedTimestamp?: Date;
  estimatedMonthlySavings?: EstimatedMonthlySavings;
}
export interface GetAutomationRuleRequest {
  ruleArn: string;
}
export interface GetAutomationRuleResponse {
  ruleArn?: string;
  ruleId?: string;
  name?: string;
  description?: string;
  ruleType?: RuleType;
  ruleRevision?: number;
  accountId?: string;
  organizationConfiguration?: OrganizationConfiguration;
  priority?: string;
  recommendedActionTypes?: RecommendedActionType[];
  criteria?: Criteria;
  schedule?: Schedule;
  status?: RuleStatus;
  tags?: Tag[];
  createdTimestamp?: Date;
  lastUpdatedTimestamp?: Date;
}
export interface GetEnrollmentConfigurationRequest {}
export type EnrollmentStatus =
  | "Active"
  | "Inactive"
  | "Pending"
  | "Failed"
  | (string & {});
export type OrganizationRuleMode = "AnyAllowed" | "NoneAllowed" | (string & {});
export interface GetEnrollmentConfigurationResponse {
  status: EnrollmentStatus;
  statusReason?: string;
  organizationRuleMode?: OrganizationRuleMode;
  lastUpdatedTimestamp?: Date;
}
export type NextToken = string;
export interface ListAccountsRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface AccountInfo {
  accountId: string;
  status: EnrollmentStatus;
  organizationRuleMode: OrganizationRuleMode;
  statusReason?: string;
  lastUpdatedTimestamp: Date;
}
export type AccountInfoList = AccountInfo[];
export interface ListAccountsResponse {
  accounts: AccountInfo[];
  nextToken?: string;
}
export type AutomationEventFilterName = string;
export type FilterValue = string;
export type FilterValues = string[];
export interface AutomationEventFilter {
  name: string;
  values: string[];
}
export type AutomationEventFilterList = AutomationEventFilter[];
export interface ListAutomationEventsRequest {
  filters?: AutomationEventFilter[];
  startTimeInclusive?: Date;
  endTimeExclusive?: Date;
  maxResults?: number;
  nextToken?: string;
}
export interface AutomationEvent {
  eventId?: string;
  eventDescription?: string;
  eventType?: EventType;
  eventStatus?: EventStatus;
  eventStatusReason?: string;
  resourceArn?: string;
  resourceId?: string;
  recommendedActionId?: string;
  accountId?: string;
  region?: string;
  ruleId?: string;
  resourceType?: ResourceType;
  createdTimestamp?: Date;
  completedTimestamp?: Date;
  estimatedMonthlySavings?: EstimatedMonthlySavings;
}
export type AutomationEvents = AutomationEvent[];
export interface ListAutomationEventsResponse {
  automationEvents?: AutomationEvent[];
  nextToken?: string;
}
export interface ListAutomationEventStepsRequest {
  eventId: string;
  maxResults?: number;
  nextToken?: string;
}
export type StepId = string;
export type StepType =
  | "CreateEbsSnapshot"
  | "DeleteEbsVolume"
  | "ModifyEbsVolume"
  | "CreateEbsVolume"
  | (string & {});
export type StepStatus =
  | "Ready"
  | "InProgress"
  | "Complete"
  | "Failed"
  | (string & {});
export interface AutomationEventStep {
  eventId?: string;
  stepId?: string;
  stepType?: StepType;
  stepStatus?: StepStatus;
  resourceId?: string;
  startTimestamp?: Date;
  completedTimestamp?: Date;
  estimatedMonthlySavings?: EstimatedMonthlySavings;
}
export type AutomationEventSteps = AutomationEventStep[];
export interface ListAutomationEventStepsResponse {
  automationEventSteps?: AutomationEventStep[];
  nextToken?: string;
}
export interface ListAutomationEventSummariesRequest {
  filters?: AutomationEventFilter[];
  startDateInclusive?: string;
  endDateExclusive?: string;
  maxResults?: number;
  nextToken?: string;
}
export type SummaryDimensionKey = string;
export interface SummaryDimension {
  key: string;
  value: string;
}
export type SummaryDimensions = SummaryDimension[];
export interface TimePeriod {
  startTimeInclusive?: Date;
  endTimeExclusive?: Date;
}
export interface SummaryTotals {
  automationEventCount?: number;
  estimatedMonthlySavings?: EstimatedMonthlySavings;
}
export interface AutomationEventSummary {
  key?: string;
  dimensions?: SummaryDimension[];
  timePeriod?: TimePeriod;
  total?: SummaryTotals;
}
export type AutomationEventSummaryList = AutomationEventSummary[];
export interface ListAutomationEventSummariesResponse {
  automationEventSummaries?: AutomationEventSummary[];
  nextToken?: string;
}
export interface OrganizationScope {
  accountIds?: string[];
}
export interface ListAutomationRulePreviewRequest {
  ruleType: RuleType;
  organizationScope?: OrganizationScope;
  recommendedActionTypes: RecommendedActionType[];
  criteria?: Criteria;
  maxResults?: number;
  nextToken?: string;
}
export interface EbsVolumeConfiguration {
  type?: string;
  sizeInGib?: number;
  iops?: number;
  throughput?: number;
}
export interface EbsVolume {
  configuration?: EbsVolumeConfiguration;
}
export type ResourceDetails = { ebsVolume: EbsVolume };
export interface PreviewResult {
  recommendedActionId?: string;
  resourceArn?: string;
  resourceId?: string;
  accountId?: string;
  region?: string;
  resourceType?: ResourceType;
  lookBackPeriodInDays?: number;
  recommendedActionType?: RecommendedActionType;
  currentResourceSummary?: string;
  currentResourceDetails?: ResourceDetails;
  recommendedResourceSummary?: string;
  recommendedResourceDetails?: ResourceDetails;
  restartNeeded?: boolean;
  estimatedMonthlySavings?: EstimatedMonthlySavings;
  resourceTags?: Tag[];
}
export type PreviewResults = PreviewResult[];
export interface ListAutomationRulePreviewResponse {
  previewResults?: PreviewResult[];
  nextToken?: string;
}
export interface ListAutomationRulePreviewSummariesRequest {
  ruleType: RuleType;
  organizationScope?: OrganizationScope;
  recommendedActionTypes: RecommendedActionType[];
  criteria?: Criteria;
  maxResults?: number;
  nextToken?: string;
}
export interface RulePreviewTotal {
  recommendedActionCount: number;
  estimatedMonthlySavings: EstimatedMonthlySavings;
}
export interface PreviewResultSummary {
  key: string;
  total: RulePreviewTotal;
}
export type PreviewResultSummaries = PreviewResultSummary[];
export interface ListAutomationRulePreviewSummariesResponse {
  previewResultSummaries?: PreviewResultSummary[];
  nextToken?: string;
}
export type AutomationRuleFilterName = string;
export interface Filter {
  name: string;
  values: string[];
}
export type FilterList = Filter[];
export interface ListAutomationRulesRequest {
  filters?: Filter[];
  maxResults?: number;
  nextToken?: string;
}
export interface AutomationRule {
  ruleArn?: string;
  ruleId?: string;
  name?: string;
  description?: string;
  ruleType?: RuleType;
  ruleRevision?: number;
  accountId?: string;
  organizationConfiguration?: OrganizationConfiguration;
  priority?: string;
  recommendedActionTypes?: RecommendedActionType[];
  schedule?: Schedule;
  status?: RuleStatus;
  createdTimestamp?: Date;
  lastUpdatedTimestamp?: Date;
}
export type AutomationRules = AutomationRule[];
export interface ListAutomationRulesResponse {
  automationRules?: AutomationRule[];
  nextToken?: string;
}
export type RecommendedActionFilterName = string;
export interface RecommendedActionFilter {
  name: string;
  values: string[];
}
export type RecommendedActionFilterList = RecommendedActionFilter[];
export interface ListRecommendedActionsRequest {
  filters?: RecommendedActionFilter[];
  maxResults?: number;
  nextToken?: string;
}
export interface RecommendedAction {
  recommendedActionId?: string;
  resourceArn?: string;
  resourceId?: string;
  accountId?: string;
  region?: string;
  resourceType?: ResourceType;
  lookBackPeriodInDays?: number;
  recommendedActionType?: RecommendedActionType;
  currentResourceSummary?: string;
  currentResourceDetails?: ResourceDetails;
  recommendedResourceSummary?: string;
  recommendedResourceDetails?: ResourceDetails;
  restartNeeded?: boolean;
  estimatedMonthlySavings?: EstimatedMonthlySavings;
  resourceTags?: Tag[];
}
export type RecommendedActions = RecommendedAction[];
export interface ListRecommendedActionsResponse {
  recommendedActions?: RecommendedAction[];
  nextToken?: string;
}
export interface ListRecommendedActionSummariesRequest {
  filters?: RecommendedActionFilter[];
  maxResults?: number;
  nextToken?: string;
}
export interface RecommendedActionTotal {
  recommendedActionCount: number;
  estimatedMonthlySavings: EstimatedMonthlySavings;
}
export interface RecommendedActionSummary {
  key: string;
  total: RecommendedActionTotal;
}
export type RecommendedActionSummaries = RecommendedActionSummary[];
export interface ListRecommendedActionSummariesResponse {
  recommendedActionSummaries?: RecommendedActionSummary[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: Tag[];
}
export interface RollbackAutomationEventRequest {
  eventId: string;
  clientToken?: string;
}
export interface RollbackAutomationEventResponse {
  eventId?: string;
  eventStatus?: EventStatus;
}
export interface StartAutomationEventRequest {
  recommendedActionId: string;
  clientToken?: string;
}
export interface StartAutomationEventResponse {
  recommendedActionId?: string;
  eventId?: string;
  eventStatus?: EventStatus;
}
export interface TagResourceRequest {
  resourceArn: string;
  ruleRevision: number;
  tags: Tag[];
  clientToken?: string;
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  ruleRevision: number;
  tagKeys: string[];
  clientToken?: string;
}
export interface UntagResourceResponse {}
export interface UpdateAutomationRuleRequest {
  ruleArn: string;
  ruleRevision: number;
  name?: string;
  description?: string;
  ruleType?: RuleType;
  organizationConfiguration?: OrganizationConfiguration;
  priority?: string;
  recommendedActionTypes?: RecommendedActionType[];
  criteria?: Criteria;
  schedule?: Schedule;
  status?: RuleStatus;
  clientToken?: string;
}
export interface UpdateAutomationRuleResponse {
  ruleArn?: string;
  ruleRevision?: number;
  name?: string;
  description?: string;
  ruleType?: RuleType;
  organizationConfiguration?: OrganizationConfiguration;
  priority?: string;
  recommendedActionTypes?: RecommendedActionType[];
  criteria?: Criteria;
  schedule?: Schedule;
  status?: RuleStatus;
  createdTimestamp?: Date;
  lastUpdatedTimestamp?: Date;
}
export interface UpdateEnrollmentConfigurationRequest {
  status: EnrollmentStatus;
  clientToken?: string;
}
export interface UpdateEnrollmentConfigurationResponse {
  status: EnrollmentStatus;
  statusReason?: string;
  lastUpdatedTimestamp: Date;
}
export type AssociateAccountsError =
  | AccessDeniedException
  | ForbiddenException
  | IdempotencyTokenInUseException
  | IdempotentParameterMismatchException
  | InternalServerException
  | InvalidParameterValueException
  | NotManagementAccountException
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates one or more member accounts with your organization's management account, enabling centralized implementation of optimization actions across those accounts. Once associated, the management account (or a delegated administrator) can apply recommended actions to the member account. When you associate a member account, its organization rule mode is automatically set to "Any allowed," which permits the management account to create Automation rules that automatically apply actions to that account. If the member account has not previously enabled the Automation feature, the association process automatically enables it.
 *
 * Only the management account or a delegated administrator can perform this action.
 */
export const associateAccounts: API.OperationMethod<
  AssociateAccountsRequest,
  AssociateAccountsResponse,
  AssociateAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { accountIds: 0, clientToken: D.m({ idempotency: true }) },
  },
  errors: [
    AccessDeniedException,
    ForbiddenException,
    IdempotencyTokenInUseException,
    IdempotentParameterMismatchException,
    InternalServerException,
    InvalidParameterValueException,
    NotManagementAccountException,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateAccounts",
})) as any;

export type CreateAutomationRuleError =
  | AccessDeniedException
  | ForbiddenException
  | IdempotencyTokenInUseException
  | IdempotentParameterMismatchException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a new automation rule to apply recommended actions to resources based on specified criteria.
 */
export const createAutomationRule: API.OperationMethod<
  CreateAutomationRuleRequest,
  CreateAutomationRuleResponse,
  CreateAutomationRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      description: 0,
      ruleType: 0,
      organizationConfiguration: i_OrganizationConfiguration,
      priority: 0,
      recommendedActionTypes: 0,
      criteria: i_Criteria,
      schedule: i_Schedule,
      status: 0,
      tags: D.list(i_Tag),
      clientToken: D.m({ idempotency: true }),
    },
    output: { createdTimestamp: D.ts },
  },
  errors: [
    AccessDeniedException,
    ForbiddenException,
    IdempotencyTokenInUseException,
    IdempotentParameterMismatchException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAutomationRule",
})) as any;

export type DeleteAutomationRuleError =
  | AccessDeniedException
  | ForbiddenException
  | IdempotencyTokenInUseException
  | IdempotentParameterMismatchException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an existing automation rule.
 */
export const deleteAutomationRule: API.OperationMethod<
  DeleteAutomationRuleRequest,
  DeleteAutomationRuleResponse,
  DeleteAutomationRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ruleArn: 0,
      ruleRevision: 0,
      clientToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ForbiddenException,
    IdempotencyTokenInUseException,
    IdempotentParameterMismatchException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAutomationRule",
})) as any;

export type DisassociateAccountsError =
  | AccessDeniedException
  | ForbiddenException
  | IdempotencyTokenInUseException
  | IdempotentParameterMismatchException
  | InternalServerException
  | InvalidParameterValueException
  | NotManagementAccountException
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Disassociates member accounts from your organization's management account, removing centralized automation capabilities. Once disassociated, organization rules no longer apply to the member account, and the management account (or delegated administrator) cannot create Automation rules for that account.
 *
 * Only the management account or a delegated administrator can perform this action.
 */
export const disassociateAccounts: API.OperationMethod<
  DisassociateAccountsRequest,
  DisassociateAccountsResponse,
  DisassociateAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { accountIds: 0, clientToken: D.m({ idempotency: true }) },
  },
  errors: [
    AccessDeniedException,
    ForbiddenException,
    IdempotencyTokenInUseException,
    IdempotentParameterMismatchException,
    InternalServerException,
    InvalidParameterValueException,
    NotManagementAccountException,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateAccounts",
})) as any;

export type GetAutomationEventError =
  | AccessDeniedException
  | ForbiddenException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves details about a specific automation event.
 */
export const getAutomationEvent: API.OperationMethod<
  GetAutomationEventRequest,
  GetAutomationEventResponse,
  GetAutomationEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { eventId: 0 },
    output: { createdTimestamp: D.ts, completedTimestamp: D.ts },
  },
  errors: [
    AccessDeniedException,
    ForbiddenException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutomationEvent",
})) as any;

export type GetAutomationRuleError =
  | AccessDeniedException
  | ForbiddenException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves details about a specific automation rule.
 */
export const getAutomationRule: API.OperationMethod<
  GetAutomationRuleRequest,
  GetAutomationRuleResponse,
  GetAutomationRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ruleArn: 0 },
    output: { createdTimestamp: D.ts, lastUpdatedTimestamp: D.ts },
  },
  errors: [
    AccessDeniedException,
    ForbiddenException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutomationRule",
})) as any;

export type GetEnrollmentConfigurationError =
  | AccessDeniedException
  | ForbiddenException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the current enrollment configuration for Compute Optimizer Automation.
 */
export const getEnrollmentConfiguration: API.OperationMethod<
  GetEnrollmentConfigurationRequest,
  GetEnrollmentConfigurationResponse,
  GetEnrollmentConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {},
    output: { lastUpdatedTimestamp: D.ts },
  },
  errors: [
    AccessDeniedException,
    ForbiddenException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnrollmentConfiguration",
})) as any;

export type ListAccountsError =
  | AccessDeniedException
  | ForbiddenException
  | InternalServerException
  | InvalidParameterValueException
  | NotManagementAccountException
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the accounts in your organization that are enrolled in Compute Optimizer and whether they have enabled Automation.
 *
 * Only the management account or a delegated administrator can perform this action.
 */
export const listAccounts: API.PaginatedOperationMethod<
  ListAccountsRequest,
  ListAccountsResponse,
  ListAccountsError,
  Credentials | HttpClient.HttpClient,
  AccountInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { maxResults: 0, nextToken: 0 },
    output: { accounts: D.list({ lastUpdatedTimestamp: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    ForbiddenException,
    InternalServerException,
    InvalidParameterValueException,
    NotManagementAccountException,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccounts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "accounts",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAutomationEventsError =
  | AccessDeniedException
  | ForbiddenException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists automation events based on specified filters. You can retrieve events that were created within the past year.
 */
export const listAutomationEvents: API.PaginatedOperationMethod<
  ListAutomationEventsRequest,
  ListAutomationEventsResponse,
  ListAutomationEventsError,
  Credentials | HttpClient.HttpClient,
  AutomationEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      filters: D.list(i_AutomationEventFilter),
      startTimeInclusive: 0,
      endTimeExclusive: 0,
      maxResults: 0,
      nextToken: 0,
    },
    output: {
      automationEvents: D.list({
        createdTimestamp: D.ts,
        completedTimestamp: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    ForbiddenException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutomationEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "automationEvents",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAutomationEventStepsError =
  | AccessDeniedException
  | ForbiddenException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the steps for a specific automation event. You can only list steps for events created within the past year.
 */
export const listAutomationEventSteps: API.PaginatedOperationMethod<
  ListAutomationEventStepsRequest,
  ListAutomationEventStepsResponse,
  ListAutomationEventStepsError,
  Credentials | HttpClient.HttpClient,
  AutomationEventStep
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { eventId: 0, maxResults: 0, nextToken: 0 },
    output: {
      automationEventSteps: D.list({
        startTimestamp: D.ts,
        completedTimestamp: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    ForbiddenException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutomationEventSteps",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "automationEventSteps",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAutomationEventSummariesError =
  | AccessDeniedException
  | ForbiddenException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Provides a summary of automation events based on specified filters. Only events created within the past year will be included in the summary.
 */
export const listAutomationEventSummaries: API.PaginatedOperationMethod<
  ListAutomationEventSummariesRequest,
  ListAutomationEventSummariesResponse,
  ListAutomationEventSummariesError,
  Credentials | HttpClient.HttpClient,
  AutomationEventSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      filters: D.list(i_AutomationEventFilter),
      startDateInclusive: 0,
      endDateExclusive: 0,
      maxResults: 0,
      nextToken: 0,
    },
    output: {
      automationEventSummaries: D.list({
        timePeriod: { startTimeInclusive: D.ts, endTimeExclusive: D.ts },
      }),
    },
  },
  errors: [
    AccessDeniedException,
    ForbiddenException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutomationEventSummaries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "automationEventSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAutomationRulePreviewError =
  | AccessDeniedException
  | ForbiddenException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a preview of the recommended actions that match your Automation rule's configuration and criteria.
 */
export const listAutomationRulePreview: API.PaginatedOperationMethod<
  ListAutomationRulePreviewRequest,
  ListAutomationRulePreviewResponse,
  ListAutomationRulePreviewError,
  Credentials | HttpClient.HttpClient,
  PreviewResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ruleType: 0,
      organizationScope: i_OrganizationScope,
      recommendedActionTypes: 0,
      criteria: i_Criteria,
      maxResults: 0,
      nextToken: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ForbiddenException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutomationRulePreview",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "previewResults",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAutomationRulePreviewSummariesError =
  | AccessDeniedException
  | ForbiddenException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a summary of the recommended actions that match your rule preview configuration and criteria.
 */
export const listAutomationRulePreviewSummaries: API.PaginatedOperationMethod<
  ListAutomationRulePreviewSummariesRequest,
  ListAutomationRulePreviewSummariesResponse,
  ListAutomationRulePreviewSummariesError,
  Credentials | HttpClient.HttpClient,
  PreviewResultSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ruleType: 0,
      organizationScope: i_OrganizationScope,
      recommendedActionTypes: 0,
      criteria: i_Criteria,
      maxResults: 0,
      nextToken: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ForbiddenException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutomationRulePreviewSummaries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "previewResultSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAutomationRulesError =
  | AccessDeniedException
  | ForbiddenException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the automation rules that match specified filters.
 */
export const listAutomationRules: API.PaginatedOperationMethod<
  ListAutomationRulesRequest,
  ListAutomationRulesResponse,
  ListAutomationRulesError,
  Credentials | HttpClient.HttpClient,
  AutomationRule
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      filters: D.list({ name: 0, values: 0 }),
      maxResults: 0,
      nextToken: 0,
    },
    output: {
      automationRules: D.list({
        createdTimestamp: D.ts,
        lastUpdatedTimestamp: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    ForbiddenException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutomationRules",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "automationRules",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRecommendedActionsError =
  | AccessDeniedException
  | ForbiddenException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the recommended actions based that match specified filters.
 *
 * Management accounts and delegated administrators can retrieve recommended actions that include associated member accounts. You can associate a member account using `AssociateAccounts`.
 */
export const listRecommendedActions: API.PaginatedOperationMethod<
  ListRecommendedActionsRequest,
  ListRecommendedActionsResponse,
  ListRecommendedActionsError,
  Credentials | HttpClient.HttpClient,
  RecommendedAction
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      filters: D.list(i_RecommendedActionFilter),
      maxResults: 0,
      nextToken: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ForbiddenException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecommendedActions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "recommendedActions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRecommendedActionSummariesError =
  | AccessDeniedException
  | ForbiddenException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Provides a summary of recommended actions based on specified filters.
 *
 * Management accounts and delegated administrators can retrieve recommended actions that include associated member accounts. You can associate a member account using `AssociateAccounts`.
 */
export const listRecommendedActionSummaries: API.PaginatedOperationMethod<
  ListRecommendedActionSummariesRequest,
  ListRecommendedActionSummariesResponse,
  ListRecommendedActionSummariesError,
  Credentials | HttpClient.HttpClient,
  RecommendedActionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      filters: D.list(i_RecommendedActionFilter),
      maxResults: 0,
      nextToken: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ForbiddenException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecommendedActionSummaries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "recommendedActionSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | ForbiddenException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the tags for a specified resource.
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
    ForbiddenException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type RollbackAutomationEventError =
  | AccessDeniedException
  | ForbiddenException
  | IdempotencyTokenInUseException
  | IdempotentParameterMismatchException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Initiates a rollback for a completed automation event.
 *
 * Management accounts and delegated administrators can only initiate a rollback for events belonging to associated member accounts. You can associate a member account using `AssociateAccounts`.
 */
export const rollbackAutomationEvent: API.OperationMethod<
  RollbackAutomationEventRequest,
  RollbackAutomationEventResponse,
  RollbackAutomationEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { eventId: 0, clientToken: D.m({ idempotency: true }) },
  },
  errors: [
    AccessDeniedException,
    ForbiddenException,
    IdempotencyTokenInUseException,
    IdempotentParameterMismatchException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RollbackAutomationEvent",
})) as any;

export type StartAutomationEventError =
  | AccessDeniedException
  | ForbiddenException
  | IdempotencyTokenInUseException
  | IdempotentParameterMismatchException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Initiates a one-time, on-demand automation for the specified recommended action.
 *
 * Management accounts and delegated administrators can only initiate recommended actions for associated member accounts. You can associate a member account using `AssociateAccounts`.
 */
export const startAutomationEvent: API.OperationMethod<
  StartAutomationEventRequest,
  StartAutomationEventResponse,
  StartAutomationEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { recommendedActionId: 0, clientToken: D.m({ idempotency: true }) },
  },
  errors: [
    AccessDeniedException,
    ForbiddenException,
    IdempotencyTokenInUseException,
    IdempotentParameterMismatchException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAutomationEvent",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | ForbiddenException
  | IdempotencyTokenInUseException
  | IdempotentParameterMismatchException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Adds tags to the specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      resourceArn: 0,
      ruleRevision: 0,
      tags: D.list(i_Tag),
      clientToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ForbiddenException,
    IdempotencyTokenInUseException,
    IdempotentParameterMismatchException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | ForbiddenException
  | IdempotencyTokenInUseException
  | IdempotentParameterMismatchException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      resourceArn: 0,
      ruleRevision: 0,
      tagKeys: 0,
      clientToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ForbiddenException,
    IdempotencyTokenInUseException,
    IdempotentParameterMismatchException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateAutomationRuleError =
  | AccessDeniedException
  | ForbiddenException
  | IdempotencyTokenInUseException
  | IdempotentParameterMismatchException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates an existing automation rule.
 */
export const updateAutomationRule: API.OperationMethod<
  UpdateAutomationRuleRequest,
  UpdateAutomationRuleResponse,
  UpdateAutomationRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ruleArn: 0,
      ruleRevision: 0,
      name: 0,
      description: 0,
      ruleType: 0,
      organizationConfiguration: i_OrganizationConfiguration,
      priority: 0,
      recommendedActionTypes: 0,
      criteria: i_Criteria,
      schedule: i_Schedule,
      status: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { createdTimestamp: D.ts, lastUpdatedTimestamp: D.ts },
  },
  errors: [
    AccessDeniedException,
    ForbiddenException,
    IdempotencyTokenInUseException,
    IdempotentParameterMismatchException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAutomationRule",
})) as any;

export type UpdateEnrollmentConfigurationError =
  | AccessDeniedException
  | ForbiddenException
  | IdempotencyTokenInUseException
  | IdempotentParameterMismatchException
  | InternalServerException
  | InvalidParameterValueException
  | NotManagementAccountException
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates your account’s Compute Optimizer Automation enrollment configuration.
 */
export const updateEnrollmentConfiguration: API.OperationMethod<
  UpdateEnrollmentConfigurationRequest,
  UpdateEnrollmentConfigurationResponse,
  UpdateEnrollmentConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { status: 0, clientToken: D.m({ idempotency: true }) },
    output: { lastUpdatedTimestamp: D.ts },
  },
  errors: [
    AccessDeniedException,
    ForbiddenException,
    IdempotencyTokenInUseException,
    IdempotentParameterMismatchException,
    InternalServerException,
    InvalidParameterValueException,
    NotManagementAccountException,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEnrollmentConfiguration",
})) as any;

const i_AutomationEventFilter: D.LazyStruct = () => ({ name: 0, values: 0 });
const i_Criteria: D.LazyStruct = () => ({
  region: D.list(i_StringCriteriaCondition),
  resourceArn: D.list(i_StringCriteriaCondition),
  ebsVolumeType: D.list(i_StringCriteriaCondition),
  ebsVolumeSizeInGib: D.list(i_IntegerCriteriaCondition),
  estimatedMonthlySavings: D.list({ comparison: 0, values: 0 }),
  resourceTag: D.list({ comparison: 0, key: 0, values: 0 }),
  lookBackPeriodInDays: D.list(i_IntegerCriteriaCondition),
  restartNeeded: D.list(i_StringCriteriaCondition),
});
const i_OrganizationConfiguration: D.LazyStruct = () => ({
  ruleApplyOrder: 0,
  accountIds: 0,
});
const i_OrganizationScope: D.LazyStruct = () => ({ accountIds: 0 });
const i_RecommendedActionFilter: D.LazyStruct = () => ({ name: 0, values: 0 });
const i_Schedule: D.LazyStruct = () => ({
  scheduleExpression: 0,
  scheduleExpressionTimezone: 0,
  executionWindowInMinutes: 0,
});
const i_Tag: D.LazyStruct = () => ({ key: 0, value: 0 });
const i_IntegerCriteriaCondition: D.LazyStruct = () => ({
  comparison: 0,
  values: 0,
});
const i_StringCriteriaCondition: D.LazyStruct = () => ({
  comparison: 0,
  values: 0,
});
