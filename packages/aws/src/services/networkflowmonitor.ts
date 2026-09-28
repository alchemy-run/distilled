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
  sdkId: "NetworkFlowMonitor",
  target: "NetworkFlowMonitor",
  version: "2023-04-19",
  sigv4: "networkflowmonitor",
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
              `https://networkflowmonitor-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(
            `https://networkflowmonitor.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
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
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type ResourceName = string;
export type MonitorLocalResourceType =
  | "AWS::EC2::VPC"
  | "AWS::AvailabilityZone"
  | "AWS::EC2::Subnet"
  | "AWS::Region"
  | "AWS::EKS::Cluster"
  | (string & {});
export interface MonitorLocalResource {
  type: MonitorLocalResourceType;
  identifier: string;
}
export type MonitorLocalResources = MonitorLocalResource[];
export type MonitorRemoteResourceType =
  | "AWS::EC2::VPC"
  | "AWS::AvailabilityZone"
  | "AWS::EC2::Subnet"
  | "AWS::AWSService"
  | "AWS::Region"
  | (string & {});
export interface MonitorRemoteResource {
  type: MonitorRemoteResourceType;
  identifier: string;
}
export type MonitorRemoteResources = MonitorRemoteResource[];
export type Arn = string;
export type UuidString = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateMonitorInput {
  monitorName: string;
  localResources: MonitorLocalResource[];
  remoteResources?: MonitorRemoteResource[];
  scopeArn: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type MonitorArn = string;
export type MonitorStatus =
  | "PENDING"
  | "ACTIVE"
  | "INACTIVE"
  | "ERROR"
  | "DELETING"
  | (string & {});
export type Iso8601Timestamp = Date;
export interface CreateMonitorOutput {
  monitorArn: string;
  monitorName: string;
  monitorStatus: MonitorStatus;
  localResources: MonitorLocalResource[];
  remoteResources: MonitorRemoteResource[];
  createdAt: Date;
  modifiedAt: Date;
  tags?: { [key: string]: string | undefined };
}
export type AccountId = string;
export type TargetId = { accountId: string };
export type TargetType = "ACCOUNT" | (string & {});
export interface TargetIdentifier {
  targetId: TargetId;
  targetType: TargetType;
}
export type AwsRegion = string;
export interface TargetResource {
  targetIdentifier: TargetIdentifier;
  region: string;
}
export type TargetResourceList = TargetResource[];
export interface CreateScopeInput {
  targets: TargetResource[];
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type ScopeId = string;
export type ScopeStatus =
  | "SUCCEEDED"
  | "IN_PROGRESS"
  | "FAILED"
  | "DEACTIVATING"
  | "DEACTIVATED"
  | (string & {});
export interface CreateScopeOutput {
  scopeId: string;
  status: ScopeStatus;
  scopeArn: string;
  tags?: { [key: string]: string | undefined };
}
export interface DeleteMonitorInput {
  monitorName: string;
}
export interface DeleteMonitorOutput {}
export interface DeleteScopeInput {
  scopeId: string;
}
export interface DeleteScopeOutput {}
export interface GetMonitorInput {
  monitorName: string;
}
export interface GetMonitorOutput {
  monitorArn: string;
  monitorName: string;
  monitorStatus: MonitorStatus;
  localResources: MonitorLocalResource[];
  remoteResources: MonitorRemoteResource[];
  createdAt: Date;
  modifiedAt: Date;
  tags?: { [key: string]: string | undefined };
}
export interface GetQueryResultsMonitorTopContributorsInput {
  monitorName: string;
  queryId: string;
  nextToken?: string;
  maxResults?: number;
}
export type MetricUnit =
  | "Seconds"
  | "Microseconds"
  | "Milliseconds"
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
export type InstanceId = string;
export type VpcId = string;
export type AvailabilityZone = string;
export type SubnetId = string;
export type DestinationCategory =
  | "INTRA_AZ"
  | "INTER_AZ"
  | "INTER_VPC"
  | "UNCLASSIFIED"
  | "AMAZON_S3"
  | "AMAZON_DYNAMODB"
  | "INTER_REGION"
  | (string & {});
export type Component = string;
export type ComponentType = string;
export interface TraversedComponent {
  componentId?: string;
  componentType?: string;
  componentArn?: string;
  serviceName?: string;
}
export type TraversedConstructsList = TraversedComponent[];
export interface KubernetesMetadata {
  localServiceName?: string;
  localPodName?: string;
  localPodNamespace?: string;
  remoteServiceName?: string;
  remotePodName?: string;
  remotePodNamespace?: string;
}
export type InstanceArn = string;
export type SubnetArn = string;
export type VpcArn = string;
export interface MonitorTopContributorsRow {
  localIp?: string;
  snatIp?: string;
  localInstanceId?: string;
  localVpcId?: string;
  localRegion?: string;
  localAz?: string;
  localSubnetId?: string;
  targetPort?: number;
  destinationCategory?: DestinationCategory;
  remoteVpcId?: string;
  remoteRegion?: string;
  remoteAz?: string;
  remoteSubnetId?: string;
  remoteInstanceId?: string;
  remoteIp?: string;
  dnatIp?: string;
  value?: number;
  traversedConstructs?: TraversedComponent[];
  kubernetesMetadata?: KubernetesMetadata;
  localInstanceArn?: string;
  localSubnetArn?: string;
  localVpcArn?: string;
  remoteInstanceArn?: string;
  remoteSubnetArn?: string;
  remoteVpcArn?: string;
}
export type MonitorTopContributorsRowList = MonitorTopContributorsRow[];
export interface GetQueryResultsMonitorTopContributorsOutput {
  unit?: MetricUnit;
  topContributors?: MonitorTopContributorsRow[];
  nextToken?: string;
}
export interface GetQueryResultsWorkloadInsightsTopContributorsInput {
  scopeId: string;
  queryId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface WorkloadInsightsTopContributorsRow {
  accountId?: string;
  localSubnetId?: string;
  localAz?: string;
  localVpcId?: string;
  localRegion?: string;
  remoteIdentifier?: string;
  value?: number;
  localSubnetArn?: string;
  localVpcArn?: string;
}
export type WorkloadInsightsTopContributorsRowList =
  WorkloadInsightsTopContributorsRow[];
export interface GetQueryResultsWorkloadInsightsTopContributorsOutput {
  topContributors?: WorkloadInsightsTopContributorsRow[];
  nextToken?: string;
}
export interface GetQueryResultsWorkloadInsightsTopContributorsDataInput {
  scopeId: string;
  queryId: string;
  nextToken?: string;
  maxResults?: number;
}
export type WorkloadInsightsTopContributorsTimestampsList = Date[];
export type WorkloadInsightsTopContributorsValuesList = number[];
export interface WorkloadInsightsTopContributorsDataPoint {
  timestamps: Date[];
  values: number[];
  label: string;
}
export type WorkloadInsightsTopContributorsDataPoints =
  WorkloadInsightsTopContributorsDataPoint[];
export interface GetQueryResultsWorkloadInsightsTopContributorsDataOutput {
  unit: MetricUnit;
  datapoints: WorkloadInsightsTopContributorsDataPoint[];
  nextToken?: string;
}
export interface GetQueryStatusMonitorTopContributorsInput {
  monitorName: string;
  queryId: string;
}
export type QueryStatus =
  | "QUEUED"
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | "CANCELED"
  | (string & {});
export interface GetQueryStatusMonitorTopContributorsOutput {
  status: QueryStatus;
}
export interface GetQueryStatusWorkloadInsightsTopContributorsInput {
  scopeId: string;
  queryId: string;
}
export interface GetQueryStatusWorkloadInsightsTopContributorsOutput {
  status: QueryStatus;
}
export interface GetQueryStatusWorkloadInsightsTopContributorsDataInput {
  scopeId: string;
  queryId: string;
}
export interface GetQueryStatusWorkloadInsightsTopContributorsDataOutput {
  status: QueryStatus;
}
export interface GetScopeInput {
  scopeId: string;
}
export interface GetScopeOutput {
  scopeId: string;
  status: ScopeStatus;
  scopeArn: string;
  targets: TargetResource[];
  tags?: { [key: string]: string | undefined };
}
export type MaxResults = number;
export interface ListMonitorsInput {
  nextToken?: string;
  maxResults?: number;
  monitorStatus?: MonitorStatus;
}
export interface MonitorSummary {
  monitorArn: string;
  monitorName: string;
  monitorStatus: MonitorStatus;
}
export type MonitorList = MonitorSummary[];
export interface ListMonitorsOutput {
  monitors: MonitorSummary[];
  nextToken?: string;
}
export interface ListScopesInput {
  nextToken?: string;
  maxResults?: number;
}
export interface ScopeSummary {
  scopeId: string;
  status: ScopeStatus;
  scopeArn: string;
}
export type ScopeSummaryList = ScopeSummary[];
export interface ListScopesOutput {
  scopes: ScopeSummary[];
  nextToken?: string;
}
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export interface ListTagsForResourceOutput {
  tags?: { [key: string]: string | undefined };
}
export type MonitorMetric =
  | "ROUND_TRIP_TIME"
  | "TIMEOUTS"
  | "RETRANSMISSIONS"
  | "DATA_TRANSFERRED"
  | (string & {});
export type Limit = number;
export interface StartQueryMonitorTopContributorsInput {
  monitorName: string;
  startTime: Date;
  endTime: Date;
  metricName: MonitorMetric;
  destinationCategory: DestinationCategory;
  limit?: number;
}
export interface StartQueryMonitorTopContributorsOutput {
  queryId: string;
}
export type WorkloadInsightsMetric =
  | "TIMEOUTS"
  | "RETRANSMISSIONS"
  | "DATA_TRANSFERRED"
  | (string & {});
export interface StartQueryWorkloadInsightsTopContributorsInput {
  scopeId: string;
  startTime: Date;
  endTime: Date;
  metricName: WorkloadInsightsMetric;
  destinationCategory: DestinationCategory;
  limit?: number;
}
export interface StartQueryWorkloadInsightsTopContributorsOutput {
  queryId: string;
}
export interface StartQueryWorkloadInsightsTopContributorsDataInput {
  scopeId: string;
  startTime: Date;
  endTime: Date;
  metricName: WorkloadInsightsMetric;
  destinationCategory: DestinationCategory;
}
export interface StartQueryWorkloadInsightsTopContributorsDataOutput {
  queryId: string;
}
export interface StopQueryMonitorTopContributorsInput {
  monitorName: string;
  queryId: string;
}
export interface StopQueryMonitorTopContributorsOutput {}
export interface StopQueryWorkloadInsightsTopContributorsInput {
  scopeId: string;
  queryId: string;
}
export interface StopQueryWorkloadInsightsTopContributorsOutput {}
export interface StopQueryWorkloadInsightsTopContributorsDataInput {
  scopeId: string;
  queryId: string;
}
export interface StopQueryWorkloadInsightsTopContributorsDataOutput {}
export interface TagResourceInput {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceOutput {}
export type TagKeyList = string[];
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceOutput {}
export interface UpdateMonitorInput {
  monitorName: string;
  localResourcesToAdd?: MonitorLocalResource[];
  localResourcesToRemove?: MonitorLocalResource[];
  remoteResourcesToAdd?: MonitorRemoteResource[];
  remoteResourcesToRemove?: MonitorRemoteResource[];
  clientToken?: string;
}
export interface UpdateMonitorOutput {
  monitorArn: string;
  monitorName: string;
  monitorStatus: MonitorStatus;
  localResources: MonitorLocalResource[];
  remoteResources: MonitorRemoteResource[];
  createdAt: Date;
  modifiedAt: Date;
  tags?: { [key: string]: string | undefined };
}
export interface UpdateScopeInput {
  scopeId: string;
  resourcesToAdd?: TargetResource[];
  resourcesToDelete?: TargetResource[];
}
export interface UpdateScopeOutput {
  scopeId: string;
  status: ScopeStatus;
  scopeArn: string;
  tags?: { [key: string]: string | undefined };
}
export type CreateMonitorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a monitor for specific network flows between local and remote resources, so that you can monitor network performance for one or several of your workloads. For each monitor, Network Flow Monitor publishes detailed end-to-end performance metrics and a network health indicator (NHI) that informs you whether there were Amazon Web Services network issues for one or more of the network flows tracked by a monitor, during a time period that you choose.
 */
export const createMonitor: API.OperationMethod<
  CreateMonitorInput,
  CreateMonitorOutput,
  CreateMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /monitors",
    input: {
      monitorName: 0,
      localResources: D.list(i_MonitorLocalResource),
      remoteResources: D.list(i_MonitorRemoteResource),
      scopeArn: 0,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    output: { createdAt: D.ts, modifiedAt: D.ts },
    body: true,
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
  operationName: "CreateMonitor",
})) as any;

export type CreateScopeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * In Network Flow Monitor, you specify a scope for the service to generate metrics for. By using the scope, Network Flow Monitor can generate a topology of all the resources to measure performance metrics for. When you create a scope, you enable permissions for Network Flow Monitor.
 *
 * A scope is a Region-account pair or multiple Region-account pairs. Network Flow Monitor uses your scope to determine all the resources (the topology) where Network Flow Monitor will gather network flow performance metrics for you. To provide performance metrics, Network Flow Monitor uses the data that is sent by the Network Flow Monitor agents you install on the resources.
 *
 * To define the Region-account pairs for your scope, the Network Flow Monitor API uses the following constucts, which allow for future flexibility in defining scopes:
 *
 * - *Targets*, which are arrays of targetResources.
 *
 * - *Target resources*, which are Region-targetIdentifier pairs.
 *
 * - *Target identifiers*, made up of a targetID (currently always an account ID) and a targetType (currently always an account).
 */
export const createScope: API.OperationMethod<
  CreateScopeInput,
  CreateScopeOutput,
  CreateScopeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /scopes",
    input: {
      targets: D.list(i_TargetResource),
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    body: true,
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
  operationName: "CreateScope",
})) as any;

