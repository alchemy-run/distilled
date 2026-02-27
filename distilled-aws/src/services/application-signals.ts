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
  sdkId: "Application Signals",
  serviceShapeName: "ApplicationSignals",
});
const auth = T.AwsAuthSigv4({ name: "application-signals" });
const ver = T.ServiceVersion("2024-04-15");
const proto = T.AwsProtocolsRestJson1();
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
            `https://application-signals-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        return e(
          `https://application-signals.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

//# Newtypes
export type ServiceLevelObjectiveArn = string;
export type ServiceLevelObjectiveName = string;
export type Attainment = number;
export type TotalBudgetSeconds = number;
export type BudgetSecondsRemaining = number;
export type TotalBudgetRequests = number;
export type BudgetRequestsRemaining = number;
export type KeyAttributeName = string;
export type KeyAttributeValue = string;
export type OperationName = string;
export type MetricId = string;
export type Namespace = string;
export type MetricName = string;
export type DimensionName = string;
export type DimensionValue = string;
export type Period = number;
export type Stat = string;
export type MetricExpression = string;
export type MetricLabel = string;
export type ReturnData = boolean;
export type AccountId = string;
export type ServiceLevelIndicatorMetricThreshold = number;
export type RollingIntervalDuration = number;
export type CalendarIntervalDuration = number;
export type AttainmentGoal = number;
export type WarningThreshold = number;
export type ServiceLevelObjectiveBudgetReportErrorCode = string;
export type ServiceLevelObjectiveBudgetReportErrorMessage = string;
export type ValidationExceptionMessage = string;
export type ExclusionDuration = number;
export type Expression = string;
export type ExclusionReason = string;
export type ServiceLevelObjectiveId = string;
export type ExclusionWindowErrorCode = string;
export type ExclusionWindowErrorMessage = string;
export type ResourceType = string;
export type ResourceId = string;
export type FaultDescription = string;
export type ServiceErrorMessage = string;
export type GroupName = string;
export type GroupValue = string;
export type GroupSource = string;
export type GroupIdentifier = string;
export type MetricType = string;
export type AwsAccountId = string;
export type NextToken = string;
export type ListAuditFindingMaxResults = number;
export type ListEntityEventsMaxResults = number;
export type GroupingString = string;
export type ListServiceDependenciesMaxResults = number;
export type ListServiceDependentsMaxResults = number;
export type ListServiceLevelObjectiveExclusionWindowsMaxResults = number;
export type ListServiceOperationMaxResults = number;
export type ListServicesMaxResults = number;
export type ListServiceStatesMaxResults = number;
export type AttributeFilterName = string;
export type AttributeFilterValue = string;
export type AmazonResourceName = string;
export type TagKey = string;
export type TagValue = string;
export type ServiceLevelObjectiveDescription = string;
export type ServiceLevelIndicatorStatistic = string;
export type SLIPeriodSeconds = number;
export type BurnRateLookBackWindowMinutes = number;
export type ListServiceLevelObjectivesMaxResults = number;

//# Schemas
export type ServiceLevelObjectiveIds = string[];
export const ServiceLevelObjectiveIds = S.Array(S.String);
export interface BatchGetServiceLevelObjectiveBudgetReportInput {
  Timestamp: Date;
  SloIds: string[];
}
export const BatchGetServiceLevelObjectiveBudgetReportInput = S.suspend(() =>
  S.Struct({
    Timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    SloIds: ServiceLevelObjectiveIds,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/budget-report" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetServiceLevelObjectiveBudgetReportInput",
}) as any as S.Schema<BatchGetServiceLevelObjectiveBudgetReportInput>;
export type EvaluationType = "PeriodBased" | "RequestBased" | (string & {});
export const EvaluationType = S.String;
export type ServiceLevelObjectiveBudgetStatus =
  | "OK"
  | "WARNING"
  | "BREACHED"
  | "INSUFFICIENT_DATA"
  | (string & {});
export const ServiceLevelObjectiveBudgetStatus = S.String;
export type Attributes = { [key: string]: string | undefined };
export const Attributes = S.Record(S.String, S.String.pipe(S.optional));
export type ServiceLevelIndicatorMetricType =
  | "LATENCY"
  | "AVAILABILITY"
  | (string & {});
export const ServiceLevelIndicatorMetricType = S.String;
export interface Dimension {
  Name: string;
  Value: string;
}
export const Dimension = S.suspend(() =>
  S.Struct({ Name: S.String, Value: S.String }),
).annotate({ identifier: "Dimension" }) as any as S.Schema<Dimension>;
export type Dimensions = Dimension[];
export const Dimensions = S.Array(Dimension);
export interface Metric {
  Namespace?: string;
  MetricName?: string;
  Dimensions?: Dimension[];
}
export const Metric = S.suspend(() =>
  S.Struct({
    Namespace: S.optional(S.String),
    MetricName: S.optional(S.String),
    Dimensions: S.optional(Dimensions),
  }),
).annotate({ identifier: "Metric" }) as any as S.Schema<Metric>;
export type StandardUnit =
  | "Microseconds"
  | "Milliseconds"
  | "Seconds"
  | "Bytes"
  | "Kilobytes"
  | "Megabytes"
  | "Gigabytes"
  | "Terabytes"
  | "Bits"
  | "Kilobits"
  | "Megabits"
  | "Gigabits"
  | "Terabits"
  | "Percent"
  | "Count"
  | "Bytes/Second"
  | "Kilobytes/Second"
  | "Megabytes/Second"
  | "Gigabytes/Second"
  | "Terabytes/Second"
  | "Bits/Second"
  | "Kilobits/Second"
  | "Megabits/Second"
  | "Gigabits/Second"
  | "Terabits/Second"
  | "Count/Second"
  | "None"
  | (string & {});
export const StandardUnit = S.String;
export interface MetricStat {
  Metric: Metric;
  Period: number;
  Stat: string;
  Unit?: StandardUnit;
}
export const MetricStat = S.suspend(() =>
  S.Struct({
    Metric: Metric,
    Period: S.Number,
    Stat: S.String,
    Unit: S.optional(StandardUnit),
  }),
).annotate({ identifier: "MetricStat" }) as any as S.Schema<MetricStat>;
export interface MetricDataQuery {
  Id: string;
  MetricStat?: MetricStat;
  Expression?: string;
  Label?: string;
  ReturnData?: boolean;
  Period?: number;
  AccountId?: string;
}
export const MetricDataQuery = S.suspend(() =>
  S.Struct({
    Id: S.String,
    MetricStat: S.optional(MetricStat),
    Expression: S.optional(S.String),
    Label: S.optional(S.String),
    ReturnData: S.optional(S.Boolean),
    Period: S.optional(S.Number),
    AccountId: S.optional(S.String),
  }),
).annotate({
  identifier: "MetricDataQuery",
}) as any as S.Schema<MetricDataQuery>;
export type MetricDataQueries = MetricDataQuery[];
export const MetricDataQueries = S.Array(MetricDataQuery);
export interface DependencyConfig {
  DependencyKeyAttributes: { [key: string]: string | undefined };
  DependencyOperationName: string;
}
export const DependencyConfig = S.suspend(() =>
  S.Struct({
    DependencyKeyAttributes: Attributes,
    DependencyOperationName: S.String,
  }),
).annotate({
  identifier: "DependencyConfig",
}) as any as S.Schema<DependencyConfig>;
export interface ServiceLevelIndicatorMetric {
  KeyAttributes?: { [key: string]: string | undefined };
  OperationName?: string;
  MetricType?: ServiceLevelIndicatorMetricType;
  MetricDataQueries: MetricDataQuery[];
  DependencyConfig?: DependencyConfig;
}
export const ServiceLevelIndicatorMetric = S.suspend(() =>
  S.Struct({
    KeyAttributes: S.optional(Attributes),
    OperationName: S.optional(S.String),
    MetricType: S.optional(ServiceLevelIndicatorMetricType),
    MetricDataQueries: MetricDataQueries,
    DependencyConfig: S.optional(DependencyConfig),
  }),
).annotate({
  identifier: "ServiceLevelIndicatorMetric",
}) as any as S.Schema<ServiceLevelIndicatorMetric>;
export type ServiceLevelIndicatorComparisonOperator =
  | "GreaterThanOrEqualTo"
  | "GreaterThan"
  | "LessThan"
  | "LessThanOrEqualTo"
  | (string & {});
export const ServiceLevelIndicatorComparisonOperator = S.String;
export interface ServiceLevelIndicator {
  SliMetric: ServiceLevelIndicatorMetric;
  MetricThreshold: number;
  ComparisonOperator: ServiceLevelIndicatorComparisonOperator;
}
export const ServiceLevelIndicator = S.suspend(() =>
  S.Struct({
    SliMetric: ServiceLevelIndicatorMetric,
    MetricThreshold: S.Number,
    ComparisonOperator: ServiceLevelIndicatorComparisonOperator,
  }),
).annotate({
  identifier: "ServiceLevelIndicator",
}) as any as S.Schema<ServiceLevelIndicator>;
export type MonitoredRequestCountMetricDataQueries =
  | { GoodCountMetric: MetricDataQuery[]; BadCountMetric?: never }
  | { GoodCountMetric?: never; BadCountMetric: MetricDataQuery[] };
export const MonitoredRequestCountMetricDataQueries = S.Union([
  S.Struct({ GoodCountMetric: MetricDataQueries }),
  S.Struct({ BadCountMetric: MetricDataQueries }),
]);
export interface RequestBasedServiceLevelIndicatorMetric {
  KeyAttributes?: { [key: string]: string | undefined };
  OperationName?: string;
  MetricType?: ServiceLevelIndicatorMetricType;
  TotalRequestCountMetric: MetricDataQuery[];
  MonitoredRequestCountMetric: MonitoredRequestCountMetricDataQueries;
  DependencyConfig?: DependencyConfig;
}
export const RequestBasedServiceLevelIndicatorMetric = S.suspend(() =>
  S.Struct({
    KeyAttributes: S.optional(Attributes),
    OperationName: S.optional(S.String),
    MetricType: S.optional(ServiceLevelIndicatorMetricType),
    TotalRequestCountMetric: MetricDataQueries,
    MonitoredRequestCountMetric: MonitoredRequestCountMetricDataQueries,
    DependencyConfig: S.optional(DependencyConfig),
  }),
).annotate({
  identifier: "RequestBasedServiceLevelIndicatorMetric",
}) as any as S.Schema<RequestBasedServiceLevelIndicatorMetric>;
export interface RequestBasedServiceLevelIndicator {
  RequestBasedSliMetric: RequestBasedServiceLevelIndicatorMetric;
  MetricThreshold?: number;
  ComparisonOperator?: ServiceLevelIndicatorComparisonOperator;
}
export const RequestBasedServiceLevelIndicator = S.suspend(() =>
  S.Struct({
    RequestBasedSliMetric: RequestBasedServiceLevelIndicatorMetric,
    MetricThreshold: S.optional(S.Number),
    ComparisonOperator: S.optional(ServiceLevelIndicatorComparisonOperator),
  }),
).annotate({
  identifier: "RequestBasedServiceLevelIndicator",
}) as any as S.Schema<RequestBasedServiceLevelIndicator>;
export type DurationUnit = "MINUTE" | "HOUR" | "DAY" | "MONTH" | (string & {});
export const DurationUnit = S.String;
export interface RollingInterval {
  DurationUnit: DurationUnit;
  Duration: number;
}
export const RollingInterval = S.suspend(() =>
  S.Struct({ DurationUnit: DurationUnit, Duration: S.Number }),
).annotate({
  identifier: "RollingInterval",
}) as any as S.Schema<RollingInterval>;
export interface CalendarInterval {
  StartTime: Date;
  DurationUnit: DurationUnit;
  Duration: number;
}
export const CalendarInterval = S.suspend(() =>
  S.Struct({
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    DurationUnit: DurationUnit,
    Duration: S.Number,
  }),
).annotate({
  identifier: "CalendarInterval",
}) as any as S.Schema<CalendarInterval>;
export type Interval =
  | { RollingInterval: RollingInterval; CalendarInterval?: never }
  | { RollingInterval?: never; CalendarInterval: CalendarInterval };
export const Interval = S.Union([
  S.Struct({ RollingInterval: RollingInterval }),
  S.Struct({ CalendarInterval: CalendarInterval }),
]);
export interface Goal {
  Interval?: Interval;
  AttainmentGoal?: number;
  WarningThreshold?: number;
}
export const Goal = S.suspend(() =>
  S.Struct({
    Interval: S.optional(Interval),
    AttainmentGoal: S.optional(S.Number),
    WarningThreshold: S.optional(S.Number),
  }),
).annotate({ identifier: "Goal" }) as any as S.Schema<Goal>;
export interface ServiceLevelObjectiveBudgetReport {
  Arn: string;
  Name: string;
  EvaluationType?: EvaluationType;
  BudgetStatus: ServiceLevelObjectiveBudgetStatus;
  Attainment?: number;
  TotalBudgetSeconds?: number;
  BudgetSecondsRemaining?: number;
  TotalBudgetRequests?: number;
  BudgetRequestsRemaining?: number;
  Sli?: ServiceLevelIndicator;
  RequestBasedSli?: RequestBasedServiceLevelIndicator;
  Goal?: Goal;
}
export const ServiceLevelObjectiveBudgetReport = S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Name: S.String,
    EvaluationType: S.optional(EvaluationType),
    BudgetStatus: ServiceLevelObjectiveBudgetStatus,
    Attainment: S.optional(S.Number),
    TotalBudgetSeconds: S.optional(S.Number),
    BudgetSecondsRemaining: S.optional(S.Number),
    TotalBudgetRequests: S.optional(S.Number),
    BudgetRequestsRemaining: S.optional(S.Number),
    Sli: S.optional(ServiceLevelIndicator),
    RequestBasedSli: S.optional(RequestBasedServiceLevelIndicator),
    Goal: S.optional(Goal),
  }),
).annotate({
  identifier: "ServiceLevelObjectiveBudgetReport",
}) as any as S.Schema<ServiceLevelObjectiveBudgetReport>;
export type ServiceLevelObjectiveBudgetReports =
  ServiceLevelObjectiveBudgetReport[];
