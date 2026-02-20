import * as HttpClient from "effect/unstable/http/HttpClient";
import * as effect from "effect/Effect";
import * as redacted from "effect/Redacted";
import * as S from "effect/Schema";
import * as stream from "effect/Stream";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import type { Region } from "../region.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "BCM Dashboards",
  serviceShapeName: "AWSBCMDashboardsService",
});
const auth = T.AwsAuthSigv4({ name: "bcm-dashboards" });
const ver = T.ServiceVersion("2025-08-18");
const proto = T.AwsProtocolsAwsJson1_0();
const rules = T.EndpointResolver((p, _) => {
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
});

//# Newtypes
export type DashboardName = string;
export type Description = string;
export type WidgetTitle = string;
export type WidgetWidth = number;
export type WidgetHeight = number;
export type ResourceTagKey = string;
export type ResourceTagValue = string;
export type DashboardArn = string;
export type MaxResults = number;
export type NextPageToken = string;

//# Schemas
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
export const MetricName = S.String;
export type MetricNames = MetricName[];
export const MetricNames = S.Array(MetricName);
export type DateTimeType = "ABSOLUTE" | "RELATIVE" | (string & {});
export const DateTimeType = S.String;
export interface DateTimeValue {
  type: DateTimeType;
  value: string;
}
export const DateTimeValue = S.suspend(() =>
  S.Struct({ type: DateTimeType, value: S.String }),
).annotate({ identifier: "DateTimeValue" }) as any as S.Schema<DateTimeValue>;
export interface DateTimeRange {
  startTime: DateTimeValue;
  endTime: DateTimeValue;
}
export const DateTimeRange = S.suspend(() =>
  S.Struct({ startTime: DateTimeValue, endTime: DateTimeValue }),
).annotate({ identifier: "DateTimeRange" }) as any as S.Schema<DateTimeRange>;
export type Granularity = "HOURLY" | "DAILY" | "MONTHLY" | (string & {});
export const Granularity = S.String;
export type GroupDefinitionType =
  | "DIMENSION"
  | "TAG"
  | "COST_CATEGORY"
  | (string & {});
