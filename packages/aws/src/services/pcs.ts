import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_0Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "PCS",
  target: "AWSParallelComputingService",
  version: "2023-02-10",
  sigv4: "pcs",
  protocol: awsJson1_0Protocol,
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
                `https://pcs-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://pcs-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://pcs.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://pcs.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
  }> {}
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
  )<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message: string;
    readonly serviceCode: string;
    readonly resourceId?: string;
    readonly resourceType?: string;
    readonly quotaCode?: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly retryAfterSeconds?: number }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly reason: ValidationExceptionReason;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
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
export type EndpointType =
  | "SLURMCTLD"
  | "SLURMDBD"
  | "SLURMRESTD"
  | (string & {});
export interface Endpoint {
  type: EndpointType;
  privateIpAddress: string;
  publicIpAddress?: string;
  ipv6Address?: string;
  port: string;
}
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
export interface ComputeNodeGroupSlurmConfigurationRequest {
  scaleDownIdleTimeInSeconds?: number;
  slurmCustomSettings?: SlurmCustomSetting[];
}
export interface ScriptSource {
  scriptLocation: string;
  s3VersionId?: string;
  checksum?: string;
}
export type NodeLifecycleScriptArgument = string;
export type NodeLifecycleScriptArguments = string[];
export type OnError =
  | "TERMINATE"
  | "STOP_SEQUENCE"
  | "CONTINUE"
  | (string & {});
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
export type ScriptCachingPolicy =
  | "CACHE_ONCE"
  | "REFRESH_ON_REBOOT"
  | (string & {});
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
  descriptor: {
    service: svc,
    input: {
      clusterName: 0,
      scheduler: { type: 0, version: 0 },
      size: 0,
      networking: { subnetIds: 0, securityGroupIds: 0, networkType: 0 },
      slurmConfiguration: {
        scaleDownIdleTimeInSeconds: 0,
        slurmCustomSettings: D.list(i_SlurmCustomSetting),
        slurmdbdCustomSettings: D.list(i_SlurmdbdCustomSetting),
        cgroupCustomSettings: D.list(i_CgroupCustomSetting),
        accounting: { defaultPurgeTimeInDays: 0, mode: 0 },
        slurmRest: { mode: 0 },
      },
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    output: { cluster: o_Cluster },
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
  operationName: "CreateCluster",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      clusterIdentifier: 0,
      computeNodeGroupName: 0,
      amiId: 0,
      subnetIds: 0,
      purchaseOption: 0,
      customLaunchTemplate: i_CustomLaunchTemplate,
      iamInstanceProfileArn: 0,
      scalingConfiguration: i_ScalingConfigurationRequest,
      instanceConfigs: D.list({ instanceType: 0 }),
      spotOptions: i_SpotOptions,
      slurmConfiguration: {
        scaleDownIdleTimeInSeconds: 0,
        slurmCustomSettings: D.list(i_SlurmCustomSetting),
      },
      nodeLifecycleActions: {
        stages: i_NodeLifecycleStages,
        scriptCachingPolicy: 0,
      },
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    output: { computeNodeGroup: o_ComputeNodeGroup },
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
  operationName: "CreateComputeNodeGroup",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      clusterIdentifier: 0,
      queueName: 0,
      computeNodeGroupConfigurations: D.list(i_ComputeNodeGroupConfiguration),
      slurmConfiguration: { slurmCustomSettings: D.list(i_SlurmCustomSetting) },
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    output: { queue: o_Queue },
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
  operationName: "CreateQueue",
})) as any;

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
  descriptor: {
    service: svc,
    input: { clusterIdentifier: 0, clientToken: D.m({ idempotency: true }) },
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
  operationName: "DeleteCluster",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      clusterIdentifier: 0,
      computeNodeGroupIdentifier: 0,
      clientToken: D.m({ idempotency: true }),
    },
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
  operationName: "DeleteComputeNodeGroup",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      clusterIdentifier: 0,
      queueIdentifier: 0,
      clientToken: D.m({ idempotency: true }),
    },
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
  operationName: "DeleteQueue",
})) as any;

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
  descriptor: {
    service: svc,
    input: { clusterIdentifier: 0 },
    output: { cluster: o_Cluster },
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
  operationName: "GetCluster",
})) as any;

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
  descriptor: {
    service: svc,
    input: { clusterIdentifier: 0, computeNodeGroupIdentifier: 0 },
    output: { computeNodeGroup: o_ComputeNodeGroup },
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
  operationName: "GetComputeNodeGroup",
})) as any;

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
  descriptor: {
    service: svc,
    input: { clusterIdentifier: 0, queueIdentifier: 0 },
    output: { queue: o_Queue },
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
  operationName: "GetQueue",
})) as any;

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
  descriptor: {
    service: svc,
    input: { nextToken: 0, maxResults: 0 },
    output: { clusters: D.list({ createdAt: D.ts, modifiedAt: D.ts }) },
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
  descriptor: {
    service: svc,
    input: { clusterIdentifier: 0, nextToken: 0, maxResults: 0 },
    output: {
      computeNodeGroups: D.list({ createdAt: D.ts, modifiedAt: D.ts }),
    },
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
  descriptor: {
    service: svc,
    input: { clusterIdentifier: 0, nextToken: 0, maxResults: 0 },
    output: { queues: D.list({ createdAt: D.ts, modifiedAt: D.ts }) },
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
  descriptor: { service: svc, input: { resourceArn: 0 } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    input: { clusterIdentifier: 0, bootstrapId: 0 },
    output: { sharedSecret: D.secret },
  },
  errors: [AccessDeniedException, InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterComputeNodeGroupInstance",
})) as any;

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
  descriptor: { service: svc, input: { resourceArn: 0, tags: 0 } },
  errors: [ResourceNotFoundException, ServiceQuotaExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

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
  descriptor: { service: svc, input: { resourceArn: 0, tagKeys: 0 } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      clusterIdentifier: 0,
      clientToken: D.m({ idempotency: true }),
      slurmConfiguration: {
        scaleDownIdleTimeInSeconds: 0,
        slurmCustomSettings: D.list(i_SlurmCustomSetting),
        slurmdbdCustomSettings: D.list(i_SlurmdbdCustomSetting),
        cgroupCustomSettings: D.list(i_CgroupCustomSetting),
        accounting: { defaultPurgeTimeInDays: 0, mode: 0 },
        slurmRest: { mode: 0 },
      },
      scheduler: { version: 0 },
    },
    output: { cluster: o_Cluster },
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
  operationName: "UpdateCluster",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      clusterIdentifier: 0,
      computeNodeGroupIdentifier: 0,
      amiId: 0,
      subnetIds: 0,
      customLaunchTemplate: i_CustomLaunchTemplate,
      purchaseOption: 0,
      spotOptions: i_SpotOptions,
      scalingConfiguration: i_ScalingConfigurationRequest,
      iamInstanceProfileArn: 0,
      slurmConfiguration: {
        scaleDownIdleTimeInSeconds: 0,
        slurmCustomSettings: D.list(i_SlurmCustomSetting),
      },
      nodeLifecycleActions: {
        stages: i_NodeLifecycleStages,
        scriptCachingPolicy: 0,
      },
      clientToken: D.m({ idempotency: true }),
    },
    output: { computeNodeGroup: o_ComputeNodeGroup },
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
  operationName: "UpdateComputeNodeGroup",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      clusterIdentifier: 0,
      queueIdentifier: 0,
      computeNodeGroupConfigurations: D.list(i_ComputeNodeGroupConfiguration),
      slurmConfiguration: { slurmCustomSettings: D.list(i_SlurmCustomSetting) },
      clientToken: D.m({ idempotency: true }),
    },
    output: { queue: o_Queue },
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
  operationName: "UpdateQueue",
})) as any;

const i_CgroupCustomSetting: D.LazyStruct = () => ({
  parameterName: 0,
  parameterValue: 0,
});
const i_ComputeNodeGroupConfiguration: D.LazyStruct = () => ({
  computeNodeGroupId: 0,
});
const i_CustomLaunchTemplate: D.LazyStruct = () => ({ id: 0, version: 0 });
const i_NodeLifecycleStages: D.LazyStruct = () => ({
  nodeBootstrapped: D.list(i_NodeLifecycleScript),
  nodeReady: D.list(i_NodeLifecycleScript),
});
const i_ScalingConfigurationRequest: D.LazyStruct = () => ({
  minInstanceCount: 0,
  maxInstanceCount: 0,
});
const i_SlurmCustomSetting: D.LazyStruct = () => ({
  parameterName: 0,
  parameterValue: 0,
});
const i_SlurmdbdCustomSetting: D.LazyStruct = () => ({
  parameterName: 0,
  parameterValue: 0,
});
const i_SpotOptions: D.LazyStruct = () => ({ allocationStrategy: 0 });
const o_Cluster: D.LazyStruct = () => ({ createdAt: D.ts, modifiedAt: D.ts });
const o_ComputeNodeGroup: D.LazyStruct = () => ({
  createdAt: D.ts,
  modifiedAt: D.ts,
});
const o_Queue: D.LazyStruct = () => ({ createdAt: D.ts, modifiedAt: D.ts });
const i_NodeLifecycleScript: D.LazyStruct = () => ({
  name: 0,
  scriptSource: { scriptLocation: 0, s3VersionId: 0, checksum: 0 },
  arguments: 0,
  onError: 0,
  executionPolicy: 0,
});
