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
  sdkId: "CodeGuruProfiler",
  serviceShapeName: "CodeGuruProfiler",
});
const auth = T.AwsAuthSigv4({ name: "codeguru-profiler" });
const ver = T.ServiceVersion("2019-07-18");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
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
});

//# Newtypes
export type PaginationToken = string;
export type MaxResults = number;
export type FindingsReportId = string;
export type ProfilingGroupArn = string;
export type ProfilingGroupName = string;
export type ComputePlatform = string;
export type ClientToken = string;
export type AggregationPeriod = string;
export type ChannelId = string;
export type ChannelUri = string;
export type EventPublisher = string;
export type Period = string;
export type MetricType = string;
export type FrameMetricValue = number;
export type FleetInstanceId = string;
export type MetadataField = string;
export type AgentParameterField = string;
export type RevisionId = string;
export type MaxDepth = number;
export type Locale = string;
export type Percentage = number;
export type FeedbackType = string;
export type OrderBy = string;
export type ActionGroup = string;
export type Principal = string;
export type AnomalyInstanceId = string;

//# Schemas
export interface GetFindingsReportAccountSummaryRequest {
  nextToken?: string;
  maxResults?: number;
  dailyReportsOnly?: boolean;
}
export const GetFindingsReportAccountSummaryRequest = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    dailyReportsOnly: S.optional(S.Boolean).pipe(
      T.HttpQuery("dailyReportsOnly"),
    ),
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
).annotate({
  identifier: "GetFindingsReportAccountSummaryRequest",
}) as any as S.Schema<GetFindingsReportAccountSummaryRequest>;
export interface FindingsReportSummary {
  id?: string;
  profilingGroupName?: string;
  profileStartTime?: Date;
  profileEndTime?: Date;
  totalNumberOfFindings?: number;
}
export const FindingsReportSummary = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    profilingGroupName: S.optional(S.String),
    profileStartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    profileEndTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    totalNumberOfFindings: S.optional(S.Number),
  }),
).annotate({
  identifier: "FindingsReportSummary",
}) as any as S.Schema<FindingsReportSummary>;
export type FindingsReportSummaries = FindingsReportSummary[];
export const FindingsReportSummaries = S.Array(FindingsReportSummary);
export interface GetFindingsReportAccountSummaryResponse {
  reportSummaries: FindingsReportSummary[];
  nextToken?: string;
}
export const GetFindingsReportAccountSummaryResponse = S.suspend(() =>
  S.Struct({
    reportSummaries: FindingsReportSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetFindingsReportAccountSummaryResponse",
}) as any as S.Schema<GetFindingsReportAccountSummaryResponse>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = S.suspend(() =>
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
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export type TagsMap = { [key: string]: string | undefined };
export const TagsMap = S.Record(S.String, S.String.pipe(S.optional));
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ tags: S.optional(TagsMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: TagsMap,
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
).annotate({
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type TagKeys = string[];
export const TagKeys = S.Array(S.String);
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeys.pipe(T.HttpQuery("tagKeys")),
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
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface AgentOrchestrationConfig {
  profilingEnabled: boolean;
}
export const AgentOrchestrationConfig = S.suspend(() =>
  S.Struct({ profilingEnabled: S.Boolean }),
).annotate({
  identifier: "AgentOrchestrationConfig",
}) as any as S.Schema<AgentOrchestrationConfig>;
export interface CreateProfilingGroupRequest {
  profilingGroupName: string;
  computePlatform?: string;
  clientToken: string;
  agentOrchestrationConfig?: AgentOrchestrationConfig;
  tags?: { [key: string]: string | undefined };
}
export const CreateProfilingGroupRequest = S.suspend(() =>
  S.Struct({
    profilingGroupName: S.String,
    computePlatform: S.optional(S.String),
    clientToken: S.String.pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
    agentOrchestrationConfig: S.optional(AgentOrchestrationConfig),
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/profilingGroups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateProfilingGroupRequest",
}) as any as S.Schema<CreateProfilingGroupRequest>;
export interface AggregatedProfileTime {
  start?: Date;
  period?: string;
}
export const AggregatedProfileTime = S.suspend(() =>
  S.Struct({
    start: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    period: S.optional(S.String),
  }),
).annotate({
  identifier: "AggregatedProfileTime",
}) as any as S.Schema<AggregatedProfileTime>;
export interface ProfilingStatus {
  latestAgentProfileReportedAt?: Date;
  latestAggregatedProfile?: AggregatedProfileTime;
  latestAgentOrchestratedAt?: Date;
}
export const ProfilingStatus = S.suspend(() =>
  S.Struct({
    latestAgentProfileReportedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    latestAggregatedProfile: S.optional(AggregatedProfileTime),
    latestAgentOrchestratedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ProfilingStatus",
}) as any as S.Schema<ProfilingStatus>;
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
export const ProfilingGroupDescription = S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    agentOrchestrationConfig: S.optional(AgentOrchestrationConfig),
    arn: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    profilingStatus: S.optional(ProfilingStatus),
    computePlatform: S.optional(S.String),
    tags: S.optional(TagsMap),
  }),
).annotate({
  identifier: "ProfilingGroupDescription",
}) as any as S.Schema<ProfilingGroupDescription>;
export interface CreateProfilingGroupResponse {
  profilingGroup: ProfilingGroupDescription;
}
export const CreateProfilingGroupResponse = S.suspend(() =>
  S.Struct({
    profilingGroup: ProfilingGroupDescription.pipe(T.HttpPayload()).annotate({
      identifier: "ProfilingGroupDescription",
    }),
  }),
).annotate({
  identifier: "CreateProfilingGroupResponse",
}) as any as S.Schema<CreateProfilingGroupResponse>;
export interface DescribeProfilingGroupRequest {
  profilingGroupName: string;
}
export const DescribeProfilingGroupRequest = S.suspend(() =>
  S.Struct({
    profilingGroupName: S.String.pipe(T.HttpLabel("profilingGroupName")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/profilingGroups/{profilingGroupName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeProfilingGroupRequest",
}) as any as S.Schema<DescribeProfilingGroupRequest>;
export interface DescribeProfilingGroupResponse {
  profilingGroup: ProfilingGroupDescription;
}
export const DescribeProfilingGroupResponse = S.suspend(() =>
  S.Struct({
    profilingGroup: ProfilingGroupDescription.pipe(T.HttpPayload()).annotate({
      identifier: "ProfilingGroupDescription",
    }),
  }),
).annotate({
  identifier: "DescribeProfilingGroupResponse",
}) as any as S.Schema<DescribeProfilingGroupResponse>;
export interface UpdateProfilingGroupRequest {
  profilingGroupName: string;
  agentOrchestrationConfig: AgentOrchestrationConfig;
}
export const UpdateProfilingGroupRequest = S.suspend(() =>
  S.Struct({
    profilingGroupName: S.String.pipe(T.HttpLabel("profilingGroupName")),
    agentOrchestrationConfig: AgentOrchestrationConfig,
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
).annotate({
  identifier: "UpdateProfilingGroupRequest",
}) as any as S.Schema<UpdateProfilingGroupRequest>;
export interface UpdateProfilingGroupResponse {
  profilingGroup: ProfilingGroupDescription;
}
export const UpdateProfilingGroupResponse = S.suspend(() =>
  S.Struct({
    profilingGroup: ProfilingGroupDescription.pipe(T.HttpPayload()).annotate({
      identifier: "ProfilingGroupDescription",
    }),
  }),
).annotate({
  identifier: "UpdateProfilingGroupResponse",
}) as any as S.Schema<UpdateProfilingGroupResponse>;
export interface DeleteProfilingGroupRequest {
  profilingGroupName: string;
}
export const DeleteProfilingGroupRequest = S.suspend(() =>
  S.Struct({
    profilingGroupName: S.String.pipe(T.HttpLabel("profilingGroupName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/profilingGroups/{profilingGroupName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteProfilingGroupRequest",
}) as any as S.Schema<DeleteProfilingGroupRequest>;
export interface DeleteProfilingGroupResponse {}
export const DeleteProfilingGroupResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteProfilingGroupResponse",
}) as any as S.Schema<DeleteProfilingGroupResponse>;
export interface ListProfilingGroupsRequest {
  nextToken?: string;
  maxResults?: number;
  includeDescription?: boolean;
}
export const ListProfilingGroupsRequest = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    includeDescription: S.optional(S.Boolean).pipe(
      T.HttpQuery("includeDescription"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/profilingGroups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListProfilingGroupsRequest",
}) as any as S.Schema<ListProfilingGroupsRequest>;
export type ProfilingGroupNames = string[];
export const ProfilingGroupNames = S.Array(S.String);
export type ProfilingGroupDescriptions = ProfilingGroupDescription[];
export const ProfilingGroupDescriptions = S.Array(ProfilingGroupDescription);
export interface ListProfilingGroupsResponse {
  profilingGroupNames: string[];
  profilingGroups?: ProfilingGroupDescription[];
  nextToken?: string;
}
export const ListProfilingGroupsResponse = S.suspend(() =>
  S.Struct({
    profilingGroupNames: ProfilingGroupNames,
    profilingGroups: S.optional(ProfilingGroupDescriptions),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListProfilingGroupsResponse",
}) as any as S.Schema<ListProfilingGroupsResponse>;
export type EventPublishers = string[];
export const EventPublishers = S.Array(S.String);
export interface Channel {
  id?: string;
  uri: string;
  eventPublishers: string[];
}
export const Channel = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    uri: S.String,
    eventPublishers: EventPublishers,
  }),
).annotate({ identifier: "Channel" }) as any as S.Schema<Channel>;
export type Channels = Channel[];
export const Channels = S.Array(Channel);
export interface AddNotificationChannelsRequest {
  profilingGroupName: string;
  channels: Channel[];
}
export const AddNotificationChannelsRequest = S.suspend(() =>
  S.Struct({
    profilingGroupName: S.String.pipe(T.HttpLabel("profilingGroupName")),
    channels: Channels,
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
).annotate({
  identifier: "AddNotificationChannelsRequest",
}) as any as S.Schema<AddNotificationChannelsRequest>;
export interface NotificationConfiguration {
  channels?: Channel[];
}
export const NotificationConfiguration = S.suspend(() =>
  S.Struct({ channels: S.optional(Channels) }),
).annotate({
  identifier: "NotificationConfiguration",
}) as any as S.Schema<NotificationConfiguration>;
export interface AddNotificationChannelsResponse {
  notificationConfiguration?: NotificationConfiguration;
}
export const AddNotificationChannelsResponse = S.suspend(() =>
  S.Struct({
    notificationConfiguration: S.optional(NotificationConfiguration),
  }),
).annotate({
  identifier: "AddNotificationChannelsResponse",
}) as any as S.Schema<AddNotificationChannelsResponse>;
export type ThreadStates = string[];
export const ThreadStates = S.Array(S.String);
export interface FrameMetric {
  frameName: string;
  type: string;
  threadStates: string[];
}
export const FrameMetric = S.suspend(() =>
  S.Struct({ frameName: S.String, type: S.String, threadStates: ThreadStates }),
).annotate({ identifier: "FrameMetric" }) as any as S.Schema<FrameMetric>;
export type FrameMetrics = FrameMetric[];
export const FrameMetrics = S.Array(FrameMetric);
export interface BatchGetFrameMetricDataRequest {
  profilingGroupName: string;
  startTime?: Date;
  endTime?: Date;
  period?: string;
  targetResolution?: string;
  frameMetrics?: FrameMetric[];
}
export const BatchGetFrameMetricDataRequest = S.suspend(() =>
  S.Struct({
    profilingGroupName: S.String.pipe(T.HttpLabel("profilingGroupName")),
    startTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("startTime")),
    endTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("endTime")),
    period: S.optional(S.String).pipe(T.HttpQuery("period")),
    targetResolution: S.optional(S.String).pipe(
      T.HttpQuery("targetResolution"),
    ),
    frameMetrics: S.optional(FrameMetrics),
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
).annotate({
  identifier: "BatchGetFrameMetricDataRequest",
}) as any as S.Schema<BatchGetFrameMetricDataRequest>;
export interface TimestampStructure {
  value: Date;
}
export const TimestampStructure = S.suspend(() =>
  S.Struct({ value: T.DateFromString.pipe(T.TimestampFormat("date-time")) }),
).annotate({
  identifier: "TimestampStructure",
}) as any as S.Schema<TimestampStructure>;
export type ListOfTimestamps = TimestampStructure[];
export const ListOfTimestamps = S.Array(TimestampStructure);
export type UnprocessedEndTimeMap = {
  [key: string]: TimestampStructure[] | undefined;
};
export const UnprocessedEndTimeMap = S.Record(
  S.String,
  ListOfTimestamps.pipe(S.optional),
);
export type FrameMetricValues = number[];
export const FrameMetricValues = S.Array(S.Number);
export interface FrameMetricDatum {
  frameMetric: FrameMetric;
  values: number[];
}
export const FrameMetricDatum = S.suspend(() =>
  S.Struct({ frameMetric: FrameMetric, values: FrameMetricValues }),
).annotate({
  identifier: "FrameMetricDatum",
}) as any as S.Schema<FrameMetricDatum>;
export type FrameMetricData = FrameMetricDatum[];
export const FrameMetricData = S.Array(FrameMetricDatum);
export interface BatchGetFrameMetricDataResponse {
  startTime: Date;
  endTime: Date;
  resolution: string;
  endTimes: TimestampStructure[];
  unprocessedEndTimes: { [key: string]: TimestampStructure[] | undefined };
  frameMetricData: FrameMetricDatum[];
}
export const BatchGetFrameMetricDataResponse = S.suspend(() =>
  S.Struct({
    startTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    endTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    resolution: S.String,
    endTimes: ListOfTimestamps,
    unprocessedEndTimes: UnprocessedEndTimeMap,
    frameMetricData: FrameMetricData,
  }),
).annotate({
  identifier: "BatchGetFrameMetricDataResponse",
}) as any as S.Schema<BatchGetFrameMetricDataResponse>;
export type Metadata = { [key: string]: string | undefined };
export const Metadata = S.Record(S.String, S.String.pipe(S.optional));
export interface ConfigureAgentRequest {
  profilingGroupName: string;
  fleetInstanceId?: string;
  metadata?: { [key: string]: string | undefined };
}
export const ConfigureAgentRequest = S.suspend(() =>
  S.Struct({
    profilingGroupName: S.String.pipe(T.HttpLabel("profilingGroupName")),
    fleetInstanceId: S.optional(S.String),
    metadata: S.optional(Metadata),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/profilingGroups/{profilingGroupName}/configureAgent",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ConfigureAgentRequest",
}) as any as S.Schema<ConfigureAgentRequest>;
export type AgentParameters = { [key: string]: string | undefined };
export const AgentParameters = S.Record(S.String, S.String.pipe(S.optional));
export interface AgentConfiguration {
  shouldProfile: boolean;
  periodInSeconds: number;
  agentParameters?: { [key: string]: string | undefined };
}
export const AgentConfiguration = S.suspend(() =>
  S.Struct({
    shouldProfile: S.Boolean,
    periodInSeconds: S.Number,
    agentParameters: S.optional(AgentParameters),
  }),
).annotate({
  identifier: "AgentConfiguration",
}) as any as S.Schema<AgentConfiguration>;
export interface ConfigureAgentResponse {
  configuration: AgentConfiguration;
}
export const ConfigureAgentResponse = S.suspend(() =>
  S.Struct({
    configuration: AgentConfiguration.pipe(T.HttpPayload()).annotate({
      identifier: "AgentConfiguration",
    }),
  }),
).annotate({
  identifier: "ConfigureAgentResponse",
}) as any as S.Schema<ConfigureAgentResponse>;
export interface GetNotificationConfigurationRequest {
  profilingGroupName: string;
}
export const GetNotificationConfigurationRequest = S.suspend(() =>
  S.Struct({
    profilingGroupName: S.String.pipe(T.HttpLabel("profilingGroupName")),
  }).pipe(
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
).annotate({
  identifier: "GetNotificationConfigurationRequest",
}) as any as S.Schema<GetNotificationConfigurationRequest>;
export interface GetNotificationConfigurationResponse {
  notificationConfiguration: NotificationConfiguration;
}
export const GetNotificationConfigurationResponse = S.suspend(() =>
  S.Struct({ notificationConfiguration: NotificationConfiguration }),
).annotate({
  identifier: "GetNotificationConfigurationResponse",
}) as any as S.Schema<GetNotificationConfigurationResponse>;
export interface GetPolicyRequest {
  profilingGroupName: string;
}
export const GetPolicyRequest = S.suspend(() =>
  S.Struct({
    profilingGroupName: S.String.pipe(T.HttpLabel("profilingGroupName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/profilingGroups/{profilingGroupName}/policy",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPolicyRequest",
}) as any as S.Schema<GetPolicyRequest>;
export interface GetPolicyResponse {
  policy: string;
  revisionId: string;
}
export const GetPolicyResponse = S.suspend(() =>
  S.Struct({ policy: S.String, revisionId: S.String }),
).annotate({
  identifier: "GetPolicyResponse",
}) as any as S.Schema<GetPolicyResponse>;
export interface GetProfileRequest {
  profilingGroupName: string;
  startTime?: Date;
  period?: string;
  endTime?: Date;
  maxDepth?: number;
  accept?: string;
}
export const GetProfileRequest = S.suspend(() =>
  S.Struct({
    profilingGroupName: S.String.pipe(T.HttpLabel("profilingGroupName")),
    startTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("startTime")),
    period: S.optional(S.String).pipe(T.HttpQuery("period")),
    endTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("endTime")),
    maxDepth: S.optional(S.Number).pipe(T.HttpQuery("maxDepth")),
    accept: S.optional(S.String).pipe(T.HttpHeader("Accept")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/profilingGroups/{profilingGroupName}/profile",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetProfileRequest",
}) as any as S.Schema<GetProfileRequest>;
export interface GetProfileResponse {
  profile: T.StreamingOutputBody;
  contentType: string;
  contentEncoding?: string;
}
export const GetProfileResponse = S.suspend(() =>
  S.Struct({
    profile: T.StreamingOutput.pipe(T.HttpPayload()),
    contentType: S.String.pipe(T.HttpHeader("Content-Type")),
    contentEncoding: S.optional(S.String).pipe(
      T.HttpHeader("Content-Encoding"),
    ),
  }),
).annotate({
  identifier: "GetProfileResponse",
}) as any as S.Schema<GetProfileResponse>;
export interface GetRecommendationsRequest {
  profilingGroupName: string;
  startTime: Date;
  endTime: Date;
  locale?: string;
}
export const GetRecommendationsRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetRecommendationsRequest",
}) as any as S.Schema<GetRecommendationsRequest>;
export type TargetFrame = string[];
export const TargetFrame = S.Array(S.String);
export type TargetFrames = string[][];
export const TargetFrames = S.Array(TargetFrame);
export type Strings = string[];
export const Strings = S.Array(S.String);
export interface Pattern {
  id?: string;
  name?: string;
  description?: string;
  resolutionSteps?: string;
  targetFrames?: string[][];
  thresholdPercent?: number;
  countersToAggregate?: string[];
}
export const Pattern = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    resolutionSteps: S.optional(S.String),
    targetFrames: S.optional(TargetFrames),
    thresholdPercent: S.optional(S.Number),
    countersToAggregate: S.optional(Strings),
  }),
).annotate({ identifier: "Pattern" }) as any as S.Schema<Pattern>;
export interface Match {
  targetFramesIndex?: number;
  frameAddress?: string;
  thresholdBreachValue?: number;
}
export const Match = S.suspend(() =>
  S.Struct({
    targetFramesIndex: S.optional(S.Number),
    frameAddress: S.optional(S.String),
    thresholdBreachValue: S.optional(S.Number),
  }),
).annotate({ identifier: "Match" }) as any as S.Schema<Match>;
export type Matches = Match[];
export const Matches = S.Array(Match);
export interface Recommendation {
  allMatchesCount: number;
  allMatchesSum: number;
  pattern: Pattern;
  topMatches: Match[];
  startTime: Date;
  endTime: Date;
}
export const Recommendation = S.suspend(() =>
  S.Struct({
    allMatchesCount: S.Number,
    allMatchesSum: S.Number,
    pattern: Pattern,
    topMatches: Matches,
    startTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    endTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({ identifier: "Recommendation" }) as any as S.Schema<Recommendation>;
export type Recommendations = Recommendation[];
export const Recommendations = S.Array(Recommendation);
export interface Metric {
  frameName: string;
  type: string;
  threadStates: string[];
}
export const Metric = S.suspend(() =>
  S.Struct({ frameName: S.String, type: S.String, threadStates: Strings }),
).annotate({ identifier: "Metric" }) as any as S.Schema<Metric>;
export interface UserFeedback {
  type: string;
}
export const UserFeedback = S.suspend(() =>
  S.Struct({ type: S.String }),
).annotate({ identifier: "UserFeedback" }) as any as S.Schema<UserFeedback>;
export interface AnomalyInstance {
  id: string;
  startTime: Date;
  endTime?: Date;
  userFeedback?: UserFeedback;
}
export const AnomalyInstance = S.suspend(() =>
  S.Struct({
    id: S.String,
    startTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    userFeedback: S.optional(UserFeedback),
  }),
).annotate({
  identifier: "AnomalyInstance",
}) as any as S.Schema<AnomalyInstance>;
export type AnomalyInstances = AnomalyInstance[];
export const AnomalyInstances = S.Array(AnomalyInstance);
export interface Anomaly {
  metric: Metric;
  reason: string;
  instances: AnomalyInstance[];
}
export const Anomaly = S.suspend(() =>
  S.Struct({ metric: Metric, reason: S.String, instances: AnomalyInstances }),
).annotate({ identifier: "Anomaly" }) as any as S.Schema<Anomaly>;
export type Anomalies = Anomaly[];
export const Anomalies = S.Array(Anomaly);
export interface GetRecommendationsResponse {
  profilingGroupName: string;
  profileStartTime: Date;
  profileEndTime: Date;
  recommendations: Recommendation[];
  anomalies: Anomaly[];
}
export const GetRecommendationsResponse = S.suspend(() =>
  S.Struct({
    profilingGroupName: S.String,
    profileStartTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    profileEndTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    recommendations: Recommendations,
    anomalies: Anomalies,
  }),
).annotate({
  identifier: "GetRecommendationsResponse",
}) as any as S.Schema<GetRecommendationsResponse>;
export interface ListFindingsReportsRequest {
  profilingGroupName: string;
  startTime: Date;
  endTime: Date;
  nextToken?: string;
  maxResults?: number;
  dailyReportsOnly?: boolean;
}
export const ListFindingsReportsRequest = S.suspend(() =>
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
    dailyReportsOnly: S.optional(S.Boolean).pipe(
      T.HttpQuery("dailyReportsOnly"),
    ),
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
).annotate({
  identifier: "ListFindingsReportsRequest",
}) as any as S.Schema<ListFindingsReportsRequest>;
export interface ListFindingsReportsResponse {
  findingsReportSummaries: FindingsReportSummary[];
  nextToken?: string;
}
export const ListFindingsReportsResponse = S.suspend(() =>
  S.Struct({
    findingsReportSummaries: FindingsReportSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListFindingsReportsResponse",
}) as any as S.Schema<ListFindingsReportsResponse>;
export interface ListProfileTimesRequest {
  profilingGroupName: string;
  startTime: Date;
  endTime: Date;
  period: string;
  orderBy?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListProfileTimesRequest = S.suspend(() =>
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
      T.Http({
        method: "GET",
        uri: "/profilingGroups/{profilingGroupName}/profileTimes",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListProfileTimesRequest",
}) as any as S.Schema<ListProfileTimesRequest>;
export interface ProfileTime {
  start?: Date;
}
export const ProfileTime = S.suspend(() =>
  S.Struct({
    start: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({ identifier: "ProfileTime" }) as any as S.Schema<ProfileTime>;
export type ProfileTimes = ProfileTime[];
export const ProfileTimes = S.Array(ProfileTime);
export interface ListProfileTimesResponse {
  profileTimes: ProfileTime[];
  nextToken?: string;
}
export const ListProfileTimesResponse = S.suspend(() =>
  S.Struct({ profileTimes: ProfileTimes, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListProfileTimesResponse",
}) as any as S.Schema<ListProfileTimesResponse>;
export interface PostAgentProfileRequest {
  profilingGroupName: string;
  agentProfile: T.StreamingInputBody;
  profileToken?: string;
  contentType: string;
}
export const PostAgentProfileRequest = S.suspend(() =>
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
      T.Http({
        method: "POST",
        uri: "/profilingGroups/{profilingGroupName}/agentProfile",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PostAgentProfileRequest",
}) as any as S.Schema<PostAgentProfileRequest>;
export interface PostAgentProfileResponse {}
export const PostAgentProfileResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "PostAgentProfileResponse",
}) as any as S.Schema<PostAgentProfileResponse>;
export type Principals = string[];
export const Principals = S.Array(S.String);
export interface PutPermissionRequest {
  profilingGroupName: string;
  actionGroup: string;
  principals: string[];
  revisionId?: string;
}
export const PutPermissionRequest = S.suspend(() =>
  S.Struct({
    profilingGroupName: S.String.pipe(T.HttpLabel("profilingGroupName")),
    actionGroup: S.String.pipe(T.HttpLabel("actionGroup")),
    principals: Principals,
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
).annotate({
  identifier: "PutPermissionRequest",
}) as any as S.Schema<PutPermissionRequest>;
export interface PutPermissionResponse {
  policy: string;
  revisionId: string;
}
export const PutPermissionResponse = S.suspend(() =>
  S.Struct({ policy: S.String, revisionId: S.String }),
).annotate({
  identifier: "PutPermissionResponse",
}) as any as S.Schema<PutPermissionResponse>;
export interface RemoveNotificationChannelRequest {
  profilingGroupName: string;
  channelId: string;
}
export const RemoveNotificationChannelRequest = S.suspend(() =>
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
).annotate({
  identifier: "RemoveNotificationChannelRequest",
}) as any as S.Schema<RemoveNotificationChannelRequest>;
export interface RemoveNotificationChannelResponse {
  notificationConfiguration?: NotificationConfiguration;
}
export const RemoveNotificationChannelResponse = S.suspend(() =>
  S.Struct({
    notificationConfiguration: S.optional(NotificationConfiguration),
  }),
).annotate({
  identifier: "RemoveNotificationChannelResponse",
}) as any as S.Schema<RemoveNotificationChannelResponse>;
export interface RemovePermissionRequest {
  profilingGroupName: string;
  actionGroup: string;
  revisionId: string;
}
export const RemovePermissionRequest = S.suspend(() =>
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
).annotate({
  identifier: "RemovePermissionRequest",
}) as any as S.Schema<RemovePermissionRequest>;
export interface RemovePermissionResponse {
  policy: string;
  revisionId: string;
}
export const RemovePermissionResponse = S.suspend(() =>
  S.Struct({ policy: S.String, revisionId: S.String }),
).annotate({
  identifier: "RemovePermissionResponse",
}) as any as S.Schema<RemovePermissionResponse>;
export interface SubmitFeedbackRequest {
  profilingGroupName: string;
  anomalyInstanceId: string;
  type: string;
  comment?: string;
}
export const SubmitFeedbackRequest = S.suspend(() =>
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
).annotate({
  identifier: "SubmitFeedbackRequest",
}) as any as S.Schema<SubmitFeedbackRequest>;
export interface SubmitFeedbackResponse {}
export const SubmitFeedbackResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "SubmitFeedbackResponse",
}) as any as S.Schema<SubmitFeedbackResponse>;

//# Errors
export class InternalServerException extends S.TaggedErrorClass<InternalServerException>()(
  "InternalServerException",
  { message: S.String },
  T.Retryable(),
).pipe(C.withServerError, C.withRetryableError) {}
export class ThrottlingException extends S.TaggedErrorClass<ThrottlingException>()(
  "ThrottlingException",
  { message: S.String },
  T.Retryable(),
).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException extends S.TaggedErrorClass<ValidationException>()(
  "ValidationException",
  { message: S.String },
).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { message: S.String },
).pipe(C.withBadRequestError) {}
export class ConflictException extends S.TaggedErrorClass<ConflictException>()(
  "ConflictException",
  { message: S.String },
).pipe(C.withConflictError) {}
export class ServiceQuotaExceededException extends S.TaggedErrorClass<ServiceQuotaExceededException>()(
  "ServiceQuotaExceededException",
  { message: S.String },
  T.Retryable(),
).pipe(C.withQuotaError, C.withRetryableError) {}

//# Operations
/**
 * Returns a list of
 *
 * `FindingsReportSummary`
 *
 * objects that contain analysis results for all profiling groups in your AWS account.
 */
export const getFindingsReportAccountSummary: API.OperationMethod<
  GetFindingsReportAccountSummaryRequest,
  GetFindingsReportAccountSummaryResponse,
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: GetFindingsReportAccountSummaryRequest,
  ) => stream.Stream<
    GetFindingsReportAccountSummaryResponse,
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: GetFindingsReportAccountSummaryRequest,
  ) => stream.Stream<
    unknown,
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: GetFindingsReportAccountSummaryRequest,
  output: GetFindingsReportAccountSummaryResponse,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Returns a list of the tags that are assigned to a specified resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
/**
 * Use to assign one or more tags to a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
/**
 * Use to remove one or more tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
/**
 * Creates a profiling group.
 */
export const createProfilingGroup: API.OperationMethod<
  CreateProfilingGroupRequest,
  CreateProfilingGroupResponse,
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProfilingGroupRequest,
  output: CreateProfilingGroupResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Returns a
 * `ProfilingGroupDescription`
 *
 * object that contains information about the requested profiling group.
 */
export const describeProfilingGroup: API.OperationMethod<
  DescribeProfilingGroupRequest,
  DescribeProfilingGroupResponse,
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeProfilingGroupRequest,
  output: DescribeProfilingGroupResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Updates a profiling group.
 */
export const updateProfilingGroup: API.OperationMethod<
  UpdateProfilingGroupRequest,
  UpdateProfilingGroupResponse,
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateProfilingGroupRequest,
  output: UpdateProfilingGroupResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes a profiling group.
 */
export const deleteProfilingGroup: API.OperationMethod<
  DeleteProfilingGroupRequest,
  DeleteProfilingGroupResponse,
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProfilingGroupRequest,
  output: DeleteProfilingGroupResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Returns a list of profiling groups. The profiling groups are returned as
 *
 * `ProfilingGroupDescription`
 *
 * objects.
 */
export const listProfilingGroups: API.OperationMethod<
  ListProfilingGroupsRequest,
  ListProfilingGroupsResponse,
  InternalServerException | ThrottlingException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListProfilingGroupsRequest,
  ) => stream.Stream<
    ListProfilingGroupsResponse,
    InternalServerException | ThrottlingException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListProfilingGroupsRequest,
  ) => stream.Stream<
    unknown,
    InternalServerException | ThrottlingException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProfilingGroupsRequest,
  output: ListProfilingGroupsResponse,
  errors: [InternalServerException, ThrottlingException],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Add up to 2 anomaly notifications channels for a profiling group.
 */
export const addNotificationChannels: API.OperationMethod<
  AddNotificationChannelsRequest,
  AddNotificationChannelsResponse,
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AddNotificationChannelsRequest,
  output: AddNotificationChannelsResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Returns the time series of values for a requested list
 * of frame metrics from a time period.
 */
export const batchGetFrameMetricData: API.OperationMethod<
  BatchGetFrameMetricDataRequest,
  BatchGetFrameMetricDataResponse,
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchGetFrameMetricDataRequest,
  output: BatchGetFrameMetricDataResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Used by profiler agents to report their current state and to receive remote
 * configuration updates. For example, `ConfigureAgent` can be used
 * to tell an agent whether to profile or not and for how long to return profiling data.
 */
export const configureAgent: API.OperationMethod<
  ConfigureAgentRequest,
  ConfigureAgentResponse,
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ConfigureAgentRequest,
  output: ConfigureAgentResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Get the current configuration for anomaly notifications for a profiling group.
 */
export const getNotificationConfiguration: API.OperationMethod<
  GetNotificationConfigurationRequest,
  GetNotificationConfigurationResponse,
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetNotificationConfigurationRequest,
  output: GetNotificationConfigurationResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Returns the JSON-formatted resource-based policy on a profiling group.
 */
export const getPolicy: API.OperationMethod<
  GetPolicyRequest,
  GetPolicyResponse,
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPolicyRequest,
  output: GetPolicyResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
}));
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
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProfileRequest,
  output: GetProfileResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
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
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRecommendationsRequest,
  output: GetRecommendationsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * List the available reports for a given profiling group and time range.
 */
export const listFindingsReports: API.OperationMethod<
  ListFindingsReportsRequest,
  ListFindingsReportsResponse,
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListFindingsReportsRequest,
  ) => stream.Stream<
    ListFindingsReportsResponse,
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListFindingsReportsRequest,
  ) => stream.Stream<
    unknown,
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListFindingsReportsRequest,
  output: ListFindingsReportsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Lists the start times of the available aggregated profiles of a profiling group
 * for an aggregation period within the specified time range.
 */
export const listProfileTimes: API.OperationMethod<
  ListProfileTimesRequest,
  ListProfileTimesResponse,
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListProfileTimesRequest,
  ) => stream.Stream<
    ListProfileTimesResponse,
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListProfileTimesRequest,
  ) => stream.Stream<
    ProfileTime,
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProfileTimesRequest,
  output: ListProfileTimesResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "profileTimes",
    pageSize: "maxResults",
  } as const,
}));
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
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PostAgentProfileRequest,
  output: PostAgentProfileResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
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
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutPermissionRequest,
  output: PutPermissionResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Remove one anomaly notifications channel for a profiling group.
 */
export const removeNotificationChannel: API.OperationMethod<
  RemoveNotificationChannelRequest,
  RemoveNotificationChannelResponse,
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RemoveNotificationChannelRequest,
  output: RemoveNotificationChannelResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
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
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RemovePermissionRequest,
  output: RemovePermissionResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Sends feedback to CodeGuru Profiler about whether the anomaly detected by the analysis is
 * useful or not.
 */
export const submitFeedback: API.OperationMethod<
  SubmitFeedbackRequest,
  SubmitFeedbackResponse,
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SubmitFeedbackRequest,
  output: SubmitFeedbackResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