export const ServiceLevelObjectiveBudgetReports = S.Array(
  ServiceLevelObjectiveBudgetReport,
);
export interface ServiceLevelObjectiveBudgetReportError {
  Name: string;
  Arn: string;
  ErrorCode: string;
  ErrorMessage: string;
}
export const ServiceLevelObjectiveBudgetReportError = S.suspend(() =>
  S.Struct({
    Name: S.String,
    Arn: S.String,
    ErrorCode: S.String,
    ErrorMessage: S.String,
  }),
).annotate({
  identifier: "ServiceLevelObjectiveBudgetReportError",
}) as any as S.Schema<ServiceLevelObjectiveBudgetReportError>;
export type ServiceLevelObjectiveBudgetReportErrors =
  ServiceLevelObjectiveBudgetReportError[];
export const ServiceLevelObjectiveBudgetReportErrors = S.Array(
  ServiceLevelObjectiveBudgetReportError,
);
export interface BatchGetServiceLevelObjectiveBudgetReportOutput {
  Timestamp: Date;
  Reports: ServiceLevelObjectiveBudgetReport[];
  Errors: ServiceLevelObjectiveBudgetReportError[];
}
export const BatchGetServiceLevelObjectiveBudgetReportOutput = S.suspend(() =>
  S.Struct({
    Timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Reports: ServiceLevelObjectiveBudgetReports,
    Errors: ServiceLevelObjectiveBudgetReportErrors,
  }),
).annotate({
  identifier: "BatchGetServiceLevelObjectiveBudgetReportOutput",
}) as any as S.Schema<BatchGetServiceLevelObjectiveBudgetReportOutput>;
export interface Window {
  DurationUnit: DurationUnit;
  Duration: number;
}
export const Window = S.suspend(() =>
  S.Struct({ DurationUnit: DurationUnit, Duration: S.Number }),
).annotate({ identifier: "Window" }) as any as S.Schema<Window>;
export interface RecurrenceRule {
  Expression: string;
}
export const RecurrenceRule = S.suspend(() =>
  S.Struct({ Expression: S.String }),
).annotate({ identifier: "RecurrenceRule" }) as any as S.Schema<RecurrenceRule>;
export interface ExclusionWindow {
  Window: Window;
  StartTime?: Date;
  RecurrenceRule?: RecurrenceRule;
  Reason?: string;
}
export const ExclusionWindow = S.suspend(() =>
  S.Struct({
    Window: Window,
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    RecurrenceRule: S.optional(RecurrenceRule),
    Reason: S.optional(S.String),
  }),
).annotate({
  identifier: "ExclusionWindow",
}) as any as S.Schema<ExclusionWindow>;
export type ExclusionWindows = ExclusionWindow[];
export const ExclusionWindows = S.Array(ExclusionWindow);
export interface BatchUpdateExclusionWindowsInput {
  SloIds: string[];
  AddExclusionWindows?: ExclusionWindow[];
  RemoveExclusionWindows?: ExclusionWindow[];
}
export const BatchUpdateExclusionWindowsInput = S.suspend(() =>
  S.Struct({
    SloIds: ServiceLevelObjectiveIds,
    AddExclusionWindows: S.optional(ExclusionWindows),
    RemoveExclusionWindows: S.optional(ExclusionWindows),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/exclusion-windows" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchUpdateExclusionWindowsInput",
}) as any as S.Schema<BatchUpdateExclusionWindowsInput>;
export interface BatchUpdateExclusionWindowsError_ {
  SloId: string;
  ErrorCode: string;
  ErrorMessage: string;
}
export const BatchUpdateExclusionWindowsError_ = S.suspend(() =>
  S.Struct({ SloId: S.String, ErrorCode: S.String, ErrorMessage: S.String }),
).annotate({
  identifier: "BatchUpdateExclusionWindowsError",
}) as any as S.Schema<BatchUpdateExclusionWindowsError_>;
export type BatchUpdateExclusionWindowsErrors =
  BatchUpdateExclusionWindowsError_[];
export const BatchUpdateExclusionWindowsErrors = S.Array(
  BatchUpdateExclusionWindowsError_,
);
export interface BatchUpdateExclusionWindowsOutput {
  SloIds: string[];
  Errors: BatchUpdateExclusionWindowsError_[];
}
export const BatchUpdateExclusionWindowsOutput = S.suspend(() =>
  S.Struct({
    SloIds: ServiceLevelObjectiveIds,
    Errors: BatchUpdateExclusionWindowsErrors,
  }),
).annotate({
  identifier: "BatchUpdateExclusionWindowsOutput",
}) as any as S.Schema<BatchUpdateExclusionWindowsOutput>;
export interface DeleteGroupingConfigurationRequest {}
export const DeleteGroupingConfigurationRequest = S.suspend(() =>
  S.Struct({}).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteGroupingConfigurationRequest",
}) as any as S.Schema<DeleteGroupingConfigurationRequest>;
export interface DeleteGroupingConfigurationOutput {}
export const DeleteGroupingConfigurationOutput = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteGroupingConfigurationOutput",
}) as any as S.Schema<DeleteGroupingConfigurationOutput>;
export interface GetServiceInput {
  StartTime: Date;
  EndTime: Date;
  KeyAttributes: { [key: string]: string | undefined };
}
export const GetServiceInput = S.suspend(() =>
  S.Struct({
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("StartTime"),
    ),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("EndTime"),
    ),
    KeyAttributes: Attributes,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/service" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetServiceInput",
}) as any as S.Schema<GetServiceInput>;
export type AttributeMap = { [key: string]: string | undefined };
export const AttributeMap = S.Record(S.String, S.String.pipe(S.optional));
export type AttributeMaps = { [key: string]: string | undefined }[];
export const AttributeMaps = S.Array(AttributeMap);
export interface ServiceGroup {
  GroupName: string;
  GroupValue: string;
  GroupSource: string;
  GroupIdentifier: string;
}
export const ServiceGroup = S.suspend(() =>
  S.Struct({
    GroupName: S.String,
    GroupValue: S.String,
    GroupSource: S.String,
    GroupIdentifier: S.String,
  }),
).annotate({ identifier: "ServiceGroup" }) as any as S.Schema<ServiceGroup>;
export type ServiceGroups = ServiceGroup[];
export const ServiceGroups = S.Array(ServiceGroup);
export interface MetricReference {
  Namespace: string;
  MetricType: string;
  Dimensions?: Dimension[];
  MetricName: string;
  AccountId?: string;
}
export const MetricReference = S.suspend(() =>
  S.Struct({
    Namespace: S.String,
    MetricType: S.String,
    Dimensions: S.optional(Dimensions),
    MetricName: S.String,
    AccountId: S.optional(S.String),
  }),
).annotate({
  identifier: "MetricReference",
}) as any as S.Schema<MetricReference>;
export type MetricReferences = MetricReference[];
export const MetricReferences = S.Array(MetricReference);
export type LogGroupReferences = { [key: string]: string | undefined }[];
export const LogGroupReferences = S.Array(Attributes);
export interface Service {
  KeyAttributes: { [key: string]: string | undefined };
  AttributeMaps?: { [key: string]: string | undefined }[];
  ServiceGroups?: ServiceGroup[];
  MetricReferences: MetricReference[];
  LogGroupReferences?: { [key: string]: string | undefined }[];
}
export const Service = S.suspend(() =>
  S.Struct({
    KeyAttributes: Attributes,
    AttributeMaps: S.optional(AttributeMaps),
    ServiceGroups: S.optional(ServiceGroups),
    MetricReferences: MetricReferences,
    LogGroupReferences: S.optional(LogGroupReferences),
  }),
).annotate({ identifier: "Service" }) as any as S.Schema<Service>;
export interface GetServiceOutput {
  Service: Service;
  StartTime: Date;
  EndTime: Date;
  LogGroupReferences?: { [key: string]: string | undefined }[];
}
export const GetServiceOutput = S.suspend(() =>
  S.Struct({
    Service: Service,
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    LogGroupReferences: S.optional(LogGroupReferences),
  }),
).annotate({
  identifier: "GetServiceOutput",
}) as any as S.Schema<GetServiceOutput>;
export type Auditors = string[];
export const Auditors = S.Array(S.String);
export interface ServiceEntity {
  Type?: string;
  Name?: string;
  Environment?: string;
  AwsAccountId?: string;
}
export const ServiceEntity = S.suspend(() =>
  S.Struct({
    Type: S.optional(S.String),
    Name: S.optional(S.String),
    Environment: S.optional(S.String),
    AwsAccountId: S.optional(S.String),
  }),
).annotate({ identifier: "ServiceEntity" }) as any as S.Schema<ServiceEntity>;
export interface ServiceLevelObjectiveEntity {
  SloName?: string;
  SloArn?: string;
}
export const ServiceLevelObjectiveEntity = S.suspend(() =>
  S.Struct({ SloName: S.optional(S.String), SloArn: S.optional(S.String) }),
).annotate({
  identifier: "ServiceLevelObjectiveEntity",
}) as any as S.Schema<ServiceLevelObjectiveEntity>;
export interface ServiceOperationEntity {
  Service?: ServiceEntity;
  Operation?: string;
  MetricType?: string;
}
export const ServiceOperationEntity = S.suspend(() =>
  S.Struct({
    Service: S.optional(ServiceEntity),
    Operation: S.optional(S.String),
    MetricType: S.optional(S.String),
  }),
).annotate({
  identifier: "ServiceOperationEntity",
}) as any as S.Schema<ServiceOperationEntity>;
export interface CanaryEntity {
  CanaryName: string;
}
export const CanaryEntity = S.suspend(() =>
  S.Struct({ CanaryName: S.String }),
).annotate({ identifier: "CanaryEntity" }) as any as S.Schema<CanaryEntity>;
export type AuditTargetEntity =
  | {
      Service: ServiceEntity;
      Slo?: never;
      ServiceOperation?: never;
      Canary?: never;
    }
  | {
      Service?: never;
      Slo: ServiceLevelObjectiveEntity;
      ServiceOperation?: never;
      Canary?: never;
    }
  | {
      Service?: never;
      Slo?: never;
      ServiceOperation: ServiceOperationEntity;
      Canary?: never;
    }
  | {
      Service?: never;
      Slo?: never;
      ServiceOperation?: never;
      Canary: CanaryEntity;
    };
