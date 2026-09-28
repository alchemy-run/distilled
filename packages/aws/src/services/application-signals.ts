import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { restJson1Protocol } from "../protocols/rest-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Application Signals",
  target: "ApplicationSignals",
  version: "2024-04-15",
  sigv4: "application-signals",
  protocol: restJson1Protocol,
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
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    code: "AccessDenied",
    status: 403,
  })<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly ResourceType: string;
    readonly ResourceId: string;
    readonly message: string;
  }> {}
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
    { code: "ValidationError", status: 400 },
  )<{ readonly message?: string }> {}
export type InstrumentationType = "BREAKPOINT" | "PROBE" | (string & {});
export interface BatchDeleteScope {
  Service: string;
  Environment: string;
  InstrumentationType: InstrumentationType;
}
export type BatchDeleteResourceArnList = string[];
export interface BatchDeleteByResourceArns {
  ResourceArns: string[];
  InstrumentationType: InstrumentationType;
}
export type BatchDeleteDeletionTarget =
  | { Scope: BatchDeleteScope; ResourceArns?: never }
  | { Scope?: never; ResourceArns: BatchDeleteByResourceArns };
export interface BatchDeleteInstrumentationConfigurationsRequest {
  DeletionTarget: BatchDeleteDeletionTarget;
}
export interface BatchDeleteSuccessfulDeletion {
  ResourceArn?: string;
  SignalType?: string;
  LocationHash?: string;
}
export type BatchDeleteSuccessfulDeletionList = BatchDeleteSuccessfulDeletion[];
export type BatchDeleteErrorCode =
  | "ResourceNotFoundException"
  | "AccessDeniedException"
  | "InternalServiceException"
  | (string & {});
export interface BatchDeleteError {
  ResourceArn: string;
  Code: BatchDeleteErrorCode;
  Message: string;
}
export type BatchDeleteErrorList = BatchDeleteError[];
export interface BatchDeleteInstrumentationConfigurationsResponse {
  DeletedCount: number;
  SuccessfulDeletions: BatchDeleteSuccessfulDeletion[];
  Errors: BatchDeleteError[];
}
export type ServiceLevelObjectiveIds = string[];
export interface BatchGetServiceLevelObjectiveBudgetReportInput {
  Timestamp: Date;
  SloIds: string[];
}
export type ServiceLevelObjectiveArn = string;
export type ServiceLevelObjectiveName = string;
export type EvaluationType = "PeriodBased" | "RequestBased" | (string & {});
export type ServiceLevelObjectiveBudgetStatus =
  | "OK"
  | "WARNING"
  | "BREACHED"
  | "INSUFFICIENT_DATA"
  | (string & {});
export type Attainment = number;
export type TotalBudgetSeconds = number;
export type BudgetSecondsRemaining = number;
export type TotalBudgetRequests = number;
export type BudgetRequestsRemaining = number;
export type KeyAttributeName = string;
export type KeyAttributeValue = string;
export type Attributes = { [key: string]: string | undefined };
export type OperationName = string;
export type ServiceLevelIndicatorMetricType =
  | "LATENCY"
  | "AVAILABILITY"
  | (string & {});
export type MetricId = string;
export type Namespace = string;
export type MetricName = string;
export type DimensionName = string;
export type DimensionValue = string;
export interface Dimension {
  Name: string;
  Value: string;
}
export type Dimensions = Dimension[];
export interface Metric {
  Namespace?: string;
  MetricName?: string;
  Dimensions?: Dimension[];
}
export type Period = number;
export type Stat = string;
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
export interface MetricStat {
  Metric: Metric;
  Period: number;
  Stat: string;
  Unit?: StandardUnit;
}
export type MetricExpression = string;
export type MetricLabel = string;
export type ReturnData = boolean;
export type AccountId = string;
export interface MetricDataQuery {
  Id: string;
  MetricStat?: MetricStat;
  Expression?: string;
  Label?: string;
  ReturnData?: boolean;
  Period?: number;
  AccountId?: string;
}
export type MetricDataQueries = MetricDataQuery[];
export interface DependencyConfig {
  DependencyKeyAttributes: { [key: string]: string | undefined };
  DependencyOperationName: string;
}
export interface MetricSource {
  MetricSourceKeyAttributes: { [key: string]: string | undefined };
  MetricSourceAttributes?: { [key: string]: string | undefined };
}
export type SelectionType = "EXPLICIT" | "PREFIX" | "REGEX" | (string & {});
export type SelectionPattern = string;
export interface SelectionConfig {
  Type: SelectionType;
  Pattern?: string;
}
export type CompositeSliComponent = { OperationName: string };
export type CompositeSliComponents = CompositeSliComponent[];
export interface CompositeSliConfig {
  SelectionConfig: SelectionConfig;
  Components?: CompositeSliComponent[];
}
export interface ServiceLevelIndicatorMetric {
  KeyAttributes?: { [key: string]: string | undefined };
  OperationName?: string;
  MetricType?: ServiceLevelIndicatorMetricType;
  MetricDataQueries: MetricDataQuery[];
  DependencyConfig?: DependencyConfig;
  MetricSource?: MetricSource;
  CompositeSliConfig?: CompositeSliConfig;
}
export type ServiceLevelIndicatorMetricThreshold = number;
export type ServiceLevelIndicatorComparisonOperator =
  | "GreaterThanOrEqualTo"
  | "GreaterThan"
  | "LessThan"
  | "LessThanOrEqualTo"
  | (string & {});
export interface ServiceLevelIndicator {
  SliMetric: ServiceLevelIndicatorMetric;
  MetricThreshold: number;
  ComparisonOperator: ServiceLevelIndicatorComparisonOperator;
}
export type MonitoredRequestCountMetricDataQueries =
  | { GoodCountMetric: MetricDataQuery[]; BadCountMetric?: never }
  | { GoodCountMetric?: never; BadCountMetric: MetricDataQuery[] };
export interface RequestBasedServiceLevelIndicatorMetric {
  KeyAttributes?: { [key: string]: string | undefined };
  OperationName?: string;
  MetricType?: ServiceLevelIndicatorMetricType;
  TotalRequestCountMetric: MetricDataQuery[];
  MonitoredRequestCountMetric: MonitoredRequestCountMetricDataQueries;
  DependencyConfig?: DependencyConfig;
  MetricSource?: MetricSource;
  CompositeSliConfig?: CompositeSliConfig;
}
export interface RequestBasedServiceLevelIndicator {
  RequestBasedSliMetric: RequestBasedServiceLevelIndicatorMetric;
  MetricThreshold?: number;
  ComparisonOperator?: ServiceLevelIndicatorComparisonOperator;
}
export type DurationUnit = "MINUTE" | "HOUR" | "DAY" | "MONTH" | (string & {});
export type RollingIntervalDuration = number;
export interface RollingInterval {
  DurationUnit: DurationUnit;
  Duration: number;
}
export type CalendarIntervalDuration = number;
export interface CalendarInterval {
  StartTime: Date;
  DurationUnit: DurationUnit;
  Duration: number;
}
export type Interval =
  | { RollingInterval: RollingInterval; CalendarInterval?: never }
  | { RollingInterval?: never; CalendarInterval: CalendarInterval };
