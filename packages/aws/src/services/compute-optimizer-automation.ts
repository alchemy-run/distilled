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
  sdkId: "Compute Optimizer Automation",
  serviceShapeName: "ComputeOptimizerAutomationService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "aco-automation" });
const ver = /*@__PURE__*/ T.ServiceVersion("2025-09-22");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_0();
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://aco-automation.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://aco-automation.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://aco-automation.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ForbiddenException
  extends /*@__PURE__*/ S.TaggedError<ForbiddenException>()(
    "ForbiddenException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class IdempotencyTokenInUseException
  extends /*@__PURE__*/ S.TaggedError<IdempotencyTokenInUseException>()(
    "IdempotencyTokenInUseException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class IdempotentParameterMismatchException
  extends /*@__PURE__*/ S.TaggedError<IdempotentParameterMismatchException>()(
    "IdempotentParameterMismatchException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterValueException>()(
    "InvalidParameterValueException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NotManagementAccountException
  extends /*@__PURE__*/ S.TaggedError<NotManagementAccountException>()(
    "NotManagementAccountException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class OptInRequiredException
  extends /*@__PURE__*/ S.TaggedError<OptInRequiredException>()(
    "OptInRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
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
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(503),
  ).pipe(C.withServerError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
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
export type RuleApplyOrder = "BeforeAccountRules" | "AfterAccountRules" | (string & {});
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
export type SavingsEstimationMode = "BeforeDiscount" | "AfterDiscount" | (string & {});
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
export type EnrollmentStatus = "Active" | "Inactive" | "Pending" | "Failed" | (string & {});
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
export type StepStatus = "Ready" | "InProgress" | "Complete" | "Failed" | (string & {});
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
  input: __S(0, __c0, 0) as any as S.Schema<AssociateAccountsRequest>,
  output: __S(16, __c2, 0) as any as S.Schema<AssociateAccountsResponse>,
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
}));

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
  input: __S(24, __c3, 0) as any as S.Schema<CreateAutomationRuleRequest>,
  output: __S(25, __c3, 1) as any as S.Schema<CreateAutomationRuleResponse>,
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
}));

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
  input: __S(64, __c8, 0) as any as S.Schema<DeleteAutomationRuleRequest>,
  output: __S(72, __c9, 0) as any as S.Schema<DeleteAutomationRuleResponse>,
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
}));

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
  input: __S(80, __c10, 0) as any as S.Schema<DisassociateAccountsRequest>,
  output: __S(16, __c2, 0) as any as S.Schema<DisassociateAccountsResponse>,
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
}));

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
  input: __S(88, __c11, 0) as any as S.Schema<GetAutomationEventRequest>,
  output: __S(96, __c12, 0) as any as S.Schema<GetAutomationEventResponse>,
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
}));

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
  input: __S(112, __c14, 0) as any as S.Schema<GetAutomationRuleRequest>,
  output: __S(113, __c14, 1) as any as S.Schema<GetAutomationRuleResponse>,
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
}));

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
  input: __S(120, __c15, 0) as any as S.Schema<GetEnrollmentConfigurationRequest>,
  output: __S(121, __c15, 1) as any as S.Schema<GetEnrollmentConfigurationResponse>,
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
}));

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
  input: __S(128, __c16, 0) as any as S.Schema<ListAccountsRequest>,
  output: __S(131, __c16, 3) as any as S.Schema<ListAccountsResponse>,
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
  input: __S(136, __c17, 0) as any as S.Schema<ListAutomationEventsRequest>,
  output: __S(138, __c17, 2) as any as S.Schema<ListAutomationEventsResponse>,
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
  input: __S(152, __c19, 0) as any as S.Schema<ListAutomationEventStepsRequest>,
  output: __S(155, __c19, 3) as any as S.Schema<ListAutomationEventStepsResponse>,
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
  input: __S(160, __c20, 0) as any as S.Schema<ListAutomationEventSummariesRequest>,
  output: __S(165, __c20, 5) as any as S.Schema<ListAutomationEventSummariesResponse>,
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
  input: __S(168, __c21, 0) as any as S.Schema<ListAutomationRulePreviewRequest>,
  output: __S(169, __c21, 1) as any as S.Schema<ListAutomationRulePreviewResponse>,
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
  input: __S(192, __c24, 0) as any as S.Schema<ListAutomationRulePreviewSummariesRequest>,
  output: __S(193, __c24, 1) as any as S.Schema<ListAutomationRulePreviewSummariesResponse>,
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
  input: __S(208, __c26, 0) as any as S.Schema<ListAutomationRulesRequest>,
  output: __S(211, __c26, 3) as any as S.Schema<ListAutomationRulesResponse>,
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
  input: __S(216, __c27, 0) as any as S.Schema<ListRecommendedActionsRequest>,
  output: __S(217, __c27, 1) as any as S.Schema<ListRecommendedActionsResponse>,
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
  input: __S(224, __c28, 0) as any as S.Schema<ListRecommendedActionSummariesRequest>,
  output: __S(225, __c28, 1) as any as S.Schema<ListRecommendedActionSummariesResponse>,
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
  input: __S(232, __c29, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(233, __c29, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
}));

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
  input: __S(240, __c30, 0) as any as S.Schema<RollbackAutomationEventRequest>,
  output: __S(241, __c30, 1) as any as S.Schema<RollbackAutomationEventResponse>,
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
}));

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
  input: __S(248, __c31, 0) as any as S.Schema<StartAutomationEventRequest>,
  output: __S(249, __c31, 1) as any as S.Schema<StartAutomationEventResponse>,
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
}));

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
  input: __S(256, __c32, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(72, __c9, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(264, __c33, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(72, __c9, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(272, __c34, 0) as any as S.Schema<UpdateAutomationRuleRequest>,
  output: __S(273, __c34, 1) as any as S.Schema<UpdateAutomationRuleResponse>,
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
}));

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
 * Updates your account's Compute Optimizer Automation enrollment configuration.
 */
export const updateEnrollmentConfiguration: API.OperationMethod<
  UpdateEnrollmentConfigurationRequest,
  UpdateEnrollmentConfigurationResponse,
  UpdateEnrollmentConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(280, __c35, 0) as any as S.Schema<UpdateEnrollmentConfigurationRequest>,
  output: __S(281, __c35, 1) as any as S.Schema<UpdateEnrollmentConfigurationResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accountIds: __S(8, __c1, 0),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AssociateAccountsRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ accountIds: S.optional(__S(8, __c1, 0)), errors: S.optional(__S(8, __c1, 0)) }),
      ).annotate({ identifier: "AssociateAccountsResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          ruleType: S.String,
          organizationConfiguration: S.optional(__S(56, __c7, 0)),
          priority: S.optional(S.String),
          recommendedActionTypes: __S(40, __c5, 0),
          criteria: S.optional(__S(55, __c6, 7)),
          schedule: __S(57, __c7, 1),
          status: S.String,
          tags: S.optional(__S(33, __c4, 1)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAutomationRuleRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ruleArn: S.optional(S.String),
          ruleId: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          ruleType: S.optional(S.String),
          ruleRevision: S.optional(S.Number),
          organizationConfiguration: S.optional(__S(56, __c7, 0)),
          priority: S.optional(S.String),
          recommendedActionTypes: S.optional(__S(40, __c5, 0)),
          criteria: S.optional(__S(55, __c6, 7)),
          schedule: S.optional(__S(57, __c7, 1)),
          status: S.optional(S.String),
          tags: S.optional(__S(33, __c4, 1)),
          createdTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CreateAutomationRuleResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(32, __c4, 0));
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ comparison: S.optional(S.String), values: S.optional(__S(8, __c1, 0)) }),
      ).annotate({ identifier: "StringCriteriaCondition" });
    case 1:
      return S.Array(__S(48, __c6, 0));
    case 2:
      return S.Array(S.Number);
    case 3:
      return S.suspend(() =>
        S.Struct({ comparison: S.optional(S.String), values: S.optional(__S(50, __c6, 2)) }),
      ).annotate({ identifier: "IntegerCriteriaCondition" });
    case 4:
      return S.Array(__S(51, __c6, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          comparison: S.optional(S.String),
          key: S.optional(S.String),
          values: S.optional(__S(8, __c1, 0)),
        }),
      ).annotate({ identifier: "ResourceTagsCriteriaCondition" });
    case 6:
      return S.Array(__S(53, __c6, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          region: S.optional(__S(49, __c6, 1)),
          resourceArn: S.optional(__S(49, __c6, 1)),
          ebsVolumeType: S.optional(__S(49, __c6, 1)),
          ebsVolumeSizeInGib: S.optional(__S(52, __c6, 4)),
          estimatedMonthlySavings: S.optional(__S(52, __c6, 4)),
          resourceTag: S.optional(__S(54, __c6, 6)),
          lookBackPeriodInDays: S.optional(__S(52, __c6, 4)),
          restartNeeded: S.optional(__S(49, __c6, 1)),
        }),
      ).annotate({ identifier: "Criteria" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ruleApplyOrder: S.optional(S.String), accountIds: S.optional(__S(8, __c1, 0)) }),
      ).annotate({ identifier: "OrganizationConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          scheduleExpression: S.optional(S.String),
          scheduleExpressionTimezone: S.optional(S.String),
          executionWindowInMinutes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Schedule" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ruleArn: S.String,
          ruleRevision: S.Number,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteAutomationRuleRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteAutomationRuleResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accountIds: __S(8, __c1, 0),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DisassociateAccountsRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ eventId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAutomationEventRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          eventId: S.optional(S.String),
          eventDescription: S.optional(S.String),
          eventType: S.optional(S.String),
          eventStatus: S.optional(S.String),
          eventStatusReason: S.optional(S.String),
          resourceArn: S.optional(S.String),
          resourceId: S.optional(S.String),
          recommendedActionId: S.optional(S.String),
          accountId: S.optional(S.String),
          region: S.optional(S.String),
          ruleId: S.optional(S.String),
          resourceType: S.optional(S.String),
          createdTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          completedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          estimatedMonthlySavings: S.optional(__S(104, __c13, 0)),
        }),
      ).annotate({ identifier: "GetAutomationEventResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          currency: S.String,
          beforeDiscountSavings: S.Number,
          afterDiscountSavings: S.Number,
          savingsEstimationMode: S.String,
        }),
      ).annotate({ identifier: "EstimatedMonthlySavings" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ruleArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAutomationRuleRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ruleArn: S.optional(S.String),
          ruleId: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          ruleType: S.optional(S.String),
          ruleRevision: S.optional(S.Number),
          accountId: S.optional(S.String),
          organizationConfiguration: S.optional(__S(56, __c7, 0)),
          priority: S.optional(S.String),
          recommendedActionTypes: S.optional(__S(40, __c5, 0)),
          criteria: S.optional(__S(55, __c6, 7)),
          schedule: S.optional(__S(57, __c7, 1)),
          status: S.optional(S.String),
          tags: S.optional(__S(33, __c4, 1)),
          createdTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetAutomationRuleResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetEnrollmentConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          status: S.String,
          statusReason: S.optional(S.String),
          organizationRuleMode: S.optional(S.String),
          lastUpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetEnrollmentConfigurationResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ maxResults: S.optional(S.Number), nextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListAccountsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          accountId: S.String,
          status: S.String,
          organizationRuleMode: S.String,
          statusReason: S.optional(S.String),
          lastUpdatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "AccountInfo" });
    case 2:
      return S.Array(__S(129, __c16, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ accounts: __S(130, __c16, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAccountsResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          filters: S.optional(__S(145, __c18, 1)),
          startTimeInclusive: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTimeExclusive: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAutomationEventsRequest" });
    case 1:
      return S.Array(__S(96, __c12, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          automationEvents: S.optional(__S(137, __c17, 1)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAutomationEventsResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, values: __S(8, __c1, 0) })).annotate({
        identifier: "AutomationEventFilter",
      });
    case 1:
      return S.Array(__S(144, __c18, 0));
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          eventId: S.String,
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAutomationEventStepsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          eventId: S.optional(S.String),
          stepId: S.optional(S.String),
          stepType: S.optional(S.String),
          stepStatus: S.optional(S.String),
          resourceId: S.optional(S.String),
          startTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          completedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          estimatedMonthlySavings: S.optional(__S(104, __c13, 0)),
        }),
      ).annotate({ identifier: "AutomationEventStep" });
    case 2:
      return S.Array(__S(153, __c19, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          automationEventSteps: S.optional(__S(154, __c19, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAutomationEventStepsResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          filters: S.optional(__S(145, __c18, 1)),
          startDateInclusive: S.optional(S.String),
          endDateExclusive: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAutomationEventSummariesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          startTimeInclusive: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTimeExclusive: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "TimePeriod" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          automationEventCount: S.optional(S.Number),
          estimatedMonthlySavings: S.optional(__S(104, __c13, 0)),
        }),
      ).annotate({ identifier: "SummaryTotals" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          key: S.optional(S.String),
          dimensions: S.optional(__S(33, __c4, 1)),
          timePeriod: S.optional(__S(161, __c20, 1)),
          total: S.optional(__S(162, __c20, 2)),
        }),
      ).annotate({ identifier: "AutomationEventSummary" });
    case 4:
      return S.Array(__S(163, __c20, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          automationEventSummaries: S.optional(__S(164, __c20, 4)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAutomationEventSummariesResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ruleType: S.String,
          organizationScope: S.optional(__S(176, __c22, 0)),
          recommendedActionTypes: __S(40, __c5, 0),
          criteria: S.optional(__S(55, __c6, 7)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAutomationRulePreviewRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          previewResults: S.optional(__S(188, __c23, 4)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAutomationRulePreviewResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ accountIds: S.optional(__S(8, __c1, 0)) })).annotate({
        identifier: "OrganizationScope",
      });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          sizeInGib: S.optional(S.Number),
          iops: S.optional(S.Number),
          throughput: S.optional(S.Number),
        }),
      ).annotate({ identifier: "EbsVolumeConfiguration" });
    case 1:
      return S.suspend(() => S.Struct({ configuration: S.optional(__S(184, __c23, 0)) })).annotate({
        identifier: "EbsVolume",
      });
    case 2:
      return S.Union([/*@__PURE__*/ S.Struct({ ebsVolume: __S(185, __c23, 1) })]);
    case 3:
      return S.suspend(() =>
        S.Struct({
          recommendedActionId: S.optional(S.String),
          resourceArn: S.optional(S.String),
          resourceId: S.optional(S.String),
          accountId: S.optional(S.String),
          region: S.optional(S.String),
          resourceType: S.optional(S.String),
          lookBackPeriodInDays: S.optional(S.Number),
          recommendedActionType: S.optional(S.String),
          currentResourceSummary: S.optional(S.String),
          currentResourceDetails: S.optional(__S(186, __c23, 2)),
          recommendedResourceSummary: S.optional(S.String),
          recommendedResourceDetails: S.optional(__S(186, __c23, 2)),
          restartNeeded: S.optional(S.Boolean),
          estimatedMonthlySavings: S.optional(__S(104, __c13, 0)),
          resourceTags: S.optional(__S(33, __c4, 1)),
        }),
      ).annotate({ identifier: "PreviewResult" });
    case 4:
      return S.Array(__S(187, __c23, 3));
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ruleType: S.String,
          organizationScope: S.optional(__S(176, __c22, 0)),
          recommendedActionTypes: __S(40, __c5, 0),
          criteria: S.optional(__S(55, __c6, 7)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAutomationRulePreviewSummariesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          previewResultSummaries: S.optional(__S(202, __c25, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAutomationRulePreviewSummariesResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ recommendedActionCount: S.Number, estimatedMonthlySavings: __S(104, __c13, 0) }),
      ).annotate({ identifier: "RulePreviewTotal" });
    case 1:
      return S.suspend(() => S.Struct({ key: S.String, total: __S(200, __c25, 0) })).annotate({
        identifier: "PreviewResultSummary",
      });
    case 2:
      return S.Array(__S(201, __c25, 1));
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          filters: S.optional(__S(145, __c18, 1)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAutomationRulesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ruleArn: S.optional(S.String),
          ruleId: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          ruleType: S.optional(S.String),
          ruleRevision: S.optional(S.Number),
          accountId: S.optional(S.String),
          organizationConfiguration: S.optional(__S(56, __c7, 0)),
          priority: S.optional(S.String),
          recommendedActionTypes: S.optional(__S(40, __c5, 0)),
          schedule: S.optional(__S(57, __c7, 1)),
          status: S.optional(S.String),
          createdTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "AutomationRule" });
    case 2:
      return S.Array(__S(209, __c26, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          automationRules: S.optional(__S(210, __c26, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAutomationRulesResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          filters: S.optional(__S(145, __c18, 1)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListRecommendedActionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          recommendedActions: S.optional(__S(188, __c23, 4)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListRecommendedActionsResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          filters: S.optional(__S(145, __c18, 1)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListRecommendedActionSummariesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          recommendedActionSummaries: S.optional(__S(202, __c25, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListRecommendedActionSummariesResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(33, __c4, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          eventId: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RollbackAutomationEventRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ eventId: S.optional(S.String), eventStatus: S.optional(S.String) }),
      ).annotate({ identifier: "RollbackAutomationEventResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          recommendedActionId: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartAutomationEventRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          recommendedActionId: S.optional(S.String),
          eventId: S.optional(S.String),
          eventStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "StartAutomationEventResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String,
          ruleRevision: S.Number,
          tags: __S(33, __c4, 1),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String,
          ruleRevision: S.Number,
          tagKeys: __S(8, __c1, 0),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ruleArn: S.String,
          ruleRevision: S.Number,
          name: S.optional(S.String),
          description: S.optional(S.String),
          ruleType: S.optional(S.String),
          organizationConfiguration: S.optional(__S(56, __c7, 0)),
          priority: S.optional(S.String),
          recommendedActionTypes: S.optional(__S(40, __c5, 0)),
          criteria: S.optional(__S(55, __c6, 7)),
          schedule: S.optional(__S(57, __c7, 1)),
          status: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateAutomationRuleRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ruleArn: S.optional(S.String),
          ruleRevision: S.optional(S.Number),
          name: S.optional(S.String),
          description: S.optional(S.String),
          ruleType: S.optional(S.String),
          organizationConfiguration: S.optional(__S(56, __c7, 0)),
          priority: S.optional(S.String),
          recommendedActionTypes: S.optional(__S(40, __c5, 0)),
          criteria: S.optional(__S(55, __c6, 7)),
          schedule: S.optional(__S(57, __c7, 1)),
          status: S.optional(S.String),
          createdTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "UpdateAutomationRuleResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          status: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateEnrollmentConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          status: S.String,
          statusReason: S.optional(S.String),
          lastUpdatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "UpdateEnrollmentConfigurationResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