export type DeleteMonitorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a monitor in Network Flow Monitor.
 */
export const deleteMonitor: API.OperationMethod<
  DeleteMonitorInput,
  DeleteMonitorOutput,
  DeleteMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /monitors/{monitorName}",
    input: { monitorName: 0 },
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
  operationName: "DeleteMonitor",
})) as any;

export type DeleteScopeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a scope that has been defined.
 */
export const deleteScope: API.OperationMethod<
  DeleteScopeInput,
  DeleteScopeOutput,
  DeleteScopeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /scopes/{scopeId}",
    input: { scopeId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteScope",
})) as any;

export type GetMonitorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a monitor in Network Flow Monitor based on a monitor name. The information returned includes the Amazon Resource Name (ARN), create time, modified time, resources included in the monitor, and status information.
 */
export const getMonitor: API.OperationMethod<
  GetMonitorInput,
  GetMonitorOutput,
  GetMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /monitors/{monitorName}",
    input: { monitorName: 0 },
    output: { createdAt: D.ts, modifiedAt: D.ts },
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
  operationName: "GetMonitor",
})) as any;

export type GetQueryResultsMonitorTopContributorsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Return the data for a query with the Network Flow Monitor query interface. You specify the query that you want to return results for by providing a query ID and a monitor name. This query returns the top contributors for a specific monitor.
 *
 * Create a query ID for this call by calling the corresponding API call to start the query, `StartQueryMonitorTopContributors`. Use the scope ID that was returned for your account by `CreateScope`.
 *
 * Top contributors in Network Flow Monitor are network flows with the highest values for a specific metric type. Top contributors can be across all workload insights, for a given scope, or for a specific monitor. Use the applicable call for the top contributors that you want to be returned.
 */
