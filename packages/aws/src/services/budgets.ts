import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
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
  sdkId: "Budgets",
  target: "AWSBudgetServiceGateway",
  version: "2016-10-20",
  sigv4: "budgets",
  protocol: awsJson1_1Protocol,
  rules: (p, _) => {
    const { UseDualStack = false, UseFIPS = false, Endpoint, Region } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    const _p0 = () => ({
      authSchemes: [{ name: "sigv4", signingRegion: "eusc-de-east-1" }],
    });
    const _p1 = (_0: unknown) => ({
      authSchemes: [
        {
          name: "sigv4",
          signingRegion: `${_.getAttr(_0, "implicitGlobalRegion")}`,
        },
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
              {
                authSchemes: [
                  { name: "sigv4", signingRegion: "us-isob-east-1" },
                ],
              },
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
              {
                authSchemes: [
                  { name: "sigv4", signingRegion: "eu-isoe-west-1" },
                ],
              },
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
              {
                authSchemes: [
                  { name: "sigv4", signingRegion: "us-isof-south-1" },
                ],
              },
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-eusc" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              "https://budgets.eusc-de-east-1.api.amazonwebservices.eu",
              _p0(),
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-eusc" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e(
              "https://budgets.eusc-de-east-1.api.amazonwebservices.eu",
              _p0(),
              {},
            );
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://budgets.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                _p1(PartitionResult),
                {},
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
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
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
  })<{ readonly message?: string }> {}
export class BillingViewHealthStatusException
  extends /*@__PURE__*/ TE.TaggedError(
    "BillingViewHealthStatusException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class CreationLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "CreationLimitExceededException",
    ["BadRequestError"],
    { status: 405 },
  )<{ readonly message?: string }> {}
export class DuplicateRecordException
  extends /*@__PURE__*/ TE.TaggedError(
    "DuplicateRecordException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ExpiredNextTokenException
  extends /*@__PURE__*/ TE.TaggedError(
    "ExpiredNextTokenException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InternalErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalErrorException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidNextTokenException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ResourceLockedException
  extends /*@__PURE__*/ TE.TaggedError("ResourceLockedException", [], {
    status: 423,
  })<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
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
export type TimeUnit =
  | "DAILY"
  | "MONTHLY"
  | "QUARTERLY"
  | "ANNUALLY"
  | "CUSTOM"
  | (string & {});
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
export type ComparisonOperator =
  | "GREATER_THAN"
  | "LESS_THAN"
  | "EQUAL_TO"
  | (string & {});
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
export type ActionSubType =
  | "STOP_EC2_INSTANCES"
  | "STOP_RDS_INSTANCES"
  | (string & {});
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
  descriptor: {
    service: svc,
    input: {
      AccountId: 0,
      Budget: i_Budget,
      NotificationsWithSubscribers: D.list({
        Notification: i_Notification,
        Subscribers: D.list(i_Subscriber),
      }),
      ResourceTags: D.list(i_ResourceTag),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AccountId: 0,
      BudgetName: 0,
      NotificationType: 0,
      ActionType: 0,
      ActionThreshold: i_ActionThreshold,
      Definition: i_Definition,
      ExecutionRoleArn: 0,
      ApprovalModel: 0,
      Subscribers: D.list(i_Subscriber),
      ResourceTags: D.list(i_ResourceTag),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AccountId: 0,
      BudgetName: 0,
      Notification: i_Notification,
      Subscribers: D.list(i_Subscriber),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AccountId: 0,
      BudgetName: 0,
      Notification: i_Notification,
      Subscriber: i_Subscriber,
    },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { AccountId: 0, BudgetName: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { AccountId: 0, BudgetName: 0, ActionId: 0 },
    output: { Action: o_Action },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { AccountId: 0, BudgetName: 0, Notification: i_Notification },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AccountId: 0,
      BudgetName: 0,
      Notification: i_Notification,
      Subscriber: i_Subscriber,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { AccountId: 0, BudgetName: 0, ShowFilterExpression: 0 },
    output: { Budget: o_Budget },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { AccountId: 0, BudgetName: 0, ActionId: 0 },
    output: { Action: o_Action },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AccountId: 0,
      BudgetName: 0,
      ActionId: 0,
      TimePeriod: i_TimePeriod,
      MaxResults: 0,
      NextToken: 0,
    },
    output: {
      ActionHistories: D.list({
        Timestamp: D.ts,
        ActionHistoryDetails: { Action: o_Action },
      }),
    },
  },
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
  descriptor: {
    service: svc,
    input: { AccountId: 0, MaxResults: 0, NextToken: 0 },
    output: { Actions: D.list(o_Action) },
  },
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
  descriptor: {
    service: svc,
    input: { AccountId: 0, BudgetName: 0, MaxResults: 0, NextToken: 0 },
    output: { Actions: D.list(o_Action) },
  },
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
  descriptor: {
    service: svc,
    input: { AccountId: 0, MaxResults: 0, NextToken: 0 },
  },
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
  descriptor: {
    service: svc,
    input: {
      AccountId: 0,
      BudgetName: 0,
      TimePeriod: i_TimePeriod,
      MaxResults: 0,
      NextToken: 0,
    },
    output: {
      BudgetPerformanceHistory: {
        BudgetedAndActualAmountsList: D.list({ TimePeriod: o_TimePeriod }),
      },
    },
  },
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
  descriptor: {
    service: svc,
    input: {
      AccountId: 0,
      MaxResults: 0,
      NextToken: 0,
      ShowFilterExpression: 0,
    },
    output: { Budgets: D.list(o_Budget) },
  },
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
  descriptor: {
    service: svc,
    input: { AccountId: 0, BudgetName: 0, MaxResults: 0, NextToken: 0 },
  },
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
  descriptor: {
    service: svc,
    input: {
      AccountId: 0,
      BudgetName: 0,
      Notification: i_Notification,
      MaxResults: 0,
      NextToken: 0,
    },
    output: { Subscribers: D.list(o_Subscriber) },
  },
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
  descriptor: {
    service: svc,
    input: { AccountId: 0, BudgetName: 0, ActionId: 0, ExecutionType: 0 },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { ResourceARN: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ResourceARN: 0, ResourceTags: D.list(i_ResourceTag) },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { ResourceARN: 0, ResourceTagKeys: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { AccountId: 0, NewBudget: i_Budget } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AccountId: 0,
      BudgetName: 0,
      ActionId: 0,
      NotificationType: 0,
      ActionThreshold: i_ActionThreshold,
      Definition: i_Definition,
      ExecutionRoleArn: 0,
      ApprovalModel: 0,
      Subscribers: D.list(i_Subscriber),
    },
    output: { OldAction: o_Action, NewAction: o_Action },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AccountId: 0,
      BudgetName: 0,
      OldNotification: i_Notification,
      NewNotification: i_Notification,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AccountId: 0,
      BudgetName: 0,
      Notification: i_Notification,
      OldSubscriber: i_Subscriber,
      NewSubscriber: i_Subscriber,
    },
  },
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
})) as any;

