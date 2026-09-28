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
  sdkId: "BCM Dashboards",
  target: "AWSBCMDashboardsService",
  version: "2025-08-18",
  sigv4: "bcm-dashboards",
  protocol: awsJson1_0Protocol,
  rules: (p, _) => {
    const { UseFIPS = false, Endpoint, Region } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    const _p0 = (_0: unknown) => ({
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
      return e(Endpoint);
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (UseFIPS === true) {
            return e(
              `https://bcm-dashboards-fips.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              _p0(PartitionResult),
              {},
            );
          }
          return e(
            `https://bcm-dashboards.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            _p0(PartitionResult),
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
  })<{ readonly message: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export type DashboardName = string;
export type Description = string;
export type WidgetId = string;
export type WidgetTitle = string;
export type WidgetWidth = number;
export type WidgetHeight = number;
export type MetricName =
  | "AmortizedCost"
  | "BlendedCost"
  | "NetAmortizedCost"
  | "NetUnblendedCost"
  | "NormalizedUsageAmount"
  | "UnblendedCost"
  | "UsageQuantity"
  | "SpendCoveredBySavingsPlans"
  | "Hour"
  | "Unit"
  | "Cost"
  | (string & {});
export type MetricNames = MetricName[];
export type DateTimeType = "ABSOLUTE" | "RELATIVE" | (string & {});
export interface DateTimeValue {
  type: DateTimeType;
  value: string;
}
export interface DateTimeRange {
  startTime: DateTimeValue;
  endTime: DateTimeValue;
}
export type Granularity = "HOURLY" | "DAILY" | "MONTHLY" | (string & {});
export type GroupDefinitionType =
  | "DIMENSION"
  | "TAG"
  | "COST_CATEGORY"
  | (string & {});
export interface GroupDefinition {
  key: string;
  type?: GroupDefinitionType;
}
export type GroupDefinitions = GroupDefinition[];
export type Expressions = Expression[];
export type Dimension =
  | "AZ"
  | "INSTANCE_TYPE"
  | "LINKED_ACCOUNT"
  | "OPERATION"
  | "PURCHASE_TYPE"
  | "REGION"
  | "SERVICE"
  | "USAGE_TYPE"
  | "USAGE_TYPE_GROUP"
  | "RECORD_TYPE"
  | "RESOURCE_ID"
  | "SUBSCRIPTION_ID"
  | "TAG_KEY"
  | "OPERATING_SYSTEM"
  | "TENANCY"
  | "BILLING_ENTITY"
  | "RESERVATION_ID"
  | "COST_CATEGORY_NAME"
  | "DATABASE_ENGINE"
  | "LEGAL_ENTITY_NAME"
  | "SAVINGS_PLANS_TYPE"
  | "INSTANCE_TYPE_FAMILY"
  | "CACHE_ENGINE"
  | "DEPLOYMENT_OPTION"
  | "SCOPE"
  | "PLATFORM"
  | (string & {});
export type StringList = string[];
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
export interface DimensionValues {
  key: Dimension;
  values: string[];
  matchOptions?: MatchOption[];
}
export interface TagValues {
  key?: string;
  values?: string[];
  matchOptions?: MatchOption[];
}
export interface CostCategoryValues {
  key?: string;
  values?: string[];
  matchOptions?: MatchOption[];
}
export interface Expression {
  or?: Expression[];
  and?: Expression[];
  not?: Expression;
  dimensions?: DimensionValues;
  tags?: TagValues;
  costCategories?: CostCategoryValues;
}
export interface CostAndUsageQuery {
  metrics: MetricName[];
  timeRange: DateTimeRange;
  granularity: Granularity;
  groupBy?: GroupDefinition[];
  filter?: Expression;
}
export interface SavingsPlansCoverageQuery {
  timeRange: DateTimeRange;
  metrics?: MetricName[];
  granularity?: Granularity;
  groupBy?: GroupDefinition[];
  filter?: Expression;
}
export interface SavingsPlansUtilizationQuery {
  timeRange: DateTimeRange;
  granularity?: Granularity;
  filter?: Expression;
}
export interface ReservationCoverageQuery {
  timeRange: DateTimeRange;
  groupBy?: GroupDefinition[];
  granularity?: Granularity;
  filter?: Expression;
  metrics?: MetricName[];
}
export interface ReservationUtilizationQuery {
  timeRange: DateTimeRange;
  groupBy?: GroupDefinition[];
  granularity?: Granularity;
  filter?: Expression;
}
export type QueryParameters =
  | {
      costAndUsage: CostAndUsageQuery;
      savingsPlansCoverage?: never;
      savingsPlansUtilization?: never;
      reservationCoverage?: never;
      reservationUtilization?: never;
    }
  | {
      costAndUsage?: never;
      savingsPlansCoverage: SavingsPlansCoverageQuery;
      savingsPlansUtilization?: never;
      reservationCoverage?: never;
      reservationUtilization?: never;
    }
  | {
      costAndUsage?: never;
      savingsPlansCoverage?: never;
      savingsPlansUtilization: SavingsPlansUtilizationQuery;
      reservationCoverage?: never;
      reservationUtilization?: never;
    }
  | {
      costAndUsage?: never;
      savingsPlansCoverage?: never;
      savingsPlansUtilization?: never;
      reservationCoverage: ReservationCoverageQuery;
      reservationUtilization?: never;
    }
  | {
      costAndUsage?: never;
      savingsPlansCoverage?: never;
      savingsPlansUtilization?: never;
      reservationCoverage?: never;
      reservationUtilization: ReservationUtilizationQuery;
    };
export type VisualType = "LINE" | "BAR" | "STACK" | (string & {});
export interface GraphDisplayConfig {
  visualType: VisualType;
}
export type GraphDisplayConfigMap = {
  [key: string]: GraphDisplayConfig | undefined;
};
export interface TableDisplayConfigStruct {}
export type DisplayConfig =
  | { graph: { [key: string]: GraphDisplayConfig | undefined }; table?: never }
  | { graph?: never; table: TableDisplayConfigStruct };
export interface WidgetConfig {
  queryParameters: QueryParameters;
  displayConfig: DisplayConfig;
}
export type WidgetConfigList = WidgetConfig[];
export interface Widget {
  id?: string;
  title: string;
  description?: string;
  width?: number;
  height?: number;
  horizontalOffset?: number;
  configs: WidgetConfig[];
}
export type WidgetList = Widget[];
export type ResourceTagKey = string;
export type ResourceTagValue = string;
export interface ResourceTag {
  key: string;
  value: string;
}
export type ResourceTagList = ResourceTag[];
export interface CreateDashboardRequest {
  name: string;
  description?: string;
  widgets: Widget[];
  resourceTags?: ResourceTag[];
}
export type DashboardArn = string;
export interface CreateDashboardResponse {
  arn: string;
}
export type ScheduledReportName = string;
export type ServiceRoleArn = string;
export interface SchedulePeriod {
  startTime?: Date;
  endTime?: Date;
}
export type ScheduleState = "ENABLED" | "DISABLED" | (string & {});
export interface ScheduleConfig {
  scheduleExpression?: string;
  scheduleExpressionTimeZone?: string;
  schedulePeriod?: SchedulePeriod;
  state?: ScheduleState;
}
export type WidgetIdList = string[];
export interface ScheduledReportInput {
  name: string;
  dashboardArn: string;
  scheduledReportExecutionRoleArn: string;
  scheduleConfig: ScheduleConfig;
  description?: string;
  widgetIds?: string[];
  widgetDateRangeOverride?: DateTimeRange;
}
export type ClientToken = string;
export interface CreateScheduledReportRequest {
  scheduledReport: ScheduledReportInput;
  resourceTags?: ResourceTag[];
  clientToken?: string;
}
export type ScheduledReportArn = string;
export interface CreateScheduledReportResponse {
  arn: string;
}
export interface DeleteDashboardRequest {
  arn: string;
}
export interface DeleteDashboardResponse {
  arn: string;
}
export interface DeleteScheduledReportRequest {
  arn: string;
}
export interface DeleteScheduledReportResponse {
  arn: string;
}
export interface ExecuteScheduledReportRequest {
  arn: string;
  clientToken?: string;
  dryRun?: boolean;
}
export type HealthStatusCode = "HEALTHY" | "UNHEALTHY" | (string & {});
export type StatusReason =
  | "DATA_SOURCE_ACCESS_DENIED"
  | "EXECUTION_ROLE_ASSUME_FAILED"
  | "EXECUTION_ROLE_INSUFFICIENT_PERMISSIONS"
  | "DASHBOARD_NOT_FOUND"
  | "DASHBOARD_ACCESS_DENIED"
  | "INTERNAL_FAILURE"
  | "WIDGET_ID_NOT_FOUND"
  | (string & {});
export type StatusReasonList = StatusReason[];
export interface HealthStatus {
  statusCode: HealthStatusCode;
  lastRefreshedAt?: Date;
  statusReasons?: StatusReason[];
}
export interface ExecuteScheduledReportResponse {
  healthStatus?: HealthStatus;
  executionTriggered?: boolean;
}
export interface GetDashboardRequest {
  arn: string;
}
export type DashboardType = "CUSTOM" | (string & {});
export interface GetDashboardResponse {
  arn: string;
  name: string;
  description?: string;
  type: DashboardType;
  widgets: Widget[];
  createdAt: Date;
  updatedAt: Date;
}
export interface GetResourcePolicyRequest {
  resourceArn: string;
}
export interface GetResourcePolicyResponse {
  resourceArn: string;
  policyDocument: string;
}
export interface GetScheduledReportRequest {
  arn: string;
}
export interface ScheduledReport {
  arn?: string;
  name: string;
  dashboardArn: string;
  scheduledReportExecutionRoleArn: string;
  scheduleConfig: ScheduleConfig;
  description?: string;
  widgetIds?: string[];
  widgetDateRangeOverride?: DateTimeRange;
  createdAt?: Date;
  updatedAt?: Date;
  lastExecutionAt?: Date;
  healthStatus?: HealthStatus;
}
export interface GetScheduledReportResponse {
  scheduledReport: ScheduledReport;
}
export type MaxResults = number;
export type NextPageToken = string;
export interface ListDashboardsRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface DashboardReference {
  arn: string;
  name: string;
  description?: string;
  type: DashboardType;
  createdAt: Date;
  updatedAt: Date;
}
export type DashboardReferenceList = DashboardReference[];
export interface ListDashboardsResponse {
  dashboards: DashboardReference[];
  nextToken?: string;
}
export interface ListScheduledReportsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface ScheduledReportSummary {
  arn: string;
  name: string;
  dashboardArn: string;
  scheduleExpression: string;
  state: ScheduleState;
  healthStatus: HealthStatus;
  scheduleExpressionTimeZone?: string;
  widgetIds?: string[];
}
export type ScheduledReportSummaryList = ScheduledReportSummary[];
export interface ListScheduledReportsResponse {
  scheduledReports: ScheduledReportSummary[];
  nextToken?: string;
}
export type ResourceArn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  resourceTags?: ResourceTag[];
}
export interface TagResourceRequest {
  resourceArn: string;
  resourceTags: ResourceTag[];
}
export interface TagResourceResponse {}
export type ResourceTagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  resourceTagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateDashboardRequest {
  arn: string;
  name: string;
  description?: string;
  widgets?: Widget[];
}
export interface UpdateDashboardResponse {
  arn: string;
}
export interface UpdateScheduledReportRequest {
  arn: string;
  name?: string;
  description?: string;
  dashboardArn?: string;
  scheduledReportExecutionRoleArn?: string;
  scheduleConfig?: ScheduleConfig;
  widgetIds?: string[];
  widgetDateRangeOverride?: DateTimeRange;
  clearWidgetIds?: boolean;
  clearWidgetDateRangeOverride?: boolean;
}
export interface UpdateScheduledReportResponse {
  arn: string;
}
export type CreateDashboardError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new dashboard that can contain multiple widgets displaying cost and usage data. You can add custom widgets or use predefined widgets, arranging them in your preferred layout.
 */
export const createDashboard: API.OperationMethod<
  CreateDashboardRequest,
  CreateDashboardResponse,
  CreateDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      description: 0,
      widgets: D.list(i_Widget),
      resourceTags: D.list(i_ResourceTag),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDashboard",
})) as any;