export const getQueryResultsMonitorTopContributors: API.PaginatedOperationMethod<
  GetQueryResultsMonitorTopContributorsInput,
  GetQueryResultsMonitorTopContributorsOutput,
  GetQueryResultsMonitorTopContributorsError,
  Credentials | HttpClient.HttpClient,
  MonitorTopContributorsRow
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /monitors/{monitorName}/topContributorsQueries/{queryId}/results",
    input: {
      monitorName: 0,
      queryId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueryResultsMonitorTopContributors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "topContributors",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetQueryResultsWorkloadInsightsTopContributorsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Return the data for a query with the Network Flow Monitor query interface. You specify the query that you want to return results for by providing a query ID and a monitor name.
 *
 * This query returns the top contributors for a scope for workload insights. Workload insights provide a high level view of network flow performance data collected by agents. To return the data for the top contributors, see `GetQueryResultsWorkloadInsightsTopContributorsData`.
 *
 * Create a query ID for this call by calling the corresponding API call to start the query, `StartQueryWorkloadInsightsTopContributors`. Use the scope ID that was returned for your account by `CreateScope`.
 *
 * Top contributors in Network Flow Monitor are network flows with the highest values for a specific metric type. Top contributors can be across all workload insights, for a given scope, or for a specific monitor. Use the applicable call for the top contributors that you want to be returned.
 */
export const getQueryResultsWorkloadInsightsTopContributors: API.PaginatedOperationMethod<
  GetQueryResultsWorkloadInsightsTopContributorsInput,
  GetQueryResultsWorkloadInsightsTopContributorsOutput,
  GetQueryResultsWorkloadInsightsTopContributorsError,
  Credentials | HttpClient.HttpClient,
  WorkloadInsightsTopContributorsRow
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /workloadInsights/{scopeId}/topContributorsQueries/{queryId}/results",
    input: {
      scopeId: 0,
      queryId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueryResultsWorkloadInsightsTopContributors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "topContributors",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetQueryResultsWorkloadInsightsTopContributorsDataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Return the data for a query with the Network Flow Monitor query interface. Specify the query that you want to return results for by providing a query ID and a scope ID.
 *
 * This query returns the data for top contributors for workload insights for a specific scope. Workload insights provide a high level view of network flow performance data collected by agents for a scope. To return just the top contributors, see `GetQueryResultsWorkloadInsightsTopContributors`.
 *
 * Create a query ID for this call by calling the corresponding API call to start the query, `StartQueryWorkloadInsightsTopContributorsData`. Use the scope ID that was returned for your account by `CreateScope`.
 *
 * Top contributors in Network Flow Monitor are network flows with the highest values for a specific metric type. Top contributors can be across all workload insights, for a given scope, or for a specific monitor. Use the applicable call for the top contributors that you want to be returned.
 *
 * The top contributor network flows overall are for a specific metric type, for example, the number of retransmissions.
 */
export const getQueryResultsWorkloadInsightsTopContributorsData: API.PaginatedOperationMethod<
  GetQueryResultsWorkloadInsightsTopContributorsDataInput,
  GetQueryResultsWorkloadInsightsTopContributorsDataOutput,
  GetQueryResultsWorkloadInsightsTopContributorsDataError,
  Credentials | HttpClient.HttpClient,
  WorkloadInsightsTopContributorsDataPoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /workloadInsights/{scopeId}/topContributorsDataQueries/{queryId}/results",
    input: {
      scopeId: 0,
      queryId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { datapoints: D.list({ timestamps: D.list(D.ts) }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueryResultsWorkloadInsightsTopContributorsData",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "datapoints",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetQueryStatusMonitorTopContributorsError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the current status of a query for the Network Flow Monitor query interface, for a specified query ID and monitor. This call returns the query status for the top contributors for a monitor.
 *
 * When you create a query, use this call to check the status of the query to make sure that it has has `SUCCEEDED` before you review the results. Use the same query ID that you used for the corresponding API call to start (create) the query, `StartQueryMonitorTopContributors`.
 *
 * When you run a query, use this call to check the status of the query to make sure that the query has `SUCCEEDED` before you review the results.
 */
export const getQueryStatusMonitorTopContributors: API.OperationMethod<
  GetQueryStatusMonitorTopContributorsInput,
  GetQueryStatusMonitorTopContributorsOutput,
  GetQueryStatusMonitorTopContributorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /monitors/{monitorName}/topContributorsQueries/{queryId}/status",
    input: { monitorName: 0, queryId: 0 },
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
  operationName: "GetQueryStatusMonitorTopContributors",
})) as any;

export type GetQueryStatusWorkloadInsightsTopContributorsError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Return the data for a query with the Network Flow Monitor query interface. Specify the query that you want to return results for by providing a query ID and a monitor name. This query returns the top contributors for workload insights.
 *
 * When you start a query, use this call to check the status of the query to make sure that it has has `SUCCEEDED` before you review the results. Use the same query ID that you used for the corresponding API call to start the query, `StartQueryWorkloadInsightsTopContributors`.
 *
 * Top contributors in Network Flow Monitor are network flows with the highest values for a specific metric type. Top contributors can be across all workload insights, for a given scope, or for a specific monitor. Use the applicable call for the top contributors that you want to be returned.
 */
export const getQueryStatusWorkloadInsightsTopContributors: API.OperationMethod<
  GetQueryStatusWorkloadInsightsTopContributorsInput,
  GetQueryStatusWorkloadInsightsTopContributorsOutput,
  GetQueryStatusWorkloadInsightsTopContributorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /workloadInsights/{scopeId}/topContributorsQueries/{queryId}/status",
    input: { scopeId: 0, queryId: 0 },
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
  operationName: "GetQueryStatusWorkloadInsightsTopContributors",
})) as any;