export type AttainmentGoal = number;
export type WarningThreshold = number;
export interface Goal {
  Interval?: Interval;
  AttainmentGoal?: number;
  WarningThreshold?: number;
}
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
export type ServiceLevelObjectiveBudgetReports =
  ServiceLevelObjectiveBudgetReport[];
export type ServiceLevelObjectiveBudgetReportErrorCode = string;
export type ServiceLevelObjectiveBudgetReportErrorMessage = string;
export interface ServiceLevelObjectiveBudgetReportError {
  Name?: string;
  Arn: string;
  ErrorCode: string;
  ErrorMessage: string;
}
export type ServiceLevelObjectiveBudgetReportErrors =
  ServiceLevelObjectiveBudgetReportError[];
export interface BatchGetServiceLevelObjectiveBudgetReportOutput {
  Timestamp: Date;
  Reports: ServiceLevelObjectiveBudgetReport[];
  Errors: ServiceLevelObjectiveBudgetReportError[];
}
export type ExclusionDuration = number;
export interface Window {
  DurationUnit: DurationUnit;
  Duration: number;
}
export type Expression = string;
export interface RecurrenceRule {
  Expression?: string;
}
export type ExclusionReason = string;
export interface ExclusionWindow {
  Window: Window;
  StartTime?: Date;
  RecurrenceRule?: RecurrenceRule;
  Reason?: string;
}
export type ExclusionWindows = ExclusionWindow[];
export interface BatchUpdateExclusionWindowsInput {
  SloIds: string[];
  AddExclusionWindows?: ExclusionWindow[];
  RemoveExclusionWindows?: ExclusionWindow[];
}
export type ServiceLevelObjectiveId = string;
export type ExclusionWindowErrorCode = string;
export type ExclusionWindowErrorMessage = string;
export interface BatchUpdateExclusionWindowsError_ {
  SloId: string;
  ErrorCode: string;
  ErrorMessage: string;
}
export type BatchUpdateExclusionWindowsErrors =
  BatchUpdateExclusionWindowsError_[];
export interface BatchUpdateExclusionWindowsOutput {
  SloIds: string[];
  Errors: BatchUpdateExclusionWindowsError_[];
}
export type DynamicInstrumentationSignalType = "SNAPSHOT" | (string & {});
export type ProgrammingLanguage =
  | "Java"
  | "Python"
  | "Javascript"
  | (string & {});
export interface CodeLocation {
  Language: ProgrammingLanguage;
  CodeUnit?: string;
  ClassName?: string;
  MethodName?: string;
  FilePath: string;
  LineNumber?: number;
}
export type Location = { CodeLocation: CodeLocation };
export type DynamicInstrumentationAttributeFilterGroup = {
  [key: string]: string | undefined;
};
export type DynamicInstrumentationAttributeFilters = {
  [key: string]: string | undefined;
}[];
export type StringList = string[];
export interface CaptureLimitsConfig {
  MaxHits?: number;
  MaxStringLength?: number;
  MaxCollectionWidth?: number;
  MaxCollectionDepth?: number;
  MaxStackFrames?: number;
  MaxStackTraceSize?: number;
  MaxObjectDepth?: number;
  MaxFieldsPerObject?: number;
}
export interface CodeCaptureConfiguration {
  CaptureArguments?: string[];
  CaptureReturn?: boolean;
  CaptureStackTrace?: boolean;
  CaptureLocals?: string[];
  CaptureLimits: CaptureLimitsConfig;
}
export type CaptureConfiguration = { CodeCapture: CodeCaptureConfiguration };
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface CreateInstrumentationConfigurationRequest {
  InstrumentationType: InstrumentationType;
  Service: string;
  Environment: string;
  SignalType: DynamicInstrumentationSignalType;
  Location: Location;
  Description?: string;
  ExpiresAt?: Date;
  AttributeFilters?: { [key: string]: string | undefined }[];
  CaptureConfiguration: CaptureConfiguration;
  Tags?: Tag[];
}
export type InstrumentationConfigurationArn = string;
export interface CreateInstrumentationConfigurationResponse {
  InstrumentationType: InstrumentationType;
  Service: string;
  Environment: string;
  SignalType: DynamicInstrumentationSignalType;
  Location: Location;
  LocationHash: string;
  Description?: string;
  ExpiresAt?: Date;
  AttributeFilters?: { [key: string]: string | undefined }[];
  CaptureConfiguration: CaptureConfiguration;
  CreatedAt: Date;
  ARN: string;
}
export type ServiceLevelObjectiveDescription = string;
export type ServiceLevelIndicatorStatistic = string;
export type SLIPeriodSeconds = number;
export interface ServiceLevelIndicatorMetricConfig {
  KeyAttributes?: { [key: string]: string | undefined };
  OperationName?: string;
  MetricType?: ServiceLevelIndicatorMetricType;
  MetricName?: string;
  Statistic?: string;
  PeriodSeconds?: number;
  MetricSource?: MetricSource;
  MetricDataQueries?: MetricDataQuery[];
  DependencyConfig?: DependencyConfig;
  CompositeSliConfig?: CompositeSliConfig;
}
export interface ServiceLevelIndicatorConfig {
  SliMetricConfig: ServiceLevelIndicatorMetricConfig;
  MetricThreshold?: number;
  ComparisonOperator?: ServiceLevelIndicatorComparisonOperator;
}
export interface RequestBasedServiceLevelIndicatorMetricConfig {
  KeyAttributes?: { [key: string]: string | undefined };
  OperationName?: string;
  MetricType?: ServiceLevelIndicatorMetricType;
  TotalRequestCountMetric?: MetricDataQuery[];
  MonitoredRequestCountMetric?: MonitoredRequestCountMetricDataQueries;
  DependencyConfig?: DependencyConfig;
  MetricSource?: MetricSource;
  MetricName?: string;
  CompositeSliConfig?: CompositeSliConfig;
}
export interface RequestBasedServiceLevelIndicatorConfig {
  RequestBasedSliMetricConfig: RequestBasedServiceLevelIndicatorMetricConfig;
  MetricThreshold?: number;
  ComparisonOperator?: ServiceLevelIndicatorComparisonOperator;
}
export type BurnRateLookBackWindowMinutes = number;
export interface BurnRateConfiguration {
  LookBackWindowMinutes: number;
}
export type BurnRateConfigurations = BurnRateConfiguration[];
export interface CreateServiceLevelObjectiveInput {
  Name: string;
  Description?: string;
  SliConfig?: ServiceLevelIndicatorConfig;
  RequestBasedSliConfig?: RequestBasedServiceLevelIndicatorConfig;
  Goal?: Goal;
  Tags?: Tag[];
  BurnRateConfigurations?: BurnRateConfiguration[];
  CreateRecommendedSlo?: boolean;
  AutoInvestigationEnabled?: boolean;
}
export type MetricSourceType =
  | "ServiceOperation"
  | "CloudWatchMetric"
  | "ServiceDependency"
  | "AppMonitor"
  | "Canary"
  | "Service"
  | (string & {});
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
  AutoInvestigationEnabled?: boolean;
}
export interface CreateServiceLevelObjectiveOutput {
  Slo: ServiceLevelObjective;
}
export interface DeleteGroupingConfigurationRequest {}
export interface DeleteGroupingConfigurationOutput {}
export type LocationIdentifier =
  | { CodeLocation: CodeLocation; LocationHash?: never }
  | { CodeLocation?: never; LocationHash: string };
