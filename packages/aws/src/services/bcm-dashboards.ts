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
  sdkId: "BCM Dashboards",
  serviceShapeName: "AWSBCMDashboardsService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "bcm-dashboards" });
const ver = /*@__PURE__*/ T.ServiceVersion("2025-08-18");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_0();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
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
      authSchemes: [{ name: "sigv4", signingRegion: `${_.getAttr(_0, "implicitGlobalRegion")}` }],
    });
    if (Endpoint != null) {
      if (UseFIPS === true) {
        return err("Invalid Configuration: FIPS and custom endpoint are not supported");
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
  '{"url":"https://bcm-dashboards.us-east-1.api.aws","properties":{"authSchemes":[{"name":"sigv4","signingRegion":"us-east-1"}]},"headers":{}}',
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
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type GroupDefinitionType = "DIMENSION" | "TAG" | "COST_CATEGORY" | (string & {});
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
export type GraphDisplayConfigMap = { [key: string]: GraphDisplayConfig | undefined };
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
  input: __S(416, __c13, 0) as any as S.Schema<CreateDashboardRequest>,
  output: __S(640, __c20, 0) as any as S.Schema<CreateDashboardResponse>,
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
}));

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
  input: __S(673, __c21, 1) as any as S.Schema<CreateScheduledReportRequest>,
  output: __S(640, __c20, 0) as any as S.Schema<CreateScheduledReportResponse>,
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
}));

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
  input: __S(736, __c23, 0) as any as S.Schema<DeleteDashboardRequest>,
  output: __S(640, __c20, 0) as any as S.Schema<DeleteDashboardResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDashboard",
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<DeleteScheduledReportRequest>,
  output: __S(640, __c20, 0) as any as S.Schema<DeleteScheduledReportResponse>,
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
}));

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
  input: __S(32, __c1, 0) as any as S.Schema<ExecuteScheduledReportRequest>,
  output: __S(33, __c1, 1) as any as S.Schema<ExecuteScheduledReportResponse>,
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
}));

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
  input: __S(96, __c3, 0) as any as S.Schema<GetDashboardRequest>,
  output: __S(97, __c3, 1) as any as S.Schema<GetDashboardResponse>,
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
}));

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
  input: __S(128, __c4, 0) as any as S.Schema<GetResourcePolicyRequest>,
  output: __S(129, __c4, 1) as any as S.Schema<GetResourcePolicyResponse>,
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
}));

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
  input: __S(160, __c5, 0) as any as S.Schema<GetScheduledReportRequest>,
  output: __S(162, __c5, 2) as any as S.Schema<GetScheduledReportResponse>,
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
}));

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
  input: __S(192, __c6, 0) as any as S.Schema<ListDashboardsRequest>,
  output: __S(195, __c6, 3) as any as S.Schema<ListDashboardsResponse>,
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
  input: __S(224, __c7, 0) as any as S.Schema<ListScheduledReportsRequest>,
  output: __S(227, __c7, 3) as any as S.Schema<ListScheduledReportsResponse>,
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
  input: __S(256, __c8, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(257, __c8, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(288, __c9, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(480, __c15, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

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
  input: __S(320, __c10, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(480, __c15, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(352, __c11, 0) as any as S.Schema<UpdateDashboardRequest>,
  output: __S(640, __c20, 0) as any as S.Schema<UpdateDashboardResponse>,
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
}));

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
  input: __S(384, __c12, 0) as any as S.Schema<UpdateScheduledReportRequest>,
  output: __S(640, __c20, 0) as any as S.Schema<UpdateScheduledReportResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteScheduledReportRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Client-Token"),
            T.IdempotencyToken(),
          ),
          dryRun: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ExecuteScheduledReportRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          healthStatus: S.optional(__S(64, __c2, 0)),
          executionTriggered: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ExecuteScheduledReportResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          statusCode: S.String,
          lastRefreshedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          statusReasons: S.optional(__S(448, __c14, 0)),
        }),
      ).annotate({ identifier: "HealthStatus" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDashboardRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          name: S.String,
          description: S.optional(S.String),
          type: S.String,
          widgets: __S(530, __c16, 18),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "GetDashboardResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetResourcePolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, policyDocument: S.String }),
      ).annotate({ identifier: "GetResourcePolicyResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetScheduledReportRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.String,
          dashboardArn: S.String,
          scheduledReportExecutionRoleArn: S.String,
          scheduleConfig: __S(705, __c22, 1),
          description: S.optional(S.String),
          widgetIds: S.optional(__S(544, __c17, 0)),
          widgetDateRangeOverride: S.optional(__S(577, __c18, 1)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastExecutionAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          healthStatus: S.optional(__S(64, __c2, 0)),
        }),
      ).annotate({ identifier: "ScheduledReport" });
    case 2:
      return S.suspend(() => S.Struct({ scheduledReport: __S(161, __c5, 1) })).annotate({
        identifier: "GetScheduledReportResponse",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ maxResults: S.optional(S.Number), nextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListDashboardsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          name: S.String,
          description: S.optional(S.String),
          type: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "DashboardReference" });
    case 2:
      return S.Array(__S(193, __c6, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ dashboards: __S(194, __c6, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDashboardsResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), maxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListScheduledReportsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          name: S.String,
          dashboardArn: S.String,
          scheduleExpression: S.String,
          state: S.String,
          healthStatus: __S(64, __c2, 0),
          scheduleExpressionTimeZone: S.optional(S.String),
          widgetIds: S.optional(__S(544, __c17, 0)),
        }),
      ).annotate({ identifier: "ScheduledReportSummary" });
    case 2:
      return S.Array(__S(225, __c7, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ scheduledReports: __S(226, __c7, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListScheduledReportsResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ resourceTags: S.optional(__S(609, __c19, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, resourceTags: __S(609, __c19, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, resourceTagKeys: __S(544, __c17, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          name: S.String,
          description: S.optional(S.String),
          widgets: S.optional(__S(530, __c16, 18)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateDashboardRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          name: S.optional(S.String),
          description: S.optional(S.String),
          dashboardArn: S.optional(S.String),
          scheduledReportExecutionRoleArn: S.optional(S.String),
          scheduleConfig: S.optional(__S(705, __c22, 1)),
          widgetIds: S.optional(__S(544, __c17, 0)),
          widgetDateRangeOverride: S.optional(__S(577, __c18, 1)),
          clearWidgetIds: S.optional(S.Boolean),
          clearWidgetDateRangeOverride: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateScheduledReportRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          widgets: __S(530, __c16, 18),
          resourceTags: S.optional(__S(609, __c19, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDashboardRequest" });
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
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TableDisplayConfigStruct" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, type: S.optional(S.String) })).annotate({
        identifier: "GroupDefinition",
      });
    case 1:
      return S.Array(__S(512, __c16, 0));
    case 2:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<Expression> => __S(517, __c16, 5)).annotate({
          identifier: "Expression",
        }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          key: S.String,
          values: __S(544, __c17, 0),
          matchOptions: S.optional(__S(448, __c14, 0)),
        }),
      ).annotate({ identifier: "DimensionValues" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          key: S.optional(S.String),
          values: S.optional(__S(544, __c17, 0)),
          matchOptions: S.optional(__S(448, __c14, 0)),
        }),
      ).annotate({ identifier: "TagValues" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          or: S.optional(
            S.suspend(() => __S(514, __c16, 2)).annotate({ identifier: "Expressions" }),
          ),
          and: S.optional(
            S.suspend(() => __S(514, __c16, 2)).annotate({ identifier: "Expressions" }),
          ),
          not: S.optional(
            S.suspend((): S.Schema<Expression> => __S(517, __c16, 5)).annotate({
              identifier: "Expression",
            }),
          ),
          dimensions: S.optional(__S(515, __c16, 3)),
          tags: S.optional(__S(516, __c16, 4)),
          costCategories: S.optional(__S(516, __c16, 4)),
        }),
      ).annotate({ identifier: "Expression" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          metrics: __S(448, __c14, 0),
          timeRange: __S(577, __c18, 1),
          granularity: S.String,
          groupBy: S.optional(__S(513, __c16, 1)),
          filter: S.optional(__S(517, __c16, 5)),
        }),
      ).annotate({ identifier: "CostAndUsageQuery" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          timeRange: __S(577, __c18, 1),
          metrics: S.optional(__S(448, __c14, 0)),
          granularity: S.optional(S.String),
          groupBy: S.optional(__S(513, __c16, 1)),
          filter: S.optional(__S(517, __c16, 5)),
        }),
      ).annotate({ identifier: "SavingsPlansCoverageQuery" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          timeRange: __S(577, __c18, 1),
          granularity: S.optional(S.String),
          filter: S.optional(__S(517, __c16, 5)),
        }),
      ).annotate({ identifier: "SavingsPlansUtilizationQuery" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          timeRange: __S(577, __c18, 1),
          groupBy: S.optional(__S(513, __c16, 1)),
          granularity: S.optional(S.String),
          filter: S.optional(__S(517, __c16, 5)),
          metrics: S.optional(__S(448, __c14, 0)),
        }),
      ).annotate({ identifier: "ReservationCoverageQuery" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          timeRange: __S(577, __c18, 1),
          groupBy: S.optional(__S(513, __c16, 1)),
          granularity: S.optional(S.String),
          filter: S.optional(__S(517, __c16, 5)),
        }),
      ).annotate({ identifier: "ReservationUtilizationQuery" });
    case 11:
      return S.Union([
        /*@__PURE__*/ S.Struct({ costAndUsage: __S(518, __c16, 6) }),
        /*@__PURE__*/ S.Struct({ savingsPlansCoverage: __S(519, __c16, 7) }),
        /*@__PURE__*/ S.Struct({ savingsPlansUtilization: __S(520, __c16, 8) }),
        /*@__PURE__*/ S.Struct({ reservationCoverage: __S(521, __c16, 9) }),
        /*@__PURE__*/ S.Struct({ reservationUtilization: __S(522, __c16, 10) }),
      ]);
    case 12:
      return S.suspend(() => S.Struct({ visualType: S.String })).annotate({
        identifier: "GraphDisplayConfig",
      });
    case 13:
      return S.Record(S.String, /*@__PURE__*/ __S(524, __c16, 12).pipe(S.optional));
    case 14:
      return S.Union([
        /*@__PURE__*/ S.Struct({ graph: __S(525, __c16, 13) }),
        /*@__PURE__*/ S.Struct({ table: __S(480, __c15, 0) }),
      ]);
    case 15:
      return S.suspend(() =>
        S.Struct({ queryParameters: __S(523, __c16, 11), displayConfig: __S(526, __c16, 14) }),
      ).annotate({ identifier: "WidgetConfig" });
    case 16:
      return S.Array(__S(527, __c16, 15));
    case 17:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          title: S.String,
          description: S.optional(S.String),
          width: S.optional(S.Number),
          height: S.optional(S.Number),
          horizontalOffset: S.optional(S.Number),
          configs: __S(528, __c16, 16),
        }),
      ).annotate({ identifier: "Widget" });
    case 18:
      return S.Array(__S(529, __c16, 17));
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ type: S.String, value: S.String })).annotate({
        identifier: "DateTimeValue",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ startTime: __S(576, __c18, 0), endTime: __S(576, __c18, 0) }),
      ).annotate({ identifier: "DateTimeRange" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, value: S.String })).annotate({
        identifier: "ResourceTag",
      });
    case 1:
      return S.Array(__S(608, __c19, 0));
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ arn: S.String })).annotate({
        identifier: "CreateDashboardResponse",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          dashboardArn: S.String,
          scheduledReportExecutionRoleArn: S.String,
          scheduleConfig: __S(705, __c22, 1),
          description: S.optional(S.String),
          widgetIds: S.optional(__S(544, __c17, 0)),
          widgetDateRangeOverride: S.optional(__S(577, __c18, 1)),
        }),
      ).annotate({ identifier: "ScheduledReportInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          scheduledReport: __S(672, __c21, 0),
          resourceTags: S.optional(__S(609, __c19, 1)),
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Client-Token"),
            T.IdempotencyToken(),
          ),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateScheduledReportRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "SchedulePeriod" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          scheduleExpression: S.optional(S.String),
          scheduleExpressionTimeZone: S.optional(S.String),
          schedulePeriod: S.optional(__S(704, __c22, 0)),
          state: S.optional(S.String),
        }),
      ).annotate({ identifier: "ScheduleConfig" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDashboardRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