export type GetQueryStatusWorkloadInsightsTopContributorsDataError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the current status of a query for the Network Flow Monitor query interface, for a specified query ID and monitor. This call returns the query status for the top contributors data for workload insights.
 *
 * When you start a query, use this call to check the status of the query to make sure that it has has `SUCCEEDED` before you review the results. Use the same query ID that you used for the corresponding API call to start the query, `StartQueryWorkloadInsightsTopContributorsData`.
 *
 * Top contributors in Network Flow Monitor are network flows with the highest values for a specific metric type. Top contributors can be across all workload insights, for a given scope, or for a specific monitor. Use the applicable call for the top contributors that you want to be returned.
 *
 * The top contributor network flows overall are for a specific metric type, for example, the number of retransmissions.
 */
export const getQueryStatusWorkloadInsightsTopContributorsData: API.OperationMethod<
  GetQueryStatusWorkloadInsightsTopContributorsDataInput,
  GetQueryStatusWorkloadInsightsTopContributorsDataOutput,
  GetQueryStatusWorkloadInsightsTopContributorsDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /workloadInsights/{scopeId}/topContributorsDataQueries/{queryId}/status",
    input: { scopeId: 0, queryId: 0 },
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
  operationName: "GetQueryStatusWorkloadInsightsTopContributorsData",
})) as any;

