import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Budgets",
  serviceShapeName: "AWSBudgetServiceGateway",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "budgets" });
const ver = /*@__PURE__*/ T.ServiceVersion("2016-10-20");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
    const { UseDualStack = false, UseFIPS = false, Endpoint, Region } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    const _p0 = () => ({ authSchemes: [{ name: "sigv4", signingRegion: "eusc-de-east-1" }] });
    const _p1 = (_0: unknown) => ({
      authSchemes: [{ name: "sigv4", signingRegion: `${_.getAttr(_0, "implicitGlobalRegion")}` }],
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
            UseDualStack === true
          ) {
            return e(
              "https://budgets.us-east-1.api.aws",
              { authSchemes: [{ name: "sigv4", signingRegion: "us-east-1" }] },
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-b" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              "https://budgets.global.sc2s.sgov.gov",
              { authSchemes: [{ name: "sigv4", signingRegion: "us-isob-east-1" }] },
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-e" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              "https://budgets.global.cloud.adc-e.uk",
              { authSchemes: [{ name: "sigv4", signingRegion: "eu-isoe-west-1" }] },
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-f" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              "https://budgets.global.csp.hci.ic.gov",
              { authSchemes: [{ name: "sigv4", signingRegion: "us-isof-south-1" }] },
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-eusc" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e("https://budgets.eusc-de-east-1.api.amazonwebservices.eu", _p0(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-eusc" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e("https://budgets.eusc-de-east-1.api.amazonwebservices.eu", _p0(), {});
          }
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://budgets-fips.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                _p1(PartitionResult),
                {},
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true && UseDualStack === false) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://budgets-fips.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                _p1(PartitionResult),
                {},
              );
            }
            return err("FIPS is enabled but this partition does not support FIPS");
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://budgets.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                _p1(PartitionResult),
                {},
              );
            }
            return err("DualStack is enabled but this partition does not support DualStack");
          }
          return e(
            `https://budgets.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            _p1(PartitionResult),
            {},
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://budgets.{D}","properties":{"authSchemes":[{"name":"sigv4","signingRegion":"us-east-1"}]},"headers":{}}',
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
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class BillingViewHealthStatusException
  extends /*@__PURE__*/ S.TaggedError<BillingViewHealthStatusException>()(
    "BillingViewHealthStatusException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class CreationLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<CreationLimitExceededException>()(
    "CreationLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(405),
  ).pipe(C.withBadRequestError) {}
export class DuplicateRecordException
  extends /*@__PURE__*/ S.TaggedError<DuplicateRecordException>()(
    "DuplicateRecordException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ExpiredNextTokenException
  extends /*@__PURE__*/ S.TaggedError<ExpiredNextTokenException>()(
    "ExpiredNextTokenException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalErrorException>()(
    "InternalErrorException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()(
    "InvalidNextTokenException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()(
    "InvalidParameterException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceLockedException
  extends /*@__PURE__*/ S.TaggedError<ResourceLockedException>()(
    "ResourceLockedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(423),
  ) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type AccountId = string;
export type BudgetName = string;
export type NumericValue = string;
export type UnitValue = string;
export interface Spend {
  Amount: string;
  Unit: string;
}
export type PlannedBudgetLimits = { [key: string]: Spend | undefined };
export type DimensionValue = string;
export type DimensionValues = string[];
export type CostFilters = { [key: string]: string[] | undefined };
export interface CostTypes {
  IncludeTax?: boolean;
  IncludeSubscription?: boolean;
  UseBlended?: boolean;
  IncludeRefund?: boolean;
  IncludeCredit?: boolean;
  IncludeUpfront?: boolean;
  IncludeRecurring?: boolean;
  IncludeOtherSubscription?: boolean;
  IncludeSupport?: boolean;
  IncludeDiscount?: boolean;
  UseAmortized?: boolean;
}
export type TimeUnit = "DAILY" | "MONTHLY" | "QUARTERLY" | "ANNUALLY" | "CUSTOM" | (string & {});
export interface TimePeriod {
  Start?: Date;
  End?: Date;
}
export interface CalculatedSpend {
  ActualSpend: Spend;
  ForecastedSpend?: Spend;
}
export type BudgetType =
  | "USAGE"
  | "COST"
  | "RI_UTILIZATION"
  | "RI_COVERAGE"
  | "SAVINGS_PLANS_UTILIZATION"
  | "SAVINGS_PLANS_COVERAGE"
  | (string & {});
export type AutoAdjustType = "HISTORICAL" | "FORECAST" | (string & {});
export type AdjustmentPeriod = number;
export interface HistoricalOptions {
  BudgetAdjustmentPeriod: number;
  LookBackAvailablePeriods?: number;
}
export interface AutoAdjustData {
  AutoAdjustType: AutoAdjustType;
  HistoricalOptions?: HistoricalOptions;
  LastAutoAdjustTime?: Date;
}
export type Expressions = Expression[];
export type Dimension =
  | "AZ"
  | "INSTANCE_TYPE"
  | "LINKED_ACCOUNT"
  | "LINKED_ACCOUNT_NAME"
  | "OPERATION"
  | "PURCHASE_TYPE"
  | "REGION"
  | "SERVICE"
  | "SERVICE_CODE"
  | "USAGE_TYPE"
  | "USAGE_TYPE_GROUP"
  | "RECORD_TYPE"
  | "OPERATING_SYSTEM"
  | "TENANCY"
  | "SCOPE"
  | "PLATFORM"
  | "SUBSCRIPTION_ID"
  | "LEGAL_ENTITY_NAME"
  | "INVOICING_ENTITY"
  | "DEPLOYMENT_OPTION"
  | "DATABASE_ENGINE"
  | "CACHE_ENGINE"
  | "INSTANCE_TYPE_FAMILY"
  | "BILLING_ENTITY"
  | "RESERVATION_ID"
  | "RESOURCE_ID"
  | "RIGHTSIZING_TYPE"
  | "SAVINGS_PLANS_TYPE"
  | "SAVINGS_PLAN_ARN"
  | "PAYMENT_OPTION"
  | "RESERVATION_MODIFIED"
  | "TAG_KEY"
  | "COST_CATEGORY_NAME"
  | (string & {});
export type Value = string;
export type Values = string[];
export type MatchOption =
  | "EQUALS"
  | "ABSENT"
  | "STARTS_WITH"
  | "ENDS_WITH"
  | "CONTAINS"
  | "GREATER_THAN_OR_EQUAL"
  | "CASE_SENSITIVE"
  | "CASE_INSENSITIVE"
  | (string & {});
export type MatchOptions = MatchOption[];
export interface ExpressionDimensionValues {
  Key: Dimension;
  Values: string[];
  MatchOptions?: MatchOption[];
}
export type TagKey = string;
export interface TagValues {
  Key?: string;
  Values?: string[];
  MatchOptions?: MatchOption[];
}
export type CostCategoryName = string;
export interface CostCategoryValues {
  Key?: string;
  Values?: string[];
  MatchOptions?: MatchOption[];
}
export interface Expression {
  Or?: Expression[];
  And?: Expression[];
  Not?: Expression;
  Dimensions?: ExpressionDimensionValues;
  Tags?: TagValues;
  CostCategories?: CostCategoryValues;
}
export type Metric =
  | "BlendedCost"
  | "UnblendedCost"
  | "AmortizedCost"
  | "NetUnblendedCost"
  | "NetAmortizedCost"
  | "UsageQuantity"
  | "NormalizedUsageAmount"
  | "Hours"
  | (string & {});
export type Metrics = Metric[];
export type BillingViewArn = string;
export type HealthStatusValue = "HEALTHY" | "UNHEALTHY" | (string & {});
export type HealthStatusReason =
  | "BILLING_VIEW_NO_ACCESS"
  | "BILLING_VIEW_UNHEALTHY"
  | "FILTER_INVALID"
  | "MULTI_YEAR_HISTORICAL_DATA_DISABLED"
  | (string & {});
export interface HealthStatus {
  Status?: HealthStatusValue;
  StatusReason?: HealthStatusReason;
  LastUpdatedTime?: Date;
}
export interface Budget {
  BudgetName: string;
  BudgetLimit?: Spend;
  PlannedBudgetLimits?: { [key: string]: Spend | undefined };
  CostFilters?: { [key: string]: string[] | undefined };
  CostTypes?: CostTypes;
  TimeUnit: TimeUnit;
  TimePeriod?: TimePeriod;
  CalculatedSpend?: CalculatedSpend;
  BudgetType: BudgetType;
  LastUpdatedTime?: Date;
  AutoAdjustData?: AutoAdjustData;
  FilterExpression?: Expression;
  Metrics?: Metric[];
  BillingViewArn?: string;
  HealthStatus?: HealthStatus;
}
export type NotificationType = "ACTUAL" | "FORECASTED" | (string & {});
export type ComparisonOperator = "GREATER_THAN" | "LESS_THAN" | "EQUAL_TO" | (string & {});
export type NotificationThreshold = number;
export type ThresholdType = "PERCENTAGE" | "ABSOLUTE_VALUE" | (string & {});
export type NotificationState = "OK" | "ALARM" | (string & {});
export interface Notification {
  NotificationType: NotificationType;
  ComparisonOperator: ComparisonOperator;
  Threshold: number;
  ThresholdType?: ThresholdType;
  NotificationState?: NotificationState;
}
export type SubscriptionType = "SNS" | "EMAIL" | (string & {});
export type SubscriberAddress = string | redacted.Redacted<string>;
export interface Subscriber {
  SubscriptionType: SubscriptionType;
  Address: string | redacted.Redacted<string>;
}
export type Subscribers = Subscriber[];
export interface NotificationWithSubscribers {
  Notification: Notification;
  Subscribers: Subscriber[];
}
export type NotificationWithSubscribersList = NotificationWithSubscribers[];
export type ResourceTagKey = string;
export type ResourceTagValue = string;
export interface ResourceTag {
  Key: string;
  Value: string;
}
export type ResourceTagList = ResourceTag[];
export interface CreateBudgetRequest {
  AccountId: string;
  Budget: Budget;
  NotificationsWithSubscribers?: NotificationWithSubscribers[];
  ResourceTags?: ResourceTag[];
}
export interface CreateBudgetResponse {}
export type ActionType =
  | "APPLY_IAM_POLICY"
  | "APPLY_SCP_POLICY"
  | "RUN_SSM_DOCUMENTS"
  | (string & {});
export interface ActionThreshold {
  ActionThresholdValue: number;
  ActionThresholdType: ThresholdType;
}
export type PolicyArn = string;
export type Role = string;
export type Roles = string[];
export type Group = string;
export type Groups = string[];
export type User = string;
export type Users = string[];
export interface IamActionDefinition {
  PolicyArn: string;
  Roles?: string[];
  Groups?: string[];
  Users?: string[];
}
export type PolicyId = string;
export type TargetId = string;
export type TargetIds = string[];
export interface ScpActionDefinition {
  PolicyId: string;
  TargetIds: string[];
}
export type ActionSubType = "STOP_EC2_INSTANCES" | "STOP_RDS_INSTANCES" | (string & {});
export type Region = string;
export type InstanceId = string;
export type InstanceIds = string[];
export interface SsmActionDefinition {
  ActionSubType: ActionSubType;
  Region: string;
  InstanceIds: string[];
}
export interface Definition {
  IamActionDefinition?: IamActionDefinition;
  ScpActionDefinition?: ScpActionDefinition;
  SsmActionDefinition?: SsmActionDefinition;
}
export type RoleArn = string;
export type ApprovalModel = "AUTOMATIC" | "MANUAL" | (string & {});
export interface CreateBudgetActionRequest {
  AccountId: string;
  BudgetName: string;
  NotificationType: NotificationType;
  ActionType: ActionType;
  ActionThreshold: ActionThreshold;
  Definition: Definition;
  ExecutionRoleArn: string;
  ApprovalModel: ApprovalModel;
  Subscribers: Subscriber[];
  ResourceTags?: ResourceTag[];
}
export type ActionId = string;
export interface CreateBudgetActionResponse {
  AccountId: string;
  BudgetName: string;
  ActionId: string;
}
export interface CreateNotificationRequest {
  AccountId: string;
  BudgetName: string;
  Notification: Notification;
  Subscribers: Subscriber[];
}
export interface CreateNotificationResponse {}
export interface CreateSubscriberRequest {
  AccountId: string;
  BudgetName: string;
  Notification: Notification;
  Subscriber: Subscriber;
}
export interface CreateSubscriberResponse {}
export interface DeleteBudgetRequest {
  AccountId: string;
  BudgetName: string;
}
export interface DeleteBudgetResponse {}
export interface DeleteBudgetActionRequest {
  AccountId: string;
  BudgetName: string;
  ActionId: string;
}
export type ActionStatus =
  | "STANDBY"
  | "PENDING"
  | "EXECUTION_IN_PROGRESS"
  | "EXECUTION_SUCCESS"
  | "EXECUTION_FAILURE"
  | "REVERSE_IN_PROGRESS"
  | "REVERSE_SUCCESS"
  | "REVERSE_FAILURE"
  | "RESET_IN_PROGRESS"
  | "RESET_FAILURE"
  | (string & {});
export interface Action {
  ActionId: string;
  BudgetName: string;
  NotificationType: NotificationType;
  ActionType: ActionType;
  ActionThreshold: ActionThreshold;
  Definition: Definition;
  ExecutionRoleArn: string;
  ApprovalModel: ApprovalModel;
  Status: ActionStatus;
  Subscribers: Subscriber[];
}
export interface DeleteBudgetActionResponse {
  AccountId: string;
  BudgetName: string;
  Action: Action;
}
export interface DeleteNotificationRequest {
  AccountId: string;
  BudgetName: string;
  Notification: Notification;
}
export interface DeleteNotificationResponse {}
export interface DeleteSubscriberRequest {
  AccountId: string;
  BudgetName: string;
  Notification: Notification;
  Subscriber: Subscriber;
}
export interface DeleteSubscriberResponse {}
export interface DescribeBudgetRequest {
  AccountId: string;
  BudgetName: string;
  ShowFilterExpression?: boolean;
}
export interface DescribeBudgetResponse {
  Budget?: Budget;
}
export interface DescribeBudgetActionRequest {
  AccountId: string;
  BudgetName: string;
  ActionId: string;
}
export interface DescribeBudgetActionResponse {
  AccountId: string;
  BudgetName: string;
  Action: Action;
}
export type MaxResults = number;
export interface DescribeBudgetActionHistoriesRequest {
  AccountId: string;
  BudgetName: string;
  ActionId: string;
  TimePeriod?: TimePeriod;
  MaxResults?: number;
  NextToken?: string;
}
export type EventType =
  | "SYSTEM"
  | "CREATE_ACTION"
  | "DELETE_ACTION"
  | "UPDATE_ACTION"
  | "EXECUTE_ACTION"
  | (string & {});
export interface ActionHistoryDetails {
  Message: string;
  Action: Action;
}
export interface ActionHistory {
  Timestamp: Date;
  Status: ActionStatus;
  EventType: EventType;
  ActionHistoryDetails: ActionHistoryDetails;
}
export type ActionHistories = ActionHistory[];
export interface DescribeBudgetActionHistoriesResponse {
  ActionHistories: ActionHistory[];
  NextToken?: string;
}
export interface DescribeBudgetActionsForAccountRequest {
  AccountId: string;
  MaxResults?: number;
  NextToken?: string;
}
export type Actions = Action[];
export interface DescribeBudgetActionsForAccountResponse {
  Actions: Action[];
  NextToken?: string;
}
export interface DescribeBudgetActionsForBudgetRequest {
  AccountId: string;
  BudgetName: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface DescribeBudgetActionsForBudgetResponse {
  Actions: Action[];
  NextToken?: string;
}
export type MaxResultsBudgetNotifications = number;
export interface DescribeBudgetNotificationsForAccountRequest {
  AccountId: string;
  MaxResults?: number;
  NextToken?: string;
}
export type Notifications = Notification[];
export interface BudgetNotificationsForAccount {
  Notifications?: Notification[];
  BudgetName?: string;
}
export type BudgetNotificationsForAccountList = BudgetNotificationsForAccount[];
export interface DescribeBudgetNotificationsForAccountResponse {
  BudgetNotificationsForAccount?: BudgetNotificationsForAccount[];
  NextToken?: string;
}
export interface DescribeBudgetPerformanceHistoryRequest {
  AccountId: string;
  BudgetName: string;
  TimePeriod?: TimePeriod;
  MaxResults?: number;
  NextToken?: string;
}
export interface BudgetedAndActualAmounts {
  BudgetedAmount?: Spend;
  ActualAmount?: Spend;
  TimePeriod?: TimePeriod;
}
export type BudgetedAndActualAmountsList = BudgetedAndActualAmounts[];
export interface BudgetPerformanceHistory {
  BudgetName?: string;
  BudgetType?: BudgetType;
  CostFilters?: { [key: string]: string[] | undefined };
  CostTypes?: CostTypes;
  TimeUnit?: TimeUnit;
  BillingViewArn?: string;
  BudgetedAndActualAmountsList?: BudgetedAndActualAmounts[];
  FilterExpression?: Expression;
  Metrics?: Metric[];
}
export interface DescribeBudgetPerformanceHistoryResponse {
  BudgetPerformanceHistory?: BudgetPerformanceHistory;
  NextToken?: string;
}
export type MaxResultsDescribeBudgets = number;
export interface DescribeBudgetsRequest {
  AccountId: string;
  MaxResults?: number;
  NextToken?: string;
  ShowFilterExpression?: boolean;
}
export type Budgets = Budget[];
export interface DescribeBudgetsResponse {
  Budgets?: Budget[];
  NextToken?: string;
}
export interface DescribeNotificationsForBudgetRequest {
  AccountId: string;
  BudgetName: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface DescribeNotificationsForBudgetResponse {
  Notifications?: Notification[];
  NextToken?: string;
}
export interface DescribeSubscribersForNotificationRequest {
  AccountId: string;
  BudgetName: string;
  Notification: Notification;
  MaxResults?: number;
  NextToken?: string;
}
export interface DescribeSubscribersForNotificationResponse {
  Subscribers?: Subscriber[];
  NextToken?: string;
}
export type ExecutionType =
  | "APPROVE_BUDGET_ACTION"
  | "RETRY_BUDGET_ACTION"
  | "REVERSE_BUDGET_ACTION"
  | "RESET_BUDGET_ACTION"
  | (string & {});
export interface ExecuteBudgetActionRequest {
  AccountId: string;
  BudgetName: string;
  ActionId: string;
  ExecutionType: ExecutionType;
}
export interface ExecuteBudgetActionResponse {
  AccountId: string;
  BudgetName: string;
  ActionId: string;
  ExecutionType: ExecutionType;
}
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export interface ListTagsForResourceResponse {
  ResourceTags?: ResourceTag[];
}
export interface TagResourceRequest {
  ResourceARN: string;
  ResourceTags: ResourceTag[];
}
export interface TagResourceResponse {}
export type ResourceTagKeyList = string[];
export interface UntagResourceRequest {
  ResourceARN: string;
  ResourceTagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateBudgetRequest {
  AccountId: string;
  NewBudget: Budget;
}
export interface UpdateBudgetResponse {}
export interface UpdateBudgetActionRequest {
  AccountId: string;
  BudgetName: string;
  ActionId: string;
  NotificationType?: NotificationType;
  ActionThreshold?: ActionThreshold;
  Definition?: Definition;
  ExecutionRoleArn?: string;
  ApprovalModel?: ApprovalModel;
  Subscribers?: Subscriber[];
}
export interface UpdateBudgetActionResponse {
  AccountId: string;
  BudgetName: string;
  OldAction: Action;
  NewAction: Action;
}
export interface UpdateNotificationRequest {
  AccountId: string;
  BudgetName: string;
  OldNotification: Notification;
  NewNotification: Notification;
}
export interface UpdateNotificationResponse {}
export interface UpdateSubscriberRequest {
  AccountId: string;
  BudgetName: string;
  Notification: Notification;
  OldSubscriber: Subscriber;
  NewSubscriber: Subscriber;
}
export interface UpdateSubscriberResponse {}
export type ErrorMessage = string;
export type CreateBudgetError =
  | AccessDeniedException
  | BillingViewHealthStatusException
  | CreationLimitExceededException
  | DuplicateRecordException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a budget and, if included, notifications and subscribers.
 *
 * Only one of `BudgetLimit` or `PlannedBudgetLimits` can be present in
 * the syntax at one time. Use the syntax that matches your use case. The Request Syntax
 * section shows the `BudgetLimit` syntax. For `PlannedBudgetLimits`,
 * see the Examples section.
 *
 * Similarly, only one set of filter and metric selections can be present in the syntax
 * at one time. Either `FilterExpression` and `Metrics` or
 * `CostFilters` and `CostTypes`, not both or a different
 * combination. We recommend using `FilterExpression` and `Metrics`
 * as they provide more flexible and powerful filtering capabilities. The Request Syntax
 * section shows the `FilterExpression`/`Metrics` syntax.
 */
export const createBudget: API.OperationMethod<
  CreateBudgetRequest,
  CreateBudgetResponse,
  CreateBudgetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2, __c0, 2) as any as S.Schema<CreateBudgetRequest>,
  output: __S(40, __c5, 0) as any as S.Schema<CreateBudgetResponse>,
  errors: [
    AccessDeniedException,
    BillingViewHealthStatusException,
    CreationLimitExceededException,
    DuplicateRecordException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBudget",
}));

export type CreateBudgetActionError =
  | AccessDeniedException
  | CreationLimitExceededException
  | DuplicateRecordException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a budget action.
 */
export const createBudgetAction: API.OperationMethod<
  CreateBudgetActionRequest,
  CreateBudgetActionResponse,
  CreateBudgetActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<CreateBudgetActionRequest>,
  output: __S(81, __c10, 1) as any as S.Schema<CreateBudgetActionResponse>,
  errors: [
    AccessDeniedException,
    CreationLimitExceededException,
    DuplicateRecordException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBudgetAction",
}));

export type CreateNotificationError =
  | AccessDeniedException
  | CreationLimitExceededException
  | DuplicateRecordException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a notification. You must create the budget before you create the associated notification.
 */
export const createNotification: API.OperationMethod<
  CreateNotificationRequest,
  CreateNotificationResponse,
  CreateNotificationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<CreateNotificationRequest>,
  output: __S(40, __c5, 0) as any as S.Schema<CreateNotificationResponse>,
  errors: [
    AccessDeniedException,
    CreationLimitExceededException,
    DuplicateRecordException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNotification",
}));

export type CreateSubscriberError =
  | AccessDeniedException
  | CreationLimitExceededException
  | DuplicateRecordException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a subscriber. You must create the associated budget and notification before you create the subscriber.
 */
export const createSubscriber: API.OperationMethod<
  CreateSubscriberRequest,
  CreateSubscriberResponse,
  CreateSubscriberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<CreateSubscriberRequest>,
  output: __S(40, __c5, 0) as any as S.Schema<CreateSubscriberResponse>,
  errors: [
    AccessDeniedException,
    CreationLimitExceededException,
    DuplicateRecordException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSubscriber",
}));

export type DeleteBudgetError =
  | AccessDeniedException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a budget. You can delete your budget at any time.
 *
 * Deleting a budget also deletes the notifications and subscribers that are associated with that budget.
 */
export const deleteBudget: API.OperationMethod<
  DeleteBudgetRequest,
  DeleteBudgetResponse,
  DeleteBudgetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c14, 0) as any as S.Schema<DeleteBudgetRequest>,
  output: __S(40, __c5, 0) as any as S.Schema<DeleteBudgetResponse>,
  errors: [
    AccessDeniedException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBudget",
}));

export type DeleteBudgetActionError =
  | AccessDeniedException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ResourceLockedException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a budget action.
 */
export const deleteBudgetAction: API.OperationMethod<
  DeleteBudgetActionRequest,
  DeleteBudgetActionResponse,
  DeleteBudgetActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(120, __c15, 0) as any as S.Schema<DeleteBudgetActionRequest>,
  output: __S(128, __c16, 0) as any as S.Schema<DeleteBudgetActionResponse>,
  errors: [
    AccessDeniedException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ResourceLockedException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBudgetAction",
}));

export type DeleteNotificationError =
  | AccessDeniedException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a notification.
 *
 * Deleting a notification also deletes the subscribers that are associated with the notification.
 */
export const deleteNotification: API.OperationMethod<
  DeleteNotificationRequest,
  DeleteNotificationResponse,
  DeleteNotificationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<DeleteNotificationRequest>,
  output: __S(40, __c5, 0) as any as S.Schema<DeleteNotificationResponse>,
  errors: [
    AccessDeniedException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNotification",
}));

export type DeleteSubscriberError =
  | AccessDeniedException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a subscriber.
 *
 * Deleting the last subscriber to a notification also deletes the notification.
 */
export const deleteSubscriber: API.OperationMethod<
  DeleteSubscriberRequest,
  DeleteSubscriberResponse,
  DeleteSubscriberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<DeleteSubscriberRequest>,
  output: __S(40, __c5, 0) as any as S.Schema<DeleteSubscriberResponse>,
  errors: [
    AccessDeniedException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSubscriber",
}));

export type DescribeBudgetError =
  | AccessDeniedException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes a budget.
 *
 * The Request Syntax section shows the `BudgetLimit` syntax. For
 * `PlannedBudgetLimits`, see the Examples section.
 */
export const describeBudget: API.OperationMethod<
  DescribeBudgetRequest,
  DescribeBudgetResponse,
  DescribeBudgetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c20, 0) as any as S.Schema<DescribeBudgetRequest>,
  output: __S(161, __c20, 1) as any as S.Schema<DescribeBudgetResponse>,
  errors: [
    AccessDeniedException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBudget",
}));

export type DescribeBudgetActionError =
  | AccessDeniedException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes a budget action detail.
 */
export const describeBudgetAction: API.OperationMethod<
  DescribeBudgetActionRequest,
  DescribeBudgetActionResponse,
  DescribeBudgetActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(168, __c21, 0) as any as S.Schema<DescribeBudgetActionRequest>,
  output: __S(128, __c16, 0) as any as S.Schema<DescribeBudgetActionResponse>,
  errors: [
    AccessDeniedException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBudgetAction",
}));

export type DescribeBudgetActionHistoriesError =
  | AccessDeniedException
  | InternalErrorException
  | InvalidNextTokenException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes a budget action history detail.
 */
export const describeBudgetActionHistories: API.PaginatedOperationMethod<
  DescribeBudgetActionHistoriesRequest,
  DescribeBudgetActionHistoriesResponse,
  DescribeBudgetActionHistoriesError,
  Credentials | HttpClient.HttpClient,
  ActionHistory
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<DescribeBudgetActionHistoriesRequest>,
  output: __S(180, __c22, 4) as any as S.Schema<DescribeBudgetActionHistoriesResponse>,
  errors: [
    AccessDeniedException,
    InternalErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBudgetActionHistories",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ActionHistories",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeBudgetActionsForAccountError =
  | AccessDeniedException
  | InternalErrorException
  | InvalidNextTokenException
  | InvalidParameterException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes all of the budget actions for an account.
 */
export const describeBudgetActionsForAccount: API.PaginatedOperationMethod<
  DescribeBudgetActionsForAccountRequest,
  DescribeBudgetActionsForAccountResponse,
  DescribeBudgetActionsForAccountError,
  Credentials | HttpClient.HttpClient,
  Action
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(184, __c23, 0) as any as S.Schema<DescribeBudgetActionsForAccountRequest>,
  output: __S(193, __c24, 1) as any as S.Schema<DescribeBudgetActionsForAccountResponse>,
  errors: [
    AccessDeniedException,
    InternalErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBudgetActionsForAccount",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Actions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeBudgetActionsForBudgetError =
  | AccessDeniedException
  | InternalErrorException
  | InvalidNextTokenException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes all of the budget actions for a budget.
 */
export const describeBudgetActionsForBudget: API.PaginatedOperationMethod<
  DescribeBudgetActionsForBudgetRequest,
  DescribeBudgetActionsForBudgetResponse,
  DescribeBudgetActionsForBudgetError,
  Credentials | HttpClient.HttpClient,
  Action
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(200, __c25, 0) as any as S.Schema<DescribeBudgetActionsForBudgetRequest>,
  output: __S(193, __c24, 1) as any as S.Schema<DescribeBudgetActionsForBudgetResponse>,
  errors: [
    AccessDeniedException,
    InternalErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBudgetActionsForBudget",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Actions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeBudgetNotificationsForAccountError =
  | AccessDeniedException
  | ExpiredNextTokenException
  | InternalErrorException
  | InvalidNextTokenException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the budget names and notifications that are associated with an account.
 */
export const describeBudgetNotificationsForAccount: API.PaginatedOperationMethod<
  DescribeBudgetNotificationsForAccountRequest,
  DescribeBudgetNotificationsForAccountResponse,
  DescribeBudgetNotificationsForAccountError,
  Credentials | HttpClient.HttpClient,
  BudgetNotificationsForAccount
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(208, __c26, 0) as any as S.Schema<DescribeBudgetNotificationsForAccountRequest>,
  output: __S(211, __c26, 3) as any as S.Schema<DescribeBudgetNotificationsForAccountResponse>,
  errors: [
    AccessDeniedException,
    ExpiredNextTokenException,
    InternalErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBudgetNotificationsForAccount",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BudgetNotificationsForAccount",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeBudgetPerformanceHistoryError =
  | AccessDeniedException
  | BillingViewHealthStatusException
  | ExpiredNextTokenException
  | InternalErrorException
  | InvalidNextTokenException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the history for `DAILY`, `MONTHLY`, and `QUARTERLY` budgets. Budget history isn't available for `ANNUAL` budgets.
 */
export const describeBudgetPerformanceHistory: API.PaginatedOperationMethod<
  DescribeBudgetPerformanceHistoryRequest,
  DescribeBudgetPerformanceHistoryResponse,
  DescribeBudgetPerformanceHistoryError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(224, __c28, 0) as any as S.Schema<DescribeBudgetPerformanceHistoryRequest>,
  output: __S(228, __c28, 4) as any as S.Schema<DescribeBudgetPerformanceHistoryResponse>,
  errors: [
    AccessDeniedException,
    BillingViewHealthStatusException,
    ExpiredNextTokenException,
    InternalErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBudgetPerformanceHistory",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeBudgetsError =
  | AccessDeniedException
  | ExpiredNextTokenException
  | InternalErrorException
  | InvalidNextTokenException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the budgets that are associated with an account.
 *
 * The Request Syntax section shows the `BudgetLimit` syntax. For
 * `PlannedBudgetLimits`, see the Examples section.
 */
export const describeBudgets: API.PaginatedOperationMethod<
  DescribeBudgetsRequest,
  DescribeBudgetsResponse,
  DescribeBudgetsError,
  Credentials | HttpClient.HttpClient,
  Budget
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(232, __c29, 0) as any as S.Schema<DescribeBudgetsRequest>,
  output: __S(234, __c29, 2) as any as S.Schema<DescribeBudgetsResponse>,
  errors: [
    AccessDeniedException,
    ExpiredNextTokenException,
    InternalErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBudgets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Budgets",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeNotificationsForBudgetError =
  | AccessDeniedException
  | ExpiredNextTokenException
  | InternalErrorException
  | InvalidNextTokenException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the notifications that are associated with a budget.
 */
export const describeNotificationsForBudget: API.PaginatedOperationMethod<
  DescribeNotificationsForBudgetRequest,
  DescribeNotificationsForBudgetResponse,
  DescribeNotificationsForBudgetError,
  Credentials | HttpClient.HttpClient,
  Notification
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(240, __c30, 0) as any as S.Schema<DescribeNotificationsForBudgetRequest>,
  output: __S(241, __c30, 1) as any as S.Schema<DescribeNotificationsForBudgetResponse>,
  errors: [
    AccessDeniedException,
    ExpiredNextTokenException,
    InternalErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeNotificationsForBudget",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Notifications",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeSubscribersForNotificationError =
  | AccessDeniedException
  | ExpiredNextTokenException
  | InternalErrorException
  | InvalidNextTokenException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the subscribers that are associated with a notification.
 */
export const describeSubscribersForNotification: API.PaginatedOperationMethod<
  DescribeSubscribersForNotificationRequest,
  DescribeSubscribersForNotificationResponse,
  DescribeSubscribersForNotificationError,
  Credentials | HttpClient.HttpClient,
  Subscriber
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(248, __c31, 0) as any as S.Schema<DescribeSubscribersForNotificationRequest>,
  output: __S(249, __c31, 1) as any as S.Schema<DescribeSubscribersForNotificationResponse>,
  errors: [
    AccessDeniedException,
    ExpiredNextTokenException,
    InternalErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSubscribersForNotification",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Subscribers",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ExecuteBudgetActionError =
  | AccessDeniedException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ResourceLockedException
  | ThrottlingException
  | CommonErrors;
/**
 * Executes a budget action.
 */
export const executeBudgetAction: API.OperationMethod<
  ExecuteBudgetActionRequest,
  ExecuteBudgetActionResponse,
  ExecuteBudgetActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c32, 0) as any as S.Schema<ExecuteBudgetActionRequest>,
  output: __S(257, __c32, 1) as any as S.Schema<ExecuteBudgetActionResponse>,
  errors: [
    AccessDeniedException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ResourceLockedException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteBudgetAction",
}));

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists tags associated with a budget or budget action resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(264, __c33, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(265, __c33, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates tags for a budget or budget action resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c34, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(40, __c5, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes tags associated with a budget or budget action resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(280, __c35, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(40, __c5, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateBudgetError =
  | AccessDeniedException
  | BillingViewHealthStatusException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a budget. You can change every part of a budget except for the `budgetName` and the `calculatedSpend`. When you modify a budget, the `calculatedSpend` drops to zero until Amazon Web Services has new usage data to use for forecasting.
 *
 * Only one of `BudgetLimit` or `PlannedBudgetLimits` can be present in
 * the syntax at one time. Use the syntax that matches your case. The Request Syntax
 * section shows the `BudgetLimit` syntax. For `PlannedBudgetLimits`,
 * see the Examples section.
 *
 * Similarly, only one set of filter and metric selections can be present in the syntax
 * at one time. Either `FilterExpression` and `Metrics` or
 * `CostFilters` and `CostTypes`, not both or a different
 * combination. We recommend using `FilterExpression` and `Metrics`
 * as they provide more flexible and powerful filtering capabilities. The Request Syntax
 * section shows the `FilterExpression`/`Metrics` syntax.
 */
export const updateBudget: API.OperationMethod<
  UpdateBudgetRequest,
  UpdateBudgetResponse,
  UpdateBudgetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c36, 0) as any as S.Schema<UpdateBudgetRequest>,
  output: __S(40, __c5, 0) as any as S.Schema<UpdateBudgetResponse>,
  errors: [
    AccessDeniedException,
    BillingViewHealthStatusException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBudget",
}));

export type UpdateBudgetActionError =
  | AccessDeniedException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ResourceLockedException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a budget action.
 */
export const updateBudgetAction: API.OperationMethod<
  UpdateBudgetActionRequest,
  UpdateBudgetActionResponse,
  UpdateBudgetActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(296, __c37, 0) as any as S.Schema<UpdateBudgetActionRequest>,
  output: __S(297, __c37, 1) as any as S.Schema<UpdateBudgetActionResponse>,
  errors: [
    AccessDeniedException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ResourceLockedException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBudgetAction",
}));

export type UpdateNotificationError =
  | AccessDeniedException
  | DuplicateRecordException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a notification.
 */
export const updateNotification: API.OperationMethod<
  UpdateNotificationRequest,
  UpdateNotificationResponse,
  UpdateNotificationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c38, 0) as any as S.Schema<UpdateNotificationRequest>,
  output: __S(40, __c5, 0) as any as S.Schema<UpdateNotificationResponse>,
  errors: [
    AccessDeniedException,
    DuplicateRecordException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNotification",
}));

export type UpdateSubscriberError =
  | AccessDeniedException
  | DuplicateRecordException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a subscriber.
 */
export const updateSubscriber: API.OperationMethod<
  UpdateSubscriberRequest,
  UpdateSubscriberResponse,
  UpdateSubscriberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(312, __c39, 0) as any as S.Schema<UpdateSubscriberRequest>,
  output: __S(40, __c5, 0) as any as S.Schema<UpdateSubscriberResponse>,
  errors: [
    AccessDeniedException,
    DuplicateRecordException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSubscriber",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Notification: __S(48, __c6, 0), Subscribers: __S(16, __c2, 0) }),
      ).annotate({ identifier: "NotificationWithSubscribers" });
    case 1:
      return S.Array(__S(0, __c0, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String,
          Budget: __S(77, __c9, 5),
          NotificationsWithSubscribers: S.optional(__S(1, __c0, 1)),
          ResourceTags: S.optional(__S(33, __c4, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateBudgetRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SubscriptionType: S.String, Address: SensitiveString }),
      ).annotate({ identifier: "Subscriber" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(8, __c1, 0));
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "ResourceTag",
      });
    case 1:
      return S.Array(__S(32, __c4, 0));
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "CreateBudgetResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NotificationType: S.String,
          ComparisonOperator: S.String,
          Threshold: S.Number,
          ThresholdType: S.optional(S.String),
          NotificationState: S.optional(S.String),
        }),
      ).annotate({ identifier: "Notification" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Start: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          End: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "TimePeriod" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Amount: S.String, Unit: S.String })).annotate({
        identifier: "Spend",
      });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(24, __c3, 0).pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          IncludeTax: S.optional(S.Boolean),
          IncludeSubscription: S.optional(S.Boolean),
          UseBlended: S.optional(S.Boolean),
          IncludeRefund: S.optional(S.Boolean),
          IncludeCredit: S.optional(S.Boolean),
          IncludeUpfront: S.optional(S.Boolean),
          IncludeRecurring: S.optional(S.Boolean),
          IncludeOtherSubscription: S.optional(S.Boolean),
          IncludeSupport: S.optional(S.Boolean),
          IncludeDiscount: S.optional(S.Boolean),
          UseAmortized: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "CostTypes" });
    case 3:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<Expression> => __S(71, __c8, 7)).annotate({
          identifier: "Expression",
        }),
      );
    case 4:
      return S.Array(S.String);
    case 5:
      return S.suspend(() =>
        S.Struct({
          Key: S.String,
          Values: __S(24, __c3, 0),
          MatchOptions: S.optional(__S(68, __c8, 4)),
        }),
      ).annotate({ identifier: "ExpressionDimensionValues" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Key: S.optional(S.String),
          Values: S.optional(__S(24, __c3, 0)),
          MatchOptions: S.optional(__S(68, __c8, 4)),
        }),
      ).annotate({ identifier: "TagValues" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          Or: S.optional(S.suspend(() => __S(67, __c8, 3)).annotate({ identifier: "Expressions" })),
          And: S.optional(
            S.suspend(() => __S(67, __c8, 3)).annotate({ identifier: "Expressions" }),
          ),
          Not: S.optional(
            S.suspend((): S.Schema<Expression> => __S(71, __c8, 7)).annotate({
              identifier: "Expression",
            }),
          ),
          Dimensions: S.optional(__S(69, __c8, 5)),
          Tags: S.optional(__S(70, __c8, 6)),
          CostCategories: S.optional(__S(70, __c8, 6)),
        }),
      ).annotate({ identifier: "Expression" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(64, __c8, 0).pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({ ActualSpend: __S(64, __c8, 0), ForecastedSpend: S.optional(__S(64, __c8, 0)) }),
      ).annotate({ identifier: "CalculatedSpend" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          BudgetAdjustmentPeriod: S.Number,
          LookBackAvailablePeriods: S.optional(S.Number),
        }),
      ).annotate({ identifier: "HistoricalOptions" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          AutoAdjustType: S.String,
          HistoricalOptions: S.optional(__S(74, __c9, 2)),
          LastAutoAdjustTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "AutoAdjustData" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          StatusReason: S.optional(S.String),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "HealthStatus" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          BudgetName: S.String,
          BudgetLimit: S.optional(__S(64, __c8, 0)),
          PlannedBudgetLimits: S.optional(__S(72, __c9, 0)),
          CostFilters: S.optional(__S(65, __c8, 1)),
          CostTypes: S.optional(__S(66, __c8, 2)),
          TimeUnit: S.String,
          TimePeriod: S.optional(__S(56, __c7, 0)),
          CalculatedSpend: S.optional(__S(73, __c9, 1)),
          BudgetType: S.String,
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AutoAdjustData: S.optional(__S(75, __c9, 3)),
          FilterExpression: S.optional(__S(71, __c8, 7)),
          Metrics: S.optional(__S(68, __c8, 4)),
          BillingViewArn: S.optional(S.String),
          HealthStatus: S.optional(__S(76, __c9, 4)),
        }),
      ).annotate({ identifier: "Budget" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String,
          BudgetName: S.String,
          NotificationType: S.String,
          ActionType: S.String,
          ActionThreshold: __S(88, __c11, 0),
          Definition: __S(92, __c11, 4),
          ExecutionRoleArn: S.String,
          ApprovalModel: S.String,
          Subscribers: __S(16, __c2, 0),
          ResourceTags: S.optional(__S(33, __c4, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateBudgetActionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AccountId: S.String, BudgetName: S.String, ActionId: S.String }),
      ).annotate({ identifier: "CreateBudgetActionResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ActionThresholdValue: S.Number, ActionThresholdType: S.String }),
      ).annotate({ identifier: "ActionThreshold" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PolicyArn: S.String,
          Roles: S.optional(__S(24, __c3, 0)),
          Groups: S.optional(__S(24, __c3, 0)),
          Users: S.optional(__S(24, __c3, 0)),
        }),
      ).annotate({ identifier: "IamActionDefinition" });
    case 2:
      return S.suspend(() =>
        S.Struct({ PolicyId: S.String, TargetIds: __S(24, __c3, 0) }),
      ).annotate({ identifier: "ScpActionDefinition" });
    case 3:
      return S.suspend(() =>
        S.Struct({ ActionSubType: S.String, Region: S.String, InstanceIds: __S(24, __c3, 0) }),
      ).annotate({ identifier: "SsmActionDefinition" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          IamActionDefinition: S.optional(__S(89, __c11, 1)),
          ScpActionDefinition: S.optional(__S(90, __c11, 2)),
          SsmActionDefinition: S.optional(__S(91, __c11, 3)),
        }),
      ).annotate({ identifier: "Definition" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String,
          BudgetName: S.String,
          Notification: __S(48, __c6, 0),
          Subscribers: __S(16, __c2, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateNotificationRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String,
          BudgetName: S.String,
          Notification: __S(48, __c6, 0),
          Subscriber: __S(8, __c1, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateSubscriberRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.String, BudgetName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteBudgetRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.String, BudgetName: S.String, ActionId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteBudgetActionRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.String, BudgetName: S.String, Action: __S(136, __c17, 0) }),
      ).annotate({ identifier: "DeleteBudgetActionResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ActionId: S.String,
          BudgetName: S.String,
          NotificationType: S.String,
          ActionType: S.String,
          ActionThreshold: __S(88, __c11, 0),
          Definition: __S(92, __c11, 4),
          ExecutionRoleArn: S.String,
          ApprovalModel: S.String,
          Status: S.String,
          Subscribers: __S(16, __c2, 0),
        }),
      ).annotate({ identifier: "Action" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String,
          BudgetName: S.String,
          Notification: __S(48, __c6, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteNotificationRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String,
          BudgetName: S.String,
          Notification: __S(48, __c6, 0),
          Subscriber: __S(8, __c1, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteSubscriberRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String,
          BudgetName: S.String,
          ShowFilterExpression: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeBudgetRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Budget: S.optional(__S(77, __c9, 5)) })).annotate({
        identifier: "DescribeBudgetResponse",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.String, BudgetName: S.String, ActionId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeBudgetActionRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String,
          BudgetName: S.String,
          ActionId: S.String,
          TimePeriod: S.optional(__S(56, __c7, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeBudgetActionHistoriesRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Message: S.String, Action: __S(136, __c17, 0) })).annotate({
        identifier: "ActionHistoryDetails",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Status: S.String,
          EventType: S.String,
          ActionHistoryDetails: __S(177, __c22, 1),
        }),
      ).annotate({ identifier: "ActionHistory" });
    case 3:
      return S.Array(__S(178, __c22, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ ActionHistories: __S(179, __c22, 3), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeBudgetActionHistoriesResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeBudgetActionsForAccountRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(136, __c17, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({ Actions: __S(192, __c24, 0), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeBudgetActionsForAccountResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String,
          BudgetName: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeBudgetActionsForBudgetRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeBudgetNotificationsForAccountRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Notifications: S.optional(__S(216, __c27, 0)),
          BudgetName: S.optional(S.String),
        }),
      ).annotate({ identifier: "BudgetNotificationsForAccount" });
    case 2:
      return S.Array(__S(209, __c26, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          BudgetNotificationsForAccount: S.optional(__S(210, __c26, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeBudgetNotificationsForAccountResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(48, __c6, 0));
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String,
          BudgetName: S.String,
          TimePeriod: S.optional(__S(56, __c7, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeBudgetPerformanceHistoryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BudgetedAmount: S.optional(__S(64, __c8, 0)),
          ActualAmount: S.optional(__S(64, __c8, 0)),
          TimePeriod: S.optional(__S(56, __c7, 0)),
        }),
      ).annotate({ identifier: "BudgetedAndActualAmounts" });
    case 2:
      return S.Array(__S(225, __c28, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          BudgetName: S.optional(S.String),
          BudgetType: S.optional(S.String),
          CostFilters: S.optional(__S(65, __c8, 1)),
          CostTypes: S.optional(__S(66, __c8, 2)),
          TimeUnit: S.optional(S.String),
          BillingViewArn: S.optional(S.String),
          BudgetedAndActualAmountsList: S.optional(__S(226, __c28, 2)),
          FilterExpression: S.optional(__S(71, __c8, 7)),
          Metrics: S.optional(__S(68, __c8, 4)),
        }),
      ).annotate({ identifier: "BudgetPerformanceHistory" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          BudgetPerformanceHistory: S.optional(__S(227, __c28, 3)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeBudgetPerformanceHistoryResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          ShowFilterExpression: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeBudgetsRequest" });
    case 1:
      return S.Array(__S(77, __c9, 5));
    case 2:
      return S.suspend(() =>
        S.Struct({ Budgets: S.optional(__S(233, __c29, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeBudgetsResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String,
          BudgetName: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeNotificationsForBudgetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Notifications: S.optional(__S(216, __c27, 0)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeNotificationsForBudgetResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String,
          BudgetName: S.String,
          Notification: __S(48, __c6, 0),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeSubscribersForNotificationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Subscribers: S.optional(__S(16, __c2, 0)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeSubscribersForNotificationResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String,
          BudgetName: S.String,
          ActionId: S.String,
          ExecutionType: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ExecuteBudgetActionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String,
          BudgetName: S.String,
          ActionId: S.String,
          ExecutionType: S.String,
        }),
      ).annotate({ identifier: "ExecuteBudgetActionResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ResourceTags: S.optional(__S(33, __c4, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, ResourceTags: __S(33, __c4, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, ResourceTagKeys: __S(24, __c3, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.String, NewBudget: __S(77, __c9, 5) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateBudgetRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String,
          BudgetName: S.String,
          ActionId: S.String,
          NotificationType: S.optional(S.String),
          ActionThreshold: S.optional(__S(88, __c11, 0)),
          Definition: S.optional(__S(92, __c11, 4)),
          ExecutionRoleArn: S.optional(S.String),
          ApprovalModel: S.optional(S.String),
          Subscribers: S.optional(__S(16, __c2, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateBudgetActionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String,
          BudgetName: S.String,
          OldAction: __S(136, __c17, 0),
          NewAction: __S(136, __c17, 0),
        }),
      ).annotate({ identifier: "UpdateBudgetActionResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String,
          BudgetName: S.String,
          OldNotification: __S(48, __c6, 0),
          NewNotification: __S(48, __c6, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateNotificationRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String,
          BudgetName: S.String,
          Notification: __S(48, __c6, 0),
          OldSubscriber: __S(8, __c1, 0),
          NewSubscriber: __S(8, __c1, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateSubscriberRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