export interface DeleteInstrumentationConfigurationRequest {
  InstrumentationType: InstrumentationType;
  Service: string;
  Environment: string;
  SignalType: DynamicInstrumentationSignalType;
  LocationIdentifier: LocationIdentifier;
}
export type DynamicInstrumentationDeletionStatus = "DELETED" | (string & {});
export interface DeleteInstrumentationConfigurationResponse {
  DeletionStatus: DynamicInstrumentationDeletionStatus;
}
export interface DeleteServiceLevelObjectiveInput {
  Id: string;
}
export interface DeleteServiceLevelObjectiveOutput {}
export interface GetInstrumentationConfigurationRequest {
  InstrumentationType: InstrumentationType;
  Service: string;
  Environment: string;
  SignalType: DynamicInstrumentationSignalType;
  LocationIdentifier: LocationIdentifier;
}
export interface InstrumentationConfiguration {
  InstrumentationType: InstrumentationType;
  Service: string;
  Environment: string;
  SignalType: DynamicInstrumentationSignalType;
  Location: Location;
  LocationHash: string;
  Description?: string;
  ExpiresAt?: Date;
  AttributeFilters?: { [key: string]: string | undefined }[];
  CaptureConfiguration: CaptureConfiguration;
  CreatedAt: Date;
  ARN: string;
}
export interface GetInstrumentationConfigurationResponse {
  Configuration: InstrumentationConfiguration;
}
export type InstrumentationConfigurationStatus =
  | "READY"
  | "ERROR"
  | "ACTIVE"
  | "DISABLED"
  | (string & {});
export type NextToken = string;
export interface GetInstrumentationConfigurationStatusRequest {
  InstrumentationType: InstrumentationType;
  Service: string;
  Environment: string;
  SignalType: DynamicInstrumentationSignalType;
  LocationIdentifier: LocationIdentifier;
  Status?: InstrumentationConfigurationStatus;
  StartTime?: Date;
  EndTime?: Date;
  MaxResults?: number;
  NextToken?: string;
}
export type InstrumentationErrorCause =
  | "FILE_NOT_FOUND"
  | "METHOD_NOT_FOUND"
  | "LINE_NOT_EXECUTABLE"
  | "OVERLOADED_METHODS"
  | "LANGUAGE_MISMATCH"
  | "RUNTIME_ERROR"
  | (string & {});
export interface InstrumentationStatusEvent {
  Time: Date;
  ErrorCause?: InstrumentationErrorCause;
}
export type InstrumentationStatusEventList = InstrumentationStatusEvent[];
export interface GetInstrumentationConfigurationStatusResponse {
  Service: string;
  Environment: string;
  SignalType: DynamicInstrumentationSignalType;
  Location: Location;
  Status: InstrumentationConfigurationStatus;
  Events: InstrumentationStatusEvent[];
  NextToken?: string;
}
export interface GetServiceInput {
  StartTime: Date;
  EndTime: Date;
  KeyAttributes: { [key: string]: string | undefined };
}
export type AttributeMap = { [key: string]: string | undefined };
export type AttributeMaps = { [key: string]: string | undefined }[];
export type GroupName = string;
export type GroupValue = string;
export type GroupSource = string;
export type GroupIdentifier = string;
export interface ServiceGroup {
  GroupName: string;
  GroupValue: string;
  GroupSource: string;
  GroupIdentifier: string;
}
export type ServiceGroups = ServiceGroup[];
export type MetricType = string;
export type AwsAccountId = string;
export interface MetricReference {
  Namespace: string;
  MetricType: string;
  Dimensions?: Dimension[];
  MetricName: string;
  AccountId?: string;
}
export type MetricReferences = MetricReference[];
export type LogGroupReferences = { [key: string]: string | undefined }[];
export interface Service {
  KeyAttributes?: { [key: string]: string | undefined };
  AttributeMaps?: { [key: string]: string | undefined }[];
  ServiceGroups?: ServiceGroup[];
  MetricReferences?: MetricReference[];
  LogGroupReferences?: { [key: string]: string | undefined }[];
}
export interface GetServiceOutput {
  Service: Service;
  StartTime: Date;
  EndTime: Date;
  LogGroupReferences?: { [key: string]: string | undefined }[];
}
export interface GetServiceLevelObjectiveInput {
  Id: string;
}
export interface GetServiceLevelObjectiveOutput {
  Slo: ServiceLevelObjective;
}
export type Auditors = string[];
export interface ServiceEntity {
  Type?: string;
  Name?: string;
  Environment?: string;
  AwsAccountId?: string;
}
export interface ServiceLevelObjectiveEntity {
  SloName?: string;
  SloArn?: string;
}
export interface ServiceOperationEntity {
  Service?: ServiceEntity;
  Operation?: string;
  MetricType?: string;
}
export interface CanaryEntity {
  CanaryName: string;
}
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
export interface AuditTarget {
  Type: string;
  Data: AuditTargetEntity;
}
export type AuditTargets = AuditTarget[];
export type DetailLevel = "BRIEF" | "DETAILED" | (string & {});
export type ListAuditFindingMaxResults = number;
export interface ListAuditFindingsInput {
  StartTime: Date;
  EndTime: Date;
  Auditors?: string[];
  AuditTargets: AuditTarget[];
  DetailLevel?: DetailLevel;
  NextToken?: string;
  MaxResults?: number;
}
export type DataMap = { [key: string]: string | undefined };
export type Severity =
  | "CRITICAL"
  | "HIGH"
  | "MEDIUM"
  | "LOW"
  | "NONE"
  | (string & {});