export const AuditTargetEntity = S.Union([
  S.Struct({ Service: ServiceEntity }),
  S.Struct({ Slo: ServiceLevelObjectiveEntity }),
  S.Struct({ ServiceOperation: ServiceOperationEntity }),
  S.Struct({ Canary: CanaryEntity }),
]);
export interface AuditTarget {
  Type: string;
  Data: AuditTargetEntity;
}
export const AuditTarget = S.suspend(() =>
  S.Struct({ Type: S.String, Data: AuditTargetEntity }),
).annotate({ identifier: "AuditTarget" }) as any as S.Schema<AuditTarget>;
export type AuditTargets = AuditTarget[];
export const AuditTargets = S.Array(AuditTarget);
export type DetailLevel = "BRIEF" | "DETAILED" | (string & {});
export const DetailLevel = S.String;
export interface ListAuditFindingsInput {
  StartTime: Date;
  EndTime: Date;
  Auditors?: string[];
  AuditTargets: AuditTarget[];
  DetailLevel?: DetailLevel;
  NextToken?: string;
  MaxResults?: number;
}
export const ListAuditFindingsInput = S.suspend(() =>
  S.Struct({
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("StartTime"),
    ),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("EndTime"),
    ),
    Auditors: S.optional(Auditors),
    AuditTargets: AuditTargets,
    DetailLevel: S.optional(DetailLevel),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/auditFindings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAuditFindingsInput",
}) as any as S.Schema<ListAuditFindingsInput>;
export type DataMap = { [key: string]: string | undefined };
export const DataMap = S.Record(S.String, S.String.pipe(S.optional));
export type Severity =
  | "CRITICAL"
  | "HIGH"
  | "MEDIUM"
  | "LOW"
  | "NONE"
  | (string & {});