export type GetScopeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a scope, including the name, status, tags, and target details. The scope in Network Flow Monitor is an account.
 */
export const getScope: API.OperationMethod<
  GetScopeInput,
  GetScopeOutput,
  GetScopeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /scopes/{scopeId}",
    input: { scopeId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetScope",
})) as any;

export type ListMonitorsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all monitors in an account. Optionally, you can list only monitors that have a specific status, by using the `STATUS` parameter.
 */
export const listMonitors: API.PaginatedOperationMethod<
  ListMonitorsInput,
  ListMonitorsOutput,
  ListMonitorsError,
  Credentials | HttpClient.HttpClient,
  MonitorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /monitors",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      monitorStatus: D.m({ query: "monitorStatus" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMonitors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "monitors",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListScopesError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all the scopes for an account.
 */
export const listScopes: API.PaginatedOperationMethod<
  ListScopesInput,
  ListScopesOutput,
  ListScopesError,
  Credentials | HttpClient.HttpClient,
  ScopeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /scopes",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
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
  operationName: "ListScopes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "scopes",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns all the tags for a resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
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
  operationName: "ListTagsForResource",
})) as any;

export type StartQueryMonitorTopContributorsError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a query that you can use with the Network Flow Monitor query interface to return the top contributors for a monitor. Specify the monitor that you want to create the query for.
 *
 * The call returns a query ID that you can use with GetQueryResultsMonitorTopContributors to run the query and return the top contributors for a specific monitor.
 *
 * Top contributors in Network Flow Monitor are network flows with the highest values for a specific metric type. Top contributors can be across all workload insights, for a given scope, or for a specific monitor. Use the applicable APIs for the top contributors that you want to be returned.
 */