export interface AuditorResult {
  Auditor?: string;
  Description?: string;
  Data?: { [key: string]: string | undefined };
  Severity?: Severity;
}
export type AuditorResults = AuditorResult[];
export interface MetricGraph {
  MetricDataQueries?: MetricDataQuery[];
  StartTime?: Date;
  EndTime?: Date;
}
export interface Node {
  KeyAttributes: { [key: string]: string | undefined };
  Name: string;
  NodeId: string;
  Operation?: string;
  Type?: string;
  Duration?: number;
  Status?: string;
}
export type Nodes = Node[];
export type ConnectionType = "INDIRECT" | "DIRECT" | (string & {});
export interface Edge {
  SourceNodeId?: string;
  DestinationNodeId?: string;
  Duration?: number;
  ConnectionType?: ConnectionType;
}
export type Edges = Edge[];
export interface DependencyGraph {
  Nodes?: Node[];
  Edges?: Edge[];
}
export interface AuditFinding {
  KeyAttributes: { [key: string]: string | undefined };
  AuditorResults?: AuditorResult[];
  Operation?: string;
  MetricGraph?: MetricGraph;
  DependencyGraph?: DependencyGraph;
  Type?: string;
}
export type AuditFindings = AuditFinding[];
export interface ListAuditFindingsOutput {
  StartTime?: Date;
  EndTime?: Date;
  AuditFindings: AuditFinding[];
  NextToken?: string;
}
export type ListEntityEventsMaxResults = number;
export interface ListEntityEventsInput {
  Entity: { [key: string]: string | undefined };
  StartTime: Date;
  EndTime: Date;
  MaxResults?: number;
  NextToken?: string;
}
export type ChangeEventType = "DEPLOYMENT" | "CONFIGURATION" | (string & {});
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
export type ChangeEvents = ChangeEvent[];
export interface ListEntityEventsOutput {
  StartTime: Date;
  EndTime: Date;
  ChangeEvents: ChangeEvent[];
  NextToken?: string;
}
export interface ListGroupingAttributeDefinitionsInput {
  NextToken?: string;
  AwsAccountId?: string;
  IncludeLinkedAccounts?: boolean;
}
export type GroupingString = string;
export type GroupingSourceKeyStringList = string[];
export interface GroupingAttributeDefinition {
  GroupingName: string;
  GroupingSourceKeys?: string[];
  DefaultGroupingValue?: string;
}
export type GroupingAttributeDefinitions = GroupingAttributeDefinition[];
export interface ListGroupingAttributeDefinitionsOutput {
  GroupingAttributeDefinitions: GroupingAttributeDefinition[];
  UpdatedAt?: Date;
  NextToken?: string;
}
export interface ListInstrumentationConfigurationsRequest {
  Service: string;
  Environment: string;
  InstrumentationType: InstrumentationType;
  SyncedAt?: Date;
  MaxResults?: number;
  NextToken?: string;
}
export interface InstrumentationConfigurationWithoutServiceEnv {
  InstrumentationType: InstrumentationType;
  SignalType: DynamicInstrumentationSignalType;
  Location: Location;
  LocationHash: string;
  Description?: string;
  ExpiresAt?: Date;
  AttributeFilters?: { [key: string]: string | undefined }[];
  CaptureConfiguration: CaptureConfiguration;
  CreatedAt: Date;
  ARN: string;
}
export type InstrumentationConfigurationsWithoutServiceEnv =
  InstrumentationConfigurationWithoutServiceEnv[];
