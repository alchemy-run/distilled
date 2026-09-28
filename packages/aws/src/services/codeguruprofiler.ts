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
  sdkId: "CodeGuruProfiler",
  target: "CodeGuruProfiler",
  version: "2019-07-18",
  sigv4: "codeguru-profiler",
  protocol: restJson1Protocol,
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
                `https://codeguru-profiler-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://codeguru-profiler-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://codeguru-profiler.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://codeguru-profiler.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
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
    ["QuotaError", "RetryableError"],
    { status: 402 },
  )<{ readonly message: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429 },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export type ProfilingGroupName = string;
export type ChannelId = string;
export type ChannelUri = string;
export type EventPublisher = string;
export type EventPublishers = string[];
export interface Channel {
  id?: string;
  uri: string;
  eventPublishers: string[];
}
export type Channels = Channel[];
export interface AddNotificationChannelsRequest {
  profilingGroupName: string;
  channels: Channel[];
}
export interface NotificationConfiguration {
  channels?: Channel[];
}
export interface AddNotificationChannelsResponse {
  notificationConfiguration?: NotificationConfiguration;
}
export type Period = string;
export type AggregationPeriod = string;
export type MetricType = string;
export type ThreadStates = string[];
export interface FrameMetric {
  frameName: string;
  type: string;
  threadStates: string[];
}
export type FrameMetrics = FrameMetric[];
export interface BatchGetFrameMetricDataRequest {
  profilingGroupName: string;
  startTime?: Date;
  endTime?: Date;
  period?: string;
  targetResolution?: string;
  frameMetrics?: FrameMetric[];
}
export interface TimestampStructure {
  value: Date;
}
export type ListOfTimestamps = TimestampStructure[];
export type UnprocessedEndTimeMap = {
  [key: string]: TimestampStructure[] | undefined;
};
export type FrameMetricValue = number;
export type FrameMetricValues = number[];
export interface FrameMetricDatum {
  frameMetric: FrameMetric;
  values: number[];
}
export type FrameMetricData = FrameMetricDatum[];
export interface BatchGetFrameMetricDataResponse {
  startTime: Date;
  endTime: Date;
  resolution: string;
  endTimes: TimestampStructure[];
  unprocessedEndTimes: { [key: string]: TimestampStructure[] | undefined };
  frameMetricData: FrameMetricDatum[];
}
export type FleetInstanceId = string;
export type MetadataField = string;
export type Metadata = { [key: string]: string | undefined };
export interface ConfigureAgentRequest {
  profilingGroupName: string;
  fleetInstanceId?: string;
  metadata?: { [key: string]: string | undefined };
}
export type AgentParameterField = string;
export type AgentParameters = { [key: string]: string | undefined };
export interface AgentConfiguration {
  shouldProfile: boolean;
  periodInSeconds: number;
  agentParameters?: { [key: string]: string | undefined };
}
export interface ConfigureAgentResponse {
  configuration: AgentConfiguration;
}
export type ComputePlatform = string;
export type ClientToken = string;
export interface AgentOrchestrationConfig {
  profilingEnabled: boolean;
}
export type TagsMap = { [key: string]: string | undefined };
export interface CreateProfilingGroupRequest {
  profilingGroupName: string;
  computePlatform?: string;
  clientToken: string;
  agentOrchestrationConfig?: AgentOrchestrationConfig;
  tags?: { [key: string]: string | undefined };
}
export type ProfilingGroupArn = string;
export interface AggregatedProfileTime {
  start?: Date;
  period?: string;
}
export interface ProfilingStatus {
  latestAgentProfileReportedAt?: Date;
  latestAggregatedProfile?: AggregatedProfileTime;
  latestAgentOrchestratedAt?: Date;
}
export interface ProfilingGroupDescription {
  name?: string;
  agentOrchestrationConfig?: AgentOrchestrationConfig;
  arn?: string;
  createdAt?: Date;
  updatedAt?: Date;
  profilingStatus?: ProfilingStatus;
  computePlatform?: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateProfilingGroupResponse {
  profilingGroup: ProfilingGroupDescription;
}
export interface DeleteProfilingGroupRequest {
  profilingGroupName: string;
}
export interface DeleteProfilingGroupResponse {}
export interface DescribeProfilingGroupRequest {
  profilingGroupName: string;
}
export interface DescribeProfilingGroupResponse {
  profilingGroup: ProfilingGroupDescription;
}
export type PaginationToken = string;
export type MaxResults = number;
export interface GetFindingsReportAccountSummaryRequest {
  nextToken?: string;
  maxResults?: number;
  dailyReportsOnly?: boolean;
}
export type FindingsReportId = string;
export interface FindingsReportSummary {
  id?: string;
  profilingGroupName?: string;
  profileStartTime?: Date;
  profileEndTime?: Date;
  totalNumberOfFindings?: number;
}
export type FindingsReportSummaries = FindingsReportSummary[];
export interface GetFindingsReportAccountSummaryResponse {
  reportSummaries: FindingsReportSummary[];
  nextToken?: string;
}
export interface GetNotificationConfigurationRequest {
  profilingGroupName: string;
}
export interface GetNotificationConfigurationResponse {
  notificationConfiguration: NotificationConfiguration;
}
export interface GetPolicyRequest {
  profilingGroupName: string;
}
export type RevisionId = string;
export interface GetPolicyResponse {
  policy: string;
  revisionId: string;
}
export type MaxDepth = number;
export interface GetProfileRequest {
  profilingGroupName: string;
  startTime?: Date;
  period?: string;
  endTime?: Date;
  maxDepth?: number;
  accept?: string;
}
export interface GetProfileResponse {
  profile: T.StreamingOutputBody;
  contentType: string;
  contentEncoding?: string;
}
export type Locale = string;
export interface GetRecommendationsRequest {
  profilingGroupName: string;
  startTime: Date;
  endTime: Date;
  locale?: string;
}
export type TargetFrame = string[];
export type TargetFrames = string[][];
export type Percentage = number;
export type Strings = string[];
export interface Pattern {
  id?: string;
  name?: string;
  description?: string;
  resolutionSteps?: string;
  targetFrames?: string[][];
  thresholdPercent?: number;
  countersToAggregate?: string[];
}
export interface Match {
  targetFramesIndex?: number;
  frameAddress?: string;
  thresholdBreachValue?: number;
}
export type Matches = Match[];
export interface Recommendation {
  allMatchesCount: number;
  allMatchesSum: number;
  pattern: Pattern;
  topMatches: Match[];
  startTime: Date;
  endTime: Date;
}
export type Recommendations = Recommendation[];
export interface Metric {
  frameName: string;
  type: string;
  threadStates: string[];
}
export type FeedbackType = string;
export interface UserFeedback {
  type: string;
}
export interface AnomalyInstance {
  id: string;
  startTime: Date;
  endTime?: Date;
  userFeedback?: UserFeedback;
}
export type AnomalyInstances = AnomalyInstance[];
export interface Anomaly {
  metric: Metric;
  reason: string;
  instances: AnomalyInstance[];
}
export type Anomalies = Anomaly[];
export interface GetRecommendationsResponse {
  profilingGroupName: string;
  profileStartTime: Date;
  profileEndTime: Date;
  recommendations: Recommendation[];
  anomalies: Anomaly[];
}
export interface ListFindingsReportsRequest {
  profilingGroupName: string;
  startTime: Date;
  endTime: Date;
  nextToken?: string;
  maxResults?: number;
  dailyReportsOnly?: boolean;
}
export interface ListFindingsReportsResponse {
  findingsReportSummaries: FindingsReportSummary[];
  nextToken?: string;
}
export type OrderBy = string;
export interface ListProfileTimesRequest {
  profilingGroupName: string;
  startTime: Date;
  endTime: Date;
  period: string;
  orderBy?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ProfileTime {
  start?: Date;
}
export type ProfileTimes = ProfileTime[];
export interface ListProfileTimesResponse {
  profileTimes: ProfileTime[];
  nextToken?: string;
}
export interface ListProfilingGroupsRequest {
  nextToken?: string;
  maxResults?: number;
  includeDescription?: boolean;
}
export type ProfilingGroupNames = string[];
export type ProfilingGroupDescriptions = ProfilingGroupDescription[];
export interface ListProfilingGroupsResponse {
  profilingGroupNames: string[];
  profilingGroups?: ProfilingGroupDescription[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface PostAgentProfileRequest {
  profilingGroupName: string;
  agentProfile: T.StreamingInputBody;
  profileToken?: string;
  contentType: string;
}
export interface PostAgentProfileResponse {}
export type ActionGroup = string;
export type Principal = string;
export type Principals = string[];
export interface PutPermissionRequest {
  profilingGroupName: string;
  actionGroup: string;
  principals: string[];
  revisionId?: string;
}
export interface PutPermissionResponse {
  policy: string;
  revisionId: string;
}
export interface RemoveNotificationChannelRequest {
  profilingGroupName: string;
  channelId: string;
}
export interface RemoveNotificationChannelResponse {
  notificationConfiguration?: NotificationConfiguration;
}
export interface RemovePermissionRequest {
  profilingGroupName: string;
  actionGroup: string;
  revisionId: string;
}
export interface RemovePermissionResponse {
  policy: string;
  revisionId: string;
}
export type AnomalyInstanceId = string;
export interface SubmitFeedbackRequest {
  profilingGroupName: string;
  anomalyInstanceId: string;
  type: string;
  comment?: string;
}
export interface SubmitFeedbackResponse {}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeys = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateProfilingGroupRequest {
  profilingGroupName: string;
  agentOrchestrationConfig: AgentOrchestrationConfig;
}
export interface UpdateProfilingGroupResponse {
  profilingGroup: ProfilingGroupDescription;
}
export type AddNotificationChannelsError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Add up to 2 anomaly notifications channels for a profiling group.
 */
export const addNotificationChannels: API.OperationMethod<
  AddNotificationChannelsRequest,
  AddNotificationChannelsResponse,
  AddNotificationChannelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /profilingGroups/{profilingGroupName}/notificationConfiguration",
    input: {
      profilingGroupName: 0,
      channels: D.list({ id: 0, uri: 0, eventPublishers: 0 }),
    },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddNotificationChannels",
})) as any;

export type BatchGetFrameMetricDataError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the time series of values for a requested list
 * of frame metrics from a time period.
 */
export const batchGetFrameMetricData: API.OperationMethod<
  BatchGetFrameMetricDataRequest,
  BatchGetFrameMetricDataResponse,
  BatchGetFrameMetricDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /profilingGroups/{profilingGroupName}/frames/-/metrics",
    input: {
      profilingGroupName: 0,
      startTime: D.m({ query: "startTime" }),
      endTime: D.m({ query: "endTime" }),
      period: D.m({ query: "period" }),
      targetResolution: D.m({ query: "targetResolution" }),
      frameMetrics: D.list({ frameName: 0, type: 0, threadStates: 0 }),
    },
    output: {
      startTime: D.ts,
      endTime: D.ts,
      endTimes: D.list(o_TimestampStructure),
      unprocessedEndTimes: D.map(D.list(o_TimestampStructure)),
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetFrameMetricData",
})) as any;

export type ConfigureAgentError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Used by profiler agents to report their current state and to receive remote
 * configuration updates. For example, `ConfigureAgent` can be used
 * to tell an agent whether to profile or not and for how long to return profiling data.
 */
export const configureAgent: API.OperationMethod<
  ConfigureAgentRequest,
  ConfigureAgentResponse,
  ConfigureAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /profilingGroups/{profilingGroupName}/configureAgent",
    input: { profilingGroupName: 0, fleetInstanceId: 0, metadata: 0 },
    output: { configuration: D.m({ payload: true }) },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConfigureAgent",
})) as any;

export type CreateProfilingGroupError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a profiling group.
 */
export const createProfilingGroup: API.OperationMethod<
  CreateProfilingGroupRequest,
  CreateProfilingGroupResponse,
  CreateProfilingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /profilingGroups",
    input: {
      profilingGroupName: 0,
      computePlatform: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
      agentOrchestrationConfig: i_AgentOrchestrationConfig,
      tags: 0,
    },
    output: {
      profilingGroup: D.m({
        payload: true,
        shape: o_ProfilingGroupDescription,
      }),
    },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProfilingGroup",
})) as any;

export type DeleteProfilingGroupError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a profiling group.
 */
export const deleteProfilingGroup: API.OperationMethod<
  DeleteProfilingGroupRequest,
  DeleteProfilingGroupResponse,
  DeleteProfilingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /profilingGroups/{profilingGroupName}",
    input: { profilingGroupName: 0 },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProfilingGroup",
})) as any;

export type DescribeProfilingGroupError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a
 * `ProfilingGroupDescription`
 *
 * object that contains information about the requested profiling group.
 */
export const describeProfilingGroup: API.OperationMethod<
  DescribeProfilingGroupRequest,
  DescribeProfilingGroupResponse,
  DescribeProfilingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /profilingGroups/{profilingGroupName}",
    input: { profilingGroupName: 0 },
    output: {
      profilingGroup: D.m({
        payload: true,
        shape: o_ProfilingGroupDescription,
      }),
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProfilingGroup",
})) as any;

export type GetFindingsReportAccountSummaryError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of
 *
 * `FindingsReportSummary`
 *
 * objects that contain analysis results for all profiling groups in your AWS account.
 */
export const getFindingsReportAccountSummary: API.PaginatedOperationMethod<
  GetFindingsReportAccountSummaryRequest,
  GetFindingsReportAccountSummaryResponse,
  GetFindingsReportAccountSummaryError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /internal/findingsReports",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      dailyReportsOnly: D.m({ query: "dailyReportsOnly" }),
    },
    output: { reportSummaries: D.list(o_FindingsReportSummary) },
  },
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFindingsReportAccountSummary",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetNotificationConfigurationError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the current configuration for anomaly notifications for a profiling group.
 */
export const getNotificationConfiguration: API.OperationMethod<
  GetNotificationConfigurationRequest,
  GetNotificationConfigurationResponse,
  GetNotificationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /profilingGroups/{profilingGroupName}/notificationConfiguration",
    input: { profilingGroupName: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNotificationConfiguration",
})) as any;

export type GetPolicyError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the JSON-formatted resource-based policy on a profiling group.
 */
export const getPolicy: API.OperationMethod<
  GetPolicyRequest,
  GetPolicyResponse,
  GetPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /profilingGroups/{profilingGroupName}/policy",
    input: { profilingGroupName: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicy",
})) as any;

export type GetProfileError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the aggregated profile of a profiling group for a specified time range.
 * Amazon CodeGuru Profiler collects posted agent profiles for a profiling group
 * into aggregated profiles.
 *
 * Because aggregated profiles expire over time `GetProfile` is not idempotent.
 *
 * Specify the time range for the requested aggregated profile using 1 or 2 of the following parameters: `startTime`,
 * `endTime`, `period`. The maximum time range allowed is 7 days. If you specify all 3 parameters,
 * an exception is thrown. If you specify only `period`, the latest aggregated profile is returned.
 *
 * Aggregated profiles are available with aggregation periods of 5 minutes, 1 hour, and 1 day, aligned to
 * UTC. The aggregation period of an aggregated profile determines how long it is retained. For more
 * information, see
 * `AggregatedProfileTime`
 * . The aggregated profile's aggregation period determines how long
 * it is retained by CodeGuru Profiler.
 *
 * - If the aggregation period is 5 minutes, the aggregated profile is retained for 15 days.
 *
 * - If the aggregation period is 1 hour, the aggregated profile is retained for 60 days.
 *
 * - If the aggregation period is 1 day, the aggregated profile is retained for 3 years.
 *
 * There are two use cases for calling `GetProfile`.
 *
 * - If you want to return an aggregated profile that already exists, use
 *
 * `ListProfileTimes`
 * to
 * view the time ranges of existing aggregated profiles. Use them in a `GetProfile` request to return a specific,
 * existing aggregated profile.
 *
 * - If you want to return an aggregated profile for a time range that doesn't align with an existing aggregated profile,
 * then CodeGuru Profiler makes a best effort to combine existing aggregated profiles from the requested time
 * range and return them as one aggregated profile.
 *
 * If aggregated profiles do not exist for the full time range requested, then
 * aggregated profiles for a smaller time range are returned. For example, if the
 * requested time range is from 00:00 to 00:20, and the existing aggregated profiles are
 * from 00:15 and 00:25, then the aggregated profiles from 00:15 to 00:20 are returned.
 */
export const getProfile: API.OperationMethod<
  GetProfileRequest,
  GetProfileResponse,
  GetProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /profilingGroups/{profilingGroupName}/profile",
    input: {
      profilingGroupName: 0,
      startTime: D.m({ query: "startTime" }),
      period: D.m({ query: "period" }),
      endTime: D.m({ query: "endTime" }),
      maxDepth: D.m({ query: "maxDepth" }),
      accept: D.m({ header: "Accept" }),
    },
    output: {
      profile: D.m({ payload: true, shape: D.stream }),
      contentType: D.m({ header: "Content-Type" }),
      contentEncoding: D.m({ header: "Content-Encoding" }),
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProfile",
})) as any;

export type GetRecommendationsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of
 *
 * `Recommendation`
 *
 * objects that contain recommendations for a profiling group for a given time period. A list of
 *
 * `Anomaly`
 *
 * objects that contains details about anomalies detected in the profiling group for the same time period is also
 * returned.
 */
export const getRecommendations: API.OperationMethod<
  GetRecommendationsRequest,
  GetRecommendationsResponse,
  GetRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /internal/profilingGroups/{profilingGroupName}/recommendations",
    input: {
      profilingGroupName: 0,
      startTime: D.m({ query: "startTime" }),
      endTime: D.m({ query: "endTime" }),
      locale: D.m({ query: "locale" }),
    },
    output: {
      profileStartTime: D.ts,
      profileEndTime: D.ts,
      recommendations: D.list({ startTime: D.ts, endTime: D.ts }),
      anomalies: D.list({
        instances: D.list({ startTime: D.ts, endTime: D.ts }),
      }),
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecommendations",
})) as any;

export type ListFindingsReportsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List the available reports for a given profiling group and time range.
 */
export const listFindingsReports: API.PaginatedOperationMethod<
  ListFindingsReportsRequest,
  ListFindingsReportsResponse,
  ListFindingsReportsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /internal/profilingGroups/{profilingGroupName}/findingsReports",
    input: {
      profilingGroupName: 0,
      startTime: D.m({ query: "startTime" }),
      endTime: D.m({ query: "endTime" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      dailyReportsOnly: D.m({ query: "dailyReportsOnly" }),
    },
    output: { findingsReportSummaries: D.list(o_FindingsReportSummary) },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFindingsReports",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListProfileTimesError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the start times of the available aggregated profiles of a profiling group
 * for an aggregation period within the specified time range.
 */
export const listProfileTimes: API.PaginatedOperationMethod<
  ListProfileTimesRequest,
  ListProfileTimesResponse,
  ListProfileTimesError,
  Credentials | HttpClient.HttpClient,
  ProfileTime
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /profilingGroups/{profilingGroupName}/profileTimes",
    input: {
      profilingGroupName: 0,
      startTime: D.m({ query: "startTime" }),
      endTime: D.m({ query: "endTime" }),
      period: D.m({ query: "period" }),
      orderBy: D.m({ query: "orderBy" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { profileTimes: D.list({ start: D.ts }) },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProfileTimes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "profileTimes",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListProfilingGroupsError =
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of profiling groups. The profiling groups are returned as
 *
 * `ProfilingGroupDescription`
 *
 * objects.
 */
export const listProfilingGroups: API.PaginatedOperationMethod<
  ListProfilingGroupsRequest,
  ListProfilingGroupsResponse,
  ListProfilingGroupsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /profilingGroups",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      includeDescription: D.m({ query: "includeDescription" }),
    },
    output: { profilingGroups: D.list(o_ProfilingGroupDescription) },
  },
  errors: [InternalServerException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProfilingGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the tags that are assigned to a specified resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type PostAgentProfileError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Submits profiling data to an aggregated profile of a profiling group. To get an
 * aggregated profile that is created with this profiling data, use
 *
 * `GetProfile`
 * .
 */
export const postAgentProfile: API.OperationMethod<
  PostAgentProfileRequest,
  PostAgentProfileResponse,
  PostAgentProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /profilingGroups/{profilingGroupName}/agentProfile",
    input: {
      profilingGroupName: 0,
      agentProfile: D.m({ payload: true, shape: D.stream }),
      profileToken: D.m({ query: "profileToken", idempotency: true }),
      contentType: D.m({ header: "Content-Type" }),
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PostAgentProfile",
})) as any;

export type PutPermissionError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds permissions to a profiling group's resource-based policy
 * that are provided using an action group. If a profiling group doesn't have
 * a resource-based policy, one is created for it using the permissions in the action group and
 * the roles and users in the `principals` parameter.
 *
 * The one supported action group that can be added is `agentPermission`
 * which grants `ConfigureAgent` and `PostAgent` permissions. For
 * more information, see Resource-based
 * policies in CodeGuru Profiler in the Amazon CodeGuru Profiler User
 * Guide,
 * `ConfigureAgent`
 * , and
 * `PostAgentProfile`
 * .
 *
 * The first time you call `PutPermission` on a profiling group, do not specify a `revisionId` because
 * it doesn't have a resource-based policy. Subsequent calls must provide a `revisionId` to specify
 * which revision of the resource-based policy to add the permissions to.
 *
 * The response contains the profiling group's JSON-formatted resource policy.
 */
export const putPermission: API.OperationMethod<
  PutPermissionRequest,
  PutPermissionResponse,
  PutPermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /profilingGroups/{profilingGroupName}/policy/{actionGroup}",
    input: {
      profilingGroupName: 0,
      actionGroup: 0,
      principals: 0,
      revisionId: 0,
    },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutPermission",
})) as any;

export type RemoveNotificationChannelError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Remove one anomaly notifications channel for a profiling group.
 */
export const removeNotificationChannel: API.OperationMethod<
  RemoveNotificationChannelRequest,
  RemoveNotificationChannelResponse,
  RemoveNotificationChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /profilingGroups/{profilingGroupName}/notificationConfiguration/{channelId}",
    input: { profilingGroupName: 0, channelId: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveNotificationChannel",
})) as any;

export type RemovePermissionError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes permissions from a profiling group's resource-based policy that are provided
 * using an action group. The one supported action group that can be removed is
 * `agentPermission` which grants `ConfigureAgent` and
 * `PostAgent` permissions. For more information, see Resource-based policies in CodeGuru Profiler in the Amazon
 * CodeGuru Profiler User Guide,
 * `ConfigureAgent`
 * , and
 * `PostAgentProfile`
 * .
 */
export const removePermission: API.OperationMethod<
  RemovePermissionRequest,
  RemovePermissionResponse,
  RemovePermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /profilingGroups/{profilingGroupName}/policy/{actionGroup}",
    input: {
      profilingGroupName: 0,
      actionGroup: 0,
      revisionId: D.m({ query: "revisionId" }),
    },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemovePermission",
})) as any;

export type SubmitFeedbackError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends feedback to CodeGuru Profiler about whether the anomaly detected by the analysis is
 * useful or not.
 */
export const submitFeedback: API.OperationMethod<
  SubmitFeedbackRequest,
  SubmitFeedbackResponse,
  SubmitFeedbackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /internal/profilingGroups/{profilingGroupName}/anomalies/{anomalyInstanceId}/feedback",
    input: { profilingGroupName: 0, anomalyInstanceId: 0, type: 0, comment: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SubmitFeedback",
})) as any;

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Use to assign one or more tags to a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Use to remove one or more tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateProfilingGroupError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a profiling group.
 */
export const updateProfilingGroup: API.OperationMethod<
  UpdateProfilingGroupRequest,
  UpdateProfilingGroupResponse,
  UpdateProfilingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /profilingGroups/{profilingGroupName}",
    input: {
      profilingGroupName: 0,
      agentOrchestrationConfig: i_AgentOrchestrationConfig,
    },
    output: {
      profilingGroup: D.m({
        payload: true,
        shape: o_ProfilingGroupDescription,
      }),
    },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProfilingGroup",
})) as any;

const i_AgentOrchestrationConfig: D.LazyStruct = () => ({
  profilingEnabled: 0,
});
const o_FindingsReportSummary: D.LazyStruct = () => ({
  profileStartTime: D.ts,
  profileEndTime: D.ts,
});
const o_ProfilingGroupDescription: D.LazyStruct = () => ({
  createdAt: D.ts,
  updatedAt: D.ts,
  profilingStatus: {
    latestAgentProfileReportedAt: D.ts,
    latestAggregatedProfile: { start: D.ts },
    latestAgentOrchestratedAt: D.ts,
  },
});
const o_TimestampStructure: D.LazyStruct = () => ({ value: D.ts });
