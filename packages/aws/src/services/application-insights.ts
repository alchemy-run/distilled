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
  sdkId: "Application Insights",
  target: "EC2WindowsBarleyService",
  version: "2018-11-25",
  sigv4: "applicationinsights",
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
                `https://applicationinsights-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://applicationinsights-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://applicationinsights.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://applicationinsights.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceInUseException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceInUseException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class TagsAlreadyExistException
  extends /*@__PURE__*/ TE.TaggedError(
    "TagsAlreadyExistException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTagsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly ResourceName?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type ResourceGroupName = string;
export type ComponentName = string;
export type WorkloadName = string;
export type Tier =
  | "CUSTOM"
  | "DEFAULT"
  | "DOT_NET_CORE"
  | "DOT_NET_WORKER"
  | "DOT_NET_WEB_TIER"
  | "DOT_NET_WEB"
  | "SQL_SERVER"
  | "SQL_SERVER_ALWAYSON_AVAILABILITY_GROUP"
  | "MYSQL"
  | "POSTGRESQL"
  | "JAVA_JMX"
  | "ORACLE"
  | "SAP_HANA_MULTI_NODE"
  | "SAP_HANA_SINGLE_NODE"
  | "SAP_HANA_HIGH_AVAILABILITY"
  | "SAP_ASE_SINGLE_NODE"
  | "SAP_ASE_HIGH_AVAILABILITY"
  | "SQL_SERVER_FAILOVER_CLUSTER_INSTANCE"
  | "SHAREPOINT"
  | "ACTIVE_DIRECTORY"
  | "SAP_NETWEAVER_STANDARD"
  | "SAP_NETWEAVER_DISTRIBUTED"
  | "SAP_NETWEAVER_HIGH_AVAILABILITY"
  | (string & {});
export type ComponentConfiguration = string;
export interface WorkloadConfiguration {
  WorkloadName?: string;
  Tier?: Tier;
  Configuration?: string;
}
export interface AddWorkloadRequest {
  ResourceGroupName: string;
  ComponentName: string;
  WorkloadConfiguration: WorkloadConfiguration;
}
export type WorkloadId = string;
export interface AddWorkloadResponse {
  WorkloadId?: string;
  WorkloadConfiguration?: WorkloadConfiguration;
}
export type OpsCenterEnabled = boolean;
export type CWEMonitorEnabled = boolean;
export type OpsItemSNSTopicArn = string;
export type SNSNotificationArn = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export type AutoConfigEnabled = boolean;
export type AutoCreate = boolean;
export type GroupingType = "ACCOUNT_BASED" | (string & {});
export type AttachMissingPermission = boolean;
export interface CreateApplicationRequest {
  ResourceGroupName?: string;
  OpsCenterEnabled?: boolean;
  CWEMonitorEnabled?: boolean;
  OpsItemSNSTopicArn?: string;
  SNSNotificationArn?: string;
  Tags?: Tag[];
  AutoConfigEnabled?: boolean;
  AutoCreate?: boolean;
  GroupingType?: GroupingType;
  AttachMissingPermission?: boolean;
}
export type AccountId = string;
export type LifeCycle = string;
export type Remarks = string;
export type DiscoveryType =
  | "RESOURCE_GROUP_BASED"
  | "ACCOUNT_BASED"
  | (string & {});
export interface ApplicationInfo {
  AccountId?: string;
  ResourceGroupName?: string;
  LifeCycle?: string;
  OpsItemSNSTopicArn?: string;
  SNSNotificationArn?: string;
  OpsCenterEnabled?: boolean;
  CWEMonitorEnabled?: boolean;
  Remarks?: string;
  AutoConfigEnabled?: boolean;
  DiscoveryType?: DiscoveryType;
  AttachMissingPermission?: boolean;
}
export interface CreateApplicationResponse {
  ApplicationInfo?: ApplicationInfo;
}
export type CustomComponentName = string;
export type ResourceARN = string;
export type ResourceList = string[];
export interface CreateComponentRequest {
  ResourceGroupName: string;
  ComponentName: string;
  ResourceList: string[];
}
export interface CreateComponentResponse {}
export type LogPatternSetName = string;
export type LogPatternName = string;
export type LogPatternRegex = string;
export type LogPatternRank = number;
export interface CreateLogPatternRequest {
  ResourceGroupName: string;
  PatternSetName: string;
  PatternName: string;
  Pattern: string;
  Rank: number;
}
export interface LogPattern {
  PatternSetName?: string;
  PatternName?: string;
  Pattern?: string;
  Rank?: number;
}
export interface CreateLogPatternResponse {
  LogPattern?: LogPattern;
  ResourceGroupName?: string;
}
export interface DeleteApplicationRequest {
  ResourceGroupName: string;
}
export interface DeleteApplicationResponse {}
export interface DeleteComponentRequest {
  ResourceGroupName: string;
  ComponentName: string;
}
export interface DeleteComponentResponse {}
export interface DeleteLogPatternRequest {
  ResourceGroupName: string;
  PatternSetName: string;
  PatternName: string;
}
export interface DeleteLogPatternResponse {}
export interface DescribeApplicationRequest {
  ResourceGroupName: string;
  AccountId?: string;
}
export interface DescribeApplicationResponse {
  ApplicationInfo?: ApplicationInfo;
}
export interface DescribeComponentRequest {
  ResourceGroupName: string;
  ComponentName: string;
  AccountId?: string;
}
export type ResourceType = string;
export type OsType = "WINDOWS" | "LINUX" | (string & {});
export type Monitor = boolean;
export type MetaDataKey = string;
export type MetaDataValue = string;
export type WorkloadMetaData = { [key: string]: string | undefined };
export type DetectedWorkload = {
  [key in Tier]?: { [key: string]: string | undefined };
};
export interface ApplicationComponent {
  ComponentName?: string;
  ComponentRemarks?: string;
  ResourceType?: string;
  OsType?: OsType;
  Tier?: Tier;
  Monitor?: boolean;
  DetectedWorkload?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
}
export interface DescribeComponentResponse {
  ApplicationComponent?: ApplicationComponent;
  ResourceList?: string[];
}
export interface DescribeComponentConfigurationRequest {
  ResourceGroupName: string;
  ComponentName: string;
  AccountId?: string;
}
export interface DescribeComponentConfigurationResponse {
  Monitor?: boolean;
  Tier?: Tier;
  ComponentConfiguration?: string;
}
export type RecommendationType =
  | "INFRA_ONLY"
  | "WORKLOAD_ONLY"
  | "ALL"
  | (string & {});
export interface DescribeComponentConfigurationRecommendationRequest {
  ResourceGroupName: string;
  ComponentName: string;
  Tier: Tier;
  WorkloadName?: string;
  RecommendationType?: RecommendationType;
}
export interface DescribeComponentConfigurationRecommendationResponse {
  ComponentConfiguration?: string;
}
export interface DescribeLogPatternRequest {
  ResourceGroupName: string;
  PatternSetName: string;
  PatternName: string;
  AccountId?: string;
}
export interface DescribeLogPatternResponse {
  ResourceGroupName?: string;
  AccountId?: string;
  LogPattern?: LogPattern;
}
export type ObservationId = string;
export interface DescribeObservationRequest {
  ObservationId: string;
  AccountId?: string;
}
export type StartTime = Date;
export type EndTime = Date;
export type SourceType = string;
export type SourceARN = string;
export type LogGroup = string;
export type LineTime = Date;
export type LogText = string;
export type LogFilter = "ERROR" | "WARN" | "INFO" | (string & {});
export type MetricNamespace = string;
export type MetricName = string;
export type Unit = string;
export type Value = number;
export type CloudWatchEventId = string;
export type CloudWatchEventSource =
  | "EC2"
  | "CODE_DEPLOY"
  | "HEALTH"
  | "RDS"
  | (string & {});
export type CloudWatchEventDetailType = string;
export type HealthEventArn = string;
export type HealthService = string;
export type HealthEventTypeCode = string;
export type HealthEventTypeCategory = string;
export type HealthEventDescription = string;
export type CodeDeployDeploymentId = string;
export type CodeDeployDeploymentGroup = string;
export type CodeDeployState = string;
export type CodeDeployApplication = string;
export type CodeDeployInstanceGroupId = string;
export type Ec2State = string;
export type RdsEventCategories = string;
export type RdsEventMessage = string;
export type S3EventName = string;
export type StatesExecutionArn = string;
export type StatesArn = string;
export type StatesStatus = string;
export type StatesInput = string;
export type EbsEvent = string;
export type EbsResult = string;
export type EbsCause = string;
export type EbsRequestId = string;
export type XRayFaultPercent = number;
export type XRayThrottlePercent = number;
export type XRayErrorPercent = number;
export type XRayRequestCount = number;
export type XRayRequestAverageLatency = number;
export type XRayNodeName = string;
export type XRayNodeType = string;
export interface Observation {
  Id?: string;
  StartTime?: Date;
  EndTime?: Date;
  SourceType?: string;
  SourceARN?: string;
  LogGroup?: string;
  LineTime?: Date;
  LogText?: string;
  LogFilter?: LogFilter;
  MetricNamespace?: string;
  MetricName?: string;
  Unit?: string;
  Value?: number;
  CloudWatchEventId?: string;
  CloudWatchEventSource?: CloudWatchEventSource;
  CloudWatchEventDetailType?: string;
  HealthEventArn?: string;
  HealthService?: string;
  HealthEventTypeCode?: string;
  HealthEventTypeCategory?: string;
  HealthEventDescription?: string;
  CodeDeployDeploymentId?: string;
  CodeDeployDeploymentGroup?: string;
  CodeDeployState?: string;
  CodeDeployApplication?: string;
  CodeDeployInstanceGroupId?: string;
  Ec2State?: string;
  RdsEventCategories?: string;
  RdsEventMessage?: string;
  S3EventName?: string;
  StatesExecutionArn?: string;
  StatesArn?: string;
  StatesStatus?: string;
  StatesInput?: string;
  EbsEvent?: string;
  EbsResult?: string;
  EbsCause?: string;
  EbsRequestId?: string;
  XRayFaultPercent?: number;
  XRayThrottlePercent?: number;
  XRayErrorPercent?: number;
  XRayRequestCount?: number;
  XRayRequestAverageLatency?: number;
  XRayNodeName?: string;
  XRayNodeType?: string;
}
export interface DescribeObservationResponse {
  Observation?: Observation;
}
export type ProblemId = string;
export interface DescribeProblemRequest {
  ProblemId: string;
  AccountId?: string;
}
export type Title = string;
export type ShortName = string;
export type Insights = string;
export type Status =
  | "IGNORE"
  | "RESOLVED"
  | "PENDING"
  | "RECURRING"
  | "RECOVERING"
  | (string & {});
export type AffectedResource = string;
export type SeverityLevel =
  | "Informative"
  | "Low"
  | "Medium"
  | "High"
  | (string & {});
export type FeedbackKey = "INSIGHTS_FEEDBACK" | (string & {});
export type FeedbackValue =
  | "NOT_SPECIFIED"
  | "USEFUL"
  | "NOT_USEFUL"
  | (string & {});
export type Feedback = { [key in FeedbackKey]?: FeedbackValue };
export type RecurringCount = number;
export type LastRecurrenceTime = Date;
export type Visibility = "IGNORED" | "VISIBLE" | (string & {});
export type ResolutionMethod =
  | "MANUAL"
  | "AUTOMATIC"
  | "UNRESOLVED"
  | (string & {});
export interface Problem {
  Id?: string;
  Title?: string;
  ShortName?: string;
  Insights?: string;
  Status?: Status;
  AffectedResource?: string;
  StartTime?: Date;
  EndTime?: Date;
  SeverityLevel?: SeverityLevel;
  AccountId?: string;
  ResourceGroupName?: string;
  Feedback?: { [key: string]: FeedbackValue | undefined };
  RecurringCount?: number;
  LastRecurrenceTime?: Date;
  Visibility?: Visibility;
  ResolutionMethod?: ResolutionMethod;
}
export interface DescribeProblemResponse {
  Problem?: Problem;
  SNSNotificationArn?: string;
}
export interface DescribeProblemObservationsRequest {
  ProblemId: string;
  AccountId?: string;
}
export type ObservationList = Observation[];
export interface RelatedObservations {
  ObservationList?: Observation[];
}
export interface DescribeProblemObservationsResponse {
  RelatedObservations?: RelatedObservations;
}
export interface DescribeWorkloadRequest {
  ResourceGroupName: string;
  ComponentName: string;
  WorkloadId: string;
  AccountId?: string;
}
export interface DescribeWorkloadResponse {
  WorkloadId?: string;
  WorkloadRemarks?: string;
  WorkloadConfiguration?: WorkloadConfiguration;
}
export type MaxEntities = number;
export type PaginationToken = string;
export interface ListApplicationsRequest {
  MaxResults?: number;
  NextToken?: string;
  AccountId?: string;
}
export type ApplicationInfoList = ApplicationInfo[];
export interface ListApplicationsResponse {
  ApplicationInfoList?: ApplicationInfo[];
  NextToken?: string;
}
export interface ListComponentsRequest {
  ResourceGroupName: string;
  MaxResults?: number;
  NextToken?: string;
  AccountId?: string;
}
export type ApplicationComponentList = ApplicationComponent[];
export interface ListComponentsResponse {
  ApplicationComponentList?: ApplicationComponent[];
  NextToken?: string;
}
export type ConfigurationEventStatus =
  | "INFO"
  | "WARN"
  | "ERROR"
  | (string & {});
export interface ListConfigurationHistoryRequest {
  ResourceGroupName?: string;
  StartTime?: Date;
  EndTime?: Date;
  EventStatus?: ConfigurationEventStatus;
  MaxResults?: number;
  NextToken?: string;
  AccountId?: string;
}
export type ConfigurationEventMonitoredResourceARN = string;
export type ConfigurationEventResourceType =
  | "CLOUDWATCH_ALARM"
  | "CLOUDWATCH_LOG"
  | "CLOUDFORMATION"
  | "SSM_ASSOCIATION"
  | (string & {});
export type ConfigurationEventTime = Date;
export type ConfigurationEventDetail = string;
export type ConfigurationEventResourceName = string;
export interface ConfigurationEvent {
  ResourceGroupName?: string;
  AccountId?: string;
  MonitoredResourceARN?: string;
  EventStatus?: ConfigurationEventStatus;
  EventResourceType?: ConfigurationEventResourceType;
  EventTime?: Date;
  EventDetail?: string;
  EventResourceName?: string;
}
export type ConfigurationEventList = ConfigurationEvent[];
export interface ListConfigurationHistoryResponse {
  EventList?: ConfigurationEvent[];
  NextToken?: string;
}
export interface ListLogPatternsRequest {
  ResourceGroupName: string;
  PatternSetName?: string;
  MaxResults?: number;
  NextToken?: string;
  AccountId?: string;
}
export type LogPatternList = LogPattern[];
export interface ListLogPatternsResponse {
  ResourceGroupName?: string;
  AccountId?: string;
  LogPatterns?: LogPattern[];
  NextToken?: string;
}
export interface ListLogPatternSetsRequest {
  ResourceGroupName: string;
  MaxResults?: number;
  NextToken?: string;
  AccountId?: string;
}
export type LogPatternSetList = string[];
export interface ListLogPatternSetsResponse {
  ResourceGroupName?: string;
  AccountId?: string;
  LogPatternSets?: string[];
  NextToken?: string;
}
export interface ListProblemsRequest {
  AccountId?: string;
  ResourceGroupName?: string;
  StartTime?: Date;
  EndTime?: Date;
  MaxResults?: number;
  NextToken?: string;
  ComponentName?: string;
  Visibility?: Visibility;
}
export type ProblemList = Problem[];
export interface ListProblemsResponse {
  ProblemList?: Problem[];
  NextToken?: string;
  ResourceGroupName?: string;
  AccountId?: string;
}
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export interface ListWorkloadsRequest {
  ResourceGroupName: string;
  ComponentName: string;
  MaxResults?: number;
  NextToken?: string;
  AccountId?: string;
}
export type MissingWorkloadConfig = boolean;
export interface Workload {
  WorkloadId?: string;
  ComponentName?: string;
  WorkloadName?: string;
  Tier?: Tier;
  WorkloadRemarks?: string;
  MissingWorkloadConfig?: boolean;
}
export type WorkloadList = Workload[];
export interface ListWorkloadsResponse {
  WorkloadList?: Workload[];
  NextToken?: string;
}
export interface RemoveWorkloadRequest {
  ResourceGroupName: string;
  ComponentName: string;
  WorkloadId: string;
}
export interface RemoveWorkloadResponse {}
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceARN: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export type RemoveSNSTopic = boolean;
export interface UpdateApplicationRequest {
  ResourceGroupName: string;
  OpsCenterEnabled?: boolean;
  CWEMonitorEnabled?: boolean;
  OpsItemSNSTopicArn?: string;
  SNSNotificationArn?: string;
  RemoveSNSTopic?: boolean;
  AutoConfigEnabled?: boolean;
  AttachMissingPermission?: boolean;
}
export interface UpdateApplicationResponse {
  ApplicationInfo?: ApplicationInfo;
}
export interface UpdateComponentRequest {
  ResourceGroupName: string;
  ComponentName: string;
  NewComponentName?: string;
  ResourceList?: string[];
}
export interface UpdateComponentResponse {}
export interface UpdateComponentConfigurationRequest {
  ResourceGroupName: string;
  ComponentName: string;
  Monitor?: boolean;
  Tier?: Tier;
  ComponentConfiguration?: string;
  AutoConfigEnabled?: boolean;
}
export interface UpdateComponentConfigurationResponse {}
export interface UpdateLogPatternRequest {
  ResourceGroupName: string;
  PatternSetName: string;
  PatternName: string;
  Pattern?: string;
  Rank?: number;
}
export interface UpdateLogPatternResponse {
  ResourceGroupName?: string;
  LogPattern?: LogPattern;
}
export type UpdateStatus = "RESOLVED" | (string & {});
export interface UpdateProblemRequest {
  ProblemId: string;
  UpdateStatus?: UpdateStatus;
  Visibility?: Visibility;
}
export interface UpdateProblemResponse {}
export interface UpdateWorkloadRequest {
  ResourceGroupName: string;
  ComponentName: string;
  WorkloadId?: string;
  WorkloadConfiguration: WorkloadConfiguration;
}
export interface UpdateWorkloadResponse {
  WorkloadId?: string;
  WorkloadConfiguration?: WorkloadConfiguration;
}
export type ErrorMsg = string;
export type ExceptionMessage = string;
export type AddWorkloadError =
  | InternalServerException
  | ResourceInUseException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds a workload to a component. Each component can have at most five workloads.
 */
export const addWorkload: API.OperationMethod<
  AddWorkloadRequest,
  AddWorkloadResponse,
  AddWorkloadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceGroupName: 0,
      ComponentName: 0,
      WorkloadConfiguration: i_WorkloadConfiguration,
    },
  },
  errors: [
    InternalServerException,
    ResourceInUseException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddWorkload",
})) as any;

export type CreateApplicationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceInUseException
  | ResourceNotFoundException
  | TagsAlreadyExistException
  | ValidationException
  | CommonErrors;
/**
 * Adds an application that is created from a resource group.
 */
export const createApplication: API.OperationMethod<
  CreateApplicationRequest,
  CreateApplicationResponse,
  CreateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceGroupName: 0,
      OpsCenterEnabled: 0,
      CWEMonitorEnabled: 0,
      OpsItemSNSTopicArn: 0,
      SNSNotificationArn: 0,
      Tags: D.list(i_Tag),
      AutoConfigEnabled: 0,
      AutoCreate: 0,
      GroupingType: 0,
      AttachMissingPermission: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceInUseException,
    ResourceNotFoundException,
    TagsAlreadyExistException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
})) as any;

export type CreateComponentError =
  | InternalServerException
  | ResourceInUseException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates a custom component by grouping similar standalone instances to monitor.
 */
export const createComponent: API.OperationMethod<
  CreateComponentRequest,
  CreateComponentResponse,
  CreateComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceGroupName: 0, ComponentName: 0, ResourceList: 0 },
  },
  errors: [
    InternalServerException,
    ResourceInUseException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateComponent",
})) as any;

export type CreateLogPatternError =
  | InternalServerException
  | ResourceInUseException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds an log pattern to a `LogPatternSet`.
 */
export const createLogPattern: API.OperationMethod<
  CreateLogPatternRequest,
  CreateLogPatternResponse,
  CreateLogPatternError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceGroupName: 0,
      PatternSetName: 0,
      PatternName: 0,
      Pattern: 0,
      Rank: 0,
    },
  },
  errors: [
    InternalServerException,
    ResourceInUseException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLogPattern",
})) as any;

export type DeleteApplicationError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified application from monitoring. Does not delete the
 * application.
 */
export const deleteApplication: API.OperationMethod<
  DeleteApplicationRequest,
  DeleteApplicationResponse,
  DeleteApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceGroupName: 0 } },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
})) as any;

export type DeleteComponentError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Ungroups a custom component. When you ungroup custom components, all applicable monitors
 * that are set up for the component are removed and the instances revert to their standalone
 * status.
 */
export const deleteComponent: API.OperationMethod<
  DeleteComponentRequest,
  DeleteComponentResponse,
  DeleteComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceGroupName: 0, ComponentName: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteComponent",
})) as any;

export type DeleteLogPatternError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified log pattern from a `LogPatternSet`.
 */
export const deleteLogPattern: API.OperationMethod<
  DeleteLogPatternRequest,
  DeleteLogPatternResponse,
  DeleteLogPatternError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceGroupName: 0, PatternSetName: 0, PatternName: 0 },
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLogPattern",
})) as any;

export type DescribeApplicationError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes the application.
 */
export const describeApplication: API.OperationMethod<
  DescribeApplicationRequest,
  DescribeApplicationResponse,
  DescribeApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceGroupName: 0, AccountId: 0 } },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplication",
})) as any;

export type DescribeComponentError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes a component and lists the resources that are grouped together in a
 * component.
 */
export const describeComponent: API.OperationMethod<
  DescribeComponentRequest,
  DescribeComponentResponse,
  DescribeComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceGroupName: 0, ComponentName: 0, AccountId: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeComponent",
})) as any;

export type DescribeComponentConfigurationError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes the monitoring configuration of the component.
 */
export const describeComponentConfiguration: API.OperationMethod<
  DescribeComponentConfigurationRequest,
  DescribeComponentConfigurationResponse,
  DescribeComponentConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceGroupName: 0, ComponentName: 0, AccountId: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeComponentConfiguration",
})) as any;

export type DescribeComponentConfigurationRecommendationError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes the recommended monitoring configuration of the component.
 */
export const describeComponentConfigurationRecommendation: API.OperationMethod<
  DescribeComponentConfigurationRecommendationRequest,
  DescribeComponentConfigurationRecommendationResponse,
  DescribeComponentConfigurationRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceGroupName: 0,
      ComponentName: 0,
      Tier: 0,
      WorkloadName: 0,
      RecommendationType: 0,
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeComponentConfigurationRecommendation",
})) as any;

export type DescribeLogPatternError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describe a specific log pattern from a `LogPatternSet`.
 */
export const describeLogPattern: API.OperationMethod<
  DescribeLogPatternRequest,
  DescribeLogPatternResponse,
  DescribeLogPatternError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceGroupName: 0,
      PatternSetName: 0,
      PatternName: 0,
      AccountId: 0,
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLogPattern",
})) as any;

export type DescribeObservationError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes an anomaly or error with the application.
 */
export const describeObservation: API.OperationMethod<
  DescribeObservationRequest,
  DescribeObservationResponse,
  DescribeObservationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ObservationId: 0, AccountId: 0 },
    output: { Observation: o_Observation },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeObservation",
})) as any;

export type DescribeProblemError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes an application problem.
 */
export const describeProblem: API.OperationMethod<
  DescribeProblemRequest,
  DescribeProblemResponse,
  DescribeProblemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ProblemId: 0, AccountId: 0 },
    output: { Problem: o_Problem },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProblem",
})) as any;

export type DescribeProblemObservationsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes the anomalies or errors associated with the problem.
 */
export const describeProblemObservations: API.OperationMethod<
  DescribeProblemObservationsRequest,
  DescribeProblemObservationsResponse,
  DescribeProblemObservationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ProblemId: 0, AccountId: 0 },
    output: { RelatedObservations: { ObservationList: D.list(o_Observation) } },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProblemObservations",
})) as any;

export type DescribeWorkloadError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes a workload and its configuration.
 */
export const describeWorkload: API.OperationMethod<
  DescribeWorkloadRequest,
  DescribeWorkloadResponse,
  DescribeWorkloadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceGroupName: 0,
      ComponentName: 0,
      WorkloadId: 0,
      AccountId: 0,
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkload",
})) as any;

export type ListApplicationsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists the IDs of the applications that you are monitoring.
 */
export const listApplications: API.PaginatedOperationMethod<
  ListApplicationsRequest,
  ListApplicationsResponse,
  ListApplicationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0, AccountId: 0 },
  },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplications",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListComponentsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the auto-grouped, standalone, and custom components of the application.
 */
export const listComponents: API.PaginatedOperationMethod<
  ListComponentsRequest,
  ListComponentsResponse,
  ListComponentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ResourceGroupName: 0, MaxResults: 0, NextToken: 0, AccountId: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListComponents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListConfigurationHistoryError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the INFO, WARN, and ERROR events for periodic configuration updates performed by
 * Application Insights. Examples of events represented are:
 *
 * - INFO: creating a new alarm or updating an alarm threshold.
 *
 * - WARN: alarm not created due to insufficient data points used to predict
 * thresholds.
 *
 * - ERROR: alarm not created due to permission errors or exceeding quotas.
 */
export const listConfigurationHistory: API.PaginatedOperationMethod<
  ListConfigurationHistoryRequest,
  ListConfigurationHistoryResponse,
  ListConfigurationHistoryError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceGroupName: 0,
      StartTime: 0,
      EndTime: 0,
      EventStatus: 0,
      MaxResults: 0,
      NextToken: 0,
      AccountId: 0,
    },
    output: { EventList: D.list({ EventTime: D.ts }) },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurationHistory",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLogPatternsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the log patterns in the specific log `LogPatternSet`.
 */
export const listLogPatterns: API.PaginatedOperationMethod<
  ListLogPatternsRequest,
  ListLogPatternsResponse,
  ListLogPatternsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceGroupName: 0,
      PatternSetName: 0,
      MaxResults: 0,
      NextToken: 0,
      AccountId: 0,
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLogPatterns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLogPatternSetsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the log pattern sets in the specific application.
 */
export const listLogPatternSets: API.PaginatedOperationMethod<
  ListLogPatternSetsRequest,
  ListLogPatternSetsResponse,
  ListLogPatternSetsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ResourceGroupName: 0, MaxResults: 0, NextToken: 0, AccountId: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLogPatternSets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProblemsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the problems with your application.
 */
export const listProblems: API.PaginatedOperationMethod<
  ListProblemsRequest,
  ListProblemsResponse,
  ListProblemsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      AccountId: 0,
      ResourceGroupName: 0,
      StartTime: 0,
      EndTime: 0,
      MaxResults: 0,
      NextToken: 0,
      ComponentName: 0,
      Visibility: 0,
    },
    output: { ProblemList: D.list(o_Problem) },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProblems",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieve a list of the tags (keys and values) that are associated with a specified
 * application. A *tag* is a label that you optionally define and associate
 * with an application. Each tag consists of a required *tag key* and an
 * optional associated *tag value*. A tag key is a general label that acts
 * as a category for more specific tag values. A tag value acts as a descriptor within a tag
 * key.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0 } },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListWorkloadsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the workloads that are configured on a given component.
 */
export const listWorkloads: API.PaginatedOperationMethod<
  ListWorkloadsRequest,
  ListWorkloadsResponse,
  ListWorkloadsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceGroupName: 0,
      ComponentName: 0,
      MaxResults: 0,
      NextToken: 0,
      AccountId: 0,
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkloads",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type RemoveWorkloadError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Remove workload from a component.
 */
export const removeWorkload: API.OperationMethod<
  RemoveWorkloadRequest,
  RemoveWorkloadResponse,
  RemoveWorkloadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceGroupName: 0, ComponentName: 0, WorkloadId: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveWorkload",
})) as any;

export type TagResourceError =
  | ResourceNotFoundException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Add one or more tags (keys and values) to a specified application. A
 * *tag* is a label that you optionally define and associate with an
 * application. Tags can help you categorize and manage application in different ways, such as
 * by purpose, owner, environment, or other criteria.
 *
 * Each tag consists of a required *tag key* and an associated
 * *tag value*, both of which you define. A tag key is a general label
 * that acts as a category for more specific tag values. A tag value acts as a descriptor
 * within a tag key.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, Tags: D.list(i_Tag) } },
  errors: [
    ResourceNotFoundException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Remove one or more tags (keys and values) from a specified application.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, TagKeys: 0 } },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateApplicationError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the application.
 */
export const updateApplication: API.OperationMethod<
  UpdateApplicationRequest,
  UpdateApplicationResponse,
  UpdateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceGroupName: 0,
      OpsCenterEnabled: 0,
      CWEMonitorEnabled: 0,
      OpsItemSNSTopicArn: 0,
      SNSNotificationArn: 0,
      RemoveSNSTopic: 0,
      AutoConfigEnabled: 0,
      AttachMissingPermission: 0,
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
})) as any;

export type UpdateComponentError =
  | InternalServerException
  | ResourceInUseException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the custom component name and/or the list of resources that make up the
 * component.
 */
export const updateComponent: API.OperationMethod<
  UpdateComponentRequest,
  UpdateComponentResponse,
  UpdateComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceGroupName: 0,
      ComponentName: 0,
      NewComponentName: 0,
      ResourceList: 0,
    },
  },
  errors: [
    InternalServerException,
    ResourceInUseException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateComponent",
})) as any;

export type UpdateComponentConfigurationError =
  | InternalServerException
  | ResourceInUseException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the monitoring configurations for the component. The configuration input
 * parameter is an escaped JSON of the configuration and should match the schema of what is
 * returned by `DescribeComponentConfigurationRecommendation`.
 */
export const updateComponentConfiguration: API.OperationMethod<
  UpdateComponentConfigurationRequest,
  UpdateComponentConfigurationResponse,
  UpdateComponentConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceGroupName: 0,
      ComponentName: 0,
      Monitor: 0,
      Tier: 0,
      ComponentConfiguration: 0,
      AutoConfigEnabled: 0,
    },
  },
  errors: [
    InternalServerException,
    ResourceInUseException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateComponentConfiguration",
})) as any;

export type UpdateLogPatternError =
  | InternalServerException
  | ResourceInUseException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds a log pattern to a `LogPatternSet`.
 */
export const updateLogPattern: API.OperationMethod<
  UpdateLogPatternRequest,
  UpdateLogPatternResponse,
  UpdateLogPatternError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceGroupName: 0,
      PatternSetName: 0,
      PatternName: 0,
      Pattern: 0,
      Rank: 0,
    },
  },
  errors: [
    InternalServerException,
    ResourceInUseException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLogPattern",
})) as any;

export type UpdateProblemError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the visibility of the problem or specifies the problem as
 * `RESOLVED`.
 */
export const updateProblem: API.OperationMethod<
  UpdateProblemRequest,
  UpdateProblemResponse,
  UpdateProblemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ProblemId: 0, UpdateStatus: 0, Visibility: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProblem",
})) as any;

export type UpdateWorkloadError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds a workload to a component. Each component can have at most five workloads.
 */
export const updateWorkload: API.OperationMethod<
  UpdateWorkloadRequest,
  UpdateWorkloadResponse,
  UpdateWorkloadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceGroupName: 0,
      ComponentName: 0,
      WorkloadId: 0,
      WorkloadConfiguration: i_WorkloadConfiguration,
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkload",
})) as any;

const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_WorkloadConfiguration: D.LazyStruct = () => ({
  WorkloadName: 0,
  Tier: 0,
  Configuration: 0,
});
const o_Observation: D.LazyStruct = () => ({
  StartTime: D.ts,
  EndTime: D.ts,
  LineTime: D.ts,
});
const o_Problem: D.LazyStruct = () => ({
  StartTime: D.ts,
  EndTime: D.ts,
  LastRecurrenceTime: D.ts,
});