export interface InstrumentationConfigurationsPage {
  Service: string;
  Environment: string;
  Changed: boolean;
  LatestConfigurations?: InstrumentationConfigurationWithoutServiceEnv[];
  SyncedAt: Date;
  SyncInterval: number;
  NextToken?: string;
}
export type ListServiceDependenciesMaxResults = number;
export interface ListServiceDependenciesInput {
  StartTime: Date;
  EndTime: Date;
  KeyAttributes: { [key: string]: string | undefined };
  MaxResults?: number;
  NextToken?: string;
}
export interface ServiceDependency {
  OperationName: string;
  DependencyKeyAttributes: { [key: string]: string | undefined };
  DependencyOperationName: string;
  MetricReferences: MetricReference[];
}
export type ServiceDependencies = ServiceDependency[];
export interface ListServiceDependenciesOutput {
  StartTime: Date;
  EndTime: Date;
  ServiceDependencies: ServiceDependency[];
  NextToken?: string;
}
export type ListServiceDependentsMaxResults = number;
export interface ListServiceDependentsInput {
  StartTime: Date;
  EndTime: Date;
  KeyAttributes: { [key: string]: string | undefined };
  MaxResults?: number;
  NextToken?: string;
}
export interface ServiceDependent {
  OperationName?: string;
  DependentKeyAttributes: { [key: string]: string | undefined };
  DependentOperationName?: string;
  MetricReferences: MetricReference[];
}
export type ServiceDependents = ServiceDependent[];
export interface ListServiceDependentsOutput {
  StartTime: Date;
  EndTime: Date;
  ServiceDependents: ServiceDependent[];
  NextToken?: string;
}
export type ListServiceLevelObjectiveExclusionWindowsMaxResults = number;
export interface ListServiceLevelObjectiveExclusionWindowsInput {
  Id: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface ListServiceLevelObjectiveExclusionWindowsOutput {
  ExclusionWindows: ExclusionWindow[];
  NextToken?: string;
}
export type ListServiceLevelObjectivesMaxResults = number;
export type MetricSourceTypes = MetricSourceType[];
export interface ListServiceLevelObjectivesInput {
  KeyAttributes?: { [key: string]: string | undefined };
  OperationName?: string;
  DependencyConfig?: DependencyConfig;
  MaxResults?: number;
  NextToken?: string;
  MetricSourceTypes?: MetricSourceType[];
  IncludeLinkedAccounts?: boolean;
  SloOwnerAwsAccountId?: string;
  MetricSource?: MetricSource;
}
export interface ServiceLevelObjectiveSummary {
  Arn: string;
  Name: string;
  KeyAttributes?: { [key: string]: string | undefined };
  OperationName?: string;
  DependencyConfig?: DependencyConfig;
  CreatedTime?: Date;
  EvaluationType?: EvaluationType;
  MetricSourceType?: MetricSourceType;
  MetricSource?: MetricSource;
  CompositeSliConfig?: CompositeSliConfig;
}
export type ServiceLevelObjectiveSummaries = ServiceLevelObjectiveSummary[];
export interface ListServiceLevelObjectivesOutput {
  SloSummaries?: ServiceLevelObjectiveSummary[];
  NextToken?: string;
}
export type ListServiceOperationMaxResults = number;
export interface ListServiceOperationsInput {
  StartTime: Date;
  EndTime: Date;
  KeyAttributes: { [key: string]: string | undefined };
  MaxResults?: number;
  NextToken?: string;
}
export interface ServiceOperation {
  Name: string;
  MetricReferences: MetricReference[];
}
export type ServiceOperations = ServiceOperation[];
export interface ListServiceOperationsOutput {
  StartTime: Date;
  EndTime: Date;
  ServiceOperations: ServiceOperation[];
  NextToken?: string;
}
export type ListServicesMaxResults = number;
export interface ListServicesInput {
  StartTime: Date;
  EndTime: Date;
  MaxResults?: number;
  NextToken?: string;
  IncludeLinkedAccounts?: boolean;
  AwsAccountId?: string;
}
export interface ServiceSummary {
  KeyAttributes: { [key: string]: string | undefined };
  AttributeMaps?: { [key: string]: string | undefined }[];
  MetricReferences: MetricReference[];
  ServiceGroups?: ServiceGroup[];
}
export type ServiceSummaries = ServiceSummary[];
export interface ListServicesOutput {
  StartTime: Date;
  EndTime: Date;
  ServiceSummaries: ServiceSummary[];
  NextToken?: string;
}
export type ListServiceStatesMaxResults = number;
export type AttributeFilterName = string;
export type AttributeFilterValue = string;
export type AttributeFilterValues = string[];
export interface AttributeFilter {
  AttributeFilterName: string;
  AttributeFilterValues: string[];
}
export type AttributeFilters = AttributeFilter[];
export interface ListServiceStatesInput {
  StartTime: Date;
  EndTime: Date;
  MaxResults?: number;
  NextToken?: string;
  IncludeLinkedAccounts?: boolean;
  AwsAccountId?: string;
  AttributeFilters?: AttributeFilter[];
}
export type LatestChangeEvents = ChangeEvent[];
export interface ServiceState {
  AttributeFilters?: AttributeFilter[];
  Service: { [key: string]: string | undefined };
  LatestChangeEvents: ChangeEvent[];
}
export type ServiceStates = ServiceState[];
export interface ListServiceStatesOutput {
  StartTime: Date;
  EndTime: Date;
  ServiceStates: ServiceState[];
  NextToken?: string;
}
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export interface PutGroupingConfigurationInput {
  GroupingAttributeDefinitions: GroupingAttributeDefinition[];
}
export interface GroupingConfiguration {
  GroupingAttributeDefinitions: GroupingAttributeDefinition[];
  UpdatedAt: Date;
}
export interface PutGroupingConfigurationOutput {
  GroupingConfiguration: GroupingConfiguration;
}
export interface InstrumentationConfigurationStatusReport {
  InstrumentationType: InstrumentationType;
  SignalType: DynamicInstrumentationSignalType;
  LocationHash: string;
  Status: InstrumentationConfigurationStatus;
  Time: Date;
  ErrorCause?: InstrumentationErrorCause;
}
export type InstrumentationConfigurationStatusList =
  InstrumentationConfigurationStatusReport[];
export interface ReportInstrumentationConfigurationStatusRequest {
  Service: string;
  Environment: string;
  Configurations: InstrumentationConfigurationStatusReport[];
}
export type UnprocessedStatusEventFailureReason =
  | "THROTTLED"
  | "INTERNAL_ERROR"
  | "VALIDATION_ERROR"
  | (string & {});
export interface UnprocessedStatusEvent {
  InstrumentationType: InstrumentationType;
  SignalType: DynamicInstrumentationSignalType;
  LocationHash: string;
  Status: InstrumentationConfigurationStatus;
  Time: Date;
  FailedReason: UnprocessedStatusEventFailureReason;
}
export type UnprocessedStatusEventList = UnprocessedStatusEvent[];
export interface ReportInstrumentationConfigurationStatusResponse {
  Service: string;
  Environment: string;
  UnprocessedStatusEvents: UnprocessedStatusEvent[];
}
export interface StartDiscoveryInput {}
export interface StartDiscoveryOutput {}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateServiceLevelObjectiveInput {
  Id: string;
  Description?: string;
  SliConfig?: ServiceLevelIndicatorConfig;
  RequestBasedSliConfig?: RequestBasedServiceLevelIndicatorConfig;
  Goal?: Goal;
  BurnRateConfigurations?: BurnRateConfiguration[];
  AutoInvestigationEnabled?: boolean;
}
export interface UpdateServiceLevelObjectiveOutput {
  Slo: ServiceLevelObjective;
}
export type ValidationExceptionMessage = string;
export type ResourceType = string;
export type ResourceId = string;
export type FaultDescription = string;
export type ServiceErrorMessage = string;
export type BatchDeleteInstrumentationConfigurationsError =
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes multiple instrumentation configurations in a single request.
 * Supports two mutually exclusive selection methods:
 * - By scope: Delete all configurations matching a Service + Environment + InstrumentationType
 * - By ARN list: Delete specific configurations by providing a list of resource ARNs
 */
export const batchDeleteInstrumentationConfigurations: API.OperationMethod<
  BatchDeleteInstrumentationConfigurationsRequest,
  BatchDeleteInstrumentationConfigurationsResponse,
  BatchDeleteInstrumentationConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /batch-delete-instrumentation-configurations",
    input: {
      DeletionTarget: {
        Scope: { Service: 0, Environment: 0, InstrumentationType: 0 },
        ResourceArns: { ResourceArns: 0, InstrumentationType: 0 },
      },
    },
    body: true,
  },
  errors: [ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteInstrumentationConfigurations",
})) as any;

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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /budget-report",
    input: { Timestamp: 0, SloIds: 0 },
    output: { Timestamp: D.ts, Reports: D.list({ Goal: o_Goal }) },
    body: true,
  },
  errors: [ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetServiceLevelObjectiveBudgetReport",
})) as any;

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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /exclusion-windows",
    input: {
      SloIds: 0,
      AddExclusionWindows: D.list(i_ExclusionWindow),
      RemoveExclusionWindows: D.list(i_ExclusionWindow),
    },
    body: true,
  },
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateExclusionWindows",
})) as any;

export type CreateInstrumentationConfigurationError =
  | ConflictException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a dynamic instrumentation configuration for a specific code or endpoint location within a service and environment. Configurations are immutable after creation.
 *
 * For `BREAKPOINT` type configurations, they expire after 24 hours unless a shorter expiration is provided. For `PROBE` type configurations, they persist until explicitly deleted; an expiration cannot be set for `PROBE` configurations.
 *
 * If a configuration already exists for the same service, environment, signal type, and location, this operation returns a conflict instead of overwriting it. Use attribute filters and capture settings to control where the instrumentation runs and which data is collected.
 */