export const startQueryMonitorTopContributors: API.OperationMethod<
  StartQueryMonitorTopContributorsInput,
  StartQueryMonitorTopContributorsOutput,
  StartQueryMonitorTopContributorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /monitors/{monitorName}/topContributorsQueries",
    input: {
      monitorName: 0,
      startTime: D.tsAs("date-time"),
      endTime: D.tsAs("date-time"),
      metricName: 0,
      destinationCategory: 0,
      limit: 0,
    },
    body: true,
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
  operationName: "StartQueryMonitorTopContributors",
})) as any;

export type StartQueryWorkloadInsightsTopContributorsError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a query with the Network Flow Monitor query interface that you can run to return workload insights top contributors. Specify the scope that you want to create a query for.
 *
 * The call returns a query ID that you can use with GetQueryResultsWorkloadInsightsTopContributors to run the query and return the top contributors for the workload insights for a scope.
 *
 * Top contributors in Network Flow Monitor are network flows with the highest values for a specific metric type. Top contributors can be across all workload insights, for a given scope, or for a specific monitor. Use the applicable APIs for the top contributors that you want to be returned.
 */
export const startQueryWorkloadInsightsTopContributors: API.OperationMethod<
  StartQueryWorkloadInsightsTopContributorsInput,
  StartQueryWorkloadInsightsTopContributorsOutput,
  StartQueryWorkloadInsightsTopContributorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workloadInsights/{scopeId}/topContributorsQueries",
    input: {
      scopeId: 0,
      startTime: D.tsAs("date-time"),
      endTime: D.tsAs("date-time"),
      metricName: 0,
      destinationCategory: 0,
      limit: 0,
    },
    body: true,
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
  operationName: "StartQueryWorkloadInsightsTopContributors",
})) as any;