export const Severity = S.String;
export interface AuditorResult {
  Auditor?: string;
  Description?: string;
  Data?: { [key: string]: string | undefined };
  Severity?: Severity;
}
export const AuditorResult = S.suspend(() =>
  S.Struct({
    Auditor: S.optional(S.String),
    Description: S.optional(S.String),
    Data: S.optional(DataMap),
    Severity: S.optional(Severity),
  }),
).annotate({ identifier: "AuditorResult" }) as any as S.Schema<AuditorResult>;
export type AuditorResults = AuditorResult[];
export const AuditorResults = S.Array(AuditorResult);
export interface MetricGraph {
  MetricDataQueries?: MetricDataQuery[];
  StartTime?: Date;
  EndTime?: Date;
}
export const MetricGraph = S.suspend(() =>
  S.Struct({
    MetricDataQueries: S.optional(MetricDataQueries),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "MetricGraph" }) as any as S.Schema<MetricGraph>;
export interface Node {
  KeyAttributes: { [key: string]: string | undefined };
  Name: string;
  NodeId: string;
  Operation?: string;
  Type?: string;
  Duration?: number;
  Status?: string;
}
export const Node = S.suspend(() =>
  S.Struct({
    KeyAttributes: Attributes,
    Name: S.String,
    NodeId: S.String,
    Operation: S.optional(S.String),
    Type: S.optional(S.String),
    Duration: S.optional(S.Number),
    Status: S.optional(S.String),
  }),
).annotate({ identifier: "Node" }) as any as S.Schema<Node>;
export type Nodes = Node[];
export const Nodes = S.Array(Node);
export type ConnectionType = "INDIRECT" | "DIRECT" | (string & {});
export const ConnectionType = S.String;
export interface Edge {
  SourceNodeId?: string;
  DestinationNodeId?: string;
  Duration?: number;
  ConnectionType?: ConnectionType;
}
export const Edge = S.suspend(() =>
  S.Struct({
    SourceNodeId: S.optional(S.String),
    DestinationNodeId: S.optional(S.String),
    Duration: S.optional(S.Number),
    ConnectionType: S.optional(ConnectionType),
  }),
).annotate({ identifier: "Edge" }) as any as S.Schema<Edge>;
export type Edges = Edge[];
export const Edges = S.Array(Edge);
export interface DependencyGraph {
  Nodes?: Node[];
  Edges?: Edge[];
}
export const DependencyGraph = S.suspend(() =>
  S.Struct({ Nodes: S.optional(Nodes), Edges: S.optional(Edges) }),
).annotate({
  identifier: "DependencyGraph",
}) as any as S.Schema<DependencyGraph>;
export interface AuditFinding {
  KeyAttributes: { [key: string]: string | undefined };
  AuditorResults?: AuditorResult[];
  Operation?: string;
  MetricGraph?: MetricGraph;
  DependencyGraph?: DependencyGraph;
  Type?: string;
}
export const AuditFinding = S.suspend(() =>
  S.Struct({
    KeyAttributes: Attributes,
    AuditorResults: S.optional(AuditorResults),
    Operation: S.optional(S.String),
    MetricGraph: S.optional(MetricGraph),
    DependencyGraph: S.optional(DependencyGraph),
    Type: S.optional(S.String),
  }),
).annotate({ identifier: "AuditFinding" }) as any as S.Schema<AuditFinding>;
export type AuditFindings = AuditFinding[];
export const AuditFindings = S.Array(AuditFinding);
export interface ListAuditFindingsOutput {
  StartTime?: Date;
  EndTime?: Date;
  AuditFindings: AuditFinding[];
  NextToken?: string;
}
export const ListAuditFindingsOutput = S.suspend(() =>
  S.Struct({
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    AuditFindings: AuditFindings,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAuditFindingsOutput",
}) as any as S.Schema<ListAuditFindingsOutput>;
export interface ListEntityEventsInput {
  Entity: { [key: string]: string | undefined };
  StartTime: Date;
  EndTime: Date;
  MaxResults?: number;
  NextToken?: string;
}
export const ListEntityEventsInput = S.suspend(() =>
  S.Struct({
    Entity: Attributes,
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/events" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEntityEventsInput",
}) as any as S.Schema<ListEntityEventsInput>;
export type ChangeEventType = "DEPLOYMENT" | "CONFIGURATION" | (string & {});
export const ChangeEventType = S.String;
export interface ChangeEvent {
  Timestamp: Date;
  AccountId: string;
  Region: string;
  Entity: { [key: string]: string | undefined };
  ChangeEventType: ChangeEventType;
  EventId: string;
  UserName?: string;
  EventName?: string;
}
export const ChangeEvent = S.suspend(() =>
  S.Struct({
    Timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    AccountId: S.String,
    Region: S.String,
    Entity: Attributes,
    ChangeEventType: ChangeEventType,
    EventId: S.String,
    UserName: S.optional(S.String),
    EventName: S.optional(S.String),
  }),
).annotate({ identifier: "ChangeEvent" }) as any as S.Schema<ChangeEvent>;
export type ChangeEvents = ChangeEvent[];
export const ChangeEvents = S.Array(ChangeEvent);
export interface ListEntityEventsOutput {
  StartTime: Date;
  EndTime: Date;
  ChangeEvents: ChangeEvent[];
  NextToken?: string;
}
export const ListEntityEventsOutput = S.suspend(() =>
  S.Struct({
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ChangeEvents: ChangeEvents,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEntityEventsOutput",
}) as any as S.Schema<ListEntityEventsOutput>;
export interface ListGroupingAttributeDefinitionsInput {
  NextToken?: string;
  AwsAccountId?: string;
  IncludeLinkedAccounts?: boolean;
}
export const ListGroupingAttributeDefinitionsInput = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    AwsAccountId: S.optional(S.String).pipe(T.HttpQuery("AwsAccountId")),
    IncludeLinkedAccounts: S.optional(S.Boolean).pipe(
      T.HttpQuery("IncludeLinkedAccounts"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/grouping-attribute-definitions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListGroupingAttributeDefinitionsInput",
}) as any as S.Schema<ListGroupingAttributeDefinitionsInput>;
export type GroupingSourceKeyStringList = string[];
export const GroupingSourceKeyStringList = S.Array(S.String);
export interface GroupingAttributeDefinition {
  GroupingName: string;
  GroupingSourceKeys?: string[];
  DefaultGroupingValue?: string;
}
export const GroupingAttributeDefinition = S.suspend(() =>
  S.Struct({
    GroupingName: S.String,
    GroupingSourceKeys: S.optional(GroupingSourceKeyStringList),
    DefaultGroupingValue: S.optional(S.String),
  }),
).annotate({
  identifier: "GroupingAttributeDefinition",
}) as any as S.Schema<GroupingAttributeDefinition>;
export type GroupingAttributeDefinitions = GroupingAttributeDefinition[];
export const GroupingAttributeDefinitions = S.Array(
  GroupingAttributeDefinition,
);
export interface ListGroupingAttributeDefinitionsOutput {
  GroupingAttributeDefinitions: GroupingAttributeDefinition[];
  UpdatedAt?: Date;
  NextToken?: string;
}
export const ListGroupingAttributeDefinitionsOutput = S.suspend(() =>
  S.Struct({
    GroupingAttributeDefinitions: GroupingAttributeDefinitions,
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListGroupingAttributeDefinitionsOutput",
}) as any as S.Schema<ListGroupingAttributeDefinitionsOutput>;
export interface ListServiceDependenciesInput {
  StartTime: Date;
  EndTime: Date;
  KeyAttributes: { [key: string]: string | undefined };
  MaxResults?: number;
  NextToken?: string;
}
export const ListServiceDependenciesInput = S.suspend(() =>
  S.Struct({
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("StartTime"),
    ),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("EndTime"),
    ),
    KeyAttributes: Attributes,
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/service-dependencies" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListServiceDependenciesInput",
}) as any as S.Schema<ListServiceDependenciesInput>;
export interface ServiceDependency {
  OperationName: string;
  DependencyKeyAttributes: { [key: string]: string | undefined };
  DependencyOperationName: string;
  MetricReferences: MetricReference[];
}
export const ServiceDependency = S.suspend(() =>
  S.Struct({
    OperationName: S.String,
    DependencyKeyAttributes: Attributes,
    DependencyOperationName: S.String,
    MetricReferences: MetricReferences,
  }),
).annotate({
  identifier: "ServiceDependency",
}) as any as S.Schema<ServiceDependency>;
export type ServiceDependencies = ServiceDependency[];
export const ServiceDependencies = S.Array(ServiceDependency);
export interface ListServiceDependenciesOutput {
  StartTime: Date;
  EndTime: Date;
  ServiceDependencies: ServiceDependency[];
  NextToken?: string;
}
export const ListServiceDependenciesOutput = S.suspend(() =>
  S.Struct({
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ServiceDependencies: ServiceDependencies,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListServiceDependenciesOutput",
}) as any as S.Schema<ListServiceDependenciesOutput>;
export interface ListServiceDependentsInput {
  StartTime: Date;
  EndTime: Date;
  KeyAttributes: { [key: string]: string | undefined };
  MaxResults?: number;
  NextToken?: string;
}
export const ListServiceDependentsInput = S.suspend(() =>
  S.Struct({
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("StartTime"),
    ),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("EndTime"),
    ),
    KeyAttributes: Attributes,
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/service-dependents" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListServiceDependentsInput",
}) as any as S.Schema<ListServiceDependentsInput>;
export interface ServiceDependent {
  OperationName?: string;
  DependentKeyAttributes: { [key: string]: string | undefined };
  DependentOperationName?: string;
  MetricReferences: MetricReference[];
}
export const ServiceDependent = S.suspend(() =>
  S.Struct({
    OperationName: S.optional(S.String),
    DependentKeyAttributes: Attributes,
    DependentOperationName: S.optional(S.String),
    MetricReferences: MetricReferences,
  }),
).annotate({
  identifier: "ServiceDependent",
}) as any as S.Schema<ServiceDependent>;
export type ServiceDependents = ServiceDependent[];
export const ServiceDependents = S.Array(ServiceDependent);
export interface ListServiceDependentsOutput {
  StartTime: Date;
  EndTime: Date;
  ServiceDependents: ServiceDependent[];
  NextToken?: string;
}
export const ListServiceDependentsOutput = S.suspend(() =>
  S.Struct({
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ServiceDependents: ServiceDependents,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListServiceDependentsOutput",
}) as any as S.Schema<ListServiceDependentsOutput>;
export interface ListServiceLevelObjectiveExclusionWindowsInput {
  Id: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListServiceLevelObjectiveExclusionWindowsInput = S.suspend(() =>
  S.Struct({
    Id: S.String.pipe(T.HttpLabel("Id")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/slo/{Id}/exclusion-windows" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListServiceLevelObjectiveExclusionWindowsInput",
}) as any as S.Schema<ListServiceLevelObjectiveExclusionWindowsInput>;
export interface ListServiceLevelObjectiveExclusionWindowsOutput {
  ExclusionWindows: ExclusionWindow[];
  NextToken?: string;
}
export const ListServiceLevelObjectiveExclusionWindowsOutput = S.suspend(() =>
  S.Struct({
    ExclusionWindows: ExclusionWindows,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListServiceLevelObjectiveExclusionWindowsOutput",
}) as any as S.Schema<ListServiceLevelObjectiveExclusionWindowsOutput>;
export interface ListServiceOperationsInput {
  StartTime: Date;
  EndTime: Date;
  KeyAttributes: { [key: string]: string | undefined };
  MaxResults?: number;
  NextToken?: string;
}
export const ListServiceOperationsInput = S.suspend(() =>
  S.Struct({
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("StartTime"),
    ),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("EndTime"),
    ),
    KeyAttributes: Attributes,
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/service-operations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListServiceOperationsInput",
}) as any as S.Schema<ListServiceOperationsInput>;
export interface ServiceOperation {
  Name: string;
  MetricReferences: MetricReference[];
}
export const ServiceOperation = S.suspend(() =>
  S.Struct({ Name: S.String, MetricReferences: MetricReferences }),
).annotate({
  identifier: "ServiceOperation",
}) as any as S.Schema<ServiceOperation>;
export type ServiceOperations = ServiceOperation[];
export const ServiceOperations = S.Array(ServiceOperation);
export interface ListServiceOperationsOutput {
  StartTime: Date;
  EndTime: Date;
  ServiceOperations: ServiceOperation[];
  NextToken?: string;
}
export const ListServiceOperationsOutput = S.suspend(() =>
  S.Struct({
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ServiceOperations: ServiceOperations,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListServiceOperationsOutput",
}) as any as S.Schema<ListServiceOperationsOutput>;
export interface ListServicesInput {
  StartTime: Date;
  EndTime: Date;
  MaxResults?: number;
  NextToken?: string;
  IncludeLinkedAccounts?: boolean;
  AwsAccountId?: string;
}
export const ListServicesInput = S.suspend(() =>
  S.Struct({
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("StartTime"),
    ),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("EndTime"),
    ),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    IncludeLinkedAccounts: S.optional(S.Boolean).pipe(
      T.HttpQuery("IncludeLinkedAccounts"),
    ),
    AwsAccountId: S.optional(S.String).pipe(T.HttpQuery("AwsAccountId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/services" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListServicesInput",
}) as any as S.Schema<ListServicesInput>;
export interface ServiceSummary {
  KeyAttributes: { [key: string]: string | undefined };
  AttributeMaps?: { [key: string]: string | undefined }[];
  MetricReferences: MetricReference[];
  ServiceGroups?: ServiceGroup[];
}
export const ServiceSummary = S.suspend(() =>
  S.Struct({
    KeyAttributes: Attributes,
    AttributeMaps: S.optional(AttributeMaps),
    MetricReferences: MetricReferences,
    ServiceGroups: S.optional(ServiceGroups),
  }),
).annotate({ identifier: "ServiceSummary" }) as any as S.Schema<ServiceSummary>;
export type ServiceSummaries = ServiceSummary[];
export const ServiceSummaries = S.Array(ServiceSummary);
export interface ListServicesOutput {
  StartTime: Date;
  EndTime: Date;
  ServiceSummaries: ServiceSummary[];
  NextToken?: string;
}
export const ListServicesOutput = S.suspend(() =>
  S.Struct({
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ServiceSummaries: ServiceSummaries,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListServicesOutput",
}) as any as S.Schema<ListServicesOutput>;
export type AttributeFilterValues = string[];
export const AttributeFilterValues = S.Array(S.String);
export interface AttributeFilter {
  AttributeFilterName: string;
  AttributeFilterValues: string[];
}
export const AttributeFilter = S.suspend(() =>
  S.Struct({
    AttributeFilterName: S.String,
    AttributeFilterValues: AttributeFilterValues,
  }),
).annotate({
  identifier: "AttributeFilter",
}) as any as S.Schema<AttributeFilter>;
export type AttributeFilters = AttributeFilter[];
export const AttributeFilters = S.Array(AttributeFilter);
export interface ListServiceStatesInput {
  StartTime: Date;
  EndTime: Date;
  MaxResults?: number;
  NextToken?: string;
  IncludeLinkedAccounts?: boolean;
  AwsAccountId?: string;
  AttributeFilters?: AttributeFilter[];
}
export const ListServiceStatesInput = S.suspend(() =>
  S.Struct({
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    IncludeLinkedAccounts: S.optional(S.Boolean),
    AwsAccountId: S.optional(S.String),
    AttributeFilters: S.optional(AttributeFilters),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/service/states" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListServiceStatesInput",
}) as any as S.Schema<ListServiceStatesInput>;
export type LatestChangeEvents = ChangeEvent[];
export const LatestChangeEvents = S.Array(ChangeEvent);
export interface ServiceState {
  AttributeFilters?: AttributeFilter[];
  Service: { [key: string]: string | undefined };
  LatestChangeEvents: ChangeEvent[];
}
export const ServiceState = S.suspend(() =>
  S.Struct({
    AttributeFilters: S.optional(AttributeFilters),
    Service: Attributes,
    LatestChangeEvents: LatestChangeEvents,
  }),
).annotate({ identifier: "ServiceState" }) as any as S.Schema<ServiceState>;
export type ServiceStates = ServiceState[];
export const ServiceStates = S.Array(ServiceState);
export interface ListServiceStatesOutput {
  StartTime: Date;
  EndTime: Date;
  ServiceStates: ServiceState[];
  NextToken?: string;
}
export const ListServiceStatesOutput = S.suspend(() =>
  S.Struct({
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ServiceStates: ServiceStates,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListServiceStatesOutput",
}) as any as S.Schema<ListServiceStatesOutput>;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = S.suspend(() =>
  S.Struct({ ResourceArn: S.String.pipe(T.HttpQuery("ResourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface Tag {
  Key: string;
  Value: string;
}
export const Tag = S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = S.Array(Tag);
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface PutGroupingConfigurationInput {
  GroupingAttributeDefinitions: GroupingAttributeDefinition[];
}
export const PutGroupingConfigurationInput = S.suspend(() =>
  S.Struct({ GroupingAttributeDefinitions: GroupingAttributeDefinitions }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/grouping-configuration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutGroupingConfigurationInput",
}) as any as S.Schema<PutGroupingConfigurationInput>;
export interface GroupingConfiguration {
  GroupingAttributeDefinitions: GroupingAttributeDefinition[];
  UpdatedAt: Date;
}
export const GroupingConfiguration = S.suspend(() =>
  S.Struct({
    GroupingAttributeDefinitions: GroupingAttributeDefinitions,
    UpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "GroupingConfiguration",
}) as any as S.Schema<GroupingConfiguration>;
export interface PutGroupingConfigurationOutput {
  GroupingConfiguration: GroupingConfiguration;
}
export const PutGroupingConfigurationOutput = S.suspend(() =>
  S.Struct({ GroupingConfiguration: GroupingConfiguration }),
).annotate({
  identifier: "PutGroupingConfigurationOutput",
}) as any as S.Schema<PutGroupingConfigurationOutput>;
export interface StartDiscoveryInput {}
export const StartDiscoveryInput = S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/start-discovery" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartDiscoveryInput",
}) as any as S.Schema<StartDiscoveryInput>;
export interface StartDiscoveryOutput {}
export const StartDiscoveryOutput = S.suspend(() => S.Struct({})).annotate({
  identifier: "StartDiscoveryOutput",
}) as any as S.Schema<StartDiscoveryOutput>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({ ResourceArn: S.String, Tags: TagList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tag-resource" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type TagKeyList = string[];
export const TagKeyList = S.Array(S.String);
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = S.suspend(() =>
  S.Struct({ ResourceArn: S.String, TagKeys: TagKeyList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/untag-resource" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface ServiceLevelIndicatorMetricConfig {
  KeyAttributes?: { [key: string]: string | undefined };
  OperationName?: string;
  MetricType?: ServiceLevelIndicatorMetricType;
  MetricName?: string;
  Statistic?: string;
  PeriodSeconds?: number;
  MetricDataQueries?: MetricDataQuery[];
  DependencyConfig?: DependencyConfig;
}
export const ServiceLevelIndicatorMetricConfig = S.suspend(() =>
  S.Struct({
    KeyAttributes: S.optional(Attributes),
    OperationName: S.optional(S.String),
    MetricType: S.optional(ServiceLevelIndicatorMetricType),
    MetricName: S.optional(S.String),
    Statistic: S.optional(S.String),
    PeriodSeconds: S.optional(S.Number),
    MetricDataQueries: S.optional(MetricDataQueries),
    DependencyConfig: S.optional(DependencyConfig),
  }),
).annotate({
  identifier: "ServiceLevelIndicatorMetricConfig",
}) as any as S.Schema<ServiceLevelIndicatorMetricConfig>;
export interface ServiceLevelIndicatorConfig {
  SliMetricConfig: ServiceLevelIndicatorMetricConfig;
  MetricThreshold: number;
  ComparisonOperator: ServiceLevelIndicatorComparisonOperator;
}
export const ServiceLevelIndicatorConfig = S.suspend(() =>
  S.Struct({
    SliMetricConfig: ServiceLevelIndicatorMetricConfig,
    MetricThreshold: S.Number,
    ComparisonOperator: ServiceLevelIndicatorComparisonOperator,
  }),
).annotate({
  identifier: "ServiceLevelIndicatorConfig",
}) as any as S.Schema<ServiceLevelIndicatorConfig>;
export interface RequestBasedServiceLevelIndicatorMetricConfig {
  KeyAttributes?: { [key: string]: string | undefined };
  OperationName?: string;
  MetricType?: ServiceLevelIndicatorMetricType;
  TotalRequestCountMetric?: MetricDataQuery[];
  MonitoredRequestCountMetric?: MonitoredRequestCountMetricDataQueries;
  DependencyConfig?: DependencyConfig;
}
export const RequestBasedServiceLevelIndicatorMetricConfig = S.suspend(() =>
  S.Struct({
    KeyAttributes: S.optional(Attributes),
    OperationName: S.optional(S.String),
    MetricType: S.optional(ServiceLevelIndicatorMetricType),
    TotalRequestCountMetric: S.optional(MetricDataQueries),
    MonitoredRequestCountMetric: S.optional(
      MonitoredRequestCountMetricDataQueries,
    ),
    DependencyConfig: S.optional(DependencyConfig),
  }),
).annotate({
  identifier: "RequestBasedServiceLevelIndicatorMetricConfig",
}) as any as S.Schema<RequestBasedServiceLevelIndicatorMetricConfig>;
export interface RequestBasedServiceLevelIndicatorConfig {
  RequestBasedSliMetricConfig: RequestBasedServiceLevelIndicatorMetricConfig;
  MetricThreshold?: number;
  ComparisonOperator?: ServiceLevelIndicatorComparisonOperator;
}
export const RequestBasedServiceLevelIndicatorConfig = S.suspend(() =>
  S.Struct({
    RequestBasedSliMetricConfig: RequestBasedServiceLevelIndicatorMetricConfig,
    MetricThreshold: S.optional(S.Number),
    ComparisonOperator: S.optional(ServiceLevelIndicatorComparisonOperator),
  }),
).annotate({
  identifier: "RequestBasedServiceLevelIndicatorConfig",
}) as any as S.Schema<RequestBasedServiceLevelIndicatorConfig>;
export interface BurnRateConfiguration {
  LookBackWindowMinutes: number;
}
export const BurnRateConfiguration = S.suspend(() =>
  S.Struct({ LookBackWindowMinutes: S.Number }),
).annotate({
  identifier: "BurnRateConfiguration",
}) as any as S.Schema<BurnRateConfiguration>;
export type BurnRateConfigurations = BurnRateConfiguration[];
export const BurnRateConfigurations = S.Array(BurnRateConfiguration);
export interface CreateServiceLevelObjectiveInput {
  Name: string;
  Description?: string;
  SliConfig?: ServiceLevelIndicatorConfig;
  RequestBasedSliConfig?: RequestBasedServiceLevelIndicatorConfig;
  Goal?: Goal;
  Tags?: Tag[];
  BurnRateConfigurations?: BurnRateConfiguration[];
}
export const CreateServiceLevelObjectiveInput = S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    SliConfig: S.optional(ServiceLevelIndicatorConfig),
    RequestBasedSliConfig: S.optional(RequestBasedServiceLevelIndicatorConfig),
    Goal: S.optional(Goal),
    Tags: S.optional(TagList),
    BurnRateConfigurations: S.optional(BurnRateConfigurations),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/slo" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateServiceLevelObjectiveInput",
}) as any as S.Schema<CreateServiceLevelObjectiveInput>;
export type MetricSourceType =
  | "ServiceOperation"
  | "CloudWatchMetric"
  | "ServiceDependency"
  | (string & {});
export const MetricSourceType = S.String;
export interface ServiceLevelObjective {
  Arn: string;
  Name: string;
  Description?: string;
  CreatedTime: Date;
  LastUpdatedTime: Date;
  Sli?: ServiceLevelIndicator;
  RequestBasedSli?: RequestBasedServiceLevelIndicator;
  EvaluationType?: EvaluationType;
  Goal: Goal;
  BurnRateConfigurations?: BurnRateConfiguration[];
  MetricSourceType?: MetricSourceType;
}
export const ServiceLevelObjective = S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Name: S.String,
    Description: S.optional(S.String),
    CreatedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    LastUpdatedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Sli: S.optional(ServiceLevelIndicator),
    RequestBasedSli: S.optional(RequestBasedServiceLevelIndicator),
    EvaluationType: S.optional(EvaluationType),
    Goal: Goal,
    BurnRateConfigurations: S.optional(BurnRateConfigurations),
    MetricSourceType: S.optional(MetricSourceType),
  }),
).annotate({
  identifier: "ServiceLevelObjective",
}) as any as S.Schema<ServiceLevelObjective>;
export interface CreateServiceLevelObjectiveOutput {
  Slo: ServiceLevelObjective;
}
export const CreateServiceLevelObjectiveOutput = S.suspend(() =>
  S.Struct({ Slo: ServiceLevelObjective }),
).annotate({
  identifier: "CreateServiceLevelObjectiveOutput",
}) as any as S.Schema<CreateServiceLevelObjectiveOutput>;
export interface GetServiceLevelObjectiveInput {
  Id: string;
}
export const GetServiceLevelObjectiveInput = S.suspend(() =>
  S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/slo/{Id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetServiceLevelObjectiveInput",
}) as any as S.Schema<GetServiceLevelObjectiveInput>;
export interface GetServiceLevelObjectiveOutput {
  Slo: ServiceLevelObjective;
}
export const GetServiceLevelObjectiveOutput = S.suspend(() =>
  S.Struct({ Slo: ServiceLevelObjective }),
).annotate({
  identifier: "GetServiceLevelObjectiveOutput",
}) as any as S.Schema<GetServiceLevelObjectiveOutput>;
export interface UpdateServiceLevelObjectiveInput {
  Id: string;
  Description?: string;
  SliConfig?: ServiceLevelIndicatorConfig;
  RequestBasedSliConfig?: RequestBasedServiceLevelIndicatorConfig;
  Goal?: Goal;
  BurnRateConfigurations?: BurnRateConfiguration[];
}
export const UpdateServiceLevelObjectiveInput = S.suspend(() =>
  S.Struct({
    Id: S.String.pipe(T.HttpLabel("Id")),
    Description: S.optional(S.String),
    SliConfig: S.optional(ServiceLevelIndicatorConfig),
    RequestBasedSliConfig: S.optional(RequestBasedServiceLevelIndicatorConfig),
    Goal: S.optional(Goal),
    BurnRateConfigurations: S.optional(BurnRateConfigurations),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/slo/{Id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateServiceLevelObjectiveInput",
}) as any as S.Schema<UpdateServiceLevelObjectiveInput>;
export interface UpdateServiceLevelObjectiveOutput {
  Slo: ServiceLevelObjective;
}
export const UpdateServiceLevelObjectiveOutput = S.suspend(() =>
  S.Struct({ Slo: ServiceLevelObjective }),
).annotate({
  identifier: "UpdateServiceLevelObjectiveOutput",
}) as any as S.Schema<UpdateServiceLevelObjectiveOutput>;
export interface DeleteServiceLevelObjectiveInput {
  Id: string;
}
export const DeleteServiceLevelObjectiveInput = S.suspend(() =>
  S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/slo/{Id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteServiceLevelObjectiveInput",
}) as any as S.Schema<DeleteServiceLevelObjectiveInput>;
export interface DeleteServiceLevelObjectiveOutput {}
export const DeleteServiceLevelObjectiveOutput = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteServiceLevelObjectiveOutput",
}) as any as S.Schema<DeleteServiceLevelObjectiveOutput>;
export type MetricSourceTypes = MetricSourceType[];
export const MetricSourceTypes = S.Array(MetricSourceType);
export interface ListServiceLevelObjectivesInput {
  KeyAttributes?: { [key: string]: string | undefined };
  OperationName?: string;
  DependencyConfig?: DependencyConfig;
  MaxResults?: number;
  NextToken?: string;
  IncludeLinkedAccounts?: boolean;
  SloOwnerAwsAccountId?: string;
  MetricSourceTypes?: MetricSourceType[];
}
export const ListServiceLevelObjectivesInput = S.suspend(() =>
  S.Struct({
    KeyAttributes: S.optional(Attributes),
    OperationName: S.optional(S.String).pipe(T.HttpQuery("OperationName")),
    DependencyConfig: S.optional(DependencyConfig),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    IncludeLinkedAccounts: S.optional(S.Boolean).pipe(
      T.HttpQuery("IncludeLinkedAccounts"),
    ),
    SloOwnerAwsAccountId: S.optional(S.String).pipe(
      T.HttpQuery("SloOwnerAwsAccountId"),
    ),
    MetricSourceTypes: S.optional(MetricSourceTypes),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/slos" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListServiceLevelObjectivesInput",
}) as any as S.Schema<ListServiceLevelObjectivesInput>;
export interface ServiceLevelObjectiveSummary {
  Arn: string;
  Name: string;
  KeyAttributes?: { [key: string]: string | undefined };
  OperationName?: string;
  DependencyConfig?: DependencyConfig;
  CreatedTime?: Date;
  EvaluationType?: EvaluationType;
  MetricSourceType?: MetricSourceType;
}
export const ServiceLevelObjectiveSummary = S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Name: S.String,
    KeyAttributes: S.optional(Attributes),
    OperationName: S.optional(S.String),
    DependencyConfig: S.optional(DependencyConfig),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EvaluationType: S.optional(EvaluationType),
    MetricSourceType: S.optional(MetricSourceType),
  }),
).annotate({
  identifier: "ServiceLevelObjectiveSummary",
}) as any as S.Schema<ServiceLevelObjectiveSummary>;
export type ServiceLevelObjectiveSummaries = ServiceLevelObjectiveSummary[];
export const ServiceLevelObjectiveSummaries = S.Array(
  ServiceLevelObjectiveSummary,
);
export interface ListServiceLevelObjectivesOutput {
  SloSummaries?: ServiceLevelObjectiveSummary[];
  NextToken?: string;
}
export const ListServiceLevelObjectivesOutput = S.suspend(() =>
  S.Struct({
    SloSummaries: S.optional(ServiceLevelObjectiveSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListServiceLevelObjectivesOutput",
}) as any as S.Schema<ListServiceLevelObjectivesOutput>;

//# Errors
export class ThrottlingException extends S.TaggedErrorClass<ThrottlingException>()(
  "ThrottlingException",
  { Message: S.String },
).pipe(C.withThrottlingError) {}
export class ValidationException extends S.TaggedErrorClass<ValidationException>()(
  "ValidationException",
  { message: S.optional(S.String) },
  T.AwsQueryError({ code: "ValidationError", httpResponseCode: 400 }),
).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { ResourceType: S.String, ResourceId: S.String, Message: S.String },
).pipe(C.withBadRequestError) {}
export class AccessDeniedException extends S.TaggedErrorClass<AccessDeniedException>()(
  "AccessDeniedException",
  { Message: S.optional(S.String) },
  T.AwsQueryError({ code: "AccessDenied", httpResponseCode: 403 }),
).pipe(C.withAuthError) {}
export class ServiceQuotaExceededException extends S.TaggedErrorClass<ServiceQuotaExceededException>()(
  "ServiceQuotaExceededException",
  { Message: S.String },
).pipe(C.withQuotaError) {}
export class ConflictException extends S.TaggedErrorClass<ConflictException>()(
  "ConflictException",
  { Message: S.String },
).pipe(C.withConflictError) {}

//# Operations
export type BatchGetServiceLevelObjectiveBudgetReportError =
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this operation to retrieve one or more *service level objective (SLO) budget reports*.
 *
 * An *error budget* is the amount of time or requests in an unhealthy state that your service can accumulate during an interval before your overall SLO budget health is breached and the SLO is considered to be unmet. For example, an SLO with a threshold of 99.95% and a monthly interval translates to an error budget of 21.9 minutes of downtime in a 30-day month.
 *
 * Budget reports include a health indicator, the attainment value, and remaining budget.
 *
 * For more information about SLO error budgets, see SLO concepts.
 */
export const batchGetServiceLevelObjectiveBudgetReport: API.OperationMethod<
  BatchGetServiceLevelObjectiveBudgetReportInput,
  BatchGetServiceLevelObjectiveBudgetReportOutput,
  BatchGetServiceLevelObjectiveBudgetReportError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchGetServiceLevelObjectiveBudgetReportInput,
  output: BatchGetServiceLevelObjectiveBudgetReportOutput,
  errors: [ThrottlingException, ValidationException],
}));
export type BatchUpdateExclusionWindowsError =
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Add or remove time window exclusions for one or more Service Level Objectives (SLOs).
 */
export const batchUpdateExclusionWindows: API.OperationMethod<
  BatchUpdateExclusionWindowsInput,
  BatchUpdateExclusionWindowsOutput,
  BatchUpdateExclusionWindowsError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchUpdateExclusionWindowsInput,
  output: BatchUpdateExclusionWindowsOutput,
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
}));
export type DeleteGroupingConfigurationError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the grouping configuration for this account. This removes all custom grouping attribute definitions that were previously configured.
 */
export const deleteGroupingConfiguration: API.OperationMethod<
  DeleteGroupingConfigurationRequest,
  DeleteGroupingConfigurationOutput,
  DeleteGroupingConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteGroupingConfigurationRequest,
  output: DeleteGroupingConfigurationOutput,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
}));
export type GetServiceError =
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a service discovered by Application Signals.
 */
export const getService: API.OperationMethod<
  GetServiceInput,
  GetServiceOutput,
  GetServiceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetServiceInput,
  output: GetServiceOutput,
  errors: [ThrottlingException, ValidationException],
}));
export type ListAuditFindingsError =
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of audit findings that provide automated analysis of service behavior and root cause analysis. These findings help identify the most significant observations about your services, including performance issues, anomalies, and potential problems. The findings are generated using heuristic algorithms based on established troubleshooting patterns.
 */
export const listAuditFindings: API.OperationMethod<
  ListAuditFindingsInput,
  ListAuditFindingsOutput,
  ListAuditFindingsError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListAuditFindingsInput,
  output: ListAuditFindingsOutput,
  errors: [ThrottlingException, ValidationException],
}));
export type ListEntityEventsError =
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of change events for a specific entity, such as deployments, configuration changes, or other state-changing activities. This operation helps track the history of changes that may have affected service performance.
 */