export const createInstrumentationConfiguration: API.OperationMethod<
  CreateInstrumentationConfigurationRequest,
  CreateInstrumentationConfigurationResponse,
  CreateInstrumentationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /create-instrumentation-configuration",
    input: {
      InstrumentationType: 0,
      Service: 0,
      Environment: 0,
      SignalType: 0,
      Location: { CodeLocation: i_CodeLocation },
      Description: 0,
      ExpiresAt: 0,
      AttributeFilters: 0,
      CaptureConfiguration: {
        CodeCapture: {
          CaptureArguments: 0,
          CaptureReturn: 0,
          CaptureStackTrace: 0,
          CaptureLocals: 0,
          CaptureLimits: {
            MaxHits: 0,
            MaxStringLength: 0,
            MaxCollectionWidth: 0,
            MaxCollectionDepth: 0,
            MaxStackFrames: 0,
            MaxStackTraceSize: 0,
            MaxObjectDepth: 0,
            MaxFieldsPerObject: 0,
          },
        },
      },
      Tags: D.list(i_Tag),
    },
    output: { ExpiresAt: D.ts, CreatedAt: D.ts },
    body: true,
  },
  errors: [
    ConflictException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInstrumentationConfiguration",
})) as any;

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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /slo",
    input: {
      Name: 0,
      Description: 0,
      SliConfig: i_ServiceLevelIndicatorConfig,
      RequestBasedSliConfig: i_RequestBasedServiceLevelIndicatorConfig,
      Goal: i_Goal,
      Tags: D.list(i_Tag),
      BurnRateConfigurations: D.list(i_BurnRateConfiguration),
      CreateRecommendedSlo: 0,
      AutoInvestigationEnabled: 0,
    },
    output: { Slo: o_ServiceLevelObjective },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateServiceLevelObjective",
})) as any;

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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "DELETE /grouping-configuration" },
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGroupingConfiguration",
})) as any;

export type DeleteInstrumentationConfigurationError =
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified instrumentation configuration. SDKs remove the instrumentation during their next sync after the configuration is deleted or expires.
 */
export const deleteInstrumentationConfiguration: API.OperationMethod<
  DeleteInstrumentationConfigurationRequest,
  DeleteInstrumentationConfigurationResponse,
  DeleteInstrumentationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /delete-instrumentation-configuration",
    input: {
      InstrumentationType: 0,
      Service: 0,
      Environment: 0,
      SignalType: 0,
      LocationIdentifier: i_LocationIdentifier,
    },
    body: true,
  },
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInstrumentationConfiguration",
})) as any;

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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "DELETE /slo/{Id}", input: { Id: 0 } },
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteServiceLevelObjective",
})) as any;

export type GetInstrumentationConfigurationError =
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the details of a single instrumentation configuration identified by service, environment, signal type, and location. Use this to audit or display configuration details.
 */
export const getInstrumentationConfiguration: API.OperationMethod<
  GetInstrumentationConfigurationRequest,
  GetInstrumentationConfigurationResponse,
  GetInstrumentationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /get-instrumentation-configuration",
    input: {
      InstrumentationType: 0,
      Service: 0,
      Environment: 0,
      SignalType: 0,
      LocationIdentifier: i_LocationIdentifier,
    },
    output: { Configuration: { ExpiresAt: D.ts, CreatedAt: D.ts } },
    body: true,
  },
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstrumentationConfiguration",
})) as any;

export type GetInstrumentationConfigurationStatusError =
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the status history for a single instrumentation configuration during a specified time range. The response lists when the configuration was ACTIVE, READY, ERROR, or DISABLED.
 *
 * If no status or time window is provided, the operation defaults to ACTIVE events from the last hour.
 */
export const getInstrumentationConfigurationStatus: API.PaginatedOperationMethod<
  GetInstrumentationConfigurationStatusRequest,
  GetInstrumentationConfigurationStatusResponse,
  GetInstrumentationConfigurationStatusError,
  Credentials | HttpClient.HttpClient,
  InstrumentationStatusEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /get-instrumentation-configuration-status",
    input: {
      InstrumentationType: 0,
      Service: 0,
      Environment: 0,
      SignalType: 0,
      LocationIdentifier: i_LocationIdentifier,
      Status: 0,
      StartTime: 0,
      EndTime: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: { Events: D.list({ Time: D.ts }) },
    body: true,
  },
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstrumentationConfigurationStatus",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Events",
    pageSize: "MaxResults",
  } as const,
})) as any;

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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /service",
    input: {
      StartTime: D.m({ query: "StartTime", shape: D.tsAs("epoch-seconds") }),
      EndTime: D.m({ query: "EndTime", shape: D.tsAs("epoch-seconds") }),
      KeyAttributes: 0,
    },
    output: { StartTime: D.ts, EndTime: D.ts },
    body: true,
  },
  errors: [ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetService",
})) as any;

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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /slo/{Id}",
    input: { Id: 0 },
    output: { Slo: o_ServiceLevelObjective },
  },
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceLevelObjective",
})) as any;

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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /auditFindings",
    input: {
      StartTime: D.m({ query: "StartTime", shape: D.tsAs("epoch-seconds") }),
      EndTime: D.m({ query: "EndTime", shape: D.tsAs("epoch-seconds") }),
      Auditors: 0,
      AuditTargets: D.list({
        Type: 0,
        Data: {
          Service: i_ServiceEntity,
          Slo: { SloName: 0, SloArn: 0 },
          ServiceOperation: {
            Service: i_ServiceEntity,
            Operation: 0,
            MetricType: 0,
          },
          Canary: { CanaryName: 0 },
        },
      }),
      DetailLevel: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      StartTime: D.ts,
      EndTime: D.ts,
      AuditFindings: D.list({
        MetricGraph: { StartTime: D.ts, EndTime: D.ts },
      }),
    },
    body: true,
  },
  errors: [ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAuditFindings",
})) as any;

export type ListEntityEventsError =
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of change events for a specific entity, such as deployments, configuration changes, or other state-changing activities. This operation helps track the history of changes that may have affected service performance.
 */
export const listEntityEvents: API.PaginatedOperationMethod<
  ListEntityEventsInput,
  ListEntityEventsOutput,
  ListEntityEventsError,
  Credentials | HttpClient.HttpClient,
  ChangeEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /events",
    input: {
      Entity: 0,
      StartTime: 0,
      EndTime: 0,
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
    output: {
      StartTime: D.ts,
      EndTime: D.ts,
      ChangeEvents: D.list(o_ChangeEvent),
    },
    body: true,
  },
  errors: [ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEntityEvents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ChangeEvents",
    pageSize: "MaxResults",
  } as const,
})) as any;

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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /grouping-attribute-definitions",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      AwsAccountId: D.m({ query: "AwsAccountId" }),
      IncludeLinkedAccounts: D.m({ query: "IncludeLinkedAccounts" }),
    },
    output: { UpdatedAt: D.ts },
  },
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroupingAttributeDefinitions",
})) as any;