const i_ActionThreshold: D.LazyStruct = () => ({
  ActionThresholdValue: 0,
  ActionThresholdType: 0,
});
const i_Budget: D.LazyStruct = () => ({
  BudgetName: 0,
  BudgetLimit: i_Spend,
  PlannedBudgetLimits: D.map(i_Spend),
  CostFilters: 0,
  CostTypes: {
    IncludeTax: 0,
    IncludeSubscription: 0,
    UseBlended: 0,
    IncludeRefund: 0,
    IncludeCredit: 0,
    IncludeUpfront: 0,
    IncludeRecurring: 0,
    IncludeOtherSubscription: 0,
    IncludeSupport: 0,
    IncludeDiscount: 0,
    UseAmortized: 0,
  },
  TimeUnit: 0,
  TimePeriod: i_TimePeriod,
  CalculatedSpend: { ActualSpend: i_Spend, ForecastedSpend: i_Spend },
  BudgetType: 0,
  LastUpdatedTime: 0,
  AutoAdjustData: {
    AutoAdjustType: 0,
    HistoricalOptions: {
      BudgetAdjustmentPeriod: 0,
      LookBackAvailablePeriods: 0,
    },
    LastAutoAdjustTime: 0,
  },
  FilterExpression: i_Expression,
  Metrics: 0,
  BillingViewArn: 0,
  HealthStatus: { Status: 0, StatusReason: 0, LastUpdatedTime: 0 },
});
const i_Definition: D.LazyStruct = () => ({
  IamActionDefinition: { PolicyArn: 0, Roles: 0, Groups: 0, Users: 0 },
  ScpActionDefinition: { PolicyId: 0, TargetIds: 0 },
  SsmActionDefinition: { ActionSubType: 0, Region: 0, InstanceIds: 0 },
});
const i_Notification: D.LazyStruct = () => ({
  NotificationType: 0,
  ComparisonOperator: 0,
  Threshold: 0,
  ThresholdType: 0,
  NotificationState: 0,
});
const i_ResourceTag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_Subscriber: D.LazyStruct = () => ({ SubscriptionType: 0, Address: 0 });
const i_TimePeriod: D.LazyStruct = () => ({ Start: 0, End: 0 });
const o_Action: D.LazyStruct = () => ({ Subscribers: D.list(o_Subscriber) });
const o_Budget: D.LazyStruct = () => ({
  TimePeriod: o_TimePeriod,
  LastUpdatedTime: D.ts,
  AutoAdjustData: { LastAutoAdjustTime: D.ts },
  HealthStatus: { LastUpdatedTime: D.ts },
});
const o_Subscriber: D.LazyStruct = () => ({ Address: D.secret });
const o_TimePeriod: D.LazyStruct = () => ({ Start: D.ts, End: D.ts });
const i_Expression: D.LazyStruct = () => ({
  Or: D.list(i_Expression),
  And: D.list(i_Expression),
  Not: i_Expression,
  Dimensions: { Key: 0, Values: 0, MatchOptions: 0 },
  Tags: { Key: 0, Values: 0, MatchOptions: 0 },
  CostCategories: { Key: 0, Values: 0, MatchOptions: 0 },
});
const i_Spend: D.LazyStruct = () => ({ Amount: 0, Unit: 0 });