export type CreateScheduledReportError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new scheduled report for a dashboard. A scheduled report automatically generates and delivers dashboard snapshots on a recurring schedule. Reports are delivered within 15 minutes of the scheduled delivery time.
 */
export const createScheduledReport: API.OperationMethod<
  CreateScheduledReportRequest,
  CreateScheduledReportResponse,
  CreateScheduledReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      scheduledReport: {
        name: 0,
        dashboardArn: 0,
        scheduledReportExecutionRoleArn: 0,
        scheduleConfig: i_ScheduleConfig,
        description: 0,
        widgetIds: 0,
        widgetDateRangeOverride: i_DateTimeRange,
      },
      resourceTags: D.list(i_ResourceTag),
      clientToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateScheduledReport",
})) as any;

export type DeleteDashboardError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a specified dashboard. This action cannot be undone.
 */
export const deleteDashboard: API.OperationMethod<
  DeleteDashboardRequest,
  DeleteDashboardResponse,
  DeleteDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { arn: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDashboard",
})) as any;

export type DeleteScheduledReportError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a specified scheduled report. This is an irreversible operation.
 */
export const deleteScheduledReport: API.OperationMethod<
  DeleteScheduledReportRequest,
  DeleteScheduledReportResponse,
  DeleteScheduledReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { arn: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteScheduledReport",
})) as any;