export type ListInstrumentationConfigurationsError =
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns all active instrumentation configurations for a service and environment. SDKs use this operation to sync configurations and apply client-side filters locally.
 *
 * Include the previous `SyncedAt` value to perform incremental syncs. When no changes are detected, the response sets `Changed` to `false` and omits configuration details.
 */
export const listInstrumentationConfigurations: API.PaginatedOperationMethod<
  ListInstrumentationConfigurationsRequest,
  InstrumentationConfigurationsPage,
  ListInstrumentationConfigurationsError,
  Credentials | HttpClient.HttpClient,
  InstrumentationConfigurationWithoutServiceEnv
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /list-instrumentation-configurations",
    input: {
      Service: 0,
      Environment: 0,
      InstrumentationType: 0,
      SyncedAt: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: {
      LatestConfigurations: D.list({ ExpiresAt: D.ts, CreatedAt: D.ts }),
      SyncedAt: D.ts,
    },
    body: true,
  },
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInstrumentationConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "LatestConfigurations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListServiceDependenciesError =
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of service dependencies of the service that you specify. A dependency is an infrastructure component that an operation of this service connects with. Dependencies can include Amazon Web Services services, Amazon Web Services resources, and third-party services.
 */
export const listServiceDependencies: API.PaginatedOperationMethod<
  ListServiceDependenciesInput,
  ListServiceDependenciesOutput,
  ListServiceDependenciesError,
  Credentials | HttpClient.HttpClient,
  ServiceDependency
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /service-dependencies",
    input: {
      StartTime: D.m({ query: "StartTime", shape: D.tsAs("epoch-seconds") }),
      EndTime: D.m({ query: "EndTime", shape: D.tsAs("epoch-seconds") }),
      KeyAttributes: 0,
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
    output: { StartTime: D.ts, EndTime: D.ts },
    body: true,
  },
  errors: [ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceDependencies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ServiceDependencies",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListServiceDependentsError =
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the list of dependents that invoked the specified service during the provided time range. Dependents include other services, CloudWatch Synthetics canaries, and clients that are instrumented with CloudWatch RUM app monitors.
 */
export const listServiceDependents: API.PaginatedOperationMethod<
  ListServiceDependentsInput,
  ListServiceDependentsOutput,
  ListServiceDependentsError,
  Credentials | HttpClient.HttpClient,
  ServiceDependent
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /service-dependents",
    input: {
      StartTime: D.m({ query: "StartTime", shape: D.tsAs("epoch-seconds") }),
      EndTime: D.m({ query: "EndTime", shape: D.tsAs("epoch-seconds") }),
      KeyAttributes: 0,
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
    output: { StartTime: D.ts, EndTime: D.ts },
    body: true,
  },
  errors: [ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceDependents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ServiceDependents",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListServiceLevelObjectiveExclusionWindowsError =
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves all exclusion windows configured for a specific SLO.
 */
export const listServiceLevelObjectiveExclusionWindows: API.PaginatedOperationMethod<
  ListServiceLevelObjectiveExclusionWindowsInput,
  ListServiceLevelObjectiveExclusionWindowsOutput,
  ListServiceLevelObjectiveExclusionWindowsError,
  Credentials | HttpClient.HttpClient,
  ExclusionWindow
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /slo/{Id}/exclusion-windows",
    input: {
      Id: 0,
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
    output: { ExclusionWindows: D.list({ StartTime: D.ts }) },
  },
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceLevelObjectiveExclusionWindows",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ExclusionWindows",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListServiceLevelObjectivesError =
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of SLOs created in this account.
 */
export const listServiceLevelObjectives: API.PaginatedOperationMethod<
  ListServiceLevelObjectivesInput,
  ListServiceLevelObjectivesOutput,
  ListServiceLevelObjectivesError,
  Credentials | HttpClient.HttpClient,
  ServiceLevelObjectiveSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /slos",
    input: {
      KeyAttributes: 0,
      OperationName: D.m({ query: "OperationName" }),
      DependencyConfig: i_DependencyConfig,
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
      MetricSourceTypes: 0,
      IncludeLinkedAccounts: D.m({ query: "IncludeLinkedAccounts" }),
      SloOwnerAwsAccountId: D.m({ query: "SloOwnerAwsAccountId" }),
      MetricSource: i_MetricSource,
    },
    output: { SloSummaries: D.list({ CreatedTime: D.ts }) },
    body: true,
  },
  errors: [ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceLevelObjectives",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SloSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListServiceOperationsError =
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the *operations* of this service that have been discovered by Application Signals. Only the operations that were invoked during the specified time range are returned.
 */
export const listServiceOperations: API.PaginatedOperationMethod<
  ListServiceOperationsInput,
  ListServiceOperationsOutput,
  ListServiceOperationsError,
  Credentials | HttpClient.HttpClient,
  ServiceOperation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /service-operations",
    input: {
      StartTime: D.m({ query: "StartTime", shape: D.tsAs("epoch-seconds") }),
      EndTime: D.m({ query: "EndTime", shape: D.tsAs("epoch-seconds") }),
      KeyAttributes: 0,
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
    output: { StartTime: D.ts, EndTime: D.ts },
    body: true,
  },
  errors: [ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceOperations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ServiceOperations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListServicesError =
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of services that have been discovered by Application Signals. A service represents a minimum logical and transactional unit that completes a business function. Services are discovered through Application Signals instrumentation.
 */
export const listServices: API.PaginatedOperationMethod<
  ListServicesInput,
  ListServicesOutput,
  ListServicesError,
  Credentials | HttpClient.HttpClient,
  ServiceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /services",
    input: {
      StartTime: D.m({ query: "StartTime", shape: D.tsAs("epoch-seconds") }),
      EndTime: D.m({ query: "EndTime", shape: D.tsAs("epoch-seconds") }),
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
      IncludeLinkedAccounts: D.m({ query: "IncludeLinkedAccounts" }),
      AwsAccountId: D.m({ query: "AwsAccountId" }),
    },
    output: { StartTime: D.ts, EndTime: D.ts },
  },
  errors: [ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServices",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ServiceSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListServiceStatesError =
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the last deployment and other change states of services. This API provides visibility into recent changes that may have affected service performance, helping with troubleshooting and change correlation.
 */
export const listServiceStates: API.PaginatedOperationMethod<
  ListServiceStatesInput,
  ListServiceStatesOutput,
  ListServiceStatesError,
  Credentials | HttpClient.HttpClient,
  ServiceState
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /service/states",
    input: {
      StartTime: 0,
      EndTime: 0,
      MaxResults: 0,
      NextToken: 0,
      IncludeLinkedAccounts: 0,
      AwsAccountId: 0,
      AttributeFilters: D.list({
        AttributeFilterName: 0,
        AttributeFilterValues: 0,
      }),
    },
    output: {
      StartTime: D.ts,
      EndTime: D.ts,
      ServiceStates: D.list({ LatestChangeEvents: D.list(o_ChangeEvent) }),
    },
    body: true,
  },
  errors: [ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceStates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ServiceStates",
    pageSize: "MaxResults",
  } as const,
})) as any;

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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags",
    input: { ResourceArn: D.m({ query: "ResourceArn" }) },
  },
  errors: [ResourceNotFoundException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /grouping-configuration",
    input: {
      GroupingAttributeDefinitions: D.list({
        GroupingName: 0,
        GroupingSourceKeys: 0,
        DefaultGroupingValue: 0,
      }),
    },
    output: { GroupingConfiguration: { UpdatedAt: D.ts } },
    body: true,
  },
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutGroupingConfiguration",
})) as any;