export const listEntityEvents: API.OperationMethod<
  ListEntityEventsInput,
  ListEntityEventsOutput,
  ListEntityEventsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListEntityEventsInput,
  ) => stream.Stream<
    ListEntityEventsOutput,
    ListEntityEventsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListEntityEventsInput,
  ) => stream.Stream<
    ChangeEvent,
    ListEntityEventsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListEntityEventsInput,
  output: ListEntityEventsOutput,
  errors: [ThrottlingException, ValidationException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ChangeEvents",
    pageSize: "MaxResults",
  } as const,
}));
export type ListGroupingAttributeDefinitionsError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the current grouping configuration for this account, including all custom grouping attribute definitions that have been configured. These definitions determine how services are logically grouped based on telemetry attributes, Amazon Web Services tags, or predefined mappings.
 */
export const listGroupingAttributeDefinitions: API.OperationMethod<
  ListGroupingAttributeDefinitionsInput,
  ListGroupingAttributeDefinitionsOutput,
  ListGroupingAttributeDefinitionsError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListGroupingAttributeDefinitionsInput,
  output: ListGroupingAttributeDefinitionsOutput,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
}));
export type ListServiceDependenciesError =
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of service dependencies of the service that you specify. A dependency is an infrastructure component that an operation of this service connects with. Dependencies can include Amazon Web Services services, Amazon Web Services resources, and third-party services.
 */