export type ExecuteScheduledReportError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Triggers an immediate execution of a scheduled report, outside of its regular schedule. The scheduled report must be in `ENABLED` state. Calling this operation on a `DISABLED` scheduled report returns a `ValidationException`.
 *
 * If a `clientToken` is provided, the service uses it for idempotency. Requests with the same client token will not trigger a new execution within the same minute.
 */
export const executeScheduledReport: API.OperationMethod<
  ExecuteScheduledReportRequest,
  ExecuteScheduledReportResponse,
  ExecuteScheduledReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { arn: 0, clientToken: D.m({ idempotency: true }), dryRun: 0 },
    output: { healthStatus: o_HealthStatus },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteScheduledReport",
})) as any;

export type GetDashboardError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the configuration and metadata of a specified dashboard, including its widgets and layout settings.
 */
export const getDashboard: API.OperationMethod<
  GetDashboardRequest,
  GetDashboardResponse,
  GetDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { arn: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDashboard",
})) as any;

export type GetResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the resource-based policy attached to a dashboard, showing sharing configurations and permissions.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyRequest,
  GetResourcePolicyResponse,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
})) as any;

export type GetScheduledReportError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the configuration and metadata of a specified scheduled report.
 */
export const getScheduledReport: API.OperationMethod<
  GetScheduledReportRequest,
  GetScheduledReportResponse,
  GetScheduledReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { arn: 0 },
    output: {
      scheduledReport: {
        scheduleConfig: { schedulePeriod: { startTime: D.ts, endTime: D.ts } },
        createdAt: D.ts,
        updatedAt: D.ts,
        lastExecutionAt: D.ts,
        healthStatus: o_HealthStatus,
      },
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetScheduledReport",
})) as any;