export type ReportInstrumentationConfigurationStatusError =
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Reports the status of one or more instrumentation configurations from SDK instances. Use this to record when configurations become ready, hit errors, become active, or are disabled by limits.
 *
 * Report `READY`, `ERROR`, and `DISABLED` when the status changes. Report `ACTIVE` periodically (for example, every minute) while instrumentation is running.
 */
export const reportInstrumentationConfigurationStatus: API.OperationMethod<
  ReportInstrumentationConfigurationStatusRequest,
  ReportInstrumentationConfigurationStatusResponse,
  ReportInstrumentationConfigurationStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /report-instrumentation-configuration-status",
    input: {
      Service: 0,
      Environment: 0,
      Configurations: D.list({
        InstrumentationType: 0,
        SignalType: 0,
        LocationHash: 0,
        Status: 0,
        Time: 0,
        ErrorCause: 0,
      }),
    },
    output: { UnprocessedStatusEvents: D.list({ Time: D.ts }) },
    body: true,
  },
  errors: [ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReportInstrumentationConfigurationStatus",
})) as any;

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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "POST /start-discovery", input: {} },
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDiscovery",
})) as any;

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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tag-resource",
    input: { ResourceArn: 0, Tags: D.list(i_Tag) },
    body: true,
  },
  errors: [
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /untag-resource",
    input: { ResourceArn: 0, TagKeys: 0 },
    body: true,
  },
  errors: [ResourceNotFoundException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /slo/{Id}",
    input: {
      Id: 0,
      Description: 0,
      SliConfig: i_ServiceLevelIndicatorConfig,
      RequestBasedSliConfig: i_RequestBasedServiceLevelIndicatorConfig,
      Goal: i_Goal,
      BurnRateConfigurations: D.list(i_BurnRateConfiguration),
      AutoInvestigationEnabled: 0,
    },
    output: { Slo: o_ServiceLevelObjective },
    body: true,
  },
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceLevelObjective",
})) as any;

const i_BurnRateConfiguration: D.LazyStruct = () => ({
  LookBackWindowMinutes: 0,
});
const i_CodeLocation: D.LazyStruct = () => ({
  Language: 0,
  CodeUnit: 0,
  ClassName: 0,
  MethodName: 0,
  FilePath: 0,
  LineNumber: 0,
});
const i_DependencyConfig: D.LazyStruct = () => ({
  DependencyKeyAttributes: 0,
  DependencyOperationName: 0,
});
const i_ExclusionWindow: D.LazyStruct = () => ({
  Window: { DurationUnit: 0, Duration: 0 },
  StartTime: 0,
  RecurrenceRule: { Expression: 0 },
  Reason: 0,
});
const i_Goal: D.LazyStruct = () => ({
  Interval: {
    RollingInterval: { DurationUnit: 0, Duration: 0 },
    CalendarInterval: { StartTime: 0, DurationUnit: 0, Duration: 0 },
  },
  AttainmentGoal: 0,
  WarningThreshold: 0,
});
const i_LocationIdentifier: D.LazyStruct = () => ({
  CodeLocation: i_CodeLocation,
  LocationHash: 0,
});
const i_MetricSource: D.LazyStruct = () => ({
  MetricSourceKeyAttributes: 0,
  MetricSourceAttributes: 0,
});
const i_RequestBasedServiceLevelIndicatorConfig: D.LazyStruct = () => ({
  RequestBasedSliMetricConfig: {
    KeyAttributes: 0,
    OperationName: 0,
    MetricType: 0,
    TotalRequestCountMetric: D.list(i_MetricDataQuery),
    MonitoredRequestCountMetric: {
      GoodCountMetric: D.list(i_MetricDataQuery),
      BadCountMetric: D.list(i_MetricDataQuery),
    },
    DependencyConfig: i_DependencyConfig,
    MetricSource: i_MetricSource,
    MetricName: 0,
    CompositeSliConfig: i_CompositeSliConfig,
  },
  MetricThreshold: 0,
  ComparisonOperator: 0,
});
const i_ServiceEntity: D.LazyStruct = () => ({
  Type: 0,
  Name: 0,
  Environment: 0,
  AwsAccountId: 0,
});
const i_ServiceLevelIndicatorConfig: D.LazyStruct = () => ({
  SliMetricConfig: {
    KeyAttributes: 0,
    OperationName: 0,
    MetricType: 0,
    MetricName: 0,
    Statistic: 0,
    PeriodSeconds: 0,
    MetricSource: i_MetricSource,
    MetricDataQueries: D.list(i_MetricDataQuery),
    DependencyConfig: i_DependencyConfig,
    CompositeSliConfig: i_CompositeSliConfig,
  },
  MetricThreshold: 0,
  ComparisonOperator: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_ChangeEvent: D.LazyStruct = () => ({ Timestamp: D.ts });
const o_Goal: D.LazyStruct = () => ({
  Interval: { CalendarInterval: { StartTime: D.ts } },
});
const o_ServiceLevelObjective: D.LazyStruct = () => ({
  CreatedTime: D.ts,
  LastUpdatedTime: D.ts,
  Goal: o_Goal,
});
const i_CompositeSliConfig: D.LazyStruct = () => ({
  SelectionConfig: { Type: 0, Pattern: 0 },
  Components: D.list({ OperationName: 0 }),
});
const i_MetricDataQuery: D.LazyStruct = () => ({
  Id: 0,
  MetricStat: {
    Metric: {
      Namespace: 0,
      MetricName: 0,
      Dimensions: D.list({ Name: 0, Value: 0 }),
    },
    Period: 0,
    Stat: 0,
    Unit: 0,
  },
  Expression: 0,
  Label: 0,
  ReturnData: 0,
  Period: 0,
  AccountId: 0,
});