export const listServiceDependencies: API.OperationMethod<
  ListServiceDependenciesInput,
  ListServiceDependenciesOutput,
  ListServiceDependenciesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListServiceDependenciesInput,
  ) => stream.Stream<
    ListServiceDependenciesOutput,
    ListServiceDependenciesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListServiceDependenciesInput,
  ) => stream.Stream<
    ServiceDependency,
    ListServiceDependenciesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListServiceDependenciesInput,
  output: ListServiceDependenciesOutput,
  errors: [ThrottlingException, ValidationException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ServiceDependencies",
    pageSize: "MaxResults",
  } as const,
}));
export type ListServiceDependentsError =
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the list of dependents that invoked the specified service during the provided time range. Dependents include other services, CloudWatch Synthetics canaries, and clients that are instrumented with CloudWatch RUM app monitors.
 */
export const listServiceDependents: API.OperationMethod<
  ListServiceDependentsInput,
  ListServiceDependentsOutput,
  ListServiceDependentsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListServiceDependentsInput,
  ) => stream.Stream<
    ListServiceDependentsOutput,
    ListServiceDependentsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListServiceDependentsInput,
  ) => stream.Stream<
    ServiceDependent,
    ListServiceDependentsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListServiceDependentsInput,
  output: ListServiceDependentsOutput,
  errors: [ThrottlingException, ValidationException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ServiceDependents",
    pageSize: "MaxResults",
  } as const,
}));
export type ListServiceLevelObjectiveExclusionWindowsError =
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves all exclusion windows configured for a specific SLO.
 */