export type ListDashboardsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all dashboards in your account.
 */
export const listDashboards: API.PaginatedOperationMethod<
  ListDashboardsRequest,
  ListDashboardsResponse,
  ListDashboardsError,
  Credentials | HttpClient.HttpClient,
  DashboardReference
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { maxResults: 0, nextToken: 0 },
    output: { dashboards: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDashboards",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dashboards",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListScheduledReportsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of scheduled reports in your account.
 */
export const listScheduledReports: API.PaginatedOperationMethod<
  ListScheduledReportsRequest,
  ListScheduledReportsResponse,
  ListScheduledReportsError,
  Credentials | HttpClient.HttpClient,
  ScheduledReportSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { nextToken: 0, maxResults: 0 },
    output: { scheduledReports: D.list({ healthStatus: o_HealthStatus }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListScheduledReports",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "scheduledReports",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all tags associated with a specified dashboard resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0 } },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds or updates tags for a specified dashboard resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { resourceArn: 0, resourceTags: D.list(i_ResourceTag) },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes specified tags from a dashboard resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0, resourceTagKeys: 0 } },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateDashboardError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing dashboard's properties, including its name, description, and widget configurations.
 */
export const updateDashboard: API.OperationMethod<
  UpdateDashboardRequest,
  UpdateDashboardResponse,
  UpdateDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { arn: 0, name: 0, description: 0, widgets: D.list(i_Widget) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDashboard",
})) as any;

export type UpdateScheduledReportError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing scheduled report's properties, including its name, description, schedule configuration, and widget settings. Only the parameters included in the request are updated; all other properties remain unchanged.
 */
export const updateScheduledReport: API.OperationMethod<
  UpdateScheduledReportRequest,
  UpdateScheduledReportResponse,
  UpdateScheduledReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      arn: 0,
      name: 0,
      description: 0,
      dashboardArn: 0,
      scheduledReportExecutionRoleArn: 0,
      scheduleConfig: i_ScheduleConfig,
      widgetIds: 0,
      widgetDateRangeOverride: i_DateTimeRange,
      clearWidgetIds: 0,
      clearWidgetDateRangeOverride: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateScheduledReport",
})) as any;

