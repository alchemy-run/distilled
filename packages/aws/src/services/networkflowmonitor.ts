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
  sdkId: "NetworkFlowMonitor",
  serviceShapeName: "NetworkFlowMonitor",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "networkflowmonitor" });
const ver = /*@__PURE__*/ T.ServiceVersion("2023-04-19");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
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
  '{"url":"https://networkflowmonitor.{R}.api.aws","properties":{},"headers":{}}',
  [
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
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type WorkloadInsightsTopContributorsRowList = WorkloadInsightsTopContributorsRow[];
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
export type WorkloadInsightsTopContributorsDataPoints = WorkloadInsightsTopContributorsDataPoint[];
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
  input: __S(192, __c24, 0) as any as S.Schema<CreateMonitorInput>,
  output: __S(202, __c25, 2) as any as S.Schema<CreateMonitorOutput>,
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
}));

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
  input: __S(216, __c27, 0) as any as S.Schema<CreateScopeInput>,
  output: __S(232, __c29, 0) as any as S.Schema<CreateScopeOutput>,
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
}));

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
  input: __S(240, __c30, 0) as any as S.Schema<DeleteMonitorInput>,
  output: __S(248, __c31, 0) as any as S.Schema<DeleteMonitorOutput>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<DeleteScopeInput>,
  output: __S(248, __c31, 0) as any as S.Schema<DeleteScopeOutput>,
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
}));

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
  input: __S(8, __c1, 0) as any as S.Schema<GetMonitorInput>,
  output: __S(202, __c25, 2) as any as S.Schema<GetMonitorOutput>,
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
}));

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
  input: __S(16, __c2, 0) as any as S.Schema<GetQueryResultsMonitorTopContributorsInput>,
  output: __S(22, __c2, 6) as any as S.Schema<GetQueryResultsMonitorTopContributorsOutput>,
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
  input: __S(24, __c3, 0) as any as S.Schema<GetQueryResultsWorkloadInsightsTopContributorsInput>,
  output: __S(27, __c3, 3) as any as S.Schema<GetQueryResultsWorkloadInsightsTopContributorsOutput>,
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
  input: __S(
    32,
    __c4,
    0,
  ) as any as S.Schema<GetQueryResultsWorkloadInsightsTopContributorsDataInput>,
  output: __S(
    37,
    __c4,
    5,
  ) as any as S.Schema<GetQueryResultsWorkloadInsightsTopContributorsDataOutput>,
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
  input: __S(40, __c5, 0) as any as S.Schema<GetQueryStatusMonitorTopContributorsInput>,
  output: __S(48, __c6, 0) as any as S.Schema<GetQueryStatusMonitorTopContributorsOutput>,
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
}));

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
  input: __S(56, __c7, 0) as any as S.Schema<GetQueryStatusWorkloadInsightsTopContributorsInput>,
  output: __S(48, __c6, 0) as any as S.Schema<GetQueryStatusWorkloadInsightsTopContributorsOutput>,
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
}));

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
  input: __S(
    64,
    __c8,
    0,
  ) as any as S.Schema<GetQueryStatusWorkloadInsightsTopContributorsDataInput>,
  output: __S(
    48,
    __c6,
    0,
  ) as any as S.Schema<GetQueryStatusWorkloadInsightsTopContributorsDataOutput>,
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
}));

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
  input: __S(72, __c9, 0) as any as S.Schema<GetScopeInput>,
  output: __S(73, __c9, 1) as any as S.Schema<GetScopeOutput>,
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
}));

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
  input: __S(80, __c10, 0) as any as S.Schema<ListMonitorsInput>,
  output: __S(83, __c10, 3) as any as S.Schema<ListMonitorsOutput>,
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
  input: __S(88, __c11, 0) as any as S.Schema<ListScopesInput>,
  output: __S(91, __c11, 3) as any as S.Schema<ListScopesOutput>,
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
  input: __S(96, __c12, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(97, __c12, 1) as any as S.Schema<ListTagsForResourceOutput>,
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
}));

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
  input: __S(104, __c13, 0) as any as S.Schema<StartQueryMonitorTopContributorsInput>,
  output: __S(112, __c14, 0) as any as S.Schema<StartQueryMonitorTopContributorsOutput>,
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
}));

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
  input: __S(120, __c15, 0) as any as S.Schema<StartQueryWorkloadInsightsTopContributorsInput>,
  output: __S(112, __c14, 0) as any as S.Schema<StartQueryWorkloadInsightsTopContributorsOutput>,
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
}));

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
  input: __S(128, __c16, 0) as any as S.Schema<StartQueryWorkloadInsightsTopContributorsDataInput>,
  output: __S(
    112,
    __c14,
    0,
  ) as any as S.Schema<StartQueryWorkloadInsightsTopContributorsDataOutput>,
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
}));

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
  input: __S(136, __c17, 0) as any as S.Schema<StopQueryMonitorTopContributorsInput>,
  output: __S(248, __c31, 0) as any as S.Schema<StopQueryMonitorTopContributorsOutput>,
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
}));

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
  input: __S(144, __c18, 0) as any as S.Schema<StopQueryWorkloadInsightsTopContributorsInput>,
  output: __S(248, __c31, 0) as any as S.Schema<StopQueryWorkloadInsightsTopContributorsOutput>,
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
}));

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
  input: __S(152, __c19, 0) as any as S.Schema<StopQueryWorkloadInsightsTopContributorsDataInput>,
  output: __S(248, __c31, 0) as any as S.Schema<StopQueryWorkloadInsightsTopContributorsDataOutput>,
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
}));

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
  input: __S(160, __c20, 0) as any as S.Schema<TagResourceInput>,
  output: __S(248, __c31, 0) as any as S.Schema<TagResourceOutput>,
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
}));

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
  input: __S(169, __c21, 1) as any as S.Schema<UntagResourceInput>,
  output: __S(248, __c31, 0) as any as S.Schema<UntagResourceOutput>,
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
}));

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
  input: __S(176, __c22, 0) as any as S.Schema<UpdateMonitorInput>,
  output: __S(202, __c25, 2) as any as S.Schema<UpdateMonitorOutput>,
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
}));

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
  input: __S(184, __c23, 0) as any as S.Schema<UpdateScopeInput>,
  output: __S(232, __c29, 0) as any as S.Schema<UpdateScopeOutput>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ scopeId: S.String.pipe(T.HttpLabel("scopeId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/scopes/{scopeId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteScopeInput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ monitorName: S.String.pipe(T.HttpLabel("monitorName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/monitors/{monitorName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMonitorInput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          monitorName: S.String.pipe(T.HttpLabel("monitorName")),
          queryId: S.String.pipe(T.HttpLabel("queryId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/monitors/{monitorName}/topContributorsQueries/{queryId}/results",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetQueryResultsMonitorTopContributorsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          componentId: S.optional(S.String),
          componentType: S.optional(S.String),
          componentArn: S.optional(S.String),
          serviceName: S.optional(S.String),
        }),
      ).annotate({ identifier: "TraversedComponent" });
    case 2:
      return S.Array(__S(17, __c2, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          localServiceName: S.optional(S.String),
          localPodName: S.optional(S.String),
          localPodNamespace: S.optional(S.String),
          remoteServiceName: S.optional(S.String),
          remotePodName: S.optional(S.String),
          remotePodNamespace: S.optional(S.String),
        }),
      ).annotate({ identifier: "KubernetesMetadata" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          localIp: S.optional(S.String),
          snatIp: S.optional(S.String),
          localInstanceId: S.optional(S.String),
          localVpcId: S.optional(S.String),
          localRegion: S.optional(S.String),
          localAz: S.optional(S.String),
          localSubnetId: S.optional(S.String),
          targetPort: S.optional(S.Number),
          destinationCategory: S.optional(S.String),
          remoteVpcId: S.optional(S.String),
          remoteRegion: S.optional(S.String),
          remoteAz: S.optional(S.String),
          remoteSubnetId: S.optional(S.String),
          remoteInstanceId: S.optional(S.String),
          remoteIp: S.optional(S.String),
          dnatIp: S.optional(S.String),
          value: S.optional(S.Number),
          traversedConstructs: S.optional(__S(18, __c2, 2)),
          kubernetesMetadata: S.optional(__S(19, __c2, 3)),
          localInstanceArn: S.optional(S.String),
          localSubnetArn: S.optional(S.String),
          localVpcArn: S.optional(S.String),
          remoteInstanceArn: S.optional(S.String),
          remoteSubnetArn: S.optional(S.String),
          remoteVpcArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "MonitorTopContributorsRow" });
    case 5:
      return S.Array(__S(20, __c2, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          unit: S.optional(S.String),
          topContributors: S.optional(__S(21, __c2, 5)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetQueryResultsMonitorTopContributorsOutput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          scopeId: S.String.pipe(T.HttpLabel("scopeId")),
          queryId: S.String.pipe(T.HttpLabel("queryId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/workloadInsights/{scopeId}/topContributorsQueries/{queryId}/results",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetQueryResultsWorkloadInsightsTopContributorsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          accountId: S.optional(S.String),
          localSubnetId: S.optional(S.String),
          localAz: S.optional(S.String),
          localVpcId: S.optional(S.String),
          localRegion: S.optional(S.String),
          remoteIdentifier: S.optional(S.String),
          value: S.optional(S.Number),
          localSubnetArn: S.optional(S.String),
          localVpcArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "WorkloadInsightsTopContributorsRow" });
    case 2:
      return S.Array(__S(25, __c3, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          topContributors: S.optional(__S(26, __c3, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetQueryResultsWorkloadInsightsTopContributorsOutput" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          scopeId: S.String.pipe(T.HttpLabel("scopeId")),
          queryId: S.String.pipe(T.HttpLabel("queryId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/workloadInsights/{scopeId}/topContributorsDataQueries/{queryId}/results",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetQueryResultsWorkloadInsightsTopContributorsDataInput" });
    case 1:
      return S.Array(/*@__PURE__*/ S.Date.pipe(/*@__PURE__*/ T.TimestampFormat("epoch-seconds")));
    case 2:
      return S.Array(S.Number);
    case 3:
      return S.suspend(() =>
        S.Struct({ timestamps: __S(33, __c4, 1), values: __S(34, __c4, 2), label: S.String }),
      ).annotate({ identifier: "WorkloadInsightsTopContributorsDataPoint" });
    case 4:
      return S.Array(__S(35, __c4, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ unit: S.String, datapoints: __S(36, __c4, 4), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetQueryResultsWorkloadInsightsTopContributorsDataOutput" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          monitorName: S.String.pipe(T.HttpLabel("monitorName")),
          queryId: S.String.pipe(T.HttpLabel("queryId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/monitors/{monitorName}/topContributorsQueries/{queryId}/status",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetQueryStatusMonitorTopContributorsInput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ status: S.String })).annotate({
        identifier: "GetQueryStatusMonitorTopContributorsOutput",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          scopeId: S.String.pipe(T.HttpLabel("scopeId")),
          queryId: S.String.pipe(T.HttpLabel("queryId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/workloadInsights/{scopeId}/topContributorsQueries/{queryId}/status",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetQueryStatusWorkloadInsightsTopContributorsInput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          scopeId: S.String.pipe(T.HttpLabel("scopeId")),
          queryId: S.String.pipe(T.HttpLabel("queryId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/workloadInsights/{scopeId}/topContributorsDataQueries/{queryId}/status",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetQueryStatusWorkloadInsightsTopContributorsDataInput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ scopeId: S.String.pipe(T.HttpLabel("scopeId")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/scopes/{scopeId}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetScopeInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          scopeId: S.String,
          status: S.String,
          scopeArn: S.String,
          targets: __S(227, __c28, 3),
          tags: S.optional(__S(208, __c26, 0)),
        }),
      ).annotate({ identifier: "GetScopeOutput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          monitorStatus: S.optional(S.String).pipe(T.HttpQuery("monitorStatus")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/monitors" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListMonitorsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ monitorArn: S.String, monitorName: S.String, monitorStatus: S.String }),
      ).annotate({ identifier: "MonitorSummary" });
    case 2:
      return S.Array(__S(81, __c10, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ monitors: __S(82, __c10, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListMonitorsOutput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/scopes" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListScopesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ scopeId: S.String, status: S.String, scopeArn: S.String }),
      ).annotate({ identifier: "ScopeSummary" });
    case 2:
      return S.Array(__S(89, __c11, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ scopes: __S(90, __c11, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListScopesOutput" });
  }
}
function __c12(j: number): any {
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
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(208, __c26, 0)) })).annotate({
        identifier: "ListTagsForResourceOutput",
      });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          monitorName: S.String.pipe(T.HttpLabel("monitorName")),
          startTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          endTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          metricName: S.String,
          destinationCategory: S.String,
          limit: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/monitors/{monitorName}/topContributorsQueries" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartQueryMonitorTopContributorsInput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ queryId: S.String })).annotate({
        identifier: "StartQueryMonitorTopContributorsOutput",
      });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          scopeId: S.String.pipe(T.HttpLabel("scopeId")),
          startTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          endTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          metricName: S.String,
          destinationCategory: S.String,
          limit: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/workloadInsights/{scopeId}/topContributorsQueries" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartQueryWorkloadInsightsTopContributorsInput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          scopeId: S.String.pipe(T.HttpLabel("scopeId")),
          startTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          endTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          metricName: S.String,
          destinationCategory: S.String,
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/workloadInsights/{scopeId}/topContributorsDataQueries",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartQueryWorkloadInsightsTopContributorsDataInput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          monitorName: S.String.pipe(T.HttpLabel("monitorName")),
          queryId: S.String.pipe(T.HttpLabel("queryId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/monitors/{monitorName}/topContributorsQueries/{queryId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopQueryMonitorTopContributorsInput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          scopeId: S.String.pipe(T.HttpLabel("scopeId")),
          queryId: S.String.pipe(T.HttpLabel("queryId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/workloadInsights/{scopeId}/topContributorsQueries/{queryId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopQueryWorkloadInsightsTopContributorsInput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          scopeId: S.String.pipe(T.HttpLabel("scopeId")),
          queryId: S.String.pipe(T.HttpLabel("queryId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/workloadInsights/{scopeId}/topContributorsDataQueries/{queryId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopQueryWorkloadInsightsTopContributorsDataInput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(208, __c26, 0),
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
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(168, __c21, 0).pipe(T.HttpQuery("tagKeys")),
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
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          monitorName: S.String.pipe(T.HttpLabel("monitorName")),
          localResourcesToAdd: S.optional(__S(201, __c25, 1)),
          localResourcesToRemove: S.optional(__S(201, __c25, 1)),
          remoteResourcesToAdd: S.optional(__S(201, __c25, 1)),
          remoteResourcesToRemove: S.optional(__S(201, __c25, 1)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/monitors/{monitorName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateMonitorInput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          scopeId: S.String.pipe(T.HttpLabel("scopeId")),
          resourcesToAdd: S.optional(__S(227, __c28, 3)),
          resourcesToDelete: S.optional(__S(227, __c28, 3)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/scopes/{scopeId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateScopeInput" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          monitorName: S.String,
          localResources: __S(201, __c25, 1),
          remoteResources: S.optional(__S(201, __c25, 1)),
          scopeArn: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(208, __c26, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/monitors" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateMonitorInput" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ type: S.String, identifier: S.String })).annotate({
        identifier: "MonitorLocalResource",
      });
    case 1:
      return S.Array(__S(200, __c25, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          monitorArn: S.String,
          monitorName: S.String,
          monitorStatus: S.String,
          localResources: __S(201, __c25, 1),
          remoteResources: __S(201, __c25, 1),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          modifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          tags: S.optional(__S(208, __c26, 0)),
        }),
      ).annotate({ identifier: "CreateMonitorOutput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          targets: __S(227, __c28, 3),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(208, __c26, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/scopes" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateScopeInput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ accountId: S.String })]);
    case 1:
      return S.suspend(() =>
        S.Struct({ targetId: __S(224, __c28, 0), targetType: S.String }),
      ).annotate({ identifier: "TargetIdentifier" });
    case 2:
      return S.suspend(() =>
        S.Struct({ targetIdentifier: __S(225, __c28, 1), region: S.String }),
      ).annotate({ identifier: "TargetResource" });
    case 3:
      return S.Array(__S(226, __c28, 2));
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          scopeId: S.String,
          status: S.String,
          scopeArn: S.String,
          tags: S.optional(__S(208, __c26, 0)),
        }),
      ).annotate({ identifier: "CreateScopeOutput" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ monitorName: S.String.pipe(T.HttpLabel("monitorName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/monitors/{monitorName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMonitorInput" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteMonitorOutput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