export const listServiceLevelObjectiveExclusionWindows: API.OperationMethod<
  ListServiceLevelObjectiveExclusionWindowsInput,
  ListServiceLevelObjectiveExclusionWindowsOutput,
  ListServiceLevelObjectiveExclusionWindowsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListServiceLevelObjectiveExclusionWindowsInput,
  ) => stream.Stream<
    ListServiceLevelObjectiveExclusionWindowsOutput,
    ListServiceLevelObjectiveExclusionWindowsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListServiceLevelObjectiveExclusionWindowsInput,
  ) => stream.Stream<
    ExclusionWindow,
    ListServiceLevelObjectiveExclusionWindowsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListServiceLevelObjectiveExclusionWindowsInput,
  output: ListServiceLevelObjectiveExclusionWindowsOutput,
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ExclusionWindows",
    pageSize: "MaxResults",
  } as const,
}));
export type ListServiceOperationsError =
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the *operations* of this service that have been discovered by Application Signals. Only the operations that were invoked during the specified time range are returned.
 */
export const listServiceOperations: API.OperationMethod<
  ListServiceOperationsInput,
  ListServiceOperationsOutput,
  ListServiceOperationsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListServiceOperationsInput,
  ) => stream.Stream<
    ListServiceOperationsOutput,
    ListServiceOperationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListServiceOperationsInput,
  ) => stream.Stream<
    ServiceOperation,
    ListServiceOperationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListServiceOperationsInput,
  output: ListServiceOperationsOutput,
  errors: [ThrottlingException, ValidationException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ServiceOperations",
    pageSize: "MaxResults",
  } as const,
}));
export type ListServicesError =
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of services that have been discovered by Application Signals. A service represents a minimum logical and transactional unit that completes a business function. Services are discovered through Application Signals instrumentation.
 */