const i_DateTimeRange: D.LazyStruct = () => ({
  startTime: i_DateTimeValue,
  endTime: i_DateTimeValue,
});
const i_ResourceTag: D.LazyStruct = () => ({ key: 0, value: 0 });
const i_ScheduleConfig: D.LazyStruct = () => ({
  scheduleExpression: 0,
  scheduleExpressionTimeZone: 0,
  schedulePeriod: { startTime: 0, endTime: 0 },
  state: 0,
});
const i_Widget: D.LazyStruct = () => ({
  id: 0,
  title: 0,
  description: 0,
  width: 0,
  height: 0,
  horizontalOffset: 0,
  configs: D.list({
    queryParameters: {
      costAndUsage: {
        metrics: 0,
        timeRange: i_DateTimeRange,
        granularity: 0,
        groupBy: D.list(i_GroupDefinition),
        filter: i_Expression,
      },
      savingsPlansCoverage: {
        timeRange: i_DateTimeRange,
        metrics: 0,
        granularity: 0,
        groupBy: D.list(i_GroupDefinition),
        filter: i_Expression,
      },
      savingsPlansUtilization: {
        timeRange: i_DateTimeRange,
        granularity: 0,
        filter: i_Expression,
      },
      reservationCoverage: {
        timeRange: i_DateTimeRange,
        groupBy: D.list(i_GroupDefinition),
        granularity: 0,
        filter: i_Expression,
        metrics: 0,
      },
      reservationUtilization: {
        timeRange: i_DateTimeRange,
        groupBy: D.list(i_GroupDefinition),
        granularity: 0,
        filter: i_Expression,
      },
    },
    displayConfig: { graph: D.map({ visualType: 0 }), table: {} },
  }),
});
const o_HealthStatus: D.LazyStruct = () => ({ lastRefreshedAt: D.ts });
const i_DateTimeValue: D.LazyStruct = () => ({ type: 0, value: 0 });
const i_Expression: D.LazyStruct = () => ({
  or: D.list(i_Expression),
  and: D.list(i_Expression),
  not: i_Expression,
  dimensions: { key: 0, values: 0, matchOptions: 0 },
  tags: { key: 0, values: 0, matchOptions: 0 },
  costCategories: { key: 0, values: 0, matchOptions: 0 },
});
const i_GroupDefinition: D.LazyStruct = () => ({ key: 0, type: 0 });