export type StartQueryWorkloadInsightsTopContributorsDataError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a query with the Network Flow Monitor query interface that you can run to return data for workload insights top contributors. Specify the scope that you want to create a query for.
 *
 * The call returns a query ID that you can use with GetQueryResultsWorkloadInsightsTopContributorsData to run the query and return the data for the top contributors for the workload insights for a scope.
 *
 * Top contributors in Network Flow Monitor are network flows with the highest values for a specific metric type. Top contributors can be across all workload insights, for a given scope, or for a specific monitor. Use the applicable call for the top contributors that you want to be returned.
 */
export const startQueryWorkloadInsightsTopContributorsData: API.OperationMethod<
  StartQueryWorkloadInsightsTopContributorsDataInput,
  StartQueryWorkloadInsightsTopContributorsDataOutput,
  StartQueryWorkloadInsightsTopContributorsDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workloadInsights/{scopeId}/topContributorsDataQueries",
    input: {
      scopeId: 0,
      startTime: D.tsAs("date-time"),
      endTime: D.tsAs("date-time"),
      metricName: 0,
      destinationCategory: 0,
    },
    body: true,
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
  operationName: "StartQueryWorkloadInsightsTopContributorsData",
})) as any;

export type StopQueryMonitorTopContributorsError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stop a top contributors query for a monitor. Specify the query that you want to stop by providing a query ID and a monitor name.
 *
 * Top contributors in Network Flow Monitor are network flows with the highest values for a specific metric type. Top contributors can be across all workload insights, for a given scope, or for a specific monitor. Use the applicable call for the top contributors that you want to be returned.
 */