export const GroupDefinitionType = S.String;
export interface GroupDefinition {
  key: string;
  type?: GroupDefinitionType;
}
export const GroupDefinition = S.suspend(() =>
  S.Struct({ key: S.String, type: S.optional(GroupDefinitionType) }),
).annotate({
  identifier: "GroupDefinition",
}) as any as S.Schema<GroupDefinition>;
export type GroupDefinitions = GroupDefinition[];
export const GroupDefinitions = S.Array(GroupDefinition);
export type Expressions = Expression[];
export const Expressions = S.Array(
  S.suspend((): S.Schema<Expression, any> => Expression).annotate({
    identifier: "Expression",
  }),
) as any as S.Schema<Expressions>;
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
export const Dimension = S.String;
export type StringList = string[];
export const StringList = S.Array(S.String);
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
export const MatchOption = S.String;
export type MatchOptions = MatchOption[];
export const MatchOptions = S.Array(MatchOption);
export interface DimensionValues {
  key: Dimension;
  values: string[];
  matchOptions?: MatchOption[];
}
export const DimensionValues = S.suspend(() =>
  S.Struct({
    key: Dimension,
    values: StringList,
    matchOptions: S.optional(MatchOptions),
  }),
).annotate({
  identifier: "DimensionValues",
}) as any as S.Schema<DimensionValues>;
export interface TagValues {
  key?: string;
  values?: string[];
  matchOptions?: MatchOption[];
}
export const TagValues = S.suspend(() =>
  S.Struct({
    key: S.optional(S.String),
    values: S.optional(StringList),
    matchOptions: S.optional(MatchOptions),
  }),
).annotate({ identifier: "TagValues" }) as any as S.Schema<TagValues>;
export interface CostCategoryValues {
  key?: string;
  values?: string[];
  matchOptions?: MatchOption[];
}
export const CostCategoryValues = S.suspend(() =>
  S.Struct({
    key: S.optional(S.String),
    values: S.optional(StringList),
    matchOptions: S.optional(MatchOptions),
  }),
).annotate({
  identifier: "CostCategoryValues",
}) as any as S.Schema<CostCategoryValues>;
export interface Expression {
  or?: Expression[];
  and?: Expression[];
  not?: Expression;
  dimensions?: DimensionValues;
  tags?: TagValues;
  costCategories?: CostCategoryValues;
}
export const Expression = S.suspend(() =>
  S.Struct({
    or: S.optional(
      S.suspend(() => Expressions).annotate({ identifier: "Expressions" }),
    ),
    and: S.optional(
      S.suspend(() => Expressions).annotate({ identifier: "Expressions" }),
    ),
    not: S.optional(
      S.suspend((): S.Schema<Expression, any> => Expression).annotate({
        identifier: "Expression",
      }),
    ),
    dimensions: S.optional(DimensionValues),
    tags: S.optional(TagValues),
    costCategories: S.optional(CostCategoryValues),
  }),
).annotate({ identifier: "Expression" }) as any as S.Schema<Expression>;
export interface CostAndUsageQuery {
  metrics: MetricName[];
  timeRange: DateTimeRange;
  granularity: Granularity;
  groupBy?: GroupDefinition[];
  filter?: Expression;
}
export const CostAndUsageQuery = S.suspend(() =>
  S.Struct({
    metrics: MetricNames,
    timeRange: DateTimeRange,
    granularity: Granularity,
    groupBy: S.optional(GroupDefinitions),
    filter: S.optional(Expression),
  }),
).annotate({
  identifier: "CostAndUsageQuery",
}) as any as S.Schema<CostAndUsageQuery>;
export interface SavingsPlansCoverageQuery {
  timeRange: DateTimeRange;
  metrics?: MetricName[];
  granularity?: Granularity;
  groupBy?: GroupDefinition[];
  filter?: Expression;
}
export const SavingsPlansCoverageQuery = S.suspend(() =>
  S.Struct({
    timeRange: DateTimeRange,
    metrics: S.optional(MetricNames),
    granularity: S.optional(Granularity),
    groupBy: S.optional(GroupDefinitions),
    filter: S.optional(Expression),
  }),
).annotate({
  identifier: "SavingsPlansCoverageQuery",
}) as any as S.Schema<SavingsPlansCoverageQuery>;
export interface SavingsPlansUtilizationQuery {
  timeRange: DateTimeRange;
  granularity?: Granularity;
  filter?: Expression;
}
export const SavingsPlansUtilizationQuery = S.suspend(() =>
  S.Struct({
    timeRange: DateTimeRange,
    granularity: S.optional(Granularity),
    filter: S.optional(Expression),
  }),
).annotate({
  identifier: "SavingsPlansUtilizationQuery",
}) as any as S.Schema<SavingsPlansUtilizationQuery>;
export interface ReservationCoverageQuery {
  timeRange: DateTimeRange;
  groupBy?: GroupDefinition[];
  granularity?: Granularity;
  filter?: Expression;
  metrics?: MetricName[];
}
export const ReservationCoverageQuery = S.suspend(() =>
  S.Struct({
    timeRange: DateTimeRange,
    groupBy: S.optional(GroupDefinitions),
    granularity: S.optional(Granularity),
    filter: S.optional(Expression),
    metrics: S.optional(MetricNames),
  }),
).annotate({
  identifier: "ReservationCoverageQuery",
}) as any as S.Schema<ReservationCoverageQuery>;
export interface ReservationUtilizationQuery {
  timeRange: DateTimeRange;
  groupBy?: GroupDefinition[];
  granularity?: Granularity;
  filter?: Expression;
}
export const ReservationUtilizationQuery = S.suspend(() =>
  S.Struct({
    timeRange: DateTimeRange,
    groupBy: S.optional(GroupDefinitions),
    granularity: S.optional(Granularity),
    filter: S.optional(Expression),
  }),
).annotate({
  identifier: "ReservationUtilizationQuery",
}) as any as S.Schema<ReservationUtilizationQuery>;
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
export const QueryParameters = S.Union([
  S.Struct({ costAndUsage: CostAndUsageQuery }),
  S.Struct({ savingsPlansCoverage: SavingsPlansCoverageQuery }),
  S.Struct({ savingsPlansUtilization: SavingsPlansUtilizationQuery }),
  S.Struct({ reservationCoverage: ReservationCoverageQuery }),
  S.Struct({ reservationUtilization: ReservationUtilizationQuery }),
]);
export type VisualType = "LINE" | "BAR" | "STACK" | (string & {});
export const VisualType = S.String;
export interface GraphDisplayConfig {
  visualType: VisualType;
}
export const GraphDisplayConfig = S.suspend(() =>
  S.Struct({ visualType: VisualType }),
).annotate({
  identifier: "GraphDisplayConfig",
}) as any as S.Schema<GraphDisplayConfig>;
export type GraphDisplayConfigMap = {
  [key: string]: GraphDisplayConfig | undefined;
};
export const GraphDisplayConfigMap = S.Record(
  S.String,
  GraphDisplayConfig.pipe(S.optional),
);
export interface TableDisplayConfigStruct {}
export const TableDisplayConfigStruct = S.suspend(() => S.Struct({})).annotate({
  identifier: "TableDisplayConfigStruct",
}) as any as S.Schema<TableDisplayConfigStruct>;
export type DisplayConfig =
  | { graph: { [key: string]: GraphDisplayConfig | undefined }; table?: never }
  | { graph?: never; table: TableDisplayConfigStruct };
