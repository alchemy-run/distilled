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
  sdkId: "CodeGuruProfiler",
  serviceShapeName: "CodeGuruProfiler",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "codeguru-profiler" });
const ver = /*@__PURE__*/ T.ServiceVersion("2019-07-18");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://codeguru-profiler.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://codeguru-profiler.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://codeguru-profiler.{R}.{D}","properties":{},"headers":{}}');

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
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
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
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(402), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withQuotaError, C.withRetryableError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(429), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type UnprocessedEndTimeMap = { [key: string]: TimestampStructure[] | undefined };
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
  input: __S(352, __c22, 0) as any as S.Schema<AddNotificationChannelsRequest>,
  output: __S(384, __c24, 0) as any as S.Schema<AddNotificationChannelsResponse>,
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
}));

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
  input: __S(417, __c26, 1) as any as S.Schema<BatchGetFrameMetricDataRequest>,
  output: __S(424, __c26, 8) as any as S.Schema<BatchGetFrameMetricDataResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetFrameMetricData",
}));

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
  input: __S(448, __c28, 0) as any as S.Schema<ConfigureAgentRequest>,
  output: __S(450, __c28, 2) as any as S.Schema<ConfigureAgentResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConfigureAgent",
}));

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
  input: __S(480, __c30, 0) as any as S.Schema<CreateProfilingGroupRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<CreateProfilingGroupResponse>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<DeleteProfilingGroupRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteProfilingGroupResponse>,
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
}));

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
  input: __S(32, __c2, 0) as any as S.Schema<DescribeProfilingGroupRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<DescribeProfilingGroupResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProfilingGroup",
}));

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
  input: __S(48, __c3, 0) as any as S.Schema<GetFindingsReportAccountSummaryRequest>,
  output: __S(49, __c3, 1) as any as S.Schema<GetFindingsReportAccountSummaryResponse>,
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
  input: __S(80, __c5, 0) as any as S.Schema<GetNotificationConfigurationRequest>,
  output: __S(81, __c5, 1) as any as S.Schema<GetNotificationConfigurationResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNotificationConfiguration",
}));

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
  input: __S(96, __c6, 0) as any as S.Schema<GetPolicyRequest>,
  output: __S(112, __c7, 0) as any as S.Schema<GetPolicyResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicy",
}));

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
  input: __S(128, __c8, 0) as any as S.Schema<GetProfileRequest>,
  output: __S(129, __c8, 1) as any as S.Schema<GetProfileResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProfile",
}));

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
  input: __S(144, __c9, 0) as any as S.Schema<GetRecommendationsRequest>,
  output: __S(156, __c9, 12) as any as S.Schema<GetRecommendationsResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecommendations",
}));

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
  input: __S(160, __c10, 0) as any as S.Schema<ListFindingsReportsRequest>,
  output: __S(161, __c10, 1) as any as S.Schema<ListFindingsReportsResponse>,
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
  input: __S(176, __c11, 0) as any as S.Schema<ListProfileTimesRequest>,
  output: __S(179, __c11, 3) as any as S.Schema<ListProfileTimesResponse>,
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

