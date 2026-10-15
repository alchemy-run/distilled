import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "PCS",
  serviceShapeName: "AWSParallelComputingService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "pcs" });
const ver = /*@__PURE__*/ T.ServiceVersion("2023-02-10");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_0();
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
              `https://pcs-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://pcs-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://pcs.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://pcs.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://pcs.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
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
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      serviceCode: S.String,
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(429), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ValidationExceptionReason",
      }),
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(289, __c18, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ClusterName = string;
export type SchedulerType = "SLURM" | (string & {});
export interface SchedulerRequest {
  type: SchedulerType;
  version: string;
}
export type Size = "SMALL" | "MEDIUM" | "LARGE" | (string & {});
export type SubnetId = string;
export type SubnetIdList = string[];
export type SecurityGroupId = string;
export type SecurityGroupIdList = string[];
export type NetworkType = "IPV4" | "IPV6" | (string & {});
export interface NetworkingRequest {
  subnetIds?: string[];
  securityGroupIds?: string[];
  networkType?: NetworkType;
}
export interface SlurmCustomSetting {
  parameterName: string;
  parameterValue: string;
}
export type SlurmCustomSettings = SlurmCustomSetting[];
export interface SlurmdbdCustomSetting {
  parameterName: string;
  parameterValue: string;
}
export type SlurmdbdCustomSettings = SlurmdbdCustomSetting[];
export interface CgroupCustomSetting {
  parameterName: string;
  parameterValue: string;
}
export type CgroupCustomSettings = CgroupCustomSetting[];
export type AccountingMode = "STANDARD" | "NONE" | (string & {});
export interface AccountingRequest {
  defaultPurgeTimeInDays?: number;
  mode: AccountingMode;
}
export type SlurmRestMode = "STANDARD" | "NONE" | (string & {});
export interface SlurmRestRequest {
  mode: SlurmRestMode;
}
export interface ClusterSlurmConfigurationRequest {
  scaleDownIdleTimeInSeconds?: number;
  slurmCustomSettings?: SlurmCustomSetting[];
  slurmdbdCustomSettings?: SlurmdbdCustomSetting[];
  cgroupCustomSettings?: CgroupCustomSetting[];
  accounting?: AccountingRequest;
  slurmRest?: SlurmRestRequest;
}
export type SBClientToken = string;
export type TagKey = string;
export type TagValue = string;
export type RequestTagMap = { [key: string]: string | undefined };
export interface CreateClusterRequest {
  clusterName: string;
  scheduler: SchedulerRequest;
  size: Size;
  networking: NetworkingRequest;
  slurmConfiguration?: ClusterSlurmConfigurationRequest;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type ClusterStatus =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "CREATE_FAILED"
  | "DELETE_FAILED"
  | "UPDATE_FAILED"
  | "SUSPENDING"
  | "SUSPENDED"
  | "RESUMING"
  | (string & {});
export interface Scheduler {
  type: SchedulerType;
  version: string;
}
export interface SlurmAuthKey {
  secretArn: string;
  secretVersion: string;
}
export interface JwtKey {
  secretArn: string;
  secretVersion: string;
}
export interface JwtAuth {
  jwtKey?: JwtKey;
}
export interface Accounting {
  defaultPurgeTimeInDays?: number;
  mode: AccountingMode;
}
export interface SlurmRest {
  mode: SlurmRestMode;
}
export interface ClusterSlurmConfiguration {
  scaleDownIdleTimeInSeconds?: number;
  slurmCustomSettings?: SlurmCustomSetting[];
  slurmdbdCustomSettings?: SlurmdbdCustomSetting[];
  cgroupCustomSettings?: CgroupCustomSetting[];
  authKey?: SlurmAuthKey;
  jwtAuth?: JwtAuth;
  accounting?: Accounting;
  slurmRest?: SlurmRest;
}
export interface Networking {
  subnetIds?: string[];
  securityGroupIds?: string[];
  networkType?: NetworkType;
}
export type EndpointType = "SLURMCTLD" | "SLURMDBD" | "SLURMRESTD" | (string & {});
export interface Endpoint {
  type: EndpointType;
  privateIpAddress: string;
  publicIpAddress?: string;
  ipv6Address?: string;
  port: string;
}
const Endpoint = /*@__PURE__*/ __L.at(__c23, 0) as any as S.Schema<Endpoint>;
export type Endpoints = Endpoint[];
export interface ErrorInfo {
  code?: string;
  message?: string;
}
export type ErrorInfoList = ErrorInfo[];
export interface Cluster {
  name: string;
  id: string;
  arn: string;
  status: ClusterStatus;
  createdAt: Date;
  modifiedAt: Date;
  scheduler: Scheduler;
  size: Size;
  slurmConfiguration?: ClusterSlurmConfiguration;
  networking: Networking;
  endpoints?: Endpoint[];
  errorInfo?: ErrorInfo[];
}
export interface CreateClusterResponse {
  cluster?: Cluster;
}
export type ClusterIdentifier = string;
export type ComputeNodeGroupName = string;
export type AmiId = string;
export type StringList = string[];
export type PurchaseOption =
  | "ONDEMAND"
  | "SPOT"
  | "CAPACITY_BLOCK"
  | "INTERRUPTIBLE_CAPACITY_RESERVATION"
  | (string & {});
export interface CustomLaunchTemplate {
  id: string;
  version: string;
}
export type InstanceProfileArn = string;
export interface ScalingConfigurationRequest {
  minInstanceCount: number;
  maxInstanceCount: number;
}
export interface InstanceConfig {
  instanceType?: string;
}
export type InstanceList = InstanceConfig[];
export type SpotAllocationStrategy =
  | "lowest-price"
  | "capacity-optimized"
  | "price-capacity-optimized"
  | (string & {});
export interface SpotOptions {
  allocationStrategy?: SpotAllocationStrategy;
}
export type GresCustomSettingMap = { [key: string]: string | undefined };
export type GresCustomSettings = { [key: string]: string | undefined }[];
export interface ComputeNodeGroupSlurmConfigurationRequest {
  scaleDownIdleTimeInSeconds?: number;
  slurmCustomSettings?: SlurmCustomSetting[];
  gresCustomSettings?: { [key: string]: string | undefined }[];
}
export interface ScriptSource {
  scriptLocation: string;
  s3VersionId?: string;
  checksum?: string;
}
export type NodeLifecycleScriptArgument = string;
export type NodeLifecycleScriptArguments = string[];
export type OnError = "TERMINATE" | "STOP_SEQUENCE" | "CONTINUE" | (string & {});
export type ExecutionPolicy = "FIRST_BOOT_ONLY" | "EVERY_BOOT" | (string & {});
export interface NodeLifecycleScript {
  name: string;
  scriptSource: ScriptSource;
  arguments?: string[];
  onError?: OnError;
  executionPolicy?: ExecutionPolicy;
}
export type NodeLifecycleScriptList = NodeLifecycleScript[];
export interface NodeLifecycleStages {
  nodeBootstrapped?: NodeLifecycleScript[];
  nodeReady?: NodeLifecycleScript[];
}
export type ScriptCachingPolicy = "CACHE_ONCE" | "REFRESH_ON_REBOOT" | (string & {});
export interface NodeLifecycleActionsRequest {
  stages: NodeLifecycleStages;
  scriptCachingPolicy?: ScriptCachingPolicy;
}
export interface CreateComputeNodeGroupRequest {
  clusterIdentifier: string;
  computeNodeGroupName: string;
  amiId?: string;
  subnetIds: string[];
  purchaseOption?: PurchaseOption;
  customLaunchTemplate: CustomLaunchTemplate;
  iamInstanceProfileArn: string;
  scalingConfiguration: ScalingConfigurationRequest;
  instanceConfigs: InstanceConfig[];
  spotOptions?: SpotOptions;
  slurmConfiguration?: ComputeNodeGroupSlurmConfigurationRequest;
  nodeLifecycleActions?: NodeLifecycleActionsRequest;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type ComputeNodeGroupStatus =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "CREATE_FAILED"
  | "DELETE_FAILED"
  | "UPDATE_FAILED"
  | "DELETED"
  | "SUSPENDING"
  | "SUSPENDED"
  | "RESUMING"
  | (string & {});
export interface ScalingConfiguration {
  minInstanceCount: number;
  maxInstanceCount: number;
}
export interface ComputeNodeGroupSlurmConfiguration {
  scaleDownIdleTimeInSeconds?: number;
  slurmCustomSettings?: SlurmCustomSetting[];
  gresCustomSettings?: { [key: string]: string | undefined }[];
}
export interface NodeLifecycleActions {
  stages: NodeLifecycleStages;
  scriptCachingPolicy?: ScriptCachingPolicy;
}
export interface ComputeNodeGroup {
  name: string;
  id: string;
  arn: string;
  clusterId: string;
  createdAt: Date;
  modifiedAt: Date;
  status: ComputeNodeGroupStatus;
  amiId?: string;
  subnetIds: string[];
  purchaseOption?: PurchaseOption;
  customLaunchTemplate: CustomLaunchTemplate;
  iamInstanceProfileArn: string;
  scalingConfiguration: ScalingConfiguration;
  instanceConfigs: InstanceConfig[];
  spotOptions?: SpotOptions;
  slurmConfiguration?: ComputeNodeGroupSlurmConfiguration;
  nodeLifecycleActions?: NodeLifecycleActions;
  errorInfo?: ErrorInfo[];
}
export interface CreateComputeNodeGroupResponse {
  computeNodeGroup?: ComputeNodeGroup;
}
export type QueueName = string;
export interface ComputeNodeGroupConfiguration {
  computeNodeGroupId?: string;
}
export type ComputeNodeGroupConfigurationList = ComputeNodeGroupConfiguration[];
export interface QueueSlurmConfigurationRequest {
  slurmCustomSettings?: SlurmCustomSetting[];
}
export interface CreateQueueRequest {
  clusterIdentifier: string;
  queueName: string;
  computeNodeGroupConfigurations?: ComputeNodeGroupConfiguration[];
  slurmConfiguration?: QueueSlurmConfigurationRequest;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type QueueStatus =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "CREATE_FAILED"
  | "DELETE_FAILED"
  | "UPDATE_FAILED"
  | "SUSPENDING"
  | "SUSPENDED"
  | "RESUMING"
  | (string & {});
export interface QueueSlurmConfiguration {
  slurmCustomSettings?: SlurmCustomSetting[];
}
export interface Queue {
  name: string;
  id: string;
  arn: string;
  clusterId: string;
  createdAt: Date;
  modifiedAt: Date;
  status: QueueStatus;
  computeNodeGroupConfigurations: ComputeNodeGroupConfiguration[];
  slurmConfiguration?: QueueSlurmConfiguration;
  errorInfo?: ErrorInfo[];
}
export interface CreateQueueResponse {
  queue?: Queue;
}
export interface DeleteClusterRequest {
  clusterIdentifier: string;
  clientToken?: string;
}
export interface DeleteClusterResponse {}
export type ComputeNodeGroupIdentifier = string;
export interface DeleteComputeNodeGroupRequest {
  clusterIdentifier: string;
  computeNodeGroupIdentifier: string;
  clientToken?: string;
}
export interface DeleteComputeNodeGroupResponse {}
export type QueueIdentifier = string;
export interface DeleteQueueRequest {
  clusterIdentifier: string;
  queueIdentifier: string;
  clientToken?: string;
}
export interface DeleteQueueResponse {}
export interface GetClusterRequest {
  clusterIdentifier: string;
}
export interface GetClusterResponse {
  cluster?: Cluster;
}
export interface GetComputeNodeGroupRequest {
  clusterIdentifier: string;
  computeNodeGroupIdentifier: string;
}
export interface GetComputeNodeGroupResponse {
  computeNodeGroup?: ComputeNodeGroup;
}
export interface GetQueueRequest {
  clusterIdentifier: string;
  queueIdentifier: string;
}
export interface GetQueueResponse {
  queue?: Queue;
}
export type MaxResults = number;
export interface ListClustersRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface ClusterSummary {
  name: string;
  id: string;
  arn: string;
  createdAt: Date;
  modifiedAt: Date;
  status: ClusterStatus;
}
export type ClusterList = ClusterSummary[];
export interface ListClustersResponse {
  clusters: ClusterSummary[];
  nextToken?: string;
}
export interface ListComputeNodeGroupsRequest {
  clusterIdentifier: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ComputeNodeGroupSummary {
  name: string;
  id: string;
  arn: string;
  clusterId: string;
  createdAt: Date;
  modifiedAt: Date;
  status: ComputeNodeGroupStatus;
}
export type ComputeNodeGroupList = ComputeNodeGroupSummary[];
export interface ListComputeNodeGroupsResponse {
  computeNodeGroups: ComputeNodeGroupSummary[];
  nextToken?: string;
}
export interface ListQueuesRequest {
  clusterIdentifier: string;
  nextToken?: string;
  maxResults?: number;
}
export interface QueueSummary {
  name: string;
  id: string;
  arn: string;
  clusterId: string;
  createdAt: Date;
  modifiedAt: Date;
  status: QueueStatus;
}
export type QueueList = QueueSummary[];
export interface ListQueuesResponse {
  queues: QueueSummary[];
  nextToken?: string;
}
export type Arn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export type ResponseTagMap = { [key: string]: string | undefined };
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export type BootstrapId = string;
export interface RegisterComputeNodeGroupInstanceRequest {
  clusterIdentifier: string;
  bootstrapId: string;
}
export type SharedSecret = string | redacted.Redacted<string>;
export interface RegisterComputeNodeGroupInstanceResponse {
  nodeID: string;
  sharedSecret: string | redacted.Redacted<string>;
  endpoints: Endpoint[];
  clusterName?: string;
  computeNodeGroupId?: string;
  computeNodeGroupName?: string;
  nodeLifecycleActions?: NodeLifecycleActions;
}
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
export interface UpdateAccountingRequest {
  defaultPurgeTimeInDays?: number;
  mode?: AccountingMode;
}
export interface UpdateSlurmRestRequest {
  mode?: SlurmRestMode;
}
export interface UpdateClusterSlurmConfigurationRequest {
  scaleDownIdleTimeInSeconds?: number;
  slurmCustomSettings?: SlurmCustomSetting[];
  slurmdbdCustomSettings?: SlurmdbdCustomSetting[];
  cgroupCustomSettings?: CgroupCustomSetting[];
  accounting?: UpdateAccountingRequest;
  slurmRest?: UpdateSlurmRestRequest;
}
export interface UpdateSchedulerRequest {
  version: string;
}
export interface UpdateClusterRequest {
  clusterIdentifier: string;
  clientToken?: string;
  slurmConfiguration?: UpdateClusterSlurmConfigurationRequest;
  scheduler?: UpdateSchedulerRequest;
}
export interface UpdateClusterResponse {
  cluster?: Cluster;
}
export interface UpdateComputeNodeGroupSlurmConfigurationRequest {
  scaleDownIdleTimeInSeconds?: number;
  slurmCustomSettings?: SlurmCustomSetting[];
  gresCustomSettings?: { [key: string]: string | undefined }[];
}
export interface UpdateNodeLifecycleActionsRequest {
  stages: NodeLifecycleStages;
  scriptCachingPolicy?: ScriptCachingPolicy;
}
export interface UpdateComputeNodeGroupRequest {
  clusterIdentifier: string;
  computeNodeGroupIdentifier: string;
  amiId?: string;
  subnetIds?: string[];
  customLaunchTemplate?: CustomLaunchTemplate;
  purchaseOption?: PurchaseOption;
  spotOptions?: SpotOptions;
  scalingConfiguration?: ScalingConfigurationRequest;
  iamInstanceProfileArn?: string;
  slurmConfiguration?: UpdateComputeNodeGroupSlurmConfigurationRequest;
  nodeLifecycleActions?: UpdateNodeLifecycleActionsRequest;
  clientToken?: string;
}
export interface UpdateComputeNodeGroupResponse {
  computeNodeGroup?: ComputeNodeGroup;
}
export interface UpdateQueueSlurmConfigurationRequest {
  slurmCustomSettings?: SlurmCustomSetting[];
}
export interface UpdateQueueRequest {
  clusterIdentifier: string;
  queueIdentifier: string;
  computeNodeGroupConfigurations?: ComputeNodeGroupConfiguration[];
  slurmConfiguration?: UpdateQueueSlurmConfigurationRequest;
  clientToken?: string;
}
export interface UpdateQueueResponse {
  queue?: Queue;
}
export type ValidationExceptionReason =
  | "unknownOperation"
  | "cannotParse"
  | "fieldValidationFailed"
  | "other"
  | (string & {});
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type CreateClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a cluster in your account. PCS creates the cluster controller in a service-owned account. The cluster controller communicates with the cluster resources in your account. The subnets and security groups for the cluster must already exist before you use this API action.
 *
 * It takes time for PCS to create the cluster. The cluster is in a `Creating` state until it is ready to use. There can only be 1 cluster in a `Creating` state per Amazon Web Services Region per Amazon Web Services account. `CreateCluster` fails with a `ServiceQuotaExceededException` if there is already a cluster in a `Creating` state.
 */
export const createCluster: API.OperationMethod<
  CreateClusterRequest,
  CreateClusterResponse,
  CreateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(305, __c19, 1) as any as S.Schema<CreateClusterRequest>,
  output: __S(344, __c21, 8) as any as S.Schema<CreateClusterResponse>,
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
  operationName: "CreateCluster",
}));

export type CreateComputeNodeGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a managed set of compute nodes. You associate a compute node group with a cluster through 1 or more PCS queues or as part of the login fleet. A compute node group includes the definition of the compute properties and lifecycle management. PCS uses the information you provide to this API action to launch compute nodes in your account. You can only specify subnets in the same Amazon VPC as your cluster. You receive billing charges for the compute nodes that PCS launches in your account. You must already have a launch template before you call this API. For more information, see Launch an instance from a launch template in the *Amazon Elastic Compute Cloud User Guide for Linux Instances*.
 */
export const createComputeNodeGroup: API.OperationMethod<
  CreateComputeNodeGroupRequest,
  CreateComputeNodeGroupResponse,
  CreateComputeNodeGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<CreateComputeNodeGroupRequest>,
  output: __S(456, __c28, 8) as any as S.Schema<CreateComputeNodeGroupResponse>,
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
  operationName: "CreateComputeNodeGroup",
}));

export type CreateQueueError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a job queue. You must associate 1 or more compute node groups with the queue. You can associate 1 compute node group with multiple queues.
 */
export const createQueue: API.OperationMethod<
  CreateQueueRequest,
  CreateQueueResponse,
  CreateQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<CreateQueueRequest>,
  output: __S(484, __c30, 4) as any as S.Schema<CreateQueueResponse>,
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
  operationName: "CreateQueue",
}));

export type DeleteClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a cluster and all its linked resources. You must delete all queues and compute node groups associated with the cluster before you can delete the cluster.
 */
export const deleteCluster: API.OperationMethod<
  DeleteClusterRequest,
  DeleteClusterResponse,
  DeleteClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<DeleteClusterRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteClusterResponse>,
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
  operationName: "DeleteCluster",
}));

export type DeleteComputeNodeGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a compute node group. You must delete all queues associated with the compute node group first.
 */
export const deleteComputeNodeGroup: API.OperationMethod<
  DeleteComputeNodeGroupRequest,
  DeleteComputeNodeGroupResponse,
  DeleteComputeNodeGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c2, 0) as any as S.Schema<DeleteComputeNodeGroupRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteComputeNodeGroupResponse>,
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
  operationName: "DeleteComputeNodeGroup",
}));

export type DeleteQueueError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a job queue. If the compute node group associated with this queue isn't associated with any other queues, PCS terminates all the compute nodes for this queue.
 */
export const deleteQueue: API.OperationMethod<
  DeleteQueueRequest,
  DeleteQueueResponse,
  DeleteQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c3, 0) as any as S.Schema<DeleteQueueRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteQueueResponse>,
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
  operationName: "DeleteQueue",
}));

export type GetClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns detailed information about a running cluster in your account. This API action provides networking information, endpoint information for communication with the scheduler, and provisioning status.
 */
export const getCluster: API.OperationMethod<
  GetClusterRequest,
  GetClusterResponse,
  GetClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c4, 0) as any as S.Schema<GetClusterRequest>,
  output: __S(344, __c21, 8) as any as S.Schema<GetClusterResponse>,
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
  operationName: "GetCluster",
}));

export type GetComputeNodeGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns detailed information about a compute node group. This API action provides networking information, EC2 instance type, compute node group status, and scheduler (such as Slurm) configuration.
 */
export const getComputeNodeGroup: API.OperationMethod<
  GetComputeNodeGroupRequest,
  GetComputeNodeGroupResponse,
  GetComputeNodeGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<GetComputeNodeGroupRequest>,
  output: __S(456, __c28, 8) as any as S.Schema<GetComputeNodeGroupResponse>,
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
  operationName: "GetComputeNodeGroup",
}));

export type GetQueueError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns detailed information about a queue. The information includes the compute node groups that the queue uses to schedule jobs.
 */
export const getQueue: API.OperationMethod<
  GetQueueRequest,
  GetQueueResponse,
  GetQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<GetQueueRequest>,
  output: __S(484, __c30, 4) as any as S.Schema<GetQueueResponse>,
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
  operationName: "GetQueue",
}));

export type ListClustersError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of running clusters in your account.
 */
export const listClusters: API.PaginatedOperationMethod<
  ListClustersRequest,
  ListClustersResponse,
  ListClustersError,
  Credentials | HttpClient.HttpClient,
  ClusterSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<ListClustersRequest>,
  output: __S(115, __c7, 3) as any as S.Schema<ListClustersResponse>,
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
  operationName: "ListClusters",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "clusters",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListComputeNodeGroupsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all compute node groups associated with a cluster.
 */
export const listComputeNodeGroups: API.PaginatedOperationMethod<
  ListComputeNodeGroupsRequest,
  ListComputeNodeGroupsResponse,
  ListComputeNodeGroupsError,
  Credentials | HttpClient.HttpClient,
  ComputeNodeGroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<ListComputeNodeGroupsRequest>,
  output: __S(129, __c8, 1) as any as S.Schema<ListComputeNodeGroupsResponse>,
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
  operationName: "ListComputeNodeGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "computeNodeGroups",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListQueuesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all queues associated with a cluster.
 */
export const listQueues: API.PaginatedOperationMethod<
  ListQueuesRequest,
  ListQueuesResponse,
  ListQueuesError,
  Credentials | HttpClient.HttpClient,
  QueueSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<ListQueuesRequest>,
  output: __S(161, __c10, 1) as any as S.Schema<ListQueuesResponse>,
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
  operationName: "ListQueues",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "queues",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Returns a list of all tags on an PCS resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(177, __c11, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type RegisterComputeNodeGroupInstanceError =
  | AccessDeniedException
  | InternalServerException
  | CommonErrors;
/**
 * This API action isn't intended for you to use.
 *
 * PCS uses this API action to register the compute nodes it launches in your account.
 */
export const registerComputeNodeGroupInstance: API.OperationMethod<
  RegisterComputeNodeGroupInstanceRequest,
  RegisterComputeNodeGroupInstanceResponse,
  RegisterComputeNodeGroupInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<RegisterComputeNodeGroupInstanceRequest>,
  output: __S(193, __c12, 1) as any as S.Schema<RegisterComputeNodeGroupInstanceResponse>,
  errors: [AccessDeniedException, InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterComputeNodeGroupInstance",
}));

export type TagResourceError =
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Adds or edits tags on an PCS resource. Each tag consists of a tag key and a tag value. The tag key and tag value are case-sensitive strings. The tag value can be an empty (null) string. To add a tag, specify a new tag key and a tag value. To edit a tag, specify an existing tag key and a new tag value.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<TagResourceResponse>,
  errors: [ResourceNotFoundException, ServiceQuotaExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Deletes tags from an PCS resource. To delete a tag, specify the tag key and the Amazon Resource Name (ARN) of the PCS resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a cluster configuration. You can update the scheduler version, modify scheduler settings, and update accounting configuration for an existing cluster. For more information about updating the scheduler version, see Updating the scheduler version on a cluster in the *PCS User Guide*.
 *
 * You can only update clusters that are in `ACTIVE`, `UPDATE_FAILED`, or `SUSPENDED` state. All associated resources (queues and compute node groups) must be in `ACTIVE` state before you can update the cluster.
 */
export const updateCluster: API.OperationMethod<
  UpdateClusterRequest,
  UpdateClusterResponse,
  UpdateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(244, __c15, 4) as any as S.Schema<UpdateClusterRequest>,
  output: __S(344, __c21, 8) as any as S.Schema<UpdateClusterResponse>,
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
  operationName: "UpdateCluster",
}));

export type UpdateComputeNodeGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a compute node group. You can update many of the fields related to your compute node group including the configurations for networking, compute nodes, and settings specific to your scheduler (such as Slurm).
 */
export const updateComputeNodeGroup: API.OperationMethod<
  UpdateComputeNodeGroupRequest,
  UpdateComputeNodeGroupResponse,
  UpdateComputeNodeGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<UpdateComputeNodeGroupRequest>,
  output: __S(456, __c28, 8) as any as S.Schema<UpdateComputeNodeGroupResponse>,
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
  operationName: "UpdateComputeNodeGroup",
}));

export type UpdateQueueError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the compute node group configuration of a queue. Use this API to change the compute node groups that the queue can send jobs to.
 */
export const updateQueue: API.OperationMethod<
  UpdateQueueRequest,
  UpdateQueueResponse,
  UpdateQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<UpdateQueueRequest>,
  output: __S(484, __c30, 4) as any as S.Schema<UpdateQueueResponse>,
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
  operationName: "UpdateQueue",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterIdentifier: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteClusterRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteClusterResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterIdentifier: S.String,
          computeNodeGroupIdentifier: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteComputeNodeGroupRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterIdentifier: S.String,
          queueIdentifier: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteQueueRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ clusterIdentifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetClusterRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ clusterIdentifier: S.String, computeNodeGroupIdentifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetComputeNodeGroupRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ clusterIdentifier: S.String, queueIdentifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetQueueRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListClustersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          id: S.String,
          arn: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          modifiedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          status: S.String,
        }),
      ).annotate({ identifier: "ClusterSummary" });
    case 2:
      return S.Array(__S(113, __c7, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ clusters: __S(114, __c7, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListClustersResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterIdentifier: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListComputeNodeGroupsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ computeNodeGroups: __S(145, __c9, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListComputeNodeGroupsResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          id: S.String,
          arn: S.String,
          clusterId: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          modifiedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          status: S.String,
        }),
      ).annotate({ identifier: "ComputeNodeGroupSummary" });
    case 1:
      return S.Array(__S(144, __c9, 0));
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterIdentifier: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListQueuesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ queues: __S(145, __c9, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListQueuesResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(400, __c25, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ clusterIdentifier: S.String, bootstrapId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RegisterComputeNodeGroupInstanceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          nodeID: S.String,
          sharedSecret: SensitiveString,
          endpoints: __S(320, __c20, 0),
          clusterName: S.optional(S.String),
          computeNodeGroupId: S.optional(S.String),
          computeNodeGroupName: S.optional(S.String),
          nodeLifecycleActions: S.optional(__S(436, __c27, 4)),
        }),
      ).annotate({ identifier: "RegisterComputeNodeGroupInstanceResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tags: __S(400, __c25, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(352, __c22, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ defaultPurgeTimeInDays: S.optional(S.Number), mode: S.optional(S.String) }),
      ).annotate({ identifier: "UpdateAccountingRequest" });
    case 1:
      return S.suspend(() => S.Struct({ mode: S.optional(S.String) })).annotate({
        identifier: "UpdateSlurmRestRequest",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          scaleDownIdleTimeInSeconds: S.optional(S.Number),
          slurmCustomSettings: S.optional(__S(385, __c24, 1)),
          slurmdbdCustomSettings: S.optional(__S(385, __c24, 1)),
          cgroupCustomSettings: S.optional(__S(385, __c24, 1)),
          accounting: S.optional(__S(240, __c15, 0)),
          slurmRest: S.optional(__S(241, __c15, 1)),
        }),
      ).annotate({ identifier: "UpdateClusterSlurmConfigurationRequest" });
    case 3:
      return S.suspend(() => S.Struct({ version: S.String })).annotate({
        identifier: "UpdateSchedulerRequest",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          clusterIdentifier: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          slurmConfiguration: S.optional(__S(242, __c15, 2)),
          scheduler: S.optional(__S(243, __c15, 3)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateClusterRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterIdentifier: S.String,
          computeNodeGroupIdentifier: S.String,
          amiId: S.optional(S.String),
          subnetIds: S.optional(__S(352, __c22, 0)),
          customLaunchTemplate: S.optional(__S(448, __c28, 0)),
          purchaseOption: S.optional(S.String),
          spotOptions: S.optional(__S(452, __c28, 4)),
          scalingConfiguration: S.optional(__S(449, __c28, 1)),
          iamInstanceProfileArn: S.optional(S.String),
          slurmConfiguration: S.optional(__S(454, __c28, 6)),
          nodeLifecycleActions: S.optional(__S(436, __c27, 4)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateComputeNodeGroupRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterIdentifier: S.String,
          queueIdentifier: S.String,
          computeNodeGroupConfigurations: S.optional(__S(481, __c30, 1)),
          slurmConfiguration: S.optional(__S(482, __c30, 2)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateQueueRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(288, __c18, 0));
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          scaleDownIdleTimeInSeconds: S.optional(S.Number),
          slurmCustomSettings: S.optional(__S(385, __c24, 1)),
          slurmdbdCustomSettings: S.optional(__S(385, __c24, 1)),
          cgroupCustomSettings: S.optional(__S(385, __c24, 1)),
          accounting: S.optional(__S(338, __c21, 2)),
          slurmRest: S.optional(__S(339, __c21, 3)),
        }),
      ).annotate({ identifier: "ClusterSlurmConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String,
          scheduler: __S(336, __c21, 0),
          size: S.String,
          networking: __S(337, __c21, 1),
          slurmConfiguration: S.optional(__S(304, __c19, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(400, __c25, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateClusterRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.Array(Endpoint);
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ type: S.String, version: S.String })).annotate({
        identifier: "SchedulerRequest",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          subnetIds: S.optional(__S(352, __c22, 0)),
          securityGroupIds: S.optional(__S(352, __c22, 0)),
          networkType: S.optional(S.String),
        }),
      ).annotate({ identifier: "NetworkingRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ defaultPurgeTimeInDays: S.optional(S.Number), mode: S.String }),
      ).annotate({ identifier: "AccountingRequest" });
    case 3:
      return S.suspend(() => S.Struct({ mode: S.String })).annotate({
        identifier: "SlurmRestRequest",
      });
    case 4:
      return S.suspend(() => S.Struct({ secretArn: S.String, secretVersion: S.String })).annotate({
        identifier: "SlurmAuthKey",
      });
    case 5:
      return S.suspend(() => S.Struct({ jwtKey: S.optional(__S(340, __c21, 4)) })).annotate({
        identifier: "JwtAuth",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({
          scaleDownIdleTimeInSeconds: S.optional(S.Number),
          slurmCustomSettings: S.optional(__S(385, __c24, 1)),
          slurmdbdCustomSettings: S.optional(__S(385, __c24, 1)),
          cgroupCustomSettings: S.optional(__S(385, __c24, 1)),
          authKey: S.optional(__S(340, __c21, 4)),
          jwtAuth: S.optional(__S(341, __c21, 5)),
          accounting: S.optional(__S(338, __c21, 2)),
          slurmRest: S.optional(__S(339, __c21, 3)),
        }),
      ).annotate({ identifier: "ClusterSlurmConfiguration" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          id: S.String,
          arn: S.String,
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          modifiedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          scheduler: __S(336, __c21, 0),
          size: S.String,
          slurmConfiguration: S.optional(__S(342, __c21, 6)),
          networking: __S(337, __c21, 1),
          endpoints: S.optional(__S(320, __c20, 0)),
          errorInfo: S.optional(__S(387, __c24, 3)),
        }),
      ).annotate({ identifier: "Cluster" });
    case 8:
      return S.suspend(() => S.Struct({ cluster: S.optional(__S(343, __c21, 7)) })).annotate({
        identifier: "CreateClusterResponse",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          privateIpAddress: S.String,
          publicIpAddress: S.optional(S.String),
          ipv6Address: S.optional(S.String),
          port: S.String,
        }),
      ).annotate({ identifier: "Endpoint" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ parameterName: S.String, parameterValue: S.String }),
      ).annotate({ identifier: "SlurmCustomSetting" });
    case 1:
      return S.Array(__S(384, __c24, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ code: S.optional(S.String), message: S.optional(S.String) }),
      ).annotate({ identifier: "ErrorInfo" });
    case 3:
      return S.Array(__S(386, __c24, 2));
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterIdentifier: S.String,
          computeNodeGroupName: S.String,
          amiId: S.optional(S.String),
          subnetIds: __S(352, __c22, 0),
          purchaseOption: S.optional(S.String),
          customLaunchTemplate: __S(448, __c28, 0),
          iamInstanceProfileArn: S.String,
          scalingConfiguration: __S(449, __c28, 1),
          instanceConfigs: __S(451, __c28, 3),
          spotOptions: S.optional(__S(452, __c28, 4)),
          slurmConfiguration: S.optional(__S(454, __c28, 6)),
          nodeLifecycleActions: S.optional(__S(436, __c27, 4)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(400, __c25, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateComputeNodeGroupRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          scriptLocation: S.String,
          s3VersionId: S.optional(S.String),
          checksum: S.optional(S.String),
        }),
      ).annotate({ identifier: "ScriptSource" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          scriptSource: __S(432, __c27, 0),
          arguments: S.optional(__S(352, __c22, 0)),
          onError: S.optional(S.String),
          executionPolicy: S.optional(S.String),
        }),
      ).annotate({ identifier: "NodeLifecycleScript" });
    case 2:
      return S.Array(__S(433, __c27, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nodeBootstrapped: S.optional(__S(434, __c27, 2)),
          nodeReady: S.optional(__S(434, __c27, 2)),
        }),
      ).annotate({ identifier: "NodeLifecycleStages" });
    case 4:
      return S.suspend(() =>
        S.Struct({ stages: __S(435, __c27, 3), scriptCachingPolicy: S.optional(S.String) }),
      ).annotate({ identifier: "NodeLifecycleActionsRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ id: S.String, version: S.String })).annotate({
        identifier: "CustomLaunchTemplate",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ minInstanceCount: S.Number, maxInstanceCount: S.Number }),
      ).annotate({ identifier: "ScalingConfigurationRequest" });
    case 2:
      return S.suspend(() => S.Struct({ instanceType: S.optional(S.String) })).annotate({
        identifier: "InstanceConfig",
      });
    case 3:
      return S.Array(__S(450, __c28, 2));
    case 4:
      return S.suspend(() => S.Struct({ allocationStrategy: S.optional(S.String) })).annotate({
        identifier: "SpotOptions",
      });
    case 5:
      return S.Array(__S(400, __c25, 0));
    case 6:
      return S.suspend(() =>
        S.Struct({
          scaleDownIdleTimeInSeconds: S.optional(S.Number),
          slurmCustomSettings: S.optional(__S(385, __c24, 1)),
          gresCustomSettings: S.optional(__S(453, __c28, 5)),
        }),
      ).annotate({ identifier: "ComputeNodeGroupSlurmConfigurationRequest" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          id: S.String,
          arn: S.String,
          clusterId: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          modifiedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          status: S.String,
          amiId: S.optional(S.String),
          subnetIds: __S(352, __c22, 0),
          purchaseOption: S.optional(S.String),
          customLaunchTemplate: __S(448, __c28, 0),
          iamInstanceProfileArn: S.String,
          scalingConfiguration: __S(449, __c28, 1),
          instanceConfigs: __S(451, __c28, 3),
          spotOptions: S.optional(__S(452, __c28, 4)),
          slurmConfiguration: S.optional(__S(454, __c28, 6)),
          nodeLifecycleActions: S.optional(__S(436, __c27, 4)),
          errorInfo: S.optional(__S(387, __c24, 3)),
        }),
      ).annotate({ identifier: "ComputeNodeGroup" });
    case 8:
      return S.suspend(() =>
        S.Struct({ computeNodeGroup: S.optional(__S(455, __c28, 7)) }),
      ).annotate({ identifier: "CreateComputeNodeGroupResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterIdentifier: S.String,
          queueName: S.String,
          computeNodeGroupConfigurations: S.optional(__S(481, __c30, 1)),
          slurmConfiguration: S.optional(__S(482, __c30, 2)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(400, __c25, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateQueueRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ computeNodeGroupId: S.optional(S.String) })).annotate({
        identifier: "ComputeNodeGroupConfiguration",
      });
    case 1:
      return S.Array(__S(480, __c30, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ slurmCustomSettings: S.optional(__S(385, __c24, 1)) }),
      ).annotate({ identifier: "QueueSlurmConfigurationRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          id: S.String,
          arn: S.String,
          clusterId: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          modifiedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          status: S.String,
          computeNodeGroupConfigurations: __S(481, __c30, 1),
          slurmConfiguration: S.optional(__S(482, __c30, 2)),
          errorInfo: S.optional(__S(387, __c24, 3)),
        }),
      ).annotate({ identifier: "Queue" });
    case 4:
      return S.suspend(() => S.Struct({ queue: S.optional(__S(483, __c30, 3)) })).annotate({
        identifier: "CreateQueueResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