export const stopQueryMonitorTopContributors: API.OperationMethod<
  StopQueryMonitorTopContributorsInput,
  StopQueryMonitorTopContributorsOutput,
  StopQueryMonitorTopContributorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /monitors/{monitorName}/topContributorsQueries/{queryId}",
    input: { monitorName: 0, queryId: 0 },
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
  operationName: "StopQueryMonitorTopContributors",
})) as any;

export type StopQueryWorkloadInsightsTopContributorsError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stop a top contributors query for workload insights. Specify the query that you want to stop by providing a query ID and a scope ID.
 *
 * Top contributors in Network Flow Monitor are network flows with the highest values for a specific metric type. Top contributors can be across all workload insights, for a given scope, or for a specific monitor. Use the applicable call for the top contributors that you want to be returned.
 */
export const stopQueryWorkloadInsightsTopContributors: API.OperationMethod<
  StopQueryWorkloadInsightsTopContributorsInput,
  StopQueryWorkloadInsightsTopContributorsOutput,
  StopQueryWorkloadInsightsTopContributorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /workloadInsights/{scopeId}/topContributorsQueries/{queryId}",
    input: { scopeId: 0, queryId: 0 },
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
  operationName: "StopQueryWorkloadInsightsTopContributors",
})) as any;

export type StopQueryWorkloadInsightsTopContributorsDataError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stop a top contributors data query for workload insights. Specify the query that you want to stop by providing a query ID and a scope ID.
 *
 * Top contributors in Network Flow Monitor are network flows with the highest values for a specific metric type. Top contributors can be across all workload insights, for a given scope, or for a specific monitor. Use the applicable call for the top contributors that you want to be returned.
 */
export const stopQueryWorkloadInsightsTopContributorsData: API.OperationMethod<
  StopQueryWorkloadInsightsTopContributorsDataInput,
  StopQueryWorkloadInsightsTopContributorsDataOutput,
  StopQueryWorkloadInsightsTopContributorsDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /workloadInsights/{scopeId}/topContributorsDataQueries/{queryId}",
    input: { scopeId: 0, queryId: 0 },
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
  operationName: "StopQueryWorkloadInsightsTopContributorsData",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds a tag to a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
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
    AccessDeniedException,
    ConflictException,
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
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a tag from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
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
  operationName: "UntagResource",
})) as any;

export type UpdateMonitorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a monitor to add or remove local or remote resources.
 */
export const updateMonitor: API.OperationMethod<
  UpdateMonitorInput,
  UpdateMonitorOutput,
  UpdateMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /monitors/{monitorName}",
    input: {
      monitorName: 0,
      localResourcesToAdd: D.list(i_MonitorLocalResource),
      localResourcesToRemove: D.list(i_MonitorLocalResource),
      remoteResourcesToAdd: D.list(i_MonitorRemoteResource),
      remoteResourcesToRemove: D.list(i_MonitorRemoteResource),
      clientToken: D.m({ idempotency: true }),
    },
    output: { createdAt: D.ts, modifiedAt: D.ts },
    body: true,
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
  operationName: "UpdateMonitor",
})) as any;

export type UpdateScopeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a scope to add or remove resources that you want to be available for Network Flow Monitor to generate metrics for, when you have active agents on those resources sending metrics reports to the Network Flow Monitor backend.
 */
export const updateScope: API.OperationMethod<
  UpdateScopeInput,
  UpdateScopeOutput,
  UpdateScopeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /scopes/{scopeId}",
    input: {
      scopeId: 0,
      resourcesToAdd: D.list(i_TargetResource),
      resourcesToDelete: D.list(i_TargetResource),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateScope",
})) as any;

const i_MonitorLocalResource: D.LazyStruct = () => ({ type: 0, identifier: 0 });
const i_MonitorRemoteResource: D.LazyStruct = () => ({
  type: 0,
  identifier: 0,
});
const i_TargetResource: D.LazyStruct = () => ({
  targetIdentifier: { targetId: { accountId: 0 }, targetType: 0 },
  region: 0,
});