export type ListProfilingGroupsError = InternalServerException | ThrottlingException | CommonErrors;
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
  input: __S(192, __c12, 0) as any as S.Schema<ListProfilingGroupsRequest>,
  output: __S(194, __c12, 2) as any as S.Schema<ListProfilingGroupsResponse>,
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
  input: __S(208, __c13, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(209, __c13, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(224, __c14, 0) as any as S.Schema<PostAgentProfileRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<PostAgentProfileResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PostAgentProfile",
}));

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
  input: __S(240, __c15, 0) as any as S.Schema<PutPermissionRequest>,
  output: __S(112, __c7, 0) as any as S.Schema<PutPermissionResponse>,
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
}));

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
  input: __S(256, __c16, 0) as any as S.Schema<RemoveNotificationChannelRequest>,
  output: __S(384, __c24, 0) as any as S.Schema<RemoveNotificationChannelResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveNotificationChannel",
}));

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
  input: __S(272, __c17, 0) as any as S.Schema<RemovePermissionRequest>,
  output: __S(112, __c7, 0) as any as S.Schema<RemovePermissionResponse>,
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
}));

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
  input: __S(288, __c18, 0) as any as S.Schema<SubmitFeedbackRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<SubmitFeedbackResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SubmitFeedback",
}));

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
  input: __S(304, __c19, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<TagResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

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
  input: __S(320, __c20, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(336, __c21, 0) as any as S.Schema<UpdateProfilingGroupRequest>,
  output: __S(512, __c32, 0) as any as S.Schema<UpdateProfilingGroupResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ profilingGroupName: S.String.pipe(T.HttpLabel("profilingGroupName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/profilingGroups/{profilingGroupName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteProfilingGroupRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteProfilingGroupResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ profilingGroupName: S.String.pipe(T.HttpLabel("profilingGroupName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/profilingGroups/{profilingGroupName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeProfilingGroupRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          dailyReportsOnly: S.optional(S.Boolean).pipe(T.HttpQuery("dailyReportsOnly")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/internal/findingsReports" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFindingsReportAccountSummaryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ reportSummaries: __S(65, __c4, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetFindingsReportAccountSummaryResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          profilingGroupName: S.optional(S.String),
          profileStartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          profileEndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          totalNumberOfFindings: S.optional(S.Number),
        }),
      ).annotate({ identifier: "FindingsReportSummary" });
    case 1:
      return S.Array(__S(64, __c4, 0));
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ profilingGroupName: S.String.pipe(T.HttpLabel("profilingGroupName")) }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/profilingGroups/{profilingGroupName}/notificationConfiguration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetNotificationConfigurationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ notificationConfiguration: __S(370, __c23, 2) })).annotate({
        identifier: "GetNotificationConfigurationResponse",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ profilingGroupName: S.String.pipe(T.HttpLabel("profilingGroupName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/profilingGroups/{profilingGroupName}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPolicyRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ policy: S.String, revisionId: S.String })).annotate({
        identifier: "GetPolicyResponse",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          profilingGroupName: S.String.pipe(T.HttpLabel("profilingGroupName")),
          startTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("startTime"),
          ),
          period: S.optional(S.String).pipe(T.HttpQuery("period")),
          endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("endTime"),
          ),
          maxDepth: S.optional(S.Number).pipe(T.HttpQuery("maxDepth")),
          accept: S.optional(S.String).pipe(T.HttpHeader("Accept")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/profilingGroups/{profilingGroupName}/profile" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetProfileRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          profile: T.StreamingOutput.pipe(T.HttpPayload()),
          contentType: S.String.pipe(T.HttpHeader("Content-Type")),
          contentEncoding: S.optional(S.String).pipe(T.HttpHeader("Content-Encoding")),
        }),
      ).annotate({ identifier: "GetProfileResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          profilingGroupName: S.String.pipe(T.HttpLabel("profilingGroupName")),
          startTime: T.DateFromString.pipe(T.TimestampFormat("date-time")).pipe(
            T.HttpQuery("startTime"),
          ),
          endTime: T.DateFromString.pipe(T.TimestampFormat("date-time")).pipe(
            T.HttpQuery("endTime"),
          ),
          locale: S.optional(S.String).pipe(T.HttpQuery("locale")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/internal/profilingGroups/{profilingGroupName}/recommendations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRecommendationsRequest" });
    case 1:
      return S.Array(__S(400, __c25, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          resolutionSteps: S.optional(S.String),
          targetFrames: S.optional(__S(145, __c9, 1)),
          thresholdPercent: S.optional(S.Number),
          countersToAggregate: S.optional(__S(400, __c25, 0)),
        }),
      ).annotate({ identifier: "Pattern" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          targetFramesIndex: S.optional(S.Number),
          frameAddress: S.optional(S.String),
          thresholdBreachValue: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Match" });
    case 4:
      return S.Array(__S(147, __c9, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          allMatchesCount: S.Number,
          allMatchesSum: S.Number,
          pattern: __S(146, __c9, 2),
          topMatches: __S(148, __c9, 4),
          startTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          endTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "Recommendation" });
    case 6:
      return S.Array(__S(149, __c9, 5));
    case 7:
      return S.suspend(() => S.Struct({ type: S.String })).annotate({ identifier: "UserFeedback" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          startTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          userFeedback: S.optional(__S(151, __c9, 7)),
        }),
      ).annotate({ identifier: "AnomalyInstance" });
    case 9:
      return S.Array(__S(152, __c9, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({ metric: __S(432, __c27, 0), reason: S.String, instances: __S(153, __c9, 9) }),
      ).annotate({ identifier: "Anomaly" });
    case 11:
      return S.Array(__S(154, __c9, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          profilingGroupName: S.String,
          profileStartTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          profileEndTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          recommendations: __S(150, __c9, 6),
          anomalies: __S(155, __c9, 11),
        }),
      ).annotate({ identifier: "GetRecommendationsResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          profilingGroupName: S.String.pipe(T.HttpLabel("profilingGroupName")),
          startTime: T.DateFromString.pipe(T.TimestampFormat("date-time")).pipe(
            T.HttpQuery("startTime"),
          ),
          endTime: T.DateFromString.pipe(T.TimestampFormat("date-time")).pipe(
            T.HttpQuery("endTime"),
          ),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          dailyReportsOnly: S.optional(S.Boolean).pipe(T.HttpQuery("dailyReportsOnly")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/internal/profilingGroups/{profilingGroupName}/findingsReports",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListFindingsReportsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ findingsReportSummaries: __S(65, __c4, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListFindingsReportsResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          profilingGroupName: S.String.pipe(T.HttpLabel("profilingGroupName")),
          startTime: T.DateFromString.pipe(T.TimestampFormat("date-time")).pipe(
            T.HttpQuery("startTime"),
          ),
          endTime: T.DateFromString.pipe(T.TimestampFormat("date-time")).pipe(
            T.HttpQuery("endTime"),
          ),
          period: S.String.pipe(T.HttpQuery("period")),
          orderBy: S.optional(S.String).pipe(T.HttpQuery("orderBy")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/profilingGroups/{profilingGroupName}/profileTimes" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListProfileTimesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ start: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))) }),
      ).annotate({ identifier: "ProfileTime" });
    case 2:
      return S.Array(__S(177, __c11, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ profileTimes: __S(178, __c11, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListProfileTimesResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          includeDescription: S.optional(S.Boolean).pipe(T.HttpQuery("includeDescription")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/profilingGroups" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListProfilingGroupsRequest" });
    case 1:
      return S.Array(__S(499, __c31, 3));
    case 2:
      return S.suspend(() =>
        S.Struct({
          profilingGroupNames: __S(400, __c25, 0),
          profilingGroups: S.optional(__S(193, __c12, 1)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListProfilingGroupsResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(464, __c29, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          profilingGroupName: S.String.pipe(T.HttpLabel("profilingGroupName")),
          agentProfile: T.StreamingInput.pipe(T.HttpPayload()),
          profileToken: S.optional(S.String).pipe(
            T.HttpQuery("profileToken"),
            T.IdempotencyToken(),
          ),
          contentType: S.String.pipe(T.HttpHeader("Content-Type")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/profilingGroups/{profilingGroupName}/agentProfile" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PostAgentProfileRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          profilingGroupName: S.String.pipe(T.HttpLabel("profilingGroupName")),
          actionGroup: S.String.pipe(T.HttpLabel("actionGroup")),
          principals: __S(400, __c25, 0),
          revisionId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/profilingGroups/{profilingGroupName}/policy/{actionGroup}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutPermissionRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          profilingGroupName: S.String.pipe(T.HttpLabel("profilingGroupName")),
          channelId: S.String.pipe(T.HttpLabel("channelId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/profilingGroups/{profilingGroupName}/notificationConfiguration/{channelId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RemoveNotificationChannelRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          profilingGroupName: S.String.pipe(T.HttpLabel("profilingGroupName")),
          actionGroup: S.String.pipe(T.HttpLabel("actionGroup")),
          revisionId: S.String.pipe(T.HttpQuery("revisionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/profilingGroups/{profilingGroupName}/policy/{actionGroup}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RemovePermissionRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          profilingGroupName: S.String.pipe(T.HttpLabel("profilingGroupName")),
          anomalyInstanceId: S.String.pipe(T.HttpLabel("anomalyInstanceId")),
          type: S.String,
          comment: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/internal/profilingGroups/{profilingGroupName}/anomalies/{anomalyInstanceId}/feedback",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SubmitFeedbackRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(464, __c29, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(400, __c25, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          profilingGroupName: S.String.pipe(T.HttpLabel("profilingGroupName")),
          agentOrchestrationConfig: __S(496, __c31, 0),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/profilingGroups/{profilingGroupName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateProfilingGroupRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          profilingGroupName: S.String.pipe(T.HttpLabel("profilingGroupName")),
          channels: __S(369, __c23, 1),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/profilingGroups/{profilingGroupName}/notificationConfiguration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AddNotificationChannelsRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.optional(S.String), uri: S.String, eventPublishers: __S(400, __c25, 0) }),
      ).annotate({ identifier: "Channel" });
    case 1:
      return S.Array(__S(368, __c23, 0));
    case 2:
      return S.suspend(() => S.Struct({ channels: S.optional(__S(369, __c23, 1)) })).annotate({
        identifier: "NotificationConfiguration",
      });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ notificationConfiguration: S.optional(__S(370, __c23, 2)) }),
      ).annotate({ identifier: "AddNotificationChannelsResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(432, __c27, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          profilingGroupName: S.String.pipe(T.HttpLabel("profilingGroupName")),
          startTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("startTime"),
          ),
          endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("endTime"),
          ),
          period: S.optional(S.String).pipe(T.HttpQuery("period")),
          targetResolution: S.optional(S.String).pipe(T.HttpQuery("targetResolution")),
          frameMetrics: S.optional(__S(416, __c26, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/profilingGroups/{profilingGroupName}/frames/-/metrics",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetFrameMetricDataRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ value: T.DateFromString.pipe(T.TimestampFormat("date-time")) }),
      ).annotate({ identifier: "TimestampStructure" });
    case 3:
      return S.Array(__S(418, __c26, 2));
    case 4:
      return S.Record(S.String, /*@__PURE__*/ __S(419, __c26, 3).pipe(S.optional));
    case 5:
      return S.Array(S.Number);
    case 6:
      return S.suspend(() =>
        S.Struct({ frameMetric: __S(432, __c27, 0), values: __S(421, __c26, 5) }),
      ).annotate({ identifier: "FrameMetricDatum" });
    case 7:
      return S.Array(__S(422, __c26, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          startTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          endTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          resolution: S.String,
          endTimes: __S(419, __c26, 3),
          unprocessedEndTimes: __S(420, __c26, 4),
          frameMetricData: __S(423, __c26, 7),
        }),
      ).annotate({ identifier: "BatchGetFrameMetricDataResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ frameName: S.String, type: S.String, threadStates: __S(400, __c25, 0) }),
      ).annotate({ identifier: "FrameMetric" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          profilingGroupName: S.String.pipe(T.HttpLabel("profilingGroupName")),
          fleetInstanceId: S.optional(S.String),
          metadata: S.optional(__S(464, __c29, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/profilingGroups/{profilingGroupName}/configureAgent" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ConfigureAgentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          shouldProfile: S.Boolean,
          periodInSeconds: S.Number,
          agentParameters: S.optional(__S(464, __c29, 0)),
        }),
      ).annotate({ identifier: "AgentConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          configuration: __S(449, __c28, 1)
            .pipe(T.HttpPayload())
            .annotate({ identifier: "AgentConfiguration" }),
        }),
      ).annotate({ identifier: "ConfigureAgentResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          profilingGroupName: S.String,
          computePlatform: S.optional(S.String),
          clientToken: S.String.pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
          agentOrchestrationConfig: S.optional(__S(496, __c31, 0)),
          tags: S.optional(__S(464, __c29, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/profilingGroups" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateProfilingGroupRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ profilingEnabled: S.Boolean })).annotate({
        identifier: "AgentOrchestrationConfig",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          start: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          period: S.optional(S.String),
        }),
      ).annotate({ identifier: "AggregatedProfileTime" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          latestAgentProfileReportedAt: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          latestAggregatedProfile: S.optional(__S(497, __c31, 1)),
          latestAgentOrchestratedAt: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
        }),
      ).annotate({ identifier: "ProfilingStatus" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          agentOrchestrationConfig: S.optional(__S(496, __c31, 0)),
          arn: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          profilingStatus: S.optional(__S(498, __c31, 2)),
          computePlatform: S.optional(S.String),
          tags: S.optional(__S(464, __c29, 0)),
        }),
      ).annotate({ identifier: "ProfilingGroupDescription" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          profilingGroup: __S(499, __c31, 3)
            .pipe(T.HttpPayload())
            .annotate({ identifier: "ProfilingGroupDescription" }),
        }),
      ).annotate({ identifier: "CreateProfilingGroupResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