export const listServices: API.OperationMethod<
  ListServicesInput,
  ListServicesOutput,
  ListServicesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListServicesInput,
  ) => stream.Stream<
    ListServicesOutput,
    ListServicesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListServicesInput,
  ) => stream.Stream<
    ServiceSummary,
    ListServicesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListServicesInput,
  output: ListServicesOutput,
  errors: [ThrottlingException, ValidationException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ServiceSummaries",
    pageSize: "MaxResults",
  } as const,
}));
export type ListServiceStatesError =
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the last deployment and other change states of services. This API provides visibility into recent changes that may have affected service performance, helping with troubleshooting and change correlation.
 */
export const listServiceStates: API.OperationMethod<
  ListServiceStatesInput,
  ListServiceStatesOutput,
  ListServiceStatesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListServiceStatesInput,
  ) => stream.Stream<
    ListServiceStatesOutput,
    ListServiceStatesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListServiceStatesInput,
  ) => stream.Stream<
    ServiceState,
    ListServiceStatesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListServiceStatesInput,
  output: ListServiceStatesOutput,
  errors: [ThrottlingException, ValidationException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ServiceStates",
    pageSize: "MaxResults",
  } as const,
}));
export type ListTagsForResourceError =
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Displays the tags associated with a CloudWatch resource. Tags can be assigned to service level objectives.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [ResourceNotFoundException, ThrottlingException],
}));
export type PutGroupingConfigurationError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates the grouping configuration for this account. This operation allows you to define custom grouping attributes that determine how services are logically grouped based on telemetry attributes, Amazon Web Services tags, or predefined mappings. These grouping attributes can then be used to organize and filter services in the Application Signals console and APIs.
 */
export const putGroupingConfiguration: API.OperationMethod<
  PutGroupingConfigurationInput,
  PutGroupingConfigurationOutput,
  PutGroupingConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutGroupingConfigurationInput,
  output: PutGroupingConfigurationOutput,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
}));
export type StartDiscoveryError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables this Amazon Web Services account to be able to use CloudWatch Application Signals by creating the *AWSServiceRoleForCloudWatchApplicationSignals* service-linked role. This service- linked role has the following permissions:
 *
 * - `xray:GetServiceGraph`
 *
 * - `logs:StartQuery`
 *
 * - `logs:GetQueryResults`
 *
 * - `cloudwatch:GetMetricData`
 *
 * - `cloudwatch:ListMetrics`
 *
 * - `tag:GetResources`
 *
 * - `autoscaling:DescribeAutoScalingGroups`
 *
 * A service-linked CloudTrail event channel is created to process CloudTrail events and return change event information. This includes last deployment time, userName, eventName, and other event metadata.
 *
 * After completing this step, you still need to instrument your Java and Python applications to send data to Application Signals. For more information, see Enabling Application Signals.
 */
export const startDiscovery: API.OperationMethod<
  StartDiscoveryInput,
  StartDiscoveryOutput,
  StartDiscoveryError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartDiscoveryInput,
  output: StartDiscoveryOutput,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
}));
export type TagResourceError =
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Assigns one or more tags (key-value pairs) to the specified CloudWatch resource, such as a service level objective.
 *
 * Tags can help you organize and categorize your resources. You can also use them to scope user permissions by granting a user permission to access or change only resources with certain tag values.
 *
 * Tags don't have any semantic meaning to Amazon Web Services and are interpreted strictly as strings of characters.
 *
 * You can use the `TagResource` action with an alarm that already has tags. If you specify a new tag key for the alarm, this tag is appended to the list of tags associated with the alarm. If you specify a tag key that is already associated with the alarm, the new tag value that you specify replaces the previous value for that tag.
 *
 * You can associate as many as 50 tags with a CloudWatch resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
}));
export type UntagResourceError =
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes one or more tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [ResourceNotFoundException, ThrottlingException],
}));
export type CreateServiceLevelObjectiveError =
  | AccessDeniedException
  | ConflictException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a service level objective (SLO), which can help you ensure that your critical business operations are meeting customer expectations. Use SLOs to set and track specific target levels for the reliability and availability of your applications and services. SLOs use service level indicators (SLIs) to calculate whether the application is performing at the level that you want.
 *
 * Create an SLO to set a target for a service or operation’s availability or latency. CloudWatch measures this target frequently you can find whether it has been breached.
 *
 * The target performance quality that is defined for an SLO is the *attainment goal*.
 *
 * You can set SLO targets for your applications that are discovered by Application Signals, using critical metrics such as latency and availability. You can also set SLOs against any CloudWatch metric or math expression that produces a time series.
 *
 * You can't create an SLO for a service operation that was discovered by Application Signals until after that operation has reported standard metrics to Application Signals.
 *
 * When you create an SLO, you specify whether it is a *period-based SLO* or a *request-based SLO*. Each type of SLO has a different way of evaluating your application's performance against its attainment goal.
 *
 * - A *period-based SLO* uses defined *periods* of time within a specified total time interval. For each period of time, Application Signals determines whether the application met its goal. The attainment rate is calculated as the `number of good periods/number of total periods`.
 *
 * For example, for a period-based SLO, meeting an attainment goal of 99.9% means that within your interval, your application must meet its performance goal during at least 99.9% of the time periods.
 *
 * - A *request-based SLO* doesn't use pre-defined periods of time. Instead, the SLO measures `number of good requests/number of total requests` during the interval. At any time, you can find the ratio of good requests to total requests for the interval up to the time stamp that you specify, and measure that ratio against the goal set in your SLO.
 *
 * After you have created an SLO, you can retrieve error budget reports for it. An *error budget* is the amount of time or amount of requests that your application can be non-compliant with the SLO's goal, and still have your application meet the goal.
 *
 * - For a period-based SLO, the error budget starts at a number defined by the highest number of periods that can fail to meet the threshold, while still meeting the overall goal. The *remaining error budget* decreases with every failed period that is recorded. The error budget within one interval can never increase.
 *
 * For example, an SLO with a threshold that 99.95% of requests must be completed under 2000ms every month translates to an error budget of 21.9 minutes of downtime per month.
 *
 * - For a request-based SLO, the remaining error budget is dynamic and can increase or decrease, depending on the ratio of good requests to total requests.
 *
 * For more information about SLOs, see Service level objectives (SLOs).
 *
 * When you perform a `CreateServiceLevelObjective` operation, Application Signals creates the *AWSServiceRoleForCloudWatchApplicationSignals* service-linked role, if it doesn't already exist in your account. This service- linked role has the following permissions:
 *
 * - `xray:GetServiceGraph`
 *
 * - `logs:StartQuery`
 *
 * - `logs:GetQueryResults`
 *
 * - `cloudwatch:GetMetricData`
 *
 * - `cloudwatch:ListMetrics`
 *
 * - `tag:GetResources`
 *
 * - `autoscaling:DescribeAutoScalingGroups`
 */
export const createServiceLevelObjective: API.OperationMethod<
  CreateServiceLevelObjectiveInput,
  CreateServiceLevelObjectiveOutput,
  CreateServiceLevelObjectiveError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateServiceLevelObjectiveInput,
  output: CreateServiceLevelObjectiveOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type GetServiceLevelObjectiveError =
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about one SLO created in the account.
 */
export const getServiceLevelObjective: API.OperationMethod<
  GetServiceLevelObjectiveInput,
  GetServiceLevelObjectiveOutput,
  GetServiceLevelObjectiveError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetServiceLevelObjectiveInput,
  output: GetServiceLevelObjectiveOutput,
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
}));
export type UpdateServiceLevelObjectiveError =
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing service level objective (SLO). If you omit parameters, the previous values of those parameters are retained.
 *
 * You cannot change from a period-based SLO to a request-based SLO, or change from a request-based SLO to a period-based SLO.
 */
export const updateServiceLevelObjective: API.OperationMethod<
  UpdateServiceLevelObjectiveInput,
  UpdateServiceLevelObjectiveOutput,
  UpdateServiceLevelObjectiveError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateServiceLevelObjectiveInput,
  output: UpdateServiceLevelObjectiveOutput,
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
}));
export type DeleteServiceLevelObjectiveError =
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified service level objective.
 */
export const deleteServiceLevelObjective: API.OperationMethod<
  DeleteServiceLevelObjectiveInput,
  DeleteServiceLevelObjectiveOutput,
  DeleteServiceLevelObjectiveError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteServiceLevelObjectiveInput,
  output: DeleteServiceLevelObjectiveOutput,
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
}));
export type ListServiceLevelObjectivesError =
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of SLOs created in this account.
 */
export const listServiceLevelObjectives: API.OperationMethod<
  ListServiceLevelObjectivesInput,
  ListServiceLevelObjectivesOutput,
  ListServiceLevelObjectivesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListServiceLevelObjectivesInput,
  ) => stream.Stream<
    ListServiceLevelObjectivesOutput,
    ListServiceLevelObjectivesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListServiceLevelObjectivesInput,
  ) => stream.Stream<
    ServiceLevelObjectiveSummary,
    ListServiceLevelObjectivesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListServiceLevelObjectivesInput,
  output: ListServiceLevelObjectivesOutput,
  errors: [ThrottlingException, ValidationException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SloSummaries",
    pageSize: "MaxResults",
  } as const,
}));