export const DisplayConfig = S.Union([
  S.Struct({ graph: GraphDisplayConfigMap }),
  S.Struct({ table: TableDisplayConfigStruct }),
]);
export interface WidgetConfig {
  queryParameters: QueryParameters;
  displayConfig: DisplayConfig;
}
export const WidgetConfig = S.suspend(() =>
  S.Struct({ queryParameters: QueryParameters, displayConfig: DisplayConfig }),
).annotate({ identifier: "WidgetConfig" }) as any as S.Schema<WidgetConfig>;
export type WidgetConfigList = WidgetConfig[];
export const WidgetConfigList = S.Array(WidgetConfig);
export interface Widget {
  title: string;
  description?: string;
  width?: number;
  height?: number;
  horizontalOffset?: number;
  configs: WidgetConfig[];
}
export const Widget = S.suspend(() =>
  S.Struct({
    title: S.String,
    description: S.optional(S.String),
    width: S.optional(S.Number),
    height: S.optional(S.Number),
    horizontalOffset: S.optional(S.Number),
    configs: WidgetConfigList,
  }),
).annotate({ identifier: "Widget" }) as any as S.Schema<Widget>;
export type WidgetList = Widget[];
export const WidgetList = S.Array(Widget);
export interface ResourceTag {
  key: string;
  value: string;
}
export const ResourceTag = S.suspend(() =>
  S.Struct({ key: S.String, value: S.String }),
).annotate({ identifier: "ResourceTag" }) as any as S.Schema<ResourceTag>;
export type ResourceTagList = ResourceTag[];
export const ResourceTagList = S.Array(ResourceTag);
export interface CreateDashboardRequest {
  name: string;
  description?: string;
  widgets: Widget[];
  resourceTags?: ResourceTag[];
}
export const CreateDashboardRequest = S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    widgets: WidgetList,
    resourceTags: S.optional(ResourceTagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateDashboardRequest",
}) as any as S.Schema<CreateDashboardRequest>;
export interface CreateDashboardResponse {
  arn: string;
}
export const CreateDashboardResponse = S.suspend(() =>
  S.Struct({ arn: S.String }),
).annotate({
  identifier: "CreateDashboardResponse",
}) as any as S.Schema<CreateDashboardResponse>;
export interface DeleteDashboardRequest {
  arn: string;
}
export const DeleteDashboardRequest = S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteDashboardRequest",
}) as any as S.Schema<DeleteDashboardRequest>;
export interface DeleteDashboardResponse {
  arn: string;
}
export const DeleteDashboardResponse = S.suspend(() =>
  S.Struct({ arn: S.String }),
).annotate({
  identifier: "DeleteDashboardResponse",
}) as any as S.Schema<DeleteDashboardResponse>;
export interface GetDashboardRequest {
  arn: string;
}
export const GetDashboardRequest = S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetDashboardRequest",
}) as any as S.Schema<GetDashboardRequest>;
export type DashboardType = "CUSTOM" | (string & {});
export const DashboardType = S.String;
export interface GetDashboardResponse {
  arn: string;
  name: string;
  description?: string;
  type: DashboardType;
  widgets: Widget[];
  createdAt: Date;
  updatedAt: Date;
}
export const GetDashboardResponse = S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.String,
    description: S.optional(S.String),
    type: DashboardType,
    widgets: WidgetList,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "GetDashboardResponse",
}) as any as S.Schema<GetDashboardResponse>;
export interface GetResourcePolicyRequest {
  resourceArn: string;
}
export const GetResourcePolicyRequest = S.suspend(() =>
  S.Struct({ resourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetResourcePolicyRequest",
}) as any as S.Schema<GetResourcePolicyRequest>;
export interface GetResourcePolicyResponse {
  resourceArn: string;
  policyDocument: string;
}
export const GetResourcePolicyResponse = S.suspend(() =>
  S.Struct({ resourceArn: S.String, policyDocument: S.String }),
).annotate({
  identifier: "GetResourcePolicyResponse",
}) as any as S.Schema<GetResourcePolicyResponse>;
export interface ListDashboardsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListDashboardsRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDashboardsRequest",
}) as any as S.Schema<ListDashboardsRequest>;
export interface DashboardReference {
  arn: string;
  name: string;
  description?: string;
  type: DashboardType;
  createdAt: Date;
  updatedAt: Date;
}
export const DashboardReference = S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.String,
    description: S.optional(S.String),
    type: DashboardType,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "DashboardReference",
}) as any as S.Schema<DashboardReference>;
export type DashboardReferenceList = DashboardReference[];
export const DashboardReferenceList = S.Array(DashboardReference);
export interface ListDashboardsResponse {
  dashboards: DashboardReference[];
  nextToken?: string;
}
export const ListDashboardsResponse = S.suspend(() =>
  S.Struct({
    dashboards: DashboardReferenceList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDashboardsResponse",
}) as any as S.Schema<ListDashboardsResponse>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = S.suspend(() =>
  S.Struct({ resourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  resourceTags?: ResourceTag[];
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ resourceTags: S.optional(ResourceTagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  resourceTags: ResourceTag[];
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({ resourceArn: S.String, resourceTags: ResourceTagList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type ResourceTagKeyList = string[];
export const ResourceTagKeyList = S.Array(S.String);
export interface UntagResourceRequest {
  resourceArn: string;
  resourceTagKeys: string[];
}
export const UntagResourceRequest = S.suspend(() =>
  S.Struct({ resourceArn: S.String, resourceTagKeys: ResourceTagKeyList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdateDashboardRequest {
  arn: string;
  name?: string;
  description?: string;
  widgets?: Widget[];
}
export const UpdateDashboardRequest = S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    widgets: S.optional(WidgetList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateDashboardRequest",
}) as any as S.Schema<UpdateDashboardRequest>;
export interface UpdateDashboardResponse {
  arn: string;
}
export const UpdateDashboardResponse = S.suspend(() =>
  S.Struct({ arn: S.String }),
).annotate({
  identifier: "UpdateDashboardResponse",
}) as any as S.Schema<UpdateDashboardResponse>;

//# Errors
export class AccessDeniedException extends S.TaggedErrorClass<AccessDeniedException>()(
  "AccessDeniedException",
  { message: S.String },
).pipe(C.withAuthError) {}
export class InternalServerException extends S.TaggedErrorClass<InternalServerException>()(
  "InternalServerException",
  { message: S.String },
).pipe(C.withServerError) {}
export class ServiceQuotaExceededException extends S.TaggedErrorClass<ServiceQuotaExceededException>()(
  "ServiceQuotaExceededException",
  { message: S.String },
).pipe(C.withQuotaError) {}
export class ThrottlingException extends S.TaggedErrorClass<ThrottlingException>()(
  "ThrottlingException",
  { message: S.String },
).pipe(C.withThrottlingError) {}
export class ValidationException extends S.TaggedErrorClass<ValidationException>()(
  "ValidationException",
  { message: S.String },
).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { message: S.String },
).pipe(C.withBadRequestError) {}

//# Operations
/**
 * Creates a new dashboard that can contain multiple widgets displaying cost and usage data. You can add custom widgets or use predefined widgets, arranging them in your preferred layout.
 */
export const createDashboard: (
  input: CreateDashboardRequest,
) => effect.Effect<
  CreateDashboardResponse,
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateDashboardRequest,
  output: CreateDashboardResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes a specified dashboard. This action cannot be undone.
 */
export const deleteDashboard: (
  input: DeleteDashboardRequest,
) => effect.Effect<
  DeleteDashboardResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteDashboardRequest,
  output: DeleteDashboardResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves the configuration and metadata of a specified dashboard, including its widgets and layout settings.
 */
export const getDashboard: (
  input: GetDashboardRequest,
) => effect.Effect<
  GetDashboardResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetDashboardRequest,
  output: GetDashboardResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves the resource-based policy attached to a dashboard, showing sharing configurations and permissions.
 */
export const getResourcePolicy: (
  input: GetResourcePolicyRequest,
) => effect.Effect<
  GetResourcePolicyResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetResourcePolicyRequest,
  output: GetResourcePolicyResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Returns a list of all dashboards in your account.
 */
export const listDashboards: {
  (
    input: ListDashboardsRequest,
  ): effect.Effect<
    ListDashboardsResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListDashboardsRequest,
  ) => stream.Stream<
    ListDashboardsResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListDashboardsRequest,
  ) => stream.Stream<
    DashboardReference,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListDashboardsRequest,
  output: ListDashboardsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dashboards",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Returns a list of all tags associated with a specified dashboard resource.
 */
export const listTagsForResource: (
  input: ListTagsForResourceRequest,
) => effect.Effect<
  ListTagsForResourceResponse,
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Adds or updates tags for a specified dashboard resource.
 */
export const tagResource: (
  input: TagResourceRequest,
) => effect.Effect<
  TagResourceResponse,
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Removes specified tags from a dashboard resource.
 */
export const untagResource: (
  input: UntagResourceRequest,
) => effect.Effect<
  UntagResourceResponse,
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Updates an existing dashboard's properties, including its name, description, and widget configurations.
 */
export const updateDashboard: (
  input: UpdateDashboardRequest,
) => effect.Effect<
  UpdateDashboardResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateDashboardRequest,
  output: UpdateDashboardResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
